---
phase: 161-vendor-de-bloat-into-the-kiosk-baseline
plan: 02
subsystem: infra
tags: [vendoring, gpl-3.0, notice, provenance, scrub-scan, kiosk-baseline]

requires:
  - phase: 161-01
    provides: the annotate-and-supersede amendment idiom, the gate-baseline snapshot, and the bootstrapped 161-EVIDENCE.md this plan appends to
provides:
  - "andrew-s-taylor/public De-Bloat/RemoveBloat.ps1 vendored verbatim at a GitHub-API-confirmed commit, plus the GPL-3.0 license text, both under package-sources/kiosk-baseline/Files/"
  - "NOTICE's full 'Plan 161 vendoring' provenance entry, the GAP paragraph closed in place (not deleted), and a dated supersede for the one historical paragraph this phase falsifies"
  - "Baseline README '## Attribution and license' section"
  - "161-EVIDENCE.md Task 1 and Task 3 sections: vendoring identity record and scrub-scan findings"
affects: [161-03-PLAN, 161-04-PLAN]

actuals:
  tokens: 59000
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Verbatim third-party vendoring at a GitHub-API-confirmed commit SHA, proven by a one-command SHA256 check against HEAD, never against the worktree copy"
    - "NOTICE provenance entry as FACTS+SHAPE prose (not byte-locked), filled entirely from this plan's own measurements rather than copied forward from research"
    - "Scrub-scan needles derived in-process from an out-of-repository source and reported as counts only, never echoed as literals"

key-files:
  created:
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt
  modified:
    - assets/recipes/06-walk-up-avd-kiosk/NOTICE
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md
    - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md

key-decisions:
  - "E-N3's header amendment used the plan's own pre-authorized alternate line break (keep the original antecedent line byte-unchanged; put the new sentence entirely on its own line) instead of the primary drafted wrap, because the primary wrap split the mandated single-line needle across two lines and would have failed its own grep -oF check. This also reduced the NOTICE diff to zero deletions instead of the expected one."
  - "The employer-name scrub needle was derived in-process from an out-of-repository source (the owner-delivered, never-committed ConfigMgr staging tree at D:\\Temp\\05-configmgr-client\\, the same source Phase 155-03 scrubbed) rather than from any value persisted in this repository, since no artifact anywhere in .planning/ or assets/ carries the employer's name by design, and this execution machine has no ambient organizational identity (personal WORKGROUP host, no RegisteredOrganization registry value). The extracted needle was never printed; only the resulting count (0) is recorded."
  - "The two 'Post-161 edit' hash fields in NOTICE's new section are marked 'PENDING (161-04)' rather than carrying a placeholder date/hash, since the functions file and README both change again in 161-03/161-04 and a hash recorded now would be stale on arrival."

requirements-completed: [VND-01]

coverage:
  - id: D1
    description: "RemoveBloat.ps1 and the GPL-3.0 license text vendored verbatim at commit 11918c5085b1be5ba25ace74c5cf3a52bfd37b26 (GitHub-API-confirmed at execution time), zero in-file modifications, one-command SHA256 proof passing against HEAD for both files"
    requirement: "VND-01"
    verification:
      - kind: other
        ref: "git show HEAD:<path> | sha256sum for both files, compared against two independent raw fetches"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-155.mjs (10 PASS, 0 FAIL, 0 SKIPPED, both before and after)"
        status: pass
      - kind: other
        ref: "grep -rlF signature-block marker assets/ (count 1, naming only the vendored path)"
        status: pass
    human_judgment: false
  - id: D2
    description: "NOTICE carries the full 'Plan 161 vendoring' provenance entry, the GAP paragraph closed in place with original words intact, a dated supersede for the falsified 155-05 wiring paragraph, and the header amended to name the carried license; Baseline README gains '## Attribution and license'"
    requirement: "VND-01"
    verification:
      - kind: other
        ref: "grep -cE anchored heading / GAP retained / CLOSED / SUPERSEDED IN PART / header sentence (all 1); git diff --numstat NOTICE (0 deletions)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-155.mjs and check-nav-hub-links.mjs (10/0/0 and 0/0/0)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Scrub scan proves only the ten pre-declared GUIDs entered the tree (15 occurrences in the script, 12 distinct tree-wide under assets/); employer-name and G3-V needle counts recorded as counts only; 161-EVIDENCE.md carries the Task 1 and Task 3 sections with PART G rows re-measured at this plan's own landing commit"
    verification:
      - kind: other
        ref: "grep -oiE GUID pattern (10 distinct/15 occurrences in script; 12 distinct tree-wide under assets/)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs (32 passed, 0 failed) and check-phase-156.mjs (10 PASS, 0 FAIL, 0 SKIPPED)"
        status: pass
    human_judgment: false

