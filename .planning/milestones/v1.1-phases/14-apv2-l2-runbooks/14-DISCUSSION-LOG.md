# Phase 14: APv2 L2 Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-12
**Phase:** 14-apv2-l2-runbooks
**Areas discussed:** File organization, BootstrapperAgent event IDs, Deployment report guide, L1-to-L2 handoff

---

## File Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Separate APv2 files (3 new) | `06-apv2-log-collection.md`, `07-apv2-event-ids.md`, `08-apv2-deployment-report.md` — mirrors APv1 one-topic-per-file pattern | ✓ |
| Single combined guide | One `06-apv2-investigation-guide.md` covering all three topics in sections | |
| Extend existing files | Add APv2 sections to `01-log-collection.md`, create 1-2 new APv2-specific files | |

**User's choice:** Separate APv2 files (recommended by adversarial research)
**Notes:** Separate files maintain the one-topic-per-file pattern, enable clean escalation linking from L1, and keep APv1 files framework-pure. APv2 log collection may be thinner than APv1 equivalent but still substantive enough for standalone file.

---

## BootstrapperAgent Event IDs

| Option | Description | Selected |
|--------|-------------|----------|
| Exhaustive table (20-40 IDs) | Every known event ID with full columns: Event ID, Source, Description, Action, Confidence | |
| Curated subset (8-12 IDs) | Only most actionable IDs with detailed guidance; link to community blog for full list | |
| Tiered table | Top: 8-12 key IDs with full guidance. Bottom: compact reference of all remaining IDs | ✓ |

**User's choice:** Tiered table (recommended by adversarial research)
**Notes:** Satisfies success criterion #2 (comprehensive lookup) while keeping actionable IDs prominent. Single confidence banner at section header avoids 40x MEDIUM markers. Matches existing two-tier pattern in project (e.g., error code tables + prose in ESP enrollment guide).

---

## Deployment Report Guide

| Option | Description | Selected |
|--------|-------------|----------|
| Field-by-field table only | Pure table: Column / Possible Values / Meaning / Action for every field | |
| Narrative flow only | Step-by-step investigation walkthrough | |
| Hybrid: reference table + investigation paths | Status value table for fast lookup, then per-failure-type investigation paths | ✓ |

**User's choice:** Hybrid (recommended by adversarial research)
**Notes:** Matches existing L2 pattern — every APv1 L2 guide already embeds value tables within narrative investigation steps. Status table first for fast lookup, investigation paths organized by failure type (Entra join, enrollment, app install, script, timeout). Opens with portal navigation path for self-containment.

---

## L1-to-L2 Handoff

| Option | Description | Selected |
|--------|-------------|----------|
| Fresh start | L2 assumes no prior work, starts investigation from scratch | |
| L1 context header | Brief "L1 has already verified" section at top of each guide | |
| Triage block (check-or-skip) | "From L1 escalation? Skip to Step 2. Starting fresh? Begin at Step 1." | ✓ |

**User's choice:** Triage block (recommended by adversarial research)
**Notes:** Already the established pattern in all 4 APv1 L2 guides — not actually a new decision. Triage block references APv2 escalation node IDs (APE1/APE2/APE3) and lists data L1 collected. Handles both escalated tickets and direct investigations. Consider updating L2 template to include this pattern formally.

---

## Claude's Discretion

- Exact BootstrapperAgent event log paths and export commands
- Which event IDs go in curated top section vs compact bottom section
- Exact portal navigation paths
- Triage block data list wording
- Optional Mermaid diagram in deployment report guide
- Whether log collection file is substantial enough standalone

## Deferred Ideas

None — discussion stayed within phase scope.
