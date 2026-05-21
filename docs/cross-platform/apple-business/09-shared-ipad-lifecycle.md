---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+shared-ipad
---

> **Platform applicability:** Shared iPad is an Apple-side feature for iPadOS devices managed
> through Apple Business. It enables multiple users to share a single iPad by signing in with
> their Managed Apple Account, with per-user data isolation enforced by iPadOS. Shared iPad
> requires supervised enrollment and is OU-scoped within Apple Business. For terminology canon
> (Managed Apple Account, Organizational Unit, Shared iPad), see the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md).
> For OU scoping context, see [02-ous-architecture.md](02-ous-architecture.md).

> **Training-data notice:** Shared iPad portal navigation labels and session configuration steps
> in this document are authored from AI training knowledge of Apple Business Manager / Apple
> Business as of the pre-2026-04-14 rebrand, cross-referenced against `01-role-permission-model.md`
> (Phase 62 SOT) and `02-ous-architecture.md`. All portal-label references are marked
> `[CITED: training; needs live verification]` pending live portal verification.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20). This notice is removed
> once the live scrape is completed and steps are verified verbatim against the Apple portal.

# Shared iPad Lifecycle (OU-07)

This document covers the full lifecycle of Shared iPad devices within Apple Business Organizational
Units (OUs): supervised enrollment, session configuration, user provisioning with Managed Apple
Accounts, sign-in / sign-out operations, and wipe / re-provision. It implements requirement OU-07
of the v1.6 Apple Business Delegated Governance milestone.

**Purpose:** Sub-org admins use this document to manage the Shared iPad lifecycle within their OU
— from initial enrollment through session configuration, user provisioning, day-to-day sign-in
operations, and end-of-life wipe.

**OU scope:** Shared iPad devices are enrolled into a specific OU's device pool. The sub-org admin
holds custom role permissions scoped to that OU (see
[04-custom-role-authoring.md](04-custom-role-authoring.md) for the permission bundle). For
cross-OU Shared iPad pools, a top-level IT Administrator role is required.

---

> **Critical (OP-12): Find My — MANDATORY PRE-DEPLOYMENT DISABLE**
>
> **Find My MUST be disabled on all devices intended for Shared iPad enrollment BEFORE
> enrollment begins. This is a mandatory, non-optional, blocking pre-deployment gate.**
>
> **Why this is blocking:** Find My (activation lock) ties a device to a personal Apple ID.
> If Find My is enabled on a device at enrollment time, the device cannot be reliably wiped,
> re-provisioned, or re-enrolled by an administrator — it becomes locked to the last signed-in
> user's Apple ID even after a factory reset. This creates an irrecoverable device-lock
> condition that requires Apple Support intervention and proof of purchase to resolve.
>
> **For new devices (never activated):**
> - Do NOT activate the device with a personal Apple ID at any point before enrollment.
> - Boot the device directly into Setup Assistant; do not sign in with any Apple ID.
> - Enroll via ADE (Automated Device Enrollment) from the Setup Assistant screen.
>
> **For previously-used devices:**
> 1. Ask the previous user to sign out of iCloud / Apple ID on the device (`Settings → [Name]
>    → Sign Out`). This disables Find My and removes activation lock.
> 2. Verify Find My is OFF: `Settings → [Name] → Find My → Find My iPad` must show "Off."
> 3. Only after Find My is confirmed OFF: proceed with factory reset and ADE enrollment.
>
> **Never assume Find My is disabled.** Always verify before proceeding to enrollment.
> Skipping this step produces locked devices that block fleet turnover.
>
> See also: PITFALLS.md OP-12 — Find My activation lock (HIGH)

---

## Shared iPad Lifecycle Stages

### Stage 1: Enrollment (Supervised, ADE)

Shared iPad requires **supervised enrollment** via Automated Device Enrollment (ADE). Manual
enrollment or non-supervised management does not support the Shared iPad feature.

**Prerequisites:**
- Find My is disabled on the device (see OP-12 callout above — MANDATORY pre-deployment step).
- The device is an iPadOS device supported by Shared iPad (iPadOS 13.4+ required; iPadOS 16+
  recommended for full feature parity). [CITED: training; needs live verification]
- The OU's MDM server is configured in Apple Business (see
  [06-mdm-server-assignment.md](06-mdm-server-assignment.md)).
- The device's serial number is registered in Apple Business and assigned to the target OU.

**Enrollment steps:**

