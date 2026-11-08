# slidev-theme-avisi

Avisi-branded local Slidev theme, migrated from the Reveal.js-based decks in
[dirkgroot/presentations](https://github.com/dirkgroot/presentations).

## Installing / using

Add the theme to a deck's headmatter as a local theme:

```md
---
theme: ./themes/avisi   # relative to the deck's entry file
---
```

The theme provides default configs via `slidev.defaults` in `package.json`
(Poppins fonts, light colorSchema), so decks don't need a `fonts:` block.

## Playground

The theme's playground lives as a deck in `decks/avisi-theme-example/` and
exercises fonts, colors, the four backgrounds, and code styling:

```bash
pnpm exec slidev decks/avisi-theme-example/slides.md   # dev server
pnpm exec slidev export decks/avisi-theme-example/slides.md   # PDF
```

## What it provides

- **Fonts** — Poppins 400/600 (sans + serif), Fira Code mono, via
  `slidev.defaults.fonts` (Slidev fetches webfonts automatically at dev/build)
- **Colors** — dark-blue `#003345` headings, dark-gray `#595959` body,
  light-blue `#1199bb` links/bullets/`Emphasis` punctuation (exposed as
  `--slidev-theme-primary`, overridable via `themeConfig`)
- **Backgrounds** (per-slide `class:`) — ports of the source `Backgrounds`
  enum; the footer logo is a CSS background layer, no layout markup needed:
  | class | source enum |
  | --- | --- |
  | `avisi-fancy` | `FancyBackground` |
  | `avisi-fancy-with-footer` | `FancyWithFooter` |
  | `avisi-white-with-footer` | `WhiteWithFooter` |
  | `avisi-half-gray` | `RightHalfGrayWithFooter` |
- **Layouts** — `default`, `cover` (cover is centered; give it the logo image
  as the Avisi deck-opener equivalent)
- **Code styling** — 0.65em `pre` (as in the source `Deck.scss`), Shiki theme
  `dark-plus` in `setup/shiki.ts` (ir-black port pending)

## Credits

Styling and assets ported from the Avisi branding of
[dirkgroot/presentations](https://github.com/dirkgroot/presentations).
