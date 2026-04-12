---
phase: 06-l2-runbooks
verified: 2026-03-21T00:00:00Z
status: passed
score: 7/7 must-haves verified
re_verification: false
---

# Phase 6: L2 Runbooks Verification Report

**Phase Goal:** Desktop Engineers have technical investigation guides that cover the five most complex Autopilot failure modes with registry paths, event IDs, and PowerShell function references sourced from the Phase 1 canonical references
**Verified:** 2026-03-21
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|---------|
| 1  | An L2 engineer can collect a complete diagnostic package using only the log collection guide (all 5 D-05 items covered) | VERIFIED | `01-log-collection.md` contains `mdmdiagnosticstool.exe -area Autopilot -cab`, 4 `wevtutil epl` commands, `Get-AutopilotLogs`, `reg export` for ESP registry, and naming convention table with 6 rows |
| 2  | The index provides a when-to-use table routing to all 5 investigation runbooks | VERIFIED | `00-index.md` when-to-use table covers all 5 runbooks (log collection, ESP, TPM, hybrid join, policy conflicts) with Prerequisite column and L1 Escalation Mapping section |
| 3  | The ESP deep-dive documents registry structure for device phase and user phase separately, including LOB and Win32 app conflict indicators | VERIFIED | `02-esp-deep-dive.md` covers `IsServerProvisioningDone` for phase determination, `ExpectedPolicies`, `Sidecar` (Win32 per-app subkeys), `AppWorkload.log`, and LOB vs Win32 distinction table |
| 4  | The policy conflict analysis covers AppLocker CSP, DeviceLock, Security Baseline, and autologon failures with inline remediation commands | VERIFIED | `05-policy-conflicts.md` covers AutoAdminLogon, AppLocker CSP, DeviceLock, Security Baseline, and PreferredAadTenantDomainName — all 5 with inline PowerShell investigation and resolution scenarios |
| 5  | The TPM runbook documents hardware-specific error codes with firmware update paths for all 5 chipsets | VERIFIED | `03-tpm-attestation.md` covers AMD fTPM, ST Micro, Nuvoton RSA-3072, Infineon SLB9670, Intel Tiger Lake — each as a named scenario with `ManufacturerId` mapping table |
| 6  | The hybrid join runbook covers ODJ Connector prerequisites and all three distinct 0x80070774 causes | VERIFIED | `04-hybrid-join.md` documents version 6.2501.2000.5, current vs legacy log path warning, event IDs 807/809/815/908/171/172, and Scenarios A/B/C as three distinct 0x80070774 causes |
| 7  | All forward-link placeholders referencing Phase 6 are resolved to actual L2 runbook file paths | VERIFIED | Zero `(available after Phase 6)` occurrences remain across all `docs/` files; error code files, decision trees, L1 runbooks, and lifecycle files all contain resolved specific runbook paths |

