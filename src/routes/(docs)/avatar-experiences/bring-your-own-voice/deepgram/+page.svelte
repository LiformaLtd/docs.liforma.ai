<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Deepgram → experience.speech"
	description="Pipe Deepgram Voice Agent audio into Liforma with @liforma/client/deepgram."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Google', href: '/avatar-experiences/bring-your-own-voice/google' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Idea in one sentence</h2>
	<p>
		Keep Deepgram Voice Agent as the speech-to-speech brain, and use
		<code>connectDeepgramAgent</code> from <code>@liforma/client/deepgram</code> to drive the
		Liforma avatar from agent PCM (+ transcript when available).
	</p>
	<p>
		<strong>Copy into your product:</strong> the runnable example’s
		<code>helloByo.ts</code> / <code>helloByo.js</code> (<code>startByoSpeech</code>) is a thin
		wrapper over that helper — DemoApp / page UI is scaffolding only. Keep the same-origin
		WebSocket proxy in your BFF.
	</p>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h2>Checklist</h2>
	<ol>
		<li>
			Mount a Liforma Experience with <code>externalSpeechAudio</code> (often
			<code>mode="presenter"</code>, <code>speechInputMode="off"</code> when Deepgram owns the mic).
		</li>
		<li>Wait until the player has started (audio unlocked inside the iframe).</li>
		<li>
			Expose a <strong>same-origin WebSocket proxy</strong> to
			<code>wss://agent.deepgram.com/v1/agent/converse</code> (browsers cannot set
			<code>Authorization</code> on WebSocket).
		</li>
		<li>
			Call <code>connectDeepgramAgent(experience, &#123; proxyUrl &#125;)</code> — the helper runs
			Welcome → Settings → SettingsApplied, streams mic PCM, and forwards binary agent audio into
			<code>createUtterance</code>.
		</li>
		<li>Call <code>bridge.end()</code> when the conversation finishes.</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock
		code={snippets.jsSpeechDeepgramSimple}
		lang="typescript"
		filename="deepgram-liforma.ts"
	/>
	<p>
		Runnable coffee-barista demo with a same-origin WebSocket proxy:
		<a href="https://examples.liforma.ai/examples/deepgram-embed">Deepgram embed</a>
		on examples.liforma.ai (local port <code>4008</code>). The
		<a href="https://deepgram-embed.examples.liforma.ai/" target="_blank" rel="noopener noreferrer"
			>hosted page</a
		>
		explains clone/run — Vercel serverless cannot host the long-lived WS proxy.
	</p>

	<details>
		<summary>Required handshake (handled by the helper)</summary>
		<ol>
			<li>Connect WebSocket</li>
			<li>Wait for <code>Welcome</code> — do <strong>not</strong> send anything before this</li>
			<li>
				Send <code>Settings</code> with <code>audio.output.container: 'none'</code> for headerless
				<code>linear16</code>
			</li>
			<li>Wait for <code>SettingsApplied</code></li>
			<li>Then stream mic audio / accept agent binary PCM</li>
		</ol>
	</details>

	<details>
		<summary>Advanced: raw Voice Agent WebSocket</summary>
		<p>
			Only if you are not using <code>connectDeepgramAgent</code>. You must handle the handshake and
			binary frames yourself.
		</p>
		<CodeBlock
			code={snippets.jsSpeechDeepgramAgentBridge}
			lang="typescript"
			filename="deepgram-agent-bridge.ts"
		/>
	</details>

	<details>
		<summary>Aura / TTS-only</summary>
		<p>
			If you only use Deepgram TTS (not Voice Agent), fetch or stream the audio bytes and call
			<code>speech.play</code> — see
			<a href="/avatar-experiences/bring-your-own-voice/other-providers">other providers</a>.
		</p>
	</details>

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
