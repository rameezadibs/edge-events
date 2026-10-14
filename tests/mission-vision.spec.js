import { test, expect } from '@playwright/test'

test('Mission & Vision section on About page: editorial typography, asymmetrical spread, no images, responsive verification', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/about')

  const section = page.locator('#mission-vision')
  await expect(section).toBeVisible()

  // Verify section intro & typography
  await expect(section.locator('.mv-label')).toHaveText('MISSION & VISION')
  await expect(section.locator('#mission-vision-heading')).toContainText('Purpose for today.')
  await expect(section.locator('#mission-vision-heading')).toContainText('Vision for')
  await expect(section.locator('#mission-vision-heading')).toContainText('what’s next.')
  await expect(section.locator('.mv-intro-copy')).toContainText('Our mission defines how we create today.')

  // STRICT RULE: Absolutely NO images inside the Mission & Vision section
  const images = section.locator('img')
  await expect(images).toHaveCount(0)

  // Verify Zone 01: OUR MISSION
  const missionZone = section.locator('.mv-zone-mission')
  await expect(missionZone).toBeVisible()
  await expect(missionZone.locator('.mv-zone-num')).toHaveText('01')
  await expect(missionZone.locator('.mv-zone-tag')).toHaveText('OUR MISSION')
  await expect(missionZone.locator('.mv-statement')).toContainText('To create experiences that bring people together and leave a lasting impression.')
  await expect(missionZone.locator('.mv-highlight-italic')).toHaveText('lasting impression.')
  await expect(missionZone.locator('.mv-supporting-copy')).toContainText('We create meaningful experiences shaped by purpose')

  // Verify Zone 02: OUR VISION
  const visionZone = section.locator('.mv-zone-vision')
  await expect(visionZone).toBeVisible()
  await expect(visionZone.locator('.mv-zone-num')).toHaveText('02')
  await expect(visionZone.locator('.mv-zone-tag')).toHaveText('OUR VISION')
  await expect(visionZone.locator('.mv-statement')).toContainText('To shape extraordinary experiences that connect people, ideas and possibility.')
  await expect(visionZone.locator('.mv-highlight-italic')).toHaveText('possibility.')
  await expect(visionZone.locator('.mv-supporting-copy')).toContainText('We envision a future where thoughtful experiences build stronger connections')

  // Verify Central Divider NOW / NEXT Concept
  const divider = section.locator('.mv-central-divider')
  await expect(divider.locator('.mv-now-next-badge')).toContainText('NOW')
  await expect(divider.locator('.mv-now-next-badge')).toContainText('NEXT')

  // Verify Architectural Watermark & Oversized Numbers
  await expect(section.locator('.mv-bg-watermark')).toHaveText('WHAT’S NEXT')
  await expect(missionZone.locator('.mv-numeral-bg')).toHaveText('01')
  await expect(visionZone.locator('.mv-numeral-bg')).toHaveText('02')

  // Verify Bottom Signature & CTA
  await expect(section.locator('.mv-brand-signature')).toContainText('PEOPLE / PURPOSE / POSSIBILITY')
  const cta = section.locator('.mv-cta-link')
  await expect(cta).toBeVisible()
  await expect(cta).toContainText('OUR VALUES')

  // Responsive verification & screenshot captures
  for (const [width, height] of [[1440, 900], [1024, 800], [768, 1024], [390, 844]]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => document.fonts.ready)
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeInViewport()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

    // Hide fixed nav for clean element screenshot
    await page.evaluate(() => {
      const nav = document.querySelector('.hero-nav')
      if (nav) nav.style.display = 'none'
    })
    await section.screenshot({ path: `artifacts/mission-vision-${width}.png` })
    await page.evaluate(() => {
      const nav = document.querySelector('.hero-nav')
      if (nav) nav.style.display = ''
    })
  }

  expect(errors).toEqual([])
})
