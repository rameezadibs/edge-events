import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceWhyEdge({ whyEdge, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-why-section service-why--${theme}`} aria-labelledby="why-heading">
      <div className="why-container">
        <header className="why-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{whyEdge.eyebrow}</span>
          </motion.div>

          <motion.h2 id="why-heading" className="service-section-title font-serif" {...reveal(0.08)}>
            {whyEdge.heading}
          </motion.h2>
        </header>

        <div className="why-grid">
          {whyEdge.points.map((pt, index) => (
            <motion.article
              key={pt.title}
              className="why-point-card"
              {...reveal(0.1 + (index % 3) * 0.08)}
            >
              <div className="why-card-top flex items-center justify-between">
                <span className="why-index font-mono text-xs">0{index + 1}</span>
                <span className="why-accent-line" aria-hidden="true" />
              </div>
              <h3 className="why-point-title font-serif text-xl">{pt.title}</h3>
              <p className="why-point-text text-sm">{pt.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
