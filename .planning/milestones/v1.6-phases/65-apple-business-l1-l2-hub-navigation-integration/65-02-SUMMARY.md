---
phase: 65-apple-business-l1-l2-hub-navigation-integration
plan: "02"
subsystem: docs/l1-runbooks, docs/l2-runbooks
tags: [apple-business, l1-runbook, l2-runbook, mermaid, navigation, ABNAV-01, ABNAV-02]
dependency_graph:
  requires: [65-01]
  provides: [L1-34-runbook, L2-26-runbook, L1-index-apple-business-H2, L2-index-apple-business-H2]
  affects: [docs/l1-runbooks/00-index.md, docs/l2-runbooks/00-index.md, docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md, docs/l2-runbooks/26-apple-business-permission-denied.md]
tech_stack:
  added: []
  patterns: [L1-envelope-30-analog, hybrid-leaf-mermaid, compound-platform-frontmatter, append-only-index]
key_files:
  created:
    - docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md
    - docs/l2-runbooks/26-apple-business-permission-denied.md
  modified:
    - docs/l1-runbooks/00-index.md
    - docs/l2-runbooks/00-index.md
decisions:
  - "D-01 Option B honored: L1 #34 Path A in full; Paths B/C as escalation-pointer rows only (OP-11 hard gate)"
  - "D-02 Option C honored: 6 Apple-Business-scoped leaves route via click; ABPDE1 Intune-scope leaf is inline-only C15-safe (Option A — no ABAUDIT-24 needed)"
  - "ABAUDIT-24 NOT allocated: Option A phrasing avoids all C15 banned phrases in L2 #26"
metrics:
  duration: "~25 minutes"
  completed: "2026-05-22"
  tasks_completed: 4
  files_changed: 4
---

# Phase 65 Plan 02: Apple Business L1/L2 Runbooks and Index Appends Summary

## One-Liner

Apple Business L1 #34 (Path A executable Shared iPad passcode reset) and L2 #26 (7-leaf Mermaid permission-denied triage tree with hybrid leaf behavior) delivered, plus matching index appends.

## What Was Built

### Task 1 — `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (new)

**Commit:** c9409c1

L1 runbook for Apple Business Shared iPad passcode resets. Structure:

- Compound frontmatter `platform: ios+macos+shared-ipad` (D-A5 contract; no spaces around `+`)
- `last_verified: 2026-05-22` / `review_by: 2026-07-21`
- Platform gate blockquote (analog to `30-linux-enrollment-failed.md:9`)
- L1 scope note blockquote VERBATIM structure from `30-:21` with Apple Business equivalent parenthetical (MDM ClearPasscode, MDM EraseDevice named as state-changing commands)
- `## Which Admin Owns This Pool?` H2 as the FIRST procedural section — cross-link to `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` (LOAD-BEARING substring; ABNAV-01)
- `## Prerequisites` H2 — portal roles, device identifiers, cross-link to `12-shared-ipad-passcode-reset.md` (LOAD-BEARING substring; C16 l1_34→admin_12)
- `## 3-Path Decision Matrix` H2 — locked 4-column matrix (Path A / B / C)
- `## Path A — Apple Business UI (L1-executable)` H2 with `### L1 Triage Steps` and `### Admin Action Required` sub-sections
- `## Path B` and `## Path C` as escalation-pointer paragraphs only (D-01 Option B)
- `## Escalation Criteria` H2 with "Before escalating, collect:" 8-item bullet list
- `## Cross-References` tail
- `## Version History` row dated 2026-05-22

### Task 2 — `docs/l1-runbooks/00-index.md` (append)

**Commit:** abcd266

Appended `## Apple Business L1 Runbooks` H2 after the Linux L1 Runbooks section, before `## Version History`. Content per 65-PATTERNS.md verbatim:

- Description paragraph cross-linking to L2 #26 for escalation routing
- 3-column table with exactly 1 row: #34 Apple Business Shared iPad Passcode Reset
- CI-5 L1 cap honored: 1 row only
- PITFALL-6: zero existing H2/H3 anchors shifted

### Task 3 — `docs/l2-runbooks/26-apple-business-permission-denied.md` (new)

**Commit:** 699029a

L2 runbook for Apple Business permission denied investigation. Structure:

- Compound frontmatter `platform: ios+macos+shared-ipad` / `audience: L2`
- 7-leaf Mermaid `graph TD` decision tree (DA-9 LOCKED):
  - Root: `ABPD1` diamond decision node
  - 7 leaf nodes (all use `([...])` terminal form — V-65-06 count ≥ 7 PASS):
    - ABPDR1 role-lacks-permission → `01-role-permission-model.md` (click)
    - ABPDR2 OU-boundary → `02-ous-architecture.md` (click)
    - ABPDR3 Apple-Business-scope → `18-cross-org-boundary-cheat-sheet.md` (click)
    - ABPDE1 Intune-scope → INLINE ONLY, no click (C15-safe Option A scope-boundary callout)
    - ABPDR5 federation-state → `16-managed-apple-account-runbook.md` (click)
    - ABPDR6 quota-limit → `08-managed-apple-account-provisioning.md` (click)
    - ABPDR7 Account-Holder-lockout → `01-role-permission-model.md` (click; OP-2 callout at :39-58)
  - 6 click directives (NOT 7 — ABPDE1 has no click)
  - classDef resolved (green) / escalateL2 (red)
