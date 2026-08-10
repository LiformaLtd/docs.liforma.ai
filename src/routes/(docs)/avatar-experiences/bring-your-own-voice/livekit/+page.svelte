<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="LiveKit → experience.speech"
	description="Pipe a LiveKit remote audio track into Liforma with @liforma/client/livekit."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Idea in one sentence</h2>
	<p>
		Keep LiveKit (Agents, rooms, or any remote participant) as your voice source, and use
		<code>connectLiveKitAgent</code> from <code>@liforma/client/livekit</code> to drive the Liforma
		avatar from the remote <code>MediaStreamTrack</code>.
	</p>
	<p>
		This is <strong>not</strong> Liforma’s future <code>transport: livekit</code> adapter. Here LiveKit
		is your external voice stack; the Experience session still mints normally (http adapter today) with
		<code>externalSpeechAudio</code>.
	</p>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client livekit-client" lang="bash" />

	<h2>Checklist</h2>
	<ol>
		<li>
			Mount a Liforma Experience with <code>externalSpeechAudio</code> (often
			<code>mode="presenter"</code>, <code>speechInputMode="off"</code>).
		</li>
		<li>Wait until the player has started (audio unlocked inside the iframe).</li>
		<li>Mint a LiveKit participant token on your server.</li>
		<li>
			Call <code>connectLiveKitAgent(experience, &#123; url, token &#125;)</code> — the helper joins
			the room, bridges agent audio tracks into <code>speech.play</code>, and interrupts only
			while a bridge play is outstanding (idle disconnect will not cancel later host speech).
		</li>
		<li>
			<strong>Do not</strong> also play that track through a LiveKit <code>&lt;audio&gt;</code>
			element — you would hear the voice twice.
		</li>
		<li>Call <code>bridge.end()</code> when the conversation finishes.</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock
		code={snippets.jsSpeechLiveKitSimple}
		lang="typescript"
		filename="livekit-liforma.ts"
	/>

	<details>
		<summary>Advanced: own the LiveKit Room yourself</summary>
		<p>Only if you are not using <code>connectLiveKitAgent</code>.</p>
		<CodeBlock
			code={snippets.jsSpeechLiveKitBridge}
			lang="typescript"
			filename="livekit-bridge.ts"
		/>
	</details>

	<details>
		<summary>Turns vs continuous tracks</summary>
		<p>
			LiveKit often gives one long-lived remote audio track rather than discrete PCM turn chunks. The
			helper uses <code>speech.play(&#123; audio: &#123; track &#125; &#125;)</code> with
			<code>replace-active</code>. If your agent emits framed PCM over a data channel instead, use the
			same turn-id map as
			<a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs</a>.
		</p>
	</details>

	<h2>Session capability</h2>
	<p>
		Mint with <code>externalSpeechAudio</code> (and usually <code>speechAnimation</code>). Capture runs
		in the host SDK; the player only receives PCM.
	</p>
</DocPage>
