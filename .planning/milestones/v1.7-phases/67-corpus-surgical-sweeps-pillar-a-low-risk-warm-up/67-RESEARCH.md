# Phase 67: Corpus Surgical Sweeps (Pillar A — Low-Risk Warm-Up) - Research

**Researched:** 2026-05-26
**Domain:** Corpus surgical edits + tool-pinned URL verification + sidecar annotation (in-repo docs maintenance + validator chain re-runs; NO new code, NO new libraries)
**Confidence:** HIGH (all execution mechanisms verified against in-repo precedents at HEAD; only the dynamic markdown-link-check stdout shape is MEDIUM-confidence until Plan 67-01 Wave 1 captures it)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 — Version History handling (score A=6 / B=5 / C=7 / **D=3**):** Each Phase 67 actually-edited file gets ONE new row appended to its existing tail-table (the unheaded `| Date | Change | Author |` table after the `---` separator — the MAJORITY-by-count corpus convention with ~81 files in this state). `last_verified:` frontmatter bumped to 2026-05-26 on each edited file. `_glossary-macos.md` gains one coordinating row per requirement actually-executed in its existing `## Version History` H2 table at line 121. **No new `## Version History` H2 is promoted in admin-setup-* files.** PITFALL-6 anchor inventory scope: ONLY `_glossary-macos.md`. Document inventory artifact as `67-ANCHOR-INVENTORY.md` per Phase 65 / Phase 66 precedent.

**D-02 — SWEEP-01 URL verification mechanism (score **B=2** / C=3 / A=5 / E=6 / D=9):** Run `markdown-link-check@3.14.2` (pinned identically to `.github/workflows/audit-harness-v1.6-integrity.yml:167` `rotting-external-quarterly` job) locally against the 4 entries in `c13_rotting_external.ci_1_abm_urls` at Plan 67-01 Wave 1. Capture stdout + status codes into `67-VERIFICATION.md` as the primary evidence artifact. Advisor's `curl -I https://business.apple.com` corroborating evidence (2026-05-26 14:29:40 UTC, `HTTP/1.1 200 OK`, `Server: Apple`, no redirect, no rebrand-banner header) lands in `67-VERIFICATION.md` as SECONDARY artifact. Sidecar update mode: per-entry `"last_revalidated": "2026-05-26"` to each of the 4 `ci_1_abm_urls` entries.

**D-03 — SWEEP-02 rename form (score **Opt2=18** / Opt4=20 / Opt1=23 / Opt3=24):** Full compound `"content token (formerly VPP location token; still labeled \"Apple VPP token\" in Intune)"` on first prose mention per H2 (not per H3). Short form `"content token"` in table cells. New `> **Note:**` callout block inserted above each `## Renewal / Maintenance` table (one per doc) per Phase 64 `11-vpp-catalog-runbook.md:35-39` exact precedent. CONTEXT.md D-03 carries 6 concrete before/after rewrites in the rewrite table — execute verbatim, do NOT renegotiate text.

**D-04 — Commit topology (score **E=7** / C=8 / A=13 / D=15 / B=20):** 3 plans, 3-4 commits. Plan 67-01 = SWEEP-01 (branchable: Branch A zero-edits OR Branch B surgical update). Plan 67-02 = SWEEP-02 (atomic 6 renames + 2 callout inserts + 2 tail-table rows + sidecar annotation). Plan 67-03 = close-gate (chain validator re-runs + 67-VERIFICATION.md + traceability flips). Sidecar mode: ANNOTATE-not-remove for both `ci_1_abm_urls` (`last_revalidated:"2026-05-26"`) and `ci_2_vpp_location_token` (`resolved_2026_05_26:true`).

### Claude's Discretion

- Markdown-link-check invocation form (per-URL probe vs single domain probe — the 4 refs are all the same domain landing `https://business.apple.com`; planner may probe once for efficiency, log all 4 entries in 67-VERIFICATION.md for traceability).
- Exact phrasing of the tail-table Version History row text for Branch A vs Branch B (template provided in D-03 table; planner may shorten provided date + phase + "SWEEP-NN" + closure marker preserved).
- Whether to land Plan 67-01 Branch A sidecar annotation as a single PowerShell `jq`-equivalent edit or as a structured file write (low-risk diff either way).
- Whether `67-ANCHOR-INVENTORY.md` Wave 6 post-edit diff lives inline in the same artifact or as a separate `67-ANCHOR-INVENTORY-POST.md` file (precedent split per Phase 65).

### Deferred Ideas (OUT OF SCOPE for Phase 67)

