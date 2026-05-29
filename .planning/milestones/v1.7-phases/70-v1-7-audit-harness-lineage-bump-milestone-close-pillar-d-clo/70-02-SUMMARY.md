---
phase: 70
plan: 70-02
subsystem: validation-tooling-harness-core
tags: [wave-2, atom-1, atomic-commit, harness-01, harness-02, baseline-11, v1.7-lineage-bump, path-a-inheritance]
dependency_graph:
  requires:
    - "70-CONTEXT.md D-02 LOCKED (Option C: two-atomic split; Atom 1 = harness-core)"
    - "70-CONTEXT.md D-01 LOCKED (per-assertion-class freshness rules; future Wave 3 consumes BASELINE_11)"
    - "70-CONVENTIONS.md §Chicken-and-Egg SHA Placeholder Convention (literal {phase_70_atom_1_SHA})"
    - "70-RESEARCH.md §HARNESS-01 E-01..E-06 (6 lineage edits)"
    - "70-RESEARCH.md §HARNESS-02 M-01..M-09 (sidecar JSON mutations)"
    - "70-RESEARCH.md §HARNESS-02 BASELINE_11 freshness comment text"
    - "70-RESEARCH.md §HARNESS-02 Atomic-Commit Dry-Run Protocol (5 steps a-e)"
    - "scripts/validation/v1.6-milestone-audit.mjs (Path-A source; 979 lines)"
    - "scripts/validation/v1.6-audit-allowlist.json (Path-A source; 121 lines)"
    - "scripts/validation/regenerate-supervision-pins.mjs (BASELINE_11 insertion target; 4 parseAllowlist sites)"
    - "Phase 66-02 commit 3a9a671 (literal 3-file ATOMIC precedent)"
  provides:
    - "scripts/validation/v1.7-milestone-audit.mjs NEW (HARNESS-01; Path-A from v1.6 with 6 lineage edits E-01..E-06; C1-C16 inherited verbatim)"
    - "scripts/validation/v1.7-audit-allowlist.json NEW (HARNESS-02; Path-A from v1.6 with M-01..M-09; c13_rotting_external CI-1/CI-2 post-SWEEP state; cron 0 8 1 1,4,7,10 *; c16:[])"
    - "scripts/validation/regenerate-supervision-pins.mjs MODIFIED (BASELINE_11 freshness comment + 4 parseAllowlist v1.6→v1.7 repoint at lines 290/336/431/433 pre-insertion)"
    - "Atom 1 atomic commit SHA 26a1ae9 (3-file indivisible per Phase 66-02 precedent)"
  affects:
    - "Plan 70-03 Wave 3 (Atom 2): consumes v1.7-milestone-audit.mjs as V-NN-AUDIT execFileSync target; consumes v1.7-audit-allowlist.json as sidecar via readSidecarAtV17Close()"
    - "Plan 70-05 Wave 5 Commit A: substitutes {phase_70_atom_1_SHA} placeholder in regenerate-supervision-pins.mjs BASELINE_11 comment (sed -i target)"
    - "Plan 70-04 Wave 4 (HARNESS-05 axis 1): fresh-clone re-audit invokes v1.7-milestone-audit.mjs as primary harness gate"
    - "Plan 70-05 HARNESS-06: milestone audit doc cites Atom 1 SHA 26a1ae9 in Command Verification Table"
tech_stack:
  added: []
  patterns:
    - "Path-A inheritance (byte-for-byte copy + surgical line edits per E-01..E-06)"
    - "Annotate-not-remove sidecar pattern (CI-2 6 entries with resolved_2026_05_26:true annotations)"
    - "ATOMIC 3-file indivisible commit (Phase 66-02 3a9a671 precedent literal compliance)"
    - "BASELINE_N freshness comment audit-trail (closes predecessor; never deletes predecessor commentary)"
    - "5-step pre-commit dry-run protocol (v1.7 harness + v1.7 self-test + supervision-pins self-test + v1.6 predecessor regression + chain-apex check-phase-66)"
    - "Literal SHA placeholder {phase_70_atom_1_SHA} (Plan 70-05 Commit A substitution target)"
