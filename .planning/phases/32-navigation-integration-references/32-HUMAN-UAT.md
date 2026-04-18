---
status: partial
phase: 32-navigation-integration-references
source: [32-VERIFICATION.md]
started: 2026-04-18T16:45:00Z
updated: 2026-04-18T16:45:00Z
---

## Current Test

[awaiting human testing]

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
expected: Implementation reads "Customize Top Level Menu > tap an icon (or tap + to add a new slot) > select Analytics" instead of UAT-verbatim "tap Custom". Cross-check against live Apple Support URL (https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web) and either (a) accept the UI-accurate paraphrase or (b) restore "tap Custom" wording.
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
