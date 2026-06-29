---
phase: 100-harness-lineage-bump-terminal-re-audit-milestone-close
plan: "01"
subsystem: validation-harness
tags: [harness, path-a, v1.13, atom-1, harn-01]
dependency_graph:
  requires: []
  provides: [v1.13-milestone-audit.mjs, v1.13-audit-allowlist.json, BASELINE_17-comment]
  affects: [scripts/validation/regenerate-supervision-pins.mjs]
tech_stack:
  added: []
  patterns: [path-a-copy, 4-line-relabel, sidecar-repoint, baseline-comment-trail]
key_files:
  created:
    - scripts/validation/v1.13-milestone-audit.mjs
    - scripts/validation/v1.13-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
decisions:
  - "4-line relabel only (lines 2/4/35/79); C1-C16 inherited verbatim from v1.12; no C17 (Phase 100 has no corpus rename)"
  - "phase field in sidecar uses long slug form (mirrors v1.12 field type: 95-harness-lineage-bump-... → 100-harness-lineage-bump-...)"
  - "BASELINE_17 anchored to pre-Atom-1 SHA ea24467 (not to future close-gate SHA)"
  - "V112 deliberately absent from Atom 1 — rides Atom 2 per HARN-02 (mirrors v1.12 Phase 95 V111-rides-Atom-2 pattern)"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-29"
  tasks_completed: 2
  tasks_total: 2
  files_created: 2
  files_modified: 1
---

# Phase 100 Plan 01: v1.13 Harness-Core Path-A Atom 1 Summary

**One-liner:** v1.13 audit harness cloned from v1.12 via 4-line relabel (lines 2/4/35/79), sidecar repointed to phase 100, and BASELINE_17 freshness comment appended in regenerate-supervision-pins.mjs.

## What Was Built

### Atom 1 Files (ONE indivisible commit, exactly 3 files)

| File | Action | Description |
|------|--------|-------------|
| `scripts/validation/v1.13-milestone-audit.mjs` | CREATE | Path-A copy of v1.12; 4-line relabel; C1-C16 verbatim; self-test 9/9 |
| `scripts/validation/v1.13-audit-allowlist.json` | CREATE | v1.12 sidecar repointed to phase 100; all arrays byte-identical |
| `scripts/validation/regenerate-supervision-pins.mjs` | MODIFY | BASELINE_17 comment block (7 lines) inserted after line 459; BASELINE_9 array unchanged |

## Verification Results

| Gate | Result | Detail |
|------|--------|--------|
| Self-test | 9/9 passed | `node v1.13-milestone-audit.mjs --self-test` exits 0 |
| Default run | 15 passed, 0 failed, 0 skipped | C1-C16 (15 checks) all PASS — same as v1.12 |
| Sidecar repoint | PASS | `grep -c "v1.13-audit-allowlist.json"` >= 1 (non-comment); stale v1.12 refs = 0 |
| Phase field | PASS | `j.phase = "100-harness-lineage-bump-terminal-re-audit-milestone-close"` |
| BASELINE_17 | PASS | 3 occurrences of `BASELINE_17` in regenerate-supervision-pins.mjs; no placeholders |
| Comment-only diff | PASS | `git diff --stat` shows 7 insertions only in regenerate-supervision-pins.mjs |
| Exactly 3 files | PASS | `git show --stat HEAD` lists exactly 3 files |
| V112 absent | PASS | frozen-at-close.mjs NOT in commit (rides Atom 2 per HARN-02) |
| Predecessor unchanged | PASS | `git diff ea24467 HEAD -- v1.12-milestone-audit.mjs v1.12-audit-allowlist.json` = empty |

## Key Anchors

| Anchor | Value | Purpose |
|--------|-------|---------|
| Pre-Atom-1 HEAD SHA | `ea24467` | BASELINE_17 anchor; Plan 100-04 byte-unchanged gate base |
| Atom 1 commit SHA | `2ffc2e7` | The indivisible HARN-01 Atom 1 commit |

## V112 Deliberate Absence

V112 (frozen-at-close.mjs pin for the Phase 95 close-gate SHA `12f2c7b`) does NOT ride Atom 1. This mirrors the v1.12 Phase 95 precedent where V111 rode Atom 2. V112 will be added in Plan 100-02 (Atom 2) together with check-phase-96..100 validators and the CI coexistence workflow.

## BASELINE_17 Content

Inserted at line 460 of regenerate-supervision-pins.mjs (after the BASELINE_16 forward-pointer at the former line 459, before `const BASELINE_9 = [`):

```
// BASELINE_17 refreshed 2026-06-29 (Phase 100 Plan 100-01): closes BASELINE_16 v1.12 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 100 SC#1); v1.13 line positions
// verified against HEAD ea24467 (Phase 100 Wave-1 commit — Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 100 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 100
// close and remain valid for the v1.13 corpus. Resolution path: BASELINE_18 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.12 -> BASELINE_16 -> v1.13 -> BASELINE_17).
```

## Deviations from Plan

None — plan executed exactly as written. 4-line relabel applied verbatim per RESEARCH §"Exact 4-Line Relabel for v1.13-milestone-audit.mjs"; sidecar repointed; BASELINE_17 inserted; atom committed with exactly 3 files.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This is tooling-only (local CLI validation scripts + JSON sidecar + comment-only edit to a generator). No security-relevant surface changes.

## Self-Check: PASSED

- `scripts/validation/v1.13-milestone-audit.mjs` — exists and runs correctly
- `scripts/validation/v1.13-audit-allowlist.json` — exists, valid JSON, phase = 100
- Commit `2ffc2e7` exists in git log with exactly 3 files
- Pre-Atom-1 anchor `ea24467` recorded
