# Summary

This repository is a personal **multi-deck** presentation workspace built on the [Slidev](https://sli.dev) starter
template, now also the target of a migration from the author's Reveal.js-based presentations
([dirkgroot/presentations](https://github.com/dirkgroot/presentations), analyzed in [migration/](migration/summary.md);
plan in [plans/migration-poc.md](plans/migration-poc.md)). Each presentation is a self-contained deck
directory under `decks/<name>/` holding its own `slides.md` entry, optional `pages/` (imported slide files),
`components/` (Vue components, auto-registered), and `snippets/` (external code samples). Deck #1,
`decks/welcome-to-slidev/`, is still the stock starter showcase (demonstrating Slidev features: clicks, magic-move,
LaTeX, diagrams, draggables, Monaco). The Avisi branding of the source decks is recreated once as the local
Slidev theme **`themes/avisi/`** (Poppins, palette, `avisi-*` background classes, layouts; demo playground
`decks/avisi-theme-example/`, see [themes/avisi/summary.md](themes/avisi/summary.md)); real deck migration into
`decks/<name>/` is next (16:9 canvas decided). The built SPA (`slidev build <deck>` → `dist/`) is deployed via
**GitHub Pages** (decided 2026-11-07); the Pages deploy workflow is pending the site-layout decision
(shared site with path prefixes vs. one site per deck).
