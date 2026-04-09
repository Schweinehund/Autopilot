---
phase: 08-reference-anchors
plan: "02"
subsystem: docs/error-codes
tags: [anchor, fragment-links, error-codes, ERRC-01]
dependency_graph:
  requires: []
  provides: [ERRC-01]
  affects: [docs/error-codes/00-index.md]
tech_stack:
  added: []
  patterns: [inline-html-anchor]
key_files:
  modified:
    - docs/error-codes/01-mdm-enrollment.md
    - docs/error-codes/02-tpm-attestation.md
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
decisions:
  - "Anchor placed in first cell of table row using inline HTML: | <a id=\"{code}\"></a>{code} | — preserves existing cell content, no backtick wrapping added"
  - "0x801C03F3 uppercase preserved exactly as shown in 00-index.md"
  - "For 0x80180014 and 0x801c03ea (two-row codes), anchor placed on row #1 only per plan spec"
  - "For 0x80070774 (three-row code in 05-hybrid-join.md), anchor placed on row #1 only"
metrics:
  duration: "~20 minutes"
  completed: "2026-04-09"
  tasks_completed: 3
  files_modified: 5
---

# Phase 08 Plan 02: Error Code Anchor Resolution Summary

Closed ERRC-01 tech debt: added 29 inline HTML `<a id="...">` anchors across 5 error-code category files so all fragment links in the `error-codes/00-index.md` Quick Lookup table resolve to specific error rows instead of falling back to the file top.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add anchors to MDM enrollment and TPM attestation files | 597f3b4 | docs/error-codes/01-mdm-enrollment.md, docs/error-codes/02-tpm-attestation.md |
| 2 | Add anchors to ESP, pre-provisioning, and hybrid join files | 8e7460e | docs/error-codes/03-esp-enrollment.md, docs/error-codes/04-pre-provisioning.md, docs/error-codes/05-hybrid-join.md |
| 3 | End-to-end anchor resolution verification | (no-op) | — |

## Anchors Added Per File

### docs/error-codes/01-mdm-enrollment.md — 10 anchors

| Anchor ID | Row Name |
|-----------|----------|
| `0x8007064c` | AlreadyEnrolled (Legacy) |
| `0x80180005` | DeviceNotSupported (MDM) |
| `0x8018000a` | AlreadyEnrolled (MDM) |
| `0x80180014` | DeviceNotSupported (Intune) — row #1 only |
| `0x80180018` | LicenseError (MDM) |
| `0x80180019` | TenantMismatch (MDM) |
| `0x80180020` | MDMDisabled (Tenant) |
| `0x80180022` | UnsupportedEdition (MDM) |
| `0x80180026` | ConflictClient (MDM) |
| `0x8018002b` | UPNNonRoutable (MDM) |

### docs/error-codes/02-tpm-attestation.md — 8 anchors

| Anchor ID | Row Name |
|-----------|----------|
| `0x80070490` | TPMAttestation (AMD) |
| `0x800705b4` | Timeout (TPM) |
| `0x80190190` | TPMAttestation (Generic) |
| `0x801C03F3` | AzureADObjectMissing (PP) — uppercase preserved |
| `0x801c03ea` | TPMVersion (MDM) — row #1 only |
| `0x81039001` | MaxRetry (Autopilot) |
| `0x81039023` | TPMAttestation (Win11) |
| `0x81039024` | KnownVulnerability (TPM) |

### docs/error-codes/03-esp-enrollment.md — 3 anchors

| Anchor ID | Row Name |
|-----------|----------|
| `0x80004005` | HybridJoinTimeout (ESP) |
| `0x81036501` | MDMInfoNotFound (ESP) |
| `0x81036502` | AppInstallFailure (ESP) |

### docs/error-codes/04-pre-provisioning.md — 1 anchor

| Anchor ID | Row Name |
|-----------|----------|
| `0xc1036501` | MultiMDM (SD) |

### docs/error-codes/05-hybrid-join.md — 7 anchors

| Anchor ID | Row Name |
|-----------|----------|
| `0x80070774` | DomainControllerNotFound (Hybrid) — row #1 only |
| `event-807` | ZtdDeviceIsNotRegistered |
| `event-809` | ZtdDeviceHasNoAssignedProfile (deleted) |
| `event-815` | ZtdDeviceHasNoAssignedProfile (none) |
| `event-908` | SerialNumberMismatch |
| `event-171` | TPMIdentityFailed |
| `event-172` | AutopilotProfileUnavailable |

## Verification Results

```
Hex anchors across files 01-05: 23  (expected 23) ✓
Event anchors in 05-hybrid-join: 6  (expected 6)  ✓
Total unique anchors:           29  (expected 29) ✓
Uppercase 0x801C03F3 preserved: confirmed ✓
```

## Deviations from Plan

None — plan executed exactly as written. The anchor format used preserves existing cell content without adding backtick wrapping (cells in these files do not use backtick-wrapped codes). This is consistent with the plan's "Do NOT change any other table cells" constraint.

## Known Stubs

None.

## Self-Check: PASSED

- docs/error-codes/01-mdm-enrollment.md: modified, anchors verified
- docs/error-codes/02-tpm-attestation.md: modified, anchors verified
- docs/error-codes/03-esp-enrollment.md: modified, anchors verified
- docs/error-codes/04-pre-provisioning.md: modified, anchors verified
- docs/error-codes/05-hybrid-join.md: modified, anchors verified
- Commits 597f3b4 and 8e7460e present in git log
- 29 unique anchors confirmed by grep
