<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import NextSteps from '$lib/components/NextSteps.svelte';
	import { externalLinks, type NavItem } from '$lib/navigation';
	import { canonicalUrl, ogImageUrl, pageTitle } from '$lib/seo';

	type Props = {
		title: string;
		description?: string;
		next?: readonly NavItem[];
		noindex?: boolean;
		children: Snippet;
	};

	let { title, description, next = [], children, noindex = false }: Props = $props();

	const fullTitle = $derived(pageTitle(title));
	const canonical = $derived(canonicalUrl(page.url.pathname));
	const metaDescription = $derived(description ?? '');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if metaDescription}
		<meta name="description" content={metaDescription} />
	{/if}
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Liforma Docs" />
	<meta property="og:title" content={fullTitle} />
	{#if metaDescription}
		<meta property="og:description" content={metaDescription} />
	{/if}
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImageUrl()} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	{#if metaDescription}
		<meta name="twitter:description" content={metaDescription} />
	{/if}
</svelte:head>

<article class="doc-page">
	<header class="doc-header">
		<h1>{title}</h1>
		{#if description}
			<p class="lead">{description}</p>
		{/if}
	</header>
	<div class="prose">
		{@render children()}
	</div>
	<NextSteps links={next} />
	<footer class="doc-agent-links">
		<p>
			<strong>For coding agents:</strong>
			<a href="/llms.txt">llms.txt</a>
			·
			<a href="/llms-full.txt">llms-full.txt</a>
			·
			<a href="/openapi/sessions.json">sessions OpenAPI</a>
		</p>
		<p class="legal-link">
			Policies:
			<a href={externalLinks.legal} target="_blank" rel="noopener noreferrer">Legal</a>
			·
			<a href={externalLinks.privacy} target="_blank" rel="noopener noreferrer">Privacy</a>
			·
			<a href={externalLinks.terms} target="_blank" rel="noopener noreferrer">Terms</a>
		</p>
	</footer>
</article>

<style>
	.doc-page {
		padding-bottom: 4rem;
	}

	.doc-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.lead {
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-muted);
		max-width: 42rem;
	}

	.doc-agent-links {
		margin-top: 2.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--border);
	}

	.doc-agent-links p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.doc-agent-links a {
		color: var(--accent);
		text-decoration: none;
	}

	.doc-agent-links a:hover {
		text-decoration: underline;
	}

	.legal-link {
		margin-top: 0.5rem !important;
	}
</style>
