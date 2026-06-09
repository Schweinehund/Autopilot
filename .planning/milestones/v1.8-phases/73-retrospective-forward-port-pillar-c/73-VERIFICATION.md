---
phase: 73-retrospective-forward-port-pillar-c
verified: 2026-06-08
status: passed
score: 4/4 SC satisfied
v73_final_state: "RETRO-01 inventory (19 validators; 1 CONVERT + 4 CASCADE_ONLY + 14 NO_HEAD_COUPLING) + 8 CHAIN+AUDIT wrapper folds + _lib/frozen-at-close.mjs (4 milestone SHAs + V17_CLOSEGATE additive) + RETRO-02 frozen-aware conversion (V-61-17..20 + V-67-05/06 + V-70-24 + LIB-V17-CLOSEGATE; 8 assertions total); chain green (39 PASS / 0 FAIL / 1 SKIPPED); 8 V-72-CHAIN-{61..67,70} FAILs flipped PASS; 3 NEW v1.9+ stubs authored; predecessor v1.4..v1.7 invariant preserved"
overrides_applied: 0
---

# Phase 73 Verification — Retrospective Forward-Port (Pillar C)

**Closed:** 2026-06-08 (Plan 73-03)
**Status:** passed
**Plan count:** 3/3 complete
**HEAD SHA at close:** recoverable via `git log --all --grep="73-03" --grep="close-gate" --all-match -1 --format=%H`

---

## Section A — Phase 73 Goal Achievement

Phase 73 (Pillar C — Retrospective Forward-Port) closes **RETRO-01** and **RETRO-02** by performing a class-wide scan of `check-phase-{48..66}.mjs` (19 validators) for HEAD-coupled assertions whose validator name or docstring cites a milestone-close state, producing a per-validator class-signature inventory as a committed artifact (RETRO-01), then converting all identified HEAD-coupled assertions to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers from `_lib/frozen-at-close.mjs` (RETRO-02).

**Phase 73 Goal (ROADMAP.md lines 350-357):** Every HEAD-coupled assertion in check-phase-{48..66}.mjs whose validator name or docstring cites a milestone-close state is identified, inventoried, and converted to the v1.5/v1.6/v1.7-frozen-aware pattern via SHA-pinned helpers — closing the HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective debt.

**Dual value delivered:**

1. **Close CHAIN-DEGRADED-AT-HEAD-01** — The 8 pre-existing V-72-CHAIN-{61..67, 70} FAILs originated from HEAD-coupled assertions in `check-phase-61.mjs` (V-61-17: MILESTONES.md top-H2 drift) and `check-phase-67.mjs` (V-67-05/06: wrong assertion patterns — not SHA mismatch as initially suspected). Plan 73-02 RETRO-02 conversion flipped all 8 FAILs → PASS (confirmed `.claude/tmp/73-chain-post.txt`: 39 PASS / 0 FAIL / 1 SKIPPED). This closes the 7th and final entry in the chicken-and-egg accepted-residual lineage (Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 → 72-01 → 73-01 → **73-02 RESOLUTION**).

2. **Ship class-wide signature inventory deliverable** — `73-RETRO-INVENTORY.md` is a committed markdown artifact (Plan 73-01 atomic SHA `d2b8917`) covering all 19 validators with per-validator disposition (CONVERT_PLAN_73_02 / CASCADE_ONLY / NO_HEAD_COUPLING). Inventory PRECEDES conversion per SC#1 "inventory is a committed artifact" literal contract (REQUIREMENTS.md:25).

**Achievement summary:**

