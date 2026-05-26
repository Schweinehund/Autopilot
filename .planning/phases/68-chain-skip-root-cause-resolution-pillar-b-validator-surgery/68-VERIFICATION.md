---
phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
verified: 2026-05-26
status: passed
score: 5/5 SC satisfied (CHAIN-01 + CHAIN-02 + CHAIN-03 + V-61-19/20 + self-test)
v68_final_state: "Full chain check-phase-{48..66}.mjs exits 0 across all 19 phases with 0 SKIPPED (first time since v1.5 close); v1.5-milestone-audit.mjs 12/12 PASS in fully-blocking mode; v1.6-milestone-audit.mjs 15/15 PASS unchanged; regenerate-supervision-pins.mjs --self-test PASS"
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 4/5 plans complete
  gaps_closed: []
  gaps_remaining: []
  regressions: []
verifier_cross_check:
  verified: TBD (cross-check agent run; gsd-verifier may append a verification matrix as in 67-VERIFICATION.md precedent)
  verifier: TBD (gsd-verifier)
  status: TBD
  goal_backward_evidence_count: TBD
  observations: []
---

# Phase 68 — Verification & Close-Gate Report

**Closed:** 2026-05-26 (Plan 68-05)
**Status:** passed
**Plan count:** 5/5 complete
**HEAD SHA at close:** populated post-commit (this close-gate commit lands traceability + verification artifact atomically; SHA self-reference impossible — recoverable via `git log`)

---

## Section A — Phase 68 Goal Achievement

Phase 68 (Pillar B — Validator Surgery) closes the 5-entry `CHAIN_SKIP {48, 51, 58, 60, 61}` suppression that had been carried since v1.5 close at `scripts/validation/check-phase-{62,63,64,65,66}.mjs`. The full chain `check-phase-{48..66}.mjs` now exits 0 across all 19 phases with 0 SKIPPED entries — for the first time since v1.5 close — without any CHAIN_SKIP duplication.

**5-plan cascade resolved 3 requirements (CHAIN-01 + CHAIN-02 + CHAIN-03):**

