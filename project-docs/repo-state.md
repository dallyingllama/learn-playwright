# Repository State

## Purpose

This repository is a Playwright + TypeScript learning project focused on building maintainable UI automation against `demoqa.com`. The codebase demonstrates several good testing patterns and separates demoqa-specific coverage from more reusable framework ideas.

## Current Structure

### Present in the repository

- `tests/` contains 12 Playwright spec files covering login, registration, text box, checkbox, buttons, links, alerts, bookstore, navigation, radio buttons, broken links/images, and web tables.
- `page-objects/` contains the active Page Object Model files, including page-level models, shared base behavior, a sidebar component, and a simple navigation interface.
- `data/` contains reusable test data definitions such as login data, bookstore data, and navigation metadata.
- `utils/` contains shared helpers for fake data generation, annotations, and multi-strategy navigation helpers.
- `.env/` contains environment-specific config files: `dev.env`, `test.env`, `e2e.env`, and `fail.env`.
- `.github/workflows/` contains one CI workflow for running tests, building docs, uploading artifacts, and publishing report history to GitHub Pages.
- `.github/scripts/` contains an EJS template and a Node script for generating a historical Playwright report index.
- `docs/` contains a publishable documentation set: `docs/index.adoc`, supporting topic pages, feature/guideline subfolders, `_includes/`, and theme assets.
- `project-docs/` contains internal project guidance such as `repo-state.md`, `codex-workflow.md`, `learn-playwright.md`, and `backlog.md`.
- `config/` is described in `agents.md` as the place for environment and config handling, but it is not currently present as a top-level folder. At the moment, this responsibility is handled mainly through `playwright.config.ts` and `.env/`.

## Implemented Features

### Test architecture

- Page Object Model is the dominant pattern across the suite.
- Navigation supports multiple strategies through `createGotoWithVariants()` in `utils/gotoHelper.ts`.
- Shared page objects use deterministic `goto()` by default, explicit `goto.viaMenu()` and `goto.viaDirectLink()` methods, and explicit randomized navigation through `goto.random()`.
- `tests/navigation.spec.ts` is the explicit navigation coverage spec for menu and direct-link navigation methods.
- Feature specs such as alerts, bookstore, broken links/images, buttons, checkbox, links, radio button, and web tables use explicit randomized navigation when navigation is setup rather than the behavior under test.
- `tests/login.spec.ts` and `tests/textBox.spec.ts` demonstrate a deterministic baseline plus randomized follow-up pattern.
- Many tests use `test.step()` well, which makes reports easier to read.
- Data-driven testing is already in use, especially in `tests/login.spec.ts` and `tests/navigation.spec.ts`.
- Faker-based test data generation exists for form and table workflows.
- The web tables flow has been tightened so table assertions rely more on populated row content than raw row container counts.
- The checkbox flow has been simplified substantially: hierarchy structure now lives in `data/checkboxData.ts`, the page object is aligned with the current `rc-tree` DOM, and the tests now focus on hierarchy expansion plus checkbox/result-message behavior instead of outdated click strategies.
- Broken Links / Images assertions have been adjusted to match the current DemoQA page intent and to be less timing-sensitive in command-line runs.
- The suite uses `@sanity` as a lightweight example tag, with one representative test tagged in each spec file.
- `tests/alerts.spec.ts` includes one intentional timing assertion for the delayed-alert scenario.
- `page-objects/login-page.ts` uses user-visible post-login assertions such as `/profile`, `Logout`, and visible username text instead of fragile login-state locators.
- `page-objects/base-page.ts` contains the shared home-card navigation helper used by many menu-based page objects.
- Several page objects use stronger `waitForPageReady()` checks based on meaningful controls rather than heading-only assertions. Recent examples include Alerts, Book Store, Check Box, Links, Web Tables, Frames, Auto Complete, Upload and Download, and Dynamic Properties.

### Environment management

- `playwright.config.ts` loads environment files from `.env/<name>.env`.
- `BASE_URL` is validated at startup, which is a good early-fail safeguard.
- `package.json` includes separate scripts for `dev`, `test`, and `e2e` runs.
- `package.json` includes reusable single-spec scripts for both headless and UI mode.

### Documentation and reporting

