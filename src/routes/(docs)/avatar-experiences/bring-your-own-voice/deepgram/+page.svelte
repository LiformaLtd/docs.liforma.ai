<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Deepgram → experience.speech"
	description="Pipe Deepgram Aura / agent audio into Liforma Experiences."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'LiveKit', href: '/avatar-experiences/bring-your-own-voice/livekit' },
		{ title: 'Other providers', href: '/avatar-experiences/bring-your-own-voice/other-providers' }
	]}
>
	<h2>Pattern</h2>
	<p>
		Treat Deepgram agent turns like any other S2S vendor: one Liforma utterance per turn, PCM writes,
		close on turn end, <code>speech.interrupt</code> on barge-in.
	</p>
	<CodeBlock code={snippets.jsSpeechCreateUtterance} lang="javascript" filename="deepgram-turn.js" />

	<h2>MediaStreamTrack</h2>
	<p>
		If your host already has a live audio <code>MediaStreamTrack</code>, pass it to
		<code>speech.play</code> or <code>createUtterance</code>. Capture happens in the host SDK.
	</p>
	<CodeBlock code={snippets.jsSpeechPlayMediaStream} lang="javascript" />
</DocPage>
