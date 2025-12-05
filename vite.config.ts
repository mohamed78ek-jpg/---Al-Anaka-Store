import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Setting base to './' ensures that generated asset links are relative.
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Define process.env to prevent crashes in libraries that expect a Node.js environment
  define: {
    'process.env': {}
  }
});