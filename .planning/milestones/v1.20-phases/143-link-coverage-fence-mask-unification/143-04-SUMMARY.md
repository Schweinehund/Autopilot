---
phase: 143-link-coverage-fence-mask-unification
plan: 04
subsystem: docs-validation
tags: [link-checker, anchor-model, corpus-repair, class-c-anchor, class-b-precedence, gov-02-ledger]

requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: github-anchor-model, a-id-recognition, LINK-03 file-target repair, Class-D de-anchor (Plans 02, 03, 09)
provides:
  - "D-05 precedence rule fixed in writing (3-branch, fixed-order, 2 exclusions) resolving the B/C disjointness problem"
  - "51-pair/67-link post-conversion invariant reconciled against a live measurement (not transcribed)"
  - "4 contested pairs adjudicated with file:line evidence confirmed this session (entra->Class B, aosp->Class D, byod->Class B, edit-without-view-dependency-table->Class B)"
  - "30 case-exact <a id> anchors landed across 6 files (28 error-code family, 2 registry-paths), resolving 36 incoming links"
  - "Measured dry-run: 49 -> 13 (0 broken file targets, 13 broken anchors), matching the plan's own projection exactly"
  - "The full 8-pair/13-link Class-B set identified and handed off to Plan 05"
affects: [143-05-PLAN.md, 143-06-PLAN.md]

actuals:
  tokens: 16600
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns: [D-05 fixed-order precedence rule for ambiguous class membership, target-side <a id> table-row anchoring (D-04 Class-C remedy), grep-before-edit cross-reference on non-frozen validators (D-33)]

key-files:
  created: []
  modified:
    - docs/error-codes/01-mdm-enrollment.md
    - docs/error-codes/02-tpm-attestation.md
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
    - docs/reference/registry-paths.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md

decisions:
  - "Measured the current 49-broken-anchor dry-run directly (widened check-nav-hub-links.mjs, resolved each source link to its target file programmatically) rather than reconstructing the 51-pair/67-link invariant from prior plans' narrative figures — the live 38-pair/49-link measurement split exactly into Class C 30/36 (unresolved) + Class B 8/13, which combined with the tracer's 1/2 and Plan 03's Class D 12/16 reconciles the plan's stated invariant precisely."
  - "All four contested pairs confirmed against live files this session, not accepted from the plan's table alone (D-03): #entra and #edit-without-view-dependency-table both resolve to real headings the mechanical locator missed (rule 1 fires before rule 2 is ever consulted); #byod's target row already carries an <a id>, so exclusion 2 routes it to rule 1 instead of stacking a second anchor; #aosp remains Class D, confirmed absent from the live dry-run (Plan 03's remedy is durable)."
  - "0x801c03ea's second table row (01-mdm-enrollment.md:34 equivalent pattern, 02-tpm-attestation.md:35) intentionally left unanchored per the phase's 'numerically first matching row' rule — anchoring both would create a duplicate id."

metrics:
  duration: ~20min
  completed: 2026-08-11
status: complete
---

# Phase 143 Plan 04: LINK-01/03/04 Class-C Target-Side Anchor + D-05 Precedence Rule Summary

Fixed the D-05 precedence rule in writing, adjudicated 4 contested pairs against live files, then
landed 30 case-exact `<a id>` anchors across 6 files (error-code family + registry-paths),
resolving 36 of the corpus's 49 remaining broken anchors — dry-run falls from 49 to 13.

## Performance

- **Duration:** ~20 min
- **Tasks:** 3
- **Files modified:** 6 docs files + GOV-02 ledger + EVIDENCE.md
- **Commits:** 3

## Accomplishments

- Wrote the D-05 fixed-order precedence rule into `143-EVIDENCE.md`: rule 1 (source-side rewrite
  when a semantic-match anchor already exists), rule 2 (target-side `<a id>` when the fragment
  names a table row with no semantic match), rule 3 (de-anchor), each evaluated in order so every
  (target-file, fragment) pair belongs to exactly one class — plus two named exclusions (changelog
  rows never qualify for rule 2; a row already carrying an `<a id>` is a rule-1 candidate, not a
  second-anchor site).
