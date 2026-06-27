---
phase: 95-harness-lineage-bump-terminal-re-audit-milestone-close
researched: 2026-06-26
domain: Audit harness lineage bump, per-phase validators, 3-axis terminal re-audit, v1.12 milestone close
confidence: HIGH
---

# Phase 95: Harness Lineage Bump + Terminal Re-Audit + Milestone Close — Research

**Researched:** 2026-06-26
**Domain:** Path-A harness lineage (10th milestone), per-phase validators, 3-axis re-audit, v1.12 close-gate
**Confidence:** HIGH — all anchors verified from source files this session

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** `check-phase-95.mjs` declares `CHAIN_PHASES=[48,49,…,94]` (47 entries), `CHAIN_SKIP = new Set([])`,
V-95-SELF dual-invariant guard. Corrects the ROADMAP/STATE `[48..93]` off-by-one.

**D-02:** `check-phase-94.mjs` carries `V-94-PRESENCE` + `V-94-SELF` PLUS a hard-asserted `V-94-CONTENT-*`
net using the `{id, file, needle}` FORM (CRLF-normalizing file read, forward-slash substring `includes()`,
no allowlist/sidecar, no line numbers). 5-needle set (file = `docs/macos-lifecycle/02-mdm-migration-psso.md`):
- `V-94-CONTENT-URLS-IRU`    needle: `support.iru.io`
- `V-94-CONTENT-URLS-KANDJI` needle: `support.kandji.io`
- `V-94-CONTENT-DOCS-IRU`    needle: `docs.iru.com`
- `V-94-CONTENT-MIGV03`      needle: `Supervision status (MEDIUM confidence)`
- `V-94-CONTENT-MIGV01`      needle: `learn.microsoft.com`

**D-03:** 3-axis terminal re-audit, corrected OS split. Cross-OS-applicable set = 4 rows:
- `v1.12-milestone-audit.mjs` (leaf) — Windows YES + Linux YES — cross-OS EXACT MATCH
- `check-phase-94.mjs` (leaf) — Windows YES + Linux YES — cross-OS EXACT MATCH
- `check-phase-93.mjs` (chain [48..92]) — Windows NO (cascades) + Linux YES — Linux sole-authoritative
- `check-phase-95.mjs` (chain [48..94]) — Windows NO (cascades) + Linux YES — Linux sole-authoritative

**D-04 / SD-1:** 4-plan / 5-commit skeleton (Plan 95-01 Conventions+Atom1 / 95-02 Atom2 / 95-03 re-audit
artifact / 95-04 close-gate). Sequential on main tree (`use_worktrees:false`).

**D-04 / SD-2:** ONE close-gate commit, NO Commit A, SINGLE `V111` entry in frozen-at-close.mjs.

**D-04 / SD-3:** DEFERRED-CLEANUP: DROP MIGV-01/02/03 (resolved); CARRY all open items (update
WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 depth to [48..94]); ADD `GLOSSARY-IRU-URL-FRESHNESS-01`.

**D-04 / SD-4:** Working-tree cruft + stray pre-close audit deletion deferred to `/gsd-complete-milestone`.

### Claude's Discretion (plan-phase author decides)

- `95-CONVENTIONS.md` content — freshness/SHA matrix + locked strings
- Exact `$rand` charset + temp-dir cleanup assertions in Axis-1 recipe (recommend `[0-9a-z]` 8-char)
- Final `V-94-CONTENT-*` needle strings (confirmed below — all 5 verified present)
- BASELINE_16 anchor SHA (recommend known-PAST SHA — the Wave-1 95-CONVENTIONS.md commit)
- Re-confirm V111 = `919b23b` on authoring day via `git log --grep="close-gate" --grep="v1.11" --all-match -1`
- Exact roadmap/STATE/REQUIREMENTS patch text for D-01 apex correction

### Deferred Ideas (OUT OF SCOPE)

- Any `docs/*` corpus edits — tooling-only phase
- `GLOSSARY-IRU-URL-FRESHNESS-01` fix (routes to DEFERRED-CLEANUP, not Phase 95)
- New global blocking C17 category
- A chicken-and-egg Commit A
- A second `V111_CLOSEGATE` frozen entry
- Worktree-based execution
- Working-tree cruft cleanup in close-gate

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | `v1.12-milestone-audit.mjs` + `v1.12-audit-allowlist.json` Path-A copies + BASELINE_16 freshness comment — Atom 1, 3 files indivisible | V1: Path-A source confirmed at `v1.11-milestone-audit.mjs` (979 lines, C1-C16, self-test 9/9); 4-line edit set confirmed from 93-CONVENTIONS §5; BASELINE_15 region confirmed at lines 446-452 of `regenerate-supervision-pins.mjs` |
| HARN-02 | `check-phase-94.mjs` + `check-phase-95.mjs` + `_lib/frozen-at-close.mjs` V111 entry + `audit-harness-v1.12-integrity.yml` — Atom 2, 4 files indivisible | V2: V111 SHA confirmed `919b23b`; frozen-at-close.mjs last entry V110='a3617e9' + readAtV110Close (line 66); check-phase-93.mjs (Path-A for 95) confirmed [48..92]; check-phase-84.mjs (PRESENCE+SELF base) confirmed; check-phase-92.mjs ({id,file,needle} FORM) confirmed; v1.11 CI YAML (Path-A) confirmed |
| HARN-03 | 3-axis terminal re-audit (Axis 1 fresh clone + Axis 2 Linux GHA + Axis 3 fresh sub-agent; cross-OS EXACT MATCH) + `v1.12-MILESTONE-AUDIT.md` + `v1.12-DEFERRED-CLEANUP.md` + 4-doc traceability closure (6/6 Validated) | V3: Axis recipe confirmed from 93-03-AUDIT-RESULTS.md; deep-nest firing evidence confirmed; all 5 D-02 needles verified present in target file |

