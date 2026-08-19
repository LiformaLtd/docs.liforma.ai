<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="oEmbed and Iframely"
	description="Optional discovery for public Experiences. Platforms resolve a Meet URL to the hosted Liforma Player — the SDK and player API stay unchanged."
	next={[
		{ title: 'Embed an Experience', href: '/guides/embed' },
		{ title: 'Browser embeds', href: '/avatar-experiences/browser-embeds' },
		{ title: 'Direct iframe', href: '/avatar-experiences/html' }
	]}
>
	<h2>What this is</h2>
	<p>
		oEmbed and Iframely are an optional layer <strong>on top of</strong> the existing hosted
		player. They let CMSs, LMSs, and platforms such as Canva turn a public Meet URL into an
		iframe. They do not replace <code>@liforma/client</code>, Session Launch, or
		<code>player.liforma.ai/embed</code>.
	</p>
	<p>Use the SDK or a direct iframe when you are building your own site. Use this path when a platform only accepts a pasteable URL.</p>

	<h2>Who can be discovered</h2>
	<p>
		Only <strong>published Experiences that allow public player-session creation</strong>
		(<code>allowBrowserEmbeds</code>). Authenticated embeds that mint a launch token on your
		server cannot be Iframely-embedded — the host cannot run our SDK.
	</p>
	<p>
		This first release discovers <code>https://www.liforma.ai/meet/&#123;slug&#125;</code> URLs.
	</p>

	<h2>How discovery works</h2>
	<ol>
		<li>A human or platform opens a Meet share URL.</li>
		<li>
			The page exposes canonical, Open Graph, oEmbed, and Iframely metadata. The Iframely
			<code>href</code> is the player, not the Meet page.
		</li>
		<li>
			The platform iframes
			<code>https://player.liforma.ai/embed?experienceId=exp_…</code>
			directly — one visual player iframe.
		</li>
		<li>The player enforces the experience allowlist and self-mints a public session.</li>
	</ol>

	<h2>oEmbed</h2>
	<p>
		<code>GET https://api.liforma.ai/oembed?url=…&amp;format=json</code>
	</p>
	<ul>
		<li><code>url</code> — a Meet share URL (<code>https://www.liforma.ai/meet/&#123;slug&#125;</code>)</li>
		<li><code>format</code> — <code>json</code> only</li>
		<li><code>maxwidth</code> / <code>maxheight</code> — optional; response stays 16:9</li>
	</ul>
	<p>
		A successful response is <code>type: "rich"</code>. The <code>html</code> field is a single
		iframe whose <code>src</code> is the hosted player. External URLs, unpublished Experiences,
		and Experiences with public embeds disabled are rejected.
		<code>thumbnail_url</code> is
		<code>https://cdn.liforma.ai/thumbs/experiences/landscape/&#123;expId&#125;</code>
		— a flattened landscape Experience thumbnail (location + standing avatar),
		not a viseme plate.
		Open Graph and Twitter descriptions use experience copy only: optional
		<code>description</code> (authored or generated at publish), otherwise the
		introduction, otherwise the title.
	</p>
	<CodeBlock
		code={`GET https://api.liforma.ai/oembed?url=https%3A%2F%2Fwww.liforma.ai%2Fmeet%2Fnewton&format=json

{
  "version": "1.0",
  "type": "rich",
  "provider_name": "Liforma",
  "title": "Isaac Newton",
  "html": "<iframe src=\\"https://player.liforma.ai/embed?experienceId=exp_…\\" …></iframe>"
}`}
		lang="json"
	/>

	<h2>Iframely</h2>
	<p>
		Eligible Meet pages also publish an Iframely discovery link. Unrecognized publishers do
		nothing until Iframely reviews the domain — submitting
		<code>www.liforma.ai</code> is an operational step after production metadata is live.
	</p>
	<CodeBlock
		code={`<link
  rel="iframely app microphone fullscreen"
  type="text/html"
  href="https://player.liforma.ai/embed?experienceId=exp_…"
  media="aspect-ratio: 16/9"
/>`}
		lang="html"
	/>
	<p>
		Do not treat <code>autoplay</code> in that <code>rel</code> as an iframe permission — Iframely
		uses it to mean “this widget auto-starts.” Microphone support inside a host such as Canva
		still depends on that host forwarding <code>allow="microphone"</code>.
	</p>

	<h2>Canva</h2>
	<p>
		Canva embeds are Iframely iframes. After Iframely lists Liforma, pasting a Meet URL into a
		design should resolve to the hosted player. A Liforma Canva App is not required for that
		and is not part of this integration.
	</p>
	<p>
		The iframe parent is Canva, not Iframely. The Experience owner must allowlist the real Canva
		origins. We do not open <code>frame-ancestors</code> globally.
	</p>

	<h2>Billing</h2>
	<p>
		For now, self-minted embed sessions (including Canva) are billed to the Experience author /
		owning organization. Viewer-pays / unlock-to-play is a future option.
	</p>
</DocPage>
