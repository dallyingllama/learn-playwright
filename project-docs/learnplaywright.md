### Getting Started Locally on Laptop.

1. Disable ZScaler Internet Securty temporarily.
2. Enable the pinned `pnpm` version if it is not already available -> `corepack enable`
3. Activate the repo version -> `corepack prepare pnpm@10.9.0 --activate`
4. Install playwright -> `pnpm create playwright`
5. Run the example test in headless mode -> `pnpm exec cross-env TEST_ENV=dev playwright test tests/example.spec.ts`
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

### build the docs for preview

`pnpm run docs:build`
`pnpm run docs:preview`

### show the report

`pnpm run show-report`

### to run the sanity tests only in github workflow

`pnpm run test:e2e -- --grep=sanity`
