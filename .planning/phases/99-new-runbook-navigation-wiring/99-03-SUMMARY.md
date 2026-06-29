---
phase: 99-new-runbook-navigation-wiring
plan: "03"
subsystem: harness-hand-off
tags: [needle-spec, phase-100-handoff, presence-only, documentation]
dependency_graph:
  requires: ["99-01", "99-02"]
  provides: ["check-phase-99.mjs input for Phase 100 HARN-02 Atom 2"]
  affects: []
tech_stack:
  added: []
  patterns: ["presence-only needle inventory", "Phase-100 hand-off spec"]
key_files:
  created:
    - .planning/phases/99-new-runbook-navigation-wiring/99-NEEDLE-SPEC.md
  modified: []
decisions:
  - "N8 (common-issues L2 #27 link) flagged with structural-anchor caution: token appears in multiple existing H3 sections; Phase 100 should anchor assertion to the macOS Local Password H3 context"
  - "N9 and N10 consolidated into single count >= 2 assertion (both are identical link tokens in quick-ref-l1.md); Phase 100 may split into two structurally-anchored checks"
  - "N17 chosen as primary hand-off needle over N18 (N17 is more specific: includes the mandatory PSSO re-registration suffix; count = 3)"
metrics:
  duration: "4m"
  completed: "2026-06-29"
---

# Phase 99 Plan 03: Needle-Spec Hand-Off Summary

**One-liner:** Presence-only needle inventory (N1-N18) for Phase-100's check-phase-99.mjs, covering the #37 runbook file and all five wired navigation hubs, with grep-verified tokens and a CHAIN_PHASES=[]/CHAIN_SKIP=new Set([]) structure template.

## What Was Built

`.planning/phases/99-new-runbook-navigation-wiring/99-NEEDLE-SPEC.md` — a Phase-100 hand-off document mirroring the 98-NEEDLE-SPEC.md format:

- **N1-N18 token inventory** in per-file tables, all tokens grep-confirmed verbatim against the seven committed deliverables (99-01/99-02 waves)
- **Explicit PRESENCE-only / never-needle-dates rule** per 97 D-02 convention; freshness dates are time-bombs forbidden by the harness scope rules
- **Phase-100 structure template** with CHAIN_PHASES=[], CHAIN_SKIP=new Set([]), seven DELIVERABLE constants, 23 assertion classes (7 PRESENCE + 15 CONTENT + 1 SELF)
- **Precision notes** for substring/false-positive risks: N5/N15 share the same token in different files; N9/N10 appear twice in quick-ref-l1.md; N8 requires structural anchoring in common-issues.md; N17 count must be asserted >= 3
- **Anchor-stability set** documenting preserved byte-identical anchors and new Phase-99 slugs with no existing inbound refs

## Token Summary (N1-N18 by File)

| File | Needles | Count |
|------|---------|-------|
| `docs/l1-runbooks/37-macos-local-password-reset.md` | N1 (presence), N2, N3, N4 (frontmatter), N16 (SSPR clause), N17 (3x hand-off), N18 (hand-off link) | 7 |
| `docs/l1-runbooks/00-index.md` | N5 (`](37-macos-local-password-reset.md)`) | 1 |
| `docs/index.md` | N6 (`](l1-runbooks/37-macos-local-password-reset.md)`) | 1 |
| `docs/common-issues.md` | N7 (L1 link), N8 (L2 #27 escalation link) | 2 |
| `docs/quick-ref-l1.md` | N9 (escalation trigger), N10 (runbook list) | 2 |
| `docs/decision-trees/06-macos-triage.md` | N11 (MACR9 node), N12 (click MACR9), N13 (click URL), N14 (Runbook 37 row) | 4 |
| `docs/l1-runbooks/36-macos-secure-enclave-key.md` | N15 (reciprocal link) | 1 |

## Acceptance Criteria Verification

- [x] `99-NEEDLE-SPEC.md` exists at `.planning/phases/99-new-runbook-navigation-wiring/`
- [x] Contains `37-macos-local-password-reset.md` (grep -Fq confirmed)
- [x] Contains `PRESENCE` token (grep -Fiq confirmed)
- [x] `scripts/validation/check-phase-99.mjs` does NOT exist (confirmed)
- [x] Token inventory covers >= 18 needle IDs (N1-N18)
- [x] Explicit PRESENCE-only / never-needle-dates statement included
- [x] Explicit "Phase 99 authors no validator; check-phase-99.mjs is Phase 100 HARN-02" statement included
- [x] Phase-100 structure template with CHAIN_PHASES=[] / CHAIN_SKIP=new Set([]) included

## Deviations from Plan

None — plan executed exactly as written. All 18 tokens were confirmed present in the committed files before recording, satisfying T-99-08 (unverified-token mitigation).

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan creates one planning-directory-only file (`99-NEEDLE-SPEC.md`) with zero application-tier impact.

## Self-Check: PASSED

- `D:\claude\Autopilot\.planning\phases\99-new-runbook-navigation-wiring\99-NEEDLE-SPEC.md` — FOUND
- Task commit `6afa8ae` — FOUND in git log
- `scripts/validation/check-phase-99.mjs` — ABSENT (correct)
