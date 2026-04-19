# Repository State

## Purpose

This repository is a Playwright + TypeScript learning project focused on building maintainable UI automation against `demoqa.com`. The current codebase already demonstrates several good testing patterns and is moving toward a reusable automation template while keeping demoqa-specific tests separate from more reusable framework ideas.

## Current Structure

### Present in the repository

- `tests/` contains 12 Playwright spec files covering login, registration, text box, checkbox, buttons, links, alerts, bookstore, navigation, radio buttons, broken links/images, and web tables.
- `pageObjects/` contains 42 files, including page-level models, shared base behavior, a sidebar component, and a simple navigation interface.
- `data/` contains reusable test data definitions such as login data, bookstore data, and navigation metadata.
- `utils/` contains shared helpers for fake data generation, annotations, and multi-strategy navigation helpers.
- `.env/` contains environment-specific config files: `dev.env`, `test.env`, `e2e.env`, and `fail.env`.
- `.github/workflows/` contains one CI workflow for running tests, building docs, and publishing report history to GitHub Pages.
- `.github/scripts/` contains an EJS template and a Node script for generating a historical Playwright report index.
- `docs/` now appears to be reserved for publishable documentation source, currently `docs/index.adoc` plus theme assets.
- `project-docs/` contains internal project guidance such as `repo-state.md`, `codex-workflow.md`, and `learnplaywright.md`.
- `config/` is described in `agents.md` as the place for environment and config handling, but it is not currently present as a top-level folder. At the moment, this responsibility is handled mainly through `playwright.config.ts` and `.env/`.

## Implemented Features

### Test architecture

- Page Object Model is the dominant pattern across the suite.
- Navigation supports multiple strategies through `createGotoWithVariants()` in `utils/gotoHelper.ts`.
- Many tests use `test.step()` well, which makes reports easier to read.
- Data-driven testing is already in use, especially in `tests/login.spec.ts` and `tests/navigation.spec.ts`.
- Faker-based test data generation exists for form and table workflows.
- The web tables flow has been partially tightened so table assertions now rely more on populated row content than raw row container counts.

### Environment management

- `playwright.config.ts` loads environment files from `.env/<name>.env`.
- `BASE_URL` is validated at startup, which is a good early-fail safeguard.
- `package.json` includes separate scripts for `dev`, `test`, and `e2e` runs.

### Documentation and reporting

- `docs/index.adoc` provides a published project overview.
- `project-docs/` separates internal development/process documentation from publishable site documentation.
- `package.json` includes local doc build and preview scripts.
- GitHub Actions publishes Playwright report history and generated docs to GitHub Pages.
- `.github/scripts/render-index.js` creates a browsable history index from prior runs.

## Notable Strengths

- The repo already shows a strong learning-oriented architecture rather than a flat spec-only layout.
- Reusable page object navigation is a clear theme, especially the `goto.viaMenu()` and `goto.viaDirectLink()` pattern.
- Test data is separated from test logic in several places.
- CI, docs, and report publishing are integrated rather than being an afterthought.
- The `docs/` vs `project-docs/` split is a good clarity improvement because publishable content and internal workflow notes now have distinct homes.
- The project covers a broad portion of DemoQA, which is useful for experimenting with reusable abstractions.

## Current Gaps and Improvement Areas

### 1. Structure and consistency

- Some page objects inherit from `BasePage`, while others still duplicate navigation/setup logic independently.
- The documented target structure now aligns more closely with the repo, but `config/` is still described as a top-level area that has not yet been created.
- Naming is a little inconsistent in places, for example `DragablePage.ts` and `AlertsFrameWindowsPage.ts` vs class naming.
- Documentation references are still being normalized after the `docs/` vs `project-docs/` split.

### 2. Locator quality and maintainability

- The repo uses Playwright locators in many places, which is good.
- There are still several CSS selectors, ID selectors, and a few XPath-based locators in page objects.
- Some selectors are likely tied closely to DemoQA implementation details, which may increase maintenance cost.

