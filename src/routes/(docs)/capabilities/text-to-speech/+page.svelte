<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Text-to-Speech"
	description="Natural speech synthesis from text."
	next={[
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' },
		{ title: 'Text-to-Avatar', href: '/capabilities/text-to-avatar' }
	]}
>
	<h2>What is it?</h2>
	<p>
		Convert text to natural speech with Liforma's voice pipeline. No avatar rendering, no
		conversation loop — audio only.
	</p>

	<h2>When to use it</h2>
	<ul>
		<li>Voice prompts, IVR, or accessibility narration</li>
		<li>Apps that already have visuals and only need speech</li>
		<li>Batch or server-side audio generation</li>
		<li>When lip-sync and character animation are not required</li>
	</ul>

	<h2>API</h2>
	<CodeBlock
		code={`import { Liforma } from '@liforma/client';

const audio = await Liforma.textToSpeech({
  text: 'Your table is ready.',
  voiceId: 'en-GB-SoniaNeural'
});

// audio.buffer — playable audio`}
		lang="javascript"
	/>

	<p class="muted">Audio only — no lip-sync or animation timing data.</p>

	<h2>When to use Avatar Experiences instead</h2>
	<p>
		Use an <a href="/avatar-experiences/overview">Avatar Experience</a> when speech should come
		from a visible character in a live, interactive session. TTS is included in every experience —
		this standalone API is for audio-only integrations.
	</p>
</DocPage>