</phase_requirements>

---

## Summary

Phase 95 is the terminal close-gate of v1.12 — the 10th Path-A milestone harness in the lineage v1.4→v1.12, direct twin of Phase 93 (v1.11). All decisions are adversarially-reviewed and user-approved (D-01..D-04). This research verifies the concrete anchors the planner needs — SHAs, file structures, line ranges, exact needle strings, validator shapes — without re-opening any locked decision.

**V111 SHA is CONFIRMED: `919b23b`** (`docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE`; single-commit close). The two commits that follow (`f7a7e6b` SUMMARY, `c0be124` state+roadmap SDK) are post-close chores, NOT part of the atom.

**All 5 D-02 content needles are VERIFIED PRESENT** in `docs/macos-lifecycle/02-mdm-migration-psso.md`. The ROADMAP SC#2/STATE `[48..93]` is the D-01-corrected off-by-one; the planner authors `[48..94]` and patches the docs at close-gate.

**Primary recommendation:** Author Plans 95-01 through 95-04 as exact Path-A from Plans 93-01..93-04, substituting v1.12 labels, {48..94} apex range, V111='919b23b', and the 4-row (not 7-row) cross-OS set. All constants herein are source-of-truth for the 95-CONVENTIONS.md Wave-1 commit.

---

## Verification Target 1: V111 SHA

**Verified:** `git log --grep="close-gate" --grep="v1.11" --all-match -1 --format="%h %s"` returned `919b23b docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE` [VERIFIED: git log]

Note: the double `--grep` with `--all-match` returns the SINGLE-COMMIT atom `919b23b`. The next two commits (`f7a7e6b` SUMMARY and `c0be124` state+roadmap) are confirmed post-close chores.

**`_lib/frozen-at-close.mjs` current last entry and shape** (lines 31-33 / 66):

```
// Line 31-33:
V110: 'a3617e9',  // Phase 88 Plan 88-04 — v1.10 milestone close-gate … Single entry (v1.10 closed in ONE commit; atom == close-gate; no separate V110_CLOSEGATE).

// Line 66:
export const readAtV110Close      = (p) => readAtClose('V110',         p);
```

**V111 entry + export that Atom 2 must add** (mirror the V110 shape exactly):

```javascript
// In MILESTONE_CLOSE_SHAS after V110:
V111: '919b23b',  // Phase 93 Plan 93-04 — v1.11 milestone close-gate (docs(93-04); 4-doc traceability
                  // + v1.11 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.11 closed in ONE
                  // commit; atom == close-gate; no separate V111_CLOSEGATE).

// Convenience export after readAtV110Close (line 66):
export const readAtV111Close      = (p) => readAtClose('V111',         p);
```

**Line range for V110 in frozen-at-close.mjs:** lines 31-33 (entry) and line 66 (export). V111 inserts immediately after — entry after line 33, export after line 66.

---

## Verification Target 2: Path-A Sources — Existence and Structure

### `scripts/validation/v1.11-milestone-audit.mjs` [VERIFIED: file read]
- **EXISTS**: 979 lines, C1-C16, self-test block (9/9)
- **4-line edit set for v1.11→v1.12 hop** (confirmed from 93-CONVENTIONS.md §5 — same invariant applies):
  | Line | Change from (v1.11) | Change to (v1.12) |
  |------|---------------------|-------------------|
  | 2 | `v1.11 … Path A copy of v1.10; lineage … → v1.10 → v1.11; C1-C16 inherited verbatim` | `v1.12 … Path A copy of v1.11; lineage … → v1.11 → v1.12; C1-C16 inherited verbatim` |
  | 4 | `v1.11-audit-allowlist.json (v1.11 Path-A from v1.10 … per Phase 93 close-state)` | `v1.12-audit-allowlist.json (v1.12 Path-A from v1.11 … per Phase 95 close-state)` |
  | 35 | `// Usage: node scripts/validation/v1.11-milestone-audit.mjs [--verbose] [--self-test]` | `…v1.12-milestone-audit.mjs…` |
  | 79 | `const raw = readFile('scripts/validation/v1.11-audit-allowlist.json');` | `…v1.12-audit-allowlist.json` (functional sidecar repoint — load-bearing) |
- **DO NOT** bump lines 5 (frozen-predecessor anchor) or 90 (Apple Business doc paths)
- **DO NOT** add C17 — `checks` array stays exactly 15 entries; line count stays 979

### `scripts/validation/v1.11-audit-allowlist.json` [VERIFIED: file read]
- **EXISTS**: path-A source for `v1.12-audit-allowlist.json`
- **Key fields for v1.12 copy:**
  - `schema_version`: `"1.1"` (carry)
  - `generated`: `"2026-06-26T00:00:00Z"` (authoring date — today)
  - `phase`: `"95-harness-lineage-bump-terminal-re-audit-milestone-close"` (long-slug form)
  - `c13_broken_link_allowlist` entry count: **15 EXACTLY** (6 transient_external + 9 template_placeholder — carry)
  - `c13_rotting_external`: carry verbatim (`ci_1`, `ci_2_vpp_location_token`, `ci_3`, `quarterly_audit`)
  - `quarterly_audit.next_review`: `"2027-01-01"` (carry)
  - `c16_missing_endpoint_exemptions`: `[]` (carry empty)

