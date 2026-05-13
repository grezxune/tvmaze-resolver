# TypeScript + GraphQL Resolver Exercise

## Overview

You are joining a codebase that exposes a small GraphQL API over the public [TVmaze API](https://www.tvmaze.com/api). The datasource and server wiring are already in place. Your main job is to finish the GraphQL resolver and mapping layer.

This version mirrors the original countries exercise shape: the candidate work is centered on resolver behavior, GraphQL-facing mapping, input validation, and deterministic computed fields.

## Timebox

This exercise is designed to take roughly **30 to 40 minutes** for a strong candidate.

## What You Are Building

The service exposes:

- `show(id: ID!): ShowLookupResult!`

The public `Show` type stays intentionally small:

- `id`
- `name`
- `detail`
- `tags`
- `summary`

Use this REST API base URL:

```text
https://api.tvmaze.com
```

## Your Task

Make the supplied tests pass by completing:

- `src/context.ts`
- `src/modules/show/show.mapper.ts`
- `src/modules/show/show.resolver.ts`

The datasource in `src/datasources/tvmaze-api.ts` is already implemented for this version, but the base URL still needs to be wired into the application context.

## Functional Requirements

### `show(id)`

Implement the query resolver with the following behavior:

- Trim the incoming `id`.
- Treat the normalized value as a positive integer string.
- If the normalized value is invalid, return `INVALID_INPUT`.
- If the datasource returns no match, return `NOT_FOUND`.
- If the datasource throws an upstream failure, return `UPSTREAM_ERROR`.
- On success, return the mapped show and no error.

### `Show.summary`

Implement a deterministic computed `summary` field derived from the mapped `ShowModel`.

It should include:

- the show name
- the show id
- the genre, or a fallback
- the detail/language, or a fallback
- the rating metric

### REST DTO Mapping

Implement the mapper with the following behavior:

- `id` comes from the datasource record id.
- `name` comes from the datasource record name.
- `detail` comes from `language`, or `null` when blank/missing.
- `genre` should map supported TVmaze genres into the internal model enum.
- `metric` should default to `0` when the rating is missing.
- `tags` should be a sorted copy of the genres array.

## How To Run

```bash
bun install
bun run test
bun run typecheck
```

## Submission Guidance

Please leave the project in a runnable state where:

- `bun run test` completes successfully
- `bun run typecheck` succeeds

If you make assumptions, note them briefly in code comments or in a short written note.
