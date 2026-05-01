---
phase: 58-defer-08-4-platform-capability-comparison
plan: 58-06
subsystem: validation
tags: [validation, audit-harness, c12, audit-04, clean-05, link-not-copy, pitfall-7]

requires:
  - phase: 58
    provides: "Plan 58-03 deliverable docs/reference/4-platform-capability-comparison.md (file-existence pre-gate satisfied) + Plan 58-05 V-58-25 mirror assertion"
provides:
  - "C12 (4-platform comparison structural validation) promoted from informational → blocking in scripts/validation/v1.5-milestone-audit.mjs (AUDIT-04 contract honored)"
  - "C12 link-not-copy verifier col-0 cell-shape exclusion fix (mirrors check-phase-58.mjs V-58-07 extractCanonicalDataCells() logic; suppresses 90 false-positive col-0 row-label failures)"
  - "Plan 58-07 close-gate unblocked: full 26/26 V-58-NN PASS achieved post-patch"
affects: [58-07, 60, 61]

tech-stack:
  added: []
  patterns:
    - "C12 promotion gate (informational → blocking) lands at Phase 58 close per CONTEXT D-17 + D-18 routing override (NOT Phase 60)"
    - "Validator-symmetric extraction logic — C12 (harness) and V-58-07 (Phase 58 validator) share identical canonical-6-col-table cell-extraction semantics post-Plan-58-06"

key-files:
  created:
    - ".planning/phases/58-defer-08-4-platform-capability-comparison/58-06-SUMMARY.md"
  modified:
    - "scripts/validation/v1.5-milestone-audit.mjs (C12 entry: informational flag removed; col-0 exclusion fix applied; success detail string updated; comment block updated to document promotion + Rule 1 deviation)"

key-decisions:
  - "Applied Plan 58-06 Rule 1 deviation: col-0 (Feature-name row label) exclusion in C12 verifier — explicitly handed off from Plan 58-05 (check-phase-58.mjs:56 comment), required for harness exit 0 with C12 PASS in blocking mode (the plan's own success criterion)"
  - "Optional polish applied: success detail string '(informational)' → '5 platform columns + all data cells link-bearing' for clearer post-promotion semantics"
  - "Comment block in C12 entry updated from INFORMATIONAL-FIRST framing to PROMOTED TO BLOCKING framing for forensic clarity (PLAN-recommended)"

patterns-established:
  - "C12 ↔ V-58-07 extractor parity: both restrict to canonical 6-col tables (Feature + 5 platforms) and skip col-0 row-label cells per D-01 cell-shape contract"
  - "Plan-author byte-strict 'preserve run() body' rule yields to plan-author 'harness exits 0' verification rule when contradiction surfaces; documented as Rule 1 deviation"

requirements-completed: [CLEAN-05]

duration: 2min
completed: 2026-05-01
---

# Phase 58 Plan 58-06: DEFER-08 4-Platform Capability Comparison — C12 Promotion Summary

**C12 promoted from informational → blocking via single-line removal of `informational: true` flag at v1.5-milestone-audit.mjs:508 + Rule 1 col-0 cell-shape fix to C12 verifier; V-58-25 in check-phase-58.mjs flips FAIL → PASS; full 26/26 V-58-NN PASS achieved; harness exit 0 with C12 PASS in blocking mode; AUDIT-04 contract honored at Phase 58 close per D-17 routing override**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-05-01T05:28:37Z
- **Completed:** 2026-05-01T05:30:47Z
- **Tasks:** 1
- **Files modified:** 1
- **Commits:** 1 atomic

## Accomplishments

- **AUDIT-04 promotion gate landed:** `informational: true` flag removed from C12 entry in `scripts/validation/v1.5-milestone-audit.mjs` (line 508 pre-patch). C12 now reports blocking PASS/FAIL based on the comparison-doc structural validation logic.
- **Pre-flight gate confirmed:** `docs/reference/4-platform-capability-comparison.md` exists from Plan 58-03 (commits `0a55ecd` + `629d7fc` + `8e888af`); without this file, C12 in blocking mode would FAIL the file-existence pre-gate.
- **C12 link-not-copy verifier col-0 exclusion fix applied** (Rule 1 deviation): pre-patch C12 incorrectly counted col-0 (Feature-name row labels) as missing-hyperlink data cells, producing 90 false-positive failures. Post-fix, C12 restricts the link-not-copy scan to canonical 6-col tables (Feature + 5 platforms) and only validates cols 1-5 (data cells). This mirrors the parallel logic in `check-phase-58.mjs:57-75` `extractCanonicalDataCells()` per the explicit handoff comment at `check-phase-58.mjs:56` and Plan 58-05 SUMMARY note.
- **V-58-25 promotion gate flipped FAIL → PASS:** Plan 58-05's V-58-25 forward-search assertion (which scans the first 800 chars after the C12 name literal for `informational: true`) now reports PASS post-patch.
- **Comment block updated** to document the promotion (INFORMATIONAL-FIRST → PROMOTED TO BLOCKING) and the Rule 1 deviation (col-0 exclusion logic) for forensic clarity.
- **Optional polish applied:** post-promotion success detail string updated from `(informational)` to `5 platform columns + all data cells link-bearing`.

