# Phase 61: Gap Closure + Terminal Re-Audit + Milestone Close — Research

**Researched:** 2026-05-07
**Domain:** v1.5 milestone close — validator alignment, REQUIREMENTS.md traceability flip, PROJECT.md migration, v1.5-MILESTONE-AUDIT.md authoring, MILESTONES.md append
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Chain validator alignment (D-01..D-07):** REFRESH `check-phase-53.mjs` V-53-06 + V-53-22. V-53-06: accept `platform: cross-platform` (permissive or per-file scope-exemption for `docs/operations/00-index.md`). V-53-22: scope-restrict pattern preferred — exempt `00-index.md` from forbidden-H2 list, allow `## Patch & Update Management`, `## App Lifecycle Automation`, `## Compliance Drift Detection + Tenant Migration`. Atomic single-commit. NOT reverting Phase 59 content. NOT carrying over to v1.5.1.

**REQUIREMENTS.md flip strategy (D-08..D-13):** VERIFY-AND-FLIP 44 unchecked reqs. Per-req mechanism: look up phase mapping → read VERIFICATION.md → confirm Complete → flip `[ ]→[x]` → append traceability comment. Traceability comment form: `(closes ... — completed [YYYY-MM-DD] in Phase [NN] [Plan NN-NN]; commits abc1234 + def5678)`. ROADMAP stale rows (Phase 48/49/50/56) reconciled in same commit. No deferred active reqs at v1.5 close.

**v1.5-MILESTONE-AUDIT.md schema (D-14..D-19):** Frontmatter mirrors v1.4-MILESTONE-AUDIT.md verbatim. 4 body sections: Three-Pillar Closure Narrative / AUDIT-08 close-out / Harness Lineage 48→60 / Auditor-Independence Verification. NO `re_audit_resolution` block at initial close. NO duplication of 48-VERIFICATION-broken-links.md inventory. AUDIT-08 body section is narrative summary only (category counts, not URL lists).

**Auditor-independence (D-22):** Fresh worktree spawn at Plan 61-04 distinct from Plans 61-01..03 author-agents.

**5-plan structure (D-21):** Plan 61-01 (validator alignment + jump-link fold) / 61-02 (REQUIREMENTS flip + ROADMAP refresh) / 61-03 (PROJECT.md Active→Validated + Closed Deferred Items) / 61-04 (v1.5-MILESTONE-AUDIT.md + fresh-worktree terminal re-audit) / 61-05 (MILESTONES.md append + check-phase-61.mjs close gate). Serial — each plan depends on prior plan state.

**check-phase-61.mjs scope (D-24):** ~15-20 V-61-NN structural assertions per D-24 enumeration (V-61-01..04 REQUIREMENTS `[ ]` count; V-61-05..08 ROADMAP complete rows; V-61-09..12 PROJECT.md Validated + Closed Deferred Items; V-61-13..16 audit doc frontmatter + body sections; V-61-17..20 MILESTONES.md v1.5 entry subsections; V-61-CHAIN chain validators 48-60 all exit 0; V-61-AUDIT harness exits 0; V-61-SELF-TEST self-test exits 0).

**CI registration (D-25):** No yml edit required — `audit-harness-v1.5-integrity.yml` lazy-skip slot activates check-phase-61.mjs by file presence. Confirmed: the yml currently ends at `check-phase-60:` job (line 261-275) + `pin-helper-advisory:` job (line 277-293). No check-phase-61 slot exists yet — Plan 61-05 must add it to the yml (or the lazy-skip pattern may not auto-activate without a slot entry).

**Commit naming (D-23):** Plan 61-05 close commit: `chore(61): close v1.5 milestone`. Earlier plans: `feat(61-NN)` / `fix(61-NN)` / `docs(61-NN)`.

**AUDIT-08 flip timing (D-10):** AUDIT-08 is the ONLY req that flips at Plan 61-04 (requires v1.5-MILESTONE-AUDIT.md artifact). All other 43 unchecked reqs flip at Plan 61-02.

### Claude's Discretion

- V-53-06 + V-53-22 refresh mechanism choice (per-file scope-exemption vs allow-list expansion vs permissive regex) — plan author chooses based on V-53-10 SCOPE_RESTRICTED precedent.
- Per-req traceability comment exact wording — CLEAN-05 line-17 template adaptable for multi-phase reqs (e.g., AUDIT-08 spanning Phase 48 + 60 may need 2 commit refs).
- v1.5-MILESTONE-AUDIT.md `audited` + `last_run` timestamps + `commit` SHA — auto-populated at Plan 61-04.
- check-phase-61.mjs exact V-61-NN count (~15-20) — plan author finalizes at plan time.
- ROADMAP §Progress completion dates — plan author copies from each phase's VERIFICATION.md frontmatter.
- Whether to author `61-RESEARCH.md` per D-31 — discretionary (this file fulfills that purpose if needed).
- Plan 61-04 fresh-worktree mechanism (directory, branch name, agent dispatch).

### Deferred Ideas (OUT OF SCOPE)

- `re_audit_resolution` sibling block — NOT used at v1.5 initial close (D-16); reserved for future v1.5.1.
- `broken_link_external_allowlist[]` — not added at v1.5 close (Phase 60 deferred).
- Pre-commit hook hard-block — remains advisory-only.
- `audit-harness-v1.5-integrity.yml` archive lifecycle at v1.6 milestone-start.
- iOS/macOS/Windows admin template `last_verified` normalization.
- C11 pattern expansion (SCCM-bare / AMAPI-deprecation / Ubuntu-20.04-EOL).
- 6 pre-existing v1.5.1/v1.6+ deferrals in REQUIREMENTS.md §Future Requirements — stay in place.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUDIT-08 (flip at Plan 61-04) | Phase 48 broken-link sweep first-pass + Phase 60-61 second-pass = milestone close audit report | v1.5-MILESTONE-AUDIT.md authored at Plan 61-04 closes this; 75-finding inventory: 60 FIXED-PHASE-60 + 15 ALLOWLISTED |
| CLEAN-01..04 (flip at Plan 61-02) | Android nav unification reqs closed at Phase 57 | 57-VERIFICATION.md confirms Complete; ROADMAP row 57 shows 7/7 Complete 2026-04-30 |
| CLEAN-06..07 (flip at Plan 61-02) | Broken-link sweep reqs closed Phase 48; second-pass Phase 60 | 60-VERIFICATION.md confirms 75/75 findings resolved |
| LIN-01..02 (flip at Plan 61-02) | Linux foundation closed at Phase 49 | ROADMAP row shows In Progress — stale; VERIFICATION.md confirms Complete |
| LIN-03..06+13 (flip at Plan 61-02) | Linux admin setup closed at Phase 50 | Phase 50 VERIFICATION.md needed for commit SHAs |
| LIN-07..11 (flip at Plan 61-02) | Linux L1 closed at Phase 51 | 51-VERIFICATION.md confirms Complete 2026-04-27 |
| PATCH-01..08 (flip at Plan 61-02) | Patch management closed at Phase 54 | ROADMAP row shows 9/9 Complete 2026-04-28 |
| APP-01..08 (flip at Plan 61-02) | App lifecycle closed at Phase 55 | ROADMAP row shows 7/7 Complete 2026-04-28 |
| DRIFT-01..07 (flip at Plan 61-02) | Drift detection closed at Phase 56 | ROADMAP row shows Not started — stale; VERIFICATION.md confirms Complete |
| AUDIT-01..02 (flip at Plan 61-02) | Harness Path A copy + C10 closed at Phase 48 | Phase 48 VERIFICATION.md confirms Complete |
| Terminal verification (all 57) | Audit confirms all active reqs shipped | Harness 12/12 PASS confirmed at Phase 60 close |

