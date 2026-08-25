<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Publisher SDK"
	description="Server-only @liforma/publisher for programmatic experience authoring."
	noindex
>
	<p>
		<code>@liforma/publisher</code> is the typed Node SDK for Liforma authoring. It wraps image
		upload, durable job waiting, and resource creation so you can publish experiences without
		hand-rolling poll loops. This page is unlisted alpha documentation.
	</p>
	<p>
		Use a <strong>live</strong> project API key on the server only. Never import this package in a
		browser bundle. For the raw REST contract, see
		<a href="/_alpha/programmatic-experience-creation">Programmatic experience creation</a>.
	</p>

	<h2>Install</h2>
	<CodeBlock code={snippets.publisherInstall} lang="bash" />
	<p>
		Until the package is published to npm, build from the API repo workspace package
		(<code>api.liforma.ai/packages/publisher</code>) and depend on it via
		<code>file:</code> or a packed tarball.
	</p>

	<h2>Hotel check-in</h2>
	<p>
		Upload a lobby photograph plus clothes and hair plates, create a place and character, then
		publish. <code>createLocation</code> / <code>createClothes</code> / <code>createHair</code>
		wait until the authoring job is <code>succeeded</code> with <code>requiredOk</code>.
	</p>
	<CodeBlock code={snippets.publisherHotelCheckIn} lang="ts" />

	<h2>Jobs</h2>
	<p>
		Prefer the high-level <code>create*</code> helpers. For queues and custom UIs, use
		<code>startLocation</code> / <code>startClothes</code> / <code>startHair</code> plus
		<code>publisher.jobs.get</code>, <code>wait</code>, <code>watch</code>, and
		<code>retry</code>.
	</p>
	<CodeBlock code={snippets.publisherJobs} lang="ts" />

	<h2>Errors</h2>
	<p>
		Failures throw <code>LiformaPublisherError</code> with stable <code>code</code>, HTTP
		<code>status</code>, <code>requestId</code>, and optional terminal job context. Prefer
		<code>externalId</code> on creates so retries are idempotent.
	</p>
</DocPage>
