---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 02
subsystem: docs-corpus-content
tags: [hyg-02, apple-business, leak-class, needle-class, c17-eee-contract]

requires:
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 01
    provides: "157-BASELINE.json's needle_class_sites enumeration (83 sites, 43 files) and the
      needle_class regex — the frozen census plan 02 works from without re-deriving it"
provides:
  - "48 of the corpus's 83 leaked planning-artifact citations closed, all concentrated in the
    Apple Business subtree, using one fixed substitution vocabulary that plan 03 must also use"
  - "The substitution vocabulary itself (pitfall register / feature research / stack research /
    phase research / portal scrape preparation notes / phase success criterion #N / Phase 62 plan)
    as the single voice plan 03 continues for the remaining 35 sites outside this subtree"
affects: [157-03]

actuals:
  tokens: 8200
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Line-targeted exact-substring substitution (not regex, not whole-file replace): each of the
      48 sites edited by asserting the old substring occurs exactly once on its recorded line
      before writing the replacement, so an ambiguous partial match fails loud instead of silently
      touching the wrong text"
    - "Positive-control-before-trust: a known-bad token is checked against the needle regex, and
      proven non-zero, before the corpus's own zero is reported as meaningful"

key-files:
  modified:
    - docs/cross-platform/apple-business/01-role-permission-model.md
    - docs/cross-platform/apple-business/04-custom-role-authoring.md
    - docs/cross-platform/apple-business/06-mdm-server-assignment.md
    - docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md
    - docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md
    - docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md
    - docs/cross-platform/apple-business/11-vpp-catalog-runbook.md
    - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
    - docs/cross-platform/apple-business/13-device-release-runbook.md
    - docs/cross-platform/apple-business/14-device-transfer-runbook.md
    - docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md
    - docs/cross-platform/apple-business/16-managed-apple-account-runbook.md
    - docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md
    - docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md

key-decisions:
  - "Worked from 157-BASELINE.json's frozen needle_class_sites list rather than re-deriving the
    site census; a fresh grep against the live tree confirmed all 31 (task 1) + 17 (task 2) = 48
    line numbers matched the baseline exactly, so no drift correction was needed"
  - "One fixed vocabulary applied literally across all 14 files (D-14/D-16/D-19): PITFALLS.md ->
    pitfall register, FEATURES.md -> feature research, STACK.md -> stack research, RESEARCH.md ->
    phase research, 62-SCRAPE-PREP.md -> portal scrape preparation notes, ROADMAP.md SC#N ->
    phase success criterion #N, 62-08-PLAN -> Phase 62 plan"
  - "The D-04 protected quotation at 16-managed-apple-account-runbook.md:258 was left untouched;
    verified byte-identical after the edit rather than assumed safe"

requirements-completed: [HYG-02]

