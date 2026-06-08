# Phase 73 — RETRO-01 Class-Signature Inventory

**Captured:** 2026-06-08
**Scope:** `check-phase-{48..66}.mjs` (19 validators)
**Purpose:** Plan 73-02 source-of-truth for RETRO-02 HEAD-coupled assertion conversion + COMPLEX_CONVERSION subclass flagging per V-67-05/06 root cause

SC#1 literal contract: "inventory is a committed artifact" (ROADMAP.md:354) — this file PRECEDES Plan 73-02 RETRO-02 conversion as the committed source-of-truth. Plan 73-02 must consume this inventory to determine the exact conversion scope and SHA targets.

---

## RETRO-01 Class-Signature Inventory Table

Methodology: class-wide grep across all 19 validators for `readFile(MILESTONES_DOC | REQUIREMENTS_DOC | ROADMAP_DOC | PROJECT_DOC | STATE_DOC)` + cross-reference to validator name strings citing milestone-close-state keywords (`v1.5 close`, `v1.6 close`, `Plan 6N-NN`, `AUDIT-08`, `post-Plan-08`, `stale rows`, `Methodology highlights`, `LIN-DEFER`). Disposition values: `CONVERT_PLAN_73_02`, `ALREADY_FROZEN_AWARE`, `NO_HEAD_COUPLING`, `CASCADE_ONLY`, `SCOPE_GAP_DEFERRED_V19`.

