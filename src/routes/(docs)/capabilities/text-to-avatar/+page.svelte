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
	<CodeBlock
		code={`import { Liforma } from '@liforma/client';

const result = await Liforma.textToAvatar({
  avatarId: 'ava_c4e71fe5',
  text: 'Hello! Welcome to the lesson.',
  voiceId: 'en-GB-SoniaNeural'
});

// result.audio — speech audio
// result.visemes — lip-sync timing for your own renderer
// result.stream — optional streaming chunks`}
		lang="javascript"
	/>

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
