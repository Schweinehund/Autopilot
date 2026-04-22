# Research Summary: v1.4 Android Enterprise Enrollment Documentation

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite - v1.4 milestone
**Domain:** Android Enterprise enrollment documentation (Microsoft Intune, multi-platform docs suite)
**Researched:** 2026-04-19
**Confidence:** HIGH (primary claims from Microsoft Learn direct fetches, updated 2026-04-16)

---

## Executive Summary

Android Enterprise enrollment documentation is structurally more complex than any prior milestone in this suite. Where iOS had one management axis (supervised vs unsupervised) and four paths, Android has two orthogonal axes - ownership (corporate vs personal) and management scope (fully managed, work profile, dedicated, AOSP) - combining into five distinct enrollment modes. A third orthogonal axis (provisioning method: NFC, QR, DPC identifier, Zero-Touch) is independent of mode selection. This means v1.4 must produce matrix reference artifacts as first-class deliverables before any mode-specific content, or mode docs will be incomplete and contradictory.

The single most important prerequisite is the Managed Google Play binding - a one-time Intune-to-Google tenant connection that gates all four GMS-based enrollment modes (COBO, Dedicated, BYOD Work Profile, COPE). Without it, no enrollment profiles can be created in Intune for those modes. This has no iOS equivalent (APNs is per-device, not a tenant gate) and must be documented as a hard prerequisite before any mode-specific admin guide. The tri-portal pattern (Intune admin center + Managed Google Play + Zero-Touch portal) is the defining architectural departure from v1.2/v1.3 dual-portal templates and must be designed as a template artifact in Phase 1 before any mode doc is authored.

The three highest risks for v1.4 are: (1) sourcing from pre-April-2025 content, which predates the AMAPI migration that broke BYOD Work Profile custom policies and changed the management app from Company Portal to Microsoft Intune app; (2) writing BYOD Work Profile content in standard L1 runbook format, which does not fit because BYOD enrollment is user-initiated via personal device, not admin-portal-initiated; and (3) scope creep into AOSP or COPE beyond stub level, where public documentation is sparse and content would be immediately stale. All three are preventable with explicit Phase PLAN constraints before content authoring begins.

---

## Key Findings

### Stack Additions (from STACK.md)

Android Enterprise introduces a tri-portal admin surface - the first three-portal pattern in this suite, replacing the two-portal (ABM + Intune) pattern used for macOS/iOS.

**Portals and tooling:**
- **Intune admin center** (endpoint.microsoft.com): Enrollment profiles, compliance, config profiles, app deployment, Zero-Touch iframe, corporate identifiers - required for all modes. MGP binding must run from endpoint.microsoft.com, not intune.microsoft.com (known redirect issue).
- **Managed Google Play** (play.google.com/work): App approval and distribution for all GMS-based modes; auto-provisions four Microsoft apps at binding (Intune, Authenticator, Company Portal, Managed Home Screen).
- **Zero-Touch portal** (enterprise.google.com/android/zero-touch/customers): Device-to-configuration binding for corporate fleet automation; requires authorized reseller relationship established at device purchase.
- **Firebase Cloud Messaging (FCM)**: Push channel - no admin cert required (unlike APNs). Network/firewall concern only; no recurring admin action.
- **Play Integrity API**: Compliance attestation replacing SafetyNet (turned off January 2025). Three verdict levels: Basic, Basic + Device, Strong integrity with hardware-backed security.
- **Entra ID**: MGP binding now uses Entra account (not Gmail) as of August 2024. CA policy must exclude Microsoft Intune cloud app during Android enrollment (Chrome tab used during COBO setup).

AOSP-specific endpoint: intunecdnpeasd.manage.microsoft.com (migrated from azureedge.net, March 2025). Google-side GMS/FCM endpoints are not in MS Learn - link to Google Android Enterprise Help Center network port list.

### Feature Table Stakes vs Differentiators vs Anti-Features (from FEATURES.md)

