import { useEffect } from 'react'

/**
 * Injects document head SEO metadata, canonical link, Open Graph, Twitter cards,
 * and JSON-LD structured schemas (Service, BreadcrumbList, Organization, FAQPage).
 * Cleans up injected elements on unmount.
 */
export default function SEOHead({ pageData }) {
  const { seo, hero, faq, offerings, path, intro } = pageData

  useEffect(() => {
    // 1. Page Title
    const originalTitle = document.title
    document.title = seo.title

    // Helper for meta tags
    const metaElements = []
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      let isNew = false
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
        isNew = true
      }
      const prevContent = el.getAttribute('content')
      el.setAttribute('content', content)
      metaElements.push({ el, attr, key, prevContent, isNew })
    }

    // Set standard meta
    setMeta('name', 'description', seo.description)
    setMeta('name', 'keywords', seo.keywords)
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('name', 'author', 'The Edge Events')

    // Set Open Graph
    setMeta('property', 'og:title', seo.ogTitle)
    setMeta('property', 'og:description', seo.ogDescription)
    setMeta('property', 'og:url', seo.canonical)
    setMeta('property', 'og:image', seo.ogImage)
    setMeta('property', 'og:type', seo.ogType || 'website')
    setMeta('property', 'og:site_name', 'The Edge Events')
    setMeta('property', 'og:locale', 'en_AE')

    // Set Twitter / X
    setMeta('name', 'twitter:card', seo.twitterCard || 'summary_large_image')
    setMeta('name', 'twitter:title', seo.ogTitle)
    setMeta('name', 'twitter:description', seo.ogDescription)
    setMeta('name', 'twitter:image', seo.ogImage)

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    let canonicalIsNew = false
    let prevCanonical = ''
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
      canonicalIsNew = true
    } else {
      prevCanonical = canonicalLink.getAttribute('href') || ''
    }
    canonicalLink.setAttribute('href', seo.canonical)

    // Build JSON-LD structured schemas
    // 1. BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://theedgeevents.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Services',
          'item': 'https://theedgeevents.com/services'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': seo.ogTitle.split('|')[0].trim(),
          'item': seo.canonical
        }
      ]
    }

    // 2. Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'The Edge Events',
      'url': 'https://theedgeevents.com',
      'logo': 'https://theedgeevents.com/logo.png',
      'description': 'Premier luxury event management and experience production agency in Dubai and Abu Dhabi.',
      'address': [
        {
          '@type': 'PostalAddress',
          'streetAddress': 'Alserkal Avenue, Building 42, Al Quoz Industrial 1',
          'addressLocality': 'Dubai',
          'addressRegion': 'Dubai',
          'addressCountry': 'AE'
        },
        {
          '@type': 'PostalAddress',
          'streetAddress': 'Etihad Towers, Tower 3, Corniche West',
          'addressLocality': 'Abu Dhabi',
          'addressRegion': 'Abu Dhabi',
          'addressCountry': 'AE'
        }
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+971-4-000-0000',
        'contactType': 'customer support',
        'email': 'contact@theedgeevents.com',
        'areaServed': 'AE',
        'availableLanguage': ['English', 'Arabic']
      },
      'sameAs': [
        'https://www.instagram.com/the.edge.events/',
        'https://www.linkedin.com/company/theedgeevents/home/'
      ]
    }

    // 3. Service Schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'serviceType': seo.ogTitle.split('|')[0].trim(),
      'name': `${seo.ogTitle.split('|')[0].trim()} by The Edge Events`,
      'provider': {
        '@type': 'Organization',
        'name': 'The Edge Events',
        'url': 'https://theedgeevents.com'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Dubai' },
        { '@type': 'City', 'name': 'Abu Dhabi' },
        { '@type': 'Country', 'name': 'United Arab Emirates' }
      ],
      'description': seo.description,
      'url': seo.canonical,
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': offerings.heading,
        'itemListElement': offerings.items.map(item => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': item.title,
            'description': item.description
          }
        }))
      }
    }

    // 4. FAQPage Schema (Matches visibly displayed questions on page)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faq.items.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    }

    // Inject JSON-LD Script tag
    const scriptEl = document.createElement('script')
    scriptEl.type = 'application/ld+json'
    scriptEl.id = `json-ld-${pageData.id}`
    scriptEl.text = JSON.stringify([
      breadcrumbSchema,
      organizationSchema,
      serviceSchema,
      faqSchema
    ])
    document.head.appendChild(scriptEl)

    // Cleanup on unmount or route change
    return () => {
      document.title = originalTitle

      metaElements.forEach(({ el, prevContent, isNew }) => {
        if (isNew) {
          el.remove()
        } else if (prevContent !== null) {
          el.setAttribute('content', prevContent)
        }
      })

      if (canonicalIsNew) {
        canonicalLink.remove()
      } else if (prevCanonical) {
        canonicalLink.setAttribute('href', prevCanonical)
      }

      const existingScript = document.getElementById(`json-ld-${pageData.id}`)
      if (existingScript) existingScript.remove()
    }
  }, [pageData])

  return null
}