**Score:** 7/7 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|---------|--------|---------|
| `docs/l2-runbooks/00-index.md` | L2 runbook index with when-to-use routing | VERIFIED | `audience: L2`, version gate, when-to-use table for all 5 runbooks, L1 escalation mapping, related resources |
| `docs/l2-runbooks/01-log-collection.md` | Standalone prerequisite guide (L2RB-01) | VERIFIED | `audience: L2`, `last_verified: 2026-03-21`, all 5 D-05 items present, links to powershell-ref.md, registry-paths.md, endpoints.md |
| `docs/l2-runbooks/02-esp-deep-dive.md` | ESP registry-level investigation (L2RB-02) | VERIFIED | `audience: L2`, triage block with ESE1/ESE2/ESE4/ESE5, `EnrollmentStatusTracking`, `IsServerProvisioningDone`, `Sidecar`, `AppWorkload.log`, `Restart-EnrollmentStatusPage -WhatIf`, escalation ceiling |
| `docs/l2-runbooks/03-tpm-attestation.md` | TPM attestation failure investigation (L2RB-03) | VERIFIED | `audience: L2`, triage block TPE1-TPE5, `ManufacturerId` table for 5 chipsets, `Reset-TPMForAutopilot -WhatIf`, escalation ceiling at firmware boundary |
| `docs/l2-runbooks/04-hybrid-join.md` | Hybrid join failure investigation (L2RB-04) | VERIFIED | `audience: L2`, version 6.2501.2000.5, current log path `Microsoft-Intune-ODJConnectorService/Operational`, legacy path warning, 3 x 0x80070774 scenarios, escalation ceiling |
| `docs/l2-runbooks/05-policy-conflicts.md` | Policy conflict analysis (L2RB-05) | VERIFIED | `audience: L2`, triage block, 5 conflict patterns with registry investigation + resolution, escalation ceiling |
| `docs/error-codes/02-tpm-attestation.md` | Resolved L2 runbook links | VERIFIED | Contains `l2-runbooks/03-tpm-attestation.md` in all TPM error code rows |
| `docs/error-codes/03-esp-enrollment.md` | Resolved L2 runbook links | VERIFIED | Contains `l2-runbooks/02-esp-deep-dive.md` |
| `docs/error-codes/05-hybrid-join.md` | Resolved L2 runbook links | VERIFIED | Contains `l2-runbooks/04-hybrid-join.md` |
| `docs/decision-trees/01-esp-failure.md` | Resolved L2 runbook links in ESE escalation rows | VERIFIED | ESE1-ESE5 all point to `l2-runbooks/02-esp-deep-dive.md` |
| `docs/decision-trees/03-tpm-attestation.md` | Resolved L2 runbook links in TPE escalation rows | VERIFIED | TPE1-TPE5 all point to `l2-runbooks/03-tpm-attestation.md` |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `docs/l2-runbooks/01-log-collection.md` | `docs/reference/powershell-ref.md` | Tool References | WIRED | `[Get-AutopilotLogs](../reference/powershell-ref.md#get-autopilotlogs)` — lines 45, 122 |
| `docs/l2-runbooks/01-log-collection.md` | `docs/reference/registry-paths.md` | Tool References | WIRED | `[registry-paths.md](../reference/registry-paths.md)` — lines 91, 123 |
| `docs/l2-runbooks/02-esp-deep-dive.md` | `docs/l2-runbooks/01-log-collection.md` | Step 1 prerequisite | WIRED | Line 29: `per the [Log Collection Guide](01-log-collection.md)` |
| `docs/l2-runbooks/02-esp-deep-dive.md` | `docs/error-codes/03-esp-enrollment.md` | Tool References | WIRED | Line 193: `[ESP Error Codes](../error-codes/03-esp-enrollment.md)` |
| `docs/l2-runbooks/02-esp-deep-dive.md` | `docs/l2-runbooks/05-policy-conflicts.md` | Cross-link for policy failures | WIRED | Line 132: `[Policy Conflict Analysis](05-policy-conflicts.md)` |
| `docs/l2-runbooks/05-policy-conflicts.md` | `docs/l2-runbooks/01-log-collection.md` | Step 1 prerequisite | WIRED | Line 31: `per the [Log Collection Guide](01-log-collection.md)` |
| `docs/l2-runbooks/03-tpm-attestation.md` | `docs/l2-runbooks/01-log-collection.md` | Step 1 prerequisite | WIRED | Line 31: `Follow the [Log Collection Guide](01-log-collection.md)` |
| `docs/l2-runbooks/03-tpm-attestation.md` | `docs/error-codes/02-tpm-attestation.md` | Error code cross-reference | WIRED | Line 80: `[TPM Attestation Error Codes](../error-codes/02-tpm-attestation.md)` |
| `docs/l2-runbooks/04-hybrid-join.md` | `docs/l2-runbooks/01-log-collection.md` | Step 1 prerequisite | WIRED | Line 37: `Follow the [Log Collection Guide](01-log-collection.md)` |
| `docs/l2-runbooks/04-hybrid-join.md` | `docs/error-codes/05-hybrid-join.md` | Error code cross-reference | WIRED | Line 67: `[Hybrid Join Error Codes](../error-codes/05-hybrid-join.md)` |
| `docs/error-codes/02-tpm-attestation.md` | `docs/l2-runbooks/03-tpm-attestation.md` | L2 Fix column links | WIRED | Lines 19-31: `[L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md)` in every TPM error row |
| `docs/decision-trees/01-esp-failure.md` | `docs/l2-runbooks/02-esp-deep-dive.md` | Escalation data See Also | WIRED | ESE1-ESE5 all contain `[L2 ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md)` |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| L2RB-01 | 06-01-PLAN.md, 06-04-PLAN.md | Log collection guide (mdmdiagnosticstool.exe, Event Viewer paths, PowerShell tools) | SATISFIED | `01-log-collection.md` contains all 5 D-05 items; forward-links to this guide from all other runbooks |
| L2RB-02 | 06-02-PLAN.md, 06-04-PLAN.md | ESP deep-dive (registry structure, device vs user phase, LOB+Win32 conflicts) | SATISFIED | `02-esp-deep-dive.md` with `IsServerProvisioningDone`, `ExpectedPolicies`, `Sidecar`, `AppWorkload.log`; resolved in decision tree ESE nodes |
| L2RB-03 | 06-03-PLAN.md, 06-04-PLAN.md | TPM attestation failure investigation (hardware-specific codes, firmware paths) | SATISFIED | `03-tpm-attestation.md` with `ManufacturerId` table for 5 chipsets; resolved in TPE decision tree nodes and error code file |
| L2RB-04 | 06-03-PLAN.md, 06-04-PLAN.md | Hybrid join failure investigation (ODJ connector, domain replication, 0x80070774) | SATISFIED | `04-hybrid-join.md` with 6.2501.2000.5 version check, three 0x80070774 causes, current log path |
| L2RB-05 | 06-02-PLAN.md, 06-04-PLAN.md | Policy conflict analysis (AppLocker CSP, DeviceLock, Security Baseline, GPO conflicts) | SATISFIED | `05-policy-conflicts.md` with 5 conflict patterns, inline registry reads, 5 resolution scenarios |

