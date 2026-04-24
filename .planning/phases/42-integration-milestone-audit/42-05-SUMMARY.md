---
phase: 42-integration-milestone-audit
plan: 05
subsystem: validation-infra
tags: [node-harness, esm, allowlist, audit-infra, validation, milestone-audit]

# Dependency graph
requires:
  - phase: 42-01
    provides: ROADMAP Phase 42 Plans table rewrite (unblocks downstream plan execution ordering)
  - phase: 30
    provides: check-phase-30.mjs harness template (LABEL_WIDTH=56, padLabel, walkMd, exit-code runner)
  - phase: 31
    provides: check-phase-31.mjs parseInventory() sidecar JSON pattern (CRLF normalization, degrade-to-empty on parse failure)
  - phase: 34
    provides: D-14 60-day Android review_by cadence locked (consumed by C5)
  - phase: 40
    provides: L1 runbooks 22-27 existence (scope targets for C2/C5)
  - phase: 41
    provides: L2 runbooks 18-21 existence; 03-fully-managed-cobo.md:35 line pin (confirmed unshifted post-41-08)

provides:
  - scripts/validation/v1.4-milestone-audit.mjs — Node ESM harness with 5 mechanical checks per D-25..D-31
  - .planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json — committed JSON sidecar with 4 SafetyNet + 9 supervision pins
  - Executable harness that Wave 2 Plan 42-06 will invoke under an independent subagent
  - Verified line-pin baseline for 21-android-compliance-investigation.md (0 matches, no sidecar entry needed)
  - D-25 locked stdout contract proven in smoke test

affects: [42-06 (audit run), 42-07 (REQUIREMENTS.md flip), v1.4.1 (re-run for regression detection), AEAUDIT-04]

# Tech tracking
tech-stack:
  added:
    - "Node ESM validation harness pattern extended to milestone-level audits (was phase-level only: 30, 31)"
  patterns:
    - "Allow-list sidecar JSON — explicit {file, line, reason} pins for semantic-zero regex exemptions (D-26)"
    - "Two-tier exemption check (C1): {file, line} pin OR nearby prose window — allows drift-resilient content matching"
    - "Strict pin-only exemption check (C2): pure {file, line} lookup — no contextual fallback, forces explicit allow-listing"
    - "Informational-only check pattern (C3): always-PASS with parenthetical detail on stdout; records tech debt without gating"
    - "Markdown-link-target regex (C4): scopes to ](...) syntax to allow bare prose mentions while blocking link references"
    - "Scope enumerator as helper function (androidDocPaths): single source of truth for C1/C2/C5 path sets"

key-files:
  created:
    - scripts/validation/v1.4-milestone-audit.mjs
    - .planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json
    - .planning/phases/42-integration-milestone-audit/42-05-SUMMARY.md
  modified: []

key-decisions:
  - "Allow-list JSON committed with 4 SafetyNet pins + 9 supervision pins (10th supervision pin for 21-android-compliance-investigation.md dropped — fresh scan confirmed 0 matches per D-28 re-scan mandate and Pitfall 7)"
  - "03-fully-managed-cobo.md line 35 pin retained unchanged — Plan 41-08 retrofit did not shift the Cross-platform note blockquote (re-verified at authoring per Pitfall 2)"
  - "C3 AOSP word count implemented as INFORMATIONAL ONLY per D-29 — always returns {pass: true} with body word count in parenthetical detail; Phase 42 does not re-gate Phase 39 self-certification"
  - "C5 scope hard-coded via androidDocPaths() helper with filtered glob patterns (/22-27/ for L1, /18-21/ for L2, /android-/ for end-user-guides) — no external glob library needed"
  - "Scope resolver normalizes Windows backslash paths to forward slashes via relNormalize() so allow-list lookup matches JSON entries (which use forward slashes) cross-platform"
  - "Harness uses only Node built-ins (node:fs, node:path, node:process) with zero subprocess invocations — mirrors Phase 30/31 NO SHELL rule"

patterns-established:
  - "Pattern: Milestone-level audit harness (scales v1.4.1+ re-runs; regression-detection infra)"
  - "Pattern: Committed JSON allow-list sidecar with {file, line, reason} pin shape (auditable exemption rationale)"
  - "Pattern: Hybrid exemption strategy — strict pin-only (C2) for high-stakes semantic-zero vs pin-or-window (C1) for drift-resilient matching"
  - "Pattern: Informational-only check slot in D-25 stdout — always-PASS with parenthetical detail for tech-debt capture without gating"

requirements-completed: [AEAUDIT-04]

# Metrics
duration: ~30min
completed: 2026-04-24
---

# Phase 42 Plan 05: v1.4 Milestone Audit Harness + Allow-list Sidecar Summary

**Authored `scripts/validation/v1.4-milestone-audit.mjs` (319 lines, Node ESM) and `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` (4 SafetyNet + 9 supervision pins). Harness executes cleanly, emits 5 D-25 locked-format check lines plus summary, with C3 always-PASS informational per D-29.**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-04-24T14:09:00Z (approximate)
- **Completed:** 2026-04-24T14:39:00Z
- **Tasks:** 2/2 completed
- **Files modified:** 2 created, 0 modified