**Must-have (table stakes):**
- Android Enterprise enrollment path overview - ownership/management/provisioning axes
- Managed Google Play binding prerequisite guide
- Fully Managed (COBO) admin setup + L1 + L2
- BYOD Work Profile admin guide + end-user self-service guide + L2 (tier-inversion: user-initiated enrollment)
- Dedicated device (COSU/kiosk) admin setup + L1 + L2
- Zero-Touch Enrollment admin guide + L1/L2 triage
- Android version fragmentation matrix (first-class reference artifact)
- Provisioning-method axis matrix - NFC / QR / afw#setup / Zero-Touch (first-class reference artifact)
- COPE migration/deprecation note inline in COBO guide
- AOSP stub guide (enrollment flow, OEM matrix, QR-only, one-device-at-a-time)

**Should-have (differentiators):**
- Privacy-boundary table in BYOD guide (what admin CAN vs CANNOT see) - top legal/HR concern
- Tri-portal navigation guide for admins managing all three portals
- MHS exit-PIN synchronization callout in dedicated device guide - prevents repeated escalations
- Factory Reset Protection behavior matrix per mode and reset method (Android 15 breaking change)
- Enrollment token rotation runbook
- KME vs Zero-Touch mutual exclusion callout

**Explicitly out of v1.4 (anti-features):**
- Knox Mobile Enrollment full docs - deferred to v1.4.1
- COPE full admin setup runbook - migration note only in v1.4
- AOSP full failure catalog - deferred to v1.4.1
- Cross-platform navigation integration (common-issues, quick-refs, full index.md) - post-v1.4 unification task
- SafetyNet attestation - document Play Integrity only
- Custom OMA-URI profiles for personally-owned work profile - removed from Intune April 2025
- Android Device Administrator (DA) - deprecation note only
- 4-platform comparison document - deferred to v1.5

### Architecture Integration Blueprint (from ARCHITECTURE.md)

Android v1.4 adds three new subdirectories, one new glossary, one new admin template, and extends four existing files. Mirrors v1.3 iOS naming: android-lifecycle/, admin-setup-android/. New end-user-guides/ tier for BYOD Work Profile self-service - the fourth documentation tier alongside L1/L2/Admin.

**New directories:**
- docs/android-lifecycle/ - enrollment overview, prerequisites, provisioning-method matrix, version matrix (4 files)
- docs/admin-setup-android/ - MGP binding, Zero-Touch portal, COBO, BYOD WP, Dedicated, AOSP stub, overview (7 files)
- docs/end-user-guides/ - android-work-profile-setup.md (new 4th tier)

**New files in existing directories:**
- docs/_glossary-android.md - 13 term collision disambiguations
- docs/_templates/admin-template-android.md - tri-portal template
- docs/decision-trees/08-android-triage.md - mode-first triage tree
- docs/reference/android-capability-matrix.md - mode x feature comparison
- L1 runbooks 22-27 (6 new); L2 runbooks 18-21 (4 new)

**Modified files (append-only, no v1.0-v1.3 section touches):**
- docs/l1-runbooks/00-index.md, docs/l2-runbooks/00-index.md - Android sections appended
- docs/index.md - Android stub section only
- docs/_glossary-macos.md - 1-line see-also cross-reference

**Key architectural patterns:**
1. Tri-portal template: H4 sub-sections for Intune admin center / Managed Google Play / Zero-Touch portal - ZT section only where ZT applies (omit for BYOD, AOSP).
2. Mode-first triage: L1 triage tree asks enrollment mode before symptom - Android failure root causes differ fundamentally by mode.
3. Centralized provisioning-method matrix: One canonical android-lifecycle/02-provisioning-methods.md; mode guides reference a filtered row, not a duplicate grid.
4. End-user tier separation: BYOD admin guide and end-user guide are two distinct files with explicit audience callouts. Combined docs fail both audiences.
5. Frontmatter extension: platform: android, audience: end-user (new valid values). No retroactive edits to v1.0-v1.3 files.