| Deliverable | Landing SHA | Status |
|-------------|-------------|--------|
| RETRO-01: 73-RETRO-INVENTORY.md (19 validators) | `d2b8917` (Plan 73-01) | COMPLETE |
| RETRO-01: 8 CHAIN+AUDIT wrapper fold-ins | `d2b8917` (Plan 73-01) | COMPLETE |
| RETRO-01: _lib/frozen-at-close.mjs (centralized module) | `d2b8917` (Plan 73-01) | COMPLETE |
| RETRO-01: check-phase-73.mjs (chain-apex validator) | `d2b8917` (Plan 73-01) | COMPLETE |
| RETRO-02: V-61-17..20 converted to readAtV15Close | `a85da77` (Plan 73-02) | COMPLETE |
| RETRO-02: V-67-05/06 wrong-pattern fix (content-token callout + VH date-row) | `a85da77` (Plan 73-02) | COMPLETE |
| RETRO-02: V-70-24 SHA fix (aa6de68 → 4df3a16 close-gate) | `a85da77` (Plan 73-02) | COMPLETE |
| RETRO-02: V17_CLOSEGATE additive to _lib/frozen-at-close.mjs | `a85da77` (Plan 73-02) | COMPLETE |
| RETRO-02: V-73-CONVERT-NN array grown (8 entries) | `a85da77` (Plan 73-02) | COMPLETE |
| Close-gate: 73-VERIFICATION.md + traceability + DEFERRED-CLEANUP stubs | Plan 73-03 SHA | COMPLETE |

**Predecessor-byte-unchanged invariant preserved** across the entire Phase 73 window: `git diff d80d556 HEAD -- <v1.4..v1.7 frozen surfaces>` returns EMPTY (v1.4/v1.4.1/v1.5/v1.6/v1.7 workflows + harness MJS + sidecar JSONs BYTE-UNCHANGED).

---

## Section B — Commands Run + Chain Delta-Diff Witness

### Commands Run

**Plan 73-01 Wave 6 — pre-RETRO-02 chain witness:**
```
node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-pre.txt 2>&1
```
Captured at Plan 73-01 atomic SHA `d2b8917`. Records the 8-FAIL baseline (V-73-CHAIN-{61..67, 70} FAIL) defining the delta-witness target for Plan 73-02.

**Plan 73-02 Task 3 — post-RETRO-02 witness:**
```
node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-post.txt 2>&1
```
Captured at Plan 73-02 atomic SHA `a85da77`. Confirms all 8 FAILs flipped → PASS.

**Plan 73-03 Task 1 — final close-gate witness:**
```
node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-final.txt 2>&1
```
Captured at Plan 73-03 pre-commit (no code changes in Plan 73-03; witness matches post-RETRO-02). V-73-AUDIT remains SKIP-PASS at this point (73-VERIFICATION.md being authored in this plan; flip to PASS occurs after this commit lands).

**v1.7-milestone-audit defense-in-depth:**
```
node scripts/validation/v1.7-milestone-audit.mjs > .claude/tmp/73-v17-harness-final.txt 2>&1
```
Result: `Summary: 15 passed, 0 failed, 0 skipped` — predecessor-byte-unchanged invariant confirmed.

**Predecessor-byte-unchanged invariant (REQUIREMENTS.md:69):**
```
git diff d80d556 HEAD -- \
  scripts/validation/v1.4-milestone-audit.mjs \
  scripts/validation/v1.5-milestone-audit.mjs \
  scripts/validation/v1.6-milestone-audit.mjs \
  scripts/validation/v1.7-milestone-audit.mjs \
  scripts/validation/v1.4-audit-allowlist.json \
  scripts/validation/v1.5-audit-allowlist.json \
  scripts/validation/v1.6-audit-allowlist.json \
  scripts/validation/v1.7-audit-allowlist.json \
  .github/workflows/audit-harness-v1.4-integrity.yml \
  .github/workflows/audit-harness-v1.5-integrity.yml \
  .github/workflows/audit-harness-v1.6-integrity.yml \
  .github/workflows/audit-harness-v1.7-integrity.yml
```
Result: **EMPTY** (all 12 predecessor surfaces byte-unchanged since Plan 73-02 base `d80d556`).

Note: `d80d556` is used as the EXPECTED_BASE per the close-gate contract (Plan 73-03 executor instruction). The actual comparison uses the Phase 72 close-gate SHA `67cb0cd` as effective comparison base from Phase 72 precedent, and separately `d80d556` per Plan 73-03 contract specification — both confirm EMPTY output.

### Chain Delta-Diff Witness (Pre-RETRO-02 vs Post-RETRO-02)

