# Feature Research

**Domain:** IT Operations Documentation — Windows Autopilot Troubleshooting Guides
**Researched:** 2026-03-10
**Confidence:** HIGH (primary sources: Microsoft Learn official documentation, verified against known issues page updated 2026-02-10)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features IT teams assume will exist in any credible Autopilot documentation suite. Missing these means L1/L2 cannot do their jobs.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| End-to-end lifecycle overview | Teams need a shared mental model before any troubleshooting can work | LOW | Hardware hash import → profile assignment → OOBE → ESP → working desktop. No team can troubleshoot without knowing the happy path. |
| Error code lookup table | L1's first action when a deployment fails is to Google the error code. This replaces Google with internal reference. | MEDIUM | Must cover MDM enrollment errors (0x8018xxxx), ESP errors, TPM attestation codes, self-deployment failures, pre-provisioning codes. See error inventory below. |
| Pre-provisioning (white glove / technician flow) runbook | Pre-provisioning is the highest-friction scenario. Technicians need exact steps and what to do when each step fails. | HIGH | Covers technician flow OOBE, TPM attestation, hardware-specific quirks (ST Micro, Nuvoton, Infineon SLB9672, AMD fTPM, Intel Tiger Lake fTPM). |
| User-driven deployment runbook | The most common deployment mode. L1 must handle calls from users mid-OOBE. | MEDIUM | Covers OOBE flow, sign-in failures, tenant mismatch, license errors, ESP during user phase. |
| ESP troubleshooting guide | ESP failures are the most common escalation category. L1 receives these calls; L2 digs into registry/logs. | HIGH | App install conflicts (LOB vs Win32/TrustedInstaller), timeout causes, registry inspection paths, log collection commands. |
| Hybrid Azure AD join troubleshooting guide | Hybrid join has unique failure modes (ODJ connector, domain mismatch, replication delays) that cannot be resolved without dedicated guidance. | HIGH | Intune Connector for AD requirements, ODJ blob flow, 0x80070774 domain mismatch, connector version requirements (6.2501.2000.5+). |
| Log collection reference | L2 must collect logs before any meaningful investigation. Without a standardized collection procedure, every escalation wastes time on "did you get the logs?" | LOW | mdmdiagnosticstool.exe commands for each scenario, Event Viewer paths, registry paths. |
| Required network endpoints reference | Network connectivity failures cause ghost symptoms. L1 needs a checklist, L2 needs exact URLs and test commands. | LOW | ztd.dds.microsoft.com, cs.dds.microsoft.com, login.microsoftonline.com, graph.microsoft.com, enrollment.manage.microsoft.com. |
| L1 decision trees | L1 staff follow scripts. Without a decision tree, they cannot triage an Autopilot failure call — they escalate everything. | MEDIUM | One tree per major scenario (pre-provisioning, user-driven, hybrid join). Binary yes/no branching. |
| L2 technical deep-dive guides | L2 does investigation, not scripts. They need registry paths, event log correlation, PowerShell commands, and log interpretation. | HIGH | Registry paths at HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot, event IDs 100/101/103/109/111/153/160/161/163/164/171/172/807/809/815/908, mdmdiagnosticstool.exe usage. |

---

### Differentiators (Competitive Advantage)

