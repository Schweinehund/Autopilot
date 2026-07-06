---
phase: 118-reference-doc-retrofit-table-remediation-26-docs
plan: 01
subsystem: docs-tooling
tags: [node, markdown, eee-retrofit, c17, docid-registry, version-history]

# Dependency graph
requires:
  - phase: 117-admin-setup-guide-retrofit-all-platforms
    provides: retrofit-guide.mjs fork base (D1_MAP, buildDocIdMap, whole-pre-H1-span relocation, TEMPLATE-SENTINEL guard, self-test CLI shape)
  - phase: 115-c17-harness-check-validator-atom
    provides: c17-eee-contract.mjs (the immutable gate the helper's output must satisfy)
provides:
  - scripts/pipeline/retrofit-reference.mjs (NEW) — mechanical EEE retrofit helper for the 34-file reference-class corpus
  - Version-History column-shape detection (detectVhColumnCount) preventing silent table misalignment
  - Reference-class path allowlist (2 dirs + 2 bare single files) + 1-file mermaid hard-exclusion
affects: [118-02, 118-03, 118-04, 118-05]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "detectVhColumnCount(lines, vhIdx): scans first non-separator table row after ## Version History heading, counts pipe-delimited cells, branches PREPEND row width accordingly"
    - "Path allowlist union: REFERENCE_DIRS.some(startsWith) || REFERENCE_SINGLE_FILES.has(rel) — generalizes 117's directory-only allowlist to accept bare single files"

key-files:
  created:
    - scripts/pipeline/retrofit-reference.mjs
  modified: []

key-decisions:
  - "Forked retrofit-reference.mjs from retrofit-guide.mjs rather than refactoring in place — protects the shipped Phase-117 deliverable from a shared-refactor regression (same rationale as 117-01)"
  - "VH CREATE branch (21 files with no existing section) always uses 3-column shape (Open Question 1 lock, matches 116/117 corpus-wide precedent) — only the PREPEND branch (13 files) varies by detected column count"
  - "detectVhColumnCount falls back to 3-column if inconclusive (defensive default, never silently drops a row)"

patterns-established:
  - "VH column-shape detection: any future retrofit helper that prepends into a pre-existing Version History table must detect column count before constructing the new row — never assume uniform shape across a corpus"

requirements-completed: [RETRO-03]

# Metrics
duration: 13min
completed: 2026-07-06
---

# Phase 118 Plan 01: Fork retrofit-reference.mjs Summary

**Forked scripts/pipeline/retrofit-reference.mjs from the Phase-117 helper, adding Version-History column-shape detection (2-col vs 3-col PREPEND, 3-col CREATE) and a 2-dir + 2-bare-file path allowlist — proven by a 7-sub-test self-test and a zero-write 34-file dry-run (10 platform-injections, VH branches 8/5/21, all byte-preserved).**

## Performance

- **Duration:** 13 min
- **Started:** 2026-07-06T16:24:18Z
- **Completed:** 2026-07-06T16:36:41Z
- **Tasks:** 2 completed
- **Files modified:** 1 (created)

## Accomplishments

- Forked `scripts/pipeline/retrofit-reference.mjs` from `retrofit-guide.mjs` (Phase 117), reusing ~85% verbatim per PATTERNS.md guidance (D1_MAP, `padLabel`/`readFile`/`walkMd`/`relNormalize`, `buildDocIdMap`, frontmatter regex, TEMPLATE-SENTINEL guard, doc-id-unresolved guard, platform-injection guard, whole-pre-H1-span relocation)
- Added `detectVhColumnCount(lines, vhIdx)` — the load-bearing NEW mechanical fix this phase requires — which parses an existing `## Version History` table's header row and counts pipe-delimited cells, so the PREPEND branch never assumes a uniform column shape across the corpus
- Generalized the path allowlist from directory-only (`ADMIN_SETUP_DIRS`) to a union of `REFERENCE_DIRS` (2 directories) and `REFERENCE_SINGLE_FILES` (2 bare single files: `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md`)
- Hard-excluded the single mermaid-deferred file (`docs/reference/ca-enrollment-timing.md`, RE-147) — fails CLOSED on explicit invocation, never enumerated under `--all`
- Changed `doc_type` literal to `Reference` and the `[FILL-IN]` Summary placeholder to reference the single reference-template Summary lead (no per-platform branching, unlike 117's 4 platform-keyed leads)
- Proved the fork with a 7-sub-test `--self-test` (6 inherited guard proofs + 1 new VH-column-detection regression proof) and a full 34-file `--dry-run` matching every RESEARCH.md figure exactly: 34/34 resolved, 0 errors, exactly 10 platform-injected files, VH branch tally PREPEND-2col=8 / PREPEND-3col=5 / CREATE=21, all pre-H1 spans byte-length-preserved, zero writes to `docs/` or the registry

## Task Commits

Each task was committed atomically:

1. **Task 1: Fork scripts/pipeline/retrofit-reference.mjs with VH column detection + reference path allowlist** - `353d062` (feat)
2. **Task 2: Prove the fork with --self-test + full 34-file --dry-run** - no additional commit (verification-only; self-test and dry-run both passed cleanly against the Task-1 commit on first attempt, no code changes required)

**Plan metadata:** (pending — this commit)

## Files Created/Modified

- `scripts/pipeline/retrofit-reference.mjs` - Forked mechanical EEE retrofit helper for the reference-class corpus: injects `doc_id`/`status`/`owner`/`doc_type: Reference` frontmatter keys, injects `platform: Windows` for the 10 keyless files, emits the EEE block line, relocates the whole pre-H1 span, and detects/matches Version-History column shape on PREPEND (2-col vs 3-col) while always creating new sections as 3-column

## Decisions Made

- Forked rather than refactored `retrofit-guide.mjs` in place — protects the shipped, Approved Phase-117 deliverable from a shared-refactor regression (per plan mandate and 117-01 precedent)
- VH CREATE branch (21 files) always emits a 3-column section regardless of corpus-wide column mix, per the RESEARCH.md "Open Question 1" lock (matches 116/117 corpus-wide precedent); only the PREPEND branch (13 pre-existing files) varies its row width by detected column count
- `detectVhColumnCount` defaults to 3-column if the scan is inconclusive (defensive, never silently drops or misforms a row)

## Deviations from Plan

None - plan executed exactly as written. Both tasks' acceptance criteria were met on the first implementation pass; no auto-fixes, no blocking issues, no architectural questions arose.

## Issues Encountered

None. Node's Bash tool required writing scratch dry-run output to the session scratchpad directory rather than `/tmp` (permission denied) — a tooling-environment note, not a plan or code issue.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `scripts/pipeline/retrofit-reference.mjs` is proven and ready for batch plans 118-02 through 118-05 to invoke against their respective file subsets
- The VH column-shape detection is validated against both real corpus shapes (2-col in `docs/error-codes/00-index.md`-class files, 3-col in `docs/reference/android-capability-matrix.md`-class files) via self-test sub-test (g)
- No blockers or concerns for subsequent batch plans

---
*Phase: 118-reference-doc-retrofit-table-remediation-26-docs*
*Completed: 2026-07-06*
