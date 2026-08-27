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
    await experienceRef.current?.speech.speak({ text: 'Welcome to the lesson.' });
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
    await experience?.speech.speak({ text: 'Welcome to the lesson.' });
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
  onReady={({ session }) => console.log('Attached', session.id)}
  onStarted={({ mode }) => console.log('Audio unlocked', mode)}
  onUserTranscript={(update) => console.log('Transcript', update.text)}
  onPlayerStatusChange={(status) => console.log('Player status', status)}
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
    await experience?.speech.speak({ text: 'Hello! Welcome to the lesson.' });
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
    await experience?.speech.speak({ text: 'Your table is ready.' });
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
  await experience.speech.speak({ text: 'Your table is ready.' });
});

await experience.attach({ container: '#voice-shell' });`,

	jsPresenterAvatar: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  mode: 'presenter',
  speechInputMode: 'off'
});

experience.on('started', async () => {
  await experience.speech.speak({ text: 'Hello! Welcome to the lesson.' });
});

await experience.attach({ container: '#avatar' });`,

	jsVoiceOnlyConversation: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}',
  speechOnly: true,
  mode: 'conversation',
  speechInputMode: 'auto'
});

experience.on('message', (evt) => {
  console.log(evt.data.role, evt.data.text, evt.data.status);
});

await experience.attach({ container: '#voice-shell' });`,

	cdnScriptTag: '<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>',

	cdnScriptTagV2: '<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>',

	jsListenToEvents: `import { Experience } from '@liforma/client';

const experience = await Experience.startSession({
  experienceId: '${DEMO_EXPERIENCE_ID}'
});

experience.on('message', (evt) => {
  // ExperienceEventEnvelope<data: ConversationMessage>
  console.log(evt.data.role, evt.data.text, evt.data.status);
});

experience.on('activityChange', (evt) => {
  // evt.data: 'idle' | 'listening' | 'thinking' | 'speaking'
  console.log('activity:', evt.data);
});

const player = await experience.attach({
  container: '#avatar',
  onPlayerStatusChange: (status) => console.log('Player status', status)
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
  await experience.speech.speak({ text: 'Welcome to the lesson.' });
});

await experience.attach({ container: '#avatar' });`,

	jsSpeak: `const result = await experience.speech.speak({
  text: 'Repeat after me: Buenos días.',
  characterId: 'char_…', // optional — defaults to activeCharacterId
  queue: 'append' // optional — append (default), replace-active, or replace-all
});

console.log(result.utteranceId, result.durationMs, result.status);`,

	jsSpeechPlayPcm: `await experience.speech.play({
  audio: {
    data: pcmS16leBytes,
    format: { encoding: 'pcm_s16le', sampleRate: 24_000, channels: 1 }
  },
  // Optional but recommended when you have the spoken text — usually improves lipsync.
  transcript: agentReplyText,
  queue: 'append' // append | replace-active | replace-all
});`,

	jsSpeechPlayEncoded: `// Encoded bytes — decoded in the player (not on api.liforma.ai)
await experience.speech.play({
  audio: { data: mp3Bytes, encoding: 'audio/mpeg' },
  queue: 'append'
});

// Or a CORS-open URL fetched + decoded inside the player iframe
await experience.speech.play({
  audio: { url: 'https://cdn.example.com/line.mp3' },
  queue: 'append'
});`,

	jsSpeechPlayMediaStream: `// Live track — captured to PCM in the host SDK, then streamed into the player
await experience.speech.play({
  audio: { track: audioMediaStreamTrack, sampleRate: 24_000 },
  queue: 'replace-active'
});

