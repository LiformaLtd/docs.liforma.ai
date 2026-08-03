<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';

	const compatElementExample = '<liforma-convai agent-id="YOUR_AGENT_ID"></liforma-convai>';
</script>

<DocPage
	title="Web Component"
	description="Embed Liforma in any framework with a single HTML tag."
	next={[
		{ title: 'Quick Start', href: '/getting-started/quick-start' },
		{ title: 'Experience (React)', href: '/avatar-experiences/react' },
		{ title: 'Embed an Experience', href: '/guides/embed' }
	]}
>
	<h2>Overview</h2>
	<p>
		The <code>&lt;liforma-experience&gt;</code> web component works in Vue, Angular, plain HTML, and
		no-code tools that support custom elements. Prefer
		<a href="/avatar-experiences/react">@liforma/client/react</a> or
		<a href="/avatar-experiences/svelte">@liforma/client/svelte</a> when you are in those frameworks —
		they expose typed props and imperative handles.
	</p>

	<h2>Why <code>liforma-experience</code>?</h2>
	<p>
		Web components are registered as global HTML tags. The Custom Elements specification requires
		tag names to contain a <strong>hyphen</strong>, so plain <code>&lt;experience&gt;</code> is not
		valid. Tag names are also lowercase in HTML — <code>Experience</code> is the component and
		JavaScript class name, not an HTML tag.
	</p>

	<h2>Basic usage</h2>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" filename="index.html" />

	<h2>Attributes</h2>
	<table>
		<thead>
			<tr>
				<th>Attribute</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>experience-id</code></td>
				<td>Experience ID (browser mint via origins)</td>
			</tr>
			<tr>
				<td><code>session-endpoint</code></td>
				<td>Same-origin route for server-session minting</td>
			</tr>
			<tr>
				<td><code>language</code></td>
				<td>Optional <code>en</code> or <code>es</code> override</td>
			</tr>
			<tr>
				<td><code>speech-only</code></td>
				<td>
					Set to <code>"true"</code> for voice-only sessions (no avatar renderer / location scene)
				</td>
			</tr>
		</tbody>
	</table>

	<h2>HTML / Vue example</h2>
	<CodeBlock
		code={`<!-- After loading https://cdn.liforma.ai/sdk/v2/client.js -->
<liforma-experience
  experience-id="${snippets.experienceId}"
  style="width: 400px; height: 600px; display: block;"
></liforma-experience>`}
		lang="html"
	/>

	<p>
		React apps should use <a href="/avatar-experiences/react">Experience (React)</a> instead of the
		custom element when possible.
	</p>

	<h2>ElevenLabs compat element</h2>
	<p>For migrations, a compat element is also available:</p>
	<CodeBlock code={compatElementExample} lang="html" />
	<p>See <a href="/guides/migrate-elevenlabs">Migrate from ElevenLabs</a>.</p>
</DocPage>
