Audience: developers working in this repository.
If you are using Codex for implementation workflow, also read `project-docs/codex-workflow.md`.

## First-time setup after clone

Run from the repository root:

`corepack enable`  
`corepack prepare pnpm@10.9.0 --activate`  
`corepack pnpm install`  
`corepack pnpm exec playwright install`

## First 10 minutes

`corepack pnpm run test:spec:dev tests/login.spec.ts`  
`corepack pnpm run show-report`

## Environment selection (`TEST_ENV`)

Test scripts select environment files through `TEST_ENV`:

- `dev` -> `.env/dev.env`
- `test` -> `.env/test.env`
- `e2e` -> `.env/e2e.env`

Examples:

`corepack pnpm run test:dev`  
`corepack pnpm run test:test`  
`corepack pnpm run test:e2e`

## Key dependencies and why they exist

- `@playwright/test`: browser automation test runner and assertion API used by this repo.
- `typescript`: static type checking for tests, page objects, data, and utilities.
- `cross-env`: cross-platform environment variable support in npm scripts (for example `TEST_ENV`).
- `dotenv`: loads environment variables from `.env/<name>.env` via `playwright.config.ts`.
- `@faker-js/faker`: generates realistic test data for forms and table scenarios.
- `@asciidoctor/cli` and `@asciidoctor/core`: build publishable docs from AsciiDoc source.
- `live-server`: previews generated local docs from `localDocs/`.
- `ejs`: templates report index content used by GitHub workflow helper scripts.

## Run all tests

`corepack pnpm run test:dev`  
`corepack pnpm run test:test`  
`corepack pnpm run test:e2e`

`corepack pnpm run test:ui:dev`  
`corepack pnpm run test:ui:test`  
`corepack pnpm run test:ui:e2e`

## Run one spec file

`corepack pnpm run test:spec:dev tests/alerts.spec.ts`  
`corepack pnpm run test:spec:test tests/alerts.spec.ts`  
`corepack pnpm run test:spec:e2e tests/alerts.spec.ts`

`corepack pnpm run test:ui:spec:dev tests/alerts.spec.ts`  
`corepack pnpm run test:ui:spec:test tests/alerts.spec.ts`  
`corepack pnpm run test:ui:spec:e2e tests/alerts.spec.ts`

## Typecheck (TypeScript safety check)

`corepack pnpm run typecheck`

Run typecheck:

- after TypeScript changes in `tests/`, `page-objects/`, `data/`, or `utils/`
- before commit
- before opening or merging a PR

This checks types only and does not run tests.

## Local docs preview

`corepack pnpm run docs:build`  
`corepack pnpm run docs:preview`

## Show test report

`corepack pnpm run show-report`

## Run sanity-only filter

`corepack pnpm run test:e2e -- --grep=@sanity`

## Navigation pattern

- `tests/navigation.spec.ts` is the explicit place where both navigation methods are tested directly.
- In most other feature specs, navigation is setup rather than the behavior under test.
- For shared page objects using `gotoHelper`:

`goto()` = deterministic default navigation  
`goto.viaMenu()` = explicit menu navigation  
`goto.viaDirectLink()` = explicit direct-link navigation  
`goto.random()` = explicit randomized navigation

Current repo pattern:

- use deterministic navigation where the test demonstrates navigation behavior
- use randomized navigation in feature specs when navigation is setup
- keep randomized behavior explicit rather than hidden in default `goto()`

## Current CI behavior

- GitHub Actions runs the `@sanity` tests first.
- If the sanity stage passes, the workflow runs the full `e2e` suite.
- If the sanity stage fails, the full suite is skipped.
- The workflow publishes one report/history entry per run:
  - sanity report if sanity fails
  - full-suite report if sanity passes and the full run completes
- The workflow ends in a failed state if either the sanity stage or the full suite fails.

## Alerts timing note

- `tests/alerts.spec.ts` contains one intentional timing assertion.
- The timed alert scenario verifies that the alert does not appear immediately and then appears within the expected delay window.
