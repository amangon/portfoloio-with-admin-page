import { useRef, useState } from 'react';
import { api } from '../api';

// Reusable upload control: uploads a file, calls onUploaded(url).
export default function FileUpload({ label, accept, value, onUploaded, isVideo = false }) {
  const inputRef = useRef();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const { url } = await api.upload(file);
      onUploaded(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <label>
      {label}
      <div className="upload-preview">
        {value && (isVideo
          ? <video src={value} muted loop autoPlay playsInline />
          : <img src={value} alt="" />)}
        <input type="file" accept={accept} ref={inputRef} onChange={handleFile} disabled={busy} />
        {value && (
          <button type="button" className="btn-sm danger" onClick={() => onUploaded('')}>
            Remove
          </button>
        )}
      </div>
      {busy && <span className="admin-note">Uploading…</span>}
      {error && <span className="admin-note" style={{ color: '#ef4444' }}>{error}</span>}
    </label>
  );
}
