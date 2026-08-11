<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Browser Sessions"
	description="Browser mint endpoint — Origin allowlist auth."
	next={[
		{ title: 'Sessions', href: '/api-reference/sessions' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' }
	]}
>
	<h2>POST /v1/browser-sessions</h2>
	<p>
		Called by the SDK for <a href="/avatar-experiences/browser-embeds">browser embeds</a> when you
		pass <code>experienceId</code>. Auth is the page <code>Origin</code> against your allowlist —
		not an API key in the browser.
	</p>

	<h3>Request</h3>
	<CodeBlock
		code={`POST https://api.liforma.ai/v1/browser-sessions
Origin: https://your-app.com
Content-Type: application/json

{
  "experienceId": "${snippets.experienceId}",
  "locale": "en-GB",
  "mode": "conversation",
  "speechInputMode": "auto",
  "speechOnly": false
}`}
		lang="http"
	/>

	<h3>Response <code>201</code></h3>
	<p>
		<a href="/avatar-experiences/session-manifests">SessionLaunchResponse</a>:
		<code>session</code> plus opaque <code>launch</code>. Header:
		<code>Cache-Control: no-store, private</code>.
	</p>

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
				<td><code>locale</code></td>
				<td>No</td>
				<td>BCP 47 locale (e.g. <code>en-GB</code>)</td>
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
		</tbody>
	</table>

	<p>
		Player chrome (<code>startButton</code>, <code>closeButton</code>, <code>returnUrl</code>,
		<code>fit</code>) is configured via SDK <code>attach</code> / component props — not on this
		request.
	</p>

	<h3>Checks</h3>
	<ul>
		<li><code>Origin</code> header required</li>
		<li>Browser embeds must be enabled for the project</li>
		<li>Origin must be on the project allowlist</li>
		<li>Experience must have a published revision</li>
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
	<CodeBlock code={snippets.browserSessionsCurl} lang="bash" />
</DocPage>
