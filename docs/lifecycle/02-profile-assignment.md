---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: both
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 (Device Preparation) differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Stage 2: Autopilot Profile Assignment

## Context

Stage 2 of 5. The Autopilot deployment profile defines how [OOBE](../_glossary.md#oobe) behaves: which screens are skipped, what deployment mode runs, whether the user sees a company logo, and whether the device joins Azure AD or [hybrid join](../_glossary.md#hybrid-join).

A device with a registered [hardware hash](../_glossary.md#hardware-hash) but no assigned profile will reach OOBE without any Autopilot customization — it will complete standard Windows setup instead.

**Depends on:** Hardware Hash Import (Stage 1) — device must be registered in the Autopilot service.

**Feeds into:** Stage 3 — OOBE and Deployment Mode Selection.

---

## What the Admin Sees

You create and manage Autopilot deployment profiles in the Intune portal at **Devices > Enrollment > Windows Autopilot > Deployment Profiles**. The profile creation wizard walks through:

- **Name and description**
- **Deployment mode** (User-Driven or Self-Deploying)
- **Join type** (Azure AD joined or Hybrid Azure AD joined)
- **Out-of-box experience settings** — skip or show specific OOBE screens (privacy settings, license agreement, keyboard layout, account setup, etc.)
- **Assignments** — Azure AD groups that receive this profile

Once created, profiles appear in the list with columns for Name, Deployment Mode, Join Type, and assigned group count. The **Assignments** tab on each profile shows which Azure AD groups are targeted and whether assignment is currently active.

---

## What Happens

1. **Admin creates a deployment profile in Intune.** You configure deployment mode, join type, OOBE screen behavior, and any enrollment status page settings.

2. **Profile is assigned to an Azure AD group.** You assign the profile to one or more static or dynamic Azure AD groups containing the target device objects.

3. **Device's Azure AD object joins the group.** Either the device was added manually to a static group, or the dynamic group query evaluates the device attributes and includes it automatically.

4. **Device queries `ztd.dds.microsoft.com` and `cs.dds.microsoft.com` at OOBE.** When the device powers on and reaches OOBE, it connects to the Autopilot service to look up whether a profile is assigned to it, using its hardware hash.

5. **Profile downloads to registry.** If a matching profile is found, the profile settings are written to `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings`. OOBE then branches to the deployment mode defined in the profile (Stage 3).

### Dynamic vs Static Group Assignment Timing

| Group Type | Setup Effort | Assignment Timing | Typical Delay | Best For |
|---|---|---|---|---|
| Static group | Manual — admin adds each device | Immediate after admin adds device | Near-instant | Small batches, controlled rollouts |
| Dynamic group | Rule-based — devices added automatically | After AAD dynamic group evaluation cycle | 5–15 min; up to 24h for complex rules in large tenants | At-scale deployments, OEM-registered devices |

> **Note:** Dynamic group delays are the most common cause of "device shows Autopilot registered but receives no profile at OOBE." If a device reaches OOBE before the dynamic group has evaluated, no profile is delivered.

---

## Behind the Scenes

> **L2 Note:**
>
> - Profile assignment uses Microsoft Graph API — Intune writes the profile association to Graph, which propagates to the Autopilot service.
> - At OOBE, the device contacts `ztd.dds.microsoft.com` (ZTD profile lookup) and `cs.dds.microsoft.com` (configuration data) to retrieve its assigned profile. Both endpoints must be reachable. See [endpoints.md](../reference/endpoints.md) for the full endpoint list and criticality ratings.
> - The `AutopilotSettings` registry key (`HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings`) is populated when the device downloads the profile. If the device cannot reach the ZTD service, this key will not be written and OOBE proceeds without Autopilot customization. See [registry-paths.md](../reference/registry-paths.md).
> - For hybrid join deployments, the Offline Domain Join (ODJ) Connector must be installed on an on-premises server and must be able to communicate with Active Directory domain controllers. Profile assignment itself is cloud-only, but execution at OOBE depends on DC reachability for the ODJ blob. Full hybrid join detail is covered in Phase 6.

---

## Success Indicators

- Profile shows "Assigned" status in Intune (Devices > Enrollment > Windows Autopilot > Deployment Profiles > [profile name] > Assignments)
- Device receives the correct OOBE customization at power-on (company branding, skipped screens)
- `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` populated after OOBE
- `Get-AutopilotProfileAssignment` returns non-null on the device after OOBE

---

## Failure Indicators

- **No profile at OOBE.** Device reaches OOBE and presents standard Windows setup without Autopilot customization. Causes: device not in assigned group, dynamic group not yet evaluated, profile not assigned to correct group, ZTD service unreachable.
- **Wrong profile received.** Device receives a profile intended for a different deployment mode or join type. Causes: overlapping group assignments, "All devices" profile conflicting with targeted profiles.
- **Dynamic group not evaluating.** Group membership rules require Azure AD Premium P1+; verify licensing if dynamic groups are not populating.
- **Hybrid join OOBE failure.** ODJ Connector offline or DC unreachable during OOBE. Note: the connector must be running before the device reaches OOBE.

Error code reference: (available after Phase 3)
Remediation runbooks: (available after Phase 5)
Hybrid join deep-dive: [Hybrid join deep-dive](../l2-runbooks/04-hybrid-join.md)

---

## Typical Timeline

- **Static group assignment:** Profile is available for profile lookup within minutes of the admin adding the device to the group.
- **Dynamic group evaluation:** 5–15 minutes for simple rules. Complex rules with many attribute conditions in large tenants (10,000+ devices) can take up to 24 hours for initial evaluation. Plan imaging schedules accordingly.
- **Profile download at OOBE:** Seconds — the ZTD service lookup occurs early in OOBE, before the user sees any input screen.

---

## Watch Out For

- **Dynamic group delay causing missed profile delivery.** The most reliable mitigation is to use a static group for controlled deployments, or to delay OOBE initiation until you have confirmed dynamic group membership. You can check group membership in Azure AD before powering on the device.
- **"All devices" profile conflicts with targeted profiles.** If you have a broad "All Autopilot Devices" profile assigned to the built-in group and a more specific profile targeted to a subset group, profile precedence rules apply. Intune delivers the profile from the most specific assignment; however, ensure you understand precedence order before creating overlapping assignments to avoid unintended profile delivery.
- **Hybrid join requires ODJ Connector and DC connectivity.** Even if the profile is correctly assigned, hybrid join deployments will fail at OOBE if the ODJ Connector is not running or if the device cannot reach a domain controller. This is an infrastructure dependency, not a profile configuration issue.

---

## Tool References

- [`Get-AutopilotProfileAssignment`](../reference/powershell-ref.md#get-autopilotprofileassignment) — Gets assigned profile details from the `AutopilotSettings` registry key. Returns `$null` if no profile has been downloaded to the device.
- [`Get-AutopilotRegistrationState`](../reference/powershell-ref.md#get-autopilotregistrationstate) — Checks registration state and tenant association. Use to confirm the device is registered and associated with the correct tenant before OOBE.

**Further Reading:**

- [Microsoft Learn: Create an Autopilot deployment profile](https://learn.microsoft.com/en-us/autopilot/profiles)
- [Microsoft Learn: Windows Autopilot deployment profiles](https://learn.microsoft.com/en-us/autopilot/deployment-profiles)

> **APv2 Note:** Windows Autopilot Device Preparation uses Device Preparation policies, not Autopilot deployment profiles. There is no hardware hash matching step — assignment is based on Azure AD group membership evaluated at OOBE sign-in. The profile lookup via `ztd.dds.microsoft.com` does not apply. See [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md) for the full comparison.

---

## Navigation

Previous: [Stage 1: Hardware Hash Import](01-hardware-hash.md) | Next: [Stage 3: OOBE](03-oobe.md)

---

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial version |
