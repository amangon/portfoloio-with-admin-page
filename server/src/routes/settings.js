import { Router } from 'express';
import Settings from '../models/Settings.js';
import auth from '../middleware/auth.js';

const router = Router();

// Public: get animation/3D settings
router.get('/', async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json(settings);
});

// Admin: update settings
router.put('/', auth, async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json(settings);
});

export default router;
