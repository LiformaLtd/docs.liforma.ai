<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="ElevenLabs Agents → experience.speech"
	description="Pipe ElevenLabs agent audio into Liforma with @elevenlabs/client."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Idea in one sentence</h2>
	<p>
		Use <code>@elevenlabs/client</code> for the conversation, mute its speaker, and forward
		<code>onAudio</code> PCM chunks into <code>experience.speech.createUtterance</code> so the avatar
		talks instead.
	</p>

	<h2>Checklist</h2>
	<ol>
		<li>Mint a Liforma session with <code>externalSpeechAudio</code>.</li>
		<li>
			Start ElevenLabs with <code>connectionType: 'websocket'</code> (so you get
			<code>onAudio</code> base64 PCM).
		</li>
		<li><code>conversation.setVolume(&#123; volume: 0 &#125;)</code> — avoid double audio.</li>
		<li>On each <code>onAudio</code> chunk → <code>utterance.write</code>.</li>
		<li>
			Collect agent text (<code>onMessage</code>) →
			<code>setTranscript</code> /
			<code>close(&#123; transcript &#125;)</code> for force-aligned lipsync.
		</li>
		<li>When mode returns to <code>listening</code> → <code>close</code>; on interrupt → <code>cancel</code>.</li>
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
		Pass agent text when you have it: <code>createUtterance(&#123; transcript &#125;)</code>,
		<code>utterance.setTranscript(text)</code>, and/or
		<code>close(&#123; transcript &#125;)</code> (see <code>onMessage</code> in the snippet)
		so STA can force-align. Complete audio + text can also use
		<code>speech.play(&#123; audio, transcript &#125;)</code>. Omit transcript → free decode
		(same as before).
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
			Only if you are not using <code>@elevenlabs/client</code>. You must handle
			<code>ping</code>/<code>pong</code> and parse event types yourself.
		</p>
		<CodeBlock
			code={snippets.jsSpeechElevenLabsBridge}
			lang="typescript"
			filename="elevenlabs-raw-ws.ts"
		/>
	</details>
</DocPage>
