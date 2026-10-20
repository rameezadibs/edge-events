import { motion } from 'framer-motion'
import { brandPillars, verifiedHighlights } from '../data/portfolioData'

const ease = [0.22, 1, 0.36, 1]

export default function PortfolioHighlights() {
  return (
    <section className="portfolio-highlights-section" aria-labelledby="highlights-heading">
      <div className="portfolio-container">
        <h2 id="highlights-heading" className="sr-only">
          The Edge Events Core Disciplines & Highlights
        </h2>

        {/* Clean Typography-Led Strip */}
        <div className="highlights-strip-wrapper">
          <div className="highlights-banner">
            <span className="banner-eyebrow">OUR CORE DISCIPLINES</span>
            <div className="pillars-large-typography" aria-hidden="true">
              <span>STRATEGY</span>
              <span className="pillar-sep">/</span>
              <span>CREATIVITY</span>
              <span className="pillar-sep">/</span>
              <span>PRODUCTION</span>
              <span className="pillar-sep">/</span>
              <span>EXPERIENCE</span>
            </div>
          </div>

          <div className="pillars-grid">
            {brandPillars.map((item, index) => (
              <motion.div
                key={item.label}
                className="pillar-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease }}
              >
                <div className="pillar-num-label">0{index + 1}</div>
                <h3 className="pillar-title">{item.label}</h3>
                <p className="pillar-detail">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Verified Footprint Sub-Strip */}
          <div className="highlights-footprint-row">
            {verifiedHighlights.map((hl) => (
              <div key={hl.label} className="footprint-item">
                <span className="footprint-label">{hl.label}</span>
                <span className="footprint-val">{hl.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
