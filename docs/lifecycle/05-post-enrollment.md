---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: both
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 (Device Preparation) differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Stage 5: Post-Enrollment Verification

## Context

Stage 5 of 5. The final stage of the Autopilot lifecycle. The user has reached the Windows desktop and the deployment is complete from the device's perspective. This stage covers the admin verification process that confirms the deployment succeeded end-to-end and the device is in a healthy, managed state.

**Depends on:** ESP (Stage 4)
**Feeds into:** Ongoing device management (outside lifecycle scope)

> For post-enrollment device management procedures (reset, retire, wipe, re-provisioning, tenant migration), see [Device Operations](../device-operations/00-overview.md).

---

## What the Admin Sees

In the **Intune portal** (endpoint.microsoft.com), the device view shows:

- Enrollment status indicating [MDM](../_glossary.md#mdm) enrollment type
- Azure AD join state (Azure AD joined, or Hybrid Azure AD joined for hybrid deployments)
- Assigned Autopilot profile with assignment status
- Compliance policy evaluation result
- App installation status per assigned application

Locally on the device, PowerShell functions from the AutopilotDiagnostics module provide a direct view of registration state, profile assignment, and enrollment GUID without needing portal access.

---

## What Happens

1. User arrives at the Windows desktop — from the device's perspective, deployment is complete. The [ESP](../_glossary.md#esp) has cleared and all required apps and policies that were tracked during provisioning are installed.

2. Admin verifies deployment through the checklist below. This confirms that both the device-side and the cloud-side state are consistent. Not all verification steps require portal access; PowerShell functions can confirm local state quickly.

3. Device is handed off for productive use. If all checklist items pass, no further provisioning action is needed. Outstanding items become support tickets, not provisioning blockers.

### Verification Checklist

- [ ] Device appears in Intune with "MDM" enrollment type
- [ ] Azure AD join state shows "Azure AD joined" (or "Hybrid Azure AD joined" for hybrid deployments)
- [ ] Assigned Autopilot profile shows as "Assigned" in the Intune device view
- [ ] Compliance policy evaluation = Compliant
- [ ] Required apps show installation state = Installed (Intune > Device > Apps)
- [ ] Device serial number matches the Autopilot registration record
- [ ] No critical error events in the MDM and Provisioning event log channels
- [ ] `Get-AutopilotDeviceStatus` returns `RegistrationState.IsRegistered = $true`

---

## Behind the Scenes

> **L2 Note:** Technical details for deeper investigation.
>
> - **Compliance evaluation timing:** After enrollment, the device must complete a compliance policy evaluation cycle before the portal reflects "Compliant". This typically takes 15–30 minutes. A device that has not yet evaluated shows "Not evaluated" rather than "Non-compliant" — these are different states with different remediation paths.
> - **Graph API device state sync:** The Intune portal reads device state from the Microsoft Graph API. After enrollment, Graph device inventory refreshes on its own schedule, which means the portal view may lag behind actual device state by several minutes. If a device appears missing, query the [Graph API](../reference/endpoints.md) directly before assuming a provisioning failure.
> - **Intune device inventory refresh interval:** Full device inventory sync occurs approximately every 8 hours. App installation status and hardware inventory reported in the portal may not reflect the device's current state until after the next sync cycle completes.
> - **ZTDID verification:** The [ZTDID](../_glossary.md#ztdid) embedded in the device's registry should match the Autopilot registration record in Graph. Mismatches indicate re-imaging without cleanup. `Get-AutopilotRegistrationState` surfaces this value locally.

---

## Success Indicators

- All verification checklist items pass
- Device shows Compliant in Intune compliance view
- All required apps show "Installed" in Intune app status
- Autopilot profile shows "Assigned" — not "Not assigned" or "Error"
- No critical or error-level events in the MDM and Provisioning event log channels

---

## Failure Indicators

- Device shows Non-compliant (distinct from "Not evaluated" — see Watch Out For)
- Required apps show "Failed" or "Not installed" in Intune app status
- Autopilot profile status shows "Not assigned" or "Error" after profile sync window
- Critical events present in `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` or `Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin`
- Serial number mismatch between device and Autopilot registration record

Forward-links: see [Phase 3 error codes](../error-codes/00-index.md), [L1 post-enrollment runbook](../l1-runbooks/00-index.md), [L2 Runbooks](../l2-runbooks/00-index.md)

---

## Typical Timeline

- **Compliance evaluation:** 15–30 minutes after enrollment before the Intune portal reflects evaluation results
- **Full Intune sync (inventory/apps):** Up to 8 hours for the device inventory and app status to fully refresh in the portal
- **Immediate confirmation:** PowerShell functions against the local device provide instant state confirmation without waiting for portal refresh

Rushing the checklist before the compliance evaluation window closes leads to false negatives on the Compliant status.

---

## Watch Out For

- **Compliance policy evaluation delay:** A device that just completed enrollment will show "Not evaluated" for compliance — this is not a failure. The device needs time to complete its first compliance check cycle. Treat "Not evaluated" as a waiting state, not a problem state. If it persists beyond 1 hour, investigate the MDM check-in cycle.

- **App installation state lag in the Intune portal:** The portal's app status view is refreshed on the device's sync schedule, not in real time. A device may have apps fully installed locally while the portal still shows "Pending" or "Not installed". Run `Get-AutopilotDeviceStatus` on the device to get current local state before escalating based on portal data alone.

- **Serial number mismatch after re-imaging:** If a device was re-imaged or reset without removing it from the Autopilot service first, the new enrollment creates a second device record. The serial number in the Autopilot registration will match the hardware, but the ZTDID and enrollment GUID from the old record will differ from the new enrollment. Clean up stale Autopilot records in the Microsoft 365 admin portal to prevent duplicate device confusion.

---

## Tool References

- [`Get-AutopilotDeviceStatus`](../reference/powershell-ref.md#get-autopilotdevicestatus) — captures a comprehensive device state snapshot including registration state, enrolled profile, and compliance-relevant fields in a single output object
- [`Get-AutopilotRegistrationState`](../reference/powershell-ref.md#get-autopilotregistrationstate) — surfaces the [ZTDID](../_glossary.md#ztdid) and tenant verification state from the local registry, useful for confirming the device matches its Autopilot record
- [`Get-AutopilotProfileAssignment`](../reference/powershell-ref.md#get-autopilotprofileassignment) — retrieves the assigned profile name and settings from the local AutopilotSettings registry, confirming profile delivery without portal access

**Further Reading:**

- [Microsoft Learn — Monitor Autopilot deployments](https://learn.microsoft.com/en-us/mem/intune/enrollment/enrollment-autopilot)
- [Microsoft Learn — Check device compliance in Intune](https://learn.microsoft.com/en-us/mem/intune/protect/compliance-policy-monitor)
- [Microsoft Learn — Troubleshoot Windows device enrollment in Intune](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-windows-enrollment-errors)

---

## See Also

- [Device Operations](../device-operations/00-overview.md) — Post-enrollment device management: reset, retire, wipe, re-provisioning, and tenant migration
- [Autopilot Reset Guide](../device-operations/01-autopilot-reset.md) — Return a device to business-ready state without re-imaging
- [Retire, Wipe, and Removal Actions](../device-operations/02-retire-wipe.md) — Choose the right action based on what you want to preserve

---

## Navigation

Previous: [Stage 4: ESP](04-esp.md) | Next: [Lifecycle Overview](00-overview.md)

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Added device-operations See Also section per D-09 |
| 2026-03-14 | Initial version |
