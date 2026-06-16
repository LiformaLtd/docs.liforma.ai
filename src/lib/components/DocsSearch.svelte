<script lang="ts">
	import { searchDocPages, type DocPageEntry } from '$lib/docPages';

	let query = $state('');
	let open = $state(false);
	let results = $state<DocPageEntry[]>([]);

	let container: HTMLDivElement | undefined;

	function onInput() {
		results = searchDocPages(query);
		open = query.trim().length > 0;
	}

	function close() {
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
			(e.target as HTMLInputElement)?.blur();
		}
	}

	function handleDocumentClick(e: MouseEvent) {
		if (!container?.contains(e.target as Node)) {
			close();
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('click', handleDocumentClick);
			return () => document.removeEventListener('click', handleDocumentClick);
		}
	});
</script>

<div class="search" bind:this={container}>
	<label class="sr-only" for="docs-search">Search documentation</label>
	<svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
		<circle cx="11" cy="11" r="7" />
		<path d="M20 20l-3-3" />
	</svg>
	<input
		id="docs-search"
		type="search"
		class="search-input"
		placeholder="Search docs…"
		autocomplete="off"
		bind:value={query}
		oninput={onInput}
		onfocus={() => {
			if (query.trim()) open = true;
		}}
		onkeydown={onKeydown}
	/>
	{#if open}
		<ul class="results" role="listbox">
			{#if results.length === 0}
				<li class="empty">No pages found</li>
			{:else}
				{#each results as result (result.href)}
					<li>
						<a class="result" href={result.href} onclick={close}>
							<span class="result-title">{result.title}</span>
							<span class="result-meta">{result.section}</span>
						</a>
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style>
	.search {
		position: relative;
		width: min(100%, 220px);
	}

	.search-icon {
		position: absolute;
		left: 0.65rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-faint);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		height: 36px;
		padding: 0 0.75rem 0 2.1rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--bg-elevated);
		color: var(--text);
		font-size: 0.875rem;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--border-strong);
	}

	.search-input::placeholder {
		color: var(--text-faint);
	}

	.results {
		position: absolute;
		top: calc(100% + 0.35rem);
		left: 0;
		right: 0;
		z-index: 60;
		margin: 0;
		padding: 0.35rem;
		list-style: none;
		background: var(--bg-elevated);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius);
		box-shadow: var(--shadow-md);
		max-height: 320px;
		overflow-y: auto;
	}

	.result {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding: 0.55rem 0.65rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		color: inherit;
	}

	.result:hover {
		background: var(--bg-subtle);
		text-decoration: none;
	}

	.result-title {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.result-meta {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.empty {
		padding: 0.65rem;
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	@media (max-width: 900px) {
		.search {
			width: 100%;
			max-width: none;
		}
	}
</style>
