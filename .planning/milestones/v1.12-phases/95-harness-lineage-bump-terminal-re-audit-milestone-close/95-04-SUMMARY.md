---
phase: 95
plan: "95-04"
subsystem: milestones
tags: [milestone-close, audit-harness, traceability, path-a, v1.12]
dependency_graph:
  requires: [95-03-SUMMARY.md, 95-CONTEXT.md, 95-CONVENTIONS.md, 95-RESEARCH.md]
  provides: [v1.12-MILESTONE-AUDIT.md, v1.12-DEFERRED-CLEANUP.md, 95-VERIFICATION.md, v1.12-MILESTONE-CLOSE]
  affects: [ROADMAP.md, STATE.md, REQUIREMENTS.md, PROJECT.md]
tech_stack:
  added: []
  patterns: [path-a-milestone-close, predecessor-byte-unchanged-gate, no-commit-a-protocol, indivisible-close-gate-commit]
key_files:
  created:
    - .planning/milestones/v1.12-MILESTONE-AUDIT.md
    - .planning/milestones/v1.12-DEFERRED-CLEANUP.md
    - .planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-VERIFICATION.md
  modified:
    - .planning/PROJECT.md
    - .planning/ROADMAP.md
    - .planning/STATE.md
    - .planning/REQUIREMENTS.md
decisions:
  - "NO Commit A: close_commit field stays as literal placeholder {phase_95_close_SHA}; no forward-reference"
  - "D-01 apex correction applied at all 5 sites: [48..93] (46 entries) was off-by-one; [48..94] (47 entries) is correct per [48..N-1] invariant"
  - "D-03 corrected OS split: BOTH chain validators (check-phase-93 [48..92] AND check-phase-95 [48..94]) cascade on cold Windows; Linux GHA sole-authoritative for both"
  - "SD-3 ledger: DROP 3 resolved MIGV items; CARRY all open items with WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 depth updated to [48..94]; ADD GLOSSARY-IRU-URL-FRESHNESS-01"
metrics:
  duration: "~25 minutes"
  completed: "2026-06-26"
  tasks_completed: 2
  files_changed: 7
---

# Phase 95 Plan 95-04: v1.12 MILESTONE CLOSE Summary

**One-liner:** v1.12 close-gate: 3 new milestone docs authored + 4-doc 6/6 Validated traceability flip + D-01 apex correction at 5 sites — all 7 files in single indivisible COMMIT 5 (byte-unchanged gate PASSED)

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 3 close-gate docs | (prior session) | v1.12-MILESTONE-AUDIT.md, v1.12-DEFERRED-CLEANUP.md, 95-VERIFICATION.md |
| 2 | 4-doc traceability flip + D-01 apex + COMMIT 5 | 12f2c7b | PROJECT.md, ROADMAP.md, STATE.md, REQUIREMENTS.md (+ 3 new docs above) |

## What Was Built

**v1.12-MILESTONE-AUDIT.md** — Canonical Path-A audit document, 10th entry in lineage v1.4→v1.12 (phases 62→66→70→74→82→88→93→95). 7-section structure. GHA run 28270308253, audited ref `fc82eeb5`. Cross-OS 4-row table: v1.12-milestone-audit 15/0/0 EXACT MATCH; check-phase-94 7/0/0 EXACT MATCH; check-phase-93 47/0/1 Linux sole-authoritative; check-phase-95 49/0/1 Linux sole-authoritative. 6/6 Validated. `close_commit: "{phase_95_close_SHA}"` literal placeholder (NO Commit A). No stray pre-close artifact existed.

**v1.12-DEFERRED-CLEANUP.md** — Three-section ledger:
- DROP: INTUNE-PROFILE-ENROLLMENT-01, IRU-CONSOLE-DELETE-01, SUPERVISION-STATUS-POST-MIGRATION-01 (resolved by Phase 94 MIGV-01/02/03)
- CARRY: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (depth updated [48..92]→[48..94]), MTPSSO-01/02/03, KRBFUT-01/02, MIGFUT-01/02, v1.8 Part C items (CI-3, ARCHIVE-UPSTREAM-01, HELPER-SPAWN-STDERR-01, FROZEN-AWARE-ADOPTION-SWEEP-01, EXEC-FAIL-DETAIL-EXTRACTION-01, and 5 Apple-scope items)
- ADD: GLOSSARY-IRU-URL-FRESHNESS-01 (Phase-94 CR-01; `docs/_glossary-macos.md:~114` still asserts single URL contradicting MIGV-02 3-URL reality)

**95-VERIFICATION.md** — Phase 95 verification; V-95-AUDIT target for validator; status: passed; 7/7 Observable Truths VERIFIED; D-01 Apex Correction table with all 5 sites showing PATCHED status. Predecessor byte-unchanged gate: EMPTY confirmed.

