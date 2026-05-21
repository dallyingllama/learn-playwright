# Split Blueprint Checklist (Backlog 5.3)

Purpose: define and approve the minimum decision set required to move from blueprint planning (`5.3`) to shared package implementation (`5.4`).

Use this checklist as the closure gate for backlog item `5.3`.

## 1) Boundary Inventory (File-Level)

- [ ] Create and review a file-level inventory with three buckets:
  - move in `v0.1.0`
  - move later
  - stay project-specific
- [ ] Confirm all DemoQA-specific selectors/flows remain project-specific.
- [ ] Confirm shared candidates are site-agnostic and reusable.

Suggested input files:
- `utils/*`
- `page-objects/interfaces/*`
- `playwright.config.ts` (for reusable helper extraction candidates only)

## 2) Public API Contract Draft (`v0.1.0`)

- [ ] Finalize exact export names and TypeScript signatures for:
  - navigation helpers
  - `AppUser` data contract and factory
  - env/config helpers
- [ ] Decide import style:
  - root exports only (`@org/playwright-core`)
  - or scoped subpaths (`@org/playwright-core/navigation`, etc.)
- [ ] Mark explicit out-of-scope APIs for `v0.1.0`.

Reference:
- `project-docs/shared-package-v0.1.0-api-candidates.md`

## 3) Migration Sequence and Acceptance Checks (`5.5` preview)

- [ ] Define integration slices for first consumer migration in this repo.
- [ ] For each slice, define direct validation commands:
  - affected spec(s)
  - `pnpm run typecheck`
- [ ] Confirm rollback path for each slice (small reversible changes).

## 4) Cross-Repo Governance Rules

- [ ] Record feature promotion rule:
  - shared candidates are promoted after repeated use across multiple consumers.
- [ ] Record shared package versioning and release policy (`0.x` stabilization, semver semantics).
- [ ] Record consumer upgrade policy and migration-note requirement.

## 5) Repo Bootstrap Standards by Repo Type

- [ ] Define minimum required files/docs for shared package repo.
- [ ] Define minimum required files/docs for template repo.
- [ ] Define minimum required files/docs for showcase repos.
- [ ] Confirm canonical documentation ownership map (shared vs template vs showcase).

References:
- `project-docs/repository-approach.md`

## 6) Blueprint Exit Criteria (5.3 Closure)

- [ ] Boundary inventory is approved.
- [ ] `v0.1.0` API contract draft is approved.
- [ ] Migration sequence and acceptance checks are approved.
- [ ] Governance and repo standards are documented and approved.
- [ ] Team review completed and approval explicitly recorded before marking backlog item `5.3` done.

## Approval Record

- Review date:
- Reviewed by:
- Decision:
  - [ ] Approved to start `5.4`
  - [ ] Needs revision before `5.4`
- Notes:
