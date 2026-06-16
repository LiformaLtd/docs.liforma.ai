<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience API"
	description="Programmatic control over Avatar Experience sessions."
	next={[
		{ title: 'Events', href: '/avatar-experiences/events' },
		{ title: 'LiformaExperience', href: '/avatar-experiences/liforma-experience' },
		{ title: 'JavaScript SDK', href: '/sdk-reference/javascript' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>Experience</code> is the primary JavaScript API. Use it when you need programmatic control
		beyond the component — custom containers, event handling, or voice-only mode.
	</p>

	<h2>Start a session</h2>
	<CodeBlock code={snippets.jsStartSession} lang="javascript" filename="main.js" />

	<h2>Start modes</h2>
	<table>
		<thead>
			<tr>
				<th>Input</th>
				<th>Use case</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>{`{ experienceId }`}</code></td>
				<td>Public embed — SDK calls <code>/v1/public-sessions</code></td>
			</tr>
			<tr>
				<td><code>{`{ manifest }`}</code></td>
				<td>Server-minted manifest passed to the client</td>
			</tr>
			<tr>
				<td><code>{`{ experienceId, sessionEndpoint }`}</code></td>
				<td>Authenticated — SDK POSTs to your same-origin route</td>
			</tr>
		</tbody>
	</table>

	<h2>Lifecycle</h2>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: '${snippets.experienceId}'
});

await experience.attach({ container: document.querySelector('#avatar') });

// Optional lifecycle
experience.pause();
experience.resume();
await experience.end();`}
		lang="javascript"
	/>

	<h2>Rendering is separate</h2>
	<p>
		Session creation and rendering are independent. You can attach to a container for avatar + voice,
		or use the session without rendering for voice-only integrations.
	</p>
</DocPage>
