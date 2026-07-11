# Phase 128: V116 Pin + 15th Path-A Lineage Bump + Terminal Close - Research

**Researched:** 2026-07-11
**Domain:** Repo tooling / audit-harness lineage bump / milestone-close mechanics (Node.js validation scripts + GitHub Actions)
**Confidence:** HIGH

## Summary

This is the v1.17 closing cluster: a mechanical, precedent-bound lineage bump (Path-A copy of v1.13→v1.16's
pattern) plus a mandatory back-anchor pin plus a 3-axis terminal re-audit. All four gray areas (A/B/C/D) are
already adjudicated in `128-CONTEXT.md` via a three-agent adversarial review; this research does not revisit
them. Instead it operationalizes the plan-time-deferred items CONTEXT.md explicitly flags: the V116 SHA
(positively confirmed below), the apex validator skeleton (confirmed against `check-phase-125.mjs`), the
copy-source surfaces (confirmed against `v1.16-milestone-audit.mjs` / `v1.16-audit-allowlist.json` /
`audit-harness-v1.16-integrity.yml`), the CI cascade paths filters (confirmed across 4 representative
workflow files), and — the most consequential finding of this research — the **exact, definitive D-128-C
conversion set**, which is larger than the adversarial review's "confirmed starting points" list AND surfaces
a second, previously-unflagged remediation surface: the **sidecar allowlist line-pins themselves are stale by
exactly `-1` line** for 35 entries across 4 of the 5 HYG-02-touched files, because `HYG-02` deleted a
single frontmatter line (old line 11) in each file, shifting every subsequent line number down by one.

**Primary recommendation:** Follow the D-128-A/B/C/D decisions verbatim. At Atom-2 authoring time: (1) pin
`V116: '3dd2512'` (full SHA `3dd251249a812e31147cd653a7ad01e6878c091b`) exactly as CONTEXT.md's candidate
predicted; (2) convert the 8 confirmed `check-phase-*.mjs` live-HEAD readers of the 5 HYG-02 files to
`readAtV116Close` (list below — 3 more files than the review's starting-point list: `check-phase-58`,
`check-phase-109`, `check-phase-118`); (3) when copying `v1.16-audit-allowlist.json` →
`v1.17-audit-allowlist.json`, apply a uniform `-1` line-shift to the 35 C1/C2/C7/C9-class line-pin entries
for `docs/_glossary-android.md` (21), `docs/admin-setup-android/03-fully-managed-cobo.md` (3),
`docs/android-lifecycle/03-android-version-matrix.md` (3), and `docs/reference/android-capability-matrix.md`
(8) — otherwise the new `v1.17-milestone-audit.mjs` (a byte-copy of v1.16's, which reads these files at
LIVE HEAD, not frozen) will trip its BLOCKING C1 (SafetyNet)/C2 (supervision) exact-line-match checks the
first time it actually runs.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| V116 back-anchor pin (HARN-08) | Validation library (`scripts/validation/_lib/`) | — | Single-file constant/export addition; pure Node.js, no external service |
| Path-A lineage bump — harness + allowlist + workflow (HARN-09) | Validation scripts + CI (`scripts/validation/`, `.github/workflows/`) | — | Copy-then-repoint of existing Path-A artifacts; no new architecture |
| Predecessor frozen-aware conversion (HARN-09 mandate) | Validation scripts (`scripts/validation/check-phase-*.mjs`) | Validation library (`readAtV116Close`) | Content-assertion validators are the tier that reads corpus docs; the frozen-read helper lives in `_lib` |
| Sidecar allowlist line-pin repoint (NEW finding, this research) | Validation sidecar data (`v1.17-audit-allowlist.json`) | Validation harness (`v1.17-milestone-audit.mjs` C1/C2/C7/C9 checks) | Declarative JSON consumed by the harness at runtime against LIVE HEAD; not itself executable code |
| 3-axis terminal re-audit (HARN-10) | CI (GitHub Actions, Linux `ubuntu-latest`) | Local dev machine (Windows, corroboration only) | D-03 OS-split lock: Linux GHA is sole-authoritative for both chain validators; Windows deep-nests |
| Close-gate commit (HARN-10) | Planning docs (`.planning/PROJECT.md` / `ROADMAP.md` / `STATE.md` / `REQUIREMENTS.md`) | — | Documentation-only single commit; no code tier |

## Standard Stack

This phase installs **no new external packages** (Node.js `node:fs`, `node:child_process`, `node:path`,
`node:process` only — all Node.js built-ins already used throughout `scripts/validation/`). No `npm install`,
no `pip install`, no new dependency. Package Legitimacy Audit is therefore N/A (see that section below).

### Core (existing repo tooling, reused/extended)
| Tool | Version (confirmed live) | Purpose | Why Standard |
|------|---------|---------|--------------|
| Node.js | v24.17.0 `[VERIFIED: local shell]` | Runs all `check-phase-*.mjs` / `*-milestone-audit.mjs` validators | Already the sole runtime for the entire `scripts/validation/` tree; zero new tooling |
| git | 2.51.0.windows.2 `[VERIFIED: local shell]` | SHA recovery (`git log --all --grep`), `git show <sha>:<path>` frozen reads, fresh-clone Axis-1 | Already the mechanism for every `readAtVxxClose` helper and the terminal re-audit |
| GitHub Actions (`ubuntu-latest`) | N/A (hosted runner) | Axis-2 authoritative chain-validator run (D-03 OS split) | Established pattern since v1.7 (`audit-harness-v1.7-integrity.yml` onward) |

