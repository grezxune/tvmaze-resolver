# AGENTS.md

## Project Focus

This repository is a resolver-focused TVmaze GraphQL candidate exercise. Keep candidate-facing work centered on `src/context.ts`, `src/modules/show/show.mapper.ts`, and `src/modules/show/show.resolver.ts`.

## Engineering Rules

- Use `pnpm` for dependency installation and scripts.
- Preserve strict TypeScript settings.
- Keep the datasource implemented for this exercise version.
- Keep docs candidate-facing and avoid leaking solution code into `README.md`.
- Update `CHANGELOG.md` for meaningful exercise changes.

## Verification

```bash
pnpm run typecheck
pnpm test
```
