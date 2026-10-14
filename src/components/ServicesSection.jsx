import { useEffect, useRef, useState } from 'react'
import { services } from '../data/services'
import ServicePanel from './ServicePanel'
import ServicesIntro from './ServicesIntro'
import './ServicesSection.css'

function ServiceDetail({ service, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    if (!service) return
    const previous = document.activeElement
    const node = dialog.current
    node.showModal()
    return () => { node.close(); previous?.focus({ preventScroll: true }) }
  }, [service])
  return <dialog ref={dialog} className="service-dialog" aria-labelledby="service-dialog-title" onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose() }}>
    {service && <div className="service-dialog-layout grid">
      <img src={service.image} alt="" style={{ objectPosition: service.position }} />
      <div className="service-dialog-copy">
        <button className="service-dialog-close" onClick={onClose} aria-label="Close service details">×</button>
        <p className="services-eyebrow">Our services / {service.number}</p>
        <h2 id="service-dialog-title">{service.title.join(' ')}</h2>
        <p>{service.description}</p>
        <ul>{service.offerings.map(offering => <li key={offering}>{offering}</li>)}</ul>
        <p className="service-detail-signature">Your vision. Our attention to every detail.</p>
        <button className="service-detail-back" onClick={onClose}>Explore more services <span aria-hidden="true">⟶</span></button>
      </div>
    </div>}
  </dialog>
}

export default function ServicesSection() {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    if (window.location.hash !== '#service-panels') return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) document.getElementById('service-panels')?.scrollIntoView({ behavior: 'instant' })
    })
    return () => { cancelled = true }
  }, [])
  return <>
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <ServicesIntro />
      <div className="services-grid grid" id="service-panels">
        {services.map((service, index) => <ServicePanel key={service.number} service={service} index={index} onSelect={setSelected} />)}
      </div>
    </section>
    <ServiceDetail service={selected} onClose={() => setSelected(null)} />
  </>
}
