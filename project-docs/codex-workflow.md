# Codex Workflow Guide

This document describes how to consistently use Codex for this project.

---

## Core Principle

Codex does not remember anything between sessions.

Always provide context by referencing:

- `AGENTS.md` (rules and conventions)
- `project-docs/repo-state.md` (current state)
- `project-docs/backlog.md` (next planned work)

---

## Standard Workflow

### 1. Start a new session

Prompt:

Read `AGENTS.md`, `project-docs/repo-state.md`, and `project-docs/backlog.md`.
Summarize the current state of the repository and suggest the best next backlog item.

---

### 2. Decide next work

Prompt:

Based on `repo-state.md` and `backlog.md`, suggest the best next task to work on.

(Optional: save results in `project-docs/backlog.md`)

---

### 3. Work on a task

Prompt:

Implement [specific task].
Follow `AGENTS.md` conventions.
Reuse existing utilities where possible.
Explain changes.

---

### 4. Review changes

Prompt:

Review the changes for:

- Playwright best practices
- maintainability
- flakiness risks

---

### 5. Update repo state (IMPORTANT)

Prompt:

Update `project-docs/repo-state.md` to reflect the latest changes.

This happens at the end of a work session, after the current dialogue is finished and before committing or pushing changes.

---

### 6. (Optional) Improve rules

Prompt:

Based on recent changes, suggest updates to `AGENTS.md`.

---

## Backlog Usage

- Treat `project-docs/backlog.md` as the working list for future improvements.
- When starting a new session, use the backlog together with `AGENTS.md` and `project-docs/repo-state.md`.
- When a backlog item is completed, mark it clearly so future sessions can see progress.
- If priorities change, update the backlog rather than relying on memory across sessions.

---

## End-of-Session Habit

- Standard end-of-session flow:
  1. Finish the current dialogue
  2. Update `project-docs/repo-state.md`
  3. Review changes
  4. Commit and push/publish
- This keeps the written project state in sync before the next session starts.

---

## Quick Workflow (short version)

1. Read `AGENTS.md` + `project-docs/repo-state.md` + `project-docs/backlog.md`
2. Pick next task
3. Implement
4. Review
5. Update `project-docs/repo-state.md`
6. Update `project-docs/backlog.md` if priorities or status changed
7. Commit and push when ready

---

## Rules

- Do not skip updating `project-docs/repo-state.md`
- Do not let backlog decisions live only in chat; add them to `project-docs/backlog.md`
- Always be specific in prompts
- Prefer small improvements over large rewrites
- Never duplicate existing functionality
- If commands or scripts change, update the relevant docs in the same session
- If test intent changes, reflect that in `project-docs/backlog.md` and `project-docs/repo-state.md` before finishing
- Use Playwright's default `test-results/` folder for run output; do not create custom test result folders

---

## Goal

Continuously evolve this project into a reusable Playwright template/scaffold.
