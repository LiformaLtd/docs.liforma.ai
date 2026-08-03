<script lang="ts">
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Use a browser embed"
	description="Client-side embed protected by an origin allowlist."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
		{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' }
	]}
>
	<h2>Prerequisites</h2>
	<ul>
		<li>Browser embeds enabled for your project</li>
		<li>Your site's origin on the Origins allowlist</li>
		<li>An <code>experienceId</code> (e.g. <code>exp_…</code>)</li>
	</ul>

	<h2>Steps</h2>
	<ol>
		<li>
			<strong>Install the SDK</strong> — <code>npm install @liforma/client</code> or load the CDN
			script
		</li>
		<li>
			<strong>Add the component</strong> — pass your <code>experienceId</code>
		</li>
		<li>
			<strong>Allowlist origins</strong> — every production host that embeds the experience
		</li>
		<li>
			<strong>Test</strong> — open your page, grant microphone permission, speak
		</li>
	</ol>

	<h2>Checklist</h2>
	<ul>
		<li>Component has a sized container</li>
		<li>Page is served over HTTPS in production</li>
		<li>Origin matches allowlist exactly (scheme + host + port)</li>
		<li>Browser supports Web Speech API for voice input</li>
	</ul>

	<h2>When to prefer a server session</h2>
	<p>
		If you already have a backend, mint with an
		<a href="/guides/server-session">API key on the server</a> instead. Origins are the client-only
		path; they exist so third parties cannot embed your experience on unapproved sites.
	</p>

	<h2>Troubleshooting</h2>
	<p>
		If the experience fails to start, check the browser console. Common issues: origin not
		allowlisted (403), browser embeds disabled for the project, or microphone permission denied.
	</p>
	<p>See <a href="/api-reference/errors">Errors</a> for HTTP status codes.</p>
</DocPage>
