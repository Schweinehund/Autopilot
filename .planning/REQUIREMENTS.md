# Requirements: v1.4 Android Enterprise Enrollment Documentation

**Defined:** 2026-04-19
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, and Android devices through Intune without escalating to engineering — covering Android Enterprise enrollment modes (Zero-Touch, Fully Managed, BYOD Work Profile, Dedicated) plus AOSP stub, with role-appropriate documentation.

## v1.4 Requirements

Requirements for the Android Enterprise milestone. Each maps to roadmap phases (34-42). Scope was refined via adversarial review — trimmed items tracked below under "Future Requirements" and "Out of Scope."

### Foundation (AEBASE)

Glossary, admin template, reference matrices, and enrollment overview — prerequisites for all mode-specific content.

- [ ] **AEBASE-01**: Intune admin can read an Android Enterprise glossary (`docs/_glossary-android.md`) that disambiguates 13 terms colliding with existing Windows/macOS/iOS glossaries (work profile, supervision, user enrollment, dedicated, corporate identifiers, etc.)
- [ ] **AEBASE-02**: Intune admin can read an Android enrollment overview (`docs/android-lifecycle/00-enrollment-overview.md`) explaining the two orthogonal axes — ownership (corporate vs personal) and management scope (fully managed, work profile, dedicated, AOSP) — with a supervision analog explanation for admins familiar with iOS
- [ ] **AEBASE-03**: Intune admin can read a provisioning-method matrix (`docs/android-lifecycle/02-provisioning-methods.md`) comparing NFC / QR / DPC identifier (afw#setup) / Zero-Touch across all supported modes with Android version availability
- [ ] **AEBASE-04**: Intune admin can read an Android version fragmentation matrix (`docs/android-lifecycle/03-android-version-matrix.md`) showing minimum OS per mode and notable version breakpoints (Android 11 COPE NFC removal, Android 12 IMEI removal, Android 15 FRP hardening)
- [ ] **AEBASE-05**: Doc author can reference a tri-portal admin template (`docs/_templates/admin-template-android.md`) with H4 sub-sections for Intune admin center / Managed Google Play / Zero-Touch portal — this template is used by all Android admin setup guides

### Prerequisites (AEPREQ)

Managed Google Play binding and Zero-Touch portal — hard gates for corporate GMS-based modes and Zero-Touch Enrollment respectively.

- [ ] **AEPREQ-01**: Intune admin can read an Android prerequisites doc (`docs/android-lifecycle/01-android-prerequisites.md`) summarizing the tri-portal surface, GMS vs AOSP split, and corporate-identifier behavior with Android 12+ IMEI/serial removal
- [ ] **AEPREQ-02**: Intune admin can read an admin setup overview (`docs/admin-setup-android/00-overview.md`) describing the correct tri-portal setup sequence and per-mode portal dependencies
- [ ] **AEPREQ-03**: Intune admin can bind a tenant to Managed Google Play (`docs/admin-setup-android/01-managed-google-play.md`) using an Entra account (preferred since August 2024), starting from `endpoint.microsoft.com` (not `intune.microsoft.com`), with a "what breaks" table covering disconnect consequences
- [ ] **AEPREQ-04**: Intune admin can configure the Zero-Touch portal (`docs/admin-setup-android/02-zero-touch-portal.md`) with reseller requirement as Step 0, portal navigation, DPC extras JSON, ZT-Intune linking, and KME/ZT mutual-exclusion callout for Samsung devices

### Fully Managed COBO (AECOBO)

Corporate-owned Fully Managed mode admin setup with COPE migration note and Android 15 FRP callout.

- [ ] **AECOBO-01**: Intune admin can provision a Fully Managed (COBO) corporate device (`docs/admin-setup-android/03-fully-managed-cobo.md`) via any of the four provisioning methods (QR, NFC, DPC identifier, Zero-Touch) with enrollment profile, token management, and Entra join behavior documented
- [ ] **AECOBO-02**: Intune admin can read a COPE migration note inside the COBO guide using Google's current language ("Google recommends WPCO") rather than "COPE deprecated"
- [ ] **AECOBO-03**: Intune admin can read an Android 15 Factory Reset Protection (FRP) callout in the COBO guide explaining how FRP hardening affects re-enrollment and how to configure Enterprise FRP via Intune policy

### BYOD Work Profile (AEBYOD)

BYOD Work Profile on Personally-Owned devices — tier-inverted content (end-user-initiated enrollment) sourced post-AMAPI migration (April 2025).

- [ ] **AEBYOD-01**: Intune admin can configure BYOD Work Profile enrollment (`docs/admin-setup-android/04-byod-work-profile.md`) with enrollment restrictions, work profile policy, data transfer controls, and privacy boundary table (what admin CAN vs CANNOT see on personal side)
- [ ] **AEBYOD-02**: End user can self-enroll a personal Android device (`docs/end-user-guides/android-work-profile-setup.md`) via Company Portal with plain-language steps and a "what IT can/cannot see" section — no Intune portal steps referenced
- [ ] **AEBYOD-03**: Intune admin can read an AMAPI migration callout in the BYOD admin guide explaining custom OMA-URI removal, Wi-Fi cert-auth requirement, and management app change (from Company Portal to Microsoft Intune app)

### Dedicated Devices (AEDED)

Kiosk/COSU dedicated device mode with Managed Home Screen configuration and persona callouts.

- [ ] **AEDED-01**: Intune admin can provision a Dedicated (kiosk/COSU) device (`docs/admin-setup-android/05-dedicated-devices.md`) with persona callout (Intune Admin + LOB Operations Owner), scenario overview (single-app / multi-app / digital signage / Entra shared device mode), enrollment profile, and MHS exit-PIN sync requirement documented
- [ ] **AEDED-02**: Intune admin can read a Managed Home Screen exit-PIN synchronization callout explaining that exit-kiosk PIN must match between device restrictions profile and Managed Home Screen app config or the user will hit a visible error
- [ ] **AEDED-03**: Intune admin can read an Android 15 FRP callout in the Dedicated guide describing FRP behavior during factory-reset re-provisioning

### Zero-Touch Enrollment (AEZTE)

Zero-Touch corporate-scale enrollment (ADE-equivalent) admin guide building on the Phase 35 ZT portal doc.

- [x] **AEZTE-01**: Intune admin can deploy Zero-Touch Enrollment with mode-specific admin content (extending the Phase 35 ZT portal doc) — reseller-upload handoff, device claim workflow, profile assignment, dual-SIM IMEI 1 note, and KME/ZT mutual-exclusion callout

### AOSP Stub (AEAOSP)

Hard-scoped stub with OEM matrix and scope guard — full coverage deferred to v1.4.1.

- [x] **AEAOSP-01**: Intune admin can read an AOSP stub guide (`docs/admin-setup-android/06-aosp-stub.md`) with explicit scope callout ("stub in v1.4; full v1.4.1"), what AOSP is, when to use it, OEM matrix from MS Learn (RealWear confirmed GA), QR-only enrollment note, one-device-at-a-time note, Wi-Fi credential embedding requirement (RealWear-specific), and deferred-content table

### L1 Triage and Runbooks (AEL1)

Mode-first L1 decision tree plus 6 scenario runbooks (one shared with AEZTE).

- [ ] **AEL1-01**: L1 Service Desk agent can triage an Android enrollment/compliance symptom using a mode-first decision tree (`docs/decision-trees/08-android-triage.md`) that asks enrollment mode before symptom
- [ ] **AEL1-02**: L1 Service Desk agent can resolve an "Android enrollment blocked" ticket using a runbook with D-10 actor-boundary section and D-12 escalation packet (runbook 22)
- [ ] **AEL1-03**: L1 Service Desk agent can resolve a "Work profile not created" ticket using a runbook with D-10/D-12 sections (runbook 23)
- [ ] **AEL1-04**: L1 Service Desk agent can resolve a "Device not enrolled" ticket using a runbook with D-10/D-12 sections (runbook 24)
- [ ] **AEL1-05**: L1 Service Desk agent can resolve a "Compliance access blocked" ticket using a runbook with D-10/D-12 sections (runbook 25)
- [ ] **AEL1-06**: L1 Service Desk agent can resolve a "Managed Google Play app not installed" ticket using a runbook with D-10/D-12 sections (runbook 26)
- [ ] **AEL1-07**: L1 Service Desk agent can resolve a "Zero-Touch enrollment failed" ticket using a runbook with D-10/D-12 sections (runbook 27)
- [ ] **AEL1-08**: L1 index (`docs/l1-runbooks/00-index.md`) has Android section appended with no modification to existing Windows/macOS/iOS sections

### L2 Investigation (AEL2)

L2 log-collection guide plus 3 investigation runbooks.

- [ ] **AEL2-01**: L2 Desktop Engineering can collect Android diagnostic logs (`docs/l2-runbooks/18-android-log-collection.md`) using Company Portal logs, Microsoft Intune app logs, and adb logcat — with confidence labels on any commands not sourced from official Microsoft Learn
- [ ] **AEL2-02**: L2 Desktop Engineering can investigate an Android work profile enrollment failure (`docs/l2-runbooks/19-android-enrollment-investigation.md`) with structured diagnostic steps
- [ ] **AEL2-03**: L2 Desktop Engineering can investigate an Android app install failure (`docs/l2-runbooks/20-android-app-install-investigation.md`) covering Managed Google Play app states, license assignment, and MAM intersection
- [ ] **AEL2-04**: L2 Desktop Engineering can investigate Android compliance and Conditional Access timing (`docs/l2-runbooks/21-android-compliance-investigation.md`) using Play Integrity verdicts (not SafetyNet — deprecated January 2025)
- [ ] **AEL2-05**: L2 index (`docs/l2-runbooks/00-index.md`) has Android section appended with no modification to existing Windows/macOS/iOS sections

### Integration and Audit (AEAUDIT)

Capability matrix, index.md stub, glossary cross-reference, and milestone audit.

- [ ] **AEAUDIT-01**: Intune admin can read an Android capability matrix (`docs/reference/android-capability-matrix.md`) comparing modes by feature with cross-platform comparison column (supervision vs Android fully managed, ADE vs Zero-Touch, etc.)
- [ ] **AEAUDIT-02**: Navigation hub (`docs/index.md`) has an Android stub section with "Choose Your Platform" entry and H2 pointing to android-lifecycle — existing Windows/macOS/iOS sections untouched
- [ ] **AEAUDIT-03**: Cross-platform glossary (`docs/_glossary-macos.md`) has a 1-line see-also cross-reference to `_glossary-android.md` — no other modifications
- [ ] **AEAUDIT-04**: Milestone audit passes all Android-specific checks: no SafetyNet references in Android docs (use Play Integrity), no "supervision" term used for Android (use "fully managed"), AOSP stub word-count within scope guard, no Android links in deferred shared files (common-issues.md, quick-ref-l1.md, quick-ref-l2.md), all Android docs have `last_verified` frontmatter

## Future Requirements

Acknowledged but deferred to v1.4.1 or later. Not in current roadmap.

### Knox Mobile Enrollment (v1.4.1) — AEKNOX

- **AEKNOX-01**: Samsung admin can configure Knox Mobile Enrollment portal (`docs/admin-setup-android/knox-mobile-enrollment.md`) for Samsung device fleets
- **AEKNOX-02**: L1 Service Desk agent can triage Knox Mobile Enrollment failures with KME-specific runbooks
- **AEKNOX-03**: Intune admin can read Knox Platform for Enterprise licensing gating callouts
- **AEKNOX-04**: Intune admin can read KME vs Zero-Touch decision tree (extending Phase 35 mutual-exclusion callout)

### COPE Full Path (v1.4.1 if non-deprecated; else drop) — AECOPE

- **AECOPE-01**: Intune admin can configure COPE (Corporate-Owned Work Profile) as a standalone admin setup doc rather than a migration note in COBO — only if Google has not formally deprecated COPE by v1.4.1 planning

### AOSP Full Coverage (v1.4.1) — AEAOSPFULL

- **AEAOSPFULL-01**: Intune admin can configure AOSP user-associated enrollment with OEM-specific prerequisites
- **AEAOSPFULL-02**: Intune admin can configure AOSP userless (shared-device) enrollment
- **AEAOSPFULL-03**: L1/L2 teams can triage AOSP-specific failures with OEM-aware runbooks
- **AEAOSPFULL-04**: Intune admin can read full AOSP OEM support matrix with per-OEM prereqs (RealWear, Zebra, Pico, HTC VIVE Focus, Meta Quest, others)

### Cross-Platform Navigation Integration (post-v1.4 unification task) — AENAVUNIFY

- **AENAVUNIFY-01**: L1 Service Desk agent can find Android symptoms in `docs/common-issues.md` with platform-selector routing
- **AENAVUNIFY-02**: L1 quick-ref card (`docs/quick-ref-l1.md`) has Android section integrated alongside Windows/macOS/iOS
- **AENAVUNIFY-03**: L2 quick-ref card (`docs/quick-ref-l2.md`) has Android section integrated
- **AENAVUNIFY-04**: `docs/index.md` has full Android H2 section (not just stub) with complete cross-platform navigation

### 4-Platform Comparison Document (v1.5) — AECOMPARE

- **AECOMPARE-01**: Intune admin can read a consolidated Windows/macOS/iOS/Android comparison document covering enrollment paths, admin portals, capabilities, and operational characteristics

## Out of Scope

Explicitly excluded for v1.4. Documented to prevent scope creep and re-addition.

| Feature | Reason |
|---------|--------|
| Samsung E-FOTA firmware management | Orthogonal to Intune enrollment; managed by Samsung services, not Intune |
| Samsung DeX MDM management | OEM-specific feature outside generic Intune scope |
| Samsung Knox Workspace | Distinct from Android Enterprise Work Profile; OEM-specific container |
| Google Workspace binding to Managed Google Play | Entra account binding is the recommended path since August 2024 |
| SafetyNet attestation | Deprecated by Google January 2025; use Play Integrity API only |
| Custom OMA-URI profiles for BYOD Work Profile | Removed from Intune April 2025 (AMAPI migration); document AMAPI-based policy instead |
| Android Device Administrator (DA) legacy mode | Deprecated since Android 10 for new enrollments; mention only as exclusion in glossary |
| Android TV management | Specialized device class outside Intune scope |
| Android Auto management | Automotive device class outside Intune scope |
| Wear OS management | Wearable device class outside Intune scope |
| Chrome OS management | Managed via Google Admin Console, not Intune |
| Intune Linux comparison | Not a comparable enrollment-provisioning platform (endpoint security only) |
| Localization / non-English content | Consistent with v1.0-v1.3 English-only policy |
| Screenshot/visual evidence for admin portals | Consistent with v1.0-v1.3 text-first documentation policy |
| QR code images embedded in docs | QR codes expire / are tenant-specific; document generation, not fixed images |

## Traceability

Which phases cover which requirements. Populated by roadmapper at roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AEBASE-01 | Phase 34 | Pending |
| AEBASE-02 | Phase 34 | Pending |
| AEBASE-03 | Phase 34 | Pending |
| AEBASE-04 | Phase 34 | Pending |
| AEBASE-05 | Phase 34 | Pending |
| AEPREQ-01 | Phase 35 | Pending |
| AEPREQ-02 | Phase 35 | Pending |
| AEPREQ-03 | Phase 35 | Pending |
| AEPREQ-04 | Phase 35 | Pending |
| AECOBO-01 | Phase 36 | Pending |
| AECOBO-02 | Phase 36 | Pending |
| AECOBO-03 | Phase 36 | Pending |
| AEBYOD-01 | Phase 37 | Pending |
| AEBYOD-02 | Phase 37 | Pending |
| AEBYOD-03 | Phase 37 | Pending |
| AEDED-01 | Phase 38 | Pending |
| AEDED-02 | Phase 38 | Pending |
| AEDED-03 | Phase 38 | Pending |
| AEZTE-01 | Phase 39 | Complete |
| AEAOSP-01 | Phase 39 | Complete |
| AEL1-01 | Phase 40 | Pending |
| AEL1-02 | Phase 40 | Pending |
| AEL1-03 | Phase 40 | Pending |
| AEL1-04 | Phase 40 | Pending |
| AEL1-05 | Phase 40 | Pending |
| AEL1-06 | Phase 40 | Pending |
| AEL1-07 | Phase 40 | Pending |
| AEL1-08 | Phase 40 | Pending |
| AEL2-01 | Phase 41 | Pending |
| AEL2-02 | Phase 41 | Pending |
| AEL2-03 | Phase 41 | Pending |
| AEL2-04 | Phase 41 | Pending |
| AEL2-05 | Phase 41 | Pending |
| AEAUDIT-01 | Phase 42 | Pending |
| AEAUDIT-02 | Phase 42 | Pending |
| AEAUDIT-03 | Phase 42 | Pending |
| AEAUDIT-04 | Phase 42 | Pending |

**Coverage:**
- v1.4 requirements: 37 total
- Mapped to phases: 37 (100%)
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-19*
*Last updated: 2026-04-19 — traceability table populated by roadmapper; 9 phases (34-42); 37/37 requirements mapped*
