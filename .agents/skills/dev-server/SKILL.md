---
name: dev-server
description: Start, verify, and stop the Slidev dev server for a presentation deck or theme playground in this workspace — including headless/port-published mode (remote binding) for viewing in the user's browser via sbx ports.
---

Start the Slidev dev server for a deck or theme playground.

## Prerequisites

- Node via mise: always invoke commands through `bash -l -c "mise exec -- <cmd>"`.
- pnpm workspace at the repo root (`/Users/dirgroot/proj/personal/presentations-slidev`).

## Step 1: Pick the deck to serve

Unless the user's request already names the deck, ask which one to serve — never guess:

1. Enumerate servable decks: every `decks/<name>/` directory that contains a `slides.md`
   (`ls decks/`; this includes the Avisi theme playground `decks/avisi-theme-example/`).
2. Present them as a single-choice list with the `question` tool: one option per deck,
   label = deck name, description = its entry file path.

The entry is the deck's markdown file, NOT a directory — slidev 53.1.0 fails with `EISDIR`
on the directory form: `decks/<name>/slides.md`.

## Step 2: Start the server

Run in the background (log to `.lode/tmp/logs/slidev-dev.log`):

```bash
bash -l -c "mise exec -- pnpm exec slidev <entry> > .lode/tmp/logs/slidev-dev.log 2>&1"
```

- Do NOT pass `--open` (no GUI in this sandbox).
- `--remote` binds `0.0.0.0` instead of `[::1]` loopback: REQUIRED when the user wants to
  view the slides from their host browser via `sbx ports <sandbox> --publish 3030:3030/tcp`.
  Plain mode is fine when only the sandbox itself will curl the server.

## Step 3: Verify

1. Confirm the bind matches intent: `ss -tlnp | grep 3030` → `0.0.0.0:3030` (remote) or
   `[::1]:3030` (normal mode).
2. `curl` the served root:
   - HTTP 200 at `http://localhost:3030/` for normal mode.
   - For the published-port path, test the `eth0` address bypassing curl's own proxy:
     `curl -s --noproxy '*' -o /dev/null -w '%{http_code}' http://172.17.0.1:3030/` → 200.

## Step 4: Tell the user how to browse it

When `--remote` + port publishing is used, the user browses `http://localhost:3030/`
on their host after running: `sbx ports <sandbox-name> --publish 3030:3030/tcp`
(bool present a different port to the user only if slidev was started with `--port N`).

Also mention: presenter mode `http://localhost:3030/presenter/`, overview
`http://localhost:3030/overview/`. Logs stream to `.lode/tmp/logs/slidev-dev.log`.

## MCP (built into the dev server)

While the dev server runs, the same process is also an MCP **streamable-HTTP** server at
`http://localhost:<port>/__mcp` (Vite plugin `slidev:mcp`; disable per deck with `mcp: false` in the
headmatter). Same tool set also exists standalone over stdio: `pnpm exec slidev mcp <entry>`.
Tools: `slidev-get-info`, `slidev-list-slides`, `slidev-get-slide`, `slidev-update-slide`,
`slidev-insert-slide`, `slidev-remove-slide`, `slidev-move-slide`, `slidev-goto-slide`.
Details (descriptive record): `.lode/practices.md` → "Slidev MCP server".

### Wiring into OpenCode (global config, migrated 2026-11-08)

- **Global** `~/.config/opencode/opencode.json` has `mcp.servers.slidev =
  { type: "remote", url: "http://localhost:3030/__mcp" }` (deployer-local, not project-tracked —
  OpenCode has no official per-project local config file; a PR for `opencode.local.json` was closed
  stale unmerged). Config warm-reloads; `opencode mcp list` shows state.
- URL must use `localhost`, not `127.0.0.1` — plain mode binds IPv6 `[::1]:3030` only, so `127.0.0.1`
  is connection-refused (verified). The endpoint serves the deck of whichever server is on that port;
  to serve a different deck, restart the server for it. Being global, the server shows `disconnected`
  in any project without a running dev server (harmless).
- When the user publishes the port for host-browser preview AND the MCP must keep working, restart with
  `--remote --bind ::` (dual-stack `*:3030`, verified 2026-11-08): IPv4 for the published port, IPv6
  for the MCP URL. Plain `--remote` (binds `0.0.0.0`, IPv4-only) risks breaking the MCP `localhost`
  resolution. Remote control is open without a password — pass one only if the user asks
  (value goes **after** the entry path).

## Stop / restart

Find the pid via `ss -tlnp | grep 3030` (the `users:(("node-MainThread",pid=<pid>))` field)
and `kill <pid>`. A bind conflict means the old server is still running — kill before restart.

## Gotchas

- The sandbox's outbound HTTP proxy chokes on `http://172.17.0.1:<port>` curls — always add
  `--noproxy '*'` when probing non-localhost addresses.
- `--remote` takes an optional password value: put it **after** the entry path
  (`slidev decks/<name>/slides.md --remote`). Before the entry, it swallows the path as the
  password and fails with `Entry file "<root>/slides.md" does not exist`.
- ERR_CONNECTION_RESET from the host browser usually means the server was started **without**
  `--remote` (loopback `[::1]` bind — unreachable via a published port). Check the bind first.
- Server state persists across turns; if the user says a previously-started server should
  still be running, check `ss -tlnp` first instead of starting a duplicate.
