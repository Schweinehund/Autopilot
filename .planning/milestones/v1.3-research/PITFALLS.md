# Pitfalls Research

**Domain:** iOS/iPadOS Intune Provisioning Documentation (v1.3 Milestone)
**Researched:** 2026-04-15
**Confidence:** HIGH (Microsoft Learn official docs verified April 2026, multiple enrollment type pages cross-referenced, community-validated issues)

**Scope:** This document covers pitfalls specific to adding iOS/iPadOS provisioning documentation to the existing v1.2 suite that already covers Windows Autopilot (APv1 + APv2) and macOS ADE. It does NOT supersede earlier PITFALLS.md files — those remain valid for their respective milestones. Focus is on iOS/iPadOS-specific documentation mistakes, integration mistakes with the existing suite, and content accuracy traps.

---

## Critical Pitfalls

### Pitfall 1: Treating ABM Configuration as Shared with macOS — Duplicating Instead of Cross-Referencing

**What goes wrong:**
iOS/iPadOS ADE uses the same Apple Business Manager portal and the same Intune enrollment token mechanism as macOS ADE. The existing docs already contain a full ABM configuration guide (`docs/admin-setup-macos/01-abm-configuration.md`) covering token download, MDM server creation, device assignment, and annual renewal. A writer adding iOS admin setup guides duplicates all of this as an "iOS ABM Setup" guide — resulting in two authoritative but slightly divergent ABM guides in the same suite, and two files to maintain when ABM UI changes.

**Why it happens:**
Each new platform guide feels like it needs its own complete setup flow from scratch. The writer knows iOS uses ABM and writes the ABM steps, not realizing the macOS guide already owns them. The distinction between "platform-shared infrastructure" (ABM token, APNs cert) and "platform-specific configuration" (enrollment profiles per device type) is not obvious without checking what exists.

**How to avoid:**
Audit `docs/admin-setup-macos/` before writing any iOS admin setup content. The correct pattern: one guide handles "Add iOS/iPadOS to your existing ABM token" or "Verify your ABM token covers iOS/iPadOS device types" with a cross-reference to the macOS ABM guide for the full token setup. iOS admin guides own enrollment *profile* creation (iOS-specific settings: supervised checkbox, Setup Assistant screens, auth method) — not the ABM token infrastructure. Key distinction confirmed by Microsoft docs: the same ADE token in Intune can serve both iOS and macOS; you create separate enrollment profiles per device type.

**Warning signs:**
- An iOS admin guide draft contains steps for downloading the Intune public key, creating an MDM server in ABM, and uploading a .p7m token
- No cross-reference to the existing macOS ABM guide appears in iOS admin setup content
- Two different "annual token renewal" procedures exist in separate guides

**Phase to address:**
iOS admin setup phases — enforce at doc creation time with a pre-writing checklist item: "Does this content already exist for macOS? Cross-reference instead."

---

### Pitfall 2: Collapsing the Five Enrollment Types into Two ("Corporate" vs "BYOD")

**What goes wrong:**
iOS/iPadOS has a richer enrollment type landscape than Windows or macOS. Microsoft Learn identifies at least five distinct paths: ADE (supervised), Apple Configurator enrollment, Device Enrollment with Company Portal, Account-Driven User Enrollment, and MAM without enrollment. Documentation writers — especially those coming from the Windows Autopilot mental model where there are two modes (APv1 and APv2) — default to a binary "corporate = ADE, personal = Company Portal" framing. This misrepresents User Enrollment (BYOD with a managed work partition, not full device management), omits MAM-WE as a distinct scenario, and fails to distinguish Device Enrollment (full MDM, personal device) from User Enrollment (partial MDM, personal device with privacy protections).

**Why it happens:**
The existing suite's APv1/APv2 distinction pattern tempts writers to find the "two types" of iOS enrollment and document those. macOS has only one enrollment path (ADE), which reinforces the habit of single-path documentation. iOS/iPadOS is fundamentally different: enrollment type determines *what MDM can control*, *what the admin can see*, and *whether supervision is possible* — these are not just UI variations but capability boundaries.