| Plan | Requirement | Commit | Files | Atomic? |
|------|-------------|--------|-------|---------|
| 68-01 | CHAIN-01 (CRLF readFile centralization) | `36a753d` | check-phase-{51,58}.mjs (2 files) | per-plan |
| 68-02 | CHAIN-02 (archive-path helper + self-test repoint + v1.5 sidecar broad rebase) | `79c65c6` | `_lib/archive-path.mjs` (NEW) + check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs + v1.5-audit-allowlist.json (8 files) | per-plan (single coordinated commit) |
| 68-03 Task 1 | (precondition) V-61-01..04 v1.5-frozen-aware | `d7d7d5f` | check-phase-61.mjs (1 file) | precondition |
| 68-03 Task 2 | CHAIN-03 (atomic CHAIN_SKIP empty-Set) | `7b635ca` | check-phase-{62,63,64,65,66}.mjs (5 files) | **ATOMIC** (per ROADMAP SC#4 + Phase 66-02 `3a9a671` precedent) |
| 68-04 | MILESTONES.md cdcce23 garbage-entry deletion (V-61-19/20 PASS) | `d142c7a` | .planning/MILESTONES.md (1 file) | per-plan |
| 68-05 | close-gate (this commit) | (self-referential — see post-commit `git log`) | 11+ files (2 NEW + 9 modified + 5 chain validators for `{68_03_SHA}` fill in preceding commit `3814bee`) | per-plan |

**Cascade narrative:**

1. **Plan 68-01** centralized CRLF normalization in `check-phase-51.mjs:17` + `check-phase-58.mjs:21` `readFile()` helpers via verbatim copy of the `.replace(/\r\n/g, '\n')` idiom from `check-phase-48.mjs:25` (Phase 31 `ca40eb9` lineage). Closes CHAIN-01 via INTENT-equivalence per D-01 Option B.
2. **Plan 68-02** introduced the `scripts/validation/_lib/archive-path.mjs` shared helper, applied it across 5 validator call-sites + `regenerate-supervision-pins.mjs` BASELINE_9 `_glossary-android.md` coord rebase (+1 banner shift), repointed `parseAllowlist()` v1.5 → v1.6 sidecar, and broad-rebased the v1.5-audit-allowlist.json across 4 array keys (17 _glossary-android.md entries +1 shifted). STRETCH-closed the pre-existing check-phase-31 silent-swallow data-integrity bug via `_missing` discriminator marker.
3. **Plan 68-04** deleted lines 3-71 (70 lines) of `.planning/MILESTONES.md` — the cdcce23 archive-script garbage v1.5 H2 entry — promoting the correct entry (Shipped: 2026-05-07) to line 3. V-61-19 + V-61-20 flipped FAIL → PASS.
4. **Plan 68-03** discovered a stop-gate at the cascade-verification step: V-61-01..04 still FAILed because REQUIREMENTS.md was reorganized for v1.7 post-v1.5-close (the `## v1.5 Requirements (Active)` section was migrated to PROJECT.md `## Validated` per Phase 61-03 commit `0302100`, and the file's Active section is now `## v1.7 Requirements (Active)` per commit `939a8af`). User-approved Option A pivot at checkpoint: validator surgery on check-phase-61.mjs to read REQUIREMENTS.md state at v1.5-close SHA `ba2cbc0` via `execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'])` instead of HEAD. Committed as separate precondition `d7d7d5f`. Then the atomic CHAIN-03 commit `7b635ca` substituted `CHAIN_SKIP = new Set([48, 51, 58, 60, 61])` → `CHAIN_SKIP = new Set([])` across all 5 chain validators (62/63/64/65/66) in single SHA per Phase 66-02 `3a9a671` precedent, with the uniform Phase-68-closure narrative replacing the per-file canonical comment blocks. Subprocess timeout bumped from 60000ms → 300000ms across 10 sites (deviation Rule 3 auto-fix) to accommodate the recursive chain traversal that empty CHAIN_SKIP forces.
5. **Plan 68-05 (this commit)** lands the verification artifact + v1.7-DEFERRED-CLEANUP.md stub + traceability flips across PROJECT.md / REQUIREMENTS.md / STATE.md / ROADMAP.md. The preceding commit `3814bee` filled the `{68_03_SHA}` placeholder with `7b635ca` across the 5 chain validators (split from this commit because the placeholder substitution is validator-source change while this commit is documentation + planning-doc-traceability only).

---

## Section B — Commands Run + Verification Evidence

Captured live during Plan 68-05 close-gate execution on 2026-05-26.

### Full chain check-phase-{48..66}.mjs

(Captured post-Plan-68-03 atomic commit `7b635ca`; reproduced from 68-03-SUMMARY.md "Full-Chain Post-Commit Verification" block. The placeholder-fill commit `3814bee` is comment-only and changes no validator semantics — chain status preserved byte-equivalently.)

```
phase-48 exit=0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED
phase-49 exit=0 | Summary: 22 passed, 0 failed, 0 skipped
phase-50 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-51 exit=0 | Summary: 25 passed, 0 failed, 0 skipped
phase-52 exit=0 | Summary: 22 passed, 0 failed, 0 skipped
phase-53 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-54 exit=0 | Summary: 32 passed, 0 failed, 0 skipped
phase-55 exit=0 | Summary: 32 passed, 0 failed, 0 skipped
phase-56 exit=0 | Summary: 32 passed, 0 failed, 0 skipped
phase-57 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-58 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-59 exit=0 | Summary: 36 passed, 0 failed, 0 skipped
phase-60 exit=0 | Result: 25 PASS, 0 FAIL, 0 SKIPPED
phase-61 exit=0 | Result: 34 PASS, 0 FAIL, 0 SKIPPED
phase-62 exit=0 | Result: 34 PASS, 0 FAIL, 0 SKIPPED
phase-63 exit=0 | Result: 32 PASS, 0 FAIL, 0 SKIPPED
phase-64 exit=0 | Result: 29 PASS, 0 FAIL, 0 SKIPPED
phase-65 exit=0 | Result: 33 PASS, 0 FAIL, 0 SKIPPED
phase-66 exit=0 | Result: 28 PASS, 0 FAIL, 0 SKIPPED
---
FAILURES:
Total SKIPPED: 0
```

**ALL 19 phases exit=0; 0 FAILURES; 0 SKIPPED — first time since v1.5 close.**

### Post-placeholder-fill spot verification (Plan 68-05 Commit A `3814bee`)

```
$ node scripts/validation/check-phase-62.mjs ; echo exit=$?
Result: 34 PASS, 0 FAIL, 0 SKIPPED ; exit=0
$ node scripts/validation/check-phase-63.mjs ; echo exit=$?
Result: 32 PASS, 0 FAIL, 0 SKIPPED ; exit=0
$ node scripts/validation/check-phase-64.mjs ; echo exit=$?
Result: 29 PASS, 0 FAIL, 0 SKIPPED ; exit=0
```

check-phase-{65,66} skipped from the placeholder-fill spot check (each ~102s+ standalone; full-chain regression already verified at Plan 68-03 post-commit and the substitution is comment-only). Forward verification at Phase 69 CI-Linux first-run will re-validate.

### Milestone harnesses + self-test

```
$ node scripts/validation/v1.5-milestone-audit.mjs ; echo exit=$?
Summary: 12 passed, 0 failed, 0 skipped ; exit=0