### `scripts/validation/check-phase-93.mjs` [VERIFIED: file read]
- **EXISTS** — Path-A source for `check-phase-95.mjs`
- **CHAIN_PHASES** (line 41): `[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92]` (45 entries)
- **CHAIN_SKIP** (line 44): `new Set([])`
- `HARNESS` (line 38): `'scripts/validation/v1.11-milestone-audit.mjs'`
- **CHECK_PHASE_NESTED=1** child-spawn (line 71): `const NESTED = process.env.CHECK_PHASE_NESTED === '1';`
- **V-93-SELF dual-invariant** (lines 131-144): asserts `!CHAIN_PHASES.includes(93) AND CHAIN_SKIP.size === 0`
- **V-93-AUDIT** (lines 48-64): uses `resolveArchivedPhasePath` for VERIFICATION.md presence (SKIP-PASS until close-gate lands)
- **V-93-AUDIT-HARNESS** (lines 108-128): runs v1.11-milestone-audit.mjs subprocess
- Is a **chain validator** (CONFIRMED): spawns children via CHECK_PHASE_NESTED — cascades on cold Windows

**For check-phase-95.mjs (D-01 changes):**
- `CHAIN_PHASES` → `[48,49,…,94]` (47 entries, adds 93 and 94 to the v1.12 apex)
- `HARNESS` → `'scripts/validation/v1.12-milestone-audit.mjs'`
- Phase number: 95 throughout (`V-95-*`, `CHAIN_PHASES.includes(95)`, etc.)
- `resolveArchivedPhasePath` call in V-95-AUDIT → target `'95-harness-lineage-bump-terminal-re-audit-milestone-close/95-VERIFICATION.md'` with `['v1.12-phases']` (not yet archived)

### `scripts/validation/check-phase-84.mjs` [VERIFIED: file read]
- **EXISTS** — lightweight PRESENCE+SELF base (2 checks)
- Structure: `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`, one DELIVERABLE const, PRESENCE check, SELF check
- check-phase-94 extends this base shape with 5 additional CONTENT checks (D-02)

### `scripts/validation/check-phase-92.mjs` [VERIFIED: file read]
- **EXISTS** — `{id, file, needle}` CONTENT-needle FORM (lines 46-55)
- Array named `NAV_EDGES`; loop at lines 63-74 pushes `CROSSLINK-${e.id}` checks
- `readFile()` CRLF-normalizes; `.includes(e.needle)` forward-slash substring; no allowlist
- FORM for `check-phase-94` V-94-CONTENT array: same `{id, file, needle}` structure

### `scripts/validation/check-phase-81.mjs` [VERIFIED: file read]
- **EXISTS** — identical `{id, file, needle}` FORM (array named `SSO_EDGES`, lines 45-54)
- Confirms the form is consistent across v1.9/v1.11 validators

### `.github/workflows/audit-harness-v1.11-integrity.yml` [VERIFIED: file read]
- **EXISTS** — Path-A source for `audit-harness-v1.12-integrity.yml` (9th coexistence)
- **Confirmed preserved properties** (lines 6-10):
  - `fetch-depth: 0` (FETCH-DEPTH-01 inheritance contract)
  - `core.autocrlf false` (LF-fidelity contract)
  - `continue-on-error: false` (D-A9 PR-blocking contract)
  - `timeout-minutes: 30`
  - `CHAIN_TIMING_LINUX ::notice` emission
- **Jobs for v1.12 YAML** (replace 89..93 with 94..95, update apex reference):
  - `parse` — validates `v1.12-audit-allowlist.json`
  - `path-match` — verifies harness references `v1.12-audit-allowlist.json`
  - `harness-run` — runs `v1.12-milestone-audit.mjs --verbose`
  - `linux-chain-ubuntu-latest` — runs `check-phase-95.mjs --verbose` (chain-apex [48..94])
  - `check-phase-94` — standalone validator job (leaf, cross-OS needed)
  - `check-phase-95` — standalone validator job
  - `rotting-external-quarterly` (cron-only, negative control — carry verbatim)
  - `pin-helper-advisory` (`continue-on-error: true` — carry verbatim)
- **8 existing YAMLs confirmed byte-unchanged predecessors** (ls output verified):
  1. `audit-harness-integrity.yml` (v1.4 base)
  2. `audit-harness-v1.5-integrity.yml`
  3. `audit-harness-v1.6-integrity.yml`
  4. `audit-harness-v1.7-integrity.yml`
  5. `audit-harness-v1.8-integrity.yml`
  6. `audit-harness-v1.9-integrity.yml`
  7. `audit-harness-v1.10-integrity.yml`
  8. `audit-harness-v1.11-integrity.yml`

---

## Verification Target 3: BASELINE_16 Region

**File:** `scripts/validation/regenerate-supervision-pins.mjs`
**BASELINE_15 region:** lines 446-452 [VERIFIED: file read]

