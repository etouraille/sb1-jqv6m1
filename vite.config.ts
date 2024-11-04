import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: false,
        configFile: false,
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: [
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod',
      'class-variance-authority',
      'react-hot-toast',
      '@headlessui/react',
    ],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', 'lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers/zod', 'zod'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
});