---
phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
plan: 03
subsystem: milestone-close-harness
tags: [atom-2, chain-apex, leaf-validators, frozen-at-close-v114, ci-coexistence-workflow, indivisible-commit, axis-2-arm]
requires:
  - "119-01 confirmed V114=7d922a7 (substantive v1.14 close-gate; f3959c8 rejected)"
  - "119-02 Atom 1 b530243 (v1.15-milestone-audit.mjs is the HARNESS the apex targets)"
provides:
  - "check-phase-113..118 (6 lightweight leaf regression-guards; CHAIN_PHASES=[], CHAIN_SKIP=new Set([]))"
  - "check-phase-119.mjs (chain apex; CHAIN_PHASES=[48..118] 71 entries; CHAIN_SKIP empty; HARNESS=v1.15-milestone-audit.mjs)"
  - "_lib/frozen-at-close.mjs V114='7d922a7' pin + readAtV114Close export (back-anchored; no V115)"
  - "audit-harness-v1.15-integrity.yml (12th CI coexistence workflow; dual-apex + LF-fidelity preserved)"
  - "Atom-2 commit 5ec0f87 (SC2 indivisible; 9 files) pushed to branch phase-119-atom-2 (PR #2) — arms Axis-2 GHA re-audit"
affects:
  - "119-04 (predecessor-byte-unchanged HARD gate + Axis-2 run-ID consumption: consumes v1.15 workflow run 28823233887)"
  - "119-08 (close-gate: V-119-AUDIT flips from PASS-via-skip to PASS once 119-VERIFICATION.md lands)"
tech-stack:
  added: []
  patterns: [path-a-copy-and-repoint, lightweight-leaf-validator, chain-apex-48-N-1-invariant, back-anchor-invariant, dual-apex-ci, indivisible-atom-commit, module-load-bound-assertion]
key-files:
  created:
    - scripts/validation/check-phase-113.mjs
    - scripts/validation/check-phase-114.mjs
    - scripts/validation/check-phase-115.mjs
    - scripts/validation/check-phase-116.mjs
    - scripts/validation/check-phase-117.mjs
    - scripts/validation/check-phase-118.mjs
    - scripts/validation/check-phase-119.mjs
    - .github/workflows/audit-harness-v1.15-integrity.yml
    - .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-03-SUMMARY.md
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
decisions:
  - "Atom 2 = ONE indivisible commit 5ec0f87 of EXACTLY 9 files (git show --stat verified; no Atom-1 file folded — D3 rejected; no deletions) — SC2"
  - "check-phase-119 CHAIN_PHASES = integers 48..118 (71 entries; [48..N-1] invariant, apex EXCLUDES 119); CHAIN_SKIP = new Set([]); a module-load assertion hard-throws if length!=71 or the span drifts off 48..118"
  - "V114 pinned to 7d922a7 (message contains MILESTONE-AUDIT + MILESTONE CLOSE, confirmed live); f3959c8 rejected; back-anchor invariant honored — no V115 pin this phase (that is v1.16's job)"
  - "check-phase-115 leaf asserts standalone c17-eee-contract.mjs presence/self-test + NO CHAIN_PHASES (chain registration is Phase 119's Atom-1 fold per 115-VERIFICATION Deferred Items), NOT chain registration"
  - "12th CI workflow: dual-apex (standalone check-phase-119 job + linux-chain-ubuntu-latest) preserved un-deduped (Pitfall 6); no CHECK_PHASE_NESTED=1 on either top-level GHA invocation; core.autocrlf false / fetch-depth:0 / continue-on-error:false / timeout-minutes:30 preserved verbatim"
  - "Axis-2 arm: Atom 2 pushed to branch phase-119-atom-2 + PR #2; v1.15 workflow run 28823233887 fired on pull_request (all 11 coexistence workflows triggered — paths filter matched)"
metrics:
  duration: ~40min
  completed: 2026-07-06
  tasks: 3
  files: 9
---

# Phase 119 Plan 03: Atom 2 — Chain Validators (113..119) + frozen-at-close V114 + v1.15 CI Workflow Summary

