<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Deepgram → experience.speech"
	description="Bridge Deepgram Voice Agent binary audio into Liforma lipsync."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Google', href: '/avatar-experiences/bring-your-own-voice/google' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>What to use</h2>
	<p>
		Deepgram
		<a href="https://developers.deepgram.com/docs/voice-agent-message-flow">Voice Agent</a> WebSocket
		(<code>wss://agent.deepgram.com/v1/agent/converse</code>). After you send
		<code>Settings</code> and receive <code>SettingsApplied</code>, the agent’s spoken audio arrives as
		<strong>raw binary</strong> WebSocket frames (not base64 JSON). Control messages stay JSON.
	</p>
	<p>
		Set <code>audio.output.encoding</code> to <code>linear16</code> and pick a sample rate Liforma
		accepts (commonly <strong>24&nbsp;kHz</strong>). Keep the Deepgram API key on the server if you
		proxy the socket.
	</p>

	<h2>Event mapping</h2>
	<table>
		<thead>
			<tr>
				<th>Deepgram message</th>
				<th>Liforma action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Binary <code>ArrayBuffer</code> (agent PCM)</td>
				<td>Open utterance on first frame → <code>write</code></td>
			</tr>
			<tr>
				<td><code>AgentAudioDone</code></td>
				<td><code>utterance.close</code> after draining writes</td>
			</tr>
			<tr>
				<td><code>UserStartedSpeaking</code></td>
				<td>Barge-in → <code>cancel</code> / <code>interrupt</code> immediately</td>
			</tr>
			<tr>
				<td><code>ConversationText</code> (role agent)</td>
				<td>Optional transcript for <code>close(&#123; transcript &#125;)</code></td>
			</tr>
		</tbody>
	</table>
	<p>
		Do not prepend WAV headers for Liforma PCM writes — Deepgram agent output is headerless
		<code>linear16</code> when configured that way.
	</p>

	<h2>Bridge</h2>
	<CodeBlock
		code={snippets.jsSpeechDeepgramAgentBridge}
		lang="javascript"
		filename="deepgram-agent-bridge.js"
	/>

	<h2>Aura / TTS-only</h2>
	<p>
		If you only use Deepgram TTS (not Voice Agent), fetch or stream the audio bytes and call
		<code>speech.play</code> with PCM or encoded media the same way as
		<a href="/avatar-experiences/bring-your-own-voice/other-providers">other providers</a>.
	</p>

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
