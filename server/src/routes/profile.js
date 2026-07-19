import { Router } from 'express';
import Profile from '../models/Profile.js';
import auth from '../middleware/auth.js';

const router = Router();

// Public: get profile (single document)
router.get('/', async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  res.json(profile);
});

// Admin: update profile
router.put('/', auth, async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = new Profile();
  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

export default router;
