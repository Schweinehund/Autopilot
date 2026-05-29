# Phase 69: CI-Linux Hardening (Pillar C — Cross-OS Verification) - Pattern Map

**Mapped:** 2026-05-26
**Files analyzed:** 1 NEW + 5 read-only references (analog/secondary; not modified)
**Analogs found:** 1 / 1 (exact analog for harness slice; partial analog for new linux-chain slice — single-job chain-apex topology has NO direct analog by design per D-03 LOCKED)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.github/workflows/audit-harness-v1.7-integrity.yml` (**NEW**) | CI workflow (GitHub Actions YAML) | event-driven (PR trigger + workflow_dispatch); orchestrates chain validator subprocess | `.github/workflows/audit-harness-v1.6-integrity.yml` (Path-A per D-01 LOCKED) | **exact-for-harness-slice / partial-for-chain-slice** |

**Match quality breakdown:**
- **Harness slice (`parse` + `path-match` + `harness-run` jobs)** — exact analog: v1.6 workflow lines 30-74 are Path-A copied verbatim (sidecar references stay v1.6 transitionally per CONTEXT D-01).
- **Chain slice (`linux-chain-ubuntu-latest` job)** — partial analog: v1.5/v1.6 per-validator skip-if-missing stanzas (e.g., v1.5 lines 69-83 for check-phase-48) provide the `if [ -f ... ]; then ...; else echo "skip per Phase 42 D-31"; fi` idiom; the **single-job chain-apex shape** (invoking `check-phase-66.mjs` recursively per Phase 68 CHAIN-03) is **synthesized new** per D-03 LOCKED. No prior workflow has this shape — by design (post-CHAIN-03 chain-apex pattern post-dates all predecessors).

**Read-only references (NOT modified by Phase 69):**

| File | Purpose | Why Read |
|------|---------|----------|
| `.github/workflows/audit-harness-integrity.yml` (v1.4) | Predecessor invariant target | Confirm BYTE-UNCHANGED status (no excerpts needed — not modified) |
| `.github/workflows/audit-harness-v1.5-integrity.yml` (v1.5) | Predecessor invariant target + skip-if-missing canonical idiom source (lines 69-83) | Extract skip-if-missing stub idiom; predecessor BYTE-UNCHANGED |
| `.github/workflows/audit-harness-v1.6-integrity.yml` (v1.6) | Predecessor invariant target + Path-A source (lines 30-74) | Verbatim copy of 3 harness-slice jobs; predecessor BYTE-UNCHANGED |
| `scripts/validation/check-phase-66.mjs` | Chain-apex target (Phase 69 workflow invokes this) | Verify recursive `execFileSync` spawn pattern with `timeout: 300000` |
| `scripts/validation/v1.6-milestone-audit.mjs` | `harness-run` job target (transitional) | No read needed — referenced by name in `harness-run` step |
| `scripts/validation/v1.6-audit-allowlist.json` | `parse` job validates this sidecar JSON | No read needed — referenced by name in `parse` step |

---

## Pattern Assignments

### `.github/workflows/audit-harness-v1.7-integrity.yml` (CI workflow, event-driven)

**Primary analog:** `.github/workflows/audit-harness-v1.6-integrity.yml`
**Secondary analog:** `.github/workflows/audit-harness-v1.5-integrity.yml` (skip-if-missing idiom only)

#### Excerpt 1: `parse` job — copy VERBATIM from v1.6 lines 31-48

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 31-48

```yaml
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

**Transitional notes:** This references `v1.6-audit-allowlist.json` (not v1.7). Phase 70 HARNESS-04 repoints to v1.7-audit-allowlist.json after HARNESS-02 lands the v1.7 sidecar.

#### Excerpt 2: `path-match` job — copy VERBATIM from v1.6 lines 50-63

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 50-63

```yaml
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
```

**Transitional notes:** Verifies the v1.6 harness references its v1.6 sidecar. Phase 70 HARNESS-04 repoints to v1.7 lineage (1-line edit: `v1.6` → `v1.7` in both substrings).

#### Excerpt 3: `harness-run` job — copy VERBATIM from v1.6 lines 65-74

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 65-74

