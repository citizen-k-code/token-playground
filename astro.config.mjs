import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// GitHub Pages project site served at https://citizen-k-code.github.io/token-playground/
export default defineConfig({
  site: 'https://citizen-k-code.github.io',
  base: '/token-playground/',
  integrations: [react()],
});
