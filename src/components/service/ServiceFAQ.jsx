import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'

export default function ServiceFAQ({ faq, theme }) {
  const [openIndex, setOpenIndex] = useState(0) // Default first open for SEO/immediacy
  const reduced = useReducedMotion()

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-faq-section service-faq--${theme}`} aria-labelledby="faq-heading">
      <div className="faq-container">
        <header className="faq-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{faq.eyebrow}</span>
          </motion.div>

          <motion.h2 id="faq-heading" className="service-section-title font-serif" {...reveal(0.08)}>
            {faq.heading}
          </motion.h2>
        </header>

        <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index
            const questionId = `faq-q-${theme}-${index}`
            const answerId = `faq-a-${theme}-${index}`

            return (
              <motion.div
                key={item.question}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                {...reveal(0.05 + (index % 4) * 0.05)}
              >
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="faq-trigger flex items-center justify-between w-full text-left"
                    onClick={() => toggle(index)}
                  >
                    <span className="faq-question-text font-serif text-lg">{item.question}</span>
                    <span className="faq-icon-indicator" aria-hidden="true">
                      <svg
                        className={`faq-arrow-svg ${isOpen ? 'rotate-180' : ''}`}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      initial={reduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reduced ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="faq-answer-collapse overflow-hidden"
                    >
                      <div className="faq-answer-inner text-sm">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
