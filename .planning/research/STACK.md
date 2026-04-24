# v1.4.1 Stack Research — Android Enterprise Completion

**Researcher:** gsd-project-researcher | **Milestone:** v1.4.1 | **Date:** 2026-04-24
**Scope:** 3 NEW stack surfaces — Samsung Knox Mobile Enrollment (DEFER-04), per-OEM AOSP expansion (DEFER-05), COPE in Intune 2026 state (DEFER-06)
**Overall confidence:** HIGH on Knox portal + Intune AOSP device matrix; HIGH on COPE active support (MS Learn UI-verified 2026-04-16); HIGH on per-OEM supported matrix; MEDIUM on per-vendor portal tier names (community-sourced for RealWear Cloud, Pico Business Suite).

---

## Executive Summary

All three v1.4.1 stack additions are **extensions** of the existing v1.4 tri-portal pattern, not replacements. No net-new ecosystem — same Microsoft Intune admin center as canonical admin surface, same Managed Google Play binding prerequisite (for GMS modes), same Zero-Touch portal as companion. The three new surfaces slot in as **parallel-channel overlays**:

1. **Knox Mobile Enrollment (KME)** is a **4th portal** alongside Zero-Touch (never both for same Samsung device). Portal: `https://central.samsungknox.com`. Baseline KME is **FREE**; advanced profile features (device-lock-during-enrollment, app-install-during-enrollment) require paid **Knox Suite** license. Intune-side requires **standard Intune Plan 1+** — no special Intune SKU gate.

2. **Per-OEM AOSP expansion** is a **matrix lift**, not a new portal. Intune AOSP enrollment centralized through same endpoints Phase 39 documented. Per-vendor variance is in **device preparation** (firmware minimums, vendor companion apps, QR-payload constraints), NOT in admin-portal surface. **Meta Quest is the outlier:** requires **Meta Horizon Managed Services subscription** (paid, per-device) + third-party MDM token handoff via `work.meta.com` — a **5th portal** for Meta fleets.

3. **COPE in Intune 2026 state:** Microsoft has **rebranded the UI but not deprecated** the mode. Intune admin center now calls it **"Corporate-owned devices with work profile"**. MS Learn page still actively maintained (updated 2026-04-16). Google's WPCO is forward-facing terminology, not Microsoft deprecation. **Recommendation for DEFER-06:** ship **FULL COPE admin guide** (not a deprecation-rationale doc).

---

## Stack Addition 1 — Samsung Knox Mobile Enrollment (KME)

### Portal & Access

| Element | Value | Confidence |
|---|---|---|
| Portal landing URL | `https://central.samsungknox.com` | HIGH |
| KME dashboard path | Knox Admin Portal → sidebar → Knox Mobile Enrollment → Dashboard | HIGH |
| Sign-in URL | `https://central.samsungknox.com/login-navigator` | HIGH |
| Account creation | Samsung Knox account with Samsung approval (1-2 business days) | HIGH |
| Account identity | Corporate email; Samsung Knox account ≠ Google account | HIGH |

### License Tier Gating

| Feature | License Requirement | Confidence |
|---|---|---|
| Baseline KME (bulk IMEI upload, profile, enrollment) | **Free** — no paid Samsung license | HIGH |
| Device lock during enrollment (anti-theft) | Paid **Knox Suite** | HIGH |
| App installation during enrollment | Paid **Knox Suite** | HIGH |
| Intune-side license | **Intune Plan 1+** (no special tier) | HIGH |
| Knox version minimum | **Knox 2.4+** | HIGH |
| Android version minimum | **Android 8.0+** | HIGH |

**For DEFER-04 copy:** "KME is a paid Samsung tier" is inaccurate. Lead with "Free baseline; Knox Suite unlocks anti-theft and pre-deployment app push."

### Intune Integration Mechanics

KME profile accepts Custom JSON embedding Intune enrollment token:

```json
{"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "<INTUNE_ENROLLMENT_TOKEN>"}
```

Structurally **same DPC-extras pattern as Zero-Touch** — same Intune token, same DPC package, different delivery channel.

