# Theme: slidev-theme-avisi

Avisi-branded **local Slidev theme** at `themes/avisi/` — a faithful CSS port of the Reveal.js branding
of [dirkgroot/presentations](../migration/reveal-source-repo.md). Follows the Slidev theme conventions
(name `slidev-theme-*`, keywords `slidev-theme|slidev`, no build step). Related:
[../../plans/migration-poc.md](../../plans/migration-poc.md), [../../practices.md](../../practices.md),
[../../migration/feature-mapping.md](../../migration/feature-mapping.md).

## Structure

- `package.json` — `slidev: { colorSchema: "light", defaults: { fonts } }`; fonts resolve via Google
  Fonts (Poppins sans+serif, Fira Code mono, weights 400/600) — decks need **no** `fonts:` headmatter.
- `tsconfig.json` — loads `compilerOptions.types: ["vite/client"]`, whose ambient
  `declare module '*.css'` makes type-checkers accept the side-effect CSS imports in `styles/index.ts`
  (fixes `TS2882` on `@slidev/client/styles/layouts-base.css`). The tsconfig is required because
  IntelliJ only reliably binds ambient declarations when an explicit tsconfig scopes the theme (an
  `env.d.ts` triple-slash reference fixed tsc but was not picked up by IntelliJ's inferred project,
  and was later removed as redundant). Covers `styles/**` and `setup/**`; extend `include` if more
  theme TypeScript is added. `vite` resolves via the hoisted root `node_modules`
  (`shamefullyHoist: true` in the workspace).
- `styles/index.ts` — style entry; first imports `@slidev/client/styles/layouts-base.css` (inherit-then-
  extend pattern from the official `create-theme` template), then the css below.
- `styles/tokens.css` — design tokens: CSS custom properties on `:root` (Avisi palette, the
  `--slidev-theme-primary` knob, footer logo geometry, `--avisi-font-scale`).
- `styles/typography.css` — global typography, all nested under `.slidev-layout` so styles never
  leak into the presenter UI: body font/color, heading sizes/weights, links, list markers,
  borderless tables, `.emphasis` accent, the `.cover`/`.default` `.title` sizing and
  `h2.avisi-subtitle`.
- `styles/code.css` — `pre` at 0.65em × 0.95 (source `Deck.scss`); inline code renders **chip-free**
  (decided 2026-11-08): the theme overrides Slidev's built-in `:not(pre) > code` chip rule (identical
  selectors in `slides-code.css`, imported first from `styles/index.ts`; later source order wins at
  equal specificity — the override must sit at **top level**, not nested under `.slidev-layout`,
  or the selector doubles and stops matching) with `background: none; padding: 0; border-radius: 0`
  and keeps the chip's `font-light` 300. Plus inline code inside headings (`h1 code` … `h4 code`)
  gets `font-weight: inherit` — Slidev's inline-code chip forces `font-light` (300), which thinned
  mono text in bold headings (the shared whoami slide's `$ whoami_`; verified dev-probe + PDF
  2026-11-08). Selector gotcha: Slidev's own `:not(pre) > code` pattern can **never** match
  `<h1><code>` — the `:not(pre)` step must be a strict descendant of the heading, but for direct
  children it *is* the heading — use plain `h1 code` (a `pre` cannot occur inside a heading anyway).
- `styles/backgrounds.css` — the four background classes (`avisi-*`, see below) plus the white-text
  defaults for the two dark classes.
- `styles/transitions.css` — flash-free `fade` fix (added 2026-11-08, see below).
- `layouts/default.vue`, `layouts/cover.vue` — minimal `.slidev-layout` + `<slot />` wrappers; `cover`
  centers its content (absolute inset grid).
- `layouts/two-cols.vue` — **theme override of the client layout** (added 2026-11-08): a wrapped
  flex row instead of the client's grid, so the Reveal-parity centering (below) applies — the single
  line of columns is centered vertically as a block (`align-content: safe center`) while the columns
  stay top-aligned with each other (`align-items: flex-start`), matching the source `ColumnLayout`.
  Same prop contract as the built-in: frontmatter `class` → both column children, `layoutClass` →
  root (verified: `about-avisi.md` + the playground split slide).
