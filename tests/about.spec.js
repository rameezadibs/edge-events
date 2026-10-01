import { test, expect } from '@playwright/test'

test('Who We Are composition, responsive flow and story control', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const [width, height, name] of [[1440, 1080, 'desktop'], [820, 1180, 'tablet'], [390, 844, 'mobile'], [320, 740, 'small-mobile']]) {
    await page.setViewportSize({ width, height })
    await page.locator('#about').scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    await expect.poll(() => page.locator('#about img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
    await expect(page.locator('#about h2')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.locator('#about').screenshot({ path: `artifacts/about-${name}.png`, animations: 'disabled' })
  }
  await page.getByRole('button', { name: 'Discover our story' }).click()
  await expect(page.getByRole('dialog', { includeHidden: false })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Our story.' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Discover our story' })).toBeFocused()
  expect(errors).toEqual([])
})
