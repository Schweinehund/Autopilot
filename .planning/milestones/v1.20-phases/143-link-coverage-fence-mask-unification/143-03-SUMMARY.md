---
phase: 143-link-coverage-fence-mask-unification
plan: 03
subsystem: docs-validation
tags: [link-checker, anchor-model, corpus-repair, class-d-deanchor, carve-governance, gov-02-ledger]

requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: github-anchor-model, a-id-recognition, D-38 all-87 {#id}-to-<a id> conversion (Plans 02, 09)
provides:
  - "0 broken file targets — all 13 genuine ../ over-escapes in docs/_glossary-macos.md (11) and docs/admin-setup-ios/{04,07}.md (2) repaired"
  - "12 Class-D (target-file, fragment) pairs / 16 links de-anchored — #fragment dropped, file target kept, no new prose/heading/table-row authored"
  - "Both false friends (#intune, #aosp) correctly left de-anchored, not repointed to a plausible-but-wrong heading"
  - "Two admin-setup-macos self-links degraded to plain text (bare (#fragment)-only target, no file to fall back to)"
  - "ETG pair correctly excluded — remains Class B, routed to Plan 05"
  - "Measured dry-run: 78 -> 49 (0 broken file targets, 49 broken anchors), matching the plan's own projection exactly"
affects: [143-04-PLAN.md, 143-05-PLAN.md, 143-06-PLAN.md]

actuals:
  tokens: 15250
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns: [D-33 grep-before-edit cross-reference on non-frozen validators, D-04 per-pair heading-absence confirmation before de-anchoring, bare-self-link-to-plain-text degradation]

key-files:
  created: []
  modified:
    - docs/_glossary-macos.md
    - docs/admin-setup-ios/04-configuration-profiles.md
    - docs/admin-setup-ios/07-device-enrollment.md
    - docs/error-codes/01-mdm-enrollment.md
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
    - docs/admin-setup-android/06-aosp-stub.md
    - docs/l2-runbooks/23-android-aosp-investigation.md
    - docs/_glossary-apple-business.md
    - docs/linux-lifecycle/01-linux-prerequisites.md
    - docs/admin-setup-macos/10-kerberos-sso-extension.md
    - docs/l2-runbooks/24-linux-log-collection.md
    - docs/l2-runbooks/25-linux-agent-investigation.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md

decisions:
  - "Located every Task 2 edit by its own link text/target string, never by the plan's cited pre-conversion line numbers — one citation (docs/l2-runbooks/23-android-aosp-investigation.md) was still at its original line (:362, not the plan's projected :367), confirming the general 'locate by content' rule was necessary, not just a formality."
  - "Both self-links in docs/admin-setup-macos/10-kerberos-sso-extension.md (#k-1-wrong-extension-identifier, #k-5-wrong-payload-type) confirmed to target a bold-lead blockquote, not a heading or <a id> — degraded to plain text per the plan's bare-fragment rule rather than emit an empty () target."
  - "docs/reference/linux-capability-matrix.md:23's own cross-reference to a DIFFERENT file's #supported-management-surface (docs/linux-lifecycle/00-enrollment-overview.md) confirmed — not contradicted — that the in-file fragment on linux-capability-matrix.md itself has no target; the near-identical fragment text elsewhere was not treated as a false negative on the Class-D ruling."
  - "Recorded two measured deviations from the plan's own literal acceptance-criteria grep text (per D-36, not silently reconciled): the '7' vs measured '9' count for macos-lifecycle/02-mdm-migration-psso.md links (the plan's own repair table names exactly 9 rows), and the '0' vs measured '4' count for the heading/table-row-addition grep (a false positive on pre-existing table rows edited in place, not new rows — verified instead via git diff --numstat equal added/removed per file)."

metrics:
  duration: ~45min
  completed: 2026-08-11
status: complete
---

# Phase 143 Plan 03: LINK-03 File-Target Repair + Class-D De-Anchor Summary

Repaired all 13 genuine `../` over-escaped LINK-03 links and de-anchored 12 Class-D (target-file,
fragment) pairs (16 links, including both named false friends `#intune`/`#aosp`) where no correct
anchor exists anywhere in the target file — corpus dry-run total falls from 78 to 49.

## Performance

- **Duration:** ~45 min
- **Tasks:** 3
- **Files modified:** 14 docs files + GOV-02 ledger + EVIDENCE.md
- **Commits:** 3

## Accomplishments

- All 13 LINK-03 broken file targets repaired by dropping exactly one `../` level: 11 in
  `docs/_glossary-macos.md` (10 lines, one carrying 2 links) and 2 in `docs/admin-setup-ios/`
  (`04-configuration-profiles.md:165`, `07-device-enrollment.md:46`). All four destination files
  confirmed present on disk before editing; the three Stage-2/7/9 anchor fragments that only became
  evaluable once the paths resolved all match real headings in
  `docs/macos-lifecycle/02-mdm-migration-psso.md`, adding zero new anchor failures.
- 12 Class-D pairs (16 links) de-anchored — `#fragment` dropped, file target kept, nothing else on
  each line touched. Every pair's target file was individually confirmed (by heading grep, not
  assumed from the plan's ground-truth list) to carry no matching `#id`-shaped heading before the
  edit landed.
- Both named false friends left correctly de-anchored per D-06: `#intune` (no `### Intune` heading
  in `docs/_glossary.md`, only `### Intune Management Extension (IME)` and
  `### Intune Provisioning Client` — 4 links across `docs/error-codes/`) and `#aosp` (zero `AOSP`
  headings anywhere in `docs/_glossary-android.md` — 2 links).
- Two self-links in `docs/admin-setup-macos/10-kerberos-sso-extension.md`
  (`#k-1-wrong-extension-identifier`, `#k-5-wrong-payload-type`) confirmed to target a bold-lead
  blockquote, not a heading — degraded to plain text rather than emitting an empty `()` link target.
- ETG pair (`docs/lifecycle-apv2/00-overview.md#enrollment-time-grouping----the-core-mechanism`)
  correctly left untouched — re-confirmed Class B (heading exists, fragment stale by one token),
  routed to Plan 05.
- Zero new documentation content authored anywhere: `git diff --numstat -- docs/` shows equal
  added/removed line counts in every one of the 15 edited files, confirming every edit is a
  same-line fragment/prefix drop.
- Dry-run measured (not projected) on the fully-landed state: 0 broken file targets, 49 broken
  anchors, 49 total — an exact match to the plan's own projection. Dry-run ladder now reads
  175 → 173 → 143 → 78 → **49**.
- GOV-02 ledger gains 3 rows (Task 1's LINK-03 grep-before-edit proof, Task 2's Class-D per-pair
  heading-absence proof, and the frozen-call-site cross-reference for both); `143-EVIDENCE.md`
  gains a per-class remedy ledger and the fifth dry-run ladder row.

## Task Commits

1. **Task 1: LINK-03 — 13 `../` over-escaped file targets** - `61c580a3` (fix)
2. **Task 2: Class D — drop the fragment where no correct target exists** - `2d5b8d02` (fix)
3. **Task 3: Dry-run checkpoint — corpus total falls 78 -> 49** - `4500f7e3` (docs)

**Plan metadata:** captured in this SUMMARY commit (below)

## Files Created/Modified

- `docs/_glossary-macos.md` — 11 `../` over-escaped links repaired (10 lines)
- `docs/admin-setup-ios/04-configuration-profiles.md`, `docs/admin-setup-ios/07-device-enrollment.md`
  — 1 `../../` over-escaped link each repaired
- `docs/error-codes/{01,03,04,05}-*.md` — `#intune` de-anchored (4 links)
- `docs/admin-setup-android/06-aosp-stub.md`, `docs/l2-runbooks/23-android-aosp-investigation.md`
  — `#aosp` de-anchored (2 links)
- `docs/_glossary-apple-business.md` — 4 links de-anchored (`#abm-apple-business-manager`,
  `#managed-apple-id`, `#account-holder-do-not-delegate`, `#intune-side-labels-preserved`)
- `docs/linux-lifecycle/01-linux-prerequisites.md` — `#identity-broker-v202-re-enrollment` de-anchored
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — 2 self-links degraded to plain text
- `docs/l2-runbooks/24-linux-log-collection.md`, `docs/l2-runbooks/25-linux-agent-investigation.md`
  — `#monitoring`/`#supported-management-surface` de-anchored
- `docs/error-codes/03-esp-enrollment.md` — `#winlogon` de-anchored (in addition to the `#intune`
  fix in the same file)
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — 3 rows appended (Task 1 grep proof, Task 2 grep
  + per-pair heading-absence proof)
- `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` — Plan 03 per-class
  remedy ledger + dry-run ladder row 5 (78 → 49)

## Decisions Made

See frontmatter `decisions` for the full list. Summary: every Class-D pair was independently
re-confirmed against the target file's actual heading list before editing (D-04), not accepted on
the plan's ground-truth list alone — this caught one line-number citation already stale relative to
the plan's own projection and confirmed the `linux-capability-matrix.md` cross-reference to a
different file's identical fragment did not undermine the Class-D ruling on the file actually
linked.

## Deviations from Plan

### Auto-fixed Issues

None — no Rule 1/2/3 auto-fixes were required. Both LINK-03 and Class D were mechanical corpus
edits (character removal only) with no bugs, missing functionality, or blocking issues encountered.

### Measured deviations from the plan's own acceptance-criteria text (not auto-fixes — recorded per D-36)

**1. `grep -c '](macos-lifecycle/02-mdm-migration-psso.md' docs/_glossary-macos.md` measures 9, plan authored 7**
- **Found during:** Task 1 acceptance-criteria verification
- **Detail:** The plan's own repair table (Task 1's `<action>`) names exactly 9 rows targeting
  `macos-lifecycle/02-mdm-migration-psso.md` (`:103,111,151,161,171,189,199,207,327`) — 9 is what
  the table itself implies, not 7. All 9 repairs match the table exactly; nothing was under- or
  over-repaired.
