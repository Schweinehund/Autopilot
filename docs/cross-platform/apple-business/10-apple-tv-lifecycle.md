---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: apple-tv
---

> **Platform applicability:** This document covers Apple TV device lifecycle within Apple Business
> Organizational Units (OUs). Apple TV devices run tvOS and are managed as supervised devices.
> Unlike iOS/iPadOS devices, Apple TV purchased at retail does NOT support Automated Device
> Enrollment (ADE) — retail Apple TVs enroll via Apple Configurator. For terminology canon
> (Organizational Unit, content token, Managed Apple Account), see the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md).
> For OU scoping context, see [02-ous-architecture.md](02-ous-architecture.md).

> **Training-data notice:** Apple TV portal navigation labels, Configurator enrollment steps,
> and content-token deployment details in this document are authored from AI training knowledge
> of Apple Business Manager / Apple Business and Apple Configurator as of the pre-2026-04-14
> rebrand. All portal-label references and step sequences are marked
> `[CITED: training; needs live verification]` pending live portal and device verification.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20). This notice is removed
> once the steps are verified verbatim against the Apple portal and Configurator.

# Apple TV Lifecycle (OU-08)

This document covers the lifecycle of Apple TV devices within Apple Business Organizational Units
(OUs): the Configurator-only retail-purchase enrollment path, OU assignment, content-token-based
app deployment, and the Conference Room Display shared-physical-space heuristic (OP-15). It
implements requirement OU-08 of the v1.6 Apple Business Delegated Governance milestone.

**Purpose:** Sub-org admins and tenant-level admins use this document to enroll retail-purchased
Apple TV devices, assign them to the correct OU, deploy content-token apps, and apply the
Conference Room Display heuristic to determine OU partitioning for shared physical spaces.

**OU scope:** Apple TV devices are enrolled into a specific OU's device pool. The sub-org admin
holds custom role permissions scoped to that OU (see
[04-custom-role-authoring.md](04-custom-role-authoring.md)). Cross-OU Apple TV management
requires a top-level IT Administrator role.

---

## Enrollment Path: Configurator-Only (Retail Apple TV)

### Why Retail Apple TVs Do Not Support ADE

Automated Device Enrollment (ADE) requires devices to be enrolled in Apple Business at the time
of purchase — typically through Apple's Reseller channel or Apple's own Business Store, where
the device serial number is registered to the organization's Apple Business account before the
device ships. **Retail Apple TVs purchased from a consumer store are NOT pre-registered in Apple
Business and therefore do NOT qualify for ADE.**

For retail Apple TV purchases, the only supported supervised enrollment path is **Apple
Configurator** (a macOS application used to supervise and enroll devices manually).

> **Note:** Apple does not publish a formal list of resellers that support ADE enrollment for
> Apple TV. Organizations seeking ADE enrollment should purchase through Apple's Business Store
> directly or through an Apple Authorized Reseller that supports ABM/Apple Business enrollment
> at order time. [CITED: training; needs live verification]

### Configurator Enrollment Prerequisites

Before beginning the Configurator enrollment workflow:

- A macOS device with **Apple Configurator 2** (or the current Configurator release) installed.
  [CITED: training; needs live verification — verify current Configurator version requirements]
- The Apple TV is **factory-new or factory-reset** (not previously signed in with any Apple ID).
- The enrolling admin has Apple Business portal access (IT Administrator or Account Holder level)
  to assign the device to an OU and MDM server.
- The target OU's MDM server is configured in Apple Business portal
  (see [06-mdm-server-assignment.md](06-mdm-server-assignment.md)).

### Configurator Enrollment Steps

1. **Connect the Apple TV to the macOS Configurator host** via USB-C or USB-C to USB-A cable.
   Apple Configurator recognizes the device and displays it in the Configurator device list.
   [CITED: training; needs live verification]

2. **Supervise the Apple TV in Configurator:**
   - In Apple Configurator, select the connected Apple TV.
   - Select **Actions → Prepare** (or equivalent in your Configurator version).
   - Choose **Supervise devices** and configure the MDM server URL for the target OU.
   - Configurator installs a supervision identity and connects the device to the MDM server.
   [CITED: training; needs live verification — step naming may differ across Configurator versions]

