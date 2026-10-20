import { motion } from 'framer-motion'

export default function PortfolioFilters({
  categories,
  activeFilter,
  onSelectFilter
}) {
  const handleKeyDown = (e, filterId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelectFilter(filterId)
    }
  }

  return (
    <nav
      className="portfolio-filter-nav"
      aria-label="Filter portfolio projects by category"
    >
      <div className="portfolio-container">
        <div
          role="tablist"
          aria-label="Portfolio categories"
          className="filter-tablist"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id

            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls="portfolio-project-grid"
                tabIndex={0}
                type="button"
                className={`filter-text-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectFilter(cat.id)}
                onKeyDown={(e) => handleKeyDown(e, cat.id)}
              >
                <span className="filter-label-text">
                  {cat.label}
                </span>

                {/* Active Underline via Framer Motion layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="activeFilterUnderline"
                    className="filter-active-line"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 38
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Hover Line */}
                <span className="filter-hover-line" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
