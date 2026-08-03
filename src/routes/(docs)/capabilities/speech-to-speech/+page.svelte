<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Speech-to-Speech"
	description="Voice conversation from an Experience without avatar rendering."
	next={[
		{ title: 'Text-to-Speech', href: '/capabilities/text-to-speech' },
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>What is it?</h2>
	<p>
		<strong>Speech-to-speech</strong> is voice conversation through the same <a
			href="/avatar-experiences/overview">Avatar Experience</a> runtime: listen → think → speak.
		Set <code>speechOnly</code> on <code>&lt;Experience&gt;</code> or
		<code>Experience.startSession()</code> to run the full conversational pipeline (STT, LLM, TTS)
		without avatar or location visuals.
	</p>
	<p>
		You get a voice-first session — microphone permission, audio output, and transcript-style UI in
		the hosted player — not a talking character on screen.
	</p>

	<h2>When to use it</h2>
	<ul>
		<li>Voice assistants and phone-style flows</li>
		<li>Products where audio is the primary interface</li>
		<li>Low-bandwidth embeds that still use the hosted player for mic and audio</li>
		<li>Real dialogue managed by the experience agent, not single scripted <code>speak()</code> lines</li>
	</ul>
	<p>
		For predetermined lines only, use <strong>presenter</strong> mode instead — see
		<a href="/capabilities/text-to-speech">Text-to-Speech</a>.
	</p>

	<h2>Svelte</h2>
	<p>
		<code>speechOnly</code> with <strong>conversation</strong> mode and automatic or manual speech
		input. Subscribe to <code>onMessage</code> or other callbacks as needed.
	</p>
	<CodeBlock
		code={snippets.svelteSpeechOnlyConversation}
		lang="svelte"
		filename="VoiceAssistant.svelte"
	/>

	<h2>JavaScript</h2>
	<CodeBlock code={snippets.jsVoiceOnlyConversation} lang="javascript" />

	<p class="muted">
		Subscribe to <code>message</code>, <code>userTranscript</code>, and other events as documented in
		<a href="/avatar-experiences/events">Events</a>. Pipeline placement (browser vs cloud STT/LLM/TTS)
		is configured on the project and experience at authoring time.
	</p>

	<h2>Authenticated sessions</h2>
	<p>
		When using <code>sessionEndpoint</code>, forward <code>speechOnly: true</code> in your BFF POST
		body to <code>POST /v1/sessions</code> so the minted session matches the client flag. See
		<a href="/avatar-experiences/authenticated">Authenticated experiences</a>.
	</p>

	<h2>When to add a visible character</h2>
	<p>
		Remove <code>speechOnly</code> to use the same experience with on-screen animation. Integration
		surface stays the same — only rendering and asset loading change.
	</p>
</DocPage>