$ node scripts/validation/v1.6-milestone-audit.mjs ; echo exit=$?
Summary: 15 passed, 0 failed, 0 skipped ; exit=0

$ node scripts/validation/regenerate-supervision-pins.mjs --self-test ; echo exit=$?
Un-pinned Tier-2 count: 0 (all supervision occurrences classified or explicitly pinned)
Self-test: PASS ; exit=0
```

| Validator/Harness | Exit Code | Summary | SC Mapping |
|-------------------|-----------|---------|------------|
| check-phase-48.mjs | 0 | 7/7 PASS | SC#2 (CHAIN-02 archive-path) |
| check-phase-49..50.mjs | 0 | unchanged | regression-free |
| check-phase-51.mjs | 0 | 25/25 PASS | SC#1 (CHAIN-01 INTENT) |
| check-phase-52..57, 59.mjs | 0 | unchanged | regression-free |
| check-phase-58.mjs | 0 | 26/26 PASS | SC#1 |
| check-phase-60.mjs | 0 | 25/25 PASS | SC#3 (cascade — V-60-08/10/12/23/24/25 closed) |
| check-phase-61.mjs | 0 | 34/34 PASS | SC#3 (cascade + V-61-01..04 v1.5-frozen-aware + V-61-19/20 close from Plan 68-04) |
| check-phase-62..66.mjs | 0 | 34/32/29/33/28 PASS | SC#4 (atomic CHAIN_SKIP empty-Set) |
| v1.5-milestone-audit.mjs | 0 | 12/12 PASS | SC#2 (v1.5 sidecar broad rebase landed) |
| v1.6-milestone-audit.mjs | 0 | 15/15 PASS | regression-free |
| regenerate-supervision-pins.mjs --self-test | 0 | identical diff; un-pinned Tier-2 count: 0 | SC#5 (self-test exits 0; validator-only-commit verified for CHAIN-03) |

---

## Section C — SC#1-5 Satisfaction (ROADMAP.md Phase 68 SC#1-5)

### SC#1: CHAIN-01 — CRLF regex mismatch resolved (INTENT compliance) — ✓ CLOSED

**Evidence:**
- `check-phase-51.mjs:17` `readFile()` body returns `readFileSync(abs, 'utf8').replace(/\r\n/g, '\n')` (Plan 68-01 SHA `36a753d`)
- `check-phase-58.mjs:21` same edit shape with identical inline comment
- Both validators exit 0 with 25/25 + 26/26 PASS counts unchanged from pre-edit baseline
- No false positives introduced (sister-validator regression sweep across check-phase-{49,52..57,59,62..66} byte-identical pre/post-edit per Plan 68-01 SUMMARY Sister-Validator Regression Sweep table)
- ROADMAP SC#1 literal "regex updated to `\r?\n`" — NOT literally satisfied; INTENT-equivalence achieved via read-time normalization (renders the validator's `\n` regex semantically equivalent to `\r?\n` regardless of on-disk line endings)
- D-01 dossier adversarial-wedge protection: Option A regex inventory would have injected ~9 semantic-bug edits to `[^\n]*` negated character classes at check-phase-51.mjs:190-192/205-208/221-223; Option B avoids this entirely
- Forward coordination flag: Phase 70 HARNESS-03 `check-phase-68.mjs` self-verifier (when Path-A copying check-phase-66.mjs → check-phase-{67..70}.mjs) MUST verify CHAIN-01 via INTENT (exit 0 + 0 CHAIN_SKIP) not literal-letter source grep — see Section F below

**Closing commit:** Plan 68-01 SHA `36a753d`

### SC#2: CHAIN-02 — Archive-path detection + self-test line-drift fix — ✓ CLOSED

**Evidence:**
- `scripts/validation/_lib/archive-path.mjs` (NEW; 27 lines) exports `resolveArchivedPhasePath(phaseSuffix, milestoneRoots=['v1.5-phases'])` — first inhabitant of `_lib/` subdirectory
- 5 call-site replacements via helper import:
  - check-phase-48.mjs:83 (V-48-05); 7/7 PASS (was 5/7)
  - check-phase-60.mjs:30 + 32 (BROKEN_LINKS_INVENTORY + CALIBRATION_DOC); 25/25 PASS (V-60-08 + V-60-23 + V-60-24 + V-60-25 all PASS)
  - check-phase-62.mjs:41 + check-phase-63.mjs:48 (ANCHOR_INVENTORY consts; pass `['v1.6-phases']`)
  - check-phase-31.mjs:32 STRETCH (silent-swallow data-integrity bug closed via `_missing` discriminator marker; V-31-21 + V-31-24 preserved post-fix via helper resolving file at archived `.planning/milestones/v1.3-phases/31-ios-l2-investigation/placeholder-inventory.json`)
- `regenerate-supervision-pins.mjs` BASELINE_9 _glossary-android.md coords `{79, 81, 181, 198}` → `{80, 82, 182, 199}` (+1 banner shift for Phase 62-07 Apple Business banner at line 13); `parseAllowlist()` repointed v1.5 → v1.6 sidecar (line 422); 7-line BASELINE_9 attribution comment added
- `v1.5-audit-allowlist.json` broad rebase across 4 array keys (17 _glossary-android.md entries +1 shifted): `supervision_exemptions[]` (9), `c7_knox_allowlist[]` (5), `safetynet_exemptions[]` (2), `c9_exemptions[]` (1); non-_glossary-android.md entries untouched; JSON parses cleanly
- `v1.5-milestone-audit.mjs` 12/12 PASS in fully-blocking mode (was 9/12 with C2/C7/C9 FAIL)
- `regenerate-supervision-pins.mjs --self-test` PASS (was FAIL with 4 false-negatives + 7 false-positives + 1 un-pinned Tier-2 at :80; now Diff: identical / Un-pinned Tier-2 count: 0 / Self-test: PASS)
- `v1.6-milestone-audit.mjs` 15/15 PASS unchanged (T-68-02-AR regression mitigation verified)

**Closing commit:** Plan 68-02 SHA `79c65c6`

### SC#3: CHAIN-03 cascade — check-phase-60 + check-phase-61 PASS without suppression — ✓ CLOSED

**Evidence:**
- check-phase-60.mjs 25/25 PASS post-Plan-68-02 (V-60-08/10/12/23/24/25 all closed via helper + sidecar rebase; cascade clear)
- check-phase-61.mjs 34/34 PASS post-Plan-68-04 + post-Plan-68-03 Task 1:
  - V-61-17 + V-61-18 PASS (top-H2 indexOf now returns correct entry post-cdcce23 deletion)
  - V-61-19 + V-61-20 PASS (Methodology highlights + DEFER-07/DEFER-08 cited)
  - V-61-01..04 PASS via v1.5-frozen-aware helper `readRequirementsAtV15Close()` reading REQUIREMENTS.md state at v1.5-close SHA `ba2cbc0` via `execFileSync('git', ['show', ...])` — Option A pivot per Plan 68-03 Task 1 SHA `d7d7d5f`
- Both validators exit 0 on Windows host without CHAIN_SKIP suppression

**Closing commits:** Plan 68-02 SHA `79c65c6` + Plan 68-03 Task 1 SHA `d7d7d5f` (v1.5-frozen-aware precondition) + Plan 68-04 SHA `d142c7a` (MILESTONES.md cdcce23 deletion)

### SC#4: CHAIN_SKIP atomic removal across check-phase-62..66.mjs — ✓ CLOSED

**Evidence:**
- check-phase-62.mjs:67 + 63:74 + 64:73 + 65:69 + 66:64 all carry `const CHAIN_SKIP = new Set([]);` (5 files in ONE indivisible git SHA per Phase 66-02 atomic-harness-commit precedent commit `3a9a671`)
- Each per-file canonical CHAIN_SKIP comment block replaced with uniform Phase-68-closure narrative citing `{68_01_SHA}=36a753d / {68_02_SHA}=79c65c6 / {68_03_SHA}=7b635ca / {68_04_SHA}=d142c7a / d7d7d5f for Plan 68-03 Task 1 precondition`. The `{68_05_SHA}` placeholder remains as literal `{68_05_SHA}` — Plan 68-05's own SHA cannot be substituted before this commit lands (recoverable via `git log`)
- Atomic-commit boundary verified: `git log --name-only -1 7b635ca` returns exactly 5 files (no others); diff stat `5 files changed, 102 insertions(+), 101 deletions(-)`
- V-NN-SELF + V-66-07 compatibility preserved: V-{62,63,64,65,66}-SELF all PASS (assertion logic `phaseNum NOT in CHAIN_PHASES` independent of CHAIN_SKIP contents; printed detail string updates from `[48,51,58,60,61]` to `[]`); V-66-07 PASS (asserts substring in v1.6-DEFERRED-CLEANUP.md which is untouched by Plan 68-03)
- Subprocess timeout 60000ms → 300000ms bumped across 10 sites (2 per file × 5 files) per deviation Rule 3 auto-fix (empty CHAIN_SKIP forces recursive chain traversal; check-phase-65 standalone now ~102s; original 60s would trip V-66-CHAIN-65 with empty-stderr timeout-kill signature)
- Plan 68-05 Commit A `3814bee` filled the `{68_03_SHA}` placeholder substitution across the 5 chain validators (10 occurrences = 2 per file); comment-only change with no semantic effect
- Full chain check-phase-{48..66}.mjs exits 0 across all 19 phases with 0 total SKIPPED — first time since v1.5 close

**Closing commit:** Plan 68-03 Task 2 atomic SHA `7b635ca` (+ Plan 68-05 Commit A `3814bee` for `{68_03_SHA}` placeholder fill)

### SC#5: regenerate-supervision-pins.mjs --self-test exits 0; no out-of-band corpus edits — ✓ CLOSED

**Evidence:**
- `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 with output `Un-pinned Tier-2 count: 0 (all supervision occurrences classified or explicitly pinned) / Self-test: PASS`
- Plan 68-02 BASELINE_9 +1 banner shift + sidecar lineage repoint v1.5→v1.6 resolved the self-test FAIL state (was: 4 false-negatives + 7 false-positives + 1 un-pinned Tier-2 at :80)
- Plan 68-01 + 68-02 + 68-03 are ALL validator-only commits (zero `docs/*` corpus edits — verified via `git log --name-only` against each commit)
- Plan 68-04 `.planning/MILESTONES.md` edit is planning-doc remediation, NOT corpus per CONTEXT.md D-04 §"Empirical grounding 1" (corpus = `docs/*` per 4 independent SoT: REQUIREMENTS.md:4 + :48 + ROADMAP.md:283 + STATE.md:145). SC#5 does NOT block this edit; the topological separation from CHAIN-03 atomic commit preserves auditor clarity per ROADMAP SC#5 letter
- Plan 68-05 (this commit) + preceding Commit A `3814bee` are validator-comment + planning-doc edits only; zero `docs/*` corpus edits

