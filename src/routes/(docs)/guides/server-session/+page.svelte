<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Use a server session"
	description="Preferred mint path — API key on your server, sessionEndpoint in the client."
	next={[
		{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' },
		{ title: 'Sessions API', href: '/api-reference/sessions' },
		{ title: 'Experience (Next.js)', href: '/avatar-experiences/nextjs' }
	]}
>
	<h2>Overview</h2>
	<p>
		Your server mints a Session Manifest with an API key. Your client embeds via
		<code>sessionEndpoint</code>. Prefer this whenever you have a backend.
	</p>

	<h2>Steps</h2>
	<ol>
		<li>Store <code>LIFORMA_API_KEY</code> (and optionally <code>LIFORMA_API_URL</code>) in server env</li>
		<li>Create a same-origin API route that calls <code>POST /v1/sessions</code></li>
		<li>Pass <code>sessionEndpoint</code> to <code>&lt;Experience&gt;</code></li>
		<li>SDK POSTs to your route, receives manifest, starts session</li>
	</ol>

	<h2>Client</h2>
	<h3>Svelte</h3>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />
	<h3>React</h3>
	<CodeBlock code={snippets.authenticatedReact} lang="tsx" filename="PrivateLesson.tsx" />

	<h2>Server</h2>
	<h3>SvelteKit</h3>
	<CodeBlock code={snippets.sessionEndpointServer} lang="typescript" />
	<h3>Next.js</h3>
	<CodeBlock code={snippets.sessionEndpointNext} lang="typescript" />

	<h2>Security</h2>
	<ul>
		<li>Never expose your API key to the browser</li>
		<li>Never pass manifests with <code>sessionToken</code> through SSR load data</li>
		<li>Derive signed-in identity on the server; never trust a browser-supplied user id alone</li>
	</ul>
</DocPage>