```yaml
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
```

**Transitional notes:** Phase 70 HARNESS-04 repoints to `v1.7-milestone-audit.mjs` after HARNESS-01 lands the Path-A copy.

#### Excerpt 4: Skip-if-missing stub idiom — adapt from v1.5 lines 77-83 (compressed into for-loop)

**Source (canonical idiom):** `.github/workflows/audit-harness-v1.5-integrity.yml` lines 77-83 (check-phase-48 stanza — same pattern repeated for phases 49-61) AND `.github/workflows/audit-harness-v1.6-integrity.yml` lines 84-90 (check-phase-62 stanza — same pattern repeated for phases 63-66)

**v1.5/v1.6 per-validator stanza shape (one stanza per phase across 24+ occurrences):**

```yaml
      - name: Run check-phase-48.mjs
        run: |
          if [ -f scripts/validation/check-phase-48.mjs ]; then
            node scripts/validation/check-phase-48.mjs
          else
            echo "check-phase-48.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
          fi
```

**Phase 69 ADAPTATION (compressed to single for-loop step per D-02 + D-03 LOCKED — preserves canonical echo string verbatim):**

```yaml
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

**CRITICAL — echo string verbatim invariant:** Per CONTEXT.md `Claude's Discretion` line 176: use literal `"check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"` — DO NOT paraphrase the Phase 42 D-31 attribution. The string is the canonical project attribution preserved across 24+ prior occurrences.

#### Excerpt 5: NEW `linux-chain-ubuntu-latest` job — SYNTHESIZED (no direct analog)

**Synthesis source:** CONTEXT.md D-03 LOCKED + RESEARCH.md Code Examples §1-5 + `scripts/validation/check-phase-66.mjs` lines 22 + 310 (recursive `execFileSync` with `timeout: 300000` confirms chain-apex semantics)

**Why no direct analog:** v1.5/v1.6 workflows use 19-job parallel per-validator topology (one job per phase). Post-Phase-68 CHAIN-03 (`7b635ca`), `check-phase-66.mjs` IS the chain apex — it recursively spawns `check-phase-{48..65}` via `execFileSync` internally (verified at `check-phase-66.mjs:310`). Phase 69 D-03 Option C LOCKED replaces the 19-job topology with a single chain-apex job. This is structurally novel for the project.

**Full job synthesis (from RESEARCH.md §Pattern 1 + D-03 LOCKED contract):**

```yaml
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

**Key NEW elements (no precedent in v1.4/v1.5/v1.6):**

| Element | Rationale | Source |
|---------|-----------|--------|
| `git config --global core.autocrlf false` as standalone first step BEFORE `actions/checkout@v4` | LF-fidelity contract — pre-checkout global config is the ONLY reliable mechanism per github.com/actions/checkout/discussions/976 | CONTEXT D-01 LOCKED line 83; RESEARCH §Pitfall 1 |
| `timeout-minutes: 30` at job level | 9× empirical headroom over Windows ~102s chain runtime | CONTEXT line 130; RESEARCH §Pitfall 5 |
| `needs: harness-run` | Sequential dependency chain `parse → path-match → harness-run → linux-chain-ubuntu-latest` | D-03 LOCKED |
| Wall-clock measurement `START=$(date +%s); ...; END=$(date +%s); echo "::notice"` | TIMEOUT-01 forward-coordination data point — surfaces in GHA Actions UI summary panel | CONTEXT D-03 line 122; RESEARCH §Pitfall 3 |
| `::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)` literal format | Verbatim mandatory emission format per D-03 LOCKED | CONTEXT line 122 + line 177 |
| Skip-if-missing for phases 67-70 as **single for-loop step** (not 4 separate jobs) | D-03 LOCKED 4-job total; assumption A7 confirms for-loop counts as one step | CONTEXT D-02 line 90-102; RESEARCH §A7 |
| Invocation of `check-phase-66.mjs --verbose` (NOT individual `check-phase-{48..65}`) | Chain-apex recursively spawns 48..65 via `execFileSync` per `check-phase-66.mjs:310` | CONTEXT D-03 line 126; verified at `check-phase-66.mjs:22 + :310` |

#### Excerpt 6: Header + triggers — adapt from v1.6 lines 1-28 (with cron OMISSIONS per D-01 LOCKED)

**Source for `name` + `on.pull_request` shape:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 1-28

**v1.6 head section (lines 1-28):**

```yaml
# v1.6 Audit Harness Integrity
# v1.6 integration surface. v1.4 + v1.4.1 + v1.5 harnesses frozen in their respective workflow files.
# New v1.6 checks (C14-C16) and per-phase validators (62-66) registered here.