- **CHAIN_SKIP {48, 51, 58, 60, 61} root-cause resolution** — Phase 68 Pillar B (CHAIN-01/02/03).
- **CI-Linux ubuntu-latest runner job** — Phase 69 Pillar C (CILINUX-01).
- **v1.7 audit harness lineage bump** (`v1.7-milestone-audit.mjs` / `v1.7-audit-allowlist.json` / `check-phase-67..70.mjs` / `audit-harness-v1.7-integrity.yml`) — Phase 70 Pillar D (HARNESS-01..06).
- **CI-3 Managed Apple ID corpus-wide rename** (45 occurrences / 16 files) — DEFERRED to v1.8+ pending Intune portal rebrand adoption per REQUIREMENTS.md:65.
- **Other corpus VPP-location-token sites outside SWEEP-02 calibration** (3 sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` — lines 115/149/155; see Open Question #1 below). Phase 67 calibration is locked at 6 occurrences / 2 files; expanding scope mid-phase violates the calibrated-enumeration contract.
- **Corpus-wide tail-table → `## Version History` H2 convention convergence** (v1.8+ stylistic alignment; out of scope for Pillar A "Low-Risk Warm-Up").
- **Per-entry sidecar schema formalization** (the v1.7 sidecar reset at Phase 70 HARNESS-02 will carry annotations forward; schema formalization is v1.8+).
- Multi-tenant Apple Business surfaces / Apple Business Device API documentation / per-OU CRD deep-dive / Account Holder standalone runbook / Apple School Manager (ASM) — all carried in `v1.7-DEFERRED-CLEANUP.md` (authored at Phase 70 HARNESS-06).

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (from REQUIREMENTS.md:10-14) | Research Support |
|----|------------------------------------------|------------------|
| **SWEEP-01** | 4 `business.apple.com` URL refs (CI-1 calibrated enumeration at HEAD `ad5c9c9`) are verified against live Apple URL state. Either confirmed-current (no edits required; quarterly cron continues monitoring) OR surgically updated if Apple has issued redirects/sunsets. Each of the 4 files (`admin-setup-ios/05-app-deployment.md:92`, `admin-setup-macos/01-abm-configuration.md:52`, `admin-setup-macos/04-app-deployment.md:105`, `_glossary-macos.md:64`) carries a Version History row if edited; sidecar `c13_rotting_external.ci_1_abm_urls` updated. | Sections §SWEEP-01 Execution Mechanics + §markdown-link-check@3.14.2 Invocation + §Sidecar JSON Edit Mechanism + §Chain Validator Re-run + §Code Examples #1-3. |
| **SWEEP-02** | 6 "VPP location token" / "VPP (Apps and Books) location token" occurrences across 2 files (`admin-setup-ios/05-app-deployment.md:71,201` + `admin-setup-macos/04-app-deployment.md:45,46,113,148`) surgically renamed to canonical "content token" form per PITFALLS:657 first-mention-per-H2 convention; Version History row per file; sidecar `c13_rotting_external.ci_2_vpp_location_token` updated; harness C11/C15 re-run shows no false positives. | Sections §SWEEP-02 Execution Mechanics + §OP-10 Callout Precedent + §PITFALL-6 Anchor Inventory Mechanism + §Harness Inertia Verification + §Code Examples #4-6. |

</phase_requirements>

## Summary

Phase 67 is a **documentation-only surgical-edit phase** — NO new code, NO new libraries, NO architectural decisions to make. Every gray area was resolved in 67-CONTEXT.md (D-01..D-04) via parallel adversarial-review and is LOCKED. The research task is to surface the exact **execution mechanics** for each locked decision: how to invoke `markdown-link-check@3.14.2` on Windows, how to edit the sidecar JSON additively, how to capture the PITFALL-6 anchor inventory, how to run the validator chain and capture exit codes, and how to format the resulting `67-VERIFICATION.md` artifact.

The phase has three plans (per D-04): **67-01** (SWEEP-01, branchable; Branch A "zero corpus edits" expected) → **67-02** (SWEEP-02, atomic 6 renames + 2 callout inserts + sidecar annotation) → **67-03** (close-gate: chain re-run + verification artifact + traceability flips). The two requirements are logically independent — clean revert per requirement is the desired property (D-04 rejected the atomic-across-requirements Option B score 20 in favor of per-plan score 7).

**Primary recommendation:** Treat 67-CONTEXT.md as the script. Plan-phase produces three PLAN.md files that mechanically translate D-01..D-04 into atomic tasks. The single dynamic step is Plan 67-01 Wave 1 (markdown-link-check probe); everything downstream is deterministic.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| URL liveness probe | Local dev environment (Node 24 + npm 11 + `markdown-link-check@3.14.2`) | Quarterly CI cron at `audit-harness-v1.6-integrity.yml:160-188` | Local re-runs the same pinned tool the cron uses — IS-equivalent evidence per D-02 rationale; cron is the long-term passive monitor. |
| Markdown corpus edits | `docs/admin-setup-ios/` + `docs/admin-setup-macos/` + `docs/_glossary-macos.md` (FS layer) | None | Surgical line edits; no service/runtime tier involved. |
| Sidecar state mutation | `scripts/validation/v1.6-audit-allowlist.json` (JSON file, additive fields per D-04 ANNOTATE-not-remove) | `check-phase-66.mjs:85-112` V-66-02 shape-only validator | Validator enforces shape only; per-entry annotations are free-text. |
| Anchor-shift safety check | Static `_glossary-macos.md` H2/H3 enumeration → `67-ANCHOR-INVENTORY.md` (Markdown artifact, Phase 65 precedent) | PITFALL-6 anti-regression invariant (STATE.md:126) | One file in PITFALL-6 scope; admin-setup-* explicitly out per D-01. |
| Chain regression detection | `scripts/validation/check-phase-{48..66}.mjs` subprocess chain (Node, Windows host) | `v1.6-milestone-audit.mjs` (15/15 PASS expected) | Re-run; expect identical status to v1.6 close (PASS modulo CHAIN_SKIP {48,51,58,60,61}). |
| Verification artifact | `.planning/phases/67-.../67-VERIFICATION.md` | PROJECT.md / ROADMAP.md / STATE.md traceability flips at Plan 67-03 close | Self-contained close-gate report; consumed by Phase 68 entry-phase reading. |

## Project Constraints (from CLAUDE.md)

The repo-level `CLAUDE.md` describes a **Windows Autopilot diagnostics suite** (PowerShell + Python + TypeScript) — this is **the wrong subsystem for Phase 67**. Phase 67 operates exclusively on the **docs corpus + validator harness layer** under `docs/` + `scripts/validation/` + `.planning/`. The CLAUDE.md directives most relevant to Phase 67:

| Directive | Phase 67 Application |
|-----------|----------------------|
| "Never commit `.env` file or any credentials" | No credentials touched in Phase 67. |
| "PowerShell: Use `try-catch` with `-ErrorAction SilentlyContinue` for non-critical operations" | Plan 67-01 PowerShell wrapper (npm install + node invocation) should propagate errors — markdown-link-check failure is a Branch B trigger, NOT a silent skip. |
| "Test thoroughly in isolated environment before production use" | Phase 67 already executes sequential-on-main-tree per `.planning/config.json:7` `use_worktrees:false` + memory `project_execphase_sequential.md`. No worktree experiments. |

No CLAUDE.md directive conflicts with any locked decision in 67-CONTEXT.md. [VERIFIED: `D:\claude\Autopilot\CLAUDE.md` read at session start]

## Standard Stack

Phase 67 introduces NO new libraries. Reused tools, all pre-existing:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `markdown-link-check` | `3.14.2` (PINNED — must match cron) | URL liveness probe (SWEEP-01) | Cron at `audit-harness-v1.6-integrity.yml:167` already uses this exact pin; local re-run = IS-equivalent evidence per D-02. [VERIFIED: `npm view markdown-link-check version` returned `3.14.2` on 2026-05-26 — the registry-current version matches the corpus-pinned version; `npm view markdown-link-check@3.14.2 scripts.postinstall` returned empty (no postinstall script); homepage `https://github.com/tcort/markdown-link-check#readme` is the canonical upstream] |
| Node.js | `v24.15.0` | Runtime for validators + markdown-link-check | Already installed (`where node` → `C:\Program Files\nodejs\node.exe`). [VERIFIED: session shell `node --version` returned `v24.15.0`] |
| npm | `11.12.1` | Package installer (one-shot `--no-save` install for `markdown-link-check`) | Already installed. [VERIFIED: session shell `npm --version` returned `11.12.1`] |
| PowerShell | session default | Outer shell for sequencing validator subprocesses + capturing exit codes | Windows-native; sequential-on-main-tree per `use_worktrees:false`. [VERIFIED: env block declares `Shell: PowerShell`] |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| `curl -I` (Windows native or Git Bash) | Secondary HEAD probe (corroborating evidence per D-02) | Plan 67-01 Wave 1 alongside markdown-link-check — capture as secondary artifact in 67-VERIFICATION.md SWEEP-01 H2 subsection. |
| `git log --oneline` | Per-requirement SHA capture for PROJECT.md traceability flips | Plan 67-03 Wave 4 — find Plan 67-01 + 67-02 commit SHAs for Active→Validated flip. |

### Alternatives Considered
| Instead of `markdown-link-check@3.14.2` local | Could Use | Tradeoff |
|------------|-----------|----------|
| Option A: Manual browser visit | Faster but not replayable — no machine-parseable artifact (D-02 rejected, score 5). |
| Option C: `curl -I` standalone | Light but diverges from cron's GET-based tool (D-02 rejected as primary, kept as secondary, score 3). |
| Option D: Manually trigger 2026-07-01 cron | **Architecturally blocked** — `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'` at workflow `:160` rejects `workflow_dispatch`; modifying the workflow is prohibited by REQUIREMENTS.md:64 (D-02 rejected, score 9). |
| Option E: Trust Phase 66 calibration | Leaves Phase 67 with no fresh evidence at close-gate (D-02 rejected, score 6). |

**Installation (one-shot, in Plan 67-01 Wave 1):**

```powershell
# Install pinned tool without polluting package.json
npm install --no-save markdown-link-check@3.14.2
```

**Version verification (Plan 67-01 Wave 1 — MUST verify pin BEFORE invoking):**

```powershell
npm view markdown-link-check@3.14.2 version  # Expect: 3.14.2 (publish date confirms registry currency)
```

[VERIFIED: `npm view markdown-link-check version` already returned `3.14.2` on 2026-05-26 — no version drift from the cron pin. Tool author: `tcort` (Thomas Cort), GitHub `tcort/markdown-link-check`, MIT licence per upstream README.]

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `markdown-link-check@3.14.2` | npm | >8 yrs on registry; v3.14.2 specifically pinned by cron at Phase 66 commit `3a9a671` (2026-05-25) | Widely used in CI link-check pipelines | `https://github.com/tcort/markdown-link-check` | not run (slopcheck unavailable in this session; package was pre-vetted at Phase 66 wave 3 via cron pinning) | **APPROVED — already pinned in production cron at `.github/workflows/audit-harness-v1.6-integrity.yml:167` since 2026-05-25; reuse here is IS-equivalent.** |

**Packages removed due to slopcheck [SLOP] verdict:** none.
**Packages flagged as suspicious [SUS]:** none.

[VERIFIED: `npm view markdown-link-check@3.14.2 scripts.postinstall` returned empty — no postinstall script, no postinstall network call risk. The Phase 66 cron has been running this exact pin against a public Apple URL; no incidents.]

No new packages are introduced by Phase 67 beyond the already-cron-pinned `markdown-link-check@3.14.2`. The Phase 70 HARNESS-02 sidecar lineage bump is OUT OF SCOPE for Phase 67.

## Architecture Patterns

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Plan 67-01 (SWEEP-01) — Branchable                                       │
│                                                                          │
│   Wave 1: npm install --no-save markdown-link-check@3.14.2               │
│           ↓                                                              │
│           node -e "require('markdown-link-check')(...)" × 4 URLs         │
│           ↓                                                              │
│           ┌──────────────────────────┬──────────────────────────┐        │
│           │  Branch A (URLs alive)   │  Branch B (URLs shifted) │        │
│           │  - Sidecar annotate only │  - Surgical line edits   │        │
│           │  - last_revalidated only │  - Tail-table rows       │        │
│           │  - NO corpus edits       │  - last_verified bump    │        │
│           │                          │  - Sidecar update        │        │
│           └─────────────┬────────────┴─────────────┬────────────┘        │
│                         ↓                          ↓                     │
│                    COMMIT 67-01-A              COMMIT 67-01-B            │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼─────────────────────────────────────┐
│ Plan 67-02 (SWEEP-02) — Atomic                                           │
│                                                                          │
│   Wave 1: PITFALL-6 anchor inventory pre-snapshot                        │
│           grep -n "^#" docs/_glossary-macos.md → 67-ANCHOR-INVENTORY.md  │
│           ↓                                                              │
│   Wave 2: Execute 6 line rewrites per D-03 table verbatim                │
│           + 2 callout block inserts (one per doc) above ## Renewal       │
│           ↓                                                              │
│   Wave 3: Append 2 tail-table Version History rows + bump last_verified  │
│           ↓                                                              │
│   Wave 4: Append coordinating row to _glossary-macos.md ## Version       │
│           History H2 table at line 121+                                  │
│           ↓                                                              │
│   Wave 5: Sidecar annotate ci_2_vpp_location_token entries (6)           │
│           with "resolved_2026_05_26": true                               │
│           ↓                                                              │
│   Wave 6: PITFALL-6 anchor inventory post-snapshot → diff vs Wave 1      │
│           (assert zero shift ≥ line 121 in _glossary-macos.md)           │
│           ↓                                                              │
│   Pre-commit dry-run (MANDATORY before git add):                         │
│     v1.6-milestone-audit.mjs && check-phase-62.mjs && check-phase-66.mjs │
│           ↓                                                              │
│           COMMIT 67-02                                                   │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼─────────────────────────────────────┐
│ Plan 67-03 (close-gate)                                                  │
│                                                                          │
│   Wave 1: Full chain check-phase-{48..66}.mjs (expect PASS modulo        │
│           CHAIN_SKIP {48,51,58,60,61} — same as v1.6 close)              │
│           ↓                                                              │
│   Wave 2: v1.6-milestone-audit.mjs (expect 15/15 PASS)                   │
│           ↓                                                              │
│   Wave 3: Author 67-VERIFICATION.md (markdown-link-check primary +       │
│           curl HEAD secondary + SC#1-4 checklist + validator exit codes) │
│           ↓                                                              │
│   Wave 4: Traceability — PROJECT.md SWEEP-01 + SWEEP-02                  │
│           Active→Validated flips with closing commit SHAs                │
│           ↓                                                              │
│           COMMIT 67-03                                                   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Recommended Plan-File Structure
```
.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/
├── 67-CONTEXT.md                       # (exists)
├── 67-DISCUSSION-LOG.md                # (exists)
├── 67-RESEARCH.md                      # this artifact
├── 67-01-PLAN.md                       # SWEEP-01 (branchable)
├── 67-02-PLAN.md                       # SWEEP-02 (atomic)
├── 67-03-PLAN.md                       # close-gate
├── 67-ANCHOR-INVENTORY.md              # Wave 1 of 67-02 (pre-edit snapshot)
├── 67-ANCHOR-INVENTORY-POST.md         # Wave 6 of 67-02 (post-edit diff; optional per Discretion)
└── 67-VERIFICATION.md                  # Wave 3 of 67-03 (close-gate artifact)
```

### Pattern 1: Branchable Plan (Plan 67-01)
**What:** Plan whose Wave 2 forks into Branch A (zero corpus edits) or Branch B (surgical edits) depending on the outcome of Wave 1 verification.
**When to use:** Verification-driven phases where the verification result determines whether downstream edits are required. New pattern formalized by Phase 67 for v1.7+ rotting-reference verification.
**Example structure:**
```markdown
## Wave 1 — Verification
Task 67-01-01: Install pinned tool + run probe + capture stdout into draft 67-VERIFICATION.md

## Wave 2 — Decision Point
If all 4 URLs returned `status: 'alive'` → Branch A
Else → Branch B

### Branch A (expected — URLs unchanged)
Task 67-01-02A: Edit sidecar — add per-entry `"last_revalidated": "2026-05-26"` to all 4 ci_1_abm_urls entries
Task 67-01-03A: Pre-commit dry-run (3 validators) → commit message variant A

### Branch B (URLs shifted — surgical update required)
Task 67-01-02B: Surgical update of affected lines on affected files
Task 67-01-03B: Append tail-table rows + bump last_verified on affected files
Task 67-01-04B: Append coordinating row to _glossary-macos.md ## Version History H2
Task 67-01-05B: Sidecar update affected entries
Task 67-01-06B: Pre-commit dry-run → commit message variant B
```

### Pattern 2: Atomic-Within-Plan (Plan 67-02)
**What:** All edits for a single requirement land in one commit; pre-commit dry-run enforces validator green before `git add`.
**When to use:** Tight surgical edits whose revert blast radius must equal exactly one requirement.
**Precedent:** v1.6 Phase 66-02 atomic harness commit `3a9a671` (3 files indivisibly: harness + sidecar + pin-helper).
**Example:** Plan 67-02 lands 2 corpus files + 1 sidecar + 1 glossary in a single commit; `git revert <SHA>` cleanly restores pre-SWEEP-02 corpus state.

### Pattern 3: ANNOTATE-not-Remove Sidecar Mode (Plan 67-01 + 67-02)
**What:** Add new fields to existing sidecar entries rather than removing entries. Preserves array shape so downstream validators that may grow entry-count assertions are unaffected.
**When to use:** Sidecar entries that represent historical state (CI-1 calibrated URL set, CI-2 calibrated rename sites) and will be reset cleanly at the next milestone (Phase 70 HARNESS-02 forks `v1.7-audit-allowlist.json` with `c13_rotting_external` reset to post-sweep state).
**Schema additions (Phase 67):**
- `ci_1_abm_urls[*].last_revalidated`: `"2026-05-26"` (ISO date)
- `ci_2_vpp_location_token[*].resolved_2026_05_26`: `true` (boolean dated annotation)

### Anti-Patterns to Avoid
- **Hand-editing the sidecar with regex** — risks JSON syntax errors. Use a JSON-aware editor (Edit tool with the exact 2-line slice) OR a Node.js scripted patch. Verify with `node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.6-audit-allowlist.json','utf8'))"` before committing.
- **Promoting `## Version History` H2 in admin-setup-* files** — D-01 explicitly rejected (Options A and C, scores 6 and 7). Creates anchor-pin obligations with zero validator payoff.
- **Renegotiating D-03 rewrite text** — CONTEXT.md D-03 carries 6 concrete before/after rewrites; planner/executor must use those verbatim. Do not paraphrase.
- **Editing older workflow files** — REQUIREMENTS.md:64 prohibits `audit-harness-integrity.yml` / `audit-harness-v1.5-integrity.yml` / `audit-harness-v1.6-integrity.yml` edits. Phase 67 makes ZERO workflow edits.
- **Editing hub files** (`docs/common-issues.md` / `docs/quick-ref-l1.md` / `docs/quick-ref-l2.md` / `docs/operations/00-index.md` / `docs/index.md`) — STATE.md:127 append-only contract; Phase 67 makes ZERO hub edits.
- **Expanding SWEEP-02 mid-phase to cover the 3 sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`** — calibration is locked at 6 occurrences; expansion violates the calibrated-enumeration contract (see Open Question #1).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL liveness check | Custom `curl` loop in PowerShell | `markdown-link-check@3.14.2` | The cron uses this exact pin; local-vs-cron parity is the whole point of D-02. Curl is corroborating-only. |
| Anchor enumeration | Custom regex over Markdown | `grep -n "^#"` + manual table (Phase 65 precedent at `65-ANCHOR-INVENTORY.md`) | The artifact is a static snapshot, not a parser; manual capture matches the precedent format and is human-auditable. |
| Sidecar shape validation | Custom JSON schema | `node scripts/validation/check-phase-66.mjs` (V-66-02) | The validator is the source of truth; running it before commit catches any shape drift. |
| Chain re-run aggregation | Custom orchestrator | `node scripts/validation/check-phase-66.mjs` (its V-66-CHAIN block subprocesses 48..65 automatically) | check-phase-66.mjs already chains 48..65 via subprocess loop at lines 292-301; running it = running the full chain. |
| Pre-commit dry-run wrapper | New script | Inline 3-command sequence in plan task body (D-04 Wave protocol) | One-off check; scripting it adds maintenance surface for zero gain. |

**Key insight:** Phase 67 is a **maintenance phase against an already-validated harness**. Every tool already exists; the planner's job is to **sequence the existing tools correctly**, not to build new ones.

## Runtime State Inventory

Phase 67 contains **string-replacement work** (SWEEP-02) — runtime state inventory required per /gsd:research-phase Step 2.5.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| **Stored data** | None — Phase 67 does not interact with any database, vector store, or persistent runtime data layer. The repo has no `.env`-driven datastore for v1.7 surfaces (Autopilot Python backend at `src/backend/` is a separate subsystem, not touched). [VERIFIED: no `ChromaDB`/`Mem0`/`Redis` references in `.planning/phases/67-*/` or in `scripts/validation/`] | None. |
| **Live service config** | None — no n8n/Datadog/Cloudflare integrations in scope; `audit-harness-v1.6-integrity.yml` cron is the only "live service" surface and is **NOT modified** (REQUIREMENTS.md:64). | None. |
| **OS-registered state** | None — no Windows Task Scheduler / launchd / systemd unit references the strings "VPP location token" or "business.apple.com". [VERIFIED: no `schtasks` / `pm2` / `launchctl` references in `.planning/phases/67-*/` or in `docs/`] | None. |
| **Secrets/env vars** | None — `business.apple.com` is a public URL, not a secret. "VPP location token" is documentation prose, not an env-var name. No SOPS / `.env` updates required. | None. |
| **Build artifacts / installed packages** | `markdown-link-check@3.14.2` is `--no-save`-installed (Plan 67-01 Wave 1); leaves no trace in `package.json`. Validator subprocess uses bundled Node.js modules. No egg-info / dist / build artifact carries the renamed strings. | After Plan 67-01 Wave 1, the `node_modules/markdown-link-check/` directory will exist in the working tree. The plan should optionally include a cleanup step (`npm uninstall markdown-link-check` after Wave 2 verification), or leave it (since `--no-save` means it's not tracked). Recommend leaving it — re-running verification later is one fewer step. |

**The canonical question:** *After every file in the repo is updated, what runtime systems still have the old "VPP location token" string cached, stored, or registered?*

**Answer:** None. SWEEP-02 is pure-prose documentation rename inside Markdown files. There are no caches, registrations, or databases that key off the legacy term. The only post-edit "runtime" verification needed is **harness re-run** (Plan 67-03 Wave 1 + 2), which is already in scope.

## Common Pitfalls

### Pitfall 1: Sidecar JSON Syntax Error After Per-Entry Annotation
**What goes wrong:** Adding `"last_revalidated": "2026-05-26"` or `"resolved_2026_05_26": true` to an entry but leaving a stray trailing comma, dropping a brace, or breaking JSON quote-escaping.
**Why it happens:** The sidecar uses compact single-line objects per entry (lines 81-92 of `v1.6-audit-allowlist.json`); adding a field requires touching the closing `}` boundary.
**How to avoid:**
1. Use the `Edit` tool with exact-line precision (the `Edit` tool preserves line endings — verify the file uses LF or CRLF consistently by reading it first).
2. After editing, **immediately** run: `node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.6-audit-allowlist.json','utf8')); console.log('OK')"` to catch syntax errors before `git add`.
3. Run `node scripts/validation/check-phase-66.mjs` — V-66-02 fails fast on parse errors with the exact error message.

**Warning signs:** `check-phase-66.mjs V-66-02` exits with "JSON parse error: ..." instead of PASS.

### Pitfall 2: `markdown-link-check` False Positive from Apple Rate-Limiting
**What goes wrong:** Apple's edge CDN occasionally returns `429 Too Many Requests` or transient `503` to non-browser User-Agents, causing markdown-link-check to mark `status: 'dead'` when the URL is actually fine.
**Why it happens:** The tool's default User-Agent (`Mozilla/5.0`) is sometimes throttled by Apple's bot mitigation when hit 4× in rapid succession for the same domain.
**How to avoid:**
1. The 4 ci_1_abm_urls entries are all `https://business.apple.com` (same URL, 4 files). Per Discretion in CONTEXT.md, the planner MAY probe once and log all 4 entries — this naturally avoids the rate-limiter.
2. If a single probe returns `dead`, retry with the `curl -I` HEAD probe (the D-02 corroborating secondary). If `curl` returns 200, the markdown-link-check failure was rate-limiting, not a real Apple URL sunset. Document this in 67-VERIFICATION.md under "tool divergence" subsection.
3. Use the `timeout: '10s'` setting in the inline Node invocation (per CONTEXT.md D-02 line 64 example) to avoid hanging on slow responses.

**Warning signs:** markdown-link-check stdout shows `status: 'dead', statusCode: 429` or `503`; curl HEAD on the same URL returns `200 OK`.

### Pitfall 3: Forgetting the `_glossary-macos.md` Coordinating Row
**What goes wrong:** Plan 67-02 lands the 2 SWEEP-02 corpus edits but omits the coordinating row in `_glossary-macos.md ## Version History` H2 table (line 121+). Discoverable later via traceability audit but creates inconsistency.
**Why it happens:** The glossary is a third file outside the 2 directly-edited files; easy to forget if the plan checklist only lists the 2 SWEEP-02 target files.
**How to avoid:** Plan 67-02 MUST include an explicit Wave 4 task: "Append coordinating row to `_glossary-macos.md` `## Version History` H2 table at line ≥121." D-01 makes this row mandatory for SWEEP-02 (and optional for SWEEP-01 — only if Branch B).

**Warning signs:** Post-edit anchor inventory diff shows `_glossary-macos.md` unchanged at lines ≥121 when Phase 67 actually performed SWEEP-02.

### Pitfall 4: `git revert` Granularity Violation
**What goes wrong:** SWEEP-01 and SWEEP-02 edits get bundled into one commit; a later regression in one cannot be cleanly reverted without taking the other.
**Why it happens:** Plan-author bundles "both small surgical fixes" into one tidy commit thinking the atomic-within-plan pattern applies across requirements. It does NOT — D-04 explicitly chose per-plan boundary (Option E score 7) over atomic-across-requirements (Option B score 20).
**How to avoid:** Each plan commits separately. Plan 67-01 commit message starts `docs(67-01): SWEEP-01 — ...`; Plan 67-02 commit message starts `docs(67-02): SWEEP-02 — ...`. Plan 67-03 close-gate is its own commit `docs(67-03): Phase 67 close-gate — ...`.

**Warning signs:** A single commit touches both `admin-setup-{ios,macos}/05,04-app-deployment.md` AND the sidecar `ci_1_abm_urls` annotations.

### Pitfall 5: CRLF/LF Line-Ending Drift on Sidecar JSON
**What goes wrong:** Editing the sidecar with a tool that converts LF to CRLF (Windows default) inflates the diff by hundreds of lines and may trigger spurious validator failures.
**Why it happens:** Most repo files use LF; `.gitattributes` enforcement may not cover the validation directory.
**How to avoid:** Read the sidecar first to detect line-ending style (`Read` tool returns content with line numbers; if line counts match expected, line endings are preserved). After edit, run `git diff scripts/validation/v1.6-audit-allowlist.json` and verify the diff shows only the intended additions (~4-6 lines for SWEEP-01 + ~6 lines for SWEEP-02), NOT a full-file rewrite.

**Warning signs:** `git diff` shows the entire sidecar file as changed even though logically only ~10 lines were touched.

### Pitfall 6: Anchor Drift in `_glossary-macos.md` from Glossary Row Append
**What goes wrong:** Appending a row to the existing `## Version History` H2 table at line 121+ accidentally shifts other anchors if a blank line gets misplaced or if the table is replaced rather than extended.
**Why it happens:** Editor confusion when inserting INTO a table vs AFTER it.
**How to avoid:**
1. Capture the pre-edit anchor inventory (Wave 1 of Plan 67-02) per PITFALL-6 / D-01 / STATE.md:126.
2. Append the new row INSIDE the existing table (between the last existing row at line 128 (per current Read) and the file end). Do NOT add new blank lines between rows.
3. Post-edit Wave 6 diff confirms zero anchor shift ≥ line 121.

**Warning signs:** Post-edit anchor inventory shows anchor line numbers ≥121 shifted by +1 or more.

### Pitfall 7: Misreading CHAIN_SKIP State as Regression
**What goes wrong:** Plan 67-03 close-gate runs `check-phase-{48..66}.mjs` and sees `SKIPPED` entries for phases 48, 51, 58, 60, 61 → incorrectly concludes Phase 67 introduced a regression.
**Why it happens:** SKIPPED looks like a failure indicator to someone unfamiliar with the CHAIN_SKIP convention.
**How to avoid:** Verify the SKIPPED set is EXACTLY `{48, 51, 58, 60, 61}` (matching `check-phase-66.mjs:64` `CHAIN_SKIP` constant). This is the same status as v1.6 close per `66-VERIFICATION.md:55` ("All 6 validators exit 0 modulo CHAIN_SKIP {48,51,58,60,61}") and per STATE.md:144. Phase 68 Pillar B (CHAIN-01/02/03) resolves these — NOT Phase 67.

**Warning signs:** SKIPPED set contains a phase ID OUTSIDE {48, 51, 58, 60, 61} (e.g., 62-65 newly SKIPPED) — this WOULD be a regression and a Plan 67-03 STOP condition.

## Code Examples

Verified patterns from in-repo precedents and pinned tool docs.

### Example 1: One-Shot Install + Probe of a Single URL
```powershell
# Source: CONTEXT.md D-02 lines 59-65 (verbatim guidance); pinned per audit-harness-v1.6-integrity.yml:167

# Step 1 — install pinned tool (one-shot, no package.json mutation)
npm install --no-save markdown-link-check@3.14.2

# Step 2 — probe the URL (same domain for all 4 entries; per Discretion may probe once)
node -e @"
require('markdown-link-check')('[ABM](https://business.apple.com)', { timeout: '10s' }, (err, results) => {
  if (err) { console.error('markdown-link-check error:', err.message); process.exit(2); }
  console.log(JSON.stringify(results, null, 2));
  process.exit(results[0].status === 'alive' ? 0 : 1);
});
"@
```

[CITED: CONTEXT.md `67-CONTEXT.md` lines 59-65; package pin verified via `npm view markdown-link-check@3.14.2 version` on 2026-05-26]

### Example 2: Capture markdown-link-check stdout for 67-VERIFICATION.md
```powershell
# Capture stdout to a file for inclusion in the verification artifact
$probeOutput = & node -e "require('markdown-link-check')('[ABM](https://business.apple.com)', { timeout: '10s' }, (err, results) => { console.log(JSON.stringify(results, null, 2)); process.exit(results[0].status === 'alive' ? 0 : 1); });" 2>&1
$exitCode = $LASTEXITCODE
$probeOutput | Out-File -FilePath .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-mlc-output.txt -Encoding utf8

# Then in 67-VERIFICATION.md SWEEP-01 H2 subsection, paste the contents inside a ```json ... ``` fenced block
```

### Example 3: Secondary curl HEAD Probe (Corroborating Evidence per D-02)
```powershell
# Windows native curl (PowerShell 7+ alias `curl` is Invoke-WebRequest — use curl.exe to invoke real curl)
curl.exe -I -L --max-time 10 https://business.apple.com
# Expected response per CONTEXT.md D-02 line 48: HTTP/1.1 200 OK, Server: Apple, no redirect, no rebrand-banner header
```

[CITED: CONTEXT.md `67-CONTEXT.md` line 48 — advisor's corroborating evidence 2026-05-26 14:29:40 UTC]

### Example 4: Sidecar Per-Entry Annotation (SWEEP-01 Branch A)
```javascript
// BEFORE (scripts/validation/v1.6-audit-allowlist.json:81):
{ "url": "https://business.apple.com", "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 92, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand; included for completeness — quarterly check confirms reachability", "category": "live_url_quarterly_check" }

// AFTER (one additive field per D-04 ANNOTATE-not-remove):
{ "url": "https://business.apple.com", "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 92, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand; included for completeness — quarterly check confirms reachability", "category": "live_url_quarterly_check", "last_revalidated": "2026-05-26" }
```

[VERIFIED: pattern matches V-66-02 shape check at `check-phase-66.mjs:85-112` — validator enforces object shape + `quarterly_audit.cadence`; per-entry annotations are NOT shape-enforced]

### Example 5: Sidecar Per-Entry Resolution Annotation (SWEEP-02)
```javascript
// BEFORE (scripts/validation/v1.6-audit-allowlist.json:87):
{ "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 71, "term": "VPP (Apps and Books) location token", "context": "prerequisites bullet", "reason": "legacy 'VPP location token' term retained per Q5(b) no-corpus-sweep contract; rename deferred to v1.7+ CI-2", "category": "legacy_term_surgical_rename_candidate" }

// AFTER (one additive field per D-04 ANNOTATE-not-remove):
{ "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 71, "term": "VPP (Apps and Books) location token", "context": "prerequisites bullet", "reason": "legacy 'VPP location token' term retained per Q5(b) no-corpus-sweep contract; rename deferred to v1.7+ CI-2", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_05_26": true }
```

[VERIFIED: Phase 67 introduces this field shape; Phase 70 HARNESS-02 will fork `v1.7-audit-allowlist.json` with the entries reset and these annotations dropped — the v1.6 sidecar retains the annotated history]

### Example 6: OP-10 Callout Block (Inserted Above `## Renewal / Maintenance` in Both SWEEP-02 Files)
```markdown
> **Note:** Apple calls this artifact a "content token" (formerly "VPP location token"); Microsoft Intune labels it "Apple VPP token" under `Tenant administration > Connectors and tokens > Apple VPP tokens`. Same artifact, different vendor terminology.

```

[CITED: CONTEXT.md `67-CONTEXT.md` D-03 table rows 2a / 6a (verbatim); precedent at `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md:35-39`]

### Example 7: PITFALL-6 Anchor Inventory Capture (PowerShell)
```powershell
# Pre-edit snapshot (Wave 1 of Plan 67-02)
Select-String -Path docs/_glossary-macos.md -Pattern '^#' | ForEach-Object {
  "{0,4} | {1}" -f $_.LineNumber, $_.Line
} | Out-File .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-pre.txt -Encoding utf8

# Author 67-ANCHOR-INVENTORY.md from this file + the Phase 65 precedent format
# Then after Wave 5 edits, repeat:
Select-String -Path docs/_glossary-macos.md -Pattern '^#' | ForEach-Object {
  "{0,4} | {1}" -f $_.LineNumber, $_.Line
} | Out-File .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-post.txt -Encoding utf8

# Diff the two — expect zero changes at lines ≥ 121 (the ## Version History H2 boundary)
git diff --no-index .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-pre.txt .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-post.txt
```

[VERIFIED against Phase 65 precedent at `.planning/milestones/v1.6-phases/65-apple-business-l1-l2-hub-navigation-integration/65-ANCHOR-INVENTORY.md` — same H2/H3 table format with Line/Level/Heading Text/Slug/Notes columns]

### Example 8: Pre-Commit Dry-Run Triple (Wave 7 of Plan 67-02)
```powershell
# MANDATORY before `git add` per CONTEXT.md D-04 Plan 67-02 Wave 7
# Each validator should exit 0; capture exit codes
$results = @{}

& node scripts/validation/v1.6-milestone-audit.mjs
$results['v1.6-milestone-audit'] = $LASTEXITCODE

& node scripts/validation/check-phase-62.mjs
$results['check-phase-62'] = $LASTEXITCODE

& node scripts/validation/check-phase-66.mjs
$results['check-phase-66'] = $LASTEXITCODE

if ($results.Values -contains 0 -and -not ($results.Values | Where-Object { $_ -ne 0 })) {
  Write-Host "ALL PRE-COMMIT VALIDATORS PASSED — proceed with git add" -ForegroundColor Green
} else {
  Write-Error "Pre-commit dry-run FAILED: $($results | ConvertTo-Json)"
  exit 1
}
```

[CITED: CONTEXT.md `67-CONTEXT.md` D-04 lines 136-139]

### Example 9: Full Chain Re-Run (Plan 67-03 Wave 1)
```powershell
# Plan 67-03 Wave 1 — full chain via check-phase-66.mjs (it subprocesses 48..65 internally)
& node scripts/validation/check-phase-66.mjs --verbose 2>&1 | Tee-Object -Variable chainOutput -FilePath .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-chain-output.txt

# Expected: exit 0, 23 PASS / 5 SKIPPED / 0 FAIL (matching v1.6 close per 66-VERIFICATION.md:113)
# The 5 SKIPPED MUST be exactly {48, 51, 58, 60, 61}
$skipsLine = $chainOutput | Select-String -Pattern 'CHAIN_SKIP = \[' | Select-Object -First 1
Write-Host "CHAIN_SKIP report: $skipsLine"
```

[VERIFIED: `check-phase-66.mjs:43` `CHAIN_PHASES = [48..65]` + `:64` `CHAIN_SKIP = new Set([48, 51, 58, 60, 61])` + the file's V-66-CHAIN block at `:292-301` already subprocesses the full chain; running check-phase-66.mjs IS running the full chain]

### Example 10: 67-VERIFICATION.md SWEEP-01 H2 Subsections Template
```markdown
## SWEEP-01: ABM URL Live-State Verification (2026-05-26)

### Mechanism
`markdown-link-check@3.14.2` invoked locally via `node -e "require('markdown-link-check')(...)"` — same pin as `audit-harness-v1.6-integrity.yml:167` `rotting-external-quarterly` job; IS-equivalent evidence per CONTEXT.md D-02.

### Tool Output (primary evidence)
```json
[
  {
    "link": "https://business.apple.com",
    "status": "alive",
    "statusCode": 200,
    "err": null
  }
]
```
Invocation: `node -e "require('markdown-link-check')('[ABM](https://business.apple.com)', { timeout: '10s' }, ...)"`
Captured: 2026-05-26 HH:MM:SS UTC
Exit code: 0

### Corroborating Evidence (secondary — curl HEAD)
```
HTTP/1.1 200 OK
Server: Apple
[other headers...]
```
Captured: 2026-05-26 HH:MM:SS UTC
(Advisor's earlier curl probe at 2026-05-26 14:29:40 UTC: same response)

### Outcome
**Branch A** — All 4 ci_1_abm_urls entries confirmed alive. Sidecar annotated with `"last_revalidated": "2026-05-26"`; no corpus edits required. Quarterly cron continues monitoring (next fire 2026-07-01).
```

[CITED: CONTEXT.md D-02 line 67 "4 subsections (mechanism / tool output / corroborating evidence / outcome)"]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| URL liveness in manual sweeps (v1.4 and earlier) | Tool-pinned `markdown-link-check@3.14.2` via cron + local re-run for milestone close (v1.6+) | Phase 66 commit `3a9a671` (2026-05-25) introduced the cron pin | Phase 67 inherits the pin; ensures IS-equivalent evidence. |
| Sidecar entry-count assertions in validators | Shape-only assertions (V-66-02 checks object + `quarterly_audit.cadence`) | Phase 66 V-66-02 design (`check-phase-66.mjs:85-112`) | ANNOTATE-not-remove mode is safe — no entry-count cascade. |
| Inline rebrand prose in tables (full 17-word compound everywhere) | Short form in tables + callout above section + full compound on first H2 prose mention | Phase 64 `11-vpp-catalog-runbook.md:35-39` established the OP-10 callout precedent | Tables stay readable; isolation-read safety preserved via callout. |
| `## Version History` H2 promotion in every edited file | H2 only in PITFALL-6-scoped files (glossaries / capability matrices / hub files); unheaded tail-table elsewhere | D-01 (Phase 67) | Minimizes new anchor-pin obligations; 81-file corpus convention preserved. |

**Deprecated/outdated:**
- "VPP location token" / "VPP (Apps and Books) location token" → canonical: "content token" (Apple's 2026-04-14 rebrand). Intune-side label "Apple VPP token" UNCHANGED in portal as of 2026-04-30 tutorial refresh (STATE.md:146) — Phase 67 SWEEP-02 surgically closes the corpus side; the Intune-side asymmetry is by design and is documented via the OP-10 callout.
- "Managed Apple ID" → "Managed Apple Account" (Apple's 2024 rebrand, predates Apple Business rebrand). DEFERRED to v1.8+ per REQUIREMENTS.md:65 (CI-3) — NOT in Phase 67 scope.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The 4 ci_1_abm_urls entries will all return `status: 'alive'` at Plan 67-01 Wave 1 probe (Branch A is the expected case). | §Architecture Patterns / Branch A | If wrong (Branch B fires), Plan 67-01 work doubles — surgical corpus edits land. The branchable plan structure handles this; no rework needed at planning time. [ASSUMED — based on Phase 66 calibration on 2026-05-25 + advisor's corroborating curl probe 2026-05-26 14:29:40 UTC; quarterly cron is not due to fire until 2026-07-01, so live state between 2026-05-26 and 2026-07-01 is technically unverified. Mitigation: branchable plan absorbs either outcome.] |
| A2 | `markdown-link-check@3.14.2` is reachable from the npm registry on 2026-05-26 and installs without postinstall side effects. | §Standard Stack | If wrong, Plan 67-01 Wave 1 cannot install the tool. Mitigation: `npm view markdown-link-check@3.14.2 version` returned `3.14.2` on 2026-05-26; postinstall script is empty per `npm view markdown-link-check@3.14.2 scripts.postinstall`. [VERIFIED: npm registry] |
| A3 | The full chain `check-phase-{48..66}.mjs` will produce identical PASS/SKIP pattern as v1.6 close (23 PASS / 5 SKIPPED / 0 FAIL, with SKIP set = {48,51,58,60,61}). | §Pitfall 7 + §Code Examples #9 | If wrong, Plan 67-03 must investigate — possible regression from Phase 67 edits. Mitigation: SWEEP-02 edits are in files OUTSIDE C15 scope (`appleBusinessDocPaths()` at `v1.6-milestone-audit.mjs:93-124`) and don't match C11 banned patterns; harness inertia verified by construction in CONTEXT.md D-03 line 99. [VERIFIED against in-repo source]. |
| A4 | The `--no-save` flag for `npm install` does not modify `package.json` in this repo. | §Standard Stack Installation | If wrong, Plan 67-01 introduces an unwanted dependency entry. Mitigation: this repo has no top-level `package.json` co-located with the validators; the closest is `src/frontend/package.json` (separate subsystem). [VERIFIED: top-level `package.json` is absent at repo root per `gitStatus` snapshot] |
| A5 | Editing the sidecar with the `Edit` tool preserves the file's existing line-ending convention. | §Pitfall 5 + §Sidecar JSON Edit Mechanism | If wrong, the diff inflates and triggers spurious validator failures. Mitigation: read the file first to detect line endings; verify diff size after edit. [ASSUMED — based on Edit tool documented behavior; not directly tested in this session]. |
| A6 | `_glossary-macos.md` `## Version History` H2 is currently at line 121 with the 4-row table at lines 123-128. | §Pitfall 6 + §Recommended Plan-File Structure | If wrong (line drift), the anchor inventory pre-snapshot captures the actual state and Wave 6 diff still works. Mitigation: anchor inventory is the source of truth, not the assumed line number. [VERIFIED: `Read` of `_glossary-macos.md:115-128` on 2026-05-26 showed `## Version History` at line 121 + 4 existing rows ending at line 128] |
| A7 | `business.apple.com` will remain Apple's canonical URL through Phase 67's 1-week execution window (2026-05-26 to ~2026-06-02). | §Architecture Patterns / Branch A | If Apple sunsets the URL during execution, Branch B fires mid-plan. Mitigation: Branch B is fully spec'd in CONTEXT.md; no replanning needed. [ASSUMED — Apple newsroom signal stable as of advisor's 2026-05-26 14:29:40 UTC curl probe; no public sunset notice]. |
| A8 | The 3 additional sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155) that contain "VPP location token" are correctly excluded from Phase 67 calibration. | §Open Question #1 | If they should have been included, Phase 70 close-gate or the next quarterly audit will surface them. Mitigation: calibration is locked at 6 sites / 2 files per CI-2 enumeration; expanding scope violates the calibrated-enumeration contract. The 3 additional sites are flagged here for v1.8+ pickup. [VERIFIED via Grep — see Open Question #1] |

## Open Questions

1. **3 additional "VPP location token" occurrences in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155) are NOT in the SWEEP-02 calibrated 6-occurrence set.**
   - **What we know:** Grep across `docs/` (Grep tool, 2026-05-26) returned 6 SWEEP-02-calibrated occurrences PLUS 3 additional occurrences in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155). All 3 use the legacy form. The file is NOT in the CI-2 calibrated enumeration at `v1.6-audit-allowlist.json:86-93` and is NOT in Phase 67 scope per CONTEXT.md line 9.
   - **What's unclear:** Whether the v1.6 Phase 66 calibration deliberately excluded these (operations sub-tree out of CI-2 scope) or whether they were missed. PITFALLS.md:642 cites lines 201 + 148 as canonical CI-2 sites, suggesting the calibration intentionally focused on admin-setup files. Also note: `_glossary-apple-business.md:28` carries an intentional legacy-vs-new term mapping row in the rename table; that one is OUT of scope by design.
   - **Recommendation:** Do NOT expand Phase 67 scope. The 6-site calibration is locked per CONTEXT.md and REQUIREMENTS.md:14. Flag the 3 additional sites for v1.8+ pickup in `v1.7-DEFERRED-CLEANUP.md` (authored at Phase 70 HARNESS-06). The planner SHOULD add an entry to 67-VERIFICATION.md noting the discovery so it's not lost. The 3 sites + 1 cross-platform `07-vpp-content-token-consolidation.md:9` + 1 `02-ous-architecture.md:87` + 1 `10-apple-tv-lifecycle.md:131` all use the term in **historical context** ("formerly VPP location tokens") — they are already correctly rebranded as content-token-first and explicitly mention the legacy term parenthetically. These are NOT rotting references; they are deliberately educational. The 3 sites in `02-macos-pkg-dmg-pipeline.md`, however, use the legacy term as the primary form — these are the actual additional cleanup candidates.

