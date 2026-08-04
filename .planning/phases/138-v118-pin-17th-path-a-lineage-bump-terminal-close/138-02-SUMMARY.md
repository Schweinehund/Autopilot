---
phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close
plan: 02
subsystem: infra
tags: [validation-harness, path-a-copy, allowlist-sidecar, pin-drift-proof, regenerate-supervision-pins]

# Dependency graph
requires:
  - phase: 138-01
    provides: "V118 back-anchor pin (7af8a147) + readAtV118Close export; WAVE0_ANCHOR 64ee54dd6a4d7ec7617521a988912e10df781808; the 47-surface frozen-set inventory Plan 138-04 consumes"
provides:
  - "scripts/validation/v1.19-milestone-audit.mjs — 17th Path-A harness, C1-C17 inherited verbatim from v1.18, exits 0 --verbose on the live v1.19 corpus"
  - "scripts/validation/v1.19-audit-allowlist.json — 17th sidecar, header-fields-only copy, all 59 line-pins across 5 arrays byte-identical"
  - "BASELINE_23 audit-trail comment in regenerate-supervision-pins.mjs (append-only, coordinate array byte-unchanged)"
  - "Positive proof (not assumption) that all 59 sidecar pins are still valid: sidecar-derived 16-file pinned-file set × git diff --name-only 7af8a147..HEAD -- docs scripts .github = empty intersection"
affects: ["138-03", "138-04", "138-06"]

# Actuals (#2632)
actuals:
  tokens: 22105
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns: ["Path-A milestone-harness copy-forward (3 logical header/usage/path spots; C1-C17 inherited byte-for-byte)", "sidecar-derived pinned-file-set × git diff --name-only drift proof (covers all N pin arrays, not just one)", "BASELINE_N append-only audit-trail comment citing JIT pre-Atom-1 HEAD vs. recorded Wave-0 anchor"]

key-files:
  created:
    - scripts/validation/v1.19-milestone-audit.mjs
    - scripts/validation/v1.19-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs

key-decisions:
  - "Correction of record carried forward per CONTEXT D-20: v1.18-milestone-audit.mjs:4's claim that zero pin drift was 'positively confirmed via regenerate-supervision-pins.mjs --report' could not have proven what it claimed (report mode hardcodes the v1.7 sidecar and walks only 26 of 59 pins) — the v1.19 header states the correct instrument instead and never repeats the disproven claim"
  - "Task 2's own acceptance grep (regenerate-supervision-pins.mjs --report must be 0 occurrences in the new harness) caught that Task 1's correction sentence still quoted the disproven instrument's literal invocation string — reworded to describe the flaw without repeating it (Rule 1 self-caught deviation, fixed within this plan before the plan-completion commit)"
  - "JIT pre-Atom-1 HEAD (470387ff, captured via git rev-parse HEAD immediately before authoring the BASELINE_23 comment) is deliberately NOT the Wave-0 anchor (64ee54dd) recorded in 138-01-SUMMARY.md — Task 1's own harness-authoring commit landed between Wave-0 and Atom 1, continuing the Wave-0-vs-pre-Atom-1 distinction recurring at Phases 119/125/128/134"

patterns-established:
  - "Pinned-file drift proof via sidecar-derived file-set × git diff --name-only intersection is the correct instrument when a sidecar has multiple pin arrays with heterogeneous coverage from any single tool-mode proof"

requirements-completed: [HARN-15]

coverage:
  - id: D1
    description: "17th Path-A harness (v1.19-milestone-audit.mjs) + sidecar (v1.19-audit-allowlist.json) authored — C1-C17 inherited verbatim, sidecar wired via readFile() path, all 59 pins carried forward, harness exits 0 --verbose on the live corpus"
    requirement: "HARN-15"
    verification:
      - kind: unit
        ref: "node scripts/validation/v1.19-milestone-audit.mjs --verbose (exit 0; 16/16 checks PASS)"
        status: pass
      - kind: other
        ref: "node -e assertion: sum of 5 sidecar pin-array lengths === 59 (26+4+10+4+15)"
        status: pass
      - kind: other
        ref: "diff <(grep -v '^//' v1.18-milestone-audit.mjs) <(grep -v '^//' v1.19-milestone-audit.mjs) — confined to the sidecar readFile() path string; every C1-C17 check body identical"
        status: pass
    human_judgment: false
  - id: D2
    description: "Pinned-file zero-drift positively proven across all 59 pins by the sidecar-derived-set × git diff --name-only 7af8a147..HEAD intersection (not the 26-pin report-mode instrument); BASELINE_23 append-only audit-trail comment lands with the coordinate array byte-unchanged"
    requirement: "HARN-15"
    verification:
      - kind: other
        ref: "16-file pinned-file set (derived from all 5 sidecar arrays) × 11-file git diff --name-only 7af8a147..HEAD -- docs scripts .github changed-file list — intersection = 0"
        status: pass
      - kind: other
        ref: "grep -c BASELINE_23 regenerate-supervision-pins.mjs >= 1; git diff --numstat regenerate-supervision-pins.mjs deletions = 0"
        status: pass
    human_judgment: false