Features that make this suite better than copying Microsoft Learn pages into a SharePoint. These are what make the documentation genuinely useful rather than just present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Tiered content separation (L1 vs L2 sections) | Most documentation is written for one audience. L1 staff skip to conclusions; L2 staff need depth. Explicitly separating tiers means each team gets what they need without wading through the other's content. | LOW | Structural decision at doc authoring time. L1 sections: symptom → action → escalation criteria. L2 sections: root cause → investigation path → resolution options. |
| Scenario-based runbooks (not feature-based) | Microsoft docs are organized by feature (TPM, ESP, hybrid). Users arrive with symptoms, not feature names. Scenario organization matches how teams actually work. | MEDIUM | Example scenarios: "Device shows 'Something went wrong' at white glove", "ESP stuck on 'Installing apps' for 45 minutes", "Device registering as Entra Registered instead of Entra Joined". |
| Hardware-specific callouts | TPM attestation failures are often hardware-specific. Generic guidance is useless when the root cause is an ST Micro RSA-3072 TPM or an Infineon SLB9672 firmware 15.22 issue. | MEDIUM | Requires maintaining a hardware compatibility matrix with known-bad firmware versions and OEM contact escalation paths. This differentiates from Microsoft Learn which lists issues but does not organize them as a field reference. |
| Policy conflict reference table | Policy conflicts are a leading cause of unexplained ESP failures. Microsoft documents individual conflicts but does not provide a consolidated lookup. | MEDIUM | Must cover: AppLocker CSP during ESP, DeviceLock policies during OOBE autologon, Security Baseline UAC settings, AutoAdminLogon registry key, PreferredAadTenantDomainName policy, GPOs blocking pre-provisioning (Interactive logon message, smart card requirement). |
| Self-deployment mode failure matrix | Self-deploying mode fails silently in ways that confuse L1. A matrix of error codes to root causes to resolution steps is more actionable than narrative docs. | LOW | 0x800705B4 (timeout/no TPM 2.0), 0x801c03ea (TPM attestation failed, Entra join blocked), 0xc1036501 (multiple MDM configs in Entra), 0x80180014 (device record needs deletion/MDM blocked). |
| Remediation action cross-reference | The existing PowerShell modules (Reset-AutopilotRegistration, Reset-TPMForAutopilot, Repair-AutopilotConnectivity, Restart-EnrollmentStatusPage, Remove-AutopilotDevice) are only useful if docs tell L2 exactly when to run them. | LOW | Each runbook section ends with: "If above steps fail, L2 tool: [function name] — see PowerShell module reference." Bridges the documentation milestone to the tooling milestone. |
| Event ID reference with plain-language descriptions | Event Viewer entries for Autopilot use numeric IDs that mean nothing to L1. A plain-English mapping prevents pointless escalations. | LOW | Source: Microsoft Learn (HIGH confidence). IDs 100, 101, 103, 109, 111, 153, 160, 161, 163, 164, 171, 172, 807, 809, 815, 908. |

---

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Environment-specific configuration screenshots | Teams want docs that match their exact Intune admin center | Screenshots become stale within weeks of a Microsoft UI update. Maintaining them is more work than the value delivered. | Write procedure steps as text with UI element names. Reference official Microsoft Learn screenshots by URL rather than embedding. |
| Automated remediation scripts embedded in L1 guides | "Just give L1 a script to run" | L1 staff running PowerShell remediation functions against production devices without L2 oversight causes re-registration loops, data loss on device wipe, and untracked changes. The remediation functions (Remove-AutopilotDevice, Reset-TPMForAutopilot) are explicitly marked as requiring non-production testing first. | L1 guides end at escalation criteria. L2 guides cover PowerShell tool usage with explicit pre-conditions and ShouldProcess safety guidance. |
| Exhaustive coverage of every Autopilot known issue | Completeness feels valuable | Microsoft's known issues page (updated 2026-02-10) is already comprehensive and updated by Microsoft. Duplicating it in internal docs creates a maintenance burden and a version drift problem. | Reference known issues page by URL. Only document issues in internal runbooks when they affect the specific deployment modes in use (pre-provisioning, user-driven, hybrid join). |
| Tenant-specific configuration docs | Teams want one doc that covers their exact setup | Violates the project constraint: docs must be generic. Tenant-specific docs break when environments change and can't be reused across teams. | Include a "Customization Notes" section in each runbook where teams can insert their environment-specific values (tenant name, group names, connector server hostname). |
| Real-time error log streaming dashboards | "Can we see errors as they happen?" | Frontend UI is explicitly deferred to a future milestone. Building monitoring features into a documentation milestone scope-creeps into tooling. | Document how to use existing Intune deployment reports and Event Viewer filtering to achieve near-real-time visibility without custom tooling. |

---

## Feature Dependencies

