---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: all
audience: L2
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS Log Collection Guide

## Context

This guide is the prerequisite for all iOS/iPadOS L2 investigation runbooks (15 ADE Token & Profile, 16 App Install, 17 Compliance & CA Timing). Before starting any investigation, collect a diagnostic package using one of the three methods below, then follow the routing links in the "Related Resources" section to the specific investigation runbook.

iOS L2 diagnostic data is split across three methods. Unlike macOS (where `IntuneMacODC.sh` produces a single comprehensive zip) or Windows (where `mdmdiagnosticstool.exe` produces a single comprehensive archive), iOS has no single-archive equivalent — each method yields different data types and has different latency, access, and physical-device requirements. Choose the method that matches the failure you are investigating using the Decision Matrix below.

## Tool Landscape

> **Tool landscape:** There is **no iOS equivalent to `mdmdiagnosticstool.exe`**. iOS diagnostic data is fragmented across three methods — MDM diagnostic report, Company Portal upload, and Mac+cable sysdiagnose. Each yields different data types; the decision matrix below guides method selection.

## Decision Matrix

Use this matrix to pick a method by who triggers the collection, what data scope results, how L2 retrieves it, what physical hardware is required, and the typical latency from trigger to data-in-hand.

| Method | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Typical Latency |
|--------|--------------|------------|----------------|------------------------|------------------|
| **MDM diagnostic report** (Tier 1) | User (on-device) OR L2 (MAM-scoped Intune remote action) | On-device MDM profile state (payloads, acks, error states) via on-device Settings screens; OR Intune MAM App Protection diagnostics zip for specific M365 apps only | On-device: L2 coordinates with user to navigate Settings and screenshot/narrate the Management Profile detail screen. MAM remote action: Intune admin center > Troubleshooting + support > Troubleshoot > [user] > App Protection > Checked-in > [app] > "..." > Collect diagnostics → download from Diagnostics tab. | User's iOS device (no Mac required) | Immediate for on-device screenshots; ~30 minutes for MAM Intune remote action |
| **Company Portal log upload** (Tier 2) | User | Company Portal app + Microsoft Authenticator logs; combined bundle | **Microsoft Support ticket required** — uploaded logs are NOT self-service downloadable from Intune admin center. L2 provides the user-supplied incident ID to Microsoft Intune Support who retrieves logs or analysis on the L2's behalf. | iOS device only (no Mac required) | **1–3 business days** (Microsoft Support ticket roundtrip) |
| **Mac+cable sysdiagnose** (Tier 3) | User triggers on device via button combo; L2 receives bundle via AirDrop | Full unified log, kernel log, profile state, network state, process list — packaged as `.tar.gz` bundle | Bundle transferred to L2's Mac via AirDrop from the device's Analytics Data share sheet; Mac opens bundle files directly OR uses Console.app for live unified-log streaming during failure reproduction | iOS device + Mac + USB-C or Lightning cable (plus Console.app on the Mac) | ~10 minutes (on-device collection) + AirDrop transfer time |

**Escalation signal:** If Tier 1 is insufficient AND time is critical (< 1 business day budget), skip Tier 2 and go directly to Tier 3. Tier 2's ticket roundtrip is incompatible with same-day turnaround even though it requires no Mac.

## Section 1: MDM Diagnostic Report (Tier 1)

**Always start here.** iOS has two distinct "MDM diagnostic" paths that are often confused. They yield different data and have different L2 requirements. Both are documented below — pick based on what the failure suggests.

### 1a. On-Device Profile State (user-coordinated; always available)

The authoritative view of the device's management state is on the device itself. There is NO admin-center pull for on-device profile state — the Intune admin center's "Device configuration" blade shows what Intune *sent*, but not what the device *acknowledged* or what *errors* the MDM framework reported per payload.

**Path on device:** Settings > General > VPN & Device Management > Management Profile > More Details.

**What to collect:**
- Screenshot of Management Profile summary (name, signed-by, enrolled date).
- Screenshots of each configuration payload ("Restrictions", "Wi-Fi", "Passcode", etc.) showing installed / error states.
- If the user reports "something is not working," ask them to screenshot or narrate any visible error badges next to payloads.

