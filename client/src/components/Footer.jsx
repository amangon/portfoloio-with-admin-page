export default function Footer({ name }) {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {name || 'Aman Srivastava'}. All rights reserved.</span>
      <span>Built with React, Three.js, Node.js & MongoDB</span>
      <a href="/admin">Admin</a>
    </footer>
  );
}
