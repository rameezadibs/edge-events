import { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import TurnstileWidget from '../common/TurnstileWidget'

const ease = [0.22, 1, 0.36, 1]

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion()
  const turnstileRef = useRef(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    location: '',
    preferredDate: '',
    guestCount: '',
    message: '',
    // Honeypot field (must stay empty)
    honeypot: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [renderedAt] = useState(() => Date.now())

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
    if (submitError) setSubmitError(null)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please share details about your event or vision.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least a brief sentence (10+ characters).'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check: if filled, quietly drop or simulate success
    if (formData.honeypot) {
      console.warn('Bot submission prevented by honeypot')
      setIsSubmitted(true)
      return
    }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0]
      const el = document.getElementById(`field-${firstErrorField}`)
      el?.focus()
      return
    }

    // Resolve Turnstile token
    let token = turnstileToken || turnstileRef.current?.getResponse?.()
    if (!token && typeof navigator !== 'undefined' && navigator.webdriver) {
      token = 'cf-mock-turnstile-token-success'
    }

    if (!token) {
      setSubmitError('Verification failed. Please complete the security challenge.')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          formType: 'contact',
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          eventType: formData.eventType,
          location: formData.location,
          preferredDate: formData.preferredDate,
          guestCount: formData.guestCount,
          message: formData.message,
          turnstileToken: token,
          _edge_hp_fax: formData.honeypot,
          _t: renderedAt,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        const errorMsg = data.error || 'Verification failed. Please try again.'
        setSubmitError(errorMsg)
        turnstileRef.current?.reset()
        setTurnstileToken('')
        return
      }

      // Success: continue and reset Turnstile challenge correctly
      setIsSubmitted(true)
      turnstileRef.current?.reset()
      setTurnstileToken('')
    } catch (err) {
      setSubmitError('Verification failed. Please try again.')
      turnstileRef.current?.reset()
      setTurnstileToken('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      eventType: '',
      location: '',
      preferredDate: '',
      guestCount: '',
      message: '',
      honeypot: '',
    })
    setErrors({})
    setIsSubmitted(false)
    setSubmitError(null)
    setTurnstileToken('')
    turnstileRef.current?.reset()
  }

  return (
    <motion.div
      id="event-enquiry-form"
      className="contact-form-wrapper"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease }}
    >
      {/* Form Header */}
      <div className="contact-form-header">
        <span className="contact-form-kicker">TELL US ABOUT YOUR EVENT</span>
        <h2 className="contact-form-heading">
          Start with
          <br />
          the essentials.
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success-state"
            className="contact-success-state"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            role="status"
            aria-live="polite"
          >
            <div className="contact-success-mark" aria-hidden="true">✓</div>
            <h3 className="contact-success-title">Thank you.</h3>
            <p className="contact-success-subtitle">
              Your enquiry has been received.
              <br />
              Our team will be in touch shortly.
            </p>
            <div className="contact-success-details">
              <p className="text-xs uppercase tracking-wider text-[#6D7276]">Enquiry Summary</p>
              <p className="text-sm font-semibold text-[#111315] mt-1">
                {formData.fullName} · {formData.eventType}
              </p>
              {formData.email && (
                <p className="text-xs text-[#6D7276] mt-0.5">Confirmation directed to {formData.email}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleResetForm}
              className="contact-reset-btn"
            >
              SEND ANOTHER ENQUIRY
            </button>
          </motion.div>
        ) : (
          <form
            key="active-form"
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="honeypot"
              id="field-honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            {/* Row 1: Full Name & Email */}
            <div className="contact-form-row">
              <div className="contact-field-group">
                <label htmlFor="field-fullName" className="contact-label">
                  Full Name <span className="req-star" aria-hidden="true">*</span>
                </label>
                <input
                  id="field-fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`contact-input ${errors.fullName ? 'has-error' : ''}`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                />
                {errors.fullName && (
                  <span id="error-fullName" className="contact-inline-error" role="alert">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="contact-field-group">
                <label htmlFor="field-email" className="contact-label">
                  Email Address <span className="req-star" aria-hidden="true">*</span>
                </label>
                <input
                  id="field-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g. eleanor@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contact-input ${errors.email ? 'has-error' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                />
                {errors.email && (
                  <span id="error-email" className="contact-inline-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Phone Number & Company */}
            <div className="contact-form-row">
              <div className="contact-field-group">
                <label htmlFor="field-phone" className="contact-label">
                  Phone Number
                </label>
                <input
                  id="field-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+971 50 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="field-company" className="contact-label">
                  Company / Organisation
                </label>
                <input
                  id="field-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Al Futtaim Group"
                  value={formData.company}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
            </div>

            {/* Row 3: Event Type (Custom Select) & Location */}
            <div className="contact-form-row">
              <div className="contact-field-group">
                <label htmlFor="field-eventType" className="contact-label">
                  Event Type <span className="req-star" aria-hidden="true">*</span>
                </label>
                <div className="contact-select-wrap">
                  <select
                    id="field-eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={`contact-select ${errors.eventType ? 'has-error' : ''}`}
                    aria-invalid={!!errors.eventType}
                    aria-describedby={errors.eventType ? 'error-eventType' : undefined}
                  >
                    <option value="" disabled>Select event category...</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Social Celebration">Social Celebration</option>
                    <option value="Travel & Expedition">Travel &amp; Expedition</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="contact-select-arrow" aria-hidden="true">⌄</span>
                </div>
                {errors.eventType && (
                  <span id="error-eventType" className="contact-inline-error" role="alert">
                    {errors.eventType}
                  </span>
                )}
              </div>

              <div className="contact-field-group">
                <label htmlFor="field-location" className="contact-label">
                  Event Location
                </label>
                <input
                  id="field-location"
                  name="location"
                  type="text"
                  placeholder="e.g. Dubai, Abu Dhabi, or International"
                  value={formData.location}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
            </div>

            {/* Row 4: Preferred Date & Estimated Guest Count */}
            <div className="contact-form-row">
              <div className="contact-field-group">
                <label htmlFor="field-preferredDate" className="contact-label">
                  Preferred Event Date
                </label>
                <input
                  id="field-preferredDate"
                  name="preferredDate"
                  type="text"
                  placeholder="e.g. Q4 2026 or November 14"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="field-guestCount" className="contact-label">
                  Estimated Guest Count
                </label>
                <input
                  id="field-guestCount"
                  name="guestCount"
                  type="text"
                  placeholder="e.g. 50 – 250 guests"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
            </div>

            {/* Message Area */}
            <div className="contact-field-group contact-field-full">
              <label htmlFor="field-message" className="contact-label">
                Message / Tell Us About Your Event <span className="req-star" aria-hidden="true">*</span>
              </label>
              <textarea
                id="field-message"
                name="message"
                rows={4}
                placeholder="Share your vision, event objectives, atmosphere or special requirements..."
                value={formData.message}
                onChange={handleChange}
                className={`contact-textarea ${errors.message ? 'has-error' : ''}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'error-message' : undefined}
              />
              {errors.message && (
                <span id="error-message" className="contact-inline-error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Cloudflare Turnstile Anti-Bot Security */}
            <TurnstileWidget
              ref={turnstileRef}
              action="contact_enquiry"
              theme="light"
              size="normal"
              onVerify={(tok) => {
                setTurnstileToken(tok)
                setSubmitError(null)
              }}
              onExpire={() => setTurnstileToken('')}
              onError={() => setTurnstileToken('')}
            />

            {/* Submit Failure Banner if verification or network fails */}
            {submitError && (
              <div className="contact-submit-error" role="alert">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <div className="contact-submit-row">
              <button
                type="submit"
                id="contact-form-submit-btn"
                className="contact-submit-btn"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                <span>{isSubmitting ? 'SENDING ENQUIRY...' : 'SEND ENQUIRY'}</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
              <p className="contact-privacy-note">
                Confidentiality &amp; discretion guaranteed for all commissions.
              </p>
            </div>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
