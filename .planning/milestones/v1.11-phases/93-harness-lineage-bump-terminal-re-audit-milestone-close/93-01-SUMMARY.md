---
phase: 93-harness-lineage-bump-terminal-re-audit-milestone-close
plan: "01"
subsystem: validation-harness
tags: [harness-lineage, v1.11, milestone-audit, Path-A, HARN-01, BASELINE_15]
dependency_graph:
  requires: [Phase 92 NAV-01 committed]
  provides: [v1.11-milestone-audit.mjs, v1.11-audit-allowlist.json, 93-CONVENTIONS.md, BASELINE_15]
  affects: [regenerate-supervision-pins.mjs]
tech_stack:
  added: []
  patterns: [Path-A lineage-bump, verbatim-copy+4-relabel, comment-only BASELINE append]
key_files:
  created:
    - .planning/phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/93-CONVENTIONS.md
    - scripts/validation/v1.11-milestone-audit.mjs
    - scripts/validation/v1.11-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
decisions:
  - "COMMIT 1 (docs-only): 93-CONVENTIONS.md constants lock (SHA 34653cb = BASELINE_15 anchor)"
  - "COMMIT 2 (Atom 1, INDIVISIBLE, 3 files): v1.11-milestone-audit.mjs + v1.11-audit-allowlist.json + BASELINE_15 comment in regenerate-supervision-pins.mjs"
  - "V110 deliberately absent from Atom 1 — rides Atom 2 per locked D-02/D-04 divergence"
  - "BASELINE_15 anchor = 34653cb (COMMIT 1 SHA — known-PAST at Atom-1 commit time)"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-25"
  tasks_completed: 2
  files_created: 3
  files_modified: 1
---

# Phase 93 Plan 01: 93-CONVENTIONS.md Constants Lock + HARN-01 Atom 1 Summary

**One-liner:** Phase 93 constants lock document + v1.11 milestone-audit harness Path-A copy (C1-C16 verbatim, self-test 9/9, sidecar repointed to v1.11-audit-allowlist.json) + BASELINE_15 comment in regenerate-supervision-pins.mjs — shipped as two clean commits.

## Commits Made

| Commit | Message | Files |
|--------|---------|-------|
| `34653cb` | `docs(93-01): 93-CONVENTIONS.md — Phase 93 constants lock` | 93-CONVENTIONS.md |
| `84cf2d4` | `feat(93-01): v1.11 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)` | v1.11-milestone-audit.mjs, v1.11-audit-allowlist.json, regenerate-supervision-pins.mjs |

## Key Outcomes

### COMMIT 1 (docs-only): 93-CONVENTIONS.md
- Phase 93 constants lock document created at `.planning/phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/93-CONVENTIONS.md`
- Records: V110=`a3617e9` (full SHA), BASELINE_15 anchor=`34653cb`, 7-validator cross-OS set, 8 V-92-CROSSLINK needles (incl. `#platform-sso-attestation-command`), 23 frozen surfaces, 5 locked commit messages, chain `62→66→70→74→82→88→93`
- SHA `34653cb` = the BASELINE_15 anchor (known-PAST when Atom 1 committed)

### COMMIT 2 (Atom 1, INDIVISIBLE, exactly 3 files): HARN-01
- **`v1.11-milestone-audit.mjs`** (979 lines): verbatim Path-A copy of v1.10, exactly 4 relabel sites:
  - Line 2: lineage extended `... → v1.10 → v1.11`; "Path A copy of v1.10"
  - Line 4: sidecar → `v1.11-audit-allowlist.json`; "per Phase 93 close-state"
  - Line 35: Usage → `node scripts/validation/v1.11-milestone-audit.mjs`
  - Line 79: `readFile('scripts/validation/v1.11-audit-allowlist.json')` (CI path-match needle)
- **`v1.11-audit-allowlist.json`** (531 lines): verbatim Path-A copy of v1.10; `generated` bumped to `2026-06-25T00:00:00Z`; `phase` repointed to `93-harness-lineage-bump-terminal-re-audit-milestone-close`; all c13 counts (6 transient_external + 9 template_placeholder) and c16_missing_endpoint_exemptions: [] carried verbatim
- **`regenerate-supervision-pins.mjs`** (comment-only edit): BASELINE_15 block appended after BASELINE_14 region (line 445), anchored to `34653cb`; BASELINE_9 array at :446 unchanged

## Verification Results

| Check | Result |
|-------|--------|
| `node scripts/validation/v1.11-milestone-audit.mjs --self-test` | **9 passed, 0 failed** (exit 0) |
| `node scripts/validation/v1.11-milestone-audit.mjs` (default) | **15 passed, 0 failed, 0 skipped** (exit 0) |
| `grep -c "v1.11-audit-allowlist.json" scripts/validation/v1.11-milestone-audit.mjs` | **2** (line 4 + line 79) |
| `grep -c "v1.10-audit-allowlist" scripts/validation/v1.11-milestone-audit.mjs` | **0** (no stale refs) |
| `v1.11-audit-allowlist.json` phase field | `93-harness-lineage-bump-terminal-re-audit-milestone-close` |
| `grep -c "BASELINE_15" scripts/validation/regenerate-supervision-pins.mjs` | **3** |
| COMMIT 2 file count (`git show --stat`) | **exactly 3 files** |
| V110 in Atom 1 | **ABSENT** (rides Atom 2 per D-02/D-04) |

## Constants Captured

| Constant | Value |
|----------|-------|
| Pre-Phase-93 anchor SHA | `9ef5efb` (recorded in research; planning commits 4b25aeb/6aa734e came after) |
| COMMIT 1 SHA (BASELINE_15 anchor) | `34653cb` |
| COMMIT 2 SHA (Atom 1) | `84cf2d4` |
| V110 (v1.10 close-gate, rides Atom 2) | `a3617e9` |
| self-test count | 9/9 (preserved) |
| default run | 15/0/0 (preserved) |

## Deviations from Plan

None — plan executed exactly as written. All 4 relabel sites applied. Atom 1 = exactly 3 files. Self-test 9/9. Default 15/0/0. BASELINE_15 anchor = known-PAST COMMIT 1 SHA. V110 deliberately absent from Atom 1 per locked D-02/D-04.

## Known Stubs

None. This plan is tooling-only (no docs/* content stubs).

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Files created are local CLI validation scripts and a planning markdown. Threat model confirms near-zero surface (T-93-01-T and T-93-01-I mitigated by acceptance gates, which passed).

## Self-Check: PASSED

- `scripts/validation/v1.11-milestone-audit.mjs` — FOUND (979 lines)
- `scripts/validation/v1.11-audit-allowlist.json` — FOUND (531 lines)
- `scripts/validation/regenerate-supervision-pins.mjs` — FOUND (BASELINE_15 present, 3 occurrences)
- `.planning/phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/93-CONVENTIONS.md` — FOUND
- Commit `34653cb` — FOUND (docs(93-01))
- Commit `84cf2d4` — FOUND (feat(93-01))
- Atom 1 file count — 3 (PASSED)
- Self-test 9/9 — PASSED
- Default 15/0/0 — PASSED
