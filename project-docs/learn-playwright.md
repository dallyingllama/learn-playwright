### Getting Started Locally on Laptop.

1. Disable ZScaler Internet Securty temporarily.
2. Enable the pinned `pnpm` version if it is not already available -> `corepack enable`
3. Activate the repo version -> `corepack prepare pnpm@10.9.0 --activate`
4. Install playwright -> `pnpm create playwright`
5. Run the example test in headless mode -> `pnpm run test:spec:dev -- tests/example.spec.ts`
6. Review the example test run report -> `pnpm exec playwright show-report`
7. Run the example test in ui mode -> `pnpm run test:ui:dev`

### Getting started after repo clone

`corepack enable`
`corepack prepare pnpm@10.9.0 --activate`
`pnpm install`
`pnpm exec playwright install`

### run all tests

`pnpm run test:dev`
`pnpm run test:test`
`pnpm run test:e2e`
`pnpm run test:ui:dev`
`pnpm run test:ui:test`
`pnpm run test:ui:e2e`

### run one spec file

`pnpm run test:spec:dev -- tests/alerts.spec.ts`
`pnpm run test:spec:test -- tests/alerts.spec.ts`
`pnpm run test:spec:e2e -- tests/alerts.spec.ts`
`pnpm run test:ui:spec:dev -- tests/alerts.spec.ts`
`pnpm run test:ui:spec:test -- tests/alerts.spec.ts`
`pnpm run test:ui:spec:e2e -- tests/alerts.spec.ts`

### build the docs for preview

`pnpm run docs:build`
`pnpm run docs:preview`

### show the report

`pnpm run show-report`

### to run the sanity tests only in github workflow

`pnpm run test:e2e -- --grep=@sanity`

### navigation pattern

- `tests/navigation.spec.ts` is the explicit place where both navigation methods are tested directly.
- In most other feature specs, navigation is setup rather than the behavior under test.
- For shared page objects using `gotoHelper`:

`goto()` = deterministic default navigation
`goto.viaMenu()` = explicit menu navigation
`goto.viaDirectLink()` = explicit direct-link navigation
`goto.random()` = explicit randomized navigation

- Current repo pattern:
  - use deterministic navigation where the test is demonstrating navigation behavior clearly
  - use randomized navigation in feature specs when navigation is just part of setup
  - keep randomized behavior explicit rather than hidden in the default `goto()`

### basic git commands

`git status`
`git diff`
`git diff --staged`
`git add .`
`git commit -m "your message"`
`git pull`
`git push`

### line endings and `.gitattributes`

- This repo uses `.gitattributes` to keep source files normalized to `LF`.
- If you see a warning like `warning: in the working copy of 'project-docs/backlog.md', CRLF will be replaced by LF the next time Git touches it`, check that `.gitattributes` is present and then renormalize before commit.
- Useful command:

`git add --renormalize .`

- After that, recheck what will be committed:

`git status`
`git diff --staged`

- Then commit normally.
- or just combine it all
`git add --renormalize . && git commit -m "your message"`

### current CI behavior

- GitHub Actions runs the `@sanity` tests first.
- If the sanity stage passes, the workflow runs the full `e2e` suite.
- If the sanity stage fails, the full suite is skipped.
- The workflow publishes one report/history entry per run:
  - sanity report if sanity fails
  - full-suite report if sanity passes and the full run completes
- The workflow ends in a failed state if either the sanity stage or the full suite fails.

### alerts timing note

- `tests/alerts.spec.ts` contains one intentional timing assertion.
- The timed alert scenario verifies that the alert does not appear immediately and then does appear after the expected delay window.
