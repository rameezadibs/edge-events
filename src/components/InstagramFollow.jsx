import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { instagramProfile } from '../data/moments'

export default function InstagramFollow() {
  const [isHovered, setIsHovered] = useState(false)
  const reduced = useReducedMotion()

  const revealMotion = {
    initial: reduced ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.95, ease, delay: 0.25 }
  }

  return (
    <motion.div
      className="instagram-follow-block"
      {...revealMotion}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={instagramProfile.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="follow-editorial-link"
        aria-label={`Follow ${instagramProfile.handle} on Instagram (opens in new tab)`}
      >
        <div className="follow-heading-group">
          <span className="follow-kicker">DISPATCHES &amp; BEHIND THE SCENES</span>
          <h3 className="follow-statement">
            FOLLOW
            <br />
            <span className="statement-indent">THE MOMENTS.</span>
          </h3>
        </div>

        <div className="follow-handle-row">
          <div className="handle-tag-group">
            <span className="handle-at">INSTAGRAM</span>
            <span className="handle-name">{instagramProfile.handle}</span>
          </div>
          <motion.span
            className="follow-arrow-glyph"
            animate={{ x: isHovered ? 6 : 0, y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            ↗
          </motion.span>
        </div>

        <div className={`follow-editorial-rule ${isHovered ? 'active' : ''}`} aria-hidden="true" />
      </a>
    </motion.div>
  )
}
