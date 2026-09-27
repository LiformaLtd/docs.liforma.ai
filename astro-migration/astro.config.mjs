import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@lib/publisherExamples': fileURLToPath(new URL('./src/lib/publisherExamples.ts', import.meta.url)),
        '@lib/snippets': fileURLToPath(new URL('./src/lib/snippets.ts', import.meta.url)),
        '@lib/navigation': fileURLToPath(new URL('./src/lib/navigation.ts', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url))
      }
    }
  },
  site: 'https://docs.liforma.ai',
  integrations: [
    starlight({
      title: 'Liforma Docs',
      description: 'Developer documentation for Liforma Avatar Experiences.',
      favicon: '/favicon.svg',
      titleDelimiter: '·',
      social: [
        { icon: 'github', label: 'Liforma on GitHub', href: 'https://github.com/LiformaLtd' }
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            'getting-started/introduction',
            'getting-started/quick-start',
            'getting-started/concepts'
          ]
        },
        {
          label: 'Avatar Experiences',
          items: [
            'avatar-experiences/overview',
            'avatar-experiences/html',
            'avatar-experiences/svelte',
            'avatar-experiences/react',
            'avatar-experiences/nextjs',
            'avatar-experiences/experience-thumbnail',
            'avatar-experiences/experience-widget',
            'avatar-experiences/experience-api',
            'avatar-experiences/bring-your-own-voice',
            'avatar-experiences/bring-your-own-voice/elevenlabs',
            'avatar-experiences/bring-your-own-voice/openai',
            'avatar-experiences/bring-your-own-voice/google',
            'avatar-experiences/bring-your-own-voice/deepgram',
            'avatar-experiences/bring-your-own-voice/livekit',
            'avatar-experiences/bring-your-own-voice/other-providers',
            'avatar-experiences/session-manifests',
            'avatar-experiences/events',
            'avatar-experiences/browser-embeds',
            'avatar-experiences/server-sessions'
          ]
        },
        {
          label: 'Capabilities',
          items: [
            'capabilities/text-to-avatar',
            'capabilities/text-to-speech',
            'capabilities/speech-to-speech'
          ]
        },
        {
          label: 'Guides',
          items: [
            'guides/embed',
            'guides/browser-embed',
            'guides/oembed',
            'guides/server-session',
            'guides/dynamic-experience-gallery',
            'guides/events',
            'guides/guided-scripted-practice',
            'guides/custom-conversation-processor',
            'guides/listen-once-capture',
            'guides/customise-characters',
            'guides/tools',
            'guides/migrate-elevenlabs'
          ]
        },
        {
          label: 'API Reference',
          items: [
            'api-reference/sessions',
            'api-reference/experience-catalog',
            'api-reference/browser-sessions',
            'api-reference/manifests',
            'api-reference/errors'
          ]
        },
        {
          label: 'SDK Reference',
          items: [
            'sdk-reference/javascript',
            'sdk-reference/svelte',
            { label: 'React Component', link: '/avatar-experiences/react/' },
            'sdk-reference/web-component'
          ]
        },
        {
          label: 'Trust & Legal',
          items: [
            { label: 'Legal', link: 'https://www.liforma.ai/legal' },
            { label: 'Terms of Service', link: 'https://www.liforma.ai/legal/terms-of-service' },
            { label: 'Privacy Policy', link: 'https://www.liforma.ai/legal/privacy-policy' },
            { label: 'Acceptable Use', link: 'https://www.liforma.ai/legal/acceptable-use' },
            { label: 'Third-party notices', link: 'https://www.liforma.ai/legal/third-party' }
          ]
        }
      ]
    })
  ],
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/api-reference/public-sessions': '/api-reference/browser-sessions',
    '/avatar-experiences/authenticated': '/avatar-experiences/server-sessions',
    '/avatar-experiences/liforma-experience': '/avatar-experiences/svelte',
    '/avatar-experiences/public': '/avatar-experiences/browser-embeds',
    '/guides/authenticated-experience': '/guides/server-session',
    '/guides/public-experience': '/guides/browser-embed'
  }
});
