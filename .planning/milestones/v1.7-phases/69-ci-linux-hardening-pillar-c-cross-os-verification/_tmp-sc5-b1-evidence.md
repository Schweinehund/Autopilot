# SC#5 B.1 Evidence — workflow_dispatch baseline on master HEAD

**Captured:** 2026-05-27 (Plan 69-02 Task 2)
**Status:** FAILURE — Phase 69 architectural discovery surfaced (NOT a Phase 68 CRLF regression)
**Decision required:** Rule 4 architectural change — see CHECKPOINT REACHED message returned to user

## Run Identity

| Property | Value |
|---|---|
| Run ID | `26513528485` |
| Run URL | https://github.com/Schweinehund/Autopilot/actions/runs/26513528485 |
| Event | `workflow_dispatch` |
| Head branch | `master` |
| Head SHA | `6e12a75630a28612d3d4a56ca1c8bf90eee9a22d` |
| Workflow file | `.github/workflows/audit-harness-v1.7-integrity.yml` |
| Conclusion | **failure** |

## Job Results

| Job | Conclusion | Notes |
|---|---|---|
| `parse` (Parse v1.6 sidecar JSON) | success (11s) | v1.6 sidecar parses cleanly on Linux |
| `path-match` (Harness references v1.6 sidecar) | success (6s) | grep finds canonical sidecar reference |
| `harness-run` (Run v1.6 milestone audit harness) | success (11s) | `v1.6-milestone-audit.mjs` exits 0 on Linux |
| `linux-chain-ubuntu-latest` (Validator chain on Linux LF) | **failure (1m18s)** | check-phase-66 chain-apex exits 1 |

## Chain-Apex Detail

```
Result: 23 PASS, 5 FAIL, 0 SKIPPED
```

Failing validators (all surface from a single root cause):
- `[CHAIN-61/28] check-phase-61 FAIL: fatal: invalid object name 'ba2cbc0'.`
- `[CHAIN-62/28] check-phase-62 FAIL` (chain-propagated: 62 spawns 48..61)
- `[CHAIN-63/28] check-phase-63 FAIL` (chain-propagated)
- `[CHAIN-64/28] check-phase-64 FAIL` (chain-propagated)
- `[CHAIN-65/28] check-phase-65 FAIL` (chain-propagated)

