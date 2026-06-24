---
last_verified: 2026-06-24
review_by: 2026-09-24
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS MDM migration failure investigation via Intune and Apple Business Manager (ABM), for migrations from a prior MDM source (Kandji, rebranded Iru) to Intune using the macOS 26 in-place path (B1) or the pre-macOS-26 wipe-and-re-enroll path (B2). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# macOS MDM Migration Failure Investigation

## Context

This runbook covers three distinct failure classes encountered during macOS MDM migration from Kandji (rebranded **Iru**, October 2025) to Microsoft Intune via Apple Business Manager: **Track A — deadline lockout** (the device is stuck on a non-dismissible full-screen migration prompt at or after the ABM deadline); **Track B — profile-not-delivered / enrollment-failed** (migration appeared to complete or was skipped but Intune shows the device as not enrolled, or configuration profiles are not delivered); and **Track C — PSSO re-registration stuck** (migration and enrollment succeeded but Platform SSO re-registration is not completing).

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). For enrollment failures, collect the IntuneMacODC package described in that guide — it provides the MDM enrollment log set required for all three tracks.

**From L1 escalation?** Migration failure tickets may arrive directly as L2 or be escalated from L1. Route to the matching track based on the presenting symptom:

- Device is stuck on a non-dismissible full-screen migration screen and cannot be used → **Track A: Deadline Lockout**
- Migration appeared to complete (or deadline passed) but Intune admin center shows the device as Not Enrolled, or configuration profiles / PSSO policy are not delivered to the device → **Track B: Profile-Not-Delivered / Enrollment-Failed**
- Migration completed and Intune shows the device as Enrolled, but the PSSO "Registration Required" notification has not appeared, or registration was initiated but is not completing → **Track C: PSSO Re-Registration Stuck**
- PSSO "Registration Required" notification appeared and user tapped it, but registration is stuck or failing → **Track C: PSSO Re-Registration Stuck** → then link-not-copy to [macOS Platform SSO Investigation (runbook 27)](27-macos-sso-investigation.md) Track A for the full registration-failure investigation

---

## Track A: Deadline Lockout

Use this track when the device is presenting a full-screen, non-dismissible migration prompt. This occurs when the ABM migration deadline has passed and the device has not yet completed Intune enrollment. The device is unusable for work until enrollment completes or the migration is canceled by an ABM admin.

> **Version gate — macOS 26:** The non-dismissible full-screen deadline enforcement behavior is specific to macOS 26 and later. Devices on macOS 25 or earlier cannot complete the in-place migration path (B1) — if a pre-macOS-26 device is stuck on an enrollment prompt, it may have been incorrectly targeted; see Track B root cause 4.

### Step 1: Confirm the presenting state

Identify the exact screen the device is showing. The macOS 26 deadline enforcement screen is a full-screen system prompt — the user cannot dismiss it, switch apps, or access the menu bar. It prompts the user to complete enrollment.

Gather from the user or on-site technician:
- macOS version (system info may be partially accessible from the enrollment prompt)
- Device serial number (required for Intune and ABM lookup)
- Whether the user had previously tapped "Not Now" on earlier migration prompts before the deadline

### Step 2: Verify Intune enrollment policy assignment

**Breadcrumb:** Intune admin center > **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens** > [token] > **Devices** > search for device serial number

Confirm the following:
- The device serial number appears in the token device list
- An ADE enrollment policy (enrollment profile) is shown as assigned to the device
- The enrollment policy has **User Affinity** (not userless), **Authentication** set to Setup Assistant with modern authentication, and **Await Configuration: Yes**

If the ADE enrollment policy is not assigned to this serial number, this is the root cause — the device reached the ABM deadline and attempted enrollment, but Intune had no profile to deliver. Proceed to Recovery Option A.

### Step 3: Verify network reachability from the device

From the enrollment prompt screen, the device must be able to reach Intune and Apple enrollment endpoints. Verify with the network team or on-site technician that the device has an active network connection and that the following endpoints are reachable and not blocked by proxy or firewall:

