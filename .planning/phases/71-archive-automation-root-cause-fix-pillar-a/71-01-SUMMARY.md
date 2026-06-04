---
phase: 71
plan: 71-01
subsystem: archive-automation
tags: [archive, extraction, regex-fix, vendored-fallback, unit-test-fixture, chain-apex-validator, atomic-commit]
requires:
  - .planning/phases/70-*/70-05-SUMMARY.md  # Plan 70-05 Commit A 14683de commit-with-known-FAIL precedent
  - .planning/phases/67-*/67-02-SUMMARY.md  # Plan 67-02 55260b3 atomic-within-plan 3-file precedent
  - .planning/phases/68-*/                  # Phase 68 7b635ca CHAIN_SKIP-empty invariant
provides:
  - scripts/archive/extract-summary-oneliners.mjs       # vendored corrected extractor (D-01 LOCKED Option B)
  - scripts/archive/test-extract-oneliner.mjs           # 3-case unit-test fixture (D-02 LOCKED Option C unit-test prong)
  - scripts/validation/check-phase-71.mjs               # chain-apex validator (D-02 LOCKED Option C static-scan prong)
affects:
  - .planning/MILESTONES.md                              # asserted by V-71-MILESTONES-01 + V-71-ARCHIVE02-01 (transient FAILs)
  - check-phase-{48..70}.mjs                             # chain-regression sweep
tech-stack:
  added: []
  patterns:
    - vendored-fallback   # routes around upstream SDK fallback at phase-lifecycle.ts:1693
    - unit-test-fixture   # in-process Node fixture asserts regex semantics
    - chain-apex-validator # exit-code aggregator over CHAIN_PHASES = [48..70]
    - atomic-commit-with-known-FAIL  # Plan 70-05 Commit A 14683de precedent
key-files:
  created:
    - scripts/archive/extract-summary-oneliners.mjs
    - scripts/archive/test-extract-oneliner.mjs
    - scripts/validation/check-phase-71.mjs
  modified: []
decisions:
  - D-01 LOCKED Option B (vendored fallback rather than upstream-PR-blocking)
  - D-02 LOCKED Option C (BOTH unit-test fixture AND chain-apex static scan)
  - D-03 LOCKED Option D (Plan 71-02 will replace v1.1+v1.2 H2 from MILESTONE-AUDIT canonical source)
  - Rule 4 escalation resolved Option A (atomic 3-file commit with transient-FAILs documented)
metrics:
  duration: "~3h"
  completed: "2026-06-03"
  files-created: 3
  files-modified: 0
  commit-sha: e4887b2
---

# Phase 71 Plan 71-01: Vendored Extractor + Unit-Test Fixture + Chain-Apex Validator Summary

