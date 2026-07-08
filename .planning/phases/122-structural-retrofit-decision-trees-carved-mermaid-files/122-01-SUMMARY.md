---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 01
subsystem: infra
tags: [nodejs, markdown-pipeline, eee-retrofit, mermaid, registry]

# Dependency graph
requires:
  - phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
    provides: retrofit-structural.mjs fork template (GLOSSARY_FILES/GUIDE_DIRS router, whole-pre-H1-span relocation, detectVhColumnCount, buildDocIdMap join-on-path)
  - phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix
    provides: STD-04 Mermaid-in-Enrolled-Classes policy (text-equivalent conversion) + C17 assertion #1 hard-fail
provides:
  - scripts/pipeline/retrofit-mermaid-structural.mjs (Phase-122 fork) with 3 new fail-closed guards + explicit-Set router + auto-filled VH date
  - 11 newly-minted RE-207..217 decision-tree registry rows, path-keyed, pre-existing before any file conversion
  - Proven fail-closed behavior against a genuinely-unconverted file + proven doc_id/doc_type join resolution for RE-212
affects: [122-02 through 122-15 (all downstream Phase-122 conversion/verification plans that invoke this fork)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Explicit path-Set router (DECISION_TREE_PATHS, ADMIN_SETUP_CARVEOUT_PATHS) instead of directory-prefix matching, to avoid reprocessing already-enrolled siblings in scattered carve-out directories"
    - "Fail-closed guard idiom extended: every new guard returns {ok:false, rel, error:'CODE: message'} and never silently skips"
    - "Code-fence masking for content-level guards (MERMAID-STILL-PRESENT) replicated verbatim from c17-eee-contract.mjs's own inCodeFence method, so the pipeline and the validator agree on what counts as a real top-level fence"

key-files:
  created: [scripts/pipeline/retrofit-mermaid-structural.mjs]
  modified: [docs/_registry/RE-index.md]

key-decisions:
  - "Expanded KNOWN_WINDOWS_KEYLESS_PATHS from the plan's literal 5-entry (decision-trees 00-04 only) proposal to the verified 12-file union across the full 30-file roster (Rule 1 bug fix)"
  - "Extended --all enumeration to include DECISION_TREE_PATHS, ADMIN_SETUP_CARVEOUT_PATHS, and ca-enrollment-timing.md so the content-based MERMAID-STILL-PRESENT guard is the sole fail-closed mechanism for --all runs (the old path-based MERMAID_DEFERRED_PATHS filter is gone)"
  - "Recorded the RE-212 directory-precedence rationale as a new 'Review Notes' section in RE-index.md (no prior precedent existed for per-row rationale notes in this file)"

patterns-established:
  - "Pattern: temp-modify-then-git-checkout-- for join-layer smoke proofs against a real tracked file, when a synthetic fixture copy would be indistinguishable from the real target for router-Set membership testing"

requirements-completed: [RETRO-05, RETRO-07, RETRO-08]

# Metrics
duration: 25min
completed: 2026-07-08
---

# Phase 122 Plan 01: Fork + Registry Prep Summary

**Phase-122 fork of retrofit-structural.mjs adding fail-closed Mermaid-absence/idempotency/keyless-Windows guards plus 11 newly-minted decision-tree registry rows — zero documents converted, tooling-only.**

## Performance

- **Duration:** ~25 min
- **Completed:** 2026-07-08
- **Tasks:** 3 completed (Task 3 produced no file diff by design — verification-only)
- **Files modified:** 2 (1 created: `retrofit-mermaid-structural.mjs`; 1 modified: `RE-index.md`)

## Accomplishments

- Forked `scripts/pipeline/retrofit-structural.mjs` into `scripts/pipeline/retrofit-mermaid-structural.mjs` without touching the Phase-121 template (byte-unchanged, verified via `git diff --stat`)
- Deleted the Phase-121 hard-exclusion Set (all 4 call sites) and replaced it with a fail-closed `MERMAID-STILL-PRESENT` body precondition using the exact code-fence masking method `c17-eee-contract.mjs` uses for its own assertion #1
- Added a `DOC-ID-ALREADY-PRESENT` idempotency guard (ERROR, never a silent skip)
- Extended the router with two new explicit path Sets (`DECISION_TREE_PATHS` → Reference, `ADMIN_SETUP_CARVEOUT_PATHS` → Guide) plus a single-path check for `ca-enrollment-timing.md` → Reference — verified an already-enrolled admin-setup sibling path is excluded from every Set
- Added an `UNKNOWN-KEYLESS-PLATFORM` guard and discovered during live verification that the plan's proposed 5-file allowlist under-counted the roster's actual keyless-Windows files by 7 (see Deviations)
- Auto-filled the Version-History reformat date (closes the DEFER-121-07-A root cause) instead of writing the literal `YYYY-MM-DD` token
- Rewrote `--self-test` to 11 sub-tests (all passing, exit 0), replacing the old test that asserted the now-deleted hard-exclusion Set
- Minted 11 path-keyed registry rows RE-207..217 for the 11 decision-trees (path order 00→10), all `Doc Type: Reference` / `Status: Pending`; verified contiguous RE-001..217 with zero gaps
- Recorded the RE-212 (`05-device-lifecycle.md`) directory-precedence rationale in a new Review Notes section
- Proved the fork fail-closes on the real, still-unconverted `docs/decision-trees/05-device-lifecycle.md` (`MERMAID-STILL-PRESENT`, no enrollment) AND proved the join layer resolves it to `doc_id=RE-212 doc_type=Reference` once mermaid is absent (via a temporary strip-then-restore proof, net zero diff on the real file)

## Task Commits

Each task was committed atomically:

1. **Task 1: Fork retrofit-structural.mjs into retrofit-mermaid-structural.mjs with the 4 guard/router changes** - `9e8a93a` (feat)
2. **Task 2: Mint RE-207..RE-217 decision-tree registry rows + RE-212 rationale note** - `edf9775` (feat)
3. **Task 3: End-to-end smoke test the fork against a real decision-tree (dry-run join)** - no commit (verification-only; produced zero net file changes — the real target file was temporarily modified for the proof, then restored via `git checkout --`, confirmed clean)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `scripts/pipeline/retrofit-mermaid-structural.mjs` - Phase-122 fork: 3 new fail-closed guards (mermaid-absence, doc_id-idempotency, keyless-non-Windows), explicit-Set router extension, auto-filled VH date, rewritten 11-subtest self-test
- `docs/_registry/RE-index.md` - 11 new rows (RE-207..217, decision-trees, Reference/Pending) + Review Notes section recording the RE-212 rationale

## Decisions Made

- **Expanded `KNOWN_WINDOWS_KEYLESS_PATHS` beyond the plan's literal proposal.** The plan's Task 1 action (5) specified a 5-entry allowlist (`decision-trees 00-04` only). Live `grep` of all 30 roster files' YAML frontmatter during Task 1 found 7 MORE genuinely-keyless files in the same 30-file roster that would have been incorrectly fail-closed by the narrower allowlist: `docs/admin-setup-apv1/00-overview.md`, `docs/admin-setup-apv1/01-hardware-hash-upload.md`, `docs/admin-setup-apv2/00-overview.md` (all `applies_to: APv1`/`APv2`, no `platform:` key), and `docs/lifecycle/00-overview.md`, `docs/lifecycle/03-oobe.md`, `docs/lifecycle/04-esp.md`, `docs/lifecycle-apv2/02-deployment-flow.md` (all keyless, Windows Autopilot classic/APv2-scoped). This matches 122-CONTEXT.md D-03's own text ("every keyless target is genuinely Windows APv1/APv2") more precisely than the RESEARCH document's narrower 5-file estimate. Used the verified 12-file union instead — see Deviations below for the full auto-fix rationale.
- **Extended `--all` enumeration to include the new explicit-Set classes.** The plan only mandated deleting the old path-based `--all` filter; extending enumeration to actually include `DECISION_TREE_PATHS`/`ADMIN_SETUP_CARVEOUT_PATHS`/`ca-enrollment-timing.md` was a natural completion so `--all` covers the whole Phase-122 roster, relying on the new content-based `MERMAID-STILL-PRESENT` guard as the sole fail-closed mechanism (exactly the design intent stated in the plan and RESEARCH).
- **Recorded the RE-212 rationale as a new "Review Notes" section** in `RE-index.md` since no prior per-row-rationale-note precedent existed in that file (it previously contained only the table plus two top-of-file WARNING/Note blockquotes).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Expanded KNOWN_WINDOWS_KEYLESS_PATHS from 5 entries to the verified 12-file union**
- **Found during:** Task 1 (writing the keyless-non-Windows guard)
- **Issue:** The plan's Task 1 action (5) and 122-RESEARCH.md both proposed a `KNOWN_WINDOWS_KEYLESS_PATHS` allowlist containing only the 5 keyless decision-trees (`00-04`). Direct `grep` of the YAML frontmatter for all 30 Phase-122 roster files (run during Task 1, before writing the guard) found 7 additional genuinely-keyless files in the SAME roster: 3 admin-setup APv1/APv2 carve-outs and 4 of the 9 Mermaid-bearing lifecycle files. Using only the narrower 5-entry allowlist as specified would have caused the fork to incorrectly `ERROR: UNKNOWN-KEYLESS-PLATFORM` on 7 legitimate, in-scope, genuinely-Windows files the first time a later Phase-122 conversion plan tried to enroll them — an incorrect fail-closed on correct data, not a safe one. 122-CONTEXT.md's own D-03 text ("every keyless target is genuinely Windows APv1/APv2") is consistent with the broader 12-file set, so this reads as an under-specification in the RESEARCH's file-count estimate rather than an intentional narrower scope.
- **Fix:** Built `KNOWN_WINDOWS_KEYLESS_PATHS` as the verified union of all 12 keyless files across the 30-file roster (5 decision-trees + 3 admin-setup APv1/APv2 + 4 lifecycle), each confirmed keyless via direct frontmatter read, with inline comments explaining why each group belongs.
- **Files modified:** `scripts/pipeline/retrofit-mermaid-structural.mjs`
- **Verification:** `--self-test` sub-test (i) confirms `docs/lifecycle/00-overview.md` (one of the 7 newly-added entries) is both keyless-injectable AND allowlisted; sub-test (h) confirms a path genuinely outside the allowlist still fail-closes correctly.
- **Committed in:** `9e8a93a` (Task 1 commit)

**2. [Rule 1 - Bug] Rephrased explanatory comments to avoid the literal deleted-constant name, satisfying the acceptance-criteria grep**
- **Found during:** Task 1 (post-write acceptance-criteria verification)
- **Issue:** The plan's acceptance criteria require `grep -c 'MERMAID_DEFERRED' scripts/pipeline/retrofit-mermaid-structural.mjs` to return exactly 0. My first draft's explanatory comments (describing what was deleted, for future-reader context) referenced the literal string `MERMAID_DEFERRED_PATHS` six times, causing the grep check to fail even though the actual constant, guard, and self-test code were correctly deleted/replaced.
- **Fix:** Reworded all 6 comment occurrences to describe "the Phase-121 hard-exclusion Set" / "the deleted hard-exclusion Set" instead of naming the literal constant, preserving the explanatory intent without the literal substring.
- **Files modified:** `scripts/pipeline/retrofit-mermaid-structural.mjs`
- **Verification:** `grep -c 'MERMAID_DEFERRED' scripts/pipeline/retrofit-mermaid-structural.mjs` returns 0; `--self-test` re-run confirms 11/11 still passing after the rewording.
- **Committed in:** `9e8a93a` (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — bug fixes; no scope creep, no architectural changes)
**Impact on plan:** Both fixes are corrections to the fork's own correctness within the plan's stated design intent (fail-closed guards must not misfire on legitimate in-scope data; the acceptance criteria must be literally satisfied). No conversion work, no registry semantics, and no downstream plan's contract changed.

## Issues Encountered

- A first attempt at the Write tool introduced two stray bare `--` lines (from markdown-style comment separators bleeding into the JS source) that would have been a syntax error at parse time. Caught immediately by `node --self-test` failing before any commit; fixed via Edit before the Task 1 commit was made. No broken state was ever committed.
- Node's regex for stripping the `\`\`\`mermaid` fence during the Task 3 join-layer proof needed a CRLF-tolerant pattern (`\`\`\`\r?\n` instead of `\`\`\`\n`) since the repo's decision-tree files are still CRLF on disk pre-conversion (consistent with 122-RESEARCH.md's documented all-30-targets-CRLF finding).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `scripts/pipeline/retrofit-mermaid-structural.mjs` is ready for all 10 remaining Phase-122 conversion/verification plans to consume — self-test green, template byte-unchanged, all 4 must-have truths from the plan frontmatter proven (mermaid-absence fail-closed, idempotency ERROR, explicit-Set routing, path-keyed registry rows pre-existing).
- All 11 decision-tree registry rows (RE-207..217) exist path-keyed and will resolve correctly the moment each file's Mermaid diagram is hand-converted to text — proven live against RE-212.
- No document was converted in this plan (by design) — the next plans in the wave (122-02 onward) do the hand-authored Mermaid→text conversion work per the LOCKED D-02 bright-line rules.
- Watch item for the next plan touching admin-setup APv1/APv2 or the 4 keyless lifecycle files: the `KNOWN_WINDOWS_KEYLESS_PATHS` allowlist now correctly includes them — no further fork changes should be needed for platform injection on those files.

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*

## Self-Check: PASSED

- FOUND: `scripts/pipeline/retrofit-mermaid-structural.mjs`
- FOUND: RE-217 row in `docs/_registry/RE-index.md`
- FOUND: `.planning/phases/122-structural-retrofit-decision-trees-carved-mermaid-files/122-01-SUMMARY.md`
- FOUND: commit `9e8a93a` (Task 1)
- FOUND: commit `edf9775` (Task 2)
