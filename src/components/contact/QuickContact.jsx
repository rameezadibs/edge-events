import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function QuickContact() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToForm = (e) => {
    e.preventDefault()
    const formEl = document.getElementById('event-enquiry-form')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' })
      const firstInput = document.getElementById('field-fullName')
      setTimeout(() => firstInput?.focus(), 400)
    }
  }

  const items = [
    {
      num: '01',
      title: 'START AN EVENT',
      description: 'Have a project in mind? Tell us what you’re planning.',
      action: 'START ENQUIRY',
      href: '#event-enquiry-form',
      onClick: scrollToForm,
    },
    {
      num: '02',
      title: 'WORK WITH US',
      description: 'Artist, supplier or creative collaborator?',
      action: 'COLLABORATE',
      href: 'mailto:collin@theedgeevents.co?subject=Creative%20Collaboration%20Inquiry%20%E2%80%94%20The%20Edge%20Events',
    },
    {
      num: '03',
      title: 'GENERAL ENQUIRY',
      description: 'Something else? Send us a note.',
      action: 'EMAIL US',
      href: 'mailto:collin@theedgeevents.co?subject=General%20Enquiry%20%E2%80%94%20The%20Edge%20Events',
    },
  ]

  return (
    <section className="contact-quick-section" aria-label="Quick Contact Pathways">
      <div className="contact-quick-container">
        <div className="contact-quick-grid">
          {items.map((item, index) => (
            <motion.div
              key={item.num}
              className={`contact-quick-col ${index < items.length - 1 ? 'has-divider' : ''}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : index * 0.12, ease }}
            >
              <span className="contact-quick-num">{item.num}</span>
              <h3 className="contact-quick-title">{item.title}</h3>
              <p className="contact-quick-desc">{item.description}</p>
              <a
                href={item.href}
                onClick={item.onClick}
                className="contact-quick-link"
              >
                <span>{item.action}</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
