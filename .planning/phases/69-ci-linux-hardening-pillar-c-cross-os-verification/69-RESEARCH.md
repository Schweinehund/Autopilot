# Phase 69: CI-Linux Hardening (Pillar C — Cross-OS Verification) - Research

**Researched:** 2026-05-26
**Domain:** GitHub Actions workflow YAML authoring; cross-OS line-ending fidelity; CI orchestration; chain-validator topology
**Confidence:** HIGH (all 4 implementation decisions locked in CONTEXT.md; research focused on tactical YAML correctness + the 6 explicitly enumerated open questions)

## Summary

Phase 69 ships a single new file — `.github/workflows/audit-harness-v1.7-integrity.yml` — containing a Phase-69-scoped SKELETON (4 jobs; transitional path-filter; no crons; no pin-helper-advisory) per LOCKED D-01 Option B. The novel job is `linux-chain-ubuntu-latest`, which sets `git config --global core.autocrlf false` BEFORE `actions/checkout@v4`, then invokes `check-phase-66.mjs` (chain-apex; recursively spawns check-phase-{48..65} via `execFileSync` with `timeout: 300000` per Phase 68 CHAIN-03 / TIMEOUT-01), wraps that invocation in wall-clock measurement emitting `::notice title=CHAIN_TIMING_LINUX::...`, then emits skip-if-missing stubs for phases 67-70 per LOCKED D-02 Option B. D-04 SC#5 evidence = synthetic CRLF-injection PR (negative + positive) on a throwaway branch + `workflow_dispatch` baseline; Phase 70 HARNESS-04 extends this skeleton into the full v1.7 workflow.

The high-impact research findings: (1) `ubuntu-latest` migrated to ubuntu-24.04 in Jan 2025 — `dos2unix`/`unix2dos` is NOT pre-installed; an `apt-get install -y dos2unix` step OR a `printf '\r\n'`/`sed`-based CRLF injection is required for SC#5 synthetic-PR evidence (recommend the apt-get path for tool clarity); (2) `git config --global core.autocrlf false` MUST execute as a separate step BEFORE `actions/checkout@v4` — GitHub officially documents this in the `actions/checkout` discussion thread #976 as the only reliable way to disable autocrlf for the checkout pull itself; (3) the `linux-chain-ubuntu-latest` job is the THIRD auditor-independence axis (separate OS + separate host process), stacking with D-03 fresh-clone + D-22 fresh-sub-agent at Phase 70 HARNESS-05 terminal re-audit; (4) the `::notice` GHA annotation surfaces in the Actions UI summary panel and is the cleanest forward-coordination data point for TIMEOUT-01.

**Primary recommendation:** Author the workflow as a clean 4-job skeleton with the `linux-chain-ubuntu-latest` job structured as 4 explicit steps — (1) `git config --global core.autocrlf false` standalone step; (2) `actions/checkout@v4`; (3) `actions/setup-node@v4 with: node-version: '20'`; (4) chain-apex run wrapped in `date +%s` capture + `::notice` emission. Pair with `timeout-minutes: 30` at job level, `continue-on-error: false` explicit declaration (D-A9 inheritance documentation), and the 4 phase-67..70 skip-if-missing stubs as a single for-loop step within the same job (NOT as separate jobs — keeps the 4-job total intact per D-03 LOCKED).

## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 Option B (score B=7 / A=14 / C=18):** Create NEW file `.github/workflows/audit-harness-v1.7-integrity.yml` skeleton in Phase 69; Phase 70 HARNESS-04 extends it (does NOT recreate). Predecessors byte-unchanged. CRITICAL: `git config --global core.autocrlf false` BEFORE `actions/checkout@v4`.

**D-02 Option B (score B=1 / A=3 / C=5):** Chain scope `check-phase-{48..70}.mjs` with skip-if-missing pattern for phases 67-70 (canonical v1.5/v1.6 `if [ -f ... ]; then ...; else echo "skip per Phase 42 D-31"; fi` idiom). Strict upper bound at 70.

**D-03 Option C (score C=1 / B=2 / D=3 / A=4):** Hybrid topology = 4 jobs:
1. `parse` (validates `v1.6-audit-allowlist.json`)
2. `path-match` (verifies `v1.6-milestone-audit.mjs` references its sidecar)
3. `harness-run` (runs `v1.6-milestone-audit.mjs`)
4. `linux-chain-ubuntu-latest` (single chain-apex job invoking `check-phase-66.mjs` recursively)

NO 19-job per-validator parallel topology (post-CHAIN-03 redundant). Mandatory timing instrumentation: wrap chain-apex with `date +%s` capture + `::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)`. `timeout-minutes: 30` at job level.

**D-04 Option D (score D=1 / A=2 / C=3 / B=4):** SC#5 verification = synthetic CRLF-injection PR (negative-case + reverted positive-case) + `workflow_dispatch` baseline on master HEAD. Synthetic PR closed-without-merge → zero master tree churn. Plan-phase decides sub-decision (a) add `docs/decision-trees/09-linux-triage.md` to Phase 69 path-filter as SC#5-evidence-only surface vs (b) inject CRLF into a file already in transitional path-filter. **Recommendation in CONTEXT: pick (a) for evidence realism.**

### Claude's Discretion

- D-04 sub-decision (a) vs (b) — Plan-phase plan author decides synthetic PR target file. Recommendation: (a) `docs/decision-trees/09-linux-triage.md` for evidence realism; coupled with Phase 70 HARNESS-04(a) handoff note.
- `harness-run` step name + Node version stanza — copy verbatim from v1.6 workflow lines 65-74.
- Skip-if-missing echo string — literal `"check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"`.
- `::notice` emission format — recommend `::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: ${N}s (Windows reference: ~102s; subprocess timeout: 300s)`. GHA step-summary append (`>> $GITHUB_STEP_SUMMARY`) is equivalent.

### Deferred Ideas (OUT OF SCOPE)

- `pin-helper-advisory` job migration to v1.7 sidecar — Phase 70 HARNESS-04(d)
- `v1.7-audit-allowlist.json` sidecar authoring — Phase 70 HARNESS-02
- `v1.7-milestone-audit.mjs` Path-A copy — Phase 70 HARNESS-01
- Per-phase validators `check-phase-67..70.mjs` — Phase 70 HARNESS-03
- Both crons (weekly bitrot + quarterly rotting-external) — Phase 70 HARNESS-04(b)
- Path-filter rewrite to v1.7-scoped surface — Phase 70 HARNESS-04(a)
- `cdcce23` archive-script garbage-insert root cause audit — Phase 70 HARNESS-06 / v1.8+ ARCHIVE-01
- Subprocess-timeout architecture review (if Linux runtime > 150s) — v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 escalation path
- Pin-helper-advisory `--report` + `--self-test` integration in v1.7 workflow — Phase 70 HARNESS-04(d)

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CILINUX-01 | New `ubuntu-latest` runner job runs `check-phase-{48..70}.mjs` + `v1.x-milestone-audit.mjs` on Linux LF; PR-blocking; coexists with v1.4/v1.5/v1.6 [REQUIREMENTS.md:24-26] | Standard Stack §`actions/checkout@v4` + `actions/setup-node@v4` + `node-version: '20'` (Code Examples §1); Architecture Patterns §Pattern 1 (4-job skeleton); Common Pitfalls §1 (git autocrlf order), §2 (dos2unix not pre-installed), §3 (notice annotation visibility); SC#5 Synthetic PR Mechanics §D-04 |

## Project Constraints (from CLAUDE.md)

Project repository is a Windows Autopilot toolkit (PowerShell + FastAPI + React) but Phase 69 deliverable is a single GitHub Actions workflow YAML file — none of the three-tier code surfaces are touched by this phase. CLAUDE.md is not load-bearing for Phase 69 implementation, except for one global directive observed:

