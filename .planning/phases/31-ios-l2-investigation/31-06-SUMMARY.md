---
phase: 31-ios-l2-investigation
plan: 06
subsystem: docs
tags: [ios, l2, navigation, index, mam-advisory, addts-01]

# Dependency graph
requires:
  - phase: 31-ios-l2-investigation
    provides: "Plans 31-01/02 delivered 14-ios-log-collection.md + 15-ios-ade-token-profile.md + 16-ios-app-install.md; Plan 31-03 delivered 17-ios-compliance-ca-timing.md. All 4 target runbooks exist and carry matching frontmatter/platform gates needed for the index links and anchors."
provides:
  - "L2 runbooks index (00-index.md) extended with ## iOS L2 Runbooks H2 section containing version-gate blockquote, prerequisite note to 14-ios-log-collection.md, When to Use table (4 rows covering 14-17), iOS L1 Escalation Mapping (6 rows for L1 16-21), and MAM-WE Investigation Advisory blockquote citing ADDTS-01."
  - "Valid anchor target 00-index.md#ios-l2-runbooks for Wave 5 (Plan 31-07) D-22 retrofit mappings in triage tree + L1 runbook cross-references."
  - "Single-source-of-truth placement for the MAM-WE advisory (D-21) — not duplicated in any runbook footer."
