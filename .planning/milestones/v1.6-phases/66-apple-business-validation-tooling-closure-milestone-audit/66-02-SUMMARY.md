---
phase: 66-apple-business-validation-tooling-closure-milestone-audit
plan: 02
subsystem: validation
tags:
  - validation
  - apple-business
  - atomic-commit
  - harness
  - phase-66
  - audit-14

requires:
  - .planning/phases/66-apple-business-validation-tooling-closure-milestone-audit/66-01-SUMMARY.md
  - scripts/validation/check-phase-66.mjs
  - scripts/validation/v1.6-milestone-audit.mjs
  - scripts/validation/v1.6-audit-allowlist.json
  - scripts/validation/regenerate-supervision-pins.mjs

provides:
  - "C11 windowKeywords extended with 6 LOCKED Apple-Business tokens (apple-business-side / intune-side / integration-handshake / owned-by-apple-business / owned-by-intune / scope-boundary)"
  - "C15 synthetic regex 7 (line 854) back-ported to match production line 725 (.{0,160} window + 6 added negative-lookahead exclusion terms)"
  - "c13_rotting_external populated object payload (4 ci_1_abm_urls + 6 ci_2_vpp_location_token + 16-file ci_3_managed_apple_id + quarterly_audit metadata at cadence '0 8 1 1,4,7,10 *')"
  - "BASELINE_10 freshness comment in regenerate-supervision-pins.mjs (closes BASELINE_9 v1.5 carry-over per STATE.md:138 + AUDIT-14 contract)"
  - "V-66-01..V-66-04 + V-66-ABAUDIT-STALENESS now GREEN against this commit's content edits (Wave 1 assertion menu shipped at 0ae8975 needed no tuning)"

affects:
  - scripts/validation/v1.6-milestone-audit.mjs
  - scripts/validation/v1.6-audit-allowlist.json
  - scripts/validation/regenerate-supervision-pins.mjs

tech_stack:
  added: []
  patterns:
    - "Atomic-harness-commit (v1.5 Plan 60-08 / Phase 62-08 precedent — STATE.md:111-112)"
    - "Pre-commit dry-run loop (D-01 LOCKED protocol; 7 validator steps before git add)"
    - "Sidecar JSON shape transition (array placeholder -> populated object with quarterly_audit metadata)"
    - "Path-A regex back-port (synthetic mirror catches up to production verbatim — preserves --self-test honesty)"
    - "Audit-trail freshness comment without coordinate mutation (BASELINE_9 array literal byte-identical; BASELINE_10 comment records re-verification event)"

key_files:
  created: []
  modified:
    - scripts/validation/v1.6-milestone-audit.mjs
    - scripts/validation/v1.6-audit-allowlist.json
    - scripts/validation/regenerate-supervision-pins.mjs

decisions:
  - "Atomic commit landed as 3 files (not 4 or 5). check-phase-66.mjs was authored correctly in Wave 1 (commit 0ae8975) and required no assertion-body tuning — per <interfaces> 'Default: NO TOUCH in Wave 2 commit'. check-phase-62.mjs V-62-SIDECAR was confirmed PASS during dry-run because the assertion only validates c16_missing_endpoint_exemptions (not c13 shape) — no cascade observed per Phase 65 3->4 file growth precedent. Atomicity contract is preserved: V-66-01..04 + V-66-ABAUDIT-STALENESS transition atomically against THIS single SHA without requiring validator-file co-modification."
  - "RESEARCH.md 'c13_rotting_external Populated Payload' inserted VERBATIM (lines 697-740) — preserves CI-1 calibration finding (4 ABM URLs vs ~30 historical estimate per PITFALLS.md:617) and the 45-occurrence/16-file CI-3 enumeration"
  - "BASELINE_10 freshness comment dated 2026-05-25 (Phase 66 Plan 66-02 execution date) — supersedes the PLAN-template draft date 2026-05-24; HEAD baseline citation updated to 33629fa (Phase 66 Plan 66-01 close) instead of ad5c9c9 (Phase 65 close) to reflect the actual Wave-1-landed baseline this BASELINE_10 closes"

metrics:
  duration: "9 min"
  completed: 2026-05-25
  files_created: 0
  files_modified: 3
  task_count: 1
  commit_count: 1

requirements:
  - AUDIT-14
