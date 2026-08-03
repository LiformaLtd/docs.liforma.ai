<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Text-to-Speech"
	description="Audio-only speech from an Experience without avatar rendering."
	next={[
		{ title: 'Speech-to-Speech', href: '/capabilities/speech-to-speech' },
		{ title: 'Text-to-Avatar', href: '/capabilities/text-to-avatar' },
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' }
	]}
>
	<h2>What is it?</h2>
	<p>
		<strong>Text-to-speech</strong> on Liforma is the same <a href="/avatar-experiences/overview"
			>Avatar Experience</a> runtime with audio output only. You use the normal integration surface —
		<code>&lt;Experience&gt;</code> or <code>Experience.startSession()</code> — and set
		<code>speechOnly</code> so the player runs TTS (and optional STT) without loading avatar assets,
		location scenes, or the visual renderer.
	</p>
	<p>
		For scripted lines, use <strong>presenter</strong> mode and call <code>speak()</code> after the
		session has started (typically from <code>onStarted</code>).
	</p>

	<h2>When to use it</h2>
	<ul>
		<li>Voice prompts, IVR-style messages, or accessibility narration</li>
		<li>Apps that already have their own UI and only need spoken output</li>
		<li>Scripted lines via <code>speak()</code> in presenter mode</li>
		<li>When lip-sync, facial animation, and scene backgrounds are not required</li>
	</ul>

	<h2>Svelte</h2>
	<p>
		Add <code>speechOnly</code> to <code>&lt;Experience&gt;</code>. Use presenter mode with
		<code>speechInputMode="off"</code> when the host drives every line with <code>speak()</code>.
	</p>
	<CodeBlock code={snippets.svelteSpeechOnlyTts} lang="svelte" filename="VoicePrompt.svelte" />

	<h2>JavaScript</h2>
	<CodeBlock code={snippets.jsPresenterSpeechOnly} lang="javascript" />

	<p class="muted">
		The hosted player still mounts in your container for audio playback and session UI (start button,
		close control). It simply skips avatar and location image loading.
	</p>

	<h2>Web component</h2>
	<p>
		Set <code>speech-only="true"</code> on <code>&lt;liforma-experience&gt;</code> with the same
		presenter + <code>speak()</code> flow. See <a href="/sdk-reference/web-component"
			>Web component</a>.
	</p>

	<h2>When to use a visible character instead</h2>
	<p>
		Omit <code>speechOnly</code> (or set it to <code>false</code>) and use the same experience with
		<a href="/capabilities/text-to-avatar">presenter mode and <code>speak()</code></a> when speech
		should come from an on-screen animated character.
	</p>
</DocPage>
