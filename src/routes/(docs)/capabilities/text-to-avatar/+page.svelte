<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Text-to-Avatar"
	description="Animate an avatar speaking your text."
	next={[
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' },
		{ title: 'Text-to-Speech', href: '/capabilities/text-to-speech' }
	]}
>
	<h2>What is it?</h2>
	<p>
		Send text. Liforma returns a speaking, animated avatar — lip-synced audio and facial animation
		for known script, without a full conversational loop.
	</p>

	<h2>When to use it</h2>
	<ul>
		<li>Scripted avatar announcements or lesson intros</li>
		<li>Onboarding walkthroughs with a character guide</li>
		<li>Dynamic text you already have — no user speech input required</li>
		<li>When you do not need the character to listen, reason, or update state</li>
	</ul>

	<h2>API</h2>
	<p>
		For animated speech inside a live session, use <code>Experience.speak()</code> in presenter mode
		(or managed conversation). The standalone <code>Liforma.textToAvatar()</code> helper described
		below is aspirational — shipped today via the Experience speak path.
	</p>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: 'exp_…',
  mode: 'presenter'
});

experience.on('started', async () => {
  await experience.speak({ text: 'Hello! Welcome to the lesson.' });
});

await experience.attach({ container: '#avatar' });`}
		lang="javascript"
	/>
	<p class="muted">
		See <a href="/avatar-experiences/experience-api">Experience API</a> for
		<code>startButton</code>, manual listening, and speech lifecycle events.
	</p>

	<h2>Standalone animation (planned)</h2>
	<CodeBlock
		code={`import { Liforma } from '@liforma/client';

const result = await Liforma.textToAvatar({
  avatarId: 'ava_c4e71fe5',
  text: 'Hello! Welcome to the lesson.',
  voiceId: 'en-GB-SoniaNeural'
});

// result.audio — speech audio
// result.stream — optional streaming chunks`}
		lang="javascript"
	/>

	<p class="muted">
		Animation is rendered by the hosted player — this standalone helper returns audio (and optional
		streaming chunks), not viseme or blendshape data for custom renderers.
	</p>

	<h2>When to use Avatar Experiences instead</h2>
	<p>
		Use an <a href="/avatar-experiences/overview">Avatar Experience</a> when the character should
		<strong>listen</strong>, <strong>think</strong>, respond dynamically, use tools, or maintain
		session state. Text-to-Avatar is a focused building block; Avatar Experiences are the full
		intelligent character platform.
	</p>
	<p>
		Today, animated conversation is delivered through Avatar Experiences. Text-to-Avatar is for
		developers who only need scripted animation output.
	</p>
</DocPage>
