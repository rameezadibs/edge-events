import { useEffect, useRef } from 'react'
import { navItems, siteConfig } from '../data/hero'

export default function HeroDialog({ view, onClose, onNavigate }) {
  const dialog = useRef(null)
  useEffect(() => {
    const node = dialog.current
    if (!view) return
    const previous = document.activeElement
    node.showModal()
    return () => { node.close(); previous?.focus() }
  }, [view])
  return <dialog ref={dialog} className="hero-dialog" onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose() }}>
    <div className="dialog-inner">
      <button className="dialog-close arrow-button" aria-label="Close dialog" onClick={onClose}>×</button>
      {view === 'menu' ? <nav aria-label="Expanded navigation" className="expanded-nav">{navItems.map((item, i) => <button key={item} onClick={() => item === 'Home' ? onClose() : onNavigate(item)}><span>0{i + 1}</span>{item}<span>↗</span></button>)}</nav>
        : view === 'story' ? <><p className="eyebrow">Behind the moments</p><h2>Our story.</h2>{siteConfig.storyUrl ? <video src={siteConfig.storyUrl} controls autoPlay playsInline aria-label="The Edge Events brand film" /> : <><p>From corporate milestones to private celebrations and unforgettable experiences — we create moments that matter.</p><p className="availability-note">Our brand film is coming soon.</p></>}</>
        : <><p className="eyebrow">Events with an edge.</p><h2>{view === 'Plan an event' || view === 'Contact' || view === 'Collaborate' ? 'Let’s make it extraordinary.' : `${view}.`}</h2><p>{view === 'Plan an event' || view === 'Contact' || view === 'Collaborate' ? 'Corporate milestones. Private celebrations. Unforgettable experiences. Your next moment starts here.' : 'A new chapter is taking shape. This part of The Edge Events experience is coming soon.'}</p><p className="availability-note">{view === 'Plan an event' || view === 'Contact' || view === 'Collaborate' ? 'Event enquiries will open with the full website launch.' : 'Explore our experiences on the homepage.'}</p><button className="plan-button dialog-back" onClick={onClose}>Back to the experience <span>⟶</span></button></>}
    </div>
  </dialog>
}
