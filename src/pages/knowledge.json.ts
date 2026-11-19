/**
 * The docs as website knowledge, built with the site: https://docs.liforma.ai/knowledge.json
 *
 * The Liforma API reads this file after a docs deploy and stores it as part of the website knowledge pack that the
 * "Talk with Liforma" avatar answers from (chunked, embedded and searched by the API's own knowledge pipeline). It holds
 * only what the published docs already show: every page in the docs menu (no drafts, no hidden "_" pages), as Markdown.
 *
 * Format "liforma-site-knowledge/1", shared by every site that publishes knowledge:
 *   { format, source, site, commit, documents: [{ key, title, url, markdown }] }
 * `key` is stable per page, so the API can tell new, changed and removed pages apart.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import { docsPageMarkdown } from '../lib/knowledge/mdxToMarkdown';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
	const base = (site?.href ?? 'https://docs.liforma.ai').replace(/\/$/, '');
	const problems: string[] = [];
	const pages = (await getCollection('docs'))
		// "_" pages (the unreleased alpha docs) are built but hidden from the menu: the avatar must not talk about them.
		.filter((entry) => !entry.data.draft && entry.body && !entry.id.split('/').some((part) => part.startsWith('_')))
		.sort((a, b) => a.id.localeCompare(b.id));
	const documents = pages.map((entry) => {
		const { url, markdown } = docsPageMarkdown(
			{ id: entry.id, title: entry.data.title, description: entry.data.description, body: entry.body ?? '' },
			base,
			problems
		);
		return { key: `docs/${entry.id}`, title: entry.data.title, url, markdown };
	});
	for (const problem of problems) console.warn(`[knowledge.json] ${problem}`);
	return new Response(
		JSON.stringify({
			format: 'liforma-site-knowledge/1',
			source: 'docs',
			site: base,
			commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
			documents
		}),
		{ headers: { 'Content-Type': 'application/json; charset=utf-8' } }
	);
};
