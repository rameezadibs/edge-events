import { useEffect } from 'react'

/**
 * SEOHead for Blogs (Index and Single Article view)
 * Injects document title, meta tags, canonical link, and JSON-LD structured schemas.
 */
export default function SEOHead({ article = null }) {
  useEffect(() => {
    const originalTitle = document.title

    const pageTitle = article
      ? `${article.title} | The Edge Events`
      : 'Event Insights & Ideas Dubai | The Edge Events'

    const pageDescription = article
      ? article.seoDescription || article.excerpt
      : 'Explore event planning insights, trends, corporate event ideas, celebration inspiration and curated experience guides from The Edge Events.'

    const canonicalUrl = article
      ? `https://theedgeevents.com/blogs/${article.slug}`
      : 'https://theedgeevents.com/blogs'

    const ogImage = article
      ? `https://theedgeevents.com${article.image}`
      : 'https://theedgeevents.com/logo.png'

    document.title = pageTitle

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'The Edge Events' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: article ? 'article' : 'website' },
      { property: 'og:site_name', content: 'The Edge Events' },
      { property: 'og:locale', content: 'en_AE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: ogImage },
    ]

    const injectedMetaEls = []

    metaTags.forEach((item) => {
      let el
      if (item.property) {
        el = document.querySelector(`meta[property="${item.property}"]`)
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('property', item.property)
          document.head.appendChild(el)
          injectedMetaEls.push({ el, isNew: true })
        } else {
          injectedMetaEls.push({ el, isNew: false, prev: el.getAttribute('content') })
        }
        el.setAttribute('content', item.content)
      } else {
        el = document.querySelector(`meta[name="${item.name}"]`)
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('name', item.name)
          document.head.appendChild(el)
          injectedMetaEls.push({ el, isNew: true })
        } else {
          injectedMetaEls.push({ el, isNew: false, prev: el.getAttribute('content') })
        }
        el.setAttribute('content', item.content)
      }
    })

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    let canonicalIsNew = false
    let prevCanonical = ''
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
      canonicalIsNew = true
    } else {
      prevCanonical = canonical.getAttribute('href') || ''
    }
    canonical.setAttribute('href', canonicalUrl)

    // Structured Data
    const structuredData = []

    if (article) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': article.title,
        'description': article.excerpt,
        'image': `https://theedgeevents.com${article.image}`,
        'datePublished': '2026-10-01T08:00:00+04:00',
        'author': {
          '@type': 'Organization',
          'name': 'The Edge Events',
          'url': 'https://theedgeevents.com',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'The Edge Events',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://theedgeevents.com/logo.png',
          },
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      })

      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://theedgeevents.com/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blogs & Insights',
            'item': 'https://theedgeevents.com/blogs',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': article.title,
            'item': canonicalUrl,
          },
        ],
      })
    } else {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'The Edge Events Insights & Editorial Stories',
        'url': 'https://theedgeevents.com/blogs',
        'description': 'Explore event planning insights, trends, corporate event ideas, celebration inspiration and curated experience guides from The Edge Events.',
        'publisher': {
          '@type': 'Organization',
          'name': 'The Edge Events',
          'url': 'https://theedgeevents.com',
          'logo': 'https://theedgeevents.com/logo.png',
        },
      })

      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://theedgeevents.com/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blogs & Insights',
            'item': 'https://theedgeevents.com/blogs',
          },
        ],
      })
    }

    const scriptEl = document.createElement('script')
    scriptEl.type = 'application/ld+json'
    scriptEl.id = 'jsonld-blogs'
    scriptEl.text = JSON.stringify(structuredData)
    document.head.appendChild(scriptEl)

    return () => {
      document.title = originalTitle
      injectedMetaEls.forEach(({ el, isNew, prev }) => {
        if (isNew) {
          el.remove()
        } else if (prev !== undefined && prev !== null) {
          el.setAttribute('content', prev)
        }
      })
      if (canonicalIsNew) {
        canonical.remove()
      } else if (prevCanonical) {
        canonical.setAttribute('href', prevCanonical)
      }
      const existing = document.getElementById('jsonld-blogs')
      if (existing) existing.remove()
    }
  }, [article])

  return null
}
