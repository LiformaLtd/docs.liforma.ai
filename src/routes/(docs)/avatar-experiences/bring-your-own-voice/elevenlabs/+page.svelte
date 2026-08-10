<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="ElevenLabs Agents → experience.speech"
	description="Pipe ElevenLabs agent audio into Liforma with @liforma/client/elevenlabs."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Idea in one sentence</h2>
	<p>
		Keep ElevenLabs Agents as the speech-to-speech brain, and use
		<code>connectElevenLabsAgent</code> from <code>@liforma/client/elevenlabs</code> to drive the
		Liforma avatar from agent PCM.
	</p>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client @elevenlabs/client" lang="bash" />

	<h2>Checklist</h2>
	<ol>
		<li>
			Mount a Liforma Experience with <code>externalSpeechAudio</code> (often
			<code>mode="presenter"</code>, <code>speechInputMode="off"</code> when ElevenLabs owns the mic).
		</li>
		<li>Wait until the player has started (audio unlocked inside the iframe).</li>
		<li>
			Call <code>connectElevenLabsAgent(experience, &#123; signedUrl &#125;)</code> — the helper mutes
			ElevenLabs' speaker, locks sample rate from <code>agent_output_audio_format</code> (never
			guesses — missing format surfaces via <code>onError</code>), chunks PCM, and forwards
			transcript for lipsync.
		</li>
		<li>Mint the signed URL on your server (never ship ElevenLabs API keys to production browsers).</li>
		<li>Call <code>bridge.end()</code> when the conversation finishes.</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock
		code={snippets.jsSpeechElevenLabsSimple}
		lang="typescript"
		filename="elevenlabs-liforma.ts"
	/>
	<p>
		Production tip: pass a <strong>signed URL</strong> from your server instead of a bare
		<code>agentId</code> + API key in the browser.
	</p>
	<p>
		Runnable example:
		<a href="https://examples.liforma.ai/examples/elevenlabs-embed">ElevenLabs embed</a>
		on examples.liforma.ai.
	</p>

	<details>
		<summary>Using ElevenLabs WebRTC instead?</summary>
		<p>
			With WebRTC, ElevenLabs plays audio via LiveKit tracks and does not emit the same
			<code>onAudio</code> PCM stream. Bridge the remote track with the
			<a href="/avatar-experiences/bring-your-own-voice/livekit">LiveKit guide</a>.
		</p>
	</details>

	<details>
		<summary>Advanced: raw ConvAI WebSocket</summary>
		<p>
			Only if you are not using <code>@elevenlabs/client</code> /
			<code>connectElevenLabsAgent</code>. You must handle <code>ping</code>/<code>pong</code> and
			parse event types yourself.
		</p>
		<CodeBlock
			code={snippets.jsSpeechElevenLabsBridge}
			lang="typescript"
			filename="elevenlabs-raw-ws.ts"
		/>
	</details>

	<h2>Not the migration package</h2>
	<p>
		<code>@liforma/client/elevenlabs</code> is <strong>bring-your-own-voice</strong>: keep ElevenLabs
		Agents and animate a Liforma avatar. To
		<strong>replace</strong> ElevenLabs Agents with a Liforma Experience, see
		<a href="/guides/migrate-elevenlabs">Migrate from ElevenLabs</a>
		(<code>@liforma/elevenlabs-compatible</code>).
	</p>
</DocPage>
