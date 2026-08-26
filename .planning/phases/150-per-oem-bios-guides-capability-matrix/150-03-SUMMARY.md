---
phase: 150-per-oem-bios-guides-capability-matrix
plan: 03
subsystem: docs
tags: [lenovo, intune, bios, firmware, tbct, lbct, azure-key-vault, documentation]

# Dependency graph
requires:
  - phase: 150-01
    provides: The proven nine-H2/seven-anchor guide skeleton (copied verbatim), the deferred-commit
      execution pattern (D-80), and the enumerated intermediate-red baseline this plan diffs against
  - phase: 150-02
    provides: The sibling HP guide authored in the same wave, so cross-references land on real
      content and the three guides read as one set
provides:
  - A complete, shipping-quality Lenovo BIOS guide covering BIOS-08 in full (the ThinkCentre
    tooling fork stated plainly, the model-floor list correctly attached to the certificate tool,
    the reconciliation labeled as this corpus's inference), BIOS-09's Lenovo half (the Offboarding
    heading present and stating a structural absence), and Lenovo's leg of the inverted-prerequisite
    story (BIOS-06) — uncommitted, staged for Plan 04's single content commit
  - Structural proof the Lenovo guide is byte-identical at the H2 level to the Dell tracer and the
    HP guide (SC#1) — two empty diffs
  - The U-1 research correction shipped: the Recovery section carries one documented destructive
    path (system-board replacement, sourced to Lenovo Support KB ht036206) plus one documented
    silence (the certificate-private-key gap), not the stale two-silences shape D-19/D-53/D-55
    originally assumed
  - The shrunk dangling-link set — exactly 3 corpus-link failures remain, all naming only
    firmware-oem-matrix.md, the one file Plan 04 still creates
affects: [150-04, 150-05]

# Actuals (#2632) — chars/4 over the realized diff (the new 17,416-byte guide file).
actuals:
  tokens: 4354
  tasks: 3
  commits: 0

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Single-line blockquote / fixed-phrase discipline confirmed a third time: the
      'cannot use one tool for BIOS settings' grep needle initially failed because the sentence
      soft-wrapped across two lines in the authored prose; joined to one line and re-verified."
    - "Two-tool, two-auth-model sub-division via H3 sub-headings inside single H2s (D-76) — a
      pattern this phase's skeleton did not need for Dell or HP, both single-tool vendors."
    - "Deferred-commit execution (D-80) confirmed a third time: authored and fully verified against
      all five binding gate classes while remaining uncommitted."

key-files:
  created:
    - docs/operations/firmware-bios/04-lenovo-bios-configuration.md
  modified: []

key-decisions:
  - "Shipped the Azure Key Vault differentiator as two separate contiguous blockquote lines
    ('Sign commands using keys stored in Azure Key Vault.' / 'Eliminates need to distribute
    private keys.') rather than merging them into one synthesized sentence — preserves the two
    distinct sourced phrases rather than inventing a joined quote that never appeared verbatim."
  - "Avoided the literal strings 'Service Tag' and 'proof of ownership' entirely in the Lenovo
    Recovery escalation instruction (D-54) — the plan's own action text uses those phrases to
    describe what NOT to carry across from Dell, but the guide itself must not contain them at
    all, since the acceptance criteria assert a zero count for both."
  - "Cited the ThinkDeploy Blog (blog.lenovocdrt.com, updated 2025-10-31) as the evidence line for
    both the Azure Key Vault quote and the certificate tool's ThinkPad/ThinkCentre/ThinkStation
    model-floor sentence, since 150-RESEARCH.md's re-fetch of that page in full covers both facts
    on one page — keeping one evidence line per page (D-46) rather than splitting across two."
  - "No board-replacement sentence ships in the certificate-private-key case (D-55) — verified by
    grep that 'system board'/'motherboard' appear exactly once in the file, inside the
    supervisor-password case only."

patterns-established: []

requirements-completed: []  # 0/4 ready this plan — BIOS-05/06/08/09 are shared IDs still declared
  # by sibling plans (04, 05) with no SUMMARY yet; requirements.ready-ids returned 0/4. Per the
  # shared-ID gate (#2388), REQUIREMENTS.md is untouched by this plan.

coverage:
  - id: D1
    description: "Lenovo guide authored at the locked nine-H2/seven-anchor skeleton, structurally
      identical to the Dell tracer and the HP guide"
    requirement: "BIOS-05"
    verification:
      - kind: other
        ref: "diff of grep '^## ' line sets: 02-dell vs 03-hp (empty), 02-dell vs 04-lenovo (empty)"
        status: pass
    human_judgment: false
  - id: D2
    description: "The ThinkCentre tooling fork stated plainly with its first-party quote and
      headline consequence; the certificate tool's model list never attached to the settings tool;
      the reconciliation labeled as this corpus's inference"
    requirement: "BIOS-08"
    verification:
      - kind: other
        ref: "grep -c 'does not support ThinkCentre desktop products' = 1; grep -c 'cannot use one
          tool for BIOS settings' = 1; ThinkStation line also contains 'Certificate'; 'this corpus'
          and 'Neither page states' both present in Scope"
        status: pass
    human_judgment: false
  - id: D3
    description: "The Lenovo half of the inverted-prerequisite pair ships as a fixed, greppable
      claim"
    requirement: "BIOS-06"
    verification:
      - kind: other
        ref: "grep -c 'cannot bootstrap an initial supervisor password remotely' >= 1 in
          04-lenovo-bios-configuration.md; grep -c 'no pre-existing BIOS password' >= 1 in
          02-dell-bios-configuration.md"
        status: pass
    human_judgment: false
  - id: D4
    description: "The Offboarding heading is present and states Lenovo's structural absence of a
      vendor management plane"
    requirement: "BIOS-09"
    verification:
      - kind: other
        ref: "grep -c 'Offboarding and Loss of the Management Plane' >= 1; grep -ci 'structural
          absence' >= 1"
        status: pass
    human_judgment: false
  - id: D5
    description: "The U-1 research correction shipped: Recovery carries one documented destructive
      path (sourced, dated) plus one documented silence, not two silences"
    verification:
      - kind: other
        ref: "grep -c 'have the system board replaced' = 1 (blockquote, followed by a Source line
          naming ht036206); 'system board'/'motherboard' occur nowhere else in the file"
        status: pass
    human_judgment: false
  - id: D6
    description: "All five binding gate classes plus the apex pass or fail exactly at the expected
      intermediate baseline"
    verification:
      - kind: other
        ref: "c17-eee-contract.mjs (234/0), check-phase-54.mjs (32/0), v1.20-milestone-audit.mjs
          (exit 0), check-nav-hub-links.mjs (0 hub-presence, 3 corpus-link all naming
          firmware-oem-matrix.md), check-phase-144.mjs (100 PASS, 1 FAIL = V-143-CORPUSRUN)"
        status: pass
    human_judgment: false

# Metrics
duration: ~35min
completed: 2026-08-25
status: complete
---

# Phase 150 Plan 03: Lenovo BIOS Guide Summary

**Lenovo BIOS guide authored as the two-tool, no-vendor-connector outlier — TBCT V2 (settings) and
LBCT V2 (certificates) each get their own Delivery/Authentication sub-sections, the ThinkCentre
tooling fork ships as a plain first-party quote, and Recovery now carries a sourced,
system-board-replacement destructive path for the lost-supervisor-password case instead of the
stale two-silences shape.**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-08-25 (session continuation from Plan 02)
- **Completed:** 2026-08-25
- **Tasks:** 3
- **Files modified:** 1 created (`docs/operations/firmware-bios/04-lenovo-bios-configuration.md`),
  0 committed (deferred-commit design, D-80)

## Accomplishments

- Authored `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` at the exact locked
  skeleton: 9 H2 headings, 7 hand-authored `<a id>` anchors, zero code fences, no `doc_id` key.
  Diffing its `^## ` line set against both the Dell tracer and the HP guide produces no output —
  all three guides are structurally identical (SC#1, BIOS-05).
- Sub-divided Delivery and Authentication by tool (D-76): Think BIOS Config Tool V2 / Lenovo BIOS
  Certificate Tool V2 under Delivery, Supervisor password / Certificate-based BIOS authentication
  under Authentication — 6 total H3 sub-headings.
- Stated the ThinkCentre tooling fork plainly, with Lenovo's own quote (`This solution currently
  does not support ThinkCentre desktop products due to incompatible WMI BIOS Interface
  implementation.`) and its fixed-form consequence (`cannot use one tool for BIOS settings`), then
  attached the ThinkPad 2022+/ThinkCentre 2020+/ThinkStation 2020+ model floor to the certificate
  tool by name, labeling the reconciliation between the two first-party statements as this corpus's
  own inference (BIOS-08, SC#4).
- Shipped the U-1 research correction: the Recovery section's supervisor-password case is now a
  documented, destructive path sourced to Lenovo Support KB `ht036206` (system-board replacement by
  a Lenovo Service Provider), while the certificate-private-key case remains D-53's three-part
  documented-silence shape with no board-replacement claim leaking into it.
- Stated the Offboarding heading as a present, structural absence — Lenovo has no vendor management
  plane to lose — cross-linked against Dell's subscription end and HP's 30-day countdown (BIOS-09).
- Verified all five binding gate classes plus the apex: the corpus-link dangling set shrank to
  exactly 3 failures, all naming `firmware-oem-matrix.md`, and the apex reports `100 PASS, 1 FAIL`
  with the sole failure being the expected `V-143-CORPUSRUN` cascade.

## Task Commits

Per D-80 (this phase's deferred-commit contract), **no per-task commits were made**. The guide was
authored and fully verified against every live gate, then left uncommitted on the working tree —
Plan 04 lands it in the phase's single content commit.

**Plan metadata:** committed separately — this SUMMARY.md, STATE.md and ROADMAP.md only, per the
commit-contract override in this plan's dispatch instructions. `.planning/REQUIREMENTS.md` is
untouched (see Decisions Made below).

## Files Created/Modified

- `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` (created, uncommitted) — the
  Lenovo BIOS Configuration Through Intune guide: Delivery, Authentication, Scope, Prerequisites,
  Offboarding, Recovery, Unsupported and Anti-Feature Callouts, Related Resources, External
  References.

## Decisions Made

- Ran `requirements.ready-ids` for BIOS-05/06/08/09 before touching `.planning/REQUIREMENTS.md`;
  it returned `0/4 requirement(s) ready to mark complete` because sibling plans 04 and 05 still
  declare these IDs with no SUMMARY yet. Per the shared-ID gate (#2388), `REQUIREMENTS.md` is left
  untouched by this plan — consistent with Plan 02's own precedent (0 REQUIREMENTS.md edits).
- Fixed one line-wrap defect during verification: the `cannot use one tool for BIOS settings`
  sentence was authored soft-wrapped across two lines, which silently broke its exact-substring
  acceptance grep (the same trap flagged in Plan 02's own patterns-established). Joined to one line
  and re-verified before proceeding.
- Shipped the Azure Key Vault differentiator as two separate quoted lines in one blockquote
  (`Sign commands using keys stored in Azure Key Vault.` / `Eliminates need to distribute private
  keys.`) rather than synthesizing them into a single combined sentence that never appeared
  verbatim on the source page.
- Avoided the literal strings `Service Tag` and `proof of ownership` anywhere in the guide's
  Recovery escalation instruction, since the acceptance criteria assert a zero count for both —
  the plan's own action text names those phrases only to describe what must NOT be carried across
  from Dell's guide.

## Deviations from Plan

None - plan executed exactly as written. One authoring defect (the line-wrapped grep needle) was
caught and fixed during the plan's own Task 1 verification step, before the task was considered
done — not a deviation from the plan's instructions, but the plan's own acceptance-criteria gate
doing its job.

## Issues Encountered

None.

## Verification Evidence

Ran in order, per Task 3's instructions (D-81, D-83):

1. `node scripts/validation/c17-eee-contract.mjs` → `234 files checked, 0 with violations, 0 total
   violations`. The Lenovo guide is not enrolled (no `doc_id`/`status`/`owner`/`doc_type`), so the
   count is unchanged from the phase-start baseline.
2. `node scripts/validation/check-phase-54.mjs` → `32 passed, 0 failed, 0 skipped`.
3. `node scripts/validation/v1.20-milestone-audit.mjs` → `16 passed, 0 failed, 0 skipped`, exit 0.
4. `node scripts/validation/check-nav-hub-links.mjs` → `0 hub-presence failure(s), 3 corpus-link
   failure(s), 3 total`. All three corpus-link failures name only `firmware-oem-matrix.md`, one
   line per guide (Dell, HP, Lenovo) — exactly the enumerated intermediate-red baseline from
   150-01-PLAN.md's phase-wide rules. Piping the failure block through `grep -v
   'firmware-oem-matrix'` leaves no failure entries.
5. `node scripts/validation/check-phase-144.mjs` → `100 PASS, 1 FAIL, 0 SKIPPED (total checks:
   101)`, the sole failure being `V-143-CORPUSRUN` (the check-nav-hub-links corpus-wide run, which
   fails only because of the same 3 expected dangling targets above).
6. Three-way structural equality: `diff` of the `^## ` line sets of `02-dell-bios-configuration.md`
   vs `03-hp-bios-configuration.md` and vs `04-lenovo-bios-configuration.md` both produced no
   output — all three guides carry the identical nine-H2 sequence.
7. Inverted-prerequisite pair, both halves confirmed present: `grep -c 'no pre-existing BIOS
   password' docs/operations/firmware-bios/02-dell-bios-configuration.md` = 1;
   `grep -c 'cannot bootstrap an initial supervisor password remotely'
   docs/operations/firmware-bios/04-lenovo-bios-configuration.md` = 1.
8. `git status --porcelain docs/operations/firmware-bios/04-lenovo-bios-configuration.md` shows the
   file untracked (`??`), confirming the deferred-commit contract (D-80) was honored. No file under
   `docs/` was staged or committed by this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All three per-OEM guides (Dell, HP, Lenovo) now exist in the working tree, structurally
  identical at the H2 level, both halves of the inverted-prerequisite pair greppable in their
  fixed forms.
- The only remaining dangling link target in the entire corpus is
  `docs/reference/firmware-oem-matrix.md` — Plan 04's job.
- Plan 04 carries the U-1 correction into the matrix's Lenovo lost-password cell as a **sourced
  value**, not `Not documented by vendor`.
- No blockers. Ready for Plan 04 (the matrix, the glossary edit, and the single content commit
  landing all three guides plus the matrix together).

---
*Phase: 150-per-oem-bios-guides-capability-matrix*
*Completed: 2026-08-25*
