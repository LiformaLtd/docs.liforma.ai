<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Customise Characters"
	description="Configure avatars, voices, and agents in your experience."
	next={[
		{ title: 'Session Manifests', href: '/avatar-experiences/session-manifests' },
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' }
	]}
>
	<Callout variant="beta" title="Preview">
		<p>Self-service character editing in the creator dashboard is coming soon. Contact us for early access.</p>
	</Callout>

	<h2>Character model</h2>
	<p>Each character in an experience combines:</p>
	<ul>
		<li><strong>Avatar</strong> — visual identity and animation rig (<code>avatarId</code>)</li>
		<li><strong>Voice</strong> — TTS voice and settings (<code>voiceId</code>)</li>
		<li><strong>Agent</strong> — conversational intelligence (<code>agentId</code>)</li>
		<li><strong>STT language</strong> — speech recognition locale (<code>sttLang</code>)</li>
	</ul>

	<h2>In the manifest</h2>
	<p>Characters appear in the Session Manifest:</p>
	<CodeBlock code={snippets.characterManifestSnippet} lang="json" />

	<h2>Multi-character (future)</h2>
	<p>
		Richer experiences support multiple characters with <code>focusCharacter()</code> and
		<code>characterEnter</code> / <code>characterExit</code> events.
	</p>
</DocPage>
