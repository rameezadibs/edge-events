import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function PortfolioHero() {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-h1">
      {/* Hidden single semantic H1 for Top SERP SEO hierarchy while visually presenting editorial heading */}
      <h1 id="portfolio-h1" className="sr-only">
        Event Portfolio & Selected Experiences | The Edge Events Dubai
      </h1>

      <div className="portfolio-container">
        {/* Top Eyebrow Strip */}
        <motion.div
          className="portfolio-hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="hero-kicker-wrap">
            <span className="hero-label">OUR WORK</span>
            <span className="hero-kicker-line" aria-hidden="true" />
          </div>
          <div className="hero-statement-tag" aria-hidden="true">
            <span>CORPORATE</span>
            <span className="dot-sep">·</span>
            <span>SOCIAL</span>
            <span className="dot-sep">·</span>
            <span>DESTINATION</span>
          </div>
        </motion.div>

        {/* Hero Editorial Copy */}
        <div className="portfolio-hero-content">
          <div className="portfolio-hero-copy">
            <div className="hero-headline" aria-hidden="true">
              <motion.span
                className="headline-row block text-charcoal"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                Experiences
              </motion.span>
              <motion.span
                className="headline-row block text-charcoal"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
              >
                we’ve brought
              </motion.span>
              <motion.span
                className="headline-row headline-teal-italic block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
              >
                to life.
              </motion.span>
            </div>

            <motion.p
              className="portfolio-hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              A curated look at the corporate events, private celebrations and destination experiences
              we’ve created across the UAE and beyond.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