key_files:
  created:
    - "scripts/validation/v1.7-milestone-audit.mjs"
    - "scripts/validation/v1.7-audit-allowlist.json"
  modified:
    - "scripts/validation/regenerate-supervision-pins.mjs"
decisions:
  - "Atom 1 commit SHA 26a1ae9 = 3 files exactly per D-02 LOCKED + Phase 66-02 3-file precedent (acceptance verified post-commit)"
  - "v1.7-milestone-audit.mjs identical line count to v1.6 source (979 lines); diff is exactly 6 line changes (E-01..E-06)"
  - "v1.7-audit-allowlist.json identical line count to v1.6 source (121 lines); M-01..M-09 mutations were 2-line edit (generated date + phase) since CI-1/CI-2/CI-3 already carried Phase 67 post-SWEEP state from prior phase commits 3fb8ca5 and 55260b3"
  - "BASELINE_11 freshness comment placed AFTER BASELINE_10 historical commentary (preserved as audit trail) and BEFORE const BASELINE_9 = [ declaration (line-coord array intact)"
  - "4 parseAllowlist call-sites repointed via Edit.replace_all (atomic 4-site v1.6→v1.7 substitution); BASELINE_10 historical commentary preserved (5 v1.6 references in comments remain)"
metrics:
  duration: "~25 minutes (sequential execution; one atomic commit)"
  completed: "2026-05-28T17:25Z"
  tasks_completed: 4
  files_created: 2
  files_modified: 1
  commits: 1
---

# Phase 70 Plan 70-02: ATOMIC harness-core — HARNESS-01 + HARNESS-02 + BASELINE_11 Summary

**One-liner:** Atom 1 atomic commit 26a1ae9 lands v1.7-milestone-audit.mjs NEW + v1.7-audit-allowlist.json NEW + regenerate-supervision-pins.mjs BASELINE_11 freshness comment + 4-site parseAllowlist v1.6→v1.7 repoint as ONE indivisible 3-file git SHA mirroring Phase 66-02 `3a9a671` precedent.

## Overview

Plan 70-02 (Wave 2 of Phase 70) executed the D-02 LOCKED **Atom 1** atomic commit — the harness-core indivisible foundation for v1.7 milestone-audit lineage. All 3 files were prepared in working tree across Tasks 1-3 (no per-task commits), validated via the 5-step pre-commit dry-run protocol, and committed in ONE git SHA `26a1ae9` per the Phase 66-02 3-file precedent.

The atom establishes the v1.7 harness-core surface so that Wave 3 Plan 70-03 (Atom 2) can author the HARNESS-03 validators + HARNESS-04 workflow YAML EXTEND on coherent provenance.

## Tasks Completed

### Task 1: Create v1.7-milestone-audit.mjs (HARNESS-01)

- Copied `scripts/validation/v1.6-milestone-audit.mjs` byte-for-byte (979 lines) to `scripts/validation/v1.7-milestone-audit.mjs` via `cp`.
- Applied EXACTLY 6 line edits per 70-RESEARCH.md §HARNESS-01:
  - E-01 (line 2): header docstring → v1.7 lineage `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7; C1-C16 inherited verbatim`
  - E-02 (line 3): source-of-truth reference → `.planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md (D-01..D-04)`
  - E-03 (line 4): sidecar comment → `scripts/validation/v1.7-audit-allowlist.json (v1.7 Path-A from v1.6 with c13_rotting_external reset for v1.7 per Phase 67 SWEEP-01/02 close-state)`
  - E-04 (line 5): frozen-predecessor anchor → `v1.6-milestone-audit.mjs pinned at Phase 66 close`
  - E-05 (line 35): usage docstring → `node scripts/validation/v1.7-milestone-audit.mjs [--verbose] [--self-test]`
  - E-06 (line 79): parseAllowlist path → `scripts/validation/v1.7-audit-allowlist.json`
- C1-C16 check bodies preserved verbatim (lines 246-808); self-test preserved verbatim (lines 816-940); runner preserved verbatim (lines 944-979); all helpers preserved.

### Task 2: Create v1.7-audit-allowlist.json (HARNESS-02 sidecar)

