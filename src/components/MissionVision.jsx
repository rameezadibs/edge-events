import { motion, useReducedMotion } from 'framer-motion'
import './MissionVision.css'

const ease = [0.22, 1, 0.36, 1]

export default function MissionVision({ onNavigate }) {
  const reduced = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
      },
    },
  }

  const fadeIn = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease },
    },
  }

  const lineVariants = {
    hidden: reduced ? { scaleX: 1 } : { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.9, ease },
    },
  }

  const verticalLineVariants = {
    hidden: reduced ? { scaleY: 1 } : { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease },
    },
  }

  const italicDelay = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: reduced ? 0 : 0.2, ease },
    },
  }

  return (
    <section id="mission-vision" className="mission-vision" aria-labelledby="mission-vision-heading">
      {/* Creative Typographic Detail: Oversized Architectural Phrase in Background */}
      <div className="mv-bg-watermark" aria-hidden="true">
        WHAT’S NEXT
      </div>

      {/* Subtle Architectural Curved Line Connecting Mission → Vision */}
      <svg className="mv-curved-line" viewBox="0 0 1440 220" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 160 C 380 40, 940 220, 1440 70" stroke="#006696" strokeWidth="0.8" strokeDasharray="3 5" />
      </svg>

      <div className="mv-container">
        {/* Section Intro */}
        <header className="mv-header">
          <motion.div
            className="mv-kicker-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <span className="mv-label">MISSION & VISION</span>
            <motion.span className="mv-kicker-line" variants={lineVariants} aria-hidden="true" />
            <span className="mv-meta-tag" aria-hidden="true">BRAND PHILOSOPHY</span>
          </motion.div>

          <div className="mv-heading-grid">
            <motion.h2
              id="mission-vision-heading"
              className="mv-main-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.span className="mv-heading-line" variants={fadeIn}>
                Purpose for today.
              </motion.span>
              <motion.span className="mv-heading-line-accent" variants={fadeIn}>
                Vision for <motion.span className="mv-heading-italic" variants={italicDelay}>what’s next.</motion.span>
              </motion.span>
            </motion.h2>

            <motion.div
              className="mv-intro-copy-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <p className="mv-intro-copy">
                Our mission defines how we create today.
                <br />
                Our vision shapes the experiences we aim to create tomorrow.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Layout: Asymmetrical Two-Zone Editorial Spread */}
        <div className="mv-spread">
          {/* Zone 01: OUR MISSION */}
          <motion.article
            className="mv-zone-mission group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            aria-labelledby="mission-title"
          >
            {/* Oversized Architectural Background Numeral */}
            <span className="mv-numeral-bg" aria-hidden="true">
              01
            </span>

            <motion.div className="mv-zone-meta" variants={fadeIn}>
              <span className="mv-zone-num" aria-hidden="true">01</span>
              <span id="mission-title" className="mv-zone-tag">OUR MISSION</span>
              <span className="mv-zone-line" aria-hidden="true" />
            </motion.div>

            <motion.h3 className="mv-statement" variants={fadeIn}>
              To create experiences that bring people together and leave a{' '}
              <span className="mv-highlight-italic">lasting impression.</span>
            </motion.h3>

            <motion.p className="mv-supporting-copy" variants={fadeIn}>
              We create meaningful experiences shaped by purpose, creativity and attention to detail —
              moments designed to connect, inspire and remain with people long after the event ends.
            </motion.p>
          </motion.article>

          {/* Central Segmented Architectural Divider with NOW / NEXT Concept */}
          <div className="mv-central-divider" aria-hidden="true">
            <motion.div
              className="mv-divider-segment"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={verticalLineVariants}
            />
            <div className="mv-now-next-badge">
              <span>NOW</span>
              <span className="mv-teal-marker" />
              <span className="mv-next-arrow">↓</span>
              <span>NEXT</span>
            </div>
            <motion.div
              className="mv-divider-segment"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={verticalLineVariants}
            />
          </div>

          {/* Mobile Transition Helper */}
          <div className="mv-mobile-transition md:hidden" aria-hidden="true">
            <span>NOW → NEXT</span>
            <span />
          </div>

          {/* Zone 02: OUR VISION */}
          <motion.article
            className="mv-zone-vision group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            aria-labelledby="vision-title"
          >
            {/* Oversized Architectural Background Numeral */}
            <span className="mv-numeral-bg" aria-hidden="true">
              02
            </span>

            <motion.div className="mv-zone-meta" variants={fadeIn}>
              <span className="mv-zone-num" aria-hidden="true">02</span>
              <span id="vision-title" className="mv-zone-tag">OUR VISION</span>
              <span className="mv-zone-line" aria-hidden="true" />
            </motion.div>

            <motion.h3 className="mv-statement" variants={fadeIn}>
              To shape extraordinary experiences that connect people, ideas and{' '}
              <span className="mv-highlight-italic">possibility.</span>
            </motion.h3>

            <motion.p className="mv-supporting-copy" variants={fadeIn}>
              We envision a future where thoughtful experiences build stronger connections,
              spark new ideas and create positive impact across people, communities and cultures.
            </motion.p>
          </motion.article>
        </div>

        {/* Bottom Signature & Section Transition CTA */}
        <motion.footer
          className="mv-footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="mv-brand-signature">
            PEOPLE / PURPOSE / POSSIBILITY
          </div>

          <a
            href="#our-approach"
            className="mv-cta-link"
            onClick={(e) => {
              if (onNavigate) {
                // Allows smooth transition or opening interactive panels if configured
                const target = document.getElementById('our-approach')
                if (target) {
                  e.preventDefault()
                  target.scrollIntoView({ behavior: 'smooth' })
                }
              }
            }}
          >
            <span>OUR VALUES</span>
            <span className="mv-cta-line" aria-hidden="true" />
            <span className="mv-cta-arrow" aria-hidden="true">→</span>
          </a>
        </motion.footer>
      </div>
    </section>
  )
}
