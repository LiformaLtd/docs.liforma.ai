<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Bring your own voice"
	description="Drive Liforma lipsync from ElevenLabs, OpenAI, Deepgram, LiveKit, or any PCM/file audio stack."
	next={[
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'Google', href: '/avatar-experiences/bring-your-own-voice/google' },
		{ title: 'Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Other / files', href: '/avatar-experiences/bring-your-own-voice/other-providers' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>What this is for</h2>
	<p>
		Keep your own TTS or speech-to-speech provider. Stream or play audio into
		<code>experience.speech</code>; Liforma owns playback timing and avatar mouth animation.
	</p>

	<h2>Two speech paths</h2>
	<table>
		<thead>
			<tr>
				<th>API</th>
				<th>Capability</th>
				<th>Audio source</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>speech.speak</code></td>
				<td><code>textSpeech</code></td>
				<td>Liforma TTS</td>
			</tr>
			<tr>
				<td><code>speech.play</code> / <code>createUtterance</code></td>
				<td><code>externalSpeechAudio</code></td>
				<td>Your PCM, encoded bytes, or CORS-open URL</td>
			</tr>
		</tbody>
	</table>
	<p>
		Unsupported operations throw <code>UnsupportedSpeechOperationError</code> immediately. Mint the
		session with <code>externalSpeechAudio</code> (and usually <code>speechAnimation</code>) when the
		host owns the voice.
	</p>

	<h2>One-shot PCM</h2>
	<CodeBlock code={snippets.jsSpeechPlayPcm} lang="javascript" filename="play-pcm.js" />

	<h2>Encoded file or CDN URL</h2>
	<p>
		Decode happens in the <strong>player</strong> (Web Audio). Api/models never fetch or transcode
		arbitrary media URLs. URL playback requires CORS that allows
		<code>player.liforma.ai</code>.
	</p>
	<CodeBlock code={snippets.jsSpeechPlayEncoded} lang="javascript" filename="play-encoded.js" />

	<h2>Live streaming (turn-correlated)</h2>
	<p>
		Use <code>createUtterance</code> when your vendor emits many PCM chunks per agent turn. Map vendor
		turn ids to utterances; ignore late end events for interrupted turns.
	</p>
	<p>
		See the
		<a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs streaming guide</a>
		for the canonical turn-id pattern.
	</p>

	<h2>Lipsync behaviour</h2>
	<ul>
		<li>Audio starts after a short jitter buffer — it never waits on cloud speech-animation.</li>
		<li>Mouth starts with an energy fallback, then crossfades to tracked phone/JALI results.</li>
		<li>
			Tracked animation uses limited-context HTTP windows to
			<code>POST /v1/speech-animation/windows</code> (player-internal).
		</li>
	</ul>

	<h2>Provider guides</h2>
	<ul>
		<li>
			<a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs</a> — live PCM stream
		</li>
		<li>
			<a href="/avatar-experiences/bring-your-own-voice/openai">OpenAI</a> —
			<a href="/avatar-experiences/bring-your-own-voice/google">Google</a> —
			<a href="/avatar-experiences/bring-your-own-voice/deepgram">Deepgram</a>
		</li>
		<li>
			<a href="/avatar-experiences/bring-your-own-voice/livekit">LiveKit</a> — remote
			<code>MediaStreamTrack</code> bridge
		</li>
		<li>
			<a href="/avatar-experiences/bring-your-own-voice/other-providers">Other providers</a> — files,
			URLs, generic PCM
		</li>
		<li>
			<a href="/guides/migrate-elevenlabs">Migrate from ElevenLabs Conversational AI</a> — product
			migration notes
		</li>
	</ul>
</DocPage>