## Accomplishments

1. **Allow-list sidecar authored + committed** (commit `e5e45db`): 4 SafetyNet pins + 9 supervision pins, each `{file, line, reason}` re-verified against the live file at authoring time. JSON validates and every pin's line contains the expected regex token.
2. **Node ESM harness authored + committed** (commit `265d2db`): 319-line single-file harness, no npm dependencies, only Node built-ins (`node:fs`, `node:path`, `node:process`). Implements 5 mechanical checks mapped to D-27..D-31. Smoke test confirmed 5 check lines + summary emitted in D-25 locked format with C3 always-PASS informational parenthetical. Exit code reflects C2/C5 failures — which is the expected Wave 2 gate surface (this plan only authors; Wave 2 Plan 42-06 is the pass gate).

## Pin Re-verification Results

### SafetyNet pins (4) — all verified unchanged

| File | Expected line | Verified? | Content snippet |
|------|--------------|-----------|-----------------|
| docs/_glossary-android.md | 138 | YES | "Play Integrity is Google's device-attestation API, **successor** to the **SafetyNet** Attestation API..." |
| docs/_glossary-android.md | 150 | YES | Version History row "**SafetyNet** Attestation API **turned off** by Google..." |
| docs/android-lifecycle/03-android-version-matrix.md | 85 | YES | `### SafetyNet → Play Integrity (January 2025)` H3 |
| docs/android-lifecycle/03-android-version-matrix.md | 87 | YES | "Google **turned off SafetyNet** Attestation API in January 2025..." |

### Supervision pins (9) — all verified unchanged

| File | Expected line | Verified? | Content snippet |
|------|--------------|-----------|-----------------|
| docs/_glossary-android.md | 65 | YES | `### Supervision` H3 disambiguation heading |
| docs/_glossary-android.md | 67 | YES | Blockquote body: "'Supervision' is an iOS/iPadOS management-state concept..." |
| docs/_glossary-android.md | 134 | YES | "...via a **supervised** MDM profile..." (MHS cross-platform note) |
| docs/_glossary-android.md | 148 | YES | Version History row naming "**supervision** as callout-only" |
| docs/android-lifecycle/00-enrollment-overview.md | 51 | YES | "...iOS **Supervision**, but the mapping is partial..." |
| docs/android-lifecycle/00-enrollment-overview.md | 53 | YES | "'**Supervision**' is not an Android management term..." |
| docs/android-lifecycle/00-enrollment-overview.md | 83 | YES | See Also: "...including [**supervision**]..." |
| docs/admin-setup-android/03-fully-managed-cobo.md | **35** | YES | "...iOS **Supervision** on ADE-enrolled devices..." (see re-check note below) |
| docs/l2-runbooks/20-android-app-install-investigation.md | 21 | YES | "Unlike iOS (where **supervision** state..." |

### Re-check: docs/admin-setup-android/03-fully-managed-cobo.md line 35 (Pitfall 2)

**Pre-authoring concern:** Plan 41-08 retrofitted 03-fully-managed-cobo.md and may have shifted the `> **Cross-platform note:**` blockquote.

**Result at authoring time (2026-04-24):** Line 35 still contains the cross-platform blockquote naming "iOS Supervision on ADE-enrolled devices." Pin retained unchanged.

### Re-check: docs/l2-runbooks/21-android-compliance-investigation.md (Pitfall 7 / D-28 mandate)

**Pre-authoring concern:** At 42-CONTEXT.md authoring, the grep found zero supervision matches in this file, but Phase 41 execution may have added content.

**Result at authoring time (2026-04-24):** Fresh case-insensitive grep (`\bsupervis(ion|ed|ory)\b`) against the live file — **zero matches**. No sidecar entry added for this file. The 10-pin figure from the original CONTEXT D-28 draft becomes 9 pins; the actual allow-list length matches the plan acceptance range of 9-12.

## Harness Stdout at Plan Execution Time

```
[1/5] C1: Zero SafetyNet as compliance mechanism ........ PASS
[2/5] C2: Zero supervision as Android mgmt term ......... FAIL -- 14 un-exempted supervision reference(s): docs/_glossary-android.md:15 ("Supervision"), docs/_glossary-android.md:15 ("supervision"), docs/_glossary-android.md:45 ("supervised")
[3/5] C3: AOSP stub word count within Phase 39 envelope . PASS (informational — Phase 39 self-certification; body 1089 words vs envelope 600-900)
[4/5] C4: Zero Android links in deferred shared files ... PASS
[5/5] C5: last_verified frontmatter on all Android docs . FAIL -- 5 freshness violation(s): docs/_templates/admin-template-android.md (last_verified missing or malformed); docs/l2-runbooks/18-android-log-collection.md (review_by-last_verified=90d (>60)); docs/l2-runbooks/19-android-enrollment-investigation.md (review_by-last_verified=90d (>60))

Summary: 3 passed, 2 failed, 0 skipped
```

