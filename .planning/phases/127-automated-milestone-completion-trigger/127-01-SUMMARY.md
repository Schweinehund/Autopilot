---
phase: 127-automated-milestone-completion-trigger
plan: 01
subsystem: infra
tags: [nodejs, cli-argv, publish-pipeline, path-traversal-mitigation]

# Dependency graph
requires:
  - phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes
    provides: build-publish-bundle.mjs orchestrator (PUB-01..04), already-green batch conversion/guard/parity/manifest logic
provides:
  - "--version=vX.Y[.Z] CLI flag on build-publish-bundle.mjs, defaulting to v1.17 when absent"
  - "Pure, exported deriveZipName(version) helper with anchored ^v\\d+\\.\\d+(\\.\\d+)?$ validation"
  - "Fail-closed exit(1) at module load on malformed --version (no zip produced)"
affects: [127-02-publish-bundle-gate-stop-hook]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Anchored (\\$-terminated) version regex as the path-traversal mitigation for any user-controlled string that flows into a filesystem path segment (T-127-05)"
    - "Fail-closed at module load (before runBatch/self-test dispatch) so both a real run and --self-test observe a validated derived constant"

key-files:
  created: []
  modified: [scripts/pipeline/build-publish-bundle.mjs]

key-decisions:
  - "D-05 implemented as a --version= CLI flag (not an env var), consistent with the existing --self-test argv convention (127-RESEARCH.md Open Question #2 resolution)"
  - "Anchored regex ^v\\d+\\.\\d+(\\.\\d+)?$ used verbatim per plan/threat-model mandate, not the unanchored ^v?\\d+\\.\\d+ fragment that a naive port of the Jira hook's milestone regex would have produced"

patterns-established:
  - "deriveZipName(version) pure helper pattern: throw on invalid input, exported for both self-test and future hook-side reuse if ever needed"

requirements-completed: [HOOK-01]

# Metrics
duration: 4min
completed: 2026-07-11
---

# Phase 127 Plan 01: ZIP_NAME Version Parameterization (D-05) Summary

**Parameterized `build-publish-bundle.mjs`'s hardcoded `docs-library-v1.17.zip` into a validated `--version=` CLI flag via a pure `deriveZipName()` helper, closing a path-traversal vector with an anchored regex and adding 4 new self-test assertions.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-07-11T04:47:49Z
- **Completed:** 2026-07-11T04:51:22Z
- **Tasks:** 2 completed
- **Files modified:** 1

## Accomplishments
- `build-publish-bundle.mjs` now accepts `--version=vX.Y[.Z]` and derives `ZIP_NAME` from it, defaulting to `v1.17` when absent (exact backward-compatible behavior preserved)
- New pure `deriveZipName(version)` helper validates against the ANCHORED `^v\d+\.\d+(\.\d+)?$` regex — the trailing `$` closes the path-traversal vector (T-127-05) that an unanchored prefix-only form would have admitted
- Malformed `--version` values fail closed: `FATAL:` message to stderr, `process.exit(1)`, no zip written
- Self-test harness grew from 11 to 15 assertions, covering 2-part derivation, 3-part derivation (`v1.4.1`), malformed-input rejection, and traversal-shaped-input rejection — all passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Parameterize ZIP_NAME via a --version flag + pure deriveZipName() helper (D-05)** - `8a7c0c4` (feat)
2. **Task 2: Add self-test coverage for deriveZipName + update the informational comment** - `2eae465` (test)

## Files Created/Modified
- `scripts/pipeline/build-publish-bundle.mjs` - Added `--version=` argv parsing, the `deriveZipName()` pure helper, module-load fail-closed dispatch, 4 new self-test assertions ((f1)-(f4)), and updated the line-11 informational comment to describe the derived versioned zip name

## Decisions Made
- CLI flag (not env var) for D-05, per RESEARCH.md's recommendation and consistency with the existing `--self-test` argv convention — no new indirection needed since the hook's `block(reason)` text can just state the exact command with the version already substituted in.
- Used the anchored `^v\d+\.\d+(\.\d+)?$` form exactly as mandated by the plan's critical_constraints and threat_model (T-127-05), not the unanchored fragment that appears (correctly caveated) elsewhere in RESEARCH.md as a "wrong" example.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' acceptance criteria were met verbatim: the hardcode was removed, the template literal and `deriveZipName` function each appear the expected number of times, 3-part versions are accepted, malformed versions fail closed with exit 1, the default (no `--version`) preserves v1.17 behavior, and `node --check` passes throughout.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `deriveZipName()` is exported and the `--version=` flag is live, unblocking 127-02's Stop-hook nudge (`node scripts/pipeline/build-publish-bundle.mjs --version=<milestone>`), which depends on this flag existing and being validated fail-closed before the hook can reference it.
- No blockers. The pipeline's conversion/guard/parity/manifest logic (Phase 126) was untouched, per the reuse-don't-re-derive constraint.

---
*Phase: 127-automated-milestone-completion-trigger*
*Completed: 2026-07-11*
