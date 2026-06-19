import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/vocab-quiz/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})
