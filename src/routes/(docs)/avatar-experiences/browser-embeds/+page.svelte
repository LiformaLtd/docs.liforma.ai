<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { externalLinks } from '$lib/navigation';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Browser embeds (allowed origins)"
	description="Client-side session minting protected by an origin allowlist."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Server sessions (API keys)', href: '/avatar-experiences/server-sessions' },
		{ title: 'Use a browser embed', href: '/guides/browser-embed' }
	]}
>
	<h2>What this is</h2>
	<p>
		A <strong>browser embed</strong> lets the SDK mint a Session Manifest from the client. Your site
		sends its <code>Origin</code> header; Liforma checks that origin against your
		<strong>allowed origins</strong> list. No API key runs in the browser.
	</p>
	<p>
		Allowed origins authorize which websites may start a session from the browser. They exist so
		third parties cannot embed <em>your</em> experience (which you pay to run) on a site you did not
		approve.
	</p>

	<h2>When to use</h2>
	<ul>
		<li>You want client-only integration — no server route to mint sessions</li>
		<li>Marketing pages, demos, simple education embeds, iframes</li>
		<li>You can allowlist every production origin that will host the embed</li>
	</ul>
	<p>
		If you have a backend, prefer
		<a href="/avatar-experiences/server-sessions">server sessions with an API key</a> — stronger
		control, per-user context, and the key never leaves your server.
	</p>

	<h2>Integration</h2>
	<h3>Svelte</h3>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" />

	<h3>React</h3>
	<p>
		Use <code>@liforma/client/react</code>. In Next.js, mark the file
		<code>'use client'</code>.
	</p>
	<CodeBlock code={snippets.reactHelloWorld} lang="tsx" filename="Demo.tsx" />

	<h3>Web component</h3>
	<p>For Vue, Angular, plain HTML, or tools that only accept custom elements:</p>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" />

	<h2>Requirements</h2>
	<ol>
		<li>
			Enable <strong>browser embeds</strong> for the project in
			<a href={externalLinks.app} target="_blank" rel="noopener noreferrer">app.liforma.ai</a>
		</li>
		<li>Add every site origin that will host the embed to the <strong>Origins</strong> allowlist</li>
		<li>Pass <code>experienceId</code> to the SDK component</li>
		<li>Browser must support required APIs (Web Speech API for voice input)</li>
	</ol>

	<h2>What the SDK does</h2>
	<ol>
		<li>Reads <code>experienceId</code> from your component</li>
		<li>
			Calls <code>POST /v1/public-sessions</code> with the page <code>Origin</code> header
			(endpoint name is historical — this is the browser mint path)
		</li>
		<li>Receives a Session Manifest if the origin is allowlisted</li>
		<li>Starts the runtime — no API key on your server</li>
	</ol>

	<h2>Security model</h2>
	<p>
		Experience IDs (<code>exp_…</code>) are not secret. Protection comes from origin allowlists,
		short-lived session tokens, quotas, and billing — so a third party cannot burn your minutes by
		embedding your experience elsewhere.
	</p>

	<h2>Billing</h2>
	<p>
		Browser-minted sessions are still metered per minute. See
		<a href={externalLinks.pricing}>pricing</a>.
	</p>
</DocPage>
