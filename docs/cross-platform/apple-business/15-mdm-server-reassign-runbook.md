---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos+tvos
---

> **Platform applicability:** This document covers Apple Business MDM server reassignment —
> changing the MDM server a device is assigned to within an Organizational Unit (OU). This is
> distinct from Intune MDM push-certificate management and device re-enrollment operations, which
> are Intune-side operations outside the Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side MDM server reassignment for
> devices within an OU; Intune-side device re-enrollment, profile redeployment, and MDM
> push-certificate renewal are outside the Apple Business permission surface and are not
> covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** MDM server reassignment UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/FEATURES.md §5.3 and Apple Deployment Guide
> dep4acb2aa44. Steps are marked `[CITED: training; needs live verification]` pending a live
> portal scrape. Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# MDM Server Reassignment Runbook (DELEG-05)

This runbook documents the procedure for reassigning devices to a different MDM server in Apple
Business. It consolidates FEATURES Workflow 5.3 into a single file with two sub-H2s — one for
legacy devices requiring a factory erase (Sub-H2 A) and one for OS 26+ devices supporting
in-place migration (Sub-H2 B).

**Anti-proliferation invariant:** This is the SINGLE MDM server reassignment runbook. There is
no second file (`15b-` or `15-mdm-server-reassign-2`). Both legacy and OS-26+ paths live here.

## Required Role & Permission

**Required permission:** "Assign devices to MDM server" (Devices subgroup) — OU-scoped. This
permission maps to the **Sub-Org Admin bundle** (see
[04-custom-role-authoring.md](04-custom-role-authoring.md)). The canonical Sub-Org Admin
bundle includes "Assign devices to MDM server" as a conditionally-grant permission.

For the full permission catalog, see [01-role-permission-model.md](01-role-permission-model.md)
Devices subgroup.

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| View Devices | OU-scoped | Yes — always-grant (required companion View, OP-3) |
| Assign devices to MDM server | OU-scoped | Yes — conditionally-grant, via Sub-Org Admin bundle (see [04-custom-role-authoring.md](04-custom-role-authoring.md)) |
| Manage MDM Servers | tenant-wide | **DENY-by-default (OP-1)** — reserved for tenant IT administrator / Account Holder only |

> **OP-1 DENY-by-default:** "Manage MDM Servers" is a tenant-wide superprivilege that bundles
> four actions (Add / Edit / Assign / Download MDM server token). Sub-org admins who need to
> **assign** devices to an MDM server hold the narrower "Assign devices to MDM server"
> (OU-scoped) — NOT "Manage MDM Servers". Granting "Manage MDM Servers" to a sub-org admin
> allows creation of competing MDM servers and routes new devices to the wrong tenant. See
> [01-role-permission-model.md](01-role-permission-model.md) OP-1 callout.

> **OP-2:** Do not perform MDM server reassignment operations using Account Holder credentials
> for routine device management. Account Holder is not a delegatable role for operational tasks.

## OS-Version Eligibility Matrix

The path for MDM server reassignment depends on the device's OS version. Refer to this matrix
before selecting Sub-H2 A or Sub-H2 B.

| OS | Version | Path | Sub-H2 |
|----|---------|------|--------|
| iOS | 26+ | In-place migration — no factory erase required | Sub-H2 B |
| iPadOS | 26+ | In-place migration — no factory erase required | Sub-H2 B |
| macOS | 26+ | In-place migration — no factory erase required | Sub-H2 B |
| tvOS | 26+ | In-place migration — no factory erase required | Sub-H2 B |
| iOS/iPadOS | ≤ 25 (iOS 18 and earlier) | Factory erase required | Sub-H2 A |
| macOS | ≤ 25 (macOS 15 and earlier) | Factory erase required | Sub-H2 A |
| tvOS | ≤ 25 | Factory erase required | Sub-H2 A |

[CITED: FEATURES.md §5.3.1-5.3.2 — sourced from Apple Deployment Guide dep4acb2aa44]

