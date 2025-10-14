import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/coe-academy-mpa/session-2/' : '/session-2/',
  build: {
    outDir: '../docs/session-2',
    emptyOutDir: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'FinOps Power Automate Workshop - Session 2',
        short_name: 'FinOps PA S2',
        description: 'Interactive workshop experience for Amadeus Finance Operations - Session 2.',
        theme_color: '#0B3D91',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}));