**Prerequisite DAG (build order):**

    _glossary-android.md + admin-template-android.md  [Phase 1, parallel]
        |
        v
    android-lifecycle overview + provisioning-methods matrix + version matrix  [Phase 1]
        |
        v
    admin-setup-android/01-managed-google-play.md  [HARD GATE: all GMS modes blocked]
        |
        v
    admin-setup-android/02-zero-touch-portal.md  [GATE: ZTE blocked]
        |
        v
    Mode-specific admin guides (parallelizable: COBO, BYOD WP, Dedicated, AOSP stub) + end-user guide
        |
        v
    Decision tree + L1 runbooks  [after mode admin guides exist]
        |
        v
    L2 runbooks  [after L1 runbooks]
        |
        v
    Capability matrix + index.md stub + _glossary-macos.md cross-ref

### Watch Out For: Critical Pitfalls (from PITFALLS.md)

1. **MGP binding treated as optional footnote** - Wrong account type (Google Workspace fails; use Entra account since August 2024), wrong portal URL (use endpoint.microsoft.com), or incomplete binding docs causes silent failures across all GMS modes. Binding is as critical as APNs for iOS. Include account type, portal URL, binding permanence, disconnect consequences, a what-breaks table. [PITFALL-2]

2. **Tri-portal template not designed before mode docs** - Mode guides will have inconsistent portal navigation if admin-template-android.md does not exist first. Template is Phase 1; no exceptions. [PITFALL-10]

3. **BYOD Work Profile in standard L1 runbook format** - BYOD enrollment is user-initiated; admin cannot fix enrollment from portal alone. Use end-user self-service guide format with admin sidebar. Privacy limitation callouts are not optional. [PITFALL-6]

4. **AMAPI migration breaks pre-April-2025 BYOD content** - Custom OMA-URI policies gone. Username/password Wi-Fi broken (cert-based required now). Management app changed. Source BYOD policy guidance from post-April-2025 MS Learn only. [PITFALL-8]

5. **Android 15 FRP breaking change** - Android 15 FRP hardening breaks Zero-Touch re-enrollment flows that worked on Android 13/14. COBO and dedicated device docs must include Android 15 FRP callout. EFRP must be configured via Intune policy before devices are reset. [PITFALL-1]

6. **Zero-Touch reseller lock-in not upfront** - Reseller requirement must be Step 0, not a footnote. Dual-SIM devices: register with IMEI 1 only. KME and ZTE are mutually exclusive on same Samsung device. [PITFALL-4]

7. **Terminology collision with v1.0-v1.3 content - 13 collisions** - Work profile (Android container, no iOS equivalent), supervision (iOS only; Android uses fully managed), user enrollment (Apple-specific), dedicated (Android kiosk differs from iOS Shared iPad). Create _glossary-android.md with explicit disambiguation before any mode content. [PITFALL-3]

8. **Provisioning method misrouting creates dead-end enrollments** - NFC lost COPE support on Android 11+; afw#setup disables system apps by default; QR needs internet before scanning on Android 7-8; ZTE requires reseller. Provisioning-method matrix must be a first-class artifact. Never embed actual QR code images in docs. [PITFALL-5]

9. **AOSP scope creep beyond stub** - Only RealWear is verifiably GA; other OEMs have sparse docs. Hard scope callout required. No L1/L2 runbooks for AOSP in v1.4. One-device-at-a-time enrollment stated upfront. AOSP stub word-count/section-count audit in milestone check. [PITFALL-12]

10. **Play Integrity / SafetyNet terminology** - SafetyNet turned off January 2025. All compliance docs must use Play Integrity Verdict with three verdict levels (Basic / Basic + Device / Strong). Grep for SafetyNet in milestone audit. [PITFALL-13]

