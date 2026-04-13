# Phase 12: APv2 Failure Index - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 12-apv2-failure-index
**Areas discussed:** Failure catalog structure, Master index integration, Failure scenario scope, Cross-linking to runbooks

---

## Failure Catalog Structure

| Option | Description | Selected |
|--------|-------------|----------|
| By deployment phase (Recommended) | Group failures by where they occur in the 10-step flow | ✓ |
| By symptom category | Group by what the technician observes | |
| Alphabetical by scenario name | Flat list sorted A-Z | |

**User's choice:** By deployment phase
**Notes:** Matches the deployment flow doc from Phase 11. Technician already knows which step failed.

---

## Entry Format

| Option | Description | Selected |
|--------|-------------|----------|
| Symptom-cause-action (Recommended) | Symptom, Probable Cause, Quick Check, Runbook Link per entry | ✓ |
| Minimal: symptom + runbook link only | Catalog as lookup table, all detail in runbooks | |
| Comprehensive with inline resolution | Full troubleshooting steps inline | |

**User's choice:** Symptom-cause-action
**Notes:** Matches pattern technicians use for hex-code entries but adapted for scenario-based lookup.

---

## Master Index Integration

| Option | Description | Selected |
|--------|-------------|----------|
| Separate APv2 table (Recommended) | New section below existing hex-code table with different columns | ✓ |
| Merged table with Framework column | APv2 entries in the existing Quick Lookup table | |
| APv2 link only, no inline table | Just add category link, no entries in index | |

**User's choice:** Separate APv2 table
**Notes:** Clean separation — APv2 scenarios don't pretend to be hex codes. Existing table relabeled as APv1.

---

## Failure Scenario Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Core scenarios only (Recommended) | 8-10 most common/impactful scenarios | ✓ |
| Comprehensive catalog (15-20) | Every known failure path including edge cases | |
| Minimal (top 5 only) | Only scenarios from roadmap success criteria | |

**User's choice:** Core scenarios only (8-10)
**Notes:** Maps to documented failure points in Intune deployment report. Phase 14 can expand later.

---

## Cross-Linking to Runbooks

| Option | Description | Selected |
|--------|-------------|----------|
| Forward reference text (Recommended) | Plain text with phase annotation instead of markdown links | ✓ |
| Placeholder markdown links | Links to expected paths (broken until Phases 13-14) | |
| No runbook references | Omit entirely, let runbooks back-link | |

**User's choice:** Forward reference text
**Notes:** Consistent with how Phase 11 handled Phase 14 references. No broken links.

---

## Claude's Discretion

- Exact wording of symptom descriptions and probable causes
- Ordering of scenarios within deployment phase groups
- Whether to include optional Mermaid diagram in catalog file
- Column widths and formatting in index table

## Deferred Ideas

None — discussion stayed within phase scope.