affects: [31-07-retrofit-integration, future-ADDTS-01-mam-documentation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Index-section injection pattern: mirror sibling (macOS) section structure verbatim with platform-specific substitutions"
    - "MAM advisory as sub-H3 under iOS section (scope-exclusion callout tied to a named future milestone)"

key-files:
  created: []
  modified:
    - docs/l2-runbooks/00-index.md

key-decisions:
  - "D-20 injection position: iOS section immediately after macOS ADE Runbooks section (line 97 predecessor), before Related Resources — matches macOS/APv2 pattern of platform-grouped sub-indexes flowing into a shared Related Resources block"
  - "D-21 MAM advisory location: sub-H3 of iOS L2 section in 00-index.md only; not echoed in runbook footers — preserves single source of truth and keeps runbook 14-17 footers focused on their own scope"
  - "L1 Escalation Mapping uses the macOS-style two-column 'L1 Runbook Source | L2 Runbook' header, not the APv1 'Node ID | Scenario | Runbook' style — iOS L1 runbooks do not currently expose escalation node IDs"
  - "L1 18 (Enrollment Restriction Blocking) and L1 19 (License Invalid) lack dedicated L2 runbooks — mapped to the closest combination (14 + 15) with explanatory context in the cell rather than creating stub runbooks"

patterns-established:
  - "Scope-exclusion advisory pattern: '> **{Topic} is out of Phase N scope** -- deferred to **{FUTURE-ID}** future milestone.' — reusable for any future deferred-scope callouts"

requirements-completed: [L2TS-01, L2TS-02]

# Metrics
duration: 12min
completed: 2026-04-17
---

# Phase 31 Plan 06: iOS L2 Runbooks Index Section Summary

**Injected the ## iOS L2 Runbooks navigation hub into 00-index.md, wiring 4 L2 runbooks and 6 L1 sources with a named MAM-WE deferral to ADDTS-01.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-17 (wave 4 spawn)
- **Completed:** 2026-04-17
- **Tasks:** 1/1
- **Files modified:** 1

## Accomplishments

- Added complete iOS L2 section to `docs/l2-runbooks/00-index.md` with 3 required sub-H3s (When to Use, iOS L1 Escalation Mapping, MAM-WE Investigation Advisory) — D-20 satisfied.
- MAM-WE advisory defers to ADDTS-01 future milestone with explicit guidance to escalate selective wipe / PIN loop / app protection / MAM-compliance issues to Microsoft Support — D-21 routing works.
- All 4 L2 runbook files (14-17) referenced in When to Use; all 6 L1 runbooks (16-21) mapped in Escalation table.
- Version History table updated with the 2026-04-17 entry above the existing 2026-04-14 macOS row.
- Existing macOS ADE Runbooks section and Related Resources block structurally preserved (grep confirmed).
- Valid anchor `00-index.md#ios-l2-runbooks` now available for Plan 31-07's D-22 retrofits to triage tree lines 44/94 and the six iOS L1 runbooks.

## Task Commits

Each task was committed atomically:

1. **Task 1: Inject iOS L2 Runbooks section into 00-index.md + update Version History** - `cbcae39` (docs)

## Files Created/Modified

- `docs/l2-runbooks/00-index.md` — injected 34 lines (new iOS L2 section + 1 Version History row); no deletions; macOS section and Related Resources intact. Line count 119 → 152.

## Decisions Made

- **Inserted iOS section between macOS section and Related Resources (D-20).** Matches the sibling-section pattern already used for APv2 and macOS. Related Resources remains the shared footer block for all platforms.
- **Centralized MAM advisory in the index only (D-21).** Keeps per-runbook footers focused on their own scope and gives L2 engineers a single canonical location to find the ADDTS-01 deferral.
- **Mapped L1 18 and L1 19 to 14+15 combos rather than stubbing new runbooks.** The enrollment restriction / license-invalid failure modes surface through artifacts already covered by the iOS Log Collection + ADE Token & Profile Delivery runbooks; creating placeholder runbooks would violate scope and introduce maintenance burden.

## Deviations from Plan

None — plan executed exactly as written. Exact old_string / new_string blocks from `<action>` applied verbatim via two Edit operations (iOS section injection + Version History row).

## TDD Gate Compliance

This plan had `tdd="true"` at the task level. Because the change is a documentation injection whose "tests" are the project's validation harness checks (V-31-18, V-31-19, V-31-20), the RED/GREEN cycle was executed against the harness rather than a unit-test runner:

- **RED:** Before any edit, `node scripts/validation/check-phase-31.mjs --quick` reported V-31-18/19/20 all FAIL (expected).
- **GREEN:** After the two Edits, the same command reported V-31-18/19/20 all PASS.
- **REFACTOR:** No refactor needed — content matches the exact fixture specified in the `<action>` block; any reformatting would diverge from D-20's canonical template.

A single commit (`cbcae39`) captures the GREEN state. The harness-driven TDD cycle is documented here in lieu of separate `test(...)` + `feat(...)` commits because the harness script pre-exists and no new test artifacts were created by this plan.

## Verification

Phase 31 validation harness run (quick mode) — gates owned by this plan:

```
V-31-18: 00-index.md has ## iOS L2 Runbooks heading ..... PASS
V-31-19: iOS L2 section has 3 sub-H3 + correct table row counts PASS
V-31-20: 00-index.md MAM advisory references ADDTS-01 ... PASS
```

Additional acceptance-criteria spot-checks:

- `grep -c "^## macOS ADE Runbooks$" docs/l2-runbooks/00-index.md` → 1 (macOS section preserved)
- `grep -q "2026-04-17 | Added iOS L2 runbook section"` → match (Version History row present)
- `grep -c "^## Related Resources$" docs/l2-runbooks/00-index.md` → 1 (footer still positioned after new section)
- iOS When to Use table: 4 data rows (one per runbook 14/15/16/17)
- iOS L1 Escalation Mapping table: 6 data rows (one per L1 runbook 16/17/18/19/20/21)

Out-of-scope validator failures (V-31-21/22/23/24) are Plan 31-07 retrofit work and were already failing before this plan — they do not regress as a result of this change.

## Known Stubs

None. The MAM-WE Investigation Advisory references ADDTS-01 as a tracked future milestone, not a stub — selective-wipe / PIN-loop / app-protection issues are explicitly routed to Microsoft Support in the interim.

## Threat Flags

None. Scan confirmed this plan introduces no new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. T-31-10 (accidental deletion/reorder of macOS section) was mitigated by using an exact-match 3-line old_string; `git diff --diff-filter=D --name-only HEAD~1 HEAD` returned empty. T-31-11 (ADDTS-01 exposure) is `accept` — ADDTS-01 is a public REQUIREMENTS.md identifier with no sensitive data.

## Self-Check: PASSED

- FOUND: docs/l2-runbooks/00-index.md (modified, 152 lines, iOS L2 section at lines 99-130, Version History row at line 149)
- FOUND: commit cbcae39 in git log (`git log --oneline -5` confirmed)
- FOUND: V-31-18/19/20 PASS in validation harness output
