import { getRoutes } from '../lib/routes';
import { xml } from '../lib/feeds';
import { absolute } from '../lib/site';

export async function GET() {
  const routes = (await getRoutes()).filter((r) => r.kind !== 'redirect');
  const now = new Date().toISOString();
  const entries = routes
    .map((r) => {
      let priority = '0.7';
      let changefreq = 'weekly';
      if (r.path === '/') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (r.path.startsWith('/p/')) {
        priority = '0.9';
        changefreq = 'monthly';
      } else if (
        r.path === '/archives/' ||
        r.path === '/categories/' ||
        r.path === '/tags/'
      ) {
        priority = '0.8';
        changefreq = 'daily';
      } else if (r.path === '/about/') {
        priority = '0.8';
        changefreq = 'monthly';
      }
      return `<url><loc>${xml(absolute(r.path))}</loc><lastmod>${now}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}
