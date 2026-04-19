# Purpose

This repository is a Playwright-based test automation learning project.

Goals:

- Learn and apply Playwright best practices
- Experiment with test architecture improvements
- Run sample tests against demoqa.com
- Eventually turn this into a reusable template/scaffold, but not yet
- Keep demoqa-specific tests separate from reusable framework ideas

# Tech Stack

- VS Code
- Playwright + TypeScript
- Node.js
- faker-js
- dotenv
- ejs
- cross-env
- live-server
- asciidoctor (core, cli)
- GitHub Actions

# Project Structure

- /tests -> Playwright test specs
- /pageObjects -> Page Object Models
- /pageObjects/components -> reusable components
- /pageObjects/interfaces -> interfaces/types
- /utils -> helper utilities, data generation, shared helpers
- /data -> test data
- /docs -> generated documentation output
- /project-docs -> docs for developer, using codex, learning playwright
- /.github/workflows -> GitHub Actions workflows
- /.github/scripts -> workflow helper scripts
- /config -> environment and config handling

# Existing Features

- Playwright web tests
- Partial environment management
- Test data generation utilities
- Page Object Model abstraction
- Auto-documentation using AsciiDoc
- Custom helper utilities
- GitHub Actions test workflow

# Conventions

- Prefer Playwright locators such as getByRole and getByLabel
- Avoid brittle CSS/XPath selectors unless necessary
- Keep tests readable and maintainable
- Use Page Objects for UI interactions
- Keep test logic separate from test data
- Reuse existing utilities before creating new ones
- Prefer incremental improvements over large rewrites

# Commands

Install:
pnpm install
pnpm exec playwright install

Run tests:
pnpm run test:dev

Run one test:
cross-env TEST_ENV=dev npx playwright test tests/example.spec.ts

Open UI mode:
pnpm run test:ui:dev

# Quality Guidelines

Good tests:

- Stable and not flaky
- Use robust locators
- Have meaningful assertions
- Are easy to read and maintain

Avoid:

- Hard waits
- Duplicated logic
- Overly complex test flows

# Current Goals

- Improve environment management
- Improve test data generation
- Add reusable architectural features
- Reduce test flakiness
- Improve documentation generation
- Move toward a reusable project template

# Instructions for Codex

- Read the existing code before suggesting changes
- Reuse existing utilities where possible
- Do not introduce a new pattern if a similar one already exists
- Explain reasoning behind suggestions
- Favor small, safe improvements
- If a task is unclear, inspect the repo and summarize current state first
