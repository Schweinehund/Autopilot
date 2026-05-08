---
phase: 48
plan: "09"
subsystem: audit-harness
tags: [broken-link-sweep, markdown-link-check, roadmap-corrections, terminal-sanity]
dependency_graph:
  requires: [48-08]
  provides: [48-VERIFICATION-broken-links.md-complete, ROADMAP-SC-corrections]
  affects: [.planning/ROADMAP.md, .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md]
tech_stack:
  added: []
  patterns: [markdown-link-check@3.14.2, shell:true spawnSync batch sweep]
key_files:
  created: []
  modified:
    - .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md
    - .planning/ROADMAP.md
decisions:
  - "Full 179-file sweep yielded 75 findings (51 Category A broken anchors, 24 Category B broken file paths, 0 Category C deferred stubs)"
  - "ROADMAP.md SC#1+SC#3+SC#5 corrected in single atomic edit per D-09 Option A (Claude's Discretion)"
  - "spawnSync with shell:true required on Windows to capture markdown-link-check stdout"
metrics:
  duration: "~25 minutes"
  completed: "2026-04-26"
  tasks_completed: 2
  files_modified: 2
---

# Phase 48 Plan 09: Full Broken-Link Sweep + ROADMAP Corrections + Terminal Sanity Summary

**One-liner:** markdown-link-check 3.14.2 sweep across 179 docs files yielded 75 pre-existing findings (51 broken anchors, 24 broken file paths, 0 deferred stubs); ROADMAP.md SC#1/SC#3/SC#5 corrected per CONTEXT D-09/D-15/D-16; all 3 terminal sanity commands exit 0 (7/7 PASS).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Full markdown-link-check sweep + categorize A/B/C + finalize inventory | aca9862 | 48-VERIFICATION-broken-links.md |
| 2 | ROADMAP.md SC#1+SC#3+SC#5 corrections + terminal sanity | aca9862 | .planning/ROADMAP.md |

## Sweep Statistics

- **Files scanned:** 179 (all `docs/**/*.md` files; exact match with v1.4.1 close baseline)
- **Total OK links:** 2,295
- **Total broken links:** 75
- **Category A — Broken Anchors:** 51
- **Category B — Broken File Paths:** 24
- **Category C — Deferred Stubs / Intentional:** 0
- **New (Phase 48) findings:** 0 across all categories (Phase 48 ships no content)

### Category A Pattern Analysis

The 51 broken-anchor findings cluster in a consistent pattern: intra-file `#anchor` links in "quick-navigation" TOC sections at the top of l1-runbooks and l2-runbooks files. These TOC links were authored referencing section headings that either (a) use slightly different GFM-normalized slugs or (b) were renamed/removed after the TOC was written. Affected files:

- `docs/l1-runbooks/`: 02, 11, 12, 13, 14, 21, 25, 27, 28, 29 (25 findings)
- `docs/l2-runbooks/`: 21, 22, 23 (11 findings)
- `docs/_glossary-android.md`: 2 findings (`#kme`, `#kpe` entries)
- `docs/_templates/admin-template-ios.md`: 1 finding (cross-file anchor)
- `docs/admin-setup-android/10-aosp-zebra.md`: 1 finding (bare `#`)

### Category B Breakdown

- **Wrong relative paths (5 findings):** `../admin-setup/00-overview.md` in AOSP OEM files (09–13); correct path would be `../admin-setup-android/00-overview.md` or Windows-scope equivalent
- **Missing files (4 findings):** `../reference/conditional-access-enrollment.md`, `02-device-registration.md` (l2/03), `05-policy-conflict.md` (l2/04), `../l2-runbooks/01-network-connectivity.md`
- **External URL failures (6 findings):** support.google.com, knox.samsung.com (×2), portal.realwear.com, ztd.dds.microsoft.com, support.apple.com — non-MS domains not covered by REQUIREMENTS.md Out-of-Scope exemption; may be transient network failures from CI environment
- **Template placeholders (9 findings):** `link` literal and URL-encoded `[filename]`/`[runbook-filename]` patterns in `docs/_templates/` — intentional placeholders, not real broken links

### Category C Findings

Zero findings. No existing docs in the 179-file corpus contain forward-reference links to v1.5+ planned paths (`admin-setup-linux/`, `linux-lifecycle/`, `operations/`, `4-platform-capability-comparison.md`, etc.). Phase 49+ content will be self-contained when first authored.

## ROADMAP.md Corrections