### 3. Flakiness risks

- `utils/gotoHelper.ts` uses `Math.random()` when plain `goto()` is called, which introduces non-deterministic navigation behavior.
- `tests/alerts.spec.ts` and parts of checkbox-related code use `waitForTimeout`, which conflicts with the repo goal of avoiding hard waits.
- Some flows still rely on broad row counts or broad text checks that may be less stable than more targeted assertions, although `WebTablesPage` has started moving toward content-based matching.

### 4. CI/test selection mismatch

- The GitHub workflow runs `pnpm test:e2e --grep=sanity`.
- Some tests are tagged with `@sanity`, but `tests/navigation.spec.ts` uses `@smoke`.
- As a result, important navigation coverage may be skipped in CI unless tags are intentionally split.

### 5. Type safety and reuse

- Some helper/test functions use loose typing such as `pageObjectClass: any` or `overrides = {}`.
- Repeated page object patterns suggest an opportunity for stronger shared abstractions or typed config-driven page object setup.
- There is a `NavigablePage` interface, but the overall page model contract could be standardized further.

### 6. Documentation accuracy

- `agents.md` is now much closer to the repo as checked in, and it reflects the new `project-docs/` location for internal documentation.
- `project-docs/codex-workflow.md` still references `docs/repo-state.md`, even though the file now lives at `project-docs/repo-state.md`.
- `project-docs/codex-workflow.md` also references `docs/backlog.md`, but there is no backlog file in either `docs/` or `project-docs/` yet.
- `docs/index.adoc` gives a solid overview, but it does not yet document the actual environment model, helper patterns, or current architectural inconsistencies.
- `agents.md` still mentions `config/` as a top-level folder that has not yet been introduced.
- The repo appears to be in the middle of a docs reorganization: `project-docs/learnplaywright.md` exists, while the former top-level `learnplaywright.md` is being removed.

### 7. Current validation status

- `pageObjects/WebTablesPage.ts` now includes more robust row parsing and explicit matching helpers such as `expectMatchingRows()` and `expectNoMatchingRows()`.
- `tests/webTables.spec.ts` has been updated to verify matching records after search instead of relying on raw row counts for the add/search/edit/delete flows.
- A local CLI validation attempt could not fully confirm the fix because Playwright browser launch failed in this environment with a Chromium permission error (`bootstrap_check_in ... Permission denied (1100)`).
- Because of that environment failure, the latest web tables changes should be considered implemented but not fully verified from the command line yet.

## Suggested Near-Term Improvements

1. Make navigation deterministic by removing random default behavior from `createGotoWithVariants()` or limiting randomness to explicitly experimental tests.
2. Replace `waitForTimeout` usage with event-based or assertion-based waits.
3. Standardize page objects around `BasePage` and a shared config pattern to reduce duplication.
4. Align CI tags and local test categorization so `@sanity`, `@smoke`, and other suites have clear intent.
5. Tighten typings in helpers and test data builders.
6. Finish the documentation reference cleanup so workflow prompts point to `project-docs/repo-state.md` and any future backlog file lives in a clearly chosen home.
7. Consider extracting reusable page metadata so navigation specs and page object config stay in sync.
8. Re-run the updated web tables suite in local UI mode and confirm whether the remaining failures, if any, are assertion issues or only environment-related launch problems.

## Summary

The repository is in a good intermediate state: it already demonstrates meaningful Playwright architecture, reusable page objects, environment-based execution, generated test data, and GitHub Pages reporting. The recent `docs/` and `project-docs/` separation is a positive structural improvement, and the web tables coverage has started moving toward stronger content-based assertions. The biggest next step is consistency: make navigation deterministic, reduce hard waits, unify page object patterns, finish aligning the internal documentation references with the current repo layout, and verify the latest web tables changes in a stable local run.
