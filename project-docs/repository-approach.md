# Playwright Architecture Strategy

## Goal
Build a reusable Playwright architecture that can support multiple project repos while allowing the core architecture to improve independently from individual website repos.

## Strategy

### Phase 1: Continue the current single repo until MVP
- Keep working in the existing repo until it reaches an MVP and a releasable state.
- Use this repo for learning, experimentation, and architectural improvement based on current automation experience.
- Stabilize the structure, conventions, utilities, and test patterns before splitting into reusable components.

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