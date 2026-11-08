# Lode Map

Hierarchical index of the lode. Keep this file accurate when adding/moving files.

- **summary.md** — one-paragraph living snapshot of the project.
- **terminology.md** — Slidev + project domain terms (term - meaning).
- **practices.md** — toolchain (pnpm/npm split), commands, dev-server MCP surface (`/__mcp` HTTP +
  `slidev mcp` stdio), deployment, authoring conventions, environment.
  Per the Lode-vs-skill rule, procedural runbooks live as project skills (skills are referenced by
  name from the lode):
  - **Project skill `dev-server`** (`.agents/skills/dev-server/`) — start/verify/stop the Slidev dev
    server, incl. headless `--remote` mode + sbx port publishing for host-browser preview.
- **slides/** → replaced by per-deck lode dirs mirroring the repo:
- **decks/avisi-theme-example/summary.md** — the Avisi theme playground deck: purpose, anatomy,
  theme-consumption path, deck-owned public assets.
- **themes/** → per-theme lodes mirroring the repo:
  - **themes/avisi/summary.md** — the Avisi local theme (`themes/avisi/`): package metadata, palette,
    background classes, layouts, usage invariants, known limitations. Its playground lives as the
    deck `decks/avisi-theme-example/`.
- **shared/** → per-dir lode mirroring the repo:
  - **shared/summary.md** — the reusable shared slides (`shared/slides/`): inventory (ported from
    the revealjs `src/slides/`), cross-deck `src:` consumption, authoring rules (assets / scoped
    styles / Uno / Comark gotchas), verification trail.
- **migration/** — Reveal.js → Slidev migration knowledge:
  - **migration/summary.md** — migration effort overview, source-material policy, status, invariants.
  - **migration/reveal-source-repo.md** — architecture, deck inventory, shared components, and Avisi
    branding of the source repo (dirkgroot/presentations).
  - **migration/feature-mapping.md** — Reveal.js concept → Slidev equivalent, with concrete
    before/after examples.
- **plans/** — roadmaps & TODOs:
  - **plans/roadmap.md** — standing roadmap: decisions log and open questions.
  - **plans/migration-poc.md** — migration POC: pending decisions (POC deck, branding, canvas) and steps.
- **tmp/** — git-ignored session scraps and handovers (incl. throwaway clone `presentations-reveal/`).
