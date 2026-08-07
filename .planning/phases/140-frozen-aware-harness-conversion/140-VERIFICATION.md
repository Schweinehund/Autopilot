---
phase: 140-frozen-aware-harness-conversion
verified: 2026-08-07T00:00:00Z
status: passed
score: 26/26 must-haves verified
behavior_unverified: 0
overrides_applied: 0
---

# Phase 140: Frozen-Aware Harness Conversion Verification Report

**Phase Goal:** Each frozen milestone-audit harness v1.4–v1.19 reads its own corpus at its own
close SHA instead of live HEAD, resolving the frozen-vs-evolved mismatch class at its root,
within budget.
**Verified:** 2026-08-07
**Status:** passed
**Re-verification:** No — initial verification

All commands below were independently re-run against the current worktree (not transcribed from
SUMMARY.md), per the adversarial-verification mandate.

## Goal Achievement

### Observable Truths (independently re-measured)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Five scope amendments landed as one commit, alone, before any code edit (D-30) | ✓ VERIFIED | `git show --stat --name-only 06a69617` → exactly `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`; both committed before `93b2edca` (ledger) and `b49b5847` (first code edit) |
| 2 | SWEEP-05 text and ROADMAP SC#1 carry an identical converted range + C17 carve-out | ✓ VERIFIED | Both read "v1.4 through v1.18... v1.19... Phase 144... C17 contract-presence... Phase 143" — no divergence found |
| 3 | Fabricated "282 .md files" figure removed from ROADMAP.md | ✓ VERIFIED | `grep -v '^#' ROADMAP.md \| grep -c '282'` → `0` |
| 4 | SC#2 states the D-09 apex-blindness evidence path | ✓ VERIFIED | ROADMAP.md Phase 140 SC#2 names `NESTED`-guarded spawn sites and `V-60-23` explicitly, re-confirmed by direct read |
| 5 | SC#3 records the D-26 skip-vs-pass reconciliation | ✓ VERIFIED | ROADMAP.md Phase 140 SC#3 states the C5 `pass: true` mechanism and the malformed-`review_by` suppression explicitly |
| 6 | Traceability row prevents premature Validated status for SWEEP-05 | ✓ VERIFIED | `REQUIREMENTS.md:129` → `| SWEEP-05 | Phase 140, Phase 144 | Pending |` |
| 7 | `check-phase-54.mjs` (sole live reader of the amended files) survives re-wording | ✓ VERIFIED | Re-ran: `Summary: 32 passed, 0 failed, 0 skipped`, exit 0 |
| 8 | `readManyAtClose`/`createFrozenCorpusReader` exist, Buffer-offset parsed, enumeration-before-fetch ordering | ✓ VERIFIED | Read `_lib/frozen-at-close.mjs:287-352`: no `encoding` opt on the batch spawn, `Buffer.subarray` used, `createFrozenCorpusReader` calls `lsTreeAtClose` before `readManyAtClose` |
| 9 | `V14 = 0b3be9ab` pinned with rationale (rejected candidates, no-MILESTONE-CLOSE-discriminator, audit-close scope bar) | ✓ VERIFIED | `grep -c "V14: '0b3be9ab'"` → `1`; rationale comment at `:135-158` present with all required content |
| 10 | `--self-test` retargeted to `VUNPINNED`, stays 6/6 PASS after the pin lands | ✓ VERIFIED | Re-ran: `6/6 PASS`, exit 0; assertion 3 names `VUNPINNED` |
| 11 | Sidecar read fails loud on absence (D-07) | ✓ VERIFIED | `v1.4-milestone-audit.mjs:56-59`: throws `Sidecar absent at frozen SHA... D-07 fail-loud` |
| 12 | v1.4 converted, `5 passed, 0 failed, 0 skipped`, C5 shows PASS not SKIPPED | ✓ VERIFIED | Re-ran: `Summary: 5 passed, 0 failed, 0 skipped`, exit 0; C5 line reads `PASS` |
| 13 | TEMPLATE-SENTINEL backport positioned correctly (after `last_verified`-missing, before `review_by`-missing) | ✓ VERIFIED | `v1.4-milestone-audit.mjs:261-267`: `continue` for the sentinel sits between the two branches exactly as required |
| 14 | v1.5 fully converted, `12 passed, 0 failed, 0 skipped` | ✓ VERIFIED | Re-ran: `Summary: 12 passed, 0 failed, 0 skipped`, exit 0 |
| 15 | v1.4.1, v1.6–v1.13 fully converted, zero `(>60)`/`(>90)` mismatch remnants | ✓ VERIFIED | All ran: v1.4.1=8/0/0, v1.6–v1.13=15/0/0 each; `grep -c '(>60)'` on all outputs → `0` |
| 16 | v1.14 (already-green) stays green post-conversion, live-HEAD coupling removed, cause stated correctly | ✓ VERIFIED | Re-ran: `15 passed, 0 failed, 0 skipped`; SUMMARY correctly attributes prior green to Phase 133's re-pin, not corpus stability |
| 17 | v1.15–v1.18 converted on 4/5 chokepoints; C17 guard + `c17-eee-contract` spawn deliberately left live-HEAD, documented in source | ✓ VERIFIED | `grep -c 'existsSync(join(process.cwd()'` → `1` per file; `grep -c 'c17-eee-contract'` → `8` per file (guard ref + spawn + comment); v1.16/v1.18 → `16 passed, 0 failed, 0 skipped` |
| 18 | Sixteen-of-sixteen completeness: v1.4–v1.18 converted, v1.19 untouched | ✓ VERIFIED | `grep -l 'createFrozenCorpusReader' v*.*-milestone-audit.mjs \| wc -l` → `16`; `grep -c ... v1.19...` → `0` |
| 19 | Apex unchanged throughout (93/0/0) | ✓ VERIFIED | Re-ran `check-phase-138.mjs` at current HEAD → `93 PASS, 0 FAIL, 0 SKIPPED` |
| 20 | Six nested pin-holding validators (48/58/66/70/73/120) unchanged | ✓ VERIFIED | All six re-ran under `CHECK_PHASE_NESTED=1`, all exit 0, tallies match the recorded Plan 01/04 baseline exactly |
| 21 | `carve-gate.mjs` exits 0, zero off-list, throughout | ✓ VERIFIED | Re-ran: `39 in-scope=39 on-list=0 off-list`, exit 0 |
| 22 | `check-phase-60.mjs`'s subprocess timeout stays byte-unchanged (budget met, not raised) | ✓ VERIFIED | `git diff HEAD -- check-phase-60.mjs` empty; `grep -c 'timeout: 60000'` → `2` |
| 23 | `V-60-23` line reports PASS (the SWEEP-06 non-apex evidence) | ✓ VERIFIED | Re-ran `check-phase-60.mjs --verbose \| grep V-60-23` → `PASS -- harness exits 0` |
| 24 | `check-phase-60.mjs`'s overall exit correctly stays non-zero (unrelated Phase 141 scope), never conflated with SWEEP-06 evidence | ✓ VERIFIED | Re-ran bare: exit=1, `23 PASS, 2 FAIL` — the two failures are V-60-12..22-class chain guards, not V-60-23 |
| 25 | All 16 converted harnesses complete well within the 60000ms budget | ✓ VERIFIED | Independently re-ran all 16 in a loop; every one exits 0 in low single-digit seconds |
| 26 | Stop-hook fails open on unparseable/empty-offList gate result instead of hard-blocking a passing tree; still reports genuine off-list edits | ✓ VERIFIED | Read `.claude/hooks/v1.20-carve-gate.cjs:122-137`: `!parsed \|\| offList.length === 0` → fail-open with stderr diagnostic; hook's own `--self-test` → `6/6 PASS` |

