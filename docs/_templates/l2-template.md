<!-- L2 INVESTIGATION GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any L2 Desktop Engineer guide.
     Rules:
     - Fill in last_verified and review_by dates at doc creation time (review_by = last_verified + 90 days)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel —
       REPLACE with actual authoring date when copying this template
     - Set applies_to to APv1, APv2, both, ADE, or all
     - Replace all [bracketed placeholders] with actual content
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - Set owner to the person or role responsible for this document
     - Set doc_type: Runbook (this template is Runbook-class only)
     - Set platform to the appropriate D1-mapped value — replace 'all' if this runbook covers a
       specific platform. Valid values: Windows | macOS | iOS | Android | Linux | all
     - Update the EEE block line (immediately after the frontmatter close) to match your
       platform label and assigned Doc ID before publishing
     - Link to reference files for registry paths, PowerShell functions, and endpoints
       Do NOT define paths or function signatures inline
     - Include actual PowerShell commands and registry paths in investigation steps
     - Document multiple resolution scenarios where applicable
     - Owner promotes status from Draft to Approved when content is reviewed and ready
     Reviewer: L2 Desktop Lead (role, not person name)
-->
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Runbook
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both | ADE | all
audience: L2
---

**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Issue Title]

## Summary

[2–3 sentences: scope, audience (L2 desktop engineers), and escalation context. Minimum 30 words. State what issue this runbook investigates, which diagnostic tools and commands are used (PowerShell, registry, event logs), and under what circumstances this runbook is entered (typically from L1 escalation with a pre-collected error description and device info).]

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Context

[What this issue is, when it typically occurs, and what triggers it. Include relevant background for an L2 engineer who may not have seen this specific failure before.]

## Investigation

### Step 1: [Investigation action]

[Detailed diagnostic steps. Include registry paths, event IDs, and PowerShell commands as needed.]

```powershell
# [Example command]
```

### Step 2: [Next investigation action]

[Continue with numbered investigation steps.]

## Resolution

### Scenario A: [Root cause description]

[Fix steps for this specific root cause.]

### Scenario B: [Alternative root cause]

[Fix steps for alternative root cause.]

## Tool References

- [PowerShell function](../reference/powershell-ref.md#function-name) — [what it does in this context]
- [Registry path](../reference/registry-paths.md) — [which path and why]
- [Network endpoints](../reference/endpoints.md) — [if connectivity is relevant]