---

# Phase 66 Plan 02: AUDIT-14 Atomic Harness Commit Summary

Landed the AUDIT-14 atomic harness commit per D-01 LOCKED at SHA `3a9a671` — a single indivisible commit modifying 3 files that atomically transitions V-66-01..V-66-04 + V-66-ABAUDIT-STALENESS from FAIL to PASS against the Wave-1-authored validator (`check-phase-66.mjs` at `0ae8975`). Pre-commit dry-run protocol passed green at all 7 validator steps; no V-62-SIDECAR cascade was observed (predicted 5th-file budget was unused). The 4-mandatory-file PLAN expectation reduced to 3 actual files because Wave 1 authored `check-phase-66.mjs` so precisely that no Wave 2 assertion-body tuning was needed — atomicity preserved at the assertion-transition layer rather than at the file-count layer.

## Goal

Land AUDIT-14 contract (REQUIREMENTS.md:63 + ROADMAP.md:239) — "BASELINE_10 refreshes in an atomic harness commit (closes BASELINE_9 v1.5 carry-over)" — as ONE indivisible commit per the v1.5 Plan 60-08 / Phase 62-08 atomic-harness-commit precedent (STATE.md:111-112). Avoid the V-62-SIDECAR-cascade hazard documented at `65-VERIFICATION.md:255-261` by executing the D-01 LOCKED pre-commit dry-run protocol (7 validator steps) BEFORE `git add` to discover any cross-validator dependencies in the staged-but-uncommitted state.

## Implementation

### Task 66-02-01: AUDIT-14 ATOMIC HARNESS COMMIT (single-task plan)

Executed the D-01 LOCKED 5-phase protocol verbatim:

**PHASE 1: Pre-edit verification (read-only).** Inspected pre-edit state at:

| Target | Verified state |
|--------|---------------|
| `v1.6-milestone-audit.mjs:577` | `windowKeywords` regex absent the 6 LOCKED tokens (matches PLAN BEFORE-state) |
| `v1.6-milestone-audit.mjs:854` | Synthetic regex 7 = `.{0,80}` window + 6 exclusions (line 725 has `.{0,160}` + 12 exclusions; back-port needed) |
| `v1.6-audit-allowlist.json:79` | `"c13_rotting_external": [],` (single-line empty array placeholder) |
| `regenerate-supervision-pins.mjs:390-397` | 3 BASELINE_9 freshness comments present at lines 390/393/396; `const BASELINE_9 = [` at line 399; no BASELINE_10 comment |
| `check-phase-62.mjs:277-291` | V-62-SIDECAR asserts ONLY `c16.length === 0` (does NOT assert c13_rotting_external shape — no cascade expected) |
| `check-phase-66.mjs` | Wave 1 authored at `0ae8975`; V-66-01..V-66-07 + V-66-ABAUDIT-STALENESS bodies present; exits 1 with 7 FAIL pre-Wave-2 (per 66-01-SUMMARY.md:220) |

**PHASE 2: Applied 4 mandatory edits to working tree** (only 3 files because Edit 4 split was a misread — see below):

| Edit | File | Change |
|------|------|--------|
| 1 | `v1.6-milestone-audit.mjs:577` | Appended `\|apple-business-side\|intune-side\|integration-handshake\|owned-by-apple-business\|owned-by-intune\|scope-boundary` to `windowKeywords` regex (6 LOCKED tokens per ROADMAP:239); `/i` flag preserved |
| 2 | `v1.6-milestone-audit.mjs:854` | Synthetic regex 7 back-ported verbatim from production line 725: `.{0,80}` -> `.{0,160}`; exclusion list extended with `renamed\|personal\|Apple\s+Business\|scopes\|ABM\|account` |
| 3 | `v1.6-audit-allowlist.json:79` | Replaced `"c13_rotting_external": [],` with the 39-line populated object from RESEARCH.md "c13_rotting_external Populated Payload" (lines 697-740) — verbatim insertion |
| 4 | `regenerate-supervision-pins.mjs:398` | Inserted 7-line BASELINE_10 freshness comment block immediately after BASELINE_9 comment chain (after line 397) and before `const BASELINE_9 = [` (line 399); BASELINE_9 array literal at lines 406-416 BYTE-IDENTICAL to pre-edit |

