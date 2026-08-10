# Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold - Research

**Researched:** 2026-08-10
**Domain:** Node.js CI-validator repair, apex chain-membership mechanics, milestone-scoped frozen-surface governance (this repo's `scripts/validation/check-phase-*.mjs` family)
**Confidence:** HIGH — every code citation below was read directly this session; every figure not re-derived is cited to `142-CONTEXT.md`'s already-owner-ratified `[MEASURED]` rows per the phase's explicit "do not re-derive" constraint.

<user_constraints>
## User Constraints (from CONTEXT.md)

`142-CONTEXT.md` carries **37 owner-ratified decisions (D-01..D-37)**, produced by `/grill-me` +
a scored `/adversarial-review` (5 Finders → Adversary → Referee, 83 findings, 77 confirmed, 6 of
the draft's own headline recommendations reversed). They are locked. This research does not
re-litigate them — it maps each to the exact code it touches so the planner can write concrete
`<action>` text. **Read `142-CONTEXT.md` in full before planning; the summary below is not a
substitute.**

### Locked decisions (D-01..D-37) — grouped by theme, not renumbered

**Zero corpus edits (D-01).** All five (now six, D-35) failures are superseded assertions, not
wrong documents — a later ratified decision changed the corpus deliberately in every case. Every
fix lands in `scripts/validation/check-phase-{30,31,138}.mjs`, never in `docs/`.

**RED-04 (check-phase-30):**
- D-02/D-03: A v1.3 frozen pin is mechanically feasible but rejected as vacuous (permanently-true
  by construction) — not pursued.
- D-04: V-30-01's successor asserts the Routing-Verification **table** (≥3 rows, IOS1/IOS2/IOS3
  present, the `**LOCKED — 23 (nodes + labeled edges)**` literal present) — NOT a distinct-`IOS\d+`
  count, which passes vacuously with the table deleted.
- D-05: Do not write `LOCKED — N leaves` (the STD-04 D-03 generic pattern) — the file's actual
  literal is `LOCKED — 23 (nodes + labeled edges)`; assert what the file says.
- D-06: V-30-10's root cause is `600eabd6` (Phase 40-01, v1.4 — Android added to the platform
  enum), NOT Phase 114 D-07. Record this cause, not the (73-phase-wrong) inherited attribution.
- D-07: V-30-10 and V-31-25 are NOT the same assertion. Make **both** successors line-anchored on
  the author-guidance **comment line**, not the frontmatter `platform:` line.
- D-08: One leg only — assert iOS present in the template's author-guidance enum. Drop the "C17's
  D1 map" leg (C17 assertion #10 runs unconditionally on all 234 enrolled files — can never fail).
- D-09: Cite the supersession cause in the successor validator (a code comment, since both files
  are CARVE Category 5, already authorized).
- D-35 (OWNER-RATIFIED): V-30-02 (the `[sS]` vacuous-regex bug) gets a **SUCCESS-CRITERION
  AMENDMENT extending RED-04** — the original ROADMAP SC#1 text names only the two other
  assertions; extend it, then fix the regex. "An amendment, not a bug fix, is the instrument" —
  meaning the amendment authorizes the fix, it does not replace it.

**RED-05 (check-phase-31):**
- D-13 (OWNER-RATIFIED): the npx external checks **FAIL, not SKIP**, on `ubuntu-latest`. Repair
  the `isMissing` classifier by adding an arm matching npm's actual observed text, then adopt.
- D-14: the `CHECK_PHASE_NESTED=1` skip proposal is WITHDRAWN — both files carry zero
  `CHECK_PHASE_NESTED` tokens; would manufacture a new vacuous-assertion class.
- D-20: SC#2's resolver-only mechanism is INSUFFICIENT — additive amendment required. The fixture
  resolves correctly via `resolveArchivedPhasePath`, but the target line moved 182→259.
- D-21: Content anchor on **presence**, not uniqueness — an "exactly once" clause re-breaks the
  moment a future EEE retrofit quotes the bullet elsewhere.