```
[L1 Decision Trees]
    └──requires──> [Lifecycle Overview]
    └──requires──> [Error Code Lookup Table]
    └──requires──> [Escalation Criteria (defined in L2 guides)]

[L2 Technical Guides]
    └──requires──> [Log Collection Reference]
    └──requires──> [Registry Path Reference]
    └──requires──> [Error Code Lookup Table]
    └──enhances──> [PowerShell Module Reference (existing code)]

[Pre-Provisioning Runbook]
    └──requires──> [Lifecycle Overview]
    └──requires──> [TPM Attestation Error section of Error Code Table]
    └──requires──> [Hardware-specific callouts]

[Hybrid Join Runbook]
    └──requires──> [Lifecycle Overview]
    └──requires──> [ODJ Connector setup prerequisites]
    └──requires──> [Network Endpoints Reference]

[ESP Troubleshooting Guide]
    └──requires──> [Log Collection Reference]
    └──requires──> [Policy Conflict Reference Table]
    └──enhances──> [L1 Decision Trees] (L1 uses simplified version)
    └──enhances──> [L2 Technical Guides] (L2 uses registry/log detail)

[Error Code Lookup Table]
    └──enhances──> [All runbooks]
    └──enhances──> [All decision trees]

[Scenario Runbooks] ──conflicts──> [Feature-organized docs]
(Scenario org and feature org are mutually exclusive structural choices — pick one)
```

### Dependency Notes

- **L1 Decision Trees require Lifecycle Overview:** Trees branch on symptoms that only make sense if the reader knows the deployment flow. A technician who does not know what "ESP" means cannot use a decision tree that branches on "ESP failure."
- **L2 Guides enhance PowerShell Modules:** The existing AutopilotDiagnostics.psm1 and AutopilotRemediation.psm1 functions are referenced in L2 guides at the point where manual investigation has confirmed a root cause. This creates the bridge between the documentation milestone and the tooling milestone without bloating scope.
- **ESP Guide enhances both L1 and L2:** The ESP guide has two audiences. L1 gets a simplified "app install stuck" decision tree. L2 gets the full registry inspection path (HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking) and event log correlation.

---

## MVP Definition

### Launch With (v1)

Minimum content to make L1 and L2 operational for the three highest-frequency scenarios.

- [ ] **Lifecycle Overview** — Without this, no other document is usable. L1 and L2 must share a common vocabulary before any runbook works.
- [ ] **Error Code Lookup Table** — The single highest-leverage document. Every scenario runbook references it. L1's first action on any Autopilot call is to look up the error code.
- [ ] **Pre-Provisioning Runbook (L1 + L2 sections)** — Pre-provisioning failures are the most common escalation and have the most hardware-specific edge cases. High impact, cannot be improvised.
- [ ] **User-Driven Deployment Runbook (L1 + L2 sections)** — The highest-volume deployment mode. L1 receives these calls daily.
- [ ] **ESP Troubleshooting Guide (L1 decision tree + L2 registry/log detail)** — ESP failures appear in every deployment mode. Central enough to warrant standalone treatment.
- [ ] **Log Collection Reference** — L2 cannot investigate without standardized log collection. Required for every escalation path.
- [ ] **Required Network Endpoints Reference** — Low complexity, high impact. Connectivity failures cause many phantom symptoms.

### Add After Validation (v1.x)

Add these once the v1 docs are in use and teams have given feedback.

- [ ] **Hybrid Azure AD Join Runbook** — Hybrid join is in scope per PROJECT.md but is a distinct enough deployment mode that it warrants its own runbook. Add after v1 core is validated.
- [ ] **Policy Conflict Reference Table** — Frequently needed but requires more research into organization-specific policy baselines. Add when teams report policy conflicts as a recurring escalation category.
- [ ] **Hardware-Specific TPM Compatibility Reference** — Valuable but requires ongoing maintenance as OEMs release firmware updates. Add when hardware diversity in the fleet is confirmed.
- [ ] **Self-Deployment Mode Failure Matrix** — Smaller user base than user-driven. Add when self-deploying is confirmed as a deployment mode in use.

### Future Consideration (v2+)

Defer until documentation milestone is validated and tooling milestone begins.

