---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 03
subsystem: docs-corpus-content
tags: [hyg-02, leak-class, needle-class, c17-eee-contract, corpus-wide-closure]

requires:
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 02
    provides: "The fixed substitution vocabulary (PITFALLS.md -> pitfall register, FEATURES.md ->
      feature research, STACK.md -> stack research, RESEARCH.md -> phase research, ROADMAP.md
      SC#N -> phase success criterion #N, 62-08-PLAN -> Phase 62 plan) established across the
      Apple Business subtree, reused here unchanged for the remaining 35 sites"
provides:
  - "Both of HYG-02's originally named defects corrected (co-management migration-paths
    internal-requirement-document parenthetical dropped; patch-management overview roadmap
    citation truncated)"
  - "All ten members of the operations cross-reference clone family made uniform, including two
    that leaked across a three-line wrap"
  - "docs/v1.9-DEFERRED-CLEANUP.md's PSSO-FUT-01 line corrected in place, file retained at its path"
  - "The remaining 26 sites across 20 files closed with three new vocabulary mappings
    (REQUIREMENTS.md -> requirement set, SUMMARY.md -> research summary, SC#N ROADMAP literal ->
    phase success criterion #N literal)"
  - "The corpus-wide HYG-02 criterion closed: all three needles (literal, FIX-11 two-prefix, and
    the widened class) return 0 across all of docs/, proven by positive controls, with the apex
    chain measured equal to the phase baseline"
affects: [157-04]

actuals:
  tokens: 42000
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Exact-substring substitution asserted to occur exactly once per file before writing,
      mirroring plan 02's line-targeted approach rather than a whole-file regex replace"
    - "Wrapped-construction awareness: a parenthetical spanning three lines was removed and the
      bullet rejoined as a single replacement block, not a per-line deletion, avoiding the
      line-oriented-guard failure mode this repository has previously shipped"
    - "Positive-control-before-trust: all three needles (not just the widened class needle) were
      proven able to fire against a known-bad scratch file before the corpus's own three zeros
      were reported as meaningful"

key-files:
  modified:
    - docs/operations/co-management/03-cocmgmt-migration-paths.md
    - docs/operations/patch-management/00-overview.md
    - docs/operations/app-lifecycle/00-overview.md
    - docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md
    - docs/operations/drift-migration/00-overview.md
    - docs/operations/drift-migration/01-windows-drift-detection.md
    - docs/operations/drift-migration/02-macos-drift-detection.md
    - docs/operations/drift-migration/03-ios-android-drift-detection.md
    - docs/v1.9-DEFERRED-CLEANUP.md
    - docs/admin-setup-8021x/01-eap-method-overview.md
    - docs/admin-setup-android/02-zero-touch-portal.md
    - docs/admin-setup-android/08-cope-full-admin.md
    - docs/admin-setup-android/10-aosp-zebra.md
    - docs/admin-setup-android/12-aosp-htc-vive-focus.md
    - docs/admin-setup-android/13-aosp-meta-quest.md
    - docs/admin-setup-ios/05-app-deployment.md
    - docs/admin-setup-macos/04-app-deployment.md
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md
    - docs/admin-setup-macos/10-kerberos-sso-extension.md
    - docs/decision-trees/08-android-triage.md
    - docs/l1-runbooks/29-android-aosp-enrollment-failed.md
    - docs/l2-runbooks/24-linux-log-collection.md
    - docs/l2-runbooks/25-linux-agent-investigation.md
    - docs/l2-runbooks/26-apple-business-permission-denied.md
    - docs/l2-runbooks/33-8021x-radius-eap-investigation.md
    - docs/reference/android-capability-matrix.md
    - docs/reference/linux-capability-matrix.md
    - docs/reference/aosp-oem-matrix.md
    - docs/_glossary-macos.md

key-decisions:
  - "The clone-family truncation was matched word-for-word to the shape of the three members that
    never leaked (docs/operations/app-lifecycle/01-windows-win32-msix-scale.md,
    03-ios-vpp-licensing.md, 04-android-mgp-lifecycle.md), each clone keeping its own phase number
    and its own 'does not'/'does NOT' casing as recorded"
  - "The two three-line-wrapped clones (drift-migration/02-macos, 03-ios-android) were rejoined as
    a single multi-line-to-single-line replacement, not a per-line delete, so the diff shows a
    rejoined bullet rather than an orphaned fragment"
  - "The REQUIREMENTS.md site carrying a section reference (33-8021x-radius-eap-investigation.md)
    became 'the requirement set's Out-of-Scope boundary', reusing the surrounding 'Scope
    boundary:' label rather than inventing a fourth phrasing for the same concept"
  - "The redundant trailing word 'research' was dropped from admin-setup-macos/08-auth-methods
    -deep-dive.md's 'PITFALLS.md and SUMMARY.md research' clause after both tokens were replaced,
    since 'pitfall register and research summary research' would have doubled the noun"
  - "A third, previously unlisted RESEARCH occurrence on the same physical line as two already-
    planned FINDING replacements (08-cope-full-admin.md:395) was caught by re-running the leak-
    class needle after the planned edits, not assumed covered by the two named substitutions on
    that line"

