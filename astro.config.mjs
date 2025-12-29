import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mgks.dev',
  integrations: [
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
});