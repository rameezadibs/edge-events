import { test, expect } from '@playwright/test'

test('testimonials responsive layout, single-voice presentation, navigation, and interview dialog', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const testimonialsSection = page.locator('#testimonials')
  await expect(testimonialsSection).toBeVisible()
  await testimonialsSection.scrollIntoViewIfNeeded()

  // Verify intro area labels & typography
  await expect(testimonialsSection.locator('.testimonials-eyebrow')).toHaveText('CLIENT STORIES')
  await expect(testimonialsSection.locator('#testimonials-heading')).toContainText('The moments end.')
  await expect(testimonialsSection.locator('#testimonials-heading em')).toHaveText('The impression stays.')

  // Verify initial slide (Voice 01)
  await expect(testimonialsSection.locator('.counter-current')).toHaveText('01')
  await expect(testimonialsSection.locator('.counter-total')).toHaveText('05')
  await expect(testimonialsSection.locator('.author-name')).toHaveText('AMINA AL MANSOORI')
  await expect(testimonialsSection.locator('.quote-statement')).toContainText('They understood exactly what we wanted')

  // Verify navigation to Voice 02
  const nextBtn = testimonialsSection.locator('.btn-next')
  await nextBtn.click()

  await expect(testimonialsSection.locator('.counter-current')).toHaveText('02')
  await expect(testimonialsSection.locator('.author-name')).toHaveText('TARIQ & LAYLA HASHIMI')
  await expect(testimonialsSection.locator('.quote-statement')).toContainText('The Edge handled every detail seamlessly')

  // Verify navigation back to Voice 01
  const prevBtn = testimonialsSection.locator('.btn-prev')
  await prevBtn.click()
  await expect(testimonialsSection.locator('.counter-current')).toHaveText('01')
  await expect(testimonialsSection.locator('.author-name')).toHaveText('AMINA AL MANSOORI')

  // Verify Full Story Interview Modal
  const readStoryBtn = testimonialsSection.locator('.read-story-btn').first()
  await readStoryBtn.click()

  const storyDialog = page.locator('.testimonial-story-dialog')
  await expect(storyDialog).toBeVisible()
  await expect(storyDialog.locator('#story-modal-title')).toHaveText('AMINA AL MANSOORI')
  await expect(storyDialog.locator('.case-narrative')).toContainText('Organizing an assembly of 1,200 international ministers')

  // Close modal via close button
  await storyDialog.locator('.story-modal-close').click()
  await expect(storyDialog).not.toBeVisible()

  // Verify Bottom-Left CTA
  const readMoreCta = testimonialsSection.locator('.read-more-cta')
  await expect(readMoreCta).toContainText('READ MORE CLIENT STORIES')

  // Test across responsive viewports
  for (const [width, height, name] of [
    [1536, 1024, 'desktop'],
    [820, 1180, 'tablet'],
    [390, 844, 'mobile'],
    [320, 740, 'small-mobile'],
  ]) {
    await page.setViewportSize({ width, height })
    await testimonialsSection.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)

    // Check images loaded
    await expect.poll(() => testimonialsSection.locator('img').evaluateAll(images => 
      images.every(img => img.complete && img.naturalWidth > 0)
    )).toBe(true)

    // Verify no horizontal overflow
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await testimonialsSection.screenshot({ path: `artifacts/testimonials-${name}.png`, animations: 'disabled' })
  }

  expect(errors).toEqual([])
})
