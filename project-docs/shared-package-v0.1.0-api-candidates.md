# Shared Package v0.1.0 API Candidates

Purpose: define a small, stable first public API surface for the shared package.

## Proposed Package Scope for v0.1.0

- Keep v0.1.0 narrow and low-risk.
- Export only site-agnostic helpers, contracts, and utility functions.
- Keep DemoQA selectors, page objects, flows, and metadata in consumer repos.

## Proposed Public Exports

Proposed package name placeholder: `@org/playwright-core`.

### Navigation Helpers

- `createGotoWithVariants` from [`utils/gotoHelper.ts`](/c:/dev/learn-playwright/utils/gotoHelper.ts)
- `GotoMethod` type from [`utils/gotoHelper.ts`](/c:/dev/learn-playwright/utils/gotoHelper.ts)
- `GotoVariants` type from [`utils/gotoHelper.ts`](/c:/dev/learn-playwright/utils/gotoHelper.ts)

Rationale:
- Already reusable and site-agnostic.
- Already used via interface pattern (`goto` variants).

### Generic Test Data Generators

- Replace current `FakeUser` export shape with a generic `AppUser` contract.
- Add `generateAppUser(overrides?)` as the shared default user factory.

Rationale:
- Most applications have a user concept, but required fields vary.
- A generic contract with optional fields avoids overfitting to one application.
- Consumer projects can extend or constrain the base shape as needed.

Suggested starter shape for v0.1.0:
- `AppUser`:
  - `username?`
  - `email?`
  - `password?`
  - `firstName?`
  - `lastName?`
  - `fullName?`
- `generateAppUser(overrides?: Partial<AppUser>): AppUser`

Current file mapping note:
- [`utils/fakeUser.ts`](/c:/dev/learn-playwright/utils/fakeUser.ts) is a useful seed for the generator implementation.
- [`utils/fakeTableUser.ts`](/c:/dev/learn-playwright/utils/fakeTableUser.ts) remains project-specific and should stay out of shared v0.1.0.

### Environment and Config Helpers

- Add a generic env helper API for Playwright consumers:
  - `loadEnvConfig(options)`
  - `validateRequiredEnv(keys, source?)`

Rationale:
- This is reusable across template and showcase repos.
- It supports project-specific required keys without hardcoding app values.
- It keeps env validation behavior consistent while leaving `playwright.config.ts` ownership in each consumer repo.

### Optional Utility (Candidate, Not Required for First Cut)

- `checkForBlankCredentials` from [`utils/annotations.ts`](/c:/dev/learn-playwright/utils/annotations.ts)

Rationale:
- Reusable pattern, but lower priority than navigation/data helpers.
- Should be cleaned to plain ASCII log text before package export.

## Explicitly Out of Scope for v0.1.0

- Page objects and selectors under `page-objects/`.
- Site-specific metadata and navigation section definitions:
  - [`page-objects/metadata/section-metadata.ts`](/c:/dev/learn-playwright/page-objects/metadata/section-metadata.ts)
- Site-specific test flows and assertions in `tests/`.
- DemoQA-oriented table-user generator:
  - [`utils/fakeTableUser.ts`](/c:/dev/learn-playwright/utils/fakeTableUser.ts)
- Project-owned config files and CI orchestration:
  - `playwright.config.ts`
  - `.github/workflows/*`
  - project `package.json` scripts
- Environment files and project values:
  - `.env/*.env`
- Documentation site content for specific projects.

## Ownership Split (v0.1.0)

- Shared package owns:
  - reusable helper APIs and types
  - unit tests for shared helper behavior
  - API usage docs and versioned change notes
- Template repo owns:
  - project scaffold and setup instructions
  - docs generation setup and step-by-step usage guide
  - CI workflow templates and baseline scripts
- Showcase repos own:
  - site-specific locators, flows, assertions, and data assumptions

## Open Decisions Before Finalizing v0.1.0

- Decide whether `checkForBlankCredentials` is included in first cut or deferred.
- Decide public import paths style:
  - single root exports only (`@org/playwright-core`)
  - or scoped subpaths (`@org/playwright-core/data`, `@org/playwright-core/navigation`)

## Phased Roadmap After v0.1.0

Keep additions evidence-driven: promote utilities after repeated use across multiple consumer repos.

### v0.2 candidates

- Test infrastructure:
  - baseline reusable fixtures
  - lifecycle hooks utilities
- Synchronization and stability:
  - generic wait/retry wrappers
  - loading-state helpers
- Assertions:
  - common URL/navigation assertions
  - generic UI state assertions

### v0.3+ candidates

- Authentication/session helpers (project-agnostic only).
- API helper layer (request wrappers, auth helpers, optional schema checks).
- Reporting/diagnostics enrichments.
- Browser/network advanced helpers.
- Quality utilities (accessibility/visual/performance helpers), based on proven cross-project demand.
