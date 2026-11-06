import BlogCard from './BlogCard'

export default function BlogGrid({
  articles,
  searchQuery,
  onSearchChange,
  activeCategory,
  onResetFilters,
}) {
  return (
    <section id="all-stories" className="blog-grid-section" aria-labelledby="all-stories-heading">
      <div className="blog-grid-container">
        {/* Section Header with Title, Helper sentence & Subtle Search Field */}
        <div className="blog-grid-header">
          <div className="grid-header-copy">
            <span className="section-kicker">DISPATCH ARCHIVE</span>
            <h2 id="all-stories-heading" className="section-heading">
              All Stories
            </h2>
            <p className="section-helper">
              Browse the latest thinking, ideas and experiences from The Edge Events.
            </p>
          </div>

          {/* Minimal Search Input */}
          <div className="blog-search-wrap">
            <label htmlFor="blog-search-input" className="sr-only">
              Search articles
            </label>
            <div className="search-input-shell">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="blog-search-input"
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="blog-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter State Status Banner (if active filter or query) */}
        {(activeCategory !== 'ALL' || searchQuery) && (
          <div className="blog-filter-status-bar" role="status">
            <span>
              Showing results for{' '}
              {activeCategory !== 'ALL' && <strong>Category: {activeCategory}</strong>}
              {activeCategory !== 'ALL' && searchQuery && ' and '}
              {searchQuery && <strong>Query: “{searchQuery}”</strong>}
              {' '}({articles.length} {articles.length === 1 ? 'article' : 'articles'})
            </span>
            <button
              type="button"
              onClick={onResetFilters}
              className="filter-reset-link"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Main Grid: 3 columns desktop, 2 tablet, 1 mobile */}
        {articles.length > 0 ? (
          <div className="blog-main-grid">
            {articles.map((article, index) => (
              <BlogCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="blog-empty-state" role="status">
            <h3 className="empty-state-title">No stories found</h3>
            <p className="empty-state-copy">
              We couldn’t find any articles matching your selected criteria.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="empty-state-btn"
            >
              SHOW ALL STORIES
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
