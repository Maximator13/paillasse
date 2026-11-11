// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// URL publique du site : à définir via la variable d'environnement SITE_URL au déploiement.
const site = process.env.SITE_URL ?? 'https://paillasse.example';

export default defineConfig({
  site,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/dev/') })],
});
