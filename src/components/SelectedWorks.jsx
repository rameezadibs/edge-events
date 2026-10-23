import { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ease } from '../data/hero'
import { projects, categoriesFilter } from '../data/projects'
import ProjectItem from './ProjectItem'
import './SelectedWorks.css'

function ProjectMonographModal({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const prevFocused = document.activeElement
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (dialog && dialog.open) dialog.close()
      prevFocused?.focus({ preventScroll: true })
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <dialog
      ref={dialogRef}
      className="project-monograph-dialog"
      aria-labelledby="monograph-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="monograph-modal-inner">
        <button
          className="monograph-close-btn"
          onClick={onClose}
          aria-label="Close project monograph"
        >
          ✕
        </button>

        <div className="monograph-grid">
          <div className="monograph-image-pane">
            <div className="monograph-img-box">
              <img
                src={project.image}
                alt={project.alt || project.title}
                className="monograph-hero-img"
              />
            </div>
            {project.caption && (
              <span className="monograph-caption">{project.caption}</span>
            )}
          </div>

          <div className="monograph-content-pane">
            <div className="monograph-header-meta">
              <span className="monograph-num">{project.number}</span>
              <span className="monograph-dot">/</span>
              <span className="monograph-cat">{project.category}</span>
            </div>

            <h2 id="monograph-title" className="monograph-title">
              {project.title}
            </h2>

            <div className="monograph-location-row">
              <span className="monograph-loc">{project.location}</span>
              {project.detail && (
                <>
                  <span className="monograph-sep">·</span>
                  <span className="monograph-spec">{project.detail}</span>
                </>
              )}
            </div>

            <p className="monograph-desc">{project.description}</p>

            {project.stats && project.stats.length > 0 && (
              <div className="monograph-stats-grid">
                {project.stats.map(stat => (
                  <div key={stat.label} className="monograph-stat-col">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-val">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="monograph-scope-block">
              <p className="scope-heading">SCOPE OF WORK</p>
              <p className="scope-body">{project.scope}</p>
            </div>

            {project.coordinates && (
              <div className="monograph-coord-block">
                <span className="coord-label">COORDINATES</span>
                <span className="coord-value">{project.coordinates}</span>
              </div>
            )}

            <div className="monograph-footer">
              <p className="monograph-signature">
                Curated with architectural precision by The Edge Events.
              </p>
              <button className="monograph-return-btn" onClick={onClose}>
                Return to Selected Works <span aria-hidden="true">⟶</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default function SelectedWorks() {
  const [activeProject, setActiveProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const reduced = useReducedMotion()

  const revealMotion = {
    initial: reduced ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease }
  }

  // Filter projects if a specific category is clicked
  const isMatch = (p) => activeFilter === 'all' || p.filterId === activeFilter

  return (
    <>
      <section
        id="our-work"
        className="selected-works-section"
        aria-labelledby="selected-works-heading"
      >
        <div className="selected-works-container">
          {/* Subtle paper grain texture backdrop */}
          <div className="works-paper-texture" aria-hidden="true" />

          {/* 1. INTRO AREA */}
          <header className="works-intro-area">
            <div className="intro-left">
              <div className="label-row flex items-center">
                <span className="works-eyebrow">SELECTED WORKS</span>
                <span className="works-rule" aria-hidden="true" />
                <span className="works-edition-stamp">EDITION VOL. 04</span>
              </div>

              <motion.h2
                id="selected-works-heading"
                className="works-main-heading"
                {...revealMotion}
              >
                Experiences
                <br />
                <em className="heading-teal-italic">worth remembering.</em>
              </motion.h2>

              <motion.p
                className="works-intro-subline"
                {...revealMotion}
                transition={{ duration: 0.9, delay: 0.15, ease }}
              >
                A selection of corporate events, private celebrations and
                curated experiences brought to life by The Edge.
              </motion.p>
            </div>

            <div className="intro-right">
              <a
                href="#all-projects"
                className="view-all-cta"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveProject(projects[0])
                }}
              >
                <span className="cta-text">VIEW ALL PROJECTS</span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </header>

          {/* 2. ORGANIZED CATEGORY FILTER NAVIGATION BAR */}
          <div className="works-curation-nav">
            <div className="filter-pill-list" role="tablist" aria-label="Curated project categories">
              {categoriesFilter.map(cat => {
                const isActive = activeFilter === cat.id
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`filter-tab ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveFilter(cat.id)}
                  >
                    <span className="tab-label">{cat.label}</span>
                    <span className="tab-count">[{cat.count}]</span>
                  </button>
                )
              })}
            </div>

            <div className="curation-indicator">
              <span className="indicator-dot" />
              <span className="indicator-label">
                {activeFilter === 'all'
                  ? 'SHOWING COMPLETE MONOGRAPH'
                  : `FILTERED: ${activeFilter.toUpperCase()}`}
              </span>
            </div>
          </div>

          {/* EDITORIAL DIVIDER LINE */}
          <div className="works-thin-divider" aria-hidden="true" />

          {/* 3. PORTFOLIO LAYOUT: ASYMMETRICAL EDITORIAL SPREADS */}
          <div className="works-editorial-layout">
            {/* Vertical side typography rail */}
            <aside className="works-editorial-rail" aria-hidden="true">
              <span className="rail-vertical-text">
                THE EDGE ARCHIVE · OUR PAST WORK · DUBAI / ABU DHABI
              </span>
              <div className="rail-line" />
            </aside>

            {/* SPREAD 01: Project 01 & Project 02 */}
            <div className="editorial-spread spread-row">
              <div className={`spread-col ${!isMatch(projects[0]) ? 'spread-col-dimmed' : ''}`}>
                <ProjectItem
                  project={projects[0]}
                  index={0}
                  onSelect={setActiveProject}
                  isSpotlighted={isMatch(projects[0])}
                />
              </div>

              <div className={`spread-col ${!isMatch(projects[1]) ? 'spread-col-dimmed' : ''}`}>
                <ProjectItem
                  project={projects[1]}
                  index={1}
                  onSelect={setActiveProject}
                  isSpotlighted={isMatch(projects[1])}
                />
              </div>
            </div>

            {/* SPREAD INTERMEZZO: Curated architectural bridging banner */}
            <div className="spread-annotation" aria-hidden="true">
              <span className="annotation-line" />
              <span className="annotation-text">
                CURATED EXPERIENCES · ARCHITECTURAL STAGING · BESPOKE PRODUCTION
              </span>
              <span className="annotation-line" />
            </div>

            {/* SPREAD 02: Project 03 & Project 04 */}
            <div className="editorial-spread spread-row">
              <div className={`spread-col ${!isMatch(projects[2]) ? 'spread-col-dimmed' : ''}`}>
                <ProjectItem
                  project={projects[2]}
                  index={2}
                  onSelect={setActiveProject}
                  isSpotlighted={isMatch(projects[2])}
                />
              </div>

              <div className={`spread-col ${!isMatch(projects[3]) ? 'spread-col-dimmed' : ''}`}>
                <ProjectItem
                  project={projects[3]}
                  index={3}
                  onSelect={setActiveProject}
                  isSpotlighted={isMatch(projects[3])}
                />
              </div>
            </div>

            {/* SPREAD INTERMEZZO 2: Curated architectural bridging banner */}
            <div className="spread-annotation" aria-hidden="true">
              <span className="annotation-line" />
              <span className="annotation-text">
                INNOVATIVE DESIGN · BRAND ACTIVATION · IMMERSIVE ENVIRONMENTS
              </span>
              <span className="annotation-line" />
            </div>

            {/* SPREAD 03: Project 05 & Project 06 */}
            <div className="editorial-spread spread-row">
              <div className={`spread-col ${!isMatch(projects[4]) ? 'spread-col-dimmed' : ''}`}>
                <ProjectItem
                  project={projects[4]}
                  index={4}
                  onSelect={setActiveProject}
                  isSpotlighted={isMatch(projects[4])}
                />
              </div>

              <div className={`spread-col ${!isMatch(projects[5]) ? 'spread-col-dimmed' : ''}`}>
                <ProjectItem
                  project={projects[5]}
                  index={5}
                  onSelect={setActiveProject}
                  isSpotlighted={isMatch(projects[5])}
                />
              </div>
            </div>
          </div>

          {/* 4. SECTION FOOTNOTE / MINIMAL SIGNATURE */}
          <footer className="works-section-footer">
            <div className="footer-rule" aria-hidden="true" />
            <div className="footer-content">
              <span className="footer-left">
                THE EDGE EVENTS © {new Date().getFullYear()}
              </span>
              <span className="footer-center">
                UAE
              </span>
              <a
                href="#plan"
                className="footer-collaborate-link"
                onClick={(e) => {
                  e.preventDefault()
                  const planBtn = document.querySelector('.plan-button')
                  if (planBtn) planBtn.click()
                }}
              >
                SHARE A BRIEF <span aria-hidden="true">⟶</span>
              </a>
            </div>
          </footer>
        </div>
      </section>

      {/* Monograph Quick View Modal */}
      <ProjectMonographModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  )
}
