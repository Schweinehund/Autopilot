---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS admin setup across all enrollment paths: corporate ADE, Device Enrollment, account-driven User Enrollment, and MAM-WE.
> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).

# iOS/iPadOS Admin Setup

This overview routes Intune administrators to the correct iOS/iPadOS admin setup path. Corporate devices purchased through Apple Business Manager follow the Automated Device Enrollment (ADE) chain (guides 01-06). Personal-device and non-ABM paths — Device Enrollment, account-driven User Enrollment, and app-layer MAM-WE — are parallel alternatives, each with its own prerequisites and trade-offs. Choose a path from the diagram below, then follow the guide for that path.

## Setup Sequence

```mermaid
flowchart TD
    START[Admin lands here] --> CHOOSE{Choose path}
    CHOOSE -->|Corporate ADE| A[1. APNs Certificate]
    A --> B[2. ABM/ADE Token]
    B --> C[3. ADE Enrollment Profile]
    C --> D[4. Configuration Profiles]
    C --> E[5. App Deployment]
    C --> F[6. Compliance Policies]
    CHOOSE -->|BYOD w/o ABM| G[7. Device Enrollment]
    CHOOSE -->|Privacy-preserving BYOD| H[8. User Enrollment]
    CHOOSE -->|App-layer only| I[9. MAM App Protection]
```

1. **[APNs Certificate](01-apns-certificate.md)** -- Create and maintain the Apple Push Notification certificate that enables all Apple MDM communication. This certificate is shared infrastructure -- one expired certificate breaks iOS, iPadOS, AND macOS management simultaneously.

2. **[ABM/ADE Token](02-abm-token.md)** -- Configure the enrollment program token linking Apple Business Manager to Intune for iOS/iPadOS device syncing. Shared portal steps cross-reference the macOS ABM guide; only iOS-specific differences are documented inline.

3. **[ADE Enrollment Profile](03-ade-enrollment-profile.md)** -- Create the enrollment profile that configures supervised mode, authentication method, Setup Assistant customization, and locked enrollment for corporate iOS/iPadOS devices.

4. **[Configuration Profiles](04-configuration-profiles.md)** — Deploy Wi-Fi, VPN, Email, Certificates, Device Restrictions (with supervised-only callouts per category), and Home Screen Layout. Configuration profiles enforce settings; compliance policies detect non-compliance.

5. **[App Deployment](05-app-deployment.md)** — Deploy iOS/iPadOS apps via VPP (device-licensed or user-licensed), LOB (.ipa), or Store apps without VPP. Silent install requires supervised mode AND device licensing.

6. **[Compliance Policies](06-compliance-policy.md)** — Configure OS version gates, jailbreak detection, passcode requirements, and Actions for Noncompliance. Includes dedicated Conditional Access timing section covering the enrollment-to-first-evaluation window.

## Prerequisites

Before starting the iOS/iPadOS ADE configuration guides:

- [ ] **Apple Push Notification certificate Apple ID** -- A company email address Apple ID (NOT a personal Apple ID). As a best practice, use a distribution list monitored by more than one person.
- [ ] **Apple Business Manager account** -- A Managed Apple ID with Device Manager or Administrator role in ABM.
- [ ] **Intune Administrator role** -- Or a custom RBAC role with enrollment management permissions.
- [ ] **Microsoft Intune Plan 1** (or higher) subscription.
- [ ] **iOS/iPadOS enrollment path selected** -- Confirm ADE is the appropriate path for your deployment. See [Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md).

## Portal Navigation Note

The Intune admin center is actively rolling out updated navigation for enrollment configuration. Portal paths referenced in these guides reflect the current documented experience. If menu locations differ from what is described:

- Look for equivalent options under **Devices** > **Device onboarding** > **Enrollment** > **Apple** tab.
- The settings and their effects remain the same regardless of navigation path.
- Portal navigation may vary by Intune admin center version and tenant rollout timing.

## Cross-Platform References

- [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md) -- macOS ADE configuration (shared ABM portal steps)
- [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md) -- Enrollment type comparison and supervision concept
- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md) -- End-to-end ADE enrollment pipeline

## See Also

- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)
- [Apple Provisioning Glossary](../_glossary-macos.md)
- [Windows APv1 Admin Setup](../admin-setup-apv1/00-overview.md)
- [macOS Admin Setup](../admin-setup-macos/00-overview.md)

---
*Next step: [APNs Certificate](01-apns-certificate.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-16 | Extended overview to include Phase 28 guides 04/05/06 and updated Mermaid diagram to 6-node graph | -- |
| 2026-04-16 | Initial version -- iOS admin setup overview with Mermaid diagram and 3-guide setup sequence | -- |
