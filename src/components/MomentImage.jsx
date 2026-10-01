import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'

export default function MomentImage({ post, delay = 0.2 }) {
  const [isHovered, setIsHovered] = useState(false)
  const reduced = useReducedMotion()

  const {
    editorialNumber,
    editorialLabel,
    caption,
    mediaUrl,
    permalink,
    alt,
    location,
    scope,
    aspectRatio
  } = post

  const revealMotion = {
    initial: reduced ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.9, ease, delay }
  }

  return (
    <motion.article
      className={`moment-image-card format-${aspectRatio}`}
      {...revealMotion}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Editorial Index Header */}
      <div className="moment-meta-header">
        <div className="meta-index-group">
          <span className="meta-num">{editorialNumber}</span>
          <span className="meta-slash">/</span>
          <span className="meta-label">{editorialLabel}</span>
        </div>
        <span className="moment-location-tag">{location}</span>
      </div>

      {/* Media Anchor Frame */}
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="moment-media-wrapper"
        aria-label={`View Instagram post: ${caption}`}
      >
        <div className="moment-frame">
          <motion.img
            src={mediaUrl}
            alt={alt}
            loading="lazy"
            className="moment-img"
            animate={{ scale: isHovered ? 1.025 : 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="moment-overlay" aria-hidden="true" />

          {/* Instagram Icon Badge on Hover */}
          <div className={`moment-ig-badge ${isHovered ? 'visible' : ''}`} aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-text">OPEN ↗</span>
          </div>

          {scope && (
            <div className="moment-scope-badge" aria-hidden="true">
              {scope}
            </div>
          )}
        </div>
      </a>

      {/* Caption with animated line on hover */}
      <div className="moment-caption-block">
        <p className="moment-caption-text">{caption}</p>
        <div className={`moment-caption-rule ${isHovered ? 'active' : ''}`} aria-hidden="true" />
      </div>
    </motion.article>
  )
}
