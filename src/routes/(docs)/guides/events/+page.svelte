<script lang="ts">
	import Callout from '$lib/components/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Listen to Events"
	description="React to conversation and avatar activity in your app."
	next={[
		{ title: 'Events reference', href: '/avatar-experiences/events' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<Callout variant="beta" title="Preview">
		<p>Full event emission is rolling out. The API shape below is stable.</p>
	</Callout>

	<h2>Basic pattern</h2>
	<CodeBlock
		code={`import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: 'exp_…'
});

experience.on('message', ({ role, text, final }) => {
  if (role === 'assistant' && final) {
    appendToChatLog(text);
  }
});

experience.on('modeChange', ({ mode }) => {
  setMicIndicator(mode === 'listening');
});

experience.on('close', ({ reason }) => {
  navigateAway(reason);
});

await experience.attach({ container: '#avatar' });`}
		lang="javascript"
	/>

	<h2>Common use cases</h2>
	<table>
		<thead>
			<tr>
				<th>Goal</th>
				<th>Event</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Show transcript</td>
				<td><code>message</code></td>
			</tr>
			<tr>
				<td>Mic/speaker indicator</td>
				<td><code>modeChange</code></td>
			</tr>
			<tr>
				<td>Sync UI with world state</td>
				<td><code>stateUpdate</code></td>
			</tr>
			<tr>
				<td>Handle user closing avatar</td>
				<td><code>close</code></td>
			</tr>
		</tbody>
	</table>
</DocPage>