Shipped Atom 2 of the 13th Path-A lineage bump as **one indivisible commit `5ec0f87`** of exactly nine files: six lightweight per-phase leaf validators (`check-phase-113..118`, each `CHAIN_PHASES=[]` / `CHAIN_SKIP=new Set([])` with needles sourced inline from each phase's `*-VERIFICATION.md`), the chain apex (`check-phase-119.mjs`, `CHAIN_PHASES=[48..118]` — exactly 71 entries ending at 118, `CHAIN_SKIP` empty, `HARNESS=v1.15-milestone-audit.mjs`), the `V114='7d922a7'` frozen-close pin + `readAtV114Close` export, and the 12th CI coexistence workflow (`audit-harness-v1.15-integrity.yml`). The atom was pushed to branch `phase-119-atom-2` and PR #2 opened, arming the authoritative Axis-2 cross-OS Linux GHA re-audit (**v1.15 workflow run `28823233887`**).

## Task 1 — check-phase-113..118 (6 lightweight leaf validators)

All six forked from `check-phase-101.mjs` verbatim in structure (presence() helper, needle checks, dual-invariant SELF, runner loop). Each keeps `CHAIN_PHASES = []` and `CHAIN_SKIP = new Set([])` — chain logic lives ONLY in the apex. Needles derive from each phase's own `*-VERIFICATION.md` (Required Artifacts / Observable Truths), verified to exist on the live tree before authoring:

- **113** (Conversion Pipeline Lock): presence of `ooxml.mjs` / `guard-docx.mjs` / `convert.ps1` / `README.md`; PANDOC-PIN needle `$expectedVer = '3.7.0.2'` (convert.ps1); DEPLOY-POLICY needle `## SC3 — Deployment Policy` (README.md).
- **114** (EEE Standard/Registry): presence of `EEE-SOP-standard.md` / `RE-index.md` / `reference-template.md`; STD-BLOCK needle (the STD-001 single-line `·`-separated block); D1-NOFALLBACK needle (`An unmapped \`platform:\` value is a HARD FAILURE. There is NO silent fallback.`); REGISTRY-ROW needle (`| RE-001 | docs/l1-runbooks/00-index.md |`).
- **115** (C17 Validator Atom): presence of `c17-eee-contract.mjs` + both fixtures; SELFTEST-MODE needle (`--self-test`); COUNTS-SUMMARY needle (`C17 assertion-violation-counts:`); **STANDALONE needle asserting c17-eee-contract.mjs contains NO `CHAIN_PHASES`** — per 115-VERIFICATION Deferred Items, chain registration is Phase 119's Atom-1 fold, NOT this leaf. Does NOT assert chain registration.
- **116** (L1/L2 Runbook Retrofit): presence of L1+L2 index; ENROLL needle (`doc_id: RE-001` + `status: Approved` — registry-flip-to-Approved event); REFORMAT needle (`v1.15 EEE reformat — content not re-reviewed`).
- **117** (Admin-Setup Retrofit): presence of ios/02-abm-token.md + macos/01-abm-configuration.md (both 2-blockquote Pitfall-1 relocation cases); ENROLL-IOS (`doc_id: RE-108`) + ENROLL-MACOS (`doc_id: RE-117`) + Approved flips; REFORMAT needle.
- **118** (Reference Retrofit + Table Remediation): presence of android-capability-matrix.md (RE-144, the RETRO-03 pin-shift epicentre) + error-codes/00-index.md; ENROLL (`doc_id: RE-144` + Approved); PLATFORM-INJECT (`platform: Windows` — keyless→Windows injection); REFORMAT; TABLE-REMEDIATION needle (`Table summary:` — D-118-1 P-02 chunk-boundary protection).

**Verify:** `for n in 113..118; do node scripts/validation/check-phase-$n.mjs; done` — all six exit 0 on the current tree (LEAVES_OK).

## Task 2 — check-phase-119 apex + frozen-at-close V114 pin

- **Apex** forked from `check-phase-112.mjs`: `HARNESS = 'scripts/validation/v1.15-milestone-audit.mjs'`; `CHAIN_PHASES` extended to the full 71-entry integer array **48..118 inclusive** (appended 112,113,114,115,116,117,118 to the v1.14 [48..111] array); `CHAIN_SKIP = new Set([])` (hard invariant; V-119-SELF asserts size 0). Repointed every `112`→`119` token (header, V-119-SELF, V-119-AUDIT resolveArchivedPhasePath target `119-frozen-surface-re-baseline-.../119-VERIFICATION.md` with `milestoneRoots ['v1.14-phases']`). **NESTED guard preserved on BOTH the CHAIN-NN loop and the AUDIT-HARNESS check.** Added a **module-load bound assertion** that hard-throws if `CHAIN_PHASES.length !== 71` or the span is not 48..118 (fail-loud topology guard). V-119-AUDIT PASS-via-skip until 119-VERIFICATION.md lands at close-gate (mirrors 112's skip) — expected.
- **frozen-at-close.mjs:** inserted `V114: '7d922a7'` immediately after V113 (before the `// V14 omitted` block) + appended `export const readAtV114Close = (p) => readAtClose('V114', p);` after readAtV113Close. Re-confirmed `git log -1 --format=%s 7d922a7` contains both **MILESTONE-AUDIT** and **MILESTONE CLOSE**; f3959c8 NOT pinned. Back-anchor invariant honored — NO V115 entry (comment reworded to avoid the literal `V115` token so no grep-based verifier false-flags).
- **Verify:** plan's `APEX_PIN_OK` gate passes (71-entry CHAIN_PHASES; starts 48; ends 118; `V114: '7d922a7'`; `readAtV114Close`). A `CHECK_PHASE_NESTED=1` apex run (skips the deep recursion per WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) enumerated **74 checks** (AUDIT + 71 CHAIN-48..118 + AUDIT-HARNESS + SELF) and V-119-SELF PASSED. The full recursive apex was NOT run locally on Windows (authoritative apex is the Linux GHA run — see Task 3).

## Task 3 — v1.15 CI workflow + Atom-2 commit + Axis-2 push

- **audit-harness-v1.15-integrity.yml** copied from v1.14: `name:` v1.14→v1.15; all four `paths:` entries repointed (`scripts/validation/v1.15-*`, the workflow filename, and the two `v1.15-MILESTONE-AUDIT.md`/`v1.15-DEFERRED-CLEANUP.md` doc paths — `check-phase-*.mjs` left as the existing wildcard); header comments `11th`→`12th`, `check-phase-101..112`→`check-phase-113..119`, frozen-list `+ v1.14`; every `v1.14-audit-allowlist.json`/`v1.14-milestone-audit.mjs` string in parse/path-match/harness-run/rotting-external steps repointed to v1.15 (grep-confirmed **zero** v1.14 harness references remain). linux-chain apex `check-phase-112.mjs`→`check-phase-119.mjs`, `[48..111]`→`[48..118]`. Replaced the 12-job block (101..112) with a 7-job block (113..119).
- **PRESERVED VERBATIM** (D-119-2 rider): linux-chain `git config --global core.autocrlf false` before checkout, `fetch-depth: 0`, `continue-on-error: false`, `timeout-minutes: 30`; **dual-apex** structure (standalone `check-phase-119` job AND `linux-chain-ubuntu-latest` both run the full recursion — Pitfall 6, NOT deduped; no `CHECK_PHASE_NESTED=1` on either top-level GHA invocation); markdown-link-check@3.14.2 pin; both crons; regenerate-supervision-pins invocation. YAML validated (`yaml.safe_load` OK).
- **Atom-2 commit `5ec0f87`** with explicit `git add` of exactly the 9 files (never `-A`/`.`): `git show --stat HEAD` = 9 files, 1333 insertions, **no deletions**, **no Atom-1 file** (`v1.15-milestone-audit.mjs` / `v1.15-audit-allowlist.json` / `regenerate-supervision-pins.mjs` all absent — D3 fold rejected).
- **Axis-2 arm:** pushed to branch `phase-119-atom-2`; opened **PR #2** (base master). The `pull_request` event fired **all 11 coexistence workflows** (v1.5..v1.15 — paths filter matched via `check-phase-*.mjs`); the authoritative **v1.15 run is `28823233887`** ("Audit Harness v1.15 Integrity", in-progress at capture). Plan 119-04 consumes this run ID + the branch for the cross-OS EXACT-MATCH and predecessor-byte-unchanged gates. Committed on `master` (consistent with Atom-1 `b530243` and the sequential-on-main-tree convention).

## Deviations from Plan

### [Rule 1 — cosmetic bug] Comment literals tripping grep/regex verifiers

- **Found during:** Task 2 verification.
- **Issue:** (a) The apex header comment contained the literal `CHAIN_PHASES=[48..118]`, which the plan's count regex `/CHAIN_PHASES\s*=\s*\[([^\]]*)\]/s` matched FIRST (before the real line-57 array), yielding a false "1 entry" count. (b) The frozen-at-close V114 comment used the literal `V115`, which a `grep V115` false-flags as a phantom V115 entry.
- **Fix:** Reworded both comments to avoid the exact literals (`a 71-entry chain spanning ... 48 through 118`; `the next milestone pin is deferred to v1.16`). No code/behavior change — the real `CHAIN_PHASES` array (71 entries) and the module-load bound assertion are unchanged; there is no V115 map entry.
- **Files modified:** scripts/validation/check-phase-119.mjs, scripts/validation/_lib/frozen-at-close.mjs (both within the Atom-2 9-file scope).
- **Commit:** 5ec0f87 (folded into the atom before commit — not a separate commit).

## Requirements Note

Frontmatter tags HARN-02/HARN-03, but per D-119-4 / SC5 / the 119-01 + 119-02 precedent, requirements are **NOT** flipped to Validated here. All 16 v1.15 requirements flip in the single close-gate commit (Plan 119-08). Atom 2 only *contributes* the chain validators + V114 pin + CI workflow.

## Self-Check: PASSED

- `scripts/validation/check-phase-113.mjs` .. `check-phase-118.mjs` — all six FOUND; each exits 0 on the current tree; each carries `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`, and a V-NN-SELF check.
- `scripts/validation/check-phase-119.mjs` — FOUND; CHAIN_PHASES 71 entries (48..118), CHAIN_SKIP empty, HARNESS=v1.15-milestone-audit.mjs; NESTED guards on CHAIN + AUDIT-HARNESS; module-load bound assertion enforces 71/48..118; V-119-SELF PASS (NESTED run).
- `scripts/validation/_lib/frozen-at-close.mjs` — MODIFIED; contains `V114: '7d922a7'` + `readAtV114Close`; NO V115 entry; `node --check` OK.
- `.github/workflows/audit-harness-v1.15-integrity.yml` — FOUND; YAML valid; zero `v1.14-milestone-audit.mjs`/`v1.14-audit-allowlist.json`; dual-apex + LF-fidelity flags present.
- Commit `5ec0f87` — FOUND on `master` + branch `phase-119-atom-2`; `git show --stat` = exactly 9 files; no Atom-1 leak; no deletions.
- Push confirmed: branch `phase-119-atom-2` on origin; PR #2; v1.15 Axis-2 workflow run `28823233887` triggered.
