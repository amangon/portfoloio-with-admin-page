export default function Marquee({ items }) {
  const list = items?.length ? items : ['React', 'Three.js', 'Node.js', 'MongoDB'];
  const doubled = [...list, ...list];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => <span key={i}>{item} ✦</span>)}
      </div>
    </div>
  );
}
