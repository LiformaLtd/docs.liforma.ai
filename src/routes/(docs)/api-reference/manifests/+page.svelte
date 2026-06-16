<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Manifests"
	description="Session Manifest schema reference."
	next={[
		{ title: 'Session Manifests', href: '/avatar-experiences/session-manifests' },
		{ title: 'Sessions', href: '/api-reference/sessions' }
	]}
>
	<h2>Schema version 1</h2>
	<p>
		Both <code>/v1/sessions</code> and <code>/v1/public-sessions</code> return this shape. Breaking
		changes increment <code>schemaVersion</code>.
	</p>

	<CodeBlock code={snippets.manifestExample} lang="json" />

	<h2>Top-level fields</h2>
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>schemaVersion</code></td>
				<td><code>number</code></td>
				<td>Always <code>1</code> today</td>
			</tr>
			<tr>
				<td><code>sessionId</code></td>
				<td><code>string</code></td>
				<td>Unique session identifier</td>
			</tr>
			<tr>
				<td><code>experienceId</code></td>
				<td><code>string</code></td>
				<td>Experience being run</td>
			</tr>
			<tr>
				<td><code>expiresAt</code></td>
				<td><code>string</code></td>
				<td>ISO 8601 expiry</td>
			</tr>
			<tr>
				<td><code>sessionToken</code></td>
				<td><code>string</code></td>
				<td>JWT for runtime authorisation (SDK internal)</td>
			</tr>
			<tr>
				<td><code>transport</code></td>
				<td><code>object</code></td>
				<td><code>type</code> + <code>config</code></td>
			</tr>
			<tr>
				<td><code>runtime</code></td>
				<td><code>object</code></td>
				<td>CDN URL, input mode, renderer</td>
			</tr>
			<tr>
				<td><code>characters</code></td>
				<td><code>array</code></td>
				<td>Character definitions</td>
			</tr>
			<tr>
				<td><code>billing</code></td>
				<td><code>object</code></td>
				<td>Meter ID and payer</td>
			</tr>
		</tbody>
	</table>

	<h2>Transport types</h2>
	<table>
		<thead>
			<tr>
				<th><code>transport.type</code></th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>http</code></td>
				<td>Available</td>
			</tr>
			<tr>
				<td><code>livekit</code></td>
				<td>Planned</td>
			</tr>
			<tr>
				<td><code>webrtc</code></td>
				<td>Planned</td>
			</tr>
		</tbody>
	</table>
</DocPage>
