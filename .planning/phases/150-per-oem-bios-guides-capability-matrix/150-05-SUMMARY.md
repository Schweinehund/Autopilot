---
phase: 150-per-oem-bios-guides-capability-matrix
plan: 05
subsystem: docs
tags: [dell, hp, lenovo, intune, bios, firmware, overview, routing, capability-matrix]

# Dependency graph
requires:
  - phase: 150-04
    provides: The single content commit (70978222) landing the three per-OEM guides, the
      capability matrix and the glossary edit — the link targets this plan routes to
provides:
  - "docs/operations/firmware-bios/00-overview.md corrected at seven sites: the false
    'not yet written' sentence replaced with outbound links to all three guides and the matrix,
    the HP admin.hp.com clause qualified rather than left stale, the HP and Lenovo custody quotes
    reduced to a claim-plus-link (their evidence now lives solely in the guides), the Dell quote
    left byte-unchanged, the canonical Dell/Lenovo prerequisite-inversion sentence added, and
    frontmatter dates advanced"
  - "The phase's second and final commit (Commit B, D-80), landing the file alone"
  - "Every binding gate class plus the apex re-verified back at the exact phase-start baseline
    after Commit B"
affects: [151, 152]

# Actuals (#2632) — chars/4 over the realized diff this plan authored.
actuals:
  tokens: 480
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Deferred-commit two-commit contract (D-80) closed: Commit A (content, Plan 04) then
      Commit B (overview routing, this plan) — the overview edit lands only after every link
      target it points to already exists, so the link checker never sees a dangling target."
    - "Quote relocation without loss: a custody blockquote plus its evidence line is removed from
      the router only when the identical quote already ships, with its own evidence line, in the
      guide the router now links to — verified both directions by grep (0 in overview, 1 in the
      guide) rather than assumed."

key-files:
  modified:
    - docs/operations/firmware-bios/00-overview.md

key-decisions:
  - "Site 5 (HP paragraph) qualifies the admin.hp.com clause in prose rather than deleting it: HP
    Connect is administered at admin.hp.com AND has appeared in the Intune admin center's Partner
    portals tab since April 2023 — both facts stand, and the corpus's routing spine (secret
    custody, not console location) is stated explicitly as what the two vendors actually differ on."
  - "Both custody quotes (HP cloud-vault, Lenovo Azure Key Vault) were reduced to a claim-plus-link
    per D-36 rather than left duplicated — Success Criterion 3 requires them quoted against Dell's
    statement inside the HP guide, and a pointer would not satisfy 'quoted against', so their only
    remaining home is the guide."
  - "The canonical inversion sentence ('Dell wants a virgin BIOS; Lenovo needs a provisioned one.')
    ships unbolded, as plain prose inside a sentence — the plan specified the exact byte-string but
    not a formatting treatment, and the file's existing prose convention in this section is plain
    sentences, not bolded fragments."
  - "The Related Resources bullet list gained all three guide links plus the matrix link (not just
    the matrix), because the domain's own router should list its own full inventory the way
    01-windows-dfci.md is already listed there — the plan left this to executor discretion and
    this reading matches D-38's stated intent (the router must point at both its procedures and
    its own comparison artifact)."

patterns-established: []

requirements-completed: [BIOS-05, BIOS-06, BIOS-07, BIOS-12]

