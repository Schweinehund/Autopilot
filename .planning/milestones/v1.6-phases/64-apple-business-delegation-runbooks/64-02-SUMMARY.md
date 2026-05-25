---
phase: 64-apple-business-delegation-runbooks
plan: "02"
subsystem: docs/cross-platform/apple-business
tags: [runbooks, vpp-catalog, shared-ipad, device-release, hard-callouts, abaudit, c15, c16]
dependency_graph:
  requires: [64-01]
  provides: [DELEG-01, DELEG-02, DELEG-03]
  affects:
    - docs/cross-platform/apple-business/11-vpp-catalog-runbook.md
    - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
    - docs/cross-platform/apple-business/13-device-release-runbook.md
tech_stack:
  added: []
  patterns:
    - D-01 mandatory envelope (5-field frontmatter + Platform applicability + Training-data notice + Scope boundary)
    - D-02 self-sufficient scope-boundary callout with 18- forward link
    - D-03 Required Role & Permission block (01-role-permission-model SOT, no 04- cite for non-bundle permissions)
    - D-04 Refined-C hard-bordered callout (⛔ glyph) with L2-approval gate on 12- Path C only
    - ABAUDIT line-pair-scoped exemption (sequential numbering ABAUDIT-05 through ABAUDIT-10 allocated)
key_files:
  created:
    - docs/cross-platform/apple-business/11-vpp-catalog-runbook.md
    - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
    - docs/cross-platform/apple-business/13-device-release-runbook.md
  modified: []
decisions:
  - "ABAUDIT-05 allocated to 11- Platform applicability disambiguation line"
  - "ABAUDIT-06 allocated to 12- Platform applicability disambiguation line"
  - "ABAUDIT-07 allocated to 12- Path B Intune RBAC line (per 64-CONVENTIONS §4)"
  - "ABAUDIT-08 allocated to 13- Platform applicability disambiguation line"
  - "ABAUDIT-09 allocated to 11- Intune admin token-upload step (C15 regex 8)"
  - "ABAUDIT-10 allocated to 13- Intune admin coordination handoff (C15 regex 8)"
  - "ABAUDIT block ABAUDIT-05 through ABAUDIT-10 consumed by plan 64-02; plan 64-03 starts at ABAUDIT-11"
metrics:
  duration: "~45 minutes"
  completed_date: "2026-05-22"
  tasks_completed: 3
  files_created: 3
  files_modified: 0
---

# Phase 64 Plan 02: Hard-Callout Runbooks (11-, 12-, 13-) Summary

Three operational runbooks authored for destructive-action VPP catalog, Shared iPad passcode reset, and device release operations, each carrying the locked Wave-1 hard-bordered callout strings asserted by `check-phase-64.mjs`.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Author 11-vpp-catalog-runbook.md (DELEG-01) | 35b24ce | docs/cross-platform/apple-business/11-vpp-catalog-runbook.md |
| 2 | Author 12-shared-ipad-passcode-reset.md (DELEG-02) | 6364203 | docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md |
| 3 | Author 13-device-release-runbook.md (DELEG-03) | cbba3aa | docs/cross-platform/apple-business/13-device-release-runbook.md |
| fix | ABAUDIT-09/10 C15 exemptions in 11- and 13- | 1799fb3 | 11-, 13- |

## What Was Built

### 11-vpp-catalog-runbook.md (DELEG-01)
VPP catalog operational runbook covering content token claim, license transfer, app purchase, and payment scoping. Contains the locked OP-9 hard-bordered callout `> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**` with the full body from 64-CONVENTIONS.md (forbidden actions, pre-migration gate checklist). Post-migration verification section requires license counts match within 0.1% tolerance. Includes label disambiguation: Apple "content token" vs Intune "Apple VPP token" (same artifact, different label per STACK §6.1).

### 12-shared-ipad-passcode-reset.md (DELEG-02 — canonical C16 doc)
Canonical 3-path Shared iPad passcode reset runbook in locked A→B→C order. Path A (Apple Business UI, L1-delegatable, preferred). Path B documents the anti-feature explicitly: MDM ClearPasscode resets the DEVICE-LEVEL lock, not the per-user Shared iPad partition passcode — highest-stakes anti-feature in v1.6. Path B Intune RBAC line carries ABAUDIT-07 exemption. Path C carries the locked OP-11 callout `> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**` with `⚠️ L2 approval required before proceeding.` gate clause (only path with L2 gate). No `34-apple-business` reference (C16 Phase 65 gate enforced).