Edits 1+2 both modify `v1.6-milestone-audit.mjs` — counted as 2 conceptual edits in 1 file, hence the working tree shows 3 modified files (`v1.6-milestone-audit.mjs`, `v1.6-audit-allowlist.json`, `regenerate-supervision-pins.mjs`). The PLAN's "4-mandatory" count assumed `check-phase-66.mjs` would be tuned in Wave 2 — see Deviations below for why it wasn't.

**PHASE 3: Pre-commit dry-run loop (D-01 LOCKED protocol).** Ran all 7 validator steps against the unstaged working tree:

| Step | Command | Exit | Result line |
|------|---------|------|-------------|
| 1 | `node scripts/validation/v1.6-milestone-audit.mjs` | 0 | `Summary: 15 passed, 0 failed, 0 skipped` |
| 2 | `node scripts/validation/v1.6-milestone-audit.mjs --self-test` | 0 | `Self-test: 9 passed, 0 failed` |
| 3 | `node scripts/validation/check-phase-62.mjs` | 0 | `Result: 29 PASS, 0 FAIL, 5 SKIPPED` (V-62-SIDECAR PASS — no cascade) |
| 4 | `node scripts/validation/check-phase-63.mjs` | 0 | `Result: 27 PASS, 0 FAIL, 5 SKIPPED` |
| 5 | `node scripts/validation/check-phase-64.mjs` | 0 | `Result: 24 PASS, 0 FAIL, 5 SKIPPED` |
| 6 | `node scripts/validation/check-phase-65.mjs` | 0 | `Result: 28 PASS, 0 FAIL, 5 SKIPPED` |
| 7 | `node scripts/validation/check-phase-66.mjs` | 1 | `Result: 20 PASS, 3 FAIL, 5 SKIPPED` (V-66-05/06/07 RED-by-design — Wave 3 + Wave 5 deliverables) |

All 6 upstream gates GREEN modulo CHAIN_SKIP {48, 51, 58, 60, 61}. V-66-01..04 + V-66-ABAUDIT-STALENESS + V-66-CHAIN-{48..65} + V-66-AUDIT + V-66-SELF all GREEN. The 3 FAILs are exactly the expected Wave 3/5 deliverables (CI workflow + MILESTONE-AUDIT.md + DEFERRED-CLEANUP.md not yet authored). No reconciling 5th file (`check-phase-62.mjs` V-62-SIDECAR extension) needed.

**PHASE 4: Atomic commit.** Staged 3 files individually and committed with the AUDIT-14 contract footer:

```
git add scripts/validation/v1.6-milestone-audit.mjs scripts/validation/v1.6-audit-allowlist.json scripts/validation/regenerate-supervision-pins.mjs
git commit -m "feat(66-02): AUDIT-14 atomic harness commit — C11 +6 LOCKED tokens / c13_rotting_external populated / BASELINE_10 freshness / regex-7 synthetic back-port ..."
```

Result SHA: **`3a9a671`** (full: `3a9a671e4e53027e615508b45cc0e474946008df`). `git log --name-only -1 HEAD` confirms exactly 3 files:

```
scripts/validation/regenerate-supervision-pins.mjs
scripts/validation/v1.6-audit-allowlist.json
scripts/validation/v1.6-milestone-audit.mjs
```

Commit stats: `3 files changed, 51 insertions(+), 3 deletions(-)`.

**PHASE 5: Post-commit verification.** Re-ran the full validator chain on the committed state:

| Validator | Exit | Result |
|-----------|------|--------|
| `v1.6-milestone-audit.mjs` | 0 | 15/15 PASS (C14/C15/C16 all PASS) |
| `v1.6-milestone-audit.mjs --self-test` | 0 | 9/9 PASS |
| `check-phase-62.mjs` | 0 | 29/0/5 |
| `check-phase-63.mjs` | 0 | 27/0/5 |
| `check-phase-64.mjs` | 0 | 24/0/5 |
| `check-phase-65.mjs` | 0 | 28/0/5 |
| `check-phase-66.mjs` | 1 | 20 PASS / 3 FAIL / 5 SKIPPED (V-66-05/06/07 RED-by-design; V-66-01..04 + V-66-ABAUDIT-STALENESS + V-66-CHAIN + V-66-AUDIT + V-66-SELF all PASS) |