coverage:
  - id: D1
    description: "The false 'vendor-specific procedures... not yet written' sentence is gone,
      replaced by outbound links to all three guides plus the capability matrix, with no dangling
      sentence fragment left behind"
    requirement: "BIOS-05"
    verification:
      - kind: other
        ref: "grep -c 'are not yet written in this corpus' = 0; grep -c for each of
          02-dell-bios-configuration.md/03-hp-bios-configuration.md/04-lenovo-bios-configuration.md
          each >= 1; manual read of the replaced region confirms the preceding sentence still ends
          with a full stop and the blank line before <a id=\"domain-boundary\"> survives"
        status: pass
    human_judgment: false
  - id: D2
    description: "The canonical Dell/Lenovo prerequisite-inversion sentence lands in the overview
      in its exact fixed byte-form, which is the placement Success Criterion 2 grades"
    requirement: "BIOS-06"
    verification:
      - kind: other
        ref: "grep -c 'Dell wants a virgin BIOS; Lenovo needs a provisioned one' = 1"
        status: pass
    human_judgment: false
  - id: D3
    description: "The HP and Lenovo custody quotes and their evidence lines are gone from the
      overview and confirmed present (quote text) in their respective guides; the Dell quote and
      its evidence line are byte-unchanged"
    requirement: "BIOS-07"
    verification:
      - kind: other
        ref: "'Passwords are managed by HP Connect and stored in a cloud vault' = 0 in overview,
          1 in 03-hp-bios-configuration.md; 'Lenovo.BIOS.Certificates module has been updated' = 0
          in overview; git diff HEAD~1 for the overview shows no removed line starting
          '-> Intune stores'; every remaining ^**Source:** line sits within 3 lines of a
          blockquote"
        status: pass
    human_judgment: false
  - id: D4
    description: "The admin.hp.com discoverability clause is qualified (Partner-portals-tab
      symmetry with Dell since April 2023) rather than deleted, closing U-6 with a positive answer"
    requirement: "BIOS-07"
    verification:
      - kind: other
        ref: "grep -ci 'Partner portals' >= 1; grep -c 'admin.hp.com' >= 1 (both facts survive)"
        status: pass
    human_judgment: false
  - id: D5
    description: "The 9 H2 / 7 anchor contract and zero-code-fence state are unchanged by the
      edit; frontmatter dates advanced to the execution date with a 60-day review interval; the
      file is committed alone as the phase's second commit"
    requirement: "BIOS-12"
    verification:
      - kind: other
        ref: "grep -c '^## ' = 9; grep -c '<a id=' = 7; grep -c '^```' = 0; last_verified =
          2026-08-25, review_by = 2026-10-24 (60-day arithmetic); git show --stat HEAD lists
          exactly one file"
        status: pass
    human_judgment: false
  - id: D6
    description: "Every binding gate class plus the apex is back at the exact phase-start
      baseline after Commit B, and the phase's own blast-radius (the seven expected corpus/
      planning paths) held"
    requirement: "BIOS-12"
    verification:
      - kind: other
        ref: "c17-eee-contract.mjs = 235/0/0; check-nav-hub-links.mjs = 0/0/0; check-phase-54.mjs
          = 32 passed 0 failed; v1.20-milestone-audit.mjs = 16 passed 0 failed, exit 0;
          check-phase-49.mjs = 22 passed 0 failed; check-phase-144.mjs = 101 PASS 0 FAIL 0
          SKIPPED; both pipeline self-tests pass at 225 rows; registry row count unchanged at 225"
        status: pass
    human_judgment: false

# Metrics
duration: 35min
completed: 2026-08-25
status: complete
---

# Phase 150 Plan 05: Firmware Domain Overview Correction (Commit B) Summary

**Corrected `docs/operations/firmware-bios/00-overview.md` at seven sites — replaced the now-false
"procedures not yet written" claim with links to all three per-OEM guides and the capability
matrix, relocated the HP and Lenovo custody quotes into their own guides, qualified the HP
discoverability claim, and landed the phase's second and final commit — closing Phase 150 with
every gate back at its exact phase-start baseline (apex 101/0/0).**

## Performance

- **Duration:** 35 min
- **Started:** 2026-08-25 (session continuation from Plan 04)
- **Completed:** 2026-08-25
- **Tasks:** 2
- **Files modified:** 1 (`docs/operations/firmware-bios/00-overview.md`)

## Accomplishments

- **Site 1/2/3 (Choosing a Path tail, lines 128-130 at plan time, confirmed unshifted at
  execution):** Replaced the sentence "Vendor-specific procedures for Dell, HP and Lenovo are not
  yet written in this corpus…" with outbound links to all three guides plus the matrix, followed by
  the canonical inversion sentence — `Dell wants a virgin BIOS; Lenovo needs a provisioned one.` —
  with one sentence of surrounding context per guide's Prerequisites section. The preceding sentence
  ("Two questions settle almost every case… who is willing to hold your BIOS password.") was
  preserved verbatim; no dangling fragment resulted.
