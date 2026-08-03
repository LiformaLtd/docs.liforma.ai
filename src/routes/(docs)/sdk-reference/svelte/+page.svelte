<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Svelte Component"
	description="Experience — embed avatars in Svelte and SvelteKit apps."
	next={[
		{ title: 'Web Component', href: '/sdk-reference/web-component' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' }
	]}
>
	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h2>Usage</h2>
	<p>
		Pass <code>experienceId</code> for a self-contained embed. The component handles session mint,
		attachment, and cleanup.
	</p>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h2>Host-controlled speech and listening</h2>
	<p>
		When your app must call <code>speak()</code>, <code>startListening()</code>, or
		<code>stopListening()</code> from its own buttons or lesson logic, bind the component with
		<code>bind:this</code> and type the variable as <code>ExperienceHandle | undefined</code>.
	</p>
	<p>
		The example uses <code>onStarted</code> to speak after the player unlocks audio, then wires
		host Start/Stop buttons to manual listening. See
		<a href="/avatar-experiences/svelte">Experience (Svelte)</a> for the full walkthrough.
	</p>
	<CodeBlock code={snippets.svelteAdvancedControl} lang="svelte" filename="Lesson.svelte" />
	<p>
		<code>ready()</code> means the manifest is resolved and the player is attached.
		<code>started()</code> means the player-owned user gesture has unlocked audio. Speech and
		listening methods do not silently wait for that gesture: they preserve the root API's state
		validation and reject if called before <code>started</code>. Use <code>onStarted</code> or await
		<code>experience.started()</code> before calling them.
	</p>

	<h2>Callbacks</h2>
	<p>
		Use Svelte 5 callback props for session events. Core callbacks include <code>onReady</code>,
		<code>onStarted</code>, <code>onUserTranscript</code>, <code>onStateUpdate</code>,
		<code>onClose</code>, and <code>onError</code>.
	</p>
	<CodeBlock code={snippets.svelteCallbacks} lang="svelte" filename="App.svelte" />

	<h2>SvelteKit</h2>
	<p>
		For public embeds, pass <code>experienceId</code> only — let the client mint the session. Do not
		load credential-bearing manifests in <code>+page.server.ts</code>.
	</p>
	<CodeBlock
		code={`<!-- +page.svelte -->
<Experience experienceId="${snippets.experienceId}" />`}
		lang="svelte"
	/>

	<h2>Props</h2>
	<p>
		The component accepts the relevant session launch options and owns restart and cleanup. Changes
		to launch-defining props restart the session; callback-only changes do not. Structurally
		equivalent <code>startButton</code> objects do not restart it.
	</p>
	<p>
		Full <code>ExperienceProps</code>, <code>ExperienceHandle</code>, callback, restart, and close
		behavior reference: <a href="/avatar-experiences/svelte">Experience (Svelte)</a>.
	</p>

	<h2>Close and compatibility</h2>
	<p>
		Default close handling navigates to the configured return URL. Supplying <code>onClose</code>
		overrides automatic navigation. The deprecated <code>LiformaExperience</code> export remains as a
		temporary alias; use <code>Experience</code> in new code.
	</p>
</DocPage>