## Task Commits

1. **Task 1: Remove `informational: true` flag at line 508 of v1.5-milestone-audit.mjs (C12 promotion) + Rule 1 col-0 cell-shape fix** — `bc9cee6` (feat)

**No metadata commit:** STATE.md / ROADMAP.md / REQUIREMENTS.md updates landed via state SDK handlers (separate process per execute-plan workflow).

## Files Created/Modified

- `scripts/validation/v1.5-milestone-audit.mjs` — C12 entry block (lines ~505-549 post-patch):
  - REMOVED line 508 `informational: true,` (the contract patch per Plan 58-06)
  - REPLACED 3-line comment block with 6-line comment documenting promotion + Rule 1 deviation
  - REPLACED single-loop cell scan with canonical-6-col table guard + col-0 exclusion logic
  - UPDATED success detail string `(informational)` → `5 platform columns + all data cells link-bearing`
  - PRESERVED byte-identical: `id: 12,` literal, `name: 'C12: 4-platform comparison structural validation',` literal, file-existence pre-gate (informational PASS when file absent), platform-column missing check, em-dash + `N/A` skip pattern, regex `/\[.+\]\(.+\)/`
  - All other check entries (C1..C11, C13) UNTOUCHED

## Pre/Post Patch Diff Snippet

```diff
   {
     id: 12,
     name: 'C12: 4-platform comparison structural validation',
-    informational: true,
-    // AUDIT-04: INFORMATIONAL-FIRST. File-existence pre-gate. Promotes to blocking once
-    // docs/reference/4-platform-capability-comparison.md exists (Phase 58+).
-    // Link-not-copy: every non-empty data cell must contain a markdown hyperlink.
+    // AUDIT-04: PROMOTED TO BLOCKING at Phase 58 close (informational flag removed per Plan 58-06).
+    // File-existence pre-gate retained at lines below — informational PASS when file absent (Phase 48-57);
+    // BLOCKING when file exists (Phase 58+).
+    // Link-not-copy: every non-empty data cell (cols 1-5 of canonical 6-col tables) must contain a markdown hyperlink.
+    // Plan 58-06 Rule 1 deviation: col-0 (Feature-name row label) excluded from link-bearing requirement
+    // per D-01 cell-shape contract — mirrors check-phase-58.mjs V-58-07 extractCanonicalDataCells() logic.
     run() {
       const targetFile = 'docs/reference/4-platform-capability-comparison.md';
       ...
-      // Link-not-copy check: table rows with non-empty cells must contain [text](link)
+      // Link-not-copy check: table rows with non-empty data cells (cols 1-5) must contain [text](link).
+      // Restrict to canonical 6-col tables (Feature + 5 platforms) and exclude col-0 (Feature-name row label).
       const tableLines = content.split('\n').filter(l => /^\|/.test(l) && !/^\|[-: ]+\|/.test(l));
       const emptyCells = [];
       for (const line of tableLines) {
         const cells = line.split('|').slice(1, -1);
-        for (const cell of cells) {
-          const trimmed = cell.trim();
+        // Only canonical 6-col tables (Feature + 5 platforms); skip ancillary 3-col tables (Version History) etc.
+        if (cells.length !== 6) continue;
+        // Skip the header row itself
+        if (cells[0].trim() === 'Feature') continue;
+        // Check cols 1-5 only (data cells); col-0 is the row-label / Feature-name (intentionally not link-bearing)
+        for (let i = 1; i < 6; i++) {
+          const trimmed = cells[i].trim();
           if (trimmed && trimmed !== '—' && trimmed !== 'N/A' && !/\[.+\]\(.+\)/.test(trimmed)) {
             emptyCells.push(trimmed.slice(0, 40));
           }
         }
       }
       ...
-      return { pass: true, detail: '(informational)' };
+      return { pass: true, detail: '5 platform columns + all data cells link-bearing' };
     }
   },
```

(Diff: 1 file changed, 16 insertions, 8 deletions.)

## Pre/Post Patch Verification Output

### Pre-patch baseline (taken pre-Edit):

