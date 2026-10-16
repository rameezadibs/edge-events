import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ease } from '../../data/hero'
import './SocialProcess.css'

const SOCIAL_CHAPTERS_DATA = [
  {
    roman: 'I',
    numeral: '01',
    chapterTag: 'CHAPTER I · GENESIS',
    title: 'Discover Your Story',
    subtitle: 'Personal Narrative & Aesthetic Vision',
    quote: 'Every memorable celebration begins with listening—understanding your memories, family traditions, and the atmosphere you wish to create.',
    narrative: 'We begin with an unhurried, private consultation to understand what this occasion represents, who will gather, and the feelings you wish to evoke. We take the time to learn your personal aesthetic, favorite destinations, and hospitality priorities.',
    hostPromise: {
      badge: 'THE HOST\'S PEACE OF MIND',
      text: 'No rigid questionnaires or rushed calls. An unhurried, confidential salon over coffee or champagne.'
    },
    touchpoints: [
      {
        num: '01',
        title: 'Narrative & Vision Consultation',
        desc: 'Uncovering personal stories, aesthetic sensibilities, and the distinct emotional cadence you wish your guests to experience.'
      },
      {
        num: '02',
        title: 'Curated Venue Scouting',
        desc: 'Private access to secluded villas, architectural estates, desert sanctuaries, and secret gardens across the UAE and abroad.'
      },
      {
        num: '03',
        title: 'Sensory Mood & Palette Profile',
        desc: 'Defining the chromatic harmony, ambient lighting warmth, acoustic direction, and signature spatial atmosphere.'
      }
    ]
  },
  {
    roman: 'II',
    numeral: '02',
    chapterTag: 'CHAPTER II · VISION',
    title: 'Shape the Concept',
    subtitle: 'Spatial Styling & Sensory Palettes',
    quote: 'Translating your narrative into living spaces, sculptural florals, and evocative light.',
    narrative: 'We translate your narrative into physical mood boards, spatial layout sketches, floral palettes, and culinary concepts tailored specifically for the venue. Every sightline is considered to create breathtaking reveals and intimate retreats.',
    hostPromise: {
      badge: 'THE HOST\'S PEACE OF MIND',
      text: 'You feel the fabrics, experience the spatial flow, and visualize every moment before any build begins.'
    },
    touchpoints: [
      {
        num: '01',
        title: 'Tactile Material Swatches',
        desc: 'Curated raw silks, bespoke linens, handmade paper stocks, and artisanal calligraphy samples presented in an atelier lookbook.'
      },
      {
        num: '02',
        title: '3D Spatial Choreography',
        desc: 'Scaled architectural sightlines, dramatic grand reveals, intimate lounge enclaves, and effortless guest circulation.'
      },
      {
        num: '03',
        title: 'Atmospheric Lighting Architecture',
        desc: 'Candlelight ratios, golden-hour transitions, soft architectural washes, and customized floral scent diffusions.'
      }
    ]
  },
  {
    roman: 'III',
    numeral: '03',
    chapterTag: 'CHAPTER III · CURATION',
    title: 'Refine Every Detail',
    subtitle: 'Tastings, Tablescapes & Acoustic Pacing',
    quote: 'Every sensory touchpoint tested, tasted, and polished to effortless perfection.',
    narrative: 'We convene private tastings, review tabletop mockups, finalize entertainment playlists, and refine the event timeline down to the minute. You savor the menu, select heirloom cutlery, and hear the acoustic transitions before the big night.',
    hostPromise: {
      badge: 'THE HOST\'S PEACE OF MIND',
      text: 'Zero uncertainty on the night. Every dish, vintage, floral stem, and musical tempo is rehearsed in advance.'
    },
    touchpoints: [
      {
        num: '01',
        title: 'Private Gastronomic Salon',
        desc: 'Bespoke multi-course tasting with executive chefs, sommelier wine pairings, and custom signature cocktail mixology.'
      },
      {
        num: '02',
        title: 'Live Tabletop Mockup Review',
        desc: 'Full-scale physical tablescape mockup featuring artisanal china, crystal glassware, monogrammed textiles, and floral arrangements.'
      },
      {
        num: '03',
        title: 'Acoustic Curve & Pacing',
        desc: 'Curated musical choreography from welcoming string quartets to sunset jazz, live musicians, and late-night vinyl selectors.'
      }
    ]
  },
  {
    roman: 'IV',
    numeral: '04',
    chapterTag: 'CHAPTER IV · REVELATION',
    title: 'Bring It to Life',
    subtitle: 'Discreet Master Direction & Host Presence',
    quote: 'The curtain rises. Our team operates with invisible artistry so you remain entirely in the moment.',
    narrative: 'Our team oversees the complete transformation of your venue, directing every vendor with silent efficiency so you simply celebrate with your guests. We manage every micro-cue behind the scenes so you remain completely present.',
    hostPromise: {
      badge: 'THE HOST\'S PEACE OF MIND',
      text: 'You are never approached with operational questions—only poured another glass of champagne to celebrate with those you love.'
    },
    touchpoints: [
      {
        num: '01',
        title: 'Invisible Master Direction',
        desc: 'Flawless backstage orchestration of 40+ artisans, florists, chefs, and technical crews with whisper-quiet precision.'
      },
      {
        num: '02',
        title: 'Dedicated Host Concierge',
        desc: 'A private director by your side throughout the evening to attend to personal timing, attire, and VIP guest comfort.'
      },
      {
        num: '03',
        title: 'Pure, Unbroken Presence',
        desc: 'Every toast, speech, and dance unfolds fluidly while you savor every memory as the gracious host.'
      }
    ]
  }
]