- `## Leaf Reference` H2 with 7 H3 sub-sections (per-leaf route target + next step)
- ABPDE1 section uses `> **Scope boundary:**` blockquote with Option A phrasing: "MDM commands (ClearPasscode / EraseDevice) that are issued from the Intune admin center, outside the Apple Business permission surface"
- `## Investigation Checklist` H2 (8-item L2 diagnostic checklist)
- `## Cross-References` H2 with 7 target links + L1 #34 handoff source
- `## Version History` row dated 2026-05-22

### Task 4 — `docs/l2-runbooks/00-index.md` (append)

**Commit:** 9d963eb

Appended `## Apple Business L2 Runbooks` H2 after Linux L2 Runbooks, before `## Related Resources`. Content per 65-PATTERNS.md verbatim:

- Version-gate blockquote
- `### When to Use` H3 with 3-column table
- Exactly 1 data row: #26 Apple Business Permission Denied Investigation
- CI-5 L2 cap honored: 1 row only
- PITFALL-6: zero existing H2/H3 anchors shifted

## Validation Results

### V-65-01..V-65-06 (Wave 2 assertions — all PASS after this plan)

| Assertion | Result | Detail |
|-----------|--------|--------|
| V-65-01: L1 #34 file exists | PASS | docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md present |
| V-65-02: L1 #34 contains platform: ios+macos+shared-ipad | PASS | Compound platform frontmatter in place |
| V-65-03: L1 #34 contains 12-shared-ipad-passcode-reset | PASS | C16 l1_34→admin_12 load-bearing substring present |
| V-65-04: L1 #34 contains #which-admin-owns-this-pool | PASS | ABNAV-01 lookup step substring present |
| V-65-05: L2 #26 file exists | PASS | docs/l2-runbooks/26-apple-business-permission-denied.md present |
| V-65-06: L2 #26 Mermaid tree has ≥7 leaf nodes | PASS | 7 `([` occurrences confirmed (DA-9 7-leaf LOCKED) |

### V-65-07..V-65-14 (Wave 3/4 — remain FAIL with deliverable-pending messages; expected)

V-65-07 through V-65-11 are Wave 3 hub-append deliverables (Plan 65-03). V-65-12 through V-65-14 are Wave 4 atomic-trio deliverables (Plan 65-04). All correctly report their pending wave and plan number.

### v1.6-milestone-audit.mjs

Result: 15 passed, 0 failed, 0 skipped.

- C15 PASS — no Intune banned phrases in L1 #34 or L2 #26
- C16 PASS — still EXEMPTED for remaining edges (Wave 4 exemption sunset not yet applied; expected intermediate state)
- All other checks (C1-C14) PASS unchanged

## C15 Banned-Phrase Analysis

**ABAUDIT-24 NOT allocated.** Option A phrasing used throughout:

- L1 #34: References to Paths B/C use "MDM ClearPasscode" and "MDM EraseDevice" by name (these are NOT C15 triggers — C15 regex 1 requires `Intune\s+(RBAC|role|scope tag|admin role)`; bare "MDM ClearPasscode" is C15-safe). No Intune RBAC language anywhere.
- L2 #26 ABPDE1 leaf callout: "MDM commands (ClearPasscode / EraseDevice) that are issued from the Intune admin center, outside the Apple Business permission surface" — avoids "Intune RBAC", "Intune role", and "Intune-side delegation/RBAC" entirely. C15 PASS confirmed by harness.

## CI-5 Cap Verification

| Cap | Status |
|-----|--------|
| L1 v1.6 runbooks: exactly 1 (#34) | Honored — `## Apple Business L1 Runbooks` table has 1 row |
| L2 v1.6 runbooks: exactly 1 (#26) | Honored — `## Apple Business L2 Runbooks` `### When to Use` table has 1 row |

## Deviations from Plan

None — plan executed exactly as written. Option A (avoid C15 banned phrases) was achievable for the L2 #26 Intune-scope leaf, so ABAUDIT-24 was not allocated (as preferred in the plan).

## Known Stubs

None. All cross-links in L1 #34 and L2 #26 point to existing corpus docs that were delivered in Phases 62-64. The `[CITED: training; needs live verification]` markers in L1 #34 Path A steps are inherited from the pattern in `12-shared-ipad-passcode-reset.md` — they are expected documentation of verification-pending portal navigation steps (within the 60-day window per `review_by: 2026-07-21`), not functional stubs.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan delivers markdown documentation only. The STRIDE threat register mitigations are satisfied:

- T-65-06 (Elevation of Privilege): Path C not inlined in L1 #34 — Paths B/C are escalation-pointer rows only.
- T-65-07 (Information Disclosure): `#which-admin-owns-this-pool` lookup is the first step before Path A.
- T-65-08 (Tampering): C15 Option A phrasing used — no ABAUDIT-24 needed.
- T-65-09 (Tampering): C16 edge l1_34→admin_12 substring `12-shared-ipad-passcode-reset` present.
- T-65-10 (Repudiation): ABPDR7 routes to OP-2 callout at `01-role-permission-model.md:39-58`.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md exists | FOUND |
| docs/l2-runbooks/26-apple-business-permission-denied.md exists | FOUND |
| docs/l1-runbooks/00-index.md contains ## Apple Business L1 Runbooks | FOUND |
| docs/l2-runbooks/00-index.md contains ## Apple Business L2 Runbooks | FOUND |
| Commit c9409c1 (feat 65-02-1) exists | FOUND |
| Commit abcd266 (docs 65-02-2) exists | FOUND |
| Commit 699029a (feat 65-02-3) exists | FOUND |
| Commit 9d963eb (docs 65-02-4) exists | FOUND |
