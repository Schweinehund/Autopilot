---
doc_id: RE-217
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L1
platform: windows+macos+ios+android+linux
---

**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-217 · **Status:** Approved

# 802.1X Triage Decision Tree

## Summary

Reference decision table for 802.1X Wi-Fi and wired network authentication-failure triage spanning all five platforms (Windows, macOS, iOS/iPadOS, Android, Linux). Gates on a single primary failure symptom — certificate profile error, server trust failure, EAP negotiation mismatch, RADIUS reject, or unknown — and routes to the matching L1 runbook or an L2 escalation with per-platform data to collect, all within 2 decision steps of the root.

> **Platform gate:** This guide routes 802.1X connection-failure triage across all five platforms (Windows / macOS / iOS/iPadOS / Android / Linux).

> Identify the failure symptom and follow the matching branch to the correct L1 runbook. For non-802.1X Intune issues, return to the [Initial Triage Decision Tree](00-initial-triage.md).

## How to Use This Tree

Start here when a user reports an 802.1X Wi-Fi or wired network authentication failure on any platform. Identify the failure symptom, then follow the matching branch to the correct L1 runbook. All terminal nodes are within 2 decision steps of the root. This tree uses a flat symptom-primary shape — per-platform diagnostic detail lives inside each runbook, not this tree, so the tree stays compact.

## Decision Tree

**LOCKED — 11 (nodes + labeled edges)** — 6 nodes + 5 labeled edges, independently re-derived from the pre-conversion decision graph (`git show 71be4ab`). The single diamond (`EAP1`) is represented below; the Routing Verification table already carries one row per labeled edge, upgraded here from the older 5-leaf-count convention to the R1 nodes-plus-labeled-edges convention.

## Routing Verification

All terminal nodes are within 2 decision steps of the root node (EAP1).

| Path | Step 1 (root: EAP1) | Step 2 | Destination |
|------|---------------------|--------|-------------|
| Certificate profile error | Intune cert profile shows Error or Pending | (terminal) | Runbook 38 |
| Server trust / validation failure | Trust prompt or untrusted server / RADIUS root CA missing | (terminal) | Runbook 40 |
| EAP negotiation failure | EAP method or inner-auth mismatch | (terminal) | Runbook 41 |
| RADIUS reject | Cert profiles Succeeded, RADIUS rejects auth | (terminal) | Runbook 39 |
| Unknown / Other | Don't know / Other | (terminal) | Escalate EAPE |

## How to Check

Use these questions to identify which symptom branch applies before routing.

| Question | How to Check |
|----------|-------------|
| Does Intune show a cert profile as Error or Pending? | Open Intune admin center > **Devices** > [platform] > select device > **Device configuration**. If the Trusted Certificate profile OR the SCEP/PKCS client-certificate profile shows "Error," "Pending," or "Not applicable," the symptom is cert profile failure → Runbook 38. |
| Is there a trust prompt, or is the Trusted Certificate profile for the RADIUS root CA missing or failed? | On Windows, the user may see an intermittent dialog "Do you want to connect?" or "Trust this certificate?" On managed macOS/iOS the failure is silent (no prompt). Check Intune: if the Trusted Certificate profile for the RADIUS server CA shows "Error" or is not assigned, or the Wi-Fi profile `Certificate server names` field is empty → Runbook 40. |
| Do all cert profiles show Succeeded, but auth still fails with no trust prompt? | If Trusted Certificate, SCEP/PKCS, and the Wi-Fi/Wired network profiles all show "Succeeded" in Intune, yet the device is rejected by RADIUS with no trust dialog and no cert-error event → Runbook 39. |
| Is the failure EAP-method or inner-auth specific (e.g., iOS fails on an SSID where Windows/macOS succeed)? | Ask: "Does this affect only one device type or platform?" iOS PEAP with PAP inner-auth is a common example — iOS PEAP mandates MS-CHAPv2, so PAP causes an immediate EAP-NAK; other platforms succeed on the same SSID. An EAP method or inner-auth mismatch → Runbook 41. |

## Escalation Data

Collect this information before routing to L2.

| When You Escalate | Collect This |
|-------------------|-------------|
| Unknown / Other (EAPE) | Device serial number, User UPN, device platform and OS version, Intune cert-profile status screenshot (Trusted Certificate + SCEP/PKCS + network profile), name of the relevant event-log channel or portal signal for the device platform (see the per-platform diagnostic signal table in the applicable runbook). Route to L2; [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) is the shared prerequisite for all 802.1X L2 investigation. Also see [#32: Certificate-Chain Investigation](../l2-runbooks/32-8021x-cert-investigation.md) and [#33: RADIUS/EAP Investigation](../l2-runbooks/33-8021x-radius-eap-investigation.md). |

## Related Resources

- [802.1X Certificate Failure (L1 Runbook 38)](../l1-runbooks/38-8021x-certificate-failure.md) — Intune cert profile Error/Pending; cert not deployed
- [802.1X RADIUS Reject (L1 Runbook 39)](../l1-runbooks/39-8021x-radius-reject.md) — Cert profiles Succeeded; RADIUS rejects auth
- [802.1X Server Trust Failure (L1 Runbook 40)](../l1-runbooks/40-8021x-server-trust-failure.md) — Trust prompt / RADIUS root CA not trusted on device
- [802.1X EAP Negotiation Failure (L1 Runbook 41)](../l1-runbooks/41-8021x-eap-negotiation-failure.md) — EAP method or inner-auth mismatch
- [Network Authentication Glossary](../_glossary-network.md) — 802.1X, EAP, EAPOL, RADIUS, supplicant, server-name-validation
- [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md) — EAP-TLS, PEAP-MSCHAPv2, EAP-TTLS comparison
- [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md) — Cert-ordering rule, EKU, server-name validation
- [Initial Triage Decision Tree](00-initial-triage.md) — Entry point for all Intune device issues

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |
| 2026-07-08 | Phase 122 plan 05: converted Mermaid decision graph to the pre-existing Routing Verification decision table; removed the mermaid fence and the Legend section (stale diagram-shape prose); upgraded the LOCKED-N annotation from the older 5-leaf-count convention to LOCKED — 11 (nodes + labeled edges, R1 convention); split the 1 pre-existing over-200-char blockquote; enrolled as RE-217. | -- |
| 2026-06-30 | Phase 107 plan 03: initial authoring — 802.1X triage decision tree (symptom-primary) | -- |
