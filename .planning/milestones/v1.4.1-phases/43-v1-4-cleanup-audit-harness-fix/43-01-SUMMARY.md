---
phase: 43-v1-4-cleanup-audit-harness-fix
plan: 01
subsystem: infra
tags: [audit-harness, allow-list, sidecar-json, git-restore, freeze-marker, atomicity, reproducibility-anchor]

# Dependency graph
requires:
  - phase: 42-integration-milestone-audit
    provides: "v1.4-audit-allowlist.json JSON sidecar at git commit e5e45db; v1.4-milestone-audit.mjs harness pinned at commit 3c3a140"
provides:
  - "scripts/validation/v1.4-audit-allowlist.json — persistent-path sidecar (4 SafetyNet + 9 supervision pins restored from git history)"
  - "scripts/validation/v1.4-milestone-audit.mjs — FROZEN at 3c3a140 with line-58 sidecar path updated to new persistent location"
  - "Reproducibility: v1.4 audit replayable from any branch without reliance on .planning/phases/42-* archive path"
affects: [43-02-harness-scaffold, 43-03-allowlist-expansion, 43-04-regenerate-supervision-pins-helper, 43-10-terminal-sanity, 44-knox, 45-aosp-per-oem, 46-cope, 47-integration-reaudit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pattern H (Phase 42 D-20/D-22): atomicity-same-commit contract for sidecar restore + harness sidecar-path update"
    - "Pattern K: git-history restore via `git show <sha>:<path> > <dest>`"

key-files:
  created:
    - "scripts/validation/v1.4-audit-allowlist.json"
  modified:
    - "scripts/validation/v1.4-milestone-audit.mjs"

key-decisions:
  - "FROZEN marker placed on LINE 2 (after shebang) rather than LINE 1 — Node.js ES module loader requires the shebang as line 1 for correct parsing. Plan's `<interfaces>` spec showed FROZEN above shebang; that ordering was a Rule-1 bug (harness became unrunnable). Shebang-first / FROZEN-second preserves D-02 intent (marker visible in lines 1-10) while keeping harness executable."
  - "D-02 freeze-marker content verbatim: `// FROZEN at commit 3c3a140 — see scripts/validation/v1.4.1-milestone-audit.mjs for active harness` (names 3c3a140 + points at v1.4.1)"
  - "Atomic rescue commit payload limited to 2 files (sidecar JSON + harness) per D-07 — no scope creep to Task 43-01's 3-task set"

patterns-established:
  - "Shebang stays on line 1 for Node ESM compatibility; meta-comments (FROZEN marker etc.) go on line 2+"
  - "D-07 atomicity-contract rescue commit: sidecar restore + harness path update in ONE commit (future bisects cleanly distinguish this from scaffold/CI commits)"

requirements-completed: []  # Plan 43-01 is the first step of AEAUDIT-02 (pin expansion) and AEAUDIT-05 (harness harden); both require follow-up plans to fully close. AEAUDIT-02 closes at Plan 43-03 (pin expansion 9→23); AEAUDIT-05 closes at Plan 43-04 (regenerate-supervision-pins.mjs helper) — see traceability in REQUIREMENTS.md.

# Metrics
duration: ~12min
completed: 2026-04-24
---

# Phase 43 Plan 01: v1.4 Audit Harness Rescue Summary

**Rescued v1.4 audit harness from silent-degradation state by restoring `v1.4-audit-allowlist.json` sidecar (4 SafetyNet + 9 supervision pins) to persistent path `scripts/validation/`, updating harness line 58 sidecar reference, and prepending a FROZEN-at-3c3a140 marker — all in ONE atomic commit `a868882`.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-24T20:18Z
- **Completed:** 2026-04-24T20:30Z
- **Tasks:** 3
- **Files modified:** 2 (1 created + 1 modified)

## Accomplishments

- Restored `scripts/validation/v1.4-audit-allowlist.json` verbatim from git commit `e5e45db` — 4 SafetyNet pins + 9 supervision pins, schema_version 1.0
- Updated `scripts/validation/v1.4-milestone-audit.mjs` line 58 (post-prepend) from archived path to persistent `scripts/validation/v1.4-audit-allowlist.json`
- Prepended FROZEN marker on line 2 of v1.4 harness naming commit `3c3a140` + pointing at `v1.4.1-milestone-audit.mjs` (shebang preserved on line 1 for Node ESM parseability)
- v1.4 harness now runs end-to-end from master — sidecar loads successfully (C1 PASS confirms exemptions were consulted); exit code 1 from C2/C5 expected failures routed to Plans 43-03 / 43-05
- Reproducibility anchor commit `3c3a140` is replay-able from any branch — no dependence on the deleted `.planning/phases/42-*/v1.4-audit-allowlist.json` archive path

## Task Commits

All three tasks landed in ONE atomic commit per D-07 rescue-commit contract:

1. **Task 43-01-01: Restore v1.4 allow-list sidecar from git commit e5e45db** — part of `a868882`
2. **Task 43-01-02: Update v1.4 harness line 57 + prepend FROZEN marker** — part of `a868882`
3. **Task 43-01-03: Verify harness runs end-to-end post-rescue + commit** — landed `a868882`

**Rescue commit:** `a868882` — `chore(43-01): rescue v1.4 allow-list sidecar + freeze v1.4 harness at 3c3a140`

## Files Created/Modified

- `scripts/validation/v1.4-audit-allowlist.json` **(created)** — JSON sidecar; `{ schema_version, generated, phase, safetynet_exemptions[4], supervision_exemptions[9] }`. Verbatim restore from git blob at commit `e5e45db` path `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`.
- `scripts/validation/v1.4-milestone-audit.mjs` **(modified, 2 surgical edits only per Pattern Map File 2)**:
  - Line 2 (prepend): `// FROZEN at commit 3c3a140 — see scripts/validation/v1.4.1-milestone-audit.mjs for active harness`
  - Line 58 (was line 57; renumbered by prepend): sidecar path updated `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` → `scripts/validation/v1.4-audit-allowlist.json`
  - All other lines unchanged (forbidden-changes list enforced: no `androidDocPaths()` touch, no new C6/C7/C9 checks, no C5 logic changes — those land in v1.4.1 only per Plan 43-02)

## Post-Rescue Harness Shape

Run `node scripts/validation/v1.4-milestone-audit.mjs --verbose` produces:

```
[1/5] C1: Zero SafetyNet as compliance mechanism ........ PASS
[2/5] C2: Zero supervision as Android mgmt term ......... FAIL -- 27 un-exempted supervision reference(s)
[3/5] C3: AOSP stub word count within Phase 39 envelope . PASS (informational — body 1089 words vs envelope 600-900)
[4/5] C4: Zero Android links in deferred shared files ... PASS
[5/5] C5: last_verified frontmatter on all Android docs . FAIL -- 5 freshness violation(s)

Summary: 3 passed, 2 failed, 0 skipped
Exit code: 1
```

This matches RESEARCH §2 "Commit-1 (rescue) payload" expected shape verbatim. **The key success signal is that C1 PASS proves the sidecar loaded** — if sidecar parse had failed silently, C1 would FAIL with "all 4 SafetyNet occurrences unexempted".

Downstream remediation routing:
- **C2 (27 unexempted supervision)** → Plan 43-03 expands `supervision_exemptions[]` from 9 → ~23 pins
- **C3 informational 1089w** → Plan 43-07 AOSP stub trim to ~700 words
- **C5 5 freshness findings** → Plan 43-05 L2 runbook 18-21 `review_by` normalization + Plan 43-02 template sentinel (covers `admin-template-android.md` frontmatter-missing violation via v1.4.1 harness scope-filter)

## Decisions Made

- **FROZEN marker on line 2, not line 1** — Rule-1 auto-fix (see Deviations below). Preserves D-02 intent (marker in lines 1-10) while keeping harness Node-executable.
- Followed plan task order 43-01-01 → 43-01-02 → 43-01-03 with atomic commit at end (Pattern H D-07 contract).
- NO edits to any v1.4 harness line beyond the 2 surgical edits specified — forbidden-changes list preserved (scope-filter, C6/C7/C9 checks, C5 sentinel-parse all reserved for v1.4.1 harness in Plan 43-02).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] FROZEN marker placement above shebang broke Node ESM module loader**
- **Found during:** Task 43-01-03 (harness end-to-end verification)
- **Issue:** The plan's `<interfaces>` block (PLAN.md lines 75-79) and 43-PATTERNS.md File 2 Edit A diff showed the freeze-marker prepended ABOVE the shebang:
  ```
  // FROZEN at commit 3c3a140 — see ...
  #!/usr/bin/env node
  ```
  Running `node scripts/validation/v1.4-milestone-audit.mjs --verbose` after that edit produced `SyntaxError: Invalid or unexpected token` at line 2 col 0 — Node's ES module loader requires the shebang on line 1; a preceding comment makes the file fail `compileSourceTextModule`. Without the fix, the rescue would ship a broken harness (worse than the pre-rescue silent-degradation state).