coverage:
  - id: D1
    description: "31 leaked citations in the four heaviest Apple Business runbooks
      (16-managed-apple-account-runbook.md, 15-mdm-server-reassign-runbook.md,
      17-audit-log-scoping-runbook.md, 01-role-permission-model.md) rewritten to the fixed
      vocabulary; all five external source identifiers and the corpus-wide 118 [CITED: count
      survive; C17 unchanged"
    requirement: HYG-02
    verification:
      - kind: other
        ref: "grep -rcE needle_class over the four files summed by awk == 0; grep -qF each of
          the five external identifiers; grep -rhoF '[CITED:' docs/ | wc -l == 118; node
          scripts/validation/c17-eee-contract.mjs tail == '237 files checked, 0 with violations,
          0 total violations' — see Task 1 <verify>"
        status: pass
    human_judgment: false
  - id: D2
    description: "17 remaining leaked citations across the other 10 Apple Business files rewritten
      to the identical vocabulary, closing all 48 sites in the subtree; the three-shape file
      (12-shared-ipad-passcode-reset.md) carries all three distinct replacement forms"
    requirement: HYG-02
    verification:
      - kind: other
        ref: "grep -rcE needle_class over docs/cross-platform/apple-business/ summed by awk == 0;
          grep -qF 'phase success criterion #1' && 'Phase 62 plan' && 'pitfall register OP-11' in
          12-shared-ipad-passcode-reset.md; [CITED: count == 118; C17 237/0; git diff --stat
          1cd8c4d7 -- docs/cross-platform/apple-business/ lists exactly the 14 files_modified —
          see Task 2 <verify>"
        status: pass
    human_judgment: false
  - id: D3
    description: "The subtree's zero is proven meaningful by a positive control, and the apex
      chain is measured equal to the phase baseline rather than assumed unchanged"
    verification:
      - kind: other
        ref: "printf a PITFALLS.md OP-1 token to a temp file, grep -cE needle_class returns 1,
          temp file removed; node scripts/validation/check-phase-153.mjs tail == '111 PASS, 0
          FAIL, 0 SKIPPED (total checks: 111)', matching 157-BASELINE.json's apex object; git
          status --porcelain -- docs/ | grep -v apple-business/ returns empty — see Task 3
          <verify>"
        status: pass
    human_judgment: false

duration: 18min
completed: 2026-09-05
status: complete
---

# Phase 157 Plan 02: Apple Business Leak-Class Closure Summary

**Closed all 48 leaked planning-artifact citations in the Apple Business subtree (the strongest
instance of HYG-02's leak class) using one fixed lowercase substitution vocabulary, verified every
evidence marker and external source identifier survived, and proved the reported zero is backed by
a needle proven able to fire and an apex chain measured equal to the phase baseline.**

## Performance

- **Duration:** 18 min
- **Tasks:** 3 completed
- **Files modified:** 14 (all in `docs/cross-platform/apple-business/`)
- **Commits:** 2 (Task 3 produced no code commit — it is a measurement-only task, closed by this
  SUMMARY's own commit)

## Accomplishments

- Rewrote 31 leaked citations across the four heaviest Apple Business runbooks
  (`16-managed-apple-account-runbook.md`, `15-mdm-server-reassign-runbook.md`,
  `17-audit-log-scoping-runbook.md`, `01-role-permission-model.md`) to the fixed vocabulary,
  including two multi-token lines (`STACK.md §5.3, FEATURES.md §6.2` and a `research/FEATURES.md §7
  + PITFALLS.md` blockquote wrap) and one table row carrying two `FEATURES.md` references inside a
  single cell.
- Rewrote the remaining 17 leaked citations across the other 10 files, closing all 48 sites in the
  subtree — including `12-shared-ipad-passcode-reset.md:153`'s two-leak semicolon-separated line
  (`pitfall register OP-11` + `phase success criterion #1`), its `:201` Version History citation
  (`62-08-PLAN` -> `Phase 62 plan`), and `14-device-transfer-runbook.md:98`'s dual-artifact
  `[CITED: ...]` bracket (both a `PITFALLS.md` and a `FEATURES.md` reference, both confidence
  qualifiers preserved).
- Verified the fix did not touch the D-04 protected template-email quotation at
  `16-managed-apple-account-runbook.md:258` (byte-identical before/after) and did not lose any of
  the corpus's 118 `[CITED:` evidence markers or five external source identifiers
  (`dep4acb2aa44`, `axm402206497`, `axm526a05814`, `axm8c1cac980`, `axmf7d043c03`).
- Proved the leak-class needle is not vacuous: a positive control (`PITFALLS.md OP-1` in a scratch
  temp file) returned a non-zero match before the corpus's own zero was trusted, and the temp file
  was removed afterward.
- Re-ran the 111-entry apex chain (`check-phase-153.mjs`) in the foreground: 111 PASS / 0 FAIL /
  0 SKIPPED — identical to the `apex` object recorded in `157-BASELINE.json`, so no prose
  substitution disturbed a pinned literal anywhere in the chain.

## Before/After Counts (each next to the command that produced it)

| Measurement | Before | After | Command |
|---|---|---|---|
| `needle_class` over `docs/cross-platform/apple-business/` | 48 | 0 | `grep -rcE '\b(ROADMAP\|REQUIREMENTS\|PITFALLS\|FEATURES\|RESEARCH\|STACK\|PLAN\|SUMMARY)(\.md)?\b' docs/cross-platform/apple-business/ --include='*.md' \| awk -F: '{s+=$2} END{print s+0}'` |
| Apex chain (PASS/FAIL/SKIPPED) | 111/0/0 (`157-BASELINE.json`) | 111/0/0 | `node scripts/validation/check-phase-153.mjs` |
| C17 (files/violations) | 237/0 (`157-BASELINE.json`) | 237/0 | `node scripts/validation/c17-eee-contract.mjs` |
| Corpus-wide `[CITED:` count | 118 | 118 | `grep -rhoF '[CITED:' docs/ --include='*.md' \| wc -l` |
| Positive control (`PITFALLS.md OP-1` in scratch file) | n/a | 1 (non-zero) | `grep -cE '\b(ROADMAP\|REQUIREMENTS\|PITFALLS\|FEATURES\|RESEARCH\|STACK\|PLAN\|SUMMARY)(\.md)?\b' /tmp/leak-control.md` |

## Task Commits

1. **Task 1: Establish the substitution vocabulary and apply it to the four heaviest runbooks** —
   `f9822a55` (fix)
2. **Task 2: Apply the same vocabulary to the remaining ten Apple Business files** — `b9877990`
   (fix)
3. **Task 3: Prove the leak-class detector can fire on this subtree, then confirm the chain is
   unmoved** — measurement-only task; no code changes, verified via the commands above. Closed by
   this SUMMARY's own commit.

## Files Modified

All 14 files are in `docs/cross-platform/apple-business/`: `01-role-permission-model.md`,
`04-custom-role-authoring.md`, `06-mdm-server-assignment.md`,
`07-vpp-content-token-consolidation.md`, `08-managed-apple-account-provisioning.md`,
`09-shared-ipad-lifecycle.md`, `11-vpp-catalog-runbook.md`, `12-shared-ipad-passcode-reset.md`,
`13-device-release-runbook.md`, `14-device-transfer-runbook.md`,
`15-mdm-server-reassign-runbook.md`, `16-managed-apple-account-runbook.md`,
`17-audit-log-scoping-runbook.md`, `18-cross-org-boundary-cheat-sheet.md` — matching
`git diff --stat 1cd8c4d7 -- docs/cross-platform/apple-business/` exactly (14 files, 48 insertions,
48 deletions).

## Decisions Made

- Worked from `157-BASELINE.json`'s frozen `needle_class_sites` enumeration rather than
  re-deriving the site list; a fresh `grep -n` against the live tree confirmed all 48 line numbers
  matched the baseline exactly before any edit was made, so no drift correction was required.
- Applied one fixed vocabulary literally across all 14 files, per D-14/D-16/D-19: `PITFALLS.md` ->
  `pitfall register`, `FEATURES.md` (and the bare `FEATURES` token at
  `15-mdm-server-reassign-runbook.md:32`) -> `feature research`, `STACK.md` -> `stack research`,
  `RESEARCH.md` -> `phase research`, `62-SCRAPE-PREP.md` -> `portal scrape preparation notes`,
  `ROADMAP.md SC#N` -> `phase success criterion #N`, `62-08-PLAN` -> `Phase 62 plan`. Internal
  identifiers (`OP-1`, `OP-11`, etc.) were left in place per D-15 — the requirement-identifier arm
  is out of the gated class.
- Used line-targeted exact-substring substitution (asserting the old substring occurs exactly once
  on its recorded line before writing) instead of a whole-file regex replace, so an unexpected
  duplicate or partial match on a line would fail loud rather than silently touching adjacent text.

## Deviations from Plan

None - plan executed exactly as written. All 48 sites matched the plan's frozen line-number
enumeration on the first attempt; no line had drifted since the baseline was recorded.

## Issues Encountered

None.

## Threat Flags

None. The 14 edited files and their new surface (the substitution vocabulary itself) were already
named in this plan's own `<threat_model>` (T-157-05, T-157-06, T-157-08) and covered by the
acceptance-criteria assertions above; no new trust boundary or security-relevant surface was
introduced beyond what the plan anticipated.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 48 leaked citations in the Apple Business subtree are closed; 35 sites remain across the
  rest of the corpus for plan 03, which must reuse this exact vocabulary.
- The apex chain and C17 are both measured (not assumed) equal to the phase baseline — plan 03
  starts from a chain proven green, not merely "should still be green."
- No blockers for plan 03.

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-05*

## Self-Check: PASSED
All 14 modified files exist and match `git diff --stat 1cd8c4d7 -- docs/cross-platform/apple-business/`
(14 files, 48/48). Both task commit hashes (`f9822a55`, `b9877990`) found in `git log --oneline -5`.
Apex chain re-run 111/0/0 matches `157-BASELINE.json`. C17 re-run 237/0 matches baseline. Corpus-wide
`[CITED:` count re-run 118 matches baseline.
