# Phase 13: APv2 L1 Decision Trees & Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-12
**Phase:** 13-apv2-l1-decision-trees-runbooks
**Areas discussed:** Decision tree structure, Runbook scope & count, File organization, APv1 cross-routing

---

## Decision Tree Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Single APv2 triage tree (Recommended) | One Mermaid decision tree file covering all APv2 triage. First gate: 'Did ESP display?' APv2 has fewer failure modes than APv1 so a single tree stays readable. ~6-8 decision nodes. | ✓ |
| Mirror APv1 pattern (1 triage + sub-trees) | Create APv2 initial triage tree routing to 2-3 scenario sub-trees. More files, more consistency with APv1 pattern, but over-engineering for APv2's simpler failure model. | |
| Integrated into existing triage | Add APv2 as a branch in existing 00-initial-triage.md. Single entry point but makes existing tree unwieldy and breaks applies_to frontmatter. | |

**User's choice:** Single APv2 triage tree
**Notes:** User accepted recommendation. APv2's simpler failure model doesn't warrant multi-file sub-tree pattern.

---

## Runbook Scope & Count

| Option | Description | Selected |
|--------|-------------|----------|
| Top 3-4 scenarios (Recommended) | Cover highest-impact scenarios with portal-only resolution: deployment never launched, apps/scripts not installed, APv1 conflict, deployment timeout (optional). Remaining scenarios escalate to L2. | ✓ |
| All 10 scenarios from catalog | L1 runbook for every Phase 12 catalog scenario. Maximum coverage but 5+ would be 'collect and escalate' with minimal actionable steps. | |
| 5 runbooks (match APv1 count) | Match APv1 pattern of exactly 5 runbooks. Groups related app scenarios. Loses scenario-specific quick checks. | |

**User's choice:** Top 3-4 scenarios
**Notes:** User accepted recommendation. Focus on scenarios where L1 has actual portal-only resolution actions.

---

## File Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Add to existing folders (Recommended) | Add APv2 files into docs/decision-trees/ and docs/l1-runbooks/ with next available numbers. Update index files. Consistent with Phase 12 error-codes approach. | ✓ |
| Separate APv2 folders | Create parallel docs/decision-trees-apv2/ and docs/l1-runbooks-apv2/. Clean separation but more directories. Lifecycle case was different (fundamentally different flow). | |
| Subfolder within existing | Create apv2/ subfolders. Middle ground but breaks flat numbering pattern with no existing precedent. | |

**User's choice:** Add to existing folders
**Notes:** User accepted recommendation. Consistent with Phase 12's approach to error-codes/.

---

## APv1 Cross-Routing

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated runbook + tree gate (Recommended) | Decision tree routes to dedicated APv1 conflict runbook (08-apv2-apv1-conflict.md) that walks L1 through confirming APv1 registration, then hands off to APv1 triage tree. Scripted path rather than just 'go read APv1 docs'. | ✓ |
| Direct tree routing (no runbook) | 'Did ESP display? → Yes' links directly to APv1 triage tree with inline note. Simpler but L1 doesn't verify WHY ESP appeared. | |

**User's choice:** Dedicated runbook + tree gate
**Notes:** User accepted recommendation. Gives L1 a scripted verification path before APv1 handoff.

---

## Claude's Discretion

- Mermaid node labels, IDs, and color scheme
- "Say to the user" script wording in runbooks
- Whether 4th runbook (deployment timeout) is included
- Step ordering within runbooks
- Network reachability gate in APv2 triage tree

## Deferred Ideas

None — discussion stayed within phase scope.
