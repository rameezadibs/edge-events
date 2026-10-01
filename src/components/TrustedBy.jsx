import { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { majorClients, supportingClients } from '../data/clients'
import LogoMarquee from './LogoMarquee'
import ClientQuote from './ClientQuote'
import './TrustedBy.css'

function ClientStoriesModal({ isOpen, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <dialog
      ref={dialogRef}
      className="client-stories-dialog"
      aria-labelledby="stories-dialog-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="stories-dialog-inner">
        <button
          className="stories-dialog-close"
          onClick={onClose}
          aria-label="Close client stories"
        >
          ✕
        </button>
        <span className="stories-eyebrow">THE EDGE CLIENT ARCHIVE</span>
        <h2 id="stories-dialog-title" className="stories-dialog-title">
          Partnerships Built on Discretion &amp; Excellence
        </h2>
        <p className="stories-dialog-desc">
          For over a decade, The Edge Events has partnered with sovereign institutions, Fortune 500 multinationals, and private families to orchestrate landmark moments across the United Arab Emirates and globally.
        </p>

        <div className="stories-roster-grid">
          <div className="roster-col">
            <h4 className="roster-category">GOVERNMENT &amp; INFRASTRUCTURE</h4>
            <ul>
              <li>DP World · Global Trade Port Forums</li>
              <li>Dubai Airports · Executive Protocol Launches</li>
              <li>Emirates Nuclear Energy Corporation · Milestones</li>
              <li>Nawah Energy Company · Strategic Operations</li>
              <li>Dubai World Trade Centre · Special Conventions</li>
            </ul>
          </div>
          <div className="roster-col">
            <h4 className="roster-category">TECHNOLOGY &amp; ENTERPRISE</h4>
            <ul>
              <li>Amazon Web Services · Regional Summits</li>
              <li>Strategy&amp; (PwC Network) · Thought Leadership</li>
              <li>Kearney · Executive Symposiums</li>
              <li>Schlumberger (SLB) · Energy Tech Keynotes</li>
              <li>Siemens · Regional Innovation Days</li>
            </ul>
          </div>
          <div className="roster-col">
            <h4 className="roster-category">LUXURY, FINANCE &amp; CULTURE</h4>
            <ul>
              <li>Cartier · Private High-Jewelry Salons</li>
              <li>Bloomberg · Future Forum Engagements</li>
              <li>Chalhoub Group · Heritage Milestone Galas</li>
              <li>Standard Chartered · Private Banking Evenings</li>
              <li>DIFC · Financial Governance Dinners</li>
            </ul>
          </div>
        </div>

        <div className="stories-dialog-footer">
          <p className="stories-dialog-note">
            Full bespoke case studies and client credentials available upon private consultation.
          </p>
          <button className="stories-dialog-return" onClick={onClose}>
            Close Archive <span aria-hidden="true">⟶</span>
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default function TrustedBy() {
  const [modalOpen, setModalOpen] = useState(false)
  const reduced = useReducedMotion()

  const revealMotion = {
    initial: reduced ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease },
  }

  return (
    <>
      <section
        id="clients"
        className="trusted-by-section"
        aria-labelledby="trusted-by-heading"
      >
        <div className="trusted-by-container">
          {/* Subtle paper grain texture backdrop */}
          <div className="trusted-paper-texture" aria-hidden="true" />

          {/* Side margin vertical typography detail */}
          <aside className="trusted-side-rail" aria-hidden="true">
            <div className="rail-vertical-pill">
              <span>TRUST</span>
              <span>BUILT</span>
              <span>EVENT</span>
              <span>BY EVENT</span>
            </div>
            <div className="rail-vertical-line" />
          </aside>

          {/* 1. INTRO AREA */}
          <header className="trusted-intro-area">
            <div className="intro-left-col">
              <div className="label-row flex items-center">
                <span className="trusted-eyebrow">TRUSTED BY</span>
                <span className="trusted-rule" aria-hidden="true" />
                <span className="trusted-edition-mark">EST. 2014</span>
              </div>

              <motion.h2
                id="trusted-by-heading"
                className="trusted-main-statement"
                {...revealMotion}
              >
                Good experiences
                <br />
                get remembered.
                <br />
                <span className="statement-break">Great ones</span>
                <br />
                <em className="trusted-teal-italic">build trust.</em>
              </motion.h2>

              <motion.p
                className="trusted-supporting-copy"
                {...revealMotion}
                transition={{ duration: 0.9, delay: 0.15, ease }}
              >
                From global organisations to leading regional brands,
                we’re trusted to create experiences where every detail matters.
              </motion.p>
            </div>

            <div className="intro-right-col" aria-hidden="true">
              <div className="institutional-seal">
                <svg viewBox="0 0 140 140" className="seal-svg">
                  <path
                    id="sealPath"
                    d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                    fill="none"
                  />
                  <text fill="currentColor" fontSize="7.2" letterSpacing="2.8">
                    <textPath href="#sealPath" startOffset="0%">
                      DISCRETION · PRECISION · INSTITUTIONAL TRUST ·
                    </textPath>
                  </text>
                  <circle cx="70" cy="70" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <text x="70" y="74" textAnchor="middle" fontSize="11" fontFamily="'Bodoni Moda', serif" fill="currentColor">
                    THE EDGE
                  </text>
                </svg>
              </div>
            </div>
          </header>

          {/* 3. LARGE CLIENT STATEMENT */}
          <div className="client-strip-header">
            <span className="strip-hairline" aria-hidden="true" />
            <h3 className="strip-title">
              PROUD TO HAVE CREATED EXPERIENCES FOR
            </h3>
            <span className="strip-hairline" aria-hidden="true" />
          </div>

          {/* 4. LOGO EXPERIENCE: DUAL CONTINUOUS MARQUEES */}
          <div className="marquee-experience-zone">
            {/* Top divider */}
            <div className="marquee-border-line" aria-hidden="true" />

            {/* Row 1: Major Clients moving slowly Right-to-Left */}
            <div className="marquee-row row-major">
              <LogoMarquee
                clients={majorClients}
                direction="left"
                speed={52}
                isMajor={true}
                rowLabel="Major enterprise client partners"
              />
            </div>

            {/* Subtle inter-row separation */}
            <div className="marquee-inter-line" aria-hidden="true" />

            {/* Row 2: Supporting Clients moving slowly Left-to-Right */}
            <div className="marquee-row row-supporting">
              <LogoMarquee
                clients={supportingClients}
                direction="right"
                speed={60}
                isMajor={false}
                rowLabel="Supporting strategic client partners"
              />
            </div>

            {/* Bottom divider */}
            <div className="marquee-border-line" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  )
}
