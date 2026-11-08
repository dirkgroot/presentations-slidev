# Deck: fp-oop-bffs

"FP and OOP: Best Friends Forever?" — the **first real deck migrated** from the Reveal.js source
([dirkgroot/presentations](../../migration/reveal-source-repo.md), component
`FpOOpBestFriendsForever`; note the source dir spells `OOp`). Migrated 2026-11-08. The deck is pure
text: no code blocks, no diagrams, no math — its only "assets" are two links. Related:
[../../migration/feature-mapping.md](../../migration/feature-mapping.md),
[../../themes/avisi/summary.md](../../themes/avisi/summary.md),
[../../shared/summary.md](../../shared/summary.md).

## Shape

`decks/fp-oop-bffs/slides.md` only — **no `public/`, no `components/`, no deck CSS** except one
slide-scoped `<style>` block. Global frontmatter:

`theme: ../../themes/avisi` · `title: "FP and OOP: BFFs?"` (quoted — the value's `: ` breaks
unquoted YAML) · `author: Dirk Groot` · `comark: true` · `transition: fade` (ported from the source
Deck config) · `src: ../../shared/slides/avisi-logo.md` — **slide 1 rides on the global-headmatter
separator**; verified working (slidev 53.1.0): the parser imports the shared file as slide 1 while
the remaining keys act as deck config. Slides 2–3 are `src:` imports of `whoami.md` /
`about-avisi.md` in the normal way.

## Slide inventory (10)

| # | Slide | Mechanism notes |
|---|-------|-----------------|
| 1–3 | Avisi logo / WhoAmI / About Avisi | shared slides via `src:`; slide 3 = `about-avisi.md`, now `two-cols-header` (title above columns) with bullet-less list + photo — export via `--per-slide` only, see the export gotcha in [../shared/summary.md](../shared/summary.md) |
| 4 | Title | emphasis words FP/OOP + `?` as `.emphasis` spans (decided: HTML spans, not Comark bold); `<br>` inside the h1 |
| 5 | Background | `## … {.avisi-subtitle}` + `<v-clicks>` list (3 steps) |
| 6 | So what? | `<v-click>` blocks around subtitles; "Goals:" **promoted to h2** (decided — the theme scopes `.avisi-subtitle` to h2); 3-step list |
| 7 | Summary | `<v-clicks>` list, nested list rides with its parent; inline code `` `Status` `` etc. wrapped in `.emphasis` spans → light-blue Fira Code |
| 8 | Conclusion | `.emphasis` "Yes!" mid-line + block attr at line end (that combination works) |
| 9 | Trade-offs | `layout: two-cols-header` + `layoutClass: avisi-white-with-footer` (title in the spanning default slot, columns via `::left::`/`::right::`); each column one `<v-click>`; scoped style: bullet-less lists + `.minus` darkred / `.plus` green prefixes |
| 10 | Thank you | markdown link + Comark inline attr `{target=_blank}` (linkify makes raw `<a>` nest — don't); two `<QrCode>` theme components |

## Decisions

- **QR codes live-rendered, not PNG** (decided 2026-11-08, replacing the source's two QR PNGs):
  theme-provided `QrCode` component (see
  [../../themes/avisi/summary.md](../../themes/avisi/summary.md)) — `<QrCode value="…" :size="150" />`.
  Usage: `**Slides** [url](url){target=_blank}` then the component on its own line.
- **Word emphasis = HTML spans** (decided 2026-11-08): `<span class="emphasis">FP</span>` — exact
  source look (colored, same weight); Comark `**FP**{.emphasis}` would render bold in body text.
- **± lists via scoped styles** (decided 2026-11-08): markdown lists stay; slide-scoped
  `<style>` (scoped to the slide's own elements) hides markers and colors the prefixes.
- The two click-state headings on slide 6 use **raw `<h2 class="avisi-subtitle">`** because a
  Comark block attr directly after an inline HTML span is unreliable (one variant swallowed the
  span, the other dropped the class) — see
  [../../migration/feature-mapping.md](../../migration/feature-mapping.md) → gotchas.
- Source's "Thank you" bullet list became plain paragraphs (the list was a spacing device; no
  markers wanted anyway) — more markdown, no scoped style needed.

## Verification (2026-11-08, slidev 53.1.0)

- Dev server + DOM probe (playwright): 10 slides parsed with slide 1 = shared avisi-logo; 3/5/3/2
  click targets on slides 5/6/7/9 revealing in source fragment order (slide 9's two columns reveal
  as whole-column units); `h2.avisi-subtitle` on slides 4/5/6/8/9; slide 7 code `rgb(17,153,187)`
  in Fira Code; slide 9 `list-style: none`, `darkred`/`green` prefixes; slide 10: two 150px SVG QRs
  (`fill="currentColor"` → `rgb(0,51,69)`), single anchors with `target="_blank"`.
- PDF export (`--with-clicks`, 23 pages) rasterized: all slides visually correct, incl. the 🥳
  emoji box on slide 7 is a sandbox font artifact (renders on real machines).
- Re-verified after the theme's Reveal-parity **centering** landed (same day): `justify-content:
  safe center` + `text-align: center` computed on the layout root, h1/list/QR centered on both
  axes, slide 9's columns top-aligned with each other and centered as a block; fresh PDF + raster
  reviewed. `pnpm lint:md`: 0 issues.
- Re-verified again after the **list parity** fix (same day): lists shrink-wrap and center as a
  block with left-aligned items (was: line-centered text with stranded markers — spotted against
  the live original at presentations.dirkgroot.nl/fp-oop-bffs#/4/0/2), nested list = block with
  square markers under disc top-level items, matching the original's Summary slide.
- Re-verified after slide 9 moved to `two-cols-header` (same day): title centered across the slide
  above the FP/OOP columns (columns side-by-side, top-aligned with each other, both `<v-click>`s
  intact) — matches the original's title-above-ColumnLayout structure; fresh PDF + raster reviewed.
- Re-verified after the **line-spacing parity** fix (same day): li line-height 1.8em → 1.3 and
  padding-top 10px → 0.5em, headings 1.2, paragraphs inherit 1.3 (Slidev's layouts-base.css pinned
  li/p much looser) — computed ratios now equal the live original's; fresh PDF + raster reviewed.
- Re-verified after slide 3 (`about-avisi.md`) moved to `two-cols-header` (same day): title centered
  across the slide, bullet-less left-aligned list + photo below — matches the original. **Exports
  only with `--per-slide`**: one-piece mode silently drops both named slots on this src-imported
  slide (img + second slot; see shared/summary) — bisected with throwaway decks in `.lode/tmp/`.
- Re-verified after the **photo cap** fix (same day): the uncapped photo rendered at ~81% of slide
  height, ran into the footer band and overflowed the slide (title pinned to the top edge);
  `max-height: 320px` in the slide's keyed style restores the original's look (title with air,
  photo ~27–85%, footer logo clear) — dev probe + `--per-slide` raster reviewed.

## Invariants

- The deck owns no assets — the QRs are theme components; all branding comes from the theme.
- `transition: fade` is deck-level here because the source deck used it; don't copy to other decks
  blindly (their source Decks share the same config, though). The theme's
  `styles/transitions.css` makes this fade flash-free
  ([../../themes/avisi/summary.md](../../themes/avisi/summary.md)) — the deck keeps `transition:
  fade` unchanged.