- `https://deviceenrollment.apple.com` — ADE enrollment
- `https://deviceservices.apple.com` — Apple device services
- `https://manage.microsoft.com` — Intune enrollment
- `https://login.microsoftonline.com` — Entra authentication

If TLS inspection (SSL interception) is active on a corporate proxy, confirm that these endpoints are excluded from inspection — TLS interception will silently break the ADE enrollment handshake.

### Step 4: Recovery options

**Recovery Option A (preferred) — Fix enrollment config and allow self-completion:**

If the enrollment policy was not assigned (Step 2) or network was blocked (Step 3):
1. Assign the ADE enrollment policy to the device's serial number in Intune (or confirm the token default policy is set correctly)
2. Verify the PSSO Settings Catalog policy is assigned to the user's group
3. Ensure the device has an active, unblocked network connection
4. Wait — the device will re-attempt enrollment from the locked screen. The lock clears automatically when enrollment succeeds.

This is the preferred path because it allows the device to self-recover without ABM admin intervention and results in a clean Intune enrollment.

**Recovery Option B — ABM admin deadline modification or migration cancellation:**

> **Note:** The following steps describe ABM admin recovery at MEDIUM confidence. Apple documentation confirms that an authorized ABM admin (with Administrator or Device Enrollment Manager role) can cancel or modify a migration deadline — Apple's deployment guide states: "Apple School Manager or Apple Business holds a lock on the device; a user with the proper permissions in Apple School Manager or Apple Business can unlock it." The exact ABM UI navigation for a device currently in the locked enrollment state is not confirmed in a single authoritative source. Verify exact steps in the current ABM portal before advising the admin.

For pre-lockout cancellation (device has prompts but is not yet at the full-screen lock):
1. In ABM: **Devices** → locate the device by serial number
2. Select the device → **Change Deadline** → remove the deadline date → **Save**
3. This cancels the migration prompts on the device and re-assigns the device to its previous MDM assignment

