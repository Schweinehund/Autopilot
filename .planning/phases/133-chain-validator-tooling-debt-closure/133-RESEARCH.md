# Phase 133: Chain-Validator Tooling Debt Closure - Research

**Researched:** 2026-07-19
**Domain:** Node.js validation-harness tooling / GitHub Actions CI / frozen-sidecar coordinate reconciliation
**Confidence:** HIGH for TOOL-05/TOOL-06 mechanics and frozen-surface scoping; MEDIUM for the full TOOL-04 per-sidecar coordinate set (v1.16 fully solved and verified; v1.4-v1.15 methodology proven but not exhaustively hand-computed — see Open Questions)

## Summary

All strategic decisions for this phase are locked in `133-CONTEXT.md` (D-01..D-09, CARVE-1, CARVE-2, resolved via 3-agent `/adversarial-review`). This research does **not** revisit those decisions. It investigates the mechanical HOW, grounded in live code, git history, and actual tool output, so the planner can write exact tasks.

The single most important ground-truth finding: **the "HYG-02 −1 line-shift" is not one uniform fix applicable identically to all 13 predecessor sidecars.** It cleanly and exactly describes only the v1.16→v1.17 transition (a single frontmatter-line deletion across 5 files, of which 4 carry `{file,line}` pins — 35 pins total, already computed and verified in `.planning/milestones/v1.17-phases/128-.../128-01-SUMMARY.md`, and already landed correctly in `v1.17-audit-allowlist.json`). The older sidecars (`v1.4` through `v1.15`) are stale for a **different and larger** reason: they were frozen at earlier corpus states and were never re-pinned since, so their drift versus current content spans years of unrelated growth, a Phase-125 C17 #12 blockquote-fragmentation event that split several single-line pins into 2-4 physical lines, and (for the oldest two) check categories that didn't exist yet when they were authored. A single per-sidecar `-1` will not fix `v1.4`-`v1.15`; each needs its own coordinate reconciliation, using `v1.17-audit-allowlist.json` as the ground-truth "current correct line" map (content is provably unchanged since the v1.17 close SHA — verified via `git log`, zero commits touch any of the 8 Android/Linux files this phase cares about).

The good news that makes this tractable: **`v1.5` through `v1.13` (9 sidecars) carry byte-identical `supervision_exemptions` / `c7_knox_allowlist` / `c9_exemptions` / `safetynet_exemptions` arrays** (verified via JSON diff). Computing the fix once for `v1.5` gets it for free on the other 8. Combined with `v1.16`'s fully-solved case, the real problem size is **6 distinct reconciliation targets** (`v1.4`, `v1.4.1`, `v1.5`≡{`v1.6`..`v1.13`}, `v1.14`, `v1.15`, `v1.16`), not 13.

A second important finding: **not every current CI failure on these predecessor workflows is caused by the coordinate-pin problem TOOL-04 targets.** Local replay of all 15 milestone-audit harnesses today shows `v1.4`/`v1.4.1` also fail C4 (Android links in deferred files) and C5 (frontmatter freshness) — checks whose failure has nothing to do with `{file,line}` pin drift and everything to do with the frozen harness's rules no longer matching an evolved corpus (the CARVE-1 root cause). `v1.5`-`v1.13` also fail C10 (Linux frontmatter freshness) for the same reason. A coordinate-only re-pin will not turn these fully green; the plan needs to explicitly scope TOOL-04's "made green" success criterion to the **pin-coordinate-driven check categories** (C2 supervision, C7 Knox, C9 COPE, safetynet) and treat any remaining non-coordinate RED on the oldest sidecars as pre-existing carried debt already covered by the `ACCEPTED-STANDALONE-CI-RED` disposition (confirmed still on file in `v1.17-DEFERRED-CLEANUP.md`), not new TOOL-04 scope.

