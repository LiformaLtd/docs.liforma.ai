<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Migrate from ElevenLabs"
	description="Drop-in compatibility for ElevenLabs Agents integrations."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<Callout variant="beta" title="Preview">
		<p>
			The <code>@liforma/elevenlabs-compatible</code> package is rolling out. Mapping below reflects
			the target compatibility layer.
		</p>
	</Callout>

	<h2>Why migrate?</h2>
	<p>
		Liforma adds real-time avatar animation, richer experiences (worlds, state, tools), and
		browser-native rendering — while keeping a familiar API surface for voice agent developers.
	</p>

	<h2>Compatibility package</h2>
	<CodeBlock code="npm install @liforma/elevenlabs-compatible" lang="bash" />

	<h2>Before (ElevenLabs)</h2>
	<CodeBlock
		code={`import { Conversation } from '@elevenlabs/client';

const conversation = await Conversation.startSession({
  agentId: 'J3Pbu5gP6NNKBscdCdwB'
});`}
		lang="javascript"
	/>

	<h2>After (Liforma compat)</h2>
	<CodeBlock code={snippets.elevenLabsCompat} lang="javascript" />

	<h2>Web component</h2>
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
				<td><code>Experience</code> (via compat layer)</td>
			</tr>
			<tr>
				<td><code>agentId</code></td>
				<td><code>experienceId</code> (mapped internally)</td>
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

	<h2>Native Liforma path</h2>
	<p>
		For new projects, use the native API directly — it's simpler and unlocks avatar animation:
	</p>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" />

	<h2>Signed URLs</h2>
	<p>
		Native Liforma public experiences do not require signed URLs. The compat layer may provide
		<code>getSignedUrl()</code> shims for legacy ElevenLabs flows that expect them.
	</p>
</DocPage>
