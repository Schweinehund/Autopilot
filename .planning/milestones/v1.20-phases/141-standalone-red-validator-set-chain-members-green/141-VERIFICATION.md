---
phase: 141-standalone-red-validator-set-chain-members-green
verified: 2026-08-09T15:41:43Z
status: passed
score: 8/8 must-haves verified
behavior_unverified: 0
overrides_applied: 0
---

# Phase 141: Standalone-RED Validator Set — Chain Members Green Verification Report

**Phase Goal:** The eight chain-member validators (`check-phase-48`, `-60`, `-61`, `-62` through
`-66`) exit 0 standalone, closing the freshness and self-test root causes and the cascade they
drive.
**Verified:** 2026-08-09
**Status:** passed
**Re-verification:** No — initial verification

## Method note

Every claim below was checked against the live codebase independently — not read off SUMMARY.md
prose. Cheap validators (`check-phase-48`, `carve-gate.mjs`, `check-phase-54.mjs`,
`regenerate-supervision-pins.mjs --self-test`, `frozen-read-negative-test.mjs`, nested
`check-phase-{68,69,70,73,74}`) were re-run live in this session. The eight expensive bare
sweep members (`check-phase-{48,60,61,62,63,64,65,66}`, up to ~386s/~765s total) were **not**
re-run per the phase's own cost warning; instead `141-sweep-result.json` (machine-generated,
not hand-transcribed) and `141-EVIDENCE.md` were audited, and cross-checked against an
**independently pulled CI job-level record** (`gh run view <id> --json jobs`, not the
SUMMARY's transcription) for the same SHA. All bare/standalone claims in this report are
explicitly labelled with the mode they were captured under, per the D-21 false-green trap.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|---|---|---|
| 1 (SC#1/RED-01) | v1.5–v1.13 C5/C10 freshness assertions pass, zero glossary edits | ✓ VERIFIED | `141-EVIDENCE.md` nine-harness table (v1.5=12/0/0, v1.6–v1.13=15/0/0 each); `git status --porcelain -- docs/` clean at HEAD (checked live); ROADMAP SC#1 carries `[DISCHARGED, D-29]`, not falsified |
| 2 (SC#2/RED-02) | `regenerate-supervision-pins.mjs --self-test` exits 0 via BASELINE_9 rebase, `classify()` byte-unchanged | ✓ VERIFIED | Re-ran live: `Diff: identical, Self-test: PASS, exit 0`; all 9 `BASELINE_9` coordinates confirmed live to carry a `supervis` token (re-verified in this session, independent of the plan's own re-verification); `v1.7-audit-allowlist.json` untouched (git history shows no edit this phase) |
| 3 (SC#3/RED-03) | `check-phase-{48,60,61,62,63,64,65,66}` all exit 0 standalone (bare) | ✓ VERIFIED | `check-phase-48` bare re-run live: 7/0/0, exit 0. `141-sweep-result.json` (machine-generated JSON, ascending 48→66, all exit 0, 0 FAIL, warm cache declared, pre/post process-count 0) audited for 60/61/62/63/64/65/66; cross-checked against independently-pulled CI job-level `Result:` lines for `check-phase-61` (34/0/0) and `check-phase-70`/`68` first bare figures — consistent, no discrepancy found |
| 4 (SC#4/SWEEP-09) | Remaining silent-swallow frozen-read sites fail loud, corrected 19-reader-site census | ✓ VERIFIED | `check-phase-61.mjs:45-47` delegates to `readAtV15Close` (live); `skipped: true` count in `check-phase-68.mjs`/`check-phase-70.mjs` down to 7 each (was 9/17, delta exactly 2/10, live grep); `frozen-read-negative-test.mjs` re-run live: 10/10 PASS incl. assertions 8–10 for 61/68/70; `check-phase-67.mjs`'s 7 sites confirmed unchanged (deferred to 144, per D-12) |
| 5 | D-12/D-17 conflict: `check-phase-67.mjs:261` timeout raised, its 7 guards deferred to 144 | ✓ VERIFIED | Live grep: `timeout: 1800000` at `:262`, `timeout: 300000` retained at `:287` (harness spawn); `grep -c "chicken-and-egg" check-phase-67.mjs` = 7 (unchanged); CARVE amendment commit `3bd2ded9` precedes the only edit commit `a8d81b42` in git log order |
| 6 | V-70-18..22 repointed to `V17_CLOSEGATE`; `check-phase-70` nested 28/0/23 exit 0, no site reverted to `skipped:true` | ✓ VERIFIED | Live nested run: `Result: 28 PASS, 0 FAIL, 23 SKIPPED`, exit 0; `readCorpusFileAtV17CloseGate` present and used by V-70-18..22 (`[v1.7-close-gate @ 4df3a16]` labels, live grep); `skipped: true` count = 7 (not reverted) |
| 7 | `check-phase-68/69/70` `subEnv` aligned to unconditional `CHECK_PHASE_NESTED` | ✓ VERIFIED | Live grep: all three files show `const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' }` unconditionally, matching the 14-validator precedent |
| 8 | Governance: `carve-gate.mjs`/`check-phase-54.mjs` exit 0; nothing marked Validated; CI dispatch 3 runs/1 SHA/41 jobs/39 success+2 skipped | ✓ VERIFIED | Both validators re-run live, exit 0 (44/44/0 and 32/0/0). `grep` of REQUIREMENTS.md traceability table: RED-01/02/03/SWEEP-09 all read `Complete`, none `Validated`. **Independently pulled** (not from EVIDENCE.md) via `gh run view --json jobs` for all 3 run IDs: headSha `275bbad1...` on all three; job conclusions 19+11+11=41, 39 `success` + 2 `skipped`; the 2 skips independently confirmed by job name to be `Quarterly c13_rotting_external link-check` (the legitimate schedule guard), not an upstream-gate skip |

**Score:** 8/8 truths verified (0 present-but-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `.planning/ROADMAP.md` §Phase 141 | SC#1 DISCHARGED, SC#2/SC#4 amended, Discuss-phase flags corrected | ✓ VERIFIED | All four amendments present verbatim with original text preserved (annotate-and-supersede) |
| `.planning/REQUIREMENTS.md` | SWEEP-09 amended (reader-site census, SWEEP-03 clause retained), "Ordering, corrected" annotated | ✓ VERIFIED | Both present; `SWEEP-03 fixes 4` clause retained; annotation appended below, original byte-unchanged |
| `.planning/STATE.md` | 27→28 everywhere, SWEEP-09 in Phase-141 row, classifier-window mechanism replaced | ✓ VERIFIED | `27/27` = 0 hits, `28/28` present, Phase-141 row lists all 4 IDs, diagram mechanism text updated |
| `.planning/milestones/v1.20-CARVE.md` | `check-phase-67.mjs` added to Category 5 | ✓ VERIFIED | Present, sorted position, rationale comment above it |
| `scripts/validation/regenerate-supervision-pins.mjs` | BASELINE_9 rebased, classify() untouched | ✓ VERIFIED | 9 live coordinates, all carry `supervis` content; self-test PASS live |
| `scripts/validation/check-phase-61/68/70.mjs` | SWEEP-09 fail-loud conversions | ✓ VERIFIED | Live greps + live nested runs match claimed tallies exactly |
| `.github/workflows/audit-harness-v1.{5,6,7}-integrity.yml` | `if: always()` on 29 fan-out jobs, raised caps | ✓ VERIFIED | 15/7/7 `if: always()` counts confirmed; `check-phase-67` cap = 60min, others = 15min (unchanged, per plan) |
| `141-sweep-result.json` / `141-EVIDENCE.md` | RED-03 dual-form bare evidence | ✓ VERIFIED | JSON structurally consistent (8 members, all exit 0/0 FAIL); cross-checked against independent CI pull, no discrepancy |

### Key Link Verification

| From | To | Via | Status | Details |
|---|---|---|---|---|
| `BASELINE_9` coordinates | live doc content | set-subtraction self-test | ✓ WIRED | Self-test PASS live, `Diff: identical` |
| `--self-test` exit code | `check-phase-48/60/61.mjs` | inline call sites | ✓ WIRED | `check-phase-48` re-run live 7/0/0; 60/61 confirmed via audited sweep JSON + CI cross-check |
| CARVE allowlist | `carve-gate.mjs` | on-list check | ✓ WIRED | `carve-gate.mjs` live: 44/44/0, exit 0 |
| ROADMAP/REQUIREMENTS/STATE | `check-phase-54.mjs` | live readFile | ✓ WIRED | Live: 32/0/0, exit 0 |
| CI dispatch | job-level JSON | `gh run view --json jobs` | ✓ WIRED | Independently pulled, matches EVIDENCE.md exactly |

### Governance Checks

| Check | Result |
|---|---|
| `carve-gate.mjs` exits 0 | ✓ Live: PASS, 44 in-scope, 44 on-list, 0 off-list |
| GOV-02 ledger rows exist for the edits | ✓ 9 rows referencing `141-0*` plans found in `v1.20-GOV-02-LEDGER.md` |
| `check-phase-66.mjs` still carries literal `timeout: 300000` at HARNESS spawn (V-68-11) | ✓ Live: `:344` retains `300000`; V-68-11 PASS confirmed live under nested `check-phase-68` |
| Nothing marked Validated — RED-01/02/03/SWEEP-09 read Complete | ✓ Confirmed live grep of REQUIREMENTS.md traceability table |
| CI dispatch: 3 runs, 1 shared SHA, 41 jobs, 39 success + 2 skipped (legitimate schedule guard) | ✓ Independently confirmed via `gh run view --json jobs` for all three run IDs — SHA, job counts, and skip reason all match |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| RED-01 | 141-05 | v1.5–v1.13 freshness, zero glossary edits | ✓ SATISFIED | Nine-harness table + live `git status` clean check |
| RED-02 | 141-02 | self-test rebase, classifier untouched | ✓ SATISFIED | Live self-test PASS, `classify()` diff-free per git history |
| RED-03 | 141-02/141-05 | eight members exit 0 standalone | ✓ SATISFIED | check-phase-48 live + audited sweep JSON + CI cross-check |
| SWEEP-09 | 141-03/141-06 | 13 reader sites fail loud, census corrected | ✓ SATISFIED | Live greps/runs match; check-phase-67's 7 sites correctly deferred, CARVE-amended |

No orphaned requirements — Phase 141's four plan-declared requirement IDs match REQUIREMENTS.md's Phase-141 mapping exactly (RED-01, RED-02, RED-03, SWEEP-09, count 4).

### Anti-Patterns Found

None. `grep -n "TBD|FIXME|XXX"` across all eight files this phase modified in `scripts/validation/` returned zero hits. No stub patterns, no hardcoded empty returns, no placeholder comments found in the touched validator/library files.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|---|---|---|---|
| Self-test genuinely rebased, not stubbed | `node regenerate-supervision-pins.mjs --self-test` | `Diff: identical, Self-test: PASS, exit 0` | ✓ PASS |
| `check-phase-48` bare/standalone exits 0 with real content | `node check-phase-48.mjs` (no env) | `7 PASS, 0 FAIL, 0 SKIPPED, exit 0` | ✓ PASS |
| `check-phase-68`/`-70` nested tallies match claimed post-fix figures | `CHECK_PHASE_NESTED=1 node check-phase-{68,70}.mjs` | 12/0/21 and 28/0/23, both exit 0 | ✓ PASS |
| `check-phase-73`/`-74` (live pins on 67) still green after 67's timeout edit | nested run | 14/0/26 and 4/0/27, both exit 0 | ✓ PASS |
| Negative harness proves fail-loud under a real shallow clone | `node frozen-read-negative-test.mjs` | 10/10 PASS, exit 0 | ✓ PASS |
| CI dispatch record is real, not fabricated | `gh run view <id> --json jobs` (3 runs) | SHA match, 39 success + 2 skipped, skip reason = schedule guard | ✓ PASS |

### Human Verification Required

None. Every must-have in this phase resolves to a concrete, independently-checkable artifact (file content, exit code, or CI job JSON) rather than a subjective/visual judgment, and every one was checked against the live codebase or a live external source (GitHub Actions API via `gh`), not merely read from SUMMARY.md prose.

### Gaps Summary

No gaps found. This phase's own SUMMARY/EVIDENCE narrative is unusually well corroborated: every major claim (BASELINE_9 rebase content, self-test PASS, timeout literal values, `if: always()` counts, subEnv alignment, V-70-18..22 repoint, nested tallies, CARVE amendment ordering, CI dispatch job counts and SHA) was independently re-derived from the live repository or a live `gh` API call in this verification session and matched the SUMMARY's figures exactly, with no discrepancies. The one deliberately-not-re-run leg (the ~13-minute ascending bare sweep for members 60–66 and the ~10-minute verbose composition run) was audited via the machine-generated `141-sweep-result.json` and cross-checked against an independently-pulled CI job-level record for the same commit SHA rather than re-executed, per the phase's own cost/anti-contention guidance — this is treated as sufficient corroboration rather than a gap, since the CI record is itself an independent execution (GitHub Actions runners, not this machine) landing at the identical SHA and reporting the identical PASS/FAIL shape.

The phase goal — the eight chain-member validators exit 0 standalone, with the freshness and self-test root causes closed and the cascade cleared as a consequence rather than patched individually — is achieved and verified.

---

*Verified: 2026-08-09*
*Verifier: Claude (gsd-verifier)*
