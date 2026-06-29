# Phase 99: New Runbook + Navigation Wiring - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-29
**Phase:** 99-new-runbook-navigation-wiring
**Areas discussed:** Runbook home & tier, Boundary vs L1 #36, Recovery-path structure, Navigation wiring scope
**Method:** All four gray-area picks resolved via `/adversarial-review` per user instruction (standing preference: adversarial-review for gray-area picks during discuss-phase).

---

## Adversarial-review outcome (Finder → Adversary → Referee)

- **Finder:** 37 objections, 152 pts (3 CRITICAL, 22 MEDIUM, 12 LOW).
- **Adversary:** disproved 16 objections (+34), **0 wrong disproves**. All 3 CRITICALs held.
- **Referee:** independently file-verified every contested objection; **0 reversals** of the Adversary.

**Three CRITICALs that held (load-bearing disqualifiers):**
- obj-1: GA1-B (extend #36 in place) violates locked "#36 minimally edited, reciprocal cross-link only."
- obj-11: GA2-B (duplicate #36 steps) violates cross-link-not-duplicate + version-drift.
- obj-12: GA2-C (merge) orphans 5 verified inbound refs to #36 (06-triage:45/56/81, quick-ref-l1:101/117, index:110).

---

## Runbook home & tier (GA1)

| Option | Description | Selected |
|--------|-------------|----------|
| A | New dedicated L1 runbook `docs/l1-runbooks/37-macos-local-password-reset.md` | ✓ |
| B | Extend existing L1 #36 in place | (DISQUALIFIED — CRITICAL obj-1) |
| C | New L2 runbook | (rejected — mis-tiered; recovery is L1-delegatable) |
| D | New admin-setup-macos guide section | (rejected — admin-audience, not a runbook surface; collides with locked guide 07) |

**Choice:** A. **Notes:** recovery actions are L1-delegatable GUI/portal work (cf. #34 Path A, #36 — both `audience: L1`).

---

## Boundary vs L1 #36 (GA2)

| Option | Description | Selected |
|--------|-------------|----------|
| A | #37 owns access-recovery → hands off to #36 for PSSO re-registration; #36 reciprocal-link only | ✓ |
| B | Duplicate #36's re-registration steps for a self-contained read | (DISQUALIFIED — CRITICAL obj-11) |
| C | Merge concerns into one combined runbook | (DISQUALIFIED — CRITICAL obj-12) |

**Choice:** A. **Notes:** single hand-off point at the end of each recovery path; #36 gets only a reciprocal back-link. Seam overlap acknowledged (obj-9 CONFIRMED) — mitigated by distinct when-to-use wording.

---

## Recovery-path structure (GA3)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Decision-tree-first (embedded triage) | (rejected — breaks house style, duplicates 06-triage) |
| B | Sequential per-path sections with a recommended primary | ✓ |
| C | Single linear procedure with inline conditional branches | (rejected — less scannable for 3 exclusive paths) |

**Sub-decisions:**
- **Primary path:** escrowed FileVault recovery key (auto-escrowed 03:160; "primary/most reliable" 03:162,182). LAPS + Apple ID secondary.
- **Apple-ID gating:** conditional "where org policy allows," with FileVault-key + LAPS fallbacks (no dead-end).
- **SSPR clarification:** inline brief fact + cross-link to depth (matches #35:32 / #36:34,45). Not standalone callout, not cross-link-only.

**Notes:** obj-17 CONFIRMED — must foreground that FileVault-key use destroys the SE binding (the very #36 root cause).

---

## Navigation wiring scope (GA4)

| Hub | In/Out | Selected |
|-----|--------|----------|
| `docs/l1-runbooks/00-index.md` | IN | ✓ |
| `docs/index.md` (line-110 PSSO row; not line-108 count) | IN | ✓ |
| `docs/common-issues.md` (escalates to L2 #27) | IN | ✓ |
| `docs/quick-ref-l1.md` | IN | ✓ |
| `docs/decision-trees/06-macos-triage.md` (MAC3 leaf) | IN | ✓ |
| `docs/quick-ref-l2.md` | OUT | ✓ |

**Notes:** navigation-last ordering (hubs after #37 commit). Stale counts at index:108 / 06-triage:101 are pre-existing debt — left untouched (obj-22/33 FALSE POSITIVE, out of scope).

## Claude's Discretion

- Exact section headings, prose, and "Say to the user" phrasing (follow #35/#36 voice).
- common-issues H3 wording, quick-ref-l1 trigger phrasing, MAC3 leaf label (subject to distinct-trigger + slug discipline).

## Deferred Ideas

- Stale nav counts (index:108, 06-triage:101) — future corpus-accuracy pass.
- `check-phase-99.mjs` validator — Phase 100 (HARN-02). Phase 99 records the needle-spec hand-off only.
