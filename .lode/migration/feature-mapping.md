# Feature mapping: Reveal.js → Slidev

How each mechanism used in [dirkgroot/presentations](https://github.com/dirkgroot/presentations)
maps to Slidev, with concrete before (JSX) / after (markdown) examples. Related:
[reveal-source-repo.md](reveal-source-repo.md), [../terminology.md](../terminology.md),
[../decks/avisi-theme-example/summary.md](../decks/avisi-theme-example/summary.md) (Slidev feature demos).

## Core mapping

| Reveal.js source | Slidev target | Notes |
|---|---|---|
| Presentation component (`<Deck>…</Deck>`) | deck dir `decks/<name>/slides.md` | One deck = one directory, self-contained |
| `<section>` JSX slide | `---`-separated slide + frontmatter | Global frontmatter holds deck-wide config |
| `className="fragment"` | `v-click` / `v-after` | Wrap the element; lists can use `<li v-click>` |
| Reveal **AutoAnimate** between slides | `v-click` steps (elements) / **magic-move** (code) | AutoAnimate diffs JSX across slides; Slidev equivalent is click-stepping within one slide |
| `data-background={Backgrounds.X}` | per-slide `class:` `avisi-*` background classes | Ported into the theme, see below |
| highlight.js `Code` w/ `data-line-numbers` | fenced code block, `{lineNumbers}` via frontmatter `highlight` | Shiki replaces highlight.js; line highlighting via `{1|3-4}` syntax |
| `MermaidDiagram` component | native mermaid block: ```` ```mermaid ```` | No wrapper component needed |
| RevealMath plugin | KaTeX `$…$` / `$$…$$` | Built in |
| Reveal `center: true` + `.slides` `text-align: center` | theme default — `.slidev-layout` flex column + `text-align: center`, `safe center` overflow fallback, `avisi-top-left` opt-out class | Ported 2026-11-08 into `themes/avisi/` (see its summary → Centering); `pre` deliberately stays left-aligned |
| `ColumnLayout`/`Column` | `two-cols` layout or UnoCSS `grid="~ cols-2 gap-4"` | Attributified utilities are the repo convention. Title *above* the columns (h1 + ColumnLayout) → `two-cols-header` (theme override, see themes/avisi summary). Gotcha: a **src-imported** slide with an img in one named slot + a second slot loses both slots' content in one-piece PDF export — use `--per-slide` (see shared/summary) |
| `<iframe src="https://giphy…">` | raw `<iframe>` in markdown | Works as-is; keep `drop-shadow` styling in CSS |
| `react-qr-code` / QR PNGs | **theme component `QrCode`** (`themes/avisi/components/QrCode.vue`, uqr-based, SVG, Avisi-dark-blue default) — `<QrCode value="…" :size="150" />` | Decided 2026-11-08; theme components are the cross-deck component mechanism (see ../themes/avisi/summary.md). Realized in `decks/fp-oop-bffs/` |
| Reveal notes plugin | presenter notes = last comment block per slide | `[click]` markers sync to clicks |
| decktape PDF export | `slidev export` (built-in PDF/PNG/PPTX) | No window.Reveal hack needed |
| `scroll` route variant | Slidev has no scroll view — drop | Not needed for Slidev presenter flow |

> **Realized in `themes/avisi/`** — see [../themes/avisi/summary.md](../themes/avisi/summary.md):
> fonts via `slidev.defaults` (Poppins/Fira Code, weights 400/600), palette in `styles/tokens.css`,
> `.emphasis` in `styles/typography.css`, highlighter `dark-plus` (ir-black port pending), the four
> background classes `avisi-fancy` / `avisi-fancy-with-footer` / `avisi-white-with-footer` /
> `avisi-half-gray` in `styles/backgrounds.css`. On dark backgrounds text defaults to white via
> the theme (no per-element styles — a deliberate divergence from the source decks, which styled
> every element manually).

## Example: fragments

```jsx
// Reveal.js (source)
<ul>
  <li className="fragment">Insight</li>
  <li className="fragment">Expertise</li>
</ul>
```

```md
<!-- Slidev (target) -->
<ul>
  <li v-click>Insight</li>
  <li v-after>Expertise</li>
</ul>
```

## Example: heading with Emphasis punctuation

```jsx
<h1 className={styles.title}>De uitdaging<Emphasis>.</Emphasis></h1>
```

```md
# De uitdaging<span class="emphasis">.</span>
```

The Emphasis signature and `.title` sizing live once in the theme
([../themes/avisi/summary.md](../themes/avisi/summary.md)): `.emphasis { color: #1199bb }` under
`.slidev-layout` in the theme's `styles/typography.css`. Footer logo + Poppins + colors are theme-global
— implemented in `themes/avisi/` (see pending-decisions resolution in
[../plans/migration-poc.md](../plans/migration-poc.md)).

## Canvas

Source decks are authored at **1920×1280 (3:2)**. Slidev decks use the default **16:9** canvas
(decided 2026-11-08, see [../plans/migration-poc.md](../plans/migration-poc.md)); source slide
layouts get reflowed when migrated.

## Invariants / gotchas

- JSX styling (`style={{…}}`, SCSS modules) becomes plain CSS + UnoCSS utilities; there is no
  per-element `style` prop in markdown — use classes.
- Reveal's `data-trim` (whitespace trimming of code) is unnecessary in Slidev: fenced blocks keep
  author formatting.
- Reveal fragments inside `AutoAnimate` groups become click steps **within one Slidev slide** —
  the source's one-slide-per-step AutoAnimate pattern collapses into a single slide with `v-click`s.
- Positional slide numbering matters again after migration: click-step references shift when slides
  are inserted.
- **Comark block attrs must not directly follow an inline HTML span** (verified slidev 53.1.0 on
  `decks/fp-oop-bffs` slide 6): `## Goals<span class="emphasis">:</span>{.avisi-subtitle}` dropped
  the class, and `…happens<span class="emphasis">!</span>{.avisi-subtitle}` swallowed the span
  entirely; `<v-click>` blocks wrapping `<h2>`s + the block attr on a heading with only a `<br>`
  between span and attr work fine. When a classed heading must end with an emphasized punctuation
  span, write raw HTML: `<h2 class="avisi-subtitle">Goals<span class="emphasis">:</span></h2>`.
- **Don't wrap linkified URLs in raw `<a>` tags** (verified slidev 53.1.0): markdown-it's linkify
  runs on the text *inside* the raw anchor, producing nested duplicate `<a>` elements. Use a
  markdown link with a Comark inline attr instead:
  `[https://…](https://…){target=_blank}` (renders one anchor with the attribute).
- Headmatter values containing `: ` (e.g. `title: FP and OOP: BFFs?`) must be quoted — unquoted,
  the YAML parser fails with `BLOCK_AS_IMPLICIT_KEY`.
