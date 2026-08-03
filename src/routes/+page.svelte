<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocsSearch from '$lib/components/DocsSearch.svelte';
	import { DEMO_EXPERIENCE_ID, externalLinks } from '$lib/navigation';
	import { canonicalUrl, DEFAULT_DESCRIPTION, ogImageUrl, pageTitle } from '$lib/seo';
	import { toggleTheme } from '$lib/theme';

	const helloWorld = `import { Experience } from '@liforma/client/react';

export function Demo() {
  return <Experience experienceId="${DEMO_EXPERIENCE_ID}" />;
}`;
	const title = pageTitle('Avatar Experiences for developers');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={DEFAULT_DESCRIPTION} />
	<link rel="canonical" href={canonicalUrl('/')} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Liforma Docs" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={DEFAULT_DESCRIPTION} />
	<meta property="og:url" content={canonicalUrl('/')} />
	<meta property="og:image" content={ogImageUrl()} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
</svelte:head>

<div class="landing">
	<header class="landing-header">
		<div class="landing-header-inner">
			<a class="brand" href="/">
				<span class="brand-name">liforma</span>
				<span class="brand-docs">docs</span>
			</a>
			<nav class="landing-nav">
				<a href="/getting-started/quick-start">Quick Start</a>
				<a href="/api-reference/sessions">API Reference</a>
				<a href={externalLinks.pricing} target="_blank" rel="noopener noreferrer">Pricing</a>
			</nav>
			<div class="landing-search">
				<DocsSearch />
			</div>
			<button type="button" class="icon-btn" aria-label="Toggle theme" onclick={toggleTheme}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
				</svg>
			</button>
		</div>
	</header>

	<main class="hero">
		<div class="hero-inner">
			<p class="eyebrow">Developer documentation</p>
			<h1>Avatar Experiences for your app</h1>
			<p class="hero-lead">
				Add intelligent animated avatars with one component. Real-time AI characters that listen,
				think, speak, animate, and interact inside your product.
			</p>
			<div class="hero-actions">
				<a class="btn primary" href="/getting-started/quick-start">Quick Start</a>
				<a class="btn secondary" href="/api-reference/sessions">View API Reference</a>
			</div>

			<div class="hero-code">
				<CodeBlock code={helloWorld} lang="tsx" filename="Demo.tsx" />
			</div>

			<p class="hero-note">
				Same component surface in Svelte, React, and Next.js. Liforma starts a session, fetches a
				Session Manifest, connects to the runtime, and renders your avatar — audio, speech,
				animation, and lifecycle included. Coding agents: start at
				<a href="/llms.txt">llms.txt</a>.
			</p>
		</div>
	</main>

	<section class="cards" aria-label="Documentation sections">
		<div class="cards-inner">
			<a class="card" href="/getting-started/quick-start">
				<h2>Quick Start</h2>
				<p>Embed your first avatar in under five minutes.</p>
				<span class="card-link">Get started →</span>
			</a>
			<a class="card" href="/avatar-experiences/overview">
				<h2>Avatar Experiences</h2>
				<p>The full platform: characters, worlds, state, and tools.</p>
				<span class="card-link">Learn more →</span>
			</a>
			<a class="card" href="/capabilities/text-to-avatar">
				<h2>Capabilities</h2>
				<p>Text-to-avatar, TTS, speech-to-speech, and more.</p>
				<span class="card-link">Explore →</span>
			</a>
			<a class="card" href="/guides/migrate-elevenlabs">
				<h2>ElevenLabs migration</h2>
				<p>Move from voice agents to animated avatar experiences.</p>
				<span class="card-link">Migrate →</span>
			</a>
		</div>
	</section>

	<section class="flow" aria-label="How it works">
		<div class="flow-inner">
			<h2>How it works</h2>
			<div class="flow-diagram">
				<div class="flow-step">
					<span class="flow-label">Experience</span>
					<p>Your reusable avatar configuration</p>
				</div>
				<span class="flow-arrow" aria-hidden="true">↓</span>
				<div class="flow-step">
					<span class="flow-label">Session Manifest</span>
					<p>Per-launch runtime configuration</p>
				</div>
				<span class="flow-arrow" aria-hidden="true">↓</span>
				<div class="flow-step">
					<span class="flow-label">SDK</span>
					<p>Audio, turns, avatar rendering, events</p>
				</div>
			</div>
			<p class="flow-copy">
				You integrate at the Experience level. Transport, STT, TTS, and avatar rendering stay
				hidden inside the SDK.
			</p>
		</div>
	</section>

	<footer class="landing-footer">
		<p>
			<a href={externalLinks.www}>liforma.ai</a>
			·
			<a href={externalLinks.pricing}>Pricing</a>
			·
			<a href={externalLinks.meet}>Try a demo</a>
			·
			<a href="/llms.txt">llms.txt</a>
			·
			<a href="/openapi/sessions.json">OpenAPI</a>
		</p>
	</footer>