2. **markdown-link-check 3.14.2 stdout shape variability.**
   - **What we know:** The CONTEXT.md D-02 example at line 64 expects `results[0].status === 'alive'`. The tool documentation (homepage `https://github.com/tcort/markdown-link-check`) confirms the `results` array shape with `link` / `status` / `statusCode` fields.
   - **What's unclear:** Whether the inline `node -e` invocation produces output formatted identically to the cron's `markdown-link-check <(echo "[link](url)")` shell-redirection invocation at `audit-harness-v1.6-integrity.yml:184`. The two invocations may produce DIFFERENT stdout (programmatic API vs CLI).
   - **Recommendation:** Plan 67-01 Wave 1 should capture BOTH the JSON output of the programmatic `node -e` call AND a sample CLI invocation output (`echo "[link](https://business.apple.com)" | npx markdown-link-check`) — whichever matches the cron's stdout shape is the primary evidence; the other is supplementary. Document both shapes in 67-VERIFICATION.md.

3. **PITFALL-6 anchor inventory generation: scripted or manual?**
   - **What we know:** Phase 65 produced `65-ANCHOR-INVENTORY.md` (covering 6 files, ~6 H2/H3 tables) and Phase 66 referenced it as precedent. The file has a structured Markdown table format (Line / Level / Heading Text / Slug / Notes columns).
   - **What's unclear:** Whether Phase 65 generated this manually or via a script. `Glob` returned no `ANCHOR-INVENTORY*.md` files outside Phase 65 (Phase 66 referenced the pattern but produced no inventory artifact of its own per Glob). No corresponding `bin/` or `scripts/` helper found.
   - **Recommendation:** Generate manually using the PowerShell pattern in §Code Examples #7. The artifact is small (Phase 67 covers only 1 file, `_glossary-macos.md`, currently 128 lines with ~12 H2/H3 anchors). Manual capture matches the Phase 65 precedent format exactly. Wave 6 post-edit diff uses `git diff --no-index` on temp captures.

