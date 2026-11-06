import { absolute } from '../lib/site';

export function GET() {
  const content = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /_astro/',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: bingbot',
    'Allow: /',
    '',
    'User-agent: Baiduspider',
    'Allow: /',
    '',
    'User-agent: yisouspider',
    'Allow: /',
    '',
    `Sitemap: ${absolute('/sitemap.xml')}`,
    `Sitemap: ${absolute('/index.xml')}`,
    '',
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
