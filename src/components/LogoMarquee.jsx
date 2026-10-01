import { useState } from 'react'
import ClientLogo from './ClientLogo'

export default function LogoMarquee({
  clients,
  direction = 'left',
  speed = 55,
  isMajor = false,
  rowLabel,
}) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate list to achieve a seamless, continuous infinite loop
  const displayClients = [...clients, ...clients, ...clients]

  return (
    <div
      className={`logo-marquee-track-container direction-${direction} ${isMajor ? 'track-major' : 'track-supporting'} ${isPaused ? 'is-paused' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label={rowLabel || 'Client partner ribbon'}
    >
      {/* Edge gradient masks for soft luxury vignette fade on sides */}
      <div className="marquee-fade-left" aria-hidden="true" />
      <div className="marquee-fade-right" aria-hidden="true" />

      <div
        className={`marquee-inner ${direction === 'left' ? 'scroll-left' : 'scroll-right'}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        role="list"
      >
        {displayClients.map((client, index) => (
          <ClientLogo
            key={`${client.id}-${index}`}
            client={client}
            isMajor={isMajor}
          />
        ))}
      </div>
    </div>
  )
}
