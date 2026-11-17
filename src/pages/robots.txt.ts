import type { APIRoute } from 'astro';
import { actif } from '../i18n';

export const GET: APIRoute = ({ site }) => {
  const plan = new URL(actif('sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\nDisallow: ${actif('dev/')}\n\nSitemap: ${plan.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
