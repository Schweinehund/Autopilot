---
phase: 118-reference-doc-retrofit-table-remediation-26-docs
plan: 04
subsystem: docs
tags: [eee-retrofit, c17-harness, markdown, registry, blockquote-remediation]

# Dependency graph
requires:
  - phase: 118-01
    provides: retrofit-reference.mjs forked helper (VH column-shape detection, keyless-platform injection, whole-pre-H1-span relocation)
  - phase: 118-03
    provides: established #12 word-preserving split precedent for this batch of files
provides:
  - 10 security/infrastructure-detail/macOS-CLI/PowerShell reference docs retrofitted to EEE standard
  - 2 keyless files (powershell-ref RE-164, registry-paths RE-165) with platform: Windows injected
  - 30 word-preserving C17 #12 blockquote splits (heaviest single-batch load in Phase 118: win32-app-packaging 9 groups, network-infrastructure 7 groups)
  - RE-index.md Status flips: RE-148/151/157/160/161/162/164/165/166/167 Pending -> Approved
affects: [118-05, 118-06, 119-frozen-surface-rebaseline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Transform A (sentence/clause-boundary split via truly-empty blank line) used for all 30 #12 violations in this batch; no Transform B needed (no embedded code fences in blockquotes this batch)"
    - "GitHub-alert [!WARNING] marker kept paired with its first split sentence; second half of oversized sentence becomes an unmarked continuation group"
    - "Version-History date placeholder (YYYY-MM-DD) filled with actual commit date (2026-07-06), matching 117-02 precedent -- the retrofit-reference.mjs helper emits a literal placeholder, not an auto-filled date"

key-files:
  created: []
  modified:
    - docs/reference/compliance-timing.md
    - docs/reference/security-baseline-conflicts.md
    - docs/reference/licensing-matrix.md
    - docs/reference/network-infrastructure.md
    - docs/reference/win32-app-packaging.md
    - docs/reference/endpoints.md
    - docs/reference/registry-paths.md
    - docs/reference/powershell-ref.md
    - docs/reference/macos-commands.md
    - docs/reference/macos-log-paths.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Version-History date placeholder requires manual fill: the forked retrofit-reference.mjs helper writes a literal 'YYYY-MM-DD' token rather than auto-filling the commit date; discovered by cross-checking against already-shipped 118-02/118-03 output (both show 2026-07-06) -- filled identically across all 10 files"
  - "win32-app-packaging's two [!WARNING] GitHub-alert boxes needed a nested 2-level split: the marker's paired first sentence was itself >200 chars combined with the marker text, requiring a further sentence-boundary split within the marker-paired group"

patterns-established: []

requirements-completed: [RETRO-03]

# Metrics
duration: 20min
completed: 2026-07-06
---

# Phase 118 Plan 04: Security/Infra/macOS/PowerShell Reference Retrofit Summary

**Retrofitted 10 reference docs (security baselines, network infra, licensing, Win32 packaging, macOS CLI, PowerShell function reference) to the EEE standard, injecting platform: Windows into the 2 keyless files and clearing the batch's 30 C17 #12 blockquote violations -- the heaviest single-batch #12 load in Phase 118.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-07-06T12:25Z (immediately after 118-03 close)
- **Completed:** 2026-07-06T12:36:34-05:00
- **Tasks:** 3
- **Files modified:** 11 (10 reference docs + RE-index.md)

## Accomplishments
- Mechanically retrofitted all 10 files via `scripts/pipeline/retrofit-reference.mjs` (dry-run verified before write): doc_id, status: Approved, owner: Intune Admin Lead, doc_type: Reference injected; platform: Windows injected for the 2 keyless files (powershell-ref RE-164, registry-paths RE-165); EEE block line emitted; pre-H1 gate blockquote relocated (byte-length-equal, confirmed for all 10); fresh 3-column Version History section created (CREATE branch, no pre-existing section in any of the 10)
- Hand-authored reference-template-led `## Summary` prose (>=30 words) for all 10 files, each naming the reference topic, platform, and primary audience (Intune admin / L2 engineer)
- Resolved all 30 C17 assertion #12 blockquote violations via word-preserving Transform A splits, confirmed via git-diff word-multiset comparison (zero real-word content change, only the date-fill token differs)
- Flipped `docs/_registry/RE-index.md` Status Pending -> Approved for the 10 batch rows; `RE-147` (mermaid-deferred carve-out) left untouched at Pending

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform via helper (2 keyless -> Windows)** - `f65770b` (feat)
2. **Task 2: Hand-author Summary prose (>=30 words)** - `903f902` (docs)
3. **Task 3: #12 blockquote compliance (30 groups), C17 exit 0, registry Approved** - `f78c0d7` (fix)

**Plan metadata:** (this commit)

## Files Created/Modified
- `docs/reference/compliance-timing.md` - RE-148; 3 #12 splits (275/371/307 chars)
- `docs/reference/security-baseline-conflicts.md` - RE-166; 2 #12 splits (212/414 chars)
- `docs/reference/licensing-matrix.md` - RE-157; 2 #12 splits (225/298 chars)
- `docs/reference/network-infrastructure.md` - RE-162; 7 #12 splits (211/222/283/243/275/268/245 chars) -- corpus-second-worst group count
- `docs/reference/win32-app-packaging.md` - RE-167; 9 #12 splits incl. 2 nested [!WARNING] box splits (219/253/279/343/303/276/356/430/227 chars) -- corpus-worst group count
- `docs/reference/endpoints.md` - RE-151; platform: all (unchanged); 2 #12 splits (272/238 chars)
- `docs/reference/registry-paths.md` - RE-165; platform: Windows injected (keyless); 1 #12 split (209 chars)
- `docs/reference/powershell-ref.md` - RE-164; platform: Windows injected (keyless); 2 #12 splits (255/218 chars)
- `docs/reference/macos-commands.md` - RE-160; platform: macOS (unchanged); 1 #12 split (260 chars)
- `docs/reference/macos-log-paths.md` - RE-161; platform: macOS (unchanged); 1 #12 split (295 chars)
- `docs/_registry/RE-index.md` - 10 Status flips Pending -> Approved (RE-147 untouched)

## Decisions Made
- Filled the Version-History date placeholder (`YYYY-MM-DD` -> `2026-07-06`, the actual commit date) across all 10 files -- the retrofit-reference.mjs helper does not auto-fill this token; cross-checked against already-shipped 118-02/118-03 output which used the same convention
- win32-app-packaging's two `[!WARNING]` GitHub-alert boxes required a nested split: the first pass paired the marker with an oversized first sentence (270 chars combined), so a second split was applied within the marker-paired group itself, keeping `[!WARNING]` paired only with the now-shorter first clause

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Version-History date placeholder not auto-filled by helper**
- **Found during:** Task 3 (post-Task-1 review of written files)
- **Issue:** `retrofit-reference.mjs`'s CREATE branch writes a literal `YYYY-MM-DD` placeholder string instead of the actual commit date, which would fail to satisfy the plan's intent of a dated Version-History row (and diverges from 117-02/118-02/118-03 precedent, confirmed via `grep` against already-shipped files)
- **Fix:** Replaced `YYYY-MM-DD` with `2026-07-06` (actual commit date) in all 10 files' Version History row
- **Files modified:** all 10 reference docs
- **Verification:** `grep -L "YYYY-MM-DD"` confirms none remain; word-set diff confirms this is the only intentional non-word-preserving change
- **Committed in:** `f78c0d7` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Necessary correction for date accuracy; no scope creep -- follows established cross-phase convention.

## Issues Encountered
- win32-app-packaging's first `[!WARNING]` box split initially left a 270-char combined group (marker + first sentence); a second sentence-boundary split within that group resolved it. Caught via the untargeted find-bq measurement script before the final C17 run, not via C17 itself failing first.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 10/34 Phase-118 reference-class files complete in this plan (cumulative with 118-01/02/03: registry, template, and 18 files now Approved)
- `node scripts/validation/c17-eee-contract.mjs` exits 0 across all 167 currently-enrolled corpus files (no regression introduced)
- Remaining reference-class files (error-codes/*, comparison docs, any un-batched reference/ files) proceed in subsequent 118-0N plans
- No blockers for Phase 119 close-gate from this plan's output

---
*Phase: 118-reference-doc-retrofit-table-remediation-26-docs*
*Completed: 2026-07-06*

## Self-Check: PASSED

All 11 modified files confirmed present on disk; all 3 task commit hashes (`f65770b`, `903f902`, `f78c0d7`) confirmed present in git log. `node scripts/validation/c17-eee-contract.mjs` exits 0 across all 167 currently-enrolled files with zero violations on all 13 assertions.
