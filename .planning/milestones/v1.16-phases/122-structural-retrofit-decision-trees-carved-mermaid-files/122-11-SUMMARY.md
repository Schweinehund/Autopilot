---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 11
subsystem: docs-retrofit
tags: [eee-standard, mermaid-conversion, c17-validator, blockquote-remediation, macos-lifecycle]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (mermaid-absence guard, doc_id-idempotency guard, multi-class router, keyless-non-Windows guard, VH auto-fill)
provides:
  - macos-lifecycle/00-ade-lifecycle.md converted (LOCKED-10), enrolled RE-204, Approved
  - macos-lifecycle/01-psso-provisioning-walkthrough.md converted (LOCKED-13), enrolled RE-205, Approved
  - macos-lifecycle/02-mdm-migration-psso.md converted (LOCKED-17), enrolled RE-206, Approved
  - RETRO-07 CLOSED -- all 22 lifecycle files (13 Mermaid-free from Phase 121 + 9 Mermaid-bearing from Phase 122) now C17-green
affects: [123-nav-hub-retrofit, 125-harness-close]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Word-preserving greedy blockquote packer (link/backtick/bold-aware tokenizer, sentence > clause > hard-break preference, paren-depth-aware) -- reusable ad hoc script, not committed to the repo"
    - "Transform B (de-blockquote) selection criterion: apply when a blockquote group carries an embedded table or nested code fence, not just length"

key-files:
  created: []
  modified:
    - docs/macos-lifecycle/00-ade-lifecycle.md
    - docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
    - docs/macos-lifecycle/02-mdm-migration-psso.md
    - docs/_registry/RE-index.md

key-decisions:
  - "All 3 files' LOCKED-N counts (10/13/17) independently re-derived against git show 71be4ab bytes and matched the plan's precomputed values exactly -- no corrections needed"
  - "Fixed a blockquote packer bug mid-task: post-break marker reset needed a tail rescan, not a blind -1 reset, to avoid hard mid-sentence breaks"
  - "Transform B applied to macos/01's 5877c A2 Path section and macos/02's 1480c B2 Requirements Summary section (both carry embedded tables/nested code fences)"

patterns-established:
  - "Pattern: paren-depth-aware clause/sentence boundary detection for blockquote splitting avoids awkward breaks inside parenthetical asides"

requirements-completed: [RETRO-07]

# Metrics
duration: 50min
completed: 2026-07-08
---

# Phase 122 Plan 11: macOS Lifecycle Mermaid Conversion (RE-204/205/206) Summary

**Converted the final 3 macOS-lifecycle Mermaid diagrams to decision tables (S6 merge, psso Branch dual-terminal, B1/B2 dual non-reconverging pipelines) and remediated the corpus's heaviest blockquote burden (21 groups incl. a 5877c and a 1480c block), closing RETRO-07 across all 22 lifecycle files.**

## Performance

- **Duration:** ~50 min
- **Tasks:** 3
- **Files modified:** 4 (3 content files + registry)

## Accomplishments

