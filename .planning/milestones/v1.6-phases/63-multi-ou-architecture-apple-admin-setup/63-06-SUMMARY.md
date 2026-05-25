---
phase: 63-multi-ou-architecture-apple-admin-setup
plan: "06"
subsystem: validation
tags: [validator, phase-63, check-phase, chain-extension, node-esm]
dependency_graph:
  requires: ["63-01", "63-02", "63-03", "63-04", "63-05"]
  provides: ["check-phase-63.mjs", "V-63-chain-slot"]
  affects: ["Phase 66 terminal re-audit chain"]
tech_stack:
  added: []
  patterns: ["Path-A check-phase copy", "git hash-object byte-unchanged guard", "CHAIN_PHASES extension"]
key_files:
  created:
    - scripts/validation/check-phase-63.mjs
  modified: []
decisions:
  - "CHAIN_PHASES extended to [48,49,51,52,53,54,55,56,57,58,59,60,61,62] — adds 62; Phase 63 excluded (V-63-SELF)"
  - "CHAIN_SKIP unchanged: {48,51,58,60,61} — Phase 63 adds no new pre-existing failures"
  - "V-63-08/09 use git hash-object subprocess for exactness, with graceful skip if git unavailable"
  - "V-63-02 asserts C16 slug against 05-sub-org-admin-onboarding.md (not 09-) per plan specification"
metrics:
  duration_minutes: 20
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
  completed_date: "2026-05-21"
---

# Phase 63 Plan 06: check-phase-63.mjs Validator-as-Deliverable Summary

**One-liner:** Phase 63 validator (check-phase-63.mjs) as Path-A copy of check-phase-62.mjs asserting all 10 OU deliverables — 26 PASS / 5 SKIPPED / 0 FAIL, exits 0.

## What Was Built

`scripts/validation/check-phase-63.mjs` — the Phase 63 validator-as-deliverable, a Path-A copy of check-phase-62.mjs. Implements 31 checks across 4 categories:

**V-63-01..11 structural assertions (11 checks):**
- V-63-01: All 8 new Phase 63 docs exist (03..10)
- V-63-02: C16 anchor slug `## Which admin owns this pool?` in 05-sub-org-admin-onboarding.md
- V-63-03: OP-1 DENY-by-default + Manage MDM Servers EXCLUDED in 04-custom-role-authoring.md
- V-63-04: OP-2 Account Holder EXCLUDED/DO-NOT-DELEGATE in 04-custom-role-authoring.md
- V-63-05: OP-3 companion View pairing present (Edit-without-View guard) in 04-
- V-63-06: Bundle size 4-6 included permission rows in 04-
- V-63-07: ios-capability-matrix.md Enrollment H2 has `Apple TV management`, `Shared iPad sessions`, `Apple Business delegation surface`
- V-63-08: macos-capability-matrix.md byte-unchanged vs baseline `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716`
- V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline `f25ff51a14b7feac46611c4c0511ed5c074ce03f`
- V-63-10: C15 framing guard across all 8 Phase 63 Apple docs (no Intune RBAC/role/scope-tag outside ABAUDIT exemptions)
- V-63-11: D-05 repair confirmed — 02-ous-architecture.md absent `05-vpp-catalog-consolidation`; present `11-vpp-catalog-runbook.md`

**V-63-ANCHOR-INVENTORY (1 check):** 63-ANCHOR-INVENTORY.md exists with >= 2 Pre-edit git SHA entries

**Chain regression-guard (14 checks, V-63-CHAIN-48..62):** Extended CHAIN_PHASES from check-phase-62.mjs's [48..61] to [48..62]. CHAIN_SKIP = {48,51,58,60,61} unchanged.

**Unit tests and meta-checks (5 checks):** FRONTMATTER-PARSE, C14-UNIT, C15-UNIT, V-63-SELF (63 absent from CHAIN_PHASES), V-63-AUDIT (v1.6-milestone-audit.mjs exits 0).

## Run Results

```
node scripts/validation/check-phase-63.mjs
Result: 26 PASS, 0 FAIL, 5 SKIPPED
Exit code: 0
```

```
node scripts/validation/v1.6-milestone-audit.mjs
Summary: 15 passed, 0 failed, 0 skipped
Exit code: 0
```

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author check-phase-63.mjs | ee4f6c7 | scripts/validation/check-phase-63.mjs |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. The validator reads existing corpus files and all required content is present.

## Threat Flags

None. The validator reads only local repository files via `fs.readFileSync` (no network, no user input). Subprocess calls use fixed argv arrays (`git hash-object`, `node scripts/validation/...`) with no external data interpolation — mirrors the T-63-SC / T-63-V1 threat model disposition in the plan.

## Self-Check: PASSED

- [x] `scripts/validation/check-phase-63.mjs` exists
- [x] `node scripts/validation/check-phase-63.mjs` exits 0 (26 PASS, 0 FAIL, 5 SKIPPED)
- [x] `node scripts/validation/v1.6-milestone-audit.mjs` exits 0 (15/15 PASS)
- [x] Task commit ee4f6c7 exists in git log
