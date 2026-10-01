import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../data/hero'
import { fallbackMoments, instagramProfile } from '../data/moments'
import MomentsIntro from './MomentsIntro'
import FeaturedReel from './FeaturedReel'
import MomentImage from './MomentImage'
import InstagramFollow from './InstagramFollow'
import './LatestMoments.css'

export default function LatestMoments() {
  const [moments, setMoments] = useState(fallbackMoments)
  const reduced = useReducedMotion()

  // Future-proof hook: prepared to integrate with live Instagram Basic Display API if configured
  useEffect(() => {
    // If a serverless endpoint like /api/instagram exists in production, it can be fetched securely here
    // Falls back gracefully to fallbackMoments without breaking or throwing errors
  }, [])

  const post01 = moments[0] // Featured Reel
  const post02 = moments[1] // Event Photography (Landscape)
  const post03 = moments[2] // Behind The Scenes

  return (
    <section
      id="latest-moments"
      className="latest-moments-section"
      aria-labelledby="moments-heading"
    >
      {/* Background Ambient Film Texture */}
      <div className="moments-film-ambient" aria-hidden="true" />
      <div className="moments-grain-overlay" aria-hidden="true" />

      <div className="latest-moments-container">
        {/* Side Rail Vertical Typography */}
        <aside className="moments-side-rail" aria-hidden="true">
          <span className="rail-text">
            THE EDGE ARCHIVE · VISUAL DISPATCHES · @THEEDGEEVENTS
          </span>
          <div className="rail-track" />
        </aside>

        {/* 1. UPPER COMPOSITION: Intro + Featured Reel */}
        <div className="moments-upper-spread">
          <div className="spread-intro-col">
            <MomentsIntro />
          </div>

          <div className="spread-reel-col">
            {post01 && <FeaturedReel post={post01} />}
          </div>
        </div>

        {/* INTERMEZZO EDITORIAL HAIRLINE */}
        <div className="moments-intermezzo-bar" aria-hidden="true">
          <span className="bar-line" />
          <span className="bar-tag">THE MOMENTS BETWEEN THE MOMENTS · LIVE CAPTURE</span>
          <span className="bar-line" />
        </div>

        {/* 2. LOWER COMPOSITION: Post 02 (Landscape) + Follow Statement + Post 03 (BTS) */}
        <div className="moments-lower-spread">
          {/* Post 02 (Event Photography - Landscape) */}
          <div className="lower-left-col">
            {post02 && <MomentImage post={post02} delay={0.15} />}
          </div>

          {/* Bottom Follow Block & Post 03 (BTS) */}
          <div className="lower-right-col">
            <div className="follow-anchor-zone">
              <InstagramFollow />
            </div>

            <div className="bts-anchor-zone">
              {post03 && <MomentImage post={post03} delay={0.25} />}
            </div>
          </div>
        </div>

        {/* 3. SECTION FOOTNOTE */}
        <footer className="moments-footer-bar">
          <div className="footer-line" aria-hidden="true" />
          <div className="footer-meta-row">
            <span className="footer-copy">
              THE EDGE EVENTS © {new Date().getFullYear()} · LIVE DOCUMENTARY ARCHIVE
            </span>
            <span className="footer-sync">
              CURATED DISPATCHES FROM DUBAI, ABU DHABI &amp; WORLDWIDE
            </span>
            <a
              href={instagramProfile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ig-link"
            >
              INSTAGRAM {instagramProfile.handle} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
