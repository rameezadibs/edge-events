import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { ServiceArrow } from './ServicePanel'

export default function ServicesIntro() {
  const reduced = useReducedMotion()
  const reveal = delay => ({ initial: reduced ? false : { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .9, delay: reduced ? 0 : delay, ease } })
  return <div className="services-intro relative">
    <motion.div className="services-feature-image" initial={reduced ? false : { clipPath: 'inset(0 0 0 100%)' }} whileInView={{ clipPath: 'inset(0 0 0 0%)' }} viewport={{ once: true, amount: .1 }} transition={{ duration: 1.3, ease }}>
      <img src="/images/services-dubai.jpg" alt="An elegant evening terrace with candlelit tables overlooking the Burj Khalifa in Dubai" loading="lazy" width="1236" height="780" />
    </motion.div>
    <div className="services-intro-shade" />
    <div className="services-intro-copy relative">
      <motion.p className="services-eyebrow flex items-center" {...reveal(0)}>Our services <span aria-hidden="true" /></motion.p>
      <h2 id="services-heading">{['Experiences', 'designed', 'around you.'].map((line, i) => <span className="services-heading-line" key={line}><motion.span {...reveal(.08 + i * .12)}>{i === 2 ? <em>{line}</em> : line}</motion.span></span>)}</h2>
      <motion.p className="services-summary" {...reveal(.4)}>From corporate milestones to private<br className="services-copy-break" /> celebrations and exclusive destinations —<br className="services-copy-break" /> we create experiences that reflect your vision,<br className="services-copy-break" /> your people and your purpose.</motion.p>
    </div>
    <motion.aside className="services-brand" {...reveal(.5)}>
      <p>Strategy<br />Concept<br />Design<br />Execution</p>
      <a href="#service-panels" className="services-view-all flex items-center" onClick={event => { event.preventDefault(); document.getElementById('service-panels')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }) }}><ServiceArrow /><span>View all<br />services</span></a>
    </motion.aside>
  </div>
}
