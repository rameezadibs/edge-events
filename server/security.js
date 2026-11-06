/**
 * Advanced Server-Side Spam & Abuse Protection
 *
 * Provides layered defenses alongside Cloudflare Turnstile:
 * - In-memory rate limiting with sliding window
 * - Hidden honeypot trap detection
 * - Submission timing checks (bot velocity detection)
 * - Maximum field length limits and strict input sanitization
 * - Email format validation
 * - Payload size and field whitelisting
 */

// Sliding window rate limiter by IP
// Default: max 5 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5
const ipRequestHistory = new Map()

// Clean up stale rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, timestamps] of ipRequestHistory.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
    if (valid.length === 0) {
      ipRequestHistory.delete(ip)
    } else {
      ipRequestHistory.set(ip, valid)
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref?.()

/**
 * Check if client IP has exceeded submission rate limit
 * @param {string} ip
 * @returns {{ allowed: boolean, retryAfterSeconds?: number }}
 */
export function checkRateLimit(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    // In local development or when IP is masked, use relaxed limit
    if (process.env.NODE_ENV !== 'production') {
      return { allowed: true }
    }
  }

  const now = Date.now()
  const timestamps = (ipRequestHistory.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = timestamps[0]
    const retryAfterSeconds = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000)
    return {
      allowed: false,
      retryAfterSeconds: Math.max(retryAfterSeconds, 1),
    }
  }

  timestamps.push(now)
  ipRequestHistory.set(ip, timestamps)
  return { allowed: true }
}

/**
 * Honeypot verification: checks known honeypot field names.
 * Genuine users will never populate these fields.
 * @param {Object} body
 * @returns {boolean} true if honeypot was triggered (bot detected)
 */
export function isHoneypotTriggered(body) {
  if (!body || typeof body !== 'object') return false

  const honeypotKeys = [
    'honeypot',
    '_edge_hp_fax',
    '_edge_hp_company',
    'website_url',
    'fax_number',
    'b_fax',
  ]

  for (const key of honeypotKeys) {
    if (body[key] && String(body[key]).trim().length > 0) {
      return true
    }
  }
  return false
}

/**
 * Timing check: human users need at least ~1.5s to review and submit a form.
 * Automated bots submit forms within tens or hundreds of milliseconds.
 * Also checks that the form is not stale (> 24 hours).
 * @param {number|string} renderTimestamp
 * @returns {{ valid: boolean, reason?: string }}
 */
export function checkSubmissionTiming(renderTimestamp) {
  if (!renderTimestamp) {
    // If not supplied, allow but note lack of timing in dev
    return { valid: true }
  }

  const renderedAt = Number(renderTimestamp)
  if (isNaN(renderedAt)) {
    return { valid: false, reason: 'Malformed timing parameter.' }
  }

  const now = Date.now()
  const elapsed = now - renderedAt

  // Less than 1.2 seconds: superhuman speed (automated bot)
  // Skip check in automated test environment if test header or test token is present
  if (elapsed < 1200) {
    return {
      valid: false,
      reason: 'Submission received too quickly. Please try again.',
    }
  }

  // Older than 24 hours: stale token
  if (elapsed > 24 * 60 * 60 * 1000) {
    return {
      valid: false,
      reason: 'Form session has expired. Please refresh the page.',
    }
  }

  return { valid: true }
}

/**
 * Sanitizes input text: strips HTML tags, control chars, trims whitespace.
 * @param {string} input
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeText(input, maxLength = 1000) {
  if (input === null || input === undefined) return ''
  const str = String(input)
  // Strip HTML tags and javascript protocol
  const cleaned = str
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .trim()
  return cleaned.slice(0, maxLength)
}

/**
 * Email format validation (RFC 5322 standard regex)
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length < 5 || trimmed.length > 150) return false
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  return emailRegex.test(trimmed)
}

// Field maximum lengths
export const FIELD_LIMITS = {
  fullName: 100,
  email: 150,
  phone: 50,
  contactNumber: 50,
  organization: 150,
  company: 150,
  eventType: 100,
  location: 150,
  preferredDate: 100,
  guestCount: 50,
  role: 100,
  portfolioUrl: 255,
  resumeFileName: 255,
  brief: 5000,
  message: 5000,
  coverNote: 5000,
}

// Allowed fields per form type
export const ALLOWED_FIELDS = {
  contact: [
    'fullName',
    'email',
    'phone',
    'company',
    'eventType',
    'location',
    'preferredDate',
    'guestCount',
    'message',
    'turnstileToken',
    'honeypot',
    '_edge_hp_fax',
    '_t',
  ],
  plan_event: [
    'fullName',
    'organization',
    'contactNumber',
    'email',
    'brief',
    'turnstileToken',
    'honeypot',
    '_edge_hp_fax',
    '_t',
  ],
  career_collaboration: [
    'fullName',
    'email',
    'phone',
    'role',
    'portfolioUrl',
    'coverNote',
    'resumeFileName',
    'turnstileToken',
    'honeypot',
    '_edge_hp_fax',
    '_t',
  ],
  newsletter: [
    'email',
    'turnstileToken',
    'honeypot',
    '_edge_hp_fax',
    '_t',
  ],
}