Post-commit state matches dry-run state byte-for-byte. No regressions; AUDIT-14 contract satisfied.

## Deviations from Plan

### Auto-fixed Issues

None. All 4 mandatory edits applied as specified in `<interfaces>`. No bugs encountered, no missing functionality added, no blocking issues fixed.

### File-count Deviation (NOT a Rule N auto-fix; PLAN-anticipated)

**1. [PLAN-anticipated optional behavior] Atomic commit landed as 3 files, not 4 or 5**

- **Found during:** Phase 3 dry-run (Step 7 — check-phase-66.mjs) confirmed Wave 1 V-66 assertion bodies needed no tuning; Phase 3 dry-run (Step 3 — check-phase-62.mjs) confirmed V-62-SIDECAR did not cascade
- **Decision rationale:**
  - `<interfaces>` explicitly authorizes the "no touch" disposition: "check-phase-66.mjs: Touched in Wave 2 commit ONLY IF the Wave 1 V-66 assertion bodies need tuning... Default: NO TOUCH in Wave 2 commit — Wave 1 authored the validator correctly."
  - The V-62-SIDECAR canary (Phase 65 3->4 file growth predictor) didn't cascade because the existing assertion at `check-phase-62.mjs:288` only validates `c16_missing_endpoint_exemptions.length === 0` — it does NOT assert c13_rotting_external shape, so transitioning c13 from `[]` to populated object had zero effect on V-62-SIDECAR.
  - Adding a no-op edit to `check-phase-66.mjs` purely to satisfy the file-count expectation literally would be artifactual and violates the "indivisible-commit-purity" intent of D-01 (commits should contain only load-bearing changes).
- **Atomicity contract preserved:** The atomic-harness-commit pattern's value proposition (per STATE.md:111-112) is that "the validator chain transitions from baseline to post-AUDIT-14 in one git operation, with no intermediate red state." This commit satisfies that exactly: V-66-01..04 + V-66-ABAUDIT-STALENESS all flip from FAIL to PASS in the single SHA `3a9a671`, even though the validator file (`check-phase-66.mjs`) itself wasn't modified in that SHA. The atomicity unit is the assertion-state transition, not the file count.
- **Files modified:** scripts/validation/{v1.6-milestone-audit.mjs, v1.6-audit-allowlist.json, regenerate-supervision-pins.mjs} (3 files in 1 commit)
- **Commit:** 3a9a671

### Date Deviation (BASELINE_10 freshness comment)

**2. [Calendar correction] BASELINE_10 freshness comment dated 2026-05-25 (not 2026-05-24 as the PLAN template draft suggested)**

- **PLAN template (`<interfaces>` Edit 3 / Edit 4):** suggested date `2026-05-24` in the BASELINE_10 comment template
- **Actual date when Plan 66-02 executed:** 2026-05-25 (per phase_context "Today's date: 2026-05-25" + system reminder confirming the date change between session timestamps)
- **Action:** Used `2026-05-25` in the BASELINE_10 comment per phase_context instruction "use this for any timestamp/date in commit messages, SUMMARY.md, freshness comments"
- **HEAD citation also updated:** The PLAN template cited "HEAD ad5c9c9 (Phase 65 close-gate baseline)" but the actual current HEAD at Wave 2 execution time is `33629fa` (Phase 66 Plan 66-01 close commit); used `33629fa` in the freshness comment because BASELINE_10 closes the chain through Wave 1 (the immediately preceding green-baseline state), not back through Wave 0
- **Why this isn't a Rule 4 architectural change:** Date and HEAD citations are factual recording fields, not architectural decisions. The PLAN template authored 2026-05-24 because the planner expected execution on that date; the actual execution date is 2026-05-25 per the explicit phase_context override. STATE.md:5 confirms 2026-05-25 as `last_activity`.

### Authentication Gates

None. No auth surface touched.

### Architectural Decisions Made