- Confirmed all 4 contested pairs against the live files this session: `#entra` and
  `#edit-without-view-dependency-table` both resolve under rule 1 (real headings the mechanical
  locator's changelog-row proposal missed); `#byod`'s target row already carries
  `<a id="byod-work-profile"></a>`, routing it to rule 1 via exclusion 2; `#aosp` remains
  correctly Class D (confirmed absent from the live 49-item dry-run, i.e. Plan 03's de-anchor is
  durable).
- Measured the live corpus state directly (widened `check-nav-hub-links.mjs`, programmatically
  resolved each broken link's source to its target file) rather than trusting a transcribed
  figure: 38 distinct (target-file, fragment) pairs / 49 links, splitting exactly into 30 pairs/36
  links Class C (this plan's scope) and 8 pairs/13 links Class B (Plan 05's scope) — which,
  combined with the tracer's already-resolved 1 pair/2 links and Plan 03's already-resolved
  Class-D 12 pairs/16 links, reconciles the plan's stated 51-pair/67-link post-conversion
  invariant exactly (Class C 31/38, Class D 12/16, Class B 8/13).
- Landed 28 new `<a id>` anchors across the five error-code files (9 in `01-mdm-enrollment.md`,
  8 in `02-tpm-attestation.md` with case preserved exactly for `0x801C03F3`/`0x801c03ea`, 3 in
  `03-esp-enrollment.md`, 1 in `04-pre-provisioning.md`, 7 in `05-hybrid-join.md`), each the first
  token in its row's opening cell with zero space before the visible content, matching the
  `13-aosp-meta-quest.md` precedent exactly. Double-row codes (`0x80180014`, `0x801c03ea`) each
  anchored once, on the numerically first row, per the phase-wide rule.
- Landed 2 anchors on `docs/reference/registry-paths.md` (`provisioning-diagnostics`,
  `autopilotsettings`); confirmed `#winlogon`'s Class-D de-anchor (Plan 03) untouched.
- Confirmed both scope exclusions before editing: `docs/operations/patch-management/04-android-patch-delivery.md`'s
  three fragments already resolve via Plan 09's D-38 conversion (`zebra-lifeguard` anchor was NOT
  re-added); `docs/cross-platform/apple-business/01-role-permission-model.md`'s real heading exists
  at `:343`, confirming the Class-B ruling — neither out-of-scope file was touched.
- Measured the post-edit dry-run directly on the landed state: 0 broken file targets, **13**
  broken anchors, an exact match to the plan's projection (49 − 34 error-code − 2 registry-path =
  13). Dry-run ladder now reads 175 → 173 → 143 → 78 → 49 → **13**. The remaining 13 links (8
  pairs) are Plan 05's complete Class-B set, itemized in `143-EVIDENCE.md`.
- GOV-02 ledger gains one row (target-scoped + symbol-scoped grep across all 22 error-code
  fragment strings plus both registry-path anchor ids — zero frozen call-site conflicts found;
  the only hits were doc-registry/comment mentions in `scripts/pipeline/`, none a validator pin).

## Task Commits

1. **Task 1: D-05 precedence rule + per-pair ledger, adjudicate 4 contested pairs** - `8c7cbbb0` (docs)
2. **Task 2: Error-code family — 28 `<a id>` anchors across five files** - `4dcc7d37` (feat)
3. **Task 3: Registry-path anchors + dry-run checkpoint** - `98241b24` (docs)

**Plan metadata:** captured in this SUMMARY commit (below)

## Files Created/Modified

- `docs/error-codes/01-mdm-enrollment.md` — 9 `<a id>` anchors added (row content unchanged otherwise)
- `docs/error-codes/02-tpm-attestation.md` — 8 `<a id>` anchors added, case-exact
- `docs/error-codes/03-esp-enrollment.md` — 3 `<a id>` anchors added
- `docs/error-codes/04-pre-provisioning.md` — 1 `<a id>` anchor added
- `docs/error-codes/05-hybrid-join.md` — 7 `<a id>` anchors added
- `docs/reference/registry-paths.md` — 2 `<a id>` anchors added
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — 1 row appended (grep-before-edit proof for the
  6-file corpus set)
