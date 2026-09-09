---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 05
subsystem: docs-hygiene
tags: [hyg-01, hyg-03, hyg-04, hyg-05, citation-date, autopatch, capability-matrix, nav-hub-links]

requires:
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 04
    provides: "check-prose-style.py standing gate, run here as a live re-verification that
      this plan's new prose introduces no gated-rule hit or leak-class token"
provides:
  - "HYG-01 closed at all five sites in three files (not only the requirement's named
    coordinate): both index paragraphs and both comparison-hub table rows now name Linux as
    a fifth platform, and the patch-management overview routes to the Linux update-delivery
    guide from its routing paragraph"
  - "HYG-03 closed: the macOS capability matrix names the Intune Microsoft Store app type
    instead of the Windows Package Manager as the Microsoft Store integration mechanism
    (cell-value edit only); the APv2 device-preparation policy's bare Microsoft Store mention
    now links through the stable explicit HTML anchor id, not the fragile em-dash-derived slug"
  - "HYG-04 closed at all three wrong-date sites (the requirement named one): the Windows
    Autopatch groups overview citation reads 2025-06-17 everywhere in the corpus (11 of 11
    dated citations), resolved from the page's own rendered ms.date, with the twelfth
    (undated) reference explicitly dispositioned rather than left unexamined"
  - "HYG-05 closed as a substantive correction, not a disambiguation: the Autopatch ring/group
    limits are re-attached to their real units (15 deployment rings per Autopatch group, 300
    Autopatch groups per tenant), not left misattributed to Entra groups"
affects: [158]

actuals:
  tokens: 2500
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Cell-value-only edits inside frozen-byte-pinned tables (macos-capability-matrix.md),
      verified by asserting the diff is exactly one line added / one line removed before
      running the frozen-read validator, not merely running the validator after the fact"
    - "Line-scoped date substitution instead of a corpus-wide sed: three named citation lines
      edited individually by exact surrounding text match, explicitly avoiding the five
      review_by frontmatter fields under docs/l2-runbooks/ that share the same date string
      but mean something different (document freshness, not a citation)"
    - "Presence-of-new-string assertions paired with absence-of-old-string assertions for
      every corrected fact, so a criterion cannot pass on a deletion that removed the fact
      entirely rather than correcting it"

key-files:
  modified:
    - docs/operations/00-index.md
    - docs/index.md
    - docs/operations/patch-management/00-overview.md
    - docs/operations/patch-management/01-windows-wufb-rings.md
    - docs/reference/macos-capability-matrix.md
    - docs/admin-setup-apv2/03-device-preparation-policy.md

key-decisions:
  - "Widened all three of HYG-01/HYG-04/HYG-05 beyond the requirement's own named coordinate,
    per the plan's own instruction and D-36/D-40/D-43: HYG-01 corrected all five hub sites
    (the requirement named the least-published one), HYG-04 corrected all three wrong-date
    sites (the requirement named one), and HYG-05 was corrected as a false-statement fix
    (re-attaching both limits to Autopatch groups) rather than a minimal disambiguation that
    would have satisfied the literal wording while still shipping a wrong planning limit."
  - "Recorded rather than edited: docs/admin-setup-apv2/02-etg-device-group.md:129 (already
    linked, anchor resolves, corrected in Phase 152 at commit 4816635b) and
    docs/operations/patch-management/00-overview.md:247 (Windows Package Manager control
    surface -- correct usage of that name, not a conflation)."
  - "Disposition recorded, not edited: 07-windows-autopatch.md:432, the twelfth (undated)
    citation of the Autopatch groups overview article in the ## External References list.
    Left undated because every sibling entry in that list is undated and this corpus's
    dated-citation convention is the bold Source-line form with a trailing
    updated-date parenthetical, not the further-reading list."
  - "ms.date corpus convention recorded with its evidence, not just its answer: the Learn
    page carries two date metas (ms.date 2025-06-17, updated_at 2026-06-19); what the page
    renders is a <local-time> element sourced as calculated, reading 2025-06-17; a control
    page with a divergent pair renders its own ms.date value, confirming the rule rather
    than a single reading. Never resolve this class of question with a summarizing fetch."

