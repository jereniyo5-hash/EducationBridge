import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'es2020',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('@react-pdf-viewer') || id.includes('pdfjs-dist')) {
              return 'pdf';
            }
            if (id.includes('mammoth')) {
              return 'document-parser';
            }
            if (id.includes('swiper') || id.includes('recharts')) {
              return 'ui';
            }
            return 'modules';
          }
        }
      }
    }
  }
})
