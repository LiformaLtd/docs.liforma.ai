<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Session Launch"
	description="The per-launch public contract between the API and the SDK."
	next={[
		{ title: 'Browser Sessions API', href: '/api-reference/browser-sessions' },
		{ title: 'Session Launch API', href: '/api-reference/manifests' },
		{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' }
	]}
>
	<h2>What is a Session Launch?</h2>
	<p>
		Both mint endpoints return a <strong>SessionLaunchResponse</strong> — not a full runtime
		configuration document:
	</p>
	<ul>
		<li>
			<code>session</code> — minimal public facts (id, experience, revision, expiry, locale, mode,
			capabilities)
		</li>
		<li>
			<code>launch</code> — asymmetrically signed opaque bootstrap for
			<code>@liforma/client</code> / <code>player.liforma.ai</code>
		</li>
	</ul>

	<h2>Do I need to parse <code>launch</code>?</h2>
	<p>
		<strong>No.</strong> The SDK and player consume <code>launch</code> automatically. Do not parse
		it — its structure is unsupported and may change. Opaque means contract boundary, not a promise
		that page JavaScript cannot inspect the bytes.
	</p>

	<h2>Example response</h2>
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
		filename="session-launch.json"
	/>

	<h2>Public <code>session</code> fields</h2>
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>id</code></td>
				<td>Session id (<code>sess_…</code>)</td>
			</tr>
			<tr>
				<td><code>experienceId</code></td>
				<td>Experience being run</td>
			</tr>
			<tr>
				<td><code>experienceRevisionId</code></td>
				<td>Published revision this session runs</td>
			</tr>
			<tr>
				<td><code>expiresAt</code></td>
				<td>ISO 8601 expiry</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td>BCP 47 locale</td>
			</tr>
			<tr>
				<td><code>mode</code></td>
				<td><code>conversation</code> or <code>presenter</code></td>
			</tr>
			<tr>
				<td><code>capabilities</code></td>
				<td>Avatar, speech I/O, tools, external audio flags</td>
			</tr>
		</tbody>
	</table>

	<p>
		Transport, pipeline, renderer, characters, and credentials live only inside opaque
		<code>launch</code> (private runtime bootstrap). Player chrome
		(<code>startButton</code>, <code>returnUrl</code>, …) is configured via SDK
		<code>attach</code>, not mint.
	</p>

	<h2>How launches are minted</h2>
	<table>
		<thead>
			<tr>
				<th>Endpoint</th>
				<th>Auth</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>POST /v1/browser-sessions</code></td>
				<td>Origin allowlist + browser embeds enabled</td>
			</tr>
			<tr>
				<td><code>POST /v1/sessions</code></td>
				<td>Developer API key</td>
			</tr>
		</tbody>
	</table>
	<p>
		Both return <code>201</code> with the same <code>SessionLaunchResponse</code> shape and
		<code>Cache-Control: no-store, private</code>.
	</p>
</DocPage>
