---
phase: 65-apple-business-l1-l2-hub-navigation-integration
plan: "04"
subsystem: validator-chain / apple-business-docs
tags: [atomic-trio, c16-triangle, v64-05-reconciled, v62-sidecar-reconciled, allowlist-cleanup]
dependency_graph:
  requires: ["65-01", "65-02", "65-03"]
  provides: ["C16-triangle-live", "allowlist-clean", "V-64-05-RECONCILED", "V-62-SIDECAR-RECONCILED"]
  affects: ["scripts/validation/check-phase-62.mjs", "scripts/validation/check-phase-64.mjs", "scripts/validation/v1.6-audit-allowlist.json", "docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md"]
tech_stack:
  added: []
  patterns: ["atomic-commit-indivisibility", "NEGATIVE-to-POSITIVE-assertion-flip", "allowlist-sunset-removal", "cross-ref-append-only"]
key_files:
  created: []
  modified:
    - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
    - scripts/validation/v1.6-audit-allowlist.json
    - scripts/validation/check-phase-64.mjs
    - scripts/validation/check-phase-62.mjs
decisions:
  - "V-62-SIDECAR [Rule 1 deviation]: V-62-SIDECAR asserted c16_missing_endpoint_exemptions length === 4; emptying the allowlist (sub-action 2) caused this to fail and cascade CHAIN-62/63 failures in check-64 and check-65. Reconciled identically to V-64-05: changed expected count from 4 to 0 with RECONCILED Phase 65 label. Required 4th file in atomic commit."
  - "Atomic commit covers 4 files (not 3 as planned): the V-62-SIDECAR reconciliation is structurally identical to V-64-05 and is required for all validators to exit 0. The indivisibility contract is preserved — all changes land in one commit."
metrics:
  duration: "12 minutes"
  completed: "2026-05-22"
  tasks_completed: 1
  tasks_total: 1
  files_changed: 4
---

# Phase 65 Plan 04: Atomic Trio — C16 Triangle Live Summary

**One-liner:** Atomic commit closes the C16 4-edge cross-link triangle — `12-` back-link appended, 4 sunset-65 allowlist exemptions removed, V-64-05 + V-62-SIDECAR flipped NEGATIVE→POSITIVE; all validators exit 0 with zero exemptions.

## Atomic Commit

**SHA:** `8721a63`
**Commit message:** `feat(65-04): C16 atomic-trio reconciliation — 12- back-link + allowlist clean + V-64-05 flip [C16 triangle live]`

**Files in commit (git log -1 --stat):**
| File | Change |
|------|--------|
| `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` | +2 lines (new back-link bullet + version history row) |
| `scripts/validation/check-phase-62.mjs` | V-62-SIDECAR reconciled: expected-4 → expected-0 |
| `scripts/validation/check-phase-64.mjs` | V-64-05 reconciled: NEGATIVE → POSITIVE |
| `scripts/validation/v1.6-audit-allowlist.json` | 4 sunset-65 entries removed → empty array |

## Sub-Actions Executed

### Sub-Action 1 — `12-` back-link bullet append

**File:** `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`

Appended a new 4th bullet inside the existing `## Cross-References` H2 (after the 3rd bullet ending at line 194, before the blank line + `## Version History`):

```
- **L1 runbook:** [L1 #34 — Apple Business Shared iPad Passcode Reset](../../l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md) (Path A L1-delegated entry point)
```

Also appended a version history row:
```
| 2026-05-22 | Phase 65 plan 65-04: added L1 #34 back-link to `## Cross-References` tail per D-04a + C16 atomic-reconciliation contract (62-08-PLAN §464-465); removed admin_12 C16 exemption from allowlist | -- |
```

**PITFALL-6 verification:** ABAUDIT-06 confirmed at line 13, ABAUDIT-07 confirmed at line 116 — both unaffected by the append (which occurs after line 194). Zero anchor slug shifts.

**Acceptance criteria:**
- File contains `34-apple-business` (substring load-bearing for C16 `admin_12 → l1_34` edge) — CONFIRMED
- File contains `../../l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (correct relative path) — CONFIRMED
- `## Cross-References` block now has 4 bullets — CONFIRMED
- `## Version History` table has new row dated `2026-05-22` — CONFIRMED

### Sub-Action 2 — Allowlist 4 sunset-65 entries removed

**File:** `scripts/validation/v1.6-audit-allowlist.json`

Removed ALL 4 entries from `c16_missing_endpoint_exemptions`:

| Removed entry | sunset_phase |
|---------------|-------------|
| `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` | `"65"` |
| `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` | `"64-65"` |
| `docs/common-issues.md#apple-business-governance-failure-scenarios` | `"65"` |
| `docs/quick-ref-l1.md#apple-business-quick-reference` | `"65"` |

Target state: `"c16_missing_endpoint_exemptions": []` (empty array, length 0).

**Verification:** `node -e "..."` prints `0` — CONFIRMED. JSON parses without error — CONFIRMED.

### Sub-Action 3 — V-64-05 NEGATIVE→POSITIVE flip

**File:** `scripts/validation/check-phase-64.mjs` (lines 135-145)

