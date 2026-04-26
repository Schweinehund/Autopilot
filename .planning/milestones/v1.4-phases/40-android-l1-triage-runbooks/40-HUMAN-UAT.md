---
status: partial
phase: 40-android-l1-triage-runbooks
source: [40-VERIFICATION.md]
started: 2026-04-23T00:00:00Z
updated: 2026-04-23T00:00:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Mermaid rendering visual confirmation — `docs/decision-trees/08-android-triage.md`
expected: When rendered in GitHub-flavored markdown (e.g., GitHub file preview or GitLab view), the Mermaid graph TD displays:
- Root node `AND1` with 6 labeled branches (Fully managed / Work profile / Dedicated / ZTE / AOSP / Don't know)
- 6 green (fill: #28a745) terminal nodes `ANDR22`..`ANDR27` linking via `click` directives to runbooks 22-27
- 3 red (fill: #dc3545) terminal nodes `ANDE1`/`ANDE2`/`ANDE3` for L2 escalation
- All `click` directives resolve to valid file paths under `../l1-runbooks/`
result: [pending]

### 2. L1 ticket-routing cognitive walkthrough — ROADMAP SC #1 final gate
expected: Given three fabricated tickets (below), each reaches a runbook in ≤ 2 decision diamonds from the AND1 root, confirming the "within 5 decision nodes" budget in ROADMAP SC #1:
- Ticket A: "My personal phone won't connect to work. I tried to enroll and it says my device can't be managed." → should route to runbook 22 (enrollment blocked) via BYOD → enrollment-restriction-visible branch
- Ticket B: "Corporate phone, fully managed. Device shows up in Intune but the work apps I need never installed." → should route to runbook 26 (MGP app not installed) via COBO → app-missing branch
- Ticket C: "Kiosk device won't enroll at Zero-Touch setup. Stuck on consumer welcome screen." → should route to runbook 27 (ZTE failed) via ZTE → enrollment-never-started branch
result: [pending]

### 3. ZTE portal UI verification — runbook 27 click-path specifics
expected: An Intune admin with active access to the Zero-Touch customer portal (`enterprise.google.com/android/zero-touch/customers`) opens `docs/l1-runbooks/27-android-zte-enrollment-failed.md` and confirms each `<!-- verify UI at execute time -->` HTML comment is followed by prose matching the current 2026 portal layout (sidebar nav, device-claim workflow, KME/ZT conflict resolution). Any discrepancy is logged as a `gaps_found` item for a follow-up gap-closure cycle.
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps

_None yet — populated as human testing surfaces issues._
