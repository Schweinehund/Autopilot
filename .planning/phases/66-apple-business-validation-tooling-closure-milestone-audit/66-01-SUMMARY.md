---
phase: 66-apple-business-validation-tooling-closure-milestone-audit
plan: 01
subsystem: validation
tags:
  - validation
  - apple-business
  - close-gate
  - phase-66
  - chain-validator
  - abaudit-staleness

requires:
  - .planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-VERIFICATION.md
  - scripts/validation/check-phase-65.mjs
  - scripts/validation/v1.6-milestone-audit.mjs

provides:
  - scripts/validation/check-phase-66.mjs
  - "V-66-NN assertion menu (V-66-01..V-66-07 + V-66-ABAUDIT-STALENESS + V-66-CHAIN + V-66-AUDIT + V-66-SELF)"
  - "C15 staleness audit baseline (13 orphans removed; 10 load-bearing exemptions retained)"

affects:
  - docs/cross-platform/apple-business/06-mdm-server-assignment.md
  - docs/cross-platform/apple-business/11-vpp-catalog-runbook.md
  - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
  - docs/cross-platform/apple-business/13-device-release-runbook.md
  - docs/cross-platform/apple-business/14-device-transfer-runbook.md
  - docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md
  - docs/cross-platform/apple-business/16-managed-apple-account-runbook.md
  - docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md
  - docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md

tech_stack:
  added: []
  patterns:
    - "Path-A copy lineage (check-phase-65.mjs -> check-phase-66.mjs)"
    - "Validator-as-deliverable (STATE.md:103)"
    - "Chain regression-guard via execFileSync subprocess loop"
    - "Self-recursion guard (V-66-SELF asserts CHAIN_PHASES excludes 66)"
    - "Fenced-code-block detection to exclude Pitfall-4 false-positive ABAUDITs"
    - "8 C15 production regex replication (verbatim from harness:718-727)"

key_files:
  created:
    - scripts/validation/check-phase-66.mjs
  modified:
    - docs/cross-platform/apple-business/06-mdm-server-assignment.md
    - docs/cross-platform/apple-business/11-vpp-catalog-runbook.md
    - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
    - docs/cross-platform/apple-business/13-device-release-runbook.md
    - docs/cross-platform/apple-business/14-device-transfer-runbook.md
    - docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md
    - docs/cross-platform/apple-business/16-managed-apple-account-runbook.md
    - docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md
    - docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md

decisions:
  - "Per D-02 LOCKED narrow-staleness reading + Task 66-01-02 step 3: 13 confirmed orphan ABAUDIT comments removed in separate corpus-only commit (79aa2b4) BEFORE the validator file commit (0ae8975); preserves D-01 atomic-commit purity for Wave 2"
  - "Added Pitfall-4 mitigation to validator's ABAUDIT-STALENESS scanner: fenced-code-block state tracking excludes 1 demonstrative ABAUDIT example at 00-overview.md:68 (inside ```html / ``` style-guide block) — Rule 1 bug fix to the strict line-start anchor"

metrics:
  duration: "27 min"
  completed: 2026-05-25
  files_created: 1
  files_modified: 9
  task_count: 2
  commit_count: 2

requirements:
  - AUDIT-14
---

# Phase 66 Plan 01: Author check-phase-66.mjs + Execute D-02 ABAUDIT Staleness Walk Summary