**Closing commit:** Plan 68-02 SHA `79c65c6` (self-test mechanism) + chain-wide audit at this Plan 68-05 close-gate

---

## Section D — Atomic-Commit SHA Record

For v1.7-MILESTONE-AUDIT.md Phase 70 HARNESS-06 traceability sweep, the canonical Phase 68 closing SHAs are:

| Plan | Commit SHA | Files | Atomic? | Note |
|------|-----------|-------|---------|------|
| 68-01 | `36a753d` | check-phase-{51,58}.mjs (2 files) | per-plan | CHAIN-01 CRLF readFile centralization (D-01 Option B) |
| 68-02 | `79c65c6` | _lib/archive-path.mjs (NEW) + check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs + v1.5-audit-allowlist.json (8 files) | per-plan (single coordinated commit) | CHAIN-02 helper + BASELINE_9 +1 shift + v1.5 sidecar broad rebase |
| 68-03 Task 1 | `d7d7d5f` | check-phase-61.mjs (1 file) | precondition | V-61-01..04 v1.5-frozen-aware (Option A pivot; user-approved at checkpoint) |
| 68-03 Task 2 | `7b635ca` | check-phase-{62,63,64,65,66}.mjs (5 files) | **ATOMIC** | CHAIN_SKIP empty-Set across all 5 chain validators in ONE SHA per Phase 66-02 `3a9a671` atomic-harness-commit precedent |
| 68-04 | `d142c7a` | .planning/MILESTONES.md (1 file) | per-plan | cdcce23 garbage v1.5 H2 entry deletion (V-61-19/20 close) |
| 68-05 Commit A | `3814bee` | check-phase-{62,63,64,65,66}.mjs (5 files) | follow-up | `{68_03_SHA}` placeholder substitution (10 occurrences = 2 per file) |
| 68-05 Commit B | (this commit; populated post-commit) | 68-VERIFICATION.md (NEW) + v1.7-DEFERRED-CLEANUP.md (NEW) + PROJECT.md + REQUIREMENTS.md + STATE.md + ROADMAP.md + 68-05-SUMMARY.md | per-plan | close-gate (verification artifact + deferred-cleanup stub + traceability flips) |

