# Phase 88: Harness Lineage Bump + Terminal Re-Audit + Milestone Close (v1.10) - Research

**Researched:** 2026-06-24
**Domain:** Node ESM audit-harness lineage (v1.4→v1.10), chain validators, GitHub Actions CI coexistence, milestone-close mechanics
**Confidence:** HIGH (all critical values verified via git log / file reads against live repo)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Six new per-phase validators (`check-phase-83..88.mjs`) assert LINEAGE AND STRUCTURE ONLY — no blob-hash, anchor-match, or content-coupling to v1.10 doc content. Each asserts: harness file exists & runs; phase NOT in CHAIN_PHASES; CHAIN_SKIP.size === 0; predecessor frozen surfaces read at V19.
- **D-02:** "Read predecessor frozen surfaces at V19" means structural reads via `frozen-at-close.mjs` helpers for PREDECESSOR (v1.9-and-earlier) surfaces only. Do NOT extend git-show / frozen reads to v1.10's own content.
- **D-03:** 3-axis re-audit: Axis 1 = fresh `git clone --no-hardlinks` (NOT worktree); Axis 2 = cross-OS Linux GHA; Axis 3 = Task-tool zero-context sub-agent (no worktree). Cross-OS EXACT MATCH compares PASS/FAIL/SKIP counts.
- **D-04 (D-03 mitigation, BINDING):** v1.10 apex is [48..87]. Take authoritative apex PASS/FAIL/SKIP count from WARM main tree + Linux GHA. Use fresh clone ONLY for fast non-apex validators. Do NOT run full apex under cold fresh-clone on Windows.
- **D-05:** Phase 88 ENDS at the close-gate commit (MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability). Archival (`/gsd-complete-milestone`) is SEPARATE and out of scope for these plans.
- **D-06:** `v1.10-DEFERRED-CLEANUP.md` enumerates deferred REQUIREMENTS only: MTPSSO-01/02/03 + KRBFUT-01/02. Working-tree cruft is out of scope. DO NOT carry PRE-EXISTING-CHAIN-RED-AT-HEAD-01 (CLOSED by Phase 86).
- **D-07:** PRE-EXISTING-CHAIN-RED-AT-HEAD-01 is CLOSED by Phase 86. Must NOT appear in close artifact as unresolved.
- **CX-1 (BINDING):** V19 = `b29dca5` — VERIFIED. Pin the CLOSE-GATE SHA, not an Atom SHA.
- **CX-2 (BINDING):** Warm-tree + GHA apex; fresh clone for non-apex only.

### Claude's Discretion

- V110 naming convention (V + digits-without-dots): V19 for v1.9, V110 for v1.10. NOTE: V110 itself is NOT pinned in Phase 88; it is the NEXT milestone's concern. Phase 88 pins V19 only.
- The v1.10 CI coexistence workflow is the 7th (base + v1.5..v1.10).

### Deferred Ideas (OUT OF SCOPE)

- Repo working-tree cleanup (`.claude/worktrees/agent-*`, `TEMPcp*.txt`, `docs.zip`) — route to `/gsd-cleanup`.
- Subprocess-result caching as durable fix for WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — deferred (D-04 uses warm-tree mitigation).
- MTPSSO-01/02/03, KRBFUT-01/02 — enumerate in DEFERRED-CLEANUP, execute in future milestones.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | `v1.10-milestone-audit.mjs` + `v1.10-audit-allowlist.json` ship as Path-A copies from v1.9 (C1-C16 inherited) + BASELINE_14 freshness comment in `regenerate-supervision-pins.mjs` (Atom 1, indivisible) | Path-A mechanics, 4-line edit set, and BASELINE pattern fully extracted from v1.9 precedent |
| HARN-02 | Per-phase `check-phase-83..88.mjs` validators + `frozen-at-close.mjs` V19 entry (pinned BEFORE any validator authored) + `audit-harness-v1.10-integrity.yml` as 7th CI coexistence workflow (predecessors v1.4–v1.9 byte-unchanged) (Atom 2, indivisible) | V19 SHA verified (`b29dca5`); frozen-at-close drop-in location confirmed (after `readAtV18Close` at line 58); CI workflow Path-A from v1.9 |
| HARN-03 | 3-axis terminal re-audit (Axis 1 fresh clone, Axis 2 GHA, Axis 3 sub-agent; EXACT MATCH) + `v1.10-MILESTONE-AUDIT.md` + `v1.10-DEFERRED-CLEANUP.md` + 4-doc traceability closure (17/17 Validated) | D-03/D-04 mitigation commands extracted; apex count [48..87] = 40 chain + 3 = 43 checks; close-gate file set and deferred-scope confirmed |
</phase_requirements>

---

## Summary

Phase 88 is the 8th Path-A milestone-close harness in the lineage (v1.4→v1.9→v1.10). Almost nothing is designed from scratch — every structural element is a versioned copy of the v1.9 precedent (phase 82, same phase name, same 4-plan shape). The single most load-bearing prerequisite (CX-1) has been verified: V19 = `b29dca5` (full: `b29dca5255c72c2ca4fd3d3924e0631089e88261`), the Phase 82 close-gate commit "docs(82-04): Phase 82 close-gate — v1.9 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.9 MILESTONE CLOSE", containing exactly 7 files.

The current state is clean: the v1.9 milestone-audit harness passes 15/15 at HEAD, self-test 9/9. The full chain (check-phase-82.mjs, [48..81]) reports 37 PASS / 0 FAIL / 0 SKIPPED at current HEAD `26d3c60` — meaning Phase 86 resolved PRE-EXISTING-CHAIN-RED-AT-HEAD-01 and the chain is fully green. The v1.10 apex after Atom 2 will be [48..87], adding 6 validators (83..88), yielding 43 checks total (40 CHAIN + AUDIT-HARNESS + AUDIT + SELF).

The key landmine for this phase is the same as every prior harness: getting the V-entry SHA WRONG. The V17/V17_CLOSEGATE retro (Phase 73 RETRO-02) documents the cost. CX-1 has been pre-verified here. The second landmine is the Windows cold-clone O(n²) timeout (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01), which is WORSE at [48..87] (+6 deeper than [48..81]); the D-04 mitigation (warm-tree + GHA for apex, fresh-clone for non-apex only) is MANDATORY.

**Primary recommendation:** Copy mechanically from phase 82. Deviate only where version strings differ, and where v1.10-specific content-file additions (guides 10/11, L2 28/29, matrix Kerberos rows, glossary entries) require allowlist updates. Follow the exact commit-message convention from v1.9.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Audit harness (v1.10-milestone-audit.mjs) | Local tooling (Node ESM) | CI (GHA) | Runs locally for warm-tree validation; GHA provides cross-OS axis |
| Per-phase validators (check-phase-83..88.mjs) | Local tooling (Node ESM) | CI (GHA) | Same: local for warm tree; CI for Linux cross-OS |
| Frozen-SHA registry (frozen-at-close.mjs) | Local tooling | — | Central shared library; all validators consume it |
| CI coexistence workflow | CI (GHA) | — | audit-harness-v1.10-integrity.yml is CI-only |
| Close artifacts (MILESTONE-AUDIT, DEFERRED-CLEANUP) | Docs / planning layer | — | Markdown artifacts in .planning/milestones/ |
| 4-doc traceability flip | Planning docs | — | PROJECT / ROADMAP / STATE / REQUIREMENTS |

---