3. **Add the device to Apple Business portal:**
   - After Configurator supervision, the Apple TV's serial number appears in the Apple Business
     portal under **Devices** (the Configurator workflow registers it). [CITED: training; needs
     live verification]
   - Alternatively, add the serial number manually in Apple Business portal: **Devices → Add
     Devices → Enter Serial Numbers**. [CITED: training; needs live verification]

4. **Assign to OU and MDM server in Apple Business portal:**
   - In the portal, select the Apple TV by serial number.
   - Assign it to the target OU's device pool.
   - Assign it to the target OU's MDM server.
   - [CITED: training; needs live verification]

5. **Push the MDM enrollment profile:**
   - The MDM server delivers the enrollment profile to the supervised Apple TV.
   - Verify the device appears as **Managed** and **Supervised** in the MDM console.

> **Note:** Apple does not publish a unified guaranteed time for MDM profile delivery to Apple TV
> devices enrolled via Configurator. Profile delivery depends on network connectivity and MDM
> server queue depth. [CITED: training; needs live verification]

---

## OU Assignment

After Configurator enrollment and MDM profile delivery, the Apple TV is a member of its assigned
OU's device pool. The following OU assignment rules apply:

- **One OU per device:** Each Apple TV is assigned to exactly one OU's device pool at a time.
- **OU transfer:** To move an Apple TV to a different OU, update the MDM server assignment in
  the Apple Business portal and push a new enrollment profile. See
  [06-mdm-server-assignment.md](06-mdm-server-assignment.md) for the transfer procedure.
- **Sub-OU nesting (depth ≤ 2):** Apple Business supports flat OU hierarchies and optionally
  one level of sub-OU nesting (depth ≤ 2). Assign the Apple TV to the correct leaf OU.
  For depth > 2 assignment, refer to Phase 63 portal verification results when available.
  See [02-ous-architecture.md](02-ous-architecture.md) §Hierarchy Rules for the depth cap.

**OU ownership for shared physical spaces:** When multiple OUs share a physical location
(e.g., a conference room used by teams from different OUs), see the Conference Room Display
heuristic below (OP-15) to determine which OU the device belongs to.

---

## Content-Token-Based App Deployment

Apple TV apps are deployed using **content tokens** (formerly VPP location tokens). Content tokens
are OU-scoped — the token assigned to the target OU is used to purchase and distribute apps to
devices in that OU's pool.

### Content Token App Deployment Steps

1. **Verify the target OU has an active content token:**
   - In the Apple Business portal, navigate to **Settings → Content Tokens** (or equivalent).
   - Confirm the target OU has an associated content token with remaining app licenses.
   - If the OU lacks a content token, see
     [07-vpp-content-token-consolidation.md](07-vpp-content-token-consolidation.md) for
     per-OU token assignment. [CITED: training; needs live verification]

2. **Purchase app licenses:**
   - In the Apple Business portal, navigate to **Apps and Books**.
   - Search for the tvOS app to deploy.
   - Purchase the required number of licenses, associating the purchase with the target OU's
     content token. [CITED: training; needs live verification]

3. **Assign licenses to devices via MDM:**
   - In the MDM console, assign the purchased app licenses to the Apple TV devices in the OU.
   - Push the app assignment; the MDM server installs the app on the device.
   - Verify successful installation in the MDM console.

> **Note:** Apple does not publish a maximum tvOS app size supported for OTA MDM deployment
> to Apple TV. Very large apps may require reliable high-bandwidth connections. [CITED: training;
> needs live verification]

**Content token scope boundary:** An admin scoped to OU-A cannot use OU-A's content token to
deploy apps to OU-B's Apple TV devices. Cross-OU app deployment requires a top-level Content
Administrator role or purchase of separate licenses under OU-B's token.

---

## Conference Room Display Heuristic (OP-15)