requirements-completed: [HYG-01, HYG-03, HYG-04, HYG-05]

coverage:
  - id: D1
    description: "All five update-enforcement hub descriptions (two index paragraphs, two
      comparison-hub table rows, one routing paragraph across three files) name Linux as a
      fifth platform; the four correct four-platform app-lifecycle/drift-migration
      descriptions are untouched"
    requirement: HYG-01
    verification:
      - kind: integration
        ref: "grep count assertion: zero 4-platform update-enforcement hub descriptions, exactly two 5-platform ones"
        status: pass
      - kind: integration
        ref: "grep count assertion: exactly four correct 4-platform app-lifecycle/drift-migration descriptions unchanged"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-54.mjs (32 PASS / 0 FAIL -- column-order assertion over the comparison table unmoved)"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-nav-hub-links.mjs (0 hub-presence failures, 0 corpus-link failures)"
        status: pass
    human_judgment: false
  - id: D2
    description: "macOS capability matrix names the Intune Microsoft Store app type instead
      of the Windows Package Manager as the Microsoft Store integration cell value (one
      line changed, structure preserved for the frozen byte-pin); APv2 device-preparation
      policy's bare Microsoft Store mention now links through the explicit HTML anchor id"
    requirement: HYG-03
    verification:
      - kind: integration
        ref: "grep assertions: zero occurrences of the old parenthetical, corrected cell present; git diff --numstat == 1/1 on macos-capability-matrix.md"
        status: pass
      - kind: integration
        ref: "grep assertions: new link targets #eam-store-winget-routing, zero occurrences of the double-hyphen slug"
        status: pass
      - kind: integration
        ref: "git diff --exit-code on 02-etg-device-group.md (byte-unchanged, confirming the recorded non-defect was left alone)"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-63.mjs (32 PASS / 0 FAIL -- frozen byte-pin over the matrix unmoved)"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-nav-hub-links.mjs (0 hub-presence failures, 0 corpus-link failures -- new anchored link resolves)"
        status: pass
    human_judgment: false
  - id: D3
    description: "All three wrong-date citations of the Windows Autopatch groups overview
      article corrected to 2025-06-17; the eight already-correct citations (including the
      two that ship in the publish bundle) are unchanged; the five review_by frontmatter
      fields under docs/l2-runbooks/ carrying the same date string are untouched; the
      twelfth (undated) reference has a recorded disposition"
    requirement: HYG-04
    verification:
      - kind: integration
        ref: "grep count assertion: zero wrong-date citations, exactly 11 correct-date citations of the same article"
        status: pass
      - kind: integration
        ref: "grep count assertion: exactly five review_by: 2026-06-19 frontmatter fields survive"
        status: pass
      - kind: integration
        ref: "git diff --numstat on 01-windows-wufb-rings.md == exactly 2 lines changed"
        status: pass
      - kind: integration
        ref: "python scripts/validation/check-prose-style.py (exit 0)"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-153.mjs (apex chain: 111 PASS / 0 FAIL / 0 SKIPPED, matches 157-BASELINE.json exactly)"
        status: pass
    human_judgment: false
  - id: D4
    description: "The Autopatch ring/group limits (15 deployment rings, 300 Autopatch groups)
      are re-attached to their real unit (Autopatch group / tenant), not left misattributed
      to Entra group; neither limit shares an antecedent with the other"
    requirement: HYG-05
    verification:
      - kind: integration
        ref: "grep presence assertions: both corrected limit strings present, zero occurrences of the false parenthetical"
        status: pass
      - kind: integration
        ref: "manual cross-check against 07-windows-autopatch.md:219-222's verbatim Microsoft quotes (up to 15 deployment rings per Autopatch group; up to 300 Autopatch groups in your tenant)"
        status: pass
    human_judgment: false

duration: 35min
completed: 2026-09-06
status: complete
---

# Phase 157 Plan 05: HYG-01/03/04/05 Corpus Hygiene Corrections Summary

