---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 06
subsystem: docs-hygiene
tags: [hyg-06, hyg-07, glossary, autopatch, hotpatch, seed-close]

requires:
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 05
    provides: "The corrected 15-rings/300-groups Autopatch limits in
      07-windows-autopatch.md, which this plan's Autopatch group glossary
      entry restates and must agree with"
provides:
  - "HYG-06 closed for the five genuinely absent terms: Hotpatching, Autopatch
    group, Microsoft 365 Apps update channels, and Enterprise App Catalog
    entries added to docs/_glossary.md under the existing Deployment Modes
    category heading, and unattended-upgrades added to docs/_glossary-linux.md
    under Agent & Service. DFCI recorded as already satisfied (Phase 149); the
    requirement's stated count of six falsified to five (D-44)."
  - "Each entry lands as a complete four-part unit (entry + Alphabetical Index
    line + amended Summary coverage sentence + dated Version History row) per
    the Phase 149/150 shoehorn-plus-re-declare precedent (D-45/D-46); neither
    glossary's last_verified/review_by was advanced, and both files' Version
    History records the deliberate non-advance citing the 90-day review-cycle
    owner ruling D-63."
  - "HYG-07 closed: SEED-001 frontmatter status flipped from planted to closed
    (one-line edit). D-49's falsification recorded — the requirement's stated
    rationale that a seed scanner would be trained to ignore an unclosed seed
    is false, because gsd-tools' scanSeeds recognises only {dormant, active,
    triggered} as unimplemented, and planted was never in that set. No guard
    built, per D-49's ruling against normalizing this repo's off-schema seed
    vocabulary."
affects: [158]

actuals:
  tokens: 4740
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Shoehorn-plus-re-declare glossary additions (D-45): new vocabulary that
      does not fit any existing category heading is placed under the closest
      one, with the Summary coverage sentence amended in the SAME commit to
      declare the widened scope, rather than creating a new category or a new
      glossary file."
    - "Version-History term mentions written as plain prose (\"the Hotpatching
      ... terms\") rather than repeating the literal `### Term` heading
      string, so a duplicate-detection grep counting exact H3-heading
      occurrences is not defeated by the file's own changelog restating the
      heading text — the established Phase 149/150 precedent restates
      headings literally in Version History and would read as a duplicate
      under a literal-count check; this plan's rows deliberately avoid that
      collision while still satisfying D-46's checklist."
    - "Freshness-field freeze recorded as a dedicated Version History row
      (not folded into the addition row), matching the Phase 149 2026-08-25
      row's shape exactly, so the deliberate non-advance is independently
      greppable."

key-files:
  modified:
    - docs/_glossary.md
    - docs/_glossary-linux.md
    - .planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md

key-decisions:
  - "Recorded the DFCI falsification per D-44: HYG-06's requirement text
    names six terms; only five are genuinely absent from all six glossary
    files. DFCI already has a full entry (docs/_glossary.md:183, added Phase
    149) covering the CSP path, certificate-chain authorization, per-setting
    reporting, reinstall persistence, and the Autopilot-registration gate. No
    DFCI entry was added or edited."
  - "All four Windows terms placed under the existing '## Deployment Modes'
    heading (D-45) rather than a new category or a new patch-management
    glossary file — none of the six existing H2s (Autopilot, Enrollment,
    Hardware, Network, Security, Deployment Modes) naturally takes
    patch-management vocabulary, and Deployment Modes is the closest,
    keeping the Summary re-declaration to a single added clause."
  - "The Autopatch group entry restates the same two limits Plan 05 corrected
    in 07-windows-autopatch.md — 15 deployment rings per Autopatch group, 300
    Autopatch groups per tenant — verified present verbatim in the new entry
    so the glossary does not contradict the guide it summarises."
  - "unattended-upgrades placed in docs/_glossary-linux.md under '## Agent &
    Service' (D-45), alongside dpkg, intune-agent.timer, intune-portal, and
    microsoft-identity-broker — the right neighbourhood for an APT-side
    package and timer. No Cross-platform note added: the term is Linux-native
    with no twin in the Windows/macOS/Android glossaries (verified via
    check-phase-49.mjs's own sibling-term collision scan, V-49-19 PASS)."
  - "Alphabetical Index entries inserted at alphabetically plausible positions
    among immediate neighbours in both files, matching each file's existing
    (non-strictly-alphabetical) convention; neither index was re-sorted, and
    the known ZTDID-before-ZTD tail in docs/_glossary.md is verified
    byte-identical after the edit (D-47)."
  - "Both glossaries' last_verified (2026-06-29) and review_by (2026-09-27)
    frontmatter fields left byte-unchanged; each file's Version History gained
    a second dedicated row stating the deliberate non-advance and citing the
    90-day-cycle owner ruling D-63 (2026-08-25), matching the Phase 149
    2026-08-25 row's own shape and wording pattern."
  - "SEED-001: exactly one frontmatter line changed (status: planted ->
    status: closed). seed_id, planted, planted_during, trigger_when, and the
    document body are byte-unchanged. No corpus file under docs/ was touched
    by this task."
  - "No seed-scan guard built, per D-49's explicit ruling: gsd-tools'
    scanSeeds (~/.claude/gsd-core/bin/lib/audit.cjs) feeds the
    gsd-tools audit-open milestone-close-gate audit, but recognises only
    {dormant, active, triggered} as unimplemented statuses. 'planted' was
    never in that set, so the scanner never flagged SEED-001, and HYG-07's
    own stated rationale (a seed that never closes trains the scan to be
    ignored) is false. 'closed' is likewise not a recognised terminal status
    (the plant-seed workflow writes 'dormant'), so this edit is cosmetically
    correct and mechanically inert against that scanner. The edit is correct
    on its own merits regardless: SEED-001's content shipped in v1.13,
    verified across three buckets at named lines. The real latent risk is the
    inverse — normalizing this repository's seed vocabulary to the GSD schema
    would flip SEED-001 to open at a future close gate — which is why that
    normalization is deliberately NOT attempted here and remains on the
    phase's deferred list."

