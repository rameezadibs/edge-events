import { motion } from 'framer-motion'
import { BLOG_CATEGORIES } from '../../data/blogData'

export default function BlogCategories({ activeCategory, onSelectCategory }) {
  return (
    <nav
      id="category-nav"
      className="blog-categories-bar"
      aria-label="Filter stories by category"
    >
      <div className="blog-categories-container">
        <div className="blog-categories-scroll-wrapper">
          <div className="blog-categories-list" role="tablist">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="articles-region"
                  onClick={() => onSelectCategory(cat)}
                  className={`blog-category-tab ${isActive ? 'is-active' : ''}`}
                >
                  <span className="tab-label">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="tab-active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="tab-hover-indicator" aria-hidden="true" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
