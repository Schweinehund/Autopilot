---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos+tvos
---

> **Platform applicability:** This document covers Apple Business device release operations —
> removing the Apple Business-to-MDM-server binding for a device (ADE / DEP record). This is
> distinct from Intune device retire and wipe actions (which are MDM-side operations), which
> are Intune-side operations outside the Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side device release (removing a
> device's ADE/DEP record from an OU); Intune-side device retire, wipe, and unenrollment are
> outside the Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** Device release UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/FEATURES.md §5.1 and PITFALLS.md OP-6. Steps are
> marked `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# Device Release Runbook

This runbook documents the procedure for releasing a device from Apple Business (removing its
ADE/DEP record from an Organizational Unit). It covers the release procedure, the critical
"release ≠ removal" semantics, the OP-6 hard-bordered callout, and post-release verification.

**Critical distinction — read before proceeding:** Releasing a device is NOT the same as
removing it from Apple's Device Enrollment Program (DEP) backend. The distinction has important
operational consequences. See the OP-6 callout below.

## Required Role & Permission

**Required permission:** "Release devices" (Devices subgroup) — OU-scoped.
See [01-role-permission-model.md](01-role-permission-model.md) Devices subgroup for the full
permission catalog. The OP-3 companion View dependency applies: "View Devices" MUST also be
granted; without it, the Devices tab shows an empty list and the release action cannot be
targeted.

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| Release devices | OU-scoped | Yes — conditionally-grant, OU-scoped |
| View Devices | OU-scoped | Yes — always-grant (required companion View, OP-3) |
| Reassign devices between OUs | tenant-wide | **DENY-by-default (OP-1)** — requires tenant IT administrator |

> **OP-2:** Do not perform device release operations using Account Holder credentials.
> Account Holder is not a delegatable role for routine device management operations.

> **Note:** "Reassign devices between OUs" is a different operation from "Release devices" and
> is DENY-by-default (tenant-wide). Do not confuse the two. See
> [14-device-transfer-runbook.md](14-device-transfer-runbook.md) for cross-OU transfer procedures.

## Release Procedure

Complete the OP-6 pre-release checklist (below) BEFORE executing the release. An incorrectly
timed release can leave a device in an ambiguous management state.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Complete the OP-6 pre-release checklist (see callout below) | Admin | All checklist items must be resolved before proceeding |
| 2 | Sign in to Apple Business with a Managed Apple Account holding "Release devices" for the target OU | Admin | OP-2: do not use Account Holder credentials |
| 3 | Navigate to **Devices** sidebar | Admin | `[CITED: training; needs live verification]` |
| 4 | Search for and select the device(s) to release by serial number or device name | Admin | `[CITED: training; needs live verification]` |
| 5 | Select **Release Devices** (or equivalent action in 2026 UI) | Admin | `[CITED: training; needs live verification]` — exact action label may differ |
| 6 | Confirm the release in the confirmation dialog | Admin | Read the dialog carefully — release is immediate and cannot be undone without reseller re-push or manual re-add |
| 7 | Verify the device no longer appears in Apple Business Devices for the OU | Admin | See Verification section |
<!-- ABAUDIT-10: next line references Intune admin as the party to notify after Apple Business release; C15 regex 8 false-positive exemption (factual handoff instruction to the Intune admin role — this is a coordination step, not an Apple Business permission claim) -->
| 8 | Notify Intune admin that the device has been released from Apple Business | Admin | Intune will receive the MDM release notification; follow up to ensure device status is updated |

---

> **⛔ Device Release — "release ≠ removal" (OP-6)**
>
> Releasing a device from Apple Business does NOT remove it from Apple's DEP backend.
> The device-to-MDM-server binding is deleted; however, existing MDM supervision and
> enrollment are NOT immediately broken — the device continues as managed until the next
> factory reset. After factory reset, the device becomes civilian.
>
> Resellers continue to push device serials to Apple Business per commercial agreement.
> A released device can re-appear in Apple Business if the reseller re-pushes it.
> If re-appeared and a default enrollment profile is set, the device will attempt MDM
> enrollment at next factory reset.
>
> **Pre-release checklist (all must be resolved):**
> - [ ] No active Shared iPad session ongoing on device
> - [ ] Admin understands device will re-enroll if DEP profile remains set
> - [ ] No other OU or admin has a pending/recent action on this device — check the Apple Business **Activity** log filtered by device serial number; if another OU owns it, use the [`05-sub-org-admin-onboarding.md`](05-sub-org-admin-onboarding.md#which-admin-owns-this-pool) lookup to identify and coordinate with the owning admin first
>
> Source: PITFALLS.md OP-6

---

## Release ≠ Removal — Operational Implications

Understanding what release does and does not do is critical to avoiding post-release confusion.

| State | After Release | Expected? |
|-------|---------------|-----------|
| Device-to-MDM binding | Deleted from Apple Business | Yes |
| MDM supervision (existing) | Continues until next factory reset | Yes — device remains managed |
| MDM enrollment (existing) | Continues until next factory reset | Yes — Intune still manages the device |
| Device in Apple's DEP backend | Still present | Yes — resellers keep pushing serials |
| Device re-appears in Apple Business | Possible (reseller re-push) | Yes — expected per OP-6 |
| Device re-enrolls at next factory reset | Yes, if enrollment profile is set | Yes — if default profile is active |

**30-day provisional period:** When a device is re-added to Apple Business via Apple Configurator
(not the standard ADE release-and-return path, but the manual re-add path), the end user has a
**30-day window** to unilaterally remove the device from MDM. This 30-day provisional period is
relevant when an admin releases and then re-adds a device via Apple Configurator. Plan device
returns and fleet decisions accordingly — devices re-added via Configurator should not be
considered permanently enrolled for 30 days.

## Common Release Scenarios

### Scenario 1: Device Decommission (Fleet Retirement)

Device is being retired from service and should not re-enroll. Release is the correct Apple
Business action.

**Post-release required actions:**
- Factory-wipe the device before disposal (clears MDM supervision)
- Verify the device is removed from Intune inventory via MDM retire/wipe (separate Intune action)
- Coordinate with the reseller to stop re-pushing this serial to Apple Business (if permanent retirement)

### Scenario 2: Device Transfer to Another Tenant

Device is being transferred to a different organization. Release removes the current
Apple Business binding so the receiving organization can add it to their Apple Business.

**Prerequisite:** Device must be factory-wiped after release; the receiving organization's
reseller must push the serial to their Apple Business instance.

### Scenario 3: Device Transfer Between OUs in Same Tenant

**Do NOT use Release for intra-tenant OU transfers.** Use the cross-OU transfer procedure
instead. See [14-device-transfer-runbook.md](14-device-transfer-runbook.md).

Releasing and re-adding within the same tenant is an anti-pattern — it creates a gap window
where the device has no ADE record and may miss enrollment profile assignment.

## Verification

### Post-Release Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Device absent from Apple Business Devices list | Not visible in the OU's device list | Refresh; if still visible, wait 5 minutes and retry |
| Intune receives release notification | Device status in Intune shows "Released from Apple Business" or equivalent | Check Intune device details; if not updated, force a sync |
| Device remains enrolled in Intune (if not factory-wiped) | Still appears as managed in Intune | Expected — release does not break existing MDM enrollment |
| Factory reset clears MDM enrollment | Device presents Setup Assistant after wipe | Expected — device becomes civilian after factory reset if no DEP profile active |

### Verifying the Device Has Not Re-Appeared

After releasing a device that should not re-enroll:

1. Wait 24 hours (reseller sync cadence may be daily)
2. Search for the device serial in Apple Business Devices — it should remain absent
3. If the device re-appears, the reseller has re-pushed the serial. Contact the reseller to
   remove the serial from their push list for your organization

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — Devices subgroup;
  "Release devices" (line 274); OP-3 Edit-without-View table
- Cross-OU transfer: [14-device-transfer-runbook.md](14-device-transfer-runbook.md) — intra-tenant
  OU transfer procedure (do not confuse with release)
- MDM server reassignment: [15-mdm-server-reassign-runbook.md](15-mdm-server-reassign-runbook.md) —
  changing the MDM server assigned to a device (not a release operation)
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — OU scope coverage table;
  Devices row; reseller device-push model
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) —
  full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-02: initial authoring — device release runbook; OP-6 "release ≠ removal" hard-bordered callout; 30-day provisional period; pre-release checklist; release scenarios; post-release verification (DELEG-03) | -- |
