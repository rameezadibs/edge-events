export const categoriesFilter = [
  { id: 'all', label: 'All Commissions', count: '04' },
  { id: 'corporate', label: 'Corporate', count: '01', categoryKey: 'CORPORATE EVENT' },
  { id: 'social', label: 'Social', count: '01', categoryKey: 'SOCIAL CELEBRATION' },
  { id: 'destination', label: 'Destination', count: '01', categoryKey: 'DESTINATION EXPERIENCE' },
  { id: 'brand', label: 'Brand Reveal', count: '01', categoryKey: 'BRAND EXPERIENCE' },
]

export const projects = [
  {
    id: 'summit',
    number: '01',
    category: 'CORPORATE EVENT',
    filterId: 'corporate',
    title: 'Global Leadership Summit',
    location: 'Dubai, UAE',
    detail: '1,000+ guests',
    image: '/images/corporate.jpg',
    alt: 'Tiered executive keynote auditorium lit in ambient midnight indigo and architectural chandeliers',
    link: '#project-01',
    layoutType: 'landscape-hero',
    caption: 'FIG. 01 — THE GRAND PLENARY · DUBAI',
    scope: 'Spatial Scenography · Keynote Immersion · Delegate Experience',
    year: '2024',
    description: 'An international assembly uniting global industry leaders across three days of visionary keynotes, dynamic LED stage architecture, and synchronized ambient lighting design.',
    coordinates: '25.1972° N, 55.2744° E',
    stats: [
      { label: 'ATTENDEES', value: '1,200+' },
      { label: 'DELEGATIONS', value: '42 Nations' },
      { label: 'AV COVERAGE', value: '360° LED' }
    ]
  },
  {
    id: 'celebration',
    number: '02',
    category: 'SOCIAL CELEBRATION',
    filterId: 'social',
    title: 'Private Celebration',
    location: 'Abu Dhabi, UAE',
    detail: 'Bespoke evening gala',
    image: '/images/social.jpg',
    alt: 'Crystal candelabras and bespoke place settings reflected along an intimate high-gloss dining table',
    link: '#project-02',
    layoutType: 'tall-portrait',
    caption: 'FIG. 02 — THE BANQUET TABLEAU · ABU DHABI',
    scope: 'Candelabra Scenography · Bespoke Florals · Private Curation',
    year: '2024',
    description: 'An intimate private gathering defined by dramatic candelabra illumination, handcrafted floral arrangements, crystal glassware, and custom-tailored sensory hospitality.',
    coordinates: '24.4539° N, 54.3773° E',
    stats: [
      { label: 'GUESTS', value: '180 Private' },
      { label: 'SETTING', value: 'Imperial Ballroom' },
      { label: 'TABLEAU', value: 'Reflective Candelabra' }
    ]
  },
  {
    id: 'desert',
    number: '03',
    category: 'DESTINATION EXPERIENCE',
    filterId: 'destination',
    title: 'Desert Experience',
    location: 'UAE',
    detail: 'Sunset dunes pavilion',
    image: '/images/services-desert.jpg',
    alt: 'Private desert dinner arranged with brass lanterns and embroidered cushions nestled into Arabian sand dunes',
    link: '#project-03',
    layoutType: 'medium-horizontal',
    caption: 'FIG. 03 — DUNE SALON · AL MARMOOM',
    scope: 'Off-Grid Architecture · Lantern Corridors · Heritage Gastronomy',
    year: '2025',
    description: 'An exclusive desert immersion crafted amid undulating crimson dunes, featuring low majlis lounging, artisanal brass lantern lighting, and an unforgettable fireside banquet.',
    coordinates: '24.8333° N, 55.3333° E',
    stats: [
      { label: 'VENUE', value: 'Untouched Desert' },
      { label: 'ATMOSPHERE', value: 'Candle & Starlight' },
      { label: 'EXPERIENCE', value: 'Bespoke Majlis' }
    ]
  },
  {
    id: 'brand',
    number: '04',
    category: 'BRAND EXPERIENCE',
    filterId: 'brand',
    title: 'Luxury Product Launch',
    location: 'Dubai, UAE',
    detail: 'Architectural reveal',
    image: '/images/brand-launch.jpg',
    alt: 'Monumental architectural stone arches framing a backlit product pedestal against the Burj Khalifa skyline',
    link: '#project-04',
    layoutType: 'narrow-vertical',
    caption: 'FIG. 04 — MONOLITHIC PAVILION · DOWNTOWN',
    scope: 'Monolith Architecture · Precision Spotlighting · Unveiling Sequence',
    year: '2025',
    description: 'A museum-grade reveal environment constructed with sculptural stone arches and precision spotlighting, framed against panoramic twilight views of Downtown Dubai.',
    coordinates: '25.2048° N, 55.2708° E',
    stats: [
      { label: 'SCENOGRAPHY', value: 'Sculptural Stone' },
      { label: 'SKYLINE VIEW', value: 'Downtown Dubai' },
      { label: 'FORMAT', value: 'Private Unveiling' }
    ]
  }
]
