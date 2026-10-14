import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceCTA({ finalCta, theme, onAction }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-cta-section service-cta--${theme}`} aria-labelledby="cta-heading">
      <div className="service-cta-container">
        <div className="service-cta-card">
          <motion.div className="service-section-kicker flex items-center justify-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{finalCta.eyebrow}</span>
          </motion.div>

          <motion.h2 id="cta-heading" className="service-cta-title font-serif text-center" {...reveal(0.1)}>
            {finalCta.heading}
          </motion.h2>

          <motion.p className="service-cta-copy text-center max-w-xl mx-auto" {...reveal(0.2)}>
            {finalCta.copy}
          </motion.p>

          <motion.div className="service-cta-action flex justify-center" {...reveal(0.3)}>
            <a
              href={finalCta.buttonHref}
              className="service-btn-primary service-btn-cta"
              onClick={(e) => {
                if (onAction) {
                  e.preventDefault()
                  onAction('Plan an event')
                }
              }}
              id={`final-cta-btn-${theme}`}
            >
              <span>{finalCta.buttonText}</span>
              <span className="btn-arrow ml-2" aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
