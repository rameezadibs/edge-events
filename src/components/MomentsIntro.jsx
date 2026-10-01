import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { instagramProfile } from '../data/moments'

export default function MomentsIntro() {
  const reduced = useReducedMotion()

  const revealVariants = {
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease }
  }

  return (
    <div className="moments-intro-block">
      {/* Eyebrow Label */}
      <div className="moments-label-row flex items-center">
        <span className="moments-eyebrow">BEHIND THE EXPERIENCE</span>
        <span className="moments-hairline" aria-hidden="true" />
        <span className="moments-edition-stamp">INSTAGRAM ARCHIVE</span>
      </div>

      {/* Main Headline */}
      <motion.h2
        id="moments-heading"
        className="moments-heading"
        {...revealVariants}
      >
        The moments
        <br />
        between the
        <br />
        <em className="moments-cyan-italic">moments.</em>
      </motion.h2>

      {/* Supporting Copy */}
      <motion.p
        className="moments-subline"
        {...revealVariants}
        transition={{ duration: 0.9, delay: 0.15, ease }}
      >
        A closer look at the people, places and unforgettable experiences that
        make every moment extraordinary.
      </motion.p>

      {/* Follow The Journey Action */}
      <motion.div
        className="moments-cta-wrapper"
        {...revealVariants}
        transition={{ duration: 0.9, delay: 0.25, ease }}
      >
        <a
          href={instagramProfile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="follow-journey-btn"
          aria-label="Follow the journey on Instagram (opens in new tab)"
        >
          <span className="btn-text">FOLLOW THE JOURNEY</span>
          <span className="btn-arrow" aria-hidden="true">↗</span>
        </a>
      </motion.div>
    </div>
  )
}
