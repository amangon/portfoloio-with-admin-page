import { useState } from 'react';

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const parts = (name || 'Aman Srivastava').split(' ');
  return (
    <nav className="nav">
      <a href="#home" className="nav-logo">
        {parts[0]}<span>.{(parts[1] || 'dev').toLowerCase()}</span>
      </a>
      <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      <div className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact" className="nav-cta">Let's Talk</a>
      </div>
    </nav>
  );
}
