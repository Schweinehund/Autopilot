# Phase 26: iOS/iPadOS Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-16
**Phase:** 26-ios-ipados-foundation
**Areas discussed:** Enrollment overview format, ADE lifecycle structure, Supervision axis presentation, File organization
**Method:** Adversarial review (Finder/Adversary/Referee pattern) for each area

---

## Enrollment Overview Format

**Method:** 3-option adversarial review with Finder (issue discovery), Adversary (issue challenge), Referee (final verdict + recommendation)

| Option | Description | Selected |
|--------|-------------|----------|
| A: Tabular comparison page | Table-driven with minimal narrative, similar to windows-vs-macos.md | |
| **B: Narrative overview with embedded table** | **Intro narrative + comparison table + per-path sections with "When to use" callouts** | **Yes** |
| C: Decision tree + table hybrid | Mermaid decision tree + comparison table + brief path summaries | |

**Adversarial Results:**
- Option A: 3 real issues (0 critical, 1 medium, 2 low) -- MAM-WE not structurally separated
- Option B: 2 real issues (0 critical, 1 medium, 1 low) -- lowest defect count
- Option C: 7 real issues (1 critical, 4 medium, 2 low) -- decision tree oversimplifies, conflates planning with triage

**User's choice:** Option B (Narrative overview with embedded table)
**Notes:** Accepted adversarial review recommendation. Lowest defect count, best MAM-WE structural separation for SC #4, strongest alignment with existing doc patterns (apv1-vs-apv2.md, lifecycle/00-overview.md).

---

## ADE Lifecycle Structure

**Method:** 3-option adversarial review

| Option | Description | Selected |
|--------|-------------|----------|
| **A: Mirror macOS 7-stage format** | **Same 7 stages, same 4 subsections, adapted for iOS with mandatory modifications** | **Yes** |
| B: iOS-optimized stage count | Same 4-subsection format, 5-6 stages adjusted for iOS | |
| C: Cross-reference shared stages | Stages 1-3 reference macOS doc, iOS-specific stages written in full | |

**Adversarial Results:**
- Option A: 7 real issues (1 critical, 3 moderate, 3 low) -- all tractable with modifications
- Option B: 3 real issues (1 critical, 2 moderate) -- fewest issues but underspecified ("maybe 5-6")
- Option C: 9 real issues (2 critical, 2 high, 2 moderate, 3 low) -- violates LIFE-02 self-containment

**User's choice:** Option A with mandatory modifications
**Notes:** Accepted adversarial review recommendation. Cross-platform consistency for L2 teams. Mandatory mods: supervision preamble, rewritten Stages 4/6/7 for iOS, accepted ABM duplication for LIFE-02 compliance.

---

## Supervision Axis Presentation

**Method:** 3-option adversarial review

| Option | Description | Selected |
|--------|-------------|----------|
| A: Dedicated supervision section | Standalone section with concept definition + capability table | |
| B: Inline callouts per enrollment path | Supervision stated within each path description contextually | |
| **C: Both (dedicated + inline)** | **Dedicated section defining concept + inline callouts per path linking back** | **Yes** |

**Adversarial Results:**
- Option A: 3 real issues (0 critical, 1 medium, 1 low) -- viable but no inline reinforcement
- Option B: 6 real issues (2 critical, 3 medium, 1 low) -- no authoritative definition, fails Phase 27 dependency
- Option C: 5 real issues (0 critical, 1 medium, 4 low) -- resolves all critical and high issues

**User's choice:** Option C (Both -- dedicated section + inline reinforcement)
**Notes:** Accepted adversarial review recommendation. Dedicated section provides Phase 27 anchor. Inline callouts provide point-of-action reinforcement. No per-feature capability table (Phase 27/28 scope).

---

## File Organization

**Method:** 3-option adversarial review

| Option | Description | Selected |
|--------|-------------|----------|
| A: Parallel ios-lifecycle/ | Create ios-lifecycle/ with 2 files, future admin-setup-ios/ | |
| B: Broader docs/ios/ hierarchy | Nested docs/ios/ parent with subdirectories | |
| **C: Match existing convention** | **ios-lifecycle/ for lifecycle, admin-setup-ios/ for admin, runbooks in shared dirs with ios- prefix** | **Yes** |

**Adversarial Results:**
- Option A: 2 real issues (0 critical, 0 medium, 2 low) -- subset of Option C
- Option B: 7 real issues (1 critical, 3 medium, 2 low) -- breaks flat convention
- Option C: 4 real issues (0 critical, 0 medium, 4 low) -- all cosmetic, inherits existing patterns

**User's choice:** Option C (Match existing convention exactly)
**Notes:** Accepted adversarial review recommendation. Aligns with 25-phase, 116-file established convention. All issues LOW severity and cosmetic.

---

## Claude's Discretion

- Mermaid diagram style and complexity
- Stage Summary Table layout
- "How to Use This Guide" wording
- Exact word count within 800-1200 target
- Glossary Quick Reference table inclusion
- Behind the Scenes depth for iOS

## Deferred Ideas

None -- all discussion stayed within phase scope.