> **Note (mixed-OS fleet):** If your fleet contains both legacy (≤ 25) and OS-26+ devices,
> split the migration into two waves: process OS 26+ devices first via Sub-H2 B (in-place,
> no erase), then process legacy devices via Sub-H2 A (factory erase). Do not interleave the
> two paths.

## Sub-H2 A: Legacy Reassignment (iOS/iPadOS ≤ 25 / macOS ≤ 15 / tvOS ≤ 25)

For devices running iOS 18 (and earlier), iPadOS 18 (and earlier), macOS 15 (and earlier),
or tvOS 25 (and earlier), MDM server reassignment requires a **factory erase and re-enrollment**
via Setup Assistant. The Apple Business portal records the new MDM server assignment; the device
picks up the new assignment only after being wiped and re-run through Setup Assistant.

Use case: greenfield rollouts, device refresh cycles, MDM server retirement where devices will
be reimaged anyway.

[CITED: FEATURES.md §5.3.1 — sourced from Apple Deployment Guide dep4acb2aa44]

### Sub-H2 A Procedure

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business with a Managed Apple Account holding "Assign devices to MDM server" for the target OU | Sub-org admin or IT Administrator | OP-2: do not use Account Holder credentials |
| 2 | Navigate to **Devices** sidebar and select the device(s) to reassign | Admin | `[CITED: training; needs live verification]` |
| 3 | Select **Edit MDM Server** or equivalent action | Admin | `[CITED: training; needs live verification]` — exact label may differ in 2026 Apple Business portal |
| 4 | Select the new MDM server from the dropdown | Admin | The dropdown lists only MDM servers registered by a tenant IT administrator; if the desired server is absent, escalate to a central IT administrator — sub-org admins cannot add servers (OP-1) |
| 5 | Save the assignment | Admin | Apple Business records the new MDM server. The device continues talking to the OLD MDM server until factory wiped |
| 6 | Factory-wipe the device | Admin / End user | Required for Sub-H2 A — the new MDM server assignment takes effect only after Setup Assistant re-runs at next enrollment |
| 7 | Re-run Setup Assistant on the device | End user / Admin | Device enrolls into the new MDM server automatically if an enrollment profile is set |
| 8 | Verify the device appears in the new MDM server's device list | Admin | Enrollment propagation may take several minutes |

> **Note:** After completing Step 5 (saving the assignment in Apple Business), the device is
> in a split state: Apple Business records the new MDM server, but the device is still enrolled
> in the old MDM server. The split state resolves only after factory wipe + re-enrollment.
> Do not rely on the Apple Business portal assignment alone — verify with the new MDM console.

## Sub-H2 B: In-Place Migration (iOS/iPadOS/macOS/tvOS 26+)

For devices running iOS 26+, iPadOS 26+, macOS 26+, or tvOS 26+, Apple Business supports
**in-place MDM server migration** without a factory erase. The device unenrolls from the old
MDM server and enrolls in the new one while preserving all user data and declarative managed
app data.

[CITED: FEATURES.md §5.3.2 — sourced from Apple Deployment Guide dep4acb2aa44]

### What Is Preserved vs Not Preserved

| Item | Preserved in OS 26+ in-place migration? |
|------|-----------------------------------------|
| User data | Yes — all user data preserved |
| Declarative managed app data | Yes — managed app data preserved |
| Managed apps (re-pushed by new MDM) | Yes — new MDM redeploys managed apps |
| MDM-installed config profiles | No — new MDM must redeploy configs |
| MDM-installed restrictions | No — new MDM must redeploy restrictions |
| VPN profiles | No — new MDM must redeploy VPN configs |
| Wi-Fi profiles | No — new MDM must redeploy Wi-Fi configs |

[CITED: FEATURES.md §5.3.2]

### VPP Content Token Implication

> **Note:** The new MDM server must have a valid content token uploaded. VPP-purchased apps
> require the new MDM server's content token to be uploaded and synced within 30 days of
> migration start. If the content token upload is delayed beyond 30 days, VPP app assignments
> managed by the new MDM server may lapse. Plan the content token re-upload before initiating
> migration. `[CITED: FEATURES.md §5.3.2]`

