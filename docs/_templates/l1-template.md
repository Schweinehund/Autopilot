<!-- L1 RUNBOOK TEMPLATE
     Usage: Copy this file as your starting point for any L1 Service Desk runbook.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set applies_to to APv1, APv2, or both
     - Replace all [bracketed placeholders] with actual content
     - Do NOT include PowerShell commands, registry paths, or log file references
     - Do NOT link to L2-audience content from within steps
     - Link to the glossary for any Autopilot-specific terms
     Reviewer: L1 Team Lead (role, not person name)
-->
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# [Issue Title]

## Prerequisites

- [What the L1 agent needs before starting — e.g., Intune portal access, device serial number]
- [Any information to collect from the user before beginning]

## Steps

1. [First action — use imperative voice, e.g., "Open the Intune portal"]
2. [Second action]
3. [Continue numbered steps — each step should have one clear action]

## Escalation Criteria

Escalate to L2 if:
- [Condition that indicates L1 cannot resolve — e.g., "Error persists after retry"]
- [Condition requiring technical investigation]

**Before escalating, collect:**
- [Data item 1 — e.g., "Device serial number"]
- [Data item 2 — e.g., "Screenshot of error message"]
- [Data item 3 — e.g., "Intune device status page"]