</div>

<style>
	.landing {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.landing-header {
		position: sticky;
		top: 0;
		z-index: 50;
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(12px);
	}

	.landing-header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		max-width: 1080px;
		margin: 0 auto;
		padding: 0 1.5rem;
		min-height: var(--header-height);
	}

	.landing-search {
		width: min(100%, 220px);
	}

	.brand {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		text-decoration: none;
		color: var(--text);
	}

	.brand-name {
		font-weight: 700;
		font-size: 1.05rem;
		letter-spacing: -0.03em;
	}

	.brand-docs {
		font-size: 0.8125rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.landing-nav {
		display: flex;
		gap: 1.25rem;
	}

	.landing-nav a {
		font-size: 0.875rem;
		color: var(--text-muted);
		font-weight: 500;
		text-decoration: none;
	}

	.landing-nav a:hover {
		color: var(--text);
	}

	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--bg-elevated);
		color: var(--text-muted);
		cursor: pointer;
	}

	.hero {
		flex: 1;
		padding: 4rem 1.5rem 3rem;
	}

	.hero-inner {
		max-width: 720px;
		margin: 0 auto;
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent-text);
	}

	.hero h1 {
		font-size: clamp(2.25rem, 5vw, 3.25rem);
		margin: 0 0 1.25rem;
		letter-spacing: -0.03em;
	}

	.hero-lead {
		margin: 0 auto 2rem;
		font-size: 1.2rem;
		line-height: 1.6;
		color: var(--text-muted);
		max-width: 36rem;
	}

	.hero-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 2.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.65rem 1.25rem;
		border-radius: var(--radius);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background 0.15s,
			border-color 0.15s;
	}

	.btn.primary {
		background: var(--accent);
		color: white;
		border: 1px solid var(--accent);
	}

	.btn.primary:hover {
		background: var(--accent-hover);
		text-decoration: none;
	}

	.btn.secondary {
		background: var(--bg-elevated);
		color: var(--text);
		border: 1px solid var(--border-strong);
	}

	.btn.secondary:hover {
		border-color: var(--text-faint);
		text-decoration: none;
	}

	.hero-code {
		text-align: left;
		margin-bottom: 1.25rem;
	}

	.hero-note {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.cards {
		padding: 2rem 1.5rem 4rem;
		background: var(--bg-subtle);
		border-top: 1px solid var(--border);
	}

	.cards-inner {
		max-width: 1080px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
	}

	.card {
		display: block;
		padding: 1.35rem 1.5rem;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.card:hover {
		border-color: var(--border-strong);
		box-shadow: var(--shadow-md);
		text-decoration: none;
	}

	.card h2 {
		margin: 0 0 0.5rem;
		font-size: 1.05rem;
	}

	.card p {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.card-link {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--accent-text);
	}

	.flow {
		padding: 3rem 1.5rem 4rem;
	}

	.flow-inner {
		max-width: 480px;
		margin: 0 auto;
		text-align: center;
	}

	.flow h2 {
		margin: 0 0 1.5rem;
		font-size: 1.25rem;
	}

	.flow-diagram {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.flow-step {
		width: 100%;
		padding: 1rem 1.25rem;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.flow-label {
		display: block;
		font-weight: 600;
		font-size: 0.9375rem;
		margin-bottom: 0.25rem;
	}

	.flow-step p {
		margin: 0;
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.flow-arrow {
		color: var(--text-faint);
		font-size: 1.25rem;
	}

	.flow-copy {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.landing-footer {
		padding: 1.5rem;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.landing-footer p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.landing-footer a {
		color: var(--text-muted);
	}

	@media (max-width: 640px) {
		.landing-nav {
			display: none;
		}

		.landing-search {
			order: 3;
			width: 100%;
		}

		.hero {
			padding-top: 2.5rem;
		}
	}
</style>
