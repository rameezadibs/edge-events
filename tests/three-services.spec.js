import { test, expect } from '@playwright/test'

test('three services layout, artwork and accessible details', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/services')
  await page.getByRole('link', { name: 'Explore what we do' }).click()
  const section = page.locator('#three-services')
  await expect(section).toBeInViewport()
  await expect(section.locator('article')).toHaveCount(3)
  expect(await page.evaluate(async () => { const image = new Image(); image.src = '/images/three-services-reference.png'; await image.decode(); return image.naturalWidth })).toBe(1672)
  for (const width of [1672, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await section.scrollIntoViewIfNeeded()
    const columns = await section.locator('article').evaluateAll(nodes => nodes.map(node => ({ x: node.getBoundingClientRect().x, y: node.getBoundingClientRect().y })))
    if (width > 700) expect(Math.max(...columns.map(n => n.y)) - Math.min(...columns.map(n => n.y))).toBeLessThan(2)
    else expect(new Set(columns.map(n => n.x)).size).toBe(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await section.screenshot({ path: `artifacts/three-services-${width}.png` })
  }
  for (const title of ['Corporate Events', 'Social Celebrations', 'Travel & Expeditions']) {
    const trigger = page.getByRole('button', { name: `Discover more about ${title}` })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading')).toHaveText(title)
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
  }
})
