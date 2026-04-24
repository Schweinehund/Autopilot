---
phase: 43-v1-4-cleanup-audit-harness-fix
plan: 08
subsystem: infra
tags: [ci, github-actions, pre-commit, git-hooks, audit-harness, bootstrap, node, bash]

requires:
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: v1.4 harness + v1.4-audit-allowlist.json sidecar (Plan 01)
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: v1.4.1 harness + v1.4.1-audit-allowlist.json sidecar (Plan 02)
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: hand-authored supervision pins in both sidecars (Plan 03)
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: regenerate-supervision-pins.mjs advisory helper (Plan 04)
provides:
  - First CI workflow in the repo (.github/ bootstrap)
  - First git-hook artifact in the repo (scripts/hooks/ bootstrap)
  - Three-tier enforcement (pre-commit + PR + weekly scheduled)
  - Advisory pin-helper PR-comment integration (D-14/D-15)
  - Reproducible harness-invocation surface for all future PRs
affects: [phase-43-plan-10, phase-44, phase-45, phase-46, phase-47, all-future-android-phases]

tech-stack:
  added:
    - GitHub Actions (actions/checkout@v4, actions/setup-node@v4, actions/github-script@v7)
    - Git hooks (native bash + node-based JSON parser)
  patterns:
    - Minimum-surface CI bootstrap (no Husky / lefthook / pre-commit-framework)
    - Tiered enforcement (fast local hook + authoritative CI + weekly bitrot catch)
    - Advisory-only CI job via continue-on-error (D-14/D-15 pattern)
    - node -e for cross-platform JSON parse (Windows Git Bash + macOS + Linux)

key-files:
  created:
    - .github/workflows/audit-harness-integrity.yml
    - scripts/hooks/pre-commit.sh
    - scripts/hooks/README.md
  modified: []

key-decisions:
  - "Native shell + native GitHub Actions YAML over Husky/lefthook/pre-commit-framework (RESEARCH §8 minimum-surface principle — polyglot repo, no existing JS dev-tooling framework, ~10 lines of shell does the job)"
  - "4-job CI structure (parse / path-match / harness-run / pin-helper-advisory) matching D-08 three-tier enforcement + D-15 advisory"
  - "pin-helper-advisory job uses continue-on-error: true per D-14 — pin drift signal without blocking merge"
  - "Major-version pinning for third-party actions (actions/checkout@v4, setup-node@v4, github-script@v7); SHA-pin deferred to v1.5 security hardening"
  - "Hook installation left manual (documented cp+chmod) per RESEARCH Open Question 1 RESOLVED — no core.hooksPath mutation (requires user consent per CLAUDE.md)"
  - "node -e over jq for pre-commit JSON parse — portability across Windows Git Bash + macOS + Linux without requiring jq install"

patterns-established:
  - "Pattern CI-1: Bootstrap CI with minimum-surface (no framework deps) when repo is polyglot"
  - "Pattern CI-2: Advisory CI job (continue-on-error: true) for pin drift / lint-style signals that should surface without gating merge"
  - "Pattern CI-3: Tiered enforcement — fast local hook (~100ms) + authoritative PR CI + scheduled weekly bitrot catch"
  - "Pattern CI-4: node -e for cross-platform shell scripts when node is already a repo dep"

requirements-completed: [AEAUDIT-05]

duration: 3min
completed: 2026-04-24
---

# Phase 43 Plan 08: Audit Harness Integrity CI + Pre-Commit Hook Summary

**First CI surface for the repo: 4-job GitHub Action (parse/path-match/harness-run/pin-helper-advisory) + native-shell pre-commit hook validating both v1.4 and v1.4.1 audit allow-list sidecars.**

## Performance

- **Duration:** 3 min (166 seconds)
- **Started:** 2026-04-24T21:31:21Z
- **Completed:** 2026-04-24T21:34:07Z
- **Tasks:** 3
- **Files modified:** 3 (all created)

## Accomplishments

- Bootstrapped `.github/workflows/` directory — repo's first-ever CI surface
- Bootstrapped `scripts/hooks/` directory — repo's first-ever git-hook artifact
- Shipped 4-job GitHub Action implementing D-08 three-tier enforcement (PR + schedule + manual)
- Shipped `continue-on-error: true` pin-helper-advisory job implementing D-14/D-15 advisory PR-comment pattern
- Shipped native bash + node pre-commit hook validating both v1.4 and v1.4.1 sidecars (~100ms local check)
- Verified hook rejects malformed JSON via temporary corruption test, cleanly restored
- Zero new `package.json` dependencies (minimum-surface principle honored)
- Closed AEAUDIT-05 CI-bootstrap delta
- Landed commit-3 of the D-07 three-commit atomicity contract (rescue + scaffold + CI)

## Task Commits

