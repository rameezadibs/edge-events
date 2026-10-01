import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: { baseURL: 'http://localhost:4175', channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true },
  webServer: { command: 'npm run dev -- --port 4175 --strictPort', url: 'http://localhost:4175', reuseExistingServer: !process.env.CI },
  reporter: 'list',
})
