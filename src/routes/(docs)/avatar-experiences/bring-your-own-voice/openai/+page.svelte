<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="OpenAI → experience.speech"
	description="Pipe OpenAI Realtime (or classic TTS) into Liforma with @liforma/client/openai."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Idea in one sentence</h2>
	<p>
		Keep OpenAI Realtime as the speech-to-speech brain, and use
		<code>connectOpenAiRealtime</code> from <code>@liforma/client/openai</code> to drive the
		Liforma avatar from agent PCM (+ transcript for lipsync).
	</p>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h2>Checklist</h2>
	<ol>
		<li>
			Mount a Liforma Experience with <code>externalSpeechAudio</code> (often
			<code>mode="presenter"</code>, <code>speechInputMode="off"</code> when OpenAI owns the mic).
		</li>
		<li>Wait until the player has started (audio unlocked inside the iframe).</li>
		<li>
			Mint an <strong>ephemeral Realtime client secret</strong> on your server (never ship
			<code>OPENAI_API_KEY</code> to production browsers).
		</li>
		<li>
			Call <code>connectOpenAiRealtime(experience, &#123; ephemeralKey &#125;)</code> — the helper
			opens the Realtime WebSocket, streams mic PCM, chunks agent audio into
			<code>createUtterance</code>, and forwards transcript for force-align lipsync.
		</li>
		<li>Call <code>bridge.end()</code> when the conversation finishes.</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock
		code={snippets.jsSpeechOpenAiRealtimeSimple}
		lang="typescript"
		filename="openai-liforma.ts"
	/>
	<p>
		Runnable coffee-barista demo:
		<a href="https://examples.liforma.ai/examples/openai-realtime-embed">OpenAI Realtime embed</a>
		on examples.liforma.ai (local port <code>4007</code>).
	</p>

	<details>
		<summary>Why WebSocket in the helper (vs WebRTC)?</summary>
		<p>
			OpenAI recommends WebRTC for browser media. The SDK helper uses
			<strong>WebSocket + ephemeral client secret</strong> so each agent turn maps cleanly onto
			<code>createUtterance</code> / <code>write</code> / <code>setTranscript</code> /
			<code>close</code> (same pattern as ElevenLabs). Use the WebRTC path below when you already
			have a peer connection and only need a remote track.
		</p>
	</details>

	<details>
		<summary>Realtime WebRTC (remote track)</summary>
		<p>
			Maps the remote audio <code>MediaStreamTrack</code> onto Liforma’s track play path — no
			base64 PCM loop.
		</p>
		<CodeBlock
			code={snippets.jsSpeechOpenAiRealtimeWebRtc}
			lang="typescript"
			filename="openai-realtime-webrtc.ts"
		/>
	</details>

	<details>
		<summary>Advanced: server-terminated WebSocket proxy</summary>
		<p>
			Only if you terminate OpenAI on a server and forward PCM to the browser. Prefer
			<code>connectOpenAiRealtime</code> for the browser WebSocket path.
		</p>
		<CodeBlock
			code={snippets.jsSpeechOpenAiRealtimeBridge}
			lang="typescript"
			filename="openai-realtime-proxy.ts"
		/>
	</details>

	<details>
		<summary>Classic TTS (one-shot)</summary>
		<p>
			<code>response_format: 'pcm'</code> is raw <code>pcm_s16le</code> at 24&nbsp;kHz (no WAV
			header). Split the OpenAI call (server) from <code>speech.play</code> (browser).
		</p>
		<CodeBlock code={snippets.jsSpeechOpenAiTtsPlay} lang="typescript" filename="openai-tts.ts" />
	</details>

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