Three Phase 48 success-criteria entries corrected in a single atomic edit per CONTEXT D-09 (Option A: Claude's Discretion — edit the source artifact):

| SC | Old wording (stale) | New wording (corrected) | CONTEXT decision |
|----|---------------------|-------------------------|-----------------|
| #1 | "C1-C9 blocking PASS and C10-C13 informational" | "C1-C7 + C10 blocking PASS, C9 + C11/C12/C13 informational" | D-04 (C6 blocking), D-05 (C7 blocking), D-06 (C9 informational), D-09 (SC superseded by AUDIT-02) |
| #3 | "plus new allowlist arrays for Linux exemptions and ops-domain allowlists" | "inherited v1.4.1 schema verbatim; added LAZILY when first legitimate exemption appears" | D-15 (YAGNI), D-22 (Phase 60 promotion) |
| #5 | "`audit-harness-integrity.yml`" | "`.github/workflows/audit-harness-v1.5-integrity.yml` (new file parallel to frozen)" | D-16 (new yml; existing yml frozen) |

SC#2 and SC#4 were verified unchanged.

## Terminal Sanity Output

All three commands executed from repo root `D:/claude/Autopilot`:

### 1. `node scripts/validation/v1.5-milestone-audit.mjs --verbose`

```
[1/12] C1: Zero SafetyNet as compliance mechanism ....... PASS
[2/12] C2: Zero supervision as Android mgmt term ........ PASS
[3/12] C3: AOSP stub word count within Phase 39 envelope PASS (informational -- Phase 39 self-certification; body 596 words vs envelope 600-900)
[4/12] C4: Zero Android links in deferred shared files .. PASS
[5/12] C5: last_verified frontmatter on all Android docs PASS
[6/12] C6: PITFALL-7 preservation in AOSP + per-OEM docs PASS
[7/12] C7: bare-"Knox" disambiguation check ............. PASS
[9/12] C9: COPE banned-phrase check ..................... PASS (informational)
[10/12] C10: Linux frontmatter (platform: Linux + 60d last_verified) PASS
[11/12] C11: Ops-domain anti-pattern regex .............. PASS (informational)
[12/12] C12: 4-platform comparison structural validation PASS (informational)
[13/12] C13: Broken-link automation (markdown-link-check) PASS (informational)

Summary: 12 passed, 0 failed, 0 skipped
```

**Exit code: 0**

### 2. `node scripts/validation/regenerate-supervision-pins.mjs --self-test`

```
=== self-test: reproduce Phase 43 hand-authored new-pin set ===
Scanning: 32 Android doc paths
Classifier output: 17 Tier-1 stub-eligible lines, 1 Tier-2 suspected regressions
Phase 43 hand-authored Tier-1 new pins (sidecar - baseline): 9
Classifier Tier-1 new pins (classifier - baseline): 9

Pinned Tier-2 occurrences (classifier Tier-2 but explicitly pinned — known-legitimate):
  ~ docs/_glossary-android.md:76 — ### Supervision

Diff: identical
Un-pinned Tier-2 count: 0 (all supervision occurrences classified or explicitly pinned)
Self-test: PASS
```

**Exit code: 0**

### 3. `node scripts/validation/check-phase-48.mjs --verbose`

```
check-phase-48 -- Phase 48 deliverables

[1/7] v1.5-milestone-audit.mjs exists ....................... PASS
[2/7] v1.5-audit-allowlist.json exists and parses ........... PASS
[3/7] sidecar supervision_exemptions.length > 0 ............. PASS -- 18 supervision pins
[4/7] regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07) PASS
[5/7] 48-VERIFICATION-broken-links.md exists with Category A/B/C sections PASS
[6/7] v1.5-milestone-audit.mjs references v1.5-audit-allowlist.json PASS
[7/7] .mlc-config.json exists ............................... PASS

Result: 7 PASS, 0 FAIL, 0 SKIPPED
```

**Exit code: 0**

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking issue] spawnSync shell:true required on Windows**
- **Found during:** Task 1 (sweep execution)
- **Issue:** `execFileSync` with `npx` returned empty stdout on Windows bash (status: null / 0-byte output). The npm wrapper script for `markdown-link-check` requires shell execution on Windows to resolve the `.cmd` shim.
- **Fix:** Switched from `execFileSync` to `spawnSync` with `shell: true`. Used batches of 30 files per invocation to stay within command-line length limits.
- **Files modified:** none (Node script was inline/temporary; not committed)
- **Impact:** Sweep results identical to expected output; 179 files processed in 6 batches.

None other — plan executed as written.

## Known Stubs

None. The 48-VERIFICATION-broken-links.md is a findings inventory, not a stub. All placeholder columns (Triage Decision) are intentionally empty per CONTEXT D-11 — Phase 60 second-pass triage populates them.

## Self-Check

### Created files exist:
- No new files created (only modifications to existing files)

### Modified files verified:
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md`: exists, contains Category A/B/C/Summary sections, no placeholders
- `.planning/ROADMAP.md`: SC#1 corrected (`C1-C7 + C10 blocking`), SC#3 corrected (`added LAZILY`), SC#5 corrected (`audit-harness-v1.5-integrity.yml`)

### Commits exist:
- `aca9862` — feat(48-09): complete broken-link sweep + ROADMAP SC corrections + terminal sanity

## Self-Check: PASSED
