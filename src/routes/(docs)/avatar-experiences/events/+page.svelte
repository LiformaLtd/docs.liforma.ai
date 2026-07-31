<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Events"
	description="Listen to conversation, avatar, and world events from an Experience."
	next={[
		{ title: 'Listen to Events', href: '/guides/events' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
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

	<h2>Speech and transcripts (presenter / speak API)</h2>
	<p>
		These events are emitted during scripted <code>speak()</code> sessions and manual or automatic
		listening. Partial transcript revisions are planned for a later release; Phase A emits final user
		transcripts only.
	</p>
	<CodeBlock
		code={`experience.on('userTranscript', (update) => {
  if (!update.isFinal) return;
  console.log(update.utteranceId, update.text);
});

experience.on('characterSpeechStarted', (event) => {
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

	<h2>Conversation (managed mode)</h2>
	<CodeBlock
		code={`experience.on('message', ({ role, text, final }) => {
  console.log(role, text, final);
});

experience.on('modeChange', ({ mode }) => {
  // 'listening' | 'speaking'
});

experience.on('audio', (event) => {
  // optional low-level audio hooks
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
				<td><code>{`{ utteranceId, text, revision, isFinal }`}</code></td>
				<td>Final user transcript in manual mode (partial revisions planned)</td>
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
				<td><code>{`{ role, text, final }`}</code></td>
				<td>User or assistant message. <code>final</code> indicates end of utterance.</td>
			</tr>
			<tr>
				<td><code>modeChange</code></td>
				<td><code>{`{ mode }`}</code></td>
				<td><code>listening</code> or <code>speaking</code></td>
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
