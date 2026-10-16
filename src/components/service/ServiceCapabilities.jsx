import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceCapabilities({ capabilities, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  const bgImage = capabilities.backgroundImage || '/images/services-production-warm.jpg'

  return (
    <section
      className={`service-capabilities-section service-capabilities--${theme}`}
      aria-labelledby="capabilities-heading"
      style={{ backgroundImage: `url(${bgImage})` }}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Full-bleed image overlay — deep gradient for readability */}
      <div className="capabilities-image-overlay" aria-hidden="true" />

      <div className="capabilities-container">
        {/* Header row */}
        <header className="capabilities-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot kicker-dot--light" aria-hidden="true" />
            <span className="kicker-text kicker-text--light uppercase tracking-widest text-xs font-semibold">
              {capabilities.eyebrow}
            </span>
          </motion.div>

          <div className="capabilities-header-split">
            <motion.h2
              id="capabilities-heading"
              className="service-section-title font-serif capabilities-title--light"
              itemProp="name"
              {...reveal(0.08)}
            >
              {capabilities.heading}
            </motion.h2>
            {capabilities.description && (
              <motion.p className="capabilities-intro-text capabilities-intro-text--light" itemProp="description" {...reveal(0.16)}>
                {capabilities.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* Dense editorial capabilities grid — floating over image */}
        <div className="capabilities-grid">
          {capabilities.list.map((item, index) => (
            <motion.article
              key={item.title}
              className="capability-item capability-item--dark"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Thing"
              {...reveal(0.04 + (index % 3) * 0.07)}
            >
              <meta itemProp="position" content={String(index + 1)} />
              <div className="capability-dot" aria-hidden="true" />
              <h3 className="capability-title capability-title--light font-serif text-lg" itemProp="name">{item.title}</h3>
              <p className="capability-text capability-text--light text-sm" itemProp="description">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

