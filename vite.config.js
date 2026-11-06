import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteFormApiPlugin } from './server/vitePluginApi.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), viteFormApiPlugin()],
  server: {
    port: 5101,
  },
})
