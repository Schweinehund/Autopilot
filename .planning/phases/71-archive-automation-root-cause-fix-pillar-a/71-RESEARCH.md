# Phase 71: Archive-Automation Root-Cause Fix (Pillar A) - Research

**Researched:** 2026-06-03
**Domain:** SDK extractor vendoring + frontmatter pre-write CLI + static MILESTONES.md placeholder-token tripwire + MILESTONE-AUDIT-driven H2 re-authoring (NO new libraries; ESM Node + Edit-tool surgical edits + chain-apex validator pattern)
**Confidence:** HIGH (all execution mechanisms verified against in-repo precedents at HEAD; the only MEDIUM-confidence surface is the exact bullet-count distillation from v1.1/v1.2 audit docs, which is a Plan 71-02 Wave 1 read-and-decide)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 — Fix location & vendoring strategy (score B=10 / A=9-but-blocks / C=12 / D=14):** Vendor a corrected `extractOneLinerFromBody` at NEW `scripts/archive/extract-summary-oneliners.mjs` with regex change `/^#[^\n]*\n+\*\*([^*]+)\*\*/m` -> `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m`. The CLI accepts `--milestone v1.8` and: (a) enumerates SUMMARY.md files in `.planning/phases/`; (b) extracts inline `**One-liner:** value` body content via corrected regex; (c) pre-writes `one-liner:` into each SUMMARY.md frontmatter if absent (idempotent — skips if present); (d) reports zero-edit dry-run when all SUMMARY.md files already have frontmatter `one-liner:`. Phase 74 plan-phase MUST add Wave-1 pre-step `node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter` immediately before `/gsd:complete-milestone v1.8`. Upstream PR tracked as `ARCHIVE-UPSTREAM-01` in `v1.8-DEFERRED-CLEANUP.md`.

**D-02 — Regression-fixture mechanism (score C=9 / B=9-tiebreak-lost / D=13 / A=14):** Fold regression-fixture assertions DIRECTLY into NEW `scripts/validation/check-phase-71.mjs` (validator-as-deliverable; NOT a new `tests/` tree, NOT a separate `check-milestones-extraction.mjs`). Anchored-bullet regex `^- (?:One-liner:|SUBSUMED BY PLAN|Hash:|Pre-edit:|Total file size:|File:|Insertion position:|Single deliverable:|Plan goal:|Found during:|Edit \d+ --)` over `.planning/MILESTONES.md` HEAD. Assertions: V-71-FIX-01, V-71-FIX-02, V-71-MILESTONES-01, V-71-ARCHIVE02-01, V-71-CHAIN-{48..70}, V-71-AUDIT (v1.7-milestone-audit.mjs), V-71-SELF. `Edit N --` token added to PLACEHOLDER_TOKENS list (NEW DISCOVERY from D-03 advisor pre-sweep grep; tracked in `v1.8-DEFERRED-CLEANUP.md` as future-class flag).

**D-03 — ARCHIVE-02 sweep scope (score D=8 / B=12 / C=14 / A=17-fatal-wedge):** Re-author the v1.1 + v1.2 H2 entries in `.planning/MILESTONES.md` from canonical source-of-truth (`v1.1-MILESTONE-AUDIT.md` 165 lines; `v1.2-MILESTONE-AUDIT.md` 345 lines). Empirical residue inventory: v1.2 lines 145-148 (3× `- One-liner:` + 1× `- Commit:`) + v1.1 line 164 (`- Edit 1 -- docs/error-codes/00-index.md:` — NEW DISCOVERY by D-03 advisor; NOT in `v1.7-DEFERRED-CLEANUP.md:38-48` known-sites list). v1.0/v1.3/v1.4/v1.4.1 confirmed CLEAN (zero residue per pre-sweep grep enumeration). Honors "DO NOT mask via deletion" doctrine via REPLACEMENT FROM CANONICAL SOURCE; symmetric with v1.6+v1.7 retroactive-authoring at v1.7 close 2026-05-29.

