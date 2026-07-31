<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Custom Conversation Processor"
	description="Replace the managed LLM with browser-owned conversation logic."
	next={[
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
		{ title: 'Events', href: '/avatar-experiences/events' },
		{ title: 'Listen Once Capture', href: '/guides/listen-once-capture' }
	]}
>
	<h2>When to use this pattern</h2>
	<p>
		Use a custom conversation processor when you want Liforma to handle microphone capture, turn
		orchestration, avatar speech, and history — but your app owns the "brain". Examples: rule-based
		receptionists, keyword routing, client-side rubrics, or streaming text you generate in the
		browser without exposing API keys.
	</p>
	<p>
		Registered server processors (opaque <code>processorId</code> with encrypted credentials) are a
		separate upcoming capability. This guide covers the browser function only.
	</p>

	<h2>Session setup</h2>
	<p>
		Pass <code>conversationProcessor</code> on <code>Experience.startSession()</code>. The SDK mints a
		session with <code>responseMode: 'custom'</code> and never serializes your function to the API.
		Typical pairing: <code>mode: 'conversation'</code> and <code>speechInputMode: 'auto'</code>.
	</p>
	<CodeBlock code={snippets.jsConversationProcessor} lang="javascript" />

	<h2>Processor contract</h2>
	<p>Your function receives:</p>
	<ul>
		<li><code>text</code> — finalized user utterance</li>
		<li><code>utteranceId</code> — stable id for this capture</li>
		<li><code>conversation</code> — immutable snapshot of <code>ConversationMessage[]</code></li>
		<li><code>signal</code> — <code>AbortSignal</code> cancelled on interrupt or destroy</li>
	</ul>
	<p>Return one of:</p>
	<ul>
		<li>A string — spoken via <code>speak()</code></li>
		<li>
			<code>{`{ text, characterId?, behavior? }`}</code> — optional character override and enqueue vs
			interrupt
		</li>
		<li>
			<code>AsyncIterable&lt;string&gt;</code> — streamed chunks; the player speaks sentence segments as
			they arrive
		</li>
	</ul>
	<CodeBlock code={snippets.jsConversationProcessorStream} lang="javascript" />

	<h2>Errors and cancellation</h2>
	<p>
		Processor failures emit <code>conversationProcessorError</code>. Liforma does not fall back to the
		managed LLM. Handle retries or speak a fallback line in your handler.
	</p>
	<CodeBlock
		code={`experience.on('conversationProcessorError', ({ utteranceId, message }) => {
  showErrorBanner(message);
});

// speak({ behavior: 'interrupt' }) aborts an in-flight processor via signal.`}
		lang="javascript"
	/>

	<h2>Transcript observation</h2>
	<p>
		Use <code>onUserTranscript</code> or <code>userTranscript</code> events for live captions. Partial
		updates (<code>isFinal: false</code>) are ephemeral UI data; only finals commit to history and
		trigger the processor.
	</p>
	<CodeBlock code={snippets.jsPartialTranscript} lang="javascript" />

	<h2>Related guides</h2>
	<ul>
		<li>
			<a href="/guides/listen-once-capture">Listen Once Capture</a> — host-owned turns with
			<code>listenOnce()</code> instead of automatic processor orchestration
		</li>
		<li>
			<a href="/guides/guided-scripted-practice">Guided Scripted Practice</a> — presenter mode without
			a processor
		</li>
		<li><a href="/avatar-experiences/experience-api">Experience API</a> — full method reference</li>
	</ul>
</DocPage>