- `docs/index.adoc` provides a published project overview.
- `project-docs/` separates internal development/process documentation from publishable site documentation.
- `package.json` includes local doc build and preview scripts.
- `package.json` pins the package manager as `pnpm@10.9.0`.
- The local docs workflow uses `docs:build` and `docs:preview`.
- The local docs build walks the full `docs/` tree recursively and writes matching `.html` output into `localDocs/`, including nested `features/` and `guidelines/` pages.
- GitHub Actions publishes Playwright report history and generated docs to GitHub Pages.
- The GitHub workflow activates the pinned `pnpm@10.9.0` version declared in `package.json`.
- The GitHub workflow runs `@sanity` first and runs the full suite only when that gate passes.
- The CI test steps call Playwright directly with `pnpm exec cross-env ... playwright test`.
- The GitHub Actions docs build mirrors the recursive local docs build by generating nested HTML pages.
- `.github/scripts/render-index.js` creates a browsable history index from prior runs.
- The workflow uses current GitHub Action major versions and a Node 24 runtime.
- `project-docs/codex-workflow.md` tells new sessions to use `AGENTS.md`, `project-docs/repo-state.md`, and `project-docs/backlog.md` together.
- `project-docs/backlog.md` acts as the working list for follow-up improvements and tech-debt cleanup.
- The published AsciiDoc pages describe the repo structure, `pnpm` usage, and test/docs workflow.
- `AGENTS.md` includes a documentation-writing rule: describe the repository as it is today with simple factual statements and avoid unnecessary comparison language.

## Notable Strengths

- The repo already shows a strong learning-oriented architecture rather than a flat spec-only layout.
- Reusable page object navigation is a clear theme, especially the `goto.viaMenu()` and `goto.viaDirectLink()` pattern.
- Test data is separated from test logic in several places.
- CI, docs, and report publishing are integrated rather than being an afterthought.
- The `docs/` vs `project-docs/` split gives publishable content and internal workflow notes distinct homes.
- The publishable site is organized as a small documentation set rather than a single landing page.
- The local preview experience matches the published site structure because doc-to-doc links target generated `.html` pages and nested pages are built locally.
- The CI workflow demonstrates a staged test strategy without creating duplicate history entries for sanity-only runs.
- The project covers a broad portion of DemoQA, which is useful for experimenting with reusable abstractions.
- Recent Check Box work is a good example of narrowing tests to current real site behavior instead of preserving stale assumptions.
- The project has a clearer restart story across sessions because rules, current state, and planned next work are documented in separate internal files.

## Current Gaps and Improvement Areas

### 1. Structure and consistency

- Some page objects inherit from `BasePage`, while others still duplicate navigation/setup logic independently.
- The documented target structure now aligns more closely with the repo, but `config/` is still described as a top-level area that has not yet been created.
- Naming conventions are documented as: kebab-case for files/folders, PascalCase for classes/interfaces/types, and camelCase for variables/functions.
- The active page object directory is still `page-objects/`, which does not follow kebab-case naming.
- Documentation references are still being normalized after the `docs/` vs `project-docs/` split.
- Recent merged docs briefly introduced `/pages` language, but that stray folder has been removed and the repo now consistently uses `page-objects/` as the real POM directory.

### 2. Locator quality and maintainability

- The repo uses Playwright locators in many places, which is good.
- There are still several CSS selectors, ID selectors, and a few XPath-based locators in page objects.
- Some selectors are likely tied closely to DemoQA implementation details, which may increase maintenance cost.

### 3. Flakiness risks

- Explicit randomized navigation still introduces variability in stressed runs, especially when many specs run in parallel or in headed/UI mode.
- Shared home-card navigation from the DemoQA landing page can still be sensitive to page load timing and pointer interception during stressed runs.
- `tests/alerts.spec.ts` still contains one `waitForTimeout`, but it is now an intentional timing assertion for the delayed-alert behavior rather than a generic synchronization shortcut.
- Some page objects still rely on heading-only readiness checks and are likely candidates for stronger page-specific readiness assertions.
- Some flows still rely on broad row counts or broad text checks that may be less stable than more targeted assertions, although `WebTablesPage` and `CheckBoxPage` have moved toward more page-specific assertions.

### 4. CI/test selection and tag intent

