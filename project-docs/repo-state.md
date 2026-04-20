# Repository State

## Purpose

This repository is a Playwright + TypeScript learning project focused on building maintainable UI automation against `demoqa.com`. The current codebase already demonstrates several good testing patterns and is moving toward a reusable automation template while keeping demoqa-specific tests separate from more reusable framework ideas.

## Current Structure

### Present in the repository

- `tests/` contains 12 Playwright spec files covering login, registration, text box, checkbox, buttons, links, alerts, bookstore, navigation, radio buttons, broken links/images, and web tables.
- `pageObjects/` contains the active Page Object Model files, including page-level models, shared base behavior, a sidebar component, and a simple navigation interface.
- `data/` contains reusable test data definitions such as login data, bookstore data, and navigation metadata.
- `utils/` contains shared helpers for fake data generation, annotations, and multi-strategy navigation helpers.
- `.env/` contains environment-specific config files: `dev.env`, `test.env`, `e2e.env`, and `fail.env`.
- `.github/workflows/` contains one CI workflow for running tests, building docs, uploading artifacts, and publishing report history to GitHub Pages.
- `.github/scripts/` contains an EJS template and a Node script for generating a historical Playwright report index.
- `docs/` now contains a broader publishable documentation set: `docs/index.adoc`, supporting topic pages, feature/guideline subfolders, `_includes/`, and theme assets.
- `project-docs/` contains internal project guidance such as `repo-state.md`, `codex-workflow.md`, `learnplaywright.md`, and the new `backlog.md`.
- `config/` is described in `agents.md` as the place for environment and config handling, but it is not currently present as a top-level folder. At the moment, this responsibility is handled mainly through `playwright.config.ts` and `.env/`.

## Implemented Features

### Test architecture

- Page Object Model is the dominant pattern across the suite.
- Navigation supports multiple strategies through `createGotoWithVariants()` in `utils/gotoHelper.ts`.
- Many tests use `test.step()` well, which makes reports easier to read.
- Data-driven testing is already in use, especially in `tests/login.spec.ts` and `tests/navigation.spec.ts`.
- Faker-based test data generation exists for form and table workflows.
- The web tables flow has been tightened so table assertions rely more on populated row content than raw row container counts.
- The checkbox flow has been simplified substantially: hierarchy structure now lives in `data/checkboxData.ts`, the page object is aligned with the current `rc-tree` DOM, and the tests now focus on hierarchy expansion plus checkbox/result-message behavior instead of outdated click strategies.
- Broken Links / Images assertions have been adjusted to match the current DemoQA page intent and to be less timing-sensitive in command-line runs.
- The suite now uses `@sanity` as a lightweight example tag, with one representative test tagged in each spec file.
- `tests/alerts.spec.ts` was updated so the timed-alert scenario now verifies the alert does not appear too early and then does appear after the expected delay, instead of relying on a short generic hard wait.

### Environment management

- `playwright.config.ts` loads environment files from `.env/<name>.env`.
- `BASE_URL` is validated at startup, which is a good early-fail safeguard.
- `package.json` includes separate scripts for `dev`, `test`, and `e2e` runs.
- `package.json` now also includes reusable single-spec scripts for both headless and UI mode, which makes it easier to run a specific spec without retyping the full Playwright command.

### Documentation and reporting

- `docs/index.adoc` provides a published project overview.
- `project-docs/` separates internal development/process documentation from publishable site documentation.
- `package.json` includes local doc build and preview scripts.
- `package.json` now pins the package manager as `pnpm@10.9.0`.
- The local docs workflow is exposed through `docs:build` and `docs:preview`.
- The local docs build now walks the full `docs/` tree recursively and writes matching `.html` output into `localDocs/`, including nested `features/` and `guidelines/` pages.
- GitHub Actions publishes Playwright report history and generated docs to GitHub Pages.
- The GitHub workflow now activates the same pinned `pnpm@10.9.0` version declared in `package.json`, which reduces install drift between local setup and CI.
- The GitHub workflow now runs `@sanity` first and only runs the full suite when that gate passes, while still publishing a single final report entry per workflow run.
- The GitHub Actions docs build now mirrors the recursive local docs build by generating nested HTML pages instead of only top-level docs.
- `.github/scripts/render-index.js` creates a browsable history index from prior runs.
- The workflow now uses newer GitHub Action major versions and a Node 24 runtime.
- `project-docs/codex-workflow.md` now explicitly tells new sessions to use `AGENTS.md`, `project-docs/repo-state.md`, and `project-docs/backlog.md` together.
- `project-docs/backlog.md` now acts as the working list for follow-up improvements and tech-debt cleanup.
- The published AsciiDoc pages were recently refreshed to better match the current repo structure, `pnpm` usage, and current test/docs workflow.

## Notable Strengths

- The repo already shows a strong learning-oriented architecture rather than a flat spec-only layout.
- Reusable page object navigation is a clear theme, especially the `goto.viaMenu()` and `goto.viaDirectLink()` pattern.
- Test data is separated from test logic in several places.
- CI, docs, and report publishing are integrated rather than being an afterthought.
- The `docs/` vs `project-docs/` split is a good clarity improvement because publishable content and internal workflow notes now have distinct homes.
- The merged docs structure suggests the publishable site is evolving beyond a single landing page into a small documentation set.
- The local preview experience is better aligned with the published site now that doc-to-doc links target generated `.html` pages and nested pages are built locally.
- The CI workflow now demonstrates a practical staged test strategy without creating duplicate history entries for sanity-only runs.
- The project covers a broad portion of DemoQA, which is useful for experimenting with reusable abstractions.
- Recent Check Box work is a good example of narrowing tests to current real site behavior instead of preserving stale assumptions.
- The project now has a clearer restart story across sessions because rules, current state, and planned next work are all documented in separate internal files.

