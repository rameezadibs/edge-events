import { useState } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import SEOHead from './service/SEOHead'
import ServiceHero from './service/ServiceHero'
import ServiceOfferings from './service/ServiceOfferings'
import ServiceProcess from './service/ServiceProcess'
import ServiceCapabilities from './service/ServiceCapabilities'
import ServiceFAQ from './service/ServiceFAQ'
import RelatedServices from './service/RelatedServices'
import { servicePagesData } from '../data/servicePagesData'
import './service/ServicePage.css'

export default function CorporateEventsPage() {
  const [dialogView, setDialogView] = useState(null)
  const data = servicePagesData.corporate

  return (
    <div className="service-landing-page theme-corporate">
      {/* 1. Dynamic Search-Engine Metadata, Canonical, OG & Structured Data */}
      <SEOHead pageData={data} />

      {/* 2. Global Site Header with Navigation */}
      <HeroNavigation activeItem="Services" onNavigate={setDialogView} />

      {/* 3. Semantic Main Content Area */}
      <main id="main-content">
        {/* Section 01: Corporate Hero with Breadcrumbs & Single H1 */}
        <ServiceHero
          hero={data.hero}
          pageTitle="Corporate Events"
          path={data.path}
          theme={data.theme}
          onAction={setDialogView}
        />

        {/* Section 02: What We Deliver (Conferences, launches, galas...) */}
        <ServiceOfferings
          offerings={data.offerings}
          theme={data.theme}
        />

        {/* Section 03: Process (Understand, Create, Coordinate, Deliver) */}
        <ServiceProcess
          process={data.process}
          theme={data.theme}
        />

        {/* Section 04: Capabilities (Everything behind the experience) */}
        <ServiceCapabilities
          capabilities={data.capabilities}
          theme={data.theme}
        />

        {/* Section 05: Frequently Asked Questions with JSON-LD Schema */}
        <ServiceFAQ
          faq={data.faq}
          theme={data.theme}
        />

        {/* Section 09: Internal Linking & Architecture */}
        <RelatedServices
          currentServiceId={data.id}
          theme={data.theme}
        />
      </main>

      {/* 4. Global Site Footer */}
      <Footer />

      {/* 5. Consultation & Booking Dialog */}
      <HeroDialog
        view={dialogView}
        onClose={() => setDialogView(null)}
        onNavigate={setDialogView}
      />
    </div>
  )
}
