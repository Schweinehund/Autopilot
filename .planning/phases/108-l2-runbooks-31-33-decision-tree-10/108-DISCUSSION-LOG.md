# Phase 108: L2 Runbooks #31-33 + Decision Tree #10 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 108-l2-runbooks-31-33-decision-tree-10
**Areas discussed:** Runbook structure & L2 depth, #31 vs existing L2 log-collection, Decision-tree #10 L2-link wiring seam, #33 RADIUS/EAP framing

**Resolution method:** User selected all four gray areas and instructed: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."* All four were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus). **Finder scored 55** (four HIGH picks); **Adversary mounted 0 overturns, 0 downgrades** (verified all anchors, zero line drift); **Referee independently re-verified all load-bearing anchors and confirmed all four** with no changes. Unanimous convergence.

---

## Runbook structure & L2 depth (→ CONTEXT D-01)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Per-platform subsections only | 5 platform sections per runbook, deep commands/interpretation each; mirrors single-platform L2 (#01 Sections, #27 Track A/B) | |
| B — Shared prose + compact per-platform TABLE | Mirrors the P107 L1 "1C" structure (D-01) | |
| C — Hybrid: shared investigation-flow prose + per-platform deep-dive subsections | Shared methodology/map + per-platform leaves | ✓ |

**Choice:** C (HIGH). **Notes:** Per-platform axis triple-mandated by SC1/SC2/SC3 (`ROADMAP.md:242/243/244`) + Goal `:237`. B rejected — an L1 table can't hold L2 collect+interpret depth. Pure-A rejected — 5×-restates shared methodology (link-not-copy pressure; the L2 analog of what D-01 rejected at L1, `107-CONTEXT.md:36`). Precedent (24/14/27) is the hybrid shape but a *weak analog* (single-platform); the three literal "per platform" SC clauses independently force the pick. No overturn attempted (would be wrongful −2x).

---

## #31 vs existing per-platform L2 log-collection (→ CONTEXT D-02)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Link general + "adds only" 802.1X overlay | Links #01/#10/#14/#18/#24; adds 802.1X-specific channels/filters | |
| B — Self-contained 802.1X log collection | Accept duplication for single-stop usability | |
| C — Hybrid: link general package, self-contain net-new 802.1X-specific set | Link the already-homed package; self-contain what has no home | ✓ |

**Choice:** C (HIGH). **Notes:** Verified the load-bearing fact — the 802.1X sources SC1 names (WLAN-AutoConfig/Dot3Svc, `wpa_supplicant` filters, 802.1X `adb logcat`) are net-new; none exist in #01/#14/#24 (spot-checked). B rejected — restating the general package **violates link-not-copy** (`01:19`, `18:81`, `02:119`, `00-index:17`). A near-identical to C but understates SC1's "serves as the prerequisite for #32 and #33"; C states both link + self-contain obligations explicitly.

---

## Decision-tree #10 L2-link wiring seam (→ CONTEXT D-03)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Wire live L2 links in Phase 108 once #31-33 committed | Honors the tree's own note; navigation-last-compliant within-phase | ✓ |
| B — Defer tree links to Phase 109 | Group with the six nav hubs; update the stale "in Phase 108" note | |

**Choice:** A (HIGH — strongest pick of the four, doubly anchored). **Notes:** D-04 (`107-CONTEXT.md:46`) + the tree's own committed note (`10-8021x-triage.md:77`) both name Phase 108. Navigation-last (`ROADMAP.md:259`) is an ordering rule (links commit after targets), not a phase-assignment rule; #31-33 are born and committed within Phase 108 before the links. Phase 109's six-hub list (`ROADMAP.md:257`) excludes the tree. B rejected — contradicts both explicit anchors + forces a double-touch.

---

## #33 RADIUS/EAP framing (→ CONTEXT D-04)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Checklist only | Structured request-template/checklist for the RADIUS-team ask | |
| B — Prose narrative | | |
| C — Hybrid: request checklist + per-platform EAP-mismatch + server-name-validation diagnosis subsections | Maps 1:1 to SC3's three clauses | ✓ |

**Choice:** C (HIGH). **Notes:** SC3 (`ROADMAP.md:244`) is a literal three-clause enumeration (request-info / diagnose-EAP-mismatch / server-name-validation per platform) → C maps 1:1. A drops clauses 2&3; B buries the actionable ask and forgoes per-platform depth. Planner guardrail: keep the checklist strictly ask-side (no NPS config; `REQUIREMENTS.md:80`). Client-side server-name/trusted-root validation IS in scope.

## Claude's Discretion

- Exact runbook filenames (suggested `31-8021x-log-collection.md` / `32-8021x-cert-investigation.md` / `33-8021x-radius-eap-investigation.md`), prose, section ordering, callout phrasing, and where per-platform subsections begin — within D-01/D-02/D-04 and corpus conventions.
- Exact per-platform command sequences (subject to DOT1X-10 "log filters verified at plan time").
- Node-label wording of the tree's newly-live L2 links; whether #31 is surfaced as a banner vs inline (holding the P107 D-07 routing map).

## Deferred Ideas

- Global navigation wiring (capability-matrix rows + six nav hubs) → Phase 109 (navigation-last).
- Foundation theory restatement and general diagnostic-package restatement → link, never restate.
- RADIUS/NPS server config, PKI/CA build-out, switch/AP port config → out of milestone scope.
- Refresh past-due link targets #01 (`review_by: 2026-06-19`) / #24 (`2026-06-26`) → out of Phase 108 scope.
- Pre-existing corpus nit: `27-macos-sso-investigation.md:51` out-of-vocab `> **Important:**` callout → future corpus-nit sweep.
