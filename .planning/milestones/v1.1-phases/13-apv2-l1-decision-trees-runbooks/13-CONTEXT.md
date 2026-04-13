# Phase 13: APv2 L1 Decision Trees & Runbooks - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

L1 Service Desk agents can independently triage and handle the most common APv2 deployment failures using only browser/portal actions. This phase delivers one APv2 triage decision tree and 3-4 scripted L1 runbooks covering the highest-impact APv2 failure scenarios. No L2 investigation guides (Phase 14), no admin setup content (Phases 15-16), no navigation hub updates (Phase 17).

</domain>

<decisions>
## Implementation Decisions

### Decision Tree Structure
- **D-01:** Single APv2 triage tree in `docs/decision-trees/04-apv2-triage.md` with a Mermaid diagram containing ~6-8 decision nodes. APv2 has fewer failure modes than APv1 (no TPM attestation, no hardware hash, no ESP configuration), so a single tree stays readable without sub-trees.
- **D-02:** First gate: "Did ESP display?" — Yes routes to the APv1 registration conflict runbook (fulfills success criterion #4). No continues APv2 triage.
- **D-03:** Second gate: "Did Device Preparation screen appear?" — No routes to "deployment never launched" runbook. Yes proceeds to symptom-based routing (Entra join/enrollment failures escalate to L2; app/script/timeout failures route to L1 runbooks).
- **D-04:** Include the same legend table as APv1 decision trees (Diamond = decision, Rectangle = action, Green = resolved, Red = escalate L2, Orange = escalate infra).

### Runbook Scope & Count
- **D-05:** Deliver 3-4 L1 runbooks covering only the scenarios where L1 has portal-only resolution actions:
  1. `06-apv2-deployment-not-launched.md` — Deployment experience never launched (policy checks, user group, OS version, corporate identifiers)
  2. `07-apv2-apps-not-installed.md` — Apps and scripts not installed (app assignment, group membership, deployment report status)
  3. `08-apv2-apv1-conflict.md` — APv1 registration conflict / ESP appeared (verify APv1 registration, confirm precedence, hand off to APv1 docs)
  4. `09-apv2-deployment-timeout.md` (optional) — Deployment timed out (deployment report check, retry guidance)
- **D-06:** Remaining scenarios from the Phase 12 catalog (Entra join failed, enrollment failed, IME install failed) are infrastructure/L2 issues — the decision tree routes these directly to L2 escalation with data collection instructions. No L1 runbooks for scenarios L1 cannot resolve.
- **D-07:** Each runbook follows the established L1 pattern: Prerequisites + numbered Steps + Escalation Criteria with collect list. Zero PowerShell, zero registry, portal-only actions.

### File Organization
- **D-08:** Add APv2 files into existing `docs/decision-trees/` and `docs/l1-runbooks/` folders using the next available numbers. Consistent with Phase 12's approach of adding `06-apv2-device-preparation.md` into `docs/error-codes/`.
- **D-09:** Update `docs/decision-trees/00-initial-triage.md` to add a "See also" reference to the APv2 triage tree (not modify the APv1 tree structure itself).
- **D-10:** Update `docs/l1-runbooks/00-index.md` to add an APv2 section below the existing APv1 runbook table. Update frontmatter from `applies_to: APv1` to `applies_to: both`.

### APv1 Cross-Routing
- **D-11:** The "Did ESP display? → Yes" path routes to a dedicated APv1 registration conflict runbook (`08-apv2-apv1-conflict.md`) rather than linking directly to APv1 docs. This gives L1 a scripted verification path: confirm device is in Autopilot devices list, confirm APv1 profile assigned, then hand off to APv1 initial triage tree with a clear "you're now in APv1 territory" message.
- **D-12:** If no APv1 registration is found but ESP still appeared (unexpected), the runbook escalates to L2 — this is an edge case L1 cannot resolve.

### Frontmatter & Cross-Linking
- **D-13:** All new files use `applies_to: APv2`, `audience: L1` frontmatter with `last_verified` and `review_by` (90-day cycle) per Phase 11 pattern.
- **D-14:** Version gate blockquote header on every file: "This guide covers Autopilot Device Preparation (APv2). For APv1 (classic), see [link]." Plus "See also" footer linking to APv1 equivalent and comparison page.
- **D-15:** Runbook forward references from the Phase 12 failure catalog (`06-apv2-device-preparation.md`) must be updated to real markdown links pointing to the actual runbook files created in this phase.

### Claude's Discretion
- Exact Mermaid node labels, IDs, and color scheme for the APv2 triage tree
- Exact wording of "Say to the user" scripts in runbooks (as long as they follow the established L1 pattern)
- Whether the optional 4th runbook (deployment timeout) is included — decide based on whether there are enough portal-only actions to justify a standalone runbook vs. handling it as an escalation path in the decision tree
- Ordering of steps within each runbook (as long as portal-only constraint is maintained)
- Whether to include a network reachability gate in the APv2 triage tree (APv1 tree starts with "Can the device reach any website?")

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 12 Output (direct dependency — runbooks link to these scenarios)
- `docs/error-codes/06-apv2-device-preparation.md` — APv2 failure catalog with 10 scenarios organized by deployment phase. Runbooks must match scenario names and update forward references to real links.

### Existing L1 Patterns (read for format, structure, tone)
- `docs/decision-trees/00-initial-triage.md` — APv1 initial triage tree with Mermaid diagram, legend, and scenario routing. Pattern for APv2 triage tree.
- `docs/l1-runbooks/00-index.md` — APv1 L1 runbook index. Being updated with APv2 section.
- `docs/l1-runbooks/01-device-not-registered.md` — APv1 L1 runbook exemplar: Prerequisites + Steps + Escalation pattern with "Say to the user" scripts.
- `docs/_templates/l1-template.md` — L1 template (no PowerShell/registry references).

### Phase 11 Output (cross-linking and lifecycle context)
- `docs/lifecycle-apv2/02-deployment-flow.md` — 10-step deployment flow. Decision tree and runbooks reference these step numbers.
- `docs/lifecycle-apv2/01-prerequisites.md` — Prerequisites checklist. Some runbook checks trace back to missing prerequisites.

### Project Context
- `.planning/REQUIREMENTS.md` — TROU-02 and TROU-03 requirements for this phase
- `.planning/ROADMAP.md` — Phase 13 success criteria and dependencies
- `.planning/phases/11-apv2-lifecycle-foundation/11-CONTEXT.md` — Version gate pattern, cross-linking strategy, source strategy
- `.planning/phases/12-apv2-failure-index/12-CONTEXT.md` — Failure catalog structure, forward reference conventions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/decision-trees/` — 4 existing APv1 decision trees with established Mermaid diagram patterns, legend tables, and glossary cross-references
- `docs/l1-runbooks/` — 5 existing APv1 L1 runbooks with Prerequisites/Steps/Escalation structure and "Say to the user" scripting
- Phase 11 frontmatter pattern — `last_verified`, `review_by`, `applies_to`, `audience` fields ready to reuse
- Version gate blockquote pattern — Copy from any Phase 11/12 file and adapt for APv2

### Established Patterns
- **Decision tree Mermaid:** `graph TD` with diamond decisions `{}`, rectangle actions `[]`, colored rounded terminators `([])` for resolved/escalate
- **L1 runbook structure:** Frontmatter → version gate → title → Prerequisites (numbered) → Steps (numbered, portal-only) → Escalation Criteria (checklist) → Data Collection for Escalation
- **Cross-linking:** Internal relative paths using `../` navigation. Glossary terms linked on first mention per file.
- **Index files:** Table format with #, Runbook name (linked), and "When to Use" column

### Integration Points
- `docs/decision-trees/00-initial-triage.md` — Needs "See also" reference to new APv2 triage tree
- `docs/l1-runbooks/00-index.md` — Needs APv2 section added, frontmatter updated to `applies_to: both`
- `docs/error-codes/06-apv2-device-preparation.md` — Forward references to Phase 13 runbooks must be updated to real markdown links
- Phase 14 depends on this phase's L1 trees for L2 escalation path references

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decisions above.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 13-apv2-l1-decision-trees-runbooks*
*Context gathered: 2026-04-12*
