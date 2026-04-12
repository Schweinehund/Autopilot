---
phase: 14-apv2-l2-runbooks
verified: 2026-04-12T18:41:06Z
status: gaps_found
score: 7/9 must-haves verified
re_verification: false
gaps:
  - truth: "All forward references from Phase 12 failure catalog pointing to 'Phase 14' are replaced with real markdown links"
    status: partial
    reason: "Phase 12 failure catalog (06-apv2-device-preparation.md) is fully resolved, but 'Phase 14' placeholder text remains in two other files: docs/decision-trees/04-apv2-triage.md (3 occurrences in Escalation Data table, lines 75-77) and docs/lifecycle-apv2/00-overview.md (1 occurrence at line 90 with a broken link targeting non-existent l2-runbooks/apv2-log-collection.md instead of 06-apv2-log-collection.md)"
    artifacts:
      - path: "docs/decision-trees/04-apv2-triage.md"
        issue: "Lines 75-77: 'L2 runbooks (Phase 14)' placeholder text in Escalation Data table See Also column for APE1, APE2, APE3 -- exposed to L1 agents following the triage tree"
      - path: "docs/lifecycle-apv2/00-overview.md"
        issue: "Line 90: broken link to '../l2-runbooks/apv2-log-collection.md' (correct filename is 06-apv2-log-collection.md) and retained '(Phase 14)' placeholder text"
    missing:
      - "Replace 'L2 runbooks (Phase 14)' in 04-apv2-triage.md APE1/APE2/APE3 rows with real L2 runbook links"
      - "Fix broken link in 00-overview.md line 90: change apv2-log-collection.md to 06-apv2-log-collection.md and remove '(Phase 14)' text"
  - truth: "L2 template version gate is framework-neutral for APv2 guide authoring"
    status: failed
    reason: "Template version gate at line 21 is hardcoded to 'This guide applies to Windows Autopilot (classic)' -- any author copying for an APv2 guide will inherit incorrect version gate unless they notice and fix it"
    artifacts:
      - path: "docs/_templates/l2-template.md"
        issue: "Line 21: version gate hardcoded to APv1 instead of placeholder with APv1/APv2 variant choice"
    missing:
      - "Replace hardcoded version gate with bracketed variant: '> **Version gate:** [This guide applies to Windows Autopilot (classic). | This guide covers Autopilot Device Preparation (APv2).] Remove inapplicable variant.'"
human_verification: []
---

# Phase 14: APv2 L2 Runbooks Verification Report

**Phase Goal:** L2 Desktop Engineers can collect APv2-specific logs and interpret the Intune deployment report to diagnose failures that L1 cannot resolve
**Verified:** 2026-04-12T18:41:06Z
**Status:** gaps_found
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | L2 engineer can follow a step-by-step APv2 log collection guide that explicitly states MDM Diagnostic Tool does NOT apply to APv2 | VERIFIED | `06-apv2-log-collection.md` (170 lines): Step-by-step guide with 5 investigation steps; line 27 states "CRITICAL: MDM Diagnostic Tool does not apply to APv2"; directs to BootstrapperAgent event log (Step 2), IME logs (Step 3), Intune auto-diagnostics (Step 4) |
| 2 | L2 engineer can look up BootstrapperAgent event IDs with MEDIUM confidence attribution banner citing oofhours.com and Call4Cloud | VERIFIED | `07-apv2-event-ids.md` (119 lines): MEDIUM confidence banner at line 29-30 citing oofhours.com and Call4Cloud; tiered table with 14 actionable IDs (top) and 27 total IDs (bottom); structured ranges (1xxx-9xxx) |
| 3 | L2 engineer can read the Intune APv2 deployment report, interpret every status value, and identify which status indicates a failure requiring investigation | VERIFIED | `08-apv2-deployment-report.md` (233 lines): "How to Access" section with portal path; status tables for Main List, Device Section, Apps Tab, Scripts Tab; phase breakdown mapping to Steps 2-9; five investigation paths; "Skipped is not optional" callout |
| 4 | Every APv2 L2 guide opens with a Triage block referencing specific APE1/APE2/APE3 escalation node IDs | VERIFIED | All three files have `## Triage` at line 12 with APE node IDs linked to `04-apv2-triage.md`; 06 and 08 reference APE1/APE2/APE3; 07 references APE3 (appropriate since it handles infrastructure failures) |
| 5 | Every APv2 L2 guide ends with an Escalation Ceiling section directing to Microsoft Premier Support with artifact list | VERIFIED | All three files have `## Escalation Ceiling` with "Microsoft Premier Support" and bulleted artifact lists |
| 6 | L2 index page has an APv2 section with escalation mapping for APE1, APE2, APE3 | VERIFIED | `00-index.md` line 43: "## APv2 (Autopilot Device Preparation) Runbooks"; When to Use table with 3 runbooks; APv2 L1 Escalation Mapping table with APE1/APE2/APE3; frontmatter `applies_to: both`; version gate updated for dual-framework scope; existing APv1 content preserved (ESE1-5, TPE1-5, PRE1-6 tables intact) |
| 7 | All forward references from Phase 12 failure catalog and L1 runbooks are replaced with real links | PARTIAL | Phase 12 failure catalog (`06-apv2-device-preparation.md`): all 5 placeholders replaced (verified: 0 "Phase 14" matches). Four L1 runbooks: all 4 "Phase 14 -- to be created" replaced with `00-index.md#apv2-autopilot-device-preparation-runbooks`. BUT: `04-apv2-triage.md` (3 "Phase 14" placeholders in Escalation Data table) and `00-overview.md` (1 broken link + "Phase 14" text) remain unresolved |
| 8 | L2 template includes the triage block pattern | VERIFIED | `l2-template.md`: Triage block at line 26-31 with NODE_ID placeholder, "L1 escalation" reference, "Skip to Step 2" routing; authoring comment at line 11 |
| 9 | L2 template version gate is safe for APv2 guide authoring | FAILED | `l2-template.md` line 21: version gate hardcoded to "This guide applies to Windows Autopilot (classic)" -- no APv2 variant choice provided; trap for future APv2 guide authors |

