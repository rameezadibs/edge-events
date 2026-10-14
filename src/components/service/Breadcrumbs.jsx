import { motion } from 'framer-motion'

/**
 * Accessible Breadcrumb navigation component for service landing pages.
 */
export default function Breadcrumbs({ currentPageTitle, currentPath }) {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: currentPageTitle, href: currentPath, current: true }
  ]

  return (
    <nav aria-label="Breadcrumb" className="service-breadcrumbs">
      <ol className="breadcrumb-list flex items-center flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1
          return (
            <li
              key={crumb.label}
              className="breadcrumb-item flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className="breadcrumb-current font-medium"
                  aria-current="page"
                  itemProp="name"
                >
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href}
                  className="breadcrumb-link transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb.label}</span>
                </a>
              )}
              <meta itemProp="position" content={String(idx + 1)} />

              {!isLast && (
                <span className="breadcrumb-separator mx-2.5 text-stone-400" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
