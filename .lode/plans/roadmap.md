# Roadmap

## Decisions

- **Multi-deck repo** — this repository holds *several* presentations, not a single deck (decided 2026-11-07).
- **Directory per deck** — every deck is self-contained under `decks/<name>/` with its own `slides.md`,
  `pages/`, `components/`, `snippets/`; commands take the deck path (`pnpm build decks/<name>`)
  (decided 2026-11-07).
- **Starter deck removed** — the stock Slidev starter showcase `decks/welcome-to-slidev/` was deleted
  (decided 2026-11-08); its feature demos live on in `decks/avisi-theme-example/`.
- **Deploy via GitHub Pages** — decided 2026-11-07. `netlify.toml` and `vercel.json` removed. No CI workflow
  exists yet.
- **User owns git** — they initialize git and connect the GitHub remote themselves (decided 2026-11-07).
- **Avisi theme subtitle = explicit Comark class only** — `## … {.avisi-subtitle}`; the implicit
  `h1 + h2` adjacent-sibling selector was removed from the theme (decided 2026-11-08, it was a
  leftover experiment). An unclassed `h2` after an `h1` is a normal dark-blue heading.

## Open questions

- **Pages site layout** — one shared site with per-deck `--base` path prefixes vs. one site per deck. Blocks
  creation of the deploy workflow.