**Score:** 26/26 truths verified, 0 present-but-behavior-unverified, 0 overrides applied.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.planning/REQUIREMENTS.md` | SWEEP-05 amended, traceability row updated | ✓ VERIFIED | Confirmed by direct read |
| `.planning/ROADMAP.md` | Phase 140 SC#1–#3 amended | ✓ VERIFIED | Confirmed by direct read |
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` | 5 appended rows (one per plan, Plan 02 has 2), zero deletions | ✓ VERIFIED | 43 lines total; `grep -c 'v1.4-milestone-audit.mjs'` → `4`; `grep -c '_lib/frozen-at-close.mjs'` → `6` |
| `scripts/validation/_lib/frozen-at-close.mjs` | Two new exports, `V14` pin, self-test retarget | ✓ VERIFIED | All present and functioning |
| 16× `scripts/validation/vX.Y-milestone-audit.mjs` (v1.4–v1.18) | Converted, all green | ✓ VERIFIED | All 16 re-run, all exit 0 |
| `scripts/validation/v1.19-milestone-audit.mjs` | Untouched (deferred to Phase 144) | ✓ VERIFIED | Zero `createFrozenCorpusReader` hits |
| `.claude/hooks/v1.20-carve-gate.cjs` | Hardened fail-open logic | ✓ VERIFIED | Read + self-test both confirm |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `createFrozenCorpusReader` | `lsTreeAtClose` → `readManyAtClose` | function-body call order | ✓ WIRED | `:342-343`: enumeration precedes batch fetch |
| Converted v1.5 harness | `check-phase-60.mjs`'s `V-60-23` | subprocess spawn under 60000ms timeout | ✓ WIRED | `V-60-23` line reports PASS on re-run |
| `V14` pin | `--self-test` assertion 3 | probe tag substitution | ✓ WIRED | `VUNPINNED` used instead of `V14`; self-test still 6/6 |
| Each `SIDECAR_PATH` literal | 15 workflow `path-match` jobs + `check-phase-{48,70}.mjs` | byte-identical string preservation | ✓ WIRED | `check-phase-48`/`-70` both exit 0 nested; literal read out of file, never reconstructed |
| Family D's excepted guard | `c17-eee-contract.mjs` spawn | left live-HEAD, in-source comment | ✓ WIRED | Guard count = 1/file; C17 result byte-identical pre/post |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| SWEEP-05 | 01, 02, 03, 04 | v1.4–v1.18 conversion (v1.19 deferred to Phase 144) | ✓ SATISFIED (deliberately `Pending` per amended text) | 16/16 harnesses converted; REQUIREMENTS.md row correctly reads "Phase 140, Phase 144 \| Pending" — not a gap, this is the intended state per D-14c until Phase 144 lands v1.19 |
| SWEEP-06 | 05 | Converted harnesses complete inside the 60s budget | ✓ SATISFIED (deliberately `Pending`, same reasoning) | `V-60-23` PASS + 16 wall-clock figures all under budget; requirement text correctly shares SWEEP-05's completion timing |
| SWEEP-07 | 02 | TEMPLATE-SENTINEL remedy | ✓ SATISFIED, marked `[x] Complete` | v1.4 C5 reports PASS not SKIPPED, `5/0/0` |
| SWEEP-08 | 02 | V14 pin with rationale | ✓ SATISFIED, marked `[x] Complete` | `V14` pinned, self-test 6/6, gate at `:151`/`:212` satisfied |