```
// Line 446: BASELINE_15 refreshed 2026-06-25 (Phase 93 Plan 93-01): closes BASELINE_14 v1.10 carry-over
// Line 447: // per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 93 SC#1); v1.11 line positions
// Line 448: // verified against HEAD 34653cb (Phase 93 Wave-1 commit — 93-CONVENTIONS.md constants lock).
// Line 449: // BASELINE_9 entries above remain unchanged -- Phase 93 does NOT alter the line-coord array;
// Line 450: // this comment records the audit-trail event that line-positions were re-verified at Phase 93
// Line 451: // close and remain valid for the v1.11 corpus. Resolution path: BASELINE_16 will refresh at
// Line 452: // the next milestone close per the Path-A inheritance pattern (... -> v1.10 -> BASELINE_14 -> v1.11 -> BASELINE_15).
// Line 453: const BASELINE_9 = [
```

**BASELINE_16 comment lands at line 453** (immediately before `const BASELINE_9 = [`), appended after line 452 as a **comment-only insert** (the array is NOT touched).

**BASELINE_16 format** (mirror BASELINE_15 exactly, substituting Phase 95 / v1.12 / HEAD anchor):

```javascript
// BASELINE_16 refreshed 2026-06-26 (Phase 95 Plan 95-01): closes BASELINE_15 v1.11 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 95 SC#1); v1.12 line positions
// verified against HEAD {Wave-1-commit-SHA} (Phase 95 Wave-1 commit — 95-CONVENTIONS.md constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 95 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 95
// close and remain valid for the v1.12 corpus. Resolution path: BASELINE_17 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.11 -> BASELINE_15 -> v1.12 -> BASELINE_16).
```

**Anchor SHA rule:** `{Wave-1-commit-SHA}` = `git rev-parse --short HEAD` captured immediately AFTER COMMIT 1 (the 95-CONVENTIONS.md commit). This is a **known-PAST SHA** at Atom-1 commit time. Do NOT use the future Phase-95 close SHA. Do NOT leave a placeholder in the committed file.

**Last modified:** `84cf2d4` (`feat(93-01): v1.11 harness-core Path-A — HARN-01`, Plan 93-01 Atom 1). [VERIFIED: git log]

---

## Verification Target 4: check-phase-94 Content Needles

**Target file:** `docs/macos-lifecycle/02-mdm-migration-psso.md` [VERIFIED: grep]

| Needle ID | Needle String | grep -c count | 94-VERIFICATION.md confirmation | Status |
|-----------|---------------|---------------|--------------------------------|--------|
| `V-94-CONTENT-URLS-IRU` | `support.iru.io` | **5** | "grep -c 'support.iru.io' = 5" (line 30) | VERIFIED PRESENT |
| `V-94-CONTENT-URLS-KANDJI` | `support.kandji.io` | **6** | "grep -c 'support.kandji.io' = 6" (implicit in line 30) | VERIFIED PRESENT |
| `V-94-CONTENT-DOCS-IRU` | `docs.iru.com` | **6** | "grep -c 'docs.iru.com' = 6" (line 30) | VERIFIED PRESENT |
| `V-94-CONTENT-MIGV03` | `Supervision status (MEDIUM confidence)` | **1** | Line 329 confirmed (line 31) | VERIFIED PRESENT |
| `V-94-CONTENT-MIGV01` | `learn.microsoft.com` | **1** | "grep -c 'learn.microsoft.com' = 1" (line 28) | VERIFIED PRESENT |

**All 5 needles confirmed present verbatim.** No discrepancy found. No needle needs adjustment.

**Additional context for check-phase-94 PRESENCE check:**
- `DELIVERABLE` = `'docs/macos-lifecycle/02-mdm-migration-psso.md'` (pre-existing v1.11 file, patched by Phase 94)
- The file is 564 lines as of Phase 94 close [VERIFIED: 94-VERIFICATION.md line 42]
- V-94-PRESENCE asserts file exists and is non-empty (trivially passes — file predates Phase 94)
- V-94-SELF asserts `!CHAIN_PHASES.includes(94) AND CHAIN_SKIP.size === 0` (CHAIN_PHASES = [] for a leaf validator)

**Expected PASS count for check-phase-94:** 7 total checks (V-94-PRESENCE + V-94-SELF + 5 × V-94-CONTENT-*) → **7 PASS / 0 FAIL / 0 SKIP** on both platforms.

---

## Verification Target 5: 3-Axis Re-Audit Recipe

Source: `93-03-AUDIT-RESULTS.md` [VERIFIED: file read]

### Axis 1 — Fresh clone (Windows) recipe

```powershell
# $rand charset: [0-9a-z], 8 chars (confirmed from 93-03: "6cc4db5a")
$rand = -join ((1..8) | ForEach-Object { [char[]](48..57 + 97..122) | Get-Random })
$dest = "$env:TEMP\v1.12-audit-$rand"

# Clone
git clone --no-hardlinks D:\claude\Autopilot $dest

# Assert HEAD match
$srcHead = git -C D:\claude\Autopilot rev-parse HEAD
$cloneHead = git -C $dest rev-parse HEAD
if ($srcHead -ne $cloneHead) { throw "HEAD mismatch" }

# Run leaf validators only (NOT chain validators — deep-nest cascade)
Push-Location $dest
node scripts/validation/v1.12-milestone-audit.mjs --verbose
node scripts/validation/check-phase-94.mjs --verbose   # NEW leaf (PRESENCE+SELF+CONTENT)
Pop-Location

# Cleanup + zero-orphan assert
Remove-Item -Recurse -Force $dest
$orphans = Get-ChildItem $env:TEMP -Filter "v1.12-audit-*" -Directory
if ($orphans.Count -ne 0) { throw "Orphan clones found: $($orphans.Count)" }
```

