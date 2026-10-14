import { test, expect } from '@playwright/test'

test.describe('Three Service Landing Pages - SEO, Content & Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
  })

  test('Page 01: Corporate Events (/services/corporate-events)', async ({ page }) => {
    await page.goto('/services/corporate-events')

    // 1. SEO Title & Meta Description
    await expect(page).toHaveTitle('Corporate Events Dubai | The Edge Events')
    const metaDesc = page.locator('meta[name="description"]')
    await expect(metaDesc).toHaveAttribute(
      'content',
      'Corporate event planning, conferences, launches, gala dinners and business experiences delivered by The Edge Events across Dubai and the UAE.'
    )

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://theedgeevents.com/services/corporate-events')

    // 2. Exactly one H1
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
    await expect(h1s).toContainText('Corporate Events')
    await expect(h1s).toContainText('Make an Impact.')

    // 3. Breadcrumbs
    const breadcrumbs = page.locator('.service-breadcrumbs')
    await expect(breadcrumbs).toBeVisible()
    await expect(breadcrumbs).toContainText('Home')
    await expect(breadcrumbs).toContainText('Services')
    await expect(breadcrumbs).toContainText('Corporate Events')

    // 4. Kicker
    await expect(page.locator('.kicker-badge')).toContainText('EDGE ENGAGEMENTS')

    // 5. Section 02 Intro
    const introH2 = page.locator('#service-intro-heading')
    await expect(introH2).toHaveText('Where strategy meets experience.')

    // 6. Section 03 What We Deliver
    const offeringsH2 = page.locator('#offerings-heading')
    await expect(offeringsH2).toHaveText('Corporate experiences, from concept to execution.')
    await expect(page.locator('.offering-entry')).toHaveCount(10)

    // 7. Section 04 Process
    const processH2 = page.locator('#process-heading')
    await expect(processH2).toHaveText('How we bring corporate events to life.')
    await expect(page.locator('.process-stage-card')).toHaveCount(4)

    // 8. Section 05 Capabilities
    const capabilitiesH2 = page.locator('#capabilities-heading')
    await expect(capabilitiesH2).toHaveText('Everything behind the experience.')
    await expect(page.locator('.capability-item')).toHaveCount(12)

    // 9. Section 06 Selected Work
    const projectsH2 = page.locator('#projects-heading')
    await expect(projectsH2).toHaveText('Selected Corporate Experiences')

    // 10. Section 07 Why The Edge
    const whyH2 = page.locator('#why-heading')
    await expect(whyH2).toHaveText('Why brands choose The Edge Events.')

    // 11. Section 08 FAQ
    const faqH2 = page.locator('#faq-heading')
    await expect(faqH2).toHaveText('Corporate Events Frequently Asked Questions')
    const faqItems = page.locator('.faq-item')
    await expect(faqItems).toHaveCount(8)

    // Toggle FAQ item 2
    const secondFaqBtn = faqItems.nth(1).locator('.faq-trigger')
    await secondFaqBtn.click()
    await expect(secondFaqBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(faqItems.nth(1).locator('.faq-answer-inner')).toBeVisible()

    // 12. Final CTA
    const ctaH2 = page.locator('#cta-heading')
    await expect(ctaH2).toHaveText('Planning your next corporate experience?')

    // 13. Related Services cross-links
    const related = page.locator('.related-services-nav')
    await expect(related).toBeVisible()
    await expect(related.locator('a[href="/services/social-celebrations"]').first()).toBeVisible()
    await expect(related.locator('a[href="/services/travel-expeditions"]').first()).toBeVisible()

    // 14. Responsive viewport check
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 900 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  })

  test('Page 02: Social Celebrations (/services/social-celebrations)', async ({ page }) => {
    await page.goto('/services/social-celebrations')

    // 1. SEO Title & Meta Description
    await expect(page).toHaveTitle('Social Celebrations Dubai | The Edge Events')
    const metaDesc = page.locator('meta[name="description"]')
    await expect(metaDesc).toHaveAttribute(
      'content',
      'Bespoke private celebrations, milestone birthdays, luxury dining experiences and intimate social gatherings planned across Dubai and the UAE by The Edge Events.'
    )

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://theedgeevents.com/services/social-celebrations')

    // 2. Exactly one H1
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
    await expect(h1s).toContainText('Celebrations Created')
    await expect(h1s).toContainText('Your Story.')

    // 3. Kicker
    await expect(page.locator('.kicker-badge')).toContainText('EDGE EXCLUSIVES')

    // 4. Section 02 Intro
    const introH2 = page.locator('#service-intro-heading')
    await expect(introH2).toHaveText('Personal by design. Memorable by nature.')

    // 5. Section 03 Services
    const offeringsH2 = page.locator('#offerings-heading')
    await expect(offeringsH2).toHaveText('Celebrations worth remembering.')
    await expect(page.locator('.offering-entry')).toHaveCount(9)

    // 6. Section 04 Experience
    const capabilitiesH2 = page.locator('#capabilities-heading')
    await expect(capabilitiesH2).toHaveText('Every detail, considered.')
    await expect(page.locator('.capability-item')).toHaveCount(10)

    // 7. Section 05 Process
    const processH2 = page.locator('#process-heading')
    await expect(processH2).toHaveText('From an idea to your moment.')
    await expect(page.locator('.process-stage-card')).toHaveCount(4)

    // 8. Section 06 Selected Work
    const projectsH2 = page.locator('#projects-heading')
    await expect(projectsH2).toHaveText('Selected Celebrations')

    // 9. Section 07 Why The Edge
    const whyH2 = page.locator('#why-heading')
    await expect(whyH2).toHaveText('Made personal. Delivered beautifully.')

    // 10. Section 08 FAQ
    const faqH2 = page.locator('#faq-heading')
    await expect(faqH2).toHaveText('Social Celebrations Frequently Asked Questions')
    await expect(page.locator('.faq-item')).toHaveCount(8)

    // 11. Final CTA
    const ctaH2 = page.locator('#cta-heading')
    await expect(ctaH2).toHaveText('A celebration that feels like you.')

    // 12. Related Services cross-links
    const related = page.locator('.related-services-nav')
    await expect(related.locator('a[href="/services/corporate-events"]').first()).toBeVisible()
    await expect(related.locator('a[href="/services/travel-expeditions"]').first()).toBeVisible()

    // 13. Mobile viewport
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 900 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  })

  test('Page 03: Travel & Expeditions (/services/travel-expeditions)', async ({ page }) => {
    await page.goto('/services/travel-expeditions')

    // 1. SEO Title & Meta Description
    await expect(page).toHaveTitle('Travel & Expeditions UAE | The Edge Events')
    const metaDesc = page.locator('meta[name="description"]')
    await expect(metaDesc).toHaveAttribute(
      'content',
      'Curated journeys, executive retreats, desert expeditions and bespoke destination experiences crafted across the UAE by The Edge Events.'
    )

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://theedgeevents.com/services/travel-expeditions')

    // 2. Exactly one H1
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
    await expect(h1s).toContainText('Go Beyond.')
    await expect(h1s).toContainText('Experience More.')

    // 3. Kicker
    await expect(page.locator('.kicker-badge')).toContainText('EDGE EXPLORATIONS')

    // 4. Section 02 Intro
    const introH2 = page.locator('#service-intro-heading')
    await expect(introH2).toHaveText('Journeys with a sense of purpose.')

    // 5. Section 03 Experience Types
    const offeringsH2 = page.locator('#offerings-heading')
    await expect(offeringsH2).toHaveText('Experiences beyond the expected.')
    await expect(page.locator('.offering-entry')).toHaveCount(10)

    // 6. Section 04 Planning Capabilities
    const capabilitiesH2 = page.locator('#capabilities-heading')
    await expect(capabilitiesH2).toHaveText('We handle the journey, not just the destination.')
    await expect(page.locator('.capability-item')).toHaveCount(11)

    // 7. Section 05 Process
    const processH2 = page.locator('#process-heading')
    await expect(processH2).toHaveText('From possibility to itinerary.')
    await expect(page.locator('.process-stage-card')).toHaveCount(4)

    // 8. Section 06 Destinations
    const destH2 = page.locator('#destinations-heading')
    await expect(destH2).toHaveText('Explore experiences across the UAE and beyond.')
    await expect(page.locator('.destination-card')).toHaveCount(4)

    // 9. Section 07 Selected Experiences
    const projectsH2 = page.locator('#projects-heading')
    await expect(projectsH2).toHaveText('Journeys We’ve Created')

    // 10. Section 08 Why The Edge
    const whyH2 = page.locator('#why-heading')
    await expect(whyH2).toHaveText('Travel differently.')

    // 11. Section 09 FAQ
    const faqH2 = page.locator('#faq-heading')
    await expect(faqH2).toHaveText('Travel & Expeditions Frequently Asked Questions')
    await expect(page.locator('.faq-item')).toHaveCount(8)

    // 12. Final CTA
    const ctaH2 = page.locator('#cta-heading')
    await expect(ctaH2).toHaveText('Where should we take you next?')

    // 13. Related Services cross-links
    const related = page.locator('.related-services-nav')
    await expect(related.locator('a[href="/services/corporate-events"]').first()).toBeVisible()
    await expect(related.locator('a[href="/services/social-celebrations"]').first()).toBeVisible()

    // 14. Mobile viewport
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 900 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  })
})
