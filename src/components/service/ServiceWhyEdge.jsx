import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'
import './ServiceWhyEdge.css'

const ENRICHED_DISTINCTION_POINTS = [
  {
    idx: '01',
    tag: 'AUTHENTICITY',
    title: 'Curated Itineraries',
    description: 'Every route, stop, and encounter is bespoke-crafted to avoid tourist clichés and deliver profound authenticity.',
    metric: '100% Bespoke Routes'
  },
  {
    idx: '02',
    tag: 'EXCLUSIVE ACCESS',
    title: 'Local Knowledge',
    description: 'Decades of regional mastery across the UAE, unlocking hidden geographical sanctuaries inaccessible to the public.',
    metric: 'Restricted Reserves & Dunes'
  },
  {
    idx: '03',
    tag: 'FIELD MASTERY',
    title: 'Seamless Coordination',
    description: 'Complete mastery of remote logistics, safety protocols, mobile power, satellite communications, and hospitality.',
    metric: 'Zero Operational Friction'
  },
  {
    idx: '04',
    tag: 'UNPARALLELED MOMENTS',
    title: 'Original Experiences',
    description: 'Private access to resident historians, Bedouin elders, conservationists, and world-class culinary artists.',
    metric: 'Private Cultural Mentors'
  },
  {
    idx: '05',
    tag: 'DEDICATED CONCIERGE',
    title: 'Personal Attention',
    description: 'Experienced travel directors dedicated to your group, ensuring every individual delegate feels deeply cared for.',
    metric: '1:1 Host-To-Guest Care'
  },
  {
    idx: '06',
    tag: 'SAFETY & DISCRETION',
    title: 'Complete Peace of Mind',
    description: 'Discreet contingency planning, 24/7 medical and operational redundancy, leaving you free to immerse in the journey.',
    metric: '24/7 Redundant Command'
  }
]

export default function ServiceWhyEdge({ whyEdge, theme }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  })

  // Merge provided points with enriched metadata
  const points = (whyEdge.points && whyEdge.points.length > 0)
    ? whyEdge.points.map((pt, i) => ({
        ...ENRICHED_DISTINCTION_POINTS[i],
        ...pt,
        idx: ENRICHED_DISTINCTION_POINTS[i]?.idx || `0${i + 1}`,
        tag: ENRICHED_DISTINCTION_POINTS[i]?.tag || 'DISTINCTION',
        metric: ENRICHED_DISTINCTION_POINTS[i]?.metric || 'Master Standard'
      }))
    : ENRICHED_DISTINCTION_POINTS

  return (
    <section
      id="edge-distinction"
      className={`service-why-section service-why--${theme}`}
      aria-labelledby="why-heading"
    >
      <div className="why-container">
        {/* Section Header */}
        <header className="why-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">
              {whyEdge.eyebrow || 'THE EDGE DISTINCTION'}
            </span>
          </motion.div>

          <div className="why-header-split">
            <motion.h2
              id="why-heading"
              className="service-section-title font-serif"
              {...reveal(0.08)}
            >
              {whyEdge.heading || 'Travel differently.'}
            </motion.h2>

            <motion.p className="why-intro-text" {...reveal(0.16)}>
              We reject standard tourist corridors and cookie-cutter hospitality. Every journey is engineered from the ground up as a one-of-a-kind expedition into the extraordinary.
            </motion.p>
          </div>
        </header>

        {/* Architectural Editorial Matrix (ZERO CARDS · PURE MONOLITHIC GRID) */}
        <div className="distinction-editorial-matrix" role="list" aria-label="The Edge Distinction Pillars">
          {points.map((pt, index) => (
            <motion.div
              key={pt.title}
              role="listitem"
              className="distinction-matrix-cell"
              {...reveal(0.06 + (index % 3) * 0.06)}
            >
              <div className="distinction-cell-top flex items-center justify-between">
                <span className="distinction-cell-num font-mono">{pt.idx} // 06</span>
                <span className="distinction-cell-tag font-mono">{pt.tag}</span>
              </div>

              <div className="distinction-cell-body">
                <h3 className="distinction-cell-title font-serif">{pt.title}</h3>
                <p className="distinction-cell-desc">{pt.description}</p>
              </div>

              <div className="distinction-cell-footer flex items-center justify-between">
                <span className="distinction-cell-metric font-mono">{pt.metric}</span>
                <span className="distinction-cell-arrow" aria-hidden="true">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card-Free Architectural Ethos Ribbon */}
        <motion.div className="distinction-ethos-bar" {...reveal(0.24)}>
          <div className="ethos-stat-col">
            <span className="ethos-stat-val font-serif">100%</span>
            <span className="ethos-stat-lbl font-mono">BESPOKE EXPEDITIONS</span>
          </div>

          <div className="ethos-stat-col">
            <span className="ethos-stat-val font-serif">24/7</span>
            <span className="ethos-stat-lbl font-mono">FIELD COMMAND DIRECTORS</span>
          </div>

          <div className="ethos-stat-col">
            <span className="ethos-stat-val font-serif">Zero</span>
            <span className="ethos-stat-lbl font-mono">TOURIST CORRIDORS</span>
          </div>

          <div className="ethos-stat-col ethos-stat-col--quote">
            <p className="ethos-quote-text font-serif">
              "Unlocking geographical sanctuaries and private horizons inaccessible to the standard traveler."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
