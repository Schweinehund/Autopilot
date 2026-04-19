---
status: complete
phase: 32-navigation-integration-references
source:
  - 32-00-SUMMARY.md
  - 32-01-SUMMARY.md
  - 32-02-SUMMARY.md
  - 32-03-SUMMARY.md
  - 32-04-SUMMARY.md
  - 32-05-SUMMARY.md
  - 32-06-SUMMARY.md
  - 32-07-SUMMARY.md
  - 32-08-SUMMARY.md
started: 2026-04-17T22:00:00Z
updated: 2026-04-17T22:19:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Docs Hub iOS Section Visibility
expected: |
  Open `docs/index.md`. Scroll past the Windows Autopilot and macOS Provisioning sections.
  You should see a third top-level section `## iOS/iPadOS Provisioning` with 3 role-based
  subsections (Service Desk (L1) / Desktop Engineering (L2) / Admin Setup), each containing
  a table of resources with direct links. The "Choose Your Platform" selector at the top
  should list iOS/iPadOS as the third entry. All pre-existing Windows + macOS sections
  should be unchanged.
result: pass

### 2. Common-Issues iOS Failure Scenarios
expected: |
  Open `docs/common-issues.md`. Scroll past Windows Autopilot Issues and macOS ADE Failure
  Scenarios sections. You should see a third top-level section `## iOS/iPadOS Failure Scenarios`
  with 6 iOS symptom H3 sub-sections (all prefixed with "iOS: " — e.g., "iOS: Device Not
  Appearing in Intune") plus a 7th MAM-WE advisory H3. Each symptom routes to an L1 runbook
  (16-21) and an L2 runbook (14-17). Clicking the iOS link in the platform selector at the
  top of the file should jump to this section without collision with macOS's anchors.
result: pass

### 3. L1 Quick-Ref iOS Section
expected: |
  Open `docs/quick-ref-l1.md`. Scroll to the bottom past Windows, APv2, and macOS sections.
  You should see a fourth platform section `## iOS/iPadOS Quick Reference` with exactly 4
  numbered Top Checks (Device in ABM / Device in Intune / Enrollment profile assigned /
  Compliance state), an iOS Escalation Triggers bullet list (4-5 items), a Decision Tree
  link to 07-ios-triage.md, and an iOS Runbooks list with 6 links to runbooks 16-21.
result: pass

### 4. L2 Quick-Ref iOS Section (3 tables + research-flag footnotes)
expected: |
  Open `docs/quick-ref-l2.md`. Scroll past the APv2 and macOS sections. You should see
  `## iOS/iPadOS Quick Reference` containing three tables in order: (1) iOS Diagnostic Data
  Collection with MDM diagnostic report row noting MAM-scoped vs on-device distinction
  (NO "Intune > Devices > All devices > [device] > Collect diagnostics" breadcrumb),
  (2) Key Intune Portal Paths, (3) Sysdiagnose Trigger Reference with a "Modern iOS 15+
  unified" top row + legacy per-device-type rows below. Each table has an inline italic
  note citing "Phase 30 D-32" or "Phase 31 D-30/D-31" research flags. Followed by 4 iOS
  L2 Investigation Runbook links.
result: pass

### 5. Apple Glossary iOS Terms
expected: |
  Open `docs/_glossary-macos.md`. Alphabetical Index at top now shows 11 entries (was 6).
  You should see 5 new H3 term entries: Supervision + Account-Driven User Enrollment under
  Enrollment H2; APNs + Jailbreak Detection under Device Management H2; MAM-WE under a NEW
  `## App Protection (MAM)` H2 (separate from Enrollment per Phase 26 lock). Each new term
  has a `> **Windows equivalent:** ...` blockquote. The existing VPP entry now has iOS-specific
  content (device-licensed vs user-licensed distinction + supervised-only silent install
  callout). Filename is still `_glossary-macos.md` (not renamed).
result: pass

### 6. iOS Capability Matrix File
expected: |
  Open `docs/reference/ios-capability-matrix.md`. You should see a NEW trilateral matrix file
  (~108 lines) with 3 columns `| Feature | Windows | macOS | iOS |` across 5 domains
  (Enrollment / Configuration / App Deployment / Compliance / Software Updates). Opens with
  a 2-4 sentence Apple-parity framing preamble. DDM row (Configuration domain) shows
  "supervised AND unsupervised" for iOS — NOT conflated with silent install which shows
  "supervised ADE only". Ends with a Key Gaps Summary (7-8 numbered gaps) and See Also
  footer. Matrix renders without column overflow at 100-char terminal width.
result: pass

### 7. Capability Matrix Reachable from Hub
expected: |
  Open `docs/index.md` Cross-Platform References table (near the bottom). You should see
  2 new rows: one linking to `ios-lifecycle/00-enrollment-overview.md` and one linking to
  `reference/ios-capability-matrix.md`. Click the iOS Capability Matrix link — it should
  open the new file. Also check `docs/reference/00-index.md` — it should have a NEW
  `## iOS References` H2 section (after the macOS References H2) with the capability
  matrix entry.
result: pass

### 8. Placeholder Retrofit in iOS Triage Tree
expected: |
  Open `docs/decision-trees/07-ios-triage.md`. Scroll to near the bottom (Related Resources).
  Line 99 should NO LONGER contain "Phase 32 NAV-01" placeholder text. It should now read:
  "Apple Provisioning Glossary -- Shared Apple terminology covering iOS/iPadOS (supervision,
  MAM-WE, APNs, account-driven user enrollment, jailbreak detection) and macOS (ABM, ADE,
  VPP, Await Configuration, Setup Assistant)." All 10 glossary term names should be inline
  links. Click any one (e.g., "supervision") — it should jump to the correct anchor in
  `_glossary-macos.md`.
