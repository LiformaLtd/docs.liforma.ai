import { docsNavigation } from '$lib/navigation';
import { SITE_URL } from '$lib/seo';

export function GET() {
	const paths = ['/', ...docsNavigation.flatMap((section) => section.items.map((item) => item.href))];

	const urls = paths
		.map(
			(path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
  </url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
