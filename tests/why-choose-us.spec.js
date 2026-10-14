import { test, expect } from '@playwright/test'

test('Why Choose Us remains readable across layouts and links to the approach', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/about')
  const section = page.locator('#why-choose-us')
  await expect(section.locator('li')).toHaveCount(5)
  for (const width of [1774, 1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    await section.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const overlaps = await section.locator('.why-reason').evaluateAll(items => items.some((item, i) => {
      const box = item.getBoundingClientRect()
      const next = items[i + 1]?.getBoundingClientRect()
      return next && box.bottom > next.top
    }))
    expect(overlaps).toBe(false)
    await page.locator('.hero-nav').evaluate(nav => { nav.style.visibility = 'hidden' })
    await section.screenshot({ path: `artifacts/why-choose-us-${width}.png` })
  }
  await section.getByRole('link', { name: 'Our approach' }).click()
  await expect(page).toHaveURL(/#our-approach$/)
  await expect(page.locator('#our-approach')).toBeInViewport()
  expect(errors).toEqual([])
})