- `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` — Plan 04 D-05
  precedence rule + per-pair ledger (Task 1) + dry-run checkpoint row (Task 3)

## Decisions Made

See frontmatter `decisions` for the full list. Summary: rather than reconciling the 51-pair/67-link
invariant from prior plans' narrative figures (which showed minor cross-plan drift in earlier
measurement windows — e.g. 67 vs 65 broken-anchor counts recorded at different points in the D-38
rollout), this plan re-measured the live corpus directly and confirmed the invariant holds exactly
against that live measurement. All four contested pairs were independently re-confirmed against
their target files rather than accepted from the plan's own table (D-03).

## Deviations from Plan

### Auto-fixed Issues

None — no Rule 1/2/3 auto-fixes were required. All edits were mechanical table-row `<a id>`
insertions (character addition only, one line per anchor) with no bugs, missing functionality, or
blocking issues encountered.

### Measured deviations from the plan's own literal acceptance-criteria grep text (recorded per D-36, not silently reconciled)

**1. `git diff -- docs/error-codes/ | grep '^+' | grep -vcE '^\+\|.*<a id="'` measures 5, plan expected 0**
- **Found during:** Task 2 acceptance-criteria verification
- **Detail:** All 5 hits are the unified diff's `+++ b/docs/error-codes/*.md` file-header lines
  (one per of the 5 edited files), which match `^+` but are not `<a id>`-carrying content rows —
  the same class of grep artifact Plan 03 recorded for an analogous pattern. Re-running with the
  `+++` headers excluded (`grep -vE '^\+\+\+'` before the `<a id>` filter) returns 0, confirming
  every genuine added content line does carry an `<a id>` tag.
- **Verification:** `git diff --numstat -- docs/error-codes/` shows added == removed per file (9,
  8, 3, 1, 7 respectively), confirming every edit is a same-line insertion, nothing else changed.

---

**Total deviations:** 0 auto-fixed. 1 measured discrepancy against the plan's own literal
acceptance-criteria grep text, recorded with derivation shown rather than silently reconciled, per
this phase's own D-36 discipline.
**Impact on plan:** None substantive — the discrepancy is an artifact of the plan's acceptance
grep pattern (unified-diff `+++` headers also start with `+`), not a defect in the corpus edits.
The underlying invariant (every added content line carries an `<a id>` tag, nothing else touched)
holds, verified by both a corrected grep and `git diff --numstat`.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 05 (Class B source-side rewrite) can proceed against this plan's measured 13-broken-anchor
  ground truth. The complete 8-pair/13-link Class-B set is itemized in `143-EVIDENCE.md`'s Plan 04
  section, with 4 of the 8 pairs already fully adjudicated with target-heading evidence this
  session (`entra`→`entra-id-sso`, `byod`→`byod-work-profile`,
  `edit-without-view-dependency-table`→`edit-without-view-dependency-table-op-3-prevention`, plus
  the already-known D-06 substitutions for `enrollment-status-page`/`self-deploying`); the
  remaining pairs (`cope`, `intunemacODC`) still need Plan 05's own per-link semantic-match read.
- No blockers. c17 (234/0/0), check-nav-hub-links (0/0/0), carve-gate (93 in-scope, all on-list)
  all green at this commit. The `.docx`-anchor-overclaim prohibition was honored — no publish-bundle
  build was run or cited as evidence; D-08's pandoc `w:bookmarkStart` limitation is restated in
  this plan's own frontmatter `must_haves.truths` rather than re-tested.

---
*Phase: 143-link-coverage-fence-mask-unification*
*Completed: 2026-08-11*

## Self-Check: PASSED

- FOUND: `docs/error-codes/{01,02,03,04,05}-*.md`, `docs/reference/registry-paths.md`,
  `.planning/milestones/v1.20-GOV-02-LEDGER.md`, `143-EVIDENCE.md`, this SUMMARY
- FOUND commits: `8c7cbbb0`, `4dcc7d37`, `98241b24` in `git log --oneline`
