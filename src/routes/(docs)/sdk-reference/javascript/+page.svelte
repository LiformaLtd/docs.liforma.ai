<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="JavaScript SDK"
	description="@liforma/client — the integrator-facing JavaScript API."
	next={[
		{ title: 'Svelte Component', href: '/sdk-reference/svelte' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<Callout variant="beta" title="Preview">
		<p>
			Package publishing to <code>cdn.liforma.ai</code> is rolling out. Install via npm or load from
			CDN when available.
		</p>
	</Callout>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<p>Or load from CDN:</p>
	<CodeBlock code={snippets.cdnScriptTag} lang="html" />

	<h2>Primary API</h2>
	<CodeBlock code={snippets.jsStartSession} lang="javascript" />

	<h2>Exports</h2>
	<table>
		<thead>
			<tr>
				<th>Export</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>Experience</code></td>
				<td>Session lifecycle and events</td>
			</tr>
			<tr>
				<td><code>LiformaExperience</code></td>
				<td>Svelte component (from <code>@liforma/client/svelte</code>)</td>
			</tr>
		</tbody>
	</table>

	<h2>Lifecycle</h2>
	<CodeBlock
		code={`await experience.attach({ container });
experience.pause();
experience.resume();
await experience.end();`}
		lang="javascript"
	/>

	<h2>Events</h2>
	<p>See <a href="/avatar-experiences/events">Events</a> for the full list.</p>
</DocPage>
