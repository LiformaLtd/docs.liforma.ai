<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience (Next.js)"
	description="React embed component plus an optional App Router session mint helper."
	next={[
		{ title: 'Server sessions', href: '/avatar-experiences/server-sessions' },
		{ title: 'Experience (React)', href: '/avatar-experiences/react' },
		{ title: 'Experience API', href: '/avatar-experiences/experience-api' }
	]}
>
	<h2>Overview</h2>
	<p>
		Next.js apps use the same <a href="/avatar-experiences/react">React Experience component</a> inside
		a client boundary. For
		<a href="/avatar-experiences/server-sessions">server sessions</a>, add a same-origin API route that
		mints Session Launches with your server API key — the SDK helper returns a standard
		<code>Response</code> (no <code>next</code> package peer dependency).
	</p>

	<h2>Client embed</h2>
	<CodeBlock code={snippets.reactHelloWorld} lang="tsx" filename="app/Demo.tsx" />
	<p>
		In the App Router, mark the file <code>'use client'</code> or import it from a client component.
	</p>

	<h2>Server session route</h2>
	<p>
		<code>createLiformaSessionRouteHandler()</code> reads <code>LIFORMA_API_KEY</code> and
		<code>LIFORMA_API_URL</code> from the environment by default. Override with
		<code>getApiKey</code> / <code>getApiBaseUrl</code> when needed.
	</p>
	<CodeBlock
		code={snippets.nextjsSessionRoute}
		lang="typescript"
		filename="app/api/liforma-session/route.ts"
	/>
	<p>
		The handler validates <code>experienceId</code>, forwards optional launch fields (
		<code>language</code>, <code>mode</code>, <code>speechInputMode</code>,
		<code>speechOnly</code>, <code>startButton</code>, <code>processorId</code>), and responds with
		<code>Cache-Control: no-store, private</code>.
	</p>
	<p>
		On the client, pass <code>sessionEndpoint="/api/liforma-session"</code> with
		<code>experienceId</code> — the SDK POSTs the mint request and attaches the returned Session Launch.
	</p>

	<h2>Example</h2>
	<p>
		See
		<a href="https://github.com/LiformaLtd/examples.liforma.ai/tree/main/examples/guided-practice/nextjs">guided-practice Next.js</a>
		(browser embed by default; optional <code>app/api/liforma-session/route.ts</code> for server
		session demos).
	</p>
</DocPage>