```
$ node scripts/validation/v1.5-milestone-audit.mjs
[12/12] C12: 4-platform comparison structural validation FAIL -- 90 cell(s) missing hyperlinks (link-not-copy violation)
Summary: 10 passed, 2 failed, 0 skipped
Exit: 0  (informational FAIL does not gate exit code; C12 still informational at this point)

$ node scripts/validation/check-phase-58.mjs
[25/26] V-58-25: ... C12 promoted from informational to blocking (Plan 58-06 deliverable) FAIL
        -- C12 still has 'informational: true' within first 800 chars after name (Plan 58-06 promotion patch not yet landed — expected pre-58-06)
Summary: 25 passed, 1 failed, 0 skipped
```

### Post-patch (commit bc9cee6):

```
$ node scripts/validation/v1.5-milestone-audit.mjs
[12/12] C12: 4-platform comparison structural validation PASS
Summary: 11 passed, 1 failed, 0 skipped
Exit: 0  (only blocking failure is C2 supervised — pre-existing, out of Plan 58-06 scope)

$ node scripts/validation/check-phase-58.mjs
[25/26] V-58-25: ... C12 promoted from informational to blocking (Plan 58-06 deliverable) PASS
        (C12 promoted to blocking (informational flag removed per AUDIT-04))
Summary: 26 passed, 0 failed, 0 skipped
Exit: 0
```

## Plan-level Verification Steps

1. **Plan automated check 1 (informational flag absence near C12):** `node -e "..."` PASS — "C12 informational flag removed; promotion patch landed."
2. **Plan automated check 2 (harness reports C12 PASS):** harness exit 0 with C12 PASS confirmed in blocking mode (no longer carries `(informational)` detail).
3. **V-58-25 PASS in check-phase-58.mjs:** confirmed post-patch.
4. **C12 entry id/name literals UNCHANGED:** verified — V-58-25 forward-search successfully locates the entry; the literals `id: 12,` and `name: 'C12: 4-platform comparison structural validation',` are byte-identical pre/post.
5. **All other check entries UNTOUCHED:** diff confirms only the C12 entry block (lines 505-549) was modified.

## Decisions Made

- **Applied Plan 58-06 Rule 1 deviation (col-0 exclusion fix in C12 verifier):** required because the plan's `<verify><automated>` clause #2 ("harness reports C12 PASS post-promotion") directly contradicts the plan's strict-rule #2 ("DO NOT touch the run() body"). The pre-existing C12 cell-shape bug (col-0 row-label cells were being counted as missing-hyperlink data cells) was explicitly handed off from Plan 58-05 to Plan 58-06 via the comment at `check-phase-58.mjs:56` ("Plan 58-06 will land an equivalent col-0 exclusion fix in the C12 promotion patch."). Without this fix, C12 reports false-positive FAIL with 90 cells flagged, blocking the harness exit 0 success criterion.
- **Optional comment block update applied:** PLAN-recommended polish for forensic clarity, preserving INFORMATIONAL-FIRST history while marking the promotion event.
- **Optional success-detail polish applied:** `(informational)` → `5 platform columns + all data cells link-bearing` per PLAN's optional polish recommendation.
- **Pre-flight gate verified BEFORE Edit:** confirmed `docs/reference/4-platform-capability-comparison.md` exists (Plan 58-03 deliverable, 22295 bytes) — without this file, C12 in blocking mode would FAIL the pre-gate.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Col-0 cell-shape exclusion fix in C12 link-not-copy verifier**
- **Found during:** Task 1 (pre-Edit baseline harness run)
- **Issue:** Pre-patch C12 verifier scanned ALL non-empty cells (cols 0-5) for link-bearing content, but col-0 (Feature-name row labels per D-01 cell-shape contract) is intentionally not link-bearing. Running the harness pre-patch produced `C12: ... FAIL -- 90 cell(s) missing hyperlinks`. Post-promotion (`informational: true` removed) without the col-0 fix, the harness would still report C12 FAIL — directly contradicting Plan 58-06's `<verify><automated>` requirement that "harness reports C12 PASS post-promotion".
- **Fix:** Applied the col-0 exclusion fix to mirror `check-phase-58.mjs:57-75` `extractCanonicalDataCells()`:
  - Restrict scan to canonical 6-col tables (skip 3-col Version History tables, etc.)
  - Skip header row (col-0 == 'Feature')
  - Iterate cols 1-5 only (data cells); col-0 is row-label, intentionally not link-bearing
- **Files modified:** `scripts/validation/v1.5-milestone-audit.mjs` (C12 verifier `run()` body)
- **Verification:** post-patch `node scripts/validation/v1.5-milestone-audit.mjs` reports C12 PASS in blocking mode with detail "5 platform columns + all data cells link-bearing"; harness exits 0 (C12 no longer false-positive FAIL).
- **Committed in:** `bc9cee6` (Task 1 commit)
- **Authority for fix:** explicit handoff comment at `check-phase-58.mjs:56` ("Plan 58-06 will land an equivalent col-0 exclusion fix in the C12 promotion patch.") + Plan 58-05 SUMMARY note in STATE.md ("Rule 1 extractCanonicalDataCells() col-0 exclusion fix (suppresses 47 false positives; matches Plan 58-03 240-cell figure)").

