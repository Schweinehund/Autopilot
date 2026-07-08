---
doc_id: RE-211
status: Approved
owner: Intune Admin Lead
doc_type: Reference
platform: Windows
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L1
---

**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-211 · **Status:** Approved

# APv2 Device Preparation Triage

## Summary

Reference decision table for Windows Autopilot Device Preparation (APv2) post-OOBE triage. Gates on whether the ESP or Device Preparation screen appeared, then routes by primary failure symptom (apps/scripts, timeout, Entra join, enrollment, or IME) to the matching L1 runbook or an L2 escalation point with data to collect.

> **Version gate:** This guide covers Windows Autopilot Device Preparation (APv2). For Windows Autopilot (classic), see [Initial Triage Decision Tree](00-initial-triage.md).

## How to Use This Tree

Start here when a user reports an issue with a device that was expected to go through [APv2 Device Preparation](../_glossary.md#apv2). This tree begins after the user has authenticated during OOBE -- it covers portal-observable symptoms for APv2 Device Preparation deployments. No network reachability gate is included because successful OOBE authentication already verifies network connectivity. If the user cannot reach any website or sign in at all, use the [APv1 initial triage tree](00-initial-triage.md) network gates instead (those network checks apply regardless of deployment framework).

Follow each decision point, answering the question shown using only what you can observe on the device screen or look up in the Intune admin center. The tree will route you to a specific L1 runbook or to an L2 escalation point with data collection instructions.

## Decision Tree

**LOCKED — 23 (nodes + labeled edges)** — 14 nodes + 9 labeled edges (plus 4 unlabeled continuation edges), independently re-derived from the pre-conversion decision graph (`git show 71be4ab`). The tree is grouped below into two stages that mirror the graph's own branch structure; each answer column is one of the graph's labeled edges — no row collapses more than one incoming edge.

### Stage 1: ESP / Device Preparation Screen Gate (APD1 → APD2)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 1 | Did the Enrollment Status Page (ESP) display during OOBE? (APD1) | Yes | Possible APv1 registration conflict (APA1) → See: APv1 Registration Conflict Runbook (APR1) |
| 1 | Did the Enrollment Status Page (ESP) display during OOBE? (APD1) | No | Continue to Step 2 |
| 2 | Did the Device Preparation screen appear? (APD2) | No | Deployment experience never launched (APA2) → See: Deployment Not Launched Runbook (APR2) |
| 2 | Did the Device Preparation screen appear? (APD2) | Yes | Continue to Step 3 (primary failure symptom) |

### Stage 2: Primary Failure Symptom Routing (APD3)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 3 | What is the primary failure symptom? (APD3) | Apps or scripts not installed | Check app assignment and deployment report (APA3) → See: Apps Not Installed Runbook (APR3) |
| 3 | What is the primary failure symptom? (APD3) | Deployment timed out | Check timeout settings and app count (APA4) → See: Deployment Timeout Runbook (APR4) |
| 3 | What is the primary failure symptom? (APD3) | Entra join failed | Escalate L2: Collect deployment report and Entra join error (APE1) |
| 3 | What is the primary failure symptom? (APD3) | Enrollment failed | Escalate L2: Collect device status and license info (APE2) |
| 3 | What is the primary failure symptom? (APD3) | IME failed or other | Escalate L2: Collect deployment report phase details (APE3) |

## How to Check

| Node | Check | Where to Look |
|------|-------|---------------|
| APD1 | Check the screen appearance | APv1 ESP shows "Setting up your device..." or "Setting up for [username]..."; APv2 Device Preparation shows "Getting everything ready..." or a Device Preparation progress screen. If the user saw the ESP interface, answer Yes. If the user saw the Device Preparation interface or no managed deployment screen at all, answer No. |
| APD2 | Check if any deployment progress screen appeared | If no managed deployment screen appeared after user sign-in during OOBE, the deployment experience was never triggered. Answer No. If the Device Preparation progress screen appeared (even if it later failed), answer Yes. |
| APD3 | Review the Intune deployment report | Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments. Select the deployment record for this device and review the Phase column, error details, and the Apps and Scripts tabs to identify the primary failure symptom. |

## Escalation Data

| ID | Scenario | Collect Before Escalating | See Also |
|----|----------|---------------------------|----------|
| APE1 | Entra join failed | Deployment report (screenshot or export), Entra join error details from deployment record Phase column, device serial number, signing-in user UPN, Entra device settings screenshot | [APv2 Deployment Report Guide](../l2-runbooks/08-apv2-deployment-report.md) |
| APE2 | Enrollment failed | Intune device enrollment status, signing-in user UPN and license assignment screenshot, MDM scope configuration screenshot, device serial number | [APv2 Deployment Report Guide](../l2-runbooks/08-apv2-deployment-report.md) |
| APE3 | IME or infrastructure failure | Full deployment report with phase breakdown (screenshot or export), device serial number, network information (Wi-Fi/ethernet, proxy), timestamp of failure | [APv2 Deployment Report Guide](../l2-runbooks/08-apv2-deployment-report.md), [APv2 Event ID Reference](../l2-runbooks/07-apv2-event-ids.md) |

## See Also

- [Initial Triage Decision Tree](00-initial-triage.md) -- APv1 (classic Autopilot) triage and network connectivity gates
- [APv2 Deployment Flow (10-Step Process)](../lifecycle-apv2/02-deployment-flow.md) -- Full APv2 deployment sequence
- [APv1 vs APv2](../apv1-vs-apv2.md) -- Framework comparison and selection guidance
- [L1 Runbooks](../l1-runbooks/00-index.md) -- Full index of L1 runbooks for both APv1 and APv2

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |
| 2026-07-08 | Phase 122 plan 03: converted Mermaid decision graph to 2 grouped C17-compliant decision tables (LOCKED — 23, nodes + labeled edges); removed the mermaid fence, the Legend section, and the diagram's node-navigation link directives (stale diagram-interaction prose); all 3 decision points preserved as explicit table rows across the 2 stages. | -- |
| 2026-04-12 | Initial version | -- |
