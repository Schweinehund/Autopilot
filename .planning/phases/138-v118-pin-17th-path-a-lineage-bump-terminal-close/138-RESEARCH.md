# Phase 138: V118 Pin + 17th Path-A Lineage Bump + Terminal Close - Research

**Researched:** 2026-08-04
**Domain:** Repo-internal harness-lineage tooling (Node.js validator scripts, GitHub Actions YAML, git-forensics), NOT external-library research
**Confidence:** HIGH — every claim below is either `[VERIFIED: <path>:<lines>]` (file opened this session) or `[VERIFIED: <command>]` (command run this session). No web research was performed; none was needed or appropriate per the phase's own `<critical_research_constraints>`.

## Summary

Phase 138 is the 6th occurrence of this repo's own "harness close" pattern (Phases 100/112/119/125/128/134 are the precedents). It is almost entirely mechanical copy-forward work against a fixed, well-instrumented template: `check-phase-134.mjs` is the apex template, `v1.18-milestone-audit.mjs` + `v1.18-audit-allowlist.json` are the Path-A harness template, `audit-harness-v1.18-integrity.yml` is the CI-workflow template, and `_lib/frozen-at-close.mjs` is a pure append target. The single largest deviation from the v1.17→v1.18 precedent is **mechanism**, not content: 138-CONTEXT.md D-01 replaces the v1.17-era branch+PR Axis-2 trigger with an owner-executed `git push origin master` + `gh workflow run … --ref master` dispatch, which the planner must model as a **hard plan-boundary checkpoint** the executor cannot cross autonomously (D-02).

This research confirms, by direct file read, three things the planner needs and one thing it must NOT copy blind: (1) the exact 3-line diff shape between consecutive `vX.Y-milestone-audit.mjs` files and the 2-line diff shape between consecutive sidecar JSONs — confirming 138-CONTEXT D-20's action list is complete and matches the observed pattern exactly; (2) the exact leaf-vs-apex validator template, reproduced from `check-phase-132.mjs` (lightweight leaf, no chain) and `check-phase-134.mjs` (apex: AUDIT + CHAIN[48..N-1] + AUDIT-HARNESS + SELF); (3) the exact, already-shipped needle literals for `check-phase-135.mjs`, `check-phase-136.mjs`, and `check-phase-137.mjs`, extracted from the three predecessor phases' own VERIFICATION.md and SUMMARY.md files — none of these need re-derivation, only transcription into new validator files; and (4) confirmation that `build-publish-bundle.mjs`'s row-count self-test canary is **already at 225** (bumped in Phase 137) — Phase 138 does not need to touch that canary, only pass `--version=v1.19`.

