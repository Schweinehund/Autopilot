---
phase: 159-harn-harness-close
verified: 2026-09-10T06:00:00Z
status: passed
score: 6/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
---

# Phase 159: HARN — Harness Close — Verification Report

**Phase Goal:** The v1.21 back-anchor pin lands strictly before `V14`, v1.21's own milestone-audit
harness converts from live-HEAD to a frozen-corpus read, the 20th Path-A audit-harness lineage
ships, and the milestone closes through a single verified, tagged, and pushed close-gate commit.
**Verified:** 2026-09-10T06:00:00Z
**Status:** passed
**Verifier:** independent `/gsd-verify-work` pass — every claim below was re-derived by running
commands directly against the working tree, not read from SUMMARY.md or the prior self-assessed
draft of this file.

**Note on the pre-existing draft:** A `159-VERIFICATION.md` already existed at this path, authored
by the Plan 159-13 executor under a Rule 2 deviation (the apex's `V-159-AUDIT` leg requires this
file to exist to reach 117/0/0). That draft has been fully superseded by this document. Every truth
below was independently re-verified; none of the prior draft's claims were taken on faith.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | HARN-01/02 — `MILESTONE_CLOSE_SHAS.V121 = e129081e` is inserted strictly **before** `V14`; `readAtV121Close`/`lsTreeAtV121Close` exported following the V18→V120 pattern | ✓ VERIFIED | `scripts/validation/_lib/frozen-at-close.mjs:198` carries `V121: 'e129081e'`, positioned above `V14: '0b3be9ab'` at line 216. `readAtV121Close` (line 290) and `lsTreeAtV121Close` (line 360) both exported. Independently confirmed `git log -1 --format="%H %s" e129081e` = `docs(153-14): v1.21 MILESTONE CLOSE — single close-gate commit, 58/58 requirements Validated` — the actual v1.21 close-gate commit. Subject-line discriminator (`git log --all --format="%H|%s" | awk ... /v1\.21/ && /MILESTONE CLOSE/`) returns exactly **1**. |
| 2 | HARN-03 — `v1.21-milestone-audit.mjs`'s C1-C16 reads and its C17 subprocess spawn convert from live HEAD to the V121 frozen snapshot; the `existsSync` contract-presence guard (C17 half) stays live per the D-51/v1.21-Phase-153 carve-out | ✓ VERIFIED | No raw `readFileSync(...)` calls remain in the file (`grep -n "readFileSync("` returns nothing); all content reads route through `FROZEN.get(relPath)` (`createFrozenCorpusReader(MILESTONE_TAG, ...)`, line 91), and the C17 spawn calls `withDocsAtClose('V121', ...)` at line 876. `existsSync` remains for path-presence checks only (contract-guard carve-out, live by design). Standalone run: `node scripts/validation/v1.21-milestone-audit.mjs` → **16 passed, 0 failed, 0 skipped, exit 0**. |
| 3 | HARN-04 — the 20th Path-A audit-harness lineage (`v1.22-milestone-audit.mjs` + sidecar + apex leg + 19th CI coexistence workflow, 13 jobs) ships and is green standalone | ✓ VERIFIED | `scripts/validation/v1.22-milestone-audit.mjs` and `v1.22-audit-allowlist.json` exist; standalone run → **16 passed, 0 failed, 0 skipped, exit 0**. `.github/workflows/audit-harness-v1.22-integrity.yml` exists with exactly **13** `runs-on:` job entries. 18 `audit-harness-*-integrity.yml` files exist today (including this newest member) — consistent with the D-51 ROADMAP amendment's "19th CI coexistence workflow, 20th Path-A ordinal" correction and the identical wording precedent already stated in `audit-harness-v1.21-integrity.yml`. |
| 4 | HARN-05 — three-axis terminal re-audit (fresh clone, cross-OS Linux CI, fresh sub-agent) at one shared commit reports the apex green, with three blocking-human checkpoints explicitly ruled by the owner | ✓ VERIFIED | `159-EVIDENCE.md` §26 ("push ruling — verbatim: Proceed"), §32 ("all-green" ruling — dispatch axis 240 jobs/204 success/17 legitimate skip/0 illegitimate skip/0 failure; fresh-clone and blind-agent axes 9/9 legs, byte-identical; identical head `828df055` confirmed from 3 independent sources), and §35 ("proceed" close-gate ruling) all read as verbatim owner rulings, consistent with the required 3-checkpoint state. Shared commit `828df055` independently confirmed as current `origin/master` (`git rev-parse origin/master` = `828df055...`). |
| 5 | HARN-06 (mechanism) — the milestone closes through a single close-gate commit; tag+push are explicitly deferred to archival per a locked D-51 amendment, not silently dropped | ✓ VERIFIED | `git show --stat 0399e715` touches exactly the 4 planning documents (`PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`) — no code, no docs/ content. `git tag --list v1.22` returns 0 (no early tag) and `git log --all` MILESTONE-CLOSE discriminator returns 0 before / 1 after the commit. The literal ROADMAP phase-goal text ("tagged and pushed close-gate commit") is superseded by the phase's own D-51 success-criterion amendment, recorded in `ROADMAP.md` SC#5 and `REQUIREMENTS.md` HARN-06's inline note: *"the tag and its push are discharged at archival, on the archive commit — following the v1.20 and v1.21 precedent."* This is a pre-existing, milestone-wide convention (confirmed: `git tag --list` shows `v1.20` and `v1.21` exist, `v1.22` does not yet) — not a phase-159-specific shortcut. **Deferred, explicitly, to `/gsd-complete-milestone`:** the `v1.22` annotated tag, `git push origin master v1.22`, and the after-archival apex re-run recorded in `MILESTONES.md`/`STATE.md`/`PROJECT.md`/the tag message (`159-EVIDENCE.md` §36.7). |
| 6 | Close-gate flip — a SINGLE commit flips all 39 requirements to Validated; `REQUIREMENTS.md` stays tracked; the harness-owned automated flip is a proven no-op | ✓ VERIFIED | `grep -c "^- \[x\]" .planning/REQUIREMENTS.md` = 39, `grep -c "^- \[ \]"` = 0. `git ls-files .planning/REQUIREMENTS.md` confirms tracked. Independently re-ran `node gsd-core/bin/gsd-tools.cjs query requirements.mark-complete HARN-05 HARN-06` → `{"updated": false, "already_complete": ["HARN-05","HARN-06"], ...}` with empty `git status --porcelain .planning/REQUIREMENTS.md` — the flip at the plan boundary wrote nothing, proving the single-commit hand-flip design. |

