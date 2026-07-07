---
phase: 118-reference-doc-retrofit-table-remediation-26-docs
plan: 03
subsystem: docs
tags: [eee-retrofit, c17, reference-docs, markdown, blockquote-remediation]

# Dependency graph
requires:
  - phase: 118-01
    provides: retrofit-reference.mjs helper (forked from retrofit-guide.mjs) + VH column-shape detection
  - phase: 118-02
    provides: first EEE-retrofit batch precedent (Transform A/B #12 split vocabulary, registry-flip pattern)
provides:
  - EEE-conformant retrofit of 8 Windows migration/monitoring/infra-prerequisite reference docs
    (RE-146, RE-149, RE-150, RE-152, RE-153, RE-154, RE-155, RE-163)
  - 20 word-preserving #12 blockquote splits (Transform A only, no code-bearing callouts in this batch)
  - RE-index.md Status flips Pending -> Approved for the 8 batch rows
affects: [118-04, 118-05, 119]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Version-History CREATE branch (fresh 3-column section) exercised uniformly across all 8 files -- none had a pre-existing ## Version History"
    - "Transform A (sentence/clause-boundary split via truly-empty blank line) sufficient for the entire batch -- no embedded code fences in any of the 20 over-limit blockquote groups, so Transform B was never needed"
    - "Stripped-'>'-prefix word-set diff as the reformat-only proof: raw word-count diffs are expected to show small deltas (one extra '>' token per new split group) -- strip the blockquote prefix before comparing to isolate real content words"

key-files:
  created: []
  modified:
    - docs/reference/apv1-apv2-migration.md
    - docs/reference/imaging-to-autopilot.md
    - docs/reference/gpo-to-intune.md
    - docs/reference/esp-timeout-tuning.md
    - docs/reference/deployment-reporting.md
    - docs/reference/drift-detection.md
    - docs/reference/new-batch-workflow.md
    - docs/reference/entra-prerequisites.md
    - docs/_registry/RE-index.md

key-decisions:
  - "All 8 files exercised the VH CREATE branch (no pre-existing Version History) -- confirmed by --dry-run before writing"
  - "20 over-200-char blockquote groups all resolved via Transform A (sentence/clause-boundary split) -- none required Transform B (de-blockquote) since no group contained an embedded code fence"
  - "Version-History date filled with actual commit date (2026-07-06) rather than the helper's YYYY-MM-DD placeholder, per 117-02 precedent"
  - "Word-set proof must strip the leading '>' blockquote-prefix token before comparing multisets -- otherwise legitimate structural splits (which add one '>' token per new group) register as false content deltas"

patterns-established:
  - "Pattern: measure #12 groups with a standalone script mirroring c17-eee-contract.mjs:387-405 exactly, then verify every proposed split with a byte-length check BEFORE editing, not after"

requirements-completed: [RETRO-03]

# Metrics
duration: 30min
completed: 2026-07-06
---

# Phase 118 Plan 03: Migration/Monitoring/Infra-Prerequisite Reference Retrofit Summary

**Retrofitted 8 Windows reference docs (RE-146/149/150/152/153/154/155/163) to EEE standard with 20 word-preserving #12 blockquote splits, C17 exit 0, and the 3 Guide-titled files keeping doc_type: Reference per the Phase-114 registry lock**

## Performance

- **Duration:** ~30 min
- **Tasks:** 3
- **Files modified:** 9 (8 reference docs + RE-index.md)

## Accomplishments

- Ran `scripts/pipeline/retrofit-reference.mjs` on all 8 target files: injected `doc_id`/`status`/`owner`/`doc_type` frontmatter keys, emitted the EEE block line, relocated the whole pre-H1 gate-blockquote span to after `## Summary`, and created a fresh 3-column Version History section on every file (all 8 exercised the CREATE branch — none had a pre-existing VH section)
- Hand-authored reference-template-led `## Summary` prose (52-58 words each) for all 8 files, restating existing scope only — no new technical claims
- Measured, split, and re-verified all 20 over-200-char top-level blockquote groups (4 in apv1-apv2-migration, 5 in imaging-to-autopilot, 3 in gpo-to-intune, 4 in esp-timeout-tuning, 1 each in deployment-reporting/drift-detection/new-batch-workflow/entra-prerequisites) using Transform A (sentence/clause-boundary split with a truly-empty blank line)
- Confirmed zero real-word content changes via a stripped-`>`-prefix word-set diff against the pre-split commit for all 8 files
- `node scripts/validation/c17-eee-contract.mjs` exits 0 with zero violations across all 157 enrolled corpus files
- Flipped `docs/_registry/RE-index.md` Status Pending → Approved for RE-146/149/150/152/153/154/155/163; RE-147 (`ca-enrollment-timing.md`, mermaid-deferred per D-05) left untouched at Pending

## Task Commits

1. **Task 1: Mechanical transform of the 8 Windows reference files via the helper** - `14ef8a1` (feat)
2. **Task 2: Hand-author the ## Summary prose (reference-template lead, ≥30 words)** - `77e115b` (docs)
3. **Task 3: #12 blockquote compliance, C17 exit 0, registry Approved** - `53836f6` (fix)

**Plan metadata:** commit pending (this SUMMARY + STATE/ROADMAP/REQUIREMENTS)

## Files Created/Modified

- `docs/reference/apv1-apv2-migration.md` (RE-146) - APv1-to-APv2 migration playbook; 4 blockquote groups split
- `docs/reference/imaging-to-autopilot.md` (RE-155) - MDT/SCCM imaging migration guide; 5 blockquote groups split (highest count in batch)
- `docs/reference/gpo-to-intune.md` (RE-154) - GPO-to-Intune migration guide; 3 blockquote groups split (one required a 3-way split at 439c, the batch max)
- `docs/reference/esp-timeout-tuning.md` (RE-153) - ESP timeout tuning guide; 4 blockquote groups split
- `docs/reference/deployment-reporting.md` (RE-149) - Deployment reporting reference; 1 blockquote group split
- `docs/reference/drift-detection.md` (RE-150) - Drift detection reference; 1 blockquote group split
- `docs/reference/new-batch-workflow.md` (RE-163) - New batch operational workflow; 1 blockquote group split
- `docs/reference/entra-prerequisites.md` (RE-152) - Entra ID prerequisites reference; 1 blockquote group split
- `docs/_registry/RE-index.md` - 8 rows flipped Pending → Approved; RE-147 untouched

## Decisions Made

- All 8 files exercised the Version-History CREATE branch (confirmed via `--dry-run` spanBytes equality before writing) — matches the plan's must_haves expectation exactly
- All 20 over-limit blockquote groups resolved via Transform A only; no group in this batch contained an embedded code fence, so Transform B (de-blockquote) was never invoked
- Filled the Version-History row date with the actual commit date (2026-07-06) rather than leaving the helper's `YYYY-MM-DD` placeholder, per the 117-02 precedent
- Verified reformat-only integrity via a word-set diff that strips the leading `>` blockquote-prefix token before comparing — the raw (unstripped) diff shows a small per-file delta (4-6 extra tokens) that is entirely the `>` prefix characters introduced by each new split group, not real content; the stripped-prefix comparison confirms REAL-WORD-SET IDENTICAL for all 8 files

## Deviations from Plan

None - plan executed exactly as written. All three tasks completed per the plan's `<action>` and `<acceptance_criteria>` blocks with no auto-fixes required.

## Issues Encountered

None. The helper's `--dry-run` pass caught zero errors on the first attempt (all 8 doc_ids resolved, all 8 already carried `platform: Windows`, zero TEMPLATE-SENTINEL hits), so the write pass proceeded without incident. The only manual follow-up needed after the helper ran was replacing the `YYYY-MM-DD` Version-History placeholder with the actual date (expected — the helper does not auto-fill commit dates by design).

## User Setup Required

None - no external service configuration required. Pure documentation reformat.

## Next Phase Readiness

- RETRO-03 requirement fully satisfied for this batch: 8/8 files carry all four EEE keys, C17-green, reference-template Summary-led, and Approved in the registry
- Remaining reference-class batches (118-04, 118-05) can proceed independently — enrollment is opt-in by `doc_id` presence, so this batch does not block or depend on sibling batches
- No blockers for Phase 119 close: this batch's 8 files are part of the full reference-class corpus that Phase 119's C17 full-corpus audit-fold will re-verify

## Self-Check: PASSED

- All 9 modified files confirmed present on disk (8 reference docs + RE-index.md)
- All 3 task commit hashes (14ef8a1, 77e115b, 53836f6) confirmed present in git log
- No missing items