11. **v1.0-v1.3 shared file modification** - Any modification to common-issues.md, quick-ref-l1.md, quick-ref-l2.md, _glossary.md, or _glossary-macos.md for Android content risks breaking live anchors. Every v1.4 phase plan must include no v1.0-v1.3 shared file modifications as explicit constraint. [PITFALL-9]

12. **Enrollment profile renamed after assignment** - Breaks future enrollments. Do not rename after assignment warning required in enrollment profile setup steps. [Integration Gotchas]

13. **Technical accuracy decay from Android version fragmentation** - Every behavioral assertion must carry a version tag. Source hierarchy: Google Android Enterprise Help > MS Learn > Jason Bayton > community blogs. last_verified + review_by frontmatter on every Android doc. [PITFALL-1]

---

## Implications for Roadmap

Phase numbering continues from v1.3. v1.4 begins at **Phase 34**.

### Phase 34: Foundation - Glossary, Template, and Reference Matrices

**Rationale:** All subsequent content depends on three things that do not exist yet: the Android glossary (13 term collisions block accurate content), the tri-portal admin template (mode docs will be inconsistent without it), and the reference matrices (version fragmentation and provisioning-method matrices are first-class deliverables, not inline prose). These must ship before any mode doc is authored.

**Delivers:**
- docs/_glossary-android.md - 13 term disambiguation entries with cross-refs to iOS/macOS glossaries
- docs/_templates/admin-template-android.md - tri-portal template with ZT portal section guidance
- docs/android-lifecycle/00-enrollment-overview.md - ownership/management/provisioning axes; supervision analog explanation
- docs/android-lifecycle/02-provisioning-methods.md - NFC/QR/afw#setup/ZT matrix (5x4 grid)
- docs/android-lifecycle/03-android-version-matrix.md - min OS per mode with notable version breakpoints

**Avoids:** Pitfalls 3 (terminology collision), 5 (provisioning misrouting), 10 (template-first constraint)

**Research flag:** No additional research needed - all HIGH confidence from MS Learn direct fetches.

---

### Phase 35: MGP Binding and Zero-Touch Prerequisites

**Rationale:** MGP binding is the hard gate for all four GMS modes. ZTE portal setup is the hard gate for Zero-Touch enrollment. Both must exist as standalone guides before mode-specific admin guides reference them.

**Delivers:**
- docs/android-lifecycle/01-android-prerequisites.md - MGP + ZT portal overview
- docs/admin-setup-android/00-overview.md - tri-portal setup sequence
- docs/admin-setup-android/01-managed-google-play.md - binding mechanics, account type (Entra preferred since August 2024), disconnect consequences, what-breaks callout table, endpoint.microsoft.com portal requirement
- docs/admin-setup-android/02-zero-touch-portal.md - reseller requirement as Step 0, portal navigation, DPC extras JSON, ZT-Intune linking

**Avoids:** Pitfalls 2 (MGP as footnote), 4 (Zero-Touch reseller lock-in), 11 (KME mutual exclusion callout placed here)

**Research flag:** Zero-Touch portal UI needs plan-time verification (portal redesigns frequently). Enrollment token 90-day max is MEDIUM confidence - verify against current MS Learn before documenting authoritatively.

---

### Phase 36: Fully Managed (COBO) Admin + COPE Note

**Rationale:** COBO is the most common corporate enrollment mode. COPE migration note belongs inline here. Android 15 FRP callout must appear here.

**Delivers:**
- docs/admin-setup-android/03-fully-managed-cobo.md - prerequisites, enrollment profile, all four provisioning methods, token management, COPE migration/deprecation note (language: Google recommends WPCO, not COPE deprecated), Android 15 FRP callout, Entra join behavior

**Avoids:** Pitfalls 1 (version tagging), 5 (provisioning method callouts), 13 (Play Integrity in compliance references)

**Research flag:** COPE formal deprecation language - verify Google current wording at plan time. Google has not formally deprecated COPE; must not state it has.

---

### Phase 37: BYOD Work Profile - Admin + End-User

