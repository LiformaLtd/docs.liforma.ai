<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { externalLinks } from '$lib/navigation';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Guided Scripted Practice"
	description="Presenter mode with predetermined avatar lines and host-controlled learner turns."
	next={[
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' },
		{ title: 'Events', href: '/avatar-experiences/events' },
		{ title: 'JavaScript SDK', href: '/sdk-reference/javascript' }
	]}
>
	<h2>When to use this pattern</h2>
	<p>
		Use guided scripted practice when avatar lines are predetermined (lessons, drills, rehearsal) and
		the host app owns turn flow and feedback. The avatar speaks scripted lines via
		<code>speak()</code>; learner speech is captured between explicit Start and Stop controls; scoring
		or hints stay in your UI — not in the avatar conversation output.
	</p>

	<h2>Session setup</h2>
	<p>
		Mint or start a <strong>presenter</strong> session with <strong>manual</strong> speech input. The
		player-owned start button unlocks audio and requests the microphone once.
	</p>
	<CodeBlock code={snippets.jsPresenterSession} lang="javascript" />

	<h2>Turn loop</h2>
	<p>Typical sequence for each scripted line:</p>
	<ol>
		<li>
			<code>await experience.speak(&#123; text: line &#125;)</code> — avatar delivers the tutor line
		</li>
		<li><code>await experience.startListening()</code> — learner taps Start</li>
		<li><code>await experience.stopListening()</code> — learner taps Stop; pauses do not finalize</li>
		<li>Run host-side feedback (pronunciation, rubric, etc.) on <code>utterance.text</code></li>
		<li>Wait for your Next control, then repeat with the next line</li>
	</ol>
	<CodeBlock code={snippets.guidedPracticeTurnLoop} lang="javascript" />

	<h2>History and events</h2>
	<p>
		Scripted assistant lines and finalized user utterances appear in
		<code>getConversation()</code>. Feedback objects are application state unless you store them
		separately. Listen for <code>characterSpeechStarted</code> / <code>characterSpeechEnded</code>,
		<code>userTranscript</code> (final only in this release), and
		<code>listeningState</code> — see <a href="/avatar-experiences/events">Events</a>.
	</p>

	<h2>Runnable examples</h2>
	<p>
		Clone and run the guided-practice examples from
		<a href={externalLinks.examplesGithub}>examples.liforma.ai</a>:
	</p>
	<ul>
		<li>
			<a href="https://examples.liforma.ai/examples/guided-practice/vanilla/">Vanilla JavaScript</a>
			— port <code>4002</code> with <code>./start guided-practice</code>
		</li>
		<li>
			<a href="https://examples.liforma.ai/examples/guided-practice/sveltekit/">SvelteKit</a> —
			<code>./start sveltekit</code> (Spanish Tutor on <code>4001</code>, guided practice on
			<code>4002</code>)
		</li>
	</ul>
	<p>
		Full API detail: <a href="/avatar-experiences/experience-api">Experience API</a> speech section.
	</p>
</DocPage>
