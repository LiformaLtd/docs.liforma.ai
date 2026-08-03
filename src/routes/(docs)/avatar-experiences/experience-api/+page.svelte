<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience API"
	description="Programmatic control over Avatar Experience sessions."
	next={[
		{ title: 'Events', href: '/avatar-experiences/events' },
		{ title: 'Custom Conversation Processor', href: '/guides/custom-conversation-processor' },
		{ title: 'Listen Once Capture', href: '/guides/listen-once-capture' },
		{ title: 'JavaScript SDK', href: '/sdk-reference/javascript' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>Experience</code> is the primary JavaScript API. Use it when you need programmatic control
		beyond the component — custom containers, event handling, presenter sequencing, or browser-owned
		conversation logic.
	</p>

	<h2>Start a session</h2>
	<CodeBlock code={snippets.jsStartSession} lang="javascript" filename="main.js" />

	<h2>Session inputs</h2>
	<table>
		<thead>
			<tr>
				<th>Input</th>
				<th>Use case</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>{`{ experienceId }`}</code></td>
				<td>Public embed — SDK calls <code>/v1/public-sessions</code></td>
			</tr>
			<tr>
				<td><code>{`{ manifest }`}</code></td>
				<td>Server-minted manifest passed to the client</td>
			</tr>
			<tr>
				<td><code>{`{ experienceId, sessionEndpoint }`}</code></td>
				<td>Authenticated — SDK POSTs to your same-origin route</td>
			</tr>
		</tbody>
	</table>

	<h2>Public configuration</h2>
	<p>
		Pass these options to <code>Experience.startSession()</code>. They are forwarded when the SDK
		mints a public session.
	</p>
	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Values</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>mode</code></td>
				<td><code>conversation</code> | <code>presenter</code></td>
				<td>Managed conversation or host-scripted presentation.</td>
			</tr>
			<tr>
				<td><code>speechInputMode</code></td>
				<td><code>auto</code> | <code>manual</code> | <code>off</code></td>
				<td>Automatic turn detection, explicit listening boundaries, or no microphone.</td>
			</tr>
			<tr>
				<td><code>conversationProcessor</code></td>
				<td>Browser function</td>
				<td>
					Replace the managed LLM with your own logic. The SDK mints
					<code>responseMode: 'custom'</code> and never serializes the function. See
					<a href="/guides/custom-conversation-processor">Custom Conversation Processor</a>.
				</td>
			</tr>
			<tr>
				<td><code>onUserTranscript</code></td>
				<td>Callback</td>
				<td>
					Observe partial and final STT updates. Observation only — returned values do not become
					speech automatically.
				</td>
			</tr>
			<tr>
				<td><code>speechOnly</code></td>
				<td><code>boolean</code></td>
				<td>
					Run STT, TTS, and conversation without loading the avatar renderer or location scene
					assets. Same <code>experienceId</code> as a full embed. With
					<code>sessionEndpoint</code>, forward <code>speechOnly: true</code> in your BFF POST body.
					Default <code>false</code>.
				</td>
			</tr>
			<tr>
				<td><code>startButton</code></td>
				<td>Button label, accessibility, placement, variant, and appearance tokens</td>
				<td>Customizes the player-owned startup control.</td>
			</tr>
		</tbody>
	</table>
	<p>
		Conversation sessions default to <code>conversation</code>, managed responses, and
		<code>auto</code> input. Presenter sessions default to <code>presenter</code>, manual responses,
		and <code>manual</code> input.
	</p>
	<p>
		Do not pass <code>responseMode</code> directly for browser processors — supply
		<code>conversationProcessor</code> instead. Registered server processors (opaque
		<code>processorId</code>) are a separate upcoming capability.
	</p>

	<h2>Player-owned startup</h2>
	<p>
		The embedded player always renders and owns the actual startup click. Browsers require user
		activation inside the cross-origin player frame before it can unlock audio, so a button in the
		host page cannot replace this interaction.
	</p>
	<p>
		Use the <code>startButton</code> property on <code>StartSessionOptions</code> to adapt the
		built-in control to your interface. Supported placement values are <code>center</code>,
		<code>bottom-center</code>, <code>bottom-left</code>, and <code>bottom-right</code>. Supported
		variants are <code>primary</code>, <code>secondary</code>, and <code>minimal</code>.
	</p>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: '${snippets.experienceId}',
  mode: 'presenter',
  startButton: {
    label: 'Begin lesson',
    ariaLabel: 'Begin the guided lesson',
    placement: 'bottom-center', // center | bottom-center | bottom-left | bottom-right
    variant: 'primary', // primary | secondary | minimal
    appearance: {
      backgroundColor: '#635bff',
      textColor: '#ffffff',
      borderColor: '#8179ff',
      borderRadiusPx: 12,
      size: 'large',
      shadow: 'soft'
    }
  }
});

experience.on('started', async ({ mode }) => {
  if (mode === 'presenter') {
    await experience.speak({ text: 'Welcome to the lesson.' });
  }
});

await experience.attach({
  container: document.querySelector('#avatar')
});`}
		lang="javascript"
	/>
	<p>
		<code>started</code> fires after the player button is clicked and audio is unlocked. In presenter
		mode, it is the safe point for host code to call <code>speak()</code>. Calling
		<code>speak()</code>, <code>startListening()</code>, <code>stopListening()</code>, or
		<code>listenOnce()</code> before <code>started</code> throws a clear error. Button appearance is
		limited to the documented tokens; arbitrary CSS is not supported across the player frame.
	</p>

	<h2>Speech API</h2>
	<p>
		Call <code>attach()</code> first, wait for <code>started</code>, then use the methods below. See
		<a href="/avatar-experiences/events">Events</a> for <code>characterSpeechStarted</code>,
		<code>userTranscript</code>, <code>userSpeechStarted</code>, and related handlers.
	</p>

	<h3>Prerequisites</h3>
	<p>
		Speech methods throw if the session has not started. Register <code>experience.on('started', …)</code>
		(or the <code>onStart</code> option on <code>startSession</code>) and only call speech methods after
		the player-owned start button unlocks audio.
	</p>

	<h3><code>speak()</code></h3>
	<p>
		Queue animated character speech without invoking the managed LLM. Resolves when playback
		completes. An interrupted active or queued call rejects with <code>AbortError</code>.
	</p>
	<CodeBlock code={snippets.jsSpeak} lang="javascript" />
	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>text</code></td>
				<td><code>string</code></td>
				<td>Line for the character to speak.</td>
			</tr>
			<tr>
				<td><code>characterId</code></td>
				<td><code>string</code> (optional)</td>
				<td>Defaults to <code>activeCharacterId</code> from the manifest.</td>
			</tr>
			<tr>
				<td><code>behavior</code></td>
				<td><code>enqueue</code> | <code>interrupt</code></td>
				<td>
					<code>enqueue</code> waits for current speech (default). <code>interrupt</code> stops
					active playback and clears the queue before speaking.
				</td>
			</tr>
		</tbody>
	</table>
	<p>
		Returns <code>SpeechResult</code>: <code>speechId</code>, <code>turnId</code>,
		<code>characterId</code>, <code>text</code>, and <code>durationMs</code>.
	</p>

	<h3><code>startListening()</code> and <code>stopListening()</code></h3>
	<p>
		Open and close a logical microphone gate. The player acquires the physical microphone once during
		startup; <code>stopListening()</code> finalizes the utterance without stopping the media track.
		Use with <code>speechInputMode: 'manual'</code> so learner pauses do not end the utterance.
	</p>
	<CodeBlock code={snippets.jsManualListening} lang="javascript" />
	<p>
		<code>stopListening()</code> returns <code>UtteranceResult</code> with
		<code>utteranceId</code> and <code>text</code>. In managed conversation mode, a finalized manual
		utterance still triggers the configured processor. In presenter mode, the host decides what to do
		with the text.
	</p>

	<h3><code>listenOnce()</code></h3>
	<p>
		Convenience for automatic end-of-speech capture. Requires <code>speechInputMode: 'auto'</code>.
		Opens one listening gate, waits for VAD to finalize a single utterance, then resolves with
		<code>UtteranceResult</code>. Use for quiz answers, voice forms, or presenter flows where the host
		owns the turn loop but does not want Start/Stop buttons.
	</p>
	<CodeBlock code={snippets.jsListenOnce} lang="javascript" />
	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>timeoutMs</code></td>
				<td><code>number</code> (optional)</td>
				<td>Reject if no finalized utterance within this window (default 30s).</td>
			</tr>
			<tr>
				<td><code>signal</code></td>
				<td><code>AbortSignal</code> (optional)</td>
				<td>Abort the wait; rejects with <code>AbortError</code>.</td>
			</tr>
		</tbody>
	</table>
	<p>
		Only one <code>listenOnce()</code> may be active at a time. Timeout, abort, and permission failures
		reject without adding a final user message to conversation history. See
		<a href="/guides/listen-once-capture">Listen Once Capture</a>.
	</p>

	<h3><code>conversationProcessor</code></h3>
	<p>
		Supply a browser function on <code>Experience.startSession()</code> to replace Liforma's managed
		LLM for that session. The player still orchestrates turns in <code>conversation</code> mode with
		<code>speechInputMode: 'auto'</code>; your function decides what the character should say next.
	</p>
	<CodeBlock code={snippets.jsConversationProcessor} lang="javascript" />
	<p>
		The processor receives an immutable <code>conversation</code> snapshot, the finalized user
		<code>text</code>, <code>utteranceId</code>, and an <code>AbortSignal</code> cancelled when
		<code>speak(&#123; behavior: 'interrupt' &#125;)</code> or <code>destroy()</code> aborts in-flight work.
		Return a string, an object with <code>text</code> (and optional <code>characterId</code>,
		<code>behavior</code>), or an <code>AsyncIterable&lt;string&gt;</code> for streamed replies.
	</p>
	<CodeBlock code={snippets.jsConversationProcessorStream} lang="javascript" />
	<p>
		Processor failures emit <code>conversationProcessorError</code> and do not fall back to the managed
		LLM. Full walkthrough:
		<a href="/guides/custom-conversation-processor">Custom Conversation Processor</a>.
	</p>

	<h3><code>getConversation()</code> and <code>getLastTurn()</code></h3>
	<p>
		Read the flat in-session history as an ordered <code>ConversationMessage[]</code>. Each message
		has <code>messageId</code>, <code>turnId</code>, <code>role</code> (<code>user</code> or
		<code>assistant</code>), <code>text</code>, <code>source</code> (<code>user</code>,
		<code>llm</code>, <code>speak</code>, or <code>opening</code>), <code>status</code>,
		<code>timestamp</code>, and optional <code>characterId</code> for assistant lines.
	</p>
	<CodeBlock code={snippets.jsConversationGetters} lang="javascript" />
	<p>
		<code>getConversation()</code> returns the current snapshot. <code>getLastTurn()</code> returns
		messages sharing the latest <code>turnId</code>. Subscribe to
		<code>conversationUpdate</code> for push updates when history changes.
	</p>
	<p>
		For scripted lessons with manual Start/Stop, see
		<a href="/guides/guided-scripted-practice">Guided Scripted Practice</a> and the
		<a href="https://examples.liforma.ai/examples/guided-practice/vanilla/">guided-practice example</a>
		on <code>examples.liforma.ai</code>.
	</p>

	<h2>Rendering is separate</h2>
	<p>
		Session creation and rendering configuration are independent. Attach the experience to a
		container to mount the player, display the avatar, and present its startup control.
	</p>
</DocPage>
