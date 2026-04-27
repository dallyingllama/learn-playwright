# Antora Pilot Workspace

This folder contains the minimal Antora pilot used for `5.2` slice validation.

## Source pages copied for parity checks

- `docs/index.adoc`
- `docs/developer-how-to.adoc`
- `docs/features/conventions.adoc`

## Build output

- `spikes/antora-pilot/build/site/`

## Local UI bundle baseline

- Antora UI bundle is vendored at `spikes/antora-pilot/ui-bundle.zip`.
- Playbook uses the local bundle path (`./ui-bundle.zip`) instead of a remote URL.
- Baseline source used for this bundle:
  - `https://gitlab.com/antora/antora-ui-default/-/jobs/artifacts/HEAD/raw/build/ui-bundle.zip?job=bundle-stable`