duration: 4min
completed: 2026-08-04
status: complete
---

# Phase 138 Plan 02: 17th Path-A Harness + Positive Pin-Drift Proof Summary

**Authored `v1.19-milestone-audit.mjs` (17th Path-A copy, C1-C17 inherited verbatim) + `v1.19-audit-allowlist.json` sidecar, positively proved zero drift across all 59 line-pins via the sidecar-derived-set × `git diff --name-only` instrument (not the flawed 26-pin report-mode path), and appended the BASELINE_23 audit-trail comment to `regenerate-supervision-pins.mjs`.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-08-04T05:07:49Z
- **Completed:** 2026-08-04T05:11:46Z
- **Tasks:** 2
- **Files modified:** 3 (2 created, 1 modified)

## Accomplishments
- `v1.19-milestone-audit.mjs` created as a Path-A copy of the v1.18 harness — exactly 3 logical header spots changed (lineage-chain sentence + source-of-truth pointer + sidecar-description line, the `// Usage:` filename, and the sidecar `readFile()` path string); C1-C17 check bodies are byte-for-byte identical (confirmed via comment-stripped diff)
- `--verbose` run against the live v1.19 corpus: **16 passed, 0 failed, 0 skipped**, exit 0
- `v1.19-audit-allowlist.json` created as a header-fields-only copy (`generated` + `phase` only); all 59 pins across the 5 arrays (26 supervision / 4 safetynet / 10 Knox / 4 C9 / 15 broken-link) carry forward byte-identical
- Pinned-file zero-drift **positively proven**, not assumed: derived the 16-unique-file pinned-file set from all 5 sidecar arrays, ran `git diff --name-only 7af8a147..HEAD -- docs scripts .github` (11 changed files), intersected — **0 pinned files changed**
- BASELINE_23 comment appended to `regenerate-supervision-pins.mjs`, mirroring BASELINE_22's shape; `BASELINE_9` coordinate array untouched (0 deletions in the file's diff)
- Correction of record carried forward: the v1.18 harness's disproven `--report` drift-confirmation claim is not repeated in the v1.19 header

## Task Commits

Each task was committed atomically:

1. **Task 1: Path-A copy the 17th harness + its sidecar** - `470387ff` (feat)
2. **Task 2: Prove pinned-file zero-drift with the correct instrument + append the BASELINE_23 comment** - `4cca126a` (feat) — also carries the Rule 1 self-caught fix to Task 1's file (see Deviations)

**Plan metadata:** committed alongside this SUMMARY (see final commit below)

## Files Created/Modified
- `scripts/validation/v1.19-milestone-audit.mjs` - 17th Path-A milestone audit harness, C1-C17 inherited verbatim, sidecar wired to `v1.19-audit-allowlist.json`
- `scripts/validation/v1.19-audit-allowlist.json` - 17th sidecar, 59 line-pins across 5 arrays, header-fields-only delta from predecessor
- `scripts/validation/regenerate-supervision-pins.mjs` - append-only: BASELINE_23 audit-trail comment (18 lines added, 0 deleted; `BASELINE_9` coordinate array byte-unchanged)

## Verbose Harness Summary Line (verbatim)

```
Summary: 16 passed, 0 failed, 0 skipped
```

Exit code: `0`.

## Pinned-File Drift Proof (the ~2s instrument, per CONTEXT D-20)

**Derived pinned-file set** (16 unique files, extracted from all 5 sidecar arrays covering all 59 pins — `supervision_exemptions` 26, `safetynet_exemptions` 4, `c7_knox_allowlist` 10, `c9_exemptions` 4, `c13_broken_link_allowlist` 15):

```
docs/_glossary-android.md
docs/_templates/admin-template-android.md
docs/_templates/admin-template-ios.md
docs/_templates/admin-template-macos.md
docs/_templates/admin-template.md
docs/admin-setup-android/02-zero-touch-portal.md
docs/admin-setup-android/03-fully-managed-cobo.md
docs/admin-setup-android/07-knox-mobile-enrollment.md
docs/admin-setup-android/09-aosp-realwear.md
docs/android-lifecycle/00-enrollment-overview.md
docs/android-lifecycle/03-android-version-matrix.md
docs/l1-runbooks/04-network-connectivity.md
docs/l1-runbooks/28-android-knox-enrollment-failed.md
docs/l2-runbooks/20-android-app-install-investigation.md
docs/reference/android-capability-matrix.md
docs/reference/endpoints.md
```

**`git diff --name-only 7af8a147..HEAD -- docs scripts .github`** (11 changed files, captured verbatim):

