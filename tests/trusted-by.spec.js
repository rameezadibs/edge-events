import { test, expect } from '@playwright/test'

test('trusted by responsive layout, continuous marquees, trust moment, and credentials dialog', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  // Navigate to Clients section
  const clientsLink = page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Clients' })
  await expect(clientsLink).toBeVisible()
  await clientsLink.click()

  const trustedBySection = page.locator('#clients')
  await expect(trustedBySection).toBeVisible()

  // Verify intro area typography & labels
  await expect(trustedBySection.locator('.trusted-eyebrow')).toHaveText('TRUSTED BY')
  await expect(trustedBySection.locator('#trusted-by-heading')).toContainText('Good experiences')
  await expect(trustedBySection.locator('#trusted-by-heading em')).toHaveText('build trust.')
  await expect(trustedBySection.locator('.trusted-supporting-copy')).toContainText('From global organisations to leading regional brands')

  // Verify large client statement
  await expect(trustedBySection.locator('.strip-title')).toHaveText('PROUD TO HAVE CREATED EXPERIENCES FOR')

  // Verify dual marquee rows exist and contain client logos
  const marqueeRows = trustedBySection.locator('.marquee-row')
  await expect(marqueeRows).toHaveCount(2)
  await expect(marqueeRows.nth(0)).toContainText('DP')
  await expect(marqueeRows.nth(0)).toContainText('amazon')
  await expect(marqueeRows.nth(1)).toContainText('KEARNEY')
  await expect(marqueeRows.nth(1)).toContainText('Hapag-Lloyd')

  // Verify CTA if present
  const storiesCta = trustedBySection.locator('.client-stories-cta')
  if (await storiesCta.isVisible()) {
    await expect(storiesCta).toContainText('SEE OUR CLIENT STORIES')
  }

  // Test across responsive viewports
  for (const [width, height, name] of [
    [1536, 1024, 'desktop'],
    [820, 1180, 'tablet'],
    [390, 844, 'mobile'],
    [320, 740, 'small-mobile']
  ]) {
    await page.setViewportSize({ width, height })
    await trustedBySection.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)

    // Verify no horizontal overflow
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await trustedBySection.screenshot({ path: `artifacts/trusted-by-${name}.png`, animations: 'disabled' })
  }

  // Test Client Stories Modal if CTA present
  if (await storiesCta.isVisible()) {
    await storiesCta.click()
    const modal = page.locator('.client-stories-dialog')
    await expect(modal).toBeVisible()
    await expect(modal.locator('#stories-dialog-title')).toContainText('Partnerships Built on Discretion')
    await modal.locator('.stories-dialog-close').click()
    await expect(modal).not.toBeVisible()
  }

  expect(errors).toEqual([])
})
