# docs.liforma.ai

Developer documentation for the Liforma Avatar Experience Platform. This repository is the Astro Starlight site at https://docs.liforma.ai.

## Local development

```bash
npm install
npm run dev
```

## OpenAPI

Session mint OpenAPI (`public/openapi/sessions.json`) is **generated** from Zod validators in `api.liforma.ai` — do not hand-edit. From the meta workspace:

```bash
(cd api.liforma.ai && npm run openapi:sessions)
./scripts/sync-session-openapi.sh
./scripts/verify-session-openapi.sh
```

Alpha Publisher OpenAPI (`public/_alpha/openapi/publisher.json`) is copied from `api.liforma.ai/openapi/authoring.json`:

```bash
node scripts/sync-publisher-openapi.mjs
```
