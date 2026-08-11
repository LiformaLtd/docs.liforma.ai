<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Events"
	description="Listen to conversation and speech events from an Experience."
	next={[
		{ title: 'Listen to Events', href: '/guides/events' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
		{ title: 'Custom Conversation Processor', href: '/guides/custom-conversation-processor' }
	]}
>
	<h2>Overview</h2>
	<p>
		Register handlers with <code>experience.on(event, handler)</code> after
		<code>Experience.startSession()</code>. Component integrations use the matching callback props
		(<code>onMessage</code>, <code>onActivityChange</code>, …).
	</p>

	<h2>Startup</h2>
	<p>
		<code>ready</code> means the player visuals are mounted. <code>started</code> means the
		player-owned start button was used and audio is unlocked.
	</p>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: 'exp_…'
});

experience.on('ready', (evt) => {
  // evt: ExperienceEventEnvelope<{ session }>
  console.log('Player visuals ready', evt.data.session.id);
});

experience.on('started', (evt) => {
  // evt.data.mode — experience mode after audio unlock
  console.log('Audio and session started in', evt.data.mode, 'mode');
});

await experience.attach({ container });
`}
		lang="javascript"
	/>
	<p>
		<code>ready</code> includes the public <code>session</code> facts (not a parseable
		<code>launch</code>). <code>started</code> includes the experience mode. Both replay
		asynchronously for handlers registered after the event. The <code>onStart</code> option on
		<code>Experience.startSession()</code> is a convenience callback for startup completion.
	</p>

	<h2>Speech and transcripts</h2>
	<p>
		Emitted during <code>speak()</code>, listening, and custom processor conversation. Partial
		transcript revisions include monotonic <code>revision</code> and optional <code>delta</code>.
		Only updates with <code>isFinal: true</code> commit a user message to conversation history.
	</p>
	<CodeBlock code={snippets.jsPartialTranscript} lang="javascript" />
	<CodeBlock
		code={`experience.on('characterSpeechStarted', (event) => {
  console.log('Speaking', event.characterId, event.text, event.source);
});

experience.on('characterSpeechEnded', (event) => {
  console.log('Speech ended', event.reason, event.durationMs);
});

experience.on('conversationUpdate', (conversation) => {
  console.log('History length', conversation.length);
});

experience.on('listeningState', (listening) => {
  console.log('Mic gate', listening);
});`}
		lang="javascript"
	/>

	<h2>Custom conversation processor</h2>
	<p>
		When you supply <code>conversationProcessor</code> on <code>startSession()</code>, processor
		failures surface as <code>conversationProcessorError</code>. The managed LLM is not used as a
		fallback.
	</p>
	<CodeBlock
		code={`experience.on('conversationProcessorError', ({ utteranceId, message }) => {
  console.error('Processor failed for', utteranceId, message);
});`}
		lang="javascript"
	/>

	<h2>Conversation</h2>
	<CodeBlock
		code={`// Every experience.on handler receives an envelope:
// { id: 'evt_…', type, sessionId, timestamp, data }

experience.on('message', (evt) => {
  // evt.data.status is always 'final' for committed history messages
  console.log(evt.data.role, evt.data.text, evt.data.source, evt.data.status);
});

experience.on('activityChange', (evt) => {
  // evt.data: 'idle' | 'listening' | 'thinking' | 'speaking'
  console.log('Activity', evt.data);
});`}
		lang="javascript"
	/>

	<p>
		Lip-sync and facial animation run inside the hosted player. Integrators do
		<strong>not</strong> receive viseme or animation keyframe events — use
		<code>characterSpeechStarted</code> / <code>characterSpeechEnded</code> to sync host UI with
		speech.
	</p>

	<h2>Player attach callbacks</h2>
	<p>
		Embed lifecycle is on the object returned from <code>attach()</code> (and on component props),
		not on <code>experience.on()</code>:
	</p>
	<CodeBlock
		code={`const player = await experience.attach({
  container,
  onPlayerStatusChange: (status) => {
    // PlayerStatus: loading | scene | ready | error
    console.log(status);
  }
});

