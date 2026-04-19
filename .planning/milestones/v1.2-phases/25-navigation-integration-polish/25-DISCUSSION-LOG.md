# Phase 25: Navigation Integration & Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-15
**Phase:** 25-navigation-integration-polish
**Areas discussed:** Common-issues macOS routing, Quick-ref card macOS sections, Reachability audit scope, Cross-contamination guardrails
**Review method:** Adversarial review (Finder/Adversary/Referee pattern, 3 Opus agents)

---

## Common-Issues macOS Routing (NAVX-02)

| Option | Description | Selected |
|--------|-------------|----------|
| Separate section only | macOS ADE section at bottom, no cross-refs from Windows symptoms | |
| Symptom-integrated | macOS links alongside Windows under each symptom category | |
| Hybrid (Recommended) | Separate macOS section + one-line cross-ref banners from shared symptoms | ✓ |

**User's choice:** Hybrid — separate macOS section plus cross-reference banners
**Notes:** Adversarial review eliminated symptom-integrated (CRITICAL NAVX-02 violation) and found separate-only had CRITICAL scroll-discovery failure. Hybrid scored lowest confirmed issues (7 pts vs 16 and 32).

### Follow-up: Platform Selector

| Option | Description | Selected |
|--------|-------------|----------|
| Add platform selector (Recommended) | "Choose Your Platform" anchor section at top of common-issues.md | ✓ |
| Banner only | Just the framework banner update and cross-ref banners | |

**User's choice:** Add platform selector
**Notes:** Matches index.md pattern (lines 17-20). Addresses macOS discoverability concern.

---

## Quick-Reference Card macOS Sections (NAVX-03)

| Option | Description | Selected |
|--------|-------------|----------|
| Append section (Recommended) | Add macOS section to bottom of existing quick-ref cards | ✓ |
| Separate files | Create new quick-ref-l1-macos.md and quick-ref-l2-macos.md | |
| Restructured cards | Reorganize with ## Windows / ## macOS top-level headers | |

**User's choice:** Append section — matches APv2 precedent
**Notes:** Adversarial review eliminated restructured (CRITICAL: high-risk in final phase). Separate files violated APv2 pattern and created maintenance burden. Append section had only medium/low confirmed issues and all disputed issues were false positives.

---

## Reachability Audit Scope (Success Criteria #3)

| Option | Description | Selected |
|--------|-------------|----------|
| Exhaustive audit (Recommended) | File-by-file verification of every Phase 20-24 doc | ✓ |
| Exhaustive + broken-link check | Exhaustive plus verify all links resolve | |
| Targeted spot-check | Check only newest files and known risk areas | |

**User's choice:** Exhaustive audit
**Notes:** Only approach that satisfies "every" in Success Criteria #3. Spot-check eliminated (CRITICAL: violates success criteria). Automated eliminated (CRITICAL: grep can't trace click depth).

---

## Cross-Contamination Guardrails (NAVX-02)

| Option | Description | Selected |
|--------|-------------|----------|
| Strict separation | No cross-references between platform sections | |
| Separation + banners (Recommended) | Separate sections with one-line routing banners | ✓ |
| Inline platform labels | [Windows]/[macOS] tags on each link entry | |

**User's choice:** Separation + banners
**Notes:** Follows existing pattern in 00-initial-triage.md and 06-macos-triage.md. Inline labels eliminated (CRITICAL NAVX-02 violation). Strict separation inconsistent with existing codebase banners.

---

## Claude's Discretion

- Exact wording of cross-platform H1 title for common-issues.md
- Exact macOS symptom descriptions
- Which Windows symptom categories get cross-reference banners
- Terminal commands and log paths selection for L2 quick-ref
- Reachability audit checklist format

## Deferred Ideas

None — discussion stayed within phase scope.
