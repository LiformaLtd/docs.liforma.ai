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
        { "id": "clothes_ABC123456789", "name": "Blazer", "source": "library", "libraryScope": "project" }
      ],
      "hair": [
        { "id": "hair_ABC123456789", "name": "Short", "source": "library", "libraryScope": "project" }
      ]
    }
  ]
}`;

	const createCharacter = `POST https://api.liforma.ai/v1/projects/proj_01ABC/characters
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "05a87620",
  "name": "Alex",
  "voice": "<project TTS voice id>",
  "sttLang": "en-US",
  "clothesId": "clothes_ABC123456789",
  "hairId": "hair_ABC123456789",
  "personality": "Warm hotel receptionist.",
  "generalInstructions": "Keep replies short. Stay in character.",
  "externalId": "cms-char-482"
}`;

	const createPlace = `POST https://api.liforma.ai/v1/projects/proj_01ABC/places
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "locationId": "loc_classroom",
  "name": "Hotel lobby",
  "externalId": "cms-place-lobby"
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
  "characterId": "char_ABC123456789",
  "placeId": "place_ABC123456789",
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
    "createdAt": "2026-08-21T12:00:00.000Z",
    "updatedAt": "2026-08-21T12:00:00.000Z"
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
	description="Private /v1 authoring for creating one-character scenes, path slugs, and catalog attributes."
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
		Create a large set of one-character scenes from your own CMS. Each call creates or updates
		platform rows that authors can later open in Studio. Session minting still uses
		<code>exp_…</code> — see
		<a href="/api-reference/sessions">Sessions</a>.
	</p>
	<p>Typical order:</p>
	<ol>
		<li><code>GET</code> costume avatars and existing clothes / hair ids</li>
		<li><code>POST</code> a character</li>
		<li><code>POST</code> a place from a catalogue <code>locationId</code></li>
		<li><code>POST</code> an experience (optionally <code>publish: true</code>)</li>
		<li><code>PATCH</code> title, slug, or attributes later without republishing the scene</li>
	</ol>

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

	<h2>Idempotency with <code>externalId</code></h2>
	<p>
		Optional on create. Same <code>externalId</code> in the same project returns the existing row
		with <code>200</code> instead of creating a duplicate. A <strong>new</strong>
		<code>externalId</code> that reuses another row’s slug still returns <code>409</code>
		<code>SLUG_CONFLICT</code>.
	</p>
	<p>
		Allowed characters: letters, digits, <code>.</code> <code>_</code> <code>:</code>
		<code>-</code>. Max 128.
	</p>

	<h2>GET /v1/projects/&#123;projectId&#125;/avatars</h2>
	<p>
		Lists costume-capable avatars and the clothes / hair already available on the project. Use these
		ids on character create. Prompt or image ingest for new clothes is not available yet.
	</p>
	<CodeBlock code={listAvatars} lang="http" />
	<CodeBlock code={avatarResponse} lang="json" />

	<h2>POST /v1/projects/&#123;projectId&#125;/characters</h2>
	<p><code>201</code> on create, <code>200</code> when <code>externalId</code> already exists.</p>
	<CodeBlock code={createCharacter} lang="http" />
	<p>Required: <code>avatarId</code>, <code>name</code>, <code>voice</code>, <code>sttLang</code>.</p>
	<p>
		Optional: <code>clothesId</code>, <code>hairId</code>, <code>personality</code>,
		<code>generalInstructions</code>, <code>externalId</code>. Do not send nested clothes objects.
	</p>
	<p>
		<code>voice</code> must be valid for the project’s configured TTS provider. Unknown avatar,
		voice, or appearance ids return <code>400</code>.
	</p>

	<h2>POST /v1/projects/&#123;projectId&#125;/places</h2>
	<p>
		Wrap a catalogue location. Provide exactly one of <code>locationId</code>,
		<code>prompt</code>, or <code>image</code>. Prompt generation and image upload are not available
		yet — those fields return <code>400</code>.
	</p>
	<CodeBlock code={createPlace} lang="http" />
	<p>
		Response id is a <code>place_…</code>. The place is enabled on the project for the experience
		create step.
	</p>

	<h2>POST /v1/projects/&#123;projectId&#125;/experiences</h2>
	<p>
		Creates a one-character draft (or publishes immediately when <code>publish</code> is
		<code>true</code>). <code>GET</code> on this same path is the
		<a href="/api-reference/experience-catalog">published catalog</a> — not this authoring create.
	</p>
	<CodeBlock code={createExperience} lang="http" />
	<h3>Response <code>201</code> or <code>200</code></h3>
	<CodeBlock code={experienceResponse} lang="json" />

	<h3>Slug paths</h3>
	<p>
		Store without a leading slash. Studio still displays <code>/</code> as a prefix. Unique per
		project.
	</p>
	<ul>
		<li>Strip leading/trailing <code>/</code>; collapse <code>//</code></li>
		<li>1–8 segments; each <code>[A-Za-z0-9_-]+</code> (so <code>CEFR</code>, <code>A1</code>, and <code>hotel_check_in</code> are legal)</li>
		<li>Max 256 characters total</li>
		<li>Reject <code>.</code>, <code>..</code>, and empty segments</li>
	</ul>
	<p>
		If you <strong>set</strong> <code>slug</code> and that path already exists in the project, the
		API returns <code>409</code> <code>SLUG_CONFLICT</code>. It does not suffix. If you omit
		<code>slug</code>, the server generates a single lowercase kebab from <code>title</code>. Title
		collisions become <code>hotel-check-in-2</code>, then <code>-3</code> — never <code>-1</code>.
	</p>

	<h3>Attributes</h3>
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

	<h2>GET /v1/projects/&#123;projectId&#125;/experiences/&#123;…slug&#125;</h2>
	<p>
		Published catalog lookup. Path slugs work: join segments after
		<code>/experiences/</code>. Only <code>status: published</code> rows are returned. Session mint
		still requires <code>experienceId</code>.
	</p>
	<CodeBlock code={catalogByPath} lang="http" />

	<h2>POST /v1/projects/&#123;projectId&#125;/clothes</h2>
	<p>
		Reserved. Prompt generation and image upload return <code>400</code> (
		<code>PROMPT_GENERATION_UNAVAILABLE</code> /
		<code>IMAGE_UPLOAD_UNAVAILABLE</code>). Use a <code>clothesId</code> from
		<code>GET …/avatars</code>.
	</p>

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
				<td><code>UNKNOWN_AVATAR</code> / <code>UNKNOWN_VOICE</code> / <code>UNKNOWN_APPEARANCE</code></td>
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
				<td><code>UNKNOWN_EXPERIENCE</code> / <code>PROJECT_NOT_FOUND</code></td>
				<td>Unknown id, or key cannot see that project</td>
			</tr>
			<tr>
				<td><code>409</code></td>
				<td><code>SLUG_CONFLICT</code></td>
				<td>Explicit slug already used in this project</td>
			</tr>
			<tr>
				<td><code>503</code></td>
				<td><code>DATABASE_UNAVAILABLE</code></td>
				<td>Platform database unreachable</td>
			</tr>
		</tbody>
	</table>
</DocPage>
