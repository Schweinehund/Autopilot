---
phase: 158-final-corpus-verification-publish-bundle
plan: 05
subsystem: docs-style-audit
tags: [disposition-table, verify-meaning, style-checker, em-dash-sweep, staleness-gate, google-style]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: plan 158-02's three hand-remediation commits and plan 158-03's judge-packet fix and corpus-wide em-dash sweep, which this plan's tables disposition and whose fix_sha/post_line values this plan cites
provides:
  - "scripts/docs-style/_DISPOSITIONS-158.tsv: 9 corpus meaning-checker findings each with its own reason, header attributing 5 (not 4) planning-tree findings, zero undispositioned docs/ findings at base d0b611e8"
  - "scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv: the 93-occurrence + 27-no-candidates style disposition table over all 59 Phase-157-edited files, no anchor column"
  - "158-SWEEP-DISPOSITIONS.md: the thin narrative and three-limb re-proof at the post-edit revision"
affects: [158-06, 158-07]

# Actuals (#2632)
actuals:
  tokens: 74000
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "A phase-scoped sibling disposition table, never an append to a frozen or differently-scoped predecessor -- the loader accepts a wrong-file append silently, so the separation is a decision, not a parser constraint"
    - "In-process reuse of check.py's RULES/mask_code and sweep3.py's structural classifiers via check-prose-style.py's own _load_module() helper, intersected with a range diff's added-line numbers, instead of a new enumeration script or the per-file-fragment method"
    - "A disposition table's staleness gate is checked at line granularity, not per-finding: an edit or sweep on one token can move the byte-identity check for every other finding sharing that physical line, and each such movement must be investigated and recorded (commit + occurrence-still-exists confirmation), never silently re-anchored"

key-files:
  created:
    - scripts/docs-style/_DISPOSITIONS-158.tsv
    - scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-SWEEP-DISPOSITIONS.md

key-decisions:
  - "Header-attributed 5 planning-tree meaning-checker findings, not the 4 158-CONTEXT.md D-12 recorded -- a live re-measurement discrepancy explained in the file's own header (three more plans landed ordinary planning-process commits after D-12 was measured, and the checker has no path scoping to exclude .planning/)."
  - "Folded the word-list 'above' finding at EEE-SOP-standard.md:658 into its co-located directional 'above' EDIT row rather than giving it a separate row -- check.py's own RULES independently fire both mechanisms on the identical token, but only one physical edit (3c53f72a) resolves both, and a second row under any non-EDIT verdict would fail the post-edit byte-identity re-proof since the line demonstrably changed."
  - "Recorded 27 NO-CANDIDATES files, not 26 -- docs/_glossary-macos.md's added lines resolve entirely to zero scannable candidates alongside the eight docs/_templates/*.md files, a genuine one-file discrepancy from 158-CONTEXT.md D-59, not forced to match the written figure."
  - "Ran the plan's literal limb-two byte-identity check unmodified rather than excluding the 3 SWEPT rows from it; the resulting 14 reported movements are all investigated and recorded in the narrative (3 genuinely resolved by the sweep, 11 line-sharing artifacts where the specific flagged token is confirmed still present) rather than treated as a failure to hide."
  - "Corrected limb three's arithmetic from the naive '93 - 5 EDIT = 88' to the measured '93 - 5 EDIT - 3 SWEPT = 85', since the mechanical em-dash sweep is a separate mechanism from the five named style edits and also removes occurrences from the re-scan; 158-CONTEXT.md D-62's formula did not anticipate this and is recorded here as corrected, not silently reconciled to the wrong number."

requirements-completed: []