name: Audit Harness v1.6 Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/v1.6-*'
      - 'docs/cross-platform/apple-business/**'
      - 'docs/l1-runbooks/34-apple-business-*.md'
      [...10 more v1.6-scoped doc paths...]
      - '.github/workflows/audit-harness-v1.6-integrity.yml'
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch: 08:00 UTC every Monday (Path-A from v1.5)
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check: 08:00 UTC on 1st of Jan/Apr/Jul/Oct (Phase 66 AUDIT-14)
  workflow_dispatch:
```

**Phase 69 ADAPTATION (transitional path-filter + crons OMITTED + workflow_dispatch retained per D-01 LOCKED):**

```yaml
# v1.7 Audit Harness Integrity
# v1.7 integration surface. v1.4 + v1.5 + v1.6 harnesses frozen in their respective workflow files.
# Phase 69 (CILINUX-01) skeleton: 4 jobs + transitional path-filter + workflow_dispatch.
# Phase 70 HARNESS-04 extends with v1.7-scoped paths, both crons, pin-helper-advisory, and active check-phase-67..70 invocation.

name: Audit Harness v1.7 Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.7-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      # [if D-04 sub-decision (a) chosen at plan-phase] - 'docs/decision-trees/09-linux-triage.md'
  workflow_dispatch:

# NOTE: on.schedule: OMITTED in Phase 69 — both crons (weekly bitrot + quarterly rotting-external)
# are Phase 70 HARNESS-04(b) deliverables. Firing crons pre-v1.7-sidecar would target v1.6 sidecar
# which is transitional-only in this skeleton; semantically wrong as bitrot-checking surface.
```

**Path-filter delta from v1.6 (intentional):**

| v1.6 path-filter entry | Phase 69 v1.7 path-filter | Rationale |
|---|---|---|
| `'scripts/validation/v1.6-*'` | `'scripts/validation/check-phase-*.mjs'` | v1.6 scoped to v1.6 lineage; v1.7 transitional surface scopes to chain validators only (D-01 LOCKED) |
| v1.6 doc-surface paths (apple-business, l1/l2 runbooks, etc.) | **OMITTED** | Phase 69 skeleton does not own v1.7 doc-surface; Phase 70 HARNESS-04(a) defines it |
| `'.github/workflows/audit-harness-v1.6-integrity.yml'` | `'.github/workflows/audit-harness-v1.7-integrity.yml'` | Self-reference to the new workflow |
| (none — v1.6 has no REQUIREMENTS.md trigger) | `'.planning/REQUIREMENTS.md'` | Phase 69 self-verifies contract changes per CONTEXT line 65; Phase 70 removes when v1.7 binding contract closes |

---

## Shared Patterns

### Pattern S1: Pinned action versions (V14 Configuration)

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 35-37 (occurs 6+ times)
**Apply to:** Every job's checkout + setup-node steps in the new workflow

```yaml
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
```

**Invariant:** Pin to `@v4` (semver tag), NEVER `@main` or `@latest`. Node 20 explicit pin overrides ubuntu-24.04's default Node 22.

### Pattern S2: `needs:` sequential dependency chain

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 53, 68, 79, 95, 111, 127, 143
**Apply to:** Every Phase 69 job except `parse` (the entrypoint)

```yaml
  path-match:
    needs: parse
  harness-run:
    needs: path-match
  linux-chain-ubuntu-latest:
    needs: harness-run
