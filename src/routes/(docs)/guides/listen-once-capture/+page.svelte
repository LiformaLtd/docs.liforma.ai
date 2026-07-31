<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Listen Once Capture"
	description="Automatic end-of-speech capture for host-owned turn loops."
	next={[
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
		{ title: 'Guided Scripted Practice', href: '/guides/guided-scripted-practice' },
		{ title: 'Events', href: '/avatar-experiences/events' }
	]}
>
	<h2>When to use this pattern</h2>
	<p>
		Use <code>listenOnce()</code> when your app owns the turn loop but you want automatic end-of-speech
		detection instead of Start/Stop buttons. Good fits: short quiz answers, voice form fields, booking
		intake, or presenter sessions where the avatar asks a question and waits for one reply.
	</p>
	<p>
		For deliberate pauses mid-utterance (reading practice, long rehearsal), use manual
		<code>startListening()</code> / <code>stopListening()</code> instead — see
		<a href="/guides/guided-scripted-practice">Guided Scripted Practice</a>.
	</p>

	<h2>Requirements</h2>
	<ul>
		<li><code>speechInputMode: 'auto'</code> on <code>Experience.startSession()</code></li>
		<li><code>attach()</code> completed and <code>started</code> event fired</li>
		<li>Only one active <code>listenOnce()</code> at a time</li>
	</ul>

	<h2>Basic flow</h2>
	<CodeBlock code={snippets.jsListenOnce} lang="javascript" />

	<h2>Quiz coach loop</h2>
	<p>
		Combine <code>speak()</code> and <code>listenOnce()</code> for a simple question-and-answer loop.
		Grade on the host; feedback stays in your UI unless you call <code>speak()</code> again.
	</p>
	<CodeBlock code={snippets.quizCoachTurnLoop} lang="javascript" />

	<h2>Options and failures</h2>
	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Behavior</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>timeoutMs</code></td>
				<td>Reject if no finalized utterance within the window (default 30 seconds)</td>
			</tr>
			<tr>
				<td><code>signal</code></td>
				<td>Abort the wait; rejects with <code>AbortError</code></td>
			</tr>
		</tbody>
	</table>
	<p>
		Timeout, abort, and permission failures reject without adding a final user message to conversation
		history.
	</p>

	<h2>Events vs <code>listenOnce()</code></h2>
	<p>
		<code>userSpeechStarted</code> and <code>userSpeechEnded</code> are ambient VAD telemetry — useful
		for mic indicators. <code>listenOnce()</code> is a scoped promise that resolves with finalized
		text when your code is explicitly waiting for one answer. You can use both: events for UI,
		<code>listenOnce()</code> for turn logic.
	</p>
	<p>
		For live captions while the user speaks, subscribe to <code>userTranscript</code> with partial
		revisions — see <a href="/avatar-experiences/events">Events</a>.
	</p>

	<h2>Custom processor alternative</h2>
	<p>
		If Liforma should orchestrate listen → respond → speak automatically after every user utterance,
		use <code>conversationProcessor</code> instead of hand-writing
		<code>listenOnce()</code> loops. See
		<a href="/guides/custom-conversation-processor">Custom Conversation Processor</a>.
	</p>
</DocPage>