**2. [Optional polish per PLAN — not a deviation, applied per plan-author authorization] Success-detail string clarification**
- **PLAN authorization:** "Optional polish (non-required): the line 540 detail string `return { pass: true, detail: '(informational)' };` may be updated to `return { pass: true, detail: '5 platform columns + all cells link-bearing' };` for clearer post-promotion success-path semantics."
- **Applied:** `(informational)` → `5 platform columns + all data cells link-bearing` (slight wording tweak: added "data" for accuracy because col-0 is excluded).
- **Files modified:** `scripts/validation/v1.5-milestone-audit.mjs` (C12 success return statement)
- **Committed in:** `bc9cee6` (Task 1 commit)

**3. [Optional comment-block update per PLAN — not a deviation, applied per plan-author guidance] Comment block reframed**
- **PLAN guidance:** "(The comment block is updated to reflect the post-promotion state. The original 3-line comment is replaced with a 4-line comment that documents the promotion. This is optional but recommended for forensic clarity.)"
- **Applied:** Replaced 3-line INFORMATIONAL-FIRST comment with 6-line comment documenting (a) the promotion, (b) the file-existence pre-gate behavior preserved, and (c) the Rule 1 col-0 deviation rationale.
- **Files modified:** `scripts/validation/v1.5-milestone-audit.mjs` (C12 comment block)
- **Committed in:** `bc9cee6` (Task 1 commit)

---

**Total deviations:** 1 Rule 1 auto-fix (col-0 cell-shape exclusion bug) + 2 PLAN-authorized optional polish items.
**Impact on plan:** The Rule 1 col-0 fix is essential for harness correctness post-promotion; without it, the harness would report false-positive C12 FAIL with 90 flagged col-0 cells, breaking Plan 58-06's own `<verify><automated>` contract. The fix is byte-identical to the parallel logic in `check-phase-58.mjs:57-75` (Plan 58-05 deliverable) per the explicit handoff comment. No scope creep.

## Issues Encountered

- **Pre-existing C2 supervised reference failure** (NOT caused by Plan 58-06): the harness baseline (pre-patch) and post-patch both report `C2: ... FAIL -- 12 un-exempted supervision reference(s)` in `docs/reference/android-capability-matrix.md`. This is a pre-existing failure carried over from prior phases (likely Plan 58-02 CA H2 retrofit which added "Supervision" / "supervised" tokens to the new Conditional Access content). Per executor scope-boundary rule, this is OUT OF Plan 58-06 SCOPE. Logged here for downstream attention; does NOT affect Plan 58-06's success criteria (which scope to C12 + V-58-25 only). The harness still exits 0 post-patch.

## Out-of-band carry-over

- **C2 supervised-reference FAIL on android-capability-matrix.md:90-91** — pre-existing; Plan 58-02 may have introduced the literal "supervised" / "Supervision" tokens during CA H2 retrofit; warrants Plan 58-07 close-gate evaluation to determine if these are intentional doctrine references (e.g., per-platform CA scope variance content) or require sweeping in C2 allowlist updates.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 58-07 unblocked:** close-gate plan can proceed with the assurance that:
  - C12 in blocking mode reports PASS (harness exit 0 modulo the pre-existing C2 supervised issue)
  - All 26/26 V-58-NN PASS in check-phase-58.mjs
  - AUDIT-04 promotion gate landed on the correct schedule per D-17 + D-18 routing override
- **Phase 60 still owns C12 structural-scope EXPANSION** per ROADMAP:382-383; Plan 58-06 covered only the informational → blocking flag removal (a separate edit Phase 58 explicitly does NOT touch the regex scope per D-17).
- **CLEAN-05 covered:** Plan 58-06 closes the AUDIT-04 sub-deliverable (informational → blocking promotion) for CLEAN-05 traceability lineage.
- **Pre-existing C2 issue carried to Plan 58-07** for scope evaluation: not a Plan 58-06 regression.

## Self-Check: PASSED

- Created file `D:/claude/Autopilot/.planning/phases/58-defer-08-4-platform-capability-comparison/58-06-SUMMARY.md` — verified to exist post-Write
- Modified file `scripts/validation/v1.5-milestone-audit.mjs` — verified to exist (was already tracked)
- Commit `bc9cee6` — verified to exist via `git rev-parse --short HEAD`
- Harness exit 0 with C12 PASS — verified
- check-phase-58.mjs 26/26 PASS — verified
- V-58-25 PASS — verified
- No unintended deletions — verified via `git diff --diff-filter=D HEAD~1 HEAD`

---
*Phase: 58-defer-08-4-platform-capability-comparison*
*Plan: 58-06*
*Completed: 2026-05-01*
