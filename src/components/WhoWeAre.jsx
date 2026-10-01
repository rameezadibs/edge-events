import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HeroDialog from './HeroDialog'
import { ease } from '../data/hero'
import './WhoWeAre.css'

const features = [
  { icon: 'people', lines: ['Corporate, Social', '& Experiential'] },
  { icon: 'strategy', lines: ['Strategy to', 'Execution'] },
  { icon: 'moments', lines: ['Moments People', 'Remember'] },
]

function FeatureIcon({ type }) {
  return <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === 'people' && <><circle cx="20" cy="10" r="4" /><circle cx="8" cy="13" r="3" /><circle cx="32" cy="13" r="3" /><path d="M10 33v-6a10 10 0 0 1 20 0v6H10ZM8 21c-4 0-6 3-6 7v3h5m25-10c4 0 6 3 6 7v3h-5" /></>}
    {type === 'strategy' && <><path d="M29 8a15 15 0 1 0 5 7M25 13a9 9 0 1 0 3 6" /><circle cx="19" cy="22" r="3" /><path d="m19 22 14-15m-4 5 1-7 3 2 4 1-7 4" /></>}
    {type === 'moments' && <><path d="m3 14 8-9h18l8 9-17 21L3 14Zm0 0h34M11 5l9 30L29 5M11 5l9 9 9-9M20 14v21" /></>}
  </svg>
}

function BrandSeal() {
  const id = useId().replaceAll(':', '')
  return <svg className="about-seal" viewBox="0 0 160 160" aria-hidden="true">
    <defs><path id={id} d="M80 20a60 60 0 1 1-.01 0" /></defs>
    <circle cx="80" cy="80" r="42" fill="none" stroke="currentColor" strokeWidth=".35" />
    <text fill="currentColor" fontSize="8" letterSpacing="3.4"><textPath href={`#${id}`} startOffset="3%">PEOPLE CREATE · EXTRAORDINARY MOMENTS ·</textPath></text>
    <path d="M60 80h40" stroke="currentColor" strokeWidth=".8" />
  </svg>
}

export default function WhoWeAre() {
  const [view, setView] = useState(null)
  const reduced = useReducedMotion()
  const reveal = { initial: reduced ? false : { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .9, ease } }
  return <>
    <section id="about" className="who-we-are relative" aria-labelledby="about-heading">
      <div className="about-layout grid">
        <motion.div className="about-photography relative" {...reveal}>
          <div className="about-main-image relative overflow-hidden">
            <img src="/images/about-styling.png" alt="An event stylist carefully arranging a place setting at a candlelit dinner table" loading="lazy" width="1024" height="1536" />
            <div className="about-editorial-rail absolute inset-y-0 left-0 flex flex-col justify-between">
              <div className="about-process flex flex-col">
                {['People', 'Planning', 'Details', 'Extraordinary moments'].map(label => <span key={label}>{label === 'Extraordinary moments' ? <>Extraordinary<br />moments</> : label}</span>)}
              </div>
              <div className="about-experience"><p><span>10+</span>Years</p><div /><span>Creating<br />extraordinary<br />experiences</span></div>
            </div>
          </div>
          <figure className="about-detail">
            <img src="/images/about-detail.png" alt="A finishing touch: aligning a chair beside candlelight, flowers and crystal glassware" loading="lazy" width="1536" height="1024" />
            <figcaption>It’s in<br />the details</figcaption>
          </figure>
        </motion.div>
        <div className="about-content relative">
          <motion.div {...reveal}>
            <p className="about-eyebrow flex items-center">Who we are <span aria-hidden="true" /></p>
            <h2 id="about-heading">We are the team<br className="about-heading-break" /> behind experiences<br className="about-heading-break" /> that feel <em>effortless.</em></h2>
            <p className="about-description">The Edge Events creates corporate events, private celebrations and curated experiences with precision, personality and polish. Every moment is carefully considered — from concept to execution.</p>
          </motion.div>
          <motion.ul className="about-features grid grid-cols-3" {...reveal}>
            {features.map(feature => <li key={feature.icon}><FeatureIcon type={feature.icon} /><p>{feature.lines.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p></li>)}
          </motion.ul>
          <motion.blockquote className="about-quote flex" {...reveal}><span aria-hidden="true" /><p>Built on experience.<br />Driven by emotion.</p></motion.blockquote>
          <motion.div className="about-footer flex items-center justify-between" {...reveal}>
            <button className="about-cta inline-flex items-center justify-between" onClick={() => setView('story')}>Discover our story <svg viewBox="0 0 40 20" width="38" height="20" fill="none" stroke="currentColor" strokeWidth=".9" aria-hidden="true"><path d="M1 10h36m-8-8 8 8-8 8" /></svg></button>
            <BrandSeal />
          </motion.div>
        </div>
      </div>
    </section>
    <HeroDialog view={view} onClose={() => setView(null)} onNavigate={setView} />
  </>
}