**Atomic-commit precedent:** Phase 66-02 commit `3a9a671` (atomic harness commit — 3 files indivisible: v1.6-milestone-audit.mjs C11+regex-7 / v1.6-audit-allowlist.json c13_rotting_external / regenerate-supervision-pins.mjs BASELINE_10). Plan 68-03 Task 2 inherits this pattern for the 5-file CHAIN_SKIP removal.

**Rollback semantics:** `git revert 7b635ca` cleanly restores `CHAIN_SKIP = new Set([48,51,58,60,61])` + original per-file canonical comment blocks + 60000ms timeouts across ALL 5 v1.6 validators in one operation — full atomicity preserved per chain-validator indivisibility doctrine. Plan 68-01 / 68-02 / 68-04 each independently revertible. Plan 68-03 Task 1 precondition `d7d7d5f` independently revertible (reverting would re-introduce the 4 V-61-01..04 FAILs).

---

## Section E — Discoveries (Plan 68-03 Option A Pivot + Subprocess Timeout)

Phase 68 execution surfaced these items NOT anticipated by ROADMAP Phase 68 SC#1-5 nor by 68-CONTEXT.md D-01..D-04. Documented here for v1.7-DEFERRED-CLEANUP.md routing + Phase 69/70 forward coordination.

### Discovery #1: V-61-01..04 v1.5→v1.7 reorg artifact masked by CHAIN_SKIP

