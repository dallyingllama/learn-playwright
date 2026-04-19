# Codex Workflow Guide

This document describes how to consistently use Codex for this project.

---

## 🧠 Core Principle

Codex does not remember anything between sessions.

Always provide context by referencing:

- AGENTS.md (rules & conventions)
- docs/repo-state.md (current state)

---

## 🚀 Standard Workflow

### 1. Start a new session

Prompt:

Read AGENTS.md and docs/repo-state.md.
Summarize the current state of the repository.

---

### 2. Decide next work

Prompt:

Based on repo-state.md, suggest a prioritized backlog of improvements.

(Optional: save results in `docs/backlog.md`)

---

### 3. Work on a task

Prompt:

Implement [specific task].
Follow AGENTS.md conventions.
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

Update docs/repo-state.md to reflect the latest changes.

---

### 6. (Optional) Improve rules

Prompt:

Based on recent changes, suggest updates to AGENTS.md.

---

## 🔁 Quick Workflow (short version)

1. Read AGENTS.md + repo-state.md
2. Pick next task
3. Implement
4. Review
5. Update repo-state.md

---

## ⚠️ Rules

- Do not skip updating repo-state.md
- Always be specific in prompts
- Prefer small improvements over large rewrites
- Never duplicate existing functionality

---

## 🎯 Goal

Continuously evolve this project into a reusable Playwright template/scaffold.