4. **`last_verified:` field convention — date format and per-doc variation.**
   - **What we know:** Grep across `docs/**/*.md` (2026-05-26) returned 30+ files with `last_verified: YYYY-MM-DD` format (e.g., `docs/admin-setup-ios/05-app-deployment.md:2: last_verified: 2026-04-18`). All sampled files use ISO date format; no per-doc-type variation observed.
   - **What's unclear:** Whether any harness check enforces this field. Quick scan of `scripts/validation/v1.6-milestone-audit.mjs` (lines 80-124) does NOT show a `last_verified` regex check; the field appears to be informational (not validator-enforced).
   - **Recommendation:** Use ISO format `2026-05-26` (Phase 67 date). Per CONTEXT.md D-01, bump on each edited file: `admin-setup-ios/05-app-deployment.md` (Branch B SWEEP-01 OR SWEEP-02), `admin-setup-macos/04-app-deployment.md` (Branch B SWEEP-01 OR SWEEP-02), `admin-setup-macos/01-abm-configuration.md` (Branch B SWEEP-01 only), `_glossary-macos.md` (Branch B SWEEP-01 only — the glossary's `## Version History` H2 always gets a coordinating row for SWEEP-02 regardless, but the frontmatter `last_verified:` bump should only happen if the file's prose is edited). NOTE: `_glossary-macos.md` shows `last_verified:` in the frontmatter — verify line 2 of the file before assuming it has one.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validator subprocesses + markdown-link-check | ✓ | v24.15.0 | — |
