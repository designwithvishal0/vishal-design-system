import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const page = (p) => fileURLToPath(new URL(p, import.meta.url));

// Three layouts, one page each, plus a landing page that links them.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5175 },
  build: {
    rollupOptions: {
      input: {
        index: page('index.html'),
        year: page('year/index.html'),
        taste: page('taste/index.html'),
        story: page('story/index.html'),
      },
    },
  },
});