**Supported Android Enterprise modes via KME:** Dedicated (COSU), Fully managed (COBO), Corporate-owned with work profile (COPE).
**NOT supported:** BYOD Work Profile.

### Device Upload Methods

| Method | Use Case |
|---|---|
| Samsung-approved reseller | Bulk — auto-uploads IMEIs at purchase |
| Knox Deployment App (Bluetooth/NFC) | Upload existing Samsung stock one at a time |

### Reciprocal Mutual-Exclusion with Zero-Touch Samsung

Samsung devices with both Knox and Android Enterprise Zero-Touch enrollment readiness can be registered in exactly **one** of the two systems. Both → first-boot conflict.

**Decision:** Choose KME when (a) Samsung-only fleet AND (b) need Knox-Suite-gated features OR (c) reseller supports KME but not ZT. Choose ZT when (a) mixed-OEM OR (b) no Knox Suite features needed.

**Sources:**
- HIGH — [MS Learn: Samsung Knox Mobile Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-samsung-knox-mobile-enroll) (2026-04-14)
- HIGH — [Samsung Knox: KME get-started](https://docs.samsungknox.com/admin/knox-mobile-enrollment/get-started/get-started-with-knox-mobile-enrollment/) (2025-08-05)
- HIGH — [Samsung Knox Central Portal](https://central.samsungknox.com/)

---

## Stack Addition 2 — Per-OEM AOSP Portals & Management Tools

### Canonical Intune AOSP Device Matrix (2026-04-16 MS Learn snapshot)

8 OEMs / 18 models. Drift from v1.4 Phase 39 stub: +HTC Vive Focus Vision, +Meta Quest 3s. No removals. All v1.4 OEM claims remain valid.

| OEM | Device | Min Firmware | Class | Regional |
|---|---|---|---|---|
| DigiLens | ARGO | DigiOS 2068 | AR/VR | — |
| HTC | Vive Focus 3 | 5.0.999.624 | AR/VR | — |
| HTC | Vive XR Elite | 1.0.999.350 | AR/VR | — |
| HTC | Vive Focus Vision | 7.0.999.159 | AR/VR | — |
| Lenovo | ThinkReality VRX | VRX_user_S766001 | AR/VR | — |
| **Meta** | **Quest 2** | **v49** | **AR/VR** | **Select regions** |
| **Meta** | **Quest 3** | **v59** | **AR/VR** | **Select regions** |
| **Meta** | **Quest 3s** | **v71** | **AR/VR** | — |
| **Meta** | **Quest Pro** | **v49** | **AR/VR** | **Select regions** |
| PICO | PICO 4 Enterprise | PUI 5.6.0 | AR/VR | — |
| PICO | PICO Neo3 Pro/Eye | PUI 4.8.19 | AR/VR | — |
| RealWear | HMT-1 | 11.2 | AR/VR | — |
| RealWear | HMT-1Z1 | 11.2 | AR/VR | — |
| RealWear | Navigator 500 | 1.1 | AR/VR | — |
| Vuzix | Blade 2 | 1.2.1 | AR/VR | — |
| Vuzix | M400 | M-Series 3.0.2 | AR/VR | — |
| Vuzix | M4000 | M-Series 3.0.2 | AR/VR | — |
| **Zebra** | **WS50** | **11-49-15.00** | **Wearable scanner** | **—** |

### Per-OEM Vendor Management Tooling (5 spotlight OEMs for DEFER-05)

#### RealWear (HMT-1, HMT-1Z1, Navigator 500)

| Element | Value | Confidence |
|---|---|---|
| Vendor portal | **RealWear Cloud** (formerly Foreman) | HIGH |
| Workspace Basic | Free — analytics + basic | MEDIUM |
| Workspace Pro | Paid — remote management at scale | MEDIUM |
| Intune coexistence | **Hybrid supported** (Firmware 11+) | HIGH |
| Enrollment | QR-only; **Wi-Fi credentials MUST be embedded** | HIGH |
| Intune AOSP mode | User-associated | HIGH |

#### Zebra (WS50)

| Element | Value | Confidence |
|---|---|---|
| Vendor portal | **StageNow** (desktop tool, not web) | HIGH |
| OEMConfig app | **Zebra OEMConfig** via Intune APK push (AOSP, no MGP) | HIGH |
| Enrollment | QR via StageNow-generated OR Intune-generated | HIGH |
| Intune AOSP mode | User-associated OR userless | HIGH |

**Key callout:** WS50 is AOSP. OEMConfig delivered via Intune APK push, NOT Managed Google Play.

#### Pico (PICO 4 Enterprise, Neo3 Pro/Eye)

| Element | Value | Confidence |
|---|---|---|
| Vendor portal | **Pico Business Suite** — `business.picoxr.com` | HIGH |
| Tier | First-party lightweight MDM | HIGH |
| Intune coexistence | **Supported** — works with Intune + ArborXR + ManageXR + Workspace ONE | HIGH |
| Enrollment | QR via Intune AOSP flow | HIGH |

**Pico Business Suite is optional** — Intune can manage Pico directly via AOSP.

#### HTC (Vive Focus 3, Vive XR Elite, Vive Focus Vision)

| Element | Value | Confidence |
|---|---|---|
| Vendor portal | HTC Vive Business DMS | MEDIUM (optional) |
| Direct-Intune flow | YES — Intune enrollment via QR token | HIGH |
| Enrollment | QR via Intune AOSP flow | HIGH |

**Simplest of AR/VR OEMs** — scan Intune QR from headset setup wizard.

#### Meta Quest (2, 3, 3s, Pro) — THE OUTLIER

| Element | Value | Confidence |
|---|---|---|
| Vendor portal | **Meta for Work Admin Center** — `work.meta.com` | HIGH |
| Intune integration | **Requires Meta Horizon Managed Services subscription** (paid) | HIGH |
| Subscription pattern | **One Meta Horizon sub per device** | HIGH |
| Supported third-party MDMs | Intune, ArborXR, Ivanti, ManageXR, Omnissa | HIGH |
| Enrollment | Intune QR token → uploaded to `work.meta.com` → pushed to Quest fleet | HIGH |

**Meta 4-portal pattern:** Intune + MGP (N/A) + ZT (N/A) + Meta for Work.
**Cost implication:** Per-device recurring cost Phase 39 didn't document.
**Wind-down risk:** Community-sourced reports of Feb 20, 2026 Meta Horizon managed-services wind-down surfaced during research. **Re-verify at plan time (MEDIUM confidence).**

### Per-OEM Stack Integration Matrix

| OEM | Vendor Portal | Portal Required? | Vendor License Required? | Intune AOSP Mode |
|---|---|---|---|---|
| RealWear | RealWear Cloud | Optional | Optional (Workspace Pro advanced) | User-associated |
| Zebra | StageNow + OEMConfig | Optional (OEMConfig only) | Free | User-associated or userless |
| Pico | PICO Business Suite | Optional | Free baseline | User-associated |
| HTC | Vive Business DMS | NO | NO | User-associated |
| **Meta** | **Meta for Work** | **REQUIRED** | **REQUIRED (Meta Horizon)** | **User-associated** |

**Key finding:** Meta is the only OEM with hard-prerequisite vendor portal + vendor license.

### Phase 39 Constraint Preservation

| Constraint | Still applies? | Per-OEM variance |
|---|---|---|
| QR-only enrollment | YES | Uniform |
| One device at a time | YES | Uniform |
| Wi-Fi credential embedding | YES for RealWear; **OPTIONAL** for others | RealWear needs it (no UI); others interactive-Wi-Fi OK |

**For DEFER-05 copy:** Wi-Fi embedding should be **per-OEM-scoped**, not uniform.

**Sources:**
- HIGH — [MS Learn AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices) (2026-04-16)
- HIGH — [MS Learn AOSP user-associated enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-user-associated-enroll)
- HIGH — [MS Learn AOSP userless enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-userless-enroll)
- HIGH — [RealWear EMM providers](https://support.realwear.com/knowledge/supported-enterprise-mobility-management-providers)
- HIGH — [Meta for Work third-party MDM](https://work.meta.com/help/294719289919907)
- HIGH — [HTC Vive Focus 3 Intune enrollment](https://www.vive.com/us/support/focus3/category_howto/enrolling-the-headset-using-the-device-enrollment-token.html)

---

## Stack Addition 3 — COPE in Intune (2026 State)

### Current Terminology and UI Label

**Intune admin center (2026):** Mode labeled **"Corporate-owned devices with work profile"**.
Nav: `Devices → Enrollment → Android → Android Enterprise → Enrollment Profiles → Corporate-owned devices with work profile`

**Google terminology:** Uses **WPCO (Work Profile on Company-Owned)** forward-facing.
**Net state:** COPE is alive and shipping in Intune as of 2026-04-24. Microsoft UI relabel only; Google terminology shift only. Pre-existing v1.4 COBO `#cope-migration` note is **directionally correct** — needs no update.

### Intune-Side Stack Details (2026)

| Element | Value |
|---|---|
| Current UI label | "Corporate-owned devices with work profile" |
| Android version minimum | **8.0+** |
| GMS required? | **YES** |
| `afw#setup` support | Android **8-10 only** (removed Android 11+) |
| NFC provisioning | Android **8-10 only** (removed Android 11+) |
| QR code support | Android 8+ |
| Zero-Touch support | YES — ZT Method B direct |
| KME support | YES |
| Token types | Default (no expiry) + Staging (65 years) |
| Dynamic enrollment-time grouping | Supported via `enrollmentProfileName Equals [name]` |
| Naming templates | `{{SERIAL}}`, `{{SERIALLAST4DIGITS}}`, `{{DEVICETYPE}}`, `{{ENROLLMENTDATETIME}}`, `{{UPNPREFIX}}`, `{{USERNAME}}`, `{{RAND:x}}` |
| Mandatory enrollment apps | Microsoft Intune app + Microsoft Authenticator |
| Android 15 Private Space | **Not supported / unmanaged** by Intune |

### Recommendation for DEFER-06

> **Ship FULL COPE admin guide**, not deprecation-rationale doc.

**Rationale:**
1. Microsoft treats COPE as first-class enrollment mode (MS Learn actively maintained; UI tile exists)
2. Google has not issued formal deprecation; WPCO is terminology evolution
3. Intune admin surface for COPE has materially different mechanics from COBO (token types, `afw#setup`/NFC availability, Android 15 Private Space)
4. Deprecation-rationale doc would not cover deployment depth real fleets need
5. v1.4 COBO `#cope-migration` note positioning is natural callout → full admin guide

### COPE Admin Guide Stack Elements

| Element | Details | v1.4 Precedent |
|---|---|---|
| Intune admin center | `endpoint.microsoft.com` | COBO guide |
| Managed Google Play | Hard prereq | `01-managed-google-play.md` |
| Zero-Touch portal | Method B direct (Method A creates COBO) | `02-zero-touch-portal.md` |
| Knox Mobile Enrollment | Supported (4th portal for Samsung) | NEW — DEFER-04 |
| Token types | Default + Staging (65 years) | COBO parallel |
| Provisioning methods | QR (all), `afw#setup` + NFC (8-10 only), ZT | Phase 34 matrix |
| Android 15 FRP/EFRP | Same as COBO | COBO `#android-15-frp` |
| Private Space limitation | **NEW for v1.4.1** | — |

**Sources:**
- HIGH — [MS Learn: Corporate-owned work profile](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-corporate-owned-work-profile-enroll) (2026-04-16; ms.date 2025-05-08)
- HIGH — [MS Learn: Android enrollment deployment guide](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-android)
- MEDIUM — [Scalefusion WPCO explainer](https://scalefusion.com/android-corporate-owned-personally-enabled-cope)

---

## Cross-Cutting: What NOT to Add (v1.4 exclusions preserved)

| Excluded | Why |
|---|---|
| Android Device Administrator (DA) legacy mode | Deprecated 2024-12-31 for GMS; v1.4 exclusion |
| Samsung Knox E-FOTA firmware management | Orthogonal to Intune |
| Samsung Knox Manage (standalone MDM) | Competing MDM; v1.4.1 is Intune-with-KME |
| Samsung Knox On-Device Attestation as separate stack | Automatic in Intune since 2025 |
| ChromeOS | Different platform |
| ArborXR / ManageXR / Ivanti / Omnissa | Competing MDMs; document existence only |
| RealWear Cloud standalone (without Intune) | Off-Intune path |
| Pico Business Suite standalone (without Intune) | Off-Intune path |
| Android TV / Wear OS / Android Auto | v1.4 exclusion |

---

## Confidence Summary

| Assertion | Confidence |
|---|---|
| Knox Admin Portal URL = central.samsungknox.com | HIGH |
| KME baseline free; Knox Suite gates advanced | HIGH |
| KME uses Intune Plan 1+ (no special tier) | HIGH |
| KME supports Dedicated + COBO + COPE (NOT BYOD) | HIGH |
| KME + ZT mutual-exclusion for Samsung | HIGH |
| MS Learn AOSP matrix = 8 OEMs / 18 models (2026-04-16) | HIGH |
| Meta Quest requires Meta Horizon Managed Services | HIGH |
| Meta 4-portal pattern | HIGH |
| RealWear Wi-Fi-embedding is vendor-specific | HIGH |
| Zebra WS50 StageNow + OEMConfig (no GMS) | HIGH |
| HTC Vive / Pico direct-QR via Intune | HIGH |
| Intune UI labels COPE as "Corporate-owned w/ work profile" | HIGH |
| COPE NOT deprecated — actively maintained | HIGH |
| Google WPCO = terminology, not deprecation | MEDIUM |
| `afw#setup` + NFC removed for COPE on Android 11+ | HIGH |
| Android 15 Private Space unmanaged by Intune | HIGH |
| RealWear Workspace tier names | MEDIUM |
| Pico Business Suite coexistence with Intune | MEDIUM |
| Meta Horizon wind-down (Feb 20, 2026) | MEDIUM — re-verify at plan time |

---

## Roadmap Implications

**Suggested phase shape:**

1. **Cleanup/hardening** (DEFER-01/02/03) — audit allow-list + 60-day freshness + Phase 39 stub. Stack-neutral.
2. **Knox Mobile Enrollment** (DEFER-04) — Samsung-scoped admin guide; reciprocal links; tri-portal → 4-portal overlay.
3. **Full AOSP per-OEM** (DEFER-05) — 5 OEM spotlight; Meta-special-case with Meta Horizon + 4-portal.
4. **COPE full admin guide** (DEFER-06) — new file parallel-structured to COBO; retain v1.4 migration note.
5. **Integration + re-audit** — flip `tech_debt → passed`.

**Phase ordering rationale:**
- Cleanup first to clear `tech_debt` blockers
- Knox before AOSP (low risk vs. Meta complexity)
- COPE last (benefits from Knox/AOSP refinements)

---

## Sources (consolidated)

**Microsoft Learn (HIGH throughout):** Samsung KME setup, Corporate-owned work profile, AOSP Supported Devices, AOSP corporate-owned user-associated/userless enrollment, Zebra MX overview, OEMConfig Zebra, Android enrollment deployment guide

**Samsung Knox (HIGH):** Knox Central Portal, KME get-started, KME MDM Setup Guide

**OEM (HIGH for Intune-direct; MEDIUM for vendor-portal tiers):** RealWear EMM providers, RealWear Intune AOSP FAQ, HTC Vive XR Elite Intune guide, HTC Vive Focus 3 MDM, PICO Business, Meta for Work enrollment, Meta Horizon Managed Solutions, Zebra StageNow Intune

**Community (MEDIUM):** petervanderwoude.nl KME, inthecloud247.com COPE, scalefusion.com COPE vs WPCO, arborxr.com Pico Business Suite
