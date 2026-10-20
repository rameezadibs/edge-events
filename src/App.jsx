import React, { useState, useEffect, Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero'
import WhoWeAre from './components/WhoWeAre'
import ServicesSection from './components/ServicesSection'
import SelectedWorks from './components/SelectedWorks'
import TrustedBy from './components/TrustedBy'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'

// Lazy load secondary route bundles for optimal initial page-load performance and Core Web Vitals
const AboutPage = lazy(() => import('./components/AboutPage'))
const ServicesPage = lazy(() => import('./components/ServicesPage'))
const CorporateEventsPage = lazy(() => import('./components/CorporateEventsPage'))
const SocialCelebrationsPage = lazy(() => import('./components/SocialCelebrationsPage'))
const TravelExpeditionsPage = lazy(() => import('./components/TravelExpeditionsPage'))
const PortfolioPage = lazy(() => import('./components/PortfolioPage'))

function normalizePath(pathname) {
  const cleaned = pathname.replace(/\/+$/, '')
  return cleaned === '' ? '/' : cleaned
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    // Intercept internal link navigation for seamless SPA transitions
    const handleLinkClick = (event) => {
      // Ignore if modified click, middle click, etc.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      // Find closest anchor tag
      const anchor = event.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // External links, mailto, tel
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return
      }

      // Check if it's an internal route
      try {
        const url = new URL(anchor.href, window.location.origin)
        if (url.origin !== window.location.origin) return

        // If it's a hash anchor on the same page
        if (url.pathname === window.location.pathname && url.hash) {
          return // Let browser native jump / smooth scroll take over
        }

        // Navigate via pushState
        event.preventDefault()
        window.history.pushState({}, '', url.pathname + url.search + url.hash)
        setCurrentPath(normalizePath(url.pathname))

        if (url.hash) {
          const el = document.querySelector(url.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      } catch (e) {
        // Fallback to normal navigation
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  // Route matching
  let PageComponent
  if (currentPath === '/services/corporate-events') {
    PageComponent = <CorporateEventsPage />
  } else if (currentPath === '/services/social-celebrations') {
    PageComponent = <SocialCelebrationsPage />
  } else if (currentPath === '/services/travel-expeditions') {
    PageComponent = <TravelExpeditionsPage />
  } else if (currentPath === '/services') {
    PageComponent = <ServicesPage />
  } else if (currentPath === '/portfolio' || currentPath.startsWith('/portfolio/')) {
    PageComponent = <PortfolioPage />
  } else if (currentPath === '/about') {
    PageComponent = <AboutPage />
  } else {
    // Default Home Page
    PageComponent = (
      <>
        <main>
          <Hero />
          <WhoWeAre />
          <ServicesSection />
          <SelectedWorks />
          <TrustedBy />
          <TestimonialsSection />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<div className="page-loading-skeleton" style={{ minHeight: '100vh', background: '#F5F1EA' }} />}>
        {PageComponent}
      </Suspense>
    </MotionConfig>
  )
}