**L2 requirements:** No admin role needed on the L2 side. L2 coordinates with the user by phone or video call; user sends screenshots.

**When to use:** First-line diagnosis for "profile not taking effect" or "config didn't apply" complaints. Also the primary path for enrollment state questions (managed-by, ADE-provisioned, user-approved).

**Cross-reference:** This path is documented authoritatively in the project's iOS ADE Lifecycle reference — see [iOS ADE Lifecycle §Post-enrollment diagnostics](../ios-lifecycle/01-ade-lifecycle.md#behind-the-scenes) for the full per-stage troubleshooting context.

### 1b. MAM App Protection Diagnostics (Intune admin center; MAM scope only)

> **Scope note:** The Intune "Collect diagnostics" remote action for iOS/iPadOS is scoped to App Protection (MAM) logs ONLY — it does NOT produce a general MDM enrollment/config bundle. Supported apps: Outlook, Teams, OneDrive, Edge, Word, Excel, PowerPoint, OneNote, Microsoft 365.

**Breadcrumb (Intune admin center):**
1. `https://intune.microsoft.com` → **Troubleshooting + support** > **Troubleshoot**.
2. Select a user.
3. On the **Summary** page: **App Protection** > **Checked-in** tab.
4. Locate the app in the list → **"..."** menu > **Collect diagnostics** > confirm **Yes**.
5. To download results: **Troubleshooting + support** > **Troubleshoot** > [user] > **Summary** > **Diagnostics** tab.

**Key constraints:**
- **Size cap:** Diagnostic uploads exceeding **4 MB** or **50 diagnostics** per app cannot be downloaded from the Intune portal — larger uploads require Microsoft Intune Support to retrieve.
- **Delivery latency:** Approximately **30 minutes** from trigger to availability on the Diagnostics tab.
- **Required role:** `Help Desk Operator` OR `School Administrator` OR a custom role with `Remote tasks/Collect diagnostics` permission (plus `Organization/Read` and `Managed devices/Read`).
- **Network prerequisite:** Device-side uploads require `lgmsape{region}.blob.core.windows.net` to not be blocked at the edge.

**When to use:** MAM-specific failures with the above M365 app list. For MDM-level issues (profile delivery, VPP, compliance), use Tier 2 or Tier 3 instead — this remote action does NOT collect MDM data.

## Section 2: Company Portal Log Upload (Tier 2)

Use this when Tier 1 is insufficient (e.g., need Authenticator-side or Company Portal app-side logs) and either no Mac is available OR the ticket roundtrip latency is acceptable.

### How to Trigger

The iOS Company Portal app offers three paths to initiate a log upload:

1. **Error-driven:** When the app shows an error message or alert, tap **Report** on the dialog.
2. **Menu-driven:** Open the **More** tab in Company Portal, then tap **Send Logs**.
3. **Shake gesture:** Shake the device, then tap **Send Diagnostic Report** on the prompt. If no prompt appears, enable the feature at device **Settings > Apps > Company Portal > Shake Gesture**.

### Full Upload Flow

1. Open Company Portal on the iOS/iPadOS device.
2. **Reproduce the event** causing the issue — this places the failure at the top of the collected log window and is strongly recommended before triggering upload.
3. Initiate the upload via one of the three paths above.
4. When Company Portal finishes its upload, tap **Open Authenticator** on the follow-up prompt — this collects the Microsoft Authenticator logs for the combined support bundle.
5. **Save the incident ID** that appears on screen. This is the unique handle L2 and Microsoft Support will use to retrieve the logs; without it, the upload cannot be matched to this device.
6. Tap **Email Logs** to compose a support email that includes the incident ID in the body.

### Verbose Logging Preflight

Enable verbose logging BEFORE reproducing the failure for extra detail. Path: **Company Portal > More > Settings** and toggle verbose logging on. Default logging omits many routine entries that are diagnostic in a failure context.

### L2 Retrieval (ticket-based)

