---
title: TVmaze Resolver Exercise
created: 2026-05-13
owner: Tommy
log:
  - 2026-05-13: Initial requirements documented for resolver-focused TVmaze exercise.
---

## Problem

The TVmaze exercise needs a variant matching the original countries exercise style, where the candidate completes resolver behavior and DTO mapping while the datasource is already available.

## Business Context

This short exercise assesses TypeScript backend judgment around GraphQL resolver structure, model mapping, input validation, and typed error responses.

## Goals & KPIs

- Candidate work is concentrated in `src/context.ts`, `src/modules/show/show.mapper.ts`, and `src/modules/show/show.resolver.ts`.
- Datasource code is implemented and not part of the candidate task.
- Resolver and mapper tests fail before implementation and pass after the expected implementation.

## Personas/Journeys

Candidate: reads the README, installs dependencies with bun, runs tests, wires the TVmaze base URL into context, implements mapper/resolver behavior, reruns tests and typecheck.

Reviewer: inspects resolver clarity, mapper edge-case handling, and deterministic summary behavior.

## Functional Requirements

- Provide a working Apollo Server scaffold.
- Provide an implemented TVmaze datasource.
- Leave context base URL wiring plus mapper and resolver behavior as the primary TODOs.
- Test invalid input, not found, upstream failure, successful mapping, and computed summary behavior.

## Non-functional Requirements

- TypeScript strict mode remains enabled.
- Tests mock the datasource and do not require live network access.
- Files remain small and readable.

## Data & Integrations

The datasource can call `https://api.tvmaze.com/shows/{id}` at runtime. Resolver tests use a mocked datasource.

## Security Architecture & Threat Model

Trust boundary: show id input crosses from GraphQL into resolver logic. The resolver must validate input before calling the datasource, return typed errors, and avoid exposing raw upstream failures.

## Performance Strategy & Budgets

The GraphQL `show` query should perform at most one datasource call after validation. Invalid input should skip datasource access.

## Open Questions

- None for the initial version.

## Risks & Mitigations

Risk: candidates spend time on datasource details.

Mitigation: datasource is complete and README points candidates to context, mapper, and resolver files only.

## Success Metrics

- `bun run typecheck` succeeds.
- Tests fail on context, mapper, and resolver TODOs before implementation.
- Tests pass after a correct mapper/resolver implementation.

## Rollout Plan

Publish `tvmaze-resolver/new` as the standalone candidate repository and keep `tvmaze-resolver/complete` local only.

## Next Steps

- Initialize and push the candidate repository.
