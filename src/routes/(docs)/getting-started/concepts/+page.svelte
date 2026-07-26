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
	<p>You integrate at the Experience level — not at tokens, HTTP routes, or player endpoints.</p>

	<h2>Experience</h2>
	<p>
		An Experience is your reusable product configuration, identified by <code>exp_…</code>. It
		defines who appears, how they behave, and what they can do.
	</p>
	<ul>
		<li><strong>Characters</strong> — who appears (agent + avatar + voice)</li>
		<li><strong>World</strong> — rules and context for the session</li>
		<li><strong>Location</strong> — where the scene takes place</li>
		<li><strong>State</strong> — structured facts that update during the session</li>
		<li><strong>Tools</strong> — controlled capabilities the character can invoke</li>
	</ul>

	<h2>Session</h2>
	<p>
		A Session is one live runtime instance — one user opening your experience, one conversation, one
		playthrough. Sessions are short-lived and scoped.
	</p>

	<h2>Session Manifest</h2>
	<p>
		When a session starts, the API returns a <strong>Session Manifest</strong>: JSON that tells the
		SDK how to run this launch — characters, transport, assets, integration rules, and a session
		token.
	</p>
	<p>
		Most developers never inspect the manifest. The SDK consumes it automatically. See
		<a href="/avatar-experiences/session-manifests">Session Manifests</a>.
	</p>

	<h2>Character</h2>
	<p>
		A Character is an entity inside an experience — the combination of conversational agent, visual
		avatar, and voice. A simple tutor has one character; richer experiences can have several.
	</p>

	<h2>Transport</h2>
	<p>
		Transport is how the SDK connects to the Liforma runtime. It is declared in the manifest and
		<strong>hidden from integrators</strong>. You never configure HTTP routes, WebSockets, or
		LiveKit rooms.
	</p>

	<h2>Catalog vs session mint</h2>
	<p>
		Creators manage human-friendly <code>slug</code> values and gallery ordering in Studio. Your app
		fetches the project catalog server-side, links by slug, and still mints sessions with
		<code>experienceId</code>.
	</p>
	<p>
		See <a href="/guides/dynamic-experience-gallery">Build a Dynamic Experience Gallery</a> and
		<a href="/api-reference/experience-catalog">Experience Catalog API</a>.
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
				<td><a href="/avatar-experiences/public">Public experience</a></td>
				<td>Embeds on allowlisted origins</td>
				<td>No</td>
			</tr>
			<tr>
				<td><a href="/avatar-experiences/authenticated">Authenticated experience</a></td>
				<td>Private apps, per-user sessions, API-key billing</td>
				<td>Yes — your server mints the manifest</td>
			</tr>
		</tbody>
	</table>

	<h2>Tool</h2>
	<p>
		A Tool is a controlled external capability — look up a score, advance a quest, fetch account data.
		Tools are declared on the experience and invoked by the character. Your app observes results via
		<a href="/avatar-experiences/events">events</a> and state updates, not by calling tool HTTP
		endpoints directly.
	</p>

	<h2>Event</h2>
	<p>
		Events are the SDK's way of reporting what happened — new messages, mode changes (listening /
		speaking), state updates, and character lifecycle. Subscribe with <code>experience.on(…)</code>.
		See <a href="/guides/events">Listen to Events</a>.
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
