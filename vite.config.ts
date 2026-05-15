import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  base: '/dodoco-memo/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: '嘟嘟可备忘录',
        short_name: '嘟嘟可',
        description: '和可莉一起记录每一天 ✨',
        theme_color: '#D4443B',
        background_color: '#FFF8F0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3CradialGradient id='g' cx='40%25' cy='40%25'%3E%3Cstop offset='0%25' stop-color='%23F06050'/%3E%3Cstop offset='100%25' stop-color='%23C0392B'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='26' fill='url(%23g)'/%3E%3Ccircle cx='68' cy='32' r='26' fill='url(%23g)'/%3E%3Ccircle cx='32' cy='68' r='26' fill='url(%23g)'/%3E%3Ccircle cx='68' cy='68' r='26' fill='url(%23g)'/%3E%3Ccircle cx='50' cy='50' r='12' fill='%23A93226'/%3E%3Crect x='46' y='72' width='8' height='24' rx='4' fill='%23A93226'/%3E%3C/svg%3E",
            sizes: '100x100',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'dodoco-external',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