| Metric | Pre-RETRO-02 (`.claude/tmp/73-chain-pre.txt`) | Post-RETRO-02 (`.claude/tmp/73-chain-post.txt`) | Close-Gate Final (`.claude/tmp/73-chain-final.txt`) |
|--------|----------------------------------------------|------------------------------------------------|------------------------------------------------------|
| Validator used | check-phase-73.mjs (32 checks) | check-phase-73.mjs (40 checks) | check-phase-73.mjs (40 checks) |
| PASS count | 23 | 39 | 39 |
| FAIL count | **8** | **0** | **0** |
| SKIPPED count | 1 (V-73-AUDIT SKIP-PASS) | 1 (V-73-AUDIT SKIP-PASS) | 1 (V-73-AUDIT SKIP-PASS, flips to PASS post-commit) |
| V-73-CHAIN-61 | `FAIL -- check-phase-61 FAIL: ...V-61-01..04 PASS...` (V-61-17 drift) | `PASS` | `PASS` |
| V-73-CHAIN-62 | `FAIL -- check-phase-62 FAIL: ...cascade from check-phase-61 exit-1` | `PASS` | `PASS` |
| V-73-CHAIN-63 | `FAIL -- check-phase-63 FAIL: ...cascade` | `PASS` | `PASS` |
| V-73-CHAIN-64 | `FAIL -- check-phase-64 FAIL: ...cascade` | `PASS` | `PASS` |
| V-73-CHAIN-65 | `FAIL -- check-phase-65 FAIL: ...cascade` | `PASS` | `PASS` |
| V-73-CHAIN-66 | `FAIL -- check-phase-66 FAIL: ...cascade` | `PASS` | `PASS` |
| V-73-CHAIN-67 | `FAIL -- check-phase-67 FAIL: ...V-67-05/06 wrong patterns` | `PASS` | `PASS` |
| V-73-CHAIN-70 | `FAIL -- check-phase-70 FAIL: ...V-70-24 wrong SHA aa6de68` | `PASS` | `PASS` |
| V-73-CONVERT-61-17..20 | Not present (stub only in Plan 73-01) | `PASS` (4 entries) | `PASS` |
| V-73-CONVERT-67-05/06 | Not present | `PASS` (2 entries) | `PASS` |
| V-73-CONVERT-70-24 | Not present | `PASS` | `PASS` |
| V-73-CONVERT-LIB-V17-CLOSEGATE | Not present | `PASS` | `PASS` |

**Delta:** 8 FAIL → 0 FAIL (all V-72-CHAIN-{61..67, 70} FAILs flipped → PASS at Plan 73-02 SHA `a85da77`). 8 NEW V-73-CONVERT-NN assertions added in Plan 73-02 (check count grew from 32 to 40). Close-gate final matches post-RETRO-02 exactly (no drift between Plan 73-02 and Plan 73-03 pre-commit).

**Chicken-and-egg lineage TERMINAL CLOSURE:** The 7-entry accepted-residual lineage (Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 → 72-01 → 73-01 → **73-02 RESOLUTION**) is now CLOSED. No further accepted-residual FAILs in the v1.8 chain.

---

## Section C — SC#1-4 Satisfaction

### SC#1: Complete per-validator class-signature inventory exists for all 19 validators — SATISFIED

**Evidence:**
- `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` is a committed markdown artifact landed at Plan 73-01 atomic SHA `d2b8917`
- Inventory covers all 19 validators `check-phase-{48..66}.mjs` with columns: validator name, HEAD-coupled assertion IDs, citation evidence, conversion target SHA, disposition
- Disposition counts: CONVERT_PLAN_73_02: 1 (check-phase-61.mjs) / CASCADE_ONLY: 4 (check-phase-{62..65}.mjs) / NO_HEAD_COUPLING: 14 (remaining) / SCOPE_GAP_DEFERRED_V19: 0
- V-73-INVENTORY PASS in `.claude/tmp/73-chain-pre.txt` (line 3): `V-73-INVENTORY: 73-RETRO-INVENTORY.md exists and contains per-validator class-signature table PASS`
- Inventory PRECEDES conversion — Plan 73-01 SHA `d2b8917` landed BEFORE Plan 73-02 SHA `a85da77`
- V14 inclusion outcome: RETRO_01_V14_REQUIRED = false (zero v1.4-close-state assertions found in check-phase-{48..66}.mjs scan; v1.4 close was Phase 42, predating chain validators introduced at Phase 48). `MILESTONE_CLOSE_SHAS.V14` OMITTED per default confirmed.

### SC#2: All identified HEAD-coupled assertions converted via SHA-pinned helpers from _lib/frozen-at-close.mjs — SATISFIED

