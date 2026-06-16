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
		{ title: 'Public Experiences', href: '/avatar-experiences/public' },
		{ title: 'Embed an Experience', href: '/guides/embed' }
	]}
>
	<Callout variant="beta" title="Preview">
		<p>
			The CDN SDK (<code>@liforma/client</code>) is rolling out. Public embeds work today on
			allowlisted origins. See <a href="/sdk-reference/javascript">JavaScript SDK</a> for current
			availability.
		</p>
	</Callout>

	<h2>What you'll build</h2>
	<p>
		A live avatar that listens to the user, thinks, speaks, and animates — inside your app, with a
		single component. No backend required for public experiences.
	</p>

	<h2>1. Add the SDK</h2>
	<p>Choose Svelte or the framework-agnostic web component.</p>

	<h3>Svelte</h3>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h3>Web Component (any framework)</h3>
	<CodeBlock code={snippets.cdnScriptTag} lang="html" />

	<h2>2. Embed your experience</h2>
	<p>This is the entire integration for a public experience:</p>

	<h3>Svelte</h3>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h3>Web Component</h3>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" filename="index.html" />

	<h2>What happens under the hood</h2>
	<p>When your component mounts, Liforma automatically:</p>
	<ol>
		<li><strong>Mints a session</strong> — the SDK calls <code>POST /v1/public-sessions</code> with your <code>experienceId</code></li>
		<li><strong>Receives a Session Manifest</strong> — runtime configuration for this launch</li>
		<li><strong>Selects transport</strong> — HTTP, WebRTC, or LiveKit, hidden from you</li>
		<li><strong>Starts the runtime</strong> — microphone, speech recognition, turn loop</li>
		<li><strong>Renders the avatar</strong> — lip-sync, expressions, and animation</li>
	</ol>
	<p>You never handle tokens, STT, TTS, or avatar rendering directly.</p>

	<h2>3. Allowlist your origin</h2>
	<p>
		Public experiences require your site's origin to be allowlisted. Configure this in the
		<a href={externalLinks.www}>Liforma dashboard</a> (coming soon) or contact us for early access.
	</p>
	<p>Local development origins (<code>localhost</code>) are supported automatically in dev.</p>

	<h2>4. Try it live</h2>
	<p>
		See a working demo at <a href={externalLinks.meet} target="_blank" rel="noopener noreferrer">www.liforma.ai/meet</a>.
	</p>

	<h2>Next: authenticated experiences</h2>
	<p>
		Need private experiences or user-specific sessions? Your backend mints a manifest with an API key.
		See <a href="/avatar-experiences/authenticated">Authenticated Experiences</a>.
	</p>
</DocPage>
