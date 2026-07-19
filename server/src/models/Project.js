import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    tech: { type: [String], default: [] },
    image: { type: String, default: '' }, // uploaded image path or external URL
    video: { type: String, default: '' }, // uploaded video path or external URL (YouTube etc.)
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
