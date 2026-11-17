import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const plan = new URL('sitemap-index.xml', site);
  return new Response(`User-agent: *\nAllow: /\nDisallow: /dev/\n\nSitemap: ${plan.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