result: pass

### 9. Phase 30 Wave 3 Retrofit — initial-triage.md
expected: |
  Open `docs/decision-trees/00-initial-triage.md`. Line ~10 should have a new iOS banner
  blockquote: `> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).`
  The Scenario Trees list should include iOS Triage. The See Also footer should include iOS
  Triage (and the long-absent macOS ADE Triage parity entry). Mermaid diagram block UNCHANGED
  (no IOS1/IOS2/IOS3 nodes added — single-branch integration per Phase 30 D-05).
result: pass

### 10. Phase 30 Wave 3 Retrofit — L1 Runbooks Index
expected: |
  Open `docs/l1-runbooks/00-index.md`. After the existing `## macOS ADE Runbooks` H2
  section, you should see a NEW `## iOS L1 Runbooks` H2 section with a table of 6 runbooks
  (16-21: APNs, ADE, Enrollment Restriction, License, Device Cap, Compliance). Followed
  by a MAM-WE advisory note deferring app-protection-specific L1 to ADDTS-01. Related
  Resources section includes a link to iOS Triage Decision Tree. Scope paragraph now
  mentions iOS/iPadOS alongside APv1, APv2, macOS.
result: pass

### 11. End-to-End Click-Through (Reachability Test)
expected: |
  Starting at `docs/index.md`, reach any iOS file in at most 2 clicks without scrolling
  through directory listings. Pick 3 random iOS files to test:
  (a) `docs/admin-setup-ios/08-user-enrollment.md` — via iOS/iPadOS Provisioning > Admin Setup
  table > iOS User Enrollment link (2 clicks)
  (b) `docs/l2-runbooks/17-ios-compliance-ca-timing.md` — via iOS/iPadOS Provisioning > L2
  Runbooks index > Compliance investigation (2 clicks)
  (c) `docs/_glossary-macos.md#mam-we` — via Cross-Platform References > Apple Glossary > MAM-WE
  anchor (2 clicks)
result: pass

### 12. Pre-Existing Links Unbroken (SC #4 Regression)
expected: |
  The 85 pre-existing broken links reported by validation are ALL from Phase 20-31 content
  (not introduced by Phase 32). Spot-check: open 3 Phase 25-era files —
  `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/common-issues.md` — scroll past the
  pre-existing Windows/macOS sections and confirm their content is UNCHANGED by Phase 32
  (all section headings, tables, bullet lists exactly as shipped in Phase 25). Cross-ref
  banners added in shared sections link to valid iOS anchors.
