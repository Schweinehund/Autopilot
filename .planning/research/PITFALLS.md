# Pitfalls Research

**Domain:** Android Enterprise enrollment documentation in a multi-platform Intune documentation suite
**Researched:** 2026-04-19
**Confidence:** HIGH (Microsoft Learn, Google Android Enterprise Help, Jason Bayton) / MEDIUM (community verified) where noted

---

## Critical Pitfalls

### Pitfall 1: Technical Accuracy Decay — Android Ecosystem Moves Faster Than Docs

**What goes wrong:**
Documentation written against Android 11 behavior silently breaks on Android 13/14/15 deployments. Unlike iOS (Apple controls hardware + OS), Android has OEM firmware variations, Google Platform Updates (mainline), and annual OS drops that each shift enterprise behavior. Concrete examples: NFC provisioning lost COPE support on Android 11+; FRP hardening in Android 15 broke Zero-Touch re-enrollment flows that worked on Android 13/14; SafetyNet deprecated January 2025, replaced by Play Integrity API (Intune compliance UI now says "Play Integrity Verdict" not "SafetyNet"); `PROVISIONING_LOGO_URI` fully deprecated in Android 13.

**Why it happens:**
Writers source from MS Learn Android docs, which demonstrably lag Google's own Android Enterprise Help center and Jason Bayton's version-specific release posts by 6-18 months. A page last verified against Android 11 will be cited confidently but describe wrong behavior for Android 14 fleets.

**How to avoid:**
- Every behavior assertion in COBO/dedicated/BYOD docs must be version-tagged: "Applies to Android 8.0+" or "Changed in Android 11."
- Create a v1.4 Android Version Fragmentation Matrix as a first-class deliverable (in scope per PROJECT.md). Surface minimum OS per mode: BYOD work profile (5.1+), COBO fully managed (8.0+), COPE corporate work profile (8.0+, revised behavior 11+), dedicated (8.0+), AOSP (10.0+, RealWear only at GA).
- Apply confidence attribution to version-specific claims: HIGH = Google AE Help / MS Learn current; MEDIUM = community-verified blog; LOW = inferred from changelog.
- Add `last_verified` + `review_by` frontmatter to every Android doc, with Android version listed (same pattern used for iOS docs in v1.3).
- Source hierarchy for Android: Google Android Enterprise Help (`support.google.com/work/android`) > MS Learn (`learn.microsoft.com/intune`) > Jason Bayton (`bayton.org/android`) > community blogs. Flag any claim sourced only from MS Learn without corroboration from Google's AE Help.

**Warning signs:**
- A doc describes NFC provisioning without noting the Android 11 COPE restriction.
- SafetyNet mentioned in a compliance policy section (deprecated January 2025).
- FRP described without Android 15 enforcement change.
- Zero-Touch min version stated as "Android 8.0+" without noting the Pixel 7.1 exception.
- Any description of enrollment token expiry as "90 days max" (changed to 65 years for BYOD/COBO; dedicated token still had 90-day historical behavior but was extended December 2022).

**Phase to address:**
Android Version Fragmentation Matrix phase (prerequisite, early roadmap). Every mode-specific content phase must reference the matrix. A `last_verified` frontmatter scan in the milestone audit phase catches drift.

---

### Pitfall 2: Managed Google Play Binding Treated as Optional Footnote

**What goes wrong:**
The MGP binding is the foundational prerequisite for all Android Enterprise modes except AOSP. If the binding is done incorrectly (wrong account type, binding to G-Suite/Google Workspace account instead of Microsoft Entra account or standard consumer Google account, or binding via `intune.microsoft.com` instead of `endpoint.microsoft.com`), every downstream enrollment, app deployment, and policy flow fails silently or with opaque errors. Disconnecting the binding invalidates all app assignments and LOB app availability instantly; re-binding requires re-assigning every app and configuration.

**Why it happens:**
Admins familiar with iOS (APNs certificate: one step, one portal) underestimate the MGP binding. It looks like a one-screen step in Intune but ties a specific Google account to the tenant permanently. Documentation often covers it in a paragraph; the "what breaks if wrong" consequences are scattered across troubleshooting KB articles.

**How to avoid:**
- The tri-portal admin template (Intune + Managed Google Play + Zero-Touch portal) must be designed before any mode-specific admin doc is written. The template is the v1.4 analog of the iOS APNs + ABM/ADE token prerequisite pattern from v1.3 Phase 27.
- The MGP binding doc must include: account type requirements (Microsoft Entra account preferred since August 2024; consumer Gmail works; Google Workspace/G-Suite does NOT); the `endpoint.microsoft.com` portal requirement (not `intune.microsoft.com`); binding permanence (the Google account is associated with all Android management tasks for the tenant and cannot be changed without disconnecting); disconnect consequences (all LOB apps, store app assignments, OEMConfig assignments lost — must be reapplied).
- Include a "What Breaks" callout table at binding setup: Row per failure mode (wrong account type, using Workspace account, binding in wrong portal, disconnecting binding).

**Warning signs:**
- Any admin doc that says "connect to Managed Google Play" without stating which account type is required.
- No callout about the `endpoint.microsoft.com` vs `intune.microsoft.com` portal distinction.
- No warning about binding permanence and disconnect consequences.

**Phase to address:**
Prerequisite/tri-portal template phase (must ship before any mode-specific admin content phase).

---

### Pitfall 3: Cross-Platform Terminology Collision

**What goes wrong:**
Multiple terms mean different things across platforms already in this suite. Writing Android docs without explicit disambiguation will cause readers to apply the wrong mental model:

