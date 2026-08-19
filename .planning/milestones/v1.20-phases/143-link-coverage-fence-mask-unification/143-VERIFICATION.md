---
phase: 143-link-coverage-fence-mask-unification
verified: 2026-08-11T21:30:15Z
status: passed
score: 6/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification: No — initial verification
---

# Phase 143: Link Coverage & Fence-Mask Unification Verification Report

**Phase Goal:** The corpus has durable, enforced relative-link and anchor coverage with zero
accepted-violation baseline, and fence-masking behaves identically across all 15 call sites in 9
files. **[SUCCESS-CRITERION AMENDMENT, D-29]** "Zero accepted-violation baseline" now includes the
65 links that were checker-green and GitHub-broken under the Pandoc anchor model (D-01).
**Verified:** 2026-08-11T21:30:15Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

All verification steps below were executed live against the current worktree (HEAD `599a996b`
plus phase commits `42eea2ba..75ac0181`), not read from SUMMARY.md claims. Every command shown was
run in this session.

### Observable Truths (mapped to ROADMAP Phase 143 Success Criteria / LINK-01..06)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | LINK-01: `computeAnchorSetFromContent` recognises HTML `<a id="…">` anchors and no longer special-cases Pandoc `{#id}` overrides (GitHub model) | ✓ VERIFIED | Read `check-nav-hub-links.mjs:141-191` live: `{#id}` special-casing deleted (net deletion, comments at `:10-16`,`:130-133`,`:144-150` document the deliberate absence), one `matchAll`-based `<a id>` recognition loop added (`:167-172`). `--self-test` Case D/H/I pass live: `GitHub model: {#id} renders as literal text -- has "foo-bar-custom-anchor", NOT bare "custom-anchor" PASS`, `<a id> table-row recognition ... PASS`, `<a id> double-tag line ... PASS`. |
| 2 | LINK-02/LINK-04: a corpus-wide checker validates every relative link/anchor across all of `docs/` (excluding `docs/_templates/`, masking inline code) and exits 0 with no accepted-violation baseline of any kind | ✓ VERIFIED | Live run: `node scripts/validation/check-nav-hub-links.mjs` → `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`, exit 0. Source review confirms both hub-scope filters that used to restrict the scan to 4 files are gone: `checkInboundLinks()` (`:273-301`) carries no `hubSet` variable or reference anywhere in the file (grep confirmed 0 hits for `hubSet.has(relPath)` / `hubSet.has(resolvedRel)`); it walks all of `docs/` via `walkMd('docs')` and only excludes `docs/_templates/` (`:280`). Independent read-only script (not the checker's own code) confirms scope: 282 total `.md` files in `docs/`, 274 excluding templates — matching the checker's own documented scope. Grep for baseline/allowlist/ratchet/skip-list artifacts in the checker source returns only the two header-comment sentences asserting the guarantee (`:7`, `:456`), never a data structure; filesystem search for a link-checker ignore/known-failures file found none. `checkOutboundLinks()` (`:258-267`) still hard-fails with `hub file not found` if any of the 4 `HUB_PATHS` is missing (D-13 preserved). |
| 3 | LINK-03: the 13 genuine broken file targets and 132 genuine broken anchors are fixed with zero new prose | ✓ VERIFIED | Corpus scan above is 0/0/0 — no remaining file-target or anchor failures. `git diff 42eea2ba^..75ac0181 -- docs/` shows 48 files / 195 insertions / 155 deletions; of the 195 added lines, 87 are heading lines whose only change is the `{#id}` suffix removed (matches the exact D-38 conversion shape) and 40 are new `<a id>` tag lines — both are the mechanical remedies D-04/D-38 authorize, not new prose. Glossary `last_verified`/`review_by` front matter confirmed byte-unchanged in both `docs/_glossary-macos.md` and `docs/_glossary-android.md` (grep for those diff lines returns nothing). |
| 4 | LINK-05: fence-mask behaviour is unified across all 15 call sites in the 9 named files via `^ {0,3}` | ✓ VERIFIED | Live grep of the real (non-comment) match sites in all 9 files: c17 (`:159,167`, 2), `check-nav-hub-links.mjs` (`:101,104`, 2), `retrofit-guide.mjs` (`:315`, 1), `retrofit-mermaid-structural.mjs` (`:269,272,498`, 3), `retrofit-nav-hub.mjs` (`:253,256,483`, 3), `retrofit-reference.mjs` (`:342`, 1), `retrofit-runbook.mjs` (`:263`, 1), `retrofit-structural.mjs` (`:379`, 1), `convert.ps1` (`:112`, 1) — sums to exactly 15 across 9 files. Detection regexes (mermaid `/^```mermaid/`) confirmed still column-0-anchored in c17 and both mermaid-aware retrofit scripts (D-21 honored, not widened). |
| 5 | LINK-06: c17 reports identical file/violation counts before and after the fence-mask change, and sampled newly-masked lines hide no suppressed violation | ✓ VERIFIED | Live run: `node scripts/validation/c17-eee-contract.mjs` → `C17 assertion-violation-counts: #1=0 ... #13=0` / `234 files checked, 0 with violations, 0 total violations`, exit 0 — matches the pre-change baseline recorded throughout the SUMMARY chain (Plans 02/06/07 all record the identical 234/0/0 figure at intermediate states). `143-EVIDENCE.md` (Plan 07, Task 3) records the three additional legs: 46-line mask-state diff (0 of 46 match any of 12 c17-relevant patterns), 0 of 46 fall in a `## Summary` section, and `check-nav-hub-links.mjs`'s own corpus scan unchanged at 0/0/0. |
| 6 | Goal-level "durable, enforced" coverage: the checker/anchor model survives frozen call-site pins and hands off a concrete enforcement path to Phase 144 | ✓ VERIFIED | Frozen pins re-run live, all green: `check-phase-123.mjs` (path-string presence pin) 6/6 PASS; `check-phase-115.mjs` (c17 pins incl. required-ABSENT `CHAIN_PHASES`) 7/7 PASS; `check-phase-120.mjs` (c17 comment-marker pin) 6/6 PASS; `check-phase-113.mjs`/`check-phase-124.mjs` (`convert.ps1` pins) 7/7 and 5/5 PASS. `check-phase-51.mjs`/`52.mjs`/`54.mjs` — the two frozen validators discovered mid-execution to hard-pin the old `{#id}` heading form, plus one prose-scanning false-positive — all re-run live, bare and `CHECK_PHASE_NESTED=1`: 25/25, 22/22, 32/32 PASS. `143-NEEDLE-SPEC.md` (six sections) hands off the `check-phase-143.mjs` contract to Phase 144; `v1.20-DEFERRED-CLEANUP.md` rows 13-15 confirmed present, routing the enforcement-wiring risk, `FENCE-AXIS-02`, and the D-20 out-of-census register. |

**Score:** 6/6 truths verified (0 present-but-behavior-unverified).

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `scripts/validation/check-nav-hub-links.mjs` | Corpus-wide GitHub-model checker, exit 0, no baseline | ✓ VERIFIED | Read in full (lines 1-300); executed live 0/0/0 exit 0; `--self-test` 10/10 exit 0 |
| `scripts/validation/c17-eee-contract.mjs` | Byte-identical 234/0/0 pre/post fence-mask widening | ✓ VERIFIED | Executed live: 234 files, 0 violations, all 13 counters 0 |
| `scripts/pipeline/convert.ps1` | 15th fence site tightened to `^ {0,3}`, evidenced as a tightening not a widening | ✓ VERIFIED | Line 112 confirmed `'^ {0,3}(```|~~~)'`; `check-phase-113/124.mjs` pins on the file still pass |
| 6 `scripts/pipeline/retrofit-*.mjs` files | Remaining 10 JS fence sites unified | ✓ VERIFIED | All 6 files' fence-regex sites confirmed carrying `^ {0,3}` |
| `.planning/phases/143-*/143-NEEDLE-SPEC.md` | Phase 144 hand-off, 6 sections | ✓ VERIFIED | Read in full; all 6 sections present (invocation, spawn idiom, literal pins, assertions, rename bar, withdrawn C18 fold) |
| `.planning/milestones/v1.20-CARVE.md` Category 10 | 63-path allowlist covering every edited corpus file | ✓ VERIFIED | `carve-gate.mjs` live: `106 in-scope, 106 on-list, 0 off-list`, exit 0 — zero off-list paths across the whole phase's edits |
| `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` rows 13-15 | D-26 hand-off, FENCE-AXIS-02, D-20 register | ✓ VERIFIED | Grep-confirmed all three rows present with citations |
| `.planning/REQUIREMENTS.md` / `.planning/ROADMAP.md` D-29 amendment | 7-surface SC amendment landed | ✓ VERIFIED | Both files carry `D-29` markers (3 in REQUIREMENTS, 8 in ROADMAP); Phase 143 Goal/SC#1-3 read the amended two-population wording live |

### Key Link Verification

| From | To | Via | Status | Details |
|---|---|---|---|---|
| `check-phase-123.mjs:40,83` | `check-nav-hub-links.mjs` | `presence()` path-string pin | ✓ WIRED | Live run 6/6 PASS; file not renamed |
| `check-phase-115.mjs:75,88,102` | `c17-eee-contract.mjs` | `String.includes()` pins incl. required-ABSENT `CHAIN_PHASES` | ✓ WIRED | Live run 7/7 PASS; grep confirms 0 `CHAIN_PHASES` occurrences in c17 |
| `check-phase-51/52.mjs` | 4 converted runbooks | anchor-invariant regex (rewritten from trailing-`{#id}` to own-line `<a id>`) | ✓ WIRED | Live run 25/25 and 22/22 PASS, bare and nested |
| `check-phase-54.mjs` V-54-11 | `01-windows-wufb-rings.md` | bare-word strip chain (now strips `<a id>` too) | ✓ WIRED | Live run 32/32 PASS |
| `143-NEEDLE-SPEC.md` | Phase 144's `check-phase-143.mjs` (not yet authored) | documented `execFileSync` spawn contract | ✓ WIRED (hand-off, D-23 intentional) | Confirmed no `check-phase-143.mjs` exists yet (correct — Phase 144's job); needle-spec fully specifies the contract |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| LINK-01 | 143-02 | `<a id>` recognition + Pandoc `{#id}` deletion | ✓ SATISFIED | Live self-test PASS, source review |
| LINK-02 | 143-06 | Corpus-wide scan, excl. templates, inline-code masked | ✓ SATISFIED | Live 0/0/0 corpus run, both hub filters confirmed deleted |
| LINK-03 | 143-03/04/05/09 | 13 file targets + 132 anchors fixed | ✓ SATISFIED | 0/0/0 live scan; diff shape confirms no new prose |
| LINK-04 | 143-06 | Exit 0, no accepted-violation baseline | ✓ SATISFIED | No baseline artifact found anywhere in repo; exit 0 live |
| LINK-05 | 143-07 | 15 fence sites unified, 9 files | ✓ SATISFIED | 15/15 sites confirmed live via grep, per-file breakdown matches census |
| LINK-06 | 143-07 | c17 byte-identical before/after, sampled masked lines checked | ✓ SATISFIED | Live 234/0/0; 4-leg evidence in `143-EVIDENCE.md` |