Replaced the NEGATIVE assertion (`12-` must NOT contain `34-apple-business`) with POSITIVE (`12-` MUST contain `34-apple-business`). Test ID `V-64-05` preserved with `[RECONCILED Phase 65]` label.

Old failure-detail string `12- contains 34-apple-business reference (C16 sunset Phase 65; must not appear in Phase 64)` is absent from the file — confirmed by V-65-14 PASS.

## Deviation: V-62-SIDECAR Reconciliation (Rule 1 — Bug Auto-Fix)

**Found during:** Pre-commit gate execution

**Issue:** `check-phase-62.mjs` `V-62-SIDECAR` asserted `c16_missing_endpoint_exemptions.length === 4`. After sub-action 2 emptied the array to 0, V-62-SIDECAR failed, cascading CHAIN-62 and CHAIN-63 failures into `check-phase-64.mjs` (exit 1) and `check-phase-65.mjs`. The three planned files alone could not satisfy the "all validators exit 0" gate.

**Fix:** Reconciled V-62-SIDECAR in `check-phase-62.mjs` identically to V-64-05:
- Changed name to `V-62-SIDECAR [RECONCILED Phase 65]: ... c16_missing_endpoint_exemptions has 0 entries ...`
- Changed the length assertion from `!== 4` (fail when not 4) to `!== 0` (fail when not empty)
- Added inline RECONCILED comment explaining the Phase 65 atomic commit context

**Impact:** Added `check-phase-62.mjs` as a 4th file to the atomic commit. The indivisibility contract is preserved — all changes land in one commit. The 3-file specification was written assuming V-62-SIDECAR would not need updating; the emptying of the allowlist necessarily obsoletes a Phase-62-close assertion, requiring an analogous reconciliation.

**Files modified:** `scripts/validation/check-phase-62.mjs`

## Pre-Commit Validator Gate Results

All three validators ran BEFORE `git commit` and all exited 0:

### 1. `node scripts/validation/check-phase-64.mjs`

```
Result: 24 PASS, 0 FAIL, 5 SKIPPED
```

- V-64-05 [RECONCILED Phase 65] PASS
- CHAIN-62 PASS (after V-62-SIDECAR reconciliation)
- CHAIN-63 PASS (cascaded from CHAIN-62 fix)
- V-64-AUDIT PASS

### 2. `node scripts/validation/check-phase-65.mjs`

```
Result: 28 PASS, 0 FAIL, 5 SKIPPED
```

- V-65-12 PASS — `12-` contains `34-apple-business` back-link
- V-65-13 PASS — `c16_missing_endpoint_exemptions` length is 0
- V-65-14 PASS — old V-64-05 NEGATIVE failure-detail string absent
- CHAIN-62, CHAIN-63, CHAIN-64 all PASS
- V-65-AUDIT PASS

### 3. `node scripts/validation/v1.6-milestone-audit.mjs`

```
Summary: 15 passed, 0 failed, 0 skipped
C16: 4-edge cross-link integrity triangle (L1 #34 ↔ admin doc ↔ common-issues ↔ quick-ref-l1) PASS
```

C16 reports all 4 edges PASS via real substring presence, 0 EXEMPTED entries.

## C16 Triangle Status — LIVE

| Edge | From | To | Verified via |
|------|------|------|------|
| l1_34 → admin_12 | L1 #34 | 12-shared-ipad-passcode-reset.md | `12-shared-ipad-passcode-reset` substring in L1 #34 |
| admin_12 → l1_34 | 12-shared-ipad-passcode-reset.md | L1 #34 | `34-apple-business` substring in 12- (sub-action 1) |
| common_issues → quick_ref_l1 | common-issues.md | quick-ref-l1.md | `#apple-business-quick-reference` substring (Wave 3) |
| quick_ref_l1 → l1_34 | quick-ref-l1.md | L1 #34 | `34-apple-business` substring (Wave 3) |

All 4 edges verified via real file content. Zero allowlist masking. Phase 62-08 sunset contract closed.

## V-64-05 Transition Trace

| Phase | Assertion State | File State | Validator Result |
|-------|----------------|------------|-----------------|
| Phase 64 close | NEGATIVE (12- must NOT contain `34-apple-business`) | `34-apple-business` absent from 12- | PASS (correct negative) |
| Pre-commit (after sub-actions 1+2+3) | POSITIVE (12- MUST contain `34-apple-business`) | `34-apple-business` present in 12- | PASS (correct positive) |
| Post-commit | POSITIVE (unchanged) | `34-apple-business` present (unchanged) | PASS — stable |

The flip happened atomically with the back-link arrival. There was no intermediate state where the assertion and file content were misaligned.

## Self-Check

- `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` — contains `34-apple-business`: CONFIRMED
- `scripts/validation/v1.6-audit-allowlist.json` — `c16_missing_endpoint_exemptions` length 0: CONFIRMED
- `scripts/validation/check-phase-64.mjs` — contains `V-64-05 [RECONCILED Phase 65]`: CONFIRMED
- `scripts/validation/check-phase-62.mjs` — contains `V-62-SIDECAR [RECONCILED Phase 65]`: CONFIRMED
- Commit `8721a63` exists: CONFIRMED
- All three validator gates exit 0: CONFIRMED

## Self-Check: PASSED
