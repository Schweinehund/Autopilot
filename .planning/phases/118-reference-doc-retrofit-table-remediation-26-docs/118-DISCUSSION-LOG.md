# Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-06
**Phase:** 118-reference-doc-retrofit-table-remediation-26-docs
**Areas discussed:** Table remediation policy, Nav-hub / index scope boundary, Doc-Type edge cases, Batching + helper reuse

**Adjudication method:** The user selected all four areas and directed that each be resolved via
`/adversarial-review` (Finder → Adversary → Referee, all Opus) with a repo-grounded decision brief. Winners
below are the Referee's High-confidence adjudications; the user locked all four (1B / 2C / 3A / 4A + riders)
on 2026-07-06.

---

## Table remediation policy (D-118-1)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A Gate-minimal | Prose summary only where C17 #11 forces it (>25 rows) | |
| 1B Chunk-survival superset | Per-table prose summary on every capability-matrix/comparison table, before+after, regardless of row count (driver = PIPE-02 chunk survival) | ✓ |
| 1C Split-and-prose | Additionally split oversized matrices structurally | |

**User's choice:** 1B (chunk-survival superset, per-table, before+after).
**Notes:** Adversarial review found the C17 #11 gate forces ZERO authoring — the only >25-row table
(error-codes/00-index, 30 rows) is already compliant via existing prose at L61, and no capability matrix
exceeds 16 rows (SC2's ">25" is vacuous for matrices). 1B rests on chunk-survival INTENT. Scope is per-table
(multi-table files hold 7–10 tables each). 1C rejected: zero tables qualify for splitting → pure envelope risk.

---

## Nav-hub / index scope boundary (D-118-2)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A Defer both indexes | Treat both 00-index files as structural nav-hubs → v1.16 | |
| 2B Split (discuss-candidate) | Defer reference/00-index (pure TOC); enroll error-codes/00-index | |
| 2C Enroll both | Both class-directory indexes enrolled | ✓ |

**User's choice:** 2C (enroll both) — OVERTURNED the discuss-phase candidate 2B.
**Notes:** The Adversary/Referee reproduced locked Phase-116 D-06 (116-CONTEXT.md:153-163) verbatim:
class-directory `00-index.md` files ARE enrolled; the nav-hub deferral covers ORPHAN hubs only. Deferring
reference/00-index would contradict the registry (RE-142, Reference/Pending). Final enrolled = 34; mermaid
carve-out = ca-enrollment-timing.md (RE-147) → v1.16.

---

## Doc-Type edge cases (D-118-3)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A Carry registry | Comparison + error-codes + "Guide"-titled RE-153/154/155 keep doc_type: Reference | ✓ |
| 3B Reclassify | Reclassify the "…Guide"-titled migration docs to doc_type: Guide | |

**User's choice:** 3A (carry the registry).
**Notes:** Registry doc_type is Phase-114-locked; no harness gates title↔doc_type. Mechanism correction: C17 #9
compares block↔frontmatter doc_type ONLY (never the registry) — so 3B would pass #9, but wins nothing and
relitigates the locked registry + ripples D-03 template governance.

---

## Batching + helper reuse (D-118-4)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A Carry D-02 + fork guide helper | Size-balanced dir/topic plans; fork retrofit-guide.mjs; + mandatory riders | ✓ |
| 4B Alternative grain | Fewer monolithic plans / reuse helper unforked | |

**User's choice:** 4A + mandatory riders.
**Notes:** Riders surfaced by the review — (1) keyless-platform injection: 10 in-scope files lack a mappable
platform: key (7 error-codes carry applies_to:both/APv1/APv2, + powershell-ref, registry-paths, apv1-vs-apv2)
→ inject platform: Windows or C17 #10 hard-fails on absent key; (2) error-codes/00-index has TWO >200-char
blockquotes (L8=287c, L65=284c) needing #12 splits; (3) 65 over-limit blockquote groups across ~28 files
(D-GC-01 dominant load).

---

## Claude's Discretion

- Exact plan count + file-to-plan assignment within the ~4–6 size-balanced scheme.
- Exact name/shape of the forked reference retrofit helper (dry-run before batch).
- Exact ≥30-word Summary prose + per-table prose wording (reformat-only).
- Plan-time confirmation that `platform: Windows` resolves in D1_MAP for the 10 keyless files.

## Deferred Ideas

- The 1 mermaid-bearing reference file (`ca-enrollment-timing.md`/RE-147) → v1.16 (D-05).
- End-user Guides (RE-175/176, doc_type: Guide) → v1.16 (not reference-class).
- Phase 119 — frozen-surface re-baseline + 13th Path-A lineage bump + close.
- v1.16 — orphan docs + structural classes + the parked Mermaid decision.