> **Data egress:** The iOS Company Portal log upload leaves tenant control. Logs are routed to Microsoft support infrastructure and are NOT directly downloadable from the Intune admin center. An L2 engineer with an incident ID MUST open a Microsoft Intune Support ticket and provide the incident ID — Microsoft support retrieves and returns the logs (or analysis) on the L2's behalf. Typical roundtrip: 1-3 business days. This is the signal to escalate to Tier 3 (Mac+cable sysdiagnose) when time is critical.

## Section 3: Sysdiagnose Trigger and File Export

Use this when Tier 1 + Tier 2 are insufficient OR when profile-delivery-level verbosity is required (kernel log, APNs session records, unified log with MDM subsystem filters). This is the only path that yields the full unified log.

Apple's canonical platform-support guide documents sysdiagnose as an on-device AssistiveTouch-triggered procedure — NOT a physical-button combo. The AssistiveTouch method is uniform across all iPhone/iPad models and iOS/iPadOS versions, supervised-compatible (no Side Button restriction conflict), and requires no Mac or cable to trigger. The file is exported directly from the device via the share button.

**Authoritative source:** Apple Support — [Use Diagnostics to research device issues](https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web) (verified 2026-04-18 per Phase 32 UAT Test 15 resolution).

### Prerequisites (On-Device Trigger)

- iOS/iPadOS device to investigate (any current iPhone or iPad; AssistiveTouch is available on iOS 5.0+ / iPadOS 13+).
- User has access to Settings on the device.
- For export: an AirDrop-capable Apple device, email access, iCloud Drive access, or any other share-extension-capable destination.

### 5-Step AssistiveTouch Sysdiagnose Procedure

1. **Enable AssistiveTouch:** Settings > Accessibility > Touch > AssistiveTouch > toggle **AssistiveTouch** to ON. A small floating on-screen button appears.

2. **Add Analytics to the AssistiveTouch top-level menu:** Settings > Accessibility > Touch > AssistiveTouch > **Customize Top Level Menu**. Tap an existing icon slot (or tap **+** to add a new slot) > select **Analytics** from the list > tap **Done**. The Analytics action is now in the AssistiveTouch menu.

3. **Trigger sysdiagnose:** tap the on-screen AssistiveTouch button > tap **Analytics**. The device begins sysdiagnose generation in the background. Collection completes in approximately **10 minutes**.

   > **iPad silence:** iPad does NOT provide haptic feedback on sysdiagnose trigger. iPhone may give a brief vibration. Tell the user not to re-trigger repeatedly expecting haptic feedback — silent behavior is normal.

4. **Locate the output file:** Settings > Privacy & Security > Analytics & Improvements > Analytics Data. Scroll to entries with the `sysdiagnose_` prefix. The filename pattern is `sysdiagnose_YYYY.MM.DD_HH-MM-SS±ZZZZ_iPhoneOS_iPhone_XX.X.X_XXXXXX.tar.gz`. Pick the entry matching today's trigger date/time.

5. **Export from device:** tap the sysdiagnose file > tap the **share button** (top-right arrow-up-from-box icon) > select destination:
   - **AirDrop** — fastest; requires L2 engineer on a Mac or iOS device within AirDrop range.
   - **Mail / Messages** — works for smaller bundles (<25 MB typical).
   - **iCloud Drive / Files.app** — works for any size; L2 retrieves from shared iCloud folder or tenant-approved cloud storage.
   - **Any other share-extension** — OneDrive, Dropbox, Google Drive, etc. (subject to data-handling policy; see PII warning below).

> **Supervised-device compatibility:** AssistiveTouch-based trigger works on supervised devices. Unlike the legacy volume + Side-button combo, it does NOT conflict with the Side Button restriction profile (`Allow Side Button = false`). This is the recommended trigger for managed-fleet troubleshooting.

### Alternative: Mac+Cable Console.app Live Streaming

Use this in addition to (NOT instead of) the on-device sysdiagnose when you need to observe log events in real time during failure reproduction, OR when the sysdiagnose file exceeds ~100 MB and AirDrop/email/iCloud upload is impractical (Finder sync via cable is faster for large bundles).

