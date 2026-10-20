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

        {/* Hero Editorial Grid: Left Copy & Right/Lower Horizontal Real Event Photograph */}
        <div className="portfolio-hero-grid">
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

          {/* Right Horizontal Documentary Event Photo */}
          <motion.div
            className="portfolio-hero-media"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
          >
            <figure className="hero-image-figure">
              <div className="hero-image-frame">
                <img
                  src="/images/services-production.jpg"
                  alt="Documentary event photograph of full-scale production stage and lighting architecture in Dubai"
                  className="hero-documentary-img"
                  width="1920"
                  height="1080"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="hero-image-overlay" aria-hidden="true" />
              </div>
              <figcaption className="hero-image-caption">
                <span className="caption-tag">LIVE STAGE ARCHITECTURE</span>
                <span className="caption-loc">DUBAI, UAE</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
