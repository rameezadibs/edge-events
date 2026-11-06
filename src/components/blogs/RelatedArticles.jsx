import BlogCard from './BlogCard'

export default function RelatedArticles({ currentArticleId, currentCategory, allArticles }) {
  // Find related articles: match same category first, then others, exclude current
  const related = allArticles
    .filter((a) => a.id !== currentArticleId)
    .sort((a, b) => {
      const aSame = a.category === currentCategory ? 1 : 0
      const bSame = b.category === currentCategory ? 1 : 0
      return bSame - aSame
    })
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="related-articles-section" aria-labelledby="related-articles-title">
      <div className="related-articles-container">
        <div className="related-articles-header">
          <div className="related-header-copy">
            <span className="section-kicker">FURTHER READING</span>
            <h2 id="related-articles-title" className="section-heading">
              Related Stories
            </h2>
          </div>
          <a href="/blogs" className="related-all-link">
            <span>VIEW ALL STORIES</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="related-articles-grid">
          {related.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
