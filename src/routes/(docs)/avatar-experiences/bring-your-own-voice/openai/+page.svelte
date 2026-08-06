<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="OpenAI → experience.speech"
	description="Stream OpenAI TTS or Realtime audio into Liforma lipsync."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs streaming', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'Other providers', href: '/avatar-experiences/bring-your-own-voice/other-providers' }
	]}
>
	<h2>Pattern</h2>
	<p>
		Liforma has no OpenAI-specific SDK types. Convert OpenAI audio to mono PCM (or pass a finished
		buffer / URL) and use the same <code>createUtterance</code> / <code>speech.play</code> contract as
		every other vendor.
	</p>
	<ol>
		<li>Prefer PCM16 from the OpenAI TTS or Realtime APIs when available.</li>
		<li>
			On each agent turn start, open
			<code>experience.speech.createUtterance(&#123; format, queue: 'replace-active' &#125;)</code>.
		</li>
		<li>Write chunks as they arrive; <code>close</code> when the turn ends; interrupt on barge-in.</li>
	</ol>
	<CodeBlock code={snippets.jsSpeechCreateUtterance} lang="javascript" filename="openai-turn.js" />

	<h2>One-shot TTS file</h2>
	<p>If you already have an MP3/WAV response body, play it directly:</p>
	<CodeBlock code={snippets.jsSpeechPlayEncoded} lang="javascript" />
</DocPage>