coverage:
  - id: D1
    description: "scripts/docs-style/_DISPOSITIONS-158.tsv holds exactly 9 data rows, one per meaning-checker corpus finding at base d0b611e8, each with a reason specific to that finding (8 share a wiring-comment class, the 9th a different HYG-02 terminology-fix class); its header attributes the (measured) 5 planning-tree findings without giving them rows; both predecessor disposition tables stay byte-unchanged; the checker leaves zero undispositioned docs/ findings with this table, though the literal process exit remains 1 while the planning-tree findings stand (recorded, not misrepresented as clean)."
    requirement: null
    verification:
      - kind: other
        ref: "awk data-row count == 9; python verify-meaning.py d0b611e8 --dispositions _DISPOSITIONS-158.tsv reports zero undispositioned docs/ findings (exit 1, recorded as expected); git diff --exit-code on both predecessor tables == 0; every row's reason non-empty and header attributes planning-tree findings"
        status: pass
    human_judgment: false
  - id: D2
    description: "scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv covers all 59 Phase-157-edited files (32 with occurrence rows, 27 with an explicit NO-CANDIDATES row), 9 tab-separated columns with no anchor column, only the 7 defined verdicts, exactly 5 EDIT rows each naming a real commit and post-edit line, every ground non-empty and never the generic 'product term' phrase, and every passive occurrence left KEEP-FLAGGED."
    requirement: null
    verification:
      - kind: other
        ref: "column-count check (9/9); header column-order line present with no 'anchor' token; verdict-vocabulary check (7 distinct values, all in the defined set); file-coverage check (all 59 edited files dispositioned, none extra); EDIT-count check (exactly 5, each with a resolvable commit and non-empty post-edit line); ground-non-empty and non-generic check; passive-flagged check (25/25 KEEP-FLAGGED)"
        status: pass
    human_judgment: false
  - id: D3
    description: "158-SWEEP-DISPOSITIONS.md carries the added-line arithmetic, the immutable named range, the in-process instrument and its blob identifier, the heading-suppression disclosure (both populations), 15+ sweep-file rows with the 6 outside-set files flagged, the 3 remediation commits, and the bundle-readme disposition row -- quoting no corpus line verbatim and carrying no bare-platform-token blockquote -- and the three-limb re-proof (limb 1: all 5 EDIT rows silent; limb 2: 14 movements investigated and recorded, none re-anchored; limb 3: 85 measured at the new tip, with the corrected 93-5-3 arithmetic) is recorded with its numbers, alongside a green check-phase-54/55/56 (32/32 each) and c17-eee-contract (237/0) in the landing commit."
    requirement: null
    verification:
      - kind: other
        ref: "required-content regex check (range/instrument/--no-headings/readme all present); corpus-path row count >= 15 (measured 20); no bare Platform blockquote token; check-phase-54/55/56.mjs 32/32/32 in the landing commit; c17-eee-contract.mjs 237/0 in the landing commit"
        status: pass
      - kind: manual_procedural
        ref: "limb-two literal automated check reports 14 moved lines (not 0); each investigated and recorded in the narrative's Limb Two section with its cause and a confirmation that the specific flagged occurrence still exists (11 of 14) or was intentionally resolved (3 of 14, the SWEPT rows)"
        status: pass
    human_judgment: true
    rationale: "The plan's literal limb-two check is designed to surface exactly this class of finding (a non-EDIT row whose line moved) and its own action text requires investigating and recording rather than treating a clean pass as the only acceptable outcome. A human should confirm the 14 recorded movements are correctly explained (matches the flagged-occurrence-still-present pattern for 11, and the intentionally-resolved SWEPT pattern for 3) rather than have this auto-pass on a script exit code alone."

# Metrics
duration: 23min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 5: Disposition Tables and the Post-Edit Sweep Re-Proof Summary

**Built two machine-readable disposition tables (9 corpus meaning-checker findings, 93 style occurrences + 27 no-candidates files across all 59 Phase-157-edited files) and a thin narrative that re-proves the record at HEAD, correcting two written figures (5 planning-tree findings not 4, 27 no-candidates files not 26) and one arithmetic formula (93-5 EDIT-3 SWEPT=85, not 93-5=88) against live measurement.**

## Performance

