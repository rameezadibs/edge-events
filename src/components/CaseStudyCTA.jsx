import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function CaseStudyCTA({ onExploreCaseStudies }) {
  return (
    <section className="case-study-feature-section" aria-labelledby="case-study-title">
      <div className="portfolio-container">
        <div className="case-study-panel">
          {/* Subtle Supporting Project Image (Real behind-the-scenes/production photo) */}
          <div className="case-study-media-col">
            <figure className="case-study-figure">
              <img
                src="/images/services-production-warm.jpg"
                alt="Behind the scenes technical rigging and stagecraft at The Edge Events production"
                className="case-study-bg-img"
                width="1400"
                height="900"
                loading="lazy"
              />
              <div className="case-study-overlay" aria-hidden="true" />
              <figcaption className="case-study-tag">
                PRODUCTION ARCHIVE · FIG. 08
              </figcaption>
            </figure>
          </div>

          {/* Editorial Content Column */}
          <div className="case-study-content-col">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="case-study-kicker">EDITORIAL ARCHIVE</span>

              <h2 id="case-study-title" className="case-study-heading">
                Behind every event,<br />
                <span className="heading-italic">there’s a story.</span>
              </h2>

              <p className="case-study-copy">
                Explore selected projects in more detail — from the original brief and creative concept
                to technical production and final delivery. Every commission is documented from spatial sketches
                to acoustic execution.
              </p>

              <div className="case-study-action-row">
                <button
                  type="button"
                  className="case-study-text-cta"
                  onClick={onExploreCaseStudies}
                  aria-label="Explore detailed project case studies"
                >
                  <span>EXPLORE CASE STUDIES</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