| npm | Tool install (Plan 67-01 Wave 1) | ✓ | 11.12.1 | — |
| PowerShell | Outer shell for sequencing | ✓ | session-default | — |
| `markdown-link-check@3.14.2` | SWEEP-01 URL probe | ✗ (not pre-installed; installed on-demand) | 3.14.2 (pinned) | `--no-save` install at Plan 67-01 Wave 1; corroborating `curl.exe -I` secondary |
| `curl.exe` (real curl, not PowerShell alias) | Corroborating secondary HEAD probe | ✓ (Windows 10 1803+ ships curl.exe) | system-default | `Invoke-WebRequest -Method Head` if curl.exe is unavailable |
| `git` | Commit topology + diff capture | ✓ (per `gitStatus` snapshot at session start) | — | — |
| Internet access to `business.apple.com` | SWEEP-01 probe | ASSUMED ✓ | — | If offline at execution time, Plan 67-01 Wave 1 blocks (cannot probe); pause execution, retry when online. |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:**
- `markdown-link-check@3.14.2` — installed on-demand via `npm install --no-save` at Plan 67-01 Wave 1. Fallback to `curl.exe -I` only as secondary evidence; the primary tool MUST be markdown-link-check per D-02.

[VERIFIED: `node --version` returned `v24.15.0`; `npm --version` returned `11.12.1`; env block declares `Shell: PowerShell`; `gitStatus` shows clean repo state]