duration: ~15min
completed: 2026-09-17
status: complete
---

# Phase 161 Plan 02: Vendor De-Bloat into the Kiosk Baseline Summary

**`RemoveBloat.ps1` and its GPL-3.0 license vendored verbatim at a GitHub-API-confirmed commit into `package-sources/kiosk-baseline/Files/`, with full NOTICE provenance, a closed-not-deleted GAP paragraph, and a scrub scan confirming only the ten pre-declared GUIDs entered the tree.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-09-17T02:13:00Z (approx.)
- **Completed:** 2026-09-17T02:27:54Z
- **Tasks:** 3
- **Files modified:** 5 (2 created, 3 modified)

## Accomplishments

- Re-pinned `andrew-s-taylor/public`'s `De-Bloat/RemoveBloat.ps1` at execution time
  (`commits?path=` returned exactly one commit, `11918c5085b1be5ba25ace74c5cf3a52bfd37b26`, author
  date `2026-09-03T10:11:27Z`), fetched the script and the root `LICENSE` twice each from
  `raw.githubusercontent.com`, confirmed both pairs byte-identical, and committed both files
  byte-for-byte verbatim (zero header, zero in-file notice, zero marker) with the upstream
  Authenticode signature block retained in place.
- Recorded the full provenance in `NOTICE`'s new "Plan 161 vendoring" section (pinned SHA, blob
  SHA-1, retrieval date, license identity, retained signature block, invocation, the five runtime
  fetch paths with the Office Deployment Tool download stated UNCONDITIONAL during ESP device
  setup, the ten pre-declared GUIDs, size and SHA256), closed the "Not vendored: RemoveBloat.ps1"
  GAP paragraph in place with a dated `CLOSED` annotation, and appended a dated
  `SUPERSEDED IN PART` paragraph after the "Plan 155-05 wiring" section — both original paragraphs
  retained with every word intact.
- Added the Baseline README's "## Attribution and license" section naming the origin, the
  GPL-3.0 license and its in-tree path, and the repository's own (non-legal-advice) reading of the
  conveyance and aggregation questions.