```
docs/_registry/RE-index.md
docs/_standards/EEE-SOP-standard.md
docs/index.md
docs/recipes/03-windows-11-multi-app-kiosk.md
docs/recipes/04-android-dedicated-mhs-multi-app.md
scripts/pipeline/build-filename-map.mjs
scripts/pipeline/build-publish-bundle.mjs
scripts/pipeline/filename-map.md
scripts/validation/_lib/frozen-at-close.mjs
scripts/validation/v1.19-audit-allowlist.json
scripts/validation/v1.19-milestone-audit.mjs
```

**Intersection: empty (0 pinned files changed).** None of the 16 pinned files appear in the 11-file changed list — all 59 sidecar pins remain valid. (Note: `v1.19-audit-allowlist.json` and `v1.19-milestone-audit.mjs` themselves appear in the changed-file list because this task created them — they are not pinned-file targets, they're new files this task authored.)

The report-mode instrument (`regenerate-supervision-pins.mjs --report`) was **not** run as evidence — per D-20 it hardcodes the v1.7 sidecar at line 290 (repeated at 336/530) and walks only the 26 `supervision_exemptions` pins, never seeing the other 33 across the safetynet/Knox/C9/broken-link arrays.

## BASELINE_23 Comment (JIT pre-Atom-1 SHA)

**Captured JIT pre-Atom-1 HEAD:** `470387ff7f80bba06cc120f133be641ef1833ac3` (short `470387ff`) — captured via `git rev-parse HEAD` immediately before authoring the BASELINE_23 comment.

**Deliberately NOT the Wave-0 anchor** (`64ee54dd6a4d7ec7617521a988912e10df781808`, recorded in `138-01-SUMMARY.md`): Task 1's own harness-authoring commit (`470387ff`, "feat(138-02): author 17th Path-A harness v1.19-milestone-audit.mjs + sidecar") landed between Wave 0 and this Atom-1 authoring moment, so the true pre-Atom-1 predecessor is `470387ff`, continuing the Wave-0-vs-pre-Atom-1-anchor distinction recorded at Phases 119/125/128/134.

**Coordinate array (`BASELINE_9`) byte-unchanged:** `git diff --numstat scripts/validation/regenerate-supervision-pins.mjs` = `18 0` (18 lines added, 0 deleted) — comment-append only. No line in the diff matches a coordinate-array entry pattern (`['docs/...`).

## Decisions Made

- Carried forward the CONTEXT D-20 correction of record: the predecessor harness's claim that `--report` positively confirmed zero pin drift could not have proven what it claimed; the v1.19 header states the correct instrument instead
- Task 2's own acceptance criterion (zero occurrences of the report-mode invocation string in the new harness) caught that Task 1's corrective sentence still quoted that literal string — reworded within this plan (see Deviations) rather than deferred
- BASELINE_23 cites the JIT pre-Atom-1 HEAD, not the Wave-0 anchor, per the four-close-old recurring convention

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Task 1's corrective header sentence still quoted the disproven proof-instrument's literal invocation string, failing Task 2's own acceptance grep**
- **Found during:** Task 2 (running the acceptance check `grep -c "regenerate-supervision-pins\.mjs --report" scripts/validation/v1.19-milestone-audit.mjs` — expected 0, got 1)
- **Issue:** Task 1's Sidecar allow-list header comment explained the D-20 correction of record by literally citing `` `regenerate-supervision-pins.mjs --report` `` inside a "NOT via X" clause. The literal substring survived even though the intent (don't cite it as proof) was honored — Task 2's acceptance criterion tests the literal string, not the semantic intent.
- **Fix:** Reworded the sentence to describe the report-mode flaw (hardcodes v1.7 sidecar, walks only 26/59 pins) without repeating the disproven instrument's exact invocation string.
- **Files modified:** `scripts/validation/v1.19-milestone-audit.mjs`
- **Verification:** `grep -c "regenerate-supervision-pins\.mjs --report" scripts/validation/v1.19-milestone-audit.mjs` now returns `0`; harness re-run confirms `--verbose` still exits 0 (16/16 PASS) after the wording change.
- **Committed in:** `4cca126a` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 Rule 1 bug)
**Impact on plan:** Self-caught within the same plan by the next task's own acceptance criteria; no scope creep, no architectural change.

## Issues Encountered

None beyond the self-caught deviation above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `v1.19-milestone-audit.mjs` + `v1.19-audit-allowlist.json` are ready for Plan 138-03's `check-phase-138.mjs` apex to reference as the harness-run job target
- BASELINE_23 is recorded; `BASELINE_24` is explicitly deferred to the next milestone close per the Path-A inheritance chain
- Zero pin drift proven across all 59 pins — Plan 138-03/138-06 can cite this proof directly without re-deriving
- No blockers or concerns carried forward

---
*Phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-04*

## Self-Check: PASSED

- FOUND: `.planning/phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-02-SUMMARY.md`
- FOUND: `scripts/validation/v1.19-milestone-audit.mjs`
- FOUND: `scripts/validation/v1.19-audit-allowlist.json`
- FOUND: commit `470387ff`
- FOUND: commit `4cca126a`