| Term | iOS/macOS meaning in this suite | Android meaning |
|------|---------------------------------|-----------------|
| Work Profile | Not used (no direct iOS equivalent; closest is User Enrollment) | Android's BYOD partition mechanism — a specific technical construct |
| Supervision | iOS: deep-management state enabled at ADE enrollment, gates 60+ policies | Android: no direct analog; "fully managed" is the closest concept, but it is not called supervision anywhere in AE |
| User Enrollment | iOS: account-driven enrollment for personal devices (specific Apple flow) | Android: "user-associated" AOSP mode (completely unrelated concept) |
| Dedicated | iOS: Shared iPad (multi-user shared device) | Android: COSU/kiosk, single-purpose device (single or no user) |
| Enrollment | Used broadly for Windows/macOS/iOS in this suite | Android uses both "enrollment" (Intune term) and "provisioning" (Google term) for the same process |
| Corporate Identifiers | Windows/Intune: serial/manufacturer/model for corporate marking at enrollment | Android: IMEI/serial upload to mark BYOD work profile devices as corporate — works for BYOD marking but CANNOT be used to restrict corporate fully-managed enrollment to specific devices |

The existing `_glossary.md` has no Android terms. `_glossary-macos.md` already contains a cross-reference note: "Microsoft's 'Work profile on personally-owned devices' concept applies to Android but has no iOS-Autopilot equivalent" — this note needs to remain accurate when the Android glossary is created.

**Why it happens:**
Platform-convergent terminology is natural (all platforms "enroll," all have "profiles") but the underlying mechanisms differ fundamentally. Writers reuse existing glossary terms by analogy rather than checking whether the term maps accurately.

**How to avoid:**
- Create a dedicated Android Enterprise Glossary file (`_glossary-android.md`) modeled on `_glossary-macos.md`. Do NOT add Android terms to `_glossary.md` or `_glossary-macos.md` (those are scoped files).
- The glossary must include explicit disambiguation notes for every collision term, with cross-references to the iOS/macOS meaning.
- Every Android doc must use Google's canonical terminology: "fully managed" (not COBO), "corporate-owned work profile" (not COPE, but acknowledge COPE as legacy alias), "dedicated" (not COSU, but acknowledge), "personally-owned work profile" (not "BYOD work profile" without clarification).
- Add a terminology disambiguation section to the Android enrollment path overview doc — same as the iOS supervision axis in v1.3 Phase 26.

**Warning signs:**
- Android doc says "supervised" when describing fully managed devices.
- Glossary entry for "Work Profile" that does not explicitly note it is Android-specific and different from iOS.
- Android doc describes "User Enrollment" in a way that could be confused with Apple's account-driven User Enrollment.
- "Dedicated" used without specifying "Android dedicated (kiosk/COSU)" vs. platform-generic use.

**Phase to address:**
Android glossary must be Phase 1 of the content roadmap (parallel to or part of the overview/prerequisite phase). Disambiguation table in enrollment path overview doc.

---

### Pitfall 4: Zero-Touch Reseller Lock-In Not Upfront-Documented

**What goes wrong:**
Documentation that describes Zero-Touch enrollment without leading with the reseller requirement causes admins to start configuration work only to discover mid-deployment that their device stock is ineligible. Zero-Touch requires devices be purchased from a Google-authorized Zero-Touch reseller and registered in the portal by that reseller. Post-hoc self-registration is not possible (unlike Samsung KME, which allows self-registration by IMEI). Devices deregistered from Zero-Touch cannot be re-registered without reseller involvement.

Additional Zero-Touch gotchas that documentation must surface:
- Configuration must be explicitly assigned as default or to specific devices; a configuration created but not assigned will not be applied.
- Dual-SIM devices: only IMEI 1 (modem 1) is recognized; enrolling via IMEI 2 creates an unrecognized phantom device record.
- Network dependency: Zero-Touch will not initiate without internet access at first boot; if the device connects to a captive-portal network or a network without Google service access, enrollment silently falls through to normal consumer setup.
- Single org-to-account link: an org can only link to one Zero-Touch account; account unlinking while org exists makes the account unrecoverable.
- Samsung devices enrolled in both Zero-Touch and KME are officially unsupported by Google — configurations can go out of sync and the failure mode is hard to diagnose.

**Why it happens:**
Zero-Touch is the "Android ADE equivalent" in documentation shorthand, and ADE has no reseller requirement (any device enrolled in ABM works). Writers unfamiliar with the distinction bury or omit the reseller prerequisite.

**How to avoid:**
- The Zero-Touch admin doc must open with a prerequisites callout box: "Devices must be purchased from an authorized Zero-Touch reseller. Self-registration of existing stock is not supported."
- Include a reseller eligibility check as Step 0 in the Zero-Touch setup guide.
- Add a "What Breaks" callout for the dual-SIM IMEI gotcha, network dependency, and the KME+ZT mutual exclusion.
- Distinguish KME self-registration capability from Zero-Touch in a comparison note (KME supports self-registration but is Samsung-only and deferred to v1.4.1).

**Warning signs:**
- Zero-Touch guide that doesn't mention reseller requirement until the portal setup steps.
- No distinction between Zero-Touch (reseller-gated) and KME (self-registration capable).
- No callout about the dual-SIM IMEI 1 requirement.

**Phase to address:**
Zero-Touch admin content phase. The prerequisite/overview phase should include a provisioning method axis matrix that surfaces the reseller requirement prominently.

---

### Pitfall 5: Provisioning Method Misrouting Creates Dead-End Enrollments