requirements-completed: [HYG-06, HYG-07]

coverage:
  - id: D1
    description: "Four Windows update/app-delivery glossary terms (Hotpatching,
      Autopatch group, Microsoft 365 Apps update channels, Enterprise App
      Catalog) added to docs/_glossary.md as a complete four-part unit each"
    requirement: "HYG-06"
    verification:
      - kind: other
        ref: "grep-based exact-occurrence + Alphabetical Index-link checks for
          all four terms (Task 1 <verify> block, PLAN 157-06)"
        status: pass
      - kind: other
        ref: "H3 count == 51 and H2 count == 9 in docs/_glossary.md"
        status: pass
      - kind: other
        ref: "Autopatch limits ('up to 15 deployment rings', 'up to 300
          Autopatch groups') present verbatim, matching 07-windows-autopatch.md"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs -> 237 files
          checked, 0 with violations, 0 total violations"
        status: pass
      - kind: other
        ref: "python scripts/validation/check-prose-style.py -> exit 0, all
          assertions PASS"
        status: pass
    human_judgment: false
  - id: D2
    description: "unattended-upgrades glossary term added to
      docs/_glossary-linux.md as a complete four-part unit"
    requirement: "HYG-06"
    verification:
      - kind: other
        ref: "grep-based exact-occurrence + Alphabetical Index-link check for
          unattended-upgrades (Task 2 <verify> block, PLAN 157-06)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-49.mjs -> 22 passed, 0
          failed, 0 skipped (all 5 mandatory H2s, cross-platform-collision
          rule, and pinned reciprocal-link literal intact)"
        status: pass
      - kind: other
        ref: "git diff --exit-code -- docs/operations/patch-management/05-linux-update-delivery.md
          -> exit 0 (source guide untouched)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Both glossaries' last_verified/review_by frontmatter fields
      left byte-unchanged, with the deliberate non-advance recorded in a
      dated Version History row citing D-63's 90-day review cycle"
    requirement: "HYG-06"
    verification:
      - kind: other
        ref: "grep for last_verified: 2026-06-29 / review_by: 2026-09-27 in
          both files + 'deliberately NOT advanced' text present"
        status: pass
    human_judgment: false
  - id: D4
    description: "SEED-001 closed with a one-line frontmatter edit and the
      off-schema seed-status vocabulary recorded rather than normalized"
    requirement: "HYG-07"
    verification:
      - kind: other
        ref: "grep for status: closed, absence of status: planted, git
          diff --numstat == 1/1, no docs/ file touched (Task 3 <verify>
          block, PLAN 157-06)"
        status: pass
    human_judgment: false

duration: 35min
completed: 2026-09-05
status: complete
---

# Phase 157 Plan 06: Glossary Terms + Stale Seed Closure Summary

**Five new glossary terms for v1.21's update/app vocabulary (DFCI's requirement-count falsified from six to five), and SEED-001 closed with its scanner-irrelevance recorded rather than silently absorbed.**