- The workflow now uses a staged approach: run `@sanity` first, then run the full suite if sanity passes.
- That better matches the current educational goal of showing how a small gate stage can protect a broader regression run.
- `@sanity` is currently an example tag pattern rather than a finalized long-term taxonomy.

### 5. Type safety and reuse

- Some helper/test functions use loose typing such as `pageObjectClass: any` or `overrides = {}`.
- Repeated page object patterns suggest an opportunity for stronger shared abstractions or typed config-driven page object setup.
- There is a `NavigablePage` interface, but the overall page model contract could be standardized further.

### 6. Documentation accuracy

- `AGENTS.md` reflects the `project-docs/` location for internal documentation.
- `AGENTS.md` also includes the current rule for concise present-state documentation wording.
- `project-docs/codex-workflow.md` references `project-docs/repo-state.md` and `project-docs/backlog.md`.
- `project-docs/backlog.md` provides a prioritized list of cleanup, CI, architecture, and documentation work.
- The publishable `.adoc` pages reflect the repo structure, `pnpm` commands, current test coverage, and the `page-objects/` directory.
- `docs/` has grown, and the broader internal docs still need to keep pace with the expanded publishable docs structure.
- `agents.md` still mentions `config/` as a top-level folder that has not yet been introduced.
- `project-docs/learn-playwright.md` is the internal learning and setup guide.
- One docs-build warning remains: `docs/features/conventions.adoc` has an unterminated table block, but the docs still build and preview successfully.
- The docs describe the CI/tag behavior in a lightweight way so future sessions understand that `@sanity` is an example tag rather than a final policy.
- The repo includes single-spec commands in `package.json`, and the internal/published docs match that workflow.
- Backlog item `1.7` is complete. The reviewed docs describe the repository as it is today and avoid unnecessary change-history language.

### 7. Current validation status

- `tests/webTables.spec.ts` and `page-objects/web-tables-page.ts` match the current DemoQA table behavior.
- `tests/checkBox.spec.ts`, `page-objects/check-box-page.ts`, and `data/checkboxData.ts` match the current DemoQA checkbox tree and use explicit hierarchy and result-message validation.
- `tests/brokenLinksImages.spec.ts` aligns with the current valid/broken link behavior and uses less timing-sensitive image checks.
- `tests/alerts.spec.ts` uses one deliberate timed wait because timing is the behavior under test.
- `utils/gotoHelper.ts` uses deterministic default navigation and explicit randomized navigation through `goto.random()`.
- Backlog item `2.1` is complete. The helper, representative specs, and docs all reflect the deterministic-vs-randomized navigation strategy.
- `LoginPage` and `BookstorePage` have stronger page-state assertions than before, and several page objects use stronger readiness checks to reduce stress-related failures.
- Backlog item `1.5` is complete: there are no generic `waitForTimeout` synchronization workarounds in test code.
- Backlog item `1.7` is complete: internal and publishable docs were reviewed and updated for factual present-state wording.
- The local docs build generates nested HTML pages and the `Documentation Map` links work in local preview.
- The CI workflow runs sanity first, gates the full suite behind sanity success, and publishes one report entry per workflow run.
- Individual specs pass reliably in command-line runs when run alone. Stressed runs such as parallel/headed execution still surface intermittent failures on some pages.
- This document should be treated as a code-level status summary rather than a proof that every workflow path is fully green on every environment.

## Suggested Near-Term Improvements

1. Continue improving page-specific readiness checks and shared navigation stability for stressed runs.
2. Standardize page objects around `BasePage` and a shared config pattern to reduce duplication.
3. Tighten typings in helpers and test data builders.
4. Review which remaining page objects still use heading-only readiness checks and strengthen them incrementally when they appear in stressed-run failures.
5. Resolve the remaining `docs/features/conventions.adoc` table warning so the docs build is clean in both local preview and CI.
6. Consider extracting reusable page metadata so navigation specs and page object config stay in sync.
7. Review the remaining page objects for stale DemoQA assumptions the same way Check Box, Web Tables, Bookstore, and Broken Links were recently cleaned up.

## Summary

The repository is in a good intermediate state. It demonstrates Playwright architecture, reusable page objects, environment-based execution, generated test data, and GitHub Pages reporting. The navigation strategy and documentation are clearer than before, and the biggest next step is consistency: keep improving shared page-object structure and typing, strengthen stressed-run stability, and finish the remaining docs cleanup.
