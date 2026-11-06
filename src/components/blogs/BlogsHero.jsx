import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function BlogsHero() {
  const shouldReduceMotion = useReducedMotion()

  const fadeIn = (delay = 0, y = 16) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay: shouldReduceMotion ? 0 : delay, ease },
  })

  const scrollToContent = (e) => {
    e.preventDefault()
    const target = document.getElementById('category-nav') || document.getElementById('featured-story')
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="blogs-hero-section" aria-labelledby="blogs-hero-heading">
      <div className="blogs-hero-container">
        {/* Top Kicker Label with Accent Rule */}
        <motion.div className="blogs-kicker-row flex items-center" {...fadeIn(0.1, 8)}>
          <span className="blogs-kicker-label">INSIGHTS &amp; STORIES</span>
          <span className="blogs-kicker-line" aria-hidden="true" />
          <span className="blogs-kicker-sub text-xs tracking-widest text-[#6D7276]">THE EDGE JOURNAL</span>
        </motion.div>

        {/* 2-Column Hero Grid: Headline on Left, Minimal Editorial Stack on Right */}
        <div className="blogs-hero-grid">
          <div className="blogs-hero-main">
            <h1 id="blogs-hero-heading" className="blogs-hero-title">
              <motion.span className="block" {...fadeIn(0.2, 18)}>
                Ideas, experiences
              </motion.span>
              <motion.span className="block" {...fadeIn(0.3, 18)}>
                and stories from
              </motion.span>
              <motion.span className="block blogs-hero-teal" {...fadeIn(0.4, 18)}>
                behind the scenes.
              </motion.span>
            </h1>

            <motion.p className="blogs-hero-copy" {...fadeIn(0.55, 14)}>
              Explore ideas, trends and practical insights from the world of events, celebrations and curated experiences.
            </motion.p>

            <motion.div className="blogs-hero-cta-wrap" {...fadeIn(0.68, 10)}>
              <a
                href="#featured-story"
                onClick={scrollToContent}
                className="blogs-hero-scroll-link"
                aria-label="Scroll to explore latest stories"
              >
                <span>EXPLORE LATEST STORIES</span>
                <span className="scroll-arrow" aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </div>

          {/* Right Minimal Editorial Word Stack */}
          <motion.div className="blogs-hero-side" {...fadeIn(0.5, 14)}>
            <div className="blogs-editorial-stack" aria-label="Editorial Pillars">
              <span className="editorial-stack-item">EVENTS</span>
              <span className="editorial-stack-dot" aria-hidden="true">·</span>
              <span className="editorial-stack-item">PEOPLE</span>
              <span className="editorial-stack-dot" aria-hidden="true">·</span>
              <span className="editorial-stack-item">PLACES</span>
              <span className="editorial-stack-dot" aria-hidden="true">·</span>
              <span className="editorial-stack-item">IDEAS</span>
            </div>
            <div className="blogs-side-meta">
              <span className="blogs-side-edition">CURATED DISPATCHES</span>
              <span className="blogs-side-location">DUBAI · ABU DHABI · UAE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
