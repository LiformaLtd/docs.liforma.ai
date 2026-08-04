import { DEMO_EXPERIENCE_ID } from '$lib/navigation';

export const snippets = {
	experienceId: DEMO_EXPERIENCE_ID,

	svelteHelloWorld: `<script>
  import { Experience } from '@liforma/client/svelte';
<\\/script>

<Experience experienceId="${DEMO_EXPERIENCE_ID}" />`,

	reactHelloWorld: `import { Experience } from '@liforma/client/react';

export function Demo() {
  return <Experience experienceId="${DEMO_EXPERIENCE_ID}" />;
}`,

	nextjsSessionRoute: `import { createLiformaSessionRouteHandler } from '@liforma/client/next';

export const POST = createLiformaSessionRouteHandler({
  // Production: supply authorize() that checks your app session.
  // Demos only:
  allowUnauthenticated: true
});`,

	reactAdvancedControl: `import { useRef, useState } from 'react';
import {
  Experience,
  type ExperienceHandle
} from '@liforma/client/react';

export function Lesson() {
  const experienceRef = useRef<ExperienceHandle>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  async function handleStarted() {
    setAudioUnlocked(true);
    await experienceRef.current?.speak({ text: 'Welcome to the lesson.' });
  }

  return (
    <>
      <Experience
        ref={experienceRef}
        experienceId="${DEMO_EXPERIENCE_ID}"
        mode="presenter"
        speechInputMode="manual"
        onStarted={handleStarted}
      />
      <button
        disabled={!audioUnlocked}
        onClick={() => experienceRef.current?.startListening()}
      >
        Start answer
      </button>
      <button
        disabled={!audioUnlocked}
        onClick={() => experienceRef.current?.stopListening()}
      >
        Stop answer
      </button>
    </>
  );
}`,

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

	htmlExperienceHelloWorld: `<!-- Liforma SDK: registers <liforma-experience> and window.Liforma -->
<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>

<div style="width: 100%; min-height: 480px;">
  <liforma-experience experience-id="${DEMO_EXPERIENCE_ID}"></liforma-experience>
</div>`,

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

	jsPresenterAvatar: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  mode: 'presenter',
  speechInputMode: 'off'
});

experience.on('started', async () => {
  await experience.speak({ text: 'Hello! Welcome to the lesson.' });
});

await experience.attach({ container: '#avatar' });`,

	jsVoiceOnlyConversation: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  speechOnly: true,
  mode: 'conversation',
  speechInputMode: 'auto'
});

experience.on('message', (message) => {
  console.log(message.role, message.text, message.status);
});

await experience.attach({ container: '#voice-shell' });`,

	cdnScriptTag: '<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>',

	cdnScriptTagV2: '<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>',

	jsListenToEvents: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}'
});

experience.on('message', (message) => {
  // ConversationMessage: role, text, status ('final'), source, …
  console.log(message.role, message.text, message.status);
});

experience.on('modeChange', (mode) => {
  // 'listening' | 'speaking' | 'thinking'
  console.log('mode:', mode);
});

const player = await experience.attach({
  container: '#avatar',
  onStateUpdate: (state) => console.log('Player embed state', state)
});

player.on('close', ({ reason }) => {
  console.log('Player closed', reason);
});`,

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

	authenticatedReact: `import { Experience } from '@liforma/client/react';

export function PrivateLesson() {
  return (
    <Experience
      experienceId="${DEMO_EXPERIENCE_ID}"
      sessionEndpoint="/api/liforma-session"
    />
  );
}`,

	sessionEndpointServer: `// src/routes/api/liforma-session/+server.ts (SvelteKit)
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { experienceId, language, mode, speechInputMode, speechOnly } = await request.json();

  const res = await fetch('https://api.liforma.ai/v1/sessions', {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${process.env.LIFORMA_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      experienceId,
      ...(language ? { language } : {}),
      ...(mode ? { mode } : {}),
      ...(speechInputMode ? { speechInputMode } : {}),
      ...(speechOnly === true ? { speechOnly: true } : {})
    })
  });

  if (!res.ok) {
    return json({ message: 'Failed to mint session' }, { status: res.status });
  }

  return json(await res.json(), {
    headers: { 'Cache-Control': 'no-store, private' }
  });
}`,

	sessionEndpointNext: `// app/api/liforma-session/route.ts (Next.js App Router)
import { createLiformaSessionRouteHandler } from '@liforma/client/next';

export const POST = createLiformaSessionRouteHandler({
  // Production: supply authorize() that checks your app session.
  // Demos only:
  allowUnauthenticated: true
});`,

	projectCatalogServer: `// src/lib/server/liformaCatalog.ts
import { env } from '$env/dynamic/private';

const API_BASE_URL = env.LIFORMA_API_URL?.replace(/\\/$/, '') ?? 'https://api.liforma.ai';
const PROJECT_ID = env.LIFORMA_PROJECT_ID;

type GalleryThumb = {
  avatarImage: string;
  backgroundImage?: string;
  foregroundImage?: string;
};

export type CatalogExperience = {
  experienceId: string;
  slug: string;
  title: string;
  catalogReady?: boolean;
  galleryThumb?: GalleryThumb;
};

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

  const payload: { experiences: CatalogExperience[] } = await response.json();
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

  const payload: { experience: CatalogExperience } = await response.json();
  return payload.experience;
}`,

	projectCatalogPage: `<!-- src/routes/experiences/+page.svelte -->
<script>
  import { ExperienceThumbnail } from '@liforma/client/svelte';

  let { data } = $props();
<\\/script>

<div class="gallery">
  {#each data.experiences as experience (experience.slug)}
    {#if experience.galleryThumb}
      <a class="card" href="/experiences/{experience.slug}" aria-label={experience.title}>
        <div class="thumb">
          <ExperienceThumbnail galleryThumb={experience.galleryThumb} alt="" />
        </div>
        <span>{experience.title}</span>
      </a>
    {/if}
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
  }
  .thumb {
    width: 100%;
    aspect-ratio: 1;
  }
</style>`,

	svelteThumbnailHosted: `<script>
  import { ExperienceThumbnail } from '@liforma/client/svelte';
<\\/script>

<ExperienceThumbnail
  experienceId={experience.experienceId}
  galleryThumb={experience.galleryThumb}
  alt={experience.title}
/>`,

	svelteThumbnailHref: `<script>
  import { ExperienceThumbnail } from '@liforma/client/svelte';
<\\/script>

<ExperienceThumbnail
  galleryThumb={experience.galleryThumb}
  alt={experience.title}
  href={\`/experiences/\${experience.slug}\`}
/>`,

	svelteThumbnailPresentational: `<a href="/experiences/{experience.slug}" aria-label={experience.title}>
  <ExperienceThumbnail galleryThumb={experience.galleryThumb} alt="" />
</a>`,

	reactThumbnailHosted: `import { ExperienceThumbnail } from '@liforma/client/react';
// Next.js App Router client files can also use:
// import { ExperienceThumbnail } from '@liforma/client/next';

export function GalleryCard({ experience }) {
  return (
    <ExperienceThumbnail
      experienceId={experience.experienceId}
      galleryThumb={experience.galleryThumb}
      alt={experience.title}
    />
  );
}`,

	webComponentThumbnail: `<script type="module" src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>

<liforma-experience-thumbnail
  experience-id="${DEMO_EXPERIENCE_ID}"
  alt="Spanish Cafe"
  gallery-thumb='{"avatarImage":"https://cdn.liforma.ai/avatars/05a87620/256/05a87620_neutral.webp"}'
></liforma-experience-thumbnail>`,

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

	elevenLabsWebComponent: `<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>
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
