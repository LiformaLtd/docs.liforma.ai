<script lang="ts">
	import { resolve } from '$app/paths';
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
      "gender": "male",
      "age": 55,
      "ethnicity": "european",
      "species": "human",
      "style": "Liforma 3D House Style",
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
      "Content-Length": "2086713",
      "x-amz-meta-sha256": "<hex SHA-256>"
    }
  }
}`;

	const putUpload = `PUT https://<presigned-private-r2>
Content-Type: image/png
Content-Length: 2086713
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
    "error": null
  },
  "location": { "id": "loc_ABC", "status": "processing" }
}`;

	const pollJob = `GET https://api.liforma.ai/v1/projects/proj_01ABC/jobs/job_LOC
Authorization: Bearer lfm_live_…`;

	const getLocation = `GET https://api.liforma.ai/v1/projects/proj_01ABC/locations/loc_ABC
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
    "error": null
  }
}`;

	const locationReady = `{
  "location": {
    "kind": "location",
    "id": "loc_ABC",
    "status": "ready",
    "name": "Hotel lobby",
    "depthEncoding": "lf-disparity-v1",
    "style": "Liforma 3D House Style",
    "externalId": "cms-loc-lobby"
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
    "style": "Liforma 3D House Style",
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
    "requiredOk": false,
    "stage": null,
    "progress": { "requiredVerified": 0, "requiredTotal": 0 },
    "error": null
  },
  "clothes": { "id": "clothes_ABC", "status": "processing" }
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
  "gender": "female",
  "age": 28,
  "ethnicity": "european",
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
    "gender": "female",
    "age": 28,
    "ethnicity": "european",
    "style": "Liforma 3D House Style",
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
    "hasPublishedRevision": true,
    "hasUnpublishedChanges": false,
    "published": true,
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

	const patchExperience = `PATCH https://api.liforma.ai/v1/projects/proj_01ABC/experiences/exp_01K3Q9M5WJQ2P9X7B4R8S1N6D
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "title": "Hotel check-in (A1)",
  "slug": "english/CEFR/A1/hotel_check_in",
  "attributes": {
    "language": "english",
    "curriculum": "CEFR",
    "level": "A1"
  },
  "startingMessage": "Welcome. How can I help you today?",
  "systemInstructions": "You are a hotel receptionist. Help the guest check in.",
  "introduction": "Practice checking into a hotel."
}`;

	const publishExperience = `POST https://api.liforma.ai/v1/projects/proj_01ABC/experiences/exp_01K3Q9M5WJQ2P9X7B4R8S1N6D/publish
Authorization: Bearer lfm_live_…`;

	const getExperience = `GET https://api.liforma.ai/v1/projects/proj_01ABC/experiences/exp_01K3Q9M5WJQ2P9X7B4R8S1N6D
Authorization: Bearer lfm_live_…`;

	const getCharacter = `GET https://api.liforma.ai/v1/projects/proj_01ABC/characters/char_ABC
Authorization: Bearer lfm_live_…`;

	const getPlace = `GET https://api.liforma.ai/v1/projects/proj_01ABC/places/place_ABC
Authorization: Bearer lfm_live_…`;

	const patchCharacter = `PATCH https://api.liforma.ai/v1/projects/proj_01ABC/characters/char_ABC
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "personality": "Warm hotel receptionist.",
  "generalInstructions": "Keep replies short. Stay in character.",
  "gender": "female",
  "age": 28,
  "ethnicity": "european"
}`;

	const patchPlace = `PATCH https://api.liforma.ai/v1/projects/proj_01ABC/places/place_ABC
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "name": "Hotel lobby",
  "locationId": "loc_ABC"
}`;

	const patchClothes = `PATCH https://api.liforma.ai/v1/projects/proj_01ABC/clothes/clothes_ABC
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "name": "Reception uniform"
}`;

	const retryJob = `POST https://api.liforma.ai/v1/projects/proj_01ABC/jobs/job_LOC/retry
Authorization: Bearer lfm_live_…`;

	const catalogByPath = `GET https://api.liforma.ai/v1/projects/proj_01ABC/experiences/english/CEFR/A1/hotel_check_in
Authorization: Bearer lfm_live_…`;

	const catalogList = `GET https://api.liforma.ai/v1/projects/proj_01ABC/experiences
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
	description="Private Publisher API: upload images, create a location and place, clothes and hair, then a character and experience."
	noindex
	next={[
		{ title: 'Alpha index', href: '/_alpha' },
		{ title: 'Experience Catalog', href: '/api-reference/experience-catalog' },
		{ title: 'Sessions', href: '/api-reference/sessions' }
	]}
>
	<p>
		This is an unlisted preview of the private Publisher API. It is not in the public docs sidebar,
		sitemap, or <code>llms.txt</code>. Use a <strong>live project API key</strong>. Never send the
		key to a browser.
	</p>
	<p>
		Prefer the typed Node SDK when you are in JavaScript or TypeScript:
		<a href={resolve('/[x+5f]alpha/publisher-sdk')}><code>@liforma/publisher</code></a>
		handles upload hashing, presigned PUT headers, and job polling. This page documents the
		underlying REST contract.
	</p>
	<p>
		Writes are enabled per organization. If you receive <code>PUBLISHER_NOT_ALLOWED</code>, ask
		Liforma to enable the Publisher API on that org. Test keys are rejected.
	</p>

	<h2>What this API is for</h2>
	<p>
		Create one-character scenes from your own CMS. Upload images for a custom location, clothes, and
		hair; wrap the ready location as a Place; create a Character; then create an Experience.
		Session minting still uses <code>exp_…</code> — see
		<a href={resolve('/api-reference/sessions')}>Sessions</a>.
	</p>
	<p>
		A <strong>location</strong> is the published visual plate (photograph plus generated or supplied
		depth). A <strong>place</strong> is the cheap scene wrapper that points at a ready
		<code>locationId</code>. Experiences attach a place, not a location. Do not flatten the two.
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
		<code>uploadId</code>. Places take a ready <code>locationId</code> only. Create
		clothes, hair, and place bodies do not accept <code>prompt</code> or inline
		<code>image</code>.
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
		Listed avatars include optional <code>gender</code>, <code>age</code>,
		<code>ethnicity</code>, <code>species</code>, and <code>style</code> from the catalogue.
		<code>species</code> and <code>style</code> are free-text labels, not enums — for example
		<code>human</code> and <code>Liforma 3D House Style</code>, or later <code>goblin</code> and
		another house style. Catalogue avatars are not created or updated through this API.
	</p>
	<CodeBlock code={listAvatars} lang="http" />
	<CodeBlock code={avatarResponse} lang="json" />

	<h3>1. Upload the lobby photograph</h3>
	<p>
		Every colour file uses the same three calls: create a session, PUT the bytes once to the
		presigned URL, then complete. Publisher image and depth uploads have a hard
		<strong>20 MiB</strong> maximum, which is more restrictive than the generic 50 MB upload
		ceiling. The Node SDK rejects larger input before creating an upload session. Colour accepts
		JPEG, PNG, or WebP.
	</p>
	<p>
		The bytes are written to the private authoring bucket with a 15-minute presigned PUT URL; the
		API does not return a GET or share URL. The PUT signature includes the declared
		<code>Content-Length</code>, so send that exact header and byte count. The SHA-256 you declare
		must also match the bytes you PUT.
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
	<p>
		The presigned PUT and <code>POST …/complete</code> are idempotent for the same bytes and may
		be retried with bounded backoff after a network failure, <code>429</code>, or
		<code>5xx</code>; honor <code>Retry-After</code>. Do not automatically retry
		<code>POST …/uploads</code> or a resource create. Once an upload is claimed by a resource,
		reusing it for another resource returns <code>409 UPLOAD_ALREADY_CLAIMED</code>. Create a new
		upload session for the second resource.
	</p>

	<h3>2. Create the location, then poll</h3>
	<p>
		<code>POST …/locations</code> returns <code>202</code> immediately with
		<code>{'{ job, location }'}</code>. Omit <code>depth</code> to generate a disparity map from the
		colour image. Do not call an internal run URL. Poll
		<code>GET …/jobs/{'{jobId}'}</code> until <code>status</code> is
		<code>succeeded</code> and <code>requiredOk</code> is <code>true</code>. Then
		<code>GET …/locations/{'{locationId}'}</code> returns <code>{'{ location }'}</code>.
		That GET resolves an org custom location, a published catalogue
		<code>loc_…</code>, or a CDN catalogue id — so
		<code>getLocation(place.locationId)</code> works after wrapping a catalogue
		place. Ready locations include inherited <code>style</code> (currently
		<code>Liforma 3D House Style</code> for every catalogue and custom location). Do not send
		<code>style</code> on create. Omit <code>forceNew</code> to reuse a matching ready or
		in-progress plate for the same image; set <code>forceNew: true</code> to start a new job.
	</p>
	<CodeBlock code={createLocation} lang="http" />
	<CodeBlock code={locationAccepted} lang="json" />
	<CodeBlock code={pollJob} lang="http" />
	<CodeBlock code={jobSucceeded} lang="json" />
	<CodeBlock code={getLocation} lang="http" />
	<CodeBlock code={locationReady} lang="json" />
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
		Places inherit <code>style</code> from the location — currently
		<code>Liforma 3D House Style</code> for every catalogue and custom location. Do not send
		<code>style</code> on create or update; it is fixed and cannot be overridden.
	</p>
	<CodeBlock code={createPlace} lang="http" />
	<CodeBlock code={placeCreated} lang="json" />
	<p>
		Reload with <code>GET …/places/{'{placeId}'}</code>. Rename or point the place at
		another ready location with <code>PATCH</code> — that updates the primary place
		link on attached experiences and does not drop extra scene links.
	</p>
	<CodeBlock code={getPlace} lang="http" />
	<CodeBlock code={patchPlace} lang="http" />

	<h3>4. Upload clothes</h3>
	<p>
		Same upload session as step 1, then <code>202</code> with
		<code>{'{ job, clothes }'}</code> and the same job poll. The plate must be shot for this
		<code>avatarId</code>. <code>backgroundMode</code> defaults to <code>remove</code>. Use
		<code>transparent</code> only for an already cut-out plate. The body requires
		<code>uploadId</code> — there is no prompt or inline image field. Attach
		<code>clothes_ABC</code> only after the job succeeds. Rename later with
		<code>PATCH</code> (name only; this does not republish).
	</p>
	<p>
		With <code>backgroundMode: "transparent"</code>, the uploaded plate must already contain a
		visible transparent cut-out or the job fails with
		<code>EXPECTED_TRANSPARENT_BACKGROUND</code>. With <code>"remove"</code>, the current alpha
		processor expects a removable chroma-style background; an unsupported image fails with
		<code>BACKGROUND_REMOVAL_UNSUPPORTED</code>.
	</p>
	<CodeBlock code={createClothes} lang="http" />
	<CodeBlock code={clothesAccepted} lang="json" />
	<CodeBlock code={patchClothes} lang="http" />

	<h3>5. Upload hair</h3>
	<p>
		Same contract as clothes: <code>{'{ job, hair }'}</code>, then poll
		<code>job_HAIR</code> until <code>succeeded</code>.
	</p>
	<CodeBlock code={createHair} lang="http" />

	<h3>6. Create the character</h3>
	<p>
		<code>201</code> on create, <code>200</code> when <code>externalId</code> already exists.
		Required: <code>avatarId</code>, <code>name</code>, <code>voice</code>,
		<code>sttLang</code>. Optional: <code>clothesId</code>, <code>hairId</code>,
		<code>personality</code>, <code>generalInstructions</code>, <code>gender</code>,
		<code>age</code>, <code>ethnicity</code>, <code>externalId</code>. Character
		copy stays on the character: <code>sttLang</code> is speech recognition,
		<code>generalInstructions</code> is how this person talks. Experience-level scene copy
		(<code>systemInstructions</code>, <code>startingMessage</code>, <code>introduction</code>)
		belongs on the experience, not here. Do not send nested clothes objects.
		<code>voice</code> must be valid for the project’s configured TTS provider.
		<code>gender</code>, <code>age</code>, and <code>ethnicity</code> are optional character
		overrides. Omit them to inherit from the avatar. <code>age</code> is apparent age in years
		from 1 to 1000, so non-human characters can be very old. <code>ethnicity</code> is an appearance
		group for facial features, hair, and skin colour, such as <code>european</code> or
		<code>east-asian</code>. Responses also include inherited <code>style</code> from the
		avatar (currently <code>Liforma 3D House Style</code> for catalogue avatars). Do not send
		<code>style</code> on create or update; unlike gender, age, and ethnicity it cannot be
		overridden. Use matching <code>style</code> values when pairing characters with places.
	</p>
	<CodeBlock code={createCharacter} lang="http" />
	<CodeBlock code={characterCreated} lang="json" />
	<p>
		Reload with <code>GET …/characters/{'{characterId}'}</code>. <code>PATCH</code>
		updates appearance and person copy. Replacing the primary character on an
		experience keeps any supporting cast.
	</p>
	<CodeBlock code={getCharacter} lang="http" />
	<CodeBlock code={patchCharacter} lang="http" />

	<h3>7. Create the experience</h3>
	<p>
		Creates a one-character draft, or publishes immediately when <code>publish</code> is
		<code>true</code>. Scene copy lives here: <code>systemInstructions</code> is the situation,
		<code>startingMessage</code> is the first spoken line, and <code>introduction</code> is the
		learner-facing blurb. <code>PATCH</code> updates the draft and does
		<strong>not</strong> publish — call <code>POST …/publish</code> (or set
		<code>publish: true</code> on create) when you want a new revision.
		Create and GET/PATCH responses include the start-node
		<code>characterId</code>, <code>placeId</code>, and scene copy so a CMS can
		read back what it wrote. <code>GET /v1/projects/{'{projectId}'}/experiences</code>
		on this same path is the
		<a href={resolve('/api-reference/experience-catalog')}>published catalog</a> — a different
		envelope, cache, and error model. Do not use that list as a Publisher read. Use
		<code>GET /v1/projects/{'{projectId}'}/experiences/{'{experienceId}'}</code> for the Publisher
		serializer. That path only matches an <code>exp_…</code> id, so catalog slug lookup is
		unchanged.
	</p>
	<p>
		All Experience fields in this envelope describe the current draft. Use
		<code>status</code> for the experience’s current lifecycle state.
		<code>hasPublishedRevision</code> says whether a published revision exists, while
		<code>hasUnpublishedChanges</code> says whether the returned draft differs from that live
		revision. Immediately after publish they are <code>true</code> and <code>false</code>;
		after a draft-only <code>PATCH</code> they are <code>true</code> and <code>true</code>. The
		deprecated 0.x <code>published</code> compatibility field keeps its older meaning: it is
		<code>true</code> only when <code>status</code> is currently <code>published</code> and a
		published revision exists. An archived experience can therefore have
		<code>hasPublishedRevision: true</code> and <code>published: false</code>. New code should use
		<code>status</code>, <code>hasPublishedRevision</code>, and
		<code>hasUnpublishedChanges</code>.
	</p>
	<CodeBlock code={createExperience} lang="http" />
	<CodeBlock code={experienceResponse} lang="json" />
	<p>
		Mint a session with the returned <code>exp_…</code>. Published catalog lookup is a
		separate contract (list or path). Do not confuse it with Publisher create on the
		same project prefix:
	</p>
	<CodeBlock code={catalogList} lang="http" />
	<CodeBlock code={catalogByPath} lang="http" />

	<h2>Idempotency with <code>externalId</code></h2>
	<p>
		Optional on create. Same <code>externalId</code> in the same project returns the existing row
		(or the existing ingest <code>{'{ job, location }'}</code> /
		<code>{'{ job, clothes }'}</code> / <code>{'{ job, hair }'}</code>) instead of creating a
		duplicate. A
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
		Integrators poll. Do not stream the run. The response is <code>Cache-Control: no-store</code>.
		In this serverless durable-job design, polling may dispatch due work again after an interrupted
		run, so continuing to poll is also the supported resume mechanism.
	</p>
	<p>
		The public job is deliberately slim:
		<code>id</code>, <code>status</code>, <code>kind</code>, <code>pollUrl</code>,
		<code>targetId</code>, <code>requiredOk</code>, <code>stage</code>, <code>progress</code>, and
		<code>error</code>. Status is <code>queued</code>, <code>running</code>,
		<code>waiting_processor</code>, <code>succeeded</code>, or <code>failed</code>. Treat only
		<code>succeeded</code> with <code>requiredOk: true</code> as ready. A client-side polling
		timeout does not cancel the job: retain <code>job.id</code> and resume polling that same URL.
		Do not repeat the create solely because the client stopped waiting.
	</p>
	<p>
		After required retries are exhausted,
		<code>POST …/jobs/{'{jobId}'}/retry</code> starts a new required job on the same clothes, hair,
		or location from the frozen fingerprint. A location retry also resets an unpublished
		location row to <code>draft</code> so GET no longer says <code>failed</code> after
		dispatch. The endpoint accepts only a terminal <code>failed</code> job; any other state returns
		<code>409 JOB_NOT_RETRYABLE</code>. Poll UIs should not automatically retry terminal processor
		errors; call this endpoint when an operator explicitly wants another attempt.
	</p>

	<h3>Slim public resource fields</h3>
	<p>
		<code>GET …/clothes/{'{clothesId}'}</code> returns <code>{'{ clothes }'}</code>,
		<code>…/hair/{'{hairId}'}</code> returns <code>{'{ hair }'}</code>,
		<code>…/locations/{'{locationId}'}</code> returns <code>{'{ location }'}</code>,
		<code>…/characters/{'{characterId}'}</code> returns <code>{'{ character }'}</code>,
		and <code>…/places/{'{placeId}'}</code> returns <code>{'{ place }'}</code>. Clothes and hair
		expose only <code>kind</code>, <code>id</code>, <code>avatarId</code>, <code>name</code>,
		<code>status</code>, <code>source</code>, <code>externalId</code>, and timestamps — not CDN
		paths, compose slugs, or renderer internals.
	</p>
	<ul>
		<li>
			Location: <code>kind</code>, <code>id</code>, <code>status</code>, <code>name</code>,
			<code>depthEncoding</code>, inherited <code>style</code>, <code>externalId</code>.
		</li>
		<li>
			Character: ids, name, avatar/voice/STT settings, clothes/hair ids, personality and
			instructions, optional persona fields, inherited <code>style</code>,
			<code>externalId</code>, and timestamps.
		</li>
		<li>
			Place: <code>id</code>, <code>name</code>, <code>locationId</code>, inherited
			<code>style</code>, <code>externalId</code>, and timestamps.
		</li>
		<li>
			Experience: ids, catalog fields, current-draft scene fields,
			<code>hasPublishedRevision</code>, <code>hasUnpublishedChanges</code>, deprecated
			<code>published</code>, <code>externalId</code>, and timestamps.
		</li>
		<li>
			Create responses for clothes, hair, and location contain only the slim job plus a target
			stub with <code>id</code> and <code>status</code>.
		</li>
	</ul>

	<h2>GET /v1/projects/&#123;projectId&#125;/experiences/&#123;experienceId&#125;</h2>
	<p>
		Returns the Publisher serializer for one experience (<code>exp_…</code>), including
		start-node <code>characterId</code>, <code>placeId</code>, and scene copy. The
		unprefixed <code>/v1/experiences/{'{experienceId}'}</code> path still works temporarily as a
		deprecated compatibility alias. New clients must use the project-prefixed route.
	</p>
	<CodeBlock code={getExperience} lang="http" />

	<h2>PATCH /v1/projects/&#123;projectId&#125;/experiences/&#123;experienceId&#125;</h2>
	<p>
		Update catalog fields and scene copy on the current draft:
		<code>title</code>, <code>slug</code>, <code>attributes</code>,
		<code>characterId</code>, <code>placeId</code>, <code>startingMessage</code>,
		<code>systemInstructions</code>, <code>introduction</code>. This does
		<strong>not</strong> publish a new revision. Moving onto another experience’s slug in the same
		project is <code>409</code> <code>SLUG_CONFLICT</code>. Changing
		<code>placeId</code> replaces the primary place only.
	</p>
	<CodeBlock code={patchExperience} lang="http" />

	<h2>POST /v1/projects/&#123;projectId&#125;/experiences/&#123;experienceId&#125;/publish</h2>
	<p>
		Publishes the current draft. The published revision snapshots <code>slug</code> and
		<code>attributes</code> the same way as title. The old
		<code>POST /v1/experiences/&#123;experienceId&#125;/publish</code> route is a temporary
		deprecated alias.
	</p>
	<CodeBlock code={publishExperience} lang="http" />

	<h2>POST /v1/projects/&#123;projectId&#125;/jobs/&#123;jobId&#125;/retry</h2>
	<p>
		Starts a new required job from the frozen fingerprint of a
		<code>failed</code> job. Returns the same <code>{'{ job, clothes|hair|location }'}</code>
		shape as create. Concurrent calls return the same active retry rather than creating parallel
		jobs for one target.
	</p>
	<CodeBlock code={retryJob} lang="http" />

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
		A single-segment slug cannot look like an experience id (<code>exp_…</code>) — that
		shape is reserved for Publisher GET/PATCH/publish on the same project prefix.
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

	<h2 id="errors">Errors</h2>
	<CodeBlock code={errorExample} lang="json" />
	<p>
		HTTP errors use the envelope above. A processing job still polls with HTTP
		<code>200</code>; terminal processing codes appear in <code>job.error</code>, not as the poll
		response status. This distinction matters for retry behavior.
	</p>
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
					<code>INVALID_DEPTH_MAP</code> / <code>UNSUPPORTED_DEPTH_MAP_TYPE</code>
				</td>
				<td>Upload session or file failed validation</td>
			</tr>
			<tr>
				<td><code>400</code></td>
				<td>
					<code>UNKNOWN_AVATAR</code> / <code>UNKNOWN_VOICE</code> /
					<code>UNKNOWN_APPEARANCE</code> / <code>AVATAR_NOT_COSTUME_CAPABLE</code>
				</td>
				<td>Avatar, voice, or appearance input is not usable for this request</td>
			</tr>
			<tr>
				<td><code>400</code></td>
				<td><code>UNKNOWN_UPLOAD</code></td>
				<td>An asset create references an upload that is missing, incomplete, or the wrong purpose</td>
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
				<td><code>PUBLISHER_NOT_ALLOWED</code> / <code>TEST_KEY_NOT_ALLOWED</code></td>
				<td>Org not enabled, or a test key was used</td>
			</tr>
			<tr>
				<td><code>404</code></td>
				<td>
					<code>PROJECT_NOT_FOUND</code> / <code>UNKNOWN_EXPERIENCE</code> /
					<code>UNKNOWN_UPLOAD</code> / <code>UNKNOWN_JOB</code> /
					<code>UNKNOWN_LOCATION</code> / <code>UNKNOWN_CHARACTER</code> /
					<code>UNKNOWN_PLACE</code> / <code>UNKNOWN_CLOTHES</code> /
					<code>UNKNOWN_HAIR</code>
				</td>
				<td>
					The addressed project or item does not exist in this scope. <code>UNKNOWN_UPLOAD</code>
					is <code>404</code> when completing an unknown upload id, but <code>400</code> when an
					asset-create body references an unusable upload.
				</td>
			</tr>
			<tr>
				<td><code>409</code></td>
				<td>
					<code>SLUG_CONFLICT</code> / <code>EXTERNAL_ID_CONFLICT</code> /
					<code>LOCATION_NOT_READY</code> / <code>UPLOAD_ALREADY_CLAIMED</code> /
					<code>JOB_NOT_RETRYABLE</code>
				</td>
				<td>
					Slug or idempotency conflict, location not ready, upload already consumed, or the job
					is not in a retryable server state
				</td>
			</tr>
			<tr>
				<td><code>500</code></td>
				<td><code>PUBLISHER_FAILED</code></td>
				<td>Unexpected Publisher operation failure; report the request id</td>
			</tr>
			<tr>
				<td><code>503</code></td>
				<td>
					<code>DATABASE_UNAVAILABLE</code> / <code>JOB_RUNNER_UNAVAILABLE</code> /
					<code>LOCATION_CATALOGUE_UNAVAILABLE</code>
				</td>
				<td>Required platform service is temporarily unavailable</td>
			</tr>
		</tbody>
	</table>

	<h3>Terminal job errors</h3>
	<table>
		<thead>
			<tr>
				<th>Code</th>
				<th>Meaning</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<code>EXPECTED_TRANSPARENT_BACKGROUND</code> /
					<code>BACKGROUND_REMOVAL_UNSUPPORTED</code>
				</td>
				<td>The wardrobe image does not satisfy its selected background mode</td>
			</tr>
			<tr>
				<td>
					<code>PROCESSOR_FAILED</code> / <code>PROCESSOR_TIMEOUT</code> /
					<code>PROCESSOR_UNAVAILABLE</code>
				</td>
				<td>Required image-to-depth processing failed, timed out, or was unavailable</td>
			</tr>
			<tr>
				<td><code>INVALID_DEPTH_RANGE</code></td>
				<td>The supplied or generated depth values are not usable</td>
			</tr>
			<tr>
				<td><code>REQUIRED_ARTIFACTS</code> / <code>ORIGIN_VERIFY_FAILED</code></td>
				<td>Required published files are missing or could not be verified</td>
			</tr>
			<tr>
				<td><code>JOB_FAILED</code></td>
				<td>Generic terminal failure when no safer public detail is available</td>
			</tr>
		</tbody>
	</table>
	<p>
		The Node SDK additionally uses local <code>JOB_INCOMPLETE</code> when a terminal success lacks
		<code>requiredOk</code>, and non-retryable <code>JOB_WAIT_TIMEOUT</code> when its local wait
		deadline expires. Neither code means that a new resource create should be submitted.
	</p>

	<h2>0.3 migration</h2>
	<ul>
		<li>
			Switch Publisher item reads, updates, and publishes to
			<code>/v1/projects/&#123;projectId&#125;/experiences/&#123;experienceId&#125;</code>. The
			unprefixed item routes are temporary deprecated aliases, not parallel canonical APIs.
		</li>
		<li>
			Read <code>status</code>, <code>hasPublishedRevision</code>, and
			<code>hasUnpublishedChanges</code>. Keep <code>published</code> only for temporary
			compatibility with its old status-plus-revision behavior; it is not an alias for
			<code>hasPublishedRevision</code>.
		</li>
		<li>
			Stop reading removed internal wardrobe fields such as CDN paths, compose slugs, or renderer
			kinds. Use only the slim fields listed above.
		</li>
		<li>
			On a polling timeout, persist the job id and resume <code>GET job.pollUrl</code>. Retry the
			server job only after it reports <code>failed</code>; do not repeat the asset create.
		</li>
		<li>
			For Node, install <code>@liforma/publisher@^0.3.0</code> and update the application lockfile.
		</li>
	</ul>
</DocPage>
