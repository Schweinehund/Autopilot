---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
verified: 2026-08-06T04:03:03Z
last_reverified: 2026-08-06T04:35:00Z
status: passed
score: 5/5 success criteria fully verified
behavior_unverified: 0
overrides_applied: 0
resolved_gaps:
  - truth: "GOV-01: carve-gate.mjs exits 0 on a tree whose in-scope changes are all on-list, and exits non-zero only when an in-scope path is genuinely off-list (D-06/D-10)."
    original_status: failed
    original_reason: >
      carve-gate.mjs's readAllowlist()/parseAllowlist() parsed the CARVE's fenced allowlist
      block with the regex /```carve-allowlist\n([\s\S]*?)\n```/, which required a bare LF
      immediately around the fence markers. This repository runs with core.autocrlf=true on
      Windows (confirmed: `git config --get core.autocrlf` -> true; .gitattributes carries no
      `eol=lf` override, matching the phase's own D-21 record). A completely fresh `git clone`
      of this exact repository (reproduced live during verification, via
      `git clone file:///D:/claude/Autopilot` into a scratch directory, no manual editing
      involved) checked .planning/milestones/v1.20-CARVE.md out with CRLF line endings. Under
      that condition `node scripts/validation/carve-gate.mjs` failed every single invocation
      with `carve-gate FAIL: CARVE has no carve-allowlist fenced block` and exit 1 -- a false
      failure on 100% of in-scope changes, unrelated to any real off-list path. Never caught
      in-phase because `--self-test` only exercised parseAllowlist() against synthetic
      in-memory strings, never a real on-disk read through a fresh checkout.
    resolution: >
      Fixed in commit 04e26106. (1) parseAllowlist() now normalizes \r\n -> \n before the
      fence regex runs, load-bearing-commented as such, mirroring the normalization
      check-phase-51.mjs's readFile() already applies (the one V-68-01 pins). --self-test
      gained two assertions exercising CRLF parity both in-memory and through a real on-disk
      readAllowlist() fixture: 7/7 -> 9/9. (2) A second manifestation of the same root cause,
      found while verifying fix (1), was fixed in the same commit: under the same autocrlf
      condition, `git status --porcelain` reports a tracked, content-identical file as `M`
      permanently (confirmed: `git diff --quiet HEAD -- <path>` exits 0 despite the `M`),
      which made the D-09 working-tree amendment check fire a false violation on every run.
      isPhantomEolChange() now defers to `git diff --quiet HEAD -- <path>` for tracked
      entries only (untracked `??` detection is explicitly left untouched via an early-return
      guard), applied at both statusChangedPaths() (feeds on/off-list partition) and
      statusMapWorkingTree() (feeds the D-09 check).
    reverification: >
      Re-verified independently, not taken on trust. Fresh `git clone file:///D:/claude/Autopilot`
      into a new scratch directory (second independent clone, post-fix): confirmed via raw byte
      scan that the checked-out CARVE.md genuinely has CRLF on disk (214 CR bytes, all paired
      with LF) -- ruling out a false-negative reproduction -- yet `node scripts/validation/carve-gate.mjs`
      now exits 0 (23 in-scope, 0 off-list) and `--self-test` reports 9/9 inside that same clone.
      Negative proof re-run myself inside the fresh clone: appended a line to the off-list
      scripts/pipeline/build-filename-map.mjs -> gate exits 1 and names it; reverted -> exit 0
      (phantom-eol filter did not blind genuine off-list detection). Untracked-file detection
      re-tested directly: an untracked off-list probe file is still caught (exit 1, named) and
      clears on removal. D-09 phantom-eol fix re-tested directly by reproducing the exact
      phantom-M condition (writing normalized content via fs bypassing git's checkout filter,
      producing `git status` M + `git diff --quiet HEAD` exit 0) then adding a genuine edit to
      an off-list file alongside it -- the gate correctly reported a plain off-list failure
      (not a false D-09 amendment violation), proving the fix holds even when the CARVE and a
      real off-list edit are dirty simultaneously. Top-level unnested apex re-run:
      `node scripts/validation/check-phase-138.mjs` -> 93 PASS, 0 FAIL, 0 SKIPPED, unchanged.
      GOV-02 ledger confirmed to carry two new rows (Plan column `06 (code-review)` for the
      401dfe7d fix, `06 (verification)` for the 04e26106 fix), both naming the grep-before-edit
      evidence and the regression-gate run.
overrides:
gaps: []
human_verification: []
---

# Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair Verification Report

**Phase Goal:** One named milestone-scoped CARVE authorizes and bounds every frozen-surface edit
in the milestone, and every checkout that performs or transitively triggers a frozen read
carries `fetch-depth: 0` — the hard prerequisite for all frozen-aware conversion work that
follows.

**Verified:** 2026-08-06T04:03:03Z (initial) / 2026-08-06T04:35:00Z (re-verification after gap fix)
**Status:** passed
**Re-verification:** Yes — one gap found in initial pass, fixed in-phase (commit `04e26106`),
independently re-verified here (fresh second clone, not the same one used to find the defect)

## Goal Achievement

### Observable Truths (ROADMAP.md Phase 139 Success Criteria, amended text)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | GOV-01/GOV-02: single named CARVE authorizes/bounds every frozen-surface edit, byte-unchanged gate proven on everything off-list, grep-before-edit + regression-gate discipline recorded per edit | ✓ VERIFIED (after fix) | Artifact, allowlist (9 categories incl. all 9 Pillar-C files), amendment procedure (D-09), and GOV-02 ledger (14 rows, one per frozen-surface edit including both post-review fix commits) all verified present and correct. **The CRLF gate defect found in initial verification is fixed and independently re-confirmed** — see "Gap Found and Resolved" below. CR-01 (fail-open `git log` swallow) and WR-01 (delete-then-recreate genesis-exemption hole), both found in code review, were fixed in commit `401dfe7d` and independently re-verified live (bogus `--base` now exits 1; genesis vs. amendment commits classify correctly). |
| 2 | SWEEP-01: all 97 previously-shallow checkouts across all 16 `audit-harness-*.yml` workflows carry `fetch-depth: 0` (owner-ratified 16-workflow/97-checkout amendment, D-13/D-14), proven by dispatched CI where a frozen `git show` succeeds where it previously threw | ✓ VERIFIED | Direct scan of all 16 workflow files: 198/198 `actions/checkout@v4` steps followed by `fetch-depth: 0`, 0 shallow (independently re-run, not taken from SUMMARY). `audit-harness-integrity.yml`'s `paths:` filter now includes `.github/workflows/**` (D-17), confirmed by direct grep. Independently queried `gh api .../actions/runs/{id}/jobs` for all 16 claimed run IDs — **16/16 `Frozen-read probe` jobs report `conclusion: success`**, matching the SUMMARY's claim exactly (not merely trusted). `origin/master` independently confirmed unchanged at `347c20a8`; branch `origin/phase-139-atom-5` confirmed present at `c2450efa`, matching the local commit. |
| 3 | SWEEP-02 (D-24 amended wording): a dedicated `frozen-read-probe` job (no `needs:`) per workflow performs a frozen read + one real `readAtClose` call, evidenced by job-level JSON from a single dispatch | ✓ VERIFIED against the amended wording | Confirmed all 16 probe jobs carry no `needs:` key (direct scan) and confirmed via my own `gh api` query that all 16 report job-level `success`. **Residual stated plainly:** this is the D-24 accepted **proxy**, not the original literal SWEEP-02 text ("the 11 already-frozen-aware validators complete their frozen reads inside their existing `needs: harness-run` jobs"). That literal claim remains unobtainable in Phase 139 — independently confirmed 10 of 16 dispatched runs show `check-phase-*` jobs as `skipped` (the expected `needs: harness-run` fan-out from pre-existing v1.5/v1.6 harness failures, not a probe defect), and closing that residual depends on Phase 141's RED-01. ROADMAP.md and REQUIREMENTS.md were amended to the D-24 wording, so Phase 139 is being verified against the wording of record, and passes it. |
| 4 | SWEEP-03: FOUR fail-loud sites (`check-phase-49.mjs:264/297/334`, `check-phase-51.mjs:31`) fail loud instead of silently returning null/"", proven by a negative test | ✓ VERIFIED (behavioral) | `check-phase-49.mjs` (22/22 pass) and `check-phase-51.mjs` (25/25 pass) re-run directly. Grep confirms the swallow patterns are gone. **Behavioral proof, not just presence:** ran `scripts/validation/frozen-read-negative-test.mjs` directly — 7/7 PASS, including assertions 1 and 2 which run `check-phase-49.mjs`/`check-phase-51.mjs` themselves *inside a real depth-1 `file://` shallow clone* and confirm both now exit non-zero with `unreachable-sha` visible in their output (the actual state-transition this success criterion asserts). |
| 5 | SWEEP-04: `_lib/frozen-at-close.mjs` exports a working `lsTreeAtClose()`, proven by a self-test enumerating a known frozen tree at a real close SHA | ✓ VERIFIED | Ran `node scripts/validation/_lib/frozen-at-close.mjs --self-test` directly — 6/6 PASS, including the exact-count assertion (34 entries for `docs/l1-runbooks` @ v1.5-close) and the `file://` shallow-clone arm proving `frozenCause=unreachable-sha`. |

**Score:** 5/5 success criteria fully verified.

### Gap Found and Resolved (recorded for the audit trail, not erased)

**Initial verification (2026-08-06T04:03:03Z) found `carve-gate.mjs`'s CARVE-parsing regex was
CRLF-fragile.** This repo runs `core.autocrlf=true` on Windows with no `.gitattributes`
normalization for `*.md`. A completely fresh `git clone` (reproduced live, not hypothesized)
checked `v1.20-CARVE.md` out with CRLF line endings, and the gate's bare-LF-anchored fence regex
then failed **every** invocation with a false "no carve-allowlist fenced block" error — 100% of
the time, regardless of whether any path was actually off-list. This was invisible in-session
because the working tree that authored the file was never freshly checked out, and `--self-test`
only exercised the parser against synthetic in-memory strings.

**Fixed in commit `04e26106`, and a second manifestation of the same root cause was found and
fixed in the same commit while verifying the first fix:** under the same `core.autocrlf`
condition, `git status --porcelain` reports a tracked, content-identical file as `M` permanently
(confirmed: `git diff --quiet HEAD -- <path>` exits 0 despite the `M`), which made the D-09
working-tree amendment check fire a false violation on every run — fail-closed, but a gate that
cries wolf gets bypassed, which defeats GOV-01 as surely as the fail-open would have.

**Both fixes independently re-verified in this re-verification pass, not taken on trust:**

1. **Fresh second clone** (`git clone file:///D:/claude/Autopilot` into a new scratch directory,
   independent of the clone used to originally find the defect): confirmed via raw byte scan
   that the checked-out CARVE.md genuinely has CRLF on disk (214 CR bytes, all paired with LF —
   ruling out a false-negative reproduction), yet `carve-gate.mjs` now exits 0 (23 in-scope, 0
   off-list) and `--self-test` reports 9/9 inside that same clone.
2. **Negative proof re-run myself** inside the fresh clone: appended a line to the off-list
   `scripts/pipeline/build-filename-map.mjs` → gate exits 1 and names it; reverted → exit 0. The
   phantom-eol filter does not blind genuine off-list detection.
3. **Untracked-file detection re-tested directly:** created an untracked off-list probe file →
   caught (exit 1, named); removed → exit 0. `isPhantomEolChange()`'s `code.includes('?')` guard
   correctly leaves `??` entries untouched.
4. **D-09 phantom-eol fix re-tested directly** by reproducing the exact phantom-`M` condition
   (writing normalized content via `fs` to bypass git's checkout filter, producing `git status`
   `M` + `git diff --quiet HEAD` exit 0) and then adding a genuine edit to an off-list file
   alongside it in the same working tree — the gate correctly reported a plain off-list failure
   naming only the real edit, **not** a false D-09 amendment violation. This is the scenario that
   would have misfired under the pre-fix code (CARVE "dirty" + another in-scope path dirty →
   false D-09 violation) and it no longer does.
5. **Top-level unnested apex re-run:** `node scripts/validation/check-phase-138.mjs` → **93
   PASS, 0 FAIL, 0 SKIPPED**, unchanged from the known-good baseline.
6. **GOV-02 ledger confirmed** to carry two new rows for the fix (Plan column `06
   (code-review)` for `401dfe7d`, `06 (verification)` for `04e26106`), each naming the
   grep-before-edit evidence and the regression-gate run.

No remaining reservations. This gap is closed.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.planning/milestones/v1.20-CARVE.md` | Narrative + fenced `carve-allowlist` block, 9 categories, Phases 139-144 span | ✓ VERIFIED | Read in full; 9 categories present (incl. all 9 Pillar-C files by name), D-01/D-02/D-04/D-05/D-09/D-10/D-12 all recorded verbatim, D-13/D-14/D-24/D-30/D-33 amendments recorded as "Recorded scope amendments" |
| `scripts/validation/carve-gate.mjs` | Diff-based byte-unchanged gate | ✓ VERIFIED | `--self-test` 9/9 PASS; live gate PASS/FAIL transitions proven with a real probe-file create/delete cycle; CRLF-fragile parsing and phantom-eol D-09 false-positive both fixed and independently re-confirmed inside a fresh clone. Not a chain member (confirmed `CHAIN_PHASES` absent). CR-01/WR-01 fixes also present and verified live. |
| `.claude/hooks/v1.20-carve-gate.cjs` | Read-only Stop-hook, nudge-then-warn | ✓ VERIFIED | `--self-test` 6/6 PASS; registered in `.claude/settings.local.json` per SUMMARY (gitignored, not independently re-checked since it's machine-local by design) |
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` | Append-only row-per-edit ledger | ✓ VERIFIED | 14 rows present, one per frozen-surface edit across all 6 plans plus the two post-review fix commits; schema matches declared header |
| `scripts/validation/_lib/frozen-at-close.mjs` (extended) | `lsTreeAtClose`, `frozenCause`, `--self-test` | ✓ VERIFIED | Ran directly, 6/6 PASS |
| `scripts/validation/check-phase-49.mjs`, `-51.mjs` | Four fail-loud sites | ✓ VERIFIED | Ran directly (22/22, 25/25); swallow patterns confirmed absent via grep |
| `scripts/validation/check-phase-69.mjs`, `-70.mjs` | `PRED_BLOBS` frozen-to-frozen conversion | ✓ VERIFIED | `hash-object` literal confirmed absent; `rev-parse` against `MILESTONE_CLOSE_SHAS.V17` confirmed present; ran both nested (`CHECK_PHASE_NESTED=1`) — 9/0/22 and 23/0/28, both V-69-08/V-70-17 PASS |
| `scripts/validation/frozen-read-negative-test.mjs` | Real `file://` shallow-clone negative harness | ✓ VERIFIED | Ran directly, 7/7 PASS |
| 16 `.github/workflows/audit-harness-*.yml` | `fetch-depth: 0` on all checkouts + `frozen-read-probe` job | ✓ VERIFIED | Direct scan: 198/198 checkouts deep, 16/16 probe jobs present with no `needs:` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `carve-gate.mjs` | `.planning/milestones/v1.20-CARVE.md` | Parses fenced `carve-allowlist` block | ✓ WIRED | Now CRLF-independent; re-proven in a genuinely CRLF-on-disk fresh clone |
| `.claude/hooks/v1.20-carve-gate.cjs` | `carve-gate.mjs` | Spawns read-only, maps exit code to nudge/warn | ✓ WIRED | Hook self-test exercises `computeDecision()` against synthetic gate-exit scenarios; live spawn path present in source |
| 16 workflows | `_lib/frozen-at-close.mjs` (`readAtV15Close`, `lsTreeAtV15Close`) | `frozen-read-probe` job, dynamic `import()` | ✓ WIRED | Confirmed live in CI: all 16 dispatched runs' probe jobs report `success`; 3 spot-checked logs (per SUMMARY, not independently re-fetched) show the exact expected output strings |
| `check-phase-69/70.mjs` | `_lib/frozen-at-close.mjs` (`MILESTONE_CLOSE_SHAS.V17`) | `git rev-parse <V17>:<path>` | ✓ WIRED | Confirmed via grep + nested run |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Gate blocks a genuine off-list path and clears when removed | live probe-file create/delete cycle against `carve-gate.mjs` | exit 1 naming the file, then exit 0 | ✓ PASS |
| Gate survives a fresh clone under `core.autocrlf=true` (post-fix) | second independent `git clone file:///D:/claude/Autopilot`, raw-byte-confirmed CRLF on disk, then `carve-gate.mjs` and `--self-test` | exit 0 (23 in-scope, 0 off-list); `--self-test` 9/9 | ✓ PASS |
| Post-fix negative proof: genuine off-list edit still caught inside the fresh clone | edit `build-filename-map.mjs`, run gate, revert, run gate | exit 1 naming it, then exit 0 | ✓ PASS |
| Post-fix untracked-file detection unaffected | create/remove an untracked off-list probe file inside the fresh clone | exit 1 naming it, then exit 0 | ✓ PASS |
| Post-fix D-09 phantom-eol: no false violation when CARVE is phantom-`M` and a real off-list edit coexists | reproduced phantom-`M` on CARVE + genuine edit to an off-list file simultaneously | gate reports plain off-list failure, not a D-09 violation | ✓ PASS |
| CR-01 fix: `git log` failure fails the gate closed, not open | `carve-gate.mjs --base <unresolvable-sha>` | exit 1 (was previously a silent D-09 pass per code review) | ✓ PASS |
| WR-01 fix: genesis vs. amendment classification | inspected `git show --name-status` for `8d4235bf` (bootstrap, `A` status) and `1bf0a65f` (Category-9 amendment, `M` status) | genesis commit shows `A`, amendment commit shows `M`, matching the fixed `carveExistedAt()` logic | ✓ PASS |
| SWEEP-03 fail-loud, inside a real shallow clone | `node scripts/validation/frozen-read-negative-test.mjs` | 7/7 PASS | ✓ PASS |
| SWEEP-04 self-test, including `file://` shallow-clone arm | `node scripts/validation/_lib/frozen-at-close.mjs --self-test` | 6/6 PASS | ✓ PASS |
| Apex regression (top-level, unnested), re-run after both fix commits | `node scripts/validation/check-phase-138.mjs` | 93 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS (matches known-good baseline) |
| CI dispatch evidence (independent re-query, not trusted from SUMMARY) | `gh api repos/Schweinehund/Autopilot/actions/runs/{16 ids}/jobs` filtered to `Frozen-read probe` job | 16/16 `success` | ✓ PASS |

### Probe Execution

Not applicable in the `scripts/*/tests/probe-*.sh` sense — this phase's evidentiary mechanism is
`frozen-read-negative-test.mjs` (a standalone CLI harness) plus the CI `frozen-read-probe` jobs,
both covered under Behavioral Spot-Checks above.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| GOV-01 | 139-01 | Single CARVE + byte-unchanged gate | ✓ SATISFIED | Artifact/allowlist/amendment-procedure correct; gate's CRLF and phantom-eol defects fixed and independently re-confirmed in a fresh clone |
| GOV-02 | 139-01..06 | Grep-before-edit + regression-gate discipline, evidenced | ✓ SATISFIED | 14-row ledger, one row per frozen-surface edit across all 6 plans plus both post-review fix commits, target-scoped grep procedure followed and recorded each time |
| SWEEP-01 | 139-05, 139-06 | `fetch-depth: 0` on 97 checkouts / 16 workflows | ✓ SATISFIED | Directly re-verified: 198/198 deep; CI dispatch evidence independently re-queried |
| SWEEP-02 | 139-05, 139-06 | `frozen-read-probe` proxy evidence (D-24 amended) | ✓ SATISFIED against amended text | D-23 residual honestly recorded, not the literal original criterion — see truth #3 above |
| SWEEP-03 | 139-03 | 4 fail-loud sites | ✓ SATISFIED | Behaviorally proven via the negative-test harness |
| SWEEP-04 | 139-02 | `lsTreeAtClose()` enumeration API | ✓ SATISFIED | Self-test re-run directly, 6/6 |

No orphaned requirements found — `.planning/REQUIREMENTS.md`'s traceability table maps all six
IDs to Phase 139 with status `Complete`, and no Phase-139-tagged requirement was found in
REQUIREMENTS.md that is absent from the six plans' `requirements:` frontmatter.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `.planning/ROADMAP.md` | line 30, line 226 | Phase 139 checkbox still `[ ]` and progress table still reads "0/6 Ready to execute" despite all 6 plans complete and `STATE.md` reporting `status: verifying` | ℹ️ Info | Stale bookkeeping only — not a code-truth failure; the amended SC#2/#3/#4 text elsewhere in the same file (lines 65-68) is correctly updated. Should be flipped as part of this phase's close-out. |

No `TBD`/`FIXME`/`XXX` debt markers found in any file this phase created or modified (one
`TBD SCAN` comment in `check-phase-51.mjs` is an assertion-category label, not a debt marker).

### Human Verification Required

None. All five success criteria are either directly verifiable by re-running the phase's own
delivered checks (which was done, not merely trusted) or are CI-evidence claims that were
independently re-queried against the live GitHub API rather than taken from SUMMARY.md. The one
gap found in the initial pass was fixed in-phase and independently re-verified, including a
second, fresh reproduction of the exact failure condition that originally surfaced it.

### Gaps Summary

None remaining. Phase 139's five success criteria are **substantively and honestly delivered** —
the CARVE artifact, the GOV-02 ledger, the 16-workflow `fetch-depth: 0` sweep, the
`frozen-read-probe` CI evidence (independently re-queried, 16/16 success), the four SWEEP-03
fail-loud sites (behaviorally proven inside a real shallow clone), and the `lsTreeAtClose()` API
(self-tested against a real close SHA) all hold up under direct re-execution, not just SUMMARY
narrative. The code review's two findings (CR-01 fail-open, WR-01 genesis-exemption hole) and
the one gap found during this verification (CRLF-fragile CARVE parsing, plus the phantom-eol
D-09 false-positive found while fixing it) were all fixed in-phase and independently
re-verified live, including a fresh second clone reproducing the exact original failure
condition to prove the fix actually holds under it — not merely that the fix was applied.

---

_Verified: 2026-08-06T04:03:03Z (initial) / 2026-08-06T04:35:00Z (re-verification)_
_Verifier: Claude (gsd-verifier)_
