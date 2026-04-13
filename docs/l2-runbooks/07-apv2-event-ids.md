---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L2
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2) BootstrapperAgent event IDs. These are NOT the same as APv1 event IDs from ModernDeployment-Diagnostics-Provider/Autopilot. For APv1 event IDs (100-172, 807-908), see the [APv1 troubleshooting FAQ](https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq).

# APv2 BootstrapperAgent Event ID Reference

## Triage

**From L1 escalation ([APE3](../decision-trees/04-apv2-triage.md))?**
L1 collected: full deployment report with phase breakdown, device serial number, network information, timestamp of failure. Skip to the event ID lookup tables below.

**Starting fresh?** Collect logs first per [APv2 Log Collection Guide](06-apv2-log-collection.md), then return here.

## Context

The BootstrapperAgent is a component of the Intune Management Extension (IME) that orchestrates APv2 provisioning. The event log captures provisioning state transitions, app installation requests, script execution attempts, timeout events, and enrollment failures.

These event IDs are from the BootstrapperAgent log (APv2). They are different from the APv1 event IDs in ModernDeployment-Diagnostics-Provider/Autopilot (event IDs 100-172 and 807-908). Do not cross-reference APv1 event ID documentation when investigating APv2 BootstrapperAgent events.

---

## Event ID Reference

