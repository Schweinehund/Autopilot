# Stack Research

**Domain:** Android Enterprise Enrollment Documentation — Microsoft Intune (v1.4 milestone)
**Researched:** 2026-04-19
**Confidence:** HIGH (primary claims verified via Microsoft Learn direct fetch, updated 2026-04-16)

---

## 1. Portal Surface: Where Each Enrollment Mode Lives

Android Enterprise documentation touches three distinct portals. This is the "tri-portal" pattern identified in v1.4 scope decisions — the first departure from the dual-portal (ABM + Intune) pattern used in macOS/iOS.

| Portal | URL | Owns | Required For |
|--------|-----|------|--------------|
| Microsoft Intune admin center | `https://intune.microsoft.com` | Enrollment profiles, compliance, config profiles, app deployment, corporate identifiers, Zero-Touch iframe | All enrollment modes |
| Managed Google Play | `https://play.google.com/work` | App approval, app distribution catalog, Play Store layout | All GMS-based modes (COBO, COSU, BYOD WP, COPE) |
| Zero-Touch enrollment portal | `https://enterprise.google.com/android/zero-touch/customers` | Device-to-configuration binding, reseller account linking, DPC extras | Zero-Touch enrollment only |

**Integration point — Intune admin center embeds a Zero-Touch iframe.** Under Devices > Android > Device onboarding > Enrollment > Bulk enrollment methods > Zero-touch enrollment, Intune provides an in-console iframe that links directly to the Zero-Touch portal. Admins can manage Zero-Touch configurations without leaving Intune, but the canonical portal at `enterprise.google.com/android/zero-touch/customers` remains the authoritative source and supports configurations that the iframe does not (e.g., COPE and dedicated device configurations beyond default fully-managed).

Source: [Microsoft Learn — Enroll dedicated, fully managed, or COPE devices](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods) — HIGH confidence

---

## 2. Managed Google Play Binding: How Intune Connects to Google

### Binding Mechanics

The Managed Google Play binding is the single prerequisite that unlocks all GMS-based Android Enterprise enrollment modes. Without it, the enrollment profile options for COBO, COSU, COPE, and BYOD Work Profile are unavailable in Intune.

**Steps (current as of Intune 2024 service release):**
1. Intune admin center > Devices > Enrollment > Android tab > Prerequisites > Managed Google Play
2. Admin accepts data-sharing consent (Intune sends user/device data to Google — privacy disclosure required in docs)
3. Admin selects "Launch Google to connect now" — redirects to Google's managed enterprise signup
4. As of August 2024: admin can use a Microsoft Entra account (corporate email) instead of a personal/enterprise Gmail account — RECOMMENDED approach
5. Google creates an Enterprise ID bound to the tenant's Entra account
6. On completion, Intune auto-approves and pins four mandatory apps: Microsoft Intune, Microsoft Authenticator, Intune Company Portal, Managed Home Screen

