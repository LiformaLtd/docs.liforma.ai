<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Public Sessions"
	description="Browser mint endpoint — Origin allowlist auth (path name is historical)."
	next={[
		{ title: 'Sessions', href: '/api-reference/sessions' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' }
	]}
>
	<h2>POST /v1/public-sessions</h2>
	<p>
		Called by the SDK for <a href="/avatar-experiences/browser-embeds">browser embeds</a> when you
		pass <code>experienceId</code>. Auth is the page <code>Origin</code> against your allowlist —
		not an API key in the browser.
	</p>

	<Callout title="Name is historical">
		<p>
			Despite the path name, this endpoint is the <strong>browser mint</strong> path. It is not the
			same as making an experience “public” in Studio. Prefer product terms
			<em>browser embed</em> and <em>allowed origins</em>.
		</p>
	</Callout>

	<h3>Request</h3>
	<CodeBlock
		code={`POST https://api.liforma.ai/v1/public-sessions
Origin: https://your-app.com
Content-Type: application/json

{
  "experienceId": "${snippets.experienceId}",
  "language": "en",
  "mode": "conversation",
  "speechInputMode": "auto",
  "speechOnly": false
}`}
		lang="http"
	/>

	<h3>Response <code>200</code></h3>
	<p>Session Manifest JSON.</p>

	<h3>Parameters</h3>
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>experienceId</code></td>
				<td>Yes</td>
				<td>Experience to launch</td>
			</tr>
			<tr>
				<td><code>language</code></td>
				<td>No</td>
				<td><code>en</code> or <code>es</code></td>
			</tr>
			<tr>
				<td><code>mode</code></td>
				<td>No</td>
				<td><code>conversation</code> or <code>presenter</code></td>
			</tr>
			<tr>
				<td><code>speechInputMode</code></td>
				<td>No</td>
				<td><code>auto</code>, <code>manual</code>, or <code>off</code></td>
			</tr>
			<tr>
				<td><code>speechOnly</code></td>
				<td>No</td>
				<td>When <code>true</code>, voice-only session without avatar/location assets</td>
			</tr>
			<tr>
				<td><code>startButton</code></td>
				<td>No</td>
				<td>Player-owned startup button configuration</td>
			</tr>
		</tbody>
	</table>

	<h3>Checks</h3>
	<ul>
		<li><code>Origin</code> header required</li>
		<li>Browser embeds must be enabled for the project</li>
		<li>Origin must be on the project allowlist</li>
		<li>Quota and rate limits apply</li>
	</ul>

	<h3>CORS</h3>
	<p>
		<code>api.liforma.ai</code> returns CORS headers for allowlisted origins. The SDK calls this
		endpoint directly from the browser.
	</p>

	<p>
		Machine-readable contract:
		<a href="/openapi/sessions.json"><code>/openapi/sessions.json</code></a>.
	</p>

	<h3>Example</h3>
	<CodeBlock code={snippets.publicSessionsCurl} lang="bash" />
</DocPage>
