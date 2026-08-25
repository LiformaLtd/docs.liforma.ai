<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';

	const authExample = `Authorization: Bearer lfm_live_…`;

	const listAvatars = `GET https://api.liforma.ai/v1/projects/proj_01ABC/avatars
Authorization: Bearer lfm_live_…`;

	const avatarResponse = `{
  "avatars": [
    {
      "id": "05a87620",
      "displayName": "Sofia",
      "defaultVoiceId": "<project TTS voice id>",
      "defaultSttLang": "en-US",
      "clothes": [
        { "id": "clothes_CATALOGUE", "name": "Blazer", "source": "library", "libraryScope": "project" }
      ],
      "hair": [
        { "id": "hair_CATALOGUE", "name": "Short", "source": "library", "libraryScope": "project" }
      ]
    }
  ]
}`;

	const createUpload = `POST https://api.liforma.ai/v1/projects/proj_01ABC/uploads
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "purpose": "colour",
  "contentType": "image/png",
  "bytes": 2086713,
  "sha256": "<64-char hex or base64 SHA-256>"
}`;

	const uploadCreated = `{
  "upload": {
    "id": "upload_LOC",
    "status": "pending",
    "expiresAt": "2026-08-25T12:15:00.000Z"
  },
  "put": {
    "url": "https://<presigned-private-r2>",
    "headers": {
      "Content-Type": "image/png",
      "x-amz-meta-sha256": "<hex SHA-256>"
    }
  }
}`;

	const putUpload = `PUT https://<presigned-private-r2>
Content-Type: image/png
x-amz-meta-sha256: <hex SHA-256>

<raw image bytes>`;

	const completeUpload = `POST https://api.liforma.ai/v1/projects/proj_01ABC/uploads/upload_LOC/complete
Authorization: Bearer lfm_live_…`;

	const uploadCompleted = `{
  "upload": {
    "id": "upload_LOC",
    "status": "uploaded",
    "bytes": 2086713,
    "sha256": "<hex SHA-256>"
  }
}`;

	const createLocation = `POST https://api.liforma.ai/v1/projects/proj_01ABC/locations
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "name": "Hotel lobby",
  "uploadId": "upload_LOC",
  "externalId": "cms-loc-lobby"
}`;

	const locationAccepted = `{
  "job": {
    "id": "job_LOC",
    "status": "queued",
    "kind": "location",
    "pollUrl": "/v1/projects/proj_01ABC/jobs/job_LOC",
    "targetId": "loc_ABC",
    "requiredOk": false,
    "stage": null,
    "progress": { "requiredVerified": 0, "requiredTotal": 0 },
    "error": null,
    "enrichment": { "status": "pending", "verified": 0, "total": 0, "error": null }
  },
  "resource": { "kind": "location", "id": "loc_ABC", "status": "processing" }
}`;

	const pollJob = `GET https://api.liforma.ai/v1/projects/proj_01ABC/jobs/job_LOC
Authorization: Bearer lfm_live_…`;

	const jobSucceeded = `{
  "job": {
    "id": "job_LOC",
    "status": "succeeded",
    "kind": "location",
    "pollUrl": "/v1/projects/proj_01ABC/jobs/job_LOC",
    "targetId": "loc_ABC",
    "requiredOk": true,
    "stage": "webp",
    "progress": { "requiredVerified": 11, "requiredTotal": 11 },
    "error": null,
    "enrichment": { "status": "pending", "verified": 0, "total": 6, "error": null }
  }
}`;

	const createPlace = `POST https://api.liforma.ai/v1/projects/proj_01ABC/places
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "locationId": "loc_ABC",
  "name": "Hotel lobby",
  "externalId": "cms-place-lobby"
}`;

	const placeCreated = `{
  "place": {
    "id": "place_ABC",
    "name": "Hotel lobby",
    "locationId": "loc_ABC",
    "externalId": "cms-place-lobby",
    "createdAt": "2026-08-25T12:00:20.000Z",
    "updatedAt": "2026-08-25T12:00:20.000Z"
  }
}`;

	const createClothes = `POST https://api.liforma.ai/v1/projects/proj_01ABC/clothes
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "05a87620",
  "name": "Reception uniform",
  "uploadId": "upload_CLOTHES",
  "backgroundMode": "remove",
  "externalId": "cms-clothes-uniform"
}`;

	const clothesAccepted = `{
  "job": {
    "id": "job_CLOTHES",
    "status": "queued",
    "kind": "clothes",
    "pollUrl": "/v1/projects/proj_01ABC/jobs/job_CLOTHES",
    "targetId": "clothes_ABC",
    "requiredOk": false
  },
  "resource": { "kind": "clothes", "id": "clothes_ABC", "status": "processing" }
}`;

	const createHair = `POST https://api.liforma.ai/v1/projects/proj_01ABC/hair
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "05a87620",
  "name": "Tied back",
  "uploadId": "upload_HAIR",
  "backgroundMode": "remove",
  "externalId": "cms-hair-tied"
}`;

	const createCharacter = `POST https://api.liforma.ai/v1/projects/proj_01ABC/characters
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "05a87620",
  "name": "Alex",
  "voice": "<project TTS voice id>",
  "sttLang": "en-US",
  "clothesId": "clothes_ABC",
  "hairId": "hair_ABC",
  "personality": "Warm hotel receptionist.",
  "generalInstructions": "Keep replies short. Stay in character.",
  "externalId": "cms-char-482"
}`;

	const characterCreated = `{
  "character": {
    "id": "char_ABC",
    "projectId": "proj_01ABC",
    "name": "Alex",
    "avatarId": "05a87620",
    "voice": "<project TTS voice id>",
    "sttLang": "en-US",
    "clothesId": "clothes_ABC",
    "hairId": "hair_ABC",
    "personality": "Warm hotel receptionist.",
    "generalInstructions": "Keep replies short. Stay in character.",
    "externalId": "cms-char-482",
    "createdAt": "2026-08-25T12:01:00.000Z",
    "updatedAt": "2026-08-25T12:01:00.000Z"
  }
}`;

	const createExperience = `POST https://api.liforma.ai/v1/projects/proj_01ABC/experiences
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "title": "Hotel check-in",
  "slug": "english/CEFR/A1/hotel_check_in",
  "attributes": {
    "language": "english",
    "curriculum": "CEFR",
    "level": "A1"
  },
  "characterId": "char_ABC",
  "placeId": "place_ABC",
  "startingMessage": "Welcome. How can I help you today?",
  "systemInstructions": "You are a hotel receptionist. Help the guest check in.",
  "introduction": "Practice checking into a hotel.",
  "publish": true,
  "externalId": "cms-scenario-482"
}`;

	const experienceResponse = `{
  "experience": {
    "id": "exp_01K3Q9M5WJQ2P9X7B4R8S1N6D",
    "projectId": "proj_01ABC",
    "title": "Hotel check-in",
    "slug": "english/CEFR/A1/hotel_check_in",
    "status": "published",
    "published": true,
    "attributes": {
      "language": "english",
      "curriculum": "CEFR",
      "level": "A1"
    },
    "externalId": "cms-scenario-482",
    "createdAt": "2026-08-25T12:01:10.000Z",
    "updatedAt": "2026-08-25T12:01:10.000Z"
  }
}`;

	const optionalDepth = `{
  "name": "Hotel lobby",
  "uploadId": "upload_LOC",
  "depth": {
    "uploadId": "upload_DEPTH",
    "depthMapType": "disparity",
    "metersPerDepth": 2
  }
}`;

	const patchExperience = `PATCH https://api.liforma.ai/v1/experiences/exp_01K3Q9M5WJQ2P9X7B4R8S1N6D
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "title": "Hotel check-in (A1)",
  "slug": "english/CEFR/A1/hotel_check_in",
  "attributes": {
    "language": "english",
    "curriculum": "CEFR",
    "level": "A1"
  }
}`;

	const publishExperience = `POST https://api.liforma.ai/v1/experiences/exp_01K3Q9M5WJQ2P9X7B4R8S1N6D/publish
Authorization: Bearer lfm_live_…`;

	const getExperience = `GET https://api.liforma.ai/v1/experiences/exp_01K3Q9M5WJQ2P9X7B4R8S1N6D
Authorization: Bearer lfm_live_…`;

	const catalogByPath = `GET https://api.liforma.ai/v1/projects/proj_01ABC/experiences/english/CEFR/A1/hotel_check_in
Authorization: Bearer lfm_live_…`;

	const errorExample = `{
  "error": {
    "code": "SLUG_CONFLICT",
    "message": "Slug \\"english/CEFR/A1/hotel_check_in\\" is already used in this project.",
    "requestId": "req_…"
  }
}`;
</script>