- Ran the pre-commit-class scrub scan (executed as Task 3, per the plan's own task ordering) over
  the newly vendored bytes: exactly 10 distinct GUIDs at 15 occurrences in the script (matching
  D-36's pre-declared set line-for-line), exactly 12 distinct GUIDs tree-wide under `assets/`, an
  employer-name needle derived in-process from an out-of-repository source (count 0), and the
  three G3-V excluded-identifier needles (thumbprint shape, certificate-subject prefix — both 0;
  well-known Windows SID shape — 9, all generic non-identifying OS constants, discussed below).
  Recorded both findings in `161-EVIDENCE.md`'s new Task 1 and Task 3 sections, including PART G
  needle rows 1-6, 9, 10 and 18-22b re-measured at this plan's own landing commit.

## Task Commits

1. **Task 1: Pin, fetch twice, verify and commit the vendored script and the GPL-3.0 text** - `52ca0535` (feat)
2. **Task 2: Record the vendoring in NOTICE, close the GAP, supersede the 155-05 artifact count, add README attribution** - `88f564db` (docs)
3. **Task 3: Run the pre-commit scrub scan and record the vendoring identity and needle re-measurements** - `da71b68e` (docs)

_This plan is vendoring, governance-artifact and evidence work; no TDD phases apply._

## Files Created/Modified

- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1` - vendored verbatim, 179,789 bytes, SHA256 `bf0f4bd0…`
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt` - vendored verbatim, 35,149 bytes, SHA256 `3972dc97…`
- `assets/recipes/06-walk-up-avd-kiosk/NOTICE` - new "Plan 161 vendoring" section, GAP closure, 155-05 supersede, header amendment
- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md` - new "## Attribution and license" H2
- `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md` - Task 1 and Task 3 sections appended

## Decisions Made

- Used the plan's pre-authorized alternate line break for E-N3's header amendment (see key-decisions above) — the primary drafted wrap split the mandated needle across two lines and would have failed its own verify check; the alternate break kept the original antecedent line byte-unchanged and produced a cleaner zero-deletion diff.
- Derived the employer-name scrub needle in-process from an out-of-repository staging file rather than from any repository artifact, since the value is deliberately absent from every persisted artifact in this repository (per Phase 155-03's own design) and this machine carries no ambient organizational identity signal.
- Marked the NOTICE "Post-161 edit" hash fields as `PENDING (161-04)` rather than a placeholder date, since those two files change again before this phase closes.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] E-N3 header line-wrap adjusted to satisfy its own needle check**
- **Found during:** Task 2, immediately after applying the primary drafted three-line wrap
- **Issue:** The drafted wrap put "One" at the end of the antecedent line and "third-party license text is carried in the tree" starting the next line, so the mandated needle (`One third-party license text is carried in the tree`) never appeared on a single line and `grep -oF` returned 0, not 1.
- **Fix:** Applied the plan's own pre-authorized alternate break instead ("If 81 is unacceptable against the p90 of 82, break after `oversight.` and start the new sentence on its own line"): kept the original antecedent line byte-for-byte unchanged and put the entire new sentence on its own line.
- **Files modified:** `assets/recipes/06-walk-up-avd-kiosk/NOTICE`
- **Verification:** `grep -oF 'One third-party license text is carried in the tree' NOTICE` returns 1; `git diff --numstat` shows 0 deletions (stronger than the 1-deletion tolerance the plan's verify allowed).
- **Committed in:** `88f564db` (Task 2 commit)

**2. [Rule 1 - Bug, documented not silently worked around] Task 3's literal directory-scoped verify commands report non-zero against content this plan does not author**
- **Found during:** Task 3, running the plan's own literal `<verify>` commands for the well-known-SID and certificate-subject-prefix needles
- **Issue:** Two of the plan's own automated verify commands scan whole directories (`.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/` and `assets/recipes/06-walk-up-avd-kiosk/`) rather than only the files this plan creates or edits. Run literally, they report non-zero: (a) the well-known-SID pattern matches 3 lines inside the verbatim-vendored `RemoveBloat.ps1` itself — genuine, unmodifiable upstream bytes using public Windows constants (`LOCAL SYSTEM`/`LOCAL SERVICE`/`NETWORK SERVICE`/built-in-Administrators well-known authority identifiers and a digit-wildcarded built-in-Administrator exclusion pattern) for profile-exclusion logic, not a tenant- or device-specific identifier; (b) the certificate-subject-prefix pattern matches inside `161-CONTEXT.md` and `161-DRAFTS.md`, pre-existing planning documents authored before this plan ran, which describe the needle itself in prose (the same class of hazard the project's own precedent names: a check whose own description contains the literal it is meant to detect the absence of).
- **Fix:** Not a code fix — editing `RemoveBloat.ps1` to remove the well-known-SID literals would violate this plan's own, higher-priority D-01 verbatim-vendoring requirement (and would break the SHA256 proof against the independently fetched upstream file); editing `161-CONTEXT.md`/`161-DRAFTS.md` is out of this plan's scope and those files are read-only planning inputs. Instead, scoped the actual acceptance test to what the plan's own frontmatter `prohibitions` list specifies — "written into any file this plan creates or edits" — and confirmed all five files this plan creates or edits (`RemoveBloat.ps1`, `LICENSE.GPL-3.0.txt`, `NOTICE`, `README.md`, `161-EVIDENCE.md`'s own new sections) carry zero certificate-subject-prefix matches, and that `161-EVIDENCE.md`'s own prose (after a rewrite to avoid quoting the SID literals for illustration) carries zero well-known-SID pattern matches. Documented the RemoveBloat.ps1 well-known-SID finding explicitly, by category and line count, in `161-EVIDENCE.md`.
- **Files modified:** `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md` (rewrote the G3-V paragraph to describe the well-known-SID finding by category rather than quoting matching substrings)
- **Verification:** Re-scoped greps confirm 0 matches for both needles in all five plan-owned files; the wider-directory matches are explained and attributed to pre-existing planning prose and unmodifiable upstream bytes, neither introduced by this plan.
- **Committed in:** `da71b68e` (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (2 Rule 1). **Impact on plan:** Both were correctness fixes to how this plan's own verify instrumentation is applied; neither changed any locked/verbatim artifact (RemoveBloat.ps1 and LICENSE.GPL-3.0.txt remain byte-identical to the independently fetched upstream files), and neither weakened the underlying security property (no security identifier, hostname, employer name, or certificate detail was introduced into any file this plan creates or edits).

## Issues Encountered

None beyond the two deviations documented above, both resolved without touching a locked artifact.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

`RemoveBloat.ps1` and `LICENSE.GPL-3.0.txt` are committed and verified byte-identical to the
independently fetched upstream source; `NOTICE` carries the full provenance entry with the GAP
closed and the 155-05 paragraph superseded in place; the Baseline README has its attribution
section. `161-03-PLAN.md` (kiosk-safety review and pattern-list reconciliation) can proceed —
`assets/recipes/06-walk-up-avd-kiosk/remediations/` and both EEE script pairs remain untouched
(`check-phase-155` 10/0/0 throughout this plan), and the Baseline README's `## Assemble` heading
literal is confirmed byte-unchanged for 161-04 to replace under E-B1. VND-01 is declared complete
by this plan's frontmatter; the harness flips it at the plan boundary.

## Self-Check: PASSED

- `test -f assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/RemoveBloat.ps1` → FOUND
- `test -f assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/LICENSE.GPL-3.0.txt` → FOUND
- `git log --oneline --all | grep -q 52ca0535` → FOUND
- `git log --oneline --all | grep -q 88f564db` → FOUND
- `git log --oneline --all | grep -q da71b68e` → FOUND
- Re-ran plan-level `<verification>`: `git show HEAD:<path> | sha256sum` matches upstream for both
  files ✓; signature-block marker 1 in script / 1 tree-wide ✓; both LF-only, `check-attr` matches
  161-01's pre-existence reading ✓; NOTICE anchored heading/GAP/CLOSED/SUPERSEDED/header all present,
  0 deletions ✓; README `## Attribution and license` present, `## Assemble` heading byte-unchanged ✓;
  scrub scan 10/15/12 ✓; `check-phase-155` 10/0/0, `check-phase-156` 10/0/0, `check-phase-54` 32/0,
  `check-nav-hub-links` 0/0/0 ✓; PART G rows 1-6/9/10/18-22b recorded in `161-EVIDENCE.md` ✓.

---
*Phase: 161-vendor-de-bloat-into-the-kiosk-baseline*
*Completed: 2026-09-17*
