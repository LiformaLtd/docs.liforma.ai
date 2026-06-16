<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Add Tools"
	description="Give your avatar characters controlled external capabilities."
	next={[
		{ title: 'Session Manifests', href: '/avatar-experiences/session-manifests' },
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
		<li>Tools are defined on the experience configuration</li>
		<li>They appear in the Session Manifest <code>tools</code> array</li>
		<li>The agent decides when to call a tool during conversation</li>
		<li>Results update <code>state</code> and may trigger <code>stateUpdate</code> events</li>
	</ol>

	<h2>Example</h2>
	<CodeBlock code={snippets.toolsManifestSnippet} lang="json" />

	<p>Tool schemas follow a structured format editable by creators and understandable by LLMs.</p>
</DocPage>
