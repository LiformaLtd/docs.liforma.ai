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
			{ title: 'Experience (HTML)', href: '/avatar-experiences/html' },
			{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' },
			{ title: 'Experience (React)', href: '/avatar-experiences/react' },
			{ title: 'Experience (Next.js)', href: '/avatar-experiences/nextjs' },
			{ title: 'ExperienceThumbnail', href: '/avatar-experiences/experience-thumbnail' },
			{ title: 'ExperienceWidget', href: '/avatar-experiences/experience-widget' },
			{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
			{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
			{ title: 'BYO — ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
			{ title: 'BYO — OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
			{ title: 'BYO — Google', href: '/avatar-experiences/bring-your-own-voice/google' },
			{ title: 'BYO — Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
			{ title: 'BYO — LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
			{ title: 'BYO — Other / files', href: '/avatar-experiences/bring-your-own-voice/other-providers' },
			{ title: 'Session Launch', href: '/avatar-experiences/session-manifests' },
			{ title: 'Events', href: '/avatar-experiences/events' },
			{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
			{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' }
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
			{ title: 'Browser embed', href: '/guides/browser-embed' },
			{ title: 'oEmbed and Iframely', href: '/guides/oembed' },
			{ title: 'Server session', href: '/guides/server-session' },
			{ title: 'Dynamic Experience Gallery', href: '/guides/dynamic-experience-gallery' },
			{ title: 'Listen to Events', href: '/guides/events' },
			{ title: 'Guided Scripted Practice', href: '/guides/guided-scripted-practice' },
			{ title: 'Custom Conversation Processor', href: '/guides/custom-conversation-processor' },
			{ title: 'Listen Once Capture', href: '/guides/listen-once-capture' },
			{ title: 'Customise Characters', href: '/guides/customise-characters' },
			{ title: 'Add Tools', href: '/guides/tools' },
			{ title: 'Migrate from ElevenLabs', href: '/guides/migrate-elevenlabs' },
			{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' }
		]
	},
	{
		title: 'API Reference',
		items: [
			{ title: 'Sessions', href: '/api-reference/sessions' },
			{ title: 'Experience Catalog', href: '/api-reference/experience-catalog' },
			{ title: 'Browser Sessions', href: '/api-reference/browser-sessions' },
			{ title: 'Session Launch', href: '/api-reference/manifests' },
			{ title: 'Errors', href: '/api-reference/errors' }
		]
	},
	{
		title: 'SDK Reference',
		items: [
			{ title: 'JavaScript SDK', href: '/sdk-reference/javascript' },
			{ title: 'Svelte Component', href: '/sdk-reference/svelte' },
			{ title: 'React Component', href: '/avatar-experiences/react' },
			{ title: 'Web Component', href: '/sdk-reference/web-component' }
		]
	},
	{
		title: 'Trust & Legal',
		items: [
			{ title: 'Legal (www)', href: 'https://www.liforma.ai/legal' },
			{ title: 'Terms of Service', href: 'https://www.liforma.ai/legal/terms-of-service' },
			{ title: 'Privacy Policy', href: 'https://www.liforma.ai/legal/privacy-policy' },
			{ title: 'Acceptable Use', href: 'https://www.liforma.ai/legal/acceptable-use' },
			{ title: 'Third-party notices', href: 'https://www.liforma.ai/legal/third-party' }
		]
	}
] as const;

export const externalLinks = {
	www: 'https://www.liforma.ai',
	app: 'https://app.liforma.ai',
	pricing: 'https://www.liforma.ai/pricing',
	meet: 'https://www.liforma.ai/meet',
	player: 'https://player.liforma.ai',
	examples: 'https://examples.liforma.ai',
	examplesGithub: 'https://github.com/LiformaLtd/examples.liforma.ai',
	github: 'https://github.com/LiformaLtd',
	legal: 'https://www.liforma.ai/legal',
	terms: 'https://www.liforma.ai/legal/terms-of-service',
	privacy: 'https://www.liforma.ai/legal/privacy-policy',
	acceptableUse: 'https://www.liforma.ai/legal/acceptable-use'
} as const;

/** Canonical demo experience ID for docs examples. */
export const DEMO_EXPERIENCE_ID = 'exp_01EXAMPLES_COFFEE_BARISTA';
