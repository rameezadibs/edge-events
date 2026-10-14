import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './ThreeServices.css'

const services = [
  { number: '01', title: 'Corporate Events', path: '/services/corporate-events', crop: '66 326 487 325', alt: 'An elegant conference stage with warm lighting and carefully arranged banquet seating', description: 'Strategic, polished and professionally delivered experiences for brands, teams and organisations.', offerings: ['Conferences', 'Product launches', 'Gala dinners'] },
  { number: '02', title: 'Social Celebrations', path: '/services/social-celebrations', crop: '602 326 468 325', alt: 'A candlelit celebration table with white flowers and refined place settings', description: 'Beautifully considered celebrations designed around people, emotion and unforgettable moments.', offerings: ['Weddings', 'Milestone celebrations', 'Bespoke private events'] },
  { number: '03', title: 'Travel & Expeditions', path: '/services/travel-expeditions', crop: '1119 326 491 325', alt: 'A lantern-lit desert lounge overlooking sandstone mountains at sunset', description: 'Curated journeys and destination-led experiences crafted with comfort, discovery and atmosphere in mind.', offerings: ['Curated travel', 'Destination events', 'Unique UAE experiences'] },
]

function ServiceImage({ service }) {
  return <svg viewBox={service.crop} preserveAspectRatio="xMidYMid slice" role="img" aria-label={service.alt} className="three-service-photo"><image href="/images/three-services-reference.png" width="1672" height="941" /></svg>
}

export default function ThreeServices() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  useEffect(() => {
    if (!selected) return
    const previous = document.activeElement
    const node = dialog.current
    const previousOverflow = document.body.style.overflow
    node.showModal()
    document.body.style.overflow = 'hidden'
    return () => { node.close(); document.body.style.overflow = previousOverflow; previous?.focus({ preventScroll: true }) }
  }, [selected])
  const reveal = delay => ({ initial: reduced ? false : { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .85, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] } })
  return <section className="three-services" id="three-services" aria-labelledby="three-services-heading">
    <header className="three-services-intro">
      <motion.p className="three-services-eyebrow" {...reveal(0)}>Our services <span aria-hidden="true" /></motion.p>
      <motion.h2 id="three-services-heading" {...reveal(.08)}>Three distinct ways<br />we <em>create experiences.</em></motion.h2>
      <motion.p className="three-services-summary" {...reveal(.16)}>From corporate gatherings to meaningful celebrations and curated journeys, we design<br className="three-services-break" /> experiences that feel thoughtful, seamless and memorable.</motion.p>
    </header>
    <div className="three-services-grid">
      {services.map((service, index) => <motion.article className="three-service" key={service.number} {...reveal(index * .12)}>
        <a href={service.path} className="three-service-image-link" aria-label={`View ${service.title} landing page`}>
          <div className="three-service-image"><ServiceImage service={service} /></div>
        </a>
        <p className="three-service-number">{service.number}<span aria-hidden="true" /></p>
        <h3><a href={service.path} style={{ color: 'inherit', textDecoration: 'none' }}>{service.title}</a></h3>
        <p className="three-service-description">{service.description}</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a className="three-service-discover" href={service.path} aria-label={`View dedicated ${service.title} page`}>Explore service <span aria-hidden="true">→</span></a>
          <button className="three-service-discover" style={{ opacity: 0.7 }} onClick={() => setSelected(service)} aria-label={`Discover more about ${service.title}`} aria-haspopup="dialog">Quick view</button>
        </div>
      </motion.article>)}
    </div>
    <dialog ref={dialog} className="three-service-dialog" aria-labelledby="three-service-dialog-title" onCancel={() => setSelected(null)} onClick={event => { if (event.target === dialog.current) setSelected(null) }}>
      {selected && <div className="three-service-dialog-content">
        <button className="three-service-close" onClick={() => setSelected(null)} aria-label="Close service details" autoFocus>×</button>
        <p className="three-services-eyebrow">Our services / {selected.number}</p>
        <h2 id="three-service-dialog-title">{selected.title}</h2>
        <p>{selected.description}</p>
        <ul>{selected.offerings.map(offering => <li key={offering}>{offering}</li>)}</ul>
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          <a className="three-service-discover" href={selected.path}>Visit {selected.title} page <span aria-hidden="true">→</span></a>
          <button className="three-service-discover" onClick={() => setSelected(null)}>Close</button>
        </div>
      </div>}
    </dialog>
  </section>
}