```

**Invariant:** Linear chain — `parse → path-match → harness-run → linux-chain-ubuntu-latest`. Per D-03 LOCKED, the chain-apex job runs AFTER harness-run (not in parallel).

### Pattern S3: `continue-on-error: false` (PR-blocking via D-A9 inheritance)

**Source:** v1.6 workflow does NOT explicitly declare this (implicit default); EXCEPT `pin-helper-advisory` at line 194 declares `continue-on-error: true` to override
**Apply to:** All Phase 69 jobs (implicit default; explicit on `linux-chain-ubuntu-latest` for forward-coordination clarity per RESEARCH §A8)

```yaml
  linux-chain-ubuntu-latest:
    # continue-on-error: false explicit (D-A9 inheritance — PR-blocking; documented for forward-coordination clarity)
```

**Invariant:** No `continue-on-error: true` in Phase 69 (pin-helper-advisory is OUT OF SCOPE — Phase 70 HARNESS-04(d)).

### Pattern S4: Inline `node -e "..."` for trivial JSON validation

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 39-48 (parse job)
**Apply to:** `parse` job only

```yaml
        run: |
          node -e "
            const fs = require('fs');
            const j = JSON.parse(fs.readFileSync('scripts/validation/v1.6-audit-allowlist.json', 'utf8'));
            [shape check...]
          "
```

**Invariant:** Heredoc-style multiline `node -e` for sub-1KB validators; for larger logic, invoke an .mjs file via `node scripts/...` (as in `harness-run`).

### Pattern S5: `grep -q` for path-reference verification

**Source:** `.github/workflows/audit-harness-v1.6-integrity.yml` lines 57-62 (path-match job)
**Apply to:** `path-match` job only

```yaml
        run: |
          if grep -q "<expected-substring>" <target-file>; then
            echo "OK: ..."
          else
            echo "FAIL: ..."
            exit 1
          fi
```

**Invariant:** Use `grep -q` (quiet mode + exit-code semantics) NOT `grep <pattern> <file> > /dev/null`.

---

## NEW Patterns (no analog — synthesized for Phase 69)

### NEW-1: Pre-checkout `git config --global core.autocrlf false`

**Source:** github.com/actions/checkout/discussions/976 (canonical workaround) + CONTEXT D-01 LOCKED line 83 + RESEARCH §Pitfall 1
**Apply to:** `linux-chain-ubuntu-latest` job ONLY

```yaml
    steps:
      - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
```

**CRITICAL invariant:** This step MUST be the FIRST step of the `linux-chain-ubuntu-latest` job, BEFORE `actions/checkout@v4`. The checkout action does the actual git pull; only pre-checkout global config affects line-ending behavior of the pull itself. Local config or env-var hacks AFTER checkout are unreliable and break the LF-fidelity contract.

**Why not `parse`/`path-match`/`harness-run`:** Those 3 jobs don't read line-ending-sensitive content — they validate JSON shape (parse), grep for substrings (path-match), and run the v1.6 milestone audit harness (harness-run) which does its own internal line-ending normalization. Only the chain validators (CHAIN-01-hardened `check-phase-51.mjs` and `check-phase-58.mjs`) are LF-sensitive.

### NEW-2: Wall-clock measurement + `::notice` annotation

**Source:** CONTEXT D-03 LOCKED line 122 (mandatory emission format) + docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands
**Apply to:** `linux-chain-ubuntu-latest` job ONLY

```yaml
      - name: Run chain-apex check-phase-66.mjs (recursively spawns 48..65)
        run: |
          START=$(date +%s)
          node scripts/validation/check-phase-66.mjs --verbose
          END=$(date +%s)
          echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)"
```

**Invariant:** The `::notice` MUST be printed AFTER `node scripts/validation/check-phase-66.mjs --verbose` completes (RESEARCH §Pitfall 3 — ordering matters for log readability). Literal annotation format per CONTEXT line 122.

**Forward-coordination:** Output feeds Phase 70 HARNESS-04's timeout-budget review — if Linux wall-clock > 150s (50% of 300s subprocess budget), v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 escalates to v1.8+ architecture review.

### NEW-3: Single chain-apex job replacing 19-parallel-jobs topology

**Source:** Post-Phase-68 CHAIN-03 `7b635ca` chain-apex pattern; CONTEXT D-03 LOCKED
**Apply to:** `linux-chain-ubuntu-latest` job ONLY

```yaml
      - name: Run chain-apex check-phase-66.mjs (recursively spawns 48..65)
        run: node scripts/validation/check-phase-66.mjs --verbose
