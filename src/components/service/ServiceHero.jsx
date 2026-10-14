import { motion, useReducedMotion } from 'framer-motion'
import Breadcrumbs from './Breadcrumbs'
import { ease } from '../../data/hero'

export default function ServiceHero({ hero, pageTitle, path, theme, onAction }) {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: reduced ? 0 : delay, ease }
  })

  return (
    <section className={`service-hero service-hero--${theme}`} aria-labelledby="service-hero-heading">
      {/* Subtle architectural atmosphere layer */}
      <div className="hero-atmosphere-backdrop" aria-hidden="true" />

      <div className="service-hero-inner">
        {/* Breadcrumb Navigation */}
        <motion.div {...reveal(0.05)} className="hero-breadcrumbs-wrapper">
          <Breadcrumbs currentPageTitle={pageTitle} currentPath={path} />
        </motion.div>

        <div className="service-hero-grid">
          {/* Left / Top Editorial Content */}
          <div className="service-hero-content">
            <motion.div className="service-hero-kicker flex items-center" {...reveal(0.12)}>
              <span className="kicker-badge">{hero.eyebrow}</span>
              <span className="kicker-rule" aria-hidden="true" />
            </motion.div>

            <motion.h1 id="service-hero-heading" className="service-hero-title font-serif" {...reveal(0.2)}>
              <span className="block">{hero.titleLine1}</span>
              <span className="block">
                {hero.titleLine2Prefix && <span>{hero.titleLine2Prefix}</span>}
                <em className="text-edge italic">{hero.titleHighlight}</em>
              </span>
            </motion.h1>

            <motion.p className="service-hero-description" {...reveal(0.32)}>
              {hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div className="service-hero-actions flex items-center flex-wrap" {...reveal(0.42)}>
              {hero.primaryCta && (
                <a
                  href={hero.primaryCta.href}
                  className="service-btn-primary"
                  onClick={(e) => {
                    if (onAction) {
                      e.preventDefault()
                      onAction('Plan an event')
                    }
                  }}
                  id={`hero-primary-cta-${theme}`}
                >
                  <span>{hero.primaryCta.text}</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>
              )}

              {hero.secondaryCta && (
                <a
                  href={hero.secondaryCta.href}
                  className="service-link-secondary flex items-center"
                >
                  <span>{hero.secondaryCta.text}</span>
                  <span className="link-arrow" aria-hidden="true">→</span>
                </a>
              )}
            </motion.div>

            {/* Subtle verification pill */}
            {hero.statsPill && (
              <motion.div className="service-hero-meta" {...reveal(0.5)}>
                <span className="meta-bullet" aria-hidden="true">●</span>
                <span className="meta-text">{hero.statsPill}</span>
              </motion.div>
            )}
          </div>

          {/* Right / Hero Image Visual Container */}
          <motion.div
            className="service-hero-media"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: reduced ? 0 : 0.25, ease }}
          >
            <div className="hero-image-frame relative">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                fetchPriority="high"
                loading="eager"
                className="hero-image-img"
              />
              <div className="hero-image-overlay" aria-hidden="true" />
              <div className="hero-image-tag font-mono text-xs uppercase" aria-hidden="true">
                <span>{hero.eyebrow}</span>
                <span>ARCHITECTURAL DIRECTION</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
