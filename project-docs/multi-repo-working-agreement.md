# Multi-Repo Working Agreement

Purpose: keep shared package, template, and showcase work coordinated without losing context.

## Collaboration Preference

- Use a step-by-step, explainer-first approach until the workflow feels natural.
- For each phase, explain:
  - what we are doing
  - why this step comes next
  - what success looks like
- Avoid large jumps. Use small slices and confirm understanding before moving on.

## Operating Mode

- One active repo per task slice.
- Do not mix unrelated edits across repos in one pass.
- Start each slice by explicitly confirming:
  - repo path
  - branch name
  - backlog item

## Session Start Checklist (Every Time)

- Confirm current repo root.
- Confirm active git branch.
- Confirm git working tree status.
- Read repo state docs before changes:
  - `AGENTS.md`
  - `project-docs/repo-state.md`
  - `project-docs/backlog.md`

## Step-by-Step Execution Model

### Step 1: Plan the slice
- Define one small objective.
- Define exact files expected to change.
- Define validation commands for this slice.

### Step 2: Make the smallest safe change
- Implement only what is needed for the current objective.
- Reuse existing patterns and utilities when possible.

### Step 3: Validate immediately
- Run directly affected checks/specs first.
- Run `pnpm run typecheck` when TypeScript-impacting changes are present.

### Step 4: Summarize and pause
- Record what changed and what passed.
- Confirm if we proceed to the next slice.

## Multi-Repo Split Flow

1. Build shared package (`5.4`) in shared repo.
2. Validate shared package in-package (unit tests/typecheck).
3. Integrate shared package in showcase repo (`5.5`) using small slices.
4. Stabilize and version shared package.
5. Build template repo (`5.6`) from the stabilized showcase pattern.
6. Build second showcase (`5.7`) from template and validate reuse.

## Git Hygiene Rules

- Use separate branches per repo and per backlog slice.
- Keep commits focused and small.
- Do not combine refactor/cleanup/test-fix work unless directly related to the same slice.
- Before switching repos, ensure work is committed or intentionally stashed.

## Cross-Repo Awareness Without Coupling

- Each repo keeps its own `AGENTS.md`, backlog, and state docs.
- Each repo links to sibling repos for awareness.
- Keep canonical ownership clear:
  - shared package: reusable APIs/contracts/migrations
  - template: onboarding/bootstrap workflow
  - showcase: real usage and site-specific examples

## Communication Contract

- Prefer concrete, procedural instructions over abstract summaries.
- If a concept is new, explain it with a practical example from current files.
- If confusion appears, slow down and restate with a simpler, shorter sequence.

## Ready-to-Proceed Gate

Before advancing to the next backlog item:

- [ ] Current slice objective completed.
- [ ] Required validations passed.
- [ ] Changes summarized clearly.
- [ ] Reviewer/user confirmed understanding and approval.
