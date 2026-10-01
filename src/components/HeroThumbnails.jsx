import { categories } from '../data/hero'

export function ArrowButton({ direction, onClick }) {
  return <button className="arrow-button grid place-items-center" aria-label={`${direction === 'left' ? 'Previous' : 'Next'} experience`} onClick={onClick}>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.2" /></svg>
  </button>
}

export default function HeroThumbnails({ active, onSelect, onStep }) {
  return <div className="hero-thumbnails flex items-center">
    <div className="thumbnail-list flex" role="group" aria-label="Choose an experience">
      {categories.map((item, index) => <button className={`thumbnail ${active === index ? 'selected' : ''}`} key={item.id} onClick={() => onSelect(index)} aria-label={`Show ${item.lines.join(' ')}`} aria-pressed={active === index}>
        <img src={item.image} alt="" style={{ objectPosition: item.position }} draggable="false" />
      </button>)}
    </div>
    <div className="arrows flex"><ArrowButton direction="left" onClick={() => onStep(-1)} /><ArrowButton direction="right" onClick={() => onStep(1)} /></div>
  </div>
}
