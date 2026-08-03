<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Embed an Avatar Experience"
	description="Add a Liforma avatar to your web app."
	next={[
		{ title: 'Browser embed', href: '/guides/browser-embed' },
		{ title: 'Experience (Svelte)', href: '/avatar-experiences/svelte' },
		{ title: 'Experience (React)', href: '/avatar-experiences/react' }
	]}
>
	<h2>Choose your integration</h2>
	<table>
		<thead>
			<tr>
				<th>Method</th>
				<th>Best for</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><a href="/avatar-experiences/svelte">Svelte component</a></td>
				<td>Svelte / SvelteKit apps</td>
			</tr>
			<tr>
				<td><a href="/avatar-experiences/react">React component</a></td>
				<td>React (Vite) and Next.js client components</td>
			</tr>
			<tr>
				<td><a href="/avatar-experiences/nextjs">Next.js session helper</a></td>
				<td>App Router server-session mint routes</td>
			</tr>
			<tr>
				<td><a href="/sdk-reference/web-component">Web component</a></td>
				<td>Vue, Angular, plain HTML, no-code tools</td>
			</tr>
			<tr>
				<td><a href="/sdk-reference/javascript">JavaScript SDK</a></td>
				<td>Custom UI, voice-only, programmatic control</td>
			</tr>
			<tr>
				<td>Hosted player</td>
				<td>Link or iframe to <code>player.liforma.ai</code></td>
			</tr>
		</tbody>
	</table>

	<h2>Svelte embed</h2>
	<CodeBlock code={snippets.svelteHelloWorld} lang="svelte" />

	<h2>React embed</h2>
	<p>
		In Next.js App Router, put this in a client component (<code>'use client'</code>). See
		<a href="/avatar-experiences/nextjs">Experience (Next.js)</a> for server-session routes.
	</p>
	<CodeBlock code={snippets.reactHelloWorld} lang="tsx" filename="Demo.tsx" />

	<h2>Web component embed</h2>
	<CodeBlock code={snippets.webComponentHelloWorld} lang="html" />

	<h2>Sizing</h2>
	<p>The avatar fills its container. Set dimensions on the parent element:</p>
	<CodeBlock
		code={`<div class="avatar-stage">
  <Experience experienceId="${snippets.experienceId}" />
</div>

<style>
  .avatar-stage {
    width: 100%;
    max-width: 480px;
    aspect-ratio: 3 / 4;
    border-radius: 12px;
    overflow: hidden;
  }
</style>`}
		lang="svelte"
	/>

	<h2>Full viewport</h2>
	<p>For immersive experiences, let the component fill the viewport:</p>
	<CodeBlock
		code={`<main style="width: 100vw; height: 100dvh;">
  <Experience experienceId="${snippets.experienceId}" />
</main>`}
		lang="svelte"
	/>
</DocPage>
