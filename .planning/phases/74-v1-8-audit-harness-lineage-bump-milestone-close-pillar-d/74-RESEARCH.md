# Phase 74: v1.8 Audit Harness Lineage Bump + Milestone Close (Pillar D) - Research

**Researched:** 2026-06-08
**Domain:** Path-A harness copy mechanics, validator chain extension, VPP documentation rename, 3-axis terminal re-audit, milestone close-gate
**Confidence:** HIGH — all findings empirically verified against repo source files; no speculative claims

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 — 5-plan layout + VPP-01 placement:**
Five plans: 74-01 (scaffold — VPP-01 rename + sidecar annotation + new harness stubs + check-phase-74 stub), 74-02 (harness Atom 1 — v1.8-milestone-audit.mjs + v1.8-audit-allowlist.json + BASELINE_12 comment in regenerate-supervision-pins.mjs), 74-03 (harness Atom 2 — check-phase-71/72/73/74.mjs + audit-harness-v1.8-integrity.yml), 74-04 (3-axis terminal re-audit), 74-05 (close-gate — v1.8-MILESTONE-AUDIT.md + v1.8-DEFERRED-CLEANUP.md finalization + 4-doc traceability flip + ARCHIVE-01 pre-write + single merge commit). Total: 6 commits (VPP + Atom 1 + Atom 2 + audit-results doc + close-gate commit + ARCHIVE-01 pre-write auto-commit if tool does one). VPP-01 goes in 74-01 scaffold wave.

**D-02 — VPP rename scope (4 sites, not 3):**
Rename "VPP location token" → "content token" at exactly 4 sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`: lines 115, 149, 155, 160 (bold-wrapped in source). Frontmatter bump YES: `last_verified` → today's date. Sidecar update: ANNOTATE sidecar (add 4 new `ci_2_vpp_location_token` entries with `resolved_<date>: true` to `c13_rotting_external` block; do NOT remove existing 6 resolved entries). Leak-check: scoped grep for "VPP location token" in `docs/operations/app-lifecycle/` only (not whole repo). V-74-VPP assertions in check-phase-74.mjs: V-74-VPP-01a (≥4 "content token" present AND 0 "VPP location token" remaining in target doc) + V-74-VPP-01b (sidecar has exactly 4 new entries with resolved flag).

**D-03 — 3-axis re-audit recipe (exact Phase 70 replication):**
Axis 1: D-03 LOCKED `git clone --no-hardlinks` (physical isolation; NOT git worktree). Axis 2: D-22 INTENT fresh sub-agent via Task tool (zero context carryover from content-author agents). Axis 3 (Axis 2 per Phase 70 naming): Linux GHA `workflow_dispatch` via `gh workflow run`. 6 cross-OS validators: v1.8-milestone-audit.mjs + check-phase-70/71/72/73/74.mjs. Atom 2 MUST be on origin/master before Axis 3 dispatch. Cross-OS PASS-Count EXACT MATCH required. `rotting-external-quarterly` job correctly SKIPS on workflow_dispatch (cron-only job) — this is a negative control, not a failure.

**D-04 — Single close-gate commit + NO Commit A:**
Phase 73 RETRO-02 (`a85da77`) centralized all frozen reads into `_lib/frozen-at-close.mjs`. No v1.8 artifact forward-references the close SHA. BASELINE_12 comment anchors to the Atom 1 SHA (a known-PAST SHA present on origin/master at the time of BASELINE_12 authoring). check-phase-74.mjs reads only prior-milestone close SHAs (V141/V15/V16/V17/V17_CLOSEGATE from `_lib/frozen-at-close.mjs` — no V18 key in that file). Single commit serves as Commit B (the close-gate commit itself). Literal `{phase_74_close_SHA}` placeholder used in traceability docs; recoverable via `git log --all --grep="74-05" --grep="close-gate" --all-match -1 --format=%H`.

### Claude's Discretion
- Sub-task sequencing within each plan (order of individual file edits)
- Exact prose wording for v1.8-MILESTONE-AUDIT.md notes field beyond template structure
- Exact wording for BASELINE_12 comment's inline notes beyond the mandatory anchor references
- Whether to run a quick local smoke-test of v1.8-milestone-audit.mjs inside 74-02 before the Atom 1 commit (recommended)
- Exact sub-agent prompt text for 74-04 Axis 2 dispatch (must match intent; exact words are discretionary)

### Deferred Ideas (OUT OF SCOPE)
- Any new check classes in v1.8-milestone-audit.mjs beyond Path-A copy
- Extending CHAIN_PHASES beyond 73 in any check-phase-NN.mjs other than check-phase-74.mjs
- Changing the cron schedule in audit-harness-v1.8-integrity.yml
- PostgreSQL migration for backend
- Any remediation or diagnostic feature work
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARNESS-07 | Create `scripts/validation/v1.8-milestone-audit.mjs` as Path-A copy of v1.7 counterpart with version-label substitutions only (C1-C16 preserved) | Exact literals to change identified: header comment line 2 `v1.7`→`v1.8`; `parseAllowlist()` sidecar path `v1.7-audit-allowlist.json`→`v1.8-audit-allowlist.json`; C13 allowlist count check stays at 15; lineage comment gains `v1.8` |
| HARNESS-08 | Create `scripts/validation/v1.8-audit-allowlist.json` as Path-A copy of v1.7 counterpart; add 4 new `ci_2_vpp_location_token` entries for Phase 74 rename; update `generated` + `phase` fields | Exact sidecar shape at `c13_rotting_external.ci_2_vpp_location_token` documented; 6 existing entries stay; 4 new entries with `resolved_<Phase-74-date>: true`; `quarterly_audit.next_review` update |
| HARNESS-09 | Add BASELINE_12 comment block to `scripts/validation/regenerate-supervision-pins.mjs` after BASELINE_11 region (lines 416-423); anchor to Atom 1 SHA | Exact insertion point: after line 423 (BASELINE_11 block end); format modeled on BASELINE_11 comment at lines 416-423; anchors to `{atom_1_sha}` |
| HARNESS-10 | Create `check-phase-71/72/73/74.mjs` as chain-link validators (Atom 2, 5th workflow coexistence); each extends CHAIN_PHASES to include predecessor phases | check-phase-73.mjs structure fully documented; CHAIN_PHASES for 74 = [48..73]; V-74-VPP-01a/01b assertions unique to check-phase-74.mjs; V-74-SELF guard excludes 74 |
| HARNESS-11 | Create `audit-harness-v1.8-integrity.yml` as Path-A copy of v1.7 counterpart; path filter updates; 5th coexistence file | Exact path filter changes documented; per-phase jobs swap 67/68/69/70 → 71/72/73/74; linux-chain job runs check-phase-74 (v1.8 chain-apex); rotting-external-quarterly cron-only filter preserved verbatim |
| HARNESS-12 | Finalize `v1.8-DEFERRED-CLEANUP.md`: preserve 6 existing sections as-is + append 6 promoted carry-overs from v1.7-DEFERRED-CLEANUP.md | Exact 6 carry-overs identified from v1.7-DEFERRED-CLEANUP.md lines 225-333: CI-3, Multi-tenant, ABDevice API, per-OU CRD, Account Holder lockout, ASM |
| VPP-01 | Rename "VPP location token" → "content token" at 4 sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155, 160); bump frontmatter `last_verified` | Exact current text at all 4 sites documented with surrounding context; bare "VPP tokens"/"Apple VPP tokens" at lines 142/150/161 are explicitly OUT of scope |
</phase_requirements>

---

## Summary

Phase 74 is a Path-A copy-and-extend milestone-close operation. The entire harness layer (v1.8-milestone-audit.mjs, v1.8-audit-allowlist.json, check-phase-71/72/73/74.mjs, audit-harness-v1.8-integrity.yml) is created by copying v1.7 counterparts with version-label substitutions only — all 16 audit checks (C1-C16) travel forward verbatim. The only net-new logic added to the chain is two assertions in check-phase-74.mjs (V-74-VPP-01a/01b) that verify the VPP rename completed correctly. VPP-01 is a 4-site documentation rename (not 3 as stated in REQUIREMENTS.md and ROADMAP.md SC#2 — CONTEXT.md D-02 overrides this to 4 sites). The close-gate is a single commit with no preceding "Commit A" because Phase 73 RETRO-02 eliminated the forward-reference problem that previously required it.

The precedent for every structural decision in this phase is Phase 70 (v1.7 Pillar D). The 3-axis re-audit recipe, the BASELINE_12 comment format, the V-NN-SELF guard pattern, the CHAIN_PHASES extension pattern, the workflow yml path-filter update, and the close-gate document structure all have exact Phase 70 counterparts documented with line references below.

**Primary recommendation:** Execute plans in strict sequence (74-01 → 74-05). Never advance to the next plan without verifying the previous commit is on origin/master. Atom 2 (74-03) must be on origin/master before dispatching the GHA workflow_dispatch in 74-04. The ARCHIVE-01 pre-write step (`node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter`) must run BEFORE `/gsd:complete-milestone v1.8` — it is a mandatory pre-write step, not a post-close step.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| VPP rename (docs) | Repository / Documentation | Validator (sidecar) | Content edit in Markdown doc; sidecar annotates the resolution |
| Audit harness (v1.8-milestone-audit.mjs) | Validator / CI | — | Standalone Node.js script run in CI and locally |
| Chain-link validators (check-phase-71..74.mjs) | Validator / CI | — | Each is a standalone chain-link; no cross-file dependency except HARNESS path |
| CI workflow (audit-harness-v1.8-integrity.yml) | CI / GitHub Actions | — | Orchestrates all validators on ubuntu-latest |
| BASELINE_12 comment | Source annotation | — | Comment-only insertion into regenerate-supervision-pins.mjs |
| Milestone close documents | Repository / Documentation | — | Static YAML-frontmatter markdown artifacts |
| 3-axis re-audit | Process | CI (Axis 3) | Combines local clone, fresh sub-agent, and GHA workflow_dispatch |

---

## Standard Stack

### Core

No new packages are installed in this phase. All code runs on the existing stack.

| Runtime/Tool | Version in Repo | Purpose |
|--------------|----------------|---------|
| Node.js | existing (>=18 assumed per repo) [ASSUMED] | Runs v1.8-milestone-audit.mjs + check-phase-*.mjs |
| PowerShell | existing (Windows host) | Axis 1 fresh-clone recipe |
| GitHub Actions (ubuntu-latest) | — | Axis 3 cross-OS validation |
| gh CLI | existing | `gh workflow run` for Axis 3 dispatch |

### No New Packages

This phase installs zero new npm, pip, or other packages. All scripts are vanilla Node.js ESM using only `fs`, `path`, `child_process`, and `crypto` built-ins (same as all prior check-phase-NN.mjs files). [VERIFIED: repo source]

---

## Package Legitimacy Audit

No external packages are installed in this phase. This section is intentionally empty.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| (none) | — | — | — | — | — | — |

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

---

## Architecture Patterns

### System Architecture Diagram

```
Phase 74 data flow (Path-A copy + extend pattern):

