# Learn Playwright

Practical Playwright + TypeScript learning project targeting `demoqa.com`.

Full published docs: [https://dallyingllama.github.io/learn-playwright](https://dallyingllama.github.io/learn-playwright)

## First 10 Minutes

Run these commands from the repository root:

```bash
corepack enable
corepack prepare pnpm@10.9.0 --activate
corepack pnpm install
corepack pnpm exec playwright install
corepack pnpm run test:spec:dev tests/login.spec.ts
corepack pnpm run show-report
```

## TEST_ENV quick note


- `TEST_ENV=dev` loads `.env/dev.env`
- `TEST_ENV=test` loads `.env/test.env`
- `TEST_ENV=e2e` loads `.env/e2e.env`

Example:

```bash
corepack pnpm run test:spec:dev tests/alerts.spec.ts
```

## Docs

- Source docs: `docs/`
- Internal project docs: `project-docs/`
- Developer how-to: `docs/developer-how-to.adoc`
- Build local docs: `corepack pnpm run docs:build`
- Preview local docs: `corepack pnpm run docs:preview`