export default function SocialProcess({ process }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotion()

  const current = SOCIAL_CHAPTERS_DATA[activeIdx] || SOCIAL_CHAPTERS_DATA[0]

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section
      id="methodology-framework"
      className="service-process-section service-process--social"
      aria-labelledby="social-process-heading"
    >
      <div className="process-container">
        {/* Authentic Section Header matching The Edge Events editorial style */}
        <header className="process-header">
          <motion.div className="service-section-kicker flex items-center" {...reveal(0)}>
            <span className="kicker-dot" aria-hidden="true" />
            <span className="kicker-text uppercase tracking-widest text-xs font-semibold">
              {process.eyebrow || 'YOUR JOURNEY WITH US'}
            </span>
          </motion.div>

          <div className="process-header-split">
            <motion.h2
              id="social-process-heading"
              className="service-section-title font-serif"
              {...reveal(0.08)}
            >
              {process.heading || 'From an idea to your moment.'}
            </motion.h2>
            {process.description && (
              <motion.p className="process-intro-text" {...reveal(0.16)}>
                {process.description}
              </motion.p>
            )}
          </div>
        </header>

        {/* Haute Couture Chapter Navigation Ribbon */}
        <div className="social-atelier-ribbon" role="tablist" aria-label="Celebration Journey Chapters">
          {SOCIAL_CHAPTERS_DATA.map((chapter, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={chapter.numeral}
                role="tab"
                id={`social-chapter-tab-${chapter.numeral}`}
                aria-selected={isActive}
                aria-controls={`social-chapter-panel-${chapter.numeral}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIdx(idx)}
                className={`social-chapter-btn ${isActive ? 'is-active' : ''}`}
              >
                <div className="social-chapter-btn-top">
                  <span className="social-chapter-roman font-serif">{chapter.roman}</span>
                  <span className="social-chapter-numeral font-mono">{chapter.numeral}</span>
                </div>
                <span className="social-chapter-tag font-mono">{chapter.chapterTag}</span>
                <span className="social-chapter-name font-serif">{chapter.title}</span>
                <span className="social-chapter-line" aria-hidden="true" />
              </button>
            )
          })}
        </div>

        {/* Haute Atelier Showcase: Exhibition Salon */}
        <div
          className="social-atelier-stage"
          id={`social-chapter-panel-${current.numeral}`}
          role="tabpanel"
          aria-labelledby={`social-chapter-tab-${current.numeral}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.numeral}
              className="social-atelier-grid"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              {/* Left Wing: The Narrative Salon */}
              <div className="social-narrative-wing">
                {/* Large Roman Numeral Watermark */}
                <span className="social-roman-watermark font-serif" aria-hidden="true">
                  {current.roman}
                </span>

                <div className="social-chapter-kicker flex items-center">
                  <span className="social-kicker-numeral font-mono">CHAPTER {current.roman}</span>
                  <span className="social-kicker-sep">·</span>
                  <span className="social-kicker-phase font-mono">{current.chapterTag}</span>
                </div>

                <h3 className="social-atelier-title font-serif">
                  {current.title}
                </h3>

                <p className="social-atelier-subtitle">
                  {current.subtitle}
                </p>

                {/* Poetic Quote Plaque */}
                <div className="social-poetic-quote">
                  <span className="social-quote-ornament font-serif" aria-hidden="true">“</span>
                  <p className="social-quote-text font-serif">
                    {current.quote}
                  </p>
                </div>

                <p className="social-narrative-desc">
                  {current.narrative}
                </p>

                {/* Host's Peace of Mind Card */}
                <div className="social-host-guarantee">
                  <div className="social-guarantee-seal" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div className="social-guarantee-body">
                    <span className="social-guarantee-badge font-mono">{current.hostPromise.badge}</span>
                    <p className="social-guarantee-copy">{current.hostPromise.text}</p>
                  </div>
                </div>
              </div>

              {/* Right Wing: Curated Atelier Touchpoints */}
              <div className="social-touchpoints-wing">
                <div className="social-wing-header flex items-center justify-between">
                  <div className="social-wing-header-left">
                    <span className="social-wing-eyebrow font-mono">ATELIER CURATION</span>
                    <h4 className="social-wing-title font-serif">Bespoke Milestones</h4>
                  </div>
                  <span className="social-wing-badge font-mono">
                    {current.touchpoints.length} MILESTONES
                  </span>
                </div>

                <div className="social-milestones-stack">
                  {current.touchpoints.map((tp, idx) => (
                    <div key={idx} className="social-milestone-card">
                      <div className="social-milestone-marker">
                        <span className="social-milestone-num font-serif">{tp.num}</span>
                      </div>
                      <div className="social-milestone-content">
                        <h5 className="social-milestone-title font-serif">{tp.title}</h5>
                        <p className="social-milestone-desc">{tp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="social-wing-discretion-note">
                  <span className="social-discretion-bullet font-serif">✦</span>
                  <p className="social-discretion-copy">
                    Private client discretion & non-disclosure standards upheld across every celebration commission.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Haute Story Strip: 4 Interactive Chapters */}
        <div className="social-story-strip" role="region" aria-label="Journey Chapter Summaries">
          {SOCIAL_CHAPTERS_DATA.map((chapter, idx) => {
            const isSelected = idx === activeIdx
            return (
              <div
                key={chapter.numeral}
                className={`social-story-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActiveIdx(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIdx(idx)
                  }
                }}
                aria-label={`View Chapter ${chapter.roman}: ${chapter.title}`}
              >
                <div className="social-story-card-top flex items-center justify-between">
                  <span className="social-story-roman font-serif">{chapter.roman}</span>
                  <span className="social-story-numeral font-mono">{chapter.numeral} / 04</span>
                </div>

                <div className="social-story-card-body">
                  <span className="social-story-tag font-mono">{chapter.chapterTag}</span>
                  <h4 className="social-story-title font-serif">{chapter.title}</h4>
                  <p className="social-story-subtitle">{chapter.subtitle}</p>
                </div>

                <div className="social-story-card-footer flex items-center justify-between">
                  <span className="social-story-status font-mono">
                    {isSelected ? 'CURRENT CHAPTER' : 'READ CHAPTER'}
                  </span>
                  <span className="social-story-arrow font-serif" aria-hidden="true">
                    {isSelected ? '—' : '→'}
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
