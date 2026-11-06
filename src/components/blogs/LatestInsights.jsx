import BlogCard from './BlogCard'

export default function LatestInsights({ articles }) {
  if (!articles || articles.length === 0) return null

  // Take top 3 latest
  const displayArticles = articles.slice(0, 3)

  return (
    <section id="latest-insights" className="latest-insights-section" aria-labelledby="latest-insights-title">
      <div className="latest-insights-container">
        {/* Section Header */}
        <div className="latest-insights-header">
          <div className="section-title-wrap">
            <span className="section-kicker">CURATED EDITORIAL</span>
            <h2 id="latest-insights-title" className="section-heading">
              Latest Insights
            </h2>
          </div>
          <span className="section-header-rule" aria-hidden="true" />
        </div>

        {/* 3-Column Structured Row */}
        <div className="latest-insights-grid">
          {displayArticles.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
