import { DEMO_EXPERIENCE_ID } from '$lib/navigation';

export const snippets = {
	experienceId: DEMO_EXPERIENCE_ID,

	svelteHelloWorld: `<script>
  import { LiformaExperience } from '@liforma/client/svelte';
<\\/script>

<LiformaExperience experienceId="${DEMO_EXPERIENCE_ID}" />`,

	webComponentHelloWorld: `<script src="https://cdn.liforma.ai/sdk/v1/client.js"><\\/script>

<liforma-experience experience-id="${DEMO_EXPERIENCE_ID}"></liforma-experience>`,

	cdnScriptTag: '<script src="https://cdn.liforma.ai/sdk/v1/client.js"><\\/script>',

	jsStartSession: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}'
});

await experience.attach({ container: '#avatar' });`,

	authenticatedSvelte: `<LiformaExperience
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
