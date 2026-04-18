---
status: partial
phase: 32-navigation-integration-references
source: [32-VERIFICATION.md]
started: 2026-04-18T16:45:00Z
updated: 2026-04-18T17:00:00Z
---

## Current Test

[awaiting human testing — items 1-4 remain]

## Tests

### 1. Rendered markdown visual inspection of iOS capability matrix
expected: Apple-parity preamble reads naturally (2-4 sentences); all 5 domain tables render without column wrap/overflow at ~100-char width; Key Gaps Summary is scannable (8 numbered gaps)
result: [pending]

### 2. Portal-path currency verification for quick-ref-l2.md iOS tables (Diagnostic Data Collection + Intune Portal Paths ONLY)
expected: Each portal-path string (2 remaining tables — Diagnostic Data Collection, Key Intune Portal Paths) matches current Intune admin center UI OR current Microsoft Learn documentation. Sysdiagnose table is superseded by plan 32-09 (now cites Apple Support URL).
result: [pending]

### 3. Apple-parity framing preamble readability as Apple-platform admin
expected: Preamble immediately signals iOS↔macOS comparison is most meaningful for Apple admins (DDM/supervision/VPP); Windows readers don't feel excluded; 2-4 sentences (not narrative drift)
result: [pending]

### 4. Full-suite click-through spot-check from docs/index.md
expected: Clicking iOS/iPadOS Provisioning in Choose Your Platform lands at iOS H2; iOS Enrollment Path Overview from L1 table resolves; iOS Capability Matrix from Admin Setup table resolves; 3 pre-existing non-iOS links still resolve (regression spot-check); sysdiagnose cross-link from quick-ref-l2 now resolves to renamed Section 3 anchor
result: [pending]

### 5. Step 2 AssistiveTouch wording accuracy check (WR-01 from 32-REVIEW)
expected: Step 2 matches UAT-verbatim "tap Custom" wording per UAT.md root_cause.
result: resolved — user elected option (b); both files edited to restore "tap **Custom**" phrasing. quick-ref-l2.md:217 and 14-ios-log-collection.md:122 now read "Customize Top Level Menu > tap **Custom** > select **Analytics**". Validation clean: per-file link-check.sh exit 0; full-docs broken-link count = 85 (baseline preserved).

## Summary

total: 5
passed: 1
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