- **Security note: "Never commit `.env` file or any credentials"** — N/A here (workflow file uses `GITHUB_TOKEN` only via `actions/checkout@v4` default; no secrets read or written).
- **Testing strategy `pytest` / `Pester` / `Vitest`** — N/A; the "test" surface for this phase is the chain validator output itself.

The phase deliverable is operationally separate from CLAUDE.md's three-tier scope — Phase 69 ships CI workflow tooling that gates the validation harness, not project code.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Cross-OS line-ending verification | CI / GitHub Actions runner (ubuntu-latest) | — | LF-fidelity contract requires Linux runner with `core.autocrlf=false` before checkout; no other tier owns OS-specific git behavior |
| Chain validator orchestration | CI workflow `linux-chain-ubuntu-latest` job | Node 20 runtime (chain-apex `check-phase-66.mjs` recursive spawn) | Workflow YAML declares trigger + isolation boundary; Node runtime executes the actual validators per Phase 68 CHAIN-03 design |
| Milestone audit (transitional v1.6) | CI workflow `harness-run` job | Node 20 runtime (`v1.6-milestone-audit.mjs`) | REQUIREMENTS.md:26 binds `v1.x-milestone-audit.mjs` to this workflow; Phase 70 HARNESS-04(c) repoints to v1.7 |
| Sidecar JSON validation | CI workflow `parse` job | Inline `node -e` script (no external deps) | Path-A copy from v1.6 workflow lines 31-48; trivial sidecar shape check |
| Sidecar/harness path alignment | CI workflow `path-match` job | Inline `grep` step | Path-A copy from v1.6 workflow lines 50-63; verifies harness references its sidecar by name |
| Timing instrumentation (TIMEOUT-01 forward-coordination) | `linux-chain-ubuntu-latest` job step | GHA `::notice` annotation | Per D-03 mandatory wall-clock emission — surfaces in Actions UI summary |
| SC#5 evidence capture | Synthetic PR + `workflow_dispatch` trigger | GHA run-URL persistence | PR closure preserves run URL as permanent evidence; branch deletion has no effect on run-URL longevity |

**Why this matters for Phase 69:** Every line in the workflow YAML maps to exactly one tier. The 4-job split per D-03 LOCKED is the structural honesty — `parse`/`path-match`/`harness-run` inherit v1.6's milestone-audit topology; `linux-chain-ubuntu-latest` is the new cross-OS axis. No tier confusion; planner can map each task in the plan 1:1 to a workflow surface.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `actions/checkout` | v4 | Git checkout step | Pinned in v1.5/v1.6 workflows; current GitHub recommendation [CITED: github.com/actions/checkout] |
| `actions/setup-node` | v4 | Node.js runtime install | Pinned in v1.5/v1.6 workflows; current GitHub recommendation [CITED: github.com/actions/setup-node] |
| Node.js | 20 (LTS) | Validator runtime | Matches v1.5/v1.6 idiom; chain validators run on Node 20+ per CONTEXT.md Code Context §Established Patterns |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `dos2unix` / `unix2dos` | apt-get on demand | CRLF injection for SC#5 synthetic PR | Synthetic-PR `unix2dos` step ONLY — NOT pre-installed on ubuntu-24.04 [VERIFIED: github.com/actions/runner-images Ubuntu2404-Readme] |
| bash `date +%s` | shipped with runner | Wall-clock measurement for TIMEOUT-01 | Wrapping `check-phase-66.mjs` invocation — no external dep |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `apt-get install dos2unix` (synthetic PR step) | `printf '\r\n'` redirect + `sed 's/$/\r/'` | Lower realism (manual CRLF insertion vs canonical tool); but works without `apt-get install` step. Recommend `apt-get` for clarity. |
| `::notice` GHA annotation | `>> $GITHUB_STEP_SUMMARY` Markdown append | Both surface in Actions UI; `::notice` is single-line and shows in summary panel; `$GITHUB_STEP_SUMMARY` allows multi-line Markdown. For TIMEOUT-01 single-data-point emission, `::notice` is the cleaner shape. |
| 19-job parallel per-validator topology (v1.5/v1.6 style) | Single `linux-chain-ubuntu-latest` chain-apex job (D-03 LOCKED) | LOCKED — v1.5/v1.6 topology pre-dates Phase 68 CHAIN-03 chain-apex design; parallel would be 18x-redundant compute |
| `git config --local` after checkout | `git config --global` before checkout | LOCKED — only pre-checkout global config affects the checkout pull itself [CITED: github.com/actions/checkout/discussions/976] |
| `ubuntu-22.04` runner | `ubuntu-latest` (currently ubuntu-24.04) | `ubuntu-latest` matches v1.5/v1.6 idiom; ubuntu-24.04 has Node 22 + Node 24 cached (but we use `setup-node@v4 with: node-version: '20'` for explicit pin) |

**Installation (none required — all tools already in runner image OR installed inline):**

The workflow file references only `actions/checkout@v4` + `actions/setup-node@v4` (GitHub-hosted action references — no npm/pip install) and inline runner commands. `dos2unix` install ONLY occurs inside the synthetic-PR branch, not in the workflow file itself.

**Version verification:** All `@v4` references on the action marketplace verified current as of 2026-05; ubuntu-latest pointing to ubuntu-24.04 verified via the actions/runner-images Ubuntu2404-Readme [VERIFIED: github.com/actions/runner-images]. Node 22.22.3 is the default pre-installed version on the 24.04 image; using `setup-node@v4` with explicit `node-version: '20'` overrides this to match v1.5/v1.6 idiom.

## Package Legitimacy Audit

> **Not required for Phase 69.**

Phase 69 installs zero packages. The workflow file references only first-party GitHub-published actions (`actions/checkout@v4`, `actions/setup-node@v4`) — both verified at their canonical `github.com/actions/*` repositories. The optional `apt-get install -y dos2unix` step inside the synthetic-PR branch installs a Debian-archive package from Ubuntu's official repository (not npm/PyPI). No slopcheck or registry-verification needed.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `actions/checkout@v4` | GitHub Marketplace | 4+ yrs | first-party | github.com/actions/checkout | N/A (first-party) | Approved |
| `actions/setup-node@v4` | GitHub Marketplace | 6+ yrs | first-party | github.com/actions/setup-node | N/A (first-party) | Approved |
| `dos2unix` (apt) | Ubuntu universe | mature OSS | mainstream Debian | dos2unix.sourceforge.io | N/A (apt) | Approved (synthetic PR only) |

## Architecture Patterns

### System Architecture Diagram

