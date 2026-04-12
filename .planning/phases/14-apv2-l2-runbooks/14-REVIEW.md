---
status: issues_found
phase: 14
depth: standard
files_reviewed: 10
findings:
  critical: 3
  warning: 3
  info: 2
  total: 8
---

# Phase 14 Code Review

Reviewed: docs/_templates/l2-template.md, docs/error-codes/06-apv2-device-preparation.md,
docs/l1-runbooks/06-apv2-deployment-not-launched.md, docs/l1-runbooks/07-apv2-apps-not-installed.md,
docs/l1-runbooks/08-apv2-apv1-conflict.md, docs/l1-runbooks/09-apv2-deployment-timeout.md,
docs/l2-runbooks/00-index.md, docs/l2-runbooks/06-apv2-log-collection.md,
docs/l2-runbooks/07-apv2-event-ids.md, docs/l2-runbooks/08-apv2-deployment-report.md

---

## Critical Issues

### CR-01: l2-template.md version gate hardcoded to APv1

**File:** docs/_templates/l2-template.md
**Line:** 21
**Confidence:** 100

The version gate blockquote reads "This guide applies to Windows Autopilot (classic)." This is a
hardcoded statement, not a fill-in placeholder. Any author copying this template to create an APv2
L2 guide will include an incorrect version gate unless they specifically notice and fix this line.
The three APv2 L2 guides created in Phase 14 all correctly overrode this text, but the template
itself remains a trap for future work.

**Fix:** Replace with a bracketed variant choice:
`> **Version gate:** [This guide applies to Windows Autopilot (classic). | This guide covers Autopilot Device Preparation (APv2).] Remove inapplicable variant.`

---

### CR-02: "L2 runbooks (Phase 14)" placeholder still in APv2 triage tree escalation table

**File:** docs/decision-trees/04-apv2-triage.md (out of review scope; direct upstream feed to all four Phase 14 L1 runbooks)
**Line:** 75-77
**Confidence:** 100

The Escalation Data table's "See Also" column for APE1, APE2, and APE3 reads "L2 runbooks
(Phase 14)" — a construction-time placeholder never replaced now that Phase 14 is complete.
All four L1 runbooks under review (06-09) route users through APE1/APE2/APE3 to this table.
The placeholder text is exposed to L1 agents.

**Fix:** Replace each cell with specific links:
- APE1: `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md#entra-join-failed-phase-policy-installation)`
- APE2: `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md#enrollment-failed-phase-policy-installation)`
- APE3: `[APv2 Event IDs](../l2-runbooks/07-apv2-event-ids.md) + [APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md)`

---

### CR-03: Broken link and placeholder in lifecycle-apv2/00-overview.md referencing Phase 14 file

**File:** docs/lifecycle-apv2/00-overview.md (out of review scope; broken inbound reference to reviewed file 06-apv2-log-collection.md)
**Line:** 90
**Confidence:** 100

`[L2 APv2 Log Collection Guide](../l2-runbooks/apv2-log-collection.md)` — the path
`l2-runbooks/apv2-log-collection.md` does not exist. The correct filename is
`06-apv2-log-collection.md`. The same line also retains the "(Phase 14)" construction placeholder.

**Fix:** Change link to `../l2-runbooks/06-apv2-log-collection.md` and remove "(Phase 14)" from the sentence.

---

## Warning Issues

### WR-01: l2-runbooks/00-index.md frontmatter last_verified not updated after APv2 section added

**File:** docs/l2-runbooks/00-index.md
**Line:** 2-3
**Confidence:** 95

`last_verified: 2026-03-21` reflects the original APv1-only creation date. The Version History
records a substantial 2026-04-12 change that added the entire APv2 section and updated
`applies_to` from APv1 to both. `last_verified` was not updated with it. The derived
`review_by: 2026-06-19` is now based on the wrong baseline; the correct re-review date should be
2026-07-11 (90 days from 2026-04-12), consistent with all other Phase 14 files.

**Fix:** Set `last_verified: 2026-04-12` and `review_by: 2026-07-11`.

---

### WR-02: APv2 L2 runbooks missing ## Tool References section required by template pattern

**File:** docs/l2-runbooks/06-apv2-log-collection.md, docs/l2-runbooks/07-apv2-event-ids.md, docs/l2-runbooks/08-apv2-deployment-report.md
**Line:** end of each file
**Confidence:** 85

