import { Router } from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';

const router = Router();

// Public: list all projects
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json(projects);
});

// Public: single project
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

// Admin: create
router.post('/', auth, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

// Admin: update
router.put('/:id', auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

// Admin: delete
router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
