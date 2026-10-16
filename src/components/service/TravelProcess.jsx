import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'
import './TravelProcess.css'

const EXPEDITION_WAYPOINTS = [
  {
    step: '01',
    waypointTag: 'WAYPOINT 01 // RECONNAISSANCE',
    name: 'Understand the Group',
    subtitle: 'Human Cadence, Group Dynamics & Comfort Profiling',
    coordinates: '24.8311° N // 55.6791° E',
    fieldQuote: 'An ambitious expedition succeeds long before departure—built on deep attunement to how your delegation travels, rests, and bonds.',
    detail: 'We evaluate group dynamics, physical comfort thresholds, mobility preferences, dietary nuances, and overarching strategic goals. Whether an executive summit requiring private salon enclaves or a multi-generational family traversing desert dunes, we calculate the exact rhythm to eliminate travel fatigue.',
    protocol: 'Confidential traveler profiling, medical history mapping, and bespoke climate acclimation planning.',
    specifications: [
      {
        num: '01',
        title: 'Physiological & Pace Mapping',
        desc: 'Calculating daily energy curves, golden-hour transit windows, and restorative downtime intervals to prevent expedition fatigue.'
      },
      {
        num: '02',
        title: 'Private Dietary & Hospitality Profiling',
        desc: 'Personalized nutrition requirements, bespoke cellar preferences, and specialized catering logistics in remote wilderness coordinates.'
      },
      {
        num: '03',
        title: 'Discretion & Security Protocols',
        desc: 'Strict delegation confidentiality, private arrival routes, and tailored executive protection protocols across all destinations.'
      }
    ]
  },
  {
    step: '02',
    waypointTag: 'WAYPOINT 02 // TERRAIN SURVEY',
    name: 'Choose the Experience',
    subtitle: 'Terrains, Private Reserves & Sanctuary Selection',
    coordinates: '24.8058° N // 56.1264° E',
    fieldQuote: 'We do not offer tourist corridors. We scout raw, untamed landscapes and engineer them into private sanctuaries of comfort.',
    detail: 'We present hand-scouted terrains—from monumental crimson dunes in the Empty Quarter to secluded Hajar mountain wadis and private coastal archipelagos. We balance travel duration with total atmospheric isolation, ensuring every landscape evokes wonder while maintaining flawless luxury standard.',
    protocol: 'Direct government conservation clearances, exclusive reserve access, and strict Leave No Trace environmental compliance.',
    specifications: [
      {
        num: '01',
        title: 'Protected Wilderness Clearances',
        desc: 'Exclusive permits for restricted desert conservation reserves, royal hunting grounds, and protected marine archipelagos.'
      },
      {
        num: '02',
        title: 'Terrain & Microclimate Analysis',
        desc: 'Field checks for thermal comfort, prevailing wind patterns, stargazing visibility, and optimal seasonal timings.'
      },
      {
        num: '03',
        title: 'Bespoke Venue Scouting',
        desc: 'Securing architectural cliffside villas, private desert oases, or off-grid heritage forts exclusively for your party.'
      }
    ]
  },
  {
    step: '03',
    waypointTag: 'WAYPOINT 03 // FIELD ENGINEERING',
    name: 'Craft the Journey',
    subtitle: 'Minute-by-Minute Master Pacing & Field Provisioning',
    coordinates: '23.1333° N // 53.7833° E',
    fieldQuote: 'A master expedition itinerary is a symphony of invisible logistics—where fine dining, live music, and cold champagne appear as if by magic in the wilderness.',
    detail: 'We engineer a minute-by-minute master itinerary, locking in helicopter charters, luxury 4x4 convoys, private chef residencies, and mobile glamping bivouacs. Every transit is choreographed with golden-hour photography in mind, transforming transit into an extraordinary memory.',
    protocol: 'Satellite tracking, contingency diversion plans, and comprehensive Wilderness First Responder emergency coverage.',
    specifications: [
      {
        num: '01',
        title: 'Luxury Transit Convoys & Aviation',
        desc: 'Private jet charters, twin-engine helicopter transfers, and custom off-road luxury vehicles equipped with satellite links.'
      },
      {
        num: '02',
        title: 'Mobile Haute Cuisine Field Salons',
        desc: 'Full pop-up kitchens staffed by master chefs, fine vintage cellars, and white-linen dining under the starlit desert sky.'
      },
      {
        num: '03',
        title: 'Autonomous Camp Deployment',
        desc: 'Air-conditioned luxury canvas suites, en-suite bathrooms, silent generators, and bespoke ambient lighting rigs in remote dunes.'
      }
    ]
  },
  {
    step: '04',
    waypointTag: 'WAYPOINT 04 // EXPEDITION COMMAND',
    name: 'Deliver Seamlessly',
    subtitle: 'Discreet Field Directors & 24/7 Silent Execution',
    coordinates: '25.3214° N // 56.3402° E',
    fieldQuote: 'You never see the mechanics. Our expedition masters handle every check-in, transfer, and permit silently ahead of you.',
    detail: 'Our senior expedition leaders travel alongside your party with quiet authority. We coordinate baggage transfers, security liaisons, and bespoke surprise reveals without interrupting your immersion. You focus completely on the horizon, the conversation, and the sheer majesty of the journey.',
    protocol: 'On-ground expedition director, certified paramedic coverage, and instantaneous 24/7 operational synchronization.',
    specifications: [
      {
        num: '01',
        title: 'Dedicated Expedition Leaders',
        desc: 'Senior multi-lingual expedition directors and certified local naturalists accompanying your journey around the clock.'
      },
      {
        num: '02',
        title: 'Frictionless Invisible Logistics',
        desc: 'Silent baggage sweeps, pre-cleared private airport arrivals, and zero operational friction for any guest.'
      },
      {
        num: '03',
        title: 'Unbroken Peace of Mind',
        desc: 'Comprehensive medical evacuation capabilities, satellite phones, and seamless real-time itinerary adaptation.'
      }
    ]
  }
]