All five existing APv1 L2 runbooks (01-05) end with `## Tool References` linking to
`reference/powershell-ref.md`, `reference/registry-paths.md`, and `reference/endpoints.md` as
required by l2-template.md. None of the three new APv2 L2 runbooks include this section. The
APv2 guides use PowerShell commands (Step 2/3 in 06-apv2-log-collection.md) and reference
specific network endpoints (event ID 4002 in 07-apv2-event-ids.md cites login.microsoftonline.com
and graph.microsoft.com), making `reference/powershell-ref.md` and `reference/endpoints.md`
directly applicable.

**Fix:** Add `## Tool References` to all three files. Minimum entries:
`06-apv2-log-collection.md` and `08-apv2-deployment-report.md`: powershell-ref.md + endpoints.md.
`07-apv2-event-ids.md`: endpoints.md.

---

### WR-03: Get-WmiObject used instead of Get-CimInstance

**File:** docs/l2-runbooks/06-apv2-log-collection.md
**Line:** 66
**Confidence:** 88

```powershell
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
```

CLAUDE.md explicitly requires CIM over WMI for better performance. `Get-WmiObject` is deprecated
in PowerShell 7+ and removed from non-Windows PowerShell. `Get-CimInstance` is already used in
`03-tpm-attestation.md` and is the established project pattern. `01-log-collection.md` (APv1)
also uses `Get-WmiObject` — Phase 14 repeated a pre-existing deviation rather than correcting it.

**Fix:** `$serial = (Get-CimInstance -ClassName Win32_BIOS).SerialNumber`

---

## Info Issues

### IR-01: TREE_FILE.md in l2-template.md triage block not in [bracket] placeholder format

**File:** docs/_templates/l2-template.md
**Line:** 28
**Confidence:** 80

The triage block reads: `**From L1 escalation ([NODE_ID](../decision-trees/TREE_FILE.md))?**`

`NODE_ID` uses bracket notation and will be noticed as a required substitution. `TREE_FILE.md`
is embedded in a URL with no bracket notation — a new author may replace `NODE_ID` and miss
that the link path also needs replacing, producing a silently broken link.

**Fix:** Use `../decision-trees/[TREE_FILE].md` or add an HTML comment: `<!-- replace TREE_FILE with actual decision tree filename -->`.

---

### IR-02: Bare external learn.microsoft.com URL in 07-apv2-event-ids.md version gate

**File:** docs/l2-runbooks/07-apv2-event-ids.md
**Line:** 8
**Confidence:** 80

The version gate cites `https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq` inline.
All other cross-references in Phase 14 files and across the project use relative internal links.
Microsoft's Autopilot documentation has historically moved URLs frequently; this creates an
external dependency in a file that otherwise has no external links.

**Fix:** Either remove the URL (the internal `apv1-vs-apv2.md` reference already covers the
disambiguation) or add an HTML comment noting it is an external link requiring periodic
verification: `<!-- external link — verify on review -->`

---

## Checks Passed

- All 10 reviewed files exist and have valid frontmatter
- Spot-checked relative links within the 10 reviewed files: all resolve to existing files
- GFM anchors verified: `#apv2-autopilot-device-preparation-runbooks` (00-index.md), `#escalation-data` (04-apv2-triage.md), `#entra-join-failed-phase-policy-installation`, `#enrollment-failed-phase-policy-installation`, `#deployment-timeout` (08-apv2-deployment-report.md) — all match actual headings
- L1 runbooks 06-09: zero PowerShell commands, zero registry paths, zero HKLM/HKCU references — L1 audience boundary maintained
- Phase 13 WR-01 resolved: Version History table in 06-apv2-device-preparation.md is now correctly formatted (trailing `| -- |` removed)
- Phase 13 CR-01 resolved: Glossary anchor in 04-apv2-triage.md correctly uses `#apv2`
- APv2 escalation node IDs (APE1/APE2/APE3) are consistent across: 04-apv2-triage.md, l2-runbooks/00-index.md, 06-apv2-log-collection.md, and 08-apv2-deployment-report.md
- review_by dates for all new files set to 2026-07-11 (90 days from 2026-04-12) — consistent across 06-09 L1 runbooks and 06-08 L2 runbooks
- No unreplaced [bracketed placeholder] strings in any of the 10 reviewed files
- Prerequisite chain (06-apv2-log-collection as gate for 07 and 08) documented consistently in all three L2 runbooks and in 00-index.md
- Deployment report section anchors cited in 07-apv2-event-ids.md resolve correctly against headings in 08-apv2-deployment-report.md
