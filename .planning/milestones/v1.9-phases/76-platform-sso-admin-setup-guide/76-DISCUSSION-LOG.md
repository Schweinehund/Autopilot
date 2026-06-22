# Phase 76: Platform SSO Admin Setup Guide - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-21
**Phase:** 76-platform-sso-admin-setup-guide
**Areas discussed:** Guide 07 structure, Overview 07/08/09 link, Blockers placement, ADE advanced path

> **Resolution method:** The user selected all four gray areas and directed that each be resolved via `/adversarial-review` (Finder → Adversary → Referee), per their standing preference. The review scored 37 Finder objections (5 CRITICAL); the Adversary disproved 8; the Referee adjudicated and recommended one option per area. The user accepted all four ("Lock all & chain to plan").

---

## Guide 07 structure

| Option | Description | Selected |
|--------|-------------|----------|
| A1 — Verbatim corpus skeleton | Follow `02-enrollment-profile.md` exactly (Prerequisites → Steps → Verification → Config-Caused Failures → See Also) | |
| A2 — PSSO task-flow | Freeform flow (Entra prereqs → payload → assignment → registration verify → blockers → ADE) | |
| A3 — Hybrid | Corpus outer sections + PSSO-specific Steps inside | ✓ |

**User's choice:** A3 (via adversarial review)
**Notes:** A2 eliminated (CRIT #5 — discards shared 01-06 skeleton, orphans `06-config-failures.md` reverse-lookup hub; mis-orders DF-3 blockers). A1 eliminated — its Config-Caused-Failures table cannot host the SC1 registration flow or SC2 dual-field table (#2). A3 preserves corpus/nav integration while housing PSSO content.

---

## Overview 07/08/09 link

| Option | Description | Selected |
|--------|-------------|----------|
| B1 — 07 live, 08/09 code-span, all 3 as Mermaid nodes | Phase-75 D-06 mechanism; C13 ignores non-link text | ✓ |
| B2 — Live-link all three + edit allowlist | Changes the frozen v1.8 C13 15-entry assertion | |
| B3 — Link 07, omit 08/09 | Defer 08/09 surfacing to Phases 77/78 | |

**User's choice:** B1 (via adversarial review)
**Notes:** B2 eliminated (CRIT #13/#14 — breaks the frozen v1.8 C13 `allowlist.length === 15` gate; no valid allowlist category for an internal not-yet-authored doc). B3 eliminated (CRIT #16 — SC5 and SSOREF-03 both name 07, 08, AND 09; omitting two makes SC5 unbuildable). Mermaid nodes are not C13 link targets (#11 ruled FALSE POSITIVE), so all three appear as nodes safely.

---

## Blockers placement

| Option | Description | Selected |
|--------|-------------|----------|
| C1 — Upfront callout only | Bordered "Before You Begin" callout | |
| C2 — Inline per step | Each blocker at its relevant step | |
| C3 — Symptom→cause→fix table | Troubleshooting-style table | |
| C4 — Upfront callout + point-of-use inline cross-refs | Names all three upfront, cross-references inline | ✓ |

**User's choice:** C4 (via adversarial review)
**Notes:** C2 eliminated (MED #21 — inline placement violates DF-3 "before any Settings Catalog steps"). C3 eliminated (MED #23 — symptom→fix table mis-frames a pre-deploy prerequisite as post-failure troubleshooting). C1 loses point-of-use reinforcement for silent failures (#20). C4 satisfies both SC3 set-framing (upfront) and point-of-use reminders. Bordered callouts are precedented (Phases 62/63/64; #19 FALSE POSITIVE). C4's inline half is a cross-reference, not a failures-table entry (#26 FALSE POSITIVE).

---

## ADE advanced path

| Option | Description | Selected |
|--------|-------------|----------|
| D1 — Bordered Advanced/Optional subsection + dual-field side-by-side table | Post-enrollment = default; VR-4 table | ✓ |
| D2 — Appendix file/section + dual-field inline | Separate appendix; inline dual-field note | |
| D3 — Inline aside + dual-field inline | ADE folded into registration flow | |

**User's choice:** D1 (via adversarial review)
**Notes:** D2 eliminated (CRIT #29 — an appendix *file* breaks the locked 07/08/09-only file set and adds a C13 link target; buries the silent DF-13 failure). D3 eliminated (MED #32 — inline aside conflates advanced ADE with the default flow, violating SC4/VR-5; dual-field inline-only under-serves VR-4). D1 keeps ADE clearly optional (PSSO-12 D4=B) and presents dual-field as the VR-4 side-by-side table. DS-1 callout discipline (ADE-only vs supervised-only) is a mandatory content obligation.

---

## Claude's Discretion

- Exact prose wording of the guide, callouts, table cells, and step instructions.
- Whether individual fact-bearing lines (beyond the mandatory ADE subsection) get their own `last_verified`/`review_by` annotations per the 90-day PSSO cadence.
- Exact number/naming of `### Step N` subheadings inside the new guide 07 (no anchor constraint on a new file).

## Deferred Ideas

- Convert 00-overview 08/09 code-spans to live links — Phases 77/78 (atomic with file creation).
- Auth-method *selection*/comparison content (PSSO-05) — Phase 77 / guide 08.
- Capability-matrix Authentication section + 5-platform comparison (SSOREF-02) — Phase 79.
- Nav-hub integration (SSOREF-04) — Phase 81.
- v1.9 harness lineage bump (alternative forward-link allowlisting) — Phase 82.
