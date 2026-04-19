---
phase: 21-windows-operational-gaps
plan: "03"
subsystem: docs/reference
tags: [security, conditional-access, compliance, enrollment, windows]
dependency_graph:
  requires: []
  provides: [ca-enrollment-timing.md, security-baseline-conflicts.md, compliance-timing.md]
  affects: [docs/reference/]
tech_stack:
  added: []
  patterns: [admin-template.md, mermaid-sequence-diagram, configuration-caused-failures-table]
key_files:
  created:
    - docs/reference/ca-enrollment-timing.md
    - docs/reference/security-baseline-conflicts.md
    - docs/reference/compliance-timing.md
  modified: []
decisions:
  - "Security trio cross-references all interconnected: ca-enrollment-timing <-> security-baseline-conflicts <-> compliance-timing"
  - "macOS Phase 23 placeholder added to ca-enrollment-timing.md per D-10 decision"
  - "IME process names added explicitly (both short and full name) to WDAC allow-list guidance"
metrics:
  duration_minutes: 18
  completed: "2026-04-14T13:42:16Z"
  tasks_completed: 2
  files_created: 3
  files_modified: 0
---

# Phase 21 Plan 03: Security and Compliance Reference Docs Summary

**One-liner:** Three interconnected Windows reference docs covering Conditional Access enrollment chicken-and-egg problem with Mermaid diagram, security baseline ESP conflicts (BitLocker/LAPS/WDAC/Reboot), and compliance state timing with grace period configuration.

---

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create Conditional Access enrollment timing guide (WSEC-01) | eda8761 | docs/reference/ca-enrollment-timing.md |
| 2 | Create security baseline conflicts and compliance timing docs (WSEC-02, WSEC-03) | 12153ac | docs/reference/security-baseline-conflicts.md, docs/reference/compliance-timing.md |

---

## What Was Built

### ca-enrollment-timing.md (WSEC-01)

Explains the compliance chicken-and-egg enrollment problem with a Mermaid sequence diagram showing CA blocking MDM enrollment before compliance can be evaluated. Documents built-in Microsoft exclusions (Microsoft Intune Enrollment app excluded by default), three scenarios that break those exclusions (explicit include, all-cloud-apps without exclusion, removing default exclusion), four resolution patterns (exclude app, report-only mode, grace periods, device filters), verification checklist, and the Configuration-Caused Failures reverse-lookup table. Includes macOS Phase 23 placeholder per D-10 decision.

### security-baseline-conflicts.md (WSEC-02)

Four-row conflict table covering BitLocker CSP timing gap (separate profile mitigation), LAPS policy timing during device phase (accept gap or pre-provisioning), AppLocker/WDAC blocking IME with explicit process name allow-list (`IntuneWindowsAgent.exe`, `Microsoft.Management.Services.IntuneWindowsAgent.exe`), and forced-reboot policies interrupting ESP (120-minute grace). KB5065848 known issue documented (BitLocker + "Identifying" screen hang, 2025). General guidance: apply baselines post-enrollment, use individual profiles not monolithic baselines, pilot test every baseline change.

### compliance-timing.md (WSEC-03)

Post-enrollment state timeline table (0-15 min: Not evaluated, 15-30 min: Compliant/Non-compliant, up to 8 hours: final state). Detailed three-state distinction with admin note warning that Not evaluated and Non-compliant both appear non-green in the portal. Grace period configuration (minimum 0.25 days/6 hours, recommended 1 day for new deployments), enforcement action ordering, and the "retire" danger scenario. CA integration behavior during the Not evaluated window. Ongoing evaluation schedule (8-hour auto check-in, manual sync, policy change propagation).

---

## Cross-Reference Verification

All three files form an interconnected security documentation trio:

- `ca-enrollment-timing.md` links to: `compliance-timing.md`, `security-baseline-conflicts.md`, `../lifecycle/05-post-enrollment.md`, `../admin-setup-apv1/10-config-failures.md`
- `security-baseline-conflicts.md` links to: `ca-enrollment-timing.md`, `compliance-timing.md`, `../lifecycle/04-esp.md`, `../admin-setup-apv1/10-config-failures.md`
- `compliance-timing.md` links to: `ca-enrollment-timing.md`, `security-baseline-conflicts.md`, `../lifecycle/05-post-enrollment.md`

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Known Stubs

One intentional stub: `ca-enrollment-timing.md` contains `> **macOS:** For macOS Conditional Access enrollment timing, see [macOS Admin Setup](TBD - Phase 23).`

This is required by the plan spec (D-10: WSEC-01 is standalone with `platform: Windows` frontmatter; Phase 23 will add macOS cross-reference). Not a content gap — the Windows content is complete.

---

## Self-Check: PASSED

Files exist:
- FOUND: docs/reference/ca-enrollment-timing.md
- FOUND: docs/reference/security-baseline-conflicts.md
- FOUND: docs/reference/compliance-timing.md

Commits exist:
- FOUND: eda8761 (feat(21-03): create Conditional Access enrollment timing guide)
- FOUND: 12153ac (feat(21-03): create security baseline conflicts and compliance timing docs)
