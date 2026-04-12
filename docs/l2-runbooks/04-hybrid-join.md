---
last_verified: 2026-03-21
review_by: 2026-06-19
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Hybrid Join Failure Investigation

## Context

[Hybrid join](../_glossary.md#hybrid-join) failures occur when domain-joined devices fail to complete the hybrid identity registration flow during [OOBE](../_glossary.md#oobe) or [ESP](../_glossary.md#esp). The ODJ (Offline Domain Join) Connector bridges the cloud-managed Autopilot provisioning flow with on-premises Active Directory — failures can originate in the connector itself, in domain controller reachability, or in Active Directory permissions.

Common presentations: error 0x80070774 on the OOBE/ESP screen, event IDs 807, 809, 815, 908, 171, or 172 in the event log, or a device that completes ESP but is never joined to the domain.

Note: Hybrid join is only supported in user-driven mode. Pre-provisioning and self-deploying mode do not support hybrid Entra join.

## Triage

**From L1 escalation (TRE3, TRE4, TRE5, or TRE6 from [Initial Triage](../decision-trees/00-initial-triage.md))?**
L1 collected: serial, error code (if visible), deployment mode (user-driven), domain name, timestamp, screenshot.
Skip to Step 2.

**From device registration L1 runbook escalation?**
L1 collected: serial, event ID, error details, timestamp.
Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Investigation

### Step 1: Collect diagnostic package

Follow the [Log Collection Guide](01-log-collection.md) to gather the MDM diagnostic package and event logs before proceeding. Logs must be collected before any remediation steps alter connector or device state.

### Step 2: Verify ODJ Connector version and status

The Intune Connector for Active Directory (ODJ Connector) minimum required version is **6.2501.2000.5** (released January 2025). Connectors older than this version cause enrollment failures independent of configuration.

```powershell
# Check connector version
# Note: this registry path is LOW confidence — verify it exists before relying on the value
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Intune Connector for AD" -ErrorAction SilentlyContinue |
    Select-Object DisplayVersion, InstallDate
```

> **Version verification note:** If this registry path does not exist on the connector server, use the Event Viewer log path instead — the presence of the current log path (`Applications and Services Logs > Microsoft > Intune > ODJConnectorService`) itself confirms the connector version is 6.2501.2000.5 or later, since the log location changed with that version.

**If connector version is below 6.2501.2000.5:** Update the connector before investigating further. Older versions produce failures that appear as configuration issues but are actually version defects. Download the current connector from the Intune admin center > Tenant administration > Connectors and tokens > On-premises AD connector.

### Step 3: Check ODJ Connector event log

**CRITICAL: Use the current log path.** The log location changed with connector version 6.2501.2000.5.

```powershell
# Current path (connector v6.2501.2000.5+):
# Event Viewer: Applications and Services Logs > Microsoft > Intune > ODJConnectorService
Get-WinEvent -LogName "Microsoft-Intune-ODJConnectorService/Operational" -MaxEvents 50 -ErrorAction SilentlyContinue |
    Format-Table TimeCreated, Id, Message -AutoSize
```

> **Do not use** the legacy path `Applications and Services Logs > ODJ Connector Service` — it no longer receives log entries on connectors v6.2501.2000.5 and later. Querying the legacy path will return no results and mislead the investigation.

Look for event IDs listed in [Hybrid Join Error Codes](../error-codes/05-hybrid-join.md): 807, 809, 815, 908, 171, 172. Do not reproduce the event ID mapping table here — the error codes file is the source of truth. Filter to events within 30 minutes of the reported failure timestamp.

### Step 4: Check domain controller reachability

Run these commands from the ODJ Connector server (not from the device being provisioned):

```powershell
# Verify the connector can reach its domain controller
nltest /dsgetdc:contoso.com    # replace with actual domain name

# Verify the computer secure channel is healthy
Test-ComputerSecureChannel -Verbose
```

If domain controller lookup fails or the secure channel is broken, this is a network/infrastructure issue — see Escalation Ceiling.

### Step 5: Check OU permissions for connector service account

The ODJ Connector service account must have **Create Computer Objects** and **Delete Computer Objects** permissions on the target OU specified in the Intune domain join profile. Insufficient OU permissions are the third distinct cause of 0x80070774 (Scenario C).

Verify in Active Directory Users and Computers:
1. Right-click the target OU > Properties > Security tab
2. Confirm the connector service account (or computer account) has Create and Delete Computer Objects delegated
3. Check that the scope applies to "This object and all descendant objects" for nested OU structures

## Resolution

### Scenario A: 0x80070774 — "Assign user" feature active in hybrid profile

The Autopilot deployment profile has a user assignment configured. The "Assign user" feature is designed for cloud-native join only and causes 0x80070774 in hybrid join scenarios by interfering with the domain lookup step.

**Fix:**
1. In the Intune admin center, navigate to Devices > Windows > Enrollment > Windows Autopilot > Deployment profiles
2. Open the affected hybrid profile
3. Remove any value in the "Assign user" field — it must be empty for hybrid join
4. Save the profile and allow up to 15 minutes for the change to sync before retrying provisioning

This is a profile configuration fix, not an infrastructure issue. No connector or AD changes are needed.

### Scenario B: 0x80070774 — ODJ Connector installed in wrong domain

The ODJ Connector is joined to a domain that does not match the domain specified in the Intune domain join configuration profile. The connector can only create computer objects in the domain it is joined to.

**Fix:**
1. Confirm the domain name in the Intune domain join profile (Devices > Windows > Configuration profiles > domain join profile > Configuration settings)
2. On the connector server, run `(Get-WmiObject Win32_ComputerSystem).Domain` to confirm which domain it is joined to
3. If they do not match: uninstall the connector from the current server and reinstall it on a server in the correct domain
4. Verify the reinstalled connector appears as active in Intune admin center > Tenant administration > Connectors and tokens > On-premises AD connector

### Scenario C: 0x80070774 — Connector service account lacks OU permissions

The ODJ Connector service account does not have the permissions needed to create a computer object in the target OU. This is confirmed when Scenarios A and B are ruled out and the connector log shows an LDAP write failure or access denied event.

**Fix:**
1. In Active Directory, identify the service account the ODJ Connector uses (visible in the connector's Windows service properties)
2. In Active Directory Users and Computers, right-click the target OU > Delegate Control
3. Add the connector service account and grant: Create Computer Objects, Delete Computer Objects
4. Apply the delegation to "This object and all descendant objects"
5. Retry provisioning

### Scenario D: ODJ Connector version outdated

Connector version is below 6.2501.2000.5 (identified in Step 2).

**Fix:** Download and install the current connector version from Intune admin center > Tenant administration > Connectors and tokens > On-premises AD connector. After installation, verify the new version appears in the Intune admin center and the current log path (`Applications and Services Logs > Microsoft > Intune > ODJConnectorService`) is populated before retrying provisioning.

### Scenario E: Domain controller unreachable

Step 4 confirmed the connector server cannot reach the domain controller, or `Test-ComputerSecureChannel` reports a broken channel.

**Action:** This is a network or infrastructure issue — it is not resolvable by Desktop Engineering. Escalate per Escalation Ceiling below. Collect the `nltest` output and `Test-ComputerSecureChannel` output before escalating.

## Escalation Ceiling

Escalate when domain controller or AD Connect issues are confirmed. These are infrastructure team responsibilities, not desktop engineering. Desktop Engineering (L2) owns: connector version, connector configuration, profile settings, and OU permissions. Infrastructure team owns: domain controller health, replication, DNS, network connectivity between connector and DC, and AD Connect/Entra Connect sync.

**Escalate when:**
- Connector can reach the DC but join fails due to AD replication lag
- AD Connect (Entra Connect) sync issues prevent the hybrid device object from appearing in Entra ID
- ADFS federation problems affect the hybrid join flow
- Network team must confirm firewall rules between the connector server and DC (ports 135, 139, 389, 445, 636, 3268, 49152–65535 TCP)

**Collect before escalating:** serial number, error code, event IDs from ODJ Connector log (Step 3), `nltest` output (Step 4), `Test-ComputerSecureChannel` output, connector version, target domain name, target OU distinguished name, timestamp.

## Tool References

- [Get-AutopilotDeviceStatus](../reference/powershell-ref.md#get-autopilotdevicestatus) — device state snapshot including registration state
- [Reset-AutopilotRegistration](../reference/powershell-ref.md#reset-autopilotregistration) — clears local Autopilot registration state if re-registration is needed after connector fix
- [Registry Paths](../reference/registry-paths.md) — Autopilot registration state paths
- [Hybrid Join Error Codes](../error-codes/05-hybrid-join.md) — event ID and error code lookup including all three 0x80070774 causes and ODJ Connector version notes
- [Network Endpoints](../reference/endpoints.md) — if connectivity verification between connector and Microsoft cloud is needed

---

Prev: [03-tpm-attestation.md](03-tpm-attestation.md) | Next: [05-policy-conflict.md](05-policy-conflict.md)

## Version History

| Date | Change |
|------|--------|
| 2026-03-21 | Initial creation — ODJ Connector version, current log path, three 0x80070774 scenarios |
