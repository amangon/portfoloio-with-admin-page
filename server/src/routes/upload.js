import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import auth from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

const ALLOWED = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'],
  video: ['.mp4', '.webm', '.mov'],
  model: ['.glb', '.gltf']
};
const ALL_EXT = Object.values(ALLOWED).flat();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALL_EXT.includes(ext)) return cb(new Error(`File type ${ext} not allowed`));
    cb(null, true);
  }
});

const router = Router();

// Admin: upload an image, video or 3D model. Returns the public URL.
router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