- Copied `scripts/validation/v1.6-audit-allowlist.json` byte-for-byte (121 lines) to `scripts/validation/v1.7-audit-allowlist.json` via `cp`.
- Applied M-01..M-09 mutations per 70-RESEARCH.md §HARNESS-02:
  - M-01: kept `schema_version: "1.1"` ✓
  - M-02: updated `generated` to `2026-05-28T00:00:00Z`
  - M-03: updated `phase` to `70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo`
  - M-04: `c13_rotting_external.ci_1_abm_urls` — 4 entries carry forward verbatim (each already had `last_revalidated: 2026-05-26` per Phase 67 Plan 67-01 `3fb8ca5`)
  - M-05: `c13_rotting_external.ci_2_vpp_location_token` — 6 entries verbatim with `resolved_2026_05_26: true` annotations (annotate-not-remove per Phase 67 Plan 67-02 `55260b3`)
  - M-06: `c13_rotting_external.ci_3_managed_apple_id` — KEEP-AS-IS verbatim (16-file enumeration; CI-3 v1.8+ deferred)
  - M-07: `c13_rotting_external.quarterly_audit.cadence` = `0 8 1 1,4,7,10 *` preserved; `next_review: 2026-07-01` preserved (Wave 2 landed pre-2026-07-01)
  - M-08: `c16_missing_endpoint_exemptions: []` empty preserved (Phase 65 atomic-trio cleared all)
  - M-09: all other keys (supervision_exemptions [20 entries], safetynet_exemptions, c7_knox_allowlist, cope_banned_phrases, c9_exemptions, c11_ops_exemptions/patterns, c13_broken_link_allowlist) — KEEP-AS-IS verbatim

### Task 3: Modify regenerate-supervision-pins.mjs (HARNESS-02 sub-contract)

Two coordinated edits:

- **Edit A (BASELINE_11 freshness comment):** Inserted 8-line block AFTER existing BASELINE_10 / Phase 68 Plan 68-02 carry-over commentary (preserved as audit trail) and BEFORE `const BASELINE_9 = [` declaration. Comment uses literal `{phase_70_atom_1_SHA}` placeholder per 70-CONVENTIONS.md §Chicken-and-Egg SHA Placeholder Convention (Plan 70-05 Commit A substitutes via `sed -i`). BASELINE_9 line-coord array intact (lines 80/82/182/199 + 5 other anchors unchanged).
- **Edit B (4-site parseAllowlist v1.6→v1.7 repoint):** Via `Edit replace_all`, replaced all 4 occurrences of `scripts/validation/v1.6-audit-allowlist.json` (at original lines 290/336/431/433; post-insert lines 290/336/439/441) with `scripts/validation/v1.7-audit-allowlist.json`. BASELINE_10 historical commentary preserved (5 `v1.6 sidecar`-style audit-trail references in comments remain untouched — those reference the prior milestone, not the active sidecar path).

### Task 4: ATOMIC commit + 5-step pre-commit dry-run

Pre-commit dry-run protocol (all 5 steps exit 0; required before staging the atomic commit):

| Step | Command | Result | Detail |
|------|---------|--------|--------|
| a | `node scripts/validation/v1.7-milestone-audit.mjs` | exit 0 | `Summary: 15 passed, 0 failed, 0 skipped` |
| b | `node scripts/validation/v1.7-milestone-audit.mjs --self-test` | exit 0 | `Self-test: 9 passed, 0 failed` |
| c | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | exit 0 | `Diff: identical`; `Un-pinned Tier-2 count: 0`; `Self-test: PASS` |
| d | `node scripts/validation/v1.6-milestone-audit.mjs` | exit 0 | `Summary: 15 passed, 0 failed, 0 skipped` (predecessor BYTE-UNCHANGED contract) |
| e | `node scripts/validation/check-phase-66.mjs` | exit 0 | `Result: 28 PASS, 0 FAIL, 0 SKIPPED` (chain-apex regression-guard) |

Staged exactly 3 files (`git diff --cached --name-only` returned 3 lines). Committed with HEREDOC message:

```
Subject: feat(70-02): ATOMIC v1.7 harness lineage bump (HARNESS-01/02 + BASELINE_11)
SHA: 26a1ae9
Files changed: 3, insertions(+): 1112, deletions(-): 4
```

## Post-Commit Acceptance Criteria — ALL VERIFIED

