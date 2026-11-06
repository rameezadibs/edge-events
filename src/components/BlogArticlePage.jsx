import { useState, useMemo } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'
import SEOHead from './blogs/SEOHead'
import RelatedArticles from './blogs/RelatedArticles'
import BlogCTA from './blogs/BlogCTA'
import { blogArticles } from '../data/blogData'
import './blogs/BlogsPage.css'

export default function BlogArticlePage({ slug }) {
  const [dialogView, setDialogView] = useState(null)

  const article = useMemo(() => {
    return blogArticles.find((a) => a.slug === slug)
  }, [slug])

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
      window.location.assign('/blogs')
      return
    }
    if (destination === 'Plan an event') {
      window.location.assign('/contact')
      return
    }
    setDialogView(destination)
  }

  if (!article) {
    return (
      <div className="blogs-page">
        <SEOHead />
        <HeroNavigation activeItem="Blogs" onNavigate={handleNavigate} />
        <main className="blogs-hero-section py-24 text-center">
          <div className="blogs-hero-container">
            <span className="blogs-kicker-label">ARTICLE NOT FOUND</span>
            <h1 className="blogs-hero-title mt-4">Story Not Found</h1>
            <p className="blogs-hero-copy mx-auto mt-4">
              The article you are searching for may have been moved or updated.
            </p>
            <div className="mt-8">
              <a href="/blogs" className="featured-read-link">
                <span>RETURN TO ALL STORIES</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="blogs-page">
      {/* 0. SEO Head & Structured Data */}
      <SEOHead article={article} />

      {/* 1. Global Navigation Bar */}
      <HeroNavigation
        activeItem="Blogs"
        onNavigate={handleNavigate}
        onMenu={() => setDialogView('menu')}
        menuOpen={dialogView === 'menu'}
      />

      <main id="main-content">
        {/* Article Header & Breadcrumbs */}
        <header className="article-header-section">
          <div className="blog-article-container">
            {/* Breadcrumbs */}
            <nav className="article-breadcrumbs" aria-label="Breadcrumb">
              <a href="/" className="crumb-link">Home</a>
              <span className="crumb-sep" aria-hidden="true">/</span>
              <a href="/blogs" className="crumb-link">Blogs</a>
              <span className="crumb-sep" aria-hidden="true">/</span>
              <span className="crumb-current" aria-current="page">{article.title}</span>
            </nav>

            {/* Category */}
            <span className="article-header-category">{article.category}</span>

            {/* Main Article Title */}
            <h1 className="article-main-h1">{article.title}</h1>

            {/* Short Intro */}
            {article.content?.intro && (
              <p className="article-main-intro">{article.content.intro}</p>
            )}

            {/* Author, Date, Read Time */}
            <div className="article-author-row">
              <span className="article-author-name">{article.author}</span>
              <span className="sep-dot" aria-hidden="true">·</span>
              <span>{article.publishedDate}</span>
              <span className="sep-dot" aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <section className="article-hero-media" aria-label="Article hero imagery">
          <div className="blog-article-container">
            <div className="article-hero-image-wrap">
              <img
                src={article.image}
                alt={article.alt || article.title}
                className="article-hero-img"
                loading="eager"
                width="1440"
                height="810"
              />
            </div>
            <p className="article-hero-caption">{article.alt}</p>
          </div>
        </section>

        {/* Article Body Content */}
        <article className="article-body-section">
          <div className="blog-article-container">
            <div className="article-body-wrap article-prose">
              {article.content?.sections?.map((section, idx) => (
                <div key={idx} className="article-section-block">
                  {section.heading && (
                    <h2 className="article-h2">{section.heading}</h2>
                  )}

                  {section.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx} className="article-paragraph">{p}</p>
                  ))}

                  {section.bullets && (
                    <ul className="article-bullet-list">
                      {section.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Editorial Pullquote */}
              {article.content?.quote && (
                <blockquote className="article-pullquote">
                  {article.content.quote}
                </blockquote>
              )}

              {/* Service Recommendation CTA */}
              {article.serviceLink && (
                <div className="article-service-cta-card">
                  <div>
                    <h3 className="service-cta-title">Looking to craft an event like this?</h3>
                    <p className="service-cta-copy">
                      Our Dubai &amp; Abu Dhabi team coordinates every detail from concept to execution.
                    </p>
                  </div>
                  <a href={article.serviceLink.href} className="service-cta-btn">
                    <span>{article.serviceLink.label}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <RelatedArticles
          currentArticleId={article.id}
          currentCategory={article.category}
          allArticles={blogArticles}
        />

        {/* Final Contact CTA */}
        <BlogCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Secondary Menu */}
      <HeroDialog
        view={dialogView}
        onClose={() => setDialogView(null)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