Authored `scripts/validation/check-phase-66.mjs` as a Path-A copy from `check-phase-65.mjs` containing the full V-66-NN assertion menu (V-66-01..V-66-07 + V-66-ABAUDIT-STALENESS + V-66-CHAIN-{48..65} + V-66-AUDIT + V-66-SELF), and executed the D-02 narrow-staleness ABAUDIT walk which revealed 13 strict-narrow orphans across 9 files (deviating materially from the D-02 advisor's "likely zero" prediction) — orphans removed in a separate corpus-only commit landed BEFORE the validator-file commit per Task 66-01-02 step 3, preserving Wave 2's atomic-commit purity.

## Goal

Establish the validator-as-deliverable contract for Phase 66 BEFORE the Wave 2 AUDIT-14 atomic harness commit, so the Wave 2 pre-commit dry-run (D-01 step 2) can invoke `node scripts/validation/check-phase-66.mjs` as the 5th of 5 chain validators in the green-gate sequence. Bake the D-02 C15 staleness check into permanent CI via `V-66-ABAUDIT-STALENESS` (auto-catches future drift). Walk the 24 ABAUDIT comments across 11 files (24 - 1 demonstrative-in-code-fence = 23 in-scope), remove any orphans, ship a clean baseline.

## Implementation

### Task 66-01-01: Author check-phase-66.mjs

Created `scripts/validation/check-phase-66.mjs` (377 lines) as a Path-A copy from `check-phase-65.mjs` with exact transformations:

| Source (check-phase-65.mjs) | Phase 66 Adaptation |
|------|------|
| Header + imports + readFile helper (lines 1-31) | VERBATIM with phase number swap 65 -> 66 + assertion-list comment rewritten for V-66-NN menu |
| Constants block (lines 33-44) | REPLACED with 6 Phase 66 constants: HARNESS / ALLOWLIST / PIN_HELPER / CI_WORKFLOW / MILESTONE_AUDIT / DEFERRED_CLEAN |
| `CHAIN_PHASES = [48..64]` (line 47) | Extended to `[48..65]` (adds Phase 65 since this validator runs from v1.7+ perspective) |
| `CHAIN_SKIP = {48,51,58,60,61}` + root-cause comment block (lines 54-69) | VERBATIM (same Windows host; same CRLF issues); resolution path text updated to "deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md (introduced Phase 66 Plan 66-03)" |
| `checks` array V-65-01..V-65-14 (lines 71-272) | REPLACED with 7 V-66-NN entries + 1 V-66-ABAUDIT-STALENESS entry; assertion shapes follow the analog's verify-via-readFile + REQUIRED substring or JSON.parse pattern |
| CHAIN runner subprocess loop (lines 275-303) | VERBATIM with V-65 -> V-66 in id/name strings; SKIP detail string updated to v1.7 CI-Linux resolution path |
| V-65-AUDIT subprocess (lines 305-322) | VERBATIM with label swap V-65-AUDIT -> V-66-AUDIT |
| V-65-SELF (lines 324-332) | VERBATIM with phase swap; condition is `if (CHAIN_PHASES.includes(66))` |
| Runner loop + result printing (lines 334-359) | VERBATIM with `check-phase-65` -> `check-phase-66` label |

**V-66-NN assertion details:**

| ID | What it asserts | Pre-Wave-2 state |
|----|-----------------|------------------|
| V-66-01 | windowKeywords contains 6 LOCKED C11 tokens | FAIL (Wave 2 deliverable) |
| V-66-02 | c13_rotting_external is populated object + quarterly_audit metadata | FAIL (Wave 2 deliverable) |
| V-66-03 | regenerate-supervision-pins.mjs has "BASELINE_10 refreshed" + "Phase 66" | FAIL (Wave 2 deliverable) |
| V-66-04 | synthetic regex 7 negative-lookahead extension appears >=2 times (line 725 + line 854 back-port) | FAIL (Wave 2 deliverable) |
| V-66-05 | audit-harness-v1.6-integrity.yml exists with both crons + new job + tight v1.6 path-filter | FAIL (Wave 3 deliverable) |
| V-66-06 | v1.6-MILESTONE-AUDIT.md exists with `milestone: v1.6` + `requirements: 39/39` + `phases: 5/5` + `performed_by:` + `gsd-executor` + `fresh git clone` | FAIL (Wave 5 deliverable) |
| V-66-07 | v1.6-DEFERRED-CLEANUP.md exists with `## CI-1` + `## CI-2` + `## CI-3` + `CHAIN_SKIP` | FAIL (Wave 3 deliverable) |
| V-66-ABAUDIT-STALENESS | 8 C15 regex replication + 11-file scope; every ABAUDIT comment's next line triggers >=1 regex; fenced-code-block detector excludes Pitfall-4 false positives | **PASS** (10 load-bearing exemptions post-orphan-removal) |
| V-66-CHAIN-{48..65} | 18 chain regression guards via `execFileSync('node', [path])` | 13 PASS + 5 SKIPPED (CHAIN_SKIP unchanged) |
| V-66-AUDIT | subprocess `v1.6-milestone-audit.mjs` exits 0 | **PASS** (harness still green) |
| V-66-SELF | CHAIN_PHASES does NOT include 66 | **PASS** (auditor-independence guard) |

### Task 66-01-02: D-02 ABAUDIT staleness walk

Ran `node scripts/validation/check-phase-66.mjs --verbose` to walk all 24 ABAUDIT comments across 11 files. **The validator reported 14 strict-narrow orphans on first run** (deviating materially from the D-02 advisor's prediction of "likely zero" per CONTEXT.md D-02 + PATTERNS.md offline audit).

**Independent inspection** of each flagged orphan revealed two distinct populations:

| Population | Count | Disposition |
|------------|-------|-------------|
| Pitfall-4 false positive (demonstrative ABAUDIT inside fenced code block at `00-overview.md:68`) | 1 | Added fence-detector to validator's ABAUDIT-STALENESS scanner (Rule 1 bug fix); the comment remains in the corpus as legitimate teaching content for the Style Guide section |
| Genuine narrow-staleness orphan (next line documents Apple-vs-Intune surface boundary but does not contain any phrasing that triggers an existing C15 regex) | 13 | Removed per CONTEXT.md D-02 step 3 + Task 66-01-02 step 3, in a SEPARATE corpus-only commit (79aa2b4) landed BEFORE the validator-file commit (0ae8975) |

**Why the advisor underestimated the orphan count:** The 13 removed ABAUDITs all carried the annotation "C15 regex 4 false-positive exemption" but regex 4 (`/\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i`) requires `delegat|RBAC|role\s+assign` within 40 chars of `Intune-side`. The blockquote prose they were exempting ("`> is an Intune-side operation outside the Apple Business permission surface`") does not contain `delegat|RBAC|role\s+assign` — so regex 4 never actually triggered on it. The exemptions were aspirational/defensive (anticipating future regex additions or believing the prose would trigger a regex it didn't) rather than load-bearing under the current C15 regex set. The D-02 advisor's offline audit did not simulate the next-line-only regex check against the current C15 regex set; it inferred load-bearing-ness from the human-readable annotation text rather than empirically testing against the 8 regexes.

**Post-removal harness state (verified at HEAD 0ae8975):**

- `v1.6-milestone-audit.mjs` C14/C15/C16 = 15/15 PASS (no regression)
- `check-phase-62..65.mjs` all exit 0 (28/0/5 for check-phase-65; chain regression-guards GREEN)
- `check-phase-66.mjs` V-66-ABAUDIT-STALENESS = PASS with `10 ABAUDIT exemptions verified load-bearing (all next_lines trigger >=1 C15 regex)`

**Remaining 10 load-bearing ABAUDIT exemptions:**

| File | Line | ID | Triggering C15 regex |
|------|------|----|-----|
| 00-overview.md | 10 | ABAUDIT-02 | regex 1 (Intune-side surfaces RBAC, scope tags) |
| 00-overview.md | 28 | ABAUDIT-03 | regex 1 (Intune-side RBAC) |
| 11-vpp-catalog-runbook.md | 84 | ABAUDIT-09 | regex 8 (Intune admin near content token) |
| 12-shared-ipad-passcode-reset.md | 116 | ABAUDIT-07 | regex 1 (Intune RBAC permission) |
| 13-device-release-runbook.md | 74 | ABAUDIT-10 | regex 8 (Intune admin near Apple Business) |
| 18-cross-org-boundary-cheat-sheet.md | 42 | ABAUDIT-17 | regex 8 (content token) |
| 18-cross-org-boundary-cheat-sheet.md | 44 | ABAUDIT-18 | regex 1 (Intune RBAC) |
| 18-cross-org-boundary-cheat-sheet.md | 52 | ABAUDIT-23 | regex 8 (Intune admin center) |
| 18-cross-org-boundary-cheat-sheet.md | 56 | ABAUDIT-22 | regex 1 (Intune RBAC-gated) |
| admin-setup-macos/01-abm-configuration.md | 51 | ABAUDIT-01 | regex 7 (Managed Apple ID) |

Phase 64 D-08 SOT-host contract ("18- as C15 ABAUDIT SOT host") is upheld — 4 ABAUDITs remain in 18- after orphan removal (down from 7), all confirmed load-bearing. D-08's designation governs WHERE remaining exemptions live (in 18-, not scattered); it does not specify a minimum count.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added fenced-code-block detector to V-66-ABAUDIT-STALENESS scanner**

- **Found during:** Task 66-01-02 first execution (before any commits landed)
- **Issue:** The strict line-start anchor `/^\s*<!--\s*ABAUDIT-(\d+):/` correctly excludes Version History prose mentions (per Pitfall 4) but does NOT exclude ABAUDIT comments that appear INSIDE fenced code blocks as demonstrative/teaching content. The single occurrence at `docs/cross-platform/apple-business/00-overview.md:68` is the Style Guide section's literal `<!-- ABAUDIT-01: ... -->` example (inside a ` ```html ... ``` ` block teaching readers what the convention looks like).
- **Fix:** Added fence-state tracker to the scanner loop: any line matching `/^\s*```/` toggles `inFence`; lines inside fence are skipped entirely. The demonstrative ABAUDIT example remains in the corpus (correctly — it's load-bearing for the Style Guide section) but no longer false-positive-triggers the validator.
- **Files modified:** scripts/validation/check-phase-66.mjs (single-file inline fix to the validator authored in the same task)
- **Commit:** 0ae8975 (rolled into the Task 66-01-01 commit, since the bug is in the file that commit creates)

**2. [Rule 2 - Auto-add missing critical functionality] Empirical deviation: 13 orphans found vs 0 predicted**

- **Found during:** Task 66-01-02 execution
- **Issue:** D-02 advisor predicted "likely zero orphans" based on offline audit. Actual measurement at HEAD ad5c9c9 (after fence-detector fix) found 13 strict-narrow orphans across 9 files.
- **Fix:** Per CONTEXT.md D-02 step 3 + Task 66-01-02 step 3 + acceptance criterion #6 ("If any ABAUDIT orphan is found, it is removed in a separate corpus-only commit BEFORE Wave 2 starts"), removed all 13 orphan ABAUDIT comments. This is Plan-authorized action, not a checkpoint-trigger; the Plan explicitly contains contingency wording for the non-zero case.
- **Why this isn't a Rule 4 architectural change:** The 13 ABAUDITs being removed are HTML comment annotations on already-shipped markdown files. The Plan pre-decided the disposition ("orphans get removed"). The deviation from prediction (13 vs 0) is documented in the SUMMARY but the action itself is within Plan authority. Phase 64 D-08 SOT-host contract is upheld (4 ABAUDITs remain in 18-, the SOT host).
- **Files modified:** 9 corpus files in `docs/cross-platform/apple-business/`
- **Commit:** 79aa2b4 (separate corpus-only commit landed BEFORE the validator-file commit, per Task 66-01-02 step 3)

### Authentication Gates

None. This is a pure validation-tooling-closure plan with no auth surface.

### Architectural Decisions Made

None. All decisions were pre-locked in CONTEXT.md (D-01..D-04). Task 66-01-02's orphan-removal disposition was pre-authorized by CONTEXT.md D-02 + Task 66-01-02 step 3.

## Files Created

- **scripts/validation/check-phase-66.mjs** (NEW; 377 lines) — Phase 66 validator-as-deliverable; Path-A copy from check-phase-65.mjs; ships V-66-NN assertion menu + V-66-ABAUDIT-STALENESS + V-66-CHAIN-{48..65} + V-66-AUDIT + V-66-SELF; exit code 1 at commit time because V-66-01..V-66-07 are RED-by-design pre-Wave-2 (they target Wave 2/3/5 deliverables not yet authored)

## Files Modified

9 corpus files in `docs/cross-platform/apple-business/` had a single `<!-- ABAUDIT-NN: ... -->` HTML comment line removed (single-line deletion per file, preserving surrounding blockquote / table-row structure):

- 06-mdm-server-assignment.md (ABAUDIT-04 removed)
- 11-vpp-catalog-runbook.md (ABAUDIT-05 removed)
- 12-shared-ipad-passcode-reset.md (ABAUDIT-06 removed)
- 13-device-release-runbook.md (ABAUDIT-08 removed)
- 14-device-transfer-runbook.md (ABAUDIT-11, ABAUDIT-12, ABAUDIT-13 removed — 3 removals in one file)
- 15-mdm-server-reassign-runbook.md (ABAUDIT-14 removed)
- 16-managed-apple-account-runbook.md (ABAUDIT-15 removed)
- 17-audit-log-scoping-runbook.md (ABAUDIT-16 removed)
- 18-cross-org-boundary-cheat-sheet.md (ABAUDIT-19, ABAUDIT-20, ABAUDIT-21 removed — 3 removals in the SOT host file; ABAUDITs 17, 18, 22, 23 remain load-bearing)

## V-66 Assertion State Snapshot

### Wave 1 commit-time state (verified at HEAD 0ae8975)

```
check-phase-66 -- Phase 66 deliverables

[1/28]                V-66-01: ... FAIL (windowKeywords missing 6 LOCKED tokens)
[2/28]                V-66-02: ... FAIL (c13_rotting_external still empty array)
[3/28]                V-66-03: ... FAIL (BASELINE_10 freshness comment absent)
[4/28]                V-66-04: ... FAIL (synthetic regex 7 back-port not yet landed)
[5/28]                V-66-05: ... FAIL (audit-harness-v1.6-integrity.yml missing)
[6/28]                V-66-06: ... FAIL (v1.6-MILESTONE-AUDIT.md missing)
[7/28]                V-66-07: ... FAIL (v1.6-DEFERRED-CLEANUP.md missing)
[ABAUDIT-STALENESS]   V-66-ABAUDIT-STALENESS: ... PASS (10 exemptions verified load-bearing)
[CHAIN-48]            ... SKIPPED (CHAIN_SKIP)
[CHAIN-49..50, 52..57, 59, 62..65]  ... PASS (13 entries)
[CHAIN-51, 58, 60, 61]              ... SKIPPED (CHAIN_SKIP)
[AUDIT]               V-66-AUDIT: ... PASS (v1.6 harness exits 0)
[SELF]                V-66-SELF: ... PASS (CHAIN_PHASES does NOT include 66)

Result: 16 PASS, 7 FAIL, 5 SKIPPED
Exit code: 1 (expected pre-Wave-2; V-66-01..V-66-07 RED-by-design)
```

### Post-Wave-5 target state (v1.6 milestone close)

```
Result: 23 PASS, 0 FAIL, 5 SKIPPED
Exit code: 0
```

- All V-66-NN assertions PASS (Wave 2 lands C11 tokens + c13_rotting_external + BASELINE_10 + regex-7 back-port; Wave 3 lands CI workflow + DEFERRED-CLEANUP.md; Wave 5 lands MILESTONE-AUDIT.md)
- V-66-ABAUDIT-STALENESS continues to PASS (10 exemptions remain load-bearing)
- V-66-CHAIN unchanged (CHAIN_SKIP {48,51,58,60,61} remain; v1.7 CI-Linux job resolves)
- V-66-AUDIT + V-66-SELF unchanged

## Commits

| Task | Commit | Type | Summary |
|------|--------|------|---------|
| 66-01-02 (orphan removal) | `79aa2b4` | chore | Remove 13 orphan ABAUDIT exemption(s) per D-02 staleness walk (9 corpus files, -13 lines) |
| 66-01-01 (validator file) | `0ae8975` | feat | Author check-phase-66.mjs (Path-A from check-phase-65.mjs) with V-66-NN assertion menu (new file, +377 lines) |

## Wave 2 handoff

The Wave 2 pre-commit dry-run protocol (D-01 step 2) will exercise this validator as the 5th of 5 chain validators in the green-gate sequence:

```
node scripts/validation/v1.6-milestone-audit.mjs && \
node scripts/validation/v1.6-milestone-audit.mjs --self-test && \
node scripts/validation/check-phase-62.mjs && \
node scripts/validation/check-phase-63.mjs && \
node scripts/validation/check-phase-64.mjs && \
node scripts/validation/check-phase-65.mjs && \
node scripts/validation/check-phase-66.mjs
```

Wave 2's AUDIT-14 atomic harness commit must turn V-66-01 (windowKeywords), V-66-02 (c13_rotting_external), V-66-03 (BASELINE_10), and V-66-04 (regex-7 back-port) from FAIL to PASS in a single commit. Per RESEARCH.md Pitfall 1 + Phase 65 V-62-SIDECAR cascade precedent (`65-VERIFICATION.md:255-261`), the atomic commit must also budget for a probable 5th file (likely `check-phase-62.mjs` V-62-SIDECAR extension to validate `c13_rotting_external` shape).

## Self-Check: PASSED

- [x] scripts/validation/check-phase-66.mjs created (377 lines; verified via `git show 0ae8975 --stat`)
- [x] 9 corpus files modified (verified via `git show 79aa2b4 --stat` showing 9 files changed, 13 deletions)
- [x] Commit 79aa2b4 (Task 66-01-02) exists in git log
- [x] Commit 0ae8975 (Task 66-01-01) exists in git log
- [x] V-66-ABAUDIT-STALENESS reports PASS at HEAD 0ae8975 (verified via `node scripts/validation/check-phase-66.mjs --verbose | grep ABAUDIT-STALENESS`)
- [x] check-phase-66.mjs exits 1 at HEAD 0ae8975 (expected; V-66-01..V-66-07 RED-by-design pre-Wave-2)
- [x] check-phase-62..65.mjs all exit 0 at HEAD 0ae8975 (no regression in upstream chain)
- [x] v1.6-milestone-audit.mjs exits 0 at HEAD 0ae8975 (C14/C15/C16 = 15/15 PASS preserved; harness chain green)
- [x] V-66-SELF asserts CHAIN_PHASES does NOT include 66 (verified — `CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]`)
