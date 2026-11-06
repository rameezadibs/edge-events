import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function FeaturedArticle({ article }) {
  const shouldReduceMotion = useReducedMotion()

  if (!article) return null

  return (
    <section id="featured-story" className="featured-story-section" aria-labelledby="featured-heading">
      <div className="featured-story-container">
        {/* Section Tag */}
        <div className="featured-section-tag-row">
          <span className="featured-section-tag">FEATURED STORY</span>
          <span className="featured-tag-rule" aria-hidden="true" />
        </div>

        {/* 2-Column Editorial Card */}
        <motion.article
          className="featured-article-card"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease }}
        >
          {/* Left: Landscape Image */}
          <div className="featured-image-col">
            <a
              href={`/blogs/${article.slug}`}
              className="featured-image-link"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="featured-image-frame">
                <img
                  src={article.image}
                  alt={article.alt}
                  className="featured-img"
                  loading="eager"
                  width="1200"
                  height="750"
                />
                <div className="featured-image-overlay" aria-hidden="true" />
              </div>
            </a>
          </div>

          {/* Right: Article Details */}
          <div className="featured-content-col">
            <div className="featured-meta-top">
              <span className="featured-category">{article.category}</span>
              <span className="featured-bullet" aria-hidden="true">·</span>
              <span className="featured-badge">SPOTLIGHT</span>
            </div>

            <h2 id="featured-heading" className="featured-title">
              <a href={`/blogs/${article.slug}`} className="featured-title-link">
                {article.title}
              </a>
            </h2>

            <p className="featured-excerpt">
              {article.excerpt}
            </p>

            <div className="featured-meta-bottom">
              <span className="featured-date">{article.publishedDate}</span>
              <span className="featured-sep" aria-hidden="true">·</span>
              <span className="featured-read-time">{article.readTime}</span>
              <span className="featured-sep" aria-hidden="true">·</span>
              <span className="featured-author">{article.author}</span>
            </div>

            <div className="featured-cta-row">
              <a
                href={`/blogs/${article.slug}`}
                className="featured-read-link"
              >
                <span>READ ARTICLE</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
