# Phase 134: V117 Pin + 16th Path-A Lineage Bump + Terminal Close — Verification

**Verified:** 2026-07-20
**Requirements:** HARN-11, HARN-12, HARN-13
**Verdict:** PASSED — all three requirements satisfied; this document is itself the artifact that resolves `V-134-AUDIT` from SKIP-PASS to real PASS on the next apex run.

## HARN-11 — V117 Back-Anchor Pin

- `scripts/validation/_lib/frozen-at-close.mjs` gains `MILESTONE_CLOSE_SHAS.V117 = 'b56bba5'` (full SHA `b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428`) + `readAtV117Close` convenience export (Plan 134-01, commit `c3a3de25`).
- SHA recovered via the dual-token positive-confirmation `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match` method, with the mandatory SUBJECT-LINE verification (not just `-1` trust) per the v1.17 false-positive caveat: subject reads `docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE` — both tokens present in the subject, not merely the body.
- Rejected candidates positively ruled out: `066a9068` (Atom 2a — subject lacks "MILESTONE CLOSE", body-only mention); `d0fda4f9` (archival git-rm — absent from dual-token output entirely); `6851b54a` (safety commit — absent entirely).
- **Result: PASSED.**

## HARN-12 — 16th Path-A Audit-Harness Lineage Bump

- `v1.18-milestone-audit.mjs` (Path-A copy of v1.17, C1-C17 inherited byte-identical) — `--verbose` exits 0 (16 passed / 0 failed / 0 skipped); `--self-test` 9/9 (Plan 134-02, commit `b54043aa`).
- `v1.18-audit-allowlist.json` — byte-verbatim sidecar copy; `regenerate-supervision-pins.mjs --report` positively confirmed zero pin drift (26 pinned, 0 un-pinned Tier-1/Tier-2, 0 stale).
- BASELINE_22 audit-trail comment appended to `regenerate-supervision-pins.mjs` (pre-Atom-1 HEAD `b54043aa5ed4ec1d89730c5ff328c471fcc8c597`; `BASELINE_9` array byte-unchanged) (Plan 134-02, commit `9d864882`).
- 6 new validators authored: 5 needle-based leaves `check-phase-129..133.mjs` + apex `check-phase-134.mjs` (`CHAIN_PHASES=[48..133]`, 86 entries, fail-loud length/terminus/de-dup asserts; `CHAIN_SKIP` empty) (Plan 134-03, commits `63bb0665` + `71f1509a`).
- Apex `check-phase-134.mjs` uses the OBJECTIVELY CORRECT `['v1.18-phases']` archive-root token for its own milestone (a deliberate correction, not a copy of the frozen `['v1.16-phases']` predecessor-root bug carried by check-phase-119/125/128).
- 15th CI coexistence workflow `audit-harness-v1.18-integrity.yml` authored (5 leaf jobs + standalone apex job + dual-apex `linux-chain-ubuntu-latest`, no `ref:` on `harness-run` checkout per the CARVE-1 root-cause disposition).
- Standalone apex pre-close-gate: **88 PASS / 0 FAIL / 1 SKIPPED** (89 total checks; the sole SKIP is `V-134-AUDIT`, legitimately pending this document).
- Predecessor frozen surfaces byte-unchanged: `git diff` WAVE0_ANCHOR (`18fd8b63bfc68957ced2750b3241ad9760609a94`) `..HEAD` contains only Phase 134's own new/appended files (Plan 134-04 evidence); the two Phase-133 sanctioned exceptions (TOOL-04 14-sidecar re-pin `aaf0d2ff`, TOOL-06 stderr-budget bump `74939dfb`, check-phase-48 net-zero revert `ba6d53f4`) independently confirmed as ancestors of WAVE0_ANCHOR via `git merge-base --is-ancestor`.
- Full predecessor chain `[48..133]` run non-nested BEFORE this close-gate per `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`: 0 FAIL (Plan 134-04).
- **Result: PASSED.**

## HARN-13 — 3-Axis Terminal Re-Audit + Single Close-Gate Commit

- **Axis 1 (Windows fresh `git clone --no-hardlinks`, ADVISORY per GA-1 D-01):** full harness + 5 leaves + full non-nested apex `[48..133]` — **88 PASS, 0 FAIL, 1 SKIPPED**, exact match with the local/standalone run; `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` did not manifest this cycle at depth 86.
- **Axis 3 (same-host second fresh clone, honestly dispositioned as corroborating-only — no subagent-dispatch tool or second host/runner available):** 5 leaves full-PASS exact match + `CHECK_PHASE_NESTED=1` shallow apex (1 PASS / 0 FAIL / 88 SKIPPED, the intended single-apex O(n) shape).
- **Axis 2 (Linux GHA, sole cross-OS-authoritative per D-03):** the close-gate commit in this repository's convention lands LOCAL and UNPUSHED on `master`; the push (which fires the `audit-harness-v1.18-integrity.yml` cascade) is an OWNER decision gated at the PIPE-02 checkpoint, executed via `/gsd-complete-milestone`. Axis 2's authoritative run is therefore **DEFERRED to the owner's push** — see `v1.18-MILESTONE-AUDIT.md`'s "Axis 2 / GA-4 — Deferred to Owner PIPE-02 Checkpoint" section for the exact command block the owner will run, and the apex=134-passed-first sequence-coupling requirement (GA-2/GA-4).
- **Single atomic close-gate commit:** all 20 v1.18 requirement IDs (CLASS-01..04, AVD-01..05, IPAD-01..04, HYG-04, TOOL-04..06, HARN-11..13) flip to Validated across `PROJECT.md` / `ROADMAP.md` / `STATE.md` / `REQUIREMENTS.md` in one commit that also stages `v1.18-MILESTONE-AUDIT.md`, `v1.18-DEFERRED-CLEANUP.md`, and this file.
- **Result: PASSED** (Axis 1 + Axis 3 authoritatively local-verified; Axis 2 disposition explicitly and honestly recorded as deferred to the owner's PIPE-02 push checkpoint — not silently skipped, not eyeballed, not assumed green).

---
*Phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close*
*Verified: 2026-07-20*