- **Fix:** Swapped line-1 and line-2 content so the shebang stays on line 1 and the FROZEN marker moves to line 2. Still satisfies D-02 (marker visible at top of file, names 3c3a140, points at v1.4.1-milestone-audit.mjs) and the prompt's explicit "FROZEN header near top (line 1-10 area)" constraint.
- **Files modified:** `scripts/validation/v1.4-milestone-audit.mjs` (one additional Edit call swapping lines 1-2)
- **Verification:** `node scripts/validation/v1.4-milestone-audit.mjs --verbose` now runs cleanly with exit code 1 (C1/C3/C4 PASS, C2/C5 expected FAIL); `head -n 2 scripts/validation/v1.4-milestone-audit.mjs` shows shebang then FROZEN marker.
- **Committed in:** `a868882` (Task 43-01-02 fix, rolled into the atomic rescue commit)

---

**Total deviations:** 1 auto-fixed (1 Rule-1 bug — plan spec vs Node runtime constraint)
**Impact on plan:** Zero scope creep; the fix preserves D-02 semantic intent exactly (marker in lines 1-10 naming 3c3a140 + pointing at v1.4.1). All original success criteria met. Recommendation for Plan 43-02: when v1.4.1 harness is created via `cp v1.4-milestone-audit.mjs v1.4.1-milestone-audit.mjs`, the REPLACE-header-block edit described in 43-PATTERNS.md File 3 Edit 1 should keep the shebang on line 1 (drop any FROZEN-above-shebang fragment before running the file).

