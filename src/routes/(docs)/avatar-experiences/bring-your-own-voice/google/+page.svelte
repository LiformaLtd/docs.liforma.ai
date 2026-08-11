<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Google → experience.speech"
	description="Pipe Gemini Live (or Cloud TTS) into Liforma with @liforma/client/google."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Idea in one sentence</h2>
	<p>
		Keep Gemini Live as the speech-to-speech brain, and use
		<code>connectGeminiLive</code> from <code>@liforma/client/google</code> to drive the Liforma
		avatar from agent PCM (+ <code>outputTranscription</code> for lipsync).
	</p>
	<p>
		<strong>Copy into your product:</strong> the runnable example’s
		<code>helloByo.ts</code> / <code>helloByo.js</code> (<code>startByoSpeech</code>) is a thin
		wrapper over that helper — DemoApp / page UI is scaffolding only. Keep the same-origin
		WebSocket proxy in your BFF.
	</p>

	<h2>Runnable example</h2>
	<p>
		See <a href="https://examples.liforma.ai/examples/gemini-live-embed">examples.liforma.ai</a>
		(<code>examples/gemini-live-embed</code> in the examples repo). The
		<a href="https://gemini-live-embed.examples.liforma.ai/" target="_blank" rel="noopener noreferrer"
			>hosted page</a
		>
		explains clone/run — Vercel serverless cannot host the long-lived WS proxy.
	</p>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h2>Checklist</h2>
	<ol>
		<li>
			Mount a Liforma Experience with <code>externalSpeechAudio</code> (often
			<code>mode="presenter"</code>, <code>speechInputMode="off"</code> when Gemini owns the mic).
		</li>
		<li>Wait until the player has started (audio unlocked inside the iframe).</li>
		<li>
			Expose a <strong>same-origin WebSocket proxy</strong> that terminates Gemini Live
			BidiGenerateContent (never ship Google API keys to browsers).
		</li>
		<li>
			Call <code>connectGeminiLive(experience, &#123; proxyUrl &#125;)</code> — the helper streams mic
			PCM @ 16&nbsp;kHz, writes model PCM @ 24&nbsp;kHz into <code>createUtterance</code>, and closes
			on <code>generationComplete</code> / <code>turnComplete</code>.
		</li>
		<li>Call <code>bridge.end()</code> when the conversation finishes.</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock
		code={snippets.jsSpeechGeminiLiveSimple}
		lang="typescript"
		filename="gemini-liforma.ts"
	/>

	<details>
		<summary>Advanced: raw Gemini Live proxy messages</summary>
		<p>
			Only if you are not using <code>connectGeminiLive</code>. Accumulate
			<code>outputTranscription</code> independently of <code>turnComplete</code> ordering.
		</p>
		<CodeBlock
			code={snippets.jsSpeechGeminiLiveBridge}
			lang="typescript"
			filename="gemini-live-bridge.ts"
		/>
	</details>

	<details>
		<summary>Cloud TTS (one-shot)</summary>
		<p>
			<code>LINEAR16</code> responses <strong>include a WAV header</strong>. Pass them as encoded
			<code>audio/wav</code> — do not treat the bytes as raw <code>pcm_s16le</code> unless you strip
			the header yourself.
		</p>
		<CodeBlock code={snippets.jsSpeechGoogleTtsPlay} lang="typescript" filename="google-tts.ts" />
		<p>
			For <code>streamingSynthesize</code>, every <code>audio_content</code> response is
			<strong>headerless LINEAR16 at 24&nbsp;kHz</strong>. Open a <code>createUtterance</code> with
			<code>pcm_s16le</code> @ 24&nbsp;kHz, <code>write</code> each chunk, then <code>close</code>.
		</p>
	</details>

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
