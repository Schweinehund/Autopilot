---
phase: 58-defer-08-4-platform-capability-comparison
plan: 58-01
subsystem: docs
tags: [anchor-inventory, pitfall-6, pitfall-15, append-only, cross-doc-links, gfm-slug, capability-matrix]

# Dependency graph
requires:
  - phase: 57-defer-07-android-nav-unification
    provides: "57-ANCHOR-INVENTORY.md format template (D-32 step 5 pre-edit anchor inventory pattern)"
  - phase: 50-linux-platform-overview
    provides: "linux-capability-matrix.md (6 H2 source — including Conditional Access at line 59)"
  - phase: 45
    provides: "android-capability-matrix.md anchor preservation precedent (#deferred-full-aosp-capability-mapping at line 124)"
provides:
  - "58-ANCHOR-INVENTORY.md: pre-edit anchor baseline artifact (24 pre-retrofit + 3 post-retrofit expected + 2 compat shim anchors)"
  - "Pre-edit baseline HEAD 22161b9b captured for VERIFICATION.md cross-check at Phase 58 close"
  - "30-cell comparison-doc target mapping (5 platform cols × 6 H2 rows) for Plan 58-03 consumption"
  - "Inbound-reference grep baselines: 4-platform-capability-comparison.md (2 hits) + #deferred-4-platform-unified-capability-comparison (2 hits)"
  - "Wave 1 gate satisfied: Plan 58-02 may now begin CA H2 retrofit edits per D-15 ordering invariant"