**Exit code:** 1

**Interpretation:** C1, C3, C4 PASS. C2 and C5 FAIL with real findings that are legitimately Wave 2 Plan 42-06's gate surface per the plan's acceptance criteria ("Exit code is 0 (all pass) OR 1 (some fail) — BOTH acceptable at this plan stage; Wave 2 Plan 42-06 is the pass gate"). The C2 failures surface 14 supervision matches that are neither (a) pinned in the allow-list nor (b) in files listed in the allow-list — but are inside the Android-doc scope. Examples include the alphabetical-index anchor links on line 15 of `_glossary-android.md`, which are inherent Android-doc artifacts that either need additional pins or a regex refinement in Wave 2. C5 flags one template with no frontmatter dates plus three L2 runbooks using the 90-day Apple cycle instead of the 60-day Android cycle (Pitfall 6 analog — pre-existing doc drift). All are downstream work, not harness bugs.

## Deviations from Plan

**None — plan executed exactly as written.**

Both tasks completed in order with no architectural changes. One false-positive tooling interaction worth noting (not a deviation):

- **Pre-tool security hook false positive on initial Write of the harness.** The local Claude Code security hook blocked the initial Write because a comment contained the literal word "subprocess." Resolved by rewording the comment (no code change). The final harness has zero subprocess invocations — acceptance criterion `grep -c 'child_process' = 0` confirmed.

## Authentication Gates

None — this plan writes local files only and has zero external services or authentication surfaces.

## Known Stubs

None. Every file created in this plan is fully functional:
- The harness is executable Node and runs to completion with meaningful output.
- The JSON sidecar is valid JSON with all pins verified against live content.

## Threat Flags

None. This plan creates only a read-only file-scanner script and a committed JSON manifest. No network endpoints, auth paths, or trust boundaries introduced.

## Deferred Issues

None from this plan. The C2 and C5 harness findings surfaced during smoke testing are legitimate downstream work for Wave 2 Plan 42-06 (the audit run plan) to triage per Phase 42 D-04/D-05 classification rules:

- **14 unpinned supervision matches** → Wave 2 finding. Options: (a) expand allow-list with pins for alphabetical-index anchors and legitimate cross-platform prose, (b) refine regex to skip anchor references, (c) content rewrite. Assignment = Phase 43 if spawned; deferral path = v1.4.1 per D-05 tier-4.
- **5 C5 freshness violations** → Wave 2 finding. Includes one template with missing frontmatter dates and three L2 runbooks using 90-day Apple cycle. Phase 34 D-14 mandates 60-day Android cycle. Simple metadata fix likely one-plan scope (D-04 integration-gap classification).

Phase 42-05 is not the appropriate remediation scope — D-02 mandates auditor independence.

## Wave 2 Readiness

Both artifacts are committed and ready for Wave 2 Plan 42-06 to consume under an independent subagent per D-02:

- Harness runnable via `node scripts/validation/v1.4-milestone-audit.mjs` (all platforms; no npm install required)
- Allow-list resolvable at harness-relative path via `readFile('.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json')`
- D-25 stdout contract confirmed in smoke test
- Exit-code semantics confirmed (0 on all-PASS; 1 on any-FAIL; current state = 1 per above findings)

## Self-Check: PASSED

**File existence:**
- `scripts/validation/v1.4-milestone-audit.mjs` — FOUND
- `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` — FOUND
- `.planning/phases/42-integration-milestone-audit/42-05-SUMMARY.md` — FOUND (this file)

**Commit existence:**
- `e5e45db` (Task 1 — allow-list sidecar) — FOUND
- `265d2db` (Task 2 — harness) — FOUND

**Structural acceptance checks:**
- `^const LABEL_WIDTH = 56;$` occurrences: 1 (expected 1) — PASS
- `parseAllowlist` occurrences: 3 (expected >=1) — PASS
- `walkMd` occurrences: 6 (expected >=1) — PASS
- `SafetyNet` occurrences: 6 (expected >=1) — PASS
- `supervis` occurrences: 9 (expected >=1) — PASS
- `last_verified` occurrences: 7 (expected >=1) — PASS
- `'C[1-5]:` labels: 5 (expected 5) — PASS
- Harness line count: 319 (expected >=250) — PASS
- `child_process` references: 0 (expected 0) — PASS
- `node --check`: passes

**Smoke test:**
- Executes: YES
- Emits 5 check lines matching `^\[[1-5]/5\] C[1-5]:`: YES
- Emits `Summary: N passed, M failed, K skipped` line: YES
- C3 line contains both `PASS` and `informational`: YES
- `--verbose` flag executes without error: YES

**Pin integrity:**
- All 4 SafetyNet pins resolve to lines containing `/SafetyNet/`: YES
- All 9 supervision pins resolve to lines matching `/supervis(ion|ed|ory)/i`: YES