**Key constraints (from 93-03):**
- `$rand` = `[0-9a-z]` 8-char (matches 93-03's `6cc4db5a`)
- `--no-hardlinks` ensures clone has own `.git/` objects (NOT a worktree — permitted under `use_worktrees:false`)
- Cloned HEAD MUST equal source HEAD — assert before running validators
- Run **leaf validators ONLY**: `v1.12-milestone-audit.mjs` + `check-phase-94.mjs`
- Do NOT run `check-phase-93.mjs` or `check-phase-95.mjs` on Windows (both cascade)
- Axis 3 = the SAME fresh, zero-context-carryover session that ran Axis 1 (one dispatch, two dimensions — per D-03)

### Axis 2 — Linux GHA dispatch

```bash
gh workflow run audit-harness-v1.12-integrity.yml --ref master
# Pre-flight checks (ALL must pass before dispatch):
# 1. git log origin/master --oneline -1  → shows Atom 2 commit on origin/master
# 2. gh auth status                       → authenticated (Schweinehund)
# 3. gh workflow list                     → shows "Audit Harness v1.12 Integrity" state: active
```

**Chain rows from Linux GHA (sole-authoritative):**
- `check-phase-93.mjs` (continuity [48..92]): capture count from GHA job output
- `check-phase-95.mjs` (apex [48..94]): capture count from GHA job output

**Expected counts (estimate):**
- `v1.12-milestone-audit.mjs`: **15/0/0** (cross-OS EXACT MATCH)
- `check-phase-94.mjs`: **7/0/0** (cross-OS EXACT MATCH)
- `check-phase-93.mjs` (continuity): **~47/0/1** (Linux-authoritative; inherited from 93-03 baseline)
- `check-phase-95.mjs` (apex [48..94]): **~49/0/1** (Linux-authoritative; capture at audit time)

### WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — confirmed chain validators

Both `check-phase-93.mjs` (continuity, [48..92]) AND `check-phase-95.mjs` (apex, [48..94]) are chain validators — both spawn CHECK_PHASE_NESTED=1 children over their entire range. The deep-nest cascade empirically fired at [48..87] depth in v1.10 (93-03-AUDIT-RESULTS.md:92). At depth [48..94] = 47 phases, the cascade is **depth-monotone-worse** → both are Linux-GHA sole-authoritative. [VERIFIED: 93-03-AUDIT-RESULTS.md]

---

## Verification Target 6: Predecessor Frozen-Surface Invariant

**26 surfaces that MUST be BYTE-UNCHANGED** from pre-Phase-95 anchor through all Phase 95 commits:

**8 Workflow YAMLs (v1.4–v1.11):**
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`
7. `.github/workflows/audit-harness-v1.10-integrity.yml`
8. `.github/workflows/audit-harness-v1.11-integrity.yml` ← NEW to frozen list this phase

**9 Milestone-Audit MJS (v1.4–v1.11):**
9. `scripts/validation/v1.4-milestone-audit.mjs`
10. `scripts/validation/v1.4.1-milestone-audit.mjs`
11. `scripts/validation/v1.5-milestone-audit.mjs`
12. `scripts/validation/v1.6-milestone-audit.mjs`
13. `scripts/validation/v1.7-milestone-audit.mjs`
14. `scripts/validation/v1.8-milestone-audit.mjs`
15. `scripts/validation/v1.9-milestone-audit.mjs`
16. `scripts/validation/v1.10-milestone-audit.mjs`
17. `scripts/validation/v1.11-milestone-audit.mjs` ← NEW to frozen list this phase

**9 Sidecar JSON (v1.4–v1.11):**
18. `scripts/validation/v1.4-audit-allowlist.json`
19. `scripts/validation/v1.4.1-audit-allowlist.json`
20. `scripts/validation/v1.5-audit-allowlist.json`
21. `scripts/validation/v1.6-audit-allowlist.json`
22. `scripts/validation/v1.7-audit-allowlist.json`
23. `scripts/validation/v1.8-audit-allowlist.json`
24. `scripts/validation/v1.9-audit-allowlist.json`
25. `scripts/validation/v1.10-audit-allowlist.json`
26. `scripts/validation/v1.11-audit-allowlist.json` ← NEW to frozen list this phase

**NOT in the invariant:** chain validators `check-phase-{48..94}.mjs`

**Pre-Phase-95 anchor SHA:** `ddf1355` (`docs(phase-94): complete phase execution`) [VERIFIED: git log]

**Gate command (run before close-gate commit):**
```bash
git diff ddf1355 HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  '.github/workflows/audit-harness-v1.6-integrity.yml' \
  '.github/workflows/audit-harness-v1.7-integrity.yml' \
  '.github/workflows/audit-harness-v1.8-integrity.yml' \
  '.github/workflows/audit-harness-v1.9-integrity.yml' \
  '.github/workflows/audit-harness-v1.10-integrity.yml' \
  '.github/workflows/audit-harness-v1.11-integrity.yml' \
  'scripts/validation/v1.4-milestone-audit.mjs' \
  'scripts/validation/v1.4.1-milestone-audit.mjs' \
  'scripts/validation/v1.5-milestone-audit.mjs' \
  'scripts/validation/v1.6-milestone-audit.mjs' \
  'scripts/validation/v1.7-milestone-audit.mjs' \
  'scripts/validation/v1.8-milestone-audit.mjs' \
  'scripts/validation/v1.9-milestone-audit.mjs' \
  'scripts/validation/v1.10-milestone-audit.mjs' \
  'scripts/validation/v1.11-milestone-audit.mjs' \
  'scripts/validation/v1.4-audit-allowlist.json' \
  'scripts/validation/v1.4.1-audit-allowlist.json' \
  'scripts/validation/v1.5-audit-allowlist.json' \
  'scripts/validation/v1.6-audit-allowlist.json' \
  'scripts/validation/v1.7-audit-allowlist.json' \
  'scripts/validation/v1.8-audit-allowlist.json' \
  'scripts/validation/v1.9-audit-allowlist.json' \
  'scripts/validation/v1.10-audit-allowlist.json' \
  'scripts/validation/v1.11-audit-allowlist.json'
```
→ Expected output: **EMPTY**. Non-empty = STOP immediately.

---

## Verification Target 7: Commit Map (4-Plan / 5-Commit Skeleton)

**Confirmed from 93-CONVENTIONS.md §10 + 93-03-AUDIT-RESULTS.md + CONTEXT.md D-04**

| Commit | Plan | Files | Message |
|--------|------|-------|---------|
| COMMIT 1 | 95-01 Wave 1 | `95-CONVENTIONS.md` | `docs(95-01): 95-CONVENTIONS.md — Phase 95 constants lock` |
| COMMIT 2 (Atom 1) | 95-01 Wave 2 | `v1.12-milestone-audit.mjs` + `v1.12-audit-allowlist.json` + BASELINE_16 comment in `regenerate-supervision-pins.mjs` | `feat(95-01): v1.12 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)` |
| COMMIT 3 (Atom 2) | 95-02 | `check-phase-94.mjs` + `check-phase-95.mjs` + `_lib/frozen-at-close.mjs` (V111 entry + readAtV111Close) + `audit-harness-v1.12-integrity.yml` | `feat(95-02): v1.12 validators + V111 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)` |
| COMMIT 4 | 95-03 | `95-03-AUDIT-RESULTS.md` | `docs(95-03): HARN-03 3-axis terminal re-audit results (artifact-only)` |
| COMMIT 5 (close-gate) | 95-04 | `v1.12-MILESTONE-AUDIT.md` + `v1.12-DEFERRED-CLEANUP.md` + `95-VERIFICATION.md` + `PROJECT.md` + `ROADMAP.md` + `STATE.md` + `REQUIREMENTS.md` | `docs(95-04): Phase 95 close-gate — v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.12 MILESTONE CLOSE` |

**Key differences from Phase 93 (v1.11 twin):**
- Atom 2: **4 files** (not 7) — check-phase-94 + check-phase-95 + frozen-at-close + CI YAML (vs 93's 7-file Atom 2 with check-phase-89..93)
- apex CHAIN_PHASES: `[48..94]` (47 entries) vs 93's `[48..92]` (45 entries)
- Cross-OS validator set: **4 rows** (not 7) — 2 leaf + 2 chain (vs 93's 7-row set)
- Close-gate: 6 v1.12 reqs (all Validated) vs 93's 15/15

**HARD ORDERING GATE:** Commit 3 (Atom 2) MUST be committed AND pushed to `origin/master` before Plan 95-03 Axis-2 GHA dispatch.

---

## Architecture Patterns

### System Architecture Diagram

```
[95-CONVENTIONS.md Wave-1 commit]
    |
    v