**Root cause:** Phase 61-03 commit `0302100` migrated v1.5 requirements from REQUIREMENTS.md `## v1.5 Requirements (Active)` section to PROJECT.md `## Validated` section as part of v1.5 milestone close. Subsequent commit `939a8af` replaced the v1.5 active section with `## v1.7 Requirements (Active)` for the v1.7 milestone. The 6 deferred items LIN-DEFER-01 / RHEL-01 / BYOPC-01 / WEB-01 / CHROMEOS-01 / CODE-01 (asserted by V-61-04) were closed-not-carried in that migration. V-61-01..04 assertions held HEAD state but expected v1.5-close state.

**Why this was masked until Phase 68:** check-phase-{62..66}.mjs CHAIN_SKIP entry `61` suppressed the V-NN-CHAIN-61 propagation, hiding the 4 V-61-01..04 FAILs from any chain validator running with non-empty CHAIN_SKIP. Plan 68-03's empty-Set substitution made the suppression go away, and the standalone `node check-phase-61.mjs` invocation surfaced the 4 FAILs at cascade-verification time.

**Resolution mechanism (Option A pivot):** Validator surgery on check-phase-61.mjs to read REQUIREMENTS.md state at v1.5-close SHA `ba2cbc0` via `execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'])` instead of HEAD. New helper `readRequirementsAtV15Close()` added at top of check-phase-61.mjs (just after `readFile()`); V-61-01..04 swap `readFile(REQUIREMENTS)` → `readRequirementsAtV15Close()` + null-guard; each check name suffixed `[v1.5-frozen @ ba2cbc0]` for transparency. Committed separately as precondition `d7d7d5f` to keep the atomic CHAIN-03 commit `7b635ca` revertible in isolation.

**This is a new architectural pattern.** See Section F below for the v1.7+ carry-forward implication.

### Discovery #2: Subprocess timeout 60s → 300s (Rule 3 auto-fix bundled in `7b635ca`)

**Root cause:** With `CHAIN_SKIP = new Set([])`, check-phase-66.mjs must now recursively traverse the full chain {48..65} via `execFileSync('node', [path], { stdio: 'pipe', timeout: 60000 })`. check-phase-65.mjs itself recursively traverses {48..64}, and standalone `time` measured `1m42.206s` (102 seconds) — exceeding the 60-second subprocess timeout. The empty-stderr FAIL `V-66-CHAIN-65 FAIL -- check-phase-65 FAIL:` matched the timeout-kill signature.

**Resolution:** Bumped `timeout: 60000` → `timeout: 300000` across 10 sites in 5 files (2 sites per file: one for CHAIN regression-guards, one for v1.5-milestone-audit invocation). 300s budget gives ~3x headroom over 102s empirical max. Bundled into the atomic commit `7b635ca` since the timeout fix is part of the empty-Set transition's correctness requirement, NOT a separate scope.

**Forward coordination flag for Phase 69 CI-Linux:** If ubuntu-latest runners are slower than the local Windows host's ~102s, even 300s may need additional headroom. Recommend Phase 69 first-run timing measurement.

### Discovery #3: check-phase-31 silent-swallow data-integrity bug CLOSED (D-02 STRETCH success)

**Root cause:** Pre-existing bug at `check-phase-31.mjs:32` where `parseInventory()` silently returned `{ placeholders: [] }` on missing `placeholder-inventory.json` (the file lives at `.planning/milestones/v1.3-phases/31-ios-l2-investigation/placeholder-inventory.json` post-v1.3 archive). V-31-21 + V-31-24 callers silently PASSED on empty array → data-integrity bug.

