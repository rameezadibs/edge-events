import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function ContactCTA() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToForm = (e) => {
    e.preventDefault()
    const formEl = document.getElementById('event-enquiry-form')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' })
      const firstInput = document.getElementById('field-fullName')
      setTimeout(() => firstInput?.focus(), 450)
    }
  }

  return (
    <section className="contact-cta-section" aria-labelledby="contact-cta-heading">
      <div className="contact-cta-container">
        <motion.div
          className="contact-cta-content"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
        >
          {/* Main Statement Heading */}
          <h2 id="contact-cta-heading" className="contact-cta-heading">
            Great experiences
            <br />
            start with a{' '}
            <span className="contact-cta-teal-italic">conversation.</span>
          </h2>

          <p className="contact-cta-supporting">
            Whatever you’re planning, we’d love to hear about it.
          </p>

          <div className="contact-cta-btn-wrap">
            <a
              href="#event-enquiry-form"
              onClick={scrollToForm}
              className="contact-cta-primary-btn"
            >
              <span>START A CONVERSATION</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Minimal Bottom Direct Detail Bar */}
          <div className="contact-cta-meta-bar">
            <div className="cta-meta-item">
              <span className="cta-meta-label">PRESENCE</span>
              <span className="cta-meta-value">Dubai, UAE</span>
            </div>
            <div className="cta-meta-item">
              <span className="cta-meta-label">EMAIL</span>
              <a href="mailto:collin@theedgeevents.co" className="cta-meta-link">
                collin@theedgeevents.co
              </a>
            </div>
            <div className="cta-meta-item">
              <span className="cta-meta-label">PHONE</span>
              <a href="tel:+971505035848" className="cta-meta-link">
                +971 50 503 5848
              </a>
            </div>
            <div className="cta-meta-item">
              <span className="cta-meta-label">INSTAGRAM</span>
              <a
                href="https://www.instagram.com/the.edge.events/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-meta-link"
              >
                @the.edge.events ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
