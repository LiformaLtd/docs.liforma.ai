<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Session Launch"
	description="SessionLaunchResponse schema reference."
	next={[
		{ title: 'Session Launch overview', href: '/avatar-experiences/session-manifests' },
		{ title: 'Sessions', href: '/api-reference/sessions' }
	]}
>
	<h2>SessionLaunchResponse</h2>
	<p>
		Both <code>/v1/sessions</code> and <code>/v1/browser-sessions</code> return this shape
		(<code>201</code>, <code>Cache-Control: no-store, private</code>). See
		<a href="/openapi/sessions.json"><code>/openapi/sessions.json</code></a> for the machine-readable
		contract.
	</p>

	<CodeBlock
		code={`{
  "session": {
    "id": "sess_…",
    "experienceId": "exp_…",
    "experienceRevisionId": "…",
    "expiresAt": "2026-08-11T12:30:00.000Z",
    "locale": "en-GB",
    "mode": "conversation",
    "capabilities": {
      "avatar": true,
      "speechInput": true,
      "speechOutput": true,
      "tools": false,
      "externalAudio": false
    }
  },
  "launch": "eyJ…"
}`}
		lang="json"
	/>

	<h2>Top-level fields</h2>
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>session</code></td>
				<td><code>object</code></td>
				<td>Minimal public session facts</td>
			</tr>
			<tr>
				<td><code>launch</code></td>
				<td><code>string</code></td>
				<td>Asymmetrically signed opaque bootstrap — do not parse</td>
			</tr>
		</tbody>
	</table>

	<h2><code>session</code> fields</h2>
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>id</code></td>
				<td><code>string</code></td>
				<td>Session id</td>
			</tr>
			<tr>
				<td><code>experienceId</code></td>
				<td><code>string</code></td>
				<td>Experience being run</td>
			</tr>
			<tr>
				<td><code>experienceRevisionId</code></td>
				<td><code>string</code></td>
				<td>Published revision id</td>
			</tr>
			<tr>
				<td><code>expiresAt</code></td>
				<td><code>string</code></td>
				<td>ISO 8601 expiry</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td><code>string</code></td>
				<td>BCP 47 locale</td>
			</tr>
			<tr>
				<td><code>mode</code></td>
				<td><code>string</code></td>
				<td><code>conversation</code> | <code>presenter</code></td>
			</tr>
			<tr>
				<td><code>capabilities</code></td>
				<td><code>object</code></td>
				<td>Boolean flags for avatar, speech I/O, tools, external audio</td>
			</tr>
		</tbody>
	</table>

	<p>
		Runtime internals (transport, pipeline, renderer, <code>sessionToken</code>, characters) are
		<strong>not</strong> part of the public API — they live only inside opaque <code>launch</code>.
	</p>
</DocPage>
