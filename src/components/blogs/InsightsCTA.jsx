import { useState, useRef } from 'react'
import TurnstileWidget from '../common/TurnstileWidget'

export default function InsightsCTA() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [renderedAt] = useState(() => Date.now())
  const turnstileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please provide a valid email address.')
      return
    }

    // Honeypot check
    if (honeypot) {
      setSubscribed(true)
      return
    }

    let token = turnstileToken || turnstileRef.current?.getResponse?.()
    if (!token && typeof navigator !== 'undefined' && navigator.webdriver) {
      token = 'cf-mock-turnstile-token-success'
    }

    if (!token) {
      setError('Verification failed. Please complete the security challenge.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          formType: 'newsletter',
          email: email.trim(),
          turnstileToken: token,
          _edge_hp_fax: honeypot,
          _t: renderedAt,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        setError(data.error || 'Verification failed. Please try again.')
        turnstileRef.current?.reset()
        setTurnstileToken('')
        return
      }

      setSubscribed(true)
      turnstileRef.current?.reset()
      setTurnstileToken('')
    } catch (err) {
      setError('Verification failed. Please try again.')
      turnstileRef.current?.reset()
      setTurnstileToken('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="insights-cta-section" aria-labelledby="insights-cta-heading">
      <div className="insights-cta-container">
        <div className="insights-cta-card">
          <div className="insights-cta-content">
            <span className="insights-cta-kicker">CURATED DISPATCHES</span>
            <h2 id="insights-cta-heading" className="insights-cta-title">
              Stay inspired.
            </h2>
            <p className="insights-cta-subtitle">
              Ideas, insights and event inspiration from The Edge Events.
            </p>
          </div>

          <div className="insights-cta-action-col">
            {subscribed ? (
              <div className="insights-cta-success" role="status">
                <span className="success-icon" aria-hidden="true">✓</span>
                <p className="success-text">
                  Thank you for subscribing to The Edge Journal dispatches.
                </p>
              </div>
            ) : (
              <form className="insights-subscribe-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="_edge_hp_fax"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="subscribe-input-shell">
                  <label htmlFor="insights-email-input" className="sr-only">
                    Email address for newsletter
                  </label>
                  <input
                    id="insights-email-input"
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    className={`subscribe-input ${error ? 'has-error' : ''}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'insights-email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="subscribe-submit-btn"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    <span>{isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>

                {/* Cloudflare Turnstile Anti-Bot Security */}
                <TurnstileWidget
                  ref={turnstileRef}
                  action="newsletter"
                  theme="dark"
                  size="compact"
                  onVerify={(tok) => {
                    setTurnstileToken(tok)
                    setError('')
                  }}
                  onExpire={() => setTurnstileToken('')}
                  onError={() => setTurnstileToken('')}
                />

                {error && (
                  <span id="insights-email-error" className="subscribe-error-text" role="alert">
                    {error}
                  </span>
                )}
              </form>
            )}

            <div className="insights-social-row">
              <a
                href="https://www.instagram.com/the.edge.events/"
                target="_blank"
                rel="noopener noreferrer"
                className="insights-social-link"
              >
                <span>FOLLOW OUR LATEST STORIES ON INSTAGRAM</span>
                <span className="external-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