- **Duration:** 23 min
- **Started:** 2026-09-08T06:59:27Z
- **Completed:** 2026-09-08T07:22:26Z
- **Tasks:** 3
- **Files created:** 3

## Accomplishments

- `scripts/docs-style/_DISPOSITIONS-158.tsv` (commit `485598e9`): 9 data rows, one per meaning-checker corpus finding at base `d0b611e8`, each with its own reason. 8 share a wiring-comment class (Phase 157 D-30's STD-03 authoring instruction inserted into 8 doc-class templates' HTML comments); the 9th is a different HYG-02 terminology fix inside a citation-provenance comment. Header attributes 5 planning-tree findings (REQUIREMENTS.md, STATE.md ×2, WINDOWS.md, SEED-001) — a live discrepancy from `158-CONTEXT.md` D-12's recorded 4, explained in the header: three more plans landed ordinary planning-process commits since D-12 was measured. `verify-meaning.py d0b611e8 --dispositions` this table leaves zero undispositioned `docs/` findings; the literal process exit stays 1 while the 5 planning-tree findings stand, recorded rather than misrepresented as clean. Both predecessor tables (`_DISPOSITIONS-batch10.tsv`, `_DISPOSITIONS-docs.tsv`) confirmed byte-unchanged.
- `scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv` (commit `e0dbac28`): columns `file/ord/line/rule/token/verdict/ground/fix_sha/post_line`, no anchor column. Measured live: 184 added lines (27 blank/24 mask-blank/11 heading → 122 scannable), 94 raw occurrences (47 word-list/25 passive/19 em-dash/3 directional) across 53 lines in 32 files — matches `158-CONTEXT.md` D-11/D-59/D-60 exactly. All 59 edited files dispositioned: 32 with occurrence rows (93, after folding one duplicate finding into its co-located EDIT row), 27 with an explicit NO-CANDIDATES row (one more than D-59's recorded 26). Exactly 5 EDIT rows, each naming a real commit and post-edit line. 19 em-dash occurrences resolve to 3 SWEPT / 11 KEEP-PROTECTED (table rows) / 5 MASK-ARTIFACT (`check.py`'s `mask_code()` manufactures spacing around a masked link target). All 25 passive occurrences KEEP-FLAGGED per D-39/D-61. Every ground names a specific word-list/voice scope, sense mismatch, parser artifact, or structural class — never the generic "product term".
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-SWEEP-DISPOSITIONS.md` (commit `46e71b09`): the thin narrative carrying the arithmetic, the immutable range (`d0b611e8..937d0a1f`, confirmed identical to `3a5c74b6^..937d0a1f`), the in-process instrument and `check.py`'s blob SHA (`f4ee7b199944149f74977bca65d6f00b9ab5a025`), the heading-suppression disclosure (0 extra within this table's added-line scope; 2391 vs. 2049 whole-corpus-slice, out of scope), 15 sweep-file rows with the 6 outside-59-set files flagged, the 3 remediation commits, and the bundle-readme disposition row citing RE-237's Asset Provenance section. The three-limb re-proof: limb one confirms all 5 EDIT rows' rule/token no longer fire; limb two's literal check reports 14 moved lines (not 0) — every one investigated and recorded (3 are the SWEPT rows themselves, correctly resolved; 11 share a physical line with an edited/swept token but each flagged occurrence is confirmed still present at HEAD, so the disposition holds); limb three measures 85 raw occurrences at the new tip, matching the corrected formula 93 − 5 EDIT − 3 SWEPT = 85 (not the naive 93−5=88 D-62's written formula implied). `check-phase-54/55/56.mjs` all 32/32 and `c17-eee-contract.mjs` 237/0 in the landing commit.

## Task Commits

Each task was committed atomically:

1. **Task 1: Disposition the meaning checker's corpus findings in a new sibling table** - `485598e9` (fix)
2. **Task 2: Build the style disposition table over all fifty-nine edited files** - `e0dbac28` (feat)
3. **Task 3: Write the sweep narrative and re-prove the record at the post-edit revision** - `46e71b09` (docs)

_Note: this plan is `type="execute"`, not TDD -- no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `scripts/docs-style/_DISPOSITIONS-158.tsv` - 9 corpus meaning-checker finding dispositions, header-attributes 5 planning-tree findings
- `scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv` - 93 occurrence rows + 27 NO-CANDIDATES rows over the 59-file edit set
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-SWEEP-DISPOSITIONS.md` - narrative index and three-limb re-proof

