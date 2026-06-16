<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Speech-to-Speech"
	description="Voice conversation without avatar animation."
	next={[
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' },
		{ title: 'Text-to-Speech', href: '/capabilities/text-to-speech' }
	]}
>
	<Callout variant="beta" title="Coming soon">
		<p>
			Standalone Speech-to-Speech API is on the roadmap. Use
			<a href="/avatar-experiences/overview">Avatar Experiences</a> with rendering disabled for
			voice-only today.
		</p>
	</Callout>

	<h2>What is it?</h2>
	<p>
		The user speaks. The AI listens, thinks, and responds with speech. No animated avatar on screen.
	</p>

	<h2>When to use</h2>
	<ul>
		<li>Voice agents in mobile or audio-first apps</li>
		<li>Phone-style assistants</li>
		<li>Background voice companions</li>
		<li>When visual avatar is unnecessary or handled separately</li>
	</ul>

	<h2>Planned API shape</h2>
	<CodeBlock
		code={`import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: 'exp_…',
  render: false  // voice-only mode
});

experience.on('message', ({ role, text }) => {
  console.log(role, text);
});

await experience.attach({ container: null });`}
		lang="javascript"
	/>

	<h2>vs Avatar Experiences</h2>
	<p>
		Speech-to-Speech is a subset of what Avatar Experiences provide. If you later want animation,
		state, or tools — upgrade to the full experience without changing your integration pattern.
	</p>
</DocPage>
