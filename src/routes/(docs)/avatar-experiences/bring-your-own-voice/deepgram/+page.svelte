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
		<a href="https://developers.deepgram.com/docs/voice-agent-message-flow">Voice Agent</a> WebSocket.
		After the handshake, agent audio arrives as <strong>raw binary</strong> frames; control messages
		stay JSON.
	</p>

	<h2>Required handshake</h2>
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
				<td>Binary <code>ArrayBuffer</code> (after SettingsApplied)</td>
				<td>Open utterance → <code>write</code> (capture utterance in the promise chain)</td>
			</tr>
			<tr>
				<td><code>AgentAudioDone</code></td>
				<td>Await pending writes → <code>close</code></td>
			</tr>
			<tr>
				<td><code>UserStartedSpeaking</code></td>
				<td>Barge-in → <code>cancel</code> / <code>interrupt</code></td>
			</tr>
		</tbody>
	</table>

	<h2>Bridge</h2>
	<CodeBlock
		code={snippets.jsSpeechDeepgramAgentBridge}
		lang="typescript"
		filename="deepgram-agent-bridge.ts"
	/>

	<h2>Aura / TTS-only</h2>
	<p>
		If you only use Deepgram TTS (not Voice Agent), fetch or stream the audio bytes and call
		<code>speech.play</code> — see
		<a href="/avatar-experiences/bring-your-own-voice/other-providers">other providers</a>.
	</p>

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
