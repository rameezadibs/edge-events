import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'

export default function HeroPanel({ category, index, active, scene }) {
  const reduced = useReducedMotion()
  return (
    <div className={`hero-panel panel-${index} ${active ? 'is-active' : ''}`}>
      <motion.div className="panel-reveal"
      initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.4, delay: index * 0.14, ease }}>
      <div className="panel-hover"><motion.img src={category.image} alt={category.alt} fetchPriority={index === 0 ? 'high' : 'auto'}
        draggable="false" className="panel-image" style={{ objectPosition: category.position }}
        animate={{ scale: reduced ? 1 : (active ? 1.035 : 1), x: reduced ? 0 : [0, -9, 9][scene] }}
        transition={{ duration: 1.5, ease }} /></div>
      <div className="panel-shade" />
      </motion.div>
    </div>
  )
}