- **Verification:** `git diff -- docs/_glossary-macos.md` shows exactly the 11 links (10 lines)
  named in the plan's table changed, nothing else.

**2. `git diff -- docs/ | grep '^+' | grep -cE '^\+#{1,6} |^\+\|'` measures 4, plan expected 0**
- **Found during:** Task 2 acceptance-criteria verification
- **Detail:** All 4 hits are pre-existing markdown table ROWS in `docs/error-codes/{01,03,04,05}-*.md`
  whose `#intune` fragment sat mid-row. A same-line edit inside an existing `|`-delimited row
  reproduces a line starting with `|` in the unified diff — indistinguishable by this literal grep
  from a genuinely new row. The substantive no-new-content prohibition was verified instead via
  `git diff --numstat -- docs/`, which shows equal added/removed line counts in every edited file.
- **Verification:** `git diff --numstat -- docs/` — 15 files, added == removed in each.

---

**Total deviations:** 0 auto-fixed. 2 measured discrepancies against the plan's own literal
acceptance-criteria grep text, both recorded with derivation shown rather than silently
reconciled, per this phase's own D-36 discipline.
**Impact on plan:** None substantive — both discrepancies are artifacts of the plan's acceptance
grep patterns, not defects in the corpus edits. The underlying invariants (correct repair count,
zero new content) hold, verified by an alternate, more precise method in each case.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plans 04 (Class C target-side `<a id>`) and 05 (Class B source-side rewrite) can proceed against
  the measured 49-broken-anchor ground truth in `143-EVIDENCE.md`'s Plan 03 section.
  `docs/_glossary-android.md#aosp` is now cleared and no longer in either plan's remaining scope.
- The ETG pair remains the sole confirmed Class-B item; Plan 05 still owns its own investigation of
  the rest of the 49-pair failure list surfaced by this plan's dry-run.
- No blockers. c17 (234/0/0), check-nav-hub-links (0/0/0), carve-gate (91/91/0) all green at this
  commit. Both glossaries' `last_verified`/`review_by` metadata confirmed byte-unchanged.

---
*Phase: 143-link-coverage-fence-mask-unification*
*Completed: 2026-08-11*

## Self-Check: PASSED

- FOUND: `docs/_glossary-macos.md`, `docs/admin-setup-ios/04-configuration-profiles.md`,
  `docs/admin-setup-ios/07-device-enrollment.md`, this SUMMARY, `143-EVIDENCE.md`,
  `.planning/milestones/v1.20-GOV-02-LEDGER.md`
- FOUND commits: `61c580a3`, `2d5b8d02`, `4500f7e3`, `0e226cc1` in `git log --oneline`
