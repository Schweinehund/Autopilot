---
phase: 95-harness-lineage-bump-terminal-re-audit-milestone-close
plan: "01"
subsystem: audit-harness-lineage
tags: [harn-01, v1.12-harness, path-a, milestone-close, baseline-16]
one_liner: "v1.12 milestone-audit harness Path-A (C1-C16 verbatim, self-test 9/9) + BASELINE_16 freshness comment + Phase 95 constants lock"
dependency_graph:
  requires: [Phase 94 complete — v1.12 content closed before harness authored]
  provides: [v1.12-milestone-audit.mjs (HARN-01 Atom 1), v1.12-audit-allowlist.json, BASELINE_16, 95-CONVENTIONS.md]
  affects: [scripts/validation/, .planning/phases/95-*/]
tech_stack:
  added: []
  patterns: [Path-A harness copy, comment-only BASELINE insert, constants-lock document]
key_files:
  created:
    - .planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-CONVENTIONS.md
    - scripts/validation/v1.12-milestone-audit.mjs
    - scripts/validation/v1.12-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
decisions:
  - "V111=919b23b confirmed as v1.11 close-gate SHA; rides Atom 2 per HARN-02 (NOT touched in Atom 1)"
  - "BASELINE_16 anchored to COMMIT-1 SHA 6d2eef4 (95-CONVENTIONS.md constants lock)"
  - "apex CHAIN_PHASES=[48..94] (47 entries) — D-01 correction applied; ROADMAP/STATE/REQUIREMENTS patched at close-gate (Plan 95-04)"
  - "Atom 1 = exactly 3 files (milestone-audit + allowlist + regenerate-supervision-pins BASELINE_16 comment)"
metrics:
  duration_seconds: 690
  completed_date: "2026-06-26"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 4
---

# Phase 95 Plan 01: v1.12 Harness-Core Path-A + Constants Lock Summary

## One-Liner

v1.12 milestone-audit harness Path-A (C1-C16 verbatim, self-test 9/9) + BASELINE_16 freshness comment anchored to `6d2eef4` + Phase 95 constants lock document.

## Commits

| # | SHA | Message | Files |
|---|-----|---------|-------|
| COMMIT 1 | `6d2eef4` | `docs(95-01): 95-CONVENTIONS.md — Phase 95 constants lock` | 95-CONVENTIONS.md |
| COMMIT 2 (Atom 1) | `8efa283` | `feat(95-01): v1.12 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)` | v1.12-milestone-audit.mjs + v1.12-audit-allowlist.json + regenerate-supervision-pins.mjs |

**BASELINE_16 anchor SHA:** `6d2eef4` (COMMIT 1 — 95-CONVENTIONS.md constants lock)
**Pre-Phase-95 anchor:** `ddf1355` (for downstream byte-unchanged gate at close-gate Plan 95-04)

## Task Outcomes

### Task 1: 95-CONVENTIONS.md (COMMIT 1)

Phase 95 constants-lock document authored as Path-A from `93-CONVENTIONS.md`. Records:
- V111 = `919b23b` (v1.11 close-gate SHA, verified)
- Pre-95 anchor = `ddf1355`
- BASELINE_16 anchor = `6d2eef4` (COMMIT 1 SHA)
- apex `[48..94]` (47 entries) per D-01 correction — NOT `[48..93]`
- 5 V-94-CONTENT needles (all verified present in target file)
- 26 predecessor frozen surfaces (8 YAMLs + 9 MJS + 9 JSON)
- D-01 apex correction patch text for close-gate Plan 95-04
- Locked commit-message strings for all 5 commits
- DEFERRED-CLEANUP ledger (DROP MIGV-01/02/03, CARRY open, ADD GLOSSARY-IRU-URL-FRESHNESS-01)

**Verification:** `95-CONVENTIONS.md` contains all required constants: `919b23b`, `ddf1355`, `BASELINE_16`, `48..94`, `v1.12-audit-allowlist.json`, `support.iru.io`, `support.kandji.io`, `docs.iru.com`, `Supervision status (MEDIUM confidence)`, `learn.microsoft.com`, `62→66→70→74→82→88→93→95`, `GLOSSARY-IRU-URL-FRESHNESS-01` — all present.

