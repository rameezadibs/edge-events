import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function BlogCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="blog-final-cta-section" aria-labelledby="blog-cta-heading">
      <div className="blog-final-cta-container">
        <motion.div
          className="blog-final-cta-content"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease }}
        >
          <span className="blog-final-kicker">COMMISSION AN EXPERIENCE</span>

          <h2 id="blog-cta-heading" className="blog-final-heading">
            Inspired by
            <br />
            something you’ve seen?
            <span className="block mt-2 font-normal">
              Let’s <span className="blog-final-teal-italic">create your own.</span>
            </span>
          </h2>

          <p className="blog-final-copy">
            Tell us what you’re planning and let’s turn the idea into an experience.
          </p>

          <div className="blog-final-actions">
            <a
              href="/contact"
              className="blog-cta-primary-btn"
            >
              <span>START A CONVERSATION</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>

            <a
              href="/services"
              className="blog-cta-secondary-btn"
            >
              <span>EXPLORE OUR SERVICES</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="blog-final-presence-bar">
            <span>THE EDGE EVENTS</span>
            <span className="sep-dot" aria-hidden="true">·</span>
            <span>DUBAI &amp; ABU DHABI</span>
            <span className="sep-dot" aria-hidden="true">·</span>
            <span>BESPOKE EXPERIENCES ACROSS THE UAE</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
