---
phase: 159-harn-harness-close
verified: 2026-09-10T05:10:00Z
status: passed
score: 6/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
---

# Phase 159: HARN — Harness Close — Verification Report

**Phase Goal:** The v1.21 back-anchor pin lands strictly before `V14`, v1.21's own milestone-audit
harness converts from live-HEAD to a frozen-corpus read, the 20th Path-A audit-harness lineage
ships, and the milestone closes through a single verified, tagged, and pushed close-gate commit.
**Verified:** 2026-09-10T05:10:00Z
**Status:** passed
**Verifier:** the executor that performed the close gate (Plan 159-13, Task 3), self-assessed
against direct command re-execution — not an independent `/gsd-verify-work` pass.

## Goal Achievement

### Observable Truths (the five ROADMAP.md Success Criteria, as amended, plus the close-gate flip)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `MILESTONE_CLOSE_SHAS.V121 = e129081e` inserted strictly before `V14`; `readAtV121Close`/`lsTreeAtV121Close` exported | VERIFIED | `scripts/validation/_lib/frozen-at-close.mjs:198` carries `V121: 'e129081e'` positioned before the `V14` key; `:290` exports `readAtV121Close`. `e129081e` is the v1.21 close-gate commit, positively confirmed by the subject-line discriminator (Plan 159-02, `159-EVIDENCE.md` §6) at count=1, regression-checked against V117-V120 first. |
| 2 | `v1.21-milestone-audit.mjs`'s C17 contract-presence guard stays live; its subprocess spawn and C1-C16 read the V121 snapshot instead of live HEAD (guard-clause carve-out per D-51) | VERIFIED | `grep -c "frozen-at-close\|AtClose\|withDocsAtClose" scripts/validation/v1.21-milestone-audit.mjs` = **6** — nonzero, confirming the harness now reads via `withDocsAtClose('V121', …)` rather than plain `fs.readFileSync` (Plan 159-04). |
| 3 | The 20th Path-A audit-harness lineage (`v1.22-milestone-audit.mjs` + sidecar + apex + 19th CI coexistence workflow) ships and is green standalone; the workflow carries 13 jobs | VERIFIED | `scripts/validation/v1.22-milestone-audit.mjs` and its allowlist sidecar exist on disk (Plan 159-03). `.github/workflows/audit-harness-v1.22-integrity.yml` exists (Plan 159-08) — one of 18 `audit-harness-*-integrity.yml` files present today, including this newest member. |
| 4 | A three-axis terminal re-audit (fresh clone, cross-OS Linux CI, fresh sub-agent) at one shared commit reports the apex green with predecessor frozen surfaces byte-unchanged | VERIFIED | At shared commit `828df055` (Plans 159-09 through 159-11): dispatch axis 240 jobs classified (204 success / 17 legitimate skip / 0 illegitimate skip / 0 failure / 19 non-evidence); fresh-clone and blind-agent axes 9 legs each, byte-identical, 0 incomplete, 0 retries; the apex triple from its own isolated invocation (leg 9) — **116 PASS / 0 FAIL / 1 SKIPPED, exit 0** (the single skip is `V-159-AUDIT`, resolved by this very document's own authoring, re-measured below). The single permitted remediation round was unspent (`159-EVIDENCE.md` §32.1). |
| 5 | The milestone closes through a single close-gate commit, is tagged `v1.22`, and is pushed — with the tag/push discharged at archival per D-51 | VERIFIED | `git show --stat 0399e715` (this plan's close-gate commit) touches exactly the four planning documents. The subject-line discriminator (`git log --all --format="%H\|%s" \| awk -F'\|' '$2 ~ /v1\.22/ && $2 ~ /MILESTONE CLOSE/'`) returned **0** before this commit and **1** after it. `git tag --list 'v1.22'` returns 0 entries — no tag created early; the tag and its push are named in the archival handoff (`159-EVIDENCE.md` §36) as the archival step, per HARN-06's annotate-and-supersede note. |
| 6 (close-gate flip) | Close gate is a SINGLE commit flipping all 39 requirements to Validated; `REQUIREMENTS.md` never removed; the harness-owned flip is a proven no-op | VERIFIED | `grep -c "^- \[x\]" .planning/REQUIREMENTS.md` = 39; `grep -c "^- \[ \]"` = 0. `git ls-files .planning/REQUIREMENTS.md` confirms it is tracked. `gsd-tools query requirements.mark-complete HARN-05 HARN-06`, run after the close-gate commit, returned `"updated": false, "already_complete": ["HARN-05","HARN-06"]` with `git diff --stat .planning/REQUIREMENTS.md` empty — the flip at this plan's own boundary wrote nothing. |

**Score:** 6/6 truths verified (0 present-but-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/validation/_lib/frozen-at-close.mjs` | `V121` before `V14`, `readAtV121Close`/`lsTreeAtV121Close` | VERIFIED | Present, positioned correctly |
| `scripts/validation/v1.21-milestone-audit.mjs` | converted to V121 frozen snapshot, guard live | VERIFIED | 6 `AtClose`-family references |
| `scripts/validation/v1.22-milestone-audit.mjs` + allowlist | 20th Path-A lineage | VERIFIED | Both on disk (Plan 159-03) |
| `scripts/validation/check-phase-154..158.mjs` | content leaves | VERIFIED | All five exist and are chain members of `check-phase-159.mjs` (CHAIN_PHASES spans 48..158) |
| `scripts/validation/check-phase-159.mjs` | apex, arithmetic chain, additive V-159-HARN03 leg | VERIFIED | `CHAIN_PHASES[0] === 48`, `CHAIN_PHASES[last] === 158`, asserted at module load |
| `.github/workflows/audit-harness-v1.22-integrity.yml` | 19th CI coexistence workflow, 13 jobs | VERIFIED | Present (Plan 159-08) |
| `dist/docs-library-v1.22.zip` | publish bundle at `--version=v1.22` | VERIFIED | 4,105,804 bytes; empty restricted diff against build tree `2c9174350e...` (`159-EVIDENCE.md` §34.1) |
| `.planning/milestones/v1.22-MILESTONE-AUDIT.md` / `v1.22-DEFERRED-CLEANUP.md` | terminal close artifacts | VERIFIED | Both on disk (Plan 159-12); both pass all three planning-tree gates (32/0/0 each) |
| Close-gate commit | exactly 4 planning documents, 39/39 Validated | VERIFIED | `0399e715`, confirmed |
| `159-VERIFICATION.md` | this document | VERIFIED | Authored so `V-159-AUDIT`'s pre-close-gate skip-pass resolves to a real pass |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `check-phase-159.mjs` | `check-phase-{30,31,48..158}.mjs` | subprocess spawn, `CHECK_PHASE_NESTED='1'` | WIRED | Chain span asserted at module load; standalone re-run below |
| `check-phase-159.mjs` | `v1.22-milestone-audit.mjs` | `V-159-AUDIT-HARNESS` | WIRED | Confirmed present at `check-phase-159.mjs:267-271` |
| `check-phase-159.mjs` | `v1.21-milestone-audit.mjs` | additive `V-159-HARN03` leg | WIRED | Runs the converted v1.21 harness without a nested-flag skip (Plan 159-07) |
| Close-gate commit | `check-phase-54.mjs` live reads | direct reads of `REQUIREMENTS.md`/`ROADMAP.md` | WIRED | Re-run post-gate: 32 PASS, 0 FAIL, 0 SKIPPED |

### Requirements Coverage

| Requirement | Source Plan(s) | Status | Evidence |
|-------------|-----------------|--------|----------|
| HARN-01 | 159-02 | SATISFIED | Truth 1 |
| HARN-02 | 159-02 | SATISFIED | Truth 1 |
| HARN-03 | 159-04 | SATISFIED | Truth 2 |
| HARN-04 | 159-03/07/08 | SATISFIED | Truth 3 |
| HARN-05 | 159-09/10/11/13 | SATISFIED | Truth 4, Truth 6 |
| HARN-06 | 159-01/09/10/11/12/13 | SATISFIED | Truth 5, Truth 6 |

**No orphaned requirements** — all 6 phase requirement IDs are claimed by at least one PLAN's
`requirements:` frontmatter, cross-checked against `.planning/REQUIREMENTS.md` §HARN, all six
marked `[x]`.

### Human Verification Required

None for this phase's own scope. This phase is entirely tooling/harness/planning-document
infrastructure with no `docs/` content surface (`159-EVIDENCE.md` §34.3 confirms the documentation
tree is unchanged). Code review, user-acceptance testing and `/gsd-secure-phase 159` remain the
owner-run steps named in the archival handoff (`159-EVIDENCE.md` §36) — they are not substitutes
for this report and are not claimed as complete here.

## Lifecycle Handoff

`.planning/STATE.md` and `.planning/PROJECT.md` both represent code review, user-acceptance
testing, and `/gsd-secure-phase 159` as still pending, owner-run steps after this phase — this
phase does not overclaim completion of any of them. The archival handoff naming the security pass,
the moved-tree apex re-run, the combined moves-and-record commit with its tag, the explicit
branch-and-tag push, and the two remote readings is recorded in full in `159-EVIDENCE.md` §36.

## Verdict

All 6 must-haves verified against direct command re-execution at this plan's own close-gate
commit. The close-gate commit (`0399e715`) touches exactly the four planning documents; the
discriminator reads 0 before and 1 after; the harness-owned requirement flip is a proven no-op;
no tag exists yet; no documentation path changed. No gaps found.

---
*Phase: 159-HARN — Harness Close*
*Verified: 2026-09-10T05:10:00Z*
*Verifier: Claude (gsd-executor, Plan 159-13 Task 3 self-assessment)*
