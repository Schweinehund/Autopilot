# Phase 66: Apple Business Validation Tooling Closure + Milestone Audit - Research

**Researched:** 2026-05-24
**Domain:** Validation tooling closure, atomic harness commit choreography, CI workflow lineage, milestone-close authoring
**Confidence:** HIGH (nearly all decisions LOCKED in 66-CONTEXT.md; research surfaces executable line refs, exact grep outputs, and dry-run protocol verified against shipped code)
**Baseline HEAD at research time:** `ad5c9c915dde9143c227d1ab9b026ed21be294fb`

## Summary

Phase 66 is the **v1.6 terminal close-gate** — a 5-wave validation tooling closure phase with unusually LOW research need because all four gray areas (D-01 atomic-commit scope / D-02 C15 narrow-refinement / D-03 fresh-clone re-audit mechanics / D-04 CI workflow trigger surface) were resolved via parallel adversarial review and user-approved. This research surfaces the **executable details** the planner needs to wire concrete `<action>` blocks: exact line refs in the harness, byte-precise diff specifications for the C11 windowKeywords regex and regex-7 back-port, BASELINE_10 comment shape mirroring BASELINE_9 at lines 390/393/396, complete CI-1/CI-2/CI-3 enumeration via verified grep runs, the pre-commit dry-run protocol that explicitly anticipates Phase 65's 3→4 cross-validator-dependency cascade, the PowerShell recipe for the fresh-clone subprocess pattern, and the V-66-NN assertion menu with each assertion verified testable-from-fresh-clone.

**Primary recommendation:** Follow the 5-wave structure recommended in CONTEXT.md `<specifics>` verbatim. The 5th-file budgeting per the V-62-SIDECAR cascade precedent is the single most important planning insight — the atomic commit MUST be designed to grow during dry-run rather than commit prematurely.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Harness assertion semantics (C11/C15/C16) | scripts/validation/v1.6-milestone-audit.mjs | — | Harness is the SOT for v1.6 corpus compliance; check-phase-NN.mjs do not duplicate this logic per `check-phase-65.mjs:306` "Do NOT duplicate C16 logic here" |
| Per-phase structural assertions (V-66-NN) | scripts/validation/check-phase-66.mjs | — | Validator-as-deliverable pattern (STATE.md:103); ships in Phase 66; runs CHAIN subprocess to verify check-phase-{62..65}.mjs |
| External-URL rotting tracking | scripts/validation/v1.6-audit-allowlist.json `c13_rotting_external` | CI workflow `rotting-external-quarterly` job | Sidecar holds the enumerated list; CI cron triggers quarterly markdown-link-check |
| Line-number drift tracking | scripts/validation/regenerate-supervision-pins.mjs BASELINE_10 | — | BASELINE_9 history at lines 390/393/396 documents prior refreshes; Phase 66 extends with BASELINE_10 closing v1.5 carry-over |
| CI gate enforcement | .github/workflows/audit-harness-v1.6-integrity.yml | — | Path-A from v1.5 workflow; PR-blocking; weekly bitrot cron + new quarterly cron |
| Terminal re-audit | Fresh git clone subprocess via fresh gsd-executor sub-agent | scripts/validation/v1.6-milestone-audit.mjs + chain | D-03 reconciles D-22 INTENT with `use_worktrees:false` constraint via stricter physical isolation (separate .git/) |
| Milestone close authoring | .planning/milestones/v1.6-MILESTONE-AUDIT.md + v1.6-DEFERRED-CLEANUP.md | PROJECT.md / ROADMAP.md / STATE.md flips | YAML frontmatter + mechanical_checks block per v1.5 template; DEFERRED-CLEANUP is the NEW v1.6-specific artifact (no v1.5 equivalent) |

## Standard Stack

### Core (existing — Phase 66 EXTENDS, does not author)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js | 20.x (per CI workflow `with: { node-version: '20' }`) | Validator runtime | [VERIFIED: .github/workflows/audit-harness-v1.5-integrity.yml:30] Pinned across v1.4/v1.4.1/v1.5 CI lineage |
| Built-in `node:fs` / `node:path` / `node:child_process` | Node 20 stdlib | File reads + subprocess invocation for chain validators | [VERIFIED: check-phase-65.mjs:19-22] Zero external runtime deps — atomic-commit constraint precludes adding npm dependencies |
| PowerShell | Windows host built-in | Fresh-clone subprocess driver | [VERIFIED: env: shell PowerShell; CONTEXT.md D-03] `git clone --no-hardlinks` + `Set-Location` + `Remove-Item -Recurse -Force` |

### Supporting (Phase 66 adds)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `markdown-link-check` | LATEST (npm) | Quarterly external-URL link-check job | Only inside CI `rotting-external-quarterly` job; not invoked by harness directly |

**No external npm dependencies added to the validator binaries.** The harness + chain validators must remain zero-runtime-deps to preserve the "no shell invocations; no subprocess except chain regression-guard" boundary documented at 62-08-PLAN.md:501.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `markdown-link-check` (Node) | `lychee` (Rust) | lychee is faster + better at concurrent crawls; rejected because v1.5 + v1.4 CI lineage uses markdown-link-check (Path-A inheritance contract) — adding lychee would break the lineage [CITED: implied by Path-A doctrine at STATE.md:103] |
| Fresh `git clone` for re-audit | `git worktree add` | worktree is faster + smaller disk footprint; rejected by D-03 because `use_worktrees:false` is user-locked constraint AND clone provides stricter physical isolation (separate `.git/`) |

**Installation (for CI workflow only — never npm-installed by the harness):**

```yaml
# Inside the rotting-external-quarterly job step:
- run: npm install -g markdown-link-check@latest
```

**Version verification:** `npm view markdown-link-check version` — research did NOT verify this against the npm registry because the package is OUT OF SCOPE for the atomic harness commit; it is referenced only inside the CI YAML and the planner must run `npm view` during Wave 3 plan authoring to record the verified version + publish date. Tag as `[ASSUMED]` in PLAN.md until verified.

## Package Legitimacy Audit

**N/A for this phase.** Phase 66 installs ZERO external packages into the repository:
- The harness + chain validators import only `node:fs`, `node:path`, `node:child_process`, `node:process` (all Node.js stdlib).
- The single external tool reference (`markdown-link-check`) lives inside a CI YAML job step that is gated by `if: schedule == '0 8 1 1,4,7,10 *'` and runs INSIDE the GitHub Actions runner, NOT inside the project workspace.
- No package.json additions; no requirements.txt additions; no Cargo.toml additions.

If slopcheck were applicable, the only candidate would be `markdown-link-check` — which has been in use across v1.4/v1.5 CI workflows and is a well-known Node ecosystem tool. The planner should verify with `npm view markdown-link-check` during Wave 3 anyway (defense-in-depth), and tag the specific pinned version in the CI YAML.

## Architecture Patterns

### System Architecture Diagram

```
[ Phase 65 close baseline (HEAD ad5c9c9; chain green) ]
                            │
                            ▼
   ┌─────────────────────────────────────────────────────┐
   │  Wave 1: check-phase-66.mjs scaffold + ABAUDIT walk │
   │  (V-66-NN assertions + V-66-ABAUDIT-STALENESS)      │
   └─────────────────────┬───────────────────────────────┘
                         │
                         ▼  (V-66-NN initially RED; reds resolved by Wave 2)
   ┌─────────────────────────────────────────────────────┐
   │  Wave 2: AUDIT-14 atomic harness commit             │
   │  ─────────────────────────────────────────────────  │
   │  Inputs (working tree, NOT yet staged):             │
   │   • v1.6-milestone-audit.mjs  (C11 +6 tokens @:577) │
   │   •   + regex-7 synthetic back-port @:854           │
   │   • v1.6-audit-allowlist.json (c13_rotting_external │
   │     populated; quarterly_audit metadata)            │
   │   • regenerate-supervision-pins.mjs (BASELINE_10    │
   │     freshness comment @ ~line 398)                  │
   │   • check-phase-66.mjs (V-66 assertions)            │
   │   • [BUDGET] check-phase-62.mjs V-62-SIDECAR ext.   │
   │                                                     │
   │  Pre-commit dry-run loop (MANDATORY):               │
   │    └─→ harness + --self-test + chain 62→66          │
   │        ANY RED → add reconciling file → re-loop    │
   │                                                     │
   │  ATOMIC COMMIT (single SHA; git log --name-only -1) │
   └─────────────────────┬───────────────────────────────┘
                         │
                         ▼
   ┌─────────────────────────────────────────────────────┐
   │  Wave 3: CI workflow + DEFERRED-CLEANUP.md          │
   │   • .github/workflows/audit-harness-v1.6-integrity  │
   │     (Path-A from v1.5; 14 path-filter + 2 crons +   │
   │      rotting-external-quarterly job)                │
   │   • v1.6-DEFERRED-CLEANUP.md (CI-1/CI-2/CI-3 +      │
   │     CHAIN_SKIP-CRLF)                                │
   └─────────────────────┬───────────────────────────────┘
                         │
                         ▼
   ┌─────────────────────────────────────────────────────┐
   │  Wave 4: Terminal re-audit (FRESH gsd-executor      │
   │  sub-agent + FRESH git clone in $env:TEMP)          │
   │                                                     │
   │  PowerShell: git clone --no-hardlinks               │
   │              D:\claude\Autopilot                    │
   │              $env:TEMP\v1.6-audit-<rand>            │
   │  cd $auditPath                                      │
   │  node v1.6-milestone-audit.mjs    │── capture       │
   │  node check-phase-{62..66}.mjs    │── exit codes    │
   │                                   │── + summary     │
   │  cd D:\claude\Autopilot                             │
   │  Remove-Item -Recurse -Force $auditPath             │
   └─────────────────────┬───────────────────────────────┘
                         │
                         ▼
   ┌─────────────────────────────────────────────────────┐
   │  Wave 5: Milestone-close authoring                  │
   │   • .planning/milestones/v1.6-MILESTONE-AUDIT.md    │
   │     (YAML + mechanical_checks + performed_by D-22+  │
   │      D-03 divergence narrative + 39/39 + 5/5)       │
   │   • PROJECT.md Active→Validated (39 reqs)           │
   │   • ROADMAP.md Progress 5/5 + Phase 66 [x]          │
   │   • STATE.md milestone close                        │
   │   • 66-VERIFICATION.md (close-gate report)          │
   └─────────────────────────────────────────────────────┘
```