// Or keep the utterance open while the track runs
const utterance = experience.speech.createUtterance({
  track: audioMediaStreamTrack,
  sampleRate: 24_000,
  queue: 'replace-active'
});
// utterance closes automatically when the track ends`,

	jsSpeechLiveKitSimple: `// After Experience is started (audio unlocked):
// Or copy helloByo.ts from examples/livekit-embed → startByoSpeech(experience, { url, token })
import { connectLiveKitAgent } from '@liforma/client/livekit';

// Mint a LiveKit participant token on your server:
// const { url, token } = await fetch('/api/livekit-token', { method: 'POST' }).then((r) => r.json());

const bridge = await connectLiveKitAgent(experience, {
  url,   // wss://…
  token  // from your mint route
  // enableTranscript: true,           // default — lk.transcription → setTranscript
  // transcriptionTopic: 'lk.transcription',
  // shouldBridgeParticipant: (p) => p.identity.startsWith('agent')
});

// … later
await bridge.end();`,

	jsSpeechLiveKitBridge: `// Advanced: own the LiveKit Room yourself.
// Prefer connectLiveKitAgent from @liforma/client/livekit unless you need full control.
import { Room, RoomEvent, Track } from 'livekit-client';

// Host owns the LiveKit room; Liforma owns avatar playback + lipsync.
// Do not call track.attach() / render an <audio> element for the agent — that doubles the voice.
const room = new Room();
let activeUtterance: ReturnType<typeof experience.speech.createUtterance> | null = null;

room.on(RoomEvent.TrackSubscribed, (track, _publication, participant) => {
  if (track.kind !== Track.Kind.Audio) return;
  // Optional: only bridge the agent participant
  // if (!participant.identity.startsWith('agent')) return;

  const mediaTrack = track.mediaStreamTrack;
  activeUtterance = experience.speech.createUtterance({
    track: mediaTrack,
    sampleRate: 48_000,
    queue: 'replace-active'
  });
  // Optional: room.registerTextStreamHandler('lk.transcription', …)
  // → activeUtterance.setTranscript(text) for force-align lipsync
});

room.on(RoomEvent.TrackUnsubscribed, async (track) => {
  if (track.kind !== Track.Kind.Audio) return;
  activeUtterance = null;
  await experience.speech.interrupt({ scope: 'active' });
});

await room.connect(LIVEKIT_URL, USER_TOKEN);`,

	/** Generic turn map — for custom vendors; prefer provider-specific snippets below. */
	jsSpeechCreateUtterance: `type TurnState = {
  utterance: ReturnType<typeof experience.speech.createUtterance>;
  writes: Promise<void>;
};

const turns = new Map<string, TurnState>();

function beginTurn(turnId, transcript) {
  const utterance = experience.speech.createUtterance({
    format: { encoding: 'pcm_s16le', sampleRate: 24_000, channels: 1 },
    queue: 'replace-active',
    // Optional seed — pass spoken text when available (helps lipsync)
    ...(transcript ? { transcript } : {})
  });
  turns.set(turnId, { utterance, writes: Promise.resolve() });
}

function writeTurn(turnId, chunk) {
  const turn = turns.get(turnId);
  if (!turn) return;
  const u = turn.utterance;
  turn.writes = turn.writes
    .then(() => u.write(chunk))
    .catch((error) => {
      console.error('Unable to write speech audio', error);
      void u.cancel();
    });
}

async function endTurn(turnId, transcript) {
  const turn = turns.get(turnId);
  if (!turn) return;
  turns.delete(turnId);
  await turn.writes;
  await turn.utterance.close({ transcript, history: 'none' });
}

async function cancelTurn(turnId) {
  const turn = turns.get(turnId);
  turns.delete(turnId);
  if (turn) await turn.utterance.cancel();
}`,

	jsSpeechElevenLabsSimple: `// After Experience is started (audio unlocked):
// Or copy helloByo.ts from examples/elevenlabs-embed → startByoSpeech(experience, { signedUrl })
import { connectElevenLabsAgent } from '@liforma/client/elevenlabs';

// Prefer a signed URL from your server in production:
// const signedUrl = await fetch('/api/elevenlabs-signed-url', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ agentId: 'YOUR_AGENT_ID' })
// }).then(async (r) => {
//   const data = await r.json();
//   if (!r.ok) throw new Error(data.error ?? r.statusText);
//   return data.signedUrl as string;
// });

const bridge = await connectElevenLabsAgent(experience, {
  // signedUrl,
  agentId: 'YOUR_AGENT_ID' // demos / public agents
});

// … later
await bridge.end();`,

	jsSpeechElevenLabsBridge: `// Advanced: raw ConvAI WebSocket (no @elevenlabs/client).
// Docs: https://elevenlabs.io/docs/eleven-agents/libraries/web-sockets
// Prefer connectElevenLabsAgent from @liforma/client/elevenlabs unless you need full control.

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

type Turn = {
  utterance: ReturnType<typeof experience.speech.createUtterance>;
  writes: Promise<void>;
};

let sampleRate = 16_000;
let turn: Turn | null = null;

const ws = new WebSocket(SIGNED_CONVAI_URL); // from your backend

ws.onmessage = (ev) => {
  const msg = JSON.parse(String(ev.data));

  if (msg.type === 'conversation_initiation_metadata') {
    const fmt = msg.conversation_initiation_metadata_event?.agent_output_audio_format;
    const m = /^pcm_(\\d+)$/.exec(fmt ?? '');
    if (m) sampleRate = Number(m[1]);
    return;
  }

  if (msg.type === 'ping') {
    const eventId = msg.ping_event?.event_id;
    const delayMs = Number(msg.ping_event?.ping_ms ?? 0);
    const reply = () => ws.send(JSON.stringify({ type: 'pong', event_id: eventId }));
    if (delayMs > 0) setTimeout(reply, delayMs);
    else reply();
    return;
  }

  if (msg.type === 'interruption') {
    const current = turn;
    turn = null;
    void (current
      ? current.utterance.cancel()
      : experience.speech.interrupt({ scope: 'active' }));
    return;
  }

  if (msg.type === 'audio') {
    const b64 = msg.audio_event?.audio_base_64 as string | undefined;
    if (!b64) return;
    if (!turn) {
      const utterance = experience.speech.createUtterance({
        format: { encoding: 'pcm_s16le', sampleRate, channels: 1 },
        queue: 'replace-active'
      });
      turn = { utterance, writes: Promise.resolve() };
    }
    const u = turn.utterance;
    const chunk = base64ToArrayBuffer(b64);
    turn.writes = turn.writes.then(() => u.write(chunk)).catch(console.error);
    return;
  }

  if (msg.type === 'agent_response_complete') {
    // Enable this client event on the agent if you need it.
    const current = turn;
    turn = null;
    if (!current) return;
    void current.writes.then(() => current.utterance.close({ history: 'none' }));
  }
};`,

	jsSpeechOpenAiRealtimeSimple: `// After Experience is started (audio unlocked):
// Or copy helloByo.ts from examples/openai-realtime-embed → startByoSpeech(experience, { ephemeralKey })
import { connectOpenAiRealtime } from '@liforma/client/openai';

// Mint an ephemeral client secret on your server (never ship OPENAI_API_KEY):
// const ephemeralKey = await fetch('/api/openai-realtime-session', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({})
// }).then(async (r) => {
//   const data = await r.json();
//   if (!r.ok) throw new Error(data.error ?? r.statusText);
//   return String(data.value ?? data.ephemeralKey ?? '');
// });

const bridge = await connectOpenAiRealtime(experience, {
  ephemeralKey, // from your mint route
  // captureMic: true,      // default — set false if the host owns the mic
  // mediaStream,           // optional existing stream instead of getUserMedia
  // instructions: 'You are a helpful voice assistant…',
  // model: 'gpt-realtime-2.1',
  // voice: 'marin'
});

// … later
await bridge.end();`,

	jsSpeechOpenAiRealtimeWebRtc: `// Preferred OpenAI browser media path: Realtime over WebRTC.
// Docs: https://platform.openai.com/docs/guides/realtime-webrtc
// Remote track → createUtterance({ track }); transcript via oai-events data channel.

import { connectOpenAiRealtimeWebRtc } from '@liforma/client/openai';

// Mint an ephemeral client secret on your server (same as the WebSocket helper).
const bridge = await connectOpenAiRealtimeWebRtc(experience, {
  ephemeralKey,
  // instructions: 'You are a helpful voice assistant…',
  // captureMic: true,
});

// Do not also attach the remote track to an <audio> element.
await bridge.end();`,

	jsSpeechOpenAiRealtimeBridge: `// Advanced: OpenAI Realtime WebSocket on your server, PCM forwarded to the browser.
// Docs: https://platform.openai.com/docs/guides/realtime-conversations
// Prefer connectOpenAiRealtime from @liforma/client/openai unless you terminate OpenAI on a server.
// Server holds the OpenAI key; browser only talks to your proxy + Liforma.

// --- Browser ---
type Turn = {
  utterance: ReturnType<typeof experience.speech.createUtterance>;
  writes: Promise<void>;
};
let turn: Turn | null = null;

yourProxy.onPcmChunk((chunk: ArrayBuffer) => {
  if (!turn) {
    const utterance = experience.speech.createUtterance({
      format: { encoding: 'pcm_s16le', sampleRate: 24_000, channels: 1 },
      queue: 'replace-active'
    });
    turn = { utterance, writes: Promise.resolve() };
  }
  const u = turn.utterance;
  turn.writes = turn.writes.then(() => u.write(chunk)).catch(console.error);
});

yourProxy.onResponseDone(async () => {
  const current = turn;
  turn = null;
  if (!current) return;
  await current.writes;
  await current.utterance.close({ history: 'none' });
});

yourProxy.onSpeechStarted(() => {
  const current = turn;
  turn = null;
  void (current ? current.utterance.cancel() : experience.speech.interrupt({ scope: 'active' }));
});

// --- Server (Node) ---
// ws to wss://api.openai.com/v1/realtime?...
// on response.output_audio.delta → decode base64 → forward ArrayBuffer to browser
// on response.output_audio.done / response.done → signal browser to close
// on input_audio_buffer.speech_started → signal barge-in`,

	jsSpeechOpenAiTtsPlay: `// Classic OpenAI TTS — split server fetch from browser play.
// Docs: https://platform.openai.com/docs/guides/text-to-speech
// response_format: "pcm" → raw pcm_s16le @ 24 kHz (no WAV header).

// --- Server (Node / BFF) ---
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const speech = await openai.audio.speech.create({
  model: 'gpt-4o-mini-tts',
  voice: 'alloy',
  input: 'Welcome to the lesson.',
  response_format: 'pcm'
});
return new Response(await speech.arrayBuffer(), {
  headers: { 'Content-Type': 'application/octet-stream' }
});

// --- Browser ---
const res = await fetch('/api/tts', {
  method: 'POST',
  body: JSON.stringify({ text: 'Welcome to the lesson.' })
});
const pcm = new Uint8Array(await res.arrayBuffer());
await experience.speech.play({
  audio: {
    data: pcm,
    format: { encoding: 'pcm_s16le', sampleRate: 24_000, channels: 1 }
  },
  queue: 'append'
});`,

	jsSpeechGeminiLiveSimple: `// After Experience is started (audio unlocked):
// Or copy helloByo.ts from examples/gemini-live-embed → startByoSpeech(experience, { proxyUrl })
import { connectGeminiLive } from '@liforma/client/google';

// Proxy terminates Gemini Live BidiGenerateContent (never ship Google API keys):
// const proxyUrl = /* wss://your-origin/api/gemini-live */;

const bridge = await connectGeminiLive(experience, {
  proxyUrl
  // captureMic: true // default — streams PCM @ 16 kHz as realtimeInput.mediaChunks
});

// … later
await bridge.end();`,

	jsSpeechGoogleTtsPlay: `// Google Cloud Text-to-Speech — server synthesizes; browser plays.
// Docs: https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize
// Non-streaming LINEAR16 includes a WAV header → pass as audio/wav.

// --- Server ---
import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();
const [response] = await client.synthesizeSpeech({
  input: { text: 'Welcome to the lesson.' },
  voice: { languageCode: 'en-US', name: 'en-US-Chirp3-HD-Charon' },
  audioConfig: {
    audioEncoding: 'LINEAR16',
    sampleRateHertz: 24_000
  }
});
return new Response(response.audioContent as Uint8Array, {
  headers: { 'Content-Type': 'audio/wav' }
});

// --- Browser ---
const res = await fetch('/api/google-tts', {
  method: 'POST',
  body: JSON.stringify({ text: 'Welcome to the lesson.' })
});
const wavBytes = new Uint8Array(await res.arrayBuffer());
await experience.speech.play({
  audio: { data: wavBytes, encoding: 'audio/wav' },
  queue: 'append'
});`,

	jsSpeechGeminiLiveBridge: `// Advanced: own the Gemini Live proxy WebSocket yourself.
// Prefer connectGeminiLive from @liforma/client/google unless you need full control.
// Docs: https://ai.google.dev/gemini-api/docs/live-api
// outputTranscription is delivered independently — accumulate it; do not read it only on turnComplete.

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

type Turn = {
  utterance: ReturnType<typeof experience.speech.createUtterance>;
  writes: Promise<void>;
  transcript: string;
};

const SAMPLE_RATE = 24_000;
let turn: Turn | null = null;

function beginTurn(): Turn {
  const utterance = experience.speech.createUtterance({
    format: { encoding: 'pcm_s16le', sampleRate: SAMPLE_RATE, channels: 1 },
    queue: 'replace-active'
  });
  turn = { utterance, writes: Promise.resolve(), transcript: '' };
  return turn;
}

async function finishTurn(): Promise<void> {
  const current = turn;
  turn = null;
  if (!current) return;
  await current.writes;
  await current.utterance.close({
    transcript: current.transcript || undefined,
    history: 'none'
  });
}

ws.onmessage = (ev) => {
  const msg = JSON.parse(String(ev.data));
  const content = msg.serverContent;
  if (!content) return;

  if (content.interrupted) {
    const current = turn;
    turn = null;
    void (current
      ? current.utterance.cancel()
      : experience.speech.interrupt({ scope: 'active' }));
    return;
  }

  // Independent of modelTurn / turnComplete ordering
  if (content.outputTranscription?.text) {
    const current = turn ?? beginTurn();
    current.transcript += content.outputTranscription.text;
    void current.utterance.setTranscript(current.transcript);
  }

  for (const part of content.modelTurn?.parts ?? []) {
    const b64 = part.inlineData?.data as string | undefined;
    if (!b64) continue;
    const current = turn ?? beginTurn();
    const chunk = base64ToArrayBuffer(b64);
    const u = current.utterance;
    current.writes = current.writes.then(() => u.write(chunk)).catch(console.error);
  }

  // Prefer generationComplete when present (audio generation finished).
  // turnComplete can lag while the API assumes client-side playback timing.
  if (content.generationComplete || content.turnComplete) {
    void finishTurn();
  }
};`,

	jsSpeechDeepgramSimple: `// After Experience is started (audio unlocked):
// Or copy helloByo.ts from examples/deepgram-embed → startByoSpeech(experience, { proxyUrl })
import { connectDeepgramAgent } from '@liforma/client/deepgram';

// Same-origin proxy to wss://agent.deepgram.com/v1/agent/converse (API key stays server-side):
// const proxyUrl = /* wss://your-origin/api/deepgram-agent */;

const bridge = await connectDeepgramAgent(experience, {
  proxyUrl,
  // agent: { listen / think / speak } — audio I/O formats are enforced by the helper
});

// … later
await bridge.end();`,

	jsSpeechDeepgramAgentBridge: `// Advanced: own the Deepgram Voice Agent WebSocket yourself.
// Prefer connectDeepgramAgent from @liforma/client/deepgram unless you need full control.
// Docs: https://developers.deepgram.com/docs/voice-agent-message-flow
// Handshake: Welcome → Settings → SettingsApplied → then audio.
// Output must set container: "none" for headerless linear16 PCM.

const SAMPLE_RATE = 24_000;

type Turn = {
  utterance: ReturnType<typeof experience.speech.createUtterance>;
  writes: Promise<void>;
};

let turn: Turn | null = null;
let settingsApplied = false;

// Prefer a same-origin proxy (browser cannot set Authorization on WebSocket).
const ws = new WebSocket(YOUR_DEEPGRAM_AGENT_PROXY_URL);
ws.binaryType = 'arraybuffer';

const AGENT_SETTINGS = {
  type: 'Settings',
  audio: {
    input: { encoding: 'linear16', sample_rate: 16_000 },
    output: {
      encoding: 'linear16',
      sample_rate: SAMPLE_RATE,
      container: 'none'
    }
  },
  agent: {
    /* listen / think / speak — see Deepgram Settings docs */
  }
};

ws.onmessage = (ev) => {
  if (ev.data instanceof ArrayBuffer) {
    if (!settingsApplied) return; // ignore audio until SettingsApplied
    if (!turn) {
      const utterance = experience.speech.createUtterance({
        format: { encoding: 'pcm_s16le', sampleRate: SAMPLE_RATE, channels: 1 },
        queue: 'replace-active'
      });
      turn = { utterance, writes: Promise.resolve() };
    }
    const u = turn.utterance;
    const chunk = ev.data;
    turn.writes = turn.writes.then(() => u.write(chunk)).catch(console.error);
    return;
  }

  const msg = JSON.parse(String(ev.data));

  if (msg.type === 'Welcome') {
    // Do not send Settings until Welcome arrives.
    ws.send(JSON.stringify(AGENT_SETTINGS));
    return;
  }

  if (msg.type === 'SettingsApplied') {
    settingsApplied = true;
    return;
  }

  if (msg.type === 'UserStartedSpeaking') {
    const current = turn;
    turn = null;
    void (current
      ? current.utterance.cancel()
      : experience.speech.interrupt({ scope: 'active' }));
    return;
  }

  if (msg.type === 'AgentAudioDone') {
    const current = turn;
    turn = null;
    if (!current) return;
    void current.writes.then(() => current.utterance.close({ history: 'none' }));
  }
};`,

	jsManualListening: `await experience.startListening();
// Learner speaks; pauses do not end the utterance in manual mode.
const utterance = await experience.stopListening();
console.log(utterance.utteranceId, utterance.text);`,

	jsConversationGetters: `const history = experience.getConversation();
const lastTurn = experience.getLastTurn();

experience.on('conversationUpdate', (evt) => {
  console.log('History length', evt.data.length);
});`,

	guidedPracticeTurnLoop: `async function runPracticeTurn(line) {
  await experience.speech.speak({ text: line });
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
    await experience?.speech.speak({ text: 'Read this sentence aloud.' });
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
  await experience.speech.speak({ text: 'What is your party size?' });
  const answer = await experience.listenOnce({ timeoutMs: 15_000 });
  console.log(answer.utteranceId, answer.text);
});

await experience.attach({ container: '#avatar' });`,

	jsPartialTranscript: `experience.on('userTranscript', (evt) => {
  const update = evt.data;
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

experience.on('conversationProcessorError', (evt) => {
  console.error('Processor failed', evt.data.utteranceId, evt.data.message);
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
  await experience.speech.speak({ text: question });
  const answer = await experience.listenOnce({ timeoutMs: 20_000 });
  const correct = answer.text.toLowerCase().includes(expectedKeyword);
  await experience.speech.speak({
    text: correct ? 'Correct!' : 'Not quite — try the next one.',
    queue: 'replace-active'
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

	htmlExperienceWidget: `<!-- Liforma SDK: registers <liforma-experience-widget> and window.Liforma -->