**Score:** 7/9 truths verified (2 gaps: 1 partial, 1 failed)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/l2-runbooks/06-apv2-log-collection.md` | APv2 log collection prerequisite guide | VERIFIED | 170 lines; MDMDiagnosticsTool exclusion, BootstrapperAgent export, IME logs, artifact naming, escalation ceiling |
| `docs/l2-runbooks/07-apv2-event-ids.md` | BootstrapperAgent event ID lookup | VERIFIED | 119 lines; MEDIUM confidence banner, 14 actionable + 27 total IDs, tiered tables |
| `docs/l2-runbooks/08-apv2-deployment-report.md` | Deployment report interpretation | VERIFIED | 233 lines; portal nav, status tables, phase breakdown, 5 investigation paths, known issues |
| `docs/l2-runbooks/00-index.md` | Updated L2 index with APv2 section | VERIFIED | APv2 section with When to Use + escalation mapping; frontmatter `applies_to: both`; APv1 content preserved |
| `docs/_templates/l2-template.md` | L2 template with triage block | VERIFIED (with warning) | Triage block added; version gate hardcoded to APv1 (trap for future authors) |
| `docs/error-codes/06-apv2-device-preparation.md` | Forward references resolved | VERIFIED | 0 "Phase 14" placeholders remain; 5 entries now link to specific L2 runbooks |
| `docs/l1-runbooks/06-apv2-deployment-not-launched.md` | L2 escalation path resolved | VERIFIED | Links to `00-index.md#apv2-autopilot-device-preparation-runbooks` |
| `docs/l1-runbooks/07-apv2-apps-not-installed.md` | L2 escalation path resolved | VERIFIED | Links to `00-index.md#apv2-autopilot-device-preparation-runbooks` |
| `docs/l1-runbooks/08-apv2-apv1-conflict.md` | L2 escalation path resolved | VERIFIED | Links to `00-index.md#apv2-autopilot-device-preparation-runbooks` |
| `docs/l1-runbooks/09-apv2-deployment-timeout.md` | L2 escalation path resolved | VERIFIED | Links to `00-index.md#apv2-autopilot-device-preparation-runbooks` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `06-apv2-log-collection.md` | `07-apv2-event-ids.md` | See also link | WIRED | Lines 23, 146, 160 |
| `08-apv2-deployment-report.md` | `lifecycle-apv2/02-deployment-flow.md` | Phase breakdown step mapping | WIRED | Lines 96, 225 |
| `07-apv2-event-ids.md` | `06-apv2-log-collection.md` | Prerequisite link | WIRED | Lines 17, 47, 49, 108 |
| `00-index.md` | `06-apv2-log-collection.md` | APv2 When to Use table | WIRED | Lines 48, 54, 55, 56 |
| `00-index.md` | `08-apv2-deployment-report.md` | APv2 escalation mapping | WIRED | Lines 56, 62, 63, 64 |
| `06-apv2-device-preparation.md` | `06-apv2-log-collection.md` | Runbook field entries | WIRED | Lines 70, 85 |
| `06-apv2-deployment-not-launched.md` | `00-index.md#apv2` | L2 escalation path | WIRED | Line 70 |
| `07-apv2-apps-not-installed.md` | `00-index.md#apv2` | L2 escalation path | WIRED | Line 69 |
| `08-apv2-apv1-conflict.md` | `00-index.md#apv2` | L2 escalation path | WIRED | Line 52 |
| `09-apv2-deployment-timeout.md` | `00-index.md#apv2` | L2 escalation path | WIRED | Line 61 |
| `04-apv2-triage.md` | L2 runbooks | Escalation Data See Also | NOT WIRED | Lines 75-77 still say "L2 runbooks (Phase 14)" |
| `00-overview.md` | `06-apv2-log-collection.md` | L2 detail reference | BROKEN | Line 90 links to non-existent `apv2-log-collection.md` |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| TROU-04 | 14-01, 14-02 | L2 engineer can investigate APv2 failures using BootstrapperAgent logs and deployment reports | SATISFIED | `06-apv2-log-collection.md` provides BootstrapperAgent export + IME log collection; `07-apv2-event-ids.md` provides event ID lookup; `08-apv2-deployment-report.md` provides deployment report investigation paths; all wired via L2 index, failure catalog, and L1 escalation paths |
| TROU-05 | 14-01, 14-02 | L2 engineer can interpret the Intune APv2 deployment report (status meanings, failure indicators) | SATISFIED | `08-apv2-deployment-report.md` has complete status value reference tables for Main List, Device Section, Apps Tab, Scripts Tab; phase breakdown with step mapping; "Skipped is not optional" callout; five investigation paths by failure type |

