import { useEffect, useRef, useState } from 'react'
import { navItems, siteConfig } from '../data/hero'
import './HeroDialog.css'

export default function HeroDialog({ view, onClose, onNavigate }) {
  const dialog = useRef(null)

  // Plan an Event form state
  const [planForm, setPlanForm] = useState({
    fullName: '',
    organization: '',
    contactNumber: '',
    email: '',
    brief: '',
  })
  const [planSubmitted, setPlanSubmitted] = useState(false)

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
  const [careerSubmitted, setCareerSubmitted] = useState(false)

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
      setCareerSubmitted(false)
    }
  }, [view])

  const handlePlanSubmit = (e) => {
    e.preventDefault()
    setPlanSubmitted(true)
  }

  const handleCareerSubmit = (e) => {
    e.preventDefault()
    setCareerSubmitted(true)
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

                <div className="form-submit-row">
                  <p className="form-disclaimer">
                    All event briefs are treated with complete confidentiality.
                  </p>
                  <button type="submit" className="btn-form-submit">
                    <span>Submit Brief</span>
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

                <div className="form-submit-row">
                  <p className="form-disclaimer">
                    Your information is kept confidential with our recruitment team.
                  </p>
                  <button type="submit" className="btn-form-submit">
                    <span>Submit Application</span>
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