## CX-1 — V19 SHA: VERIFIED

**Short SHA:** `b29dca5`
**Full SHA:** `b29dca5255c72c2ca4fd3d3924e0631089e88261`
**Commit subject:** `docs(82-04): Phase 82 close-gate — v1.9 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.9 MILESTONE CLOSE`
**Author:** Schweinehund
**Date:** 2026-06-22

**Confirmed it is the close-gate (not an Atom SHA):** `git show b29dca5 --stat` shows 7 files changed: `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/milestones/v1.9-DEFERRED-CLEANUP.md`, `.planning/milestones/v1.9-MILESTONE-AUDIT.md`, `.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md`. [VERIFIED: git log]

**Atom 1 SHA (for reference):** `e760176` (feat(82-01): v1.9 harness-core Path-A — SSOHARN-01 + V18 pin)
**Atom 2 SHA (for reference):** `e825fdb` (feat(82-02): v1.9 validators + CI surface — SSOHARN-02/03)
**Archival commit (AFTER close-gate, NOT part of Phase 82 scope):** `f66cf25` (chore: archive v1.9 phase directories to milestones/v1.9-phases)
**Jira commit (AFTER close-gate):** `306a30a` (chore(jira): complete v1.9)

**Where V19 entry must land in frozen-at-close.mjs:**
- Current file tops at `readAtV18Close` at line 58 (the last convenience export).
- Add V19 entry to `MILESTONE_CLOSE_SHAS` after `V18: '2bd79d8'` at line 26.
- Add `export const readAtV19Close = (p) => readAtClose('V19', p);` after `readAtV18Close` at line 58.
- **SINGLE entry only** — v1.9 closed in ONE commit (b29dca5 is the atom AND close-gate), so no `V19_CLOSEGATE` key. This mirrors the V18 precedent (single entry per D-04 of Phase 82).

**Comment for V19 entry:**
```js
V19: 'b29dca5',  // Phase 82 Plan 82-04 — v1.9 milestone close-gate (docs(82-04); 4-doc traceability
                  // + v1.9 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.9 closed in ONE
                  // commit; atom == close-gate; no separate V19_CLOSEGATE).
```

**RETRO-02 lesson (wrong-SHA history):** V17 + V17_CLOSEGATE exist because V17 was originally pinned to the Atom-1 SHA (aa6de68), not the true close-gate (4df3a16). This required a RETRO-02 supplement commit adding V17_CLOSEGATE. For V19, the close-gate is unambiguous: b29dca5 is THE close-gate commit. Do not confuse it with e760176 (Atom 1) or e825fdb (Atom 2).

[VERIFIED: git log --all --oneline | grep 82-04; git show b29dca5 --stat]

---

## Standard Stack

This phase installs no new packages. All tooling is pre-existing.

### Core (pre-existing, no installation needed)
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js ESM | already installed | Run validators and harness |
| git | already installed | SHA verification, git show frozen reads |
| gh CLI | already installed | Axis 2 GHA dispatch |

### Package Legitimacy Audit

> No new packages are installed in this phase. Existing `markdown-link-check@3.14.2` is pre-existing and pinned in the inherited workflow — not newly added.

**Packages removed due to slopcheck [SLOP] verdict:** none (N/A — no installs)
**Packages flagged as suspicious [SUS]:** none (N/A — no installs)

---

## Architecture Patterns

### Atom 1 — Exact File Set (indivisible commit)

These 4 files must land in ONE commit per HARN-01 / SC#1:

| File | Action | Source |
|------|--------|--------|
| `scripts/validation/v1.10-milestone-audit.mjs` | CREATE — Path-A copy of v1.9-milestone-audit.mjs, exactly 4 lines changed | `v1.9-milestone-audit.mjs` |
| `scripts/validation/v1.10-audit-allowlist.json` | CREATE — Path-A copy of v1.9-audit-allowlist.json, metadata relabeled + v1.10 content-file deltas | `v1.9-audit-allowlist.json` |
| `scripts/validation/_lib/frozen-at-close.mjs` | EDIT — add V19 entry + readAtV19Close convenience export | existing file |
| `scripts/validation/regenerate-supervision-pins.mjs` | EDIT — add BASELINE_14 audit-trail comment block (comment-only, const BASELINE_9 array unchanged) | existing file |

**Commit message convention (v1.9 precedent):**
```
feat(88-01): v1.10 harness-core Path-A — HARN-01 + V19 pin (atomic SC#1 Atom 1)
```

### Atom 1 — Path-A 4-Line Edit Set for v1.10-milestone-audit.mjs

The v1.9 harness (979 lines) is copied verbatim; ONLY these 4 lines change (mirror of the v1.8→v1.9 hop):

| Line | v1.9 text (to change) | v1.10 text |
|------|-----------------------|------------|
| 2 | `v1.9 … Path A copy of v1.8; lineage … → v1.8 → v1.9; C1-C16 inherited verbatim` | `v1.10 … Path A copy of v1.9; lineage … → v1.8 → v1.9 → v1.10; C1-C16 inherited verbatim` |
| 4 | `v1.9-audit-allowlist.json (v1.9 Path-A from v1.8 … per Phase 82 …)` | `v1.10-audit-allowlist.json (v1.10 Path-A from v1.9 … per Phase 88 …)` |
| 35 | `// Usage: node scripts/validation/v1.9-milestone-audit.mjs …` | `v1.10-milestone-audit.mjs` |
| 79 | `const raw = readFile('scripts/validation/v1.9-audit-allowlist.json');` | `v1.10-audit-allowlist.json` (FUNCTIONAL — load-bearing sidecar repoint) |

**DO NOT touch line 5 (`Frozen-predecessor … v1.6 … Phase 66`) or line 90 (`Apple Business v1.6 docs`) — these have NEVER been bumped in any prior hop and must not be bumped now (Path-A violation).** [VERIFIED: v1.9-milestone-audit.mjs read]

**DO NOT add a C17 or 16th check.** The checks array stays at exactly 15 entries (C1-C16, C8 absent). [VERIFIED: v1.9-milestone-audit.mjs line count 979, self-test 9/9]

### Atom 1 — v1.10-audit-allowlist.json Content-File Deltas

Copy `v1.9-audit-allowlist.json` and change ONLY:
- `"generated"` → 2026-06-2X v1.10 timestamp
- `"phase"` → `"88-harness-lineage-bump-terminal-re-audit-milestone-close"`
- Optionally update `quarterly_audit.next_review`

**CARRY FORWARD verbatim:** `c13_rotting_external` (all 4 entries: `ci_1`, `ci_2_vpp_location_token`, `ci_3`, `quarterly_audit`). Do NOT wipe content.

