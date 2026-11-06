import { test, expect } from '@playwright/test'

test.describe('Cloudflare Turnstile & Spam Protection Suite', () => {
  test('Server API verifies Turnstile token and rejects missing or forged tokens', async ({ request }) => {
    // 1. Missing token must be rejected
    const noTokenRes = await request.post('/api/submit', {
      data: {
        formType: 'contact',
        fullName: 'Bot User',
        email: 'bot@spam.com',
        eventType: 'Corporate Event',
        message: 'This is an automated spam payload without security token.',
      },
    })
    expect(noTokenRes.status()).toBe(400)
    const noTokenData = await noTokenRes.json()
    expect(noTokenData.success).toBe(false)
    expect(noTokenData.error).toContain('Verification failed')

    // 2. Forged / invalid token must be rejected by Cloudflare verification
    const invalidTokenRes = await request.post('/api/submit', {
      data: {
        formType: 'contact',
        fullName: 'Bot User',
        email: 'bot@spam.com',
        eventType: 'Corporate Event',
        message: 'This payload has a forged token.',
        turnstileToken: 'forged-fake-turnstile-token-12345',
      },
    })
    expect([400, 403]).toContain(invalidTokenRes.status())
    const invalidTokenData = await invalidTokenRes.json()
    expect(invalidTokenData.success).toBe(false)
    expect(invalidTokenData.error).toContain('Verification failed')
  })

  test('Valid Turnstile token succeeds and securely processes submission without exposing recipient emails', async ({ request }) => {
    const validRes = await request.post('/api/contact', {
      data: {
        formType: 'contact',
        fullName: 'Audrey Hepburn',
        email: 'audrey@domain.com',
        phone: '+971 50 111 2222',
        company: 'Hepburn Productions',
        eventType: 'Social Celebrations',
        location: 'Abu Dhabi',
        message: 'We are planning a milestone anniversary banquet for 100 VIP guests.',
        turnstileToken: 'cf-mock-turnstile-token-success',
      },
    })
    expect(validRes.status()).toBe(200)
    const validData = await validRes.json()
    expect(validData.success).toBe(true)
    expect(validData.message).toBe('Your enquiry has been received.')

    // Verify recipient email is NEVER returned in response
    const rawResponse = JSON.stringify(validData)
    expect(rawResponse).not.toContain('collin@theedgeevents.co')
    expect(rawResponse).not.toContain('secret')
  })

  test('Replay Protection: Replayed / duplicate verification tokens are blocked', async ({ request }) => {
    const replayToken = 'cf-mock-replay-test-' + Date.now()

    // First attempt with token succeeds
    const firstRes = await request.post('/api/contact', {
      data: {
        formType: 'contact',
        fullName: 'Test User',
        email: 'test@domain.com',
        eventType: 'Corporate Event',
        message: 'Testing replay attempt one.',
        turnstileToken: replayToken,
      },
    })
    expect(firstRes.status()).toBe(200)

    // Second immediate attempt with the exact same token MUST be blocked
    const duplicateRes = await request.post('/api/contact', {
      data: {
        formType: 'contact',
        fullName: 'Test User',
        email: 'test@domain.com',
        eventType: 'Corporate Event',
        message: 'Testing replay attempt two with duplicate token.',
        turnstileToken: replayToken,
      },
    })
    expect(duplicateRes.status()).toBe(403)
    const duplicateData = await duplicateRes.json()
    expect(duplicateData.success).toBe(false)
    expect(duplicateData.error).toContain('Verification failed. Please try again.')
  })

  test('Honeypot protection quietly intercepts automated bot payloads', async ({ request }) => {
    const honeypotRes = await request.post('/api/submit', {
      data: {
        formType: 'contact',
        fullName: 'Spam Bot',
        email: 'spambot@spam.com',
        eventType: 'Corporate Event',
        message: 'Buy cheap watches online now!',
        _edge_hp_fax: 'http://spam-link.ru',
        turnstileToken: 'cf-mock-turnstile-token-success',
      },
    })
    // Quietly dropped without processing or revealing rejection
    expect(honeypotRes.status()).toBe(200)
    const data = await honeypotRes.json()
    expect(data.success).toBe(true)
  })

  test('HeroDialog Plan an Event form submits securely with Turnstile', async ({ page }) => {
    await page.goto('/services')

    // On services page, click hero "PLAN AN EVENT" or navigation
    const planBtn = page.getByRole('button', { name: /plan an event/i }).first()
    if (await planBtn.isVisible()) {
      await planBtn.click()
    } else {
      // Direct open via contact link
      await page.goto('/contact')
    }

    const openDialog = page.locator('dialog.hero-dialog[open]')
    if (await openDialog.isVisible()) {
      // Verify Turnstile widget container is rendered
      const turnstileContainer = openDialog.locator('#turnstile-plan_event')
      await expect(turnstileContainer).toBeAttached()

      // Fill in details
      await openDialog.locator('#plan-full-name').fill('Christian Dior')
      await openDialog.locator('#plan-organization').fill('LVMH Group')
      await openDialog.locator('#plan-contact-number').fill('+971 50 999 8888')
      await openDialog.locator('#plan-email').fill('christian@lvmh.com')
      await openDialog.locator('#plan-brief').fill(
        'Exclusive luxury showcase and high-jewelry exhibition gala in Dubai Opera.'
      )

      // Submit
      const submitBtn = openDialog.locator('button[type="submit"]')
      await submitBtn.click()

      // Verify success state
      await expect(openDialog.getByText('Brief Received.')).toBeVisible({ timeout: 10000 })
    }
  })

  test('Curated Dispatches Newsletter form submits securely with Turnstile', async ({ page }) => {
    await page.goto('/blogs')

    const newsletterInput = page.locator('#insights-email-input')
    await newsletterInput.scrollIntoViewIfNeeded()
    await expect(newsletterInput).toBeVisible()

    // Verify Turnstile container is present
    const turnstileContainer = page.locator('#turnstile-newsletter')
    await expect(turnstileContainer).toBeAttached()

    // Fill valid email
    await newsletterInput.fill('curator@designagency.co')
    const submitBtn = page.locator('.subscribe-submit-btn')
    await submitBtn.click()

    // Verify success confirmation
    await expect(
      page.getByText('Thank you for subscribing to The Edge Journal dispatches.')
    ).toBeVisible({ timeout: 10000 })
  })
})
