# Project Research Summary

**Project:** iOS/iPadOS Intune Provisioning Documentation (v1.3 Milestone)
**Domain:** Documentation suite expansion -- iOS/iPadOS provisioning into existing multi-platform Intune docs
**Researched:** 2026-04-15 to 2026-04-16
**Confidence:** HIGH

## Executive Summary

The v1.3 milestone adds iOS/iPadOS as a third platform to an existing two-platform documentation suite (Windows Autopilot + macOS ADE). The tooling stack requires no changes -- v1.3 is entirely a content expansion. The fundamental pattern is parallel platform directories (ios-lifecycle/, admin-setup-ios/) feeding into shared navigation files, exactly as macOS was added in v1.2.

The primary complexity in iOS/iPadOS documentation is not coverage breadth but conceptual accuracy. iOS has four to five distinct enrollment paths -- ADE (supervised), Device Enrollment (unsupervised BYOD), Account-Driven User Enrollment (privacy-preserving BYOD), and MAM without enrollment -- each with fundamentally different management scope, supervision state, and admin capabilities. Supervision is the most important iOS-specific documentation axis: it is set at enrollment time via ADE and cannot be retroactively added without a device wipe. The corporate primary path (ADE, supervised) justifies the deepest documentation investment; BYOD paths warrant focused guides emphasizing what IT cannot do.

The key risks are accuracy traps and integration mistakes. Supervision capability boundaries shift across iOS versions (DDM-based updates changed the update deferral story in iOS 17+). Profile-based User Enrollment was deprecated in iOS 18. The ADE enrollment profile UI was redesigned in Q1 2025. ABM token setup is shared with macOS and must not be duplicated. MAM without enrollment is frequently misrepresented as a subset of MDM documentation when it is an entirely separate management model. The mitigation is systematic: establish an enrollment type matrix first, verify every supervision claim against current Microsoft Learn before writing, and use 60-day review cycles for iOS admin setup guides.

## Key Findings

### Recommended Stack

The documentation tooling stack is unchanged from v1.2: Markdown/CommonMark, MkDocs Material, Mermaid (diagrams), Pandoc, markdownlint-cli2, and the established frontmatter schema. v1.3 extends the frontmatter platform and applies_to fields to accept iOS and iPadOS as valid values alongside existing APv1, APv2, macOS, both, and all. The only new tooling concern is the review_by discipline: iOS/iPadOS Intune UI changes faster than macOS, requiring 60-day cycles for enrollment and admin setup guides versus the 90-day default.

**Core reference sources (all HIGH confidence):**
- Microsoft Learn iOS/iPadOS enrollment guide -- updated 2026-04-14, canonical enrollment path comparison
- Microsoft Learn ADE setup for iOS/iPadOS -- full enrollment profile creation reference
- Microsoft Learn iOS/iPadOS device restrictions -- canonical supervised-only capability list
- Microsoft Learn iOS/iPadOS MAM app protection policy settings -- updated 2026-04-15
- Microsoft Learn iOS/iPadOS compliance settings -- updated 2026-04-15
- Microsoft Tech Community: New ADE enrollment policies experience -- Q2 CY2026 UI changes (MEDIUM confidence)

**New template required:** _templates/admin-template-ios.md that adds the Supervised only callout pattern absent from the macOS admin template. Create after the first admin guide (02-ade-enrollment-profile.md) is written.

### Expected Features

All documentation artifacts required for v1.3 are P1 (table stakes for platform parity with macOS coverage).

**Must have (table stakes -- P1):**
- Enrollment path overview covering all four paths with selection guidance
- iOS/iPadOS ADE lifecycle document (primary corporate path)
- APNs certificate admin guide (cross-platform prerequisite; explicit renewal procedure)
- ADE admin setup guides (ABM cross-reference + enrollment profile creation, iOS-specific)
- Configuration profiles guide with supervision callouts throughout
- App deployment guide (VPP device-licensed vs user-licensed distinction; silent install supervision requirement)
- Compliance policy guide (jailbreak detection, OS version gates, Conditional Access timing)
- App protection policies guide (MAM) -- entirely new content category, no existing template
- BYOD/User enrollment guide emphasizing management limitations
- L1 triage decision tree for iOS (07-ios-triage.md)
- L1 runbooks: 6 scenarios (device not appearing, Setup Assistant failed, profile not applied, app not installed, compliance blocked, Company Portal sign-in)
- L2 runbook: iOS log collection (prerequisite for all L2 investigation)
- Supervised vs unsupervised capability reference table
- iOS glossary additions to _glossary-macos.md
- Navigation integration (index.md, common-issues.md, quick-ref cards)

