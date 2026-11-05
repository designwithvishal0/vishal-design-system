import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' so the built preview works from any folder, including a Vercel subpath.
export default defineConfig({ plugins: [react()], base: './' });
