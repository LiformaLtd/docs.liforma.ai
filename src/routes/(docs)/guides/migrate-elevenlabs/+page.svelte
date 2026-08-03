<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Migrate from ElevenLabs"
	description="Move from voice agents to animated avatar experiences."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Why migrate?</h2>
	<p>
		ElevenLabs Agents excel at voice conversation. Liforma extends that model with real-time avatar
		animation, richer experiences (worlds, state, tools), and a browser-native character runtime —
		while offering a familiar API for teams already shipping voice agents.
	</p>

	<h2>What maps cleanly</h2>
	<ul>
		<li><code>Conversation.startSession</code> → <code>Experience.startSession</code></li>
		<li><code>agentId</code> → <code>experienceId</code></li>
		<li><code>onMessage</code> / <code>onModeChange</code> → <code>experience.on('message')</code> / <code>on('modeChange')</code></li>
		<li><code>endSession()</code> → <code>end()</code></li>
		<li><code>elevenlabs-convai</code> → <code>liforma-convai</code> or <code>liforma-experience</code></li>
	</ul>

	<h2>What changes</h2>
	<ul>
		<li>You think in <strong>Experiences</strong>, not agents — characters, worlds, and state are first-class</li>
		<li>Sessions are minted via a <strong>Session Manifest</strong>, not a thin conversation token</li>
		<li>Transport and runtime details are hidden inside the SDK</li>
		<li>Browser embeds use <code>experienceId</code> + origin allowlists — no signed URL required</li>
	</ul>

	<h2>What Liforma adds</h2>
	<ul>
		<li>Real-time lip-sync and facial animation</li>
		<li>Multi-character and world/state models</li>
		<li>Tools and structured session state</li>
		<li>Hosted player and iframe options</li>
	</ul>

	<h2>Compatibility package</h2>
	<p>For incremental migration, use the ElevenLabs-shaped compatibility layer:</p>
	<CodeBlock code="npm install @liforma/elevenlabs-compatible" lang="bash" />

	<h3>Before (ElevenLabs)</h3>
	<CodeBlock
		code={`import { Conversation } from '@elevenlabs/client';

const conversation = await Conversation.startSession({
  agentId: 'J3Pbu5gP6NNKBscdCdwB'
});`}
		lang="javascript"
	/>

	<h3>After (Liforma compat)</h3>
	<CodeBlock code={snippets.elevenLabsCompat} lang="javascript" />

	<h3>Web component</h3>
	<CodeBlock code={snippets.elevenLabsWebComponent} lang="html" />

	<h2>API mapping</h2>
	<table>
		<thead>
			<tr>
				<th>ElevenLabs</th>
				<th>Liforma</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>Conversation</code></td>
				<td><code>Experience</code> (via compat layer or native SDK)</td>
			</tr>
			<tr>
				<td><code>agentId</code></td>
				<td><code>experienceId</code></td>
			</tr>
			<tr>
				<td><code>conversationToken</code></td>
				<td>Session Manifest / <code>sessionToken</code></td>
			</tr>
			<tr>
				<td><code>onMessage</code></td>
				<td><code>on('message')</code></td>
			</tr>
			<tr>
				<td><code>onModeChange</code></td>
				<td><code>on('modeChange')</code></td>
			</tr>
			<tr>
				<td><code>endSession()</code></td>
				<td><code>end()</code></td>
			</tr>
			<tr>
				<td><code>elevenlabs-convai</code></td>
				<td><code>liforma-convai</code> / <code>liforma-experience</code></td>
			</tr>
		</tbody>
	</table>

	<h2>Recommended native path</h2>
	<p>
		For new projects, use the native Liforma API — simpler, and unlocks avatar animation from day
		one:
	</p>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" />

	<p>
		The compat package is for brownfield migrations. Greenfield integrations should start with
		<a href="/getting-started/quick-start">Quick Start</a>.
	</p>
</DocPage>
