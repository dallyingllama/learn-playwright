# Backlog

This backlog is an initial working list for the next phase of the project.

The top section focuses on existing tech debt and cleanup so the repo stays understandable before larger architectural changes are added.

## 1. Tech Debt Cleanup

### 1.1 Make package-manager usage fully consistent (Completed)

- Review docs, workflow comments, and command examples for any remaining `npm`-first wording.
- Standardize on `pnpm` as the primary package-manager experience for this repo.
- Make sure examples for installing, running one test, and opening UI mode all use the same style.

### 1.2 Pin `pnpm` in CI instead of using `pnpm@latest` (Completed)

- Update the GitHub workflow so CI uses the repo’s intended `pnpm` version rather than `latest`.
- Reduce drift between local development and GitHub Actions.
- Document the chosen approach in project docs if needed.

### 1.3 Clean up tag intent and document it (Completed)

- Clarify what `@sanity` and `@smoke` are meant to represent.
- Keep them in the repo as examples of test tagging, but document that they currently demonstrate capability more than a finalized strategy.
- Add a short explanation in internal docs so future sessions do not have to infer intent.

### 1.4 Review workflow strategy for fast vs full test runs (Completed)

- Create a simple example split where:
  - `@sanity` and/or `@smoke` runs first
  - the full suite runs only if that first stage passes
- Decide whether this should be one workflow with dependent jobs or separate workflows.
- Keep the first implementation intentionally simple and educational.

### 1.5 Remove or reduce remaining hard waits (Completed)

- Identify remaining `waitForTimeout` usage.
- Replace generic hard waits with state-based waits or assertion-driven synchronization where practical.
- Keep timing-based waits only when the timing itself is the behavior under test.
- Focus first on tests that are most likely to run in CI.
- `tests/alerts.spec.ts` was updated so the timed alert scenario no longer uses a short hard wait as a generic sync workaround.
- One intentional timed wait remains there because the purpose of that specific test is to prove the alert does not appear before the expected delay.

### 1.6 Clean up stale or inconsistent naming (Completed)

- Review page object filenames and class names for consistency.
- Examples include names like `DragablePage.ts`.
- Prefer small, low-risk naming cleanup only where the benefit is clear.
- Renamed `page-objects/DragablePage.ts` and `DragablePage` to `page-objects/dragabble-page.ts` and `DragabblePage` so naming matches existing DemoQA page labels and URLs used by this repo.
- Renamed `page-objects/AlertsFrameWindowsPage.ts` to `page-objects/alerts-windows-page.ts` to match the exported class name and existing usage.
- Updated imports in `data/navigationSections.ts` and reran `tests/navigation.spec.ts` successfully.

### 1.7 Review doc accuracy after recent repo changes (Completed)

- Rechecked `project-docs/learn-playwright.md`, `docs/index.adoc`, `project-docs/codex-workflow.md`, `project-docs/repo-state.md`, and `AGENTS.md` against the current repo.
- Updated documentation to describe the repository as it is today with simple factual statements.
- Confirmed CI behavior, GitHub Pages links, and repo structure descriptions match the current repo.

### 1.8 Project Standards/Naming Conventions (Completed)

- Set conventions to: files/folders: kebab-case; types/classes/interfaces: PascalCase; variables/functions: camelCase
- complete cleanup in order to follow typescript, playwright, and node javascript naming conventions

## 2. Architecture and Test Design

### 2.1 Clarify deterministic vs randomized navigation coverage (Completed)

- Reviewed `utils/gotoHelper.ts`.
- Kept support for randomized navigation behavior because it demonstrates a useful real-world testing technique.
- Changed plain `goto()` to a deterministic default and made randomized behavior explicit through `goto.random()`.
- Kept `tests/navigation.spec.ts` as the explicit deterministic proof that both navigation methods work.
- Updated feature specs to use explicit randomized navigation where navigation is setup rather than the behavior under test.
- Left `login.spec.ts` and `textBox.spec.ts` as examples of the deterministic-first plus randomized-follow-up pattern.
- Documentation now reflects the intended usage so future changes do not treat randomness as accidental flakiness.

### 2.2 Standardize page object structure

- Continue reducing duplication across page objects.
- Prefer a more consistent `BasePage` + shared config approach where it improves readability.
- Avoid large rewrites; refactor incrementally as pages are touched.

### 2.3 Improve typing in helpers and data builders

- Tighten loose helper signatures and generic config usage.
- Use clearer shared types for data-driven tests and page-object contracts where helpful.

### 2.4 Extract reusable page metadata where it helps

- Explore whether shared page metadata can reduce duplication between page objects, navigation data, and tests.
- Keep this lightweight and only adopt it if it makes the learning project clearer rather than more abstract.

## 3. Test Stability and Coverage

### 3.1 Continue updating tests to current DemoQA behavior

- Review remaining suites for stale assumptions the same way Check Box, Web Tables, Bookstore, and Broken Links were recently updated.
- Prefer current observable behavior over preserving old expectations from the site.

### 3.2 Strengthen assertions where broad checks still exist

- Replace broad row counts or generic text checks with more targeted assertions where it improves stability.
- Focus first on areas that have shown flakiness locally or in CI.

### 3.3 Add more small, data-driven examples

- Use the Check Box work as a model for test/data separation.
- Add small examples that demonstrate useful patterns without overcomplicating the repo.

## 4. Documentation and Learning Experience

### 4.1 Improve environment and setup documentation

- Make the first-time setup path easy to follow for someone new to `pnpm`, Playwright, and CI.
- Keep the wording beginner-friendly and explicit.

### 4.2 Document current CI and report publishing flow

- Explain what the GitHub workflow does:
  - install dependencies
  - run tests
  - upload artifacts
  - publish history to GitHub Pages
- Keep this short and practical.

### 4.3 Keep internal docs lightweight but current

- Continue using `project-docs/` for internal guidance and `docs/` for publishable content.
- Avoid creating internal documentation that duplicates what the code already makes obvious.

### 4.4 Clean up remaining docs build warnings

- Fix the unterminated table block warning in `docs/features/conventions.adoc`.
- Rebuild the local docs after the fix and confirm feature pages still render and link correctly.
- Keep the local docs build and CI docs build aligned as the published docs set grows.

## Notes

- This backlog intentionally starts with cleanup and clarity work before deeper architecture changes.
- New ideas can be added below these items once the current baseline is stable and documented.
