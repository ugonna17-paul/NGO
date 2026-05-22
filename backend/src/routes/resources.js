import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Resource } from '../models/Resource.js';

const router = express.Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeBase = path
      .basename(file.originalname || 'upload', ext)
      .replace(/[^a-z0-9-_]+/gi, '-');
    cb(null, `${Date.now()}-${safeBase}${ext || '.jpg'}`);
  },
});

const imageTypes = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (!imageTypes.has(ext)) {
      return cb(new Error('Only JPG, PNG, and WEBP images are allowed.'));
    }
    return cb(null, true);
  },
});

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1588776814546-1ffbb0a80e22?w=800&q=80';

const buildResourceResponse = (resource, req) => {
  const host = `${req.protocol}://${req.get('host')}`;
  const coverImage = resource.coverImagePath
    ? `${host}${resource.coverImagePath}`
    : DEFAULT_COVER;

  return {
    id: resource._id.toString(),
    author: {
      name: resource.authorName,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        resource.authorName
      )}&background=4BAE6F&color=fff&size=128`,
    },
    date: resource.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    category: resource.category,
    coverImage,
    title: resource.title,
    preview: resource.preview,
    content: resource.content,
    likes: resource.likes,
  };
};

router.get('/', async (req, res, next) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources.map((resource) => buildResourceResponse(resource, req)));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    return res.json(buildResourceResponse(resource, req));
  } catch (err) {
    return next(err);
  }
});

router.post('/', upload.single('coverImage'), async (req, res, next) => {
  try {
    const { authorName, title, category, preview, content } = req.body;
    if (!authorName || !title || !category || !preview || !content) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const coverImagePath = req.file ? `/uploads/${req.file.filename}` : '';
    const resource = await Resource.create({
      authorName: authorName.trim(),
      title: title.trim(),
      category: category.trim(),
      preview: preview.trim(),
      content: content.trim(),
      coverImagePath,
    });

    return res.status(201).json(buildResourceResponse(resource, req));
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id/likes', async (req, res, next) => {
  try {
    const delta = Number(req.body?.delta ?? 1);
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: delta } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.json(buildResourceResponse(resource, req));
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const coverPath = resource.coverImagePath
      ? path.join(process.cwd(), resource.coverImagePath.replace(/^\//, ''))
      : null;

    await resource.deleteOne();

    if (coverPath) {
      fs.promises.unlink(coverPath).catch(() => {});
    }

    return res.json({ message: 'Resource deleted' });
  } catch (err) {
    return next(err);
  }
});

export default router;