</phase_requirements>

---

## Summary

Phase 61 is a mechanical closing/traceability phase with no new content authoring beyond two surgical edits (validator refresh + jump-link bullets). The work divides cleanly into five serial plans: (1) refresh `check-phase-53.mjs` to align with Phase 59 D-10's deliberate architectural evolution and fold in the score-0.9 pending todo, (2) verify-and-flip 44 unchecked REQUIREMENTS.md checkboxes with traceability comments and reconcile stale ROADMAP rows, (3) migrate PROJECT.md v1.5 requirements Active→Validated and add the "Closed Deferred Items (v1.4.1→v1.5)" subsection, (4) author `v1.5-MILESTONE-AUDIT.md` and run the terminal re-audit from a fresh auditor worktree, and (5) append the v1.5 entry to MILESTONES.md and ship `check-phase-61.mjs` as the close gate.

The Phase 47 v1.4.1 close is the canonical mirror precedent for everything in Phase 61. The critical difference is the 5-plan structure vs. Phase 47's 4 plans — Plan 61-01 has no analog because the validator catch-up + jump-link fold-in are unique to v1.5's architectural evolution. AUDIT-08 is the single req that cannot flip until Plan 61-04 completes (it requires the v1.5-MILESTONE-AUDIT.md artifact itself). All other 43 reqs flip at Plan 61-02 based on VERIFICATION.md evidence that already exists on disk.

**Primary recommendation:** Execute plans in strict serial order; spawn a fresh worktree for Plan 61-04 as the auditor-independence invariant; the CI yml requires an explicit check-phase-61 job addition (the lazy-skip pattern requires a named slot — no slot exists yet after check-phase-60 at line 261-275).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Validator alignment (V-53-06/22 refresh) | Tooling/scripts | — | `check-phase-53.mjs` is a standalone Node.js file with no shared module; plan author modifies it directly |
| Jump-link bullets (docs/index.md) | Documentation | — | Append-only edit to hub nav file; no UI component, no backend |
| REQUIREMENTS.md checkbox flips | Planning artifact | — | Markdown checkbox edits + inline traceability comments |
| ROADMAP §Progress reconciliation | Planning artifact | — | Row updates in ROADMAP.md; no downstream system reads this at runtime |
| PROJECT.md Active→Validated migration | Planning artifact | — | Structured markdown list moves; mirrors Phase 47 Plan 47-03 |
| v1.5-MILESTONE-AUDIT.md authoring | Planning artifact | Tooling/scripts | YAML frontmatter + markdown body; references harness exit code |
| Terminal re-audit subprocess | Tooling/scripts | — | `node scripts/validation/v1.5-milestone-audit.mjs` in fresh worktree |
| MILESTONES.md v1.5 entry | Planning artifact | — | Markdown append; mirrors v1.4.1 entry structure |
| check-phase-61.mjs | Tooling/scripts | CI | New Node.js validator file; CI yml slot must be added |

---

## Standard Stack

### Core
| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| Node.js ESM | v20 (CI) | Validator authoring (`check-phase-61.mjs`) | All validators use `import { readFileSync, existsSync } from 'node:fs'`; `execFileSync` for subprocess |
| `fs.readFileSync` + regex | Node.js built-in | All check-phase-NN.mjs implementations | NO shared module, no external tools per Phase 48 D-25 lineage |

### Established Patterns (VERIFIED from codebase)

