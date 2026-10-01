import { test, expect } from '@playwright/test'

test('services responsive layouts, navigation and detail dialogs', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'What We Do' }).click()
  await expect(page.locator('#services')).toBeInViewport()
  for (const [width, height, columns, name] of [[1536, 1024, 4, 'desktop'], [820, 1180, 2, 'tablet'], [390, 844, 1, 'mobile'], [320, 740, 1, 'small-mobile']]) {
    await page.setViewportSize({ width, height })
    await page.locator('#services').scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    await expect.poll(() => page.locator('#services img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
    expect(await page.locator('.services-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)).toBe(columns)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.locator('#services').screenshot({ path: `artifacts/services-${name}.png`, animations: 'disabled' })
  }
  await page.getByRole('link', { name: 'View all services' }).click()
  await expect(page.locator('#service-panels')).toBeInViewport()
  for (const title of ['Corporate Events', 'Social Celebrations', 'Experiences & Travel', 'Event Production']) {
    const link = page.getByRole('link', { name: `Explore ${title}`, exact: true })
    await link.click()
    await expect(page.getByRole('dialog', { name: title, exact: true })).toBeVisible()
    await expect(page.getByRole('dialog', { name: title, exact: true }).getByRole('heading', { name: title, exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(link).toBeFocused()
  }
  expect(errors).toEqual([])
})
