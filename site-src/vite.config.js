import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The hand in page at the root of the deployed site.
export default defineConfig({ plugins: [react()], base: './' });