**Should have (differentiators -- P1/P2):**
- Enrollment path selection decision guide (admins frequently choose wrong path; no macOS/Windows equivalent)
- Shared iPad documentation (iPadOS-only; education/frontline worker scenario)
- iOS capability matrix (iOS vs macOS feature parity reference)
- L2 runbooks: profile delivery, app install investigation, compliance investigation (3 additional runbooks)

**Defer (v2+):**
- Android enrollment and MAM documentation
- Apple School Manager (ASM) parallel coverage
- Apple Configurator 2 detailed guide (one-paragraph callout in ADE guide sufficient for v1.3)

### Architecture Approach

iOS/iPadOS follows the parallel-directory pattern established in v1.2. New directories ios-lifecycle/ and admin-setup-ios/ are peers to lifecycle-macos/ and admin-setup-macos/. Shared troubleshooting directories continue sequential numbering: iOS L1 starts at 16, iOS L2 starts at 14. Shared navigation files receive injected platform sections, not full rewrites. The glossary for iOS terms extends _glossary-macos.md because ABM, ADE, VPP, and APNs already live there.

**Major components:**
1. ios-lifecycle/00-ios-enrollment-paths.md -- single lifecycle file covering all four paths with comparison table; the conceptual anchor for all downstream content
2. admin-setup-ios/ (9 files: overview, ABM/APNs prerequisites, ADE enrollment profile, device enrollment, user enrollment, configuration profiles, app deployment, compliance policy, config failures)
3. decision-trees/07-ios-triage.md + l1-runbooks/16-21 + l2-runbooks/14-17 -- parallel troubleshooting tier mirroring macOS runbook structure
4. Navigation integration -- index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md updated with iOS sections; written last after content is finalized
5. Reference additions -- reference/ios-capability-matrix.md, reference/endpoints.md iOS section, _glossary-macos.md iOS term extensions

**Key pattern -- supervision callout:** Every iOS admin guide section documenting a supervised-only feature uses a blockquote: Supervised only: [Feature] requires supervised mode. Devices enrolled via Device Enrollment or User Enrollment are not supervised. See: ADE Enrollment Profile.

### Critical Pitfalls

1. **Duplicating ABM setup steps from the macOS guide** -- The ABM token creation walkthrough in admin-setup-macos/01-abm-configuration.md is 90% applicable to iOS. iOS admin guides must cross-reference it rather than re-document it. iOS owns enrollment profile creation only.

2. **Collapsing enrollment types to corporate vs BYOD** -- iOS has four to five distinct paths with fundamentally different management scopes. An enrollment type matrix must ship before lifecycle docs are written.

3. **Getting supervision capabilities wrong** -- The supervised/unsupervised capability boundary has shifted across iOS versions (DDM updates, iOS 17). Community blog content is frequently wrong. Every supervised-only claim must be verified against current Microsoft Learn iOS device restriction settings reference.

4. **Treating MAM without enrollment as an MDM subsection** -- MAM-WE is an app-layer management model with no device enrollment, no compliance policy evaluation, and no device wipe capability. MAM-WE must be a standalone lifecycle document.

5. **Platform selector sprawl when adding the third platform** -- iOS gets its own decision tree (07-ios-triage.md) rather than iOS branches embedded in the Windows triage flow. Navigation integration is the final phase.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: iOS/iPadOS Foundation
**Rationale:** The enrollment type matrix and lifecycle document are prerequisites for everything else -- supervision callouts in all downstream guides reference these. Getting this wrong creates rework across all content phases.
**Delivers:** ios-lifecycle/00-ios-enrollment-paths.md (comparison table + four enrollment paths), iOS glossary additions to _glossary-macos.md, _templates/admin-template-ios.md
**Addresses:** ADE lifecycle document, enrollment path overview, supervised vs unsupervised reference
**Avoids:** Pitfall 2 (enrollment type collapse), Pitfall 3 (supervision accuracy), Pitfall 7 (Shared iPad conflation)
**Research flag:** Verify supervision capabilities against current Microsoft Learn iOS device restrictions reference before writing. Use 60-day review_by dates.

### Phase 2: iOS Admin Setup -- ADE Path (Corporate)
**Rationale:** ADE (supervised, corporate-owned) is the primary corporate path. It must come before BYOD guides because supervision callouts in all subsequent guides refer back to the ADE enrollment profile. The ABM/APNs prerequisites guide must come first within this phase.
**Delivers:** admin-setup-ios/00-overview.md, 01-abm-apns-prerequisites.md, 02-ade-enrollment-profile.md
**Addresses:** ADE admin setup, APNs certificate guide
**Avoids:** Pitfall 1 (ABM duplication), Pitfall 5 (Company Portal auth complexity -- all three auth methods with decision matrix), Pitfall 6 (APNs certificate -- renew-not-replace warning)
**Research flag:** ADE enrollment profile UI redesigned Q1 2025; Company Portal auth method removed from dropdown. Verify current UI navigation against Microsoft Learn.