No orphaned requirements — REQUIREMENTS.md's Phase 140 traceability table names exactly these four IDs, matching the PLAN frontmatter across all five plans.

### Anti-Patterns Found

Zero `TBD`/`FIXME`/`XXX` debt markers across all files this phase modified (independently grepped).

The phase's own code-review report (`140-REVIEW.md`, independently re-read) found 0 critical, 2 warning, 2 info findings — all latent code-quality items, none goal-blocking:
- WR-01: `v1.20-carve-gate.cjs`'s `MILESTONE_TAG` guard comment overstates what it currently protects (the constant isn't wired into any path yet) — cosmetic, pre-emptive-by-design per the hook's own comment.
- WR-02: Dead `node:fs` imports (`readFileSync`/`readdirSync`/`statSync`) left in all 16 converted harnesses (no ESLint wired into CI, so this doesn't fail a build).
- IN-01: `_lib/frozen-at-close.mjs`'s self-test comment cites a stale "21 importers" count (now 39).
- IN-02: The hook's `--self-test` doesn't directly exercise the new D-31 fail-open branch (verified manually by the reviewer instead).

None of these affect the phase's must-have truths or the goal; they are recorded here for downstream awareness, not as gaps.

### Zero Corpus Edits (standing milestone bar)

`git diff --stat c0335ff4..HEAD -- docs/` → empty. Confirmed independently.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|---|---|---|---|
| v1.4 harness fully green | `node v1.4-milestone-audit.mjs` | `5 passed, 0 failed, 0 skipped`, exit 0 | ✓ PASS |
| v1.5 harness fully green | `node v1.5-milestone-audit.mjs` | `12 passed, 0 failed, 0 skipped`, exit 0 | ✓ PASS |
| All 16 converted harnesses | loop over v1.4..v1.18 (skip v1.19) | all exit 0, zero `(>60)` mismatches | ✓ PASS |
| Library self-test | `frozen-at-close.mjs --self-test` | `6/6 PASS`, exit 0 | ✓ PASS |
| Apex regression | `check-phase-138.mjs` | `93 PASS, 0 FAIL, 0 SKIPPED` | ✓ PASS |
| CARVE gate | `carve-gate.mjs` | `39 in-scope, 39 on-list, 0 off-list`, exit 0 | ✓ PASS |
| Budget evidence (non-apex path) | `check-phase-60.mjs --verbose \| grep V-60-23` | `PASS -- harness exits 0` | ✓ PASS |
| Stop-hook self-test | `v1.20-carve-gate.cjs --self-test` | `6/6 PASS` | ✓ PASS |
| Six nested pin-holders | `CHECK_PHASE_NESTED=1` × 6 | all exit 0, byte-identical tallies to recorded baseline | ✓ PASS |
| `check-phase-54.mjs` (amendment reader) | bare run | `32 passed, 0 failed, 0 skipped`, exit 0 | ✓ PASS |

### Human Verification Required

None outstanding. The phase's own blocking owner checkpoint (Plan 05 Task 3) was already presented and resolved within phase execution ("approved — seal the phase"), covering the four items the phase's own review notes flag as owner-judgment items (budget evidence framing, three discovered-not-predicted harness outcomes, the coverage-delta table, and the C17-deferred-to-Phase-143 disposition). No new judgment calls surfaced during this independent verification pass.

### Gaps Summary

None. All 26 derived must-have truths (roadmap Success Criteria plus PLAN frontmatter must_haves
across all five plans) were independently re-measured against the current codebase state and
verified true. The two deliberately-`Pending` requirements (SWEEP-05, SWEEP-06) are the intended
state per the amended REQUIREMENTS.md text — both explicitly span into Phase 144 (v1.19
conversion) and are not premature-Validated drift, they are correctly-unflipped scope. The C17
live-HEAD leg in v1.15–v1.18 is a named, in-source, requirement-level limitation owned by Phase
143, not an oversight. The four code-review findings are latent quality nits, not goal-blocking
gaps.

---

_Verified: 2026-08-07_
_Verifier: Claude (gsd-verifier)_
