<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import DocPage from '$lib/components/DocPage.svelte';
	import { snippets } from '$lib/snippets';
</script>

<DocPage
	title="Google → experience.speech"
	description="Drive Liforma from Google Cloud TTS or Gemini Live audio."
	next={[
		{ title: 'Bring your own voice', href: '/avatar-experiences/bring-your-own-voice' },
		{ title: 'OpenAI', href: '/avatar-experiences/bring-your-own-voice/openai' },
		{ title: 'Other providers', href: '/avatar-experiences/bring-your-own-voice/other-providers' }
	]}
>
	<h2>Pattern</h2>
	<p>
		Request LINEAR16 / PCM from Google TTS when you can. Otherwise decode in your host, then stream
		into <code>createUtterance</code>. Liforma never calls Google on your behalf.
	</p>
	<CodeBlock code={snippets.jsSpeechCreateUtterance} lang="javascript" filename="google-turn.js" />

	<h2>Complete utterance</h2>
	<CodeBlock code={snippets.jsSpeechPlayPcm} lang="javascript" />
</DocPage>
