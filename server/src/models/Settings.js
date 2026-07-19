import mongoose from 'mongoose';

// 3D / animation settings that the admin can tweak live from the dashboard.
const settingsSchema = new mongoose.Schema(
  {
    heroShape: {
      type: String,
      enum: ['torusKnot', 'sphere', 'icosahedron', 'octahedron', 'box'],
      default: 'torusKnot'
    },
    heroColor: { type: String, default: '#7c3aed' },
    accentColor: { type: String, default: '#22d3ee' },
    rotationSpeed: { type: Number, default: 0.5, min: 0, max: 5 },
    particleCount: { type: Number, default: 1500, min: 0, max: 8000 },
    particleColor: { type: String, default: '#ffffff' },
    wireframe: { type: Boolean, default: false },
    floatIntensity: { type: Number, default: 1, min: 0, max: 5 },
    bgColor: { type: String, default: '#0b0b16' },
    showStars: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
