---
doc_id: RE-116
status: Approved
owner: Intune Admin Lead
doc_type: Guide
last_verified: 2026-06-22
review_by: 2026-09-22
applies_to: ADE
audience: admin
platform: macOS
---

**Platform:** macOS · **Doc Type:** Guide · **Doc ID:** RE-116 · **Status:** Approved

# macOS Admin Setup: Complete Configuration Guide

## Summary

Guide roadmap for a complete macOS Automated Device Enrollment deployment, ordering 11 configuration guides from ABM setup and enrollment profile through Configuration Profiles, App Deployment, Compliance Policies, Config-Failures troubleshooting, and the Platform SSO / Enterprise SSO / Kerberos SSO / Graph API Platform Credential chain, preserving the reconvergence where 3 parallel guides feed into the shared Config-Failures reference.

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune. For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).

> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

This guide walks Intune administrators through configuring a complete macOS Automated Device Enrollment deployment from scratch. Complete the guides in order -- ABM configuration and enrollment profile are prerequisites for all subsequent configuration.

## Setup Sequence

**LOCKED — 11 (nodes + labeled edges)** — 11 nodes + 0 labeled edges (12 plain edges total), independently re-derived from the pre-conversion flowchart (`git show 71be4ab`). No decision diamond is present in this diagram — per the D-02 bright-line, it converts to the ordered numbered stage list below (not a decision table). The list preserves the diagram's load-bearing reconvergence: Step 2 (Enrollment Profile) fans out to Steps 3, 4, and 5 (Configuration Profiles, App Deployment, Compliance Policies), which all three feed back into Step 6 (Configuration-Caused Failures Reference); Step 3 also continues independently into the linear Platform SSO chain, Steps 7 → 8 → 9 → 10 → 11.

1. **[ABM Configuration](01-abm-configuration.md)** -- Create ADE token in Apple Business Manager and Intune, assign devices to MDM server, configure token renewal. This must be complete before any enrollment profile can be created.

2. **[Enrollment Profile](02-enrollment-profile.md)** -- Configure enrollment profile with user affinity, authentication method, Await Configuration, locked enrollment, and Setup Assistant screen customization.

3. **[Configuration Profiles](03-configuration-profiles.md)** -- Deploy Wi-Fi, VPN, email, restrictions, FileVault, and firewall profiles via Settings Catalog. Configuration profiles enforce settings; compliance policies detect non-compliance.

4. **[App Deployment](04-app-deployment.md)** -- Deploy macOS apps via DMG, PKG (managed and unmanaged), and VPP/Apps and Books with size limits, detection rules, and uninstall capabilities documented per type.

5. **[Compliance Policies](05-compliance-policy.md)** -- Configure compliance policies for SIP, FileVault, firewall, Gatekeeper, and password. Important: no Intune security baselines exist for macOS.

6. **[Configuration-Caused Failures Reference](06-config-failures.md)** -- Consolidated reverse-lookup table of all macOS admin setup misconfigurations with links to guide files and troubleshooting runbooks.

7. **[Platform SSO Setup](07-platform-sso-setup.md)** -- Configure macOS Platform SSO via the Settings Catalog `com.apple.extensiblesso` payload. Covers Entra prerequisites, the three silent bootstrapping blockers, dual-field mixed-fleet configuration, user-group assignment, and `app-sso platform -s` verification.

8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** -- Selection guide and deep-dive reference for all three Platform SSO authentication methods (Secure Enclave key [recommended], Password sync, Smart card) with FileVault interaction, dangerous misconceptions, Touch ID biometric policy, and Passkey/FIDO2 from the Platform Credential.

9. **[Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)** -- Decision-first reference for mixed-fleet admins: product-name disambiguation (Microsoft Enterprise SSO plug-in vs Platform SSO vs legacy SSO app extension vs Kerberos SSO extension), migrate/keep/coexist decision matrix, staged migration sequence that avoids Error 10002, what breaks during migration, and the mandatory destructive rollback procedure.

10. **[Kerberos SSO Extension](10-kerberos-sso-extension.md)** -- Configure the Apple Kerberos SSO extension (`com.apple.AppSSOKerberos.KerberosExtension`, Type: Credential) via Intune Custom Template (.mobileconfig) for PSSO-integrated on-premises AD Kerberos authentication. Covers realm and Hosts payload, PSSO TGT sharing (`usePlatformSSOTGT`), and `app-sso platform -s` / `klist` diagnostics.

11. **[Graph API: Platform Credential Management](11-graph-api-platform-credential.md)** -- Programmatic management of macOS Secure Enclave Platform Credentials via Microsoft Graph v1.0 (`platformCredentialMethods`). Covers List / Get / Delete operations (HTTP + PowerShell SDK), permissions matrix (read vs delete; delegated vs application; national cloud), and the leaver/offboarding automation pattern with mandatory dry-run step.

## Cross-Platform References

- [Capability Matrix](../reference/macos-capability-matrix.md) -- Intune feature parity gaps between macOS and Windows
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) -- Platform terminology mapping

## See Also

- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [Windows APv1 Admin Setup](../admin-setup-apv1/00-overview.md)
- [Windows APv2 Admin Setup](../admin-setup-apv2/00-overview.md)

---
*Next step: [ABM Configuration](01-abm-configuration.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-20 | Phase 76: added guides 07/08/09 to Mermaid diagram and numbered list | -- |
| 2026-04-14 | Initial version -- macOS admin setup overview with Mermaid diagram and 6-guide setup sequence | -- |
| 2026-06-21 | Phase 77: converted `08-auth-methods-deep-dive.md` code-span to live link with description | -- |
| 2026-06-21 | Phase 78: converted guide-09 code-span to live link with description | -- |
| 2026-06-22 | Phase 83 (KRB-04): added guide 10 node to Mermaid diagram and item 10 to numbered list | -- |
| 2026-06-23 | Phase 84 (GRAPH-01): added guide 11 node to Mermaid diagram and item 11 to numbered list | -- |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | Phase 122 plan 06: converted Mermaid flowchart (no decision diamond) to the pre-existing numbered stage list, annotated with an explicit reconvergence note (Steps 3/4/5 fan-in to Step 6; Step 3 also continues into the linear Step 7→8→9→10→11 chain); removed the mermaid fence; LOCKED — 11 (nodes + labeled edges, R1 convention); split the 1 pre-existing over-200-char Platform-gate blockquote into 2 word-preserving groups; enrolled as RE-116. | -- |
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |