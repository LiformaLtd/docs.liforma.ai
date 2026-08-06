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
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'Google', href: '/avatar-experiences/bring-your-own-voice/google' },
		{ title: 'Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Same contract for every vendor</h2>
	<p>
		Liforma does not ship provider-specific SDK types. Convert your vendor’s audio to mono PCM chunks
		for <code>createUtterance</code>, or pass a complete buffer / URL / track to
		<code>speech.play</code>. Dedicated notes:
		<a href="/avatar-experiences/bring-your-own-voice/openai">OpenAI</a>,
		<a href="/avatar-experiences/bring-your-own-voice/google">Google</a>,
		<a href="/avatar-experiences/bring-your-own-voice/deepgram">Deepgram</a>,
		<a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs</a>,
		<a href="/avatar-experiences/bring-your-own-voice/livekit">LiveKit</a>.
	</p>
	<CodeBlock code={snippets.jsSpeechPlayPcm} lang="javascript" />

	<h2>MediaStreamTrack</h2>
	<p>Capture runs in the host page; the player only receives PCM.</p>
	<CodeBlock code={snippets.jsSpeechPlayMediaStream} lang="javascript" />

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
