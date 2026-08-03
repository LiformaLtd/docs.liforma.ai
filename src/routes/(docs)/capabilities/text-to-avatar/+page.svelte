<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Text-to-Avatar"
	description="Scripted avatar speech with Experience presenter mode."
	next={[
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' },
		{ title: 'Text-to-Speech', href: '/capabilities/text-to-speech' }
	]}
>
	<h2>What is it?</h2>
	<p>
		<strong>Text-to-avatar</strong> is not a separate API in Liforma today. It is what you get when
		you run an <a href="/avatar-experiences/overview">Avatar Experience</a> in
		<strong>presenter</strong> mode and call <code>speak()</code> with your script. The hosted player
		handles TTS, lip-sync, and facial animation for each line.
	</p>
	<p>
		Use this when you already know what the character should say and your app (not the managed LLM)
		owns the script — announcements, lesson intros, onboarding steps, or any predetermined dialogue.
	</p>

	<h2>When to use presenter mode</h2>
	<ul>
		<li>Scripted lines from your app via <code>experience.speak(&#123; text &#125;)</code></li>
		<li>No automatic conversational loop — the character does not reason or reply on its own</li>
		<li>Optional microphone capture when you also need learner input (manual or listen-once flows)</li>
	</ul>
	<p>
		For open-ended chat where the character listens, thinks, and responds dynamically, use
		<strong>conversation</strong> mode instead. See
		<a href="/avatar-experiences/experience-api">Experience API</a>.
	</p>

	<h2>Svelte</h2>
	<p>
		Embed with <code>&lt;Experience&gt;</code>, set <code>mode="presenter"</code>, and call
		<code>speak()</code> from <code>onStarted</code> (after the player unlocks audio) or via
		<code>bind:this</code> on an <code>ExperienceHandle</code>.
	</p>
	<p>
		For speech-only flows with no microphone, set <code>speechInputMode="off"</code>. For scripted
		tutor lines plus explicit Start/Stop capture, use <code>speechInputMode="manual"</code> — see
		<a href="/guides/guided-scripted-practice">Guided Scripted Practice</a>.
	</p>
	<CodeBlock code={snippets.sveltePresenterSpeech} lang="svelte" filename="Intro.svelte" />

	<h2>JavaScript</h2>
	<p>Same pattern with the framework-neutral <code>Experience</code> class:</p>
	<CodeBlock code={snippets.jsPresenterSpeechOnly} lang="javascript" />

	<p class="muted">
		Call <code>speak()</code> only after <code>started</code> (or from an <code>on('started')</code>
		handler). Speech methods reject if audio is not yet unlocked. Full speak options and events:
		<a href="/avatar-experiences/experience-api">Experience API</a>.
	</p>

	<h2>Plain HTML</h2>
	<p>
		Load the CDN script and use <code>&lt;liforma-experience&gt;</code> for a basic embed. For
		scripted <code>speak()</code> calls from host JavaScript, use the class API after the element
		boots — see <a href="/sdk-reference/web-component">Web Component</a> and
		<a href="/sdk-reference/javascript">JavaScript SDK</a>.
	</p>

	<h2>When to use something else</h2>
	<ul>
		<li>
			<strong>Audio only, no character</strong> — standalone TTS is documented under
			<a href="/capabilities/text-to-speech">Text-to-Speech</a> (not yet a separate shipped helper;
			TTS runs inside experiences today).
		</li>
		<li>
			<strong>Interactive dialogue</strong> — use conversation mode on an Avatar Experience.
		</li>
		<li>
			<strong>Custom “brain” in the browser</strong> — presenter mode with
			<code>conversationProcessor</code>; see
			<a href="/guides/custom-conversation-processor">Custom Conversation Processor</a>.
		</li>
	</ul>
</DocPage>
