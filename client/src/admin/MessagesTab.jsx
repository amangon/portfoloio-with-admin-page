import { useEffect, useState } from 'react';
import { api } from '../api';

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);

  const load = () => api.getMessages().then(setMessages).catch(() => {});
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    await api.deleteMessage(id);
    load();
  };

  if (!messages.length) return <p className="admin-note">No messages yet.</p>;

  return (
    <div className="admin-panel">
      {messages.map((m) => (
        <div className="admin-item admin-msg" key={m._id}>
          <div className="admin-item-head">
            <h3>{m.name}</h3>
            <button className="btn-sm danger" onClick={() => remove(m._id)}>Delete</button>
          </div>
          <small>{m.email} — {new Date(m.createdAt).toLocaleString()}</small>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
}
