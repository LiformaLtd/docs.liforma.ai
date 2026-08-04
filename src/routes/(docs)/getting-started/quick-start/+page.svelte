<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
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
		{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' }
	]}
>
	<Callout title="For coding agents">
		<p>
			Read <a href="/llms.txt">llms.txt</a> before generating integration code. Full page index:
			<a href="/llms-full.txt">llms-full.txt</a>. Session mint schema:
			<a href="/openapi/sessions.json">openapi/sessions.json</a>.
		</p>
	</Callout>

	<h2>What you'll build</h2>
	<p>
		A live avatar that listens, thinks, speaks, and animates inside your app — with a single
		component. This hello world uses a
		<a href="/avatar-experiences/browser-embeds">browser embed</a> (origin allowlist); no backend
		required. If you have a server, prefer
		<a href="/avatar-experiences/server-sessions">API-key minting</a>.
	</p>

	<h2>1. Install</h2>
	<p>
		Install the SDK once, then import the entry for your framework. The CDN script works in any
		framework.
	</p>

	<h3>npm</h3>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h3>Any framework (CDN)</h3>
	<CodeBlock code={snippets.cdnScriptTag} lang="html" />

	<h2>2. Embed</h2>
	<p>This is the entire client-side integration (browser mint via allowed origins):</p>

	<h3>Svelte</h3>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h3>React</h3>
	<p>
		Use <code>@liforma/client/react</code>. In Next.js App Router, put this in a client component
		(<code>'use client'</code>).
	</p>
	<CodeBlock code={snippets.reactHelloWorld} lang="tsx" filename="Demo.tsx" />

	<h3>Web component</h3>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" filename="index.html" />

	<p>
		Full walkthroughs:
		<a href="/avatar-experiences/svelte">Svelte</a>,
		<a href="/avatar-experiences/react">React</a>,
		<a href="/avatar-experiences/nextjs">Next.js</a>.
	</p>

	<h2>3. Run</h2>
	<p>
		Open your app. The SDK mints a session, fetches a Session Manifest, and starts the runtime.
		Allowlist your production origin in the
		<a href={externalLinks.app} target="_blank" rel="noopener noreferrer">developer portal</a>
		(<code>app.liforma.ai</code> → your project → Origins) so browser embeds work on your domain.
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
		code={`git clone https://github.com/LiformaLtd/examples.liforma.ai.git
cd examples.liforma.ai
npm install
./start`}
		lang="bash"
	/>
	<p>
		That opens the gallery on <code>http://localhost:4000</code> and runnable demos on
		<code>4001</code>–<code>4004</code> (basic embed, Spanish Tutor, guided practice, speak
		playground). Framework modes share those ports:
	</p>
	<ul>
		<li><code>./start</code> or <code>./start vanilla</code> — HTML examples</li>
		<li><code>./start sveltekit</code> — SvelteKit variants</li>
		<li><code>./start nextjs</code> — guided-practice Next.js on <code>:4003</code></li>
		<li><code>./start react-vite</code> — guided-practice React (Vite) on <code>:4003</code></li>
	</ul>
	<p>Examples call production Liforma APIs — no local API or player required.</p>

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
		<li>
			<strong>Creates the session</strong> — browser mint via
			<code>POST /v1/public-sessions</code> with your <code>experienceId</code> (endpoint name is
			historical)
		</li>
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
	<CodeBlock code={snippets.jsListenToEvents} lang="javascript" />
	<p>See <a href="/guides/events">Listen to Events</a> for the full event model.</p>

	<h2>5. Server sessions (preferred when you have a backend)</h2>
	<p>
		Browser embeds are the simplest hello world. When you have a server, mint with an API key so the
		key never reaches the browser — and so you can pass per-user context.
	</p>
	<h3>Svelte</h3>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />
	<h3>React / Next.js</h3>
	<CodeBlock code={snippets.authenticatedReact} lang="tsx" filename="PrivateLesson.tsx" />
	<p>
		In Next.js, pair that with
		<code>createLiformaSessionRouteHandler()</code> from <code>@liforma/client/next</code> on
		<code>app/api/liforma-session/route.ts</code>. See
		<a href="/avatar-experiences/nextjs">Experience (Next.js)</a>,
		<a href="/avatar-experiences/server-sessions">Server sessions</a>, and
		<a href="/guides/server-session">the server-session guide</a>.
	</p>
</DocPage>