**Ten corrected sites across six files (three of the four defects deliberately wider than the requirement's own named coordinate), plus two recorded non-defects and one recorded citation disposition, verified by grep-level presence/absence assertions and the full apex chain unmoved against `157-BASELINE.json`.**

## Performance

- **Duration:** 35 min
- **Started:** 2026-09-06T01:24:00Z (approx.)
- **Completed:** 2026-09-06T01:59:20Z
- **Tasks:** 3 (all `type="auto"`)
- **Files modified:** 6

## Accomplishments

- **HYG-01 corrected at all five sites in three files**, not only the requirement's named
  coordinate: `docs/operations/00-index.md:28,32`, `docs/index.md:305,309`, and
  `docs/operations/patch-management/00-overview.md`'s routing paragraph. Both index
  paragraphs now name Linux as a fifth platform alongside Windows/macOS/iOS/Android, both
  comparison-hub table rows read "5-platform" (was "4-platform"), and the overview's routing
  paragraph now links `05-linux-update-delivery.md`. The four correct four-platform
  app-lifecycle and drift-migration descriptions (`00-index.md:48,60`, `index.md:320,330`)
  were left byte-unchanged, and `check-phase-54.mjs`'s column-order assertion over the
  comparison table (Linux appended sixth, per D-37) is unmoved.
- **HYG-03 corrected as a cell-value edit plus an anchored link, plus two recorded
  non-defects.** `docs/reference/macos-capability-matrix.md:70` now names the Intune
  Microsoft Store app type instead of the Windows Package Manager as the Microsoft Store
  integration mechanism -- a single line changed, verified by `git diff --numstat == 1/1`,
  keeping the frozen byte-pin (`check-phase-63.mjs`) safe. `docs/admin-setup-apv2/
  03-device-preparation-policy.md:141`'s bare "Microsoft Store" mention is now a link
  through the stable explicit HTML anchor `#eam-store-winget-routing`, not the fragile
  em-dash-derived double-hyphen slug its already-linked sibling rides. Two non-defects were
  recorded rather than churned: `02-etg-device-group.md:129` (already linked, corrected in
  Phase 152 at `4816635b`) and `00-overview.md:247` (correct usage of "Windows Package
  Manager" as a control-surface name).
- **HYG-04 corrected at all three wrong-date sites**, not only the requirement's named
  coordinate: `00-overview.md:102`, `01-windows-wufb-rings.md:76`, and
  `01-windows-wufb-rings.md:101` all changed the Windows Autopatch groups overview citation
  from the wrong `2026-06-19` to the correct `2025-06-17`. All eleven dated citations of that
  article now agree (the eight that were already correct, including the two that ship in the
  publish bundle at `docs/recipes/05-enterprise-update-plan.md:95,106`, were left
  byte-unchanged). The five `review_by: 2026-06-19` frontmatter fields under
  `docs/l2-runbooks/` -- a document-freshness field, not a citation, sharing only the date
  string -- were explicitly NOT touched; a corpus-wide substitution would have falsified all
  five review schedules while every gate stayed green.
- **HYG-05 corrected as a substantive fact fix, not a disambiguation.** `00-overview.md:83`'s
  parenthetical previously read "a group supports up to 15 rings, and a tenant up to 300
  groups" with its nearest antecedent being *Entra group* -- both numbers were false as
  written. The corrected text reads "an Autopatch group supports up to 15 deployment rings,
  and a tenant supports up to 300 Autopatch groups," matching Microsoft's verbatim quotes at
  `07-windows-autopatch.md:219-222` exactly. Neither limit shares an antecedent with the
  other in the corrected text.
- **One citation disposition recorded rather than left unexamined:**
  `07-windows-autopatch.md:432`, the twelfth citation of the same article (an undated
  Further Reading / `## External References` entry), is left undated. Every sibling entry in
  that list is undated, and this corpus's dated-citation convention is the bold Source-line
  form with a trailing `(updated ...)` parenthetical, not the further-reading list.
- **The `ms.date` corpus convention recorded with its evidence**, per D-41: the Windows
  Autopatch groups overview Learn page carries two date metadata values -- `ms.date` reading
  `2025-06-17` and `updated_at` reading `2026-06-19` -- which is why this project twice
  received contradictory answers from the same URL in earlier phases. What the page
  *renders* is a `<local-time>` element whose datetime attribute and text both give
  `2025-06-17`, sourced as `calculated`. This corpus resolves a Learn citation date from the
  page's own rendered `ms.date`, never from a summarizing fetch, and never from `updated_at`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Correct all five update-enforcement hub descriptions to five platforms** -
   `18f378aa` (fix)
2. **Task 2: Correct the package-manager conflation and link its bare twin through the
   explicit anchor** - `97f7ca28` (fix)
3. **Task 3: Correct the three wrong citation dates and the false Autopatch group limits** -
   `2cacf1cb` (fix)

**Plan metadata:** recorded in this SUMMARY's own commit (below).

## Files Created/Modified

- `docs/operations/00-index.md` - Patch & Update Management section paragraph and table row
  now name/count five platforms including Linux.
- `docs/index.md` - byte-equivalent top-level index paragraph and table row, same
  correction, matching this file's own double-hyphen dash style.
- `docs/operations/patch-management/00-overview.md` - routing paragraph now links the Linux
  update-delivery guide; the Autopatch groups citation date and the Autopatch ring/group
  limit parenthetical are corrected.
- `docs/operations/patch-management/01-windows-wufb-rings.md` - both Autopatch groups
  overview citation dates corrected.
- `docs/reference/macos-capability-matrix.md` - Microsoft Store integration cell now names
  the Intune Microsoft Store app type instead of the Windows Package Manager.
- `docs/admin-setup-apv2/03-device-preparation-policy.md` - bare Microsoft Store mention now
  links through the explicit HTML anchor id.

## Decisions Made

See `key-decisions` in frontmatter for the full list. Summary: widened three of the four
corrections beyond the requirement's own named coordinate per the plan's explicit
instruction and the CONTEXT's D-36/D-40/D-43 rulings; recorded two non-defects and one
citation disposition rather than editing or silently omitting them; recorded the `ms.date`
resolution method as evidence, not just its answer.

## Deviations from Plan

None - plan executed exactly as written. One self-correction during authoring: an initial
edit to the Autopatch limit parenthetical (Task 3) briefly introduced a line-wrap the
original file did not have; this was caught before committing and corrected to keep the
edit on the single original line, preserving the file's existing wrap structure per the
plan's "do not reflow lines you were not asked to change" convention. No commit was made
with the wrapped version, so no revert was required.

**Total deviations:** 0.
**Impact on plan:** None - no scope creep, no auto-fixes required.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- HYG-01, HYG-03, HYG-04, and HYG-05 are each corrected at every site where the fact
  appears in this corpus, not only at the coordinate the requirement named.
- The two recorded non-defects (`02-etg-device-group.md:129`,
  `patch-management/00-overview.md:247`) and the one citation disposition
  (`07-windows-autopatch.md:432`) are written down with their reasons in this SUMMARY.
- The `ms.date` corpus convention (resolve from the page's own rendered bytes, with a
  control, never from a summarizing fetch) is recorded here with its evidence; plan 07
  carries it forward into the authoring standard as one sentence.
- The apex chain (`check-phase-153.mjs`) measures 111 PASS / 0 FAIL / 0 SKIPPED, matching
  `157-BASELINE.json`'s recorded apex exactly. `check-phase-54.mjs` (32/0),
  `check-phase-63.mjs` (32/0), `check-nav-hub-links.mjs` (0/0), and
  `check-prose-style.py` (exit 0) all remained clean throughout.
- No blockers for the remaining phase 157 plans (06, 07).

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-06*

## Self-Check: PASSED

All six modified files confirmed present on disk (`docs/operations/00-index.md`,
`docs/index.md`, `docs/operations/patch-management/00-overview.md`,
`docs/operations/patch-management/01-windows-wufb-rings.md`,
`docs/reference/macos-capability-matrix.md`,
`docs/admin-setup-apv2/03-device-preparation-policy.md`). All three task commits
(`18f378aa`, `97f7ca28`, `2cacf1cb`) confirmed present in `git log`. All plan-level
`<verify>` commands re-confirmed passing at time of writing: `check-phase-54.mjs` (32/0),
`check-phase-63.mjs` (32/0), `check-nav-hub-links.mjs` (0/0), `check-prose-style.py`
(exit 0), `check-phase-153.mjs` apex chain (111 PASS / 0 FAIL / 0 SKIPPED, matching
`157-BASELINE.json` exactly).