- [x] `git log -1 HEAD --name-only` shows EXACTLY 3 files: `scripts/validation/v1.7-milestone-audit.mjs`, `scripts/validation/v1.7-audit-allowlist.json`, `scripts/validation/regenerate-supervision-pins.mjs`
- [x] `node scripts/validation/v1.7-milestone-audit.mjs` exits 0 with `Summary: 15 passed, 0 failed, 0 skipped`
- [x] `node scripts/validation/v1.7-milestone-audit.mjs --self-test` exits 0 with `Self-test: 9 passed, 0 failed`
- [x] `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0
- [x] `node scripts/validation/v1.6-milestone-audit.mjs` exits 0 (predecessor regression-guard)
- [x] `node scripts/validation/check-phase-66.mjs` exits 0 with 28 PASS / 0 FAIL / 0 SKIPPED (chain-apex regression-guard)
- [x] `git diff HEAD~1 HEAD -- scripts/validation/v1.6-milestone-audit.mjs scripts/validation/v1.6-audit-allowlist.json` is EMPTY (predecessor BYTE-UNCHANGED contract — `git diff | wc -l` returned 0)
- [x] `grep -c 'v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7' scripts/validation/v1.7-milestone-audit.mjs` >= 1 (lineage docstring present)
- [x] `grep -c "scripts/validation/v1.7-audit-allowlist.json" scripts/validation/v1.7-milestone-audit.mjs` >= 1 (2 occurrences — sidecar comment + parseAllowlist call)
- [x] `grep -c "scripts/validation/v1.6-audit-allowlist.json" scripts/validation/v1.7-milestone-audit.mjs` == 0 (no stale v1.6 sidecar refs)
- [x] `grep -c "70-CONTEXT.md" scripts/validation/v1.7-milestone-audit.mjs` >= 1 (source-of-truth ref present)
- [x] `node -e ... JSON.parse(...)` v1.7-audit-allowlist.json shape: schema_version 1.1, phase=70-v1-7..., cron `0 8 1 1,4,7,10 *`, ci_1_abm_urls.length===4, ci_2_vpp_location_token.length===6, c16_missing_endpoint_exemptions.length===0, supervision_exemptions.length===20 ✓
- [x] `grep -c "scripts/validation/v1.6-audit-allowlist.json" scripts/validation/regenerate-supervision-pins.mjs` == 0
- [x] `grep -c "scripts/validation/v1.7-audit-allowlist.json" scripts/validation/regenerate-supervision-pins.mjs` == 4
- [x] `grep -c "BASELINE_11 refreshed" scripts/validation/regenerate-supervision-pins.mjs` == 1
- [x] `grep -c "Phase 70 Plan 70-02" scripts/validation/regenerate-supervision-pins.mjs` == 1
- [x] `grep -c "phase_70_atom_1_SHA" scripts/validation/regenerate-supervision-pins.mjs` == 1 (literal placeholder for Plan 70-05 Commit A sed -i target)
- [x] `grep -c "BASELINE_10" scripts/validation/regenerate-supervision-pins.mjs` >= 1 (5 occurrences — predecessor audit-trail commentary preserved)
- [x] `grep -cE "const BASELINE_9 = \[" scripts/validation/regenerate-supervision-pins.mjs` == 1 (declaration intact)
- [x] Line-count parity: v1.6-milestone-audit.mjs and v1.7-milestone-audit.mjs both 979 lines; diff is exactly 6 line changes (E-01..E-06)
- [x] C1-C16 check declaration parity: 15 `name: 'C` declarations in both v1.6 and v1.7 (C1-C7 + C9-C16; C8 absent in both per inheritance from v1.5)
- [x] Commit message contains `Atom 1 of D-02` + `HARNESS-01` + `HARNESS-02` + `BASELINE_11`

## Atomic Commit Boundary Evidence

