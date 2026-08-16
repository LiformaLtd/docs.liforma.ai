<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Customise Characters"
	description="Configure avatars, voices, and agents in your experience."
	next={[
		{ title: 'Session Launch', href: '/avatar-experiences/session-manifests' },
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

	<h2>Inside the experience (Studio)</h2>
	<p>
		Characters are authored on the experience; the player receives them inside opaque
		<code>launch</code> (not a public Session field). Illustrative shape only — do not parse
		<code>launch</code>:
	</p>
	<CodeBlock code={snippets.characterManifestSnippet} lang="json" />

	<h2>Authoring</h2>
	<p>
		Create and edit characters in Experience Studio on
		<a href="https://app.liforma.ai">app.liforma.ai</a>. Published experiences expose character
		fields inside opaque <code>launch</code> consumed by the player — not public Session fields.
	</p>

	<h2>Multi-character experiences</h2>
	<p>
		Experiences may define multiple characters on a node. Host apps can call
		<code>speak(&#123; text, characterId &#125;)</code> for scripted lines. On multi-Character nodes,
		<code>focusCharacter(characterId)</code> is presentation-only (tile or focused-avatar emphasis)
		and a no-op when the active node has one Character. Conversational speakers come from the
		engine-validated cast turn, not from host focus. Subscribe to
		<code>characterFocusChanged</code> for focus updates.
	</p>
</DocPage>
