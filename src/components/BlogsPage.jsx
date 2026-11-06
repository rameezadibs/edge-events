import { useState, useMemo } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import SEOHead from './blogs/SEOHead'
import BlogsHero from './blogs/BlogsHero'
import BlogCategories from './blogs/BlogCategories'
import FeaturedArticle from './blogs/FeaturedArticle'
import LatestInsights from './blogs/LatestInsights'
import BlogGrid from './blogs/BlogGrid'
import BlogPagination from './blogs/BlogPagination'
import InsightsCTA from './blogs/InsightsCTA'
import BlogCTA from './blogs/BlogCTA'
import { blogArticles } from '../data/blogData'
import './blogs/BlogsPage.css'

const ARTICLES_PER_PAGE = 6

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [dialogView, setDialogView] = useState(null)

  // 1. Featured Article
  const featuredArticle = useMemo(() => {
    return blogArticles.find((a) => a.featured) || blogArticles[0]
  }, [])

  // 2. Latest Insights (top 3 non-featured or top 3 latest)
  const latestArticles = useMemo(() => {
    return blogArticles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3)
  }, [featuredArticle])

  // 3. Filtered Articles for All Stories Grid
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'ALL' ||
        article.category.toUpperCase() === activeCategory.toUpperCase()

      // Search query filter
      const matchesSearch =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // 4. Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE) || 1
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE)
  }, [filteredArticles, currentPage])

  const handleCategorySelect = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setActiveCategory('ALL')
    setSearchQuery('')
    setCurrentPage(1)
  }

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
      window.location.assign('/contact')
      return
    }
    if (destination === 'Blogs') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (destination === 'Plan an event') {
      window.location.assign('/contact')
      return
    }
    setDialogView(destination)
  }

  return (
    <div className="blogs-page">
      {/* 0. SEO Head & Structured Data */}
      <SEOHead />

      {/* 1. Global Navigation Bar */}
      <HeroNavigation
        activeItem="Blogs"
        onNavigate={handleNavigate}
        onMenu={() => setDialogView('menu')}
        menuOpen={dialogView === 'menu'}
      />

      {/* Main Editorial Content */}
      <main id="main-content">
        {/* Section 01: Blog Hero */}
        <BlogsHero />

        {/* Section 02: Category Navigation */}
        <BlogCategories
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Section 03: Featured Article (shown when category is ALL and no search) */}
        {activeCategory === 'ALL' && !searchQuery && (
          <FeaturedArticle article={featuredArticle} />
        )}

        {/* Section 04: Latest Insights (top 3 curated row) */}
        {activeCategory === 'ALL' && !searchQuery && (
          <LatestInsights articles={latestArticles} />
        )}

        {/* Section 05: All Stories Grid */}
        <BlogGrid
          articles={paginatedArticles}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onResetFilters={handleResetFilters}
        />

        {/* Section 06: Pagination */}
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Section 07: Newsletter or Insights CTA */}
        <InsightsCTA />

        {/* Section 08: Final Brand Contact CTA */}
        <BlogCTA />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Secondary Menu / Dialog */}
      <HeroDialog
        view={dialogView}
        onClose={() => setDialogView(null)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
