import { test, expect } from '@playwright/test'

test('selected works responsive layout, editorial presentation, and monograph dialog', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  // Navigate to Our Work via main navigation
  const ourWorkLink = page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Our Work' })
  await expect(ourWorkLink).toBeVisible()
  await ourWorkLink.click()

  const selectedWorksSection = page.locator('#our-work')
  await expect(selectedWorksSection).toBeVisible()

  // Verify intro heading, eyebrow, and subline
  await expect(selectedWorksSection.locator('.works-eyebrow')).toHaveText('SELECTED WORKS')
  await expect(selectedWorksSection.locator('#selected-works-heading')).toContainText('Experiences')
  await expect(selectedWorksSection.locator('#selected-works-heading em')).toHaveText('worth remembering.')
  await expect(selectedWorksSection.locator('.works-intro-subline')).toContainText('A selection of corporate events')
  await expect(selectedWorksSection.locator('.view-all-cta')).toContainText('VIEW ALL PROJECTS')

  // Verify all 4 projects rendered
  const projectItems = selectedWorksSection.locator('.selected-project-item')
  await expect(projectItems).toHaveCount(4)

  // Verify project titles
  await expect(projectItems.nth(0).locator('.project-title')).toContainText('Global Leadership Summit')
  await expect(projectItems.nth(1).locator('.project-title')).toContainText('Private Celebration')
  await expect(projectItems.nth(2).locator('.project-title')).toContainText('Desert Experience')
  await expect(projectItems.nth(3).locator('.project-title')).toContainText('Luxury Product Launch')

  // Verify categories and numbers
  await expect(projectItems.nth(0).locator('.project-number')).toHaveText('01')
  await expect(projectItems.nth(0).locator('.project-category')).toHaveText('CORPORATE EVENT')
  await expect(projectItems.nth(1).locator('.project-number')).toHaveText('02')
  await expect(projectItems.nth(1).locator('.project-category')).toHaveText('SOCIAL CELEBRATION')
  await expect(projectItems.nth(2).locator('.project-number')).toHaveText('03')
  await expect(projectItems.nth(2).locator('.project-category')).toHaveText('DESTINATION EXPERIENCE')
  await expect(projectItems.nth(3).locator('.project-number')).toHaveText('04')
  await expect(projectItems.nth(3).locator('.project-category')).toHaveText('BRAND EXPERIENCE')

  // Test across responsive viewports
  for (const [width, height, name] of [
    [1536, 1024, 'desktop'],
    [820, 1180, 'tablet'],
    [390, 844, 'mobile'],
    [320, 740, 'small-mobile']
  ]) {
    await page.setViewportSize({ width, height })
    await selectedWorksSection.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    
    // Check all images loaded
    await expect.poll(() => selectedWorksSection.locator('img').evaluateAll(images => 
      images.every(img => img.complete && img.naturalWidth > 0)
    )).toBe(true)

    // No horizontal overflow
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await selectedWorksSection.screenshot({ path: `artifacts/selected-works-${name}.png`, animations: 'disabled' })
  }

  // Test Quick View Monograph Modal
  const viewProjectCta = projectItems.nth(0).locator('.project-cta')
  await viewProjectCta.click()
  const modal = page.locator('.project-monograph-dialog')
  await expect(modal).toBeVisible()
  await expect(modal.locator('#monograph-title')).toHaveText('Global Leadership Summit')
  await expect(modal.locator('.monograph-spec')).toHaveText('1,000+ guests')

  // Close modal via close button
  await modal.locator('.monograph-close-btn').click()
  await expect(modal).not.toBeVisible()

  expect(errors).toEqual([])
})