requirements-completed: [HYG-02]

coverage:
  - id: D1
    description: "Both of HYG-02's named defects corrected (co-management migration-paths
      COMG-05 parenthetical dropped; patch-management overview roadmap citation truncated), the
      four single-line clones truncated to match the non-leaking shape, the two three-line-wrapped
      clones rejoined, and the v1.9-DEFERRED-CLEANUP.md PSSO-FUT-01 line corrected without moving
      the file"
    requirement: HYG-02
    verification:
      - kind: other
        ref: "grep -rc 'amend the operations index' docs/ summed == 10 with 0 leaking any casing;
          grep -qF the corrected PSSO-FUT-01 line + file exists; grep -qF 'as Autopatch
          prerequisites.' + zero COMG-05 occurrences; C17 237/0 -- see Task 1 <verify>"
        status: pass
    human_judgment: false
  - id: D2
    description: "The remaining 26 leaked sites across 20 files rewritten to plan 02's fixed
      vocabulary plus three new mappings (requirement set / research summary / phase success
      criterion #N literal), covering Version History cells, an HTML comment, and prose phrases
      with every substantive claim and identifier intact"
    requirement: HYG-02
    verification:
      - kind: other
        ref: "grep -rcE needle_class over docs/ excluding _standards/ and _registry/ summed == 0;
          all five replacement vocabularies present via grep -rqF; git diff --exit-code on
          scripts/pipeline/test-fixtures/ clean; C17 237/0 -- see Task 2 <verify>"
        status: pass
    human_judgment: false
  - id: D3
    description: "HYG-02's measured criterion holds corpus-wide: all three needles (literal,
      FIX-11 two-prefix, widened class) return 0 over docs/ and all three return non-zero on a
      known-bad control input; the apex chain and the corpus-wide [CITED: count are measured
      equal to the phase baseline"
    verification:
      - kind: other
        ref: "grep -rc/-rcE for all three needles over docs/ == 0 0 0; scratch-file positive
          control returns non-zero on all three; grep -rhoF '[CITED:' docs/ | wc -l == 118; node
          scripts/validation/check-phase-153.mjs tail == '111 PASS, 0 FAIL, 0 SKIPPED (total
          checks: 111)', matching 157-BASELINE.json's apex object -- see Task 3 <verify>"
        status: pass
    human_judgment: false

duration: 12min
completed: 2026-09-05
status: complete
---

# Phase 157 Plan 03: HYG-02 Corpus-Wide Closure Summary

**Corrected both of HYG-02's named defects, uniformed the ten-member operations cross-reference
clone family (including two three-line-wrapped leaks), fixed the deferred-cleanup citation, and
applied the plan-02 substitution vocabulary plus three new mappings to the remaining 26 sites
across 20 files, closing the leak-class needle at zero corpus-wide with the apex chain measured
equal to the phase baseline.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-09-05T20:03:45Z
- **Completed:** 2026-09-05T20:10:58Z
- **Tasks:** 3 completed
- **Files modified:** 29 (9 in Task 1, 20 in Task 2; Task 3 measurement-only)

## Accomplishments

- Corrected named defect one (`docs/operations/co-management/03-cocmgmt-migration-paths.md:55`):
  dropped the `(REQUIREMENTS.md COMG-05 wording is incomplete)` parenthetical, leaving the
  sentence ending cleanly at "as Autopatch prerequisites." with the surrounding correction note
  byte-identical otherwise.
- Corrected named defect two (`docs/operations/patch-management/00-overview.md:266`) and applied
  the same truncation to four single-line clones and two three-line-wrapped clones across
  `app-lifecycle/` and `drift-migration/`, bringing all ten clone-family members to the same shape
  as the three that never leaked — each keeping its own phase number and its own "does not"/"does
  NOT" casing.
