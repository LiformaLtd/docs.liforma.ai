<script lang="ts">
	import DocPage from '$lib/components/DocPage.svelte';
	import { externalLinks } from '$lib/navigation';
</script>

<DocPage
	title="Introduction"
	description="Build Avatar Experiences — real-time AI characters for web apps."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Concepts', href: '/getting-started/concepts' }
	]}
>
	<h2>What is Liforma?</h2>
	<p>
		Liforma is a platform for building <strong>Avatar Experiences</strong> — real-time AI characters
		that can listen, think, speak, animate, and interact inside your app.
	</p>
	<p>
		A simple experience might be a single conversational tutor. A richer experience can include
		multiple characters, locations, world state, tools, and game-like interactions.
	</p>

	<h2>Who is this for?</h2>
	<p>
		Developers building education apps, training simulations, games, customer support, or any product
		where an embodied AI character makes the experience more engaging.
	</p>

	<h2>Design philosophy</h2>
	<p>Liforma is intentionally simple at the surface and powerful underneath.</p>
	<ul>
		<li><strong>Experience-first</strong> — you integrate experiences, not tokens or HTTP routes</li>
		<li><strong>Manifest-driven</strong> — a Session Manifest tells the SDK how to run each launch</li>
		<li><strong>Hidden complexity</strong> — transport, STT, TTS, and avatar rendering stay inside the SDK</li>
		<li><strong>Avatar-native</strong> — animation is first-class, not a bolt-on to voice</li>
	</ul>

	<h2>Capabilities</h2>
	<p>Although Avatar Experiences are the strategic product, Liforma also supports focused capabilities:</p>
	<ul>
		<li><a href="/capabilities/text-to-avatar">Text-to-Avatar</a> — animate an avatar speaking your text</li>
		<li><a href="/capabilities/text-to-speech">Text-to-Speech</a> — speech audio without an avatar</li>
		<li><a href="/capabilities/speech-to-speech">Speech-to-Speech</a> — voice conversation without animation</li>
		<li><a href="/avatar-experiences/overview">Avatar Experiences</a> — the full intelligent character platform</li>
	</ul>

	<h2>Pricing</h2>
	<p>
		Usage is metered per minute. See <a href={externalLinks.pricing}>pricing</a> for plans and rates.
	</p>

	<h2>Get started</h2>
	<p>
		Ready to embed your first avatar? Head to the <a href="/getting-started/quick-start">Quick Start</a>.
	</p>
</DocPage>
