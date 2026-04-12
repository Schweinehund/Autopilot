<!-- L2 INVESTIGATION GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any L2 Desktop Engineer guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set applies_to to APv1, APv2, or both
     - Replace all [bracketed placeholders] with actual content
     - Link to reference files for registry paths, PowerShell functions, and endpoints
       Do NOT define paths or function signatures inline
     - Include actual PowerShell commands and registry paths in investigation steps
     - Document multiple resolution scenarios where applicable
     - Include Triage block in every L2 guide — route L1 escalation data to skip initial collection
     Reviewer: L2 Desktop Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L2
---

> **Version gate:** [This guide applies to Windows Autopilot (classic). | This guide covers Autopilot Device Preparation (APv2).] _Remove inapplicable variant._
> For [APv2 Device Preparation | APv1 (classic Autopilot)], see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# [Issue Title]

## Triage

**From L1 escalation ([NODE_ID](../decision-trees/TREE_FILE.md))?**
L1 collected: [list data items from L1 runbook escalation criteria].
Skip to Step 2.

**Starting fresh?** Begin at Step 1.

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
