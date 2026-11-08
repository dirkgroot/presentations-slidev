# Plan: Reveal.js → Slidev migration POC

Proof-of-concept migration of one deck from [dirkgroot/presentations](https://github.com/dirkgroot/presentations)
into this workspace. Context: [../migration/summary.md](../migration/summary.md).

## Pending decisions (asked 2026-11-08, not yet answered)

1. **POC deck** — candidates: GettingBetterAgainstAllOdds (recommended: 9 slides, shared slides +
   fragments + auto-animate + fancy backgrounds, best coverage per line), AoC2025 (smallest smoke
   test), FpOopBestFriendsForever (adds QR), DesigningWithTypesKotlin (biggest risk/signal:
   code-heavy, mermaid, iframes).
2. **Branding approach** — deck-level `styles.css` per deck (recommended for POC) vs. building a
   local custom Slidev theme package now.
3. **Canvas** — 16:9 (Slidev default, recommended) vs. preserving source's 1920×1280 3:2 via
   `canvasWidth` + aspect config.

## Steps once decisions land

1. Create `decks/<name>/` (copy shape of `decks/welcome-to-slidev/`).
2. Port slides to markdown per [../migration/feature-mapping.md](../migration/feature-mapping.md);
   copy needed assets (logos, background.png, diagrams) into the deck.
3. Recreate Avisi branding in deck `styles.css` (fonts, tokens, footer logo, background classes).
4. Verify in `pnpm dev decks/<name>/slides.md`; check fragments/clicks and backgrounds.
5. If POC convinces: migrate remaining decks, then revisit shared-theme extraction and the
   GitHub Pages workflow ([../practices.md](../practices.md) → Deployment).
