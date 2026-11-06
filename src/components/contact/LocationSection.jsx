import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function LocationSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="contact-presence-section" aria-labelledby="presence-heading">
      <div className="contact-presence-container">
        <motion.div
          className="contact-presence-inner"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="contact-presence-header">
            <span className="contact-presence-kicker">BASED IN THE UAE</span>
            <h2 id="presence-heading" className="contact-presence-title">
              Dubai based.
              <br />
              Built to go further.
            </h2>
          </div>

          <div className="contact-presence-body">
            <p className="contact-presence-copy">
              From events across Dubai and Abu Dhabi to curated experiences throughout the UAE and beyond,
              our team coordinates every detail from concept to delivery.
            </p>
            <div className="contact-presence-badge-row">
              <span className="contact-presence-bullet" aria-hidden="true" />
              <p className="contact-presence-scope">
                DUBAI, UAE — SERVING PROJECTS ACROSS THE UAE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
