---
phase: 03-error-codes
plan: "01"
subsystem: docs/error-codes
tags: [documentation, error-codes, mdm-enrollment, tpm-attestation]
dependency_graph:
  requires: [docs/reference/powershell-ref.md, docs/reference/registry-paths.md, docs/lifecycle/03-oobe.md, docs/_glossary.md]
  provides: [docs/error-codes/01-mdm-enrollment.md, docs/error-codes/02-tpm-attestation.md]
  affects: [docs/error-codes/00-index.md]
tech_stack:
  added: []
  patterns: [7-column error table, multi-cause row pattern, hardware-specific known issues section]
key_files:
  created:
    - docs/error-codes/01-mdm-enrollment.md
    - docs/error-codes/02-tpm-attestation.md
  modified: []
decisions:
  - "0x80180014 uses two-row pattern with different L1 actions: cause 1 portal Unblock device, cause 2 immediate escalate"
  - "0x801c03ea uses two-row pattern: cause 1 TPM 1.2 upgrade needed (escalate), cause 2 dual profile assignment (L1 can check portal)"
  - "0x81039001 gets retry guidance (not immediate escalation) per research pitfall 5 - transient error"
  - "APv2 Notes in MDM file conservative: only 0x80180018 confirmed by Microsoft for APv2"
  - "APv2 Notes in TPM file notes TPM attestation not used in APv2 Device Preparation at all"
  - "Hardware-Specific Known Issues section in 02-tpm-attestation.md expands cause column abbreviations without creating L2 investigation procedures"
metrics:
  duration: "3 minutes"
  completed: "2026-03-14"
  tasks_completed: 2
  files_created: 2
---

# Phase 3 Plan 01: MDM Enrollment and TPM Attestation Error Code Files Summary

MDM enrollment error lookup table (0x8018xxxx series, 10 codes, multi-cause pattern for 0x80180014) and TPM attestation error lookup table (8 codes, hardware-specific notes for Infineon, ST Micro/Nuvoton, AMD fTPM, Intel Tiger Lake) created in 7-column format.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create MDM enrollment errors file (01-mdm-enrollment.md) | 41ae11f | docs/error-codes/01-mdm-enrollment.md |
| 2 | Create TPM attestation errors file (02-tpm-attestation.md) | 2118d3b | docs/error-codes/02-tpm-attestation.md |

## Deviations from Plan

None - plan executed exactly as written.

## Files Created

### docs/error-codes/01-mdm-enrollment.md

MDM enrollment error lookup table covering the complete 0x8018xxxx series (10 codes). Key features:

- 0x8007064c sorted first (smallest hex value, before 0x8018xxxx series)
- 0x80180014 has two cause rows with different L1 actions: cause 1 = prior record not deleted (L1 can select "Unblock device" in portal), cause 2 = MDM blocked in tenant (L1 must escalate immediately)
- All L2 Fix entries link to `powershell-ref.md` and `registry-paths.md` for actionable references
- Forward-links to Phase 6 L2 runbook with "(available after Phase 6)" annotation
- APv2 Notes section conservatively scoped to 0x80180018 only

### docs/error-codes/02-tpm-attestation.md

TPM attestation error lookup table covering 8 codes. Key features:

- 0x801c03ea has two cause rows: cause 1 = TPM 1.2 needs upgrade (L1 escalates), cause 2 = dual profile assignment (L1 checks portal first)
- 0x81039001 includes retry guidance "max 2 attempts, 15 min between" — not immediate escalation (transient error pattern)
- Hardware-Specific Known Issues section expands Cause column abbreviations for 5 hardware issues: Infineon SLB9672, ST Micro/Nuvoton, AMD fTPM, Intel Tiger Lake, general clock skew
- APv2 Notes section notes TPM attestation not applicable in APv2 Device Preparation

## Decisions Made

1. **0x80180014 two-row pattern**: Row 1 allows L1 portal action ("Unblock device"), Row 2 requires immediate escalation — this is the canonical exemplar for multi-cause entries where one cause is L1-actionable and the other is not.

2. **0x801c03ea cause 2 L1 portal check**: Research Open Question 4 resolved by allowing L1 to check group membership in portal before escalating for dual-profile scenario only. TPM 1.2 upgrade (cause 1) still requires immediate escalation.

3. **Hardware-Specific Known Issues section scope**: Section is factual/descriptive only. It does not contain investigation procedures (those belong in Phase 6 L2 runbook). Each entry is 2-3 sentences maximum.

4. **APv2 Notes conservatism**: Only codes explicitly documented by Microsoft for APv2 are tagged. 0x80180018 (licensing) is the only MDM code confirmed. All TPM codes are excluded since APv2 does not require TPM attestation.

## Self-Check

Verified:
- `docs/error-codes/01-mdm-enrollment.md` — exists, 10+ occurrences of 0x8018, dual rows for 0x80180014, APv2 Notes, Version History
- `docs/error-codes/02-tpm-attestation.md` — exists, 8 hardware-specific term occurrences, dual rows for 0x801c03ea, retry guidance for 0x81039001, Hardware-Specific Known Issues H2, APv2 Notes
- Both commits exist: 41ae11f, 2118d3b
- Both files have correct YAML frontmatter and version gate banner
- 7-column table headers match spec: `| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |`
- Prev/next navigation links present in both files