Third finding: the officially-cited "11 standalone-RED workflows" (from `v1.17-DEFERRED-CLEANUP.md`'s `ACCEPTED-STANDALONE-CI-RED` entry, referencing GHA run `29165955062`) enumerates only `v1.7`-`v1.16` (10) + the base workflow's harness-replay job (1) = 11. That same document's section title says the condition "NOW SPANS v1.4-v1.16," and my local replay today confirms **all 13 workflow-groupings (`v1.4`, `v1.4.1`, `v1.5`..`v1.16`) are currently RED**, not just 11. The planner should treat 13 (14 counting `v1.4`/`v1.4.1` as separate harness invocations sharing one workflow file) as the true current scope, with "11" understood as a stale historical citation.

**Primary recommendation:** Scope TOOL-04 as six coordinate-reconciliation tasks (one per distinct pin-set: v1.4, v1.4.1, v1.5-shared, v1.14, v1.15, v1.16), landed in one atomic D-00a-exception commit per D-09, verified against the pin-coordinate-driven check categories only (C2/C7/C9/safetynet) — with the v1.16 fix executed first since it is fully solved and zero-risk, and the older sidecars executed via the `v1.17-audit-allowlist.json`-as-ground-truth matching method demonstrated below. TOOL-05 ships as attestation only (no code) — the O(n) proof and Windows timing evidence are already gathered in this document. TOOL-06 is a 3-line numeric edit across 3 frozen files that MUST land in its own separate D-00a-exception commit, never bundled with TOOL-04.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Sidecar coordinate re-pin (TOOL-04) | Validation tooling (Node scripts, `scripts/validation/*.json`) | CI (GitHub Actions consumes the result) | Pure data-file edit; CI is the consumer/verifier, not the edit surface |
| Single-apex O(n) attestation (TOOL-05) | Validation tooling (`check-phase-128.mjs`, already-shipped) | CI (Linux GHA authoritative; Windows verify-only) | No code lands; the artifact is a written attestation + captured evidence, not a tier |
| stderr slice-budget tuning (TOOL-06) | Validation tooling (3 `check-phase-{48,60,61}.mjs` call sites) | — | Isolated numeric-literal edit inside frozen files; no CI/workflow surface touched |
| DEFER-119-A disposition (auto-resolved) | CI (workflow `continue-on-error` semantics) | Validation tooling (`regenerate-supervision-pins.mjs`, read-only) | The disposition lives in workflow YAML advisory-job config, not in code this phase edits |

This phase touches **zero** browser/frontend/API/database tiers — it is 100% Node.js validation-script + CI-workflow-adjacent data, consistent with the CONTEXT's "no `docs/` content is touched" boundary.

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` in this repository describes a **different, unrelated project** ("Windows Autopilot Troubleshooter & Improvement Suite" — PowerShell/FastAPI/React three-tier diagnostic toolkit). None of its directives (PowerShell module conventions, FastAPI endpoint patterns, MSAL/Graph auth, pytest/Vitest commands) apply to this phase's actual domain, which is the Node.js `scripts/validation/` chain-validator/audit-harness tooling for a docs-library GSD project. No CLAUDE.md directive constrains or conflicts with this phase's work; the planner does not need to reconcile anything from it. (Flagging the mismatch here so it isn't silently ignored.)

## TOOL-04: Frozen Sidecar Re-Pin

### Root cause, precisely

A single frontmatter line (`phase_46_wave2_retrofit: 2026-04-25`, immediately before the closing `---`) was deleted from exactly 5 files as part of a v1.17-era hygiene fix ("HYG-02", commit referenced as `7dda1f7` in `v1.17-audit-allowlist.json` reason strings), shifting every line below it in those 5 files by **-1**:

- `docs/_glossary-android.md`
- `docs/reference/android-capability-matrix.md`
- `docs/admin-setup-android/03-fully-managed-cobo.md`
- `docs/android-lifecycle/03-android-version-matrix.md`
- `docs/admin-setup-android/04-byod-work-profile.md` (0 line-pins in any sidecar — count-based tracker only, unaffected)

This was diagnosed and fixed for `v1.17-audit-allowlist.json` itself during v1.17's own close (Phase 128, Plan 128-01/128-02) — full diff proof exists at `.planning/milestones/v1.17-phases/128-.../128-01-SUMMARY.md` lines 147-225 (git diff `3dd2512..HEAD` over the 5 files shows exactly one frontmatter-line deletion per file, nothing else). **What Phase 128 did NOT do:** reconcile the same -1 shift into the 12 OLDER frozen sidecars (`v1.4` through `v1.16`), which still carry their own pre-shift line numbers for whatever subset of pins they happen to have in those 4 files. That reconciliation is TOOL-04's job.

### `regenerate-supervision-pins.mjs` is NOT a general-purpose tool here

`scripts/validation/regenerate-supervision-pins.mjs --report` / `--emit-stubs` / `--self-test` **hardcode** `scripts/validation/v1.7-audit-allowlist.json` as the sidecar to compare against (lines 290 and 336 of the script — confirmed by direct read). It has no `--sidecar` flag and cannot be pointed at any other sidecar file. Running `--report` today shows: **20 pinned, 20 stale (100%)** against `v1.7` — i.e. the helper is only useful for diagnosing `v1.7`'s drift, and even there its output is an advisory diff (line numbers with no supervision hit), not a set of corrected coordinates. It is **frozen** (do not edit — CONTEXT explicitly excludes it from this phase's edit surface) and is not the mechanical source for the other 12 sidecars. Full `--report` output is captured in the Ground-Truth Data appendix below.

### The real mechanical source: `v1.17-audit-allowlist.json` as ground truth

Verified via `git log --oneline a96f3b7..HEAD -- <8 Android/Linux files>` → **zero commits**. None of the files these sidecars pin against have changed since the v1.17 close-gate SHA (`a96f3b7687b3ef8092599500097e9b0613dfa6cd`). This means `v1.17-audit-allowlist.json`'s current line numbers ARE today's live-tree-correct coordinates for every pinned occurrence category (supervision, c7_knox, c9, safetynet) in those files, right now, with zero staleness risk from this milestone's own content work (Phases 129-132 touched only AVD/iPad recipe content, never Android/Linux docs — confirmed by the same git-log check).

Furthermore, `v1.17-audit-allowlist.json`'s `reason` fields **embed a shift audit trail** for most pins — e.g.:
```
"Phase 125 v1.16 EEE-retrofit repoint (was line 51, +14 from EEE header-block + Platform-gate blockquote...): ..."
"Phase 119 repoint (was line 21, +12 from Phase-118 RETRO-03 EEE header-block...): ..."
"Phase 128 HYG-02 repoint (was line 38): -1 from HYG-02 frontmatter-line deletion (commit 7dda1f7). Phase 125 v1.16 EEE-retrofit repoint (was line 18): ..."
```
This lets each older sidecar's pin be matched to its v1.17-current line by cross-referencing the semantic description (the tail of the reason string minus the shift-history preamble), not by blind arithmetic.

### Case 1 — `v1.16` (fully solved, verified, zero-risk)

`v1.16-audit-allowlist.json` and `v1.17-audit-allowlist.json` have **identical pin identity and count** in every line-pinned category (supervision 26=26, c7_knox 10=10, c9 4=4, safetynet 4=4 — verified via JSON diff). The ONLY difference is the 35 pins across the 4 HYG-02-touched files, each exactly -1 from v1.16's value. The complete old→new table (independently re-derived twice — once at Phase 128, once again by this research session cross-checking the raw JSON) is reproduced in the Ground-Truth Data appendix. **This is a pure copy-paste of already-computed, already-verified values.** For the 2 files NOT touched by HYG-02 that v1.16 also pins (`android-lifecycle/00-enrollment-overview.md`, `l2-runbooks/20-android-app-install-investigation.md`), v1.16's existing values (65/67/97 and 33) already match v1.17 exactly — confirmed directly, no change needed.

### Case 2 — `v1.15` (1 file needs a shift, 4 already correct)

`v1.15`'s `android-lifecycle/00-enrollment-overview.md` pins are still at the pre-Phase-125 values (51/53/83) — Phase 125's EEE retrofit (which produced the +14 shift to 65/67/97) landed inside v1.16's own build, after v1.15 froze. `v1.15`'s `20-android-app-install-investigation.md` pin is already at 33 (Phase 119, which predates v1.15's freeze). `v1.15`'s glossary/capability-matrix/cobo/version-matrix pins are single-line (pre-C17-#12-fragmentation, see risk below) at 81/83/183/200/etc. — need full reconciliation against v1.17's now-split pin set, same as v1.14 and the v1.5-set.

### Case 3 — `v1.14` and the shared `v1.5`≡`v1.6`..`v1.13` set (largest remaining effort, same method)

`v1.4`, `v1.4.1` are unique per-sidecar (verified NOT byte-identical to each other or to v1.5's set). `v1.5` through `v1.13` (9 sidecars) share one byte-identical pin set — computing the fix once covers all 9. `v1.14` is its own distinct set (one file, C5/C10 already resolved by then, single line-shift bump for glossary pins vs v1.5's set). None of these sidecars have been touched since their original freeze (Path-A inheritance carries the SAME stale numbers forward unchanged release after release — e.g. `_glossary-android.md:80/82/182/199` appears identically in all of v1.5, v1.6, v1.8, v1.9, v1.10, v1.11, v1.12, v1.13). The reconciliation method is the same as Case 2: match each pin's `reason` text to its semantic counterpart in `v1.17-audit-allowlist.json`, use that line.

### KNOWN RISK — Phase 125 C17 #12 blockquote fragmentation breaks strict count-preservation for pre-v1.16 sidecars

Phase 125 (v1.16's own EEE-retrofit, "C17 #12 word-preserving split") took several **single-line** blockquotes in `_glossary-android.md` and split them into **2-4 physical lines** to satisfy the 200-char top-level-blockquote cap. Example, straight from `v1.17-audit-allowlist.json`'s own reason text:

> "C17 #12 word-preserving split fragmented the old single-line COBO Cross-platform-note blockquote into 3 lines (88/90/92/94); this fragment ... carries 4 of the original line's raw matches. Companion fragment now at line 94 (see next entry) ... same reason as the pre-split v1.15 pin."

This means: a single pin in `v1.4`/`v1.5`/`v1.14`/`v1.15` (pre-fragmentation, one line, one `{file,line}` entry) maps to **2-4 separate lines** in current content, each independently carrying a supervision/Knox/COPE match. The C2/C7/C9 checks scan line-by-line; pinning only ONE of the fragment lines will leave the sibling fragment(s) un-exempted and the check will still FAIL for those specific sidecars, even after a "correct" re-pin of the one line that existed pre-fragmentation. **D-01's "pin count and identity unchanged" mitigation clause did not anticipate this** (it was written assuming the only drift was the single HYG-02 -1 shift). The planner must make an explicit call here: either (a) treat a fragmentation-split as a single semantic "identity" now spanning N pins (a pragmatic, intent-preserving reading of D-01 that increases raw pin COUNT for the affected sidecars while preserving semantic IDENTITY — recommended, since it's the only way to reach a genuinely green C2/C7/C9 for `v1.4`-`v1.15`), or (b) accept that `v1.4`-`v1.15` will remain partially RED on the fragmented lines specifically, and document that residual as within CARVE-1's scope, re-confirming the existing `ACCEPTED-STANDALONE-CI-RED` disposition for just those lines. This is a plan-time decision, not something this research can resolve unilaterally — it does not reopen GA-1 (the re-pin approach stays locked), it only affects how literally "count unchanged" is interpreted for the fragmented subset.

### Non-coordinate failures — do not attempt to fix via re-pin

Local replay (see appendix) shows `v1.4`/`v1.4.1` additionally FAIL:
- **C4** (Android links in deferred shared files) — `docs/common-issues.md` now legitimately contains Android content; v1.4's "deferred" file list predates Android's own GA. Not a coordinate problem.
- **C5** (frontmatter freshness `last_verified`) — genuine content-age staleness, unrelated to line pins.

And `v1.5`-`v1.13` additionally FAIL:
- **C10** (Linux frontmatter freshness) — same category as C5, different platform scope.

These are exactly the class of failure `ACCEPTED-STANDALONE-CI-RED` (confirmed still on file, `v1.17-DEFERRED-CLEANUP.md`) and CARVE-1 describe: the frozen harness validates against an evolved corpus using rules that no longer make sense. TOOL-04's "made green" success criterion should be scoped to the pin-coordinate-driven checks only (C2, C7, C9, and safetynet where present); the plan should explicitly re-confirm (not newly decide) that any remaining C4/C5/C10 RED on the oldest sidecars is pre-existing carried debt, not new TOOL-04 scope, and cite the existing `ACCEPTED-STANDALONE-CI-RED` disposition rather than inventing a new one (D-03 rejected re-dispositioning the coordinate problem, not re-confirming an already-accepted unrelated one).

### Verification path

**Local (Windows), per sidecar, after re-pinning:**
```bash
node scripts/validation/v1.<X>-milestone-audit.mjs --verbose
```
Exit 0 with zero C2/C7/C9/safetynet failures = success for that sidecar. (C4/C5/C10 residuals on the oldest sidecars are expected per above — do not chase them in this phase.)

**Linux GHA (authoritative per D-03):** each workflow's `harness-run` job runs one of the following (`actions/checkout@v4`, no `ref:` — checks out live HEAD, confirming the CARVE-1 tautology-avoidance point below):

| Workflow | Command |
|---|---|
| `audit-harness-integrity.yml` (base) | `node scripts/validation/v1.4-milestone-audit.mjs --verbose` AND `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (same job, 2 steps) |
| `audit-harness-v1.5-integrity.yml` | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| `audit-harness-v1.6-integrity.yml` | `node scripts/validation/v1.6-milestone-audit.mjs --verbose` |
| `audit-harness-v1.7-integrity.yml` | `node scripts/validation/v1.7-milestone-audit.mjs --verbose` |
| `audit-harness-v1.8-integrity.yml` | `node scripts/validation/v1.8-milestone-audit.mjs --verbose` |
| `audit-harness-v1.9-integrity.yml` | `node scripts/validation/v1.9-milestone-audit.mjs --verbose` |
| `audit-harness-v1.10-integrity.yml` | `node scripts/validation/v1.10-milestone-audit.mjs --verbose` |
| `audit-harness-v1.11-integrity.yml` | `node scripts/validation/v1.11-milestone-audit.mjs --verbose` |
| `audit-harness-v1.12-integrity.yml` | `node scripts/validation/v1.12-milestone-audit.mjs --verbose` |
| `audit-harness-v1.13-integrity.yml` | `node scripts/validation/v1.13-milestone-audit.mjs --verbose` |
| `audit-harness-v1.14-integrity.yml` | `node scripts/validation/v1.14-milestone-audit.mjs --verbose` |
| `audit-harness-v1.15-integrity.yml` | `node scripts/validation/v1.15-milestone-audit.mjs --verbose` |
| `audit-harness-v1.16-integrity.yml` | `node scripts/validation/v1.16-milestone-audit.mjs --verbose` |

(`audit-harness-v1.17-integrity.yml` already passes today — not predecessor debt, excluded from TOOL-04's target set.)

**The "11" inventory, precisely:** per `v1.17-DEFERRED-CLEANUP.md`'s `ACCEPTED-STANDALONE-CI-RED` entry, the officially-cited 11 = {`v1.7`,`v1.8`,`v1.9`,`v1.10`,`v1.11`,`v1.12`,`v1.13`,`v1.14`,`v1.15`,`v1.16`} (10 workflows) + base workflow's harness-replay job (1, covering both v1.4 and v1.4.1 in one job). **Ground truth today (this session) shows `v1.5` and `v1.6` are ALSO currently RED** (same doc's section title already says "NOW SPANS v1.4-v1.16") — meaning the true current target set is 13 workflow files / 14 individual harness invocations. Recommend the plan's acceptance criteria enumerate all 13 workflow files explicitly rather than trusting the stale "11" figure.

## TOOL-05: Single-Apex O(n) Verification + Attestation

**No code lands for this requirement** (D-06/D-07 locked). The work is: (1) attest, with concrete evidence, that `check-phase-128.mjs` already delivers single-apex O(n) behavior under `CHECK_PHASE_NESTED=1`; (2) run and record a Windows cold-clone verification.

### The O(n) mechanism, read directly from `check-phase-128.mjs`

- `CHAIN_PHASES` (lines 58-62) is a flat array of exactly 80 integers, `48..127` — each phase number appears exactly once (no duplicates, no self-reference; enforced at module-load time by throw-on-drift assertions at lines 70-75).
- For each `phaseNum`, the check `run()` (lines 102-136) does: if `CHECK_PHASE_NESTED === '1'` in the CURRENT process's env, return `skipped` immediately (line 108-110) — **no subprocess spawn at all**. Otherwise, spawn `node scripts/validation/check-phase-{phaseNum}.mjs` exactly once, with `subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' }` (line 117) — i.e., **the child always receives the NESTED flag**, regardless of whether the parent itself was nested.
- The `V-128-AUDIT-HARNESS` check (lines 138-161) carries the identical guard: `if (NESTED) return skipped` (line 146-148), preventing the frozen `v1.17-milestone-audit.mjs` from being re-run against a possibly-evolved corpus when invoked as a nested child.
- Net effect: a **top-level, non-nested** invocation of `check-phase-128.mjs` performs exactly 80 direct child spawns (one per `CHAIN_PHASES` entry) + 1 audit-harness spawn = 81 subprocess spawns total. Each of those 80 children, having received `CHECK_PHASE_NESTED=1`, immediately short-circuits its OWN chain-loop and audit-harness-rerun checks (verified the same guard pattern exists in `check-phase-{48,60,61,67,95,100,112,119,125}.mjs` — all reference `CHECK_PHASE_NESTED` 3-6 times each). **No child re-spawns its own predecessor chain.** This is the O(n) collapse: total subprocess count = O(depth) = 81, not O(depth²) (which an un-guarded design would produce, since check-phase-127 would otherwise spawn check-phase-126..48, which would each spawn their own sub-chains, etc.).
- The peer/non-peer split (`isPeer = phaseNum >= 67`, line 115) only affects subprocess **timeout** (600s vs 300s), not spawn count — irrelevant to the O(n) claim itself, worth noting in the attestation so it isn't mistaken for a second optimization axis.

### Windows evidence captured this session

Local (non-fresh-clone, current working tree) run of `node scripts/validation/check-phase-128.mjs` (no `--verbose`, non-nested):
```
real  0m14.888s
...
Result: 82 PASS, 0 FAIL, 1 SKIPPED
```
82 checks = 80 CHAIN + AUDIT-HARNESS + SELF (AUDIT itself was skip-passed, the 128-VERIFICATION.md-not-yet-authored case). ~15s wall-clock for 80 real subprocess spawns (~186ms/spawn average) is consistent with linear, not quadratic, scaling — if this were O(n²) the 80th child would itself be spawning ~79 more children (and those spawning further children), which would push wall-clock into minutes, not seconds. This is real, reproducible, Windows-local evidence the plan can cite; a genuine "cold clone" run (`git clone --no-hardlinks` to a scratch dir, then the same command) would strengthen it further and should be the literal acceptance step — recommend: `git clone --no-hardlinks . <scratch>/cold-133 && cd <scratch>/cold-133 && node scripts/validation/check-phase-128.mjs` and capture the same PASS/FAIL/timing tuple.

### DUAL-APEX note (relevant boundary, do not disturb)

Every predecessor workflow's `linux-chain-ubuntu-latest` job explicitly runs the apex validator WITHOUT `CHECK_PHASE_NESTED=1` at the top-level GHA invocation (workflow comment in `audit-harness-v1.16-integrity.yml`: *"DUAL-APEX (Pitfall 6, D-125-4): the standalone check-phase-125 job AND linux-chain-ubuntu-latest BOTH run the full apex recursion 48..124. This is intentional and audited — do NOT deduplicate, and do NOT add CHECK_PHASE_NESTED=1 to either top-level GHA invocation."*). TOOL-05's attestation should explicitly note this is unaffected by the phase's work — the O(n) collapse only applies WITHIN a single top-level run's recursive descent, not across the two independent top-level jobs.

### Next apex boundary

`check-phase-129.mjs` (the next chain apex, extending to `[48..128]`) does not exist yet — it is Phase 134/HARN-12's deliverable. There is no legal non-frozen apex file to touch in Phase 133; the attestation is written against the CURRENT frozen apex (`check-phase-128.mjs`), which is allowed to be *read* (not edited) per the canonical_refs.

## TOOL-06: `HELPER-SPAWN-STDERR-01` Slice-Budget Tuning

### Exact sites (all 3 confirmed)

| File | Line | Current call |
|---|---|---|
| `scripts/validation/check-phase-48.mjs` | 85 | `execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })` |
| `scripts/validation/check-phase-60.mjs` | 201 | `execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })` |
| `scripts/validation/check-phase-61.mjs` | 397 | `execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })` |

All 3 are the `--self-test` catch-block sites, all currently `n: 200`. (`check-phase-60.mjs` and `check-phase-61.mjs` each have 2 additional `execFailDetail` call sites at `n: 500` for their CHAIN/harness checks — those are NOT part of the 3-site HELPER-SPAWN-STDERR-01 scope; do not touch them.)

### History / why this is a "nit," not a bug

`HELPER-SPAWN-STDERR-01`'s **core** bug (these 3 `--self-test` catch blocks originally captured `stderr.slice(0, 200)` only, silently dropping `stdout` from the failure detail entirely) was already fixed by v1.14's TOOL-03 (Phase 111, Plan 111-01) — confirmed via that plan's task/verification text: all 3 sites were converted to `execFailDetail(stdout, stderr, {...})`, correctly capturing both streams. What remains, carried unresolved since v1.8 through v1.17 (`v1.17-DEFERRED-CLEANUP.md`: *"core resolved by v1.14 TOOL-03. DEFERRED to v1.18+ chain-validator retrospective."*), is purely the **numeric budget** — whether 200 chars is enough to show a useful failure excerpt in practice. This phase's only job is picking a better `n` value; per CONTEXT, the exact number is Claude's discretion (no locked value).

### `execFailDetail` itself is a SHARED lib — do not touch its definition

`scripts/validation/_lib/exec-fail-detail.mjs` exports `execFailDetail(stdout, stderr, {n, trim, prefix})` and is imported (not copied) by at least `check-phase-{48,60,61,128}.mjs` and others across the chain (per v1.14 Phase 111's own audit: "40 sites across 20 files" consume it). TOOL-06's blast radius must be limited to the 3 **call-site** `{n: ...}` literals — editing the shared function itself would ripple into every one of those 20 files' behavior, which is explicitly out of scope.

### Frozen-surface status — confirmed, must be flagged prominently

`check-phase-48.mjs`, `check-phase-60.mjs`, and `check-phase-61.mjs` are all inside `check-phase-128.mjs`'s `CHAIN_PHASES = [48..127]` array — i.e. they are frozen predecessor validators under D-00a, exactly like the TOOL-04 sidecars. **Editing them requires its own D-00a exception**, and per GA-4/D-09 this MUST be a commit separate from the TOOL-04 re-pin commit (D-09 explicitly: "The commit contains only re-pin coords — no TOOL-05 verification files, no TOOL-06 stderr tuning"). See the dedicated section below for the full commit-scoping recommendation.

## DEFER-119-A Mechanics

Confirmed across the base workflow and all 12 versioned predecessor workflows (spot-checked `v1.5`, `v1.9`, `v1.16`, `v1.17` — identical pattern in each):

- Job `pin-helper-advisory`, `continue-on-error: true` — e.g. `audit-harness-v1.16-integrity.yml:219` (`# Phase 43 D-14 / Phase 48 D-22: advisory only; never fails build`).
- The `--report` step wraps its invocation with `|| true`.
- The `--self-test` step (e.g. `audit-harness-v1.16-integrity.yml:228-231`) runs `node scripts/validation/regenerate-supervision-pins.mjs --self-test || echo "[advisory] --self-test failed; advisory only"` — non-blocking regardless of exit code.
- `v1.17-DEFERRED-CLEANUP.md`'s `DEFER-119-A` entry (still current) explicitly attributes the `--self-test` RED to "the SAME concrete root cause" as `FROZEN-AWARE-ADOPTION-SWEEP-01` (i.e. the v1.7 sidecar's stale coordinates vs. hardcoded `BASELINE_9`), and states the disposition is **ACCEPTED advisory-RED**, "CARRIED from v1.16/v1.15/v1.14. Not a blocker."

