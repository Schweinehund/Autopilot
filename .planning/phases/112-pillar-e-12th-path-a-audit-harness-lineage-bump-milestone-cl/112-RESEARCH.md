# Phase 112: Pillar E — 12th Path-A Audit-Harness Lineage Bump + Milestone Close - Research

**Researched:** 2026-07-02
**Domain:** Audit-harness lineage bump, chain-validator authoring, milestone close mechanics
**Confidence:** HIGH (all 8 verification targets confirmed against live repo)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-00 (CHAIN-GREEN PRECONDITION):** Add NESTED guard to the AUDIT-HARNESS step of `check-phase-95.mjs` and `check-phase-100.mjs` (mirroring the guard already on their CHAIN step). Must be done BEFORE authoring Atoms 1-2. Chain is currently RED at HEAD: `v1.13-milestone-audit.mjs` fails C2/C5/C7/C9/C10 against live corpus.

**D-00a (Byte-unchanged surface):** `v1.4–v1.13-milestone-audit.mjs` + their `*-audit-allowlist.json` sidecars + the `audit-harness-*-integrity.yml` workflows are frozen. `check-phase-NN.mjs` validators are NOT frozen (Phase 111 `4a2d0b6` already edited check-phase-95 and check-phase-100).

**D-00-RESOLUTION (NESTED-guard, user decision 2026-07-02):** Implement NESTED guard on the AUDIT-HARNESS step of check-phase-95 and check-phase-100. This greens the apex chain for both Class-1 and Class-2 failures without touching any frozen surface.

**D-01a (MANDATORY — both prior agents missed):** v1.14-milestone-audit.mjs MUST bump the C5/C10 freshness threshold from 60d to 90d. Without this, the new harness fails on its own corpus.

**D-01 (GA1 LOCKED):** Derive needles INLINE in each check-phase-NN.mjs (no NEEDLE-SPEC.md for 101-111). Land-not-preexisting discipline: needle only strings that LANDED in each phase.

**D-02 (GA2):** DEFERRED-CLEANUP: drop WR-01/IN-01/FIX-01/MIGF-01/MIGF-02 (resolved). Carry WINDOWS-CLONE-DEEPNEST-TIMEOUT-01/MTPSSO/KRBFUT/CI-3/AOSP/CloudPKI verbatim. Freshness (C5/C10) is NOT a DEFERRED-CLEANUP item. Add O(n²) remediation deferral + stale frozen-at-close.mjs:5-9 header.

**D-03 (GA3):** CHAIN_PHASES=[48..111] (64 entries); CHAIN_SKIP=new Set([]) — never add entries.

**D-04 (GA4):** v1.14-audit-allowlist.json repoints glossary-android.md (+1 all pins) and android-capability-matrix.md (+1 for pins ≥54). index.md/quick-ref-l1.md/common-issues.md have zero line-pins — no repoint needed there.

### Claude's Discretion (resolve at research/plan time)
- Exact stable-token strings for each check-phase-101..111 needle
- BASELINE_18 value and insertion location
- The frozen-workflow-vs-path-filter tension — planner must resolve explicitly (see Target 6)
- DEFERRED-CLEANUP and MILESTONE-AUDIT prose structure (mirror v1.13)

### Deferred Ideas (OUT OF SCOPE)
- O(n²) chain-runner subprocess-caching remediation (route to DEFERRED-CLEANUP)
- Multi-tenant PSSO, KRBFUT, CI-3, AOSP-wired 802.1X, Cloud PKI deep-dive (carry to future)
- Corpus freshness re-stamp to 60d (REJECTED)
- Stale `frozen-at-close.mjs:5-9` header cleanup (route to DEFERRED-CLEANUP, not Phase 112 scope)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | 12th Path-A lineage bump (Atom 1, indivisible) — `v1.14-milestone-audit.mjs` + `v1.14-audit-allowlist.json` + BASELINE_18 | Targets 2, 4, 5 below give exact values and offsets |
| HARN-02 | Per-phase validators + frozen pin + CI (Atom 2, indivisible) — `check-phase-101..112.mjs` + V113 pin + CI workflow | Targets 1, 3, 5, 8 below give exact implementation mechanics |
| HARN-03 | 3-axis terminal re-audit + MILESTONE-AUDIT.md + DEFERRED-CLEANUP.md + 4-doc traceability closure | Target 7 gives exact 3-axis format and EXACT-MATCH accounting |
</phase_requirements>

---

## Summary

Phase 112 is the sole-deliverable close phase for v1.14. It delivers two indivisible atoms (Atom 1 = the new harness + sidecar + BASELINE; Atom 2 = 12 per-phase validators + V-pin + CI workflow), a 3-axis terminal re-audit, and the close-gate document set. The adversarial review that produced the CONTEXT already resolved all gray areas; this research verifies the exact line numbers, values, and patterns the planner needs to specify precise tasks.

