# Antora Pilot Workspace

This folder contains the minimal Antora pilot used for `5.2` slice validation.

## Source pages copied for parity checks

- `docs/index.adoc`
- `docs/developer-how-to.adoc`
- `docs/features/conventions.adoc`

## Build output

- `spikes/antora-pilot/build/site/`

## Local UI bundle baseline

- Playbook UI source path is `spikes/antora-pilot/ui-src/` (`./ui-src` in playbook).
- Original downloaded baseline bundle is kept at `spikes/antora-pilot/ui-bundle.zip`.
- Local UI customizations are made directly in `ui-src` and picked up by `docs:build:antora`.
- Baseline source used for this bundle:
  - `https://gitlab.com/antora/antora-ui-default/-/jobs/artifacts/HEAD/raw/build/ui-bundle.zip?job=bundle-stable`
