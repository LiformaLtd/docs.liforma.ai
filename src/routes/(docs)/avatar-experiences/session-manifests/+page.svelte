<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Session Manifests"
	description="The per-launch contract between the API and the SDK."
	next={[
		{ title: 'Public Sessions API', href: '/api-reference/public-sessions' },
		{ title: 'Manifests API', href: '/api-reference/manifests' },
		{ title: 'Authenticated Experiences', href: '/avatar-experiences/authenticated' }
	]}
>
	<h2>What is a Session Manifest?</h2>
	<p>
		A Session Manifest is a JSON document returned when a session is minted. It tells the SDK
		everything needed to run this launch:
	</p>
	<ul>
		<li>Which experience and characters are active</li>
		<li>How to connect (transport)</li>
		<li>Where to load avatar assets (CDN)</li>
		<li>Integration rules (return URL, close button)</li>
		<li>Session lifetime and authorisation token</li>
	</ul>

	<h2>Do I need to read it?</h2>
	<p>
		<strong>Usually no.</strong> The SDK consumes the manifest automatically. Inspect it for debugging,
		advanced integrations, or server-side minting.
	</p>

	<h2>Example</h2>
	<CodeBlock code={snippets.manifestExample} lang="json" filename="manifest.json" />

	<h2>Key fields</h2>
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>schemaVersion</code></td>
				<td>Manifest version for SDK negotiation</td>
			</tr>
			<tr>
				<td><code>sessionToken</code></td>
				<td>Short-lived JWT for runtime calls (internal to SDK)</td>
			</tr>
			<tr>
				<td><code>transport</code></td>
				<td>How the SDK connects — <code>http</code>, <code>livekit</code>, etc.</td>
			</tr>
			<tr>
				<td><code>runtime</code></td>
				<td>CDN base URL, input mode, renderer type</td>
			</tr>
			<tr>
				<td><code>characters</code></td>
				<td>Avatar, voice, STT language, agent per character</td>
			</tr>
			<tr>
				<td><code>integration</code></td>
				<td>Return URL and close navigation behaviour</td>
			</tr>
			<tr>
				<td><code>state</code></td>
				<td>Initial world state snapshot (updates via events)</td>
			</tr>
			<tr>
				<td><code>tools</code></td>
				<td>External capabilities available to characters</td>
			</tr>
		</tbody>
	</table>

	<h2>How manifests are minted</h2>
	<table>
		<thead>
			<tr>
				<th>Endpoint</th>
				<th>Auth</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>POST /v1/public-sessions</code></td>
				<td>Origin allowlist + public experience flag</td>
			</tr>
			<tr>
				<td><code>POST /v1/sessions</code></td>
				<td>Developer API key</td>
			</tr>
		</tbody>
	</table>
	<p>Both return the same manifest shape. Only the minting path differs.</p>
</DocPage>
