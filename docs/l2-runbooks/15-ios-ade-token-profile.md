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

## Analysis — Match Against Known Failure Patterns

### Pattern A: Token expired or sync stuck

- **Indicators:** Intune admin center shows the token as `Expired` OR last sync > 24 hours ago OR Graph `lastSyncErrorCode` != 0. New ABM-added devices do NOT appear in Intune after 24 hours (normal sync is ~hourly). Existing devices fail to enroll with "This device belongs to another organization" or "no enrollment profile found."
- **Matches Data Collection:** Step 1 (sync timestamps, expiration, status), Step 1 Supplement (numeric `lastSyncErrorCode` + `syncedDeviceCount` sanity check).
- **Resolution:** See `## Resolution` → **Pattern A Resolution** below.

### Pattern B: Profile never assigned to device in ABM

- **Indicators:** Device appears in Intune (ABM→Intune sync succeeded) but the profile column shows `Not assigned` for the device serial. User attempts enrollment and Setup Assistant skips the MDM profile step entirely. Graph `enrollmentProfiles` relationship on depOnboardingSetting shows profile objects, but no device carries that profile assignment.
- **Matches Data Collection:** Step 2 (profile assignment state in Intune), cross-check against ABM Devices view.
- **Resolution:** See **Pattern B Resolution** below.

### Pattern C: Profile assigned but device never received it (APNs / network path)

- **Indicators:** Profile IS assigned per the Intune admin center but the device's Setup Assistant never shows the "Remote Management" pane. Device can reach `apple.com` / `icloud.com` (basic Apple connectivity) but cannot reach `deviceenrollment.apple.com`, `mdmenrollment.apple.com`, or `*.push.apple.com`. Sysdiagnose `kernel.log` shows connection failures to the MDM enrollment endpoints.
- **Matches Data Collection:** Step 4 (device-side state — Tier 1 "Remote Management" pane absence + Tier 3 sysdiagnose kernel.log APNs/enrollment endpoint failures).
- **Resolution:** See **Pattern C Resolution** below.

### Pattern D: Wrong MDM server on device (token rotation / tenant migration)

- **Indicators:** Device IS enrolled but receives NO management commands. `Settings > General > VPN & Device Management` shows a Management Profile from a **different** Intune tenant URL OR from a previous MDM provider. Graph `lastModifiedDateTime` < 30 days ago AND `appleIdentifier` differs from the ticket-recorded prior state (indicates recent token replacement). ABM device record shows "Previously assigned to" with a different MDM server.
- **Pattern A vs D disambiguation:** Pattern A is an **Intune-side token state issue** (fix in Intune — re-upload token, click Sync). Pattern D is a **device-side enrollment target mismatch** — the device talks to the wrong MDM server because it was enrolled under a prior token assignment, and a **device wipe is required** to re-enroll it against the current MDM server. Intune has no command that can retarget an already-enrolled ADE device to a different MDM server without wiping.
- **Matches Data Collection:** Step 3 (GUID capture for comparison), Step 4 (on-device Management Profile issuer + URL — the definitive mismatch signal).
- **Resolution:** See **Pattern D Resolution** below.

## Resolution

### Pattern A Resolution

1. **If expired:** re-download the token from ABM (Settings > [your name] > Preferences > Your MDM Server > **Download Token**) and re-upload to Intune (**Enrollment program tokens** > [token] > **Edit** > upload `.p7m`).
2. **If sync stuck:** click **Sync** on the token. Wait 30 minutes, then re-check Step 1 observables. If the last-sync timestamp still hasn't advanced after two sync triggers, escalate (see Escalation Ceiling).
3. **If `syncedDeviceCount` drastically below ABM device count:** the token may be **orphaned** (ABM reassigned the devices to a different MDM server). Verify in ABM > **Devices** > [serial] > **MDM server assignment** — the correct Intune MDM server must be listed. If ABM shows a different MDM server, this is a Pattern D situation for those devices; address via Pattern D Resolution.

### Pattern B Resolution