<script src="https://cdn.liforma.ai/sdk/v2/client.js"><\\/script>

<!-- WordPress / CMS friendly: corner placement without host CSS -->
<liforma-experience-widget
  experience-id="${DEMO_EXPERIENCE_ID}"
  alt="Talk to our barista"
  position="bottom-right"
  offset="16"
></liforma-experience-widget>

<!-- Or position="static" (default) and wrap with your own fixed host CSS -->`,

	svelteExperienceWidget: `<script>
  import { ExperienceWidget } from '@liforma/client/svelte';
</script>

<ExperienceWidget
  experienceId="${DEMO_EXPERIENCE_ID}"
  alt="Talk to our barista"
  position="bottom-right"
  offset={16}
/>`,

	reactExperienceWidget: `import { ExperienceWidget } from '@liforma/client/react';
// Next.js: import { ExperienceWidget } from '@liforma/client/next';

export function SiteWidget() {
  return (
    <ExperienceWidget
      experienceId="${DEMO_EXPERIENCE_ID}"
      alt="Talk to our barista"
      position="bottom-right"
      offset={16}
    />
  );
}`,

	projectCatalogDetailServer: `// src/routes/experiences/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { fetchProjectExperienceBySlug } from '$lib/server/liformaCatalog';

export async function load({ params, fetch }) {
  const experience = await fetchProjectExperienceBySlug(fetch, params.slug);
  if (!experience) error(404, 'Experience not found');
  return { experience };
}`,

	browserSessionsCurl: `curl -X POST https://api.liforma.ai/v1/browser-sessions \\
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

	errorResponse: `{
  "error": {
    "code": "ORIGIN_NOT_ALLOWED",
    "message": "Human-readable description",
    "requestId": "req_…"
  }
}`,

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
}`,

	publisherInstall: `npm install @liforma/publisher`,

	publisherHotelCheckIn: `import { readFileSync } from 'node:fs';