1. In the Apple Business portal, navigate to **Devices** and verify the device serial number
   appears in the target OU's device pool. [CITED: training; needs live verification]
2. Assign the device to the OU's MDM server in Apple Business portal (`Devices → [device] →
   Edit → MDM Server → [target OU MDM server]`). [CITED: training; needs live verification]
3. Boot the device. Setup Assistant launches automatically and contacts Apple's ADE service.
4. The MDM server delivers the enrollment profile during Setup Assistant. The device completes
   supervised enrollment without user interaction (zero-touch path).
5. After enrollment, confirm the device appears as **Supervised** in your MDM console.

> **Note:** Apple does not publish a guaranteed ADE enrollment time SLA. In practice, ADE
> enrollment completes within minutes of the device reaching an Apple ADE endpoint. Network
> delays or DNS configuration issues can extend this. Verify the device can reach required
> Apple ADE endpoints before beginning enrollment. [CITED: training; needs live verification]

### Stage 2: Shared iPad Session Configuration

Shared iPad session behavior is configured through an MDM configuration profile pushed to the
device after enrollment. Key settings that control multi-user behavior:

**Required MDM profile settings for Shared iPad:**

| Setting | Purpose | Recommended value |
|---------|---------|-------------------|
| Shared iPad enabled | Enables multi-user mode | `true` |
| Maximum sessions on device | Number of resident user sessions kept locally | Depends on device storage / user count; Apple recommends balancing storage with session count [CITED: training; needs live verification] |
| Session timeout (idle) | Auto-signs out inactive sessions | Org policy dependent; e.g., 15–30 minutes for shared kiosk |
| Managed Apple Account domain | Domain restriction for sign-in | Set to org's Managed Apple Account domain |
| Guest account enabled | Allows temporary unauthenticated sessions | Disable for OU-managed pools |
| Passcode policy | Complexity for sign-in | Align with org security baseline |

> **Note:** Apple does not publish a universal maximum number of resident sessions per iPad.
> The practical limit depends on device storage capacity and per-user data quota settings.
> Apple's MDM protocol documentation covers the `SharedDeviceConfigurationKey` payload —
> verify current key names against Apple's MDM Protocol Reference before deployment.
> [CITED: training; needs live verification]

Push the Shared iPad configuration profile via your MDM console. Profile delivery requires
the device to be online and connected to the MDM server. Verify profile delivery status in the
MDM console before proceeding.

### Stage 3: User Provisioning with Managed Apple Accounts

Shared iPad users sign in with **Managed Apple Accounts** (formerly Managed Apple IDs). The
sub-org admin provisions these accounts before first use.

**Provisioning paths:**

1. **Manual (Apple Business portal entry)**
   - Navigate to **People** in the Apple Business portal.
   - Create a new Managed Apple Account for each user.
   - Set the username in the org's verified domain format (e.g., `firstname.lastname@school.org`).
   - Assign the account to the target OU scope.
   - [CITED: training; needs live verification]

2. **SCIM (directory-synced provisioning)**
   - SCIM provisioning automates account creation from an identity source configured by the
     tenant-level admin (Account Holder / IT Administrator level).
   - Sub-org admins do NOT configure SCIM — this is a tenant-level operation.
   - Once SCIM is active, accounts are provisioned automatically based on directory sync rules.
   - See [08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md)
     for the full provisioning decision matrix.

3. **OIDC + JIT (federated sign-in with just-in-time account creation)**
   - With federated authentication configured at the tenant level, Managed Apple Accounts are
     created at first sign-in.
   - Sub-org admins do NOT configure federation — this is an Account Holder-level operation.
   - See [08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md)
     for the full decision matrix.

**OU scope assignment:** When provisioning accounts manually, assign each Managed Apple Account
to the same OU as the Shared iPad device pool. Cross-OU account-to-device mismatches prevent
sign-in. [CITED: training; needs live verification]

**Storage quota per user:** Apple's Shared iPad model supports configuring a per-user data
quota to bound the storage each resident session occupies on the device.
[CITED: training; needs live verification — Apple does not publish a maximum quota value per
device model; calibrate based on device storage and expected session count.]

### Stage 4: Sign-in / Sign-out

**User sign-in:**
1. On the Shared iPad lock screen, the user taps their account name (if listed) or enters
   their Managed Apple Account username.
2. The user enters their Managed Apple Account password.
3. iPadOS loads the user's resident session (or downloads the session from iCloud if not
   resident) and presents the user's home screen.

**Session residency:** Shared iPad caches user sessions locally up to the MDM-configured
maximum. When the device is full, the least-recently-used session is evicted. The next
sign-in for an evicted user re-downloads session data from iCloud.

> **Note:** Apple does not publish a guaranteed session eviction time or re-download SLA.
> Network bandwidth and session size (apps, data) affect re-download duration. For time-critical
> environments (e.g., classrooms with fixed session start times), ensure adequate bandwidth.
> [CITED: training; needs live verification]

**User sign-out:**
- Standard: User taps `Settings → [Name] → Sign Out` from within their session.
- Admin-forced: Push a `Log Out User` MDM command from the MDM console. This signs out the
  currently-active user without requiring user interaction. Useful for end-of-session cleanup
  in kiosk or classroom deployments.

**Temporary session / Guest account:** If the MDM profile permits guest sessions, the device
offers a temporary session that does not require a Managed Apple Account. All temporary session
data is deleted on sign-out. Disable guest sessions for OU-managed pools to prevent
unmanaged use.

### Stage 5: Wipe / Re-provision

**When to wipe:** Wipe a Shared iPad device when transferring it to a different OU, decommissioning
it, or recovering from an unresolvable configuration issue.

**Admin-initiated wipe (MDM erase):**
1. In the MDM console, select the device.
2. Send an **Erase Device** command.
3. The device wipes all user sessions and returns to Setup Assistant.
4. After wipe, the device re-enrolls via ADE automatically (assuming ADE enrollment is still
   configured in Apple Business for the device's serial number).

**Before wiping — pre-wipe checklist:**
- Confirm all active users have signed out or been signed out (MDM Log Out User command).
- Confirm no in-progress MDM commands are queued (clear the queue in the MDM console).
- If transferring to a different OU: update the device's MDM server assignment in Apple Business
  portal BEFORE the wipe so the post-wipe ADE enrollment lands in the correct OU.
  See [06-mdm-server-assignment.md](06-mdm-server-assignment.md) for the MDM transfer procedure.

**Re-provision after wipe:**
After an MDM erase, the device boots to Setup Assistant and re-enrolls via ADE automatically.
The new OU's MDM profile (including Shared iPad session configuration) is delivered during
enrollment. No manual re-provisioning is required if ADE is configured correctly.

> **Note:** Apple does not publish a guaranteed post-wipe ADE re-enrollment time. Network
> conditions and ADE service availability affect this. Treat post-wipe re-enrollment as a
> multi-minute operation. [CITED: training; needs live verification]

**Decommission (permanent removal):**
1. Send an **Erase Device** MDM command.
2. In the Apple Business portal, release the device from the OU's device pool.
3. Remove the device's serial number from ADE enrollment if it is being retired (not redeployed).

## Cross-References

- OU scoping context: [02-ous-architecture.md](02-ous-architecture.md) — OU hierarchy rules,
  depth ≤ 2 cap, per-OU device pool semantics
- Role and permission model: [01-role-permission-model.md](01-role-permission-model.md) —
  7-subgroup permission catalog; OP-2 Account Holder DO-NOT-DELEGATE; OP-3 Edit-without-View
  dependency table
- Custom role bundle (OU-02): [04-custom-role-authoring.md](04-custom-role-authoring.md) —
  min-viable sub-org admin permission bundle (4–6 permissions)
- Sub-org admin onboarding: [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md) —
  Managed Apple Account creation, role assignment, OU scoping, offboarding (OP-8)
- MDM server assignment (OU-04): [06-mdm-server-assignment.md](06-mdm-server-assignment.md) —
  per-OU MDM server assignment and device transfer procedure
- Managed Apple Account provisioning (OU-06):
  [08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md) —
  manual / SCIM / OIDC+JIT decision matrix
- Apple Business Governance Glossary:
  [\_glossary-apple-business.md](../../_glossary-apple-business.md) — Shared iPad, Managed
  Apple Account, OU, content token terminology canon
- Apple TV lifecycle (OU-08): [10-apple-tv-lifecycle.md](10-apple-tv-lifecycle.md) — parallel
  Phase 63 lifecycle doc for Apple TV devices
- Phase 64 Wave B dependency: This document and its sibling `10-apple-tv-lifecycle.md` are
  Wave B anchor docs. Phase 64 runbook authoring begins in parallel once `09-` and `10-` land
  alongside `05-...#which-admin-owns-this-pool`.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63 (OU-07): Shared iPad lifecycle — 5 stages + mandatory OP-12 Find My disable callout + Managed Apple Account provisioning paths | -- |
