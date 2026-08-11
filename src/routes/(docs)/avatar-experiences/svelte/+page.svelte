<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience (Svelte)"
	description="The canonical Svelte component for embedding Avatar Experiences."
	next={[
		{ title: 'Web Component', href: '/sdk-reference/web-component' },
		{ title: 'Experience (HTML)', href: '/avatar-experiences/html' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>&lt;Experience&gt;</code> is the canonical Svelte API for simple embeds and
		host-controlled experiences. It owns session creation, attachment, event subscriptions, restart,
		and cleanup.
	</p>

	<h2>Basic usage</h2>
	<p>
		For a standard embed, pass <code>experienceId</code> (and optional session options). The component
		mints the session, attaches the player, and runs the experience according to
		<code>mode</code> and <code>speechInputMode</code>. You do not need
		<code>bind:this</code> unless your app must drive speech or listening from its own UI.
	</p>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h2>Host-controlled speech and listening</h2>
	<p>
		<strong>“Advanced”</strong> here does not mean a separate API — it means your <strong>host app
		controls when the character speaks and when the microphone listens</strong>, instead of leaving
		that entirely to automatic conversation mode.
	</p>
	<p>Typical cases:</p>
	<ul>
		<li>
			<strong>Scripted lessons</strong> — you call <code>speak()</code> with predetermined tutor
			lines.
		</li>
		<li>
			<strong>Manual capture</strong> — your Start/Stop buttons call
			<code>startListening()</code> and <code>stopListening()</code>.
		</li>
		<li>
			<strong>Custom lesson flow</strong> — turn state, feedback, and “Next” live in your page;
			the component still owns session lifecycle.
		</li>
	</ul>
	<p>
		You still use <code>&lt;Experience&gt;</code>. Add <code>bind:this</code> to hold an
		<code>ExperienceHandle</code> — the typed controller for <code>speak()</code>,
		<code>startListening()</code>, and related methods. Type it as
		<code>ExperienceHandle | undefined</code> because the binding is undefined before mount.
	</p>
	<p><strong>What the example below does:</strong></p>
	<ol>
		<li>
			Embeds the experience in <strong>presenter</strong> mode with <strong>manual</strong> speech
			input — the SDK does not auto-capture the learner.
		</li>
		<li>
			When the user taps the <strong>player-owned start button</strong>, <code>onStarted</code>
			fires (audio unlocked) and the app speaks a welcome line via <code>experience.speech.speak()</code>.
		</li>
		<li>
			Host <strong>Start answer</strong> / <strong>Stop answer</strong> buttons call listening
			methods on the handle; they stay disabled until startup completes.
		</li>
	</ol>
	<p>
		For a full lesson loop (speak → Start → Stop → feedback → Next), see
		<a href="/guides/guided-scripted-practice">Guided Scripted Practice</a> and the
		<a href="https://github.com/LiformaLtd/examples.liforma.ai/tree/main/examples/guided-practice/sveltekit">guided-practice SvelteKit example</a>.
	</p>
	<CodeBlock code={snippets.svelteAdvancedControl} lang="svelte" filename="Lesson.svelte" />

	<h3>Readiness</h3>
	<ul>
		<li>
			<code>onReady</code> and <code>ready()</code> mean the Session Launch is resolved and the player is
			attached.
		</li>
		<li>
			<code>onStarted</code> and <code>started()</code> mean the player start button has been used
			and audio is unlocked.
		</li>
	</ul>
	<p>
		<code>speak()</code>, <code>startListening()</code>, <code>stopListening()</code>, and
		<code>listenOnce()</code> preserve the root Experience API's state validation. They wait for
		component session creation if necessary, but they do not silently queue until audio is unlocked.
		A call made before <code>started</code> rejects. Call speech methods from
		<code>onStarted</code>, await <code>experience.started()</code>, or keep controls disabled until
		startup completes.
	</p>

	<h2><code>ExperienceProps</code></h2>
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>experienceId</code></td>
				<td><code>string</code></td>
				<td>Experience ID. SDK mints via <code>/v1/browser-sessions</code> (browser mint).</td>
			</tr>
			<tr>
				<td><code>launch</code></td>
				<td><code>string</code></td>
				<td>Advanced: client-fetched opaque launch. Prefer <code>sessionEndpoint</code>.</td>
			</tr>
			<tr>
				<td><code>sessionEndpoint</code></td>
				<td><code>string</code></td>
				<td>Same-origin route that returns SessionLaunchResponse. For server-session embeds.</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td><code>string</code></td>
				<td>BCP 47 locale override (e.g. <code>en-GB</code>).</td>
			</tr>
			<tr>
				<td><code>mode</code></td>
				<td><code>ExperienceMode</code></td>
				<td>Conversation or presenter behavior.</td>
			</tr>
			<tr>
				<td><code>responseMode</code></td>
				<td><code>ResponseMode</code></td>
				<td>Deprecated; response ownership is derived from <code>mode</code>.</td>
			</tr>
			<tr>
				<td><code>speechInputMode</code></td>
				<td><code>SpeechInputMode</code></td>
				<td>Automatic, manual, or disabled speech capture.</td>
			</tr>
			<tr>
				<td><code>startButton</code></td>
				<td><code>StartButtonOptions</code></td>
				<td>Player-owned startup button configuration.</td>
			</tr>
			<tr>
				<td><code>conversationProcessor</code></td>
				<td><code>ConversationProcessorFn</code></td>
				<td>Browser-owned conversation processor.</td>
			</tr>
			<tr>
				<td><code>speechOnly</code></td>
				<td><code>boolean</code></td>
				<td>
					Run STT, TTS, and conversation without loading the avatar renderer or location scene
					assets. Same <code>experienceId</code> as a full embed. Default <code>false</code>. Bare
					<code>speechOnly</code> is equivalent to <code>speechOnly={true}</code>.
				</td>
			</tr>
			<tr>
				<td><code>fit</code></td>
				<td><code>'full' | 'face'</code></td>
				<td>
					Scene framing in the host container. Default <code>'full'</code> height-fits the whole
					avatar and location. <code>'face'</code> cover-zooms the composed scene onto the mesh face
					oval (location background zooms with the face) — useful for small inset / PIP layouts.
					Session-start only; changing it restarts the session. Orthogonal to location video-call
					presentation (<code>hasZoomVariant</code>).
				</td>
			</tr>
			<tr>
				<td><code>avatarId</code>, <code>locationId</code></td>
				<td><code>string</code></td>
				<td>Public-session avatar or location overrides.</td>
			</tr>
			<tr>
				<td><code>embedBaseUrl</code></td>
				<td><code>string</code></td>
				<td>Player embed origin override, normally only for local development.</td>
			</tr>
			<tr>
				<td><code>debug</code></td>
				<td><code>boolean</code></td>
				<td>Enable SDK debug behavior.</td>
			</tr>
			<tr>
				<td><code>returnUrl</code></td>
				<td><code>string</code></td>
				<td>Close destination URL (player / attach chrome — does not remint).</td>
			</tr>
		</tbody>
	</table>

	<h2>Callback props</h2>
	<p>
		Svelte integrations use typed Svelte 5 callback props, not manual <code>.on()</code>
		subscriptions or legacy <code>on:</code> component events.
	</p>
	<CodeBlock code={snippets.svelteCallbacks} lang="svelte" filename="App.svelte" />
	<table>
		<thead>
			<tr>
				<th>Callback</th>
				<th>When it runs</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>onReady</code></td>
				<td>Manifest resolved and player attached.</td>
			</tr>
			<tr>
				<td><code>onStarted</code></td>
				<td>User gesture completed and audio unlocked.</td>
			</tr>
			<tr>
				<td><code>onUserTranscript</code></td>
				<td>Partial or final user transcript update.</td>
			</tr>
			<tr>
				<td><code>onStateUpdate</code></td>
				<td>Embedded player state changes.</td>
			</tr>
			<tr>
				<td><code>onClose</code></td>
				<td>Player requests close; supplying it overrides default close navigation.</td>
			</tr>
			<tr>
				<td><code>onError</code></td>
				<td>Initialization or runtime operation reports an error.</td>
			</tr>
		</tbody>
	</table>
	<p>
		Additional typed callbacks are <code>onUserSpeechStarted</code>,
		<code>onUserSpeechEnded</code>, <code>onCharacterSpeechStarted</code>,
		<code>onCharacterSpeechEnded</code>, <code>onConversationUpdate</code>,
		<code>onMessage</code>, <code>onListeningState</code>, <code>onModeChange</code>, and
		<code>onConversationProcessorError</code>.
	</p>

	<h2><code>ExperienceHandle</code></h2>
	<table>
		<thead>
			<tr>
				<th>Method</th>
				<th>Result</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>ready()</code></td>
				<td><code>Promise&lt;ReadyEvent&gt;</code></td>
			</tr>
			<tr>
				<td><code>started()</code></td>
				<td><code>Promise&lt;StartedEvent&gt;</code></td>
			</tr>
			<tr>
				<td><code>speak(options)</code></td>
				<td><code>Promise&lt;SpeechResult&gt;</code></td>
			</tr>
			<tr>
				<td><code>startListening()</code></td>
				<td><code>Promise&lt;void&gt;</code></td>
			</tr>
			<tr>
				<td><code>stopListening()</code></td>
				<td><code>Promise&lt;UtteranceResult&gt;</code></td>
			</tr>
			<tr>
				<td><code>listenOnce(options?)</code></td>
				<td><code>Promise&lt;UtteranceResult&gt;</code></td>
			</tr>
			<tr>
				<td><code>getManifest()</code></td>
				<td>Current <code>SessionManifest</code>, or <code>null</code> before ready.</td>
			</tr>
			<tr>
				<td><code>getConversation()</code></td>
				<td>Current immutable conversation snapshot.</td>
			</tr>
			<tr>
				<td><code>end()</code></td>
				<td>Ends the current session.</td>
			</tr>
		</tbody>
	</table>

	<h2>Reactive restart behavior</h2>
	<p>
		Changing <strong>developer-intent</strong> props restarts the owned session:
		<code>experienceId</code>, <code>sessionEndpoint</code>, <code>launch</code>,
		<code>locale</code>, <code>mode</code>, <code>speechInputMode</code>,
		<code>conversationProcessor</code>, <code>speechOnly</code>, <code>avatarId</code>,
		<code>locationId</code>, <code>embedBaseUrl</code>, or <code>debug</code>. You do not need a
		<code>{`{#key ...}`}</code> block.
	</p>
	<p>
		<strong>Presentation</strong> props (<code>fit</code>, <code>startButton</code>,
		<code>closeButton</code>, <code>returnUrl</code>, <code>ui</code>) update the live player
		without reminting. Callback-only changes do not restart the session.
	</p>

	<h2>Server-session embed</h2>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />

	<h2>Container sizing</h2>
	<p>
		The component fills its parent container. Set explicit dimensions on the parent for embedded
		layouts, or use full viewport for immersive experiences.
	</p>
	<CodeBlock
		code={`<div style="width: 400px; height: 600px;">
  <Experience experienceId="${snippets.experienceId}" />
</div>`}
		lang="svelte"
	/>
	<p>
		For a face-sized inset (for example bottom-right PIP), size the host div and set
		<code>fit="face"</code> so the runtime zooms onto the mesh face oval instead of fitting the full
		body:
	</p>
	<CodeBlock
		code={`<div class="avatar-inset">
  <Experience experienceId="${snippets.experienceId}" fit="face" />
</div>

<style>
  .avatar-inset {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 280px;
    height: 280px;
  }
</style>`}
		lang="svelte"
	/>

	<h2>SSR safety</h2>
	<p>
		<strong>Do not</strong> put opaque <code>launch</code> through server load functions into page
		data — it would be embedded in HTML. Prefer <code>experienceId</code> for browser embeds or a
		same-origin <code>sessionEndpoint</code>.
	</p>

	<h2>Close behavior</h2>
	<p>
		Without <code>onClose</code>, the component follows the <code>returnUrl</code> prop (player /
		attach chrome). Supplying <code>onClose</code> disables automatic navigation so your app can
		handle the event.
	</p>

	<h2>Deprecated alias</h2>
	<p>
		<code>LiformaExperience</code> remains available from <code>@liforma/client/svelte</code> during
		the temporary deprecation window. New code should use <code>Experience</code>.
	</p>

	<h2>Using the imperative API too</h2>
	<p>
		If a file genuinely needs both APIs, import the framework-neutral class with an alias. Most
		Svelte integrations should let the component own the lifecycle.
	</p>
	<CodeBlock
		code={`import { Experience } from '@liforma/client/svelte';
import { Experience as ExperienceApi } from '@liforma/client';`}
		lang="typescript"
	/>
</DocPage>
