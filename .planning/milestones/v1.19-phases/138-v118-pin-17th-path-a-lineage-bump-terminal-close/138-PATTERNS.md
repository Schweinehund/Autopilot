# Phase 138: V118 Pin + 17th Path-A Lineage Bump + Terminal Close - Pattern Map

**Mapped:** 2026-08-03
**Files analyzed:** 11 new/modified deliverable files (+ 4-doc close-gate touch set)
**Analogs found:** 11 / 11 (all exact, one-generation-older predecessor)

This phase is unusually direct Path-A copy-forward. CONTEXT.md and RESEARCH.md already contain verified line-level excerpts from every analog (opened this session by the researcher); this file curates them into planner-facing pattern assignments. No additional codebase exploration was needed beyond confirming three excerpts not already quoted verbatim (frozen-at-close.mjs V117 entry, the workflow leaf-job YAML skeleton, and check-phase-134.mjs's header comment block).

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/_lib/frozen-at-close.mjs` (append) | utility/model | CRUD (append-only) | itself, prior V117 entry | exact |
| `scripts/validation/v1.19-milestone-audit.mjs` | service | batch (corpus audit) | `scripts/validation/v1.18-milestone-audit.mjs` | exact |
| `scripts/validation/v1.19-audit-allowlist.json` | config | CRUD (static sidecar) | `scripts/validation/v1.18-audit-allowlist.json` | exact |
| `scripts/validation/regenerate-supervision-pins.mjs` (append comment) | utility | CRUD (append-only) | itself, prior BASELINE_22 block | exact |
| `scripts/validation/check-phase-135.mjs` | test/validator (leaf) | request-response (no chain) | `scripts/validation/check-phase-129.mjs` / `-132.mjs` | exact |
| `scripts/validation/check-phase-136.mjs` | test/validator (leaf) | request-response (no chain) | `scripts/validation/check-phase-130.mjs` / `-133.mjs` | exact |
| `scripts/validation/check-phase-137.mjs` | test/validator (leaf) | request-response (no chain) | `scripts/validation/check-phase-132.mjs` (line-scoped needle pattern) | exact |
| `scripts/validation/check-phase-138.mjs` | test/validator (apex) | batch + event-driven (chain orchestrator) | `scripts/validation/check-phase-134.mjs` | exact-with-3-fixes |
| `.github/workflows/audit-harness-v1.19-integrity.yml` | config (CI) | event-driven (pull_request/schedule/dispatch) | `.github/workflows/audit-harness-v1.18-integrity.yml` | exact |
| `.planning/milestones/v1.19-MILESTONE-AUDIT.md` | doc/report | batch (narrative) | `.planning/milestones/v1.18-MILESTONE-AUDIT.md` | exact |
| `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` | doc/report | batch (log-only) | `.planning/milestones/v1.18-DEFERRED-CLEANUP.md` | exact |
| `.planning/{PROJECT,ROADMAP,STATE,REQUIREMENTS}.md` (close-gate edit) | doc/state | CRUD (single atomic commit) | `git show 7af8a147` (v1.18 close-gate commit) | exact |

## Pattern Assignments

### `scripts/validation/_lib/frozen-at-close.mjs` (utility, append-only)

**Analog:** the file's own V117 entry (lines 76-83) — copy shape verbatim, substitute V118 values.

```javascript
// Source: scripts/validation/_lib/frozen-at-close.mjs:76-83 [read this session]
V117: 'b56bba5',  // Phase 128 Plan 128-07 close-gate — v1.17 milestone close-gate; atom == close-gate.
                  // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                  // `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1
                  // --format=%H` -> b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428, subject: "docs(128-07):
                  // v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE
                  // CLOSE"). Single entry — same single-entry pattern as V18..V116 (back-anchor
                  // invariant: V117 references a PAST close SHA; the V118 pin is deferred to v1.19 per
                  // the back-anchor rule).
```

**New entry to append (V118):** use SHA `7af8a1476` (recovered via subject-line discriminator per D-31/Pitfall 1 — do NOT re-derive, do NOT use the naive `--all-match` grep which returns 2 candidates), comment must state the same "back-anchor invariant" closing sentence (V119 deferred to v1.20's close). Also append one `readAtV118Close` convenience export mirroring the existing `readAtV117Close` (or equivalent) export — grep the file for the export list before writing, since the export is at a separate location from `MILESTONE_CLOSE_SHAS`.

**GUARDRAIL (D-18):** this file is append-only for the duration of Phase 138. Nothing else in it may change.

---

### `scripts/validation/v1.19-milestone-audit.mjs` (service, batch)

**Analog:** `scripts/validation/v1.18-milestone-audit.mjs`

**Exact diff shape confirmed this session** (RESEARCH Pattern 3, `diff v1.17...v1.18` verified) — only 3 logical spots change on a pure Path-A bump:
1. Header comment block (3 lines: lineage-chain sentence, `// Source of truth:` CONTEXT pointer, `// Sidecar allow-list:` description)
2. The `// Usage:` line (filename only)
3. The sidecar `readFile(...)` call's path string → point at `v1.19-audit-allowlist.json`

C1–C17 checks are inherited **verbatim, unedited** — this is Path-A, not a content bump. Do not touch check logic.

---

### `scripts/validation/v1.19-audit-allowlist.json` (config, static sidecar)

**Analog:** `scripts/validation/v1.18-audit-allowlist.json`

**Exact diff shape confirmed this session** (`diff v1.17...v1.18-audit-allowlist.json`) — exactly 2 lines change: `"generated"` timestamp and `"phase"` string. All 59 line-pins across the 5 arrays (`supervision_exemptions` 26, `safetynet_exemptions` 4, `c7_knox_allowlist` 10, `c9_exemptions` 4, `c13_broken_link_allowlist` 15) carry forward **byte-identical** — CONTEXT D-20 verified zero pinned-file drift via `git diff --name-only 7af8a147..HEAD -- docs scripts .github`.

---

### `scripts/validation/regenerate-supervision-pins.mjs` (utility, append-only comment)

**Analog:** the file's own BASELINE_22 block (lines 503-514)

```javascript
// Source: scripts/validation/regenerate-supervision-pins.mjs:503-514 [VERIFIED in RESEARCH.md]
// BASELINE_22 refreshed 2026-07-20 (Phase 134 Plan 134-02): closes BASELINE_21 v1.17 carry-over
// per HARN-12 contract (REQUIREMENTS.md + ROADMAP.md Phase 134 SC#2); v1.18 line positions
// verified against HEAD b54043aa... (JIT pre-Atom-1 HEAD -- captured via `git rev-parse HEAD`
// immediately before authoring Atom 1 (this comment), NOT the Wave-0 anchor 18fd8b63...
// recorded in 134-01-SUMMARY.md; ...).
// BASELINE_9 entries above remain unchanged -- Phase 134 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 134
// close and remain valid for the v1.18 corpus. Resolution path: BASELINE_23 will refresh at the
// next milestone close per the Path-A inheritance pattern (... -> v1.17 -> BASELINE_21 -> v1.18 -> BASELINE_22).
```

**New BASELINE_23 shape:** same skeleton, dated at Plan 138-02's Atom-1 authoring time, citing the actual pre-Atom-1 HEAD SHA (captured fresh via `git rev-parse HEAD`, NOT the Wave-0 anchor from Plan 138-01's SUMMARY — this Wave-0-vs-pre-Atom-1 distinction is now a load-bearing convention recurring at Phases 119/125/128/134). Forward-pointer: "BASELINE_24 will refresh at the next milestone close (… → v1.18 → BASELINE_22 → v1.19 → BASELINE_23)."

