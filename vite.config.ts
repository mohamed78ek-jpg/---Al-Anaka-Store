import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use './' to make the build paths relative. 
  // This ensures the app works on any hosting (Netlify, Vercel, GitHub Pages, Subdirectories).
  base: './', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});