- Fixed `docs/v1.9-DEFERRED-CLEANUP.md:19`'s bare `REQUIREMENTS.md lines 70, 88` citation, keeping
  the `PSSO-FUT-01` identifier and the file at its current path per the recorded retention ruling.
- Applied plan 02's substitution vocabulary unchanged, plus three new mappings
  (`REQUIREMENTS.md` -> `requirement set`, `SUMMARY.md` -> `research summary`, `SC#N ROADMAP
  literal` -> `phase success criterion #N literal`), across the remaining 26 leaked sites in 20
  files: eight Version History/Changelog cells, one HTML comment, several prose phrases, and two
  capability-matrix section preambles.
- Found and fixed a 27th needle-matching occurrence on the same physical line as two already-
  planned replacements (`08-cope-full-admin.md:395`'s bare `RESEARCH Open Question #1`), caught by
  re-running the leak-class needle after the planned edits rather than assuming the line was fully
  closed.
- Proved all three of `157-BASELINE.json`'s needles (`needle_literal`, `needle_fix11`,
  `needle_class`) return 0 across `docs/` and all three fire non-zero against a known-bad scratch
  control, then re-ran the 111-entry apex chain in the foreground: 111 PASS / 0 FAIL / 0 SKIPPED,
  identical to the baseline.

## Before/After Counts (each next to the command that produced it)

| Measurement | Before | After | Command |
|---|---|---|---|
| `needle_literal` over `docs/` | 2 (`157-BASELINE.json`) | 0 | `grep -rc '\.planning/' docs/ --include='*.md' \| awk -F: '{s+=$2} END{print s+0}'` |
| `needle_fix11` over `docs/` | 2 (`157-BASELINE.json`) | 0 | `grep -rc '\.planning/research/\|\.planning/phases/' docs/ --include='*.md' \| awk -F: '{s+=$2} END{print s+0}'` |
| `needle_class` over `docs/` (excl. `_standards/`, `_registry/`) | 83 (`157-BASELINE.json`) | 0 | `grep -rcE '\b(ROADMAP\|REQUIREMENTS\|PITFALLS\|FEATURES\|RESEARCH\|STACK\|PLAN\|SUMMARY)(\.md)?\b' docs/ --include='*.md' \| grep -v '^docs/_standards/' \| grep -v '^docs/_registry/' \| awk -F: '{s+=$2} END{print s+0}'` |
| Positive control, all three needles (scratch file with `.planning/phases/`, `.planning/research/`, `PITFALLS.md OP-1`) | n/a | 1/1/1 (all non-zero) | `printf 'see .planning/phases/x and PITFALLS.md OP-1 and .planning/research/y\n' > c.md; grep -c ...` |
| Apex chain (PASS/FAIL/SKIPPED) | 111/0/0 (`157-BASELINE.json`) | 111/0/0 | `node scripts/validation/check-phase-153.mjs` |
| C17 (files/violations) | 237/0 (`157-BASELINE.json`) | 237/0 | `node scripts/validation/c17-eee-contract.mjs` |
| Corpus-wide `[CITED:` count | 118 (`157-BASELINE.json`) | 118 | `grep -rhoF '[CITED:' docs/ --include='*.md' \| wc -l` |
| Clone family (`amend the operations index`) | 10 members / 5 leaking | 10 members / 0 leaking | `grep -rc 'amend the operations index' docs/ --include='*.md' \| awk -F: '{s+=$2} END{print s+0}'` and roadmap-citation grep |

## Task Commits

1. **Task 1: Correct both named defects, the seven-member clone family, and the
   deferred-cleanup citation** — `6f9da288` (fix)
2. **Task 2: Apply the substitution vocabulary to the remaining 26 sites across 21 files** —
   `9a5827ce` (fix)
3. **Task 3: Confirm the corpus-wide criterion and the chain equality, and hand plan 04 a green
   precondition** — measurement-only task; no code changes, verified via the commands above.
   Closed by this SUMMARY's own commit.

## Files Modified

**Task 1 (9 files):** `docs/operations/co-management/03-cocmgmt-migration-paths.md`,
`docs/operations/patch-management/00-overview.md`,
`docs/operations/app-lifecycle/00-overview.md`,
`docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`,
`docs/operations/drift-migration/00-overview.md`,
`docs/operations/drift-migration/01-windows-drift-detection.md`,
`docs/operations/drift-migration/02-macos-drift-detection.md`,
`docs/operations/drift-migration/03-ios-android-drift-detection.md`,
`docs/v1.9-DEFERRED-CLEANUP.md`.

