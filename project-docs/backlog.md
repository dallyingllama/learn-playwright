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
- Updated imports in `page-objects/metadata/navigation-sections.ts` and reran `tests/navigation.spec.ts` successfully.

### 1.7 Review doc accuracy after recent repo changes (Completed)

- Rechecked `project-docs/developer-how-to.md`, `docs/index.adoc`, `project-docs/codex-workflow.md`, `project-docs/repo-state.md`, and `AGENTS.md` against the current repo.
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
- Left `login.spec.ts` and `textbox.spec.ts` as examples of the deterministic-first plus randomized-follow-up pattern.
- Documentation now reflects the intended usage so future changes do not treat randomness as accidental flakiness.

### 2.2 Standardize page object structure (Completed)

- Standardized section/root page objects on `BasePage` + shared `createGotoWithVariants()` setup.
- Migrated the remaining outlier page objects: `interactions-page.ts`, `alerts-windows-page.ts`, `widgets-page.ts`, and `home-page.ts`.
- Aligned `bookstore-page.ts` `goto` setup to the same inline pattern used by the other standardized page objects.
- Kept `register-page.ts` as an intentional exception for its auth-focused flow.

### 2.3 Improve typing in helpers and data builders (Completed)

- Typed navigation page-object constructors and shared section metadata in `tests/navigation.spec.ts` and `page-objects/metadata/navigation-sections.ts`.
- Typed registration user builder overrides in `tests/register.spec.ts` with `Partial<RegisterUser>`.
- Added typed data models for `data/loginData.ts` and `data/bookData.ts`.
- Added explicit `FakeUser` type for `utils/fakeUser.ts`.
- Added repository typecheck foundation with `tsconfig.json`, `typescript` dev dependency, and `pnpm run typecheck`.

### 2.4 Extract reusable page metadata where it helps (Completed)

- Added `page-objects/metadata/section-metadata.ts` as the shared source for section names, urls, card labels, and landing behavior metadata.
- Added `page-objects/metadata/navigation-sections.ts` and moved navigation page mappings there to keep metadata with page-object architecture.
- Updated section/root page objects to consume shared section metadata for menu/card labels and urls.
- Updated `tests/navigation.spec.ts` and `tests/home-page.spec.ts` to consume shared metadata and reduce duplicated literals.
- Kept the extraction lightweight and scoped to section-level metadata to avoid large rewrites.

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

## 5. Implement the re-usable architecture strategy. 

### 5.1 Evaluate Antora migration fit
- Run a small pilot/spike to evaluate whether Antora should replace or complement the current docs approach.
- Capture decision criteria, migration cost, and recommendation.

### 5.2 Define architecture split blueprint
- Use `project-docs/repository-approach.md` sections:
  - Definition of ready to split
  - Boundary Rules
  - Versioning and release approach
  - Execution Plan Mapping
- Produce a concrete split plan for this repo:
  - what moves to shared package first
  - what remains project-specific
  - migration order and acceptance checks

### 5.3 Create shared package skeleton
- Scaffold the shared Playwright package with initial reusable exports.
- Add basic package scripts/versioning and initial docs.
- Move only low-risk reusable utilities first.

### 5.4 Integrate current repo as first showcase consumer
- Wire this repo to consume the shared package.
- Keep DemoQA-specific selectors/flows local.
- Validate with directly affected specs and typecheck.

### 5.5 Create template repo
- Build a starter repo that consumes a stable shared package version.
- Keep template logic minimal and generic.
- Document standard bootstrap/run workflow for new projects.

### 5.6 Create second showcase repo
- Add a second demo site showcase to validate cross-site reuse.
- Confirm shared package boundaries hold across different applications.
- Record findings and adjust shared package scope where needed.



## Notes

- This backlog intentionally starts with cleanup and clarity work before deeper architecture changes.
- New ideas can be added below these items once the current baseline is stable and documented.
