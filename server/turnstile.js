/**
 * Cloudflare Turnstile Server-Side Verification
 *
 * Securely verifies Turnstile challenge tokens with Cloudflare Siteverify API.
 * Never exposes the Turnstile Secret Key to client bundles.
 */

// Cache of recently verified tokens to prevent replay / duplication attacks
// Tokens expire in Turnstile after 5 minutes (300,000 ms)
const usedTokens = new Map()

// Clean up expired tokens every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [token, timestamp] of usedTokens.entries()) {
    if (now - timestamp > 300000) {
      usedTokens.delete(token)
    }
  }
}, 300000).unref?.()

/**
 * Verify Cloudflare Turnstile token
 * @param {Object} options
 * @param {string} options.token - The turnstile token from the client
 * @param {string} [options.remoteIp] - The client IP address
 * @param {string} [options.expectedAction] - Optional action to verify
 * @returns {Promise<{ success: boolean, error?: string, details?: any }>}
 */
export async function verifyTurnstileToken({ token, remoteIp = '', expectedAction = null }) {
  // 1. Basic presence check
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return {
      success: false,
      error: 'Turnstile verification token is missing.',
    }
  }

  const cleanToken = token.trim()

  // 2. Prevent Replay / Duplicate Token attacks
  const isSharedTestMock =
    cleanToken === 'cf-mock-turnstile-token-success' &&
    process.env.NODE_ENV !== 'production'

  if (!isSharedTestMock && usedTokens.has(cleanToken)) {
    return {
      success: false,
      error: 'Verification token has already been used or has expired.',
    }
  }

  // 3. Resolve Secret Key securely from environment (default to Cloudflare testing secret)
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY ||
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
    '1x00000000000000000000000000000000AA'

  // Testing token bypass for automated test suites / local mock
  if (isSharedTestMock) {
    return { success: true }
  }

  if (
    cleanToken.startsWith('cf-mock-replay-test-') &&
    process.env.NODE_ENV !== 'production'
  ) {
    usedTokens.set(cleanToken, Date.now())
    return { success: true }
  }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secretKey)
    formData.append('response', cleanToken)
    if (remoteIp) {
      formData.append('remoteip', remoteIp)
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return {
        success: false,
        error: `Cloudflare Turnstile verification service responded with status ${response.status}.`,
      }
    }

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: 'Cloudflare Turnstile verification failed.',
        errorCodes: data['error-codes'] || [],
      }
    }

    // 4. Verify Hostname in production
    const allowedHostnamesStr =
      process.env.ALLOWED_HOSTNAMES ||
      'theedgeevents.co,www.theedgeevents.co,the-edge-events.vercel.app,edgeevents.ae'
    const allowedHostnames = allowedHostnamesStr
      .split(',')
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean)

    if (process.env.NODE_ENV === 'production' && data.hostname) {
      const tokenHostname = data.hostname.toLowerCase()
      const isAllowed = allowedHostnames.some(
        (allowed) =>
          tokenHostname === allowed ||
          tokenHostname.endsWith(`.${allowed}`) ||
          tokenHostname === 'localhost' ||
          tokenHostname === '127.0.0.1'
      )

      if (!isAllowed) {
        return {
          success: false,
          error: `Submission origin '${data.hostname}' is not authorized.`,
        }
      }
    }

    // 5. Verify Action if expected
    if (expectedAction && data.action && data.action !== expectedAction) {
      return {
        success: false,
        error: 'Turnstile action mismatch.',
      }
    }

    // Mark token as used to prevent replaying
    usedTokens.set(cleanToken, Date.now())

    return {
      success: true,
      hostname: data.hostname,
      action: data.action,
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'Cloudflare verification timed out. Please try again.',
      }
    }
    return {
      success: false,
      error: 'Unable to reach verification service. Please try again.',
    }
  }
}
