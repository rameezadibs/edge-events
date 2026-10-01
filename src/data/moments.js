/**
 * The Edge Events — Latest Moments & Instagram Feed Data
 * Structured to integrate seamlessly with the Instagram Basic Display / Graph API.
 * Uses manually curated approved fallback moments if live API fetch is unconfigured.
 */

export const instagramProfile = {
  handle: '@theedgeevents',
  username: 'theedgeevents',
  profileUrl: 'https://www.instagram.com/theedgeevents/',
  followerHighlight: 'CURATED MOMENTS & ARCHIVAL PRODUCTIONS',
  tagline: 'FOLLOW THE MOMENTS.'
}

export const fallbackMoments = [
  {
    id: 'post-reel-01',
    mediaType: 'VIDEO', // Instagram REEL
    editorialNumber: '01',
    editorialLabel: 'THE EXPERIENCE',
    aspectRatio: 'portrait-reel',
    caption: 'Monoliths in twilight: spatial architecture and private reveal moments under the Downtown skyline.',
    publishedDate: '2025-02-18',
    duration: '00:42',
    mediaUrl: '/images/brand-launch.jpg',
    thumbnailUrl: '/images/brand-launch.jpg',
    permalink: 'https://www.instagram.com/theedgeevents/',
    alt: 'Cinematic preview of monumental architectural arches framing private reveal in Downtown Dubai',
    scope: 'Spatial Staging · Keynote Reveal',
    location: 'Downtown Dubai',
    isVideo: true,
  },
  {
    id: 'post-photo-02',
    mediaType: 'IMAGE',
    editorialNumber: '02',
    editorialLabel: 'THE DETAILS',
    aspectRatio: 'landscape-editorial',
    caption: 'Reflections of candlelit crystalware and handcrafted floral geometry along forty meters of bespoke table styling.',
    publishedDate: '2025-02-12',
    duration: null,
    mediaUrl: '/images/social.jpg',
    thumbnailUrl: '/images/social.jpg',
    permalink: 'https://www.instagram.com/theedgeevents/',
    alt: 'Reflective lacquer banquet table with crystal candelabras and flickering candlelight',
    scope: 'Bespoke Tableaux · Sensory Scenography',
    location: 'Abu Dhabi, UAE',
    isVideo: false,
  },
  {
    id: 'post-bts-03',
    mediaType: 'IMAGE',
    editorialNumber: '03',
    editorialLabel: 'THE PRODUCTION',
    aspectRatio: 'bts-square-portrait',
    caption: 'T-minus three hours: technical rigging, synchronized cove acoustics and the quiet focus before guests arrive.',
    publishedDate: '2025-02-04',
    duration: null,
    mediaUrl: '/images/services-production-warm.jpg',
    thumbnailUrl: '/images/services-production-warm.jpg',
    permalink: 'https://www.instagram.com/theedgeevents/',
    alt: 'Behind the scenes stage production crew testing warm lighting and architectural rigging before showtime',
    scope: 'Technical Rigging · Production Coordination',
    location: 'Dubai Opera District',
    isVideo: false,
  }
]