### Phase 3: iOS Admin Setup -- Config, Apps, Compliance (Corporate Path)
**Rationale:** Depends on Phase 2. These three guides can be written in parallel. Configuration profiles guide is highest complexity due to supervised-only callout density (30-40+ settings).
**Delivers:** 05-configuration-profiles.md, 06-app-deployment.md, 07-compliance-policy.md
**Addresses:** Configuration profiles guide, app deployment guide, compliance policy guide
**Avoids:** Pitfall 3 (supervision accuracy -- every claim verified), Pitfall 9 (over-documenting portal steps -- concept-first, no screenshots)
**Research flag:** Software update deferral supervision requirement changed in iOS 17 (DDM). Verify per Microsoft Learn supervised device security configurations reference.

### Phase 4: iOS Admin Setup -- BYOD Paths
**Rationale:** Device Enrollment and User Enrollment have no supervision content and can be written in parallel after Phase 2. These guides must emphasize management limitations. MAM without enrollment is a standalone lifecycle document.
**Delivers:** 03-device-enrollment.md, 04-user-enrollment.md, MAM-WE standalone lifecycle document
**Addresses:** BYOD/User enrollment guide, app protection policies guide (MAM)
**Avoids:** Pitfall 4 (MAM-WE as MDM subsection), Pitfall 8 (profile-based User Enrollment deprecation -- account-driven is current)
**Research flag:** Profile-based User Enrollment deprecated iOS 18; MFA limitations on iOS 15.5 and 15.7-16.3. Verify current account-driven enrollment requirements.

### Phase 5: iOS L1 Triage and Runbooks
**Rationale:** L1 content depends on admin setup content being titled and structured. All six L1 runbooks can be written in parallel after the first establishes the iOS L1 pattern.
**Delivers:** decision-trees/07-ios-triage.md, l1-runbooks/16-21 (6 runbooks)
**Addresses:** L1 decision tree, L1 runbooks
**Avoids:** Pitfall 10 (navigation sprawl -- iOS gets its own triage tree; 00-initial-triage.md gets a single routing branch)

### Phase 6: iOS L2 Investigation Runbooks
**Rationale:** iOS log collection has no equivalent to mdmdiagnosticstool.exe -- it requires Company Portal upload or physical Mac+cable (sysdiagnose). Log collection runbook is prerequisite for all other L2 investigation.
**Delivers:** l2-runbooks/14-17 (4 runbooks: log collection, profile delivery, app install, compliance)
**Addresses:** L2 log collection runbook, L2 investigation runbooks
**Research flag:** Validate sysdiagnose procedure, Console app (Mac+cable) steps, and Company Portal log upload against current Microsoft Learn documentation.

### Phase 7: Navigation Integration and References
**Rationale:** Navigation updates require stable file paths from all content phases. Single pass across all shared navigation files done last avoids repeated updates.
**Delivers:** index.md iOS section, common-issues.md iOS section, quick-ref-l1.md iOS section, quick-ref-l2.md iOS section, runbook index updates, reference/endpoints.md iOS section, reference/ios-capability-matrix.md
**Addresses:** Navigation integration, iOS capability matrix
**Avoids:** Pitfall 10 (platform selector sprawl -- focused injections, not mass rewrites of 116 files)

### Phase Ordering Rationale

- Foundation before content: enrollment type matrix anchors all supervision claims
- ADE before BYOD: supervision callouts in config profiles and app deployment reference ADE enrollment profile
- Admin setup before L1/L2: runbooks link to admin guides; titles and file paths must be stable
- L1 before L2: L2 investigation runbooks reference L1 escalation paths
- Navigation last: requires stable file paths from all content phases

### Research Flags

Needs phase-level research during planning:
- **Phase 2 (ADE Admin Setup):** ADE enrollment profile UI changed Q1 2025; Q2 CY2026 further reorganization anticipated. MEDIUM confidence on UI specifics.
- **Phase 3 (Config/Apps/Compliance):** Software update deferral supervision requirement changed in iOS 17 via DDM. Verify current boundary.
- **Phase 4 (BYOD):** Profile-based User Enrollment deprecated iOS 18; MFA limitations on specific iOS versions. Verify current account-driven enrollment requirements.

