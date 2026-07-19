import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Aman Srivastava' },
    headline: { type: String, default: '' },
    about: { type: String, default: '' },
    photo: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    skills: {
      frontend: { type: [String], default: [] },
      backend: { type: [String], default: [] },
      tools: { type: [String], default: [] }
    },
    whatIBuild: { type: [String], default: [] },
    learning: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
