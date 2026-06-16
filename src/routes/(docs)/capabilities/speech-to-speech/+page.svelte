<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Speech-to-Speech"
	description="Voice conversation without visual rendering."
	next={[
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>What is it?</h2>
	<p>
		A real-time voice conversation with an AI character — listen, think, speak — without on-screen
		avatar rendering. Useful for voice-only products and telephony-style flows.
	</p>

	<h2>When to use it</h2>
	<ul>
		<li>Voice assistants and phone integrations</li>
		<li>Products where audio is the entire interface</li>
		<li>Low-bandwidth or audio-only environments</li>
		<li>When you do not need lip-sync or facial animation</li>
	</ul>

	<h2>API</h2>
	<CodeBlock
		code={`import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: 'exp_…',
  render: false
});

experience.on('message', ({ role, text }) => {
  console.log(role, text);
});

await experience.attach({ container: null });`}
		lang="javascript"
	/>

	<h2>When to use Avatar Experiences instead</h2>
	<p>
		Use a full <a href="/avatar-experiences/overview">Avatar Experience</a> when the character should
		appear on screen with real-time animation. Speech-to-Speech is the voice layer without visuals;
		Avatar Experiences combine voice, intelligence, and animation in one integration.
	</p>
</DocPage>