```
                      PR push / workflow_dispatch / (no schedule in Phase 69)
                                        │
                                        ▼
          ┌─────────────────────────────────────────────────────────────┐
          │  PR triggers on path-filter:                                 │
          │   • scripts/validation/check-phase-*.mjs                     │
          │   • .github/workflows/audit-harness-v1.7-integrity.yml       │
          │   • .planning/REQUIREMENTS.md                                │
          │   • [if D-04(a)] docs/decision-trees/09-linux-triage.md      │
          └─────────────────────────────────────────────────────────────┘
                                        │
                  ┌─────────────────────┴─────────────────────┐
                  │                                            │
                  ▼                                            ▼
            ┌──────────┐                              [parse job]
            │   PR     │                              runs-on: ubuntu-latest
            │  push    │  ─────────► trigger ──────►  needs: (none)
            └──────────┘                              validates v1.6-audit-allowlist.json
                                                            │
                                                            ▼ (success)
                                                       [path-match job]
                                                       runs-on: ubuntu-latest
                                                       needs: parse
                                                       greps v1.6-milestone-audit.mjs
                                                       for sidecar reference
                                                            │
                                                            ▼ (success)
                                                       [harness-run job]
                                                       runs-on: ubuntu-latest
                                                       needs: path-match
                                                       node v1.6-milestone-audit.mjs --verbose
                                                            │
                                                            ▼ (success)
                                                       [linux-chain-ubuntu-latest job]
                                                       runs-on: ubuntu-latest
                                                       needs: harness-run
                                                       timeout-minutes: 30
                                                       continue-on-error: false
                                                            │
                          ┌─────────────────────────────────┴────────────────┐
                          │                                                   │
                          ▼ STEP 1                                            │
                  git config --global core.autocrlf false                    │
                  (BEFORE checkout — LF-fidelity contract)                   │
                          │                                                   │
                          ▼ STEP 2                                            │
                  actions/checkout@v4                                         │
                          │                                                   │
                          ▼ STEP 3                                            │
                  actions/setup-node@v4 (node-version: '20')                  │
                          │                                                   │
                          ▼ STEP 4                                            │
                  START=$(date +%s)                                           │
                  node scripts/validation/check-phase-66.mjs --verbose        │
                    │                                                         │
                    └──► (internally via execFileSync, timeout: 300000)       │
                         spawns check-phase-{48,49,50,51,52,53,54,55,56,      │
                         57,58,59,60,61,62,63,64,65}.mjs                      │
                         each returns 0 (Phase 68 CHAIN-03 closed empty Set)  │
                                                                              │
                  END=$(date +%s)                                             │
                  echo "::notice title=CHAIN_TIMING_LINUX::                   │
                    Full chain wall-clock: $((END-START))s                    │
                    (Windows reference: ~102s; subprocess timeout: 300s)"     │
                          │                                                   │
                          ▼ STEP 5 (same job)                                 │
                  for i in 67 68 69 70; do                                    │
                    if [ -f scripts/validation/check-phase-$i.mjs ]; then     │
                      node scripts/validation/check-phase-$i.mjs              │
                    else                                                       │
                      echo "check-phase-$i.mjs not present -- skipping        │
                            (graceful degradation per Phase 42 D-31)"         │
                    fi                                                         │
                  done                                                         │
                          │                                                   │
                          └──────────────► EXIT 0 (PR mergeable)              │
                                            │
                                            └──► ::notice surfaces in
                                                  Actions UI summary panel
                                                  (TIMEOUT-01 data point captured)
```

### Recommended Project Structure

```
.github/workflows/
├── audit-harness-integrity.yml             # v1.4 (FROZEN — byte-unchanged in Phase 69)
├── audit-harness-v1.5-integrity.yml        # v1.5 (FROZEN — byte-unchanged in Phase 69)
├── audit-harness-v1.6-integrity.yml        # v1.6 (FROZEN — byte-unchanged in Phase 69)
└── audit-harness-v1.7-integrity.yml        # NEW — Phase 69 ships skeleton; Phase 70 HARNESS-04 extends

scripts/validation/
├── check-phase-{30,31,48..66}.mjs          # existing — Phase 69 references chain-apex 66 only
├── check-phase-{67..70}.mjs                # NOT YET — Phase 70 HARNESS-03 (Phase 69 only adds skip-if-missing stubs)
├── _lib/archive-path.mjs                   # existing — Phase 68 CHAIN-02
├── v1.5-milestone-audit.mjs                # existing
├── v1.6-milestone-audit.mjs                # transitional harness-run target — Phase 70 HARNESS-04 repoints
├── v1.7-milestone-audit.mjs                # NOT YET — Phase 70 HARNESS-01
├── v1.5-audit-allowlist.json               # existing
├── v1.6-audit-allowlist.json               # transitional parse/path-match target — Phase 70 HARNESS-04 repoints
├── v1.7-audit-allowlist.json               # NOT YET — Phase 70 HARNESS-02
└── regenerate-supervision-pins.mjs         # NOT referenced in Phase 69 workflow (pin-helper-advisory deferred to Phase 70)
```

### Pattern 1: 4-Job Skeleton with Chain-Apex Job

**What:** The v1.7 workflow inherits v1.6's `parse` → `path-match` → `harness-run` job chain idiom for the milestone-audit slice, then adds a single `linux-chain-ubuntu-latest` chain-apex job (NEW for Phase 69) for the cross-OS validator-chain slice. Total: 4 jobs.

**When to use:** This is the LOCKED Phase 69 topology per D-03 Option C. Don't deviate.

**Example:**
```yaml
# Source: derived from v1.6 workflow (.github/workflows/audit-harness-v1.6-integrity.yml:65-74)
# + new linux-chain-ubuntu-latest job per Phase 69 D-03

name: Audit Harness v1.7 Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.7-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      # [if D-04 sub-decision (a)] - 'docs/decision-trees/09-linux-triage.md'
  workflow_dispatch:

# NOTE: on.schedule: OMITTED in Phase 69 — both crons are Phase 70 HARNESS-04(b) deliverables

jobs:
  parse:
    name: Parse v1.6 sidecar JSON
    runs-on: ubuntu-latest
    # continue-on-error: false implicit (PR-blocking per D-A9)
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Validate v1.6-audit-allowlist.json
        run: |
          node -e "
            const fs = require('fs');
            const j = JSON.parse(fs.readFileSync('scripts/validation/v1.6-audit-allowlist.json', 'utf8'));
            if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) {
              console.error('supervision_exemptions empty');
              process.exit(1);
            }
            console.log('v1.6 sidecar OK: ' + j.supervision_exemptions.length + ' supervision pins');
          "

  path-match:
    name: Harness references v1.6 sidecar
    runs-on: ubuntu-latest
    needs: parse
    steps:
      - uses: actions/checkout@v4
      - name: Verify harness sidecar reference
        run: |
          if grep -q "scripts/validation/v1.6-audit-allowlist.json" scripts/validation/v1.6-milestone-audit.mjs; then
            echo "OK: harness references v1.6 sidecar"
          else
            echo "FAIL: harness does not reference v1.6-audit-allowlist.json"
            exit 1
          fi

  harness-run:
    name: Run v1.6 milestone audit harness
    runs-on: ubuntu-latest
    needs: path-match
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run v1.6-milestone-audit.mjs
        run: node scripts/validation/v1.6-milestone-audit.mjs --verbose

  linux-chain-ubuntu-latest:
    name: Validator chain on Linux LF (Phase 69 CILINUX-01)
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 30
    # continue-on-error: false explicit (D-A9 inheritance — PR-blocking; documented for forward-coordination clarity)
    steps:
      - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run chain-apex check-phase-66.mjs (recursively spawns 48..65)
        run: |
          START=$(date +%s)
          node scripts/validation/check-phase-66.mjs --verbose
          END=$(date +%s)
          echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)"
      - name: check-phase-67..70 skip-if-missing stubs
        run: |
          for i in 67 68 69 70; do
            if [ -f scripts/validation/check-phase-$i.mjs ]; then
              node scripts/validation/check-phase-$i.mjs
            else
              echo "check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
            fi
          done
```

### Anti-Patterns to Avoid

