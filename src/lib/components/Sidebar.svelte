<script lang="ts">
	import { page } from '$app/stores';
	import { docsNavigation } from '$lib/navigation';

	type Props = {
		open?: boolean;
		onclose?: () => void;
	};

	let { open = false, onclose }: Props = $props();

	function isActive(href: string): boolean {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="sidebar" class:open={open} aria-label="Documentation">
	<div class="sidebar-inner">
		{#each docsNavigation as section (section.title)}
			<div class="section">
				<p class="section-title">{section.title}</p>
				<ul>
					{#each section.items as item (item.href)}
						<li>
							<a
								href={item.href}
								class:active={isActive(item.href)}
								onclick={() => onclose?.()}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</nav>

{#if open}
	<button type="button" class="backdrop" aria-label="Close menu" onclick={() => onclose?.()}></button>
{/if}

<style>
	.sidebar {
		width: var(--sidebar-width);
		flex-shrink: 0;
		border-right: 1px solid var(--border);
		background: var(--bg);
		overflow-y: auto;
		height: calc(100dvh - var(--header-height));
		position: sticky;
		top: var(--header-height);
	}

	.sidebar-inner {
		padding: 1.25rem 0 2rem;
	}

	.section {
		margin-bottom: 1.25rem;
	}

	.section-title {
		margin: 0;
		padding: 0 1.25rem 0.4rem;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0;
	}

	a {
		display: block;
		padding: 0.35rem 1.25rem;
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		border-left: 2px solid transparent;
		transition:
			color 0.12s,
			background 0.12s;
	}

	a:hover {
		color: var(--text);
		background: var(--bg-subtle);
		text-decoration: none;
	}

	a.active {
		color: var(--accent-text);
		font-weight: 500;
		border-left-color: var(--accent);
		background: var(--accent-subtle);
	}

	.backdrop {
		display: none;
	}

	@media (max-width: 900px) {
		.sidebar {
			position: fixed;
			left: 0;
			top: var(--header-height);
			z-index: 40;
			transform: translateX(-100%);
			transition: transform 0.2s ease;
			box-shadow: var(--shadow-md);
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			top: var(--header-height);
			z-index: 30;
			border: none;
			background: rgba(0, 0, 0, 0.4);
			cursor: pointer;
		}
	}
</style>
