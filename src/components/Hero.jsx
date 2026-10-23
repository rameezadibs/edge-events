import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { categories, ease } from '../data/hero'
import HeroPanel from './HeroPanel'
import HeroNavigation from './HeroNavigation'
import HeroThumbnails from './HeroThumbnails'
import HeroDialog from './HeroDialog'

export default function Hero() {
  const [active, setActive] = useState(0)
  const [scene, setScene] = useState(0)
  const [view, setView] = useState(null)
  const start = useRef(null)
  const reduced = useReducedMotion()
  const step = direction => setActive(current => (current + direction + categories.length) % categories.length)
  const fadeIn = delay => ({ initial: reduced ? false : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: reduced ? 0 : delay, ease } })

  const navigate = destination => {
    if (destination === 'About') { window.location.assign('/about'); return }
    if (destination === 'Services') { window.location.assign('/services'); return }
    const targetMap = {
      'Home': 'home',
      'About': 'about',
      'Services': 'services',
      'Portfolio': 'our-work',
      'Clients': 'client-logos',
      'Blogs': 'latest-moments',
      'Contact': 'latest-moments'
    }
    if (targetMap[destination]) {
      setView(null)
      document.getElementById(targetMap[destination])?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
    } else {
      setView(destination)
    }
  }

  return <>
    <HeroNavigation onNavigate={navigate} onMenu={() => setView('menu')} menuOpen={view === 'menu'} />
    <section id="home" className="hero relative isolate overflow-hidden text-white" aria-label="The Edge Events — four extraordinary experiences"
      onTouchStart={event => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }}
      onTouchEnd={event => { if (!start.current || event.target.closest('button, a')) return; const dx = event.changedTouches[0].clientX - start.current.x; const dy = event.changedTouches[0].clientY - start.current.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1); start.current = null }}>
      <div className="desktop-panels absolute inset-0" aria-hidden="true">
        {categories.map((category, index) => <HeroPanel key={category.id} category={category} index={index} active={index === active} scene={scene} />)}
      </div>
      <div className="mobile-panels absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}><motion.img key={active} className="absolute inset-0 h-full w-full object-cover" src={categories[active].image} alt="" style={{ objectPosition: categories[active].position }} initial={{ opacity: 0, scale: reduced ? 1 : 1.045 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.9, ease }} /></AnimatePresence>
      </div>
      <div className="hero-shade absolute inset-0 pointer-events-none" />
      <div className="category-labels">
        {categories.map((category, index) => <motion.button {...fadeIn(0.8 + index * 0.1)} className={`category-label category-${index} ${active === index ? 'current' : ''}`} key={category.id} onClick={() => setActive(index)} aria-label={`View ${category.lines.join(' ')}`} aria-pressed={active === index}>
          <span className="category-name">{category.lines.map(line => <span key={line}>{line}</span>)}</span><span className="category-number">0{index + 1}</span>
        </motion.button>)}
      </div>
      <div className="mobile-category" aria-live="polite"><span>0{active + 1} / 04</span><span>{categories[active].lines.join(' ')}</span></div>
      <div className="hero-heading pointer-events-none">
        <h1 aria-label="Engage. Elevate. Celebrate.">{['Engage.', 'Elevate.', 'Celebrate.'].map((word, i) => <span className="headline-line" key={word}><motion.span {...fadeIn(0.65 + i * 0.13)} className={i === 1 ? 'text-edge' : ''}>{word}</motion.span></span>)}</h1>
        <motion.p {...fadeIn(1.2)} className="hero-tagline">Events with an edge.</motion.p>
      </div>
      <motion.p {...fadeIn(1.45)} className="editorial-statement">Real<br />people.<br />Extraordinary<br />moments.</motion.p>
      <motion.div {...fadeIn(1.6)} className="story-strip flex items-center justify-center">
        <p className="hero-description text-center">From corporate milestones to private celebrations and unforgettable experiences</p>
      </motion.div>
      <motion.div {...fadeIn(1.75)} className="bottom-index"><div className="index-track"><motion.span animate={{ x: `${scene * 100}%` }} transition={{ duration: 0.7, ease }} /></div><div className="index-numbers flex justify-between">{[0, 1, 2].map(index => <button aria-label={`Photography framing ${index + 1}`} aria-pressed={scene === index} className={scene === index ? 'active' : ''} key={index} onClick={() => setScene(index)}>0{index + 1}</button>)}</div></motion.div>
      <motion.div {...fadeIn(1.75)} className="thumbnail-position"><HeroThumbnails active={active} onSelect={setActive} onStep={step} /></motion.div>
      <motion.div {...fadeIn(1.75)} className="scroll-indicator" aria-hidden="true"><span>Scroll</span><i /><div /></motion.div>
      <span className="sr-only" role="status">Selected experience: {categories[active].lines.join(' ')}</span>
    </section>
    <HeroDialog view={view} onClose={() => setView(null)} onNavigate={navigate} />
  </>
}
