// Seeds the database with Aman Srivastava's profile, projects and default 3D settings.
// Run: npm run seed
import 'dotenv/config';
import mongoose from 'mongoose';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import Settings from './models/Settings.js';

const profile = {
  name: 'Aman Srivastava',
  headline: 'B.Tech CS (Cyber Security) Student | Full Stack Developer | AI & Automation Enthusiast',
  about:
    'I build modern, scalable and user-friendly web applications using JavaScript, React, Next.js, Node.js, Express and MongoDB. I enjoy creating real-world projects, AI-powered applications, responsive websites and complete full-stack solutions.',
  photo: '',
  email: 'srivastava4048@gmail.com',
  phone: '+91 7054905260',
  github: 'https://github.com/amangon',
  linkedin: '',
  skills: {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Firebase'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Cloudinary', 'Render', 'Vercel']
  },
  whatIBuild: [
    'Full Stack MERN Applications',
    'AI Powered Web Applications',
    '3D Portfolio Websites',
    'Business & E-Commerce Websites',
    'Admin Dashboards',
    'REST APIs',
    'Authentication Systems',
    'Responsive UI/UX'
  ],
  learning: ['Advanced React', 'Next.js', 'AI Integration', 'Cyber Security', 'System Design', 'Cloud Deployment']
};

const projects = [
  {
    title: 'WoodZeno Furniture Platform',
    description: 'Modern MERN furniture e-commerce platform with secure backend and responsive UI.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/amangon/WoodZeno',
    featured: true,
    order: 1
  },
  {
    title: 'Luxury Jewellery MERN Store',
    description: 'Premium luxury jewellery store built with React and modern UI design.',
    tech: ['React', 'MERN', 'Tailwind CSS'],
    repoUrl: 'https://github.com/amangon/luxury-jewellery-hero',
    featured: true,
    order: 2
  },
  {
    title: 'AI Interview Platform',
    description: 'AI-powered interview practice platform with intelligent question generation and feedback.',
    tech: ['React', 'Node.js', 'AI Integration'],
    featured: true,
    order: 3
  },
  {
    title: 'SIH Team Project',
    description: 'Smart India Hackathon collaborative project repository.',
    tech: ['React', 'Node.js', 'MongoDB'],
    repoUrl: 'https://github.com/amangon/SIH-team-working',
    order: 4
  },
  {
    title: 'NN Pharma Website',
    description: 'Pharmaceutical company website with responsive business design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/amangon/nnpharma.github.io',
    order: 5
  },
  {
    title: 'Green City Project',
    description: 'Smart Green City web solution for sustainable urban development.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/amangon/greencity',
    order: 6
  },
  {
    title: 'WoodZeno Backend',
    description: 'REST API backend for WoodZeno using Node.js, Express and MongoDB.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/amangon/woodzeno-backend',
    order: 7
  },
  {
    title: '3D Developer Portfolio',
    description: 'This website! Interactive 3D portfolio with React Three Fiber and a full admin panel.',
    tech: ['React', 'Three.js', 'Express', 'MongoDB'],
    order: 8
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected. Seeding...');

  await Profile.deleteMany({});
  await Profile.create(profile);
  console.log('Profile seeded');

  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(projects);
    console.log(`${projects.length} projects seeded`);
  } else {
    console.log(`Skipped projects (${count} already exist)`);
  }

  if (!(await Settings.findOne())) {
    await Settings.create({});
    console.log('Default 3D settings created');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