**GUARDRAIL:** append only — do not touch `parseAllowlist`'s hardcoded-v1.7 lineage read (D-20 notes this defect but explicitly defers fixing it — `NO-TOOLING-PILLAR`).

---

### `scripts/validation/check-phase-135.mjs` / `-136.mjs` (leaf validators, request-response)

**Analog:** `scripts/validation/check-phase-129.mjs` / `-130.mjs` / `-132.mjs` / `-133.mjs`

**Lightweight leaf skeleton (no chain — chain lives only in apex):**
```javascript
// Source: check-phase-132.mjs:33-35 [VERIFIED]
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```
Ends with the identical `V-<N>-SELF` dual-invariant check (asserts N excluded from any chain array, `CHAIN_SKIP` empty) and the identical runner-loop/padLabel/exit-code tail — copy `check-phase-132.mjs:106-149` / `check-phase-133.mjs:81-124` byte-for-byte for that tail.

**Needle source — do NOT re-derive, transcribe:**
- `check-phase-135.mjs`: `135-VERIFICATION.md` Observable Truths table (329 lines total; `## Rollback/Recovery` between `## Verification` and `## Configuration-Caused Failures`; zero edits to `docs/recipes/01-shared-windows-avd-client.md`; one column-0 ```xml``` fence lines 131-162; 3-row namespace table lines 206-212; 8-row anti-feature table).
- `check-phase-136.mjs`: `136-02-SUMMARY.md:150-164` Section 4 closure table (301-line recipe file; 8 H2s fixed order; 6 `### Step` headings; 5 decision blocks; 5 `Ask the admin` lead-ins; 6 `What breaks if misconfigured` callouts; 9 anti-feature rows; 10 decomposition rows; 7 checklist lines; 4 failures-table rows; exactly 1 `json` fence at column 0).

