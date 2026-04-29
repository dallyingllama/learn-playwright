# Backlog

Active backlog only. Completed work is tracked in `project-docs/repo-state.md` and git history.

## 5. Implement the re-usable architecture strategy

### 5.1 Evaluate Antora migration fit

- Run a small pilot/spike to evaluate whether Antora should replace or complement the current docs approach.
- Capture decision criteria, migration cost, and recommendation.
- Status: completed on branch `spike/5.1-antora-fit`.
- Recommendation: adopt Antora before repository split work to avoid repeating docs migration across future repos.

Checklist:

- Create a dedicated spike branch named `spike/5.1-antora-fit`.
- Keep spike scope docs-only (no Playwright test architecture or framework behavior changes).
- Create a pilot workspace under `spikes/antora-pilot/`.
- Include a minimal representative doc set in the pilot:
  - `docs/index.adoc`
  - one page from `docs/features/`
  - `docs/developer-how-to.adoc`
- Record side-by-side command flow for current docs build and Antora pilot build.
- Record setup complexity, local authoring experience, and CI fit observations.
- Estimate migration effort as phased steps with rough sizing (small/medium/large).
- Write a recommendation note: `adopt`, `defer`, or `hybrid`.
- Keep or remove pilot artifacts intentionally and document the decision.

Acceptance criteria:

- A written recommendation exists with explicit decision criteria and final recommendation.
- The recommendation includes migration cost and phased execution outline.
- The recommendation identifies risks, mitigations, and rollback approach.
- No production test files, page objects, or CI test execution logic are changed as part of the spike.
- `corepack pnpm run docs:build` still succeeds in the main repository after the spike changes.

### 5.2 Migrate docs pipeline to Antora before split work

- Introduce Antora as the primary docs build path in this repository before `5.3+` split activities.
- Keep current docs content source (`docs/`) and migrate build/publish pipeline incrementally.
- Vendor or customize UI bundle locally to avoid remote URL dependency.
- Update local docs commands and CI docs publishing to use Antora output.
- Validate output parity for key pages:
  - landing/index
  - developer how-to
  - features/conventions
- Status: completed.
- Completed slices:
  - added local Antora build/preview scripts and pilot workspace
  - switched CI docs pipeline default to Antora with `DOCS_PIPELINE` fallback
  - added `/docs/index.html` redirect to `/docs/demoqa-docs/current/index.html`
  - validated published Antora docs in GitHub Actions
  - vendored Antora default UI baseline as `spikes/antora-pilot/ui-bundle.zip`
  - extracted local editable UI source to `spikes/antora-pilot/ui-src/` and wired playbook `ui.bundle.url` to `./ui-src`
  - added Antora docs smoke-check command (`docs:verify:antora`) and wired it into CI Antora docs build step
  - pinned `docs:build:antora` to `antora@3.1.14` in `package.json` to keep local and CI build behavior stable
  - documented explicit rollback steps for local docs flow and CI `DOCS_PIPELINE` fallback in `docs/developer-how-to.adoc`

Acceptance criteria:

- Local Antora build command is documented and working.
- CI docs publish step builds and publishes Antora output successfully.
- Existing key pages render and link correctly in the generated site.
- A rollback path to current docs build is documented during transition.

### 5.2a Antora post-migration cleanup and UI alignment

- Purpose: finish Antora migration cleanup so active docs assets are organized and production-ready.
- Scope: Antora docs structure, source-of-truth alignment, and UI polish only.
- Status: in progress.

Phase A: structure cleanup

- A.1 move active Antora runtime workspace from `spikes/antora-pilot/` to stable `docs/antora/`.
- A.2 switch scripts/CI/verification paths to stable `docs/antora/` locations.
- A.3 keep spike artifacts temporarily until parity is validated, then remove remaining runtime dependencies on `spikes/`.

Phase B: source de-duplication

- B.1 define one source of truth for publishable pages.
- B.2 remove duplicate page copies between `docs/` and Antora component pages.
- B.3 run docs smoke checks and fix any broken links/navigation caused by consolidation.

Phase C: UI and navigation polish

- C.1 replace default sample top-nav items with repository-relevant actions/links.
- C.2 update pilot labels/titles to production naming.
- C.3 tune left navigation structure and styling for parity with prior docs usability expectations.

Acceptance criteria:

- No active docs build, preview, or CI publish step depends on `spikes/`.
- Publishable docs pages have one clear source of truth.
- Top navigation, labels, and left menu are intentional and project-relevant.
- `corepack pnpm run docs:build:antora` and `corepack pnpm run docs:verify:antora` pass.

### 5.3 Define architecture split blueprint

- Use `project-docs/repository-approach.md` sections:
  - Definition of ready to split
  - Boundary Rules
  - Versioning and release approach
  - Execution Plan Mapping
- Produce a concrete split plan for this repo:
  - what moves to shared package first
  - what remains project-specific
  - migration order and acceptance checks

### 5.4 Create shared package skeleton

- Scaffold the shared Playwright package with initial reusable exports.
- Add basic package scripts/versioning and initial docs.
- Move only low-risk reusable utilities first.

### 5.5 Integrate current repo as first showcase consumer

- Wire this repo to consume the shared package.
- Keep DemoQA-specific selectors/flows local.
- Validate with directly affected specs and typecheck.

### 5.6 Create template repo

- Build a starter repo that consumes a stable shared package version.
- Keep template logic minimal and generic.
- Document standard bootstrap/run workflow for new projects.

### 5.7 Create second showcase repo

- Add a second demo site showcase to validate cross-site reuse.
- Confirm shared package boundaries hold across different applications.
- Record findings and adjust shared package scope where needed.
