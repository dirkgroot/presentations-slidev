# Migration: Reveal.js → Slidev

Goal of the current effort: migrate the author's existing presentations from
[dirkgroot/presentations](https://github.com/dirkgroot/presentations) (React + Reveal.js 5) into this
workspace as Slidev decks under `decks/<name>/`. Started 2026-11-08 as a **proof-of-concept** — deck
choice, branding approach, and canvas aspect ratio are still pending decisions
(see [../plans/migration-poc.md](../plans/migration-poc.md)).

## Files

- [reveal-source-repo.md](reveal-source-repo.md) — architecture, deck inventory, branding, and invariants
  of the source repo.
- [feature-mapping.md](feature-mapping.md) — Reveal.js concept → Slidev equivalent, with concrete
  before/after examples.

## Source material

- Canonical source: <https://github.com/dirkgroot/presentations> (branch `main`).
- A throwaway clone was made at `.lode/tmp/presentations-reveal` — **git-ignored and disposable**;
  re-clone from GitHub rather than relying on it. Never copy Reveal.js source files into `decks/`
  directly; port content to markdown per the mapping.

## Status

- [x] Source repo analyzed (see [reveal-source-repo.md](reveal-source-repo.md)).
- [x] Feature mapping drafted (see [feature-mapping.md](feature-mapping.md)).
- [x] Avisi branding recreated in Slidev — as the **local custom theme** `themes/avisi/`
  (decided 2026-11-08, spec-checked against Slidev theme standards; see
  [../themes/avisi/summary.md](../themes/avisi/summary.md)).
- [x] Theme demo / playground: `decks/avisi-theme-example/slides.md` (PDF-export verified 2026-11-08).
- [ ] First real deck migrated (choice pending; see [../plans/migration-poc.md](../plans/migration-poc.md)).
- [x] Canvas aspect ratio decision: **16:9** (Slidev default), source 3:2 layouts reflow.

## Invariants

- Migrated decks follow the repo's multi-deck layout: `decks/<name>/` with `slides.md` as entry
  ([../practices.md](../practices.md) → Repo layout).
- Shared source slides (`AvisiLogoSlide`, `WhoAmISlide`, `AboutAvisiSlide`) repeat across decks; in
  Slidev they can either be duplicated per deck or extracted later — decide per deck, keep each deck
  self-contained for now.
- Branding tokens (Poppins, Avisi colors, footer logo, `background.png`) come from the source repo's
  assets + SCSS: assets were copied into the theme (`themes/avisi/assets/`), styling was recreated as
  CSS ([../themes/avisi/summary.md](../themes/avisi/summary.md)).
