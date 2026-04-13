<!-- MACOS ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any macOS admin configuration guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set platform to macOS (this template is macOS-specific)
     - Replace all [bracketed placeholders] with actual content
     - Every configurable setting MUST have a "What breaks if misconfigured" callout
       specifying which portal the misconfiguration occurs in AND where the symptom manifests
     - Use imperative voice for steps ("Navigate to...", "Select...", "Enter...")
     - Include full navigation paths for both ABM and Intune admin center portals
     - Steps that span both portals MUST use #### In Apple Business Manager and
       #### In Intune admin center sub-sections
     - Runbook links use [TBD - Phase 24] until macOS troubleshooting runbooks exist
     - Include Renewal/Maintenance section ONLY when the guide's subject has a
       renewable component (e.g., ADE token, APNs certificate). Omit otherwise.
     Reviewer: macOS Platform Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

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
   > See: [Troubleshooting Runbook Title](TBD - Phase 24)

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Apple** > **[path]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {specify portal}.]
   > See: [Troubleshooting Runbook Title](TBD - Phase 24)

### Step 2: [Next configuration action]

[Repeat portal-scoped sub-sections as needed. Not every step requires both portals -- use only the sub-sections that apply to the step's actions.]

## Verification

- [ ] [How to confirm the configuration is correct in ABM -- specific ABM page to check, expected state]
- [ ] [How to confirm the configuration is correct in Intune -- specific Intune portal location, expected state]

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| [Setting X set to wrong value] | [ABM or Intune] | [What admin or user sees, and in which portal the symptom manifests] | [TBD - Phase 24] |
| [Setting Y missing] | [ABM or Intune] | [What happens] | [TBD - Phase 24] |

<!-- Include this section ONLY if the guide's subject has a renewable component
     (e.g., ADE token, APNs certificate). Delete this entire section if not applicable. -->

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| [e.g., ADE token] | [e.g., 365 days] | [What stops working] | [Brief steps or link to renewal procedure] |

## See Also

- [Related macOS admin guide](link)
- [macOS ADE Lifecycle Overview](link)
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md)
- [macOS Provisioning Glossary](../_glossary-macos.md)
