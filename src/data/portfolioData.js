/**
 * Curated Portfolio Data for THE EDGE EVENTS
 * Authentic and verified event productions across the UAE and beyond.
 * Categories:
 * - ALL
 * - CORPORATE EVENTS
 * - SOCIAL CELEBRATIONS
 * - TRAVEL & EXPEDITIONS
 * - BRAND ACTIVATIONS
 */

export const filterCategories = [
  { id: 'all', label: 'ALL', count: 12 },
  { id: 'corporate', label: 'CORPORATE EVENTS', categoryKey: 'Corporate Events', count: 4 },
  { id: 'social', label: 'SOCIAL CELEBRATIONS', categoryKey: 'Social Celebrations', count: 3 },
  { id: 'travel', label: 'TRAVEL & EXPEDITIONS', categoryKey: 'Travel & Expeditions', count: 2 },
  { id: 'brand', label: 'BRAND ACTIVATIONS', categoryKey: 'Brand Activations', count: 3 }
]

export const featuredProject = {
  id: 'featured-dp-world',
  slug: 'dp-world-leadership-summit',
  title: 'DP World Executive Leadership Summit',
  category: 'Corporate Events',
  categoryKey: 'corporate',
  location: 'Dubai, UAE',
  year: '2024',
  description: 'An executive gathering uniting international maritime, logistics, and government leaders with precision spatial scenography, synchronized digital stagecraft, and frictionless delegate hospitality.',
  result: '1,000+ Global Delegates',
  scope: 'Keynote Scenography · Technical Rigging · VIP Protocol',
  image: '/home/selected2.jpeg',
  alt: 'Corporate conference stage and audience at an executive summit in Dubai',
  featured: true,
  caseStudyUrl: '/portfolio/dp-world-leadership-summit',
  metrics: [
    { label: 'DELEGATES', value: '1,000+' },
    { label: 'DURATION', value: 'Three-Day Summit' },
    { label: 'LOCATION', value: 'Dubai, UAE' }
  ],
  client: 'DP World',
  venue: 'Madinat Jumeirah Conference Centre, Dubai',
  fullNarrative: 'Tasked with creating an immersive environment that balanced commercial gravitas with executive prestige, The Edge Events engineered a 36-meter seamless curved projection proscenium, bespoke speaker dais, and synchronized acoustic spatial zoning. The delegate journey was curated from private arrival protocol through to interactive breakout amphitheaters.'
}

