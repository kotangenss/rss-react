/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// http://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
});
