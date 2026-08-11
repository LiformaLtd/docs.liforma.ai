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
		{ title: 'Browser Sessions', href: '/api-reference/browser-sessions' },
		{ title: 'Session Launch', href: '/api-reference/manifests' },
		{ title: 'Errors', href: '/api-reference/errors' }
	]}
>
	<h2>POST /v1/sessions</h2>
	<p>
		Mint a Session Launch using a developer API key. Server-to-server only — preferred when you
		have a backend. See <a href="/avatar-experiences/server-sessions">Server sessions</a>.
	</p>

	<h3>Request</h3>
	<CodeBlock
		code={`POST https://api.liforma.ai/v1/sessions
Authorization: Bearer YOUR_API_KEY
Idempotency-Key: optional-unique-key
Content-Type: application/json

{
  "experienceId": "${snippets.experienceId}",
  "locale": "en-GB",
  "mode": "presenter",
  "speechInputMode": "manual",
  "speechOnly": false
}`}
		lang="http"
	/>

	<h3>Response <code>201</code></h3>
	<p>
		<a href="/api-reference/manifests">SessionLaunchResponse</a> — same shape as browser sessions.
		Header: <code>Cache-Control: no-store, private</code>.
	</p>

	<h3>Authentication</h3>
	<p>
		<code>Authorization: Bearer &lt;developer_api_key&gt;</code> (
		<code>lfm_test_…</code> or <code>lfm_live_…</code>; requires scope
		<code>sessions:create</code>). Never expose API keys to the browser.
	</p>
	<p>
		Optional <code>Idempotency-Key</code>: same key + same body replays the prior launch; same key +
		different body → <code>409 IDEMPOTENCY_CONFLICT</code>.
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
				<td>Primary / user language (BCP 47, e.g. <code>en-GB</code>)</td>
			</tr>
			<tr>
				<td><code>secondaryLocale</code></td>
				<td>No*</td>
				<td>
					Dual: paired / learning language. Non-dual Match: immerses the session in this
					language (wins over <code>locale</code>).
				</td>
			</tr>
			<tr>
				<td><code>learningLocale</code></td>
				<td>No</td>
				<td>Alias of <code>secondaryLocale</code> (language-learning apps)</td>
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
		</tbody>
	</table>

	<p>
		* Required for dual experiences when the paired/learning language is Match in Studio. See
		<a href="/api-reference/browser-sessions">Browser Sessions</a> for the same locale contract.
	</p>

	<p>
		Player chrome (<code>startButton</code>, <code>closeButton</code>, <code>returnUrl</code>,
		<code>fit</code>) belongs on SDK <code>attach</code> / component props — not on this request.
	</p>

	<p>
		Machine-readable contract:
		<a href="/openapi/sessions.json"><code>/openapi/sessions.json</code></a>.
	</p>

	<h3>Example</h3>
	<CodeBlock code={snippets.sessionsCurl} lang="bash" />

	<h2>GET /v1/sessions/{'{sessionId}'}</h2>
	<p>
		Read a persisted runtime session (API key, scope <code>sessions:read</code>). Returns
		<code>status</code>, timestamps, and stub <code>usage: {'{ seconds: 0 }'}</code> until metering
		ships.
	</p>

	<h2>POST /v1/sessions/{'{sessionId}'}/end</h2>
	<p>
		Mark a session ended (API key, scope <code>sessions:create</code>). Sets
		<code>status: ended</code> and <code>endedAt</code>.
	</p>
</DocPage>
