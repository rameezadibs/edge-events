import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceProjects({ projects, theme, onSelectProject }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-projects-section service-projects--${theme}`} id="selected-work" aria-labelledby="projects-heading">
      <div className="projects-container">
        <header className="projects-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{projects.eyebrow}</span>
          </motion.div>

          <div className="projects-header-split">
            <motion.h2 id="projects-heading" className="service-section-title font-serif" {...reveal(0.08)}>
              {projects.heading}
            </motion.h2>
            {projects.description && (
              <motion.p className="projects-intro-text" {...reveal(0.16)}>
                {projects.description}
              </motion.p>
            )}
          </div>
        </header>

        <div className="projects-grid">
          {projects.items.map((item, index) => (
            <motion.article
              key={item.id}
              className="project-card"
              {...reveal(0.1 + index * 0.1)}
            >
              <div className="project-image-box relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="project-img"
                />
                <div className="project-image-shade" aria-hidden="true" />
                <span className="project-type-tag font-mono text-xs uppercase">{item.type}</span>
              </div>

              <div className="project-details">
                <div className="project-meta-line flex items-center justify-between text-xs">
                  <span className="project-location font-medium">{item.location}</span>
                  <span className="project-scope text-stone-500">{item.scope}</span>
                </div>

                <h3 className="project-name font-serif text-2xl">{item.name}</h3>
                <p className="project-description text-sm">{item.description}</p>

                <div className="project-actions">
                  <a
                    href="/#our-work"
                    className="project-case-study-link flex items-center"
                    aria-label={`View case study for ${item.name}`}
                  >
                    <span>VIEW CASE STUDY</span>
                    <span className="link-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
