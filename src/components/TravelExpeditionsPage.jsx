import { useState } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import SEOHead from './service/SEOHead'
import ServiceHero from './service/ServiceHero'
import ServiceIntro from './service/ServiceIntro'
import ServiceOfferings from './service/ServiceOfferings'
import ServiceCapabilities from './service/ServiceCapabilities'
import ServiceProcess from './service/ServiceProcess'
import ServiceDestinations from './service/ServiceDestinations'
import ServiceProjects from './service/ServiceProjects'
import ServiceWhyEdge from './service/ServiceWhyEdge'
import ServiceFAQ from './service/ServiceFAQ'
import RelatedServices from './service/RelatedServices'
import ServiceCTA from './service/ServiceCTA'
import { servicePagesData } from '../data/servicePagesData'
import './service/ServicePage.css'

export default function TravelExpeditionsPage() {
  const [dialogView, setDialogView] = useState(null)
  const data = servicePagesData.travel

  return (
    <div className="service-landing-page theme-travel">
      {/* 1. Dynamic Search-Engine Metadata, Canonical, OG & Structured Data */}
      <SEOHead pageData={data} />

      {/* 2. Global Site Header with Navigation */}
      <HeroNavigation activeItem="Services" onNavigate={setDialogView} />

      {/* 3. Semantic Main Content Area */}
      <main id="main-content">
        {/* Section 01: Travel Hero with Breadcrumbs & Single H1 */}
        <ServiceHero
          hero={data.hero}
          pageTitle="Travel & Expeditions"
          path={data.path}
          theme={data.theme}
          onAction={setDialogView}
        />

        {/* Section 02: Introduction (Journeys with a sense of purpose) */}
        <ServiceIntro
          intro={data.intro}
          theme={data.theme}
        />

        {/* Section 03: Experience Types (Experiences beyond the expected) */}
        <ServiceOfferings
          offerings={data.offerings}
          theme={data.theme}
        />

        {/* Section 04: Planning Capabilities (We handle the journey, not just the destination) */}
        <ServiceCapabilities
          capabilities={data.capabilities}
          theme={data.theme}
        />

        {/* Section 05: Process (From possibility to itinerary) */}
        <ServiceProcess
          process={data.process}
          theme={data.theme}
        />

        {/* Section 06: Destinations (Explore experiences across the UAE and beyond) */}
        <ServiceDestinations
          destinations={data.destinations}
        />

        {/* Section 07: Selected Experiences (Journeys We’ve Created) */}
        <ServiceProjects
          projects={data.projects}
          theme={data.theme}
          onSelectProject={setDialogView}
        />

        {/* Section 08: Why The Edge (Travel differently) */}
        <ServiceWhyEdge
          whyEdge={data.whyEdge}
          theme={data.theme}
        />

        {/* Section 09: Frequently Asked Questions with JSON-LD Schema */}
        <ServiceFAQ
          faq={data.faq}
          theme={data.theme}
        />

        {/* Section 10: Internal Linking & Architecture */}
        <RelatedServices
          currentServiceId={data.id}
          theme={data.theme}
        />

        {/* Section 11: High-Conversion Final CTA */}
        <ServiceCTA
          finalCta={data.finalCta}
          theme={data.theme}
          onAction={setDialogView}
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