### Recommended Project Structure

No new directories. Phase 66 modifies existing trees only:

```
scripts/validation/
├── v1.6-milestone-audit.mjs       # EXTEND lines 577 + 854
├── v1.6-audit-allowlist.json      # POPULATE c13_rotting_external (line 79)
├── regenerate-supervision-pins.mjs # ADD BASELINE_10 comment (~line 398)
├── check-phase-62.mjs             # PROBABLE 5th-file extension at V-62-SIDECAR
└── check-phase-66.mjs             # NEW (Path-A from check-phase-65.mjs)

.github/workflows/
└── audit-harness-v1.6-integrity.yml  # NEW (Path-A from v1.5; coexists with v1.4 + v1.5 workflows)

.planning/milestones/
├── v1.6-MILESTONE-AUDIT.md        # NEW (template from v1.5-MILESTONE-AUDIT.md)
└── v1.6-DEFERRED-CLEANUP.md       # NEW (no v1.5 equivalent)

.planning/phases/66-.../
└── 66-VERIFICATION.md             # NEW (close-gate report)
```

### Pattern 1: Atomic Harness Commit with 5th-File Budget

**What:** All AUDIT-14 sub-actions land in ONE indivisible commit (D-01 LOCKED). Pre-commit dry-run loop is MANDATORY and explicitly designed to discover cross-validator dependencies that grow the file set from N planned to N+1 (or N+2) actual.

**When to use:** Whenever the commit touches shape-vs-content invariants across multiple validators. AUDIT-14's surface (C11 keyword tokens reference prose patterns whose exemption posture lives in c13_rotting_external; the c13 shape affects V-62-SIDECAR's structural assertion) has the same cross-state dependency topology as Phase 65's 3→4 cascade.

**Example (verified Phase 65 cascade at 65-VERIFICATION.md:255-261):**
```
Plan 65-04 specified 3 files for the atomic commit.
Wave 4 dry-run revealed: emptying c16_missing_endpoint_exemptions
made check-phase-62.mjs V-62-SIDECAR (asserting length === 4) FAIL,
which cascaded CHAIN-62/CHAIN-63 → check-phase-64 → check-phase-65.
Resolution: V-62-SIDECAR flipped to length === 0 [RECONCILED Phase 65];
added as 4th file to atomic commit `8721a63`.
```

### Pattern 2: Validator-as-Deliverable (chain continuation)

**What:** `check-phase-66.mjs` is authored in Phase 66 (this phase) as a Path-A copy from `check-phase-65.mjs`. Runs CHAIN subprocess for check-phase-{48..65}.mjs via the `execFileSync` pattern at `check-phase-65.mjs:292`. Does NOT include 66 in its own CHAIN_PHASES (per V-NN-SELF pattern at `check-phase-65.mjs:328`).

**When to use:** Every per-phase validator. Codified at STATE.md:103.

**Example (from check-phase-65.mjs:47):**
```javascript
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
// Phase 65 = self; Phase 66 RUNS this from the fresh clone
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);  // Windows-CRLF
```

For `check-phase-66.mjs`, extend to:
```javascript
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);  // unchanged — Windows host
```

### Pattern 3: Auditor-Independence via Fresh-Context Spawn (D-22 INTENT preserved through D-03 divergence)

**What:** The terminal re-audit must be run by an agent with ZERO context-carryover from the content-author plans (Plans 66-01..N). D-22's literal mechanism is `git worktree`; D-03 substitutes `git clone --no-hardlinks` (stricter physical isolation: separate `.git/`) plus a fresh `gsd-executor` sub-agent spawn (zero context).

**When to use:** Every milestone close-gate audit. Replaces the v1.4.1/v1.5 worktree pattern wherever the user has set `use_worktrees:false`.

**Example PowerShell (canonical recipe, verified against env):**
```powershell
$rand = -join ((48..57) + (97..122) | Get-Random -Count 8 | ForEach-Object {[char]$_})
$auditPath = "$env:TEMP\v1.6-audit-$rand"

git clone --no-hardlinks D:\claude\Autopilot $auditPath
Push-Location $auditPath

# Capture exit codes into a structured hashtable
$results = [ordered]@{}
$cmds = @(
    @{name='harness';      path='scripts/validation/v1.6-milestone-audit.mjs'},
    @{name='check-phase-62'; path='scripts/validation/check-phase-62.mjs'},
    @{name='check-phase-63'; path='scripts/validation/check-phase-63.mjs'},
    @{name='check-phase-64'; path='scripts/validation/check-phase-64.mjs'},
    @{name='check-phase-65'; path='scripts/validation/check-phase-65.mjs'},
    @{name='check-phase-66'; path='scripts/validation/check-phase-66.mjs'}
)
foreach ($c in $cmds) {
    $stdout = & node $c.path 2>&1
    $exit = $LASTEXITCODE
    $summary = ($stdout | Select-String -Pattern 'Summary:|Result:' | Select-Object -Last 1).ToString()
    $results[$c.name] = @{exit = $exit; summary = $summary}
    Write-Host "[$($c.name)] exit=$exit | $summary"
}

# Persist results for v1.6-MILESTONE-AUDIT.md mechanical_checks block
$results | ConvertTo-Json -Depth 3 | Out-File "$env:TEMP\v1.6-audit-results.json" -Encoding utf8

Pop-Location
Remove-Item -Recurse -Force $auditPath
```

### Anti-Patterns to Avoid

- **Premature commit before dry-run dependency discovery:** Splitting AUDIT-14 across multiple commits will RED the chain in intermediate states. The 3→4 cascade at Phase 65 (`65-VERIFICATION.md:255-261`) is the canonical lesson. The planner MUST explicitly include the "discover-and-add-5th-file" step in PLAN.md Wave 2 task `<action>` blocks.
- **Adding new C15 regexes during refinement:** Option B in D-02 was scored 9 (worst) because adding regexes retroactively flags shipped PASS content (`00-overview.md:29`, `02-ous-architecture.md:14`) — forcing new ABAUDITs OUTSIDE 18-, violating Phase 64 D-08 SOT-host contract.
- **Worktree fallback "just in case":** D-03 rejected Option D (worktree-first with fallback) score 6 because it directly contradicts `use_worktrees:false`. Use clone exclusively.
- **Modifying older workflows:** D-04 LOCKS that `audit-harness-integrity.yml` (v1.4) and `audit-harness-v1.5-integrity.yml` (v1.5) are NOT modified. Coexistence pattern: three parallel YAMLs.
- **Self-recursion in check-phase-66.mjs CHAIN_PHASES:** V-NN-SELF assertion exists explicitly to catch this; check-phase-65.mjs:328 is the template.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| External URL link-checking | Custom curl/HTTP client | `markdown-link-check` inside CI quarterly job | Wheel-reinvention; lineage already uses mlc in v1.5 CI |
| YAML schema validation | Custom JS validator | Treat the CI YAML as a Path-A copy from v1.5 — no validation needed | Schema-divergence risk is exactly what Path-A copy prevents |
| Git clone wrapper | Custom subprocess helper | `git clone --no-hardlinks` invoked from PowerShell | Built-in; no abstraction needed |
| Random temp-dir suffix | UUID library | `Get-Random` PowerShell built-in OR `-join ((48..57) + (97..122) | Get-Random -Count 8 ...)` | Built-in; no module dep |
| JSON validation for sidecar | JSON schema validator | `JSON.parse(...)` in `try/catch` (existing V-62-SIDECAR pattern at check-phase-62.mjs:286) | The shipped pattern works; don't change it |

