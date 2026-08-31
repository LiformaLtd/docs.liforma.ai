<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience API"
	description="Programmatic control over Avatar Experience sessions."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
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
				<td>Browser embed — SDK calls <code>/v1/browser-sessions</code></td>
			</tr>
			<tr>
				<td><code>{`{ launch }`}</code></td>
				<td>Advanced: client-fetched opaque launch (prefer <code>sessionEndpoint</code>)</td>
			</tr>
			<tr>
				<td><code>{`{ experienceId, sessionEndpoint }`}</code></td>
				<td>Server session — SDK POSTs to your same-origin route</td>
			</tr>
		</tbody>
	</table>

	<h2>Browser mint configuration</h2>
	<p>
		Pass these options to <code>Experience.startSession()</code>. They are forwarded when the SDK
		mints via the browser endpoint.
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
					Replace the managed LLM with your own logic. The SDK derives custom response
					ownership internally and never serializes the function. See
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
				<td><code>alreadyConverted</code></td>
				<td><code>string[]</code> (e.g. <code>['registration']</code>)</td>
				<td>
					Conversion keys this play is already ineligible for. Snapshot at mint. Registration rate
					excludes these plays from the denominator. Do not fire
					<code>conversion('registration')</code> for an already-registered visitor. Prefer setting
					this on server mint (<code>sessionEndpoint</code> / <code>POST /v1/sessions</code>).
				</td>
			</tr>
			<tr>
				<td><code>fit</code></td>
				<td><code>full</code> | <code>medium</code> | <code>face</code></td>
				<td>
					Scene framing in the host container. Default <code>full</code> height-fits the whole
					avatar and location. <code>medium</code> is a bust window (0.75× face-mesh height above
					the oval, 2× below). <code>face</code> frames the mesh face oval with 0.5H above and
					below and at least 0.25W on each side (location background zooms too) — for inset / PIP
					layouts. Set on <code>attach()</code> or update live with <code>setFit()</code>. Not
					related to location video-call presentation.
				</td>
			</tr>
			<tr>
				<td><code>startButton</code></td>
				<td>Button label, accessibility, placement, variant, and appearance tokens</td>
				<td>Customizes the player-owned startup control.</td>
			</tr>
			<tr>
				<td><code>theme</code></td>
				<td>
					<code>colors</code>, <code>typography</code>, <code>radiusPx</code>,
					<code>button</code>
				</td>
				<td>
					Global player chrome (introduction, feedback, shared buttons, panels). Presentation
					only — does not remint. <code>startButton.appearance</code> still overrides the start
					CTA specifically.
				</td>
			</tr>
		</tbody>
	</table>
	<p>
		Conversation sessions default to <code>conversation</code>, managed responses, and
		<code>auto</code> input. Presenter sessions default to <code>presenter</code>, manual responses,
		and <code>manual</code> input.
	</p>
	<p>
		Supply <code>conversationProcessor</code> for browser-owned responses. Registered server
		processors (opaque <code>processorId</code>) are a separate upcoming capability.
	</p>

	<h2>Player-owned startup</h2>
	<p>
		The embedded player always renders and owns the actual startup click. Browsers require user
		activation inside the cross-origin player frame before it can unlock audio, so a button in the
		host page cannot replace this interaction.
	</p>
	<p>
		Use the <code>startButton</code> property on <code>attach()</code> (or the matching
		<code>&lt;Experience&gt;</code> prop) to adapt the built-in control to your interface. Supported
		placement values are <code>center</code>, <code>bottom-center</code>, <code>bottom-left</code>,
		and <code>bottom-right</code>. Supported variants are <code>primary</code>,
		<code>secondary</code>, and <code>minimal</code>. Use <code>theme</code> for shared chrome
		(introduction, feedback, panels); <code>startButton.appearance</code> still wins on the start
		CTA.
	</p>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: '${snippets.experienceId}',
  mode: 'presenter'
});

experience.on('started', async (evt) => {
  if (evt.data.mode === 'presenter') {
    await experience.speech.speak({ text: 'Welcome to the lesson.' });
  }
});

