# Phase 121: Structural Retrofit — Glossaries, Lifecycle & End-User Guides - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-07
**Phase:** 121-structural-retrofit-glossaries-lifecycle-end-user-guides
**Areas discussed:** Mermaid-in-lifecycle collision, Lifecycle scope boundary, Glossary term-surface preservation, Doc-ID enrollment & registry sync
**Method:** `/adversarial-review` per area (Proponent → Adversary → Referee, three Opus agents each, 12 total), grounded in the live repo — per project convention and the Phase-120 precedent.

---

## D1 — Mermaid-in-lifecycle collision (DOMINANT)

| Option | Description | Selected |
|--------|-------------|----------|
| A — convert all 9 in-phase | Convert the 9 Mermaid-bearing lifecycle files to text-equivalents per STD-04 within Phase 121; enroll all 22 lifecycle files here | |
| B — defer the 9 to Phase 122 | Retrofit only the 13 Mermaid-free lifecycle files in Phase 121; move the 9 to Phase 122; RETRO-07 spans 121+122 | ✓ |
| C — move all 22 to Phase 122 | Phase 121 = glossaries + end-user guides only | |

**User's choice:** Option B (adversarial-review recommendation; user "Accept all four").
**Adversarial trace:** Proponent recommended A, but its core anti-B/C argument rested on a FALSE premise — that Phase 122 was already complete (ROADMAP L44 `[x] (completed 2026-07-07)`). The Adversary + Referee independently verified Phase 122 is *Not started* (STATE `completed_phases: 1`; ROADMAP status table "0/? Not started"; REQUIREMENTS RETRO-08 Pending) — L44 was a data-entry bug. With the premise removed, B wins on the LOCKED `STRUCTURAL-SPLIT` axis (split by Mermaid dependency) and risk isolation (Phase-120 D-04: C17 has no diagram parser; leaf-completeness is a human obligation). Referee: **B, HIGH confidence.** C over-corrects (needlessly defers 13 trivial files).
**Notes:** Surfaced a data-integrity bug (ROADMAP L44) — fixed this session per user authorization. RETRO-07 kept as a spanning requirement, NOT folded into RETRO-08.

---

## D2 — Lifecycle scope boundary

| Option | Description | Selected |
|--------|-------------|----------|
| A — canonical dirs only (22) | The 6 device/enrollment-lifecycle directories only | ✓ |
| B — broad path-match (~30) | Also include operations/app-lifecycle (5) + patch-management (1) + apple-business/*-lifecycle (2) | |
| (Adversary) — 27 (A + app-lifecycle) | Include the whole app-lifecycle/ dir (a genuine `*-lifecycle/` dir); exclude the 3 strays | |

**User's choice:** 22 files (adversarial-review recommendation).
**Adversarial trace:** Proponent recommended A (22). Adversary countered with 27, arguing app-lifecycle/ IS a `*-lifecycle/` dir and excluding it is a gerrymander. Referee verified the decisive point: `operations/` and `cross-platform/apple-business/` are **separately-enumerated deferred classes** in EEE-SOP-standard D-04, absent from v1.16's class list (REQUIREMENTS.md:14); D-08 directory-precedence excludes app-lifecycle (app-management under operations/) exactly like the 3 strays. Referee: **22, HIGH confidence** — directory-enumerated, not glob-matched.
**Notes:** Surfaced a ~40-doc orphan gap (operations/ + cross-platform/) owned by no phase → flagged for v1.17+; EEE-SOP-standard D-04 stale "in v1.16" promise corrected this session.

---

## D3 — Glossary term-surface & anchor-slug preservation

| Option | Description | Selected |
|--------|-------------|----------|
| A — strict D3-A, net-new Summary | EEE block → H1 → net-new ≥30-word Summary → coverage blockquote relocated below → index → terms | ✓ |
| B — repurpose coverage blockquote as Summary | Use the existing coverage blockquote content as the Summary body | |

**User's choice:** Option A (adversarial-review recommendation).
**Adversarial trace:** Proponent recommended A. Adversary attacked on "reformat-only integrity" (is net-new Summary content invention?) but VERIFIED against the shipped Phase-118 `retrofit-reference.mjs` + `docs/reference/00-index.md` (174 C17-green files) that net-new Summary coexisting with a byte-identically-relocated see-also block IS the reformat-only contract → **A confirmed**. Two corrections adopted: (1) blockquote-below-Summary is a precedent/grounding choice, not C17-forced (C17 #4 only checks Summary-first-H2); (2) `_glossary-network.md` uses `## Change History` — reconcile or spawn a duplicate section.
**Notes:** Anchor slugs proven invariant; plain-GitHub, no `{#id}` (project convention).

---

## D4 — Doc-ID enrollment & registry sync

| Option | Description | Selected |
|--------|-------------|----------|
| A — sequential append | Next-available IDs from RE-179, class-then-path order, hand-author registry first then pipeline injects | ✓ |
| B — reserved per-class blocks | Contiguous ID ranges per class for citation readability / headroom | |

**User's choice:** Option A + mandatory refinement (adversarial-review recommendation).
**Adversarial trace:** Proponent recommended A. Adversary confirmed A (B's reserved blocks buy nothing — no enforcement, citations path-driven) but surfaced a MANDATORY refinement from the D1 interaction: pre-author ALL 22 lifecycle registry rows now (13 Approved + 9 `Status: Pending`, per the RE-147 precedent) so Phase 122 flips without minting IDs — else permanent unvalidated ID disorder. Also: needs a fork across 3 dirs / 2 doc_types + the `v1.15`→`v1.16` VH-literal flip; RE-175/176 flip requires actually retrofitting those 2 files.
**Notes:** Verified — RE-147 sits Pending in its natural path slot; registry Doc Type column is NOT C17-cross-checked (author by hand).

---

## Claude's Discretion
- Exact prose of each net-new glossary `## Summary` (≥30 words).
- Plan/wave decomposition within Phase 121 (sequential-on-main-tree).

## Deferred Ideas
- The 9 Mermaid-bearing lifecycle files → Phase 122 (pre-enrolled Pending).
- Whole-class enrollment of `operations/` + `device-operations/` + `cross-platform/apple-business/` (~40+ docs) → v1.17+.
- Optional C17 `VALID_DOC_TYPES` + registry↔frontmatter cross-check hardening → future HARN/STD lever.

## Roadmap-integrity fixes applied this session (user-authorized)
1. ROADMAP.md L44 — Phase 122 `[x] (completed 2026-07-07)` → `[ ]` (was a data-entry bug; Phase 122 is Not started).
2. ROADMAP.md Phase 121 goal/SC2 + Phase 122 goal/SC5 — re-scoped for the 121↔122 RETRO-07 split.
3. REQUIREMENTS.md — RETRO-07 text (scope + span) + traceability table (`Phase 121 + 122`).
4. STATE.md — Current-Position status, Phase-121 dependency block, STRUCTURAL-SPLIT note.
5. docs/_standards/EEE-SOP-standard.md D-04 — stale "in v1.16" promise for operations/device-operations/apple-business corrected to v1.17+. (C17 re-verified green: 174 files, 0 violations.)
