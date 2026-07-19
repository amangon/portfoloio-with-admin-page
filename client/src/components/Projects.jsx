import { motion } from 'framer-motion';

function isVideoFile(url) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

function ProjectMedia({ project }) {
  if (project.video && isVideoFile(project.video)) {
    return (
      <video src={project.video} muted loop playsInline autoPlay />
    );
  }
  if (project.image) return <img src={project.image} alt={project.title} loading="lazy" />;
  return <div className="placeholder">{project.title}</div>;
}

export default function Projects({ projects }) {
  return (
    <section className="section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-tag">Work</p>
        <h2 className="section-title">Featured Projects</h2>
      </motion.div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.article
            className="project-card"
            key={p._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
          >
            <div className="project-media">
              {p.featured && <span className="featured-badge">Featured</span>}
              <ProjectMedia project={p} />
            </div>
            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-tech">
                {p.tech?.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>}
                {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer">Code ↗</a>}
                {p.video && !isVideoFile(p.video) && (
                  <a href={p.video} target="_blank" rel="noreferrer">Video ↗</a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
