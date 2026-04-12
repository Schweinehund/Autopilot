---
status: testing
phase: 07-navigation
source: [07-01-SUMMARY.md, 07-02-SUMMARY.md]
started: 2026-03-24T00:00:00Z
updated: 2026-03-24T00:00:00Z
---

## Current Test

number: 1
name: Master Index — L1 Section Contains Only L1 Content
expected: |
  Open docs/index.md. The "Service Desk (L1)" section links to decision trees, L1 runbooks index, and L1 quick-reference card only. No registry paths, PowerShell commands, event log paths, or L2 runbook links appear in this section.
awaiting: user response

## Tests

### 1. Master Index — L1 Section Contains Only L1 Content
expected: Open docs/index.md. The "Service Desk (L1)" section links to decision trees, L1 runbooks index, and L1 quick-reference card only. No registry paths, PowerShell commands, event log paths, or L2 runbook links appear in this section.
result: [pending]

### 2. Master Index — L2 Section Contains Only L2 Content
expected: The "Desktop Engineering (L2)" section in docs/index.md links to L2 runbooks index, log collection guide, PowerShell reference, registry paths, network endpoints, and L2 quick-reference card. No scripted L1 procedures, user communication scripts, or L1 runbook links appear in this section.
result: [pending]

### 3. Master Index — Shared References Not Duplicated
expected: The "Shared References" section at the bottom of docs/index.md lists glossary, error code index, lifecycle overview, APv1 vs APv2, and common issues. None of these items also appear in the L1 or L2 sections above.
result: [pending]

### 4. Common Issues — Pure Navigation Index
expected: Open docs/common-issues.md. All 8 original issue categories are present as H2 headers. Each category has a one-line symptom description followed by L1 and/or L2 runbook links. No PowerShell commands, no "Diagnostic Steps" headings, no "Remediation" sections, no code blocks remain.
result: [pending]

### 5. Common Issues — Device Renamed Inline Tip
expected: The "Device Renamed" section in docs/common-issues.md retains 3-4 lines of inline content (sync delay explanation) since no runbook exists for this issue. All other sections are pure navigation links.
result: [pending]

### 6. L1 Quick-Reference Card — One Screen, No Technical Content
expected: Open docs/quick-ref-l1.md. Contains a numbered top-5 checklist, escalation trigger bullets, and links to decision trees and runbooks. No PowerShell commands, no registry paths (HKLM), no event log references. Content fits on one screen (under 60 lines of content).
result: [pending]

### 7. L2 Quick-Reference Card — Copy-Pasteable Commands
expected: Open docs/quick-ref-l2.md. Contains the exact mdmdiagnosticstool.exe command with flags, 6 PowerShell diagnostic commands with full syntax, 4 Event Viewer log path strings, 4 registry paths, and event IDs grouped by scenario. All values are literal copy-pasteable strings, not descriptions.
result: [pending]

## Summary

total: 7
passed: 0
issues: 0
pending: 7
skipped: 0
blocked: 0

## Gaps

[none yet]
