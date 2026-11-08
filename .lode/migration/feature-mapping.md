# Feature mapping: Reveal.js → Slidev

How each mechanism used in [dirkgroot/presentations](https://github.com/dirkgroot/presentations)
maps to Slidev, with concrete before (JSX) / after (markdown) examples. Related:
[reveal-source-repo.md](reveal-source-repo.md), [../terminology.md](../terminology.md),
[../decks/welcome-to-slidev/summary.md](../decks/welcome-to-slidev/summary.md) (Slidev feature demos).

## Core mapping

| Reveal.js source | Slidev target | Notes |
|---|---|---|
| Presentation component (`<Deck>…</Deck>`) | deck dir `decks/<name>/slides.md` | One deck = one directory, self-contained |
| `<section>` JSX slide | `---`-separated slide + frontmatter | Global frontmatter holds deck-wide config |
| `className="fragment"` | `v-click` / `v-after` | Wrap the element; lists can use `<li v-click>` |
| Reveal **AutoAnimate** between slides | `v-click` steps (elements) / **magic-move** (code) | AutoAnimate diffs JSX across slides; Slidev equivalent is click-stepping within one slide |
| `data-background={Backgrounds.X}` | per-slide `class:` + deck `styles.css` | Recreate the four backgrounds as CSS classes, see below |
| highlight.js `Code` w/ `data-line-numbers` | fenced code block, `{lineNumbers}` via frontmatter `highlight` | Shiki replaces highlight.js; line highlighting via `{1|3-4}` syntax |
| `MermaidDiagram` component | native mermaid block: ```` ```mermaid ```` | No wrapper component needed |
| RevealMath plugin | KaTeX `$…$` / `$$…$$` | Built in |
| `ColumnLayout`/`Column` | `two-cols` layout or UnoCSS `grid="~ cols-2 gap-4"` | Attributified utilities are the repo convention |
| `<iframe src="https://giphy…">` | raw `<iframe>` in markdown | Works as-is; keep `drop-shadow` styling in CSS |
| `react-qr-code` / QR PNGs | copy PNGs to deck, or a tiny `QrCode.vue` in deck `components/` | Vue port is trivial if a live QR is wanted |
| Reveal notes plugin | presenter notes = last comment block per slide | `[click]` markers sync to clicks |
| decktape PDF export | `slidev export` (built-in PDF/PNG/PPTX) | No window.Reveal hack needed |
| `scroll` route variant | Slidev has no scroll view — drop | Not needed for Slidev presenter flow |

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

Deck `styles.css` defines `.emphasis { color: #1199bb }` (and the `.title`-equivalent size) —
or the signature is captured once in a future custom theme.

## Example: backgrounds

The four `Backgrounds` enum values become slide `class`es in deck `styles.css`:

- `FancyBackground` → `.fancy` (background.png cover)
- `FancyWithFooter` → `.fancy` + Avisi logo `::after` (bottom-left logo is deck-global CSS, not per-slide)
- `WhiteWithFooter` → default background + global footer logo
- `RightHalfGrayWithFooter` → `.half-gray` (linear-gradient right half `#eee`)

The footer logo + Poppins + colors are deck-global: one `styles.css` block per deck (see pending
decision in [../plans/migration-poc.md](../plans/migration-poc.md)).

## Canvas

Source decks are authored at **1920×1280 (3:2)**. Slidev defaults to a 16:9 canvas; the source
layout must either be reflowed to 16:9 or preserved via `canvasWidth: 1920` + 3:2 aspect —
pending decision in [../plans/migration-poc.md](../plans/migration-poc.md).

## Invariants / gotchas

- JSX styling (`style={{…}}`, SCSS modules) becomes plain CSS + UnoCSS utilities; there is no
  per-element `style` prop in markdown — use classes.
- Reveal's `data-trim` (whitespace trimming of code) is unnecessary in Slidev: fenced blocks keep
  author formatting.
- Reveal fragments inside `AutoAnimate` groups become click steps **within one Slidev slide** —
  the source's one-slide-per-step AutoAnimate pattern collapses into a single slide with `v-click`s.
- Positional slide numbering matters again after migration: click-step references shift when slides
  are inserted (same invariant as [../decks/welcome-to-slidev/summary.md](../decks/welcome-to-slidev/summary.md)).