**Key insight:** Phase 66 is a tooling-closure phase, not a tooling-introduction phase. Resist the urge to add new dependencies, abstractions, or schemas. Every new artifact (DEFERRED-CLEANUP.md, MILESTONE-AUDIT.md, CI YAML) has a direct template precedent in v1.5.

## Common Pitfalls

### Pitfall 1: Cross-validator dependency cascade during atomic-commit dry-run

**What goes wrong:** A change to v1.6-audit-allowlist.json `c13_rotting_external` (going from `[]` to a populated object) silently changes the JSON shape that check-phase-62.mjs V-62-SIDECAR currently asserts (`c16.length === 0`). If check-phase-62.mjs has an assertion on c13's shape (likely added in the AUDIT-14 surface change), the new shape will fail an old assertion until the validator is updated in the SAME commit.

**Why it happens:** The chain enforces shape-vs-content invariants across commits. A single-file change can red an upstream validator that asserted a previous shape.

**How to avoid:** Mandatory pre-commit dry-run loop (CONTEXT.md D-01 pre-commit dry-run protocol). The loop:
1. Stage all candidate files (`git add` but do NOT commit)
2. Run `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/v1.6-milestone-audit.mjs --self-test && node scripts/validation/check-phase-62.mjs && node scripts/validation/check-phase-63.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs && node scripts/validation/check-phase-66.mjs`
3. If any RED, add the reconciling file (`[RECONCILED Phase 66]` label per V-64-05 / V-62-SIDECAR precedent) to staged set; re-loop from step 1
4. Only commit when fully green

**Warning signs:**
- check-phase-62 RED after staging — V-62-SIDECAR shape mismatch (likely needs extension to validate `c13_rotting_external` shape too)
- check-phase-63/64/65 RED with "CHAIN-62: check-phase-62.mjs FAIL: ..." — cascading from V-62-SIDECAR
- harness RED with "C13: ... allowlist count mismatch" — c13_broken_link_allowlist count assertion (existing v1.6-milestone-audit.mjs:670 asserts `length === 15` for the OTHER c13 array; do NOT confuse with c13_rotting_external)

### Pitfall 2: CRLF on Windows fresh-clone

