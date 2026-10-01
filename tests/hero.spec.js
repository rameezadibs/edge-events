import { test, expect } from '@playwright/test'

test('desktop composition, images, navigation and controls', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1536, height: 1024 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.hero-panel')).toHaveCount(4)
  await expect.poll(() => page.locator('.panel-image').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
  await page.waitForTimeout(2500)
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true })
  await page.getByRole('button', { name: 'Next experience' }).click()
  await expect(page.getByRole('button', { name: 'Show Social Celebrations' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Previous experience' }).click()
  await expect(page.getByRole('button', { name: 'Show Corporate Events' })).toHaveAttribute('aria-pressed', 'true')
  expect(errors).toEqual([])
})

test('mobile images, swipe, CTA and viewport fit', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(2500)
  await expect(page.locator('.desktop-panels')).not.toBeVisible()
  await expect(page.getByRole('button', { name: /Plan An Event|Plan an event/i })).toBeVisible()
  await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true })
  await page.locator('.hero').evaluate(el => {
    const touch = (x) => new Touch({ identifier: 1, target: el, clientX: x, clientY: 300 })
    el.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [touch(320)] }))
    el.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [touch(80)] }))
  })
  await expect(page.getByRole('button', { name: 'Show Social Celebrations' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: /Plan An Event|Plan an event/i }).click()
  await expect(page.getByRole('heading', { name: 'Let’s make it extraordinary.' })).toBeVisible()
  await page.keyboard.press('Escape')
  for (const [width, height] of [[320, 640], [768, 1024], [1024, 768], [1440, 900]]) {
    await page.setViewportSize({ width, height })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.locator('.hero').evaluate(el => el.clientHeight <= innerHeight)).toBe(true)
  }
})