[ATOM 1 (3 files)] ---commits---+
    v1.12-milestone-audit.mjs   |  → C1-C16 check coverage (frozen harness)
    v1.12-audit-allowlist.json  |  → sidecar for C13/c13_rotting_external
    BASELINE_16 comment         |  → audit-trail freshness event
    |
    v
[ATOM 2 (4 files)] ---commits---+ → PUSH TO origin/master (ordering gate)
    check-phase-94.mjs          |  → PRESENCE + SELF + V-94-CONTENT-* (5 needles)
    check-phase-95.mjs          |  → chain-apex [48..94], V-95-SELF dual-invariant
    frozen-at-close.mjs +V111   |  → V111='919b23b' + readAtV111Close export
    audit-harness-v1.12.yml     |  → 9th CI coexistence (check-phase-94/95 jobs)
    |
    v
[3-AXIS RE-AUDIT]
    Axis 1/3: fresh clone → leaf rows (v1.12-audit + check-phase-94)
    Axis 2:   GHA dispatch → all 4 rows (chain rows = Linux-authoritative)
    Artifact: 95-03-AUDIT-RESULTS.md
    |
    v
[CLOSE-GATE (7 files, 1 commit)]
    v1.12-MILESTONE-AUDIT.md  → .planning/milestones/ (7-section Path-A)
    v1.12-DEFERRED-CLEANUP.md → .planning/milestones/ (DROP/CARRY/ADD)
    95-VERIFICATION.md        → phase dir
    4-doc traceability flip   → PROJECT + ROADMAP + STATE + REQUIREMENTS
    (incl. D-01 apex [48..93]→[48..94] correction patch in ROADMAP/STATE/REQUIREMENTS)
