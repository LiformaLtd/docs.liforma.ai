import { allDocPages } from '$lib/docPages';
import { SITE_URL } from '$lib/seo';

export function GET() {
	const lines = [
		'# Liforma Docs — full page index',
		'',
		`> Generated from docs navigation. Canonical agent entry: ${SITE_URL}/llms.txt`,
		'',
		'## Pages',
		''
	];

	for (const page of allDocPages()) {
		lines.push(`- [${page.title}](${SITE_URL}${page.href}): ${page.description || page.section}`);
	}

	lines.push(
		'',
		'## Machine-readable API',
		'',
		`- [Session mint OpenAPI](${SITE_URL}/openapi/sessions.json)`,
		''
	);

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
