<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Listen to Events"
	description="React to conversation and avatar activity in your app."
	next={[
		{ title: 'Events reference', href: '/avatar-experiences/events' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Basic pattern</h2>
	<CodeBlock code={snippets.jsListenToEvents} lang="javascript" />

	<h2>Common use cases</h2>
	<table>
		<thead>
			<tr>
				<th>Goal</th>
				<th>API</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Show transcript / chat log</td>
				<td><code>message</code> (check <code>status === 'final'</code>)</td>
			</tr>
			<tr>
				<td>Mic / speaker indicator</td>
				<td><code>activityChange</code> (envelope <code>.data</code>: <code>'idle' | 'listening' | 'speaking' | 'thinking'</code>)</td>
			</tr>
			<tr>
				<td>Partial live captions</td>
				<td><code>userTranscript</code></td>
			</tr>
			<tr>
				<td>Sync UI with speech</td>
				<td><code>characterSpeechStarted</code> / <code>characterSpeechEnded</code></td>
			</tr>
			<tr>
				<td>Player embed lifecycle</td>
				<td><code>attach(&#123; onPlayerStatusChange &#125;)</code></td>
			</tr>
			<tr>
				<td>Handle user closing the player</td>
				<td><code>player.on('close')</code> or component <code>onClose</code></td>
			</tr>
		</tbody>
	</table>

	<p>
		Full payload shapes: <a href="/avatar-experiences/events">Events reference</a>.
	</p>
</DocPage>
