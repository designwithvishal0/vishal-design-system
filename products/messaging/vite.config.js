import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const page = (p) => fileURLToPath(new URL(p, import.meta.url));

// Three layouts, one page each, plus a landing page that links them.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: page('index.html'),
        threads: page('threads/index.html'),
        'needs-you': page('needs-you/index.html'),
        keyboard: page('keyboard/index.html'),
      },
    },
  },
});