**v1.10 content-file additions that may require NEW allowlist entries** (the planner must check at execution time — these are the new files added by Phases 83–87):
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` (KRB, guide 10)
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` (GRAPH, guide 11)
- `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` (L2 #28)
- `docs/l2-runbooks/29-macos-graph-credential-investigation.md` (L2 #29)
- `docs/reference/macos-capability-matrix.md` (Kerberos rows added by Phase 85)
- Glossary entries added to `_glossary-macos.md`

**Whether new allowlist entries are actually needed** depends on whether those files contain SafetyNet/supervision keywords (very unlikely for macOS guides) or new broken-link entries. The harness pre-flight check (`node v1.10-milestone-audit.mjs --verbose` at HEAD before copying) will surface any failures. Current v1.9 harness passes 15/15 at HEAD including all Phase 83–87 content. [VERIFIED: node v1.9-milestone-audit.mjs --verbose → 15 passed, 0 failed, 0 skipped]

**Invariants to preserve:**
- `c13_broken_link_allowlist` count MUST remain 15 (C13 hard-asserts this). [VERIFIED: v1.9-audit-allowlist.json length = 15]
- `c16_missing_endpoint_exemptions` MUST remain `[]` (empty). [VERIFIED: v1.9-audit-allowlist.json]
- safetynet_exemptions = 4, supervision_exemptions = 20 (carry forward; only change if new files trigger C1/C2)

### Atom 1 — BASELINE_14 Comment in regenerate-supervision-pins.mjs

**Location:** Append after the BASELINE_13 region (lines 432-438; `const BASELINE_9` array begins at line 439).

**Pattern to mirror (verbatim with relabels):**
```
// BASELINE_14 refreshed 2026-06-XX (Phase 88 Plan 88-01): closes BASELINE_13 v1.9 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 88 SC#1); v1.10 line positions
// verified against HEAD {current HEAD short SHA before Atom 1 commit} ({description}).
// BASELINE_9 entries above remain unchanged -- Phase 88 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 88
// close and remain valid for the v1.10 corpus. Resolution path: BASELINE_15 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.9 -> BASELINE_13 -> v1.10 -> BASELINE_14).
```

**BASELINE_14 anchor SHA:** The current HEAD at the time Atom 1 is authored (the pre-Phase-88 HEAD — confirmed before committing Atom 1). This is a REAL PAST SHA, NOT a placeholder. The v1.9 precedent used `3007960` (Phase 81 close baseline + Phase 82 chain green). For v1.10, use the actual HEAD SHA present when Atom 1 is authored (currently `26d3c60` but will advance before execution; use the actual HEAD at task time). [VERIFIED: regenerate-supervision-pins.mjs lines 432-438 read directly]

**DO NOT touch the `const BASELINE_9` array** — comment-only addition. [VERIFIED]

---

### Atom 2 — Exact File Set (indivisible commit)

These files must land in ONE commit per HARN-02 / SC#2, then pushed to origin/master:

| File | Action | Source |
|------|--------|--------|
| `scripts/validation/check-phase-83.mjs` | CREATE — structural/self-referential, Phase 83 PRESENCE assertion | check-phase-82.mjs structural shape (lightweight, not apex) |
| `scripts/validation/check-phase-84.mjs` | CREATE — structural/self-referential, Phase 84 PRESENCE assertion | same |
| `scripts/validation/check-phase-85.mjs` | CREATE — structural/self-referential, Phase 85 PRESENCE assertion | same |
| `scripts/validation/check-phase-86.mjs` | CREATE — structural/self-referential, Phase 86 PRESENCE assertion | same |
| `scripts/validation/check-phase-87.mjs` | CREATE — structural/self-referential, Phase 87 PRESENCE assertion | same |
| `scripts/validation/check-phase-88.mjs` | CREATE — chain-apex; CHAIN_PHASES=[48..87]; HARNESS=v1.10-milestone-audit.mjs | check-phase-82.mjs (apex) |
| `.github/workflows/audit-harness-v1.10-integrity.yml` | CREATE — 7th coexistence CI workflow | audit-harness-v1.9-integrity.yml |

**NOTE:** `frozen-at-close.mjs` with the V19 entry ships in ATOM 1, NOT Atom 2. The ordering constraint is: V19 pin in frozen-at-close.mjs (Atom 1 commit) BEFORE any check-phase-83.mjs is authored. [VERIFIED: HARN-02 wording + CONTEXT.md CX-1]

**Commit message convention (v1.9 precedent):**
```
feat(88-02): v1.10 validators + CI surface — HARN-02/03 (atomic SC#1 Atom 2)
```

**Push requirement:** `git push origin master` immediately after the Atom 2 commit. This is the HARD ordering gate for Plan 88-03 Axis-2 dispatch — the workflow's check-phase-83..88 jobs FAIL with `cannot find module` if dispatched against a ref that lacks them. [VERIFIED: 82-03-PLAN.md]

### Atom 2 — check-phase-83..87.mjs (Structural/Self-Referential Validators)

These follow the LIGHTWEIGHT pattern (D-01): `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`, no chain fan-out, no frozen reads of v1.10 content.

Each validator carries EXACTLY TWO checks:
1. `V-NN-SELF` (dual-invariant): asserts `!CHAIN_PHASES.includes(NN)` AND `CHAIN_SKIP.size === 0`
2. `V-NN-PRESENCE` (phase presence): confirms the phase's primary deliverable file exists and is non-empty

**Structural shell to copy:** `check-phase-82.mjs` (lightweight shape = CRLF `readFile`, `LABEL_WIDTH=60`, `padLabel`, runner loop, `[id/checks.length]` prefix, `Result: N PASS, M FAIL, K SKIPPED`, `process.exit(failed>0?1:0)`).

**Phase → primary deliverable file mapping** (executor must verify at task time against phase SUMMARYs):

| Phase | Primary deliverable (to confirm at task time) |
|-------|-----------------------------------------------|
| 83 | `docs/admin-setup-macos/10-kerberos-sso-extension.md` |
| 84 | `docs/admin-setup-macos/11-graph-api-platform-credential.md` |
| 85 | `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` |
| 86 | `scripts/validation/check-phase-58.mjs` (chain-health fix; confirm against 86-SUMMARY) |
| 87 | `docs/index.md` (navigation hub; confirm against 87-SUMMARY) |

**Transposed-digit guard:** Each SELF check must embed the CORRECT phase number (e.g., check-phase-83.mjs asserts `!CHAIN_PHASES.includes(83)`). Copy-paste of the wrong NN is the most common error in this operation. [VERIFIED: CONTEXT.md code_context section]

**Frozen reads in structural validators (D-01/D-02):** These validators MAY use `readAtV19Close()` to read PREDECESSOR (v1.9-and-earlier) frozen surfaces for structural checks. They MUST NOT use `readAtV19Close()` or any frozen read to assert v1.10 content — that would couple content to the harness and re-create the exact defect D-01 was designed to prevent.

**Whether to add V-NN frozen reads at all:** The v1.9 precedent validators (check-phase-75..81) are LIGHTWEIGHT — no frozen reads at all, only SELF + PRESENCE. The structural-only D-01 decision confirms the same approach for check-phase-83..87. The "predecessor frozen surfaces read at V19" language in D-01 is a statement of capability, not a mandate; lightweight validators that only check file existence and SELF satisfy HARN-02.

### Atom 2 — check-phase-88.mjs (Chain-Apex)

The apex extends the chain to [48..87]. Template is check-phase-82.mjs (itself a Path-A from check-phase-74.mjs).

**Required edits from check-phase-82.mjs:**

| Constant | v1.9 value | v1.10 value |
|----------|-----------|-------------|
| Line 1 comment | `check-phase-82.mjs -- Phase 82 … v1.9` | `check-phase-88.mjs -- Phase 88 … v1.10` |
| `HARNESS` | `'scripts/validation/v1.9-milestone-audit.mjs'` | `'scripts/validation/v1.10-milestone-audit.mjs'` |
| `CHAIN_PHASES` | `[48,49,…,81]` (34 entries) | `[48,49,…,87]` (40 entries) — add 82,83,84,85,86,87 |
| `CHAIN_SKIP` | `new Set([])` | `new Set([])` — UNCHANGED, stays empty |
| AUDIT assertion | points to `82-VERIFICATION.md` / `Phase 82` | points to `88-VERIFICATION.md` / `Phase 88` (SKIP-PASS until Plan 88-04 lands) |
| AUDIT-HARNESS assertion wording | `v1.9-milestone-audit.mjs exits 0 (current-milestone harness)` | `v1.10-milestone-audit.mjs exits 0 (current-milestone harness)` |
| SELF dual-invariant | `!CHAIN_PHASES.includes(82)` AND `CHAIN_SKIP.size === 0` | `!CHAIN_PHASES.includes(88)` AND `CHAIN_SKIP.size === 0` |
| Runner banner | `check-phase-82 -- Phase 82 …` | `check-phase-88 -- Phase 88 …` |

**DO NOT add VPP-01a/b analogs** — v1.10 has no corpus rename; those assertions have no v1.10 equivalent (same as the v1.9 DIVERGENCE-2 drop).

**NESTED short-circuit** (`CHECK_PHASE_NESTED=1`) carries verbatim — prevents O(n²) recursive expansion.

**isPeer threshold:** Phases ≥ 67 use 600s subprocess timeout; phases < 67 use 300s. Phases 83-88 are all ≥ 67, so all use 600s. [VERIFIED: check-phase-82.mjs line 85]

**Expected apex check count:** 40 CHAIN + AUDIT + AUDIT-HARNESS + SELF = 43 checks (vs v1.9's 34 + 3 = 37).

**Expected warm-tree apex result after Atom 2:** 43 PASS / 0 FAIL / 0 SKIPPED (chain is currently 37 PASS / 0 FAIL / 0 SKIPPED; adding 83-88 validators that pass brings it to 43). [VERIFIED: node check-phase-82.mjs → 37 PASS / 0 FAIL / 0 SKIPPED at HEAD 26d3c60]

### Atom 2 — audit-harness-v1.10-integrity.yml (7th Coexistence Workflow)

Path-A from `audit-harness-v1.9-integrity.yml`. Required edits:

| Element | v1.9 value | v1.10 value |
|---------|-----------|-------------|
| `name:` | `Audit Harness v1.9 Integrity` | `Audit Harness v1.10 Integrity` |
| `on.pull_request.paths` v1.9 globs | `scripts/validation/v1.9-*`, `audit-harness-v1.9-integrity.yml`, `v1.9-MILESTONE-AUDIT.md`, `v1.9-DEFERRED-CLEANUP.md` | repoint all to `v1.10-*` equivalents |
| `parse` job | validates `v1.9-audit-allowlist.json` | validates `v1.10-audit-allowlist.json` |
| `path-match` job | checks `v1.9-audit-allowlist.json` ref in `v1.9-milestone-audit.mjs` | check `v1.10-audit-allowlist.json` ref in `v1.10-milestone-audit.mjs` |
| `harness-run` job | `node … v1.9-milestone-audit.mjs --verbose` | `v1.10-milestone-audit.mjs` |
| `linux-chain-ubuntu-latest` apex | `check-phase-82.mjs --verbose` | `check-phase-88.mjs --verbose` |
| Per-validator jobs | 8 jobs: `check-phase-75` through `check-phase-82` | 6 jobs: `check-phase-83` through `check-phase-88` |
| `rotting-external-quarterly` sidecar ref | `v1.9-audit-allowlist.json` | `v1.10-audit-allowlist.json` |

**Invariants to carry verbatim (FETCH-DEPTH-01 / LF-fidelity / D-A9 contracts):**
```yaml
linux-chain-ubuntu-latest:
  timeout-minutes: 30
  continue-on-error: false
  steps:
    - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
      run: git config --global core.autocrlf false
    - uses: actions/checkout@v4
      with: { fetch-depth: 0 }
```

**Both crons carry forward unchanged:**
```yaml
schedule:
  - cron: '0 8 * * 1'          # Weekly bitrot catch
  - cron: '0 8 1 1,4,7,10 *'   # Quarterly c13_rotting_external check
```

**6 per-validator jobs** (not 8 like v1.9): check-phase-83 through check-phase-88. Each `timeout-minutes: 15`, `continue-on-error: false`, `fetch-depth: 0`, node 20.

**`rotting-external-quarterly`:** Keep structurally as-is — this IS the negative control. Its schedule-gated SKIP on `workflow_dispatch` is the expected behavior. Repoint its `v1.9-audit-allowlist.json` ref only.

**Predecessors byte-unchanged:** The 6 predecessor workflows (`audit-harness-integrity.yml`, `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`) must not be touched. [VERIFIED: ls .github/workflows/audit-harness*.yml — confirmed all 6 exist]

---

## CX-2 — D-04 Mitigation: Exact Re-Audit Execution Protocol

### Context
WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 is WORSE at v1.10 depth: the apex is [48..87] (40-phase chain, +6 deeper than v1.9's [48..81]). The O(n²) cold-Node-subprocess cascade on Windows cold clones can produce spurious truncated FAILs at depth.

### Mitigation Protocol (MANDATORY, mirrors Phase 82 D-03)

**Authoritative apex count:** Take from WARM main tree + Linux GHA, NOT cold-clone.
**Fresh clone scope:** Non-apex validators only (fast standalone runs, each ~2 seconds).

### Axis 1 + Axis 3 — Single sub-agent dispatch (PowerShell recipe)

Spawn ONE fresh `gsd-executor` sub-agent (zero context-carryover — this single dispatch serves BOTH Axis 1 physical independence AND Axis 3 logical independence):

```powershell
# Generate 8-char random suffix [0-9a-z]
$rand = -join ((48..57)+(97..122) | Get-Random -Count 8 | ForEach-Object {[char]$_})
$auditPath = Join-Path $env:TEMP "v1.10-audit-$rand"
$mainHeadSha = (git -C "D:\claude\Autopilot" rev-parse HEAD).Trim()

# Clone (NOT a worktree — use_worktrees:false durable)
git clone --no-hardlinks "D:\claude\Autopilot" $auditPath

# Verify clone fidelity
$cloneHeadSha = (git -C $auditPath rev-parse HEAD).Trim()
if ($cloneHeadSha -ne $mainHeadSha) { throw "HEAD mismatch: $cloneHeadSha vs $mainHeadSha" }

Push-Location $auditPath

# Run the 6 NON-APEX cross-OS-applicable validators from the fresh clone
# (check-phase-83..87 standalone — fast, each exits in <5s)
foreach ($n in 83..87) {
  & node "scripts/validation/check-phase-$n.mjs" 2>&1
  Write-Host "check-phase-$n exit: $LASTEXITCODE"
}

# Also run v1.10-milestone-audit.mjs (harness) + --self-test from clone
& node scripts/validation/v1.10-milestone-audit.mjs --verbose 2>&1
& node scripts/validation/v1.10-milestone-audit.mjs --self-test 2>&1

Pop-Location

# Cleanup
Remove-Item -Recurse -Force $auditPath
$orphans = @(Get-ChildItem $env:TEMP -Filter "v1.10-audit-*" -Directory).Count
if ($orphans -ne 0) { throw "Orphan temp clones remaining: $orphans" }
```

**Apex (check-phase-88.mjs):** Take PASS/FAIL/SKIP from warm main-tree run:
```powershell
# On main tree (warm, not clone):
& node "D:\claude\Autopilot\scripts\validation\check-phase-88.mjs" --verbose 2>&1
```

### Cross-OS-applicable validator set (the 7 rows for the EXACT MATCH table)

| Row | Validator | Notes |
|-----|-----------|-------|
| 1 | `v1.10-milestone-audit.mjs` | Also run `--self-test`; fold into row 1 |
| 2 | `check-phase-82.mjs` | Prior-apex continuity (same as v1.9's row 2 = check-phase-74) |
| 3 | `check-phase-83.mjs` | Standalone from fresh clone (non-apex) |
| 4 | `check-phase-84.mjs` | Standalone from fresh clone (non-apex) |
| 5 | `check-phase-85.mjs` | Standalone from fresh clone (non-apex) |
| 6 | `check-phase-86.mjs` | Standalone from fresh clone (non-apex) |
| 7 | `check-phase-87.mjs` | Standalone from fresh clone (non-apex) |
| 8 | `check-phase-88.mjs` | APEX — use warm-tree × Linux GHA (D-04) |

Total: 8 rows in the EXACT MATCH table.

**Excluded surfaces (list in audit results with reasons):**
- `pin-helper-advisory` (CI-only advisory, `continue-on-error: true`)
- `rotting-external-quarterly` (cron-only SKIP = negative control on `workflow_dispatch`)
- `v1.10-milestone-audit.mjs --self-test` (folded into row 1)
- Inherited chain 48..82 (covered transitively by apex row 8)

### Axis 2 — Linux GHA dispatch

```bash
# After Atom 2 is pushed to origin/master:
gh workflow run audit-harness-v1.10-integrity.yml --ref master

# Poll for completion:
gh run list --workflow=audit-harness-v1.10-integrity.yml --limit 1
gh run view <RUN_ID>
```

**Expected GHA result:** All 6 `check-phase-83..88` jobs + `harness-run` + `linux-chain-ubuntu-latest` = success. `rotting-external-quarterly` SKIPS (negative control confirmed). `pin-helper-advisory` passes advisory.

**HARD ORDERING GATE:** Atom 2 MUST be pushed to `origin/master` before Axis 2 dispatch. The check-phase-83..88 jobs FAIL with `cannot find module` if dispatched against a ref that lacks them.

---

## Close-Gate Pattern (Plan 88-04)

### File Set for Close-Gate Commit (indivisible, 7 files)

| File | Action |
|------|--------|
| `.planning/milestones/v1.10-MILESTONE-AUDIT.md` | CREATE (Path-A from v1.9-MILESTONE-AUDIT.md) |
| `.planning/milestones/v1.10-DEFERRED-CLEANUP.md` | CREATE (Path-A from v1.9-DEFERRED-CLEANUP.md, with v1.10 delta) |
| `.planning/phases/88-.../88-VERIFICATION.md` | CREATE (close-gate verification format) |
| `.planning/PROJECT.md` | EDIT — flip v1.10 milestone status to closed |
| `.planning/ROADMAP.md` | EDIT — Phase 88 complete (4/4 plans); HARN-01/02/03 Validated |
| `.planning/STATE.md` | EDIT — milestone status + 17/17 Validated + Phase 88 complete |
| `.planning/REQUIREMENTS.md` | EDIT — HARN-01/02/03 Pending → Validated; coverage 17/17 |

**Commit message convention (v1.9 precedent):**
```
docs(88-04): Phase 88 close-gate — v1.10 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.10 MILESTONE CLOSE
```

**NO Commit A / NO SHA-substitution second commit** — same as v1.9 D-04. Use literal `{phase_88_close_SHA}` placeholder recoverable via:
```bash
git log --all --grep="88-04" --grep="close-gate" --all-match -1 --format=%H
```

### Traceability Flip: 17/17

| Flip | From | To |
|------|------|----|
| HARN-01 | Pending | Validated |
| HARN-02 | Pending | Validated |
| HARN-03 | Pending | Validated |
| KRB-01/02/03/04, GRAPH-01/02, NUAL-01, RUN-01/02, REF-01/02/03, CHAIN-01/02 | Complete | Validated |

Current status per REQUIREMENTS.md: 14 Complete (KRB/GRAPH/NUAL/RUN/REF/CHAIN), 3 Pending (HARN). All 17 flip to Validated at close-gate.

### v1.10-MILESTONE-AUDIT.md Structure (Path-A from v1.9)

Sections to adapt from `v1.9-MILESTONE-AUDIT.md`:
- Frontmatter: `milestone: v1.10`, `requirements: 17/17`, `phases: 6/6`, atom_1_sha, atom_2_sha, audit_results_sha, close_commit: `{phase_88_close_SHA}`, cross_os_exact_match: true
- `## v1.10 Phase Closure Narrative` (Phases 83-87 content + Phase 88 harness)
- `## Auditor-Independence Verification (3-axis stacking)` (methodology)
- `## Cross-OS PASS-Count EXACT MATCH` (import 8-row table from 88-03-AUDIT-RESULTS.md)
- `## Requirements Traceability — 3/3 HARN Closed`
- `## Cumulative v1.10 Requirements Traceability — 17/17 Total`
- `## Audit Harness Lineage` (phases 62→66→70→74→82→88, lineage v1.4→v1.10 — 8th entry)
- `## Milestone Close` with `/gsd-complete-milestone` hand-off

v1.10 is a CONTENT milestone (6 content/foundation phases 83-87 + harness close-gate 88), same shape as v1.9. Not a four-pillar milestone.

### v1.10-DEFERRED-CLEANUP.md Content

**Path-A from v1.9-DEFERRED-CLEANUP.md.** Key differences:

**ADD (D-06 scope):**
- `## MTPSSO-01`: Cross-tenant Platform Credential registration models
- `## MTPSSO-02`: Multi-tenant Conditional Access / compliance scoping for PSSO
- `## MTPSSO-03`: Multi-tenant PSSO L2 troubleshooting
- `## KRBFUT-01`: On-prem-AD-only Kerberos realm deep-dive
- `## KRBFUT-02`: Azure Files Cloud-Kerberos full coverage (promote from limited-preview)

**CARRY FORWARD from v1.9 (DO NOT DELETE per "do NOT mask via deletion" doctrine):**
- `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (still open; chain now deeper [48..87])
- `ARCHIVE-UPSTREAM-01`, `v1.1 line 164 token-class`, `HELPER-SPAWN-STDERR-01`, `FROZEN-AWARE-ADOPTION-SWEEP-01`, `EXEC-FAIL-DETAIL-EXTRACTION-01` (all carried v1.8 items preserved from v1.9 carry-forward)

**DO NOT CARRY (D-07 — explicitly prohibited):**
- `PRE-EXISTING-CHAIN-RED-AT-HEAD-01` — CLOSED by Phase 86 (chain [48..82] is 37 PASS / 0 FAIL / 0 SKIPPED on both Windows and Linux GHA). Do NOT list this as unresolved debt.

**DO NOT CARRY:**
- `PSSO-FUT-01..04` — these became v1.10 REQUIREMENTS (KRB/GRAPH/NUAL/RUN) and were executed. They are RESOLVED, not deferred. [VERIFIED: REQUIREMENTS.md — Complete status]

**Note on `docs/v1.9-DEFERRED-CLEANUP.md` cross-link:** The v1.9 deferred-cleanup cross-linked a pre-existing `docs/v1.9-DEFERRED-CLEANUP.md` (Phase 77 artifact). For v1.10, check whether a `docs/v1.10-DEFERRED-CLEANUP.md` exists (unlikely — this was a v1.9-specific artifact). If no pre-existing docs/ version exists, omit the cross-reference section.

---

## Predecessor Byte-Unchanged HARD Gate

### 17 Frozen Surfaces to Diff

These must be unchanged since the pre-Phase-88 anchor SHA (the executor captures the actual anchor from HEAD before any Atom 1 commit):

**5 workflow YAMLs:**
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml` (add to list — v1.10 closes after v1.9)

**6 milestone-audit MJS:**
7. `scripts/validation/v1.4-milestone-audit.mjs`
8. `scripts/validation/v1.4.1-milestone-audit.mjs`
9. `scripts/validation/v1.5-milestone-audit.mjs`
10. `scripts/validation/v1.6-milestone-audit.mjs`
11. `scripts/validation/v1.7-milestone-audit.mjs`
12. `scripts/validation/v1.8-milestone-audit.mjs`
13. `scripts/validation/v1.9-milestone-audit.mjs`

**6 sidecar JSON:**
14. `scripts/validation/v1.4-audit-allowlist.json`
15. `scripts/validation/v1.4.1-audit-allowlist.json`
16. `scripts/validation/v1.5-audit-allowlist.json`
17. `scripts/validation/v1.6-audit-allowlist.json`
18. `scripts/validation/v1.7-audit-allowlist.json`
19. `scripts/validation/v1.8-audit-allowlist.json`
20. `scripts/validation/v1.9-audit-allowlist.json`

**Note:** v1.10 extends the predecessor list by 2 (v1.9 workflow + v1.9 harness pair) vs v1.9's 17-surface list. Total is now 20 surfaces (not 17).

**Gate command (in Bash):**
```bash
git diff <pre-88-anchor-SHA> HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  '.github/workflows/audit-harness-v1.6-integrity.yml' \
  '.github/workflows/audit-harness-v1.7-integrity.yml' \
  '.github/workflows/audit-harness-v1.8-integrity.yml' \
  '.github/workflows/audit-harness-v1.9-integrity.yml' \
  'scripts/validation/v1.4-milestone-audit.mjs' \
  'scripts/validation/v1.4.1-milestone-audit.mjs' \
  'scripts/validation/v1.5-milestone-audit.mjs' \
  'scripts/validation/v1.6-milestone-audit.mjs' \
  'scripts/validation/v1.7-milestone-audit.mjs' \
  'scripts/validation/v1.8-milestone-audit.mjs' \
  'scripts/validation/v1.9-milestone-audit.mjs' \
  'scripts/validation/v1.4-audit-allowlist.json' \
  'scripts/validation/v1.4.1-audit-allowlist.json' \
  'scripts/validation/v1.5-audit-allowlist.json' \
  'scripts/validation/v1.6-audit-allowlist.json' \
  'scripts/validation/v1.7-audit-allowlist.json' \
  'scripts/validation/v1.8-audit-allowlist.json' \
  'scripts/validation/v1.9-audit-allowlist.json'
```

**EMPTY output == invariant holds.** If non-empty, STOP and identify the mutated surface before the close-gate commit.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Frozen SHA reads | Custom git invocations inline | `readAtClose()` / `readAtV19Close()` from `_lib/frozen-at-close.mjs` |
| CRLF normalization | Roll your own | `.replace(/\r\n/g, '\n')` pattern already in every validator's `readFile()` |
| Validator runner loop | New loop structure | Copy verbatim from check-phase-82.mjs (lines 147-173) |
| Close artifact structure | New template | Path-A from v1.9-MILESTONE-AUDIT.md + v1.9-DEFERRED-CLEANUP.md |
| Ordering gate verification | Trust assumptions | 3-part pre-flight gate: `git log origin/master --oneline -1`, `gh auth status`, `gh workflow list \| grep audit-harness-v1.10` |

---

## Common Pitfalls

### Pitfall 1: Wrong V19 SHA
**What goes wrong:** Pinning an Atom SHA (e760176 or e825fdb) instead of the close-gate SHA (b29dca5). Results in `readAtV19Close()` reading the wrong snapshot, potentially causing false-passes in structural validators.
**Why it happens:** The Atom SHAs appear prominently in the v1.9 MILESTONE-AUDIT.md frontmatter; it's easy to grab the wrong one.
**How to avoid:** V19 is VERIFIED in this research: `b29dca5`. Confirm with `git show b29dca5 --stat` — must show 7 files (MILESTONE-AUDIT + DEFERRED-CLEANUP + VERIFICATION + 4 planning docs).
**Warning signs:** The `readAtV19Close()` call fails or returns unexpected content.
**Historical precedent:** V17/V17_CLOSEGATE retro (Phase 73 RETRO-02) — wrong SHA required a supplement entry.

### Pitfall 2: Atom Splitting (HARN-01/HARN-02 violation)
**What goes wrong:** Committing any Atom 1 file without ALL Atom 1 files, or any Atom 2 file without ALL Atom 2 files.
**Why it happens:** Incremental work habits; committing as each file is completed.
**How to avoid:** Do NOT commit during task-level work. Stage ALL files from the atom and commit as one unit. Verify with `git show --stat HEAD` after the commit.

### Pitfall 3: Transposed Digits in check-phase-NN.mjs
**What goes wrong:** check-phase-84.mjs has `CHAIN_PHASES.includes(83)` in its SELF check (wrong number). Passes locally but the invariant is meaningless.
**Why it happens:** Copy-paste from the previous validator without updating the NN in the SELF check.
**How to avoid:** Verify `node -e "const c=require('fs').readFileSync('scripts/validation/check-phase-84.mjs','utf8'); console.log(c.match(/includes\((\d+)\)/)?.[1])"` matches the expected phase number.

### Pitfall 4: Content-Coupling in Validators (D-01 violation)
**What goes wrong:** A validator for check-phase-83 uses `readAtV19Close()` to assert v1.10 content is present/correct. This creates a bootstrap paradox (or chains validator correctness to content state that may legitimately change).
**Why it happens:** Over-eager validation; wanting to prove content was correctly authored.
**How to avoid:** Structural-only. PRESENCE checks confirm the file EXISTS and is non-empty. They do NOT assert line content, anchor text, or internal structure.

### Pitfall 5: Cold-Clone Apex on Windows (D-04 violation)
**What goes wrong:** Running `check-phase-88.mjs` from the fresh-clone path on Windows. The O(n²) subprocess cascade produces spurious truncated FAILs and breaks EXACT MATCH.
**Why it happens:** Mechanical application of "fresh clone = all validators" without the D-04 exemption.
**How to avoid:** Strictly: fresh clone runs check-phase-83..87 standalone ONLY. Apex (`check-phase-88`) runs ONLY on warm main tree and Linux GHA.

### Pitfall 6: Dispatching Axis 2 Before Atom 2 is on origin/master
**What goes wrong:** `check-phase-83.mjs` etc. don't exist on origin/master; the GHA jobs fail with `Cannot find module`.
**Why it happens:** Skipping the push step after the Atom 2 commit.
**How to avoid:** Verify with `git log origin/master --oneline -1` shows the Atom 2 commit BEFORE issuing `gh workflow run`.

### Pitfall 7: Carrying PRE-EXISTING-CHAIN-RED-AT-HEAD-01 (D-07 violation)
**What goes wrong:** v1.10-DEFERRED-CLEANUP.md lists PRE-EXISTING-CHAIN-RED-AT-HEAD-01 as unresolved debt. This is factually wrong — Phase 86 resolved it.
**Why it happens:** Mechanical carry-forward from v1.9-DEFERRED-CLEANUP.md without reading the close status.
**How to avoid:** The v1.9 deferred item states "DEFERRED to v1.10+. Does NOT block v1.9 close". Phase 86 was that v1.10 resolution. Verify: `node scripts/validation/check-phase-82.mjs 2>&1 | tail -1` → 37 PASS / 0 FAIL / 0 SKIPPED. Do NOT include this item in v1.10-DEFERRED-CLEANUP.md.

---

## Current State (pre-Phase-88)

| Item | Value | Source |
|------|-------|--------|
| Current HEAD SHA | `26d3c60f6a21574f8e986a5e81a0e3c72ed3752b` (short: `26d3c60`) | [VERIFIED: git rev-parse HEAD] |
| v1.9 harness at HEAD | 15 PASS / 0 FAIL / 0 SKIPPED | [VERIFIED: node v1.9-milestone-audit.mjs --verbose] |
| v1.9 harness self-test | 9/9 passed | [VERIFIED: node v1.9-milestone-audit.mjs --self-test] |
| check-phase-82 apex at HEAD | 37 PASS / 0 FAIL / 0 SKIPPED | [VERIFIED: task output] |
| check-phase-83..87 | None exist yet | [VERIFIED: ls scripts/validation/check-phase-8*.mjs] |
| v1.10-milestone-audit.mjs | Does not exist yet | [VERIFIED: ls scripts/validation/v1.10*] |
| audit-harness-v1.10-integrity.yml | Does not exist yet | [VERIFIED: ls .github/workflows/audit-harness*.yml] |
| V19 in frozen-at-close.mjs | NOT yet present (current top = V18) | [VERIFIED: frozen-at-close.mjs read] |
| BASELINE_13 in regenerate-supervision-pins.mjs | Present at lines 432-438 (BASELINE_14 not yet added) | [VERIFIED: file read] |
| PRE-EXISTING-CHAIN-RED-AT-HEAD-01 | RESOLVED by Phase 86 | [VERIFIED: check-phase-82 = 37 PASS / 0 FAIL] |
| WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 | Still open; chain is [48..87] at close (+6 deeper) | [VERIFIED: DEFERRED-CLEANUP + D-04] |

---

## 4-Plan Shape Summary (mirroring Phase 82)

| Plan | Name | Type | Key output |
|------|------|------|------------|
| 88-01 | Atom 1 | execute (autonomous) | 88-CONVENTIONS.md (Wave 1 commit) + 4-file Atom 1 indivisible commit |
| 88-02 | Atom 2 | execute (autonomous) | 7-file Atom 2 indivisible commit + push to origin/master |
| 88-03 | 3-axis Re-Audit | execute (checkpoint:human-verify gate) | 88-03-AUDIT-RESULTS.md artifact-only commit |
| 88-04 | Close-Gate | execute (autonomous) | 7-file close-gate commit = MILESTONE CLOSE |

**Commit count:** 4 commits (Wave 1 CONVENTIONS + Atom 1 + Atom 2 + Audit-Results + Close-Gate = 5 commits total).

---

## D-05 Confirmation — Close Boundary

Phase 88 ends at commit:
```
docs(88-04): Phase 88 close-gate — v1.10 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.10 MILESTONE CLOSE
```

Archival and jira are SEPARATE and happen AFTER the close-gate:
- `f66cf25` (chore: archive v1.9 phase directories) — v1.9 precedent
- `306a30a` (chore(jira): complete v1.9) — v1.9 precedent

These are NOT part of the 4 plans in Phase 88. [VERIFIED: git log --oneline | grep f66cf25|306a30a]

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Control |
|---------------|---------|---------|
| V2 Authentication | No | N/A — no auth surface |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | No | N/A — no user input; only file reads |
| V6 Cryptography | No | N/A — no crypto |

### Realistic Threat Model for this Phase

This is a local-docs/CI-harness phase with no runtime attack surface. The realistic threats are:

| Threat | STRIDE | Mitigation |
|--------|--------|------------|
| Wrong V19 SHA pin (reads wrong historical state) | Tampering | CX-1 pre-verified: b29dca5 confirmed via `git show --stat`; `readAtV19Close()` must return non-null for at least one known file |
| Validator silently passes when it should fail (Path-A copy weakens a check) | Tampering | Verify exactly 4 lines changed vs v1.9 (`git diff --no-index`); --self-test 9/9 + 15/15 PASS gate |
| CI workflow excessive permissions | Elevation of Privilege | Path-A copy inherits least-privilege defaults from v1.9 (no `permissions: write`, no secrets injected); `continue-on-error: false` on blocking jobs |
| Predecessor frozen surfaces silently mutated | Tampering | 20-surface HARD byte-unchanged diff gate must be EMPTY before close-gate commit |
| Apex apex cold-clone spurious FAIL distorts EXACT MATCH | Spoofing | D-04 MANDATORY: apex via warm-tree × Linux GHA only |
| Traceability flip without re-audit evidence | Repudiation | MILESTONE-AUDIT imports 88-03 EXACT MATCH table; close-gate gated on 88-03 artifact existing |

No HIGH-severity threats. This is tooling/docs-only; no auth, crypto, network, or user-input surface.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node ESM subprocess validators (custom, no test runner) |
| Config file | none |
| Quick run command | `node scripts/validation/v1.10-milestone-audit.mjs --verbose` |
| Full suite command | `node scripts/validation/check-phase-88.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HARN-01 | v1.10-milestone-audit.mjs runs 15/15 PASS, --self-test 9/9 | smoke | `node scripts/validation/v1.10-milestone-audit.mjs --verbose && node scripts/validation/v1.10-milestone-audit.mjs --self-test` | ❌ Wave 0 (Plan 88-01) |
| HARN-01 | v1.10-audit-allowlist.json c13 count = 15, c16 empty | unit | `node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.10-audit-allowlist.json','utf8'));if(j.c13_broken_link_allowlist.length!==15||j.c16_missing_endpoint_exemptions.length!==0)process.exit(1)"` | ❌ Wave 0 |
| HARN-01 | frozen-at-close.mjs exports readAtV19Close + V19='b29dca5' | unit | `node -e "import('./scripts/validation/_lib/frozen-at-close.mjs').then(m=>{if(typeof m.readAtV19Close!=='function'||m.MILESTONE_CLOSE_SHAS.V19!=='b29dca5')process.exit(1);console.log('OK')})"` | ❌ Wave 0 (Plan 88-01) |
| HARN-02 | check-phase-83..88 all exit 0 standalone | smoke | `for n in 83 84 85 86 87 88; do node scripts/validation/check-phase-$n.mjs || exit 1; done` | ❌ Wave 0 (Plan 88-02) |
| HARN-02 | check-phase-88 apex: CHAIN=[48..87], CHAIN_SKIP empty | unit | `node -e "const c=require('fs').readFileSync('scripts/validation/check-phase-88.mjs','utf8');if(!c.includes('87')||/CHAIN_SKIP\s*=\s*new Set\(\[[^\]]+\]\)/.test(c))process.exit(1)"` | ❌ Wave 0 |
| HARN-02 | Predecessor workflows byte-unchanged | integration | See 20-surface diff gate command above | existing files |
| HARN-03 | Cross-OS EXACT MATCH | integration/manual | 3-axis re-audit per D-03/D-04 | ❌ Plan 88-03 |
| HARN-03 | 17/17 requirements Validated | integration | `node -e "const r=require('fs').readFileSync('.planning/REQUIREMENTS.md','utf8');['HARN-01','HARN-02','HARN-03'].forEach(id=>{if(!new RegExp(id+'[^\\n]*Validated').test(r))process.exit(1)})"` | ❌ Plan 88-04 |

### Wave 0 Gaps
- All validators listed above are new files (Wave 0 = Plan 88-01 + 88-02)
- No external test framework installation needed

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validators | ✓ | (pre-installed) | — |
| git | frozen-at-close reads, SHA verification | ✓ | (pre-installed) | — |
| gh CLI | Axis 2 GHA dispatch | ✓ (Schweinehund) | (pre-installed) | Manual GHA trigger |

**Missing dependencies with no fallback:** None — all tools verified present.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The 4-line edit set (lines 2, 4, 35, 79) still applies to v1.10-milestone-audit.mjs; v1.9 harness is 979 lines | Atom 1 path-A edit set | Executor should verify `wc -l v1.9-milestone-audit.mjs` before copying; if line count differs, re-check the load-bearing lines | [ASSUMED from 82-01-PLAN.md — not re-verified by wc -l in this session] |
| A2 | v1.10 content additions (guides 10/11, L2 28/29) do not introduce new C1/C2/C13 violations requiring new allowlist entries | Allowlist delta | If violations exist, the pre-flight `v1.9-milestone-audit.mjs --verbose` run would have already surfaced them (15/15 PASS confirmed at HEAD) — risk is LOW |
| A3 | Phase 86 + 87 primary deliverable file paths match those listed in the Phase→deliverable table | Atom 2 PRESENCE checks | Executor must read 86-SUMMARY and 87-SUMMARY to confirm exact file paths before authoring check-phase-86.mjs and check-phase-87.mjs |
| A4 | No `docs/v1.10-DEFERRED-CLEANUP.md` pre-exists (so no cross-link needed in v1.10-DEFERRED-CLEANUP.md) | Close-gate | [ASSUMED — not checked; executor should verify `ls docs/v1.10*` before authoring] |

---

## Open Questions

1. **Exact primary deliverable file for Phase 86**
   - What we know: Phase 86 was a chain-health pass (CHAIN-01/CHAIN-02); it modified `check-phase-{58,59,60,61,62,63,64,65,66,73}.mjs` and restored `73-RETRO-INVENTORY.md`.
   - What's unclear: Which single file should `V-86-PRESENCE` assert? `check-phase-58.mjs`? `73-RETRO-INVENTORY.md`?
   - Recommendation: Read `86-SUMMARY.md` at execution time to confirm the headline deliverable; `73-RETRO-INVENTORY.md` is likely the best structural marker.

2. **v1.9-audit-allowlist.json c13_broken_link_allowlist after Phase 83–87 additions**
   - What we know: v1.9 harness passes 15/15 at current HEAD including all Phase 83–87 docs.
   - What's unclear: Whether the v1.10 harness copy will introduce any c13/c16 violations for the new macOS files.
   - Recommendation: Run `node v1.10-milestone-audit.mjs --verbose` immediately after the Path-A copy (pre-commit). If any check fails, add allowlist entries before the Atom 1 commit.

3. **Whether a CONVENTIONS.md is needed for Phase 88**
   - What we know: Phase 82 authored `82-CONVENTIONS.md` as a Wave-1 commit before Atom 1.
   - What's unclear: Whether a similar phase-wide constants document adds value for Phase 88, or whether the locked values are simple enough to carry in the PLAN.md directly.
   - Recommendation: Mirror v1.9 — author `88-CONVENTIONS.md` as a Wave-1 commit locking the key constants (V19 SHA, BASELINE_14 anchor SHA, the 8-validator set, the 20 frozen surfaces). This is the explicit structural precedent.

---

## Sources

### Primary (HIGH confidence)
- `scripts/validation/_lib/frozen-at-close.mjs` — read directly; V19 not yet present, V18 at line 26, readAtV18Close at line 58 [VERIFIED]
- `git show b29dca5 --stat` — V19 SHA confirmed as close-gate, 7-file diff [VERIFIED]
- `git log --all --oneline | grep 82-04|close-gate` — b29dca5 confirmed as the v1.9 close-gate commit [VERIFIED]
- `node scripts/validation/v1.9-milestone-audit.mjs --verbose` → 15/15 PASS at HEAD [VERIFIED]
- `node scripts/validation/v1.9-milestone-audit.mjs --self-test` → 9/9 [VERIFIED]
- `node scripts/validation/check-phase-82.mjs` → 37 PASS / 0 FAIL / 0 SKIPPED at HEAD [VERIFIED]
- `scripts/validation/regenerate-supervision-pins.mjs` lines 432-439 — BASELINE_13 at lines 432-438, BASELINE_9 array at 439 [VERIFIED]
- `.planning/milestones/v1.9-phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-01-PLAN.md` through `82-04-PLAN.md` — structural template [VERIFIED: read]
- `.planning/milestones/v1.9-MILESTONE-AUDIT.md` — frontmatter + section structure [VERIFIED: read]
- `.planning/milestones/v1.9-DEFERRED-CLEANUP.md` — deferred items, incl. PRE-EXISTING-CHAIN-RED-AT-HEAD-01 status [VERIFIED: read]
- `.github/workflows/audit-harness-v1.9-integrity.yml` — workflow structure [VERIFIED: read]
- `node -e` allowlist count checks → c13_broken_link_allowlist = 15, c16 = 0 [VERIFIED]

### Secondary (MEDIUM confidence)
- `.planning/phases/88-harness-lineage-bump-terminal-re-audit-milestone-close/88-CONTEXT.md` — all decisions and CX-1/CX-2 [read]
- `.planning/REQUIREMENTS.md` — 17 requirements, 14 Complete / 3 Pending [read]
- `.planning/STATE.md` — current position and dependency summary [read]

### Tertiary (LOW confidence / ASSUMED)
- Line numbers for load-bearing edits in v1.9-milestone-audit.mjs (lines 2, 4, 35, 79) — extracted from 82-01-PLAN.md documentation, not re-verified against actual file line numbers in this session [A1]
- Primary deliverable file paths for phases 83-87 PRESENCE checks — constructed from REQUIREMENTS.md, must be confirmed at execution time against phase SUMMARYs [A3]

---

## Metadata

**Confidence breakdown:**
- V19 SHA + close-gate identity: HIGH — git log verified
- Atom 1 mechanics (4-line edit set, allowlist carry): HIGH — 82-01-PLAN.md + file reads
- Atom 2 mechanics (validators, CI workflow): HIGH — 82-02-PLAN.md + file reads
- Re-audit D-04 mitigation: HIGH — 82-03-PLAN.md + CONTEXT.md D-04
- Close-gate (file set, traceability flip, deferred scope): HIGH — 82-04-PLAN.md + REQUIREMENTS.md + CONTEXT.md D-05/D-06/D-07
- Allowlist content-file deltas: MEDIUM — v1.9 harness passes at HEAD but executor must pre-flight check after copy

**Research date:** 2026-06-24
**Valid until:** 2026-07-24 (stable mechanics; no external dependencies to go stale)
