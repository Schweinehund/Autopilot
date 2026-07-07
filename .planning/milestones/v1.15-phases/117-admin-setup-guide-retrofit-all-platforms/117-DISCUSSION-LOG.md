# Phase 117: Admin-Setup Guide Retrofit (all platforms) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-05
**Phase:** 117-admin-setup-guide-retrofit-all-platforms
**Areas discussed:** Phase granularity, Batch grouping + 802.1X handling, Guide Summary lead, Owner value, Mermaid disposition (surfaced by review)

**Adjudication method:** User selected all four gray areas and requested `/adversarial-review` to recommend the best option in each with reasoning. A three-agent adversarial review (Finder → Adversary → Referee, all Opus) independently re-verified every deciding fact against the repo. The Adversary overturned 1 of 4 Finder picks (D-03) and surfaced two grounding corrections (C1, C2); the Referee upheld all Adversary verdicts. User confirmed the four decisions and ruled on the mermaid disposition.

---

## Phase granularity (ROADMAP SC4 flag)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — One phase, batched plans | RETRO-02 single req; sub-phase split forces HARN-03 renumber cascade + Phase-119 SHA desync; C17 gates per-file | ✓ |
| 1B — Per-platform sub-phases | Breaks 1-req-1-phase; triggers renumber cascade; contradicts 116 D-01 | |
| 1C — One monolithic plan for all | No reviewable checkpoints for the largest hand-authoring load | |

**Choice:** 1A. **Notes:** Finder → Adversary CONFIRMED → Referee upheld. Resolves the ROADMAP SC4 discuss-flag. Carries 116 D-01 verbatim.

---

## Batch grouping + 802.1X handling

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — 1 plan per directory (7) | Simple, but the 802.1X plan mixes 6 D1 labels; lopsided monster plans (android 14, macos 12) | |
| 2B — Fold 802.1X per-platform files into platform plans | Scatters a tightly cross-referential set to optimize a non-problem | |
| 2C — Size-balanced ~6 platform-homogeneous plans | Homogeneous per plan (uniform C17 #9); split heavy dirs on filename seams; 802.1X kept cohesive | ✓ |

**Choice:** 2C. **Notes:** Finder → Adversary CONFIRMED → Referee upheld. 2A a defensible close 2nd. Mirrors 116 D-02.

---

## Guide Summary lead convention

| Option | Description | Selected |
|--------|-------------|----------|
| 3A — Generic-template lead | Platform + Autopilot framework (APv1/APv2) + admin role — from the generic template | |
| 3A′ — Per-platform-template-matched lead | Each file follows ITS platform template's Summary prescription (Android mode/MGP; iOS/macOS method/ABM/prereq; Linux/`all` generic minus framework clause) | ✓ |
| 3B — What-breaks lead | Duplicates the per-setting callout content; reframes toward asserting failure claims | |
| 3C — Minimal one-sentence scope | Concrete C17 #5 (<30 words) failure risk; wastes the SC2 lead chunk | |

**Choice:** 3A′ (Finder's 3A OVERTURNED by Adversary, upheld by Referee). **Notes:** The repo has FOUR admin templates with materially different Summary prescriptions; the generic APv1/APv2 clause is irrelevant to 50/66 files.

---

## Owner value

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — Uniform `Intune Admin Lead` | owner is frontmatter-only, never rendered (C17 key-presence only) → per-platform buys zero value; carries 116 D-04 | ✓ |
| 4B — Per-platform owner | Contradicts 116 D-04; zero gate/citation value; misreads templates (reviewer ≠ owner) | |

**Choice:** 4A. **Notes:** Finder → Adversary CONFIRMED → Referee upheld. Caveat recorded: deliberately diverges from platform-template reviewer roles (owner ≠ reviewer, neither rendered).

---

## Mermaid disposition (surfaced by the review — grounding correction C2)

| Option | Description | Selected |
|--------|-------------|----------|
| Carve out + defer 9 to v1.16 | Retrofit only the 57 non-mermaid guides; leave the 9 un-enrolled + defer to v1.16 Mermaid handling. Envelope-clean | ✓ |
| Retrofit all 66; neutralize mermaid in-place | Converting a diagram is a content edit — breaches reformat-only envelope; pre-empts v1.16 | |
| Escalate — inspect first | Look at the 9 files before deciding | |

**Choice:** Carve out + defer 9 to v1.16 (D-05). **Notes:** 9 files verified via `grep -rl mermaid docs/admin-setup-*/`. Enrolled scope = 57. C17 #1 hard-fails on top-level mermaid; conversion is out-of-envelope; v1.16 already owns Mermaid.

## Claude's Discretion

- Exact plan count + file-to-plan assignment within the D-02 size-balanced homogeneous scheme (~6 plans over 57 files).
- Retrofit helper shape/name (D-03 method carries from 116 D-03); guard/fix `retrofit-runbook.mjs` defects before reuse.
- Exact ≥30-word Summary prose per guide (per-platform-template lead; reformat-only).

## Deferred Ideas

- The 9 mermaid-bearing admin-setup files → v1.16 (D-05).
- Phase 118 (RETRO-03) reference-doc retrofit + table remediation, incl. reference-class Guides RE-153/154/155.
- Phase 119 frozen-surface re-baseline + 13th Path-A lineage bump + close.
- v1.16 orphan docs + structural classes + end-user Guides (RE-175/176) + the parked Mermaid decision.
