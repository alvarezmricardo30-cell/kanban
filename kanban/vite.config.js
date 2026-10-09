import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const stripModuleType = {
  name: 'strip-module-type',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace('type="module" crossorigin ', '')
  },
}

export default defineConfig({
  base: './',
  plugins: [react(), stripModuleType],
  build: {
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
})