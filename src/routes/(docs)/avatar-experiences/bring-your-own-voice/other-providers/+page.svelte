<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Other providers & encoded audio"
	description="OpenAI, Google, Deepgram, and file/URL playback into experience.speech.play."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs streaming', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Same contract for every vendor</h2>
	<p>
		Liforma does not ship provider-specific SDK types. Convert your vendor’s audio to mono PCM chunks
		for <code>createUtterance</code>, or pass a complete buffer / URL to <code>speech.play</code>.
	</p>

	<h2>OpenAI / Google / Deepgram TTS</h2>
	<ol>
		<li>Request PCM (or decode vendor audio to PCM in your host).</li>
		<li>
			One-shot: <code>speech.play(&#123; audio: &#123; data, format &#125; &#125;)</code>
		</li>
		<li>
			Streaming: same turn-id map as
			<a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs</a>.
		</li>
	</ol>
	<CodeBlock code={snippets.jsSpeechPlayPcm} lang="javascript" />

	<h2>MP3 / WAV files</h2>
	<p>
		Pass encoded bytes or a URL. The <strong>player</strong> decodes with Web Audio, then runs the
		same STA lipsync path as PCM. Api servers never download your media URL.
	</p>
	<CodeBlock code={snippets.jsSpeechPlayEncoded} lang="javascript" />
	<ul>
		<li>Accepted PCM rates after decode: 8 / 16 / 22.05 / 24 / 44.1 / 48&nbsp;kHz.</li>
		<li>URL fetch uses CORS from <code>player.liforma.ai</code> — configure your CDN accordingly.</li>
		<li>Encoded payload size is capped (12&nbsp;MB) to protect the embed.</li>
	</ul>

	<h2>Interrupt</h2>
	<CodeBlock
		code={`await experience.speech.interrupt({ scope: 'active' });
// or { scope: 'all' } | { utteranceId } | { characterId }`}
		lang="javascript"
	/>
</DocPage>
