<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Events"
	description="Listen to conversation, avatar, and world events from an Experience."
	next={[
		{ title: 'Listen to Events', href: '/guides/events' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
		{ title: 'Custom Conversation Processor', href: '/guides/custom-conversation-processor' }
	]}
>
	<h2>Overview</h2>
	<p>
		Register handlers on an <code>Experience</code> instance to observe conversation, avatar, and
		world activity.
	</p>

	<h2>Startup</h2>
	<p>
		<code>ready</code> reports that the player visuals are mounted and ready. <code>started</code>
		reports that the player-owned startup button was clicked and audio and session startup completed.
	</p>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: 'exp_…'
});

experience.on('ready', ({ manifest }) => {
  console.log('Player visuals ready', manifest.experience.mode);
});

experience.on('started', ({ mode }) => {
  console.log('Audio and session started in', mode, 'mode');
});

await experience.attach({ container });
`}
		lang="javascript"
	/>
	<p>
		<code>ready</code> includes the resolved manifest. <code>started</code> includes the experience
		mode. Both replay asynchronously for handlers registered after the event. The
		<code>onStart</code> option on
		<code>Experience.startSession()</code> is a convenience callback for startup completion.
	</p>

	<h2>Speech and transcripts</h2>
	<p>
		Emitted during <code>speak()</code> sessions, manual or automatic listening, and custom processor
		conversation. Partial transcript revisions include monotonic <code>revision</code> and optional
		<code>delta</code>. Only updates with <code>isFinal: true</code> commit a user message to
		conversation history.
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
  // Retry, speak a fallback line, or show host UI.
});`}
		lang="javascript"
	/>

	<h2>Conversation (managed and custom mode)</h2>
	<CodeBlock
		code={`experience.on('message', (message) => {
  console.log(message.role, message.text, message.source);
});

experience.on('modeChange', (mode) => {
  // 'listening' | 'speaking' | 'thinking'
  console.log('Session mode', mode);
});`}
		lang="javascript"
	/>

	<p>
		Lip-sync, expressions, and body animation run inside the hosted player. Integrators do
		<strong>not</strong> receive viseme or animation keyframe events — use
		<code>characterSpeechStarted</code> / <code>characterSpeechEnded</code> when you need to sync
		your UI with speech.
	</p>

	<h2>World</h2>
	<CodeBlock
		code={`experience.on('stateUpdate', (patch) => { /* structured state change */ });
experience.on('locationChange', ({ locationId }) => { });
experience.on('characterEnter', ({ characterId }) => { });
experience.on('characterExit', ({ characterId }) => { });
experience.on('close', ({ reason, returnUrl }) => { });`}
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
				<td><code>{`{ manifest }`}</code></td>
				<td>Player visuals are mounted and ready</td>
			</tr>
			<tr>
				<td><code>started</code></td>
				<td><code>{`{ mode }`}</code></td>
				<td>Player startup click, audio unlock, and session startup completed</td>
			</tr>
			<tr>
				<td><code>userTranscript</code></td>
				<td>
					<code>{`{ utteranceId, text, revision, isFinal, delta? }`}</code>
				</td>
				<td>
					Partial and final STT updates. Ephemeral until <code>isFinal: true</code>.
				</td>
			</tr>
			<tr>
				<td><code>userSpeechStarted</code></td>
				<td><code>{`{ utteranceId? }`}</code></td>
				<td>VAD detected speech activity (auto mode telemetry)</td>
			</tr>
			<tr>
				<td><code>userSpeechEnded</code></td>
				<td><code>{`{ utteranceId? }`}</code></td>
				<td>VAD detected end of speech; final text may arrive after this event</td>
			</tr>
			<tr>
				<td><code>characterSpeechStarted</code></td>
				<td><code>{`{ speechId, turnId, characterId, text, source }`}</code></td>
				<td>Character began speaking (<code>speak</code>, <code>opening</code>, or <code>llm</code>)</td>
			</tr>
			<tr>
				<td><code>characterSpeechEnded</code></td>
				<td><code>{`{ speechId, turnId, characterId, text, source, durationMs?, reason }`}</code></td>
				<td>Character speech finished or was interrupted</td>
			</tr>
			<tr>
				<td><code>conversationUpdate</code></td>
				<td><code>ConversationMessage[]</code></td>
				<td>Immutable snapshot of in-session conversation history</td>
			</tr>
			<tr>
				<td><code>listeningState</code></td>
				<td><code>boolean</code></td>
				<td>Manual listening gate opened (<code>true</code>) or closed (<code>false</code>)</td>
			</tr>
			<tr>
				<td><code>message</code></td>
				<td><code>ConversationMessage</code></td>
				<td>Durable user or assistant message committed to session history</td>
			</tr>
			<tr>
				<td><code>modeChange</code></td>
				<td><code>listening</code> | <code>speaking</code> | <code>thinking</code></td>
				<td>Session activity mode for UI sync</td>
			</tr>
			<tr>
				<td><code>conversationProcessorError</code></td>
				<td><code>{`{ utteranceId, message }`}</code></td>
				<td>Browser <code>conversationProcessor</code> threw or rejected</td>
			</tr>
			<tr>
				<td><code>stateUpdate</code></td>
				<td>State patch</td>
				<td>Structured world state change from server</td>
			</tr>
			<tr>
				<td><code>close</code></td>
				<td><code>{`{ reason, returnUrl? }`}</code></td>
				<td>Session ended by user or programmatically</td>
			</tr>
		</tbody>
	</table>
</DocPage>