**Rationale:** Three distinct documents across two audiences. Tier-inversion means end-user guide is a distinct file, not a section inside admin guide. AMAPI migration impact is the primary content risk - source only post-April-2025 MS Learn.

**Delivers:**
- docs/admin-setup-android/04-byod-work-profile.md - enrollment restrictions, work profile policy, data transfer controls, privacy boundary table, AMAPI migration callout
- docs/end-user-guides/android-work-profile-setup.md - Company Portal install, work profile creation, what IT can/cannot see (plain language, no Intune portal steps)

**Avoids:** Pitfalls 6 (BYOD tier inversion), 8 (AMAPI migration), 3 (privacy boundary required)

**Research flag:** BYOD Android minimum version (Android 8 practical minimum - verify current MS Learn statement). AMAPI completeness - verify web enrollment path is in current MS Learn.

---

### Phase 38: Dedicated Devices (Kiosk/COSU) Admin + L1 + L2

**Rationale:** Kiosk configuration is the most complex single-mode surface - Managed Home Screen adds an app-config layer on top of device restrictions. Persona callout (Intune Admin + LOB Operations Owner) and scenario overview must appear before Intune steps.

**Delivers:**
- docs/admin-setup-android/05-dedicated-devices.md - persona callout, scenario overview (single-app/multi-app/digital signage/Entra shared device mode), enrollment profile, MHS exit-PIN sync requirement, Android 15 FRP callout
- L1 runbooks for kiosk failures (MHS PIN mismatch, app crash, exit-kiosk attempts)
- L2 runbooks for kiosk failures (token rotation, Lock Task debugging, FRP behavior)

**Avoids:** Pitfalls 4 (Zero-Touch callout for dedicated), 5 (provisioning methods for dedicated), 7 (audience mismatch for dedicated)

**Research flag:** MHS exit-PIN failure pattern is MEDIUM confidence (community-confirmed); verify before writing as authoritative. Dedicated device default token expiry - confirm what Intune sets by default when no expiry is specified.

---

### Phase 39: Zero-Touch Enrollment Admin + L1/L2

**Rationale:** ZTE requires dedicated admin guide and triage content separate from COBO because ZTE failures at device unboxing are time-critical and the reseller-side vs Intune-side failure distinction is non-obvious to L1.

**Delivers:**
- ZTE-specific admin content building on Phase 35 ZTE portal doc
- docs/l1-runbooks/27-android-zt-enrollment-failed.md - ZTE failure triage
- L2 investigation for ZTE failures (wrong DPC, network unreachable at first boot, wrong mode applied)

**Avoids:** Pitfall 4 (reseller requirement upfront, dual-SIM IMEI 1 note, KME exclusivity)

**Research flag:** Zero-Touch portal current UI state must be verified at plan time.

---

### Phase 40: AOSP Stub

**Rationale:** AOSP devices are in real deployments; absence creates not-documented = not-supported assumption. Stub prevents this while respecting the scope guard against speculative per-OEM content. Hard scope limit: stub only, no L1/L2 runbooks.

**Delivers:**
- docs/admin-setup-android/06-aosp-stub.md - scope callout (stub v1.4; full v1.4.1), what AOSP is, when to use it, OEM matrix from MS Learn, QR-only enrollment, one-device-at-a-time, Wi-Fi credential embedding requirement (RealWear), deferred content table

**Avoids:** Pitfall 12 (scope creep). Hard audit check: stub word count; no L1/L2 runbooks for AOSP in v1.4.

**Research flag:** Verify current AOSP supported-devices page at plan time (last verified 2025-05-12). Verify Intune Plan 2 / Suite requirement per OEM type before publishing.

---

### Phase 41: L1 Runbooks + Android Triage Decision Tree

**Rationale:** L1 triage content depends on mode-specific admin guides existing. Runbooks 22-26 cover high-volume Android symptoms; runbook 27 (ZTE) completed in Phase 39.