Standard patterns (skip research-phase during planning):
- **Phase 1 (Foundation):** Enrollment path comparison stable in Microsoft Learn. Supervision establishment mechanism well-established.
- **Phase 5 (L1 Runbooks):** Follows established macOS runbook pattern; L1 portal steps are stable.
- **Phase 7 (Navigation):** Pure structural integration; follows v1.2 macOS integration precedent exactly.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack (tooling) | HIGH | Unchanged from v1.2; no new infrastructure required |
| Stack (reference sources) | HIGH | All primary sources from Microsoft Learn, verified April 2026 |
| Features (coverage scope) | HIGH | Microsoft Learn enrollment guides define content scope clearly |
| Features (MAM specifics) | HIGH | Microsoft Learn MAM documentation updated 2026-04-15 |
| Architecture (directory structure) | HIGH | Based on direct inspection of existing 116-file docs tree |
| Architecture (build order) | HIGH | Dependencies clear from enrollment path prerequisites |
| Pitfalls (supervision boundaries) | HIGH | Verified against current Microsoft Learn device restrictions reference |
| Pitfalls (deprecation status) | HIGH | Profile-based User Enrollment deprecation confirmed from multiple sources |
| Pitfalls (Q2 CY2026 UI changes) | MEDIUM | Sourced from product blog, not official docs |

**Overall confidence:** HIGH

### Gaps to Address

- **ADE enrollment profile UI (Q2 CY2026 changes):** MEDIUM confidence source. Phase 2 author should verify against live Intune admin center before writing portal navigation steps.
- **DDM and iOS 17 supervision boundary for software updates:** Research confirms the boundary changed but did not enumerate every edge case. Phase 3 author should verify against Microsoft Learn supervised device security configurations reference.
- **Shared iPad Managed Apple ID federation requirements:** Entra ID federation requirement confirmed but specific setup steps not fully enumerated. Verify if Shared iPad is in v1.3 scope.
- **iOS version minimums for account-driven user enrollment:** iOS 15+ confirmed. MFA limitations on iOS 15.5 and 15.7-16.3 documented. Verify at time of writing.

## Sources

### Primary (HIGH confidence)
- Microsoft Learn: iOS/iPadOS enrollment guide -- https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-ios-ipados (updated 2026-04-14)
- Microsoft Learn: ADE setup for iOS/iPadOS -- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios
- Microsoft Learn: iOS/iPadOS deployment guide -- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-ios-ipados (updated 2026-04-15)
- Microsoft Learn: Account-driven user enrollment -- https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-account-driven-user
- Microsoft Learn: Supervised mode -- https://learn.microsoft.com/en-us/intune/device-enrollment/apple/enable-supervised-mode (updated 2026-04-14)
- Microsoft Learn: iOS/iPadOS device restrictions -- https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple
- Microsoft Learn: iOS/iPadOS MAM app protection policy settings -- https://learn.microsoft.com/en-us/intune/app-management/protection/ref-settings-ios (updated 2026-04-15)
- Microsoft Learn: iOS/iPadOS compliance settings -- https://learn.microsoft.com/en-us/mem/intune/device-security/compliance/ref-ios-ipados-settings (updated 2026-04-15)
- Microsoft Learn: Manage Apple VPP/ABM apps -- https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple (updated 2026-04-14)
- Microsoft Learn: Troubleshoot iOS enrollment errors -- https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-ios-enrollment-errors (updated 2025-03-31)
- Microsoft Learn: Apple MDM Push Certificate -- https://learn.microsoft.com/en-us/mem/intune/enrollment/apple-mdm-push-certificate-get (updated 2025-05-12)
- Microsoft Learn: Shared iPad setup -- https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad
- Microsoft Learn: iOS/iPadOS supervised device security configurations -- https://learn.microsoft.com/en-us/intune/intune-service/protect/ios-ipados-supervised-device-security-configurations (updated 2025-09-04)
- Existing docs tree -- direct inspection of 116-file documentation tree (source of truth for naming, numbering, structural patterns)

### Secondary (MEDIUM confidence)
- Microsoft Tech Community: New iOS/iPadOS and macOS ADE enrollment policies experience -- https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531 (product blog, 2025)
- Apple Payload settings reference -- https://support.apple.com/guide/deployment/dep2c1b2a43a/web (supervised-only feature verification)
- M365 Admin community: Plan for Change: Intune ending support for User Enrollment with Company Portal -- consistent with Microsoft Learn, community source

---
*Research completed: 2026-04-16*
*Ready for roadmap: yes*
