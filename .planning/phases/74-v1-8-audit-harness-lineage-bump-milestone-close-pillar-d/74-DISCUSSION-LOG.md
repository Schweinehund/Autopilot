# Phase 74: v1.8 Audit Harness Lineage Bump + Milestone Close (Pillar D) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-08
**Phase:** 74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d
**Areas discussed:** D-01 Plan layout + VPP-01 placement, D-02 VPP-01 corpus-edit handling, D-03 3-axis terminal re-audit (HARNESS-11), D-04 Close-gate SHA + traceability + DEFERRED finalize (HARNESS-12)

**Method:** All 4 gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder FOR / Adversary AGAINST / Referee scores, lower = better), per user memory `feedback_adversarial_review_preference`. User selected all 4 areas + instructed "for each choice in each area, use /adversarial-review to recommend the best one and provide reasoning." Full dossiers: `.claude/tmp/phase74-D{01,02,03,04}-advisor.md`.

---

## D-01: Plan layout + VPP-01 placement

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | 6 plans, VPP-01 standalone first | 12 | |
| B | VPP-01 folded into Atom-1 plan | 10 | |
| C | 4-plan compress (kills scaffold plan) | 13 | |
| D | 5-plan layout (Phase 70 twin), VPP in scaffold plan 74-01 | **7** | ✓ |

**User's choice:** Approve all 4 (Option D). **Notes:** ROADMAP SC#1 pre-locks the 2 atoms; VPP-01 sidecar annotations live inside `v1.8-audit-allowlist.json` (the file Atom 1 creates), forcing VPP-before-Atom-1. 5-plan skeleton: 74-01 (scaffold + VPP) / 74-02 (Atom 1) / 74-03 (Atom 2) / 74-04 (3-axis re-audit) / 74-05 (close-gate). Reconciled with D-04: 74-05 is a SINGLE commit (not the 2-commit A/B D-01 initially sketched).

---

## D-02: VPP-01 corpus-edit handling

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Full literal "mirror SWEEP-02" (fabricate VH section + full anchor artifact) | 8 | |
| B | Lighter tooling-milestone treatment | 5 | |
| C | Convention-faithful hybrid (mirror what SWEEP-02 empirically did) | **4** | ✓ |
| D | Skip sidecar / minimal | 11 | |

**User's choice:** Approve all 4 (Option C). **Notes:** last_verified bump YES; Version History YES-but-routed-to-ledger (file has no VH H2 — don't fabricate); sidecar 4-site annotate-not-remove YES; PITFALL-6 anchor inventory YES-scoped (no full artifact, file is link-free); check-phase-74 V-74-VPP assertion YES; single atomic commit YES. SWEEP-02 (commit `55260b3`) empirically never fabricated a VH section + skipped full anchor inventory for link-free files.

---

## VPP-01 site-count (separate user decision — contract deviation)

| Option | Description | Selected |
|--------|-------------|----------|
| Rename all 4 | 115/149/155/160 — honors source-of-truth (`v1.7-DEFERRED-CLEANUP.md:213` "total 4"); zero legacy leak | ✓ |
| Rename 3, defer L160 | Literal locked "3 sites" contract; leaves a live leak | |
| Rename 3 + flag bare "VPP token" forms | Widest; risks ballooning the only corpus edit | |

**User's choice:** Rename all 4. **Notes:** REQUIREMENTS.md:45 / ROADMAP SC#2 "3 sites" headline dropped L160 (the 4th occurrence the spawning source explicitly records). Verified empirically: legacy term at lines 115, 149, 155, 160. Bare "VPP token"/"Apple VPP tokens" forms at 142/150/161 are a different term — NOT renamed. Plan-phase documents the deviation explicitly.

---

## D-03: 3-axis terminal re-audit (HARNESS-11)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Exact Phase-70 replication (v1.8-relabeled) | **9** | ✓ |
| C | Axis-reorder | 15 | |
| B | Consolidated commit | 16 | |
| D | Two-sub-agent literalism (split Axis 1/3) | 16 | |

**User's choice:** Approve all 4 (Option A). **Notes:** Axis 1 = one fresh `gsd-executor` sub-agent, `git clone --no-hardlinks` into TEMP; Axis 3 = same sub-agent (physical + logical isolation, one dispatch — do NOT spawn two); Axis 2 = `gh workflow run audit-harness-v1.8-integrity.yml --ref master`. Cross-OS-applicable set = 6 (v1.8-milestone-audit + check-phase-70/71/72/73/74). Separate artifact-only commit `74-04-AUDIT-RESULTS.md`. HARD gate: re-audit plan AFTER Atom 2 on origin/master.

---

## D-04: Close-gate SHA + traceability + DEFERRED finalize (HARNESS-12)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Single close-gate commit, NO Commit A | **2.0** | ✓ |
| D | Split plan | 5.0 | |
| C | Hybrid | 6.5 | |
| B | Two-commit Commit A/B (Phase 70 cargo-cult) | 8.0 | |

**User's choice:** Approve all 4 (Option A). **Notes:** Commit A NOT needed — no v1.8 artifact forward-references the close SHA (BASELINE_12 anchors to a past SHA; `_lib/frozen-at-close.mjs` has no V18/readAtV18Close after RETRO-02 centralization; milestone-audit `close_commit:` is markdown frontmatter). Single ~7-file commit flips 7 reqs → 12/12. Literal `{phase_74_close_SHA}` recoverable via `git log --grep`. DEFERRED-CLEANUP: preserve 6 existing + append 6 promoted v1.7 carry-overs → 12 sections.

---

## Claude's Discretion

- HARNESS-09 check-phase-71/72/73 disposition (already exist; confirm chain-current, only 74 net-new)
- `74-CONVENTIONS.md` locked-constants content
- Axis-1 sub-agent `$rand` charset + temp cleanup assertions
- check-phase-74 V-74-VPP substring-class vs line-pinned assertion (recommend substring)
- Sidecar `resolved_` date-key format
- v1.8-milestone-audit.mjs `close_commit:` frontmatter fill (placeholder either way — not a live anchor)

## Deferred Ideas

- Bare "VPP token"/"Apple VPP tokens"/"VPP tokens" forms at 142/150/161 (different term; v1.9+ if flagged)
- 6 v1.7 carry-overs promoted to DEFERRED-CLEANUP full sections but not implemented (v1.9+ triggers)
- 5 existing v1.8 deferred stubs preserved as-is
- v1.9+ requirement-authoring hygiene flags: VPP "3 sites" dropped L160; HARNESS-10 "Fourth" vs ROADMAP "fifth" mismatch
