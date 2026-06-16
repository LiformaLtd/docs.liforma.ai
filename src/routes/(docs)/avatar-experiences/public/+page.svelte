<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { externalLinks } from '$lib/navigation';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Public Experiences"
	description="The easiest integration path — no backend required."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Embed an Experience', href: '/guides/embed' },
		{ title: 'Authenticated Experiences', href: '/avatar-experiences/authenticated' }
	]}
>
	<h2>When to use</h2>
	<p>
		Public experiences are the default integration path. Use them when your experience can be
		accessed from allowlisted web origins without per-user authentication.
	</p>
	<ul>
		<li>Marketing demos and landing pages</li>
		<li>Education apps with open tutors</li>
		<li>Public try-before-you-buy flows</li>
		<li>iframe or hosted player embeds</li>
	</ul>

	<h2>Integration</h2>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" />

	<p>Or with the web component:</p>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" />

	<h2>Requirements</h2>
	<ol>
		<li>Experience must be marked <strong>public</strong> in Liforma</li>
		<li>Your site's <strong>origin</strong> must be on the experience allowlist</li>
		<li>Browser must support required APIs (Web Speech API for voice input)</li>
	</ol>

	<h2>What the SDK does</h2>
	<ol>
		<li>Reads <code>experienceId</code> from your component</li>
		<li>Calls <code>POST /v1/public-sessions</code> with the page <code>Origin</code> header</li>
		<li>Receives a Session Manifest</li>
		<li>Starts the runtime — no API key on your server</li>
	</ol>

	<h2>Security model</h2>
	<p>
		Experience IDs are public. Security is enforced by origin allowlists, session token scoping, and
		usage quotas — not by hiding the ID.
	</p>

	<h2>Pricing</h2>
	<p>
		Public sessions are metered per minute. See <a href={externalLinks.pricing}>pricing</a>.
	</p>
</DocPage>
