import { motion, AnimatePresence } from 'framer-motion'
import { ease } from '../data/hero'

export default function TestimonialSlide({
  testimonial,
  nextTestimonial,
  onOpenStory,
  onNext,
}) {
  const {
    id,
    number,
    name,
    role,
    organisation,
    location,
    eventType,
    quote,
    badge,
  } = testimonial

  return (
    <div className="testimonial-slide-layout">
      {/* EDITORIAL QUOTE & CLIENT VOICE SPREAD */}
      <div className="testimonial-hero-content">
        {/* Typographic watermark quote mark */}
        <div className="quote-watermark" aria-hidden="true">
          “
        </div>

        <div className="quote-content-wrapper">
          {/* Subtle commission category indicator */}
          <div className="slide-category-badge">
            <span className="badge-dot" />
            <span className="badge-text">{badge}</span>
            <span className="badge-num">VOICE {number}</span>
          </div>

          {/* Main powerful quote statement */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={id}
              className="testimonial-quote-block"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="quote-statement">{quote}</p>
            </motion.blockquote>
          </AnimatePresence>

          {/* Client Credentials & Actions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${id}-author`}
              className="client-credentials-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease }}
            >
              <div className="author-hairline" aria-hidden="true" />
              <div className="author-meta-row">
                <div className="author-meta-info">
                  <h4 className="author-name">{name}</h4>
                  <p className="author-role-org">
                    <span>{role}</span>
                    <span className="meta-dot">·</span>
                    <span>{organisation}</span>
                  </p>
                  <p className="author-event-loc">
                    <span>{eventType}</span>
                    <span className="meta-dot">·</span>
                    <span className="author-loc">{location}</span>
                  </p>
                </div>

                {/* Read full story action button */}
                <div className="full-story-wrap">
                  <button
                    type="button"
                    className="read-story-btn"
                    onClick={() => onOpenStory(testimonial)}
                  >
                    <span className="btn-label">READ FULL STORY</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* NEXT STORY TEASER STRIP (Subtle right indicator) */}
      {nextTestimonial && (
        <aside
          className="next-story-preview"
          onClick={onNext}
          role="button"
          tabIndex={0}
          aria-label={`Next story: ${nextTestimonial.name}`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNext() }}
        >
          <div className="preview-inner">
            <span className="preview-label">NEXT STORY</span>
            <span className="preview-name">{nextTestimonial.name}</span>
            <span className="preview-quote-snippet">
              {nextTestimonial.quote.slice(0, 52)}...
            </span>
            <span className="preview-action-arrow">⟶</span>
          </div>
        </aside>
      )}
    </div>
  )
}