> **Source Attribution (MEDIUM Confidence)**
> The event IDs in this guide are documented from community research by [oofhours.com](https://oofhours.com) and [Call4Cloud](https://call4cloud.nl). No official Microsoft BootstrapperAgent event ID reference exists as of 2026-04-12. Treat all event ID interpretations as community-validated, not Microsoft-confirmed. If Microsoft publishes official guidance, this document will be updated.

### Key Actionable Event IDs

These event IDs indicate specific failures or state transitions that have clear investigation paths.

| Event ID | Description | Investigation Steps | Source |
|----------|-------------|---------------------|--------|
| 1001 | Deployment started | Informational -- use as timeline anchor. Record timestamp; compare against deployment report enrollment date. | oofhours.com |
| 1002 | Deployment completed successfully | Confirms provisioning finished. If deployment report still shows Failed, investigate post-completion reporting lag. | oofhours.com |
| 2001 | Entra join initiated | Marks start of Step 3 in deployment flow. If no subsequent join success event, check Entra device settings and user join permissions. | Call4Cloud |
| 2002 | Entra join failed | **Actionable.** Check Entra admin center > Devices > Device settings -- verify user has join permission. Check ETG group ownership (Intune Provisioning Client must be owner). Cross-reference deployment report Phase column. See [Deployment Report -- Entra Join Failed](08-apv2-deployment-report.md#entra-join-failed-phase-policy-installation). | Call4Cloud |
| 3001 | Intune enrollment initiated | Marks start of enrollment within Step 3. If no subsequent success event, check MDM auto-enrollment scope and user licensing. | oofhours.com |
| 3002 | Intune enrollment failed | **Actionable.** Check MDM scope in Entra admin center > Mobility > Microsoft Intune. Verify Intune-capable license is assigned to user. Check enrollment restrictions. See [Deployment Report -- Enrollment Failed](08-apv2-deployment-report.md#enrollment-failed-phase-policy-installation). | oofhours.com |
| 4001 | IME installation started | Marks Step 4 of deployment flow. If followed by a failure event, IME download or install encountered an issue. | Call4Cloud |
| 4002 | IME installation failed | **Actionable.** Network connectivity issue or service availability problem. Verify device can reach `https://login.microsoftonline.com` and `https://graph.microsoft.com`. Check IntuneManagementExtension.log if partially installed. | Call4Cloud |
| 5001 | App installation requested | Logs each app targeted for installation. Note app name/ID for cross-referencing with deployment report Apps tab. | oofhours.com |
| 5002 | App installation failed | **Actionable.** Check AppWorkload.log for the specific app name -- look for exit codes, error messages, detection rule failures. Verify install context is System (not User). See [APv2 Log Collection](06-apv2-log-collection.md) Step 3. | oofhours.com |
| 6001 | Script execution started | Logs each script targeted for execution. Note script name for cross-referencing with deployment report Scripts tab. | Call4Cloud |
| 6002 | Script execution failed | **Actionable.** Check AgentExecutor.log for script name, exit code, and error output. Verify script runs in SYSTEM context. See [APv2 Log Collection](06-apv2-log-collection.md) Step 3. | Call4Cloud |
| 9001 | Deployment timeout triggered | **Actionable.** Deployment exceeded configured timeout. Check timeout value in Device Preparation policy settings. Count total apps + scripts assigned. Review which items were still In progress at timeout. See [Deployment Report -- Timeout](08-apv2-deployment-report.md#deployment-timeout). | oofhours.com |
| 9999 | Provisioning state error (generic) | **Actionable.** Catch-all error. Collect full event XML (right-click event > Copy > Copy Details as XML). Include in escalation package. Check deployment report for phase and status details. | Call4Cloud |

### All Known Event IDs

Compact reference for informational, rare, or low-actionability event IDs.

| Event ID | Description | Source |
|----------|-------------|--------|
| 1001 | Deployment started -- provisioning flow initiated | [oofhours.com](https://oofhours.com) |
| 1002 | Deployment completed successfully | [oofhours.com](https://oofhours.com) |
| 1003 | Deployment progress update -- percentage milestone | [Call4Cloud](https://call4cloud.nl) |
| 1010 | Configuration applied -- provisioning configuration received | [oofhours.com](https://oofhours.com) |
| 2001 | Entra join initiated | [Call4Cloud](https://call4cloud.nl) |
| 2002 | Entra join failed | [Call4Cloud](https://call4cloud.nl) |
| 2003 | Entra join completed successfully | [Call4Cloud](https://call4cloud.nl) |
| 3001 | Intune enrollment initiated | [oofhours.com](https://oofhours.com) |
| 3002 | Intune enrollment failed | [oofhours.com](https://oofhours.com) |
| 3003 | Intune enrollment completed successfully | [oofhours.com](https://oofhours.com) |
| 3010 | MDM sync initiated | [oofhours.com](https://oofhours.com) |
| 3011 | MDM sync completed | [oofhours.com](https://oofhours.com) |
| 4001 | IME installation started | [Call4Cloud](https://call4cloud.nl) |
| 4002 | IME installation failed | [Call4Cloud](https://call4cloud.nl) |
| 4003 | IME installation completed successfully | [Call4Cloud](https://call4cloud.nl) |
| 5001 | App installation requested | [oofhours.com](https://oofhours.com) |
| 5002 | App installation failed | [oofhours.com](https://oofhours.com) |
| 5003 | App installation completed successfully | [oofhours.com](https://oofhours.com) |
| 5010 | App detection rule evaluated | [Call4Cloud](https://call4cloud.nl) |
| 6001 | Script execution started | [Call4Cloud](https://call4cloud.nl) |
| 6002 | Script execution failed | [Call4Cloud](https://call4cloud.nl) |
| 6003 | Script execution completed successfully | [Call4Cloud](https://call4cloud.nl) |
| 7001 | Standard user enforcement applied | [oofhours.com](https://oofhours.com) |
| 7002 | Policy check completed | [oofhours.com](https://oofhours.com) |
| 8001 | Step transition -- moving to next deployment phase | [Call4Cloud](https://call4cloud.nl) |
| 9001 | Deployment timeout triggered | [oofhours.com](https://oofhours.com) |
| 9999 | Provisioning state error (generic) | [Call4Cloud](https://call4cloud.nl) |

> **Note:** Event IDs not listed here may appear in the BootstrapperAgent log. Unknown event IDs should be noted with full event XML and included in any escalation to Microsoft Premier Support. To capture full event XML: right-click the event in Event Viewer > Copy > Copy Details as XML.

---

## Escalation Ceiling

If investigation using the event IDs above does not identify a resolvable root cause, escalate to Microsoft Premier Support with:

- BootstrapperAgent `.evtx` export
- Full event XML for unrecognized or undocumented event IDs
- IME logs (ime-main, appworkload, agentexecutor)
- Deployment report screenshot
- Device serial number
- Signing-in user UPN

No further L2 resolution available.

---

## See Also

- [APv2 Log Collection Guide](06-apv2-log-collection.md) -- prerequisite log collection for all APv2 L2 investigations
- [APv2 Deployment Report Guide](08-apv2-deployment-report.md) -- deployment report interpretation with status tables and investigation paths
- [APv1 vs APv2](../apv1-vs-apv2.md) -- framework comparison and selection guidance
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md) -- symptom-based failure scenarios with root cause analysis

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-12 | Initial version -- tiered BootstrapperAgent event ID reference with MEDIUM confidence attribution |