No orphaned requirements — all L2RB IDs in REQUIREMENTS.md are assigned to Phase 6 plans and verified as implemented.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `docs/l2-runbooks/03-tpm-attestation.md` | 174 | Broken nav link: `Prev: [02-device-registration.md](02-device-registration.md)` — `02-device-registration.md` does not exist in `docs/l2-runbooks/` | Warning | Navigation footer only; does not affect investigation content or goal achievement |
| `docs/l2-runbooks/04-hybrid-join.md` | 161 | Broken nav link: `Next: [05-policy-conflict.md](05-policy-conflict.md)` — actual filename is `05-policy-conflicts.md` (missing trailing `s`) | Warning | Navigation footer only; does not affect investigation content or goal achievement |

Neither anti-pattern blocks the phase goal. Both are footer navigation artifacts — no investigation content, registry paths, PowerShell functions, or event IDs are affected.

---

### Human Verification Required

None required. All truths were verified programmatically against file content.

---

### Gaps Summary

No gaps. All 7 truths verified, all 11 artifacts confirmed at levels 1-3 (exists, substantive, wired), all 12 key links confirmed wired.

The two broken navigation footer links in `03-tpm-attestation.md` and `04-hybrid-join.md` are warning-level only: `02-device-registration.md` (does not exist in l2-runbooks) and `05-policy-conflict.md` (typo, should be `05-policy-conflicts.md`). These footers are cosmetic and do not affect investigation content, registry path accuracy, PowerShell function references, or L2 engineer workflow. They are noted but do not constitute a gap against the phase goal.

---

_Verified: 2026-03-21_
_Verifier: Claude (gsd-verifier)_
