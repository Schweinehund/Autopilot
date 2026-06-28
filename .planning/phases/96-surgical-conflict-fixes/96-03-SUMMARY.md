---
phase: 96-surgical-conflict-fixes
plan: "03"
subsystem: docs/_glossary-macos.md
tags: [glossary, iru, kandji, glos-01, accuracy-fix, freshness]
requires: []
provides: [GLOS-01]
affects: [docs/_glossary-macos.md]
tech_stack:
  added: []
  patterns: [durable-role-description, surgical-replacement, version-history-row]
key_files:
  modified:
    - docs/_glossary-macos.md
decisions:
  - "D-04: Replace (not append) the stale 'URL is unchanged' sentence with a concise 3-URL role statement — no dated caveats"
  - "D-03: Bump last_verified → 2026-06-28, review_by → 2026-09-28 to preserve +3-month invariant"
metrics:
  duration: "< 5 minutes"
  completed: "2026-06-28"
  tasks_completed: 1
  tasks_total: 1
  files_changed: 1
---

# Phase 96 Plan 03: Kandji-Iru Glossary 3-URL Reality (GLOS-01) Summary

**One-liner:** Replaced stale "URL is unchanged: support.kandji.io" sentence in the `### Kandji-Iru` glossary entry with a durable 3-URL role statement (support.iru.io primary / support.kandji.io legacy redirect / docs.iru.com authoritative docs); bumped freshness stamps; added Phase 96 version-history row.

## What Was Built

Single surgical edit to `docs/_glossary-macos.md` — three sub-edits within one file:

- **Edit A (body):** The last sentence of the Kandji-Iru entry changed from `"The support portal URL is unchanged: support.kandji.io."` to `"Three URLs serve distinct roles: \`support.iru.io\` is the primary rebrand target (login-gated SPA); \`support.kandji.io\` is the legacy redirect / Iru-branded knowledge base; \`docs.iru.com\` is the authoritative public documentation source."` — mirroring guide 02 line 553's durable summary without dated caveats.
- **Edit B (frontmatter):** `last_verified: 2026-06-24 → 2026-06-28`; `review_by: 2026-09-24 → 2026-09-28` (preserves the +3-month same-day-of-month invariant per D-03).
- **Edit C (version history):** New row `| 2026-06-28 | Phase 96 (GLOS-01): ... | -- |` inserted at the top of the Version History table (most-recent-first order).

### Untouched (per guardrails)

- `### Kandji-Iru` heading — anchor `#kandji-iru` live and unchanged
- Alphabetical Index line 17 (`[Kandji-Iru](#kandji-iru)`) — no change needed
- `> **Windows equivalent:**` blockquote following the entry — untouched
- `### VPP` definition (~line 146) — untouched (14+ inbound links)
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — NOT edited

## Verification

Automated verify chain from plan ran: **PASS**

All assertions satisfied:
- `"URL is unchanged"` count = 0
- `support.iru.io` present
- `support.kandji.io` present
- `docs.iru.com` present
- `"verified 2026-06-26"` count = 0
- `"HTTP 200"` count = 0
- `### Kandji-Iru` heading present
- `last_verified: 2026-06-28` present
- `review_by: 2026-09-28` present
- Version-history row `| 2026-06-28 | Phase 96` present

## Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Replace Kandji-Iru URL sentence, bump stamps, add version-history row | b70d028 | docs/_glossary-macos.md |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None. Documentation-only edit; no new network endpoints, auth paths, file-access patterns, or schema changes.

## Self-Check: PASSED

- `docs/_glossary-macos.md` exists and was modified: confirmed
- Commit `b70d028` exists: confirmed
- No unexpected file deletions in commit: confirmed
