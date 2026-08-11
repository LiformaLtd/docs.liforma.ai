import { docsNavigation } from '$lib/navigation';

export type DocPageEntry = {
	readonly title: string;
	readonly href: string;
	readonly section: string;
	readonly description: string;
};

/** Short descriptions for search and social previews. */
const descriptions: Record<string, string> = {
	'/getting-started/introduction': 'What Liforma is and how Avatar Experiences fit your product.',
	'/getting-started/quick-start': 'Embed your first intelligent animated avatar in minutes.',
	'/getting-started/concepts': 'Experience, Session Manifest, SDK, and core platform ideas.',
	'/avatar-experiences/overview': 'Real-time AI characters that listen, think, speak, and animate.',
	'/avatar-experiences/svelte': 'The Experience Svelte component and embed options.',
	'/avatar-experiences/react': 'Experience React component with ref-based control.',
	'/avatar-experiences/nextjs': 'Next.js embed plus App Router session mint helper.',
	'/avatar-experiences/experience-thumbnail':
		'Layered CDN gallery thumbnails with optional hosted-player launch.',
	'/avatar-experiences/experience-api':
		'Experience.startSession, speak(), listenOnce(), conversationProcessor, and getters.',
	'/avatar-experiences/session-manifests': 'Per-launch runtime configuration returned by the API.',
	'/avatar-experiences/events':
		'Partial transcripts, speech boundaries, processor errors, and mode events.',
	'/avatar-experiences/browser-embeds':
		'Client-side session minting protected by an origin allowlist.',
	'/avatar-experiences/server-sessions':
		'Preferred server minting with API keys — key never reaches the browser.',
	'/capabilities/text-to-avatar':
		'Scripted avatar speech via Experience presenter mode and speak().',
	'/capabilities/text-to-speech':
		'Audio-only speech with speechOnly on Experience and speak().',
	'/capabilities/speech-to-speech':
		'Voice conversation with speechOnly on Experience in conversation mode.',
	'/guides/embed': 'Embed patterns for any web app or framework.',
	'/guides/browser-embed': 'Client-side embed with origin allowlist.',
	'/guides/server-session': 'Server-side session minting with API keys.',
	'/guides/dynamic-experience-gallery': 'Fetch a creator-managed project catalog and route by slug.',
	'/guides/events': 'Listen to messages, mode changes, and state updates.',
	'/guides/guided-scripted-practice':
		'Scripted tutor lines with manual listening and host-side feedback.',
	'/guides/custom-conversation-processor':
		'Browser conversationProcessor to replace the managed LLM.',
	'/guides/listen-once-capture':
		'listenOnce() for automatic end-of-speech capture in host-owned turns.',
	'/guides/customise-characters': 'Avatars, voices, and character configuration.',
	'/guides/tools': 'Give characters controlled external capabilities.',
	'/guides/migrate-elevenlabs': 'Move from voice agents to animated avatar experiences.',
	'/api-reference/sessions': 'POST /v1/sessions — server-side API-key manifest minting.',
	'/api-reference/experience-catalog': 'GET /v1/projects/{projectId}/experiences — published catalog.',
	'/api-reference/public-sessions':
		'POST /v1/public-sessions — browser embed minting (path name historical).',
	'/api-reference/manifests': 'Session Manifest schema and fields.',
	'/api-reference/errors': 'HTTP error shapes and troubleshooting.',
	'/sdk-reference/javascript':
		'@liforma/client — speak(), listenOnce(), conversationProcessor, and events.',
	'/sdk-reference/svelte': 'Experience and ExperienceThumbnail Svelte components.',
	'/sdk-reference/web-component':
		'liforma-experience and liforma-experience-thumbnail web components.',
	'/llms.txt': 'Agent-oriented documentation index for Liforma.',
	'/llms-full.txt': 'Full docs page index for coding agents.',
	'/openapi/sessions.json': 'OpenAPI for POST /v1/sessions and /v1/public-sessions.'
};

export function allDocPages(): DocPageEntry[] {
	const pages: DocPageEntry[] = [];
	for (const section of docsNavigation) {
		for (const item of section.items) {
			// Skip external Trust & Legal links (hosted on www.liforma.ai).
			if (!item.href.startsWith('/')) continue;
			pages.push({
				title: item.title,
				href: item.href,
				section: section.title,
				description: descriptions[item.href] ?? ''
			});
		}
	}
	return pages;
}

export function searchDocPages(query: string, limit = 8): DocPageEntry[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];

	return allDocPages()
		.filter((page) => {
			const haystack = `${page.title} ${page.section} ${page.description} ${page.href}`.toLowerCase();
			return haystack.includes(q);
		})
		.slice(0, limit);
}

export function descriptionForPath(pathname: string): string | undefined {
	return descriptions[pathname];
}
