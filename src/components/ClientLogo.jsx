import { useState } from 'react'
import { motion } from 'framer-motion'

export function ClientWordmark({ client, isMajor }) {
  const { id, name, category, ticker } = client

  // Stylized editorial typography tailored to the brand's real identity
  switch (id) {
    case 'dp-world':
      return (
        <span className="client-wordmark wordmark-dp-world">
          <span className="dp-bold">DP</span>
          <span className="dp-light">WORLD</span>
        </span>
      )
    case 'amazon':
      return (
        <span className="client-wordmark wordmark-amazon">
          <span className="amazon-text">amazon</span>
          <svg className="amazon-smile-svg" viewBox="0 0 60 14" fill="none" aria-hidden="true">
            <path d="M4 4c15 8 36 8 50 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M50 0c3 2 4 4 4 4s-3 1-5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )
    case 'dubai-airports':
      return (
        <span className="client-wordmark wordmark-dubai-airports">
          <span className="da-city">DUBAI</span>
          <span className="da-sub">AIRPORTS</span>
        </span>
      )
    case 'strategy-and':
      return (
        <span className="client-wordmark wordmark-strategy-and">
          <span>strategy</span>
          <span className="strategy-amp">&amp;</span>
        </span>
      )
    case 'enec':
      return (
        <span className="client-wordmark wordmark-enec">
          <span className="enec-code">ENEC</span>
          <span className="enec-full">EMIRATES NUCLEAR</span>
        </span>
      )
    case 'schlumberger':
      return (
        <span className="client-wordmark wordmark-slb">
          <span className="slb-monogram">SLB</span>
          <span className="slb-full">Schlumberger</span>
        </span>
      )
    case 'cartier':
      return (
        <span className="client-wordmark wordmark-cartier">
          Cartier
        </span>
      )
    case 'bloomberg':
      return (
        <span className="client-wordmark wordmark-bloomberg">
          Bloomberg
        </span>
      )
    case 'kearney':
      return (
        <span className="client-wordmark wordmark-kearney">
          KEARNEY
        </span>
      )
    case 'hapag-lloyd':
      return (
        <span className="client-wordmark wordmark-hapag">
          Hapag-Lloyd
        </span>
      )
    case 'nawah':
      return (
        <span className="client-wordmark wordmark-nawah">
          <span>NAWAH</span>
          <span className="nawah-sub">ENERGY</span>
        </span>
      )
    case 'chalhoub':
      return (
        <span className="client-wordmark wordmark-chalhoub">
          CHALHOUB GROUP
        </span>
      )
    case 'siemens':
      return (
        <span className="client-wordmark wordmark-siemens">
          SIEMENS
        </span>
      )
    case 'difc':
      return (
        <span className="client-wordmark wordmark-difc">
          <span>DIFC</span>
          <span className="difc-dot" />
        </span>
      )
    case 'standard-chartered':
      return (
        <span className="client-wordmark wordmark-sc">
          <span className="sc-top">Standard</span>
          <span className="sc-bot">Chartered</span>
        </span>
      )
    case 'dwtc':
      return (
        <span className="client-wordmark wordmark-dwtc">
          <span>DUBAI WORLD TRADE CENTRE</span>
        </span>
      )
    default:
      return (
        <span className="client-wordmark wordmark-default">
          {name}
        </span>
      )
  }
}

export default function ClientLogo({ client, isMajor = false }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`client-logo-item ${isMajor ? 'major-client' : 'supporting-client'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2, scale: 1.025 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="listitem"
      aria-label={`${client.name} — ${client.category}`}
    >
      <div className="client-wordmark-wrapper">
        <ClientWordmark client={client} isMajor={isMajor} />
        <span className="client-category-tooltip" aria-hidden="true">
          {client.category}
        </span>
      </div>
      <div className={`client-hover-line ${isHovered ? 'active' : ''}`} aria-hidden="true" />
    </motion.div>
  )
}
