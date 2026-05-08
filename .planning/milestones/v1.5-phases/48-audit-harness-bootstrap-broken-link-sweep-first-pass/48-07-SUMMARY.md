---
phase: 48-audit-harness-bootstrap-broken-link-sweep-first-pass
plan: 07
subsystem: docs-engineering
tags: [markdown-link-check, broken-link-sweep, mlc-config, audit-harness]

# Dependency graph
requires:
  - phase: 48-06
    provides: CI workflow + pre-commit advisory hook (Wave-1 complete)
provides:
  - .mlc-config.json at repo root (redirect-following + MS Learn ignore config)
  - Wave-2 broken-link sweep tooling precondition
  - check-phase-48.mjs check 7 PASS
affects:
  - 48-09 (Wave-2 179-file sweep uses this config via --config .mlc-config.json)
  - C13 harness probe invocation (uses .mlc-config.json for redirect-following + ignore)

# Tech tracking
tech-stack:
  added: [".mlc-config.json (markdown-link-check v3.14.2 config)"]
  patterns:
    - "External MS Learn URL exclusion via ignorePatterns regex array (PITFALL-14 mitigation)"
    - "Redirect-following via aliveStatusCodes 3xx inclusion (301/302/303/307/308)"
    - "429 retry resilience via retryOn429 + retryCount"

key-files:
  created:
    - ".mlc-config.json"
  modified: []

key-decisions:
  - "6 ignorePatterns covering learn/docs/techcommunity/portal/endpoint/intune microsoft.com (REQUIREMENTS Out-of-Scope; PITFALL-14)"
  - "aliveStatusCodes includes all 3xx redirect codes so redirecting pages are not flagged as broken"
  - "timeout 10s: internal links complete in ms; budget covers any non-ignored external links"
  - "retryOn429 + retryCount 2: transient CDN rate-limit resilience"

patterns-established:
  - "Pattern: .mlc-config.json at repo root is the default config-discovery path for markdown-link-check"
  - "Pattern: ignorePatterns uses anchored ^https:// regex to prevent accidental URL-fragment expansion"

requirements-completed: [AUDIT-05, CLEAN-07]

# Metrics
duration: 5min
completed: 2026-04-26
---

# Phase 48 Plan 07: .mlc-config.json Creation Summary

**markdown-link-check config enabling redirect-following and MS Learn URL exclusion for Wave-2 broken-link sweep**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-26T00:00:00Z
- **Completed:** 2026-04-26
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Created `.mlc-config.json` at repo root with exact flag set from 48-RESEARCH.md
- `check-phase-48.mjs` check 7 (`.mlc-config.json exists`) flips from FAIL to PASS (result: 6 PASS, 1 FAIL)
- 6 Microsoft-domain ignorePatterns in place — neutralizes PITFALL-14 redirect-chain noise before Wave-2 sweep runs
- `aliveStatusCodes` array includes 301/302/303/307/308 — redirecting pages correctly treated as alive links
- `retryOn429: true` with `retryCount: 2` — transient CDN 429 responses will not produce false positives
- Wave-2 broken-link sweep (plan 48-09) can now proceed with noise filter active

## Smoke Test

`npx markdown-link-check` smoke test was prepared but skipped — the Step 3 JSON validation (node -e parse) is the binding gate per plan task spec. JSON validation confirmed:

```
ignorePatterns count: 6 aliveStatusCodes: 8 retryOn429: true timeout: 10s
```

## check-phase-48.mjs Output (after commit)

```
[1/7] v1.5-milestone-audit.mjs exists ....................... PASS
[2/7] v1.5-audit-allowlist.json exists and parses ........... PASS
[3/7] sidecar supervision_exemptions.length > 0 ............. PASS -- 18 supervision pins
[4/7] regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07) PASS
[5/7] 48-VERIFICATION-broken-links.md exists with Category A/B/C sections FAIL -- does not exist
[6/7] v1.5-milestone-audit.mjs references v1.5-audit-allowlist.json PASS
[7/7] .mlc-config.json exists ............................... PASS
Result: 6 PASS, 1 FAIL, 0 SKIPPED
```

Check 5 (VERIFICATION artifact) is expected FAIL — that artifact is produced by plan 48-08/48-09 (Wave-2 sweep and inventory).

## Task Commits

1. **Task 1: Write .mlc-config.json at repo root** - `ae0ff7f` (feat)

## Files Created/Modified

- `.mlc-config.json` - markdown-link-check config: 6 MS-domain ignorePatterns, retryOn429, 8 aliveStatusCodes including 3xx, 10s timeout

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- `.mlc-config.json` exists: FOUND
- commit ae0ff7f exists: FOUND
- check-phase-48.mjs check 7 PASS: CONFIRMED
