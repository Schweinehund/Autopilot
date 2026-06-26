---
phase: 91-glossary-capability-matrix
plan: "03"
subsystem: docs/reference
tags: [capability-matrix, blob-hash, atomic-commit, enrollment, macos-migration]
dependency_graph:
  requires: ["91-02"]
  provides: ["REF-02"]
  affects: ["scripts/validation/check-phase-63.mjs", "docs/reference/macos-capability-matrix.md", "docs/reference/4-platform-capability-comparison.md"]
tech_stack:
  added: []
  patterns: ["blob-hash atomicity invariant", "link-not-copy matrix cell", "single-row enrollment table append"]
key_files:
  modified:
    - docs/reference/macos-capability-matrix.md
    - docs/reference/4-platform-capability-comparison.md
    - scripts/validation/check-phase-63.mjs
decisions:
  - "Atomic three-file commit: both doc edits + both BASELINE updates in one git commit per D-05 locked decision"
  - "macOS cell carries all coverage facts in single-line pipe cell (no HTML/br): profile-based re-enrollment, wipe-free, PSSO re-registration always required, pre-26 fallback"
  - "4-platform Windows cell links to linux-capability-matrix.md#enrollment per file's established architecture (line 13 convention)"
  - "macOS 4-platform cell links to macos-capability-matrix.md#enrollment (not #migration — no such anchor exists)"
metrics:
  duration: "~5 minutes"
  completed: "2026-06-24"
  tasks_completed: 1
  tasks_total: 1
  files_modified: 3
---

# Phase 91 Plan 03: Matrix Migration Row + Atomic BASELINE Pin Summary

**One-liner:** Atomic three-file commit appending macOS 26 in-place ABM migration row to both enrollment tables with updated V-63-08/V-63-09 blob-hash baselines; check-phase-63.mjs exits 0 with 32 PASS.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Append migration row to both matrix files, pin both BASELINE hashes atomically | 7039630 | docs/reference/macos-capability-matrix.md, docs/reference/4-platform-capability-comparison.md, scripts/validation/check-phase-63.mjs |

## What Was Built

### docs/reference/macos-capability-matrix.md

Added one new data row as the last row in the `## Enrollment` table (after the `Re-enrollment fires blocking screen` row):

```
| macOS 26 in-place ABM migration | n/a | Supported (profile-based re-enrollment, wipe-free; PSSO re-registration always required post-migration; pre-macOS-26 devices use wipe-and-re-enroll fallback) — see [MDM Migration Walkthrough](../macos-lifecycle/02-mdm-migration-psso.md) |
```

Updated frontmatter (`last_verified: 2026-06-24`, `review_by: 2026-09-24`) and prepended a Version History row.

### docs/reference/4-platform-capability-comparison.md

Added one dedicated row as the last row in the `## Enrollment` table (after the `Windows 10 support / minimum OS` row):

```
| macOS 26 in-place ABM migration | n/a — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | n/a — [matrix](ios-capability-matrix.md#enrollment) | n/a — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
```

Updated frontmatter and prepended a Version History row.

### scripts/validation/check-phase-63.mjs

Updated V-63-08 BASELINE (comment, name string, const BASELINE) from `73f16378197223378a8507a6751c763902de58db` to `732588a57fd762c294400a4f6fd9a065c974216c`.

Updated V-63-09 BASELINE (comment, name string, const BASELINE) from `2314ede7be54efbea1d4a4a787068310869a5896` to `8dc79613922450a00c9a6bb40279a1e65a44390a`.

## Verification Results

```
[8/32] V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 732588a57fd762c294400a4f6fd9a065c974216c PASS
[9/32] V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob 8dc79613922450a00c9a6bb40279a1e65a44390a PASS
Result: 32 PASS, 0 FAIL, 0 SKIPPED
```

`git show --name-only HEAD` lists exactly the three content/validator files — no split commit.

## Acceptance Criteria Status

- [x] node scripts/validation/check-phase-63.mjs exits 0; V-63-08 PASS, V-63-09 PASS
- [x] git hash-object docs/reference/macos-capability-matrix.md == 732588a57fd762c294400a4f6fd9a065c974216c (matches const BASELINE)
- [x] git hash-object docs/reference/4-platform-capability-comparison.md == 8dc79613922450a00c9a6bb40279a1e65a44390a (matches const BASELINE)
- [x] macos-capability-matrix.md contains 'macOS 26 in-place ABM migration' row with Windows cell 'n/a' under ## Enrollment
- [x] No '## Migration' heading added to either file
- [x] 4-platform row macOS cell links to 'macos-capability-matrix.md#enrollment'
- [x] Non-macOS cells use 'n/a — [matrix](...#enrollment)' form
- [x] git show --name-only HEAD lists exactly the three files (no split)
- [x] No same-tenant Secure Enclave key survival claim; PSSO re-registration always required is stated

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all cell content is factual (PSSO re-registration always required, pre-26 fallback, wipe-free profile-based re-enrollment) per Phase-90 KEY FACTS.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or schema changes. Edit is purely documentation row append + in-repo validator BASELINE update.

## Self-Check: PASSED

- docs/reference/macos-capability-matrix.md: FOUND (contains migration row)
- docs/reference/4-platform-capability-comparison.md: FOUND (contains migration row)
- scripts/validation/check-phase-63.mjs: FOUND (V-63-08 BASELINE = 732588a5..., V-63-09 BASELINE = 8dc79613...)
- Commit 7039630: FOUND
- check-phase-63.mjs: 32 PASS, 0 FAIL, 0 SKIPPED
