export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null

  const handlePageClick = (page) => {
    onPageChange(page)
    const el = document.getElementById('all-stories')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="blog-pagination" aria-label="Stories pagination">
      <div className="blog-pagination-container">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-nav-btn prev-btn"
          aria-label="Go to previous page"
        >
          <span className="btn-arrow" aria-hidden="true">←</span>
          <span>PREV</span>
        </button>

        {/* Numbered Page Buttons: 01, 02, etc. */}
        <div className="pagination-numbers">
          {pages.map((p) => {
            const isActive = p === currentPage
            const formatted = p < 10 ? `0${p}` : `${p}`

            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePageClick(p)}
                aria-current={isActive ? 'page' : undefined}
                className={`pagination-num-btn ${isActive ? 'is-active' : ''}`}
                aria-label={`Page ${p}`}
              >
                <span>{formatted}</span>
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-nav-btn next-btn"
          aria-label="Go to next page"
        >
          <span>NEXT</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </nav>
  )
}
