import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './WhyChooseUs.css'

const reasons = [
  { number: '01', title: 'Bespoke experiences', description: 'Every event is thoughtfully designed around your goals, story and audience.' },
  { number: '02', title: 'Creative excellence', description: 'We bring fresh ideas, refined aesthetics and innovative concepts to every detail.' },
  { number: '03', title: 'End-to-end support', description: 'From concept to completion, we handle every element so you can focus on what matters most.' },
  { number: '04', title: 'Attention to detail', description: 'We sweat the details, ensuring a seamless and flawless experience from start to finish.' },
  { number: '05', title: 'Trusted by many', description: 'Our clients value our reliability, professionalism and the meaningful experiences we create together.' },
]
const markers = [[570, 157], [608, 318], [625, 493], [617, 672], [586, 838]]
const ease = [0.22, 1, 0.36, 1]

export default function WhyChooseUs() {
  const clipId = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(null)
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease },
  })

  return <section id="why-choose-us" className="why-choose" aria-labelledby="why-heading">
    <svg className="why-architecture" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#eae0d2" opacity=".36" d="M220 0C460 240 477 782 264 1000H310C542 796 497 222 250 0Z" />
      <path fill="#ebe1d4" opacity=".32" d="M0 655C240 757 222 913 352 1000H0ZM860 0C907 163 906 277 1000 381V0Z" />
      <path fill="#064f63" d="M708 1000C815 938 834 974 879 870S956 769 1000 738V1000Z" />
      <path fill="none" stroke="#c5a576" strokeWidth=".65" d="M876 1000Q939 904 1007 862M900 1000Q949 842 949 789" />
      <path fill="none" stroke="#fff" strokeWidth=".8" d="M300 1000Q421 800 601 842M916 1000Q922 745 1000 658" />
    </svg>

    <motion.p className="why-kicker" {...reveal()}>Why choose us <span /></motion.p>
    <h2 id="why-heading" className="why-heading">
      {['More than', 'an event team.', 'A partner who', 'truly cares.'].map((line, i) =>
        <motion.span key={line} className={i > 1 ? 'why-italic' : ''} {...reveal(.08 + i * .09)}>{line}</motion.span>)}
    </h2>
    <motion.p className="why-description" {...reveal(.3)}>We bring together creativity, experience and genuine care to create experiences that feel personal, seamless and unforgettable.</motion.p>

    <div className="why-photograph">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" role="img" aria-label="A grand evening event gathering under the illuminated Ain Dubai">
        <defs><clipPath id={clipId}><path d="M249 0H499C573 132 527 288 570 446C627 662 588 873 500 1000H409V437C409 184 300 95 249 0Z" /></clipPath></defs>
        <image href="/about/why%20choose.png" x="245" y="0" width="365" height="1000" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
        <path d="M308 0C396 115 492 178 552 343" fill="none" stroke="#f5f1ea" strokeWidth="1" />
      </svg>
    </div>

    <motion.div className="why-stats" {...reveal(.4)}>
      <dl>{[['100+', 'Events'], ['50+', 'Clients'], ['∞', 'Memories']].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="why-stat-note">Illustrative figures · pending verification</p>
    </motion.div>
    <motion.a href="#our-approach" className="why-cta" {...reveal(.5)}><span className="why-arrow" aria-hidden="true">→</span><span>Our approach</span><span className="why-cta-rule" aria-hidden="true" /></motion.a>

    <motion.p className="why-image-label" {...reveal(.8)}>People • Experiences • Lasting impact <span /></motion.p>
    <motion.p className="why-editorial" {...reveal(.9)}>Extra<br />ordinary<br />events<br />for<br />extra<br />ordinary<br />people</motion.p>

    <svg className={`why-timeline ${hovered !== null ? 'is-active' : ''}`} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M500 0C658 280 666 754 524 1000" fill="none" stroke="currentColor" strokeWidth=".65" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease }} />
      {markers.map(([cx, cy], i) => <ellipse key={i} cx={cx} cy={cy} rx={hovered === i ? 4.2 : 3} ry={hovered === i ? 8.4 : 6} />)}
    </svg>
    <ol className="why-reasons">
      {reasons.map((reason, i) => <motion.li key={reason.number} className={`why-reason why-reason-${i + 1}`} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} {...reveal(.15 + i * .1)}>
        <span className="why-number" aria-hidden="true">{reason.number}</span>
        <div className="why-reason-copy"><h3>{reason.title}<span aria-hidden="true" /></h3><p>{reason.description}</p></div>
      </motion.li>)}
    </ol>
  </section>
}
