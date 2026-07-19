import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { api } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './admin/Admin';

export const DEFAULT_SETTINGS = {
  heroShape: 'torusKnot',
  heroColor: '#7c3aed',
  accentColor: '#22d3ee',
  rotationSpeed: 0.5,
  particleCount: 1500,
  particleColor: '#ffffff',
  wireframe: false,
  floatIntensity: 1,
  bgColor: '#0b0b16',
  showStars: true,
  gltfModel: '',
  showGltfModel: false
};

const DEFAULT_PROFILE = {
  name: 'Aman Srivastava',
  headline: 'Full Stack Developer | AI & Automation Enthusiast',
  about: 'I build modern, scalable and user-friendly web applications.',
  skills: { frontend: [], backend: [], tools: [] },
  whatIBuild: [],
  learning: []
};

function Site() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([api.getProfile(), api.getProjects(), api.getSettings()]).then(
      ([p, pr, s]) => {
        if (p.status === 'fulfilled') setProfile(p.value);
        if (pr.status === 'fulfilled') setProjects(pr.value);
        if (s.status === 'fulfilled') setSettings({ ...DEFAULT_SETTINGS, ...s.value });
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    document.body.style.background = settings.bgColor;
  }, [settings.bgColor]);

  if (loading) return <div className="loader">Aman Srivastava</div>;

  const marqueeItems = [
    ...(profile.skills?.frontend || []),
    ...(profile.skills?.backend || [])
  ];

  return (
    <>
      <Navbar name={profile.name} />
      <Hero profile={profile} settings={settings} />
      <Marquee items={marqueeItems} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Contact profile={profile} />
      <Footer name={profile.name} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Site />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}