**Evidence:**
- V-61-17..20: converted from `readFile(MILESTONES_DOC)` → `readAtV15Close('.planning/MILESTONES.md')` at Plan 73-02 SHA `a85da77`. Check names suffixed `[v1.5-frozen @ ba2cbc0]`. V-73-CONVERT-61-17..20 all PASS.
- V-67-05/06: wrong assertion patterns fixed (not wrong SHA — `aa6de68` IS correct; the patterns were wrong). V-67-05 now asserts content-token callout text; V-67-06 now asserts SWEEP-02 date rows + Version History for glossary. V-73-CONVERT-67-05/06 PASS.
- V-70-24: Rule 1 out-of-inventory fix — `readProjectAtV17Close()` (reads at `aa6de68`) only had 7/12 v1.7 reqs; added `readProjectAtV17CloseGate()` helper reading at `4df3a16` (true close-gate SHA). V-73-CONVERT-70-24 PASS.
- V17_CLOSEGATE: `4df3a16` added additively to `_lib/frozen-at-close.mjs` MILESTONE_CLOSE_SHAS + `readAtV17CloseGate` export. V-73-CONVERT-LIB-V17-CLOSEGATE PASS.
- Per `.claude/tmp/73-chain-post.txt` and `.claude/tmp/73-chain-final.txt`: all 8 V-73-CONVERT-NN entries PASS.

### SC#3: Full chain check-phase-{48..73}.mjs exits 0 after conversions — SATISFIED

**Evidence:**
- `.claude/tmp/73-chain-final.txt` Result line: `Result: 39 PASS, 0 FAIL, 1 SKIPPED`
- Exit code: 0 (confirmed by background command completion status)
- SKIPPED: 1 (V-73-AUDIT SKIP-PASS — 73-VERIFICATION.md not yet committed; flips to PASS post-Plan-73-03 landing)
- All 25 V-73-CHAIN-{48..72} entries: PASS (no chain regression guards failing)
- V-73-AUDIT-HARNESS PASS (v1.7-milestone-audit.mjs exits 0 — predecessor-byte-unchanged defense-in-depth)
- V-73-SELF PASS (CHAIN_PHASES excludes 73; CHAIN_SKIP is empty Set — D-22 auditor-independence preserved)

### SC#4: Scope-discipline guardrail honored — SATISFIED

**Evidence:**
- SCOPE-GAP-RETRO-02-OVERFLOW-01 stub OMITTED: Plan 73-01 RETRO-01 inventory surfaced CONVERT_PLAN_73_02 count = 1 (check-phase-61.mjs only), well below the 12 anti-ballooning tripline (REQUIREMENTS.md:67). The `## Anti-ballooning Guardrail Triggered` section was NOT needed. No SCOPE-GAP-class discovery beyond initial inventory.
- 3 NEW v1.8-DEFERRED-CLEANUP.md stubs authored at Plan 73-03 close-gate, each documenting a scoped deferral to v1.9+:
  1. **HELPER-SPAWN-STDERR-01** (D-01 class-type carve-out — 3 helper-spawn stderr-only sites at check-phase-{48, 60, 61}.mjs; deterministic `--self-test` failure-mode justifies v1.9+ class-type distinction)
  2. **FROZEN-AWARE-ADOPTION-SWEEP-01** (D-02 strict-scope-discipline carve-out — existing inline helpers in check-phase-{61, 67, 68, 70}.mjs left byte-unchanged; refactor deferred to v1.9+)
  3. **EXEC-FAIL-DETAIL-EXTRACTION-01** (Phase 72 D-01 deferred-idea hand-off — DRY catch-block stdout+stderr capture across all wrappers; classified as "overkill for the immediate fix" by D-02 advisor)
- D-01 preserved: 3 helper-spawn catch blocks at check-phase-48.mjs:72, check-phase-60.mjs:188, check-phase-61.mjs:403 UNCHANGED
- D-02 preserved: existing inline helpers `readCorpusFileAtV17Close()` / `readSidecarAtV17Close()` in check-phase-67.mjs lines 35-57 BYTE-UNCHANGED; `readProjectAtV17CloseGate()` ADDED (not modified) in check-phase-70.mjs (ADD-not-MODIFY per D-02)
- SCOPE-GAP-RETRO-02-OVERFLOW-01 stub: OMITTED (confirmed by reading 73-02-SUMMARY.md — CONVERT_PLAN_73_02 count = 1, well below 12 threshold; no overflow). Decision documented here to close the conditional.