await experience.attach({
  container: document.querySelector('#avatar'),
  theme: {
    colors: { primary: '#635bff', primaryText: '#ffffff' },
    radiusPx: 16
  },
  startButton: {
    label: 'Begin lesson',
    ariaLabel: 'Begin the guided lesson',
    placement: 'bottom-center', // center | bottom-center | bottom-left | bottom-right
    variant: 'primary', // primary | secondary | minimal
    appearance: {
      backgroundColor: '#635bff',
      textColor: '#ffffff',
      borderColor: '#8179ff',
      borderRadiusPx: 999,
      borderWidthPx: 2,
      size: 'large',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: 700,
      // Or set an exact label size (10–48); overrides size font scaling:
      // fontSizePx: 22,
      shadow: 'soft'
    },
    icon: 'player-play', // Tabler id, or https://… / data:image/…
    iconPosition: 'left' // left | above
  }
});`}
		lang="javascript"
	/>
	<p>
		<code>started</code> fires after the player button is clicked and audio is unlocked. In presenter
		mode, it is the safe point for host code to call <code>speak()</code>. Calling
		<code>speak()</code>, <code>startListening()</code>, <code>stopListening()</code>, or
		<code>listenOnce()</code> before <code>started</code> throws a clear error. Button appearance is
		limited to the documented tokens; arbitrary CSS is not supported across the player frame. For a
		large pill button use <code>size: 'large'</code> with <code>borderRadiusPx: 999</code>, or set
		<code>fontSizePx</code> (10–48) for an exact label size. <code>fontFamily</code> accepts system
		/ stack names available in the player iframe (host webfonts are not loaded there);
		<code>fontWeight</code> is 100–900. Optional <code>icon</code> accepts a Tabler Iconify id
		(e.g. <code>player-play</code>) or an absolute <code>https://…</code> /
		<code>data:image/…</code> URL; <code>iconPosition</code> is <code>left</code> (default) or
		<code>above</code>. Tabler icons inherit the button text colour. Site-relative paths are not
		supported (they would resolve against the player iframe origin).
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

	<h3><code>speech.speak()</code></h3>
	<p>
		Queue animated character speech via Liforma TTS without invoking the managed LLM. Requires
		<code>textSpeech</code>. Resolves when playback completes.
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
				<td><code>queue</code></td>
				<td><code>append</code> | <code>replace-active</code> | <code>replace-all</code></td>
				<td>
					<code>append</code> waits for current speech (default). Replace policies interrupt before
					speaking.
				</td>
			</tr>
		</tbody>
	</table>

	<h3><code>speech.play()</code> and <code>createUtterance()</code></h3>
	<p>
		Bring-your-own audio. Requires <code>externalSpeechAudio</code>. Pass PCM, encoded bytes
		(<code>audio/mpeg</code>, …), or a CORS-open URL. Encoded/URL sources are decoded in the player,
		then lipsynced via speech-animation windows. See
		<a href="/avatar-experiences/bring-your-own-voice">Bring your own voice</a>.
	</p>
	<p>
		When you have the spoken text, pass optional <code>transcript</code> on
		<code>play</code>, <code>createUtterance</code>,
		<code>utterance.setTranscript(text)</code>, or
		<code>close(&#123; transcript &#125;)</code>. Audio alone is enough; providing the text when
		available usually improves lipsync. Empty / whitespace is ignored.
	</p>
	<CodeBlock code={snippets.jsSpeechPlayEncoded} lang="javascript" />
	<CodeBlock code={snippets.jsSpeechCreateUtterance} lang="typescript" filename="stream-pcm.ts" />

	<h3><code>speech.interrupt()</code></h3>
	<p>
		Returns settled <code>SpeechResult[]</code> for interrupted/cancelled utterances. Options:
		<code>{'{ scope: \'active\' | \'all\' }'}</code>, <code>{'{ utteranceId }'}</code>, or
		<code>{'{ characterId }'}</code>.
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

	<h3><code>setFit()</code></h3>
	<p>
		Change scene framing after <code>attach()</code> without reminting:
		<code>full</code> (default), <code>medium</code> (bust window), or <code>face</code> (inset / PIP).
		Safe as soon as the player is attached; does not wait for <code>started</code>.
	</p>
	<CodeBlock
		code={`await experience.attach({ container: document.querySelector('#avatar') });

// Later — e.g. when shrinking the host into a PIP tile
await experience.setFit('face');
await experience.setFit('full');`}
		lang="javascript"
	/>

	<h3><code>setInteraction()</code> / <code>getInteraction()</code></h3>
	<p>
		Patch live interaction settings after <code>attach()</code>: captions
		(<code>showUserSpeech</code>, <code>showCharacterSpeech</code>, <code>visibleTurns</code>),
		text input (<code>allowTextInput</code>, <code>textInputEnabled</code>), mic
		(<code>allowMicInput</code>, <code>micInputEnabled</code>), mute character speech
		(<code>playCharacterSpeech: false</code>), and Edit/rewind (<code>allowRewind</code>).
		Returns the player-resolved <code>ExperienceInteraction</code>. Subscribe to
		<code>interactionChange</code> for player-driven updates.
	</p>
	<CodeBlock
		code={`await experience.attach({ container: document.querySelector('#avatar') });

await experience.setInteraction({
  showCharacterSpeech: true,
  textInputEnabled: true,
  playCharacterSpeech: false
});

const interaction = await experience.getInteraction();`}
		lang="javascript"
	/>

	<h3><code>focusCharacter()</code></h3>
	<p>
		Presentation-only camera or tile emphasis on a multi-Character node. Pass the active-cast
		<code>characterId</code>. The call is a no-op when the active node has one Character. It does
		not choose who speaks — conversational speakers come from the engine-validated cast turn.
		Subscribe to <code>characterFocusChanged</code> for focus updates.
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