- **Site 4 (Related Resources):** Added bullets for all three guides plus the
  `Firmware OEM Capability Matrix` link, using the two-level relative path
  `../../reference/firmware-oem-matrix.md` computed from the source file's directory.
- **Site 5 (HP custody paragraph, lines 48-54 at plan time):** Qualified the `admin.hp.com` clause
  — both facts now stand: the console is administered at `admin.hp.com`, and HP Connect has also
  appeared in the Intune admin center's Partner portals tab since April 2023, the same discovery
  surface Dell's Management Portal uses, so the two vendors are symmetric on discoverability and
  differ on secret custody. Reduced the HP cloud-vault blockquote and its evidence line to a
  custody claim plus a link to `03-hp-bios-configuration.md`, where the quote now lives with its
  own evidence line beside Dell's (satisfying Success Criterion 3's "quoted against" requirement).
- **Site 6 (Lenovo custody paragraph, lines 62-68 at plan time):** Same treatment — reduced the
  Azure Key Vault blockquote and its evidence line to a custody claim plus a link to
  `04-lenovo-bios-configuration.md`. The paragraph labeling the comparative RBAC/audit-logging
  claim as this corpus's own inference was left in place, unchanged.
- **Site 7 (frontmatter):** `last_verified: 2026-08-24` → `2026-08-25` (execution date);
  `review_by: 2026-10-23` → `2026-10-24` (+60 days by arithmetic).
- Left the Dell blockquote and its evidence line at lines 42-46 completely untouched, per the
  falsification re-fetch finding that the Learn page is byte-identical with both dates unchanged.
- Committed the file alone as Commit B: `2fab0ac5` —
  `docs(150): route the firmware domain overview to the new per-OEM guides and matrix (D-32, D-36,
  D-37, D-38, D-40)`. `git show --stat HEAD` confirms exactly one file.
- Re-ran every binding gate class plus the apex after Commit B; all returned to the exact
  phase-start baseline (see Verification Evidence below).

## Task Commits

1. **Task 1: Edit 00-overview.md at all seven sites** — `2fab0ac5` (docs) — committed alone.
2. **Task 2: Take every gate back to baseline and close the phase** — verification-only task, no
   code change; no separate commit (folded into the evidence recorded here and in this plan
   metadata commit).

**Plan metadata:** committed separately in the metadata commit that follows this SUMMARY (this
file, `STATE.md`, `ROADMAP.md`, and `REQUIREMENTS.md`).

## Files Created/Modified

- `docs/operations/firmware-bios/00-overview.md` — edited at seven sites; 34 insertions,
  16 deletions.

## Decisions Made

- The HP admin.hp.com clause was qualified in prose rather than replaced with a bare "symmetric"
  claim — both the console location fact and the Partner-portals-tab fact are stated explicitly,
  because deleting either would misrepresent HP's actual surface.
- Both custody quotes (HP, Lenovo) were reduced to a claim-plus-link rather than kept duplicated in
  both the overview and the guide — Success Criterion 3 requires the HP quote "quoted against"
  Dell's inside the HP guide, and a pointer in the overview does not satisfy that; the guides are
  now each quote's sole home.
- The inversion sentence ships as plain prose (not bolded) to match the surrounding section's
  existing sentence style rather than importing a different emphasis convention.
- Related Resources gained links to all three guides, not just the matrix — matching how
  `01-windows-dfci.md` is already listed there, and satisfying D-38's stated intent that the
  router point at both its procedures and its own comparison artifact.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written at all seven sites; no acceptance-criteria fix cycle was
needed.

### Recorded finding (not a defect of this plan)

