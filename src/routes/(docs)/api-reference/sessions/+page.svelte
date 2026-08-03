<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Sessions"
	description="Server-side session minting with a developer API key."
	next={[
		{ title: 'Experience Catalog', href: '/api-reference/experience-catalog' },
		{ title: 'Public Sessions', href: '/api-reference/public-sessions' },
		{ title: 'Manifests', href: '/api-reference/manifests' },
		{ title: 'Errors', href: '/api-reference/errors' }
	]}
>
	<h2>POST /v1/sessions</h2>
	<p>
		Mint a Session Manifest using a developer API key. Server-to-server only — preferred when you
		have a backend. See <a href="/avatar-experiences/server-sessions">Server sessions</a>.
	</p>

	<h3>Request</h3>
	<CodeBlock
		code={`POST https://api.liforma.ai/v1/sessions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "experienceId": "${snippets.experienceId}",
  "language": "en",
  "mode": "presenter",
  "speechInputMode": "manual",
  "speechOnly": false,
  "integration": {
    "returnUrl": "/dashboard"
  },
  "closeButton": {
    "visible": true,
    "position": "top-right"
  }
}`}
		lang="http"
	/>

	<h3>Response <code>200</code></h3>
	<p>Session Manifest JSON. Same shape as public sessions.</p>

	<h3>Authentication</h3>
	<p>
		<code>Authorization: Bearer &lt;developer_api_key&gt;</code>. Never expose API keys to the
		browser.
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
				<td>
					When <code>true</code>, mint a voice-only session (no avatar capability / location scene)
				</td>
			</tr>
			<tr>
				<td><code>startButton</code></td>
				<td>No</td>
				<td>Player-owned startup button configuration</td>
			</tr>
			<tr>
				<td><code>processorId</code></td>
				<td>No</td>
				<td>Named browser conversation processor id when applicable</td>
			</tr>
			<tr>
				<td><code>integration</code></td>
				<td>No</td>
				<td>Return URL and close navigation</td>
			</tr>
			<tr>
				<td><code>closeButton</code></td>
				<td>No</td>
				<td>Close button visibility and style</td>
			</tr>
		</tbody>
	</table>

	<p>
		Machine-readable contract:
		<a href="/openapi/sessions.json"><code>/openapi/sessions.json</code></a>.
	</p>

	<h3>Example</h3>
	<CodeBlock code={snippets.sessionsCurl} lang="bash" />
</DocPage>
