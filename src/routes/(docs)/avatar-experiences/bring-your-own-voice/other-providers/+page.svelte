<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Other providers & encoded audio"
	description="Generic PCM turn map, MediaStreamTrack, and file/URL playback for any voice stack."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Prefer a dedicated guide when you can</h2>
	<ul>
		<li><a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs Agents</a></li>
		<li><a href="/avatar-experiences/bring-your-own-voice/openai">OpenAI Realtime / TTS</a></li>
		<li><a href="/avatar-experiences/bring-your-own-voice/google">Google Cloud TTS / Gemini Live</a></li>
		<li><a href="/avatar-experiences/bring-your-own-voice/deepgram">Deepgram Voice Agent</a></li>
		<li><a href="/avatar-experiences/bring-your-own-voice/livekit">LiveKit remote tracks</a></li>
	</ul>
	<p>
		For any other vendor, convert to mono <code>pcm_s16le</code> (or pass encoded bytes / a CORS-open
		URL) and use the helpers below.
	</p>

	<h2>Generic turn helpers</h2>
	<p>
		Map your vendor’s turn-start / audio-chunk / turn-end / barge-in callbacks onto these functions.
	</p>
	<CodeBlock code={snippets.jsSpeechCreateUtterance} lang="javascript" filename="generic-turn-map.js" />

	<h2>One-shot PCM</h2>
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
