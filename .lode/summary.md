# Summary

This repository is a personal **multi-deck** presentation workspace built on the [Slidev](https://sli.dev) starter
template, now also the target of a migration from the author's Reveal.js-based presentations
([dirkgroot/presentations](https://github.com/dirkgroot/presentations), analyzed in [migration/](migration/summary.md);
plan in [plans/migration-poc.md](plans/migration-poc.md)). Each presentation is a self-contained deck
directory under `decks/<name>/` holding its own `slides.md` entry, optional `pages/` (imported slide files),
`components/` (Vue components, auto-registered), and `snippets/` (external code samples). The stock
Slidev starter showcase deck was removed (2026-11-08); the only deck currently present is the theme
playground `decks/avisi-theme-example/`. The Avisi branding of the source decks is recreated once as the local
Slidev theme **`themes/avisi/`** (Poppins, palette, `avisi-*` background classes, layouts; demo playground
`decks/avisi-theme-example/`, see [themes/avisi/summary.md](themes/avisi/summary.md)); real deck migration into
`decks/<name>/` is next (16:9 canvas decided). The source decks' shared slides (Avisi-logo opener, $ whoami,
About Avisi) are ported **once** to `shared/slides/` and spliced into any deck via `src:` imports
(see [shared/summary.md](shared/summary.md)). The built SPA (`slidev build <deck>` → `dist/`) is deployed via
**GitHub Pages** (decided 2026-11-07); the Pages deploy workflow is pending the site-layout decision
(shared site with path prefixes vs. one site per deck).
