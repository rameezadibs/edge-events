import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'
import SocialProcess from './SocialProcess'
import TravelProcess from './TravelProcess'

export default function ServiceProcess({ process, theme }) {
  if (theme === 'social') {
    return <SocialProcess process={process} />
  }
  if (theme === 'travel') {
    return <TravelProcess process={process} />
  }

  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotion()

  const stages = process.stages || []
  const activeStage = stages[activeIdx] || stages[0]

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  // Fallbacks for stage metadata in case other service pages use the same component
  const getStagePhase = (stage, idx) => stage.phase || `Phase 0${idx + 1} · ${stage.name}`
  const getStageTag = (stage, idx) => stage.tag || `STAGE 0${idx + 1}`
  const getStageMilestone = (stage) => stage.milestone || 'Strategic Milestone Reached'
  const getStageDeliverables = (stage) => {
    if (stage.deliverables && stage.deliverables.length > 0) return stage.deliverables
    return [
      stage.summary,
      'Executive Stakeholder Governance',
      'Operational Feasibility & Risk Controls',
      'Single-Point Director Sign-Off'
    ]
  }

  return (
    <section
      id="methodology-framework"
      className={`service-process-section service-process--${theme}`}
      aria-labelledby="process-heading"
    >
      <div className="process-container">
        {/* Section Header */}
        <header className="process-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">{process.eyebrow}</span>
          </motion.div>

          <div className="process-header-split">
            <motion.h2 id="process-heading" className="service-section-title font-serif" {...reveal(0.08)}>
              {process.heading}
            </motion.h2>
            {process.description && (
              <motion.p className="process-intro-text" {...reveal(0.16)}>
                {process.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* ==========================================================================
            ARCHITECTURAL STEPPER HORIZON (Card-Free Interactive Timeline)
            ========================================================================== */}
        <div className="process-stepper-bar" role="tablist" aria-label="Methodology Phases">
          <div className="stepper-track-line" aria-hidden="true">
            <div
              className="stepper-track-fill"
              style={{ width: `${((activeIdx + 1) / stages.length) * 100}%` }}
            />
          </div>

          <div className="stepper-stages-nav">
            {stages.map((stage, idx) => {
              const isActive = idx === activeIdx
              const isPast = idx < activeIdx
              return (
                <button
                  key={stage.step}
                  role="tab"
                  id={`stage-tab-${stage.step}`}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${stage.step}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(idx)}
                  className={`stepper-node-btn ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                >
                  <span className="stepper-node-dot" aria-hidden="true">
                    <span className="stepper-node-dot-inner" />
                  </span>
                  <div className="stepper-node-meta">
                    <span className="stepper-node-index font-mono">{stage.step}</span>
                    <span className="stepper-node-title font-serif">{stage.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ==========================================================================
            MASTER STAGE SHOWCASE (Pure Editorial Architectural Split — NO CARDS)
            ========================================================================== */}
        <div className="process-master-stage" id={`stage-panel-${activeStage.step}`} role="tabpanel" aria-labelledby={`stage-tab-${activeStage.step}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.step}
              className="master-stage-grid"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease }}
            >
              {/* Left Column: Narrative & Philosophy */}
              <div className="master-narrative-col relative">
                {/* Oversized Ghost Watermark Numeral */}
                <span className="master-ghost-numeral font-serif" aria-hidden="true">
                  {activeStage.step}
                </span>

                <div className="master-stage-kicker-row flex items-center">
                  <span className="master-phase-badge font-mono">
                    {getStagePhase(activeStage, activeIdx)}
                  </span>
                  <span className="master-tag-pill font-mono">
                    {getStageTag(activeStage, activeIdx)}
                  </span>
                </div>

                <h3 className="master-stage-heading font-serif">
                  <span className="master-stage-step-num font-mono">{activeStage.step}. </span>
                  {activeStage.name}
                </h3>

                <p className="master-stage-summary">
                  {activeStage.summary}
                </p>

                <p className="master-stage-detail">
                  {activeStage.detail}
                </p>

                {/* Milestone Seal */}
                <div className="master-milestone-box">
                  <div className="milestone-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="milestone-content">
                    <span className="milestone-kicker font-mono">CRITICAL PHASE MILESTONE</span>
                    <span className="milestone-title">{getStageMilestone(activeStage)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Deliverables Matrix */}
              <div className="master-deliverables-col">
                <div className="deliverables-header-row flex items-center justify-between">
                  <span className="deliverables-eyebrow font-mono">OPERATIONAL GOVERNANCE</span>
                  <span className="deliverables-count font-mono">{getStageDeliverables(activeStage).length} DELIVERABLES</span>
                </div>

                <h4 className="deliverables-section-title font-serif">
                  Tangible Outcomes & Clearances
                </h4>

                <div className="deliverables-list-wrap">
                  <ul className="deliverables-editorial-list" aria-label={`Deliverables for Phase ${activeStage.step}`}>
                    {getStageDeliverables(activeStage).map((deliverable, dIdx) => (
                      <li key={dIdx} className="deliverable-editorial-row flex items-baseline">
                        <span className="deliverable-index font-mono">0{dIdx + 1}</span>
                        <div className="deliverable-text-wrap">
                          <span className="deliverable-name">{deliverable}</span>
                        </div>
                        <span className="deliverable-status-mark" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#006696" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Director Standard Note */}
                <div className="governance-footnote">
                  <span className="footnote-bullet font-mono">●</span>
                  <p className="footnote-text">
                    Every phase is governed by senior project directors with daily client progress synchronization and zero operational friction.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ==========================================================================
            CONNECTED HORIZONTAL PIPELINE (Continuous Sequential Overview — NO CARDS)
            ========================================================================== */}
        <div className="process-pipeline-grid">
          {stages.map((stage, index) => {
            const isCurrent = index === activeIdx
            return (
              <div
                key={stage.step}
                className={`pipeline-col ${isCurrent ? 'pipeline-col--active' : ''}`}
                onClick={() => setActiveIdx(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIdx(index)
                  }
                }}
                aria-label={`Select Phase ${stage.step}: ${stage.name}`}
              >
                <div className="pipeline-col-top flex items-center justify-between">
                  <span className="pipeline-step-idx font-mono">{stage.step} // 04</span>
                  <span className="pipeline-dot" aria-hidden="true" />
                </div>

                <div className="pipeline-col-body">
                  <span className="pipeline-tag font-mono">{getStageTag(stage, index)}</span>
                  <h4 className="pipeline-title font-serif">{stage.name}</h4>
                  <p className="pipeline-summary">{stage.summary}</p>
                </div>

                <div className="pipeline-col-footer flex items-center justify-between">
                  <span className="pipeline-explore font-mono">
                    {isCurrent ? 'ACTIVE PHASE' : 'EXPLORE PHASE'}
                  </span>
                  <span className="pipeline-arrow" aria-hidden="true">
                    {isCurrent ? '●' : '→'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
