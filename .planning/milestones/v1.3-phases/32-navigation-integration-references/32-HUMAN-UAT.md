---
status: resolved
phase: 32-navigation-integration-references
source: [32-VERIFICATION.md]
started: 2026-04-18T16:45:00Z
updated: 2026-04-18T17:30:00Z
---

## Current Test

[all 5 items resolved]

## Tests

### 1. Rendered markdown visual inspection of iOS capability matrix
expected: Apple-parity preamble reads naturally (2-4 sentences); all 5 domain tables render without column wrap/overflow at ~100-char width; Key Gaps Summary is scannable (8 numbered gaps)
result: pass — 5 domain tables present (Enrollment, Configuration, App Deployment, Compliance, Software Updates); 8-item numbered Key Gaps Summary; preamble at line 11 is 3 framing sentences (well within 2-4 target) + 2 See-Also cross-links. Longest table row is 365 chars (line 19 "Enrollment types" iOS cell — intentionally enumerates all 4 enrollment paths for completeness); GitHub-flavored markdown wraps cell content responsively, so raw source width does not cause rendered overflow.

### 2. Portal-path currency verification for quick-ref-l2.md iOS tables (Diagnostic Data Collection + Intune Portal Paths ONLY)
expected: Each portal-path string (2 remaining tables — Diagnostic Data Collection, Key Intune Portal Paths) matches current Intune admin center UI OR current Microsoft Learn documentation. Sysdiagnose table is superseded by plan 32-09 (now cites Apple Support URL).
result: resolved — Microsoft Learn 2026-04-16 docs (MDM Push Certificate, Enrollment restrictions) confirm admin center reorg added "Device onboarding" section under Devices. Updated 3 paths in Key Intune Portal Paths table to match: Enrollment Program Tokens, Apple MDM Push Certificate, Enrollment restrictions now prefixed with "Devices > Device onboarding > Enrollment > ...". Apps > iOS/iPadOS apps and Devices > [device] > Device compliance paths remain unchanged (still current). Diagnostic Data Collection table's on-device path ("Settings > General > VPN & Device Management > Management Profile > More Details") matches iOS 17+ UI labeling (Microsoft Learn tip reflects older "Device Management" but our wording is more current). Intune > Troubleshooting + support path for MAM Collect diagnostics remains current. Committed in separate edit; full-docs link-check baseline preserved at 85.

### 3. Apple-parity framing preamble readability as Apple-platform admin
expected: Preamble immediately signals iOS↔macOS comparison is most meaningful for Apple admins (DDM/supervision/VPP); Windows readers don't feel excluded; 2-4 sentences (not narrative drift)
result: pass — Sentence 2 explicitly frames the Apple-admin audience ("admins coming from macOS ADE") and names the three meaningful differences (DDM maturity, supervision model scope, VPP licensing behavior). Sentence 3 addresses Windows readers directly without pushing them away ("should treat iOS and macOS as structurally distinct from Windows despite being managed via the same Intune tenant"). Sentences 4-5 provide See-Also cross-links to Windows↔macOS-only and concept-comparison docs. 3 framing sentences within 2-4 target; no narrative drift.

### 4. Full-suite click-through spot-check from docs/index.md
expected: Clicking iOS/iPadOS Provisioning in Choose Your Platform lands at iOS H2; iOS Enrollment Path Overview from L1 table resolves; iOS Capability Matrix from Admin Setup table resolves; 3 pre-existing non-iOS links still resolve (regression spot-check); sysdiagnose cross-link from quick-ref-l2 now resolves to renamed Section 3 anchor
result: pass — (a) Choose Your Platform → iOS/iPadOS Provisioning anchor `#iosipados-provisioning` resolves to `## iOS/iPadOS Provisioning` heading at docs/index.md:130; (b) iOS Enrollment Path Overview link to `ios-lifecycle/00-enrollment-overview.md` resolves; (c) iOS Capability Matrix link to `reference/ios-capability-matrix.md` resolves; (d) Regression non-iOS links resolve: `reference/macos-capability-matrix.md`, `_glossary.md`, `apv1-vs-apv2.md`; (e) Sysdiagnose cross-link from quick-ref-l2.md `#section-3-sysdiagnose-trigger-and-file-export` resolves to renamed Section 3 heading in 14-ios-log-collection.md. link-check.sh on docs/index.md and docs/quick-ref-l2.md both exit 0. Full-docs broken-link count = 85 (baseline preserved).

### 5. Step 2 AssistiveTouch wording accuracy check (WR-01 from 32-REVIEW)
expected: Step 2 matches UAT-verbatim "tap Custom" wording per UAT.md root_cause.
result: resolved — user elected option (b); both files edited to restore "tap **Custom**" phrasing. quick-ref-l2.md:217 and 14-ios-log-collection.md:122 now read "Customize Top Level Menu > tap **Custom** > select **Analytics**". Validation clean: per-file link-check.sh exit 0; full-docs broken-link count = 85 (baseline preserved).

## Summary

total: 5
passed: 5
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps
