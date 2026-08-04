<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Experience Catalog"
	description="List published experiences in a project for creator-managed galleries."
	next={[
		{ title: 'ExperienceThumbnail', href: '/avatar-experiences/experience-thumbnail' },
		{ title: 'Dynamic Experience Gallery', href: '/guides/dynamic-experience-gallery' },
		{ title: 'Sessions', href: '/api-reference/sessions' }
	]}
>
	<h2>Overview</h2>
	<p>
		Use the catalog API when your app should automatically reflect experiences created and ordered
		in Studio. Fetch the catalog server-side with your API key, render
		<a href="/avatar-experiences/experience-thumbnail"><code>&lt;ExperienceThumbnail&gt;</code></a>
		from <code>galleryThumb</code>, link by <code>slug</code>, and mint sessions with the returned
		<code>experienceId</code>.
	</p>

	<h2>GET /v1/projects/&#123;projectId&#125;/experiences</h2>
	<p>Returns published experiences in creator-defined order.</p>
	<CodeBlock
		code={`GET https://api.liforma.ai/v1/projects/proj_01ABC/experiences
Authorization: Bearer YOUR_API_KEY`}
		lang="http"
	/>

	<h3>Response <code>200</code></h3>
	<CodeBlock
		code={`{
  "experiences": [
    {
      "experienceId": "exp_01K3Q9M5WJQ2P9X7B4R8S1N6D",
      "slug": "spanish-tutor",
      "title": "Spanish Tutor Sofia",
      "sortOrder": 10,
      "updatedAt": "2026-07-26T12:00:00.000Z",
      "catalogReady": true,
      "avatarId": "05a87620",
      "thumbnailPath": "https://cdn.liforma.ai/avatars/05a87620/256/05a87620_CH.webp",
      "galleryThumb": {
        "avatarImage": "https://cdn.liforma.ai/avatars/05a87620/256/05a87620_neutral.webp"
      },
      "discoveryTags": []
    }
  ]
}`}
		lang="json"
	/>

	<h2>GET /v1/projects/&#123;projectId&#125;/experiences/&#123;slug&#125;</h2>
	<p>Lookup one published experience by project-scoped slug.</p>
	<CodeBlock
		code={`GET https://api.liforma.ai/v1/projects/proj_01ABC/experiences/spanish-tutor
Authorization: Bearer YOUR_API_KEY`}
		lang="http"
	/>

	<h2>Rules</h2>
	<ul>
		<li>Only <code>status: published</code> experiences are returned.</li>
		<li>
			<code>catalogReady: false</code> means the experience is published but missing gallery fields
			in Studio; routing metadata is still returned.
		</li>
		<li><code>slug</code> is unique within a project, not globally.</li>
		<li>Session mint endpoints still require <code>experienceId</code>.</li>
		<li>
			Prefer <code>galleryThumb</code> for UI cards (avatar tier <code>/256/</code>, location plates
			<code>256x256</code>). <code>&lt;ExperienceThumbnail&gt;</code> rewrites larger known CDN
			URLs down to those tiers.
		</li>
		<li>Never expose your API key to the browser.</li>
	</ul>
</DocPage>
