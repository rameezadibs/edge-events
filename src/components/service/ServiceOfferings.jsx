import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceOfferings({ offerings, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-offerings-section service-offerings--${theme}`} aria-labelledby="offerings-heading">
      <div className="offerings-container">
        <header className="offerings-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{offerings.eyebrow}</span>
          </motion.div>

          <div className="offerings-header-split">
            <motion.h2 id="offerings-heading" className="service-section-title font-serif" {...reveal(0.08)}>
              {offerings.heading}
            </motion.h2>
            {offerings.description && (
              <motion.p className="offerings-intro-text" {...reveal(0.16)}>
                {offerings.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* Editorial Structured List / Grid - Avoids generic card repetition */}
        <div className="offerings-grid">
          {offerings.items.map((item, index) => (
            <motion.article
              key={item.number}
              className="offering-entry"
              {...reveal(0.05 + (index % 4) * 0.08)}
            >
              <div className="offering-header flex items-baseline justify-between">
                <span className="offering-number font-mono text-xs">{item.number}</span>
                <span className="offering-indicator" aria-hidden="true">/</span>
              </div>
              <h3 className="offering-title font-serif text-xl">{item.title}</h3>
              <p className="offering-description text-sm">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
