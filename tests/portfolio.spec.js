import { test, expect } from '@playwright/test'

test.describe('The Edge Events — Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  test('has correct SEO title, meta description, and single H1', async ({ page }) => {
    // 1. Title verification
    await expect(page).toHaveTitle(/Event Portfolio Dubai | The Edge Events/i)

    // 2. Meta description verification
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      'content',
      /Explore corporate events, private celebrations and curated experiences/i
    )

    // 3. Exactly one H1 for semantic SEO
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)
    await expect(h1Elements.first()).toHaveText(
      /Event Portfolio & Selected Experiences/i
    )
  })

  test('renders Section 01: Portfolio Hero with editorial elements and real photo', async ({ page }) => {
    const hero = page.locator('.portfolio-hero')
    await expect(hero).toBeVisible()

    // Hero kicker
    await expect(hero.locator('.hero-label')).toHaveText('OUR WORK')

    // Visual headline rows
    const headline = hero.locator('.hero-headline')
    await expect(headline).toContainText('Experiences')
    await expect(headline).toContainText('we’ve brought')
    await expect(headline).toContainText('to life.')

    // Teal italic highlight
    const tealHighlight = hero.locator('.headline-teal-italic')
    await expect(tealHighlight).toHaveText('to life.')

    // Supporting copy
    const desc = hero.locator('.portfolio-hero-desc')
    await expect(desc).toContainText('A curated look at the corporate events')

    // Real event documentary photo
    const heroImg = hero.locator('.hero-documentary-img')
    await expect(heroImg).toBeVisible()
    await expect(heroImg).toHaveAttribute('src', '/images/services-production.jpg')
  })

  test('renders Section 02: Clean text filter bar and filters smoothly', async ({ page }) => {
    const filterNav = page.locator('.portfolio-filter-nav')
    await expect(filterNav).toBeVisible()

    const allBtn = page.locator('#tab-all')
    const corpBtn = page.locator('#tab-corporate')
    const socialBtn = page.locator('#tab-social')
    const travelBtn = page.locator('#tab-travel')
    const brandBtn = page.locator('#tab-brand')

    await expect(allBtn).toBeVisible()
    await expect(corpBtn).toBeVisible()
    await expect(socialBtn).toBeVisible()
    await expect(travelBtn).toBeVisible()
    await expect(brandBtn).toBeVisible()

    // Initially ALL is active
    await expect(allBtn).toHaveAttribute('aria-selected', 'true')

    // Click CORPORATE EVENTS
    await corpBtn.click()
    await expect(corpBtn).toHaveAttribute('aria-selected', 'true')
    await expect(allBtn).toHaveAttribute('aria-selected', 'false')

    // Verify grid cards updated
    const countTag = page.locator('.portfolio-count-tag')
    await expect(countTag).toContainText('4 PROJECTS')

    // Switch to SOCIAL CELEBRATIONS
    await socialBtn.click()
    await expect(countTag).toContainText('3 PROJECTS')

    // Back to ALL
    await allBtn.click()
    await expect(countTag).toContainText('12 PROJECTS')
  })

  test('renders Section 03: Main Project Grid with uniform clean pictures without names', async ({ page }) => {
    const gridSection = page.locator('.portfolio-grid-section')
    await expect(gridSection).toBeVisible()

    const cards = gridSection.locator('.project-card-editorial')
    await expect(cards).toHaveCount(12)

    // Check first card is a clean uniform image card without text names
    const firstCard = cards.first()
    const firstImg = firstCard.locator('.project-card-img')
    await expect(firstImg).toBeVisible()

    // Ensure no project title or category text is rendered below image
    await expect(firstCard.locator('.project-card-title')).toHaveCount(0)
    await expect(firstCard.locator('.project-card-category')).toHaveCount(0)

    // Click first card image to view monograph details in modal
    await firstCard.locator('.project-card-image-wrap').click()
    const modal = page.locator('.portfolio-modal-window')
    await expect(modal).toBeVisible()
    await expect(modal.locator('#modal-project-title')).toContainText('DP World Executive Leadership Summit')

    // Escape closes modal
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('renders Section 05: Brand Disciplines & Highlights typography strip', async ({ page }) => {
    const highlights = page.locator('.portfolio-highlights-section')
    await expect(highlights).toBeVisible()

    const typographyStrip = highlights.locator('.pillars-large-typography')
    await expect(typographyStrip).toContainText('STRATEGY')
    await expect(typographyStrip).toContainText('CREATIVITY')
    await expect(typographyStrip).toContainText('PRODUCTION')
    await expect(typographyStrip).toContainText('EXPERIENCE')

    const pillarCards = highlights.locator('.pillar-card')
    await expect(pillarCards).toHaveCount(4)
  })

  test('renders Section 05: Final Contact CTA', async ({ page }) => {
    const finalCTA = page.locator('.portfolio-final-cta-section')
    await expect(finalCTA).toBeVisible()
    await expect(finalCTA.locator('.final-cta-eyebrow')).toHaveText('INITIATE AN EXPERIENCE')
    await expect(finalCTA.locator('.final-cta-title')).toContainText('Have something in mind?')
    await expect(finalCTA.locator('.teal-serif-italic')).toHaveText('bring it to life.')
    await expect(finalCTA.locator('.final-primary-btn')).toContainText('START A CONVERSATION')
    await expect(finalCTA.locator('.final-secondary-btn')).toContainText('VIEW OUR SERVICES')
  })
})