**check-phase-NN.mjs skeleton** [VERIFIED: check-phase-60.mjs]:
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process'; // only when subprocess needed
import process from 'node:process';
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
// checks array with {id, name, run()} objects
// runner loop: LABEL_WIDTH padding, PASS/FAIL/SKIPPED output
// process.exit(failed > 0 ? 1 : 0)
```

**Subprocess invocation** [VERIFIED: check-phase-60.mjs:182-193]:
```javascript
execFileSync('node', [scriptPath], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
// Graceful skip pattern:
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('Could not resolve');
if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
```

**V-53-10 SCOPE_RESTRICTED pattern** [VERIFIED: check-phase-53.mjs:149-165]:
```javascript
const CO_MGMT_FILES = [OV, TA, WS, MP]; // scope exclusion: only 4 co-management files, NOT IDX
// check body iterates over CO_MGMT_FILES (not CONTENT_FILES which includes IDX)
```

**V-53-06 literal (current failing state)** [VERIFIED: check-phase-53.mjs:86]:
```javascript
if (!/^platform: Windows\s*$/m.test(fm)) issues.push("platform: Windows missing");
// NEEDS REFRESH: 00-index.md now has `platform: cross-platform` per Phase 59 D-10
```

**V-53-22 banPatterns (current failing state)** [VERIFIED: check-phase-53.mjs:341-354]:
```javascript
const banPatterns = [
  { p: /^## Patch Management/m, name: "## Patch Management H2" },
  { p: /^## App Lifecycle/m, name: "## App Lifecycle H2" },        // FAILS on 00-index.md
  { p: /^## Drift/m, name: "## Drift H2" },
  // ...
];
// NEEDS REFRESH: docs/operations/00-index.md now has ## App Lifecycle Automation H2
// (note: pattern is /^## App Lifecycle/m — matches "## App Lifecycle Automation")
// and ## Patch & Update Management and ## Compliance Drift Detection + Tenant Migration
```

---

## Architecture Patterns

### V-53-06 Refresh: 2 viable mechanisms

**Option A — Per-file scope-exemption (PREFERRED per D-02):**
Change `CONTENT_FILES` iteration in V-53-06 to split: strict `platform: Windows` for 4 co-management files; permissive `platform:` presence check for `00-index.md`.

```javascript
// refresh approach: separate check for IDX vs CO_MGMT_FILES
for (const f of CONTENT_FILES) {
  // ...
  if (f === IDX) {
    if (!/^platform:\s*\S/m.test(fm)) issues.push("platform field missing");
  } else {
    if (!/^platform: Windows\s*$/m.test(fm)) issues.push("platform: Windows missing");
  }
}
```

**Option B — Permissive regex for all 5 files:**
Replace strict `platform: Windows` match with `platform:` presence check. Simpler but loses pin-specificity for co-management files.

Both options produce V-53-06 PASS. D-02 prefers per-file scope-exemption to keep the strict pin for 4 co-management content files.

### V-53-22 Refresh: Scope-restrict (PREFERRED per D-03)

Match the V-53-10 `CO_MGMT_FILES` precedent exactly:

```javascript
// V-53-22: scope-restrict to CO_MGMT_FILES (NOT IDX which legitimately has these H2s)
{
  id: 22, name: "V-53-22: ... (SCOPE RESTRICTED to CO_MGMT_FILES per Phase 61 D-03 alignment)",
  run() {
    const failures = [];
    const banPatterns = [
      { p: /^## Patch Management/m, name: "## Patch Management H2" },
      { p: /^## App Lifecycle/m, name: "## App Lifecycle H2" },
      // ... (keep all existing patterns)
    ];
    for (const f of CO_MGMT_FILES) {  // KEY CHANGE: was IDX only, now CO_MGMT_FILES only
      // ...
    }
  }
}
```

Note: The current V-53-22 checks `IDX` (docs/operations/00-index.md) against forbidden H2s. After refresh, it should check `CO_MGMT_FILES` (the 4 co-management content files). The 4 co-management files legitimately should NOT contain ops-domain H2s — that's the right regression-guard surface.

### REQUIREMENTS.md verify-and-flip pattern

**Traceability comment template (D-09)** [VERIFIED: REQUIREMENTS.md:17 CLEAN-05 pattern]:
```markdown
- [x] **REQ-ID**: ... — completed YYYY-MM-DD in Phase NN Plan NN-NN; commits abc1234 + def5678
```
Length target: under 200 chars for readability. Multi-phase reqs (AUDIT-08 spanning Phase 48 + Phase 60-61): cite both phases.

**Commit SHA lookup protocol:**
- Phase VERIFICATION.md §Close Commits (most reliable)
- Plan NN-NN-SUMMARY.md commit line
- ROADMAP §Progress close date (for date only; SHAs from VERIFICATION.md)

**44-req flip surface by pillar:**

| Pillar | Reqs | Source Phase | ROADMAP row status |
|--------|------|-------------|-------------------|
| 1 — Cleanup | CLEAN-01..04 | Phase 57 | 7/7 Complete 2026-04-30 |
| 1 — Cleanup | CLEAN-06..07 | Phase 48+60 | 8/9 In Progress (stale) |
| 2 — Linux | LIN-01..02 | Phase 49 | 3/5 In Progress (stale) |
| 2 — Linux | LIN-03..06, LIN-13 | Phase 50 | 0/? Not started (stale) |
| 2 — Linux | LIN-07..11 | Phase 51 | 8/8 Complete 2026-04-27 |
| 3 — Ops | PATCH-01..08 | Phase 54 | 9/9 Complete 2026-04-28 |
| 3 — Ops | APP-01..08 | Phase 55 | 7/7 Complete 2026-04-28 |
| 3 — Ops | DRIFT-01..07 | Phase 56 | 0/? Not started (stale) |
| 4 — Tooling | AUDIT-01..02 | Phase 48 | 8/9 In Progress (stale) |
| 4 — Tooling | AUDIT-08 | Phase 48+60+61 | (flips at Plan 61-04) |

**Stale ROADMAP rows to reconcile at Plan 61-02 (D-11):**

| Phase | Current ROADMAP status | Correct status after reconciliation |
|-------|----------------------|-----------------------------------|
| 48 | 8/9 In Progress | 9/9 Complete [date from 48-VERIFICATION.md] |
| 49 | 3/5 In Progress | 5/5 Complete [date from 49-VERIFICATION.md] |
| 50 | 0/? Not started | 5/5 Complete [date from 50-VERIFICATION.md] |
| 56 | 0/? Not started | 7/7 Complete [date from 56-VERIFICATION.md] |
| 61 | 0/? Not started | 5/5 Complete [date at Phase 61 close] |

### PROJECT.md "Closed Deferred Items" subsection

**v1.4→v1.4.1 pattern (VERIFIED: PROJECT.md:234-241):**
```markdown
## Closed Deferred Items (v1.4 → v1.4.1)

- **DEFER-01** (Audit allow-list expansion — C2 supervision pins) — closed Phase 43 commit `4f41431` (AEAUDIT-02 + Plans 43-03/43-04)
- **DEFER-02** (60-day freshness normalization) — closed Phase 43 commit `2574c79` (AEAUDIT-03 + Plan 43-05)
- **DEFER-03** (AOSP stub re-validation / Phase 41 VERIFICATION) — closed Phase 43 commit `c782af6` (AEAUDIT-04 + Plans 43-07/43-09)
- **DEFER-04** (Knox Mobile Enrollment) — closed Phase 44 commit `51c2e72` (AEKNOX-01..07 + Plans 44-01..44-07)
- **DEFER-05** (Per-OEM AOSP Expansion) — closed Phase 45 commit `eb88750` (AEAOSPFULL-01..09 + Plans 45-01..45-10)
- **DEFER-06** (COPE Full Admin) — closed Phase 46 commit `bcb0986` (AECOPE-01..04 + Plans 46-01..46-02)
```

**v1.5 section head:** `## Closed Deferred Items (v1.4.1 → v1.5)`

**v1.5 defer items to close (from CONTEXT §Deferred + PROJECT.md:284-292):**
- DEFER-07 (cross-platform nav unification / AENAVUNIFY-04) → Phase 57 (CLEAN-01..04)
- DEFER-08 (4-platform comparison doc / AECOMPARE-01) → Phase 58 (CLEAN-05, already `[x]`)
- Any Phase 48-era items carried into v1.5 scope that closed during the milestone

Note: The existing `## Closed Deferred Items (v1.4 → v1.4.1)` section at PROJECT.md:234 enumerates DEFER-01..06. The new v1.5 subsection appends AFTER it with v1.4.1→v1.5 closing items.

**Active→Validated flip count:** All 57 v1.5 reqs spanning Phases 48-61 (14 phases). Plan 61-03 flips all of them in a single commit, following Phase 47 Plan 47-03 precedent (24 reqs in a single commit `5c976ec`).

### v1.5-MILESTONE-AUDIT.md frontmatter schema

**Mirrors v1.4-MILESTONE-AUDIT.md verbatim (VERIFIED: .planning/milestones/v1.4-MILESTONE-AUDIT.md:1-25):**

```yaml
---
milestone: v1.5
milestone_name: Linux Platform, Operational Depth & Cross-Platform Cleanup
audited: <ISO-8601 timestamp at Plan 61-04 re-audit time>
status: passed
scores:
  requirements: 57/57
  phases: 14/14
  integration: <calculated at audit time>
  flows: <calculated at audit time>
  nyquist: <calculated at audit time>
mechanical_checks:
  harness: scripts/validation/v1.5-milestone-audit.mjs
  allowlist: scripts/validation/v1.5-audit-allowlist.json
  last_run: <ISO-8601 at Plan 61-04 re-audit time>
  commit: <HEAD SHA at Plan 61-04 fresh-worktree re-audit>
  results:
    C1_safetynet: passed
    C2_supervision: passed
    C3_self_cert: informational (Phase 39 pattern — see C3 comment)
    C4_deferred_file_guard: passed
    C5_last_verified_freshness: passed
    C6_pitfall7: passed (informational)
    C7_knox_attribution: passed (informational)
    C9_cope_banned: passed (informational)
    C10_linux_frontmatter: passed
    C11_ops_antipattern: passed
    C12_comparison_structural: passed
    C13_broken_link: passed
  raw_exit_code: 0
  failed_checks_classification: null
performed_by: "<agent-ID> (distinct from Phase 60 close worktree agents per D-02 auditor-independence rule; fresh worktree spawn verified at execution start)"
gaps_closed: []
tech_debt: []
nyquist:
  compliant_phases: []
  partial_phases: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61]
  missing_phases: []
  overall: partial (expected — large documentation phases with multi-plan progressive landing)
deferred_items:
  - id: LIN-DEFER-01
    # ... + RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01
---
```

**Key differences from v1.4 schema:**
- `milestone: v1.5` / `milestone_name: Linux Platform, Operational Depth & Cross-Platform Cleanup`
- `scores.requirements: 57/57` (vs 37/37)
- `scores.phases: 14/14` (Phases 48-61; vs 9/9)
- `mechanical_checks.results` has C10/C11/C12/C13 (new v1.5 checks)
- `deferred_items[]` populated from REQUIREMENTS.md §Future Requirements (6 items)
- NO `re_audit_resolution:` block (v1.5 ships `status: passed` from initial close per D-16)

### v1.5-MILESTONE-AUDIT.md body sections (D-15)

**Section 1: `## v1.5 Three-Pillar Closure Narrative`**
Per-pillar narrative with phase ranges + key accomplishments + commit SHAs. Structure:
- Pillar 1 (Cleanup): Phases 57 (DEFER-07) + 58 (DEFER-08) + 48/60 (CLEAN-06/07 broken-link sweep)
- Pillar 2 (Linux): Phases 49-52 (Ubuntu LTS foundation + admin setup + L1 + L2)
- Pillar 3 (Ops Depth): Phases 53-56 (co-management + patch + app lifecycle + drift/migration)
- Pillar 4 (Validation Tooling): Phases 48+60 (harness bootstrap + finalization + C10-C13 promotions)

**Section 2: `## AUDIT-08 Broken-Link Inventory Close-Out`**
Narrative summary (NOT re-listing 75 findings): 60 FIXED-PHASE-60 (51 anchor-fixes + 9 path-fixes) + 15 ALLOWLISTED (6 transient_external + 9 template_placeholder). Cite `48-VERIFICATION-broken-links.md` as canonical record. Do NOT paste external URLs (D-18).

**Section 3: `## v1.5 Audit Harness Lineage Phase 48→60`**
Path-A-copy lineage trace:
- `v1.4.1-milestone-audit.mjs` (frozen) → `v1.5-milestone-audit.mjs` (Phase 48 Plan 48-NN copy)
- C10 added blocking (Phase 48)
- C11/C12/C13 informational scaffolds (Phase 48) → C12 promoted blocking (Phase 58 Plan 58-06)
- C9/C11/C13 promoted + C12 H2 expansion (Phase 60 Plan 60-08 atomic commit `c2abdd4`)
- Per-phase check-phase-NN.mjs validator file count (check-phase-48 through check-phase-61)
- CI workflow: `audit-harness-v1.5-integrity.yml`

**Section 4: `## Auditor-Independence Verification`**
Fresh worktree spawn record: agent ID, worktree path, branch, spawn timestamp, harness exit code, BASELINE_9 self-test exit code, chain validator results 48-61.

### MILESTONES.md v1.5 entry shape

**Template from v1.4.1 entry (VERIFIED: MILESTONES.md:3-22):**

```markdown
## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: YYYY-MM-DD)

**Phases completed:** 14 phases (48-61), [N] plans, [N] tasks
**Timeline:** 2026-04-26 → YYYY-MM-DD (~[N] days)
**Audit status:** `passed` (v1.5-MILESTONE-AUDIT.md; terminal re-audit 12/12 PASS; all 57 requirements closed)
**Git range:** `<first-Phase-48-commit>` (48-01 harness bootstrap) → `<61-close-commit>` (61-VERIFICATION PASSED)

**Key accomplishments:**

- **[Pillar 1 narrative]** (Phases 57-58-48/60, CLEAN-01..08) — ...
- **[Pillar 2 narrative]** (Phases 49-52, LIN-01..13) — ...
- **[Pillar 3 narrative]** (Phases 53-56, PATCH/APP/DRIFT/COMG) — ...
- **[Pillar 4 narrative]** (Phases 48+60-61, AUDIT-01..08) — ...

**v1.4.1 deferred items closed:** DEFER-07 (Android nav unification), DEFER-08 (4-platform comparison). 6 items routed to v1.5.1/v1.6+ (LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01).

**Methodology highlights:** [wave-based execution, progressive-landing, auditor-independence, PITFALL-6/7/12 discipline, informational-first check rollout...]
```

Note: `plans` count = 95 complete through Phase 60 + ~5 for Phase 61 = ~100 total. `tasks` count = derived from plan summaries. `Timeline` start = 2026-04-26 (Phase 48 launch).

### check-phase-61.mjs assertion mapping (D-24)

**File reads only** for V-61-01..20 (no subprocess). **Subprocess** for V-61-CHAIN, V-61-AUDIT, V-61-SELF-TEST.

| Check range | Target | Assertion |
|-------------|--------|-----------|
| V-61-01..04 | REQUIREMENTS.md | `[ ]` count in active reqs section ≤ 6 (§Future Requirements `[ ]` stay `[ ]`); AUDIT-08 `[x]` |
| V-61-05..08 | ROADMAP.md | All 14 v1.5 phase rows have `Complete` status + completion date |
| V-61-09..10 | PROJECT.md | v1.5 Active section empty (all reqs migrated to Validated) |
| V-61-11..12 | PROJECT.md | `## Closed Deferred Items (v1.4.1 → v1.5)` section present with ≥ 2 DEFER items |
| V-61-13..14 | v1.5-MILESTONE-AUDIT.md | frontmatter `status: passed` + `milestone: v1.5` + `scores.requirements: 57/57` |
| V-61-15..16 | v1.5-MILESTONE-AUDIT.md | 4 required body sections present (`## v1.5 Three-Pillar`, `## AUDIT-08`, `## v1.5 Audit Harness Lineage`, `## Auditor-Independence`) |
| V-61-17..18 | MILESTONES.md | `## v1.5 Linux Platform` H2 present + `Phases completed:` line present |
| V-61-19..20 | MILESTONES.md | `Key accomplishments:` and `Methodology highlights:` present in v1.5 entry |
| V-61-CHAIN | check-phase-{48..60}.mjs | subprocess all exit 0 (mirrors check-phase-60.mjs V-60-12..22 pattern) |
| V-61-AUDIT | v1.5-milestone-audit.mjs | subprocess exits 0 (12/12 PASS) |
| V-61-SELF-TEST | regenerate-supervision-pins.mjs | subprocess exits 0 |

**check-phase-61.mjs lineage comment (required per Phase 48 D-25 pattern):**
```
// Lineage: Phase 48 D-25 → ... → Phase 60 D-21/D-22 → Phase 61 D-24
```

### CI yml: check-phase-61 slot

**CRITICAL FINDING:** The yml ends at `check-phase-60:` job (lines 261-275) and `pin-helper-advisory:` job (lines 277-293). There is NO check-phase-61 lazy-skip slot. The lazy-skip pattern requires an explicit named job in the yml to activate. Plan 61-05 MUST add the slot before or alongside shipping check-phase-61.mjs.

**Pattern to replicate (VERIFIED: audit-harness-v1.5-integrity.yml:261-275):**
```yaml
  check-phase-61:
    name: check-phase-61 validator
    runs-on: ubuntu-latest
    needs: harness-run
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run check-phase-61.mjs
        run: |
          if [ -f scripts/validation/check-phase-61.mjs ]; then
            node scripts/validation/check-phase-61.mjs
          else
            echo "check-phase-61.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
          fi
```

Insert BEFORE the `pin-helper-advisory:` job at line 277.

### Fresh worktree spawn for Plan 61-04 auditor-independence

**Phase 47 precedent (VERIFIED: 47-CONTEXT.md D-32 + 47-VERIFICATION.md:27):**
> Plan 47-04 spawns a fresh executor worktree distinct from Plans 47-01/02/03 content-author worktrees. Terminal re-audit run from fresh worktree pinned to post-Plan-47-03 commit. Auditor agent: `a2ad3fcf`. Commit: `c7823c2`.

**Record format for v1.5-MILESTONE-AUDIT.md `performed_by` field:**
```
"<agent-ID> (distinct from Plans 61-01/02/03 content-author worktrees per D-02 auditor-independence rule; fresh worktree spawn verified at execution start)"
```

**Minimum verification steps from fresh worktree:**
1. `node scripts/validation/v1.5-milestone-audit.mjs --verbose` — exits 0, 12/12 PASS
2. `node scripts/validation/regenerate-supervision-pins.mjs --self-test` — exits 0
3. All chain validators: `node scripts/validation/check-phase-{48..60}.mjs` — all exit 0
4. Record worktree branch, HEAD commit SHA, spawn timestamp, agent ID

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Validator file structure | Custom check runner with shared state | Standalone Node.js ESM per check-phase-NN.mjs pattern | No shared module per Phase 48 D-25 lineage; each validator is self-contained |
| YAML frontmatter parsing | Custom YAML parser | Regex match `^---\n([\s\S]*?)\n---/m` | Identical pattern used across all existing validators; consistent with file-reads-only contract |
| Chain regression guards | Custom test orchestrator | `execFileSync('node', [path], ...)` with graceful-skip | Phase 60 established this pattern; subprocess invoke with ENOENT graceful skip |
| Commit SHA discovery | git log parsing | Read phase VERIFICATION.md §Close Commits or Plan NN-NN-SUMMARY.md commit lines | SHAs are already recorded in the planning artifacts |
| Completeness check for `[ ]` | Character counting | Regex `^- \[ \]` on REQUIREMENTS.md active section only | Need to exclude §Future Requirements `[ ]` items from the zero-count assertion |

**Key insight:** Phase 61's work is almost entirely mechanical markdown + YAML editing. The only code authoring is check-phase-61.mjs. That file follows an established, copy-from-prior-validator pattern. Do not over-engineer any assertion.

---

## Common Pitfalls

### Pitfall 1: V-53-22 check-currently-scoped-to-IDX confusion
**What goes wrong:** The current V-53-22 check body iterates over only `IDX` (docs/operations/00-index.md) with the forbidden-H2 ban list. After Phase 59 expanded IDX with 3 new H2s, the check fails on IDX itself. The refresh must change the iteration target to `CO_MGMT_FILES` (the 4 co-management files), NOT add IDX exemptions to a list.
**Root cause:** Original Phase 53 D-02 scoped the contract to the single-H2 stub state; Phase 59 D-10 superseded it without updating the validator.
**How to avoid:** Read check-phase-53.mjs V-53-22 body at lines 331-354; note that banPatterns are checked against `const c = readFile(IDX)` — the refresh changes what file is checked, not what patterns are banned.
**Warning signs:** After refresh, run `node scripts/validation/check-phase-53.mjs --verbose` and confirm V-53-22 PASS AND `docs/operations/00-index.md` H2s `## App Lifecycle Automation` etc. are present in that file.

### Pitfall 2: V-53-06 platform: cross-platform vs. platform: Windows scope split
**What goes wrong:** If V-53-06 refresh applies permissive check to ALL 5 CONTENT_FILES, it loses the strict pin for co-management files. If it continues to apply strict `platform: Windows` to IDX, it still fails.
**Root cause:** CONTENT_FILES = [OV, TA, WS, MP, IDX]. IDX now has `platform: cross-platform`. The 4 co-management files should retain `platform: Windows` strict check.
**How to avoid:** Per-file conditional in the V-53-06 loop body: `f === IDX` uses presence check; all others use strict Windows check.

### Pitfall 3: Premature AUDIT-08 flip
**What goes wrong:** AUDIT-08 gets flipped in Plan 61-02 alongside other 43 reqs, before v1.5-MILESTONE-AUDIT.md exists.
**Root cause:** AUDIT-08's SC includes "produces the milestone close audit report" — that artifact is Plan 61-04's deliverable.
**How to avoid:** Per D-10, AUDIT-08 flips at Plan 61-04 (after Plan 61-02 completes all other 43 flips). Plan 61-02 scope explicitly excludes AUDIT-08.

### Pitfall 4: REQUIREMENTS.md `[ ]` count assertion false-positives
**What goes wrong:** V-61-01..04 asserts `[ ]` count == 0 in active reqs. But §Future Requirements also has `[ ]` items (LIN-DEFER-01 etc.) and §Out of Scope uses no checkboxes. The assertion must exclude §Future Requirements.
**Root cause:** Simple regex `\[ \]` would match everywhere.
**How to avoid:** Slice REQUIREMENTS.md content between `## v1.5 Requirements (Active)` heading and `## Future Requirements` heading before counting. Only active-section `[ ]` count must reach 0.

### Pitfall 5: Missing check-phase-61 CI yml slot
**What goes wrong:** check-phase-61.mjs ships but CI doesn't run it because no yml slot exists.
**Root cause:** The yml ends at `check-phase-60:` with no check-phase-61 job. The lazy-skip pattern requires an explicit named slot — if no slot exists, file presence doesn't activate anything.
**How to avoid:** Plan 61-05 ships BOTH check-phase-61.mjs AND the yml slot addition in same atomic commit or same plan. Verify yml change is syntactically valid YAML.

### Pitfall 6: docs/index.md blockquote update scope
**What goes wrong:** The pending todo specifies updating the `platform-coverage blockquote at docs/index.md:9` as well as appending 2 bullets. The blockquote currently reads: `Windows Autopilot..., macOS ADE, and iOS/iPadOS provisioning.` — missing Linux + Operations mention.
**Root cause:** The todo §Solution says "Also update the platform-coverage blockquote" but D-20 says "append 2 bullets" and "update platform-coverage blockquote". Both edits must happen in Plan 61-01.
**How to avoid:** Plan 61-01 has two targets in docs/index.md: (1) append 2 bullets to jump-link list at lines 21-22 and (2) update blockquote at line 9. Verify post-fix: `grep -c "linux-provisioning" docs/index.md ≥ 2`.

### Pitfall 7: Traceability comment exceeds 200 chars for multi-phase reqs
**What goes wrong:** AUDIT-08 spans Phase 48 (first pass) + Phase 60 (second pass) + Phase 61 (milestone close report). The traceability comment may exceed 200 chars if all three phases' SHAs are included.
**Root cause:** D-09 allows "1-3 commit SHA references" but the form `Phase NN (plans NN-NN..NN-NN)` can get long.
**How to avoid:** For multi-phase reqs, cite the terminal close commit primarily + the initial phase reference. `(closes AUDIT-08 — completed 2026-05-07 in Phase 48/60/61; commits c2abdd4 + <61-close>)` fits under 200 chars.

### Pitfall 8: MILESTONES.md Git range first commit
**What goes wrong:** The `Git range:` field needs the first commit from Phase 48. This was ~2026-04-26. If the planner guesses a SHA, it may be wrong.
**Root cause:** The git range format is `<first commit SHA> (Phase 48 first plan) → <last commit SHA> (Phase 61 close)`.
**How to avoid:** At Plan 61-05 time, run `git log --oneline .planning/phases/48-*` or check 48-01-SUMMARY.md for the first Phase 48 commit. The Phase 61 close commit is the current HEAD at that point.

---

## Code Examples

### check-phase-61.mjs — REQUIREMENTS.md active-section zero-check

```javascript
// Source: check-phase-60.mjs + check-phase-53.mjs patterns
{
  id: 1, name: "V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs",
  run() {
    const c = readFile('.planning/REQUIREMENTS.md');
    if (c === null) return { pass: false, detail: 'REQUIREMENTS.md missing' };
    // Slice active section only (between ## v1.5 Requirements (Active) and ## Future Requirements)
    const activeMatch = c.match(/## v1\.5 Requirements \(Active\)([\s\S]*?)## Future Requirements/);
    if (!activeMatch) return { pass: false, detail: 'Active section boundaries not found' };
    const activeSection = activeMatch[1];
    const unchecked = (activeSection.match(/^- \[ \]/gm) || []).length;
    if (unchecked !== 0) return { pass: false, detail: unchecked + ' unchecked reqs remain in active section' };
    return { pass: true, detail: 'active section: 0 unchecked [ ] reqs' };
  }
}
```

### check-phase-61.mjs — v1.5-MILESTONE-AUDIT.md frontmatter check

```javascript
// Source: check-phase-60.mjs pattern (sidecar shape checks)
{
  id: 13, name: "V-61-13: v1.5-MILESTONE-AUDIT.md frontmatter has status: passed + milestone: v1.5",
  run() {
    const c = readFile('.planning/v1.5-MILESTONE-AUDIT.md');
    if (c === null) return { pass: false, detail: 'v1.5-MILESTONE-AUDIT.md missing' };
    const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
    if (!fmMatch) return { pass: false, detail: 'frontmatter not found' };
    const fm = fmMatch[1];
    const issues = [];
    if (!/^milestone: v1\.5\s*$/m.test(fm)) issues.push('milestone: v1.5 missing');
    if (!/^status: passed\s*$/m.test(fm)) issues.push('status: passed missing');
    if (!/^scores:\s*$/m.test(fm)) issues.push('scores block missing');
    if (issues.length > 0) return { pass: false, detail: issues.join(' | ') };
    return { pass: true, detail: 'frontmatter: milestone v1.5 + status passed + scores block present' };
  }
}
```

### V-53-06 refresh — per-file scope-exemption approach

```javascript
// Source: check-phase-53.mjs lines 76-102 (V-53-06 body) — refresh target
// Change: split IDX from CO_MGMT_FILES in platform check
if (f === IDX) {
  // Phase 59 D-10 expanded IDX to cross-platform; accept any non-empty platform: value
  if (!/^platform:\s*\S/m.test(fm)) issues.push("platform field missing or empty");
} else {
  // 4 co-management content files retain strict platform: Windows contract
  if (!/^platform: Windows\s*$/m.test(fm)) issues.push("platform: Windows missing");
}
```

### V-53-22 refresh — scope-restrict to CO_MGMT_FILES

```javascript
// Source: check-phase-53.mjs lines 331-354 (V-53-22 body) — refresh target
// Change: iterate CO_MGMT_FILES instead of checking IDX
// (IDX legitimately has ops-domain H2s per Phase 59 D-10; co-management files must NOT)
const failures = [];
for (const f of CO_MGMT_FILES) { // was: const c = readFile(IDX)
  const c = readFile(f);
  if (c === null) { failures.push(f + ': file missing'); continue; }
  for (const { p, name } of banPatterns) {
    if (p.test(c)) failures.push(f + ': NEGATIVE regression-guard violated: ' + name);
  }
}
if (failures.length > 0) return { pass: false, detail: failures.join(' | ') };
return { pass: true, detail: '4 co-management files have no scaffold/ops-domain H2s (IDX exempted per Phase 59 D-10)' };
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| V-53-22 forbids ops H2s in docs/operations/00-index.md | V-53-22 scoped to 4 co-management files; 00-index.md exempted | Phase 59 D-10 (content change); Phase 61 D-03 (validator catch-up) | Removes the last chain regression; check-phase-60.mjs V-60-16 FAIL→PASS |
| V-53-06 requires `platform: Windows` on all ops files | V-53-06 requires `platform: Windows` on co-management files; permissive for 00-index.md | Phase 59 (content); Phase 61 D-02 (validator) | 00-index.md rightfully carries `platform: cross-platform` |
| check-phase-60.mjs reports 24 PASS / 1 FAIL | check-phase-60.mjs reports 25 PASS / 0 FAIL post-Plan-61-01 | Phase 61 Plan 61-01 | V-60-16 chain regression-guard flips FAIL→PASS |
| docs/index.md jump-link list has 5 bullets | docs/index.md jump-link list has 7 bullets (+ Linux + Operations) | Phase 61 Plan 61-01 | Completes hub navigation UX after Phase 59 H2 additions |

---

## Runtime State Inventory

> Phase 61 is not a rename/refactor/migration phase (no data or service renaming). Included for completeness per checklist.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — no renamed entity; v1.5 milestone close is documentation-only | None |
| Live service config | None | None |
| OS-registered state | None | None |
| Secrets/env vars | None | None |
| Build artifacts | None | None |

**Nothing found in any category** — verified by phase scope analysis. Phase 61 edits planning artifacts, validator files, and documentation markdown. No runtime systems involved.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | check-phase-61.mjs + all validators | Confirmed (CI spec: node-version: 20) | 20 (CI) | — |
| `node:fs`, `node:path`, `node:child_process` | All validators | Built-in | — | — |
| Git worktree | Plan 61-04 auditor-independence | Confirmed (project uses worktrees throughout) | — | — |
| v1.5-milestone-audit.mjs | Plan 61-04 terminal re-audit | Confirmed (12/12 PASS at Phase 60 close) | 606+ lines | — |
| check-phase-{48..60}.mjs | Plan 61-05 chain regression guards | All present (verified via deferred-items.md) | — | — |

No missing dependencies. All tooling confirmed available.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js ESM validators (no external test framework) |
| Config file | none — validators are standalone scripts |
| Quick run command | `node scripts/validation/check-phase-61.mjs --verbose` |
| Full suite command | `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/check-phase-61.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDIT-08 | v1.5-MILESTONE-AUDIT.md exists with required frontmatter + body | structural | V-61-13..16 in check-phase-61.mjs | ❌ Wave 0 (Plan 61-04 authors it) |
| CLEAN-01..04 | REQUIREMENTS.md checkboxes flipped | structural | V-61-01 in check-phase-61.mjs | ❌ Wave 0 (Plan 61-02 flips them) |
| All 57 | Harness exits 0 | integration | V-61-AUDIT subprocess | ✅ (v1.5-milestone-audit.mjs exists) |
| V-53-06+22 | check-phase-53.mjs V-53-22 PASS | integration | V-61-CHAIN subprocess | ✅ (check-phase-53.mjs exists; refresh in Plan 61-01) |
| MILESTONES | v1.5 entry present | structural | V-61-17..20 | ❌ Wave 0 (Plan 61-05 authors it) |

### Sampling Rate
- **Per task commit (Plan 61-01):** `node scripts/validation/check-phase-53.mjs --verbose && node scripts/validation/check-phase-60.mjs --verbose`
- **Per plan landing:** `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/check-phase-{48..60}.mjs`
- **Phase gate (Plan 61-05):** Full suite + `check-phase-61.mjs` green before close commit

### Wave 0 Gaps
- [ ] `scripts/validation/check-phase-61.mjs` — delivered by Plan 61-05; covers V-61-01..AUDIT
- [ ] `.planning/v1.5-MILESTONE-AUDIT.md` — delivered by Plan 61-04; V-61-13..16 asserts on it
- [ ] `.planning/MILESTONES.md` v1.5 entry — delivered by Plan 61-05; V-61-17..20 asserts on it

*(Plans 61-01..03 deliver preconditions; Plans 61-04..05 deliver the final artifacts)*

---

## Security Domain

> Security enforcement applies per project config. Phase 61 makes no authentication, authorization, or data handling changes. ASVS analysis abbreviated.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | No (validators read static files; no user input) | n/a |
| V6 Cryptography | No | — |

No security domain concerns for Phase 61. All work is static file editing (markdown, JSON, JavaScript) with no network calls, no user input processing, and no credential handling.

---

## Project Constraints (from CLAUDE.md)

The following directives from `CLAUDE.md` apply to Phase 61:

- **Node.js validators:** All `check-phase-NN.mjs` files must be Node.js ESM compatible; no CommonJS require. Confirmed by existing validator pattern.
- **No new code scaffolding integration:** Phase 61 makes no changes to PowerShell modules, Python backend, or React frontend. Code scaffolding remains dormant in v1.5 per explicit out-of-scope.
- **Documentation format:** Markdown files only; no tenant-specific content; generic Intune guidance.
- **Testing:** All validators self-test on write. Harness exits 0 is the close gate.
- **Security:** Never commit `.env` or credentials. Phase 61 doesn't touch any config files.
- **Audit all administrative actions:** AUDIT-08 close-out documents 75-finding inventory disposition — this IS the audit trail.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 50 VERIFICATION.md exists on disk with completion date and commit SHAs for LIN-03..06, LIN-13 | Standard Stack / REQUIREMENTS flip | Plan 61-02 will need alternate SHA source (Plan 50-NN-SUMMARY.md files) |
| A2 | Phase 56 VERIFICATION.md exists on disk with completion date for DRIFT-01..07 | Standard Stack / REQUIREMENTS flip | ROADMAP row shows "0/? Not started" (stale) — must find SHAs from SUMMARY.md files |
| A3 | check-phase-61.mjs CHAIN_PHASES array should include Phase 61 itself via V-61-AUDIT subprocess, not a recursive chain call | check-phase-61.mjs design | No circular subprocess; V-61-AUDIT invokes v1.5-milestone-audit.mjs (not check-phase-61.mjs) |
| A4 | `v1.5-MILESTONE-AUDIT.md` belongs in `.planning/` (not `.planning/milestones/`) based on CONTEXT D-15 reference "exists in `.planning/`" | v1.5-MILESTONE-AUDIT.md location | If it should be in `.planning/milestones/`, V-61-13 assertion path will fail |
| A5 | Plan 61-04 fresh-worktree check-phase-{48..60}.mjs results will all show PASS after Plan 61-01 validator refresh lands | Auditor-independence | If any Phase 51/58 chain regression re-surfaces (they self-resolved per 60-VERIFICATION.md lines 331-333), audit doc `tech_debt[]` must be populated |

**[ASSUMED] items needing verification:**

- A1 and A2 require reading `D:/claude/Autopilot/.planning/phases/50-*/50-VERIFICATION.md` and `D:/claude/Autopilot/.planning/phases/56-*/56-VERIFICATION.md` to get exact completion dates and commit SHAs before Plan 61-02 executes. [ASSUMED: both exist based on STATE.md confirming Phase 50 and 56 complete]

- A4: CONTEXT.md line 14 says "exists in `.planning/`" and D-15 references `.planning/v1.4-MILESTONE-AUDIT.md` is at `.planning/milestones/v1.4-MILESTONE-AUDIT.md`. Cross-check: `.planning/milestones/` directory has v1.4-MILESTONE-AUDIT.md. CONTEXT SC#2 says "`v1.5-MILESTONE-AUDIT.md` exists in `.planning/`" which could mean the `.planning/` root or a subdirectory. The v1.4 precedent is `.planning/milestones/`. [ASSUMED: same location as v1.4 = `.planning/milestones/` — but planner should confirm this from CONTEXT.md SC#2 wording vs. v1.4 artifact path]

---

## Open Questions

1. **v1.5-MILESTONE-AUDIT.md exact path: `.planning/` root or `.planning/milestones/`?**
   - What we know: CONTEXT.md SC#2 says "exists in `.planning/`"; v1.4-MILESTONE-AUDIT.md is at `.planning/milestones/v1.4-MILESTONE-AUDIT.md`
   - What's unclear: Whether "in `.planning/`" means root or any subdirectory; CONTEXT D-14..19 don't specify path
   - Recommendation: Use `.planning/milestones/v1.5-MILESTONE-AUDIT.md` to mirror v1.4 precedent; check-phase-61.mjs V-61-13 must use the same path

2. **Phase 50 and Phase 56 VERIFICATION.md availability for commit SHAs**
   - What we know: STATE.md confirms both phases complete; ROADMAP rows are stale (show 0/?/Not started)
   - What's unclear: Whether 50-VERIFICATION.md and 56-VERIFICATION.md have §Close Commits sections with exact SHAs needed for traceability comments
   - Recommendation: Plan 61-02 executor reads these files first; if SHAs absent, fall back to Plan-NN-SUMMARY.md commit lines

3. **check-phase-61.mjs CHAIN_PHASES exclusion list (Phase 50 exclusion pattern)**
   - What we know: check-phase-60.mjs CHAIN_PHASES intentionally excludes Phase 50 (stub validator per line 37 comment)
   - What's unclear: Whether check-phase-50.mjs is still a stub or has been fully authored during Phase 50 execution
   - Recommendation: Check if `check-phase-50.mjs` passes before including Phase 50 in CHAIN_PHASES; if still stubbed, exclude per Phase 60 precedent

4. **Does Plan 61-05 need a yml edit or does file-presence auto-activate?**
   - What we know: CONTEXT D-25 says "No yml edit required — file presence activates the slot." But the yml does NOT have a check-phase-61 slot (verified: yml ends at check-phase-60 at line 261-275).
   - What's unclear: Whether D-25's claim is accurate given the yml structure
   - Recommendation: D-25 appears to be incorrect about "no yml edit required" given the yml's current state. Plan 61-05 should add the yml slot alongside shipping check-phase-61.mjs. Raising as open question for planner.

---

## Sources

### Primary (HIGH confidence)
- `D:/claude/Autopilot/.planning/phases/61-gap-closure-terminal-re-audit-milestone-close/61-CONTEXT.md` — all locked decisions and CONTEXT sections
- `D:/claude/Autopilot/scripts/validation/check-phase-53.mjs` — V-53-06 line 86 + V-53-22 lines 331-354 + V-53-10 SCOPE_RESTRICTED pattern lines 149-165 [VERIFIED: read full file]
- `D:/claude/Autopilot/scripts/validation/check-phase-60.mjs` — chain regression pattern + subprocess invocation + harness exit gate [VERIFIED: read full file]
- `D:/claude/Autopilot/.planning/milestones/v1.4-MILESTONE-AUDIT.md` — frontmatter schema + re_audit_resolution pattern + body structure [VERIFIED: read full file 470 lines]
- `D:/claude/Autopilot/.planning/milestones/v1.4.1-phases/47-integration-re-audit/47-CONTEXT.md` — Phase 47 4-plan close structure + auditor-independence D-32 [VERIFIED: read full file]
- `D:/claude/Autopilot/.planning/milestones/v1.4.1-phases/47-integration-re-audit/47-VERIFICATION.md` — Phase 47 fresh worktree spawn record + commit `c7823c2` auditor agent `a2ad3fcf` [VERIFIED: read full file]
- `D:/claude/Autopilot/.planning/PROJECT.md` lines 170-289 — Closed Deferred Items v1.4→v1.4.1 pattern at line 234-241 [VERIFIED: read excerpt]
- `D:/claude/Autopilot/.planning/MILESTONES.md` — v1.4.1 entry shape lines 3-22 + v1.4 entry lines 24-53 [VERIFIED: read full file]
- `D:/claude/Autopilot/docs/operations/00-index.md` — platform: cross-platform frontmatter confirmed; 4 H2 sections confirmed [VERIFIED: read full file]
- `D:/claude/Autopilot/docs/index.md` — Choose Your Platform 5-bullet list lines 16-22 confirmed [VERIFIED: read full file 317 lines]
- `D:/claude/Autopilot/.planning/REQUIREMENTS.md` — 44 unchecked reqs confirmed + phase mapping table [VERIFIED: read full file]
- `D:/claude/Autopilot/.planning/STATE.md` — v1.5 progress 13/14 complete + phase decision log [VERIFIED: read full file]
- `D:/claude/Autopilot/scripts/validation/v1.5-audit-allowlist.json` — `phase: "60-audit-harness-v1-5-finalization"` confirmed; no phase-61 update needed [VERIFIED: read full file]
- `D:/claude/Autopilot/.github/workflows/audit-harness-v1.5-integrity.yml` — lazy-skip pattern at lines 261-275; NO check-phase-61 slot at current state [VERIFIED: read lines 255-293]
- `D:/claude/Autopilot/.planning/phases/60-audit-harness-v1-5-finalization/60-VERIFICATION.md` lines 325-345 — Pre-Existing Chain Regressions section confirming V-53-06+22 as out-of-Phase-60 scope [VERIFIED: read excerpt]
- `D:/claude/Autopilot/.planning/phases/60-audit-harness-v1-5-finalization/deferred-items.md` — check-phase-53 failure documentation [VERIFIED: read full file]

### Secondary (MEDIUM confidence)
- `D:/claude/Autopilot/.planning/todos/pending/2026-05-06-choose-your-platform-linux-operations-bullets.md` — todo §Solution verbatim bullet text + blockquote update requirement [VERIFIED: read full file]
- `D:/claude/Autopilot/.planning/ROADMAP.md` — Phase 61 ROADMAP entry at lines 414-424; §Progress stale rows at lines 479-492 [VERIFIED: grep confirmed]
- `D:/claude/Autopilot/.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-CONTEXT.md` lines 63-90 — D-10 authoritative superseding decision [VERIFIED: read excerpt]

---

## Metadata

**Confidence breakdown:**
- V-53-06/22 refresh mechanism: HIGH — both target code and precedent pattern (V-53-10) verified from actual source
- REQUIREMENTS.md flip surface: HIGH — REQUIREMENTS.md read in full; all 44 req IDs confirmed
- PROJECT.md "Closed Deferred Items" pattern: HIGH — read verbatim from PROJECT.md:234-241
- v1.5-MILESTONE-AUDIT.md schema: HIGH — read v1.4-MILESTONE-AUDIT.md full file
- MILESTONES.md entry shape: HIGH — read full MILESTONES.md
- Phase 47 mirror precedent: HIGH — read 47-CONTEXT.md + 47-VERIFICATION.md in full
- CI yml slot gap: HIGH — verified yml ends at check-phase-60 with no check-phase-61 slot
- check-phase-61.mjs assertion design: MEDIUM — D-24 enumerates ~15-20; exact count at plan-author discretion

**Research date:** 2026-05-07
**Valid until:** Stable (closing phase; no ongoing library evolution; all facts from codebase artifacts not external sources)