### Alternatives Considered
None — this phase is fully precedent-bound (Path-A copy) per CONTEXT.md; no library selection decisions exist.

## Package Legitimacy Audit

**N/A — this phase installs no external packages.** No `npm install` / `pip install` / `cargo` commands appear
anywhere in the plan surface (Atom 1, Atom 2, close-gate). The Package Legitimacy Gate protocol is skipped by
its own trigger condition ("Every phase that installs external packages").

## Architecture Patterns

### System Architecture Diagram

```
[git log --all --grep dual-token]
        |
        v
  V116 SHA recovered (3dd2512)
        |
        v
[Wave-0 pre-anchor HEAD captured] --(git rev-parse HEAD)--> BASELINE_21 back-anchor comment target
        |
        v
+--------------------------- Atom 1 (ONE commit) ---------------------------+
| - v1.17-milestone-audit.mjs   <-- copy of v1.16-milestone-audit.mjs, C1-C17 inherited, HARNESS ptr updated |
| - v1.17-audit-allowlist.json  <-- copy of v1.16-audit-allowlist.json, 35 C1/C2/C7/C9 pins -1 line-shifted  |
| - BASELINE_21 freshness comment appended to regenerate-supervision-pins.mjs                                |
+------------------------------------------------------------------------------------------------------------+
        |
        v
+--------------------------- Atom 2 (ONE commit) ---------------------------+
| - frozen-at-close.mjs: + V116: '3dd2512' + readAtV116Close export                                          |
| - check-phase-126.mjs, check-phase-127.mjs  (CHAIN_PHASES=[])                                              |
| - check-phase-128.mjs (APEX)  CHAIN_PHASES=[48..127] (80 entries), throw on len!=80/terminus!=127          |
| - audit-harness-v1.17-integrity.yml  <-- copy of v1.16's, paths repointed v1.16-*->v1.17-*, 14th coexist wf |
| - 8x check-phase-{49,58,59,62,101,109,118,121}.mjs: readFile(...) -> readAtV116Close(...) conversions       |
+------------------------------------------------------------------------------------------------------------+
        |
        v  PUSH (fires audit-harness-v1.17-integrity.yml paths: trigger)
        |
        v
+----------------------- Axis-2 (Linux GHA authoritative) ------------------+
| linux-chain-ubuntu-latest job: node check-phase-128.mjs --verbose (recursively spawns 48..127, NESTED=1)   |
| standalone check-phase-126/127/128 jobs (NOT nested)                                                       |
| harness-run job: node v1.17-milestone-audit.mjs --verbose (NOT nested — full C1-C17 against LIVE HEAD)     |
+------------------------------------------------------------------------------------------------------------+
        |
        v  CASCADE SCAN: v1.7-v1.16 + base workflow (11 firing, 10 chain-running) checked for RED
        |
        v  [emergent remediation slot -- only if GHA RED; expected to fire on nothing]
        |
        v
+--------------------------------- close-gate (ONE commit) -----------------+
| Axis-1: fresh git clone --no-hardlinks + run check-phase-128.mjs                                            |
| Axis-3: fresh zero-context sub-agent run                                                                    |
| cross-OS PASS/FAIL/SKIP EXACT MATCH assertion (Axis-1 vs Axis-2 vs Axis-3)                                  |
| PROJECT/ROADMAP/STATE/REQUIREMENTS: all 10 v1.17 reqs -> Validated                                          |
| v1.17-MILESTONE-AUDIT.md + v1.17-DEFERRED-CLEANUP.md authored                                               |
+------------------------------------------------------------------------------------------------------------+
```

### Recommended Plan/Commit Structure
Mirrors D-128-D's floor-not-ceiling skeleton exactly — see the diagram above. No new directory structure;
all files land in existing `scripts/validation/`, `scripts/validation/_lib/`, `.github/workflows/`,
`.planning/`, and `.planning/milestones/`.

