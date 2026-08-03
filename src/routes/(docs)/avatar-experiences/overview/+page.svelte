<script lang="ts">
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Avatar Experiences"
	description="The full Liforma platform — intelligent characters that listen, think, speak, and animate."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' },
		{ title: 'Events', href: '/avatar-experiences/events' }
	]}
>
	<h2>What is an Avatar Experience?</h2>
	<p>
		An Avatar Experience is a live, interactive session with an AI character. The character can:
	</p>
	<ul>
		<li><strong>Listen</strong> — via browser speech recognition or streamed audio</li>
		<li><strong>Think</strong> — powered by a configurable language model</li>
		<li><strong>Speak</strong> — with natural text-to-speech</li>
		<li><strong>Animate</strong> — lip-sync, expressions, and body motion in real time</li>
		<li><strong>Interact</strong> — update state, use tools, and exist in richer scenes</li>
	</ul>

	<h2>Simple to rich</h2>
	<p>Experiences scale from a single tutor to multi-character worlds:</p>
	<table>
		<thead>
			<tr>
				<th>Complexity</th>
				<th>Example</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Single character</td>
				<td>Spanish language tutor in a virtual café</td>
			</tr>
			<tr>
				<td>Stateful</td>
				<td>Interview coach that tracks progress across turns</td>
			</tr>
			<tr>
				<td>Multi-character</td>
				<td>Adventure game with NPCs in different locations</td>
			</tr>
			<tr>
				<td>Tool-enabled</td>
				<td>Sales trainer that checks CRM data mid-conversation</td>
			</tr>
		</tbody>
	</table>

	<h2>How you integrate</h2>
	<p>One line for public experiences:</p>
	<pre class="diagram">&lt;Experience experienceId="exp_…" /&gt;</pre>
	<p>
		The SDK handles session minting, transport, audio, turns, avatar rendering, and lifecycle. See
		<a href="/getting-started/quick-start">Quick Start</a>.
	</p>

	<h2>vs standalone capabilities</h2>
	<p>
		Liforma also offers <a href="/capabilities/text-to-avatar">Text-to-Avatar</a>,
		<a href="/capabilities/text-to-speech">Text-to-Speech</a>, and
		<a href="/capabilities/speech-to-speech">Speech-to-Speech</a> as focused APIs. Avatar Experiences
		combine these into a complete character platform with state, tools, and worlds.
	</p>
</DocPage>

<style>
	.diagram {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		padding: 1rem 1.25rem;
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		margin: 0 0 1.5rem;
	}
</style>
