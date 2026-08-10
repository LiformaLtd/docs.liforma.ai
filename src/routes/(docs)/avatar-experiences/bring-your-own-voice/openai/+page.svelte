<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="OpenAI → experience.speech"
	description="Bridge OpenAI Realtime (WebRTC preferred) or classic TTS into Liforma lipsync."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Paths</h2>
	<table>
		<thead>
			<tr>
				<th>API</th>
				<th>Recommended for</th>
				<th>Liforma entry</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<a href="https://platform.openai.com/docs/guides/realtime-webrtc">Realtime WebRTC</a>
				</td>
				<td>Browser agents (OpenAI’s preferred browser transport)</td>
				<td><code>speech.play(&#123; audio: &#123; track &#125; &#125;)</code></td>
			</tr>
			<tr>
				<td>
					<a href="https://platform.openai.com/docs/guides/realtime-conversations"
						>Realtime WebSocket</a
					>
				</td>
				<td>Server-to-server / advanced proxies</td>
				<td>Forward PCM → browser <code>createUtterance</code></td>
			</tr>
			<tr>
				<td>
					<a href="https://platform.openai.com/docs/guides/text-to-speech">Audio Speech (TTS)</a>
				</td>
				<td>One-shot scripted lines</td>
				<td>Server fetch → browser <code>speech.play</code></td>
			</tr>
		</tbody>
	</table>
	<p>Keep the OpenAI API key on a server. Never mix credentialed Node SDK calls and browser Experience code in one process.</p>

	<p>
		Runnable coffee-barista demo (vanilla + SvelteKit):
		<a href="https://github.com/LiformaLtd/examples.liforma.ai/tree/main/examples/openai-realtime-embed"
			>examples/openai-realtime-embed</a
		>
		— WebSocket + ephemeral client secret → <code>createUtterance</code>, with optional
		<code>transcript</code> when the model text is available (same pattern as the ElevenLabs
		example). Local port <code>4007</code>.
	</p>

	<h2>Realtime WebRTC (primary)</h2>
	<p>
		OpenAI recommends WebRTC for browser audio. The remote audio track maps cleanly onto Liforma’s
		<code>MediaStreamTrack</code> play path — no base64 PCM loop.
	</p>
	<CodeBlock
		code={snippets.jsSpeechOpenAiRealtimeWebRtc}
		lang="typescript"
		filename="openai-realtime-webrtc.ts"
	/>

	<h2>Realtime WebSocket (advanced)</h2>
	<p>
		Use when you already terminate OpenAI on a server. Event names:
		<code>response.output_audio.delta</code>, <code>response.output_audio.done</code> /
		<code>response.done</code>, barge-in via <code>input_audio_buffer.speech_started</code>. Capture
		the utterance object in the write chain (see snippet).
	</p>
	<CodeBlock
		code={snippets.jsSpeechOpenAiRealtimeBridge}
		lang="typescript"
		filename="openai-realtime-proxy.ts"
	/>

	<h2>Classic TTS (one-shot)</h2>
	<p>
		<code>response_format: 'pcm'</code> is raw <code>pcm_s16le</code> at 24&nbsp;kHz (no WAV header).
		Split the OpenAI call (server) from <code>speech.play</code> (browser).
	</p>
	<CodeBlock code={snippets.jsSpeechOpenAiTtsPlay} lang="typescript" filename="openai-tts.ts" />

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
