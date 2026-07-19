import { useEffect, useState } from 'react';
import { api } from '../api';
import FileUpload from './FileUpload';

const EMPTY = { title: '', description: '', tech: [], image: '', video: '', liveUrl: '', repoUrl: '', featured: false, order: 0 };

function ProjectForm({ project, onSave, onCancel, onDelete }) {
  const [p, setP] = useState(project);
  const set = (key, val) => setP({ ...p, [key]: val });

  return (
    <div className="admin-item">
      <div className="admin-row">
        <label>Title<input value={p.title} onChange={(e) => set('title', e.target.value)} /></label>
        <label>Order<input type="number" value={p.order} onChange={(e) => set('order', Number(e.target.value))} /></label>
      </div>
      <label>Description<textarea rows={3} value={p.description} onChange={(e) => set('description', e.target.value)} /></label>
      <label>Tech (comma separated)
        <input
          value={p.tech.join(', ')}
          onChange={(e) => set('tech', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
        />
      </label>
      <FileUpload label="Project image" accept="image/*" value={p.image} onUploaded={(url) => set('image', url)} />
      <FileUpload label="Project video (mp4/webm — autoplays on card)" accept="video/*" value={p.video} onUploaded={(url) => set('video', url)} isVideo />
      <label>Or paste a video URL (YouTube etc.)
        <input value={p.video} onChange={(e) => set('video', e.target.value)} placeholder="https://..." />
      </label>
      <div className="admin-row">
        <label>Live URL<input value={p.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} /></label>
        <label>Repo URL<input value={p.repoUrl} onChange={(e) => set('repoUrl', e.target.value)} /></label>
      </div>
      <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <input type="checkbox" style={{ width: 'auto' }} checked={p.featured} onChange={(e) => set('featured', e.target.checked)} />
        Featured project
      </label>
      <div className="admin-item-head">
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-sm primary" onClick={() => onSave(p)}>Save</button>
          <button className="btn-sm" onClick={onCancel}>Cancel</button>
        </div>
        {onDelete && <button className="btn-sm danger" onClick={onDelete}>Delete</button>}
      </div>
    </div>
  );
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null); // id | 'new' | null
  const [status, setStatus] = useState('');

  const load = () => api.getProjects().then(setProjects);
  useEffect(() => { load(); }, []);

  const save = async (p) => {
    setStatus('Saving…');
    try {
      if (p._id) await api.updateProject(p._id, p);
      else await api.createProject(p);
      setEditing(null);
      setStatus('Saved ✓');
      load();
    } catch (e) {
      setStatus(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.deleteProject(id);
    setEditing(null);
    load();
  };

  return (
    <div className="admin-panel">
      <div className="admin-item-head">
        <span className="admin-note">{projects.length} projects {status && `— ${status}`}</span>
        <button className="btn-sm primary" onClick={() => setEditing('new')}>+ Add Project</button>
      </div>
      {editing === 'new' && (
        <ProjectForm project={EMPTY} onSave={save} onCancel={() => setEditing(null)} />
      )}
      {projects.map((p) =>
        editing === p._id ? (
          <ProjectForm
            key={p._id}
            project={p}
            onSave={save}
            onCancel={() => setEditing(null)}
            onDelete={() => remove(p._id)}
          />
        ) : (
          <div className="admin-item" key={p._id}>
            <div className="admin-item-head">
              <h3>{p.title} {p.featured && '★'}</h3>
              <button className="btn-sm" onClick={() => setEditing(p._id)}>Edit</button>
            </div>
            <span className="admin-note">{p.description}</span>
          </div>
        )
      )}
    </div>
  );
}
