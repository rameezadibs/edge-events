import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceDestinations({ destinations }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className="service-destinations-section" id="destinations" aria-labelledby="destinations-heading">
      <div className="destinations-container">
        <header className="destinations-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{destinations.eyebrow}</span>
          </motion.div>

          <div className="destinations-header-split">
            <motion.h2 id="destinations-heading" className="service-section-title font-serif" {...reveal(0.08)}>
              {destinations.heading}
            </motion.h2>
            {destinations.description && (
              <motion.p className="destinations-intro-text" {...reveal(0.16)}>
                {destinations.description}
              </motion.p>
            )}
          </div>
        </header>

        <div className="destinations-grid">
          {destinations.items.map((item, index) => (
            <motion.article
              key={item.region}
              className="destination-card"
              {...reveal(0.1 + index * 0.08)}
            >
              <div className="destination-meta flex items-center justify-between">
                <span className="destination-region font-mono text-xs uppercase tracking-wider">{item.region}</span>
                <span className="destination-coords font-mono text-xs text-stone-400">{item.coordinates}</span>
              </div>

              <h3 className="destination-title font-serif text-xl">{item.title}</h3>
              <p className="destination-description text-sm">{item.description}</p>

              {item.highlights && item.highlights.length > 0 && (
                <div className="destination-highlights">
                  <span className="highlights-label text-xs uppercase text-stone-500 font-semibold block mb-2">Highlights</span>
                  <ul className="highlights-pills flex flex-wrap gap-2">
                    {item.highlights.map(h => (
                      <li key={h} className="highlight-pill text-xs">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