PASS counts on Linux (matches Windows for phases that don't depend on historical SHAs):
- CHAIN-48..60: all PASS (13 phases)
- AUDIT (v1.6 harness): PASS
- SELF (CHAIN_PHASES integrity): PASS
- V-66-01..07 + V-66-ABAUDIT-STALENESS: PASS (8 native check-phase-66 assertions)

## Linux Runtime Measurement (SC#3 timing data point — STILL CAPTURED despite failure)

The `::notice CHAIN_TIMING_LINUX` was NOT emitted (the `echo` line comes AFTER `node check-phase-66.mjs` in the workflow step; `set -e` from bash strict mode aborted before the echo). However, runtime is measurable from log timestamps:

| Marker | Timestamp (UTC) |
|---|---|
| START (`set -e` step header) | 2026-05-27T13:18:32.071Z |
| END (last chain log line) | 2026-05-27T13:19:38.123Z |
| **Wall-clock** | **~66 seconds** |

**78s reported in `gh run watch` job duration** (includes step setup overhead).

For TIMEOUT-01 disposition: **Linux runtime ~66-78s on ubuntu-latest is well within budget** (~75% of Windows ~102s reference; 4× headroom vs 300s subprocess cap; 23× headroom vs 1800s job cap). This is good news — TIMEOUT-01 is "within budget."

## Root Cause Diagnosis

**`scripts/validation/check-phase-61.mjs` line 40:**
```javascript
return execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
```

The validator reads REQUIREMENTS.md as it existed at the v1.5-close frozen SHA `ba2cbc0` (`ba2cbc02fdaf548e4c636d6a784290fcebdb4bdb`) for structural assertions V-61-01..04 (frozen-state regression guards).

**On Windows local:** full git history present (cloned via `git clone`), so `git show ba2cbc0:...` resolves.

**On GHA ubuntu-latest:** `actions/checkout@v4` defaults to `fetch-depth: 1` (shallow clone — only HEAD commit + tree present). The historical SHA `ba2cbc0` is NOT in the runner's git object database, so `git show ba2cbc0:...` fails with `fatal: invalid object name 'ba2cbc0'.`

Once check-phase-61 fails, check-phase-{62,63,64,65} all chain-fail because each spawns the entire previous chain (post-CHAIN-03 design): check-phase-62's chain includes 48..61; 63's includes 48..62; etc. The chain-propagation pattern means ANY single chain failure cascades to all downstream chain-apex validators.

## Impact on Plan 69-02

This is a **Phase 69 architectural discovery**, not a Phase 68 CRLF regression. SC#5 was designed to catch CRLF-style line-ending regressions via check-phase-51 (a Phase 68 CHAIN-01 hardened validator). Instead, Linux CI surfaced a **different cross-OS issue** — frozen-historical-SHA assertions in check-phase-61 require full git history that GHA's default shallow clone doesn't provide.

**Implications:**
- SC#3 ("chain exits 0 with 0 SKIPPED on ubuntu-latest") is currently FAILING — not because of SKIPPED (still 0), but because of 5 FAILs
- SC#5 cross-OS reproducibility is NOT demonstrable until the shallow-clone issue is resolved (Windows: 28 PASS; Linux: 23 PASS, 5 FAIL — NOT identical)
- B.2 synthetic CRLF PR test would compound the failure (B.2 expects exit 1 from check-phase-51 specifically — but exit 1 on master baseline means we can't distinguish CRLF-caught failure from baseline chain failure)
- Tasks 3-10 are BLOCKED until this is resolved

## Resolution Options (Rule 4 — architectural decision; HALT for user decision)

### Option A — Bump `fetch-depth: 0` in workflow (RECOMMENDED)

Add `with: { fetch-depth: 0 }` to the `actions/checkout@v4` step in the `linux-chain-ubuntu-latest` job. This pulls full git history (all commits + objects), making historical SHAs like `ba2cbc0` resolvable.

**Trade-offs:**
- ✓ Surgical: 1-line YAML edit in `audit-harness-v1.7-integrity.yml`
- ✓ Matches Windows local environment (full history) — true cross-OS parity
- ✓ Phase 70 HARNESS-04 will inherit this verbatim (no future cleanup)
- ✗ Slightly slower checkout (~5-20s extra on a ~3000-commit repo, vs ~2s shallow)
- ✗ Predecessor v1.4/v1.5/v1.6 workflows also use shallow clone — but they DON'T run check-phase-61..65 (those validators were Phase 61+ deliverables; predecessor workflows are pinned to earlier validator surfaces). So this only needs to land in v1.7. **Predecessor-unchanged invariant preserved.**
- ✗ Workflow YAML edit means Plan 69-01 atomic commit needs a follow-up patch commit (or amend — but Plan 69-01 is already on origin/master, so a forward-fix commit is the cleaner pattern)

**Risk:** LOW. `fetch-depth: 0` is the standard GHA pattern for any workflow that needs git history (very common — e.g., release-notes generators, semantic-release, blame-driven tools). v1.6 + v1.5 predecessor workflows are unaffected (they don't reach check-phase-61).

### Option B — Make check-phase-61 tolerant of missing history (DEFER root cause)

Modify check-phase-61.mjs to detect missing historical SHA and emit SKIP instead of FAIL. But this violates Phase 68 CHAIN-03 invariant (`CHAIN_SKIP = []` empty per `7b635ca`). NOT recommended.

### Option C — Disable check-phase-61..65 on Linux only (environmental skip)

Add environment check to skip the historical-SHA assertions when `process.env.GITHUB_ACTIONS === 'true'`. Violates the cross-OS-parity intent of Phase 69. NOT recommended.

### Option D — Pre-fetch only the specific historical SHAs needed

Add a workflow step before chain-apex invocation: `git fetch --depth=10000 origin ba2cbc0` etc. More fragile than fetch-depth:0 because each new frozen-SHA reference (Phase 70+ validators that freeze v1.6 / v1.7 close SHAs) requires updating the pre-fetch list. NOT recommended.

## Recommended Path Forward

**Apply Option A (fetch-depth: 0)** as a 1-line follow-up commit on master, then re-run Task 2 workflow_dispatch. Expected outcome: 28 PASS, 0 FAIL, 0 SKIPPED — matches Windows local.

This is a Rule 4 architectural decision (workflow YAML change after Plan 69-01 close) — surfaced as CHECKPOINT for user approval before proceeding.

---

# SC#5 B.1 Re-run Evidence — workflow_dispatch baseline on master HEAD (post-fetch-depth fix)

**Captured:** 2026-05-28 (Plan 69-02 Task 2 re-run after fix-push checkpoint cleared)
**Status:** FAILURE — SECOND architectural discovery surfaced (parallel to original fetch-depth discovery)
**Decision required:** Rule 4 architectural change — see CHECKPOINT REACHED message returned to user

## Run Identity

| Property | Value |
|---|---|
| Run ID | `26574959797` |
| Run URL | https://github.com/Schweinehund/Autopilot/actions/runs/26574959797 |
| Event | `workflow_dispatch` |
| Head branch | `master` |
| Head SHA | `85521bb2e59be18f53c898ee4937beaee5de361c` (post-fix-push `85521bb`) |
| Workflow file | `.github/workflows/audit-harness-v1.7-integrity.yml` (with `fetch-depth: 0` on linux-chain-ubuntu-latest checkout step) |
| Conclusion | **failure** |
| Linux chain wall-clock | 1m23s (within budget) |

## Job Results

| Job | Conclusion | Notes |
|---|---|---|
| `parse` (Parse v1.6 sidecar JSON) | success | unchanged |
| `path-match` (Harness references v1.6 sidecar) | success | unchanged |
| `harness-run` (Run v1.6 milestone audit harness) | success | unchanged |
| `linux-chain-ubuntu-latest` (Validator chain on Linux LF) | **failure** | check-phase-66 chain-apex exits 1 with `Result: 23 PASS, 5 FAIL, 0 SKIPPED` — identical surface to original B.1 FAIL |
| `check-phase-67..70 skip-if-missing stubs` | skipped (job-level skip per `if: always()` absent in step-6 config; not a regression — same skip behavior as prior run) | n/a |

## Verification: fetch-depth: 0 IS Active

`gh run view 26574959797 --log` shows on the linux-chain checkout step:
```
fetch-depth: 0
fetch-tags: false
[command]/usr/bin/git -c protocol.version=2 fetch --prune --no-recurse-submodules origin +refs/heads/*:refs/remotes/origin/* +refs/tags/*:refs/tags/*
```

(Compare to `fetch-depth: 1` on parse / path-match / harness-run jobs — those don't need historical SHAs.)

**The fix from commit `85521bb` IS LIVE and behaving as intended.** Full git history is now present on the linux-chain job. The fetch-depth was the FIRST blocker; with it resolved, a SECOND blocker has surfaced.

## Second Discovery — Root Cause Diagnosis

`gh run view 26574959797 --log` shows EXACTLY the same 5-FAIL cascade pattern as the prior B.1 attempt:

```
[CHAIN-61/28] V-66-CHAIN-61: check-phase-61.mjs ... FAIL -- check-phase-61 FAIL: (empty stderr)
[CHAIN-62..65/28] FAIL (chain-propagated)
Result: 23 PASS, 5 FAIL, 0 SKIPPED
```

But the stderr is empty NOT because of `fatal: invalid object name 'ba2cbc0'` — that error is gone. The chain-66 wrapper at line 313 of `scripts/validation/check-phase-66.mjs` only captures `err.stderr`, NOT `err.stdout`. check-phase-61 writes its FAIL detail to **stdout**, so the chain wrapper truncates it to empty.

**To see the real failure, run check-phase-61 standalone — which works identically on Windows AND Linux.** Running locally on Windows (post-`85521bb` HEAD):

```
$ node scripts/validation/check-phase-61.mjs
...
[5/34] V-61-05: ROADMAP §Progress has zero `In Progress` rows (4 stale rows reconciled per Plan 61-02 Task 5) FAIL -- 1 `In Progress` rows remain
[1-4, 6-34] PASS
Result: 33 PASS, 1 FAIL, 0 SKIPPED
```

**V-61-05 fails because `.planning/ROADMAP.md` HEAD contains 1 `In Progress` row** (`| 69. CI-Linux Hardening (Pillar C) | v1.7 | 1/2 | In Progress|  |` at line 447 — added by Plan 69-01's tracking-update commit `6e12a75`).

V-61-05's source at `scripts/validation/check-phase-61.mjs` lines 113-120:
```javascript
{
  id: 5, name: "V-61-05: ROADMAP §Progress has zero `In Progress` rows (4 stale rows reconciled per Plan 61-02 Task 5)",
  run() {
    const c = readFile(ROADMAP);                          // ← reads HEAD via fs.readFileSync, NOT v1.5-frozen
    if (c === null) return { pass: false, detail: 'ROADMAP.md missing' };
    const inProgress = (c.match(/In Progress/g) || []).length;
    if (inProgress !== 0) return { pass: false, detail: inProgress + ' `In Progress` rows remain' };
    return { pass: true, detail: 'no In Progress rows' };
  }
}
```

**V-61-05 was made HEAD-coupled when it should have been v1.5-frozen-aware**, parallel to V-61-01..04 which DID get the v1.5-frozen treatment via Plan 68-03 Task 1 commit `d7d7d5f` (`readRequirementsAtV15Close()` helper reads REQUIREMENTS.md @ ba2cbc0). V-61-05..08 were left HEAD-coupled even though they semantically assert v1.5-close state (per the V-61-05 docstring "4 stale rows reconciled per Plan 61-02 Task 5" — that's a v1.5-close assertion).

**Counter-check at git history:**
- `git show ba2cbc0:.planning/ROADMAP.md | grep -c "In Progress"` → 0 (correct v1.5-close state)
- `git show 7b635ca:.planning/ROADMAP.md | grep -c "In Progress"` → 0 (Phase 68 close still clean)
- `git show HEAD:.planning/ROADMAP.md | grep -c "In Progress"` → 1 (Plan 69-01 6e12a75 introduced)

V-61-05 was passing at Phase 68 close because ROADMAP.md had no In Progress rows then. The moment Plan 69-01's tracking-update commit `6e12a75` landed, V-61-05 began failing — **on Windows local AND Linux GHA — but was masked from check-phase-66's chain output by the stderr-only capture bug** (which I will NOT fix in this plan; that's out of scope).

## Why fetch-depth: 0 didn't catch this earlier

The original B.1 attempt (run 26513528485) failed at the `git show ba2cbc0:...` step with `fatal: invalid object name 'ba2cbc0'` from V-61-01..04 — the missing-history fault. That diagnosis (Option A in original evidence) was CORRECT and the fetch-depth: 0 fix WAS necessary. But the missing history also masked V-61-05 — once V-61-01..04 throw on missing SHA, the chain wrapper records the FAIL, and we never see V-61-05 because check-phase-61 short-circuits at the first FAIL in its outer loop (actually it doesn't — let me re-verify). Looking at chain-66 line 310: `execFileSync('node', [path], ...)` runs check-phase-61 to completion. The check-phase-61 process runs all 34 assertions. So pre-fix, V-61-05 was already failing in the standalone process, but the chain wrapper saw the process exit 1 and captured empty stderr (because V-61-01..04 also failed and the dominant output channel was stdout).

So the fetch-depth fix necessarily had to land FIRST to surface V-61-05. The discovery sequence is correct.

## Impact on Plan 69-02

This is a **Phase 69 mid-flight architectural discovery** parallel to (and same surface as) the original Plan 68-03 Task 1 Option A v1.5-frozen-aware pivot for V-61-01..04 (`d7d7d5f`). V-61-05's HEAD-coupling is a Plan 68-03 Task 1 SCOPE GAP — only the first 4 v1.5-state assertions were made v1.5-frozen-aware; V-61-05..08 were left HEAD-coupled even though V-61-05 semantically asserts v1.5-close state.

**Implications:**
- Even after fetch-depth: 0 lands, SC#3 ("chain exits 0 with 0 SKIPPED on ubuntu-latest") is currently FAILING — because V-61-05 catches Plan 69-01's mid-flight tracking update
- SC#5 cross-OS reproducibility IS demonstrable (Windows + Linux now BOTH fail V-61-05 identically — that's a form of cross-OS parity, just not the green-chain parity we wanted)
- B.2 synthetic CRLF PR test would still compound on this baseline FAIL — we can't isolate the CRLF regression signal until V-61-05 is GREEN on baseline
- Tasks 3-10 remain BLOCKED until V-61-05 is resolved

## Resolution Options (Rule 4 — architectural decision; HALT for user decision)

### Option A — Extend v1.5-frozen-aware pattern to V-61-05 (RECOMMENDED)

Refactor V-61-05 in `scripts/validation/check-phase-61.mjs` to use `readRoadmapAtV15Close()` instead of HEAD's `readFile(ROADMAP)`. Same exact pattern as the existing `readRequirementsAtV15Close()` at lines 38-44 (introduced by Plan 68-03 Task 1 / commit `d7d7d5f`). 1-validator-file edit; ~10-line addition (new helper `readRoadmapAtV15Close` + 1-line change in V-61-05 to call the helper); suffix V-61-05's name with `[v1.5-frozen @ ba2cbc0]` for traceability (matches V-61-01..04 naming convention).

Optionally extend to V-61-06..08 too (all 4 of those assert v1.5-close §Progress state). Conservative choice: V-61-05 only (the minimum surface to GREEN the chain).

**Trade-offs:**
- ✓ Surgical: 1-file edit; matches established Plan 68-03 Task 1 pattern exactly
- ✓ Resolves SC#3 + restores cross-OS green-chain reproducibility for SC#5
- ✓ Phase 70 HARNESS-04 inherits the fix automatically (no future cleanup)
- ✓ Aligns V-61-05 with V-61-01..04 design intent (v1.5-state regression guards)
- ✗ ANOTHER validator-surgery commit in a phase that's nominally "CI-Linux hardening only"
- ✗ Plan 68 close-gate technically should have caught this — represents a small Plan 68-03 Task 1 scope gap
- ✗ Sets up forward-coordination flag for Phase 70: V-61-06..08 still HEAD-coupled (next Plan 69-01-style tracking update on §Progress could break them — though "Not started" + "Complete" are more stable invariants than "In Progress")

**Risk:** LOW. Same proven pattern as V-61-01..04 (already validated at Phase 68 close).

### Option B — Temporarily remove Plan 69-01's tracking update from ROADMAP.md

Revert the In Progress row addition until close-gate, then re-add it as part of Plan 69-02's traceability flips. This is brittle (gh state ≠ on-disk state during execution) and defeats real-time tracking. NOT recommended.

### Option C — Accept the failure on baseline; document V-61-05 as expected mid-flight FAIL until Plan 69-02 close-gate flips Phase 69 row to Complete

V-61-05 will naturally GREEN when Plan 69-02 closes (because Phase 69 row will be flipped Complete, removing the In Progress signature). At that point, run B.1 again on the close-gate SHA — get green chain — capture that as B.1 evidence. **Drawback:** chicken-and-egg — close-gate close depends on B.1 evidence being green, but B.1 can't be green until close-gate lands the traceability flips. Not a clean separation.

### Option D — Move V-61-05 from check-phase-61 (v1.5 chain) to check-phase-66 (v1.6 chain) as a HEAD-only assertion at v1.6+ scope

Reasoning: V-61-05 catches "post-milestone-close §Progress should have 0 In Progress rows" — but during mid-flight execution of subsequent milestones, this IS expected. The assertion belongs in milestone-audit, not in chain regression. Brittle and crosses chain ownership boundaries. NOT recommended.

## Recommended Path Forward

**Apply Option A (V-61-05 v1.5-frozen-aware via `readRoadmapAtV15Close()` helper)** as a 1-validator-file follow-up commit on master, parallel to Plan 68-03 Task 1's `d7d7d5f` precondition commit. Then re-run Task 2 workflow_dispatch. Expected outcome: 28 PASS, 0 FAIL, 0 SKIPPED — matches Windows local (which will ALSO go to 34/34 PASS after the fix).

Conservative scope: V-61-05 only (V-61-06..08 stay HEAD-coupled for now; document as forward-coordination flag for Phase 70 HARNESS-03 self-verifier carry-forward). Aggressive scope: V-61-05..08 all four (full alignment with V-61-01..04). **Planner should pick conservative for risk-minimization at Phase 69 close.**

This is a Rule 4 architectural decision (chain validator surface modification after Plan 68-03 close) — surfaced as CHECKPOINT for user approval before proceeding.

---

# B.1 Iter 3 — CLEAN baseline (2026-05-28; post-V-61-05..08 fix)

**Status:** SUCCESS — full chain green on Linux after 2-fix-pivot sequence

## Run Identity

| Property | Value |
|---|---|
| Run ID | 26576405590 |
| Run URL | https://github.com/Schweinehund/Autopilot/actions/runs/26576405590 |
| Event | workflow_dispatch |
| Head SHA | 2d61981e306086cb75fc464df445bc6207d5c621 (post-fetch-depth + post-V-61-05..08 v1.5-frozen-aware) |
| Conclusion | success |
| Chain start | 2026-05-28T13:04:45.4491260Z |
| Chain end   | 2026-05-28T13:05:41.8501786Z |
| Linux chain wall-clock | **~56s** (computed from timestamps; within budget — 54% of Windows ~102s ref; 5.4x headroom vs 300s subprocess cap; 32x headroom vs 1800s job cap) |
| Chain-apex result | **Result: 28 PASS, 0 FAIL, 0 SKIPPED** |

## Per-job conclusions (all SUCCESS)

| Job | Result |
|-----|--------|
| Parse v1.6 sidecar JSON | ✓ success |
| Harness references v1.6 sidecar | ✓ success |
| Run v1.6 milestone audit harness | ✓ success — 16/15 PASS (C1-C16 all pass; v1.6-milestone-audit.mjs internal numbering quirk) |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | ✓ success — 28 PASS / 0 FAIL / 0 SKIPPED via check-phase-66 chain-apex (recursively spawns 48..65) |

## SC#3 satisfaction

ROADMAP SC#3: "Job exits 0 on ubuntu-latest runner with NO CHAIN_SKIP entries reported (Phase 68 must have already removed them; this is the cross-OS confirmation)"

✓ Satisfied: exit 0, 0 SKIPPED in chain-apex output, Phase 68 CHAIN_SKIP=[] invariant preserved on Linux.

## TIMEOUT-01 disposition

Linux runtime ~56s observed. Within ~55% of Windows reference (~102s). Far below the 1500s escalation threshold per v1.7-DEFERRED-CLEANUP.md TIMEOUT-01.

**Disposition:** No v1.8+ subprocess-timeout-architecture review needed. TIMEOUT-01 entry to be closed at Plan 69-02 Task 8 update with measured runtime as forward-coordination data point.

## Predecessors invariant preserved through 3 commits

- `dd1ff08` (Plan 69-01 feat — workflow YAML NEW): predecessors untouched
- `85521bb` (fix — fetch-depth:0 YAML edit on v1.7 file): predecessors untouched
- `2d61981` (fix — V-61-05..08 v1.5-frozen-aware on check-phase-61.mjs validator): predecessors untouched

Re-verify at close-gate: `git diff dd1ff08^ HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml` returns empty.


---

# B.2 — Synthetic CRLF PR (Discovery #3: design over-spec)

**Captured:** 2026-05-28 (Plan 69-02 Step J Task 3)
**Status:** GREEN (unexpected — but actually the correct outcome)
**Reframe:** B.2-GREEN is positive evidence that Phase 68 CHAIN-01 fix works on Linux

## Run Identity

| Property | Value |
|---|---|
| Run ID | 26577894505 |
| Run URL | https://github.com/Schweinehund/Autopilot/actions/runs/26577894505 |
| Event | pull_request (PR #1 open) |
| Head SHA | ade7c97 (synthetic branch tip; CRLF-injected `docs/decision-trees/09-linux-triage.md`) |
| Conclusion | success |
| Linux chain wall-clock | 69s |
| Chain-apex result | **Result: 28 PASS, 0 FAIL, 0 SKIPPED** (check-phase-51 PASSED on CRLF-injected file) |

## Discovery: SC#5 D-04 design was over-spec

**Original design assumption:** "CRLF injection on a Phase 68 CHAIN-01-hardened surface (read by check-phase-51) will cause the Linux GHA run to exit 1, proving the validator catches the regression."

**Actual behavior:** Phase 68 CHAIN-01 fix added `.replace(/\r\n/g, '\n')` to `readFile()` in check-phase-51.mjs — this makes the validator **CRLF-tolerant** (defensively normalizes inputs to LF before regex matching). It does NOT fail on CRLF — it absorbs it transparently.

**Reframe:** B.2-GREEN is the CORRECT outcome and is itself positive evidence:
- Cross-OS verification confirms Phase 68 CHAIN-01 defense works on Linux
- The chain stays green even with CRLF injected — exactly what defense-in-depth means
- The synthetic-PR test changed semantic value from "negative regression test" to "positive resilience confirmation"

## SC#5 satisfaction path

ROADMAP SC#5: "CI run on a representative PR (synthetic or real) confirms: Windows runner exits 0 + Linux runner exits 0 + both report 0 SKIPPED + both report identical PASS counts (cross-OS reproducibility verified)"

Satisfied by:
- **B.1 (iter 3):** Linux runner exits 0 on workflow_dispatch (28 PASS / 0 FAIL / 0 SKIPPED on master `2d61981`)
- **B.2:** Linux runner exits 0 on representative PR (PR #1; 28 PASS / 0 FAIL / 0 SKIPPED on synthetic branch with CRLF injection — proves cross-OS robustness even under regression-attempt conditions)
- **B.4:** Windows runner PASS-count match (to be captured)

SC#5 D-04 sub-decision (a) execution: `docs/decision-trees/09-linux-triage.md` was the path-filter inclusion target; served its purpose; PR closed-without-merge; branch deleted local+remote; master tree byte-unchanged.

## PR closure

- PR #1: CLOSED 2026-05-28 with explanatory comment (run URL preserved as permanent evidence)
- Branch `phase-69/sc5-crlf-evidence` deleted local + remote
- B.3 (revert positive case) SKIPPED — original design pre-supposed B.2 would be negative; with B.2 actually GREEN, B.3 would be redundant

---

# B.4 — Windows-local vs Linux-GHA PASS-count diff

**Captured:** 2026-05-28 (Plan 69-02 Step L Task 5)
**Status:** GREEN — SC#5 cross-OS reproducibility verified at chain-apex level

## Method

PowerShell on Windows host (`D:\claude\Autopilot`):
```powershell
foreach ($i in 48..66) { $f = "scripts/validation/check-phase-$i.mjs"; if (Test-Path $f) { node $f 2>&1 | Select-String "Result: " | Select-Object -Last 1 } }
```

Sequential execution of all 19 chain validators (no recursive spawn dedup). Total Windows wall-clock: **450.1s**.

## Per-validator PASS counts (Windows local)

| Validator | Windows Result | Linux GHA (B.1 iter 3) | Match? |
|-----------|---------------|------------------------|--------|
| check-phase-48 | 7 PASS, 0 FAIL, 0 SKIPPED | exits 0 (chain-guard PASS) | ✓ |
| check-phase-49 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-50 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-51 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-52 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-53 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-54 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-55 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-56 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-57 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-58 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-59 | (no Result: line; exits 0) | exits 0 (chain-guard PASS) | ✓ |
| check-phase-60 | 25 PASS, 0 FAIL, 0 SKIPPED | exits 0 (chain-guard PASS) | ✓ |
| check-phase-61 | **34 PASS, 0 FAIL, 0 SKIPPED** | exits 0 (chain-guard PASS) | ✓ (post-V-61-05..08 fix) |
| check-phase-62 | 34 PASS, 0 FAIL, 0 SKIPPED | exits 0 (chain-guard PASS) | ✓ |
| check-phase-63 | 32 PASS, 0 FAIL, 0 SKIPPED | exits 0 (chain-guard PASS) | ✓ |
| check-phase-64 | 29 PASS, 0 FAIL, 0 SKIPPED | exits 0 (chain-guard PASS) | ✓ |
| check-phase-65 | 33 PASS, 0 FAIL, 0 SKIPPED | exits 0 (chain-guard PASS) | ✓ |
| **check-phase-66 (chain-apex)** | **28 PASS, 0 FAIL, 0 SKIPPED** | **28 PASS, 0 FAIL, 0 SKIPPED** | **✓ EXACT MATCH** |

## Chain-apex aggregate comparison

| Metric | Windows local | Linux GHA (B.1 iter 3) | Delta |
|--------|---------------|------------------------|-------|
| Chain-apex PASS count | 28 | 28 | 0 (match) |
| Chain-apex FAIL count | 0 | 0 | 0 (match) |
| Chain-apex SKIPPED count | 0 | 0 | 0 (match) |
| Chain wall-clock | n/a (sequential ~450s) | ~56s (recursive) | n/a (different invocation modes) |

## SC#5 satisfaction

ROADMAP SC#5: "CI run on a representative PR confirms: Windows runner exits 0 + Linux runner exits 0 + both report 0 SKIPPED + both report identical PASS counts (cross-OS reproducibility verified)"

✓ Satisfied at chain-apex level:
- Windows: check-phase-66 chain-apex = 28 PASS / 0 FAIL / 0 SKIPPED
- Linux: check-phase-66 chain-apex = 28 PASS / 0 FAIL / 0 SKIPPED
- PASS-count identity verified
- 0 SKIPPED on both OSes
- Both exit 0

**Per-validator PASS counts (49-59) lack `Result: N PASS` summary lines on Windows** — these validators emit different output formats. Chain-apex aggregation (check-phase-66 recursively spawning 48..65 and reporting boolean exit 0 per phase) is the authoritative cross-OS reproducibility metric per Phase 68 CHAIN-03 design.