export const portfolioProjects = [
  {
    id: 0,
    slug: 'dp-world-leadership-summit',
    title: 'DP World Executive Leadership Summit',
    category: 'Corporate Events',
    categoryKey: 'corporate',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'An executive gathering uniting international maritime, logistics, and government leaders with precision spatial scenography, synchronized digital stagecraft, and frictionless delegate hospitality.',
    image: '/home/selected2.jpeg',
    alt: 'Corporate conference stage and audience at an executive summit in Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/dp-world-leadership-summit',
    result: '1,000+ Global Delegates',
    scope: 'Keynote Scenography · Technical Rigging · VIP Protocol',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 1,
    slug: 'global-energy-logistics-forum',
    title: 'Global Energy & Logistics Forum',
    category: 'Corporate Events',
    categoryKey: 'corporate',
    location: 'Abu Dhabi, UAE',
    year: '2024',
    description: 'Bespoke conference architecture featuring multi-tiered panoramic stage LED backdrops and broadcast audiovisual engineering for international delegates.',
    image: '/images/corporate.jpg',
    alt: 'High-level keynote stage with dynamic LED backdrop and delegates in Abu Dhabi',
    featured: false,
    caseStudyUrl: '/portfolio/global-energy-logistics-forum',
    result: 'Three-Day International Conference',
    scope: 'Keynote Production · Spatial Scenography · Broadcast AV',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 2,
    slug: 'royal-mirage-gala-dinner',
    title: 'The Royal Mirage Private Gala',
    category: 'Social Celebrations',
    categoryKey: 'social',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'An ethereal evening of private hospitality with custom crystal candelabras, reflective lacquer banquets, and hand-sculpted floral geometry.',
    image: '/images/social.jpg',
    alt: 'Candlelit luxury dining tables with crystal candelabras and bespoke floral geometry in Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/royal-mirage-gala-dinner',
    result: 'Bespoke Private Banquet',
    scope: 'Bespoke Tableaux · Sensory Lighting · Floral Architecture',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 3,
    slug: 'merex-jump-brand-reveal',
    title: 'Merex Jump Brand Reveal',
    category: 'Brand Activations',
    categoryKey: 'brand',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'High-impact spatial transformation and product unveiling featuring synchronized kinetic lighting structures and dynamic delegate flow.',
    image: '/home/selected5.jpg',
    alt: 'High-energy brand activation with custom architectural installations and lighting in Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/merex-jump-brand-reveal',
    result: 'Experiential Brand Reveal',
    scope: 'Spatial Experience · Reveal Sequence · Kinetic Lighting',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 4,
    slug: 'arabian-dune-retreat-expedition',
    title: 'Arabian Dune Retreat & Expedition',
    category: 'Travel & Expeditions',
    categoryKey: 'travel',
    location: 'Ras Al Khaimah, UAE',
    year: '2024',
    description: 'A curated desert sanctuary combining private nomadic lounges, custom candlelit dining under the stars, and seamless desert logistics.',
    image: '/images/services-desert.jpg',
    alt: 'Luxury desert expedition camp at twilight with ambient Moroccan lanterns and bespoke seating',
    featured: false,
    caseStudyUrl: '/portfolio/arabian-dune-retreat-expedition',
    result: 'Multi-Location Expedition',
    scope: 'Destination Production · Desert Logistics · Curated Itinerary',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 5,
    slug: 'symphony-of-lights-gala-evening',
    title: 'Symphony of Lights Gala Evening',
    category: 'Social Celebrations',
    categoryKey: 'social',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'An architectural evening gala featuring custom curved stage proscenium, warm theatrical lighting, and live international orchestral performances.',
    image: '/home/selected4.jpg',
    alt: 'Live performance stage with theatrical violet and gold illumination for an evening gala',
    featured: false,
    caseStudyUrl: '/portfolio/symphony-of-lights-gala-evening',
    result: 'Live Orchestral Production',
    scope: 'Scenography · Live Production · Sound Design',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 6,
    slug: 'international-trade-maritime-summit',
    title: 'International Trade & Maritime Summit',
    category: 'Corporate Events',
    categoryKey: 'corporate',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'Executive summit hall designed for high-level bilateral trade negotiations, bilateral media stages, and ministerial delegations.',
    image: '/home/selected1.jpeg',
    alt: 'Executive leadership forum stage with precision spotlighting and conference seating in Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/international-trade-maritime-summit',
    result: 'Ministerial Delegation Summit',
    scope: 'Executive Staging · Protocol Management · Media Centre',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 7,
    slug: 'monolith-architecture-brand-launch',
    title: 'Monolith Architecture Brand Reveal',
    category: 'Brand Activations',
    categoryKey: 'brand',
    location: 'Downtown Dubai, UAE',
    year: '2025',
    description: 'Monumental architectural arches framing private automotive and brand reveal under the illuminated Downtown Dubai skyline.',
    image: '/images/brand-launch.jpg',
    alt: 'Monumental architectural arches framing private reveal in Downtown Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/monolith-architecture-brand-launch',
    result: 'Architectural Reveal Installation',
    scope: 'Architectural Staging · Keynote Reveal · Video Mapping',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 8,
    slug: 'nocturne-private-dining-experience',
    title: 'Nocturne Private Dining Experience',
    category: 'Social Celebrations',
    categoryKey: 'social',
    location: 'Abu Dhabi, UAE',
    year: '2024',
    description: 'Intimate multi-course gastronomic salon with tailored tablescaping, custom crystal stemware, and ambient acoustic harmony.',
    image: '/images/why-choose-dinner.png',
    alt: 'Intimate private celebration with bespoke floral arrangements and warm candlelight in Abu Dhabi',
    featured: false,
    caseStudyUrl: '/portfolio/nocturne-private-dining-experience',
    result: 'Exclusive Gastronomic Salon',
    scope: 'Private Dining · Spatial Styling · Michelin Alignment',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 9,
    slug: 'desert-horizon-leadership-retreat',
    title: 'Desert Horizon Leadership Retreat',
    category: 'Travel & Expeditions',
    categoryKey: 'travel',
    location: 'Dubai Conservation Reserve, UAE',
    year: '2024',
    description: 'A secluded desert retreat engineered for board-level strategic alignment, falconry experiences, and private luxury dunes pavilions.',
    image: '/images/desert.jpg',
    alt: 'Curated desert sunset experience with private nomadic lounges and dining under the stars',
    featured: false,
    caseStudyUrl: '/portfolio/desert-horizon-leadership-retreat',
    result: 'Secluded Executive Retreat',
    scope: 'Curated Journey · VIP Hospitality · Environmental Harmony',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 10,
    slug: 'merex-jump-interactive-showcase',
    title: 'Merex Jump Interactive Showcase',
    category: 'Brand Activations',
    categoryKey: 'brand',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'Interactive brand environment with precision lighting cues, experiential digital touchpoints, and synchronized visitor flow design.',
    image: '/home/selected6.jpg',
    alt: 'Interactive brand environment with precision lighting cues and visitor flow design in Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/merex-jump-interactive-showcase',
    result: 'Interactive Visitor Showcase',
    scope: 'Interactive Showcase · Environmental Design · Lighting',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 11,
    slug: 'annual-corporate-laureate-awards',
    title: 'Annual Corporate Laureate Awards',
    category: 'Corporate Events',
    categoryKey: 'corporate',
    location: 'Dubai Opera District, UAE',
    year: '2024',
    description: 'Gala award ceremony celebrating regional enterprise excellence, complete with broadcast audiovisual trusses and theatrical reveal sequences.',
    image: '/images/services-production-warm.jpg',
    alt: 'Live stage production with warm lighting trusses and broadcast audiovisual rigging in Dubai',
    featured: false,
    caseStudyUrl: '/portfolio/annual-corporate-laureate-awards',
    result: 'Prestigious Gala Awards',
    scope: 'Audiovisual Production · Stagecraft · Live Broadcast',
    aspect: 'landscape-equal',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  }
]

export const brandPillars = [
  { label: 'STRATEGY', detail: 'Commercial intent aligned with experiential impact' },
  { label: 'CREATIVITY', detail: 'Bespoke spatial design and architectural storytelling' },
  { label: 'PRODUCTION', detail: 'Flawless broadcast-grade technical execution' },
  { label: 'EXPERIENCE', detail: 'Frictionless delegate journeys and enduring memories' }
]

export const verifiedHighlights = [
  { label: 'GEOGRAPHY', value: 'Dubai · Abu Dhabi · Global' },
  { label: 'PORTFOLIO', value: 'Corporate · Social · Destination' },
  { label: 'DELIVERY', value: 'Turnkey Scenography & Production' },
  { label: 'STANDARDS', value: 'Discretion & Executive Excellence' }
]
