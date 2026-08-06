<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="OpenAI → experience.speech"
	description="Bridge OpenAI Realtime PCM deltas or classic TTS into Liforma lipsync."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'Google', href: '/avatar-experiences/bring-your-own-voice/google' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Two OpenAI paths</h2>
	<table>
		<thead>
			<tr>
				<th>API</th>
				<th>When</th>
				<th>Liforma entry</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<a href="https://platform.openai.com/docs/guides/realtime-conversations">Realtime</a>
				</td>
				<td>Live agent / S2S over WebSocket</td>
				<td><code>createUtterance</code> + PCM writes</td>
			</tr>
			<tr>
				<td>
					<a href="https://platform.openai.com/docs/guides/text-to-speech">Audio Speech (TTS)</a>
				</td>
				<td>One-shot scripted lines</td>
				<td><code>speech.play</code> with PCM or MP3</td>
			</tr>
		</tbody>
	</table>
	<p>
		Keep the OpenAI API key on a server or BFF. The browser should only talk to your same-origin
		proxy (or receive already-decoded PCM).
	</p>

	<h2>Realtime event mapping</h2>
	<table>
		<thead>
			<tr>
				<th>OpenAI server event</th>
				<th>Liforma action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<code>response.output_audio.delta</code> (or legacy <code>response.audio.delta</code>)
				</td>
				<td>base64 → PCM → <code>utterance.write</code></td>
			</tr>
			<tr>
				<td>
					<code>response.output_audio.done</code> / <code>response.done</code>
				</td>
				<td><code>utterance.close</code></td>
			</tr>
			<tr>
				<td><code>input_audio_buffer.speech_started</code></td>
				<td>Barge-in → <code>cancel</code> / <code>interrupt</code></td>
			</tr>
		</tbody>
	</table>
	<p>
		Configure the Realtime session for PCM16 output (typically <strong>24&nbsp;kHz</strong> mono). Do
		not also play those deltas through a local Web Audio sink if Liforma is speaking.
	</p>
	<CodeBlock
		code={snippets.jsSpeechOpenAiRealtimeBridge}
		lang="javascript"
		filename="openai-realtime-bridge.js"
	/>

	<h2>Classic TTS (one-shot)</h2>
	<p>
		<code>response_format: 'pcm'</code> is raw <code>pcm_s16le</code> at 24&nbsp;kHz (no WAV header).
		MP3/WAV can use encoded <code>speech.play</code> instead.
	</p>
	<CodeBlock code={snippets.jsSpeechOpenAiTtsPlay} lang="javascript" filename="openai-tts-play.js" />

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
