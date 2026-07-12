---
phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes
plan: 02
subsystem: docs-pipeline
tags: [orchestration, docx, zip, batch, fail-closed, guard-docx, convert.ps1, build-filename-map]

# Dependency graph
requires:
  - phase: 126-01
    provides: guard-clean 221-doc Approved corpus (HYG-02/HYG-03 fixes, convert.ps1 .tmp-leak fix)
provides:
  - scripts/pipeline/build-publish-bundle.mjs -- the PUB-01..04 batch orchestrator
  - dist/docs-library-v1.17.zip -- flat 221-.docx + manifest.csv + README.md bundle (gitignored, runtime artifact)
  - additive exports (parseRegistry/readFile/slug) on build-filename-map.mjs for library reuse
  - isMainModule guard on build-filename-map.mjs (import-safe: no side effects on import)
affects: [127-hook-01, publish-bundle-pipeline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "isMainModule guard (fileURLToPath(import.meta.url) === process.argv[1]) -- required whenever an existing scripts/pipeline/*.mjs CLI script's top-level self-test/main-mode code is imported as a library by a sibling orchestrator"
    - "Distinct 3-column filename-map.md parser (parseFilenameMap) kept separate from the 5-column parseRegistry -- never conflate the two table shapes despite both being '| RE-... |' pipe tables"
    - "Pure-function extraction (checkParity/checkDivergence/checkFilenameMapCoverage) so a batch orchestrator's fail-closed decision logic is self-test-provable via synthetic fixtures, independent of the real 221-doc corpus"
    - "End-to-end negative-path proof via an isolated scratch-directory corpus (never mutating the committed docs/ tree) -- copies the unmodified orchestrator + pipeline tools into a scratch cwd with a synthetic 1-doc leaked-YAML fixture to exercise the real runBatch() fail-closed exit path"

key-files:
  created:
    - scripts/pipeline/build-publish-bundle.mjs
  modified:
    - scripts/pipeline/build-filename-map.mjs
    - scripts/pipeline/filename-map.md (regenerated; byte-identical, no diff)

key-decisions:
  - "isMainModule guard added to build-filename-map.mjs (Rule 3 blocking-issue fix, discovered during Task 2 implementation): the file's top-level self-test AND main generate-mode code ran unconditionally on import, so merely `import`-ing parseRegistry/readFile (the plan-mandated reuse pattern) triggered the imported module's own CLI side effects and process.exit() before the importer's own code ever ran"
  - "TDD RED/GREEN applied literally to Task 2: RED commit ships all 8 orchestrator helper functions as NOT_IMPLEMENTED throwers plus the full self-test harness (self-test genuinely fails, 4/5 assertions FAIL, exit 1); GREEN commit implements all 8 functions + runBatch() (self-test 7/7 PASS, exit 0)"
  - "Promote+zip implemented as a single Compress-Archive shell-out directly from the staging dir to dist/docs-library-v1.17.zip -Force, run only after every prior pass (conversion, guard, parity, naming-parity) succeeds -- this IS the D-07 atomic-promote semantics: a run that fails at any earlier stage leaves any prior successful zip completely untouched, never a partial/mid-write zip"
  - "D-12 divergence check implemented as an exact-equality test (frontmatter status === 'Draft'), matching CONTEXT.md D-12's literal wording, rather than a broader status !== 'Approved' check"

patterns-established:
  - "Full-corpus batch orchestrator loop shape (registry-driven selection -> filename-map join -> divergence guard -> sequential convert -> sequential guard -> parity+naming assertions -> manifest+README -> single zip shell-out) for any future scripts/pipeline/*.mjs batch tool"
  - "Isolated scratch-directory negative-path testing: copy the real, unmodified tool files into a throwaway cwd with a synthetic bad fixture to prove fail-closed behavior end-to-end without ever mutating the committed corpus"

requirements-completed: [PUB-01, PUB-02, PUB-03, PUB-04]

# Metrics
duration: 32min
completed: 2026-07-10
---

# Phase 126 Plan 02: Publish-Bundle Pipeline Orchestrator Summary

**Built `build-publish-bundle.mjs`, a zero-npm-dependency batch orchestrator that converts all 221 registry Status:Approved docs to `.docx` via the existing `convert.ps1`, guards every output with `guard-docx.mjs`, and — on a 100% clean pass — emits a single flat `dist/docs-library-v1.17.zip` (221 `.docx` + `manifest.csv` + `README.md`) with asserted registry parity and PUB-03 naming parity; proved the fail-closed contract both via unit self-test and a genuine isolated end-to-end negative-path run.**

## Performance

- **Duration:** ~32 min (includes a ~4m55s full-corpus batch run: 221 conversions + 221 guards)
- **Started:** 2026-07-10T21:47:00Z (approx, session start)
- **Completed:** 2026-07-10T22:08:13Z
- **Tasks:** 3 completed
- **Files modified:** 2 (1 created, 1 modified with an additive export + a blocking-issue fix)

## Accomplishments

- **Task 1:** Added `export` to `parseRegistry`, `readFile`, `slug` in `build-filename-map.mjs` (purely additive, self-test still 8/8 PASS) and regenerated `filename-map.md` (byte-identical against the live registry — no diff, confirming freshness).
- **Task 2 (TDD RED/GREEN):**
  - **RED:** `build-publish-bundle.mjs` created with the full self-test harness and 8 helper functions stubbed to throw `NOT_IMPLEMENTED`. Running `--self-test` genuinely failed (1 passed, 4 failed, exit 1), proving the orchestration logic did not exist yet.
  - **Rule 3 fix (discovered while writing RED):** importing `build-filename-map.mjs` for its exports triggered the *entire file's* top-level self-test/main-mode side effects (it would run its own self-test or its unconditional registry-parse-and-write logic and call `process.exit()` on load). Added an `isMainModule` guard (`fileURLToPath(import.meta.url) === process.argv[1]`) around both blocks. Verified direct invocation (`--self-test`, `--dry-run`) behaves identically; import-only now returns cleanly with the 3 named exports and zero side effects.
  - **GREEN:** Implemented all 8 helper functions (`parseFilenameMap`, `readFrontmatterField`, `checkFilenameMapCoverage`, `checkParity`, `checkDivergence`, `writeManifestCsv`, `validateSourcePathUnderDocs`, `validateOutputFilename`) plus `runBatch()` (preflight, selection, D-12 divergence, filename-map join, sequential convert pass, sequential guard pass, fail-closed gate, PUB-04 parity, PUB-03 naming parity, manifest+README, single `Compress-Archive` shell-out). Self-test now 7/7 PASS, exit 0.
- **Task 3 (full-corpus integration + negative-path proof):**
  - Ran `node scripts/pipeline/build-publish-bundle.mjs` from the repo root: exit 0, `dist/docs-library-v1.17.zip` written, wall-clock ~4m55s (matches RESEARCH.md's ~87s pwsh cold-start + conversion-time baseline).
  - Verified zip contents: exactly 221 `.docx` + `manifest.csv` + `README.md`, 0 subdirectory entries (flat), 223 total zip entries.
  - Verified `manifest.csv`: 222 lines (1 header + 221 rows), header exactly `RE-ID,Output Filename,Status,Last Verified`, no source-path/sha256 column.
  - Verified log line: `Registry parity: 221 Approved rows, 221 staged, 0 excluded, 0 missing, 0 orphan.`
  - Filename spot-check: RE-002 = `device-not-registered-in-autopilot.docx`, RE-003 = `esp-stuck-or-failed.docx`, RE-005 = `network-connectivity-failure.docx` — all three confirmed present in the zip and matching `filename-map.md`.
  - Cross-checked every zipped `.docx` name against `filename-map.md`: 0 misnamed (in zip, not in map), 0 missing (in map, not in zip) — full PUB-03 naming parity across all 221.
  - **Negative fail-closed proof (without mutating the committed corpus):** copied the real, unmodified `build-publish-bundle.mjs`/`build-filename-map.mjs`/`convert.ps1`/`guard-docx.mjs`/`lib/ooxml.mjs`/`reference.docx` into an isolated scratch directory with a synthetic 1-doc registry containing a deliberately leaked-YAML fixture (fenced code block with a literal `---` block, mirroring `guard-docx.mjs`'s own self-test leaked fixture). Ran the real orchestrator against that scratch corpus: `CONVERT-OK` then `GUARD-FAIL` (YAML-LEAK), exit code 1, **no zip written** in the scratch dir — proving PUB-02's fail-closed contract end-to-end (not just at the unit-test level). The real `docs/` corpus and the real `dist/docs-library-v1.17.zip` from the successful run were untouched throughout (confirmed via `git status --short -- docs/ scripts/pipeline/` showing no changes).

## Task Commits

Each task was committed atomically:

1. **Task 1: export parseRegistry/readFile/slug + regenerate filename-map.md** - `241aad8` (refactor)
2. **Task 2 RED: failing self-test for build-publish-bundle orchestrator** - `f68fde3` (test) — includes the isMainModule Rule 3 fix to `build-filename-map.mjs`
3. **Task 2 GREEN: implement build-publish-bundle.mjs orchestrator** - `3c0f6d6` (feat)
4. **Task 3: full-corpus integration run + negative-path proof** - no commit (verify-only; produces `dist/docs-library-v1.17.zip`, a gitignored runtime artifact, not a source file)

**Plan metadata:** (pending — final docs commit)

## Files Created/Modified

- `scripts/pipeline/build-publish-bundle.mjs` (NEW) - the PUB-01..04 batch orchestrator: registry-driven selection, D-12 divergence guard, PUB-03 filename-map join (fail-closed), sequential convert+guard passes with D-07 collect-all-failures, PUB-04 parity + PUB-03 naming-parity assertions, D-03 CSV manifest + D-04 static README, single `Compress-Archive` promote-and-zip, `--self-test` mode (7/7 PASS)
- `scripts/pipeline/build-filename-map.mjs` - Task 1's additive `export` on `readFile`/`slug`/`parseRegistry`; Task 2's `isMainModule` guard around both the self-test block and the main generate-mode block (Rule 3 blocking-issue fix)
- `scripts/pipeline/filename-map.md` - regenerated during both Task 1 and the Task 3 batch run; byte-identical to the pre-existing committed version each time (already fresh)

## Decisions Made

- The `isMainModule` fix was folded into the Task 2 RED commit (rather than a separate commit or amending Task 1) because it was discovered specifically while implementing Task 2's plan-mandated `import { parseRegistry, readFile } from './build-filename-map.mjs'` pattern, and RED could not be meaningfully verified (self-test genuinely running and failing, not crashing on import) without it.
- Promote+zip was implemented as a single direct `Compress-Archive` from staging to `dist/docs-library-v1.17.zip -Force`, rather than a literal two-step "copy staging to a separate build dir, then zip the build dir." This still satisfies D-07's atomic-promote intent: the zip write only ever happens after every prior pass succeeds, so a mid-run failure leaves any previously-successful zip completely untouched — there is no code path that can produce a partial/corrupt zip.
- D-12's divergence check uses exact string equality against `'Draft'` (matching CONTEXT.md's literal wording "frontmatter status:Draft"), not a looser `!== 'Approved'` check, to avoid false-positives on a hypothetical future third status value.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking issue] `build-filename-map.mjs` import triggered its own CLI side effects**
- **Found during:** Task 2 (writing the RED self-test, which imports `parseRegistry`/`readFile` per the plan's explicit instruction)
- **Issue:** `build-filename-map.mjs`'s self-test block (`if (SELF_TEST) {...}`) and its unconditional main generate-mode block (registry parse + `filename-map.md` write + `process.exit(0)`) both ran at module top level with no guard distinguishing "invoked directly" from "imported as a library." Merely running `node scripts/pipeline/build-publish-bundle.mjs --self-test` (which imports the module) triggered `build-filename-map.mjs`'s own `--self-test` output and `process.exit(0)` before `build-publish-bundle.mjs`'s own self-test code ever executed — a hard block on the plan's required reuse pattern.
- **Fix:** Added `const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);` and gated both the self-test block (`if (isMainModule && SELF_TEST)`) and the main block (`if (isMainModule && !SELF_TEST)`) behind it.
- **Files modified:** `scripts/pipeline/build-filename-map.mjs`
- **Verification:** Direct invocation unchanged — `node build-filename-map.mjs --self-test` still 8/8 PASS exit 0; `node build-filename-map.mjs --dry-run` still parses 221 rows and reports correctly. Import-only (`import('./build-filename-map.mjs')`) now returns cleanly with the 3 named exports and zero console output / zero `process.exit()` call.
- **Commit:** `f68fde3`

None of Rules 1/2/4 were triggered. No architectural changes were needed.

## Issues Encountered

None beyond the Rule 3 fix above. The full 221-doc batch run completed cleanly on the first attempt (0 conversion failures, 0 guard failures) — confirming Plan 01's corpus fixes (HYG-02/HYG-03 + the `.tmp`-leak fix) fully cleared both known pre-existing guard blockers ahead of this plan's fail-closed gate, exactly as Plan 01's SUMMARY predicted.

## User Setup Required

None — no external service configuration required. `pandoc`, `pwsh`, and `node` were already installed and version-matched on this machine (confirmed via the orchestrator's own preflight check, which ran successfully before the 221-doc loop).

## Known Stubs

None. No hardcoded empty values, placeholder text, or unwired data sources were introduced. The bundle's manifest/README are deterministic by design (D-03/D-04), not stubs.

## Threat Flags

None. All security-relevant surface (subprocess invocation, path validation, filesystem writes) was explicitly scoped in the plan's `<threat_model>` (T-126-02-01 through T-126-02-05, T-126-02-SC) and implemented per its mitigation column: `execFileSync` argv-array exclusively (no `Invoke-Expression`/`exec(`), `validateSourcePathUnderDocs` + `validateOutputFilename` defense-in-depth validators, manifest excludes source-path/sha256 by design, registry-parity + naming-parity + always-full-rebuild + atomic-promote jointly prevent a partial bundle from masquerading as complete, and zero new npm/external packages were introduced.

## Next Phase Readiness

- The PUB-01..04 hero cluster is fully delivered: `dist/docs-library-v1.17.zip` (gitignored, per-milestone versioned, never committed) is a real, verified, upload-ready artifact — 221 `.docx` + `manifest.csv` + `README.md`, flat, registry-parity-asserted, naming-parity-asserted.
- Phase 127 (HOOK-01, automated milestone-close trigger) can now invoke `node scripts/pipeline/build-publish-bundle.mjs` directly at milestone close — the orchestrator's preflight check + fail-closed exit contract already provide the graceful-degradation building block Phase 127's requirements describe (though Phase 127 must still implement its own detection/invocation mechanism and any additional degradation logic for a missing-pandoc/missing-Node environment).
- The `isMainModule` guard pattern established here should be applied to any future `scripts/pipeline/*.mjs` script whose exports get reused by a sibling orchestrator.

---
*Phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes*
*Completed: 2026-07-10*

## Self-Check: PASSED

- FOUND: scripts/pipeline/build-publish-bundle.mjs
- FOUND: scripts/pipeline/build-filename-map.mjs
- FOUND: dist/docs-library-v1.17.zip
- FOUND: .planning/phases/126-publish-bundle-pipeline-guard-blocker-corpus-fixes/126-02-SUMMARY.md
- FOUND: commit 241aad8
- FOUND: commit f68fde3
- FOUND: commit 3c0f6d6
- FOUND: commit 736b85e
