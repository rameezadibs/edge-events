import { test, expect } from '@playwright/test'

test('services route works directly and scales to mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/services')
  await expect(page).toHaveTitle('Our Services — The Edge Events')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Experiences,designed withintention.')
  await expect(page.getByRole('link', { name: 'Explore what we do' })).toHaveAttribute('href', '#three-services')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `artifacts/services-page-${width}.png`, fullPage: true })
  }
  await page.getByRole('link', { name: 'Explore what we do' }).click()
  await expect(page.locator('#three-services')).toBeInViewport()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.getByRole('link', { name: 'What We Do', exact: true }).click()
  await expect(page).toHaveURL(/\/services$/)
})


