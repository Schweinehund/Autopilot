---
phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding
plan: 02
subsystem: infra
tags: [pipeline, filename-generator, node, docx, ooxml]

# Dependency graph
requires:
  - phase: 124-01
    provides: convert.ps1 with -OutputDocx param intact (byte-unchanged in this plan), guard-docx.mjs CUSTOM-PROPS check
provides:
  - "PIPE-04: descriptive-filename generator (build-filename-map.mjs) + committed 221-row filename-map.md"
  - "SC3 output-name wiring proof: RE-002 converts to device-not-registered-in-autopilot.docx via convert.ps1 -OutputDocx"
affects: [124-03-pipe-05-draft-label-probe, 125-close-gate]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Registry-driven generator: reads docs/_registry/RE-index.md Title/Path columns, applies a deterministic slug + fail-closed collision resolver, writes a committed derived artifact"
    - "Fail-closed pure-function collision resolver: buildFilenameMap() never calls process.exit itself -- returns {ok,error} so main() decides how to exit and self-test can prove the fail-closed path without a subprocess"

key-files:
  created:
    - scripts/pipeline/build-filename-map.mjs
    - scripts/pipeline/filename-map.md
  modified: []

key-decisions:
  - "D-08 collision disambiguation implemented as nearest-first Path parent-directory segments (reversed to natural outer-to-inner order for readability), appended one segment at a time until unique -- proven via a synthetic 2-row collision (Task 1 self-test (d))"
  - "D-08 fail-closed proof uses two synthetic rows sharing both title AND a root-level path with zero directory segments (path='overview.md') so the disambiguation loop has nothing to append -- the realistic corpus never reaches this branch (0 of 221 titles collide), so the unresolvable case had to be constructed rather than found"
  - "filename-map.md format locked to committed markdown table (RESEARCH OQ2/A3), 3-column Doc ID | Path | Output Filename, mirroring RE-index.md's own table shape + warning-banner convention"

patterns-established:
  - "Pure fail-closed resolver functions (return {ok,error}, never process.exit internally) so --self-test can exercise every guard branch, including the unresolvable-collision path, without spawning a subprocess"

requirements-completed: [PIPE-04]

duration: 7min
completed: 2026-07-08
---

# Phase 124 Plan 02: Descriptive-Filename Pass (PIPE-04) Summary

**Built a zero-dependency Node generator (build-filename-map.mjs) that derives a descriptive `.docx` output filename per registered doc from RE-index.md's Title column (D-05 exact 5-step slug, D-08 fail-closed collision policy), committed the resulting 221-row filename-map.md, and proved the SC3 output-name wiring end-to-end by converting RE-002 through convert.ps1's existing `-OutputDocx` param to its map-derived name `device-not-registered-in-autopilot.docx`.**

## Performance

- **Duration:** ~7 min
- **Started:** 2026-07-08T19:05:00Z (approx, immediately following 124-01)
- **Completed:** 2026-07-08T19:12:00Z
- **Tasks:** 3/3 completed
- **Files modified:** 2 (both new)

## Accomplishments

- `build-filename-map.mjs` parses `docs/_registry/RE-index.md`'s 5-column pipe-table (excluding the `## Review Notes` prose section by construction) and applies the exact, unparaphrased D-05 5-step slug algorithm
- D-08 fail-closed collision policy implemented as a pure function (`buildFilenameMap()`) that never calls `process.exit` itself -- returns `{ok, error}` so both `main()` and `--self-test` can exercise every branch, including the genuinely-unresolvable synthetic case, without subprocess spawning
- `--self-test` proves 7 sub-tests: 5-column row parser, the `802.1X` edge case, an em-dash-title collapse, the REAL 221-row registry parse, a synthetic 2-row collision resolving uniquely, a synthetic unresolvable collision hitting `FILENAME-COLLISION-UNRESOLVED`, and a 0-row prose-only registry parse -- all PASS
- `scripts/pipeline/filename-map.md` committed: 221 data rows, 0 duplicate Output Filename values, RE-index.md untouched (D-09), descriptive slugs confirmed present (e.g. `tpm-attestation-failure-investigation.docx`)
- SC3 proven end-to-end: RE-002 (`docs/l1-runbooks/01-device-not-registered.md`) converts via `convert.ps1 -OutputDocx <map value>` to `.pipeline-output/device-not-registered-in-autopilot.docx` -- descriptive, NOT `RE-002`, NOT the numeric source basename `01-device-not-registered` -- and `guard-docx.mjs` exits 0 (3 PASS, 0 FAIL, 0 SKIPPED, including the 124-01 CUSTOM-PROPS check)
- `convert.ps1` confirmed byte-unchanged throughout (`git diff --stat scripts/pipeline/convert.ps1` shows zero changes both before and after the Task 3 sample conversion)

## Task Commits

Each code-producing task was committed atomically; Task 3 is proof-only (no `files_modified` entry in the plan frontmatter) and produced no trackable diff (`.pipeline-output/` is gitignored):

1. **Task 1: Build build-filename-map.mjs** - `a0d6c21` (feat)
2. **Task 2: Generate and commit filename-map.md** - `405c52e` (feat)
3. **Task 3: SC3 proof (RE-002 sample conversion)** - no commit (proof-only; `.pipeline-output/` is gitignored, `convert.ps1` byte-unchanged, no source files touched)

