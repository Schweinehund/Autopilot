# Feature Research: Android Enterprise Enrollment Documentation (v1.4)

**Domain:** Android Enterprise enrollment documentation — Intune-managed Android devices across Zero-Touch, Fully Managed (COBO), BYOD Work Profile, Dedicated (kiosk/COSU), and AOSP modes
**Researched:** 2026-04-19
**Confidence:** HIGH (Microsoft Learn primary, Google Android Enterprise secondary, cross-validated)

---

## Preamble: Android Enterprise is More Complex Than iOS

iOS/iPadOS enrollment has one management axis (supervised vs unsupervised) and four paths. Android Enterprise has two independent axes:

- **Ownership model axis:** Personally-owned (BYOD) vs Corporate-owned
- **Management scope axis:** Fully managed (whole device) vs Work profile (containerized) vs Dedicated (locked single-use) vs AOSP (no GMS)

These axes combine into five distinct enrollment modes in Intune. Additionally, Android introduces an **orthogonal provisioning-method axis** — the *how* of enrollment is separate from the *what* of enrollment, with QR code, NFC, DPC identifier, and Zero-Touch each applicable to different modes.

The critical prerequisite that has no iOS equivalent: **Managed Google Play binding**. All Android Enterprise GMS modes require connecting the Intune tenant to a Google enterprise account before any enrollment profile can be created. This is a prerequisite gate for four of the five in-scope modes.

---

## Prerequisite: Managed Google Play Binding

### What It Is

The Managed Google Play binding is a one-time connection between the Intune tenant and a Google enterprise account (Google Admin account). Without it, no Android Enterprise enrollment modes work — not BYOD work profiles, not Fully Managed, not Dedicated. AOSP is the only in-scope mode that does not require it.

**What the binding enables:**
- Enrollment profile creation for all GMS-based modes
- Automatic deployment of Microsoft Intune app, Company Portal, Microsoft Authenticator, and Managed Home Screen to enrolled devices
- Managed Google Play store (curated app catalog for work profile and fully managed devices)
- App approval, assignment, and silent deployment via Intune

**How to connect (Intune admin center):**
1. Devices > Enrollment > Android tab > Prerequisites > Managed Google Play
2. Accept data sharing terms (Microsoft shares user/device info with Google — must disclose in privacy policy)
3. Launch Google to connect now — signs in with Microsoft Entra account (as of August 2024, Entra account preferred over Gmail)
4. Create Google Admin account, grant Microsoft Intune device management permission
5. After binding: four Microsoft apps automatically appear in Managed Google Play app list

**Token/renewal behavior:**
- The binding itself does not expire on a fixed schedule, but enrollment tokens created per mode (Dedicated, Fully Managed) have configurable expiry up to 65 years for standard tokens, and **90-day maximum for AOSP tokens**
- Disconnecting the binding disables all Android Enterprise GMS management for the tenant; enrolled devices lose management
- As of 2024, Microsoft Entra account replaces Gmail requirement for the binding

**Complexity:** Simple (one-time setup, iframe-based)
**Confidence:** HIGH — Microsoft Learn (connect-managed-google-play, updated 2026-04-16)

---

## Enrollment Mode Deep-Dives

### Mode 1: Zero-Touch Enrollment

**What it is:** Google's automated enrollment equivalent to Apple's ADE/ABM. Devices purchased from authorized Zero-Touch resellers arrive pre-configured with an enterprise assignment. On first power-on, the device automatically downloads the DPC app and completes enrollment without user interaction.

**Admin portals involved (tri-portal pattern):**
1. **Zero-Touch portal** (enterprise.google.com/android/zero-touch) — Reseller registers devices; admin creates configurations linking DPC + enrollment token + support info
2. **Managed Google Play** (play.google.com/work) — App approval and curation
3. **Intune admin center** — Enrollment profiles, token generation, Zero-Touch iframe linking

**Admin workflow:**
1. Provide Google Account (Entra-linked) to reseller when purchasing devices
2. Reseller adds devices to Zero-Touch customer account
3. In Intune: Devices > Android > Enrollment > Bulk enrollment methods > Zero-touch enrollment
4. Link Zero-Touch account via iframe
5. Default configuration created automatically (targets Fully Managed; must use portal directly for Dedicated or COPE configurations)
6. Export enrollment token JSON from Intune; paste into Zero-Touch portal DPC extras field

**DPC extras JSON format (Intune-specific):**
```json
{
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
  "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    "com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "<EnrollmentToken>"
  }
}
```

**Device-side unboxing experience:**
- Device powers on, checks for Zero-Touch configuration via GMS
- If configuration found: downloads Android Device Policy (CloudDPC), applies enrollment, no user setup interaction required
- If no configuration found: normal consumer OOBE

