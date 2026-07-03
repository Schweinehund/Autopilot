---
phase: 113-conversion-pipeline-lock-representative-set-grounding-valida
plan: "02"
subsystem: pipeline
tags: [pandoc, docx, ooxml, node-esm, powershell, guard, corpus-safety]

requires:
  - phase: 113-01
    provides: scripts/pipeline/lib/ooxml.mjs (extractBodyText + findHeadingStyleIds)

provides:
  - "scripts/pipeline/guard-docx.mjs: post-conversion YAML-leak + heading-style guard with --self-test dual-invariant proof"
  - "scripts/pipeline/convert.ps1: pandoc 3.7.0.2-pinned canonical invocation wrapper with version guard"
  - "scripts/pipeline/README.md: pipeline deployment policy (SC1 canonical invocation + SC3 deployment rules)"

affects:
  - phase 113-03 (operator uses convert.ps1 + guard-docx.mjs to convert representative docs)
  - phase 113-04 (checkpoint summary references these artifacts)
  - phase 119 (guard-docx.mjs is D-07 Phase-119 seed for check-phase-113.mjs Atom 2)

tech-stack:
  added: []
  patterns:
    - "guard-docx.mjs: verbatim check-phase-99.mjs runner-loop clone (LABEL_WIDTH=60, padLabel, process.stdout.write, process.exit(failed>0?1:0)); no CHAIN_PHASES/SELF -- standalone until Phase-119 fold-in"
    - "YAML-LEAK check operates on decompressed body text via extractBodyText() -- never raw .docx bytes (false-green trap)"
    - "--self-test mode: direct synthetic assertion + pandoc clean/leaked dual-fixture proof; graceful SKIPPED if pandoc absent"
    - "convert.ps1: pandoc binary resolved PATH-then-LOCALAPPDATA; hard-asserts version 3.7.0.2 before conversion"

key-files:
  created:
    - scripts/pipeline/guard-docx.mjs
    - scripts/pipeline/convert.ps1
    - scripts/pipeline/README.md

key-decisions:
  - "YAML-LEAK check uses slice(0,500) + includes('---') on decompressed body text (not raw bytes) -- the only non-false-green design"
  - "guard-docx.mjs --self-test proves SC2 via both pandoc fixtures AND a direct synthetic logic assertion (two independent signal paths)"
  - "convert.ps1 resolves pandoc PATH-then-LOCALAPPDATA to handle user-scope installs; hard-aborts on version mismatch (T-113-01)"
  - "guard-docx.mjs stays standalone in scripts/pipeline/ with NO CHAIN_PHASES (D-04/D-07; Phase-119 does the chain-fold)"

requirements-completed: [PIPE-01, PIPE-02]

duration: 5min
completed: "2026-07-03"
---

# Phase 113 Plan 02: SC2 Post-Conversion Guard + SC1/SC3 Policy Wrapper Summary

**YAML-leak + heading-style corpus-safety guard (`guard-docx.mjs`) with pandoc dual-fixture self-test proof, version-pinned `convert.ps1` canonical invocation wrapper, and `README.md` deployment policy (only .docx indexed; Status:Draft excluded)**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-07-03T18:59:54Z
- **Completed:** 2026-07-03T19:05:10Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Authored `guard-docx.mjs` as a verbatim check-phase-99.mjs runner-loop clone with two checks (YAML-LEAK via decompressed body text; HEADING-STYLE requiring Heading1) and `--self-test` mode proving SC2 dual-invariant: clean pandoc fixture PASSES, deliberately-leaked fixture FAILS, plus direct synthetic logic assertion — all 3 sub-tests PASS
- Authored `convert.ps1` wrapping the canonical pandoc 3.7.0.2-pinned invocation with PATH-then-LOCALAPPDATA binary resolution and hard version-guard (T-113-01 mitigation)
- Authored `README.md` documenting SC1 canonical invocation, SC3 deployment policy (5 rules: .docx-only indexed, Status:Draft excluded, pandoc pin + version-bump rules, canonical invocation, registry exclusion)

## Task Commits

1. **Task 1: guard-docx.mjs with dual clean/leaked --self-test** - `5f28f3c` (feat)
2. **Task 2: convert.ps1 + README.md pipeline policy** - `408c9ea` (feat)

## Files Created/Modified

- `scripts/pipeline/guard-docx.mjs` - Post-conversion YAML-leak + heading-style guard; verbatim runner-loop clone of check-phase-99.mjs; Phase-119 seed for check-phase-113.mjs
- `scripts/pipeline/convert.ps1` - CmdletBinding pandoc wrapper; version-guards 3.7.0.2; canonical invocation only
- `scripts/pipeline/README.md` - SC1 canonical invocation + SC3 deployment policy; operator-facing; not in indexed library

## Decisions Made

- **YAML-LEAK decompressed scan** — The check calls `extractBodyText()` (from D-05 ooxml.mjs) which decompresses `word/document.xml` via `inflateRawSync` before scanning. A raw-byte scan on the compressed ZIP payload would always be false-green. The self-test's leaked fixture confirms the detection works end-to-end.
- **Leaked fixture uses fenced code block** — Placing `---`/YAML lines inside a `` ``` `` code block in the .md fixture forces pandoc to render them as verbatim body text (not parsed as YAML metadata). This puts `---` in the decompressed `<w:body>` content where the guard catches it.
- **Standalone design** — guard-docx.mjs has no `CHAIN_PHASES`, no `CHAIN_SKIP`, no SELF check. It is a standalone tool until Phase 119 folds it into `check-phase-113.mjs` as D-07 seed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed `--no-standalone` string from convert.ps1 comment**
- **Found during:** Task 2 verification
- **Issue:** Acceptance criterion specifies `grep '--no-standalone' returns no match` on convert.ps1; a comment block explaining NOT to add the flag contained the literal string
- **Fix:** Rewrote the comment to explain the behavior without naming the flag
- **Files modified:** scripts/pipeline/convert.ps1
- **Committed in:** 408c9ea (Task 2 commit — updated before staging)

---

**Total deviations:** 1 auto-fixed (Rule 1 — acceptance criterion grep fix)
**Impact on plan:** No scope change; acceptance criterion now satisfied.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. The guard runs locally on .docx files; no external services contacted. `convert.ps1` invokes the local pandoc binary only. These components are scripting tools, not production services — no new threat surface beyond what the plan's threat model covers (T-113-01/04/05/06 mitigated by design).

## Known Stubs

None — both scripts are complete implementations. The guard's pandoc-based sub-tests gracefully SKIP if pandoc is absent (design intent, not a stub).

## Self-Check

- [x] `scripts/pipeline/guard-docx.mjs` exists (314 lines)
- [x] `scripts/pipeline/convert.ps1` exists
- [x] `scripts/pipeline/README.md` exists
- [x] `node scripts/pipeline/guard-docx.mjs --self-test` exits 0 (3/3 sub-tests PASS)
- [x] Commit `5f28f3c` (Task 1) confirmed
- [x] Commit `408c9ea` (Task 2) confirmed

## Self-Check: PASSED

## Next Phase Readiness

- `guard-docx.mjs` + `convert.ps1` + `reference.docx` (Plan 01) form the complete conversion pipeline; Plans 03-04 run the pipeline against representative docs (PIPE-02)
- Phase-119 seed is ready: `guard-docx.mjs` is the standalone precursor to `check-phase-113.mjs` per D-07

---
*Phase: 113-conversion-pipeline-lock-representative-set-grounding-valida*
*Completed: 2026-07-03*
