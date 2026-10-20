import { motion } from 'framer-motion'

export default function ProjectCard({
  project,
  index,
  onOpenProject
}) {
  return (
    <motion.article
      layout
      layoutId={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1]
      }}
      className="project-card-editorial col-span-12 md:col-span-6 lg:col-span-6"
    >
      {/* Visual Image Container - Pure, Clean, Uniform */}
      <div
        className="project-card-image-wrap"
        onClick={() => onOpenProject(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpenProject(project)
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        <div className="project-aspect-box landscape-equal">
          <img
            src={project.image}
            alt={project.alt || project.title}
            className="project-card-img"
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
          />
          <div className="project-card-overlay" aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  )
}
