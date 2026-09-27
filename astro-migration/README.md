# Astro + Starlight migration

This folder is a side-by-side port of `docs.liforma.ai` from SvelteKit to Astro + Starlight.

The current SvelteKit site remains untouched while this migration is verified.

## Commands

```bash
cd astro-migration
npm install
npm run check
npm run build
npm run dev
```

## Architecture

- Astro 7
- Starlight 0.42
- MDX documentation in `src/content/docs`
- Starlight Pagefind search, sidebar, theme, SEO, table of contents and pagination
- Small compatibility components for existing Liforma code samples and callouts
- Existing `llms.txt` and OpenAPI files copied into `public`
