---
phase: 115-c17-harness-check-validator-atom
verified: 2026-07-04T00:00:00Z
status: passed
score: 7/7 must-haves verified
overrides_applied: 0
deferred:
  - truth: "C17 is registered in the harness chain alongside C1-C16"
    addressed_in: "Phase 119"
    evidence: "ROADMAP Phase 119 success criteria includes v1.15-milestone-audit.mjs (C1-C17); HARN-03 requirement specifies the 13th Path-A audit-harness lineage bump folding C17; CONTEXT D-04 (4A) explicitly supersedes ROADMAP SC1's chain-registration clause — standalone now, fold is Phase 119's job"
---

# Phase 115: C17 Harness Check (Validator Atom) Verification Report

**Phase Goal:** The C17 harness check is authored as one indivisible validator atom, blocking on all EEE contract assertions derived from the research needle-spec — so content retrofit phases work against a live gate from the first retrofitted file.
**Verified:** 2026-07-04T00:00:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `node c17-eee-contract.mjs` exits 0 on all 8 enrolled docs/ files | VERIFIED | Live run: "8 files checked, 0 with violations, 0 total violations", exit 0 |
| 2 | `node c17-eee-contract.mjs --self-test` exits 0 (passing fixture 0 violations; failing fixture >=1) | VERIFIED | Live run: "4 passed, 0 failed", exit 0; sub-tests A (pass→0), B (fail→2 violations: #5,#13), C (#10 fires for UnknownOS), D (sentinel skips #9) all pass |
| 3 | C17 exits 1 (blocking) when any enrolled file violates any of the 13 assertions | VERIFIED | `process.exit(allViolations.length > 0 ? 1 : 0)` at line 586; self-test B confirms non-zero exit on failing fixture |
| 4 | C17 aggregates ALL violations (per-file, per-assertion), never fail-fast | VERIFIED | `checkFile` collects all violations and returns the full array without early return; no `return violations` mid-function; confirmed by failing fixture reporting 2 distinct violations (#5 + #13) in a single run |
| 5 | C17 emits a machine-readable counts-by-assertion summary line to stdout | VERIFIED | Live output: `C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0` |
| 6 | C17 imports ONLY node: builtins — no npm packages, no `_lib/` import | VERIFIED | Imports confirmed: `from 'node:fs'`, `from 'node:path'`, `from 'node:process'` only; grep of file shows no `_lib/` substring |
| 7 | Templates pass despite TEMPLATE-SENTINEL placeholders; `platform: all` resolves in D1_MAP | VERIFIED | `isTemplate = lvMatch[1] === '1970-01-01'` skips assertions #9 and #12; `D1_MAP` contains `'all': 'All Platforms'`; live run of 8 files (including 7 templates) exits 0; self-test sub-test D confirms #9 is correctly skipped |

**Score:** 7/7 truths verified

### Deferred Items

Items not yet met but explicitly addressed in later milestone phases.

| # | Item | Addressed In | Evidence |
|---|------|-------------|----------|
| 1 | C17 registered in harness chain alongside C1-C16 | Phase 119 | ROADMAP Phase 119 goal: "v1.15-milestone-audit.mjs (C1-C17)"; HARN-03: "13th Path-A audit-harness lineage bump — v1.15-milestone-audit.mjs (C1–C17)"; CONTEXT D-04 supersedes ROADMAP SC1's chain-registration clause: "standalone now; the audit-fold is Phase 119's job" |

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/validation/c17-eee-contract.mjs` | Standalone blocking validator; all 13 assertions in single `checkFile`; --self-test; aggregate runner; min 250 lines | VERIFIED | 587 lines; `checkFile` function present at line 116; all 13 assertions (#1–#13) implemented without early return; `--self-test` mode at line 419; machine-readable summary at lines 576–584 |
| `scripts/validation/c17-fixtures/c17-fixture-passing.md` | Conformant exemplar; non-sentinel `last_verified`; `doc_id:` present | VERIFIED | `last_verified: 2026-07-04` (non-sentinel); `doc_id: C17-TEST-PASS-001`; block uses `·` U+00B7 separator; passes all 13 assertions confirmed by self-test sub-test A |
| `scripts/validation/c17-fixtures/c17-fixture-failing.md` | Non-conformant exemplar; >=1 known violation; `doc_id:` present | VERIFIED | `doc_id: C17-TEST-FAIL-001`; `status: InvalidStatus` (assertion #13 violation); 2-word Summary "Too short." (assertion #5 violation); intentional-violation comment documents both violations; block matches frontmatter keeping #9 clean |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `c17-eee-contract.mjs` | `docs/` tree | `walkMd('docs')` + enrollment filter | VERIFIED | Line 522: `const allMdPaths = walkMd('docs');`; enrollment guard: `hasDocId && relPath.startsWith('docs/')` |
| `c17-eee-contract.mjs` | D1_MAP constant | assertion #10 (unmapped = HARD FAIL) + assertion #9 (Platform block via D1 normalization) | VERIFIED | D1_MAP defined lines 26–47 with 20 entries; used in assertions #9 (line 300) and #10 (line 336–338); `!(platformRaw in D1_MAP)` triggers hard failure |
| `c17-eee-contract.mjs --self-test` | `scripts/validation/c17-fixtures/*.md` | `readFile` of both committed fixtures | VERIFIED | Lines 430: `readFile('scripts/validation/c17-fixtures/c17-fixture-passing.md')`; line 443: `readFile('scripts/validation/c17-fixtures/c17-fixture-failing.md')` |

### Data-Flow Trace (Level 4)

Not applicable — `c17-eee-contract.mjs` is a validation/tooling script, not a component rendering dynamic data. Data flow is file → validator → stdout/exit code, which is verified by the live behavioral spot-checks below.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Normal mode exits 0 on 8 enrolled files | `node scripts/validation/c17-eee-contract.mjs` | "8 files checked, 0 with violations, 0 total violations"; exit 0 | PASS |
| Self-test mode exits 0; all 4 sub-tests pass | `node scripts/validation/c17-eee-contract.mjs --self-test` | "4 passed, 0 failed"; exit 0; sub-tests A/B/C/D all PASS | PASS |
| Failing fixture triggers >=1 violation (sub-test B) | `--self-test` sub-test B | "got 2 violation(s): #5,#13" | PASS |
| UnknownOS platform fires assertion #10 (sub-test C) | `--self-test` sub-test C | "violations: [#10]" | PASS |

### Probe Execution

Not applicable — no probe scripts declared for this phase; verification via direct `node` invocations above.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| HARN-01 | 115-01-PLAN.md | Blocking C17 harness check authored as one indivisible validator atom; 13 machine-checkable EEE assertions; required frontmatter + block keys; Platform+Doc Type first; H1 descriptive; Summary-first; D1 map no-fallback; no Mermaid; table >25 rows prose summary; gate blockquote <=200 chars; Summary >=30 words; status set | SATISFIED | `c17-eee-contract.mjs` exists (587 lines), implements all 13 assertions in single `checkFile`, exits 1 on violations, exits 0 on enrolled corpus; live run confirmed |

**HARN-01 "indexed set is Approved-only"** — this clause in REQUIREMENTS.md describes a deployment policy (only Approved docs enter the Copilot Studio indexed library), not a machine-checkable lint assertion. ROADMAP SC2 and the PLAN's 13-assertion table do not include an Approved-only lint assertion; ROADMAP SC3 explicitly notes "C17 does not gate on Approved-only for templates." This is a SharePoint/Copilot Studio deployment concern addressed in PIPE-02 and out of scope for C17 lint. Not a gap.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | — | — | — |

All anti-pattern scans clean:
- No `TBD`, `FIXME`, `XXX` markers in any of the three deliverable files
- No `TODO` or `PLACEHOLDER` in `c17-eee-contract.mjs`
- No `return null`, `return []`, `return {}` early returns in `checkFile` (aggregate-only design verified)
- All state variables populated from actual file reads, not hardcoded empty values
- The "INTENTIONAL VIOLATIONS" comment in `c17-fixture-failing.md` is documentation of deliberate test behavior, not a debt marker

### Code-Review Fix Verification

All 6 findings from `115-REVIEW.md` are confirmed fixed in the current codebase:

| Finding | Commit | Fix Verified in Code |
|---------|--------|---------------------|
| CR-01: assertion #11 table loop missing inCodeFence guard | c4f8f5f | Line 349: `if (!inCodeFence[i] && trimmed.startsWith('\|'))` outer guard; line 352: `while (... && !inCodeFence[i] && ...)` inner guard |
| CR-02: assertion #12 blockquote loop missing inCodeFence guard | e30493b | Line 390: `if (!inCodeFence[i] && /^>/.test(bodyLines[i]))` outer guard; line 392: `while (... && !inCodeFence[i] && ...)` inner guard |
| WR-01: assertion #1 scanned raw content instead of fence-masked bodyLines | bf2be44 | Line 206: `bodyLines.some((l, i) => !inCodeFence[i] && /^\`\`\`mermaid/.test(l))` |
| WR-02: assertion #5 word count included code-fenced lines | 1202a8c | Lines 257–259: `if (!inCodeFence[i]) sumBodyLines.push(bodyLines[i])` |
| WR-03: walkMd used statSync (no symlink protection) | 4f547f7 | Line 16: `lstatSync` imported; line 78: `stat = lstatSync(full)`; line 79: `if (stat.isSymbolicLink()) continue;` |
| WR-04: assertion #10 gave identical message for absent vs unmapped platform | e1b2bdf | Lines 334–338: distinct branch for `platformRaw === undefined` ("platform key is absent") vs present-but-unmapped ("not in the D1 map") |

### Phase-119 Boundary Verification

`git diff-tree --no-commit-id -r --name-only` run on all 8 phase-115 commits (d1c1461, 390ea86, 4f547f7, bf2be44, 1202a8c, e1b2bdf, c4f8f5f, e30493b) confirms ONLY these three files were touched:
- `scripts/validation/c17-eee-contract.mjs`
- `scripts/validation/c17-fixtures/c17-fixture-passing.md`
- `scripts/validation/c17-fixtures/c17-fixture-failing.md`

No changes to `v1.15-milestone-audit.mjs`, `check-phase-*.mjs`, `scripts/validation/_lib/*`, `.github/workflows/*`, `BASELINE_19`, or V114 pin. Phase-119 boundary intact.

### Human Verification Required

None. All must-haves verified programmatically via live node execution.

### Gaps Summary

No gaps. All 7 PLAN must-have truths verified by live execution. All 3 artifacts are substantive and wired. All 3 key links confirmed in code and at runtime. The sole deferred item (chain registration alongside C1-C16) is an intentional design decision per CONTEXT D-04 that explicitly supersedes ROADMAP SC1's registration clause; Phase 119 (HARN-03) is the designated phase for the audit-fold.

---

_Verified: 2026-07-04T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
