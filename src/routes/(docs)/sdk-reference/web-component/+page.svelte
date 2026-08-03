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
		{ title: 'Embed an Experience', href: '/guides/embed' }
	]}
>
	<h2>Overview</h2>
	<p>
		The <code>&lt;liforma-experience&gt;</code> web component works in React, Vue, Angular, plain
		HTML, and no-code tools that support custom elements. It is the copy-paste embed path when you
		are not using the Svelte <code>&lt;Experience&gt;</code> component from
		<code>@liforma/client/svelte</code>.
	</p>

	<h2>Why <code>liforma-experience</code>?</h2>
	<p>
		Web components are registered as global HTML tags. The Custom Elements specification requires
		tag names to contain a <strong>hyphen</strong>, so plain <code>&lt;experience&gt;</code> is not
		valid. Tag names are also lowercase in HTML — <code>Experience</code> is the Svelte component and
		JavaScript class name, not an HTML tag.
	</p>
	<p>
		<code>liforma-experience</code> follows the usual vendor-prefix pattern (similar to
		<code>elevenlabs-convai</code> or <code>stripe-buy-button</code>): short, hyphenated, and
		unlikely to clash with other libraries or your app’s own elements. Svelte integrations should use
		<a href="/avatar-experiences/svelte">Experience (Svelte)</a> instead of this tag.
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
				<td>Public experience ID</td>
			</tr>
			<tr>
				<td><code>session-endpoint</code></td>
				<td>Same-origin route for authenticated minting</td>
			</tr>
		</tbody>
	</table>

	<h2>React example</h2>
	<CodeBlock
		code={`function Avatar() {
  return (
    <liforma-experience
      experience-id="${snippets.experienceId}"
      style={{ width: '400px', height: '600px', display: 'block' }}
    />
  );
}`}
		lang="jsx"
	/>

	<h2>ElevenLabs compat element</h2>
	<p>For migrations, a compat element is also available:</p>
	<CodeBlock code={compatElementExample} lang="html" />
	<p>See <a href="/guides/migrate-elevenlabs">Migrate from ElevenLabs</a>.</p>
</DocPage>
