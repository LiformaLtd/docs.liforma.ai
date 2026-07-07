export type NavItem = {
	readonly title: string;
	readonly href: string;
};

export type NavSection = {
	readonly title: string;
	readonly items: readonly NavItem[];
};

export const docsNavigation: readonly NavSection[] = [
	{
		title: 'Getting Started',
		items: [
			{ title: 'Introduction', href: '/getting-started/introduction' },
			{ title: 'Quick Start', href: '/getting-started/quick-start' },
			{ title: 'Concepts', href: '/getting-started/concepts' }
		]
	},
	{
		title: 'Avatar Experiences',
		items: [
			{ title: 'Overview', href: '/avatar-experiences/overview' },
			{ title: 'LiformaExperience', href: '/avatar-experiences/liforma-experience' },
			{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
			{ title: 'Session Manifests', href: '/avatar-experiences/session-manifests' },
			{ title: 'Events', href: '/avatar-experiences/events' },
			{ title: 'Public Experiences', href: '/avatar-experiences/public' },
			{ title: 'Authenticated Experiences', href: '/avatar-experiences/authenticated' }
		]
	},
	{
		title: 'Capabilities',
		items: [
			{ title: 'Text-to-Avatar', href: '/capabilities/text-to-avatar' },
			{ title: 'Text-to-Speech', href: '/capabilities/text-to-speech' },
			{ title: 'Speech-to-Speech', href: '/capabilities/speech-to-speech' }
		]
	},
	{
		title: 'Guides',
		items: [
			{ title: 'Embed an Experience', href: '/guides/embed' },
			{ title: 'Public Experience', href: '/guides/public-experience' },
			{ title: 'Authenticated Experience', href: '/guides/authenticated-experience' },
			{ title: 'Listen to Events', href: '/guides/events' },
			{ title: 'Customise Characters', href: '/guides/customise-characters' },
			{ title: 'Add Tools', href: '/guides/tools' },
			{ title: 'Migrate from ElevenLabs', href: '/guides/migrate-elevenlabs' }
		]
	},
	{
		title: 'API Reference',
		items: [
			{ title: 'Sessions', href: '/api-reference/sessions' },
			{ title: 'Public Sessions', href: '/api-reference/public-sessions' },
			{ title: 'Manifests', href: '/api-reference/manifests' },
			{ title: 'Errors', href: '/api-reference/errors' }
		]
	},
	{
		title: 'SDK Reference',
		items: [
			{ title: 'JavaScript SDK', href: '/sdk-reference/javascript' },
			{ title: 'Svelte Component', href: '/sdk-reference/svelte' },
			{ title: 'Web Component', href: '/sdk-reference/web-component' }
		]
	}
] as const;

export const externalLinks = {
	www: 'https://www.liforma.ai',
	app: 'https://app.liforma.ai',
	pricing: 'https://www.liforma.ai/pricing',
	meet: 'https://www.liforma.ai/meet',
	player: 'https://player.liforma.ai',
	examples: 'https://spanish-tutor.examples.liforma.ai',
	github: 'https://github.com/liforma'
} as const;

/** Canonical demo experience ID for docs examples. */
export const DEMO_EXPERIENCE_ID = 'exp_01DEMO1SPANISHCAFE';
