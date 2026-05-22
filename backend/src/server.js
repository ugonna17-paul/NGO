import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';
import { connectDb } from './db.js';
import resourcesRouter from './routes/resources.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/resources', resourcesRouter);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Image must be 5MB or smaller.' });
  }

  if (err.message?.includes('Only JPG')) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message || 'Server error' });
});

await connectDb();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