## Performance

- **Duration:** 35 min
- **Started:** 2026-09-05T00:00:00Z (approx.)
- **Completed:** 2026-09-05T00:35:00Z (approx.)
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Authored `### Hotpatching`, `### Autopatch group`, `### Microsoft 365 Apps update channels`, and `### Enterprise App Catalog` in `docs/_glossary.md` under the existing `## Deployment Modes` heading, each as a complete four-part unit (entry, Alphabetical Index line, amended Summary sentence, Version History row)
- Authored `### unattended-upgrades` in `docs/_glossary-linux.md` under `## Agent & Service`, verified to need no cross-platform collision note
- Recorded the DFCI falsification: HYG-06's requirement text says six terms, the measurement says five — DFCI is already satisfied (Phase 149)
- Closed SEED-001 (`status: planted` -> `status: closed`) and recorded that the requirement's own stated rationale for closing it is false, without building a seed-status guard

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the four Windows update and app terms in docs/_glossary.md** - `9a874830` (feat)
2. **Task 2: Author unattended-upgrades in docs/_glossary-linux.md** - `57c0ba61` (feat)
3. **Task 3: Close SEED-001 and record the off-schema status vocabulary** - `9c93a2f3` (fix)

## Files Created/Modified
- `docs/_glossary.md` - Four new H3 entries (Deployment Modes section), four Alphabetical Index links, amended Summary sentence, two new Version History rows
- `docs/_glossary-linux.md` - One new H3 entry (Agent & Service section), one Alphabetical Index link, amended Summary sentence, two new Version History rows
- `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md` - One-line frontmatter status flip

## Decisions Made
See `key-decisions` in frontmatter above for the full list. Highlights: DFCI count falsification (D-44) recorded rather than absorbed; all four Windows terms shoehorned under Deployment Modes with the Summary re-declared in the same commit (D-45); Autopatch group limits verified to agree with Plan 05's corrected guide; both glossaries' freshness fields frozen with the non-advance recorded per D-63; SEED-001 closed with no guard built per D-49, recording that the requirement's stated rationale is false against the actual `scanSeeds` status set.

## Deviations from Plan

None — plan executed exactly as written. One authoring adjustment within scope: the plan's Task 1 `<verify>` block asserts each new H3 heading string occurs exactly once in `docs/_glossary.md`, but the D-46-mandated Version History row also needs to name the four added terms. Restating the literal `### Term` heading text (the Phase 149/150 precedent's own style) in the Version History row would have produced a count of 2 for each term and failed that assertion. Resolved by naming the terms in the Version History row as plain prose ("the Hotpatching, Autopatch group, ... terms") instead of repeating the `### ` heading syntax — satisfying both D-46's checklist (a dated row naming what was added) and the verify block's exact-occurrence assertion. Applied identically to the Linux glossary's Version History row. Not logged as a Rule 1-3 deviation because no bug was fixed and no scope changed — it is a phrasing choice inside the task's own documentation requirement.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- HYG-06 and HYG-07 are both closed; Plan 07 (the remaining STD/HYG work: gate authoring, standard section) can proceed independently.
- All four live validators this plan touches remain green: `check-phase-49.mjs` 22/22 PASS, `c17-eee-contract.mjs` 237/0, `check-prose-style.py` exit 0.
- No blockers for Phase 158 (VERIFY-05/06), which will re-derive the phase's edited-file list from `git diff --name-only` across Phase 157's commits per D-48 (no static `157-EDITED-FILES.md` artifact was created).

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-05*

## Self-Check: PASSED

- `docs/_glossary.md` exists and contains all four new H3 headings exactly once each, each with an Alphabetical Index link — verified via `grep -cF`.
- `docs/_glossary-linux.md` exists and contains `### unattended-upgrades` exactly once, with its Alphabetical Index link — verified via `grep`.
- `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md` reads `status: closed` with no `status: planted` line, and its diff is exactly one line changed — verified via `grep` and `git diff --numstat`.
- All three commit hashes (`9a874830`, `57c0ba61`, `9c93a2f3`) found in `git log --oneline --all`.
- Task-level `<verify>` commands re-run and all passed: `c17-eee-contract.mjs` (237 files, 0 violations), `check-phase-49.mjs` (22 passed, 0 failed, 0 skipped), `check-prose-style.py` (exit 0, all assertions PASS).
- `docs/operations/patch-management/05-linux-update-delivery.md` confirmed byte-unchanged (`git diff --exit-code` exit 0).
