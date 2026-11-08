# Terminology

Domain language of this project (Slidev terms + project-specific meanings).

- **Slidev** - Markdown-based slide framework for developers; renders Vue 3 + Vite, driven by `@slidev/cli`.
- **Deck** - One presentation; in this repo always rooted at `slides.md`.
- **Slide** - A single page, separated from the next by a `---` line in a markdown file.
- **Frontmatter** - YAML block at the top of a file (global config for the deck) or after a `---` separator
  (per-slide config: `layout`, `transition`, `level`, `class`, `src`, `dragPos`, ...).
- **Layout** - Per-slide template from the theme: `seriph`, `two-cols`, `image-right`, `center`, `default`.
- **Slide-1 cover default** - a slide without `layout:` frontmatter gets the `default` layout —
  **except slide 1, which gets `cover`** (`@slidev/client` `useNav.ts`: `currentSlideNo === 1 ? 'cover' :
  'default'`). A deck's first slide therefore renders centered whenever the theme's cover layout
  centers; force `layout: default` to keep it left-aligned.
- **Theme** - Shared styling npm package; consumed by decks via the global frontmatter `theme:` key
  (an npm theme by name, e.g. `theme: seriph` for `@slidev/theme-seriph`, or a local path like
  `theme: ../../themes/avisi`).
- **Click animation** - Step-by-step reveal on presenter clicks via `v-click` / `v-after` directives
  (with modifiers like `v-click.fade.right.scale`).
- **`v-mark`** - Inline rough-notation markers (underline/circle, colored) on click numbers.
- **Magic Move** - Animated diffing between consecutive code blocks, wrapped in a four-backtick
  ````md magic-move` container.
- **TwoSlash** - TypeScript annotations in code blocks (`twoslash` tag): hover types + inline errors.
- **Monaco** - In-slide editor: `{monaco}` tag turns a code block into an editor; `{monaco-run}` makes it executable.
- **`src` import** - Splice slides from another file: frontmatter `src: ./pages/imported-slides.md`.
- **Shared slide** - Reusable slide under `shared/slides/`, spliced into any deck via a `src:` import;
  carries its own frontmatter and assumes the Avisi theme (see `.lode/shared/summary.md`).
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
- **Local theme path** - headmatter `theme: ../../themes/avisi` pointing at an uninstalled theme folder:
  relative to the deck entry file.
- **`slidev.defaults`** - defaults a theme declares in its `package.json` (`fonts`, `colorSchema`, …);
  merged under the deck's frontmatter (user frontmatter > theme defaults > Slidev globals).
- **Theme playground** - a deck that exercises every feature of a theme (the Slidev convention puts
  an `example.md` inside the theme package with `theme: ./`; ours lives at
  `decks/avisi-theme-example/` instead, consuming the theme via a relative path). Doubles as a
  visual test deck for the migration.
- **`--slidev-theme-primary`** - theme color CSS var overridable from deck frontmatter `themeConfig:`.
- **decktape** - PDF exporter used by the source Reveal decks (→ built-in `slidev export`).
- **Slidev MCP server** - MCP server bundled with the dev server: while `slidev <entry>` runs, the same
  process exposes MCP over streamable HTTP at `http://localhost:<port>/__mcp` (Vite plugin `slidev:mcp`),
  letting AI agents inspect, edit, and navigate the deck live. Disable with `mcp: false` in the deck
  headmatter. Same tool set also standalone over stdio: `slidev mcp <entry>` (see
  `.lode/practices.md` → "Slidev MCP server").
