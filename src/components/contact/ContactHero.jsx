import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function ContactHero() {
  const shouldReduceMotion = useReducedMotion()

  const fadeIn = (delay = 0, y = 16) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay: shouldReduceMotion ? 0 : delay, ease }
  })

  return (
    <section className="contact-hero-section" aria-labelledby="contact-hero-heading">
      <div className="contact-hero-container">
        {/* Top Label & Accent Line */}
        <motion.div
          className="contact-kicker-row flex items-center"
          {...fadeIn(0.1, 8)}
        >
          <span className="contact-kicker-label">CONTACT</span>
          <span className="contact-kicker-line" aria-hidden="true" />
          <span className="contact-kicker-sub text-xs tracking-widest text-[#6D7276]">DUBAI · UAE</span>
        </motion.div>

        {/* 2-Column Editorial Grid */}
        <div className="contact-hero-grid">
          {/* Main Headline & Supporting Copy */}
          <div className="contact-hero-main">
            <h1 id="contact-hero-heading" className="contact-hero-title">
              <motion.span className="block" {...fadeIn(0.2, 20)}>
                Let’s create
              </motion.span>
              <motion.span className="block" {...fadeIn(0.3, 20)}>
                something worth
              </motion.span>
              <motion.span className="block contact-hero-teal" {...fadeIn(0.4, 20)}>
                remembering.
              </motion.span>
            </h1>

            <motion.p
              className="contact-hero-copy"
              {...fadeIn(0.55, 16)}
            >
              Tell us what you’re planning, where you’re headed and what you want people to remember.
              We’ll help shape the next step.
            </motion.p>
          </div>

          {/* Hero Side Detail: Minimal Editorial Block + Single Refined Detail Visual */}
          <motion.div
            className="contact-hero-side"
            {...fadeIn(0.65, 18)}
          >
            <div className="contact-hero-side-card">
              <div className="contact-side-editorial">
                <span className="contact-side-tag">PLAN AN EXPERIENCE</span>
                <ul className="contact-side-services" aria-label="Edge Events Capabilities">
                  <li>Corporate Events</li>
                  <li>Social Celebrations</li>
                  <li>Travel &amp; Expeditions</li>
                </ul>
              </div>

              {/* Optional Small Supporting Visual — Refined Event Detail */}
              <div className="contact-side-visual-wrap">
                <div className="contact-side-visual">
                  <img
                    src="/images/why-choose-dinner.png"
                    alt="Refined candlelit floral dinner table setup by The Edge Events Dubai"
                    className="contact-side-img"
                    loading="eager"
                    width="600"
                    height="400"
                  />
                  <div className="contact-side-img-overlay" aria-hidden="true" />
                </div>
                <p className="contact-side-caption">
                  <span>DUBAI · ABU DHABI</span>
                  <span>PRIVATE PRODUCTION DETAIL</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
