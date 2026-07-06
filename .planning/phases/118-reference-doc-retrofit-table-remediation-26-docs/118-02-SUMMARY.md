---
phase: 118-reference-doc-retrofit-table-remediation-26-docs
plan: 02
subsystem: docs-content
tags: [eee-retrofit, c17, docid-registry, capability-matrix, table-remediation, markdown]

# Dependency graph
requires:
  - phase: 118-01
    provides: scripts/pipeline/retrofit-reference.mjs (mechanical helper, VH column-shape detection, 2-dir + 2-bare-file path allowlist)
  - phase: 115-c17-harness-check-validator-atom
    provides: c17-eee-contract.mjs (the immutable gate this plan's output must satisfy)
provides:
  - 9 EEE-conformant capability-matrix/comparison reference docs (RE-142/143/144/145/156/158/159/177/178)
  - D-118-1 per-table prose (before-lead-in + after Table-summary blockquote) on all 45 in-scope tables
  - Word-preserving #12 fix pattern for this batch's 2 pre-existing over-limit blockquote groups
affects: [118-03, 118-04, 118-05, 119]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Per-table prose placement: one-line lead-in immediately before a table + `> **Table summary:**` blockquote immediately after, restating existing scope only (D-118-1 reformat envelope)"
    - "Legacy dangling changelog tables (pre-existing, no H2 heading) treated as an 8th/3rd in-scope table for D-118-1 prose parity with the plan's must_haves table counts, rather than silently restructured"

key-files:
  created: []
  modified:
    - docs/reference/00-index.md
    - docs/reference/4-platform-capability-comparison.md
    - docs/reference/android-capability-matrix.md
    - docs/reference/aosp-oem-matrix.md
    - docs/reference/ios-capability-matrix.md
    - docs/reference/linux-capability-matrix.md
    - docs/reference/macos-capability-matrix.md
    - docs/apv1-vs-apv2.md
    - docs/windows-vs-macos.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Filled Version-History row dates with the actual commit date (2026-07-06) rather than leaving the YYYY-MM-DD placeholder"
  - "Kept every newly-authored Table-summary blockquote under 200 chars from the start (rewrote 2 android-capability-matrix.md summaries and 1 apv1-vs-apv2.md summary that initially exceeded the limit) to avoid manufacturing new C17 #12 violations ahead of Task 3's cleanup pass"
  - "Treated the 2 pre-existing dangling legacy changelog tables (macos-capability-matrix.md, windows-vs-macos.md -- content that predates the ## Version History heading convention) as in-scope D-118-1 tables rather than silently merging/restructuring them, matching the plan's must_haves table counts (macos=8, windows-vs-macos=3) without an architectural change"
  - "Applied Transform A (word-preserving sentence split via a truly-empty line, not a bare '>' line) to both pre-existing #12 over-limit groups (aosp-oem-matrix.md 286c, windows-vs-macos.md 230c) -- confirmed via git diff that zero words were added or removed"

patterns-established:
  - "D-118-1 per-table prose is judgment-authored, not helper-generated -- restate the table's existing scope in 1 lead-in sentence + a 1-2 sentence after-blockquote, verified under 200 chars before moving to the next table"

requirements-completed: [RETRO-03]

# Metrics
duration: 24min
completed: 2026-07-06
---

# Phase 118 Plan 02: Capability-Matrix + Comparison Doc Retrofit (D-118-1 Showcase Batch) Summary

**Retrofitted 9 capability-matrix/comparison reference docs to EEE (RE-142/143/144/145/156/158/159/177/178) with D-118-1 per-table prose on all 45 in-scope tables, fixed the batch's 2 pre-existing C17 #12 blockquote violations via word-preserving splits, and flipped all 9 registry rows Pending -> Approved -- C17 now exits 0 across all 149 enrolled corpus files.**

## Performance

- **Duration:** 24 min
- **Started:** 2026-07-06T16:39:00Z
- **Completed:** 2026-07-06T17:03:14Z
- **Tasks:** 3 completed
- **Files modified:** 10 (9 docs + registry)

## Accomplishments

- Ran `retrofit-reference.mjs` (dry-run then write) against the 9-file batch, matching the plan's predicted VH-branch tally exactly: PREPEND-2col=1 (00-index), PREPEND-3col=5 (4-platform, android, aosp-oem, ios, linux), CREATE=3 (macos, apv1-vs-apv2, windows-vs-macos); 1 platform injection (`apv1-vs-apv2.md` -> Windows); confirmed `ca-enrollment-timing.md` untouched
- Filled all 9 Version-History `YYYY-MM-DD` placeholders with the actual commit date (2026-07-06)
- Hand-authored a >=30-word reference-template-led `## Summary` for all 9 files
- Authored D-118-1 per-table prose (one-line before lead-in + `> **Table summary:**` after blockquote) on all 45 in-scope capability-matrix/comparison tables across the 8 matrix/comparison files: 4-platform=7, android=7, aosp-oem=4, ios=6, linux=9, macos=8, apv1-vs-apv2=1, windows-vs-macos=3; `00-index.md` (pure TOC) carries none
- Included the 2 pre-existing dangling legacy changelog tables (in `macos-capability-matrix.md` and `windows-vs-macos.md`, which predate the `## Version History` heading convention) in the per-table-prose count, honestly described as change-history rather than forced into capability-matrix language
- Fixed the 2 pre-existing C17 #12 over-limit blockquote groups for this batch (`aosp-oem-matrix.md` 286c, `windows-vs-macos.md` 230c) via Transform A (word-preserving sentence-boundary split using a truly-empty line); confirmed via `git diff` that zero words were added or removed
- Flipped `docs/_registry/RE-index.md` Status `Pending -> Approved` for RE-142/143/144/145/156/158/159/177/178; left RE-146/147/157 (out of this batch) `Pending`
- `node scripts/validation/c17-eee-contract.mjs` exits 0 with zero violations across all 149 currently-enrolled corpus files

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform of the 9 matrix/comparison files via the helper** - `83f0d23` (feat)
2. **Task 2: Hand-author ## Summary (>=30 words) + D-118-1 per-table prose on all 45 tables** - `4756e18` (docs)
3. **Task 3: #12 blockquote compliance, C17 exit 0, registry Approved** - `493944c` (fix)

**Plan metadata:** (pending -- this commit)

## Files Created/Modified

- `docs/reference/00-index.md` - RE-142; EEE header block, Summary, 0 per-table prose (pure TOC)
- `docs/reference/4-platform-capability-comparison.md` - RE-143; EEE header block, Summary, 7 per-table prose pairs
- `docs/reference/android-capability-matrix.md` - RE-144; EEE header block, Summary, 7 per-table prose pairs (incl. the Cross-Platform Equivalences table)
- `docs/reference/aosp-oem-matrix.md` - RE-145; EEE header block, Summary, 4 per-table prose pairs, #12 fix on the AOSP scope reminder blockquote
- `docs/reference/ios-capability-matrix.md` - RE-156; EEE header block, Summary, 6 per-table prose pairs
- `docs/reference/linux-capability-matrix.md` - RE-158; EEE header block, Summary, 9 per-table prose pairs (incl. all 3 Cross-Platform Equivalences tables)
- `docs/reference/macos-capability-matrix.md` - RE-159; EEE header block, Summary, 8 per-table prose pairs (incl. the legacy dangling changelog table)
- `docs/apv1-vs-apv2.md` - RE-177; EEE header block (platform: Windows injected), Summary, 1 per-table prose pair
- `docs/windows-vs-macos.md` - RE-178; EEE header block, Summary, 3 per-table prose pairs (incl. the legacy dangling changelog table), #12 fix on the Platform coverage note
- `docs/_registry/RE-index.md` - Status flipped Pending -> Approved for the 9 rows in this batch

## Decisions Made

- Version-History row dates filled with the actual commit date (2026-07-06) rather than the `YYYY-MM-DD` placeholder the helper emits
- Rewrote 3 newly-authored Table-summary blockquotes that initially exceeded 200 chars (2 in android-capability-matrix.md, 1 in apv1-vs-apv2.md) before they could register as new C17 #12 violations, keeping the authoring pass clean for Task 3
- Treated the 2 pre-existing dangling legacy changelog tables (predating the `## Version History` heading convention) as in-scope D-118-1 tables rather than silently merging/restructuring the file structure -- satisfies the plan's must_haves table counts (macos=8, windows-vs-macos=3) without an out-of-scope architectural change to file layout
- Applied Transform A (truly-empty-line sentence split, never a bare `>` line) to both pre-existing #12 violations; confirmed word-preservation via `git diff`

## Deviations from Plan

None - plan executed exactly as written. The 3 blockquotes I rewrote for length were newly-authored prose from Task 2 of this same plan (not pre-existing corpus content), so shortening them before they could register as violations is normal drafting, not a deviation from the reformat-only envelope.

## Issues Encountered

- The Edit tool reported "file has been modified since read" for 6 files after the mechanical helper (`retrofit-reference.mjs`) wrote them via `writeFileSync` outside the Edit/Write tool's tracked state. Resolved by using `sed` via Bash to fill the Version-History date placeholders in those 6 files, then re-verifying with `grep`.
- One Edit call accidentally inserted a bare `>` continuation line instead of a truly-empty line when first attempting the aosp-oem-matrix.md #12 split; caught immediately (bare `>` lines do not split a C17 #12 blockquote group) and corrected to a genuinely empty line before re-measuring.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 9/34 reference-class files complete for Phase 118 (RE-142/143/144/145/156/158/159/177/178); 25 files remain across plans 118-03/04/05
- `retrofit-reference.mjs` proven a second time against a mixed VH-branch batch (PREPEND-2col, PREPEND-3col, CREATE all exercised) with zero defects -- safe for the remaining batches to reuse without further script changes
- C17 exits 0 across the full 149-file enrolled corpus at this checkpoint (all prior-phase files remain green; this batch introduces zero regressions)
- No blockers or concerns for plans 118-03 through 118-05

---
*Phase: 118-reference-doc-retrofit-table-remediation-26-docs*
*Completed: 2026-07-06*
