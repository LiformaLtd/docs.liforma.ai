<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="ExperienceWidget"
	description="Corner site launcher: pass an experience id, the SDK loads preview plates, then expands an in-page conversation overlay on click."
	next={[
		{ title: 'ExperienceThumbnail', href: '/avatar-experiences/experience-thumbnail' },
		{ title: 'Experience (HTML)', href: '/avatar-experiences/html' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>&lt;ExperienceWidget&gt;</code> is the homepage / support “floating widget” pattern: a
		collapsed corner preview that looks like
		<a href="/avatar-experiences/experience-thumbnail">ExperienceThumbnail</a>, then expands to an
		in-page overlay when the user clicks. It is separate from the thumbnail (gallery cards stay
		cheap) and from a full-page <code>&lt;Experience&gt;</code> embed.
	</p>
	<p>
		Pass only <code>experience-id</code> (and <code>alt</code>). On mount the widget calls
		<code>GET /v1/experiences/&#123;id&#125;/preview</code> to load gallery thumb plates — no API key
		and no origin allowlist. Session mint and allowlist checks happen only when the user expands.
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
				<td>Vanilla / CMS</td>
				<td><code>&lt;liforma-experience-widget&gt;</code> via the CDN v2 script</td>
			</tr>
			<tr>
				<td>Svelte</td>
				<td><code>@liforma/client/svelte</code></td>
			</tr>
			<tr>
				<td>React</td>
				<td><code>@liforma/client/react</code></td>
			</tr>
			<tr>
				<td>Next.js</td>
				<td><code>@liforma/client/next</code> (client component)</td>
			</tr>
		</tbody>
	</table>

	<h2>Hello world (HTML)</h2>
	<p>
		Use <code>position="bottom-right"</code> or <code>bottom-left</code> (optional
		<code>offset</code>, default <code>16</code>) for a paste-and-go corner FAB — ideal for CMS /
		WordPress. Default <code>position="static"</code> fills the host so you can place size and
		offsets with your own CSS. On desktop, the open player can <strong>reduce</strong> to a
		draggable portrait dock (~50% of screen height, 9:16); mobile opens near full-screen with close
		only. Preview images load without an allowlist; add your site origin in
		<a href="https://app.liforma.ai">app.liforma.ai</a> before users expand (session mint).
	</p>
	<CodeBlock code={snippets.htmlExperienceWidget} lang="html" filename="index.html" />

	<h2>Svelte / React</h2>
	<CodeBlock code={snippets.svelteExperienceWidget} lang="svelte" filename="Widget.svelte" />
	<CodeBlock code={snippets.reactExperienceWidget} lang="tsx" filename="SiteWidget.tsx" />

	<h2>Loading model</h2>
	<table>
		<thead>
			<tr>
				<th>When</th>
				<th>What loads</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Mount (collapsed)</td>
				<td>
					Public preview API + CDN thumb plates (optional
					<code>gallery-thumb</code> skips the fetch)
				</td>
			</tr>
			<tr>
				<td>Click expand (<code>prefetch="onExpand"</code>)</td>
				<td>Session mint + player iframe; <strong>Tap to talk</strong> unlocks audio</td>
			</tr>
			<tr>
				<td><code>prefetch="idle"</code> / <code>eager</code></td>
				<td>
					Warms a transparent player iframe after idle / immediately so one click unlocks + expands
				</td>
			</tr>
		</tbody>
	</table>

	<h2>Mint options</h2>
	<p>
		Expand uses the same mint surface as <code>&lt;liforma-experience&gt;</code>:
		<code>session-endpoint</code>, <code>language</code>, <code>mode</code>,
		<code>speech-input-mode</code>, <code>speech-only</code>, <code>fit</code>, and start-button label.
	</p>

	<h2>vs ExperienceThumbnail</h2>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Thumbnail</th>
				<th>Widget</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Role</td>
				<td>Gallery / catalog preview</td>
				<td>Site-wide conversation launcher</td>
			</tr>
			<tr>
				<td>Thumb plates</td>
				<td>Caller passes URLs</td>
				<td>Fetched from preview API by default</td>
			</tr>
			<tr>
				<td>Session / iframe</td>
				<td>No (unless hosted launch)</td>
				<td>Yes, after expand</td>
			</tr>
			<tr>
				<td>Default open</td>
				<td>Hosted player + returnUrl</td>
				<td>In-page overlay</td>
			</tr>
		</tbody>
	</table>

	<h2>Example</h2>
	<p>
		Runnable demo:
		<a href="https://examples.liforma.ai/examples/experience-widget/vanilla"
			>examples.liforma.ai — Experience widget</a
		>
		(local <code>http://localhost:4002</code> via <code>./start</code>).
	</p>
</DocPage>
