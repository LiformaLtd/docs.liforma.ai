<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Experience API"
	description="Programmatic control over Avatar Experience sessions."
	next={[
		{ title: 'Events', href: '/avatar-experiences/events' },
		{ title: 'LiformaExperience', href: '/avatar-experiences/liforma-experience' },
		{ title: 'JavaScript SDK', href: '/sdk-reference/javascript' }
	]}
>
	<h2>Overview</h2>
	<p>
		<code>Experience</code> is the primary JavaScript API. Use it when you need programmatic control
		beyond the component — custom containers, event handling, or presenter sequencing.
	</p>

	<h2>Start a session</h2>
	<CodeBlock code={snippets.jsStartSession} lang="javascript" filename="main.js" />

	<h2>Session inputs</h2>
	<table>
		<thead>
			<tr>
				<th>Input</th>
				<th>Use case</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>{`{ experienceId }`}</code></td>
				<td>Public embed — SDK calls <code>/v1/public-sessions</code></td>
			</tr>
			<tr>
				<td><code>{`{ manifest }`}</code></td>
				<td>Server-minted manifest passed to the client</td>
			</tr>
			<tr>
				<td><code>{`{ experienceId, sessionEndpoint }`}</code></td>
				<td>Authenticated — SDK POSTs to your same-origin route</td>
			</tr>
		</tbody>
	</table>

	<h2>Public configuration</h2>
	<p>
		Pass these options to <code>Experience.startSession()</code>. They are forwarded when the SDK
		mints a public session.
	</p>
	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Values</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>mode</code></td>
				<td><code>conversation</code> | <code>presenter</code></td>
				<td>Managed conversation or host-scripted presentation.</td>
			</tr>
			<tr>
				<td><code>speechInputMode</code></td>
				<td><code>auto</code> | <code>manual</code> | <code>off</code></td>
				<td>Automatic turn detection, explicit listening boundaries, or no microphone.</td>
			</tr>
			<tr>
				<td><code>startButton</code></td>
				<td>Button label, accessibility, placement, variant, and appearance tokens</td>
				<td>Customizes the player-owned startup control.</td>
			</tr>
		</tbody>
	</table>
	<p>
		Conversation sessions default to <code>conversation</code>, managed responses,
		and <code>auto</code> input. Presenter sessions default to <code>presenter</code>, manual
		responses, and <code>manual</code> input.
	</p>
	<p>
		<code>responseMode</code> is an internal advanced option and is deprecated as normal public
		configuration. Choose <code>mode</code> instead.
	</p>

	<h2>Player-owned startup</h2>
	<p>
		The embedded player always renders and owns the actual startup click. Browsers require user
		activation inside the cross-origin player frame before it can unlock audio, so a button in the
		host page cannot replace this interaction.
	</p>
	<p>
		Use the <code>startButton</code> property on <code>StartSessionOptions</code> to adapt the
		built-in control to your interface. Supported placement values are <code>center</code>,
		<code>bottom-center</code>, <code>bottom-left</code>, and <code>bottom-right</code>. Supported
		variants are <code>primary</code>, <code>secondary</code>, and <code>minimal</code>.
	</p>
	<CodeBlock
		code={`const experience = await Experience.startSession({
  experienceId: '${snippets.experienceId}',
  mode: 'presenter',
  startButton: {
    label: 'Begin lesson',
    ariaLabel: 'Begin the guided lesson',
    placement: 'bottom-center', // center | bottom-center | bottom-left | bottom-right
    variant: 'primary', // primary | secondary | minimal
    appearance: {
      backgroundColor: '#635bff',
      textColor: '#ffffff',
      borderColor: '#8179ff',
      borderRadiusPx: 12,
      size: 'large',
      shadow: 'soft'
    }
  }
});

experience.on('started', async ({ mode }) => {
  if (mode === 'presenter') {
    await experience.speak({ text: 'Welcome to the lesson.' });
  }
});

await experience.attach({
  container: document.querySelector('#avatar')
});`}
		lang="javascript"
	/>
	<p>
		<code>started</code> fires after the player button is clicked and audio is unlocked. In presenter
		mode, it is the safe point for host code to call <code>speak()</code>. Button appearance is
		limited to the documented tokens; arbitrary CSS is not supported across the player frame.
	</p>

	<h2>Rendering is separate</h2>
	<p>
		Session creation and rendering configuration are independent. Attach the experience to a
		container to mount the player, display the avatar, and present its startup control.
	</p>
</DocPage>