The single most important finding confirmed: the chain is RED at HEAD because check-phase-95 and check-phase-100 each run their frozen milestone audit (via AUDIT-HARNESS step) without a NESTED guard, against evolved live corpus. The NESTED guard fix must precede Atom authoring. All line numbers and values below are confirmed against the live repo.

**Primary recommendation:** Implement the NESTED guard (Target 1), then Atom 1 (Target 2, 4, 5), then Atom 2 (Target 3, 5, 8), then 3-axis re-audit (Target 7). Resolve the frozen-workflow CI tension as documented-RED (Target 6). Single close-gate commit; no Commit A.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| NESTED-guard edit (chain precondition) | `check-phase-95/100.mjs` validators | — | Validators are living code; D-00a confirmed Phase 111 already edited them |
| v1.14-milestone-audit.mjs (Atom 1) | New harness script (copy of v1.13) | v1.14-audit-allowlist.json sidecar | Path-A copy: 4-line relabel + C5/C10 threshold bump |
| v1.14-audit-allowlist.json (Atom 1) | New sidecar JSON | — | Repoint _glossary-android.md pins +1; android-capability-matrix.md pins +1 for ≥54 |
| BASELINE_18 (Atom 1) | `regenerate-supervision-pins.mjs` comment block | — | Append after BASELINE_17 at line 466 |
| check-phase-101..112.mjs (Atom 2) | Per-phase validators | chain apex check-phase-112 | Inline needles from each phase's CONTEXT + committed edits |
| `_lib/frozen-at-close.mjs` V113 pin (Atom 2) | Frozen-SHA registry | — | Append V113='ba24f1a' after V112 |
| audit-harness-v1.14-integrity.yml (Atom 2) | CI workflow | — | 11th coexistence file; Path-A from v1.13 with v1.14 scoping |
| 3-axis re-audit (close artifact) | Fresh clone + Linux GHA + sub-agent | — | EXACT MATCH across 12-leaf set (v1.14-audit + check-phase-101..111) |

---

## TARGET 1: NESTED-Guard Implementation (D-00-RESOLUTION)

**Status of check-phase-95 and check-phase-100 validators:** NOT byte-frozen. Phase 111 commit `4a2d0b6` (2026-07-01) already edited BOTH files — confirmed by `git show 4a2d0b6 --stat`. Editing these validators is in-class chain maintenance (D-00a).

### CHAIN step NESTED pattern (template to replicate)

**check-phase-100.mjs, line 84:**
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
```

**check-phase-100.mjs, lines 91-93 (CHAIN step guard — verbatim):**
```javascript
if (NESTED) {
  return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
}
```

Same pattern in check-phase-95.mjs: NESTED variable at line 72; CHAIN guard at lines 79-81.

### AUDIT-HARNESS step — current state (no NESTED guard)

**check-phase-100.mjs, lines 121-141 (the step to fix):**
```javascript
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-100-AUDIT-HARNESS: v1.13-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      ...
```

**There is NO `if (NESTED)` check before the `existsSync` / `execFileSync` call.** Confirmed identical absence in check-phase-95.mjs lines 109-129.

### Minimal guard edit for AUDIT-HARNESS step

Insert immediately after the `existsSync` graceful-skip block (after line 127 in check-phase-100, after the equivalent line in check-phase-95):

```javascript
if (NESTED) {
  return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
}
```

This means the AUDIT-HARNESS step is reached ONLY in standalone invocation (not when called from the v1.14 apex). Standalone behavior is preserved: when run directly, check-phase-95/100 still validate their own milestone's close-SHA corpus.

**Env var:** `CHECK_PHASE_NESTED` (string `'1'`). Set by the CHAIN step's `subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' }` at line 100.

**Residual risk:** LOW. The guard is a 3-line additive change mirroring the already-working CHAIN-step guard. Both classes of failure (Class 1 line-pin drift; Class 2 freshness) are cured simultaneously because both are in the AUDIT-HARNESS path.

---

## TARGET 2: C5/C10 Freshness Threshold (D-01a)

**v1.13-milestone-audit.mjs confirmed lines:**

- **C5 block, line 406:** `if (diffDays > 60) {` (Android cadence check)
- **C5 template-sentinel exemption, line 401:** `if (lvMatch[1] === '1970-01-01') continue;  // D-24 TEMPLATE-SENTINEL -- skip`
- **C10 block, line 542:** `if (diffDays > 60) {` (Linux cadence check)
- **C10 template-sentinel exemption, line 537:** `if (lvMatch[1] === '1970-01-01') continue;  // TEMPLATE-SENTINEL -- skip`

**C5 and C10 are SEPARATE code blocks.** C5 is `id: 5` (starts ~line 380), C10 is `id: 10` (starts ~line 515). Each has its own `diffDays > 60` check that must be bumped independently.

**v1.14 action:** In the NEW `v1.14-milestone-audit.mjs` (this is a new file — edits are free), change both `diffDays > 60` to `diffDays > 90`. Preserve the `1970-01-01` template-sentinel lines unchanged.

