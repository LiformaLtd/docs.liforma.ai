<script lang="ts">
	type Props = {
		variant?: 'info' | 'warning' | 'beta';
		title?: string;
		children: import('svelte').Snippet;
	};

	let { variant = 'info', title, children }: Props = $props();
</script>

<aside class="callout" class:warning={variant === 'warning'} class:beta={variant === 'beta'}>
	{#if title}
		<p class="callout-title">{title}</p>
	{/if}
	<div class="callout-body">
		{@render children()}
	</div>
</aside>

<style>
	.callout {
		margin: 1.5rem 0;
		padding: 1rem 1.15rem;
		border-radius: var(--radius);
		border: 1px solid var(--info-border);
		background: var(--info-bg);
		font-size: 0.9375rem;
	}

	.callout.warning,
	.callout.beta {
		border-color: var(--warning-border);
		background: var(--warning-bg);
	}

	.callout-title {
		margin: 0 0 0.35rem;
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--text);
	}

	.callout-body :global(p:last-child) {
		margin-bottom: 0;
	}

	.callout-body :global(p) {
		margin-bottom: 0.5rem;
		color: var(--text-muted);
	}
</style>
