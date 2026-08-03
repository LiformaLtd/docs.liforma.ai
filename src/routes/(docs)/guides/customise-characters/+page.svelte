<script lang="ts">
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

	<h2>Authoring</h2>
	<p>
		Create and edit characters in Experience Studio on
		<a href="https://app.liforma.ai">app.liforma.ai</a>. Published experiences expose character
		fields on the Session Manifest consumed by <code>@liforma/client</code>.
	</p>

	<h2>Multi-character experiences</h2>
	<p>
		Experiences may define multiple characters in the manifest. Host apps select which character
		speaks via <code>speak(&#123; text, characterId &#125;)</code> when needed. Dedicated
		focus/enter/exit controller APIs are not part of the public SDK yet — author multi-character
		layout and presence in Studio / the experience definition.
	</p>
</DocPage>
