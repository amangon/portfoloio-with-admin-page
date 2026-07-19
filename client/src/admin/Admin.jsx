import { useState } from 'react';
import { api, getToken, setToken, clearToken } from '../api';
import ProfileTab from './ProfileTab';
import ProjectsTab from './ProjectsTab';
import AnimationTab from './AnimationTab';
import MessagesTab from './MessagesTab';

const TABS = [
  { id: 'profile', label: 'Profile & Photo', component: ProfileTab },
  { id: 'projects', label: 'Projects & Videos', component: ProjectsTab },
  { id: 'animation', label: '3D Animation', component: AnimationTab },
  { id: 'messages', label: 'Messages', component: MessagesTab }
];

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await api.login(password);
      setToken(token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-card" onSubmit={submit}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <span className="admin-note" style={{ color: '#ef4444' }}>{error}</span>}
        <button className="btn">Login</button>
        <a href="/" className="admin-note">← Back to site</a>
      </form>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [tab, setTab] = useState('profile');

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const Active = TABS.find((t) => t.id === tab).component;

  return (
    <div className="admin-wrap">
      <div className="admin-item-head" style={{ marginBottom: 26 }}>
        <h2 className="display">Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/" className="btn-sm">View Site</a>
          <button
            className="btn-sm danger"
            onClick={() => { clearToken(); setLoggedIn(false); }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="admin-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <Active />
    </div>
  );
}