<DocPage
	title="Programmatic experience creation"
	description="Private /v1 authoring: upload images, create a location and place, clothes and hair, then a character and experience."
	noindex
	next={[
		{ title: 'Alpha index', href: '/_alpha' },
		{ title: 'Experience Catalog', href: '/api-reference/experience-catalog' },
		{ title: 'Sessions', href: '/api-reference/sessions' }
	]}
>
	<p>
		This is an unlisted preview of the private authoring API. It is not in the public docs sidebar,
		sitemap, or <code>llms.txt</code>. Use a <strong>live project API key</strong>. Never send the
		key to a browser.
	</p>
	<p>
		Writes are enabled per organization. If you receive <code>AUTHORING_NOT_ALLOWED</code>, ask
		Liforma to enable authoring on that org. Test keys are rejected.
	</p>

	<h2>What this API is for</h2>
	<p>
		Create one-character scenes from your own CMS. Upload images for a custom location, clothes, and
		hair; wrap the ready location as a Place; create a Character; then create an Experience.
		Session minting still uses <code>exp_…</code> — see
		<a href="/api-reference/sessions">Sessions</a>.
	</p>

	<h2>Auth</h2>
	<p>
		Same Bearer key as other <code>/v1</code> project routes. The key must belong to the project’s
		organization.
	</p>
	<CodeBlock code={authExample} lang="http" />
	<p>
		Responses include <code>Cache-Control: no-store</code> and
		<code>Liforma-Request-Id</code>. Include that id when reporting issues.
	</p>

	<h2>Worked example</h2>
	<p>
		Hotel check-in from three images: a lobby photograph, a clothes plate, and a hair plate. You
		never send image bytes on the create routes. Upload first, then pass
		<code>uploadId</code>. Places take a ready <code>locationId</code> only —
		<code>prompt</code> and <code>image</code> return <code>400</code>.
	</p>
	<ol>
		<li>List costume avatars</li>
		<li>Upload the lobby photograph → create a location → poll until ready</li>
		<li>Create a place from that <code>locationId</code></li>
		<li>Upload clothes and hair for the same avatar → poll each job</li>
		<li>Create a character</li>
		<li>Create (and optionally publish) the experience</li>
	</ol>
	<p>
		Location work and wardrobe work are independent. Start both after you have
		<code>avatarId</code>. Character create waits until clothes and hair jobs have
		<code>succeeded</code>. Experience create waits for the character and the place.
	</p>

	<h3>0. List costume avatars</h3>
	<p>
		Use a costume-capable <code>avatarId</code> and a project TTS <code>voice</code>. You can attach
		existing catalogue clothes / hair from this list instead of uploading custom plates.
	</p>
	<CodeBlock code={listAvatars} lang="http" />
	<CodeBlock code={avatarResponse} lang="json" />

	<h3>1. Upload the lobby photograph</h3>
	<p>
		Every colour file uses the same three calls: create a session, PUT the bytes once to the
		presigned URL, then complete. Sessions expire in about 15 minutes. Colour accepts JPEG, PNG, or
		WebP. The SHA-256 you declare must match the bytes you PUT.
	</p>
	<CodeBlock code={createUpload} lang="http" />
	<CodeBlock code={uploadCreated} lang="json" />
	<CodeBlock code={putUpload} lang="http" />
	<CodeBlock code={completeUpload} lang="http" />
	<CodeBlock code={uploadCompleted} lang="json" />
	<p>
		Repeat the same three calls for clothes (<code>upload_CLOTHES</code>) and hair
		(<code>upload_HAIR</code>). Published player media on <code>cdn.liforma.ai</code> is
		unauthenticated if the opaque URL is known. Do not upload imagery that must stay secret.
	</p>

	<h3>2. Create the location, then poll</h3>
	<p>
		<code>POST …/locations</code> returns <code>202</code> immediately. Omit
		<code>depth</code> to generate a disparity map from the colour image. Do not call an internal
		run URL. Poll <code>GET …/jobs/{'{jobId}'}</code> until <code>status</code> is
		<code>succeeded</code> and <code>requiredOk</code> is <code>true</code>. AVIF enrichment is
		reported separately and never blocks ready.
	</p>
	<CodeBlock code={createLocation} lang="http" />
	<CodeBlock code={locationAccepted} lang="json" />
	<CodeBlock code={pollJob} lang="http" />
	<CodeBlock code={jobSucceeded} lang="json" />
	<p>
		To supply your own aligned depth PNG instead, complete a second upload with
		<code>purpose: "depth"</code> (PNG only, <code>lf-disparity-v1</code>: black is far, white is
		near, dimensions must match the oriented colour image) and include it:
	</p>
	<CodeBlock code={optionalDepth} lang="json" />
	<p>
		High-precision <code>lf-depth-u16-v1</code> siblings are published automatically when the source
		has genuine 16-bit detail. That is an implementation-selected delivery optimization, not a
		request field.
	</p>

	<h3>3. Create the place</h3>
	<p>
		Synchronous <code>201</code> (or <code>200</code> when <code>externalId</code> already exists).
		The location must already be ready. Unknown or other-org custom locations return
		<code>404</code> <code>UNKNOWN_LOCATION</code>. An owned draft or failed custom location
		returns <code>409</code> <code>LOCATION_NOT_READY</code>. One location may wrap as many Places
		in the same org. You may also wrap a published catalogue <code>loc_…</code> without uploading.
	</p>
	<CodeBlock code={createPlace} lang="http" />
	<CodeBlock code={placeCreated} lang="json" />

	<h3>4. Upload clothes</h3>
	<p>
		Same upload session as step 1, then <code>202</code> and the same job poll. The plate must be
		shot for this <code>avatarId</code>. <code>backgroundMode</code> defaults to
		<code>remove</code>. Use <code>transparent</code> only for an already cut-out plate.
		<code>prompt</code> and inline <code>image</code> return <code>400</code>
		<code>PROMPT_GENERATION_UNAVAILABLE</code> (or invalid body). Attach
		<code>clothes_ABC</code> only after the job succeeds.
	</p>
	<CodeBlock code={createClothes} lang="http" />
	<CodeBlock code={clothesAccepted} lang="json" />

	<h3>5. Upload hair</h3>
	<p>Same contract as clothes. Poll <code>job_HAIR</code> until <code>succeeded</code>.</p>
	<CodeBlock code={createHair} lang="http" />

	<h3>6. Create the character</h3>
	<p>
		<code>201</code> on create, <code>200</code> when <code>externalId</code> already exists.
		Required: <code>avatarId</code>, <code>name</code>, <code>voice</code>,
		<code>sttLang</code>. Optional: <code>clothesId</code>, <code>hairId</code>,
		<code>personality</code>, <code>generalInstructions</code>, <code>externalId</code>. Do not
		send nested clothes objects. <code>voice</code> must be valid for the project’s configured TTS
		provider.
	</p>
	<CodeBlock code={createCharacter} lang="http" />
	<CodeBlock code={characterCreated} lang="json" />

	<h3>7. Create the experience</h3>
	<p>
		Creates a one-character draft, or publishes immediately when <code>publish</code> is
		<code>true</code>. <code>GET</code> on this same project path is the
		<a href="/api-reference/experience-catalog">published catalog</a> — not this authoring create.
	</p>
	<CodeBlock code={createExperience} lang="http" />
	<CodeBlock code={experienceResponse} lang="json" />
	<p>
		Mint a session with the returned <code>exp_…</code>. Path catalog lookup is optional:
	</p>
	<CodeBlock code={catalogByPath} lang="http" />

	<h2>Idempotency with <code>externalId</code></h2>
	<p>
		Optional on create. Same <code>externalId</code> in the same project returns the existing row
		(or the existing ingest <code>{'{ job, resource }'}</code>) instead of creating a duplicate. A
		<strong>new</strong> <code>externalId</code> that reuses another experience’s slug still
		returns <code>409</code> <code>SLUG_CONFLICT</code>. Different image bytes or settings with
		the same ingest <code>externalId</code> return <code>409</code>
		<code>EXTERNAL_ID_CONFLICT</code>.
	</p>
	<p>
		Allowed characters: letters, digits, <code>.</code> <code>_</code> <code>:</code>
		<code>-</code>. Max 128.
	</p>

	<h2>Jobs</h2>
	<p>
		<code>GET /v1/projects/{'{projectId}'}/jobs/{'{jobId}'}</code> is the only readiness signal.
		Integrators poll. Do not stream the run. After required retries are exhausted,
		<code>POST …/jobs/{'{jobId}'}/retry</code> starts a new required job on the same resource from
		the frozen fingerprint.
	</p>
	<p>
		<code>GET …/clothes/{'{clothesId}'}</code>, <code>…/hair/{'{hairId}'}</code>, and
		<code>…/locations/{'{locationId}'}</code> return the resource after the job. Ready clothes /
		hair expose a lowercase compose slug in <code>catalogueKey</code>.
	</p>

	<h2>GET /v1/experiences/&#123;experienceId&#125;</h2>
	<p>Returns the authoring serializer for one experience (<code>exp_…</code>).</p>
	<CodeBlock code={getExperience} lang="http" />

	<h2>PATCH /v1/experiences/&#123;experienceId&#125;</h2>
	<p>
		Update <code>title</code>, <code>slug</code>, and/or <code>attributes</code> without rewriting
		the scene. Moving onto another experience’s slug in the same project is
		<code>409</code> <code>SLUG_CONFLICT</code>.
	</p>
	<CodeBlock code={patchExperience} lang="http" />

	<h2>POST /v1/experiences/&#123;experienceId&#125;/publish</h2>
	<p>
		Publishes the current draft. The published revision snapshots <code>slug</code> and
		<code>attributes</code> the same way as title.
	</p>
	<CodeBlock code={publishExperience} lang="http" />

	<h2>Slug paths</h2>
	<p>
		Store without a leading slash. Studio still displays <code>/</code> as a prefix. Unique per
		project.
	</p>
	<ul>
		<li>Strip leading/trailing <code>/</code>; collapse <code>//</code></li>
		<li>
			1–8 segments; each <code>[A-Za-z0-9_-]+</code> (so <code>CEFR</code>, <code>A1</code>, and
			<code>hotel_check_in</code> are legal)
		</li>
		<li>Max 256 characters total</li>
		<li>Reject <code>.</code>, <code>..</code>, and empty segments</li>
	</ul>
	<p>
		If you <strong>set</strong> <code>slug</code> and that path already exists in the project, the
		API returns <code>409</code> <code>SLUG_CONFLICT</code>. It does not suffix. If you omit
		<code>slug</code>, the server generates a single lowercase kebab from <code>title</code>. Title
		collisions become <code>hotel-check-in-2</code>, then <code>-3</code> — never
		<code>-1</code>.
	</p>

	<h2>Attributes</h2>
	<p>
		Freeform project catalog metadata for your Experiences tab filters. Not Meet gallery discovery
		tags, and not stored in <code>definitionJson</code>.
	</p>
	<ul>
		<li>Object of string values (not arrays)</li>
		<li>Max 20 pairs; empty object is valid</li>
		<li>Keys: <code>[a-z][a-z0-9_-]&#123;0,31&#125;</code>, stored lowercase</li>
		<li>Values: trimmed, 1–64 characters, case preserved (<code>CEFR</code>, <code>A1</code>)</li>
	</ul>
	<p>Set slug and attributes explicitly. The API does not derive attributes from path segments.</p>

	<h2>Errors</h2>
	<CodeBlock code={errorExample} lang="json" />
	<table>
		<thead>
			<tr>
				<th>Status</th>
				<th>Code</th>
				<th>Meaning</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>400</code></td>
				<td><code>INVALID_BODY</code> / <code>INVALID_JSON</code></td>
				<td>Validation or malformed JSON</td>
			</tr>
			<tr>
				<td><code>400</code></td>
				<td>
					<code>UPLOAD_EXPIRED</code> / <code>UPLOAD_SIZE_MISMATCH</code> /
					<code>UPLOAD_HASH_MISMATCH</code> / <code>INVALID_IMAGE</code> /
					<code>INVALID_DEPTH_MAP</code>
				</td>
				<td>Upload session or file failed validation</td>
			</tr>
			<tr>
				<td><code>400</code></td>
				<td>
					<code>UNKNOWN_AVATAR</code> / <code>UNKNOWN_VOICE</code> /
					<code>UNKNOWN_APPEARANCE</code>
				</td>
				<td>Character inputs the project cannot use</td>
			</tr>
			<tr>
				<td><code>400</code></td>
				<td><code>UNKNOWN_CHARACTER</code> / <code>UNKNOWN_PLACE</code></td>
				<td>Missing or not enabled on the project</td>
			</tr>
			<tr>
				<td><code>400</code></td>
				<td><code>PUBLISH_INVALID</code></td>
				<td>Experience failed publish validation</td>
			</tr>
			<tr>
				<td><code>401</code></td>
				<td><code>INVALID_API_KEY</code></td>
				<td>Missing or invalid key</td>
			</tr>
			<tr>
				<td><code>403</code></td>
				<td><code>AUTHORING_NOT_ALLOWED</code> / <code>TEST_KEY_NOT_ALLOWED</code></td>
				<td>Org not enabled, or a test key was used</td>
			</tr>
			<tr>
				<td><code>404</code></td>
				<td>
					<code>UNKNOWN_EXPERIENCE</code> / <code>UNKNOWN_UPLOAD</code> /
					<code>UNKNOWN_JOB</code> / <code>UNKNOWN_LOCATION</code> /
					<code>PROJECT_NOT_FOUND</code>
				</td>
				<td>Unknown id, or key cannot see that project</td>
			</tr>
			<tr>
				<td><code>409</code></td>
				<td>
					<code>SLUG_CONFLICT</code> / <code>EXTERNAL_ID_CONFLICT</code> /
					<code>LOCATION_NOT_READY</code>
				</td>
				<td>Slug taken, ingest replay mismatch, or custom location not published yet</td>
			</tr>
			<tr>
				<td><code>503</code></td>
				<td><code>DATABASE_UNAVAILABLE</code></td>
				<td>Platform database unreachable</td>
			</tr>
		</tbody>
	</table>
</DocPage>
