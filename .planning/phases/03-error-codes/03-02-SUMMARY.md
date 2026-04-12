---
phase: 03-error-codes
plan: "02"
subsystem: docs/error-codes
tags: [error-codes, esp, pre-provisioning, self-deploying, hybrid-join, documentation]
dependency_graph:
  requires:
    - 03-01 (01-mdm-enrollment.md and 02-tpm-attestation.md — cross-reference targets)
  provides:
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
  affects:
    - Phase 4 L1 decision trees (will link to these error tables)
    - Phase 5 L1 runbooks (will link to these error tables)
    - Phase 6 L2 runbooks (esp-deep-dive, hybrid-join, tpm-attestation)
    - Phase 7 navigation (routes both audiences to these files)
tech_stack:
  added: []
  patterns:
    - 7-column error table with multi-cause rows
    - Cross-reference row pattern for shared error codes
    - Event ID as primary identifier (hybrid join)
    - Policy conflict table (4-column, no error code)
    - APv2 Notes blockquote at file bottom
key_files:
  created:
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
  modified: []
decisions:
  - "ESP policy conflicts (6 patterns) documented in 4-column table separate from the 7-column coded error table — format chosen because these patterns have no Code or # identifier"
  - "Three ESP timeout patterns documented as prose, not table rows — no error code, phase, or mode attributes to populate the table columns"
  - "0x80004005 appears in both 03-esp-enrollment.md and 05-hybrid-join.md as full rows (not cross-reference) — it is a hybrid-join hex code that surfaces on the ESP screen; both files are valid primary locations for technicians searching different entry points"
  - "04-pre-provisioning.md uses 8-column cross-reference rows with Cause populated to explain the redirect — improves scannability vs purely empty cells"
metrics:
  duration: "3 minutes"
  completed_date: "2026-03-15"
  tasks_completed: 2
  files_created: 3
  files_modified: 0
---

# Phase 3 Plan 02: ESP, Pre-Provisioning, and Hybrid Join Errors Summary

**One-liner:** Three error code reference files covering ESP policy conflicts and coded errors, pre-provisioning/self-deploying cross-reference pattern, and hybrid join dual event-ID/hex-code format with ODJ Connector version guidance.

## What Was Built

### Task 1 — 03-esp-enrollment.md (commit: 41ae11f)

ESP and enrollment error reference with two distinct tables:

- **Coded errors table** (7-column): 3 entries — `0x80004005` HybridJoinTimeout, `0x81036501` MDMInfoNotFound, `0x81036502` AppInstallFailure. References `AppWorkload.log` (not legacy `IntuneManagementExtension.log`, changed August 2024).
- **Policy conflicts table** (4-column): 6 no-code patterns — AppLocker CSP, DeviceLock password policies, Security Baseline UAC/VBS, AutoAdminLogon=0, PreferredAadTenantDomainName, Interactive logon GPOs. Each with Failure Pattern, L1 Action (always Escalate), L2 Fix.
- **ESP timeout patterns** section (prose): 3 scenarios — app count exceeds timeout, LOB/Win32 TrustedInstaller conflict, Conditional Access blocking Store app license.
- APv2 Note: ESP is APv1-only.

### Task 2 — 04-pre-provisioning.md and 05-hybrid-join.md (commit: a0d5cc1)

**04-pre-provisioning.md:**
- 1 primary entry: `0xc1036501` MultiMDM for self-deploying mode.
- 7 cross-reference rows to `01-mdm-enrollment.md` and `02-tpm-attestation.md` — avoids duplicating TPM content.
- Pre-Provisioning Specific Notes section: reset button causes TPM retry failure — power off instead.
- Self-Deploying Mode Requirements section: physical TPM 2.0 mandatory; VM/TPM1.2 always fail by design.

**05-hybrid-join.md:**
- Event ID Mapping table: all 6 event IDs — 807, 809, 815, 908, 171, 172 — with full 7-column entries.
- Hybrid Join Hex Errors table: `0x80004005` (1 cause), `0x80070774` (3 causes — assign-user, domain mismatch, OU permissions).
- ODJ Connector Notes section: current log path (`Microsoft > Intune > ODJConnectorService`), stale legacy path noted with explicit do-not-use guidance, minimum version 6.2501.2000.5 documented.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Design Notes

**0x80004005 dual primary entries.** The plan documents `0x80004005` as a full entry in `03-esp-enrollment.md` and also specifies it as a full entry in `05-hybrid-join.md` (with a cross-reference note in the hybrid file). Both files were created with full rows as specified — this is intentional because technicians may reach either file first depending on the error context (ESP timeout vs hybrid join investigation path).

**Cross-reference row Cause field.** The plan specifies `--` for the Cause column on cross-reference rows. A brief redirect explanation was added ("Cross-category: [description]. Primary entry in [file].") to help technicians understand why the row exists without content. This improves scannability without adding investigative content that belongs in the primary entry.

## Self-Check

### Files exist:

- `docs/error-codes/03-esp-enrollment.md` — FOUND
- `docs/error-codes/04-pre-provisioning.md` — FOUND
- `docs/error-codes/05-hybrid-join.md` — FOUND

### Commits exist:

- `41ae11f` — feat(03-02): create ESP and enrollment errors reference file — FOUND
- `a0d5cc1` — feat(03-02): create pre-provisioning, self-deploying, and hybrid join error files — FOUND

## Self-Check: PASSED
