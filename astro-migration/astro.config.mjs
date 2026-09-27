import { fileURLToPath } from 'node:url';

import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

const libDir = fileURLToPath(new URL('./src/lib', import.meta.url));
const componentsDir = fileURLToPath(new URL('./src/components', import.meta.url));

export default defineConfig({
  site: 'https://docs.liforma.ai',
  output: 'static',
  trailingSlash: 'never',
  redirects: {
    '/api-reference/public-sessions': '/api-reference/browser-sessions',
    '/avatar-experiences/authenticated': '/avatar-experiences/server-sessions',
    '/avatar-experiences/liforma-experience': '/avatar-experiences/svelte',
    '/avatar-experiences/public': '/avatar-experiences/browser-embeds',
    '/guides/authenticated-experience': '/guides/server-session',
    '/guides/public-experience': '/guides/browser-embed'
  },
  integrations: [
    starlight({
      title: 'liforma docs',
      description: 'Developer documentation for Liforma Avatar Experiences.',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/LiformaLtd/docs.liforma.ai/edit/main/astro-migration/'
      },
      social: {
        github: 'https://github.com/LiformaLtd'
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { slug: 'getting-started/introduction', label: 'Introduction' },
            { slug: 'getting-started/quick-start', label: 'Quick Start' },
            { slug: 'getting-started/concepts', label: 'Concepts' }
          ]
        },
        {
          label: 'Avatar Experiences',
          items: [
            { slug: 'avatar-experiences/overview', label: 'Overview' },
            { slug: 'avatar-experiences/html', label: 'Experience (HTML)' },
            { slug: 'avatar-experiences/svelte', label: 'Experience (Svelte)' },
            { slug: 'avatar-experiences/react', label: 'Experience (React)' },
            { slug: 'avatar-experiences/nextjs', label: 'Experience (Next.js)' },
            { slug: 'avatar-experiences/experience-thumbnail', label: 'ExperienceThumbnail' },
            { slug: 'avatar-experiences/experience-widget', label: 'ExperienceWidget' },
            { slug: 'avatar-experiences/experience-api', label: 'Experience API' },
            { slug: 'avatar-experiences/bring-your-own-voice', label: 'Bring your own voice' },
            { slug: 'avatar-experiences/bring-your-own-voice/elevenlabs', label: 'BYO — ElevenLabs' },
            { slug: 'avatar-experiences/bring-your-own-voice/openai', label: 'BYO — OpenAI' },
            { slug: 'avatar-experiences/bring-your-own-voice/google', label: 'BYO — Google' },
            { slug: 'avatar-experiences/bring-your-own-voice/deepgram', label: 'BYO — Deepgram' },
            { slug: 'avatar-experiences/bring-your-own-voice/livekit', label: 'BYO — LiveKit' },
            { slug: 'avatar-experiences/bring-your-own-voice/other-providers', label: 'BYO — Other / files' },
            { slug: 'avatar-experiences/session-manifests', label: 'Session Launch' },
            { slug: 'avatar-experiences/events', label: 'Events' },
            { slug: 'avatar-experiences/browser-embeds', label: 'Browser embeds' },
            { slug: 'avatar-experiences/server-sessions', label: 'Server sessions' }
          ]
        },
        {
          label: 'Capabilities',
          items: [
            { slug: 'capabilities/text-to-avatar', label: 'Text-to-Avatar' },
            { slug: 'capabilities/text-to-speech', label: 'Text-to-Speech' },
            { slug: 'capabilities/speech-to-speech', label: 'Speech-to-Speech' }
          ]
        },
        {
          label: 'Guides',
          items: [
            { slug: 'guides/embed', label: 'Embed an Experience' },
            { slug: 'guides/browser-embed', label: 'Browser embed' },
            { slug: 'guides/oembed', label: 'oEmbed and Iframely' },
            { slug: 'guides/server-session', label: 'Server session' },
            { slug: 'guides/dynamic-experience-gallery', label: 'Dynamic Experience Gallery' },
            { slug: 'guides/events', label: 'Listen to Events' },
            { slug: 'guides/guided-scripted-practice', label: 'Guided Scripted Practice' },
            { slug: 'guides/custom-conversation-processor', label: 'Custom Conversation Processor' },
            { slug: 'guides/listen-once-capture', label: 'Listen Once Capture' },
            { slug: 'guides/customise-characters', label: 'Customise Characters' },
            { slug: 'guides/tools', label: 'Add Tools' },
            { slug: 'guides/migrate-elevenlabs', label: 'Migrate from ElevenLabs' }
          ]
        },
        {
          label: 'API Reference',
          items: [
            { slug: 'api-reference/sessions', label: 'Sessions' },
            { slug: 'api-reference/experience-catalog', label: 'Experience Catalog' },
            { slug: 'api-reference/browser-sessions', label: 'Browser Sessions' },
            { slug: 'api-reference/manifests', label: 'Session Launch' },
            { slug: 'api-reference/errors', label: 'Errors' }
          ]
        },
        {
          label: 'SDK Reference',
          items: [
            { slug: 'sdk-reference/javascript', label: 'JavaScript SDK' },
            { slug: 'sdk-reference/svelte', label: 'Svelte Component' },
            { slug: 'avatar-experiences/react', label: 'React Component' },
            { slug: 'sdk-reference/web-component', label: 'Web Component' }
          ]
        },
        {
          label: 'Trust & Legal',
          items: [
            { label: 'Legal (www)', link: 'https://www.liforma.ai/legal' },
            { label: 'Terms of Service', link: 'https://www.liforma.ai/legal/terms-of-service' },
            { label: 'Privacy Policy', link: 'https://www.liforma.ai/legal/privacy-policy' },
            { label: 'Acceptable Use', link: 'https://www.liforma.ai/legal/acceptable-use' },
            { label: 'Third-party notices', link: 'https://www.liforma.ai/legal/third-party' }
          ]
        }
      ]
    })
  ],
  vite: {
    resolve: {
      alias: {
        '$lib': libDir,
        '$components': componentsDir
      }
    }
  }
});