affects: [58-02, 58-03, 58-04, 58-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pre-edit anchor inventory artifact-first discipline (Phase 57 D-32 step 5 inheritance)"
    - "GFM H2 slug determinism audit (PITFALL-15 mitigation)"
    - "Anchor-preservation-when-body-retargeted (Phase 45 AEAOSPFULL-09 precedent applied to D-14 F3)"

key-files:
  created:
    - ".planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md"
  modified: []

key-decisions:
  - "Captured pre-edit baseline HEAD as 22161b9b5f13436bc2d68bb52822037720c7096d for auditable Phase 58 cross-check"
  - "Documented 1-line offset between PLAN.md prose (cited line 82) and live grep (line 83) for the Android matrix #deferred-4-platform-unified-capability-comparison reference; non-blocking — anchor literal is identical, both lines resolve to the same target at line 132"
  - "Adopted 25 H2-line post-Phase-58 expectation (NOT 24 or 27) as the post-retrofit grep verification target: 5 H2s × 4 matrices + Linux CA + Linux + Android Cross-Platform Equivalences + 3 retrofitted CA H2s"
  - "30-cell comparison-doc target table includes ⚠️ POST-58-02 markers on 3 #conditional-access cells in macOS/iOS/Android columns — explicit Wave 2 dependency notation"
  - "24 unique link target slugs across the 30-cell mapping (Windows + Linux columns share targets per D-08 Windows-source decision)"

patterns-established:
  - "Pre-edit anchor inventory format inheritance: Phase 57 → Phase 58 (frontmatter block → grep-output sections → comparison-doc target mapping → summary counts)"
  - "Verbatim grep-output capture (NOT paraphrased) inside fenced code blocks for VERIFICATION.md byte-cross-check"
  - "POST-58-02 marker convention for forward-referencing anchors that depend on Wave 2 retrofit landing"

requirements-completed: [CLEAN-05]

# Metrics
duration: 8min
completed: 2026-05-01
---

# Phase 58 Plan 01: Pre-Edit Anchor Inventory Baseline Summary

**Pre-edit anchor inventory captures 24 pre-retrofit + 3 expected post-retrofit + 2 compat shim anchors across 4 capability matrices; PITFALL-6 / PITFALL-15 baseline locked at HEAD 22161b9b for Phase 58 close cross-check.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-01T04:39:55Z
- **Completed:** 2026-05-01T04:48:00Z (approx)
- **Tasks:** 1 / 1
- **Files modified:** 1 created (no edits to source matrices — artifact-only plan per D-15)

## Accomplishments

- `58-ANCHOR-INVENTORY.md` created with pre-edit baseline HEAD `22161b9b5f13436bc2d68bb52822037720c7096d`
- 24 pre-retrofit anchor literals tabulated (Linux 7 H2s + macOS 5 + iOS 5 + Android 6 H2s + 2 Android `<a id>` compat shims)
- 3 EXPECTED POST-58-02 `#conditional-access` anchors documented for macOS/iOS/Android matrices (D-04 retrofit)
- 30-cell comparison-doc target mapping authored (5 platform cols × 6 H2 rows = 30 cell positions; 24 unique slugs because Windows + Linux columns share targets per D-08)
- Both Android compat shim anchors (`#deferred-full-aosp-capability-mapping` line 124, `#deferred-4-platform-unified-capability-comparison` line 132) verified PRESENT and added to preservation table
- Inbound-reference grep baselines captured: filename references = 2, anchor references = 2
- Wave 2 gate satisfied: Plan 58-02 may now begin CA H2 retrofit edits

## Task Commits

Each task was committed atomically:

1. **Task 1: Capture pre-edit anchor inventory (D-15 + PITFALL-6 + Phase 57 D-32 step 5 inheritance)** — `16b98ad` (docs)

**Plan metadata:** to be added in this commit (final SUMMARY landing)

## Files Created/Modified

- `.planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md` — pre-edit anchor baseline artifact; 178 lines; mirrors `57-ANCHOR-INVENTORY.md` format (front-matter block → grep-output sections → comparison-doc target table → summary counts)

## Decisions Made

- **Captured baseline HEAD = `22161b9b5f13436bc2d68bb52822037720c7096d`** (the immediately-prior commit `docs(58): record phase 58 planning completion`). This is the auditable pre-edit reference point; VERIFICATION.md at Phase 58 close re-runs the grep commands and cross-checks against this baseline.
- **Adopted 25 H2-line post-Phase-58 expectation** (not 24 or 27): 5 H2s × 4 matrices = 20, plus Linux CA (existing) = 21, plus Linux Cross-Platform Equivalences (existing) = 22, plus Android Cross-Platform Equivalences (existing) = 23, plus 3 retrofitted CA H2s in macOS/iOS/Android = 25.
- **24 unique anchor slugs in the 30-cell comparison-doc mapping** because Windows column collapses to Linux column targets per D-08 (Windows-source decision: `linux-capability-matrix.md` is the canonical Win-bilateral source until v1.6+ ships `windows-capability-matrix.md`).
- **Documented 1-line offset between PLAN.md and live grep** for the Android footer inbound reference (PLAN.md cited line 82; live grep returned line 83). The anchor literal is byte-identical; the offset has zero impact on PITFALL-6 / PITFALL-15 invariants. The verbatim grep output in the inventory is authoritative.

## Deviations from Plan

**None — plan executed exactly as written.** The single PLAN.md task captured all required grep outputs verbatim, the artifact mirrors the Phase 57 D-32 inventory format, and the automated `node` verification check confirmed all 19 required literals present. The 1-line offset note above is documentation transparency, NOT a deviation — the PLAN.md `must_haves.truths` text was a research-document artifact (line 82 vs grep-actual line 83); the inventory captures the authoritative grep output.

## Issues Encountered

None. The 4 grep commands completed cleanly:
- H2-pattern grep returned 28 matches across 4 matrices (matches expected = 28: 5 + 6 + 5 + 6 + 1 Linux CA + 1 Linux Cross-Platform + 1 Android Cross-Platform + 4 Key Gaps Summary).
- Android `<a id>` grep returned 3 matches at lines 117 / 124 / 132 (all 3 PRESERVED by Phase 58 — only line 132 is touched by D-14 F3 body-retarget; line 124 Phase 45 precedent is read-only).
- Filename grep returned 2 matches in Linux matrix (lines 70 + 112 with `(when shipped)` hedge).
- Anchor grep returned 2 matches in Android matrix (lines 83 + 132).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 58-02 unblocked:** Wave 2 CA H2 retrofit may begin. Plan 58-02 will insert `## Conditional Access` H2 into macOS / iOS / Android matrices, parallel to Linux matrix line 59 placement.
- **Plan 58-03 prepared:** the 30-cell comparison-doc target mapping in §"Comparison-doc cell→anchor target mapping" provides the link-target table that Plan 58-03 consumes when authoring `4-platform-capability-comparison.md`.
- **Plan 58-04 prepared:** the inbound-reference baselines lock the pre-edit state for the Linux hedge removal (lines 70 + 112) and Android footer F3 anchor preservation (line 132).
- **Plan 58-07 (VERIFICATION.md) prepared:** the §"Post-retrofit verification command" + §"Summary Counts" tables provide the exact grep commands and expected post-Phase-58 outputs for VERIFICATION.md cross-check.

**Note for downstream plans:** Plan 58-01 captured pre-edit anchor baseline (PITFALL-6 + D-15); subsequent plans 58-02..58-06 may now edit sibling matrices and validator; post-edit re-grep at Phase 58 close (Plan 58-07) cross-checks against this baseline.

## Self-Check

**Verifying file existence:**

```bash
$ [ -f ".planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md" ] && echo "FOUND" || echo "MISSING"
FOUND
```

**Verifying commit existence:**

```bash
$ git log --oneline --all | grep -q "16b98ad" && echo "FOUND: 16b98ad" || echo "MISSING"
FOUND: 16b98ad
```

**Verifying source matrices were inspected:**

- linux-capability-matrix.md (lines 1-115 read; 7 H2s confirmed at lines 15 / 24 / 33 / 42 / 51 / 59 / 68)
- macos-capability-matrix.md (lines 1-90 read; 5 H2s + Key Gaps confirmed at lines 13 / 28 / 42 / 56 / 68 / 78; CA H2 ABSENT pre-retrofit)
- ios-capability-matrix.md (lines 1-100 read; 5 H2s + Key Gaps confirmed at lines 13 / 30 / 44 / 57 / 70 / 80; CA H2 ABSENT pre-retrofit)
- android-capability-matrix.md (lines 1-150 read; 6 H2s + Key Gaps confirmed at lines 14 / 31 / 44 / 56 / 67 / 76 / 94; CA H2 ABSENT pre-retrofit; both `<a id>` compat shims confirmed at lines 124 + 132)

**Verifying GFM slug determinism (PITFALL-15):**

All 6 H2 anchor slugs (`#enrollment` / `#configuration` / `#app-deployment` / `#compliance` / `#software-updates` / `#conditional-access`) plus `#cross-platform-equivalences` derived deterministically per RESEARCH §GFM H2 Anchor Slug Audit table (HIGH stability — lowercase ASCII, deterministic space→hyphen).

**Verifying no edits to source matrices (artifact-only plan):**

```bash
$ git diff HEAD~1 HEAD --stat
 .planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md | 178 ++++++++++++
 1 file changed, 178 insertions(+)
```

Single new file. Zero edits to `docs/reference/*.md`. Plan 58-01 is artifact-only per the plan contract.

**Self-Check: PASSED**

---
*Phase: 58-defer-08-4-platform-capability-comparison*
*Completed: 2026-05-01*