**Task 2 (20 files):** `docs/admin-setup-8021x/01-eap-method-overview.md`,
`docs/admin-setup-android/02-zero-touch-portal.md`,
`docs/admin-setup-android/08-cope-full-admin.md`, `docs/admin-setup-android/10-aosp-zebra.md`,
`docs/admin-setup-android/12-aosp-htc-vive-focus.md`,
`docs/admin-setup-android/13-aosp-meta-quest.md`, `docs/admin-setup-ios/05-app-deployment.md`,
`docs/admin-setup-macos/04-app-deployment.md`,
`docs/admin-setup-macos/08-auth-methods-deep-dive.md`,
`docs/admin-setup-macos/10-kerberos-sso-extension.md`, `docs/decision-trees/08-android-triage.md`,
`docs/l1-runbooks/29-android-aosp-enrollment-failed.md`,
`docs/l2-runbooks/24-linux-log-collection.md`, `docs/l2-runbooks/25-linux-agent-investigation.md`,
`docs/l2-runbooks/26-apple-business-permission-denied.md`,
`docs/l2-runbooks/33-8021x-radius-eap-investigation.md`,
`docs/reference/android-capability-matrix.md`, `docs/reference/aosp-oem-matrix.md`,
`docs/reference/linux-capability-matrix.md`, `docs/_glossary-macos.md`.

## Decisions Made

- Reused plan 02's substitution vocabulary literally (no re-derivation), extending it with three
  new mappings this half of the corpus required, per the plan's explicit instructions.
- Matched the seven leaking clone-family members to the exact shape of the three that never
  leaked, rather than inventing a new truncation point, so the family reads uniformly.
- Rejoined the two three-line-wrapped clones as single-block replacements to avoid the
  line-oriented-guard failure mode this repository has already shipped once (per the plan's threat
  register, T-157-09).
- Dropped a redundant trailing "research" in the auth-methods-deep-dive.md clause after both its
  tokens were replaced, since the mechanical double-substitution would otherwise have produced
  "research summary research".
- Named a `Scope boundary:` -> `the requirement set's Out-of-Scope boundary` phrasing that reuses
  the label already present at the site rather than inventing new label wording.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] A third RESEARCH occurrence on an already-edited line was initially missed**
- **Found during:** Task 2 (re-running the leak-class needle verification after the planned 26-site
  edit)
- **Issue:** `docs/admin-setup-android/08-cope-full-admin.md:395` carries three separate needle
  matches on one physical Version History line (`RESEARCH NEW FINDING #1`, `RESEARCH NEW FINDING
  #2`, and `RESEARCH Open Question #1`). The plan's action text named only the two `NEW FINDING`
  occurrences explicitly; the third was not separately enumerated but is on the same line and the
  same needle.
- **Fix:** Applied the same `RESEARCH` -> `phase research` substitution to the third occurrence
  (`D-13 / D-05 / RESEARCH Open Question #1` -> `D-13 / D-05 / phase research Open Question #1`),
  keeping the surrounding D-IDs and Version History cell structure unchanged.
- **Files modified:** `docs/admin-setup-android/08-cope-full-admin.md`
- **Verification:** Re-ran the full corpus-wide leak-class needle; it returned 0 after this fix
  (it had returned 1 matching line before).
- **Committed in:** `9a5827ce` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — a needle occurrence missed by the plan's per-site
enumeration but caught before the task's own verify gate was declared passing).
**Impact on plan:** No scope creep — the fix closed the same needle class the task already
targeted, on a line the task's file list already named. No additional files were touched.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- HYG-02's measured criterion is true corpus-wide: the literal needle is 0 with no exclusion, and
  the widened class needle is 0 outside `docs/_standards/` and `docs/_registry/`.
- The apex chain (111 PASS / 0 FAIL / 0 SKIPPED) and C17 (237/0) are both measured equal to
  `157-BASELINE.json`, and the corpus-wide `[CITED:` count is unchanged at 118.
- Plan 04's gate now has a green precondition to land against — this was the phase's one real
  ordering dependency (D-50), and it is now discharged.
- No blockers for plan 04.

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-05*

## Self-Check: PASSED
All 29 modified files exist and match the two task commits (`6f9da288` 9 files, `9a5827ce` 20
files, found in `git log --oneline -5`). All three needles (literal, FIX-11, class) re-run 0/0/0
corpus-wide and all three fire non-zero on a scratch known-bad control. Apex chain re-run
111/0/0 matches `157-BASELINE.json`. C17 re-run 237/0 matches baseline. Corpus-wide `[CITED:`
count re-run 118 matches baseline.
