---
phase: 14
phase_name: apv2-l2-runbooks
status: issues_found
depth: standard
files_reviewed: 12
findings:
  critical: 1
  warning: 2
  info: 2
  total: 5
reviewed_at: 2026-04-12
---

# Phase 14 Code Review (Post-Gap Closure)

Reviewed 12 files after Plan 03 gap closure:
docs/_templates/l2-template.md, docs/decision-trees/04-apv2-triage.md,
docs/error-codes/06-apv2-device-preparation.md,
docs/l1-runbooks/06-apv2-deployment-not-launched.md, docs/l1-runbooks/07-apv2-apps-not-installed.md,
docs/l1-runbooks/08-apv2-apv1-conflict.md, docs/l1-runbooks/09-apv2-deployment-timeout.md,
docs/l2-runbooks/00-index.md, docs/l2-runbooks/06-apv2-log-collection.md,
docs/l2-runbooks/07-apv2-event-ids.md, docs/l2-runbooks/08-apv2-deployment-report.md,
docs/lifecycle-apv2/00-overview.md

Plan 03 gap closure confirmed: all "Phase 14" placeholders resolved, template version gate
is framework-neutral, Get-CimInstance replaces Get-WmiObject, l2-runbooks/00-index.md metadata
updated. Prior review issues CR-01, CR-02, CR-03, WR-01, WR-03 are resolved.

---

## Critical Issues

### CR-01: Wrong event log name in lifecycle overview L2 detail block

**File:** docs/lifecycle-apv2/00-overview.md
**Line:** 88
**Confidence:** 100

The `<details>` block states the APv2 event log is `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`. This is the APv1 MDM enrollment log. The correct APv2 BootstrapperAgent log path is `Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent`, as documented in docs/l2-runbooks/06-apv2-log-collection.md Step 2b. An L2 engineer following the overview will collect the wrong event log.

**Fix:** Replace `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` with `Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent`.

---

## Warning Issues

### WR-01: APv2 L2 runbooks missing ## Tool References section

**File:** docs/l2-runbooks/06-apv2-log-collection.md, docs/l2-runbooks/07-apv2-event-ids.md, docs/l2-runbooks/08-apv2-deployment-report.md
**Line:** end of each file (section missing)
**Confidence:** 85

All five existing APv1 L2 runbooks (01-05) include `## Tool References` linking to
reference/powershell-ref.md, reference/registry-paths.md, and reference/endpoints.md.
None of the three APv2 L2 runbooks include this section. The APv2 guides use PowerShell
commands (06 Steps 2-3) and reference network endpoints (07 event ID 4002 cites
login.microsoftonline.com and graph.microsoft.com), making powershell-ref.md and
endpoints.md directly applicable.

**Fix:** Add `## Tool References` to all three files. Applicable entries:
powershell-ref.md for 06 and 08 (collection commands); endpoints.md for 07 (endpoint
verification). Registry paths not applicable to APv2.

### WR-02: Overview links to log collection guide instead of event ID reference

**File:** docs/lifecycle-apv2/00-overview.md
**Line:** 90
**Confidence:** 95

Link text says "Event IDs are documented in the [L2 APv2 Log Collection Guide](../l2-runbooks/06-apv2-log-collection.md)" but the log collection guide documents how to export logs, not event IDs. The event ID lookup table is in docs/l2-runbooks/07-apv2-event-ids.md.

**Fix:** Change link text and target to `[APv2 Event ID Reference](../l2-runbooks/07-apv2-event-ids.md)`.

---

## Info Issues

### IR-01: TREE_FILE.md in template triage block not in bracket notation

**File:** docs/_templates/l2-template.md
**Line:** 28
**Confidence:** 80

Triage block reads `**From L1 escalation ([NODE_ID](../decision-trees/TREE_FILE.md))?**`.
NODE_ID uses bracket notation signaling required substitution but TREE_FILE.md is embedded
in the URL without brackets. A new author may miss that the link path also needs updating.

**Fix:** Use `../decision-trees/[TREE_FILE].md` or add `<!-- replace TREE_FILE with actual decision tree filename -->`.

### IR-02: Bare external URL in version gate

**File:** docs/l2-runbooks/07-apv2-event-ids.md
**Line:** 8
**Confidence:** 80

Version gate contains bare external URL `https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq`. All other Phase 14 cross-references use relative internal links. Microsoft Autopilot URLs have moved historically.

**Fix:** Remove the URL (apv1-vs-apv2.md already covers disambiguation) or add `<!-- external link -- verify URL on each review_by cycle -->`.

---

## Resolved from Prior Review

These issues from the pre-gap-closure review (Plans 01-02) were fixed by Plan 03:

- ~~CR-01~~: l2-template.md version gate now uses bracketed APv1/APv2 variant choice
- ~~CR-02~~: APv2 triage tree escalation table now links to real L2 runbooks
- ~~CR-03~~: lifecycle-apv2/00-overview.md link fixed to 06-apv2-log-collection.md, "(Phase 14)" removed
- ~~WR-01~~: l2-runbooks/00-index.md last_verified updated to 2026-04-12, review_by to 2026-07-11
- ~~WR-03~~: Get-WmiObject replaced with Get-CimInstance in 06-apv2-log-collection.md

---

## Checks Passed

- All 12 reviewed files exist with valid frontmatter (last_verified, review_by, applies_to, audience)
- Zero "Phase 14" placeholder occurrences in any of the 12 files
- Get-CimInstance -ClassName used in 06-apv2-log-collection.md line 66; no Get-WmiObject present
- Template version gate uses bracketed APv1/APv2 variant choice with "Remove inapplicable variant"
- l2-runbooks/00-index.md has last_verified: 2026-04-12 and review_by: 2026-07-11
- GFM anchors verified: #apv2-autopilot-device-preparation-runbooks, #escalation-data, #entra-join-failed-phase-policy-installation, #enrollment-failed-phase-policy-installation, #deployment-timeout -- all match actual headings
- Triage tree escalation data resolved: APE1/APE2 link to 08-apv2-deployment-report.md; APE3 links to both 08 and 07
- L1 audience boundary maintained: zero PowerShell commands, registry paths, or HKLM/HKCU references in L1 runbooks 06-09
- All four L1 runbooks link to ../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks
- APE1/APE2/APE3 node IDs consistent across 04-apv2-triage.md, l2-runbooks/00-index.md, 06-apv2-log-collection.md, and 08-apv2-deployment-report.md
- All new Phase 14 files use review_by: 2026-07-11 (90-day cycle from 2026-04-12)
- No unreplaced [bracketed placeholder] strings in any of the 12 reviewed files
- All three APv2 L2 runbooks have Triage block, numbered investigation steps, and Escalation Ceiling
- Prerequisite chain (06 as gate for 07 and 08) documented consistently in all three L2 runbooks and in 00-index.md
