<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="LiveKit → experience.speech"
	description="Bridge a LiveKit remote audio track into Liforma lipsync with MediaStreamTrack."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'ElevenLabs', href: '/avatar-experiences/bring-your-own-voice/elevenlabs' },
		{ title: 'Deepgram', href: '/avatar-experiences/bring-your-own-voice/deepgram' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>What this is</h2>
	<p>
		Use LiveKit (Agents, rooms, or any remote participant) as your <strong>voice source</strong>. The
		host page joins the LiveKit room; when an agent audio track arrives, pass its
		<code>MediaStreamTrack</code> into <code>experience.speech</code>. Liforma owns playback timing and
		mouth animation.
	</p>
	<p>
		This is <strong>not</strong> Liforma’s future <code>transport: livekit</code> adapter. Here LiveKit
		is your external voice stack; the Experience session still mints normally (http adapter today) with
		<code>externalSpeechAudio</code>.
	</p>

	<h2>Pattern</h2>
	<ol>
		<li>Connect <code>livekit-client</code> in the host (server mints the LiveKit token).</li>
		<li>
			On <code>TrackSubscribed</code> for a remote audio track, call
			<code>speech.play(&#123; audio: &#123; track &#125; &#125;)</code> (or
			<code>createUtterance(&#123; track &#125;)</code>).
		</li>
		<li>On unsubscribe / barge-in, <code>speech.interrupt</code>.</li>
		<li>
			<strong>Do not</strong> also play that track through a LiveKit <code>&lt;audio&gt;</code>
			element — you would hear the voice twice. Let Liforma be the only speaker.
		</li>
	</ol>
	<CodeBlock code={snippets.jsSpeechLiveKitBridge} lang="javascript" filename="livekit-bridge.js" />

	<h2>Turns vs continuous tracks</h2>
	<p>
		LiveKit often gives one long-lived remote audio track rather than discrete PCM turn chunks. Prefer
		<code>speech.play(&#123; audio: &#123; track &#125; &#125;)</code> /
		<code>createUtterance(&#123; track &#125;)</code> and <code>replace-active</code> when a new agent
		track appears. If your agent emits framed PCM over a data channel instead, use the same turn-id
		map as
		<a href="/avatar-experiences/bring-your-own-voice/elevenlabs">ElevenLabs</a>.
	</p>

	<h2>Session capability</h2>
	<p>
		Mint with <code>externalSpeechAudio</code> (and usually <code>speechAnimation</code>). Capture runs
		in the host SDK; the player only receives PCM.
	</p>
</DocPage>
