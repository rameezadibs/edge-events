import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'

export default function FeaturedReel({ post }) {
  const [isHovered, setIsHovered] = useState(false)
  const reduced = useReducedMotion()

  const {
    editorialNumber,
    editorialLabel,
    caption,
    duration,
    mediaUrl,
    permalink,
    alt,
    location,
    scope
  } = post

  const revealMotion = {
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.95, ease, delay: 0.1 }
  }

  return (
    <motion.article
      className="featured-reel-card"
      {...revealMotion}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Editorial Index Row */}
      <div className="reel-meta-header">
        <div className="meta-index-group">
          <span className="meta-num">{editorialNumber}</span>
          <span className="meta-slash">/</span>
          <span className="meta-label">{editorialLabel}</span>
        </div>
        {duration && (
          <span className="reel-duration-pill">
            <span className="pill-dot" />
            {duration} · REEL
          </span>
        )}
      </div>

      {/* Media Anchor Frame */}
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="reel-media-wrapper"
        aria-label={`View Instagram Reel: ${caption}`}
      >
        <div className="reel-frame">
          <motion.img
            src={mediaUrl}
            alt={alt}
            loading="lazy"
            className="reel-image"
            animate={{ scale: isHovered ? 1.025 : 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Film grain vignette & cinematic tint */}
          <div className="reel-overlay" aria-hidden="true" />

          {/* Minimalist Circular Play Button */}
          <div className={`reel-play-btn ${isHovered ? 'active' : ''}`} aria-hidden="true">
            <div className="play-ring" />
            <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
              <path d="M2.5 1.8L16.2 10 2.5 18.2V1.8Z" />
            </svg>
          </div>

          {/* Instagram Corner Mark */}
          <div className={`reel-corner-badge ${isHovered ? 'visible' : ''}`} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="badge-handle">VIEW REEL ↗</span>
          </div>

          {/* Location / Scope Tag */}
          <div className="reel-bottom-tag" aria-hidden="true">
            <span className="tag-loc">{location}</span>
            <span className="tag-sep">·</span>
            <span className="tag-scope">{scope}</span>
          </div>
        </div>
      </a>

      {/* Caption & Animated Underline */}
      <div className="reel-caption-block">
        <p className="reel-caption-text">{caption}</p>
        <div className={`reel-caption-rule ${isHovered ? 'active' : ''}`} aria-hidden="true" />
      </div>
    </motion.article>
  )
}