### Sub-H2 B Procedure

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Confirm all devices are running iOS 26+ / iPadOS 26+ / macOS 26+ / tvOS 26+ | Admin | Check OS version in current MDM console before proceeding; legacy devices must use Sub-H2 A |
| 2 | Ensure the new MDM server has a valid content token uploaded | Admin | VPP apps require the token within 30 days of migration; upload before initiating |
| 3 | Sign in to Apple Business with a Managed Apple Account holding "Assign devices to MDM server" for the target OU | Sub-org admin or IT Administrator | OP-2: do not use Account Holder credentials |
| 4 | Navigate to **Devices** sidebar and select the OS-26+ device(s) | Admin | `[CITED: training; needs live verification]` |
| 5 | Select **Edit MDM Server** and set the new MDM server; configure an enrollment deadline | Admin | `[CITED: training; needs live verification]` — the enrollment deadline triggers escalating notifications; if deadline passes, the device enforces migration |
| 6 | Save the migration configuration | Admin | The device receives a notification of the pending migration; no factory wipe needed |
| 7 | User proceeds through the guided migration experience | End user | The device unenrolls from the old MDM (preserving user data + declarative managed apps) then enrolls in the new MDM (which redeploys configs + managed apps) |
| 8 | Verify the device appears in the new MDM console | Admin | Enrollment propagation may take several minutes; confirm managed apps and configs have been redeployed by the new MDM |

> **Note (migration deadline enforcement):** After the enrollment deadline, iOS/iPadOS devices
> receive a mandatory restart prompt; macOS devices receive a full-screen blocking prompt
> enforcing migration. Set the deadline with adequate lead time (recommend minimum 7 business
> days) to allow users to complete the guided migration voluntarily. `[CITED: FEATURES.md §5.3.2]`

## Verification

### Post-Reassignment Verification (Both Sub-H2s)

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Device visible in new MDM server's device list | Device serial number appears as enrolled in new MDM console | If absent after 10 minutes, check Apple Business Devices for the device's MDM server assignment |
| Device absent from old MDM server's device list | Device serial number NOT enrolled in old MDM | If still present, the unenrollment may not have propagated; check device status in old MDM and attempt a sync |
| Apple Business portal shows new MDM server | Device record in Apple Business Devices shows new MDM server assignment | If portal still shows old MDM server, the Apple Business save in Step 5 may not have completed |
| VPP app licenses active under new MDM | Apps deployed via VPP are active on device under new MDM content token | If inactive, ensure the new MDM server's content token is uploaded and app assignments are re-pushed |

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — Devices
  subgroup; "Assign devices to MDM server" (OU-scoped, conditionally-grant); OP-1 DENY-by-default
  on "Manage MDM Servers"
- Sub-Org Admin bundle: [04-custom-role-authoring.md](04-custom-role-authoring.md) — canonical
  6-permission bundle; "Assign devices to MDM server" is included as a conditionally-grant permission
- MDM server assignment (admin setup): [06-mdm-server-assignment.md](06-mdm-server-assignment.md) —
  per-OU initial MDM server configuration; this runbook covers the operational reassignment
- Cross-OU device transfer: [14-device-transfer-runbook.md](14-device-transfer-runbook.md) —
  OU transfer (changing which OU a device belongs to) is a separate operation from MDM server reassignment
- Apple TV lifecycle: [10-apple-tv-lifecycle.md](10-apple-tv-lifecycle.md) — Apple TV MDM server
  reassignment follows this runbook; see also Sub-H2 A for retail Apple TV re-enrollment via Configurator
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — OU scope coverage table;
  MDM servers row; per-OU device routing model
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) —
  full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-03: initial authoring — single MDM server reassignment runbook (DELEG-05); OS-version eligibility matrix; Sub-H2 A (legacy factory erase); Sub-H2 B (OS 26+ in-place migration); differential 04-custom-role-authoring.md citation (D-03); anti-proliferation invariant (SC#3/CI-5) | -- |
