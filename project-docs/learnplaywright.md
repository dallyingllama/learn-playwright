### Getting Started Locally on Laptop.

1. Disable ZScaler Internet Securty temporarily.
2. Enable or install `pnpm` if it is not already available.
3. Install playwright -> `pnpm create playwright`
4. Run the example test in headless mode -> `pnpm exec playwright test`
5. Review the example test run report -> `pnpm exec playwright show-report`
6. Run the example test in ui mode -> `pnpm exec playwright test --ui`

### Getting started after repo clone

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
