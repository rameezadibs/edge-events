export const categoriesFilter = [
  { id: 'all', label: 'Our Past Work', count: '06' },
  { id: 'corporate', label: 'Corporate', count: '02', categoryKey: 'CORPORATE EVENT' },
  { id: 'social', label: 'Social', count: '02', categoryKey: 'SOCIAL CELEBRATION' },
  { id: 'destination', label: 'Destination', count: '00', categoryKey: 'DESTINATION EXPERIENCE' },
  { id: 'brand', label: 'Brand Reveal', count: '02', categoryKey: 'BRAND EXPERIENCE' },
]

export const projects = [
  {
    id: 'dp-world-1',
    number: '01',
    category: 'CORPORATE EVENT',
    filterId: 'corporate',
    title: 'DP World',
    location: 'Dubai, UAE',
    detail: 'Corporate showcase',
    image: '/home/selected2.jpeg',
    alt: 'DP World corporate event',
    link: '#project-01',
    layoutType: 'landscape-hero',
    caption: 'FIG. 01 — DP WORLD',
    scope: 'Event Production · Scenography',
    year: '2024',
    description: 'A comprehensive corporate event production for DP World featuring bespoke spatial design and engaging delegate experiences.',
    coordinates: '25.2048° N, 55.2708° E',
    stats: [
      { label: 'CLIENT', value: 'DP World' },
      { label: 'FORMAT', value: 'Corporate Showcase' }
    ]
  },
  {
    id: 'dp-world-2',
    number: '02',
    category: 'CORPORATE EVENT',
    filterId: 'corporate',
    title: 'DP World',
    location: 'Dubai, UAE',
    detail: 'Executive Summit',
    image: '/home/selected1.jpeg',
    alt: 'DP World executive summit',
    link: '#project-02',
    layoutType: 'tall-portrait',
    caption: 'FIG. 02 — DP WORLD SUMMIT',
    scope: 'Spatial Scenography · Delegate Experience',
    year: '2024',
    description: 'An executive gathering for DP World, tailored with precision staging and high-end event hospitality.',
    coordinates: '24.4539° N, 54.3773° E',
    stats: [
      { label: 'CLIENT', value: 'DP World' },
      { label: 'FORMAT', value: 'Executive Summit' }
    ]
  },
  {
    id: 'entertainment-1',
    number: '03',
    category: 'SOCIAL CELEBRATION',
    filterId: 'social',
    title: 'Entertainment',
    location: 'UAE',
    detail: 'Live Performance',
    image: '/home/selected3.jpg',
    alt: 'Entertainment live performance',
    link: '#project-03',
    layoutType: 'medium-horizontal',
    caption: 'FIG. 03 — ENTERTAINMENT',
    scope: 'Live Production · Stage Design',
    year: '2024',
    description: 'A spectacular live entertainment event with dynamic lighting, custom stage architecture, and immersive audience engagement.',
    coordinates: '25.1972° N, 55.2744° E',
    stats: [
      { label: 'TYPE', value: 'Live Entertainment' },
      { label: 'EXPERIENCE', value: 'Immersive' }
    ]
  },
  {
    id: 'entertainment-2',
    number: '04',
    category: 'SOCIAL CELEBRATION',
    filterId: 'social',
    title: 'Entertainment',
    location: 'UAE',
    detail: 'Gala Evening',
    image: '/home/selected4.jpg',
    alt: 'Entertainment gala evening',
    link: '#project-04',
    layoutType: 'narrow-vertical',
    caption: 'FIG. 04 — ENTERTAINMENT GALA',
    scope: 'Scenography · Lighting Design',
    year: '2024',
    description: 'An unforgettable evening of entertainment featuring meticulously planned audiovisual integration and spatial flow.',
    coordinates: '25.1972° N, 55.2744° E',
    stats: [
      { label: 'TYPE', value: 'Gala Evening' },
      { label: 'ATMOSPHERE', value: 'Dynamic' }
    ]
  },
  {
    id: 'merex-jump-1',
    number: '05',
    category: 'BRAND EXPERIENCE',
    filterId: 'brand',
    title: 'Merex Jump',
    location: 'Dubai, UAE',
    detail: 'Brand Activation',
    image: '/home/selected5.jpg',
    alt: 'Merex Jump brand activation',
    link: '#project-05',
    layoutType: 'landscape-hero',
    caption: 'FIG. 05 — MEREX JUMP',
    scope: 'Brand Activation · Immersive Environment',
    year: '2024',
    description: 'A high-energy brand experience for Merex Jump, delivering an engaging spatial environment and bold visual presence.',
    coordinates: '25.2048° N, 55.2708° E',
    stats: [
      { label: 'CLIENT', value: 'Merex' },
      { label: 'FORMAT', value: 'Brand Activation' }
    ]
  },
  {
    id: 'merex-jump-2',
    number: '06',
    category: 'BRAND EXPERIENCE',
    filterId: 'brand',
    title: 'Merex Jump',
    location: 'Dubai, UAE',
    detail: 'Interactive Showcase',
    image: '/home/selected6.jpg',
    alt: 'Merex Jump interactive showcase',
    link: '#project-06',
    layoutType: 'tall-portrait',
    caption: 'FIG. 06 — MEREX JUMP SHOWCASE',
    scope: 'Precision Spotlighting · Unveiling Sequence',
    year: '2024',
    description: 'A dynamic showcase environment constructed for Merex Jump with interactive installations and striking stage design.',
    coordinates: '25.2048° N, 55.2708° E',
    stats: [
      { label: 'CLIENT', value: 'Merex' },
      { label: 'FORMAT', value: 'Interactive Showcase' }
    ]
  }
]
