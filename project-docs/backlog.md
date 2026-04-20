# Backlog

This backlog is an initial working list for the next phase of the project.

The top section focuses on existing tech debt and cleanup so the repo stays understandable before larger architectural changes are added.

## 1. Tech Debt Cleanup

### 1.1 Make package-manager usage fully consistent (Completed)

- Review docs, workflow comments, and command examples for any remaining `npm`-first wording.
- Standardize on `pnpm` as the primary package-manager experience for this repo.
- Make sure examples for installing, running one test, and opening UI mode all use the same style.

### 1.2 Pin `pnpm` in CI instead of using `pnpm@latest`

- Update the GitHub workflow so CI uses the repo’s intended `pnpm` version rather than `latest`.
- Reduce drift between local development and GitHub Actions.
- Document the chosen approach in project docs if needed.

### 1.3 Clean up tag intent and document it

- Clarify what `@sanity` and `@smoke` are meant to represent.
- Keep them in the repo as examples of test tagging, but document that they currently demonstrate capability more than a finalized strategy.
- Add a short explanation in internal docs so future sessions do not have to infer intent.

### 1.4 Review workflow strategy for fast vs full test runs

- Create a simple example split where:
  - `@sanity` and/or `@smoke` runs first
  - the full suite runs only if that first stage passes
- Decide whether this should be one workflow with dependent jobs or separate workflows.
- Keep the first implementation intentionally simple and educational.

### 1.5 Remove or reduce remaining hard waits

- Identify remaining `waitForTimeout` usage.
- Replace with state-based waits or assertion-driven synchronization where practical.
- Focus first on tests that are most likely to run in CI.

### 1.6 Clean up stale or inconsistent naming

- Review page object filenames and class names for consistency.
- Examples include names like `DragablePage.ts`.
- Prefer small, low-risk naming cleanup only where the benefit is clear.

### 1.7 Review doc accuracy after recent repo changes

- Recheck `project-docs/learnplaywright.md`, `docs/index.adoc`, and any setup notes against the current repo.
- Make sure CI behavior, GitHub Pages links, and repo structure descriptions still match reality.

## 2. Architecture and Test Design

### 2.1 Make navigation deterministic

- Review `utils/gotoHelper.ts`.
- Decide whether the random navigation variant behavior should be removed, limited, or made opt-in.
- Favor predictable defaults while preserving the learning value of multiple navigation strategies.

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
