# Terminology

Domain language of this project (Slidev terms + project-specific meanings).

- **Slidev** - Markdown-based slide framework for developers; renders Vue 3 + Vite, driven by `@slidev/cli`.
- **Deck** - One presentation; in this repo always rooted at `slides.md`.
- **Slide** - A single page, separated from the next by a `---` line in a markdown file.
- **Frontmatter** - YAML block at the top of a file (global config for the deck) or after a `---` separator (per-slide config: `layout`, `transition`, `level`, `class`, `src`, `dragPos`, ...).
- **Layout** - Per-slide template from the theme: `seriph`, `two-cols`, `image-right`, `center`, `default`.
- **Theme** - Shared styling npm package; this deck uses `@slidev/theme-seriph` (set once in global frontmatter `theme: seriph`).
- **Click animation** - Step-by-step reveal on presenter clicks via `v-click` / `v-after` directives (with modifiers like `v-click.fade.right.scale`).
- **`v-mark`** - Inline rough-notation markers (underline/circle, colored) on click numbers.
- **Magic Move** - Animated diffing between consecutive code blocks, wrapped in a four-backtick ````md magic-move` container.
- **TwoSlash** - TypeScript annotations in code blocks (`twoslash` tag): hover types + inline errors.
- **Monaco** - In-slide editor: `{monaco}` tag turns a code block into an editor; `{monaco-run}` makes it executable.
- **`src` import** - Splice slides from another file: frontmatter `src: ./pages/imported-slides.md`.
- **Snippet** - External code embedded into a slide with `<<< @/snippets/<file>#region`.
- **`v-drag`** - Draggable element/arrow; positions persisted in the slide's `dragPos` frontmatter key.
- **Drawings** - Built-in pen/pointer overlay; `drawings.persist` in global frontmatter controls whether drawings survive reload.
- **Comark** - Extended markdown syntax enabled by `comark: true` in global frontmatter.
- **SPA export** - `slidev build` produces a static hostable app in `dist/` (what Netlify/Vercel publish).
