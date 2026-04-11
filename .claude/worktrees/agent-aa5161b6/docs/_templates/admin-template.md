<!-- ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any admin configuration guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set applies_to to APv1, APv2, or both
     - Replace all [bracketed placeholders] with actual content
     - Every configurable setting MUST have a "What breaks if misconfigured" callout
     - Use imperative voice for steps ("Navigate to...", "Select...", "Enter...")
     - Include full Intune portal navigation paths (e.g., Intune admin center > Devices > ...)
     - Link to relevant troubleshooting runbooks from "what breaks" callouts
     Reviewer: Intune Admin Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
---

> **Version gate:** [This guide covers Windows Autopilot (classic) | This guide covers Windows Autopilot Device Preparation (APv2)].
> For [the other framework], see [link].
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# [Admin Task Title]

## Prerequisites

- [Required admin role or RBAC permissions]
- [Required license or subscription]
- [Prior configuration that must be completed first -- link to that guide]

## Steps

### Step 1: [Configuration action]

1. Navigate to **Intune admin center** > [full portal path].
2. Select **[option]**.
3. Configure **[setting name]**: [value or instruction].

   > **What breaks if misconfigured:** [Specific downstream failure this causes. Include: what the admin will see, what the end user will see, and link to the troubleshooting runbook that covers this failure.]
   > See: [Troubleshooting Runbook Title](../runbooks-l1/relevant-runbook.md)

4. [Next action in this step].

### Step 2: [Next configuration action]

1. [Portal action with full path].
2. Configure **[setting name]**: [value].

   > **What breaks if misconfigured:** [Consequence description.]

## Verification

- [ ] [How to confirm the configuration is correct -- specific portal location to check, expected state]
- [ ] [Second verification check]

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| [Setting X set to wrong value] | [What admin or user sees] | [Link to runbook] |
| [Setting Y missing] | [What happens] | [Link to runbook] |

## See Also

- [Related admin guide](link)
- [Relevant lifecycle overview](link)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
