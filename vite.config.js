import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://mianather3.github.io/portfolio/
export default defineConfig({
  base: "/",
  plugins: [react()],
});
