<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Svelte Component"
	description="LiformaExperience — embed avatars in Svelte and SvelteKit apps."
	next={[
		{ title: 'Web Component', href: '/sdk-reference/web-component' },
		{ title: 'LiformaExperience', href: '/avatar-experiences/liforma-experience' }
	]}
>
	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<h2>Usage</h2>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" filename="App.svelte" />

	<h2>SvelteKit</h2>
	<p>
		For public embeds, pass <code>experienceId</code> only — let the client mint the session. Do not
		load credential-bearing manifests in <code>+page.server.ts</code>.
	</p>
	<CodeBlock
		code={`<!-- +page.svelte -->
<LiformaExperience experienceId="${snippets.experienceId}" />`}
		lang="svelte"
	/>

	<h2>Props</h2>
	<p>Full reference: <a href="/avatar-experiences/liforma-experience">LiformaExperience</a>.</p>
</DocPage>
