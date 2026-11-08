# Plan: Reveal.js → Slidev migration POC

Proof-of-concept migration of the Avisi branding and one deck from
[dirkgroot/presentations](https://github.com/dirkgroot/presentations) into this workspace. Context:
[../migration/summary.md](../migration/summary.md).

## Decisions (resolved 2026-11-08)

1. **Branding approach** — a **local custom Slidev theme** (`themes/avisi/`, package
   `slidev-theme-avisi`) instead of deck-level `styles.css`. Implemented and visually verified; see
   [../themes/avisi/summary.md](../themes/avisi/summary.md). Specs validated against the Slidev
   theme-authoring standards (skill `slidev` + official docs) before implementation.
2. **Canvas** — **16:9** (Slidev default). Source slide layouts get reflowed when migrated.
3. **Demo-first** — the POC began with the theme + an `example.md` playground rather
   than migrating a whole deck first (the playground has since moved to
   `decks/avisi-theme-example/`). Which **real deck** migrates first is still open
   (candidates from the earlier POC question: GettingBetterAgainstAllOdds recommended, AoC2025,
   FpOopBestFriendsForever, DesigningWithTypesKotlin).

## Status

- [x] Avisi branding recreated as `themes/avisi/` (fonts, colors, backgrounds, layouts, code styles).
- [x] Playground demo (now `decks/avisi-theme-example/slides.md`) — 8 slides, verified via PDF export screenshots.
- [x] Shared slides ported to `shared/slides/` with cross-deck `src:` imports (decided 2026-11-08;
  see [../shared/summary.md](../shared/summary.md)); the playground deck imports them as the live demo.
- [ ] First real deck migrated to `decks/<name>/` → **done 2026-11-08: `decks/fp-oop-bffs/`**
      (FpOopBestFriendsForever, the lightest candidate). Decisions taken during the migration:
      word emphasis = HTML spans; ± lists = markdown + slide-scoped styles; "Goals:" h3 promoted to
      h2 subtitle; QR codes live-rendered via the new theme component `QrCode` (uqr-based) instead
      of the source's PNGs — details in [../decks/fp-oop-bffs/summary.md](../decks/fp-oop-bffs/summary.md).
      Remaining decks may copy its patterns.
- [x] Confirmed a deck under `decks/` consumes the theme at `theme: ../../themes/avisi` — the
  playground deck runs on it (dev-server verified 2026-11-08).
- [ ] Optional: ir-black Shiki theme port; dark/colored logo variants; out-of-sandbox CI export.

## Next steps (real deck migration)

1. Create `decks/<name>/` (copy the shape of `decks/avisi-theme-example/`), set
   `theme: ../../themes/avisi`, verify locally path resolution works from the decks location.
2. Port slides to markdown per [../migration/feature-mapping.md](../migration/feature-mapping.md);
   copy deck-specific assets (diagrams, QR PNGs) into the deck's `public/`. Openers/intro slides
   come from `shared/slides/` via `src:` imports — do not re-port them per deck.
3. Dark-background slides: manual `style="color: white"` per the theme convention.
4. Verify: `pnpm exec slidev export decks/<name>/slides.md` and rasterize (see
   [../practices.md](../practices.md) → Verification); check fragments/clicks in the dev server.
5. When trusted: migrate remaining decks; revisit GitHub Pages workflow site-layout decision
   ([../practices.md](../practices.md) → Deployment).
