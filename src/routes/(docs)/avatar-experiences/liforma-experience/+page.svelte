<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="LiformaExperience"
	description="The canonical Svelte component for embedding Avatar Experiences."
	next={[
		{ title: 'Web Component', href: '/sdk-reference/web-component' },
		{ title: 'Public Experiences', href: '/avatar-experiences/public' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>&lt;LiformaExperience&gt;</code> is the hello-world integration for Svelte apps. It calls
		<code>Experience.startSession</code> and <code>attach</code> internally.
	</p>

	<h2>Basic usage</h2>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h2>Props</h2>
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>experienceId</code></td>
				<td><code>string</code></td>
				<td>Public experience ID. SDK mints session via <code>/v1/public-sessions</code>.</td>
			</tr>
			<tr>
				<td><code>manifest</code></td>
				<td><code>SessionManifest</code></td>
				<td>Pre-minted manifest from your backend. See SSR warning below.</td>
			</tr>
			<tr>
				<td><code>sessionEndpoint</code></td>
				<td><code>string</code></td>
				<td>Same-origin route that mints a manifest. For authenticated embeds.</td>
			</tr>
			<tr>
				<td><code>acceptCredentialExposure</code></td>
				<td><code>boolean</code></td>
				<td>Required when passing a manifest that includes <code>sessionToken</code>.</td>
			</tr>
		</tbody>
	</table>

	<h2>Authenticated embed</h2>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />

	<h2>Container sizing</h2>
	<p>
		The component fills its parent container. Set explicit dimensions on the parent for embedded
		layouts, or use full viewport for immersive experiences.
	</p>
	<CodeBlock
		code={`<div style="width: 400px; height: 600px;">
  <LiformaExperience experienceId="${snippets.experienceId}" />
</div>`}
		lang="svelte"
	/>

	<h2>SSR safety</h2>
	<p>
		<strong>Do not</strong> pass credential-bearing manifests through server load functions into page
		data. The <code>sessionToken</code> would be embedded in HTML. Prefer <code>experienceId</code>
		for public embeds or a same-origin <code>sessionEndpoint</code>.
	</p>
</DocPage>
