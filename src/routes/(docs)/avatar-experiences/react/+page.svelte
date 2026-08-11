<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience (React)"
	description="React component for embedding Avatar Experiences with ref-based control."
	next={[
		{ title: 'Experience (HTML)', href: '/avatar-experiences/html' },
		{ title: 'Experience (Next.js)', href: '/avatar-experiences/nextjs' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>Experience</code> from <code>@liforma/client/react</code> mirrors the Svelte component: session
		creation, player attachment, event delivery, restart on launch-option changes, and cleanup on
		unmount. The entry is marked <code>'use client'</code> for Next.js App Router.
	</p>

	<h2>Basic usage</h2>
	<p>
		Import the component in a client boundary and pass <code>experienceId</code> (or
		<code>sessionEndpoint</code> / advanced <code>launch</code> for server-session flows).
	</p>
	<CodeBlock code={snippets.reactHelloWorld} lang="tsx" filename="Demo.tsx" />

	<h2>Host-controlled speech and listening</h2>
	<p>
		Use a <code>ref</code> typed as <code>ExperienceHandle</code> to call
		<code>speak()</code>, <code>startListening()</code>, and related methods from your own UI. Wait
		for <code>onStarted</code> (or <code>await ref.current.started()</code>) before speech methods —
		the player start button unlocks audio.
	</p>
	<CodeBlock code={snippets.reactAdvancedControl} lang="tsx" filename="Lesson.tsx" />

	<h2><code>ExperienceProps</code></h2>
	<p>
		Props match <a href="/avatar-experiences/svelte#experienceprops">Experience (Svelte)</a>
		<code>ExperienceProps</code> — same names and semantics, including
		<code>speechOnly</code> and <code>fit</code>.
	</p>

	<h2>Callback props</h2>
	<p>
		Pass React event props such as <code>onReady</code>, <code>onStarted</code>, and
		<code>onUserTranscript</code>. Updating a callback does <strong>not</strong> restart the session;
		the component always invokes the latest handler.
	</p>
	<p>
		<code>conversationProcessor</code> is an exception: changing its function reference restarts the
		session. Wrap it in <code>useCallback</code> when the implementation is stable.
	</p>

	<h2>Strict Mode</h2>
	<p>
		Under React Strict Mode the component mounts twice in development. Session generations are gated
		so stale async work from the first mount does not surface errors after unmount.
	</p>

	<h2>Example</h2>
	<p>
		See the
		<a href="https://github.com/LiformaLtd/examples.liforma.ai/tree/main/examples/guided-practice/react-vite">guided-practice React (Vite) example</a>
		for a full presenter + manual listening lesson loop.
	</p>
</DocPage>
