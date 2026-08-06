<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="ElevenLabs Agents → experience.speech"
	description="Bridge ElevenLabs ConvAI WebSocket audio events into Liforma lipsync."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>What to use</h2>
	<p>
		ElevenLabs <strong>Agents</strong> (Conversational AI) over the
		<a href="https://elevenlabs.io/docs/eleven-agents/libraries/web-sockets">ConvAI WebSocket</a>. Mint a
		<strong>signed URL</strong> on your server; never put an ElevenLabs API key in the browser if you
		can avoid it.
	</p>
	<p>
		Do <strong>not</strong> use <code>@elevenlabs/client</code>’s default audio playback for the agent
		voice when bridging to Liforma — that would play twice. Consume the WebSocket
		<code>audio</code> events yourself and feed PCM into <code>experience.speech</code>.
	</p>

	<h2>Event mapping</h2>
	<table>
		<thead>
			<tr>
				<th>ElevenLabs event</th>
				<th>Liforma action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>conversation_initiation_metadata</code></td>
				<td>
					Read <code>agent_output_audio_format</code> (e.g. <code>pcm_16000</code>) → sample rate
				</td>
			</tr>
			<tr>
				<td><code>ping</code></td>
				<td>Reply with <code>pong</code> + <code>event_id</code></td>
			</tr>
			<tr>
				<td><code>audio</code> → <code>audio_event.audio_base_64</code></td>
				<td>Decode base64 → <code>utterance.write</code> (open utterance on first chunk)</td>
			</tr>
			<tr>
				<td><code>interruption</code></td>
				<td><code>utterance.cancel</code> / <code>speech.interrupt</code></td>
			</tr>
			<tr>
				<td><code>agent_response_complete</code> (optional)</td>
				<td><code>utterance.close</code> after draining writes</td>
			</tr>
		</tbody>
	</table>
	<p>
		Over ElevenLabs <strong>WebRTC</strong>, the <code>audio</code> JSON event is not sent — audio goes
		through LiveKit. In that mode use the
		<a href="/avatar-experiences/bring-your-own-voice/livekit">LiveKit bridge</a> instead.
	</p>

	<h2>Bridge</h2>
	<CodeBlock code={snippets.jsSpeechElevenLabsBridge} lang="javascript" filename="elevenlabs-convai-bridge.js" />

	<h2>Session capability</h2>
	<p>
		Mint with <code>externalSpeechAudio</code>. Align ConvAI output format with an accepted Liforma rate
		(8 / 16 / 22.05 / 24 / 44.1 / 48&nbsp;kHz).
	</p>
</DocPage>
