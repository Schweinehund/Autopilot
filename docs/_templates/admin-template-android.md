<!-- ANDROID ENTERPRISE ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any Android Enterprise admin configuration guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 60 days, NOT 90)
     - Set platform to Android (this template is Android Enterprise-specific)
     - Replace all [bracketed placeholders] with actual content
     - Every configurable setting MUST have a "What breaks if misconfigured" callout
       specifying which portal the misconfiguration occurs in AND where the symptom
       manifests (often a DIFFERENT portal — tri-portal cross-portal symptoms are the norm)
     - Use imperative voice for steps ("Navigate to...", "Select...", "Enter...")
     - Include full navigation paths for Intune admin center, Managed Google Play, and
       Zero-Touch portal (when applicable)
     - Steps that span portals MUST use #### In Intune admin center, #### In Managed Google Play,
       and #### In Zero-Touch portal sub-sections (in that order)
     - The #### In Managed Google Play subsection is MANDATORY for all GMS-based modes (COBO,
       BYOD, Dedicated, ZTE). Only AOSP guides omit MGP.
     - The #### In Zero-Touch portal subsection is OPTIONAL — delete it entirely for BYOD Work
       Profile and AOSP admin guides per the HTML comment immediately preceding that subsection.
     - Include the ## Renewal / Maintenance section in EVERY Android admin guide — MGP binding
       and ZT reseller relationship always have maintenance obligations. Do NOT delete this
       section (unlike iOS/macOS templates where it is optional).
     - Do NOT link to docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md, or
       docs/index.md (Android cross-platform navigation integration is deferred post-v1.4).
     Reviewer: Android Platform Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: Android
---

# [Android Admin Guide Title — e.g., "Bind Managed Google Play" or "Configure Zero-Touch Enrollment"]

> **Platform gate:** This guide covers [Android Enterprise feature/mode — e.g., "Managed Google Play binding" or "Fully Managed COBO enrollment"] configuration via Intune admin center, Managed Google Play, and (where applicable) the Zero-Touch portal.
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md). For macOS ADE, see [macOS Admin Setup](../admin-setup-macos/00-overview.md). For Windows Autopilot setup, see [Windows Admin Setup](../admin-setup-apv1/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

<!-- "What breaks if misconfigured" CALLOUT PATTERN
     Use this exact format after every configurable setting. No variations.
     Place immediately AFTER the action step, BEFORE the next step.
     Tri-portal cross-portal symptom documentation is REQUIRED — a misconfiguration
     in Managed Google Play may surface as a symptom in Intune admin center; a
     misconfiguration in Zero-Touch portal may surface as a symptom on the device itself.

     > **What breaks if misconfigured:** [Consequence]. Symptom appears in:
     > [portal where the admin or user notices the failure — often DIFFERENT from
     > the portal where the misconfiguration was set].
     > See: [Runbook Title](../l1-runbooks/[filename].md)
-->

## Prerequisites

- [Required admin role — e.g., Intune Administrator, Global Administrator for tenant-scoped MGP binding]
- [Required license or subscription — e.g., Microsoft Intune Plan 1, Managed Google Play bound via Entra account (preferred since August 2024), Zero-Touch portal reseller relationship]
- [Prior configuration that must be completed first — e.g., "Complete MGP binding (see 01-managed-google-play.md)" — link to that guide]
- [Required portal access — specify which of Intune admin center / Managed Google Play / Zero-Touch portal the admin must have access to for this guide]

## Steps

### Step 1: [Configuration action]

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Android** > **Enrollment** > **[path]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [portal where the admin or user notices the failure — often different from the portal where the misconfiguration was set].
   > See: [Runbook Title](../l1-runbooks/[filename].md)

#### In Managed Google Play

1. Sign in to [Managed Google Play](https://play.google.com/work).
2. Navigate to **[section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [often Intune admin center, even though the misconfiguration was made here].
   > See: [Runbook Title](../l1-runbooks/[filename].md)

<!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
     corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
     via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
     admin guides (neither uses the Zero-Touch portal). -->

#### In Zero-Touch portal

1. Sign in to [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers).
2. Navigate to **[section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [portal].
   > See: [Runbook Title](../l1-runbooks/[filename].md)

### Step 2: [Next configuration action]

[Repeat the tri-portal sub-section pattern per the rules above — include #### In Intune admin center and #### In Managed Google Play always; include #### In Zero-Touch portal only if applicable to this guide's mode.]

## Verification

- [ ] [How to confirm the configuration is correct in Intune admin center — specific Intune portal location, expected state]
- [ ] [How to confirm the configuration is correct in Managed Google Play — specific MGP section, expected state]
- [ ] [How to confirm the configuration is correct in Zero-Touch portal — specific ZT portal section, expected state — OMIT this checklist item if this guide does not use the Zero-Touch portal]

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| [Setting X set to wrong value] | [Intune admin center \| Managed Google Play \| Zero-Touch portal] | [What admin or user sees, and in which portal the symptom manifests — often different from where the misconfiguration occurred] | [Runbook Title](../l1-runbooks/[runbook-filename].md) |
| [Setting Y missing] | [Intune admin center \| Managed Google Play \| Zero-Touch portal] | [What happens] | [Runbook Title](../l1-runbooks/[runbook-filename].md) |
| [Cross-portal example: MGP app approval missing] | Managed Google Play | App fails to install on target device; symptom visible in Intune admin center app-assignment status column | [MGP App Not Installed Runbook](../l1-runbooks/26-mgp-app-not-installed.md) |
