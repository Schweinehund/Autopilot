# Phase 134: V117 Pin + 16th Path-A Lineage Bump + Terminal Close - Research

**Researched:** 2026-07-19
**Domain:** Internal validator-chain/CI tooling (harness lineage bump + milestone close-gate). No new libraries, no `docs/` content, no external packages.
**Confidence:** HIGH (every claim below is either a command actually run against this repo, or a byte-for-byte read of a template file that Phase 134 will copy-forward)

## Summary

Phase 134 is the mechanical terminal close of v1.18, structurally identical to phases 100/112/119/125/128. There is nothing to "design" — the shape is fully determined by precedent, and the only real work is (a) recovering the correct V117 SHA, (b) authoring 6 new lightweight `check-phase-*.mjs` validators + the 16th Path-A harness + 15th CI workflow, (c) running the 3-axis re-audit, and (d) authoring the single close-gate commit.

Two things in this research materially change what the planner should do versus naively copying the immediately-prior phase (128) as a template:

1. **A real, empirically-confirmed bug exists in the `resolveArchivedPhasePath` milestoneRoots token used by check-phase-119/125/128** (all three pass the WRONG — off-by-one, predecessor-milestone — root). This is FROZEN and must NOT be touched, but the new apex (`check-phase-134`) must NOT copy the bug forward — it must use the objectively correct token, verified below.
2. **Phase 133's TOOL-06 work landed a second sanctioned frozen-surface exception** beyond the TOOL-04 re-pin (`check-phase-60.mjs` / `check-phase-61.mjs` stderr-budget bump), plus a reverted no-op on `check-phase-48.mjs`. HARN-12's "byte-unchanged except TOOL-04" wording is narrower than the actual diff footprint the close-gate must attest to — the planner needs to enumerate both exceptions, not just one.

**Primary recommendation:** Copy `check-phase-128.mjs` verbatim as the apex template for `check-phase-134.mjs` (chain `[48..133]`, 86 entries), copy `check-phase-126.mjs`/`127.mjs` as the lightweight template for `check-phase-129..133.mjs` (no chain, no AUDIT-HARNESS, needle-based only), copy `v1.17-milestone-audit.mjs` + its allowlist + `audit-harness-v1.17-integrity.yml` as Path-A templates, and use `128-v116-pin...` (`.planning/milestones/v1.17-phases/128-.../128-MILESTONE-AUDIT` narrative + `v1.17-DEFERRED-CLEANUP.md`) as the literal prose template for the two close-gate docs.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**GA-1 — Windows deep-nest axis → Option B (advisory).** D-01: The Windows fresh-clone deep-nest axis is ADVISORY with a documented, D-03-sanctioned accepted-timeout. Linux GHA (authoritative for BOTH chain validators per D-03) + a zero-context subagent carry the authoritative verdict. WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 "deepens again" this milestone (now [48..133], hitting both chain validators) — known recurring platform timeout, not a close-blocker. Reject Option A (mandatory-PASS — converts a known recurring win32 timeout into a hard close-blocker, contradicts D-03, forces a frozen apex/harness timeout edit). Reject Option C (Windows shallow run — `CHECK_PHASE_NESTED=1` skips chain AND audit-harness re-run, no clean lever without a frozen edit). Mandatory guardrails: document the win32 timeout explicitly as an accepted D-03 divergence (never silent); the zero-context subagent (axis 3) must run on an independent host/runner (a same-host win32 subagent inherits the timeout and is not an independent axis).

**GA-2 — Validator authoring scope & apex identity → Option A (129..134, apex=134).** D-02: Author `check-phase-129.mjs` through `check-phase-134.mjs` (6 new validators; validator-atom deferral confirmed — content phases 129-133 shipped no validators). New chain-apex = check-phase-134, chain range [48..133] (86 entries, self-inclusive per the 128 precedent). V-134-SELF asserts `134 NOT in CHAIN_PHASES` AND `CHAIN_SKIP.size === 0` (dual-invariant); V-134-AUDIT is SKIP-PASS until the close-gate lands (intended graceful-skip; the final fresh-clone re-audit reads the committed doc → real PASS). Reject Option B (129..133, apex=133 — under-delivers HARN-12, forward-incompatible with v1.19, collides with 133's chain-entry identity, drops 133 from the chain). Mandatory guardrails: resolve every one of the 6 validators' VERIFICATION.md reads through the archive-path.mjs resolver — never a hardcoded `.planning/phases/...` path; do NOT guess the archive-root token (check-phase-128 literally passes `['v1.16-phases']` for a v1.17 doc — non-obvious and fragile; make resolver-null fail-loud, not skip-pass; verify the correct v1.18 root string); preserve the HARN-11 dual-token positive-confirmation `git log --all --grep` method for the V117 SHA and verify the returned commit's SUBJECT LINE carries both tokens (v1.17 false-positive caveat — the archival git-rm SHA d0fda4f9 / safety SHA 6851b54a can share tokens; pinning the post-git-rm tree would corrupt every v1.17-frozen read); guard against a `CHAIN_SKIP===0` deadlock (adding chain entries to force green is a self-disqualifier per D-119-3/D-125-1/D-128-C) and de-duplicate the interior [48..133] entries (length+termini asserts don't catch a duplicated/dropped interior entry).

