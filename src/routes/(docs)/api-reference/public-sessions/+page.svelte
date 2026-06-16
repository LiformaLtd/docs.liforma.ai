<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Public Sessions"
	description="Mint sessions for public embeds from the browser."
	next={[
		{ title: 'Sessions', href: '/api-reference/sessions' },
		{ title: 'Public Experiences', href: '/avatar-experiences/public' }
	]}
>
	<h2>POST /v1/public-sessions</h2>
	<p>
		Called by the SDK when you use <code>experienceId</code> on a public embed. Requires a valid
		<code>Origin</code> header.
	</p>

	<h3>Request</h3>
	<CodeBlock
		code={`POST https://api.liforma.ai/v1/public-sessions
Origin: https://your-app.com
Content-Type: application/json

{
  "experienceId": "${snippets.experienceId}"
}`}
		lang="http"
	/>

	<h3>Response <code>200</code></h3>
	<p>Session Manifest JSON.</p>

	<h3>Checks</h3>
	<ul>
		<li><code>Origin</code> header required</li>
		<li>Experience must exist and be public</li>
		<li>Origin must be on the experience allowlist</li>
		<li>Quota and rate limits apply</li>
	</ul>

	<h3>CORS</h3>
	<p>
		<code>api.liforma.ai</code> returns CORS headers for allowlisted origins. The SDK calls this
		endpoint directly from the browser.
	</p>

	<h3>Example</h3>
	<CodeBlock code={snippets.publicSessionsCurl} lang="bash" />
</DocPage>