**Why:** v1.14 corpus has `last_verified: 2026-06-29 / review_by: 2026-09-27` (90 days). The 60d rule was Phase 34 D-14; it is superseded by v1.14 discuss-flag #7 decision. Without this bump, v1.14's OWN harness fails its OWN corpus (C5 and C10 both fail).

**Comment update:** The C5 block header comment in v1.13 says `// Phase 34 D-14 Android cadence`. In v1.14's copy, update this to reference discuss-flag #7 / v1.14 90-day cadence.

---

## TARGET 3: CHAIN_PHASES + V-SELF Self-Assert

**check-phase-100.mjs confirmed values:**

- **Lines 51-53:** `CHAIN_PHASES = [48,49,50,...,99]` — 52 entries ([48..99] inclusive)
- **Lines 154-156:** V-100-SELF check: `if (CHAIN_SKIP.size !== 0) { return { pass: false, detail: 'CHAIN_SKIP non-empty...' }; }`
- **Line 57:** `const CHAIN_SKIP = new Set([]);`

**v1.14 apex check-phase-112:**
- `CHAIN_PHASES = [48,49,50,...,111]` — **64 entries** (111 − 48 + 1 = 64; [48..N-1] invariant where N=112)
- `CHAIN_SKIP = new Set([])` — empty, NEVER add entries
- V-SELF checks: `CHAIN_PHASES.includes(112)` must return false; `CHAIN_SKIP.size !== 0` must return false

**[48..N-1] invariant lineage (confirmed from v1.13-MILESTONE-AUDIT.md):**
| Apex | N | Range | Entries |
|------|---|-------|---------|
| check-phase-95 | 95 | [48..94] | 47 |
| check-phase-100 | 100 | [48..99] | 52 |
| check-phase-112 | 112 | [48..111] | **64** |

**HARNESS pointer for check-phase-112:** `const HARNESS = 'scripts/validation/v1.14-milestone-audit.mjs';`

---

## TARGET 4: Allowlist Repoint Scope (D-04)

### Files with ZERO line-pins (no repoint needed)
- `docs/index.md` — 0 line-pins in any sidecar section [VERIFIED]
- `docs/quick-ref-l1.md` — 0 line-pins [VERIFIED]
- `docs/common-issues.md` — 0 line-pins [VERIFIED]

### `docs/_glossary-android.md` — Phase 101 (`eae49f7`) added banner at line 14 → +1 to ALL pins

The banner `> **802.1X / Network authentication:** ...` was inserted at line 14 (before the alphabetical index at original line 17). Every pin in `_glossary-android.md` falls at or after line 17, so ALL shift by exactly +1.

**safetynet_exemptions:** 186→187, 201→202

**supervision_exemptions:** 17→18, 50→51, 70→71, 80→81, 82→83, 83→84, 182→183, 196→197, 199→200

**c7_knox_allowlist:** 122→123, 124→125 (×2 entries at same line), 126→127, 198→199

**c9_exemptions** (for `_glossary-android.md`): 203→204

### `docs/reference/android-capability-matrix.md` — Phase 109 (`6306da8`) added Network-Auth row before original line 54 → +1 to all pins ≥54

**c9_exemptions:** line 54 → **55** (AMAPI migration footnote; confirmed — current file line 55 has AMAPI content)

**supervision_exemptions** (all were ≥88, so all shift +1):
| v1.13 pin | v1.14 pin | Content at new location |
|-----------|-----------|------------------------|
| 88 | **89** | `<!-- AEAUDIT-04: "supervision" in this section...` |
| 90 | **91** | `"Dedicated" / "ZTE" — never "supervised"...` |
| 91 | **92** | `platform in the column header...` |
| 93 | **94** | `This section maps three Apple↔Android...` |
| 97 | **98** | `| **iOS Supervision (ADE-enrolled)** |...` |
| 98 | **99** | `| iOS Supervision is a permanent per-device state...` |

All confirmed against current live file (lines 87-99 verified).

### Non-uniform offset note
The two files have DIFFERENT shifts: `_glossary-android.md` is uniform +1 throughout (banner insertion at line 14 above all pins). `android-capability-matrix.md` is +1 for all pins ≥54 (which covers all supervision_exemptions and the c9_exemption). No pins exist before line 54 in the capability matrix sidecar, so effectively all pins in that file shift by +1.

### c13_broken_link_allowlist and c13_rotting_external
Neither `_glossary-android.md` nor `android-capability-matrix.md` have any line-pin entries in `c13_broken_link_allowlist`. The `ci_3_managed_apple_id` entries for these files use `count` (not line-pin) tracking, so no repoint needed. `c11_ops_exemptions` is empty. `c16_missing_endpoint_exemptions` is empty.

---

## TARGET 5: Frozen-at-Close V-pin + BASELINE_18

### `_lib/frozen-at-close.mjs` — current state
File currently tops out at (lines 37-40):
```javascript
V112: '12f2c7b',  // Phase 95 Plan 95-04 close-gate — v1.12 milestone close-gate...
```
There is NO V113 entry. The convenience export `readAtV112Close` is at line 75 (last export in the file).

