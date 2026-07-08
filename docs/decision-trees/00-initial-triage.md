---
doc_id: RE-207
status: Approved
owner: Intune Admin Lead
doc_type: Reference
platform: Windows
last_verified: 2026-04-23
review_by: 2026-07-22
applies_to: APv1
audience: L1
---

**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-207 · **Status:** Approved

# Initial Triage Decision Tree

## Summary

Reference decision table for Windows Autopilot (classic APv1) initial triage — the entry point for all Windows Autopilot deployment issues. Gates on network connectivity, then deployment mode and portal registration (a 4-way reconvergence across all four modes), then routes by symptom to a scenario tree, an L1 error code, or an L2/Infrastructure escalation.

> **Version gate:** This guide covers Windows Autopilot (classic). For Device Preparation (APv2), see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Triage](06-macos-triage.md).

> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).

> **Android:** For Android enrollment/compliance troubleshooting, see [Android Triage](08-android-triage.md).

> **Linux:** For Linux Intune client troubleshooting (Ubuntu LTS), see [Linux Triage](09-linux-triage.md).

## How to Use These Trees

Start here when a user reports an [Autopilot](../_glossary.md#autopilot) deployment issue. Follow each decision point, answering the question shown using only what you can observe on the device screen or look up in the Intune admin center. The tree will route you to a specific scenario tree or to an escalation point with data collection instructions.

> **Note:** These decision trees cover Autopilot (classic / APv1). For Device Preparation (APv2) issues, see the [APv2 Device Preparation Triage Tree](04-apv2-triage.md).

## Scenario Trees

Use these links after this triage tree routes you to a specific scenario:

- [ESP Failure Tree](01-esp-failure.md) — [ESP](../_glossary.md#esp) (Enrollment Status Page) stuck or showing errors
- [Profile Assignment Tree](02-profile-assignment.md) — No profile assigned or wrong profile applied to device
- [TPM Attestation Tree](03-tpm-attestation.md) — [TPM](../_glossary.md#tpm) errors during pre-provisioning or self-deploying mode
- [APv2 Device Preparation Triage](04-apv2-triage.md) — APv2 (Device Preparation) deployment failure routing
- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing
- [Android Triage](08-android-triage.md) — Android enrollment/compliance failure routing
- [Linux Triage](09-linux-triage.md) — Linux Intune client (Ubuntu 22.04/24.04 LTS) failure routing

## Decision Tree

**LOCKED — 36 (nodes + labeled edges)** — 18 nodes + 18 labeled edges (plus 2 unlabeled continuation edges), independently re-derived from the pre-conversion decision graph. The tree is grouped below into three stages that mirror the graph's own gate structure; the table `Yes`/`No`/mode answer columns are the graph's labeled edges. The 4-way reconvergence into TRD4 (all four deployment modes route to the same registration question) is preserved as four explicit rows in the Deployment Mode & Registration stage — no row collapses more than one incoming edge.

### Stage 1: Connectivity Gate (TRD1 → TRD2)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 1 | Can the device reach any website? | No | Escalate Infrastructure: No network connectivity (TRE1) |
| 1 | Can the device reach any website? | Yes | Continue to Step 2 |
| 2 | Can the device reach login.microsoftonline.com? | No | Escalate Infrastructure: Autopilot endpoints blocked by firewall or proxy (TRE2) |
| 2 | Can the device reach login.microsoftonline.com? | Yes | Continue to Step 3 (deployment mode) |

### Stage 2: Deployment Mode & Registration (TRD3 → TRD4 — the 4-way reconvergence)

| Deployment mode (Step 3) | Registered in Autopilot portal? (Step 4) | Result |
|---------------------------|--------------------------------------------|--------|
| User-Driven | No | Check if hardware hash was imported → Escalate L2: Device not registered in Autopilot (TRA1 → TRE3) |
| User-Driven | Yes | Continue to Step 5 (symptom routing) |
| Pre-Provisioning | No | Check if hardware hash was imported → Escalate L2: Device not registered in Autopilot (TRA1 → TRE3) |
| Pre-Provisioning | Yes | Continue to Step 5 (symptom routing) |
| Self-Deploying | No | Check if hardware hash was imported → Escalate L2: Device not registered in Autopilot (TRA1 → TRE3) |
| Self-Deploying | Yes | Continue to Step 5 (symptom routing) |
| Don't know | No | Check if hardware hash was imported → Escalate L2: Device not registered in Autopilot (TRA1 → TRE3) |
| Don't know | Yes | Continue to Step 5 (symptom routing) |

### Stage 3: Symptom Routing (TRD5 → TRD6 — applies once registered, regardless of mode)

| Symptom (Step 5) | Sub-check (Step 6) | Result |
|-------------------|----------------------|--------|
| ESP stuck or error | — | Go to ESP Failure Tree (TRA2) |
| No profile assigned | — | Go to Profile Assignment Tree (TRA3) |
| TPM or provisioning error | — | Go to TPM Attestation Tree (TRA4) |
| Error code on screen | Can you find the error code in the error tables? Yes | Resolved: Follow L1 Action column in error table (TRR1) |
| Error code on screen | Can you find the error code in the error tables? No | Escalate L2: Unknown error code (TRE4) |
| OOBE crash or other | — | Note symptoms and collect basic info → Escalate L2: OOBE failure — non-standard scenario (TRA5 → TRE5) |
| Don't know | — | Escalate L2: Unclear symptom — collect all available data (TRE6) |

## How to Check

| Node | Check | Where to Look |
|------|-------|---------------|
| TRD1 | Can the device reach any website? | Open a browser on the device and navigate to any public website (for example, google.com or microsoft.com). If the page loads, answer Yes. If the browser shows a connection error or times out, answer No. |
| TRD2 | Can the device reach login.microsoftonline.com? | In the same browser, navigate to `https://login.microsoftonline.com`. The page should load the Microsoft sign-in page without errors. If the page does not load or shows a certificate error, answer No — this indicates Autopilot endpoints may be blocked. |
| TRD3 | What deployment mode is being used? | Ask the user or check the deployment documentation for this device. User-driven mode requires the user to sign in at [OOBE](../_glossary.md#oobe). Pre-provisioning (white glove) is technician-initiated — the technician presses the Windows key five times at the OOBE language screen. Self-deploying starts automatically with no user interaction. If the mode is not known, answer Don't know and proceed — note it for escalation data. |
| TRD4 | Is the device registered in the Autopilot portal? | Open Intune admin center > Devices > Windows > Enrollment > Windows Autopilot devices. Search by device serial number. If the device appears with any status, answer Yes. If not found, answer No. |
| TRD5 | What is the main symptom? | Observe the device screen and ask the user what they see. Match to the closest category: ESP stuck or showing an error code (ESP tree); no Autopilot profile assigned in the portal (Profile tree); a TPM or attestation error during [pre-provisioning](../_glossary.md#pre-provisioning) or self-deploying (TPM tree); a hex error code visible on screen (error code branch); the device crashed, froze, or behaved in a way not covered above (OOBE crash / other); you cannot identify the symptom (Don't know). |
| TRD6 | Can you find the error code in the error tables? | Check [Master Error Code Index](../error-codes/00-index.md) — use Ctrl+F to search for the hex code shown on screen. If the code appears in the Quick Lookup table, answer Yes and follow the L1 Action column in the linked category file. If not found, answer No. |

## Escalation Data

| ID | Scenario | Collect | See Also |
|----|----------|---------|----------|
| TRE1 | No network connectivity | Device IP address and subnet, whether Wi-Fi or ethernet is in use, proxy configured (yes/no), browser error message shown, physical location of device | Network team / infrastructure support |
| TRE2 | Autopilot endpoints blocked by firewall or proxy | Device IP address and subnet, proxy configured (yes/no), which endpoint failed (login.microsoftonline.com), browser error message, Wi-Fi or ethernet, physical location | Network team / infrastructure support — firewall rule review needed |
| TRE3 | Device not registered in Autopilot | Device serial number, device make and model, deployment mode, whether hardware hash was previously imported (yes/no/unknown), timestamp, screenshot of Autopilot devices search showing no results | [L2 Runbooks](../l2-runbooks/00-index.md) |
| TRE4 | Unknown error code | Device serial number, full error code (0x...), deployment mode, timestamp, screenshot of error screen | [Master Error Code Index](../error-codes/00-index.md); [L2 Runbooks](../l2-runbooks/00-index.md) |
| TRE5 | OOBE crash or non-standard failure | Device serial number, deployment mode, timestamp, detailed description of what appeared on screen, sequence of events leading to the failure, screenshot if available | [L2 Runbooks](../l2-runbooks/00-index.md) |
| TRE6 | Unclear symptom | Device serial number, deployment mode, timestamp, all available screenshots, description of everything observed on the device screen | [L2 Runbooks](../l2-runbooks/00-index.md) |

## Resolution & Next Steps

| ID | Resolution | Next Steps |
|----|-----------|------------|
| TRR1 | Error code found in error table — follow the L1 Action column for that code | See [Master Error Code Index](../error-codes/00-index.md) and navigate to the category file linked for your error code. See [L1 Runbooks](../l1-runbooks/00-index.md) for step-by-step procedures. |

---

## See Also

- [APv2 Device Preparation Triage](04-apv2-triage.md) -- For APv2 (Device Preparation) deployment failures
- [iOS Triage](07-ios-triage.md) -- iOS/iPadOS (Intune-managed) triage
- [Android Triage](08-android-triage.md) -- Android enrollment/compliance triage
- [Linux Triage](09-linux-triage.md) -- Linux Intune client (Ubuntu LTS) triage
- [macOS ADE Triage](06-macos-triage.md) -- macOS ADE (Intune-managed) deployment failures

---

**Scenario Trees:**
- [ESP Failure Tree](01-esp-failure.md)
- [Profile Assignment Tree](02-profile-assignment.md)
- [TPM Attestation Tree](03-tpm-attestation.md)
- [APv2 Device Preparation Triage](04-apv2-triage.md)
- [iOS Triage](07-ios-triage.md)
- [Android Triage](08-android-triage.md)
- [Linux Triage](09-linux-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |
| 2026-07-08 | Phase 122 plan 02: converted Mermaid decision graph to a C17-compliant text-equivalent decision table, grouped into 3 stages (LOCKED — 36, nodes + labeled edges); removed the Legend section and the mermaid fence; the 4-way reconvergence into TRD4 preserved as four explicit per-mode rows; split the multi-line Version/macOS/iOS/Android/Linux gate blockquotes into separate groups. | -- |
| 2026-04-27 | Added Linux banner + triage link (Scenario Trees, See Also, Version History) | -- |
| 2026-04-23 | Added Android banner + triage link (Scenario Trees, See Also, Version History) | -- |
| 2026-04-17 | Added iOS/iPadOS triage cross-reference banner | -- |
| 2026-04-14 | Added macOS ADE triage cross-reference banner | -- |
| 2026-04-13 | Added APv2 triage tree cross-reference (restored after accidental revert) | -- |
| 2026-03-20 | Initial version | — |
