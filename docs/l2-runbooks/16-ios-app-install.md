---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L2
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS App Install Failure Diagnosis

## Triage

**From L1 escalation?** L1 collected: device serial, iOS version, supervision state, app name + type (VPP device / VPP user / LOB IPA / App Store), Intune install status screenshot. Skip to Step 2 (failure classification) if the app type is known.

**Starting fresh?** Begin at Step 1.

## Context

This runbook covers L2 investigation for every iOS/iPadOS managed app deployment channel surfaced in Intune: VPP device-licensed, VPP user-licensed, LOB (IPA), and App Store redirect assignments. Unlike macOS — where `IntuneMdmDaemon` is the IME delivery channel for DMG/PKG apps and a separate MDM channel handles VPP — **iOS has only the MDM channel** for managed app install. Apps are delivered via Apple MDM commands (legacy `InstallApplication` OR declarative app management from iOS 17.2+), and there is no IME-daemon equivalent.

Because the delivery channel is uniform, the **app licensing model** and the **device supervision state** are the axes that determine failure mode — not the delivery mechanism.

| Axis | Options | Affects |
|------|---------|---------|
| Licensing | VPP device / VPP user / LOB (IPA) / App Store | Who the license binds to; whether a Managed Apple Account is required |
| Supervision | Supervised / Unsupervised | Whether silent install is possible (D-34: supervised only) |
| Assignment | Required / Available / Available for enrolled devices | Whether install is auto vs user-initiated |

> **MAM-WE scope:** MAM-WE app protection policy failures (selective wipe failures, PIN loop, app protection not applying) are **out of Phase 31 scope** — see [MAM-WE Investigation Advisory](00-index.md#mam-we-investigation-advisory) for deferred ADDTS-01 milestone routing.

Before starting: collect a diagnostic package per [iOS Log Collection Guide](14-ios-log-collection.md).

---

## Three-Class Disambiguation

This runbook tags every failure pattern with one of three classes:

- **[CONFIG]** — Configuration error. Fix in Intune admin center, ABM, or on the device.
- **[TIMING]** — Timing issue. Wait for next check-in or trigger a Company Portal Sync. No admin change required.
- **[DEFECT]** — Genuine defect. All [CONFIG] conditions verified; all [TIMING] windows elapsed; still failing. Escalate to Microsoft Support with the data-collection checklist below.

When investigating, rule out [CONFIG] first, then [TIMING], then declare [DEFECT].

---

## Investigation

### Step 1: Identify the app type

In Intune admin center, navigate to **Apps** > **iOS/iPadOS** > **[app name]** > **Properties** > App information panel. The app type is displayed as one of:

- **iOS store app** — App Store redirect; no VPP licensing; install occurs when user taps install in Company Portal.
- **iOS line-of-business app** — LOB (IPA) uploaded directly to Intune; requires enterprise code-signing.
- **iOS volume purchase program app** — VPP from ABM; has a device-vs-user **License type** toggle on the Properties blade.

Also note the **Assignment type** (Required / Available / Available for enrolled devices) and the **Target group** (device group vs user group) — both influence the failure path.

### Step 2: Check supervision state

**On device:** Settings > General > VPN & Device Management > Management Profile — look for a "Supervised" banner directly under the profile name. If the banner is absent, the device is unsupervised.

**In Intune:** Devices > [device] > Overview — the Management name field typically indicates supervision posture ("Supervised" prefix for supervised enrollments).

Supervision is set at enrollment time. Adding supervision to an already-enrolled unsupervised device requires a device wipe and re-enrollment via ADE (see [iOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)).

### Step 3: Managed app state verification

Execute this three-step procedure to confirm the install state across all three vantage points:

1. **Intune admin center** > Apps > iOS/iPadOS > [app] > **Device install status** — review per-device state (Installed / Pending / Failed / Not applicable).
2. **On device** (user-coordinated): Settings > General > VPN & Device Management > Management Profile > More Details — scan the "Managed Apps" section; note installed version.
3. **Company Portal app** > My apps — does the app appear? Does tapping "Install" succeed?

**Decision fork:**

- Step 1 Installed + Step 2 confirms + Step 3 works → app healthy; symptom is app-level config or MAM (see MAM-WE advisory cross-reference above).
- Step 1 Failed + Step 2 missing → proceed to the failure-pattern tables in Step 4.
- Step 1 Installed + Step 2 missing → device-side stale cache; trigger Company Portal Sync or profile re-delivery (often resolves without admin change).

### Step 4: Match against failure patterns

The tables below enumerate the observed failure patterns per licensing model. Each row is tagged with its disambiguation class so you can route directly from symptom to the correct resolution layer.

#### VPP Device-Licensed failures

| Failure | Class | Indicator | Resolution |
|---------|-------|-----------|------------|
| VPP token expired | [CONFIG] | Tenant admin > Connectors and tokens > Apple VPP tokens shows **Expired** | Renew in ABM → upload renewed `.vpptoken` to Intune |
| License count exhausted | [CONFIG] | Apps > iOS/iPadOS > [app] > Properties shows `total licenses == consumed` | Purchase additional licenses in ABM; sync VPP token |
| Device-licensed app assigned to unsupervised device (silent install expected) | [CONFIG] | Device shows no "Supervised" banner; app Pending or user prompted | Change assignment to "Available" OR re-enroll via ADE with supervision |
| Device not synced recently | [TIMING] | Last check-in > 8 h; state = Pending install | Company Portal Sync OR Intune Sync; wait 15 min; recheck |

#### VPP User-Licensed failures

| Failure | Class | Indicator | Resolution |
|---------|-------|-----------|------------|
| User has no Managed Apple Account | [CONFIG] | Assignment in Intune shows user group; user not a Managed Apple Account in ABM | Switch to device licensing OR onboard Managed Apple Account in ABM |
| User-licensed app assigned to Device Enrollment / ADE device | [CONFIG] | Device is supervised ADE or Device Enrollment; user-licensed requires User Enrollment | Switch assignment to device licensing |
| Apple ID mismatch on device | [CONFIG] | Device has personal Apple ID, not Managed Apple Account | Sign out personal; sign in Managed Apple Account via Settings |

#### LOB (IPA) failures

| Failure | Class | Indicator | Resolution |
|---------|-------|-----------|------------|
| IPA unsigned or expired enterprise cert | [CONFIG] | Device shows "Cannot Install [App]" OR silent failure; sysdiagnose `appleagent.log` shows code-signing rejection | Re-sign with current Apple Developer Enterprise Program cert; re-upload to Intune |
| IPA > 2 GB | [CONFIG] | Intune upload fails OR device download fails consistently | Reduce IPA size OR split into LOB + dependent resources |
| Unsupervised device, silent-install expectation | [CONFIG] | Unsupervised device; IPA requires user prompt | Change assignment OR supervise the device via ADE |
| IPA signed with dev provisioning profile (not distribution) | [CONFIG] | Install succeeds but app crashes at launch; sysdiagnose shows provisioning-profile mismatch | Re-sign with distribution provisioning profile |

> **Supervision boundary (D-34 research verified 2026-04-17):** Silent install requires supervision on iOS 17+. Declarative Device Management (DDM, iOS 17.2+) changed HOW apps install (autonomous execution + activation predicates) but did NOT change the supervision-vs-prompt boundary. DDM can also "take over" management of a user-installed unmanaged app — silent on supervised, user-accept on unsupervised (a new [CONFIG] failure mode).

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS app install failure diagnosis | -- |
