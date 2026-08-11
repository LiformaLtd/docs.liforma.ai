<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Concepts"
	description="Core ideas behind the Liforma platform."
	next={[
		{ title: 'Session Launch', href: '/avatar-experiences/session-manifests' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
		{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' }
	]}
>
	<h2>The mental model</h2>
	<pre class="diagram">Experience
    ↓
published ExperienceRevision
    ↓
Session Launch
    ↓
SDK</pre>
	<p>
		You configure an <strong>Experience</strong>. Publishing freezes a revision. Each mint returns a
		<strong>Session Launch</strong> (<code>session</code> + opaque <code>launch</code>). The
		<strong>SDK</strong> runs the session.
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

	<h2>Session Launch</h2>
	<p>
		When a session starts, the API returns a <strong>SessionLaunchResponse</strong>: a minimal
		public <code>session</code> object plus an opaque <code>launch</code> string for the player.
		Do not parse <code>launch</code>.
	</p>
	<p>
		Most developers never inspect the response details. The SDK consumes it automatically. See
		<a href="/avatar-experiences/session-manifests">Session Launch</a>.
	</p>

	<h2>How sessions are authorized (mint auth)</h2>
	<p>There are two ways to start a session:</p>
	<table>
		<thead>
			<tr>
				<th>Mint path</th>
				<th>How it works</th>
				<th>When</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><a href="/avatar-experiences/server-sessions">Server sessions (API key)</a></td>
				<td>Your backend calls <code>POST /v1/sessions</code>; key never hits the browser</td>
				<td>
					<strong>Preferred</strong> when you have a server — per-user context, tighter control
				</td>
			</tr>
			<tr>
				<td><a href="/avatar-experiences/browser-embeds">Browser embeds (origins)</a></td>
				<td>
					SDK calls the browser mint endpoint; Liforma checks the page
					<code>Origin</code> against your allowlist
				</td>
				<td>Client-only apps with no backend</td>
			</tr>
		</tbody>
	</table>
	<p>
		<strong>Allowed origins</strong> stop third parties from embedding your experience on websites
		you did not approve — so they cannot burn your paid minutes.
	</p>

	<h2>Character</h2>
	<p>
		A Character is an entity inside an experience — the combination of conversational agent, visual
		avatar, and voice. A simple tutor has one character; richer experiences can have several.
	</p>

	<h2>Transport</h2>
	<p>
		Transport is how the player connects to the Liforma runtime. It is sealed inside opaque
		<code>launch</code> and <strong>hidden from integrators</strong>. You never configure HTTP
		routes, WebSockets, or LiveKit rooms.
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

	<h2>Tool</h2>
	<p>
		A Tool is a controlled external capability — look up a score, advance a quest, fetch account data.
		Tools are declared on the experience and invoked by the character. Your app observes results via
		<a href="/avatar-experiences/events">events</a> and state updates, not by calling tool HTTP
		endpoints directly.
	</p>

	<h2>Event</h2>
	<p>
		Events are the SDK's way of reporting what happened — new messages,
		<code>activityChange</code> (idle / listening / thinking / speaking), and speech boundaries.
		Subscribe with <code>experience.on(…)</code>.
		See <a href="/guides/events">Listen to Events</a>.
	</p>

	<h2>IDs are not secret</h2>
	<p>
		Experience IDs (<code>exp_…</code>) are public identifiers, like YouTube video IDs. Security
		comes from origin allowlists, session tokens, quotas, and API keys — not ID secrecy.
	</p>

	<Callout title="Browser mint">
		<p>
			Browser embeds call <code>POST /v1/browser-sessions</code> with the page
			<code>Origin</code>. Configure allowed origins in the developer portal.
		</p>
	</Callout>
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
