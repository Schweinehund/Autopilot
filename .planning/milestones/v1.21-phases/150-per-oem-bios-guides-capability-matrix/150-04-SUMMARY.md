---
phase: 150-per-oem-bios-guides-capability-matrix
plan: 04
subsystem: docs
tags: [dell, hp, lenovo, intune, bios, firmware, capability-matrix, glossary, documentation]

# Dependency graph
requires:
  - phase: 150-01
    provides: The proven nine-H2/seven-anchor guide skeleton, the deferred-commit execution
      pattern (D-80), and the Dell tracer guide, authored and left uncommitted
  - phase: 150-02
    provides: The HP guide, authored and left uncommitted
  - phase: 150-03
    provides: The Lenovo guide, authored and left uncommitted, plus the U-1 research correction
      (Lenovo's lost-supervisor-password case is a sourced destructive path, not a silence)
provides:
  - "docs/reference/firmware-oem-matrix.md (RE-226, Approved, C17-enrolled and green) — a
    six-capability-H2 transposition of the three per-OEM guides, with a 2x2 inverted-prerequisite
    sub-table, the three-way literal cell vocabulary, a two-enumeration Key Gaps Summary, and
    per-OEM Source Attribution pins"
  - "docs/_glossary.md gains four Hardware terms (Sure Admin, Think BIOS Config, HP Connect,
    DCECMI), four sorted Alphabetical Index entries, and one Version History row"
  - "The single content commit (D-80) landing all three guides, the matrix and the glossary
    together — the phase's link graph closes and every gate returns to its phase-start baseline"
affects: [150-05, 151, 152]

# Actuals (#2632) — chars/4 over the realized diff this plan authored (the new matrix file plus
# the glossary edit; the three guides were authored by plans 01-03 and are not re-counted here).
actuals:
  tokens: 4375
  tasks: 3
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Reference-matrix transposition discipline: every cell traced to a guide sentence, never
      re-derived from the research artifacts directly — the guides are the single source of
      truth the matrix compresses."
    - "Three-way literal cell vocabulary (D-19) enforced across all six capability tables: a
      sourced value, `Not documented by vendor` for a checked-and-silent vendor page, or `n/a`
      for a structural absence — never conflated."
    - "Key Gaps Summary as two labeled enumerations (D-14) rather than one undifferentiated list,
      so a documented silence is never filed as a capability incapacity by section placement."

key-files:
  created:
    - docs/reference/firmware-oem-matrix.md
  modified:
    - docs/_glossary.md
    - docs/operations/firmware-bios/02-dell-bios-configuration.md (committed, authored in 150-01)
    - docs/operations/firmware-bios/03-hp-bios-configuration.md (committed, authored in 150-02)
    - docs/operations/firmware-bios/04-lenovo-bios-configuration.md (committed, authored in 150-03)