**Entra ID integration:** The binding is now account-linked via Microsoft Entra identity rather than Gmail. The Entra account must have an active mailbox (required by Google's validation process). One account manages the Google Admin account and associated subscriptions for the entire tenant. Google recommends minimum two owners for redundancy.

**Token refresh cadence:** The Managed Google Play binding itself does not expire on a short cadence. However, enrollment tokens for dedicated/COBO profiles are generated with an expiry the admin sets (up to 65 years in Intune UI) — but Google enforces a practical 90-day maximum for enrollment token lifetime. Tokens must be renewed before expiry; the Replace token action generates a new token without affecting already-enrolled devices.

**What the binding auto-provisions:** The four apps above are added to the Intune app list automatically; no manual approval needed. Scope tags can be applied to newly-approved Managed Google Play apps via Tenant administration > Connectors and tokens > Managed Google Play.

Source: [Microsoft Learn — Connect Intune to Managed Google Play](https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play) — HIGH confidence

---

## 3. Enrollment Modes: Portal Touch Map

### 3.1 Fully Managed (COBO) — Android 6.0+

**Portal ownership:**
- Intune: Enable fully managed user devices (Devices > Enrollment > Android > Android Enterprise > Enrollment Profiles > Corporate-owned fully managed user devices); create enrollment profile; obtain QR/token; optionally link Zero-Touch account via iframe
- Managed Google Play: Approve and distribute the Microsoft Intune app (auto-approved at binding)
- Zero-Touch portal: Create configuration with EMM DPC = Microsoft Intune, paste DPC extras JSON with enrollment token — used for bulk/remote provisioning

**Enrollment methods supported:**
| Method | Android Version | Notes |
|--------|----------------|-------|
| QR code | 9.0+ (built-in QR reader); 8.x with external reader | Recommended for most scenarios |
| Token / DPC identifier (`afw#setup`) | Any supported version | Token entered on Google sign-in screen instead of Gmail |
| NFC tag | 8.0+, not COPE on Android 11+ | Requires NFC-formatted tag |
| Google Zero-Touch | Varies by device | Devices must be purchased from authorized Zero-Touch reseller |
| Knox Mobile Enrollment | Samsung Knox-supported versions | DEFERRED — v1.4.1 |

**Factory reset required before enrollment:** YES — devices must be wiped. Do not restart device mid-enrollment (risk: device appears enrolled but unapplied policies).

Source: [Microsoft Learn — Android enrollment guide](https://learn.microsoft.com/en-us/intune/device-enrollment/android/guide) and [ref-corporate-methods](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods) — HIGH confidence

### 3.2 Dedicated (COSU/Kiosk) — Android 8.0+

**Portal ownership:**
- Intune: Devices > Enrollment > Android > Enrollment Profiles > Corporate-owned dedicated devices; choose token type (standard, or Entra shared device mode); configure Managed Home Screen app; assign to static Entra device group
- Managed Google Play: Approve apps assigned as Required (only Required apps install on dedicated devices; Available assignment not supported)
- Zero-Touch portal: Supported; configuration same as COBO

**Key differentiator from COBO:** No user account at enrollment (unless Entra shared device mode token is selected, which deploys Microsoft Authenticator for shared sign-in/sign-out). Managed Home Screen app locks the device to approved apps/web links.

**Token type options:**
- Standard dedicated: No user credentials at any point; simple kiosk
- Entra shared device mode: Adds Microsoft Authenticator; enables single sign-in and sign-out across apps supporting the Entra MSAL shared device mode — intended for frontline worker shared-device scenarios (e.g., hospital shift handoffs)

Source: [Microsoft Learn — Set up dedicated devices](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated) — HIGH confidence

### 3.3 BYOD Work Profile on Personally-Owned Devices — Any supported AE device

**Portal ownership:**
- Intune: No special enrollment profile needed (work profile for personally-owned devices is allowed by default); admin configures Device Platform Restrictions if needed to allow/block; compliance and config policies scoped to work profile
- Managed Google Play: Work profile apps sourced from here (only work profile container sees Managed Play; personal side sees consumer Play Store)
- Zero-Touch portal: NOT applicable — personal devices are not Zero-Touch enrolled

**Enrollment is device-side (tier-inversion):** The admin does nothing device-side. End users install Company Portal from Google Play Store, sign in with organizational credentials, and the work profile is created automatically. Admin's role: configure policies, restrictions, and communicate instructions.

**Data privacy:** Personal profile is not managed; Intune cannot collect app inventory or full phone number from personal profiles. Company Portal app must be present in the work profile (Intune auto-deploys it there on enrollment).

**Android 12+ limitation:** Google removed serial number, IMEI, and MEID access from personally-owned work profile devices starting Android 12. Corporate identifiers uploaded for this path only work on Android 11 and earlier for work profile personal devices.

**Custom profile deprecation:** Intune ended support for custom OMA-URI profiles for personally-owned work profile devices in April 2025. Do not document custom profile paths for BYOD WP.

Source: [Microsoft Learn — Set up personal work profile enrollment](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-personal-work-profile) — HIGH confidence

### 3.4 COPE (Corporate-Owned Work Profile) — Android 8.0+

**Status: DOCUMENTED AS DEPRECATION NOTE ONLY in v1.4** (per scope decision in STATE.md). Full admin path deferred to v1.4.1.

**What to surface in v1.4 COBO doc:**
- Previously called COBO+personal; now called corporate-owned devices with a work profile (COPE)
- Android 11 restructured COPE: removed work-profile-on-fully-managed (WPoFMD) architecture; NFC and DPC identifier (`afw#setup`) NOT supported on Android 11+ for COPE
- Google's trajectory is Work Profile for Corporate-Owned (WPCO) — COPE is valid but declining in recommended use
- Factory reset required before enrollment
- Supported enrollment methods: QR code (primary), Zero-Touch, Knox Mobile Enrollment (Samsung only)

Source: [Microsoft Learn — Android enrollment guide COPE section](https://learn.microsoft.com/en-us/intune/device-enrollment/android/guide) — HIGH confidence; [Jason Bayton — Android 11 COPE changes](https://bayton.org/android/android-11-cope-changes/) — MEDIUM confidence (community canonical)

### 3.5 AOSP (Android Open Source Project) — Stub Level in v1.4

**What it is:** Enrollment for devices that run Android without Google Mobile Services (GMS). No Managed Google Play binding required or applicable. Targeted at AR/VR headsets, specialized rugged/wearable devices.

**Portal ownership:**
- Intune only: Create AOSP enrollment profile (userless or user-associated); QR code delivery only; one device at a time (no bulk enrollment)
- No Google portals involved

**Enrollment methods:** QR code only. No NFC, no Zero-Touch, no token/DPC identifier.

**GA status:** Generally Available as of 2022 (announced as premium add-on to Microsoft Endpoint Manager). As of May 2025, Microsoft added auto-update capability for AOSP firmware (effective May 15, 2025).

**Supported OEMs (verified from Microsoft Learn, updated 2025-05-12):**

| OEM | Device(s) | Type |
|-----|-----------|------|
| DigiLens Inc. | ARGO | AR/VR Headset |
| HTC | Vive Focus 3, Vive XR Elite, Vive Focus Vision | AR/VR Headset |
| Lenovo | ThinkReality VRX | AR/VR Headset |
| Meta | Quest 2, Quest 3, Quest 3s, Quest Pro | AR/VR Headset (some regions only) |
| PICO | PICO 4 Enterprise, PICO Neo3 Pro/Eye | AR/VR Headset |
| RealWear | HMT-1, HMT-1Z1, Navigator 500 | AR/VR Headset |
| Vuzix | Blade 2, M400, M4000 | AR/VR Headset |
| Zebra | WS50 | Wearable scanner |

**All AOSP devices in the supported list are AR/VR headsets or wearable scanners — no mainstream Android phones or tablets.** This is a critical scoping note for v1.4 documentation: AOSP is not a path for general-purpose Android phones.

**AOSP-specific network endpoint:** `intunecdnpeasd.manage.microsoft.com` (migrated from `intunecdnpeasd.azureedge.net` as of March 2025)

Source: [Microsoft Learn — AOSP supported devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) — HIGH confidence

---

## 4. Push Notification: FCM vs APNs

Android Enterprise has **no APNs equivalent**. The push channel is Firebase Cloud Messaging (FCM), operated by Google.

| Aspect | iOS/iPadOS (APNs) | Android Enterprise (FCM) |
|--------|-------------------|--------------------------|
| Push channel | Apple Push Notification service | Google Firebase Cloud Messaging |
| Admin setup required | Yes — annual certificate renewal | No — FCM is a dependency of Google Play Services; no admin action |
| Certificate expiry risk | Yes — APNs cert expires annually, breaks all iOS enrollment | No — FCM does not require a cert managed by the Intune admin |
| Required device capability | APNs reachability | GMS / FCM reachability |
| AOSP devices | N/A | FCM unavailable (no GMS); Intune uses direct polling/check-in instead |

**Key documentation implication:** Do NOT create a "renew your push certificate" runbook for Android. The FCM dependency is a network firewall/proxy concern, not an admin portal task. Document it as a prerequisite check (FCM ports open) not a recurring action.

FCM network requirements: defer to [Google FCM docs — ports and firewall](https://firebase.google.com/docs/cloud-messaging/)

Source: [Microsoft Learn — Intune network endpoints, Android Enterprise dependencies section](https://learn.microsoft.com/en-us/intune/fundamentals/endpoints) — HIGH confidence

---

## 5. Intune Configuration Surface for Android Enterprise

### 5.1 Enrollment Profiles

| Profile Type | Admin Center Location | Purpose |
|-------------|----------------------|---------|
| Corporate-owned fully managed user devices toggle | Devices > Enrollment > Android > Android Enterprise | Enables COBO enrollment globally |
| Enrollment profile (COBO/COSU/COPE) | Devices > Enrollment > Android > Enrollment Profiles | Generates QR/token; sets naming template; sets token expiry; optionally links to Entra device group |
| Device platform restriction (BYOD WP) | Devices > Enrollment > Android > Device platform restriction | Allow/block personal work profile enrollment |
| AOSP enrollment profile (userless/user-associated) | Devices > Enrollment > Android | Separate AOSP-specific profile; no Managed Google Play binding needed |
| Zero-Touch iframe | Devices > Android > Device onboarding > Enrollment > Bulk enrollment methods > Zero-touch enrollment | Links Zero-Touch account; creates default configuration |

### 5.2 Configuration Profiles

Android Enterprise configuration profiles are in Devices > Configuration > Create > Android Enterprise. Profile types vary by management mode:

| Template/Profile Area | Applies To |
|----------------------|-----------|
| Device restrictions | COBO, COSU, COPE, BYOD WP (separate restrictions per mode) |
| Kiosk (single-app / multi-app) | COSU/dedicated |
| Device experience (Managed Home Screen) | COSU/dedicated |
| Wi-Fi | All modes |
| VPN | All modes |
| Certificate (SCEP/PKCS) | All modes |
| Email | Work profile modes (BYOD WP, COPE) |
| Settings catalog | All modes (expanding coverage) |
| OMA-URI custom profiles | COBO, COSU, COPE only — NOT available for personally-owned work profile as of April 2025 |

### 5.3 App Configuration Policies

App configuration policies for Android Enterprise are scoped per enrollment type (Managed Devices vs. Managed Apps/MAM). Must select enrollment type before creating profile:
- **Managed Devices**: Applies to enrolled work profile or fully managed devices via the MDM channel
- **Managed Apps**: Applies to apps protected by Intune App Protection Policies (MAM-WE, for unenrolled scenarios)

Apps configured via Managed Google Play: approved in the Managed Google Play console or via the Managed Google Play iframe in Intune admin center (Apps > Android > Add > Managed Google Play app).

### 5.4 Compliance Policies

Android Enterprise compliance policies are at Devices > Compliance > Create policy > Android Enterprise. Key Android-specific compliance settings:

| Setting | Notes |
|---------|-------|
| Google Play Integrity verdict | Replaces SafetyNet Attestation — select Basic integrity, Basic + device integrity, or Basic + strong integrity |
| Device Threat Level | Requires Mobile Threat Defense (MTD) connector integration |
| OS version (min/max) | Per policy |
| Password requirements | Complexity level, expiry (1-365 days), history |
| Encryption | Required on Android Enterprise |
| Security patch level | Minimum patch date configurable |
| Factory Reset Protection emails | COPE-specific; controls which Google accounts can unlock after reset |

**Play Integrity replaces SafetyNet:** SafetyNet attestation was Google's legacy API; Play Integrity is the current equivalent. Intune compliance UI uses "Play Integrity verdict" terminology. Document only Play Integrity, not SafetyNet.

Source: [Microsoft Learn — Android Enterprise compliance settings](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work) — HIGH confidence

---

## 6. Corporate Device Identifiers for Android

Used to pre-mark devices as corporate-owned before enrollment, so the correct management profile is applied.

### Supported Identifier Types (Android)

| Identifier | Android Version Support | Notes |
|-----------|------------------------|-------|
| IMEI | Android 11 and earlier (personally-owned WP); all versions for COBO/COSU/COPE | GMS-enrolled corporate modes auto-mark as corporate without needing pre-upload |
| Serial number | Android 11 and earlier (personally-owned WP); all versions for COBO/COSU/COPE | Not guaranteed unique; verify with device supplier |
| MEID | Supported (CDMA devices) | Same version constraints as IMEI |

**Android 12+ limitation for BYOD WP:** Google removed IMEI/serial/MEID read access from personally-owned work profile devices in Android 12. Corporate identifiers for pre-marking BYOD WP devices only work on Android 11 and earlier. This is a notable documentation gap — admins cannot pre-mark Android 12+ personal devices via identifier upload.

**Corporate modes auto-mark:** COBO, COSU, COPE, AOSP, Zero-Touch, and Knox Mobile Enrollment all automatically assign corporate ownership at enrollment — no pre-upload of identifiers needed for these modes.

**CSV format:** One identifier per line; one type per file (IMEI OR serial, not mixed); up to 5,000 rows or 5 MB per file.

**Admin center location:** Devices > Enrollment > Corporate device identifiers tab > Add > Upload CSV file

Source: [Microsoft Learn — Add corporate identifiers](https://learn.microsoft.com/en-us/intune/device-enrollment/add-corporate-identifiers) — HIGH confidence

---

## 7. Zero-Touch Enrollment: Reseller Ecosystem

### How the Reseller Chain Works

1. **Reseller purchases or sells eligible devices** and registers them in the Zero-Touch reseller portal
2. **Reseller associates devices to a customer account** using IMEI, serial number, or MEID as the device identifier
3. **Customer (IT admin) accesses Zero-Touch customer portal** at `https://enterprise.google.com/android/zero-touch/customers` using a corporate Google account (or Entra-linked account)
4. **Customer creates a configuration:** selects EMM DPC = Microsoft Intune, pastes DPC extras JSON (with enrollment token), adds support info
5. **Device auto-provisions on first boot** — no user action required beyond powering on; device downloads Android Device Policy, applies configuration, and enrolls into Intune

### Identifier Formats in Zero-Touch

| Identifier | Use | Notes |
|-----------|-----|-------|
| IMEI | Primary for cellular devices | For dual-SIM devices, register with numerically lowest IMEI |
| Serial number | Wi-Fi-only devices (no cellular/IMEI) | Case-sensitive; must match manufacturer serial exactly |
| MEID | CDMA devices | Less common |

As of the 2026 portal update: the Zero-Touch search bar accepts any identifier type without requiring the admin to pre-select the type.

### Finding Authorized Resellers

The canonical directory is: [Android Enterprise Business Device Solutions Directory — Resellers](https://androidenterprisepartners.withgoogle.com/resellers/)

This is operated by Google, not Microsoft. Admins must purchase from listed resellers for Zero-Touch eligibility. Devices purchased from non-Zero-Touch resellers cannot be added to Zero-Touch post-purchase (reseller must register them before sale).

**SPARSE DOC FLAG:** The reseller portal workflow is documented by Google at [developers.google.com/zero-touch/guides/portal](https://developers.google.com/zero-touch/guides/portal) but Microsoft Learn does not document the reseller-side steps. Admin-facing documentation should link to Google's reseller guide and note the purchase-time constraint. This is a Google-canonical source area.

Source: [Google Zero-Touch IT admin guide](https://support.google.com/work/android/answer/7514005) — HIGH confidence; [Google Zero-Touch developers overview](https://developers.google.com/zero-touch/guides/overview) — HIGH confidence

---

## 8. Network Endpoints Required for Android Enterprise

### Intune-Side (Microsoft-operated)

| Endpoint | Purpose |
|----------|---------|
| `*.manage.microsoft.com`, `manage.microsoft.com` | Intune client and host service (TCP 80, 443) |
| `*.dm.microsoft.com` | Device management, Defender |
| `login.microsoftonline.com`, `graph.windows.net` | Authentication (Entra ID) |
| `enterpriseregistration.windows.net` | Entra device registration |
| `intunecdnpeasd.manage.microsoft.com` | AOSP-specific CDN (migrated from azureedge.net March 2025) |

### Google-Side (Google-operated — NOT documented in Microsoft Learn)

For Android Enterprise GMS-based modes, Google documents required endpoints in the [Android Enterprise Help Center — Network port information](https://support.google.com/work/android/answer/10513641). This is the canonical source; Microsoft Learn defers to it explicitly.

Key Google-operated endpoints (MEDIUM confidence — Google Help, not verified via direct fetch):
- `*.google.com`, `*.googleapis.com` — GMS, Play Store, Android Management API
- `*.firebase.com`, `fcm.googleapis.com` — Firebase Cloud Messaging (push)
- `*.android.com` — Android system updates
- `enterprise.google.com` — Zero-Touch portal

**SPARSE DOC FLAG:** Microsoft Learn says "Google provides documentation of required network ports and destination host names in the Android Enterprise Help Center" and does not list them inline. Any network prerequisites section in v1.4 documentation must link to Google's canonical endpoint list rather than attempt to reproduce it.

Source: [Microsoft Learn — Intune network endpoints, Android Enterprise dependencies section](https://learn.microsoft.com/en-us/intune/fundamentals/endpoints) — HIGH confidence for the pointer; MEDIUM confidence for the Google endpoint list content

---

## 9. Authentication Stack: Entra ID Integration

### Enrollment Authentication Flow

| Mode | Authentication at Enrollment | Post-Enrollment Identity |
|------|------------------------------|--------------------------|
| COBO (Fully Managed) | User signs in with Entra ID work account during enrollment wizard | Device becomes Entra-joined; user identity tied to device |
| COSU (Dedicated, standard) | No user credentials at enrollment | Device-only; no user association |
| COSU (Entra shared device mode) | No enrollment credentials; users sign in per-session via Authenticator | Entra shared device mode; per-session user identity |
| BYOD Work Profile | User installs Company Portal, signs in with Entra ID work account | Device becomes Entra-registered; personal device |
| COPE | User signs in with Entra ID work account | Device becomes Entra-registered or joined depending on configuration |
| AOSP | User-associated: user signs in with Entra ID; Userless: no user | Varies by mode |

### Conditional Access Consideration (Critical)

If a Conditional Access policy requires device compliance AND applies to All Cloud Apps AND applies to Android AND applies to Browsers, the **Microsoft Intune cloud app must be excluded**. The Android enrollment setup process uses a Chrome tab for authentication, and CA blocking Chrome during enrollment breaks enrollment. This is a documented gotcha with a specific mitigation.

Source: [Microsoft Learn — ref-corporate-methods, CA note](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods) — HIGH confidence

---

## 10. Diagnostic Tooling

### Admin-Side Tools

| Tool | What It Shows | Where to Access |
|------|--------------|----------------|
| Intune admin center — Device details | Enrollment status, assigned policies, app install status, compliance state | Devices > All devices > [device] |
| Intune admin center — Troubleshooting blade | Consolidated device/user/policy/enrollment view | Help and support > Troubleshoot + support |
| Intune admin center — Enrollment failures | Failed enrollments with failure reason codes | Devices > Enrollment failures |
| Microsoft Graph API | All device/enrollment data programmatically | `graph.microsoft.com/v1.0/deviceManagement/managedDevices` |

### Device-Side Tools

| Tool | What It Captures | Collection Method |
|------|-----------------|------------------|
| Company Portal — Send logs | App diagnostics, enrollment errors, policy processing, sync status; includes incident ID | Help > Send logs (in-app); user emails logs to L2 |
| Microsoft Intune app — Upload logs | Same as Company Portal for fully managed/dedicated modes | Help > Get Support > Upload Logs |
| Android Debug Bridge (adb) — logcat | Device-level logs including Intune agent, policy application, system events | `adb logcat -v threadtime > logfile.txt` (requires USB debugging or developer mode enabled on device) |
| Android Debug Bridge (adb) — bugreport | Full system dump: memory, app states, settings, logs | `adb bugreport bugreport.zip` |
| Verbose logging mode | Increases log detail in Company Portal | Settings > Verbose logging toggle in Company Portal |

**Key difference from iOS:** Android has no equivalent of Apple's sysdiagnose or mdmclient debug-level. The primary L2 tool is adb logcat + Company Portal logs. For fully managed corporate devices, adb requires USB debugging to be explicitly enabled — which may not be present on production-hardened devices. This is a documentation gap to flag.

**Enrollment diagnostic vs iOS:** iOS has MDM protocol logs (mdmclient) surfaceable at the device. Android Enterprise equivalent diagnostic depth is primarily via adb (requires physical access or developer mode) or the Intune portal's troubleshooting blade. The Intune portal is the primary remote diagnostic tool.

Source: [Microsoft Learn — Share Android diagnostic logs](https://learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-android) — HIGH confidence; [community source — adb logcat Intune](https://uem4all.com/2020/02/24/mem-android-debugging/) — LOW confidence (not verified via official source)

---

## 11. What NOT to Add (Explicit Scope Boundaries)

| Do Not Add | Why | What to Document Instead |
|-----------|-----|--------------------------|
| Knox Mobile Enrollment (KME) | Deferred to v1.4.1 — paid Knox tier, Samsung-specific | One-line stub in enrollment overview: "Samsung devices may qualify for KME — see v1.4.1" |
| Android Device Administrator (DA) management | Deprecated; no longer available for GMS devices | Deprecation note only in overview; point to migration path |
| COPE full admin setup runbook | Deferred to v1.4.1; Google trajectory is WPCO | Deprecation/trajectory note inside COBO doc |
| SafetyNet attestation | Superseded by Play Integrity Verdict | Document only Play Integrity |
| Custom OMA-URI profiles for personally-owned WP | Removed from Intune April 2025 | Settings catalog and device restriction profiles instead |
| Google Workspace (G Suite) binding | Distinct from Managed Google Play binding; rarely used in Intune deployments | Not applicable to Microsoft Intune documentation |
| Android TV / Auto / Wear OS | Specialized device classes outside Intune enrollment scope | Out of scope per PROJECT.md |
| ChromeOS management | Different platform (Google Admin) | Out of scope |
| GMS unavailability in China | Edge case, not covered in generic guidance | Note as known limitation; link to [Microsoft Learn — Manage without GMS](https://learn.microsoft.com/en-us/intune/app-management/manage-without-gms) |

---

## 12. Android OS Version Minimums (Fragmentation Matrix)

| Enrollment Mode | Minimum Android Version | Notes |
|----------------|------------------------|-------|
| BYOD Work Profile (personally-owned) | Android 5.0+ (GMS requirement) | Practical minimum is 8.0+ for modern management features |
| Fully Managed (COBO) | Android 6.0+ | |
| Dedicated (COSU) | Android 8.0+ | |
| Corporate-Owned Work Profile (COPE) | Android 8.0+ | NFC and DPC identifier only supported on Android 8-10; Android 11+ requires QR or Zero-Touch |
| AOSP | Varies by OEM firmware | No single version minimum; depends on OEM-supported firmware listed in AOSP supported devices list |
| Zero-Touch | Device must support Zero-Touch | Hardware capability; not OS version-gated per se — varies by OEM implementation |

**v1.4 baseline is Android 14** per milestone context. Document min versions but flag that Android 14 is the current baseline for feature completeness. Significant behavior changes occurred at Android 9 (built-in QR reader), Android 11 (COPE architecture change, IMEI/serial removal from work profile), Android 12 (corporate identifier removal for personally-owned work profile), Android 13 (stricter permissions), Android 14 (private space introduction).

**Android 14 private space note:** Private Space (new in Android 14) is treated as a personal profile. Intune does not support MDM management within the private space. If a user with an enrolled work profile attempts to enroll the private space, it triggers device administrator enrollment and creates two enrollment records — not supported. Document as known limitation for BYOD Work Profile.

Source: [Microsoft Learn — Enrollment guide](https://learn.microsoft.com/en-us/intune/device-enrollment/android/guide), [setup-dedicated](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated), [setup-personal-work-profile](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-personal-work-profile) — HIGH confidence

---

## 13. Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Intune portal surface and enrollment profile locations | HIGH | Verified via direct Microsoft Learn fetches (updated 2026-04-16) |
| Managed Google Play binding mechanics | HIGH | Direct Microsoft Learn fetch |
| Entra ID integration (August 2024 account-linking change) | HIGH | Microsoft Learn confirmed |
| FCM as push channel (no admin cert action required) | HIGH | Microsoft Learn confirmed; no APNs equivalent exists |
| Enrollment methods by mode (QR, DPC, NFC, ZTE) | HIGH | Direct Microsoft Learn fetch |
| Zero-Touch portal URL and reseller workflow | HIGH (portal URL, Google-sourced); MEDIUM (reseller steps, limited detail) | Microsoft Learn defers to Google docs |
| AOSP OEM support matrix | HIGH | Direct fetch from supported-devices page (2025-05-12) |
| Corporate identifier types and Android 12 limitation | HIGH | Direct fetch from add-corporate-identifiers page |
| Android OS version minimums | HIGH | Compiled from multiple Microsoft Learn guide pages |
| Google-side network endpoints (FCM, GMS) | MEDIUM | Microsoft Learn points to Google docs; not reproduced in Microsoft Learn |
| adb diagnostic commands for Android Enterprise | LOW | Community source (uem4all.com); not from official Microsoft Learn page |
| COPE deprecation trajectory | MEDIUM | Jason Bayton (community canonical for Android Enterprise) + Microsoft Learn guide |
| Enrollment token 90-day max | MEDIUM | Multiple community sources consistent; not stated explicitly in Microsoft Learn |

---

## 14. Sparse-Doc Flags for Downstream Roadmapper

| Area | Sparse Doc Flag | Canonical Source |
|------|-----------------|-----------------|
| Zero-Touch reseller portal workflow (reseller side) | SPARSE — Microsoft Learn does not document reseller steps | Google: [developers.google.com/zero-touch/guides/portal](https://developers.google.com/zero-touch/guides/portal) |
| Google-side network endpoints for Android Enterprise | SPARSE — Microsoft Learn defers entirely to Google | Google: [support.google.com/work/android/answer/10513641](https://support.google.com/work/android/answer/10513641) |
| BYOD Work Profile end-user experience deep detail | SPARSE — primarily user-help docs, limited admin perspective | Microsoft Learn user-help; supplement with community |
| adb diagnostic commands for Android Enterprise | SPARSE — no official Microsoft Learn guide for adb on AE | Community: uem4all.com; verify before publishing |
| AOSP enrollment troubleshooting | SPARSE — AOSP is a newer GA path; failure catalog not well-established | Community (RealWear support, Zebra support portals) |
| Enrollment token 90-day max cadence | SPARSE — not stated in official docs but consistent in community | Community: multiple MDM blog sources |
| Android 14 private space BYOD interaction | SPARSE — noted in enrollment docs but limited troubleshooting guidance | Microsoft Learn enrollment limitation note only |

---

## Sources

- [Microsoft Learn — Connect Intune to Managed Google Play](https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play) — fetched 2026-04-19, updated 2025-11-11
- [Microsoft Learn — Android enrollment guide](https://learn.microsoft.com/en-us/intune/device-enrollment/android/guide) — fetched 2026-04-19, updated 2024-04-23
- [Microsoft Learn — Enroll dedicated, fully managed, COPE devices](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods) — fetched 2026-04-19, updated 2025-12-04
- [Microsoft Learn — Set up dedicated devices](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated) — fetched 2026-04-19, updated 2025-05-08
- [Microsoft Learn — Set up personal work profile](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-personal-work-profile) — fetched 2026-04-19, updated 2024-10-28
- [Microsoft Learn — AOSP supported devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) — fetched 2026-04-19, updated 2025-05-12
- [Microsoft Learn — Add corporate identifiers](https://learn.microsoft.com/en-us/intune/device-enrollment/add-corporate-identifiers) — fetched 2026-04-19, updated 2025-04-11
- [Microsoft Learn — Intune network endpoints](https://learn.microsoft.com/en-us/intune/fundamentals/endpoints) — fetched 2026-04-19, updated 2026-03-24
- [Microsoft Learn — Share Android diagnostic logs](https://learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-android) — fetched 2026-04-19, updated 2025-02-06
- [Microsoft Learn — Android Enterprise compliance settings](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work) — search-verified
- [Google — Zero-Touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005) — fetched 2026-04-19
- [Google — Zero-Touch reseller portal guide](https://developers.google.com/zero-touch/guides/portal) — search-verified
- [Android Enterprise Business Solutions Directory — Resellers](https://androidenterprisepartners.withgoogle.com/resellers/) — search-verified
- [Jason Bayton — Android 11 COPE changes](https://bayton.org/android/android-11-cope-changes/) — MEDIUM confidence (community canonical for Android Enterprise)

---
*Stack research for: Android Enterprise enrollment documentation — v1.4 milestone*
*Researched: 2026-04-19*
