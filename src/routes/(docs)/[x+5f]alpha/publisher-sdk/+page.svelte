<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Publisher SDK"
	description="Server-only @liforma/publisher for the Liforma Publisher API."
	noindex
>
	<p>
		<code>@liforma/publisher</code> is the typed Node SDK for the Liforma Publisher API. It wraps
		image upload, durable job waiting, and create/update helpers so you can publish experiences
		without hand-rolling poll loops. This page is unlisted alpha documentation.
	</p>
	<p>
		Use a <strong>live</strong> project API key on the server only. Never import this package in a
		browser bundle. For the raw REST contract, see
		<a href={resolve('/[x+5f]alpha/programmatic-experience-creation')}
			>Programmatic experience creation</a
		>.
	</p>

	<h2>Install</h2>
	<CodeBlock code={snippets.publisherInstall} lang="bash" />
	<p>
		Server-only. Pass a live project API key via <code>apiKey</code> or
		<code>LIFORMA_API_KEY</code>. Never import this package in a browser bundle.
	</p>

	<h2>Hotel check-in</h2>
	<p>
		Upload a lobby photograph plus clothes and hair plates, wrap a place, create a character, then
		publish. <code>createLocation</code> / <code>createClothes</code> / <code>createHair</code>
		wait until the publish job is <code>succeeded</code> with <code>requiredOk</code>.
	</p>
	<p>
		A location is the visual plate. A place is the scene wrapper that points at a ready
		<code>locationId</code>. Experiences attach the place. Character fields
		(<code>sttLang</code>, <code>generalInstructions</code>, <code>personality</code>) stay on the
		character. Experience copy (<code>systemInstructions</code>, <code>startingMessage</code>,
		<code>introduction</code>) stays on the experience.
	</p>
	<CodeBlock code={snippets.publisherHotelCheckIn} lang="ts" />

	<h2>Draft vs publish</h2>
	<p>
		<code>updateExperience</code> writes the current draft and does not publish.
		<code>publishExperience</code> snapshots a revision. Pass <code>publish: true</code> on
		<code>createExperience</code> when you want the first revision in the same call.
	</p>
	<p>
		Experience fields always describe the current draft. Use <code>status</code> for the
		experience’s current lifecycle state, <code>hasPublishedRevision</code> to tell whether a
		published revision exists, and
		<code>hasUnpublishedChanges</code> to tell whether the returned draft differs from that live
		revision. Immediately after publishing, both are <code>true</code> and <code>false</code>
		respectively. Editing the draft changes <code>hasUnpublishedChanges</code> to
		<code>true</code>. The deprecated 0.x <code>published</code> compatibility field keeps its
		older meaning: it is <code>true</code> only when <code>status</code> is currently
		<code>published</code> and a published revision exists. An archived experience can therefore
		have <code>hasPublishedRevision: true</code> and <code>published: false</code>. New code should
		use <code>status</code>, <code>hasPublishedRevision</code>, and
		<code>hasUnpublishedChanges</code>.
	</p>

	<h2>Reload and edit</h2>
	<p>
		<code>getCharacter</code>, <code>getPlace</code>, <code>getExperience</code>,
		<code>getLocation</code>, <code>getClothes</code>, and <code>getHair</code> reload the
		same envelopes create returns. Experience JSON includes the start-node
		<code>characterId</code>, <code>placeId</code>, <code>startingMessage</code>,
		<code>systemInstructions</code>, <code>introduction</code>,
		<code>hasPublishedRevision</code>, and <code>hasUnpublishedChanges</code>.
	</p>
	<p>
		<code>updateClothes</code> / <code>updateHair</code> rename a plate.
		<code>updatePlace</code> can point at a new ready <code>locationId</code>.
		<code>updateCharacter</code> edits appearance and person copy.
		<code>updateExperience</code> edits catalog fields, the primary character or place, and
		scene copy. Then call <code>publishExperience</code> when you want a new revision.
	</p>
	<CodeBlock code={snippets.publisherReloadAndUpdate} lang="ts" />
	<p>
		<code>GET /v1/projects/{'{projectId}'}/experiences</code> is the published
		<a href={resolve('/api-reference/experience-catalog')}>integrator catalog</a>, not a Publisher
		list.
		Use <code>getExperience(expId)</code> for the draft/publish envelope — that call
		hits the project-prefixed Publisher path, not the catalog.
	</p>
	<p>
		The canonical Publisher item routes are
		<code>GET/PATCH /v1/projects/&#123;projectId&#125;/experiences/&#123;experienceId&#125;</code>
		and
		<code
			>POST
			/v1/projects/&#123;projectId&#125;/experiences/&#123;experienceId&#125;/publish</code
		>. The old unprefixed <code>/v1/experiences/&#123;experienceId&#125;</code> item and publish
		routes remain temporarily as deprecated aliases. New integrations must not use them.
	</p>

	<h2>Jobs</h2>
	<p>
		Prefer the high-level <code>create*</code> helpers. For queues and custom UIs, use
		<code>startLocation</code> / <code>startClothes</code> / <code>startHair</code> plus
		<code>publisher.jobs.get</code>, <code>wait</code>, <code>watch</code>, and
		<code>retry</code>. Pass <code>forceNew: true</code> on create when you want a new plate
		instead of content-addressed reuse. <code>uploadDepthMap</code> is the depth-purpose
		upload used by <code>createLocation(&#123; depth &#125;)</code>.
	</p>
	<CodeBlock code={snippets.publisherJobs} lang="ts" />
	<p>
		<code>wait</code> and <code>watch</code> default to a 10-minute client-side wait. A
		<code>JOB_WAIT_TIMEOUT</code> means only that this caller stopped waiting; it is
		non-retryable and does not cancel or fail the durable server job. Save the job id and resume
		with <code>publisher.jobs.wait(jobId)</code> or <code>watch(jobId)</code>. Do not start the
		create again merely because the local wait expired. A server job that reports
		<code>succeeded</code> without <code>requiredOk</code> fails the SDK wait with
		<code>JOB_INCOMPLETE</code>.
	</p>
	<p>
		Polling is also the recovery signal in the serverless runner: a no-store
		<code>jobs.get</code>, <code>wait</code>, or <code>watch</code> poll may resume due work after
		an interrupted dispatch. Call <code>jobs.retry</code> only for a terminal
		<code>failed</code> job; retrying a queued, running, waiting, or succeeded job returns
		<code>JOB_NOT_RETRYABLE</code>.
	</p>

	<h2>Upload and request retries</h2>
	<p>
		Publisher image and depth inputs have a hard maximum of <strong>20 MiB</strong>, which is more
		restrictive than the generic 50 MB upload ceiling. The SDK rejects a larger input before it
		creates an upload session. Accepted bytes go to the private authoring bucket through a
		15-minute presigned PUT URL; no GET or share URL is returned. The PUT signature includes the
		declared <code>Content-Length</code>, so the request must send that exact header and byte count.
	</p>
	<p>
		The 0.3 SDK performs bounded retries for the idempotent presigned image PUT and upload
		completion request, including transient network failures, <code>429</code>, and
		<code>5xx</code>, while honoring <code>Retry-After</code>. It does not automatically retry
		upload-session creation or resource create calls. Use a stable <code>externalId</code> for
		create idempotency, and do not assume <code>JOB_WAIT_TIMEOUT</code> makes a create safe to
		repeat.
	</p>

	<h2>Errors</h2>
	<p>
		Failures throw <code>LiformaPublisherError</code> with stable <code>code</code>, HTTP
		<code>status</code>, <code>requestId</code>, and optional terminal job context. Prefer
		<code>externalId</code> on creates so retries are idempotent.
	</p>
	<p>
		HTTP failures preserve the Publisher API code. Terminal processing failures use
		<code>PROCESSOR_FAILED</code>, <code>PROCESSOR_TIMEOUT</code>, or
		<code>PROCESSOR_UNAVAILABLE</code> and include the final typed job on
		<code>error.job</code>. SDK-local waiting failures use <code>JOB_INCOMPLETE</code> or
		<code>JOB_WAIT_TIMEOUT</code>. See the
		<a href={resolve('/[x+5f]alpha/programmatic-experience-creation#errors')}
			>complete error inventory</a
		>.
	</p>

	<h2>Upgrading to 0.3</h2>
	<ul>
		<li>
			Read <code>status</code>, <code>hasPublishedRevision</code>, and
			<code>hasUnpublishedChanges</code>. The deprecated <code>published</code> field keeps its
			old status-plus-revision behavior; it is not an alias for
			<code>hasPublishedRevision</code>.
		</li>
		<li>
			Use project-prefixed Experience item and publish routes. The SDK does this automatically.
		</li>
		<li>
			Handle <code>JOB_WAIT_TIMEOUT</code> by saving the job id and resuming the poll, not by
			recreating the asset.
		</li>
		<li>
			Do not depend on internal clothes, hair, location, or job fields; 0.3 validates the slim
			public resource shapes.
		</li>
		<li>
			Update the package and lockfile together with
			<code>npm install @liforma/publisher@^0.3.0</code>.
		</li>
	</ul>
</DocPage>