- `macos-lifecycle/00-ade-lifecycle.md`: Stage-6 User Affinity diamond converted to an ordinal decision table; the S7→Stage-7 / direct Userless→Stage-7 reconvergence preserved as explicit merge-target rows (LOCKED — 10). Enrolled RE-204.
- `macos-lifecycle/01-psso-provisioning-walkthrough.md`: the `Branch` diamond (explicitly named in CONTEXT D-01 riders as "the psso decision node") converted to a decision table with dual non-converging terminals (Stage 8A / Stage 8B, no forced merge, LOCKED — 13). The corpus-max 5877-char A2 Path blockquote (containing an embedded table + nested `bash` code fences) de-blockquoted via Transform B. Enrolled RE-205.
- `macos-lifecycle/02-mdm-migration-psso.md`: the `Gate` diamond converted to a decision table capturing the confirmed dual non-reconverging pipelines (B1 7-stage in-place, B2 5-stage retire/wipe/re-enroll, no merge, LOCKED — 17). All 16 pre-existing over-200-char blockquote groups remediated (15 via word-preserving Transform A, the 1480c B2 Requirements Summary via Transform B). Enrolled RE-206.
- Registry flipped RE-204/205/206 Pending → Approved (existing IDs, no new IDs minted).
- All 9 Mermaid-bearing lifecycle files (this plan's 3 + the 6 from prior 122 plans) confirmed zero remaining `\`\`\`mermaid` fences across `docs/lifecycle*`, `docs/ios-lifecycle`, `docs/macos-lifecycle` — RETRO-07 CLOSED (22/22 lifecycle files C17-green across Phases 121+122).
- Full-corpus C17 run: 225 files checked, 0 violations, exit 0.

## Task Commits

1. **Task 1: Convert + enroll macos-lifecycle/00-ade-lifecycle.md (RE-204)** - `657a980` (feat)
2. **Task 2: Convert + enroll macos-lifecycle/01-psso-provisioning-walkthrough.md (RE-205)** - `8f73bfe` (feat)
3. **Task 3: Convert + enroll macos-lifecycle/02-mdm-migration-psso.md (RE-206); registry flip** - `14271fc` (feat)

## Files Created/Modified

- `docs/macos-lifecycle/00-ade-lifecycle.md` - Mermaid→table conversion (LOCKED-10), 1 blockquote split, RE-204 enrolled
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` - Mermaid→table conversion (LOCKED-13), 4 blockquote groups remediated (3 Transform A + 1 Transform B), RE-205 enrolled
- `docs/macos-lifecycle/02-mdm-migration-psso.md` - Mermaid→table conversion (LOCKED-17), 16 blockquote groups remediated (15 Transform A + 1 Transform B), RE-206 enrolled
- `docs/_registry/RE-index.md` - RE-204/205/206 flipped Pending → Approved

## Decisions Made

- Independently re-derived all 3 files' LOCKED-N element counts (8 nodes + 2 labeled edges = 10; 11 nodes + 2 labeled edges = 13; 15 nodes + 2 labeled edges = 17) against `git show 71be4ab` bytes before converting — all three matched the plan's precomputed values exactly, unlike several earlier 122 plans (122-02, 122-06, 122-07, 122-08, 122-10) which each caught a planning-input off-by-one or missed diamond. No corrections needed this plan.
- Selected Transform B (de-blockquote, not word-split) for the two largest blockquote groups (macos/01's 5877c A2 Path section, macos/02's 1480c B2 Requirements Summary) because both carry embedded Markdown tables and, in macos/01's case, nested ` ```bash ` code fences — structure that a word-preserving split would fragment or corrupt.
- Built an ad hoc word-preserving greedy blockquote packer (link/backtick/bold-span-aware tokenizer, sentence-boundary preferred, then clause-boundary at commas/semicolons/em-dashes with paren-depth tracking to avoid breaking inside parenthetical asides, then hard word-boundary fallback) for the 15 Transform-A splits across the 3 files.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Blockquote packer post-break marker tracking bug**
- **Found during:** Task 2 (splitting macos/01's line-61 blockquote)
- **Issue:** After the packer's first sentence-boundary break, internal clause/sentence markers that already existed *within* the retained tail (e.g., a comma right after a closing parenthesis) were being reset to `-1` instead of rescanned against the new (post-split) array indexing. This caused the second chunk to hard-break mid-sentence at exactly the 200-char limit instead of at the nearby comma.
- **Fix:** Added a rescan of the tail array for the nearest sentence/clause marker immediately after every break, rather than blindly resetting to `-1`.
- **Files modified:** none in the repo (the packer is a throwaway script in the session scratchpad, not committed) — the bug only affected in-session chunk generation, verified correct before any Edit was applied to the real files.
- **Verification:** Re-ran the packer on the affected text and confirmed clean sentence/clause-boundary splits; manually verified every subsequent chunk length ≤ 200 chars before writing.

**2. [Rule 1 - Bug] One combined Transform-A chunk exceeded 200 chars**
- **Found during:** Task 3 (splitting macos/02's `sudo profiles renew` blockquote, line 486)
- **Issue:** While applying the packer's suggested chunks, one edit combined two adjacent chunks (the packer's chunk 2 and chunk 3) into a single paragraph, which measured 223 chars — over the C17 #12 limit.
- **Fix:** Split the combined paragraph back into two blockquote paragraphs at the packer's original em-dash boundary.
- **Files modified:** `docs/macos-lifecycle/02-mdm-migration-psso.md` (fixed before any commit — not a separate commit)
- **Verification:** Full-file blockquote-group rescan confirmed 0 groups over 200 chars before the fork ran; C17 exits 0.

**3. [Rule 1 - Bug] Bare `>` continuation lines don't break a blockquote group**
- Applied the pre-established Phase-122 lesson (STATE.md: "Bare '>' lines do NOT break a C17 assertion #12 blockquote group") immediately on the first split (macos/00 line 9) — caught before committing, not after.

---

**Total deviations:** 3 auto-fixed (all Rule 1 bugs caught and corrected in-session before any commit; none reached a committed state)
**Impact on plan:** All auto-fixes were self-corrections during blockquote-splitting mechanics, verified via full-file re-scans before every commit. No scope creep; no content or word loss.

## Issues Encountered

None beyond the deviations above, all resolved inline before committing.

## Next Phase Readiness

- RETRO-07 is now fully CLOSED (22/22 lifecycle files C17-green across Phases 121+122) — no lifecycle-directory work remains for this milestone.
- RETRO-05 (11 decision-trees) and RETRO-08 (10 carved-mermaid files) were already closed by prior 122 plans (122-01 through 122-10); this plan's completion means Phase 122's entire 30-file Mermaid-conversion roster (11 + 10 + 9) is now done — all `docs/` Mermaid fences resolved to text-equivalent conversions per STD-04.
- Registry now shows 0 remaining `Pending` rows corpus-wide (217 Approved) — Phase 122's registry mechanics are fully reconciled.
- Ready for Phase 123 (nav-hub retrofit, navigation-last) once the plan-level verification for Phase 122 confirms closure; no blockers identified.

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*

## Self-Check: PASSED

- FOUND: docs/macos-lifecycle/00-ade-lifecycle.md
- FOUND: docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
- FOUND: docs/macos-lifecycle/02-mdm-migration-psso.md
- FOUND: 657a980 (Task 1 commit)
- FOUND: 8f73bfe (Task 2 commit)
- FOUND: 14271fc (Task 3 commit)