No orphaned requirements found. REQUIREMENTS.md maps TROU-04 and TROU-05 to Phase 14; both are addressed by the plans.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `docs/decision-trees/04-apv2-triage.md` | 75-77 | "L2 runbooks (Phase 14)" placeholder text in Escalation Data table exposed to L1 agents | Warning | L1 agents following triage tree see placeholder text instead of actionable links; breaks user flow at escalation point |
| `docs/lifecycle-apv2/00-overview.md` | 90 | Broken link to `apv2-log-collection.md` (missing `06-` prefix) + "(Phase 14)" placeholder | Warning | Dead link in lifecycle overview; L2 readers clicking this link get 404 |
| `docs/_templates/l2-template.md` | 21 | Version gate hardcoded to "Windows Autopilot (classic)" -- no APv2 variant | Warning | Future APv2 guide authors who copy template will inherit incorrect version gate |
| `docs/l2-runbooks/00-index.md` | 2 | `last_verified: 2026-03-21` not updated after APv2 section addition on 2026-04-12 | Info | Stale metadata; review_by date (2026-06-19) based on wrong baseline |
| `docs/l2-runbooks/06-apv2-log-collection.md` | 66 | `Get-WmiObject` used instead of `Get-CimInstance` per CLAUDE.md performance guidance | Info | Deprecated cmdlet in documentation; CLAUDE.md says "Use CIM sessions over WMI for better performance" |

### Human Verification Required

None required. All phase artifacts are documentation files verifiable through automated content inspection.

### Gaps Summary

The three core L2 runbook files (06, 07, 08) are complete, substantive, and fully wired to each other. All three ROADMAP success criteria are met by the file content. The L2 index, failure catalog, and L1 runbook escalation paths are correctly updated.

Two gaps remain from the cross-reference wiring:

1. **Triage tree escalation data not linked (4 occurrences):** `docs/decision-trees/04-apv2-triage.md` lines 75-77 still contain "L2 runbooks (Phase 14)" placeholder text in the Escalation Data table that L1 agents see when escalating via APE1/APE2/APE3. This was identified by the Phase 14 code review (CR-02) but not fixed. The L1 runbooks themselves link correctly to the L2 index, but the triage tree's Escalation Data table -- which L1 agents also reference -- does not.

2. **Broken link in lifecycle overview (1 occurrence):** `docs/lifecycle-apv2/00-overview.md` line 90 links to a non-existent file path (`apv2-log-collection.md` instead of `06-apv2-log-collection.md`) and retains "(Phase 14)" placeholder. This was identified by the code review (CR-03) but not fixed.

3. **Template version gate trap:** The L2 template version gate is hardcoded to APv1 text, creating a trap for future APv2 guide authors. The triage block was added correctly, but the version gate was not updated to be framework-neutral. This was identified by the code review (CR-01) but not fixed.

All three gaps were identified in the Phase 14 code review (`14-REVIEW.md`, issues CR-01, CR-02, CR-03) but no fix commits were made after the review. The fixes are straightforward text replacements.

**Root cause:** The code review was the last step before verification. The review correctly identified these issues, but no remediation plan was executed to address them.

---

_Verified: 2026-04-12T18:41:06Z_
_Verifier: Claude (gsd-verifier)_
