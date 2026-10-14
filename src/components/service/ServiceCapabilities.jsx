import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceCapabilities({ capabilities, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-capabilities-section service-capabilities--${theme}`} aria-labelledby="capabilities-heading">
      <div className="capabilities-container">
        <header className="capabilities-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{capabilities.eyebrow}</span>
          </motion.div>

          <div className="capabilities-header-split">
            <motion.h2 id="capabilities-heading" className="service-section-title font-serif" {...reveal(0.08)}>
              {capabilities.heading}
            </motion.h2>
            {capabilities.description && (
              <motion.p className="capabilities-intro-text" {...reveal(0.16)}>
                {capabilities.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* Dense, elegant architectural grid of capabilities with concise copy */}
        <div className="capabilities-grid">
          {capabilities.list.map((item, index) => (
            <motion.article
              key={item.title}
              className="capability-item"
              {...reveal(0.05 + (index % 3) * 0.08)}
            >
              <div className="capability-dot" aria-hidden="true" />
              <h3 className="capability-title font-serif text-lg">{item.title}</h3>
              <p className="capability-text text-sm">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