key-decisions:
  - "Recomputed doc_id at execution time per D-21: docs/_registry/RE-index.md held exactly 225
    rows with max RE-225, confirming RE-226 as planned."
  - "Rewrote all seven `> **Table summary:**` blockquotes to single, tight sentences after the
    first authoring pass tripped C17 assertion #12 (200-char cap) on all seven — the matrix is
    C17-enrolled where the three guides are not, and multi-line soft-wrapped blockquotes that
    would be fine in an unenrolled guide are not fine here."
  - "Switched the Source Attribution confidence markers from a colon-annotated bracket form
    (`[DIRECT: ...]`, matching aosp-oem-matrix.md's `[HIGH: ...]` style) to the bare `[DIRECT]`
    tag form 150-RESEARCH.md and PER-OEM-BIOS-GAP.md actually use, after the first pass failed
    the literal `\[DIRECT\]`/`\[RELAYED\]` acceptance grep — the plan's D-48 reference points at
    the research artifacts' own marker convention, not the reference-matrix precedent's."
  - "HP's Recovery-table 'Lost password' cell is `Not documented by vendor` rather than the plan's
    unaddressed-cell case papered over as `n/a`: the HP guide's own Recovery section is scoped
    entirely to the Endorsement Key gap and never engages the legacy BIOS-password model's loss
    case, which is a genuine, checked-and-silent absence rather than a structural non-existence —
    HP's legacy password model is a real, documented capability elsewhere in the guide (Authentication,
    Prerequisites), so `n/a` would have misrepresented it as not applicable to HP at all."
  - "The Prerequisites 2x2 sub-table's four cells were authored as four full pairwise-distinct
    strings (each keeping the plan's instructed core phrase — 'required starting state', 'cannot
    bootstrap one remotely', 'hard blocker') rather than the plan's literal two-word worked
    example, because the worked example itself repeats the exact phrase 'required starting state'
    for both Dell's no-password row and Lenovo's password-already-set row, which would have
    failed the acceptance criterion's pairwise-distinctness test read as raw cell-string equality."

patterns-established: []

requirements-completed: [BIOS-08, BIOS-09]  # BIOS-05, BIOS-06, BIOS-12 remain shared with Plan
  # 05 (no SUMMARY yet); requirements.ready-ids returned 2/5 ready — BIOS-08 and BIOS-09 only.

coverage:
  - id: D1
    description: "docs/reference/firmware-oem-matrix.md authored: 11 H2s / 9 anchors, C17-enrolled
      at RE-226 Approved, and its six capability H2s byte-identical to the three guides' six"
    requirement: "BIOS-12"
    verification:
      - kind: other
        ref: "grep -c '^## ' = 11; grep -c '<a id=' = 9; diff of the six capability H2 lines
          against 02-dell-bios-configuration.md's first six ^## lines = empty; c17-eee-contract.mjs
          = 235 files checked, 0 with violations"
        status: pass
    human_judgment: false
  - id: D2
    description: "Three-way literal cell vocabulary enforced (sourced value / Not documented by
      vendor / n/a), with the U-1-corrected Lenovo lost-supervisor-password cell shipping as a
      sourced value, not a silence"
    requirement: "BIOS-12"
    verification:
      - kind: other
        ref: "grep -c 'Not documented by vendor' = 4 (>=3 required); grep -c 'n/a' = 8 (>=1
          required); Lenovo lost-supervisor-password cell contains 'system-board replacement' and
          not 'Not documented by vendor'"
        status: pass
    human_judgment: false
  - id: D3
    description: "The 2x2 inverted-prerequisite sub-table sits inside Prerequisites with four
      pairwise-distinct cells, and HP's own prerequisite cell is a sourced value, never n/a"
    requirement: "BIOS-06"
    verification:
      - kind: other
        ref: "sub-table has exactly 2 data rows / 3 columns; the four Dell/Lenovo cells are four
          distinct full strings; HP's Prerequisites row 'Pre-existing BIOS password' cell states
          the retry-to-lockout behavior as a sourced value"
        status: pass
    human_judgment: false
  - id: D4
    description: "Key Gaps Summary ships as two labeled enumerations (capability absences,
      documentation silences) rather than one undifferentiated list"
    requirement: "BIOS-12"
    verification:
      - kind: other
        ref: "grep -c '^## Key Gaps Summary' = 1; section contains both '**Capability absences**'
          and '**Documentation silences**' labels"
        status: pass
    human_judgment: false
  - id: D5
    description: "docs/_glossary.md gains four Hardware H3 terms, four sorted Alphabetical Index
      entries on the unbroken single line, and one Version History row, with frontmatter dates
      byte-unchanged"
    requirement: "BIOS-05"
    verification:
      - kind: other
        ref: "four H3 greps = 1 each; awk NR==33 field count still parses as one physical line;
          git diff grep for last_verified/review_by changes = 0; grep -c '| Phase 150' = 1;
          check-phase-49.mjs = 22 passed, 0 failed"
        status: pass
    human_judgment: false
  - id: D6
    description: "One commit lands all five files (three guides, the matrix, the glossary edit)
      together, and every gate returns to its phase-start baseline"
    requirement: "BIOS-12"
    verification:
      - kind: other
        ref: "git log -1 --name-only shows exactly 5 files; check-nav-hub-links.mjs = 0/0;
          check-phase-144.mjs = 101 PASS, 0 FAIL, 0 SKIPPED; both pipeline self-tests pass at 225
          rows; docs/_registry/RE-index.md and scripts/pipeline/ both untouched"
        status: pass
    human_judgment: false

# Metrics
duration: ~55min
completed: 2026-08-25
status: complete
---

