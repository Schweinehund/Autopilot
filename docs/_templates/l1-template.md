<!-- L1 RUNBOOK TEMPLATE
     Usage: Copy this file as your starting point for any L1 Service Desk runbook.
     Rules:
     - Fill in last_verified and review_by dates at doc creation time (review_by = last_verified + 90 days)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel —
       REPLACE with actual authoring date when copying this template
     - Set applies_to to APv1, APv2, or both
     - Replace all [bracketed placeholders] with actual content
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - Set owner to the person or role responsible for this document
     - Set doc_type: Runbook (this template is Runbook-class only)
     - Set platform to the appropriate D1-mapped value — replace 'all' if this runbook covers a
       specific platform. Valid values: Windows | macOS | iOS | Android | Linux | all
     - Update the EEE block line (immediately after the frontmatter close) to match your
       platform label and assigned Doc ID before publishing
     - Do NOT include PowerShell commands, registry paths, or log file references
     - Do NOT link to L2-audience content from within steps
     - Link to the glossary for any Autopilot-specific terms
     - Owner promotes status from Draft to Approved when content is reviewed and ready
     Reviewer: L1 Team Lead (role, not person name)
-->
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Runbook
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L1
---

**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Issue Title]

## Summary

[2–3 sentences: scope, audience (L1 service desk), and safety guardrail. Minimum 30 words. Open with the read-only scope banner: this runbook covers read-only diagnostic steps only — no registry edits, no PowerShell execution, no destructive actions. All remediation steps requiring elevated access or technical investigation must be escalated to L2.]

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

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
