# Feature Research: v1.4.1 Android Enterprise Completion

**Domain:** Three sub-features closing v1.4 deferred Android coverage — Samsung Knox Mobile Enrollment (KME), full AOSP per-OEM expansion (RealWear + Zebra + Pico + HTC VIVE Focus + Meta Quest), and COPE full admin path (vs. deprecation-rationale disposition).
**Researched:** 2026-04-24
**Milestone:** v1.4.1 (subsequent milestone after v1.4 shipped same day)
**Confidence:** HIGH — Microsoft Learn + Samsung Knox docs + OEM vendor docs (RealWear, Meta, PICO, Zebra) cross-validated; COPE terminology re-verified against current MS Learn admin center UI labels.

---

## Executive Summary

This research closes three distinct v1.4 deferred items. Each is a separate admin-guide surface with different complexity profiles, different portal dependencies, and different downstream links into existing v1.4 docs. Research conclusions in one paragraph each:

**Knox Mobile Enrollment (DEFER-04):** KME is a Samsung-specific bulk enrollment pathway that overlays the existing tri-portal pattern. The **KME portal (Knox Admin Portal) is a fourth portal**, not a replacement for any of the three. The admin workflow is a 7-step dance requiring Samsung B2B account provisioning (1-2 business day approval wait), trusted-reseller upload handshake, EMM profile creation with mandatory Intune enrollment-token JSON, device upload approval, profile-to-device assignment, and first-boot verification. **KME itself requires no paid license**; the optional "Advanced" settings (app-install-during-enrollment, device-lock-during-enrollment) gate behind Knox Suite Enterprise Plan. Admin expectations converge on: (a) bulk via reseller handoff similar to ZT, (b) device-list-tied-to-Knox-Customer-ID ownership model, (c) automatic approval rules for trusted resellers once the relationship is established. The reciprocal **KME↔Zero-Touch mutual exclusion** (Samsung-only) is already pinned in Phase 35 ZT portal doc and Phase 36 COBO doc; the v1.4.1 KME guide must add the forward link and repeat the "KME wins when both configured" behavior documented by Google.

**Full AOSP per-OEM expansion (DEFER-05):** The Phase 39 stub's assumption of uniformity across OEMs is **partially wrong**. All 5 v1.4.1 target OEMs share the QR-only + one-device-at-a-time + Wi-Fi-credential-embedding + 90-day-token constraint envelope, BUT they differ materially on: (1) enrollment mode split — RealWear, Zebra, and PICO support both userless and user-associated; HTC VIVE Focus is userless-primary; Meta Quest ships through a **third-party MDM integration layer** (Meta Horizon Device Manager) that is itself scheduled for wind-down **February 20, 2026**; (2) device-restriction surface — Zebra WS50 is the **only wearable scanner** on the list, brings OEMConfig through a separate MX extension path, and is functionally a rugged enterprise device with kiosk-first expectations; the AR/VR headsets share hardware-button / passthrough / hand-tracking policy concerns that don't apply to Zebra; (3) licensing gate — per Microsoft Community Hub explicit language, **AR/VR specialty devices require Intune Suite or Intune Plan 2** (not Plan 1) for generally-available use; this is a binding difference from the v1.4 stub's "Plan 1 sufficient for AOSP baseline" language. The Meta Horizon wind-down is the biggest current-state gotcha — v1.4.1 should frame Meta Quest as "supported but under vendor-side transition through Feb 2026; verify alternative enrollment path at execute time."

**COPE full admin path (DEFER-06):** The decision was live-research-gated; the verdict is **ship a full admin guide**. Microsoft Intune exposes COPE as a **first-class GA enrollment profile** under the label **"Corporate-owned devices with work profile"** in the admin center (Devices → Enrollment → Android → Android Enterprise → Enrollment Profiles). The MS Learn authoring page (`setup-corporate-work-profile`, updated 2026-04-16, `ms.date` 2025-05-08) documents this as an active, supported, GA enrollment mode — not deprecated, not preview, not legacy. Token types "Corporate-owned with work profile (default)" and "Corporate-owned with work profile, via staging" are present. Google's "recommends WPCO" language describes a **Google-side architectural evolution** (Android 11 rewrote the implementation from work-profile-on-fully-managed to work-profile-on-company-owned), but Intune's admin-facing enrollment mode **IS** the WPCO implementation under the COPE label. Conclusion for v1.4.1: ship Phase 4X COPE admin guide that acknowledges the terminology drift, maps "Intune COPE profile = Google WPCO implementation on Android 11+ / legacy COPE implementation on Android 8-10", and uses the Phase 36 COBO doc's existing COPE migration note as the reciprocal anchor.

---

## Category 1: Samsung Knox Mobile Enrollment (KME)

### Table Stakes

Features admins expect from a Samsung enterprise enrollment tool. Missing any of these = product feels incomplete.