| Validator | HEAD-coupled assertion IDs | Citation evidence (docstring/name) | Conversion target SHA | Disposition |
|-----------|---------------------------|------------------------------------|-----------------------|-------------|
| check-phase-48.mjs | — | No planning-doc readFile calls; no milestone-close-state keywords in assertion names | — | NO_HEAD_COUPLING |
| check-phase-49.mjs | — | No planning-doc readFile calls; assertions read docs content only | — | NO_HEAD_COUPLING |
| check-phase-50.mjs | — | Stub validator — no planning-doc readFile calls | — | NO_HEAD_COUPLING |
| check-phase-51.mjs | — | No planning-doc readFile calls; assertions read docs content only | — | NO_HEAD_COUPLING |
| check-phase-52.mjs | — | No planning-doc readFile calls; assertions read docs content only | — | NO_HEAD_COUPLING |
| check-phase-53.mjs | — | readFile calls are all against docs/operations/co-management/* path constants (OV, TA, VAL, MP, IDX) — no planning docs read | — | NO_HEAD_COUPLING |
| check-phase-54.mjs | — | readFile calls are all against docs/operations/patch-management/* path constants (OV, WIN, MAC, IOS, VAL) — no planning docs read | — | NO_HEAD_COUPLING |
| check-phase-55.mjs | — | No planning-doc readFile calls; assertions read docs content only | — | NO_HEAD_COUPLING |
| check-phase-56.mjs | — | readFile calls are all against docs/operations/drift-migration/* path constants (OV, WIN, MAC, IOS_AND_, RUNBOOK, VAL) — no planning docs read; v1.2 SSoT refs in comments are file-existence guards, not milestone-close-state assertions | — | NO_HEAD_COUPLING |
| check-phase-57.mjs | — | No planning-doc readFile calls; assertions read docs content only | — | NO_HEAD_COUPLING |
| check-phase-58.mjs | — | readFile calls are all against docs/reference/capability-matrix paths; `Plan 58-06 C12 promotion` cited in V-58-25 check name but asserts code state (v1.5-milestone-audit.mjs keyword presence), not milestone-doc content | — | NO_HEAD_COUPLING |
| check-phase-59.mjs | — | No planning-doc readFile calls; assertions read docs content only | — | NO_HEAD_COUPLING |
| check-phase-60.mjs | — | readFile calls all against HARNESS (v1.5-milestone-audit.mjs), SIDECAR (v1.5-audit-allowlist.json), PIN_HELPER (regenerate-supervision-pins.mjs), archived phase-plan docs — NOT top-level planning docs; V-60-23 cites `post-Plan-08` in name but invokes harness subprocess, not readFile(planning doc); wrapper fix is Plan 73-01 fold-in (CHAIN + AUDIT), NOT a RETRO-02 conversion | — | NO_HEAD_COUPLING |
| check-phase-61.mjs | V-61-17, V-61-18, V-61-19, V-61-20 | V-61-17..20 use `readFile(MILESTONES_DOC)` where MILESTONES_DOC = `.planning/MILESTONES.md` without frozen guard; assertion names cite `## v1.5 Linux Platform H2`, `Phases completed`, `Key accomplishments`, `Methodology highlights`, `DEFER-07/08`; V-61-01..08 already frozen-aware (use inline `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()`); V-61-09..16 assert PROJECT.md / AUDIT_DOC / computed state — cumulative-assertion semantics (they assert v1.5 artifacts were added, not frozen content shape; reading HEAD is correct for these) | V15 = `ba2cbc0` | CONVERT_PLAN_73_02 |
| check-phase-62.mjs | — | `v1.5 close` citation in file header comment block (historical narrative) — NOT in assertion names or readFile bodies; own assertions read docs content, not planning docs; FAILs only via CHAIN subprocess spawning check-phase-61.mjs | — | CASCADE_ONLY |
| check-phase-63.mjs | — | Same pattern as check-phase-62.mjs — `v1.5 close` in historical comment only; own assertions read docs content; FAILs only via CHAIN subprocess spawning check-phase-61 | — | CASCADE_ONLY |
| check-phase-64.mjs | — | Same pattern — `v1.5 close` in historical comment only; own assertions read docs content; FAILs only via CHAIN subprocess spawning check-phase-61 | — | CASCADE_ONLY |
| check-phase-65.mjs | — | Same pattern — `v1.5 close` in historical comment only; own assertions read docs content; FAILs only via CHAIN subprocess spawning check-phase-61 | — | CASCADE_ONLY |
| check-phase-66.mjs | — | readFile calls against HARNESS (v1.6-milestone-audit.mjs), ALLOWLIST (v1.6-audit-allowlist.json), PIN_HELPER, CI_WORKFLOW (.github/workflows/audit-harness-v1.6-integrity.yml), MILESTONE_AUDIT (.planning/milestones/v1.6-MILESTONE-AUDIT.md), DEFERRED_CLEAN (.planning/milestones/v1.6-DEFERRED-CLEANUP.md) — all milestone-artifact reads, NOT live planning docs (MILESTONES.md / REQUIREMENTS.md / ROADMAP.md / STATE.md); `v1.5 close` in historical CHAIN_SKIP comment; V-66-NN assertion names do not cite milestone-close state as assertion semantics | — | NO_HEAD_COUPLING |

---

## Scan Summary

**Total validators scanned:** 19 (`check-phase-{48..66}.mjs`)

**Disposition counts:**
- `CONVERT_PLAN_73_02`: 1 (check-phase-61.mjs — V-61-17..20)
- `ALREADY_FROZEN_AWARE`: 0 in this range (check-phase-{61,67,68,70}.mjs already-frozen-aware files include check-phase-61.mjs for V-61-01..08, but the RETRO-02 conversion target is V-61-17..20 which is NOT frozen-aware)
- `NO_HEAD_COUPLING`: 14 (check-phase-{48,49,50,51,52,53,54,55,56,57,58,59,60,66}.mjs)
- `CASCADE_ONLY`: 4 (check-phase-{62,63,64,65}.mjs)
- `SCOPE_GAP_DEFERRED_V19`: 0

**V14 inclusion decision:** RETRO_01_V14_REQUIRED = false. Zero validators in `{48..66}` range assert v1.4-close state (v1.4 close was Phase 42, predating chain validators introduced at Phase 48). V14 key OMITTED from `MILESTONE_CLOSE_SHAS` per default.

**SCOPE-GAP tripline:** CONVERT_PLAN_73_02 count = 1 (well below 12 anti-ballooning tripline). No `## Anti-ballooning Guardrail Triggered` subsection required. Plan 73-02 RETRO-02 conversion scope is: check-phase-61.mjs (V-61-17..20) — 4 assertions to convert; CASCADE_ONLY files (check-phase-{62..65}.mjs) expected to self-heal once V-61-17 closes (their FAILs are CHAIN cascade, not independent HEAD-coupling).

**Note on check-phase-67.mjs (outside {48..66} scan range):** V-67-05/06 are CONFIRMED HEAD-coupled via wrong frozen-SHA (see Appendix below). These are NOT in this table's scan range but are documented as Plan 73-02 RETRO-02 conversion targets. Total Plan 73-02 scope: check-phase-61.mjs (V-61-17..20) + check-phase-67.mjs (V-67-05/06).

---

## Appendix: V-67-05/06 COMPLEX_CONVERSION Cross-Reference

**Context:** check-phase-67.mjs is OUTSIDE the {48..66} scan range of this inventory table but is documented here as a Plan 73-02 executor reference because it is confirmed as a RETRO-02 conversion target (V-72-CHAIN-67 FAIL witnessed in `.claude/tmp/72-chain-post.txt`).

**Root cause (from RESEARCH.md V-67-05/06 root cause section + `v1.8-DEFERRED-CLEANUP.md:77`):**

- `check-phase-67.mjs` uses `readCorpusFileAtV17Close(path)` which internally calls `git show aa6de68:<path>`
- SHA `aa6de68` = Plan 70-02 Atom 1 (the helper-authoring SHA, per Plan 70-05 substitution convention)
- BUT the corpus content that V-67-05/06 assert (OP-10 callouts in renamed files + Version History rows) was authored at Plan 70-05 Commit B SHA `4df3a16` — AFTER `aa6de68`
- Content at SHA `aa6de68` does NOT contain the OP-10 callouts or Version History rows V-67-05/06 assert
- Therefore `readCorpusFileAtV17Close` returns a file version that pre-dates the SWEEP-02 content additions

**Disposition:** `CONVERT_PLAN_73_02` (COMPLEX_CONVERSION subclass — wrong-SHA issue, not bare readFile(HEAD))

**Conversion target determination (Plan 73-02 executor MUST do this before converting):**

The Plan 73-02 executor must run the following inspection commands to determine the correct conversion target SHA for V-67-05/06:

```bash
# Option A: check if content exists at the true v1.7 close-gate SHA
git show 4df3a16:docs/cross-platform/apple-business/[relevant-file.md] | grep -A5 "OP-10"

# Option B: check if content exists at the helper-authoring SHA
git show aa6de68:docs/cross-platform/apple-business/[relevant-file.md] | grep -A5 "OP-10"
```

If `4df3a16` (true close-gate) resolves the OP-10 callouts and Version History rows, the conversion should use a new `V17_CLOSEGATE: '4df3a16'` entry in `MILESTONE_CLOSE_SHAS` rather than the existing `V17: 'aa6de68'`. This would require Plan 73-02 to:
1. Add `V17_CLOSEGATE: '4df3a16'` to `MILESTONE_CLOSE_SHAS` in `_lib/frozen-at-close.mjs`
2. Add `export const readAtV17CloseGate = (p) => readAtClose('V17_CLOSEGATE', p);` convenience export
3. Update V-67-05/06 to use `readAtV17CloseGate` instead of `readCorpusFileAtV17Close`

If neither SHA resolves the content, V-67-05/06 may need to use `readFile(HEAD)` with a NOTE that these assertions verify current-state (acceptable if content should exist at all milestones going forward).

**Warning:** Do NOT change the `V17` SHA in `MILESTONE_CLOSE_SHAS` from `aa6de68` — changing it would break V-67-01..04, V-68-NN, and V-70-NN assertions that correctly use `aa6de68`. The COMPLEX_CONVERSION subclass for V-67-05/06 requires a SEPARATE SHA entry if `4df3a16` is confirmed.