```

### Per-Phase Validator Deliverable Map (for check-phase-94 PRESENCE target)

| Phase | Primary deliverable (PRESENCE target) |
|-------|---------------------------------------|
| 94 | `docs/macos-lifecycle/02-mdm-migration-psso.md` (pre-existing, patched by Phase 94) |
| 95 | V-95-AUDIT + V-95-AUDIT-HARNESS + CHAIN(48..94) + V-95-SELF |

---

## ROADMAP/STATE/REQUIREMENTS D-01 Apex Correction (Close-Gate Patches)

The following text in ROADMAP SC#2 and STATE.md must be patched at close-gate (Plan 95-04):

**ROADMAP.md** (Phase 95 SC#2): `CHAIN_PHASES=[48..93]`, `chain-apex CHAIN_PHASES=[48..93]`
→ `CHAIN_PHASES=[48..94]` (47 entries)

**STATE.md** Phase 95 dep-summary: `chain-apex CHAIN_PHASES=[48..93], CHAIN_SKIP=new Set([])`
→ `CHAIN_PHASES=[48..94]`

**STATE.md** Pending Todos (line 173): `confirm chain-apex count CHAIN_PHASES=[48..93] (46 entries)`
→ Remove or mark resolved: `CHAIN_PHASES=[48..94] (47 entries) — CONFIRMED per D-01`

**REQUIREMENTS.md** HARN-02: `chain-apex CHAIN_PHASES=[48..93]`
→ `CHAIN_PHASES=[48..94]` (47 entries)

**REQUIREMENTS.md** HARN-03: `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..93]`
→ `at depth [48..94]`

---

## Common Pitfalls

### Pitfall 1: Off-by-one in apex CHAIN_PHASES
**What goes wrong:** Using `[48..93]` (46 entries) instead of `[48..94]` (47 entries) — the ROADMAP/STATE typo that D-01 corrects.
**Why it happens:** ROADMAP SC#2 and STATE.md dep-summary both say `[48..93]`. The correction is only in CONTEXT.md D-01.
**How to avoid:** Use `[48..94]` everywhere in check-phase-95.mjs. The close-gate patches the docs to match.

### Pitfall 2: Running chain validators on Windows cold clone
**What goes wrong:** Both `check-phase-93.mjs` and `check-phase-95.mjs` cascade to O(n²) subprocess explosion (3+ min hang, 12+ node procs — confirmed at [48..87] depth in v1.10).
**Why it happens:** CHECK_PHASE_NESTED=1 optimization only skips NESTED invocations; the top-level run still spawns all N children.
**How to avoid:** Run ONLY leaf validators on Windows Axis-1: `v1.12-milestone-audit.mjs` + `check-phase-94.mjs`. Chain counts come exclusively from Linux GHA Axis-2.

### Pitfall 3: Atom 2 not pushed before Axis-2 GHA dispatch
**What goes wrong:** The v1.12 CI workflow's check-phase-94/95 jobs FAIL (not skip) if these files are absent from the dispatched ref.
**Why it happens:** The workflow imports check-phase-94/95 by explicit path; missing file = module resolution failure.
**How to avoid:** Confirm `git log origin/master --oneline -1` shows Atom 2 commit BEFORE running `gh workflow run`.

### Pitfall 4: V111 entry in frozen-at-close.mjs added in wrong atom
**What goes wrong:** Adding V111 in Atom 1 (not Atom 2) breaks the atom-content contract.
**Why it happens:** v1.9/v1.10 put the frozen entry in Atom 1; v1.11/v1.12 put it in Atom 2 (per ROADMAP SC#2 + HARN-02).
**How to avoid:** V111 entry + readAtV111Close export belong in COMMIT 3 (Atom 2) alongside check-phase-94/95 + CI YAML.

### Pitfall 5: Needle in check-phase-94 uses wrong casing/spacing
**What goes wrong:** A needle like `supervision status (MEDIUM confidence)` (lowercase) would not match the actual heading `Supervision status (MEDIUM confidence)`.
**Why it happens:** The FORM uses literal string `includes()` — case-sensitive.
**How to avoid:** Use verbatim strings from the verified grep output above. In particular: `Supervision status (MEDIUM confidence)` (capital S, lowercase "status").

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CRLF-safe file reads | Custom encoding handler | `readFileSync(…, 'utf8').replace(/\r\n/g, '\n')` | Already in every validator; Windows-safe forward-slash needles work via this pattern |
| Frozen-SHA file reads | Inline `git show` calls | `readAtClose()` / `readAtV111Close()` from `_lib/frozen-at-close.mjs` | Centralized, CRLF-normalized, timeout-hardened |
| Chain child invocation | Direct `require()` or `import()` | `execFileSync('node', [path], { env: {..., CHECK_PHASE_NESTED: '1'}, stdio: 'pipe' })` | The NESTED env var short-circuits recursive chain expansion (prevents O(n²) blowup) |
| CI workflow jobs | New yaml from scratch | Path-A from `audit-harness-v1.11-integrity.yml` (replace v1.11→v1.12, 89..93→94..95) | Preserves FETCH-DEPTH-01, autocrlf, continue-on-error, timeout-minutes contracts |
| Allowlist file | Blank JSON | Path-A from `v1.11-audit-allowlist.json` (update 3 header fields, reset c13 for v1.12) | C13 hard-asserts exact entry count; format changes risk silently breaking counts |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Frozen entry in Atom 1 (v1.9/v1.10 pattern) | Frozen entry in Atom 2 (v1.11/v1.12 pattern) | Phase 93 D-02 | No semantic difference; both are known-PAST SHAs; v1.12 continues v1.11 pattern |
| Chain apex includes own content phase (implied) | Explicit `[48..N-1]` invariant enforced via D-01 off-by-one correction | Phase 95 D-01 | check-phase-94's V-94-CONTENT needles now replay on every CI run via apex chain |
| 7-row re-audit set (v1.11, more per-phase validators) | 4-row set (v1.12, only 2 net-new validators) | Phase 95 D-03 | Cross-OS table is smaller; both chain rows still Linux-authoritative |

---

## Assumptions Log

> No `[ASSUMED]` claims in this research — all anchors verified from source files this session.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | BASELINE_9 array line-positions are still valid for v1.12 corpus (no Phase 94/95 edits to the tracked files) | BASELINE_16 | Phase 95 is tooling-only; no docs edits → positions unchanged [ASSUMED but low-risk] |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validators, Axis-1 run | Confirmed (validators ran in Phase 93) | ≥20 per CI YAML | — |
| Git | clone/log/diff commands | Confirmed (used in research) | — | — |
| gh CLI | Axis-2 GHA dispatch | Confirmed (used in Phase 93 Axis-2) | — | — |
| GitHub Actions | Axis-2 Linux GHA | Confirmed (run 28243312867 in Phase 93) | ubuntu-latest | — |

---

## Open Questions

1. **BASELINE_16 anchor SHA** — not derivable until COMMIT 1 (95-CONVENTIONS.md) is landed.
   - What we know: it must be the `git rev-parse --short HEAD` captured immediately after COMMIT 1.
   - What's unclear: the actual SHA value (computed at authoring time, not research time).
   - Recommendation: Plan 95-01 Wave-2 task captures it right after Wave-1 commit.

2. **check-phase-95 apex PASS count** — estimated ~49/0/1 but not yet authoritative.
   - What we know: Phase 93 apex [48..92] = 47/0/1; Phase 95 adds phases 93 and 94 = 47+2 = 49/0/1 baseline.
   - What's unclear: whether new content in check-phase-93/94 causes any additional SKIPs vs FAILs.
   - Recommendation: capture at Axis-2 GHA run time; record as canonical in 95-03-AUDIT-RESULTS.md.

---

## Sources

### Primary (HIGH confidence)
- `scripts/validation/_lib/frozen-at-close.mjs` — V110 entry shape, readAtV110Close export pattern, last-entry confirmed
- `scripts/validation/check-phase-93.mjs` — chain-apex structure, CHAIN_PHASES=[48..92], NESTED guard, V-93-SELF dual-invariant
- `scripts/validation/check-phase-84.mjs` — PRESENCE+SELF base shape for check-phase-94
- `scripts/validation/check-phase-92.mjs` — {id,file,needle} FORM (lines 46-55, loop lines 63-74)
- `scripts/validation/check-phase-81.mjs` — confirms {id,file,needle} FORM consistency across lineage
- `scripts/validation/regenerate-supervision-pins.mjs` (lines 446-452) — BASELINE_15 exact text + insertion point
- `scripts/validation/v1.11-milestone-audit.mjs` (line 1-10) — Path-A source header, C1-C16, self-test
- `.github/workflows/audit-harness-v1.11-integrity.yml` — full workflow structure, all job names, Path-A for v1.12
- `.planning/milestones/v1.11-phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/93-CONVENTIONS.md` — §5 4-line edit set, §6 allowlist invariants, §10 commit layout, §12 byte-unchanged gate command, §13 23-surface list, §15 commit messages, §16 close-gate placeholder
- `.planning/milestones/v1.11-phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/93-03-AUDIT-RESULTS.md` — Axis-1 recipe ($rand charset, clone integrity, cleanup), deep-nest firing evidence, cross-OS table
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — 5 needle grep-counts verified (all present)
- `.planning/phases/94-post-migration-verification-content-closure/94-VERIFICATION.md` — needle grep-counts cross-confirmed
- `git log --grep="close-gate" --all` — V111='919b23b' confirmed; surrounding commits confirmed post-close chores

### Secondary (MEDIUM confidence)
- `.planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-CONTEXT.md` — D-01..D-04 locked decisions (user-approved adversarial-review outcomes; read as authoritative)
- `.planning/REQUIREMENTS.md` — HARN-01/02/03 full text; confirmed `[48..93]` in current text (to-be-patched at close-gate)
- `.planning/STATE.md` — dep-summary and pending-todos; confirmed `[48..93]` references (to-be-patched)
- `.planning/ROADMAP.md` — Phase 95 SC#1-4; confirmed `[48..93]` in SC#2 (to-be-patched)

---

## Metadata

**Confidence breakdown:**
- V111 SHA: HIGH — directly verified via `git log`
- Frozen-at-close.mjs shape: HIGH — file read
- Needle verification: HIGH — direct grep counts match 94-VERIFICATION.md
- Path-A structures: HIGH — all source files read
- BASELINE_15/16 region: HIGH — file read at exact line numbers
- Axis-1 recipe: HIGH — from 93-03-AUDIT-RESULTS.md
- Predecessor frozen-surface list: HIGH — from 93-CONVENTIONS.md §13 + ls verification of 8 YAMLs

**Research date:** 2026-06-26
**Valid until:** 2026-07-26 (Phase 95 is immediately next — execute before any corpus edits touch the target file)
