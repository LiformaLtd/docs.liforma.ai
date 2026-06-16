<script lang="ts">
	import type { NavItem } from '$lib/navigation';

	type Props = {
		links: readonly NavItem[];
	};

	let { links }: Props = $props();
</script>

{#if links.length > 0}
	<nav class="next-steps" aria-label="Next steps">
		<h2 class="next-title">Next steps</h2>
		<ul>
			{#each links as link (link.href)}
				<li>
					<a href={link.href}>{link.title} →</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.next-steps {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	.next-title {
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-muted);
		margin: 0 0 0.85rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.5rem;
	}

	li {
		margin: 0;
	}

	a {
		display: inline-flex;
		align-items: center;
		font-weight: 500;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
