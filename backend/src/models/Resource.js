import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    preview: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    coverImagePath: { type: String, default: '' },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Resource = mongoose.model('Resource', resourceSchema);