---

## Section D — Atomic Commit SHAs (Plan 73-01 + 73-02 Byte-Exact)

### Plan 73-01 Atomic SHA

| Field | Value |
|-------|-------|
| **SHA** | `d2b8917f2746d0d1b85da732c38c8509db0d1afa` (short: `d2b8917`) |
| **Commit message** | `feat(73-01): RETRO-01 inventory + 8 wrapper folds + _lib/frozen-at-close + check-phase-73 stub (atomic SC#1 + SC#4)` |
| **Files (9)** | `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` (NEW) · `scripts/validation/_lib/frozen-at-close.mjs` (NEW) · `scripts/validation/check-phase-73.mjs` (NEW) · `scripts/validation/check-phase-60.mjs` (CHAIN+AUDIT wrap fix) · `scripts/validation/check-phase-61.mjs` (CHAIN+AUDIT wrap fix) · `scripts/validation/check-phase-62.mjs` (CHAIN wrap fix) · `scripts/validation/check-phase-63.mjs` (CHAIN wrap fix) · `scripts/validation/check-phase-64.mjs` (CHAIN wrap fix) · `scripts/validation/check-phase-65.mjs` (CHAIN wrap fix) |
| **Atomic invariant** | 9 files in ONE SHA per Phase 67 Plan 67-02 `55260b3` 5-file atomic-within-plan precedent scaled to 9 + Phase 72 Plan 72-01 `d374095` 7-file atomic precedent |
| **Transient state at this SHA** | V-73-CHAIN-{61..67,70} FAIL (8 — documented-residual; 6th chicken-and-egg lineage entry) |
| **Rollback semantics** | `git revert d2b8917` cleanly reverts all 9 files in one operation |

### Plan 73-02 Atomic SHA

| Field | Value |
|-------|-------|
| **SHA** | `a85da773b3b6b5f3a4e368da756609cf22a49948` (short: `a85da77`) |
| **Commit message** | `fix(73-02): RETRO-02 per-validator HEAD-coupled assertion conversion to frozen-aware (atomic SC#4)` |
| **Files (5)** | `scripts/validation/check-phase-61.mjs` (V-61-17..20 converted) · `scripts/validation/check-phase-67.mjs` (V-67-05/06 assertion pattern fix) · `scripts/validation/check-phase-70.mjs` (V-70-24 SHA fix + readProjectAtV17CloseGate) · `scripts/validation/_lib/frozen-at-close.mjs` (additive V17_CLOSEGATE entry) · `scripts/validation/check-phase-73.mjs` (V-73-CONVERT-NN array grown 8 entries) |
| **Atomic invariant** | 5 files in ONE SHA per Phase 67 Plan 67-02 `55260b3` 5-file atomic-within-plan precedent |
| **Transient state at this SHA** | V-73-AUDIT SKIP-PASS (73-VERIFICATION.md not yet authored — expected; flips to PASS at Plan 73-03) |
| **Rollback semantics** | `git revert a85da77` cleanly reverts all 5 files + undoes the 8-FAIL closure in one operation |

**Atomic-within-plan invariant:** Each plan's code changes are bisect-revertible as one unit. If any single conversion in Plan 73-02 regresses, the whole `a85da77` SHA is bisect-revertible. Both plans are bisect-clean from each other and from the Plan 73-03 docs-only close-gate commit.

---

## Section E — Per-Validator Conversion Record

This section is the **V-73-AUDIT assertion target** per `check-phase-73.mjs` regex `/Phase 73 verification/i`. The file existence + heading presence check transitions V-73-AUDIT from SKIP-PASS → PASS once this Plan 73-03 commit lands.

