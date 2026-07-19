import { Router } from 'express';
import Message from '../models/Message.js';
import auth from '../middleware/auth.js';

const router = Router();

// Public: submit a contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }
  const doc = await Message.create({ name, email, message });
  res.status(201).json({ ok: true, id: doc._id });
});

// Admin: list messages
router.get('/', auth, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// Admin: mark read / delete
router.put('/:id/read', auth, async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!msg) return res.status(404).json({ error: 'Not found' });
  res.json(msg);
});

router.delete('/:id', auth, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
