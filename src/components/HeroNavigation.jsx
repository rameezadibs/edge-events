import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, ease } from '../data/hero'

export function Logo() {
  return (
    <img
      src="/logo.png"
      alt="The Edge Events"
      className="brand-logo"
    />
  )
}

const navItemDetails = {
  'Home': { sectionId: 'home', href: '#home' },
  'About': { sectionId: 'about', href: '/about' },
  'Services': { sectionId: 'services', href: '/services', ariaLabel: 'What We Do' },
  'Portfolio': { sectionId: 'portfolio', href: '/portfolio', ariaLabel: 'Our Work Portfolio' },
  'Clients': { sectionId: 'client-logos', href: '#client-logos', ariaLabel: 'Client Logos' },
  'Blogs': { sectionId: 'latest-moments', href: '#latest-moments' },
  'Contact': { sectionId: 'latest-moments', href: '#latest-moments' },
  'Careers': { sectionId: 'careers', href: '#careers', ariaLabel: 'Careers at The Edge Events' },
}

export default function HeroNavigation({ onNavigate, onMenu, menuOpen, activeItem = 'Home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isInsidePage = typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== ''

  const handleLinkClick = (event, item) => {
    if (item === 'About' || item === 'Services' || item === 'Portfolio' || isInsidePage || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate(item)
  }

  return (
    <motion.header
      className={`hero-nav ${scrolled ? 'is-sticky' : ''}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
    >
      <div className="nav-container flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/#home"
          aria-label="The Edge Events home"
          className="logo-wrapper"
          onClick={(e) => handleLinkClick(e, 'Home')}
        >
          <Logo />
        </a>

        {/* Center Floating Navigation Capsule */}
        <nav aria-label="Main navigation" className="desktop-links flex items-center">
          <div className="nav-capsule flex items-center">
            {navItems.map((item) => {
              const isActive = activeItem === item
              const isHovered = hoveredItem === item
              const details = navItemDetails[item] || { href: `#${item.toLowerCase()}` }
              const resolvedHref = isInsidePage && details.href.startsWith('#') ? `/${details.href}` : details.href

              return (
                <a
                  key={item}
                  href={resolvedHref}
                  aria-label={details.ariaLabel || item}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(event) => handleLinkClick(event, item)}
                >
                  <span className="link-text">{item}</span>

                  {/* Active highlight capsule background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="nav-active-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}

                  {/* Hover subtle glow pill */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        className="nav-hover-bg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              )
            })}
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="nav-actions flex items-center">
          <button
            id="nav-plan-event-btn"
            className="plan-button flex items-center justify-between"
            aria-label="Plan an event with The Edge Events luxury event management"
            title="Book a consultation with The Edge Events team in Dubai &amp; Abu Dhabi"
            onClick={() => onNavigate('Plan an event')}
          >
            <span>Plan An Event</span>
            <span aria-hidden="true" className="cta-arrow">⟶</span>
          </button>
        </div>
      </div>
    </motion.header>
  )
}
