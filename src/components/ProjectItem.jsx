import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'

export default function ProjectItem({ project, index, onSelect, isSpotlighted = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const reduced = useReducedMotion()

  const {
    number,
    category,
    title,
    location,
    detail,
    image,
    alt,
    layoutType,
    caption,
    coordinates,
    year,
    scope
  } = project

  // Editorial stagger delay based on index for scroll reveal
  const delays = [0, 0.12, 0.08, 0.16]
  const delay = delays[index % delays.length]

  const itemVariants = {
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.95, ease, delay }
  }

  const handleAction = (e) => {
    e.preventDefault()
    if (onSelect) {
      onSelect(project)
    }
  }

  return (
    <motion.article
      className={`selected-project-item layout-${layoutType} ${isSpotlighted ? 'is-active' : 'is-dimmed'}`}
      {...itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual media frame */}
      <div 
        className="project-media-wrapper" 
        onClick={handleAction}
        role="button"
        tabIndex={0}
        aria-label={`View project details for ${title}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAction(e) }}
      >
        <div className="project-media-frame">
          <motion.img
            src={image}
            alt={alt || title}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="project-image"
            animate={{ scale: isHovered ? 1.028 : 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Subtle warm grain vignette overlay for real documentary texture */}
          <div className="project-media-overlay" aria-hidden="true" />

          {/* Interactive hover badge */}
          <div className={`media-hover-indicator ${isHovered ? 'visible' : ''}`} aria-hidden="true">
            <span>VIEW PROJECT</span>
            <span className="hover-arrow">⟶</span>
          </div>
        </div>
      </div>

      {/* Project content & metadata */}
      <div className="project-content">
        <div className="project-header">
          <span className="project-number project-number-badge">
            <span className="num-dot" />
            {number}
          </span>
          <span className="project-category">{category}</span>
        </div>

        <h3 className="project-title" onClick={handleAction}>
          <a href={project.link || '#'} onClick={handleAction}>
            {title}
          </a>
        </h3>

        <div className="project-meta">
          <span className="project-location">{location}</span>
          {detail && (
            <>
              <span className="meta-separator" aria-hidden="true">·</span>
              <span className="project-detail">{detail}</span>
            </>
          )}
        </div>

        {scope && (
          <p className="project-scope-tagline">
            {scope}
          </p>
        )}

        <div className="project-cta-wrap">
          <a
            href={project.link || '#'}
            className="project-cta"
            onClick={handleAction}
            aria-label={`View project ${title}`}
          >
            <span className="cta-label">VIEW PROJECT</span>
            <motion.span
              className="cta-arrow"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}
