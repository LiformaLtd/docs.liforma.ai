<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
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
	<Callout variant="beta" title="Coming soon">
		<p>
			Text-to-Avatar as a standalone API is on the roadmap. Today, animate avatars through a full
			<a href="/avatar-experiences/overview">Avatar Experience</a> session.
		</p>
	</Callout>

	<h2>What is it?</h2>
	<p>
		Send text. Liforma returns a speaking, animated avatar — lip-synced audio and facial animation
		without a full conversational loop.
	</p>

	<h2>When to use</h2>
	<ul>
		<li>Scripted avatar videos or announcements</li>
		<li>Onboarding walkthroughs with a character guide</li>
		<li>Pre-recorded-style content with dynamic text</li>
		<li>When you don't need user input or AI reasoning</li>
	</ul>

	<h2>When to use Avatar Experiences instead</h2>
	<p>
		If the character needs to listen, think, respond dynamically, or update state — use an
		<a href="/avatar-experiences/overview">Avatar Experience</a>. Text-to-Avatar is a focused
		capability; Avatar Experiences are the full platform.
	</p>

	<h2>Planned API shape</h2>
	<CodeBlock
		code={`import { Liforma } from '@liforma/client';

const result = await Liforma.textToAvatar({
  avatarId: 'ava_c4e71fe5',
  text: 'Hello! Welcome to the lesson.',
  voiceId: 'en-GB-SoniaNeural'
});

// result.audio — speech audio
// result.visemes — lip-sync timing
// result.stream — optional streaming chunks`}
		lang="javascript"
	/>

	<p>API design is subject to change. Join early access for updates.</p>
</DocPage>
