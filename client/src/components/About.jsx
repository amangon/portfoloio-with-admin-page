import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }
};

export default function About({ profile }) {
  const initials = (profile.name || 'AS').split(' ').map((w) => w[0]).join('');
  return (
    <section className="section" id="about">
      <motion.div {...fadeUp}>
        <p className="section-tag">About Me</p>
        <h2 className="section-title">Building the web,<br />one idea at a time</h2>
      </motion.div>
      <div className="about-grid">
        <motion.div className="about-photo" {...fadeUp}>
          {profile.photo
            ? <img src={profile.photo} alt={profile.name} />
            : <div className="placeholder">{initials}</div>}
        </motion.div>
        <motion.div className="about-text" {...fadeUp}>
          <p>{profile.about}</p>

          <div className="skill-group">
            <h4>What I Build</h4>
            <div className="chips">
              {profile.whatIBuild?.map((w) => <span className="chip" key={w}>{w}</span>)}
            </div>
          </div>

          {['frontend', 'backend', 'tools'].map((group) => (
            <div className="skill-group" key={group}>
              <h4>{group}</h4>
              <div className="chips">
                {profile.skills?.[group]?.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          ))}

          <div className="skill-group">
            <h4>Currently Learning</h4>
            <div className="chips">
              {profile.learning?.map((l) => <span className="chip" key={l}>{l}</span>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
