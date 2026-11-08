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
- `styles/code.css` — `pre` at 0.65em × 0.95 (source `Deck.scss`); plus inline code inside headings
  (`h1 code` … `h4 code`) gets `font-weight: inherit` — Slidev's inline-code chip forces
  `font-light` (300), which thinned mono text in bold headings (the shared whoami slide's
  `$ whoami_`; verified dev-probe + PDF 2026-11-08). Selector gotcha: Slidev's own
  `:not(pre) > code` pattern can **never** match `<h1><code>` — the `:not(pre)` step must be a
  strict descendant of the heading, but for direct children it *is* the heading — use plain
  `h1 code` (a `pre` cannot occur inside a heading anyway).
- `styles/backgrounds.css` — the four background classes (`avisi-*`, see below) plus the white-text
  defaults for the two dark classes.
- `layouts/default.vue`, `layouts/cover.vue` — minimal `.slidev-layout` + `<slot />` wrappers; `cover`
  centers its content (absolute inset grid).
- `setup/shiki.ts` — Shiki `dark-plus` single dark highlight theme standing in for the source's hljs
  **ir-black** (ir-black is not bundled with Shiki; hand-port pending, see roadmap).
- `assets/` — `background.png` + `avisi_logo.png` copied from the source repo clone; referenced from
  CSS via relative `url(../assets/…)`, which Vite resolves/hashes in dev and build alike. The theme
  has **no `public/` dir**: slide-markup `<img>` assets belong to the deck (served root = deck dir).
- The former `example.md` playground moved to **`decks/avisi-theme-example/slides.md`** (decided
  2026-11-08) — see [../../decks/avisi-theme-example/summary.md](../../decks/avisi-theme-example/summary.md).

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
`.subtitle` h2 look (bold, `1.6em × scale`, dark gray) — see the invariants below; `li` padding-top
10px; borderless tables (source `table td { border-bottom: none }`). Pixel values from the 1920px source
canvas were halved for Slidev's 980px canvas (footer padding 15px → 8px).

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
  keep the light-blue accent (legible on dark); Slidev's inline-code chip keeps its light background and
  gets its dark-gray text restored (it would inherit white otherwise). Light classes keep the dark-on-light
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
