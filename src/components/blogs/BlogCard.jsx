import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function BlogCard({ article, index = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className="blog-card"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : (index % 3) * 0.1, ease }}
    >
      {/* 1. Image on Top with consistent aspect ratio */}
      <a
        href={`/blogs/${article.slug}`}
        className="blog-card-media-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="blog-card-image-wrap">
          <img
            src={article.image}
            alt={article.alt || article.title}
            className="blog-card-img"
            loading="lazy"
            width="640"
            height="400"
          />
          <div className="blog-card-img-shade" aria-hidden="true" />
        </div>
      </a>

      {/* 2. Text Details */}
      <div className="blog-card-body">
        {/* Category */}
        <span className="blog-card-category">{article.category}</span>

        {/* Title */}
        <h3 className="blog-card-title">
          <a href={`/blogs/${article.slug}`} className="blog-card-title-link">
            {article.title}
          </a>
        </h3>

        {/* Excerpt */}
        <p className="blog-card-excerpt">
          {article.excerpt}
        </p>

        {/* Metadata: Date · Read Time */}
        <div className="blog-card-meta">
          <span className="card-meta-date">{article.publishedDate}</span>
          <span className="card-meta-sep" aria-hidden="true">·</span>
          <span className="card-meta-time">{article.readTime}</span>
        </div>

        {/* CTA */}
        <div className="blog-card-cta-row">
          <a
            href={`/blogs/${article.slug}`}
            className="blog-card-read-link"
          >
            <span>READ MORE</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}