**How to avoid:**
Produce an enrollment type matrix document early (equivalent to the macOS capability matrix) that maps all five enrollment types against: supervision possible, device wipe by admin possible, UDID visible to admin, app inventory visible, silent app install, per-app VPN, LOB apps, Conditional Access support, Shared iPad support. This matrix then anchors all lifecycle, admin setup, and troubleshooting docs. The supervised/unsupervised distinction callout pattern (analogous to the APv1/APv2 inline pattern and proposed `🔒 Supervised only`) must be established before writing any feature docs.

**Warning signs:**
- iOS lifecycle doc has two enrollment sections (corporate and personal) rather than five
- Troubleshooting runbooks do not ask "what enrollment type?" as a triage step
- Admin setup guide covers only ADE (the "corporate" path) with no acknowledgment of BYOD paths

**Phase to address:**
iOS foundation phase (first iOS phase) — enrollment type matrix must ship before lifecycle, troubleshooting, or admin guides.

---

### Pitfall 3: Getting Supervised vs Unsupervised Capabilities Wrong

**What goes wrong:**
Documentation states that a feature "requires supervision" when it does not (or vice versa). This is one of the most common errors in third-party iOS/Intune documentation. Common mistakes confirmed by Microsoft Learn:
- Stating that software updates require supervision (as of iOS 17, DDM-based software updates work on unsupervised enrolled devices too)
- Stating that silent app install requires ADE (true for unsupervised devices in the App Store flow — but VPP apps deploy silently on supervised devices; unsupervised devices prompt for confirmation)
- Overstating what User Enrollment supports (User Enrollment explicitly does NOT support supervision, UDID collection, serial number collection, or device-wide app management)
- Understating post-enrollment supervision change: after enrollment, the ONLY way to enable supervision is factory reset via Apple Configurator — Intune cannot enable supervision on an already-enrolled device

**Why it happens:**
The supervised/unsupervised line has shifted substantially across iOS versions. Content accurate for iOS 14 may be wrong for iOS 17+. Apple has expanded unsupervised capabilities (especially via DDM) while simultaneously deprecating some legacy MDM-based mechanisms. Community blog posts written for older iOS versions remain indexed and are often the first search result.

**How to avoid:**
For every feature documented as "supervised only," verify against the current Microsoft Learn device restrictions reference for iOS (lists which settings require supervision) and Apple's Payload settings reference. The proposed `🔒 Supervised only` callout pattern should only fire for features confirmed as supervised-only in current documentation. Add a `review_by` frontmatter date of 90 days (not 90+ days) for any doc touching supervision boundaries — this is an area of active change.

**Warning signs:**
- A doc states "software updates require supervision" without an iOS version qualifier
- A doc states "app deployment is silent on all enrolled devices" (false for unsupervised Device Enrollment)
- No iOS version qualifiers appear on supervision-related statements

**Phase to address:**
iOS lifecycle phase and iOS admin setup phase — pre-writing verification step against Microsoft Learn iOS device restriction settings page.

---

### Pitfall 4: Treating MAM Without Enrollment as a Subset of MDM Documentation

**What goes wrong:**
MAM without enrollment (MAM-WE) is fundamentally different from MDM enrollment: no enrollment profile, no device compliance policies, no device wipe capability, no serial number visibility, and no silent app installation. It is an app-layer protection model, not a device management model. Documentation that lumps MAM-WE into the "enrollment" lifecycle as a variant of BYOD enrollment — rather than treating it as a separate scenario — causes L1 agents to apply MDM troubleshooting steps (check enrollment status, check device compliance) to devices that are not enrolled and never will be.

Key MAM-WE facts that documentation must get right (verified against Microsoft Learn):
- Requires Intune app protection policies, not enrollment profiles
- On iOS, requires Microsoft Authenticator as broker app (not Company Portal for enrollment)
- Policy conflict risk: by default on iOS, MAM-WE policy takes precedence over MAM+enrollment policy on enrolled devices — requires `IntuneMAMUPN` key to resolve
- LOB apps NOT supported in MAM-WE; if LOB app access is needed, use Account-Driven User Enrollment instead
- No device-level Conditional Access enforcement — CA policies must target approved apps/app protection policies, not device compliance
- MAM-WE scenarios require Entra ID P1 licensing (Conditional Access), not just Intune Plan 1