**Resolution mechanism (Plan 68-02 STRETCH):** parseInventory() routes through `resolveArchivedPhasePath('31-ios-l2-investigation/placeholder-inventory.json', ['v1.3-phases'])` → returns `{ _missing: true, placeholders: [] }` on resolution failure → V-31-21 + V-31-24 callers FAIL on `_missing` instead of silently passing. Caller pattern mirrors existing `_parseError` discriminator pattern. V-31-21 + V-31-24 continue to PASS post-fix because helper resolves the file at archived `.planning/milestones/v1.3-phases/` path.

**Closed permanently in this phase** — no v1.8+ work required.

### Discovery #4: cdcce23 archive-script defect deferred to v1.7-DEFERRED-CLEANUP.md ARCHIVE-01

**Root cause:** Commit `cdcce23` (`chore: archive v1.5 milestone files`, 2026-05-07) inserted scripted-extraction debris (placeholders `One-liner:`, `SUBSUMED BY PLAN 48-01.`, `NO COMMIT MADE.`, `Hash:`, `Pre-edit:`, `Total file size:`, etc.) at `.planning/MILESTONES.md` lines 3-70, ABOVE the correct entry at lines 73-92. Likely lives in `.claude/commands/gsd-complete-milestone.md` or related archive-automation skill that extracts placeholder labels rather than real bullet content.

**Phase 68 fix (symptom only):** Plan 68-04 deleted lines 3-71 (70 lines) of `.planning/MILESTONES.md` — surgical symptom fix. Root cause investigation deferred to v1.7-DEFERRED-CLEANUP.md ARCHIVE-01 line item.

**Forward coordination flag for Phase 70:** Phase 70 v1.7 milestone-archival MAY RE-TRIGGER the same defect when v1.6/v1.7 phases get archived. Plan 70 author MUST run `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` immediately after the archive automation runs to detect recurrence. If recurrence detected, file a follow-up issue with the archive-script root cause analysis.

**Plan 68-04 also surfaced 3 pre-existing `One-liner:` placeholder residue in v1.2 section** (lines 112/113/115 post-edit) from an EARLIER archive defect class (NOT cdcce23 — the v1.2 archive predates cdcce23 by several milestones). Out of Phase 68-04 scope per executor SCOPE BOUNDARY rule; bundled into v1.7-DEFERRED-CLEANUP.md ARCHIVE-02 follow-up.

---

## Section F — v1.5-frozen-aware pattern as v1.7+ architectural precedent

**Pattern:** Chain validators that assert on historical milestone state should read from the frozen close-SHA via `execFileSync('git', ['show', '<SHA>:<path>'])`, NOT from HEAD. The helper `readRequirementsAtV15Close()` introduced at `check-phase-61.mjs` (Plan 68-03 Task 1 SHA `d7d7d5f`) is the canonical implementation.

**Why it matters:** Post-milestone-close planning-doc reorganization (req migration to Validated, active-section replacement for next milestone) breaks any validator that asserts on the structural shape of the active section as it existed at milestone close. HEAD-coupled validators surface FAILs after the next milestone's planning-doc edits — even though the milestone they're verifying never regressed. Worse, the FAILs may be suppressed by CHAIN_SKIP (as happened in Phase 68 with V-61-01..04) until a downstream phase tries to remove the suppression.

**Same pattern lineage:** Plan 68-02 archive-path helper (`scripts/validation/_lib/archive-path.mjs` SHA `79c65c6`) resolves the same class of problem for filesystem-archived artifacts (`.planning/phases/...` → `.planning/milestones/v1.5-phases/...`). The v1.5-frozen-aware helper at check-phase-61.mjs extends this to git-archived state (read from frozen SHA when filesystem state has drifted).

**Phase 70 HARNESS-03 forward-pointer:** When Path-A copying `check-phase-66.mjs` to `check-phase-{67..70}.mjs`, the v1.5-frozen-aware pattern in check-phase-61.mjs SHOULD be CARRIED FORWARD wherever future validators assert on historical milestone state. Documented in v1.7-DEFERRED-CLEANUP.md HARNESS-FORWARD-01 for Phase 70 author awareness.

**Also: HARNESS-03 V-NN-CHAIN-01 forward coordination.** Per Plan 68-01 D-01 Caveat: `check-phase-68.mjs` self-verifier (Phase 70 HARNESS-03 Path-A) MUST verify CHAIN-01 via INTENT (e.g., "exit 0 on Windows + 0 CHAIN_SKIP") and NOT via literal-letter grep of `\r?\n` in 51/58 source. The Option B mechanism in Plan 68-01 satisfies SC#1 via INTENT-equivalence (read-time normalization), not literal-letter compliance.

---

## Section G — Phase 69 Readiness Signal

**Chain status:** Cascade-green. No remaining CHAIN_SKIP suppression. Full chain `check-phase-{48..66}.mjs` exits 0 across all 19 phases with 0 total SKIPPED.

