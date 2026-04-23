# Playwright Architecture Strategy

## Goal
Build a reusable Playwright architecture that can support multiple project repos while allowing the core architecture to improve independently from individual website repos.

## Strategy

### Phase 1: Continue the current single repo until MVP
- Keep working in the existing repo until it reaches an MVP and a releasable state.
- Use this repo for learning, experimentation, and architectural improvement based on current automation experience.
- Stabilize the structure, conventions, utilities, and test patterns before splitting into reusable components.

### Definition of ready to split (Phase 1 exit criteria)
- `pnpm run typecheck` passes.
- Directly affected specs pass for each architecture change.
- Documentation build and preview workflow is stable (`pnpm run docs:build`, `pnpm run docs:preview`).
- Shared-vs-project-specific boundaries are documented and agreed.
- Core architecture patterns are represented in this repo with at least one working showcase flow per major area.

### Phase 2: Split into reusable repos after MVP
After the MVP is stable, create the following repo types:

#### 1. Shared package
- Create a shared package that contains reusable Playwright architecture components.
- This package should be versioned, for example:
  - `1.0`
  - `1.1`
  - `1.2`
- Each project repo chooses which version to use.
- Project repos should be able to upgrade their shared package version when ready.

#### 2. Template project
- Create a template project that uses the current stable version of the shared package.
- This template will be used to quickly create new project repositories.
- It should provide the standard folder structure, configuration, and baseline conventions.

#### 3. Showcase repo
- Convert the original learning repo into a showcase repo.
- Example: `showcase-demoqa`
- This repo should use the shared package and demonstrate the architecture in a real project.
- It should remain a working example of the current approach and a place to validate improvements before they are promoted.

#### 4. Second showcase repo
- Create another showcase project using a different demo application.
- This will validate that the shared package and template project work across multiple websites.
- It will help confirm the architecture is reusable and not too tightly coupled to one application.

## Boundary Rules

### Shared package candidates
- Reusable fixtures and test setup patterns.
- Navigation helpers and shared test utilities.
- Stable typed interfaces/contracts used across projects.
- Reusable utilities that are not tied to site-specific selectors or business rules.

### Project-specific scope
- Site selectors and page-object locators.
- Site-specific workflows and assertions.
- Website/business-rule-specific test data.
- Documentation and run conventions that are unique to the consuming repo.

## Testing Ownership Rules

### Shared package test ownership
- Unit tests for shared helpers, contracts, and reusable utility logic live in the shared package repo.
- The shared package repo is the source of truth for shared behavior and regression coverage.
- Shared package changes should be validated there first before publishing a new version.

### Consumer project test ownership
- Consumer repos focus on project-specific tests and integration usage of shared package APIs.
- Consumer repos should not duplicate full shared package unit test suites.
- Add consumer-side tests only for:
  - project-specific behavior built on top of shared utilities
  - integration checks needed to validate package usage in that project context

## Versioning and release approach
- Start the shared package with `0.x` while boundaries and API shapes are still changing.
- Move to `1.0.0` when package interfaces are stable and tested across at least two showcase repos.
- Use semver for package evolution:
  - patch: bug fixes without contract changes
  - minor: backward-compatible features
  - major: breaking changes
- Project repos should upgrade intentionally and at their own pace.

## Execution Plan Mapping (Backlog Section 5)
- `5.1`: Antora migration spike/decision.
- `5.2`: Define split blueprint using this document’s ready criteria, boundaries, versioning, and repo sequence.
- `5.3`: Create shared package skeleton and first reusable exports.
- `5.4`: Integrate the current repo as first showcase consumer.
- `5.5`: Create template repo from stable shared package version.
- `5.6`: Create second showcase repo and validate cross-site reuse.

## Documentation Audience Model

### Shared package documentation
- Primary audience: framework maintainers and contributors.
- Focus:
  - public API contracts
  - extension points
  - versioning/changelog
  - migration notes between package versions
- Keep project- or website-specific workflow guidance out of this repo.

### Template repo documentation
- Primary audience: developers bootstrapping a new automation project.
- Focus:
  - first-run onboarding
  - setup and configuration steps
  - customization guide for common project needs
  - operational run/debug basics for a new repo owner

### Showcase repo documentation
- Primary audience: adopters evaluating architecture patterns in real usage.
- Focus:
  - concrete examples and test flows
  - architecture decisions and tradeoffs
  - site-specific assumptions and selectors
  - practical usage of the shared package in a real project

## Minimum Documentation by Repo Type

### Shared package minimum docs
- README with install and API overview.
- Changelog and version policy.
- Migration notes for breaking or behavioral changes.

### Template repo minimum docs
- Quick start guide.
- Customization guide.
- Standard run/test/typecheck commands.

### Showcase repo minimum docs
- Scope and purpose overview.
- Site-specific assumptions.
- Example workflows mapped to the shared package.

## Cross-Repo Documentation Rules
- The shared package is the canonical source for reusable API behavior and version migration guidance.
- The template repo is the canonical source for onboarding and project bootstrap instructions.
- Showcase repos are canonical for real-world examples and site-specific behavior.
- Each repo should link to the canonical docs in sibling repos rather than duplicating long-form explanations.
- Keep cross-repo links explicit and lightweight so readers can quickly find the right source of truth.

## Intended Repo Roles

### Shared package
- Reusable core automation logic
- Common fixtures and helpers
- Standardized test utilities
- Versioned releases for controlled adoption

### Template project
- Starter repository for new projects
- Uses a stable shared package version
- Minimal project-specific logic
- Fast bootstrap for new website test repos

### Showcase repos
- Real examples of the architecture in use
- Used to validate architectural changes
- Contain site-specific tests and flows
- Consume the shared package like normal projects

## Expected Benefits
- Architecture improvements can be made centrally in the shared package.
- Project repos can upgrade independently.
- New repos can be created quickly from the template.
- Showcase repos prove the approach in real applications.
- The setup supports both learning and long-term maintainability.

## Notes
- Keep the shared package focused on truly reusable logic.
- Keep project-specific selectors, flows, and business rules inside each project repo.
- Use showcase repos to validate changes before making them the new standard.