Header comment convention: `check-phase-132.mjs:5-8` — *"NEEDLES DERIVED INLINE from 132-VERIFICATION.md (Required Artifacts / Observable Truths)"* — reuse this framing pointed at each phase's own VERIFICATION/SUMMARY doc.

---

### `scripts/validation/check-phase-137.mjs` (leaf validator, request-response)

**Analog:** `scripts/validation/check-phase-132.mjs` (line-scoped co-presence pattern, `V-132-INDEXNAV`/`V-132-HUBSNOTWIRED` at lines 74-104)

**Needle is fully pre-specified — do not re-derive** (`137-02-SUMMARY.md:122-146`, `STATE.md:349`):
```
Invariant shape: per-recipe, LINE-SCOPED co-presence check, NOT a whole-file c.includes().
For each recipe:
  1. a line matching ^\| \[<H1 verbatim>\]\(recipes/0N-....md\) \| exists in docs/index.md
  2. the single line matching ^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)
     contains the recipe's fixed prose fragment
Table targets: recipes/03-windows-11-multi-app-kiosk.md, recipes/04-android-dedicated-mhs-multi-app.md
Bullet fragments: "Windows 11 multi-app kiosk", "Android Dedicated multi-app kiosk"
```
**Trap to avoid:** a whole-file `includes('Dedicated')` false-matches `docs/index.md:36` (per SUMMARY's own warning) — extract and test the single matching line, exactly as `check-phase-132.mjs` does.

---

### `scripts/validation/check-phase-138.mjs` (apex validator — DO NOT copy verbatim)

**Analog:** `scripts/validation/check-phase-134.mjs` — structural template only (AUDIT + CHAIN[48..N-1] + AUDIT-HARNESS + SELF).

**Module-load guard pattern to replicate (with new numbers):**
```javascript
// Source: check-phase-134.mjs:85-98 [VERIFIED]
if (new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length) {
  throw new Error('... CHAIN_PHASES contains duplicate entries ...');
}
if (CHAIN_PHASES.length !== 86) { throw new Error('... length !== 86 ...'); }
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 133) {
  throw new Error('... must span 48..133 ...');
}
```
For 138: `CHAIN_PHASES` = 90-entry array `[48..137]`; length-throw compares against `90`; termini-throw compares against `48`/`137`. **Do not copy Phase 134's array or bounds forward unaudited (D-29).**

**THREE HAZARDS THAT MUST BE FIXED IN THE NEW FILE, NOT INHERITED (D-30) — this is the load-bearing "do not copy verbatim" instruction:**

1. **Missing `maxBuffer`** — `check-phase-134.mjs:144-150`:
   ```javascript
   execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv })
   ```
   No `maxBuffer` key → Node's 1 MiB default applies → a chatty child is silently converted to a caught FAIL. **check-phase-138.mjs must add an explicit `maxBuffer` option.**

2. **`isMissing` heuristic converts real crashes into green skips** — `check-phase-134.mjs:155-157`:
   ```javascript
   const isMissing = err.code === 'ENOENT' || err.status === 127 ||
     stderr.includes('not found') || stderr.includes('Could not resolve');
   ```
   A module-load throw whose stderr happens to contain "not found" is misclassified as SKIP, not FAIL. **Fix the classification logic in the new file** (do not merely inherit).

3. **Graceful-skip on missing chain child** — `check-phase-134.mjs:138-140`:
   ```javascript
   if (!existsSync(...)) return { pass: true, skipped: true, ... };
   ```
   A deleted predecessor validator produces `pass:true` — the apex structurally cannot detect a deleted validator. **Fix in the new file.**

Also note D-19: `check-phase-134.mjs:115` shipped `return { pass: true, skipped: true }` on resolver-null, which is the OPPOSITE of the file's own authoring guardrail (fail-loud was mandated, skip-pass shipped). CONTEXT D-19's resolution: keep SKIP-pass as legitimate **pre**-gate behavior, but the **post-close-gate confirmatory apex run** (Plan D-15 part 4) must assert `V-138-AUDIT` is PASS, not SKIP — this is a process/verification fix, not a code fix to replicate blind.

**Header comment convention to follow** (`check-phase-134.mjs:1-30`) — document the CRITICAL invariants inline (chain span, CHAIN_SKIP must stay empty, NESTED guard on both CHAIN and AUDIT-HARNESS steps, and which frozen predecessor bugs must NOT be fixed here per D-00a byte-unchanged doctrine).

**Do NOT edit** `_lib/archive-path.mjs`, `_lib/exec-fail-detail.mjs`, `c17-eee-contract.mjs` — byte-frozen this phase (D-18); import and reuse only.

---

### `.github/workflows/audit-harness-v1.19-integrity.yml` (CI config)

**Analog:** `.github/workflows/audit-harness-v1.18-integrity.yml` (full 237-line file — copy wholesale, apply version-string delta)

**Leaf job skeleton (copy per new leaf validator):**
```yaml
# Source: audit-harness-v1.18-integrity.yml:102-114 [read this session]
check-phase-129:
  name: check-phase-129 validator
  runs-on: ubuntu-latest
  needs: harness-run
  timeout-minutes: 15
  continue-on-error: false
  steps:
    - uses: actions/checkout@v4
      with: { fetch-depth: 0 }
    - uses: actions/setup-node@v4
      with: { node-version: '20' }
    - name: Run check-phase-129.mjs
      run: node scripts/validation/check-phase-129.mjs
```
For v1.19: 3 leaf blocks (`check-phase-135`, `-136`, `-137`) identical to this skeleton, plus one apex block (`check-phase-138`, `timeout-minutes: 30`, mirroring the `check-phase-134` block).

**Triggers — no `push:` trigger exists anywhere in this repo's workflows (D-31, Pitfall 4):**
```yaml
on:
  pull_request:
    paths: [ 'scripts/validation/v1.18-*', 'scripts/validation/check-phase-*.mjs', ... ]
  schedule:
    - cron: '0 8 * * 1'
    - cron: '0 8 1 1,4,7,10 *'
  workflow_dispatch:
```
Update `paths:` to the v1.19 filenames AND include `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` + `v1.19-MILESTONE-AUDIT.md` + `.planning/REQUIREMENTS.md` (D-23).

**Anti-pattern — do NOT add a standalone `check-phase-134` job to this new file.** The v1.18 workflow already carries the sole standalone `check-phase-134` job at `:172-184`; it is the D-08.iii source of Axis-2-authoritative predecessor-apex evidence and must not be duplicated.

**DUAL-APEX header contract — restate verbatim** (`:11-14`): the standalone apex job AND `linux-chain-ubuntu-latest` both run the full recursion; do not deduplicate; do not add `CHECK_PHASE_NESTED=1` to either top-level invocation.

---

### `.planning/milestones/v1.19-MILESTONE-AUDIT.md` / `v1.19-DEFERRED-CLEANUP.md` (doc/report)

**Analog:** `.planning/milestones/v1.18-MILESTONE-AUDIT.md` / `v1.18-DEFERRED-CLEANUP.md` — inherit section ordering/shape (Claude's Discretion per CONTEXT), but content is NOT a verbatim copy: CONTEXT D-05/D-06/D-07/D-16/D-24/D-25 specify numerous corrected facts (5 PASS/10 FAIL not 7/10; 10-item not 2-item standalone-RED set; the false "0 FAIL non-nested" claim must NOT be repeated; DEFER-119-A carries unchanged per D-24's specific redirect; six mandatory new entries per D-25).

**Do not repeat this false phrase** (`v1.18-DEFERRED-CLEANUP.md:123`, corrected by D-24):
> "complete non-nested `[48..133]` chain found 0 FAIL" — structurally impossible; `check-phase-134.mjs:143` forces `CHECK_PHASE_NESTED:'1'` on every child spawn.

---

### Close-gate 4-doc edit (`.planning/{PROJECT,ROADMAP,STATE,REQUIREMENTS}.md`)

**Analog:** `git show 7af8a147` (v1.18 close-gate commit — single atomic commit flipping 20/20 requirements to Validated). Mirror shape: single commit, all 4 docs, 17 requirements flipped this time (not 20).

## Shared Patterns

### Frozen-at-close SHA recovery (subject-line discriminator)
**Source:** `STATE.md:32`, confirmed this milestone
**Apply to:** the V118 pin entry
```bash
git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.18/ && $2 ~ /MILESTONE CLOSE/'
```
Never use the bare `--grep --all-match -1` form — it returns 2 candidates (documented false positive) and `-1` silently resolves to the wrong one.

### NESTED guard (short-circuit, not a drift gate)
**Source:** `check-phase-134.mjs:134-136,172-174`
**Apply to:** `check-phase-138.mjs`, and any local pre-push proof step
Under `CHECK_PHASE_NESTED=1` both the CHAIN loop and the AUDIT-HARNESS step short-circuit entirely — only a non-nested run surfaces live-HEAD content drift. Never cite a nested "0 FAIL" as proof of anything (D-15/D-24).

### Byte-frozen shared libs this phase
**Source:** D-18
**Apply to:** all new/modified files in this phase
`_lib/archive-path.mjs`, `_lib/exec-fail-detail.mjs`, `c17-eee-contract.mjs`, and `_lib/frozen-at-close.mjs` (except the one append) are BYTE-FROZEN for the duration of Phase 138 — import and reuse, never edit, no carve-out.

## No Analog Found

None — every deliverable in this phase has a direct one-generation-older predecessor (this is the defining property of a Path-A harness-close phase).

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/validation/_lib/`, `.github/workflows/`, `.planning/milestones/`
**Files scanned:** 138-CONTEXT.md, 138-RESEARCH.md (both already contain verified line-level excerpts from every analog), plus 3 targeted confirmatory reads this session (`_lib/frozen-at-close.mjs:60-99`, `audit-harness-v1.18-integrity.yml:95-134`, `check-phase-134.mjs:1-30`)
**Pattern extraction date:** 2026-08-03
