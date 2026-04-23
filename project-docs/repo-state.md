# Repository State

## Purpose

This repository is a Playwright + TypeScript learning project for maintainable UI automation against `demoqa.com`.

Use this file as a concise restart snapshot for implementation sessions.

## Current Snapshot

- Test stack: `@playwright/test`, TypeScript, `cross-env`, `dotenv`, `@faker-js/faker`.
- Main code areas:
  - `tests/` for spec coverage
  - `tests/unit/` for unit-style coverage of local helper and metadata logic
  - `page-objects/` for page models, base behavior, and shared metadata
  - `data/` for reusable test data
  - `utils/` for shared helpers
- Navigation model:
  - shared `createGotoWithVariants()` helper
  - deterministic `goto()` default
  - explicit `goto.viaMenu()`, `goto.viaDirectLink()`, and `goto.random()`
- Environment model:
  - `playwright.config.ts` loads `.env/<name>.env` from `TEST_ENV`
  - active env files: `.env/dev.env`, `.env/test.env`, `.env/e2e.env`, `.env/fail.env`
- Docs model:
  - publishable docs in `docs/`
  - internal process/state docs in `project-docs/`
  - developer guide source of truth: `docs/developer-how-to.adoc`
  - `project-docs/developer-how-to.md` is a pointer file only

## Validation Snapshot

- `pnpm run typecheck` is available and used as the TS safety gate.
- Local docs build uses `corepack pnpm run docs:build`.
- CI workflow runs a unit-test gate first, then `@sanity`, then full `e2e` only if sanity passes.
- CI publishes report history and docs to GitHub Pages.

## Completed Backlog Items

- `1.5` remove generic timeout-based synchronization workarounds.
- `1.7` docs wording review for factual present-state documentation.
- `1.8` naming convention alignment.
- `2.1` deterministic-by-default navigation with explicit randomized navigation usage.
- `2.2` shared page object structure on `BasePage` + goto helper pattern.
- `2.3` stronger typing for helpers/data builders and typecheck baseline.
- `2.4` section metadata extraction and reuse across page objects/tests.
- `3.2` targeted assertion tightening where broad checks existed.
- `3.3` added small data-driven examples (register/buttons/radiobutton).
- `4.1` setup/env docs improvements with `corepack pnpm` consistency.
- `4.2` short CI/report publishing flow documented in `docs/way-of-working.adoc`.
- `4.3` internal docs split is lightweight: publishable developer guide in `docs/developer-how-to.adoc`, internal pointer in `project-docs/developer-how-to.md`, and concise session workflow in `project-docs/codex-workflow.md`.

## Session Updates (Latest)

- Added unit-style tests in `tests/unit/` for:
  - `utils/gotoHelper.ts`
  - `utils/annotations.ts`
  - `page-objects/metadata/section-metadata.ts`
  - `data/checkboxData.ts`
  - `utils/fakeUser.ts` and `utils/fakeTableUser.ts`
- Updated CI workflow (`.github/workflows/playwright.yml`) to run unit tests as a fail-fast gate before sanity/full runs.
- Updated docs drift cleanup in `docs/features/conventions.adoc` and refreshed backlog wording for `4.4`.

## Active Focus

From `project-docs/backlog.md`:

- `4.4` keep docs build and CI docs build aligned as docs evolve.
- `5.x` reusable architecture strategy (split blueprint, shared package, template/showcases).

## Known Risks and Notes

- Some page objects still use heading-only readiness checks and can be tightened incrementally.
- Stressed runs (parallel/headed/UI) can still surface intermittent failures.
- A recurring local Windows lock can appear on `test-results/.last-run.json` during reruns.

## Update Contract (to avoid drift)

When updating this file:

- keep only high-signal, current facts needed for restart context
- remove stale lines in the same edit pass
- avoid repeating details already obvious from file structure or other docs
- update completed backlog bullets only when an item is actually closed