result: pass

### 13. (Deferred Manual Check) Rendered Markdown Visual Inspection
expected: |
  Open `docs/reference/ios-capability-matrix.md` in a rendered preview (GitHub, VS Code
  preview, or any Markdown renderer). The 5 domain tables should render cleanly without
  column wrap or horizontal overflow at typical viewing widths. Apple-parity framing
  preamble (2-4 sentences) reads naturally. Key Gaps Summary numbered list is visually
  separated from the last domain table.
result: pass

### 14. (Deferred Manual Check) Portal-Path Currency
expected: |
  The Intune portal paths embedded in `docs/quick-ref-l2.md` iOS section tables have
  research-flag footnotes. Either (a) open Intune admin center and click through each
  listed path to confirm the UI still matches, OR (b) cross-check each path against the
  current Microsoft Learn documentation URL listed in Plan 32-08. No path appears
  fabricated or renamed beyond what the footnote research flags documented.
result: pass

### 15. (Deferred Manual Check) Sysdiagnose Trigger Currency
expected: |
  The "Modern iOS 15+ unified combo" row in quick-ref-l2 sysdiagnose table says
  "Both volume buttons + Side/Top button, hold 250ms". Verify against current Apple
  Developer documentation. Legacy per-device-type rows for iPhone 8/SE, iPhone X+,
  iPad Face ID are accurate for pre-iOS-15 hardware.
result: issue
reported: "Replace physical button combos with AssistiveTouch-based sysdiagnose procedure per Apple Support canonical documentation at https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web. Procedure: Settings > Accessibility > Touch > AssistiveTouch > On. Then Settings > Accessibility > Touch > AssistiveTouch > Customize Top Level Menu > tap Custom > select Analytics. Use the on-screen button to run Analytics. Find sysdiagnose_ files under Settings > Privacy & Security > Analytics & Improvements > Analytics Data. Scroll to sysdiagnose_ files, tap, use share button in upper right."
severity: major

## Summary

total: 15
passed: 14
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "Sysdiagnose trigger documentation in quick-ref-l2.md and l2-runbooks/14-ios-log-collection.md reflects current Apple-recommended procedure"
  status: failed
  reason: "User reported: Replace physical button combos (Volume+Side/Top, per-device-type variants) with Apple's canonical AssistiveTouch-based sysdiagnose procedure per https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web. New procedure: (1) Settings > Accessibility > Touch > AssistiveTouch > On; (2) Settings > Accessibility > Touch > AssistiveTouch > Customize Top Level Menu > tap Custom > select Analytics; (3) Use on-screen AssistiveTouch button > Analytics to trigger sysdiagnose; (4) Find output at Settings > Privacy & Security > Analytics & Improvements > Analytics Data > sysdiagnose_ files; (5) Tap file > use share button (top-right) to send from device."
  severity: major
  test: 15
  root_cause: "Phase 32 quick-ref-l2.md sysdiagnose trigger table and Phase 31 l2-runbooks/14-ios-log-collection.md Section 3 both document physical button combos (modern iOS 15+ unified + legacy per-device-type rows). The physical button method technically works but is (a) per-device-type variable, (b) requires memorization, (c) fails on supervised devices with side-button restrictions, and (d) is NOT the Apple-official documented method. Apple's canonical platform support guide uses AssistiveTouch > Analytics menu item for a uniform, user-accessible, supervised-compatible procedure that works across all iPhone/iPad models and iOS versions."
  artifacts:
    - docs/quick-ref-l2.md (lines ~220-226 — sysdiagnose trigger table to replace)
    - docs/l2-runbooks/14-ios-log-collection.md Section 3 — full sysdiagnose procedure needs rewrite
  missing:
    - AssistiveTouch-based sysdiagnose procedure (5-step navigation)
    - Apple Support canonical URL citation in research-flag footnote
    - Removal of per-device-type button combo table rows (replaced by uniform procedure)
    - Note on supervised-device compatibility (AssistiveTouch works on supervised; physical button combos may conflict with Side Button restrictions)
