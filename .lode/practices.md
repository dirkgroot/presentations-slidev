# Practices

## Repo layout (multi-deck)

- **One directory per deck** under `decks/<name>/` (decided 2026-11-07). Each deck is self-contained:
  `slides.md` (entry), `pages/` (files spliced via `src:`), `components/` (auto-registered by filename),
  `snippets/` (code embedded via `<<< @/snippets/...` or `{monaco-run}` imports). Deck-internal
  `src:` / `@/` references resolve *within the deck directory*, so a deck can be moved or copied as a
  unit; the sanctioned exceptions that reach outside are headmatter `theme:` and imports of
  [shared/slides/](shared/summary.md) (below).
- Adding a new deck = create `decks/<name>/` (copy the shape of an existing deck) and run commands
  against that path. No global registration needed.

## Shared slides (cross-deck)

- Reusable slides live **one file per slide** under `shared/slides/` (decided 2026-11-08, ported
  from the source repo's `src/slides/` components) and are consumed by any deck via a `src:` import
  that reaches outside the deck dir — legal because the Slidev parser allows any path under the pnpm
  workspace root. Inventory, consumption semantics, authoring rules, and the verification trail:
  [shared/summary.md](shared/summary.md).
- Authoring gotchas (verified slidev 53.1.0): assets in shared slides must use **markdown image
  syntax** (raw HTML `<img src="./…">` resolves against the consuming deck's served root); per-slide
  styles are slide-scope `<style>` blocks keyed on a dedicated slide class; **UnoCSS classes don't
  generate in `src:`-imported files** and Comark is deck-level — shared slides rely on neither.

## Toolchain & commands

- Toolchain (mise-pinned in `mise.toml`): **node `26.13.0`** (Active LTS "Lithium"; official node ≥25 Linux
  binaries need `libatomic.so.1` — installed via `libatomic1` in apt on normal Linux machines; in this dev
  sandbox the deb was extracted to `~/.local/lib` and exported via `/etc/sandbox-persistent.sh`) and
  **pnpm `12.18.0`** (standalone binary, no node needed for pnpm itself). The stale root `package-lock.json`
  was **deleted** (2026-11-08, before the initial commit) — installs are pnpm-only.
- **Installs are pnpm-based** (decided 2026-11-07): `pnpm-lock.yaml` exists, `node_modules` is pnpm layout, and
  re-install after any git/material reset. - Root `package-lock.json` previously duplicated installs as
  npm-style lock (removed; see Toolchain). pnpm keeps its content-addressable store in-repo
  (`node_modules/.pnpm-store/v11`); `pnpm-workspace.yaml` sets `shamefullyHoist: true` and allowlists the
  `playwright-chromium` build script (pnpm v11+ blocks unapproved postinstall scripts; `@slidev/cli` also
  pends "agent skills" approval via `pnpm approve`).
- Scripts are **deck-parameterized** (package.json passes the deck path through to the slidev CLI):
  - dev: `pnpm dev decks/<name>/slides.md` → dev server at <http://localhost:3030>. Pass the deck's **entry
    file**, not the directory — slidev 53.1.0 fails with `EISDIR` on the directory form. `--open` (baked into
    the `dev` script) needs a GUI; drop it when running headless. Normal mode binds **loopback only**
    (`[::1]:3030`); when the server must be reachable through the host's published port, add **`--remote`**
    (slidev 53.x: "listen public host and enable remote control", binds `0.0.0.0`) — verified with
    `ss -tlnp | grep 3030` and `curl -s --noproxy '*' http://172.17.0.1:3030/` (the sandbox proxy
    intercepts non-loopback curls unless bypassed with `--noproxy`). For the combination "published port
    **and** the OpenCode MCP URL", use `--remote --bind ::` — dual-stack `*:3030` accepts IPv4 (published
    port) **and** IPv6 (the MCP URL's `localhost`), verified 2026-11-08 (plain `--remote 0.0.0.0` is
    IPv4-only and would break the `localhost` MCP resolution). Wrapped as the project skill
    `dev-server` (`.agents/skills/dev-server/`), which covers entry-file choice, headless flags,
    verification, and stopping/restarting. Changes that **do not** hot-apply to a running dev server:
    new/renamed layout, component, or config files, AND headmatter parser flags (`comark: true`, …) —
    anything computed at startup; restart the server. Verified empirically 2026-11-08: a new theme
    layout and the comark flag both required a restart, while markdown text and theme-CSS edits hot-reload.
  - build: `npm run build -- decks/<name>` → static SPA in `dist/`.
  - export: `npm run export -- decks/<name>` → PDF/PNG/PPTX (requires the playwright-chromium browser download).
- Conventional path note: `slidev build <entry> --out <rel-path>` resolves the out-dir **relative to the
  entry's directory**, not the repo root — pass an absolute `--out` when scripting from the root.
- Playwright export needs system chromium libraries; in this dev sandbox they were apt-installed 2026-11-08
  (libglib2.0-0t64, libnss3, libatk*, libcups2t64, libdrm2, libxkbcommon0, libatspi, libgbm1, libpango,
  libcairo2, libasound2t64, plus poppler-utils for `pdftoppm`) after `deb.debian.org` was allowlisted in the
  proxy.
- **Native binaries are platform-specific**: rolldown/vite bindings in `node_modules` only match the OS where
  install ran. A tree installed on macOS cannot build on Linux (and vice versa) — reinstall per machine;
  builds/exports happen on the dev machine or in CI.
- **Git version is not mise-managed** (reverted 2026-11-07 after a trial). Rationale: mise has no built-in
  `git` tool — it would require the asdf `nishidayuya/asdf-git` plugin, which compiles git from kernel.org
  source and blocks machines without a compiler or kernel.org access. System git (`2.53.0`) is used as-is
  for repo operations, which remain self-managed per the convention below.

### Slidev MCP server (dev-server `/__mcp` + stdio `slidev mcp`)

- The dev server **is also an MCP server** (confirmed in the `@slidev/cli@53.1.0` bundle): a Vite plugin
  (`slidev:mcp`) exposes the served deck over MCP streamable HTTP at **`http://localhost:<port>/__mcp`**
  for as long as that dev-server process runs, letting AI agents inspect, edit, and navigate the deck live.
  Disabled per deck with `mcp: false` in the headmatter.
- The **same tool set is also served over stdio** by the standalone command `slidev mcp <entry>`
  (`startMcpStdioServer` → same `createSlidevMcpServer`), for clients that speak stdio rather than HTTP.
- Tools (8): `slidev-get-info` (deck overview: entry file, title, slide count, live server URL/position),
  `slidev-list-slides` (number/title/layout/source; `hide`/`disabled` slides excluded), `slidev-get-slide`
  (frontmatter + content + note), `slidev-update-slide` (patch content/note/frontmatter; `null` deletes a
  frontmatter key), `slidev-insert-slide`, `slidev-remove-slide`, `slidev-move-slide` (same-file
  reordering), `slidev-goto-slide` (navigates **all connected browsers** — verify-after-edit).
- **Wired into OpenCode** (2026-11-08): **global config** `~/.config/opencode/opencode.json` registers
  `mcp.servers.slidev` as `{ type: "remote", url: "http://localhost:3030/__mcp" }` (located there because
  the user wants it **developer-local, not project-tracked**; OpenCode has no official per-project
  local config file — the upstream `opencode.local.json` PR (#17234) was closed stale 2026-05-12,
  unmerged). Config warm-reloads, so the 8 tools appear as `slidev_*` (Code Mode:
  `tools.slidev[...]`) without restart; no OAuth needed (the server never returns 401). Verified
  live: `opencode mcp list` → connected, and `slidev-get-info` → deck metadata (title, 7 slides,
  server URL, live position incl. page/clicks). Layout: the server object sits under `mcp.servers.slidev` (V2 shape)
  *while* the pre-existing legacy `mcp["mcp-gateway"]` entry (direct-key + `enabled`, pre-V2 shape) is
  left untouched — both connect simultaneously. Gotchas: OpenCode must resolve `localhost` —
  `127.0.0.1` FAILS (the CLI server binds IPv6 `[::1]:3030` only in plain mode; `--remote --bind ::`
  is dual-stack); the endpoint serves whatever **deck** the dev server was started with (swap decks =
  restart the server); and only one dev server per port. Since the entry is **global**, it appears in
  every project — shows `disconnected` wherever no dev server is running (harmless, tools absent).
- Lode vs. skill: this section is what the MCP surface *is*; the start/verify/stop procedure stays in
  project skill `dev-server`.

## Deployment

- Target is **GitHub Pages** (decided 2026-11-07). The starter's Netlify/Vercel configs were removed —
  the repo has no CI deploy workflow yet.
- Pending decision: site layout — **one shared site** (each deck built with `--base /<repo>/<deck>/`, one
  workflow auto-discovers `decks/*`) vs. **one site per deck** (separate repo/branch per deck). The workflow
  gets created once this lands.
- Slidev on GitHub Pages requires the path prefix at build time: `slidev build <deck> --base /<repo>/<deck>/`;
  user-site repos (`<user>.github.io`) would use `--base /<deck>/` instead.
- **The user manages git themselves** (init, remote, push) — do not run `git init`/commit/push unprompted.
- **Commit style**: short sentence-case imperative subjects, **not** conventional commits —
  "Make the avisi light backgrounds translucent…", not `feat(avisi-theme): …`. (Plain bodies explain
  rationale when useful. The lone `fix(avisi-theme):` commit `002dcad` is a historical outlier —
  never match it.)

### Theme authoring (local themes)

- The Avisi branding lives in the local theme `themes/avisi/` (package `slidev-theme-avisi`), consumed
  via headmatter `theme: ./themes/avisi` (path relative to the deck entry file). Conventions follow the
  official theme standard: package name `slidev-theme-*`, keywords `slidev-theme|slidev`, plain `.vue`/
  `.ts` (Slidev compiles them), `slidev.defaults` in `package.json` for deck-level defaults (fonts,
  colorSchema) merged under user frontmatter, `--slidev-theme-*` CSS vars as the `themeConfig` surface.
- Theme CSS entry `styles/index.ts` imports `@slidev/client/styles/layouts-base.css` first, then the
  theme css; **all theme rules nest under `.slidev-layout`** so they don't leak into the presenter UI
  (UnoCSS `--uno:` attributies and CSS nesting are available inside theme styles).
- Images for theme CSS go in `themes/avisi/assets/` (relative `url()` resolves through Vite); images
  referenced from slide markup go in the deck's `public/` (served root-absolute, e.g. `/assets/x.png`).
  `<img src="./…">` in a slide resolves against the served root, not the md file.
- Theme visuals are verified headless — see Verification below.

### Verification (headless, sandbox)

- Dev probe: run the dev server bg + `curl`; for DOM facts use a small playwright script
  (img `complete`/`naturalWidth`, computed styles) against `http://localhost:<port>/<slide>`.
- Visual check: `pnpm exec slidev export <entry> --format pdf --per-slide --wait 4000`, then
  `pdftoppm -r 60 -png <pdf> <prefix>` and read the PNGs. **Always export with `--per-slide`**:
  the one-piece mode silently drops named-slot content on src-imported slides (img + second slot —
  see [shared/summary.md](shared/summary.md)); `--per-slide` still writes one merged PDF. Wait:
  slidev's **PNG export mode misses
  slide `<img>` assets** in 53.1.0 on both the element- and the `--per-slide` screenshot path (works
  in dev and in the built SPA; PDF renders fine) — verify images via dev-probe/build, not PNG export.
- Production check: `slidev build <entry> --out <abs-path>`, serve with `python3 -m http.server`,
  repeat the probe against the static bundle (catches public/hashing-only issues).

## Authoring conventions

- **Source-code comments** (decided 2026-11-08, cleaned across `themes/avisi/`): comments only when
  there is a real reason, and only explaining **why**, never the *what* — the code itself is the
  what. Design rationale, port provenance ("was `settings.scss`"), and non-obvious mechanics
  (cascade-order overrides, selector gotchas) live in the **lode**, not in source comments —
  consult the lode instead of re-documenting it there. No comment merely to name the source
  variable/class a port came from. The rule also lives in `AGENTS.md` → "Code comments" so every
  session loads it without a lode detour (the policy was violated repeatedly by the 2026-11-08
  migration+fix session — narrative blocks re-added across `styles/transitions.css`,
  `styles/typography.css`, `layouts/two-cols-header.vue`, `shared/slides/about-avisi.md` — and
  cleaned to ≤1-line why-comments; multi-line rationale was already here in the lode). Sensitive:
  slides/decks and CSS are just as subject to it as any other file.
- Markdown files: wrap prose at **120 characters max** per line. Code blocks and tables are exempt (tables
  are single-line by definition; breaking code breaks it). Run `pnpm lint:md` to check — config lives in
  `.markdownlint.json` (MD013 with `code_blocks: false`, `tables: false`) and `.markdownlint-cli2.jsonc`
  (globs + ignores; note `ignores` takes **globs**, not regexes, in markdownlint-cli2 0.24, and needs the
  `**/node_modules/**` form to also cover workspace-package node_modules dirs). Excluded:
  `**/node_modules/`, `**/dist/`, `.lode/tmp/`, and vendored `.agents/skills/` (lock-managed).
- Slide content in the deck's `slides.md`. Multi-file decks go in the deck's `pages/` and are spliced via
  `src:` frontmatter; cross-deck reusable slides live in `shared/slides/` (see Repo layout).
- Vue components in the deck's `components/` are **auto-registered** in that deck's slides by filename
  (no import needed) — e.g. `<Counter :count="10" />`.
- Reusable code for `{monaco}` / TwoSlash demos lives in the deck's `snippets/`; embed with
  `<<< @/snippets/file.ts#region`.
- Styling uses UnoCSS attributified utility classes directly on HTML (`m="t-4"`, `border="~ main rounded-md"`,
  `grid="~ cols-2 gap-4"`); slide-scoped `<style>` blocks are allowed inside a slide.
- Slide notes: the last comment block of each slide is presenter-mode notes; `[click]` markers sync notes to
  clicks.
- Animations: prefer `v-click`/`v-after` (+modifiers) and `v-mark` over manual CSS transitions; code diffs
  via `magic-move` blocks.
- Prefer Markdown lists over raw `<ul>/<li>` blocks in slides (decided 2026-11-08): both render the same
  `<ul>/<li>` DOM, so theme `li`/`li::marker` styles apply identically — but markdown-it emits a raw HTML
  block **verbatim**, so inline Markdown inside it (`` `code` ``, emphasis) is not parsed (backticks showed
  literally in the avisi playground). Inline tags like `<a>` work fine inside Markdown list items (Slidev's
  markdown-it has html enabled).
- Comark gotchas (verified slidev 53.1.0, details + examples in
  [migration/feature-mapping.md](migration/feature-mapping.md) → gotchas): a block attr (`{.class}`)
  directly after an inline HTML span is unreliable (dropped class / swallowed span — use raw HTML for
  that heading); raw `<a>` around a linkified URL double-nests anchors (use
  `[url](url){target=_blank}` instead).

## Environment

- Repo got its **git history on 2026-11-08**: `git init` + root commit `57dd843` "Initial commit: multi-deck
  Slidev workspace" on branch `main` (per explicit user request; git operations are still user-owned otherwise).
  `.gitignore` covers `node_modules`, `dist`, `*.local`, `.vite-inspect`, `.remote-assets`, `components.d.ts`,
  `.lode/tmp/`, `.idea` (JetBrains settings, decided 2026-11-08), and `opencode.json`
  (local-only OpenCode config; slidev MCP wiring lives there — decided 2026-11-08).
- No remote configured yet; no test suite — the only quality gates are visual review in the dev server and
  `pnpm lint:md` (markdown line-length, see Authoring conventions).