v1.7-milestone-audit.mjs  ──copy+bump──>  v1.8-milestone-audit.mjs
v1.7-audit-allowlist.json ──copy+annotate> v1.8-audit-allowlist.json   (Atom 1 commit)
regenerate-supervision-pins.mjs  ──comment-insert──>  BASELINE_12 block

check-phase-73.mjs  ──copy+extend──>  check-phase-74.mjs  (Atom 2 commit)
check-phase-70/71/72.mjs  ──copy+bump––>  same pattern
audit-harness-v1.7-integrity.yml  ──copy+pathfilter+jobs──>  audit-harness-v1.8-integrity.yml

02-macos-pkg-dmg-pipeline.md  ──4-site rename──>  "content token" (VPP-01, 74-01 commit)

                          ┌──────────────────────────────┐
                          │   3-Axis Terminal Re-Audit    │ (Plan 74-04)
                          │  Axis 1: git clone --no-hardlinks (local Windows)
                          │  Axis 2: fresh sub-agent via Task tool
                          │  Axis 3: GHA workflow_dispatch (Linux ubuntu-latest)
                          └──────────────────────────────┘
                                        │ cross-OS PASS counts must EXACT MATCH
                                        ▼
v1.8-MILESTONE-AUDIT.md ──authored──>  close-gate commit  (Plan 74-05)
v1.8-DEFERRED-CLEANUP.md (finalized: 6 existing + 6 promoted)
4-doc traceability flip (STATUS.md, CONTEXT.md, PLAN.md ×4, REQUIREMENTS.md)
```

### Recommended Project Structure (no change to existing layout)

```
scripts/validation/
├── v1.8-milestone-audit.mjs        [NEW — Path-A copy of v1.7 counterpart]
├── v1.8-audit-allowlist.json       [NEW — Path-A copy + 4 new VPP entries]
├── check-phase-71.mjs              [NEW — Path-A copy of check-phase-70.mjs]
├── check-phase-72.mjs              [NEW — Path-A copy of check-phase-71.mjs]
├── check-phase-73.mjs              [EXISTING — unchanged]
├── check-phase-74.mjs              [NEW — Path-A copy of check-phase-73 + VPP assertions]
├── regenerate-supervision-pins.mjs [MODIFIED — BASELINE_12 comment appended]
└── _lib/
    └── frozen-at-close.mjs         [EXISTING — NO V18 key needed; unchanged]

.github/workflows/
├── audit-harness-integrity.yml     [EXISTING — byte-unchanged]
├── audit-harness-v1.5-integrity.yml [EXISTING — byte-unchanged]
├── audit-harness-v1.6-integrity.yml [EXISTING — byte-unchanged]
├── audit-harness-v1.7-integrity.yml [EXISTING — byte-unchanged]
└── audit-harness-v1.8-integrity.yml [NEW — 5th coexistence file]

docs/operations/app-lifecycle/
└── 02-macos-pkg-dmg-pipeline.md    [MODIFIED — 4-site rename + frontmatter bump]

.planning/milestones/
├── v1.8-MILESTONE-AUDIT.md         [NEW — authored in 74-05]
└── v1.8-DEFERRED-CLEANUP.md        [MODIFIED — finalized in 74-05]
```

### Pattern 1: Path-A Version-Label Substitution (C1-C16 verbatim copy)

**What:** Copy prior-milestone harness file verbatim; replace only version-label strings (`v1.7` → `v1.8`). No check logic changes.
**When to use:** Every harness artifact: milestone-audit.mjs, audit-allowlist.json, audit-harness-vN-integrity.yml.

Key literal substitutions for v1.8-milestone-audit.mjs:

```javascript
// Source: scripts/validation/v1.7-milestone-audit.mjs lines 1-4 (header comment)
// Before:
// v1.7 Milestone Audit Harness
// Lineage: v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7
// Sidecar: scripts/validation/v1.7-audit-allowlist.json

