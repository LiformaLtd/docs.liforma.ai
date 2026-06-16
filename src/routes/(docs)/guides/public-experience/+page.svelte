<script lang="ts">
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Use a Public Experience"
	description="Step-by-step guide for public embeds."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Public Experiences', href: '/avatar-experiences/public' }
	]}
>
	<h2>Prerequisites</h2>
	<ul>
		<li>A Liforma experience marked as <strong>public</strong></li>
		<li>Your site's origin added to the experience allowlist</li>
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
			<strong>Deploy</strong> — ensure your production origin is allowlisted
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

	<h2>Troubleshooting</h2>
	<p>
		If the experience fails to start, check the browser console. Common issues: origin not
		allowlisted (403), experience not public, or microphone permission denied.
	</p>
	<p>See <a href="/api-reference/errors">Errors</a> for HTTP status codes.</p>
</DocPage>
