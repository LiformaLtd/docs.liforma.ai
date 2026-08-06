<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Google → experience.speech"
	description="Bridge Google Cloud TTS or Gemini Live audio into Liforma lipsync."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Two Google paths</h2>
	<table>
		<thead>
			<tr>
				<th>API</th>
				<th>When</th>
				<th>Liforma entry</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<a href="https://cloud.google.com/text-to-speech/docs/create-audio-text-streaming"
						>Cloud Text-to-Speech</a
					>
				</td>
				<td>Scripted lines / streaming synthesize</td>
				<td><code>speech.play</code> (WAV/MP3) or PCM writes</td>
			</tr>
			<tr>
				<td>
					<a href="https://ai.google.dev/gemini-api/docs/live-api">Gemini Live</a>
				</td>
				<td>Realtime voice agent (BidiGenerateContent)</td>
				<td><code>createUtterance</code> + PCM writes</td>
			</tr>
		</tbody>
	</table>
	<p>Call Google from a trusted server; pass audio (or a proxy stream) into the browser Experience.</p>

	<h2>Cloud TTS (one-shot)</h2>
	<p>
		<code>LINEAR16</code> responses <strong>include a WAV header</strong>. Pass them as encoded
		<code>audio/wav</code> — do not treat the bytes as raw <code>pcm_s16le</code> unless you strip the
		header yourself.
	</p>
	<CodeBlock code={snippets.jsSpeechGoogleTtsPlay} lang="javascript" filename="google-tts-play.js" />
	<p>
		For <code>streamingSynthesize</code>, each <code>audio_content</code> chunk after the first is
		typically headerless PCM at the configured rate — open a
		<code>createUtterance</code> and <code>write</code> those chunks, then <code>close</code> when the
		stream ends.
	</p>

	<h2>Gemini Live event mapping</h2>
	<table>
		<thead>
			<tr>
				<th>Live API field</th>
				<th>Liforma action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>serverContent.modelTurn.parts[].inlineData.data</code></td>
				<td>base64 PCM16 @ 24&nbsp;kHz → <code>utterance.write</code></td>
			</tr>
			<tr>
				<td><code>serverContent.turnComplete</code></td>
				<td><code>utterance.close</code></td>
			</tr>
			<tr>
				<td><code>serverContent.interrupted</code></td>
				<td><code>cancel</code> / <code>interrupt</code></td>
			</tr>
		</tbody>
	</table>
	<p>
		Input to Gemini is usually PCM @ 16&nbsp;kHz; <strong>output</strong> to Liforma is PCM @
		<strong>24&nbsp;kHz</strong>. Connect with an ephemeral token in production.
	</p>
	<CodeBlock
		code={snippets.jsSpeechGeminiLiveBridge}
		lang="javascript"
		filename="gemini-live-bridge.js"
	/>

	<h2>Session capability</h2>
	<p>Mint with <code>externalSpeechAudio</code>.</p>
</DocPage>