# Phase 150 Plan 04: Capability Matrix, Glossary Terms and Single Content Commit Summary

**Firmware OEM Capability Matrix (RE-226) authored as a byte-level transposition of the three
per-OEM guides — six capability H2s, a 2x2 inverted-prerequisite sub-table, the three-way literal
cell vocabulary, and a two-enumeration Key Gaps Summary — landed together with four new glossary
terms and all three guides in the phase's single content commit, closing the link graph and
returning every gate to its phase-start baseline.**

## Performance

- **Duration:** ~55 min
- **Started:** 2026-08-25 (session continuation from Plan 03)
- **Completed:** 2026-08-25
- **Tasks:** 3
- **Files modified:** 1 created (`docs/reference/firmware-oem-matrix.md`), 4 committed together
  with it (`docs/_glossary.md`, plus the three guides authored in plans 01-03)

## Accomplishments

- Authored `docs/reference/firmware-oem-matrix.md` at `RE-226`, `status: Approved`,
  `platform: Windows`, no `applies_to` key, `review_by` = `last_verified` + 60 days
  (2026-08-25 → 2026-10-24). 11 H2s / 9 hand-authored anchors; its six capability H2s
  (`## Delivery`, `## Authentication`, `## Scope`, `## Prerequisites`,
  `## Offboarding and Loss of the Management Plane`, `## Recovery`) are byte-identical to the
  three guides' own six, confirmed by an empty diff (SC#1, BIOS-05, BIOS-12).
- Transposed all six capability dimensions across Dell/HP/Lenovo rows, every cell traced to a
  guide sentence: Delivery's per-device-agent discriminator (Dell Yes; HP/Lenovo No), the
  Authentication custody column (Intune / HP's cloud vault / customer-controlled), the Scope
  table's shared OS-feature-gating chain with its cross-link to the TPM Attestation Failure
  Decision Tree, and the Recovery table's password-history vs. destructive-path vs. undocumented
  cells.
- Landed the 2x2 inverted-prerequisite sub-table inside `## Prerequisites` (D-31, BIOS-06): Dell
  and Lenovo require opposite BIOS-password starting states, stated as four pairwise-distinct
  cells, with a lead-in sentence and its own table-summary blockquote naming the inversion in
  words. HP's own Prerequisites cell carries the sourced retry-to-lockout behavior rather than
  `n/a` (D-35).
- Split `## Key Gaps Summary` into two labeled enumerations — capability absences and
  documentation silences — per D-14, so HP's undocumented Endorsement-Key-loss and Lenovo's
  undocumented certificate-private-key-loss never read as capability incapacities.
- Added `## Source Attribution` with per-OEM `[DIRECT]` pins plus two dedicated evidence pins
  naming the exact pages checked for the two genuine documentation silences.
- Added four Hardware terms to `docs/_glossary.md` (`### Sure Admin`, `### Think BIOS Config`,
  `### HP Connect`, `### DCECMI`), four sorted Alphabetical Index entries on the file's single
  unbroken index line, and one Version History row — frontmatter `last_verified`/`review_by`
  left byte-unchanged per the owner-ruled 90-day review cycle (D-87).
- Made the phase's single content commit `70978222` — three guides, the matrix, and the glossary
  edit, five files, nothing else. Ran every binding gate afterward: C17 235/0, link checker 0/0,
  check-phase-54 32/0, v1.20-milestone-audit exit 0 (16/0), check-phase-49 22/0, and the apex
  `check-phase-144.mjs` at `101 PASS, 0 FAIL, 0 SKIPPED` — the exact phase-start baseline. Both
  publish-bundle self-tests pass at their unchanged 225-row canaries.

## Task Commits

1. **Task 1: Author docs/reference/firmware-oem-matrix.md** — authored, uncommitted (staged for
   the single content commit per D-80).
2. **Task 2: Add four Hardware terms to the glossary** — authored, uncommitted (staged for the
   single content commit per D-80).
3. **Task 3: Make the single content commit** — `70978222` (docs) — the three guides, the matrix,
   and the glossary edit, five files.

**Plan metadata:** committed separately in the metadata commit that follows this SUMMARY (this
file, `STATE.md`, `ROADMAP.md`, and `REQUIREMENTS.md` for the two now-ready IDs).

## Files Created/Modified

- `docs/reference/firmware-oem-matrix.md` (created) — the Firmware OEM Capability Matrix, `RE-226`.
- `docs/_glossary.md` (modified) — four Hardware terms, four Alphabetical Index entries, one
  Version History row.
- `docs/operations/firmware-bios/02-dell-bios-configuration.md`,
  `03-hp-bios-configuration.md`, `04-lenovo-bios-configuration.md` — committed here (authored in
  plans 01-03, per the deferred-commit design).

## Decisions Made

- Recomputed `max(RE-NNN) + 1` from `docs/_registry/RE-index.md` before writing the frontmatter
  (D-21): 225 rows, max `RE-225`, confirming `RE-226` as planned.
- Rewrote all seven `> **Table summary:**` blockquotes from multi-line, soft-wrapped prose to
  single tight sentences after the first pass tripped C17 assertion #12 (the 200-char blockquote
  cap) on all seven — the matrix is C17-enrolled where the three guides are not, so a convention
  safe in an unenrolled guide is not automatically safe here.
