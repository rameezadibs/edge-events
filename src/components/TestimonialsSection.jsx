import { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { testimonials } from '../data/testimonials'
import TestimonialSlide from './TestimonialSlide'
import TestimonialNavigation from './TestimonialNavigation'
import './TestimonialsSection.css'

function TestimonialModal({ story, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (story && !dialog.open) {
      dialog.showModal()
    } else if (!story && dialog.open) {
      dialog.close()
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [story, onClose])

  if (!story) return null

  return (
    <dialog
      ref={dialogRef}
      className="testimonial-story-dialog"
      aria-labelledby="story-modal-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="story-modal-inner">
        <button
          type="button"
          className="story-modal-close"
          onClick={onClose}
          aria-label="Close client interview"
        >
          ✕
        </button>

        <div className="story-modal-layout">
          <div className="story-modal-content">
            <div className="modal-badge-row">
              <span className="modal-badge">{story.badge}</span>
              <span className="modal-num">VOICE {story.number} / 05</span>
            </div>

            <h2 id="story-modal-title" className="modal-client-name">
              {story.name}
            </h2>
            <p className="modal-client-role">
              {story.role} · {story.organisation}
            </p>
            <p className="modal-client-loc">
              {story.eventType} · {story.location}
            </p>

            <blockquote className="modal-quote-text">
              “{story.quote}”
            </blockquote>

            <div className="modal-divider" aria-hidden="true" />

            <div className="modal-case-body">
              <h4 className="case-heading">CLIENT REFLECTION</h4>
              <p className="case-narrative">{story.fullStory}</p>
            </div>

            <div className="modal-footer">
              <p className="modal-sign">
                Documented with discretion by The Edge Events Archive.
              </p>
              <button
                type="button"
                className="modal-return-btn"
                onClick={onClose}
              >
                Return to Stories <span aria-hidden="true">⟶</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeStoryModal, setActiveStoryModal] = useState(null)
  const reduced = useReducedMotion()

  const total = testimonials.length
  const currentTestimonial = testimonials[currentIndex]
  const nextTestimonial = testimonials[(currentIndex + 1) % total]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const revealMotion = {
    initial: reduced ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease },
  }

  return (
    <>
      <section
        id="testimonials"
        className="testimonials-section"
        aria-labelledby="testimonials-heading"
      >
        <div className="testimonials-container">
          {/* Subtle paper grain texture backdrop */}
          <div className="testimonials-paper-texture" aria-hidden="true" />

          {/* 1. SECTION INTRO */}
          <header className="testimonials-intro-area">
            <div className="intro-badge-row flex items-center">
              <span className="testimonials-eyebrow">CLIENT STORIES</span>
              <span className="testimonials-hairline" aria-hidden="true" />
              <span className="testimonials-voice-tag">THE REPUTATION</span>
            </div>

            <motion.h2
              id="testimonials-heading"
              className="testimonials-heading"
              {...revealMotion}
            >
              The moments end.
              <br />
              <em className="heading-emphasis">The impression stays.</em>
            </motion.h2>

            <motion.p
              className="testimonials-subline"
              {...revealMotion}
              transition={{ duration: 0.9, delay: 0.15, ease }}
            >
              Perspectives from clients, patrons, and institutional partners who have trusted The Edge with their most consequential occasions.
            </motion.p>
          </header>

          {/* Thin editorial divider */}
          <div className="testimonials-divider-line" aria-hidden="true" />

          {/* 2. MAIN TESTIMONIAL SLIDE (One featured client voice at a time) */}
          <TestimonialSlide
            testimonial={currentTestimonial}
            nextTestimonial={nextTestimonial}
            onOpenStory={setActiveStoryModal}
            onNext={handleNext}
          />

          {/* 4. FOOTER CONTROLS: Bottom-Left CTA + Bottom-Right Navigation */}
          <footer className="testimonials-footer-row">
            <div className="footer-left-cta">
              <button
                type="button"
                className="read-more-cta"
                onClick={() => setActiveStoryModal(currentTestimonial)}
              >
                <span className="cta-label">READ MORE CLIENT STORIES</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="footer-right-nav">
              <TestimonialNavigation
                currentIndex={currentIndex}
                total={total}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
          </footer>
        </div>
      </section>

      {/* Full Editorial Client Interview Dialog */}
      <TestimonialModal
        story={activeStoryModal}
        onClose={() => setActiveStoryModal(null)}
      />
    </>
  )
}
