import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceProcess({ process, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-process-section service-process--${theme}`} aria-labelledby="process-heading">
      <div className="process-container">
        <header className="process-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{process.eyebrow}</span>
          </motion.div>

          <div className="process-header-split">
            <motion.h2 id="process-heading" className="service-section-title font-serif" {...reveal(0.08)}>
              {process.heading}
            </motion.h2>
            {process.description && (
              <motion.p className="process-intro-text" {...reveal(0.16)}>
                {process.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* 4-Stage Sequential Flow */}
        <div className="process-stages-grid">
          {process.stages.map((stage, index) => (
            <motion.article
              key={stage.step}
              className="process-stage-card"
              {...reveal(0.1 + index * 0.1)}
            >
              <div className="stage-top flex items-center justify-between">
                <span className="stage-number font-mono text-xs">{stage.step}</span>
                <span className="stage-line" aria-hidden="true" />
              </div>

              <h3 className="stage-title font-serif text-2xl">{stage.name}</h3>
              <p className="stage-summary font-medium text-sm">{stage.summary}</p>
              {stage.detail && (
                <p className="stage-detail text-xs">{stage.detail}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