Each task was executed; all three files committed atomically as one CI payload:

1. **Task 43-08-01: Create .github/workflows/ + audit-harness-integrity.yml** — staged into commit
2. **Task 43-08-02: Create scripts/hooks/ + pre-commit.sh + README.md** — staged into commit
3. **Task 43-08-03: Commit CI bootstrap payload** — `54bbc34` (`ci(43-08): audit harness integrity GitHub Action + pre-commit hook`)

All three new files land in commit `54bbc34` as a single atomic CI-bootstrap commit, satisfying D-07.3 atomicity (commit 3 of 3: rescue-scaffold-CI contract).

## Files Created/Modified

- `.github/workflows/audit-harness-integrity.yml` (92 lines) — 4-job CI: parse / path-match / harness-run / pin-helper-advisory; triggers pull_request (path-filtered) + schedule (weekly Monday 08:00 UTC) + workflow_dispatch; pinned to checkout@v4, setup-node@v4, github-script@v7
- `scripts/hooks/pre-commit.sh` (24 lines, +x) — native bash + node loop over both sidecars, `JSON.parse` via `node -e`, `set -e` fail-fast
- `scripts/hooks/README.md` (51 lines) — install instructions (`cp` + `chmod +x`), Husky/lefthook rejection rationale, uninstall guidance

## Decisions Made

- **Native shell + native YAML over Husky/lefthook** — RESEARCH §8 minimum-surface principle. Polyglot repo (PowerShell + Python + Node/TS) has no existing JS dev-tooling framework dependency; adding Husky as a dep for a single ~10-line hook violates "smallest surface that does the job."
- **Major-version pinning (`@v4`, `@v7`)** — Accepts GitHub's backward-compat contract for major versions. SHA-pinning deferred to v1.5 security hardening sweep. Documented in PATTERNS Third-party actions note.
- **Manual hook installation over `core.hooksPath`** — Setting `core.hooksPath` requires user consent per CLAUDE.md project config; leaves hook install manual (one `cp` + one `chmod`) per RESEARCH Open Question 1 RESOLVED.
- **4-job structure with explicit `needs:` chain** — parse → path-match → harness-run → pin-helper-advisory. Sequence matches cost (JSON parse is cheap, harness replay is expensive). Advisory job is `continue-on-error: true` so its status doesn't block merge.

## Deviations from Plan

None — plan executed exactly as written. All YAML content matches RESEARCH §8 / PATTERNS File 14 verbatim; shell script matches RESEARCH §8 / PATTERNS File 15 verbatim; README expanded from PATTERNS File 16 outline to include Windows PowerShell alternative install command (non-substantive elaboration — still honors the install+rationale contract).

## Issues Encountered

None. The "temporary JSON corruption test" confirmed hook correctly rejects malformed input and cleanly restores on uncorruption. Git's LF→CRLF line-ending warning on `git add` is benign (Windows host, standard for repo files authored with LF).

## User Setup Required

**Developers should install the pre-commit hook locally (one-time per clone):**

```bash
cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

See `scripts/hooks/README.md` for full instructions. This is optional — the CI tier (GitHub Action) is the authoritative enforcement gate. Local hook only provides faster feedback.

No external service configuration, no secrets, no environment variables required — this plan adds only in-repo CI/hook surface.

## Next Phase Readiness

**Unblocks:**
- Plan 43-10 (terminal sanity — runs the same harness invocations CI will run; local parity with CI)
- Plans 44/45/46 (content phases — every PR touching `scripts/validation/**` or Android docs will run the new CI)

**For Phase 47 re-audit:** Harness-invocation surface is now CI-verified on every PR. The same `v1.4.1-milestone-audit.mjs --verbose` command that CI runs is the terminal re-audit command — reproducibility locked.

**No blockers.** The three-commit atomicity contract (D-07.3) is complete: commit-1 rescue + commit-2 scaffold + commit-3 CI all landed.

## Self-Check

- **`.github/workflows/audit-harness-integrity.yml`** — FOUND (92 lines, 4 jobs verified)
- **`scripts/hooks/pre-commit.sh`** — FOUND (24 lines, +x, exits 0 on current tree)
- **`scripts/hooks/README.md`** — FOUND (51 lines, install + Husky-rejection rationale present)
- **Commit `54bbc34`** — FOUND (`git log --oneline | grep 54bbc34` confirmed)
- **All `<verification>` block items** — PASSED (V1–V9 all OK; 3 files in commit; pre-commit hook exits 0)
- **All `<success_criteria>` items** — PASSED (4 jobs present; continue-on-error on advisory; no `package.json` modifications; AEAUDIT-05 CI delta closed)

## Self-Check: PASSED

---
*Phase: 43-v1-4-cleanup-audit-harness-fix*
*Completed: 2026-04-24*