- Switched the Source Attribution confidence markers to the bare `[DIRECT]` tag form used in
  `150-RESEARCH.md` and `PER-OEM-BIOS-GAP.md`, after a first pass using a colon-annotated bracket
  form (matching `aosp-oem-matrix.md`'s `[HIGH: ...]` style) failed the literal
  `\[DIRECT\]`/`\[RELAYED\]` acceptance grep.
- Categorized HP's Recovery-table "Lost password" cell as `Not documented by vendor` rather than
  `n/a`: HP's own Recovery section is scoped entirely to the Endorsement Key gap and never engages
  legacy-password loss, which is a genuine checked-and-silent absence — not a structural
  non-existence, since HP's legacy password model is a real, documented capability elsewhere in
  the guide.
- Authored the Prerequisites 2x2 sub-table's four cells as four full pairwise-distinct strings
  (each retaining the plan's instructed core phrase) rather than the plan's literal two-word
  worked example, because that worked example repeats "required starting state" verbatim for both
  Dell's no-password row and Lenovo's password-set row — which would fail the acceptance
  criterion's pairwise-distinctness test if read as exact cell-string equality.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] C17 assertion #12 violations from over-long table-summary blockquotes**
- **Found during:** Task 1 verification
- **Issue:** All seven `> **Table summary:**` blockquotes, authored as natural multi-sentence
  prose matching the guides' own style, exceeded C17's 200-character blockquote cap — a rule that
  does not bind the unenrolled guides but does bind this newly-enrolled matrix.
- **Fix:** Rewrote each to a single tight sentence under 200 characters, preserving the
  cross-vendor finding each summary states.
- **Files modified:** `docs/reference/firmware-oem-matrix.md`
- **Verification:** `node scripts/validation/c17-eee-contract.mjs` → `235 files checked, 0 with
  violations, 0 total violations`.
- **Committed in:** `70978222` (Task 3 commit)

**2. [Rule 1 - Bug] Source Attribution markers used the wrong bracket form**
- **Found during:** Task 1 verification
- **Issue:** First-pass Source Attribution pins used a colon-annotated bracket form
  (`[DIRECT: ...]`), matching `aosp-oem-matrix.md`'s `[HIGH: ...]` precedent, which does not match
  the acceptance criterion's literal `\[DIRECT\]`/`\[RELAYED\]` regex.
- **Fix:** Switched to the bare `[DIRECT]` tag followed by unbracketed descriptive text, matching
  the convention `150-RESEARCH.md` and `PER-OEM-BIOS-GAP.md` actually use.
- **Files modified:** `docs/reference/firmware-oem-matrix.md`
- **Verification:** `grep -cE '\[DIRECT\]|\[RELAYED\]' docs/reference/firmware-oem-matrix.md`
  returns 5 (>= 3 required).
- **Committed in:** `70978222` (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — formatting/authoring bugs caught by the plan's
own acceptance-criteria gate before the task was considered done).
**Impact on plan:** Both fixes are cosmetic corrections to the matrix's own authored prose, caught
during Task 1's own verification loop. No scope creep; no plan content changed.

## Issues Encountered

None.

## Verification Evidence

Ran in order, per Task 3's instructions (D-81, D-83), after the content commit:

1. `node scripts/validation/c17-eee-contract.mjs` → `235 files checked, 0 with violations, 0 total
   violations` — up exactly one file from the 234 baseline (the matrix is the only newly-enrolled
   file).
2. `node scripts/validation/check-nav-hub-links.mjs` → `0 hub-presence failure(s), 0 corpus-link
   failure(s), 0 total` — the link graph closes; every guide-to-guide, guide-to-matrix and
   matrix-to-guide link now resolves.
3. `node scripts/validation/check-phase-54.mjs` → `32 passed, 0 failed, 0 skipped`.
4. `node scripts/validation/v1.20-milestone-audit.mjs` → `16 passed, 0 failed, 0 skipped`, exit 0.
5. `node scripts/validation/check-phase-49.mjs` → `22 passed, 0 failed, 0 skipped` (D-84).
6. `node scripts/validation/check-phase-144.mjs` → `101 PASS, 0 FAIL, 0 SKIPPED (total checks:
   101)` — the exact phase-start baseline (D-83), ~18.6s.
7. `node scripts/pipeline/build-filename-map.mjs --self-test` → `8 passed, 0 failed`, including
   `parseRegistry(...) yields exactly 225 rows`.
8. `node scripts/pipeline/build-publish-bundle.mjs --self-test` → `15 passed, 0 failed`, including
   `Approved selection yields exactly 225 rows` — direct evidence the blast-radius fence held: the
   matrix ships `status: Approved` with no registry row, and per D-22 the publish bundle's Approved
   filter reads `docs/_registry/RE-index.md` rather than the document set, so an Approved document
   with no row is simply absent from the selection and nothing throws.
9. `git status --porcelain docs/_registry/RE-index.md` and `git status --porcelain
   scripts/pipeline/` both return empty — neither canary nor the registry was touched.
10. `git log -1 --name-only --format='%s'` on commit `70978222` lists exactly five files: the
    three guides, the matrix, and `docs/_glossary.md`.

## Phase 152 hand-forward

Phase 152 must land:

- A `docs/_registry/RE-index.md` row for `RE-226`, pointing at
  `docs/reference/firmware-oem-matrix.md`, `Status: Approved`.
- Registry and filename-map rows for the three unenrolled operations guides
  (`02-dell-bios-configuration.md`, `03-hp-bios-configuration.md`,
  `04-lenovo-bios-configuration.md`).
- The filename map regenerated by its own generator, never hand-edited.
- **Both** canary targets (`build-filename-map.mjs` and `build-publish-bundle.mjs`) recomputed
  from the registry after the rows land, never hard-coded from a document count. Hand forward the
  **rule** — recompute from the registry — not a specific row-count number.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The matrix, all three guides, and the glossary edit are committed together (`70978222`). Every
  binding gate — C17, the link checker, check-phase-54, v1.20-milestone-audit, check-phase-49, and
  the apex check-phase-144 — is back at its phase-start baseline.
- `docs/operations/firmware-bios/00-overview.md` is untouched, as required — Plan 05 owns it as
  Commit B.
- `BIOS-08` and `BIOS-09` are now ready and marked complete in this plan's metadata commit.
  `BIOS-05`, `BIOS-06` and `BIOS-12` remain shared with Plan 05 and stay open until Plan 05's
  SUMMARY exists (shared-ID gate, #2388).
- No blockers. Ready for Plan 05 (the overview commit).

## Self-Check: PASSED

- `[ -f docs/reference/firmware-oem-matrix.md ]` → FOUND
- `git log --oneline --all | grep 70978222` → FOUND (`7097822224929c64918afd8a125af2c07de663fe docs(150): per-OEM BIOS guides, capability matrix and glossary terms (BIOS-05..BIOS-10, BIOS-12)`)
- All plan-level `<acceptance_criteria>` re-run per task above (Verification Evidence section) — all PASS.
- Plan-level `<verification>` block re-run: five-file commit confirmed, C17 235/0, link checker 0/0, check-phase-54 0 failed, v1.20-milestone-audit exit 0, check-phase-49 22/0, apex 101/0/0, both pipeline self-tests pass at 225 rows.

---
*Phase: 150-per-oem-bios-guides-capability-matrix*
*Completed: 2026-08-25*
