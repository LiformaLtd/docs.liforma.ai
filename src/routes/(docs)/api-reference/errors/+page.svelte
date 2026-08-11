<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Errors"
	description="HTTP status codes and error responses."
	next={[
		{ title: 'Browser Sessions', href: '/api-reference/browser-sessions' },
		{ title: 'Sessions', href: '/api-reference/sessions' }
	]}
>
	<h2>Error format</h2>
	<CodeBlock code={snippets.errorResponse} lang="json" />

	<h2>Session minting</h2>
	<table>
		<thead>
			<tr>
				<th>Status</th>
				<th>Meaning</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>400</code></td>
				<td>Invalid request body</td>
			</tr>
			<tr>
				<td><code>401</code></td>
				<td>Invalid or missing API key (<code>/v1/sessions</code>)</td>
			</tr>
			<tr>
				<td><code>403</code></td>
				<td>Origin not allowed, experience not public, or missing Origin header</td>
			</tr>
			<tr>
				<td><code>404</code></td>
				<td>Experience or session not found</td>
			</tr>
			<tr>
				<td><code>409</code></td>
				<td>
					<code>IDEMPOTENCY_CONFLICT</code> — <code>Idempotency-Key</code> reused with a different
					body
				</td>
			</tr>
			<tr>
				<td><code>429</code></td>
				<td>Rate limit or quota exceeded</td>
			</tr>
			<tr>
				<td><code>503</code></td>
				<td>Session minting failed (server error)</td>
			</tr>
		</tbody>
	</table>

	<h2>Common 403 causes (public sessions)</h2>
	<ul>
		<li><code>Origin</code> header missing — browser must send origin on cross-origin requests</li>
		<li>Origin not on experience allowlist</li>
		<li>Experience is not marked public</li>
	</ul>

	<h2>Runtime (SDK internal)</h2>
	<table>
		<thead>
			<tr>
				<th>Status</th>
				<th>Meaning</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>401</code></td>
				<td>Invalid or expired session token</td>
			</tr>
		</tbody>
	</table>
	<p>Runtime routes (<code>/player/*</code>) are internal to the SDK — integrators typically see these as SDK errors, not raw HTTP.</p>
</DocPage>
