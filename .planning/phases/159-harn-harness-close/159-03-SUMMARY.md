---
phase: 159-harn-harness-close
plan: 03
subsystem: infra
tags: [git-plumbing, frozen-read, milestone-close, path-a-lineage, harness-fork]

# Dependency graph
requires:
  - phase: 159-02
    provides: "MILESTONE_CLOSE_SHAS.V121 = 'e129081e' live in scripts/validation/_lib/frozen-at-close.mjs, so this plan's frozen-blob fork source and per-pin drift instrument both resolve against a real, proven close-gate SHA"
provides:
  - "scripts/validation/v1.22-milestone-audit.mjs -- the 20th Path-A harness lineage bump, forked from the frozen v1.21 blob (git show e129081e:...), proven byte-equal to the frozen source and the unconverted working copy before any edit, born live-HEAD with both Part A deferrals (V122-PIN-DEFERRAL, C17-FROZEN-AWARE-RESIDUE-V22) named in its own header"
  - "scripts/validation/v1.22-audit-allowlist.json -- header-fields-only copy of the v1.21 sidecar, all 8 top-level pin arrays plus the nested c13_rotting_external object proven byte-identical; four populations re-measured live (89/73/33/44, zero delta against D-23's carried figures); four dead safetynet_exemptions pins enumerated and disclosed, not repointed"
  - "A BASELINE_26 journal comment block inserted above the single BASELINE_9 array in regenerate-supervision-pins.mjs, carrying a real per-pin token-check drift measurement at e129081e and HEAD (40/44 pass-both, 4/44 fail-both, 0 changed verdict) and a re-verified BASELINE_9 coordinate check (9/9 token-present, 7/9 lines changed since the last refresh once EOL-only false positives are stripped)"
affects: [159-04, 159-08, 159-13]

# Actuals (#2632)
actuals:
  tokens: 28200
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Three-way hash equality (frozen blob / unconverted working copy / new file, all before any edit) as the fork-provenance proof, run as a precondition-checked verify command rather than trusted by inspection"
    - "Programmatic array-by-array JSON comparison (JSON.stringify equality per top-level array key, plus a separate nested-object comparison for the one array-of-arrays exception) as the sidecar byte-identity proof"
    - "Per-pin token/pattern check at two named SHAs (never a line-neutrality diff, never the pin generator's own report mode) as the drift-adjudication instrument for both a sidecar's exemption pins and a baseline coordinate array"
    - "CR-stripped line comparison when measuring 'did this line change' across a core.autocrlf/eol=lf repo, to avoid a false 100%-changed reading from EOL normalization alone"

key-files:
  created:
    - scripts/validation/v1.22-milestone-audit.mjs
    - scripts/validation/v1.22-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md

key-decisions:
  - "Followed D-22 exactly: forked from the frozen blob at e129081e, not the working copy, and asserted three-way byte-equality (frozen blob, unconverted working copy, new file) before any identity edit -- all three agreed at bd565172..."
  - "Followed D-23: header-fields-only sidecar copy (generated/phase updated, schema_version carried) with all pin arrays programmatically proven byte-identical; four populations (89/73/33/44) re-measured live and matched D-23's carried figures exactly (zero delta on all four)."
  - "Followed D-24: BASELINE_26 inserted as a journal comment block strictly above the single BASELINE_9 array (mid-file insertion, not append); drift measured with a per-pin token check at e129081e and HEAD, never the line-neutrality diff or the script's own report mode -- reproduced D-24's carried 40/44 and 7/9 figures exactly."
  - "Named both Part A deferrals (V122-PIN-DEFERRAL, C17-FROZEN-AWARE-RESIDUE-V22) explicitly in the new harness's own header, in v1.21's drop-and-name-as-new shape, since v1.22-DEFERRED-CLEANUP.md itself is not authored until the milestone actually closes."

patterns-established:
  - "A task's own literal --verbose acceptance criterion can be sequence-wrong within a single plan (Task 1's identity edit necessarily repoints a sidecar path that Task 2, in the same plan, has not yet created) without the underlying deliverable being wrong -- verify the narrower --self-test claim standalone, then re-verify the full claim once its sibling task lands, and document the gap as a Rule 3 deviation rather than silently skip it."

requirements-completed: []  # D-28: HARN-04 flips at 159-08 only; this plan declares none per its own frontmatter

