import { motion, useReducedMotion } from 'framer-motion'
import './ThreeServices.css'

const ease = [0.22, 1, 0.36, 1]

const services = [
  {
    number: '01',
    titleLines: ['Team Building &', 'Employee Engagement'],
    title: 'Team Building & Employee Engagement',
    image: '/portfolio/DSC01172.JPG',
    alt: 'Corporate team members participating in an energetic outdoor tug-of-war team-building activity in Dubai',
    description:
      'Purposeful team experiences designed to strengthen connection, collaboration, morale and employee engagement.',
  },
  {
    number: '02',
    titleLines: ['Family Days &', 'Corporate Celebrations'],
    title: 'Family Days & Corporate Celebrations',
    image: '/portfolio/JB Bros-001.jpg',
    alt: 'Employees and families gathered on a sunlit lawn in front of Ain Dubai for a corporate family day celebration',
    description:
      'Thoughtfully produced company celebrations and family experiences designed to bring teams, families and communities together.',
  },
  {
    number: '03',
    titleLines: ['Travel &', 'Expeditions'],
    title: 'Travel & Expeditions',
    image: '/images/desert.jpg',
    alt: 'Travelers walking across golden desert dunes at sunset during a curated UAE expedition',
    description:
      'Curated journeys and destination experiences crafted with comfort, discovery and atmosphere in mind.',
  },
  {
    number: '04',
    titleLines: ['Corporate Conferences &', 'Leadership Summits'],
    title: 'Corporate Conferences & Leadership Summits',
    image: '/images/corporate.jpg',
    alt: 'Corporate delegates seated in a grand conference ballroom facing a wide keynote stage in Dubai',
    description:
      'Strategic conferences, executive forums and leadership gatherings delivered with clarity, precision and seamless production.',
  },
  {
    number: '05',
    titleLines: ['Government, Protocol &', 'VIP Events'],
    title: 'Government, Protocol & VIP Events',
    image: '/home/selected1.jpeg',
    alt: 'Formal UAE protocol and VIP hospitality gathering in a lantern-lit architectural hall',
    description:
      'Discreet, meticulously coordinated experiences shaped around protocol, senior stakeholders and distinguished guests.',
  },
  {
    number: '06',
    titleLines: ['Awards &', 'Gala Evenings'],
    title: 'Awards & Gala Evenings',
    image: '/images/social.jpg',
    alt: 'Candlelit formal gala evening banquet with long reflective dining tables and crystal stemware',
    description:
      'Elegant award ceremonies and gala experiences combining considered production, hospitality and memorable guest moments.',
  },
  {
    number: '07',
    titleLines: ['Brand Activations &', 'Product Launches'],
    title: 'Brand Activations & Product Launches',
    image: '/portfolio/20240214_084455.jpg',
    alt: 'Branded corporate launch and experiential presentation with wide LED wall and seated guests',
    description:
      'Immersive brand experiences and launches designed to turn products, ideas and campaigns into memorable audience interactions.',
  },
  {
    number: '08',
    titleLines: ['National Day &', 'Cultural Experiences'],
    title: 'National Day & Cultural Experiences',
    image: '/home/selected3.jpg',
    alt: 'Outdoor cultural performance and heritage gathering with traditional drumming in the UAE',
    description:
      'Meaningful cultural experiences and national celebrations delivered with authenticity, creativity and respect for heritage.',
  },
  {
    number: '09',
    titleLines: ['Exhibitions &', 'Experiential Events'],
    title: 'Exhibitions & Experiential Events',
    image: '/images/services-production-warm.jpg',
    alt: 'Purpose-built experiential exhibition structure and architectural staging with warm production lighting',
    description:
      'Purpose-built exhibition environments and experiential spaces designed to attract attention, encourage interaction and bring brands to life.',
  },
]

export default function ThreeServices() {
  const reduced = useReducedMotion()

  const itemMotion = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.75, delay: reduced ? 0 : delay, ease },
  })

  const imageMotion = {
    initial: reduced ? false : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.85, ease },
  }

  return (
    <section
      className="three-services"
      id="three-services"
      aria-labelledby="three-services-heading"
    >
      <header className="three-services-intro">
        <motion.p className="three-services-eyebrow" {...itemMotion(0)}>
          Our services <span aria-hidden="true" />
        </motion.p>
        <motion.h2 id="three-services-heading" {...itemMotion(0.08)}>
          Distinct ways we
          <br />
          <em>create experiences.</em>
        </motion.h2>
        <motion.p className="three-services-summary" {...itemMotion(0.16)}>
          From team engagement and executive summits to cultural celebrations and exhibitions
          across Dubai and the UAE, we deliver{' '}
          <br className="three-services-break" />
          event management and experiences shaped with clarity, purpose and precision.
        </motion.p>
      </header>

      <div className="three-services-grid">
        {services.map((service) => {
          const hasPage = Boolean(service.path)
          return (
            <article className="three-service" key={service.number}>
              {hasPage ? (
                <motion.a
                  href={service.path}
                  className="three-service-image-link"
                  aria-label={`Explore ${service.title}`}
                  {...imageMotion}
                >
                  <div className="three-service-image">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="three-service-photo"
                      loading="lazy"
                    />
                  </div>
                </motion.a>
              ) : (
                <motion.div className="three-service-image" {...imageMotion}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="three-service-photo"
                    loading="lazy"
                  />
                </motion.div>
              )}

              <motion.p className="three-service-number" {...itemMotion(0.08)}>
                {service.number}
                <span aria-hidden="true" />
              </motion.p>

              <motion.h3 {...itemMotion(0.14)}>
                {hasPage ? (
                  <a href={service.path} className="three-service-title-link">
                    {service.titleLines[0]}
                    <br />
                    {service.titleLines[1]}
                  </a>
                ) : (
                  <>
                    {service.titleLines[0]}
                    <br />
                    {service.titleLines[1]}
                  </>
                )}
              </motion.h3>

              <motion.p className="three-service-description" {...itemMotion(0.2)}>
                {service.description}
              </motion.p>

              {hasPage && (
                <motion.a
                  className="three-service-discover"
                  href={service.path}
                  aria-label={`Explore ${service.title}`}
                  {...itemMotion(0.26)}
                >
                  Explore service <span aria-hidden="true">→</span>
                </motion.a>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