- D-22: Rule explicitly (in-plan) on whether the section move (Step-3 → "iOS-Specific Timing
  Considerations") satisfies D-23's intent. Also rename the check's `name` string — it embeds
  "line 182".
- D-23: Keep the `_missing`-style discriminator (required by V-68-08), delete the "so V-68-08
  stays satisfied" stated reason (V-68-08 is not at risk under any V-31-23 rewrite). V-31-23 needs
  its **own** `resolveArchivedPhasePath` call site — the existing one at `:33` is inside
  `parseInventory()`, not reusable.
- D-24 (OWNER-RATIFIED): V-31-29 gets the same instrument as the Area-1 supersessions. (a) Fix the
  metric — `31-VALIDATION.md:69` mandates `wc -l`; code implements `split('\n').length` = `wc -l`
  + 1. (b) Re-derive runbook 14's target band — the documented target bands (`~160-180` etc.)
  reconcile **exactly** with the code's existing `±15%`-derived bounds; **widening the ceiling is
  explicitly WITHDRAWN** as the mechanism. See "The V-31-29 tension" below for the concrete
  resolution this research recommends.

**RED-06 (chain adoption):**
- D-10: `check-phase-138.mjs` is OFF the CARVE allowlist — land a CARVE amendment for it, alone
  and first (touches only `v1.20-CARVE.md`).
- D-11: Mechanism is `CHAIN_EXTRA = [30, 31]`, concatenated into the check loop, **excluded** from
  the three span invariants (dedup/length/termini). Adopt no other leg (no CI jobs of their own,
  no `CHECK_PHASE_NESTED` skip). Rule explicitly that a literal `CHAIN_EXTRA` sidecar satisfies
  HARN-18's "generated by arithmetic, never transcribed," because `CHAIN_PHASES` itself stays pure
  arithmetic.
- D-12: Adoption lands **strictly after** RED-04/RED-05 and V-31-23/29 are green (splicing at HEAD
  today reds the apex: 93 PASS/2 FAIL).
- D-15: DO NOT amend the "+0.35s on ~17s apex" figure — it is correct, four independent sessions
  confirmed it, and `141-EVIDENCE.md:276-281` explicitly grandfathers it.
- D-16: Record the cold first-run figure as a separate row (33 278/50 419/63 176 ms across three
  agents) — high variance, never quote a single value; declare tree identity.
- D-17: RED-07 baseline already recorded — `check-phase-68` = 33 PASS/0 FAIL/0 SKIPPED. V-68-04 is
  a floor (adding an import can't break it); V-68-08 is a bare whole-file `_missing` check already
  satisfied at 4 sites no V-31-23 rewrite touches. **The GOV-02 grep is still mandatory.**
- D-18: GOV-02 ledger row per edited frozen path — **three** paths this phase (`check-phase-30`,
  `check-phase-31`, `check-phase-138`), not one. Grep must be **target-scoped** (the file-path
  string), not symbol-scoped.
- D-19: Commit sequence is fixed: (1) SC-amendment commit → (2) CARVE amendment commit touching
  **only** `v1.20-CARVE.md` → (3) the edits.

**NEST-01 (cold-clone threshold):**
- D-25 (OWNER-RATIFIED): `[48..138]` is a **drafting error** at three ratified sites
  (`REQUIREMENTS.md:67,83`, `PROJECT.md:25`) — correct to `[48..143]` (Phase 144's apex will be
  `check-phase-144` = `[48..143]`, 96 entries). Annotate-not-overwrite.
- D-26: DELETE the draft's "honest limitation" — the cold-clone contradiction was manufactured by
  comparing against the wrong warm baseline (that session's own warm apex was 14s, not 23s).
- D-27: Restore all FOUR method elements — clone depth (full/`fetch-depth: 0` is the only
  admissible value), cache state, Defender state, runner — plus tree identity and `--verbose`
  declaration.
- D-28: Threshold is a **ratio at ≥8×** a declared same-tree same-session warm median (n≥3); the
  absolute-ceiling leg is dropped (no Windows CI runner exists to bind it to).
- D-29: Mechanism X is two-tier: (i) in-phase — publish the per-child marginal-cost table, name
  over-share children, disposition ADVISORY-RECORDED; (ii) structural — the frozen-aware
  `harness-run` checkout, attributed to CARVE-1/SWEEP-01 (Phases 139-144), **not** double-booked
  into Phase 142. The timeout-raise leg is WITHDRAWN (moves zero wall-clock cost).
- D-30: Disposition is Advisory and does NOT breach the milestone bar (`WINDOWS-CLONE-DEEPNEST-
  TIMEOUT-01` is not one of the two named dispositions the milestone must delete).
- D-31: DO NOT re-measure `check-phase-64` — already recorded, 30.6% of the 300 000ms cap, not a
  crossing candidate. `check-phase-66` at 386 235ms IS over cap (record for free, own no fix).
- D-32: Name the CI cold clone that already gates — every CI job's `actions/checkout@v4` at
  `fetch-depth: 0` onto a fresh runner is a genuine, already-operative cold clone.

**Document amendments (D-33/D-34):**
- Use both Phase-141 marker shapes (`[DISCHARGED, D-NN]` / `[SUCCESS-CRITERION AMENDMENT, D-NN]`)
  on the **seven** document surfaces carrying the `~17s`/`+0.35s` figures — but per D-15 those
  figures themselves are NOT amended, only marked as satisfied/discharged.
- Back-fill `v1.20-CARVE.md`'s "Recorded scope amendments" list with Phase 141's missing D-27/D-28
  bullets, in the **same commit** as this phase's own amendment bullets.
- `STATE.md`'s Phase-142 row is already clean — verified, no fix needed.

### Claude's Discretion
- Plan/atom decomposition, subject to D-19's commit sequence, D-12's adoption-last rule, and
  D-18's ledger-row-before-edit rule.
- Exact wording of the successor assertions in D-04/D-07/D-08, and of the new classifier arm in
  D-13, subject to `V-68-04`/`V-68-08` substring presence surviving.
- The re-derived band arithmetic in D-24(b), subject to the ±15%-per-endpoint rule reconciling.
- Whether the 8 pass-worded `detail` strings (`check-phase-31.mjs:47,53,56,59,74,83,95,119`) are
  fixed opportunistically where the check is already being rewritten, or recorded wholesale.
- Evidence-artifact format for the NEST-01 measurement and the per-child marginal-cost table.

### Deferred Ideas (OUT OF SCOPE — routed, not fixed here)
- `check-phase-31 --quick` silent skip-loss (`activeChecks` filter with no accounting).
- The 8 pass-worded FAIL details.
- `V-31-22`'s missing zero-file guard.
- `check-phase-30.mjs:45`'s unescaped-dot regex (`'-ios-.*\.md$'`).
- `carve-gate.mjs:445`'s `main()`-at-module-scope import hazard.
- The dead `required:` metadata (never read by either runner).
- The 13-workflow `pull_request.paths` cascade — lands on HARN-19's bar, Phase 144 input.
- `HARN-18`/`PROJECT.md:25`'s `[48..138]` consequence for Phase 144's `check-phase-144` authoring.
- `check-phase-66` at 386 235ms over the 300 000ms cap — record only, no owner.
- The unowned non-nested standalone-chain cost — needs its own future requirement.
- `audit-harness-v1.7-integrity.yml:95`'s stale `~102s` Windows reference.
- Seven stale `.claude/worktrees/agent-*/` copies of `check-phase-31.mjs` (untracked, not a repo
  defect).

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RED-04 | `check-phase-30` exits 0 standalone | "V-30-01/V-30-02/V-30-10 fixes" below — exact current code, exact successor shapes |
| RED-05 | `check-phase-31` exits 0 standalone, incl. V-31-23 via `resolveArchivedPhasePath(...,['v1.3-phases'])` | "V-31-23/V-31-25/V-31-29 fixes" below — exact current code, isMissing classifier repair |
| RED-06 | `check-phase-30`/`31` are members of the apex `CHAIN_PHASES` array and execute under it | "CHAIN_EXTRA mechanism" below — exact `check-phase-138.mjs` insertion point, CARVE amendment prerequisite |
| RED-07 | `check-phase-68`'s `V-68-04`/`V-68-08` still pass after the check-phase-31 edit | "check-phase-68 regression guard" below — both call-sites read verbatim, baseline recorded |
| NEST-01 | Cold-clone apex cost measured on Windows with method + threshold + "if over then X" rule | "NEST-01 evidence shape" below — Axis-1 method template, ratio-threshold formula, Mechanism-X disposition |

</phase_requirements>

## Summary

This phase touches exactly three files under governance authorization: `scripts/validation/
check-phase-30.mjs`, `scripts/validation/check-phase-31.mjs`, and `scripts/validation/
check-phase-138.mjs` (the apex). The first two are already on the v1.20 CARVE allowlist (Category
5); the third is not and needs a CARVE amendment landed alone and first, per D-10/D-19. No corpus
document changes — every one of the five (now six) failing assertions is a validator bug or a
successor-shape gap left behind by a later ratified corpus decision, never a wrong document.

The concrete work has four independent code changes plus one governance/documentation track:
1. **check-phase-30.mjs**: fix the `[sS]`-regex bug (V-30-02, now in RED-04's amended scope via
   D-35), rewrite V-30-01 to assert the Routing-Verification table's shape instead of a vacuous
   Mermaid-diamond count, rewrite V-30-10 to a line-anchored comment-enum check, and add one new
   `isMissing` classifier arm to both npx call sites.
2. **check-phase-31.mjs**: give V-31-23 its own `resolveArchivedPhasePath(..., ['v1.3-phases'])`
   call site plus a presence-only content anchor (not the brittle `lines[181]` index), rewrite
   V-31-25 to the same line-anchored comment-enum shape as V-30-10, switch V-31-29's metric to a
   `wc -l` equivalent, and add the matching `isMissing` classifier arm to V-31-30.
3. **check-phase-138.mjs**: after (1) and (2) are both green, add a hand-authored `CHAIN_EXTRA =
   [30, 31]` array concatenated into the chain-check loop but excluded from `CHAIN_PHASES` itself
   (keeping the three module-load guards pure arithmetic).
4. **Re-run check-phase-68.mjs** (RED-07) after the check-phase-31 edit to confirm `V-68-04`/
   `V-68-08` still pass — both are cheap and structurally can't be broken by this edit shape, but
   the GOV-02 grep-before-edit discipline is still mandatory procedure, not optional insurance.
5. **NEST-01**: an independent Axis-1-style fresh-clone measurement (`git clone --no-hardlinks`),
   producing a same-tree same-session warm median (n≥3), a ≥8× ratio threshold, and a two-tier
   Mechanism-X disposition that does not double-book Phase 139's already-landed `fetch-depth: 0`
   work.

**Primary recommendation:** sequence the plan as SC-amendment commit → CARVE-amendment commit
(check-phase-138.mjs added to allowlist, alone) → check-phase-30.mjs fixes → check-phase-31.mjs
fixes → re-verify check-phase-68.mjs → CHAIN_EXTRA adoption in check-phase-138.mjs → NEST-01
measurement (can run in parallel with any of the above, since it has no code dependency).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Standalone validator correctness (RED-04/05) | Validator/Tooling (`scripts/validation/check-phase-{30,31}.mjs`) | Corpus (`docs/`, read-only input) | Every fix is a code change to the check's `run()` function; the corpus is read, never written |
| Chain membership/execution (RED-06) | Validator/Tooling (`check-phase-138.mjs`, the apex) | Governance (`v1.20-CARVE.md` allowlist) | The apex owns chain execution mechanics; CARVE governs authorization to edit the apex file at all |
| Regression guard integrity (RED-07) | Validator/Tooling (`check-phase-68.mjs`) | — | Self-contained guard validator with no external dependency beyond reading the two edited files' source text |
| Cold-clone cost measurement (NEST-01) | CI/CD (`git clone`, GitHub Actions `actions/checkout@v4`) | Validator/Tooling (`check-phase-138.mjs` under `CHECK_PHASE_NESTED`) | The cost originates in clone I/O + cold Node subprocess spawns; the apex is the thing being timed, not the thing producing the cost |
| Governance authorization (GOV-02 ledger, CARVE amendment) | Governance (`.planning/milestones/*.md`) | — | Deliberately excluded from `carve-gate.mjs`'s diff scope by design (D-09) — pure documentation, never gated |

## Standard Stack

No new dependency. This phase edits three existing Node.js (ESM, `node:` builtins only) validator
scripts already in the repo. `[VERIFIED: scripts/validation/check-phase-30.mjs:1-9,
scripts/validation/check-phase-31.mjs:1-10, scripts/validation/check-phase-138.mjs:81-86]` — all
three import only `node:fs`, `node:path`, `node:child_process`, `node:process`, and this repo's
own `_lib/archive-path.mjs` / `_lib/exec-fail-detail.mjs`. No `npm install` step is part of this
phase's own deliverable — the `npx markdown-link-check` / `npx @mermaid-js/mermaid-cli` call sites
already exist and are unchanged except for one new string-match arm in their error classifier.

## Package Legitimacy Audit

**Not applicable.** This phase installs no external packages. The `npx` invocations of
`markdown-link-check` and `@mermaid-js/mermaid-cli` are pre-existing call sites
`[VERIFIED: scripts/validation/check-phase-30.mjs:269,282, scripts/validation/
check-phase-31.mjs:134]`; the only change to them is a new string literal added to an existing
`isMissing` classifier — not a new dependency, not a new registry lookup.

## Architecture Patterns

### System flow: how this phase's edits reach CI

```
Developer edit (check-phase-30/31/138.mjs)
        |
        v
Local: node scripts/validation/check-phase-{30,31}.mjs [--verbose]   <- standalone exit-0 proof (RED-04/05)
        |
        v
Local: node scripts/validation/check-phase-68.mjs                    <- RED-07 regression guard
        |  (grep V-68-04's 5 CALL_SITES + V-68-08's _missing marker survive)
        v
Local: node scripts/validation/carve-gate.mjs                        <- GOV-01 allowlist gate
        |  (must show check-phase-138.mjs on-list -- requires the CARVE
        |   amendment commit to have landed first, per D-19)
        v
Local: node scripts/validation/check-phase-138.mjs [--verbose]       <- apex proof: 30/31 fire
        |  (CHAIN_EXTRA = [30, 31] concatenated into the check loop)
        v
git commit (per D-19's 3-step ordering) -> push -> CI
        |
        v
GitHub Actions: actions/checkout@v4 (fetch-depth: 0, a genuine cold clone every run, per D-32)
        |
        v
audit-harness-v1.19-integrity.yml: check-phase-138 job runs the apex on ubuntu-latest
        |  (D-13's isMissing fix is what keeps V-30-13/V-31-30 SKIP instead of FAIL HERE --
        |   Windows ENOENT already masks the defect locally; only ubuntu-latest exposes it)
        v
Green apex on the authoritative Linux runner class (D-03's OS split)
```

### Commit sequencing (D-19) — the CARVE amendment procedure

`.planning/milestones/v1.20-CARVE.md:64-77` (Amendment procedure, D-09 in that document) governs
any edit to the allowlist. `[VERIFIED: .planning/milestones/v1.20-CARVE.md:66-77]`:

> "An amendment to the allowlist below is a commit that: 1. Touches **only** this file
> (`.planning/milestones/v1.20-CARVE.md`) — no other path, in-scope or out-of-scope, may be
> touched in the same commit. 2. Carries a one-line rationale... 3. Lands **before** the edit it
> authorizes — never in the same commit, never after."

`142-CONTEXT.md` D-19 fixes the phase's own 3-step order on top of this: **(1) SC-amendment
commit → (2) CARVE amendment commit (touching only `v1.20-CARVE.md`) → (3) the edits.** Concretely
for this phase:

1. **Commit 1 (SC-amendment).** Touches `ROADMAP.md`, `REQUIREMENTS.md`, `PROJECT.md`, `STATE.md`
   — the D-25 `[48..138]`→`[48..143]` fix, D-20's SC#2 additive amendment, D-35's RED-04 extension
   to cover V-30-02, and the `[DISCHARGED, D-NN]` / `[SUCCESS-CRITERION AMENDMENT, D-NN]` markers
   on the seven `~17s`/`+0.35s` surfaces (annotate, do not delete text — D-15 forbids amending the
   figures themselves).
2. **Commit 2 (CARVE amendment).** Touches **only** `.planning/milestones/v1.20-CARVE.md`: add
   `scripts/validation/check-phase-138.mjs` to the Category 5 glob list (currently absent —
   `[VERIFIED: .planning/milestones/v1.20-CARVE.md:178-197]`, the block lists `check-phase-30.mjs`
   through `check-phase-70.mjs` but never `check-phase-138.mjs`), and append the D-33 "Recorded
   scope amendments" bullets for this phase plus the back-filled Phase-141 D-27/D-28 bullets (the
   existing list at `:114-134` has zero D-28 hits, confirmed `[VERIFIED: grep -c "D-28"
   v1.20-CARVE.md returns 0 today]` — both edits are still "only this file," so they can be one
   commit).
3. **Commit(s) 3 (the edits).** `check-phase-30.mjs`, `check-phase-31.mjs`, then — strictly after
   both are verified green (D-12) — `check-phase-138.mjs`'s `CHAIN_EXTRA` splice. Each frozen-path
   edit needs its own GOV-02 ledger row (see below) added at or before this commit; the ledger
   file is `.planning/`-scoped and therefore outside `carve-gate.mjs`'s diff scope entirely
   (`[VERIFIED: .planning/milestones/v1.20-CARVE.md:46-51]`, `IN_SCOPE_PREFIXES = ['scripts/',
   '.github/', 'docs/']` plus two exact paths — `.planning/` is not in that list), so the ledger
   row can land in the same commit as the code edit it documents without tripping the gate.

Verified this session: `carve-gate.mjs` currently reports `in-scope=44 on-list=44 off-list=0`,
exit 0 `[VERIFIED: live run this session, node scripts/validation/carve-gate.mjs, base=
a7bda73e23efc5e3f9607c3fef37abf8ec4030aa]` — confirming `check-phase-138.mjs` really is absent
from in-scope changes today (it hasn't been touched yet) and the gate is otherwise clean, a safe
starting point for the plan.

### GOV-02 ledger mechanics (D-18)

Row schema, read verbatim from `.planning/milestones/v1.20-GOV-02-LEDGER.md:21`
`[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:19-26]`:

> `| File | Grep command | Hit count | Regression gate run | Result | Plan |`

Discipline (same file, `:8-17`): append-only, one row per **edit** (not per path — two edits to
the same path across two plans get two rows), and "a plan that modifies no frozen-surface path
adds no row here... that absence is the correct outcome."

The grep must be **target-scoped** — a path-string grep, not only a symbol grep. Model
`[VERIFIED: .planning/milestones/v1.20-CARVE.md:95-112]`:

> "Every GOV-02 grep before editing a frozen validator line must be target-scoped, not
> symbol-scoped: it must search for the file path string, not only the symbol/identifier name...
> Before editing any frozen validator or workflow file in this milestone, grep for both forms —
> the symbol AND the path string — and record the result as a row."

For this phase, **three paths need a row each**, per D-18: `check-phase-30.mjs`,
`check-phase-31.mjs`, `check-phase-138.mjs`. Concrete grep commands, both target-scoped and
symbol-scoped, per file:

```bash
# check-phase-30.mjs
grep -rn "check-phase-30\.mjs" scripts/validation/ .github/workflows/
grep -rn "V-30-0[12]\|V-30-10" scripts/validation/

# check-phase-31.mjs
grep -rn "check-phase-31\.mjs" scripts/validation/ .github/workflows/
grep -rn "V-31-23\|V-31-25\|V-31-29\|V-31-30\|_missing" scripts/validation/

# check-phase-138.mjs
grep -rn "check-phase-138\.mjs" scripts/validation/ .github/workflows/
grep -rn "CHAIN_PHASES\|CHAIN_EXTRA\|CHAIN_START\|CHAIN_END" scripts/validation/
```

Known live example from the same ledger (Phase 139, `[VERIFIED: .planning/milestones/
v1.20-GOV-02-LEDGER.md:23]`, target-scoped grep for `REQUIREMENTS.md`/`ROADMAP.md`): the ledger
row's "Result" column is a narrative PASS/FAIL sentence citing the actual command re-run and its
tally, not a bare boolean — follow that shape.

One relevant precedent already surfaced by the grep-before-edit discipline: `check-phase-68.mjs`
itself pins `check-phase-31.mjs`'s exact path string at two call sites (`V-68-04`'s `CALL_SITES`
array and `V-68-08`'s `_missing` check, both read verbatim below) — this is precisely the "later
frozen validator pins an earlier one's exact call-site string" hazard GOV-02 exists to catch, and
it is already accounted for by RED-07's own scope.

### The amendment surfaces (D-33) — exact file:line list

The `~17s`/`+0.35s` figures live on **seven** surfaces and must carry a `[DISCHARGED, D-NN]` or
`[SUCCESS-CRITERION AMENDMENT, D-NN]` marker (never edited in value, per D-15):
`ROADMAP.md` Phase 142 SC#3 and SC#5, `REQUIREMENTS.md:46`, `REQUIREMENTS.md:69`,
`STATE.md:129-131`, `STATE.md:305`, `PROJECT.md:954` (per `142-CONTEXT.md` D-33 — treat these
seven citations as authoritative; re-grep them at plan time since line numbers drift as the docs
accumulate content between phases).

Additionally amended (with real content changes, not just markers):
- `ROADMAP.md` Phase 142 SC#1 — extend to name V-30-02 (D-35).
- `ROADMAP.md` Phase 142 SC#2 — additive amendment for the D-20 content-anchor mechanism.
- `REQUIREMENTS.md:67` (NEST-01) and `REQUIREMENTS.md:83` (HARN-18) — `[48..138]`→`[48..143]`
  (D-25).
- `PROJECT.md:25` — same `[48..138]`→`[48..143]` fix.
- `.planning/milestones/v1.20-CARVE.md` "Recorded scope amendments" — new bullets for this
  phase's amendments plus the back-filled Phase-141 D-27/D-28 bullets (D-33).

**Re-grep every cited line number at plan time** — this research reads them from `142-CONTEXT.md`
`[CITED: 142-CONTEXT.md D-33]`, not by re-opening each target file this session (out of the
research-focus budget for a phase this document-heavy); the planner's Wave 0 should confirm each
line still holds the described text before writing the exact edit action.

### The successor assertion shapes (V-30-01, V-30-02, V-30-10, V-31-23, V-31-25, V-31-29)

All code below is read verbatim this session; current line numbers are exact at the cited commit.

**V-30-01** (`id: 1`) `[VERIFIED: scripts/validation/check-phase-30.mjs:50-62]`:
```js
{
  id: 1, name: "Decision tree <=5 decision-diamond nodes",
  type: "file-match-count", required: true,
  run() {
    const content = readFile("docs/decision-trees/07-ios-triage.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/07-ios-triage.md" };
    const matches = content.match(/^\s*IOS\d+\{/gm) || [];
    const count = matches.length;
    if (count >= 1 && count <= 5) return { pass: true, detail: count + " decision-diamond node(s) found" };
    return { pass: false, detail: "Expected 1-5 decision-diamond nodes, found " + count };
  }
}
```
This regex matches Mermaid `IOS1{...}` diamond syntax, which no longer exists in the file (Phase
122 converted it to a text table). `count` is always 0 today. `07-ios-triage.md`'s actual current
content, read this session `[VERIFIED: docs/decision-trees/07-ios-triage.md:33,35-49]`:
- Line 33: `` **LOCKED — 23 (nodes + labeled edges)** — 12 nodes + 11 labeled edges, independently re-derived from the pre-conversion decision graph (`git show 71be4ab`). All 3 diamonds (IOS1, IOS2, IOS3) are represented below; ... ``
- Line 35 heading: `## Routing Verification`
- Lines 39-48: a markdown table with header `| Path | Step 1 | Step 2 | Destination |`, a
  separator row, and **9 data rows** (APNs expired / ADE not starting / Enrollment restriction
  blocking / License invalid / Device cap reached / Compliance blocked / Profile-config-app /
  Other-unclear-not-visible / Other-unclear-visible).

**Important finding, verified this session (not present in `142-CONTEXT.md`'s own prose, but
consistent with its intent):** the literal tokens `IOS1`, `IOS2`, `IOS3` (without the trailing
`E`) appear **only** in the prose sentences at lines 33 and 37 — `grep -n "IOS1\|IOS2\|IOS3"
docs/decision-trees/07-ios-triage.md` returns exactly those two lines, zero hits inside the table
cells at lines 39-48 `[VERIFIED: live grep this session]`. D-04's phrase "each of IOS1/IOS2/IOS3
appears as table content" is therefore satisfiable only if the check treats the "## Decision
Tree" + "## Routing Verification" section (which includes lines 33 and 37) as the assertion
scope, not literally each table `<td>` cell. This exact-wording choice is explicitly Claude's
Discretion (`142-CONTEXT.md` Claude's Discretion bullet 2). Recommended successor shape:

```js
{
  id: 1, name: "07-ios-triage.md Routing Verification table has >=3 rows with IOS1/IOS2/IOS3 and the LOCKED literal",
  type: "structural", required: true,
  run() {
    const content = readFile("docs/decision-trees/07-ios-triage.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/07-ios-triage.md" };
    const hasLocked = content.includes("**LOCKED — 23 (nodes + labeled edges)**");
    const hasIOS = ["IOS1", "IOS2", "IOS3"].every(tok => content.includes(tok));
    const tableMatch = content.split(/^## Routing Verification\s*$/m)[1];
    const rowCount = tableMatch
      ? (tableMatch.split(/^## /m)[0].match(/^\|.*\|\s*$/gm) || []).length - 2 // minus header + separator
      : 0;
    const pass = hasLocked && hasIOS && rowCount >= 3;
    return { pass, detail: `LOCKED=${hasLocked} IOS-tokens=${hasIOS} table-rows=${rowCount}` };
  }
}
```
(Illustrative — the planner should verify the exact row-count regex against the live table shape
before committing to it; markdown table row-counting via regex is fragile to embedded `|`
characters in cell content, none of which are present in this table today per the verbatim quote
above.)

**V-30-02** (`id: 2`) `[VERIFIED: scripts/validation/check-phase-30.mjs:63-78]`:
```js
{
  id: 2, name: "Single-branch integration (00-initial-triage no iOS in Mermaid)",
  type: "file-absent-match", required: true,
  run() {
    const content = readFile("docs/decision-trees/00-initial-triage.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/00-initial-triage.md" };
    const mermaidBlocks = [];
    const re = new RegExp("```mermaid\n([\s\S]*?)\n```", "g");
    let m;
    while ((m = re.exec(content)) !== null) mermaidBlocks.push(m[1]);
    const blockText = mermaidBlocks.join("\n");
    const hits = (blockText.match(/iOS|iPadOS|IOS\d+/gi) || []).length;
    if (hits === 0) return { pass: true, detail: "No iOS/IOS tokens inside Mermaid block" };
    return { pass: false, detail: "Found " + hits + " iOS/IOS token(s) inside Mermaid block -- violates SC #2" };
  }
}
```
Bug (confirmed by direct read, matches `142-CONTEXT.md` D-35's description exactly): inside the
**double-quoted JS string** literal passed to `new RegExp(...)`, `\s` and `\S` are not recognized
JS string escapes, so the backslash is dropped and only the bare letters `s`/`S` survive — the
resulting `RegExp` source is `` ```mermaid\n([sS]*?)\n``` `` (character class `[sS]`, matching
only literal `s`/`S` characters, not "any character" as `[\s\S]` intends). `blockText` has
therefore always been `''`; `hits` is always `0`; the check has never inspected a real Mermaid
block. Minimal fix — replace the string-constructed `RegExp` with a regex literal, which sidesteps
the double-escaping trap entirely:
```js
const re = /```mermaid\n([\s\S]*?)\n```/g;
```
D-35 (owner-ratified) requires this fix be paired with a `[SUCCESS-CRITERION AMENDMENT]` on
ROADMAP Phase 142 SC#1 (the original text names only the diamond-count and template-literal
defects, not this one) — land the amendment commit (Commit 1) before this fix, not after.

**V-30-10** (`id: 10`) `[VERIFIED: scripts/validation/check-phase-30.mjs:185-194]`:
```js
{
  id: 10, name: "l1-template.md contains Windows | macOS | iOS | all",
  type: "file-contains", required: true,
  run() {
    const content = readFile("docs/_templates/l1-template.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/_templates/l1-template.md" };
    if (content.includes("Windows | macOS | iOS | all")) return { pass: true, detail: "Enum string present" };
    return { pass: false, detail: "\"Windows | macOS | iOS | all\" not found in l1-template.md" };
  }
}
```
`docs/_templates/l1-template.md`'s actual current author-guidance comment, read this session
`[VERIFIED: docs/_templates/l1-template.md:12-13]`:
```
     - Set platform to the appropriate D1-mapped value — replace 'all' if this runbook covers a
       specific platform. Valid values: Windows | macOS | iOS | Android | Linux | all
```
The literal `"Windows | macOS | iOS | all"` cannot match because `Android | Linux` sits between
`iOS` and `all` — this is exactly Phase 40-01's (`600eabd6`) Android addition (D-06). Recommended
successor, line-anchored on the comment line per D-07/D-08:
```js
{
  id: 10, name: "l1-template.md author-guidance enum includes iOS",
  type: "structural", required: true,
  run() {
    const content = readFile("docs/_templates/l1-template.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/_templates/l1-template.md" };
    const ok = /^\s*specific platform\. Valid values: Windows \| macOS \| iOS \| Android \| Linux \| all\s*$/m.test(content);
    return { pass: ok, detail: ok ? "iOS present in author-guidance enum" : "author-guidance enum line not found or iOS missing" };
  }
}
```
Cite the supersession cause in a code comment per D-09: `// V-30-10 supersedes the pre-Android
enum removed at 600eabd6 (Phase 40-01, v1.4)`.

`docs/_templates/l2-template.md`'s comment block is byte-identical in shape
`[VERIFIED: docs/_templates/l2-template.md:12-13]` (same two lines, same enum) — the V-31-25
successor below reuses the identical regex against the sibling file, which is exactly what D-07
means by "make both successors line-anchored... so the two validators stop diverging."

**V-31-23** (`id: 23`) `[VERIFIED: scripts/validation/check-phase-31.mjs:111-113]`:
```js
// V-31-23: D-23 prose diff against expected-d23.txt
{ id: 23, name: "V-31-23: 06-compliance-policy.md line 182 matches expected-d23.txt", type: "structural", required: true,
  run() { const c = readFile('docs/admin-setup-ios/06-compliance-policy.md'); const expected = readFile('.planning/phases/31-ios-l2-investigation/expected-d23.txt'); if (!c || !expected) return { pass: false, detail: "file or fixture missing" }; const lines = c.split('\n'); const actual = (lines[181] || '').trim(); const exp = expected.trim(); return { pass: actual === exp, detail: actual === exp ? "match" : `MISMATCH — actual[0:80]='${actual.slice(0,80)}' expected[0:80]='${exp.slice(0,80)}'` }; } }
```
Two defects: (1) `expected-d23.txt` is read via the bare `readFile()` helper against the live
`.planning/phases/...` path, which returns `null` post-archival (the phase directory moved to
`.planning/milestones/v1.3-phases/...`) — needs its own `resolveArchivedPhasePath` call, not a
reuse of `parseInventory()`'s internal one at `:33` (D-23). (2) `lines[181]` (0-indexed line 182)
no longer holds the target prose — it moved to line 259 under a different heading (D-20/D-22).

Verified this session, both files' exact content:
- Fixture `[VERIFIED: .planning/milestones/v1.3-phases/31-ios-l2-investigation/
  expected-d23.txt:1]`: `` - **No MDM diagnostic tool on iOS:** Unlike Windows, iOS has no
  `mdmdiagnosticstool.exe` equivalent. L2 diagnosis of a stuck compliance state uses [iOS Log
  Collection](../l2-runbooks/14-ios-log-collection.md) (three methods: MDM diagnostic report,
  Company Portal upload, Mac+cable sysdiagnose) followed by [Compliance & CA Timing
  Investigation](../l2-runbooks/17-ios-compliance-ca-timing.md). ``
- Target `[VERIFIED: docs/admin-setup-ios/06-compliance-policy.md:256-259]`, under `###
  iOS-Specific Timing Considerations` (line 256): line 259 is **byte-identical** to the fixture
  above (confirmed by direct comparison this session).

Recommended successor (own call site, presence not uniqueness, distinguishes resolver-null from
content-mismatch per D-23):
```js
{
  id: 23, name: "V-31-23: expected-d23.txt prose present in 06-compliance-policy.md",
  type: "structural", required: true,
  run() {
    const targetRel = resolveArchivedPhasePath('31-ios-l2-investigation/expected-d23.txt', ['v1.3-phases']);
    if (targetRel === null) return { pass: false, _missing: true, detail: "expected-d23.txt not resolvable at .planning/phases/ or .planning/milestones/v1.3-phases/" };
    const expected = readFile(targetRel);
    if (!expected) return { pass: false, _missing: true, detail: "expected-d23.txt resolved but unreadable" };
    const c = readFile('docs/admin-setup-ios/06-compliance-policy.md');
    if (!c) return { pass: false, detail: "docs/admin-setup-ios/06-compliance-policy.md missing" };
    const present = c.includes(expected.trim());
    return { pass: present, detail: present ? "expected D-23 prose present in 06-compliance-policy.md" : "expected D-23 prose not found anywhere in the file" };
  }
}
```
D-22's open question ("does the current location satisfy D-23's intent?") is answered in-plan by
this research as **yes** — the prose exists verbatim, unmoved in substance, only relocated during
Phase 122's EEE reorganization (same class of later-ratified-decision supersession as V-30-01/
V-30-10). Also rename the check's `name` string (it currently embeds "line 182" — D-22's own note
that this changes the apex's printed output line).

**V-31-25** (`id: 25`) `[VERIFIED: scripts/validation/check-phase-31.mjs:117-119]`:
```js
// V-31-25: D-27 L2 template enum
{ id: 25, name: "V-31-25: L2 template platform enum includes iOS", type: "grep", required: true,
  run() { const c = readFile('docs/_templates/l2-template.md'); if (!c) return { pass: false, detail: "l2-template.md missing" }; return { pass: /^platform: Windows \| macOS \| iOS \| all$/m.test(c), detail: "enum present" }; } }
```
This tests a **frontmatter `platform:` line** for a pipe-enum that never exists there (frontmatter
`platform:` is always a single value, `all` — `[VERIFIED: docs/_templates/l2-template.md:28]`,
`platform: all`). The actual pipe-enum lives in the comment guidance line 13, identical in shape
to l1-template's. Recommended successor — same regex as V-30-10's, applied to `l2-template.md`:
```js
{
  id: 25, name: "V-31-25: l2-template.md author-guidance enum includes iOS",
  type: "structural", required: true,
  run() {
    const c = readFile('docs/_templates/l2-template.md');
    if (!c) return { pass: false, detail: "l2-template.md missing" };
    const ok = /^\s*specific platform\. Valid values: Windows \| macOS \| iOS \| Android \| Linux \| all\s*$/m.test(c);
    return { pass: ok, detail: ok ? "iOS present in author-guidance enum" : "author-guidance enum line not found or iOS missing" };
  }
}
```

**V-31-29** (`id: 29`) `[VERIFIED: scripts/validation/check-phase-31.mjs:129-131]`:
```js
// V-31-29: runbook length bounds — '17' lower bound widened 187→170 for safety margin (IN-06)
{ id: 29, name: "V-31-29: Runbook line counts within ±15% of targets", type: "structural", required: false,
  run() { const bounds = { '14': [136, 207], '15': [187, 322], '16': [161, 241], '17': [170, 287] }; const runbooks = resolveL2Runbooks(); const failures = []; for (const r of runbooks) { if (!r.path) { failures.push(`${r.num}: missing`); continue; } const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n'); const n = c.split('\n').length; const [lo, hi] = bounds[r.num]; if (n < lo || n > hi) failures.push(`${r.num}: ${n} lines (bound ${lo}-${hi})`); } return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all within bounds" }; } }
```
Confirmed measurements this session (read-only, `wc -l` and a Node `split('\n').length` probe,
no files modified) `[VERIFIED: live measurement this session]`:

| Runbook | `wc -l` | `split('\n').length` | Current bound (`[lo,hi]`) | Status under current bound + split metric |
|---|---|---|---|---|
| 14 | 215 | 216 | [136, 207] | **FAIL** (216 > 207, and 215 > 207 too) |
| 15 | 211 | 212 | [187, 322] | PASS |
| 16 | 195 | 196 | [161, 241] | PASS |
| 17 | 200 | 201 | [170, 287] | PASS |

**The V-31-29 tension (resolved recommendation, not an open question).** D-24(a)'s metric fix
(switch `split('\n').length` to a `wc -l`-equivalent, i.e. `split('\n').length - 1`) changes
runbook 14's measured count from 216 to 215 — still 8 over the existing ceiling of 207.
`142-CONTEXT.md` D-24(b) explicitly confirms the documented target band (`~160-180`) reconciles
**exactly** with the code's current bound (`0.85×160=136`, `1.15×180=207`) and explicitly
withdraws "widen the upper bound" as the fix mechanism, citing "amending the content-size
contract... with nothing counter-ratcheting." Taken together, these two rulings mean: **after
applying only the metric fix, runbook 14 genuinely still fails, and CONTEXT.md rules out both
available escapes (corpus edit is barred by D-01; ceiling-widening is barred by D-24(b)).**

Recommended resolution, consistent with the same "successor assertion" instrument used for
V-30-01/V-30-10/V-31-25 and with the D-33 marker convention this phase already uses for V-30-02:
restructure V-31-29 to report **per-runbook**, not one monolithic AND across all four, and pair
the code change with a `[SUCCESS-CRITERION AMENDMENT, D-24]` on ROADMAP Phase 142 SC#2 recording
that runbook 14's overage is a **named, caused, accepted deviation** (cite commits `114973ba` then
`956818a0`, Phase 116-07's EEE retrofit, +20 lines) rather than either a silent pass or a
milestone-blocking fail:
```js
{
  id: 29, name: "V-31-29: Runbook line counts within +/-15% of targets (wc -l equivalent; runbook 14 recorded exception, see D-24)",
  type: "structural", required: true,
  run() {
    const bounds = { '14': [136, 207], '15': [187, 322], '16': [161, 241], '17': [170, 287] };
    const KNOWN_EXCEPTION = { '14': 'Phase 116-07 EEE retrofit (+20 lines, 114973ba then 956818a0) -- recorded per D-24, not corrected here' };
    const runbooks = resolveL2Runbooks();
    const failures = [];
    for (const r of runbooks) {
      if (!r.path) { failures.push(`${r.num}: missing`); continue; }
      const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n');
      const n = c.split('\n').length - 1; // wc -l equivalent, per 31-VALIDATION.md:69
      const [lo, hi] = bounds[r.num];
      if (n < lo || n > hi) {
        if (KNOWN_EXCEPTION[r.num]) continue; // recorded, non-blocking per SC-amendment
        failures.push(`${r.num}: ${n} lines (bound ${lo}-${hi})`);
      }
    }
    return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all within bounds (runbook 14 exception per D-24 recorded, not corrected)" };
  }
}
```
This is presented as the default recommendation, not a locked decision — `142-CONTEXT.md`
explicitly grants "the re-derived band arithmetic in D-24(b)" as Claude's Discretion. If the
planner or a fresh `/adversarial-review` round disagrees with treating this as an SC-amendment
rather than, say, a routed deferral row (the pattern used for "the other six uncovered defects" in
the owner's ratification #1), that is a legitimate alternative — but either way the code must
change (the current monolithic-AND shape cannot pass without one of the two barred escapes).

### The `isMissing` classifier repair (D-13)

Three call sites, all read verbatim this session.

**check-phase-30.mjs, linkCheck arm** `[VERIFIED: scripts/validation/check-phase-30.mjs:267-279]`:
```js
try {
  execFileSync("npx", ["--yes", "--no-install", "markdown-link-check", ...linkTargets],
    { stdio: "pipe", timeout: 30000, cwd: process.cwd() });
  results.linkCheck = "PASS";
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : "";
  const isMissing = err.code === "ENOENT" || err.status === 127
    || stderr.includes("not found") || stderr.includes("Could not resolve")
    || stderr.includes("npm error could not determine executable");
  results.linkCheck = isMissing ? "SKIPPED" : "FAIL";
}
```
**check-phase-30.mjs, mermaid arm** `[VERIFIED: scripts/validation/check-phase-30.mjs:280-292]` —
identical `isMissing` predicate, second occurrence.

**check-phase-31.mjs, V-31-30** `[VERIFIED: scripts/validation/check-phase-31.mjs:134]`:
```js
{ id: 30, name: "V-31-30: markdown-link-check across new + retrofitted files", type: "external", required: false,
  run() { const targets = [...].filter(f => existsSync(join(process.cwd(), f))); if (targets.length === 0) return { pass: true, skipped: true, detail: "no files to check yet" }; try { execFileSync('npx', ['--yes', '--no-install', 'markdown-link-check', ...targets], { stdio: 'pipe', timeout: 30000, cwd: process.cwd() }); return { pass: true, detail: "all links resolve" }; } catch (err) { const stderr = err.stderr ? err.stderr.toString() : ''; const isMissing = err.code === 'ENOENT' || err.status === 127 || stderr.includes('not found') || stderr.includes('could not determine executable'); if (isMissing) return { pass: true, skipped: true, detail: "markdown-link-check unavailable" }; return { pass: false, detail: "link errors detected" }; } } }
```

On Windows, `execFileSync('npx', ...)` cannot run the `.cmd` shim without `shell: true`, so every
npx spawn in this tree throws `ENOENT` — the existing `isMissing` arms already catch that and
report SKIPPED locally, which is why RED-04/RED-05 can look green on a Windows dev machine while
still red on `ubuntu-latest`. On Linux CI, npx exists and actually runs, but both `--yes` and
`--no-install` are passed together and `--no-install` wins, producing (per `142-CONTEXT.md` D-13,
`[CITED: 142-CONTEXT.md D-13]` — not independently re-run this session, per the phase's own "do
not re-measure" discipline where the answer is already recorded): `npm error npx canceled due to
missing packages and no YES option`. No existing arm matches that text — `err.status` is `1`, not
`127`; the stderr doesn't contain `"not found"`, `"Could not resolve"`, or `"could not determine
executable"`.

**Fix — add one new arm to all three call sites**, matching npm's exact observed text:
```js
|| stderr.includes("npm error npx canceled due to missing packages and no YES option")
```
Applied, `check-phase-30.mjs`'s (both identical) predicates become:
```js
const isMissing = err.code === "ENOENT" || err.status === 127
  || stderr.includes("not found") || stderr.includes("Could not resolve")
  || stderr.includes("npm error could not determine executable")
  || stderr.includes("npm error npx canceled due to missing packages and no YES option");
```
`check-phase-31.mjs`'s V-31-30 predicate (note it already diverges from check-phase-30's — it
lacks the `"Could not resolve"` arm; reconciling that divergence is optional/opportunistic, not
required by D-13, but is a one-line zero-risk improvement if the check is already being touched):
```js
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('could not determine executable')
  || stderr.includes('npm error npx canceled due to missing packages and no YES option');
```

### `CHAIN_EXTRA` mechanism (D-11) — exact `check-phase-138.mjs` insertion

Full apex structure read this session `[VERIFIED: scripts/validation/check-phase-138.mjs:1-273,
full file]`. Relevant excerpt, current state:
```js
// Phase 138 chain-apex spans every integer 48..137 (137 - 48 + 1 = 90 entries).
// GENERATED by arithmetic, not hand-transcribed or copied from check-phase-134's 86-entry array (D-29).
const CHAIN_START = 48;
const CHAIN_END = 137; // [48..N-1] invariant for N=138: apex EXCLUDES its own phase (138).
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i);

const CHAIN_SKIP = new Set([]);

// De-duplication guard...
if (new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length) { throw new Error(...); }

// Programmatic bound assertions...
if (CHAIN_PHASES.length !== 90) { throw new Error(...); }
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 137) { throw new Error(...); }

const checks = [];
// ... V-138-AUDIT push ...

const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-138-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() { /* NESTED short-circuit, execFileSync, isMissing (ENOENT/127 only) */ }
  });
}
// ... V-138-AUDIT-HARNESS push ...
// ... V-138-SELF push: CHAIN_PHASES.includes(138) check, CHAIN_SKIP.size === 0 check ...
```
`CHAIN_PHASES` is asserted three ways at module-load time: dedup (`:114-116`), length===90
(`:120-122`), termini 48/137 (`:123-125`). All three must stay pure arithmetic per D-11 ("excluded
from the three span invariants"). The insertion point is the loop at `:157` — that is the only
place that needs to know about 30/31 at all. Recommended concrete diff:
```js
// After CHAIN_PHASES's three guards (do not touch CHAIN_PHASES itself or its guards):

// RED-06: pre-chain members archival-path-fixed and adopted in Phase 142. A literal, hand-authored
// sidecar array -- NOT part of the arithmetic CHAIN_PHASES span and NOT subject to its three
// module-load guards. Precedent for a hand-authored non-contiguous CHAIN_PHASES-adjacent array:
// check-phase-60.mjs (skips 50) and check-phase-62.mjs (skips 50). D-11 (142-CONTEXT.md): this
// satisfies HARN-18's "generated by arithmetic, never transcribed" because CHAIN_PHASES itself
// remains pure arithmetic; CHAIN_EXTRA is the explicitly-authorized exception, not a violation.
const CHAIN_EXTRA = [30, 31];

// ... checks array, V-138-AUDIT push unchanged ...

const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of [...CHAIN_PHASES, ...CHAIN_EXTRA]) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  // ... unchanged body -- template string interpolation (`CHAIN-${phaseNum}`) already produces
  // well-formed check ids/names for 30/31 with zero further change ...
}
```
`V-138-SELF` (`:230-243`) checks `CHAIN_PHASES.includes(138)` and `CHAIN_SKIP.size !== 0` — both
invariants are about `CHAIN_PHASES`/`CHAIN_SKIP` specifically and are untouched by this change; no
edit needed there. This is a **strictly additive** change to the loop only.

**Sequencing reminder (D-12):** land this edit only after `check-phase-30.mjs` and
`check-phase-31.mjs` both independently exit 0 standalone — splicing `CHAIN_EXTRA` at HEAD today
(before those fixes) produces 93 PASS/2 FAIL, rc=1, per `142-CONTEXT.md`'s own reproduced
measurement (do not re-verify this pre-fix state; it is already recorded).

### `check-phase-68.mjs` regression guard (RED-07)

Both call-sites read verbatim this session.

**V-68-04** `[VERIFIED: scripts/validation/check-phase-68.mjs:96-115]`:
```js
{
  id: 4, name: 'V-68-04: CHAIN-02 archive-path helper imported in 5 call-sites (check-phase-{31,48,60,62,63}.mjs)',
  run() {
    const CALL_SITES = [
      'scripts/validation/check-phase-31.mjs',
      'scripts/validation/check-phase-48.mjs',
      'scripts/validation/check-phase-60.mjs',
      'scripts/validation/check-phase-62.mjs',
      'scripts/validation/check-phase-63.mjs',
    ];
    const missing = [];
    for (const path of CALL_SITES) {
      const c = readFile(path);
      if (c === null) { missing.push(path + ' (file missing)'); continue; }
      if (!c.includes('archive-path')) missing.push(path);
    }
    if (missing.length > 0) return { pass: false, detail: missing.length + ' call-sites lack archive-path import: ' + missing.join(', ') };
    return { pass: true, detail: '5/5 chain-validator call-sites import archive-path helper' };
  }
}
```
This is a **floor** — it checks that each of the 5 named files still contains the substring
`archive-path` anywhere (`check-phase-31.mjs` already does, via its `import { resolveArchivedPhasePath }
from './_lib/archive-path.mjs'` at `[VERIFIED: scripts/validation/check-phase-31.mjs:10]`). Adding
a second call site for V-31-23 inside `check-phase-31.mjs` cannot remove that import — it can only
add another use of it. Structurally cannot break this check.

**V-68-08** `[VERIFIED: scripts/validation/check-phase-68.mjs:170-181]`:
```js
{
  id: 8, name: 'V-68-08: CHAIN-31 STRETCH check-phase-31.mjs _missing discriminator marker present',
  run() {
    const c = readFile('scripts/validation/check-phase-31.mjs');
    if (c === null) return { pass: false, detail: 'check-phase-31.mjs missing' };
    if (!c.includes('_missing')) {
      return { pass: false, detail: 'check-phase-31.mjs lacks _missing discriminator (CHAIN-31 regression)' };
    }
    return { pass: true, detail: 'check-phase-31.mjs carries _missing discriminator' };
  }
}
```
This is a bare whole-file `String.includes('_missing')` check. `check-phase-31.mjs` already
carries `_missing` at 4 sites (`parseInventory()`'s two `{ _missing: true, placeholders: [] }`
returns, plus its two guard checks) `[VERIFIED: scripts/validation/check-phase-31.mjs:34,36]` —
none of which the V-31-23 rewrite touches. The recommended V-31-23 successor above **adds** a
fifth `_missing: true` usage (its own resolver-null branch), which only strengthens this. GOV-02's
grep-before-edit is still mandatory procedure per D-17, even though both guards are structurally
safe here — do not skip the ledger row on the theory that "it can't break."

Baseline to reproduce before and after the edit, already recorded `[CITED: 142-CONTEXT.md D-17]`:
`check-phase-68` = 33 PASS / 0 FAIL / 0 SKIPPED standalone. Re-run `node scripts/validation/
check-phase-68.mjs` (bare, not nested) after the `check-phase-31.mjs` edit and confirm the same
tally before proceeding to the `CHAIN_EXTRA` splice.

### NEST-01 evidence shape (D-27/D-28/D-29)

**Method template — the Axis-1 precedent**, read from Phase 138's own terminal-close evidence
`[VERIFIED: .planning/milestones/v1.19-phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/
138-04-SUMMARY.md:113,271,276,287]`:
> "`git clone --no-hardlinks` into a scratch temp dir, clone HEAD == source HEAD (`b418ca91`).
> 17th harness + 3 new leaves all exit 0; full apex recursion `[48..137]` completed clean in 19s,
> 92/0/1... Clone removed post-audit (zero orphan temp dirs)."
> `git clone --no-hardlinks D:/claude/Autopilot <scratch temp dir>`
> "Full apex recursion (`check-phase-138.mjs --verbose`, `[48..137]`): `Result: 92 PASS, 0 FAIL, 1
> SKIPPED (total checks: 93)`, exit 0, 19s wall-clock. No deep-nest stall."

Apply the same shape for Phase 142's own measurement, updated for the new `[48..137] +
CHAIN_EXTRA(30,31)` span and the four D-27-mandated method elements:

```bash
# 1. Declare all four method elements + tree identity before measuring, per D-27:
#    clone depth (full -- depth-1 is inadmissible, SWEEP-01 already established this),
#    cache state (cold: first invocation; warm: subsequent), Defender state (on/off/excluded),
#    runner (local Windows dev machine -- no Windows CI runner exists per D-32), --verbose or not.

git clone --no-hardlinks D:/claude/Autopilot <scratch-temp-dir>
cd <scratch-temp-dir>
node scripts/validation/check-phase-138.mjs --verbose   # cold-clone apex run, record wall-clock + tally

# 2. Same-tree, same-session warm median (n>=3), per D-28's ratio denominator requirement:
for i in 1 2 3; do node scripts/validation/check-phase-138.mjs; done   # in the MAIN tree, warm cache, quiesced machine

# 3. Compute ratio = cold-clone-time / warm-median-time. Threshold: ratio >= 8x = FAIL.
```

**Threshold formula (D-28):** `ratio = cold_clone_wallclock / warm_median_wallclock (n>=3, same
tree, same session)`. Pass if `ratio < 8`; fail if `ratio >= 8`. No absolute-millisecond ceiling
(explicitly dropped — no Windows CI runner exists to bind an absolute cap to, per D-28's own
citation that the 198/198 workflow jobs are all `runs-on: ubuntu-latest`).

**Reference data points already recorded (do not re-derive, per D-31's discipline extended by
analogy)** `[CITED: 142-CONTEXT.md D-16, D-26]`: cold first-run-of-session figures 33 278/50 419/
63 176 ms across three agents; a `git clone --no-hardlinks` measured 11 787 ms with the apex inside
it at 24 523/25 686 ms, against a same-session warm median of 16 438–18 695 ms — ratio ≈1.4–1.6×,
well under the ≥8× fail threshold. This is strong prior evidence the phase's own fresh measurement
will land comfortably under threshold, but `142-CONTEXT.md` does not exempt this phase from
running its own declared, quiesced, n≥3 measurement — it only forbids re-measuring
`check-phase-64` specifically (D-31) and re-litigating the ~17s/+0.35s apex figures (D-15).

**Mechanism-X disposition (D-29), two tiers:**
1. **In-phase, executable:** publish the per-child marginal-cost table (which of the 90+2 chain
   children consume disproportionate wall-clock share), name any outliers, record disposition as
   `ADVISORY-RECORDED` (not a hard-block — matches D-30's ruling that this item is not one of the
   two named dispositions the milestone bar requires deleting).
2. **Structural, attributed to its actual owner:** the frozen-aware `harness-run` checkout
   (`fetch-depth: 0` on `actions/checkout@v4`) is already CARVE-1/SWEEP-01's Phase-139 deliverable
   — cite it as the structural mitigation, do **not** re-implement or re-claim it in Phase 142
   ("not double-booked").

**Explicitly withdrawn as Mechanism X (D-29):** raising the per-subprocess timeout —
`check-phase-138.mjs`'s comment block already documents these budgets are "copied forward
unchanged" from `check-phase-134.mjs` and "must not be edited"
`[VERIFIED: scripts/validation/check-phase-138.mjs:68-73]`:
> "Timeout budgets (D-14): copied forward unchanged from check-phase-134.mjs -- 600s per-peer
> (phaseNum >= 67) / 300s per-subprocess, and the AUDIT-HARNESS 300s timeout. These are the sole
> coupling point with WINDOWS-CLONE-DEEPNEST-TIMEOUT-01..."
A timeout raise moves zero wall-clock cost and cannot satisfy a cost-ratio threshold by
construction.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Archived-phase-directory path resolution | A new path-fallback helper inside `check-phase-31.mjs` | `resolveArchivedPhasePath(suffix, ['v1.3-phases'])` from `_lib/archive-path.mjs`, already imported | Already proven in-file for `placeholder-inventory.json` (V-31-21/24); the helper's contract (`CALLER OWNS FAIL SEMANTICS`) is already established and pinned by V-68-04 |
| Cold-clone fresh-tree measurement scaffolding | A custom clone/measure/cleanup script | `git clone --no-hardlinks` + direct CLI timing, matching the Axis-1 precedent verbatim | Already proven, already the evidence shape Phase 144's close audit will expect to see repeated |
| Allowlist glob matching for the CARVE gate | A new glob library or regex helper | `carve-gate.mjs`'s existing `globToRegExp`/`parseAllowlist` (already exported, already `--self-test`-covered) | This phase only needs to add one line to the CARVE's allowlist block — no code interaction with the gate's internals is needed |

**Key insight:** every piece of infrastructure this phase needs (archive-path resolution, chain
membership registration, CARVE governance, GOV-02 ledger discipline) already exists and is already
exercised elsewhere in this milestone. The entire phase is "apply the existing pattern to two more
files," not "build new machinery."

## Common Pitfalls

### Pitfall 1: Trusting a green Windows run as proof of RED-04/05
**What goes wrong:** `execFileSync('npx', ...)` throws `ENOENT` on Windows (no `shell: true`), so
the `isMissing` classifier's existing arms already mask the `--no-install`/`--yes` conflict
locally, producing a false-green local run even with the D-13 classifier bug unfixed.
**Why it happens:** the platform divergence is silent — same code path, different OS-level error.
**How to avoid:** the isMissing fix must be verified against the *actual* npm error text
(`142-CONTEXT.md` D-13's cited text), not just against a local green run.
**Warning signs:** a plan that declares RED-04/05 "done" after only a Windows `node
scripts/validation/check-phase-30.mjs` run, with no CI dispatch or explicit reasoning about the
`ubuntu-latest` code path.

### Pitfall 2: Splicing `CHAIN_EXTRA` before RED-04/05 are green
**What goes wrong:** the apex goes from 93/0/0 to 93 PASS/2 FAIL, breaking the milestone's own
green bar.
**Why it happens:** it's tempting to do the "exciting" chain-adoption edit first.
**How to avoid:** hard-sequence per D-12 — verify both `check-phase-30.mjs` and
`check-phase-31.mjs` exit 0 standalone (and re-verify `check-phase-68.mjs`) before touching
`check-phase-138.mjs`.

### Pitfall 3: Symbol-only GOV-02 grep
**What goes wrong:** a grep for `resolveArchivedPhasePath` or `CHAIN_PHASES` alone misses a sibling
file pinning the exact *file-path string* (e.g. `check-phase-66.mjs:42`'s `CI_WORKFLOW` constant
pinning a workflow filename literally).
**Why it happens:** symbol names feel like "the real" reference; path-string literals look
incidental.
**How to avoid:** always run both forms per D-12/CARVE — a path-string grep AND a symbol grep —
for each of the three edited files, and record both in the GOV-02 ledger row.

### Pitfall 4: Combining the CARVE amendment with any code edit
**What goes wrong:** `carve-gate.mjs`'s D-09 rule requires the amendment commit to touch **only**
`v1.20-CARVE.md`. Combining it with even an unrelated `.planning/` edit is barred by the
procedure's rule 1 ("no other path, in-scope or out-of-scope").
**Why it happens:** it's efficient to bundle the "allowlist add" with the actual code change in
one commit.
**How to avoid:** land the CARVE amendment as its own commit, strictly before the code edits.

### Pitfall 5: Widening a `±15%` band ceiling to force a pass
**What goes wrong:** raising `V-31-29`'s runbook-14 ceiling from 207 to ≥216 "amends the
content-size contract rather than the tolerance, with nothing counter-ratcheting" — explicitly
rejected in D-24(b).
**Why it happens:** it's the easiest local fix to make a red check go green.
**How to avoid:** use the recorded-exception pattern (see "The V-31-29 tension" above) instead —
keep the mathematically-derived bound, and record the known deviation with its cause, not silently
inflate the tolerance.

### Pitfall 6: Importing `carve-gate.mjs`'s exported helpers directly
**What goes wrong:** `carve-gate.mjs:445` calls `main()` at module scope with no import guard, and
`main()` calls `process.exit` — importing `globToRegExp`/`parseAllowlist` from another script kills
the importing process.
**Why it happens:** the functions are exported and look reusable.
**How to avoid:** invoke `carve-gate.mjs` only via its CLI (`node scripts/validation/
carve-gate.mjs [--base <ref>] [--json] [--self-test]`), never via `import`. (Recorded as a
deferred item in `142-CONTEXT.md` — this phase does not need to fix the missing guard, only avoid
tripping over it during verification.)

### Pitfall 7: Undeclared tree identity in any wall-clock measurement
**What goes wrong:** the same code at the same SHA measured 16.8s in the main tree and 27.9s in a
clone tree on one machine — six of the phase's own draft's `[MEASURED]` rows died on exactly this
undeclared variable, the fifth consecutive milestone recurrence of this class (D-36).
**Why it happens:** "warm" and "cold" get declared, but "which tree" does not.
**How to avoid:** every timing figure in the NEST-01 evidence artifact must declare tree identity
(main worktree vs. fresh clone vs. copy), cache state, machine load, Defender state, and n≥3 —
every time, per D-36's explicit instruction.

## Code Examples

See "The successor assertion shapes" and "`CHAIN_EXTRA` mechanism" sections above for the complete
set of concrete before/after code this phase needs — every example there is drawn from a verbatim
read of the live file this session, not reconstructed from memory or training data.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `check-phase-30`/`31` unowned, zero CI jobs, orphaned outside `CHAIN_PHASES` | Real, enforced apex chain members via `CHAIN_EXTRA` | This phase (RED-06) | First-ever CI execution of these two validators; closes the last gap in the ten-member standalone-RED set `{30,31,48,60..66}` |
| String-constructed `RegExp(str, "g")` with `\s`/`\S` inside a double-quoted string | Regex literal (`/pattern/g`) | This phase (V-30-02 fix) | Avoids the JS-string-escape trap entirely; establishes the safer idiom for any future validator author in this repo |
| Frontmatter `platform:` line asserted for a pipe-enum that never lives there | Author-guidance comment line asserted directly | This phase (V-30-10/V-31-25) | Two independently-diverging checks (different regex, different bypass surface) become one shared, line-anchored pattern |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The npm error text `"npm error npx canceled due to missing packages and no YES option"` is the exact stderr substring produced by `npx --yes --no-install <pkg>` on `ubuntu-latest` when the package isn't locally cached | isMissing classifier repair | Cited from `142-CONTEXT.md` D-13's own `[MEASURED]` claim, not independently re-run against a live `ubuntu-latest` runner this session (no such runner available in this environment). If the exact wording differs even slightly (npm version drift), the new classifier arm would need re-tuning against a real CI failure log before merge. |
| A2 | The recommended V-30-01 successor's markdown-table row-counting regex (`/^\|.*\|\s*$/gm`, minus header/separator) correctly counts the 9 data rows in `07-ios-triage.md`'s Routing Verification table without false-matching adjacent tables in the same file | V-30-01 successor code | The illustrative regex is scoped only to content after `## Routing Verification` and before the next `## ` heading, which this session confirmed contains exactly one table; low risk, but the planner should verify against the live file before finalizing |
| A3 | Treating the "IOS1/IOS2/IOS3 appears as table content" phrase in D-04 as satisfied by presence anywhere within the Decision-Tree/Routing-Verification section (not literally inside a `<td>` cell) is the correct reading, given the tokens verifiably do not appear inside any table cell today | V-30-01 successor / "Important finding" callout | If a future adversarial-review round intended literal table-cell presence, the successor check would need re-scoping — but doing so would require a corpus edit (barred by D-01), so this reading is the only one consistent with the phase's own zero-corpus-edit constraint |
| A4 | The recommended resolution for the V-31-29 runbook-14 tension (per-runbook reporting + SC-amendment recording the deviation, rather than a routed-deferral row) is the intended reading of D-24's "same instrument as Area-1" instruction | "The V-31-29 tension" | This is the one genuinely underspecified decision in `142-CONTEXT.md` (explicitly left to Claude's Discretion for its exact arithmetic) — a fresh `/adversarial-review` round at plan time could reasonably choose the routed-deferral pattern instead; either choice requires the same underlying code restructure (per-runbook reporting), so the code-level risk is low even if the documentation disposition changes |

## Open Questions

None left unresolved. The one genuinely underspecified item (`V-31-29`'s runbook-14 exact
disposition) is resolved above with an explicit, actionable recommendation and its risk recorded
in the Assumptions Log (A4) rather than left as a bare open question, per `142-CONTEXT.md`'s own
grant of Claude's Discretion over "the re-derived band arithmetic in D-24(b)."

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validator scripts | Yes (used live this session) | (repo's own runtime; already in use by every `check-phase-*.mjs`) | — |
| `git` | Clone-based NEST-01 measurement, `carve-gate.mjs` | Yes (used live this session — `git status`, `carve-gate.mjs`'s internal `git diff`/`show`) | — | — |
| `npx markdown-link-check`, `npx @mermaid-js/mermaid-cli` | V-30-13's/V-31-30's external checks | ENOENT on this Windows dev machine (pre-existing, unrelated to this phase) | — | Existing `isMissing` classifier already SKIP-passes on Windows ENOENT; this phase's fix targets the `ubuntu-latest` failure mode specifically, which requires no local availability to fix (it's a string-match change, not a runtime dependency) |
| GitHub Actions `ubuntu-latest` runner | The authoritative execution environment for RED-04/05's "exits 0" claim, per D-03's OS split | Not available in this research session (no CI dispatch performed — out of scope for research) | — | The planner's verification step must include a real CI dispatch (or cite the next phase's dispatch) to confirm the isMissing fix against the real runner class; a Windows-only local run is insufficient evidence per Pitfall 1 above |

## Security Domain

`security_enforcement` is not set in `.planning/config.json` (absent = enabled per the governing
convention), but this phase's changes are entirely internal CI/validator tooling with no external
input surface, no authentication, no session state, and no cryptography — it reads fixed,
repository-local file paths and compares them against hard-coded string/regex literals. No ASVS
category from V2 (Authentication) through V6 (Cryptography) has any applicability surface in this
phase's diff. The one nominally-relevant category:

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V5 Input Validation | Marginal | All file paths read by these validators are hard-coded string literals in the source, never derived from user/network input; `execFileSync` is always called with an argv array (never `execSync` with string interpolation), which is already this repo's established convention and is unchanged by this phase |

No new threat patterns are introduced. The `npx` subprocess calls being modified are pre-existing;
the only change is a string literal added to an error-classification predicate, not a change to
what gets executed or with what arguments.

## Sources

### Primary (HIGH confidence — read directly this session)
- `D:/claude/Autopilot/.planning/phases/142-archival-path-fix-chain-adoption-cold-clone-threshold/142-CONTEXT.md` — full document, all 37 decisions
- `D:/claude/Autopilot/.planning/REQUIREMENTS.md`, `D:/claude/Autopilot/.planning/STATE.md`, `D:/claude/Autopilot/.planning/ROADMAP.md` (Phase 142/144 sections)
- `D:/claude/Autopilot/scripts/validation/check-phase-30.mjs` (full file, 338 lines)
- `D:/claude/Autopilot/scripts/validation/check-phase-31.mjs` (full file, 152 lines)
- `D:/claude/Autopilot/scripts/validation/check-phase-138.mjs` (full file, 273 lines)
- `D:/claude/Autopilot/scripts/validation/check-phase-68.mjs` (lines 80-190, V-68-04/V-68-08)
- `D:/claude/Autopilot/scripts/validation/_lib/archive-path.mjs` (full file)
- `D:/claude/Autopilot/scripts/validation/carve-gate.mjs` (lines 1-70, plus a live `--self-test`-adjacent run this session)
- `D:/claude/Autopilot/.planning/milestones/v1.20-CARVE.md` (full file)
- `D:/claude/Autopilot/.planning/milestones/v1.20-GOV-02-LEDGER.md` (schema + first three rows)
- `D:/claude/Autopilot/docs/decision-trees/07-ios-triage.md` (full file), `docs/_templates/l1-template.md` and `l2-template.md` (frontmatter + comment block), `docs/admin-setup-ios/06-compliance-policy.md` (lines 170-269), `docs/l2-runbooks/14-ios-log-collection.md` (frontmatter)
- `D:/claude/Autopilot/.planning/milestones/v1.3-phases/31-ios-l2-investigation/31-VALIDATION.md` (lines 55-84) and `expected-d23.txt` (full file)
- `D:/claude/Autopilot/docs/_standards/EEE-SOP-standard.md` (STD-04 section, lines 400-465)
- `D:/claude/Autopilot/.planning/milestones/v1.19-phases/138-.../138-04-SUMMARY.md` (Axis-1 method, lines 19-346)
- `D:/claude/Autopilot/.planning/milestones/v1.19-DEFERRED-CLEANUP.md` (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 section, line 252)
- `D:/claude/Autopilot/.planning/phases/141-.../141-EVIDENCE.md` (Mandatory statements 1-3, lines 245-299)
- Live commands this session: `node scripts/validation/carve-gate.mjs` (exit 0, 44/44 on-list), `wc -l` + a Node `split('\n').length` probe on the four L2 runbooks, `git status --porcelain` (confirmed clean before and after research)

### Secondary / Tertiary
None used — every claim in this document is either read directly this session or explicitly cited
to `142-CONTEXT.md`'s own already-owner-ratified `[MEASURED]` figures, per the phase's explicit
"do not re-derive" discipline (D-15, D-31, D-36).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependency, verified by direct import-statement reads
- Architecture (chain adoption, commit sequencing, GOV-02): HIGH — every mechanism read verbatim from live source, cross-checked against a live `carve-gate.mjs` run this session
- Successor assertion shapes: HIGH for current-code citations (all read verbatim); MEDIUM for the exact recommended replacement wording (explicitly Claude's Discretion per CONTEXT.md, illustrative not locked)
- NEST-01 method/threshold: HIGH — method and formula are direct citations of owner-ratified decisions; the actual measurement itself is future work for the executing plan, not performed in this research session
- V-31-29 disposition: MEDIUM — the code-level fix is well-grounded, but the exact documentation disposition (SC-amendment vs. routed deferral) is a genuine judgment call flagged in the Assumptions Log

**Research date:** 2026-08-10
**Valid until:** Next commit to any of the three edited files, or 14 days, whichever is sooner (this is fast-moving, single-milestone-scoped tooling research, not a stable external API)
