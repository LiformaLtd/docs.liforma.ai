<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Add Tools"
	description="Give your avatar characters controlled external capabilities."
	next={[
		{ title: 'Session Launch', href: '/avatar-experiences/session-manifests' },
		{ title: 'Avatar Experiences', href: '/avatar-experiences/overview' }
	]}
>
	<h2>What are tools?</h2>
	<p>
		Tools are controlled external capabilities an agent can invoke during a session — query a
		database, check inventory, book an appointment, advance a quest.
	</p>

	<h2>How they work</h2>
	<ol>
		<li>Tools are defined on the experience configuration in Studio</li>
		<li>They are wired inside opaque <code>launch</code> (private runtime bootstrap)</li>
		<li>The agent decides when to call a tool during conversation</li>
		<li>Results may update structured experience state in the runtime</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock code={snippets.toolsManifestSnippet} lang="json" />

	<p>
		Tool schemas follow a structured format editable by creators and understandable by LLMs. Host
		apps do not register tools through the browser SDK today — configure them on the experience, then
		observe conversation via <code>message</code> / <code>conversationUpdate</code> events.
	</p>
</DocPage>