**Why it happens:**
"MAM" and "MDM" are used interchangeably in many org docs and training materials. Writers see "BYOD + iOS + Intune" and route to enrollment documentation. The macOS docs have no MAM analog (macOS does not have MAM without enrollment in the same sense), so there is no existing pattern to adapt from.

**How to avoid:**
MAM-WE gets its own top-level lifecycle document — not a section within the MDM BYOD lifecycle doc. L1 triage decision tree must include "Is this device enrolled in Intune?" as a branch point before any MDM troubleshooting. MAM-WE troubleshooting runbooks focus on: app protection policy assignment, broker app (Authenticator) installation, Conditional Access targeting app protection policies vs device compliance.

**Warning signs:**
- iOS BYOD lifecycle doc handles MAM-WE in a subsection rather than a separate document
- L1 triage decision tree does not branch on enrollment status
- Troubleshooting runbooks for "user can't access corporate email" start with device enrollment verification regardless of scenario

**Phase to address:**
iOS lifecycle phase — MAM-WE document must be a standalone deliverable, not a subsection of the BYOD enrollment doc.

---

### Pitfall 5: Ignoring the Company Portal App Deployment Complexity for ADE

**What goes wrong:**
For ADE (supervised corporate devices), the relationship between the enrollment profile authentication method and Company Portal app deployment has multiple interdependencies that documentation commonly oversimplifies. Three authentication methods exist: Setup Assistant with modern auth (recommended), Company Portal (legacy-equivalent behavior), and Setup Assistant legacy (not recommended). The Company Portal app is NOT always an authentication mechanism — for "Setup Assistant with modern auth," Company Portal is an optional app that completes Entra ID registration (required for Conditional Access) but is not the enrollment auth mechanism. Docs that say "install Company Portal to enroll" are wrong for this method, and docs that say "Company Portal is not needed" miss that it is required for full Entra ID registration and CA policy compliance.

Additionally confirmed by Microsoft Learn: a significant deprecation occurred — "Company Portal as an authentication method option in the drop-down" was removed from the ADE enrollment policy UI. Documentation still referring to "select Company Portal as the authentication method" in the ADE profile is outdated.

**Why it happens:**
The authentication method has changed multiple times across iOS/Intune product versions. Old documentation from 2022-2023 (still widely indexed) describes Company Portal as the primary authentication mechanism. The macOS ADE docs don't have an equivalent auth-method choice, which means writers have no existing cross-reference pattern to adapt from.

**How to avoid:**
Map the three authentication methods explicitly in the ADE admin setup guide with a decision matrix (when to use which). Flag "Setup Assistant (legacy)" as deprecated/not recommended with a callout, analogous to how APv1 is flagged relative to APv2. Verify Company Portal deployment path (VPP vs no-VPP vs already-enrolled) against current Microsoft Learn before writing setup steps — this is an area with active changes. Use the `last_verified` frontmatter date discipline already established in the suite.

**Warning signs:**
- ADE admin guide says "select Company Portal in the authentication method dropdown" without noting the deprecation
- ADE admin guide does not distinguish Setup Assistant modern auth from Company Portal auth
- No explanation of when Company Portal is required (for Entra ID registration / CA) vs optional (device can be used before CP installs with modern auth)

**Phase to address:**
iOS admin setup phase — ADE enrollment profile guide must cover all three auth methods with current status.

---

### Pitfall 6: Missing the APNs Certificate as a Distinct Prerequisite

**What goes wrong:**
macOS ADE uses an ABM token (ADE token / .p7m) for device assignment, and the macOS ABM guide covers this fully. iOS/iPadOS requires an additional prerequisite that macOS also requires but that the existing macOS docs cover only implicitly: the Apple MDM Push Certificate (APNs cert). Without a valid APNs cert, no iOS or macOS devices can enroll or receive MDM commands. The critical mistake is: renewing APNs by *creating a new certificate* rather than *renewing the existing one*. Creating a new APNs cert requires re-enrolling every existing iOS AND macOS device.

This pitfall is iOS/iPadOS-centric from a documentation standpoint because iOS is being added to an existing tenant that already has macOS enrolled — a broken APNs cert renewal affects all Apple devices simultaneously.

**Why it happens:**
The APNs cert is easy to confuse with the ADE token. Both are annual-renewal Apple credentials. The distinction (renew vs replace) is not obvious from the Apple portal UI. The macOS documentation currently does not prominently feature APNs cert renewal as a maintenance concern — it's implicit in the ABM guide but not called out as a separate operational task.

**How to avoid:**
The iOS admin setup phase should produce an Apple certificate/token overview doc that maps all three Apple credentials (APNs cert, ADE token, VPP token) with renewal cadences and "what breaks if you let it expire or replace it." The APNs cert must explicitly call out: renew the SAME certificate, use the SAME Apple ID that created it, do not upload a replacement cert. This doc cross-references from both the macOS ABM guide and the iOS admin setup overview.

**Warning signs:**
- iOS admin setup guide covers ABM token setup but does not mention APNs cert as a prerequisite
- No operational calendar guidance covers APNs cert annual renewal
- The APNs cert renewal procedure is absent from macOS OR iOS admin docs

**Phase to address:**
iOS admin setup phase (prerequisites section) and cross-reference into the macOS ABM guide.

---

### Pitfall 7: iOS/iPadOS Capability Conflation — Features That Only Exist on iPad

**What goes wrong:**
The suite is titled "iOS/iPadOS" and documentation treats them as a single platform. For most enterprise provisioning scenarios this is correct. However, two significant iPadOS-exclusive features require separate callouts:
- **Shared iPad**: iPadOS only, requires ADE without user affinity, requires Managed Apple ID federation with Entra ID, minimum iPadOS 13.4 with 32 GB storage. NOT available on iPhone or iPod touch.
- **Shared Device Mode** (via MSAL/Entra ID): Available on both iOS and iPadOS, but is the ONLY shared device option for iPhone. Requires apps built with MSAL supporting Shared Device Mode — NOT compatible with standard VPP apps or most LOB apps without code changes.