**Delivers:**
- docs/decision-trees/08-android-triage.md - mode-first triage tree
- L1 runbooks 22-26: enrollment blocked, work profile not created, device not enrolled, compliance access blocked, MGP app not installed
- docs/l1-runbooks/00-index.md - Android section appended (existing sections untouched)

**Avoids:** Pitfall 9 (append-only; no modification to existing sections)

**Research flag:** Standard patterns; no research phase needed.

---

### Phase 42: L2 Runbooks

**Rationale:** L2 depends on L1 runbooks and admin guides. Log collection guide is prerequisite for all L2 investigation runbooks.

**Delivers:**
- docs/l2-runbooks/18-android-log-collection.md - Company Portal logs, Microsoft Intune app logs, adb logcat collection
- L2 runbooks 20-21: app install failure investigation, compliance investigation
- docs/l2-runbooks/00-index.md - Android section appended

**Avoids:** Pitfall 9 (append-only)

**Research flag:** adb diagnostic commands - LOW confidence source (community; no official MS Learn guide). Verify or label MEDIUM/LOW with explicit confidence callout before including.

---

### Phase 43: Capability Matrix + Integration + Milestone Audit

**Rationale:** Capability matrix and index.md stub are best written after all mode docs exist. Milestone audit checks pitfall prevention across all v1.4 content.

**Delivers:**
- docs/reference/android-capability-matrix.md - mode x feature matrix with iOS supervision comparison
- docs/index.md Android stub section only (Choose Your Platform entry + stub H2)
- docs/_glossary-macos.md 1-line see-also addition
- Milestone audit: grep SafetyNet in all Android docs; grep Android links in deferred shared files; AOSP stub word-count check; last_verified frontmatter scan; check supervision used in Android docs

**Avoids:** Pitfall 9 (index.md stub only; common-issues / quick-refs deferred)

**Research flag:** No research needed. Audit is mechanical.

---

### Phase Ordering Rationale

- Foundation (Phase 34) first: glossary, template, and reference matrices are used by all subsequent content - building mode docs before these exist guarantees inconsistency and rework.
- MGP binding (Phase 35) before all mode-specific admin guides: hard prerequisite gate - mode docs that reference MGP app deployment cannot stand alone without it.
- Tri-portal template (Phase 34 deliverable) before all admin setup guides (Phases 35-40): single most important ordering constraint in v1.4.
- COBO (Phase 36) before BYOD (Phase 37) and Dedicated (Phase 38): COBO is the canonical corporate mode; COPE migration note resolves at Phase 36.
- BYOD (Phase 37) before L1/L2: BYOD L1 triage references the end-user guide created in Phase 37.
- AOSP stub (Phase 40) can run in parallel with Phase 39 (ZTE): both are independent after Phase 35.
- L1 (Phase 41) follows all mode admin guides (Phases 36-40): L1 runbooks reference Intune portal paths from admin guides.
- L2 (Phase 42) follows L1 (Phase 41): L2 inherits escalation framing from L1.

**Parallelizable after Phase 35:**
- Phases 36 (COBO) + 40 (AOSP stub) are independent of each other
- Phases 37 (BYOD) + 38 (Dedicated) are independent of each other
- Phase 39 (ZTE) can overlap with 37-38 since ZTE portal doc was started in Phase 35

---

### Research Flags

**Needs plan-time verification before authoring:**
- Phase 35/39: Zero-Touch portal UI current navigation - portal has a history of redesigns
- Phase 35: Enrollment token 90-day maximum - MEDIUM confidence; not stated in current MS Learn
- Phase 36: COPE formal deprecation language - verify Google current wording before writing
- Phase 37: BYOD Android minimum version - verify current MS Learn statement
- Phase 37: AMAPI migration completeness - verify web enrollment path is in current MS Learn
- Phase 40: AOSP licensing for specialty devices - verify Intune Plan 2 / Suite requirement per OEM
- Phase 42: adb diagnostic commands - LOW confidence; verify against official source before including

