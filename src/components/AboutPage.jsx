import { useEffect, useState } from 'react'
import HeroNavigation from './HeroNavigation'
import HeroDialog from './HeroDialog'
import MissionVision from './MissionVision'
import OurApproach from './OurApproach'
import WhyChooseUs from './WhyChooseUs'
import Footer from './Footer'
import './AboutPage.css'

export default function AboutPage() {
  const [view, setView] = useState(null)
  useEffect(() => {
    const previous = document.title
    document.title = 'About Us — The Edge Events'
    return () => { document.title = previous }
  }, [])
  return <div className="about-page">
    <HeroNavigation activeItem="About" onNavigate={setView} />
    <main>
      <section className="impact-hero" aria-labelledby="impact-heading">
        <img className="impact-photo" src="/about/hero.jpg" alt="Host addressing an enthusiastic crowd at an open-air event" width="3600" height="2400" fetchPriority="high" />
        <svg className="impact-curve" viewBox="0 0 1983 793" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="impact-ivory" x2="1" y2="1"><stop stopColor="#f6f3ee" /><stop offset="1" stopColor="#eee8df" /></linearGradient></defs>
          <path fill="url(#impact-ivory)" d="M0 0H635C599 81 578 166 587 258C597 422 660 549 805 654C688 661 580 715 506 793H0Z" />
          <path fill="#ddd3c6" opacity=".42" d="M534 0H635L603 96Q562 52 534 0Z" />
          <path fill="#fff" opacity=".18" d="M0 440Q240 548 590 420Q652 567 805 654Q621 679 506 793H0Z" />
        </svg>
        <div className="impact-rule" aria-hidden="true" />
        <div className="impact-copy">
          <p className="impact-kicker">About us <span aria-hidden="true" /></p>
          <h1 id="impact-heading"><span>More than</span><span>events,</span><em><span>lasting</span><span>impact.</span></em></h1>
          <p className="impact-intro">We are The Edge Events — a team of creators, planners and experience makers, driven by a simple belief: every moment has the power to bring people closer, inspire change and create a lasting impact.</p>
          <a className="impact-story" href="#our-story"><span className="impact-circle" aria-hidden="true"><svg viewBox="0 0 32 24" fill="none"><path d="M3 12h25m-7-7 7 7-7 7" /></svg></span><span>Our story</span><span className="impact-story-rule" aria-hidden="true" /></a>
        </div>
        <ul className="impact-values" aria-label="What brings us together">{['People', 'Ideas', 'Places', 'Experiences'].map(value => <li key={value}>{value}</li>)}</ul>
      </section>
      <div id="our-story"><MissionVision onNavigate={setView} /></div>
      <OurApproach onNavigate={setView} />
      <WhyChooseUs />
    </main>
    <Footer />
    <HeroDialog view={view} onClose={() => setView(null)} onNavigate={setView} />
  </div>
}