**GA-3 — v1.18-DEFERRED-CLEANUP.md scope → Option A, scoped (log-only).** D-03: The close doc logs BOTH CARVE-1 AND CARVE-2 (133-CONTEXT requires two logged carve-outs). Log-only, ZERO fixes — nothing is remediated in this close. CARVE-1: FROZEN-AWARE-ADOPTION-SWEEP-01 remains durable debt — the permanent fix (readAtClose adoption across the 13 milestone-audit harnesses + regenerate-supervision-pins.mjs) is deferred to a future dedicated tooling milestone. Re-pin does NOT masquerade as "sweep resolved." CARVE-2: TOOL-05 re-scoped to "verify + attest the existing single-apex O(n) property cross-OS" (the imagined within-apex O(n²) does not exist — the CHECK_PHASE_NESTED guard already satisfies it). Reject Option B (minimal, CARVE-1 only — drops CARVE-2, 133-CONTEXT both-carve-outs-logged requirement miss; TOOL-05's original O(n²) wording survives unqualified). Mandatory guardrails: Log-only — resist the sweep→fix temptation; if a token-sweep for open DEFER-*/CARVE-* is run, match exact deferral IDs against an exclusion list of already-frozen predecessor deferrals (FROZEN-AWARE-ADOPTION-SWEEP-01 already lives in v1.8-DEFERRED-CLEANUP; DEFER-121-07/RETRO-* series) — never re-catalogue a frozen earlier deferral; give CARVE-1 an explicit "unscheduled, tracked → future tooling milestone" home; DEFER-119-A re-listing is optional (D-05 satisfied by the Phase-133 plan stating it in writing — not mandated in the close doc; include only if it does not reintroduce double-booking).

**GA-4 — Close-PR Class-B cascade disposition → Option B (criteria-gated fallback).** D-04: Expect green, but retain the ACCEPTED-STANDALONE-CI-RED fallback, criteria-gated. TOOL-04 re-pin (Phase 133) greened the 11 predecessor integrity workflows, but CARVE-1's root cause is UNRESOLVED — `audit-harness-v1.N-integrity.yml` `harness-run` checkout has no ref, so frozen predecessor harnesses run against live HEAD; the close-gate adds `.planning/*` changes to HEAD → a predecessor frozen harness can legitimately go RED. Reject Option A (all-green, any RED blocks — deadlocks the close forever with CARVE-1 unresolved). Mandatory guardrails: apply ACCEPTED-STANDALONE-CI-RED only IFF all failing jobs are harness jobs + zero chain failures + current-milestone run green; machine-verify with `gh run view --json jobs` — never eyeball the checks UI; enumerate the cascade workflows fresh at close time (do not trust a stale count — the new 15th workflow must be caught); sequence-coupling with GA-2: confirm the new apex=134 validator actually ran and passed BEFORE invoking the fallback.

### Claude's Discretion
- Internal structure of the 6 new `check-phase-*.mjs` validators (each follows the check-phase-128 template: AUDIT + CHAIN + AUDIT-HARNESS + SELF, NESTED-aware) — planner/executor's call within the invariants above. **Research refinement:** per precedent (126/127, 120-124), only the APEX (134) actually carries AUDIT+CHAIN+AUDIT-HARNESS+SELF; the 5 leaf validators (129-133) are lightweight needle-based (no chain, no resolver call) — see Research Target 2 below.
- The exact `v1.18-audit-allowlist.json` line-pin deltas (Path-A from v1.17, TARGETED shift-repointing per any recorded HYG-02-style line shifts; count/identity unchanged, confirmed against live corpus).

### Deferred Ideas (OUT OF SCOPE)
- `readAtClose` adoption across the 13 `v1.4–v1.17-milestone-audit.mjs` harnesses + `regenerate-supervision-pins.mjs` — the permanent root-cause fix for FROZEN-AWARE-ADOPTION-SWEEP-01 (CARVE-1). Deferred to a future dedicated tooling milestone. Logged in v1.18-DEFERRED-CLEANUP.md (log-only).
- V118 back-anchor pin — explicitly the successor milestone's (v1.19) job per the back-anchor rule. Out of scope here.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-11 | `_lib/frozen-at-close.mjs` gains the V117 entry (SHA recovered via dual-token positive-confirmation grep, subject-line verified) + `readAtV117Close` export | Research Target 1 — exact command run, candidate SHA identified and verified, exact code diff specified |
| HARN-12 | 16th Path-A audit-harness lineage bump: `v1.18-milestone-audit.mjs` + `v1.18-audit-allowlist.json` + BASELINE_22 + `check-phase-129..134.mjs` + `audit-harness-v1.18-integrity.yml`; predecessor frozen surfaces byte-unchanged except TOOL-04 (+TOOL-06) remediation; full predecessor chain run BEFORE close-gate | Research Targets 2, 3, 4 — exact templates, exact archive-root token, exact BASELINE_22 comment text, exact CI workflow diff, exact byte-unchanged exception enumeration |
| HARN-13 | 3-axis terminal re-audit + single close-gate commit flipping all 20 v1.18 requirements to Validated + `v1.18-MILESTONE-AUDIT.md` + `v1.18-DEFERRED-CLEANUP.md` | Research Targets 5, 6 — exact axis commands, exact requirement-ID enumeration, exact doc templates (v1.17 precedent read in full) |
</phase_requirements>

## Architectural Responsibility Map

Not applicable in the usual (browser/API/DB) sense — this phase operates entirely in one tier: **repo tooling / CI validation**. For completeness:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| V117 SHA recovery + pin | Repo tooling (`_lib/frozen-at-close.mjs`) | — | Pure git-forensics + a JS map entry, no runtime app tier involved |
| New validators (129-134) | Repo tooling (`scripts/validation/*.mjs`) | CI (GHA) | Validators run identically locally and in GHA; GHA is the authoritative execution environment (D-03) |
| 16th harness + allowlist | Repo tooling | CI (GHA `harness-run` job) | Harness is invoked both by local `--verbose` runs and by the CI `harness-run` job |
| 15th CI workflow | CI (GitHub Actions) | — | New `.yml` coexists with 14 predecessor workflows |
| Close-gate commit | Repo tooling (`.planning/*.md`) | — | Pure documentation/state flip, no code |

## Research Target 1 — V117 SHA Recovery (HARN-11)

**Exact command (matches the V116 precedent recorded in `frozen-at-close.mjs:69-71`):**
```bash
git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match --format="%H %s"
```

**Result when run against this repo (2026-07-19), full output, newest first:**
```
b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428 docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE
066a906845a503ff934db913eb4b77581ced81a2 feat(128-03): Atom 2a — V116 pin + D-128-C frozen-aware conversion (8 validators/14 checks)
3dd251249a812e31147cd653a7ad01e6878c091b docs(125-07): Phase 125 close-gate — v1.16 MILESTONE-AUDIT + ... v1.16 MILESTONE CLOSE
... (older v1.15/v1.14/.../v1.8 close-gates)
```

**Subject-line verification (the mandatory v1.17-false-positive-caveat check):** `b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428`'s subject is `docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE` — the subject line itself (not merely the body) carries both `MILESTONE-AUDIT` and `MILESTONE CLOSE`. **This is the true v1.17 close-gate.** `066a9068` (the runner-up, one line down) is Atom 2a — its SUBJECT does NOT contain "MILESTONE CLOSE" (only its body quotes the recovery command, per the exact false-positive trap `128-MILESTONE-AUDIT.md` documents for `066a906` at an earlier grep moment before `b56bba5e` existed). Since `b56bba5e` is chronologically the newest qualifying commit AND its subject independently carries both tokens, there is no ambiguity this cycle — but the planner must still perform the subject-line check explicitly (not skip it because "it happened to work"), per the locked guardrail.

**Cross-check against the archival/safety SHAs named in CONTEXT (confirmed NOT candidates):**
```
d0fda4f907cb850b628671392fe8f166085feafa  chore: remove REQUIREMENTS.md for v1.17 milestone     (archival git-rm)
6851b54accfc2ce7652dd1ce447ebf3c6d7d5dcf  chore: archive v1.17 milestone                          (safety commit)
```
Neither SHA appears in the dual-token grep output at all (their subjects don't contain both tokens) — so this cycle's recovery is unambiguous, unlike the v1.17-recovering-V116 cycle which hit a live false positive.

**Exact code diff to `scripts/validation/_lib/frozen-at-close.mjs`** (mirrors the `V116` entry pattern at lines 68-75 exactly):
```js
  V117: 'b56bba5',  // Phase 128 Plan 128-07 close-gate — v1.17 milestone close-gate; atom == close-gate.
                    // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                    // `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1
                    // --format=%H` -> b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428, subject: "docs(128-07):
                    // v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE
                    // CLOSE"). Single entry — same single-entry pattern as V18..V116 (back-anchor
                    // invariant: V117 references a PAST close SHA; the V118 pin is deferred to v1.19 per
                    // the back-anchor rule).
```
And append, at the bottom convenience-exports block (after `readAtV116Close`):
```js
export const readAtV117Close      = (p) => readAtClose('V117',         p);
```

**Confidence: HIGH** — command run directly against this repo, output inspected, subject line verified. `[VERIFIED: git log]`.

## Research Target 2 — The 6 New Validators (HARN-12, GA-2 Option A)

**Two distinct templates exist in the precedent lineage, not one.** `check-phase-128.mjs` is only the correct template for the APEX. The 5 non-apex validators (129-133) have a *different*, much lighter template: `check-phase-126.mjs` / `check-phase-127.mjs` (v1.17's leaf validators) and, going back further, `check-phase-120..124.mjs` (v1.16's leaf validators). None of these leaf validators contain `resolveArchivedPhasePath`, a `CHAIN_PHASES` array with entries, or an `AUDIT-HARNESS` step — they are `CHAIN_PHASES = []`, needle-based presence/content checks against the phase's actual deliverable files, plus a `SELF` dual-invariant check. Verified via grep: `grep -n "resolveArchivedPhasePath" scripts/validation/check-phase-{120,121,122,123,124,126,127}.mjs` returns zero matches for all seven files.

**Recommended per-validator content (Claude's Discretion area, informed by what each phase actually shipped — see `.planning/REQUIREMENTS.md` traceability table and each phase's own `-VERIFICATION.md`):**

| Validator | Shape | What it should assert (derive needles from that phase's own `-VERIFICATION.md` "Required Artifacts") |
|---|---|---|
| `check-phase-129.mjs` | Leaf (126/127 template) | STD-05 D-02 ruling row in `EEE-SOP-standard.md`; `docs/_templates/recipe-template.md` exists + TEMPLATE-SENTINEL present (CLASS-01, CLASS-02) |
| `check-phase-130.mjs` | Leaf | `docs/recipes/01-*.md` exists, contains the kiosk/SharedPC decision-point block, contains the 4 anti-feature callouts, HYG-04 RE-084 edit landed (AVD-01..05, HYG-04) |
| `check-phase-131.mjs` | Leaf | `docs/recipes/02-*.md` exists, unsupported-feature callouts present, temp-session decision block present, layered-config worked example present (IPAD-01..04) |
| `check-phase-132.mjs` | Leaf | RE-index rows at `Status: Approved` for both recipes, `filename-map.md` regenerated, `docs/index.md` recipes section present, nav-last ordering (git-log timestamp check, mirrors precedent) (CLASS-03, CLASS-04) |
| `check-phase-133.mjs` | Leaf | TOOL-04 re-pin commit landed (14 sidecars), TOOL-05 attestation doc exists, TOOL-06 stderr-budget landed at check-phase-60/61 only (TOOL-04, TOOL-05, TOOL-06) |
| `check-phase-134.mjs` | **APEX** (128 template) | AUDIT (own VERIFICATION.md, resolver-based) + CHAIN [48..133] (86 entries) + AUDIT-HARNESS (`v1.18-milestone-audit.mjs`) + SELF (dual-invariant: 134∉CHAIN, CHAIN_SKIP.size===0) |

**Apex chain confirmed: [48..133] = 86 entries** (48 through 133 inclusive; 128's chain was [48..127] = 80 entries per its own module-load assertion `CHAIN_PHASES.length !== 80` / termini 48/127 — the same +6 pattern (127→133) matches the +6 new phases this milestone. Module-load throws to copy verbatim, with `80`→`86` and `127`→`133`.

**CHAIN_SKIP must remain `new Set([])`** — empty, per the non-negotiable D-119-3/D-125-1/D-128-C rider CONTEXT reiterates. No exceptions.

### The Archive-Root Token Question — RESOLVED, with an important caveat

CONTEXT flags this as "do NOT guess" and singles out `check-phase-128`'s `['v1.16-phases']` as "fragile." **Empirical investigation confirms it is not merely fragile — it is objectively wrong, and the wrongness is provable and currently live in this repo:**

```bash
$ ls .planning/milestones/v1.17-phases/     # phases 126-128 (v1.17's OWN phases) archive HERE
126-.../  127-.../  128-v116-pin-15th-path-a-lineage-bump-terminal-close/
$ ls .planning/milestones/v1.16-phases/     # phases 120-125 (v1.16's OWN phases) archive HERE
120-.../ 121-.../ 122-.../ 123-.../ 124-.../ 125-v115-pin-14th-path-a-lineage-bump-terminal-close/
```
Each milestone's phases (**including its own close phase**) archive under **its own** `vX.Y-phases/` root, never the predecessor's. `check-phase-100.mjs` (v1.13's apex) correctly passes `['v1.13-phases']` (its own root) and `check-phase-112.mjs` (v1.14's apex) correctly passes `['v1.14-phases']` (its own root) — both right. But starting at `check-phase-119.mjs` (v1.15's apex) the pattern silently regressed to the **predecessor's** root: 119→`['v1.14-phases']` (should be `v1.15-phases`), 125→`['v1.15-phases']` (should be `v1.16-phases`), 128→`['v1.16-phases']` (should be `v1.17-phases`). This is a 3-generation copy-paste-and-increment bug that has never been caught because:

1. It's silently masked by the `!verif` → `SKIP-PASS "not yet authored"` branch (indistinguishable from the legitimate pre-close-gate state).
2. Running these validators today (post-v1.17-archival) empirically demonstrates the bug is live:
```bash
$ node scripts/validation/check-phase-128.mjs 2>&1 | grep AUDIT
[AUDIT/83] V-128-AUDIT: ... SKIPPED -- 128-VERIFICATION.md not yet authored (PASS-via-skip until the Phase 128 close-gate lands)
```
This is **false** — `128-VERIFICATION.md` exists right now at `.planning/milestones/v1.17-phases/128-.../128-VERIFICATION.md` — the resolver simply can't find it because it's looking in `v1.16-phases`. The check happens to still exit PASS (skip counts as pass), so it is currently harmless, but it is a real latent bug.

**This bug is FROZEN in check-phase-119/125/128 — DO NOT fix it (out of TOOL-04 scope, would violate D-00a byte-unchanged doctrine).**

**For the new apex `check-phase-134.mjs`, use the objectively correct token: `['v1.18-phases']`** (own root — where phase 134's `134-VERIFICATION.md` will land when `/gsd-complete-milestone` archives v1.18 at v1.19's close). This corrects the drift rather than propagating it a 4th time.

**Regarding "resolver-null must fail-loud, not skip-pass":** this guardrail is in tension with the established, load-bearing precedent behavior (100/112/119/125/128 all legitimately SKIP-PASS pre-close-gate — see `128-MILESTONE-AUDIT.md`'s explicit "1 SKIP = V-128-AUDIT... resolving to PASS as this close-gate authors that file"). A structural fail-loud/skip-pass distinction (i.e., detect "wrong root" vs. "genuinely not yet authored") is not implementable from file-existence alone without new logic no precedent validator has. **Practical resolution that satisfies both the letter and the intent:** get the root *objectively right* (done above — `['v1.18-phases']`), so the resolver-null branch is only ever legitimately hit pre-close-gate. This is a design nuance the planner should decide explicitly (not silently); recommend documenting the choice as an inline code comment on `check-phase-134.mjs`'s AUDIT check, mirroring the honest-accounting style already used in `128-MILESTONE-AUDIT.md`.

**Confidence: HIGH** — the bug and the fix are both empirically demonstrated against this repo, not inferred. `[VERIFIED: local execution]`.

## Research Target 3 — 16th Path-A Audit Harness (HARN-12)

**Template: `scripts/validation/v1.17-milestone-audit.mjs`** — copy verbatim, relabel v1.17→v1.18 throughout (header comment, `HARNESS` const if referenced elsewhere, allowlist filename reference at line ~82 `parseAllowlist()`). C1-C17 confirmed inherited verbatim from v1.16 with "no freshness-threshold change this milestone" (source comment, line 2) — same instruction applies for v1.18 unless a Phase-134 discuss-time decision says otherwise (none surfaced in CONTEXT — none expected, this is a closing cluster with "DISCUSS-PHASE FLAG: none").

**Sidecar delta:** `v1.17-audit-allowlist.json` has 2 safetynet + 14 supervision + 5 c7_knox + 4 c9 pins that were "TARGETED −1-line-shift repointed" for HYG-02 (a 5-file frontmatter-key deletion in Phase 126). **v1.18 has NO equivalent corpus-wide line-shifting hygiene event** — Phases 129-132 added 2 brand-new recipe docs (`docs/recipes/01-*.md`, `docs/recipes/02-*.md`) and made a targeted content fix to `docs/admin-setup-apv1/08-self-deploying.md` (HYG-04, Phase 130) but did not delete lines from the Android-corpus files the allowlist pins reference (`_glossary-android.md`, `android-capability-matrix.md`, `03-fully-managed-cobo.md`, `03-android-version-matrix.md`). **Recommendation: copy `v1.17-audit-allowlist.json` byte-verbatim to `v1.18-audit-allowlist.json`** except updating the `"phase"` and `"generated"` metadata fields — no line-pin deltas expected. **The planner must still run `node scripts/validation/regenerate-supervision-pins.mjs --report`** against the live v1.18 corpus at Wave-0/Atom-1 time to positively confirm zero drift (do not assume — the CONTEXT text explicitly reserves this as "Claude's Discretion... confirmed against live corpus"), but current evidence strongly suggests a no-delta copy.

**BASELINE_22 refresh** — exact template from `regenerate-supervision-pins.mjs:492-502` (the BASELINE_21 entry), to be replicated with v1.18 values:
```js
// BASELINE_22 refreshed <DATE> (Phase 134 Plan 134-0X): closes BASELINE_21 v1.17 carry-over
// per HARN-12 contract (REQUIREMENTS.md + ROADMAP.md Phase 134 SC#2); v1.18 line positions
// verified against HEAD <JIT pre-Atom-1 HEAD SHA> (captured via `git rev-parse HEAD`
// immediately before authoring Atom 1, NOT necessarily the Wave-0 anchor -- per the Phase
// 119/125/128 recorded Wave-0-vs-pre-Atom-1-anchor distinction: if an automated Jira-sync
// commit lands between Wave-0 and Atom 1, the true pre-Atom-1 predecessor is whichever SHA is
// HEAD at that exact moment, not the Wave-0 anchor).
// BASELINE_9 entries above remain unchanged -- Phase 134 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 134
// close and remain valid for the v1.18 corpus. Resolution path: BASELINE_23 will refresh at the
// next milestone close per the Path-A inheritance pattern (... -> v1.17 -> BASELINE_21 -> v1.18 -> BASELINE_22).
```
Current `HEAD` at research time: `b063ae05eb76dbdacb134c6ca83aa1c0d968a7e5` — this will NOT be the correct Wave-0/pre-Atom-1 anchor (more commits land before Phase 134 executes); the planner must capture the real value via `git rev-parse HEAD` at actual Plan-01 authoring time, per the documented Phase-119/125/128 anchor-capture discipline (do not reuse this research's HEAD).

**Confidence: HIGH for the copy-forward mechanics** `[VERIFIED: file read]`; **MEDIUM for "zero pin deltas"** `[CITED: v1.17-audit-allowlist.json content + phase 129-133 commit history]` — must be confirmed at plan/execution time via `--report`, not assumed.

## Research Target 4 — 15th CI Coexistence Workflow (HARN-12)

**Template: `.github/workflows/audit-harness-v1.17-integrity.yml`** (194 lines, read in full). Copy verbatim and relabel v1.17→v1.18, with these mechanical substitutions:
- `name: Audit Harness v1.18 Integrity`
- `paths:` glob list: `scripts/validation/v1.18-*`, keep `scripts/validation/check-phase-*.mjs` (superset, unchanged), `.github/workflows/audit-harness-v1.18-integrity.yml`, `.planning/milestones/v1.18-MILESTONE-AUDIT.md`, `.planning/milestones/v1.18-DEFERRED-CLEANUP.md`
- `parse` job: validates `v1.18-audit-allowlist.json`
- `path-match` job: greps `v1.18-milestone-audit.mjs` for the `v1.18-audit-allowlist.json` reference
- `harness-run` job: `node scripts/validation/v1.18-milestone-audit.mjs --verbose`
- `linux-chain-ubuntu-latest` job: runs `check-phase-134.mjs` (the new apex), comment updated `[48..133]`
- Per-leaf jobs: `check-phase-129` through `check-phase-133` (5 jobs, mirroring the 126/127 two-job pattern in the v1.17 file, extended to 5) — **note the v1.17 file only has 2 leaf jobs (126, 127) because v1.17 only had 2 leaf phases; v1.18 has 5 leaf phases (129-133), so this job list is 5 entries, not 2**
- `check-phase-134` job (separate from `linux-chain-ubuntu-latest`, mirrors 128's dual-apex pattern — **DUAL-APEX comment must be preserved**: both the standalone `check-phase-134` job and `linux-chain-ubuntu-latest` run the full [48..133] recursion; this is intentional, do not deduplicate, do not add `CHECK_PHASE_NESTED=1` to either top-level GHA invocation)
- `rotting-external-quarterly` and `pin-helper-advisory` jobs: relabel `v1.18-audit-allowlist.json`, keep `continue-on-error: true` on `pin-helper-advisory` (structurally non-blocking, per D-05/DEFER-119-A) and `continue-on-error: false` default elsewhere (D-A9 fully-blocking contract)

**CARVE-1 confirmation:** the `harness-run` job's `actions/checkout@v4` step carries **no `ref:`** (checks out live HEAD of the PR), confirmed by reading the template — this is the exact CARVE-1 root cause (frozen harnesses validate live HEAD, not a pinned SHA). **Do not add a `ref:`** — that would be the D-04-rejected "workflow-layer close-SHA checkout" fix (explicitly rejected at Phase 133, reserved for a future dedicated sweep).

**Predecessor count confirmed via `ls .github/workflows/ | grep audit-harness`: 14 files** (`audit-harness-integrity.yml` base + `v1.5` through `v1.17`, 13 versioned = 14 total). Phase 134's new file is the **15th**, confirming ROADMAP/CONTEXT's stated count.

**Confidence: HIGH** `[VERIFIED: file read + directory listing]`.

## Research Target 5 — 3-Axis Terminal Re-Audit (HARN-13, GA-1 Option B)

Exact commands per axis, drawn from the `128-MILESTONE-AUDIT.md` "Auditor-Independence Verification" section (the literal precedent to replicate):

**Axis 1 — fresh clone (Windows, non-authoritative/advisory per GA-1 D-01):**
```bash
git clone --no-hardlinks <local-repo-path> <scratch-clone-dir>
cd <scratch-clone-dir>
node scripts/validation/v1.18-milestone-audit.mjs --verbose
node scripts/validation/check-phase-129.mjs
node scripts/validation/check-phase-130.mjs
node scripts/validation/check-phase-131.mjs
node scripts/validation/check-phase-132.mjs
node scripts/validation/check-phase-133.mjs
node scripts/validation/check-phase-134.mjs --verbose   # apex, full chain [48..133]
```
Per GA-1 D-01, if this axis times out on the deep-nest chain recursion (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, now at depth 86), **document the timeout explicitly** as an accepted D-03/GA-1 divergence — non-blocking, not a close-blocker. Do not silently omit Axis 1 results; write "timed out, ADVISORY axis, see GA-1 D-01" into the audit doc, matching precedent's honest-accounting style.

**Axis 2 — cross-OS Linux GHA (AUTHORITATIVE for BOTH chain validators per D-03):**
- Push the close-gate branch as a PR; the new `audit-harness-v1.18-integrity.yml` fires automatically.
- Authoritative jobs: `linux-chain-ubuntu-latest` (runs `check-phase-134.mjs`, full [48..133] recursion) and `check-phase-134` (the standalone apex job, dual-apex per D-128-4 pattern preserved).
- Capture: `gh run view <run-id> --json jobs` and record each job's `conclusion`.

**Axis 3 — fresh zero-context sub-agent, independent host/runner (GA-1 mandatory guardrail):**
- Dispatch a fresh gsd-executor (or equivalent zero-context agent) with NO carried context from Axis 1/2, on a genuinely separate execution context. Per the mandatory guardrail: "a same-host win32 subagent inherits the timeout and is not an independent axis" — if run on the same Windows host as Axis 1, it will hit the identical `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` and cannot serve as an independent corroborating axis. **Recommend running Axis 3 as a fresh dispatch that either runs on a different host, OR restricts scope to the non-apex validators (129-133, each of which is fast/leaf-only) plus a `CHECK_PHASE_NESTED=1`-gated apex run** (matches precedent's "Axis 3... local working-tree apex... independently reproduced" pattern from `128-05-AUDIT-RESULTS.md`, which ran on the SAME Windows host as Axis 1 but did NOT hit the deep-nest stall that milestone — v1.18's deeper chain (86 vs 80) makes a repeat stall more likely this cycle; if Axis 3 also stalls, it inherits GA-1's ADVISORY disposition, and Axis 2 remains sole-authoritative per D-03).

**PASS/FAIL/SKIP exact-match capture:** record the apex's own `--verbose` summary line (`Result: N PASS, M FAIL, K SKIPPED`) from every axis that completes, and diff them. Precedent format (128): "82 PASS / 0 FAIL / 1 SKIPPED IDENTICAL across Axis 1, Axis 2, Axis 3" — expect v1.18's apex to report **88 checks total** (86 CHAIN entries + AUDIT + AUDIT-HARNESS + SELF = 89 — recompute exactly once `check-phase-134.mjs` is authored; do not hardcode this number in the plan, derive it from the actual `checks.push()` call count).

**Confidence: HIGH for the command shapes** `[VERIFIED: file read of 128-MILESTONE-AUDIT.md + config]`; the exact GHA workflow run ID and Axis-3 host details cannot be known until execution — this section documents the *procedure*, not a specific run.

## Research Target 6 — Close-Gate (HARN-13)

**Single atomic commit** flips 20 requirement IDs to Validated across `PROJECT.md`/`ROADMAP.md`/`STATE.md`/`REQUIREMENTS.md`, alongside authoring `v1.18-MILESTONE-AUDIT.md` and `v1.18-DEFERRED-CLEANUP.md`. Mirrors `128-07` (single commit, "NO Commit A" pattern — v1.17's close was one commit, not two).

**All 20 v1.18 requirement IDs (grepped from `.planning/REQUIREMENTS.md`):**
```
CLASS-01, CLASS-02, CLASS-03, CLASS-04   (4 — Phase 129/132)
AVD-01, AVD-02, AVD-03, AVD-04, AVD-05   (5 — Phase 130)
IPAD-01, IPAD-02, IPAD-03, IPAD-04       (4 — Phase 131)
HYG-04                                    (1 — Phase 130)
TOOL-04, TOOL-05, TOOL-06                (3 — Phase 133)
HARN-11, HARN-12, HARN-13                (3 — Phase 134)
```
Total: 20. All already show `[x]` (content) or are the 3 pending HARN items in REQUIREMENTS.md's checkbox list — the close-gate's job is the STATE/ROADMAP/PROJECT-level "Validated" flip, which is a distinct action from the per-phase checkbox (already ticked at each phase's own completion).

**`v1.18-MILESTONE-AUDIT.md` template: `.planning/milestones/v1.17-MILESTONE-AUDIT.md`** (404 lines, read in full above) — replicate its exact structure: YAML frontmatter with `scores`, `mechanical_checks` (harness/allowlist/SHAs/`cross_os_exact_match`/`predecessor_byte_unchanged`/`predecessor_frozen_surface_count`), `notes` (back-anchor completion narrative + honest-accounting section for any pre-push finding + 3-axis narrative + lineage-bump narrative), then the markdown body: Executive Summary, Phase Closure Narrative (129→130→131→132→133→134), Auditor-Independence Verification table, Cross-OS PASS-Count EXACT MATCH table, Predecessor-Workflow Cascade Scan (GA-4's `gh run view --json jobs` enumeration), Predecessor Byte-Unchanged HARD Gate (`git diff <wave0-anchor>..HEAD` over the frozen surfaces — **must explicitly enumerate the TOOL-04 (14 sidecar JSON) exception AND the TOOL-06 exception (`check-phase-60.mjs`, `check-phase-61.mjs` — 2 files; NOT `check-phase-48.mjs`, which was reverted back to n:200 per commit `ba6d53f4`'s ACCEPTED-FROZEN-CONTRACT disposition)**, Requirements Traceability table (20/20), Mechanical Checks Detail, Audit Harness Lineage narrative (phases 62→66→70→74→82→88→93→95→100→112→119→125→128→**134**, 16th entry), Cross-Phase Integration table, Deferred Items Summary, Milestone Close checklist.

**`v1.18-DEFERRED-CLEANUP.md` template: `.planning/milestones/v1.17-DEFERRED-CLEANUP.md`** (163 lines, read in full above) — replicate structure: Part A (v1.18 NEW deferrals: **V118-PIN-DEFERRAL** using the exact V117-PIN-DEFERRAL section as a template with s/117/118/, s/v1.17/v1.18/, s/v1.16/v1.17/ throughout; **CARVE-1** using the FROZEN-AWARE-ADOPTION-SWEEP-01 section as template, updated to record that TOOL-04's re-pin (Phase 133) is now landed but the root cause remains — CARVE-1 language IS this section's v1.18 update), **CARVE-2** (new section — TOOL-05 re-scope record, cite `133-CONTEXT.md` D-06/D-07/D-08), Part B (carried-forward v1.17 items verbatim: `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` updated to `[48..133]` with GA-1's honest-accounting language of whichever axis actually stalled/didn't, `ACCEPTED-STANDALONE-CI-RED` now spanning v1.4-v1.17, `O(n²)-CHAIN-RUNNER-REMEDIATION-01` — **note CARVE-2 effectively closes the "build a cache" framing of this item; record it as re-scoped/attested rather than re-carried verbatim**, `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`, DEFER-119-A **optional per D-05** — include only if convenient, do not double-book), Part C (v1.8 items, preserved verbatim).

**Ordering constraint (LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01 / HARN-12):** run the FULL predecessor chain (`node scripts/validation/check-phase-134.mjs --verbose`, standalone, non-nested, which recursively spawns 48..133) and confirm 0 FAIL **BEFORE** authoring the close-gate commit — mirrors the `128-MILESTONE-AUDIT.md` precedent where a pre-push adversarial review caught `check-phase-124.mjs`'s archival-drift bug (`LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`) BEFORE the push, not reactively. **Given the confirmed live bug in check-phase-119/125/128's archive-root tokens (Research Target 2), run a `CHECK_PHASE_NESTED=1`-unset full sweep of `[48..133]` and specifically re-verify no NEW archival-drift-class failure has appeared** (the existing 119/125/128 bug is silently masked as SKIP-PASS and will NOT surface as a FAIL — confirmed by direct execution above — so this particular latent bug will not block the chain; but the discipline of a full pre-push sweep is what catches genuinely NEW instances of the same bug class, as it did for `check-phase-124` at Phase 128).

**Confidence: HIGH** `[VERIFIED: file read of v1.17-MILESTONE-AUDIT.md + v1.17-DEFERRED-CLEANUP.md in full, requirement grep against live REQUIREMENTS.md]`.

## Research Target 7 — Sequencing / Wave Plan

Recommended wave decomposition, informed by the 128 precedent's actual plan sequence (128-01 Wave-0 anchor → 128-02 Atom 1 → 128-03 Atom 2a → [pre-push adversarial-review fix] → 128-04 Atom 2b → 128-05 3-axis re-audit → 128-06 emergent slot → 128-07 close-gate):

1. **P01 — Wave-0 anchor + V117 confirm.** Capture pre-Atom-1 HEAD SHA (`git rev-parse HEAD`); run the dual-token grep, positively confirm V117 subject-line; run a full-predecessor-chain scoping pass (mirrors D-128-C) to identify whether any predecessor validator needs frozen-aware conversion given whatever v1.18 content touched (per STATE.md's Plan-Time Research Flag for Phase 134 HARN-12: "scope which predecessor validators need frozen-aware conversion given whatever TOOL-04 touched at Phase 133" — likely none new, since TOOL-04/06 are already-landed Phase 133 commits, not live content this phase touches, but confirm).
2. **P02 — Atom 1: 16th Path-A harness.** Author `v1.18-milestone-audit.mjs` (Path-A copy from v1.17) + `v1.18-audit-allowlist.json` (byte-verbatim copy, `--report`-verified zero-delta) + BASELINE_22 refresh comment (BASELINE_9 array untouched).
3. **P03 — Atom 2a: V117 pin + `_lib/frozen-at-close.mjs`.** Land the `V117` entry + `readAtV117Close` export. (Small, isolated — could fold into P01 or stay separate like 128-03 did; either is fine, this is Claude's Discretion on plan granularity.)
4. **P04 — Atom 2b: the 6 validators + 15th CI workflow.** Author `check-phase-129..134.mjs` (5 leaf + 1 apex) + `audit-harness-v1.18-integrity.yml`. Prove apex-134 green standalone BEFORE push (mirrors 128-04's "proving apex-128 green standalone (82/0/1) before the orchestrator pushed").
5. **P05 — 3-axis terminal re-audit.** Axis 1 (advisory) + Axis 2 (GHA, authoritative, push as PR) + Axis 3 (independent-host zero-context, or documented same-host ADVISORY fallback per GA-1). Predecessor byte-unchanged HARD gate (enumerate BOTH TOOL-04 and TOOL-06 exceptions). Cascade scan (`gh run view --json jobs`, GA-4 criteria-gated fallback if needed — **sequence-coupling: confirm apex=134 ran+passed on Axis 2 BEFORE invoking any ACCEPTED-STANDALONE-CI-RED fallback**).
6. **P06 — emergent remediation slot** (reserve, may be no-op like 128-06 was — do not skip planning it, since precedent shows it sometimes catches a genuine pre-push blocker).
7. **P07 — close-gate.** Single commit: `v1.18-MILESTONE-AUDIT.md` (NEW) + `v1.18-DEFERRED-CLEANUP.md` (NEW, logs CARVE-1+CARVE-2) + `134-VERIFICATION.md` + 4-doc traceability flip (PROJECT/ROADMAP/STATE/REQUIREMENTS) to Validated for all 20 IDs.

**FROZEN surfaces this phase touches (all sanctioned, all D-00a in-class chain-maintenance, none broader):** `_lib/frozen-at-close.mjs` (V117 append), `regenerate-supervision-pins.mjs` (BASELINE_22 comment only, array untouched) — both are the SAME kind of "append, never rewrite" edit every predecessor close phase has made, not new categories of risk.

**GA-2↔GA-4 coupling (explicit per CONTEXT):** apex=134 must run and pass on Axis 2 (GHA) BEFORE the close-PR's Class-B fallback disposition can be invoked — do not disposition an ACCEPTED-STANDALONE-CI-RED verdict on a PR where the apex job itself hasn't reported success yet.

**Confidence: HIGH** for the wave shape (direct precedent mirror) `[CITED: 128-MILESTONE-AUDIT.md "performed_by" section]`.

## Common Pitfalls

### Pitfall 1: Trusting `-1` on the dual-token grep without subject-line verification
**What goes wrong:** A later commit's BODY text (not subject) quotes the recovery grep command as documentation, and the naive `git log ... -1` picks it up as if it were a real close-gate.
**Why it happens:** `git log --grep` matches the full commit message (subject + body) by default; a commit that merely *mentions* both trigger phrases in prose satisfies the dual `--grep --all-match` filter.
**How to avoid:** Always add `--format="%H %s"` and manually confirm the SUBJECT line (not just presence in output) contains both `MILESTONE-AUDIT` and `MILESTONE CLOSE`. This exact trap already occurred once (v1.17 recovering V116, `066a906` false-positive) — do not assume this cycle is safe just because it happened to resolve cleanly (Research Target 1 above).
**Warning signs:** The `-1`-returned commit's subject doesn't literally contain "MILESTONE CLOSE" as a phrase (e.g., only says "MILESTONE-AUDIT" or references the phrase inside a quoted shell command).

### Pitfall 2: Copying check-phase-128's archive-root token verbatim
**What goes wrong:** `check-phase-134.mjs`'s AUDIT check silently returns SKIP-PASS forever (even after the doc is genuinely archived), because the milestoneRoots guess points at the wrong `vX.Y-phases/` directory.
**Why it happens:** The precedent (119, 125, 128) all made this exact off-by-one error, so "copy the last one" propagates it a 4th time.
**How to avoid:** Use `['v1.18-phases']` (v1.18's OWN root — verified correct above), not `['v1.17-phases']` (predecessor's root, which would replicate the bug).
**Warning signs:** `ls .planning/milestones/` after any future archival to confirm which root actually houses phase 134's own doc.

### Pitfall 3: Under-scoping the "byte-unchanged except TOOL-04" HARD gate
**What goes wrong:** The predecessor byte-unchanged diff check only excludes the TOOL-04 sidecar commit, and the TOOL-06 `check-phase-60.mjs`/`check-phase-61.mjs` stderr-budget change (a second, separately-committed, also-sanctioned D-00a exception) trips the gate as an unexplained drift.
**Why it happens:** REQUIREMENTS.md HARN-12's prose literally says "except the explicitly-scoped TOOL-04 remediation" (singular), but Phase 133 actually produced TWO sanctioned frozen-surface exceptions (TOOL-04's `aaf0d2ff` + TOOL-06's `74939dfb`), plus a third commit (`ba6d53f4`) that reverted `check-phase-48.mjs` back to its original state (net zero for that one file).
**How to avoid:** When computing the predecessor byte-unchanged diff (`git diff <wave0-anchor>..HEAD` over the frozen surface set), explicitly enumerate: 14 sidecar JSONs (TOOL-04) + `check-phase-60.mjs` + `check-phase-61.mjs` (TOOL-06) as sanctioned. `check-phase-48.mjs` should show ZERO net diff (reverted).
**Warning signs:** The byte-unchanged gate reports non-empty diff on files not in this exact list.

### Pitfall 4: Windows Axis 1/3 collapsing into a single non-independent axis
**What goes wrong:** Axis 3 (the "fresh zero-context sub-agent") is dispatched on the same Windows host as Axis 1, inherits the identical `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` stall, and is then incorrectly presented as if it independently corroborated Axis 2.
**Why it happens:** It's operationally convenient to run both on the same machine, and precedent (128) got away with it because that milestone's chain (80 entries) happened not to stall.
**How to avoid:** Per CONTEXT's mandatory guardrail, explicitly note whether Axis 3 ran on an independent host/runner; if not, disposition it honestly as inheriting the same ADVISORY status as Axis 1, and rely solely on Axis 2 (GHA) as authoritative — do not claim 3-axis exact-match if 2 of the 3 axes are really one.
**Warning signs:** Axis 1 and Axis 3 report identical timeout behavior at the identical depth.

## Code Examples

### Apex module-load fail-loud assertions (copy verbatim from check-phase-128.mjs:70-75, update constants)
```js
// Source: scripts/validation/check-phase-128.mjs:70-75
if (CHAIN_PHASES.length !== 86) {
  throw new Error('check-phase-134 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 86 (integers 48..133 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 133) {
  throw new Error('check-phase-134 CHAIN_PHASES must span 48..133 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}
```

### Leaf validator SELF check (copy verbatim shape from check-phase-126.mjs:98-112, update phase number)
```js
// Source: scripts/validation/check-phase-126.mjs:98-112
checks.push({
  id: 'SELF',
  name: 'V-129-SELF: CHAIN_PHASES does NOT include 129; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(129)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 129 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (129 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

### V117 recovery + verification (exact commands used in this research)
```bash
# Source: this research session, run against the live repo
git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match --format="%H %s"
# -> newest match: b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428 docs(128-07): v1.17 MILESTONE-AUDIT + ... v1.17 MILESTONE CLOSE
```

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | v1.18-audit-allowlist.json needs zero line-pin deltas from v1.17's (byte-verbatim copy sufficient) | Research Target 3 | LOW — mechanically re-verifiable via `regenerate-supervision-pins.mjs --report` before authoring; if wrong, the planner just needs a targeted repoint like HYG-02's, same mechanism, more work but no design change |
| A2 | The exact per-validator needle sets recommended for check-phase-129..133 (table in Research Target 2) | Research Target 2 | LOW — these are Claude's Discretion per CONTEXT; if a needle is wrong/incomplete the validator still functions, just checks slightly different content; executor should derive final needles from each phase's own `-VERIFICATION.md` at authoring time, not blindly trust this table |
| A3 | Axis 3 zero-context subagent dispatch mechanics (whether a genuinely separate host is available in this environment) | Research Target 5 / Pitfall 4 | MEDIUM — if no separate host/runner exists, the planner must explicitly disposition Axis 3 as ADVISORY (same as Axis 1) rather than silently treating it as independent; this is a process/documentation risk, not a correctness risk |

**If this table were empty:** it isn't — 3 items above need light confirmation at plan/execution time, none block planning.

## Open Questions (RESOLVED)

1. **Does the CONTEXT guardrail "every one of the 6 validators' VERIFICATION.md reads through the resolver" mean all 6 must have an AUDIT check, or only whichever ones do such a read?** RESOLVED: Plan 134-03 Task 1 — leaves 129-133 stay needle-based (no resolver/AUDIT); only apex 134 (Task 2) reads its own VERIFICATION.md via the resolver.
   - What we know: Precedent (126/127/120-124) shows non-apex validators do NOT read their own VERIFICATION.md at all — they check deliverable files directly. Only the apex (100/112/119/125/128) has an AUDIT check.
   - What's unclear: Whether CONTEXT's phrasing was written assuming all 6 would have such a check (a deviation from precedent) or was describing "wherever this pattern occurs, resolver required" (consistent with precedent, applies only to 134).
   - Recommendation: Follow precedent — only `check-phase-134.mjs` gets an AUDIT/resolver check; 129-133 stay needle-based leaf validators. This is the reading that keeps HARN-12's "byte-unchanged except..." scope minimal and matches every prior close's actual shape. If the planner/executor disagrees, flag explicitly rather than silently deviating either direction.

2. **Exact apex check count for check-phase-134.mjs (89 checks: AUDIT + 86 CHAIN + AUDIT-HARNESS + SELF)?** RESOLVED: Plan 134-03 Task 2 — derive from the actual --verbose checks.push() count, do NOT hardcode 89; assert once authored.
   - What we know: 128's apex had 83 total checks (AUDIT + 80 CHAIN + AUDIT-HARNESS + SELF = 83, confirmed by the `[AUDIT/83]` label observed when running it). 134's chain is 86 (vs 80), so total should be 89.
   - What's unclear: Nothing structurally — this is arithmetic, not a real open question — but the planner should NOT hardcode "89" anywhere without re-deriving it from the actual authored `checks.push()` count, since an off-by-one here would itself be a silent bug of exactly the kind this research flagged in Pitfall 2.
   - Recommendation: Derive, don't hardcode; assert via `--verbose` run once authored.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validators, harness | ✓ | v24.17.0 (local); GHA workflows pin `node-version: '20'` | Local Node is newer than GHA's pinned 20 — no known compatibility issue for this codebase's plain ESM/no-build-step scripts, but note the version skew explicitly since it wasn't previously documented |
| git | SHA recovery, clone-based Axis 1, byte-unchanged diff gate | ✓ | (system git, functional — used throughout this research) | — |
| gh CLI | GA-4 machine-verified cascade disposition (`gh run view --json jobs`) | Not verified this session — recommend a quick `gh --version` check at P05 authoring time | — | If unavailable, GA-4's mandatory machine-verification cannot proceed as specified; this would block HARN-13's Class-B disposition step, not the rest of the phase |
| GitHub Actions (remote) | Axis 2 (authoritative) | Assumed available (used throughout prior phases) | — | None — Axis 2 is non-negotiable per D-03 |

**Missing dependencies with no fallback:** none identified as blocking at research time; `gh` CLI availability should be spot-checked at P05.

## Security Domain

Not applicable in the ASVS sense — this phase installs no packages, adds no user-facing input surface, and touches no authentication/authorization/cryptography code. It is exclusively internal build/validation tooling (JS scripts run via `node`, git commands, GitHub Actions YAML) operating over a trusted local git repository. No ASVS category applies. The one security-adjacent consideration already covered above (Pitfall 3/CARVE-1: CI checkout-without-ref means frozen harnesses validate live HEAD) is a correctness/drift concern, not a security vulnerability, and is explicitly out of scope for remediation this phase (D-04 reject).

## Sources

### Primary (HIGH confidence — direct repo reads/commands this session)
- `scripts/validation/_lib/frozen-at-close.mjs` — MILESTONE_CLOSE_SHAS map, V116 entry pattern, readAtClose implementation
- `scripts/validation/check-phase-128.mjs` — apex template, module-load asserts, CHAIN/AUDIT-HARNESS/SELF structure
- `scripts/validation/check-phase-126.mjs` — leaf validator template
- `scripts/validation/_lib/archive-path.mjs` — resolver implementation
- `scripts/validation/v1.17-milestone-audit.mjs` — 15th harness (header + structure)
- `scripts/validation/v1.17-audit-allowlist.json` — sidecar template (full read)
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_21 comment block, BASELINE_9 array
- `.github/workflows/audit-harness-v1.17-integrity.yml` — 14th CI workflow (full read)
- `.planning/milestones/v1.17-MILESTONE-AUDIT.md` — full close-gate doc template (404 lines, read in full)
- `.planning/milestones/v1.17-DEFERRED-CLEANUP.md` — full deferred-cleanup template (163 lines, read in full)
- `.planning/phases/133-chain-validator-tooling-debt-closure/133-CONTEXT.md` — TOOL-04/05/06 decisions, CARVE-1/2
- `.planning/phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-CONTEXT.md` — locked GA-1..GA-4 decisions
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` — requirement IDs, phase success criteria, watch items
- `git log --all --grep=...` — V117 SHA recovery, run directly
- `git show --stat`, `git log -1 --format` — commit-message/diff inspection for aaf0d2ff, 74939dfb, ba6d53f4, 806445a7, b56bba5e, d0fda4f9, 6851b54a
- `node scripts/validation/check-phase-125.mjs`, `node scripts/validation/check-phase-128.mjs` — run directly, confirmed the archive-root-token bug live
- `ls .planning/milestones/*-phases/` — confirmed own-milestone archival root pattern

### Secondary (MEDIUM confidence)
- None used — this phase's research is entirely groundable in local repo state; no external web/library research was needed.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- V117 recovery: HIGH — command run, output verified, subject-line checked
- Validator authoring (6 new files): HIGH for structure/templates, MEDIUM for exact per-validator needle content (Claude's Discretion, to be finalized against each phase's own VERIFICATION.md at plan time)
- Archive-root token: HIGH — bug and fix both empirically demonstrated
- 16th harness / allowlist: HIGH for mechanics, MEDIUM for "zero pin delta" (must be `--report`-confirmed, not assumed)
- 15th CI workflow: HIGH — template read in full, exact diffs specified
- 3-axis re-audit: HIGH for procedure, inherently unknowable exact run IDs/timings until executed
- Close-gate docs: HIGH — both templates read in full, exact requirement IDs enumerated

**Research date:** 2026-07-19
**Valid until:** Effectively unbounded for the structural/template findings (this is a slow-moving internal-tooling convention, not an external library). The specific SHA values (V117, Wave-0 anchor placeholder) are point-in-time and must be re-verified at actual plan/execution time if more commits land before Phase 134 executes — flagged explicitly above (BASELINE_22 anchor, byte-unchanged-gate base).