For a device already at the non-dismissible lockout screen:
1. An ABM Administrator or Device Enrollment Manager must navigate to the device in ABM
2. Conceptually: locate device → cancel or undo the migration assignment
3. The exact ABM portal path for releasing a device from the enrolled-but-locked state — verify in the current ABM portal or contact [Apple Business Support](https://support.apple.com/apple-business-support) for the exact procedure

> **Important:** Do NOT assert the exact click-path for releasing a device from the mid-lockout state as a verified fact. Apple confirms that an authorized ABM admin can unlock the device, but the exact ABM navigation flow for post-lockout cancellation is not confirmed in a single authoritative source. Instruct the ABM admin to verify the current ABM portal or contact Apple Business Support.

---

## Track B: Profile-Not-Delivered / Enrollment-Failed

Use this track when the migration deadline passed or the user triggered enrollment, but the device shows as Not Enrolled in Intune admin center, or profiles and PSSO policy have not been delivered to the device. Also use this track if the device itself does not show an enrollment prompt but the Intune admin center shows an enrollment error.

Before proceeding: confirm you have the IntuneMacODC diagnostic package collected per the [macOS Log Collection Guide](10-macos-log-collection.md) — the MDM enrollment logs in this package are required for root cause isolation.

### Step 1: Check for leftover source-MDM agent artifacts

After a B1 in-place migration, the Kandji (Iru) agent should self-remove at its next 15-minute check-in following the Delete Device Record action in Kandji/Iru. If the Delete Device Record step was skipped or the agent did not receive the removal command before the ABM migration proceeded, the agent may still be present and can interfere with Intune enrollment by presenting stale MDM certificates.

> **Note:** Leftover source-MDM agent as a cause of Intune enrollment failure is a MEDIUM-confidence finding (community sources and Microsoft Q&A — no single authoritative documentation directly states this as a definitive blocker). Treat as a plausible root cause to investigate alongside other causes; do not assume it is the only cause.

Run the following diagnostics on the affected device:

```bash
# Check if Kandji (Iru) agent directory is still present
ls /Library/Kandji/

# Check enrollment status — look for stale MDM certificates from prior MDM
profiles status -type enrollment
```

If `/Library/Kandji/` exists with contents (particularly `Kandji Agent.app` or associated LaunchDaemons), the agent was not self-removed and may be holding stale MDM enrollment state.

**Fix for B1 path (agent residue):**

The proper sequence is to perform Delete Device Record in Kandji (rebranded **Iru**, October 2025; support portal: support.kandji.io) BEFORE triggering the ABM "Assign Device Management" step. If the sequence was out of order:

1. Verify the device record was deleted in the Kandji/Iru console — if not, delete it now (conceptually: Device Action Menu → Delete Device Record; verify current Iru console labels at support.kandji.io — note: the support portal may still reflect Kandji branding post-rebrand). Allow 15+ minutes for the agent to self-remove at its next check-in.
2. If the agent is still present after waiting, an Intune admin can push a remediation script or the on-site technician can manually remove the agent artifacts.
3. After agent removal, trigger an Intune device sync and re-check enrollment status.

For the full source-side Delete Device Record procedure and the normal migration sequence, see the [macOS MDM Migration Walkthrough](../macos-lifecycle/02-mdm-migration-psso.md) — this runbook does not re-document the walkthrough's source-side steps (link-not-copy).

**Fix for B2 path (wipe-and-re-enroll):**

If the device went through the B2 wipe path, a full wipe removes all Kandji/Iru agent artifacts. No separate agent cleanup is needed. If agent artifacts appear post-wipe, the wipe was incomplete or the device was re-imaged with a source that included agent artifacts.

### Step 2: Verify ADE enrollment policy assignment for the device serial

The most common root cause of enrollment failure is that the device's serial number was not assigned an ADE enrollment policy in Intune before the ABM migration was triggered.

**Breadcrumb:** Intune admin center > **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens** > [token] > **Devices**

1. Search for the device serial number
2. Confirm an ADE enrollment policy (profile) is assigned to this specific serial
3. If no policy is assigned, assign the correct ADE enrollment policy and trigger a manual sync (Intune admin center > Enrollment program tokens > [token] > **Sync**)

> **Note:** ABM to Intune sync can take up to 24 hours for automatic sync. A manual sync respects a 15-minute rate limit per token; a full sync has a 7-day cooldown. If the device was recently assigned the enrollment policy, allow the sync period before re-testing enrollment from the device.

### Step 3: Check for ABM/Intune sync lag

After the admin performs "Assign Device Management" in ABM (assigning the device to the Intune MDM server), the device must appear in Intune's enrollment token device list before enrollment can succeed.

```bash
# On the device: check current MDM enrollment state
profiles status -type enrollment

# Check if there is an active MDM enrollment or a pending enrollment profile
profiles list
```

If the device shows no MDM enrollment and Intune shows the device has not appeared in the token device list yet, the likely cause is ABM/Intune sync lag. Allow up to 24 hours, or trigger a manual sync from the Intune admin center. If the device is still not appearing after 24 hours, verify the ABM "Assign Device Management" step was completed successfully and the correct Intune MDM server was selected.

### Step 4: Mixed-fleet check — pre-macOS-26 device on B1 path

The macOS 26 in-place migration (B1 path) requires the device to be running macOS 26 or later. Devices on macOS 25 or earlier cannot complete an in-place migration via ABM deadline enforcement.

```bash
# Check the macOS version on the affected device
sw_vers -productVersion
```

If the device is running macOS 25 or earlier, it received the ABM deadline prompt but cannot complete B1 in-place enrollment. The device needs the B2 path (wipe-and-re-enroll via Intune ADE after a wipe). In the interim, the ABM admin should cancel the migration deadline for this device (Track A Recovery Option B — pre-lockout cancellation) and route it to the B2 fallback path.

> **Version gate — macOS 26:** The in-place migration path (B1) requires macOS 26 or later. If your fleet contains devices on earlier macOS versions, complete an OS upgrade to macOS 26+ BEFORE triggering the ABM deadline for those devices, or route them explicitly to the B2 wipe path. Setting a deadline on a macOS 25 device without a B2 fallback plan creates an unrecoverable enrollment failure without ABM admin intervention.
