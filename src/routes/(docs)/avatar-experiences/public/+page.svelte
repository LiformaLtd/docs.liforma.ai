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
	<p>
		In Svelte or SvelteKit, use the <code>&lt;Experience&gt;</code> component from
		<code>@liforma/client/svelte</code>:
	</p>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" />

	<p>
		In plain HTML, React, Vue, or other frameworks without the Svelte component, load the CDN script
		and use the <code>&lt;liforma-experience&gt;</code> web component:
	</p>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" />

	<h3>Why not <code>&lt;Experience&gt;</code> in HTML?</h3>
	<p>
		These are different integration surfaces for the same product concept. Svelte apps import a
		component named <code>Experience</code>. HTML embeds use a <strong>custom element</strong>, and
		browser rules require custom tag names to include a <strong>hyphen</strong> (for example
		<code>liforma-experience</code>) so they do not collide with native tags like
		<code>video</code> or future HTML elements. A bare <code>&lt;experience&gt;</code> tag is not a
		valid custom element name.
	</p>
	<p>
		The <code>liforma-</code> prefix also keeps the global tag unique on pages that may already use
		“experience” in their own markup. See <a href="/sdk-reference/web-component">Web Component</a>
		for attributes and framework examples.
	</p>

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