**Primary recommendation:** Follow the check-phase-134.mjs / Phase-134-plan-shape template almost verbatim, with one structural change: split the close-gate plan (v1.18's Plan 05) at the owner-executed push/dispatch boundary, so the plan set has a genuine HALT point that a human must clear before the close-gate is authored — mirroring D-01/D-02's explicit "the plan must not proceed past it autonomously" instruction.

## Architectural Responsibility Map

This phase does not build application features; it extends validator/CI tooling in a docs-corpus repo. The "tiers" below are this repo's own layering, not a web-app's.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Back-anchor pin (V118) | `_lib/frozen-at-close.mjs` (shared lib) | — | Single source of truth for all frozen-SHA reads; append-only per D-18 |
| Per-milestone harness (C1–C17) | `scripts/validation/vX.Y-milestone-audit.mjs` + sidecar JSON | `regenerate-supervision-pins.mjs` (pin generator, advisory only) | Path-A copy-forward; harness owns the corpus-content assertions, sidecar owns line-pin exemptions |
| Per-phase leaf validators (135–137) | `scripts/validation/check-phase-{135,136,137}.mjs` | Recipe/SUMMARY files (needle source) | Lightweight, no chain — needles derived inline from each phase's own VERIFICATION.md |
| Chain apex (138) | `scripts/validation/check-phase-138.mjs` | `_lib/archive-path.mjs`, `_lib/exec-fail-detail.mjs` | Owns CHAIN[48..137] regression-guard + AUDIT-HARNESS + AUDIT + SELF; the only file allowed to spawn 90 subprocesses |
| CI coexistence surface | `.github/workflows/audit-harness-v1.19-integrity.yml` | 15 prior `audit-harness-*-integrity.yml` (frozen, untouched) | New workflow only; must not touch or duplicate any prior workflow's jobs |
| Publish bundle / doc-conversion pipeline | `scripts/pipeline/build-publish-bundle.mjs` | `.claude/hooks/publish-bundle-gate.cjs` (Stop-hook nudge, not a build actor) | Orchestrates `build-filename-map.mjs` → `convert.ps1` → `guard-docx.mjs`; already `--version`-parameterized |
| Close-gate (4-doc traceability flip) | `.planning/{PROJECT,ROADMAP,STATE,REQUIREMENTS}.md` | `.planning/milestones/v1.19-{MILESTONE-AUDIT,DEFERRED-CLEANUP}.md` (new) | Single atomic commit, precedent `7af8a147` (v1.18) |

## Package Legitimacy Audit

**N/A — this phase installs zero external packages.** All new/modified files (`check-phase-135..138.mjs`, `v1.19-milestone-audit.mjs`, `v1.19-audit-allowlist.json`, the CI workflow YAML, `_lib/frozen-at-close.mjs`'s append) are Node.js built-ins only, matching the explicit repo convention stated at `scripts/pipeline/build-publish-bundle.mjs:27` `[VERIFIED: scripts/pipeline/build-publish-bundle.mjs:27]`: *"Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/*.mjs family conventions)"*. No `npm install`, no `package.json` change, no registry lookup is in scope. The `package-legitimacy` gate and ecosystem-registry-verification protocol are skipped as not applicable.

## Standard Stack

Not applicable in the conventional sense — there is no new library selection in this phase. The "stack" is this repo's own prior-art validator/CI conventions, all confirmed present and current in the working tree:

| Tool | Version (confirmed this session) | Purpose |
|------|-----------------------------------|---------|
| Node.js | v24.17.0 `[VERIFIED: node --version]` | Runs all `check-phase-*.mjs` / `*-milestone-audit.mjs` / pipeline scripts |
| git | 2.51.0.windows.2 `[VERIFIED: git --version]` | SHA recovery, frozen reads, byte-unchanged diffs |
| pandoc | 3.7.0.2 `[VERIFIED: pandoc --version]` | MD→.docx conversion in the publish-bundle pipeline |
| PowerShell (pwsh) | present, exits 0 `[VERIFIED: pwsh -NoProfile -Command 'exit 0']` | Runs `scripts/pipeline/convert.ps1` |
| GitHub CLI (gh) | 2.81.0 `[VERIFIED: gh --version]` | D-01's owner-executed `gh workflow run … --ref master` dispatch |

All five are already installed and on PATH in this environment — the Environment Availability section below records this formally.

### Alternatives Considered

None — the phase's own hard constraints (`138-CONTEXT.md` D-00a doctrine, `HARNESS-PHASE` in STATE.md) bar introducing any new tool or pattern not already present in the 17-milestone lineage.

## Architecture Patterns

### System Architecture Diagram

```
                                   [Phase 138 START]
                                          |
                                          v
                 +--------------------------------------------------+
                 | Plan A: V118 pin                                   |
                 | _lib/frozen-at-close.mjs (append-only)             |
                 |   + readAtV118Close export                         |
                 |   Wave-0 anchor SHA captured (git rev-parse HEAD)  |
                 +--------------------------------------------------+
                                          |
                                          v
                 +--------------------------------------------------+
                 | Plan B: 17th harness (Atom 1)                      |
                 | v1.19-milestone-audit.mjs  <- Path-A copy v1.18    |
                 | v1.19-audit-allowlist.json <- header-only copy     |
                 | BASELINE_23 comment appended (pin generator)       |
                 +--------------------------------------------------+
                                          |
                                          v
                 +--------------------------------------------------+
                 | Plan C: 4 new validators + 16th workflow (Atom 2)  |
                 | check-phase-135.mjs (leaf, needles from 135-VERIF) |
                 | check-phase-136.mjs (leaf, needles from 136-VERIF) |
                 | check-phase-137.mjs (leaf, needles pre-specified)  |
                 | check-phase-138.mjs (apex: AUDIT+CHAIN[48..137]    |
                 |    +AUDIT-HARNESS+SELF; 90 chain entries, 93 total)|
                 | audit-harness-v1.19-integrity.yml (16th coexist.)  |
                 |   -> local proof: apex-138 exits 0 standalone      |
                 +--------------------------------------------------+
                                          |
                                          v
                 +--------------------------------------------------+
                 | Plan D: Pre-push local re-audit (HARN-15 gate)     |
                 | (i) apex-138 GREEN, non-nested, no competing load  |
                 | (ii) non-nested drift band [60..66] RED, named     |
                 | (iii) full-90 non-nested sweep declared NOT        |
                 |     attempted (exponential, measured)              |
                 | Axis 1 (Windows fresh-clone, advisory) + Axis 3    |
                 | (same-host zero-context, corroborating) captured   |
                 +--------------------------------------------------+
                                          |
                                          v
                    ============ OWNER CHECKPOINT (D-01/D-02) ============
                    |  Executor commits Plans A-D, then HALTS.            |
                    |  Owner runs, outside the agent session:              |
                    |    git push origin master                            |
                    |    gh workflow run audit-harness-v1.19-integrity.yml \|
                    |      --ref master                                    |
                    |  Executor resumes only after owner confirms push+run |
                    ========================================================
                                          |
                                          v
                 +--------------------------------------------------+
                 | Plan E: Axis-2 capture + GA-4 cascade disposition  |
                 | Post-assertions (D-03): origin/master==HEAD,       |
                 |   0-ahead; new workflow appears + not disabled      |
                 | Capture live run: PASS/FAIL/SKIP per job            |
                 | Enumerate + dispatch all 16 workflows (D-08.i)      |
                 | GA-4 disposition: ACCEPTED-STANDALONE-CI-RED,       |
                 |   corrected baseline 5 PASS / 10 FAIL (D-08.ii)     |
                 +--------------------------------------------------+
                                          |
                                          v
                 +--------------------------------------------------+
                 | Plan F: Close-gate                                 |
                 | v1.19-MILESTONE-AUDIT.md (3-axis re-audit narrative)|
                 | v1.19-DEFERRED-CLEANUP.md (entry list per D-25/26/27)|
                 | 138-VERIFICATION.md                                 |
                 | SINGLE commit: PROJECT/ROADMAP/STATE/REQUIREMENTS   |
                 |   17/17 -> Validated                                 |
                 | POST-close-gate confirmatory apex run (D-15 pt 4):  |
                 |   V-138-AUDIT must now PASS (not SKIP)               |
                 +--------------------------------------------------+
                                          |
                                          v
                                   [Phase 138 / v1.19 CLOSED]
```

### Recommended Plan Structure (decomposition precedent + fit)

`[VERIFIED: .planning/milestones/v1.18-phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-0{1..5}-PLAN.md]` — Phase 134 (v1.18's direct analogue) ran **5 plans**, each with a single clear `<objective>` and `depends_on` chain:

| Plan | Requirements | depends_on | Objective (verbatim summary) |
|------|--------------|------------|-------------------------------|
| 134-01 | HARN-11 | `[]` | V117 pin + Wave-0 anchor SHA capture |
| 134-02 | HARN-12 | `[]` | Author 16th harness Atom 1 (harness + sidecar + BASELINE_22 comment) |
| 134-03 | HARN-12 | `[134-02]` | Author 6 new validators (5 leaf 129-133 + 1 apex 134) + 15th CI workflow; prove apex green standalone |
| 134-04 | HARN-13 | `[134-01,134-02,134-03]` | Pre-push local re-audit: full chain 0-FAIL, byte-unchanged gate, Axis 1 + Axis 3 |
| 134-05 | HARN-13 | `[134-04]` | Close-gate: two terminal docs + VERIFICATION + single 20-req Validated flip; Axis 2 fired via the close-PR itself |

`[VERIFIED: .planning/milestones/v1.17-phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-0{1..7}-PLAN.md]` — Phase 128 (v1.17) used **7 plans** for a larger scope (6 new validators, an extra corpus-rename-proof concern that v1.18/v1.19 do not carry).

**Fit for v1.19 (4 new validators: 135, 136, 137 leaves + 138 apex — one fewer leaf than v1.18's 5):** the Phase-134 5-plan shape fits closely, with **one mandatory structural addition Phase 134 did NOT need**: 138-CONTEXT.md D-01 replaces v1.18's branch+PR Axis-2 mechanism (which fired automatically inside the close-gate plan, 134-05, via the close-PR) with an **owner-executed push + explicit `gh workflow run --ref master` dispatch that the executor cannot perform** (D-02: *"authorization alone does not move the executor across that boundary. Hard stop at the checkpoint; the plan must not proceed past it autonomously."*). This means the close-gate work must be split into **at least two plans** around that boundary, where v1.18 needed only one:

- A pre-checkpoint plan (mirrors 134-04, possibly folding in the push-prep): local re-audit, commit everything, then a `checkpoint:human-verify`-style HALT instructing the owner to push + dispatch.
- A post-checkpoint plan (the "Plan E" + "Plan F" split above, or fused into one plan with an internal HALT): capture the live Axis-2 run, resolve GA-4 disposition, THEN author the close-gate.

**Recommended shape: 6 plans**, i.e. Phase 134's 5-plan shape plus one extra split at the owner checkpoint — not 5 (checkpoint would be buried mid-plan, violating D-02's "hard stop... must not proceed past it autonomously") and not 7 (v1.19 has one fewer new validator than v1.18, so no extra plan is warranted elsewhere). The planner has final discretion here per 138-CONTEXT `<decisions>` "Claude's Discretion" (*"Plan decomposition and commit-message subjects"*), but the checkpoint-as-plan-boundary constraint is a hard requirement stated explicitly in the critical_research_constraints, not optional.

### Pattern 1: Leaf validator (lightweight, no chain)

**What:** A per-phase validator that asserts only that phase's own deliverables via inline string/regex needles against the shipped file(s). No subprocess chain — chain logic lives only in the apex.
**When to use:** For `check-phase-135.mjs`, `check-phase-136.mjs`, `check-phase-137.mjs` — mirrors `check-phase-132.mjs` and `check-phase-133.mjs` exactly.
**Example (verbatim structural skeleton, from the actual file):**
```javascript
// Source: check-phase-132.mjs:33-35 [VERIFIED: scripts/validation/check-phase-132.mjs:33-35]
// Lightweight: NO chain (chain lives only in apex check-phase-134.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```
Each leaf ends with the identical `V-<N>-SELF` dual-invariant check (`CHAIN_PHASES` excludes N; `CHAIN_SKIP` empty) and the identical runner-loop/padLabel/exit-code tail `[VERIFIED: scripts/validation/check-phase-132.mjs:106-149, check-phase-133.mjs:81-124]` — copy that tail byte-for-byte.

### Pattern 2: Chain apex (the terminal validator of a milestone)

**What:** The single validator that (a) checks its own phase's `-VERIFICATION.md` exists (SKIP-PASS pre-close-gate), (b) recursively runs every `check-phase-{48..N-1}.mjs`, NESTED-aware, (c) runs the current milestone's harness, (d) asserts the dual self-invariant.
**When to use:** For `check-phase-138.mjs` only.
**Example (the load-bearing module-load guard, from the actual apex):**
```javascript
// Source: check-phase-134.mjs:85-98 [VERIFIED: scripts/validation/check-phase-134.mjs:85-98]
// De-duplication guard: length + termini asserts alone do not catch a duplicated/dropped interior
// entry (RESEARCH GA-2 guardrail). Assert the set of unique values also has exactly 86 members.
if (new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length) {
  throw new Error('check-phase-134 CHAIN_PHASES contains duplicate entries (unique count ' + new Set(CHAIN_PHASES).size + ' !== ' + CHAIN_PHASES.length + ')');
}
if (CHAIN_PHASES.length !== 86) {
  throw new Error('check-phase-134 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 86 (integers 48..133 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 133) {
  throw new Error('check-phase-134 CHAIN_PHASES must span 48..133 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}
```
For check-phase-138.mjs: `CHAIN_PHASES` is the 90-entry array `[48..137]`, the length-throw compares against `90`, and the termini-throw compares against `48`/`137` (per 138-CONTEXT D-29, independently derivable: 137 − 48 + 1 = 90 `[VERIFIED: arithmetic]`).

**Three fixes required in the NEW file that must NOT be copied from `check-phase-134.mjs` (138-CONTEXT D-30, confirmed present in the actual template read this session):**
1. No `maxBuffer` on `execFileSync` — `[VERIFIED: scripts/validation/check-phase-134.mjs:144-150]` the call `execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv })` has no `maxBuffer` key, so Node's 1 MiB default applies; a chatty child gets silently converted to a caught FAIL.
2. The `isMissing` heuristic — `[VERIFIED: scripts/validation/check-phase-134.mjs:155-157]` `const isMissing = err.code === 'ENOENT' || err.status === 127 || stderr.includes('not found') || stderr.includes('Could not resolve');` converts a module-load throw whose stderr happens to contain "not found" into a green SKIP.
3. Graceful-skip on a missing chain child — `[VERIFIED: scripts/validation/check-phase-134.mjs:138-140]` `if (!existsSync(...)) return { pass: true, skipped: true, ... }` means a deleted predecessor validator produces a SKIP, not a FAIL.

### Pattern 3: Path-A milestone-harness copy-forward (the 3-line diff)

**What:** The full, exact set of lines that change between two consecutive `vX.Y-milestone-audit.mjs` files on a pure Path-A bump (no C-check content change, no corpus rename).
**Confirmed this session** via `diff scripts/validation/v1.17-milestone-audit.mjs scripts/validation/v1.18-milestone-audit.mjs` `[VERIFIED: diff command output, this session]` — exactly **4 line-pairs** changed, in **3 logical spots**:
1. The header comment block (3 consecutive lines: lineage-chain sentence, `// Source of truth:` CONTEXT pointer, `// Sidecar allow-list:` description).
2. The `// Usage:` line (filename only).
3. The sidecar `readFile(...)` call's path string.

This is a **superset confirmation** of 138-CONTEXT D-20's 3-item action list ((a) copy sidecar header-only, (b) append BASELINE comment, (c) repoint the harness's sidecar `readFile`) — the diff shows the harness file itself needs exactly the header-comment update (item not explicitly separated in D-20 but implied by "copy forward" and confirmed here as real, not optional) plus item (c). Nothing else in the ~40KB harness file changes on a pure lineage bump.

**Sidecar JSON diff** (`diff scripts/validation/v1.17-audit-allowlist.json scripts/validation/v1.18-audit-allowlist.json` `[VERIFIED: diff command output, this session]`): exactly 2 lines — `"generated"` timestamp and `"phase"` string. Confirms 138-CONTEXT D-20's claim verbatim: *"Byte-verbatim is impossible: `diff v1.17-audit-allowlist.json v1.18-audit-allowlist.json` = the `generated` and `phase` header fields only."*

### Pattern 4: 16th CI workflow (job-set delta)

**What:** The exact set of jobs/lines that change between two consecutive `audit-harness-vX.Y-integrity.yml` files.
**Confirmed this session** via `diff .github/workflows/audit-harness-v1.17-integrity.yml .github/workflows/audit-harness-v1.18-integrity.yml` `[VERIFIED: diff command output, this session]`:
- Header comment block: name/lineage sentence, phase+requirement-ID reference, "PRESERVES from" lineage-chain sentence, DUAL-APEX note (renumbered citation), plus **a new CARVE-1 comment block** that v1.17's header did not carry (a phase-specific addition, not boilerplate — the planner should add an equivalent phase-138-specific note only if a new deliberately-deferred issue surfaces, not copy CARVE-1's text verbatim).
- `name:`, all four `paths:` filter entries, both `.planning/milestones/` path entries — all version-string substitutions.
- `parse` / `path-match` / `harness-run` job bodies — pure version-string substitutions.
- `linux-chain-ubuntu-latest` job: apex filename + chain-range in the `name:` and the `::notice` string.
- **Leaf job blocks**: v1.17→v1.18 ADDED 4 new leaf job blocks (`check-phase-131`, `-132`, `-133`) plus renamed the existing 2 (`126→129`, `127→130`) and renamed the apex job (`128→134`). For v1.19: **3 leaf job blocks** (`check-phase-135`, `-136`, `-137`) plus the apex job (`check-phase-138`) — one fewer leaf block than the v1.18 bump, consistent with 4 new validators total vs. v1.18's 6.
- `rotting-external-quarterly` job: only the sidecar path string changes.
- `pin-helper-advisory` job: unchanged (no version string inside).

**Full structural template** (all fields, verbatim job skeleton) is captured in Code Examples below — copy `audit-harness-v1.18-integrity.yml` wholesale and apply exactly this delta set.

### Recommended Project Structure

No new directories. Files land in the two existing locations:
```
scripts/validation/
├── check-phase-135.mjs          # NEW — leaf, needles from 135-VERIFICATION.md
├── check-phase-136.mjs          # NEW — leaf, needles from 136-VERIFICATION.md (Section 4 table)
├── check-phase-137.mjs          # NEW — leaf, needles pre-specified verbatim (137-02-SUMMARY.md)
├── check-phase-138.mjs          # NEW — apex, CHAIN_PHASES=[48..137] (90 entries)
├── v1.19-milestone-audit.mjs    # NEW — Path-A copy of v1.18-milestone-audit.mjs
├── v1.19-audit-allowlist.json   # NEW — header-only copy of v1.18-audit-allowlist.json
├── regenerate-supervision-pins.mjs  # MODIFIED — BASELINE_23 comment appended only
└── _lib/frozen-at-close.mjs     # MODIFIED — V118 entry + readAtV118Close export appended only

.github/workflows/
└── audit-harness-v1.19-integrity.yml  # NEW — 16th coexistence workflow

.planning/milestones/
├── v1.19-MILESTONE-AUDIT.md     # NEW — close-gate deliverable
└── v1.19-DEFERRED-CLEANUP.md    # NEW — close-gate deliverable
```

### Anti-Patterns to Avoid

- **Copying Phase 134's `CHAIN_PHASES` array forward unaudited** — 138-CONTEXT D-29/ROADMAP hard constraint. Independently derive `[48..137]` (90 entries) and let the module-load throws (length≠90, termini≠48/137, dedup≠90) catch drift.
- **Adding a standalone `check-phase-134` job to the new workflow** — 138-CONTEXT D-08.iii: the v1.18 workflow already carries the sole standalone `check-phase-134` job (`[VERIFIED: .github/workflows/audit-harness-v1.18-integrity.yml:172-184]`), and it is the source of Axis-2-authoritative predecessor-apex evidence. Duplicating it in the v1.19 workflow would not add coverage and would violate the "no new job for a frozen predecessor" convention (visible in the fact that v1.18's workflow contains no `check-phase-128` job either).
- **Editing `_lib/archive-path.mjs`, `c17-eee-contract.mjs`, or `_lib/exec-fail-detail.mjs`** — 138-CONTEXT D-18: byte-frozen for the duration of Phase 138, no carve-out. `[VERIFIED: scripts/validation/_lib/archive-path.mjs:1-30, full file read this session]` — the file's own top-of-file doc-comment already documents the live-then-archived resolution order the apex depends on; no change is needed or permitted.
- **Running the CHECK_PHASE_NESTED short-circuit as the drift-detection gate** — 138-CONTEXT D-15: nested runs skip 86-90 checks entirely (`[VERIFIED: scripts/validation/check-phase-134.mjs:134-136,172-174]` both the CHAIN loop and the AUDIT-HARNESS step short-circuit under `NESTED`). Only a non-nested run surfaces live-HEAD content drift.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| Reading a file at a frozen milestone-close SHA | A new `git show`-wrapping helper | `readAtClose(tag, path)` / the convenience exports in `_lib/frozen-at-close.mjs` | Already centralized, hardened (CRLF-normalized, explicit stdio, 10s timeout) `[VERIFIED: scripts/validation/_lib/frozen-at-close.mjs:89-106]` — the ONLY permitted edit is appending one `V118` entry + one `readAtV118Close` export |
| Resolving a phase artifact that may be live or archived | A new path-existence branch | `resolveArchivedPhasePath(phaseSuffix, milestoneRoots)` | Already handles both live (`.planning/phases/…`) and archived (`.planning/milestones/<root>/…`) cases, checking live first `[VERIFIED: scripts/validation/_lib/archive-path.mjs:19-30]`; byte-frozen this phase, so it must be reused, not extended |
| Truncating/prefixing subprocess FAIL output | A custom stdout/stderr slicer | `execFailDetail(stdout, stderr, opts)` from `_lib/exec-fail-detail.mjs` | Already imported and used identically by `check-phase-134.mjs:158,184` `[VERIFIED: scripts/validation/check-phase-134.mjs:60,158,184]`; byte-frozen this phase per D-18 |
| Deriving the publish-bundle zip filename from a version string | A new regex | `deriveZipName(version)` in `build-publish-bundle.mjs` | Already exists, already anchored (`^v\d+\.\d+(\.\d+)?$`) against path-traversal `[VERIFIED: scripts/pipeline/build-publish-bundle.mjs:54-59]`; the `--version=v1.19` flag is the only input needed |
| Confirming the harness references the correct sidecar in CI | A new grep step design | The `path-match` job's exact `grep -q "scripts/validation/v1.19-audit-allowlist.json" scripts/validation/v1.19-milestone-audit.mjs` pattern | Verbatim copy-forward from `audit-harness-v1.18-integrity.yml:56-69` `[VERIFIED: .github/workflows/audit-harness-v1.18-integrity.yml:56-69]` |

**Key insight:** every piece of infrastructure this phase needs already exists in the repo as a template from the prior 5 harness-close phases. The work is disciplined transcription with 3 independently-derived numbers (V118 SHA, CHAIN_PHASES bounds, needle literals) — not design.

## Common Pitfalls

### Pitfall 1: Trusting `git log --all --grep --all-match -1` for SHA recovery
**What goes wrong:** Returns the wrong commit — the body-text match, not the close-gate commit — or returns 2+ candidates silently resolved by `-1`.
**Why it happens:** `--grep` matches anywhere in the commit message (body included), and multiple commits can carry both tokens (e.g., a v1.17 close-gate commit also contains the literal string "v1.18" somewhere in its body).
**How to avoid:** Use the SUBJECT-LINE-only discriminator already run and confirmed this milestone: `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.18/ && $2 ~ /MILESTONE CLOSE/'` `[VERIFIED: STATE.md:32, confirmed resolves to exactly 7af8a14766d346a348f7adf05d260676dbe4c1b2, count=1]` — already run for V118, result already recorded, do NOT re-run or re-derive.
**Warning signs:** The naive dual-`--grep --all-match` count is 2+ (confirmed at `STATE.md:30`: returns 5 commits with a wrong-first result under `--grep="close-gate"`).

### Pitfall 2: Copying `CHAIN_PHASES` forward without the module-load throws catching drift
**What goes wrong:** An apex ships with a stale or off-by-one chain array that silently validates the wrong span.
**Why it happens:** Copy-paste is fast, but a length/terminus mismatch is invisible unless something asserts it at import time.
**How to avoid:** `check-phase-134.mjs:87-98` already provides this pattern — three throws (dedup, length, termini) that fire at module load, before any check runs. `check-phase-138.mjs` must carry the equivalent throws against 90/48/137.
**Warning signs:** `node scripts/validation/check-phase-138.mjs` crashes immediately with no "Result:" summary line — that IS the guard working, not a bug.

### Pitfall 3: Believing the nested chain-guard proves anything about live-HEAD drift
**What goes wrong:** A "0 FAIL" claim from a `CHECK_PHASE_NESTED=1` run gets carried into `v1.19-MILESTONE-AUDIT.md` as if it were a real full-chain result.
**Why it happens:** Nested runs are fast and green, so they look like proof — but they SKIP the chain and AUDIT-HARNESS steps entirely by design (`check-phase-134.mjs:134-136,172-174`).
**How to avoid:** 138-CONTEXT D-15/D-24 already name the correct gate shape (4 parts, part (ii) explicitly non-nested) and explicitly forbid the phrase "0 FAIL across the non-nested chain" (STATE.md:343 already flags this as previously-false).
**Warning signs:** Any sentence in the close-gate docs claiming a full non-nested sweep of all 90 chain entries succeeded — this is structurally impossible in reasonable time (measured doubling 5s→300s across just phases 60-66, per 138-CONTEXT D-15 part 3) and must instead be the named-band-RED + explicit-non-attempt framing D-15 specifies.

### Pitfall 4: Assuming a `push` fires the integrity workflows
**What goes wrong:** Waiting for a `git push origin master` to trigger `audit-harness-v1.19-integrity.yml` automatically.
**Why it happens:** The natural CI mental model (push → CI runs) doesn't hold here.
**How to avoid:** 138-CONTEXT D-31, corrected from a v1.18 documentation error: *"no workflow in `.github/workflows/` has a `push:` trigger"* — confirmed by the trigger block read this session (`[VERIFIED: .github/workflows/audit-harness-v1.18-integrity.yml:22-34]`, triggers are `pull_request` (paths-filtered), `schedule` (2 crons), and `workflow_dispatch` only). The owner must explicitly run `gh workflow run audit-harness-v1.19-integrity.yml --ref master` after the push (D-01).
**Warning signs:** A plan step that says "push and wait for the check to appear" with no explicit `gh workflow run` step.

## Code Examples

### The full 16th-workflow template (structural skeleton to copy and version-bump)

```yaml
# Source: .github/workflows/audit-harness-v1.18-integrity.yml (full file read this session)
# [VERIFIED: .github/workflows/audit-harness-v1.18-integrity.yml:1-237]
name: Audit Harness v1.18 Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/v1.18-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.18-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.18-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.18-DEFERRED-CLEANUP.md'
  schedule:
    - cron: '0 8 * * 1'
    - cron: '0 8 1 1,4,7,10 *'
  workflow_dispatch:

jobs:
  parse: { ... }        # Validates the sidecar JSON's supervision_exemptions array
  path-match: { ... }   # grep-confirms harness references the sidecar filename
  harness-run: { ... }  # node scripts/validation/vX.Y-milestone-audit.mjs --verbose
  linux-chain-ubuntu-latest: { ... }  # apex-N.mjs, fetch-depth:0, autocrlf false, timeout-minutes:30
  check-phase-<leaf-1..leaf-k>: { ... }  # one job block per NEW leaf validator this phase
  check-phase-<apex>: { ... }            # apex job, timeout-minutes:30
  rotting-external-quarterly: { ... }    # quarterly c13 link-check, sidecar-sourced URLs
  pin-helper-advisory: { ... }           # continue-on-error:true, never blocks
```
For v1.19: `check-phase-135`, `check-phase-136`, `check-phase-137` as three leaf job blocks (each identical to the `check-phase-129` skeleton at `[VERIFIED: .github/workflows/audit-harness-v1.18-integrity.yml:102-114]` — `runs-on: ubuntu-latest`, `needs: harness-run`, `timeout-minutes: 15`, `continue-on-error: false`, checkout+setup-node+run), then `check-phase-138` as the apex job (mirrors `check-phase-134`'s block exactly, `timeout-minutes: 30`).

### The needle-spec for `check-phase-137.mjs` (fully pre-specified — do not re-derive)

```
# Source: 137-02-SUMMARY.md:122-146 [VERIFIED: .planning/phases/137-integration-navigation-last-close/137-02-SUMMARY.md:122-146]
# and STATE.md:349 [VERIFIED: .planning/STATE.md:349]

Invariant shape: per-recipe, LINE-SCOPED co-presence check, NOT a whole-file c.includes().
For each recipe:
  1. a line matching ^\| \[<H1 verbatim>\]\(recipes/0N-....md\) \| exists in docs/index.md
  2. the single line matching ^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)
     contains the recipe's fixed prose fragment

Table targets (literal): recipes/03-windows-11-multi-app-kiosk.md
                          recipes/04-android-dedicated-mhs-multi-app.md
Bullet fragments (literal): Windows 11 multi-app kiosk
                             Android Dedicated multi-app kiosk
Hubs-not-wired literals (own check, since check-phase-132.mjs:97 doesn't cover these
  and must NOT be edited — frozen v1.18 surface): recipes/03-  , recipes/04-
```
A whole-file `includes('Dedicated')` would false-match `docs/index.md:36` per the SUMMARY's own warning — build the leaf validator to extract and test the single matching line, exactly as `check-phase-132.mjs`'s `V-132-INDEXNAV`/`V-132-HUBSNOTWIRED` checks do (`[VERIFIED: scripts/validation/check-phase-132.mjs:74-104]`).

### The needle-basis for `check-phase-135.mjs` and `check-phase-136.mjs` (measured actuals, ready to transcribe)

`[VERIFIED: .planning/phases/135-recipe-3-windows-11-multi-app-kiosk/135-VERIFICATION.md:29-47]` — file exists at 329 lines, contains `## Rollback/Recovery` between `## Verification` and `## Configuration-Caused Failures` (H2 order confirmed at exact line numbers in the VERIFICATION doc), zero edits to `docs/recipes/01-shared-windows-avd-client.md`, one column-0 ```xml``` fence (lines 131-162 as shipped), 3-row namespace table (lines 206-212), 8-row anti-feature table.

`[VERIFIED: .planning/phases/136-recipe-4-android-dedicated-mhs-multi-app/136-02-SUMMARY.md:150-164]` — Section 4 closure table gives exact, non-range counts on the shipped `docs/recipes/04-android-dedicated-mhs-multi-app.md` (301 lines): 8 H2s in fixed order, 6 `### Step` headings, 5 decision blocks, 5 `Ask the admin` lead-ins, 6 `What breaks if misconfigured` callouts, 9 anti-feature rows, 10 decomposition-table rows, 7 Verification checklist lines, 4 Failures-table rows, exactly 1 `json` code fence at column 0.

Both files are the direct successors to the `132-VERIFICATION.md`-sourced needle-derivation convention documented in `check-phase-132.mjs`'s own header comment (`[VERIFIED: scripts/validation/check-phase-132.mjs:5-8]`: *"NEEDLES DERIVED INLINE from 132-VERIFICATION.md (Required Artifacts / Observable Truths)"*) — the planner should point the leaf-validator-authoring task at `135-VERIFICATION.md`'s Observable Truths table and `136-02-SUMMARY.md`'s Section 4 closure table respectively, not at the recipe files' raw prose.

### The BASELINE_23 comment shape (append-only, to `regenerate-supervision-pins.mjs`)

```javascript
// Source: regenerate-supervision-pins.mjs:503-514 (BASELINE_22's shape, the direct precedent)
// [VERIFIED: scripts/validation/regenerate-supervision-pins.mjs:503-514]
// BASELINE_22 refreshed 2026-07-20 (Phase 134 Plan 134-02): closes BASELINE_21 v1.17 carry-over
// per HARN-12 contract (REQUIREMENTS.md + ROADMAP.md Phase 134 SC#2); v1.18 line positions
// verified against HEAD b54043aa... (JIT pre-Atom-1 HEAD -- captured via `git rev-parse HEAD`
// immediately before authoring Atom 1 (this comment), NOT the Wave-0 anchor 18fd8b63...
// recorded in 134-01-SUMMARY.md; Plan 134-02 Task 1's own harness-authoring commit
// (b54043aa, "feat(134-02): author 16th Path-A audit harness") landed between Wave-0 and this
// Atom 1, so the true pre-Atom-1 predecessor is b54043aa, per the Phase 119/125/128 recorded
// Wave-0-vs-pre-Atom-1-anchor distinction).
// BASELINE_9 entries above remain unchanged -- Phase 134 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 134
// close and remain valid for the v1.18 corpus. Resolution path: BASELINE_23 will refresh at the
// next milestone close per the Path-A inheritance pattern (... -> v1.17 -> BASELINE_21 -> v1.18 -> BASELINE_22).
```
For BASELINE_23: same shape, dated at Phase 138's Plan-138-02 Atom-1 authoring time, citing the actual pre-Atom-1 HEAD SHA (captured via `git rev-parse HEAD` immediately before authoring, NOT the Wave-0 anchor recorded in Plan 138-01's SUMMARY — this Wave-0-vs-pre-Atom-1 distinction has now recurred at Phases 119/125/128/134, so it is a load-bearing convention, not an incidental note), and forward-pointing to "BASELINE_24 will refresh at the next milestone close (… → v1.18 → BASELINE_22 → v1.19 → BASELINE_23)."

## State of the Art

Not applicable — this is a closed, self-referential 17-milestone lineage with no external ecosystem dependency to track. The only "state of the art" question in scope is whether the repo's own prior close-gate mechanism (branch+PR) is still the right Axis-2 trigger, and 138-CONTEXT.md D-01 has already re-ruled that question (owner push + `workflow_dispatch`, struck the branch+PR candidate) with dominant precedent cited from `v1.7`-through-`v1.14`-era MILESTONE-AUDIT docs. This research does not re-open it.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The v1.19 workflow will need exactly 3 new leaf job blocks (135, 136, 137) plus 1 apex job block (138), by direct analogy to the observed v1.17→v1.18 delta (which added exactly as many leaf blocks as new non-apex validators). This is a structural inference from the diff pattern, not a value read from a source-of-truth file naming the v1.19 job set (which does not yet exist). | Architecture Patterns / Pattern 4 | If wrong, the workflow under-covers a validator in CI (a leaf never gets its own standalone CI job) — low risk, easily caught by `V-138-AUDIT-HARNESS`/chain during local proof before push |
| A2 | The recommended 6-plan decomposition (Phase 134's 5-plan shape + 1 split at the owner checkpoint) is a recommendation, not a value read from any locked CONTEXT.md decision — 138-CONTEXT.md explicitly leaves "Plan decomposition" to Claude's Discretion. | Architecture Patterns / Recommended Plan Structure | If the planner picks a different split (e.g., fold the checkpoint into the Plan-D SUMMARY with the close-gate as Plan E, netting 5 plans total), that is within the discretion CONTEXT.md grants — not a defect, provided the checkpoint remains a plan boundary the executor halts at, not a mid-plan step |

**If this table is empty:** N/A — two low-risk structural inferences are logged above; every value-level claim (SHAs, counts, literals, file paths, diff contents) in this document was directly verified by opening the source file or running the command this session.

## Open Questions

None outstanding for planning purposes. 138-CONTEXT.md's 32 locked decisions (D-01 through D-32) resolve every substantive judgment call this phase requires; this research's job was to confirm the mechanical templates those decisions reference actually look the way the decisions assume — confirmed in every case checked (D-20's action-list completeness, D-30's three apex defects, D-15's nested-guard behavior, D-18's byte-freeze target list, the check-phase-137 needle literals, the check-phase-135/136 needle bases).

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validator/harness scripts | ✓ | v24.17.0 | — |
| git | SHA recovery, frozen reads, diffs | ✓ | 2.51.0.windows.2 | — |
| pandoc | Publish-bundle MD→.docx conversion | ✓ | 3.7.0.2 | — |
| PowerShell (pwsh) | `convert.ps1` | ✓ | responds to `-Command 'exit 0'` | — |
| GitHub CLI (gh) | Owner's D-01 `workflow_dispatch` step | ✓ | 2.81.0 | — |

**Missing dependencies with no fallback:** none.
**Missing dependencies with fallback:** none — all five tools this phase depends on are confirmed present in this environment.

Note: `gh` and the `git push` step are specifically **owner-executed, not executor-executed** per D-02 — their presence in this environment is necessary for the owner's manual checkpoint step to be runnable, but the autonomous plan execution never invokes them directly.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (treated as enabled), but this phase has essentially no traditional web/app security surface — it is git-forensics, static-file validators, and CI YAML in a documentation corpus with no runtime service, no auth, no user input.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface in this phase's deliverables |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Marginal | `deriveZipName`'s anchored version regex (`^v\d+\.\d+(\.\d+)?$`) already guards path-traversal in the one place this phase touches user-influenced string input (the `--version=v1.19` CLI flag) `[VERIFIED: scripts/pipeline/build-publish-bundle.mjs:48-59]` — reuse, do not re-validate |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|----------------------|
| Path traversal via a version-string CLI flag flowing into a filesystem path | Tampering | Already mitigated by the anchored regex in `deriveZipName` (D-05/T-127-05, confirmed present) and mirrored in `publish-bundle-gate.cjs`'s own `VERSION_RE` (`[VERIFIED: .claude/hooks/publish-bundle-gate.cjs:41]`) — no new validation code needed |
| A subprocess spawn with unbounded stdout/stderr causing a silent buffer-overflow FAIL | Denial of Service (self-inflicted, not attacker-facing) | 138-CONTEXT D-14/D-30 mandate an explicit `maxBuffer` on the new apex's `execFileSync` calls — this is the one concrete code-level fix this phase must apply that the frozen predecessor apex lacks |
| A `git log --grep` false-positive silently pinning the wrong close SHA | Tampering (of the frozen-read chain, not of a live system) | Subject-line-only discriminator (already run and recorded for V118), never trust `-1` on a body-matching grep |

## Sources

### Primary (HIGH confidence — all `[VERIFIED]`, opened or run this session)
- `.planning/phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-CONTEXT.md` (full read) — 32 locked decisions, canonical refs, live measurements
- `.planning/REQUIREMENTS.md` — HARN-14/15/16 exact text, traceability table
- `.planning/STATE.md` — PIPE-02 discharge record, Phase-138 Plan-Time Research Flags (including the check-phase-137 needle handoff and the corrected GA-4 baseline)
- `.planning/ROADMAP.md` §"Phase 138" — Success Criteria 1-4 verbatim
- `scripts/validation/check-phase-134.mjs` (full read) — apex template
- `scripts/validation/check-phase-132.mjs`, `check-phase-133.mjs` (full reads) — leaf template
- `scripts/validation/_lib/frozen-at-close.mjs` (full read) — append-only pin target
- `scripts/validation/_lib/archive-path.mjs` (full read) — resolution order
- `.github/workflows/audit-harness-v1.18-integrity.yml` (full read) — 16th workflow template
- `scripts/pipeline/build-publish-bundle.mjs` (relevant sections read) — version flag, divergence guard, Approved-selection, self-test canary (confirmed 225, already bumped)
- `.claude/hooks/publish-bundle-gate.cjs` (full read) — Stop-hook gate logic
- `.planning/phases/135-recipe-3-windows-11-multi-app-kiosk/135-VERIFICATION.md` (full read) — needle basis
- `.planning/phases/136-recipe-4-android-dedicated-mhs-multi-app/136-VERIFICATION.md`, `136-02-SUMMARY.md` (full reads) — needle basis
- `.planning/phases/137-integration-navigation-last-close/137-02-SUMMARY.md` (relevant sections read) — pre-specified check-phase-137 needle
- `scripts/validation/regenerate-supervision-pins.mjs` (relevant section read) — BASELINE_22 shape
- `scripts/validation/check-phase-54.mjs` (relevant sections read) — live-REQUIREMENTS/ROADMAP negative-assertion confirmation
- `git show 7af8a147 --stat` (run this session) — close-gate commit surface precedent
- `diff` commands (run this session, 4x) — v1.17→v1.18 harness, sidecar, workflow deltas
- `node/git/pandoc/pwsh/gh --version` (run this session) — environment availability

### Secondary (MEDIUM confidence)
None — no web search was performed or needed for this repo-internal phase.

### Tertiary (LOW confidence)
None.

## Metadata

**Confidence breakdown:**
- Standard stack: N/A (no new tools) — HIGH confidence that no new tool is needed, since all 5 dependencies confirmed present
- Architecture (leaf/apex templates, workflow delta, needle sources): HIGH — every pattern confirmed by direct file read or command output this session
- Pitfalls: HIGH — all four drawn from 138-CONTEXT.md's own adversarial-review-corrected findings, cross-confirmed against the actual template files

**Research date:** 2026-08-04
**Valid until:** Effectively N/A (single-use, phase-scoped research against a static repo state) — if the working tree changes materially before planning begins (e.g., another SHA lands, or check-phase-134.mjs is edited), re-verify the specific claims above rather than the whole document.