**4-doc traceability flip:**
- REQUIREMENTS.md: MIGV-01/02/03 + HARN-01/02/03 Status: Complete → Validated; coverage 0/6 → 6/6 Validated; D-01 apex patch at HARN-02 ([48..93]→[48..94]) and HARN-03 (depth [48..93]→[48..94])
- ROADMAP.md: Phase 95 progress 3/4 → 4/4 Complete; 95-04-PLAN.md `[ ]` → `[x]`; v1.12 milestone `[ ]` → `[x] (shipped 2026-06-26)`; SC#2 [48..93]→[48..94] (47 entries); D-03 corrected OS split in SC#3
- STATE.md: frontmatter `status: executing` → `closed`, `completed_phases: 1` → `2`, `percent: 50` → `100`; coverage "0/6 Validated" → "6/6 Validated — CLOSED"; dep-summary chain-apex [48..93]→[48..94]; Pending Todo V111/D-01 items marked COMPLETED; Current Position updated to COMPLETE; session continuity updated
- PROJECT.md: "Current Milestone: v1.12" → "Previous Milestone: v1.12 (SHIPPED 2026-06-26)"; milestone bullet → SHIPPED; v1.12 shipped-state section added noting all deliverables, D-01 correction, corrected D-03 OS split

## Decisions Made

1. **NO Commit A protocol held** — `close_commit: "{phase_95_close_SHA}"` remains a literal placeholder. `check-phase-95` only reads PRIOR-milestone closes via `_lib/frozen-at-close.mjs`; there is no self-referential forward-reference to the close commit.

2. **D-01 apex correction** — Off-by-one found in ROADMAP/STATE/REQUIREMENTS during plan research phase. Correct value per `[48..N-1]` invariant is `CHAIN_PHASES=[48..94]` (47 entries, where N=95). Applied at all 5 enumerated sites before COMMIT 5.

3. **D-03 corrected OS split** — Both chain validators (check-phase-93 at depth [48..92] AND check-phase-95 at depth [48..94]) cascade on cold Windows hitting WINDOWS-CLONE-DEEPNEST-TIMEOUT-01; Linux GHA is sole-authoritative for BOTH, not just the apex validator. Corrected in MILESTONE-AUDIT, VERIFICATION, ROADMAP SC#3, and STATE dep-summary.

4. **SD-3 ADD entry** — GLOSSARY-IRU-URL-FRESHNESS-01 added to DEFERRED-CLEANUP: `docs/_glossary-macos.md:~114` still asserts single URL for Iru/Kandji portal, contradicting Phase-94 MIGV-02's verified 3-URL reality (support.iru.io + docs.iru.com + admin.iru.io). Corpus follow-up for v1.13+.

## Predecessor Byte-Unchanged Gate

Gate: `git diff ddf1355 HEAD -- <26 frozen surfaces>` MUST return EMPTY.

Result: **EMPTY** (gate PASSED — run twice: once before Task 1, once immediately before COMMIT 5 staging).

26 frozen surfaces:
- 8 workflow YAMLs: audit-harness-integrity.yml + v1.5 through v1.11 coexistence workflows
- 9 milestone-audit MJS: v1.4, v1.4.1, v1.5 through v1.11
- 9 sidecar JSONs: v1.4, v1.4.1, v1.5 through v1.11 allowlists

## COMMIT 5 Composition

**Hash:** 12f2c7b  
**Exact message:** `docs(95-04): Phase 95 close-gate — v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.12 MILESTONE CLOSE`  
**Files (7):**
1. `.planning/milestones/v1.12-MILESTONE-AUDIT.md` (A)
2. `.planning/milestones/v1.12-DEFERRED-CLEANUP.md` (A)
3. `.planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-VERIFICATION.md` (A)
4. `.planning/PROJECT.md` (M)
5. `.planning/ROADMAP.md` (M)
6. `.planning/STATE.md` (M)
7. `.planning/REQUIREMENTS.md` (M)

No Commit A. Indivisible. No deletions.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All data in the authored documents is factual (GHA run 28270308253, audited ref fc82eeb5, atom SHAs 8efa283/1de2bbb, V111=919b23b, clone rand dfgzbola, timing 206s/157s) sourced from 95-03-AUDIT-RESULTS.md and 95-CONTEXT.md.

## Threat Flags

None. All 7 files are `.planning/` docs (non-executable, non-networked, gitignored write-back path). No new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries.

## Self-Check: PASSED

- [x] `.planning/milestones/v1.12-MILESTONE-AUDIT.md` — FOUND
- [x] `.planning/milestones/v1.12-DEFERRED-CLEANUP.md` — FOUND
- [x] `.planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-VERIFICATION.md` — FOUND
- [x] `.planning/PROJECT.md` — modified (v1.12 SHIPPED)
- [x] `.planning/ROADMAP.md` — modified (6/6 validated, 4/4 complete, [48..94])
- [x] `.planning/STATE.md` — modified (closed, 100%, [48..94])
- [x] `.planning/REQUIREMENTS.md` — modified (6/6 Validated)
- [x] COMMIT 5 hash 12f2c7b — FOUND (git log confirms)
- [x] Byte-unchanged gate — EMPTY (PASSED)
- [x] No Commit A (close_commit is literal placeholder everywhere)
