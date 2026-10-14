import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceIntro({ intro, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-intro-section service-intro--${theme}`} aria-labelledby="service-intro-heading">
      <div className="service-intro-container">
        <header className="service-intro-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{intro.eyebrow}</span>
          </motion.div>

          <motion.h2 id="service-intro-heading" className="service-section-title font-serif" {...reveal(0.1)}>
            {intro.heading}
          </motion.h2>
        </header>

        <div className="service-intro-grid">
          {/* Main editorial narrative copy */}
          <div className="service-intro-narrative">
            {intro.paragraphs.map((p, idx) => (
              <motion.p key={idx} className="service-intro-p" {...reveal(0.18 + idx * 0.08)}>
                {p}
              </motion.p>
            ))}
          </div>

          {/* Key Strategic Pillars */}
          {intro.pillars && intro.pillars.length > 0 && (
            <aside className="service-intro-pillars" aria-label="Key Pillars">
              <div className="pillars-wrapper">
                <span className="pillars-label text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-4">
                  CORE TENETS
                </span>
                <ul className="pillars-list">
                  {intro.pillars.map((pillar, i) => (
                    <motion.li key={pillar.label} className="pillar-item" {...reveal(0.25 + i * 0.1)}>
                      <h3 className="pillar-title font-serif text-lg">{pillar.label}</h3>
                      <p className="pillar-detail text-sm">{pillar.detail}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
