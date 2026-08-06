<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="ElevenLabs → speech.createUtterance"
	description="Stream ElevenLabs (or similar) PCM into Liforma with turn-correlated utterances."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'Other providers', href: '/avatar-experiences/bring-your-own-voice/other-providers' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Pattern</h2>
	<p>
		On each agent turn start, open a <code>createUtterance</code> with
		<code>queue: 'replace-active'</code>. Write PCM chunks as they arrive (await
		<code>write</code> for backpressure). On turn end, <code>close</code> after draining writes. On
		barge-in, <code>cancel</code> that turn id or <code>speech.interrupt</code>.
	</p>

	<h2>Turn-correlated stream</h2>
	<p>
		Replace <code>vendor.*</code> with your ElevenLabs Conversational AI / WebSocket callbacks. Chunks
		must be mono <code>pcm_s16le</code> at an accepted rate (e.g. 24&nbsp;kHz).
	</p>
	<CodeBlock code={snippets.jsSpeechCreateUtterance} lang="javascript" filename="elevenlabs-bridge.js" />

	<h2>Rules that avoid broken turns</h2>
	<ul>
		<li>
			Late <code>onAgentTurnEnd</code> for an interrupted turn id must no-op — never
			<code>close</code> a newer utterance.
		</li>
		<li>
			<code>createUtterance</code> queue is only <code>replace-active</code> or
			<code>replace-all</code> (no <code>append</code> on live streams).
		</li>
		<li>
			<code>write</code> waits for player buffer capacity; it rejects on cancel, interrupt, timeout,
			or closed utterance.
		</li>
	</ul>

	<h2>Session capability</h2>
	<p>
		The minted manifest must include <code>externalSpeechAudio</code>. Without it,
		<code>createUtterance</code> throws <code>UnsupportedSpeechOperationError</code>.
	</p>
</DocPage>
