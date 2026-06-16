<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Text-to-Speech"
	description="Convert text to natural speech audio."
	next={[
		{ title: 'Text-to-Avatar', href: '/capabilities/text-to-avatar' },
		{ title: 'Speech-to-Speech', href: '/capabilities/speech-to-speech' }
	]}
>
	<Callout variant="beta" title="Coming soon">
		<p>
			Standalone Text-to-Speech API is on the roadmap. Avatar Experiences include TTS as part of the
			runtime today.
		</p>
	</Callout>

	<h2>What is it?</h2>
	<p>Send text. Get speech audio. No avatar rendering required.</p>

	<h2>When to use</h2>
	<ul>
		<li>Voice-only assistants or IVR-style flows</li>
		<li>Audio narration without visual character</li>
		<li>Accessibility features (read aloud)</li>
		<li>When animation adds no value</li>
	</ul>

	<h2>Planned API shape</h2>
	<CodeBlock
		code={`import { Liforma } from '@liforma/client';

const audio = await Liforma.textToSpeech({
  text: 'Your order has been confirmed.',
  voiceId: 'en-GB-SoniaNeural'
});

// audio.buffer — PCM or encoded audio
// audio.stream — optional streaming`}
		lang="javascript"
	/>

	<h2>Inside Avatar Experiences</h2>
	<p>
		Full <a href="/avatar-experiences/overview">Avatar Experiences</a> use TTS internally as part of
		the turn loop. You don't call TTS directly — the runtime handles it.
	</p>
</DocPage>