### Task 2: Atom 1 (COMMIT 2)

Three files created/modified as one indivisible commit:

**v1.12-milestone-audit.mjs:** Path-A copy of v1.11, exactly 4 line edits applied:
- Line 2: v1.12 lineage header (Path A copy of v1.11)
- Line 4: sidecar reference → v1.12-audit-allowlist.json
- Line 35: Usage comment → v1.12-milestone-audit.mjs
- Line 79: functional sidecar repoint → `readFile('scripts/validation/v1.12-audit-allowlist.json')`
- Line 5 (frozen predecessor anchor) and line 90 (Apple Business doc paths): NOT changed
- `checks` array: exactly 15 entries (C1-C16), no C17 added
- Line count: 979 (unchanged)

**v1.12-audit-allowlist.json:** Path-A from v1.11, 3 field changes:
- `generated`: `2026-06-25T00:00:00Z` → `2026-06-26T00:00:00Z`
- `phase`: `93-harness-lineage-bump-terminal-re-audit-milestone-close` → `95-harness-lineage-bump-terminal-re-audit-milestone-close`
- filename itself: `v1.12-audit-allowlist.json`
- All other content carried verbatim (15-entry c13_broken_link_allowlist, c13_rotting_external, quarterly_audit, c16_missing_endpoint_exemptions: [])

**regenerate-supervision-pins.mjs:** Comment-only insert — 7-line BASELINE_16 block inserted after line 452 (before `const BASELINE_9 = [`). Anchor SHA = `6d2eef4`. BASELINE_9 array unchanged.

## Verification Results

| Check | Result |
|-------|--------|
| `node scripts/validation/v1.12-milestone-audit.mjs --self-test` | 9 passed, 0 failed (exit 0) |
| `node scripts/validation/v1.12-milestone-audit.mjs` | 15 passed, 0 failed, 0 skipped (exit 0) |
| `grep -c "v1.12-audit-allowlist.json" v1.12-milestone-audit.mjs` | 2 (line 4 comment + line 79 repoint) |
| `grep -c "v1.11-audit-allowlist" v1.12-milestone-audit.mjs` | 0 (no stale references) |
| allowlist JSON phase field | `95-harness-lineage-bump-terminal-re-audit-milestone-close` |
| BASELINE_16 in regenerate-supervision-pins.mjs | 3 occurrences |
| `{Wave-1-commit-SHA}` placeholder remaining | 0 (replaced with `6d2eef4`) |
| COMMIT 2 file count | 3 (exactly — v1.12-milestone-audit.mjs + v1.12-audit-allowlist.json + regenerate-supervision-pins.mjs) |
| `_lib/frozen-at-close.mjs` touched | NO (V111 rides Atom 2 per HARN-02) |

## Deviations from Plan

None — plan executed exactly as written. All 4 relabel sites applied correctly; BASELINE_16 anchor SHA `6d2eef4` captured and inserted; Atom 1 is exactly 3 files.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes. This plan creates local CLI tooling only (validation `.mjs` scripts + sidecar JSON + planning markdown). No threat flags.

## Known Stubs

None — all files are complete with no placeholder values that affect functionality.

## Next Plans

- **Plan 95-02 (Atom 2):** `check-phase-94.mjs` + `check-phase-95.mjs` + `_lib/frozen-at-close.mjs` V111 entry + `audit-harness-v1.12-integrity.yml` — MUST be committed AND pushed to `origin/master` before Plan 95-03 Axis-2 GHA dispatch.
- **Plan 95-03:** 3-axis terminal re-audit (requires Atom 2 on origin/master).
- **Plan 95-04:** Close-gate (7 files, D-01 apex correction patches).

## Self-Check: PASSED

Files exist:
- `6d2eef4` present in git log: YES
- `8efa283` present in git log: YES
- `scripts/validation/v1.12-milestone-audit.mjs`: EXISTS
- `scripts/validation/v1.12-audit-allowlist.json`: EXISTS
- `scripts/validation/regenerate-supervision-pins.mjs` (modified): EXISTS
- `.planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-CONVENTIONS.md`: EXISTS
