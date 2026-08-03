import { DEMO_EXPERIENCE_ID } from '$lib/navigation';

export const snippets = {
	experienceId: DEMO_EXPERIENCE_ID,

	svelteHelloWorld: `<script>
  import { Experience } from '@liforma/client/svelte';
<\\/script>

<Experience experienceId="${DEMO_EXPERIENCE_ID}" />`,

	svelteAdvancedControl: `<script lang="ts">
  import {
    Experience,
    type ExperienceHandle
  } from '@liforma/client/svelte';

  // Controller from bind:this — undefined until the component mounts.
  let experience: ExperienceHandle | undefined = $state();
  let audioUnlocked = $state(false);

  // Safe point to speak: player start button has unlocked audio.
  async function handleStarted() {
    audioUnlocked = true;
    await experience?.speak({ text: 'Welcome to the lesson.' });
  }

  // Host-owned Start/Stop — manual speech capture for the learner.
  async function startAnswer() {
    if (!experience) return;
    await experience.startListening();
  }

  async function finishAnswer() {
    if (!experience) return;
    const utterance = await experience.stopListening();
    console.log(utterance.text);
  }
<\\/script>

<Experience
  bind:this={experience}
  experienceId="${DEMO_EXPERIENCE_ID}"
  mode="presenter"
  speechInputMode="manual"
  onStarted={handleStarted}
/>

<button disabled={!audioUnlocked || !experience} onclick={startAnswer}>Start answer</button>
<button disabled={!audioUnlocked || !experience} onclick={finishAnswer}>Stop answer</button>`,

	svelteCallbacks: `<script lang="ts">
  import { Experience } from '@liforma/client/svelte';

  function reportError(error: Error) {
    console.error(error);
  }
<\\/script>

<Experience
  experienceId="${DEMO_EXPERIENCE_ID}"
  onReady={({ manifest }) => console.log('Attached', manifest.sessionId)}
  onStarted={({ mode }) => console.log('Audio unlocked', mode)}
  onUserTranscript={(update) => console.log('Transcript', update.text)}
  onStateUpdate={(state) => console.log('Player state', state)}
  onClose={(event) => console.log('Player closed', event)}
  onError={reportError}
/>`,

	webComponentHelloWorld: `<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>

<liforma-experience experience-id="${DEMO_EXPERIENCE_ID}"></liforma-experience>`,

	sveltePresenterSpeech: `<script lang="ts">
  import {
    Experience,
    type ExperienceHandle
  } from '@liforma/client/svelte';

  let experience: ExperienceHandle | undefined = $state();

  async function speakIntro() {
    await experience?.speak({ text: 'Hello! Welcome to the lesson.' });
  }
<\\/script>

<Experience
  bind:this={experience}
  experienceId="${DEMO_EXPERIENCE_ID}"
  mode="presenter"
  speechInputMode="off"
  onStarted={speakIntro}
/>`,

	svelteSpeechOnlyTts: `<script lang="ts">
  import {
    Experience,
    type ExperienceHandle
  } from '@liforma/client/svelte';

  let experience: ExperienceHandle | undefined = $state();

  async function speakPrompt() {
    await experience?.speak({ text: 'Your table is ready.' });
  }
<\\/script>

<Experience
  bind:this={experience}
  experienceId="${DEMO_EXPERIENCE_ID}"
  speechOnly
  mode="presenter"
  speechInputMode="off"
  onStarted={speakPrompt}
/>`,

	svelteSpeechOnlyConversation: `<Experience
  experienceId="${DEMO_EXPERIENCE_ID}"
  speechOnly
  mode="conversation"
  speechInputMode="auto"
  onMessage={(message) => console.log(message.role, message.text)}
/>`,

	jsPresenterSpeechOnly: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  speechOnly: true,
  mode: 'presenter',
  speechInputMode: 'off'
});

experience.on('started', async () => {
  await experience.speak({ text: 'Your table is ready.' });
});

await experience.attach({ container: '#voice-shell' });`,

	jsVoiceOnlyConversation: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  speechOnly: true,
  mode: 'conversation',
  speechInputMode: 'auto'
});

experience.on('message', (message) => {
  console.log(message.role, message.text);
});

await experience.attach({ container: '#voice-shell' });`,

	cdnScriptTag: '<script src="https://cdn.liforma.ai/sdk/v1/client.js"><\\/script>',

	cdnScriptTagV2: '<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>',

	jsStartSession: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}'
});

await experience.attach({ container: '#avatar' });`,

	jsPresenterSession: `const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  mode: 'presenter',
  speechInputMode: 'manual'
});

experience.on('started', async () => {
  await experience.speak({ text: 'Welcome to the lesson.' });
});

await experience.attach({ container: '#avatar' });`,

	jsSpeak: `const result = await experience.speak({
  text: 'Repeat after me: Buenos días.',
  characterId: 'char_…', // optional — defaults to activeCharacterId
  behavior: 'enqueue' // optional — enqueue (default) or interrupt
});

