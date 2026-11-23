import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import TurnstileWidget from './common/TurnstileWidget'
import './CareersPage.css'

export default function CareersPage() {
  const [dialogView, setDialogView] = useState(null)
  const turnstileRef = useRef(null)

  useEffect(() => {
    const previous = document.title
    document.title = 'Careers & Talent — The Edge Events'
    window.scrollTo(0, 0)
    return () => {
      document.title = previous
    }
  }, [])

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    yearsExperience: '',
    portfolioUrl: '',
    coverNote: '',
    resumeFileName: '',
    resumeBase64: '',
  })

  const [honeypot, setHoneypot] = useState('')
  const [token, setToken] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [renderedAt] = useState(() => Date.now())

  const handleResumeFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 10MB file limit
    if (file.size > 10 * 1024 * 1024) {
      setError('Resume file must be under 10MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeBase64: reader.result,
      }))
      setError(null)
    }
    reader.onerror = () => {
      setError('Failed to read the uploaded resume file.')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.fullName.trim() || !form.email.trim() || !form.role.trim()) {
      setError('Please provide your full name, email, and desired role.')
      return
    }

    if (!form.resumeFileName) {
      setError('Please attach your resume or CV.')
      return
    }

    if (!token) {
      setError('Please verify the security check below.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          formType: 'career_collaboration',
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          role: form.role,
          yearsExperience: form.yearsExperience,
          portfolioUrl: form.portfolioUrl,
          coverNote: form.coverNote,
          resumeFileName: form.resumeFileName,
          resumeBase64: form.resumeBase64,
          turnstileToken: token,
          _edge_hp_fax: honeypot,
          _t: renderedAt,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        setError(data.error || 'Submission failed. Please try again.')
        turnstileRef.current?.reset()
        setToken('')
        setSubmitting(false)
        return
      }

      setSubmitted(true)
      setSubmitting(false)
    } catch {
      setError('Network error. Please try again.')
      turnstileRef.current?.reset()
      setToken('')
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      role: '',
      yearsExperience: '',
      portfolioUrl: '',
      coverNote: '',
      resumeFileName: '',
      resumeBase64: '',
    })
    setSubmitted(false)
    setError(null)
    setToken('')
    turnstileRef.current?.reset()
  }

  return (
    <div className="careers-page">
      <HeroNavigation activeItem="Careers" onNavigate={setDialogView} />

      <main>
        {/* HERO SECTION */}
        <section className="careers-hero-section" aria-labelledby="careers-title">
          <div className="careers-hero-container">
            <div className="careers-kicker-row">
              <span className="careers-kicker-label">TALENT & COLLABORATION</span>
              <span className="careers-kicker-line" aria-hidden="true" />
              <span className="careers-kicker-sub">DUBAI · UAE · GLOBAL</span>
            </div>

            <div className="careers-hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 id="careers-title" className="careers-hero-title">
                  Build the future of <em>extraordinary experiences.</em>
                </h1>
                <p className="careers-hero-intro">
                  We are looking for visionary event producers, scenographers, technical directors, and project leaders who operate with boundless imagination and relentless precision.
                </p>
              </motion.div>

              <motion.div
                className="careers-hero-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="careers-pillars">
                  <div className="careers-pillar-item">
                    <span className="careers-pillar-num">01</span>
                    <div className="careers-pillar-text">
                      <h3>High-Impact Projects</h3>
                      <p>Shape landmark corporate summits, VIP galas, and bespoke cultural celebrations.</p>
                    </div>
                  </div>
                  <div className="careers-pillar-item">
                    <span className="careers-pillar-num">02</span>
                    <div className="careers-pillar-text">
                      <h3>Creative Sovereignty</h3>
                      <p>Work alongside master craftspeople, spatial designers, and technical innovators.</p>
                    </div>
                  </div>
                  <div className="careers-pillar-item">
                    <span className="careers-pillar-num">03</span>
                    <div className="careers-pillar-text">
                      <h3>Excellence & Precision</h3>
                      <p>An uncompromising dedication to detail, discretion, and world-class standards.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section className="careers-form-section" id="application-form" aria-labelledby="form-heading">
          <div className="careers-form-container">
            <div className="careers-form-card">
              <div className="careers-form-header">
                <h2 id="form-heading">Join Our Talent Collective</h2>
                <p>Submit your credentials, portfolio, and resume. We review every profile with discretion.</p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="careers-success-card"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="careers-success-icon">✓</div>
                    <h3 className="careers-success-title">Application Received</h3>
                    <p className="careers-success-desc">
                      Thank you for sharing your journey with us. Our executive talent team will review your dossier and reach out when there is an aligned opportunity.
                    </p>
                    <button type="button" className="careers-reset-btn" onClick={resetForm}>
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="careers-form-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Honeypot field for bot suppression */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="careers-fax">Fax</label>
                      <input
                        id="careers-fax"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="careers-form-row">
                      <div className="careers-field">
                        <label className="careers-label" htmlFor="field-fullName">
                          Full Name <span className="req">*</span>
                        </label>
                        <input
                          id="field-fullName"
                          type="text"
                          className="careers-input"
                          placeholder="e.g. Alexandra Wright"
                          required
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        />
                      </div>

                      <div className="careers-field">
                        <label className="careers-label" htmlFor="field-email">
                          Email Address <span className="req">*</span>
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          className="careers-input"
                          placeholder="alexandra@example.com"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="careers-form-row">
                      <div className="careers-field">
                        <label className="careers-label" htmlFor="field-phone">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          className="careers-input"
                          placeholder="+971 50 123 4567"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>

                      <div className="careers-field">
                        <label className="careers-label" htmlFor="field-role">
                          Discipline / Desired Role <span className="req">*</span>
                        </label>
                        <input
                          id="field-role"
                          type="text"
                          className="careers-input"
                          placeholder="e.g. Senior Producer, Spatial Designer, AV Director"
                          required
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="careers-form-row">
                      <div className="careers-field">
                        <label className="careers-label" htmlFor="field-experience">
                          Years of Experience
                        </label>
                        <select
                          id="field-experience"
                          className="careers-select"
                          value={form.yearsExperience}
                          onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
                        >
                          <option value="">Select experience level</option>
                          <option value="1-3 years">1–3 Years</option>
                          <option value="3-5 years">3–5 Years</option>
                          <option value="5-10 years">5–10 Years</option>
                          <option value="10+ years">10+ Years (Senior / Director)</option>
                        </select>
                      </div>

                      <div className="careers-field">
                        <label className="careers-label" htmlFor="field-portfolio">
                          Portfolio / LinkedIn Profile Link
                        </label>
                        <input
                          id="field-portfolio"
                          type="url"
                          className="careers-input"
                          placeholder="https://linkedin.com/in/... or https://portfolio.com"
                          value={form.portfolioUrl}
                          onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="careers-field">
                      <label className="careers-label" htmlFor="field-resume">
                        Resume / CV (PDF, DOC, DOCX up to 10MB) <span className="req">*</span>
                      </label>
                      <div className="careers-file-box">
                        <input
                          id="field-resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="careers-file-input"
                          required={!form.resumeFileName}
                          onChange={handleResumeFile}
                        />
                        <div className="careers-file-content">
                          <span className="careers-file-icon">📁</span>
                          <span className="careers-file-name">
                            {form.resumeFileName || 'Click or drag your Resume/CV here to upload'}
                          </span>
                          <span className="careers-file-hint">Supported formats: PDF, DOC, DOCX</span>
                        </div>
                      </div>
                    </div>

                    <div className="careers-field">
                      <label className="careers-label" htmlFor="field-coverNote">
                        Brief Introduction / Cover Note
                      </label>
                      <textarea
                        id="field-coverNote"
                        className="careers-textarea"
                        rows={4}
                        placeholder="Tell us about yourself, key productions you've led or contributed to, and what inspires you..."
                        value={form.coverNote}
                        onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                      />
                    </div>

                    {/* Turnstile Widget */}
                    <div className="careers-turnstile-wrapper">
                      <TurnstileWidget
                        ref={turnstileRef}
                        action="career_collaboration"
                        theme="light"
                        size="normal"
                        onVerify={(tok) => {
                          setToken(tok)
                          setError(null)
                        }}
                        onExpire={() => setToken('')}
                        onError={() => setToken('')}
                      />
                    </div>

                    {error && (
                      <div className="careers-error" role="alert" style={{ color: '#c02626', fontSize: '13px', fontWeight: 600 }}>
                        {error}
                      </div>
                    )}

                    <div className="careers-action-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#6D7276', margin: 0 }}>
                        All applications are treated with strict confidentiality.
                      </p>
                      <button
                        type="submit"
                        className="careers-submit-btn"
                        disabled={submitting}
                        aria-busy={submitting}
                      >
                        <span>{submitting ? 'SUBMITTING DOSSIER...' : 'SUBMIT APPLICATION'}</span>
                        <span aria-hidden="true">⟶</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <HeroDialog view={dialogView} onClose={() => setDialogView(null)} onNavigate={setDialogView} />
    </div>
  )
}
