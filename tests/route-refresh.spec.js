import { test, expect } from '@playwright/test'

const routes = [
  { path: '/', titleExpected: /The Edge Events/i },
  { path: '/about', titleExpected: /About Us/i },
  { path: '/services', titleExpected: /Services/i },
  { path: '/services/corporate-events', titleExpected: /Corporate Events/i },
  { path: '/services/social-celebrations', titleExpected: /Social Celebrations/i },
  { path: '/services/travel-expeditions', titleExpected: /Travel & Expeditions/i },
]

test.describe('Vercel SPA Route Refresh Verification', () => {
  for (const route of routes) {
    test(`Direct load and reload on ${route.path} succeeds without error`, async ({ page }) => {
      const pageErrors = []
      page.on('pageerror', (err) => pageErrors.push(err.message))

      // Direct load
      const response = await page.goto(route.path)
      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(route.titleExpected)
      expect(pageErrors).toEqual([])

      // Page reload / refresh
      const reloadResponse = await page.reload()
      expect(reloadResponse?.status()).toBe(200)
      await expect(page).toHaveTitle(route.titleExpected)
      expect(pageErrors).toEqual([])
    })
  }
})
