import { test, expect } from '@playwright/test'

test('About has its own URL, reference hero, and working navigation', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)
  await page.reload()
  await expect(page).toHaveTitle('About Us — The Edge Events')
  await expect(page.locator('.hero')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'page')
  for (const [width, height] of [[1440, 1000], [820, 1180], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('h1')).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect.poll(() => page.locator('.impact-photo').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
    await page.locator('.impact-hero').screenshot({ path: `artifacts/about-page-${width}.png` })
  }
  await page.getByRole('link', { name: 'Our story', exact: true }).click()
  await expect(page).toHaveURL(/\/about#our-story$/)
  await expect(page.locator('#our-story')).toBeInViewport()
  await page.getByRole('link', { name: 'The Edge Events home' }).click()
  await expect(page.locator('.hero')).toBeVisible()
  await expect(page.locator('.impact-hero')).toHaveCount(0)
  expect(errors).toEqual([])
})