**Standard patterns (skip research phase):**
- Phase 34 (glossary, template, matrices) - all HIGH confidence from MS Learn direct fetches
- Phase 36 COBO mechanics - HIGH confidence (ref-corporate-methods updated 2025-12-04)
- Phase 37 BYOD privacy boundaries - HIGH confidence (setup-personal-work-profile; MAM-vs-work-profiles 2026-04-17)
- Phase 38 dedicated/kiosk Intune configuration - HIGH confidence (setup-dedicated updated 2025-05-08)
- Phase 41 L1 runbooks - derive from admin guides; no external sources needed
- Phase 43 audit - mechanical; no research needed

---

## Deferrals Tracked for v1.4.1 or Later

| Deferral | Target | Reason |
|----------|--------|--------|
| Knox Mobile Enrollment (KME) full docs | v1.4.1 | Paid Knox license tier; Samsung-specific; velocity compression on top of 3x existing surface |
| COPE full admin setup runbook | v1.4.1 | Google trajectory is WPCO; COPE covered as migration note in COBO doc only |
| AOSP full failure catalog + per-OEM behavioral matrix | v1.4.1 | Sparse public docs; OEM matrix actively changing; speculative content risks immediate staleness |
| AOSP user-associated/userless full coverage | v1.4.1 | Same as AOSP full failure catalog |
| Cross-platform navigation integration (common-issues, quick-refs, full index.md) | Post-v1.4 unification task | Regression risk against live v1.0-v1.3 nav anchors |
| 4-platform comparison document | v1.5 | Requires all four platforms at similar documentation depth |
| Knox-specific hardware features (Knox Workspace, Samsung DeX MDM, EFOTA) | Out of scope | Outside Intune enrollment scope |

---

## Open Questions for Plan-Time

1. **Zero-Touch portal UI current state** - Has enterprise.google.com/android/zero-touch/customers changed since research? Verify navigation paths before writing Phase 35/39.
2. **Enrollment token 90-day maximum** - MEDIUM confidence; consistent in community but not stated in current MS Learn. Verify before documenting as an authoritative constraint.
3. **COPE formal deprecation language** - Google has not formally deprecated COPE. Verify current Google wording: use Google recommends WPCO not COPE deprecated.
4. **BYOD Android minimum version** - Research confirms Android 8 practical minimum. Verify current MS Learn statement for personally-owned work profile minimum OS.
5. **Dedicated device enrollment token default expiry** - Research confirms 65-year maximum configurable. Verify what Intune sets by default when no expiry is specified.
6. **AOSP non-RealWear OEM current GA status** - Verify aosp-supported-devices page at plan time (last verified 2025-05-12; may have changed).
7. **AOSP specialty device licensing** - Verify Intune Plan 2 / Suite requirement per OEM type before including licensing notes in AOSP stub.
8. **AMAPI migration completeness** - Verify whether web enrollment (new AMAPI-based path) is fully documented in current MS Learn and should appear in BYOD admin guide.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Portal surface and enrollment mode mechanics | HIGH | MS Learn direct fetches (2026-04-16); Intune admin center locations confirmed |
| MGP binding mechanics and account type | HIGH | MS Learn confirmed; August 2024 Entra account update confirmed |
| COBO / Dedicated provisioning methods | HIGH | ref-corporate-methods updated 2025-12-04; all four methods confirmed |
| BYOD Work Profile privacy boundaries | HIGH | setup-personal-work-profile; MAM-vs-work-profiles doc (2026-04-17) |
| Android version minimums per mode | HIGH | Compiled from multiple MS Learn setup pages; cross-validated |
| AOSP OEM matrix | HIGH | aosp-supported-devices page (2025-05-12); all entries verified |
| Play Integrity API replacing SafetyNet | HIGH | Compliance settings page; SafetyNet deprecation date confirmed January 2025 |
| AMAPI migration impact on BYOD | HIGH | MS Community Hub announcement; MS Learn post-April-2025 |
| Architecture integration with v1.0-v1.3 suite | HIGH | Direct inspection of existing docs/ files; established patterns from v1.2/v1.3 |
| Zero-Touch portal reseller workflow | MEDIUM | MS Learn defers to Google docs; Google-canonical source |
| Enrollment token 90-day max | MEDIUM | Multiple community sources consistent; not in current MS Learn |
| COPE deprecation trajectory | MEDIUM | Jason Bayton (community canonical) + MS Learn guide; Google has not formally deprecated |
| Google-side network endpoints (FCM/GMS) | MEDIUM | MS Learn defers to Google Help Center; not reproduced in MS Learn |
| adb diagnostic commands for Android Enterprise | LOW | Community source only (uem4all.com); no official MS Learn guide |
| AOSP per-OEM behavioral quirks (non-RealWear) | LOW | Sparse public documentation; OEM-specific behaviors not well-documented |