None. All decisions pre-locked in CONTEXT.md (D-01..D-04). Both deviations above are PLAN-anticipated (D-01 explicitly says "5th file IF cascade") and calendar-driven (today's date).

## Files Modified

- **scripts/validation/v1.6-milestone-audit.mjs** (2 edits, 1 file)
  - Line 577: `windowKeywords` regex extended with 6 LOCKED Apple-Business tokens (alternation order preserved; `/i` flag preserved)
  - Line 854: synthetic regex 7 back-ported verbatim from production line 725 (`.{0,80}` -> `.{0,160}`; +6 exclusion terms `renamed|personal|Apple\s+Business|scopes|ABM|account`); trailing comma + 4-space indent preserved
- **scripts/validation/v1.6-audit-allowlist.json** (1 edit, 1 file)
  - Line 79: replaced `"c13_rotting_external": [],` with 39-line populated object (4 ci_1_abm_urls + 6 ci_2_vpp_location_token + 16-file ci_3_managed_apple_id + quarterly_audit metadata at cadence `0 8 1 1,4,7,10 *`)
  - Sibling keys at lines 5-78 (safetynet_exemptions / supervision_exemptions / cope_banned_phrases / c7_knox_allowlist / c9_exemptions / c11_ops_exemptions / c13_broken_link_allowlist) and line 80 (`c16_missing_endpoint_exemptions: []`) byte-identical pre/post
- **scripts/validation/regenerate-supervision-pins.mjs** (1 edit, 1 file)
  - Lines ~398-404 (7 lines inserted): BASELINE_10 freshness comment block mirroring BASELINE_9 freshness comments at lines 390/393/396; cites AUDIT-14 contract (REQUIREMENTS.md:63 + ROADMAP.md:239) + HEAD baseline `33629fa` + Path-A inheritance pattern (v1.4.1 -> BASELINE_8 -> v1.5 -> BASELINE_9 -> v1.6 -> BASELINE_10)
  - `const BASELINE_9 = [` array literal (lines 406-416 post-insert; was 399-409 pre-insert) BYTE-IDENTICAL — Phase 66 records audit-trail event, not coordinate mutation, per Plan 66-02 must_haves truth #5

## Dry-Run Outcome

**Edit 5 (check-phase-62.mjs V-62-SIDECAR extension) was NOT required.** Step 3 of the dry-run loop confirmed V-62-SIDECAR PASS even with the c13_rotting_external shape change. Rationale: the existing assertion at `check-phase-62.mjs:288` reads:

```javascript
const c16 = parsed.c16_missing_endpoint_exemptions || [];
if (c16.length !== 0) return { pass: false, ... };
return { pass: true, detail: 'valid JSON; c16=0 entries (Phase 65 atomic-trio sunset-65 removals confirmed)' };
```

It only checks `c16_missing_endpoint_exemptions`; it does not touch `c13_rotting_external`. Therefore transitioning c13 from `[]` to populated object has zero effect on V-62-SIDECAR's pass/fail verdict. This makes Phase 66's atomic commit 1 file smaller than the Phase 65 cascade precedent (3->4 vs 3->3 here), which is the positive outcome — fewer files in the atomic commit means tighter rollback semantics.

The dry-run was the discovery mechanism per Pitfall 1 in RESEARCH.md, exactly as designed. The protocol worked: had V-62-SIDECAR cascaded, Edit 5 would have been applied and re-tested before commit. The protocol did NOT prevent a real cascade (none occurred) — it confirmed the absence of a cascade, which is the success state.

## Post-Commit Assertion State

**Harness layer (`v1.6-milestone-audit.mjs` at HEAD `3a9a671`):**
- 15/15 PASS (C1-C16 all green; C14 + C15 + C16 specifically blocking gates all PASS)
- --self-test: 9/9 PASS (synthetic C14 + C15 + C16 + parsePlatformValue tests all green; back-ported regex 7 behavior validated implicitly via Test 3 C15 Intune-RBAC -> fail)
- No regressions from pre-Wave-2 state

**Chain layer (`check-phase-{62..65}.mjs` at HEAD `3a9a671`):**
- check-phase-62.mjs: 29 PASS / 0 FAIL / 5 SKIPPED (V-62-SIDECAR PASS — c16=0; c13_rotting_external shape change had zero impact)
- check-phase-63.mjs: 27 PASS / 0 FAIL / 5 SKIPPED
- check-phase-64.mjs: 24 PASS / 0 FAIL / 5 SKIPPED
- check-phase-65.mjs: 28 PASS / 0 FAIL / 5 SKIPPED
- CHAIN_SKIP {48, 51, 58, 60, 61} preserved (Windows CRLF + archived-path; v1.7 CI-Linux job deferred per CONTEXT D-03 + DEFERRED-CLEANUP.md Wave 3 target)

**Phase 66 layer (`check-phase-66.mjs` at HEAD `3a9a671`):**

| Assertion | Pre-Wave-2 (HEAD 0ae8975) | Post-Wave-2 (HEAD 3a9a671) |
|-----------|---------------------------|-----------------------------|
| V-66-01 (C11 6 LOCKED tokens) | FAIL | **PASS** |
| V-66-02 (c13_rotting_external populated object + quarterly_audit metadata) | FAIL | **PASS** |
| V-66-03 (BASELINE_10 freshness comment present) | FAIL | **PASS** |
| V-66-04 (synthetic regex 7 back-port; extension appears >=2x) | FAIL | **PASS** |
| V-66-05 (audit-harness-v1.6-integrity.yml exists) | FAIL | FAIL (Wave 3 deliverable) |
| V-66-06 (v1.6-MILESTONE-AUDIT.md exists) | FAIL | FAIL (Wave 5 deliverable) |
| V-66-07 (v1.6-DEFERRED-CLEANUP.md exists) | FAIL | FAIL (Wave 3 deliverable) |
| V-66-ABAUDIT-STALENESS | PASS (10 load-bearing exemptions post-Wave-1) | **PASS** (unchanged) |
| V-66-CHAIN-{48..65} (18 entries) | 13 PASS + 5 SKIPPED | **13 PASS + 5 SKIPPED** (unchanged) |
| V-66-AUDIT (subprocess harness exit 0) | PASS | **PASS** (unchanged) |
| V-66-SELF (CHAIN_PHASES does not include 66) | PASS | **PASS** (unchanged) |
| **Aggregate** | **16/7/5 (exit 1)** | **20/3/5 (exit 1)** |

Net transition: 4 V-66 assertions flipped FAIL -> PASS in this single SHA. Remaining 3 FAILs are exclusively Wave 3 (V-66-05, V-66-07) + Wave 5 (V-66-06) deliverables not yet authored.

## --self-test Verdict

```
=== self-test: v1.6 milestone-audit synthetic harness ===
[SELF] PASS Test 1 C14 all-tokens-present -> pass
[SELF] PASS Test 2 C14 missing-date -> fail
[SELF] PASS Test 3 C15 Intune-RBAC -> fail
[SELF] PASS Test 4 C15 ABAUDIT-exempted Intune-RBAC -> pass
[SELF] PASS Test 5 C16 all-4-exempted -> pass
[SELF] PASS Test 6 C16 exemption-missing-sunset -> fail
[SELF] PASS Test 7 parsePlatformValue compound -> valid+compound
[SELF] PASS Test 8 parsePlatformValue unknown-atom -> invalid
[SELF] PASS Test 9 parsePlatformValue single-atom -> valid+not-compound

Self-test: 9 passed, 0 failed
Exit: 0
```

The synthetic C15 fixtures (Tests 3 + 4) use the C15_BANNED_SYNTH array at lines 847-856, which includes the back-ported regex 7 at line 854. Both tests pass, confirming the back-port did not break C15 synthetic behavior. The harness self-test is the canary that catches regex divergence between production (line 725) and synthetic (line 854) — both tests passing confirms the divergence is now resolved (V-66-04 contract).

## Wave 3 Handoff

The Wave 2 atomic commit at `3a9a671` enables Wave 3 to author against a now-populated `c13_rotting_external` state:

- **CI workflow `.github/workflows/audit-harness-v1.6-integrity.yml`** can now reference the populated `c13_rotting_external.ci_1_abm_urls` array for the new `rotting-external-quarterly` job (cron `0 8 1 1,4,7,10 *`); the markdown-link-check tool will iterate the 4 ABM URL entries
- **`.planning/milestones/v1.6-DEFERRED-CLEANUP.md`** can cite the populated payload directly:
  - **CI-1 section:** 4 ABM URL refs (calibrated; not ~30 as historical estimate)
  - **CI-2 section:** 6 VPP-location-token line refs at `admin-setup-ios/05-app-deployment.md:71,201` + `admin-setup-macos/04-app-deployment.md:45,46,113,148`
  - **CI-3 section:** 16 files / 45 total Managed Apple ID occurrences (densest at `admin-setup-ios/08-user-enrollment.md` with 17 occurrences)
  - **CHAIN_SKIP-CRLF section:** {48, 51, 58, 60, 61} entries preserved per CONTEXT D-03 (Windows host; resolution = v1.7 CI-Linux job)

Wave 3 should NOT modify the v1.6-audit-allowlist.json — the populated payload is the load-bearing surface that Wave 3 reads from, not writes to.

## Calibration Findings (record in v1.6-DEFERRED-CLEANUP.md Wave 3)

**CI-1 historical-estimate discrepancy:** PITFALLS.md:617 and CONTEXT.md "~30 ABM URL refs" was an over-estimate. The actual measured count at HEAD `33629fa` is 4 `business.apple.com` URLs (all to the live root). RESEARCH.md:742 records this calibration finding: "The historical estimate likely included `Apple Business Manager` text occurrences (term references), not URL hyperlinks. There are zero `support.apple.com/guide/apple-business-manager/` path refs at HEAD ad5c9c9 — Apple's legacy support-guide URLs are not present in the corpus. This is a positive calibration finding: the rot risk is lower than originally feared."

**V-62-SIDECAR shape-independence finding:** The Phase 65 3->4 file growth (`65-VERIFICATION.md:255-261`) cascaded because the Phase 65 c16 transition was a content change to a field V-62-SIDECAR actively asserts. The Phase 66 c13_rotting_external transition is a shape change to a field V-62-SIDECAR DOES NOT touch — hence no cascade. The asymmetry suggests v1.7+ atomic commits should grep `check-phase-{62..N}.mjs` for assertion-target fields BEFORE the dry-run to predict cascade likelihood and budget reconciliation files accordingly.

## Commits

| Task | Commit | Type | Summary |
|------|--------|------|---------|
| 66-02-01 (atomic harness commit) | `3a9a671` | feat | AUDIT-14 atomic harness commit — C11 +6 LOCKED tokens / c13_rotting_external populated / BASELINE_10 freshness / regex-7 synthetic back-port (3 files; 51 insertions / 3 deletions) |

Reverts cleanly via: `git revert 3a9a671` (single SHA restores Phase 66 Plan 66-01 close-gate baseline `33629fa` byte-identically).

## Self-Check: PASSED

- [x] Atomic commit `3a9a671` exists in git log (verified via `git log --name-only -1 HEAD`)
- [x] Commit contains exactly 3 files: scripts/validation/v1.6-milestone-audit.mjs + scripts/validation/v1.6-audit-allowlist.json + scripts/validation/regenerate-supervision-pins.mjs (verified via `git log --name-only -1 HEAD`)
- [x] v1.6-milestone-audit.mjs exits 0 with 15/15 PASS (C14/C15/C16 all PASS) (verified via `node scripts/validation/v1.6-milestone-audit.mjs`)
- [x] v1.6-milestone-audit.mjs --self-test exits 0 with 9/9 PASS (verified via `node scripts/validation/v1.6-milestone-audit.mjs --self-test`)
- [x] check-phase-62.mjs exits 0 with 29/0/5 (V-62-SIDECAR PASS — no cascade) (verified)
- [x] check-phase-63.mjs exits 0 with 27/0/5 (verified)
- [x] check-phase-64.mjs exits 0 with 24/0/5 (verified)
- [x] check-phase-65.mjs exits 0 with 28/0/5 (verified)
- [x] check-phase-66.mjs exits 1 with EXACTLY 3 FAIL (V-66-05/06/07) and 20 PASS (V-66-01..04 + V-66-ABAUDIT-STALENESS + V-66-CHAIN + V-66-AUDIT + V-66-SELF all PASS) (verified)
- [x] BASELINE_10 freshness comment present at scripts/validation/regenerate-supervision-pins.mjs ~line 398 dated 2026-05-25 (verified via inline file content)
- [x] c13_rotting_external is a populated object (not empty array) with quarterly_audit.cadence='0 8 1 1,4,7,10 *' (verified via V-66-02 PASS detail)
- [x] BASELINE_9 array literal (lines 406-416 post-insert) byte-identical to pre-Wave-2 state (verified — `const BASELINE_9 = [` line shifted +7 due to BASELINE_10 comment insert, but the 9 array entries are unchanged; no entries added/removed/reordered)
