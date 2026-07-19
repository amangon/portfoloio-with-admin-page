import { motion } from 'framer-motion';
import Scene3D from '../three/Scene3D';

export default function Hero({ profile, settings }) {
  const name = profile.name || 'Aman Srivastava';
  const [first, ...rest] = name.split(' ');
  return (
    <header className="hero" id="home">
      <Scene3D settings={settings} />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="hero-kicker">Full Stack Developer — 3D Portfolio</p>
        <h1 className="hero-title">
          {first} <span className="outline">{rest.join(' ')}</span>
        </h1>
        <p className="hero-sub">{profile.headline}</p>
      </motion.div>
      <div className="hero-scroll">Scroll</div>
    </header>
  );
}