No orphaned requirements — all 6 LINK-01..06 IDs map to this phase's plans in `REQUIREMENTS.md:142-147`.

### Anti-Patterns Found

None. `git diff 42eea2ba^..75ac0181` (the phase's full commit range) scanned for `TBD|FIXME|XXX` in
added lines: 0 hits. Scanned `scripts/` diff for `TODO|HACK|PLACEHOLDER|not yet implemented|coming
soon`: 1 hit, a benign comment describing pre-existing `docs/_templates/` scaffolding ("holds
placeholder scaffolding"), not a stub marker in new code. No accepted-violation baseline structure,
sidecar allowlist, or `.linkcheckignore`-shaped artifact found anywhere in the repository.

### Adversarial Checks (per verification emphases)

| Check | Result |
|---|---|
| No accepted-violation baseline of any kind | ✓ Confirmed — no allowlist/skip-list/known-failures file exists; grep for baseline-shaped structures in the checker source returns only assertion comments |
| No new documentation content | ✓ Confirmed — 195 insertions / 155 deletions across 48 docs files; 87 of the added lines are heading lines with only the `{#id}` suffix removed, 40 are `<a id>` tag insertions; no new heading, section, or prose paragraph found |
| Glossary `last_verified`/`review_by` untouched | ✓ Confirmed — byte-unchanged in both `docs/_glossary-macos.md` and `docs/_glossary-android.md` |
| `check-nav-hub-links.mjs` not renamed | ✓ Confirmed — `check-phase-123.mjs`'s path-string pin passes live |
| Detection regexes stayed column-0, only mask widened | ✓ Confirmed — `/^```mermaid/` unchanged in c17 and both mermaid-aware retrofits |
| `hub file not found` hard-fail survived | ✓ Confirmed — read live in `checkOutboundLinks()` |

### Known deviations (honestly recorded, cross-checked against SUMMARY/EVIDENCE)

- Wave 2 (Plan 02) converted 2 of the 87 `{#id}` headings early to keep the hub-scope scan green
  mid-execution — recorded in `143-02-SUMMARY.md` Deviation 1, cross-confirmed in
  `143-09-SUMMARY.md`'s pre-flight census (85 remaining, not 87).
- Wave 3 (Plan 09) found `check-phase-51.mjs`/`check-phase-52.mjs` hard-pinning the `{#id}` literal
  and amended CARVE Category 5 for `check-phase-52.mjs` and `check-phase-54.mjs` (2 separate
  amendment-alone commits) before editing them — recorded in `143-09-SUMMARY.md` Deviations 1-3,
  confirmed live above.
- Wave 3 removed 47 duplicate `<a id>` anchors produced by the mechanical conversion colliding with
  a pre-existing anchor convention — recorded in `143-09-SUMMARY.md` Deviation 4, confirmed via
  `grep -rc '{#' docs/` = 0 (no leftover artifacts) and the frozen validators passing live.
- Wave 9 (Plan 08) re-measured D-25's "10 of 16" workflow figure as "13 of 16" (only base/v1.5/v1.6
  carry any `docs/` path filter) — recorded in `143-08-SUMMARY.md` with full derivation, per this
  phase's own D-36 discipline; does not change the underlying trigger-blindness conclusion.

All four are documented with derivation in their respective SUMMARY/EVIDENCE artifacts, not
silently reconciled — consistent with this phase's own D-36 "measured, not silently forced"
standard.

### Human Verification Required

None. Every must-have truth was verified by direct command execution or source read in this
session; no visual, real-time, or external-service-dependent behavior is in scope for this phase.

### Gaps Summary

No gaps found. All 6 observable truths verified by live execution against the current worktree
(not by trusting SUMMARY.md narrative). All frozen call-site pins that could plausibly have
regressed from this phase's edits were re-run live and pass. The corpus-wide checker genuinely
scans all 274 files (confirmed via independent read-only instrumentation, not the checker's own
reporting) and exits 0 with no baseline artifact anywhere in the repository. Fence-mask unification
is complete across all 15 sites in 9 files, with detection regexes deliberately left untouched
(D-21) and confirmed unchanged. The Phase 144 hand-off artifacts (`143-NEEDLE-SPEC.md`,
`v1.20-DEFERRED-CLEANUP.md` rows 13-15) are present and complete.

Note: per the task's instruction, `check-phase-138.mjs` (the slow apex chain validator) was
deliberately NOT run by this verifier — it is being run separately by the orchestrator to avoid
duplicated work. Everything else in scope for this phase was verified directly.

---

_Verified: 2026-08-11T21:30:15Z_
_Verifier: Claude (gsd-verifier)_

---

## Addendum — apex-chain regression gate (orchestrator, post-verification)

This verification was produced with `check-phase-138.mjs` deliberately excluded, because the
orchestrator was running the apex chain in parallel. That run **failed**, so the PASSED verdict
above was premature at the time it was written and is superseded by this addendum.

| Run | Result |
|---|---|
| Apex chain, first run (before fix) | **94 PASS / 1 FAIL / 0 SKIPPED**, exit 1 |
| Failing check | `V-138-AUDIT-HARNESS: v1.19-milestone-audit.mjs exits 0` |
| Underlying failure | `[9/16] C9: COPE banned-phrase check` — 2 un-exempted hits |
| Apex chain, after fix (`ea8f5d9e`) | **95 PASS / 0 FAIL / 0 SKIPPED**, exit 0 |

The regression was caused by this phase (Plan 143-05's Class-B rewrite put the literal word
`removed` after `COPE` on two lines, tripping C9's `\bCOPE\b[^.]*\bremoved\b` guard), and was fixed
target-side by supplying the `cope` mode anchor that was missing from
`docs/android-lifecycle/03-android-version-matrix.md`'s mode-anchor block. A second-order line-pin
defect was caught and corrected on re-run. Full root-cause analysis, both defects, and the
post-fix measurements are recorded in `143-EVIDENCE.md` under
"Post-execution regression: v1.19 C9 banned-phrase, caught by the apex chain".

**Final gate state**, all `[MEASURED]` at commit `1310091c`:

| Gate | Result |
|---|---|
| `check-phase-138.mjs` (apex chain) | 95 PASS / 0 FAIL / 0 SKIPPED, exit 0 |
| `v1.19-milestone-audit.mjs` | 16 passed / 0 failed / 0 skipped, exit 0 |
| `check-nav-hub-links.mjs` | 0 hub-presence / 0 corpus-link / 0 total, exit 0 |
| `check-nav-hub-links.mjs --self-test` | 10 passed / 0 failed |
| `c17-eee-contract.mjs` | 234 files, 0 with violations, 0 total; all 13 counters 0 |
| `carve-gate.mjs` | 107 in-scope, 107 on-list, 0 off-list |
| `check-phase-51/52/54/113/115/120/123/124` | all exit 0 |

**Verdict: PASSED** — on the strength of the post-fix run, not the pre-fix one.

**Method note worth carrying forward:** splitting the regression gate away from the verifier is
what surfaced this. A verifier that scores only the phase's own artifacts and validators will
report green on a phase that has broken a *neighbouring* milestone's harness. The apex chain is the
only check in this repo that spans them, and it is the slowest — which is exactly why it is the one
most likely to be skipped under time pressure.