**Score:** 6/6 truths verified (0 present-but-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/validation/_lib/frozen-at-close.mjs` | `V121` before `V14`, `readAtV121Close`/`lsTreeAtV121Close` | ✓ VERIFIED | Confirmed by direct read, line numbers cited above |
| `scripts/validation/v1.21-milestone-audit.mjs` | converted to V121 frozen reads, C17 guard-clause stays live | ✓ VERIFIED | No raw `readFileSync`; `FROZEN.get`/`withDocsAtClose` wired; standalone run green |
| `scripts/validation/v1.22-milestone-audit.mjs` + `v1.22-audit-allowlist.json` | 20th Path-A lineage | ✓ VERIFIED | Both exist, standalone run green (16/0/0) |
| `scripts/validation/check-phase-154..158.mjs` | content leaves, chain members | ✓ VERIFIED | All five present; chain confirmed by apex run below |
| `scripts/validation/check-phase-159.mjs` | apex, chain [48..158], additive V-159-HARN03/AUDIT-HARNESS legs | ✓ VERIFIED | Independently run: **117 PASS, 0 FAIL, 0 SKIPPED, exit 0** |
| `.github/workflows/audit-harness-v1.22-integrity.yml` | 13-job CI workflow | ✓ VERIFIED | Present, 13 `runs-on:` entries counted directly |
| `dist/docs-library-v1.22.zip` | publish bundle | ✓ VERIFIED | 4,105,804 bytes, 239 zip entries — confirmed by `unzip -l` |
| `.planning/milestones/v1.22-MILESTONE-AUDIT.md` / `v1.22-DEFERRED-CLEANUP.md` | terminal close artifacts | ✓ VERIFIED | Both on disk, 647 and 674 lines respectively |
| Close-gate commit `0399e715` | exactly 4 planning documents, 39/39 Validated | ✓ VERIFIED | `git show --stat` confirms scope |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `check-phase-159.mjs` | `check-phase-{30,31,48..158}.mjs` | subprocess chain spawn | ✓ WIRED | Live apex run confirms all CHAIN-* legs PASS |
| `check-phase-159.mjs` | `v1.22-milestone-audit.mjs` | `V-159-AUDIT-HARNESS` leg | ✓ WIRED | Live apex run shows this leg PASS |
| `check-phase-159.mjs` | `v1.21-milestone-audit.mjs` | `V-159-HARN03` additive leg | ✓ WIRED | Live apex run shows this leg PASS, never skipped under NESTED |
| `v1.21-milestone-audit.mjs` | `_lib/frozen-at-close.mjs` | `createFrozenCorpusReader('V121')`, `withDocsAtClose('V121', ...)` | ✓ WIRED | Confirmed by direct read + standalone green run |
| Close-gate commit | `check-phase-54/55/56.mjs` live reads | direct reads of `REQUIREMENTS.md`/`ROADMAP.md` | ✓ WIRED | Re-run post-gate: 32/0/0, 32/0/0, 32/0/0 |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| v1.21 harness reads frozen V121 snapshot and runs clean | `node scripts/validation/v1.21-milestone-audit.mjs` | 16 passed, 0 failed, 0 skipped | ✓ PASS |
| v1.22 harness (20th lineage) runs clean standalone | `node scripts/validation/v1.22-milestone-audit.mjs` | 16 passed, 0 failed, 0 skipped | ✓ PASS |
| Apex chain (117 checks incl. new legs) runs clean | `node scripts/validation/check-phase-159.mjs` | 117 PASS, 0 FAIL, 0 SKIPPED, exit 0 | ✓ PASS |
| Planning-tree validators clean after close-gate commit | `node scripts/validation/check-phase-{54,55,56}.mjs` | 32/0/0 each | ✓ PASS |
| Requirement flip is a proven no-op | `gsd-tools query requirements.mark-complete HARN-05 HARN-06` | `updated:false`, both `already_complete`, empty git diff | ✓ PASS |
| Scrubbed 9-char label absent from HEAD and phase-159 tree | derived needle in-process, `git grep`/`git log -p` counts | 0 hits at HEAD tracked files, 0 hits in phase-159 dir, 0 hits in `master..HEAD` commit messages (12 hits remain in old, pre-scrub, unpushed-history blobs — disclosed and accepted as `AR-159-01`) | ✓ PASS |

### Probe Execution

Step 7c: **SKIPPED** — no `scripts/*/tests/probe-*.sh` convention exists in this project; its
validator harness (`check-phase-*.mjs` / `v1.2x-milestone-audit.mjs`) is the equivalent mechanism
and was run directly (see Behavioral Spot-Checks above).

### Requirements Coverage

| Requirement | Source Plan(s) | Status | Evidence |
|-------------|-----------------|--------|----------|
| HARN-01 | 159-02 | ✓ SATISFIED | Truth 1 |
| HARN-02 | 159-02 | ✓ SATISFIED | Truth 1 |
| HARN-03 | 159-04 | ✓ SATISFIED | Truth 2 |
| HARN-04 | 159-08 | ✓ SATISFIED | Truth 3 |
| HARN-05 | 159-11 (ruling), 159-09/10 (setup) | ✓ SATISFIED | Truth 4 |
| HARN-06 | 159-13 | ✓ SATISFIED | Truth 5, Truth 6 |

All six phase requirement IDs are declared exactly once across the 13 plans' `requirements:`
frontmatter (159-01/03/05/06/07/09/10/11/12 explicitly declare `[]` per D-28, deferring the flip to
the plan that owns it), matching `.planning/REQUIREMENTS.md`'s traceability table (all six rows
`Phase 159 | Complete`). **No orphaned requirements.**

### Anti-Patterns Found

Debt-marker scan (`TBD`/`FIXME`/`XXX`) run across all 30 files named in this phase's plans'
`files_modified` frontmatter: zero live hits. One narrative mention of the literal string "TBD"
survives in `158-VERIFICATION.md` (a disposition-table cell describing a *historical* two-hit scan
from Phase 158, one of which was itself a placeholder-notice quoted for context) — not a live debt
marker introduced or left open by this phase. No `TODO`/`HACK`/`PLACEHOLDER` markers found in the
phase's core harness/validator files. No blockers.

### Human Verification Required

None. This phase is entirely tooling/harness/planning-document infrastructure with no `docs/`
content surface (independently confirmed: `git diff --stat master@{1} -- docs/` reports 0 changes
across the close-gate commits). Code review, user-acceptance testing, and `/gsd-secure-phase 159`
remain owner-run steps named in the archival handoff (`159-EVIDENCE.md` §36.7) — correctly not
claimed as complete by this phase, and not gaps of this phase's own scope.

### Deferred Items

| # | Item | Addressed In | Evidence |
|---|------|-------------|----------|
| 1 | `v1.22` annotated tag creation and `git push origin master v1.22` | `/gsd-complete-milestone` (archival step) | D-51 (`159-CONTEXT.md`), ROADMAP SC#5 amendment, `159-EVIDENCE.md` §36.7 — "following the v1.20 and v1.21 precedent"; `git tag --list` confirms `v1.20`/`v1.21` tags exist, `v1.22` does not yet |
| 2 | Post-archival moved-tree apex re-run recorded in `MILESTONES.md`/`STATE.md`/`PROJECT.md`/tag message | `/gsd-complete-milestone` | `159-EVIDENCE.md` §36.7 items 2-3 |
| 3 | `/gsd-secure-phase 159` retroactive security pass | Pre-archival, owner-run | `159-EVIDENCE.md` §36.7 item 1; `STATE.md` "Next step" |

These are not gaps — they are explicit, locked deferrals to the milestone's own archival mechanism,
not omissions of this phase's scope.

## Verdict

All 6 must-haves (HARN-01 through HARN-06, plus the close-gate flip invariant) independently
re-verified against direct command execution, not against SUMMARY.md or the prior self-assessed
draft. The apex re-run reproduces 117 PASS / 0 FAIL / 0 SKIPPED at HEAD; the v1.21 and v1.22
harnesses both run green standalone; the frozen-at-close pin and its exports are correctly
positioned and wired; the close-gate commit is scoped to exactly the four planning documents; the
requirement flip is a proven no-op; the scrubbed label is absent from HEAD and from this phase's own
directory. The literal "tagged and pushed" clause of the phase goal is satisfied by mechanism and
explicitly, verifiably deferred to archival per a locked D-51 decision consistent with the v1.20/v1.21
precedent — not a silent gap. No gaps found.

---
*Phase: 159-HARN — Harness Close*
*Verified: 2026-09-10T06:00:00Z*
*Verifier: Claude (gsd-verifier, independent pass)*
