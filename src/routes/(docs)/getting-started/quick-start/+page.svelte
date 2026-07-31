<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { externalLinks } from '$lib/navigation';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Quick Start"
	description="Add an intelligent animated avatar to your app in minutes."
	next={[
		{ title: 'Concepts', href: '/getting-started/concepts' },
		{ title: 'Listen to Events', href: '/guides/events' },
		{ title: 'Authenticated Experiences', href: '/avatar-experiences/authenticated' }
	]}
>
	<h2>What you'll build</h2>
	<p>
		A live avatar that listens, thinks, speaks, and animates inside your app — with a single
		component. No backend required for public experiences.
	</p>

	<h2>1. Install</h2>
	<p>Choose Svelte or the framework-agnostic web component.</p>

	<h3>Svelte</h3>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h3>Any framework (CDN)</h3>
	<CodeBlock code={snippets.cdnScriptTag} lang="html" />

	<h2>2. Embed</h2>
	<p>This is the entire integration for a public experience:</p>

	<h3>Svelte</h3>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h3>Web component</h3>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" filename="index.html" />

	<h2>3. Run</h2>
	<p>
		Open your app. The SDK mints a session, fetches a Session Manifest, and starts the runtime.
		Allowlist your production origin in the
		<a href={externalLinks.app} target="_blank" rel="noopener noreferrer">developer portal</a>
		(<code>app.liforma.ai</code> → your project → Origins) so public embeds work on your domain.
	</p>
	<p>
		Try a live demo:
		<a href={externalLinks.meet} target="_blank" rel="noopener noreferrer">www.liforma.ai/meet</a>
		or the
		<a href={externalLinks.player} target="_blank" rel="noopener noreferrer">hosted player</a>.
		See the
		<a href={externalLinks.examples} target="_blank" rel="noopener noreferrer">examples gallery</a>
		and
		<a href="https://spanish-tutor.examples.liforma.ai" target="_blank" rel="noopener noreferrer"
			>Spanish Tutor live demo</a>
		for full sample apps.
	</p>

	<h2>Run examples locally</h2>
	<p>
		Clone the
		<a href={externalLinks.examplesGithub} target="_blank" rel="noopener noreferrer"
			>examples.liforma.ai</a>
		repository to explore runnable integrations:
	</p>
	<CodeBlock
		code={`git clone https://github.com/charlesatliforma/examples.liforma.ai.git
cd examples.liforma.ai
npm install
./start`}
		lang="bash"
	/>
	<p>That opens the gallery on <code>http://localhost:4000</code> and runnable demos on
		<code>4001</code> (Spanish Tutor) and <code>4002</code> (guided practice). Use
		<code>./start sveltekit</code> for SvelteKit variants. Examples call production Liforma APIs — no
		local API or player required.</p>

	<h2>Developer portal (create your own experience)</h2>
	<p>
		To ship your own <code>exp_…</code> id instead of a demo experience:
	</p>
	<ol>
		<li>
			Sign in at <a href={externalLinks.app} target="_blank" rel="noopener noreferrer">app.liforma.ai</a>
		</li>
		<li>Create or open a project → Experience Studio → publish</li>
		<li>Add your site origin under <strong>Origins</strong></li>
		<li>Copy the experience id from the <strong>Integrate</strong> tab</li>
		<li>Paste the id into your embed (same code as step 2 above)</li>
	</ol>

	<h2>What Liforma handles for you</h2>
	<p>You do not wire transport, tokens, or media pipelines. Liforma automatically:</p>
	<ul>
		<li><strong>Creates the session</strong> — <code>POST /v1/public-sessions</code> with your <code>experienceId</code></li>
		<li><strong>Fetches the Session Manifest</strong> — runtime configuration for this launch</li>
		<li><strong>Selects transport</strong> — connection strategy is declared in the manifest, hidden from you</li>
		<li><strong>Requests microphone access</strong> — when speech input is enabled</li>
		<li><strong>Runs speech recognition</strong> — browser STT in the client</li>
		<li><strong>Runs the AI response loop</strong> — language model, tools, and state updates</li>
		<li><strong>Synthesises speech</strong> — natural TTS</li>
		<li><strong>Renders the avatar</strong> — lip-sync, expressions, and animation</li>
		<li><strong>Manages lifecycle</strong> — listening, speaking, close, and teardown</li>
	</ul>

	<h2>4. Listen to events</h2>
	<p>Subscribe to conversation and mode changes when you need UI hooks:</p>
	<CodeBlock
		code={`import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${snippets.experienceId}'
});

experience.on('message', ({ role, text, final }) => {
  console.log(role, text, final);
});

experience.on('modeChange', ({ mode }) => {
  console.log('mode:', mode); // listening | speaking | thinking
});

await experience.attach({ container: '#avatar' });`}
		lang="javascript"
	/>
	<p>See <a href="/guides/events">Listen to Events</a> for the full event model.</p>

	<h2>5. Authenticated sessions (when you need them)</h2>
	<p>
		Public embeds are the default hello world. For private experiences, billing control, or
		user-specific sessions, your backend mints a manifest with an API key:
	</p>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />
	<p>
		See <a href="/avatar-experiences/authenticated">Authenticated Experiences</a> and
		<a href="/guides/authenticated-experience">the authenticated guide</a>.
	</p>
</DocPage>