coverage:
  - id: D1
    description: "v1.22-milestone-audit.mjs forked from the frozen v1.21 blob at e129081e, three-way byte-equality proven before any edit, identity edits applied (sidecar path, header birth-condition paragraph naming both deferrals, self-identifying strings), born live-HEAD, no string-command child process call"
    requirement: null
    verification:
      - kind: other
        ref: "three git hash-object results all bd56517225e0b587fd31eaac1616ff7cbddab60d; node scripts/validation/v1.22-milestone-audit.mjs --self-test exits 0 (9/9); grep -nE for execSync/child_process.exec finds none; awk non-comment-line scan for predecessor version string returns empty"
        status: pass
    human_judgment: false
  - id: D2
    description: "v1.22-audit-allowlist.json created as a header-fields-only copy with pins byte-identical, four populations re-measured live at zero delta (89/73/33/44), four dead safetynet_exemptions pins enumerated and disclosed rather than fixed"
    requirement: null
    verification:
      - kind: other
        ref: "node -e array-comparison script reports 'all 8 pin arrays byte-identical' + separate c13_rotting_external equality check; grep -c '\"file\":'/'\"line\":' = 89/73; grep -o file-value sort -u wc -l = 33; node scripts/validation/v1.22-milestone-audit.mjs --verbose exits 0 (16/16) once the sidecar exists"
        status: pass
    human_judgment: false
  - id: D3
    description: "BASELINE_26 journal comment block inserted immediately above the single BASELINE_9 array (no second array created), carrying a real per-pin token-check drift measurement (40/44 pass-both, 4/44 fail-both, 0 changed verdict) and a BASELINE_9 coordinate re-verification (9/9 token-present, 7/9 lines changed CR-insensitively since the last refresh)"
    requirement: null
    verification:
      - kind: other
        ref: "node -e position-assertion prints 'BASELINE_26 block sits above the baseline array'; grep -c 'const BASELINE_2' = 0; node scripts/validation/regenerate-supervision-pins.mjs --self-test exits 0 (PASS); test -z git status --porcelain -- docs/ for every commit"
        status: pass
    human_judgment: false

# Metrics
duration: 13min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 3: Fork the v1.22 harness, copy its sidecar, and journal the BASELINE_26 drift adjudication Summary

**Forked the 20th Path-A milestone-audit harness from the frozen v1.21 blob with a proven three-way byte-equality, copied its sidecar with every pin array programmatically proven identical, and inserted a real per-pin drift measurement (`BASELINE_26`) above the single baseline array — all three artifacts run green standalone.**

## Performance

