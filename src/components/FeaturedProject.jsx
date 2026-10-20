import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function FeaturedProject({ project, onOpenProject }) {
  if (!project) return null

  return (
    <section className="featured-project-section" aria-labelledby="featured-project-heading">
      <div className="portfolio-container">
        <h2 id="featured-project-heading" className="sr-only">
          Featured Project: {project.title}
        </h2>

        <motion.article
          className="featured-project-article"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
        >
          {/* LEFT: Large project image */}
          <div
            className="featured-media-pane group"
            onClick={() => onOpenProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpenProject(project)
              }
            }}
            aria-label={`View case study for ${project.title}`}
          >
            <div className="featured-img-frame">
              <img
                src={project.image}
                alt={project.alt || `${project.title} executive summit stage`}
                className="featured-img"
                width="1600"
                height="1000"
                loading="eager"
              />
              <div className="featured-img-overlay" aria-hidden="true" />
              <div className="featured-hover-badge" aria-hidden="true">
                <span>VIEW CASE STUDY</span>
                <span className="arrow">↗</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Project Information */}
          <div className="featured-info-pane">
            <div className="featured-meta-header">
              <span className="featured-badge">FEATURED PROJECT</span>
              <span className="featured-divider-line" aria-hidden="true" />
              <span className="featured-year">{project.year}</span>
            </div>

            <h3 className="featured-title">
              <button
                type="button"
                className="featured-title-btn"
                onClick={() => onOpenProject(project)}
              >
                {project.title}
              </button>
            </h3>

            <div className="featured-taxonomy">
              <span className="taxonomy-item taxonomy-category">{project.category}</span>
              <span className="taxonomy-sep">/</span>
              <span className="taxonomy-item taxonomy-location">{project.location}</span>
            </div>

            <p className="featured-description">
              {project.description}
            </p>

            {/* Verified Result Strip */}
            {project.result && (
              <div className="featured-verified-result">
                <span className="result-label">VERIFIED OUTCOME</span>
                <span className="result-value">{project.result}</span>
              </div>
            )}

            {/* Text CTA */}
            <div className="featured-cta-row">
              <button
                type="button"
                className="featured-text-cta"
                onClick={() => onOpenProject(project)}
                aria-label={`View full case study for ${project.title}`}
              >
                <span>VIEW CASE STUDY</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