### Pattern 1: Single-entry back-anchor pin (V116)
**What:** Add exactly one new key to `MILESTONE_CLOSE_SHAS` plus one new convenience-export arrow function.
**When to use:** Every milestone close since V18 (single-entry pattern; no `_CLOSEGATE` variant needed because
v1.16, like v1.8–v1.15, closed in ONE commit).
**Example (exact insertion, mirrors V115's block at `frozen-at-close.mjs:62-67`):**
```javascript
// Source: scripts/validation/_lib/frozen-at-close.mjs (existing V115 block, lines 62-67)
V116: '3dd2512',  // Phase 125 Plan 125-07 close-gate — v1.16 milestone close-gate; atom == close-gate.
                  // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                  // `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1
                  // --format=%H` -> 3dd251249a812e31147cd653a7ad01e6878c091b, subject: "docs(125-07):
                  // Phase 125 close-gate — v1.16 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability +
                  // apex-range correction + v1.16 MILESTONE CLOSE"). Single entry — same single-entry
                  // pattern as V18..V115 (back-anchor invariant: V116 references a PAST close SHA; the
                  // V117 pin is deferred to v1.18 per the back-anchor rule).

// ...and after the readAtV115Close export line (frozen-at-close.mjs:105):
export const readAtV116Close      = (p) => readAtClose('V116',         p);
```

### Pattern 2: Apex chain validator with hard length/terminus throw
**What:** `CHAIN_PHASES` array literal + two `throw` guards that fail-loud at module load if the topology drifts.
**When to use:** The single apex validator for the closing phase only; per-phase validators in the same
milestone carry `CHAIN_PHASES = []`.
**Example (exact model, `check-phase-125.mjs:56-75`, updated for Phase 128):**
```javascript
// Source: scripts/validation/check-phase-125.mjs:56-75 (model; Phase 128 apex changes 77->80, 124->127)
const CHAIN_PHASES = [48,49,50, /* ...continuous integers... */ 126,127];
const CHAIN_SKIP = new Set([]);  // NEVER add entries — V-128-SELF hard-asserts CHAIN_SKIP.size === 0

if (CHAIN_PHASES.length !== 80) {
  throw new Error('check-phase-128 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 80 (integers 48..127 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 127) {
  throw new Error('check-phase-128 CHAIN_PHASES must span 48..127 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}
```
**CRITICAL:** `check-phase-125.mjs`'s throw literal is `!== 77` / terminus `!== 124` — copying it verbatim
into `check-phase-128.mjs` without updating to `80` / `127` will throw on the apex's own module load
(confirmed live at `check-phase-125.mjs:70-75`). This is grounding correction #5 from CONTEXT.md, independently
re-confirmed here by reading the file.

### Pattern 3: Lightweight per-phase validator (no chain)
**What:** `CHAIN_PHASES = []` with a `V-NNN-SELF` dual-invariant guard (excludes own phase number; asserts
`CHAIN_SKIP.size === 0`).
**When to use:** Every non-apex validator in the current milestone (`check-phase-126.mjs`, `check-phase-127.mjs`
this milestone).
**Example (confirmed live at `check-phase-123.mjs:35` and `check-phase-124.mjs:34`, both `CHAIN_PHASES = []`):**
```javascript
// Source: scripts/validation/check-phase-123.mjs:35, check-phase-124.mjs:34 (both confirmed CHAIN_PHASES=[])
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```

### Pattern 4: Frozen-aware read conversion (`readAtV116Close`)
**What:** Replace `readFile(path)` (live HEAD via `fs.readFileSync`) with `readAtV116Close(path)` (via
`git show 3dd2512:path`) inside a predecessor validator's content-assertion check.
**When to use:** ONLY on the 8 validators enumerated in the D-128-C Conversion Set section below — the ones
that read one of the 5 HYG-02-touched files at live HEAD. Do NOT convert reads of other files (that is the
out-of-scope `FROZEN-AWARE-ADOPTION-SWEEP-01`).
**Example (established pattern already live, e.g. `check-phase-57.mjs:104`):**
```javascript
// Source: scripts/validation/check-phase-57.mjs:100-104 (existing frozen-aware precedent to mirror)
run() {
  // frozen-aware: read at v1.5-close (Phase 57's own milestone) instead of live HEAD.
  const c = readAtV15Close(INDEX_MD);
  ...
}
```
For Phase 128's conversions the target milestone is V116, not V15 — import `readAtV116Close` from
`./_lib/frozen-at-close.mjs` into each of the 8 files (none currently import from `_lib`; verify each file's
import block before adding).

### Anti-Patterns to Avoid
- **Value-masking:** Do NOT bump an expected-value string/needle to match the evolved (post-HYG-02) content.
  The correct fix is switching the READ to frozen (`readAtV116Close`), not changing what is asserted.
- **Editing a frozen predecessor's harness code:** `v1.16-milestone-audit.mjs` itself must stay byte-unchanged
  (Path-A frozen surface). The sidecar `v1.16-audit-allowlist.json` → `v1.17-audit-allowlist.json` copy is
  where the line-shift fix belongs (see D-128-C extended finding below), not the harness `.mjs` file.
- **Line-anchored assumption drift:** Do not assume `.includes()` substring checks are line-sensitive — most
  content-assertion checks are NOT (confirmed: none of the 8 converted validators' needles are line-anchored).
  Only the C1/C2/C7/C9 `{file, line}` EXACT-match checks in the milestone-audit harnesses are line-sensitive —
  that is a narrower, sidecar-level problem, not a `check-phase-*.mjs` problem.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frozen-at-a-SHA file reads | A new ad-hoc `git show` wrapper | `readAtClose()` / `readAtV116Close` in `_lib/frozen-at-close.mjs` | Centralized since Phase 111; hardened signature (explicit stdio, CRLF normalization) already exists |
| Chain-validator recursion | A new custom subprocess runner | The existing `execFileSync('node', [path], {..., env: {CHECK_PHASE_NESTED:'1'}})` pattern in `check-phase-125.mjs:118-124` | NESTED-aware guard prevents polynomial wall-clock blowup; already battle-tested at `[48..124]` depth |
| CI coexistence workflow | A new workflow authored from scratch | Copy `audit-harness-v1.16-integrity.yml` and repoint paths | 13 prior generations of this exact copy-then-repoint pattern exist; zero net-new CI design needed |

**Key insight:** This phase is definitionally a copy-and-repoint exercise. Any task that "designs" new
validator architecture, new CI structure, or a new close-gate shape should be treated as a scope violation —
the ONLY legitimate creative work is the D-128-C conversion-set enumeration (already done by this research)
and the sidecar line-shift repoint math (also done by this research).

## D-128-C Conversion Set — DEFINITIVE ENUMERATION (the most important finding)

A full scan of every `scripts/validation/check-phase-*.mjs` file (48 through 127) for `readFileSync`/`readFile`
calls against the 5 HYG-02-touched files was run. Confirmed via `grep -rln` across all 5 filenames, then each
candidate file was read to determine (a) whether the read is live-HEAD (`readFile()`/`fs.readFileSync`) vs.
already frozen (`readAtVxxClose()`), and (b) whether the asserted needle references the removed
`phase_46_wave2_retrofit` key (it does not, in any case — confirms CONTEXT.md grounding correction #3).

**The 5 HYG-02 files:** `docs/_glossary-android.md` (RE-179), `docs/admin-setup-android/03-fully-managed-cobo.md`
(RE-095), `docs/admin-setup-android/04-byod-work-profile.md` (RE-096), `docs/reference/android-capability-matrix.md`
(RE-144), `docs/android-lifecycle/03-android-version-matrix.md` (RE-188).

**`grep -r phase_46_wave2_retrofit scripts/validation/` confirmed empty** `[VERIFIED: grep, this session]` —
no validator asserts the removed key by name.

### Confirmed live-HEAD readers (8 files, 14 individual checks) — the DEFINITIVE conversion set

| Validator | Check ID(s) | File:Line | HYG-02 file read | Needle asserted | Frontmatter-key-safe? |
|-----------|-------------|-----------|-------------------|------------------|------------------------|
| `check-phase-49.mjs` | V-49-19 | line 293 (unconditional) | `_glossary-android.md` | H3-term extraction for cross-glossary collision audit (no literal needle) | Yes |
| `check-phase-49.mjs` | V-49-21 | line 326 (gated `--skip-reciprocal`, default OFF so it runs) | `_glossary-android.md` | `[Linux Provisioning Glossary](_glossary-linux.md)` | Yes |
| `check-phase-58.mjs` | V-58-13, 16, 17, 18, 19, 22 | lines 241, 273, 286, 297, 311, 347 | `android-capability-matrix.md` | `## Conditional Access` H2, comparison-doc link, anchor preservation, negative deferral-wording, negative Phase-45 anchor regression | Yes |
| `check-phase-59.mjs` | V-59-05 | line 281-282 | `_glossary-android.md` | presence-only | Yes |
| `check-phase-59.mjs` | V-59-36 | line 925 | `_glossary-android.md` | negative TBD/TODO/FIXME/XXX/PLACEHOLDER scan | Yes |
| `check-phase-62.mjs` | V-62-06..09 | line 188 (loop over `GLOSSARIES_4`) | `_glossary-android.md` | `_glossary-apple-business.md` or `Apple Business Governance` reciprocal banner | Yes |
| `check-phase-101.mjs` | V-101-BANNER | line 76 | `_glossary-android.md` | 802.1X see-also banner text | Yes |
| `check-phase-109.mjs` | V-109-ROW-ANDROID | line 61 | `android-capability-matrix.md` | Network-Auth (802.1X) row text | Yes |
| `check-phase-118.mjs` | V-118-PRESENCE-MATRIX, ENROLL, REFORMAT, TABLE-REMEDIATION | lines 57 (via `presence()` helper), 73, 98, 110 | `android-capability-matrix.md` | `doc_id: RE-144`, `status: Approved`, `v1.15 EEE reformat` VH row, `Table summary:` | Yes |
| `check-phase-121.mjs` | V-121-VHROW | line 104 | `_glossary-android.md` | `v1.16 EEE reformat` VH row | Yes |

**This list is 3 files LARGER than the adversarial review's "confirmed starting points"** (`check-phase-121`,
`check-phase-101`, `check-phase-49/59/62`). This research additionally confirms `check-phase-58.mjs` (6 checks
against `android-capability-matrix.md`), `check-phase-109.mjs` (1 check), and `check-phase-118.mjs` (4 checks)
as live-HEAD readers of `android-capability-matrix.md`, none of which were named in CONTEXT.md's starting-point
list. All 8 files must be converted per the HARN-09 mandate — the review's list was illustrative
("confirmed live-HEAD readers include...") not exhaustive; this research supplies the exhaustive set.

**Files with ZERO check-phase-*.mjs readers (confirmed by targeted grep, no conversion needed):**
`docs/admin-setup-android/03-fully-managed-cobo.md`, `docs/admin-setup-android/04-byod-work-profile.md`,
and `docs/android-lifecycle/03-android-version-matrix.md` are referenced only inside
`vX.Y-audit-allowlist.json` sidecar files and `regenerate-supervision-pins.mjs`'s own occurrence-scan data —
never inside a `check-phase-*.mjs` content-assertion `readFile()` call. `check-phase-57.mjs` was investigated
and ruled OUT: it only checks that `docs/index.md`'s body text CONTAINS the literal string
`"reference/android-capability-matrix.md"` as a cross-reference link — it never reads
`android-capability-matrix.md` itself.

### NEW finding beyond D-128-C's stated scope: sidecar allowlist line-pins are stale by -1

**This is the single most load-bearing fact in this research file.** `HYG-02` (commit `7dda1f7`) deleted
**exactly one line** — the old line-11 `phase_46_wave2_retrofit: 2026-04-25` frontmatter key — from each of
the 5 touched files (confirmed via `git show 7dda1f7 -- docs/_glossary-android.md`: `1 file changed, 1
deletion(-)`, diff hunk shows the deleted line was immediately before the closing `---`). This shifts **every
line at or after old-line-12 down by exactly 1** in all 5 files.

`v1.16-audit-allowlist.json` (the sidecar consumed by `v1.16-milestone-audit.mjs`'s C1/C2/C7/C9 checks) was
generated `2026-07-09` — **before** HYG-02 landed (`2026-07-10`, Phase 126). It contains **35 exact
`{file, line}` pins across 4 of the 5 HYG-02 files** (all pins are well above line 12, so all are affected):

| File | Pin count | Line numbers (pre-HYG-02, now stale) |
|------|-----------|----------------------------------------|
| `docs/_glossary-android.md` | 21 | 38, 90, 94, 126, 128, 130, 132, 146, 148, 152, 187, 202, 219, 221 (×2), 225, 304, 331, 333, 334, 338 |
| `docs/reference/android-capability-matrix.md` | 8 | 75, 123, 125, 126, 128, 130, 134, 135 |
| `docs/admin-setup-android/03-fully-managed-cobo.md` | 3 | 52, 54, 199 |
| `docs/android-lifecycle/03-android-version-matrix.md` | 3 | 58, 102, 104 |
| `docs/admin-setup-android/04-byod-work-profile.md` | 0 | none (its only sidecar reference is a `count`-based `ci_3_managed_apple_id` tracker at line ~480, not line-pinned — unaffected) |

`[VERIFIED: JSON parse + Python walk of scripts/validation/v1.16-audit-allowlist.json, this session]`

**Why this matters:** `v1.16-milestone-audit.mjs`'s C1 (SafetyNet) and C2 (supervision) checks use **exact**
equality: `e.file === relPath && e.line === lineNum` (confirmed at `v1.16-milestone-audit.mjs:266-268` and
`:300-301`). Both C1 and C2 are **BLOCKING**. When `v1.17-milestone-audit.mjs` (a Path-A byte-copy of
`v1.16-milestone-audit.mjs` — same C1-C17 logic, same exact-match semantics) reads these 5 files at **live
HEAD** (post-HYG-02), every previously-exempted occurrence at old-line-N now sits at line N-1. If
`v1.17-audit-allowlist.json` is copied byte-verbatim from `v1.16-audit-allowlist.json` without a line-shift
repoint, the harness will look for an exemption at line N and find the actual occurrence at line N-1 — the
exemption match fails, and 35 previously-legitimate exemptions surface as **new BLOCKING FAIL violations** the
first time `v1.17-milestone-audit.mjs` is actually run (which happens immediately: Atom 2's `check-phase-128`
apex invokes it as the "current-milestone harness," and the new `audit-harness-v1.17-integrity.yml`'s
`harness-run` job runs it directly, non-nested).

**This has NOT yet been exercised in CI.** `audit-harness-v1.16-integrity.yml`'s `paths:` filter is narrow
(`scripts/validation/v1.16-*`, `scripts/validation/check-phase-*.mjs`, the workflow file itself, and 3
`.planning` doc paths) — it does **not** include `docs/_glossary-android.md` or the other 4 content paths, so
Phase 126's HYG-02 commit did not trigger it. Only the BASE `audit-harness-integrity.yml` fired on HYG-02 (its
`paths:` includes `docs/_glossary-android.md`, `docs/reference/android-capability-matrix.md`,
`docs/android-lifecycle/**`, `docs/admin-setup-android/**` directly) — and the base workflow runs only the
v1.4/v1.4.1 harnesses, which do not read these 5 files at all. **Phase 128 is the FIRST time anything will
actually re-run C1/C2 against these 5 post-HYG-02 files.**

**Precedent for the fix:** `v1.16-milestone-audit.mjs`'s own header comment (line 4) already documents this
exact remediation pattern for a different drift cause: "`v1.16-audit-allowlist.json` (v1.16 Path-A from v1.15
— `docs/_glossary-android.md` + `docs/android-lifecycle/00-enrollment-overview.md` +
`docs/android-lifecycle/03-android-version-matrix.md` C2/C7/C9 line-pins **TARGETED-repointed** per the
Phase-121/122 EEE-retrofit blockquote-split drift; confirmed against live corpus, not copied verbatim; the
OTHER 5 C2/C7/C9-pinned files remain byte-unchanged since v1.15 close and are copied verbatim)." The v1.17
Atom-1 sidecar copy should apply the identical "TARGETED-repointed... confirmed against live corpus" treatment
to the 4 HYG-02-drifted files (uniform `-1` shift, re-verify each pinned line still contains the expected
banned-term occurrence at its new position) while copying the remaining ~470+ entries for untouched files
verbatim.

**Scope boundary:** this sidecar-repoint is a DIFFERENT surface from the D-128-C `check-phase-*.mjs` conversion
set above — it is Atom-1 work (sidecar authoring), not Atom-2 work (validator conversion). Both are required;
neither substitutes for the other. `v1.16-milestone-audit.mjs`/`v1.16-audit-allowlist.json` themselves are NOT
edited (Path-A frozen-surface rule) — only the NEW `v1.17-audit-allowlist.json` copy gets the repointed pins.

## Common Pitfalls

### Pitfall 1: Copying `v1.16-audit-allowlist.json` byte-verbatim
**What goes wrong:** `v1.17-milestone-audit.mjs`'s C1/C2 BLOCKING checks FAIL on 35 previously-exempted
occurrences across `_glossary-android.md`, `android-capability-matrix.md`,
`03-fully-managed-cobo.md`, and `03-android-version-matrix.md`.
**Why it happens:** HYG-02 deleted one frontmatter line from each of these 5 files (Phase 126, after the
sidecar was generated), shifting all subsequent line numbers by -1; the sidecar was never re-verified against
live corpus after that edit because no workflow with a matching `paths:` filter + chain job ran in between.
**How to avoid:** Apply the documented "TARGETED-repointed... confirmed against live corpus" treatment (see
D-128-C extended finding above) to these 4 files' pins when authoring `v1.17-audit-allowlist.json` in Atom 1.
**Warning signs:** Running `node scripts/validation/v1.17-milestone-audit.mjs --verbose` locally after Atom 1
lands and seeing C1/C2 FAIL with violations at lines matching (old-pin - 1) in these 4 files.

### Pitfall 2: Copying `check-phase-125.mjs`'s throw literals unmodified
**What goes wrong:** `check-phase-128.mjs` throws `Error: check-phase-128 CHAIN_PHASES length ... !== 80` (or
similar) at module load, failing every single invocation including the standalone one.
**Why it happens:** `check-phase-125.mjs:70-75` hard-codes `77` and `124`; a naive copy-paste for
`check-phase-128.mjs` retains those literals while the actual array now has 80 entries terminating at 127.
**How to avoid:** Update both throw conditions (`!== 77` → `!== 80`, `!== 124` → `!== 127`) — this is
grounding correction #5, independently re-confirmed by reading the live file in this session.
**Warning signs:** Any invocation of `check-phase-128.mjs` (even `--help`) crashes before running a single check.

### Pitfall 3: Missing the C2 exemption re-verification after line-shift
**What goes wrong:** Blindly subtracting 1 from all 35 line numbers without re-reading the actual current
content at the new line could silently pin the WRONG line if any other, unrelated edit also touched these
files between v1.16 close (`3dd2512`) and Phase 128 plan time.
**Why it happens:** The `-1` shift is only guaranteed correct if HYG-02 is the ONLY corpus edit to these 5
files since `3dd2512`. HYG-03 is confirmed a no-op (already fixed pre-v1.16-close per grounding correction #1)
so it introduces no additional drift, but a plan-time diff check is still cheap insurance.
**How to avoid:** Before authoring the repointed sidecar, run `git diff 3dd2512..HEAD -- docs/_glossary-android.md
docs/admin-setup-android/03-fully-managed-cobo.md docs/reference/android-capability-matrix.md
docs/android-lifecycle/03-android-version-matrix.md` and confirm the ONLY diff per file is the single deleted
frontmatter line (matching the `7dda1f7` diff already captured in this research).
**Warning signs:** Any diff hunk beyond the single-line frontmatter deletion in these 4 files.

### Pitfall 4: Forgetting the emergent-slot ordering dependency
**What goes wrong:** Authoring the close-gate before the Atom-2 push leaves no GHA run ID for the "authoritative
Axis-2 = this GHA run" leg to reference (D-128-B mandatory rider).
**Why it happens:** The 3-axis re-audit's Axis-2 leg is defined as "the new `audit-harness-v1.17-integrity.yml`
run that was triggered by the Atom-2 push," not an ad-hoc re-run — sequencing matters.
**How to avoid:** Strict ordering: Wave-0 → Atom 1 → Atom 2 → PUSH → wait for/consume the GHA run ID →
[emergent slot if RED] → close-gate.
**Warning signs:** No GHA run ID available to cite in `v1.17-MILESTONE-AUDIT.md`'s Axis-2 section.

## Code Examples

### V116 SHA recovery (dual-token positive confirmation — run exactly this at plan/execution time)
```bash
# Source: this session's live execution; output below is the actual confirmed result
git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format="%H %s"
# => 3dd251249a812e31147cd653a7ad01e6878c091b docs(125-07): Phase 125 close-gate — v1.16 MILESTONE-AUDIT +
#    DEFERRED-CLEANUP + 4-doc traceability + apex-range correction + v1.16 MILESTONE CLOSE
```
Short SHA for the pin: `3dd2512` (matches CONTEXT.md's candidate exactly — POSITIVELY CONFIRMED, not assumed).

### Confirming the HYG-02 line-shift (run before authoring the sidecar repoint)
```bash
# Source: this session's live execution
git show 7dda1f7 -- docs/_glossary-android.md
# diff shows: "-phase_46_wave2_retrofit: 2026-04-25" removed from old line 11 (immediately before the closing ---)
git show 7dda1f7 --stat
# => 5 files changed, 5 deletions(-) — confirms exactly 1 line deleted per file, all 5 HYG-02 files
```

### C1/C2 exact-match semantics (why the line-shift is BLOCKING, not cosmetic)
```javascript
// Source: scripts/validation/v1.16-milestone-audit.mjs:266-268 (C1 SafetyNet) and :300-301 (C2 supervision)
const pinned = ALLOWLIST.safetynet_exemptions.some(
  e => e.file === relPath && e.line === lineNum   // EXACT equality — no fuzzy/nearby-line tolerance
);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| N/A — this phase follows the established v1.13→v1.16 Path-A pattern unchanged | Same pattern, 15th iteration | N/A | No process change this milestone; confirms the pattern remains stable at 80-entry chain depth |

**Deprecated/outdated:** None. `FROZEN-AWARE-ADOPTION-SWEEP-01` (broad sweep) and
`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (O(n²) rewrite) remain explicitly deferred per CONTEXT.md — this research
does not recommend accelerating either.

## Assumptions Log

No claims in this research are tagged `[ASSUMED]`. All package/tool claims are `[VERIFIED: local shell]`
(Node/git version probes) or `[VERIFIED: <tool>, this session]` (git log/git show/grep/JSON-parse executed
live against the actual repo state). All architectural claims are grounded in direct file reads of the live
repo (`check-phase-*.mjs`, `frozen-at-close.mjs`, `*-milestone-audit.mjs`, `*-audit-allowlist.json`,
`.github/workflows/*.yml`) cited with file:line references throughout.

**If this table is empty:** All claims in this research were verified or cited — no user confirmation needed.

## Open Questions

1. **Does any OTHER milestone's sidecar (v1.7 through v1.15) also carry stale line-pins for these 5 files?**
   - What we know: v1.16's sidecar is confirmed stale by -1 for 4/5 files. `03-fully-managed-cobo.md` and
     `03-android-version-matrix.md` also appear pinned in v1.4/v1.4.1/v1.5-v1.15 sidecars (per the earlier
     ecosystem-wide grep), but those OLDER sidecars are consumed only by their OWN generation's harness
     (`v1.X-milestone-audit.mjs`), which is invoked ONLY when its OWN `check-phase-N.mjs` apex runs
     standalone/non-nested — and per Path-A convention those older apexes are never re-triggered as
     individual CI jobs once superseded (only the current milestone's phases get individual jobs; see the
     `audit-harness-v1.16-integrity.yml` job list, which only has `check-phase-120..125`, not `48..119`).
   - What's unclear: whether HYG-02's line-shift also broke any v1.14/v1.15-era sidecar pins for
     `android-capability-matrix.md` (which is pinned in the v1.13-v1.16 sidecars per the earlier grep) via
     some other still-live trigger path this research did not fully trace (e.g., a manual
     `node scripts/validation/v1.14-milestone-audit.mjs` invocation, which is not blocked but is also not
     part of any current CI job).
   - Recommendation: out of scope for Phase 128 (only the CURRENT-milestone sidecar `v1.17-audit-allowlist.json`
     is authored this phase); flag as a `FROZEN-AWARE-ADOPTION-SWEEP-01`-adjacent observation for the
     DEFERRED-CLEANUP doc if the cascade scan surfaces it as RED in an older non-nested job.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `check-phase-*.mjs` / `*-milestone-audit.mjs` execution | ✓ | v24.17.0 | — |
| git | SHA recovery, frozen-aware reads, fresh-clone Axis-1 | ✓ | 2.51.0.windows.2 | — |
| GitHub Actions (`ubuntu-latest`) | Axis-2 authoritative chain run | ✓ (hosted; assumed reachable per existing 13 coexistence workflows already running) | — | — |

**Missing dependencies with no fallback:** None identified.
**Missing dependencies with fallback:** None identified — this phase has no new external dependencies beyond
what the existing 13 prior Path-A generations already require and have proven available.

## Validation Architecture

This phase's "product" IS the validation harness — there is no separate application code to test. The
existing `check-phase-*.mjs` chain and `*-milestone-audit.mjs` harnesses ARE the test suite; the sampling
rate is inherent to the phase's own deliverable (running the new/converted validators IS the verification).

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator scripts (`scripts/validation/check-phase-*.mjs`), no external test runner |
| Config file | None — each validator is a self-contained executable script |
| Quick run command | `node scripts/validation/check-phase-128.mjs --verbose` (standalone, non-nested — exercises AUDIT-HARNESS too) |
| Full suite command | `node scripts/validation/check-phase-128.mjs` via the `linux-chain-ubuntu-latest` GHA job (recursively spawns 48..127, NESTED-aware) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HARN-08 | `readAtV116Close('...')` resolves via `git show 3dd2512:...` without throwing | unit (manual invocation) | `node -e "import('./scripts/validation/_lib/frozen-at-close.mjs').then(m => console.log(m.readAtV116Close('.planning/REQUIREMENTS.md').slice(0,50)))"` | ✅ (after Atom 2) |
| HARN-09 | `v1.17-milestone-audit.mjs --verbose` exits 0 (C1-C17 green against live+repointed-sidecar corpus) | integration | `node scripts/validation/v1.17-milestone-audit.mjs --verbose` | ✅ (after Atom 1) |
| HARN-09 | The 8 converted validators exit 0 individually | integration | `node scripts/validation/check-phase-{49,58,59,62,101,109,118,121}.mjs` | ✅ (already exist; edited in Atom 2) |
| HARN-10 | `check-phase-128.mjs` standalone exits 0 (80-entry chain + harness + self-guard) | integration | `node scripts/validation/check-phase-128.mjs --verbose` | ✅ (after Atom 2) |
| HARN-10 | Cross-OS exact match (Axis-1 fresh clone vs Axis-2 GHA vs Axis-3 sub-agent) | e2e / manual-only | fresh `git clone --no-hardlinks` + compare PASS/FAIL/SKIP counts | manual-only — justification: cross-OS/cross-context comparison cannot be a single automatable command by design (that IS the 3-axis independence guarantee) |

### Sampling Rate
- **Per task commit (Atom 1, Atom 2):** `node scripts/validation/check-phase-128.mjs --verbose` (standalone)
- **Per wave merge / push:** the `linux-chain-ubuntu-latest` GHA job (authoritative full chain)
- **Phase gate:** All 3 axes EXACT MATCH before the close-gate commit lands

### Wave 0 Gaps
None — this phase authors its own validators as the deliverable; there is no pre-existing test file to write
before implementation starts. The "Wave-0 pre-anchor HEAD capture" (`git rev-parse HEAD`, per the D-128-D
skeleton) is a data-capture step, not a test-infrastructure gap.

## Security Domain

Not applicable in the conventional web/API sense — this phase touches only local validation tooling and CI
config, no user input, no auth surface, no network-facing code. `workflow.nyquist_validation` /
`security_enforcement` ASVS mapping is skipped as inapplicable (no HTTP surface, no data store, no
authentication/authorization boundary is created or modified by this phase).

## Sources

### Primary (HIGH confidence — direct repo reads/executions this session)
- `scripts/validation/_lib/frozen-at-close.mjs` (full file read) — MILESTONE_CLOSE_SHAS structure, V115 pattern
- `scripts/validation/check-phase-125.mjs` (full file read) — apex pattern, throw literals, CHAIN_SKIP invariant
- `scripts/validation/check-phase-{49,57,58,59,62,101,109,118,121,123,124}.mjs` (targeted reads) — conversion set enumeration
- `scripts/validation/v1.16-milestone-audit.mjs` (targeted reads) — C1/C2 exact-match semantics, header lineage comment
- `scripts/validation/v1.16-audit-allowlist.json` (full JSON parse) — 35-pin line-shift enumeration
- `scripts/validation/regenerate-supervision-pins.mjs` (targeted reads) — BASELINE_20 comment pattern
- `.github/workflows/audit-harness-{integrity,v1.5,v1.6,v1.7,v1.8,v1.16}-integrity.yml` — paths filter comparison
- `.gitignore`, `.claude/hooks/publish-bundle-gate.cjs` — Sub-Q1 confirmation (dist/ gitignored, hook is read-only on zip)
- `.planning/milestones/v1.16-DEFERRED-CLEANUP.md` — V116-PIN-DEFERRAL and DEFER-125-06-A exact text
- `git log --all --grep` / `git show` executions this session — V116 SHA + HYG-02 diff confirmation

### Secondary (MEDIUM confidence)
None — no WebSearch/external-source claims were needed; this phase is entirely repo-internal.

### Tertiary (LOW confidence)
None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new tools; Node/git versions directly probed
- Architecture: HIGH — every pattern confirmed against a live, currently-executing file in the repo
- Pitfalls: HIGH — the line-shift pitfall is derived from an actual `git show` diff plus the harness's own
  exact-match source code, not inferred

**Research date:** 2026-07-11
**Valid until:** Effectively permanent for THIS phase's facts (SHAs and line numbers are point-in-time facts
about frozen history that will not change) — but re-verify the V116 SHA recovery command and the HYG-02
diff-scope check (Pitfall 3) at actual execution time in case any intervening commit touches these 5 files
between now and Atom 1 authoring.