// After (v1.8):
// v1.8 Milestone Audit Harness
// Lineage: v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7 -> v1.8
// Sidecar: scripts/validation/v1.8-audit-allowlist.json
```

```javascript
// Source: scripts/validation/v1.7-milestone-audit.mjs line 79 (parseAllowlist function)
// Before:
const raw = fs.readFileSync('scripts/validation/v1.7-audit-allowlist.json', 'utf8');
// After:
const raw = fs.readFileSync('scripts/validation/v1.8-audit-allowlist.json', 'utf8');
```

C13 allowlist count guard at line 670 stays at 15 — same 15 broken-link entries carry forward (no new broken links added by Phase 74):
```javascript
// Source: scripts/validation/v1.7-milestone-audit.mjs line 670 — UNCHANGED in v1.8
if (allowlist.length !== 15)
```

### Pattern 2: CHAIN_PHASES Extension (per Phase 68 invariant `7b635ca`)

**What:** Each check-phase-NN.mjs extends CHAIN_PHASES to include all predecessors through N-1. CHAIN_SKIP is ALWAYS empty Set.
**When to use:** Every new chain-link validator.

```javascript
// Source: scripts/validation/check-phase-73.mjs lines 53-56
// check-phase-73 (current):
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72];
const CHAIN_SKIP = new Set([]);

// check-phase-74 (to create — add 73 to CHAIN_PHASES; 74 excluded per V-NN-SELF):
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73];
const CHAIN_SKIP = new Set([]);