> **Note (OP-15 — Conference Room Display shared-physical-space heuristic):** Apple TV devices
> used in **Conference Room Display** (CRD) mode serve as shared physical infrastructure — any
> user in the building can wirelessly present to them via AirPlay, regardless of OU membership.
> This creates an ambiguity: which OU should own a CRD-mode Apple TV in a shared conference room?
>
> **Heuristic:** Assign the Apple TV to the OU that owns the **primary physical space** — typically
> the business unit or team that books the conference room most frequently, or the facilities team
> if the room is truly shared across all OUs. If no clear primary owner exists, assign to the
> **highest-level OU** in the organization that encompasses all expected users (e.g., the corporate
> or IT OU).
>
> This is an organizational decision heuristic, not a technical constraint. Apple Business does not
> enforce AirPlay access by OU membership — CRD-mode Apple TVs are reachable by any device on
> the same network segment, regardless of OU. OU assignment affects only the admin delegation
> scope (who manages the device, pushes policies, deploys apps), not end-user access to the
> AirPlay target.
>
> **Per-OU CRD partitioning deep-dive:** A deeper treatment of per-OU Conference Room Display
> partitioning — including scenarios with multi-OU building floors, guest network isolation,
> and per-OU AirPlay access policies — is **deferred to v1.7+**. That deep-dive will be logged
> to `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` at Phase 66 and is out of scope for v1.6.
> This heuristic is the Phase 63 deliverable for OP-15; the per-OU deep-dive is the v1.7+
> deliverable.

---

## Wipe and Re-provision

**When to wipe:** Wipe an Apple TV device when transferring it to a different OU, repurposing it
from CRD to single-OU managed use, or recovering from an unresolvable configuration issue.

**Admin-initiated wipe (MDM erase):**
1. In the MDM console, select the Apple TV device.
2. Send an **Erase Device** command.
3. The device wipes its configuration and returns to Setup Assistant.
4. Re-enroll via Configurator (the ADE path is not available for retail Apple TVs after initial
   wipe unless the device was re-registered through Apple's ABM/Apple Business reseller channel).

**Before wiping — pre-wipe checklist:**
- Confirm no active AirPlay sessions are in progress.
- If transferring to a different OU: update the OU assignment and MDM server in Apple Business
  portal BEFORE the wipe so the post-wipe enrollment lands in the correct OU.
  See [06-mdm-server-assignment.md](06-mdm-server-assignment.md).

> **Note:** Post-wipe re-enrollment for retail Apple TVs requires Configurator intervention
> again (the Configurator-only path repeats). ADE re-enrollment is NOT automatic for retail
> devices. [CITED: training; needs live verification]

---

## Cross-References

- OU scoping context: [02-ous-architecture.md](02-ous-architecture.md) — OU hierarchy rules,
  depth ≤ 2 cap, per-OU device pool semantics
- Role and permission model: [01-role-permission-model.md](01-role-permission-model.md) —
  7-subgroup permission catalog; OP-2 Account Holder DO-NOT-DELEGATE; Apps & Books permissions
- Custom role bundle (OU-02): [04-custom-role-authoring.md](04-custom-role-authoring.md) —
  min-viable sub-org admin permission bundle
- Sub-org admin onboarding: [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md) —
  Managed Apple Account creation, role assignment, OU scoping, offboarding (OP-8)
- MDM server assignment (OU-04): [06-mdm-server-assignment.md](06-mdm-server-assignment.md) —
  per-OU MDM server assignment and device transfer procedure
- VPP content-token consolidation (OU-05):
  [07-vpp-content-token-consolidation.md](07-vpp-content-token-consolidation.md) — per-OU
  content-token assignment and consolidation concepts
- Apple Business Governance Glossary:
  [\_glossary-apple-business.md](../../_glossary-apple-business.md) — Apple TV, Conference
  Room Display, content token, OU terminology canon
- Shared iPad lifecycle (OU-07): [09-shared-ipad-lifecycle.md](09-shared-ipad-lifecycle.md) —
  parallel Phase 63 lifecycle doc for Shared iPad devices
- Phase 64 MDM server reassignment runbook (DELEG-05):
  [15-mdm-server-reassign-runbook.md](15-mdm-server-reassign-runbook.md) — operational runbook
  for OU-to-OU device transfer (Phase 64 deliverable; forthcoming)
- Deferred — per-OU CRD deep-dive: v1.7+ scope; tracked in
  `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (logged at Phase 66 per plan)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63 (OU-08): Apple TV lifecycle — Configurator-only retail enrollment, OU assignment, content-token app deployment, OP-15 CRD heuristic; per-OU CRD deep-dive deferred to v1.7+ | -- |