**Corpus state:** v1.7 stable. Phase 67 closed (SWEEP-01 + SWEEP-02) on 2026-05-26. Phase 68 introduced ZERO `docs/*` corpus edits per ROADMAP SC#5 (the only non-validator file touched is `.planning/MILESTONES.md` which is planning doc per 4 independent SoT).

**Phase 69 entry-phase contract:** CI-Linux ubuntu-latest runner job (CILINUX-01) can stand up against this clean baseline without needing CHAIN_SKIP duplication. Three independence axes now stack at terminal re-audit (fresh-clone via D-03 + fresh sub-agent via D-22 + separate OS via CI-Linux).

**Forward-pointer to Phase 70:**

- **HARNESS-02 (BASELINE_11 refresh):** regenerate-supervision-pins.mjs `parseAllowlist()` repoints from v1.6 → v1.7 sidecar via 1-line edit at line 422 (lineage pattern continues per Plan 68-02 precedent)
- **HARNESS-03 (per-phase check-phase-{67..70}.mjs Path-A copy):** inherits `_lib/archive-path.mjs` helper transparently by suffix-match; v1.5-frozen-aware pattern from check-phase-61.mjs SHOULD be carried forward where applicable (see Section F)
- **HARNESS-06 (v1.7-DEFERRED-CLEANUP.md final authoring):** extends the Plan 68-05 stub with v1.7-final additions; audits cdcce23 archive re-trigger risk per ARCHIVE-01 line item; carries forward v1.6 carry-overs (CI-3 Managed Apple ID + Multi-tenant AB + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM)

---

## Section H — Sign-Off

- ✓ CHAIN-01 closed (CRLF readFile centralization in check-phase-{51,58}.mjs via INTENT-equivalence; D-01 Option B mechanism; Plan 68-01 SHA `36a753d`; adversarial-wedge protection preserved zero regex-body changes)
- ✓ CHAIN-02 closed (archive-path helper `_lib/archive-path.mjs` + 5 call-sites + check-phase-31 silent-swallow STRETCH + regenerate-supervision-pins.mjs BASELINE_9 +1 shift + sidecar lineage repoint v1.5→v1.6 + v1.5 sidecar broad rebase across 4 array keys; Plan 68-02 SHA `79c65c6`)
- ✓ CHAIN-03 closed (atomic 5-file CHAIN_SKIP empty-Set substitution per Phase 66-02 `3a9a671` precedent; Plan 68-03 Task 2 SHA `7b635ca`; preceded by Option A pivot precondition `d7d7d5f`)
- ✓ V-61-19 + V-61-20 closed (MILESTONES.md cdcce23 garbage v1.5 H2 entry deletion 70 lines; Plan 68-04 SHA `d142c7a`)
- ✓ regenerate-supervision-pins.mjs --self-test PASS (was FAIL; closed via Plan 68-02 lineage repoint)
- ✓ Full chain check-phase-{48..66}.mjs exits 0 across all 19 phases with 0 SKIPPED — first time since v1.5 close
- ✓ v1.5-milestone-audit.mjs 12/12 PASS in fully-blocking mode (was 9/12)
- ✓ v1.6-milestone-audit.mjs 15/15 PASS unchanged (regression-free)
- ✓ Discoveries surfaced + routed to v1.7-DEFERRED-CLEANUP.md (ARCHIVE-01 cdcce23 root cause; ARCHIVE-02 v1.2 residue; HARNESS-FORWARD-01 v1.5-frozen-aware pattern; TIMEOUT-01 60s→300s discovery; CHAIN-31 closed)
- ✓ CHAIN-01 + CHAIN-02 + CHAIN-03 Active → Validated traceability flipped across PROJECT.md + REQUIREMENTS.md (Pillar B all 3 reqs closed)
- ✓ Phase 68 (Pillar B — Validator Surgery) CLOSED 2026-05-26

Plan 68-05 close-gate verified 2026-05-26. Full chain green, v1.5-harness 12/12 PASS, v1.6-harness 15/15 PASS unchanged, self-test PASS, regression-free. Phase 69 (Pillar C — CI-Linux Hardening) entry-state ready.

---

*Phase 68 verification artifact authored across 5 plans: Plan 68-01..04 contributed implementation evidence captured in per-plan SUMMARY files; Plan 68-05 close-gate appended Section A goal achievement narrative + Section B Commands evidence + Section C SC#1-5 satisfaction + Section D Atomic-Commit SHA Record + Section E Discoveries + Section F v1.7+ pattern carry-forward + Section G Phase 69 Readiness Signal + Section H Sign-Off into this final form.*
