<script lang="ts">
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Concepts"
	description="Core ideas behind the Liforma platform."
	next={[
		{ title: 'Session Manifests', href: '/avatar-experiences/session-manifests' },
		{ title: 'Public Experiences', href: '/avatar-experiences/public' },
		{ title: 'Avatar Experiences Overview', href: '/avatar-experiences/overview' }
	]}
>
	<h2>The mental model</h2>
	<pre class="diagram">Experience
    ↓
Session Manifest
    ↓
SDK</pre>
	<p>
		You configure an <strong>Experience</strong>. Each launch receives a <strong>Session
		Manifest</strong>. The <strong>SDK</strong> runs the session.
	</p>
	<p>You do not integrate at the token, HTTP route, or player level.</p>

	<h2>Experience</h2>
	<p>
		An Experience is the main product unit — a reusable configuration identified by
		<code>exp_…</code>. It composes:
	</p>
	<ul>
		<li><strong>Characters</strong> — who appears (agent + avatar + voice)</li>
		<li><strong>World</strong> — rules and context</li>
		<li><strong>Location</strong> — where the scene takes place</li>
		<li><strong>State</strong> — structured facts that update during the session</li>
		<li><strong>Tools</strong> — controlled external capabilities for the character</li>
	</ul>
	<p>
		A language tutor is an experience. A multi-character adventure game is also an experience.
	</p>

	<h2>Session</h2>
	<p>
		A Session is one live runtime instance of an experience — one user launch, one conversation, one
		playthrough. Sessions are short-lived and scoped.
	</p>

	<h2>Session Manifest</h2>
	<p>
		When a session starts, the API returns a <strong>Session Manifest</strong>: a JSON document that
		tells the SDK everything it needs for this launch — characters, transport, assets, integration
		rules, and a session token.
	</p>
	<p>
		Most developers never inspect the manifest. Advanced users and server-side integrations can.
		See <a href="/avatar-experiences/session-manifests">Session Manifests</a>.
	</p>

	<h2>Public vs authenticated</h2>
	<table>
		<thead>
			<tr>
				<th>Mode</th>
				<th>When</th>
				<th>Backend required?</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><a href="/avatar-experiences/public">Public</a></td>
				<td>Embeds on allowlisted origins</td>
				<td>No</td>
			</tr>
			<tr>
				<td><a href="/avatar-experiences/authenticated">Authenticated</a></td>
				<td>Private apps, user-specific sessions</td>
				<td>Yes — your server mints the manifest</td>
			</tr>
		</tbody>
	</table>

	<h2>Transport</h2>
	<p>
		Transport is <strong>hidden</strong>. The manifest declares how the SDK connects to the runtime
		(HTTP streaming today; WebRTC and LiveKit in future). You never configure connection types,
		WebSockets, or LiveKit rooms.
	</p>

	<h2>IDs are public</h2>
	<p>
		Experience IDs (<code>exp_…</code>) are public identifiers, like YouTube video IDs. Security
		comes from origin allowlists, session tokens, quotas, and API keys — not ID secrecy.
	</p>
</DocPage>

<style>
	.diagram {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.5;
		padding: 1.25rem 1.5rem;
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		margin: 0 0 1.5rem;
		overflow-x: auto;
	}
</style>
