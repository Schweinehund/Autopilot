---
phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
plan: 01
subsystem: docs-pipeline
tags: [eee-retrofit, node-pipeline, registry, doc-id, c17, markdown]

# Dependency graph
requires:
  - phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix
    provides: C17 Mermaid policy (assertion #1 byte-unchanged), Doc Type taxonomy (glossary->Reference, lifecycle->Guide)
  - phase: 118-structural-retrofit-reference-docs
    provides: retrofit-reference.mjs fork template (detectVhColumnCount, whole-pre-H1-span relocation, buildDocIdMap)
provides:
  - scripts/pipeline/retrofit-structural.mjs (self-test green, --dry-run --all resolves 21 targets with 0 ERRORS)
  - docs/_registry/RE-index.md rows RE-179..206 (28 new rows) + RE-175/176 flipped Pending->Approved
affects: [121-02, 121-03, 121-04, 121-05, 121-06, 121-07, 122-structural-retrofit-decision-trees-carved-mermaid]

# Tech tracking
tech-stack:
  added: []
  patterns: [PATH-based doc_type router (Set-membership for bare files, prefix-match for dir classes), fail-closed doc_id join-on-Path, fork-don't-refactor pipeline scripts]

key-files:
  created: [scripts/pipeline/retrofit-structural.mjs]
  modified: [docs/_registry/RE-index.md]

key-decisions:
  - "Forked retrofit-reference.mjs (not retrofit-guide.mjs) as the template because it already carries the detectVhColumnCount CREATE-vs-PREPEND logic the plan mandates, even though this fork routes both Reference and Guide doc_types"
  - "resolveDocType() router centralizes the 2-doc_type decision (Set for 6 glossary files, prefix-array for 7 guide dirs) so both the frontmatter doc_type: line and the block **Doc Type:** line stay in sync from one source of truth"
  - "No special-casing needed for docs/_glossary-android.md's H1-before-blockquote ordering — the whole-pre-H1-span mechanism naturally produces the same post-Summary blockquote placement whether the blockquote is captured pre-H1 or simply left in the body-after-H1 tail"

requirements-completed: [RETRO-04, RETRO-07, RETRO-09]

# Metrics
duration: ~20min
completed: 2026-07-07
---

# Phase 121 Plan 01: Structural Retrofit Fork + Registry Rows Summary

**New `retrofit-structural.mjs` pipeline fork (2-doc_type PATH router spanning 6 glossary files + 7 lifecycle/end-user-guide directories, v1.16 VH literal, 9-file Mermaid hard-exclusion) plus 28 hand-authored `RE-index.md` registry rows (RE-179..206) that resolve all 21 enrollable target paths with zero errors.**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-07-07T19:30:00Z
- **Tasks:** 2/2
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments
- Built `scripts/pipeline/retrofit-structural.mjs`, forked from `retrofit-reference.mjs`, carrying every guard/helper verbatim (D1_MAP, CRLF-normalize, `buildDocIdMap`, `detectVhColumnCount`, whole-pre-H1-span relocation, TEMPLATE-SENTINEL/DOC-ID-UNRESOLVED/UNMAPPED-PLATFORM guards) and adding a fork-specific PATH→doc_type router plus a 9-file Mermaid hard-exclusion set
- `--self-test` passes 8/8 sub-tests (buildDocIdMap parsing, glossary→Reference routing, lifecycle→Guide routing, end-user-guide→Guide routing, Mermaid-deferred hard-exclusion + sibling-path allowlist proof, keyless-lifecycle platform injection, v1.16 VH literal on both column-width constants, inherited whole-pre-H1-span byte-length-equality proof)
- Hand-authored 28 contiguous `RE-index.md` rows RE-179..206 (6 glossaries as Reference/Approved in class-then-path order; 22 lifecycle files as Guide in path order, split 13 Approved / 9 Pending per the Mermaid deferral) and flipped RE-175/RE-176 (end-user guides) from Pending to Approved
- `node scripts/pipeline/retrofit-structural.mjs --dry-run --all` resolves all 21 enrollable target paths (6 glossaries + 13 Mermaid-free lifecycle + 2 end-user guides) with 0 ERRORS — no `DOC-ID-UNRESOLVED`, no `MERMAID-DEFERRED` leakage into `--all`

## Task Commits

Each task was committed atomically:

1. **Task 1: Fork scripts/pipeline/retrofit-structural.mjs (2 doc_types, 3 dir classes, v1.16 VH, 9-file Mermaid hard-exclusion)** - `a43d9c7` (feat)
2. **Task 2: Hand-author RE-179..206 + flip RE-175/176 to Approved in RE-index.md (D-04/D-06)** - `5a42796` (docs)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified
- `scripts/pipeline/retrofit-structural.mjs` - New fork: PATH→doc_type router (`GLOSSARY_FILES` Set of 6 bare files → Reference, `GUIDE_DIRS` array of 7 prefixes → Guide), `MERMAID_DEFERRED_PATHS` Set of the 9 Mermaid-bearing lifecycle files (fail-closed on explicit invocation, filtered from `--all`), `v1.16 EEE reformat` VH-row literal in both `NEW_ROW_2COL`/`NEW_ROW_3COL`, all reference-fork helpers (`detectVhColumnCount`, `insertVersionHistoryRow`, whole-pre-H1-span relocation, `buildDocIdMap`) carried verbatim
- `docs/_registry/RE-index.md` - Appended RE-179..206 (28 rows, zero-gap contiguous with the existing RE-001..178); flipped RE-175/RE-176 Status column from Pending to Approved

## Decisions Made
- Forked from `retrofit-reference.mjs` rather than `retrofit-guide.mjs` — the reference fork already has the `detectVhColumnCount` CREATE-vs-PREPEND logic this plan's `must_haves` require carried, and the router pattern generalizes cleanly to emit either doc_type from one resolved value
- `resolveDocType(rel)` is the single source of truth consumed by both the frontmatter `doc_type:` line and the block `**Doc Type:**` line — avoids the two staying independently hardcoded and drifting
- No special-case needed for `docs/_glossary-android.md`'s reversed H1/blockquote order (H1 appears before the coverage blockquote, unlike the other 5 glossaries) — confirmed via `--dry-run --all` output (`preH1SpanLines=0` for that file, blockquote naturally lands in the body-after-H1 tail, which is emitted after `## Summary` regardless)

## Deviations from Plan

None - plan executed exactly as written. All must_haves, acceptance criteria, and verification commands from `121-01-PLAN.md` passed on first execution without needing Rule 1/2/3 auto-fixes.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `scripts/pipeline/retrofit-structural.mjs` is self-test green and dry-run-proven against the full 21-file target set; plans 121-02 through 121-05 (glossaries, lifecycle-13, end-user-guides) can now run `--all` (writes) and hand-author `## Summary` prose + fix C17 #12 blockquotes per-file
- Plan 121-06 can now run the fork against `docs/end-user-guides/{android-work-profile-setup,linux-intune-portal-enrollment}.md` — their RE-175/176 rows are already Approved
- The 9 Mermaid-bearing lifecycle rows (RE-190/191/192/195/196/200/204/205/206) are reserved at Pending with path-order IDs already assigned — Phase 122 can flip them to Approved after Mermaid conversion without minting new IDs
- Known executor hazard for downstream plans (not this plan's job): `docs/_glossary-network.md` uses `## Change History` instead of `## Version History` — the wave-2 plan touching that file must reconcile the heading name or the VH-row insertion will CREATE a duplicate section (confirmed by this plan's dry-run: `docs/_glossary-network.md` showed `vhBranch=CREATE`, meaning `## Version History` was not detected)

---
*Phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides*
*Completed: 2026-07-07*

## Self-Check: PASSED

- FOUND: scripts/pipeline/retrofit-structural.mjs
- FOUND: docs/_registry/RE-index.md
- FOUND: .planning/phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/121-01-SUMMARY.md
- FOUND commit: a43d9c7
- FOUND commit: 5a42796
