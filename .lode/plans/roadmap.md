# Roadmap

## Decisions

- **Multi-deck repo** — this repository holds *several* presentations, not a single deck (decided 2026-11-07).
- **Directory per deck** — every deck is self-contained under `decks/<name>/` with its own `slides.md`,
  `pages/`, `components/`, `snippets/`; commands take the deck path (`npm run build -- decks/<name>`)
  (decided 2026-11-07). The starter deck was migrated to `decks/welcome-to-slidev/`.
- **Deploy via GitHub Pages** — decided 2026-11-07. `netlify.toml` and `vercel.json` removed. No CI workflow
  exists yet.
- **User owns git** — they initialize git and connect the GitHub remote themselves (decided 2026-11-07).
- **Avisi theme subtitle = explicit Comark class only** — `## … {.avisi-subtitle}`; the implicit
  `h1 + h2` adjacent-sibling selector was removed from the theme (decided 2026-11-08, it was a
  leftover experiment). An unclassed `h2` after an `h1` is a normal dark-blue heading.

## Open questions

- **Pages site layout** — one shared site with per-deck `--base` path prefixes vs. one site per deck. Blocks
  creation of the deploy workflow.
- Replace the stock starter deck (`decks/welcome-to-slidev/`) with a real presentation.
- Verify the migrated deck builds/exports on the dev machine (the Linux sandbox couldn't: rolldown native
  binding is macOS-only in the current `node_modules`).
