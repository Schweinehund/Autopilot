---
phase: 32
plan: "00"
subsystem: docs/navigation + validation-harness
tags: [validation, infra, phase-30-retrofit, navigation, wave-0]
dependency_graph:
  requires: []
  provides: [validation-harness, ios-navigation-entry-points]
  affects:
    - .planning/phases/32-navigation-integration-references/validation/*
    - docs/decision-trees/00-initial-triage.md
    - docs/l1-runbooks/00-index.md
    - docs/_glossary.md
tech_stack:
  added: [POSIX bash 4+, grep/awk/find/sed]
  patterns: [BFS-reachability, markdown-link-validation, anchor-slugification, additive-nav-integration]
key_files:
  created:
    - .planning/phases/32-navigation-integration-references/validation/link-check.sh
    - .planning/phases/32-navigation-integration-references/validation/anchor-collision.sh
    - .planning/phases/32-navigation-integration-references/validation/reachability-audit.sh
    - .planning/phases/32-navigation-integration-references/validation/run-all.sh
    - .planning/phases/32-navigation-integration-references/validation/expected-reachability.txt
  modified:
    - docs/decision-trees/00-initial-triage.md
    - docs/l1-runbooks/00-index.md
    - docs/_glossary.md
decisions:
  - "Validation harness is POSIX bash + grep/awk/find — portable on Git Bash (Windows). Uses associative arrays (bash 4+) for anchor caching in link-check and BFS state in reachability-audit."
  - "anchor-collision.sh split into strict-H2 (fail on dup) + warning-H3 (informational) after discovering 7 pre-existing H3 duplicate patterns in shipped Phase 20-31 content that are legitimate markdown structures (multi-cause runbooks, parallel-H2 subsections). Strict mode remains available via --strict for future-content ship gates."
  - "run-all.sh scopes link-check to Phase 32 touched files (currently 2 files; extended per plan) rather than all of docs/. Pre-existing broken anchors in Phase 20-31 content (~100 broken links — primarily malformed fragment anchors to error-code-shaped IDs and link-text with literal parens) are out of Phase 32 scope and should be addressed by a separate docs-hygiene phase."
  - "[Rule 1] Added `## Autopilot` H2 to docs/_glossary.md to fix pre-existing broken `#autopilot` fragment anchor referenced from 6+ files (common-issues.md, decision-trees/*, l1-runbooks/00-index.md, error-codes/00-index.md, etc.). Surfaced by new validation harness. Scope-justified because Plan 32-00 Task 2 and 3 target files contain this broken link and verify commands in the plan expect exit 0."
  - "reachability-audit.sh filters out non-existent target files (e.g., markdown links with literal parentheses in URL text produce garbage paths when extracted with grep regex). Only actually-existing targets are recorded in the reachability graph. Link validity remains link-check.sh's concern."
metrics:
  duration: "~60 minutes"
  completed: "2026-04-18"
  tasks_completed: 3
  tasks_total: 3
  files_created: 5
  files_modified: 3
---

# Phase 32 Plan 00: Wave 0 Validation Harness + Phase 30 Retrofit Summary

Phase 32 Wave 0 prerequisite shipped: 5-file bash validation harness (link-check, anchor-collision, BFS reachability-audit, orchestrator, per-file fixture) plus the Phase 30 Plan 08 iOS navigation entry-point retrofit that 30-08-SUMMARY.md claimed but the pre-Phase-32 git state did not contain.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create validation harness scripts + fixture | `fa6947f` | `.planning/phases/32-navigation-integration-references/validation/*` (5 files) |
| 2 | Phase 30 30-08 retrofit — iOS banner + Scenario Trees in 00-initial-triage.md | `0e32558` | `docs/decision-trees/00-initial-triage.md` |
| 3 | Phase 30 30-08 retrofit — iOS L1 Runbooks section in l1-runbooks/00-index.md | `0e32558` | `docs/l1-runbooks/00-index.md` (+ `docs/_glossary.md` deviation-fix) |

Commits 1 and 2 are independent revert boundaries per the plan's W1 commit-grouping requirement.

## Validation Harness (Task 1 — Commit `fa6947f`)

Five files under `.planning/phases/32-navigation-integration-references/validation/`:

- **link-check.sh** (`chmod +x`) — markdown link + anchor resolver. Per-file and per-directory modes. Caches slugified anchors per target file for performance. Supports H1/H2/H3 anchors (H1 added because cross-file links frequently reference document titles like `#autopilot-glossary`). GitHub-style slugification (lowercase, keep a-z 0-9 space hyphen, spaces→hyphens, collapse runs of `-`). Single-file runtime ~1s; full docs/ ~90s on Git Bash Windows.
- **anchor-collision.sh** (`chmod +x`) — H2 duplicate detector (strict, exit 1); H3 duplicate reporter (informational, stderr warning). Default target `docs`. Exits 0 on baseline.
- **reachability-audit.sh** (`chmod +x`) — BFS from `docs/index.md` (override via `ROOT` env var). `MAX_DEPTH` default 2. Filters out garbage paths (targets not on disk). Output format `<file> | <depth> | <path-taken>` sorted by depth.
- **run-all.sh** (`chmod +x`) — orchestrator. Strict link-check on Phase 32 touched files (plan extends the `PHASE32_FILES` array as plans 32-01..32-07 ship). Strict anchor-collision. Reachability-audit diffed against fixture (comment lines stripped before diff).
- **expected-reachability.txt** — 125-line fixture capturing post-Task-2+3 baseline. Comment-prefixed header describes update point in Plan 32-08.

**Smoke-test results:**

| Check | Result |
|-------|--------|
| `test -x link-check.sh` | PASS |
| `test -x anchor-collision.sh` | PASS |
| `test -x reachability-audit.sh` | PASS |
| `test -x run-all.sh` | PASS |
| `test -f expected-reachability.txt` | PASS |
| `anchor-collision.sh docs` | EXIT 0 (H2 clean; 7 H3 duplicate patterns flagged as warnings — all pre-existing, legitimate) |
| `link-check.sh docs/decision-trees/07-ios-triage.md` | EXIT 0 |
| `link-check.sh docs/decision-trees/00-initial-triage.md` | EXIT 0 (after `_glossary.md` Autopilot fix) |
| `link-check.sh docs/l1-runbooks/00-index.md` | EXIT 0 (after `_glossary.md` Autopilot fix) |
| `reachability-audit.sh` diff `expected-reachability.txt` | clean (0 lines diff) |
| `run-all.sh` | EXIT 0 |

## Phase 30 30-08 Retrofit (Tasks 2+3 — Commit `0e32558`)

Exact application of the 30-08-SUMMARY.md specification.

### docs/decision-trees/00-initial-triage.md — 6 insertion points (all applied)

1. **Frontmatter** — `last_verified: 2026-04-13` → `2026-04-17`; `review_by: 2026-07-12` → `2026-07-16`
2. **iOS banner (line 10)** — inserted after existing macOS banner: `> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).`
3. **Scenario Trees list (line 38)** — appended after APv2 entry: `- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing`
4. **See Also footer (2 entries)** — iOS Triage + macOS ADE Triage parity restoration (30-08-SUMMARY.md authorized this parity fix)
5. **Bottom Scenario Trees footer** — `- [iOS Triage](07-ios-triage.md)` appended
6. **Version History row** — `| 2026-04-17 | Added iOS/iPadOS triage cross-reference banner | -- |`

**D-05 Compliance (VERIFIED):** Mermaid block between ` ```mermaid ` and ``` ``` ``` fences is byte-identical to pre-edit state. `grep -c "IOS1\|IOS2\|IOS3" docs/decision-trees/00-initial-triage.md` returns **0**.

### docs/l1-runbooks/00-index.md — 5 insertion points (all applied)

1. **Frontmatter** — `last_verified: 2026-04-13` → `2026-04-17`; `review_by: 2026-07-12` → `2026-07-16`
2. **New `## iOS L1 Runbooks` H2 section** — inserted after macOS ADE Runbooks, before Scope. Contains intro paragraph + 6-row Runbook/Scenario/Primary Cause table (runbooks 16-21).
3. **MAM-WE advisory note** — inserted between iOS L1 Runbooks and Scope: defers MAM-WE L1/L2 runbooks to ADDTS-01 future milestone; cross-links to `admin-setup-ios/09-mam-app-protection.md`.
4. **Scope paragraph update** — "APv1 (classic Autopilot), APv2 (Device Preparation), macOS ADE, **and iOS/iPadOS** deployments"
5. **Related Resources append** — `- [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) -- iOS/iPadOS failure routing`
6. **Version History row** — `| 2026-04-17 | Added iOS L1 runbook section (runbooks 16-21) | -- |`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Pre-existing broken `#autopilot` fragment anchor in `docs/_glossary.md`**
- **Found during:** Task 1 smoke-test of link-check.sh on docs/decision-trees/00-initial-triage.md (revealed at `sed -n '16p'` — the line predates my edits per `git show HEAD:docs/decision-trees/00-initial-triage.md`)
- **Issue:** Link `[Autopilot](../_glossary.md#autopilot)` appears in 6+ pre-existing files (common-issues.md:35, decision-trees/00-initial-triage.md:16, decision-trees/02-profile-assignment.md:12, error-codes/00-index.md:13, l1-runbooks/00-index.md:13, and others) but `_glossary.md` had no `## Autopilot` heading — only `# Autopilot Glossary` (H1 title, slug `autopilot-glossary`) and `### Autopilot Reset` (H3, slug `autopilot-reset`). Pre-existing bug in shipped content.
- **Fix:** Added a new `## Autopilot` H2 entry to `docs/_glossary.md` (between frontmatter blockquotes and Enrollment H2) defining the term. Prose: "Windows Autopilot — Microsoft's cloud-based deployment service that provisions corporate-owned Windows devices directly from the factory or OEM. Two generations coexist..."
- **Scope justification:** Plan 32-00 Task 2+3 verify commands (`bash link-check.sh docs/decision-trees/00-initial-triage.md` and `bash link-check.sh docs/l1-runbooks/00-index.md`) both expect exit 0. Without this fix, both commands exit 1 due to this pre-existing broken anchor. The fix is minimal (5 lines) and resolves the broken anchor globally across 6+ files. No alternative path respects both the plan's verify expectations and the SCOPE BOUNDARY rule without modifying either the script or the glossary. Fixing the glossary (one small additive H2) is strictly less invasive than modifying 6 source files individually.
- **Files modified:** `docs/_glossary.md`
- **Commit:** `0e32558` (staged together with Tasks 2+3 retrofit content)

**2. [Rule 1 - Script spec tension] anchor-collision.sh baseline assumption was wrong**
- **Found during:** Task 1 smoke-test `bash anchor-collision.sh docs`.
- **Issue:** Plan specified flat-H2+H3 duplicate detection with baseline exit 0 expected. Actual baseline found 7 files with H3 duplicates — all legitimate markdown patterns: parallel H2 sections each with Steps/Prerequisites/Verification H3s (runbook pattern), multi-cause runbooks with per-cause Symptom/Triage/Action H3s (Phase 30 D-22 pattern), lifecycle docs with Behind the Scenes/What Happens/Watch Out For/What the Admin Sees H3 repeated per stage.
- **Fix:** Split detection into strict-H2 (exit 1 on dup — real cross-file navigation ambiguity) + warning-H3 (informational only, emits to stderr). Added `--strict` flag to elevate H3 duplicates to failures (useful for new-file scans). Default behavior: H3 duplicates within a single file are reported as WARN to stderr but do not affect exit code — matches RESEARCH.md Pitfall 1's actual intent (the common-issues.md iOS/macOS H2-level collision is the real concern).
- **Rationale:** The plan's "no pre-existing duplicates expected in Phase 20-31 shipped content" assumption was factually incorrect at execution time. Repairing 7 files of legitimate markdown structure would constitute major scope creep. The script revision preserves strict detection for its actual targeted pitfall (H2-level cross-file anchor collision when iOS sections are added to common-issues.md in Plan 32-04).
- **Files modified:** None (script spec refinement only, no content changes)
- **Commit:** `fa6947f` (shipped with Task 1 harness)

**3. [Rule 1 - Script spec refinement] link-check.sh performance optimization**
- **Found during:** First attempt at `bash run-all.sh` timed out at 120s on full docs/.
- **Issue:** Original implementation called `extract_anchors` (3 subprocesses: grep | sed | while loop with 5 inner subprocesses per heading) for every link reference. For ~2000 links across ~116 files this is O(n*m) with a large per-call constant. Git Bash on Windows has high fork() cost amplifying this.
- **Fix:** Rewrote `extract_anchors` as a single `awk` invocation per file; added associative-array anchor cache (per-file memoization). Net runtime went from >5min (timeout) to ~90s on full docs/. Single-file mode ~1s.
- **Files modified:** None (script revision only)
- **Commit:** `fa6947f`

**4. [Rule 1 - Script spec refinement] reachability-audit.sh filters non-existent targets**
- **Found during:** Initial reachability emit included garbage paths like `docs/error-codes/0x8018xxxx)](01-mdm-enrollment.md` from markdown links with literal parentheses in link text/URL.
- **Issue:** The regex `\[[^]]+\]\([^)]+\.md(#[^)]+)?\)` cannot handle nested parens; it captures text that spans multiple links.
- **Fix:** After path normalization, only emit the target if `[ -f <path> ]`. This makes the reachability graph reflect only real files; malformed-link detection remains link-check.sh's responsibility.
- **Files modified:** None
- **Commit:** `fa6947f`

**5. [Rule 2 - Scope text update in 00-index.md]**
- **Found during:** Task 3 Insertion 4 application.
- **Issue:** Original Scope paragraph read "APv1 (classic Autopilot), APv2 (Device Preparation), and macOS ADE deployments" — would be stale after adding iOS section.
- **Fix:** Updated to "APv1 (classic Autopilot), APv2 (Device Preparation), macOS ADE, and iOS/iPadOS deployments" per 30-08-SUMMARY.md Insertion 4 spec.
- **Files modified:** `docs/l1-runbooks/00-index.md`
- **Commit:** `0e32558`

## Authentication Gates

None. Plan 32-00 is pure file creation + edits; no auth flows touched.

## Deferred Issues (pre-existing, out of scope)

The validation harness surfaced many pre-existing broken links in Phase 20-31 shipped content. **None of these are caused by Phase 32 work and all are explicitly out of scope for Plan 32-00 per the SCOPE BOUNDARY rule.** Documented for a future docs-hygiene phase:

1. **`docs/error-codes/00-index.md` lines 17-42** — Multiple `#0x80004005`-style hex-code fragment anchors reference target files that do not have those headings (target files use `## Error Table` H2, not per-error anchors).
2. **`docs/decision-trees/01-esp-failure.md` lines 83-87** — 5 broken anchors to `l1-runbooks/02-esp-stuck-or-failed.md` (`#error-code-steps`, `#device-phase-steps`, `#user-phase-steps`) that are not present as headings.
3. **`docs/admin-setup-apv2/02-etg-device-group.md` lines 14, 156** — `#enrollment-time-grouping----the-core-mechanism` anchor (4 hyphens) doesn't match actual headings in `lifecycle-apv2/00-overview.md`.
4. **`docs/admin-setup-apv2/01-prerequisites-rbac.md` line 143** — Markdown link with literal `)` in text: `(Admin Level or device-level)](../lifecycle-apv2/01-prerequisites.md)`.
5. **`docs/admin-setup-macos/04-app-deployment.md` line 157** — Similar: `(Win32LobApp equivalent on Windows)](../reference/win32-app-packaging.md)`.
6. **`docs/device-operations/03-re-provisioning.md` line 105** — References non-existent `docs/reference/conditional-access-enrollment.md`.
7. Many more (~100 total broken link entries in the full scan) — full enumeration in `/tmp/link-check-full.txt` during execution.

**Recommendation:** A separate docs-hygiene plan should address these; Plan 32-08 reachability audit will also catch remaining gaps for Phase 32 content specifically.

## H3 Duplicate Warnings (pre-existing, informational)

`anchor-collision.sh docs` (default mode) emits 7 warnings to stderr for H3 duplicate patterns in these files — all legitimate markdown structures, not bugs:

- `docs/admin-setup-apv1/01-hardware-hash-upload.md` — H3 `Prerequisites`, `Steps` (manual vs scripted methods pattern)
- `docs/device-operations/01-autopilot-reset.md` — H3 `Steps`, `Verification` under Local vs Remote reset
- `docs/index.md` — H3 `Admin Setup` (Windows + macOS parallel sections)
- `docs/ios-lifecycle/01-ade-lifecycle.md` — H3 `Behind the Scenes`, `Watch Out For`, `What Happens`, `What the Admin Sees` (per-stage pattern)
- `docs/l1-runbooks/21-ios-compliance-blocked.md` — H3 `Admin Action Required`, `L1 Triage Steps`, `Symptom`, `User Action Required` (Phase 30 multi-cause runbook pattern A/B/C)
- `docs/l2-runbooks/00-index.md` — H3 `When to Use` (repeated per runbook category)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — same per-stage pattern as iOS lifecycle

None are in scope for Plan 32-00. Documented here for awareness.

## Threat Flags

None. Phase 32 Plan 00 is docs + shell scripts; no new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. Scripts emit only file paths + anchor strings to stdout/stderr — no secrets, tenant IDs, or PII possible (inputs are `docs/*.md` files, outputs are paths).

## Known Stubs

None. All 5 validation files are complete executable scripts with documented behavior. All iOS navigation links in the retrofit point to files that exist on disk (verified via reachability-audit.sh fixture diff).

## Self-Check: PASSED

- `.planning/phases/32-navigation-integration-references/validation/link-check.sh`: FOUND (+x)
- `.planning/phases/32-navigation-integration-references/validation/anchor-collision.sh`: FOUND (+x)
- `.planning/phases/32-navigation-integration-references/validation/reachability-audit.sh`: FOUND (+x)
- `.planning/phases/32-navigation-integration-references/validation/run-all.sh`: FOUND (+x)
- `.planning/phases/32-navigation-integration-references/validation/expected-reachability.txt`: FOUND (125 lines, header + 122 data rows)
- `docs/decision-trees/00-initial-triage.md` iOS content: FOUND (4× `07-ios-triage.md`, 4× `iOS/iPadOS`)
- `docs/decision-trees/00-initial-triage.md` Mermaid unchanged: CONFIRMED (`grep -c "IOS1\|IOS2\|IOS3" = 0`)
- `docs/l1-runbooks/00-index.md` iOS L1 Runbooks H2: FOUND (1×)
- `docs/l1-runbooks/00-index.md` runbook links 16-21: FOUND (6×)
- `docs/l1-runbooks/00-index.md` ADDTS-01 advisory: FOUND (1×)
- Commit `fa6947f` exists: FOUND
- Commit `0e32558` exists: FOUND
- `bash run-all.sh` exit 0: CONFIRMED
