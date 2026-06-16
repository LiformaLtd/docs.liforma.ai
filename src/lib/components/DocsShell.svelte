<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let sidebarOpen = $state(false);
</script>

<div class="docs-shell">
	<Header onmenutoggle={() => (sidebarOpen = !sidebarOpen)} />
	<div class="docs-body">
		<Sidebar open={sidebarOpen} onclose={() => (sidebarOpen = false)} />
		<main class="docs-main">
			<div class="docs-content">
				{@render children()}
			</div>
		</main>
	</div>
</div>

<style>
	.docs-shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.docs-body {
		display: flex;
		flex: 1;
		max-width: 1440px;
		width: 100%;
		margin: 0 auto;
	}

	.docs-main {
		flex: 1;
		min-width: 0;
		overflow-y: auto;
	}

	.docs-content {
		padding: 2rem 2.5rem 4rem;
		max-width: calc(var(--content-max) + 5rem);
	}

	@media (max-width: 640px) {
		.docs-content {
			padding: 1.5rem 1.25rem 3rem;
		}
	}
</style>
