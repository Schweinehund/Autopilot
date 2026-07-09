---
phase: 125-v115-pin-14th-path-a-lineage-bump-terminal-close
plan: 02
subsystem: infra
tags: [audit-harness, sidecar-repoint, milestone-close, validation]

# Dependency graph
requires:
  - phase: 125-01
    provides: Wave-0 anchor SHA, V115 confirmation, and the discovery that 3 android sidecar-pinned files (not 0) need a targeted C2/C7/C9 line-pin repoint
provides:
  - "v1.16-milestone-audit.mjs -- 14th Path-A copy of the C1-C17 harness (v1.15 lineage), sidecar-path repointed to v1.16-audit-allowlist.json"
  - "v1.16-audit-allowlist.json -- targeted C2/C7/C9 line-pin repoint for the 3 retrofitted android files, 5 stable files carried verbatim"
  - "BASELINE_20 freshness comment in regenerate-supervision-pins.mjs, back-anchored to the JIT pre-Atom-1 HEAD 0d01eae"
  - "Atom-1 commit c0e3626 -- the harness-core deliverable that Atom 2 (125-03) and the close-gate depend on"
affects: [125-03, 125-04, 125-05, 125-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [Path-A harness copy-and-repoint (14th lineage bump), targeted sidecar line-pin repoint scoped to only the files an EEE retrofit actually touched (119-02 precedent at smaller scale), JIT pre-commit anchor capture for BASELINE freshness comments]

key-files:
  created:
    - scripts/validation/v1.16-milestone-audit.mjs
    - scripts/validation/v1.16-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs

key-decisions:
  - "v1.16-audit-allowlist.json is NOT a verbatim copy: 26 supervision_exemptions entries (vs v1.15's 22) because C17 #12 blockquote-splitting fragmented 2 previously single-line disambiguation blockquotes in docs/_glossary-android.md into multiple physical lines, each independently carrying a supervision match -- count growth confirmed necessary (not arbitrary) via direct line-by-line diff against the pre-retrofit V115 (29a3599) file content"
  - "BASELINE_20 back-anchored to the JIT pre-Atom-1 HEAD 0d01eae8026318f74b4fb95624b247df575b38c7, captured via git rev-parse HEAD immediately before the commit -- distinct from the Wave-0 anchor 42b31c5599f56dcd799a983b24d84940c665555b recorded in 125-01, per the Pitfall-2 discipline (no intervening commit landed between Wave-0 and this JIT capture this time, but the two anchors are tracked as separate values by design)"
  - "regenerate-supervision-pins.mjs --self-test remains RED after this task -- confirmed via git-show diff that the identical FAIL (classifier vs. hand-authored BASELINE_9 divergence) already existed on the pre-edit committed file, i.e. NOT introduced by the BASELINE_20 comment insertion. This is the same class of pre-existing, out-of-scope condition 119-02 recorded at v1.14-close (7d922a7): the fix belongs to the BASELINE_9 array itself, which is explicitly outside this task's 3-file, comment-only scope (the read_first for Task 3 says not to read/alter beyond the const BASELINE_9 = [ line)"
  - "Did NOT run requirements.mark-complete for HARN-06 -- this plan ships only Atom 1 of the multi-atom HARN-06 deliverable (Atom 2, the Axis-2 re-audit, the emergent remediation slot, and the close-gate still remain); mirrors 119-02's precedent of not flipping the requirement until the close-gate (125-07 equivalent) lands"

requirements-completed: []  # HARN-06 not fully satisfied by Atom 1 alone; flips at the close-gate

# Metrics
duration: 55min
completed: 2026-07-09
---

# Phase 125 Plan 02: Atom 1 -- v1.16 Milestone Audit Harness + Sidecar Repoint + BASELINE_20 Summary

**Shipped Atom 1 as one indivisible 3-file commit (c0e3626): the 14th Path-A `v1.16-milestone-audit.mjs` harness copy (C1-C17 inherited verbatim), a `v1.16-audit-allowlist.json` sidecar carrying a targeted C2/C7/C9 line-pin repoint for the 3 android files the Phase-121/122 EEE retrofit actually touched, and a JIT-anchored BASELINE_20 freshness comment -- with C2/C7/C9 empirically confirmed GREEN (0 un-exempted) against HEAD.**

## Performance

- **Duration:** 55 min
- **Started:** 2026-07-09T16:35:00Z (approx, per plan-load)
- **Completed:** 2026-07-09T17:30:00Z (approx)
- **Tasks:** 3 completed
- **Files modified:** 3 (2 created, 1 modified) -- exactly Atom 1's scope

## Accomplishments

- `scripts/validation/v1.16-milestone-audit.mjs` authored as a faithful Path-A copy of v1.15 (C1-C17 inherited verbatim; C17 already folded via `execFileSync` subprocess-spawn of `c17-eee-contract.mjs`, not re-folded). The single functional change is the `parseAllowlist()` sidecar-path literal, repointed to `v1.16-audit-allowlist.json`. `--self-test` exits 0 (9/9 synthetic assertions pass).
- `scripts/validation/v1.16-audit-allowlist.json` authored as a **targeted** repoint (not a verbatim copy, superseding the RESEARCH's clean-copy expectation per 125-01's correction): the C2 (supervision), C7 (bare Knox), and C9 (COPE) exemption pins for the 3 retrofitted android files (`docs/_glossary-android.md`, `docs/android-lifecycle/00-enrollment-overview.md`, `docs/android-lifecycle/03-android-version-matrix.md`) were each re-verified against the live file and repointed; the other 5 C2/C7/C9-pinned files (confirmed 0 commits since V115 in 125-01) were carried byte-unchanged.
- Empirically confirmed: `node scripts/validation/v1.16-milestone-audit.mjs --verbose` reports **16 passed, 0 failed, 0 skipped** -- C2, C7, C9 all PASS on HEAD (the authoritative proof the plan's critical_notes demanded before marking Task 2 done).
- `scripts/validation/regenerate-supervision-pins.mjs` gained a BASELINE_20 freshness comment, back-anchored to the JIT pre-Atom-1 HEAD `0d01eae8026318f74b4fb95624b247df575b38c7` (captured via `git rev-parse HEAD` immediately before the commit). The `BASELINE_9` array itself and the 3 `v1.7-audit-allowlist.json` self-test references were left untouched.
- Atom 1 committed as ONE indivisible commit `c0e3626` containing exactly 3 files (`git show --stat HEAD` verified); no Atom-2 file (check-phase validator, `frozen-at-close.mjs`, or CI workflow) leaked in; no deletions.

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1-3 | Atom 1: harness + sidecar repoint + BASELINE_20 (one indivisible commit per D-125-3) | `c0e3626` | `scripts/validation/v1.16-milestone-audit.mjs`, `scripts/validation/v1.16-audit-allowlist.json`, `scripts/validation/regenerate-supervision-pins.mjs` |

Per the plan's explicit design (D-125-3 / the plan's own frontmatter), Atom 1 is authored across all 3 tasks but lands as a single indivisible git commit -- there is no separate per-task commit for Tasks 1 and 2; the harness and sidecar files were staged only at Task 3's commit point after the full targeted repoint was empirically verified GREEN.

## Files Created/Modified

- `scripts/validation/v1.16-milestone-audit.mjs` (created, 1010 lines) -- Path-A copy of v1.15, C1-C17 inherited verbatim, sidecar-path repointed
- `scripts/validation/v1.16-audit-allowlist.json` (created, 561 lines) -- targeted C2/C7/C9 repoint for 3 files; 5 stable files verbatim; phase-string + generated-timestamp repointed
- `scripts/validation/regenerate-supervision-pins.mjs` (modified, +9 lines) -- BASELINE_20 comment appended after BASELINE_19, before `const BASELINE_9 = [`

## Sidecar Repoint Detail (the empirical work)

For each of the 3 retrofitted files, the exact live-file line for every currently-matching occurrence was located by direct content comparison against the pre-retrofit V115 (`29a3599`) file, then cross-referenced to the original v1.15 pin's `reason` text to confirm content identity (not a blind line-shift):

| File | v1.15 entries | v1.16 entries | Why the count changed |
|------|--------------:|--------------:|------------------------|
| `docs/_glossary-android.md` (supervision_exemptions) | 9 | 13 | C17 #12 word-preserving blockquote-splitting fragmented 2 previously single-line disambiguation blockquotes (old lines 51 and 71) into 2 and 4 physical lines respectively, each independently carrying a `supervision`-family match; confirmed by direct diff against the V115 file (`git show 29a3599:docs/_glossary-android.md`) -- the underlying prose is unchanged, only its physical line-wrapping |
| `docs/_glossary-android.md` (c7_knox_allowlist) | 5 | 5 | Clean 1:1 remap (no split -- Knox mentions sit in plain paragraphs, not blockquotes, so C17 #12 does not apply) |
| `docs/_glossary-android.md` (c9_exemptions) | 1 | 1 | Clean 1:1 remap (Version History table row, single line preserved) |
| `docs/android-lifecycle/00-enrollment-overview.md` (supervision_exemptions) | 3 | 3 | Clean 1:1 remap, uniform +14 shift (plain paragraphs, not blockquotes; not subject to #12 splitting) |
| `docs/android-lifecycle/03-android-version-matrix.md` (c9_exemptions) | 1 | 1 | Clean 1:1 remap (H3 heading, single line, +17 shift) |
| **Other 5 stable files (all C2/C7/C9 arrays)** | unchanged | unchanged | Byte-unchanged since V115 close (0 commits) -- copied verbatim, not touched |

Net effect: `supervision_exemptions` grew from 22 to 26 total entries (all 4 new entries confined to `docs/_glossary-android.md`); `c7_knox_allowlist` (10), `c9_exemptions` (4), `safetynet_exemptions` (4), and `c13_broken_link_allowlist` (15) all held their exact v1.15 counts. The plan's "preserve every array entry count verbatim" guidance is honored for every array except the one where the EEE retrofit's own blockquote-splitting transform made honoring it impossible while also reaching the empirically-mandated GREEN state; this is documented as a deliberate, content-verified deviation below, not a silent divergence.

## Verification

```
$ node scripts/validation/v1.16-milestone-audit.mjs --verbose
[1/16] C1  PASS   [2/16] C2  PASS   [3/16] C3  PASS   [4/16] C4  PASS
[5/16] C5  PASS   [6/16] C6  PASS   [7/16] C7  PASS   [9/16] C9  PASS
[10/16] C10 PASS  [11/16] C11 PASS  [12/16] C12 PASS  [13/16] C13 PASS
[14/16] C14 PASS  [15/16] C15 PASS  [16/16] C16 PASS  [17/16] C17 PASS
Summary: 16 passed, 0 failed, 0 skipped

$ node scripts/validation/v1.16-milestone-audit.mjs --self-test
Self-test: 9 passed, 0 failed

$ git show --stat HEAD
 scripts/validation/regenerate-supervision-pins.mjs |    9 +
 scripts/validation/v1.16-audit-allowlist.json      |  561 +++++++++++
 scripts/validation/v1.16-milestone-audit.mjs       | 1010 ++++++++++++++++++++
 3 files changed, 1580 insertions(+)

$ git diff --diff-filter=D --name-only HEAD~1 HEAD
(empty -- no deletions)
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug, mid-task] Forgot to update the `line` field for 2 repointed entries on first draft**
- **Found during:** Task 2 verification (first `--verbose` run after writing the sidecar)
- **Issue:** When drafting the targeted repoint, the MHS blockquote entry (was line 183) and the Phase-34 changelog entry (was line 200) had their `reason` text updated to describe the new content but the `line` value itself was left at the old number -- a copy-paste slip.
- **Fix:** Corrected `line` to 304 (MHS blockquote fragment) and 334 (Phase-34 changelog row) respectively, re-verified against the live file.
- **Files modified:** `scripts/validation/v1.16-audit-allowlist.json`
- **Verification:** Re-ran `--verbose`; both lines cleared.
- **Committed in:** `c0e3626`

**2. [Rule 1 - Bug, mid-task] Entire docs/reference/android-capability-matrix.md supervision_exemptions block (7 entries) and the docs/_glossary-android.md line-331 changelog entry were omitted on first draft**
- **Found during:** Task 2 verification (second `--verbose` run)
- **Issue:** `docs/reference/android-capability-matrix.md` is one of the 5 STABLE files (0 commits since V115) that must be carried verbatim -- its 7 pre-existing `supervision_exemptions` entries were accidentally dropped when authoring the new `supervision_exemptions` array from scratch instead of extending the copied v1.15 array. Similarly, one `docs/_glossary-android.md` entry (the Phase-59 changelog row, old line 197) was missed.
- **Fix:** Re-added all 7 `docs/reference/android-capability-matrix.md` entries verbatim (same {file, line, reason} as v1.15 -- this file is unaffected by the v1.16 retrofit) and added the missing `docs/_glossary-android.md` line-331 entry.
- **Files modified:** `scripts/validation/v1.16-audit-allowlist.json`
- **Verification:** `--verbose` now reports C2/C7/C9 all PASS, 16/16 checks green.
- **Committed in:** `c0e3626`

### Deferred Issues (pre-existing, out of scope)

**`regenerate-supervision-pins.mjs --self-test` remains RED (exit 1) after Task 3.** Confirmed via `git show HEAD:scripts/validation/regenerate-supervision-pins.mjs` (the pre-edit committed file) that the identical FAIL -- the script's own classifier diverging from its hand-authored `BASELINE_9` array on `docs/_glossary-android.md` and `docs/reference/android-capability-matrix.md` line positions -- already existed before this task's BASELINE_20 comment was appended. This is the same class of issue 119-02 recorded and deferred at v1.14-close (`7d922a7`), and it is explicitly out of Task 3's scope: the fix belongs to the `BASELINE_9` array itself, and the Task 3 `read_first` explicitly instructs not to read or alter anything beyond the `const BASELINE_9 = [` insertion point. Logged here for the close-gate / Wave-5 remediation-slot owner; NOT auto-fixed (Rule 1 scope boundary: pre-existing, unrelated to this task's edit).

**Total deviations:** 2 auto-fixed (both Rule 1, both caught before commit via the plan's own mandated empirical verification loop), 1 deferred (pre-existing, out of scope, documented for downstream plans).
**Impact on plan:** None on scope or correctness -- both auto-fixed issues were caught and corrected before the commit landed; the deferred issue was independently confirmed pre-existing and unrelated.

## Issues Encountered

None beyond the two auto-fixed sidecar-authoring slips and the one pre-existing deferred `regenerate-supervision-pins.mjs --self-test` RED, both documented above.

## Next Phase Readiness

- Plan 125-03 (Atom 2) can proceed: `_lib/frozen-at-close.mjs`'s `readAtV115Close` helper does not yet exist (that's Atom 2's own job per D-125-1's dependency note), and the `check-phase-120..125` validators + CI workflow are unblocked by anything in this plan.
- The JIT pre-Atom-1 anchor `0d01eae8026318f74b4fb95624b247df575b38c7` is recorded here for any downstream plan that needs it (distinct from the Wave-0 anchor `42b31c5599f56dcd799a983b24d84940c665555b` used by 125-04's predecessor-byte-unchanged gate).
- The pre-existing `regenerate-supervision-pins.mjs --self-test` RED is flagged for the Wave-5 emergent-remediation-slot owner (125-05) or the close-gate (125-07) traceability write-up -- it is NOT part of the 4 named flag-#6 drift candidates (`check-phase-30/51/92/99`) from 125-01, and is a separate, smaller, pre-existing advisory-only issue.
- No blockers.

---
*Phase: 125-v115-pin-14th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-09*

## Self-Check: PASSED

- FOUND: `scripts/validation/v1.16-milestone-audit.mjs`
- FOUND: `scripts/validation/v1.16-audit-allowlist.json`
- FOUND: `.planning/phases/125-v115-pin-14th-path-a-lineage-bump-terminal-close/125-02-SUMMARY.md`
- FOUND: commit `c0e3626`
