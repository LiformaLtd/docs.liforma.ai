# docs.liforma.ai

Developer documentation for the Liforma Avatar Experience Platform.

## Local development

```bash
npm install
npm run dev
```

Runs on **http://localhost:3005** (`strictPort`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (Vercel adapter) |
| `npm run check` | TypeScript and Svelte checks |
| `npm run preview` | Preview production build |

## Structure

- `src/routes/` — documentation pages
- `src/routes/(docs)/` — pages with sidebar layout
- `src/lib/components/` — shared UI (CodeBlock, Sidebar, DocPage, …)
- `src/lib/navigation.ts` — sidebar navigation config
- `src/lib/snippets.ts` — canonical code examples

Content is aligned with `docs/architecture/api_architecture.md` in the meta `liforma` repo.

<!-- deploy verify: git reconnect probe, 2026-07-31 -->
