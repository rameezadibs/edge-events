import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './ServicesPage.css'
import ThreeServices from './ThreeServices'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import Footer from './Footer'

const ease = [.22, 1, .36, 1]

function Architecture({ reduced }) {
  return <motion.svg className="intention-art" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" initial={reduced ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.7, delay: .3, ease }}>
    <defs>
      <linearGradient id="stone" x1="0" x2="1"><stop stopColor="#e5dacc"/><stop offset=".48" stopColor="#f8f3e9"/><stop offset="1" stopColor="#c8bbaa"/></linearGradient>
      <linearGradient id="cream" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fbf7ee"/><stop offset=".55" stopColor="#eee5d8"/><stop offset="1" stopColor="#d5c8b6"/></linearGradient>
      <linearGradient id="coal"><stop stopColor="#161b1c"/><stop offset=".5" stopColor="#343737"/><stop offset="1" stopColor="#171b1c"/></linearGradient>
      <filter id="material"><feTurbulence type="fractalNoise" baseFrequency=".38" numOctaves="3" seed="12" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
    </defs>
    <g stroke="#b8a087" strokeWidth=".9">
      <path fill="url(#stone)" d="M50 1000V465C50 342 129 257 244 242V0H455V1000Z"/>
      <path fill="url(#coal)" d="M368 0H456V206C681 290 835 391 843 669V1000H368Z"/>
      <path fill="url(#cream)" d="M150-80H444V82C700 89 835 233 835 468V711C828 438 719 320 481 232C327 176 230 68 150-80Z"/>
      <path fill="url(#stone)" d="M297-40H368V1000H244V242L297 221Z"/>
    </g>
    <motion.g animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
      <path fill="url(#cream)" stroke="#b8a087" strokeWidth="1" d="M835 1000V750C835 555 670 429 475 429C311 429 225 531 225 634C225 733 302 789 442 835C569 877 661 919 723 1000H835ZM723 1000C706 798 585 650 368 609V801C548 860 646 907 723 1000Z" fillRule="evenodd"/>
      <path fill="url(#stone)" stroke="#b8a087" strokeWidth="1" d="M368 609C575 655 714 791 723 1000H680C609 904 517 866 368 819Z"/>
    </motion.g>
    <g opacity=".16" filter="url(#material)"><path fill="#cbbba7" d="M50 1000V465C50 342 129 257 244 242V1000Z"/><path fill="#d9cbb8" d="M368 609C575 655 714 791 723 1000H680C609 904 517 866 368 819Z"/><path fill="#7e817b" d="M368 0H455V203L368 164Z"/></g>
    <motion.g fill="none" stroke="#b79c7b" strokeWidth=".8" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1.5 }}>
      <motion.path d="M48 0V1000M298 0V1000M646-60Q709 164 883 163H1020M365 925H1030M0 638C320 573 873 658 881 1000" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: .8, ease }}/>
    </motion.g>
    <circle cx="48" cy="158" r="7" fill="#006b8c"/>
  </motion.svg>
}

export default function ServicesPage() {
  const reduced = useReducedMotion()
  const [view, setView] = useState(null)

  useEffect(() => {
    const previous = document.title
    document.title = 'Our Services — The Edge Events'
    return () => { document.title = previous }
  }, [])

  const reveal = delay => ({ initial: reduced ? false : { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, delay: reduced ? 0 : delay, ease } })

  return <div className="services-directory-wrapper">
    <HeroNavigation activeItem="Services" onNavigate={setView} />
    <main className="services-page" style={{ paddingTop: '80px' }}>
      <section className="intention-hero" aria-labelledby="intention-heading">
        <svg className="intention-bottom" viewBox="0 0 900 330" preserveAspectRatio="none" aria-hidden="true"><path fill="#e7ddcf" opacity=".48" d="M0 30C185 72 197 242 430 330H0Z"/><path fill="#ebe2d5" opacity=".55" d="M0 330C259 30 420 27 570 168S750 307 900 330Z"/><path fill="none" stroke="#bb9d7a" strokeWidth=".8" d="M440 330C413 123 548-67 870 0"/></svg>
        <div className="intention-copy relative">
          <motion.p className="intention-eyebrow flex items-center" {...reveal(0)}>Our services <span aria-hidden="true"/></motion.p>
          <h1 id="intention-heading">{['Experiences,', 'designed with', 'intention.'].map((line, i) => <motion.span key={line} {...reveal(.12 + i * .14)}>{i === 2 ? <em>{line}</em> : line}</motion.span>)}</h1>
          <motion.p className="intention-description" {...reveal(.6)}>We create thoughtful environments and experiences shaped by creativity, clarity and detail — crafted to feel seamless, elevated and memorable.</motion.p>
          <motion.a className="intention-explore flex items-center" href="#three-services" {...reveal(.75)}><span className="intention-arrow" aria-hidden="true"><svg viewBox="0 0 32 24" fill="none"><path d="M3 12h25m-7-7 7 7-7 7"/></svg></span><span>Explore what we do</span><span className="intention-cta-rule" aria-hidden="true"/></motion.a>
        </div>
        <Architecture reduced={reduced}/>
        <motion.div className="intention-signature" aria-hidden="true" {...reveal(1.2)}><i/>{['Ideas', 'People', 'Places', 'Experiences'].map(word => <span key={word}>{word}</span>)}<i/></motion.div>
      </section>
      <ThreeServices />
    </main>
    <Footer />
    <HeroDialog view={view} onClose={() => setView(null)} onNavigate={setView} />
  </div>
}