- `layouts/two-cols-header.vue` — **theme override of the client layout** (added 2026-11-08): for
  title-above-columns slides (source: `h1` above a `ColumnLayout`). Root keeps the global flex-column
  centering; the default slot (`.col-header`) spans both columns and centers as part of the block,
  with a `.cols` wrapped flex row (columns `flex: 1`, top-aligned with each other,
  `column-gap: 40px` — the source ColumnLayout's 80px halved) below. Same slot
  contract as the built-in (`default` = header, `::left::`/`::right::`; `class` → columns,
  `layoutClass` → root) — divergence: the built-in's `::bottom::` slot flows after the columns
  instead of pinning to the slide's bottom edge, which the centered-block semantics forbid. Export
  gotcha for src-imported slides using it: see [../shared/summary.md](../shared/summary.md).
- `setup/shiki.ts` — Shiki `dark-plus` single dark highlight theme standing in for the source's hljs
  **ir-black** (ir-black is not bundled with Shiki; hand-port pending, see roadmap).
- `assets/` — `background.png` + `avisi_logo.png` copied from the source repo clone; referenced from
  CSS via relative `url(../assets/…)`, which Vite resolves/hashes in dev and build alike. The theme
  has **no `public/` dir**: slide-markup `<img>` assets belong to the deck (served root = deck dir).
- `components/QrCode.vue` — theme-provided component (added 2026-11-08, first used by
  `decks/fp-oop-bffs/`): ~10-line SFC on **`uqr`** (zero-dep QR lib by antfu, theme dependency,
  hoisted via `shamefullyHoist`) rendering `renderSVG()` through `v-html`. Props: `value` (required),
  `size` (default 150), `color` — default resolves via `fill="currentColor"` +
  `.avisi-qr { color: var(--avisi-color-dark-blue) }` (CSS vars work in CSS, not in SVG presentation
  attributes). Crisp SVG at any export resolution; white background rect from uqr gives the quiet
  zone. **Decided 2026-11-08: theme components are our cross-deck component mechanism** — themes may
  "provide custom components" (official docs), every deck already consumes the theme, so no addon
  packaging or per-deck copies. If a component is ever needed *without* the Avisi theme, promote it
  to a local `slidev-addon-*` package instead.
- The former `example.md` playground moved to **`decks/avisi-theme-example/slides.md`** (decided
  2026-11-08) — see [../../decks/avisi-theme-example/summary.md](../../decks/avisi-theme-example/summary.md).

## Centering (Reveal.js parity, added 2026-11-08)

The source decks center slide content on **both axes** (Reveal: `.reveal .slides` `text-align:
center` + the `center: true` JS). The theme reproduces this globally on `.slidev-layout`:
`display: flex; flex-direction: column; text-align: center;` plus
`justify-content: center` **with a `safe center` fallback declaration** — `safe` (valid in
Chromium, verified in computed styles) pins overflowing slides to the top instead of clipping both
ends. Companion rules: `pre` stays `text-align: left` (code must not center —
deliberate divergence: Reveal inherited centering into `pre`); opt out per slide with the
`avisi-top-left` class (frontmatter `class:`/`layoutClass:`) for top-left-aligned content.
Gotcha: flex **blockifies** `inline-block` children — `.avisi-qr` centers via `margin: 0 auto`
(its own rule) because `text-align` can't center a fixed-width flex item.

## Lists (Reveal.js theme-template parity, added 2026-11-08)

Reveal's theme template (`css/theme/template/theme.scss`) styles every list
`inline-block; text-align: left; margin-left: 1em` — lists **shrink-wrap and center as a block**
(inline-block participates in the parent's `text-align: center`) with left-aligned items, and
nested lists fall back to `display: block`. The theme ports this onto `.slidev-layout` with two
flex adaptations: `width: fit-content` (flex **blockifies** `inline-block` on direct flex
children — `fit-content` + `margin-inline: auto` on `& > ul` covers that case; wrapped ones center
via the inherited `text-align`) and a halved nested indent (`margin-left: 20px`, source 40px at
1920px). Also ports the marker ladder (`ul` disc → `ul ul` square → `ul ul ul` circle) because
Slidev's own `layouts-base.css` flattens every `ul` to `square` — our file loads after it, so
equal-specificity overrides win. Verified against the live original deck (computed
`inline-block`/`block` + `text-align: left` on the published site, screenshots per slide).

## Slide transitions (flash-free fade, added 2026-11-08)

Slidev's built-in `fade` cross-fades **both** slides simultaneously (enter 0→1, leave 1→0), so
mid-transition the combined opacity dips below 1 and the plain page background behind the slides
shows through — decks on this theme "flash" lighter for a fraction of a second on every
`transition: fade` (notably the footer band, since the photo/gradient backgrounds live on each
`.slidev-layout` and fade with it). `styles/transitions.css` fixes this by making the fade a
**stacked fade**: the outgoing slide holds at opacity 1 underneath while the incoming slide fades
in on top, so the stack stays fully covered at every moment. Verified by pixel sampling at the
cross-fade midpoint (slow-mo `--slidev-transition-duration` + screenshot sampling): footer-band
pixel identical to the settled state in both directions, against stock `fade` washing it from
`rgb(0,52,71)` to `rgb(34,79,95)` (env `STOCK_FADE=1 probe` reproduces stock; probe at
`.lode/tmp/`, git-ignored).

Constraints to keep it working:

- The leaving slide's `fade-leave-to` is intentionally `opacity: 1` — an equal 1→1 opacity
  transition keeps the element mounted for the transition duration (Vue removes it via its timeout
  fallback when `transitionend` never fires). Don't "fix" the no-op transition by dropping the
  `transition` property on `.fade-leave-active`.
- `#app` is prefixed to win specificity over `@slidev/client/styles/transitions.css` regardless of
  stylesheet order — keep it when editing.
- `fade-enter-active` carries `z-index: 10` so the incoming slide paints above the outgoing one
  on **backward** navigation too (DOM order alone only helps going forward).
- This fixes `fade` (the only transition any deck uses). `fade-out` is inherently sequential
  (out-then-in) and would still expose the background during its gap; it's not overridden.

## Palette (was `src/settings.scss` / `Deck.scss`)

Exposed both as Avisi CSS vars and `--slidev-theme-primary` — the latter is an **alias** of
`--avisi-color-light-blue` (`--slidev-theme-primary: var(--avisi-color-light-blue)` in `tokens.css`),
so framework surfaces always follow the Avisi accent; deck `themeConfig` overrides it by setting the
`--slidev-theme-primary` var itself.

| token | value | use |
|---|---|---|
| `--avisi-color-background` | `#f8f8f8` | slide/gradient base |
| `--avisi-color-dark-blue` | `#003345` | headings |
| `--avisi-color-light-blue` | `#1199bb` | links, `li::marker`, `.emphasis`, primary |
| `--avisi-color-dark-gray` | `#595959` | body text |
| `--avisi-color-light-gray` | `#eee` | right-half-gray background |
| `--avisi-font-scale` | `0.95` | multiplies all ported sizes |

Typography: headings bold Poppins `#003345`, h1–h4 at 2.5/1.6/1.3/1.0 em × scale; `.emphasis` colors the
signature light-blue punctuation; subtitles (an `h2` carrying `.avisi-subtitle`) use the source's
`.subtitle` h2 look (bold, `1.6em × scale`, dark gray) — see the invariants below; borderless tables
(source `table td { border-bottom: none }`). Pixel values from the 1920px source canvas were halved
for Slidev's 980px canvas (footer padding 15px → 8px).

Line spacing (Reveal.js parity, added 2026-11-08): the source runs `line-height: 1.3` on the whole
section (theme template `.reveal .slides section`) and `1.2` on headings (`--r-heading-line-height`).
Slidev's `layouts-base.css` instead pins `li` to **1.8em** and `p` to **1.5rem** — the theme overrides
both on `.slidev-layout` (`line-height: 1.3` on the root, `line-height: inherit` on `li` and `p`,
`1.2` in the headings block). `li` padding-top is the source's 20px-at-40px font (Deck.scss) as a
font-relative **0.5em** (was 10px — relatively looser than the source), so spacing scales with
`--avisi-font-scale`. Verified by computed-style ratios against the live original (li 1.30/0.50,
headings 1.20) and PDF rasters of both decks.

## Background classes (was `Backgrounds.tsx` enum)

Applied via per-slide frontmatter `class:`. The Avisi footer logo is a **CSS background layer**
(bottom-left), so slides never carry footer markup — **except** on layouts with a declared `class`
prop (Slidev client built-ins like `two-cols` swallow frontmatter `class` onto their column children
instead of the root); there, bind the background to the root via `layoutClass:` instead
(see invariants below).

| class | source enum |
|---|---|
| `avisi-fancy` | `FancyBackground` (background.png, cover) |
| `avisi-fancy-with-footer` | `FancyWithFooter` |
| `avisi-white-with-footer` | `WhiteWithFooter` (opaque above the footer strip) |
| `avisi-half-gray` | `RightHalfGrayWithFooter` (right half `#eee`) |

The two `avisi-fancy*` classes are dark and default to **white text** — see the invariant below.

## Usage patterns / invariants

- Background classes target `.slidev-layout` — our layouts bind frontmatter `class` to that root, so
  `class: avisi-fancy` works on them. **Standard client layouts with a declared `class` prop**
  (`two-cols`, `two-cols-header`) apply frontmatter `class` to *both column children* instead — use
  `layoutClass: avisi-half-gray` there (verified: the example's half-gray slide uses
  `layout: two-cols` + `layoutClass:`; selector matches the root `.slidev-layout.two-columns`).
  `layoutClass` binds to the layout root, so extra UnoCSS utilities can ride along — e.g.
  `layoutClass: avisi-half-gray gap-8` adds a column gap (the `two-cols` built-in has none;
  `two-cols-header` hardcodes `column-gap: 20px`). Caveat: `avisi-half-gray` paints its split at
  exactly 50% slide width; a gap narrows the columns away from that boundary and exposes a sliver
  of `background.png` in between — fine when the strip there is near-white (as in the playground),
  but visible otherwise.
- **One subtitle path** (source look = bold, 1.6em × scale, dark gray — the `.subtitle` h2s):
  **explicit Comark (h2 only)** — `## Subtitle text {.avisi-subtitle}`; needs `comark: true` in the
  deck headmatter (decided 2026-11-08: the implicit `h1 + h2` sibling selector was dropped, so an
  unclassed `h2` — including one directly after the title — is always a normal dark-blue heading).
  Verified working on slidev 53.1 (2026-11-08): both paragraph- and
  heading-attached trailing block attrs work (the slidevjs/slidev#2639 gap is fixed in our comark
  version). The theme scopes the class to **`h2` elements only** (`.slidev-layout
  h2.avisi-subtitle`) — classing any other element is intentionally inert, keeping the class
  unambiguous as an "explicit subtitle" marker.
  - **`h1 + p` is intentionally not a subtitle path** — a bare paragraph under the title stays plain
    body text (the source decks' `h1 + p` idiom was deliberately dropped from the theme).
- Dark-background classes (`avisi-fancy`, `avisi-fancy-with-footer`) render **white text by default**
  (backgrounds.css: root `color` + h1–h4 + the `h2.avisi-subtitle` subtitle selector flip
  to white). Slides on fancy
  backgrounds therefore carry **no** per-element `style` attributes. Links, `li::marker` and `.emphasis`
  keep the light-blue accent (legible on dark); inline code is chip-free (code.css) and carries **no
  color override** here — it inherits the root's white like regular text (verified headless probe
  2026-11-08: chip background gone on all playground slides). Light classes keep the dark-on-light
  palette. This intentionally diverges from the source decks, which set `style={{color: "white"}}` on every
  element manually.
- `avisi_logo.png` is a **white** wordmark: only correct on dark backgrounds. `cover` slides must pair
  `layout: cover` with `class: avisi-fancy`.
- Decks consume the theme via local path relative to the deck entry file, e.g. `theme:
  ../../themes/avisi` from `decks/<name>/slides.md` (verified: the playground deck runs this way).
- The source's bottom-right slide number was Reveal presenter UI and is intentionally not migrated.

## Known limitations

- Shiki uses `dark-plus` instead of the ir-black visual (closest dark block-on-white look).
- `slidev export --format png` (59-state: slidev 53.1.0) omits slide `<img>` assets on the page-container
  screenshot path even with `--wait`/`--per-slide`; **PDF export renders them fine** — use PDF (+pdftoppm)
  for visual verification, see [../../practices.md](../../practices.md) → Verification.