**Append to `MILESTONE_CLOSE_SHAS`:**
```javascript
V113: 'ba24f1a',  // Phase 100 Plan 100-04 close-gate — v1.13 milestone close-gate (docs(100-04);
                   // 4-doc traceability + v1.13 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                   // Single entry (v1.13 closed in ONE commit; atom == close-gate;
                   // no separate V113_CLOSEGATE — V18/V19/V110/V111/V112 single-entry pattern applies).
```

**Also add convenience export** below the existing `readAtV112Close` line:
```javascript
export const readAtV113Close      = (p) => readAtClose('V113',         p);
```

**Stale header note (D-02 ADD-NEW deferred):** Lines 5-9 of `frozen-at-close.mjs` say "EXISTING inline helpers in check-phase-{61, 67, 68, 70}.mjs REMAIN INLINE." This is now factually false (Phase 111 TOOL-02 refactored them). The header is documentation-drift. Do NOT fix it in Phase 112 — route to DEFERRED-CLEANUP per D-02.

### BASELINE_18 in `regenerate-supervision-pins.mjs`

**BASELINE_17 ends at line 466.** The BASELINE_17 block is:
```
// BASELINE_17 refreshed 2026-06-29 (Phase 100 Plan 100-01): closes BASELINE_16 v1.12 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 100 SC#1); v1.13 line positions
// verified against HEAD ea24467 (Phase 100 Wave-1 commit — Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 100 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 100
// close and remain valid for the v1.13 corpus. Resolution path: BASELINE_18 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.12 -> BASELINE_16 -> v1.13 -> BASELINE_17).
```

**BASELINE_18 template (insert after line 466, immediately before `const BASELINE_9 = [`).** Note: The `[ATOM_1_SHA]` placeholder is filled at execution time (the SHA of the Atom 1 commit that locks the v1.14 harness constants — specifically the commit that lands `v1.14-milestone-audit.mjs`).

```
// BASELINE_18 refreshed 2026-07-02 (Phase 112 Plan 112-01): closes BASELINE_17 v1.13 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 112 SC#1); v1.14 line positions
// verified against HEAD [ATOM_1_SHA] (Phase 112 Wave-1 commit -- Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 112 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 112
// close and remain valid for the v1.14 corpus. Resolution path: BASELINE_19 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.13 -> BASELINE_17 -> v1.14 -> BASELINE_18).
```

---

## TARGET 6: CI Workflow + Frozen-Workflow-vs-Path-Filter Tension

> **PLANNER DECISION REQUIRED** — This is the one genuinely open question. The planner must make it explicit in the plan.

### What the v1.13 CI workflow's path-filter covers (confirmed, lines 16-22):
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.13-*'
      - 'scripts/validation/check-phase-*.mjs'   # <-- THIS is the trigger
      - '.github/workflows/audit-harness-v1.13-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.13-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.13-DEFERRED-CLEANUP.md'