**Plan metadata:** (this commit)

## Files Created/Modified

- `scripts/pipeline/build-filename-map.mjs` - New zero-dependency Node generator: registry parser, D-05 slug, D-08 fail-closed collision resolver, `--self-test`/`--dry-run` CLI, committed-artifact writer (never writes `RE-index.md`)
- `scripts/pipeline/filename-map.md` - New committed build artifact: `| Doc ID | Path | Output Filename |`, 221 rows, generated-file warning banner, 0 collisions

## Decisions Made

- **D-08 disambiguation mechanics:** nearest-first Path parent-directory segments are collected, then reversed back to natural (outer-to-inner) order before being appended to the base slug -- e.g. a collision on `overview.docx` between `docs/admin-setup-ios/00-overview.md` and `docs/admin-setup-macos/00-overview.md` resolves to `overview-admin-setup-ios.docx` / `overview-admin-setup-macos.docx`. Proven via self-test (d).
- **D-08 fail-closed synthetic proof:** the real registry has 0 collisions today (RESEARCH-confirmed), so an unresolvable case had to be constructed rather than found -- two synthetic rows share both title AND a directory-less path (`overview.md`, zero parent segments), so the resolver's segment-based disambiguation loop has nothing to append and correctly returns `{ok:false, error: 'FILENAME-COLLISION-UNRESOLVED: ...'}`.
- **filename-map.md format:** committed markdown table (not JSON) per RESEARCH Open Question 2/Assumption A3, mirroring `RE-index.md`'s own pipe-table + warning-banner shape for human-reviewable PR diffs and future batch-driver consumption.
- **Resolver as a pure function:** `buildFilenameMap()` never calls `process.exit` -- it returns a result object. This let `--self-test` prove the fail-closed collision path directly (assertion (e)) without spawning a child process, consistent with the `retrofit-nav-hub.mjs` convention of testable, non-exiting core functions with `process.exit` decisions made only in `main()`/self-test wrapper code.

## Deviations from Plan

None - plan executed exactly as written. The one self-correction during implementation (self-test assertion (e)'s initial synthetic fixture had 2 path segments and was actually resolvable, contradicting its own "unresolvable" label) was caught and fixed by running the self-test itself before committing -- not a plan deviation, a normal TDD-style red-then-fixed iteration within Task 1's own verification loop, prior to any commit.

## Issues Encountered

None blocking. The first `--self-test` run surfaced 6/7 passing with sub-test (e) failing because the synthetic "unresolvable" collision fixture actually had 2 disambiguating path segments available (`docs/admin-setup-ios/...`) and resolved successfully -- this was corrected by changing the fixture to a directory-less path (`overview.md`, 0 segments) before the first commit; no committed code was ever broken.

## SC3 Evidence (Task 3 — required record per plan action)

- **Input:** `docs/l1-runbooks/01-device-not-registered.md` (Doc ID RE-002, Title "Device Not Registered in Autopilot")
- **Map-derived Output Filename** (`scripts/pipeline/filename-map.md`, RE-002 row): `device-not-registered-in-autopilot.docx`
- **Conversion command:** `convert.ps1 -InputMd docs/l1-runbooks/01-device-not-registered.md -OutputDocx .pipeline-output/device-not-registered-in-autopilot.docx`
- **Result:** pandoc 3.7.0.2 version guard PASS; PIPE-03 preprocessing 0 rewrites, guard PASS; conversion exit 0; produced file is the descriptive slug, NOT `RE-002.docx`, NOT `01-device-not-registered.docx`
- **guard-docx.mjs result:** `[YAML-LEAK/3] PASS`, `[HEADING-STYLE/3] PASS`, `[CUSTOM-PROPS/3] PASS` -- 3 PASS, 0 FAIL, 0 SKIPPED
- **`convert.ps1` byte-unchanged:** `git diff --stat scripts/pipeline/convert.ps1` shows zero changes (D-10 confirmed)
- **No batch driver, no corpus-wide loop, no upload step added** (both deferred to v1.17+ per D-10) -- exactly one representative conversion, as scoped

## User Setup Required

None - no external service configuration required. This plan touches only local pipeline tooling and a committed build artifact.

## Next Phase Readiness

- PIPE-04 fully closed: generator + committed map + SC3 output-name wiring proof, all done-criteria met.
- `convert.ps1` remains byte-unchanged and ready for 124-03's PIPE-05 fixture conversion.
- No batch driver / bulk `.docx` generation / SharePoint upload exists yet (correctly deferred to v1.17+, D-10) -- 124-03's PIPE-05 probe uses its own single reformatted fixture, not this map, per the plan's scoping.
- No blockers for 124-03 (PIPE-05 Draft-label grounding probe, owner-run checkpoint).

---
*Phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding*
*Completed: 2026-07-08*

## Self-Check: PASSED

All created files confirmed present on disk (build-filename-map.mjs, filename-map.md, this SUMMARY); both task commit hashes (a0d6c21, 405c52e) confirmed in `git log`.