| Validator | Converted assertion IDs | Conversion type | Frozen SHA tag | Commit |
|-----------|------------------------|-----------------|----------------|--------|
| check-phase-61.mjs | V-61-17 | readFile(MILESTONES_DOC) → readAtV15Close | `ba2cbc0` (V15) | `a85da77` |
| check-phase-61.mjs | V-61-18 | readFile(MILESTONES_DOC) → readAtV15Close | `ba2cbc0` (V15) | `a85da77` |
| check-phase-61.mjs | V-61-19 | readFile(MILESTONES_DOC) → readAtV15Close | `ba2cbc0` (V15) | `a85da77` |
| check-phase-61.mjs | V-61-20 | readFile(MILESTONES_DOC) → readAtV15Close | `ba2cbc0` (V15) | `a85da77` |
| check-phase-67.mjs | V-67-05 | Wrong-pattern fix (OP-10 literal → content-token callout) | `aa6de68` (V17, unchanged) | `a85da77` |
| check-phase-67.mjs | V-67-06 | Wrong-pattern fix (VH heading → SWEEP-02 date rows) | `aa6de68` (V17, unchanged) | `a85da77` |
| check-phase-70.mjs | V-70-24 | Wrong-SHA fix (readProjectAtV17Close → readProjectAtV17CloseGate) | `4df3a16` (V17_CLOSEGATE, NEW) | `a85da77` |
| _lib/frozen-at-close.mjs | V17_CLOSEGATE entry | Additive: new entry + readAtV17CloseGate export | `4df3a16` | `a85da77` |

**Cross-reference to 73-RETRO-INVENTORY.md:**

| Inventory row | Disposition | Plan 73-02 outcome |
|---------------|-------------|-------------------|
| check-phase-61.mjs (V-61-17..20) | CONVERT_PLAN_73_02 | CONVERTED — readAtV15Close at `ba2cbc0` [v1.5-frozen @ ba2cbc0] |
| check-phase-62.mjs | CASCADE_ONLY | SELF-HEALED (cascade from V-61 closure; no direct modification) |
| check-phase-63.mjs | CASCADE_ONLY | SELF-HEALED |
| check-phase-64.mjs | CASCADE_ONLY | SELF-HEALED |
| check-phase-65.mjs | CASCADE_ONLY | SELF-HEALED |
| check-phase-{48,49,50,51,52,53,54,55,56,57,58,59,60,66}.mjs | NO_HEAD_COUPLING | UNMODIFIED (no conversion needed) |

**Out-of-inventory Rule 1 conversions (not in 73-RETRO-INVENTORY.md scan range {48..66}, required by MUST HAVE contract):**
- check-phase-67.mjs (V-67-05/06) — Appendix entry in 73-RETRO-INVENTORY.md; complex-conversion subclass; actual root cause was wrong patterns not wrong SHA
- check-phase-70.mjs (V-70-24) — Rule 1 bug fix discovered during Plan 73-02 Task 3 chain re-run; check-phase-70.mjs outside {48..66} scan range

---

## Section F — Discoveries

### Discovery 1: V-67-05/06 alternative root cause — wrong assertion patterns (not wrong SHA)

**Empirical investigation in Plan 73-02 Task 1:**
- `git show aa6de68:docs/admin-setup-ios/05-app-deployment.md | grep OP-10` → **0 results** at both `aa6de68` and `4df3a16`
- `git show aa6de68:docs/admin-setup-ios/05-app-deployment.md` → DOES contain `"Apple calls this artifact a \"content token\""` and the `| 2026-05-26 |` SWEEP-02 change row

**Root cause determined:** SHA `aa6de68` is CORRECT for V-67-05/06 (content IS present at that SHA). The original assertion patterns were wrong:
- V-67-05 searched for literal `OP-10` — a PITFALLS.md pattern label, never written into corpus files. The SWEEP-02 commit inserted a `> **Note:** Apple calls this artifact a "content token"` blockquote callout.
- V-67-06 searched for `version history` heading or `## *history` — but the deployment docs use bare tail tables `| Date | Change | Author |` with NO `## Version History` heading (only `docs/_glossary-macos.md` has that heading).

**V17_CLOSEGATE was added for V-70-24 (separate issue):** `readProjectAtV17Close()` at `aa6de68` only finds 7/12 v1.7 requirements because CHAIN-01..03 + HARNESS-05/06 were added in Plan 70-05 Commit B `4df3a16` (true close-gate), not at Atom 2 `aa6de68`. The `V17_CLOSEGATE: '4df3a16'` entry was added additively to `_lib/frozen-at-close.mjs`; the original V17 entry (`'aa6de68'`) is UNCHANGED (preserving V-67-01..04, V-68-NN, V-70-NN assertions that correctly use `aa6de68`).

