<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Build a Dynamic Experience Gallery"
	description="Let creators manage experiences in Studio while your app updates automatically."
	next={[
		{ title: 'Experience Catalog API', href: '/api-reference/experience-catalog' },
		{ title: 'Server session', href: '/guides/server-session' },
		{ title: 'Embed an Experience', href: '/guides/embed' }
	]}
>
	<h2>Goal</h2>
	<p>
		Configure your project once, fetch published experiences from Liforma, render cards or lesson
		links from creator-managed slugs, and start sessions with the returned
		<code>experienceId</code>.
	</p>

	<h2>1. Fetch the catalog on the server</h2>
	<CodeBlock code={snippets.projectCatalogServer} lang="typescript" />

	<h2>2. Render links by slug</h2>
	<CodeBlock code={snippets.projectCatalogPage} lang="svelte" />

	<h2>3. Resolve a slug route</h2>
	<CodeBlock code={snippets.projectCatalogDetailServer} lang="typescript" />

	<h2>4. Embed with sessionEndpoint</h2>
	<CodeBlock code={snippets.authenticatedSvelte} lang="svelte" />

	<h2>What creators control in Studio</h2>
	<ul>
		<li>Experience title and public URL slug</li>
		<li>Publish / unpublish</li>
		<li>Gallery thumbnail and card imagery</li>
		<li>Sort order within the project</li>
	</ul>

	<p>
		Your developer code stays generic. When creators add or reorder experiences, your gallery updates
		on the next server fetch.
	</p>
</DocPage>
