import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { clientQuote } from '../data/clients'

export default function ClientQuote() {
  const reduced = useReducedMotion()

  const revealVariants = {
    initial: reduced ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.95, ease },
  }

  return (
    <motion.div className="featured-trust-moment" {...revealVariants}>
      {/* Background oversized typographic watermark: 15+ */}
      <div className="watermark-container" aria-hidden="true">
        <span className="watermark-number">{clientQuote.metric}</span>
        <span className="watermark-text">{clientQuote.metricSub}</span>
      </div>

      <div className="trust-moment-grid">
        {/* LEFT SIDE: Large editorial serif statement */}
        <div className="trust-left-statement">
          <h3 className="trust-heading">
            Trusted with
            <br />
            the moments
            <br />
            <em className="trust-teal-italic">that matter.</em>
          </h3>
          <p className="trust-sub-narrative">
            {clientQuote.statNarrative}
          </p>
        </div>

        {/* THIN VERTICAL EDITORIAL DIVIDER */}
        <div className="trust-column-divider" aria-hidden="true" />

        {/* RIGHT SIDE: Restrained editorial testimonial quote */}
        <div className="trust-right-testimonial">
          <div className="quote-mark-icon" aria-hidden="true">
            “
          </div>
          <blockquote className="trust-blockquote">
            <p className="quote-text">{clientQuote.quote}</p>
            <footer className="quote-attribution">
              <span className="attribution-rule" aria-hidden="true" />
              <div className="attribution-meta">
                <cite className="attribution-name">{clientQuote.clientName}</cite>
                <span className="attribution-org">{clientQuote.organisation}</span>
                <span className="attribution-disclaimer">CONFIDENTIAL CLIENT PROJECT</span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </motion.div>
  )
}
