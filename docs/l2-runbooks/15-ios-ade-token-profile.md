---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: ADE
audience: L2
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# ADE Token & Profile Delivery Investigation

## Triage

**From L1 escalation?** L1 collected: device serial number, iOS version, Intune enrollment status, token name, and profile name. Skip to Step 2 if Pattern is unknown; otherwise jump directly to the matching Pattern in Analysis.

**Starting fresh?** Begin at Step 1 in Investigation — Data Collection.

## Context

This runbook covers iOS/iPadOS Automated Device Enrollment (ADE) investigation across both sides of the enrollment pipeline: **token-side** issues (ABM-to-Intune sync failures, expired tokens, orphaned `syncedDeviceCount` anomalies) AND **profile-delivery** issues (Intune-to-device assignment failures, APNs/network path blockage, wrong-MDM-server mismatches from tenant migration).

This is the primary L2 target for iOS L1 runbooks that terminate in ADE-path failures: [16 APNs expired](../l1-runbooks/16-ios-apns-expired.md), [17 ADE not starting](../l1-runbooks/17-ios-ade-not-starting.md), [18 Enrollment restriction blocking](../l1-runbooks/18-ios-enrollment-restriction-blocking.md), [19 License invalid (ADE path)](../l1-runbooks/19-ios-license-invalid.md), and [20 Device cap reached](../l1-runbooks/20-ios-device-cap-reached.md). Non-ADE enrollment paths (Device Enrollment, User Enrollment, MAM-WE) route to the [iOS Log Collection Guide](14-ios-log-collection.md) directly and are out of scope here — the shape of those failures diverges from token+profile investigation.

Before starting: collect a diagnostic package per [iOS Log Collection Guide](14-ios-log-collection.md).

> **Graph API scope:** Where this runbook uses the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. For deep token GUID extraction, write operations, or advanced enumeration, see **ADDTS-02** (future milestone — `L2 runbook for ADE token delivery deep-dive`).

## Prerequisites

- **Apple Business Manager (ABM)** read access — device assignment state and MDM server association verification (Pattern B/D). Recommended role: *People > Admin* or *Device > Reader* within ABM.
- **Intune admin center** read access — token state, profile assignment, compliance. Minimum: *Endpoint Security Manager* or a custom role with `Organization/Read` + `Enrollment programs/Read`.
- **Microsoft Entra** read access — verifying user license + group assignment when ADE is license-gated. Minimum: *Directory Readers*.
- **(Optional) Microsoft Graph API** scope `DeviceManagementServiceConfig.Read.All` (read-only) — for Pattern A sync-state numeric error code extraction (Step 1 Supplement). Acquire via an app registration with delegated permissions or via Graph Explorer.

> **Access-control note:** The Graph `DeviceManagementServiceConfig.Read.All` scope grants **tenant-wide read** across all DEP tokens. Prefer delegated (user-context) over application (service-principal) credentials for L2 ad-hoc investigation — principle of least privilege. If L2 lacks all three portals, hand off to a colleague with combined read access rather than requesting elevated write scope.

## Investigation — Data Collection

### Step 1: Token sync status (Intune admin center)

**Breadcrumb:** Intune admin center > **Devices** > **iOS/iPadOS** > **iOS/iPadOS enrollment** > **Enrollment program tokens** > [token].

**Observables to collect:**
- Token **expiration date** (annually; ADE tokens are 1-year lifetime).
- **Last sync date** — expected ~hourly cadence. Drift > 24 hours is Pattern A territory.
- **`syncedDeviceCount`** — compare against ABM-side device count.
- **Status** label — `Active` / `Expired` / `Sync error`.

If a numeric `lastSyncErrorCode` is needed (not surfaced verbatim in the admin center UI) → supplement via Graph in **Step 1 Supplement** below.

### Step 1 Supplement: Graph API token snapshot (READ-ONLY)

Use this only when Step 1 surfaces a `Sync error` status and the Intune UI does not expose the numeric error code, OR when a scripted audit is needed.

```http
GET https://graph.microsoft.com/beta/deviceManagement/depOnboardingSettings
GET https://graph.microsoft.com/beta/deviceManagement/depOnboardingSettings/{depOnboardingSettingId}
```

**Required scope:** `DeviceManagementServiceConfig.Read.All` (delegated preferred over application — see Prerequisites access-control note).

**Key response fields and which Pattern they indicate:**
- `tokenExpirationDateTime` → **Pattern A** (expired).
- `lastModifiedDateTime` → **Pattern D** (recent token upload/replacement; compare against ticket history for rotation detection).
- `lastSuccessfulSyncDateTime` → **Pattern A** (sync stuck — drift > 24h).
- `lastSyncTriggeredDateTime` → **Pattern A** (sync stuck — trigger logged but no success).
- `lastSyncErrorCode` → **Pattern A** (non-zero = sync error surface).
- `syncedDeviceCount` → **Pattern D** (sanity check against ABM count; drastically low = orphaned token).
- `appleIdentifier` → **Pattern D** (Apple ID tied to the ABM MDM server; mismatch against ticket history = token reassignment).

Capture the full response body as an attachment if escalating (see Escalation Ceiling).

### Step 2: Profile assignment state (Intune admin center)

**Breadcrumb:** Enrollment program tokens > [token] > **Profiles** > [profile] > **Assign devices**.

**Observables:**
- Is the failing device's serial number in the assigned list?
- The **Assigned** vs **Not assigned** column for that serial.
- Cross-check against ABM **Devices** view — does ABM list the same serial assigned to the Intune MDM server?

A device that appears in Intune (token sync succeeded) but shows "Not assigned" on the profile is the Pattern B signature.

### Step 3: Enrollment profile GUID (Intune admin center URL extraction)

With the profile open in the Intune admin center, inspect the browser address bar. The enrollment profile GUID is the URL segment immediately after `.../enrollmentProfileId/`:

```
https://intune.microsoft.com/.../enrollmentProfileId/{GUID}/overview
                                                     ^^^^^^ capture this
```

Capture this GUID for Pattern C/D debugging — it is the primary key that you will compare against the device's MDM payload (surfaced in Step 4) and against the ABM device record's MDM server assignment.

### Step 4: Device-side enrollment state

Collect per the [iOS Log Collection Guide](14-ios-log-collection.md):

- **Tier 1 (on-device screenshot, always):** Settings > General > VPN & Device Management > Management Profile > More Details. This surfaces the device's view of the enrollment target URL, profile identifiers, and issuing organization name — all three are the signals that distinguish Pattern C (profile never arrived) from Pattern D (profile arrived, but from the wrong MDM server).
- **Tier 3 (sysdiagnose, when Pattern C suspected):** If the device Setup Assistant never reached the "Remote Management" pane and network reachability to Apple enrollment endpoints is suspect, capture a sysdiagnose and inspect `kernel.log` for APNs session records and connection failures to `deviceenrollment.apple.com`, `mdmenrollment.apple.com`, or `*.push.apple.com`.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS ADE token & profile delivery investigation | -- |
