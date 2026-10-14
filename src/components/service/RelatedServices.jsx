import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

const allServices = [
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    path: '/services/corporate-events',
    tag: 'EDGE ENGAGEMENTS',
    summary: 'Conferences, product launches, gala dinners and business experiences delivered with strategic and technical precision across Dubai and the UAE.',
    anchorText: 'Explore Corporate Event Management in Dubai'
  },
  {
    id: 'social-celebrations',
    title: 'Social Celebrations',
    path: '/services/social-celebrations',
    tag: 'EDGE EXCLUSIVES',
    summary: 'Bespoke private parties, milestone celebrations, luxury dining experiences and intimate social gatherings shaped around personal stories.',
    anchorText: 'Discover Private & Social Celebration Planning'
  },
  {
    id: 'travel-expeditions',
    title: 'Travel & Expeditions',
    path: '/services/travel-expeditions',
    tag: 'EDGE EXPLORATIONS',
    summary: 'Curated journeys, executive retreats, desert expeditions and destination experiences crafted across the UAE’s extraordinary landscapes.',
    anchorText: 'View Curated UAE Travel & Expedition Experiences'
  }
]

export default function RelatedServices({ currentServiceId, theme }) {
  const reduced = useReducedMotion()
  const otherServices = allServices.filter(s => s.id !== currentServiceId)

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  })

  return (
    <nav className={`related-services-nav related-services--${theme}`} aria-label="Other services and portfolio">
      <div className="related-services-container">
        <header className="related-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">FURTHER EXPLORATION</span>
          </motion.div>
          <motion.h2 className="service-section-title font-serif" {...reveal(0.08)}>
            Explore Our Other Disciplines
          </motion.h2>
          <motion.p className="related-subtitle text-sm" {...reveal(0.14)}>
            Discover the full breadth of architectural event design, celebration styling, and destination curation delivered by The Edge Events.
          </motion.p>
        </header>

        <div className="related-cards-grid">
          {otherServices.map((service, idx) => (
            <motion.div
              key={service.id}
              className="related-service-card"
              {...reveal(0.1 + idx * 0.1)}
            >
              <div className="related-card-top flex items-center justify-between">
                <span className="related-tag font-mono text-xs">{service.tag}</span>
                <span className="related-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 className="related-card-title font-serif text-2xl">
                <a href={service.path} className="related-card-title-link">
                  {service.title}
                </a>
              </h3>
              <p className="related-card-summary text-sm">{service.summary}</p>
              <a
                href={service.path}
                className="related-explore-link flex items-center text-xs font-semibold uppercase tracking-wider"
              >
                <span>{service.anchorText}</span>
                <span className="link-arrow ml-2" aria-hidden="true">→</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Global Cross Links */}
        <motion.div className="global-cross-links flex items-center justify-center flex-wrap gap-8" {...reveal(0.3)}>
          <a href="/#our-work" className="cross-link font-serif text-sm">
            <span>Explore All Selected Works &amp; Portfolio</span>
            <span aria-hidden="true"> ⟶</span>
          </a>
          <span className="cross-divider text-stone-400" aria-hidden="true">|</span>
          <a href="/about" className="cross-link font-serif text-sm">
            <span>Learn About The Edge Events Studio</span>
            <span aria-hidden="true"> ⟶</span>
          </a>
          <span className="cross-divider text-stone-400" aria-hidden="true">|</span>
          <a href="#contact" className="cross-link font-serif text-sm">
            <span>Connect with our Dubai &amp; Abu Dhabi Desks</span>
            <span aria-hidden="true"> ⟶</span>
          </a>
        </motion.div>
      </div>
    </nav>
  )
}