console.log(result.turnId, result.durationMs);`,

	jsManualListening: `await experience.startListening();
// Learner speaks; pauses do not end the utterance in manual mode.
const utterance = await experience.stopListening();
console.log(utterance.utteranceId, utterance.text);`,

	jsConversationGetters: `const history = experience.getConversation();
const lastTurn = experience.getLastTurn();

experience.on('conversationUpdate', (conversation) => {
  console.log('History length', conversation.length);
});`,

	guidedPracticeTurnLoop: `async function runPracticeTurn(line) {
  await experience.speak({ text: line });
  await experience.startListening();
}

async function finishPracticeTurn(line) {
  const utterance = await experience.stopListening();
  const feedback = await getReadingFeedback({
    expectedText: line,
    spokenText: utterance.text
  });
  showFeedback(feedback);
  // Host Next button calls runPracticeTurn(nextLine).
}`,

	svelteGuidedPractice: `<script lang="ts">
  import {
    Experience,
    type ExperienceHandle
  } from '@liforma/client/svelte';

  let experience: ExperienceHandle | undefined = $state();
  let feedback = $state('');
  let audioUnlocked = $state(false);

  async function playTutorLine() {
    audioUnlocked = true;
    await experience?.speak({ text: 'Read this sentence aloud.' });
  }

  async function startAnswer() {
    if (!experience) return;
    await experience.startListening();
  }

  async function finishAnswer() {
    if (!experience) return;
    const utterance = await experience.stopListening();
    feedback = \`You said: \${utterance.text}\`;
  }
<\\/script>

<Experience
  bind:this={experience}
  experienceId="${DEMO_EXPERIENCE_ID}"
  mode="presenter"
  speechInputMode="manual"
  onStarted={playTutorLine}
/>

<button disabled={!audioUnlocked || !experience} onclick={startAnswer}>Start</button>
<button disabled={!audioUnlocked || !experience} onclick={finishAnswer}>Stop</button>
<p>{feedback}</p>`,

	jsListenOnce: `const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  mode: 'presenter',
  speechInputMode: 'auto'
});

experience.on('started', async () => {
  await experience.speak({ text: 'What is your party size?' });
  const answer = await experience.listenOnce({ timeoutMs: 15_000 });
  console.log(answer.utteranceId, answer.text);
});

await experience.attach({ container: '#avatar' });`,

	jsPartialTranscript: `experience.on('userTranscript', (update) => {
  if (!update.isFinal) {
    liveCaptionEl.textContent = update.text;
    return;
  }
  liveCaptionEl.textContent = update.text;
  commitUtterance(update.utteranceId, update.text);
});

experience.on('userSpeechStarted', () => micIndicator.classList.add('active'));
experience.on('userSpeechEnded', () => micIndicator.classList.remove('active'));`,

	jsConversationProcessor: `const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  mode: 'conversation',
  speechInputMode: 'auto',
  conversationProcessor: async ({ text, conversation, signal }) => {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    if (text.toLowerCase().includes('checkout')) {
      return 'Checkout is at 11am. Need a late checkout?';
    }
    if (text.toLowerCase().includes('breakfast')) {
      return 'Breakfast is served until 10 in the lounge.';
    }
    return 'I can help with checkout, breakfast, or directions.';
  }
});

experience.on('conversationProcessorError', ({ utteranceId, message }) => {
  console.error('Processor failed', utteranceId, message);
});

await experience.attach({ container: '#avatar' });`,

	jsConversationProcessorStream: `conversationProcessor: async function* ({ text, signal }) {
  const chunks = buildStoryChunks(text);
  for (const chunk of chunks) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    yield chunk;
  }
}`,

	quizCoachTurnLoop: `async function runQuizQuestion(question, expectedKeyword) {
  await experience.speak({ text: question });
  const answer = await experience.listenOnce({ timeoutMs: 20_000 });
  const correct = answer.text.toLowerCase().includes(expectedKeyword);
  await experience.speak({
    text: correct ? 'Correct!' : 'Not quite — try the next one.',
    behavior: 'interrupt'
  });
}`,

	authenticatedSvelte: `<Experience
  experienceId="${DEMO_EXPERIENCE_ID}"
  sessionEndpoint="/api/liforma-session"
/>`,

	sessionEndpointServer: `// app/api/liforma-session/+server.ts
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { experienceId, userId } = await request.json();

  const res = await fetch('https://api.liforma.ai/v1/sessions', {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${process.env.LIFORMA_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ experienceId, userId })
  });

  if (!res.ok) {
    return json({ message: 'Failed to mint session' }, { status: res.status });
  }

  return json(await res.json());
}`,

	projectCatalogServer: `// src/lib/server/liformaCatalog.ts
import { env } from '$env/dynamic/private';

const API_BASE_URL = env.LIFORMA_API_URL?.replace(/\\/$/, '') ?? 'https://api.liforma.ai';
const PROJECT_ID = env.LIFORMA_PROJECT_ID;

export async function fetchProjectCatalog(fetchFn: typeof fetch) {
  const apiKey = env.LIFORMA_API_KEY?.trim();
  if (!apiKey || !PROJECT_ID) {
    throw new Error('LIFORMA_API_KEY and LIFORMA_PROJECT_ID are required.');
  }

  const response = await fetchFn(
    \`\${API_BASE_URL}/v1/projects/\${encodeURIComponent(PROJECT_ID)}/experiences\`,
    {
      headers: { Authorization: \`Bearer \${apiKey}\` }
    }
  );

  if (!response.ok) {
    throw new Error('Could not load project catalog.');
  }

  const payload: { experiences: Array<{ experienceId: string; slug: string; title: string }> } =
    await response.json();
  return payload.experiences;
}

export async function fetchProjectExperienceBySlug(fetchFn: typeof fetch, slug: string) {
  const apiKey = env.LIFORMA_API_KEY?.trim();
  if (!apiKey || !PROJECT_ID) {
    throw new Error('LIFORMA_API_KEY and LIFORMA_PROJECT_ID are required.');
  }

  const response = await fetchFn(
    \`\${API_BASE_URL}/v1/projects/\${encodeURIComponent(PROJECT_ID)}/experiences/\${encodeURIComponent(slug)}\`,
    {
      headers: { Authorization: \`Bearer \${apiKey}\` }
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Could not load project catalog experience.');
  }

  const payload: { experience: { experienceId: string; slug: string; title: string } } =
    await response.json();
  return payload.experience;
}`,

	projectCatalogPage: `<!-- src/routes/experiences/+page.svelte -->
{#each data.experiences as experience (experience.slug)}
  <a href="/experiences/{experience.slug}">{experience.title}</a>
{/each}`,

	projectCatalogDetailServer: `// src/routes/experiences/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { fetchProjectExperienceBySlug } from '$lib/server/liformaCatalog';

export async function load({ params, fetch }) {
  const experience = await fetchProjectExperienceBySlug(fetch, params.slug);
  if (!experience) error(404, 'Experience not found');
  return { experience };
}`,

	publicSessionsCurl: `curl -X POST https://api.liforma.ai/v1/public-sessions \\
  -H "Origin: https://your-app.com" \\
  -H "Content-Type: application/json" \\
  -d '{"experienceId": "${DEMO_EXPERIENCE_ID}"}'`,

	sessionsCurl: `curl -X POST https://api.liforma.ai/v1/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"experienceId": "${DEMO_EXPERIENCE_ID}"}'`,

	elevenLabsCompat: `import { Conversation } from '@liforma/elevenlabs-compatible';

const conversation = await Conversation.startSession({
  agentId: 'YOUR_AGENT_ID'
});

await conversation.attach({ container: '#avatar' });`,

	webComponentCompat: '<liforma-convai agent-id="YOUR_AGENT_ID"></liforma-convai>',

	elevenLabsWebComponent: `<script src="https://cdn.liforma.ai/sdk/v1/client.js"><\\/script>
<liforma-convai agent-id="YOUR_AGENT_ID"></liforma-convai>`,

	errorResponse: '{ "message": "Human-readable description" }',

	characterManifestSnippet: `"characters": [{
  "characterId": "char_…",
  "displayName": "Sofia",
  "avatarId": "ava_c4e71fe5",
  "voiceId": "es-ES-ElviraNeural",
  "sttLang": "es-ES",
  "agentId": "agt_spanish_tutor"
}]`,

	toolsManifestSnippet: `"tools": [{
  "toolId": "tool_check_score",
  "name": "checkScore",
  "description": "Look up the learner's current score"
}]`,

	manifestExample: `{
  "schemaVersion": 1,
  "sessionId": "sess_01…",
  "experienceId": "${DEMO_EXPERIENCE_ID}",
  "expiresAt": "2026-06-16T12:30:00Z",
  "sessionToken": "eyJ…",
  "experience": {
    "title": "Spanish Tutor Sofia",
    "slug": "spanish-tutor-sofia",
    "mode": "conversation"
  },
  "transport": { "type": "http", "config": { "apiBaseUrl": "https://api.liforma.ai" } },
  "runtime": {
    "cdnBaseUrl": "https://cdn.liforma.ai",
    "input": "browserStt",
    "renderer": "morph2d"
  },
  "characters": [{
    "characterId": "char_…",
    "displayName": "Sofia",
    "avatarId": "ava_c4e71fe5",
    "voiceId": "es-ES-ElviraNeural",
    "sttLang": "es-ES",
    "agentId": "agt_spanish_tutor"
  }],
  "activeCharacterId": "char_…"
}`
} as const;
