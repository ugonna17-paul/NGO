import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlignLeft,
  Bookmark,
  CheckCircle2,
  FileText,
  Eye,
  EyeOff,
  Heart,
  ImageIcon,
  Mail,
  Plus,
  Search,
  Share2,
  Tag,
  TrendingUp,
  Trash2,
  User,
  X,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageWithFallback } from './ImageWithFallback';
import './Resources.css';

const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(
  /\/$/,
  ''
);

const buildApiUrl = (path) => `${apiBase}${path}`;

const AUTH_EMAIL = 'info@naphtaliinitiative.org';
const AUTH_PASSWORD = 'naphtaliinitiative';

export default function Resources() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const authTimerRef = useRef(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(4);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    title: '',
    category: 'Early Intervention',
    preview: '',
    content: '',
    coverImageFile: null,
    coverImagePreview: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  const categories = [
    'All',
    'Early Intervention',
    'Community Support',
    'Education',
    'Family Support',
    'Advocacy',
  ];
  const postCategories = categories.slice(1);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadResources = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/resources'), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to load resources.');
        }
        const data = await response.json();
        if (isMounted) {
          const normalized = Array.isArray(data)
            ? data.map((item) => ({ isLiked: false, isSaved: false, ...item }))
            : [];
          setPosts(normalized);
          setFetchError('');
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setFetchError(err.message || 'Failed to load resources.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadResources();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [modalOpen]);

  useEffect(() => {
    return () => {
      if (authTimerRef.current) {
        clearTimeout(authTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = !isAuthed ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthed]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  useEffect(() => {
    return () => {
      if (formData.coverImagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(formData.coverImagePreview);
      }
    };
  }, [formData.coverImagePreview]);

  const openModal = () => {
    setFormData({
      authorName: '',
      title: '',
      category: 'Early Intervention',
      preview: '',
      content: '',
      coverImageFile: null,
      coverImagePreview: '',
    });
    setFormErrors({});
    setSubmitSuccess(false);
    setModalOpen(true);
  };

  const handleAuthChange = (field, value) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
    if (authError) {
      setAuthError('');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const email = authForm.email.trim();
    const password = authForm.password.trim();

    if (email === AUTH_EMAIL && password === AUTH_PASSWORD) {
      setAuthSuccess(true);
      setAuthForm({ email: '', password: '' });
      setAuthError('');
      setShowPassword(false);
      authTimerRef.current = setTimeout(() => {
        setIsAuthed(true);
        setAuthSuccess(false);
      }, 900);
      return;
    }

    setAuthError('Invalid login details.');
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitSuccess(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.authorName.trim()) errors.authorName = 'Author name is required';
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.preview.trim()) errors.preview = 'A short preview is required';
    if (!formData.content.trim()) errors.content = 'Article content is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = new FormData();
    payload.append('authorName', formData.authorName);
    payload.append('title', formData.title);
    payload.append('category', formData.category);
    payload.append('preview', formData.preview);
    payload.append('content', formData.content);
    if (formData.coverImageFile) {
      payload.append('coverImage', formData.coverImageFile);
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(buildApiUrl('/api/resources'), {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to publish article.');
      }

      const created = await response.json();
      setPosts((prev) => [
        { isLiked: false, isSaved: false, ...created },
        ...prev,
      ]);
      setSubmitSuccess(true);
      setTimeout(() => closeModal(), 2200);
    } catch (err) {
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || 'Failed to publish article.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLike = async (postId) => {
    const nextPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });

    setPosts(nextPosts);

    const likedPost = nextPosts.find((post) => post.id === postId);
    const delta = likedPost?.isLiked ? 1 : -1;

    try {
      const response = await fetch(buildApiUrl(`/api/resources/${postId}/likes`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta }),
      });

      if (response.ok) {
        const updated = await response.json();
        setPosts((prev) =>
          prev.map((post) => (post.id === updated.id ? { ...post, likes: updated.likes } : post))
        );
      }
    } catch (err) {
      // Keep optimistic UI if request fails.
    }
  };

  const handleSave = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, isSaved: !post.isSaved };
        }
        return post;
      })
    );
  };

  const handleDelete = (post) => {
    setDeleteTarget(post);
  };

  const closeDeleteModal = () => {
    if (deleteBusy) return;
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteBusy(true);
      const response = await fetch(buildApiUrl(`/api/resources/${deleteTarget.id}`), {
        method: 'DELETE',
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to delete article.');
      }

      setPosts((prev) => prev.filter((post) => post.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success('Article deleted successfully.');
    } catch (err) {
      toast.error(err.message || 'Failed to delete article.');
    } finally {
      setDeleteBusy(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      post.title?.toLowerCase().includes(search) ||
      post.preview?.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  const handleCoverImageChange = (file) => {
    if (!file) {
      handleField('coverImageFile', null);
      handleField('coverImagePreview', '');
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        coverImage: 'Only JPG, PNG, or WEBP files are allowed.',
      }));
      handleField('coverImageFile', null);
      handleField('coverImagePreview', '');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        coverImage: 'Image must be 5MB or smaller.',
      }));
      handleField('coverImageFile', null);
      handleField('coverImagePreview', '');
      return;
    }

    setFormErrors((prev) => ({ ...prev, coverImage: undefined }));
    handleField('coverImageFile', file);
    handleField('coverImagePreview', URL.createObjectURL(file));
  };

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 4);
  };

  return (
    <div className="resources-page">
      <ToastContainer position="top-right" autoClose={2400} />
      {!isAuthed && (
        <div className="resources-login-overlay">
          <div className="resources-login-modal" role="dialog" aria-modal="true">
            <h2>Member Login</h2>
            <p>Enter the access credentials to view resources.</p>
            {authSuccess ? (
              <div className="resources-login-success">
                <div className="resources-success-icon">
                  <CheckCircle2 className="resources-success-icon-inner" />
                </div>
                <h3>Access Granted</h3>
                <p>Redirecting you to resources...</p>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="resources-login-form">
                <label className="resources-form-label">
                  <span className="resources-form-label-text">Email</span>
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(e) => handleAuthChange('email', e.target.value)}
                    className="resources-form-input"
                    required
                  />
                </label>
                <label className="resources-form-label">
                  <span className="resources-form-label-text">Password</span>
                  <div className="resources-password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={authForm.password}
                      onChange={(e) => handleAuthChange('password', e.target.value)}
                      className="resources-form-input"
                      required
                    />
                    <button
                      type="button"
                      className="resources-password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </label>
                {authError && <p className="resources-form-error">{authError}</p>}
                <button type="submit" className="resources-form-submit">
                  Unlock Resources
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <section className="resources-hero">
        <div className="resources-container">
          <div className="resources-hero-content" data-aos="fade-up">
            <h1 className="resources-title">Resources & Insights</h1>
            <p className="resources-subtitle">
              Explore expert articles, research insights, and practical guides to support your
              autism awareness journey.
            </p>

            <div className="resources-search">
              <Search className="resources-search-icon" />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="resources-search-input"
              />
            </div>

            <div className="resources-categories" data-aos="fade-up" data-aos-delay="100">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`resources-category-button${
                    activeCategory === category ? ' is-active' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="resources-main">
        <div className="resources-main-container">
          <div className="resources-layout">
            <div className="resources-feed">
              <div className="resources-cta" data-aos="fade-up">
                <div className="resources-cta-content">
                  <div>
                    <h3>Share Your Insight</h3>
                    <p>Have a story or expertise to share with our community?</p>
                  </div>
                  <button type="button" onClick={openModal} className="resources-cta-button">
                    <Plus className="resources-cta-icon" />
                    Post Article
                  </button>
                </div>
              </div>

              {isLoading && (
                <div className="resources-empty" data-aos="fade-up">
                  Loading resources...
                </div>
              )}

              {!isLoading && fetchError && (
                <div className="resources-empty" data-aos="fade-up">
                  {fetchError}
                </div>
              )}

              {!isLoading && !fetchError && filteredPosts.length === 0 && (
                <div className="resources-empty" data-aos="fade-up">
                  No articles yet. Be the first to post!
                </div>
              )}

              {!isLoading && !fetchError &&
                filteredPosts.slice(0, visiblePosts).map((post, index) => (
                  <article
                    key={post.id}
                    className="resources-post-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="resources-post-header">
                      <div className="resources-author">
                        <ImageWithFallback
                          src={post.author?.avatar}
                          alt={post.author?.name}
                          className="resources-avatar"
                        />
                        <div>
                          <h4 className="resources-author-name">{post.author?.name}</h4>
                          <p className="resources-post-date">{post.date}</p>
                        </div>
                      </div>
                      <span className="resources-category-pill">{post.category}</span>
                    </div>

                    <Link to={`/resources/${post.id}`} className="resources-cover-link">
                      <ImageWithFallback
                        src={post.coverImage}
                        alt={post.title}
                        className="resources-cover-image"
                      />
                    </Link>

                    <div className="resources-post-body">
                      <Link to={`/resources/${post.id}`} className="resources-post-title">
                        {post.title}
                      </Link>
                      <p className="resources-post-preview">{post.preview}</p>

                      <div className="resources-post-actions">
                        <div className="resources-action-group">
                          <button
                            type="button"
                            onClick={() => handleLike(post.id)}
                            className={`resources-action-button${
                              post.isLiked ? ' is-active' : ''
                            }`}
                          >
                            <Heart className="resources-action-icon" />
                            <span>{post.likes}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(post.id)}
                            className={`resources-action-button${
                              post.isSaved ? ' is-active' : ''
                            }`}
                          >
                            <Bookmark className="resources-action-icon" />
                          </button>
                          <button type="button" className="resources-action-button">
                            <Share2 className="resources-action-icon" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post)}
                            className="resources-action-button is-danger"
                            aria-label="Delete article"
                          >
                            <Trash2 className="resources-action-icon" />
                          </button>
                        </div>
                        <Link
                          to={`/resources/${post.id}`}
                          className="resources-readmore-button"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}

              {visiblePosts < filteredPosts.length && (
                <div className="resources-load-more" data-aos="fade-up">
                  <button type="button" onClick={loadMore}>
                    Load More Posts
                  </button>
                </div>
              )}
            </div>

            <aside className="resources-sidebar">
              <div className="resources-widget resources-widget-sticky" data-aos="fade-left">
                <div className="resources-widget-title">
                  <TrendingUp className="resources-widget-icon" />
                  <h4>Trending Articles</h4>
                </div>
                <div className="resources-trending-list">
                  {posts.slice(0, 3).map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/resources/${post.id}`}
                      className="resources-trending-item"
                    >
                      <span className="resources-trending-rank">{index + 1}</span>
                      <div>
                        <p className="resources-trending-title">{post.title}</p>
                        <p className="resources-trending-likes">{post.likes} likes</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="resources-widget" data-aos="fade-left" data-aos-delay="100">
                <h4 className="resources-widget-heading">Categories</h4>
                <div className="resources-category-list">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className="resources-category-item"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="resources-newsletter" data-aos="fade-left" data-aos-delay="200">
                <div className="resources-newsletter-icon">
                  <Mail className="resources-newsletter-icon-inner" />
                </div>
                <h4>Stay Updated</h4>
                <p>Get the latest articles and resources delivered to your inbox.</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="resources-newsletter-input"
                />
                <button type="button" className="resources-newsletter-button">
                  Subscribe Now
                </button>
              </div>

              <div className="resources-widget" data-aos="fade-left" data-aos-delay="300">
                <h4 className="resources-widget-heading">Top Authors</h4>
                <div className="resources-author-list">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="resources-author-item">
                      <ImageWithFallback
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="resources-author-avatar"
                      />
                      <p className="resources-author-name">{post.author.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="resources-modal-overlay">
          <div ref={modalRef} className="resources-modal">
            {submitSuccess ? (
              <div className="resources-success">
                <div className="resources-success-icon">
                  <CheckCircle2 className="resources-success-icon-inner" />
                </div>
                <h2>Article Posted!</h2>
                <p>
                  Thank you for sharing your insight with the community. Your article is now live.
                </p>
              </div>
            ) : (
              <>
                <div className="resources-modal-header">
                  <div>
                    <h2>Share Your Insight</h2>
                    <p>Your story could inspire thousands of families.</p>
                  </div>
                  <button type="button" onClick={closeModal} className="resources-modal-close">
                    <X className="resources-modal-close-icon" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="resources-form">
                  <div>
                    <label className="resources-form-label">
                      <User className="resources-form-icon" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Amaka Obi"
                      value={formData.authorName}
                      onChange={(e) => handleField('authorName', e.target.value)}
                      className={`resources-form-input${
                        formErrors.authorName ? ' is-error' : ''
                      }`}
                    />
                    {formErrors.authorName && (
                      <p className="resources-form-error">{formErrors.authorName}</p>
                    )}
                  </div>

                  <div>
                    <label className="resources-form-label">
                      <FileText className="resources-form-icon" />
                      Article Title
                    </label>
                    <input
                      type="text"
                      placeholder="Write a clear, descriptive title..."
                      value={formData.title}
                      onChange={(e) => handleField('title', e.target.value)}
                      className={`resources-form-input${formErrors.title ? ' is-error' : ''}`}
                    />
                    {formErrors.title && (
                      <p className="resources-form-error">{formErrors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="resources-form-label">
                      <Tag className="resources-form-icon" />
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleField('category', e.target.value)}
                      className="resources-form-select"
                    >
                      {postCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="resources-form-label">
                      <AlignLeft className="resources-form-icon" />
                      Short Preview
                      <span className="resources-form-helper">(shown on cards)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="A one-sentence summary of your article..."
                      value={formData.preview}
                      onChange={(e) => handleField('preview', e.target.value)}
                      className={`resources-form-textarea${
                        formErrors.preview ? ' is-error' : ''
                      }`}
                    />
                    {formErrors.preview && (
                      <p className="resources-form-error">{formErrors.preview}</p>
                    )}
                  </div>

                  <div>
                    <label className="resources-form-label">
                      <FileText className="resources-form-icon" />
                      Article Content
                    </label>
                    <textarea
                      rows={7}
                      placeholder="Write your full article here. Share your expertise, story, or insights..."
                      value={formData.content}
                      onChange={(e) => handleField('content', e.target.value)}
                      className={`resources-form-textarea${
                        formErrors.content ? ' is-error' : ''
                      }`}
                    />
                    {formErrors.content && (
                      <p className="resources-form-error">{formErrors.content}</p>
                    )}
                  </div>

                  <div>
                    <label className="resources-form-label">
                      <ImageIcon className="resources-form-icon" />
                      Cover Image
                      <span className="resources-form-helper">(optional, JPG/PNG/WEBP)</span>
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleCoverImageChange(e.target.files?.[0])}
                      className={`resources-form-input${formErrors.coverImage ? ' is-error' : ''}`}
                    />
                    {formErrors.coverImage && (
                      <p className="resources-form-error">{formErrors.coverImage}</p>
                    )}
                    {formData.coverImagePreview && (
                      <div className="resources-cover-preview">
                        <img src={formData.coverImagePreview} alt="Cover preview" />
                      </div>
                    )}
                  </div>

                  {formErrors.submit && (
                    <p className="resources-form-error">{formErrors.submit}</p>
                  )}

                  <div className="resources-form-actions">
                    <button type="button" onClick={closeModal} className="resources-form-cancel">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="resources-form-submit"
                      disabled={isSubmitting}
                    >
                      <Plus className="resources-form-submit-icon" />
                      {isSubmitting ? 'Publishing...' : 'Publish Article'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="resources-modal-overlay">
          <div className="resources-confirm-modal" role="dialog" aria-modal="true">
            <h3>Delete Article</h3>
            <p>
              Are you sure you want to delete "{deleteTarget.title}"? This action cannot be
              undone.
            </p>
            <div className="resources-confirm-actions">
              <button
                type="button"
                className="resources-form-cancel"
                onClick={closeDeleteModal}
                disabled={deleteBusy}
              >
                Cancel
              </button>
              <button
                type="button"
                className="resources-form-submit"
                onClick={confirmDelete}
                disabled={deleteBusy}
              >
                {deleteBusy ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
