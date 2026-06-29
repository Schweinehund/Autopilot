# Phase 97: Enrollment & FileVault Depth Formalization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-28
**Phase:** 97-enrollment-filevault-depth-formalization
**Areas discussed:** Freshness-stamp granularity, Harness-coverage mechanism, Check granularity, Content treatment scope

> All four areas were resolved via `/adversarial-review` (Finder → Adversary → Referee, scored, ground-truth-verified against the live files, validator lineage, and the Phase-100 roadmap entry), per the user's standing preference for gray-area picks. The review converged on D1=B, D2=C, D3=B, D4=A with zero adversary reversals of the recommendations (one Finder *rationale* — "per-section stamps unprecedented" — was overturned, but the pick held).

---

## Freshness-stamp granularity

| Option | Description | Selected |
|--------|-------------|----------|
| A — Per-section stamp blocks | Literal `last_verified`/`review_by` blocks under each new section heading (ROADMAP literal wording) | |
| B — File-level frontmatter + version-history row | Established corpus convention; already present in both guides | ✓ |

**User's choice:** B (file-level), via adversarial-review recommendation.
**Notes:** Per-section pair-blocks exist nowhere in the corpus and add no harness value; Android uses inline `last_verified`-only tags but never `review_by` pairs. The literal ROADMAP "per-section" SC wording was reconciled by user ruling — see the dedicated question below.

## ROADMAP SC reconciliation (per-section wording vs file-level reality)

| Option | Description | Selected |
|--------|-------------|----------|
| Interpret in CONTEXT.md | Leave ROADMAP as-is; rule in CONTEXT.md that file-level frontmatter satisfies the "per-section" intent | ✓ |
| Amend ROADMAP SC wording | Edit Goal + SC#1/#3 to say "file-level frozen frontmatter stamps" | |
| Literal per-section stamps | Honor ROADMAP text literally (rejected by all review agents) | |

**User's choice:** Interpret in CONTEXT.md.
**Notes:** Lowest-friction; keeps the roadmap stable mid-milestone. CONTEXT.md D-01 carries the authoritative ruling for the Phase-100 close-gate auditor.

## Harness-coverage mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| A — Author check-phase-97.mjs now | New per-phase validator in Phase 97 | |
| B — Extend an existing validator | Modify Phase 32 run-all.sh set or v1.12 milestone audit | |
| C — Defer to Phase 100; make content assertable | Phase 97 leaves assertable anchors + needle-spec hand-off | ✓ |

**User's choice:** C, via adversarial-review recommendation.
**Notes:** `check-phase-96..100` + `CHAIN_PHASES=[48..100]` are an explicit Phase-100 "indivisible Atom 2 commit"; a Phase-97-authored validator would orphan (no chain, no CI until 100) and fracture the atom. Frozen-predecessor contract rules out option B. Sub-decision: validator asserts content-presence only, never freshness dates (time-bomb risk; no macOS doc is in any freshness scope today).

## Check granularity / strictness

| Option | Description | Selected |
|--------|-------------|----------|
| A — Coarse | One check per the 4 ROADMAP success criteria | |
| B — Fine-grained on stable tokens | A needle per durable content element (payload/key names, MDM tokens) | ✓ |

**User's choice:** B, via adversarial-review recommendation.
**Notes:** Coarse checks stay green even if sub-payloads are deleted (the "trivially green on old bytes" anti-pattern from check-phase-94). Needles must target stable structural tokens, not prose, to survive Phase 98-99 copy-edits. Recorded now; implemented in Phase 100.

## Content treatment scope

| Option | Description | Selected |
|--------|-------------|----------|
| A — Formalize-only + bounded spot-verify | Freeze live content; spot-verify only 4 uncited HIGH-impact facts | ✓ |
| B — Verify-and-fill | Re-audit live content against DEP-01/02 and correct gaps | |

**User's choice:** A, via adversarial-review recommendation.
**Notes:** Independent element-by-element re-audit (Finder + Adversary) found all DEP-01/DEP-02 elements already present — no gaps. Verify-and-fill = content-authoring (out of scope, overlaps Phase 98). Bounded spot-verify limited to: XTS-AES 128, LAPS 6-month default, escrow error -2016341107, macOS 14.4 caveat.

---

## Claude's Discretion

- Exact wording of the new version-history rows (D-01).
- The precise needle-string list handed to Phase 100 (D-03), provided stable tokens are used.
- Where to record the Phase-100 needle-spec hand-off (dedicated note vs inline in plan).

## Deferred Ideas

- `check-phase-97.mjs` validator + chain-apex extension — Phase 100 (HARN-02).
- Full re-audit of guides 02/03 against Microsoft Learn — out of scope (only the 4-claim spot-verify here).
- Guide 07 VPP conflict + troubleshooting + PSSO depth (DEP-03) — Phase 98.
- Link-integrity guard on `#end-user-sign-in-experience-secure-enclave` (into Phase-98-rewritten guide 07) — Phase 100 link sweep.