player.on('close', ({ reason, returnUrl }) => {
  console.log('Player closed', reason, returnUrl);
});`}
		lang="javascript"
	/>

	<h2>Event reference</h2>
	<table>
		<thead>
			<tr>
				<th>Event</th>
				<th>Payload</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>ready</code></td>
				<td>envelope <code>.data</code>: <code>{`{ session }`}</code></td>
				<td>Player visuals are mounted and ready</td>
			</tr>
			<tr>
				<td><code>started</code></td>
				<td>envelope <code>.data</code>: <code>{`{ mode }`}</code></td>
				<td>Player startup click, audio unlock, and session startup completed</td>
			</tr>
			<tr>
				<td><code>userTranscript</code></td>
				<td>
					envelope <code>.data</code>:
					<code>{`{ utteranceId, text, revision, isFinal, delta? }`}</code>
				</td>
				<td>
					Partial and final STT updates. Ephemeral until <code>isFinal: true</code>.
				</td>
			</tr>
			<tr>
				<td><code>userSpeechStarted</code></td>
				<td>envelope <code>.data</code>: <code>{`{ utteranceId? }`}</code></td>
				<td>VAD detected speech activity (auto mode telemetry)</td>
			</tr>
			<tr>
				<td><code>userSpeechEnded</code></td>
				<td>envelope <code>.data</code>: <code>{`{ utteranceId? }`}</code></td>
				<td>VAD detected end of speech; final text may arrive after this event</td>
			</tr>
			<tr>
				<td><code>characterSpeechStarted</code></td>
				<td>envelope <code>.data</code>: <code>{`{ speechId, turnId, characterId, text, source }`}</code></td>
				<td>Character began speaking (<code>speak</code>, <code>opening</code>, or <code>llm</code>)</td>
			</tr>
			<tr>
				<td><code>characterSpeechEnded</code></td>
				<td>envelope <code>.data</code>: <code>{`{ speechId, turnId, characterId, text, source, durationMs?, reason }`}</code></td>
				<td>Character speech finished or was interrupted</td>
			</tr>
			<tr>
				<td><code>conversationUpdate</code></td>
				<td>envelope <code>.data</code>: <code>ConversationMessage[]</code></td>
				<td>Immutable snapshot of in-session conversation history</td>
			</tr>
			<tr>
				<td><code>listeningState</code></td>
				<td>envelope <code>.data</code>: <code>boolean</code></td>
				<td>Manual listening gate opened (<code>true</code>) or closed (<code>false</code>)</td>
			</tr>
			<tr>
				<td><code>message</code></td>
				<td>envelope <code>.data</code>: <code>ConversationMessage</code></td>
				<td>
					Durable user or assistant message (<code>status: 'final'</code>, plus
					<code>source</code>, <code>role</code>, <code>text</code>, ids)
				</td>
			</tr>
			<tr>
				<td><code>activityChange</code></td>
				<td>envelope <code>.data</code>: <code>'idle' | 'listening' | 'speaking' | 'thinking'</code></td>
				<td>Session listening / speaking activity for UI sync</td>
			</tr>
			<tr>
				<td><code>conversationProcessorError</code></td>
				<td>envelope <code>.data</code>: <code>{`{ utteranceId, message }`}</code></td>
				<td>Browser <code>conversationProcessor</code> threw or rejected</td>
			</tr>
		</tbody>
	</table>

	<h3>Not on <code>experience.on()</code></h3>
	<table>
		<thead>
			<tr>
				<th>Signal</th>
				<th>How to listen</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Player embed state</td>
				<td>
					<code>attach(&#123; onPlayerStatusChange &#125;)</code> or component
					<code>onPlayerStatusChange</code>
				</td>
			</tr>
			<tr>
				<td>Player close</td>
				<td>
					<code>player.on('close', …)</code> after <code>attach()</code>, or component
					<code>onClose</code>
				</td>
			</tr>
		</tbody>
	</table>
</DocPage>
