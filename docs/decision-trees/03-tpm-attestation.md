---
doc_id: RE-210
status: Approved
owner: Intune Admin Lead
doc_type: Reference
platform: Windows
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-210 · **Status:** Approved

# TPM Attestation Failure Decision Tree

## Summary

Reference decision table for Windows Autopilot (classic APv1 and self-deploying mode) TPM attestation triage. Gates on whether the failure is TPM-related, then branches on BIOS enablement, TPM version, and error-code presence, routing each outcome to a Resolved state, an L1 error-code lookup, or an L2 escalation point with data to collect.

> **Version gate:** This guide covers Windows Autopilot (classic). For Device Preparation (APv2), see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

Use this tree to triage [TPM](../_glossary.md#tpm) (Trusted Platform Module) failures that occur during [pre-provisioning](../_glossary.md#pre-provisioning) or self-deploying mode provisioning. Both modes require TPM 2.0 attestation before the device can complete enrollment. This tree covers the checks an L1 agent can perform — BIOS settings verification and error code lookup — before escalating. Every branch ends at a Resolved outcome or an escalation point with data to collect before handing off.

## Decision Tree

**LOCKED — 33 (nodes + labeled edges)** — 18 nodes + 15 labeled edges (plus 2 unlabeled continuation edges), independently re-derived from the pre-conversion decision graph (`git show 71be4ab`). The tree is grouped below into two stages that mirror the graph's own branch structure; each answer column is one of the graph's labeled edges — no row collapses more than one incoming edge.

### Stage 1: TPM Failure & BIOS Gate (TPD1 → TPD2 → TPD3)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 1 | Did the device fail during pre-provisioning or self-deploying mode with a TPM-related error? (TPD1) | No | Return to Initial Triage (TPR0) |
| 1 | Did the device fail during pre-provisioning or self-deploying mode with a TPM-related error? (TPD1) | Yes | Continue to Step 2 |
| 2 | Is TPM enabled in BIOS? (TPD2) | No - TPM disabled | Enable TPM in BIOS and save settings (TPA1) → continue to Step 2b |
| 2 | Is TPM enabled in BIOS? (TPD2) | Yes - TPM enabled | Continue to Step 3 (TPM version check) |
| 2 | Is TPM enabled in BIOS? (TPD2) | Don't know - cannot access BIOS | Escalate L2: Cannot verify BIOS TPM settings (TPE5) |
| 2b | Retry provisioning - did it succeed? (TPD3) | Yes | Resolved: TPM enabled, provisioning complete (TPR1) |
| 2b | Retry provisioning - did it succeed? (TPD3) | No | Escalate L2: TPM issue persists after enabling (TPE1) |

### Stage 2: TPM Version & Error Code Routing (TPD4 → TPD5 → TPD6)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 3 | Is TPM version 2.0? (TPD4) | No - version 1.2 or older | Escalate L2: TPM version too old - hardware replacement needed (TPE2) |
| 3 | Is TPM version 2.0? (TPD4) | Yes - version 2.0 | Continue to Step 4 (error-code check) |
| 4 | Does the error screen show an error code? (TPD5) | Yes | Look up error code in TPM error table (TPA2) → continue to Step 4b |
| 4 | Does the error screen show an error code? (TPD5) | No - no error code | Power off device, wait 30 seconds, then retry provisioning (TPA3) → continue to Step 4c |
| 4b | Code found in TPM error table? | Code found | Resolved: Follow L1 Action column in TPM error table (TPR2) |
| 4b | Code found in TPM error table? | Code not found | Escalate L2: TPM error code not found in table (TPE3) |
| 4c | Did provisioning succeed after retry? (TPD6) | Yes | Resolved: Provisioning succeeded on retry (TPR3) |
| 4c | Did provisioning succeed after retry? (TPD6) | No | Escalate L2: TPM attestation fails without error code (TPE4) |

## How to Check

| Node | Check | Where to Look |
|------|-------|---------------|
| TPD1 | Did the device fail with a TPM-related error? | Look at the error message on the device screen. TPM failures typically show keywords such as: "TPM," "attestation," "provisioning failed," or hex codes in the 0x800705xx, 0x80190xxx, or 0x8103xxxx range. If the failure occurred during pre-provisioning (technician phase) or self-deploying mode, answer Yes. |
| TPD2 | Is TPM enabled in BIOS? | Restart the device and enter BIOS/UEFI setup (the key varies by manufacturer — commonly F2, F10, Del, or Esc at the manufacturer splash screen). Navigate to Security or Advanced settings and look for a TPM, PTT (Platform Trust Technology), or Security Device setting. If it shows Enabled, answer Yes. If Disabled, answer No. If you cannot access BIOS (for example, BitLocker PIN required or no keyboard access), answer Don't know. |
| TPD4 | Is TPM version 2.0? | In the same BIOS TPM settings screen, look for a version number. The setting may be labeled TPM Version, TPM Spec, or similar. The value must show 2.0. If it shows 1.2 or any version below 2.0, answer No. Version 1.2 is not supported for pre-provisioning or self-deploying mode by design. |
| TPD5 | Does the error screen show an error code? | Look at the failure screen on the device. A hex code starts with 0x and is 8-10 characters long (for example, 0x800705b4). Note the full code before proceeding. If there is no hex code — only a generic message such as "Something went wrong" or the screen just stops — answer No. |

## Escalation Data

| ID | Scenario | Collect | See Also |
|----|----------|---------|----------|
| TPE1 | TPM issue persists after enabling in BIOS | Device serial number, device make and model, BIOS version, TPM manufacturer (shown in BIOS), deployment mode (pre-provisioning or self-deploying), timestamp, screenshot of error screen | [L2 TPM Investigation](../l2-runbooks/03-tpm-attestation.md) |
| TPE2 | TPM version too old (1.2 or below) | Device serial number, device make and model, BIOS version, TPM version confirmed in BIOS, deployment mode, timestamp | [L2 TPM Investigation](../l2-runbooks/03-tpm-attestation.md) |
| TPE3 | TPM error code not found in table | Device serial number, full error code (0x...), device make and model, BIOS version, TPM manufacturer, deployment mode, timestamp, screenshot of error screen | [L2 TPM Investigation](../l2-runbooks/03-tpm-attestation.md) |
| TPE4 | TPM attestation fails without error code | Device serial number, device make and model, BIOS version, TPM manufacturer, deployment mode, timestamp, description of what appears on screen when provisioning fails | [L2 TPM Investigation](../l2-runbooks/03-tpm-attestation.md) |
| TPE5 | Cannot verify BIOS TPM settings | Device serial number, device make and model, reason BIOS could not be accessed, deployment mode, timestamp | [L2 TPM Investigation](../l2-runbooks/03-tpm-attestation.md) |

## Resolution & Next Steps

| ID | Resolution | Next Steps |
|----|-----------|------------|
| TPR1 | TPM was disabled in BIOS — enabled and provisioning completed | Confirm the device has finished provisioning and is enrolled in Intune. Document the BIOS change in the ticket for asset records. See [L1 Runbook Index](../l1-runbooks/00-index.md) — TPM scenarios not resolved by BIOS changes escalate to L2. |
| TPR2 | Error code found in TPM error table — follow the L1 Action for that code | See [TPM error table](../error-codes/02-tpm-attestation.md) for the specific action. Some codes may require a retry after a firmware update; follow the table instructions. See [L1 Runbook Index](../l1-runbooks/00-index.md) — TPM scenarios not resolved by error table actions escalate to L2. |
| TPR3 | Provisioning succeeded after power-off and retry | Confirm the device has fully completed provisioning. Intermittent TPM attestation failures can occur on first attempt; a clean retry commonly resolves them. See [L1 Runbook Index](../l1-runbooks/00-index.md) — if issue recurs, escalate to L2. |

---

[Back to Initial Triage](00-initial-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |
| 2026-07-08 | Phase 122 plan 03: converted Mermaid decision graph to 2 grouped C17-compliant decision tables (LOCKED — 33, nodes + labeled edges); removed the mermaid fence; all 6 decision points preserved as explicit table rows across the 2 stages. | -- |
| 2026-03-20 | Initial version | — |
