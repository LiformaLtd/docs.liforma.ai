<script lang="ts">
	import type { Snippet } from 'svelte';
	import NextSteps from '$lib/components/NextSteps.svelte';
	import type { NavItem } from '$lib/navigation';

	type Props = {
		title: string;
		description?: string;
		next?: readonly NavItem[];
		children: Snippet;
	};

	let { title, description, next = [], children }: Props = $props();
</script>

<svelte:head>
	<title>{title} · Liforma Docs</title>
	{#if description}
		<meta name="description" content={description} />
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
</style>
