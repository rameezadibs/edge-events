import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectDetailModal({ project, onClose, onStartConversation }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const prevFocused = document.activeElement

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    // Update URL hash without reload for deep linking
    if (project.slug) {
      window.history.replaceState(null, '', `#${project.slug}`)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
      prevFocused?.focus?.({ preventScroll: true })
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="portfolio-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <motion.div
        className="portfolio-modal-window"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close project monograph"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="modal-scrollable-content">
          {/* Main Full-Scale Image */}
          <div className="modal-hero-image-wrap">
            <img
              src={project.image}
              alt={project.alt || project.title}
              className="modal-hero-image"
              width="1600"
              height="1000"
            />
            <div className="modal-image-caption">
              <span className="caption-tag">OUR PAST WORK</span>
              <span className="caption-loc">{project.location}</span>
            </div>
          </div>

          {/* Editorial Case Study Content */}
          <div className="modal-body-container">
            <div className="modal-meta-bar">
              <span className="modal-cat-tag">{project.category}</span>
              <span className="modal-sep">/</span>
              <span className="modal-year">{project.year}</span>
              {project.result && (
                <>
                  <span className="modal-sep">/</span>
                  <span className="modal-result-pill">{project.result}</span>
                </>
              )}
            </div>

            <h2 id="modal-project-title" className="modal-project-heading">
              {project.title}
            </h2>

            <div className="modal-location-subtitle">
              <span>{project.location}</span>
            </div>

            <div className="modal-narrative-block">
              <p className="modal-lead-desc">
                {project.fullNarrative || project.description}
              </p>
            </div>

            {/* Scope of Work */}
            {project.scope && (
              <div className="modal-scope-section">
                <span className="scope-kicker">SCOPE OF WORK</span>
                <p className="scope-details-text">{project.scope}</p>
              </div>
            )}

            {/* Inquire CTA row */}
            <div className="modal-actions-strip">
              <button
                type="button"
                className="modal-inquire-btn"
                onClick={() => {
                  onClose()
                  onStartConversation?.()
                }}
              >
                <span>PLAN A SIMILAR EVENT</span>
                <span className="arrow" aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className="modal-dismiss-link"
                onClick={onClose}
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
