import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function ContactDetails() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.aside
      className="contact-details-wrapper"
      aria-label="Direct Contact Information"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease }}
    >
      {/* Header */}
      <div className="contact-details-header">
        <span className="contact-details-kicker">DIRECT CONTACT</span>
        <h2 className="contact-details-heading">
          Prefer to
          <br />
          talk directly?
        </h2>
        <p className="contact-details-intro">
          Our team is based in Dubai and available for private commissions, consultations, and corporate briefs.
        </p>
      </div>

      {/* Structured Direct Information */}
      <div className="contact-details-list">
        {/* Email */}
        <div className="contact-detail-item">
          <span className="detail-item-label">EMAIL</span>
          <a
            href="mailto:collin@theedgeevents.co?subject=Event%20Inquiry%20%E2%80%94%20The%20Edge%20Events"
            className="detail-item-link font-medium"
            aria-label="Send email to collin@theedgeevents.co"
          >
            collin@theedgeevents.co
          </a>
        </div>

        {/* Phone */}
        <div className="contact-detail-item">
          <span className="detail-item-label">PHONE</span>
          <a
            href="tel:+971505035848"
            className="detail-item-link"
            aria-label="Call +971 50 503 5848"
          >
            +971 50 503 5848
          </a>
        </div>

        {/* WhatsApp with Tasteful CTA */}
        <div className="contact-detail-item">
          <span className="detail-item-label">WHATSAPP</span>
          <div className="whatsapp-action-block">
            <span className="detail-item-val">+971 50 503 5848</span>
            <a
              href="https://wa.me/971505035848?text=Hello%20The%20Edge%20Events%2C%20I%20would%20like%20to%20enquire%20about%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="tasteful-whatsapp-btn"
            >
              <svg
                className="whatsapp-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>WHATSAPP US</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="contact-detail-item">
          <span className="detail-item-label">LOCATION</span>
          <p className="detail-item-text">
            Dubai, United Arab Emirates
          </p>
          <span className="detail-item-note">Private consultations by appointment across UAE</span>
        </div>
      </div>

      {/* Social Follow Links */}
      <div className="contact-details-social">
        <span className="detail-item-label">FOLLOW</span>
        <div className="contact-social-links">
          <a
            href="https://www.instagram.com/the.edge.events/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-text-link"
          >
            Instagram ↗
          </a>
          <span className="social-divider" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/company/theedgeevents/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-text-link"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </motion.aside>
  )
}
