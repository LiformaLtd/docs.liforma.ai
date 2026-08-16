<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="JavaScript SDK"
	description="@liforma/client — the integrator-facing JavaScript API."
	next={[
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
		{ title: 'Events', href: '/avatar-experiences/events' },
		{ title: 'Svelte Component', href: '/sdk-reference/svelte' }
	]}
>
	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<p>Or load from CDN (v2 speak API):</p>
	<CodeBlock code={snippets.cdnScriptTagV2} lang="html" />

	<h2>Primary API</h2>
	<CodeBlock code={snippets.jsStartSession} lang="javascript" />

	<h2>Exports</h2>
	<table>
		<thead>
			<tr>
				<th>Export</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>Experience</code></td>
				<td>Session lifecycle, speech API, events, and conversation getters</td>
			</tr>
			<tr>
				<td><code>ExperienceSession</code></td>
				<td>Type alias for the live session returned by <code>Experience.startSession()</code></td>
			</tr>
		</tbody>
	</table>

	<p>
		The Svelte component is also named <code>Experience</code> — import it from
		<code>@liforma/client/svelte</code>. See <a href="/sdk-reference/svelte">Svelte Component</a>.
	</p>

	<h2>Lifecycle</h2>
	<CodeBlock
		code={`await experience.attach({ container });
experience.pause();
experience.resume();
await experience.end();`}
		lang="javascript"
	/>
	<p>
		<code>attach()</code> mounts the player iframe. <code>ready</code> fires when visuals are mounted;
		<code>started</code> fires after the player start button unlocks audio — required before speech
		APIs. See <a href="/avatar-experiences/events">Events</a>.
	</p>

	<h2>Speech API</h2>
	<p>
		Presenter sessions, manual listening, automatic capture, and custom processors. Requires
		<code>attach()</code> and the <code>started</code> event. Full reference:
		<a href="/avatar-experiences/experience-api">Experience API</a>.
	</p>
	<table>
		<thead>
			<tr>
				<th>Method</th>
				<th>Returns</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>speak(options)</code></td>
				<td><code>Promise&lt;SpeechResult&gt;</code></td>
				<td>Animated character speech (<code>text</code>, optional <code>characterId</code>, <code>behavior</code>)</td>
			</tr>
			<tr>
				<td><code>startListening()</code></td>
				<td><code>Promise&lt;void&gt;</code></td>
				<td>Open manual listening gate (<code>speechInputMode: 'manual'</code>)</td>
			</tr>
			<tr>
				<td><code>stopListening()</code></td>
				<td><code>Promise&lt;UtteranceResult&gt;</code></td>
				<td>Close gate and finalize utterance</td>
			</tr>
			<tr>
				<td><code>listenOnce(options?)</code></td>
				<td><code>Promise&lt;UtteranceResult&gt;</code></td>
				<td>One automatic end-of-speech capture (<code>speechInputMode: 'auto'</code>)</td>
			</tr>
			<tr>
				<td><code>getConversation()</code></td>
				<td><code>readonly ConversationMessage[]</code></td>
				<td>Flat ordered session history snapshot</td>
			</tr>
			<tr>
				<td><code>getLastTurn()</code></td>
				<td><code>readonly ConversationMessage[]</code></td>
				<td>Messages in the latest turn</td>
			</tr>
			<tr>
				<td><code>focusCharacter(characterId)</code></td>
				<td><code>Promise&lt;void&gt;</code></td>
				<td>Presentation-only focus on a multi-Character node; no-op on single-Character nodes</td>
			</tr>
		</tbody>
	</table>

	<h3>Session options</h3>
	<p>
		Pass <code>conversationProcessor</code> and <code>onUserTranscript</code> on
		<code>Experience.startSession()</code>. See
		<a href="/guides/custom-conversation-processor">Custom Conversation Processor</a>.
	</p>

	<h3>Presenter + manual listening</h3>
	<CodeBlock code={snippets.jsPresenterSession} lang="javascript" />

	<h3><code>speak()</code></h3>
	<CodeBlock code={snippets.jsSpeak} lang="javascript" />

	<h3>Manual listening</h3>
	<CodeBlock code={snippets.jsManualListening} lang="javascript" />

	<h3><code>listenOnce()</code></h3>
	<CodeBlock code={snippets.jsListenOnce} lang="javascript" />

	<h3>Conversation getters</h3>
	<CodeBlock code={snippets.jsConversationGetters} lang="javascript" />

	<h2>Events</h2>
	<p>
		Register handlers with <code>experience.on(event, handler)</code>. Speech-related events include
		<code>ready</code>, <code>started</code>, <code>userTranscript</code>,
		<code>userSpeechStarted</code>, <code>userSpeechEnded</code>,
		<code>characterSpeechStarted</code>, <code>characterSpeechEnded</code>,
		<code>characterFocusChanged</code>,
		<code>conversationUpdate</code>, <code>conversationProcessorError</code>, and
		<code>listeningState</code>. See the full list on
		<a href="/avatar-experiences/events">Events</a>.
	</p>
	<p>
		Patterns: <a href="/guides/guided-scripted-practice">Guided Scripted Practice</a>,
		<a href="/guides/listen-once-capture">Listen Once Capture</a>,
		<a href="/guides/custom-conversation-processor">Custom Conversation Processor</a>.
	</p>
</DocPage>
