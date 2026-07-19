import { useEffect, useState } from 'react';
import { api } from '../api';
import Scene3D from '../three/Scene3D';
import { DEFAULT_SETTINGS } from '../App';

const SHAPES = [
  { value: 'torusKnot', label: 'Torus Knot' },
  { value: 'sphere', label: 'Sphere' },
  { value: 'icosahedron', label: 'Icosahedron' },
  { value: 'octahedron', label: 'Octahedron' },
  { value: 'box', label: 'Cube' }
];

export default function AnimationTab() {
  const [s, setS] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.getSettings().then((data) => setS({ ...DEFAULT_SETTINGS, ...data }));
  }, []);
  if (!s) return <p className="admin-note">Loading…</p>;

  const set = (key, val) => setS({ ...s, [key]: val });

  const save = async () => {
    setStatus('Saving…');
    try {
      await api.updateSettings(s);
      setStatus('Saved ✓ — refresh the homepage to see it live');
    } catch (e) {
      setStatus(e.message);
    }
  };

  return (
    <div className="admin-panel">
      <div style={{ height: 300, borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', background: s.bgColor, position: 'relative' }}>
        <Scene3D settings={s} />
      </div>
      <p className="admin-note">Live preview — changes apply instantly above, click Save to publish.</p>

      <div className="admin-row-3">
        <label>3D Shape
          <select value={s.heroShape} onChange={(e) => set('heroShape', e.target.value)}>
            {SHAPES.map((sh) => <option key={sh.value} value={sh.value}>{sh.label}</option>)}
          </select>
        </label>
        <label>Shape color
          <div className="color-row">
            <input type="color" value={s.heroColor} onChange={(e) => set('heroColor', e.target.value)} />
            <span>{s.heroColor}</span>
          </div>
        </label>
        <label>Light / accent color
          <div className="color-row">
            <input type="color" value={s.accentColor} onChange={(e) => set('accentColor', e.target.value)} />
            <span>{s.accentColor}</span>
          </div>
        </label>
      </div>

      <div className="admin-row-3">
        <label>Particle color
          <div className="color-row">
            <input type="color" value={s.particleColor} onChange={(e) => set('particleColor', e.target.value)} />
            <span>{s.particleColor}</span>
          </div>
        </label>
        <label>Background color
          <div className="color-row">
            <input type="color" value={s.bgColor} onChange={(e) => set('bgColor', e.target.value)} />
            <span>{s.bgColor}</span>
          </div>
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10, textTransform: 'none' }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={s.wireframe} onChange={(e) => set('wireframe', e.target.checked)} />
          Wireframe
          <input type="checkbox" style={{ width: 'auto', marginLeft: 16 }} checked={s.showStars} onChange={(e) => set('showStars', e.target.checked)} />
          Stars
        </label>
      </div>

      <label>Rotation speed
        <div className="range-row">
          <input type="range" min="0" max="5" step="0.1" value={s.rotationSpeed} onChange={(e) => set('rotationSpeed', Number(e.target.value))} />
          <span className="range-val">{s.rotationSpeed}</span>
        </div>
      </label>
      <label>Float intensity
        <div className="range-row">
          <input type="range" min="0" max="5" step="0.1" value={s.floatIntensity} onChange={(e) => set('floatIntensity', Number(e.target.value))} />
          <span className="range-val">{s.floatIntensity}</span>
        </div>
      </label>
      <label>Particle count
        <div className="range-row">
          <input type="range" min="0" max="8000" step="100" value={s.particleCount} onChange={(e) => set('particleCount', Number(e.target.value))} />
          <span className="range-val">{s.particleCount}</span>
        </div>
      </label>

      <label>GLTF Model URL
        <div className="color-row">
          <input type="text" value={s.gltfModel} placeholder="Enter .glb or .gltf URL (e.g., https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Duck/glTF-Binary/Duck.glb)" onChange={(e) => set('gltfModel', e.target.value)} />
        </div>
      </label>
      <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10, textTransform: 'none' }}>
        <input type="checkbox" style={{ width: 'auto' }} checked={s.showGltfModel} onChange={(e) => set('showGltfModel', e.target.checked)} />
        Show GLTF Model
        <span className="admin-note" style={{ fontSize: '0.75em', marginLeft: 8 }}>Toggle to show custom 3D model instead of procedural shapes</span>
      </label>

      <div className="save-bar">
        {status && <span className="admin-note">{status}</span>}
        <button className="btn" onClick={save}>Save Animation Settings</button>
      </div>
    </div>
  );
}