## Decisions Made

See `key-decisions` in frontmatter. In brief: attributed 5 (not 4) planning-tree meaning-checker findings per live measurement; folded a duplicate directional/word-list "above" finding into one EDIT row to hold the table at exactly 5 EDIT rows without breaking the byte-identity re-proof; recorded 27 (not 26) NO-CANDIDATES files; ran the plan's literal staleness-gate check unmodified and investigated/recorded all 14 reported movements rather than suppressing or excluding any of them; corrected limb three's arithmetic to account for the mechanical sweep's own occurrence removal.

## Deviations from Plan

### Auto-fixed Issues

None — no bugs, missing critical functionality, or blockers required an auto-fix under Rules 1-3.

### Discovered, Not Auto-Fixed (measured discrepancies from the plan's own written figures)

**1. [Measurement discrepancy] Planning-tree meaning-checker findings measured at 5, not the 4 recorded in 158-CONTEXT.md D-12**
- **Found during:** Task 1
- **Issue:** `158-CONTEXT.md` D-12 recorded 4 `.planning/` findings at base `d0b611e8`. Live re-measurement (per project convention: re-derive, never copy) found 5 — `.planning/REQUIREMENTS.md`, `.planning/STATE.md` (×2, frontmatter + quotation), `.planning/WINDOWS.md`, and `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md`.
- **Fix:** Not a fix — a measurement. The header of `_DISPOSITIONS-158.tsv` attributes all 5 with individual explanations (each traced to a specific ordinary planning-process commit landed by plans 158-01 through 158-04, all after D-12 was measured).
- **Files modified:** `scripts/docs-style/_DISPOSITIONS-158.tsv` (header only).
- **Verification:** `python verify-meaning.py d0b611e8` (no dispositions) reports 14 findings total, 9 `docs/` + 5 `.planning/`.
- **Committed in:** `485598e9`

**2. [Measurement discrepancy] 27 NO-CANDIDATES files, not the 26 recorded in D-59**
- **Found during:** Task 2
- **Issue:** `158-CONTEXT.md` D-59 recorded 26 files with neither a candidate nor a sweep edit. Live measurement found 27: `docs/_glossary-macos.md` plus all eight `docs/_templates/*.md` files resolve to zero scannable candidates (their added lines are entirely blank, headings, or mask-blanked).
- **Fix:** Not a fix — recorded as measured in both the TSV header and this summary.
- **Files modified:** `scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv` (27 NO-CANDIDATES rows), `158-SWEEP-DISPOSITIONS.md`.
- **Verification:** Coverage check confirms all 59 edited files dispositioned, none extra.
- **Committed in:** `e0dbac28`