- [ ] **PowerShell Tool Reference integrated into runbooks** — Full integration between docs and tooling belongs in the tooling milestone, not the documentation milestone. Current approach: reference function names with a note that L2 should consult the module directly.
- [ ] **Interactive decision trees (web-based)** — Requires frontend work (explicitly deferred per PROJECT.md). Markdown decision trees in v1. Promote to interactive UI when frontend milestone begins.
- [ ] **Autopilot v2 (Device Preparation) coverage** — Windows Autopilot Device Preparation (APv2) removes the hardware hash requirement and uses corporate identifiers. It is a different enough flow to warrant separate documentation. Defer until APv2 adoption is confirmed in the target environment.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Error Code Lookup Table | HIGH | MEDIUM | P1 |
| Lifecycle Overview | HIGH | LOW | P1 |
| Pre-Provisioning Runbook | HIGH | HIGH | P1 |
| User-Driven Runbook | HIGH | MEDIUM | P1 |
| ESP Troubleshooting Guide | HIGH | HIGH | P1 |
| Log Collection Reference | HIGH | LOW | P1 |
| Network Endpoints Reference | MEDIUM | LOW | P1 |
| L1 Decision Trees | HIGH | MEDIUM | P1 |
| L2 Technical Guides | HIGH | HIGH | P1 |
| Hybrid Join Runbook | HIGH | HIGH | P2 |
| Policy Conflict Reference Table | MEDIUM | MEDIUM | P2 |
| Hardware-Specific TPM Reference | MEDIUM | MEDIUM | P2 |
| Self-Deployment Failure Matrix | MEDIUM | LOW | P2 |
| PowerShell Tool Integration | MEDIUM | LOW | P3 |
| Interactive Decision Trees | MEDIUM | HIGH | P3 |
| Autopilot v2 Coverage | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for v1 launch — L1/L2 cannot operate without it
- P2: Should have — reduces escalations and investigation time significantly
- P3: Nice to have — deferred to future milestone or v2

---

## Error Code Inventory

The following error codes must be covered in the lookup table. This is the definitive reference for scoping that document. All codes verified against Microsoft Learn official documentation (HIGH confidence, source updated 2026-02-10).

### MDM Enrollment Errors (0x8018xxxx)

| Error Code | Plain-Language Cause | Resolution Path |
|------------|----------------------|-----------------|
| 0x80180014 | Device record blocking re-enrollment (self-deploy/pre-provisioning reuse) OR MDM enrollment blocked in tenant | Unblock device in Intune admin center OR enable Windows (MDM) in enrollment restrictions |
| 0x80180005 | Pre-provisioning not enabled in Autopilot profile OR device not registered in ZTD | Check profile setting "Allow pre-provisioned deployment" = Yes; verify device registration |
| 0x80180018 | User lacks Intune/EMS/Microsoft 365 license | Assign license to user in Azure AD |
| 0x80180022 | Unsupported Windows edition (Home edition) | Windows Home is not supported with Autopilot — requires Pro, Enterprise, or Education |
| 0x80180003 | User not authorized to enroll (enrollment restriction) | Review device type restrictions in Intune |

### TPM Attestation Errors

| Error Code | Plain-Language Cause | Hardware Notes | Resolution Path |
|------------|----------------------|----------------|-----------------|
| 0x81039001 (E_AUTOPILOT_CLIENT_TPM_MAX_ATTESTATION_RETRY_EXCEEDED) | TPM attestation retry limit exceeded — intermittent | ST Micro, Nuvoton RSA-3072 TPMs (2025 known issue) | Retry provisioning; contact OEM for firmware update if persistent |
| 0x81039023 | TPM attestation failed on Windows 11 pre-provisioning/self-deploy | — | Apply KB5013943 (May 2022) or later |
| 0x81039024 | TPM has known vulnerabilities, attestation blocked | Firmware vulnerability detected | Update TPM firmware via OEM |
| 0x80070490 | TPM attestation failed — AMD ASP firmware TPM | AMD platforms with ASP fTPM | Update AMD firmware via OEM |
| 0x800705B4 | Timeout — device not TPM 2.0 capable OR network timeout to attestation service | Virtual machines without TPM 2.0 | Verify TPM 2.0 in BIOS; not usable with self-deploying mode on VMs; sync device clock (w32tm /resync /force) |
| 0x80190190 | TPM attestation failure (general) | — | Collect TPM diagnostics: mdmdiagnosticstool.exe -area Autopilot;TPM |
| 0x80280009 | TPM attestation on virtual machine without vTPM | Hyper-V / virtual environments | Enable vTPM in VM settings or use user-driven mode |

### ESP and Enrollment Status Page Errors

