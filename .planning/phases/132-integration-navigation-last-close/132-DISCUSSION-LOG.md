# Phase 132: Integration & Navigation-Last Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-18
**Phase:** 132-integration-navigation-last-close
**Areas discussed:** index.md recipes section (shape + placement)

> Note: ROADMAP flagged "DISCUSS-PHASE FLAGS: none" and codebase scout confirmed the phase is mechanical (registry rows, status flip, filename-map regen, C17). Exactly one genuine gray area existed — the shape/placement of the CLASS-04 index.md recipes section. No gray areas were manufactured around the mechanical steps.

---

## index.md recipes section — shape

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated section only | One new top-level `## Device Configuration Recipes` section listing both recipes; no platform cross-links | ✓ |
| Dedicated + platform cross-links | Dedicated section plus links under `## Windows Autopilot` and `## iOS/iPadOS Provisioning` | |

**User's choice:** Dedicated section only
**Notes:** Keeps recipes as a single distinct discoverable class, matching how index.md groups other doc classes; satisfies CLASS-04 literally with the least nav surface.

---

## index.md recipes section — placement

| Option | Description | Selected |
|--------|-------------|----------|
| After platform sections, before Operations | After `## Linux Provisioning`, before `## Operations` | ✓ |
| After Operations | After `## Operations`, before Cross-Platform References | |
| Top, after Choose Your Platform | Featured near the top of the index | |

**User's choice:** After platform sections, before Operations
**Notes:** Groups recipes with the platform-provisioning content they extend.

---

## Claude's Discretion

- Exact one-line description wording for each recipe entry in the new index.md section (follow existing index.md entry style).
- RE-index row title text (reuse recipe H1 / `applies_to`, consistent with existing rows).

## Deferred Ideas

None — discussion stayed within phase scope.