## Validation Architecture

Validation Architecture section is **applicable** — `workflow.nyquist_validation` is not set in `.planning/config.json:1-9` (key absent → treat as enabled per /gsd:research-phase Step 4 protocol). However, this is a **docs-only phase** with no unit tests in the traditional sense. The validation surface is the **validator chain** + **markdown-link-check probe** + **PITFALL-6 anchor diff**.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js subprocess chain via `check-phase-NN.mjs` (no Pester/pytest/vitest in scope) |
| Config file | none — each `check-phase-NN.mjs` is self-contained |
| Quick run command | `node scripts/validation/check-phase-66.mjs` (subprocesses 48..65 internally) |
| Full suite command | `node scripts/validation/check-phase-66.mjs --verbose && node scripts/validation/v1.6-milestone-audit.mjs` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SWEEP-01 | All 4 `business.apple.com` URLs return alive OR have been surgically updated; sidecar reflects post-probe state | URL-probe + sidecar-shape | `node -e "require('markdown-link-check')(...)" && node scripts/validation/check-phase-66.mjs` | ✓ (sidecar exists at `scripts/validation/v1.6-audit-allowlist.json`; V-66-02 in check-phase-66.mjs) |
| SWEEP-02 | All 6 occurrences renamed; harness C11/C15 still PASS; PITFALL-6 anchor diff shows zero shift ≥ line 121 in `_glossary-macos.md` | grep + harness-rerun + anchor-diff | `Grep "VPP location token" docs/admin-setup-{ios,macos}/0[45]-app-deployment.md` (expect 0 results) && `node scripts/validation/v1.6-milestone-audit.mjs` (expect 15/15 PASS) | ✓ (harness exists; grep is a one-liner) |