```
$ git log -1 HEAD --pretty=format:'%h %s'
26a1ae9 feat(70-02): ATOMIC v1.7 harness lineage bump (HARNESS-01/02 + BASELINE_11)

$ git log -1 HEAD --name-only --pretty=format: | grep -v '^$' | sort
scripts/validation/regenerate-supervision-pins.mjs
scripts/validation/v1.7-audit-allowlist.json
scripts/validation/v1.7-milestone-audit.mjs

$ git log -1 HEAD --name-only --pretty=format: | grep -v '^$' | wc -l
3

$ git diff HEAD~1 HEAD --stat
 .../regenerate-supervision-pins.mjs   |    8 +
 .../v1.7-audit-allowlist.json         |  121 ++
 .../v1.7-milestone-audit.mjs          |  979 +++++++++++++++++
 3 files changed, 1112 insertions(+), 4 deletions(-)

$ git diff HEAD~1 HEAD -- scripts/validation/v1.6-milestone-audit.mjs scripts/validation/v1.6-audit-allowlist.json
(empty — predecessor BYTE-UNCHANGED invariant preserved)
```

## Deviations from Plan

**None** — plan executed exactly as written. All 6 line edits E-01..E-06 applied verbatim; all 9 mutations M-01..M-09 applied (with M-04/M-05/M-06/M-08 being no-ops because Phase 67 had already landed the post-SWEEP state into the v1.6 sidecar that the Path-A copy inherits); BASELINE_11 freshness comment placed at the correct insertion point; 4 parseAllowlist sites repointed via single `Edit replace_all`; 5-step dry-run protocol all green pre-commit; atomic commit landed in one git SHA per D-02 + Phase 66-02 precedent.

## Threat Mitigations Honored

| Threat ID | Disposition | Evidence |
|-----------|-------------|----------|
| T-70-V14 (atomic-commit indivisibility breach) | mitigated | `git log -1 HEAD --name-only` shows EXACTLY 3 files (verified post-commit) |
| T-70-02-PRED (predecessor byte-unchanged) | mitigated | `git diff HEAD~1 HEAD -- v1.6-milestone-audit.mjs v1.6-audit-allowlist.json` returned EMPTY (0 lines) |
| T-70-02-SIDECAR-DIV (provenance divergence) | mitigated | `grep -c "v1.6-audit-allowlist.json" regenerate-supervision-pins.mjs` == 0 (all 4 active sites repointed in same atomic commit) |
| T-70-02-SC (supply-chain) | accepted | Zero new npm dependencies; no package-manager installs |

## Forward Coordination

- **Plan 70-03 Wave 3 (Atom 2):** Will Path-A `check-phase-{67,68,69,70}.mjs` from `check-phase-66.mjs`, instantiate per-V-NN-NN bodies per 70-CONVENTIONS.md matrix, and EXTEND `.github/workflows/audit-harness-v1.7-integrity.yml` to repoint parse/path-match/harness-run jobs from v1.6 → v1.7 sidecar/harness lineage (provenance now coherent — this plan landed the v1.7 sidecar + harness so Atom 2 has a valid repoint target).
- **Plan 70-04 Wave 4 (HARNESS-05):** Will invoke `node scripts/validation/v1.7-milestone-audit.mjs --verbose` from fresh `git clone` into `$env:TEMP\v1.7-audit-<rand>` as Axis 1; `26a1ae9` is the first SHA at which this command can run.
- **Plan 70-05 Wave 5 Commit A:** Will substitute `{phase_70_atom_1_SHA}` placeholder in `scripts/validation/regenerate-supervision-pins.mjs` BASELINE_11 comment via `sed -i 's/{phase_70_atom_1_SHA}/26a1ae9/'`. (Also substitutes `{phase_70_close_SHA}` in 4 validator files — single 5-file commit per 70-CONVENTIONS.md §Single-SHA-Fill Commit Pattern.)
- **REQUIREMENTS.md HARNESS-01 + HARNESS-02:** Deliverables landed in this plan; closing SHA = `26a1ae9`. Plan 70-05 traceability closure marks rows Active → Validated with this closing SHA.

## Self-Check: PASSED

- [x] FOUND: `scripts/validation/v1.7-milestone-audit.mjs` (979 lines)
- [x] FOUND: `scripts/validation/v1.7-audit-allowlist.json` (121 lines, valid JSON)
- [x] FOUND: `scripts/validation/regenerate-supervision-pins.mjs` (modified with BASELINE_11 + 4-site repoint)
- [x] FOUND commit: `26a1ae9 feat(70-02): ATOMIC v1.7 harness lineage bump (HARNESS-01/02 + BASELINE_11)`
- [x] `git log --all --oneline -1 | grep -q "26a1ae9"` → success
