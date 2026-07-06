---
phase: 117-admin-setup-guide-retrofit-all-platforms
plan: 01
subsystem: tooling
tags: [nodejs, markdown-transform, eee-sop-retrofit, doc-tooling]

# Dependency graph
requires:
  - phase: 116-l1-l2-runbook-retrofit-75-docs
    provides: retrofit-runbook.mjs precedent (D1_MAP, registry-join, Version-History insertion, self-test CLI shape) and the confirmed-defective first-blockquote-run gate-capture logic this plan forks and fixes
  - phase: 115-c17-harness-check-validator-atom
    provides: scripts/validation/c17-eee-contract.mjs (immutable gate; D1_MAP source of truth; assertion #9/#10/#12 logic mirrored by this helper's guards and measurements)
  - phase: 114-eee-standard-templates-doc-id-registry-metadata-rules
    provides: docs/_registry/RE-index.md (RE-076..RE-141 rows) and the four admin-setup templates defining target shape
provides:
  - scripts/pipeline/retrofit-guide.mjs -- forked, node-builtins-only mechanical retrofit helper for docs/admin-setup-*/
  - Whole-pre-H1-span relocation fix (replaces 116's first-/^>/-run-only capture) proven by byte-length-preservation self-test and full-corpus dry-run
  - Uniform owner (Intune Admin Lead) + doc_type: Guide stamping for all 57 enrolled admin-setup files
  - Hard exclusion of the 9 D-05 mermaid-deferred files (fail-closed ERROR on explicit invocation)
affects: [117-02, 117-03, 117-04, 117-05, 117-06, 117-07, 117-08, 117-09]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Whole-pre-H1-span relocation: capture bodyLines.slice(0, firstH1Idx), trim only leading/trailing blank lines, relocate the untouched middle intact -- generalizes gate-blockquote relocation to any pre-H1 shape (2nd blockquote, HTML comments) without literal-string matching"
    - "Fork-not-refactor for shipped Phase-N helper scripts: new self-contained scripts/pipeline/*.mjs with its own verbatim-copied D1_MAP rather than a shared parameterized helper, protecting the completed predecessor deliverable from regression"
    - "Independent byte-length re-derivation from the assembled output array (not the reused span reference) as a self-test proof -- catches bugs in the join/emission step itself, not just the capture step"

key-files:
  created:
    - scripts/pipeline/retrofit-guide.mjs
  modified: []

key-decisions:
  - "Forked a new scripts/pipeline/retrofit-guide.mjs rather than refactoring retrofit-runbook.mjs in place, per RESEARCH.md Open Question 1 recommendation -- protects the shipped, Approved Phase-116 deliverable from any shared-refactor regression"
  - "Whole-pre-H1-span capture matches by structural position only (everything between frontmatter close and first H1), never on literal 'Version gate'/'Platform gate'/'Scope' strings -- several 8021x and android files use other callout labels"
  - "owner: Intune Admin Lead is a uniform constant for all 57 files (D-04), deliberately diverging from the platform templates' per-platform reviewer comment role; owner is frontmatter-only and never rendered in the EEE block"
  - "The 9 D-05 mermaid-deferred files are hard-excluded from --all enumeration AND fail closed (ERROR, not silent skip) on explicit invocation, so the script itself enforces D-05 rather than relying on batch-plan discipline"

requirements-completed: [RETRO-02]

# Metrics
duration: 12min
completed: 2026-07-05
---

# Phase 117 Plan 01: Fork retrofit-guide.mjs with the whole-pre-H1-span fix Summary

**Forked scripts/pipeline/retrofit-guide.mjs from the Phase-116 retrofit-runbook.mjs, fixing a confirmed silent-content-loss defect (whole-pre-H1-span relocation replaces first-blockquote-run-only capture), proven by a 6-sub-test self-test and a zero-write 57-file dry-run.**

## Performance

- **Duration:** ~12 min
- **Tasks:** 2 completed
- **Files modified:** 1 (created)

## Accomplishments
- Forked `scripts/pipeline/retrofit-guide.mjs` (node-builtins-only: `node:fs`, `node:path`, `node:process`) targeting the 7 `docs/admin-setup-*/` directories with `doc_type: Guide` and uniform `owner: Intune Admin Lead`
- Fixed the confirmed Phase-116 helper defect: replaced the first-contiguous-`/^>/`-run-only gate capture with whole-pre-H1-span relocation (blockquote runs + HTML comments + blank-line structure, matched by structural position only, never a literal-string match)
- Hard-excluded the 9 D-05 mermaid-deferred files -- never enumerated under `--all`, and fail CLOSED (ERROR, not silent skip) if invoked against one by explicit path
- Proved the fix with a 6th self-test sub-test (synthetic 2-blockquote + trailing-HTML-comment fixture) asserting relocated-span byte length equals original span byte length
- Ran the full 57-file `--all --dry-run`: 57/57 resolve doc_id and platform, exactly 13 files flagged for `platform: Windows` injection, zero unmapped-platform errors, byte-length-preserved spans for all 57 files (confirmed specifically for `ios/02-abm-token.md`, `macos/01-abm-configuration.md`, and `android/09..13-aosp-*.md`), zero writes to `docs/` or the registry

## Task Commits

Each task was committed atomically:

1. **Task 1: Fork scripts/pipeline/retrofit-guide.mjs with the whole-pre-H1-span fix** - `2d9b662` (feat)
2. **Task 2: Prove the fork with --self-test (incl. span-preservation) + full 57-file --dry-run** - `b8d52cf` (test)

_Note: Task 2's changes were test-only additions (the 6th self-test sub-test), hence the `test(...)` commit type._

## Files Created/Modified
- `scripts/pipeline/retrofit-guide.mjs` - Forked mechanical EEE retrofit helper for admin-setup guides; whole-pre-H1-span relocation fix; path allowlist + D-05 mermaid exclusion; uniform owner + doc_type: Guide; 6-sub-test self-test harness; `--dry-run`/`--all`/`--verbose` CLI

## Decisions Made
- Forked rather than refactored `retrofit-runbook.mjs` in place (protects the shipped Phase-116 deliverable) -- see `key-decisions` frontmatter
- Whole-pre-H1-span capture implemented as "capture everything, trim only leading/trailing blanks" rather than "capture blockquote, then separately handle comments" -- strictly more general, per RESEARCH.md Open Question 2 recommendation
- Added an independent byte-length re-derivation from the assembled `newBodyParts` array (not the reused `preH1Span` reference) in `processFile`'s return value, so the self-test and dry-run report a genuine post-assembly proof rather than a value that's trivially true by construction

## Deviations from Plan

None - plan executed exactly as written. Both tasks' acceptance criteria were verified directly:
- `node scripts/pipeline/retrofit-guide.mjs --self-test` exits 0, 6/6 sub-tests pass
- `node scripts/pipeline/retrofit-guide.mjs --all --dry-run` exits 0, 57 files resolved, 13 platform-injections, 0 errors
- `node scripts/pipeline/retrofit-guide.mjs docs/admin-setup-ios/00-overview.md` (a mermaid-deferred file, explicit path) returns ERROR exit 1
- D1_MAP byte-diffed identical to `c17-eee-contract.mjs` lines 26-47
- `git diff --quiet docs/ docs/_registry/RE-index.md` exits 0 after both self-test and dry-run (zero writes)

## Issues Encountered
None. One internal iteration: the self-test's synthetic pre-H1-span fixture initially asserted an incorrect expected line count (6 instead of 7, miscounting the blank-line separators between the two blockquotes and the trailing HTML comment); corrected before the Task 2 commit, not a deviation from plan scope.

## User Setup Required

None - no external service configuration required. This is a pure Node.js built-ins script with no dependencies to install.

## Next Phase Readiness

`scripts/pipeline/retrofit-guide.mjs` is ready for batch plans 117-02 through 117-09 to invoke against their respective file subsets. The dry-run confirms all 57 enrolled files resolve cleanly with zero errors, so no batch plan should hit an unexpected DOC-ID-UNRESOLVED, UNMAPPED-PLATFORM, or MERMAID-DEFERRED error when it runs the helper for real (non-dry-run) writes. Batch plans still own: hand-authoring the `## Summary` prose (per-platform-template lead, D-03), fixing every C17 #12 over-limit blockquote group (Transform A/B per RESEARCH.md), filling the real Version-History date, and flipping the registry `Pending → Approved` status per batch.

---
*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Completed: 2026-07-05*
