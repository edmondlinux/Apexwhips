import irelandData from '@/data/ireland.json';

export async function GET() {
  const baseUrl = 'https://apexwhips.com';
  const now = new Date().toISOString();

  const urls = [
    // Ireland landing page
    `  <url>
    <loc>${baseUrl}/ireland</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    // Individual city pages
    ...irelandData.map((c) => {
      const slug = c.city.toLowerCase().replace(/\s+/g, '-');
      return `  <url>
    <loc>${baseUrl}/cream-chargers/smartwhip/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
