import { useEffect } from 'react'

/**
 * SEOHead for /contact
 * Injects page title, meta description, canonical URL, OpenGraph, Twitter card,
 * and JSON-LD structured schemas (Organization/LocalBusiness & BreadcrumbList).
 * Automatically cleans up on unmount.
 */
export default function SEOHead() {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Contact The Edge Events | Event Company Dubai'

    const metaTags = [
      { attr: 'name', key: 'description', content: 'Contact The Edge Events to plan corporate events, private celebrations and curated experiences across Dubai and the UAE.' },
      { attr: 'name', key: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { attr: 'name', key: 'author', content: 'The Edge Events' },
      { attr: 'property', 'og:title': 'Contact The Edge Events | Event Company Dubai' },
      { attr: 'property', 'og:description': 'Contact The Edge Events to plan corporate events, private celebrations and curated experiences across Dubai and the UAE.' },
      { attr: 'property', 'og:url': 'https://theedgeevents.com/contact' },
      { attr: 'property', 'og:image': 'https://theedgeevents.com/logo.png' },
      { attr: 'property', 'og:type': 'website' },
      { attr: 'property', 'og:site_name': 'The Edge Events' },
      { attr: 'property', 'og:locale': 'en_AE' },
      { attr: 'name', 'twitter:card': 'summary_large_image' },
      { attr: 'name', 'twitter:title': 'Contact The Edge Events | Event Company Dubai' },
      { attr: 'name', 'twitter:description': 'Contact The Edge Events to plan corporate events, private celebrations and curated experiences across Dubai and the UAE.' },
      { attr: 'name', 'twitter:image': 'https://theedgeevents.com/logo.png' },
    ]

    const injectedMetaEls = []

    metaTags.forEach((item) => {
      let el
      if (item.attr === 'property') {
        const propKey = Object.keys(item).find((k) => k.startsWith('og:'))
        if (propKey) {
          el = document.querySelector(`meta[property="${propKey}"]`)
          if (!el) {
            el = document.createElement('meta')
            el.setAttribute('property', propKey)
            document.head.appendChild(el)
            injectedMetaEls.push({ el, isNew: true })
          } else {
            injectedMetaEls.push({ el, isNew: false, prev: el.getAttribute('content') })
          }
          el.setAttribute('content', item[propKey])
        }
      } else {
        const nameKey = Object.keys(item).find((k) => k !== 'attr' && k !== 'key' && k !== 'content')
        const prop = item.key || nameKey
        const content = item.content || item[nameKey]
        el = document.querySelector(`meta[name="${prop}"]`)
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('name', prop)
          document.head.appendChild(el)
          injectedMetaEls.push({ el, isNew: true })
        } else {
          injectedMetaEls.push({ el, isNew: false, prev: el.getAttribute('content') })
        }
        el.setAttribute('content', content)
      }
    })

    // Canonical Link
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
    canonical.setAttribute('href', 'https://theedgeevents.com/contact')

    // Structured Data: Organization / LocalBusiness & BreadcrumbList
    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'The Edge Events',
        'url': 'https://theedgeevents.com/contact',
        'logo': 'https://theedgeevents.com/logo.png',
        'image': 'https://theedgeevents.com/logo.png',
        'description': 'Premier luxury event management and experience production agency in Dubai and Abu Dhabi.',
        'telephone': '+971-50-503-5848',
        'email': 'collin@theedgeevents.co',
        'priceRange': '$$$$',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Dubai',
          'addressRegion': 'Dubai',
          'addressCountry': 'AE'
        },
        'areaServed': [
          { '@type': 'City', 'name': 'Dubai' },
          { '@type': 'City', 'name': 'Abu Dhabi' },
          { '@type': 'Country', 'name': 'United Arab Emirates' }
        ],
        'sameAs': [
          'https://www.instagram.com/the.edge.events/',
          'https://www.linkedin.com/company/theedgeevents/home/'
        ]
      },
      {
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
            'name': 'Contact',
            'item': 'https://theedgeevents.com/contact'
          }
        ]
      }
    ]

    const scriptEl = document.createElement('script')
    scriptEl.type = 'application/ld+json'
    scriptEl.id = 'jsonld-contact-page'
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

      const existing = document.getElementById('jsonld-contact-page')
      if (existing) existing.remove()
    }
  }, [])

  return null
}
