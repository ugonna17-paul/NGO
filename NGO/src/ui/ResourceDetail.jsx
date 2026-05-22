import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import './Resources.css';

const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(
  /\/$/,
  ''
);

const buildApiUrl = (path) => `${apiBase}${path}`;

export default function ResourceDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadPost = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/resources/${id}`), {
          signal: controller.signal,
        });
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article not found');
          }
          throw new Error('Failed to load article');
        }
        const data = await response.json();
        if (isMounted) {
          setPost(data);
          setError('');
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message || 'Failed to load article');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="resource-detail-page">
        <div className="resource-detail-container">
          <Link to="/resources" className="resource-detail-back">
            <ArrowLeft className="resource-detail-back-icon" />
            Back to resources
          </Link>
          <div className="resource-detail-missing">
            <h2>Loading article...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="resource-detail-page">
        <div className="resource-detail-container">
          <Link to="/resources" className="resource-detail-back">
            <ArrowLeft className="resource-detail-back-icon" />
            Back to resources
          </Link>
          <div className="resource-detail-missing">
            <h2>{error || 'Article not found'}</h2>
            <p>The article you are looking for does not exist or was moved.</p>
            <Link to="/resources" className="resource-detail-cta">
              Browse all resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-detail-page">
      <section className="resource-detail-hero">
        <div className="resource-detail-container">
          <Link to="/resources" className="resource-detail-back">
            <ArrowLeft className="resource-detail-back-icon" />
            Back to resources
          </Link>
          <div className="resource-detail-meta">
            <span className="resource-detail-pill">{post.category}</span>
            <span className="resource-detail-meta-item">
              <Calendar className="resource-detail-meta-icon" />
              {post.date}
            </span>
            <span className="resource-detail-meta-item">
              <User className="resource-detail-meta-icon" />
              {post.author?.name}
            </span>
          </div>
          <h1 className="resource-detail-title">{post.title}</h1>
          <p className="resource-detail-lead">{post.preview}</p>
        </div>
      </section>

      <section className="resource-detail-body">
        <div className="resource-detail-container">
          <div className="resource-detail-cover">
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              className="resource-detail-cover-image"
            />
          </div>
          <div className="resource-detail-content">
            {(post.content || '')
              .split('\n')
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