export default function TravelProcess({ process }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotion()

  const currentWaypoint = EXPEDITION_WAYPOINTS[activeIdx] || EXPEDITION_WAYPOINTS[0]

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section
      id="methodology-framework"
      className="service-process-section service-process--travel"
      aria-labelledby="process-heading"
    >
      <div className="travel-process-container">
        {/* Authentic Section Header matching The Edge Events editorial style */}
        <header className="process-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">
              {process.eyebrow || 'OUR EXPEDITION METHOD'}
            </span>
          </motion.div>

          <div className="process-header-split">
            <motion.h2
              id="process-heading"
              className="service-section-title font-serif"
              {...reveal(0.08)}
            >
              {process.heading || 'From possibility to itinerary.'}
            </motion.h2>
            {process.description && (
              <motion.p className="process-intro-text" {...reveal(0.16)}>
                {process.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* Expedition Horizon Stepper Track */}
        <div className="travel-stepper-bar" role="tablist" aria-label="Expedition Method Waypoints">
          <div className="travel-stepper-track-line" aria-hidden="true">
            <div
              className="travel-stepper-track-fill"
              style={{ width: `${((activeIdx + 1) / EXPEDITION_WAYPOINTS.length) * 100}%` }}
            />
          </div>

          <div className="travel-stepper-stages-nav">
            {EXPEDITION_WAYPOINTS.map((waypoint, idx) => {
              const isActive = idx === activeIdx
              const isPast = idx < activeIdx
              return (
                <button
                  key={waypoint.step}
                  role="tab"
                  id={`travel-stage-tab-${waypoint.step}`}
                  aria-selected={isActive}
                  aria-controls={`travel-stage-panel-${waypoint.step}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(idx)}
                  className={`travel-stepper-node-btn ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                >
                  <span className="travel-stepper-node-dot" aria-hidden="true">
                    <span className="travel-stepper-node-dot-inner" />
                  </span>
                  <div className="travel-stepper-node-meta">
                    <span className="travel-stepper-node-index font-mono">{waypoint.step}</span>
                    <span className="travel-stepper-node-title font-serif">{waypoint.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Master Expedition Showcase: Nocturnal Split Layout */}
        <div
          className="travel-showcase-stage"
          id={`travel-stage-panel-${currentWaypoint.step}`}
          role="tabpanel"
          aria-labelledby={`travel-stage-tab-${currentWaypoint.step}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWaypoint.step}
              className="travel-showcase-grid"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease }}
            >
              {/* Left Column: Narrative, Quote & Protocol Reassurance */}
              <div className="travel-narrative-col">
                <span className="travel-ghost-numeral font-serif" aria-hidden="true">
                  {currentWaypoint.step}
                </span>

                <div className="travel-stage-badge-row flex items-center">
                  <span className="travel-waypoint-badge font-mono">
                    {currentWaypoint.waypointTag}
                  </span>
                  <span className="travel-coordinate-pill">
                    {currentWaypoint.coordinates}
                  </span>
                </div>

                <h3 className="travel-stage-heading font-serif">
                  <span className="travel-stage-step-num font-mono">{currentWaypoint.step}. </span>
                  {currentWaypoint.name}
                </h3>

                <p className="travel-stage-subtitle font-sans">
                  {currentWaypoint.subtitle}
                </p>

                <div className="travel-field-quote">
                  <p className="travel-quote-body font-serif">
                    "{currentWaypoint.fieldQuote}"
                  </p>
                </div>

                <p className="travel-stage-detail-text">
                  {currentWaypoint.detail}
                </p>

                {/* Expedition Command Protocol Box */}
                <div className="travel-protocol-box">
                  <div className="travel-protocol-indicator" aria-hidden="true" />
                  <div className="travel-protocol-content">
                    <span className="travel-protocol-label font-mono">EXPEDITION COMMAND PROTOCOL</span>
                    <p className="travel-protocol-text">{currentWaypoint.protocol}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Field Specifications & Operational Clearances */}
              <div className="travel-specs-col">
                <div className="travel-specs-header flex items-center justify-between">
                  <span className="travel-specs-eyebrow font-mono">FIELD SPECIFICATIONS & PROTOCOLS</span>
                  <span className="travel-specs-count font-mono">
                    {currentWaypoint.specifications.length} OPERATIONAL STANDARDS
                  </span>
                </div>

                <h4 className="travel-specs-title font-serif">
                  Field Logistics & Safety Standards
                </h4>

                <div className="travel-specs-wrap">
                  <ul className="travel-specs-list" aria-label={`Specifications for ${currentWaypoint.name}`}>
                    {currentWaypoint.specifications.map((item, idx) => (
                      <li key={idx} className="travel-spec-row flex items-baseline">
                        <span className="travel-spec-idx font-mono">{item.num}</span>
                        <div className="travel-spec-info">
                          <h5 className="travel-spec-name font-sans">{item.title}</h5>
                          <p className="travel-spec-desc font-sans">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="travel-specs-footnote">
                  <span className="travel-footnote-bullet font-mono">●</span>
                  <p className="travel-footnote-text">
                    Satellite communication redundancy, medical evacuation readiness & environmental conservation compliance active across all coordinates.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4-Phase Connected Expedition Grid */}
        <div className="travel-pipeline-grid">
          {EXPEDITION_WAYPOINTS.map((waypoint, index) => {
            const isCurrent = index === activeIdx
            return (
              <div
                key={waypoint.step}
                className={`travel-pipeline-col ${isCurrent ? 'travel-pipeline-col--active' : ''}`}
                onClick={() => setActiveIdx(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIdx(index)
                  }
                }}
                aria-label={`Select Waypoint ${waypoint.step}: ${waypoint.name}`}
              >
                <div className="travel-pipeline-col-top flex items-center justify-between">
                  <span className="travel-pipeline-step-idx font-mono">{waypoint.step} // 04</span>
                  <span className="travel-pipeline-dot" aria-hidden="true" />
                </div>

                <div className="travel-pipeline-body">
                  <span className="travel-pipeline-tag font-mono">{waypoint.waypointTag}</span>
                  <h4 className="travel-pipeline-title font-serif">{waypoint.name}</h4>
                  <p className="travel-pipeline-summary">{waypoint.subtitle}</p>
                </div>

                <div className="travel-pipeline-col-footer flex items-center justify-between">
                  <span className="travel-pipeline-explore font-mono">
                    {isCurrent ? 'ACTIVE WAYPOINT' : 'EXPLORE WAYPOINT'}
                  </span>
                  <span className="travel-pipeline-arrow" aria-hidden="true">
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
