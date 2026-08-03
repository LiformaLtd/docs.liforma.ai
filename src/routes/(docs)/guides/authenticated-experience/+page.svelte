<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Use an Authenticated Experience"
	description="Server-minted sessions for private applications."
	next={[
		{ title: 'Authenticated Experiences', href: '/avatar-experiences/authenticated' },
		{ title: 'Sessions API', href: '/api-reference/sessions' }
	]}
>
	<h2>Overview</h2>
	<p>Your server mints a Session Manifest. Your client embeds via <code>sessionEndpoint</code>.</p>

	<h2>Steps</h2>
	<ol>
		<li>Store <code>LIFORMA_API_KEY</code> in server environment variables</li>
		<li>Create a same-origin API route that calls <code>POST /v1/sessions</code></li>
		<li>Pass <code>sessionEndpoint</code> to <code>&lt;Experience&gt;</code></li>
		<li>SDK POSTs to your route, receives manifest, starts session</li>
	</ol>

	<h2>Client</h2>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />

	<h2>Server</h2>
	<CodeBlock code={snippets.sessionEndpointServer} lang="typescript" />

	<h2>Security</h2>
	<ul>
		<li>Never expose your API key to the browser</li>
		<li>Never pass manifests with <code>sessionToken</code> through SSR load data</li>
		<li>Validate <code>userId</code> server-side before minting</li>
	</ul>
</DocPage>
