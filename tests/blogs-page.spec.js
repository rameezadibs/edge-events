import { test, expect } from '@playwright/test'

test('Blogs index page and individual article page have dedicated URLs, structured editorial layout, and interactive features', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })

  // 1. Navigate from homepage via Navbar
  await page.goto('/')
  const blogsNav = page.getByRole('link', { name: 'Blogs', exact: true })
  await expect(blogsNav).toBeVisible()
  await blogsNav.click()

  // Verify URL is /blogs
  await expect(page).toHaveURL(/\/blogs$/)

  // Verify page reload preserves title and route
  await page.reload()
  await expect(page).toHaveTitle(/Event Insights & Ideas Dubai \| The Edge Events/)
  await expect(blogsNav).toHaveAttribute('aria-current', 'page')

  // Verify Single Semantic H1 exists and has correct text
  const h1 = page.locator('h1#blogs-hero-heading')
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Ideas, experiences')
  await expect(h1).toContainText('and stories from')
  await expect(h1).toContainText('behind the scenes.')

  // Verify Hero Editorial Block
  await expect(page.getByText('EVENTS', { exact: true })).toBeVisible()
  await expect(page.getByText('PEOPLE', { exact: true })).toBeVisible()
  await expect(page.getByText('PLACES', { exact: true })).toBeVisible()
  await expect(page.getByText('IDEAS', { exact: true })).toBeVisible()

  // Verify Category Tabs
  const categories = [
    'ALL',
    'CORPORATE EVENTS',
    'SOCIAL CELEBRATIONS',
    'TRAVEL & EXPERIENCES',
    'EVENT PRODUCTION',
    'EVENT TRENDS',
    'PLANNING TIPS',
  ]
  for (const cat of categories) {
    await expect(page.getByRole('tab', { name: cat })).toBeVisible()
  }

  // Verify Featured Article Section
  await expect(page.getByText('FEATURED STORY')).toBeVisible()
  const featuredHeading = page.locator('#featured-heading')
  await expect(featuredHeading).toBeVisible()
  await expect(featuredHeading).toContainText('How Thoughtful Event Design Creates Stronger Brand Experiences')
  await expect(page.getByRole('link', { name: /READ ARTICLE/i }).first()).toBeVisible()

  // Verify Latest Insights Section
  await expect(page.locator('#latest-insights-title')).toHaveText('Latest Insights')
  const latestCards = page.locator('.latest-insights-grid .blog-card')
  await expect(latestCards).toHaveCount(3)

  // Verify All Stories Section & Search Input
  await expect(page.locator('#all-stories-heading')).toHaveText('All Stories')
  const searchInput = page.locator('#blog-search-input')
  await expect(searchInput).toBeVisible()

  // Test Search Filter
  await searchInput.fill('desert')
  await expect(page.locator('.blog-filter-status-bar')).toBeVisible()
  const searchResults = page.locator('.blog-main-grid .blog-card')
  expect(await searchResults.count()).toBeGreaterThanOrEqual(1)

  // Clear Search
  await page.locator('.search-clear-btn').click()
  await expect(searchInput).toHaveValue('')

  // Test Category Filter
  await page.getByRole('tab', { name: 'SOCIAL CELEBRATIONS' }).click()
  await expect(page.getByRole('tab', { name: 'SOCIAL CELEBRATIONS' })).toHaveAttribute('aria-selected', 'true')
  // Featured & Latest sections are hidden during filtered view to maintain clean browsing focus
  await expect(page.locator('#featured-story')).toHaveCount(0)

  // Reset to ALL
  await page.getByRole('tab', { name: 'ALL' }).click()
  await expect(page.locator('#featured-story')).toBeVisible()

  // Verify Section 07 Insights CTA
  await expect(page.locator('#insights-cta-heading')).toHaveText('Stay inspired.')
  await expect(page.getByRole('link', { name: /FOLLOW OUR LATEST STORIES ON INSTAGRAM/i })).toBeVisible()

  // Verify Section 08 Final Contact CTA
  await expect(page.locator('#blog-cta-heading')).toBeVisible()
  await expect(page.getByRole('link', { name: 'START A CONVERSATION' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'EXPLORE OUR SERVICES' })).toBeVisible()

  // Verify Responsive Viewports have no horizontal scroll overflow
  for (const [width, height] of [[1440, 900], [820, 1180], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => document.fonts.ready)
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }

  // Capture full desktop screenshot of /blogs
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.screenshot({ path: 'artifacts/blogs-page-desktop.png', fullPage: true })

  // 2. Test Individual Article Page
  await page.goto('/blogs/how-thoughtful-event-design-creates-stronger-brand-experiences')
  await expect(page).toHaveURL(/\/blogs\/how-thoughtful-event-design-creates-stronger-brand-experiences$/)
  await expect(page).toHaveTitle(/How Thoughtful Event Design Creates Stronger Brand Experiences \| The Edge Events/)

  // Verify Breadcrumbs
  const breadcrumbNav = page.locator('.article-breadcrumbs')
  await expect(breadcrumbNav).toBeVisible()
  await expect(breadcrumbNav.getByRole('link', { name: 'Home' })).toBeVisible()
  await expect(breadcrumbNav.getByRole('link', { name: 'Blogs' })).toBeVisible()

  // Verify Article H1
  const articleH1 = page.locator('.article-main-h1')
  await expect(articleH1).toHaveText('How Thoughtful Event Design Creates Stronger Brand Experiences')

  // Verify Article Body, Quote, and Service CTA
  await expect(page.locator('.article-pullquote')).toBeVisible()
  await expect(page.locator('.article-service-cta-card')).toBeVisible()
  await expect(page.locator('#related-articles-title')).toHaveText('Related Stories')

  // Capture individual article screenshot
  await page.screenshot({ path: 'artifacts/blog-article-desktop.png', fullPage: true })

  expect(errors).toEqual([])
})
