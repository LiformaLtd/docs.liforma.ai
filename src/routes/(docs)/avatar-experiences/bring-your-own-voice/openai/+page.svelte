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
		<code>connectOpenAiRealtime</code> (WebSocket) or
		<code>connectOpenAiRealtimeWebRtc</code> (preferred browser media path) from
		<code>@liforma/client/openai</code> to drive the Liforma avatar (+ transcript for lipsync).
	</p>
	<p>
		<strong>Copy into your product:</strong> the runnable example’s
		<code>helloByo.ts</code> / <code>helloByo.js</code> (<code>startByoSpeech</code>) is a thin
		wrapper over <code>connectOpenAiRealtime</code> — DemoApp / page UI is scaffolding only.
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
			opens the Realtime WebSocket, streams mic PCM (default
			<code>captureMic: true</code>; pass <code>mediaStream</code> to reuse a stream), chunks agent
			audio into <code>createUtterance</code>, and forwards transcript for force-align lipsync.
			Unexpected disconnect cancels any active utterance.
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
		on examples.liforma.ai (local port <code>4007</code>) ·
		<a
			href="https://openai-realtime-embed.examples.liforma.ai/"
			target="_blank"
			rel="noopener noreferrer">live demo</a
		>.
	</p>

	<details>
		<summary>Realtime WebRTC (preferred browser media)</summary>
		<p>
			<code>connectOpenAiRealtimeWebRtc</code> uses OpenAI’s WebRTC peer connection: remote audio
			track → <code>createUtterance(&#123; track &#125;)</code>, transcript on the
			<code>oai-events</code> data channel for force-align. Same ephemeral client-secret mint as
			the WebSocket helper. Do <strong>not</strong> also attach the remote track to an
			<code>&lt;audio&gt;</code> element.
		</p>
		<CodeBlock
			code={snippets.jsSpeechOpenAiRealtimeWebRtc}
			lang="typescript"
			filename="openai-realtime-webrtc.ts"
		/>
	</details>

	<details>
		<summary>When to use the WebSocket helper</summary>
		<p>
			<code>connectOpenAiRealtime</code> maps each agent turn onto discrete
			<code>createUtterance</code> / <code>write</code> / <code>close</code> (same pattern as
			ElevenLabs). Prefer WebRTC for browser media latency; keep WebSocket when you already
			terminate Realtime over WS or need per-chunk PCM control.
		</p>
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