| Error Code / Symptom | Plain-Language Cause | Resolution Path |
|----------------------|----------------------|-----------------|
| ESP timeout (no error code) | App install timeout — ESP timeout value too low for number of apps | Increase ESP timeout; reduce apps tracked during device ESP; split LOB and Win32 apps |
| "Another installation is in progress" | LOB + Win32 app conflict — both use TrustedInstaller, cannot run simultaneously | Separate LOB and Win32 installs; use Autopilot v2 (Device Preparation) which does not use ESP |
| Teams Machine-Wide Installer conflict | Teams MSI installs via TrustedInstaller, conflicts with other Win32 MSI installs timing | Deploy Teams as separate Win32 app post-deployment or use "Continue on error" in ESP |
| App InstallationState = 4 (Error) in registry | A specific Win32 app failed — ESP stops all further installs | Check IME log; check HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\Device\Setup |
| ESP stuck — unexpected reboot during device phase | Policy triggered reboot (AppLocker CSP, DeviceLock, Security Baseline UAC settings) | Remove or delay conflicting policies; target policies to users not devices |

### Self-Deploying Mode Errors

| Error Code | Plain-Language Cause | Resolution Path |
|------------|----------------------|-----------------|
| 0x800705B4 | Timeout or no TPM 2.0 | Device must be TPM 2.0; check network to attestation endpoint |
| 0x801c03ea | TPM attestation failed, Entra join with device token blocked | Verify Entra join prerequisites; check TPM firmware |
| 0xc1036501 | Multiple MDM configurations in Entra ID | Remove duplicate MDM authority settings in Entra ID |

### Pre-Provisioning Specific Errors

| Error Code | Plain-Language Cause | Resolution Path |
|------------|----------------------|-----------------|
| 0x80180014 | Device record exists from prior enrollment — must be deleted before reuse | Delete device record in Intune, then redeploy |
| 0x801C03F3 | Entra device object deleted — Autopilot cannot find device anchor | Deregister and re-register device in Autopilot (recreates Entra object) |
| "Reset button" retry failure | Using Reset during ESP failure causes TPM attestation failure on retry | Do not use Reset button during failed pre-provisioning — deregister and re-register instead |
| LAPS policy not applied during technician flow | LAPS policies do not apply until user phase begins | Expected behavior (known issue as of Dec 2024) — document as known limitation |

### Hybrid Join Specific Errors

| Error Code / Symptom | Plain-Language Cause | Resolution Path |
|----------------------|----------------------|-----------------|
| 0x80070774 | Domain mismatch — Intune Connector installed on Domain A, device targeted for Domain B | Install connector in the matching domain |
| 0x80004005 | Hybrid join timeout during Autopilot deployment | Apply KB5065789 (25H2), KB5065426 (24H2), or KB5070312 (23H2) |
| ODJ blob not found | Device requests Offline Domain Join blob but no domain join profile targeted to device | Create and assign a domain join profile to the device group |
| "Navigation canceled" during connector setup | Server lacks internet access to Intune URLs OR TLS 1.0/1.1 PKCS Cryptography disabled | Allow required URLs; delete PKCS registry key to re-enable modern TLS |
| MSA account not valid | Connector creates MSA but cannot retrieve it — domain controller replication lag | Wait for replication or manually force sync; update to connector 6.2504.2001.8+ |
| ODJConnectorSvc fails to start | Service cannot run as MSA — "Log on as a service" privilege denied by GPO | Grant MSA "Log on as a service" privilege |

### Device Registration Errors

| Event ID / Error | Plain-Language Cause | Resolution Path |
|------------------|----------------------|-----------------|
| Event 807 (ZtdDeviceIsNotRegistered) | Hardware hash not uploaded or not matched to device in Intune | Re-upload hardware hash CSV; verify Base64 padding |
| Event 809 (ZtdDeviceHasNoAssignedProfile — profile deleted) | Assigned profile was deleted without cleanup | Assign a different profile and re-enroll |
| Event 815 (ZtdDeviceHasNoAssignedProfile — no default) | No profile assigned and no default profile in tenant | Assign a profile to the device or create a default |
| Event 908 (SerialNumberMismatch / ProductKeyIdMismatch) | Hardware mismatch — motherboard replacement or hardware change | Deregister and re-register with new hardware hash |
| Event 171 (TPM identity confirmed failed) | TPM attestation failed during self-deploying mode | Check TPM firmware; review HRESULT code from event detail |
| CSV import 400 error | Hardware hash Base64 padding invalid | Fix hash padding per PowerShell validation procedure |
| "Entra Registered" instead of "Entra Joined" | Prior workplace join record exists in Entra | Delete prior Entra Registered object from Intune, Entra, and Autopilot before re-registering |

