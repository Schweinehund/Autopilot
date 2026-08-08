# Phase 141: Standalone-RED Validator Set — Chain Members Green - Research

**Researched:** 2026-08-07
**Domain:** Internal CI/validator tooling (Node.js `.mjs` scripts, GitHub Actions YAML, Markdown governance docs). No external libraries, no runtime/product code.
**Confidence:** HIGH — every claim below was verified this session by opening the cited source file at the cited line range with `Read` (or, for the CARVE/governance procedure, by grep-verifying the constant). No web research was needed; this phase has zero external-package surface.

## Summary

Phase 141 is pure in-repo verification-and-repair work on the project's own validator chain (`scripts/validation/*.mjs`), its supervision-pin classifier (`regenerate-supervision-pins.mjs`), and three GitHub Actions workflows. There is nothing to look up externally — the entire research task was to open the exact files CONTEXT.md named and confirm, byte-for-byte, that its `[MEASURED]` claims are still true at HEAD, then extract the literal strings/line numbers the planner needs to write safe edits.

Every one of the eight research points in the task brief was verified directly against source:

1. **BASELINE_9 rebase (D-01/D-02/D-04):** 8 of the 9 target coordinates map cleanly 1:1 to their old counterparts and are confirmed live Tier-1 supervision occurrences. The 9th (the `03-fully-managed-cobo.md` entry) is **not a clean 1:1** — the file now carries **two** Tier-1 occurrences (lines 51 and 53) where the old baseline tracked only one (line 36). This does not break the self-test (the invariant is a set-equality after subtraction, not a lineage-preserving bijection — proven below), but the planner must not present it as a clean 1:1 rename.
2. **Four live pins (D-04):** exact literal strings for V-60-09, V-66-03, V-68-06, V-70-06 extracted verbatim — append-only is achievable without touching any of the four.
3. **SWEEP-09 (D-08..D-15):** the fix shapes for `check-phase-61`, `-68`, `-70` are structurally different from each other and now precisely specified below, including the exact 12 `chicken-and-egg` return sites in 68/70 and the 8 call-sites of `readAtV15CloseFor61` in 61.
4. **Timeout fixes (D-17/D-18):** exact line numbers confirmed; the CI-job risk is **structurally wider than just check-phase-67's job** — verified that check-phase-68/69/70's own chain guards do NOT nest-shortcut phases 48–66 (only phases ≥67 get the nested-env treatment), so all four 15-minute CI jobs are exposed, not only 67's.
5. **`if: always()` (D-24):** exact job list and counts confirmed per workflow (29 total `needs: harness-run` jobs; 23 are `check-phase-NN`; the "19" figure is exactly v1.5's 14 check-phase-NN jobs + v1.6's 5).
6. **CARVE/GOV-02 (D-06/D-12/D-15/D-27):** all four CARVE category claims and the `.planning/` gate-exclusion claim confirmed by reading `carve-gate.mjs` and `v1.20-CARVE.md` directly.
7. **Document amendments (D-28):** all six statement locations confirmed with current text quoted.
8. **Axis-2 dispatch:** no new findings beyond what REQUIREMENTS.md/STATE.md already state — no additional verification was possible without live network/CI access; treat those sections as already-sufficient guidance.

**Primary recommendation:** treat this phase as source-editing work guided by literal-string preservation, not framework research. The planner's job is to sequence six categories of edit (amendment-first per D-27, then BASELINE_9 rebase, then SWEEP-09 fixes, then timeout fixes, then `if: always()`, then the CI fan-out run) while grepping the exact literal strings below before every edit.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Supervision-pin classification (`regenerate-supervision-pins.mjs`) | CI/validator tooling (Node script, offline) | — | Pure static analysis over `docs/` content; no server, no client |
| Chain validators (`check-phase-{48,60,61,62-66,68,70}.mjs`) | CI/validator tooling | GitHub Actions (invocation) | Node scripts invoked both locally and as CI job steps |
| Frozen-read library (`_lib/frozen-at-close.mjs`) | CI/validator tooling (shared library) | — | `git show`/`git ls-tree` wrapper; no network, no DB |
| CI workflow definitions (`.github/workflows/audit-harness-*.yml`) | CI/CD orchestration | — | GitHub Actions job graph, timeouts, `needs:` gating |
| Governance documents (CARVE, GOV-02 ledger, REQUIREMENTS/ROADMAP/STATE) | Documentation/process tier | — | Markdown-only; asserted-on by validators but not executable |

No browser, frontend-server, API, or database tier is touched by this phase — it is entirely CI/validator-tooling and documentation.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages. Every file touched is either already-present repo source (`scripts/validation/*.mjs`, `.github/workflows/*.yml`) or a Markdown governance document. No `npm view`/`pip`/`cargo` verification is needed.

## Standard Stack

Not applicable — no new libraries. The phase uses only Node.js built-ins already imported by the files it edits: `node:fs` (`readFileSync`, `existsSync`), `node:child_process` (`execFileSync`), `node:path`, `node:process`. No installation step exists in this phase's plans.

## Architecture Patterns

### System Architecture Diagram