### 13-device-release-runbook.md (DELEG-03)
Device release runbook documenting "release ≠ removal" soft-delete semantics. Contains locked OP-6 callout `> **⛔ Device Release — "release ≠ removal" (OP-6)**` with no L2-approval gate (D-04 Refined-C rule). Documents the 30-day provisional period for devices re-added via Apple Configurator. Includes release scenarios (decommission, inter-tenant transfer, intra-tenant OU transfer anti-pattern). Post-release verification includes reseller re-appearance check.

## Validator Results

The `check-phase-64.mjs` checks relevant to this plan all pass:

| Check | Result |
|-------|--------|
| V-64-02: 11- OP-9 exact opening string | PASS |
| V-64-03: 12- Path A < B < C ordering | PASS |
| V-64-04: 12- OP-11 exact opening string | PASS |
| V-64-05: 12- does NOT contain 34-apple-business | PASS |
| C15 framing guard (11-, 12-, 13-) | PASS (with ABAUDIT-05..10 exemptions) |

Remaining V-64-01/06/07/08/09/10 failures are expected — they reference files 14-18 which are scope for plans 64-03/04.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] Added ABAUDIT-09/10 exemptions post-authoring**
- **Found during:** Task 1 and Task 3 verification (V-64-10 C15 scan)
- **Issue:** `11-` Step 5 table row ("Intune admin" as token-upload actor) triggered C15 regex 8. `13-` Step 8 table row ("Notify Intune admin") triggered C15 regex 8. Both are factual workflow steps that correctly identify Intune admin as the actor for Intune-side operations.
- **Fix:** Added ABAUDIT-09 before the 11- table row and ABAUDIT-10 before the 13- table row, each with rationale comments identifying these as C15 false-positive disambiguation lines (not Apple Business permission anti-patterns).
- **Files modified:** 11-vpp-catalog-runbook.md, 13-device-release-runbook.md
- **Commit:** 1799fb3

### ABAUDIT Number Allocation

The 64-CONVENTIONS §4 expected `18-` to consume the bulk of ABAUDIT numbers (ABAUDIT-05..~14). This plan consumed ABAUDIT-05 through ABAUDIT-10 across the three runbooks. Plan 64-03+ should start at **ABAUDIT-11**.

| ABAUDIT Number | File | Line Purpose |
|---------------|------|--------------|
| ABAUDIT-05 | 11- | Platform applicability C15 disambiguation |
| ABAUDIT-06 | 12- | Platform applicability C15 disambiguation |
| ABAUDIT-07 | 12- | Path B Intune RBAC line (per 64-CONVENTIONS §4 allocation) |
| ABAUDIT-08 | 13- | Platform applicability C15 disambiguation |
| ABAUDIT-09 | 11- | Token-upload step Intune admin reference |
| ABAUDIT-10 | 13- | Notify Intune admin coordination step |

## Known Stubs

None. All three runbooks wire to live procedures with appropriate `[CITED: training; needs live verification]` tags for portal-navigation paths that cannot be confirmed without a live portal scrape. The 60-day re-verification target (by 2026-07-21) is documented in each Training-data notice block.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan is documentation-only.

| Flag | File | Description |
|------|------|-------------|
| None | — | Documentation-only deliverables; no executable surface introduced |

## Self-Check

### Files Exist
- `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` — FOUND
- `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` — FOUND
- `docs/cross-platform/apple-business/13-device-release-runbook.md` — FOUND

### Commits Exist
- 35b24ce: feat(64-02): author 11-vpp-catalog-runbook.md (DELEG-01) — FOUND
- 6364203: feat(64-02): author 12-shared-ipad-passcode-reset.md (DELEG-02, canonical C16 doc) — FOUND
- cbba3aa: feat(64-02): author 13-device-release-runbook.md (DELEG-03) — FOUND
- 1799fb3: fix(64-02): add ABAUDIT-09/10 exemptions for C15 false-positives in 11- and 13- — FOUND

## Self-Check: PASSED
