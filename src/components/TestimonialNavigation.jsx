import { motion } from 'framer-motion'

export default function TestimonialNavigation({
  currentIndex,
  total,
  onPrev,
  onNext,
}) {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0')
  const totalFormatted = String(total).padStart(2, '0')

  return (
    <div className="testimonial-nav-container" role="group" aria-label="Testimonial controls">
      {/* Editorial Counter: 01 / 05 */}
      <div className="nav-counter" aria-live="polite">
        <span className="counter-current">{currentFormatted}</span>
        <span className="counter-sep">/</span>
        <span className="counter-total">{totalFormatted}</span>
      </div>

      {/* Outlined Circular Arrow Buttons */}
      <div className="nav-arrows">
        <button
          type="button"
          onClick={onPrev}
          className="nav-arrow-btn btn-prev"
          aria-label="Previous client story"
        >
          <motion.span
            className="arrow-glyph"
            whileHover={{ x: -2 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            ←
          </motion.span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="nav-arrow-btn btn-next"
          aria-label="Next client story"
        >
          <motion.span
            className="arrow-glyph"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            →
          </motion.span>
        </button>
      </div>
    </div>
  )
}