**Android version minimum:** Android 8.0 (Oreo) minimum; Android 9+ recommended for QR-based fallback
**GMS requirement:** Yes — Zero-Touch requires Google Mobile Services connectivity
**Modes it applies to:** Fully Managed (default), Dedicated devices, COPE (requires direct portal config)

**Failure modes:**
- Device not in Zero-Touch portal: device boots to consumer OOBE; admin must manually re-register with reseller
- Wrong DPC extras JSON: enrollment silently fails or lands in wrong mode
- GMS not reachable on corporate network: enrollment stalls at DPC download step
- Default configuration overrides dedicated/COPE intent: linking account to Intune creates a Fully Managed default; must configure directly in Zero-Touch portal for other modes

**Confidence:** HIGH — Google Zero-Touch for IT admins doc + Intune ref-corporate-methods (updated 2026-04-16)

---

### Mode 2: Fully Managed / COBO (Corporate-Owned, Business-Only)

**What it is:** Organization-owned device associated with a single user, used exclusively for work. The MDM controls the entire device — no personal profile, no personal apps unless admin explicitly permits them. This is the maximum-control corporate enrollment mode.

**Prerequisites:**
- Managed Google Play binding complete
- Factory reset or new device (existing enrolled device must be wiped first)
- Android 10.0+ (hard requirement for Intune COBO enrollment)
- GMS connectivity

**Provisioning methods (all four apply):**
- NFC bump (Android 6+, NFC-capable hardware)
- QR code (Android 7+ manual; Android 9+ built-in QR reader — no app install required)
- DPC identifier afw#setup (enters Android Device Policy download flow)
- Zero-Touch (corporate fleet automation)

**Enrollment token:**
- Created in Intune admin center as part of enrollment profile
- Two token types: Standard (up to 65-year expiry) and Staging token (up to 65-year expiry; supports third-party pre-provisioning workflow; does NOT support enrollment time grouping)
- Token exported as 20-digit string and QR code
- Revoke or replace token without affecting already-enrolled devices

**Device-side enrollment flow:**
1. Factory reset device (required)
2. On Welcome screen: tap 7 times to trigger QR / NFC / enter afw#setup
3. For QR: scan enrollment profile QR code from Intune
4. Microsoft Authenticator auto-installs (required, cannot be uninstalled)
5. User signs in with Entra credentials
6. Enrollment profile applies; device locks to work-only posture

**Management capabilities:**
- Block personal app installation (Managed Google Play only)
- Block users from factory resetting via Settings (configurable)
- Block users from uninstalling managed apps
- Full device compliance evaluation
- Certificate deployment (SCEP/PKCS)
- Wi-Fi/VPN configuration
- OS update enforcement
- Full remote wipe

**Factory Reset Protection (FRP) behavior:**
- Fully Managed: FRP does NOT apply to Settings > Factory data reset (no FRP protection). FRP DOES apply via recovery/bootloader reset. Intune wipe does not trigger FRP.
- Important for kiosk re-provisioning: factory reset via Settings is safe from FRP lock-in; recovery mode reset requires Google account credential