| Feature | Why Expected | Complexity | Baseline |
|---------|--------------|------------|----------|
| **Bulk device upload via Samsung-approved reseller** | Samsung enterprise-channel convention — matches ZT parity | Medium (Knox Reseller Portal + Customer/Reseller ID exchange) | MS Learn: "Samsung-approved resellers: A Samsung-approved reseller can automatically upload your organization's purchased devices in the Knox Admin Portal" |
| **Knox Deployment App (KDA) bulk upload for existing stock** | Differentiator vs. Google ZT — KME can onboard pre-owned/used stock | Medium (Bluetooth/NFC scan app + manual device addition) | MS Learn: "Knox Deployment App: You don't need to work with a reseller to upload devices... recommend using the app for enrolling existing devices that were previously set up in Knox Mobile Enrollment. You can use Bluetooth or NFC to add devices to the Knox Admin Portal." |
| **EMM profile creation with Intune selection from dropdown** | Intune is a first-party recognized EMM in Knox — auto-populates EMM agent APK | Low (Knox Admin Portal → Profiles → Create → EMM dropdown → Microsoft Intune) | MS Learn + Samsung docs: "EMM agent APK field will be auto-populated when you select a supported EMM from the drop-down menu" |
| **Intune enrollment token embedded in Knox profile Custom JSON** | Required load-bearing handshake; Samsung doesn't know Intune's enrollment token semantics | Medium (JSON schema: `{"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "<token>"}`) | MS Learn: "Custom JSON data appears optional in the Knox Admin Portal, but Microsoft Intune requires it for a successful enrollment" |
| **First-boot auto-enrollment (no admin touch)** | KME's entire value proposition — device turns on, enrolls, done | Low (built into Samsung OOBE on Knox-capable Samsung models) | MS Learn: "all that the device user needs to do is simply turn on the device, follow a series of enrollment screens, and sign in with their EMM credentials" |
| **Profile auto-assignment rules per trusted reseller** | Prevents admin-approval bottleneck at scale | Medium (reseller-preference configuration UI in Knox Admin Portal) | Samsung docs: "configure the reseller preferences on the console to automatically assign a profile to devices uploaded by a trusted reseller" |
| **Company-name + system-apps + optional QR code profile settings** | Standard enterprise UX expectations | Low (checkboxes + text inputs at profile-create time) | MS Learn profile-settings enumeration |
| **Device export / profile revocation / token replace lifecycle** | Samsung fleets rotate; tokens must be re-issuable without breaking existing enrollees | Low (Knox Admin Portal UI actions) | MS Learn: matches the Intune-side `Revoke token` / `Export token` / `Replace token` semantics from Phase 36 COBO doc |

### Differentiators

Features that set KME apart from Google Zero-Touch. Not universally expected, but distinctly Samsung.

| Feature | Value Proposition | Complexity | Baseline |
|---------|-------------------|------------|----------|
| **No reseller relationship required (via Knox Deployment App)** | Existing Samsung stock / used devices / non-reseller-purchased stock can still enroll — Google ZT cannot do this | Medium | MS Learn + Samsung docs; contrasts directly with Phase 35 ZT portal "Step 0 reseller gate" |
| **Tier-gated "Advanced settings" (Knox Suite Enterprise)** | App-install-during-enrollment and device-lock-during-enrollment happen BEFORE EMM takes over — shortens user-in-hand time | High (license purchase + Enterprise Plan trial caveat) | Samsung docs: "a license isn't required to use Knox Mobile Enrollment... if you want to use Advanced settings, you'll need a valid Knox Suite - Enterprise Plan license" |
| **Supports Android Enterprise dedicated / fully managed / WPCO** | Single Knox profile can target multiple Android Enterprise modes (unlike Google ZT Method A iframe which defaults to Fully Managed) | High (profile-per-mode authoring) | MS Learn: "Enrollment is supported for the following Android Enterprise device types: Dedicated devices / Fully managed devices / Corporate-owned devices with a work profile" — **note this directly validates COPE path viability** |
| **Enrollment via QR on any Android 10+ device (Samsung or other, if uploaded)** | Knox profile can QR-enroll even non-reseller-uploaded devices | Low | Samsung docs: "Knox Mobile Enrollment allows you to enroll both reseller-uploaded and non-reseller uploaded devices running Android 10 or higher into an EMM using a QR code" |
| **Samsung B2B account → Knox approval workflow** | 1-2 business day Samsung-side approval is a known front-loading cost with no Google-ZT equivalent | High (pre-purchase calendar pressure) | Samsung docs explicit 1-2 business day approval window |

### Anti-Features

Features v1.4.1 KME guide should explicitly NOT document (and instead flag as "not KME's job" or "covered elsewhere").

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|---------------------|
| **Documenting full Knox portal non-enrollment features (Knox Configure, Knox E-FOTA, Knox Manage)** | Knox is a product suite; KME is one component. Documenting Knox Configure / E-FOTA / Knox Manage is scope-creep — and v1.4 PROJECT.md Out of Scope explicitly excludes Samsung E-FOTA | Tight scope — KME admin flow only. Link to Samsung docs for the broader Knox suite. |
| **Re-documenting tri-portal setup (Intune + MGP + ZT)** | Phase 35 already owns MGP and ZT portal setup. KME guide is a fourth-portal overlay — must reference, not duplicate | Reference Phase 35 `01-managed-google-play.md` (MGP prerequisite — Knox enrolls into Intune-managed Android Enterprise modes which still require MGP for app distribution) and Phase 35 `02-zero-touch-portal.md#kme-zt-mutual-exclusion` (mutual-exclusion reciprocal pin) |
| **Cross-platform analog claims** | There is no KME equivalent on iOS/macOS/Windows. Apple's ABM ADE and Windows Autopilot are the "reseller-uploads-serials" pattern but are NOT Samsung-specific | Note that KME is a Samsung-hardware-only pathway; the cross-platform reseller-registration pattern documented in the capability matrix is Google ZT ↔ Apple ADE ↔ Windows Autopilot. KME is a Samsung-fleet-specific addition. |
| **Reseller-side mechanics** | Per Phase 35's established pattern, reseller-side steps are not documented; only admin-handoff and confirmation points are | Same pattern — document only what Intune admin hands off to Samsung reseller (Knox Customer ID) and confirms (upload completion, device visibility). Link to Samsung reseller docs. |
| **Legacy Samsung Knox Workspace (container) content** | Orthogonal — container-based Knox Workspace is separate from KME enrollment | Explicit OOS note; link to Android Enterprise BYOD work profile guide for personal/work separation on Samsung |

