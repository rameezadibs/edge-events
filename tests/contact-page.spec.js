import { test, expect } from '@playwright/test'

test('Contact page has dedicated URL, correct structure, responsive layout, and interactive form', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })

  // 1. Navigate from homepage via Navbar
  await page.goto('/')
  const contactNav = page.getByRole('link', { name: 'Contact', exact: true })
  await expect(contactNav).toBeVisible()
  await contactNav.click()

  // Verify URL is /contact
  await expect(page).toHaveURL(/\/contact$/)

  // Verify page reload preserves title and route
  await page.reload()
  await expect(page).toHaveTitle(/Contact The Edge Events \| Event Company Dubai/)
  await expect(contactNav).toHaveAttribute('aria-current', 'page')

  // Verify Single Semantic H1 exists and has correct text
  const h1 = page.locator('h1#contact-hero-heading')
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Let’s create')
  await expect(h1).toContainText('something worth')
  await expect(h1).toContainText('remembering.')

  // Verify Side Detail Block
  await expect(page.getByText('PLAN AN EXPERIENCE')).toBeVisible()
  await expect(page.getByText('Corporate Events', { exact: true })).toBeVisible()
  await expect(page.getByText('Social Celebrations', { exact: true })).toBeVisible()

  // Verify Direct Contact info
  await expect(page.getByRole('link', { name: 'collin@theedgeevents.co' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: '+971 50 503 5848' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'WHATSAPP US' })).toBeVisible()

  // Verify Section 03: UAE Presence
  await expect(page.getByRole('heading', { name: /Dubai based\.\s+Built to go further\./i })).toBeVisible()
  await expect(page.getByText('DUBAI, UAE — SERVING PROJECTS ACROSS THE UAE')).toBeVisible()

  // Verify Section 04: Quick Contact
  await expect(page.getByRole('heading', { name: 'START AN EVENT' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'WORK WITH US' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'GENERAL ENQUIRY' })).toBeVisible()
  await expect(page.getByText('01', { exact: true })).toBeVisible()
  await expect(page.getByText('02', { exact: true })).toBeVisible()
  await expect(page.getByText('03', { exact: true })).toBeVisible()

  // Verify Responsive Viewports have no horizontal scroll overflow
  for (const [width, height] of [[1440, 900], [820, 1180], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => document.fonts.ready)
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }

  // Restore desktop size for form test and capture screenshot
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.screenshot({ path: 'artifacts/contact-page-desktop.png', fullPage: true })

  // Form Validation: submit empty form
  const submitBtn = page.locator('#contact-form-submit-btn')
  await submitBtn.click()

  // Inline errors should be visible
  await expect(page.locator('#error-fullName')).toBeVisible()
  await expect(page.locator('#error-email')).toBeVisible()
  await expect(page.locator('#error-eventType')).toBeVisible()
  await expect(page.locator('#error-message')).toBeVisible()

  // Fill in valid details
  await page.locator('#field-fullName').fill('Eleanor Vance')
  await page.locator('#field-email').fill('eleanor@vancecorp.ae')
  await page.locator('#field-phone').fill('+971 50 123 4567')
  await page.locator('#field-company').fill('Vance Enterprises')
  await page.locator('#field-eventType').selectOption('Corporate Event')
  await page.locator('#field-location').fill('Dubai Marina')
  await page.locator('#field-message').fill('We are planning our annual summit and gala dinner for 180 delegates.')

  // Submit valid form
  await submitBtn.click()

  // Verify success confirmation
  await expect(page.getByRole('heading', { name: 'Thank you.' })).toBeVisible()
  await expect(page.getByText('Your enquiry has been received.')).toBeVisible()

  expect(errors).toEqual([])
})
