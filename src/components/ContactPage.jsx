import { useState } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import SEOHead from './contact/SEOHead'
import ContactHero from './contact/ContactHero'
import ContactForm from './contact/ContactForm'
import ContactDetails from './contact/ContactDetails'
import LocationSection from './contact/LocationSection'
import QuickContact from './contact/QuickContact'
import './contact/ContactPage.css'

export default function ContactPage() {
  const [dialogView, setDialogView] = useState(null)

  const handleNavigate = (destination) => {
    if (destination === 'Home') {
      window.location.assign('/')
      return
    }
    if (destination === 'About') {
      window.location.assign('/about')
      return
    }
    if (destination === 'Services') {
      window.location.assign('/services')
      return
    }
    if (destination === 'Portfolio') {
      window.location.assign('/portfolio')
      return
    }
    if (destination === 'Contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (destination === 'Plan an event') {
      const formEl = document.getElementById('event-enquiry-form')
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' })
        const nameInput = document.getElementById('field-fullName')
        setTimeout(() => nameInput?.focus(), 400)
      } else {
        setDialogView('Plan an event')
      }
      return
    }

    setDialogView(destination)
  }

  return (
    <div className="contact-page">
      {/* 0. SEO Head & Structured Data */}
      <SEOHead />

      {/* 1. Global Navigation Bar */}
      <HeroNavigation
        activeItem="Contact"
        onNavigate={handleNavigate}
        onMenu={() => setDialogView('menu')}
        menuOpen={dialogView === 'menu'}
      />

      {/* Semantic Main Content */}
      <main id="main-content">
        {/* Section 01: Contact Hero */}
        <ContactHero />

        {/* Section 02: Main Contact Area (Left: Form · Right: Direct Details) */}
        <section className="contact-main-section" aria-label="Event Enquiry & Direct Contact">
          <div className="contact-main-container">
            <div className="contact-main-grid">
              <ContactForm />
              <ContactDetails />
            </div>
          </div>
        </section>

        {/* Section 03: Dubai / UAE Presence */}
        <LocationSection />

        {/* Section 04: Quick Contact Options */}
        <QuickContact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Secondary Dialogs (Menu, etc.) */}
      <HeroDialog
        view={dialogView}
        onClose={() => setDialogView(null)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
