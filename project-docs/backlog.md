# Backlog

Active backlog only. Completed work is tracked in `project-docs/repo-state.md` and git history.

## 4. Documentation and Learning Experience

### 4.4 Clean up remaining docs build warnings

- Keep `docs/features/conventions.adoc` aligned with the actual repository folders and local-only outputs.
- Remove stale or duplicate directory rows that are not present in this repository.
- Rebuild local docs after conventions updates and confirm generated pages still render and link correctly.
- Keep local docs build and CI docs build behavior aligned as the docs set grows.

## 5. Implement the re-usable architecture strategy

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
