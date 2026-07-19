import { useEffect, useState } from 'react';
import { api } from '../api';
import FileUpload from './FileUpload';

const csv = (arr) => (arr || []).join(', ');
const parse = (str) => str.split(',').map((s) => s.trim()).filter(Boolean);

export default function ProfileTab() {
  const [p, setP] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => { api.getProfile().then(setP); }, []);
  if (!p) return <p className="admin-note">Loading…</p>;

  const set = (key, val) => setP({ ...p, [key]: val });

  const save = async () => {
    setStatus('Saving…');
    try {
      await api.updateProfile(p);
      setStatus('Saved ✓');
    } catch (e) {
      setStatus(e.message);
    }
  };

  return (
    <div className="admin-panel">
      <FileUpload
        label="Profile photo"
        accept="image/*"
        value={p.photo}
        onUploaded={(url) => set('photo', url)}
      />
      <div className="admin-row">
        <label>Name<input value={p.name || ''} onChange={(e) => set('name', e.target.value)} /></label>
        <label>Headline<input value={p.headline || ''} onChange={(e) => set('headline', e.target.value)} /></label>
      </div>
      <label>About<textarea rows={5} value={p.about || ''} onChange={(e) => set('about', e.target.value)} /></label>
      <div className="admin-row">
        <label>Email<input value={p.email || ''} onChange={(e) => set('email', e.target.value)} /></label>
        <label>Phone<input value={p.phone || ''} onChange={(e) => set('phone', e.target.value)} /></label>
      </div>
      <div className="admin-row">
        <label>GitHub URL<input value={p.github || ''} onChange={(e) => set('github', e.target.value)} /></label>
        <label>LinkedIn URL<input value={p.linkedin || ''} onChange={(e) => set('linkedin', e.target.value)} /></label>
      </div>
      <label>What I build (comma separated)
        <input value={csv(p.whatIBuild)} onChange={(e) => set('whatIBuild', parse(e.target.value))} />
      </label>
      <label>Frontend skills
        <input value={csv(p.skills?.frontend)} onChange={(e) => set('skills', { ...p.skills, frontend: parse(e.target.value) })} />
      </label>
      <label>Backend skills
        <input value={csv(p.skills?.backend)} onChange={(e) => set('skills', { ...p.skills, backend: parse(e.target.value) })} />
      </label>
      <label>Tools
        <input value={csv(p.skills?.tools)} onChange={(e) => set('skills', { ...p.skills, tools: parse(e.target.value) })} />
      </label>
      <label>Currently learning
        <input value={csv(p.learning)} onChange={(e) => set('learning', parse(e.target.value))} />
      </label>
      <div className="save-bar">
        {status && <span className="admin-note">{status}</span>}
        <button className="btn" onClick={save}>Save Profile</button>
      </div>
    </div>
  );
}