import { createPublisher } from '@liforma/publisher';

const publisher = createPublisher(process.env.LIFORMA_PROJECT_ID!, {
  apiKey: process.env.LIFORMA_API_KEY!
});

const avatars = await publisher.listAvatars();
const avatar = avatars[0]!;

const background = await publisher.uploadImage(readFileSync('./lobby.png'), {
  contentType: 'image/png'
});
const location = await publisher.createLocation({
  name: 'Hotel lobby',
  image: background
});
const place = await publisher.createPlace({
  name: 'Hotel lobby',
  locationId: location.id
});

const clothesImage = await publisher.uploadImage(readFileSync('./clothes.png'), {
  contentType: 'image/png'
});
const hairImage = await publisher.uploadImage(readFileSync('./hair.png'), {
  contentType: 'image/png'
});
const [clothes, hair] = await Promise.all([
  publisher.createClothes({
    avatarId: avatar.id,
    image: clothesImage,
    backgroundMode: 'remove'
  }),
  publisher.createHair({
    avatarId: avatar.id,
    image: hairImage,
    backgroundMode: 'remove'
  })
]);

const character = await publisher.createCharacter({
  avatarId: avatar.id,
  name: 'Front desk',
  voice: avatar.defaultVoiceId,
  sttLang: avatar.defaultSttLang,
  clothesId: clothes.id,
  hairId: hair.id,
  gender: 'female',
  age: 28,
  ethnicity: 'european',
  generalInstructions: 'Keep replies short. Stay in character.'
});

