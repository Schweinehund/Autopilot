# Doc ID Registry — Phase-1

> **WARNING: This registry lives OUTSIDE the indexed SharePoint library.**
> See `scripts/pipeline/README.md §SC3`.
> If this file is indexed, doc-specific queries (e.g., "What does RE-047 cover?")
> return the registry row instead of the document content.
> **Do NOT upload this file to the indexed SharePoint library.**

> **Note on the `Status` column:** This column tracks the EEE **retrofit lifecycle**, not a
> document's frontmatter `status` field. `Pending` means the ID is assigned but the doc is not
> yet EEE-retrofitted; it becomes `Approved` once the doc is EEE-retrofitted and C17-green in
> phases 116–118. This is distinct from the standard's frontmatter `status` vocabulary
> ({Draft, Approved, Superseded}).

| Doc ID | Path | Title | Doc Type | Status |
|--------|------|-------|----------|--------|
| RE-001 | docs/l1-runbooks/00-index.md | L1 Runbooks | Runbook | Approved |
| RE-002 | docs/l1-runbooks/01-device-not-registered.md | Device Not Registered in Autopilot | Runbook | Approved |
| RE-003 | docs/l1-runbooks/02-esp-stuck-or-failed.md | ESP Stuck or Failed | Runbook | Approved |
| RE-004 | docs/l1-runbooks/03-profile-not-assigned.md | Autopilot Profile Not Assigned | Runbook | Approved |
| RE-005 | docs/l1-runbooks/04-network-connectivity.md | Network Connectivity Failure | Runbook | Approved |
| RE-006 | docs/l1-runbooks/05-oobe-failure.md | OOBE Fails Immediately | Runbook | Approved |
| RE-007 | docs/l1-runbooks/06-apv2-deployment-not-launched.md | APv2 Deployment Experience Never Launched | Runbook | Approved |
| RE-008 | docs/l1-runbooks/07-apv2-apps-not-installed.md | APv2 Apps and Scripts Not Installed | Runbook | Approved |
| RE-009 | docs/l1-runbooks/08-apv2-apv1-conflict.md | APv1 Registration Conflict -- ESP Appeared During APv2 Deployment | Runbook | Approved |
| RE-010 | docs/l1-runbooks/09-apv2-deployment-timeout.md | APv2 Deployment Timed Out | Runbook | Approved |
| RE-011 | docs/l1-runbooks/10-macos-device-not-appearing.md | macOS Device Not Appearing in Intune | Runbook | Approved |
| RE-012 | docs/l1-runbooks/11-macos-setup-assistant-failed.md | macOS Setup Assistant Stuck or Failed | Runbook | Approved |
| RE-013 | docs/l1-runbooks/12-macos-profile-not-applied.md | macOS Configuration Profile Not Applied | Runbook | Approved |
| RE-014 | docs/l1-runbooks/13-macos-app-not-installed.md | macOS App Not Installed | Runbook | Approved |
| RE-015 | docs/l1-runbooks/14-macos-compliance-access-blocked.md | macOS Compliance Failure / Access Blocked | Runbook | Approved |
| RE-016 | docs/l1-runbooks/15-macos-company-portal-sign-in.md | macOS Company Portal Sign-In Failure | Runbook | Approved |
| RE-017 | docs/l1-runbooks/16-ios-apns-expired.md | iOS APNs Certificate Expired | Runbook | Approved |
| RE-018 | docs/l1-runbooks/17-ios-ade-not-starting.md | iOS ADE Enrollment Not Starting | Runbook | Approved |
| RE-019 | docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md | iOS Enrollment Restriction Blocking | Runbook | Approved |
| RE-020 | docs/l1-runbooks/19-ios-license-invalid.md | iOS License Invalid | Runbook | Approved |
| RE-021 | docs/l1-runbooks/20-ios-device-cap-reached.md | iOS Device Cap Reached | Runbook | Approved |
| RE-022 | docs/l1-runbooks/21-ios-compliance-blocked.md | iOS Compliance Blocked / Access Denied | Runbook | Approved |
| RE-023 | docs/l1-runbooks/22-android-enrollment-blocked.md | Android Enrollment Blocked | Runbook | Approved |
| RE-024 | docs/l1-runbooks/23-android-work-profile-not-created.md | Android Work Profile Not Created | Runbook | Approved |
| RE-025 | docs/l1-runbooks/24-android-device-not-enrolled.md | Android Device Not Enrolled | Runbook | Approved |
| RE-026 | docs/l1-runbooks/25-android-compliance-blocked.md | Android Compliance Blocked | Runbook | Approved |
| RE-027 | docs/l1-runbooks/26-android-mgp-app-not-installed.md | Android Managed Google Play App Not Installed | Runbook | Approved |
| RE-028 | docs/l1-runbooks/27-android-zte-enrollment-failed.md | Android Zero-Touch Enrollment Failed | Runbook | Approved |
| RE-029 | docs/l1-runbooks/28-android-knox-enrollment-failed.md | Android Knox Mobile Enrollment Failed | Runbook | Approved |
| RE-030 | docs/l1-runbooks/29-android-aosp-enrollment-failed.md | Android AOSP Enrollment Failed | Runbook | Approved |
| RE-031 | docs/l1-runbooks/30-linux-enrollment-failed.md | Linux Enrollment Failed | Runbook | Approved |
| RE-032 | docs/l1-runbooks/31-linux-compliance-non-compliant.md | Linux Compliance Non-Compliant | Runbook | Approved |
| RE-033 | docs/l1-runbooks/32-linux-ca-blocking-web-access.md | Linux CA Blocking Web-App Access | Runbook | Approved |
| RE-034 | docs/l1-runbooks/33-linux-agent-service-failure.md | Linux Intune Agent Service Failure | Runbook | Approved |
| RE-035 | docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md | Apple Business Shared iPad Passcode Reset | Runbook | Approved |
| RE-036 | docs/l1-runbooks/35-macos-sso-sign-in-failure.md | macOS Platform SSO Sign-In Failure | Runbook | Approved |
| RE-037 | docs/l1-runbooks/36-macos-secure-enclave-key.md | macOS Platform SSO — Secure Enclave Key Loss | Runbook | Approved |
| RE-038 | docs/l1-runbooks/37-macos-local-password-reset.md | macOS Local Password Recovery: Secure Enclave PSSO Devices | Runbook | Approved |
| RE-039 | docs/l1-runbooks/38-8021x-certificate-failure.md | 802.1X Certificate Failure | Runbook | Approved |
| RE-040 | docs/l1-runbooks/39-8021x-radius-reject.md | 802.1X RADIUS Reject | Runbook | Approved |
| RE-041 | docs/l1-runbooks/40-8021x-server-trust-failure.md | 802.1X Server Trust Failure | Runbook | Approved |
| RE-042 | docs/l1-runbooks/41-8021x-eap-negotiation-failure.md | 802.1X EAP Negotiation Failure | Runbook | Approved |
| RE-043 | docs/l2-runbooks/00-index.md | L2 Investigation Runbooks | Runbook | Approved |
| RE-044 | docs/l2-runbooks/01-log-collection.md | L2 Log Collection Guide | Runbook | Approved |
| RE-045 | docs/l2-runbooks/02-esp-deep-dive.md | ESP Deep-Dive Investigation | Runbook | Approved |
| RE-046 | docs/l2-runbooks/03-tpm-attestation.md | TPM Attestation Failure Investigation | Runbook | Approved |
| RE-047 | docs/l2-runbooks/04-hybrid-join.md | Hybrid Join Failure Investigation | Runbook | Approved |
| RE-048 | docs/l2-runbooks/05-policy-conflicts.md | Policy Conflict Analysis | Runbook | Approved |
| RE-049 | docs/l2-runbooks/06-apv2-log-collection.md | APv2 Log Collection Guide | Runbook | Approved |
| RE-050 | docs/l2-runbooks/07-apv2-event-ids.md | APv2 BootstrapperAgent Event ID Reference | Runbook | Approved |
| RE-051 | docs/l2-runbooks/08-apv2-deployment-report.md | APv2 Deployment Report Interpretation | Runbook | Approved |
| RE-052 | docs/l2-runbooks/10-macos-log-collection.md | macOS L2 Log Collection Guide | Runbook | Approved |
| RE-053 | docs/l2-runbooks/11-macos-profile-delivery.md | macOS Profile Delivery Investigation | Runbook | Approved |
| RE-054 | docs/l2-runbooks/12-macos-app-install.md | macOS App Install Failure Diagnosis | Runbook | Approved |
| RE-055 | docs/l2-runbooks/13-macos-compliance.md | macOS Compliance Evaluation Investigation | Runbook | Approved |
| RE-056 | docs/l2-runbooks/14-ios-log-collection.md | iOS Log Collection Guide | Runbook | Approved |
| RE-057 | docs/l2-runbooks/15-ios-ade-token-profile.md | ADE Token & Profile Delivery Investigation | Runbook | Approved |
| RE-058 | docs/l2-runbooks/16-ios-app-install.md | iOS App Install Failure Diagnosis | Runbook | Approved |
| RE-059 | docs/l2-runbooks/17-ios-compliance-ca-timing.md | iOS Compliance & CA Timing Investigation | Runbook | Approved |
| RE-060 | docs/l2-runbooks/18-android-log-collection.md | Android Log Collection Guide | Runbook | Approved |
| RE-061 | docs/l2-runbooks/19-android-enrollment-investigation.md | Android Enrollment Investigation | Runbook | Approved |
| RE-062 | docs/l2-runbooks/20-android-app-install-investigation.md | Android App Install Investigation | Runbook | Approved |
| RE-063 | docs/l2-runbooks/21-android-compliance-investigation.md | Android Compliance Investigation | Runbook | Approved |
| RE-064 | docs/l2-runbooks/22-android-knox-investigation.md | Android Knox Mobile Enrollment Investigation | Runbook | Approved |
| RE-065 | docs/l2-runbooks/23-android-aosp-investigation.md | Android AOSP Enrollment Investigation | Runbook | Approved |
| RE-066 | docs/l2-runbooks/24-linux-log-collection.md | Linux Log Collection Guide | Runbook | Approved |
| RE-067 | docs/l2-runbooks/25-linux-agent-investigation.md | Linux Agent Investigation | Runbook | Approved |
| RE-068 | docs/l2-runbooks/26-apple-business-permission-denied.md | Apple Business Permission Denied Investigation | Runbook | Approved |
| RE-069 | docs/l2-runbooks/27-macos-sso-investigation.md | macOS Platform SSO Investigation | Runbook | Approved |
| RE-070 | docs/l2-runbooks/28-macos-kerberos-sso-investigation.md | macOS Kerberos SSO Extension Investigation | Runbook | Approved |
| RE-071 | docs/l2-runbooks/29-macos-graph-credential-investigation.md | macOS Graph Platform Credential Investigation | Runbook | Approved |
| RE-072 | docs/l2-runbooks/30-macos-mdm-migration-failure.md | macOS MDM Migration Failure Investigation | Runbook | Approved |
| RE-073 | docs/l2-runbooks/31-8021x-log-collection.md | 802.1X Log Collection | Runbook | Approved |
| RE-074 | docs/l2-runbooks/32-8021x-cert-investigation.md | 802.1X Certificate-Chain Investigation | Runbook | Approved |
| RE-075 | docs/l2-runbooks/33-8021x-radius-eap-investigation.md | 802.1X RADIUS/EAP Investigation | Runbook | Approved |
| RE-076 | docs/admin-setup-apv1/00-overview.md | APv1 Admin Setup: Complete Configuration Guide | Guide | Pending |
| RE-077 | docs/admin-setup-apv1/01-hardware-hash-upload.md | Hardware Hash Upload | Guide | Pending |
| RE-078 | docs/admin-setup-apv1/02-deployment-profile.md | Deployment Profile Configuration | Guide | Approved |
| RE-079 | docs/admin-setup-apv1/03-esp-policy.md | Enrollment Status Page (ESP) Policy | Guide | Approved |
| RE-080 | docs/admin-setup-apv1/04-dynamic-groups.md | Dynamic Device Groups for Autopilot | Guide | Approved |
| RE-081 | docs/admin-setup-apv1/05-deployment-modes-overview.md | APv1 Deployment Modes Overview | Guide | Approved |
| RE-082 | docs/admin-setup-apv1/06-user-driven.md | User-Driven Mode Configuration | Guide | Approved |
| RE-083 | docs/admin-setup-apv1/07-pre-provisioning.md | Pre-Provisioning Mode Configuration | Guide | Approved |
| RE-084 | docs/admin-setup-apv1/08-self-deploying.md | Self-Deploying Mode Configuration | Guide | Approved |
| RE-085 | docs/admin-setup-apv1/09-intune-connector-ad.md | Intune Connector for Active Directory | Guide | Approved |
| RE-086 | docs/admin-setup-apv1/10-config-failures.md | APv1 Configuration-Caused Failures Reference | Guide | Approved |
| RE-087 | docs/admin-setup-apv2/00-overview.md | APv2 Admin Setup: Complete Configuration Guide | Guide | Pending |
| RE-088 | docs/admin-setup-apv2/01-prerequisites-rbac.md | APv2 Setup Step 1: Prerequisites and RBAC Role | Guide | Approved |
| RE-089 | docs/admin-setup-apv2/02-etg-device-group.md | APv2 Setup Step 2: Enrollment Time Grouping Device Group | Guide | Approved |
| RE-090 | docs/admin-setup-apv2/03-device-preparation-policy.md | APv2 Setup Step 3: Device Preparation Policy | Guide | Approved |
| RE-091 | docs/admin-setup-apv2/04-corporate-identifiers.md | APv2 Setup Step 4: Corporate Identifiers | Guide | Approved |
| RE-092 | docs/admin-setup-android/00-overview.md | Android Enterprise Admin Setup | Guide | Pending |
| RE-093 | docs/admin-setup-android/01-managed-google-play.md | Bind Managed Google Play | Guide | Approved |
| RE-094 | docs/admin-setup-android/02-zero-touch-portal.md | Configure Zero-Touch Portal | Guide | Approved |
| RE-095 | docs/admin-setup-android/03-fully-managed-cobo.md | Android Enterprise Fully Managed (COBO) Admin Setup | Guide | Approved |
| RE-096 | docs/admin-setup-android/04-byod-work-profile.md | BYOD Work Profile — Admin Setup | Guide | Approved |
| RE-097 | docs/admin-setup-android/05-dedicated-devices.md | Android Enterprise Dedicated (kiosk/COSU) Admin Setup | Guide | Approved |
| RE-098 | docs/admin-setup-android/06-aosp-stub.md | AOSP Device Management Stub — Intune | Guide | Approved |
| RE-099 | docs/admin-setup-android/07-knox-mobile-enrollment.md | Configure Knox Mobile Enrollment | Guide | Approved |
| RE-100 | docs/admin-setup-android/08-cope-full-admin.md | Android Enterprise Corporate-Owned Work Profile (COPE / WPCO) Admin Setup | Guide | Approved |
| RE-101 | docs/admin-setup-android/09-aosp-realwear.md | Configure RealWear AOSP Devices in Intune | Guide | Approved |
| RE-102 | docs/admin-setup-android/10-aosp-zebra.md | Configure Zebra AOSP Devices in Intune | Guide | Approved |
| RE-103 | docs/admin-setup-android/11-aosp-pico.md | Configure Pico AOSP Devices in Intune | Guide | Approved |
| RE-104 | docs/admin-setup-android/12-aosp-htc-vive-focus.md | Configure HTC VIVE Focus AOSP Devices in Intune | Guide | Approved |
| RE-105 | docs/admin-setup-android/13-aosp-meta-quest.md | Configure Meta Quest AOSP Devices in Intune | Guide | Approved |
| RE-106 | docs/admin-setup-ios/00-overview.md | iOS/iPadOS Admin Setup | Guide | Pending |
| RE-107 | docs/admin-setup-ios/01-apns-certificate.md | Apple Push Notification (APNs) Certificate | Guide | Approved |
| RE-108 | docs/admin-setup-ios/02-abm-token.md | ABM/ADE Token Configuration for iOS/iPadOS | Guide | Approved |
| RE-109 | docs/admin-setup-ios/03-ade-enrollment-profile.md | iOS/iPadOS ADE Enrollment Profile Configuration | Guide | Approved |
| RE-110 | docs/admin-setup-ios/04-configuration-profiles.md | iOS/iPadOS Configuration Profiles | Guide | Approved |
| RE-111 | docs/admin-setup-ios/05-app-deployment.md | iOS/iPadOS App Deployment | Guide | Approved |
| RE-112 | docs/admin-setup-ios/06-compliance-policy.md | iOS/iPadOS Compliance Policies | Guide | Approved |
| RE-113 | docs/admin-setup-ios/07-device-enrollment.md | iOS/iPadOS Device Enrollment | Guide | Approved |
| RE-114 | docs/admin-setup-ios/08-user-enrollment.md | iOS/iPadOS Account-Driven User Enrollment | Guide | Approved |
| RE-115 | docs/admin-setup-ios/09-mam-app-protection.md | iOS MAM-WE App Protection Policies | Guide | Approved |
| RE-116 | docs/admin-setup-macos/00-overview.md | macOS Admin Setup: Complete Configuration Guide | Guide | Pending |
| RE-117 | docs/admin-setup-macos/01-abm-configuration.md | ABM Configuration for Automated Device Enrollment | Guide | Approved |
| RE-118 | docs/admin-setup-macos/02-enrollment-profile.md | macOS Enrollment Profile Configuration | Guide | Approved |
| RE-119 | docs/admin-setup-macos/03-configuration-profiles.md | macOS Configuration Profiles | Guide | Approved |
| RE-120 | docs/admin-setup-macos/04-app-deployment.md | macOS App Deployment | Guide | Approved |
| RE-121 | docs/admin-setup-macos/05-compliance-policy.md | macOS Compliance Policies | Guide | Approved |
| RE-122 | docs/admin-setup-macos/06-config-failures.md | macOS Configuration-Caused Failures Reference | Guide | Approved |
| RE-123 | docs/admin-setup-macos/07-platform-sso-setup.md | macOS Platform SSO Setup | Guide | Approved |
| RE-124 | docs/admin-setup-macos/08-auth-methods-deep-dive.md | macOS Platform SSO: Auth Method Selection & Deep-Dive | Guide | Approved |
| RE-125 | docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md | macOS Enterprise SSO Plug-in & Migration Guide | Guide | Approved |
| RE-126 | docs/admin-setup-macos/10-kerberos-sso-extension.md | macOS Kerberos SSO Extension | Guide | Approved |
| RE-127 | docs/admin-setup-macos/11-graph-api-platform-credential.md | Graph API: Platform Credential Management | Guide | Approved |
| RE-128 | docs/admin-setup-linux/00-overview.md | Linux Admin Setup Overview | Guide | Pending |
| RE-129 | docs/admin-setup-linux/01-intune-linux-agent.md | Intune Linux Agent — Install and Configure | Guide | Approved |
| RE-130 | docs/admin-setup-linux/02-enrollment-profile.md | Linux Enrollment Profile — Admin Configuration | Guide | Approved |
| RE-131 | docs/admin-setup-linux/03-compliance-policy.md | Linux Compliance Policy — Admin Configuration | Guide | Approved |
| RE-132 | docs/admin-setup-linux/04-app-delivery.md | Linux App Delivery — Admin Overview | Guide | Approved |
| RE-133 | docs/admin-setup-linux/05-conditional-access.md | Linux Conditional Access — Admin Configuration | Guide | Approved |
| RE-134 | docs/admin-setup-8021x/00-overview.md | 802.1X Network Authentication: Admin Setup Guides | Guide | Pending |
| RE-135 | docs/admin-setup-8021x/01-eap-method-overview.md | 802.1X EAP Method Overview | Guide | Pending |
| RE-136 | docs/admin-setup-8021x/02-cert-delivery-foundation.md | 802.1X Certificate Delivery Foundation | Guide | Pending |
| RE-137 | docs/admin-setup-8021x/03-windows.md | Windows 802.1X Admin Setup: Wi-Fi and Wired | Guide | Pending |
| RE-138 | docs/admin-setup-8021x/04-macos.md | macOS 802.1X Admin Setup: Wi-Fi and Wired | Guide | Pending |
| RE-139 | docs/admin-setup-8021x/05-ios.md | iOS/iPadOS 802.1X Admin Setup: Wi-Fi and Wired | Guide | Pending |
| RE-140 | docs/admin-setup-8021x/06-android.md | Android Enterprise 802.1X Admin Setup: Wi-Fi | Guide | Pending |
| RE-141 | docs/admin-setup-8021x/07-linux.md | Linux 802.1X Admin Setup: EAP-TLS via nmcli | Guide | Pending |
| RE-142 | docs/reference/00-index.md | Reference Documentation | Reference | Pending |
| RE-143 | docs/reference/4-platform-capability-comparison.md | 5-Platform Capability Comparison: Windows, macOS, iOS/iPadOS, Android, Linux | Reference | Pending |
| RE-144 | docs/reference/android-capability-matrix.md | Intune: Android Capability Matrix — Modes by Feature | Reference | Pending |
| RE-145 | docs/reference/aosp-oem-matrix.md | Intune: AOSP OEM Matrix — RealWear / Zebra / Pico / HTC / Meta Quest | Reference | Pending |
| RE-146 | docs/reference/apv1-apv2-migration.md | APv1-to-APv2 Migration: Parallel Deployment Playbook | Reference | Pending |
| RE-147 | docs/reference/ca-enrollment-timing.md | Conditional Access Enrollment Timing: The Compliance Chicken-and-Egg Problem | Reference | Pending |
| RE-148 | docs/reference/compliance-timing.md | Compliance Policy Timing and State Transitions | Reference | Pending |
| RE-149 | docs/reference/deployment-reporting.md | Intune Deployment Reporting for Windows Autopilot | Reference | Pending |
| RE-150 | docs/reference/drift-detection.md | Registration and Profile Assignment Drift Detection | Reference | Pending |
| RE-151 | docs/reference/endpoints.md | Network Endpoints Reference | Reference | Pending |
| RE-152 | docs/reference/entra-prerequisites.md | Entra ID Prerequisite Configuration for Autopilot | Reference | Pending |
| RE-153 | docs/reference/esp-timeout-tuning.md | ESP Timeout Tuning Guide | Reference | Pending |
| RE-154 | docs/reference/gpo-to-intune.md | GPO-to-Intune Policy Migration Guide | Reference | Pending |
| RE-155 | docs/reference/imaging-to-autopilot.md | On-Premises Imaging to Autopilot Migration Guide | Reference | Pending |
| RE-156 | docs/reference/ios-capability-matrix.md | Intune: iOS/iPadOS Capability Matrix — Windows, macOS, iOS | Reference | Pending |
| RE-157 | docs/reference/licensing-matrix.md | Autopilot Licensing Requirements | Reference | Pending |
| RE-158 | docs/reference/linux-capability-matrix.md | Intune: Linux vs Windows Capability Matrix | Reference | Pending |
| RE-159 | docs/reference/macos-capability-matrix.md | Intune: macOS vs Windows Capability Matrix | Reference | Pending |
| RE-160 | docs/reference/macos-commands.md | macOS Terminal Commands Reference | Reference | Pending |
| RE-161 | docs/reference/macos-log-paths.md | macOS Log Paths and Configuration Profile Locations | Reference | Pending |
| RE-162 | docs/reference/network-infrastructure.md | Network Infrastructure Requirements for Windows Autopilot | Reference | Pending |
| RE-163 | docs/reference/new-batch-workflow.md | New Batch of Devices: End-to-End Operational Workflow | Reference | Pending |
| RE-164 | docs/reference/powershell-ref.md | PowerShell Function Reference | Reference | Pending |
| RE-165 | docs/reference/registry-paths.md | Autopilot Registry Paths Reference | Reference | Pending |
| RE-166 | docs/reference/security-baseline-conflicts.md | Security Baseline Interactions with Autopilot Provisioning | Reference | Pending |
| RE-167 | docs/reference/win32-app-packaging.md | Win32 App Packaging Best Practices for ESP Reliability | Reference | Pending |
| RE-168 | docs/error-codes/00-index.md | Error Code Index | Reference | Pending |
| RE-169 | docs/error-codes/01-mdm-enrollment.md | MDM Enrollment Errors (0x8018xxxx Series) | Reference | Pending |
| RE-170 | docs/error-codes/02-tpm-attestation.md | TPM Attestation Errors | Reference | Pending |
| RE-171 | docs/error-codes/03-esp-enrollment.md | ESP and Enrollment Errors | Reference | Pending |
| RE-172 | docs/error-codes/04-pre-provisioning.md | Pre-Provisioning and Self-Deploying Mode Errors | Reference | Pending |
| RE-173 | docs/error-codes/05-hybrid-join.md | Hybrid Join and Device Registration Errors | Reference | Pending |
| RE-174 | docs/error-codes/06-apv2-device-preparation.md | APv2 Device Preparation Failures | Reference | Pending |
| RE-175 | docs/end-user-guides/android-work-profile-setup.md | Set up your personal Android device for work (BYOD Work Profile) | Guide | Pending |
| RE-176 | docs/end-user-guides/linux-intune-portal-enrollment.md | Linux Intune Portal Enrollment — User Guide | Guide | Pending |
| RE-177 | docs/apv1-vs-apv2.md | APv1 vs APv2: Which Autopilot Are You Troubleshooting? | Reference | Pending |
| RE-178 | docs/windows-vs-macos.md | Windows Autopilot vs macOS ADE: Concept Comparison | Reference | Pending |