**What goes wrong:**
Android corporate enrollment has four provisioning methods (NFC, QR code, DPC identifier/afw#setup, Zero-Touch) that are NOT interchangeable. Using the wrong method creates an incomplete or broken enrollment state:
- NFC: requires a "provisioning device" with a compatible NFC app (not a typical Android phone); lost COPE support on Android 11+; uses NFC tags not device-to-device bump (Android Beam removed Android 10, fully removed Android 14). Payload size limit (NTAG216: 888 bytes) means Wi-Fi credentials + DPC extras may exceed capacity.
- QR code: requires internet BEFORE scanning on Android 7.0–8.x (no built-in reader); Android 9+ has built-in reader. Wi-Fi credentials embedded in QR payloads are plain-text — the QR code itself is a sensitive artifact. QR codes embedded in documentation screenshots expire or become stale.
- DPC identifier (afw#setup): intended as last-resort fallback, not primary method. System apps are disabled by default during this provisioning path, leading to broken device state if the EMM does not explicitly re-enable required system apps. Documentation rarely flags this.
- All corporate methods require factory-reset state (dedicated, COBO, COPE). Misunderstanding this causes support calls from users who try to enroll pre-used devices.
- AMAPI (Google's Android Management API) does not support pulling managed properties from app tracks (April 2025 Jason Bayton confirmed limitation) — this affects Managed Config documentation.

**Why it happens:**
iOS documentation in this suite uses a single provisioning path for corporate devices (ADE = one method). Android's four-method complexity has no iOS analog. Documentation writers default to the "easiest to explain" method (QR) without surfacing the method-selection decision criteria.

**How to avoid:**
- Build a provisioning method axis matrix as a first-class deliverable in the Android enrollment path overview (mirroring the iOS supervision axis from v1.3 Phase 26). Matrix rows: NFC, QR, afw#setup, Zero-Touch. Matrix columns: modes supported, Android version min, factory reset required, prerequisites, failure modes.
- Each mode-specific admin doc (COBO, dedicated, COPE-note) must state which provisioning methods apply and which are contraindicated.
- Add per-method "What Breaks" callouts: QR sensitive artifact note; afw#setup system app state note; NFC COPE restriction.
- Never embed actual QR code images in documentation — document the process for generating them, not an example.

**Warning signs:**
- A COBO admin doc that describes "the" provisioning method without showing all four options.
- QR code example image in documentation.
- afw#setup described as equally valid first-choice method without the system-app caveat.
- NFC guide that doesn't note the COPE restriction on Android 11+.

**Phase to address:**
Enrollment path overview phase (provisioning method axis matrix). Mode-specific admin content phases each include per-method callouts.

---

### Pitfall 6: BYOD Work Profile Tier Inversion — L1 Runbook Format Does Not Fit

**What goes wrong:**
The v1.0–v1.3 L1 runbook pattern is admin-portal-first: L1 executes Intune admin center steps to diagnose and remediate. For Android BYOD work profile, enrollment is initiated by the end-user on their personal device via Company Portal from Google Play. The admin has no equivalent of Windows hardware hash upload, iOS ADE enrollment profile assignment, or macOS ABM token. L1 cannot "fix" a BYOD enrollment from the admin portal alone — the end-user must take action. Writing a standard L1 runbook for BYOD work profile produces either an unusable script or a document that instructs L1 to do things they cannot do.

**Why it happens:**
The L1 runbook template from v1.0 was designed for corporate enrollment paths where the admin controls device state. BYOD work profile is fundamentally user-initiated; the admin's role is to ensure the policy side is correct and guide the user. This was recognized in v1.4 scope decisions (STATE.md: "BYOD Work Profile L1 content reframed as end-user self-service guide — tier-inversion acknowledged") but the format implication needs to carry through to every content phase that touches BYOD.

**How to avoid:**
- Replace the standard L1 runbook template with an End-User Self-Service Guide template for BYOD Work Profile content: format is user-facing steps (screenshots, plain language), with an admin sidebar for the policy-side checks L1 CAN do (verify enrollment restrictions, verify Company Portal app assignment, verify compliance policy assignment).
- The BYOD admin doc covers the admin-side prerequisite (enabling personally-owned work profile, assigning Company Portal via MGP, creating enrollment restrictions). The L1 doc covers what to tell end users and what L1 checks in the portal.
- L2 covers investigation when BYOD enrollment is failing at scale (enrollment restriction conflicts, MGP app availability issues, compliance policy misconfiguration).
- Privacy and legal boilerplate for BYOD: Document that personally-owned work profile only allows management of the work profile; IT cannot see personal apps, personal data, or device location outside work profile. This is a documented privacy boundary — not optional.

**Warning signs:**
- BYOD Work Profile doc that uses the standard L1 runbook template with "Step 1: Navigate to Intune admin center > Devices."
- No end-user-facing content for BYOD path.
- Privacy limitation callouts absent from BYOD documentation.
- BYOD L1 runbook that lacks the "what L1 cannot do" actor-boundary section.

**Phase to address:**
BYOD Work Profile content phase. The Phase PLAN must explicitly note the template deviation from standard L1 runbook format.

---

### Pitfall 7: Dedicated Device Audience Mismatch

**What goes wrong:**
Dedicated device (kiosk/COSU) documentation is consumed primarily by retail operations managers, field service leads, and line-of-business app owners — not MDM admins. These personas are comfortable with "lock this tablet to one app" but are unfamiliar with Intune enrollment profile concepts, lock task mode, OEMConfig, or the difference between single-app and multi-app kiosk mode. Writing dedicated device docs at the MDM-admin expertise level creates a document that these stakeholders cannot use independently and that escalates unnecessarily to Level 2.

AOSP device management (RealWear headsets, purpose-built XR devices) has an even more specialized audience (field operations, AR/VR deployment teams) that falls outside the typical L1 service desk scope entirely. AOSP enrollment is also one-device-at-a-time at GA — no bulk enrollment support — which is a critical operational constraint for warehouse or field rollouts.

**Why it happens:**
v1.0–v1.3 assumed three audiences (L1 service desk, L2 desktop engineering, Intune admin) that map cleanly to Windows/macOS/iOS corporate enrollment. Dedicated devices add a fourth implicit audience (line-of-business operations) that the existing tier structure does not accommodate.

**How to avoid:**
- Dedicated device admin doc should open with a persona callout: "Audience: Intune Admin + Line-of-Business Operations Owner. The operations owner defines the locked app(s); the Intune admin configures the enrollment and kiosk policy."
- Include a scenario-based overview section: "Single-app kiosk (e.g., warehouse barcode scanner)", "Multi-app kiosk (e.g., retail self-service tablet)", "Digital signage (userless)" — with matching Intune kiosk mode selection.
- AOSP stub doc must explicitly state: "One-device-at-a-time enrollment only (no bulk enrollment at GA). Supported OEMs at GA: RealWear devices running Android 10.0+. Other OEMs (Zebra, Pico, HTC VIVE Focus) are not supported under AOSP management in Intune — use Android Enterprise fully managed instead if GMS is present."
- Do not write a standard L1 runbook for dedicated devices; the L1 triage tree should route kiosk failures to L2 (policy investigation) or the LOB operations owner (app-side issue).

**Warning signs:**
- Dedicated device doc that jumps directly to Intune admin center steps without a scenario overview.
- AOSP doc that implies multiple devices can be enrolled simultaneously.
- L1 runbook that tries to cover kiosk lock task mode failures (outside L1 scope).

**Phase to address:**
Dedicated/kiosk content phase and AOSP stub phase. Audience callout must be in the Phase PLAN, not added retroactively.

---

### Pitfall 8: AMAPI Migration Breaking Existing Policy Configurations

**What goes wrong:**
Microsoft migrated Android personally-owned work profile management to AMAPI (Android Management API) in 2025. This broke existing custom configuration policies for BYOD work profile (April 2025 end of support). It also changes the user-facing management app from Company Portal to the Microsoft Intune app + Android Device Policy. Wi-Fi policies using username/password authentication broke at migration; certificate-based Wi-Fi is now required. Tenants still on the legacy custom DPC implementation will be automatically migrated with advance notice — but documentation written before this migration describes a different device management app and different policy behavior.

**Why it happens:**
Google's platform-level shift from custom DPCs to AMAPI is a fundamental architectural change (third-party EMMs can no longer use custom DPC code; they must use AMAPI). Microsoft's migration happened in waves during 2024–2025. Documentation sourced from any pre-AMAPI guide (including many community blog posts still indexed by search engines) will describe the pre-migration experience.

**How to avoid:**
- BYOD Work Profile admin doc must note the AMAPI migration: post-migration management app is the Microsoft Intune app (not Company Portal alone); custom configuration policies are not supported.
- Explicitly flag Wi-Fi policy limitation: certificate-based authentication required for AMAPI BYOD; username/password Wi-Fi policies break at migration.
- Source all BYOD Work Profile policy guidance from post-April-2025 MS Learn pages only. Cross-check against the Microsoft Community Hub announcement: [New policy implementation and web enrollment for Android personally owned work profile](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-policy-implementation-and-web-enrollment-for-android-personally-owned-work-p/4370417).
- MEDIUM confidence on any BYOD policy behavior claim — verify against current MS Learn and note the `last_verified` date.

**Warning signs:**
- Doc that says "users install Company Portal from Google Play" as the only BYOD enrollment method (web enrollment is now also supported post-AMAPI migration).
- Custom OMA-URI configuration policy described for BYOD work profile.
- Wi-Fi policy using username/password authentication documented without the certificate-auth migration note.

**Phase to address:**
BYOD Work Profile admin content phase. AMAPI migration impact must be the first callout in the enrollment path overview.

---

### Pitfall 9: Integration With Existing v1.0–v1.3 Content Creates Anchor and Terminology Drift

**What goes wrong:**
The existing docs suite has 118 files with established anchor structures, glossary entries, and terminology. Adding Android without touching v1.0–v1.3 files (correct decision, per STATE.md v1.4 decision) still risks:
1. The Android glossary creating entries for terms already in `_glossary.md` or `_glossary-macos.md` with different meanings and no cross-reference.
2. `common-issues.md` being updated for Android content (if at all) in a way that breaks existing platform selectors or anchors from v1.2/v1.3.
3. `quick-ref-l1.md` and `quick-ref-l2.md` being updated for Android in a way that shifts line numbers or anchors used by iOS/macOS cross-references.
4. Platform taxonomy file (`_templates/`) needing updates for a fourth platform enum value (`android`) that existing templates did not anticipate.

v1.4 explicitly deferred cross-platform nav integration (backport Android into docs/index, common-issues, quick-refs). This means Android docs MUST NOT add inline cross-references into v1.0–v1.3 shared files during v1.4. All such integration is post-v1.4.

**Why it happens:**
It is natural when writing a "see also common issues" sentence to link to `common-issues.md`. But if that file doesn't have Android sections yet (deferred), the link is broken. Similarly, writing "see iOS supervision equivalent" references `_glossary-macos.md` directly — which works, but creates a cross-file dependency that the nav-unification task will need to account for.

**How to avoid:**
- Add an explicit "Do NOT link to these files from Android docs in v1.4" list to the Phase PLAN for every content phase: `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`. All Android docs are self-contained with internal cross-references only.
- The Android glossary (`_glossary-android.md`) cross-references to `_glossary-macos.md` and `_glossary.md` are acceptable (read-only, existing files are not modified). But no new entries should be added to those files.
- Platform frontmatter: add `platform: android` enum value to the template — but do NOT retroactively patch v1.0–v1.3 files. This matches the pattern from v1.2 (Platform frontmatter defaults to Windows; macOS files explicitly set platform: macOS).
- Include `scope_exclusion` boilerplate at the top of every Android doc: "Cross-platform nav integration for Android deferred to post-v1.4. This document does not appear in `docs/index.md` or `common-issues.md` until that task completes."

**Warning signs:**
- Any Android doc containing a link to `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, or `docs/index.md`.
- An Android glossary term added inline into `_glossary.md`.
- A v1.0–v1.3 file modified as part of a v1.4 phase commit.

**Phase to address:**
All v1.4 content phases must include "no v1.0–v1.3 file modifications" as an explicit plan constraint. The milestone audit phase should include a grep for Android content in shared files as a verification check.

---

### Pitfall 10: Tri-Portal Template Not Designed Before Mode Docs

**What goes wrong:**
v1.2 established the dual-portal template (ABM + Intune admin center sub-sections in macOS guides). v1.3 extended it for iOS (APNs + ABM/ADE token + Intune). Android Enterprise requires THREE portals: Intune admin center, Managed Google Play (`play.google.com/work`), and Zero-Touch portal (`android.com/zero-touch`). Each portal has different:
- UI navigation paths (all three UIs have redesigned multiple times; Zero-Touch especially)
- Session requirements (different Google account login for Zero-Touch vs. Intune vs. MGP)
- Step ordering dependencies (MGP binding must precede any Intune Android enrollment profile creation)

If mode-specific docs are written before the tri-portal template is finalized, portal-navigation steps will be inconsistent across docs, or some docs will omit portal steps that belong to a different portal section.

**Why it happens:**
The dual-portal template was obvious after macOS (two portals, well-documented). The tri-portal pattern has no prior art in this suite and requires deliberate design before the first mode doc is authored.

**How to avoid:**
- The tri-portal admin template design must be Phase 1 of the v1.4 roadmap (before any mode-specific content phase). Output: a template file in `docs/_templates/` that defines the H4 sub-section structure: `#### In Intune admin center`, `#### In Managed Google Play`, `#### In Zero-Touch portal` — with notes on which sections are required for which modes.
- Zero-Touch portal section is only required in Zero-Touch content; it should not appear in BYOD or COPE migration note docs.
- MGP section is required in ALL corporate mode admin docs (COBO, dedicated, COPE migration note) and the prerequisites doc.
- Document the portal session requirements in the prerequisites doc: "The Zero-Touch portal requires the Google account used to set up Zero-Touch (distinct from the MGP binding account)."

**Warning signs:**
- A COBO admin doc that references the Zero-Touch portal without a prior Zero-Touch setup guide.
- Different portal navigation descriptions for the same portal across two mode docs (indicates template was not used).
- Any doc that describes MGP steps without first pointing to the binding prerequisite doc.

**Phase to address:**
Tri-portal template phase (must be first content phase of the roadmap, analogous to v1.2 Phase 20 cross-platform foundation).

---

### Pitfall 11: KME vs Zero-Touch Conflict on Samsung Devices — Documented as Equivalent

**What goes wrong:**
Documentation that presents KME and Zero-Touch as equivalent enrollment automation options for Samsung devices causes admins to configure both, which Google explicitly advises against. The failure mode (configurations out of sync, difficult to debug) is hard to diagnose. The correct guidance is: use one or the other, not both. For v1.4 scope, KME is deferred — but the COBO and dedicated admin docs will describe Zero-Touch as the automatic enrollment method, and must include a callout that Samsung devices with KME configured should use KME exclusively (deferring full KME coverage to v1.4.1).

**Why it happens:**
Both KME and Zero-Touch appear in Microsoft's own documentation as options for Samsung devices. Writers interpret "both are valid options" as "configure both for maximum coverage" without seeing the mutual exclusion note in Google's documentation.

**How to avoid:**
- Every doc that mentions Zero-Touch for fully managed and dedicated devices must include: "Samsung Knox devices: If using Knox Mobile Enrollment (KME), do not also configure Zero-Touch. Configure one method only. KME coverage is deferred to v1.4.1; see [stub reference] for current scope."
- The enrollment path overview must include a note in the provisioning method matrix: KME row — "Samsung-only; mutually exclusive with Zero-Touch on same device; full coverage deferred to v1.4.1."

**Warning signs:**
- A COBO or dedicated admin doc that shows both Zero-Touch and KME setup steps without the mutual-exclusion warning.
- No cross-reference to the KME deferral.

**Phase to address:**
Enrollment path overview phase (provisioning method matrix) and all corporate mode admin content phases.

---

### Pitfall 12: AOSP Scope Creep Beyond Stub

**What goes wrong:**
AOSP documentation has sparse public sources, a thin KB, preview-quality Intune support for all OEMs except RealWear at GA, and an OEM support matrix that is actively changing. Writing more than a stub generates documentation that is either speculative (for unsupported OEMs), incorrect (for behaviors not yet GA), or immediately stale. v1.4 scope explicitly limits AOSP to stub with full coverage deferred to v1.4.1 (STATE.md). Scope creep into AOSP detail during execution is the failure mode to prevent.

AOSP-specific facts that ARE well-sourced and can appear in the stub: RealWear (Android 10.0+) is the only Intune-GA AOSP OEM; enrollment is one-device-at-a-time only; no GMS; AOSP user-associated and userless are two separate enrollment modes in Intune; QR code is the only provisioning method; SCEP and PKCS certificate support is available.

**Why it happens:**
When documenting "Android Enterprise," writers treat AOSP as just another mode alongside COBO/dedicated/BYOD. It is not — AOSP is a separate management surface with a different enrollment API, no GMS, and limited Intune support. Treating it as equivalent generates documentation obligations that cannot be fulfilled accurately.

**How to avoid:**
- AOSP stub must open with a prominent scope callout: "Coverage in v1.4 is intentionally limited (stub). Full AOSP documentation (OEM matrix, user-associated vs. userless, RealWear/Zebra/Pico deployment guides) is deferred to v1.4.1 pending OEM support matrix stability."
- The stub covers: what AOSP is, when to use it (GMS-absent devices), supported OEMs at GA (RealWear only), enrollment method (QR, one device at a time), differences from GMS-based Android Enterprise modes, and a "Deferred content" table.
- No failure catalog for AOSP in v1.4. L2 runbooks for AOSP deferred to v1.4.1.
- REQUIREMENTS.md REQ-IDs for AOSP must explicitly scope to stub. If a planning agent adds full AOSP runbook requirements, the reviewer must flag as out-of-scope.

**Warning signs:**
- AOSP doc longer than 2 pages (stub should be concise).
- L1 runbook or L2 investigation runbook for AOSP appearing in v1.4 phase plans.
- OEM-specific (Zebra, Pico, HTC VIVE Focus) enrollment steps in AOSP content.

**Phase to address:**
AOSP stub phase. The milestone audit must verify AOSP content does not exceed stub scope.

---

### Pitfall 13: Play Integrity / SafetyNet Terminology in Compliance Docs

**What goes wrong:**
SafetyNet Attestation API was deprecated and turned off January 2025. Play Integrity API is the replacement. Intune compliance policy UI now shows "Play Integrity Verdict" options. Any compliance documentation that refers to "SafetyNet" is describing a defunct API and will cause admin confusion ("I don't see SafetyNet in Intune"). The three Play Integrity verdict levels (Basic integrity, Basic + Device integrity, Strong integrity with hardware-backed security) have different GMS and hardware requirements — writing "require Play Integrity" without specifying the level leaves the compliance policy ambiguous.

**Why it happens:**
SafetyNet was the term used for years; many blog posts, community answers, and older MS Learn pages still use it. Writers sourcing from any pre-2025 content will pick up the deprecated terminology.

**How to avoid:**
- All compliance policy documentation for Android must use "Play Integrity Verdict" (not SafetyNet).
- Document the three verdict levels with their requirements: Basic (passes on most devices including emulators in some cases); Basic + Device (requires hardware security features, blocks rooted/modified devices); Strong integrity (hardware-backed security, strictest). Intune admin sees these as radio buttons in the compliance policy editor.
- MEDIUM confidence on the Strong integrity behavior — verify against current MS Learn compliance docs at authoring time.
- `last_verified` frontmatter on compliance doc must be checked against Google's Play Integrity deprecation date (January 2025) as a lower bound.

**Warning signs:**
- Any Android compliance doc that mentions SafetyNet.
- Play Integrity described as a binary pass/fail without noting the three verdict levels.

**Phase to address:**
BYOD Work Profile admin content phase (compliance policy section) and COBO admin content phase.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Sourcing Android version behavior from single MS Learn page | Faster authoring | MS Learn lags Google AE Help; claims may be stale 1-2 Android versions behind | Never for version-specific claims; always cross-check Google AE Help |
| Omitting per-method provisioning matrix, just doc the recommended method | Simpler docs | Admins hit dead-end enrollments when recommended method is unavailable | Never; the matrix is a first-class deliverable per PROJECT.md scope |
| Writing BYOD content in standard L1 runbook format | Reuses existing template | Produces unusable L1 doc; tier-inversion not surfaced | Never; explicit template deviation required |
| Treating MGP binding as a one-sentence prerequisite | Saves space | Silent failures when binding is wrong; no recovery path documented | Never; binding is as critical as APNs for iOS |
| Using "supervision" as shorthand for Android fully managed | Cross-platform familiarity | Terminology collision with iOS supervision; readers apply wrong mental model | Never; use "fully managed" consistently |
| Referencing community blog posts without confidence attribution | Access to practical experience | Community posts may predate AMAPI migration; SafetyNet/Play Integrity transition | Acceptable with MEDIUM confidence label and `last_verified` date |
| Skipping version tagging on individual behavior claims | Cleaner prose | Claims go stale silently; no audit trail for which Android version was tested | Never; version-tag all behavioral assertions |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Managed Google Play binding | Attempting to bind using a Google Workspace / G-Suite account | Use Microsoft Entra account (preferred since Aug 2024) or standard consumer Gmail account; Workspace account fails |
| Managed Google Play binding | Running binding flow from `intune.microsoft.com` | Use `endpoint.microsoft.com`; known redirect issue in `intune.microsoft.com` portal |
| Zero-Touch portal | Assuming a configuration is applied to all devices in the portal | Configuration must be explicitly assigned as default or per-device; unassigned configs are silently ignored |
| Zero-Touch portal | Re-registering a deregistered device via self-service | Must contact reseller to re-register a deregistered device |
| Samsung KME + Zero-Touch | Configuring both on the same Samsung device | Use one method only; dual-configuration causes out-of-sync state that is hard to debug |
| Enrollment profile naming | Renaming an enrollment profile after assignment | Breaks future enrollments; create new profile with new name, reassign, delete old profile |
| Play Integrity compliance | Documenting SafetyNet compliance settings | SafetyNet turned off January 2025; document Play Integrity Verdict with three verdict levels |
| AMAPI migration (BYOD) | Documenting custom OMA-URI configuration for BYOD work profile | Custom config policies not supported post-AMAPI migration (April 2025) |
| Android 15 FRP + Zero-Touch | Assuming automatic re-enrollment after factory reset | Android 15 FRP hardening blocks re-enrollment on reset unless EFRP configured via MDM |

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Prerequisites / tri-portal template | MGP binding account type documented incorrectly | Verify against MS Learn August 2024 update (Entra account preferred) and current endpoint.microsoft.com flow |
| Enrollment path overview + provisioning matrix | Treating provisioning methods as equivalent; omitting reseller gate for Zero-Touch | Build full method matrix: NFC / QR / afw#setup / Zero-Touch with mode support, version min, prerequisites, failure modes |
| Android glossary | Term collisions with iOS/macOS glossary (supervision, work profile, user enrollment, dedicated) | Explicit disambiguation notes; no Android terms added to `_glossary.md` or `_glossary-macos.md` |
| COBO / fully managed admin content | Describing SafetyNet compliance; NFC without Android 11 note; not surfacing FRP Android 15 change | Version-tag every behavioral assertion; use Play Integrity terminology; add Android 15 FRP callout |
| Zero-Touch admin content | Omitting reseller prerequisite upfront; omitting dual-SIM IMEI 1 note; KME mutual exclusion | Reseller requirement is Step 0; dual-SIM callout; KME exclusivity note |
| BYOD work profile admin content | Using standard L1 runbook format; sourcing from pre-AMAPI blog posts; omitting privacy boilerplate | End-user self-service guide format; source only post-April-2025 MS Learn; include privacy limitation callouts |
| Dedicated / kiosk admin content | Missing audience mismatch (retail ops vs. MDM admin); missing scenario-based intro | Persona callout + scenario overview (single-app, multi-app, digital signage) before Intune steps |
| AOSP stub | Scope creep to full coverage; implying bulk enrollment support | Hard word-count / section-count limit on stub; one-device-at-a-time note upfront; deferred content table |
| Compliance policy (any mode) | SafetyNet terminology; missing Play Integrity verdict levels | Play Integrity only; document all three verdict levels |
| v1.0–v1.3 content integration | Modifying shared files (common-issues, quick-refs, index); adding Android terms to existing glossaries | Explicit "no shared file modification" constraint in every phase plan; milestone audit grep check |
| Milestone audit | AOSP content exceeding stub; shared files modified; version claims without version tags | Audit checklist item per pitfall; grep for SafetyNet, "supervision" (in Android docs), links to common-issues.md |

---

## "Looks Done But Isn't" Checklist

- [ ] **Version Fragmentation Matrix:** Android version min per mode documented with source citations — verify it exists as a standalone artifact, not just inline prose.
- [ ] **MGP Binding Doc:** Includes account type requirements, portal URL specificity, binding permanence, disconnect consequences, and "what breaks" callout table.
- [ ] **Zero-Touch Admin Doc:** Reseller requirement appears before Step 1. Dual-SIM IMEI 1 note present. KME mutual-exclusion note present. Network dependency at first boot documented.
- [ ] **Provisioning Method Matrix:** All four methods (NFC, QR, afw#setup, Zero-Touch) in a matrix with mode support, Android version min, prerequisites, failure modes. QR sensitive-artifact note present.
- [ ] **Android Glossary:** Disambiguation entries for: work profile, supervision/fully managed, user enrollment, dedicated, corporate identifiers. Cross-reference to `_glossary-macos.md` entries present.
- [ ] **BYOD Work Profile Doc:** Uses end-user self-service format (not standard L1 runbook). Privacy limitation callouts present. AMAPI migration impact noted. Post-April-2025 sources only.
- [ ] **Compliance Docs:** "Play Integrity Verdict" terminology (not SafetyNet). Three verdict levels documented.
- [ ] **AOSP Stub:** Scope callout present. One-device-at-a-time note present. Deferred content table present. No L1/L2 runbooks for AOSP in v1.4.
- [ ] **Dedicated/Kiosk Doc:** Persona callout + scenario overview before Intune steps.
- [ ] **All Android Docs:** `last_verified` + `review_by` frontmatter. Android version tag on behavioral assertions. No links to `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`.
- [ ] **Android 15 FRP:** Noted in Zero-Touch and COBO docs as a behavior change from Android 13/14.
- [ ] **Enrollment Profile Naming:** "Do not rename after assignment" warning present in enrollment profile setup steps.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| MGP binding done with wrong account type | HIGH | Disconnect binding (all app assignments lost); rebind with correct account type; reassign all apps and configurations |
| Enrollment profile renamed after assignment | MEDIUM | Create new profile with new name; reassign to all groups; delete old profile |
| Zero-Touch config created but not assigned to devices | LOW | Assign existing config as default or per-device in Zero-Touch portal; no device re-enrollment needed |
| KME + Zero-Touch dual-configured on Samsung fleet | HIGH | Remove one method; factory reset affected devices; re-enroll with single method |
| AOSP content written beyond stub scope | MEDIUM | Archive over-scoped content as v1.4.1 placeholder; update stub to reference it; no end-user impact |
| Android 15 FRP blocking re-enrollment after factory reset | HIGH | Configure Enterprise Factory Reset Protection (EFRP) via Intune policy before devices are reset; for already-blocked devices, reseller or Google support intervention may be required |
| Terminology collision discovered post-authoring (supervision used for Android) | MEDIUM | Find-replace across Android docs; update glossary disambiguation entry; no v1.0–v1.3 files affected if Android docs are self-contained |
| v1.0–v1.3 shared file accidentally modified | HIGH | Revert the shared-file change via git; re-implement Android content as self-contained; rebuild any broken anchors in v1.0–v1.3 referenced content |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Technical accuracy decay (version tagging, source hierarchy) | All content phases (baked into Phase PLAN template) | Milestone audit: grep for unversioned behavioral claims; `last_verified` frontmatter scan |
| MGP binding as optional footnote | Tri-portal template / prerequisites phase | Prerequisites phase VERIFICATION.md: confirm binding doc has account type, disconnect consequence, "what breaks" table |
| Terminology collision | Android glossary phase (first content phase) | Glossary VERIFICATION.md: disambiguation entry for each collision term confirmed |
| Zero-Touch reseller lock-in not upfront | Zero-Touch admin content phase | Phase PLAN check: reseller requirement is in the opening callout |
| Provisioning method misrouting | Enrollment path overview phase (provisioning matrix) | Overview VERIFICATION.md: matrix artifact confirmed present with all four methods |
| BYOD tier inversion | BYOD Work Profile content phase | Phase PLAN: explicitly notes end-user self-service format deviation; VERIFICATION checks for privacy callouts |
| Dedicated device audience mismatch | Dedicated/kiosk content phase | Phase PLAN: persona callout and scenario overview mandatory per plan; reviewer checks before authoring |
| AMAPI migration breaking BYOD content | BYOD Work Profile content phase | Phase PLAN: source checklist — only post-April-2025 MS Learn; VERIFICATION: SafetyNet not present; web enrollment path documented |
| v1.0–v1.3 integration drift | All v1.4 content phases | Milestone audit: grep for Android content in shared files; grep for links from Android docs to deferred shared files |
| Tri-portal template not designed first | First phase of roadmap | Tri-portal template phase must be complete before any mode admin doc phase begins |
| KME vs Zero-Touch conflict | Enrollment overview + corporate mode phases | All COBO/dedicated phase plans: mutual-exclusion warning required in the plan |
| AOSP scope creep | AOSP stub phase | Milestone audit: AOSP stub word count / section count; no L1/L2 runbooks for AOSP present |
| Play Integrity / SafetyNet terminology | Compliance doc sections of each mode | Milestone audit: grep for "SafetyNet" in all Android docs |

---

## Sources

- Microsoft Learn: [Android device enrollment guide for Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-android) — HIGH confidence, updated 2024-04-23, retrieved 2026-04-19
- Microsoft Learn: [Troubleshoot Android Enterprise device enrollment in Microsoft Intune](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-android-enrollment) — HIGH confidence
- Microsoft Community Hub: [New policy implementation and web enrollment for Android personally owned work profile](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-policy-implementation-and-web-enrollment-for-android-personally-owned-work-p/4370417) — HIGH confidence (AMAPI migration announcement)
- Jason Bayton: [Android Enterprise provisioning methods](https://bayton.org/android/android-enterprise-provisioning-methods/) — HIGH confidence, primary source for provisioning method gotchas
- Jason Bayton: [Android Enterprise FAQ](https://bayton.org/android/android-enterprise-faq/) — HIGH confidence, primary source for behavioral gotchas and FRP/account type details
- Jason Bayton: [What is Android zero-touch enrolment?](https://bayton.org/android/what-is-android-zero-touch-enrolment/) — HIGH confidence
- Jason Bayton: [Android 15: What's new for enterprise?](https://bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/) — HIGH confidence, Android 15 FRP changes
- Google Android Enterprise Help: [Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005?hl=en) — HIGH confidence, reseller requirements
- Google Android Enterprise Help: [Getting started with zero-touch](https://www.androidenterprise.community/blog/resources/getting-started-with-zero-touch/93) — MEDIUM confidence (community source, Google-hosted)
- Google Developers: [Known issues — Zero-touch](https://developers.google.com/zero-touch/resources/known-issues) — HIGH confidence, dual-SIM IMEI gotcha, KME mutual exclusion
- Samsung Knox Documentation: [Devices failing to enroll using KME or ZT](https://docs.samsungknox.com/admin/knox-mobile-enrollment/kbas/kba-1186-devices-failing-to-enroll-using-kme-or-zt/) — HIGH confidence, KME+ZT mutual exclusion
- Microsoft Learn: [Connect Intune account to managed Google Play account](https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play) — HIGH confidence, account type and portal URL requirements
- Peter van der Woude: [Connecting Intune to Managed Google Play — The new and easy way](https://petervanderwoude.nl/post/connecting-microsoft-intune-with-managed-google-play-the-new-and-easy-way/) — MEDIUM confidence (community, corroborates MS Learn)
- Microsoft Learn: [Android Open Source Project Supported Devices](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices) — HIGH confidence, RealWear as only GA AOSP OEM
- Microsoft Learn: [Android Enterprise compliance settings](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work) — HIGH confidence, Play Integrity Verdict settings
- Project context: `.planning/PROJECT.md`, `.planning/STATE.md`, `.planning/RETROSPECTIVE.md` — authoritative for v1.4 scope decisions, integration constraints, and prior milestone lessons

---
*Pitfalls research for: Android Enterprise enrollment documentation in a multi-platform Intune documentation suite*
*Researched: 2026-04-19*
