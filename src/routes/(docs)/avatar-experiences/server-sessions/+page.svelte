<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { externalLinks } from '$lib/navigation';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Server sessions (API keys)"
	description="Preferred session minting when you have a backend — API key stays on the server."
	next={[
		{ title: 'Sessions API', href: '/api-reference/sessions' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
		{ title: 'Use a server session', href: '/guides/server-session' }
	]}
>
	<h2>What this is</h2>
	<p>
		A <strong>server session</strong> is minted by your backend with a developer
		<strong>API key</strong> via <code>POST /v1/sessions</code>. The browser never sees the key. This
		is the <strong>preferred</strong> mint path whenever you can run server-side code.
	</p>

	<h2>When to use</h2>
	<ul>
		<li>You have a backend (SvelteKit, Next.js, or any server)</li>
		<li>Per-user session context or app-owned authorization</li>
		<li>Tighter control over who can start sessions and with which overrides</li>
		<li>Per-user context via your same-origin <code>sessionEndpoint</code></li>
	</ul>
	<p>
		For client-only pages with no server, use
		<a href="/avatar-experiences/browser-embeds">browser embeds with allowed origins</a> instead.
		Player chrome (<code>returnUrl</code>, <code>closeButton</code>) is configured via SDK
		<code>attach</code>, not mint.
	</p>

	<h2>Flow</h2>
	<pre class="diagram">Your backend  →  POST /v1/sessions  →  SessionLaunchResponse
                                              ↓
Your frontend  ←  sessionEndpoint (preferred)  ←  SDK</pre>

	<h2>1. Mint on your server</h2>
	<p>Call the Liforma API with your developer API key. Never expose the key to the browser.</p>
	<CodeBlock code={snippets.sessionsCurl} lang="bash" />

	<h2>2. Pass to the client</h2>
	<p>Recommended: use a same-origin <code>sessionEndpoint</code> so credentials never touch SSR HTML.</p>
	<h3>Svelte</h3>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />
	<h3>React</h3>
	<CodeBlock code={snippets.authenticatedReact} lang="tsx" filename="PrivateLesson.tsx" />

	<h2>3. Implement sessionEndpoint</h2>
	<h3>SvelteKit</h3>
	<CodeBlock code={snippets.sessionEndpointServer} lang="typescript" filename="+server.ts" />
	<h3>Next.js App Router</h3>
	<CodeBlock code={snippets.sessionEndpointNext} lang="typescript" filename="route.ts" />

	<p>
		Contract: <code>POST</code> with <code>experienceId</code> (and optional launch fields) →
		<strong>SessionLaunchResponse</strong> with <code>Cache-Control: no-store, private</code>.
	</p>

	<h2>SSR warning</h2>
	<p>
		Do not put opaque <code>launch</code> through server load functions — it would be embedded in
		HTML. Prefer <code>sessionEndpoint</code> so the browser fetches the launch after load.
	</p>

	<h2>API key</h2>
	<p>
		Obtain a developer API key from the
		<a href={externalLinks.app} target="_blank" rel="noopener noreferrer">developer portal</a>
		(<code>app.liforma.ai</code>). Store it in server environment variables only.
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