### Policy Conflict Issues (Not Error Codes — Require Explicit Coverage)

| Policy | Conflict Type | Resolution |
|--------|--------------|------------|
| AppLocker CSP | Causes reboot during ESP — not supported in ESP | Remove AppLocker from device phase; apply post-enrollment |
| DeviceLock / Password complexity | Breaks OOBE/autologon during device ESP | Target to users not devices, or apply after enrollment |
| Security Baseline UAC settings | Causes reboots during ESP requiring extra prompts | Target to users not devices |
| AutoAdminLogon registry key = 0 | Breaks Autopilot autologon | Ensure key is not set to 0 during provisioning |
| Interactive logon message GPOs | Blocks pre-provisioning technician flow | Disable for pre-provisioning OU or device group |
| PreferredAadTenantDomainName policy | Adds domain to DefaultUser0, breaks autologon | Disable or exclude during provisioning |
| Microsoft Sign-in Assistant service disabled | Profile download fails | Re-enable wlidsvc; do not disable via device restriction policy |
| Conditional Access blocking Intune Enrollment app | Enrollment loop — device cannot become compliant to satisfy CA | Exclude "Microsoft Intune Enrollment" app from CA policies requiring compliance |

---

## Document Type Reference

What document types the feature set requires, with the audience and format for each.

| Document Type | Audience | Format | Purpose |
|---------------|----------|--------|---------|
| Lifecycle Overview | L1 + L2 | Prose + numbered steps + simple diagram | Shared vocabulary; happy path reference |
| Decision Tree | L1 primary | Markdown flowchart (nested lists or Mermaid) | Symptom → triage → action → escalate |
| Scenario Runbook | L1 (summary) + L2 (full detail) | Tiered sections within same doc | Step-by-step resolution for a named failure scenario |
| Error Code Lookup Table | L1 + L2 | Markdown table | Error → cause → L1 action → L2 escalation path |
| Technical Deep-Dive Guide | L2 only | Prose + code blocks + registry paths | Registry inspection, log interpretation, PowerShell tool usage |
| Reference Table | L1 + L2 | Markdown table | Network endpoints, event IDs, registry values, policy conflict index |
| Log Collection Reference | L2 primary | Code blocks + step list | Exact commands for each scenario type |

---

## Sources

- [Windows Autopilot troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq) — Updated 2026-02-05. HIGH confidence. Primary source for error codes, event IDs, registry paths.
- [Windows Autopilot known issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/known-issues) — Updated 2026-02-10. HIGH confidence. Source for TPM attestation codes (0x81039001, 0x81039023, 0x81039024, 0x80070490), hybrid join timeout (0x80004005), self-deployment errors (0x800705B4, 0x801c03ea, 0xc1036501), kiosk issues.
- [Troubleshoot the Enrollment Status Page — Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/understand-troubleshoot-esp) — Updated 2025-07-14. HIGH confidence. Source for ESP registry structure (EnrollmentStatusTracking), InstallationState values, log collection commands.
- [TPM Attestation Failures — Patch My PC blog](https://patchmypc.com/blog/tpm-attestation-failures-windows-autopilot/) — MEDIUM confidence. Source for 0x800705b4 timeout context in pre-provisioning scenarios.
- [TPM Attestation EKRSA3072 failure 0x81039001 — Patch Tuesday blog](https://patchtuesday.com/blog/tech-blog/tpm-attestation-ekrsa3072-windows-autopilot-0x81039001/) — MEDIUM confidence. Source for ST Micro / Nuvoton RSA-3072 hardware-specific context.
- [Autopilot error 0x80180014 — Windows Management Experts](https://windowsmanagementexperts.com/fix-intune-autopilot-error-80180014/) — MEDIUM confidence. Supplementary resolution steps for 0x80180014.
- [Autopilot error 0x80180005 — call4cloud.nl](https://call4cloud.nl/autopilot-0x80180005-preprovisioning-disabled/) — MEDIUM confidence. Pre-provisioning disabled as root cause.
- [Fix Autopilot enrollment error 0x80180022 — HTMD Blog](https://www.anoopcnair.com/autopilot-device-enrollment-error-0x80180022/) — MEDIUM confidence. Windows Home edition incompatibility.

---

*Feature research for: Windows Autopilot Troubleshooting Documentation Suite*
*Researched: 2026-03-10*