**Overall confidence:** HIGH for the majority of v1.4 content. MEDIUM/LOW areas are isolated to specific callout boxes or stub content that can be flagged with last_verified dates and confidence labels.

### Gaps to Address

- **Zero-Touch portal UI:** Verify at plan time before Phase 35/39 authoring.
- **Enrollment token expiry:** Confirm 90-day max against current MS Learn before stating as a constraint. If unconfirmable, document as community-consensus with MEDIUM label.
- **COPE language:** Verify exact Google phrasing for WPCO recommendation at Phase 36 plan time.
- **adb commands:** Phase 42 L2 log collection guide must either verify adb commands against official source or label MEDIUM/LOW confidence explicitly in the document.
- **AOSP licensing:** Verify Intune Plan 2 / Suite requirement per OEM at Phase 40 plan time before publishing enrollment guide with licensing notes.

---

## Sources

### Primary (HIGH confidence)
- Microsoft Learn - Connect Intune to Managed Google Play: updated 2025-11-11, fetched 2026-04-19
- Microsoft Learn - Android enrollment guide: updated 2024-04-23, fetched 2026-04-19
- Microsoft Learn - Enroll dedicated, fully managed, COPE devices (ref-corporate-methods): updated 2025-12-04, fetched 2026-04-19
- Microsoft Learn - Set up dedicated devices: updated 2025-05-08, fetched 2026-04-19
- Microsoft Learn - Set up personal work profile: updated 2024-10-28, fetched 2026-04-19
- Microsoft Learn - AOSP supported devices: updated 2025-05-12, fetched 2026-04-19
- Microsoft Learn - Add corporate identifiers: updated 2025-04-11, fetched 2026-04-19
- Microsoft Learn - Intune network endpoints: updated 2026-03-24, fetched 2026-04-19
- Microsoft Learn - Android Enterprise compliance settings: search-verified
- Microsoft Learn - MAM vs Work Profiles: updated 2026-04-17, fetched 2026-04-19
- Microsoft Learn - AOSP userless enrollment: updated 2025-05-15, fetched 2026-04-19
- Microsoft Community Hub - AMAPI migration announcement for Android personally-owned work profile
- Google - Zero-Touch enrollment for IT admins: fetched 2026-04-19
- Google Developers - Zero-touch known issues (dual-SIM IMEI, KME mutual exclusion)
- Samsung Knox - KME + ZT mutual exclusion documentation

### Secondary (MEDIUM confidence)
- Jason Bayton - Android Enterprise provisioning methods, FAQ, Android 11 COPE changes, Android 15 enterprise: bayton.org/android/
- Google Android Enterprise Help - Zero-touch getting started (community-hosted): androidenterprise.community

### Tertiary (LOW confidence)
- uem4all.com - adb logcat for Intune Android Enterprise debugging: requires official verification before inclusion in L2 runbooks

---

*Research completed: 2026-04-19*
*Research files: .planning/research/STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md*
*Ready for roadmap: yes - roadmapper should start at Phase 34*