- **`git config --local core.autocrlf false` AFTER `actions/checkout@v4`:** The checkout step has already pulled with whatever the runner default is. Local config only affects subsequent git commands in the same workspace, not the original pull. [CITED: github.com/actions/checkout/discussions/976]
- **Setting `core.autocrlf` via env var (`GIT_CONFIG_*` env):** Unreliable — `actions/checkout@v4` may overwrite or ignore depending on internal flow. Use the explicit pre-checkout `git config --global` step.
- **Pinning `ubuntu-22.04` to avoid migration surprises:** Goes against v1.5/v1.6 idiom (both use `ubuntu-latest`); also unnecessary since `setup-node@v4` pins Node 20 explicitly.
- **Adding `on.schedule` crons in Phase 69:** Explicitly OUT OF SCOPE per CONTEXT.md domain section + D-01 LOCKED. The weekly bitrot + quarterly rotting-external crons land in Phase 70 HARNESS-04(b). A cron firing on Phase 69's transitional workflow would target v1.6 sidecar (correct) but represent scope creep.
- **19-job parallel per-validator topology:** Explicitly REJECTED in D-03 (post-CHAIN-03 redundant; each sister job would re-spawn the chain partially via `execFileSync`).
- **Inline `git diff` inside the workflow file to verify predecessor-unchanged invariant:** This is a PRE-COMMIT verification step (run at executor time on the developer machine), NOT a step in the workflow itself. Don't add a job that diffs old workflow files — verify outside.
- **Embedding the synthetic CRLF-injection PR into the Phase 69 workflow itself:** The synthetic PR is a SEPARATE branch pushed AFTER the workflow file commit lands. It's evidence-capture mechanism, not part of the workflow YAML.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Disable autocrlf reliably | `setx GIT_CONFIG=...` env var hacks | `git config --global core.autocrlf false` as a dedicated step before `actions/checkout@v4` | Official GitHub-documented pattern; reliable across runner versions [CITED: actions/checkout discussions #976] |
| CRLF injection for synthetic PR | Hand-written PowerShell/Python byte-flipper | `apt-get install -y dos2unix && unix2dos <file>` | Canonical tool name in commit log; reversible via `dos2unix`; passes JSON/YAML linters when applied to .md files |
| Wall-clock measurement | `time` shell wrapper (output goes to stderr) | `START=$(date +%s); ...; END=$(date +%s); echo "::notice ::"` | `::notice` surfaces in Actions UI summary panel as a permanent annotation, not just log line; `time` redirects don't compose with GHA annotations |
| Skip-if-missing detection for future validators | Per-validator if-block jobs | Single for-loop step inside chain-apex job | 4 jobs total per D-03 LOCKED; per-validator stub jobs would inflate to 8 jobs (4 jobs + 4 stubs) |
| PR-blocking semantics | Custom check-runs API hook | `continue-on-error: false` (implicit default) + branch protection rule | GitHub-native; D-A9 inheritance from v1.5/v1.6 workflows |
| Chain orchestration on Linux | Re-implementing 19 parallel jobs | Single chain-apex `check-phase-66.mjs` invocation | Post-CHAIN-03 chain-apex design makes this a 1-line invocation per D-03 LOCKED |

**Key insight:** Phase 69's deliverable is configuration, not code. Every "build" temptation maps to an existing GitHub-platform feature or v1.5/v1.6 idiom. The novel surface is exactly TWO bytes of behavior — (1) `git config --global core.autocrlf false` BEFORE checkout, and (2) wall-clock instrumentation around the chain-apex invocation. Everything else is Path-A copy from v1.6 with one-line repoints.

## Runtime State Inventory

