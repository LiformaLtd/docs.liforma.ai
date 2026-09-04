<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="ExperienceThumbnail"
	description="Layered CDN gallery previews with optional parallax and hosted-player launch — available in Svelte, React, Next.js, and vanilla."
	next={[
		{ title: 'ExperienceWidget', href: '/avatar-experiences/experience-widget' },
		{ title: 'Dynamic Experience Gallery', href: '/guides/dynamic-experience-gallery' },
		{ title: 'Experience Catalog API', href: '/api-reference/experience-catalog' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>&lt;ExperienceThumbnail&gt;</code> renders the same layered Meet-style preview used on
		www.liforma.ai: avatar plate plus optional location background and foreground, with lazy load
		and pointer/scroll parallax. It is a <strong>catalog preview</strong>, not a live player.
	</p>
	<p>
		Painting the thumb needs <strong>no API key and no origin allowlist</strong> — pass
		<code>galleryThumb</code> from your server-side catalog fetch (paths, not CDN hosts). Keys
		and allowlists apply only when a session starts (hosted launch click, or a page that mounts
		<code>&lt;Experience&gt;</code>).
	</p>
	<p>
		Import the <strong>thumbnail entry</strong> (not the full <code>/svelte</code> /
		<code>/react</code> barrel) so gallery and landing pages do not load session / widget code.
	</p>

	<h2>Install</h2>
	<CodeBlock code="npm install @liforma/client" lang="bash" />

	<table>
		<thead>
			<tr>
				<th>Surface</th>
				<th>Import / tag</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Svelte</td>
				<td><code>@liforma/client/svelte/thumbnail</code></td>
			</tr>
			<tr>
				<td>React</td>
				<td><code>@liforma/client/react/thumbnail</code></td>
			</tr>
			<tr>
				<td>Next.js</td>
				<td><code>@liforma/client/next/thumbnail</code> (client component)</td>
			</tr>
			<tr>
				<td>Vanilla</td>
				<td>
					<code>&lt;liforma-experience-thumbnail&gt;</code> via
					<code>https://cdn.liforma.ai/sdk/v2/thumbnail.js</code>
				</td>
			</tr>
		</tbody>
	</table>

	<h2>Zero-config hosted launch</h2>
	<p>
		Pass <code>experienceId</code> and <code>galleryThumb</code> with no <code>href</code> /
		<code>onclick</code>. Click opens
		<code>player.liforma.ai/&#123;experienceId&#125;?returnUrl=…</code> and returns to the embedding
		page on close. Add your site origin to the project allowlist first (launch path only).
	</p>
	<CodeBlock code={snippets.svelteThumbnailHosted} lang="svelte" filename="Card.svelte" />
	<CodeBlock code={snippets.reactThumbnailHosted} lang="tsx" filename="GalleryCard.tsx" />
	<CodeBlock code={snippets.webComponentThumbnail} lang="html" filename="index.html" />

	<h2>App-owned routing</h2>
	<p>
		When your app owns the session page (Meet-style), pass <code>href</code> to your slug route.
		That page should mount <code>&lt;Experience&gt;</code> with <code>experienceId</code> (and
		usually <code>sessionEndpoint</code> for authenticated mint).
	</p>
	<CodeBlock code={snippets.svelteThumbnailHref} lang="svelte" filename="Card.svelte" />

	<h2>Presentational (parent owns the link)</h2>
	<p>
		Omit <code>experienceId</code>, <code>href</code>, and <code>onclick</code>. Wrap the thumb
		yourself and use <code>alt=""</code> when the parent already provides the accessible name.
	</p>
	<CodeBlock code={snippets.svelteThumbnailPresentational} lang="svelte" />

	<h2>Click behaviour</h2>
	<table>
		<thead>
			<tr>
				<th>Provide</th>
				<th>Click does</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>experienceId</code> (no href/onclick)</td>
				<td>Open hosted player; return to this page</td>
			</tr>
			<tr>
				<td><code>href</code></td>
				<td>Navigate to that URL</td>
			</tr>
			<tr>
				<td><code>onclick</code> / <code>onClick</code></td>
				<td>Run your handler (modal, analytics, SPA goto)</td>
			</tr>
			<tr>
				<td>None of the above</td>
				<td>Non-interactive preview</td>
			</tr>
		</tbody>
	</table>
	<p>Priority: <code>href</code> &gt; click-only &gt; hosted default &gt; presentational.</p>
	<p>
		Hosted launch is for <strong>public</strong> experiences. Authenticated gallery cards should use
		<code>href</code> / <code>onclick</code> plus your BFF session route — not the hosted player
		default.
	</p>

	<h2>Props</h2>
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>galleryThumb</code></td>
				<td><code>GalleryThumb</code></td>
				<td>
					Catalog shape: <code>avatarImage</code>, optional
					<code>backgroundImage</code> / <code>foregroundImage</code> — paths or URLs
				</td>
			</tr>
			<tr>
				<td><code>avatarImage</code></td>
				<td><code>string</code></td>
				<td>Flattened alternative to <code>galleryThumb</code></td>
			</tr>
			<tr>
				<td><code>alt</code></td>
				<td><code>string</code></td>
				<td>Accessible name (use <code>""</code> when a parent link names the card)</td>
			</tr>
			<tr>
				<td><code>experienceId</code></td>
				<td><code>string</code></td>
				<td>Required for hosted-player default</td>
			</tr>
			<tr>
				<td><code>href</code></td>
				<td><code>string</code></td>
				<td>App-owned destination; disables hosted default</td>
			</tr>
			<tr>
				<td><code>onclick</code> / <code>onClick</code></td>
				<td><code>(event) =&gt; void</code></td>
				<td>Custom handler; may <code>preventDefault</code> with <code>href</code></td>
			</tr>
			<tr>
				<td><code>returnUrl</code></td>
				<td><code>string</code></td>
				<td>Hosted close destination; default = current page URL</td>
			</tr>
			<tr>
				<td><code>parallax</code></td>
				<td><code>boolean</code></td>
				<td>Default <code>true</code>; respects <code>prefers-reduced-motion</code></td>
			</tr>
			<tr>
				<td><code>lazy</code></td>
				<td><code>boolean</code></td>
				<td>Default <code>true</code>; IntersectionObserver load</td>
			</tr>
			<tr>
				<td><code>backgroundImage</code> / <code>foregroundImage</code></td>
				<td><code>string</code></td>
				<td>
					Full URL, or a Liforma path such as
					<code>/locations/…/scene</code> (the component picks the plate size)
				</td>
			</tr>
			<tr>
				<td><code>cdnBaseUrl</code></td>
				<td><code>string</code></td>
				<td>Optional; default <code>https://cdn.liforma.ai</code> for catalog paths</td>
			</tr>
			<tr>
				<td><code>fallbackImage</code></td>
				<td><code>string</code></td>
				<td>Flat image if the layered avatar fails</td>
			</tr>
		</tbody>
	</table>

	<h2>Layout and image size</h2>
	<p>
		The component <strong>fills its container</strong>. Set width / aspect-ratio on the parent —
		there is no size prop. Pass catalog <strong>paths</strong> (no host, no plate size) and the
		component expands them:
	</p>
	<ul>
		<li>
			Avatars: <code>/avatars/{'{id}'}</code> or <code>/avatars/{'{id}'}/256/…webp</code> → CDN
			<code>/256/</code> plates
		</li>
		<li>
			Locations: <code>/locations/…/scene</code> → square hosts use <code>256x256</code>;
			landscape hosts use <code>800x450</code> (or <code>1672x941</code> when the box is larger)
		</li>
	</ul>
	<p>
		Absolute URLs still work if you already have them. Prefer catalog
		<code>galleryThumb</code> over flat <code>thumbnailPath</code>.
	</p>

	<h2>Gallery walkthrough</h2>
	<p>
		For a full SvelteKit catalog → cards → slug → <code>&lt;Experience&gt;</code> flow, see
		<a href="/guides/dynamic-experience-gallery">Dynamic Experience Gallery</a>.
	</p>
</DocPage>
