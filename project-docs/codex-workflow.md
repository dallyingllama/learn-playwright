# Codex Workflow Guide

Audience: Codex-assisted repository sessions.
For local setup and day-to-day developer commands, use `docs/antora/demoqa-docs/modules/ROOT/pages/developer-how-to.adoc`.

## 1) Fresh Session Start

Use this prompt first:

Read `AGENTS.md`, `project-docs/repo-state.md`, and `project-docs/backlog.md`.
Summarize current repository state and recommend the best next backlog item.

Goal:

- re-establish context quickly
- pick one clear next task

## 2) During Session (Prevent Drift)

Use this prompt periodically (for example after 1-3 completed slices):

Quick drift check:
- Compare current work to `project-docs/backlog.md` and `project-docs/repo-state.md`
- Flag anything stale, duplicated, or no longer accurate
- Propose exact doc updates before continuing

Goal:

- keep docs and implementation aligned
- avoid end-of-session cleanup debt

## 3) End Session (Before Context Is Lost)

Use this prompt before finishing:

End-of-session update:
- Update `project-docs/repo-state.md` with current facts from this session only
- Update `project-docs/backlog.md` if status/priorities changed
- Remove stale or duplicate lines in touched docs
- Summarize what was completed and what is next

Goal:

- leave a reliable restart point for the next session

## Rules

- Keep updates factual and concise.
- Do not leave backlog decisions only in chat.
- Use Playwright default `test-results/` output folder only.

## Backlog Closeout Checklist

Before a backlog item is marked complete:

- Validate the item with directly relevant checks (tests, typecheck, docs verify, or equivalent).
- Remove temporary backup/spike artifacts created for the item unless explicitly asked to keep them.
- Update `project-docs/repo-state.md` and `project-docs/backlog.md` to match the actual current state.
- Pause for user review and approval.
- Mark the item done only after user approval.

When moving to a new backlog item:

- First confirm the previous item has been reviewed and closed.