### Discovery 2: V14 OMITTED (confirmed)

RETRO-01 scan confirmed zero v1.4-close-state assertions in `check-phase-{48..66}.mjs`. v1.4 close was Phase 42, predating chain validators introduced at Phase 48. `MILESTONE_CLOSE_SHAS.V14` OMITTED per default. No b5cf529 or 671f72a candidates needed.

### Discovery 3: V-73-WRAPPER-NEG helper-spawn false-positive (Plan 73-01 Rule 1 fix)

Pre-commit dry-run in Plan 73-01 Task 5 revealed that the `CHAIN_WRAPPER_ANCHOR` regex (400-char gap) was broad enough to match the helper-spawn catch block at `check-phase-60.mjs:188` (`PIN_HELPER --self-test`), causing V-73-WRAPPER-NEG to FAIL with "2 stderr-only CHAIN wrapper(s)." The fix added an `isChainWrapper` discriminator in `check-phase-73.mjs` to distinguish CHAIN wrappers (whose return string contains `'check-phase-'`) from helper-spawn wrappers (which contain `'--self-test FAIL:'`). Landed in Plan 73-01 atomic SHA `d2b8917`.

### Discovery 4: SCOPE-GAP-RETRO-02-OVERFLOW-01 stub OMITTED (tripline NOT triggered)

RETRO-01 inventory found CONVERT_PLAN_73_02 count = 1 (check-phase-61.mjs only). Well below the 12 anti-ballooning tripline (REQUIREMENTS.md:67). No overflow. SCOPE-GAP-RETRO-02-OVERFLOW-01 stub OMITTED per conditional design — confirmed by reading 73-01-SUMMARY.md `## RETRO-01 Inventory Scan Outcome` section.

---

## Section G — Phase 74 Entry-State Readiness Signal

Phase 73 is CLOSED. Phase 74 (Pillar D — v1.8 Audit Harness Lineage Bump + Milestone Close) inherits the following entry-state from Phase 73 close-gate:

### 1. Clean chain (8 V-72-CHAIN FAILs closed permanently)

V-72-CHAIN-{61..67, 70} FAILs are CLOSED at Plan 73-02 SHA `a85da77`. No remaining CHAIN-DEGRADED-AT-HEAD-01 residual. Phase 74 HARNESS-09 (check-phase-74.mjs) inherits a chain that exits 0 with 0 FAIL.

### 2. `_lib/frozen-at-close.mjs` available for v1.9+ adoption sweep

`scripts/validation/_lib/frozen-at-close.mjs` ships with:
- `MILESTONE_CLOSE_SHAS = { V141: '5c976ec', V15: 'ba2cbc0', V16: '9d8877c', V17: 'aa6de68', V17_CLOSEGATE: '4df3a16' }`
- `readAtClose()` (hardened signature: encoding, timeout, stdio, CRLF normalization)
- Convenience exports: `readAtV141Close`, `readAtV15Close`, `readAtV16Close`, `readAtV17Close`, `readAtV17CloseGate`

Phase 74 HARNESS-07..12 may consume this module when authoring new assertions. Phase 74 HARNESS-12 finalizes `v1.8-DEFERRED-CLEANUP.md` where FROZEN-AWARE-ADOPTION-SWEEP-01 stub lives (v1.9+ adoption of `_lib/frozen-at-close.mjs` by existing inline helpers in check-phase-{61, 67, 68, 70}.mjs).

### 3. check-phase-73.mjs available as HARNESS-09 Path-A source

`scripts/validation/check-phase-73.mjs` (Plan 73-01 SHA `d2b8917`, grown in `a85da77`) serves as Path-A source for Phase 74 HARNESS-09 `check-phase-74.mjs` — the chain-apex validator for Phase 74.

### 4. MILESTONE_CLOSE_SHAS V17_CLOSEGATE available for HARNESS-08

The `V17_CLOSEGATE: '4df3a16'` entry in `_lib/frozen-at-close.mjs` is available if Phase 74 HARNESS-08 needs to reference the true v1.7 close-gate SHA (e.g., for BASELINE_12 documentation or v1.8-audit-allowlist.json shape verification).

### 5. 3 NEW v1.8-DEFERRED-CLEANUP.md stubs for Phase 74 HARNESS-12 finalization

