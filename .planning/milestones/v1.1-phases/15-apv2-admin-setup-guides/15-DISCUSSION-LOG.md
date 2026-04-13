# Phase 15: APv2 Admin Setup Guides - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-12
**Phase:** 15-apv2-admin-setup-guides
**Areas discussed:** Guide organization, ETG configuration depth, Troubleshooting integration, Corporate identifiers scope
**Method:** Adversarial review (Finder/Adversary/Referee pattern) applied to all 4 areas

---

## Guide Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Single monolithic guide | One file covering all ASET requirements sequentially | |
| Multi-file per task | Separate files following admin template pattern with 00-overview sequencer | ✓ |
| Hybrid with companions | Primary guide + deep-dive companion files for complex subtopics | |

**User's choice:** Multi-file per task
**Notes:** Adversarial review confirmed 0 critical issues for multi-file (vs 1 critical each for monolithic and hybrid). Multi-file matches project's universal pattern. Criterion 1 ("without leaving the guide") satisfied by treating numbered file set as the guide with sequential navigation links.

**Adversarial findings:**
- Monolithic (28 pts confirmed): Breaks every multi-file pattern, template can't accommodate, unwieldy table
- Multi-file (17 pts confirmed): Needs 00-index (confirmed), criterion 1 friction mitigated by navigation links
- Hybrid (31 pts confirmed): Ambiguous scope boundary (CRITICAL), splits required ETG content, no project precedent

---

## ETG Configuration Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Inline PowerShell | Full commands visible in guide body | ✓ |
| Collapsible block | PowerShell inside HTML details/summary | |
| Separate companion script | PowerShell in standalone .ps1 file | |

**User's choice:** Inline PowerShell
**Notes:** Adversarial review found 1 CRITICAL issue each for collapsible (hides content criterion 2 requires "explicitly stated") and companion script (separates procedure from checklist). Inline had only LOW-severity issues. Project reserves `<details>` blocks for supplementary L2 content only.

**Adversarial findings:**
- Inline (3 pts confirmed): All LOW -- fragile code, flow disruption, no template precedent (disproved: absence is not prohibition)
- Collapsible (22 pts confirmed): CRITICAL -- hidden-by-default violates "explicitly states" in criterion 2
- Companion script (27 pts confirmed): CRITICAL -- breaks criterion 2 by separating procedure from checklist

---

## Troubleshooting Integration

| Option | Description | Selected |
|--------|-------------|----------|
| Brief callout + link | 2-3 sentences per callout with runbook link | |
| Expanded 4-element callouts | Symptom + cause + admin fix + runbook anchor | |
| Template dual-layer pattern | Inline callouts (3 elements) + Configuration-Caused Failures table | ✓ |

**User's choice:** Template pattern as-is (dual-layer)
**Notes:** Adversarial review disproved "redundancy" claim -- template itself prescribes both callouts and table as intentional dual-layer (in-context reading + reverse lookup). Template already demands 3 elements per callout (admin symptom, user symptom, runbook link), disproving claim it specifies "1-2 sentences."

**Adversarial findings:**
- Brief + link (7 pts confirmed): Viable but minimal; L1 runbook link gap partially disproved (runbooks DO contain admin guidance)
- Expanded (15 pts confirmed): Increases file size, maintenance burden, scope overlap with L1 runbooks
- Dual-layer (2 pts confirmed): IS the template's own pattern; both "redundancy" and "not a choice" disproved as false positives

---

## Corporate Identifiers Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Narrow -- identifiers only | Just corporate identifier setup steps | |
| Broad coverage | Full enrollment restriction documentation | |
| Substantive subsection | Identifier setup + focused enrollment restriction interaction | ✓ |

**User's choice:** Substantive subsection
**Notes:** Adversarial review confirmed Option A fails criterion 5 (CRITICAL). "Enrollment restrictions = scope creep" disproved -- criterion 5 explicitly requires enrollment restriction conflict behavior. "1-paragraph sufficient" disproved -- conflict behavior complexity likely exceeds a single paragraph. Substantive subsection (scoped to APv2-relevant interactions) balances criterion satisfaction with scope containment.

**Adversarial findings:**
- Narrow (16 pts confirmed): CRITICAL -- directly fails success criterion 5
- Broad (17 pts confirmed): Enrollment restriction content required (not scope creep), but risks over-scoping and audience misattribution
- Substantive (7 pts confirmed): Forward reference risk; 1-paragraph may be insufficient (confirmed MEDIUM) -- hence "substantive subsection" not "brief paragraph"

---

## Claude's Discretion

- File numbering convention within `docs/admin-setup-apv2/`
- Exact wording of "what breaks" callouts
- PowerShell code style and comments
- Configuration-Caused Failures table entry count per file
- Optional Mermaid setup flow diagram in 00-overview.md
- Enrollment restriction conflict precedence rules structure

## Deferred Ideas

None -- discussion stayed within phase scope.

## Cross-Cutting Issues Resolved

- Phase 13 dependency: DISPROVED as incomplete -- all deliverables exist on disk, PROJECT.md confirms completion 2026-04-12
- Entra ID administrator settings: Pending todo confirmed -- must re-verify at authoring time
- New directory `docs/admin-setup-apv2/`: Required for multi-file approach; Phase 17 handles navigation integration
