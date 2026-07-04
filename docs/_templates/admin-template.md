<!-- ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any admin configuration guide.
     Rules:
     - Fill in last_verified and review_by dates at doc creation time (review_by = last_verified + 90 days)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel —
       REPLACE with actual authoring date when copying this template
     - Set applies_to to APv1, APv2, or both
     - Replace all [bracketed placeholders] with actual content
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - Set owner to the person or role responsible for this document
     - Set doc_type: Guide (this template is Guide-class only)
     - Set platform to the appropriate D1-mapped value — replace 'all' if this guide covers a
       specific platform. Valid values: Windows | macOS | iOS | Android | Linux | all
     - Update the EEE block line (immediately after the frontmatter close) to match your
       platform label and assigned Doc ID before publishing
     - Every configurable setting MUST have a "What breaks if misconfigured" callout
     - Use imperative voice for steps ("Navigate to...", "Select...", "Enter...")
     - Include full Intune portal navigation paths (e.g., Intune admin center > Devices > ...)
     - Link to relevant troubleshooting runbooks from "what breaks" callouts
     - Owner promotes status from Draft to Approved when content is reviewed and ready
     Reviewer: Intune Admin Lead (role, not person name)
-->
---
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: all
---

**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Admin Task Title]

## Summary

[2–3 sentences describing the scope, target audience, and any safety or version constraints for this guide. Minimum 30 words. State which Autopilot framework (APv1, APv2, or both) this guide covers, the platform it applies to, and the admin role or permissions required to follow the steps.]

> **Version gate:** [This guide covers Windows Autopilot (classic) | This guide covers Windows Autopilot Device Preparation (APv2)].
> For [the other framework], see [link].
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

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
