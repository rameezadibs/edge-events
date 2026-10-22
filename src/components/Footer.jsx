import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="edge-footer" id="contact">
      {/* Background Ambient Glow */}
      <div className="footer-glow" aria-hidden="true" />
      
      <div className="footer-container">
        {/* TOP BRANDING & CALL TO ACTION */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <h2 className="footer-statement">
              Crafting Extraordinary <br />
              <span className="statement-italic">Architectural Experiences.</span>
            </h2>
          </div>

          <div className="footer-cta-col">
            <p className="cta-description">
              Planning a high-profile corporate summit, VIP product launch, or exclusive private celebration? Partner with the premier luxury event management agency in Dubai and Abu Dhabi.
            </p>
            <a
              id="footer-initiate-commission-btn"
              href="mailto:collin@theedgeevents.co?subject=Private%20Event%20Commission%20Inquiry"
              aria-label="Initiate an event commission with The Edge Events"
              title="Send an inquiry to initiate your private event commission"
              className="footer-primary-btn"
            >
              <span>INITIATE COMMISSION</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* MIDDLE NAVIGATION & INFO GRID */}
        <div className="footer-grid">
          {/* Navigation Column */}
          <div className="footer-nav-col">
            <span className="grid-heading">NAVIGATION</span>
            <ul className="footer-links-list">
              <li><a href="/#home">Overview</a></li>
              <li><a href="/about">Who We Are</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/#clients">Trusted By</a></li>
              <li><a href="/#testimonials">Client Stories</a></li>
            </ul>
          </div>

          {/* Global Locations Column */}
          <div className="footer-nav-col">
            <span className="grid-heading">LOCATION</span>
            <ul className="footer-info-list">
              <li>
                <strong>DUBAI</strong>
                <span>Dubai, UAE</span>
              </li>
            </ul>
          </div>

          {/* Inquiries & Connect Column */}
          <div className="footer-nav-col">
            <span className="grid-heading">INQUIRIES</span>
            <ul className="footer-info-list">
              <li>
                <span className="info-label">General Commissions</span>
                <a href="mailto:collin@theedgeevents.co">collin@theedgeevents.co</a>
              </li>
              <li>
                <span className="info-label">Private Desk</span>
                <a href="tel:+971505035848">+971 5050 35848</a>
              </li>
            </ul>
          </div>

          {/* Socials & Dispatch Column */}
          <div className="footer-nav-col">
            <span className="grid-heading">CONNECT</span>
            <ul className="footer-links-list">
              <li>
                <a href="https://www.instagram.com/theedgeevents/" target="_blank" rel="noopener noreferrer">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">
                  Vimeo ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="footer-bottom-bar">
          <div className="copyright-info">
            <span>© {currentYear} THE EDGE EVENTS. ALL RIGHTS RESERVED.</span>
            <span className="bar-sep">|</span>
            <span className="discretion-tag">CONFIDENTIALITY &amp; DISCRETION GUARANTEED</span>
          </div>

          <button type="button" className="back-to-top-btn" onClick={scrollToTop}>
            <span>BACK TO TOP</span>
            <span className="top-arrow" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
