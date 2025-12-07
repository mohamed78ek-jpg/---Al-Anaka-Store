import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use '/' for standard root domain deployment on Netlify
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});