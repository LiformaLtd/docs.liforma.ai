<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience (HTML)"
	description="Embed a Liforma Avatar Experience with a CDN script and one HTML tag — no build step. Works in WordPress, Webflow, Squarespace, Framer, Shopify, Wix, Ghost, and plain HTML sites."
	next={[
		{ title: 'Web Component attributes', href: '/sdk-reference/web-component' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
		{ title: 'Embed an Experience', href: '/guides/embed' }
	]}
>
	<h2>Overview</h2>
	<p>
		<strong>Experience (HTML)</strong> is the no-build Liforma integration: load the CDN client and
		drop in <code>&lt;liforma-experience&gt;</code>. Use it for plain HTML pages and CMS / site
		builders — including <strong>WordPress</strong>, <strong>Webflow</strong>,
		<strong>Squarespace</strong>, <strong>Framer</strong>, <strong>Shopify</strong>,
		<strong>Wix</strong>, and <strong>Ghost</strong> — whenever you can paste custom HTML. Prefer
		<a href="/avatar-experiences/svelte">Experience (Svelte)</a> or
		<a href="/avatar-experiences/react">Experience (React)</a> when you are already in those
		frameworks and want typed props and imperative handles.
	</p>

	<h2>Basic usage</h2>
	<p>
		Add the CDN script (normally in <code>&lt;head&gt;</code>), then the custom element inside a sized
		container. The SDK mints a public session from your <code>experience-id</code> and mounts the
		hosted player.
	</p>
	<CodeBlock code={snippets.htmlExperienceHelloWorld} lang="html" filename="index.html" />

	<h2>Prerequisites</h2>
	<ul>
		<li>A published public <code>experienceId</code> (e.g. <code>exp_…</code>)</li>
		<li>
			Your site origin on the project allowlist in
			<a href="https://app.liforma.ai">app.liforma.ai</a> (scheme + host + port)
		</li>
		<li>HTTPS in production (required for microphone access)</li>
		<li>A container with explicit size (the element defaults to <code>min-height: 480px</code>)</li>
	</ul>

	<h2>WordPress and other CMS hosts</h2>
	<p>
		For a <strong>WordPress</strong> Liforma integration, paste the snippet into a
		<strong>Custom HTML</strong> block (or theme header/footer). The block editor and many security
		plugins strip bare <code>&lt;script&gt;</code> tags from post content — if the script is removed,
		put the CDN script in the theme / Site Editor and leave only
		<code>&lt;liforma-experience&gt;</code> in the page.
	</p>
	<p>
		The same pattern applies to <strong>Webflow</strong> (Embed element), <strong>Squarespace</strong>
		(Code block), <strong>Framer</strong> (Embed), <strong>Shopify</strong> (Custom Liquid / theme),
		<strong>Wix</strong> (Embed HTML), and <strong>Ghost</strong> (HTML card): allow custom HTML,
		allowlist the live origin, and give the embed enough height.
	</p>

	<h2>Attributes</h2>
	<table>
		<thead>
			<tr>
				<th>Attribute</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>experience-id</code></td>
				<td>Experience ID (browser mint via origins)</td>
			</tr>
			<tr>
				<td><code>session-endpoint</code></td>
				<td>Same-origin route for server-session minting</td>
			</tr>
			<tr>
				<td><code>language</code></td>
				<td>Optional <code>en</code> or <code>es</code> override</td>
			</tr>
			<tr>
				<td><code>mode</code></td>
				<td>Optional <code>conversation</code> or <code>presenter</code></td>
			</tr>
			<tr>
				<td><code>speech-input-mode</code></td>
				<td>Optional <code>auto</code>, <code>manual</code>, or <code>off</code></td>
			</tr>
			<tr>
				<td><code>fit</code></td>
				<td>
					Optional <code>full</code> (default) or <code>face</code> for inset / PIP layouts
				</td>
			</tr>
			<tr>
				<td><code>speech-only</code></td>
				<td>
					Set to <code>"true"</code> for voice-only sessions (no avatar renderer)
				</td>
			</tr>
		</tbody>
	</table>
	<p>
		Full attribute notes and the ElevenLabs compat element:
		<a href="/sdk-reference/web-component">Web Component</a>.
	</p>

	<h2>Direct iframe (no CDN script)</h2>
	<p>
		If your host blocks scripts in content, iframe the player instead. Still allowlist the parent
		origin for the experience:
	</p>
	<CodeBlock
		code={`<iframe
  src="https://player.liforma.ai/embed?experienceId=${snippets.experienceId}"
  allow="microphone"
  style="width: 100%; height: 480px; border: 0;"
></iframe>`}
		lang="html"
	/>

	<h2>Live example</h2>
	<p>
		See the
		<a href="https://examples.liforma.ai/examples/basic-embed/vanilla/"
			>basic-embed vanilla example</a
		>
		and its
		<a
			href="https://github.com/LiformaLtd/examples.liforma.ai/tree/main/examples/basic-embed/vanilla"
			>source on GitHub</a
		>.
	</p>
</DocPage>
