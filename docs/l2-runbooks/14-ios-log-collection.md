---
last_verified: 2026-04-17
review_by: 2026-07-16
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

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS L2 log collection runbook | -- |