Writing a "shared device" section that mixes Shared iPad and Shared Device Mode without clearly stating the device type requirements causes admins to configure Shared iPad settings for iPhone rollouts (which fail) or to expect standard apps to work in Shared Device Mode (they don't without MSAL integration).

**Why it happens:**
"iOS/iPadOS" as a combined label obscures that these are different operating systems with different capabilities. The existing Windows docs don't have an equivalent — APv1/APv2 is a feature distinction, not a hardware distinction. macOS has no "shared device" scenario documented.

**How to avoid:**
Shared iPad and Shared Device Mode each get their own document or clearly delineated section with device-type prerequisites prominently at the top. The enrollment type matrix (Pitfall 2) must include a "Shared iPad" row explicitly marked "iPadOS only, ADE without user affinity, Managed Apple ID required." Do not write a combined "shared devices" page that starts with general guidance — the platform split is the first fact.

**Warning signs:**
- A "shared devices" section exists without a device-type prerequisite callout at the top
- Shared iPad setup steps appear in a document titled "iOS/iPadOS shared devices" without noting iPhone incompatibility
- Managed Apple ID federation with Entra ID is absent from Shared iPad prerequisites

**Phase to address:**
iOS lifecycle phase (Shared iPad as a distinct scenario) and iOS admin setup phase (Shared iPad configuration requires Entra federation setup in addition to standard ADE).

---

### Pitfall 8: Profile-Based User Enrollment Deprecation — Documenting a Removed Feature

**What goes wrong:**
Apple deprecated profile-based User Enrollment (enrollment via Company Portal app, BYOD) with iOS 18. Microsoft Intune ended support for new enrollments using this method. Documentation that covers "User Enrollment with Company Portal" as a current BYOD option is documenting a deprecated enrollment path for new enrollments. The current path is Account-Driven User Enrollment (Settings app > VPN & Device Management > add work account), which has different prerequisites, a different user flow, and different minimum OS requirements (iOS/iPadOS 15+).

The deprecation also has version-specific MFA complications: devices running iOS 15.5 cannot enroll with account-driven user enrollment if MFA is via text/call on the same device during enrollment. Devices running iOS 15.7–16.3 cannot use MFA via text during account-driven enrollment (phone call required).

**Why it happens:**
The deprecation is recent (iOS 18, 2024). Community blog posts and Microsoft docs from before iOS 18 describe profile-based enrollment as current. An existing iOS doc written in 2023 would be entirely accurate then and wrong now. The suite's 90-day review cycle helps but only if the initial doc is flagged for review.

**How to avoid:**
iOS BYOD lifecycle doc must lead with Account-Driven User Enrollment as the current method. Profile-based User Enrollment with Company Portal appears only in a "deprecated / migration path" note for orgs with existing enrolled devices. The `review_by` frontmatter on all User Enrollment docs should be set to 60 days (not 90) given the pace of change in this area. Include MFA limitation callouts for iOS 15.5 and 15.7–16.3.

**Warning signs:**
- iOS BYOD doc instructs users to "open the Company Portal app and follow prompts to enroll" as the primary BYOD enrollment method
- No distinction between account-driven (current) and profile-based (deprecated) user enrollment
- No iOS version minimum (15+) stated for account-driven enrollment

**Phase to address:**
iOS lifecycle phase — BYOD section must accurately represent current vs deprecated enrollment methods.

---

### Pitfall 9: Over-Documenting Intune Portal Steps That Change Frequently

**What goes wrong:**
The existing suite already uses step-by-step portal navigation (e.g., "Navigate to Devices > Enrollment > Apple > Enrollment program tokens > Add"). This pattern works for stable flows. iOS admin setup in Intune has been in active change: the ADE enrollment policy UI was redesigned in 2025 (new enrollment policies experience, Company Portal auth method removed from dropdown), and the MAM-WE setup flows in Intune admin center have also shifted. A doc written for the old ADE UI with screenshots or navigation paths that no longer match creates immediate L1 confusion and generates tickets.

**Why it happens:**
Step-by-step portal navigation feels authoritative and complete. The macOS admin guides use this pattern successfully. The risk is that iOS/iPadOS Intune UI is changing faster than macOS UI due to active feature development (DDM rollout, enrollment policy redesign, User Enrollment changes).

**How to avoid:**
For iOS/iPadOS specifically, prefer documenting *outcomes and concepts* with portal steps as supporting detail rather than the primary content. Example: instead of "Navigate to X > Y > Z and select the Authentication Method dropdown," write "Choose an authentication method for ADE enrollment (Setup Assistant with modern auth is recommended) — the enrollment profile wizard in Intune admin center presents this as a required field." Portal steps should be accurate at time of writing but flagged with a shorter review cycle. Do not include UI screenshots in iOS admin guides — they become wrong faster than screenshots in Windows docs. The `last_verified` and `review_by` frontmatter discipline already in the suite is critical here; use 60-day review cycles for iOS admin setup guides.

**Warning signs:**
- iOS admin setup guide contains detailed numbered steps with exact portal navigation strings and no `review_by` date
- iOS admin guide references "select Company Portal in the Authentication Method dropdown" (this option has been removed)
- iOS admin guide includes screenshots of the enrollment profile wizard

**Phase to address:**
iOS admin setup phase — enforce shorter review cycles and concept-first writing for iOS portal steps.

---

### Pitfall 10: Platform Selector and Navigation Sprawl When Adding a Third Platform

**What goes wrong:**
Adding iOS/iPadOS as a third platform to an existing two-platform suite (Windows + macOS) creates exponential navigation complexity if handled incorrectly. Specific failure modes:
- Every cross-platform page (common-issues.md, quick-ref-l1.md, quick-ref-l2.md, windows-vs-macos.md) must grow a third column or section, and if each grows independently, readers lose the ability to compare all three platforms at a glance
- The existing "platform selector" pattern (frontmatter `platform:` field, platform gate callout blocks) was designed for two values; adding a third value to every existing doc as a retroactive edit touches 116 files unnecessarily
- The L1 triage decision tree (`decision-trees/00-initial-triage.md`) must route iOS/iPadOS without duplicating the entire tree — a third separate tree increases the maintenance burden while a merged tree becomes too complex for L1 to follow
- Navigation hub (index.md) role-based entry points must add iOS without making the hub page unmanageable

**Why it happens:**
The v1.2 macOS addition established patterns for adding a second platform. Adding a third platform exposes that those patterns assumed two values. The frontmatter `platform: macOS` / `platform: Windows` pattern works cleanly for binary routing but does not scale to three without a plan.

**How to avoid:**
Follow the same principle used in v1.2: platform frontmatter defaults to existing values, new iOS docs carry `platform: iOS`, and cross-platform foundation files (index, quick-ref cards, common-issues) get focused additions rather than full rewrites. The windows-vs-macos comparison becomes a platform comparison index pointing to dedicated comparison pages. iOS/iPadOS should get its own decision tree (like macOS got `06-macos-triage.md`) rather than extending the existing Windows tree. The platform selector callout blocks should use a consistent three-platform format established once in a template and reused — not invented per-doc.

**Warning signs:**
- Draft iOS docs attempt to modify existing Windows or macOS docs to add iOS sections (editing 116 files)
- No iOS-specific entry point exists in the navigation hub; iOS content is appended to macOS sections
- The L1 initial triage decision tree has iOS/iPadOS branches embedded within the Windows flow rather than branching early to an iOS-specific tree

**Phase to address:**
iOS cross-platform navigation phase (last iOS phase, following lifecycle and admin content) — same sequencing strategy as v1.2 Phase 25 for macOS navigation integration.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term maintenance problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single "iOS/iPadOS Enrollment" lifecycle doc covering all five enrollment types | Fewer files to write | Becomes unnavigable; readers cannot find their enrollment type; L1 cannot triage without knowing enrollment type | Never — use an enrollment type matrix + separate lifecycle paths |
| Reuse macOS ABM guide for iOS ABM setup without modification | Saves writing the token setup steps again | Two platforms cite the same doc without iOS-specific additions; iOS-specific nuances (enrollment profile settings, supervised checkbox) get lost | Acceptable if the cross-reference is explicit and iOS-specific enrollment profile creation is its own doc |
| Copy-paste supervised capabilities list from a community blog | Faster than researching Microsoft Learn | Community blogs are often outdated on supervision boundaries; post-iOS 16/17 changes are frequently wrong in blog content | Never for the supervision boundary — verify against current Microsoft Learn iOS device restriction settings reference |
| Bundle MAM-WE into the BYOD enrollment lifecycle doc | Fewer files | L1 applies MDM troubleshooting to MAM-WE scenarios; admins misconfigure Conditional Access | Never — MAM-WE must be a standalone scenario |
| 90-day review cycles for all iOS docs | Consistent with macOS pattern | iOS/iPadOS Intune changes faster than macOS; 90-day cycles miss breaking changes in User Enrollment and DDM | Acceptable for structural/conceptual docs; use 60-day for enrollment-type-specific and portal-step docs |

---

## Integration Gotchas

Common mistakes when connecting iOS/iPadOS documentation to the existing suite.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| ABM token setup | Writing a new ABM guide that duplicates `admin-setup-macos/01-abm-configuration.md` | Cross-reference the macOS ABM guide for token setup; iOS admin guide owns enrollment profile creation only |
| APNs certificate | Treating APNs as an implicit prerequisite (already handled for macOS) | Create an Apple credentials overview doc; make APNs renewal procedure explicit and prominent |
| windows-vs-macos.md comparison | Adding iOS as a third column to the existing table | Create an `ios-vs-macos.md` or rename to a platform comparison index; two-column tables do not extend cleanly to three |
| L1 triage tree | Adding iOS branches into `00-initial-triage.md` | Add `07-ios-triage.md` as a parallel tree; `00-initial-triage.md` gets a single iOS routing branch to the new tree |
| Quick-ref cards (quick-ref-l1.md, quick-ref-l2.md) | Adding iOS columns in-line with Windows/macOS | Add dedicated iOS card sections following the macOS pattern established in v1.2 |
| Glossary | Adding iOS terms to the existing `_glossary.md` | Add `_glossary-ios.md` (follows `_glossary-macos.md` precedent); cross-reference from main glossary |
| MAM-WE | Adding MAM-WE as a section in the BYOD lifecycle doc | MAM-WE is a standalone lifecycle document and standalone L1 runbooks |
| User Enrollment | Documenting profile-based (deprecated) and account-driven as co-equal options | Account-driven is current; profile-based gets a migration/deprecated note only |

---

## Performance Traps

*Not applicable in the documentation context — performance traps are a software development concern. The equivalent for documentation is "scale" pitfalls, covered above under navigation sprawl (Pitfall 10).*

---

## Accuracy Traps

iOS/iPadOS-specific documentation accuracy issues that degrade at scale (more docs = more drift).

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Supervision boundary drift | Docs contradict each other on what requires supervision | Canonical supervision table in enrollment type matrix, all supervision claims cite the matrix | When a new iOS version expands unsupervised capabilities (iOS 17 DDM updates, future releases) |
| Enrollment type capability drift | Feature availability claims differ between lifecycle and troubleshooting docs | Single source of truth (enrollment type matrix) for all capability claims | When a doc is written without checking the matrix |
| Authentication method deprecation | Doc still describes Company Portal auth method dropdown in ADE profile | `last_verified` frontmatter + explicit deprecated callout block | Immediately — already deprecated in 2025 |
| Profile-based User Enrollment | BYOD doc describes Company Portal enrollment as current method | `review_by` set to 60 days; deprecated callout at top | iOS 18 rollout — already deprecated |

---

## "Looks Done But Isn't" Checklist

Items that appear complete in an iOS/iPadOS documentation phase but are missing critical pieces.

- [ ] **Enrollment type matrix:** Often missing User Enrollment and MAM-WE rows — verify all five enrollment types are represented: ADE, Apple Configurator, Device Enrollment, Account-Driven User Enrollment, MAM-WE
- [ ] **Supervised only callouts:** Often missing the supervision requirement for specific features — verify `🔒 Supervised only` appears on: activation lock bypass, single-app kiosk (guided access), web content filtering (supervised), lost mode, global HTTP proxy
- [ ] **APNs certificate prerequisite:** Often missing from iOS admin setup overview — verify an APNs cert prerequisite callout appears before ADE enrollment profile creation steps
- [ ] **MAM-WE as standalone:** Often treated as a BYOD subsection — verify MAM-WE has its own lifecycle document, not a heading within another doc
- [ ] **Shared iPad vs Shared Device Mode:** Often conflated — verify each has distinct documentation with device-type prerequisites (iPad only vs iPhone/iPad) at the top
- [ ] **User Enrollment deprecation status:** Often missing — verify profile-based User Enrollment (Company Portal) is flagged as deprecated for new enrollments; account-driven is presented as current
- [ ] **Cross-references to macOS ABM guide:** Often missing from iOS admin setup — verify iOS ADE admin guide cross-references `admin-setup-macos/01-abm-configuration.md` for token setup
- [ ] **iOS platform triage tree:** Often not created — verify `decision-trees/07-ios-triage.md` (or equivalent) exists and `00-initial-triage.md` routes iOS to it
- [ ] **Review cycles set:** Often defaulted to 90 days — verify iOS admin setup and User Enrollment docs use 60-day `review_by` dates

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Duplicate ABM guide published | LOW | Deprecate the iOS ABM guide; add a redirect notice and cross-reference to the macOS ABM guide; add iOS-specific enrollment profile steps to macOS guide or a new "adding iOS to existing ABM" doc |
| Wrong supervision boundaries in docs | MEDIUM | Audit all iOS docs for "supervised only" claims against current Microsoft Learn device restriction reference; add `last_verified` dates; flag for 60-day re-review |
| MAM-WE buried in BYOD enrollment doc | MEDIUM | Extract MAM-WE content into a new standalone doc; rewrite BYOD enrollment doc without MAM-WE sections; update L1 triage tree to branch on enrollment status |
| Profile-based User Enrollment documented as current | LOW | Add deprecated callout block at top of BYOD enrollment doc; update to present account-driven enrollment as the current path; keep profile-based content in a "migration" section |
| Navigation sprawl in index and quick-ref | HIGH | Refactor navigation hub using the platform comparison index approach; create `07-ios-triage.md` as a separate tree; this is a multi-file edit requiring cross-reference validation |
| APNs cert renewal mistake in production | HIGH (operational, not doc) | Doc prevention: ensure APNs renewal procedure explicitly says "renew, do not create new" before this happens |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| ABM duplication (Pitfall 1) | iOS admin setup phase — pre-writing audit | Confirm iOS ADE admin guide has cross-reference to macOS ABM guide and no token setup steps |
| Enrollment type collapse (Pitfall 2) | iOS foundation phase — enrollment matrix | Confirm enrollment type matrix covers all five types before lifecycle docs are written |
| Supervised/unsupervised inaccuracy (Pitfall 3) | iOS foundation phase + iOS lifecycle phase | Confirm supervised-only claims are verified against Microsoft Learn iOS device restriction settings reference |
| MAM-WE as BYOD subsection (Pitfall 4) | iOS lifecycle phase — MAM-WE as standalone doc | Confirm MAM-WE has its own lifecycle document file |
| Company Portal / ADE auth complexity (Pitfall 5) | iOS admin setup phase — ADE enrollment profile guide | Confirm three auth methods documented with decision matrix and deprecated callouts |
| APNs cert missing (Pitfall 6) | iOS admin setup phase — prerequisites section | Confirm APNs cert appears in iOS admin setup overview and cross-references macOS ABM guide |
| iOS/iPadOS conflation — Shared iPad (Pitfall 7) | iOS lifecycle phase — shared device scenarios | Confirm Shared iPad and Shared Device Mode are separate sections with device-type prerequisites at top |
| Profile-based User Enrollment deprecation (Pitfall 8) | iOS lifecycle phase — BYOD enrollment doc | Confirm account-driven is presented as current; profile-based flagged deprecated for new enrollments |
| Over-documented portal steps (Pitfall 9) | iOS admin setup phase — writing standards | Confirm all iOS admin setup docs have `review_by` dates ≤ 60 days; no UI screenshots included |
| Platform selector / navigation sprawl (Pitfall 10) | iOS cross-platform navigation phase (final iOS phase) | Confirm iOS triage tree exists; index.md has iOS entry point; no existing docs required mass edits |

---

## Sources

- [iOS/iPadOS device enrollment guide for Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-ios-ipados) — Microsoft Learn, verified April 2026
- [Turn on iOS/iPadOS supervised mode with Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-supervised-mode) — Microsoft Learn, verified April 2026
- [Overview of Apple User Enrollment in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/ios-user-enrollment-supported-actions) — Microsoft Learn, verified April 2026
- [Mobile Application Management (MAM) for unenrolled devices](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-mamwe) — Microsoft Learn, verified April 2026
- [Shared iOS and iPadOS devices - Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-device-solutions-ios) — Microsoft Learn, verified April 2026
- [Set up automated device enrollment (ADE) for iOS/iPadOS](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios) — Microsoft Learn
- [Intune and the APNs certificate: FAQ and common issues](https://techcommunity.microsoft.com/blog/intunecustomersuccess/intune-and-the-apns-certificate-faq-and-common-issues/280121) — Microsoft Tech Community
- [New iOS/iPadOS and macOS ADE enrollment policies experience](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531) — Microsoft Tech Community, 2025
- [Plan for Change: Microsoft Intune ending support for User Enrollment with Company Portal](https://m365admin.handsontek.net/plan-for-change-microsoft-intune-ending-support-for-user-enrollment-with-company-portal-for-iosipados/) — M365 Admin (MEDIUM confidence — community source, consistent with Microsoft Learn)
- Apple Payload settings reference — [https://support.apple.com/guide/deployment/dep2c1b2a43a/web](https://support.apple.com/guide/deployment/dep2c1b2a43a/web) — for supervised-only feature verification

---
*Pitfalls research for: iOS/iPadOS Intune Provisioning Documentation (v1.3 milestone)*
*Researched: 2026-04-15*
