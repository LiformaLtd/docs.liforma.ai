<script lang="ts">
	import DocsSearch from '$lib/components/DocsSearch.svelte';
	import { externalLinks } from '$lib/navigation';
	import { toggleTheme } from '$lib/theme';
	import IconMenu from '~icons/tabler/menu-2';
	import IconSun from '~icons/tabler/sun';

	type Props = {
		onmenutoggle?: () => void;
	};

	let { onmenutoggle }: Props = $props();
</script>

<header class="header">
	<div class="header-inner">
		<div class="left">
			<button type="button" class="menu-btn" aria-label="Open menu" onclick={() => onmenutoggle?.()}>
				<IconMenu width="20" height="20" aria-hidden="true" />
			</button>
			<a class="brand" href="/">
				<span class="brand-name">liforma</span>
				<span class="brand-docs">docs</span>
			</a>
		</div>
		<div class="center">
			<DocsSearch />
		</div>
		<nav class="header-nav" aria-label="Header">
			<a href="/getting-started/quick-start">Quick Start</a>
			<a href="/api-reference/sessions">API</a>
			<a href={externalLinks.pricing} target="_blank" rel="noopener noreferrer">Pricing</a>
			<a href={externalLinks.legal} target="_blank" rel="noopener noreferrer">Legal</a>
			<a href={externalLinks.www} target="_blank" rel="noopener noreferrer">Website</a>
		</nav>
		<div class="right">
			<button type="button" class="icon-btn" aria-label="Toggle theme" onclick={toggleTheme}>
				<IconSun width="18" height="18" aria-hidden="true" />
			</button>
		</div>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		height: var(--header-height);
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(12px);
	}

	.header-inner {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		align-items: center;
		gap: 1rem;
		height: 100%;
		padding: 0 1.25rem;
		max-width: 1440px;
		margin: 0 auto;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.center {
		display: flex;
		justify-content: center;
		min-width: 0;
	}

	.brand {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		text-decoration: none;
		color: var(--text);
	}

	.brand:hover {
		text-decoration: none;
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

	.header-nav {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.header-nav a {
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		font-weight: 500;
		white-space: nowrap;
	}

	.header-nav a:hover {
		color: var(--text);
		text-decoration: none;
	}

	.menu-btn,
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

	.menu-btn:hover,
	.icon-btn:hover {
		color: var(--text);
		border-color: var(--border-strong);
	}

	.menu-btn {
		display: none;
	}

	@media (max-width: 900px) {
		.header-inner {
			grid-template-columns: auto 1fr auto;
		}

		.menu-btn {
			display: inline-flex;
		}

		.header-nav {
			display: none;
		}

		.center {
			grid-column: 1 / -1;
			grid-row: 2;
			justify-content: stretch;
		}

		.header {
			height: auto;
			padding-bottom: 0.65rem;
		}

		.header-inner {
			height: auto;
			padding-top: 0.65rem;
		}
	}
</style>