**COPE note (in-scope as stub only):**
COPE (Corporate-Owned, Personally Enabled / Android Enterprise corporate-owned work profile) uses the same enrollment methods as COBO but creates a work profile on a corporate device that also allows a personal profile. COPE requires Android 11+ due to a Google API change that removed NFC and token (afw#setup) as valid provisioning methods for COPE on Android 11+. Google's trajectory is toward WPCO (Work Profile on Corporate-Owned) as the successor terminology. v1.4 covers COPE only as a migration/deprecation note within the COBO documentation.

**Complexity:** Moderate
**Confidence:** HIGH — MS Learn setup-fully-managed (updated 2025-05-08, gitcommit 2026-04-16), ref-corporate-methods (updated 2025-12-04)

---

### Mode 3: BYOD Work Profile on Personally-Owned Devices

**What it is:** The primary BYOD enrollment path for Android. Company Portal creates a containerized work profile partition on the user's personal device. Work apps and data are isolated in the work profile; the personal profile is visible to the user but invisible to IT.

**Prerequisites:**
- Managed Google Play binding complete
- User installs Company Portal from Google Play Store (personal profile side)
- No factory reset required — can enroll existing in-use device
- Android 5.0+ (basic work profile support); Android 8+ strongly recommended for Intune; practical minimum is Android 8.0

**End-user enrollment flow:**
1. User opens Google Play Store on personal device
2. Installs Company Portal (com.microsoft.windowsintune.companyportal)
3. Opens Company Portal, signs in with Entra work credentials
4. Company Portal initiates work profile creation at OS level
5. Work profile appears as a separate container (badged apps with work briefcase icon)
6. Enrollment profile applies to work profile; personal profile untouched

**Work badge (dual app icons):**
- Every app available in both personal and work contexts shows a duplicate with a work badge (briefcase icon on the app icon)
- Users see two copies of apps like Chrome, Gmail, Outlook — one personal, one managed
- Work profile apps are isolated: data does not cross profiles by default

**Profile separation boundaries:**
- Copy/paste between profiles: blocked by default in work profile policy (configurable)
- File sharing between profiles: blocked by default (configurable)
- App data: completely isolated at OS level — personal apps cannot read work app data and vice versa
- Notifications: work profile notifications appear in system notification shade with work badge
- Work profile can be paused by user (Android 7+): all work apps become inactive, notifications stop

**Privacy limitations — what admin CANNOT see on personal side:**
- Personal app list: Intune cannot inventory apps installed in the personal profile
- Personal data: photos, contacts, SMS, call logs, personal app data — none accessible to IT
- Location (personal side): cannot track device location beyond what compliance policy permits
- UDID/hardware identifiers: available at device level (unlike iOS User Enrollment which blocks IMEI collection)
- Personal browsing history: not accessible

**What admin CAN see/control on the whole device:**
- Device serial number and IMEI (device-level, unlike iOS UE)
- Installed work profile apps
- Work profile compliance state
- Device hardware info (model, OS version)
- Enrollment status
- Remote work profile wipe (removes work profile; leaves personal profile intact)
- Device-level passcode enforcement (can require device PIN, but cannot see the PIN)

**MAM intersection:**
- MAM app protection policies (APP) and work profile are **complementary, not mutually exclusive**
- APP enforces policy at the app layer; work profile enforces at the profile/OS layer
- For enrolled work profile devices, APP PIN prompt can be suppressed to avoid double PIN (device PIN + APP PIN)
- MAM without enrollment (MAM-WE) is appropriate when: legal/liability reasons prohibit enrollment, GMS unavailable (e.g., China), or user refuses MDM enrollment

**Data transfer restrictions:**
- Work profile policy can control: copy/paste between profiles, opening work documents in personal apps, sharing work files to personal side
- "Open in allowed browsers" and "Transfer to unmanaged apps" settings on work profile restrict data egress
- Cross-profile data transfer is allowed by default on some OEM implementations; must be explicitly blocked in policy

**Android 15 private space note:**
Private space (Android 15 feature) is treated as personal profile. Intune does not support MDM within private space. If user attempts to enroll private space separately, a second DA enrollment record appears in admin center — unsupported scenario.

**Complexity:** Moderate (enrollment is simple; data transfer policy surface is wide)
**Confidence:** HIGH — MS Learn setup-personal-work-profile (updated 2026-04-16), mam-vs-work-profiles-android (updated 2026-04-17)

---

### Mode 4: Dedicated Devices (Kiosk / COSU)

**What it is:** Organization-owned, userless or shared-user device locked to a single app or curated set of apps (kiosk mode). Commonly used for digital signage, inventory scanning, ticket printing, customer-facing kiosks. Previously known as COSU (Corporate-Owned, Single-Use).

**Prerequisites:**
- Managed Google Play binding complete
- Factory reset required
- Android 8.0+ (device requirement for dedicated device management)
- GMS connectivity

**Provisioning methods:**
- QR code (primary recommended method for most scenarios)
- NFC (Android 6+, NFC-capable hardware)
- Token / DPC identifier afw#setup
- Zero-Touch (corporate fleet automation)

**Kiosk configuration options:**

**Single-app kiosk:**
- Android's Lock Task Mode pins a single app to the foreground
- User cannot leave the app, access notification shade, use back/home navigation, or access Settings
- Device restarts into the kiosk app after reboot
- Hardware keys (volume, power) behavior is configurable

**Multi-app kiosk (Managed Home Screen):**
- Managed Home Screen (MHS) app (com.microsoft.launcher.enterprise) replaces the device launcher
- Admins configure an allowlist of approved apps; MHS displays only those apps
- Users can navigate between approved apps but cannot exit to standard Android launcher
- MHS shows a lock screen with org branding and support contact info
- Exit kiosk requires admin PIN (4-6 digit numeric; must be configured in both device restriction policy AND MHS app config — mismatch causes "PIN not set" error)

**Lock Task Mode mechanics:**
- Enabled by setting the Device Experience profile in Intune (device restrictions > kiosk mode)
- Requires the kiosk app to be in the Lock Task allowlist (set via Intune device restrictions profile)
- App crashes or force-stops in Lock Task Mode: device shows black screen or returns to MHS; device restarts automatically into kiosk if configured

**Entra shared device mode option:**
- Token type "Corporate-owned dedicated device with Microsoft Entra ID shared mode" deploys Microsoft Authenticator into shared device mode
- Enables single sign-in and sign-out across Entra-integrated apps (Teams, Power Apps, etc.)
- Appropriate for shared-shift-worker devices where multiple users sign into the same physical device

**Common failure modes:**
- **Exit kiosk PIN mismatch:** Exit kiosk PIN must match in both the device restrictions config profile AND the MHS app configuration. If only set in one place, users see "a PIN to exit kiosk mode has not been set by your IT admin"
- **App crash in Lock Task Mode:** Lock Task Mode does not recover automatically unless the DPC is configured to restart the app. Requires Intune device restrictions to re-launch app on crash.
- **User accessing kiosk exit via repeated back button:** MHS provides back-button pin that eventually reaches the exit-PIN prompt — expected behavior. Admin PIN prevents unauthorized exit.
- **Factory Reset Protection after Settings reset:** Dedicated devices do NOT have FRP for Settings > Factory data reset. FRP applies only via recovery/bootloader reset. Intune wipe bypasses FRP.
- **GMS offline behavior:** Managed Google Play app updates require GMS connectivity. Kiosk device offline for extended periods will not receive app updates. Compliance policies that require app version minimum will fail.
- **Token expiry during re-enrollment:** If enrollment token expires, the QR code changes. Stale QR code printed on laminated cards or posted at locations will fail. Plan token rotation.

**Complexity:** Complex (configuration surface for kiosk is wide; MHS has its own app config layer; exit-PIN synchronization is error-prone)
**Confidence:** HIGH — MS Learn setup-dedicated (updated 2025-05-08), ref-corporate-methods (updated 2025-12-04); MHS PIN failure pattern MEDIUM — community reports

---

### Mode 5: AOSP Device Management (Stub)

**What it is:** Management of Android devices that do not include Google Mobile Services — typically specialized AR/VR headsets, ruggedized industrial devices, and wearables. These devices run Android built from the Android Open Source Project without the GMS layer that enables standard Android Enterprise features.

**When to use AOSP enrollment (not Android Enterprise):**
- Device has no Google Mobile Services (verified: no Google Play Store, no Google account support)
- Device is in a region where GMS is unavailable (e.g., mainland China)
- Device is a specialized industrial/AR/VR device from the supported OEM matrix

**Supported OEM matrix (Intune GA, as of 2025-05-12):**

| OEM | Device | Form Factor | Min Firmware |
|-----|--------|-------------|--------------|
| DigiLens | ARGO | AR Headset | DigiOS 2068 |
| HTC | Vive Focus 3 | AR/VR Headset | 5.2 - 5.0.999.624 |
| HTC | Vive XR Elite | AR/VR Headset | 4.0 - 1.0.999.350 |
| HTC | Vive Focus Vision | AR/VR Headset | 7.0.999.159 |
| Lenovo | ThinkReality VRX | AR/VR Headset | VRX_user_S766001_... |
| Meta | Quest 2 | VR Headset | v49 (select regions) |
| Meta | Quest 3 | VR Headset | v59 (select regions) |
| Meta | Quest 3s | VR Headset | v71 |
| Meta | Quest Pro | VR Headset | v49 (select regions) |
| PICO | PICO 4 Enterprise | AR/VR Headset | PUI 5.6.0 |
| PICO | Neo3 Pro/Eye | AR/VR Headset | PUI 4.8.19 |
| RealWear | HMT-1 / HMT-1Z1 | Head-mounted display | 11.2 |
| RealWear | Navigator 500 | Head-mounted display | 1.1 |
| Vuzix | Blade 2 / M400 / M4000 | Smart Glasses | Various |
| Zebra | WS50 | Wearable Scanner | 11-49-15.00 |

Note: Zebra AOSP support is limited to the WS50 wearable scanner. Zebra's primary TC series devices use Android Enterprise (GMS), not AOSP.

**Two AOSP sub-modes:**
- **User-associated:** Single user per device; user signs in with Entra credentials; Microsoft Authenticator + Company Portal deploy automatically; SSO via Entra shared device mode
- **Userless:** Shared device with no user account; no Entra sign-in; device used for specific tasks only; Microsoft Authenticator + Company Portal deploy; Entra shared device mode configured for multi-user SSO

**Enrollment method:** QR code only (no NFC, no Zero-Touch, no afw#setup for AOSP)
**Bulk enrollment:** NOT supported — one device at a time
**Token expiry:** 90-day maximum (shorter than GMS modes)
**Wi-Fi configuration required in enrollment profile:** RealWear devices lack auto-connect capability; SSID and pre-shared key must be embedded in the enrollment profile

**Feature parity gaps vs Android Enterprise (GMS modes):**
- No Managed Google Play (no GMS)
- No Work Profile (no profile container possible without GMS)
- Password complexity compliance: only "numeric" and "none" supported (alphabetic, alphanumeric, alphanumeric+symbols, weak biometric NOT enforceable)
- Device compliance reporting: not available for AOSP devices
- Bulk enrollment: not supported (one at a time)
- Not supported in Intune operated by 21Vianet (China sovereign cloud)

**Licensing note:** Specialized devices (AR/VR headsets) may require Microsoft Intune Plan 2 or Microsoft Intune Suite for "specialty device" management. Verify licensing per device type.

**Complexity:** Simple (enrollment flow) / Complex (OEM-specific behaviors, RealWear Wi-Fi requirement, limited troubleshooting surface)
**Confidence:** HIGH for OEM matrix and enrollment flow — MS Learn aosp-supported-devices (updated 2026-04-16), setup-aosp-corporate-userless (updated 2025-05-15); LOW for per-OEM behavioral quirks and failure catalog (sparse public docs)

---

## Provisioning-Method Axis Matrix

This matrix is orthogonal to the enrollment mode — it describes the *how* of enrollment, not the *what*.

| Method | COBO Fully Managed | COPE Corp Work Profile | COSU Dedicated | BYOD Work Profile | AOSP | Android Min Version | Notes |
|--------|-------------------|----------------------|----------------|-------------------|------|---------------------|-------|
| QR Code | YES | YES | YES | NO | YES | Android 7+ (9+ has built-in reader) | Primary recommended method; Android 9+ has preinstalled QR reader; Android 7-8 prompts reader install |
| NFC | YES | NO (Android 11+) | YES | NO | NO | Android 6+ with NFC hardware | Not supported for COPE on Android 11+; requires NFC Forum Type 2 Tag; 888+ bytes memory |
| DPC identifier (afw#setup) | YES | NO (Android 11+) | YES | NO | NO | Android 6+ | User types afw#setup at Google sign-in screen; downloads Android Device Policy; NOT supported for COPE on Android 11+ |
| Zero-Touch | YES | YES (portal config) | YES | NO | NO | Android 8+ (Oreo) | Corporate-only; requires authorized ZT reseller; device purchased via reseller |
| Company Portal app install | NO | NO | NO | YES | NO | Android 5+ (practical: 8+) | User self-service BYOD; user installs CP from Google Play, signs in with Entra credentials |
| Knox Mobile Enrollment | YES (Samsung only) | YES (Samsung only) | YES (Samsung only) | NO | NO | Knox-supported Android | Deferred to v1.4.1; requires Knox license |

**Key provisioning constraints:**
- BYOD Work Profile: only Company Portal flow — no NFC, QR, Zero-Touch at corporate device setup screen
- AOSP: only QR code — no other method
- NFC and afw#setup are disabled for COPE on Android 11+ by Google API change
- Zero-Touch requires reseller relationship established before device purchase; cannot retroactively add devices without reseller re-registration

---

## Android Version Matrix

Intune-enforced minimum OS versions per mode (as of April 2026):

| Enrollment Mode | Intune Minimum OS | Practical Recommended | Notable Version Breakpoints |
|-----------------|-------------------|----------------------|----------------------------|
| BYOD Work Profile | Android 5.0 | Android 8.0+ | Android 9+: built-in QR reader; Android 15: Private Space (unsupported) |
| Fully Managed (COBO) | Android 10.0 | Android 11+ | Android 10: hard Intune requirement; Android 11+: enrollment time grouping supported |
| Dedicated (COSU) | Android 8.0 | Android 10+ | Android 8.0: minimum; Android 9+: built-in QR reader |
| COPE (Corp Work Profile) | Android 8.0+ | Android 11+ | Android 11: NFC and afw#setup removed for COPE; all Android 11+ COPE must use QR or ZT |
| AOSP (userless/user-assoc) | Varies by OEM firmware | Per OEM matrix | Not an Android API level — OEM firmware specific |

**Confidence:** HIGH for Intune minimums (MS Learn setup-fully-managed: "Android OS version 10.0 and later", setup-dedicated: "Android OS version 8.0 or later"); MEDIUM for COPE 11+ NFC/token restriction (Google developer docs + Intune ref-corporate-methods note)

---

## Feature Landscape

### Table Stakes (Must-Have for v1.4)

Features the target audience (IT admins, L1, L2) will expect from Android documentation at parity with iOS v1.3 coverage. Missing these = documentation feels incomplete for an IT team deploying Android.

| Feature | Why Expected | Complexity | Dependencies | Confidence |
|---------|--------------|------------|--------------|------------|
| Android Enterprise enrollment path overview + ownership/management axis | Every platform has an overview doc; iOS had this in v1.3; critical for mode selection | Simple | None | HIGH |
| Managed Google Play binding prerequisite guide (tri-portal template) | Prerequisite for all GMS modes; must exist before any corporate enrollment guide | Simple | None | HIGH |
| Fully Managed (COBO) admin setup guide | Most common corporate enrollment mode; direct parallel to iOS ADE | Moderate | Managed Google Play binding guide | HIGH |
| Fully Managed (COBO) L1 triage runbook | L1 needs scripted triage for enrollment failures | Moderate | COBO admin guide | HIGH |
| Fully Managed (COBO) L2 investigation runbook | L2 needs token/profile troubleshooting steps | Moderate | COBO L1 runbook | HIGH |
| BYOD Work Profile end-user self-service guide | BYOD enrollment is user-initiated; L1 needs script to hand to users | Moderate | Managed Google Play binding guide | HIGH |
| BYOD Work Profile admin setup guide | Admin still configures enrollment restrictions, work profile policy | Moderate | Managed Google Play binding guide | HIGH |
| BYOD Work Profile L2 runbook | Work profile failures require log investigation (Company Portal logs, enrollment event logs) | Moderate | BYOD admin guide | HIGH |
| Dedicated device (COSU) admin setup guide + kiosk config | Kiosk deployment is complex; MHS config layering needs documentation | Complex | Managed Google Play binding guide | HIGH |
| Dedicated device (COSU) L1 triage runbook | Kiosk failure modes (MHS PIN, app crash, exit-kiosk) are common and well-defined | Moderate | Dedicated admin guide | HIGH |
| Dedicated device (COSU) L2 runbook | Advanced: enrollment token rotation, Lock Task Mode debugging | Moderate | Dedicated L1 runbook | HIGH |
| Zero-Touch Enrollment admin guide | Zero-Touch is the corporate scale-enrollment mechanism; no iOS equivalent but expected by enterprise admins | Moderate | Managed Google Play binding guide | HIGH |
| Zero-Touch L1/L2 triage content | ZT failures at device-unbox are critical; reseller-side vs Intune-side distinction needed | Moderate | ZT admin guide | HIGH |
| Android version fragmentation matrix | Android fragmentation is a known pain point; admins need version-to-mode compatibility reference | Simple | Research only | HIGH |
| Provisioning-method axis matrix (NFC/QR/DPC/ZT) | Orthogonal to mode selection; admins choose provisioning method based on hardware and scale | Simple | Research only | HIGH |
| AOSP stub guide (admin + triage) | AOSP devices (RealWear, PICO, HTC Vive, Zebra WS50) are in real deployments; stub prevents "not documented = not supported" assumption | Simple-Moderate | None (no MGP binding needed) | HIGH for OEM matrix; LOW for failure catalog |
| COPE migration/deprecation note | Admins inheriting COPE deployments need to know Google's direction; prevents COPE new deployments | Simple | COBO guide (inline note) | HIGH |

### Differentiators (High-Value Adds Beyond iOS/macOS Parity)

Features that go beyond the minimum and make this Android documentation distinctly more useful than generic MDM docs.

| Feature | Value Proposition | Complexity | Dependencies | Confidence |
|---------|-------------------|------------|--------------|------------|
| Per-mode "what breaks" callouts for Managed Google Play disconnect | MGP binding disconnect breaks all GMS modes silently; per-mode impact is non-obvious | Simple | Each mode's admin guide | HIGH |
| Tri-portal navigation guide (Intune + MGP + Zero-Touch portal) | Android is the first three-portal pattern in this suite; admins will be confused by tri-portal workflow | Moderate | MGP binding guide | HIGH |
| Work profile privacy-boundary table ("what admin CAN vs CANNOT see") | Privacy is top concern for BYOD Android deployments; explicit table prevents overreach and employee concerns | Simple | BYOD guide | HIGH |
| MHS exit-PIN synchronization callout | This is a well-documented operational failure; documenting the "both places must match" requirement prevents repeated escalations | Simple | Dedicated admin guide | MEDIUM |
| Factory Reset Protection behavior matrix per mode | FRP behavior differs by mode (COBO vs COPE vs Dedicated) and by reset method (Settings vs recovery vs Intune wipe); this is a pitfall-dense area | Simple | Each corp mode guide | HIGH |
| Enrollment token rotation runbook | AOSP tokens expire at 90 days; dedicated device tokens expire at admin-chosen date; rotation without disrupting enrolled devices is a common admin need | Moderate | AOSP + Dedicated guides | MEDIUM |
| Android 11+ COPE provisioning method restriction callout | NFC and afw#setup removed for COPE on Android 11+; admins with mixed Android-10/11 fleets will hit this unexpectedly | Simple | COPE deprecation note | HIGH |
| AOSP Wi-Fi credential embedding requirement (RealWear) | RealWear cannot auto-join Wi-Fi; enrollment profile must embed SSID + PSK; this is not obvious and causes silent enrollment failure | Simple | AOSP guide | MEDIUM (single OEM pattern, MS Learn confirmed) |

### Anti-Features (Explicitly OUT of v1.4)

| Anti-Feature | Why Requested | Why Out | What to Do Instead |
|--------------|---------------|---------|-------------------|
| Knox Mobile Enrollment (KME) full admin + L1/L2 docs | Samsung is dominant Android OEM; admins want Samsung-specific zero-touch | Paid Knox license tier gating; Samsung-specific; velocity compression on top of 3x existing surface | Stub mention in enrollment overview; full coverage v1.4.1 |
| COPE full admin path and L1/L2 runbooks | COPE exists in Intune; some orgs use it | Google trajectory is WPCO; NFC/token removed on Android 11+; documenting COPE fully risks encoding a deprecated pattern | Migration/deprecation note inside COBO guide; defer full COPE to v1.4.1 if still relevant |
| AOSP user-associated/userless full failure catalog | AOSP devices are in real deployments | Sparse public failure documentation; OEM-specific behaviors not well-documented; RealWear-specific quirks require first-party validation | AOSP stub with known OEM matrix + enrollment flow; full coverage v1.4.1 once OEM matrix firms |
| Cross-platform navigation integration (backport Android into docs/index, common-issues, quick-refs) | Unified navigation is expected | Regression risk against live v1.0-v1.3 docs; post-v1.4 unification task is safer | Deferred to post-v1.4 nav-unification task |
| 4-platform comparison document (Windows/macOS/iOS/Android) | Useful for platform selection decisions | Scope too large for v1.4; requires all four platforms to be at similar documentation depth | Deferred to v1.5 |
| Android Device Administrator (DA) legacy | Some legacy devices still running DA | DA deprecated by Google 2020; Intune ending GMS-device support August 2024; documenting DA risks encoding a dead-end path | Explicit "deprecated — do not use" callout in enrollment overview; link to migration path |
| Knox-specific hardware features (Knox Workspace, Samsung DeX MDM, EFOTA) | Samsung-specific capabilities are valuable for Samsung-heavy fleets | Outside Intune enrollment scope for v1.4; Knox platform requires separate documentation track | Out-of-scope with explicit deferral note |
| Android TV / Wear OS / Android Auto enrollment | Some orgs manage Android TV or wearables | Different management platform or unsupported in Intune enrollment scope | Out-of-scope note in overview |

---

## Feature Dependencies

```
Managed Google Play Binding
    ├──required by──> BYOD Work Profile admin guide
    ├──required by──> Fully Managed (COBO) admin guide
    ├──required by──> Dedicated (COSU) admin guide
    ├──required by──> Zero-Touch Enrollment admin guide
    └──NOT required by──> AOSP admin guide

Zero-Touch admin guide
    └──required by──> Zero-Touch L1/L2 triage

Fully Managed admin guide
    ├──required by──> COBO L1 triage runbook
    └──required by──> COBO L2 investigation runbook

Dedicated admin guide
    ├──required by──> Dedicated L1 triage runbook
    └──required by──> Dedicated L2 investigation runbook

BYOD Work Profile admin guide
    ├──required by──> BYOD L2 investigation runbook
    └──enhanced by──> BYOD end-user self-service guide (tier-inversion: user-facing)

Android Enterprise overview
    └──prerequisite context for──> All mode-specific guides

Android version matrix
    └──referenced from──> Android Enterprise overview + all mode guides

Provisioning-method matrix
    └──referenced from──> Android Enterprise overview + ZT, COBO, Dedicated guides

COPE deprecation note
    └──inline in──> Fully Managed (COBO) admin guide
```

### Dependency Notes

- **Managed Google Play binding is a hard gate:** No GMS-based enrollment profile can be created in Intune without this binding. All four GMS modes depend on it. Document it first as Phase 1 prerequisite before any mode-specific guide.
- **AOSP is independent:** AOSP does not use GMS or Managed Google Play. AOSP guides can be written independently of the MGP binding dependency.
- **Enrollment overview must precede mode guides:** Admins need to select the correct mode before consulting mode-specific admin guides. Overview with the ownership/management axis table is a conceptual gate.
- **L1 guides depend on admin guides:** L1 triage scripts reference Intune portal paths established in admin guides. L1 must follow admin guide phase.
- **L2 guides depend on L1 guides:** L2 investigates what L1 escalated. L2 inherits scope from L1 runbook framing.
- **BYOD tier-inversion:** BYOD enrollment is user-initiated (Company Portal on personal device), not admin-initiated. The "L1" content is more accurately an end-user self-service guide that L1 hands off to users. Admin tasks are limited to enrollment restriction configuration and work profile policy.

---

## v1.4 MVP Definition (Phase Sequencing Input)

### Phase 1: Foundation (must be first)
- Android Enterprise enrollment path overview (ownership/management axis, supervision analog)
- Managed Google Play binding guide (tri-portal template introduction)
- Android version matrix + provisioning-method matrix (research artifacts become doc deliverables)

### Phase 2: Corporate Enrollment — Fully Managed (COBO)
- COBO admin setup guide (prerequisites, enrollment profile, token, ZT integration)
- COBO L1 triage runbook (enrollment failure scenarios, token issues, Managed Authenticator failures)
- COBO L2 investigation runbook (log collection, profile delivery verification, staged token workflow)
- COPE deprecation note inline in COBO guide

### Phase 3: BYOD Work Profile
- BYOD admin setup guide (enrollment restrictions, work profile policy, data transfer controls)
- BYOD end-user self-service guide (Company Portal install, work profile setup, what to expect)
- BYOD L2 investigation runbook (work profile logs, profile creation failure, MAM intersection)

### Phase 4: Dedicated Devices (Kiosk)
- Dedicated device admin setup guide (enrollment profile, kiosk configuration, MHS multi-app setup, exit-PIN)
- Dedicated L1 triage runbook (MHS PIN mismatch, app crash recovery, exit-kiosk attempts)
- Dedicated L2 runbook (token rotation, Lock Task debugging, FRP behavior)

### Phase 5: Zero-Touch Enrollment
- Zero-Touch admin guide (reseller flow, portal navigation, DPC extras JSON, linking to Intune)
- Zero-Touch L1/L2 triage content (ZT not triggering, wrong mode on unbox, GMS connectivity at setup)

### Phase 6: AOSP (Stub)
- AOSP admin guide: enrollment profile, QR-only flow, OEM matrix, Wi-Fi embedding requirement
- AOSP triage stub: known failure patterns (enrollment token expiry, Wi-Fi credential absent, OEM firmware below minimum)

### Defer (v1.4.1 or later)
- Knox Mobile Enrollment full docs
- COPE full admin path
- AOSP full failure catalog with per-OEM behavioral matrix
- Cross-platform navigation integration

---

## Feature Prioritization Matrix

| Feature | Audience Value | Doc Complexity | Priority |
|---------|----------------|----------------|----------|
| Managed Google Play binding guide | HIGH (gates everything) | LOW | P1 |
| Enrollment path overview + axes | HIGH (orientation) | LOW | P1 |
| COBO admin setup guide | HIGH (most common corporate mode) | MEDIUM | P1 |
| BYOD work profile admin + user guide | HIGH (most common BYOD mode) | MEDIUM | P1 |
| Dedicated device admin + kiosk config | HIGH (kiosk is complex/error-prone) | HIGH | P1 |
| COBO L1/L2 runbooks | HIGH | MEDIUM | P1 |
| BYOD L2 runbook | HIGH | MEDIUM | P1 |
| Dedicated L1/L2 runbooks | HIGH | MEDIUM | P1 |
| Zero-Touch admin + triage | MEDIUM (enterprise-scale only) | MEDIUM | P2 |
| AOSP stub guide | MEDIUM (specialized devices) | LOW | P2 |
| Android version matrix (doc artifact) | HIGH (reference) | LOW | P1 |
| Provisioning method matrix (doc artifact) | HIGH (reference) | LOW | P1 |
| Privacy-boundary table (BYOD) | HIGH (legal/HR concern) | LOW | P1 (embedded in BYOD guide) |
| MHS exit-PIN sync callout | MEDIUM (operational) | LOW | P1 (embedded in Dedicated guide) |
| FRP behavior matrix | MEDIUM (re-provisioning) | LOW | P2 (embedded in mode guides) |
| COPE deprecation note | MEDIUM (inherited deployments) | LOW | P1 (inline in COBO guide) |

---

## Sources

| Source | Confidence | URL | Last Updated |
|--------|------------|-----|--------------|
| Android device enrollment guide (Intune) | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/guide | 2026-04-16 |
| Setup fully managed enrollment (Intune) | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-fully-managed | 2025-05-08 / git 2026-04-16 |
| Setup dedicated device enrollment (Intune) | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated | 2025-05-08 / git 2026-04-16 |
| Setup personal work profile (Intune) | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-personal-work-profile | 2024-10-28 / git 2026-04-16 |
| Connect Intune to Managed Google Play | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play | 2025-11-11 / git 2026-04-16 |
| Enroll corporate methods (NFC/QR/ZT/Token) | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods | 2025-12-04 / git 2026-04-16 |
| AOSP supported devices matrix | HIGH | https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices | 2025-05-12 / git 2026-04-16 |
| AOSP userless enrollment setup | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-aosp-corporate-userless | 2025-05-15 / git 2026-04-16 |
| MAM vs Work Profiles (Intune) | HIGH | https://learn.microsoft.com/en-us/intune/app-management/protection/mam-vs-work-profiles-android | 2025-06-12 / git 2026-04-17 |
| Zero-Touch for IT admins | HIGH | https://support.google.com/work/android/answer/7514005 | Google Android Enterprise Help |
| Google: Device setup methods | MEDIUM | https://support.google.com/work/android/answer/9566881 | Google Android Enterprise Help |

---
*Feature research for: Android Enterprise enrollment documentation (v1.4)*
*Researched: 2026-04-19*
*Researcher: GSD Research Agent*