const experience = await publisher.createExperience({
  title: 'Hotel check-in',
  characterId: character.id,
  placeId: place.id,
  startingMessage: 'Welcome. How can I help you today?',
  systemInstructions: 'You are a hotel receptionist. Help the guest check in.',
  introduction: 'Practice checking into a hotel.',
  publish: true
});

console.log(experience.id);`,

	publisherJobs: `import { LiformaPublisherError } from '@liforma/publisher';

const started = await publisher.startLocation({
  name: 'Hotel lobby',
  image: background
});

try {
  for await (const job of publisher.jobs.watch(started.job.id, { timeoutMs: 60_000 })) {
    console.log(job.status, job.progress);
  }
} catch (error) {
  if (!(error instanceof LiformaPublisherError) || error.code !== 'JOB_WAIT_TIMEOUT') throw error;
  // Persist started.job.id. The durable server job is still running.
}

// Resume later with the same id; do not repeat startLocation.
await publisher.jobs.wait(started.job.id);
const location = await publisher.getLocation(started.job.targetId);

const depth = await publisher.uploadDepthMap(readFileSync('./lobby-depth.png'), {
  contentType: 'image/png'
});
const replacement = await publisher.createLocation({
  name: 'Hotel lobby',
  image: background,
  depth: { image: depth, depthMapType: 'disparity' },
  forceNew: true
});`,

	publisherReloadAndUpdate: `const character = await publisher.getCharacter(characterId);
const place = await publisher.getPlace(placeId);
const experience = await publisher.getExperience(experienceId);

await publisher.updateClothes(clothesId, { name: 'Reception uniform' });
await publisher.updatePlace(place.id, { name: 'Hotel lobby', locationId: place.locationId });
await publisher.updateCharacter(character.id, {
  personality: 'Warm hotel receptionist.',
  generalInstructions: 'Keep replies short. Stay in character.',
  gender: 'female',
  age: 28,
  ethnicity: 'european'
});
await publisher.updateExperience(experience.id, {
  title: 'Hotel check-in (A1)',
  startingMessage: 'Welcome. How can I help you today?',
  systemInstructions: 'You are a hotel receptionist. Help the guest check in.',
  introduction: 'Practice checking into a hotel.'
});
await publisher.publishExperience(experience.id);`
} as const;
