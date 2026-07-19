import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');
    try {
      await api.sendMessage(form);
      setStatus('Message sent! I will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-tag">Contact</p>
        <h2 className="section-title">Let's build something<br />amazing together</h2>
      </motion.div>
      <div className="contact-grid">
        <div className="contact-info">
          <p>Have a project in mind or just want to say hi? Drop a message — I'm always open to new opportunities and collaborations.</p>
          {profile.email && <div className="contact-line"><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>}
          {profile.phone && <div className="contact-line"><span>Phone</span><a href={`tel:${profile.phone}`}>{profile.phone}</a></div>}
          {profile.github && <div className="contact-line"><span>GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace('https://', '')}</a></div>}
          {profile.linkedin && <div className="contact-line"><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace('https://', '')}</a></div>}
        </div>
        <form className="contact-form" onSubmit={submit}>
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button className="btn" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
