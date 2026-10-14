import { motion, useReducedMotion } from 'framer-motion'
import './OurApproach.css'

const ease = [0.22, 1, 0.36, 1]

const principles = [
  {
    number: '01',
    step: '01',
    title: 'LISTEN FIRST',
    stage: 'Stage 01 · Discovery',
    description: 'We begin by understanding your goals, audience and vision.',
    glyph: 'acoustic',
  },
  {
    number: '02',
    step: '02',
    title: 'SHAPE THE EXPERIENCE',
    stage: 'Stage 02 · Concept',
    description: 'We turn ideas into a thoughtful creative direction and event journey.',
    glyph: 'construct',
  },
  {
    number: '03',
    step: '03',
    title: 'PERFECT THE DETAILS',
    stage: 'Stage 03 · Precision',
    description: 'From planning to coordination, every element is carefully considered.',
    glyph: 'calibrate',
  },
  {
    number: '04',
    step: '04',
    title: 'DELIVER THE MOMENT',
    stage: 'Stage 04 · Execution',
    description: 'We execute seamlessly so the experience feels effortless and memorable.',
    glyph: 'apex',
  },
]

function PrincipleGlyph({ type }) {
  if (type === 'acoustic') {
    return (
      <svg className="approach-glyph" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <circle cx="16" cy="16" r="3" />
        <path d="M16 8a8 8 0 0 1 8 8" />
        <path d="M16 3a13 13 0 0 1 13 13" />
        <path d="M8 16a8 8 0 0 1 8-8" strokeDasharray="1.5 2" />
      </svg>
    )
  }

  if (type === 'construct') {
    return (
      <svg className="approach-glyph" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <polygon points="16,4 28,16 16,28 4,16" />
        <line x1="4" y1="16" x2="28" y2="16" strokeDasharray="2 2" />
        <line x1="16" y1="4" x2="16" y2="28" strokeDasharray="2 2" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'calibrate') {
    return (
      <svg className="approach-glyph" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <circle cx="16" cy="16" r="12" />
        <line x1="16" y1="2" x2="16" y2="30" />
        <line x1="2" y1="16" x2="30" y2="16" />
        <circle cx="16" cy="16" r="5" strokeDasharray="1.5 2" />
      </svg>
    )
  }

  return (
    <svg className="approach-glyph" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M16 2v28M2 16h28" strokeDasharray="2 3" />
      <polygon points="16,6 19,13 26,16 19,19 16,26 13,19 6,16 13,13" fill="currentColor" fillOpacity="0.1" />
    </svg>
  )
}

export default function OurApproach({ onNavigate }) {
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
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease },
    },
  }

  const lineVariants = {
    hidden: reduced ? { scaleX: 1 } : { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.9, ease },
    },
  }

  const itemVariants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease },
    },
  }

  return (
    <section id="our-approach" className="our-approach" aria-labelledby="approach-heading">
      {/* Architectural subtle curved line background element */}
      <svg className="approach-curved-line" viewBox="0 0 1440 140" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90 C 420 20, 1020 160, 1440 50" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>

      <div className="approach-container">
        {/* Section Intro */}
        <header className="approach-header">
          <motion.div
            className="approach-kicker-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <span className="approach-label">OUR APPROACH</span>
            <motion.span className="approach-kicker-line" variants={lineVariants} aria-hidden="true" />
            <span className="approach-coords" aria-hidden="true">DISCIPLINED CRAFT</span>
          </motion.div>

          <div className="approach-title-grid">
            <motion.h2
              id="approach-heading"
              className="approach-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.span className="approach-heading-line" variants={fadeIn}>
                Thoughtfully planned.
              </motion.span>
              <motion.span className="approach-heading-accent" variants={fadeIn}>
                Beautifully delivered.
              </motion.span>
            </motion.h2>

            <motion.div
              className="approach-intro-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <p className="approach-intro-text">
                We believe exceptional experiences are never accidental. They are shaped through listening, creativity, precision and seamless execution.
              </p>
              <div className="approach-manifesto-micro" aria-hidden="true">
                PEOPLE / PURPOSE / PRECISION
              </div>
            </motion.div>
          </div>
        </header>

        {/* 4 Approach Principles Layout */}
        <div className="approach-grid-wrapper">
          <motion.ol
            className="approach-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
          >
            {principles.map((principle, index) => (
              <motion.li
                key={principle.number}
                className="approach-item group"
                variants={itemVariants}
                whileHover={reduced ? {} : { y: -6 }}
                transition={{ duration: 0.45, ease }}
              >
                {/* Oversized Faded Typographic Numeral */}
                <span className="approach-watermark" aria-hidden="true">
                  {principle.number}
                </span>

                <div>
                  {/* Top Marker Row */}
                  <div className="approach-item-top">
                    <span className="approach-badge" aria-hidden="true">
                      {principle.step}
                    </span>
                    <span className="approach-stage-tag">
                      {principle.stage}
                    </span>
                  </div>

                  {/* Core Content */}
                  <div className="approach-item-body">
                    <h3 className="approach-item-title">
                      {principle.number} — {principle.title}
                    </h3>
                    <div className="approach-item-divider" aria-hidden="true" />
                    <p className="approach-item-desc">
                      {principle.description}
                    </p>
                  </div>
                </div>

                {/* Minimal Abstract Geometric Motif */}
                <div className="approach-item-bottom">
                  <span className="approach-step-index" aria-hidden="true">
                    0{index + 1} / 04
                  </span>
                  <PrincipleGlyph type={principle.glyph} />
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Subtle Brand Statement & Refined CTA */}
        <motion.footer
          className="approach-footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="approach-brand-statement">
            LISTEN / CREATE / REFINE / DELIVER
          </div>

          <a
            href="#our-story"
            className="approach-cta"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate('services')
              }
            }}
          >
            <span>HOW WE WORK</span>
            <span className="approach-cta-line" aria-hidden="true" />
            <span className="approach-cta-arrow" aria-hidden="true">→</span>
          </a>
        </motion.footer>
      </div>
    </section>
  )
}