```
docs/_glossary-android.md, docs/android-lifecycle/00-enrollment-overview.md,
docs/admin-setup-android/03-fully-managed-cobo.md,
docs/l2-runbooks/20-android-app-install-investigation.md   (READ ONLY corpus)
        │
        ▼
regenerate-supervision-pins.mjs  classify() ──► Tier-1 / Tier-2 sets
        │  (BASELINE_9 rebase happens HERE — array literal edit only)
        ▼
scripts/validation/v1.7-audit-allowlist.json (supervision_exemptions[])  READ ONLY, unedited
        │
        ▼
--self-test  (sidecarPins − BASELINE_9)  ==?  (classifierTier1Keys − BASELINE_9)
        │ PASS ──────────────────────────────────────────────────┐
        ▼                                                        │
check-phase-48.mjs ──► check-phase-60.mjs ──► check-phase-61.mjs │  (standalone, ascending)
        │ (V-60-10/V-61-34 re-invoke --self-test)                │
        ▼                                                        │
check-phase-62..66.mjs (CHAIN-* regression guards re-invoke 48..65 bare, non-nested)
        │
        ▼
check-phase-67/68/70.mjs  SWEEP-09 fixes: chicken-and-egg skip→fail conversion (68/70),
        │                 readAtV15CloseFor61 library routing (61, via check-phase-61.mjs)
        ▼
.github/workflows/audit-harness-v1.5/v1.6/v1.7-integrity.yml
   harness-run (RED-01/02 fix lands here) ──if:always()──► 29 needs:harness-run jobs
        │
        ▼
gh workflow run --ref master  (first-ever real execution of the 19 v1.5/v1.6 check-phase-NN jobs)
```

### Recommended Plan/Atom Decomposition
No new directories. Edits land in-place across:
```
scripts/validation/regenerate-supervision-pins.mjs   # BASELINE_9 rebase (append-only comment)
scripts/validation/check-phase-61.mjs                # readAtV15CloseFor61 → delegate to _lib
scripts/validation/check-phase-68.mjs                # 2 chicken-and-egg sites → pass:false
scripts/validation/check-phase-70.mjs                # 10 chicken-and-egg sites → pass:false
scripts/validation/check-phase-66.mjs                # :318 timeout raise (leave :341)
scripts/validation/check-phase-67.mjs                # :261 timeout raise
.github/workflows/audit-harness-v1.5-integrity.yml    # if: always() on 15 needs:harness-run jobs
.github/workflows/audit-harness-v1.6-integrity.yml    # if: always() on 7 needs:harness-run jobs; timeout-minutes on check-phase-62..66? (verify — see Pitfall)
.github/workflows/audit-harness-v1.7-integrity.yml    # if: always() on 7 jobs; raise timeout-minutes on check-phase-67/68/69/70 (currently 15)
.planning/milestones/v1.20-CARVE.md                   # D-09 amendment: add check-phase-67.mjs to Category 5 (or a new category) — MUST land alone, first
.planning/milestones/v1.20-GOV-02-LEDGER.md            # one row per frozen-surface edit above
.planning/REQUIREMENTS.md, .planning/ROADMAP.md, .planning/STATE.md   # D-28's six amendments, [SUCCESS-CRITERION AMENDMENT, D-NN] markers
```

### Pattern 1: The append-only audit-trail comment (D-04/D-05)
**What:** Every prior `BASELINE_N refreshed …` comment in `regenerate-supervision-pins.mjs` (18 of them, spanning Phase 60 through Phase 138) is appended below the previous one; none is ever edited in place, even when — per D-05 — the content of an earlier comment is now known to be false ("were re-verified at Phase 138 close and remain valid" while sitting above a 9/9-dead array).
**When to use:** Any edit to `BASELINE_9`'s coordinates. Add a new dated line reading approximately `BASELINE_9 refreshed <date> (Phase 141 Plan NN): ...` immediately following the most recent existing comment block (currently ending after the Phase 138 entry, `regenerate-supervision-pins.mjs:518` area — see Pitfall 1 for the exact insertion point), and edit **only** the `BASELINE_9` array literal itself (`:533-543`).
**Example (verified pattern, not to be treated as prescriptive wording — Claude's Discretion per CONTEXT.md):**
```js
// Source: scripts/validation/regenerate-supervision-pins.mjs:392-400 (existing pattern to mirror)
// BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08): _glossary-android.md entries refreshed
// to post-Plan-06 line coords (#kme/#kpe shims caused +2 shift after line 127); aligns with
// current sidecar supervision_exemptions[] AT v1.5 close. Closes AUDIT-07 carry-over per CONTEXT D-19.
```

### Pattern 2: The chicken-and-egg skip-to-fail conversion (SWEEP-09, D-11)
**What:** `check-phase-68.mjs` and `check-phase-70.mjs` each carry helper functions (`readCorpusFileAtV17Close`, `readSidecarAtV17Close`, `readMilestoneAuditAtV17Close`, `readProjectAtV17CloseGate`, `readRoadmapAtV17Close`, `readStateAtV17Close`, `readRequirementsAtV17Close`, `readDeferredCleanupAtV17Close`) that wrap the throwing `_lib/frozen-at-close.mjs` readers in `try{}catch(e){return null}`. Each of the 12 call-sites below then checks `if (c === null) return { pass: true, skipped: true, detail: 'chicken-and-egg: ... unresolved' }`.
**When to use:** SWEEP-09's fix for 68/70 is to change the **call-site** return from `{pass:true, skipped:true, ...}` to `{pass:false, detail: '<replacement text>'}`. Per D-14, the `aa6de68` and `4df3a16` SHAs both resolve today on a deep clone (verified: `frozen-at-close.mjs`'s `V17`/`V17_CLOSEGATE` entries are populated, not placeholders — `MILESTONE_CLOSE_SHAS.V17 = 'aa6de68'`, `V17_CLOSEGATE = '4df3a16'`, confirmed at `_lib/frozen-at-close.mjs:73-76`), so the "chicken-and-egg" condition these branches were written to tolerate no longer exists; a null read today means a real failure (unreachable-sha on a shallow clone, absent-path, timeout, or corrupt pack — the six-pattern `frozenCause` taxonomy at `_lib/frozen-at-close.mjs:51-67`), not a benign bootstrap race. **Do not** delete the local wrapper functions' `try/catch` themselves (unlike the check-phase-61 fix) — the wrapper functions are also relied on by their callers to receive `null` rather than a thrown exception in other, still-legitimate branches (e.g. a genuinely-missing path); only the specific `nullCount === FILES.length` / `c === null` branches whose `detail` string is literally `'chicken-and-egg: ...'` change their `pass`/`skipped` fields.
**Example:**
```js
// Source: scripts/validation/check-phase-70.mjs:387-390 (site to change)
const c = readCorpusFileAtV17Close(PATH);
if (c === null) {
  return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
}
// -> becomes (shape, exact wording is Claude's Discretion):
if (c === null) {
  return { pass: false, detail: 'frozen read of ' + PATH + ' at v1.7-close failed (aa6de68 no longer chicken-and-egg — see frozenCause)' };
}
```

