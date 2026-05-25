---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos+tvos
---

> **Platform applicability:** This document covers Apple Business cross-OU device transfer —
> reassigning a device's Organizational Unit (OU) assignment within the same Apple Business
> tenant. This is distinct from Intune device reassignment and unenrollment operations, which
> are Intune-side operations outside the Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side cross-OU device transfer
> (reassigning a device from one OU to another within the same tenant); Intune-side device
> profile reassignment, unenrollment, and re-enrollment are outside the Apple Business
> permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** Cross-OU device transfer UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/FEATURES.md §5.2 and PITFALLS.md OP-5. Steps are
> marked `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# Device Transfer Runbook (Cross-OU)

This runbook documents the procedure for transferring a device between Organizational Units
(OUs) within the same Apple Business tenant. It covers the impact matrix, pre-transfer
checklist, transfer procedure, and post-transfer verification.

**Read the OP-5 callout before proceeding.** Cross-OU transfer has HIGH-severity downstream
effects on VPP app licenses. The transfer itself is a single admin click with no Apple-side
approval workflow; the downstream impact must be planned before the click.

## Required Role & Permission

**Required permission:** "Reassign devices between OUs" (Devices subgroup) — tenant-wide scope.
See [01-role-permission-model.md](01-role-permission-model.md) Devices subgroup for the full
permission catalog. The OP-3 companion View dependency applies: "View Devices" MUST also be
granted; without it, the Devices tab shows an empty list and the transfer action cannot be
targeted.

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| View Devices | OU-scoped | Yes — always-grant (required companion View, OP-3) |
| Reassign devices between OUs | tenant-wide | **DENY-by-default (OP-1)** — requires IT Administrator or Account Holder |

> **OP-1:** "Reassign devices between OUs" is a tenant-wide permission, not OU-scoped. It is
> DENY-by-default for sub-org admins. Only IT Administrators and Account Holders can perform
> cross-OU device transfers. Sub-org admins scoped to a single OU do NOT hold this permission
> and must escalate to a tenant IT administrator.

> **OP-2:** Do not perform cross-OU transfer operations using Account Holder credentials for
> routine device management. Account Holder is not a delegatable role for operational tasks.

---

> **⛔ Cross-OU Transfer — 4-cell impact matrix (OP-5)**
>
> OU transfer has HIGH-severity downstream effects. VPP device-licensed apps **STOP WORKING**
> immediately after transfer; licenses are tied to the source OU's content token and must be
> explicitly revoked and re-assigned from the target OU's catalog.
>
> | Impact Category | Survives OU Transfer? |
> |----------------|----------------------|
> | VPP device-licensed apps | **BREAKS** — stops working |
> | Enrollment profile | **Does NOT follow** device |
> | Intune config profiles | **Survives** (Intune is assignment authority) |
> | Audit entry | **Logged** — author-scope semantics (OP-14) |
>
> **Pre-transfer dependency checklist:**
> - [ ] Identified all VPP license dependencies in source OU
> - [ ] VPP licenses revoked (30-day grace observed for managed devices)
> - [ ] Target OU catalog has replacement licenses available
> - [ ] Enrollment profile compatibility confirmed with target OU
> - [ ] Device user notified
>
> Source: PITFALLS.md OP-5

---

## Impact Matrix — Detailed Explanation

Understanding what survives a cross-OU transfer is critical for planning the transfer window
and coordinating downstream actions.

| Impact Category | Survives OU Transfer? | What you must do |
|----------------|----------------------|-----------------|
| VPP device-licensed apps | **BREAKS** — stops working immediately | Revoke source-OU licenses (30-day grace for managed devices); re-assign from target-OU catalog after transfer |
| Enrollment profile | **Does NOT follow** the device | On next factory reset, device receives target OU's enrollment profile; supervision flags, app pre-load, and restriction policies may differ — verify compatibility before transfer |
| Intune config profiles | **Survives** (Intune is the assignment authority for config profiles; Apple Business OU transfer does not affect Intune assignments) | Review post-transfer device state; note the device will have source-OU enrollment profile + target-OU Intune configs until next factory reset |
| Audit entry | **Logged** — "Device Location changed" with admin, serial, timestamp, source + target OU | Source-OU admin and tenant admin see it; target-OU admin may NOT see the action if scoped only to target OU (author-scope semantics, OP-14) |

[CITED: PITFALLS.md OP-5 — HIGH confidence for VPP and enrollment profile; MEDIUM for Intune profile survival; FEATURES.md §5.2]

## Pre-Transfer Dependency Checklist

Complete all checklist items before executing the transfer. Skipping any item may cause
app outages or enrollment-state mismatches that are difficult to recover from post-transfer.

- [ ] **VPP dependencies identified:** List all VPP device-licensed apps assigned to the
  device through the source OU's content token.
- [ ] **VPP licenses revoked:** Revoke source-OU VPP licenses for this device. For managed
  devices, observe the 30-day grace period before forced revocation; notify the device user
  that affected apps will stop working after transfer.
- [ ] **Target-OU catalog replacements available:** Confirm the target OU has a valid content
  token with sufficient licenses for all apps the device requires post-transfer.
- [ ] **Enrollment profile compatibility confirmed:** Compare source and target OU enrollment
  profiles (supervision flags, app pre-load list, restriction policies, MDM server assignment).
  Any mismatch takes effect at the device's next factory reset.
- [ ] **Device user notified:** Inform the device user that VPP apps will be interrupted and
  that enrollment-profile-driven settings may change at the next factory reset.

## Transfer Procedure

This procedure covers transferring a device between OUs within the same Apple Business tenant.
The transfer is a single admin click with no Apple-side approval workflow. All downstream
impact (VPP, enrollment profile) must be planned using the pre-transfer checklist above.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Complete the OP-5 pre-transfer dependency checklist (see above) | IT Administrator | All checklist items must be resolved before proceeding |
| 2 | Sign in to Apple Business with a Managed Apple Account holding "Reassign devices between OUs" | IT Administrator | OP-2: do not use Account Holder credentials for routine operations |
| 3 | Navigate to **Devices** sidebar | IT Administrator | `[CITED: training; needs live verification]` |
| 4 | Search for and select the device(s) to transfer by serial number or device name | IT Administrator | Multi-device selection supported; all selected devices will transfer to the same target OU |
| 5 | Select **Edit Location** or **Reassign to OU** (exact label TBD) | IT Administrator | `[CITED: training; needs live verification]` — UI label may differ in 2026 Apple Business portal |
| 6 | Select the target OU from the dropdown | IT Administrator | The dropdown lists all OUs in the tenant. Confirm you are selecting the correct target OU before proceeding |
| 7 | Confirm the transfer in the confirmation dialog | IT Administrator | Transfer is immediate; there is no Apple-side approval workflow — you are the approval authority |
| 8 | Verify the device appears in the target OU's device list | IT Administrator | See Verification section |
| 9 | Re-assign VPP licenses from target-OU catalog | IT Administrator / Content Manager | Required if VPP apps were revoked in the pre-transfer checklist step |

> **Note:** Cross-OU device transfer within Apple Business is a single admin click with no
> built-in approval gate. The impact matrix above (OP-5) describes all downstream effects.
> Ensure the pre-transfer dependency checklist is complete before clicking Confirm.
> `[CITED: training; needs live verification]`

## Apple TV Transfers

Apple TV cross-OU transfers follow the same mechanics described in this runbook. The transfer
procedure and OP-5 impact matrix apply equally to tvOS devices. Note that retail Apple TV
devices enrolled via Apple Configurator (rather than ADE) will require Configurator
re-enrollment after a factory reset to land in the target OU's MDM server.

For the Apple TV lifecycle — including enrollment, OU assignment, and content-token app
deployment — see [10-apple-tv-lifecycle.md](10-apple-tv-lifecycle.md). The OU transfer
procedure for Apple TV is identical to iOS/iPadOS/macOS transfers.

## Verification

### Post-Transfer Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Device visible in target OU's Devices list | Device serial number appears under target OU in Apple Business Devices sidebar | Refresh the portal; if still absent wait 5 minutes and retry |
| Device absent from source OU's Devices list | Device serial number does NOT appear under source OU | If still visible, the transfer may not have completed — check the Activity log |
| Audit entry in Activity log | "Device Location changed" entry with correct serial, source OU, target OU, admin account | Navigate to Activity sidebar; filter by Device events and the transfer timestamp |
| VPP apps re-assigned | Target-OU VPP licenses assigned to device from target-OU content token | Verify in the MDM console; re-assign from target-OU catalog if needed |

### Confirming Audit Entry (OP-14 Author-Scope)

The audit entry for the transfer is scoped to the **author's OU** (the IT admin who performed
the transfer). If a sub-org admin for the target OU attempts to view the transfer audit entry,
they may NOT see it — target-scope admins do not see actions authored in another admin's scope.
A tenant-wide IT Administrator can query the Activity log to see the full transfer history
across all OUs.

For the full author-scope vs target-scope semantics, see
[17-audit-log-scoping-runbook.md](17-audit-log-scoping-runbook.md).

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — Devices
  subgroup; "Reassign devices between OUs" (OP-1 DENY-by-default); OP-3 Edit-without-View table
- Device release: [13-device-release-runbook.md](13-device-release-runbook.md) — do NOT use
  release for intra-tenant OU transfers; release removes the ADE/DEP binding, not the OU assignment
- MDM server reassignment: [15-mdm-server-reassign-runbook.md](15-mdm-server-reassign-runbook.md) —
  MDM server reassign is a separate action from OU transfer; see runbook for OS-version eligibility
- Apple TV lifecycle: [10-apple-tv-lifecycle.md](10-apple-tv-lifecycle.md) — Apple TV OU transfer
  follows the same mechanics (same procedure, same OP-5 impact matrix)
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — OU scope coverage table;
  Devices row; OU hierarchy rules
- Audit log scoping: [17-audit-log-scoping-runbook.md](17-audit-log-scoping-runbook.md) — author-scope
  vs target-scope semantics (OP-14) relevant to transfer audit entries
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) —
  full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-03: initial authoring — cross-OU device transfer runbook; OP-5 hard-bordered callout; 4-cell impact matrix; pre-transfer dependency checklist; Apple TV cross-link (10-); post-transfer verification (DELEG-04) | -- |
