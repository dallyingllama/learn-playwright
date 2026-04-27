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
- `4.4` conventions doc directory map aligned with current repository/local outputs and validated with local docs build.

## Session Updates (Latest)

- Closed `5.1` with a documented Antora pilot and recommendation to adopt Antora before split work.
- Started `5.2` by adding Antora pilot scripts in `package.json`:
  - `docs:build:antora`
  - `docs:preview:antora`
- Added Antora pilot command usage to `docs/developer-how-to.adoc`.
- Added minimal pilot artifacts in `spikes/antora-pilot/` and validated Antora output pages:
  - `build/site/index.html`
  - `build/site/demoqa-docs/current/index.html`
  - `build/site/demoqa-docs/current/developer-how-to.html`
  - `build/site/demoqa-docs/current/features/conventions.html`
- Switched CI docs pipeline default to Antora in `.github/workflows/playwright.yml` and publish docs from `spikes/antora-pilot/build/site` into `history/docs`.
- Added CI rollback guard via `DOCS_PIPELINE` env (`antora` default, `asciidoctor` fallback path retained).
- Added explicit redirect generation for `history/docs/index.html` in Antora CI path so old docs entry URL resolves to `docs/demoqa-docs/current/index.html`.
- Confirmed Antora docs build step passes in GitHub Actions and docs are published at `/docs/demoqa-docs/current/index.html`.
- Added local Antora UI baseline artifact `spikes/antora-pilot/ui-bundle.zip`.
- Added editable local Antora UI source in `spikes/antora-pilot/ui-src/` and switched the playbook UI path to `./ui-src`.
- Confirmed `corepack pnpm run docs:build:antora` passes with local `ui-src` path.
- Added Antora docs smoke-check script at `.github/scripts/verify-antora-docs.js` and package command `docs:verify:antora`.
- Added CI Antora validation hook in `.github/workflows/playwright.yml` to run `corepack pnpm run docs:verify:antora` before docs publish copy.
- Confirmed `corepack pnpm run docs:verify:antora` passes after local Antora build.

## Active Focus

From `project-docs/backlog.md`:

- `5.2` migrate docs pipeline to Antora before split work.
- `5.3+` reusable architecture strategy (split blueprint, shared package, template/showcases).

## Known Risks and Notes

- Some page objects still use heading-only readiness checks and can be tightened incrementally.
- Stressed runs (parallel/headed/UI) can still surface intermittent failures.
- A recurring local Windows lock can appear on `test-results/.last-run.json` during reruns.
- Antora build currently emits upstream deprecation/transitive dependency warnings (`DEP0169`, `glob@7`, `inflight@1`) that do not fail the pipeline.

## Update Contract (to avoid drift)

When updating this file:

- keep only high-signal, current facts needed for restart context
- remove stale lines in the same edit pass
- avoid repeating details already obvious from file structure or other docs
- update completed backlog bullets only when an item is actually closed
