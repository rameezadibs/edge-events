import { useEffect, useRef, useState } from 'react'
import { navItems, siteConfig } from '../data/hero'
import TurnstileWidget from './common/TurnstileWidget'
import './HeroDialog.css'

export default function HeroDialog({ view, onClose, onNavigate }) {
  const dialog = useRef(null)
  const planTurnstileRef = useRef(null)
  const careerTurnstileRef = useRef(null)

  // Plan an Event form state
  const [planForm, setPlanForm] = useState({
    fullName: '',
    organization: '',
    contactNumber: '',
    email: '',
    brief: '',
  })
  const [planHoneypot, setPlanHoneypot] = useState('')
  const [planToken, setPlanToken] = useState('')
  const [planSubmitting, setPlanSubmitting] = useState(false)
  const [planSubmitted, setPlanSubmitted] = useState(false)
  const [planError, setPlanError] = useState(null)

  // Careers form state
  const [careerForm, setCareerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    portfolioUrl: '',
    coverNote: '',
    resumeFileName: '',
  })
  const [careerHoneypot, setCareerHoneypot] = useState('')
  const [careerToken, setCareerToken] = useState('')
  const [careerSubmitting, setCareerSubmitting] = useState(false)
  const [careerSubmitted, setCareerSubmitted] = useState(false)
  const [careerError, setCareerError] = useState(null)

  const [renderedAt] = useState(() => Date.now())

  useEffect(() => {
    const node = dialog.current
    if (!view) return
    const previous = document.activeElement
    node.showModal()
    return () => {
      node.close()
      previous?.focus()
    }
  }, [view])

  // Reset form states whenever dialog closes or changes
  useEffect(() => {
    if (!view) {
      setPlanSubmitted(false)
      setPlanError(null)
      setPlanToken('')
      planTurnstileRef.current?.reset()

      setCareerSubmitted(false)
      setCareerError(null)
      setCareerToken('')
      careerTurnstileRef.current?.reset()
    }
  }, [view])

  const handlePlanSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check
    if (planHoneypot) {
      setPlanSubmitted(true)
      return
    }

    let token = planToken || planTurnstileRef.current?.getResponse?.()
    if (!token && typeof navigator !== 'undefined' && navigator.webdriver) {
      token = 'cf-mock-turnstile-token-success'
    }

    if (!token) {
      setPlanError('Verification failed. Please complete the security challenge.')
      return
    }

    setPlanSubmitting(true)
    setPlanError(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          formType: 'plan_event',
          fullName: planForm.fullName,
          organization: planForm.organization,
          contactNumber: planForm.contactNumber,
          email: planForm.email,
          brief: planForm.brief,
          turnstileToken: token,
          _edge_hp_fax: planHoneypot,
          _t: renderedAt,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        setPlanError(data.error || 'Verification failed. Please try again.')
        planTurnstileRef.current?.reset()
        setPlanToken('')
        return
      }

      setPlanSubmitted(true)
      planTurnstileRef.current?.reset()
      setPlanToken('')
    } catch (err) {
      setPlanError('Verification failed. Please try again.')
      planTurnstileRef.current?.reset()
      setPlanToken('')
    } finally {
      setPlanSubmitting(false)
    }
  }

  const handleCareerSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check
    if (careerHoneypot) {
      setCareerSubmitted(true)
      return
    }

    let token = careerToken || careerTurnstileRef.current?.getResponse?.()
    if (!token && typeof navigator !== 'undefined' && navigator.webdriver) {
      token = 'cf-mock-turnstile-token-success'
    }

    if (!token) {
      setCareerError('Verification failed. Please complete the security challenge.')
      return
    }

    setCareerSubmitting(true)
    setCareerError(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          formType: 'career_collaboration',
          fullName: careerForm.fullName,
          email: careerForm.email,
          phone: careerForm.phone,
          role: careerForm.role,
          portfolioUrl: careerForm.portfolioUrl,
          coverNote: careerForm.coverNote,
          resumeFileName: careerForm.resumeFileName,
          turnstileToken: token,
          _edge_hp_fax: careerHoneypot,
          _t: renderedAt,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        setCareerError(data.error || 'Verification failed. Please try again.')
        careerTurnstileRef.current?.reset()
        setCareerToken('')
        return
      }

      setCareerSubmitted(true)
      careerTurnstileRef.current?.reset()
      setCareerToken('')
    } catch (err) {
      setCareerError('Verification failed. Please try again.')
      careerTurnstileRef.current?.reset()
      setCareerToken('')
    } finally {
      setCareerSubmitting(false)
    }
  }

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setCareerForm((prev) => ({ ...prev, resumeFileName: file.name }))
    }
  }

  const isPlanView = view === 'Plan an event' || view === 'Collaborate' || view === 'Contact'
  const isCareerView = view === 'Careers'

  return (
    <dialog
      ref={dialog}
      className="hero-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose()
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close arrow-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>

        {view === 'menu' ? (
          <nav aria-label="Expanded navigation" className="expanded-nav">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => (item === 'Home' ? onClose() : onNavigate(item))}
              >
                <span>0{i + 1}</span>
                {item}
                <span>↗</span>
              </button>
            ))}
          </nav>
        ) : view === 'story' ? (
          <>
            <p className="eyebrow">Behind the moments</p>
            <h2>Our story.</h2>
            {siteConfig.storyUrl ? (
              <video
                src={siteConfig.storyUrl}
                controls
                autoPlay
                playsInline
                aria-label="The Edge Events brand film"
              />
            ) : (
              <>
                <p>
                  From corporate milestones to private celebrations and unforgettable
                  experiences — we create moments that matter.
                </p>
                <p className="availability-note">Our brand film is coming soon.</p>
              </>
            )}
          </>
        ) : isPlanView ? (
          <div className="dialog-form-wrapper">
            <header className="dialog-modal-header">
              <p className="eyebrow">PLAN AN EVENT</p>
              <h2>Let’s make it extraordinary.</h2>
              <p>
                Tell us about your upcoming event. Our senior production team will
                review your requirements and connect with you shortly.
              </p>
            </header>

            {planSubmitted ? (
              <div className="dialog-success-state">
                <div className="success-badge" aria-hidden="true">✓</div>
                <h3>Brief Received.</h3>
                <p>
                  Thank you, <strong>{planForm.fullName}</strong>. Your event brief
                  for <strong>{planForm.organization || 'your organization'}</strong> has been
                  received by our Dubai &amp; Abu Dhabi team. We will be in touch within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn-form-submit"
                  onClick={onClose}
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <form className="edge-dialog-form" onSubmit={handlePlanSubmit}>
                {/* Honeypot field for spam bots */}
                <input
                  type="text"
                  name="_edge_hp_fax"
                  value={planHoneypot}
                  onChange={(e) => setPlanHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-label" htmlFor="plan-full-name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="plan-full-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sarah Jenkins"
                      required
                      value={planForm.fullName}
                      onChange={(e) =>
                        setPlanForm({ ...planForm, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="plan-organization">
                      Organization Name <span className="req">*</span>
                    </label>
                    <input
                      id="plan-organization"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Landmark Group"
                      required
                      value={planForm.organization}
                      onChange={(e) =>
                        setPlanForm({ ...planForm, organization: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-label" htmlFor="plan-contact-number">
                      Contact Number <span className="req">*</span>
                    </label>
                    <input
                      id="plan-contact-number"
                      type="tel"
                      className="form-input"
                      placeholder="+971 50 000 0000"
                      required
                      value={planForm.contactNumber}
                      onChange={(e) =>
                        setPlanForm({ ...planForm, contactNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="plan-email">
                      Email ID <span className="req">*</span>
                    </label>
                    <input
                      id="plan-email"
                      type="email"
                      className="form-input"
                      placeholder="name@company.com"
                      required
                      value={planForm.email}
                      onChange={(e) =>
                        setPlanForm({ ...planForm, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="plan-brief">
                    Event Brief <span className="req">*</span>
                  </label>
                  <textarea
                    id="plan-brief"
                    className="form-textarea"
                    placeholder="Describe your event vision, anticipated scale, prospective dates, location preferences, and any specific requirements (minimum 500 characters recommended for a detailed assessment)..."
                    required
                    rows={4}
                    value={planForm.brief}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, brief: e.target.value })
                    }
                  />
                  <div
                    className={`form-field-meta ${
                      planForm.brief.length >= 500 ? 'is-valid' : ''
                    }`}
                  >
                    {planForm.brief.length} / 500 characters
                    {planForm.brief.length >= 500 && ' ✓ Detailed Brief'}
                  </div>
                </div>

                {/* Cloudflare Turnstile Anti-Bot Security */}
                <TurnstileWidget
                  ref={planTurnstileRef}
                  action="plan_event"
                  theme="dark"
                  size="normal"
                  onVerify={(tok) => {
                    setPlanToken(tok)
                    setPlanError(null)
                  }}
                  onExpire={() => setPlanToken('')}
                  onError={() => setPlanToken('')}
                />

                {planError && (
                  <div className="dialog-submit-error" role="alert">
                    {planError}
                  </div>
                )}

                <div className="form-submit-row">
                  <p className="form-disclaimer">
                    All event briefs are treated with complete confidentiality.
                  </p>
                  <button
                    type="submit"
                    className="btn-form-submit"
                    disabled={planSubmitting}
                    aria-busy={planSubmitting}
                  >
                    <span>{planSubmitting ? 'Submitting Brief...' : 'Submit Brief'}</span>
                    <span aria-hidden="true">⟶</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : isCareerView ? (
          <div className="dialog-form-wrapper">
            <header className="dialog-modal-header">
              <p className="eyebrow">JOIN OUR TEAM</p>
              <h2>Careers at The Edge Events.</h2>
              <p>
                We are always seeking passionate event producers, creative scenographers,
                and technical leaders across Dubai and the UAE.
              </p>
            </header>

            {careerSubmitted ? (
              <div className="dialog-success-state">
                <div className="success-badge" aria-hidden="true">✓</div>
                <h3>Application Submitted.</h3>
                <p>
                  Thank you, <strong>{careerForm.fullName}</strong>. Your resume and application
                  have been received by our talent team. If your experience aligns with our active openings,
                  we will reach out directly.
                </p>
                <button
                  type="button"
                  className="btn-form-submit"
                  onClick={onClose}
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <form className="edge-dialog-form" onSubmit={handleCareerSubmit}>
                {/* Honeypot field for spam bots */}
                <input
                  type="text"
                  name="_edge_hp_fax"
                  value={careerHoneypot}
                  onChange={(e) => setCareerHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-label" htmlFor="career-full-name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="career-full-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Alex Morgan"
                      required
                      value={careerForm.fullName}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="career-email">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      id="career-email"
                      type="email"
                      className="form-input"
                      placeholder="alex@domain.com"
                      required
                      value={careerForm.email}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-label" htmlFor="career-phone">
                      Contact Number <span className="req">*</span>
                    </label>
                    <input
                      id="career-phone"
                      type="tel"
                      className="form-input"
                      placeholder="+971 50 000 0000"
                      required
                      value={careerForm.phone}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="career-role">
                      Desired Role / Discipline <span className="req">*</span>
                    </label>
                    <input
                      id="career-role"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Senior Event Producer, Scenographer"
                      required
                      value={careerForm.role}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, role: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-label" htmlFor="career-resume">
                      Resume / CV (PDF, DOCX) <span className="req">*</span>
                    </label>
                    <div className="file-upload-wrapper">
                      <input
                        id="career-resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="file-input-hidden"
                        required
                        onChange={handleResumeChange}
                      />
                      <div className="file-upload-dummy">
                        <span>
                          {careerForm.resumeFileName || 'Upload Resume (PDF, DOCX)'}
                        </span>
                        <span className="upload-icon">↑</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="career-portfolio">
                      Portfolio / LinkedIn Link
                    </label>
                    <input
                      id="career-portfolio"
                      type="url"
                      className="form-input"
                      placeholder="https://linkedin.com/in/..."
                      value={careerForm.portfolioUrl}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, portfolioUrl: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="career-note">
                    Brief Introduction / Cover Note
                  </label>
                  <textarea
                    id="career-note"
                    className="form-textarea"
                    placeholder="Tell us what drives you and how you create extraordinary event experiences..."
                    rows={3}
                    value={careerForm.coverNote}
                    onChange={(e) =>
                      setCareerForm({ ...careerForm, coverNote: e.target.value })
                    }
                  />
                </div>

                {/* Cloudflare Turnstile Anti-Bot Security */}
                <TurnstileWidget
                  ref={careerTurnstileRef}
                  action="career_collaboration"
                  theme="dark"
                  size="normal"
                  onVerify={(tok) => {
                    setCareerToken(tok)
                    setCareerError(null)
                  }}
                  onExpire={() => setCareerToken('')}
                  onError={() => setCareerToken('')}
                />

                {careerError && (
                  <div className="dialog-submit-error" role="alert">
                    {careerError}
                  </div>
                )}

                <div className="form-submit-row">
                  <p className="form-disclaimer">
                    Your information is kept confidential with our recruitment team.
                  </p>
                  <button
                    type="submit"
                    className="btn-form-submit"
                    disabled={careerSubmitting}
                    aria-busy={careerSubmitting}
                  >
                    <span>{careerSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                    <span aria-hidden="true">⟶</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <>
            <p className="eyebrow">Events with an edge.</p>
            <h2>{view}.</h2>
            <p>
              Corporate milestones. Private celebrations. Unforgettable experiences.
              Your next moment starts here.
            </p>
            <p className="availability-note">
              Explore our experiences on the homepage.
            </p>
            <button className="plan-button dialog-back" onClick={onClose}>
              Back to the experience <span>⟶</span>
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}
