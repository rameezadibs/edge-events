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

export default function SocialCelebrationsPage() {
  const [dialogView, setDialogView] = useState(null)
  const data = servicePagesData.social

  return (
    <div className="service-landing-page theme-social">
      {/* 1. Dynamic Search-Engine Metadata, Canonical, OG & Structured Data */}
      <SEOHead pageData={data} />

      {/* 2. Global Site Header with Navigation */}
      <HeroNavigation activeItem="Services" onNavigate={setDialogView} />

      {/* 3. Semantic Main Content Area */}
      <main id="main-content">
        {/* Section 01: Social Hero with Breadcrumbs & Single H1 */}
        <ServiceHero
          hero={data.hero}
          pageTitle="Social Celebrations"
          path={data.path}
          theme={data.theme}
          onAction={setDialogView}
        />

        {/* Section 02: Services (Celebrations worth remembering) */}
        <ServiceOfferings
          offerings={data.offerings}
          theme={data.theme}
        />

        {/* Section 03: Experience & Capabilities (Every detail, considered.) */}
        <ServiceCapabilities
          capabilities={data.capabilities}
          theme={data.theme}
        />

        {/* Section 04: Process (From an idea to your moment.) */}
        <ServiceProcess
          process={data.process}
          theme={data.theme}
        />

        {/* Section 05: Frequently Asked Questions with JSON-LD Schema */}
        <ServiceFAQ
          faq={data.faq}
          theme={data.theme}
        />

        {/* Section 06: Internal Linking & Architecture */}
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