**3. [Arithmetic correction] Limb three's formula corrected from "93 − 5 = 88" to "93 − 5 EDIT − 3 SWEPT = 85"**
- **Found during:** Task 3
- **Issue:** `158-CONTEXT.md` D-62 states the re-scan at the new tip should total "94 − Σ EDIT". Re-running the instrument at HEAD measured 85, not 88 (the naive 93−5 reading, using this table's own 93-row count). The gap is the 3 `SWEPT` occurrences: the mechanical em-dash sweep is a separate mechanism from the five named style edits and also removes occurrences from the re-scan, which D-62's formula did not account for.
- **Fix:** Not a fix — the corrected formula (93 − 5 − 3 = 85) is recorded in the narrative alongside the measured number, rather than forcing the table or the narrative to assert 88.
- **Files modified:** `158-SWEEP-DISPOSITIONS.md`.
- **Verification:** Direct re-run of the instrument against HEAD content for all 59 files, same added-line set, reports 85.
- **Committed in:** `46e71b09`

**4. [Expected, documented] Limb two's literal staleness check reports 14 moved lines, not 0**
- **Found during:** Task 3
- **Issue:** The plan's own literal automated check for limb two treats any non-`EDIT`/non-`NO-CANDIDATES` row whose line differs pre/post-edit as a "moved line" requiring investigation. Since the table is keyed at line granularity and several lines carry both an edited/swept token and other independent findings, 14 rows (not the 3 `SWEPT` rows alone) report as moved.
- **Fix:** Not a fix — per the plan's own instruction ("do not re-anchor the row... record the movement... state whether the occurrence still exists"), all 14 are investigated individually in `158-SWEEP-DISPOSITIONS.md`'s Limb Two section: 3 are the `SWEPT` rows (correctly resolved), 11 share a line with an edit/sweep on a *different* token but the specific flagged occurrence in each is confirmed still present at HEAD by direct inspection.
- **Files modified:** None (investigation only); recorded in `158-SWEEP-DISPOSITIONS.md`.
- **Verification:** Manual line-by-line inspection at HEAD for all 14 (`sed -n` against the four physical lines involved) confirms each flagged token/phrase is either resolved (SWEPT) or still present unchanged.
- **Committed in:** `46e71b09`

---

**Total deviations:** 0 auto-fixed (Rules 1-3 never triggered); 4 measured discrepancies from the plan's/context's written figures, all recorded per the plan's own explicit instruction to measure live and record differences rather than force the expected numbers.
**Impact on plan:** None of the four affects the plan's success criteria — every acceptance criterion and automated verify command in the plan passed against the live-measured figures. The discrepancies are corrections to earlier written records (158-CONTEXT.md), not defects in this plan's own output.

## Known Stubs

None.

## Issues Encountered

None beyond the four measured discrepancies documented above under Deviations.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Both disposition tables and the narrative are ready for plan 158-06's gate-baseline `drift[]` attribution (the 6 outside-59-set swept files, the pin-differ result, and the corpus-meaning/style-disposition discharge flags) and plan 158-07's bundle work.
- The corrected figures (5 planning-tree findings, 27 NO-CANDIDATES files, the 93−5−3=85 arithmetic) should be cited by any later plan referencing this table's population, in preference to `158-CONTEXT.md`'s original D-12/D-59/D-62 figures.
- No blockers.

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All 3 created files confirmed present on disk: `scripts/docs-style/_DISPOSITIONS-158.tsv`, `scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv`, `.planning/phases/158-final-corpus-verification-publish-bundle/158-SWEEP-DISPOSITIONS.md`.
- All 3 task commits (`485598e9`, `e0dbac28`, `46e71b09`) confirmed present via `git log --oneline --all`.
- All task-level `<acceptance_criteria>` and `<verify>` commands re-confirmed passing above with their exact command output (9 data rows / zero undispositioned docs findings / predecessors byte-unchanged for Task 1; 9-column no-anchor table, 7-value verdict vocabulary, full 59-file coverage, exactly 5 resolvable EDIT rows, non-empty non-generic grounds, all-flagged passives for Task 2; required narrative content, 20 sweep-file rows, no bare-platform blockquote, and green check-phase-54/55/56 32/32 + c17-eee-contract 237/0 for Task 3).
- Plan-level `<verification>` re-confirmed: both disposition tables and the narrative meet every listed criterion; the four measured discrepancies from `158-CONTEXT.md`'s written figures (5 planning-tree findings, 27 NO-CANDIDATES files, the corrected 93-5-3=85 arithmetic, and the 14-line staleness-gate investigation) are recorded rather than forced to match the earlier record, per this plan's own explicit instruction.
