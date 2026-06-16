<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Authenticated Experiences"
	description="Server-minted sessions for private apps and per-user access."
	next={[
		{ title: 'Sessions API', href: '/api-reference/sessions' },
		{ title: 'Public Experiences', href: '/avatar-experiences/public' },
		{ title: 'Authenticated Experience Guide', href: '/guides/authenticated-experience' }
	]}
>
	<h2>When to use</h2>
	<p>Authenticated experiences are for apps that need:</p>
	<ul>
		<li>Private or non-public experiences</li>
		<li>Per-user session context (<code>userId</code>)</li>
		<li>Server-side control over session creation</li>
		<li>Custom integration overrides (return URL, close button)</li>
	</ul>

	<h2>Flow</h2>
	<pre class="diagram">Your backend  →  POST /v1/sessions  →  Session Manifest
                                              ↓
Your frontend  ←  manifest or sessionEndpoint  ←  SDK</pre>

	<h2>1. Mint on your server</h2>
	<p>Call the Liforma API with your developer API key. Never expose the key to the browser.</p>
	<CodeBlock code={snippets.sessionsCurl} lang="bash" />

	<h2>2. Pass to the client</h2>
	<p>Recommended: use a same-origin <code>sessionEndpoint</code> so credentials never touch SSR HTML.</p>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />

	<h2>3. Implement sessionEndpoint</h2>
	<CodeBlock code={snippets.sessionEndpointServer} lang="typescript" filename="+server.ts" />

	<p>Contract: <code>POST {'{ experienceId, userId? }'}</code> → <strong>Session Manifest</strong></p>

	<h2>SSR warning</h2>
	<p>
		Do not pass credential-bearing manifests through server load functions. The
		<code>sessionToken</code> in the manifest would be embedded in HTML. Use
		<code>sessionEndpoint</code> or client-side minting instead.
	</p>

	<h2>API key</h2>
	<p>
		Obtain a developer API key from the <a href="https://www.liforma.ai">Liforma dashboard</a>. Store it in server
		environment variables only.
	</p>
</DocPage>

<style>
	.diagram {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.5;
		padding: 1.25rem 1.5rem;
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		margin: 0 0 1.5rem;
		overflow-x: auto;
	}
</style>
