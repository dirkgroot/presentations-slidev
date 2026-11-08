# Terminology

Domain language of this project (Slidev terms + project-specific meanings).

- **Slidev** - Markdown-based slide framework for developers; renders Vue 3 + Vite, driven by `@slidev/cli`.
- **Deck** - One presentation; in this repo always rooted at `slides.md`.
- **Slide** - A single page, separated from the next by a `---` line in a markdown file.
- **Frontmatter** - YAML block at the top of a file (global config for the deck) or after a `---` separator
  (per-slide config: `layout`, `transition`, `level`, `class`, `src`, `dragPos`, ...).
- **Layout** - Per-slide template from the theme: `seriph`, `two-cols`, `image-right`, `center`, `default`.
- **Theme** - Shared styling npm package; the starter deck uses `@slidev/theme-seriph` (set in global frontmatter
  `theme: seriph`).
- **Click animation** - Step-by-step reveal on presenter clicks via `v-click` / `v-after` directives
  (with modifiers like `v-click.fade.right.scale`).
- **`v-mark`** - Inline rough-notation markers (underline/circle, colored) on click numbers.
- **Magic Move** - Animated diffing between consecutive code blocks, wrapped in a four-backtick
  ````md magic-move` container.
- **TwoSlash** - TypeScript annotations in code blocks (`twoslash` tag): hover types + inline errors.
- **Monaco** - In-slide editor: `{monaco}` tag turns a code block into an editor; `{monaco-run}` makes it executable.
- **`src` import** - Splice slides from another file: frontmatter `src: ./pages/imported-slides.md`.
- **Snippet** - External code embedded into a slide with `<<< @/snippets/<file>#region`.
- **`v-drag`** - Draggable element/arrow; positions persisted in the slide's `dragPos` frontmatter key.
- **Drawings** - Built-in pen/pointer overlay; `drawings.persist` in global frontmatter controls whether
  drawings survive reload.
- **Comark** - Extended markdown syntax enabled by `comark: true` in global frontmatter.
- **SPA export** - `slidev build` produces a static hostable app in `dist/` (what Netlify/Vercel publish).
- **Reveal.js** - HTML/JS slide framework used by the author's source decks; embedded as a React component in
  [dirkgroot/presentations](https://github.com/dirkgroot/presentations) (see `.lode/migration/`).
- **Section / Fragment** - Reveal.js terms: a `<section>` is one slide; a `fragment` is a step revealed on
  click (→ `v-click`).
- **AutoAnimate** - Reveal.js feature animating diffs between consecutive slides (→ `v-click` steps or magic-move).
- **Avisi branding** - visual identity of the source decks: Poppins font, dark blue `#003345` / light blue
  `#1199bb`, footer logo bottom-left, `background.png` fancy background, colored `Emphasis` punctuation
  in headings. Now implemented as local theme `slidev-theme-avisi` (see `.lode/themes/avisi/summary.md`).
- **Local theme path** - headmatter `theme: ./themes/avisi` pointing at an uninstalled theme folder:
  relative to the deck entry file; `theme: ./` inside a theme package is the theme-playground idiom.
- **`slidev.defaults`** - defaults a theme declares in its `package.json` (`fonts`, `colorSchema`, …);
  merged under the deck's frontmatter (user frontmatter > theme defaults > Slidev globals).
- **Theme playground** - `example.md` inside a theme package (`theme: ./`) exercising the theme;
  doubles as a visual test deck for the migration.
- **`--slidev-theme-primary`** - theme color CSS var overridable from deck frontmatter `themeConfig:`.
- **decktape** - PDF exporter used by the source Reveal decks (→ built-in `slidev export`).
