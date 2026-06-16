<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Events"
	description="Listen to conversation, avatar, and world events from an Experience."
	next={[
		{ title: 'Listen to Events', href: '/guides/events' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<Callout variant="beta" title="Preview">
		<p>The unified event API is defined and documented. Full event emission is rolling out in the SDK.</p>
	</Callout>

	<h2>Overview</h2>
	<p>
		Register handlers on an <code>Experience</code> instance to observe conversation, avatar, and
		world activity.
	</p>

	<h2>Conversation</h2>
	<CodeBlock
		code={`experience.on('message', ({ role, text, final }) => {
  console.log(role, text, final);
});

experience.on('modeChange', ({ mode }) => {
  // 'listening' | 'speaking'
});

experience.on('audio', (event) => {
  // optional low-level audio hooks
});`}
		lang="javascript"
	/>

	<h2>Avatar</h2>
	<CodeBlock
		code={`experience.on('viseme', (event) => { /* lip-sync timing */ });
experience.on('expression', (event) => { /* facial expression */ });
experience.on('gesture', (event) => { /* body gesture */ });`}
		lang="javascript"
	/>

	<h2>World</h2>
	<CodeBlock
		code={`experience.on('stateUpdate', (patch) => { /* structured state change */ });
experience.on('locationChange', ({ locationId }) => { });
experience.on('characterEnter', ({ characterId }) => { });
experience.on('characterExit', ({ characterId }) => { });
experience.on('close', ({ reason, returnUrl }) => { });`}
		lang="javascript"
	/>

	<h2>Event reference</h2>
	<table>
		<thead>
			<tr>
				<th>Event</th>
				<th>Payload</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>message</code></td>
				<td><code>{`{ role, text, final }`}</code></td>
				<td>User or assistant message. <code>final</code> indicates end of utterance.</td>
			</tr>
			<tr>
				<td><code>modeChange</code></td>
				<td><code>{`{ mode }`}</code></td>
				<td><code>listening</code> or <code>speaking</code></td>
			</tr>
			<tr>
				<td><code>viseme</code></td>
				<td>Viseme timing data</td>
				<td>Lip-sync keyframe for avatar animation</td>
			</tr>
			<tr>
				<td><code>stateUpdate</code></td>
				<td>State patch</td>
				<td>Structured world state change from server</td>
			</tr>
			<tr>
				<td><code>close</code></td>
				<td><code>{`{ reason, returnUrl? }`}</code></td>
				<td>Session ended by user or programmatically</td>
			</tr>
		</tbody>
	</table>
</DocPage>
