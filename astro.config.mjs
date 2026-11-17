// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// URL publique du site : à définir via la variable d'environnement SITE_URL au déploiement.
const site = process.env.SITE_URL ?? 'https://paillasse.example';
// Sous-chemin de déploiement (ex. '/paillasse' sur GitHub Pages) : variable BASE_PATH, '/' par défaut.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [
    sitemap({
      // Pages de développement et page 404 anglaise exclues.
      filter: (page) => !page.includes('/dev/') && !page.endsWith('/404/'),
      // Français à la racine, anglais sous /en/ : chaque URL reçoit ses liens hreflang quand l'autre version existe.
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-GB' } },
    }),
  ],
});