**Whole-phase blast-radius diff includes an out-of-band, non-phase commit.** Task 2's instructions
ask for `git diff --name-only <phase-start SHA>..HEAD` to list exactly seven corpus/planning paths.
Running that diff (`b08edfd1..HEAD`) surfaces those seven paths correctly, but also surfaces ~120
additional files under `.claude/skills/google-style/` and `scripts/docs-style/`. These come from
commit `4efe0405` — `chore(docs-style): vendor the google-style skill and its tooling into the
repo` — a standalone 116-file, 13,608-insertion commit that landed between this phase's requirement
filing (`8f71bb2c`) and Plan 01's guide authoring (`78726b90`), authored by the same user outside
this phase's plan sequence. It touches no file this phase or any of its plans reference, no
`docs/_registry/RE-index.md`, no index file, and nothing under `scripts/validation/` or
`scripts/pipeline/` — confirmed by `git show 4efe0405 --stat`. Every gate re-run above (including
the apex, C17, and both pipeline self-tests) passed cleanly with this commit present in history,
so it has no bearing on Phase 150's own correctness. Recorded here rather than treated as a defect
because it is not phase-150 content and this plan has no scope to revert another session's commit.
The phase's own seven-path blast radius (the three guides, the matrix, the glossary edit, this
overview edit, and `.planning/REQUIREMENTS.md`) is exactly and only what plans 01-05 touched.

---

**Total deviations:** 0 auto-fixed. One recorded finding (out-of-band commit in the diff range,
verified harmless).
**Impact on plan:** None. All seven edit sites landed exactly as specified; all gates returned to
baseline.

## Issues Encountered

None.

## Verification Evidence

Ran in order, per Task 2's instructions (D-81, D-83), after Commit B:

1. Three-way H2 structural check: `diff` of `^## ` lines across
   `02-dell-bios-configuration.md`, `03-hp-bios-configuration.md`, `04-lenovo-bios-configuration.md`
   — empty in both directions (identical).
2. Matrix six-capability-H2 equality: the matrix's `^## ` lines with `## Summary`,
   `## Key Gaps Summary`, `## Source Attribution`, `## See Also`, `## Version History` dropped, diffed
   against `02-dell-bios-configuration.md`'s first six `^## ` lines — empty (byte-identical). This is
   the mechanical fact Success Criterion 1 rests on.
3. `node scripts/validation/c17-eee-contract.mjs` → `235 files checked, 0 with violations, 0 total
   violations` — unchanged from Plan 04's post-commit count (the overview is unenrolled).
4. `node scripts/validation/check-nav-hub-links.mjs` → `0 hub-presence failure(s), 0 corpus-link
   failure(s), 0 total` — every new outbound link from the overview resolves, and every fragment
   resolves against a real anchor.
5. `node scripts/validation/check-phase-54.mjs` → `32 passed, 0 failed, 0 skipped`.
6. `node scripts/validation/v1.20-milestone-audit.mjs` → `16 passed, 0 failed, 0 skipped`, exit 0.
7. `node scripts/validation/check-phase-49.mjs` → `22 passed, 0 failed, 0 skipped`.
8. `node scripts/validation/check-phase-144.mjs` → `101 PASS, 0 FAIL, 0 SKIPPED (total checks:
   101)` — the exact phase-start baseline.
9. `git status --porcelain` shows no modified or untracked corpus file left behind (only
   pre-existing, unrelated untracked items and an unrelated `.planning/config.json` modification
   that predates this plan and was never staged or touched by it).
10. `node scripts/pipeline/build-filename-map.mjs --self-test` → `8 passed, 0 failed`, including the
    225-row registry-parse assertion.
11. `node scripts/pipeline/build-publish-bundle.mjs --self-test` → `15 passed, 0 failed`.
12. `grep -c '^| RE-' docs/_registry/RE-index.md` → `225`, unchanged.
13. `git show --stat HEAD` on `2fab0ac5` lists exactly one file:
    `docs/operations/firmware-bios/00-overview.md`.
14. Whole-phase blast radius: `git diff --name-only b08edfd1..HEAD` lists the seven expected corpus/
    planning paths (`docs/operations/firmware-bios/02-dell-bios-configuration.md`,
    `03-hp-bios-configuration.md`, `04-lenovo-bios-configuration.md`,
    `docs/reference/firmware-oem-matrix.md`, `docs/_glossary.md`,
    `docs/operations/firmware-bios/00-overview.md`, `.planning/REQUIREMENTS.md`) plus this phase's
    own planning artifacts — and additionally the out-of-band `4efe0405` commit's ~120 files, recorded
    above as a harmless, non-phase inclusion in the diff range rather than a phase-150 defect.