| Stub ID | Scope | Phase 74 action |
|---------|-------|-----------------|
| HELPER-SPAWN-STDERR-01 | 3 helper-spawn stderr-only sites at check-phase-{48, 60, 61}.mjs | Preserve in DEFERRED-CLEANUP.md (v1.9+ pickup) |
| FROZEN-AWARE-ADOPTION-SWEEP-01 | 13 inline helpers in check-phase-{61, 67, 68, 70}.mjs | Preserve in DEFERRED-CLEANUP.md (v1.9+ pickup) |
| EXEC-FAIL-DETAIL-EXTRACTION-01 | DRY catch-block stdout+stderr capture across all wrappers | Preserve in DEFERRED-CLEANUP.md (v1.9+ pickup) |

Phase 74 HARNESS-12 inherits these stubs and finalizes `v1.8-DEFERRED-CLEANUP.md` with v1.7 carry-overs (CI-3 + Multi-tenant + ABDevice API + per-OU CRD + Account Holder + ASM) promoted to full sections per REQUIREMENTS.md:41.

### 6. Predecessor-byte-unchanged invariant status at Phase 73 close

`git diff d80d556 HEAD -- <v1.4..v1.7 frozen surfaces>` returns EMPTY. Phase 74 inherits a clean predecessor surface — no v1.4/v1.4.1/v1.5/v1.6/v1.7 frozen artifact was modified across the entire v1.8 Phases 71-73 window.

---

## Section H — Sign-Off

- **RETRO-01 CLOSED** — `73-RETRO-INVENTORY.md` committed at Plan 73-01 atomic SHA `d2b8917` (9 files: inventory artifact + 8 CHAIN+AUDIT wrapper folds + `_lib/frozen-at-close.mjs` + `check-phase-73.mjs` stub). SC#1 SATISFIED.
- **RETRO-02 CLOSED** — All identified HEAD-coupled assertions converted at Plan 73-02 atomic SHA `a85da77` (5 files: V-61-17..20 + V-67-05/06 + V-70-24 + V17_CLOSEGATE + V-73-CONVERT-NN×8). SC#2 SATISFIED.
- **SC#3 SATISFIED** — Full chain check-phase-{48..73}.mjs exits 0 with 0 FAIL (final witness `.claude/tmp/73-chain-final.txt`: 39 PASS / 0 FAIL / 1 SKIPPED).
- **SC#4 SATISFIED** — Scope-discipline guardrail honored: 3 NEW v1.8-DEFERRED-CLEANUP.md stubs authored (HELPER-SPAWN-STDERR-01 + FROZEN-AWARE-ADOPTION-SWEEP-01 + EXEC-FAIL-DETAIL-EXTRACTION-01); SCOPE-GAP-RETRO-02-OVERFLOW-01 OMITTED (CONVERT_PLAN_73_02 count = 1, below 12 tripline).
- **4/4 SC satisfied** — Phase 73 (Pillar C — Retrospective Forward-Port) COMPLETE.
- **Plan 73-01 atomic SHA:** `d2b8917` (9 files in ONE commit)
- **Plan 73-02 atomic SHA:** `a85da77` (5 files in ONE commit)
- **Plan 73-03 close-gate SHA:** recoverable via `git log --all --grep="73-03" --grep="close-gate" --all-match -1 --format=%H`
- **CHAIN-DEGRADED-AT-HEAD-01:** CLOSED — 8 V-72-CHAIN-{61..67,70} FAILs flipped → PASS at Plan 73-02 SHA `a85da77`. Chicken-and-egg accepted-residual lineage TERMINATED after 7 entries spanning Phase 68-05 through Phase 73-02.
- **Hand-off to Phase 74 (Pillar D — v1.8 Audit Harness Lineage Bump + Milestone Close) confirmed.**
- **Phase 73 (Retrospective Forward-Port — Pillar C) CLOSED 2026-06-08.**

---

*Phase 73 verification artifact authored across 3 plans: Plan 73-01 contributed RETRO-01 inventory + 8 wrapper folds + _lib/frozen-at-close.mjs + check-phase-73.mjs stub; Plan 73-02 contributed RETRO-02 frozen-aware conversions + V-73-CONVERT-NN×8; Plan 73-03 close-gate appended all Sections A-H into this final form.*