Phase 69 is NOT a rename/refactor/migration phase. It ships a NEW file with NO modifications to existing state. State inventory not applicable — but for forward-coordination completeness:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — workflow file is read-only by GHA runner | None |
| Live service config | GitHub Actions runner registers the new workflow file on PR push (auto-discovers `.github/workflows/*.yml`) | None — automatic on commit-to-master |
| OS-registered state | None — workflow only runs on ephemeral ubuntu-latest runners | None |
| Secrets/env vars | `GITHUB_TOKEN` (auto-injected by GHA) — implicit `actions/checkout@v4` default | None — no new secrets required |
| Build artifacts | None — no compiled outputs, no caches between runs (skipped APT-cache action for SC#5 evidence since it's a one-shot synthetic PR) | None |

**Verification:** Confirmed by reading `.github/workflows/audit-harness-v1.6-integrity.yml` end-to-end — it persists zero state between runs; same applies to v1.7. **Nothing in any category requires action.**

## Common Pitfalls

### Pitfall 1: `git config --global core.autocrlf false` After Checkout
**What goes wrong:** Developer puts the autocrlf disable step AFTER `actions/checkout@v4`. The checkout step has already pulled with whatever the runner's default config is (typically `false` on Linux runners — but the `.gitattributes` file in the repo could ALSO override, and a future `.gitattributes` change in v1.8+ could silently regress). The LF-fidelity contract is broken at the precise moment it matters.
**Why it happens:** Intuitive reading is "configure git AFTER you have git's working copy"; in fact, `actions/checkout` itself IS the git operation that needs to be configured.
**How to avoid:** Put `git config --global core.autocrlf false` as the FIRST step of the `linux-chain-ubuntu-latest` job, BEFORE `actions/checkout@v4`. Verify by reading the workflow file and confirming step order.
**Warning signs:** If the synthetic-PR negative-case (SC#5 B.2) test fails to catch CRLF injection — i.e., Linux CI passes when it should fail — this is the primary suspect.
**Verification snippet:** Local `git config --get core.autocrlf` on this Windows host returns `true` and no `.gitattributes` exists — the exact scenario where pre-checkout global config matters.

### Pitfall 2: `dos2unix` / `unix2dos` Not Pre-Installed on ubuntu-24.04
**What goes wrong:** The synthetic-PR negative-case step assumes `unix2dos` is on PATH and fails immediately with `command not found`. The PR appears broken before the test even runs.
**Why it happens:** `ubuntu-latest` migrated to ubuntu-24.04 in Jan 2025; the 24.04 image cut several packages from the 22.04 inventory to stay within the disk-space SLA. `dos2unix` was among them. [VERIFIED: github.com/actions/runner-images Ubuntu2404-Readme — explicit absence confirmed]
**How to avoid:** Include an explicit step `sudo apt-get install -y dos2unix` BEFORE running `unix2dos` in the synthetic-PR branch. Alternatively, use `printf '\r\n'` redirection or `sed 's/$/\r/'` to inject CRLF without the external tool — but `apt-get` is more readable in the commit log.
**Warning signs:** Synthetic PR fails with `command not found` rather than the expected `check-phase-51` validator failure.
**Note:** This pitfall lives in the SYNTHETIC PR BRANCH, not in the Phase 69 workflow file itself. The workflow file ships byte-unchanged regardless.

### Pitfall 3: `::notice` Annotation Suppressed by `--verbose` Output
**What goes wrong:** `check-phase-66.mjs --verbose` emits ~200 lines of validator output. If the `::notice` is printed BEFORE the verbose output (or interleaved), it gets buried in scrollback.
**Why it happens:** Annotations are extracted from stdout by parsing for the `::notice` marker; they always surface in the Actions UI summary panel regardless of position, but in the raw log scroll they're easy to miss.
**How to avoid:** Print the `::notice` AFTER `node scripts/validation/check-phase-66.mjs --verbose` completes. The example YAML in Pattern 1 has this ordering — preserve it.
**Warning signs:** SC#5 evidence capture (B.1 baseline) shows `::notice` missing from the Actions UI annotation list — re-read the workflow YAML and confirm `END=$(date +%s)` and the `echo ::notice` are in steps AFTER the validator invocation.
**Verification:** [CITED: docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands] — `::notice` is extracted from stdout at any position; the order matters for log readability only.

### Pitfall 4: Path-Filter on `.planning/REQUIREMENTS.md` is Unusual But Correct
**What goes wrong:** A reviewer or future maintainer questions why a CI workflow has a planning doc in its trigger filter — looks like a copy-paste error.
**Why it's there:** Phase 69 LOCKED transitional path-filter (per D-01 LOCKED + CONTEXT.md lines 65) includes `.planning/REQUIREMENTS.md` so that any change to the binding contract (e.g., REQUIREMENTS.md:26 amendment) triggers re-verification on Linux. This is intentional self-verification — when the contract changes, the verification re-fires.
**How to avoid:** Document this in a leading comment in the workflow YAML (`# Path-filter includes REQUIREMENTS.md so contract changes self-verify`). Phase 70 HARNESS-04(a) rewrites the path-filter to v1.7-scoped surface, dropping REQUIREMENTS.md when v1.7 binding contract is closed.
**Warning signs:** Reviewer raises "is REQUIREMENTS.md supposed to be here?" — the answer is yes, per CONTEXT.md D-01 LOCKED.

### Pitfall 5: `timeout-minutes: 30` vs Theoretical Worst-Case 5700s
**What goes wrong:** Worst-case math: 19 phases × 300s subprocess timeout = 5700s = 95min. The 30-minute job-level timeout could theoretically undershoot.
**Why it's actually fine:** Empirical Windows measurement (Phase 68 TIMEOUT-01) shows the FULL chain runs in ~102s. Each subprocess timeout is a CAP, not a steady-state runtime. The 300s cap applies to a single hung subprocess, not the cumulative chain. Linux is expected to be similar or slightly faster.
**How to avoid:** Trust the empirical data. 30min is 17× the empirical max. If Linux turns out to be dramatically slower (`::notice` reports > 1500s = 25min), v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 escalates to a v1.8+ architecture review.
**Warning signs:** First-run `::notice CHAIN_TIMING_LINUX` reports > 200s → still well within budget but flag for forward-coordination. > 900s → real concern; consider parallelizing chain or pinning ubuntu-22.04.
**Mitigation if hit:** `timeout-minutes: 60` is a 1-line emergency bump; doesn't change the topology.

### Pitfall 6: Predecessor Workflow Files Touched by Accidental Re-Save
**What goes wrong:** An IDE or pre-commit hook re-saves `audit-harness-v1.4/v1.5/v1.6-integrity.yml` with different line endings, trailing newlines, or YAML key ordering — breaking the predecessor-unchanged invariant.
**Why it happens:** Editors auto-format YAML on save; pre-commit hooks normalize line endings.
**How to avoid:** Before committing, run `git diff` on the predecessor workflow files and confirm zero changes. Plan should include an explicit verification step. Use `git update-index --skip-worktree` defensively if the editor is aggressive (revert with `--no-skip-worktree`).
**Warning signs:** `git diff --stat .github/workflows/` post-edit shows N files changed instead of 1 (the new file only).
**Verification command:** `git diff --name-only .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml` should return empty.

### Pitfall 7: Synthetic PR Target File Not in Path-Filter
**What goes wrong:** SC#5 sub-decision (a) chosen but `docs/decision-trees/09-linux-triage.md` not added to path-filter; synthetic PR's `unix2dos` commit doesn't trigger the workflow → no GHA run URL → no evidence.
**Why it happens:** Easy to overlook the bidirectional contract — the synthetic PR target must MATCH the path-filter entry.
**How to avoid:** If D-04 sub-decision (a) chosen, ADD `docs/decision-trees/09-linux-triage.md` to the path-filter at the same edit. If sub-decision (b) chosen, target a file already in the filter (e.g., `scripts/validation/check-phase-51.mjs` comment block).
**Warning signs:** Synthetic PR push completes but no workflow run appears in the PR's Checks tab.

### Pitfall 8: `workflow_dispatch` Branch Selector Defaults to `master`
**What goes wrong:** Triggering `workflow_dispatch` for SC#5 B.1 baseline requires the workflow file to be on the branch you're dispatching from. If you push the workflow file to a feature branch first and dispatch from `master`, GHA can't find the workflow.
**How to avoid:** Commit the workflow file to `master` FIRST (Phase 69 atomic commit), then `workflow_dispatch` from `master`. Capture the GHA run URL. THEN push the synthetic-PR branch for B.2/B.3.
**Warning signs:** Actions UI shows "no workflow_dispatch trigger available" — the workflow file isn't on the selected branch yet.

## Code Examples

Verified patterns from canonical sources (existing v1.5/v1.6 workflows + GHA docs):

### Pre-Checkout autocrlf Disable (D-01 LOCKED)
```yaml
# Source: github.com/actions/checkout/discussions/976
# + CONTEXT.md D-01 LOCKED contract
- name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
  run: git config --global core.autocrlf false
- uses: actions/checkout@v4
```

### Skip-if-Missing Stub (D-02 LOCKED — canonical idiom)
```yaml
# Source: .github/workflows/audit-harness-v1.6-integrity.yml lines 84-90 (verbatim per Phase 42 D-31)
- name: check-phase-67..70 skip-if-missing stubs
  run: |
    for i in 67 68 69 70; do
      if [ -f scripts/validation/check-phase-$i.mjs ]; then
        node scripts/validation/check-phase-$i.mjs
      else
        echo "check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
      fi
    done
```

### Wall-Clock Measurement + `::notice` (D-03 LOCKED — TIMEOUT-01 instrumentation)
```yaml
# Source: CONTEXT.md D-03 mandatory emission format
# + docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands
- name: Run chain-apex check-phase-66.mjs with wall-clock measurement
  run: |
    START=$(date +%s)
    node scripts/validation/check-phase-66.mjs --verbose
    END=$(date +%s)
    echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)"
```

### Parse Job (Path-A from v1.6 — transitional sidecar reference)
```yaml
# Source: .github/workflows/audit-harness-v1.6-integrity.yml lines 31-48 (verbatim transitional)
parse:
  name: Parse v1.6 sidecar JSON
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: '20' }
    - name: Validate v1.6-audit-allowlist.json
      run: |
        node -e "
          const fs = require('fs');
          const j = JSON.parse(fs.readFileSync('scripts/validation/v1.6-audit-allowlist.json', 'utf8'));
          if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) {
            console.error('supervision_exemptions empty');
            process.exit(1);
          }
          console.log('v1.6 sidecar OK: ' + j.supervision_exemptions.length + ' supervision pins');
        "
```

### Synthetic PR CRLF Injection (D-04 sub-decision (a))
```bash
# Run in a throwaway branch phase-69/sc5-crlf-evidence:
# Source: D-04 LOCKED + recommended sub-decision (a)

# Step 1: install dos2unix (NOT pre-installed on ubuntu-24.04)
sudo apt-get update && sudo apt-get install -y dos2unix

# Step 2: flip line endings on a file in the Phase 69 path-filter
unix2dos docs/decision-trees/09-linux-triage.md

# Step 3: commit + push to trigger negative-case
git add docs/decision-trees/09-linux-triage.md
git commit -m "test(phase-69-sc5): inject CRLF into 09-linux-triage.md for negative case (NO-MERGE)"
git push origin phase-69/sc5-crlf-evidence
# → Capture GHA run URL as B.2 evidence; expect Linux CI EXIT 1 (check-phase-51 catches regression)

# Step 4: revert for positive case on same branch
git revert HEAD --no-edit
git push origin phase-69/sc5-crlf-evidence
# → Capture GHA run URL as B.3 evidence; expect Linux CI EXIT 0

# Step 5: close PR without merge; delete branch
gh pr close <PR-num> --delete-branch
```

### Predecessor-Unchanged Verification (pre-commit local check)
```bash
# Run locally before the Phase 69 workflow-file commit:
git diff --name-only .github/workflows/audit-harness-integrity.yml \
                     .github/workflows/audit-harness-v1.5-integrity.yml \
                     .github/workflows/audit-harness-v1.6-integrity.yml
# Expected: empty output (no predecessor changes)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 19-job parallel per-validator topology (v1.5/v1.6) | Single chain-apex `check-phase-66.mjs` invocation (D-03 LOCKED) | Phase 68 CHAIN-03 (2026-05-26, sha `7b635ca`) | Chain runs in single recursive process; saves 18× setup-node + checkout overhead |
| `core.autocrlf=true` Windows default | LF-only via `.gitattributes` OR pre-checkout `core.autocrlf=false` | Always — Git's default is true on Windows hosts | Per-OS divergence in line endings unless explicitly configured |
| ubuntu-22.04 GHA runner | ubuntu-24.04 (ubuntu-latest as of Jan 2025) | GitHub migration Dec 2024 - Jan 2025 | Some packages removed including `dos2unix`; Java 17 default; Node 22 default |
| `workflow_dispatch: {}` empty object | `workflow_dispatch:` empty value (both valid) | YAML parser accepts both; some linters prefer `{}` | Functionally identical for trigger-without-inputs |
| Subprocess timeout 60s | 300s (Phase 68 TIMEOUT-01) | Phase 68 atomic commit `7b635ca` | Accommodates ~102s empirical chain runtime; 3× headroom |

**Deprecated/outdated:**
- **`actions/checkout@v3`:** Use `@v4` (current; v3 in maintenance mode)
- **`actions/setup-node@v3`:** Use `@v4`
- **Per-validator parallel job topology:** Replaced by chain-apex topology (D-03 LOCKED post-Phase-68 CHAIN-03)
- **`set-output` workflow command:** Deprecated in favor of `$GITHUB_OUTPUT`; not used in Phase 69 anyway

## Validation Architecture

> Phase 69 nyquist_validation enabled (workflow.nyquist_validation default = true; not explicitly set in config.json).

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator harness (`check-phase-NN.mjs` per-phase + `v1.6-milestone-audit.mjs` aggregate) + GitHub Actions YAML schema validation (implicit via GHA platform parse) |
| Config file | `.github/workflows/audit-harness-v1.7-integrity.yml` (the deliverable itself) |
| Quick run command (per validator) | `node scripts/validation/check-phase-NN.mjs` |
| Full suite command (chain sweep — Windows local) | `48..66 \| % { node "scripts/validation/check-phase-$_.mjs" }` (PowerShell) |
| Full suite command (cross-OS — GHA Linux) | `workflow_dispatch` of `audit-harness-v1.7-integrity.yml` on master HEAD |
| Estimated runtime (local Windows) | ~102s per Phase 68 TIMEOUT-01 |
| Estimated runtime (Linux GHA — to be measured) | Unknown; measured in Phase 69 close-gate via `::notice CHAIN_TIMING_LINUX` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CILINUX-01 | `audit-harness-v1.7-integrity.yml` exists with 4 jobs + transitional path-filter + workflow_dispatch + no crons | unit (file existence + YAML structure) | `test -f .github/workflows/audit-harness-v1.7-integrity.yml && grep -c "^  [a-z][a-z-]*:$" .github/workflows/audit-harness-v1.7-integrity.yml` (expect ≥ 4 job declarations) | ❌ Wave 0 (created by Phase 69) |
| CILINUX-01 | `git config --global core.autocrlf false` step precedes `actions/checkout@v4` in `linux-chain-ubuntu-latest` job | unit (YAML structure) | `grep -B1 -A1 "actions/checkout@v4" .github/workflows/audit-harness-v1.7-integrity.yml` — verify autocrlf line appears in BEFORE-context | ❌ Wave 0 |
| CILINUX-01 | `linux-chain-ubuntu-latest` job invokes `check-phase-66.mjs --verbose` | unit (YAML structure) | `grep -q "check-phase-66.mjs --verbose" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ Wave 0 |
| CILINUX-01 | `::notice CHAIN_TIMING_LINUX` emission present | unit (YAML structure) | `grep -q "CHAIN_TIMING_LINUX" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ Wave 0 |
| CILINUX-01 | `timeout-minutes: 30` declared on `linux-chain-ubuntu-latest` job | unit (YAML structure) | `grep -q "timeout-minutes: 30" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ Wave 0 |
| CILINUX-01 | Skip-if-missing stubs for phases 67-70 present | unit (YAML structure) | `grep -q "for i in 67 68 69 70" .github/workflows/audit-harness-v1.7-integrity.yml` (or per-phase stanzas) | ❌ Wave 0 |
| CILINUX-01 | NO `on.schedule:` crons in Phase 69 file | unit (YAML structure — negative assertion) | `! grep -q "schedule:" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ Wave 0 |
| CILINUX-01 | NO `pin-helper-advisory` job in Phase 69 file | unit (YAML structure — negative assertion) | `! grep -q "pin-helper-advisory" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ Wave 0 |
| CILINUX-01 | Predecessor workflow files BYTE-UNCHANGED post-Phase-69 commit | unit (git-level diff) | `git diff $PRE_69_SHA HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml` returns empty | manual verification |
| CILINUX-01 (SC#5 B.1) | `workflow_dispatch` baseline on master HEAD exits 0 + emits `::notice CHAIN_TIMING_LINUX` | integration (GHA run) | GHA Actions UI → trigger `workflow_dispatch` → capture run URL + log tail | runtime evidence (Phase 69 close) |
| CILINUX-01 (SC#5 B.2) | Synthetic CRLF PR exits 1 with check-phase-51 (or -58) catching regression | integration (GHA run) | Push synthetic PR branch; capture run URL showing exit 1 | runtime evidence |
| CILINUX-01 (SC#5 B.3) | Revert commit on synthetic PR branch exits 0 | integration (GHA run) | Push revert commit; capture run URL showing exit 0 | runtime evidence |
| CILINUX-01 (SC#5 B.4) | Windows vs Linux per-validator PASS counts identical (48..66; 67-70 skip-echo) | integration (cross-OS comparison) | Capture local Windows chain output; capture Linux GHA chain output; diff per-validator PASS counts | runtime evidence |

### Sampling Rate

- **Per task commit:** YAML lint + grep for required substrings (sub-second)
- **Per plan wave:** Full chain Windows local (`102s`) + workflow file YAML parse via `node -e "require('js-yaml').load(...)"` (sub-second)
- **Phase gate (Plan 69-NN close):** All sub-second YAML checks PASS + `workflow_dispatch` GHA run exits 0 + synthetic-PR negative/positive both captured

### Wave 0 Gaps

- ❌ `.github/workflows/audit-harness-v1.7-integrity.yml` — the deliverable itself (created in Phase 69 plan)
- ❌ `69-VERIFICATION.md` — created by Phase 69 close-gate plan
- ❌ Synthetic PR branch `phase-69/sc5-crlf-evidence` — created during Phase 69 close-gate execution
- ✅ `check-phase-{48..66}.mjs` chain (existing post-Phase-68)
- ✅ `v1.6-milestone-audit.mjs` + `v1.6-audit-allowlist.json` (existing)
- ✅ `actions/checkout@v4`, `actions/setup-node@v4` GHA marketplace references (always available)

**Wave 0 is mostly NEW-DELIVERABLE-AUTHORED-IN-PHASE-69, not pre-existing scaffolding.** The phase ships its own validation target (the YAML file) along with the validation tests (Windows local chain + GHA workflow_dispatch + synthetic PR). This is consistent with the validator-as-deliverable pattern from v1.3+.

## Security Domain

> security_enforcement appears unset in `.planning/config.json` — treat as enabled. However, Phase 69 ships a CI workflow file (configuration, not code) and reads no user-input data. ASVS application is minimal but documented for completeness.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A — workflow uses default `GITHUB_TOKEN` via actions/checkout@v4; no human auth |
| V3 Session Management | No | N/A — stateless workflow execution per GHA runner-lifecycle |
| V4 Access Control | Yes (light) | GHA's built-in `pull_request` event trusts repo committers; `workflow_dispatch` requires repo write permission (GitHub-platform enforced) |
| V5 Input Validation | Yes (light) | Workflow accepts no user inputs (workflow_dispatch has empty `{}` inputs); inline `node -e` JSON parse uses `JSON.parse` with try-catch absent (acceptable — sidecar shape verified by parse exit code) |
| V6 Cryptography | No | N/A — no cryptography in workflow |
| V8 Data Protection | No | N/A — no PII processed |
| V14 Configuration | Yes | Pinned action versions (`@v4`); no `@latest` floating refs; explicit Node `20` pin |

### Known Threat Patterns for GitHub Actions Workflows

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Untrusted action @main pull (typosquat) | Tampering / Elevation of Privilege | Pin to `@v4` (semver tag, not `@main`); first-party `actions/*` org only |
| Workflow injection via PR title/body | Tampering | N/A — Phase 69 workflow doesn't interpolate `${{ github.event.* }}` user-controlled fields into shell `run:` blocks |
| Credential leakage via env dump | Information Disclosure | No `env:` block in any job; `GITHUB_TOKEN` not echoed |
| Cron-triggered token grant (excessive scope) | Elevation of Privilege | N/A — Phase 69 has NO crons; `workflow_dispatch` triggered manually |
| Self-rewriting workflow (workflow modifies itself in run) | Tampering | N/A — Phase 69 workflow is read-only at runtime |
| Synthetic-PR-injected malicious payload | Tampering | Branch closed-without-merge + deleted; PR-run-URL evidence preserved without master-tree contamination |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `ubuntu-latest` resolves to ubuntu-24.04 as of 2026-05 | Standard Stack §Core | Low — easy to pin `ubuntu-22.04` if needed; both expose Node 20 via `setup-node@v4`. Verified via [github.blog/changelog 2024-12-05] |
| A2 | `actions/checkout@v4` does NOT itself set `core.autocrlf` after the fact | Pitfall 1 | Low — verified in [actions/checkout/discussions/976]; if checkout did set autocrlf post-pull, pre-checkout config would be ineffective and we'd need a different mechanism |
| A3 | Linux ubuntu-latest chain runtime will be ~comparable to Windows ~102s (within 2-3×) | Pitfall 5 | Medium — if Linux is dramatically slower (> 1500s = 25min), `timeout-minutes: 30` could be hit; mitigation = bump to 60. TIMEOUT-01 forward-coordination flag exists explicitly to catch this |
| A4 | `::notice` annotation surfaces in Actions UI summary panel | Code Examples §Wall-Clock | Low — verified in [docs.github.com/workflow-commands] |
| A5 | PR closure preserves GHA run URLs permanently as evidence | D-04 mechanics | Low — standard GitHub behavior; closed PRs retain their full check-run history |
| A6 | Branch deletion has no effect on PR run URL longevity | D-04 mechanics | Low — runs are scoped to commit SHAs, not branch refs; verified by existing GHA behavior |
| A7 | `for i in 67 68 69 70; do ...` for-loop step counts as a SINGLE step in the same job (not 4 separate jobs) | D-03 LOCKED job count | Low — YAML `run:` block with `for` loop is one step; preserves 4-job total |
| A8 | `continue-on-error: false` is the implicit default; not strictly required to declare | D-A9 inheritance | Low — verified GHA default; explicit declaration is documentation-quality, not behavior-changing. Recommended for `linux-chain-ubuntu-latest` for D-A9 forward-coordination clarity. |
| A9 | `actions/checkout@v4` `persist-credentials: true` default is acceptable (no risk of token leak in subsequent steps) | Security V14 | Low — Phase 69 workflow has no steps that exfiltrate workspace state; `persist-credentials` only matters if untrusted code is executed |
| A10 | `dos2unix` is NOT pre-installed on ubuntu-24.04 | Pitfall 2 | Low — verified via [actions/runner-images Ubuntu2404-Readme.md page-fetch]; if mistaken, the `apt-get install` step is harmless redundancy |
| A11 | `actions/checkout@v4` defaults to `fetch-depth: 1` (sufficient for Phase 69 — no need for full git history) | Standard Stack | Low — verified in [github.com/actions/checkout README]; chain validators read working-tree files only, no git-log needed |

**If this table changes:** A3 is the only assumption with non-trivial planning impact — if Phase 69 close-gate reveals Linux > 1500s, `timeout-minutes` must bump. Plan should include a re-measurement step at SC#5 B.1 capture.

## Open Questions

### Q1: For SC#5 B.4 PASS-count diff table, where does check-phase-66 emit per-validator PASS counts?
- **What we know:** `check-phase-66.mjs --verbose` emits a final line `Result: N PASS, M FAIL, K SKIPPED\n` (from line 378 in the script). Per-validator detail lines are emitted with the format `[check_id/total] V-66-NN: ...` showing PASS/FAIL/SKIPPED.
- **What's unclear:** Whether the per-validator PASS counts for the recursively-spawned `check-phase-{48..65}` validators are surfaced in `check-phase-66.mjs` stdout, or only their exit codes (single-line summary).
- **Reading the script:** Line 311-320 of `check-phase-66.mjs` shows recursively-spawned validators' results are captured via `execFileSync('node', [path], { stdio: 'pipe', ... })` — the output is consumed internally but NOT relayed to parent stdout. Only the parent's per-CHAIN-NN check (which is "check-phase-N exits 0") is reported.
- **Recommendation:** For SC#5 B.4 PASS-count diff table, run the chain via a sibling for-loop step on the Linux side (NOT inside check-phase-66's recursive spawn), or instrument with separate per-validator capture. Simplest: add a second step that runs `for i in 48..66; do node scripts/validation/check-phase-$i.mjs 2>&1 | tail -1; done` ALONGSIDE the chain-apex invocation, capturing the per-validator final-line PASS counts for the diff table. This is evidence-capture mechanism only; not required by D-03 contract.
- **Plan-phase action:** Decide at Plan 69-NN whether to add this evidence-capture step (lightweight; 5 sec) or rely on local-Windows-vs-GHA-Linux exit-code parity alone for SC#5 B.4.

### Q2: When does `pull_request` path-filter trigger on `.planning/REQUIREMENTS.md` cause unwanted CI fires?
- **What we know:** Phase 69 LOCKED transitional path-filter includes REQUIREMENTS.md so contract changes self-verify. Phase 70 HARNESS-04(a) rewrites the path-filter.
- **What's unclear:** Between Phase 69 close and Phase 70 close, any PR that edits REQUIREMENTS.md fires the v1.7 workflow. The transitional `parse`/`path-match`/`harness-run` jobs reference v1.6 sidecar — they'll PASS even if REQUIREMENTS.md is being amended for v1.7. The `linux-chain-ubuntu-latest` job runs the v1.6-era chain on Linux — also PASS-expected.
- **Risk:** Low. Phase 70 lands ~1 week after Phase 69 per STATE.md velocity estimates; the transitional window is brief.
- **Recommendation:** No action; Phase 70 HARNESS-04(a) cleans this up. Document in 69-VERIFICATION.md §E Discoveries if any unexpected fires occur during the transitional window.

### Q3: Does `actions/checkout@v4` honor `git config --global` set in a previous step within the same job?
- **What we know:** [github.com/actions/checkout/discussions/976] documents the pre-checkout global-config pattern as the canonical workaround.
- **What's unclear:** Whether different `actions/checkout` versions handle config inheritance identically.
- **Verification:** Verified in v4 — runner pre-step shell environment persists across steps within a single job; `--global` writes to `~/.gitconfig` which checkout reads.
- **Recommendation:** No further action. The 2-step pattern (config first, checkout second) is canonical.

### Q4: D-04 sub-decision (a) vs (b) — final pick at plan-phase
- **What we know:** CONTEXT.md recommends (a) `docs/decision-trees/09-linux-triage.md` for evidence realism; planner has discretion.
- **What's unclear:** Whether (a)'s path-filter expansion creates a cleanup burden at Phase 70 HARNESS-04(a) (it does — one line to remove).
- **Recommendation:** Pick (a) per CONTEXT.md recommendation. The Phase 70 HARNESS-04(a) handoff note in 69-VERIFICATION.md §F should explicitly call out "remove `docs/decision-trees/09-linux-triage.md` from path-filter" — one line.

### Q5: Should Phase 69 add an explicit `if [ -f .gitattributes ]` defensive check?
- **What we know:** No `.gitattributes` exists in the repo today (verified via `cat .gitattributes` returning empty/no-file).
- **What's unclear:** If a future v1.8+ phase adds `.gitattributes` with `* text=auto`, would that override the pre-checkout autocrlf=false setting?
- **Answer:** `.gitattributes` `text=auto` DOES override per-user/per-host autocrlf settings — but in a beneficial direction here (it enforces consistent normalization across all hosts). If v1.8+ adds `.gitattributes text=auto`, the LF-fidelity contract becomes redundant but not harmful.
- **Recommendation:** No defensive check needed in Phase 69. Out-of-scope concern.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Git | All workflow steps + local Windows verification | ✓ | 2.x+ | — |
| Node.js (local Windows verification) | Chain validator runs (Phase 69 close-gate) | ✓ | v24.15.0 (per 68-VALIDATION.md) | — |
| Node.js (GHA ubuntu-latest) | `linux-chain-ubuntu-latest` job | ✓ | 20 (pinned via `setup-node@v4`) | — |
| `actions/checkout@v4` (GHA marketplace) | All jobs in new workflow | ✓ | v4 | — |
| `actions/setup-node@v4` (GHA marketplace) | All jobs in new workflow | ✓ | v4 | — |
| `dos2unix` / `unix2dos` (GHA ubuntu-24.04) | Synthetic PR negative case (SC#5 B.2) | ✗ | NOT pre-installed [VERIFIED: actions/runner-images Ubuntu2404-Readme] | `sudo apt-get install -y dos2unix` step in synthetic-PR branch, OR `printf '\r\n'`/`sed` fallback |
| `gh` CLI (developer machine) | Synthetic PR close + branch delete | ✓ (project uses gh per CLAUDE.md style) | recent | manual via web UI |
| `git diff` (developer machine) | Predecessor-unchanged verification pre-commit | ✓ | git default | — |

**Missing dependencies with no fallback:**
- None.

**Missing dependencies with fallback:**
- `dos2unix` on ubuntu-24.04 — installed via `apt-get install -y dos2unix` in synthetic-PR branch (NOT in Phase 69 workflow file itself).

## Phase 70 Forward-Coordination Contract

Captured here for the planner to mirror into the Plan 69-NN forward-coordination flags / 69-VERIFICATION.md §F:

1. **Skeleton-to-extension boundary:** Phase 70 HARNESS-04 Path-A copies v1.6 workflow jobs INTO the existing `audit-harness-v1.7-integrity.yml` (do NOT recreate the file). The 4 Phase 69 jobs become the foundation; Phase 70 adds:
   - `parse` / `path-match` / `harness-run` repointed to v1.7 sidecar + v1.7-milestone-audit.mjs
   - `linux-chain-ubuntu-latest` extended: skip-if-missing stubs for 67-70 become active `node` invocations (drop the for-loop stubs; add explicit per-phase stanzas matching v1.5/v1.6 style)
   - 2 crons added: weekly bitrot `0 8 * * 1` + quarterly rotting-external `0 8 1 1,4,7,10 *`
   - `pin-helper-advisory` job bound to v1.7 sidecar
   - **If D-04 sub-decision (a) chosen in Phase 69:** path-filter rewrite REMOVES `docs/decision-trees/09-linux-triage.md` (Phase 69 SC#5-evidence-only entry)

2. **TIMEOUT-01 measurement feedback loop:** Phase 69's `::notice CHAIN_TIMING_LINUX` from `workflow_dispatch` baseline (SC#5 B.1) is the input to Phase 70 HARNESS-04's timeout-budget review. If Linux wall-clock > ~150s (50% of 300s budget), v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 escalates to v1.8+ subprocess-timeout-architecture review.

3. **D-22 / D-03 auditor-independence axis stacking:** Phase 69 introduces the THIRD axis (separate OS + separate host process). Phase 70 HARNESS-05 terminal re-audit stacks all three (fresh-clone + fresh-sub-agent + Linux) at v1.7 close per Phase 68 §G discoveries.

4. **HARNESS-03 validator-as-deliverable handoff:** Phase 70 HARNESS-03 ships `check-phase-{67..70}.mjs` validators. Each must be V-NN-CHAIN forward-compatible — including a CHAIN-01 self-verifier asserting INTENT (`exit 0 + 0 CHAIN_SKIP`) NOT literal-letter grep of `\r?\n` source per Phase 68 D-01 Caveat. The skip-if-missing for-loop in Phase 69's `linux-chain-ubuntu-latest` job becomes redundant once HARNESS-03 lands — Phase 70 HARNESS-04 drops it.

5. **Transitional path-filter swap:** Phase 69 uses transitional filter (`scripts/validation/check-phase-*.mjs` + workflow self-ref + `.planning/REQUIREMENTS.md`). Phase 70 HARNESS-04(a) REPLACES this with v1.7-scoped filter (`scripts/validation/v1.7-*` + v1.7-docs surface). The replacement is byte-rewrite, not append.

## Sources

### Primary (HIGH confidence)
- `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-CONTEXT.md` — all 4 D-01..D-04 LOCKED decisions
- `.planning/REQUIREMENTS.md` — CILINUX-01 binding contract (line 26) + Pillar D HARNESS-04 destination (line 36)
- `.planning/STATE.md` — v1.7 architectural decisions; CI-Linux as 3rd auditor-independence axis
- `.planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-CONTEXT.md` — atomic-commit precedent + CHAIN-01 readFile centralization
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` — TIMEOUT-01 forward-coordination
- `.github/workflows/audit-harness-v1.6-integrity.yml` — Path-A reference for parse/path-match/harness-run jobs
- `.github/workflows/audit-harness-v1.5-integrity.yml` — skip-if-missing canonical idiom (lines 78-83 et al.)
- `scripts/validation/check-phase-66.mjs` — chain-apex source; CHAIN_SKIP empty Set (line 66); subprocess timeout 300000 (line 310)
- `scripts/validation/check-phase-51.mjs` lines 14-18 — CRLF-hardened readFile (Phase 68 CHAIN-01 target of synthetic PR D-04 sub-decision (a))
- [docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands] — `::notice` annotation semantics
- [github.com/actions/checkout/discussions/976] — pre-checkout `git config --global` pattern (canonical workaround for autocrlf)
- [github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md] — Verified `dos2unix`/`unix2dos` absence from ubuntu-24.04
- [github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/] — ubuntu-latest → ubuntu-24.04 migration timeline

### Secondary (MEDIUM confidence)
- [github.blog/changelog/2024-12-05-notice-of-upcoming-releases-and-breaking-changes-for-github-actions/] — Dec 2024 breaking-changes summary
- [github.com/orgs/community/discussions/26098] — `workflow_dispatch: {}` empty-object syntax acceptance
- [spacelift.io/blog/github-actions-checkout] — actions/checkout v4 defaults + persist-credentials behavior

### Tertiary (LOW confidence — flagged for plan-phase verification)
- None. All claims verified to MEDIUM or HIGH per source hierarchy.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All deps pinned in v1.5/v1.6 workflows; verified at action marketplace
- Architecture: HIGH — 4-job topology LOCKED per D-03; chain-apex semantics verified by reading `check-phase-66.mjs`
- Pitfalls: HIGH — All 8 pitfalls grounded in official docs or empirical Phase 68 measurement
- D-04 mechanics: HIGH — D-04 LOCKED with verified `dos2unix` install path
- Phase 70 forward-coordination: HIGH — Mirrors CONTEXT.md §Code Context §Integration Points verbatim

**Research date:** 2026-05-26
**Valid until:** 2026-06-25 (30 days for stable GHA platform; re-verify ubuntu-latest pointer + `dos2unix` availability if Phase 69 execution slips past this date)

---

*Phase: 69-ci-linux-hardening-pillar-c-cross-os-verification*
*Research authored: 2026-05-26 by gsd-phase-researcher*
