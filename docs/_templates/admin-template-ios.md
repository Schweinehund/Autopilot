<!-- iOS/iPadOS ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any iOS/iPadOS admin configuration guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set platform to iOS (this template is iOS/iPadOS-specific)
     - Replace all [bracketed placeholders] with actual content
     - Every configurable setting MUST have a "What breaks if misconfigured" callout
       specifying which portal the misconfiguration occurs in AND where the symptom manifests
     - Every supervised-only setting MUST have the supervised-only callout (see pattern below)
     - Use imperative voice for steps ("Navigate to...", "Select...", "Enter...")
     - Steps that span both ABM and Intune portals MUST use #### In Apple Business Manager and
       #### In Intune admin center sub-sections
     - No Terminal/CLI steps -- iOS has no command-line access; all admin actions are portal-based
     - Include Renewal/Maintenance section ONLY when the guide's subject has a
       renewable component (e.g., ADE token, APNs certificate). Omit otherwise.
     Reviewer: iOS Platform Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS configuration via Apple Business Manager and Intune.
> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

<!-- SUPERVISED-ONLY CALLOUT PATTERN
     Use this exact format for every supervised-only setting. No variations.
     Place immediately AFTER the setting description, BEFORE any configuration steps.
     Link target is ALWAYS the Phase 26 conceptual page, NOT the enrollment profile guide.

     > 🔒 **Supervised only:** [feature/setting name] requires supervised mode. [1-2 sentence explanation of what this means for unsupervised devices.] See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).
-->

# [Admin Task Title]

## Prerequisites

- [Required admin role -- e.g., Intune Administrator, ABM Device Manager]
- [Required license or subscription -- e.g., Microsoft Intune Plan 1, Apple Business Manager account]
- [Prior configuration that must be completed first -- link to that guide]
- [Required portal access -- specify both ABM and Intune admin center if applicable]

## Steps

### Step 1: [Configuration action]

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com).
2. Navigate to **[section]** > **[sub-section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {specify portal where symptom manifests, which may differ from the portal where the misconfiguration occurs}.]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/[runbook-filename].md)

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Apple** > **[path]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {specify portal}.]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/[runbook-filename].md)

### Step 2: [Next configuration action]

[Repeat portal-scoped sub-sections as needed. Not every step requires both portals -- use only the sub-sections that apply to the step's actions.]

## Verification

- [ ] [How to confirm the configuration is correct in ABM -- specific ABM page to check, expected state]
- [ ] [How to confirm the configuration is correct in Intune -- specific Intune portal location, expected state]

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| [Setting X set to wrong value] | [ABM or Intune] | [What admin or user sees, and in which portal the symptom manifests] | [Runbook Title](../l1-runbooks/[runbook-filename].md) |
| [Setting Y missing] | [ABM or Intune] | [What happens] | [Runbook Title](../l1-runbooks/[runbook-filename].md) |

<!-- Include this section ONLY if the guide's subject has a renewable component
     (e.g., ADE token, APNs certificate). Delete this entire section if not applicable. -->

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| [e.g., APNs certificate] | [e.g., 365 days] | [What stops working] | [Brief steps or link to renewal procedure] |

<!-- Runbook links should point to the appropriate iOS L1 runbook in docs/l1-runbooks/ (Phase 30 range) once available. -->

## See Also

- [Related iOS admin guide](link)
- [iOS/iPadOS ADE Lifecycle Overview](../ios-lifecycle/01-ade-lifecycle.md)
- [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md)
- [Apple Provisioning Glossary](../_glossary-macos.md)