**What goes wrong:** The fresh-clone runs on the same Windows host (`use_worktrees:false` doesn't change this). CRLF line endings reappear in the cloned repo; check-phase-{48,51,58,60,61}.mjs continue to fail on Windows-CRLF-related assertions.

**Why it happens:** Documented at check-phase-64.mjs:65-73 — pre-existing failures unrelated to Phase 66. Resolution requires a CI-Linux job (deferred to v1.7 per D-03).

**How to avoid:** CHAIN_SKIP `{48, 51, 58, 60, 61}` must REMAIN active in check-phase-66.mjs (same as check-phase-65.mjs:69). The fresh-clone exit codes will still show 0 for the harness + check-phase-{62..66} because the SKIP-set handles the failures gracefully. **Explicitly document in v1.6-MILESTONE-AUDIT.md `mechanical_checks.notes`** that CHAIN_SKIP entries remain suppressed-as-justified on Windows host.

**Warning signs:**
- Fresh-clone re-audit shows check-phase-51 / check-phase-58 fail standalone — expected (these pre-date Phase 66)
- check-phase-62..65 exit 0 with `5 SKIPPED` entries in their result lines — expected

### Pitfall 3: `business.apple.com` is NOT a rotting URL (false-positive in c13_rotting_external)

**What goes wrong:** The planner naively enumerates all `business.apple.com` URLs into `c13_rotting_external`. But PITFALLS.md:619 confirms `business.apple.com` is RETAINED per Apple newsroom + support guide post-rebrand. The rotting candidates are specifically the **`support.apple.com/guide/apple-business-manager/...`** path-prefix URLs (legacy support guide tree).

**Why it happens:** Misreading "ABM URL refs" as "any URL containing business.apple.com". The actual rot risk is the legacy support-guide tree migration.

**How to avoid:** Use the precise grep pattern: `grep -rn 'support\.apple\.com/guide/apple-business-manager'` for the actual rot candidates. The 4 verified ABM URL refs at research time (HEAD ad5c9c9) are:
```
docs/admin-setup-ios/05-app-deployment.md:92     → https://business.apple.com (LIVE — exclude or low-priority)
docs/admin-setup-macos/01-abm-configuration.md:52 → https://business.apple.com (LIVE — exclude or low-priority)
docs/admin-setup-macos/04-app-deployment.md:105   → https://business.apple.com (LIVE — exclude or low-priority)
docs/_glossary-macos.md:64                        → https://business.apple.com (LIVE — exclude or low-priority)
```

**The ~30-count from CONTEXT.md and PITFALLS.md:617 reflects historical estimates; the actual measured count at HEAD ad5c9c9 is 4 distinct `business.apple.com` refs and 0 `support.apple.com/guide/apple-business-manager/` refs.** The planner should record this discovery in the c13_rotting_external metadata as a calibration finding (the population is smaller than the v1.6-CONTEXT estimate — DEFERRED-CLEANUP.md should note this).

**Warning signs:** A populated c13_rotting_external array with >30 entries — over-collection (likely includes live URLs).

### Pitfall 4: ABAUDIT staleness walk produces false orphans on multi-line content

**What goes wrong:** V-66-ABAUDIT-STALENESS checks that the `next_line` after each `<!-- ABAUDIT-NN: ... -->` comment triggers a C15 banned-phrase regex. But the ABAUDIT line-pair logic at v1.6-milestone-audit.mjs:735-740 exempts BOTH line `i` AND line `i+1`. If the comment is followed by a blank line OR a non-content line (e.g., a markdown table row above the actual banned phrase), the staleness check will erroneously mark the comment as orphaned.

**Why it happens:** Logical asymmetry: the harness's exemption logic includes a 1-line buffer; a strict staleness check that only inspects line `i+1` doesn't match the same window.

**How to avoid:** Mirror the harness exemption logic exactly. The V-66-ABAUDIT-STALENESS validator must check that **at least one of `lines[i+1]` matches any of the 8 production C15 regexes**. The current ABAUDIT inventory (24 comments across 11 files) at HEAD ad5c9c9 is:

| File | Count | Lines |
|------|-------|-------|
| `docs/cross-platform/apple-business/00-overview.md` | 3 | 10, 28, 68 |
| `docs/cross-platform/apple-business/06-mdm-server-assignment.md` | 1 | 12 |
| `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` | 2 | 13, 84 |
| `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` | 2 | 13, 116 |
| `docs/cross-platform/apple-business/13-device-release-runbook.md` | 2 | 12, 74 |
| `docs/cross-platform/apple-business/14-device-transfer-runbook.md` | 3 | 12, 73, 97 |
| `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` | 1 | 12 |
| `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` | 1 | 14 |
| `docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md` | 1 | 14 |
| `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md` | 7 | 42, 44, 47, 50, 52, 54, 56 |
| `docs/admin-setup-macos/01-abm-configuration.md` | 1 | 51 |
| **TOTAL** | **24** | — |

Note: ABAUDIT numbering is non-contiguous (e.g., `18-cross-org-boundary-cheat-sheet.md` carries ABAUDIT-17..23 with 17,18,19,20,23,21,22 in that source-order at lines 42-56). The validator must walk by FILE ORDER not by NN-order. The Phase 64 file `12-:201` and `18-:120` lines also contain the text "ABAUDIT-" inside Version History prose — these are NOT exemption comments and must be excluded (regex anchor at line start of `<!--\s*ABAUDIT-`).

**Warning signs:** Validator reports >0 orphans on first run — likely a false-positive caused by either (a) blank line between comment and content, or (b) Version History prose match. Investigate before removing any comment.

### Pitfall 5: 5th file slot in atomic commit not budgeted in PLAN.md task

**What goes wrong:** Plan author writes Wave 2 task with `files_modified` listing 4 files (per the initial atomic commit specification). Executor runs dry-run, discovers a 5th file is needed, but the plan's `files_modified` block doesn't include it — the gsd-executor's must-haves validator FAILS the plan even though the atomic commit is correctly applied.

**Why it happens:** Plan authoring is upstream of dry-run discovery. The 5th file is empirically derived during execution.

**How to avoid:** Either (a) list `scripts/validation/check-phase-62.mjs` in `files_modified` upfront as a "probable 5th file" with a `<!-- discovered during dry-run; may not modify if c13 shape doesn't conflict -->` comment in the plan, or (b) treat the dry-run extension as an in-scope expansion and have the executor's must-haves block reflect "4-5 files in single commit; final count determined by dry-run cascade discovery." Option (a) is safer because it matches Phase 65's 65-04-PLAN convention.

## Runtime State Inventory

> Phase 66 is a TOOLING-CLOSURE phase, not a rename/refactor. Most categories are N/A.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — verified by `grep -rn "ABAUDIT-\|c13_rotting_external\|BASELINE_10" .planning/` (no database/datastore stores any Phase 66 string) | none |
| Live service config | None — verified by `ls .github/workflows/` (only 2 existing audit workflows; coexistence is the explicit pattern) | none |
| OS-registered state | None — Phase 66 ships no scheduled tasks, daemons, or pm2 processes | none |
| Secrets/env vars | None — Phase 66 ships no .env files or secret references; the CI workflow uses standard GitHub Actions context | none |
| Build artifacts / installed packages | None — Phase 66 ships zero npm/pip/cargo installs into the repo | none |

**Nothing found in any category.** Phase 66's "runtime state" is entirely git-tracked (validators + YAMLs + Markdown). The fresh-clone re-audit explicitly exercises this — anything that survives clone is in-tree; nothing else exists to migrate.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validators | ✓ (verified — v1.5 + Phase 65 chain runs green at HEAD ad5c9c9) | 20.x (per CI YAML) | none — blocking if missing |
| Git | Fresh-clone Wave 4 + commit operations | ✓ (verified — current HEAD ad5c9c9) | system git | none — blocking if missing |
| PowerShell | Wave 4 fresh-clone subprocess driver | ✓ (verified — env.shell = PowerShell on Windows host) | 5.x or 7.x (system) | bash equivalent recipe (low priority — D-03 specifies PowerShell) |
| Write access to `$env:TEMP` | Fresh-clone Wave 4 target | ✓ (assumed; typical Windows user has this) | — | use other writable temp dir; document in MILESTONE-AUDIT.md performed_by |
| Disk space (~50-100 MB for fresh clone) | Wave 4 | ✓ (assumed) | — | none — blocking if disk full; verify before clone |
| `markdown-link-check` (CI only) | CI workflow `rotting-external-quarterly` job | N/A locally (CI installs it) | LATEST at install time | CI step pinned via `npm install -g markdown-link-check@<pinned>` |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None.

## Validation Architecture

> Required (workflow.nyquist_validation not explicitly false in config.json — treat as enabled).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom Node.js validators (`v1.6-milestone-audit.mjs` + `check-phase-NN.mjs` chain) — no external test framework |
| Config file | None — validators are self-contained; sidecar is `scripts/validation/v1.6-audit-allowlist.json` |
| Quick run command | `node scripts/validation/check-phase-66.mjs` (Phase 66 self-validation; ~5 seconds) |
| Full suite command | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-62.mjs && node scripts/validation/check-phase-63.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs && node scripts/validation/check-phase-66.mjs` (~30-60 seconds; subprocess chain) |
| Self-test command | `node scripts/validation/v1.6-milestone-audit.mjs --self-test` (synthetic C14/C15/C16 + `+` parser tests; existing at v1.6-milestone-audit.mjs:813+) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDIT-14 | C11 windowKeywords extended with 6 LOCKED tokens | unit | `node scripts/validation/check-phase-66.mjs` (V-66-01) | Wave 1 creates check-phase-66.mjs |
| AUDIT-14 | `c13_rotting_external` populated with CI-1/CI-2/CI-3 + quarterly_audit metadata | unit | `node scripts/validation/check-phase-66.mjs` (V-66-02) | Wave 1 |
| AUDIT-14 | BASELINE_10 freshness comment present in regenerate-supervision-pins.mjs | unit | `node scripts/validation/check-phase-66.mjs` (V-66-03) | Wave 1 |
| AUDIT-14 | Synthetic regex 7 (line 854) matches production (line 725) negative-lookahead | unit | `node scripts/validation/v1.6-milestone-audit.mjs --self-test` AND `node scripts/validation/check-phase-66.mjs` (V-66-04) | self-test exists; V-66-04 in Wave 1 |
| AUDIT-14 | 24 ABAUDIT comments all have C15-banned `next_line` (no orphans) | unit | `node scripts/validation/check-phase-66.mjs` (V-66-ABAUDIT-STALENESS) | Wave 1 |
| AUDIT-14 | Atomic commit landed (all 4-5 files in 1 SHA) | manual + grep | `git log --name-only -1 HEAD` shows 4-5 files | Wave 2 verification |
| AUDIT-15 | `.github/workflows/audit-harness-v1.6-integrity.yml` exists with both crons + new job + 14 path-filter entries | unit | `node scripts/validation/check-phase-66.mjs` (V-66-05) | Wave 3 |
| AUDIT-15 | v1.6-MILESTONE-AUDIT.md exists with YAML frontmatter + 39/39 + 5/5 | unit | `node scripts/validation/check-phase-66.mjs` (V-66-06) | Wave 5 |
| AUDIT-15 | v1.6-DEFERRED-CLEANUP.md exists with CI-1/CI-2/CI-3 + CHAIN_SKIP-CRLF | unit | `node scripts/validation/check-phase-66.mjs` (V-66-07) | Wave 3 |
| AUDIT-15 | Terminal re-audit from fresh clone exits 0 | subprocess (manual capture) | PowerShell recipe in Pattern 3 above | Wave 4 |
| AUDIT-15 | All 5 chain validators check-phase-{62..66} exit 0 modulo CHAIN_SKIP | unit | `node scripts/validation/check-phase-66.mjs` (V-66-CHAIN) | Wave 1 |
| AUDIT-15 | v1.6-milestone-audit.mjs exits 0 with C14/C15/C16 PASS | unit | `node scripts/validation/check-phase-66.mjs` (V-66-AUDIT subprocess) | Wave 1 |
| AUDIT-15 | check-phase-66.mjs does NOT include 66 in CHAIN_PHASES (no self-reference) | unit | `node scripts/validation/check-phase-66.mjs` (V-66-SELF) | Wave 1 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-66.mjs` (single command; ~5s when chain validators run from cache, ~30-60s cold)
- **Per wave merge:** full suite (harness + all 5 chain validators + --self-test)
- **Phase gate:** Full suite green from FRESH CLONE before `/gsd:verify-work` invocation

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-66.mjs` does not yet exist (Wave 1 deliverable; Path-A copy from `check-phase-65.mjs`)
- [ ] `.github/workflows/audit-harness-v1.6-integrity.yml` does not yet exist (Wave 3 deliverable)
- [ ] `.planning/milestones/v1.6-MILESTONE-AUDIT.md` does not yet exist (Wave 5 deliverable)
- [ ] `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` does not yet exist (Wave 3 deliverable; NEW artifact with no v1.5 equivalent)

*All other test infrastructure (v1.6-milestone-audit.mjs, check-phase-62..65.mjs, sidecar) already exists and is green at HEAD ad5c9c9.*

## Security Domain

> `security_enforcement` is not explicitly false in config — applying anyway. Phase 66 is a tooling/closure phase with very narrow security surface.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | n/a — no auth surface |
| V3 Session Management | no | n/a |
| V4 Access Control | no | n/a |
| V5 Input Validation | minor | The fresh-clone PowerShell recipe accepts no untrusted input; `$rand` is generated locally. JSON parsing of sidecar uses `try/catch` (existing pattern at check-phase-62.mjs:286). |
| V6 Cryptography | no | n/a — never hand-roll |
| V14 Configuration | yes | CI workflow YAML — preserve `continue-on-error: false` on all primary jobs (D-A9 fully-blocking); only `pin-helper-advisory` retains `continue-on-error: true` (Phase 43 D-14 / Phase 48 D-22 precedent at v1.5 line 297) |

### Known Threat Patterns for {Phase 66 stack}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Subprocess hijacking via PATH manipulation (Wave 4 PowerShell calls `node` and `git`) | Tampering | Use absolute paths if running under untrusted contexts; in this case Wave 4 runs locally on a dev machine — risk is N/A |
| Temp-dir collision attack (`$env:TEMP\v1.6-audit-<rand>` predictable) | Tampering | 8-char random suffix from `Get-Random` provides sufficient entropy for local single-user context; for higher-security environments, use `[System.IO.Path]::GetRandomFileName()` |
| Commit-message injection via dry-run output | Information disclosure | Commit messages are human-authored from the template at 62-08-PLAN.md:449-468; no untrusted input flows into them |
| CI YAML injection via path-filter expansion | Tampering | Path-filter list is human-authored from D-04 LOCKED 14-entry list; no expansion patterns beyond shell globs |

## Code Examples

Verified patterns from existing code:

### Example 1: BASELINE_10 freshness comment shape (mirror BASELINE_9 at lines 390/393/396)

```javascript
// Source: scripts/validation/regenerate-supervision-pins.mjs:386-398 (verified at HEAD ad5c9c9)
// Pre-expansion 9-pin baseline S1..S9 (hard-coded from commit e5e45db).
// The self-test subtracts this baseline from the current sidecar's supervision_exemptions[]
// to derive the NEW-pin set (Phase 43 hand-authored). Classifier output's Tier-1 set
// must reproduce this NEW-pin set exactly.
// BASELINE_9 refreshed 2026-04-26 (Phase 48 Plan 01): original S1..S9 pre-Phase-43 pin coordinates
// updated to current line positions after Phase 44-46 content additions (Private Space H3 insertion,
// frontmatter freshness adds, COPE see-also blockquote I2). See 48-CONTEXT.md D-14 + 48-RESEARCH.md §BASELINE_9.
// BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 06): Phase 59 line positions
// updated to current after Phase 60 _glossary-android.md #kme/#kpe HTML-shim
// insertion at lines 127 and 134 (net +2 lines after line 126).
// BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08): _glossary-android.md entries refreshed
// to post-Plan-06 line coords (#kme/#kpe shims caused +2 shift after line 127); aligns with
// current sidecar supervision_exemptions[] AT v1.5 close. Closes AUDIT-07 carry-over per CONTEXT D-19.
const BASELINE_9 = [
  ['docs/_glossary-android.md', 79],   // ...
  ...
];
```

**BASELINE_10 ADDITION (Phase 66 mirror — exact shape to add at ~line 398, before `const BASELINE_9 = [`):**

```javascript
// BASELINE_10 refreshed 2026-05-24 (Phase 66 Plan 66-NN): closes BASELINE_9 v1.5 carry-over
// per AUDIT-14 contract (REQUIREMENTS.md:63 + ROADMAP.md:239); v1.6 line positions verified
// against HEAD ad5c9c9 (Phase 65 close-gate baseline). BASELINE_9 entries above remain unchanged
// — Phase 66 does NOT alter the line-coord array; this comment records the audit-trail event
// that line-positions were re-verified at Phase 66 close and remain valid for the v1.6 corpus.
// Resolution path: BASELINE_11 will refresh at v1.7 close per the Path-A inheritance pattern
// (v1.4.1 → BASELINE_8 → v1.5 → BASELINE_9 → v1.6 → BASELINE_10).
```

**Rationale for the "no array change" shape:** The Phase 65 close-gate already confirmed all v1.5 supervision pins (the 9 BASELINE_9 entries) are still at the correct line positions post-Phase-62 banner additions (verified by check-phase-65.mjs exit 0 with V-65-CHAIN PASS). AUDIT-14's BASELINE_10 contract is to REFRESH the audit trail comment (close the v1.5 carry-over), not to mutate the coordinate array. If a future plan author discovers a line-position drift, the proper response is to update `supervision_exemptions[]` in `v1.6-audit-allowlist.json` (not the BASELINE_9 array itself, which is the historical snapshot).

### Example 2: C11 windowKeywords regex extension at v1.6-milestone-audit.mjs:577

```javascript
// Source: scripts/validation/v1.6-milestone-audit.mjs:577 (verified at HEAD ad5c9c9)
// CURRENT (Phase 65 close state):
const windowKeywords = /successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout/i;
```

**PHASE 66 ADDITION (exact diff — add 6 LOCKED tokens per ROADMAP.md:239):**

```javascript
// AFTER Phase 66 atomic commit:
const windowKeywords = /successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout|apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary/i;
```

**6 tokens added (verbatim from CONTEXT.md D-01 file 1 + ROADMAP.md:239):**
1. `apple-business-side`
2. `intune-side`
3. `integration-handshake`
4. `owned-by-apple-business`
5. `owned-by-intune`
6. `scope-boundary`

**Verification:** Run `node scripts/validation/v1.6-milestone-audit.mjs --self-test` after the change — existing C11 synthetic tests at lines 813+ should still pass; consider adding 1-2 new synthetic tests verifying the new tokens are recognized as window-exemption signals.

### Example 3: Regex 7 production-vs-synthetic back-port (line 854 catches up to line 725)

```javascript
// Source: scripts/validation/v1.6-milestone-audit.mjs (verified at HEAD ad5c9c9)
// PRODUCTION (line 725) — has extended negative-lookahead:
/\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i,

// SYNTHETIC MIRROR (line 854) — has SHORTER negative-lookahead window AND fewer exclusions:
/\bManaged\s+Apple\s+ID\b(?!.{0,80}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand))/i,
```

**PHASE 66 BACK-PORT (replace line 854 verbatim with line 725 content):**

```javascript
// AFTER Phase 66 atomic commit (line 854 now matches line 725):
/\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i,
```

**Differences being back-ported:**
- Window: `.{0,80}` → `.{0,160}` (160-char negative-lookahead window matches production)
- Added 6 exclusion terms: `|renamed|personal|Apple\s+Business|scopes|ABM|account` (matches production line 725)

**Verification:** The `--self-test` block at lines 813+ uses `C15_BANNED_SYNTH` (line 847-856). After back-port, the synthetic test should still PASS because all existing synthetic test fixtures intentionally use string content that's either entirely banned or unambiguously allowed; the back-port only affects edge cases where the prose contains the new exclusion terms. Add 1-2 synthetic tests confirming a string like "Managed Apple ID continues to use the personal Apple Business account naming" now correctly EXEMPTS (was previously matching the regex pre-back-port).

### Example 4: V-66-NN assertion shape (Path-A from check-phase-65.mjs)

```javascript
// Source pattern: check-phase-65.mjs:71-93 (verified at HEAD ad5c9c9)
// New V-66-01 (analogous shape):
{
  id: 1, name: 'V-66-01: v1.6-milestone-audit.mjs windowKeywords contains 6 LOCKED C11 tokens',
  run() {
    const c = readFile(HARNESS);
    if (c === null) return { pass: false, detail: HARNESS + ' missing' };
    const REQUIRED_TOKENS = [
      'apple-business-side', 'intune-side', 'integration-handshake',
      'owned-by-apple-business', 'owned-by-intune', 'scope-boundary'
    ];
    const missing = REQUIRED_TOKENS.filter(t => !c.includes(t));
    if (missing.length > 0) {
      return { pass: false, detail: 'v1.6-milestone-audit.mjs windowKeywords missing tokens: ' + missing.join(', ') + ' -- AUDIT-14 contract per ROADMAP.md:239' };
    }
    return { pass: true, detail: 'all 6 C11 LOCKED tokens present in windowKeywords' };
  }
},
```

### Example 5: V-66-ABAUDIT-STALENESS validator (mirrors harness exemption logic)

```javascript
// New validator — must mirror v1.6-milestone-audit.mjs:735-740 exemption logic exactly
{
  id: 'ABAUDIT-STALENESS', name: 'V-66-ABAUDIT-STALENESS: every ABAUDIT comment has C15-banned next_line (no orphans)',
  run() {
    // Replicate 8 C15 regexes from harness lines 718-727 verbatim (do NOT import; keep validator self-contained)
    const C15_BANNED = [
      /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i,
      /\bdelegated\s+admin\b.{0,60}\bIntune\b/i,
      /\b(apple\s+business|apple\s+business\s+manager)\s+(role|privilege|permission)\b.{0,60}\bIntune\s+(role|RBAC)\b/i,
      /\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i,
      /\bIntune\b.{0,40}\b(controls?|manages?|owns?)\b.{0,40}\b(Apple\s+Business|ABM)\b.{0,40}\bpermission/i,
      /\b(same\s+as|equivalent\s+to|maps\s+to)\s+Intune\s+(RBAC|role)/i,
      /\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i,
      /\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i,
    ];

    // Scope: mirror appleBusinessDocPaths() — 11 files containing ABAUDIT comments at HEAD ad5c9c9
    const FILES = [
      'docs/cross-platform/apple-business/00-overview.md',
      'docs/cross-platform/apple-business/06-mdm-server-assignment.md',
      'docs/cross-platform/apple-business/11-vpp-catalog-runbook.md',
      'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md',
      'docs/cross-platform/apple-business/13-device-release-runbook.md',
      'docs/cross-platform/apple-business/14-device-transfer-runbook.md',
      'docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md',
      'docs/cross-platform/apple-business/16-managed-apple-account-runbook.md',
      'docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md',
      'docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md',
      'docs/admin-setup-macos/01-abm-configuration.md',
    ];

    const orphans = [];
    for (const file of FILES) {
      const c = readFile(file);
      if (c === null) continue;
      const lines = c.split('\n');
      lines.forEach((ln, i) => {
        // Anchored regex: only match <!-- ABAUDIT-NN: --> at line start (not Version History prose)
        const m = ln.match(/^\s*<!--\s*ABAUDIT-(\d+):/);
        if (!m) return;
        const nextLine = lines[i + 1] || '';
        const triggers = C15_BANNED.some(rx => rx.test(nextLine));
        if (!triggers) {
          orphans.push({ file, comment_line: i + 1, abaudit_nn: m[1], next_line: nextLine.substring(0, 80) });
        }
      });
    }
    if (orphans.length > 0) {
      return { pass: false, detail: orphans.length + ' orphan ABAUDIT comment(s): ' + JSON.stringify(orphans.slice(0, 3)) };
    }
    return { pass: true, detail: '24 ABAUDIT exemptions verified load-bearing (all next_lines trigger ≥1 C15 regex)' };
  }
},
```

### Example 6: Quarterly cron + new CI job (Path-A diff from v1.5 workflow)

```yaml
# Source: .github/workflows/audit-harness-v1.5-integrity.yml:19-20 (verified at HEAD ad5c9c9)
# v1.5 CURRENT — single weekly cron:
  schedule:
    - cron: '0 8 * * 1'   # Weekly bitrot catch: 08:00 UTC every Monday

# v1.6 NEW — two crons (Path-A copy + ADD quarterly per D-04):
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch: 08:00 UTC every Monday
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check: 08:00 UTC on 1st of Jan/Apr/Jul/Oct
```

```yaml
# NEW job appended to v1.6 workflow (template at end of jobs block — pin-helper-advisory remains last; rotting-external goes BEFORE pin-helper):

  rotting-external-quarterly:
    name: Quarterly c13_rotting_external link-check
    runs-on: ubuntu-latest
    needs: harness-run
    if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'
    # DEFAULT continue-on-error: false — quarterly drift FAILS the scheduled run per D-A9 fully-blocking
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Install markdown-link-check
        run: npm install -g markdown-link-check@<PINNED_VERSION>  # planner verifies via `npm view markdown-link-check version` during Wave 3
      - name: Extract URLs from c13_rotting_external
        run: |
          node -e "
            const fs = require('fs');
            const sidecar = JSON.parse(fs.readFileSync('scripts/validation/v1.6-audit-allowlist.json','utf8'));
            const c13 = sidecar.c13_rotting_external || {};
            const urls = [];
            if (Array.isArray(c13.ci_1_abm_urls)) urls.push(...c13.ci_1_abm_urls.map(e => e.url).filter(Boolean));
            // CI-2 + CI-3 entries do not currently carry URLs — they are line-ref tracking only
            fs.writeFileSync('quarterly-urls.txt', urls.join('\n'));
            console.log('Quarterly URL check candidates: ' + urls.length);
          "
      - name: Run markdown-link-check
        run: |
          if [ -s quarterly-urls.txt ]; then
            while IFS= read -r url; do
              markdown-link-check <(echo "[link]($url)") || exit 1
            done < quarterly-urls.txt
          else
            echo "No URLs to check in c13_rotting_external (empty population — DEFERRED-CLEANUP.md notes calibration finding)"
          fi
```

### Exact 14-entry path-filter list (verbatim from CONTEXT.md D-04 — copy into pull_request.paths):

```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.6-*'
      - 'docs/cross-platform/apple-business/**'
      - 'docs/l1-runbooks/34-apple-business-*.md'
      - 'docs/l2-runbooks/26-apple-business-*.md'
      - 'docs/admin-setup-ios/01-abm-configuration.md'
      - 'docs/admin-setup-ios/02-abm-token.md'
      - 'docs/admin-setup-macos/01-abm-configuration.md'
      - 'docs/admin-setup-macos/02-abm-token.md'
      - 'docs/reference/ios-capability-matrix.md'
      - 'docs/operations/00-index.md'
      - 'docs/common-issues.md'
      - 'docs/quick-ref-l1.md'
      - 'docs/quick-ref-l2.md'
      - 'docs/index.md'
      - '.github/workflows/audit-harness-v1.6-integrity.yml'
  schedule:
    - cron: '0 8 * * 1'
    - cron: '0 8 1 1,4,7,10 *'
  workflow_dispatch:
```

**Note:** CONTEXT.md D-04 lists 14 paths but one is the workflow file itself; the YAML list above has 15 entries (14 source paths + 1 workflow self-reference). The 15th entry (the workflow file) is standard CI practice and is included in the spec. CONTEXT.md D-04 documents this — confirm the "14" count refers to source-file paths only (matches 15-1).

## c13_rotting_external Populated Payload (CI-1/CI-2/CI-3 verified enumeration at HEAD ad5c9c9)

```json
{
  "c13_rotting_external": {
    "ci_1_abm_urls": [
      { "url": "https://business.apple.com", "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 92, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand; included for completeness — quarterly check confirms reachability", "category": "live_url_quarterly_check" },
      { "url": "https://business.apple.com", "file": "docs/admin-setup-macos/01-abm-configuration.md", "line": 52, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand", "category": "live_url_quarterly_check" },
      { "url": "https://business.apple.com", "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 105, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand", "category": "live_url_quarterly_check" },
      { "url": "https://business.apple.com", "file": "docs/_glossary-macos.md", "line": 64, "reason": "ABM live portal URL in definitional prose; retained per Apple newsroom post-rebrand", "category": "live_url_quarterly_check" }
    ],
    "ci_2_vpp_location_token": [
      { "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 71, "term": "VPP (Apps and Books) location token", "context": "prerequisites bullet", "reason": "legacy 'VPP location token' term retained per Q5(b) no-corpus-sweep contract; rename deferred to v1.7+ CI-2", "category": "legacy_term_surgical_rename_candidate" },
      { "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 201, "term": "VPP (Apps and Books) location token", "context": "Renewal/Maintenance table row", "reason": "PITFALLS.md:642 canonical CI-2 site #1", "category": "legacy_term_surgical_rename_candidate" },
      { "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 45, "term": "VPP location token", "context": "prerequisites bullet", "reason": "legacy term; rename deferred to v1.7+", "category": "legacy_term_surgical_rename_candidate" },
      { "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 46, "term": "VPP location token", "context": "prerequisites bullet", "reason": "legacy term; rename deferred to v1.7+", "category": "legacy_term_surgical_rename_candidate" },
      { "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 113, "term": "VPP location token", "context": "verification step", "reason": "legacy term; rename deferred to v1.7+", "category": "legacy_term_surgical_rename_candidate" },
      { "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 148, "term": "VPP location token", "context": "Renewal/Maintenance table row", "reason": "PITFALLS.md:642 canonical CI-2 site #2", "category": "legacy_term_surgical_rename_candidate" }
    ],
    "ci_3_managed_apple_id": [
      { "file": "docs/admin-setup-android/04-byod-work-profile.md", "count": 1, "reason": "Managed Apple ID legacy term; rename deferred to v1.7+ contingent on Microsoft Intune adopting rebrand per REQUIREMENTS.md:74" },
      { "file": "docs/admin-setup-ios/00-overview.md", "count": 2 },
      { "file": "docs/admin-setup-ios/02-abm-token.md", "count": 2 },
      { "file": "docs/admin-setup-ios/08-user-enrollment.md", "count": 17, "reason": "PITFALLS.md:665 canonical CI-3 pervasive-site; highest density" },
      { "file": "docs/admin-setup-ios/09-mam-app-protection.md", "count": 1 },
      { "file": "docs/admin-setup-macos/01-abm-configuration.md", "count": 5 },
      { "file": "docs/cross-platform/apple-business/02-ous-architecture.md", "count": 1, "reason": "Phase 62 deliverable — uses legacy term in cross-reference context only" },
      { "file": "docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md", "count": 1, "reason": "Phase 63 deliverable" },
      { "file": "docs/ios-lifecycle/01-ade-lifecycle.md", "count": 2 },
      { "file": "docs/l1-runbooks/17-ios-ade-not-starting.md", "count": 2 },
      { "file": "docs/macos-lifecycle/00-ade-lifecycle.md", "count": 2 },
      { "file": "docs/reference/android-capability-matrix.md", "count": 1 },
      { "file": "docs/_glossary-android.md", "count": 1 },
      { "file": "docs/_glossary-apple-business.md", "count": 3, "reason": "Phase 62 glossary — intentional legacy↔new term reciprocity per AB-01" },
      { "file": "docs/_glossary-linux.md", "count": 1 },
      { "file": "docs/_glossary-macos.md", "count": 3 },
      { "total_corpus_count": 45, "files_count": 16 }
    ],
    "quarterly_audit": {
      "cadence": "0 8 1 1,4,7,10 *",
      "scope": "external-url-link-check (ci_1_abm_urls only — ci_2 + ci_3 are line-ref tracking, no URL probe)",
      "tool": "markdown-link-check",
      "next_review": "2026-07-01"
    }
  }
}
```

**Calibration finding (record in v1.6-DEFERRED-CLEANUP.md):** The actual measured CI-1 count at HEAD ad5c9c9 is 4 `business.apple.com` URL refs (all to the live root), not ~30 as estimated in PITFALLS.md:617 and CONTEXT.md. The historical estimate likely included `Apple Business Manager` text occurrences (term references), not URL hyperlinks. There are zero `support.apple.com/guide/apple-business-manager/` path refs at HEAD ad5c9c9 — Apple's legacy support-guide URLs are not present in the corpus. This is a positive calibration finding: the rot risk is lower than originally feared.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Worktree-based auditor independence (v1.4.1 / v1.5 Phase 47/61) | Fresh-clone in `$env:TEMP` with fresh gsd-executor sub-agent (Phase 66) | 2026-05-24 (this phase) | Stricter physical isolation (separate `.git/`); bypasses Windows worktree-lifecycle fragility |
| Per-validator manual chain run | `check-phase-NN.mjs` validator-as-deliverable with `execFileSync` chain | v1.3+ | Single-command chain regression-guard; STATE.md:103 codified |
| C15 regex additions per-phase | Narrow staleness audit + back-port-only refinement (D-02) | Phase 66 (this phase) | Empirical evidence at 65-VERIFICATION.md:171 shows existing 8 regexes are sufficient; additions would CAUSE the v1.7+ deferred-cleanup problem they appear to solve |
| Single weekly cron in audit workflow | Weekly bitrot + quarterly `c13_rotting_external` (Phase 66) | Phase 66 (this phase) | Quarterly drift detection without weekly noise |

**Deprecated/outdated:**
- **`v1.5-milestone-audit.mjs` for v1.6 content validation:** v1.5 harness is FROZEN; v1.6 content is validated by `v1.6-milestone-audit.mjs` exclusively (Path-A lineage).
- **`git worktree` for auditor independence on this Windows host:** documented unreliable per user memory; replaced by fresh clone for Phase 66+.

## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01: AUDIT-14 atomic-commit scope** — ONE indivisible commit (Option A score A=1). All sub-actions land together per v1.5 Plan 60-08 / Phase 62-08 precedent. Pre-commit dry-run mandatory. Budget for 5th reconciliation file per Phase 65's 3→4 file growth at 65-VERIFICATION.md:255-261. File set: (1) v1.6-milestone-audit.mjs C11+regex-7, (2) v1.6-audit-allowlist.json c13_rotting_external + quarterly_audit metadata, (3) regenerate-supervision-pins.mjs BASELINE_10 comment, (4) check-phase-66.mjs V-66 assertions, (5 PROBABLE) check-phase-62.mjs V-62-SIDECAR extension. Co-location confirmed at scripts/validation/ — no move required.

**D-02: C15 refinement scope** — NARROW staleness-audit only (Option A score A=2). Walk 24 ABAUDIT comments across 11 files; remove orphans (likely zero). Add V-66-ABAUDIT-STALENESS to check-phase-66.mjs. Regex-7 production-vs-synthetic back-port (v1.6-milestone-audit.mjs:725 → :854) folds into D-01 atomic commit. Do NOT add new C15 regexes.

**D-03: Terminal re-audit mechanics** — Fresh `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.6-audit-<rand>` (Option B score B=3). Spawned by fresh gsd-executor sub-agent (zero context from Plans 66-01..N authors). CHAIN_SKIP {48,51,58,60,61} remain suppressed-as-justified on Windows host. v1.6-MILESTONE-AUDIT.md `performed_by` field documents both D-22 divergence-from-literal-mechanism AND satisfaction-of-intent.

**D-04: CI workflow trigger surface** — Single workflow `.github/workflows/audit-harness-v1.6-integrity.yml` as Path-A from v1.5 (Option A score A=2). 14-entry tight path-filter list (+ workflow self-ref = 15 lines in pull_request.paths). 2 schedule crons: weekly bitrot `0 8 * * 1` + new quarterly `0 8 1 1,4,7,10 *`. New job `rotting-external-quarterly` gated by schedule `if:`. PR-blocking per D-A9 (default `continue-on-error: false`; only `pin-helper-advisory` is advisory per Phase 43 D-14 / Phase 48 D-22 precedent). Coexist with v1.4 + v1.5 workflows — do NOT modify older files.

### Claude's Discretion

- Exact CI-1/CI-2/CI-3 enumeration content for c13_rotting_external population (see Code Examples → c13_rotting_external Populated Payload section above for the verified enumeration)
- Exact synthetic regex-7 back-port text (verbatim copy from line 725 — provided in Code Examples Example 3)
- Plan wave structure for Phase 66 (recommended 5-wave structure provided in System Architecture Diagram)
- v1.6-MILESTONE-AUDIT.md body structure — follow v1.5-MILESTONE-AUDIT.md template verbatim; `deferred_items` block here should be a single line cross-linking to v1.6-DEFERRED-CLEANUP.md
- v1.6-DEFERRED-CLEANUP.md body structure — recommend one section per CI-N candidate with file paths + line refs + trigger-to-sweep criteria; plus a section for CHAIN_SKIP-on-Windows-CRLF deferred-CI-Linux item
- Test ID numbering for check-phase-66.mjs continues from V-65-NN; Path-A copy from check-phase-65.mjs; CHAIN_PHASES array does NOT include 66 per V-NN-SELF pattern

### Deferred Ideas (OUT OF SCOPE)

- **CI-1 (~30 ABM URL refs corpus sweep)** → v1.7+ (quarterly audit job at `0 8 1 1,4,7,10 *` flags drift)
- **CI-2 (2 VPP-location-token surgical line renames)** → v1.7+ (Q5(b) no-corpus-sweep contract)
- **CI-3 (Managed-Apple-ID corpus-wide rename)** → v1.7+ (contingent on Microsoft Intune adopting rebrand)
- **CHAIN_SKIP {48, 51, 58, 60, 61} resolution via CI-Linux job** → v1.7+ (CRLF + archived-path issues require Linux runner)
- **Worktree-lifecycle remediation on Windows** → out of v1.6 scope (user's standing constraint `use_worktrees:false`)
- **Multi-tenant Apple Business + Apple Business Device API documentation + per-OU CRD deep-dive + Account Holder lockout dedicated recovery runbook** → carried from Phases 63-65 deferrals to v1.7+

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUDIT-14 | BASELINE_10 refreshes in atomic harness commit (closes BASELINE_9 v1.5 carry-over); new sidecar category `c13_rotting_external` added with quarterly audit job; `scripts/validation/v1.6-audit-allowlist.json` migrated co-located with harness | Code Examples 1 (BASELINE_10 comment shape) + 2 (C11 windowKeywords +6 tokens) + 3 (regex-7 back-port) + c13_rotting_external Populated Payload section + Pattern 1 (atomic commit with 5th-file budget) + Pitfall 1 (cross-validator cascade) |
| AUDIT-15 | Terminal re-audit at Phase 66 from fresh worktree per v1.5 D-22 auditor-independence precedent exits 0; `.planning/milestones/v1.6-MILESTONE-AUDIT.md` authored confirming all checks PASS; `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` finalized with CI-1/CI-2/CI-3 rotting-reference candidates for v1.7+ | Pattern 3 (fresh-clone PowerShell recipe) + Code Examples 6 (CI workflow Path-A diff) + v1.5-MILESTONE-AUDIT.md template at .planning/milestones/v1.5-MILESTONE-AUDIT.md + DEFERRED-CLEANUP.md body structure per Claude's Discretion |

## Project Constraints (from CLAUDE.md)

- **CLAUDE.md scope:** Project guidance is centered on the original Autopilot Troubleshooter app (PowerShell / FastAPI / React). Phase 66 operates exclusively on `.planning/` and `scripts/validation/` and `.github/workflows/` — the application tree (`src/powershell/`, `src/backend/`, `src/frontend/`) is UNTOUCHED.
- **No directive in CLAUDE.md contradicts Phase 66 scope.** The "Security Notes" section says "Never commit `.env` file or any credentials" — Phase 66 commits no credentials. The "Performance Considerations" section is application-runtime guidance unrelated to validator scripts.
- **Style/conventions:** CLAUDE.md does not prescribe a Node.js validator code style; existing scripts/validation/ files use plain JS with `// comments` and 2-space indent — Phase 66 mirrors this verbatim.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `markdown-link-check` is the appropriate tool for the quarterly link-check job (inherited from v1.5 CI lineage) | Standard Stack → Supporting | Low — if Apple introduces a structured-redirect that mlc misinterprets, the quarterly job would false-positive; mitigation is to pin a specific version and review quarterly | 
| A2 | CHAIN_SKIP entries {48, 51, 58, 60, 61} remain non-fatal at Phase 66 close on the same Windows host (no new CRLF regressions introduced by Phases 62-65) | Pitfall 2 + Validation Architecture → Wave 0 Gaps | Low — verified by 65-VERIFICATION.md:124 "CHAIN_SKIP entries {48,51,58,60,61} are pre-existing failures unrelated to Phase 65"; risk only if a Phase 66 commit accidentally introduces a NEW CRLF issue in check-phase-66.mjs — caught by pre-commit dry-run |
| A3 | The 5th reconciling file in the atomic commit will likely be `check-phase-62.mjs` (V-62-SIDECAR extension), based on the Phase 65 3→4 cascade analog | Pattern 1 + 5th-file budget | Medium — could also surface as a `check-phase-63/64/65.mjs` extension or no extension at all (if c13's new shape doesn't conflict with any existing assertion); dry-run discovers the truth |
| A4 | The 4 measured `business.apple.com` URL refs at HEAD ad5c9c9 are the complete CI-1 set (no `support.apple.com/guide/apple-business-manager/` refs exist) | c13_rotting_external Populated Payload + Pitfall 3 | Low — verified by grep; risk only if a content phase 62-65 author added URLs that the grep pattern misses (e.g., escaped or encoded URLs); planner should re-run grep at Wave 3 execution time to confirm |
| A5 | The 24 ABAUDIT comments at HEAD ad5c9c9 are the complete inventory (no additions in flight) | Pitfall 4 inventory table | Low — verified by grep -rn `ABAUDIT-` against the 11 scoped files; matches CONTEXT.md §canonical_refs:235-246 enumeration of 24 total |
| A6 | `npm view markdown-link-check version` returns a maintained recent version when run during Wave 3 plan authoring | Standard Stack version verification | Low — package has long maintenance history; mitigation: planner runs `npm view` at Wave 3 plan-write time and pins specific version in CI YAML |
| A7 | The fresh-clone re-audit will exit 0 on the same Windows host given that the in-place chain currently exits 0 | Pattern 3 + Validation Architecture | Low — `git clone --no-hardlinks` produces a byte-identical working tree; the only environmental delta is the temp path; validators do not read absolute paths anywhere |
| A8 | `node-version: '20'` continues to be the appropriate runtime pin for the v1.6 CI workflow (inherited from v1.5) | Standard Stack → Core | Very low — Node 20 LTS is stable; v1.5 ran green on it throughout 2026 |

## Open Questions

1. **Will check-phase-62.mjs V-62-SIDECAR actually need extension during dry-run?**
   - What we know: V-62-SIDECAR currently asserts `c16.length === 0`; it does NOT assert anything about `c13_rotting_external` shape at HEAD ad5c9c9 (verified at check-phase-62.mjs:286-290).
   - What's unclear: Whether the act of POPULATING c13_rotting_external (going from `[]` to a populated object) causes any other validator to FAIL on an assertion that the empty array previously satisfied.
   - Recommendation: Plan Wave 2 with `files_modified: [v1.6-milestone-audit.mjs, v1.6-audit-allowlist.json, regenerate-supervision-pins.mjs, check-phase-66.mjs]` (4 files) + a `<!-- 5th file may be added during dry-run per D-01 cascade contract -->` comment. Update plan post-dry-run if a 5th file surfaces.

2. **Should V-66-ABAUDIT-STALENESS use the harness exemption window or strict next-line-only?**
   - What we know: Harness exempts both line `i` AND line `i+1` (v1.6-milestone-audit.mjs:735-740). Strict "next-line-only" check is more rigorous (would catch a case where the banned phrase is on line `i+1` and the comment was incorrectly placed); 1-line buffer check (mirroring harness) avoids false positives from blank lines.
   - What's unclear: Whether any of the 24 ABAUDIT comments has a blank line between the comment and the banned phrase.
   - Recommendation: Use strict next-line-only as the V-66-ABAUDIT-STALENESS rule (more rigorous = better staleness detection). If a real comment has a blank line, that's a legitimate authoring concern worth flagging. Spot-check 3-5 comments during Wave 1 to confirm zero blank-line gaps before locking the validator.

3. **Quarterly cron — does it actually need to run inside the rotting-external-quarterly job, or can the harness invoke link-check directly?**
   - What we know: D-04 LOCKED specifies the job. PITFALLS.md:632 hints "Quarterly audit job (CI workflow or manual)".
   - What's unclear: Whether the harness binary (`v1.6-milestone-audit.mjs`) should gain an internal `--rotting-check` flag that exits 0 without doing link-checking when invoked normally, and only does link-checking when invoked with the flag.
   - Recommendation: Keep it OUT of the harness binary per zero-runtime-deps boundary. The CI workflow job is the right home. Harness's role is structural (does c13_rotting_external have the correct shape + metadata); CI's role is operational (does each URL still resolve).

4. **Is the existing v1.4 broad-filter workflow going to trigger on v1.6 validator edits?**
   - What we know: v1.4 `audit-harness-integrity.yml` uses broad filter `scripts/validation/**` per CONTEXT.md D-04 final paragraph.
   - What's unclear: Whether this is desirable cross-version safety net or alarm fatigue.
   - Recommendation: Leave it alone (D-04 LOCKED: "do NOT modify older workflow files"). The cross-version trigger is intentional per v1.4 D-A9 cross-version safety net design.

## Sources

### Primary (HIGH confidence)

- **`scripts/validation/v1.6-milestone-audit.mjs`** at HEAD ad5c9c9 — verified line refs: 90-124 (appleBusinessDocPaths scope), 577 (C11 windowKeywords), 718-727 (C15 production regexes), 735-740 (ABAUDIT line-pair logic), 847-856 (synthetic mirror), 762-808 (C16 4-edge triangle), 813+ (--self-test framework)
- **`scripts/validation/check-phase-65.mjs`** at HEAD ad5c9c9 — verified Path-A template structure: lines 1-69 (frontmatter, CHAIN_PHASES, CHAIN_SKIP), 71-272 (V-65-01..V-65-14 assertion shape), 276-302 (CHAIN runner loop), 307-322 (V-65-AUDIT subprocess pattern), 325-332 (V-65-SELF assertion)
- **`scripts/validation/check-phase-62.mjs`** at HEAD ad5c9c9 — verified V-62-SIDECAR shape at lines 277-291 (this is the 5th-file extension candidate)
- **`scripts/validation/regenerate-supervision-pins.mjs`** at HEAD ad5c9c9 — verified BASELINE_9 comment pattern at lines 386-398
- **`scripts/validation/v1.6-audit-allowlist.json`** at HEAD ad5c9c9 — verified `c13_rotting_external: []` empty placeholder at line 79; `c16_missing_endpoint_exemptions: []` at line 80
- **`.github/workflows/audit-harness-v1.5-integrity.yml`** at HEAD ad5c9c9 — verified Path-A source: 310 lines; lines 6-21 triggers (single cron); 23-309 jobs; 297 `continue-on-error: true` (only advisory job)
- **`.planning/milestones/v1.5-MILESTONE-AUDIT.md`** at HEAD ad5c9c9 — verified template structure: YAML frontmatter (lines 1-90); mechanical_checks block (12-31); `performed_by` D-22 narrative (line 33); auditor-independence verification section (lines 213-250)
- **`.planning/phases/62-apple-business-foundation-rebrand/62-08-PLAN.md`** at HEAD ad5c9c9 — verified atomic-harness-commit recipe (lines 432-490); pre-commit dry-run protocol (lines 434-444); post-commit verification (lines 472-485)
- **`.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-VERIFICATION.md`** at HEAD ad5c9c9 — verified atomic-trio reconciliation record (lines 445-453); V-62-SIDECAR deviation note (line 261); Section K Phase 66 readiness signal (lines 437-441)
- **`.planning/research/PITFALLS.md`** at HEAD ad5c9c9 — verified CI-1/CI-2/CI-3 source-of-truth definitions: CI-1 (lines 617-636), CI-2 (640-660), CI-3 (663-680)
- **CONTEXT.md** at `.planning/phases/66-.../66-CONTEXT.md` — all four D-01..D-04 decisions LOCKED with adversarial-review rationale and scores

### Secondary (MEDIUM confidence)

- **Verified grep enumerations** (run at HEAD ad5c9c9 during research):
  - 24 ABAUDIT comments across 11 files: matches CONTEXT.md §canonical_refs:235-246 enumeration
  - 4 `business.apple.com` URL refs in admin-setup-{ios,macos} + _glossary-macos: smaller than PITFALLS.md historical estimate of ~30
  - 0 `support.apple.com/guide/apple-business-manager/` refs: positive calibration finding
  - 45 `Managed Apple ID` corpus refs across 16 files: matches PITFALLS.md:665 "pervasive corpus-wide"
  - 6 `VPP location token` line refs in admin-setup-{ios,macos}: includes the 2 canonical PITFALLS.md:642 sites + 4 additional prerequisite-bullet sites

### Tertiary (LOW confidence)

- **`markdown-link-check` current npm registry state** — NOT verified at research time; planner MUST run `npm view markdown-link-check version` during Wave 3 plan authoring and pin in CI YAML

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies; all extensions to existing validators verified against shipped code
- Architecture: HIGH — wave structure mirrors Phase 65 atomic-trio precedent; PowerShell recipe verified against env constraints
- Pitfalls: HIGH — cross-validator cascade pitfall has direct empirical evidence at 65-VERIFICATION.md:255-261

**Research date:** 2026-05-24
**Valid until:** 2026-06-24 (30 days for stable validation-tooling domain; the only fast-moving piece is the npm registry state of `markdown-link-check` which the planner should re-verify at Wave 3 execution time)