```

**Why no analog:** v1.5/v1.6 workflows define one job per validator (19+ jobs total). Post-CHAIN-03, `check-phase-66.mjs:310` recursively spawns `check-phase-{48..65}` via `execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, ... })`. A single invocation of `check-phase-66.mjs --verbose` runs the entire chain. The v1.5/v1.6 pre-CHAIN-03 topology would be 18× redundant compute on Linux.

**Verification snippet (from `scripts/validation/check-phase-66.mjs:310`):**

```javascript
execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
```

---

## Pattern Boundary Table — Copy verbatim vs Synthesize new vs Omit

| Element | Phase 69 disposition | Source | Phase 70 follow-up |
|---|---|---|---|
| `name: Audit Harness v1.7 Integrity` | Synthesize (1-line bump from v1.6) | v1.6 line 5 → swap "v1.6" → "v1.7" | (unchanged) |
| Leading comment block | Synthesize (3-line skeleton-aware comment) | v1.6 lines 1-3 → adapted | Phase 70 HARNESS-04 may extend comment |
| `on.pull_request.paths:` transitional surface | Synthesize (4 entries — Path-A shape from v1.6, content NEW per D-01 LOCKED) | v1.6 lines 8-24 → shape preserved, paths NEW | HARNESS-04(a) rewrites to v1.7-scoped paths |
| `on.schedule:` 2 crons | **OMIT** | v1.6 lines 25-27 — NOT copied | HARNESS-04(b) adds both crons |
| `on.workflow_dispatch:` | Copy verbatim | v1.6 line 28 | (unchanged) |
| `parse` job | **Copy VERBATIM** from v1.6 lines 31-48 | v1.6 lines 31-48 | HARNESS-04(c) repoints to v1.7 sidecar (1-line edit) |
| `path-match` job | **Copy VERBATIM** from v1.6 lines 50-63 | v1.6 lines 50-63 | HARNESS-04(c) repoints to v1.7 lineage (1-line edit) |
| `harness-run` job | **Copy VERBATIM** from v1.6 lines 65-74 | v1.6 lines 65-74 | HARNESS-04(c) repoints to v1.7-milestone-audit.mjs (1-line edit) |
| Per-validator parallel jobs (check-phase-48..66) | **OMIT** (19 jobs) | v1.6 lines 76-154 (5 stanzas) + v1.5 lines 69-291 (14 stanzas) — NOT copied | (no follow-up — replaced by chain-apex pattern post-CHAIN-03) |
| `linux-chain-ubuntu-latest` job | **SYNTHESIZE NEW** (no analog) | RESEARCH §Pattern 1 + D-03 LOCKED | HARNESS-04 extends skip-if-missing stubs to active `node` invocations as 67..70 land via HARNESS-03 |
| Skip-if-missing echo string `"check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"` | **Copy VERBATIM** (literal attribution; do NOT paraphrase) | v1.5 lines 78-83 (24+ occurrences) | HARNESS-04 drops the for-loop entirely once 67-70 validators land |
| `rotting-external-quarterly` job | **OMIT** | v1.6 lines 156-188 — NOT copied | HARNESS-04(b) adds bound to v1.7 sidecar |
| `pin-helper-advisory` job | **OMIT** | v1.6 lines 190-206 — NOT copied | HARNESS-04(d) adds bound to v1.7 sidecar |

**Copy-verbatim summary (3 jobs):** `parse` + `path-match` + `harness-run`.
**Synthesize-new summary (1 job + 6 elements):** `linux-chain-ubuntu-latest` job + name bump + comment + path-filter content + crons OMITTED + path-A from skip-if-missing idiom into for-loop form.
**Omit summary (3 jobs + 1 trigger):** 19 per-validator jobs (replaced by chain-apex) + `rotting-external-quarterly` job + `pin-helper-advisory` job + both `on.schedule` crons.

---

## Pre-existing Chain-Apex Semantics

**`scripts/validation/check-phase-66.mjs` already exists** (created Phase 66; refined Phase 68 CHAIN-03 to empty `CHAIN_SKIP` Set at `7b635ca`). Phase 69 only REFERENCES this file via `node scripts/validation/check-phase-66.mjs --verbose` — it does NOT modify it.

**Verified semantics (read at `scripts/validation/check-phase-66.mjs`):**

- **Line 22:** `import { execFileSync } from 'node:child_process';` — recursive spawn capability imported
- **Line 43:** `const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];` — explicit chain enumeration
- **Line 66:** `const CHAIN_SKIP = new Set([]);` — EMPTY post-Phase-68 CHAIN-03 (no validators suppressed)
- **Line 310:** `execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });` — 300s subprocess timeout per Phase 68 TIMEOUT-01

**Implication for Phase 69:** A single `node scripts/validation/check-phase-66.mjs --verbose` invocation in the `linux-chain-ubuntu-latest` job runs the FULL chain (48..66 = 19 phases) with 300s per-subprocess cap. Empirical Windows wall-clock is ~102s per Phase 68 TIMEOUT-01; Linux timing is the open data point Phase 69 captures via the `::notice CHAIN_TIMING_LINUX` emission (SC#5 B.1).

---

## No Analog Found

| Element | Role | Reason |
|---|---|---|
| `git config --global core.autocrlf false` standalone pre-checkout step | LF-fidelity contract enforcement | NEW for Phase 69 — no prior workflow needs cross-OS line-ending fidelity (v1.4/v1.5/v1.6 ran exclusively on ubuntu-latest with default config) |
| Wall-clock `START/END $(date +%s)` + `::notice CHAIN_TIMING_LINUX` emission | TIMEOUT-01 forward-coordination instrumentation | NEW for Phase 69 — no prior workflow needed timing telemetry (Phase 68 TIMEOUT-01 raised the data-gap question) |
| Single chain-apex job replacing 19-parallel-jobs topology | Cross-OS chain orchestration | NEW for Phase 69 — post-Phase-68 CHAIN-03 chain-apex semantics post-date all predecessor workflows |
| `timeout-minutes: 30` at job level | Safety budget | NEW for Phase 69 — predecessors used GHA default 6-hour job timeout; Phase 69's tighter cap is a 9× empirical headroom statement (102s × 9 ≈ 1500s ≈ 25min < 30min cap) |
| `needs: harness-run` for chain-apex job | Sequential dependency through harness-slice | Pattern (`needs:`) is shared with predecessors; specific dependency (`harness-run → linux-chain-ubuntu-latest`) is NEW per D-03 LOCKED |

**Planner action:** For the 5 NEW elements above, use RESEARCH.md §Pattern 1 + §Code Examples §1-5 as authoritative source. There is no codebase analog to point to.

---

## Metadata

**Analog search scope:**
- `.github/workflows/*.yml` (all 3 predecessor workflows fully read)
- `scripts/validation/check-phase-66.mjs` (chain-apex semantics verified at lines 22, 43, 66, 310)
- Secondary references (`v1.6-milestone-audit.mjs`, `v1.6-audit-allowlist.json`) referenced by name only — not read (no excerpts needed; they are step targets, not pattern sources)

**Files scanned:** 4 workflows + 1 validator (chain-apex) = 5 files read end-to-end or targeted-section-read
**Read efficiency:** 1 full v1.6 workflow (207 lines, 1 pass); 1 targeted v1.5 section (lines 1-178 across 2 non-overlapping reads); 1 targeted check-phase-66.mjs (lines 1-80 + grep-located lines 307-332)

**Pattern extraction date:** 2026-05-26
**Source-of-truth lineage:** CONTEXT D-01..D-04 LOCKED → RESEARCH §Pattern 1 + Code Examples §1-5 + Pitfalls §1-8 → analog excerpts above

---

*Phase: 69-CI-Linux Hardening (Pillar C — Cross-OS Verification)*
*Pattern map authored: 2026-05-26 by gsd-pattern-mapper*
