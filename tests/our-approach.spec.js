import { test, expect } from '@playwright/test'

test('Our Approach section on About page: editorial layout, 4 principles, no images, responsive verification', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/about')

  const approach = page.locator('#our-approach')
  await expect(approach).toBeVisible()

  // Verify section intro & typography
  await expect(approach.locator('.approach-label')).toHaveText('OUR APPROACH')
  await expect(approach.locator('#approach-heading')).toContainText('Thoughtfully planned.')
  await expect(approach.locator('#approach-heading')).toContainText('Beautifully delivered.')
  await expect(approach.locator('.approach-intro-text')).toContainText('We believe exceptional experiences are never accidental.')

  // STRICT RULE: Absolutely NO images inside the Our Approach section
  const images = approach.locator('img')
  await expect(images).toHaveCount(0)

  // Verify all 4 principles are rendered with correct numbers & titles
  const items = approach.locator('.approach-item')
  await expect(items).toHaveCount(4)

  const expectedPrinciples = [
    { num: '01', title: '01 — LISTEN FIRST', desc: 'We begin by understanding your goals, audience and vision.' },
    { num: '02', title: '02 — SHAPE THE EXPERIENCE', desc: 'We turn ideas into a thoughtful creative direction and event journey.' },
    { num: '03', title: '03 — PERFECT THE DETAILS', desc: 'From planning to coordination, every element is carefully considered.' },
    { num: '04', title: '04 — DELIVER THE MOMENT', desc: 'We execute seamlessly so the experience feels effortless and memorable.' },
  ]

  for (let i = 0; i < expectedPrinciples.length; i++) {
    const item = items.nth(i)
    await expect(item.locator('.approach-badge')).toHaveText(expectedPrinciples[i].num)
    await expect(item.locator('.approach-item-title')).toHaveText(expectedPrinciples[i].title)
    await expect(item.locator('.approach-item-desc')).toHaveText(expectedPrinciples[i].desc)
  }

  // Verify brand statements
  await expect(approach.locator('.approach-manifesto-micro')).toContainText('PEOPLE / PURPOSE / PRECISION')
  await expect(approach.locator('.approach-brand-statement')).toContainText('LISTEN / CREATE / REFINE / DELIVER')

  // Verify CTA
  const cta = approach.locator('.approach-cta')
  await expect(cta).toBeVisible()
  await expect(cta).toContainText('HOW WE WORK')

  // Responsive verification & screenshot captures
  for (const [width, height] of [[1440, 900], [1024, 800], [768, 1024], [390, 844]]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => document.fonts.ready)
    await approach.scrollIntoViewIfNeeded()
    await expect(approach).toBeInViewport()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.evaluate(() => {
      const nav = document.querySelector('.hero-nav')
      if (nav) nav.style.display = 'none'
    })
    await approach.screenshot({ path: `artifacts/our-approach-${width}.png` })
    await page.evaluate(() => {
      const nav = document.querySelector('.hero-nav')
      if (nav) nav.style.display = ''
    })
  }

  expect(errors).toEqual([])
})
