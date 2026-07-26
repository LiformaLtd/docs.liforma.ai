<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Sessions"
	description="Authenticated session minting for private experiences."
	next={[
		{ title: 'Experience Catalog', href: '/api-reference/experience-catalog' },
		{ title: 'Public Sessions', href: '/api-reference/public-sessions' },
		{ title: 'Manifests', href: '/api-reference/manifests' },
		{ title: 'Errors', href: '/api-reference/errors' }
	]}
>
	<h2>POST /v1/sessions</h2>
	<p>Mint a Session Manifest using a developer API key. Server-to-server only.</p>

	<h3>Request</h3>
	<CodeBlock
		code={`POST https://api.liforma.ai/v1/sessions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "experienceId": "${snippets.experienceId}",
  "userId": "user_123",
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
				<td><code>userId</code></td>
				<td>No</td>
				<td>Your user's ID for per-user context and billing</td>
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

	<h3>Example</h3>
	<CodeBlock code={snippets.sessionsCurl} lang="bash" />
</DocPage>