**One-liner:** Vendored extractor + 3-case unit-test fixture + chain-apex validator landed atomically (3 files in 1 SHA per SC#4 byte-exact); 2 expected transient FAILs + 8 pre-existing chain FAILs documented; commits the chicken-and-egg state per Plan 70-05 Commit A `14683de` precedent.

## What Shipped

| File                                              | Bytes  | Purpose                                                                                            |
| ------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `scripts/archive/extract-summary-oneliners.mjs`   | 11,689 | Vendored extractor with corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m`         |
| `scripts/archive/test-extract-oneliner.mjs`       | 2,642  | 3-case fixture: label-not-captured / pre-write idempotency / CRLF tolerance (all 3 PASS)           |
| `scripts/validation/check-phase-71.mjs`           | 14,516 | Chain-apex validator over CHAIN_PHASES = [48..70], CHAIN_SKIP empty per Phase 68 `7b635ca` invariant |

**Atomic commit:** `e4887b2b7c06b6c3498ff7385a7903049f2b99c8` (short `e4887b2`)
- Files in SHA: **3** (verified `git show --name-only --format= e4887b2 | grep -c "^."` = 3)
- Predecessor v1.7 audit artifacts unchanged (verified empty diff against `.github/workflows/audit-harness-v1.7-integrity.yml`, `scripts/validation/v1.7-milestone-audit.mjs`, `scripts/validation/v1.7-audit-allowlist.json`)
- ATOMIC byte-exact contract per ROADMAP SC#4 satisfied
- Precedent: Phase 67 Plan 67-02 `55260b3` (atomic-within-plan 3-file scope)

## Transient States Landed at This SHA (commit-with-known-FAIL)

Precedent: Plan 70-05 Commit A `14683de` (chicken-and-egg validator/sweep ordering).

Post-commit validator signature: **19 PASS, 10 FAIL, 0 SKIPPED** (exit 1).

### (a) Phase-71-OWNED transient (resolved by Plan 71-02 sweep)

| Validator             | Status | Reason                                                                                                      | Resolution                                                                                                          |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| V-71-MILESTONES-01    | FAIL   | 4 placeholder bullets in `.planning/MILESTONES.md`: lines 145/146/148 (`- One-liner:`) + line 164 (`- Edit 1 -- docs/error-codes/00-index.md:` NEW DISCOVERY) | Plan 71-02 re-authors v1.1 + v1.2 H2 from MILESTONE-AUDIT source-of-truth (D-03 LOCKED Option D)                    |
| V-71-ARCHIVE02-01     | FAIL   | v1.2 H2 has 3 debris bullets; v1.1 H2 has 1 debris bullet                                                   | Same Plan 71-02 sweep clears v1.1 + v1.2 H2 ranges                                                                  |

### (b) Pre-existing chain degradation (NOT caused by Phase 71)

Discovered during Plan 71-01 pre-commit dry-run. Will be routed as `CHAIN-DEGRADED-AT-HEAD-01` in `v1.8-DEFERRED-CLEANUP.md` by Plan 71-03 close-gate.

| Validator           | Status | Root Cause                                                                                                                          |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| V-71-CHAIN-61       | FAIL   | V-61-17 in `check-phase-61.mjs` asserts `MILESTONES.md` top-H2 = v1.5 but HEAD shows v1.7 (HEAD-coupled assertion stale post-v1.7-close) |
| V-71-CHAIN-67       | FAIL   | V-67-05 + V-67-06 in `check-phase-67.mjs` assert OP-10 callouts + Version History rows at v1.7-frozen SHA `aa6de68`; content drift between v1.7 close (2026-05-28) and Phase 71 start (2026-06-03) |
| V-71-CHAIN-{62..66} | FAIL   | Cascade from V-NN-CHAIN-61 chain wrapper                                                                                            |
| V-71-CHAIN-70       | FAIL   | Cascade from V-70-CHAIN-{61..67}                                                                                                    |

**Scope class:** Exact `SCOPE-GAP-RETRO-01` class scoped to Phase 73 Pillar C (HARNESS-FORWARD-01 retrospective + RETRO-02 v1.5/v1.6/v1.7-frozen-aware conversion of HEAD-coupled assertions in `check-phase-{48..66}.mjs`).

## CHAIN-DEGRADED-AT-HEAD-01 — Surfaced for Plan 71-03

**New entry** to be authored as stub in `v1.8-DEFERRED-CLEANUP.md` by Plan 71-03 close-gate:

- **Entry ID:** `CHAIN-DEGRADED-AT-HEAD-01`
- **Class:** SCOPE-GAP-RETRO-01 (HEAD-coupled assertion staleness in check-phase-{61..67}.mjs)
- **Failing validators at v1.8-Phase-71 HEAD:** 8 (V-71-CHAIN-{61..67, 70})
- **Resolution phase:** Phase 73 Pillar C (HARNESS-FORWARD-01 retrospective + RETRO-02 conversion)
- **Why deferred:** Out of scope for Phase 71 (Archive-Automation Root-Cause Fix Pillar A); converting HEAD-coupled assertions to frozen-SHA-aware variants requires retrospective harness sweep across 19 check-phase scripts which belongs to Phase 73

## Decisions Made

1. **D-01 LOCKED Option B (vendored fallback):** Vendored corrected extractor at `scripts/archive/extract-summary-oneliners.mjs` rather than blocking on upstream SDK PR. Upstream tracked as `ARCHIVE-UPSTREAM-01` for Plan 71-03 stub.
2. **D-02 LOCKED Option C (BOTH prongs):** Ships unit-test fixture (`test-extract-oneliner.mjs` 3 PASS) AND chain-apex static scan (`check-phase-71.mjs` 29 validators).
3. **D-03 LOCKED Option D (REPLACEMENT FROM CANONICAL SOURCE):** Plan 71-02 will re-author v1.1+v1.2 H2 ranges from MILESTONE-AUDIT canonical data, not patch placeholders in-place.
4. **Rule 4 escalation resolved Option A:** Atomic 3-file commit with transient FAILs documented, per Plan 70-05 Commit A `14683de` precedent. Validator design preserved (no `CHAIN_SKIP` mutation per Phase 68 `7b635ca` invariant).

## Self-Test Results

| Test                                          | Result    |
| --------------------------------------------- | --------- |
| `extract-summary-oneliners.mjs --self-test`   | PASS (3/3 fixtures) |
| `test-extract-oneliner.mjs`                   | PASS (3/3 — label-not-captured / pre-write idempotency / CRLF tolerance) |
| `check-phase-71.mjs`                          | 19 PASS / 10 FAIL (documented transient + pre-existing chain degradation) |
| `v1.7-milestone-audit.mjs` (V-71-AUDIT)       | 15/15 PASS (predecessor byte-unchanged) |

## Deviations from Plan

**None.** Plan 71-01 executed exactly as specified. The Rule 4 escalation surfaced during pre-commit dry-run was resolved by user authorization (Option A), and Plan 71-01 scope was preserved without validator-design mutation.

## Threat Flags

None. Plan 71-01 ships diagnostic tooling and validators only — no new endpoints, auth surfaces, or trust-boundary changes.

## Self-Check: PASSED

- [x] `scripts/archive/extract-summary-oneliners.mjs` FOUND on disk (11,689 bytes)
- [x] `scripts/archive/test-extract-oneliner.mjs` FOUND on disk (2,642 bytes)
- [x] `scripts/validation/check-phase-71.mjs` FOUND on disk (14,516 bytes)
- [x] Commit `e4887b2` FOUND in `git log --oneline -5` HEAD
- [x] FILE_COUNT == 3 verified
- [x] Predecessor diff EMPTY verified
- [x] Post-commit validator re-run signature 19 PASS / 10 FAIL matches pre-commit dry-run