**D-04 — Atomic-commit composition + plan layout (score B=7 / D=9 / A=14 / C=20):** 3-plan layout. Plan 71-01 lands ATOMIC commit (fix + fixture in single SHA per ROADMAP SC#4 byte-exact). Plan 71-02 lands separate commit (re-authoring; symptom-class per Phase 68 Plan 68-04 precedent). Plan 71-03 close-gate (chain re-run + 71-VERIFICATION.md + traceability flips). Total: 3 plans, 3 commits.

### Claude's Discretion

- Exact regex anchor variants in `extract-summary-oneliners.mjs` if the corrected regex misses edge cases (e.g., SUMMARY.md files with markdown-link in label `**[One-liner:](anchor)**`) — planner verifies with grep-pass across all 97 SUMMARY.md files at Plan 71-01 Wave 1
- Whether Plan 71-01 Wave-3 `check-phase-71.mjs` red-state on V-71-MILESTONES-01 is committed-as-known-FAIL (chicken-and-egg per Phase 70 Plan 70-05 Commit A precedent) OR Plan 71-01 is staged-but-uncommitted until Plan 71-02 is ready (atomicity tradeoff; planner decides at plan-phase). **Research recommendation: known-FAIL-then-PASS per Plan 70-05 Commit A precedent — see §"Chicken-and-Egg Resolution" below.**
- Exact line ranges for v1.1 H2 + v1.2 H2 in the re-authored MILESTONES.md — depends on canonical bullet count from each audit doc; planner reads source-of-truth at Plan 71-02 Wave 1
- Whether `scripts/archive/extract-summary-oneliners.mjs --self-test` is run as a separate pre-commit assertion OR folded into `check-phase-71.mjs` V-71-FIX-02 (low-risk either way; this research recommends SEPARATE for diagnostic clarity)
- Whether `ARCHIVE-UPSTREAM-01` follow-up appears in `v1.8-DEFERRED-CLEANUP.md` (Plan 71-03 author drafts the entry stub; Phase 74 HARNESS-12 finalizes the artifact)
- Whether to also enumerate v1.0/v1.3/v1.4/v1.4.1 H2 ranges in V-71-MILESTONES-01 as defense-in-depth (no current residue, but anchors the contract) — Plan 71-01 Wave 3 decision

### Deferred Ideas (OUT OF SCOPE for Phase 71)

- **CHAIN-WRAPPER-01** (`check-phase-66.mjs:313` stderr-only chain-apex wrapper) — Phase 72 Pillar B (WRAPPER-01)
- **HARNESS-FORWARD-01 + SCOPE-GAP-RETRO-01** (retrospective scan + v1.5/v1.6/v1.7-frozen-aware conversion of check-phase-{48..66}.mjs) — Phase 73 Pillar C (RETRO-01 + RETRO-02)
- **v1.8 audit harness lineage bump** (HARNESS-07/08/09/10/11/12 + VPP-01) — Phase 74 Pillar D
- **`docs/*` corpus edits** — v1.8 is tooling-only milestone
- **Upstream PR to `get-shit-done-cc`** — tracked as `ARCHIVE-UPSTREAM-01` in `v1.8-DEFERRED-CLEANUP.md`
- **Worktree-based execution** (`use_worktrees: false` durable per memory `project_execphase_sequential.md`)
- **Modification to v1.4/v1.5/v1.6/v1.7 workflow YAML files** — predecessor-byte-unchanged invariant
- **Sweep of v1.0/v1.3/v1.4/v1.4.1 MILESTONES.md entries** — empirically clean per D-03 advisor pre-sweep grep enumeration
- **CI workflow `audit-harness-v1.8-integrity.yml`** — Phase 74 HARNESS-10; Phase 71 does NOT modify v1.7 workflow (frozen)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (from REQUIREMENTS.md:15-17) | Research Support |
|----|------------------------------------------|------------------|
| **ARCHIVE-01** | Root-cause fix for `gsd-sdk query milestone.complete` SDK extraction-pattern logic emitting placeholder-label garbage into MILESTONES.md milestone-close entries (10-token list per ROADMAP SC#1). Ship regression-test fixture exiting non-zero on recurrence. RECURRENCE-CONFIRMED at v1.7 close 2026-05-29. DO NOT mask via deletion — investigate the script. | §Standard Stack #1-3 (vendored extractor + corrected regex + frontmatter pre-write CLI surface); §Architecture Patterns Pattern 1-3; §Code Examples #1-5; §Plan 71-01 §"Atomic Commit Composition"; §Plan 71-03 ARCHIVE-UPSTREAM-01 stub. |
| **ARCHIVE-02** | Historical residue sweep across `.planning/MILESTONES.md` v1.0..v1.4.1 entries for scripted-extraction debris (known site: v1.2 lines 145-148 + NEW DISCOVERY v1.1 line 164). Coordinated with ARCHIVE-01 atomic-commit IF committed together — Plan layout D-04 elects SEPARATE plan (per Phase 68 Plan 68-04 precedent). Post-sweep validator/diff confirms zero placeholder tokens remain. | §Standard Stack #4 (Edit-tool surgical edits, NOT Set-Content); §Plan 71-02 §"v1.1 H2 Re-authoring" + §"v1.2 H2 Re-authoring"; §Code Examples #6-9; §V-71-MILESTONES-01 + V-71-ARCHIVE02-01 assertion design. |

</phase_requirements>

## Summary

Phase 71 is a **tooling-debt closure phase** combining (a) localized SDK-defect-vendoring (D-01) with (b) static-regex chain-validator tripwire authoring (D-02) and (c) MILESTONE-AUDIT-driven historical-entry re-authoring (D-03), packaged as a **3-plan / 3-commit / atomic-where-mandated** layout (D-04). All four gray areas are LOCKED via adversarial-review; this research surfaces the exact execution mechanics the planner needs to author atomic plan files.

The phase has **three plans** (per D-04): **71-01** (ATOMIC fix + fixture in ONE SHA per SC#4 byte-exact) -> **71-02** (separate commit; v1.1 + v1.2 H2 re-authoring from canonical audit docs) -> **71-03** (close-gate: full chain re-run + 71-VERIFICATION.md + traceability flips + ARCHIVE-UPSTREAM-01 stub draft). The two requirements are **mechanically coupled** (Plan 71-02 sweep is gated by Plan 71-01 V-71-MILESTONES-01 assertion existing) but **epistemically separable** (root-cause fix vs. symptom-residue sweep), warranting per-plan commit boundary per Phase 68 Plan 68-04 in-repo precedent.

**Primary recommendation:** Treat 71-CONTEXT.md as the script. The single non-deterministic step is Plan 71-02 Wave 1 (bullet-count distillation from `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` Executive-Summary + Tech-Debt sections); everything else is verbatim-from-precedent. For chicken-and-egg V-71-MILESTONES-01 at Plan 71-01 commit time, **commit-with-known-FAIL transient-state per Plan 70-05 Commit A precedent** — see §"Chicken-and-Egg Resolution" for rationale and the existing in-repo pattern that makes this benign.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| SDK extractor vendoring | `scripts/archive/extract-summary-oneliners.mjs` (NEW, ESM Node) | None — vendored copy is self-contained | Localized fix; routes around upstream npm-global cadence. Mirrors `scripts/validation/_lib/archive-path.mjs` ESM precedent (Phase 68 CHAIN-02). |
| Frontmatter pre-write | `scripts/archive/extract-summary-oneliners.mjs --pre-write-frontmatter` (CLI flag) | Phase 74 HARNESS-12 plan-phase Wave-1 invocation | Phase 71 ships the tool; Phase 74 invokes it before `/gsd:complete-milestone v1.8`. Caller `phase-lifecycle.ts:1693` prefers frontmatter -> routes around still-broken upstream fallback. |
| Regression-fixture (chain validator) | `scripts/validation/check-phase-71.mjs` (NEW; validator-as-deliverable) | `check-phase-72/73/74.mjs` (Phase 74 HARNESS-09 chains back through 71) | Chain-apex topology per `check-phase-67.mjs` Path-A template. CHAIN_PHASES = {48..70}. Static MILESTONES.md scan = SC#2 satisfaction surface. |
| Regression-fixture (unit test companion) | `scripts/archive/test-extract-oneliner.mjs` (NEW, co-located) | Optional fold into V-71-FIX-02 via subprocess | 3 fixture cases: label-not-captured / pre-write idempotency / placeholder-allowlist scan. Co-located per Phase 67 Plan 67-02 `67-ANCHOR-INVENTORY.md` co-location precedent. |
| Historical H2 re-authoring | `.planning/MILESTONES.md` (Edit-tool surgical edits — NOT Set-Content) | `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` (canonical source-of-truth) | Symmetric with v1.6+v1.7 retroactive-authoring 2026-05-29. Edit-tool preserves CRLF/LF consistency (Plan 68-04 T-68-04-LE precedent). |
| Chain regression detection | `scripts/validation/check-phase-{48..70}.mjs` subprocess chain | `v1.7-milestone-audit.mjs` (15/15 PASS expected; predecessor-byte-unchanged invariant) | Plan 71-03 Wave 1 — expect ALL 23 phases PASS + 0 SKIPPED + 0 FAIL (full-green inherited from Phase 70 close `4df3a16`). |
| Close-gate verification artifact | `.planning/phases/71-.../71-VERIFICATION.md` | PROJECT.md / ROADMAP.md / STATE.md / REQUIREMENTS.md traceability flips at Plan 71-03 close | Self-contained close-gate report; Plan 71-01 atomic SHA recorded under SC#4. |

## Project Constraints (from CLAUDE.md)

The repo-level `CLAUDE.md` describes a **Windows Autopilot diagnostics suite** (PowerShell + Python + TypeScript) — this is **the wrong subsystem for Phase 71**. Phase 71 operates exclusively on the **archive-automation tooling layer** under `scripts/archive/` (NEW) + `scripts/validation/check-phase-71.mjs` (NEW) + `.planning/MILESTONES.md` (REPLACE not delete). The CLAUDE.md directives most relevant to Phase 71:

| Directive | Phase 71 Application |
|-----------|----------------------|
| "Never commit `.env` file or any credentials" | No credentials touched in Phase 71. |
| "Validate all user inputs in API endpoints" | N/A — Phase 71 ships local CLI + chain validator, not an HTTP endpoint. |
| "Test thoroughly in isolated environment before production use" | Phase 71 executes sequential-on-main-tree per `.planning/config.json:7` `use_worktrees: false` + memory `project_execphase_sequential.md`. No worktree experiments. Pre-commit dry-run sequence (Wave 4) enforces validator green before `git add`. |
| "PowerShell: Use `try-catch` with `-ErrorAction SilentlyContinue` for non-critical operations" | N/A for `scripts/archive/*.mjs` (Node ESM). For PowerShell wrappers in plan tasks: do NOT suppress markdown-link-check / node exit codes — the chain depends on propagated exit codes. |

No CLAUDE.md directive conflicts with any locked decision in 71-CONTEXT.md. [VERIFIED: `D:\claude\Autopilot\CLAUDE.md` read at session start; the file describes an unrelated PowerShell+Python+TypeScript Autopilot subsystem distinct from the `.planning/` + `scripts/validation/` tooling layer where Phase 71 operates.]

## Standard Stack

Phase 71 introduces **NO new external libraries**. All tooling is in-repo or Node stdlib.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js stdlib `node:fs` `node:path` `node:child_process` `node:process` | Built-in (Node 18+; session has v24.15.0) | Vendored extractor + CLI + chain validator | Verbatim pattern from `scripts/validation/check-phase-67.mjs:15-18` ESM imports + `scripts/validation/_lib/archive-path.mjs:16-17` ESM import style. [CITED: in-repo precedents]. |
| Node.js ESM `.mjs` | n/a | File format for new artifacts | Matches `scripts/validation/_lib/archive-path.mjs` (Phase 68 CHAIN-02 precedent — first inhabitant of `_lib/`) and ALL 23 `check-phase-NN.mjs` files. CJS `.js` would be a paradigm break with zero benefit. [VERIFIED: Glob `scripts/**/*.mjs` returns 25+ matches; Glob `scripts/**/*.cjs` returns 0]. |
| PowerShell (session shell) | Default Windows | Outer shell for sequencing validator subprocesses + capturing exit codes | Windows-native; sequential-on-main-tree per `use_worktrees: false`. [VERIFIED: env block declares `Shell: PowerShell`]. |
| Edit tool (Read-then-Edit) | n/a | MILESTONES.md surgical edits (Plan 71-02) | Preserves CRLF/LF per existing line endings; avoids Set-Content full-rewrite drift per Plan 68-04 T-68-04-LE precedent. [CITED: Plan 68-04 SUMMARY "Garbage Debris Elimination Confirmation" — line-ending preservation was a Plan 68-04 lesson]. |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| `git log --format=%H -n 1` | Capture closing SHA per plan (record in 71-VERIFICATION.md SC#4 + traceability flips) | Plan 71-03 Wave 4 — find Plan 71-01 + 71-02 commit SHAs for Active->Validated flip. |
| `git diff <Plan-71-01-SHA> HEAD -- <surface>` | Predecessor-byte-unchanged invariant check (v1.4/v1.5/v1.6/v1.7 workflows + harness MJS + sidecar JSON) | Plan 71-02 Wave 4 + Plan 71-03 Wave 1. |
| `node --version` | Confirm runtime parity (v24.15.0 expected) | Plan 71-01 Wave 4 pre-commit; informational only. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vendored extractor (D-01 Option B WINNER) | Upstream PR + npm pin (D-01 Option A) | A blocks v1.8 close on external maintainer cadence; A=9 raw but Axis 2 fatal. REJECTED per CONTEXT D-01. |
| Static MILESTONES.md chain validator (D-02 Option C WINNER) | SDK integration test (D-02 Option A, score 14) | A re-introduces network-dependent CI surface that Phases 67-70 eliminated (FETCH-DEPTH-01 + CRLF + empty CHAIN_SKIP). REJECTED per CONTEXT D-02. |
| MILESTONE-AUDIT-driven re-authoring (D-03 Option D WINNER) | Surgical-delete-only (D-03 Option A score 17 / Option B score 12) | A misses v1.1 line 164 (new token-class); B treats truncated bullet as delete-not-restore. REJECTED per CONTEXT D-03. |
| 3-plan split (D-04 Option B WINNER, score 7) | Single mega-commit (D-04 Option A score 14) | A bundles distinct epistemic classes; bisect-opaque per Phase 68 Plan 68-04 precedent. REJECTED per CONTEXT D-04. |

**Installation (Plan 71-01 Wave 1):** No `npm install` required. Vendored extractor + CLI + test fixture + validator use Node stdlib only. Self-test invocation:
```powershell
node scripts/archive/extract-summary-oneliners.mjs --self-test  # Expect: exit 0 + "3 fixtures PASS"
node scripts/archive/test-extract-oneliner.mjs                  # Expect: exit 0 + "3 cases PASS"
node scripts/validation/check-phase-71.mjs                      # Expect: see §"Chicken-and-Egg Resolution"
```

**Version verification:** No external package version to verify (no `npm install`). Confirm Node ESM module loads with `node --check scripts/archive/extract-summary-oneliners.mjs` (syntax-only parse; no execution).

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| (none) | n/a | n/a | n/a | n/a | n/a | Phase 71 installs **ZERO new external packages**. All code uses Node stdlib + in-repo precedents. |

**Packages removed due to slopcheck [SLOP] verdict:** none.
**Packages flagged as suspicious [SUS]:** none.

Phase 71 has **no `package.json` modifications** and **no `npm install` / `npm install -g`** invocations. The vendored extractor uses Node stdlib (`fs`, `path`, `process`, `child_process`) exclusively — same as ALL 23 in-repo `check-phase-NN.mjs` files. This is a deliberate scope-discipline call per CONTEXT D-02 Adversary wedge against Option A: "Option A introduces a network-dependent (`npm install -g get-shit-done-cc`) CI job that re-introduces a class of flakiness we just paid heavily to eliminate" (per CONTEXT line 104).

## Architecture Patterns

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Plan 71-01 (ATOMIC commit — root-cause fix + regression fixture)         │
│                                                                          │
│   Wave 1: Author scripts/archive/extract-summary-oneliners.mjs           │
│           - extractOneLinerFromBody(content) — corrected regex           │
│           - CLI args: --milestone <v> / --pre-write-frontmatter /        │
│             --self-test / --dry-run                                      │
│           - ESM (.mjs); Node stdlib only                                 │
│           ↓                                                              │
│   Wave 2: Author scripts/archive/test-extract-oneliner.mjs               │
│           - 3 fixtures: label-not-captured / idempotency / 10-token scan │
│           - Exit non-zero on any case fail                               │
│           ↓                                                              │
│   Wave 3: Author scripts/validation/check-phase-71.mjs                   │
│           - V-71-FIX-01 (vendored extractor file + corrected regex)      │
│           - V-71-FIX-02 (test fixture file + 3 cases discoverable)       │
│           - V-71-MILESTONES-01 (anchored-bullet regex scan)              │
│           - V-71-ARCHIVE02-01 (v1.1:164 + v1.2:145-148 specific sites)   │
│           - V-71-CHAIN-{48..70} (subprocess chain)                       │
│           - V-71-AUDIT (v1.7-milestone-audit.mjs exits 0)                │
│           - V-71-SELF (CHAIN_PHASES does not include 71)                 │
│           ↓                                                              │
│   Wave 4: Pre-commit dry-run (MANDATORY before git add):                 │
│     a. node scripts/archive/extract-summary-oneliners.mjs --self-test    │
│     b. node scripts/archive/test-extract-oneliner.mjs                    │
│     c. node scripts/validation/check-phase-71.mjs                        │
│        - EXPECT V-71-MILESTONES-01 FAIL (chicken-and-egg; see §below)    │
│        - EXPECT V-71-ARCHIVE02-01 FAIL (same chicken-and-egg)            │
│        - ALL OTHER assertions PASS (V-71-FIX-01/02, V-71-CHAIN, etc.)    │
│           ↓                                                              │
│   ATOMIC commit — 3 files in ONE SHA per Phase 67 Plan 67-02 55260b3:    │
│     - scripts/archive/extract-summary-oneliners.mjs (NEW)                │
│     - scripts/archive/test-extract-oneliner.mjs (NEW)                    │
│     - scripts/validation/check-phase-71.mjs (NEW)                        │
│   Commit msg: fix(archive): ARCHIVE-01 root-cause fix +                  │
│               regression fixture (atomic SC#4)                           │
│   COMMIT SHA = SC#4 byte-exact witness                                   │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼─────────────────────────────────────┐
│ Plan 71-02 (separate commit — ARCHIVE-02 v1.1 + v1.2 re-authoring)       │
│                                                                          │
│   Wave 1: Read source-of-truth + distill bullet count                    │
│     - v1.1-MILESTONE-AUDIT.md (165 lines) — frontmatter score +          │
│       Tech Debt sections + Working Flows                                 │
│     - v1.2-MILESTONE-AUDIT.md (345 lines) — Executive Summary +          │
│       Verification table + Tech Debt sections                            │
│     - Target: 4-5 bullets per H2 (v1.6+v1.7 manually-authored scale)     │
│           ↓                                                              │
│   Wave 2: Author replacement bullets for v1.1 H2 (Edit tool)             │
│     - Pre-edit state: MILESTONES.md:155-166 (12 lines)                   │
│     - Replace lines 155-166 verbatim with new H2 block                   │
│     - Drop line 164 (- Edit 1 -- docs/error-codes/00-index.md:)          │
│     - Restore semantically: bullet 4 was truncated — author it from      │
│       v1.1-MILESTONE-AUDIT.md Tech Debt + Conclusion sections            │
│           ↓                                                              │
│   Wave 3: Author replacement bullets for v1.2 H2 (Edit tool)             │
│     - Pre-edit state: MILESTONES.md:138-153 (16 lines)                   │
│     - Drop lines 145-148 (3× One-liner: + 1× Commit:)                    │
│     - Replace with 4-5 canonical bullets from                            │
│       v1.2-MILESTONE-AUDIT.md Executive Summary + Phase Verification     │
│     - Add Audit-status row + retroactive-authoring Note row              │
│           ↓                                                              │
│   Wave 4: Pre-commit dry-run + boundary verification                     │
│     a. node scripts/validation/check-phase-71.mjs                        │
│        - EXPECT V-71-MILESTONES-01 PASS (post-sweep)                     │
│        - EXPECT V-71-ARCHIVE02-01 PASS (specific sites cleared)          │
│     b. git diff <Plan-71-01-SHA> HEAD -- <predecessor surfaces>          │
│        - EXPECT EMPTY: v1.4/v1.5/v1.6/v1.7 YAMLs + MJS + sidecar JSONs   │
│     c. git diff HEAD -- .planning/MILESTONES.md                          │
│        - EXPECT changes ONLY in v1.2 H2 + v1.1 H2 ranges                 │
│           ↓                                                              │
│   Commit msg: docs(archive): ARCHIVE-02 re-author v1.1+v1.2              │
│               MILESTONES.md entries from MILESTONE-AUDIT source          │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼─────────────────────────────────────┐
│ Plan 71-03 (close-gate — VERIFICATION.md + traceability flips)           │
│                                                                          │
│   Wave 1: Full chain re-run                                              │
│     for p in 48..71: node scripts/validation/check-phase-${p}.mjs        │
│     EXPECT: 23 phases × ALL PASS + 0 SKIPPED + 0 FAIL                    │
│     EXPECT: v1.7-milestone-audit.mjs 15/15 PASS unchanged                │
│           ↓                                                              │
│   Wave 2: Predecessor-byte-unchanged invariant verified                  │
│     git diff <Plan-71-01-SHA>~1 HEAD -- <predecessor surfaces>           │
│     EXPECT EMPTY                                                         │
│           ↓                                                              │
│   Wave 3: Author 71-VERIFICATION.md                                      │
│     - SC#1 satisfaction (corrected regex in vendored extractor)          │
│     - SC#2 satisfaction (V-71-MILESTONES-01 + V-71-FIX-02 + test file)   │
│     - SC#3 satisfaction (v1.0..v1.4.1 entries clean post-sweep)          │
│     - SC#4 atomic commit SHA recorded (Plan 71-01 SHA byte-exact)        │
│     - Discoveries (v1.1 line 164 token-class; ARCHIVE-UPSTREAM-01 stub)  │
│     - Phase 72 entry-state readiness signal                              │
│           ↓                                                              │
│   Wave 4: Draft ARCHIVE-UPSTREAM-01 stub in v1.8-DEFERRED-CLEANUP.md     │
│     (Phase 74 HARNESS-12 finalizes the artifact; Plan 71-03 drafts stub) │
│           ↓                                                              │
│   Wave 5: Traceability flips                                             │
│     - PROJECT.md ARCHIVE-01+02 Active->Validated + closing SHAs          │
│     - REQUIREMENTS.md Traceability rows Pending->Complete                │
│     - STATE.md progress + Performance Metrics + Pending Todos            │
│     - ROADMAP.md Phase 71 row Complete with closing SHAs                 │
│           ↓                                                              │
│   Commit msg: docs(71-03): Phase 71 close-gate — chain green +           │
│               71-VERIFICATION.md + traceability flips                    │
└──────────────────────────────────────────────────────────────────────────┘
```

### Recommended Plan-File Structure
```
.planning/phases/71-archive-automation-root-cause-fix-pillar-a/
├── 71-CONTEXT.md                     # (exists)
├── 71-DISCUSSION-LOG.md              # (exists)
├── 71-RESEARCH.md                    # this artifact
├── 71-01-PLAN.md                     # ATOMIC commit (fix + fixture)
├── 71-02-PLAN.md                     # MILESTONES.md re-authoring (separate)
├── 71-03-PLAN.md                     # close-gate
├── 71-01-SUMMARY.md                  # Plan 71-01 SUMMARY (post-execution)
├── 71-02-SUMMARY.md                  # Plan 71-02 SUMMARY
├── 71-03-SUMMARY.md                  # Plan 71-03 SUMMARY
└── 71-VERIFICATION.md                # Plan 71-03 Wave 3 close-gate artifact
```

### Pattern 1: Vendored SDK Function with CLI Surface (Plan 71-01 Wave 1)

**What:** Reproduce a buggy SDK function from `get-shit-done-cc/sdk/src/query/phase-lifecycle-policy.ts:54-58` in this repo with the regex corrected, AND wrap it in a CLI that (a) walks SUMMARY.md files for a given milestone, (b) extracts the inline `**One-liner:** value` content, (c) optionally pre-writes `one-liner:` into each SUMMARY.md's YAML frontmatter.

**When to use:** When upstream tooling has a defect that blocks a milestone close, the upstream PR cadence is uncontrollable, and the buggy code path can be routed around by the existing caller's frontmatter-first preference (`phase-lifecycle.ts:1693`).

**Example (verified-against-precedent skeleton):**

```javascript
#!/usr/bin/env node
// scripts/archive/extract-summary-oneliners.mjs
// Vendored extractOneLinerFromBody — fixes upstream regex defect at
//   C:\Users\<user>\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle-policy.ts:54-58
// Upstream defect: /^#[^\n]*\n+\*\*([^*]+)\*\*/m captures the bolded LABEL (e.g., "One-liner:")
// Vendored fix:   /^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m captures the VALUE after the label
//
// CLI:
//   --milestone <v>            Walk .planning/phases/* SUMMARY.md files for milestone v
//   --pre-write-frontmatter    Inject one-liner: into each SUMMARY.md frontmatter (idempotent)
//   --dry-run                  Report planned edits without writing
//   --self-test                Run 3 internal fixtures; exit 0 if all pass
//
// Upstream PR tracked as ARCHIVE-UPSTREAM-01 in v1.8-DEFERRED-CLEANUP.md.

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);

// === Vendored extractor (the actual fix) ===
export function extractOneLinerFromBody(content) {
  if (!content) return null;
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
  // CORRECTED REGEX: anchor on literal "**One-liner:**" label, capture text up to end of line.
  // Original buggy version captured the LABEL itself via /^#[^\n]*\n+\*\*([^*]+)\*\*/m.
  const match = body.match(/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m);
  return match ? match[1].trim() : null;
}

// === Frontmatter helpers ===
export function extractFrontmatter(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return { hasFrontmatter: false, fm: {}, raw: '' };
  const raw = fmMatch[1];
  const fm = {};
  // Lightweight YAML scalar parse — same shape as gsd-sdk extractFrontmatter
  for (const line of raw.split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return { hasFrontmatter: true, fm, raw };
}

export function hasFrontmatterOneLiner(content) {
  const { hasFrontmatter, fm } = extractFrontmatter(content);
  return hasFrontmatter && typeof fm['one-liner'] === 'string' && fm['one-liner'].length > 0;
}

export function preWriteFrontmatterOneLiner(content, oneLiner) {
  // Idempotency contract: if one-liner: already present, return content UNCHANGED.
  if (hasFrontmatterOneLiner(content)) return content;
  const escaped = oneLiner.replace(/"/g, '\\"');
  const fmMatch = content.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
  if (!fmMatch) {
    // No frontmatter — prepend one. EOL convention: detect from existing content.
    const eol = content.includes('\r\n') ? '\r\n' : '\n';
    return `---${eol}one-liner: "${escaped}"${eol}---${eol}${eol}${content}`;
  }
  // Frontmatter exists but no one-liner key — inject as LAST field.
  const fmHead = fmMatch[1]; const fmBody = fmMatch[2]; const fmTail = fmMatch[3];
  const eol = fmHead.includes('\r\n') ? '\r\n' : '\n';
  // Trim trailing newlines from fmBody to avoid blank lines between last existing field and the new one.
  const trimmed = fmBody.replace(/[\r\n]+$/, '');
  const newFm = `${fmHead}${trimmed}${eol}one-liner: "${escaped}"${fmTail}`;
  return content.slice(0, fmMatch.index) + newFm + content.slice(fmMatch.index + fmMatch[0].length);
}

// === SUMMARY enumeration ===
function listSummaryFilesForMilestone(milestone) {
  // Mirror gsd-sdk phase-lifecycle.ts:1677-1685 walk:
  // .planning/phases/<phase-dir>/<NN>-SUMMARY.md  AND  <phase-dir>/SUMMARY.md
  // For v1.8 (active milestone): .planning/phases/  (NOT yet archived to v1.8-phases/)
  // For archived milestones: .planning/milestones/<milestone>-phases/<phase-dir>/...
  const cwd = process.cwd();
  const liveRoot = join(cwd, '.planning', 'phases');
  const archivedRoot = join(cwd, '.planning', 'milestones', `${milestone}-phases`);
  const roots = [liveRoot, archivedRoot].filter(r => existsSync(r));
  const out = [];
  for (const root of roots) {
    for (const dir of readdirSync(root)) {
      const phaseDir = join(root, dir);
      if (!statSync(phaseDir).isDirectory()) continue;
      for (const f of readdirSync(phaseDir)) {
        if (f.endsWith('-SUMMARY.md') || f === 'SUMMARY.md') out.push(join(phaseDir, f));
      }
    }
  }
  return out;
}

// === --self-test mode (3 fixtures) ===
function selfTest() {
  let failed = 0;
  // Fixture 1: label-not-captured (the actual bug)
  const f1 = `---\nphase: 67-x\n---\n\n# Plan 67-01 Summary\n\n**One-liner:** Verified 4 ABM URLs alive via cron-pinned markdown-link-check\n\n## What Was Built\n`;
  const r1 = extractOneLinerFromBody(f1);
  if (r1 !== 'Verified 4 ABM URLs alive via cron-pinned markdown-link-check') {
    console.error(`FIXTURE 1 FAIL: extractor returned "${r1}" expected "Verified 4 ABM URLs..."`);
    failed++;
  }
  // Fixture 2: pre-write idempotency
  const before = `---\nphase: x\none-liner: "Already set"\n---\n\n# Title\n\n**One-liner:** ignored body value\n`;
  const after = preWriteFrontmatterOneLiner(before, 'should not appear');
  if (after !== before) {
    console.error(`FIXTURE 2 FAIL: pre-write was NOT idempotent (frontmatter already present)`);
    failed++;
  }
  // Fixture 3: placeholder-allowlist scan against synthetic SDK output
  const PLACEHOLDER_TOKENS = ['One-liner:','SUBSUMED BY PLAN','Hash:','Pre-edit:','Total file size:','File:','Insertion position:','Single deliverable:','Plan goal:','Found during:','Edit \\d+ --'];
  const synthetic = `## v1.8 (Shipped)\n\n**Key accomplishments:**\n- Verified ABM URLs alive\n- Cross-platform navigation\n`;
  const re = new RegExp(`^- (?:${PLACEHOLDER_TOKENS.join('|')})`, 'gm');
  const hits = (synthetic.match(re) || []).length;
  if (hits !== 0) { console.error(`FIXTURE 3 FAIL: ${hits} placeholder bullets in clean synthetic`); failed++; }

  console.log(failed === 0 ? '3 fixtures PASS' : `${failed} fixture(s) FAILED`);
  process.exit(failed === 0 ? 0 : 1);
}

// === Main CLI ===
function main() {
  if (argv.includes('--self-test')) return selfTest();
  const mIdx = argv.indexOf('--milestone');
  if (mIdx === -1 || mIdx === argv.length - 1) {
    console.error('Usage: extract-summary-oneliners.mjs --milestone <v> [--pre-write-frontmatter] [--dry-run] | --self-test');
    process.exit(2);
  }
  const milestone = argv[mIdx + 1];
  const preWrite = argv.includes('--pre-write-frontmatter');
  const dryRun = argv.includes('--dry-run');

  const files = listSummaryFilesForMilestone(milestone);
  let scanned = 0, alreadyOK = 0, updated = 0, skipped = 0, errors = 0;
  for (const f of files) {
    scanned++;
    try {
      const content = readFileSync(f, 'utf8');
      if (hasFrontmatterOneLiner(content)) { alreadyOK++; continue; }
      const value = extractOneLinerFromBody(content);
      if (!value) { skipped++; continue; }
      if (!preWrite) { continue; }
      const newContent = preWriteFrontmatterOneLiner(content, value);
      if (newContent === content) { alreadyOK++; continue; }
      if (!dryRun) writeFileSync(f, newContent, 'utf8');
      updated++;
    } catch (err) {
      errors++;
      console.error(`ERROR ${f}: ${err.message}`);
    }
  }
  console.log(`milestone=${milestone} scanned=${scanned} alreadyOK=${alreadyOK} updated=${updated} skipped-no-value=${skipped} errors=${errors}${dryRun ? ' [DRY-RUN]' : ''}`);
  process.exit(errors > 0 ? 1 : 0);
}

main();
```

[VERIFIED: corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` tested against the verbatim `67-01-SUMMARY.md:48` body shape: `**One-liner:** Verified 4 ABM URLs alive via cron-pinned markdown-link-check@3.14.2 + corroborating curl HEAD; annotated sidecar with per-entry \`last_revalidated:2026-05-26\`...`. Capture group 1 returns the VALUE. The original buggy regex `/^#[^\n]*\n+\*\*([^*]+)\*\*/m` returns `"One-liner:"` (the LABEL).]

### Pattern 2: Static MILESTONES.md Tripwire Validator (Plan 71-01 Wave 3)

**What:** A chain-apex validator that scans `.planning/MILESTONES.md` HEAD for anchored-bullet placeholder-label tokens. Bullet-anchored (NOT raw substring) to avoid false-positives on legitimate prose ("the one-liner field in frontmatter" would NOT match `^- One-liner:`).

**When to use:** Tripwire-on-HEAD-state per Phase 67/68/69/70 validator-as-deliverable precedent. Catches future regressions on EVERY PR run, not just at milestone-close invocation.

**Token list (per CONTEXT D-02 + D-03 NEW DISCOVERY `Edit N --`):**

```javascript
const PLACEHOLDER_TOKENS = [
  'One-liner:',
  'SUBSUMED BY PLAN',
  'Hash:',
  'Pre-edit:',
  'Total file size:',
  'File:',
  'Insertion position:',
  'Single deliverable:',
  'Plan goal:',
  'Found during:',
  'Edit \\d+ --',          // NEW class discovered by D-03 advisor at v1.1 line 164
];

// Anchor: bullet-line-start (NOT raw substring). Per CONTEXT D-02 false-positive guard.
const escaped = PLACEHOLDER_TOKENS.map(t => {
  // 'Edit \\d+ --' is intentionally a regex fragment; pass through. Others are literals.
  return t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}).join('|');
const GARBAGE_LINE_RE = new RegExp('^- (?:' + escaped + ')', 'gm');
```

[CITED: CONTEXT.md `71-CONTEXT.md` D-02 lines 81-97 + D-03 line 27 (`Edit N --` NEW DISCOVERY); CONTEXT line 305 deferred-ideas explicitly says "Plan 71-01 author should add `Edit N --` to PLACEHOLDER_TOKENS list."]

### Pattern 3: Edit-Tool Surgical Edit for MILESTONES.md (Plan 71-02 Waves 2-3)

**What:** Use the `Edit` tool with verbatim `old_string` / `new_string` blocks to surgically REPLACE the v1.1 H2 (lines 155-166) and v1.2 H2 (lines 138-153) entries. Preserves CRLF/LF per existing line endings; avoids Set-Content full-rewrite drift.

**When to use:** Any in-repo planning-doc REPLACEMENT FROM CANONICAL SOURCE — Plan 68-04 T-68-04-LE precedent established that Set-Content with PowerShell `Out-File` can produce CRLF/LF drift that inflates git diffs and breaks chain validators.

**Mechanism (per Plan 68-04 T-68-04-LE):**
1. Read MILESTONES.md first (Read tool returns content with line numbers; confirms existing line-ending convention).
2. Use Edit tool with `old_string = <verbatim multi-line block including trailing newline char>` -> `new_string = <verbatim replacement>`.
3. Post-edit: `git diff HEAD -- .planning/MILESTONES.md` shows ONLY the intended hunks (no full-file rewrite).

[CITED: Plan 68-04 SUMMARY "Garbage Debris Elimination Confirmation" — line-ending preservation was the load-bearing constraint that made Plan 68-04 `d142c7a` a clean 70-line deletion vs. a noisy whole-file diff.]

### Pattern 4: 3-File Atomic Commit Per Phase 67 Plan 67-02 Precedent

**What:** Three NEW files (`scripts/archive/extract-summary-oneliners.mjs` + `scripts/archive/test-extract-oneliner.mjs` + `scripts/validation/check-phase-71.mjs`) staged in ONE `git add` + ONE `git commit`. The 3 files are mutually validating: the extractor implements the fix; the test fixture proves the extractor; the validator asserts both exist with the corrected regex.

**When to use:** SC#4 byte-exact atomicity contracts. The 3 files MUST land in one SHA so a `git revert` returns the repo to a coherent pre-fix state (extractor + fixture + validator co-revert by design).

**Precedent:** Phase 67 Plan 67-02 commit `55260b3` (5-file atomic — 2 corpus + 1 glossary + 1 sidecar + 1 NEW anchor inventory). Phase 71 Plan 71-01 inherits scope-down to 3 files.

### Anti-Patterns to Avoid

- **Promoting `extract-summary-oneliners.mjs` to `.cjs` or `.js`** — paradigm break with zero benefit. ALL in-repo Node tooling is `.mjs` ESM. [VERIFIED: 25+ `.mjs` files in `scripts/`; 0 `.cjs` files.]
- **Using PowerShell `Set-Content` / `Out-File` on MILESTONES.md** — Plan 68-04 T-68-04-LE established that this introduces CRLF/LF drift. Use `Edit` tool only.
- **Bundling Plan 71-01 + Plan 71-02 into one SHA** — D-04 Option A score 14 REJECTED. Bisect cannot distinguish root-cause-fix failure from sweep failure if bundled.
- **Skipping the chicken-and-egg V-71-MILESTONES-01 acknowledgment** — Plan 71-01 commit lands with V-71-MILESTONES-01 + V-71-ARCHIVE02-01 transient FAIL. The Wave 4 pre-commit dry-run output MUST be captured verbatim in Plan 71-01 SUMMARY so Plan 71-03 close-gate can verify chain green WAS expected post-Plan-71-02.
- **Modifying v1.4/v1.5/v1.6/v1.7 workflow YAMLs / harness MJS / sidecar JSONs** — predecessor-byte-unchanged invariant (CONTEXT line 42).
- **Modifying `audit-harness-v1.7-integrity.yml`** — frozen post-Phase-70-close. CI job for `check-phase-71` lives in Phase 74 HARNESS-10's NEW `audit-harness-v1.8-integrity.yml`.
- **Forgetting `Edit N --` token in PLACEHOLDER_TOKENS** — NEW DISCOVERY by D-03 advisor; without it, V-71-MILESTONES-01 misses v1.1 line 164.
- **Using `npx --yes` or `npm install -g`** — Phase 71 has ZERO external package dependencies; introducing them re-introduces the network-flake class that Phases 67-70 eliminated (CONTEXT D-02 Adversary wedge line 104).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YAML frontmatter parsing | Custom YAML library (e.g., `js-yaml` install) | Lightweight scalar-only `extractFrontmatter()` (Pattern 1 above) | The frontmatter in SUMMARY.md files uses only scalar `key: value` pairs (plus simple lists). gsd-sdk's own `extractFrontmatter()` is similarly lightweight. Bringing in `js-yaml` adds 200KB + a Package Legitimacy Audit row for no benefit. |
| SUMMARY.md enumeration | Custom recursive directory walker | Mirror gsd-sdk `phase-lifecycle.ts:1677-1685` walk (one-level deep under `.planning/phases/<dir>/`) | The SDK's walk is the authoritative shape; reproducing it ensures the vendored extractor's pre-write covers EXACTLY the files the SDK would extract from. |
| MILESTONES.md scan regex | Substring `str.includes('One-liner:')` | Anchored bullet regex `^- (?:tok1|tok2|...)` (Pattern 2 above) | Per CONTEXT D-02 Adversary line 93: bare substring on `"File:"` or `"Hash:"` matches legitimate prose ("File path:", "Hash mismatch"). Anchor on `^- ` to require bullet-line-start. |
| Subprocess chain orchestration | Custom shell wrapper | Use `check-phase-71.mjs` internal `V-71-CHAIN-NN` block (subprocesses `check-phase-{48..70}.mjs` per phase) | Mirror `check-phase-67.mjs:253-281` chain loop verbatim. `check-phase-71.mjs` IS the chain re-run trigger. |
| Frontmatter quote-escape edge cases | Custom YAML quoter | Always emit `"value"` double-quoted (escape internal `"` to `\"`) | Safe for colons, special chars; matches gsd-sdk frontmatter parser tolerance. Plan 71-01 Wave 2 test fixture covers this. |
| Predecessor-byte-unchanged check | Custom file-hash comparator | `git diff <Plan-71-01-SHA>~1 HEAD -- <surfaces>` returning EMPTY | Git is the source of truth for byte-identicality. Phase 70 Plan 70-04 HARNESS-05 used this exact mechanism. |

**Key insight:** Phase 71 has TWO new-tooling surfaces (vendored extractor + chain validator) but BOTH inherit from in-repo precedents (gsd-sdk function + `check-phase-67.mjs`). The planner's job is to **mechanically translate the precedents** with the corrected regex injected at exactly one site, NOT to invent new tooling paradigms.

## Runtime State Inventory

Phase 71 touches `.planning/MILESTONES.md` (planning-doc REPLACEMENT) and authors NEW `scripts/archive/*.mjs` + `scripts/validation/check-phase-71.mjs`. Runtime state inventory per /gsd:research-phase Step 2.5:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| **Stored data** | None — Phase 71 does not interact with any database, vector store, or persistent runtime data layer. The repo has no datastore for v1.8 surfaces; Autopilot Python backend at `src/backend/` is a separate subsystem, not touched. [VERIFIED: no `ChromaDB`/`Mem0`/`Redis`/SQLite references in `.planning/phases/71-*/` or in `scripts/archive/` or in `scripts/validation/`] | None. |
| **Live service config** | None — no n8n / Datadog / Cloudflare integrations in scope. The only "live service" surface that consumes MILESTONES.md is the human reader at GitHub web UI render; no API/service caches the H2 entry content. | None. |
| **OS-registered state** | None — no Windows Task Scheduler / launchd / systemd unit references the strings `One-liner:` / `Edit 1 --` / `Commit:` / etc. The placeholder-label tokens are pure planning-doc surface artifacts. [VERIFIED: no `schtasks` / `pm2` / `launchctl` references in `.planning/phases/71-*/`] | None. |
| **Secrets/env vars** | None — no `.env` or SOPS keys reference the renamed surface. `extract-summary-oneliners.mjs` reads `process.cwd()` only; no env-var dependencies. | None. |
| **Build artifacts / installed packages** | None — Phase 71 installs ZERO external packages. The vendored extractor uses Node stdlib only; no `package.json` mutation; no `node_modules/` writes. The `get-shit-done-cc` npm-global package at `C:\Users\<user>\AppData\Roaming\npm\node_modules\get-shit-done-cc\` is the upstream defect site — Phase 71 does NOT modify it (per D-01 Option B locked decision; ARCHIVE-UPSTREAM-01 follow-up tracks upstream PR). | None — the upstream global stays as-is; vendored fix is invoked by Phase 74 plan-phase as a Wave-1 pre-step before `/gsd:complete-milestone v1.8`. |

**The canonical question:** *After every file in the repo is updated, what runtime systems still have the old placeholder-label tokens cached, stored, or registered?*

**Answer:** None. The 5 debris lines in MILESTONES.md are pure on-disk markdown surface — there is no cache, no database, no registry, no external service holding a copy. The only "runtime" the renamed entries affect is `git log -- .planning/MILESTONES.md` (which permanently records the old debris in history, by design of git itself — `git revert` is the recovery mechanism if needed). Post-edit "runtime" verification is **harness re-run** (Plan 71-03 Wave 1), which is already in scope.

## Common Pitfalls

### Pitfall 1: Chicken-and-Egg V-71-MILESTONES-01 at Plan 71-01 Commit Time

**What goes wrong:** Plan 71-01 atomically commits `check-phase-71.mjs` (which asserts V-71-MILESTONES-01 — zero placeholder bullets in MILESTONES.md HEAD). At Plan 71-01 commit time, MILESTONES.md STILL HAS the 5 debris lines (Plan 71-02 has not landed yet). V-71-MILESTONES-01 FAILS. V-71-ARCHIVE02-01 also FAILS.

**Why it happens:** Plan 71-01 ships the validator that detects the debris; Plan 71-02 ships the debris removal. The validator detects the debris in the gap between them. SC#4 demands fix + fixture atomicity (which Plan 71-01 satisfies); but the fixture's assertion target (MILESTONES.md cleanliness) is satisfied only by Plan 71-02.

**Resolution (research recommendation):** **Commit-with-known-FAIL transient-state per Plan 70-05 Commit A precedent.** Plan 70-05 Commit A `14683de` deliberately committed validators with `{phase_70_close_SHA}` literal placeholders — knowing that `check-phase-67/68/70.mjs` would EXIT NON-ZERO until Atom 2 SHA `aa6de68` was substituted by Plan 70-05 Commit A itself in a later step. The chain was deliberately RED in the gap. Plan 70-05 Commit B `4df3a16` then verified chain green post-substitution. The transient RED-state was acceptable because:
1. The state was DOCUMENTED in plan SUMMARY and VERIFICATION.md.
2. The next plan committed strictly within the same phase landed before any user-facing PR could see the RED state.
3. Bisect on the intervening commits would correctly identify Plan 70-05 Commit B as the green-baseline.

**Apply to Phase 71:**
- Plan 71-01 Wave 4 pre-commit dry-run output is CAPTURED in `71-01-SUMMARY.md` showing V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL with the diagnostic detail naming Plan 71-02 as the resolver.
- The Plan 71-01 commit message body includes a line: `Transient: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL until Plan 71-02 lands (per Plan 70-05 Commit A precedent).`
- Plan 71-02 Wave 4 pre-commit dry-run shows V-71-MILESTONES-01 + V-71-ARCHIVE02-01 PASS — captured in `71-02-SUMMARY.md` as the green-baseline witness.
- Plan 71-03 Wave 1 full chain re-run shows ALL PASS — that is the canonical green-baseline for 71-VERIFICATION.md SC#3.

**Alternative considered (REJECTED):** Stage Plan 71-01 files locally without committing; commit Plan 71-02 first to make the assertions PASS; THEN commit Plan 71-01 as 1 SHA. This INVERTS D-04 Option B's plan ordering. Reject because (a) it changes plan-numbering semantics, (b) the V-71-FIX-01/02 assertions in `check-phase-71.mjs` reference files (`scripts/archive/*.mjs`) that don't yet exist at Plan 71-02 land time -> Plan 71-02 commit would FAIL the validator that doesn't yet exist, (c) the Plan 70-05 Commit A precedent is the established in-repo pattern for transient-RED chain state.

**Warning signs:** Plan 71-01 commit message does NOT mention the transient FAIL state; Plan 71-01 SUMMARY does not capture the V-71-MILESTONES-01 FAIL output; future bisect at Plan 71-01 SHA misidentifies V-71-MILESTONES-01 FAIL as a regression rather than the documented transient.

### Pitfall 2: Frontmatter Parser Tolerance Mismatch Between Vendored and SDK

**What goes wrong:** The vendored `extractFrontmatter()` is lightweight (scalar key:value only). If a v1.8 SUMMARY.md has a list or nested-mapping frontmatter field that contains a colon (e.g., `tags:\n  - "key: value"`), the lightweight parser may misread the structure and conclude `one-liner:` is absent when it's actually present in a sibling field.

**Why it happens:** `js-yaml` would handle this; the lightweight regex would not.

**How to avoid:**
1. Check ONLY for top-level `one-liner:` key (not nested). The SDK does the same at `phase-lifecycle.ts:1693` — `fm['one-liner'] as string | undefined`.
2. The `--pre-write-frontmatter` flag is IDEMPOTENT — if it injects a duplicate `one-liner:` field, the SDK's frontmatter parser uses the FIRST occurrence (YAML 1.1 convention). Worst-case: extra field; not a correctness break.
3. Plan 71-01 Wave 2 test fixture covers: SUMMARY with nested frontmatter -> extractor must NOT inject a duplicate `one-liner:` if a top-level `one-liner:` is already present.

**Warning signs:** `extract-summary-oneliners.mjs --milestone v1.8 --dry-run` reports `updated > 0` on a milestone where all SUMMARY.md files already have frontmatter `one-liner:`.

### Pitfall 3: Edit-Tool old_string Trailing-Whitespace Drift on MILESTONES.md

**What goes wrong:** Plan 71-02 Wave 2/3 uses Edit tool with a multi-line `old_string` that includes the surrounding context. If the source file has trailing whitespace on any line that the planner copies into `old_string` without noticing, the Edit tool may fail to match (Edit requires EXACT match including whitespace).

**Why it happens:** Markdown editors / Git diff tools often hide trailing whitespace. The Read tool returns lines as-is.

**How to avoid:**
1. Plan 71-02 Wave 1 explicitly reads MILESTONES.md lines 138-153 (v1.2 H2) and 155-166 (v1.1 H2) via the Read tool. Confirm line counts match expectations.
2. Use small `old_string` ranges (e.g., only the placeholder-bullet lines + 2 surrounding lines for uniqueness) rather than the whole H2 block.
3. If Edit fails, capture the error verbatim and re-Read the target lines to see exact whitespace.

**Warning signs:** Edit tool reports "old_string not found" but the planner can see the text in the file via Read.

### Pitfall 4: v1.0/v1.3/v1.4/v1.4.1 H2 Byte-Drift from Concurrent Edit

**What goes wrong:** Plan 71-02 Waves 2-3 are intended to touch ONLY v1.1 H2 + v1.2 H2. If the planner accidentally edits lines inside v1.0/v1.3/v1.4/v1.4.1/v1.5/v1.6/v1.7 H2 ranges, the predecessor-byte-unchanged invariant is violated.

**Why it happens:** Markdown editor accidentally inserts a stray character; line-ending conversion; copy-paste boundary drift.

**How to avoid:**
1. Plan 71-02 Wave 4 verification step (b) runs `git diff HEAD -- .planning/MILESTONES.md` and visually confirms changes are ONLY in v1.1 H2 + v1.2 H2 ranges.
2. The diff header line ranges should show ONLY `@@ -138,16 +138,N @@` (v1.2) and `@@ -155,12 +155,M @@` (v1.1) — no other hunks.
3. If any other H2 is touched, REVERT the file and re-do Plan 71-02 surgically.

**Warning signs:** `git diff HEAD -- .planning/MILESTONES.md` shows 3+ hunks instead of 2; v1.7 H2 entry has spurious whitespace changes.

### Pitfall 5: `Edit N --` Token Regex Escape Mismatch

**What goes wrong:** The `Edit \\d+ --` token is the ONLY entry in PLACEHOLDER_TOKENS that is a regex fragment (not a literal). If the planner runs all tokens through `t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')` uniformly, the `\d+` gets over-escaped to `\\d\\+` and the regex no longer matches `Edit 1 --`.

**Why it happens:** Uniform escape is the safer default for literal tokens; the `Edit N --` exception breaks the pattern.

**How to avoid:** Per Pattern 2 code block above, the map function has an explicit branch:
```javascript
return t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
```

OR (alternative — cleaner): keep `PLACEHOLDER_TOKENS` purely literal and add `Edit \\d+ --` as a separate regex alternation in the final RegExp construction. Either works; the test fixture (Fixture 3 of Pattern 1) covers both.

**Warning signs:** V-71-MILESTONES-01 PASSES against the v1.1 line 164 debris (it should FAIL pre-sweep); v1.1 line 164 visibly contains `- Edit 1 --` but the regex doesn't match.

### Pitfall 6: Anchor Drift in MILESTONES.md from H2 Re-Authoring

**What goes wrong:** v1.1 H2 + v1.2 H2 re-authoring changes line counts. If Plan 71-02 adds more bullets than removed, all H2 entries below (v1.1, v1.0) shift down. The shift is FINE for human reading but breaks any external link that references `.planning/MILESTONES.md#L138` or similar.

**Why it happens:** Re-authoring expanding bullet count.

**How to avoid:**
1. Plan 71-02 Wave 1 pre-edit grep `.planning/` + `docs/` for line-number references to MILESTONES.md (`MILESTONES.md:138` / `MILESTONES.md#L138` etc.). [VERIFIED via Grep at research time: zero hits across `.planning/**/*.md` for `MILESTONES.md:.*\d+`; zero hits for `MILESTONES.md#L\d+`. Pitfall 6 is theoretical for this corpus; documented for future-author awareness.]
2. Post-edit, repeat the grep — confirm zero hits or migrate any that surfaced.

**Warning signs:** A doc references `MILESTONES.md:145` expecting the old `- One-liner:` line but post-sweep that line is now a real bullet about macOS lifecycle.

### Pitfall 7: Misreading V-71-MILESTONES-01 FAIL at Plan 71-01 as a Regression

**What goes wrong:** A reviewer of Plan 71-01 PR (or a future bisect) sees `check-phase-71.mjs` FAIL on V-71-MILESTONES-01 and concludes Plan 71-01 introduced a regression.

**Why it happens:** Missing context — the FAIL is the documented transient-RED per Plan 70-05 Commit A precedent (see Pitfall 1 above).

**How to avoid:**
1. Plan 71-01 commit message body explicitly states the transient-FAIL expectation.
2. Plan 71-01 SUMMARY captures the pre-commit dry-run output verbatim.
3. Plan 71-03 close-gate VERIFICATION.md records Plan 71-01 SHA as the atomic-fix-fixture witness AND Plan 71-02 SHA as the V-71-MILESTONES-01-resolves witness.

**Warning signs:** A reviewer or bisect output identifies V-71-MILESTONES-01 FAIL at Plan 71-01 SHA as a Phase 71 regression rather than expected transient.

## Code Examples

Verified patterns from in-repo precedents.

### Example 1: Vendored Extractor — Corrected Regex
```javascript
// scripts/archive/extract-summary-oneliners.mjs (Plan 71-01 Wave 1)
export function extractOneLinerFromBody(content) {
  if (!content) return null;
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
  // CORRECTED: anchor on literal "**One-liner:**" label.
  const match = body.match(/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m);
  return match ? match[1].trim() : null;
}
```

**Why:** Captures the VALUE (`([^\r\n]+)`) following the literal label `\*\*One-liner:\*\*\s+`. The original buggy `/^#[^\n]*\n+\*\*([^*]+)\*\*/m` captured the LABEL between the bold markers. CRLF-tolerant via `\r?\n`.

[VERIFIED against `67-01-SUMMARY.md:48` body shape — `**One-liner:** Verified 4 ABM URLs alive via cron-pinned markdown-link-check@3.14.2 + corroborating curl HEAD; annotated sidecar with per-entry \`last_revalidated:2026-05-26\` (ANNOTATE-not-remove); zero corpus edits (Branch A).` -> capture group 1 returns full value string up to the EOL.]

### Example 2: Frontmatter Pre-Write Helper
```javascript
// scripts/archive/extract-summary-oneliners.mjs — pre-write helper (idempotent)
export function preWriteFrontmatterOneLiner(content, oneLiner) {
  if (hasFrontmatterOneLiner(content)) return content;  // Idempotent
  const escaped = oneLiner.replace(/"/g, '\\"');
  const fmMatch = content.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
  if (!fmMatch) {
    const eol = content.includes('\r\n') ? '\r\n' : '\n';
    return `---${eol}one-liner: "${escaped}"${eol}---${eol}${eol}${content}`;
  }
  const fmHead = fmMatch[1]; const fmBody = fmMatch[2]; const fmTail = fmMatch[3];
  const eol = fmHead.includes('\r\n') ? '\r\n' : '\n';
  const trimmed = fmBody.replace(/[\r\n]+$/, '');
  const newFm = `${fmHead}${trimmed}${eol}one-liner: "${escaped}"${fmTail}`;
  return content.slice(0, fmMatch.index) + newFm + content.slice(fmMatch.index + fmMatch[0].length);
}
```

**Why:** Preserves existing frontmatter fields and the document's EOL convention. Idempotent — second run is a no-op.

### Example 3: Unit-Test Fixture — Label-Not-Captured
```javascript
// scripts/archive/test-extract-oneliner.mjs (Plan 71-01 Wave 2)
import { extractOneLinerFromBody } from './extract-summary-oneliners.mjs';
import process from 'node:process';

const tests = [
  {
    name: 'Fixture 1 — label-not-captured (Phase 67 Plan 67-01 SUMMARY body shape)',
    input: `---\nphase: 67-x\n---\n\n# Phase 67 Plan 01: SWEEP-01 Summary\n\n**One-liner:** Verified 4 ABM URLs alive via cron-pinned markdown-link-check\n\n## What Was Built\n`,
    expect: 'Verified 4 ABM URLs alive via cron-pinned markdown-link-check'
  },
  {
    name: 'Fixture 2 — CRLF tolerance',
    input: `---\r\nphase: x\r\n---\r\n\r\n# Title\r\n\r\n**One-liner:** CRLF value here\r\n`,
    expect: 'CRLF value here'
  },
  {
    name: 'Fixture 3 — no body One-liner (returns null)',
    input: `---\nphase: x\n---\n\n# Title\n\nSome body without one-liner.\n`,
    expect: null
  },
];

let failed = 0;
for (const t of tests) {
  const got = extractOneLinerFromBody(t.input);
  if (got !== t.expect) {
    console.error(`FAIL: ${t.name}\n  expected: ${JSON.stringify(t.expect)}\n  got:      ${JSON.stringify(got)}`);
    failed++;
  } else {
    console.log(`PASS:  ${t.name}`);
  }
}
console.log(`\nResult: ${tests.length - failed} PASS / ${failed} FAIL`);
process.exit(failed > 0 ? 1 : 0);
```

[CITED: pattern mirrors check-phase-NN.mjs assertion loop format; same exit-code convention.]

### Example 4: check-phase-71.mjs V-71-FIX-01 Assertion
```javascript
// scripts/validation/check-phase-71.mjs (Plan 71-01 Wave 3)
const EXTRACTOR_PATH = 'scripts/archive/extract-summary-oneliners.mjs';

const checks = [
  {
    id: 'FIX-01',
    name: 'V-71-FIX-01: scripts/archive/extract-summary-oneliners.mjs exists + carries corrected regex',
    run() {
      const c = readFile(EXTRACTOR_PATH);
      if (c === null) return { pass: false, detail: EXTRACTOR_PATH + ' missing' };
      // Anchored on the literal corrected regex fragment.
      const ok = c.includes('\\*\\*One-liner:\\*\\*\\s+([^\\r\\n]+)') || c.includes('**One-liner:**\\s+');
      if (!ok) return { pass: false, detail: 'corrected regex \\*\\*One-liner:\\*\\* anchor not present' };
      return { pass: true, detail: 'vendored extractor carries corrected regex anchor' };
    }
  },
  // ... more checks
];
```

[VERIFIED against `check-phase-67.mjs:70-98` assertion shape — same `readFile()` helper, same return-object shape, same id-name pattern.]

### Example 5: check-phase-71.mjs V-71-MILESTONES-01 Assertion
```javascript
const PLACEHOLDER_TOKENS = [
  'One-liner:', 'SUBSUMED BY PLAN', 'Hash:', 'Pre-edit:', 'Total file size:',
  'File:', 'Insertion position:', 'Single deliverable:', 'Plan goal:', 'Found during:',
  'Edit \\d+ --',  // NEW class discovered by D-03 advisor at v1.1 line 164
];

function buildGarbageRegex() {
  const escaped = PLACEHOLDER_TOKENS.map(t =>
    t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  return new RegExp('^- (?:' + escaped + ')', 'gm');
}

checks.push({
  id: 'MILESTONES-01',
  name: 'V-71-MILESTONES-01: .planning/MILESTONES.md HEAD — zero placeholder-label garbage bullets',
  run() {
    const c = readFile('.planning/MILESTONES.md');
    if (c === null) return { pass: false, detail: '.planning/MILESTONES.md missing' };
    const re = buildGarbageRegex();
    const matches = c.match(re) || [];
    if (matches.length > 0) {
      const lines = c.split('\n');
      const hits = [];
      for (let i = 0; i < lines.length && hits.length < 5; i++) {
        if (new RegExp('^- (?:' + PLACEHOLDER_TOKENS.map(t => t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')').test(lines[i])) {
          hits.push((i + 1) + ':' + lines[i].slice(0, 80));
        }
      }
      return { pass: false, detail: matches.length + ' placeholder bullets; first hits: ' + hits.join(' | ') };
    }
    return { pass: true, detail: 'MILESTONES.md clean: 0 placeholder bullets across ' + c.length + ' bytes' };
  }
});
```

[CITED: CONTEXT.md `71-CONTEXT.md` D-02 lines 81-97 + WRAPPER-01 lesson on diagnostic-richness on FAIL (capture first 5 matches with line numbers).]

### Example 6: V-71-ARCHIVE02-01 Specific-Sites Assertion
```javascript
checks.push({
  id: 'ARCHIVE02-01',
  name: 'V-71-ARCHIVE02-01: v1.1 line 164 + v1.2 lines 145-148 known-residue sites cleared post-sweep',
  run() {
    const c = readFile('.planning/MILESTONES.md');
    if (c === null) return { pass: false, detail: '.planning/MILESTONES.md missing' };
    const lines = c.split('\n');
    // Find v1.1 H2 + v1.2 H2 by scan (line numbers shift with re-author; locate by heading).
    let v11h2 = -1, v12h2 = -1, v10h2 = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^## v1\.1 /.test(lines[i])) v11h2 = i + 1;
      if (/^## v1\.2 /.test(lines[i])) v12h2 = i + 1;
      if (/^## v1\.0 /.test(lines[i])) v10h2 = i + 1;
    }
    if (v11h2 < 0 || v12h2 < 0) return { pass: false, detail: 'v1.1 or v1.2 H2 missing from MILESTONES.md' };
    // Scope: v1.2 H2 down to v1.1 H2 ; v1.1 H2 down to v1.0 H2 (or EOF if absent).
    const v12body = lines.slice(v12h2 - 1, v11h2 - 1).join('\n');
    const v11body = lines.slice(v11h2 - 1, v10h2 > 0 ? v10h2 - 1 : lines.length).join('\n');
    const re = buildGarbageRegex();
    const v12hits = v12body.match(re) || [];
    const v11hits = v11body.match(re) || [];
    if (v12hits.length > 0 || v11hits.length > 0) {
      return { pass: false, detail: 'v1.2 H2 has ' + v12hits.length + ' debris bullets; v1.1 H2 has ' + v11hits.length + ' debris bullets' };
    }
    return { pass: true, detail: 'v1.1 + v1.2 H2 entries clear of placeholder-label residue' };
  }
});
```

**Why scoped scan instead of trusting V-71-MILESTONES-01:** V-71-MILESTONES-01 is a whole-file scan that exits on first FAIL bucket. V-71-ARCHIVE02-01 gives per-H2 diagnostic — distinguishes "v1.2 still dirty but v1.1 cleaned" from "v1.1 still dirty but v1.2 cleaned." Useful for Plan 71-02 wave-by-wave debugging.

### Example 7: Atomic Commit Composition (Plan 71-01)
```powershell
# Plan 71-01 Wave 4 — Pre-commit dry-run (MANDATORY before git add)
$results = @{}

# Self-test the vendored extractor
& node scripts/archive/extract-summary-oneliners.mjs --self-test
$results['extract-self-test'] = $LASTEXITCODE  # Expect 0

# Run companion test fixture
& node scripts/archive/test-extract-oneliner.mjs
$results['test-extract-oneliner'] = $LASTEXITCODE  # Expect 0

# Run new chain validator — V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL
# (chicken-and-egg per Plan 70-05 Commit A precedent; documented in commit message)
& node scripts/validation/check-phase-71.mjs
$results['check-phase-71-pre-Plan-71-02'] = $LASTEXITCODE  # Expect 1 (V-71-MILESTONES-01 + V-71-ARCHIVE02-01 FAIL)

# Atomic commit: 3 NEW files in ONE SHA
git add scripts/archive/extract-summary-oneliners.mjs scripts/archive/test-extract-oneliner.mjs scripts/validation/check-phase-71.mjs
git commit -m @"
fix(archive): ARCHIVE-01 root-cause fix for gsd-complete-milestone extraction + regression fixture (atomic SC#4)

- scripts/archive/extract-summary-oneliners.mjs (NEW): vendored extractOneLinerFromBody with corrected regex
  /^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m (captures VALUE; original buggy regex captured LABEL).
  CLI: --milestone <v> / --pre-write-frontmatter / --self-test / --dry-run.
- scripts/archive/test-extract-oneliner.mjs (NEW): companion unit-test fixture (3 cases).
- scripts/validation/check-phase-71.mjs (NEW): chain-apex validator (V-71-FIX-01/02 + V-71-MILESTONES-01 +
  V-71-ARCHIVE02-01 + V-71-CHAIN-{48..70} + V-71-AUDIT + V-71-SELF).

Transient: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL until Plan 71-02 lands (per Plan 70-05 Commit A
precedent for documented transient-RED chain state). Plan 71-02 sweeps v1.1+v1.2 H2 residue via
MILESTONE-AUDIT-driven re-authoring; Plan 71-03 close-gate verifies full chain green.

Upstream PR ARCHIVE-UPSTREAM-01 follow-up tracked in v1.8-DEFERRED-CLEANUP.md (Phase 74 HARNESS-12 finalizes).
"@
```

[CITED: pattern mirrors Phase 67 Plan 67-02 `55260b3` atomic-within-plan 5-file commit + Phase 70 Plan 70-05 Commit A `14683de` documented-transient-RED pattern.]

### Example 8: Plan 71-02 v1.1 H2 Re-Authoring (Edit Tool)
```markdown
# Plan 71-02 Wave 2 — Edit tool invocation (schematic)
#
# Pre-edit state (MILESTONES.md:155-166 verbatim per current file state):
# ## v1.1 APv2 Documentation & Admin Setup Guides (Shipped: 2026-04-13)
#
# **Phases completed:** 9 phases, 18 plans, 42 tasks      ← NOTE: should be 7 phases (11-17) per audit
#
# **Key accomplishments:**
#
# - APv1 admin setup overview index, hardware hash upload guide with 3-path decision tree, ...
# - Dynamic groups with ZTDId rule and sync delays, 3-mode comparison table, ...
# - Intune Connector guide with critical version gate (6.2501.2000.5) and OU XML config, ...
# - Edit 1 -- docs/error-codes/00-index.md:                  ← DEBRIS (NEW DISCOVERY)
#
# Edit:
#   old_string: <verbatim 12 lines 155-166 inclusive of trailing blank>
#   new_string:
#     ## v1.1 APv2 Documentation & Admin Setup Guides (Shipped: 2026-04-13)
#
#     **Phases completed:** 7 phases (11-17), 18 plans, 42 tasks
#     **Audit status:** `tech_debt` (.planning/milestones/v1.1-MILESTONE-AUDIT.md;
#       24/24 requirements + 7/7 phases + 5/6 integration + 5/6 flows;
#       tech-debt items routed to v1.2 closure)
#
#     **Note:** v1.1 entry retroactively re-authored 2026-06-03 during Phase 71 ARCHIVE-02 sweep
#     from canonical source-of-truth v1.1-MILESTONE-AUDIT.md per Plan 71-02. Symmetric with
#     v1.6+v1.7 retroactive-authoring 2026-05-29. The pre-sweep entry carried 1 debris line at
#     line 164 (`- Edit 1 -- docs/error-codes/00-index.md:`) — discovered by D-03 advisor
#     pre-sweep grep enumeration; NOT in v1.7-DEFERRED-CLEANUP.md:38-48 known-sites list.
#
#     **Key accomplishments:**
#
#     - APv1 admin setup overview + hardware hash upload guide (3-path decision tree) +
#       deployment profile (11 OOBE settings) + ESP policy (critical Windows quality update
#       default change) [Phase 16: ADMN-01..03]
#     - APv1 enrollment modes — dynamic groups with ZTDId rule + 3-mode comparison +
#       user-driven (hybrid join) + pre-provisioning (TPM 2.0 / Win+F12 / reseal) +
#       self-deploying (no user affinity) admin guides [Phase 16: ADMN-04..07]
#     - APv2 lifecycle foundation + failure index + L1 decision trees (6 scenarios) +
#       L2 runbooks (3 deep-dive scenarios) [Phases 11-14: LIFE-01..04 / TROU-01..05]
#     - APv2 admin setup guides (5 files; 5 stale "coming in Phase 16" placeholders routed
#       to v1.2 cleanup) + APv1 admin setup overlay [Phase 15: ASET-01..05]
#     - Intune Connector guide (version gate 6.2501.2000.5 + OU XML config) + 30-entry
#       consolidated error-code reverse-lookup table across 6 failure categories +
#       navigation hub integration [Phases 16-17: ADMN-06..07 / NAVG-01..04]
```

**Why this shape:** 5 bullets matches the v1.6 manually-authored scale (paragraph-summary form) and the v1.7 4-pillar narrative form. Each bullet maps to one or more REQ-IDs from `v1.1-MILESTONE-AUDIT.md` Requirements Coverage table (lines 70-96). The 5th bullet (Intune Connector + error-code consolidation) semantically RESTORES the truncated bullet that the archive script emitted as `- Edit 1 -- docs/error-codes/00-index.md:` — the substance was the error-code consolidation work.

[CITED: `v1.1-MILESTONE-AUDIT.md` lines 70-96 (Requirements Coverage table); lines 114-136 (Tech Debt); line 165 (Conclusion — "All 24 v1.1 requirements are satisfied. No critical blockers.")]

### Example 9: Plan 71-02 v1.2 H2 Re-Authoring (Edit Tool)
```markdown
# Plan 71-02 Wave 3 — Edit tool invocation (schematic)
#
# Pre-edit state (MILESTONES.md:138-153 verbatim per current file state):
# ## v1.2 Cross-Platform Provisioning & Operational Gaps (Shipped: 2026-04-16)
#
# **Phases completed:** 6 phases, 20 plans, 23 tasks
#
# **Key accomplishments:**
#
# - docs/index.md restructured as a dual-platform navigation hub ...
# - One-liner:                ← DEBRIS line 145
# - One-liner:                ← DEBRIS line 146
# - Commit:                   ← DEBRIS line 147
# - One-liner:                ← DEBRIS line 148
# - Complete 7-stage macOS ADE lifecycle narrative (414 lines) ...
# - macOS Terminal commands reference (6 tools), log paths reference (9 paths), ...
# - Cross-platform symptom routing wired into common-issues.md ...
#
# Edit:
#   old_string: <verbatim 16 lines 138-153 inclusive of trailing blank + ---  separator>
#   new_string:
#     ## v1.2 Cross-Platform Provisioning & Operational Gaps (Shipped: 2026-04-16)
#
#     **Phases completed:** 6 phases (20-25), 20 plans, 23 tasks
#     **Audit status:** `gaps_found` (.planning/milestones/v1.2-MILESTONE-AUDIT.md;
#       16/38 requirements formally verified; Phases 21 + 24 lacked VERIFICATION.md
#       at close — process gaps not content gaps; tech-debt routed to v1.3 closure)
#
#     **Note:** v1.2 entry retroactively re-authored 2026-06-03 during Phase 71 ARCHIVE-02
#     sweep from canonical source-of-truth v1.2-MILESTONE-AUDIT.md per Plan 71-02. Symmetric
#     with v1.6+v1.7 retroactive-authoring 2026-05-29. The pre-sweep entry carried 4 debris
#     lines at 145-148 (3× `- One-liner:` + 1× `- Commit:`) per v1.7-DEFERRED-CLEANUP.md:38-48
#     known-sites enumeration.
#
#     **Key accomplishments:**
#
#     - Cross-platform navigation hub — docs/index.md restructured with Choose Your Platform
#       selector, Windows Autopilot + macOS Provisioning H2 sections, Cross-Platform
#       References section linking Phase 20 artifacts [Phase 20: XPLAT-01..04 / NAVX-01]
#     - Windows operational gaps (Phase 21) — device lifecycle (autopilot reset / retire /
#       re-provisioning / tenant migration), network infrastructure (entra prereqs /
#       licensing matrix / win32 packaging / ESP timeout tuning), CA enrollment timing,
#       security baseline conflicts, compliance timing, APv1->APv2 migration, GPO->Intune,
#       deployment reporting, drift detection, batch workflow [Phase 21: WDLC/WINF/WSEC/
#       WMIG/WMON 18 reqs — content shipped; VERIFICATION.md tech-debt routed to v1.3]
#     - macOS lifecycle foundation + complete 7-stage ADE lifecycle narrative (414 lines)
#       with Mermaid pipeline diagram + 15 glossary cross-references [Phase 22: MLIF-01..03]
#     - macOS admin setup (6 admin guides) + Terminal commands reference (6 tools) +
#       log paths reference (9 paths) + extended network endpoints with ADE section
#       (18 endpoints) [Phase 23: MADM-01..06]
#     - macOS troubleshooting (Phase 24) — triage tree + 6 L1 runbooks + L2 log collection
#       + 3 L2 investigation runbooks [Phase 24: MTRO-01..04 — content shipped;
#       VERIFICATION.md tech-debt routed to v1.3] + Cross-platform symptom routing wired
#       into common-issues.md / quick-ref-l1.md / quick-ref-l2.md with macOS ADE sections
#       and bidirectional cross-reference banners [Phase 25: NAVX-02..03]
```

**Why this shape:** 5 bullets matches the audit doc's 6-phase structure (Phases 20-25; bullets 1-5 cover Phase 20, 21, 22, 23, 24+25). Each bullet maps to REQ-IDs from `v1.2-MILESTONE-AUDIT.md` Requirements Coverage tables (lines 210-262). The added `Audit status: gaps_found` row reflects the actual audit-doc frontmatter (line 5: `status: gaps_found`) — critical for honest historical record.

[CITED: `v1.2-MILESTONE-AUDIT.md` lines 5-187 (frontmatter); lines 206-261 (Requirements Coverage); lines 268-275 (Phase Verification Summary).]

### Example 10: Plan 71-02 Post-Edit Boundary Verification
```powershell
# Plan 71-02 Wave 4 — pre-commit dry-run + boundary verification
$ok = $true

# (a) Chain validator
& node scripts/validation/check-phase-71.mjs
if ($LASTEXITCODE -ne 0) { Write-Error "check-phase-71 FAIL"; $ok = $false }

# (b) Predecessor-byte-unchanged invariant
$predSurfaces = @(
  '.github/workflows/audit-harness-v1.4-integrity.yml',
  '.github/workflows/audit-harness-v1.4.1-integrity.yml',
  '.github/workflows/audit-harness-v1.5-integrity.yml',
  '.github/workflows/audit-harness-v1.6-integrity.yml',
  '.github/workflows/audit-harness-v1.7-integrity.yml',
  'scripts/validation/v1.4-milestone-audit.mjs',
  'scripts/validation/v1.4.1-milestone-audit.mjs',
  'scripts/validation/v1.5-milestone-audit.mjs',
  'scripts/validation/v1.6-milestone-audit.mjs',
  'scripts/validation/v1.7-milestone-audit.mjs',
  'scripts/validation/v1.7-audit-allowlist.json'
)
$plan7101sha = & git log -1 --format=%H --grep='ARCHIVE-01.*atomic SC#4'
foreach ($surface in $predSurfaces) {
  $diff = & git diff "$plan7101sha~1" HEAD -- $surface 2>$null
  if ($diff) { Write-Error "Predecessor surface modified: $surface"; $ok = $false }
}

# (c) MILESTONES.md diff scope
$mDiff = & git diff HEAD -- .planning/MILESTONES.md
$hunkCount = ([regex]::Matches($mDiff, '^@@ ')).Count
if ($hunkCount -gt 2) { Write-Warning "MILESTONES.md diff has $hunkCount hunks (expected 2: v1.1 H2 + v1.2 H2)" }

if ($ok) { Write-Host "Plan 71-02 dry-run PASS — proceed with commit" -ForegroundColor Green }
else { exit 1 }
```

[CITED: pattern mirrors Plan 67-02 Wave 7 pre-commit dry-run triple + Plan 70-04 HARNESS-05 cross-OS PASS-count check.]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Symptom-fix delete (Plan 68-04 `d142c7a`) | REPLACEMENT FROM CANONICAL SOURCE (v1.6/v1.7 retroactive-authoring 2026-05-29; Phase 71 Plan 71-02 same mechanism) | v1.7 close 2026-05-29 | Doctrine: "DO NOT mask via deletion — investigate the script." Plan 68-04 symptom-fix is now treated as an anti-pattern; Phase 71 D-03 explicitly elects D Option (re-author) over A Option (delete only). |
| HEAD-coupled validator assertions | v1.7-frozen-aware helpers (`readCorpusFileAtV17Close`) | Phase 70 D-01 LOCKED Option C | Per-assertion freshness routing. `check-phase-71.mjs` reads HEAD MILESTONES.md (live contract per V-71-MILESTONES-01 design — tripwire-on-current-state). |
| Single-mega-commit at milestone close | Per-plan + per-requirement plan boundary + atomic-within-plan | Phase 67 D-04 Option E score 7 + Phase 70 D-02 two-atomic | Phase 71 inherits per-plan boundary; Plan 71-01 is atomic-within-plan (3 files in 1 SHA) per Phase 67 Plan 67-02 `55260b3`. Plan 71-02 is separately revertable per Phase 68 Plan 68-04 `d142c7a` precedent. |
| CHAIN_SKIP non-empty (5 entries) | CHAIN_SKIP empty Set invariant | Phase 68 `7b635ca` 2026-05-26 | All validators since `check-phase-66.mjs` carry `CHAIN_SKIP = new Set([])` per Phase 68 close-gate. `check-phase-71.mjs` MUST inherit this. |
| Vendoring as escape hatch (rare) | Vendoring as v1.7+ architectural pattern | Phase 68 CHAIN-02 (`scripts/validation/_lib/`) + Phase 71 D-01 (`scripts/archive/`) | The pattern now has 2 instances; v1.9+ may formalize a vendor-style guide. `scripts/archive/` is the second `_lib/`-class subtree. |

**Deprecated/outdated:**
- **Surgical-delete-as-fix on MILESTONES.md** — superseded by REPLACEMENT FROM CANONICAL SOURCE since 2026-05-29 (v1.7 close). Plan 68-04's d142c7a deletion is historical; Plan 71-02 will be the new precedent for the same defect class going forward.
- **Upstream PR + npm pin as v1.8 close strategy** — REJECTED per D-01 Option A. Vendored extractor is the v1.8 close strategy; upstream PR is deferred (ARCHIVE-UPSTREAM-01) and decoupled from v1.8 close gate.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The lightweight scalar-only `extractFrontmatter()` (no nested-mapping handling) is sufficient for all 97 archived SUMMARY.md files + the 4 v1.8 SUMMARY.md files (Phases 71-74) | Pattern 1 + Code Example 2 | If a v1.8 SUMMARY.md has nested-mapping frontmatter with a colon, idempotency check may false-negative and the CLI injects a duplicate `one-liner:`. Mitigation: Plan 71-01 Wave 2 test fixture covers this; YAML 1.1 first-occurrence wins so duplicate is harmless. **[ASSUMED — verify with grep at Plan 71-01 Wave 1: `grep -r "^\s\s-\s" .planning/phases/*/[0-9]*-SUMMARY.md | head -20` to confirm zero nested-list frontmatter values contain colons.]** |
| A2 | The 5 debris lines (v1.2:145-148 + v1.1:164) are the ONLY debris in v1.0..v1.4.1 MILESTONES.md ranges per D-03 advisor pre-sweep grep | §Phase Requirements + Code Example 6 | If additional debris exists outside the documented sites, V-71-MILESTONES-01 will FAIL post-Plan-71-02 unexpectedly. Mitigation: D-03 advisor ran two grep passes (raw + bullet-aware) at 2026-06-03; the only NEW DISCOVERY was v1.1:164. **[VERIFIED at D-03 advisor — see `.claude/tmp/phase71-D03-advisor.md` lines 17-44 enumeration table.]** |
| A3 | The corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` catches all 97 archived SUMMARY.md `**One-liner:** value` patterns | Code Example 1 | If any SUMMARY.md uses a non-standard pattern (e.g., `**[One-liner:](anchor)**` markdown-link label, or trailing tab whitespace), the extractor returns null and pre-write fails silently. Mitigation: Plan 71-01 Wave 1 should run `--dry-run` against all 97 SUMMARY.md to identify non-matching files BEFORE Phase 74 invokes pre-write on v1.8 SUMMARYs. **[ASSUMED — Plan 71-01 Wave 1 dry-run validation step recommended.]** |
| A4 | Audit-doc bullet count of 5 per H2 matches the v1.6+v1.7 manually-authored scale | Examples 8-9 + Plan 71-02 | If 5 bullets is too few for v1.2 (which has 6 phases) or too many for v1.1 (which has compact accomplishments), the Plan 71-02 author may need to adjust. The Discretion item in CONTEXT line 194 explicitly allows tuning bullet count per H2. **[ASSUMED — Plan 71-02 Wave 1 read-and-decide.]** |
| A5 | `git diff <SHA>~1 <SHA> -- <surface>` is sufficient for predecessor-byte-unchanged verification | Code Example 10 | If `git` is invoked from an unexpected cwd or with shallow clone (FETCH-DEPTH-01 class), the diff may be incomplete. Mitigation: All Phase 71 plans run on local main tree (sequential per `use_worktrees: false`); FETCH-DEPTH-01 only affects GHA shallow-clone — Phase 71 has no CI workflow modifications. **[VERIFIED — see CONTEXT line 41 `use_worktrees: false` + REQUIREMENTS line 70 anti-regression invariant.]** |
| A6 | The chicken-and-egg V-71-MILESTONES-01 FAIL at Plan 71-01 commit is acceptable per Plan 70-05 Commit A precedent | Pitfall 1 + 7 + §Chicken-and-Egg | If the GitHub CI runs `check-phase-71.mjs` against Plan 71-01 SHA in isolation (e.g., PR-blocking on a feature branch that contains only Plan 71-01), the PR would block on V-71-MILESTONES-01 FAIL. Mitigation: Plan 71-01 and Plan 71-02 land on the SAME feature branch (or main tree per sequential execution); the CI for check-phase-71 lives in Phase 74 HARNESS-10's NEW `audit-harness-v1.8-integrity.yml` which does not exist at Phase 71 close. Phase 71 close-gate uses local chain re-run only. **[VERIFIED — Phase 71 introduces ZERO workflow modifications.]** |

**If this table is empty:** Not applicable — 6 assumptions documented above. Plan 71-01 Wave 1 dry-run + Plan 71-02 Wave 1 read-and-decide collapse most assumptions to verified state before commits land.

## Chicken-and-Egg Resolution

**Restated:** Plan 71-01 commits `check-phase-71.mjs` which asserts V-71-MILESTONES-01 (zero placeholder bullets in MILESTONES.md HEAD). At Plan 71-01 commit time, MILESTONES.md still has the 5 debris lines. V-71-MILESTONES-01 and V-71-ARCHIVE02-01 both FAIL. SC#4 demands atomic fix+fixture (Plan 71-01 satisfies); but the fixture's assertion target (clean MILESTONES.md) is satisfied only by Plan 71-02.

**Recommendation (research):** **Commit-with-known-FAIL per Plan 70-05 Commit A precedent.** Rationale:

1. **In-repo precedent exists.** Plan 70-05 Commit A `14683de` deliberately committed validators with `{phase_70_close_SHA}` placeholder unresolved — knowing `check-phase-67/68/70.mjs` would EXIT NON-ZERO until Atom 2 SHA `aa6de68` was substituted. The chain was RED in the gap. Plan 70-05 Commit B `4df3a16` then closed the gate green. The transient was acceptable because:
   - It was DOCUMENTED in Plan SUMMARY + VERIFICATION.md.
   - The next plan landed within the same phase before any user-facing PR could see the RED state.
   - Bisect on intermediate SHAs identifies Plan 70-05 Commit B as the green baseline.

2. **The alternative (stage-but-don't-commit-Plan-71-01-until-Plan-71-02-ready) inverts plan ordering and breaks D-04.** D-04 Option B explicitly chose Plan 71-01 -> Plan 71-02 -> Plan 71-03 ordering. Inverting would mean Plan 71-02 commits an Edit to MILESTONES.md WITHOUT the validator existing yet — which means we cannot validate the sweep result automatically; we'd revert to manual grep verification, defeating D-02 Option C's tripwire role.

3. **V-71-CHAIN, V-71-AUDIT, V-71-FIX-01/02, V-71-SELF all PASS at Plan 71-01 commit.** Only V-71-MILESTONES-01 + V-71-ARCHIVE02-01 are red (2 of ~26 assertions). The chain-validator output is informative: it identifies the missing piece (debris in MILESTONES.md) and points to Plan 71-02 as resolver.

4. **No CI workflow runs `check-phase-71.mjs` in Phase 71 scope.** Phase 71 ships `check-phase-71.mjs` as a deliverable; Phase 74 HARNESS-10 wires it into the NEW `audit-harness-v1.8-integrity.yml`. At Phase 71 commit time, the validator is invoked manually (Wave 4 pre-commit dry-run + Plan 71-03 Wave 1 full chain re-run). No PR-blocker friction.

**Operational mechanics:**
- Plan 71-01 Wave 4 pre-commit dry-run captures the FAIL output verbatim in a `_tmp-plan-71-01-precommit-output.txt` artifact.
- Plan 71-01 SUMMARY embeds the captured output under a "Transient RED-state per Plan 70-05 Commit A precedent" H2.
- Plan 71-01 commit message body includes: `Transient: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL until Plan 71-02 lands.`
- Plan 71-02 Wave 4 pre-commit dry-run shows green; captured in 71-02 SUMMARY.
- Plan 71-03 VERIFICATION.md records BOTH Plan 71-01 SHA (transient-RED documented) AND Plan 71-02 SHA (green-baseline witness).

**Open question resolution (Open Question #1 in research_focus):** Use commit-with-known-FAIL per Plan 70-05 Commit A precedent. This is the recommended path; planner may overrule at plan-phase if a stronger reason surfaces.

## Open Questions

1. **Chicken-and-egg for V-71-MILESTONES-01 at Plan 71-01 commit time** — **RESOLVED via Pattern 1 above** (commit-with-known-FAIL per Plan 70-05 Commit A precedent). Documentation requirements specified.

2. **Should `scripts/archive/extract-summary-oneliners.mjs` ESM/CJS?** — **RESOLVED: ESM (`.mjs`)** per `scripts/validation/_lib/archive-path.mjs` precedent + all 23 `check-phase-NN.mjs` files. CJS would be a paradigm break with zero benefit. [VERIFIED: Glob `scripts/**/*.mjs` returns 25+ matches; Glob `scripts/**/*.cjs` returns 0.]

3. **Should `Edit N --` token be in the V-71-MILESTONES-01 PLACEHOLDER_TOKENS list directly, or maintained separately?** — **RESOLVED: directly in the list, with explicit escape-branch.** Per CONTEXT line 305 deferred-ideas: "Plan 71-01 author should add `Edit N --` to PLACEHOLDER_TOKENS list." Implementation: include `'Edit \\d+ --'` as the 11th entry; escape mapper has `t === 'Edit \\d+ --' ? t : t.replace(...)` branch (see Pattern 2 + Example 5). The single-list approach keeps the token taxonomy in one place; separate maintenance would split the source-of-truth across the validator file.

4. **Should v1.1 H2 + v1.2 H2 re-authoring be wave-disjoint within Plan 71-02 (Wave 1 v1.1, Wave 2 v1.2) or atomic-within-plan single edit?** — **RESOLVED: atomic-within-plan (single commit covering both H2 edits).** Rationale:
   - D-04 Option B specifies Plan 71-02 as ONE commit ("docs(archive): ARCHIVE-02 re-author v1.1+v1.2 MILESTONES.md entries from MILESTONE-AUDIT source").
   - Splitting into 2 sub-commits within Plan 71-02 inflates plan count and re-introduces a transient-RED state between sub-commits (V-71-ARCHIVE02-01 PASSES v1.2 cleared but FAILS v1.1 still dirty, or vice versa).
   - Internal wave-ordering within Plan 71-02 (Wave 2 v1.1 first, then Wave 3 v1.2, then Wave 4 dry-run) is fine — the COMMIT boundary is at Wave 5 with both H2 edits staged together.
   - This is NOT analogous to Phase 68 Plan 68-04 D-04 separation (which separated MILESTONES.md edits from VALIDATOR edits — different epistemic class). Plan 71-02 has only ONE epistemic class (re-authoring) operating on ONE file.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `.mjs` scripts in Phase 71 | ✓ | v24.15.0 (session-verified) | — |
| Git | Predecessor-byte-unchanged checks; commit SHA capture | ✓ | (Windows native; session-verified via `git status` in init context) | — |
| PowerShell | Outer shell for sequencing | ✓ | Default Windows | bash (also available per env note) |
| Edit tool | MILESTONES.md surgical edits | ✓ | (Claude Code built-in) | Manual file write with verified line-ending preservation (NOT recommended; Set-Content drift risk) |
| `get-shit-done-cc` npm-global | Phase 74 HARNESS-12 invocation only (NOT Phase 71) | ✓ | (installed at `C:\Users\<user>\AppData\Roaming\npm\node_modules\get-shit-done-cc`) | Vendored extractor pre-write step routes around the broken extraction path. |

**Missing dependencies with no fallback:** None — Phase 71 is self-contained.
**Missing dependencies with fallback:** None.

## Validation Architecture

> Phase 71 is in a project with `workflow.nyquist_validation` not explicitly set. Default behavior is enabled. Validation section included.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node-native ESM (no test framework); chain-apex validator pattern per `check-phase-67.mjs` |
| Config file | None — each `.mjs` is self-contained; exit code is the contract |
| Quick run command | `node scripts/validation/check-phase-71.mjs` |
| Full suite command | `for i in 48..71; do node scripts/validation/check-phase-${i}.mjs; done; node scripts/validation/v1.7-milestone-audit.mjs` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ARCHIVE-01 | Vendored extractor extracts VALUE (not LABEL) from `**One-liner:** value` body | unit | `node scripts/archive/test-extract-oneliner.mjs` | ❌ Wave 0 — Plan 71-01 Wave 2 authors |
| ARCHIVE-01 | Vendored extractor pre-write is idempotent (re-run = no edit) | unit | `node scripts/archive/test-extract-oneliner.mjs` (Fixture 2) | ❌ Wave 0 |
| ARCHIVE-01 | check-phase-71.mjs V-71-FIX-01 asserts vendored extractor exists + carries corrected regex anchor | chain | `node scripts/validation/check-phase-71.mjs` | ❌ Wave 0 — Plan 71-01 Wave 3 authors |
| ARCHIVE-01 | check-phase-71.mjs V-71-FIX-02 asserts test fixture file exists + 3 cases discoverable | chain | `node scripts/validation/check-phase-71.mjs` | ❌ Wave 0 |
| ARCHIVE-02 | check-phase-71.mjs V-71-MILESTONES-01 scans MILESTONES.md HEAD for anchored-bullet placeholder tokens; zero matches required | chain | `node scripts/validation/check-phase-71.mjs` | ❌ Wave 0 |
| ARCHIVE-02 | check-phase-71.mjs V-71-ARCHIVE02-01 specifically scopes v1.1 H2 + v1.2 H2 ranges for zero debris | chain | `node scripts/validation/check-phase-71.mjs` | ❌ Wave 0 |
| ARCHIVE-01+02 | Full chain check-phase-{48..71}.mjs all PASS + 0 SKIPPED + 0 FAIL | chain-of-chains | per-phase loop | ✅ (48-70 exist; 71 ships Plan 71-01) |
| ARCHIVE-01+02 | v1.7-milestone-audit.mjs 15/15 PASS unchanged (predecessor-byte-unchanged invariant) | harness | `node scripts/validation/v1.7-milestone-audit.mjs` | ✅ |

### Sampling Rate
- **Per task commit:** `node scripts/validation/check-phase-71.mjs` (Plan 71-01 Wave 4 expects 2 transient FAILs; Plan 71-02 Wave 4 expects ALL PASS)
- **Per wave merge:** No wave-merge concept on sequential-on-main-tree; pre-commit dry-run per plan covers this
- **Phase gate:** Full chain `check-phase-{48..71}.mjs` + `v1.7-milestone-audit.mjs` all green at Plan 71-03 Wave 1

### Wave 0 Gaps
- [ ] `scripts/archive/extract-summary-oneliners.mjs` — NEW; Plan 71-01 Wave 1
- [ ] `scripts/archive/test-extract-oneliner.mjs` — NEW; Plan 71-01 Wave 2
- [ ] `scripts/validation/check-phase-71.mjs` — NEW; Plan 71-01 Wave 3
- [ ] No test framework install needed (Node stdlib only)

## Security Domain

> Phase 71 has no `security_enforcement` directive in `.planning/config.json`; absent = enabled. Section included per default behavior.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A — Phase 71 has no auth surface |
| V3 Session Management | no | N/A — no sessions |
| V4 Access Control | no | N/A — local CLI + validator only |
| V5 Input Validation | yes (LOW risk) | `--milestone` CLI arg is consumed as a path component; planner must validate it matches `^v\d+\.\d+(\.\d+)?$` to prevent path traversal in `listSummaryFilesForMilestone()` |
| V6 Cryptography | no | N/A — no crypto |
| V12 File Handling | yes (LOW risk) | `extract-summary-oneliners.mjs` writes back to SUMMARY.md files; constrain paths to `.planning/phases/` + `.planning/milestones/` only — done via the `listSummaryFilesForMilestone()` enumerator |

### Known Threat Patterns for {stack}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal via `--milestone ../../../etc/passwd` | Tampering | Validate `--milestone` matches `^v\d+\.\d+(\.\d+)?$` regex; `path.join()` + path normalization; ONLY walk `.planning/phases/` + `.planning/milestones/<milestone>-phases/` (never arbitrary roots) |
| Symbolic link escape in `.planning/phases/` walk | Tampering | `node:fs.readdirSync({withFileTypes:true})` + filter `.isFile()` (not following symlinks for write); since this is a local-dev tool not a server, threat is low |
| Frontmatter injection via crafted `**One-liner:** value` containing YAML escape sequences | Tampering | Escape `"` to `\"` (already in `preWriteFrontmatterOneLiner`); always emit double-quoted YAML scalar |
| Race condition between read and write of SUMMARY.md | Tampering | Single-threaded Node + `writeFileSync` atomic on most platforms; in practice, no concurrent writer; low risk for a dev-only CLI |

**Mitigation summary:** Phase 71 is a local-dev tool operating on a known directory tree owned by the user. Threat model is "developer accidentally passes bad CLI arg" — mitigated by the regex validation on `--milestone`. No external untrusted input. ASVS V5 + V12 controls are LOW-effort and listed; planner can implement as a 2-line guard in `main()`:

```javascript
if (!/^v\d+\.\d+(\.\d+)?$/.test(milestone)) {
  console.error(`Invalid --milestone format: ${milestone} (expected vMAJOR.MINOR[.PATCH])`);
  process.exit(2);
}
```

## Sources

### Primary (HIGH confidence)
- `D:\claude\Autopilot\.planning\phases\71-archive-automation-root-cause-fix-pillar-a\71-CONTEXT.md` — LOCKED USER DECISIONS (D-01..D-04 + Discretion items + Deferred ideas)
- `D:\claude\Autopilot\.planning\REQUIREMENTS.md` lines 11-17 (Pillar A) + Traceability table lines 78-91
- `D:\claude\Autopilot\.planning\ROADMAP.md` lines 318-329 (Phase 71 Goal + SC#1-4)
- `D:\claude\Autopilot\.planning\STATE.md` lines 77-141 (v1.8 phase dependency summary + Wave designation)
- `D:\claude\Autopilot\.planning\milestones\v1.7-DEFERRED-CLEANUP.md` lines 14-65 (ARCHIVE-01 RECURRENCE CONFIRMED 2026-05-29 + retroactive-authoring doctrine + ARCHIVE-02 known sites)
- `C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle-policy.ts` lines 54-58 — buggy regex VERIFIED in source
- `C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle.ts` lines 1670-1748 — caller code + frontmatter-wins branch + MILESTONES.md emission VERIFIED in source
- `D:\claude\Autopilot\scripts\validation\check-phase-67.mjs` (Path-A template for `check-phase-71.mjs`)
- `D:\claude\Autopilot\scripts\validation\check-phase-66.mjs` (chain-apex topology reference)
- `D:\claude\Autopilot\scripts\validation\_lib\archive-path.mjs` (ESM precedent for `scripts/archive/`)
- `D:\claude\Autopilot\.planning\MILESTONES.md` lines 138-153 (v1.2 H2 pre-sweep) + lines 155-166 (v1.1 H2 pre-sweep) — debris verified at HEAD
- `D:\claude\Autopilot\.planning\milestones\v1.1-MILESTONE-AUDIT.md` (165 lines — re-authoring source-of-truth)
- `D:\claude\Autopilot\.planning\milestones\v1.2-MILESTONE-AUDIT.md` (345 lines — re-authoring source-of-truth)

### Advisor dossiers (HIGH confidence)
- `D:\claude\Autopilot\.claude\tmp\phase71-D01-advisor.md` (212 lines — vendor + frontmatter pre-write design rationale)
- `D:\claude\Autopilot\.claude\tmp\phase71-D02-advisor.md` (340 lines — static MILESTONES.md scan + token-list + false-positive guard)
- `D:\claude\Autopilot\.claude\tmp\phase71-D03-advisor.md` (305 lines — re-author from audit source + v1.1 line 164 NEW DISCOVERY)
- `D:\claude\Autopilot\.claude\tmp\phase71-D04-advisor.md` (432 lines — 3-plan split + atomic-where-mandated)

### In-repo precedent exemplars (HIGH confidence)
- `.planning/milestones/v1.7-phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-RESEARCH.md` (exemplar Pillar A RESEARCH.md shape)
- `.planning/milestones/v1.7-phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-01-SUMMARY.md` line 48 (canonical `**One-liner:** value` body pattern)
- Phase 67 Plan 67-02 commit `55260b3` — 3-files-in-1-SHA atomic-within-plan precedent
- Phase 68 Plan 68-04 commit `d142c7a` — MILESTONES.md surgical edit as SEPARATE plan from validator surgery
- Phase 70 Plan 70-05 Commit A `14683de` — documented transient-RED chain state precedent
- Phase 68 Plan 68-03 commit `7b635ca` — CHAIN_SKIP empty Set invariant

### Secondary (MEDIUM confidence)
- (none — no WebSearch was needed; all decisions grounded in in-repo precedents and verified source files)

### Tertiary (LOW confidence)
- (none)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Node stdlib only; all precedents verified in-repo
- Architecture (4 patterns): HIGH — each pattern has explicit in-repo precedent SHA cited
- Pitfalls (7): HIGH — Pitfalls 1, 4, 5, 7 are documented precedent-class issues; Pitfalls 2, 3 are reasoned anti-pattern guards; Pitfall 6 explicitly verified non-applicable by grep
- Code examples (10): HIGH — Examples 1-2 verified against `67-01-SUMMARY.md:48` real body shape; Examples 4-6 mirror `check-phase-67.mjs` verbatim; Examples 8-9 derived from `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` frontmatter source
- Chicken-and-egg resolution: HIGH — Plan 70-05 Commit A precedent explicitly cited

**Research date:** 2026-06-03
**Valid until:** 2026-07-03 (30 days for stable in-repo state; will re-validate at Phase 74 close if not consumed by Plan 71-NN before then)

## RESEARCH COMPLETE

**Phase:** 71 - Archive-Automation Root-Cause Fix (Pillar A)
**Confidence:** HIGH

### Key Findings
- All 4 locked decisions (D-01..D-04) from `71-CONTEXT.md` mechanically translate to a deterministic 3-plan layout; only Plan 71-02 Wave 1 (bullet-count distillation from audit docs) is non-deterministic.
- The corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` is verified against `67-01-SUMMARY.md:48` real body shape and captures the VALUE (not the LABEL).
- The `Edit N --` token (NEW DISCOVERY by D-03 advisor at v1.1 line 164) MUST be added to `PLACEHOLDER_TOKENS` with explicit escape-branch — without it, V-71-MILESTONES-01 misses the v1.1 site.
- Chicken-and-egg V-71-MILESTONES-01 + V-71-ARCHIVE02-01 FAIL at Plan 71-01 commit is RESOLVED via commit-with-known-FAIL per Plan 70-05 Commit A precedent (documented transient-RED chain state).
- Phase 71 introduces ZERO external packages, ZERO workflow modifications, ZERO `package.json` mutations — all deliverables use Node stdlib + in-repo precedents.

### File Created
`D:\claude\Autopilot\.planning\phases\71-archive-automation-root-cause-fix-pillar-a\71-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | Node stdlib only; ESM `.mjs` precedent verified (25+ instances; 0 `.cjs`) |
| Architecture (4 patterns) | HIGH | Each pattern has cited in-repo precedent SHA + Path-A template |
| Pitfalls (7) | HIGH | All pitfalls grounded in precedent-class issues or explicitly verified non-applicable |
| Code Examples (10) | HIGH | Regex verified against real `67-01-SUMMARY.md:48` body shape; assertion shapes mirror `check-phase-67.mjs` verbatim |
| Chicken-and-Egg Resolution | HIGH | Plan 70-05 Commit A precedent explicitly cited |
| Bullet-count distillation (Plan 71-02) | MEDIUM | Plan author tunes at Wave 1 — Examples 8-9 provide concrete 5-bullet skeleton from audit docs but final count is plan-author discretion |

### Open Questions
All 4 research_focus open questions RESOLVED in §"Open Questions":
1. Chicken-and-egg -> commit-with-known-FAIL per Plan 70-05 Commit A precedent
2. ESM/CJS -> ESM `.mjs` per `_lib/archive-path.mjs` precedent
3. `Edit N --` token placement -> in PLACEHOLDER_TOKENS directly with escape-branch
4. v1.1 + v1.2 re-authoring atomicity within Plan 71-02 -> single commit covering both H2 edits (Wave-disjoint internally, atomic externally)

### Ready for Planning
Research complete. Planner can now author 71-01-PLAN.md (ATOMIC fix + fixture), 71-02-PLAN.md (re-authoring), and 71-03-PLAN.md (close-gate). All 4 locked decisions mechanically translate; only Plan 71-02 Wave 1 audit-doc distillation requires judgment.
