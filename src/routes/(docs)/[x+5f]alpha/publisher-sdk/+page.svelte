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

	<h2>One-shot composition</h2>
	<p>
		<code>experiences.createFrom</code> is the happy path: pass images and copy, and the SDK
		uploads, waits for plate jobs, creates set + character, and optionally publishes. Use
		<code>ImageSource</code> as <code>Blob</code>, typed bytes with <code>contentType</code>,
		<code>&#123; url &#125;</code> (imported into Liforma storage — not a permanent dependency), or
		an existing <code>uploadId</code>. Reuse library items with an <code>id</code> field. The
		result includes a <code>created</code> map for what was newly persisted versus reused.
	</p>
	<CodeBlock code={snippets.publisherCreateFrom} lang="ts" />

	<h2>Hotel check-in (step by step)</h2>
	<p>
		Upload a lobby photograph plus clothes and hair plates, wrap a set, create a character, then
		publish. <code>backdrops.create</code> / <code>clothes.create</code> /
		<code>hair.create</code>
		wait until the publish job is <code>succeeded</code> with <code>requiredOk</code>.
	</p>
	<p>
		A backdrop is the visual plate. A set is the scene wrapper that points at a ready
		<code>backdropId</code>. Experiences attach the set. Character fields
		(<code>sttLang</code>, <code>generalInstructions</code>, <code>personality</code>) stay on the
		character. Experience copy (<code>systemInstructions</code>, <code>startingMessage</code>,
		<code>introduction</code>) stays on the experience.
	</p>
	<CodeBlock code={snippets.publisherHotelCheckIn} lang="ts" />

	<h2>Whole look</h2>
	<p>
		A whole look is one complete plate under <code>costumes/whole/</code>, not a clothes layer.
		Use <code>publisher.costumes.create</code> and pass <code>costumeId</code> on the character.
		<code>costumeId</code> is mutually exclusive with <code>clothesId</code> and
		<code>hairId</code>.
	</p>
	<CodeBlock code={snippets.publisherHotelExaminer} lang="ts" />

	<h2>Draft vs publish</h2>
	<p>
		<code>experiences.update</code> writes the current draft and does not publish.
		<code>experiences.publish</code> snapshots a revision. Pass <code>publish: true</code> on
		<code>experiences.create</code> when you want the first revision in the same call.
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
		<code>characters.get</code>, <code>sets.get</code>, <code>experiences.get</code>,
		<code>backdrops.get</code>, <code>costumes.get</code>, <code>clothes.get</code>, and
		<code>hair.get</code> reload the
		same envelopes create returns. Experience JSON includes the start-node
		<code>characterId</code>, <code>setId</code>, <code>startingMessage</code>,
		<code>systemInstructions</code>, <code>introduction</code>,
		<code>hasPublishedRevision</code>, and <code>hasUnpublishedChanges</code>.
	</p>
	<p>
		<code>costumes.update</code> / <code>clothes.update</code> / <code>hair.update</code> rename a
		plate.
		<code>sets.update</code> can point at a new ready <code>backdropId</code>.
		<code>characters.update</code> edits appearance, person copy, and optional
		<code>gender</code>, <code>age</code> (1–1000), and <code>ethnicity</code>. Pass
		<code>null</code> to inherit those fields from the avatar again.
		<code>style</code> on characters, sets, and backdrops is read-only: characters inherit
		it from the avatar, sets inherit it from the backdrop, and authors cannot override it.
		<code>experiences.update</code> edits catalog fields, the primary character or set, and
		scene copy. Then call <code>experiences.publish</code> when you want a new revision.
	</p>
	<CodeBlock code={snippets.publisherReloadAndUpdate} lang="ts" />
	<p>
		<code>GET /v1/projects/{'{projectId}'}/experiences</code> is the published
		<a href={resolve('/api-reference/experience-catalog')}>integrator catalog</a>, not a Publisher
		list.
		Use <code>experiences.get(expId)</code> for the draft/publish envelope — that call
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
		Prefer the high-level <code>create()</code> helpers. For queues and custom UIs, use
		<code>backdrops.startCreate</code> / <code>costumes.startCreate</code> /
		<code>clothes.startCreate</code> /
		<code>hair.startCreate</code> plus
		<code>publisher.jobs.get</code>, <code>wait</code>, <code>watch</code>, and
		<code>retry</code>. <code>retry</code> is allowed only when the failed job’s
		<code>error.retryable</code> is <code>true</code>. Pass <code>forceNew: true</code> on create
		when you want a new plate instead of content-addressed reuse.
		<code>uploadDepthMap</code> is the depth-purpose
		upload used by <code>backdrops.create(input)</code> with a <code>depth</code> field.
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
		<code>failed</code> job with <code>error.retryable === true</code>; retrying a queued,
		running, waiting, succeeded, or non-retryable job returns
		<code>JOB_NOT_RETRYABLE</code>. Aborting <code>create()</code>, <code>wait</code>, or
		<code>watch</code> stops this client’s wait only. It does not cancel the durable job.
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
		The SDK performs bounded retries for the idempotent presigned image PUT and upload
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

	<h2>Upgrading to 0.5</h2>
	<p>
		<code>@liforma/publisher@0.5.0</code> is a breaking pre-1.0 cutover. Flat methods are gone.
		Resource work lives on namespaces; execution controls are a second argument.
	</p>
	<ul>
		<li>
			Replace <code>createCharacter</code>, <code>getCharacter</code>,
			<code>updateCharacter</code>, <code>archiveCharacter</code>,
			<code>restoreCharacter</code>, and <code>deleteCharacter</code> with
			<code>publisher.characters.*</code>. The same pattern applies to
			<code>experiences</code>, <code>sets</code>, <code>backdrops</code>,
			<code>clothes</code>, and <code>hair</code>. Avatars are
			<code>publisher.avatars.list()</code>.
		</li>
		<li>
			There are no Place or Location SDK clients. Use <code>sets</code> and
			<code>backdrops</code>. Experience create input requires <code>setId</code>.
		</li>
		<li>
			Job-backed start is <code>startCreate()</code>, not <code>startBackdrop</code> /
			<code>startClothes</code> / <code>startHair</code>. Blocking
			<code>create()</code> is start → <code>jobs.wait</code> → <code>get(targetId)</code>.
			<code>jobs.wait()</code> still returns the job, not the resource.
		</li>
		<li>
			Move <code>signal</code>, <code>timeoutMs</code>, and <code>onProgress</code> off
			authored input. <code>jobs.wait</code> and blocking <code>create</code> take
			<code>WaitOptions</code>. <code>jobs.watch</code> takes
			<code>{'{ signal, timeoutMs }'}</code> only.
		</li>
		<li>
			<code>job.error</code> is now
			<code>{'{ code, category, retryable, message }'}</code>. Call
			<code>jobs.retry</code> only when <code>error.retryable</code> is
			<code>true</code>. Do not infer retryability from the code.
		</li>
		<li>
			Aborting <code>create</code>, <code>wait</code>, or <code>watch</code> stops this
			client only. It does not cancel the durable server job.
		</li>
		<li>
			Read <code>status</code>, <code>hasPublishedRevision</code>, and
			<code>hasUnpublishedChanges</code>. The deprecated <code>published</code> field keeps
			its older status-plus-revision meaning.
		</li>
		<li>
			Update the package and lockfile together with
			<code>npm install @liforma/publisher@^0.5.0</code>.
		</li>
	</ul>

	<h2>Upgrading to 0.6</h2>
	<p>
		<code>@liforma/publisher@0.6.0</code> adds <code>publisher.costumes</code> and a required
		<code>costumes</code> array on <code>avatars.list()</code>. Whole looks live there;
		<code>clothes</code> is composite plates only. Stay on 0.5.0 only against an API that does
		not emit <code>costumes</code> — 0.5.0 rejects the extra field. Install with
		<code>npm install @liforma/publisher@^0.6.0</code>.
	</p>

	<h2>Upgrading to 0.7</h2>
	<p>
		<code>@liforma/publisher@0.7.0</code> adds <code>experiences.createFrom</code> for one-shot
		composition, the shared <code>ImageSource</code> type (bytes with MIME, Blob, URL import, or
		upload id), composition-aware progress (<code>&#123; stage, job &#125;</code>), additive error
		<code>context.step</code>, and a <code>created</code> map on the result. Low-level namespaces
		are unchanged. Install with <code>npm install @liforma/publisher@^0.7.0</code>.
	</p>
</DocPage>
