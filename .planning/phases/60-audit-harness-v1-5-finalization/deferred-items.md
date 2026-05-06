# Phase 60 Deferred Items — discovered by Plan 60-08 executor

> Out-of-scope items found during Plan 60-08 atomic harness commit execution.
> Per Plan 60-08 deviation rules SCOPE BOUNDARY: Plan 60-08 only fixes issues DIRECTLY caused by its own changes.
> Pre-existing chain-validator failures are out of scope for Plan 60-08; documented here for parent orchestrator awareness.

## Pre-existing chain-validator failures at worktree base (f088f77)

The following Phase 49-59 chain validators FAIL at the worktree base (verified via `git stash` + re-run):

### check-phase-51 (Linux triage Mermaid)
- V-51-06: 09-linux-triage.md missing Mermaid block (graph TD + LIN1 root)
- V-51-07: 09-linux-triage.md missing Mermaid block (PITFALL-1 regression guard cannot run)
- V-51-09: 09-linux-triage.md missing Mermaid block (tree-level PITFALL-2 + web-app CA callout)

### check-phase-53 (Operations content scaffolding)
- V-53-06: docs/operations/00-index.md missing `platform: Windows` frontmatter
- V-53-22: docs/operations/00-index.md has forbidden `## App Lifecycle` H2 (NEGATIVE regression-guard violated per D-02 + ROADMAP line 448)

### check-phase-58 (4-platform comparison doc)
- V-58-09: comparison doc intro Windows-source-acknowledgment literal missing (D-10)
- V-58-10: comparison doc frontmatter not parseable (45-day cycle per D-19)

## Disposition

These failures are **NOT** caused by Plan 60-08 changes. Verified via `git stash` baseline check:
- Stashed all Plan 60-08 edits
- Ran `node scripts/validation/check-phase-{51,53,58}.mjs` — all 3 FAIL identically
- Restored Plan 60-08 edits
- Plan 60-08's atomic commit preserves the pre-existing state — no regressions introduced

Per Plan 60-08 deviation rules SCOPE BOUNDARY, these are out-of-scope for the atomic harness commit. They are likely owned by parallel-wave Plans 60-09/60-10 or pre-Phase-60 carry-overs not yet landed into this worktree base. Parent orchestrator should verify these are addressed before phase merge.

## Plan 60-08 commit safety

Plan 60-08 atomic commit:
- Adds C9/C11/C13 promotions + C12 H2 expansion + 3 sidecar arrays + BASELINE_9 refresh + 48-VERIFICATION close-out
- Does NOT modify any Phase 51/53/58 content files
- Does NOT regress any pre-existing PASS validator (verified Phase 48, 49, 52, 54, 55, 56, 57, 59 still PASS)

Per CONTEXT D-26 regression-guard: all PRE-PASS Phase 49-59 V-NN-NN assertions remain PASS post-Plan-60-08. The 3 pre-existing FAILs were NOT regressed by this plan.
