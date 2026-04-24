<!-- L2 INVESTIGATION GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any L2 Desktop Engineer guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set applies_to to APv1, APv2, both, ADE, or all
     - Replace all [bracketed placeholders] with actual content
     - Link to reference files for registry paths, PowerShell functions, and endpoints
       Do NOT define paths or function signatures inline
     - Include actual PowerShell commands and registry paths in investigation steps
     - Document multiple resolution scenarios where applicable
     - Set platform to Windows, macOS, iOS, or all
     Reviewer: L2 Desktop Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both | ADE | all
audience: L2
platform: Windows | macOS | iOS | Android | all
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# [Issue Title]

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