- **Duration:** 13 min
- **Started:** 2026-09-09T12:15:00Z (approx., immediately after 159-02's close-out)
- **Completed:** 2026-09-09T12:28:05Z
- **Tasks:** 3 completed
- **Files modified:** 4 (2 created, 2 modified)

## Accomplishments

- Forked `scripts/validation/v1.22-milestone-audit.mjs` from `git show e129081e:scripts/validation/v1.21-milestone-audit.mjs` (the frozen blob, not the unconverted working copy), with all three hashes — frozen blob, unconverted working copy, new file — agreeing at `bd56517225e0b587fd31eaac1616ff7cbddab60d` before any edit.
- Made exactly the identity edits the new generation needs: repointed the sidecar-path literal, rewrote the header birth-condition paragraph naming both Part A deferrals this generation's birth creates (`V122-PIN-DEFERRAL`, `C17-FROZEN-AWARE-RESIDUE-V22`), and updated every self-identifying string — while leaving the file born live-HEAD, exactly as every predecessor was at its own birth.
- Created `scripts/validation/v1.22-audit-allowlist.json` as a header-fields-only copy with every pin array (8 top-level plus the nested `c13_rotting_external` object) programmatically proven byte-identical; re-measured all four sidecar populations live and reproduced D-23's carried figures (89 total, 73 line-keyed, 33 distinct files, 44 line-enforced) exactly, with zero delta.
- Enumerated and disclosed the four dead `safetynet_exemptions` pins (lines carrying no `SafetyNet` token at either `e129081e` or HEAD, passing only through C1's ±200-character window) — carried byte-identical, not repointed or silently fixed.
- Inserted the `BASELINE_26` journal comment block immediately above the single `const BASELINE_9` array, with a real per-pin token-check drift measurement (40/44 pins pass at both `e129081e` and HEAD, 4/44 fail at both — the disclosed dead pins, 0 changed verdict) and a `BASELINE_9` coordinate re-verification (9/9 still carry `supervis`; 7/9 lines changed since the last refresh once a `core.autocrlf`/`eol=lf` false-positive was stripped) — both reproducing D-24's carried figures exactly.

## Task Commits

Each task was committed atomically:

1. **Task 1: Fork the harness from the frozen blob and assert byte-equality** - `663f55be` (feat)
2. **Task 2: Copy the sidecar with pins byte-identical and re-measure its populations** - `37b43146` (feat)
3. **Task 3: Insert the BASELINE_26 journal block with a real per-pin drift measurement** - `ebb96166` (feat)

**Plan metadata:** committed as part of this final close-out step (STATE.md/ROADMAP.md/REQUIREMENTS.md sync + this SUMMARY.md).

_Note: TDD tasks may have multiple commits (test → feat → refactor) — not applicable to this plan._

## Files Created/Modified

- `scripts/validation/v1.22-milestone-audit.mjs` — new, forked from the frozen v1.21 blob; identity edits only (sidecar path, header, self-identifying strings); born live-HEAD
- `scripts/validation/v1.22-audit-allowlist.json` — new, header-fields-only copy of the v1.21 sidecar with pins byte-identical
- `scripts/validation/regenerate-supervision-pins.mjs` — `BASELINE_26` journal comment block inserted above `const BASELINE_9`
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` — three new sections (§9-§11) recording the three-way hash proof, sidecar population re-measurement and dead-pin disclosure, and the BASELINE_26 drift measurement

## Decisions Made

- D-21/D-22/D-23/D-24 followed exactly as specified in `159-CONTEXT.md` — see key-decisions above.
- Both Part A deferrals (`V122-PIN-DEFERRAL`, `C17-FROZEN-AWARE-RESIDUE-V22`) named directly in the new harness's own header rather than deferred to a not-yet-authored `v1.22-DEFERRED-CLEANUP.md`, since that file is only created at actual milestone close (a later, out-of-phase event) — the header is the correct place to record the deferral's existence now, matching v1.21's own header shape when it was in the identical born-live-HEAD state.
- Used a CR-stripped line comparison for the "did this line change since the last refresh" measurement after a raw comparison produced a false 9/9-changed reading — this repo's `core.autocrlf`/`eol=lf` normalization (159-01) rewrites line endings independently of content, and the project's own memory of this exact trap class flagged it before it could corrupt the recorded figure.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Mis-specified verify-command sequencing] Task 1's `--verbose` acceptance criterion cannot pass standalone before Task 2 creates the sidecar**
- **Found during:** Task 1
- **Issue:** Task 1's acceptance criteria require `node scripts/validation/v1.22-milestone-audit.mjs --verbose` to exit 0 with 0 failed, run immediately after the fork and its identity edits — but one of those required identity edits repoints the sidecar-path literal to `v1.22-audit-allowlist.json`, which does not exist until Task 2 (the very next task in this same plan) creates it. `parseAllowlist()` degrades silently to empty exemption arrays on a missing sidecar rather than failing loud, so C2/C7/C9/C13 report real corpus violations against zero pins — the literal command cannot pass under the task's own correct design, regardless of how faithfully the fork was executed.
- **Fix:** Verified the narrower, sidecar-independent claim (`--self-test`, which uses synthetic fixtures) standalone at Task 1's own commit — exit 0, 9/9 passed — proving the harness's own logic and identity edits are correct. Re-ran `--verbose` immediately after Task 2 created the sidecar (within the same plan, before any consumer exists) and confirmed exit 0, 16/16 passed there.
- **Files modified:** none (verification-only; the sequencing gap is inherent to the plan's own task ordering, not a defect in either deliverable)
- **Verification:** `--self-test` exit 0 at Task 1's commit; `--verbose` exit 0 at Task 2's commit; documented in `159-EVIDENCE.md` §9-§10
- **Committed in:** `663f55be` (Task 1), resolved by `37b43146` (Task 2)

---

**Total deviations:** 1 auto-fixed (Rule 3 — mis-specified verify-command sequencing across two tasks in the same plan).
**Impact on plan:** The fix used the plan's own verify commands as intended, just re-timed the full `--verbose` check to the point in the plan's own task sequence where its precondition (the sidecar's existence) is actually satisfied. No scope creep; no change to either deliverable's content.

## Issues Encountered

None beyond the deviation documented above, which was resolved during execution.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

All three artifacts this plan creates run green standalone: `v1.22-milestone-audit.mjs --self-test`/`--verbose` (9/9, 16/16), `v1.22-audit-allowlist.json` (parses, all pins byte-identical), and `regenerate-supervision-pins.mjs --self-test` (PASS) with `BASELINE_26` correctly positioned above the array. `check-phase-54.mjs` remains green (32/0/0) before and after every commit this plan made, and `docs/` was untouched throughout. Plan 159-04 (the frozen-aware conversion of `v1.21-milestone-audit.mjs` itself) can now proceed — its own fork-source precondition (the working copy still equaling the frozen blob) was proven true immediately before this plan's Task 1 edit, and this plan never touched `v1.21-milestone-audit.mjs`.

**Known Stubs:** None.

**Threat Flags:** None beyond what this plan's own `<threat_model>` already scoped and mitigated (T-159-11 through T-159-15, all `mitigate`, all closed by this plan's own verify/acceptance commands; T-159-SC `accept`, zero package-manager installs performed).

## Self-Check: PASSED

Both created files (`scripts/validation/v1.22-milestone-audit.mjs`, `scripts/validation/v1.22-audit-allowlist.json`) confirmed present on disk; `regenerate-supervision-pins.mjs`'s `BASELINE_26` block confirmed present and positioned above `const BASELINE_9`; all 3 commit hashes (`663f55be`, `37b43146`, `ebb96166`) confirmed present in `git log --oneline --all`.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*
