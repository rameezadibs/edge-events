import { useState, useEffect, useMemo } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import PortfolioHero from './PortfolioHero'
import PortfolioFilters from './PortfolioFilters'
import ProjectGrid from './ProjectGrid'
import PortfolioHighlights from './PortfolioHighlights'
import FinalCTA from './FinalCTA'
import ProjectDetailModal from './ProjectDetailModal'
import {
  filterCategories,
  portfolioProjects
} from '../data/portfolioData'
import './PortfolioPage.css'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [dialogView, setDialogView] = useState(null)

  // 1. Manage Dynamic SEO Page Title & Meta Description
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Event Portfolio Dubai | The Edge Events'

    let metaDesc = document.querySelector('meta[name="description"]')
    const prevMetaContent = metaDesc ? metaDesc.getAttribute('content') : ''

    const newDescription =
      'Explore corporate events, private celebrations and curated experiences delivered by The Edge Events across Dubai, the UAE and beyond.'

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescription)
    } else {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      metaDesc.content = newDescription
      document.head.appendChild(metaDesc)
    }

    // Check if initial URL has hash matching a project slug or URL path
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const match = portfolioProjects.find((p) => p.slug === hash)
      if (match) setSelectedProject(match)
    }

    return () => {
      document.title = prevTitle
      if (metaDesc && prevMetaContent) {
        metaDesc.setAttribute('content', prevMetaContent)
      }
    }
  }, [])

  // 2. Filter projects based on activeFilter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return portfolioProjects
    return portfolioProjects.filter((p) => p.categoryKey === activeFilter)
  }, [activeFilter])

  return (
    <div className="portfolio-page-wrapper">
      {/* Global Navigation */}
      <HeroNavigation
        activeItem="Portfolio"
        onNavigate={(action) => setDialogView(action || 'Plan an event')}
      />

      {/* Semantic Main Content */}
      <main id="main-content" className="portfolio-main">
        {/* Section 01: Portfolio Hero */}
        <PortfolioHero />

        {/* Section 02: Clean Text Filter Navigation */}
        <PortfolioFilters
          categories={filterCategories}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* Section 03: Main Portfolio Grid with Controlled Editorial Rhythm */}
        <ProjectGrid
          projects={filteredProjects}
          onOpenProject={setSelectedProject}
          activeFilter={activeFilter}
        />

        {/* Section 04: Typography-Led Brand Disciplines & Highlights Strip */}
        <PortfolioHighlights />

        {/* Section 05: Strong Closing Contact CTA */}
        <FinalCTA
          onStartConversation={() => setDialogView('Plan an event')}
        />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Project Monograph / Case Study Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartConversation={() => setDialogView('Plan an event')}
        />
      )}

      {/* Global Consultation Booking Dialog */}
      <HeroDialog
        view={dialogView}
        onClose={() => setDialogView(null)}
        onNavigate={setDialogView}
      />
    </div>
  )
}