1. **In ABM:** Devices > [serial] > **Assign to MDM server** → confirm Intune MDM server. (Requires L2 ABM write access OR escalate to an ABM admin.)
2. **In Intune:** Enrollment Program Tokens > [token] > **Profiles** > [profile] > **Assign devices** → select the device serial.
3. **On device:** user boots → device reaches network → `iprofiles` daemon triggers the ADE enrollment check → device downloads the profile → Setup Assistant continues through the Remote Management pane.

### Pattern C Resolution

1. Verify the network path from the device's enrollment location to Apple's device enrollment and MDM endpoints. Provide the network/firewall team the Apple-published list: `https://support.apple.com/HT210060` (Apple's "About macOS, iOS, iPadOS, and tvOS network requirements for MDM and Apple Business Manager / Apple School Manager" reference).
2. Verify APNs certificate state: Intune admin center > **Tenant administration** > **Connectors and tokens** > **Apple push notification certificate** — not expired, not revoked, and the APNs Apple ID matches what your team recorded at issuance.
3. Try enrollment from a known-good network (mobile hotspot, home Wi-Fi) to isolate the corporate network as a variable. If enrollment succeeds off-network, the failure is corporate-network-path-side and the network/firewall team owns remediation.

### Pattern D Resolution

> **Destructive action:** Pattern D resolution requires a device wipe. Confirm with the device owner AND organizational policy before proceeding. User data on the device will be unrecoverable after the wipe unless backed up beforehand.

1. Confirm tenant migration history with the admin team: was the ABM token recently re-generated, re-assigned to a new MDM server, or moved between Intune tenants?
2. **Wipe the device** — in the *old* tenant if it is still accessible and can execute an MDM wipe; otherwise perform a physical factory reset on-device (Settings > General > Transfer or Reset iPhone > Erase All Content and Settings).
3. **In ABM:** confirm the device is now assigned to the **current** Intune MDM server (Devices > [serial] > **Assign to MDM server**).
4. Re-enroll via Setup Assistant. Device receives the correct enrollment profile from the current MDM server.

## Escalation Ceiling

Open a Microsoft Intune Support case if:

- **Pattern A:** `lastSyncErrorCode` != 0 after token renewal + resync, OR last-sync timestamp fails to advance after two manual syncs. Collect the Graph GET response body + ABM token download timestamp.
- **Pattern B:** ABM Step 1 completes but Intune Step 2 still shows "Not assigned" for the device serial after 30 minutes of sync time.
- **Pattern C:** Network path confirmed open end-to-end (Apple HT210060 endpoints reachable from enrollment location) AND APNs certificate active (not expired, not revoked) AND device still never sees the profile. Collect sysdiagnose `kernel.log` excerpt + network-path evidence + APNs tenant ID.
- **Pattern D:** Device CANNOT be factory reset (user data constraint, no backup, physical access unavailable). Escalate to Microsoft Support for the "release device from MDM" ABM procedure — this is a destructive admin action requiring ABM admin-level permissions.

**Data to include in every support case:**

- Device serial number + iOS version
- Intune device status screenshot (Devices > iOS/iPadOS > [device])
- Graph GET response body for the depOnboardingSetting (if Pattern A)
- ABM device record screenshot (Devices > [serial], showing MDM server assignment + "Previously assigned to" field)
- Company Portal log incident ID (if collected per [runbook 14](14-ios-log-collection.md) Tier 2)
- Sysdiagnose `.tar.gz` (if Pattern C/D — PII-redacted per [runbook 14](14-ios-log-collection.md) Section 3 PII callout)

## Related Resources

- [iOS Log Collection Guide](14-ios-log-collection.md) — prerequisite for every investigation in this runbook.
- [iOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md) — Stage 1-2 token-sync context and post-enrollment diagnostics reference.
- [APNs Certificate Guide](../admin-setup-ios/01-apns-certificate.md) — Pattern C reference for APNs state verification.
- [ABM/ADE Token Guide](../admin-setup-ios/02-abm-token.md) — Pattern A reference for token download/upload flow.
- [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md) — profile configuration reference.
- [iOS L1 Runbooks (16-20)](../l1-runbooks/) — L1 escalation sources that route into this runbook: 16 APNs expired, 17 ADE not starting, 18 Enrollment restriction blocking, 19 License invalid (ADE path), 20 Device cap reached.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS ADE token & profile delivery investigation | -- |