**Prerequisites:**
- Mac running a current macOS version with **Console.app** available (Applications > Utilities > Console).
- Cable matching the device's port (Lightning for iPhone 5–14, iPad 7–9, iPad Air 1–4, iPad mini 1–5; USB-C for iPhone 15+, iPad Pro 3rd gen (2018)+, iPad Air 4+, iPad 10+, iPad mini 6+).
- Apple Configurator 2 on the Mac if filesystem-level extraction is needed as a fallback.

**Live streaming flow:**

1. Connect the iOS device to the Mac via cable.
2. On the device, tap **Trust** on the "Trust This Computer?" prompt (first-time pairing only).
3. On the Mac, open **Console.app** (Applications > Utilities > Console).
4. In Console.app's left sidebar **Devices** section, click the iOS device name to select it.
5. Click **Start** to begin streaming. Reproduce the failure on the device; log events appear live in Console.
6. After reproduction, trigger sysdiagnose per the AssistiveTouch 5-step procedure above for the full on-device bundle (Console.app does NOT expose a remote sysdiagnose trigger in the public UI).

**Filesystem-level retrieval (fallback — large bundles or no share-extension path):** Install Apple Configurator 2 on the Mac, connect the device via cable, then browse the device filesystem under **Files** to extract the sysdiagnose bundle directly. Requires Apple ID sign-in on the Mac.

> **PII warning:** Sysdiagnose bundles contain private data — device identifiers, installed app inventory, network history, location hints, user account identifiers. Before attaching to a Microsoft Support ticket OR uploading to any cloud destination, L2 MUST follow the organization's data-handling policy: redact or segregate PII per tenant policy. Sysdiagnose is NOT safe to upload to public issue trackers.

## Common Artifacts Cross-Reference

Use this table to see which runbook consumes each artifact — it is both a collection map and a routing hint to the correct investigation runbook.

| Artifact | Collection Method | Used by |
|----------|-------------------|---------|
| On-device MDM profile state (screenshots) | Tier 1a | [15-ios-ade-token-profile.md](15-ios-ade-token-profile.md) Step 4 device-side enrollment state; [17-ios-compliance-ca-timing.md](17-ios-compliance-ca-timing.md) "Per-Cause Deep-Dive" |
| Company Portal + Authenticator logs | Tier 2 | Escalation to Microsoft Support tickets (all three investigation runbooks) |
| MAM App Protection diagnostics zip | Tier 1b | MAM advisory (see [00-index.md#mam-we-investigation-advisory](00-index.md#mam-we-investigation-advisory)) — out of Phase 31 scope |
| Sysdiagnose `.tar.gz` (kernel.log, unified log) | Tier 3 | [15-ios-ade-token-profile.md](15-ios-ade-token-profile.md) Pattern C (APNs network path); [17-ios-compliance-ca-timing.md](17-ios-compliance-ca-timing.md) "Not evaluated" terminal state |

## Related Resources

- [ADE Token & Profile Delivery Investigation](15-ios-ade-token-profile.md) — next step after Tier 1/2/3 collection for enrollment failures (ADE, profile delivery, token sync).
- [App Install Failure Diagnosis](16-ios-app-install.md) — next step for VPP/LOB/supervision issues.
- [Compliance & CA Timing Investigation](17-ios-compliance-ca-timing.md) — next step for compliance state issues (first-eval window, CA timing, Default posture, jailbreak false-positives, OS version gates).
- [iOS ADE Lifecycle §Post-enrollment diagnostics](../ios-lifecycle/01-ade-lifecycle.md) — on-device MDM diagnostic retrieval authoritative reference.
- [iOS L2 Runbooks index](00-index.md#ios-l2-runbooks) — hub with L1 escalation mapping and MAM advisory.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Phase 32 gap closure (UAT Test 15): rewrote Section 3 from "Mac+Cable Sysdiagnose" to AssistiveTouch-based on-device trigger + file export per Apple Support canonical URL; Mac+cable Console.app demoted to alternative for live-streaming and large-bundle retrieval; section renamed (new anchor: #section-3-sysdiagnose-trigger-and-file-export) | -- |
| 2026-04-17 | Initial version — iOS L2 log collection runbook | -- |