### Complexity Profile

**Admin complexity rating:** HIGH — 7-step dance with cross-organizational dependencies.

1. **Samsung B2B account creation** (1-2 business day wait for Samsung approval)
2. **Knox Admin Portal onboarding** (Knox Customer ID issued; trusted-reseller relationship configured by exchanging Knox Customer ID with Reseller ID)
3. **Reseller device upload approval** (email notification + manual approve, OR auto-approve via reseller preference)
4. **EMM enrollment profile creation in Knox Admin Portal** (select Intune as EMM, paste Intune enrollment token in Custom JSON)
5. **Profile-to-device assignment** (manual per-device, bulk, or auto-assign via reseller preference)
6. **First-boot verification** (one test device to confirm JSON + token + EMM handshake)
7. **Post-enrollment configuration** (Intune-side policies — not KME's job, but admins conflate)

**Dependency on existing v1.4 docs:**

- **Phase 35 ZT portal (`02-zero-touch-portal.md`)** — reciprocal mutual-exclusion callout; KME guide must forward-link `#kme-zt-mutual-exclusion` and restate the "KME wins when both configured" behavior.
- **Phase 35 MGP (`01-managed-google-play.md`)** — prerequisite for Intune-side app distribution on Knox-enrolled devices that are Android Enterprise; KME guide must reference, NOT duplicate.
- **Phase 36 COBO (`03-fully-managed-cobo.md`)** — existing Samsung-admins callout already points to v1.4.1 KME; KME guide must close that forward promise.
- **Phase 40 L1 triage** — must add KME-specific failure modes (Samsung approval lapsed, Knox profile Custom JSON malformed, EMM agent APK mismatch). Likely a new L1 runbook.
- **Android capability matrix `reference/android-capability-matrix.md`** — already has a `deferred-knox-mobile-enrollment-row` anchor; v1.4.1 must add the real row.

---

## Category 2: Full AOSP Per-OEM Expansion

### Per-OEM Capability Matrix (5 vendors × 7 dimensions)

| Dimension | RealWear (HMT-1 / HMT-1Z1 / Navigator 500) | Zebra (WS50) | PICO (Neo3 Pro/Eye, 4 Enterprise) | HTC (Vive Focus 3, Vive XR Elite, Vive Focus Vision) | Meta (Quest 2/3/3S/Pro) |
|-----------|---------------------------------------------|--------------|-----------------------------------|------------------------------------------------------|-------------------------|
| **Device class** | AR/VR headset (hands-free frontline) | Wearable barcode scanner (rugged) | AR/VR headset (XR enterprise) | AR/VR headset (XR enterprise) | AR/VR headset (consumer-origin enterprise) |
| **Minimum firmware** | HMT-1/HMT-1Z1 11.2; Navigator 500 1.1 | WS50: `11-49-15.00` | Neo3 Pro/Eye: PUI 4.8.19; 4 Enterprise: PUI 5.6.0 | Vive Focus 3: 5.2-5.0.999.624; XR Elite: 4.0-1.0.999.350; Focus Vision: 7.0.999.159 | Quest 2: v49; Quest 3: v59; Quest 3s: v71; Quest Pro: v49 |
| **Enrollment flavor** | Userless + User-associated (both documented) | Userless (dedicated kiosk typical) + User-associated | Userless + User-associated | Userless-primary (enrollment token + QR) | Userless via AOSP profile, with Meta Horizon Device Manager layer |
| **QR payload Wi-Fi embedding** | **REQUIRED** — no device-side Wi-Fi UI during enrollment | Required (staging Wi-Fi in QR) | Required (staging Wi-Fi in QR) | Required (staging Wi-Fi in QR) | Required (staging Wi-Fi in QR) |
| **One-device-at-a-time** | Yes (QR-only, no bulk) | Yes | Yes | Yes | Yes |
| **Regional availability caveats** | Global | Global | Global | Global | **Quest 2 / 3 / Pro: select regions only** per MS Learn table (Quest 3s: global) |
| **Intune licensing gate** | **Intune Suite OR Plan 2** for specialty/AR-VR devices | Plan 1 MAY suffice for scanner class; verify against specialty-devices doc at execute time | **Intune Suite OR Plan 2** for specialty/AR-VR devices | **Intune Suite OR Plan 2** for specialty/AR-VR devices | **Intune Suite OR Plan 2** for specialty/AR-VR devices |

**Authoritative source:** [MS Learn AOSP supported devices](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices) (updated 2026-04-16, `ms.date` 2025-05-12) for firmware and regional caveats; [MS Learn AOSP userless setup](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-userless-enroll) for token/QR mechanics; [Microsoft Community Hub — Purpose-built devices](https://techcommunity.microsoft.com/t5/microsoft-intune-blog/protect-your-organization-s-purpose-built-devices-with-microsoft/ba-p/3755654) for Plan 2 / Suite gating.

### Per-Vendor Table Stakes (Shared Envelope)

All 5 OEMs share these table-stakes constraints inherited from the AOSP enrollment envelope. The v1.4.1 expansion should NOT re-document these per-OEM — they belong in a shared AOSP top-matter.

| Feature | Envelope constraint | Source |
|---------|---------------------|--------|
| **Token expiry** | Up to 90 days (hard ceiling; contrast COBO default-no-expiry + staging-65-year) | MS Learn userless setup: "Token expiration date: Select the date the token expires, which can be up to 90 days in the future" |
| **Provisioning method** | QR ONLY. No NFC, no afw#setup, no Zero-Touch | MS Learn userless setup: single QR path |
| **Staging network** | WPA/WPA2 PSK or WPA3 only; NO captive portal, NO corporate-managed EAP | RealWear docs: "staging network MUST BE a WPA/WPA2 PSK/WPA3 network type... Guest networks with captive portals or Corporate managed networks are not compatible" |
| **Entra shared-device mode at enrollment** | Userless AOSP devices auto-enrolled into Entra Shared Device Mode | MS Learn userless setup: "Devices are configured in Microsoft Entra shared device mode during enrollment" |
| **Intune app minimum version** | 24.7.0 or later (as of Oct 1, 2024+) for sync | MS Learn userless setup: "Beginning October 1st, AOSP devices must have the Microsoft Intune app, version 24.7.0 or later" |
| **Known limitations (all AOSP)** | Cannot enforce alphabetic/alphanumeric/weak-biometric password types; device compliance reporting unavailable for AOSP; Intune for 21Vianet not supported | MS Learn userless setup Known Limitations section |
| **Remote actions available** | Wipe / Delete / Remote lock / Reset passcode / Restart — one device at a time | MS Learn userless setup |

### Per-Vendor Differentiators

| OEM | Differentiator | Why It Matters | Complexity Implication |
|-----|---------------|----------------|------------------------|
| **RealWear** | Only OEM with explicit Microsoft-documented userless AOSP setup narrative (RealWear is the MS Learn "example device" across pages) | Most mature integration; canonical reference for AOSP setup steps | Low — reuse Phase 39 RealWear GA spotlight content; expand to Navigator 500 firmware 1.1+ coverage |
| **Zebra (WS50)** | Wearable scanner, not AR/VR. OEMConfig via Zebra MX extension is the canonical configuration surface (not device-restrictions profile). Dedicated kiosk is typical deployment. | Different configuration tooling; different Intune policy pattern; the "use AE Dedicated where possible, fall back to AOSP only on WS50" guidance is load-bearing | Medium — document WS50 as "AOSP-only within the Zebra catalog; Zebra's GMS-capable devices should go AE Dedicated". Reference MS Learn [Zebra MX overview](https://learn.microsoft.com/en-us/intune/intune-service/configuration/android-zebra-mx-overview). |
| **PICO** | Vendor-public announcement of Intune integration (PICO Newsroom). PICO 4 Enterprise and Neo3 Pro/Eye both GA. | Enterprise-line specific (NOT consumer PICO 4) — corporate-channel procurement caveat | Low — standard AOSP pattern, call out "Enterprise SKU required" |
| **HTC VIVE Focus** | Three supported models with different min-firmware; XR Elite has lowest min-firmware (4.0-1.0.999.350) | Firmware version matrix per model — admin must verify device firmware before enrollment | Low — table of model × min-firmware |
| **Meta Quest** | **Meta Horizon managed services wind-down Feb 20, 2026.** Third-party MDM integration layer (Device Manager) is separate from native AOSP enrollment. Regional-availability caveat for Quest 2/3/Pro (select regions only). | Most volatile AOSP target — Intune AOSP enrollment via pure MS Learn path works, but the Meta Horizon path admins have historically used is going away. Recommend "use Intune AOSP enrollment profile; do NOT rely on Meta Horizon Device Manager for net-new deployments." | HIGH — requires execute-time re-verification; current-state caveat; possible "use alternative paths" fallback |

**Meta Horizon wind-down citation:** Meta public-facing communication — "Starting February 20, 2026, Meta Horizon managed services will no longer be available for purchase". This needs execute-time re-verification (press release vs. doc update vs. actual sunset).

### Per-Vendor Anti-Features

| OEM | Anti-Feature | Why Avoid |
|-----|-------------|-----------|
| **RealWear** | Documenting HMT-1Z1-specific intrinsically-safe certification | Certification compliance is not an Intune concern; stays with hardware docs |
| **Zebra** | Documenting OEMConfig schemas in detail | Zebra owns the MX schema; Intune delivers the config — stay at delivery layer, link to Zebra docs |
| **PICO** | Consumer PICO 4 (non-Enterprise) pathway | Consumer SKU not in MS Learn supported list; explicit OOS |
| **HTC** | Non-Enterprise HTC Vive consumer headsets | Same — consumer HTC Vive is not AOSP-managed via Intune |
| **Meta** | Meta Horizon managed services purchase recommendations | Winding down Feb 2026; documenting a dying path is anti-value. Flag and redirect. |

### Complexity Profile

**Admin complexity rating:** MEDIUM per OEM (all share envelope; vendor deltas are isolatable).

**Dependency on existing v1.4 docs:**

- **Phase 39 AOSP stub (`06-aosp-stub.md`)** — v1.4.1 replaces the deferred-content table rows with per-OEM H2 sections. Must preserve PITFALL-7 "not supported under AOSP" framing per STATE.md research flag.
- **Capability matrix `reference/android-capability-matrix.md`** — already has `deferred-full-aosp-capability-mapping` anchor; v1.4.1 lifts stub-reference column into per-OEM rows OR pushes per-OEM matrix to a separate OEM-deltas doc.
- **Phase 34 provisioning-methods matrix (`02-provisioning-methods.md`)** — AOSP is already QR-only; no change needed, but the 90-day token ceiling should be surfaced (currently documented as footnote only).
- **Android version matrix (`03-android-version-matrix.md`)** — per-OEM min-firmware table is net-new content, may live in Phase 39 expansion OR get surfaced to version matrix.

---

## Category 3: COPE Full Admin Path

### Decision: Ship Full Admin Guide (NOT Deprecation-Rationale Doc)

**Verdict reached after live research.** The v1.4 discussion-phase open question ("COPE full guide vs. deprecation-rationale doc") resolves to **full admin guide** based on two load-bearing facts verified 2026-04-24:

**Fact 1 — Intune surfaces COPE as first-class GA.** [MS Learn `setup-corporate-work-profile`](https://learn.microsoft.com/en-us/mem/intune/enrollment/android-corporate-owned-work-profile-enroll) (updated 2026-04-16, `ms.date` 2025-05-08) is an active how-to article documenting the enrollment profile under the Intune admin center label **"Corporate-owned devices with work profile"**. Two GA token types are documented: *"Corporate-owned with work profile (default)"* and *"Corporate-owned with work profile, via staging"*. The profile is not marked deprecated, not in preview, not legacy. Admin center navigation: **Devices → Enrollment → Android tab → Android Enterprise → Enrollment Profiles → Corporate-owned devices with work profile**.

**Fact 2 — Google's "recommends WPCO" is an implementation-evolution note, not a product deprecation.** Google rewrote the architecture in Android 11 from "work profile on fully managed" (original COPE) to "work profile on company-owned" (WPCO). Both share the use case. The current Intune enrollment profile IS the WPCO implementation on Android 11+ devices. On Android 8-10 devices, it's the legacy COPE implementation with NFC and afw#setup still supported; on Android 11+ those provisioning methods were removed for the COPE path (per MS Learn + [Google Developers Android Management](https://developers.google.com/android/management/provision-device)). Jason Bayton's [Android Enterprise EMM COPE support](https://bayton.org/android/android-enterprise-emm-cope-support/) page ("The future of COPE" callout) notes the Android 11 implementation change but stops short of formal deprecation language.

**Conclusion:** Ship a real admin guide. The Phase 36 COBO `## COPE Migration Note` is correct in its current wording ("Google recommends WPCO, COPE remains functionally supported, no formal deprecation notice") and can serve as the reciprocal anchor for the v1.4.1 COPE admin guide.

### Table Stakes

| Feature | Why Expected | Complexity | Baseline |
|---------|--------------|------------|----------|
| **"Corporate-owned devices with work profile" enrollment profile creation** | Core admin flow — must match COBO pattern for admin familiarity | Low (MS Learn documents it) | MS Learn `setup-corporate-work-profile` full stepper |
| **Default vs. Staging token selection** | Same token-type pattern as COBO; staging for partner pre-provisioning | Low (reuse Phase 36 COBO framing) | MS Learn: two token types with same semantics as COBO |
| **Token expiry: default no-expiry; staging up to 65 years** | Admin expects token lifecycle parity with COBO | Low | MS Learn: "Tokens for corporate-owned devices with a work profile will not expire automatically" + staging 65-year ceiling |
| **Naming template + device group + scope tags** | Standard enrollment-profile admin affordances | Low (identical to COBO profile page structure) | MS Learn |
| **Android version gate: COPE use of `afw#setup` + NFC removed on Android 11+** | Admins carrying forward COBO provisioning expectations WILL hit this breakpoint | MEDIUM — version-matrix callout load-bearing | MS Learn: *"the `afw#setup` enrollment method and the Near Field Communication (NFC) enrollment method are only supported on devices running Android 8-10. They are not available on Android 11."* |
| **Intune app replaces Company Portal as on-device DPC** | Post-AMAPI April 2025; matches BYOD pattern | Low | MS Learn: "The Microsoft Intune app automatically installs on corporate-owned work profile devices during enrollment. This app is required for enrollment and can't be uninstalled" |
| **Private space (Android 15) exclusion** | Android 15 introduced "Private space" feature — Intune does NOT support MDM within it | Medium (new Android 15 breakpoint) | MS Learn Limitations: "Private space is a feature introduced with Android 15... Microsoft Intune doesn't support mobile device management within the private space" |
| **Microsoft Authenticator auto-install** | Required for work-profile sign-in | Low | MS Learn: "The Microsoft Authenticator app automatically installs on corporate-owned work profile devices during enrollment" |

### Differentiators

| Feature | Value Proposition | Complexity | Baseline |
|---------|-------------------|------------|----------|
| **COPE vs. COBO decision matrix (when to choose COPE)** | Admins familiar with COBO need a clear "why COPE?" story | MEDIUM — workflow-decision content | Derive from Android Enterprise use cases: single-user corporate device with personal-use allowance (e.g., field sales, executive devices, corporate phones with personal app allowance) vs. COBO's zero-personal-app stance |
| **Profile-boundary behavior (what IT sees vs. what user controls)** | Privacy story differentiator vs. COBO | MEDIUM — Android 11 WPCO changes shifted boundaries | Google-side privacy-by-default: IT visibility into personal side restricted on Android 11+; device-wide restrictions scope narrower than COBO |
| **Migration paths** | Admins with existing COBO or BYOD fleets need a "convert" story | HIGH — typically requires factory reset | Document the migration semantics (no in-place conversion; factory reset + re-enroll to new profile) |
| **COPE ↔ WPCO terminology reconciliation** | The glossary already flags this — admin guide must operationalize it | LOW (reference glossary; don't re-teach) | Phase 34 `_glossary-android.md` COPE + WPCO entries already land this |

### Anti-Features

| Anti-Feature | Why Avoid |
|--------------|-----------|
| **"COPE is deprecated, use WPCO" framing** | Factually wrong per MS Learn + Google dev docs. Use "Intune's 'Corporate-owned devices with work profile' IS the WPCO implementation on Android 11+." |
| **Re-documenting Google's architectural evolution from original-COPE to WPCO** | Phase 34 glossary already owns this (COPE + WPCO entries). Reference, don't repeat. |
| **Separate per-work-profile config-profile documentation** | This is Configuration Profile authoring — distinct from enrollment; cross-link instead |
| **Full treatment of work-profile app isolation semantics** | Same — belongs in BYOD Work Profile guide or app-deployment docs |
| **"COPE = COBO + work profile" equivalence claim** | MISLEADING on Android 11+. The implementations differ structurally. |

### Complexity Profile

**Admin complexity rating:** MEDIUM — similar to COBO but with added terminology reconciliation burden and an Android-version-matrix branch for the `afw#setup` + NFC breakpoint.

**Dependency on existing v1.4 docs:**

- **Phase 36 COBO (`03-fully-managed-cobo.md`)** — reciprocal: the `## COPE Migration Note` section is the forward anchor that the v1.4.1 COPE guide must close (add back-link, validate wording).
- **Phase 34 glossary (`_glossary-android.md`)** — COPE and WPCO entries ground-truth the terminology; reference, don't duplicate.
- **Phase 35 ZT portal (`02-zero-touch-portal.md`)** — Zero-Touch Method A/B choice matters for COPE fleets (Method A creates Fully Managed default — WRONG for COPE). Already documented in Phase 35; COPE guide must surface this as a Zero-Touch-provisioning-COPE pitfall.
- **Phase 35 MGP (`01-managed-google-play.md`)** — prerequisite; reference.
- **Android version matrix (`03-android-version-matrix.md`)** — `afw#setup` + NFC removed on Android 11+ for COPE path is a version-matrix row; validate current state of that row against MS Learn at execute time.
- **Phase 34 provisioning-methods matrix (`02-provisioning-methods.md`)** — already has COPE rows with Android-11 breakpoint. Validate.
- **Android capability matrix** — does NOT currently list COPE as a distinct mode (5-mode scope was COBO/BYOD/Dedicated/ZTE/AOSP). v1.4.1 decision: does COPE become a 6th mode column, or stay folded into ZTE-as-provisioning-path? Recommend **adding COPE as a 6th column** given it's a first-class Intune enrollment profile.

---

## Cross-Category Dependencies on Existing v1.4 Docs

Summarized for the roadmap:

| v1.4 Doc | Knox ME v1.4.1 use | AOSP-per-OEM v1.4.1 use | COPE v1.4.1 use |
|----------|---------------------|--------------------------|------------------|
| Phase 34 `_glossary-android.md` | Reference (Knox is Samsung-specific, not Android-general; may add KME entry as Android-native term or as callout in existing ZTE entry) | Reference (AOSP entry already exists) | Reference (COPE + WPCO entries already exist — ground truth) |
| Phase 34 `02-provisioning-methods.md` | Add KME row (deferred-knox-mobile-enrollment-row anchor already exists in cap matrix; provisioning-methods matrix needs its own KME row) | Validate 90-day token ceiling surfacing | Validate Android-11 breakpoint for afw#setup + NFC on COPE path |
| Phase 34 `03-android-version-matrix.md` | Minimal; KME is Samsung-OS agnostic (Android 10+) | Net-new per-OEM min-firmware table (or separate per-OEM doc) | Validate COPE row for afw#setup + NFC removal on Android 11+ |
| Phase 35 `01-managed-google-play.md` | Prerequisite reference | NOT applicable (AOSP is non-GMS; no MGP) | Prerequisite reference |
| Phase 35 `02-zero-touch-portal.md` | **CRITICAL** — reciprocal mutual-exclusion pin (`#kme-zt-mutual-exclusion`); KME guide must close the forward promise from this doc | NOT applicable (AOSP does not use ZT) | Reference Method A/B scale implication (Method A wrong for COPE) |
| Phase 36 `03-fully-managed-cobo.md` | Samsung admins callout references v1.4.1 KME | NOT applicable | **CRITICAL** — `## COPE Migration Note` is the forward anchor; COPE guide closes it |
| Phase 37 `04-byod-work-profile.md` | NOT applicable | NOT applicable | Reference (work-profile isolation semantics) |
| Phase 38 `05-dedicated-devices.md` | KME can enroll into Dedicated mode on Samsung; low-risk reference | NOT applicable (Dedicated is GMS-path; AOSP is separate) | NOT applicable |
| Phase 39 `06-aosp-stub.md` | NOT applicable | **CRITICAL** — v1.4.1 expands this stub or replaces with per-OEM coverage; PITFALL-7 framing preserved | NOT applicable |
| Phase 40 L1 runbooks (22-27) | Need new KME-specific L1 runbook (enrollment failed — Knox profile missing / Custom JSON malformed / approval lapsed) | Likely no per-OEM L1 (volume low); may add AOSP-enrollment-failed L1 | May add COPE-specific failure mode row to existing L1-22 enrollment-blocked runbook |
| Phase 41 L2 runbooks (18-21) | Likely reference — Knox-specific logs are Samsung-side; Intune-side shows opaque enrollment failure | Likely reference — AOSP log-collection already documented in Phase 41 | Likely reference — COPE failure modes align with COBO L2 investigation patterns |
| Phase 42 `reference/android-capability-matrix.md` | Add real KME row (close `deferred-knox-mobile-enrollment-row` anchor) | Lift stub-reference column to per-OEM rows OR separate OEM-delta doc (close `deferred-full-aosp-capability-mapping` anchor) | Add COPE column OR fold into existing cols with "COPE parity" annotation |

---

## MVP Recommendation (for Roadmap)

If v1.4.1 must be further trimmed, priority order:

1. **COPE full admin guide** (DEFER-06) — cleanest scope; reuses Phase 36 COBO patterns; closes a live admin-center-visible enrollment profile with no docs; single MS Learn authoritative source; no vendor volatility.
2. **Knox Mobile Enrollment** (DEFER-04) — clear scope; 7-step dance but each step is documentable; Samsung-side stable; reciprocal pin already planted in Phase 35; largest admin-impact of the three (Samsung fleets are common).
3. **Full AOSP per-OEM** (DEFER-05) — **HIGHEST VOLATILITY** due to Meta Horizon Feb 2026 wind-down; 5 OEMs × varying docs; per-OEM gaps; requires plan-time re-verification; highest chance of staling within 60-day review cycle. Recommend shipping as a per-OEM H2 set within the Phase 39 doc, NOT separate per-OEM docs, to minimize surface area.

**Defer candidate:** None — all three items are already v1.4.1 scope per PROJECT.md; no deferrals to v1.5 beyond the already-tracked DEFER-07 (nav integration) and DEFER-08 (4-platform comparison).

---

## Per-Category Quality-Gate Check

| Quality gate | Knox ME | AOSP per-OEM | COPE |
|---|---|---|---|
| Table stakes vs differentiators vs anti-features distinguished | ✓ | ✓ | ✓ |
| Complexity noted (tiers, gates, setup steps) | ✓ HIGH (7-step, Samsung B2B) | ✓ MEDIUM per-OEM (shared envelope + deltas) | ✓ MEDIUM (admin familiarity from COBO) |
| Dependencies on existing v1.4 docs | ✓ | ✓ | ✓ |
| COPE full-guide vs deprecation-rationale decision made | — | — | **✓ FULL GUIDE** (verified 2026-04-24) |
| AOSP per-vendor feature-support deltas (not blanket) | — | ✓ 5-OEM × 7-dim matrix | — |
| PITFALL-7 "not supported under AOSP" preserved | — | ✓ (must be retained from Phase 39) | — |

---

## Sources

### Microsoft Learn (HIGH confidence, authoritative)

- [Automatically enroll devices with Samsung Knox Mobile Enrollment](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-samsung-knox-mobile) — updated 2026-04-14, `ms.date` 2023-12-01
- [Set up Android Enterprise work profile for corporate owned devices](https://learn.microsoft.com/en-us/mem/intune/enrollment/android-corporate-owned-work-profile-enroll) — updated 2026-04-16, `ms.date` 2025-05-08 (COPE authoritative source)
- [Android Open Source Project Supported Devices](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices) — updated 2026-04-16, `ms.date` 2025-05-12 (AOSP OEM table)
- [Set up Intune enrollment for Android (AOSP) corporate-owned userless devices](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-userless-enroll) — updated 2026-04-16, `ms.date` 2025-05-15 (AOSP setup envelope)
- [Enroll Android Enterprise dedicated, fully managed, or corporate-owned work profile devices in Intune](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-dedicated-devices-fully-managed-enroll)
- [Manage Specialty devices with Microsoft Intune](https://learn.microsoft.com/en-us/mem/intune/fundamentals/specialty-devices-with-intune) (Plan 2 / Suite licensing gate)
- [Use Zebra Mobility Extensions on Android devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/configuration/android-zebra-mx-overview)

### Microsoft Tech Community (HIGH confidence, official Intune blog)

- [Protect your organization's purpose-built devices with Microsoft Intune](https://techcommunity.microsoft.com/t5/microsoft-intune-blog/protect-your-organization-s-purpose-built-devices-with-microsoft/ba-p/3755654) — Intune Suite / Plan 2 gate for AR/VR specialty devices

### Samsung Knox Documentation (HIGH confidence, vendor authoritative)

- [Knox Mobile Enrollment documentation hub](https://docs.samsungknox.com/admin/knox-mobile-enrollment/)
- [Get started with Knox Mobile Enrollment](https://docs.samsungknox.com/admin/knox-mobile-enrollment/get-started/get-started-with-knox-mobile-enrollment/)
- [Manage licenses | Knox Mobile Enrollment](https://docs.samsungknox.com/admin/knox-mobile-enrollment/how-to-guides/manage-licenses/)
- [Knox licenses | Fundamentals](https://docs.samsungknox.com/admin/fundamentals/knox-licenses/)
- [Samsung Knox × Microsoft Intune partner page](https://www.samsungknox.com/en/partner-solutions/microsoft-intune)
- [Configure standard settings | Knox Mobile Enrollment](https://docs.samsungknox.com/admin/knox-mobile-enrollment/how-to-guides/manage-profiles/create-profiles/configure-standard-settings/)

### OEM Vendor Documentation (HIGH confidence, vendor authoritative)

- [RealWear — Enrolling in Microsoft Intune: Creating Enrollment Token](https://support.realwear.com/knowledge/enrolling-in-microsoft-intune)
- [RealWear — Supported EMM Providers](https://support.realwear.com/knowledge/supported-enterprise-mobility-management-providers)
- [RealWear — Intune AOSP FAQ](https://support.realwear.com/knowledge/faq-intune-aosp)
- [RealWear — Configuration from QR Code](https://support.realwear.com/knowledge/configuration-for-devices-from-a-qr-code)
- [PICO Newsroom — Microsoft Intune integration](https://www.picoxr.com/global/about/newsroom/microsoft-intune)
- [PICO 4 Ultra Enterprise product page](https://www.picoxr.com/global/products/pico4-ultra-enterprise)
- [HTC VIVE Focus 3 — Enrollment via enrollment token](https://www.vive.com/us/support/focus3/category_howto/enrolling-the-headset-using-the-device-enrollment-token.html)
- [Meta for Work — Create a third-party enrollment](https://work.meta.com/help/294719289919907)
- [Meta Horizon managed services (wind-down Feb 2026)](https://forwork.meta.com/meta-horizon-managed-solutions/)
- [Zebra — Enrolling Zebra Android Device with MS Intune](https://supportcommunity.zebra.com/s/article/000021176?language=en_US)
- [Zebra — Enroll Microsoft Intune Using StageNow](https://supportcommunity.zebra.com/s/article/000020868?language=en_US)

### Community & Supplementary (MEDIUM confidence, community expertise)

- [Jason Bayton — Android Enterprise EMM COPE support](https://bayton.org/android/android-enterprise-emm-cope-support/) — WPCO vs. legacy-COPE architectural evolution
- [Jason Bayton — 2026 Android Security Paper review](https://bayton.org/blog/2026/03/reviewing-the-2026-security-paper/)
- [Jason Bayton — Android Enterprise FAQ](https://bayton.org/android/android-enterprise-faq/)
- [Peter van der Woude — Using Samsung Knox Mobile Enrollment with Microsoft Intune](https://petervanderwoude.nl/post/using-samsung-knox-mobile-enrollment-with-microsoft-intune/)
- [Peter van der Woude — Getting started with Corporate-Owned devices with Work Profile](https://petervanderwoude.nl/post/getting-started-with-android-enterprise-corporate-owned-devices-with-work-profile/)
- [HTMD — Intune supports HTC and Pico for AOSP devices](https://www.anoopcnair.com/intune-supports-devices-android-open-source/)
- [Anoop C Nair — Android AOSP Devices Support with Intune](https://www.anoopcnair.com/android-aosp-devices-support-with-intune/)
- [MDM Tech Space — Zebra management options with Intune](https://joymalya.com/zebra-management-options-with-intune/)
- [Hubert Maslowski — Samsung's KME with Android Enterprise enrollment to Intune](https://hmaslowski.com/home/f/samsungs-kme-with-android-enterprise-enrollment-to-memintune)
- [Hubert Maslowski — Zebra's OEMConfig on Android dedicated (COSU)](https://hmaslowski.com/f/manage-zebra-devices-as-android-enterprise-cosu-with-oemconfig)
- [IntuneStuff — Android Intune Enrollment Profiles unconfused](https://intunestuff.com/2024/07/17/android-intune-unconfuse-the-confusion/)
- [Cloud Tek Space — Enroll Android (AOSP) Devices in Intune](https://www.cloudtekspace.com/post/enroll-android-aosp-devices-in-intune)

### Google Android Enterprise (HIGH confidence, vendor authoritative)

- [Android Enterprise Help — General FAQs](https://support.google.com/work/android/answer/14772109?hl=en)
- [Google Developers — Provision device (WPCO + COPE)](https://developers.google.com/android/management/provision-device)
- [Android Enterprise Recommended](https://www.android.com/enterprise/recommended/)