## Accepted inconsistencies (D-88), restated for this plan's closing record

(a) Success Criterion 3's phrase about both paths carrying the fleet-first de-provisioning order is
HP-only in the sources — Dell documents no order at all, re-confirmed 2026-08-25. Owner-ruled D-30.
(b) The matrix ships `status: Approved` and is absent from the publish bundle until Phase 152 lands
its registry row, and nothing fails. Measured D-22.
(c) U-6 is now **closed with a positive answer** rather than left open — the research addendum
updates D-88's original wording, which anticipated it closing as open. This plan's site-5 qualifier
is that closure landing in the corpus.
(d) `06-windows-driver-firmware-updates.md` keeps vendor update clients generic while this phase
names Dell Command | Update, HP Image Assistant and Lenovo System Update. Deliberate, D-68.
(e) Success Criterion 1 and BIOS-05 say "five-section"; Plan 01 filed the six-section amendment in
`.planning/REQUIREMENTS.md` naming D-01 as its ground, so both are to be read through it.

Additionally, the measured correction to D-01's own descriptive text (recorded in Plan 01 and
Plan 04, restated here for the phase's closing record): the guides ship **three** tail H2s, not
two, because both `00-overview.md` and `01-windows-dfci.md` measurably do. D-78's anchor rule —
anchors equal H2 minus the two **unanchored** tail H2s — is unaffected and holds exactly.

## Phase 152 hand-forward

Restated as a rule, per Plan 04's original hand-forward, unchanged by this plan:

- A `docs/_registry/RE-index.md` row for `RE-226`, pointing at
  `docs/reference/firmware-oem-matrix.md`, `Status: Approved`.
- Registry and filename-map rows for the three unenrolled operations guides
  (`02-dell-bios-configuration.md`, `03-hp-bios-configuration.md`,
  `04-lenovo-bios-configuration.md`).
- The filename map regenerated by its own generator, never hand-edited.
- **Both** canary targets (`build-filename-map.mjs` and `build-publish-bundle.mjs`) recomputed from
  the registry after the rows land, never hard-coded from a document count. Hand forward the
  **rule** — recompute from the registry — not a specific row-count number.
- New: navigation-last wiring (`docs/index.md`, `docs/operations/00-index.md`) for the domain's
  three new guides and the matrix — neither index file was touched by any plan in Phase 150, per
  each plan's own prohibitions.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 150 is complete. All five plans landed; both commits (`70978222` content, `2fab0ac5`
  overview routing) are in place; every binding gate plus the apex is at its exact phase-start
  baseline.
- `BIOS-05`, `BIOS-06`, `BIOS-07` and `BIOS-12` are now ready and marked complete in this plan's
  metadata commit (shared-ID gate, #2388, confirmed via `requirements.ready-ids`: 4/4 ready).
- No blockers. Ready for `/gsd-verify-work 150`, then Phase 151.

## Self-Check: PASSED

- `[ -f docs/operations/firmware-bios/00-overview.md ]` → FOUND
- `git log --oneline --all | grep 2fab0ac5` → FOUND (`2fab0ac50 docs(150): route the firmware
  domain overview to the new per-OEM guides and matrix (D-32, D-36, D-37, D-38, D-40)`)
- All plan-level `<acceptance_criteria>` re-run per task above (Verification Evidence section) —
  all PASS.
- Plan-level `<verification>` block re-run: `git log -1 --name-only` on Commit B shows exactly one
  file; false-sentence grep = 0; inversion-sentence grep = 1; HP quote 0/1 split confirmed; H2/anchor
  counts unchanged at 9/7; all four gate classes plus the apex confirmed at baseline.

---
*Phase: 150-per-oem-bios-guides-capability-matrix*
*Completed: 2026-08-25*