**Confirmed:** no independent TOOL-06/DEFER-119-A action is needed beyond what D-05 already states in writing. Since the `pin-helper-advisory` job is `continue-on-error: true` and BOTH its steps are wrapped non-blocking regardless of outcome, re-pinning `v1.7-audit-allowlist.json`'s coordinates as part of TOOL-04's general fix (if the planner chooses to include `v1.7` in the re-pin batch — it's part of the `v1.5`-`v1.13` shared set) may incidentally change `--self-test`'s pass/fail outcome, but **it cannot change whether the job blocks the build**, because it structurally never can. The plan should state D-05's outcome in writing (as CONTEXT mandates) rather than re-litigate it.

## Frozen-Surface / D-00a Commit-Scoping

Three distinct edit surfaces, three distinct D-00a-exception considerations:

| Edit target | Frozen? | Commit | Rationale |
|---|---|---|---|
| `scripts/validation/v1.4-audit-allowlist.json` … `v1.16-audit-allowlist.json` (`{file,line}` pin coordinates only) | Yes (D-00a data sidecar) | **Commit A** — TOOL-04, atomic, `D-00a-EXCEPTION: TOOL-04 re-pin, coordinate-only (pin count/identity unchanged)` per D-09 | Locked by D-09: bounded, single commit, attested, contains ONLY re-pin coords |
| `scripts/validation/check-phase-48.mjs`, `check-phase-60.mjs`, `check-phase-61.mjs` (3 `execFailDetail({n:...})` call sites) | **Yes** — all 3 are inside the frozen `[48..127]` chain-apex range | **Commit B** — TOOL-06, separate, its own `D-00a-EXCEPTION: TOOL-06 stderr slice-budget tuning, 3 call sites` attestation | D-09 explicitly excludes TOOL-06 from the TOOL-04 commit; this is a SEPARATE frozen-surface exception, not bundled |
| Nothing (TOOL-05 ships as attestation prose + captured command output, no code) | N/A | **No commit needed for code** — the attestation can land in the phase's own `133-VERIFICATION.md` / plan artifacts, or a non-frozen doc | `check-phase-128.mjs` is read-only for this phase; no legal non-frozen apex exists to edit |

**Recommendation:** author Commit A and Commit B as two separate, small, git commits (not necessarily separate PLAN.md waves, but definitely separate `git commit` invocations with distinct D-00a-exception attestation lines), in either order, both landing before Phase 134's HARN-12 predecessor-byte-unchanged audit runs. This keeps each frozen-surface exception independently reviewable and rollback-safe, matching the precedent set by `128-01-SUMMARY.md`'s own "Atom 1 (allowlist) / Atom 2 (validator conversions)" separation for a structurally similar problem.

**Files this phase must NOT touch under any circumstance** (explicit frozen-read-only list, cross-checked against CONTEXT's canonical_refs and confirmed live):
- `scripts/validation/regenerate-supervision-pins.mjs` (D-02: no `readAtClose` conversion; read via `--report` only)
- `scripts/validation/check-phase-128.mjs` (read for TOOL-05 evidence only)
- `scripts/validation/_lib/frozen-at-close.mjs` (not consumed this phase — CARVE-1 substrate, deliberately unused)
- `scripts/validation/_lib/exec-fail-detail.mjs` (shared function definition — only its 3 CALL SITES in check-phase-{48,60,61}.mjs change, never the function itself)
- `.github/workflows/audit-harness-v1.N-integrity.yml` (any of them — D-04 rejects the workflow-layer checkout fix)
- Any `docs/**` file (phase boundary: purely internal tooling/CI, per CONTEXT `<domain>`)

## Common Pitfalls

### Pitfall 1: Treating "HYG-02 -1 shift" as literally applicable to all 13 sidecars
**What goes wrong:** Blindly subtracting 1 from every pin in every old sidecar produces wrong coordinates for `v1.4` through `v1.15` (their drift is unrelated growth/restructuring, not the HYG-02 event, which only affects the v1.16→v1.17 boundary).
**Why it happens:** The requirement text's parenthetical "(HYG-02 −1 line-shift root cause)" reads as a single global root cause; it is actually the root cause for exactly one of the six reconciliation cases.
**How to avoid:** Use `v1.17-audit-allowlist.json`'s reason-field shift history + `git log` (confirmed zero-diff since v1.17 close) as the ground truth per sidecar, not arithmetic.
**Warning signs:** A sidecar's line count for a "-1'd" pin doesn't land on an actual supervision/Knox/COPE occurrence in the live file — that's the tell the -1-only approach failed for that sidecar.

### Pitfall 2: C17 #12 fragmentation silently breaking "pin count unchanged"
**What goes wrong:** A pre-Phase-125 sidecar's single blockquote pin is repointed to ONE of 2-4 post-fragmentation lines; the sibling fragment lines remain unpinned and C2/C7 still FAILs for that sidecar.
**Why it happens:** D-01's mitigation clause was written before this fragmentation detail was discovered (this research session found it).
**How to avoid:** Flag at plan time (see risk note in TOOL-04 section above) and get an explicit call on whether fragmented identities may expand pin count.
**Warning signs:** Re-pinning a sidecar per the "match by reason text" method still leaves a non-zero un-exempted count after the fix — check whether the file in question was touched by the Phase 125 C17 #12 retrofit.

### Pitfall 3: Conflating TOOL-04's "made green" with 100% harness exit-0
**What goes wrong:** Chasing C4/C5/C10 failures on `v1.4`-`v1.13` as if they were TOOL-04 bugs; they are unrelated, pre-existing, already-`ACCEPTED-STANDALONE-CI-RED` debt.
**Why it happens:** A harness's overall exit code doesn't distinguish "coordinate drift" failures from "corpus evolved past this frozen rule" failures.
**How to avoid:** Scope acceptance criteria to specific check IDs (C2/C7/C9/safetynet), not overall exit code, for the oldest sidecars.
**Warning signs:** A sidecar still exits 1 after a correct re-pin — check WHICH check ID is failing before assuming the re-pin was wrong.

### Pitfall 4: Bundling TOOL-06 into the TOOL-04 commit
**What goes wrong:** Violates D-09's explicit atomicity/scoping mandate and muddies Phase 134's HARN-12 byte-unchanged-except-scoped-remediation audit (two unrelated frozen-surface exceptions in one diff).
**Why it happens:** Both are small, both are D-00a exceptions, easy to merge for convenience.
**How to avoid:** Two separate commits, two separate `D-00a-EXCEPTION:` attestation lines, as scoped in the Frozen-Surface section above.
**Warning signs:** A single commit's diff touches both a `*-audit-allowlist.json` file AND a `check-phase-{48,60,61}.mjs` file.

## Ground-Truth Data Appendix

### A. Full `regenerate-supervision-pins.mjs --report` output (captured this session, against its hardcoded `v1.7-audit-allowlist.json` target)

```
=== supervision pin report ===
Pinned (in sidecar): 20
Un-pinned Tier-1 (stub-eligible): 25
Un-pinned Tier-2 (suspected regression): 1
Stale pins (line now has no supervision hit): 20

Tier-2 suspected regressions (human review required; NEVER auto-pinned):
  docs/_glossary-android.md:145 — ### Supervision

Stale pins (line no longer contains supervision occurrence):
  docs/_glossary-android.md:80
  docs/_glossary-android.md:82
  docs/_glossary-android.md:182
  docs/_glossary-android.md:199
  docs/android-lifecycle/00-enrollment-overview.md:51
  docs/android-lifecycle/00-enrollment-overview.md:53
  docs/android-lifecycle/00-enrollment-overview.md:83
  docs/admin-setup-android/03-fully-managed-cobo.md:36
  docs/l2-runbooks/20-android-app-install-investigation.md:21
  docs/_glossary-android.md:17
  docs/_glossary-android.md:50
  docs/_glossary-android.md:70
  docs/_glossary-android.md:83
  docs/_glossary-android.md:196
  docs/reference/android-capability-matrix.md:88
  docs/reference/android-capability-matrix.md:90
  docs/reference/android-capability-matrix.md:91
  docs/reference/android-capability-matrix.md:93
  docs/reference/android-capability-matrix.md:97
  docs/reference/android-capability-matrix.md:98
```
(25 Tier-1 un-pinned occurrences also printed but omitted here — all are legitimate current cross-platform-context supervision mentions not yet in the v1.7 sidecar; not directly relevant to TOOL-04's re-pin, since v1.7's own pin COUNT stays unchanged per D-01.) All 20/20 v1.7 pins are stale — 100% drift, confirming `v1.7`'s sidecar needs full reconciliation, not a spot-fix.

### B. `v1.16` → current (`v1.17`) — complete, verified 35-pin re-pin table

Source: `.planning/milestones/v1.17-phases/128-.../128-01-SUMMARY.md` (independently derived twice at Phase 128; cross-verified against raw `v1.16-audit-allowlist.json` / `v1.17-audit-allowlist.json` JSON this session — exact match).

**`docs/_glossary-android.md` (21 pins):** 38→37, 90→89, 94→93, 126→125, 128→127, 130→129, 132→131, 146→145, 148→147, 152→151, 187→186, 202→201, 219→218, 221→220 (×2, duplicate line carries 2 distinct pins), 225→224, 304→303, 331→330, 333→332, 334→333, 338→337

**`docs/reference/android-capability-matrix.md` (8 pins):** 75→74, 123→122, 125→124, 126→125, 128→127, 130→129, 134→133, 135→134

**`docs/admin-setup-android/03-fully-managed-cobo.md` (3 pins):** 52→51, 54→53, 199→198

**`docs/android-lifecycle/03-android-version-matrix.md` (3 pins):** 58→57, 102→101, 104→103

**`docs/admin-setup-android/04-byod-work-profile.md` (0 pins):** no line-pinned entries in any sidecar for this file — unaffected.

Total: 35 pins, all shifted exactly -1, `reason` field text preserved unchanged (only `line` value moves), per D-01.

### C. Pin-set identity map across all 15 sidecars (this session's JSON diff)

| Sidecar | supervision | c7_knox | c9 | safetynet | Identity group |
|---|---|---|---|---|---|
| v1.4 | 18 | 0 | 0 | 4 | unique |
| v1.4.1 | 18 | 0 | 0 | 4 | unique (NOT identical to v1.4 — verified) |
| v1.5 | 20 | 10 | 4 | 4 | **Group S** (byte-identical to v1.6, v1.7, v1.8, v1.9, v1.10, v1.11, v1.12, v1.13) |
| v1.6 | 20 | 10 | 4 | 4 | Group S |
| v1.7 | 20 | 10 | 4 | 4 | Group S |
| v1.8 | 20 | 10 | 4 | 4 | Group S |
| v1.9 | 20 | 10 | 4 | 4 | Group S |
| v1.10 | 20 | 10 | 4 | 4 | Group S |
| v1.11 | 20 | 10 | 4 | 4 | Group S |
| v1.12 | 20 | 10 | 4 | 4 | Group S |
| v1.13 | 20 | 10 | 4 | 4 | Group S |
| v1.14 | 20 | 10 | 4 | 4 | unique (1-line bump vs Group S) |
| v1.15 | 22 | 10 | 4 | 4 | unique (partial post-Phase-119 update) |
| v1.16 | 26 | 10 | 4 | 4 | unique — **fully solved, see Appendix B** |
| v1.17 | 26 | 10 | 4 | 4 | current / ground truth |

**Reconciliation effort implied:** 6 distinct coordinate problems (v1.4, v1.4.1, Group S × 1 computation, v1.14, v1.15, v1.16), not 13.

### D. Local harness replay results (this session, Windows, current working tree, non-CI)

| Sidecar | Exit | Checks failing (beyond pin categories) | Pin-category checks failing |
|---|---|---|---|
| v1.4 | 1 | C4 (Android links in deferred files), C5 (freshness) | C2 (51 un-exempted) |
| v1.4.1 | 1 | C4, C5 | C2 (51 un-exempted) |
| v1.5 | 1 | C5, C10 | C2 (51), C7 (10 bare Knox), C9 (4 COPE) |
| v1.6 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.7 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.8 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.9 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.10 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.11 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.12 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.13 | 1 | C5, C10 | C2 (51), C7 (10), C9 (4) |
| v1.14 | 1 | none | C2 (51), C7 (10), C9 (4) |
| v1.15 | 1 | none | C2 (42), C7 (5), C9 (4) |
| v1.16 | 1 | none | C2 (33), C7 (5), C9 (4) |
| v1.17 | **0** | — | — (all green, current baseline) |

Un-exempted counts shrink from v1.4→v1.16 (51→33) not because content shrank, but because each sidecar's OWN pin count grew over time (v1.4: 18 supervision pins; v1.17: 26) — the harness always scans the SAME current live file; more pins = fewer un-exempted matches, regardless of whether those pins' `line` values are individually correct or stale in a way that happens to still land on a real occurrence.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The recommended interpretation of "pin count unchanged" under C17 #12 fragmentation (treat a split as one semantic identity spanning N pins) is the right call | TOOL-04, Pitfall 2 | If the planner/user instead chooses interpretation (b) (accept partial residual RED), fewer sidecars reach full green and more `ACCEPTED-STANDALONE-CI-RED` re-confirmation language is needed in the plan — not a blocking risk, just a scope-size difference |
| A2 | `v1.17-audit-allowlist.json` is safe to use as the ground-truth "current correct line" source for all older sidecars | TOOL-04 | Verified via `git log` (zero diff since v1.17 close) — LOW risk, this is directly confirmed, not assumed |

No other claims in this document are unverified — all TOOL-05/TOOL-06/DEFER-119-A findings are grounded in direct code reads, direct JSON diffs, direct git-log queries, and a direct local harness run captured this session.

## Open Questions (RESOLVED)

1. **Exact per-pin coordinates for `v1.4`, `v1.4.1`, Group S (`v1.5`-`v1.13`), and `v1.14`/`v1.15`'s remaining files**
   - What we know: the method (match `reason` text against `v1.17-audit-allowlist.json`'s current pins; `v1.16`'s case is fully solved as a worked example) and the exact scope (which files, how many pins per sidecar, per Appendix C).
   - What's unclear: the literal old→new line table for these ~5 remaining reconciliation targets was not hand-computed pin-by-pin in this research session (time-boxed; `v1.16` was solved and verified as the reference case, and the C17 #12 fragmentation risk was surfaced from the v1.17 reason-text evidence rather than resolved).
   - Recommendation: scope a dedicated plan task (or Wave 0 recon step, mirroring Phase 128's own Plan 128-01 "recon-only, eliminates remaining discovery for Atom 1/2" pattern) to walk each of the ~65 remaining pins (18+18+20+~2 unique to v1.14+~4 unique to v1.15) against `v1.17-audit-allowlist.json` using the reason-text-matching method demonstrated here, before authoring the atomic re-pin commit.
   - RESOLVED: Plan 133-01 Tasks 1-2 produce the full coordinate table before any edit.

2. **Whether TOOL-04's "made green" success criterion should be written per-check-category or per-workflow-exit-code**
   - What we know: a per-workflow-exit-code reading cannot be satisfied for `v1.4`/`v1.4.1` (C4/C5) or `v1.5`-`v1.13` (C10) without touching non-coordinate content, which is out of scope.
   - What's unclear: whether the plan should explicitly amend/narrow SC#1's wording, or just document the category-scoped interpretation in the plan's acceptance criteria without touching REQUIREMENTS.md wording.
   - Recommendation: narrow at plan-acceptance-criteria level (not by editing the locked requirement text), citing this research's Appendix D as the evidence base.
   - RESOLVED: Plan 133-02 must_haves/acceptance_criteria scope 'made green' to C2/C7/C9/safetynet per-category; pre-existing C4/C5/C10 stays ACCEPTED-STANDALONE-CI-RED.

## Environment Availability

Not applicable — this phase has no external tool/service/runtime dependencies beyond `node` (already required and present, confirmed by every command executed in this research session) and `git` (already required and present). No fallback planning needed.

## Security Domain

Not applicable. This phase edits JSON sidecar coordinate data and numeric literals inside Node.js validation scripts; it touches zero authentication, session, access-control, input-validation-from-untrusted-source, or cryptography surfaces. No ASVS category applies.

## Sources

### Primary (HIGH confidence — direct code/data reads and command execution, this session)
- `scripts/validation/regenerate-supervision-pins.mjs` — full read; confirmed hardcoded `v1.7-audit-allowlist.json` target (lines 290, 336)
- `node scripts/validation/regenerate-supervision-pins.mjs --report` — executed this session, full output in Appendix A
- `scripts/validation/v1.4-audit-allowlist.json` through `v1.17-audit-allowlist.json` (all 15) — read/diffed via Node scripts this session
- `scripts/validation/check-phase-128.mjs` — full read; O(n) mechanism traced line-by-line
- `node scripts/validation/check-phase-128.mjs` — executed this session, timing/PASS evidence in TOOL-05
- `node scripts/validation/v1.<X>-milestone-audit.mjs --verbose` (all 15) — executed this session, full replay results in Appendix D
- `scripts/validation/check-phase-{48,60,61}.mjs` — full header + `execFailDetail` call sites read
- `.github/workflows/audit-harness-integrity.yml` + all 13 versioned siblings — read for checkout/harness-run/pin-helper-advisory job structure
- `git log --oneline a96f3b7..HEAD -- <8 files>` — executed this session, zero-commit result confirming v1.17-sidecar-as-ground-truth assumption

### Secondary (MEDIUM confidence — prior-milestone planning artifacts, cross-verified against live code)
- `.planning/milestones/v1.17-phases/128-.../128-01-SUMMARY.md` — 35-pin worklist table, cross-verified against raw JSON this session (exact match)
- `.planning/milestones/v1.17-DEFERRED-CLEANUP.md` — `ACCEPTED-STANDALONE-CI-RED`, `DEFER-119-A`, `O(n²)-CHAIN-RUNNER-REMEDIATION-01` current dispositions
- `.planning/RETROSPECTIVE.md` — v1.17 "35-pin −1 line-shift landmine" retrospective entry, cross-verified
- `.planning/milestones/v1.14-phases/111-.../111-01-PLAN.md` — TOOL-03's original fix of the 3 HELPER-SPAWN-STDERR-01 sites, cross-verified against current file state (matches exactly: `n:200` at the 3 self-test sites)

### Tertiary (LOW confidence)
- None — every claim in this document traces to a direct read, direct diff, or direct command execution performed this session, or a prior-milestone document cross-verified against live code.

## Metadata

**Confidence breakdown:**
- TOOL-04 mechanism/root-cause/v1.16 case: HIGH — fully verified via direct JSON diff, git log, and prior-phase documented proof
- TOOL-04 exact coordinates for v1.4/v1.4.1/Group-S/v1.14/v1.15: MEDIUM — method proven, full pin-by-pin table not hand-computed (Open Question 1)
- TOOL-05: HIGH — mechanism traced directly in source, evidence captured via direct execution
- TOOL-06: HIGH — exact sites, history, and frozen-surface status all directly confirmed
- DEFER-119-A: HIGH — workflow YAML directly read and cross-verified across 4 representative versions

**Research date:** 2026-07-19
**Valid until:** Effectively permanent for the mechanism/methodology sections (code-derived); the exact pin coordinates in Appendix B/C are valid only as long as no commit touches the 8 named Android/Linux files before TOOL-04 lands — re-verify with the same `git log` check immediately before executing the re-pin commit.

## RESEARCH COMPLETE