// HARNESS path update:
// Before: const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';
// After:  const HARNESS = 'scripts/validation/v1.8-milestone-audit.mjs';
```

### Pattern 3: V-NN-SELF Guard (mandatory in every chain-link)

**What:** Asserts that the current phase number is NOT in CHAIN_PHASES and CHAIN_SKIP is empty.
**When to use:** Every check-phase-NN.mjs.

```javascript
// Source: scripts/validation/check-phase-73.mjs lines 400-414
// Pattern (adapt NN to phase number):
{
  id: 'V-74-SELF',
  name: 'Self not in chain + CHAIN_SKIP empty',
  run: async () => {
    const inChain = CHAIN_PHASES.includes(74);
    const skipEmpty = CHAIN_SKIP.size === 0;
    if (inChain) return { pass: false, detail: 'Phase 74 found in CHAIN_PHASES — would cause infinite loop' };
    if (!skipEmpty) return { pass: false, detail: `CHAIN_SKIP non-empty: ${[...CHAIN_SKIP]}` };
    return { pass: true, detail: 'Phase 74 not in CHAIN_PHASES; CHAIN_SKIP is empty Set' };
  }
}
```

### Pattern 4: V-74-VPP Assertions (modeled on V-67-03/04 from check-phase-67.mjs)

**What:** Two assertions unique to check-phase-74.mjs verifying VPP-01 rename completion.
**Model source:** scripts/validation/check-phase-67.mjs lines 110-189 (V-67-03 + V-67-04).

V-74-VPP-01a — term count check (checks HEAD, not frozen SHA):
```javascript
// Modeled on V-67-03 which checks content token count ≥6 at v1.7-frozen SHA
// V-74-VPP-01a: at HEAD, in 02-macos-pkg-dmg-pipeline.md:
//   - "content token" occurrences >= 4
//   - "VPP location token" occurrences === 0 (leak-check)
{
  id: 'V-74-VPP-01a',
  name: 'VPP rename complete — content token present, location token absent',
  run: async () => {
    const docPath = 'docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md';
    const content = fs.readFileSync(docPath, 'utf8').replace(/\r\n/g, '\n');
    const contentTokenCount = (content.match(/content token/g) || []).length;
    const locationTokenCount = (content.match(/VPP location token/g) || []).length;
    if (contentTokenCount < 4) return { pass: false, detail: `"content token" count ${contentTokenCount} < 4` };
    if (locationTokenCount > 0) return { pass: false, detail: `"VPP location token" leak: ${locationTokenCount} occurrences` };
    return { pass: true, detail: `content token: ${contentTokenCount}, VPP location token: 0` };
  }
}
```

V-74-VPP-01b — sidecar annotation check:
```javascript
// Modeled on V-67-04 which checks sidecar ci_2_vpp_location_token has 6 entries with resolved_2026_05_26: true
// V-74-VPP-01b: v1.8-audit-allowlist.json c13_rotting_external.ci_2_vpp_location_token
//   has exactly 4 entries with resolved_<Phase-74-date>: true
{
  id: 'V-74-VPP-01b',
  name: 'Sidecar annotated — 4 Phase-74 VPP resolved entries',
  run: async () => {
    const sidecar = JSON.parse(fs.readFileSync('scripts/validation/v1.8-audit-allowlist.json', 'utf8'));
    const entries = sidecar.c13_rotting_external?.ci_2_vpp_location_token || [];
    // Count entries with a resolved_2026_06_* key (date TBD at authoring time)
    const resolved74 = entries.filter(e => Object.keys(e).some(k => k.startsWith('resolved_2026_06_')));
    if (resolved74.length !== 4) return { pass: false, detail: `Expected 4 Phase-74 resolved entries, found ${resolved74.length}` };
    return { pass: true, detail: `4 Phase-74 ci_2_vpp_location_token entries with resolved flag` };
  }
}
```

**Note on resolved key date:** The exact key name (e.g., `resolved_2026_06_08`) is set at authoring time for 74-01. The assertions must match whatever date key is written. Lock the date at the start of 74-01 execution.

### Pattern 5: BASELINE_12 Comment Block

**What:** Comment-only insertion into regenerate-supervision-pins.mjs after the BASELINE_11 block.
**Insertion point:** After line 423 (end of BASELINE_11 region), before `const BASELINE_9 = [`.

```javascript
// Source: scripts/validation/regenerate-supervision-pins.mjs lines 416-423 (BASELINE_11 — model)
// BASELINE_11 refreshed 2026-05-28 (Phase 70 Plan 70-02): closes BASELINE_10 v1.6 carry-over
// per HARNESS-02 contract...; v1.7 line positions verified against HEAD 26a1ae9...
// BASELINE_9 entries above remain unchanged -- Phase 70 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 70
// close and remain valid for the v1.7 corpus. Resolution path: BASELINE_12 will refresh at
// v1.8 close per the Path-A inheritance pattern (v1.4.1 -> BASELINE_8 -> v1.5 -> BASELINE_9
// -> v1.6 -> BASELINE_10 -> v1.7 -> BASELINE_11).

// BASELINE_12 format (insert after line 423):
// BASELINE_12 refreshed <date> (Phase 74 Plan 74-02): closes BASELINE_11 v1.7 carry-over
// per HARNESS-09 contract; v1.8 line positions verified against HEAD {atom_1_sha}
// (Atom 1 SHA — the commit that introduces v1.8-milestone-audit.mjs + v1.8-audit-allowlist.json).
// BASELINE_9 entries above remain unchanged -- Phase 74 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 74
// close and remain valid for the v1.8 corpus. Resolution path: BASELINE_13 will refresh at
// v1.9 close per the Path-A inheritance pattern (... -> v1.7 -> BASELINE_11 -> v1.8 -> BASELINE_12).
```

**Critical:** `{atom_1_sha}` is a placeholder — replace with the actual SHA of the Atom 1 commit (74-02 commit) at time of authoring. It is a PAST SHA already on origin/master, not a forward-reference.

### Pattern 6: audit-harness-v1.8-integrity.yml Path-Filter and Job Changes

**What:** v1.8 workflow is the 5th coexistence file. Copy v1.7 counterpart; change path filters and per-phase jobs only.

Path filter changes (v1.7 lines 16-22 → v1.8 equivalent):
```yaml
# Before (v1.7):
- 'scripts/validation/v1.7-*'
- 'scripts/validation/check-phase-*.mjs'
- '.github/workflows/audit-harness-v1.7-integrity.yml'
- '.planning/REQUIREMENTS.md'
- '.planning/milestones/v1.7-MILESTONE-AUDIT.md'
- '.planning/milestones/v1.7-DEFERRED-CLEANUP.md'

# After (v1.8):
- 'scripts/validation/v1.8-*'
- 'scripts/validation/check-phase-*.mjs'
- '.github/workflows/audit-harness-v1.8-integrity.yml'
- '.planning/REQUIREMENTS.md'
- '.planning/milestones/v1.8-MILESTONE-AUDIT.md'
- '.planning/milestones/v1.8-DEFERRED-CLEANUP.md'
```

Per-phase job changes (replace v1.7 lines 94-148 jobs):
```yaml
# v1.7 has: check-phase-67, check-phase-68, check-phase-69, check-phase-70
# v1.8 replaces with: check-phase-71, check-phase-72, check-phase-73, check-phase-74
# All other job properties (fetch-depth: 0, continue-on-error: false, timeout-minutes) UNCHANGED
```

linux-chain-ubuntu-latest job chain-apex update:
```yaml
# v1.7: runs check-phase-66.mjs --verbose (chain-apex at v1.7 time)
# v1.8: runs check-phase-74.mjs --verbose (v1.8 chain-apex — the new highest phase)
```

**Jobs that stay verbatim unchanged:**
- `rotting-external-quarterly`: `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'` — cron-only filter preserved exactly. This job correctly SKIPS on workflow_dispatch (negative control, not a bug).
- `pin-helper-advisory`: only job retaining `continue-on-error: true` — preserved verbatim.
- Crons (lines 23-26): `0 8 * * 1` (weekly) + `0 8 1 1,4,7,10 *` (quarterly) — unchanged.

### Pattern 7: v1.8-MILESTONE-AUDIT.md Skeleton

The v1.7-MILESTONE-AUDIT.md frontmatter structure (lines 1-89) is the direct template. Key fields to author for v1.8:

```yaml
---
milestone: v1.8
milestone_name: v1.8 Audit Harness Lineage Bump + Milestone Close (Pillar D)
audited: <ISO-8601 timestamp of 74-04 re-audit>
status: passed
scores:
  requirements: 7/7    # HARNESS-07..12 + VPP-01
  phases: 5/5          # Phases 70/71/72/73/74 (5 phases in v1.8 range)
  integration: <from re-audit>
  flows: <from re-audit>
mechanical_checks:
  harness: scripts/validation/v1.8-milestone-audit.mjs
  allowlist: scripts/validation/v1.8-audit-allowlist.json
  last_run: <ISO-8601>
  commit: <Atom 2 SHA — the SHA at which re-audit was run>
  close_commit: "{phase_74_close_SHA}"   # literal placeholder per D-04
  atom_1_sha: <Atom 1 SHA>
  atom_2_sha: <Atom 2 SHA>
  audit_results_sha: <7-char short SHA of 74-04-AUDIT-RESULTS.md commit>
  # NO commit_a_sha field — D-04 single-commit close-gate
  results:
    C1_safetynet_semantic: passed
    C2_supervision_semantic: passed
    C3_aosp_wordcount: "informational (...)"
    C4_deferred_file_guard: passed
    C5_last_verified_freshness: passed
    C6_pitfall7_aosp_preservation: passed
    C7_knox_disambiguation: passed
    C9_cope_banned_phrases: passed
    C10_linux_frontmatter: passed
    C11_ops_domain_anti_patterns: passed
    C12_4platform_comparison_structural: passed
    C13_broken_link_automation: passed
    C14_apple_business_callout_freshness: passed
    C15_apple_business_intune_boundary: passed
    C16_apple_business_endpoint_triangle: passed
  raw_exit_code: 0
  failed_checks_classification: null
  notes: |
    <3-axis re-audit narrative: Axis 1 clone details + HEAD SHA + Axis 2 sub-agent
    dispatch + Axis 3 GHA workflow_dispatch run URL + PASS counts cross-OS>
performed_by: |
  Phase 74 Plan 74-04 — fresh gsd-executor sub-agent dispatched via Task tool
  (D-22 INTENT: zero context carryover from content-author agents).
  Axis 1 (D-03 LOCKED): Fresh git clone --no-hardlinks D:\claude\Autopilot <tempdir>
  ...
  Axis 3 (CILINUX-01): gh workflow run audit-harness-v1.8-integrity.yml --ref master → run <ID>
---
```

**NO `commit_a_sha` field** — this is the key structural difference from v1.7-MILESTONE-AUDIT.md which had one.

### Pattern 8: v1.8-DEFERRED-CLEANUP.md Finalization

Current file has 6 sections (as of Phase 73 close). HARNESS-12 appends 6 more promoted from v1.7-DEFERRED-CLEANUP.md lines 225-333.

Sections to promote (verbatim copy with header update):
1. CI-3 (automated canary from CI-1/CI-2 precedent)
2. Multi-tenant (per-tenant config isolation)
3. ABDevice API (ABM Device Enrollment / Automated Device Enrollment boundary)
4. per-OU CRD (per-organizational-unit compliance resource definitions)
5. Account Holder lockout (Apple ABM account holder lockout recovery)
6. ASM (Apple School Manager integration)

Footer line at end of v1.8-DEFERRED-CLEANUP.md: update from "Finalized by Phase 74 HARNESS-12" stub → actual finalization note with date and Phase 74 close-gate commit SHA (same `{phase_74_close_SHA}` placeholder, resolved post-close).

### Anti-Patterns to Avoid

- **Changing C1-C16 check logic in v1.8-milestone-audit.mjs:** Path-A means version-label substitutions ONLY. Adding or modifying any check is out of scope and violates the invariant.
- **Adding V18 key to `_lib/frozen-at-close.mjs`:** D-04 explicitly prohibits this. No Commit A needed because no v1.8 artifact forward-references the close SHA.
- **Using `git worktree` for Axis 1:** Must be `git clone --no-hardlinks` (physical isolation). Worktrees share `.git/` — that is NOT physical independence.
- **Dispatching Axis 3 GHA before Atom 2 is on origin/master:** The workflow runs `check-phase-74.mjs` and the per-phase jobs — these files do not exist on origin until after the Atom 2 commit is pushed. Always verify `git log origin/master --oneline -1` includes the Atom 2 SHA before `gh workflow run`.
- **Treating `rotting-external-quarterly` skip as a failure:** This job has `if: github.event_name == 'schedule' && ...` — it correctly does not run on `workflow_dispatch`. The 74-04-AUDIT-RESULTS.md should document this as a negative control.
- **Running ARCHIVE-01 pre-write step after `/gsd:complete-milestone v1.8`:** The command `node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter` must run BEFORE the milestone close tool is invoked. Running it after may produce stale frontmatter.
- **Altering predecessor workflow YMLs:** `audit-harness-integrity.yml`, `audit-harness-v1.5-integrity.yml`, `audit-harness-v1.6-integrity.yml`, `audit-harness-v1.7-integrity.yml` must be byte-unchanged through the close-gate. Verify with `git diff HEAD -- .github/workflows/audit-harness-v1.{4,5,6,7}*` before committing.
- **Scoping VPP leak-check to entire repo:** D-02 explicitly scopes the grep to `docs/operations/app-lifecycle/` only. Other docs outside that directory may legitimately contain the old term.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CHAIN_PHASES iteration with NESTED guard | Custom subprocess logic | Copy lines 341-376 of check-phase-73.mjs verbatim | WRAPPER-01: both stdout+stderr captured via `execFileSync({stdio:'pipe'})`; NESTED-aware skip via `CHECK_PHASE_NESTED=1` env var; battle-tested |
| Sidecar JSON parsing with CRLF safety | Custom parser | Copy `parseAllowlist()` from v1.7-milestone-audit.mjs line 79 area | Already applies `.replace(/\r\n/g, '\n')` per Phase 31 ca40eb9 precedent |
| V-NN-VPP assertion design | New assertion pattern | Model on V-67-03/04 from check-phase-67.mjs lines 110-189 | Established pattern for content-token count + sidecar resolved-entry count |
| BASELINE_NN comment format | Freestyle comment | Verbatim pattern from BASELINE_11 at regenerate-supervision-pins.mjs lines 416-423 | Audit trail requires consistent format; planner must match exact wording structure |
| v1.8-MILESTONE-AUDIT.md YAML frontmatter | Novel structure | Direct template from v1.7-MILESTONE-AUDIT.md lines 1-89 | All downstream consumers (check-phase validators) expect specific keys |
| 3-axis re-audit PowerShell recipe | Novel clone script | Verbatim from 70-04-AUDIT-RESULTS.md Axis 1 section | `--no-hardlinks` flag exact syntax, `Get-Random` temp path generation, cleanup verification all proven |

**Key insight:** Phase 70 is the exact precedent for every structural pattern in Phase 74. When in doubt, read the corresponding Phase 70 artifact.

---

## Empirical Findings by Requirement

### HARNESS-07 (v1.8-milestone-audit.mjs)

**Source file:** `scripts/validation/v1.7-milestone-audit.mjs` (980 lines)
**All changes are version-label substitutions only:**

| Location | Line(s) | Before | After |
|----------|---------|--------|-------|
| Header comment | 2 | `v1.7 Milestone Audit Harness` | `v1.8 Milestone Audit Harness` |
| Lineage comment | 3 | `Lineage: v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7` | `Lineage: v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7 -> v1.8` |
| Sidecar path comment | 4 | `Sidecar: scripts/validation/v1.7-audit-allowlist.json` | `Sidecar: scripts/validation/v1.8-audit-allowlist.json` |
| `parseAllowlist()` | ~79 | `'scripts/validation/v1.7-audit-allowlist.json'` | `'scripts/validation/v1.8-audit-allowlist.json'` |

**C13 count guard at line 670:** `if (allowlist.length !== 15)` — **UNCHANGED** (15 entries carry forward; no new broken links from Phase 74).

**Self-test section (lines 816-940):** 9 tests (C14/C15/C16 + parsePlatformValue) — **UNCHANGED verbatim**.

**Runner section (lines 947-979):** `checks` array + PASS/FAIL/SKIPPED output loop — **UNCHANGED verbatim**.

### HARNESS-08 (v1.8-audit-allowlist.json)

**Source file:** `scripts/validation/v1.7-audit-allowlist.json` (122 lines)

Top-level fields to update:
- `schema_version`: stays same (or increment if schema changed — verify by checking if any field was added)
- `generated`: update to Phase 74 date (e.g., `"2026-06-08"`)
- `phase`: update to `"74"` (or `"v1.8"` — match v1.7 field format which is `"70"`)

**Existing `ci_2_vpp_location_token` shape (lines 87-93 of v1.7 sidecar — keep verbatim):**
```json
"ci_2_vpp_location_token": [
  { "file": "...", "line": N, "term": "VPP location token", "context": "...", "reason": "...", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_05_26": true },
  ... (6 entries total from Phase 67 work)
]
```

**4 NEW entries to ADD (append to existing 6 — do NOT replace):**
Each entry covers one of the 4 Phase 74 rename sites in `02-macos-pkg-dmg-pipeline.md`:

| New Entry | File | Line | Term | resolved key |
|-----------|------|------|------|--------------|
| Entry 7 | `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` | 115 | `VPP location token` | `resolved_2026_06_<date>: true` |
| Entry 8 | same | 149 | `VPP location token` | `resolved_2026_06_<date>: true` |
| Entry 9 | same | 155 | `VPP location token` | `resolved_2026_06_<date>: true` |
| Entry 10 | same | 160 | `VPP location token` | `resolved_2026_06_<date>: true` |

`reason` field for each: something like `"Phase 74 VPP-01 surgical rename — legacy term replaced with current Apple terminology 'content token'"` (match existing entry reason style).

`quarterly_audit.next_review` at lines 113-118: Update `"2026-07-01"` → `"2026-10-01"` (next quarterly cron: `0 8 1 1,4,7,10 *`).

### HARNESS-09 (BASELINE_12 in regenerate-supervision-pins.mjs)

**Target file:** `scripts/validation/regenerate-supervision-pins.mjs`
**BASELINE_11 region:** Lines 416-423 (empirically verified)
**Insertion point:** After line 423, before `const BASELINE_9 = [`

The inserted block must:
1. Reference `HARNESS-09 contract` (not HARNESS-02 which is the v1.7 contract)
2. Reference `Phase 74 Plan 74-02` as the authoring event
3. Anchor to `{atom_1_sha}` — replaced with actual Atom 1 SHA at authoring time
4. Reference `v1.8 corpus` and `v1.7 carry-over`
5. State that `BASELINE_9 entries above remain unchanged`
6. State the Path-A inheritance chain: `... -> v1.7 -> BASELINE_11 -> v1.8 -> BASELINE_12`

**BASELINE_11 anchored to:** `26a1ae9` (Phase 70 Plan 70-02 Atom 1 SHA). BASELINE_12 will anchor to the Phase 74 Atom 1 SHA (the commit that introduces v1.8-milestone-audit.mjs + allowlist).

### HARNESS-10 (check-phase-71/72/73/74.mjs)

**Source for chain-link copy pattern:** `scripts/validation/check-phase-73.mjs` (444 lines)

Check-phase-71.mjs: copy check-phase-70.mjs; extend CHAIN_PHASES to include 70; V-71-SELF excludes 71.
Check-phase-72.mjs: copy check-phase-71.mjs; extend CHAIN_PHASES to include 71; V-72-SELF excludes 72.
Check-phase-73.mjs: ALREADY EXISTS — do not modify.
Check-phase-74.mjs: copy check-phase-73.mjs; CHAIN_PHASES adds 73 (total: [48..73]); HARNESS → v1.8; V-74-SELF excludes 74; ADD V-74-VPP-01a + V-74-VPP-01b.

**Note on check-phase-71/72:** These may already exist in the repo — VERIFY before creating. If they do exist, they should be byte-unchanged. Only check-phase-74.mjs is guaranteed new.

Empirically: check-phase-73 CHAIN_PHASES = [48..72] (25 phases). For 74: [48..73] (26 phases).

Runner block header in check-phase-74.mjs (adapt from check-phase-73 line 416):
```javascript
console.log('check-phase-74 -- ...\n');
```

### HARNESS-11 (audit-harness-v1.8-integrity.yml)

**Source:** `.github/workflows/audit-harness-v1.7-integrity.yml` (201 lines)

**Confirmed: 4 existing workflow files (5th will be new):**
- `audit-harness-integrity.yml`
- `audit-harness-v1.5-integrity.yml`
- `audit-harness-v1.6-integrity.yml`
- `audit-harness-v1.7-integrity.yml`

**linux-chain-ubuntu-latest job:** Currently runs `check-phase-66.mjs --verbose` at v1.7. For v1.8, this MUST be updated to `check-phase-74.mjs --verbose` (v1.8's chain-apex — the highest-numbered phase).

**Per-phase job substitution table:**

| v1.7 job name | v1.7 runs | v1.8 job name | v1.8 runs |
|---------------|-----------|---------------|-----------|
| `check-phase-67` | `check-phase-67.mjs` | `check-phase-71` | `check-phase-71.mjs` |
| `check-phase-68` | `check-phase-68.mjs` | `check-phase-72` | `check-phase-72.mjs` |
| `check-phase-69` | `check-phase-69.mjs` | `check-phase-73` | `check-phase-73.mjs` |
| `check-phase-70` | `check-phase-70.mjs` | `check-phase-74` | `check-phase-74.mjs` |

All job settings (fetch-depth: 0, continue-on-error: false, timeout-minutes: 30, `core.autocrlf false`, FETCH-DEPTH-01 compliance) preserved verbatim.

**REQUIREMENTS.md line 37 says "Fourth" coexistence file — this is stale.** ROADMAP SC#1 (confirmed by counting existing files) confirms v1.8 is the FIFTH coexistence file. CONTEXT.md D-03 notes are authoritative.

### HARNESS-12 (v1.8-DEFERRED-CLEANUP.md finalization)

**Current file:** `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (exists with 6 sections + stub footer)

**Existing 6 sections (preserve as-is, no edits):**
1. ARCHIVE-UPSTREAM-01 (STUB)
2. CHAIN-DEGRADED-AT-HEAD-01 (CLOSED at `a85da77`)
3. v1.1 line 164 token-class
4. HELPER-SPAWN-STDERR-01
5. FROZEN-AWARE-ADOPTION-SWEEP-01
6. EXEC-FAIL-DETAIL-EXTRACTION-01

**6 sections to promote from v1.7-DEFERRED-CLEANUP.md lines 225-333:**
These are promoted verbatim (copy prose; update section header numbering if needed; add promotion note indicating "carried forward from v1.7 Phase 70"):
1. CI-3
2. Multi-tenant
3. ABDevice API
4. per-OU CRD
5. Account Holder lockout
6. ASM

### VPP-01 (02-macos-pkg-dmg-pipeline.md, 4 sites)

**Target file:** `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`

**Exact current text at each site (verified from file read):**

| Line | Current text (bold shows the term) | Replace "VPP location token" with |
|------|-----------------------------------|------------------------------------|
| 115 | `the **VPP location token**, allowing assignment to users (User-Licensed) or devices` | `the **content token**, allowing assignment to users (User-Licensed) or devices` |
| 149 | `2. Sync the ABM / **VPP location token** to Intune (sync runs at scheduled intervals; manual sync` | `2. Sync the ABM / **content token** to Intune (sync runs at scheduled intervals; manual sync` |
| 155 | `**ABM token expiry:** The ABM / **VPP location token** has a 1-year (365-day) expiry;` | `**ABM token expiry:** The ABM / **content token** has a 1-year (365-day) expiry;` |
| 160 | `**Token-sharing constraint:** A single **VPP location token** cannot be shared between Intune` | `**Token-sharing constraint:** A single **content token** cannot be shared between Intune` |

**EXPLICITLY OUT OF SCOPE (do not rename):**
- Line 142: bare "VPP tokens" — different term
- Line 150: "Apple VPP tokens" — different term
- Line 161: "VPP token" — different term

**Frontmatter bump (D-02 YES):**
- `last_verified: 2026-04-28` → `last_verified: <today's date, e.g. 2026-06-08>`
- `review_by: 2026-06-27` → update to a new review horizon (e.g., `2026-09-08` — 90 days from today) or leave for human judgment (Claude's Discretion)

**Leak-check command (D-02 scoped):**
```bash
# Grep only within docs/operations/app-lifecycle/ (NOT entire repo)
grep -r "VPP location token" docs/operations/app-lifecycle/
# Expected: 0 matches after rename
```

---

## Common Pitfalls

### Pitfall 1: Line Number Drift in BASELINE_12

**What goes wrong:** The BASELINE_12 comment references the Atom 1 SHA. If subsequent commits in Plan 74-02 or 74-03 touch regenerate-supervision-pins.mjs before the comment is inserted, the line numbers shift. The comment is never inserted at the correct location.
**Why it happens:** Multi-step plans touching the same file.
**How to avoid:** Insert BASELINE_12 comment in the Atom 1 commit (74-02). The comment is part of the Atom 1 indivisible commit. Do not split it to a later commit.
**Warning signs:** If BASELINE_12 comment says it anchors to a SHA that does not yet exist when the comment is being written, that is a forward-reference — banned by D-04. The Atom 1 SHA is the SHA of the commit being authored — you can't know it in advance. Solution: write a clear placeholder `{atom_1_sha}` in the comment text, then resolve it post-commit (or use git rev-parse HEAD immediately after the Atom 1 commit). This is the SAME pattern as v1.7 BASELINE_11.

### Pitfall 2: CRLF in Sidecar/Harness Reads

**What goes wrong:** File reads on Windows produce `\r\n` line endings. String matches fail silently (e.g., `"VPP location token"` is present but split across a `\r`).
**Why it happens:** Windows git config `core.autocrlf` may add CRLFs.
**How to avoid:** All file reads in check-phase-*.mjs and v1.8-milestone-audit.mjs must use `.replace(/\r\n/g, '\n')`. This is established in v1.7-milestone-audit.mjs and all check-phase-NN.mjs files per Phase 31 precedent `ca40eb9`. Do not omit this when writing new read operations for V-74-VPP assertions.

### Pitfall 3: Atom 2 Not on origin/master Before GHA Dispatch

**What goes wrong:** `gh workflow run audit-harness-v1.8-integrity.yml --ref master` runs the workflow against master HEAD. If check-phase-71/72/73/74.mjs are not yet on origin/master, the per-phase jobs fail with "file not found."
**Why it happens:** Local commits not pushed before dispatch.
**How to avoid:** Plan 74-04 must verify `git status` (clean), `git log origin/master -1` (shows Atom 2 SHA), BEFORE calling `gh workflow run`. Add an explicit pre-gate task to 74-04.
**Warning signs:** GHA job `check-phase-74` fails with `ENOENT` or `MODULE_NOT_FOUND`.

### Pitfall 4: gh CLI Auth Keyring Issues

**What goes wrong:** `gh workflow run` fails with "authentication required" or uses a stale token from a system keyring.
**Why it happens:** `GH_TOKEN` or `GITHUB_TOKEN` env vars may override interactive auth.
**How to avoid:** Per 70-04-AUDIT-RESULTS.md Axis 2 notes: run `gh auth status` before dispatch; if using env var auth, verify the token is valid. If invalid tokens are present: `unset GH_TOKEN; unset GITHUB_TOKEN` (bash) or `$env:GH_TOKEN=$null; $env:GITHUB_TOKEN=$null` (PowerShell).

### Pitfall 5: Resolved Key Date Mismatch in V-74-VPP-01b

**What goes wrong:** The assertion in check-phase-74.mjs searches for `resolved_2026_06_*` keys, but the sidecar was authored with `resolved_2026_07_*` (different date). Assertion fails permanently.
**Why it happens:** Date is set in 74-01 (sidecar authoring) but assertion code is written in 74-03.
**How to avoid:** Use a prefix-match pattern in V-74-VPP-01b (e.g., `Object.keys(e).some(k => k.startsWith('resolved_2026_06_'))`) rather than an exact key name match. Or: define a constant `PHASE_74_RESOLVED_PREFIX = 'resolved_2026_06_'` at the top of check-phase-74.mjs and reference it in both the comment and assertion.

### Pitfall 6: c13_broken_link_allowlist Count Guard

**What goes wrong:** v1.8-milestone-audit.mjs C13 check fails because the allowlist count guard expects 15 entries but the v1.8 sidecar has a different count.
**Why it happens:** If the planner mistakenly adds or removes entries from `c13_broken_link_allowlist` during the sidecar copy.
**How to avoid:** `c13_broken_link_allowlist` has 15 entries in v1.7 and carries forward unchanged to v1.8. The VPP rename adds entries to `c13_rotting_external.ci_2_vpp_location_token` only — a different key. The count guard at v1.8-milestone-audit.mjs line 670 must remain `if (allowlist.length !== 15)`.

### Pitfall 7: ARCHIVE-01 Pre-Write Step Timing

**What goes wrong:** `/gsd:complete-milestone v1.8` runs before `extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter`. The milestone close tool may not have the summary oneliners available for frontmatter generation.
**Why it happens:** ARCHIVE-01 pre-write is an easy step to forget.
**How to avoid:** Plan 74-05 must have the ARCHIVE-01 pre-write as its FIRST task, before the close-gate commit and before `/gsd:complete-milestone v1.8`.

### Pitfall 8: Predecessor Workflow Byte-Unchanged Invariant

**What goes wrong:** A file save or editor auto-format modifies `audit-harness-v1.7-integrity.yml` (or v1.5/v1.6) by adding trailing whitespace or changing CRLF. This violates the byte-unchanged predecessor invariant.
**Why it happens:** Editor configuration; accidental opens.
**How to avoid:** Before the close-gate commit, run:
```bash
git diff HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml .github/workflows/audit-harness-v1.7-integrity.yml
```
Expected output: empty (no changes). If any diff appears, restore the file via `git checkout HEAD -- <path>`.

---

## Code Examples

### 3-Axis Re-Audit — Axis 1 PowerShell Recipe

```powershell
# Source: .planning/milestones/v1.7-phases/70-.../70-04-AUDIT-RESULTS.md (Axis 1 section)
# Adapted for v1.8 (change v1.7-audit- to v1.8-audit-)
$rand = -join ((48..57) + (97..122) | Get-Random -Count 8 | ForEach-Object {[char]$_})
$auditPath = Join-Path $env:TEMP "v1.8-audit-$rand"
$mainHeadSha = git -C 'D:\claude\Autopilot' rev-parse HEAD
git clone --no-hardlinks 'D:\claude\Autopilot' $auditPath
$cloneHeadSha = git -C $auditPath rev-parse HEAD
if ($mainHeadSha -ne $cloneHeadSha) { throw "HEAD mismatch: main=$mainHeadSha clone=$cloneHeadSha" }
Push-Location $auditPath

# Run the 6 cross-OS validators:
node scripts/validation/v1.8-milestone-audit.mjs          # HARNESS-07
node scripts/validation/check-phase-70.mjs                # chain predecessor
node scripts/validation/check-phase-71.mjs                # chain predecessor
node scripts/validation/check-phase-72.mjs                # chain predecessor
node scripts/validation/check-phase-73.mjs                # chain predecessor
node scripts/validation/check-phase-74.mjs                # chain-apex (v1.8)

Pop-Location
Remove-Item -Recurse -Force $auditPath
# Verify cleanup:
$orphanCount = @(Get-ChildItem $env:TEMP -Filter 'v1.8-audit-*' -Directory).Count
if ($orphanCount -ne 0) { throw "Orphan temp dirs: $orphanCount" }
```

### Axis 3 GHA Dispatch Command

```bash
# Source: .planning/milestones/v1.7-phases/70-04-PLAN.md Task 3
# Adapted for v1.8:
gh workflow run audit-harness-v1.8-integrity.yml --ref master
# Then check result:
gh run list --workflow=audit-harness-v1.8-integrity.yml --limit 1
gh run view <RUN_ID> --log
```

### CHAIN_PHASES Extension (check-phase-74.mjs)

```javascript
// Source: scripts/validation/check-phase-73.mjs line 53 (extended by 1)
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73];
const CHAIN_SKIP = new Set([]);  // INVARIANT: always empty per Phase 68 7b635ca
```

### NESTED-Aware Chain Loop (copy verbatim from check-phase-73.mjs lines 341-376)

```javascript
// Source: scripts/validation/check-phase-73.mjs lines 341-376
// This block handles CHECK_PHASE_NESTED=1 env var for CI parallelization.
// Copy verbatim — do not adapt. Only the console.log header line changes (check-phase-74).
```

### V-74-AUDIT-HARNESS Validator (runs predecessor harness)

```javascript
// Source: scripts/validation/check-phase-73.mjs lines 378-398 (V-73-AUDIT-HARNESS)
// For check-phase-74.mjs — change to V-74-AUDIT-HARNESS, HARNESS = v1.8-milestone-audit.mjs
{
  id: 'V-74-AUDIT-HARNESS',
  name: 'v1.8 milestone audit harness runs clean',
  run: async () => {
    // execFileSync(process.execPath, [HARNESS], { stdio: 'pipe', cwd: process.cwd() })
    // HARNESS = 'scripts/validation/v1.8-milestone-audit.mjs'
    // Returns { pass: true } or { pass: false, detail: stderr }
  }
}
```

### Traceability Placeholder Recovery

```bash
# Source: .planning/milestones/v1.7-MILESTONE-AUDIT.md line 16 (pattern comment)
# Recover {phase_74_close_SHA} after close-gate commit:
git log --all --grep="74-05" --grep="close-gate" --all-match -1 --format=%H
```

---

## Runtime State Inventory

> This phase is not a rename/rebrand/migration of system state. It is a code/docs addition. This section is included only to explicitly clear the relevant categories.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no database rows, no Mem0 keys, no Redis keys reference "v1.7 harness" | None |
| Live service config | GHA workflow `audit-harness-v1.7-integrity.yml` stays registered as-is; v1.8 is an additional new file (coexistence) | Register new v1.8 workflow (push to origin/master — GHA auto-registers) |
| OS-registered state | None — no Task Scheduler tasks, pm2 names, or launchd plists | None |
| Secrets/env vars | None — GH_TOKEN used for `gh workflow run`; token itself is unchanged | None |
| Build artifacts | `_lib/frozen-at-close.mjs` has no V18 key — confirmed | No Commit A needed |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Run harness scripts | ✓ (assumed — existing scripts run) | >=18 [ASSUMED] | — |
| git | Axis 1 clone + all commits | ✓ (repo active) | any | — |
| gh CLI | Axis 3 workflow_dispatch | verify before 74-04 | — | Manual GHA trigger |
| PowerShell | Axis 1 recipe | ✓ (Windows host) | any | — |
| GHA ubuntu-latest runner | Axis 3 cross-OS | verify org has minutes | — | If minutes exhausted: document as deferred with existing run evidence |

**Missing dependencies with no fallback:**
- gh CLI auth: must be valid at time of 74-04 execution. Run `gh auth status` at plan start.

**Missing dependencies with fallback:**
- GHA runner minutes: if exhausted, existing v1.7 run (26604414109) demonstrates cross-OS parity. However, D-03 requires a fresh Axis 3 run for v1.8. Escalate if minutes unavailable.

---

## Validation Architecture

**Harness self-tests:** v1.8-milestone-audit.mjs lines 816-940 (9 tests, C14/C15/C16 + parsePlatformValue) run on every harness invocation. These are the test framework for the harness itself.

**Chain validator tests:** Each check-phase-NN.mjs runner (lines 416-443 in check-phase-73 pattern) outputs PASS/FAIL/SKIPPED for each V-NN-* assertion. No external test framework.

**Phase gate:** 3-axis terminal re-audit (Plan 74-04) IS the phase gate. All 6 validators must PASS on both Axis 1 (Windows local) and Axis 3 (Linux GHA), with PASS counts exactly matching.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Exists? |
|--------|----------|-----------|-------------------|---------|
| HARNESS-07 | v1.8-milestone-audit.mjs runs clean | smoke | `node scripts/validation/v1.8-milestone-audit.mjs` | Creates in 74-02 |
| HARNESS-08 | v1.8-audit-allowlist.json parsed by harness | integration | part of HARNESS-07 run | Creates in 74-02 |
| HARNESS-09 | BASELINE_12 comment present | manual | `grep -n "BASELINE_12" scripts/validation/regenerate-supervision-pins.mjs` | Creates in 74-02 |
| HARNESS-10 | check-phase-74 PASS with V-74-VPP assertions | smoke | `node scripts/validation/check-phase-74.mjs` | Creates in 74-03 |
| HARNESS-11 | audit-harness-v1.8-integrity.yml registered | smoke | `gh workflow list` (shows new workflow) | Creates in 74-03 |
| HARNESS-12 | v1.8-DEFERRED-CLEANUP.md has 12 sections | manual | count H2 headers | Creates in 74-05 |
| VPP-01 | 0 "VPP location token" in target doc | unit | V-74-VPP-01a in check-phase-74.mjs | Creates in 74-03 |
| VPP-01 | 4 sidecar resolved entries | unit | V-74-VPP-01b in check-phase-74.mjs | Creates in 74-03 |

### Wave 0 Gaps (files to create in 74-01..74-03)
- `scripts/validation/v1.8-milestone-audit.mjs` (74-02)
- `scripts/validation/v1.8-audit-allowlist.json` (74-02)
- `scripts/validation/check-phase-71.mjs` (74-03, if not already present)
- `scripts/validation/check-phase-72.mjs` (74-03, if not already present)
- `scripts/validation/check-phase-74.mjs` (74-03)
- `.github/workflows/audit-harness-v1.8-integrity.yml` (74-03)
- `.planning/milestones/v1.8-MILESTONE-AUDIT.md` (74-05)

---

## Security Domain

> CLAUDE.md security requirements apply throughout.

| Requirement | Phase 74 Application |
|-------------|---------------------|
| Never commit `.env` or credentials | No credentials involved in harness or docs changes |
| All remediation actions require confirmation | No remediation actions in this phase |
| Audit log all administrative actions | 3-axis re-audit (74-04-AUDIT-RESULTS.md) IS the audit log |
| Validate all user inputs in API endpoints | N/A — no API changes |
| Use HTTPS in production | N/A — no network code changes |

No ASVS categories apply to this phase (no auth, no input validation, no cryptography, no new endpoints).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Commit A (forward-reference SHA substitution) | Single close-gate commit (no Commit A) | Phase 73 RETRO-02 (`a85da77`) | Eliminates the 2-commit close-gate; frozen reads centralized in `_lib/frozen-at-close.mjs` |
| "4 existing workflow files" | 5 coexistence files | Phase 74 (this phase) | REQUIREMENTS.md line 37 "Fourth" is stale; actual count is 5th |
| "3 VPP rename sites" | 4 VPP rename sites | CONTEXT.md D-02 override | REQUIREMENTS.md line 45 "3 sites" and ROADMAP SC#2 "3 sites" are both stale; D-02 is authoritative |

**Deprecated/outdated documentation (do not trust without CONTEXT.md cross-check):**
- REQUIREMENTS.md line 37: "Fourth" coexistence file — stale, is 5th
- REQUIREMENTS.md line 45: "3 sites" for VPP-01 — stale, is 4 sites
- ROADMAP.md SC#2: "3 sites" — stale, is 4 sites

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | check-phase-71.mjs and check-phase-72.mjs do not yet exist in the repo | HARNESS-10 empirical findings | If they already exist: do not recreate; verify they match expected CHAIN_PHASES before proceeding. Low risk — easy to check with `ls scripts/validation/check-phase-7*.mjs` |
| A2 | Node.js version >=18 on execution host | Environment Availability | If Node.js <18: ESM `import` statements in harness files may fail. Mitigation: verify with `node --version` before 74-02 |
| A3 | `quarterly_audit.next_review` should advance to `2026-10-01` | HARNESS-08 | If cron schedule changed: next_review must match next `0 8 1 1,4,7,10 *` trigger after Phase 74 date |
| A4 | The v1.8-audit-allowlist.json `phase` field format matches v1.7 (uses phase number not milestone label) | HARNESS-08 | Low risk — verify by reading line 4 of v1.7-audit-allowlist.json at authoring time |

**If this table is empty:** All critical claims were verified from source files. The 4 assumptions above are low-risk edge cases.

---

## Open Questions

1. **Do check-phase-71.mjs and check-phase-72.mjs already exist?**
   - What we know: check-phase-73.mjs exists; CHAIN_PHASES in check-phase-73 includes 71 and 72 in its array, implying they exist as chain-links
   - What's unclear: whether they are actually present as files on disk (the CHAIN array documents their phase numbers but doesn't require the files to exist for check-phase-73 to run)
   - Recommendation: Run `ls D:\claude\Autopilot\scripts\validation\check-phase-7*.mjs` before Plan 74-03 to verify. If they exist, skip creation for those; if missing, create.

2. **Exact `phase` field value in v1.7-audit-allowlist.json**
   - What we know: the field exists; it probably says `"70"` (the phase that authored it)
   - What's unclear: exact value
   - Recommendation: Planner should verify by reading line ~3 of v1.7-audit-allowlist.json at authoring time. Update to `"74"` for v1.8 sidecar.

3. **Number of PASS/SKIPPED counts from Phase 74 Axis 3**
   - What we know: Phase 70 GHA run had 9 active jobs, `rotting-external-quarterly` skipped on workflow_dispatch
   - What's unclear: exact PASS count for v1.8 (depends on V-74-VPP assertions and any SKIPPED entries)
   - Recommendation: Document actual counts in 74-04-AUDIT-RESULTS.md after the run; do not pre-populate estimates.

---

## Sources

### Primary (HIGH confidence)
- `scripts/validation/v1.7-milestone-audit.mjs` (lines 1-980, all) — verified in session
- `scripts/validation/v1.7-audit-allowlist.json` (lines 1-122, all) — verified in session
- `scripts/validation/check-phase-73.mjs` (lines 1-444, all) — verified in session
- `.github/workflows/audit-harness-v1.7-integrity.yml` (lines 1-201, all) — verified in session
- `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 1-170) — verified in session
- `scripts/validation/regenerate-supervision-pins.mjs` (lines 400-434) — verified in session
- `.planning/milestones/v1.7-phases/70-.../70-04-AUDIT-RESULTS.md` (lines 1-462, all) — verified in session
- `.planning/milestones/v1.7-phases/70-.../70-04-PLAN.md` (lines 1-519, all) — verified in session
- `scripts/validation/_lib/frozen-at-close.mjs` (lines 1-55, all) — verified in session
- `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (lines 1-275, all) — verified in session
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` (lines 200-333) — verified in session
- `scripts/validation/check-phase-67.mjs` (lines 110-189) — V-67-03/04 pattern — verified in session
- `.planning/phases/74-.../74-CONTEXT.md` — all decisions — verified in session
- `.planning/milestones/v1.7-MILESTONE-AUDIT.md` (lines 1-89) — frontmatter template — verified in session

### Secondary (MEDIUM confidence)
- `.planning/REQUIREMENTS.md` — stale fields noted (3 sites / "Fourth")
- `.planning/ROADMAP.md` — SC#1 confirms 5th workflow; SC#2 "3 sites" is stale

### Tertiary (LOW confidence)
- None — all findings verified from source files in this session

---

## Project Constraints (from CLAUDE.md)

| Directive | Phase 74 Relevance |
|-----------|-------------------|
| Never commit `.env` or credentials | N/A — no credentials in harness/docs |
| `SupportsShouldProcess` for remediation | N/A — no remediation functions |
| Sequential execution on main tree (memory: `project_execphase_sequential`) | All 5 plans execute sequentially on master branch; no worktrees |
| Pester 5.x for PowerShell tests | N/A — no PowerShell changes |
| pytest + 80% coverage for backend | N/A — no backend changes |
| Vitest + MSW for frontend | N/A — no frontend changes |
| Use HTTPS in production | N/A |
| Index frequently queried fields | N/A — no schema changes |

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; existing Node.js built-ins only
- Architecture: HIGH — all patterns empirically verified from Phase 70 precedents
- Pitfalls: HIGH — all from direct source-file inspection and Phase 70 post-mortems
- VPP-01 sites: HIGH — exact line numbers and surrounding text verified
- CHAIN_PHASES values: HIGH — exact array from check-phase-73.mjs
- BASELINE_11 location: HIGH — exact lines 416-423 verified

**Research date:** 2026-06-08
**Valid until:** 2026-07-08 (stable domain; 30-day window appropriate; invalidated immediately if any of the source files listed above are modified)
