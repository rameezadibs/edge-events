import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'

export function ServiceArrow({ className = '' }) {
  return <span className={`service-arrow grid place-items-center ${className}`} aria-hidden="true"><svg width="25" height="25" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 14h20m-8-8 8 8-8 8" /></svg></span>
}

export default function ServicePanel({ service, index, onSelect }) {
  const reduced = useReducedMotion()
  return <motion.article className="service-panel relative overflow-hidden" id={service.id}
    initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .12 }} transition={{ duration: .85, delay: reduced ? 0 : index * .1, ease }}>
    <img className="service-panel-image absolute inset-0 h-full w-full object-cover" src={service.image} alt={service.alt} style={{ objectPosition: service.position }} loading="lazy" />
    <div className="service-panel-shade absolute inset-0" />
    <a className="service-panel-link relative flex h-full flex-col" href={service.link} onClick={event => { event.preventDefault(); onSelect(service) }} aria-label={`Explore ${service.title.join(' ')}`} aria-haspopup="dialog">
      <div className="service-number flex items-center"><span>{service.number}</span><i aria-hidden="true" /></div>
      <h3>{service.title.map(line => <span key={line}>{line}</span>)}</h3>
      <p>{service.description}</p>
      <ServiceArrow />
    </a>
  </motion.article>
}
