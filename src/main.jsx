import React from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero'
import WhoWeAre from './components/WhoWeAre'
import ServicesSection from './components/ServicesSection'
import SelectedWorks from './components/SelectedWorks'
import TrustedBy from './components/TrustedBy'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <WhoWeAre />
        <ServicesSection />
        <SelectedWorks />
        <TrustedBy />
        <TestimonialsSection />
      </main>
      <Footer />
    </MotionConfig>
  </React.StrictMode>,
)