### Pattern 3: The delegate-not-swallow reader fix (SWEEP-09, D-09, check-phase-61 only)
**What:** `readAtV15CloseFor61` (`check-phase-61.mjs:39-45`) is a genuinely inline `execFileSync('git', ['show', 'ba2cbc0:'+relPath], ...)` call wrapped in its own `try{}catch(err){return null}` — it does not call `_lib/frozen-at-close.mjs` at all today, so it has no `frozenCause` enrichment.
**When to use:** Per D-09, route it through the already-imported `readAtV15Close` (imported at `check-phase-61.mjs:20`, already used unwrapped at `:271,282,297,313` for `V-61-17..20`). The function **name** `readAtV15CloseFor61` must remain present as a literal string in the file (`check-phase-68.mjs:206` `V-68-10`'s tolerant-OR checks `c.includes('readAtV15CloseFor61')`), but its **body** can become a one-line delegation. This mirrors the SWEEP-03 precedent at `check-phase-49.mjs:264` exactly (comment: `"the readAtV15Close throw now propagates to the runner's outer catch instead of being swallowed"`).
**Example:**
```js
// Source: scripts/validation/check-phase-61.mjs:39-45 (current, to be changed)
function readAtV15CloseFor61(relPath) {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:' + relPath], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
// -> delegate to the already-imported library reader (keeps the name for V-68-10):
function readAtV15CloseFor61(relPath) {
  return readAtV15Close(relPath);
}
```
The 8 call-sites' existing `if (c === null) return {pass:false, ...}` guards (lines 67,80,89,103,116,126,139,148) become unreachable dead code once the function throws instead of returning null — per D-09 ("Its 8 consumers already return pass:false; that is not the point"), **leave them**; the runner's outer `try{result=check.run();}catch(e){result={pass:false, detail:'Unexpected error: '+e.message};}` (verified at `check-phase-61.mjs:413`, identical shape at `check-phase-49.mjs`) converts the thrown error into a FAIL either way, so removing the now-dead guards is optional cleanup, not required for correctness.

### Anti-Patterns to Avoid
- **Editing any existing `BASELINE_N refreshed` comment line:** four live validators pin substrings inside these comments (D-04). Editing (not appending) risks silently breaking V-60-09/V-66-03/V-70-06.
- **Deleting the `try/catch` in `check-phase-68.mjs`/`check-phase-70.mjs`'s wrapper functions:** unlike `check-phase-61.mjs`'s single inline reader, these wrapper functions are shared by many call-sites; deleting their `try/catch` entirely would turn every one of their callers into a hard throw, which is a much larger blast radius than SWEEP-09 authorizes. Change the **call-site** `skipped:true` to `pass:false`, not the reader.
- **Treating the BASELINE_9 cobo entry as a clean rename:** it is not (see Pitfall 3). Do not write a plan/commit message claiming "9 coordinates, each individually rebased 1:1" — the self-test's correctness does not depend on a bijection, and asserting one where none exists is exactly the kind of unverified claim D-31 warns against.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frozen-SHA file reads with typed failure causes | A new inline `execFileSync('git','show',...)` reader | `_lib/frozen-at-close.mjs`'s `readAtClose`/`readAtV15Close` etc. | Already has the six-pattern `frozenCause` taxonomy (D-09); a new inline reader re-introduces the causeless-swallow class SWEEP-09 exists to delete |
| Detecting a shallow-clone-unreachable SHA | A custom `git cat-file -e` probe | `frozenCause(err)` classifying on `'invalid object name'`/`'not a tree object'` | Already implemented, already self-tested (`--self-test` assertion (v), a real `file://` shallow clone) |
| CI job gating despite an upstream job failing | A custom `needs.harness-run.result` conditional string | The standard `if: always()` YAML key (D-24) | Simplest correct GitHub Actions idiom for "run regardless of upstream success/failure" |

**Key insight:** every piece of infrastructure this phase needs (frozen reads, cause classification, chain short-circuiting via `CHECK_PHASE_NESTED`) already exists in the repo from Phases 68/111/139. The entire phase is *wiring existing mechanisms into the last few call-sites that bypass them*, never building anything new.

## Common Pitfalls

### Pitfall 1: BASELINE_9's `cobo` entry is not a clean 1:1 rename
**What goes wrong:** CONTEXT.md's target coordinate set lists a single `docs/admin-setup-android/03-fully-managed-cobo.md` line (**51**). `[VERIFIED: docs/admin-setup-android/03-fully-managed-cobo.md:51,53]` — I read the live file and found **two** Tier-1-eligible occurrences:
```
51: > **Cross-platform note:** Android's Fully Managed is the closest analog to iOS Supervision on ADE-enrolled devices, but the mapping is partial —
53: > iOS supervision is a permanent per-device state that gates approximately 60 restriction settings on top of a normal MDM enrollment,
```
Both lines contain `\bsupervis(ion|ed|ory)\b` and both fall inside a 2-line-back context window containing `iOS`, so `classify()` (`regenerate-supervision-pins.mjs:204-238`) marks **both** Tier-1. `[VERIFIED: scripts/validation/v1.7-audit-allowlist.json:19-20]` — the live sidecar's `supervision_exemptions[]` array already pins **both**: `{"file": "docs/admin-setup-android/03-fully-managed-cobo.md", "line": 51, ...}` and `{"file": "docs/admin-setup-android/03-fully-managed-cobo.md", "line": 53, ...}`. The old `BASELINE_9` (`:541`, `['docs/admin-setup-android/03-fully-managed-cobo.md', 36]`) tracked only **one** coordinate for this file.
**Why it happens:** the file's content grew a second Tier-1 line (the blockquote split from one line into two across some prior phase's edit) without the `BASELINE_9` array being extended to match — this is exactly the "stale data" class D-01 already diagnosed for the other 8 coordinates, just with a 1-to-2 cardinality change instead of a pure line-number drift.
**How to avoid:** this does **not** break the self-test. The self-test's actual invariant (traced from `regenerate-supervision-pins.mjs:558-582`) is:
```
expectedNewKeys   = sidecarPins(Tier-1)      − BASELINE_9   (as sets)
classifierNewKeys = classifierTier1Keys(now) − BASELINE_9   (as sets)
PASS iff expectedNewKeys == classifierNewKeys
```
Because `03-fully-managed-cobo.md:53` is present in **both** `sidecarPins` and `classifierTier1Keys` today, and is absent from `BASELINE_9` either way (whether `BASELINE_9` names `51` alone or `51`+`53`), it appears in **both** `expectedNewKeys` and `classifierNewKeys` after subtraction and cancels out. Including only `51` in the rebased `BASELINE_9` (matching the old 9-item shape, per CONTEXT.md's explicit target list) is therefore **functionally correct**, but the planner/executor must record this explicitly as "8 of 9 coordinates are clean lineage rebases; the 9th (`cobo.md`) has a content-side cardinality change from 1 occurrence to 2 — only one of the two is carried forward into the array, and this is safe because of the self-test's set-subtraction semantics, not because it is a lossless rename." Do not claim a false 1:1 in the plan or commit message.
**Warning signs:** if a future editor "fixes" this by adding a 10th coordinate for line 53, `BASELINE_9`'s name becomes misleading (10 entries) but the self-test still passes — harmless, just worth flagging so nobody spends time chasing a phantom discrepancy.

### Pitfall 2: check-phase-68/69/70's own CHAIN-guards do NOT nest-shortcut phases 48–66
**What goes wrong:** `[VERIFIED: scripts/validation/check-phase-68.mjs:260-264]`:
```js
// For peer v1.7-cohort validators (>=67), propagate CHECK_PHASE_NESTED=1 to short-circuit
// their own chain-guards (avoids polynomial recursion cost).
const isPeer = phaseNum >= 67;
const subEnv = isPeer ? { ...process.env, CHECK_PHASE_NESTED: '1' } : process.env;
const subTimeout = isPeer ? 600000 : 300000;
```
identical pattern at `check-phase-70.mjs:262-264`. The nested-env propagation is conditional on `phaseNum >= 67` — for phases 48 through 66, `subEnv = process.env` (whatever the parent inherited, unset at a fresh CI top-level invocation). This means a bare (non-`CHECK_PHASE_NESTED=1`) top-level run of `check-phase-68.mjs` or `check-phase-70.mjs` in CI re-triggers the **full non-nested exponential chain expansion** for every one of 48 through 66, not just for the specific chain member it's guarding — the same D-32 exponential curve (`check-phase-66` alone measured 664 979 ms standalone) applies inside 68's and 70's own CI job, not only inside 66's dedicated `linux-chain-ubuntu-latest` job.
**Why it happens:** the `isPeer` short-circuit was added (per `check-phase-68.mjs`'s own comment) specifically to bound recursion cost among the v1.7-cohort peers (67–70 calling each other), not to bound the inherited 48–66 sub-chain, which was presumably assumed cheap when this code was written (before D-32's exponential-curve finding existed).
**How to avoid:** when raising CI `timeout-minutes` per D-18, do not raise only `check-phase-67`'s job. `check-phase-68`, `check-phase-69`, and `check-phase-70`'s jobs are structurally exposed to the same or worse floor (each inherits 67's own un-nested 48–66 cost, potentially again inside their nested-but-still-full invocation of 67 at `subTimeout: 600000`). Measure each of the four jobs' real CI wall-clock (cold clone, per D-22/D-31 discipline) rather than assuming 67's floor generalizes exactly.
**Warning signs:** a raised `check-phase-67` job passing in CI while `check-phase-68/69/70`'s jobs still time out at the old 15-minute cap.

### Pitfall 3: the classifier's context window is `lineNum − 3 .. lineNum` (0-indexed slice), not "2 preceding lines" in the naive sense
**What goes wrong:** ROADMAP.md's SC#2 text (before D-28's amendment) reads "the backward-only scan at `regenerate-supervision-pins.mjs:204-238` misses the iOS token at line 147, two lines after the heading" — describing a mechanism that D-01/D-03 already ruled is not the real defect (the fixture problem is stale `BASELINE_9` coordinates, not the classifier's window). `[VERIFIED: scripts/validation/regenerate-supervision-pins.mjs:212-217]` confirms the classifier's actual window:
```js
const windowStart = Math.max(0, lineNum - 3);
const windowEnd = lineNum;
const contextLines = lines.slice(windowStart, windowEnd).join('\n');
```
This is a forward-looking-safe window (occurrence line + up to 2 preceding lines) that is unchanged and does not need to change — D-03 already withdrew the "classifier window fix" recommendation.
**Why it happens:** the pre-D-01 draft assumed the classifier was the defect; the interrogation found the real defect is the 9 stale `BASELINE_9` array coordinates.
**How to avoid:** the planner must not re-open classifier logic. Any plan task touching `classify()`'s body is out of scope per D-03 (withdrawn) and D-19 (no new acceptance bound).
**Warning signs:** a plan task titled anything like "widen classifier context window" — this is the exact reversed headline recommendation CONTEXT.md flags.

## Code Examples

### Exact literal strings the four live pins require (verbatim, quoted)

`[VERIFIED: scripts/validation/check-phase-60.mjs:177]` (V-60-09):
```js
if (!/BASELINE_9 refreshed 2026-05-06 \(Phase 60 Plan 08\)/.test(c))
```
The exact substring that must remain present, verbatim, somewhere in `regenerate-supervision-pins.mjs`: `BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08)`. `[VERIFIED: scripts/validation/regenerate-supervision-pins.mjs:398]` confirms this exact string currently exists: `// BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08): _glossary-android.md entries refreshed`.

`[VERIFIED: scripts/validation/check-phase-66.mjs:127,130]` (V-66-03):
```js
if (!c.includes('BASELINE_10 refreshed')) { ... }
if (!c.includes('Phase 66')) { ... }
```
Two independent substring checks — `'BASELINE_10 refreshed'` and `'Phase 66'` must both appear anywhere in the file (not necessarily on the same line). `[VERIFIED: scripts/validation/regenerate-supervision-pins.mjs:401]` confirms: `// BASELINE_10 refreshed 2026-05-25 (Phase 66 Plan 66-02): closes BASELINE_9 v1.5 carry-over`.

`[VERIFIED: scripts/validation/check-phase-68.mjs:140]` (V-68-06):
```js
if (!c.includes('v1.7-audit-allowlist.json')) { ... }
```
Unrelated to the `BASELINE_9` rebase itself — this only requires `regenerate-supervision-pins.mjs`'s `parseAllowlist()` call to keep referencing `v1.7-audit-allowlist.json` by path string. Not at risk from the rebase edit (the array literal, not the sidecar path, is what changes).

`[VERIFIED: scripts/validation/check-phase-70.mjs:179,182]` (V-70-06):
```js
if (!c.includes('BASELINE_11 refreshed')) { ... }
if (!c.includes('Phase 70')) { ... }
```
`[VERIFIED: scripts/validation/regenerate-supervision-pins.mjs:416]` confirms: `// BASELINE_11 refreshed 2026-05-28 (Phase 70 Plan 70-02): closes BASELINE_10 v1.6 carry-over`.

**None of these four literal strings live inside the `BASELINE_9` array itself (`:533-543`) or require touching it** — they are all in the historical audit-trail comment block (`:388-533`+). The array edit and the four pins are in physically separate regions of the same file; append the new dated comment anywhere after the last existing entry (currently the Phase 138 block, ending mid-file before `const BASELINE_9 = [`) without disturbing any of the four.

### Exact BASELINE_9 target coordinates verified against live content

`[VERIFIED: scripts/validation/regenerate-supervision-pins.mjs:533-543]` — current (stale) array:
```js
const BASELINE_9 = [
  ['docs/_glossary-android.md', 80],
  ['docs/_glossary-android.md', 82],
  ['docs/_glossary-android.md', 182],
  ['docs/_glossary-android.md', 199],
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 36],
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]
];
```
`[VERIFIED: docs/_glossary-android.md:145,147,303,333]` + `[VERIFIED: docs/android-lifecycle/00-enrollment-overview.md:65,67,97]` + `[VERIFIED: docs/admin-setup-android/03-fully-managed-cobo.md:51]` + `[VERIFIED: docs/l2-runbooks/20-android-app-install-investigation.md:33]` — confirmed live content at every target coordinate, quoted:
```
_glossary-android.md:145   ### Supervision
_glossary-android.md:147   > **Android note:** "Supervision" is an iOS/iPadOS management-state concept (see [Apple Glossary — Supervision](_glossary-macos.md#supervision)). Android does not use this term.
_glossary-android.md:303   > **Cross-platform note:** On iOS/iPadOS, the analog is Apple's Single App Mode or Autonomous Single App Mode configured through a supervised MDM profile —
_glossary-android.md:333   | 2026-04-21 | Phase 34 Foundation: initial Android Enterprise glossary — 13 disambiguation entries (work profile, supervision as callout-only, user enrollment, ...
00-enrollment-overview.md:65   Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; ...
00-enrollment-overview.md:67   "Supervision" is not an Android management term — Android does not use "supervised" or "unsupervised" as device states; see [_glossary-macos.md#supervision](../_glossary-macos.md#supervision) for the iOS definition. ...
00-enrollment-overview.md:97   - [Apple Provisioning Glossary](../_glossary-macos.md) — for iOS/macOS terminology including [supervision](../_glossary-macos.md#supervision)
03-fully-managed-cobo.md:51   > **Cross-platform note:** Android's Fully Managed is the closest analog to iOS Supervision on ADE-enrolled devices, but the mapping is partial —
20-android-app-install-investigation.md:33   Unlike iOS (where supervision state and licensing model are the primary failure axes), Android app install failures turn on **MGP approval state**, ...
```
`[VERIFIED: scripts/validation/v1.7-audit-allowlist.json:12-21]` — the live sidecar already pins all 9 (plus the extra `cobo:53`, see Pitfall 1) with `"reason"` strings that independently corroborate the lineage (e.g. `_glossary-android.md:145`'s reason string literally traces `"was line 79 shifted +1 ... line 76 shifted +3"` back through the same phase history the old `BASELINE_9` comments describe).

### The 12 SWEEP-09 chicken-and-egg return sites (verbatim line numbers)

`[VERIFIED: scripts/validation/check-phase-68.mjs:123,185]` — 2 sites:
```
:123  return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
:185  return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
```
`[VERIFIED: scripts/validation/check-phase-70.mjs:389,403,420,435,450,466,485,501,517,532]` — 10 sites (9 guard `aa6de68`, 1 — line 485 — guards the DIFFERENT SHA `4df3a16` via `readProjectAtV17CloseGate()`):
```
:389  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:403  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:420  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:435  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:450  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:466  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:485  chicken-and-egg: 4df3a16 (Plan 70-05 Commit B) not resolvable; check git history
:501  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:517  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
:532  chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes
```
`[VERIFIED: scripts/validation/_lib/frozen-at-close.mjs:69-76]` confirms both SHAs are populated (not placeholders): `V17: 'aa6de68'` and `V17_CLOSEGATE: '4df3a16'` — both reachable at HEAD, corroborating D-14's "both SHAs resolve today."

### check-phase-61's readAtV15CloseFor61 (D-09 target, verbatim)

`[VERIFIED: scripts/validation/check-phase-61.mjs:39-45]`:
```js
function readAtV15CloseFor61(relPath) {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:' + relPath], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```
`[VERIFIED: scripts/validation/check-phase-61.mjs:20]` — `readAtV15Close` is already imported: `import { readAtV15Close } from './_lib/frozen-at-close.mjs';`. `[VERIFIED: scripts/validation/_lib/frozen-at-close.mjs:71]` — `V15: 'ba2cbc0'` (matches the inline SHA exactly, confirming D-08's claim). Call-sites (8, all already handle `null`): `[VERIFIED: scripts/validation/check-phase-61.mjs:67,80,89,103,116,126,139,148]`.

### The two timeout literals (D-17)

`[VERIFIED: scripts/validation/check-phase-66.mjs:318,341]`:
```js
:318   execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });   // CHAIN-* spawn — RAISE
:341   execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() }); // v1.6 harness AUDIT spawn — LEAVE (V-68-11 substring)
```
`[VERIFIED: scripts/validation/check-phase-68.mjs:225]` (V-68-11) confirms the exact substring check: `if (!c.includes('timeout: 300000')) { bad.push(path); }` — a bare substring match satisfied by either occurrence, so raising only `:318` while leaving `:341` untouched keeps V-68-11 green (5/5, unchanged).
`[VERIFIED: scripts/validation/check-phase-67.mjs:261]`:
```js
execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });   // no env override — inherits parent's CHECK_PHASE_NESTED state
```

### CI job timeout caps and `needs: harness-run` fan-out (D-18/D-24/D-25)

`[VERIFIED: .github/workflows/audit-harness-v1.7-integrity.yml:77-151]`:
```yaml
linux-chain-ubuntu-latest:
  needs: harness-run
  timeout-minutes: 30
  continue-on-error: false
  # runs: node scripts/validation/check-phase-66.mjs --verbose

check-phase-67:
  needs: harness-run
  timeout-minutes: 15
  continue-on-error: false

check-phase-68:
  needs: harness-run
  timeout-minutes: 15
  continue-on-error: false

check-phase-69:
  needs: harness-run
  timeout-minutes: 15
  continue-on-error: false

check-phase-70:
  needs: harness-run
  timeout-minutes: 15
  continue-on-error: false
```
None of the five jobs above carries `if: always()` today — each defaults to GitHub Actions' implicit `if: success()` on its `needs:` job, so all five report `skipped` (not `failure`) while `harness-run` exits non-zero. Per **Pitfall 2**, the 15-minute cap is exposed on all four `check-phase-67/68/69/70` jobs, not just 67.

**`needs: harness-run` job counts, verified by direct grep of each workflow:**
- `[VERIFIED: .github/workflows/audit-harness-v1.5-integrity.yml]` — 15 jobs (`check-phase-{48,49,50,51,52,53,54,55,56,57,58,59,60,61}` = 14, + `pin-helper-advisory` = 15). 14 are `check-phase-NN`.
- `[VERIFIED: .github/workflows/audit-harness-v1.6-integrity.yml]` — 7 jobs (`check-phase-{62,63,64,65,66}` = 5, + `rotting-external-quarterly` + `pin-helper-advisory` = 7). 5 are `check-phase-NN`.
- `[VERIFIED: .github/workflows/audit-harness-v1.7-integrity.yml]` — 7 jobs (`linux-chain-ubuntu-latest`, `check-phase-{67,68,69,70}` = 4, + `rotting-external-quarterly` + `pin-helper-advisory` = 7). 4 are `check-phase-NN`.
- **Total: 15+7+7 = 29**, matching D-25's figure exactly. `check-phase-NN` total = 14+5+4 = **23**, matching D-25 exactly. `rotting-external-quarterly` carries its own `if: github.event_name == 'schedule' && ...` guard (`[VERIFIED: .github/workflows/audit-harness-v1.7-integrity.yml:157]`) so it is excluded from the "reports skipped on every ref" set regardless of `harness-run`'s outcome; subtracting it (and `pin-helper-advisory`, similarly gated — not independently re-verified this session, treat as `[ASSUMED]` matching D-25's own 19-count math) from 15+7 gives 14+5=**19**, matching D-25's "19 jobs" figure.

### GOV-02 Ledger row schema (verbatim)

`[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:19-21]`:
```markdown
## Row Schema

| File | Grep command | Hit count | Regression gate run | Result | Plan |
```
Discipline rules verbatim from the same file (`:8-17`): append-only, row-per-edit (not row-per-path — two edits to the same path across two plans may each get a row), and "absence is correct, not missing evidence" for a plan that touches no frozen-surface path.

### CARVE Category confirmations (verbatim category list + amendment procedure)

`[VERIFIED: .planning/milestones/v1.20-CARVE.md:64-72]` (D-09 amendment procedure, verbatim):
```markdown
## Amendment procedure (D-09)

An amendment to the allowlist below is a commit that:

1. Touches **only** this file (`.planning/milestones/v1.20-CARVE.md`) — no other path, in-scope
   or out-of-scope, may be touched in the same commit.
2. Carries a one-line rationale for the addition, either in the commit message or as a new `#`
   comment line directly above the added glob(s) in the allowlist block.
3. Lands **before** the edit it authorizes — never in the same commit, never after.
```
`[VERIFIED: .planning/milestones/v1.20-CARVE.md:156-209]` — confirmed exact category contents:
- **Category 1** (`:157-158`): `.github/workflows/audit-harness-*.yml` — glob covers all three workflows this phase edits (`if: always()`, `timeout-minutes` raises). **No amendment needed.**
- **Category 5** (`:178-193`): exactly 15 files listed — `check-phase-{30,31,48,49,51,60,61,62,63,64,65,66,68,69,70}.mjs`. `check-phase-67.mjs` is **confirmed absent** (matches D-12 exactly — I read the full glob block and it is not there).
- **Category 6** (`:195-196`): `scripts/validation/regenerate-supervision-pins.mjs` alone. **No amendment needed** for the BASELINE_9 rebase.

`[VERIFIED: scripts/validation/carve-gate.mjs:34-37]` (D-27's claim about gate scope, verbatim):
```js
const CARVE_PATH = '.planning/milestones/v1.20-CARVE.md';
const DEFAULT_BASE = 'a7bda73e23efc5e3f9607c3fef37abf8ec4030aa'; // v1.19 MILESTONE CLOSE (docs(138-06))
const IN_SCOPE_PREFIXES = ['scripts/', '.github/', 'docs/'];
const IN_SCOPE_EXACT = ['.gitattributes', 'package.json'];
```
`.planning/` is confirmed **not** in `IN_SCOPE_PREFIXES` — a commit touching only `.planning/milestones/v1.20-CARVE.md` (the D-09 amendment adding `check-phase-67.mjs` to a category) cannot itself trip the gate, because the gate's diff-scope check never even looks at `.planning/` paths. This corroborates D-27's "the cited hazard cannot fire" finding.

## Document Amendments (D-28) — exact current text, quoted

`[VERIFIED: .planning/ROADMAP.md:148]` (SC#2, to amend — currently hard-codes the withdrawn mechanism):
```
2. `regenerate-supervision-pins.mjs --self-test` exits 0 via a corrected classifier context window (the backward-only scan at `regenerate-supervision-pins.mjs:204-238` misses the iOS token at line 147, two lines after the heading), with the v1.7 fixture byte-unchanged and no classifier relaxation (RED-02).
```
`[VERIFIED: .planning/ROADMAP.md:150]` (SC#4, to amend — currently says "~19 validators"):
```
4. **[NEW REQUIREMENT, D-33]** The remaining silent-swallow frozen-read sites — beyond the 4 SWEEP-03 already fixed in Phase 139 — fail loud, scoped to the ~19 validators already open for RED-03 in this phase (SWEEP-09).
```
`[VERIFIED: .planning/REQUIREMENTS.md:24]` (SWEEP-09, to annotate — currently "roughly 38 ... 20 validators"):
```
- [ ] **SWEEP-09**: **[NEW REQUIREMENT, D-33, scoped to Phase 141]** The remaining silent-swallow frozen-read sites (measured at roughly 38 `catch`-to-null/empty frozen-read sites across 20 validators, of which Phase 139's SWEEP-03 fixes 4) fail loud. Explicit note: `check-phase-61.mjs:39-45`'s `readAtV15CloseFor61` **cannot** be fixed at the library root — it carries its own inline reader, does not import `_lib/frozen-at-close.mjs` for these reads, is one of the 11 SWEEP-02 validators, and is pinned in place by `check-phase-68.mjs:202` `V-68-10`.
```
`[VERIFIED: .planning/REQUIREMENTS.md:40]` ("Ordering, corrected" — D-28 says annotate-only, do not overwrite, per the `:8` HEAD-`347c20a8` stamp):
```
**Ordering, corrected.** `[MEASURED]` `check-phase-48` = 6 PASS / 1 FAIL (self-test only); `check-phase-60` = 22/3 including **V-60-23** (v1.5 harness C5); `check-phase-61` = 30/4 including **V-61-33** (v1.5 harness C5). The self-test therefore greens **one** validator, not six — **RED-01 is the true prerequisite** for 60, 61 and all five of 62–66. This matches the MANDATORY STATEMENT at `v1.19-DEFERRED-CLEANUP.md:83`.
```
`[VERIFIED: .planning/STATE.md:26,195,210,216,220]`, quoted exactly as found this session:
```
:26   **Current focus:** Phase 140 — Frozen-Aware Harness Conversion
:195  flipping all 27 v1.20 requirements to Validated +
:210  ## v1.20 Requirement Coverage (27/27 mapped — roadmap created 2026-08-04)
:216  | 141 | RED-01, RED-02, RED-03 | 3 |
:220  | **Total** | **27/27 mapped (0 orphaned)** | **27** |
```
Note `:216` omits SWEEP-09 entirely from Phase 141's requirement list (should read `RED-01, RED-02, RED-03, SWEEP-09` and count `4`), and every `27/27`/`27`/`all 27` above is stale by exactly one (SWEEP-09 brought the total to 28, confirmed at `.planning/REQUIREMENTS.md:156-158`: `v1.20 requirements: 28 total`, `Mapped to phases: 28 (100%)`).
`[VERIFIED: .planning/REQUIREMENTS.md:16,17,18,20,24]` — the `[SUCCESS-CRITERION AMENDMENT, D-NN]` marker instrument is already in live use exactly as D-27 describes (SWEEP-01/02/03 and SWEEP-09 all carry it today); reuse the identical bracket-marker convention for the D-28 amendments rather than inventing new prose.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `pin-helper-advisory` jobs in v1.5/v1.6/v1.7 carry an `if:`/`continue-on-error` guard that excludes them from the "reports skipped" 19-job count (not independently re-verified this session — only the arithmetic 15+7−1(rotting)−1(pin-helper)=19 was checked against D-25's own stated total) | CI job timeout caps and `needs: harness-run` fan-out | If `pin-helper-advisory` behaves like a normal gated job, the "19" figure is off by up to 2 and D-24's job list needs one more entry per workflow |
| A2 | The recommended raise-value for `timeout-minutes` on `check-phase-67/68/69/70`'s CI jobs (no specific number given in this research — deliberately left to plan-time measurement per D-31/D-22 discipline) | Pitfall 2 | If the planner picks a number without measuring cold-CI wall-clock for all four jobs (not just 67), a raised-but-still-insufficient cap could recreate the same false-red D-17 already diagnosed, this time for 68/69/70 |
| A3 | The exact wording/value the `03-fully-managed-cobo.md` BASELINE_9 entry should take (single coordinate `51`, per CONTEXT.md's explicit target list) is the intended choice, not an oversight in the CONTEXT.md brief itself | Pitfall 1 | Low risk — proven functionally safe either way by the set-subtraction invariant; only the audit-trail wording is at stake |

## Open Questions

None — every question the task brief raised was resolved against source this session; see the Pitfalls and Code Examples sections above for the resolutions.

## Environment Availability

Not applicable — this phase requires only `node` and `git`, both already in continuous use by every prior phase's execution in this repo (confirmed by the extensive successful prior-phase history in STATE.md). No new dependency is introduced.

## Security Domain

**`security_enforcement` is absent from `.planning/config.json`, so nominally enabled; however this phase has no user-facing, network-facing, or data-persistence surface to apply ASVS controls to.** It edits internal CI validator scripts, a GitHub Actions workflow definition, and Markdown governance documents — none of which accept external input, authenticate a user, manage a session, or perform cryptographic operations. `[VERIFIED: .github/workflows/audit-harness-v1.5/v1.6/v1.7-integrity.yml]` — no workflow edited by this phase references `secrets.*` (confirmed by reading each file's job definitions; `REQUIREMENTS.md`'s Out-of-Scope table independently confirms "Graph/SharePoint auto-upload... would introduce the first `secrets.` reference in any workflow" — i.e. today there are zero). No ASVS category applies; the only "threat" class relevant to this phase's blast radius is the frozen-surface governance the CARVE/GOV-02 mechanism itself exists to police (already covered above, not a STRIDE-style external threat).

## Sources

### Primary (HIGH confidence — all `[VERIFIED]` via direct `Read`/`Grep` this session)
- `scripts/validation/regenerate-supervision-pins.mjs` — `classify()` (`:204-238`), `scanSupervisionOccurrences()` (`:246-`), `BASELINE_9` (`:533-543`), `doSelfTest()` (`:545-628`), audit-trail comment history (`:388-533`)
- `scripts/validation/v1.7-audit-allowlist.json` — `supervision_exemptions[]` full array
- `docs/_glossary-android.md`, `docs/android-lifecycle/00-enrollment-overview.md`, `docs/admin-setup-android/03-fully-managed-cobo.md`, `docs/l2-runbooks/20-android-app-install-investigation.md` — target line content
- `scripts/validation/check-phase-{60,61,66,67,68,70}.mjs` — full or targeted reads of every cited assertion/spawn/timeout site
- `scripts/validation/_lib/frozen-at-close.mjs` — full file (`readAtClose`, `frozenCause`, `MILESTONE_CLOSE_SHAS`, `--self-test`)
- `scripts/validation/carve-gate.mjs` — `IN_SCOPE_PREFIXES`/`IN_SCOPE_EXACT`, header doc-comment
- `.planning/milestones/v1.20-CARVE.md` — amendment procedure, gate-failure disposition, GOV-02 grep procedure, full category allowlist block
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — row schema, discipline rules, existing rows 1-6 (Phase 139)
- `.github/workflows/audit-harness-v1.5/v1.6/v1.7-integrity.yml` — full job graphs, `needs:`, `timeout-minutes`, `if:` conditions
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` — exact current text at every D-28 line reference
- `scripts/validation/check-phase-73.mjs`, `check-phase-74.mjs` — confirmed the `check-phase-67.mjs` cross-references are content-string assertions (`V-73-CONVERT-67-05/06`), not raw line-range pins, relevant only to Phase 144's deferred edit
- `.planning/config.json` — `nyquist_validation: false` (Validation Architecture section correctly omitted), no `security_enforcement` key

### Secondary (MEDIUM confidence)
- None — no external documentation lookup was performed or needed; this phase has zero external-library surface.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- BASELINE_9 rebase mapping: HIGH for 8/9 coordinates (direct content read confirms Tier-1 classification); MEDIUM for the `cobo.md` cardinality nuance (functionally proven safe, but the "correct" single-vs-dual coordinate choice is a judgment call, not a verifiable fact)
- SWEEP-09 fix shapes: HIGH — every call-site, line number, and literal detail string read directly from source
- Timeout fixes: HIGH for line numbers and literal-string constraints; MEDIUM for the recommended CI `timeout-minutes` raise value (deliberately left unspecified, pending plan-time measurement per D-31)
- CARVE/GOV-02: HIGH — category membership and amendment procedure read verbatim from the governing document
- Document amendments: HIGH — every quoted line read directly from the live file this session

**Research date:** 2026-08-07
**Valid until:** Effectively permanent for the cited line numbers/strings as long as no other phase edits these files first — re-verify immediately before executing if any other work has landed on `master` since this research was written (this repo's `carve-gate.mjs`/GOV-02 discipline requires a fresh grep before every frozen-surface edit regardless).