```

**Adding `check-phase-101.mjs` through `check-phase-112.mjs` (Phase 112 Atom 2) WILL trigger both the v1.12 and v1.13 CI integrity workflows** because the glob `check-phase-*.mjs` matches all check-phase validators regardless of version number.

### What happens when triggered

When v1.12 or v1.13 workflows are triggered by the PR containing new check-phase files:

1. `parse` — parses the v1.13 sidecar JSON → PASS (sidecar is unchanged)
2. `path-match` — checks harness references sidecar → PASS
3. **`harness-run` — runs `v1.13-milestone-audit.mjs` directly against live corpus → FAIL** (C5/C10 freshness 90d > 60d threshold; C2/C7/C9 line-pin drift from Phase 101/109)
4. `linux-chain-ubuntu-latest` — runs `check-phase-100.mjs` with NESTED-guard → PASS (after D-00-RESOLUTION)
5. `check-phase-96..100` — standalone leaf validators → PASS

The `harness-run` job depends on `path-match`, and `linux-chain-ubuntu-latest` depends on `harness-run`. So when `harness-run` FAILS, the downstream chain job is also skipped/failed.

**This RED is NOT new.** The weekly scheduled cron has been RED since Phase 101 (`eae49f7`) committed the 90d freshness stamps. The scheduled cron runs the full v1.13 workflow unconditionally each Monday — it has been failing C5/C10 for every run since Phase 101. Phase 112 does not create a new failure mode; it just causes PR-triggered runs to also produce this RED (because the path-filter now matches the new check-phase files).

### Options analysis

| Option | Description | Verdict |
|--------|-------------|---------|
| **(a) Edit v1.12/v1.13 path-filters** to exclude `check-phase-1??-*.mjs` | D-00a explicitly rules this out: "workflows ARE frozen." The 29 predecessor frozen surfaces include all `audit-harness-*-integrity.yml` workflows. Editing them violates the byte-unchanged-predecessor invariant. | **RULED OUT** |
| **(b) v1.14-side exclusion** (scope new v1.14 workflow only, don't add check-phase files) | Impossible — check-phase-101..112.mjs MUST exist for Atom 2. Cannot avoid triggering the old path-filter. | **NOT VIABLE** |
| **(c) Document standalone-RED as accepted/known condition** | Architecturally correct: the frozen audits validate their own close-SHA corpus, not future evolved corpus. The chain correctness is guaranteed by the NESTED-guard (not by the predecessor standalone CI). The RED is pre-existing from Phase 101 scheduled runs. | **RECOMMENDED** |

### PLANNER DECISION: Option (c) — Document standalone-RED as accepted

**Recommended rationale to include in PLAN:**

> The `audit-harness-v1.12-integrity.yml` and `audit-harness-v1.13-integrity.yml` workflows will trigger on the PR containing check-phase-101..112.mjs (path-filter `check-phase-*.mjs`). Their `harness-run` job will FAIL because those harnesses pin 60-day freshness invariants against a corpus that now has 90-day review_by stamps. Editing those workflows is barred by the byte-unchanged-predecessor invariant (D-00a). This RED is architecturally expected: a frozen milestone audit validates its own close-SHA corpus, not future evolved corpus. The NESTED-guard ensures correctness of the v1.14 chain; the predecessor CI failures are a documentation-drift artifact, not a correctness regression. Document in v1.14-MILESTONE-AUDIT.md and v1.14-DEFERRED-CLEANUP.md. CI is authoritative via the NEW `audit-harness-v1.14-integrity.yml` workflow.

**Impact:** PRs will show "some checks failed" from v1.12/v1.13 workflows. This can be addressed in a future milestone (v1.15+) if the community wants to suppress it — e.g., by scoping the path-filters in those workflows when they are eventually retired. For now, it is a known, documented condition.

---

## TARGET 7: 3-Axis Terminal Re-Audit Procedure

Format derived from `v1.13-MILESTONE-AUDIT.md` (direct precedent).

### Axis 1 — Fresh git clone (Windows)

```powershell
$rand = -join ((0..9) + ('a'..'z') | Get-Random -Count 8)
git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.14-audit-$rand
cd $env:TEMP\v1.14-audit-$rand
# CRITICAL: cd INTO the clone — harness uses process.cwd() not __dirname
node scripts/validation/v1.14-milestone-audit.mjs --verbose
node scripts/validation/v1.14-milestone-audit.mjs --self-test
node scripts/validation/check-phase-101.mjs
node scripts/validation/check-phase-102.mjs
# ... through check-phase-111.mjs (11 leaf validators)
# Do NOT run chain validators on Windows (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at [48..111])
Remove-Item -Recurse -Force $env:TEMP\v1.14-audit-$rand
```

**cwd trap (from referee's false-negative in adversarial review):** `v1.14-milestone-audit.mjs` (like v1.13) resolves all file paths via `join(process.cwd(), relPath)` (line 51 of v1.13 harness). Running the harness from the main-tree cwd while clone is in $env:TEMP reads the WRONG corpus. You MUST `cd` into the clone first.

**Clone HEAD must match source HEAD.** Assert this explicitly.

**Leaf validator set for Windows (Axis 1/3):**
- `v1.14-milestone-audit.mjs --verbose` + `--self-test`
- `check-phase-101.mjs` through `check-phase-111.mjs` (11 phase validators)
- Total: 12 leaf validators

**Chain validators:** `check-phase-95.mjs` and `check-phase-112.mjs` — NOT run on Windows; Linux-GHA sole-authoritative per D-03.

### Axis 2 — Cross-OS Linux GHA

```bash
gh workflow run audit-harness-v1.14-integrity.yml --ref master
# Verify Atom 2 is on origin/master before dispatch
# Check all jobs succeed:
#   parse, path-match, harness-run, linux-chain-ubuntu-latest,
#   check-phase-101 through check-phase-112, rotting-external-quarterly (skipped on dispatch)
```

The new `audit-harness-v1.14-integrity.yml` workflow runs:
- The 12 leaf validators as separate parallel jobs
- `linux-chain-ubuntu-latest` job runs `check-phase-112.mjs` (recursively spawns [48..111])
- Atom 2 MUST be on `origin/master` before dispatch (ordering gate per v1.13 precedent)

### Axis 3 — Fresh zero-context sub-agent

Per v1.13 precedent: the same fresh-clone sub-agent serves as Axis 3 (one dispatch covers physical + logical isolation). Not two separate agents.

### Cross-OS EXACT MATCH accounting format for v1.14-MILESTONE-AUDIT.md

14-row set: 12 leaf validators (Windows YES + Linux YES) + 2 chain validators (Windows N/A + Linux sole-authoritative).

| # | Validator | Type | Windows (Axis 1/3 fresh clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|------|--------------------------------|--------------------|---------|
| 1 | `v1.14-milestone-audit.mjs --verbose` + `--self-test` | leaf | X PASS / 0 FAIL / 0 SKIP (exit 0); self-test: Y passed (exit 0) | X PASS / 0 FAIL / 0 SKIP | EXACT MATCH |
| 2 | `check-phase-101.mjs` | leaf | N PASS / 0 FAIL / 0 SKIP | same | EXACT MATCH |
| ... | ... | leaf | ... | ... | ... |
| 12 | `check-phase-111.mjs` | leaf | N PASS / 0 FAIL / 0 SKIP | same | EXACT MATCH |
| 13 | `check-phase-95.mjs` (continuity [48..94]) | chain | Windows N/A — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 | X PASS / 0 FAIL / 0 SKIP | Linux sole-authoritative |
| 14 | `check-phase-112.mjs` (apex [48..111], 67 total checks) | chain | Windows N/A — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..111] | X PASS / 0 FAIL / Y SKIP | Linux sole-authoritative |

**WINDOWS-CLONE-DEEPNEST note:** At depth [48..111] (64 entries, 12 deeper than v1.13's [48..99]), the deep-nest timeout is worse than v1.13. OOM-vs-timeout flip risk is low (linear growth under `CHECK_PHASE_NESTED=1`) but unmeasured at new depth. Document as known Windows non-blocker; Linux GHA is authoritative for both chain validators.

---

## TARGET 8: check-phase-101..112 Needle Sources

### No NEEDLE-SPEC.md for phases 101-111

**Confirmed by Glob:** zero `*-NEEDLE-SPEC.md` files exist for phases 101-111. Needles derive inline per D-01 (GA1 LOCKED), following the `check-phase-96.mjs` precedent (lines 1-37: "NEEDLES DERIVED INLINE per D-01 — NO retroactive 96-NEEDLE-SPEC.md was authored").

### Confirmed landed strings for Phase 110 (check-phase-110 needles)

All three are in PRE-EXISTING files — needle only the POST-110 corrected phrases:

**`docs/index.md:110` (FIX-01):**
Current text (verified): `(9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below)`
Needle: `"9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below"` — use full phrase per D-01 FIX-01 count-needle rule (range-tolerant / full-phrase, NOT a bare integer, because 802.1X runbook ordering could affect integer interpretation)
Note: This is at line 110 in current file (not line 108 as cited in CONTEXT — read current file offset 104-111).

**`docs/quick-ref-l1.md:106` (WR-01):**
Current text (verified): `- Secure Enclave key error after password reset or FileVault recovery --> **Use [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first; escalate to L2 if re-registration fails`
Needle: `"Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first"` — discriminating (surfacing L1 #36 as a "use first" entry, not L2 escalation)

**`docs/common-issues.md:254` (IN-01):**
Current text (verified): `- **L1:** [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) — mandatory PSSO re-registration after password recovery (the reset invalidates the Secure Enclave key)`
Needle: `"mandatory PSSO re-registration after password recovery"` — discriminating (the mandatory intermediate step that was missing before IN-01)

**Land-not-preexisting check:** The phrases above are the POST-110 corrected text. Verify they do NOT appear in any pre-Phase-110 snapshot before needling.

### Phase 111 (check-phase-111) — CONSUMPTION assertion for execFailDetail

**`_lib/exec-fail-detail.mjs` exports (confirmed):** `execFailDetail(stdout, stderr, { n, trim, prefix })` function + `selfTest()` function.

**Phase 111 `4a2d0b6` consumed execFailDetail at 40 sites** across check-phase-60 through check-phase-100 (confirmed by commit message and stat output). The two variants:
- Variant A (CHAIN wrapper): `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-N FAIL: ' })`
- Variant C (harness): `execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' })`

**check-phase-111 MUST assert CONSUMPTION, not import presence.** An import-only needle is a false-green (a file that imports but never calls the function would pass). Correct needle strategy:
- Needle on a CALL-SITE pattern, e.g., the Variant A call string `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix:` in specific check-phase files
- Or: grep for `execFailDetail` in the context of a wrapper site (e.g., at the check-phase-100 CHAIN wrapper)

Suggested needle for check-phase-111: assert `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix:` exists in `scripts/validation/check-phase-100.mjs` (Variant A call site — present in the CHAIN wrapper; confirmed by reading the file).

**Self-referential caution (LOW risk):** If a future v1.15 tooling refactor renames `execFailDetail`, it would trip these needles. Keep tokens minimal/stable.

### Phase 101 needle candidates (802.1X foundation glossary)

Derive from `.planning/phases/101-*/101-CONTEXT.md`. Key landed strings:
- New `docs/_glossary-network.md` file existence (PRESENCE check)
- The see-also banner added to `docs/_glossary-android.md` (the line 14 text confirmed in current file: `> **802.1X / Network authentication:** For 802.1X protocol terminology`)
- New files: `docs/admin-setup-8021x/00-overview.md`, EAP method guide, cert delivery guide

---

## Common Pitfalls

### Pitfall 1: Authoring Atoms Before D-00 Is Green
**What goes wrong:** If check-phase-112 (apex) is authored before the NESTED-guard is added to check-phase-95/100, the apex will be RED on first run and the executor will need to re-run. More critically, if the CONTEXT was missed, the executor could spend time debugging why check-phase-100 fails nested.
**How to avoid:** D-00 guard edit is Wave 0 of the plan, verified GREEN before any Atom work begins. Run `node scripts/validation/check-phase-100.mjs --verbose` to confirm it passes after the guard addition.
**Warning signs:** Any FAIL on V-100-AUDIT-HARNESS or V-95-AUDIT-HARNESS.

### Pitfall 2: Running Harness from Wrong cwd
**What goes wrong:** Running `node scripts/validation/v1.14-milestone-audit.mjs` from the main repo while intending to audit a fresh clone — the harness reads `join(process.cwd(), relPath)`, so it reads the main repo, not the clone. This produces a false-negative on the clone. The adversarial-review referee made this exact error.
**How to avoid:** `cd` INTO the clone directory before any validator invocation. v1.14-MILESTONE-AUDIT.md must document the HEAD SHA and that the cwd was inside the clone.

### Pitfall 3: Allowlist Born Stale
**What goes wrong:** A naive `cp v1.13-audit-allowlist.json v1.14-audit-allowlist.json` fails C2/C7/C9 on the LIVE corpus because the Phase 101/109 line shifts are not applied.
**How to avoid:** Apply the exact offsets from Target 4 before committing Atom 1. Run `node scripts/validation/v1.14-milestone-audit.mjs --verbose` after authoring to verify C2/C7/C9 all PASS.

### Pitfall 4: Bare Integer Needle for FIX-01
**What goes wrong:** Needling `"9"` or `"(9 runbooks"` would false-green against any file containing that digit/phrase. The FIX-01 fix is specifically the full count + description string.
**How to avoid:** Use the full phrase: `"9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below"`.

### Pitfall 5: Import-Only Needle for execFailDetail (Phase 111)
**What goes wrong:** `import { execFailDetail }` passes on any file that has the import but never calls the function. The CONTEXT explicitly flags "an unused import is a false-green."
**How to avoid:** Needle on a call-site pattern, e.g., `execFailDetail(stdout, stderr, { n: 500` in a specific check-phase file.

### Pitfall 6: Including Phase 112 in CHAIN_PHASES
**What goes wrong:** `CHAIN_PHASES = [48..112]` triggers V-112-SELF self-reference FAIL. The [48..N-1] invariant means the apex excludes its own phase number.
**How to avoid:** `CHAIN_PHASES = [48..111]` (64 entries). V-SELF assertion catches this automatically.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| NESTED check | Custom environment flag | `process.env.CHECK_PHASE_NESTED === '1'` — exact pattern from check-phase-100.mjs:84 |
| Failure detail | Re-implement stdout+stderr capture | `execFailDetail` from `_lib/exec-fail-detail.mjs` (Phase 111 TOOL-01) |
| Frozen-SHA reads | Custom git invocation | `readAtClose(milestoneTag, relPath)` from `_lib/frozen-at-close.mjs` |
| Check-phase structure | Custom runner | Exact verbatim pattern from check-phase-96.mjs (checks array, runner loop, padLabel) |

---

## Code Examples

### NESTED guard — AUDIT-HARNESS step (add after existsSync check, before try block)

```javascript
// === V-112-AUDIT-HARNESS: v1.14-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-112-AUDIT-HARNESS: v1.14-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.14-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
    }
  }
});
```

### V-SELF for check-phase-112

```javascript
checks.push({
  id: 'SELF',
  name: 'V-112-SELF: CHAIN_PHASES does NOT include 112; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(112)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 112 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [48..111] (112 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

---

## Environment Availability

All required tools are already confirmed available in the project environment (node, git, gh). No external dependencies beyond the project itself.

| Dependency | Required By | Available | Notes |
|------------|------------|-----------|-------|
| Node.js | All validators | Yes | Used throughout project |
| git | frozen-at-close.mjs, 3-axis clone | Yes | Present |
| gh CLI | Axis-2 GHA dispatch | Yes | Used in v1.13 close; Schweinehund authenticated |

---

## Validation Architecture

All validators are self-contained node scripts. No framework needed.

| Phase | Run Command | Expected |
|-------|-------------|---------|
| After D-00 guard edit | `node scripts/validation/check-phase-100.mjs --verbose` | V-100-AUDIT-HARNESS: SKIPPED (nested) — confirms guard works |
| After Atom 1 | `node scripts/validation/v1.14-milestone-audit.mjs --verbose` | 15/0/0 PASS |
| After Atom 1 | `node scripts/validation/v1.14-milestone-audit.mjs --self-test` | self-test 9/9 |
| After Atom 2 | `node scripts/validation/check-phase-112.mjs --verbose` | all PASS (or SKIP on AUDIT until close) |
| Pre-close | `node scripts/validation/check-phase-112.mjs` | exit 0 |

---

## Open Questions

1. **Exact line numbers of check-phase-101..111 needles**
   - What we know: The files to target and the phase events (from CONTEXT files)
   - What's unclear: Exact stable discriminating strings for each of the 11 phases
   - Recommendation: Executor derives inline per D-01, reading each phase's CONTEXT.md + verifying the string exists in the live corpus at the correct file

2. **v1.14 CI workflow GHA run URL**
   - What we know: Must be dispatched after Atom 2 is on origin/master
   - What's unclear: The specific run ID (unknown until execution)
   - Recommendation: Plan includes a task to dispatch, record the run URL, and verify all jobs pass

3. **Close-gate SHA placeholder**
   - What we know: v1.14-MILESTONE-AUDIT.md will have a `{phase_112_close_SHA}` literal placeholder (per single-commit protocol)
   - Recommendation: Follow v1.13 precedent — recovery via `git log --all --grep="112-04" --grep="close-gate" --all-match -1 --format=%H`

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | BASELINE_18 appends directly before `const BASELINE_9 = [` | Target 5 | LOW — the structure is clear from reading the file; the comment always precedes the constant |
| A2 | V113='ba24f1a' is the correct close-gate SHA for v1.13 | Target 5 | LOW — confirmed by CONTEXT, STATE.md, and v1.13-MILESTONE-AUDIT.md frontmatter (commit 100-04) |
| A3 | All _glossary-android.md pins shift by exactly +1 (uniform) | Target 4 | LOW — Phase 101 banner insertion at line 14 is above all tracked pins; verified current file shows banner at line 14 |
| A4 | `docs/index.md` FIX-01 corrected count is at line 110 (not line 108 as CONTEXT cites) | Target 8 | LOW — verified by reading the live file; the CONTEXT's "108" was a pre-Phase-110 line number; current position is line 110 |

**All claims in this research were verified against the live repo or cited from official project documents. Zero unverified factual claims.**

---

## Sources

### Primary (HIGH confidence — verified against live files)
- `scripts/validation/check-phase-100.mjs` — CHAIN step NESTED guard at lines 84, 91-93; AUDIT-HARNESS absence confirmed at lines 121-141; CHAIN_PHASES array at lines 51-53; V-SELF at lines 154-156
- `scripts/validation/check-phase-95.mjs` — Same structure confirmed at lines 72, 79-81, 109-129
- `scripts/validation/v1.13-milestone-audit.mjs` — C5 threshold at line 406, sentinel at line 401; C10 threshold at line 542, sentinel at line 537; cwd pattern at line 51
- `scripts/validation/v1.13-audit-allowlist.json` — All pin values verified; confirmed zero pins for index/quick-ref/common-issues
- `scripts/validation/_lib/frozen-at-close.mjs` — V112 at lines 37-40; V113 absent confirmed; readAtV112Close at line 75
- `scripts/validation/_lib/exec-fail-detail.mjs` — API confirmed at lines 31-35
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_17 at lines 460-466; BASELINE_18 position confirmed
- `.github/workflows/audit-harness-v1.13-integrity.yml` — path-filter at lines 16-22 confirmed; harness-run at line 72
- `docs/_glossary-android.md` — 802.1X banner at line 14 confirmed; current file structure verified
- `docs/reference/android-capability-matrix.md` — AMAPI at line 55 confirmed; Cross-Platform Equivalences at lines 87-99 confirmed
- `docs/index.md` lines 104-111 — FIX-01 landed string confirmed at line 110
- `docs/quick-ref-l1.md` lines 102-108 — WR-01 landed string confirmed at line 106
- `docs/common-issues.md` lines 250-255 — IN-01 landed string confirmed at line 254
- `scripts/validation/check-phase-96.mjs` — inline-needle precedent confirmed at lines 1-37
- `.planning/milestones/v1.13-MILESTONE-AUDIT.md` — 3-axis format, EXACT MATCH table, chain-validator accounting

### Secondary (HIGH confidence — from project CONTEXT/REQUIREMENTS)
- `.planning/phases/112-*/112-CONTEXT.md` — All locked decisions and verification targets
- `.planning/REQUIREMENTS.md` — HARN-01/02/03 definitions; discuss-flag #7 (90d freshness)
- `.planning/STATE.md` lines 232-264 — Phase 112 dependency spec
- `git log` — commit `4a2d0b6` (TOOL-01) confirming check-phase-95/100 are living code

---

## Metadata

**Confidence breakdown:**
- NESTED guard mechanics: HIGH — read exact lines from live files
- C5/C10 threshold: HIGH — confirmed line numbers, both code blocks, sentinel exemptions
- CHAIN_PHASES arithmetic: HIGH — confirmed array, V-SELF logic, arithmetic verified
- Allowlist repoint: HIGH — confirmed all pin values, both file offsets, zero pins for index/quick-ref/common-issues
- V-pin / BASELINE: HIGH — confirmed current state of frozen-at-close.mjs, BASELINE_17 end line
- CI workflow tension: HIGH — confirmed path-filter triggers; analysis of options is sound
- 3-axis format: HIGH — precedent fully read from v1.13-MILESTONE-AUDIT.md
- Needle sources: HIGH for Phase 110 confirmed strings; MEDIUM for 101-109/111 (derive inline at execution)

**Research date:** 2026-07-02
**Valid until:** Stable — all values are from the current committed HEAD; no time-sensitive external sources
