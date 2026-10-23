import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({
  projects,
  onOpenProject,
  activeFilter
}) {
  return (
    <section
      className="portfolio-grid-section"
      aria-labelledby="portfolio-grid-heading"
      id="portfolio-project-grid"
    >
      <div className="portfolio-container">
        <div className="section-header-row">
          <h2 id="portfolio-grid-heading" className="portfolio-section-title">
            Selected Works
          </h2>
          <span className="portfolio-count-tag" aria-live="polite">
            {projects.length} {projects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </span>
        </div>

        <motion.div
          layout
          className="editorial-project-grid grid grid-cols-12 gap-x-8 gap-y-8 lg:gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenProject={onOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length === 0 && (
          <div className="portfolio-empty-state">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