## Issues Encountered

- None beyond the Rule-1 auto-fix documented above.

## User Setup Required

None — tooling-only phase; no external service configuration.

## Unblocks

- **Plan 43-02** (v1.4.1 harness scaffold): sidecar path now stable; `cp v1.4-milestone-audit.mjs v1.4.1-milestone-audit.mjs` preserves the working sidecar reference (to be re-pointed at v1.4.1-audit-allowlist.json in additive edits).
- **Plan 43-03** (allow-list pin expansion): working sidecar file to extend from 9 → ~23 supervision_exemptions[].
- **Plan 43-04** (regenerate-supervision-pins.mjs helper): --self-test dogfood target is the pin set in the rescued JSON file.
- **Plan 43-10** (terminal sanity): both v1.4 and v1.4.1 harnesses now have loadable sidecars — v1.4 should PASS C1 and remain the reproducibility anchor.
- **Phase 44 (Knox) / 45 (AOSP per-OEM) / 46 (COPE) / 47 (integration re-audit)**: transitively unblocked — downstream phases inherit Plan 43's stable tooling baseline.

## Next Phase Readiness

- v1.4 harness is NOW frozen-and-working from master: reproducibility anchor `3c3a140` replay from any branch produces deterministic output.
- Plan 43-02 (next in wave sequence) can proceed: cp the v1.4 harness to v1.4.1, drop FROZEN marker fragment, apply 6 additive edits per 43-PATTERNS.md File 3.
- No blockers introduced by this plan.

## Self-Check: PASSED

**Verification run 2026-04-24T20:30Z:**

| Check | Claim | Result |
|-------|-------|--------|
| File exists | `scripts/validation/v1.4-audit-allowlist.json` | FOUND |
| File parses | `JSON.parse(...)` succeeds | OK |
| Pin counts | safetynet=4, supervision=9 | OK |
| Harness references new path | `grep "readFile('scripts/validation/v1.4-audit-allowlist.json')"` | OK |
| FROZEN marker present | `head -n 10 ... | grep "FROZEN at commit 3c3a140"` | OK |
| Harness exits ≤1 | rc=1 (C2/C5 expected FAIL, not infra error) | OK |
| Rescue commit exists | `git log --oneline | grep a868882` | `a868882 chore(43-01): rescue v1.4 allow-list sidecar + freeze v1.4 harness at 3c3a140` FOUND |
| Both files in same commit | `git show --stat a868882` | 2 files: allow-list (new) + harness (modified) |
| No unexpected deletions | `git diff --diff-filter=D --name-only HEAD~1 HEAD` | empty (clean) |

All claims verified. Plan 43-01 complete.

---
*Phase: 43-v1-4-cleanup-audit-harness-fix*
*Plan: 01 (rescue commit — wave 1 of 7)*
*Completed: 2026-04-24*