## Current Gaps and Improvement Areas

### 1. Structure and consistency

- Some page objects inherit from `BasePage`, while others still duplicate navigation/setup logic independently.
- The documented target structure now aligns more closely with the repo, but `config/` is still described as a top-level area that has not yet been created.
- Naming is a little inconsistent in places, for example `DragablePage.ts` and `AlertsFrameWindowsPage.ts` vs class naming.
- Documentation references are still being normalized after the `docs/` vs `project-docs/` split.
- Recent merged docs briefly introduced `/pages` language, but that stray folder has been removed and the repo now consistently uses `pageObjects/` as the real POM directory.

### 2. Locator quality and maintainability

- The repo uses Playwright locators in many places, which is good.
- There are still several CSS selectors, ID selectors, and a few XPath-based locators in page objects.
- Some selectors are likely tied closely to DemoQA implementation details, which may increase maintenance cost.

### 3. Flakiness risks

- `utils/gotoHelper.ts` uses `Math.random()` when plain `goto()` is called, which introduces non-deterministic navigation behavior.
- `tests/alerts.spec.ts` still contains one `waitForTimeout`, but it is now an intentional timing assertion for the delayed-alert behavior rather than a generic synchronization shortcut.
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

- `agents.md` is now much closer to the repo as checked in, and it reflects the new `project-docs/` location for internal documentation.
- `project-docs/codex-workflow.md` has been updated to reference `project-docs/repo-state.md` and `project-docs/backlog.md`.
- `project-docs/backlog.md` now exists and provides an initial prioritized list of cleanup, CI, architecture, and documentation work for the next phase.
- The publishable `.adoc` pages now better reflect the actual repo structure, `pnpm`-first commands, current test coverage, and the real `pageObjects/` directory.
- `docs/` has grown, and the broader internal docs still need to keep pace with the expanded publishable docs structure.
- `agents.md` still mentions `config/` as a top-level folder that has not yet been introduced.
- The repo appears to be in the middle of a docs reorganization: `project-docs/learnplaywright.md` exists, while the former top-level `learnplaywright.md` has been removed.
- One docs-build warning remains: `docs/features/conventions.adoc` has an unterminated table block, but the docs still build and preview successfully.
- The updated CI/tag behavior should still be documented in a lightweight way so future sessions understand that `@sanity` currently demonstrates capability more than a final policy.

### 7. Current validation status

- `tests/webTables.spec.ts` and `pageObjects/WebTablesPage.ts` were recently refactored to better match the current DemoQA table behavior, including removal of the no-longer-reliable sort test.
- `tests/checkBox.spec.ts`, `pageObjects/CheckBoxPage.ts`, and `data/checkboxData.ts` now reflect the current DemoQA checkbox tree and have been simplified around explicit hierarchy and result-message validation.
- `tests/brokenLinksImages.spec.ts` was updated to reduce command-line timing sensitivity around image loading and to align with the current valid/broken link behavior.
- `tests/alerts.spec.ts` was updated with a stronger delayed-alert assertion, and the restored emoji labels are back in place after an encoding-related file rewrite issue during editing.
- The local docs build was reworked and verified on Windows so `docs:build` now generates nested HTML pages and the `Documentation Map` links work in local preview.
- The CI workflow was updated so sanity runs first, the full suite is gated behind sanity success, and only one report entry is published per workflow run.
- The local suite appears to be in a better state than earlier in the work, but this document should still be treated as a code-level status summary rather than a proof that every workflow path is fully green on every environment.

## Suggested Near-Term Improvements

1. Make navigation deterministic by removing random default behavior from `createGotoWithVariants()` or limiting randomness to explicitly experimental tests.
2. Continue reviewing remaining `waitForTimeout` usage and distinguish between true sync workarounds and intentional timing assertions.
3. Standardize page objects around `BasePage` and a shared config pattern to reduce duplication.
4. Decide on a clear CI strategy for `fast sanity` vs `full regression` now that the workflow no longer filters by tag.
5. Tighten typings in helpers and test data builders.
6. Finish the documentation reference cleanup so workflow prompts point to `project-docs/repo-state.md` and any future backlog file lives in a clearly chosen home.
7. Resolve the remaining `docs/features/conventions.adoc` table warning so the docs build is clean in both local preview and CI.
8. Consider extracting reusable page metadata so navigation specs and page object config stay in sync.
9. Review the remaining page objects for stale DemoQA assumptions the same way Check Box, Web Tables, Bookstore, and Broken Links were recently cleaned up.

## Summary

The repository is in a good intermediate state: it already demonstrates meaningful Playwright architecture, reusable page objects, environment-based execution, generated test data, and GitHub Pages reporting. Recent work has also brought several flaky or stale areas back in line with the current DemoQA UI, especially Check Box, Web Tables, Bookstore, Broken Links, and Alerts, and the docs publishing area has expanded into a larger AsciiDoc set with a better-aligned local preview/build flow. The biggest next step is consistency: make navigation deterministic, keep reducing unintentional hard waits, finish the remaining docs cleanup, and define a clearer CI strategy for fast vs full test execution.
