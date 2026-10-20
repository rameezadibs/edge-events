import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function FinalCTA({ onStartConversation }) {
  return (
    <section className="portfolio-final-cta-section" aria-labelledby="final-cta-heading">
      <div className="portfolio-container">
        <motion.div
          className="final-cta-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="final-cta-eyebrow">INITIATE AN EXPERIENCE</span>

          <h2 id="final-cta-heading" className="final-cta-title">
            <span>Have something in mind?</span>
            <span className="title-second-line block">
              Let’s <em className="teal-serif-italic">bring it to life.</em>
            </span>
          </h2>

          <p className="final-cta-desc">
            Tell us what you’re planning and we’ll help shape the experience from first idea to final moment.
            Our creative directors and technical production team are based in Dubai and Abu Dhabi.
          </p>

          <div className="final-cta-actions">
            <button
              type="button"
              className="final-primary-btn"
              onClick={onStartConversation}
              aria-label="Start a conversation with The Edge Events luxury event team"
            >
              <span>START A CONVERSATION</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </button>

            <a
              href="/services"
              className="final-secondary-btn"
              aria-label="View our full suite of event services"
            >
              <span>VIEW OUR SERVICES</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