### Sampling Rate
- **Per task commit:** none (docs commits don't trigger validator on commit — only at plan boundary)
- **Per wave merge:** Pre-commit dry-run (3 validators) per CONTEXT.md D-04 Plan 67-02 Wave 7
- **Phase gate:** Plan 67-03 Wave 1 full chain re-run + Wave 2 milestone-audit re-run before `/gsd:verify-work`

### Wave 0 Gaps
None — all required validators already exist:
- `scripts/validation/check-phase-66.mjs` (chains 48..65 via subprocess loop at lines 292-301)
- `scripts/validation/v1.6-milestone-audit.mjs` (15 checks including C11 + C15)
- `scripts/validation/check-phase-62.mjs` (V-62-SIDECAR — c16-only assertion per `:277-289`)
- `scripts/validation/check-phase-66.mjs` (V-66-02 — c13 shape assertion per `:85-112`)

No new test infrastructure required.

## Security Domain

`security_enforcement` is not set in `.planning/config.json`; treating as enabled per /gsd:research-phase Step protocol. Phase 67 has minimal security surface — it's a docs-only edit phase with no auth, no input validation, no crypto.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes (minimal) | The only "input" is the markdown-link-check probe URL — hardcoded in the sidecar (`https://business.apple.com`), not user-supplied. No injection vector. |
| V6 Cryptography | no | — |
| V14 Configuration | yes (minimal) | Pinned dependency (`markdown-link-check@3.14.2`) is the only "config"; pin is verified against the cron workflow at `audit-harness-v1.6-integrity.yml:167`. |

### Known Threat Patterns for Docs-Edit + Tool-Install Phase

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Slopsquatted/typosquatted package (e.g., `markdown-link-check` → `markdownn-link-check` typo) | Spoofing | Pinned exact version `@3.14.2`; verified against cron workflow pin; npm registry lookup confirms `tcort/markdown-link-check` upstream repo. No new packages added in Phase 67. |
| Malicious postinstall script | Tampering / RCE | `npm view markdown-link-check@3.14.2 scripts.postinstall` returns empty — no postinstall network call risk. [VERIFIED] |
| Markdown injection via Apple-controlled URL response | Tampering | The probe URL is HARDCODED in the sidecar, not user-supplied. Even if Apple's response were malicious Markdown, markdown-link-check only checks status codes — it does not parse response bodies as Markdown. |
| Validator subprocess parameter injection | Tampering | Validators are invoked with no command-line parameters from external input; all paths are hardcoded. No injection surface. |
| Accidental secret commit (e.g., `.env`, credentials) | Information Disclosure | Phase 67 touches NO secret files. `.env` files are .gitignored per CLAUDE.md guidance. |

No new threat surface introduced by Phase 67. All edits are local Markdown rewrites + JSON additive annotations + reusing an already-cron-pinned tool.

## Sources

### Primary (HIGH confidence — read directly in this session)
- `D:\claude\Autopilot\.planning\phases\67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up\67-CONTEXT.md` — Phase 67 LOCKED decisions D-01..D-04 + canonical references + code context + specifics + deferred ideas (260 lines)
- `D:\claude\Autopilot\.planning\REQUIREMENTS.md` — SWEEP-01 + SWEEP-02 contracts + traceability + out-of-scope (105 lines)
- `D:\claude\Autopilot\.planning\STATE.md` — anti-regression invariants (lines 110-150)
- `D:\claude\Autopilot\.planning\ROADMAP.md` — Phase 67 Goal + SC#1-4 (lines 275-285)
- `D:\claude\Autopilot\.planning\milestones\v1.6-DEFERRED-CLEANUP.md` — CI-1 (4 URLs) + CI-2 (6 occurrences) enumeration tables (full file, 150 lines)
- `D:\claude\Autopilot\.planning\research\PITFALLS.md` lines 617-680 — CI-1, CI-2, CI-3 source-of-truth + line 657 first-mention-per-H2 convention
- `D:\claude\Autopilot\scripts\validation\v1.6-audit-allowlist.json` lines 79-121 — c13_rotting_external + quarterly_audit shape
- `D:\claude\Autopilot\scripts\validation\v1.6-milestone-audit.mjs` lines 80-124 (appleBusinessDocPaths C15 scope) + 570-594 (C11 banned patterns + window keywords)
- `D:\claude\Autopilot\scripts\validation\check-phase-66.mjs` lines 1-112 (V-66-02 shape check) + 43 (CHAIN_PHASES) + 64 (CHAIN_SKIP) + 292-301 (subprocess loop)
- `D:\claude\Autopilot\scripts\validation\check-phase-62.mjs` lines 277-289 (V-62-SIDECAR c16-only)
- `D:\claude\Autopilot\.github\workflows\audit-harness-v1.6-integrity.yml` lines 150-189 (cron + markdown-link-check pin)
- `D:\claude\Autopilot\docs\_glossary-apple-business.md` lines 108-127 (Phase 62 canonical "Content token" definition + Apple-vs-Intune callout)
- `D:\claude\Autopilot\docs\cross-platform\apple-business\11-vpp-catalog-runbook.md` lines 30-44 (OP-10 callout precedent)
- `D:\claude\Autopilot\docs\_glossary-macos.md` lines 60-128 (ABM definition + existing `## Version History` H2 at line 121 + 4 existing rows)
- `D:\claude\Autopilot\docs\admin-setup-ios\05-app-deployment.md` lines 1-15, 60-74, 85-99, 195-209 (frontmatter + 2 SWEEP-02 target lines + tail-table)
- `D:\claude\Autopilot\docs\admin-setup-macos\04-app-deployment.md` lines 40-54, 100-114, 140-154 (4 SWEEP-02 target lines + tail-table)
- `D:\claude\Autopilot\docs\admin-setup-macos\01-abm-configuration.md` lines 48-57 (SWEEP-01 URL site at line 52)
- `D:\claude\Autopilot\.planning\milestones\v1.6-phases\65-apple-business-l1-l2-hub-navigation-integration\65-ANCHOR-INVENTORY.md` lines 1-100 (PITFALL-6 anchor inventory format precedent)
- `D:\claude\Autopilot\.planning\milestones\v1.6-phases\66-apple-business-validation-tooling-closure-milestone-audit\66-VERIFICATION.md` lines 1-140 (verification artifact format precedent + SC satisfaction blocks)
- `D:\claude\Autopilot\CLAUDE.md` — project conventions (read at session start, scope unrelated to docs subsystem but compliance verified)
- `npm view markdown-link-check version` (registry query 2026-05-26) → `3.14.2`
- `npm view markdown-link-check@3.14.2 scripts.postinstall` (registry query 2026-05-26) → empty (no postinstall)
- `npm view markdown-link-check@3.14.2 homepage` → `https://github.com/tcort/markdown-link-check#readme`
- `node --version` → `v24.15.0`
- `npm --version` → `11.12.1`
- Grep `VPP location token` across `docs/` (Grep tool, 2026-05-26) → 6 SWEEP-02-calibrated + 3 additional sites in `02-macos-pkg-dmg-pipeline.md` + 5 historical-context sites (all in cross-platform/apple-business/ and the glossary)
- Grep `^last_verified:` across `docs/` (Grep tool, 2026-05-26) → 30+ files with ISO date format confirmed

### Secondary (MEDIUM confidence — registry-verified but not session-fetched)
- `https://github.com/tcort/markdown-link-check` (upstream tool repo — referenced via npm view; not session-fetched)
- markdown-link-check@3.14.2 README behavior re: programmatic API (CONTEXT.md D-02 line 64 example assumes the documented callback shape; not session-verified against current README)

### Tertiary (LOW confidence — must be validated at Plan 67-01 Wave 1)
- The exact stdout shape produced by `node -e "require('markdown-link-check')(...)"` may differ slightly from the cron's CLI shell-redirection invocation; both should be captured for completeness per Open Question #2.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — only tool involved is `markdown-link-check@3.14.2`, already cron-pinned + npm-registry-verified.
- Architecture (3-plan structure, branchable wave, atomic-within-plan, ANNOTATE-not-remove sidecar): HIGH — all locked in CONTEXT.md D-04 + precedents at Phase 65/66.
- Pitfalls: HIGH — all 7 pitfalls map to in-repo precedents or explicit CONTEXT.md guard rails.
- Validation re-run mechanics: HIGH — `check-phase-66.mjs` is the existing chain orchestrator at lines 292-301.
- markdown-link-check stdout shape: MEDIUM — programmatic vs CLI may differ slightly (Open Question #2); resolved at Plan 67-01 Wave 1 capture.
- 3 additional VPP location token sites in `02-macos-pkg-dmg-pipeline.md`: surfaced as Open Question #1 — recommendation is to flag for v1.8+, not expand Phase 67 scope.

**Research date:** 2026-05-26
**Valid until:** 2026-06-02 (Phase 67 ~1-week execution window per PROJECT.md:32). Re-validation required after 7 days for Apple URL state (markdown-link-check probe is the canonical re-validator).
