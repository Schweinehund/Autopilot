# Phase 144: V119 Pin + 18th Path-A Lineage Bump + Terminal Close - Context

**Gathered:** 2026-08-12
**Status:** Ready for planning

<domain>
## Phase Boundary

The terminal close of milestone v1.20. Delivers the mandatory V119 back-anchor pin, the 18th Path-A
audit-harness lineage bump, and a 3-axis terminal re-audit + single close-gate — the sole deliverable
cluster of this phase (mirrors Phase 100/112/119/125/128/134/138; the harness close NEVER batches
with content work).

**Delivers (HARN-17 / HARN-18 / HARN-19):**
- `_lib/frozen-at-close.mjs` gains the **V119** entry (`a7bda73e23efc5e3f9607c3fef37abf8ec4030aa`)
  + `readAtV119Close` export (append-only), and — in the same plan — the **v1.19 harness's
  frozen-aware conversion** (SWEEP-05's Phase-144 half, which cannot exist before the pin it reads).
- `v1.20-milestone-audit.mjs` (Path-A from v1.19, C1–C17 inherited) + `v1.20-audit-allowlist.json` +
  BASELINE_24 + `check-phase-139..143.mjs` (5 new leaves) + `check-phase-144.mjs` (apex, `[48..143]`,
  96 arithmetic entries + the `CHAIN_EXTRA = [30, 31]` sidecar) + `audit-harness-v1.20-integrity.yml`
  (17th CI coexistence workflow, born with `fetch-depth: 0`).
- 3-axis terminal re-audit + all 17 workflows dispatched green from job-level JSON + publish bundle
  regenerated `--version=v1.20` + a SINGLE close-gate commit flipping all **28** v1.20 requirements
  to Validated + `v1.20-MILESTONE-AUDIT.md` + the v1.20 deferred-cleanup close artifact, with
  `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED` **deleted** from the backlog.

**Also delivers — four items formally ROUTED into this phase after the roadmap's "Discuss-phase
flags: None" line was written, all four OWNER-RATIFIED into scope 2026-08-12** (see D-03, D-05,
D-06, D-31): `check-phase-67.mjs`'s 10 remaining fail-loud sites; the stale `~102s` figure in
**two** workflows; the `_lib/frozen-at-close.mjs:10-13` comment correction; and the
`check-phase-143.mjs` needle-spec wiring.

**Explicitly NOT delivered:** the V120 pin (back-anchor circularity — v1.21's job, recorded as
`V120-PIN-DEFERRAL`); any content or corpus work; the C17 frozen-aware conversion (all 5
C17-bearing harnesses stay live-HEAD); `/gsd-complete-milestone`'s archive + tag (a separate command
after this phase).

**Method note:** every ruling below was produced by codebase-grounded `/grill-me` (29 candidate
rulings, ~40 live measurements) then a scored `/adversarial-review` (4 parallel Finders → Adversary →
Referee). 82 findings raised, 16 disproved as false positives, 66 confirmed or partially confirmed.
**Three rulings were REVERSED and fifteen amended**, including two whose load-bearing premise was
factually false. Several "measured facts" were themselves corrected by the review — those corrections
are recorded in `<specifics>`.

</domain>

<decisions>
## Implementation Decisions

### Area A — What ships inside the close cluster

- **D-01: The v1.19 harness's frozen-aware conversion lands HERE, in the same plan as the V119 pin.**
  Mandatory, not batching: SWEEP-05's own amended text says so ("the v1.19 harness converts in Phase
  144, in the same plan as HARN-17's `V119` pin, because `MILESTONE_CLOSE_SHAS` carries no `V119`
  entry today"), and the dependency is mechanical. `[MEASURED]` `v1.19-milestone-audit.mjs` is the
  SOLE unconverted harness — 16 of 17 already import `_lib/frozen-at-close.mjs`. This is therefore
  the **seventeenth** application of the pattern, not the sixteenth.

- **D-02: The v1.19 C17 leg stays on live HEAD — and that extension is recorded as a `[SUCCESS-CRITERION AMENDMENT, D-NN]` on SWEEP-05, not as a sentence in the harness header.**
  SWEEP-05's named limitation is textually scoped "in v1.15 through v1.18"; v1.19 is not in it, so
  extending it is a change to ratified requirement text and needs this repo's own instrument (inline
  marker, superseded text preserved). `[MEASURED CORRECTION]` the residue is **5 of the 5
  C17-bearing harnesses**, not 5 of 17 — only v1.15–v1.19 carry a C17 check at all. Register that
  residue as a NEW deferred item (see D-27).

- **D-03: `check-phase-67.mjs`'s remaining fail-loud sites land here — TEN sites in TWO classes, not seven. OWNER-RATIFIED 2026-08-12.** `v1.20-CARVE.md:272-274` states the obligation as "7
  chicken-and-egg guards **plus 3 partial-null silent passes**". `[MEASURED]` the 7
  chicken-and-egg returns are at `:73, :88, :117, :132, :165, :199, :227`; of the five `nullCount`
  accumulator blocks, exactly **three** can silently pass (V-67-01/03/06) — V-67-05/07 already
  hard-FAIL, so the CARVE's "3" is correct and a naive five-site count is wrong.
  **Two mandatory pre-conditions:** (i) a GOV-02 target-scoped grep (path string AND symbol) recorded
  as a row in `.planning/milestones/v1.20-GOV-02-LEDGER.md` lands BEFORE the edit, per
  `v1.20-CARVE.md:93-112` D-12; (ii) `check-phase-73.mjs:266-302` (`V-73-CONVERT-67-05`/`-06`) reads
  check-phase-67's source and asserts on four literals — `content.includes('frozen-at-close')`,
  `/V-67-05.*v1\.7-frozen/`, `'Apple calls this artifact'`, `'SWEEP-02'` — all four must survive.
  — **Reversibility:** costly — check-phase-67 is a chain member in every apex; a broken pin takes
  the whole chain red.

- **D-04: The SWEEP-09 provenance remedy is the traceability CELL plus an inline amendment marker — never a footer annotation.** `[MEASURED]` `REQUIREMENTS.md:154` reads
  `| SWEEP-09 | Phase 141 | Complete |`; the repo's own two-phase form is one row away at `:131`
  (`| SWEEP-05 | Phase 140, Phase 144 | Pending |`). Correct `:154` to `Phase 141, Phase 144`.
  **Correction of record:** the real provenance defect is `REQUIREMENTS.md:165`, which justified the
  Complete flip by the CI fan-out ("three runs, one shared SHA `275bbad1`, 41 jobs"), not by the site
  census — so SWEEP-09's own amended text already names Phase 144 and the "silently extending a
  Complete requirement" framing is withdrawn.

- **D-05: `check-phase-143.mjs` implements `143-NEEDLE-SPEC.md` §1–§5 verbatim, HONOURS §6 (no C18 harness fold), and DECLINES the §"corpus-level invariant worth pinning too" recommendation. OWNER-RATIFIED 2026-08-12.** The decline is a REVERSAL of the draft ruling: a live-HEAD,
  `docs/`-wide "zero `{#`" assertion inside a permanent apex member is the exact class
  `carve-gate.mjs:8-12` names in its own words — *"A live-HEAD diff assertion frozen into a permanent
  apex member would go RED at the first v1.21 content commit and stay red forever — manufacturing
  exactly the accepted-red class this milestone's bar requires deleting."* The spec itself bounds the
  omission cost as trivial (a stray override renders as visible junk text, caught in ordinary content
  review). D-26's decoupling stands: if the wiring turns red, HARN-19's sub-second spot-check of
  `check-nav-hub-links.mjs` protects the bar.
  Correction to the draft's reasoning: the apex's termini assert is **numeric-only** — a missing leaf
  is caught by HAZARD FIX 3 (`check-phase-138.mjs:182-186`), not by the module-load guard.

- **D-06: FIX the stale `~102s` figure — in BOTH files. REVERSED from "carry it". OWNER-RATIFIED 2026-08-12.** Both cost legs of the draft's carry ruling are falsified:
  (i) `[MEASURED]` `audit-harness-v1.7-integrity.yml:14-22` already carries `pull_request.paths`
  filters for `scripts/validation/check-phase-*.mjs` and `.planning/REQUIREMENTS.md`; Phase 144
  authors six check-phase files and rewrites REQUIREMENTS.md, so v1.7 fires on the close PR whether
  or not line 96 is touched — incremental fan-out cost is **zero**. It is also already on-list under
  CARVE Category 1's `audit-harness-*.yml` glob, so no amendment is needed.
  (ii) `141-CONTEXT.md:480-481` already carries the measured replacement ("~6.5× wrong against the
  measured 664 979 ms") — no fresh measurement is required.
  `[MEASURED]` **the string lives in TWO workflows: `audit-harness-v1.7-integrity.yml:96` AND
  `audit-harness-v1.8-integrity.yml:95`.** Five routing docs (incl. `v1.20-DEFERRED-CLEANUP.md`
  item 11, `141-CONTEXT.md:480`, `142-CONTEXT.md:599`) name only v1.7 and cite `:95` — which is the
  v1.8 line. A sed keyed to `:95` edits the wrong file. Land both edits in the same commit as the
  17th workflow's authoring, never alone.

- **D-07: Plan 01 is a CARVE amendment, alone, first. This is a hard blocker on every other edit in the phase.** `[MEASURED]` the v1.20 allowlist contains no entry for `check-phase-139.mjs` …
  `check-phase-144.mjs` and no glob for `scripts/validation/*-audit-allowlist.json`; Category 2's
  glob is `.mjs`-only and Category 5's 19 literals stop at `check-phase-138.mjs`. `[MEASURED]`
  `carve-gate.mjs` catches brand-new off-list files under `scripts/` via
  `git status --porcelain --untracked-files=all`; `node scripts/validation/carve-gate.mjs` currently
  reports `in-scope=106 on-list=106 off-list=0`, and a new `check-phase-139.mjs` matches **zero** of
  the 82 allowlist patterns. D-09's amendment procedure forbids the amendment riding in the same
  commit as the edit it authorizes.
  **Shape:** enumerate all six new validator paths **literally** (Category 5's style) — do NOT use a
  `check-phase-14*.mjs` glob, since `globToRegExp` maps `*` → `[^/]*` with zero-width allowed and it
  over-matches. Add `scripts/validation/v1.20-audit-allowlist.json`. Over-listing costs nothing while
  under-listing hard-blocks mid-phase, so also add `scripts/pipeline/build-publish-bundle.mjs` and
  `scripts/pipeline/build-filename-map.mjs`.
  **Trap:** `carve-gate.mjs` is NUL-classified binary (a literal NUL at offset 2520, `:44`'s
  `'\0DOUBLESTAR\0'` placeholder) — GOV-02's grep census needs `grep -a` on this file or it returns
  "Binary file … matches" with no line numbers.
  — **Reversibility:** one-way within the phase — a blocked edit cannot be cleared by appending its
  own category in the same commit; recovery costs a full amend-then-redo cycle.

### Area B — Apex `check-phase-144.mjs`, the five leaves, the sidecar, the 17th workflow

- **D-08: `CHAIN_START = 48`, `CHAIN_END = 143`, `CHAIN_PHASES` generated by `Array.from`, length assert `!== 96`, termini assert `48..143`, `CHAIN_SKIP = new Set([])`.** This is the D-25
  owner-ratified correction of the `[48..138]` drafting error surviving at two ratified sites.
  Never transcribe the array.

- **D-09: `CHAIN_EXTRA = [30, 31]` carries forward verbatim, including its exclusion from all three module-load guards and from the SELF dual-invariant.** `[MEASURED]` apex-138 keeps it out of the
  dedup guard (`:114`), the length guard (`:120`), the termini guard (`:123`) and `V-138-SELF`
  (`:249-255`) — replicate exactly; D-11 forbids collapsing it into the span. Add one line the
  predecessor lacks: `assert CHAIN_EXTRA.every(n => !CHAIN_PHASES.includes(n))` — `CHAIN_EXTRA` is
  declared at `:165`, AFTER all three guards, and is structurally uncoverable by them.

- **D-10: Expected apex-144 result — 98 executed children, 101 total checks; `101/0/0` once `144-VERIFICATION.md` exists, `100/0/1` before it, and `99/1/1` if run before `v1.20-milestone-audit.mjs` lands.** The third case is the one the draft missed: `[MEASURED]` the
  AUDIT-HARNESS `existsSync`→FAIL branch sits at `:220-224`, BEFORE the NESTED guard at `:225`.
  Under 138 D-05's exact-match PASS/FAIL/SKIP table an ordering slip becomes a recorded FAIL.
  Arithmetic verified by execution: `check-phase-138.mjs` → `95 PASS, 0 FAIL, 0 SKIPPED` = 1 AUDIT +
  92 CHAIN + 1 AUDIT-HARNESS + 1 SELF, so 96 + 2 + 3 = 101 is sound.

- **D-11: Author leaves `139..143` BEFORE the apex.** HAZARD FIX 3 makes each absent chain child a
  hard FAIL, so apex-first yields exactly 5 FAILs indistinguishable from a real regression. This
  ordering constraint appears in no prior artifact.

- **D-12: Inherit apex-138's three HAZARD FIXes as MECHANISM, and re-derive every count and span string.** Not "verbatim with header comments" — `[MEASURED]` `check-phase-138.mjs:185` emits
  `"the fixed 90-entry CHAIN_PHASES span"` at RUNTIME, `:70` carries `[48..137]`, `:256` prints
  `CHAIN_PHASES = [48..137] (90 entries)`, and `:41` says "17-check v1.19 harness" when the harness
  registers **16** (C8 absent). Copied literally, the new apex prints stale numbers into close-audit
  evidence. Keep: `maxBuffer: 20 * 1024 * 1024`; `isMissing = err.code === 'ENOENT' || err.status ===
  127`; absent child ⇒ FAIL; `isPeer` at `phaseNum >= 67`; 600 s peer / 300 s per-subprocess /
  300 s AUDIT-HARNESS.

- **D-13: `V-144-AUDIT-HARNESS` points at `scripts/validation/v1.20-milestone-audit.mjs` — absent ⇒ FAIL (regression, not skip), NESTED ⇒ skip the re-run.** Copy apex-138's shape exactly.

- **D-14: The five leaves are LIGHTWEIGHT — `CHAIN_PHASES = []`, no AUDIT check, no AUDIT-HARNESS check, no NESTED guard, deliverable/content needles + a SELF dual-invariant. REVERSED from the apex template.** `[MEASURED]` `check-phase-135.mjs:44`, `-136.mjs:40`, `-137.mjs:36` all set
  `const CHAIN_PHASES = [];` and contain **zero** AUDIT, AUDIT-HARNESS or `CHECK_PHASE_NESTED`
  references (7 / 11 / 5 checks each); their header line 4 reads *"LIGHTWEIGHT base (NO chain —
  chain lives ONLY in apex)"*, restated at `check-phase-132.mjs:4`. Building them on the apex
  template would spawn five extra harness runs and five extra chain expansions inside apex-144's
  98-child sweep.
  Needles derive from each phase's VERIFICATION/SUMMARY **measured actuals**, never from its CONTEXT
  (`check-phase-132.mjs:5`). Every needle must be durable against ordinary future content commits —
  **no corpus-wide negative assertions** (see D-05).
  `check-phase-139.mjs` specifically asserts **frozen-to-frozen** facts about the CARVE at a frozen
  SHA (the `check-phase-63.mjs:208-250` pattern), never a live diff — `carve-gate.mjs:8-12` instructs
  this in its own header.

- **D-15: Zero `.planning/phases/` reads in the five new leaves — and the archival-token guardrail is REPLACED, because the drafted one does not work.** The sidestep is the only option available:
  `MILESTONE_CLOSE_SHAS` tops out at `V118`, phases 139–143 exist at no pin, and the back-anchor
  invariant defers V120 to v1.21, so own-milestone leaves cannot be frozen-aware against their own
  not-yet-existing close.
  **The broken guardrail:** "treat a null resolve as fail-loud at the post-close-gate confirmatory
  run" CANNOT detect a wrong token. `[MEASURED]` `_lib/archive-path.mjs:23-24` checks the LIVE path
  first and only falls through to `.planning/milestones/<root>/`; at the post-gate run
  `144-VERIFICATION.md` is live, so it resolves regardless of the token. Proven by counterexample:
  `check-phase-125.mjs:86` carries the WRONG token `['v1.15-phases']` while `125-VERIFICATION.md`
  lives under `v1.16-phases/`, and still emits `V-125-AUDIT: SKIPPED -- not yet authored`,
  `79 PASS / 0 FAIL / 1 SKIPPED`, exit 0 — permanently green with a factually false detail string.
  **The replacement:** assert the literal token string `'v1.20-phases'` in the apex source, AND
  separately exercise the resolver against the archived path. Never copy a predecessor's token
  (119/125/128 carry a wrong one frozen).
  **Named trap, unchanged:** `check-phase-54.mjs:30-31` live-reads `.planning/REQUIREMENTS.md` and
  `.planning/ROADMAP.md` with a negative assertion at `:347`, and the close-gate rewrites both.

- **D-16: The 17th workflow is a Path-A copy of `audit-harness-v1.19-integrity.yml` with every hardcoded v1.19 string re-derived, all SIX path-filter entries mirrored, and NO standalone `check-phase-138` job.** The path-filter block is the workflow's `paths:` key. `[MEASURED]` the v1.19 workflow is the only carrier of a standalone
  `check-phase-138` job (`:147`) and `check-phase-134` appears only in the v1.18 workflow — the real
  Path-A precedent is *the predecessor apex is never duplicated forward*.
  **Must re-derive:** the `parse` job's sidecar path (`:37`, twice); the `path-match` job's literal
  `grep -q "scripts/validation/v1.19-audit-allowlist.json" scripts/validation/v1.19-milestone-audit.mjs`
  (`:57-70`) — copied verbatim this **exits 1**; the `linux-chain` `::notice` hardcoding
  `deep-nest at [48..137]; subprocess timeout: 600s` (`:98-102`).
  **`paths:` must mirror all six**: `scripts/validation/v1.20-*`, `scripts/validation/check-phase-*.mjs`,
  the workflow's own path, `.planning/REQUIREMENTS.md`, and `.planning/milestones/v1.20-*` (one glob
  — four v1.20 files already exist: CARVE, DEFERRED-CLEANUP, GOV-02-LEDGER, and the future
  MILESTONE-AUDIT).
  **Keep:** the DUAL-APEX header contract restated verbatim; `fetch-depth: 0` on every checkout;
  `timeout-minutes: 30` on chain jobs, `15` on leaf jobs.
  **Do NOT copy `pin-helper-advisory` forward as-is** — `[MEASURED]` `:200` `continue-on-error: true`
  PLUS `:208` `|| true` PLUS `:212-213` `|| echo` means its conclusion is structurally ALWAYS
  `success`; it can never report failure (see D-21).
  **Topology note:** every job except `frozen-read-probe` is `needs: harness-run`, so a v1.20 harness
  failure SKIPs the apex job and all five leaf jobs — six silent skips, not one visible red.

- **D-17: Sidecar = header-fields-only copy (`generated`, `phase`); append BASELINE_24 following BASELINE_23's shape; repoint the v1.20 harness's sidecar `readFile(...)`. NEVER cite `regenerate-supervision-pins.mjs --report` as pin-drift proof** — it hardcodes the **v1.7** sidecar
  (`:290`, `:336`, `:563`) and walks only 26 of 59 line-pins. `regenerate-supervision-pins.mjs:531-532`
  already names BASELINE_24 as next in the Path-A chain.
  **The pin-drift result is MEASURED, not speculative — real drift is ZERO.** See `<specifics>` for
  the numbers and the adjudication rule.

### Area C — Push, dispatch, evidence, the red path

- **D-18: The OWNER executes `git push origin master` at a named blocking checkpoint, after the harness/validator/workflow atoms land and before the close-gate is authored.** `v1.18-MILESTONE-AUDIT.md:254`
  bars pushing and firing Actions from inside an unattended execution run; authorization alone does
  not move the executor across that boundary. Phase 139-06's precedent — owner pre-authorized in
  advance, checkpoint still honoured as a real halt with no self-approval — is the shape to copy.
  **Two pre-flights the draft lacked:** (i) `git fetch origin && test $(git rev-list --count
  master..origin/master) -eq 0` immediately before the push — `[MEASURED]` `.git/FETCH_HEAD` is dated
  2026-08-09 and the "96 ahead / 0 behind" figure was never re-measured this session; (ii) rule on
  working-tree hygiene first — `[MEASURED]` 104 porcelain entries, 8 worktrees, 7 unmerged
  `worktree-agent-*` branches. None trips the CARVE gate (all outside `scripts/`, `.github/`,
  `docs/`), but Axis-1 and Axis-3 both run against this state.
  — **Reversibility:** one-way — there is no un-push, and the push is the precondition for
  `workflow_dispatch` (the workflow file must be on the default branch).

- **D-19: Dispatch all 17, enumerated BY NAME from a live workflow-directory listing at dispatch time — never from a carried count.** The listing must cover both extensions —
  `ls .github/workflows/*.yml` and `*.yaml` — since GitHub accepts either (zero `.yaml` files exist
  today, so this is a durability guard, not a live gap). Dispatch is not a stricter standard chosen
  for comfort: ROADMAP SC#3 requires it explicitly ("`gh workflow run --ref master`, since a push
  fires nothing"), and the weekly cron cannot supply SHA-controlled evidence at the close SHA.

- **D-20: ONE shared SHA across all three axes — `origin/master` HEAD at dispatch time — AND a read-back assertion.** After dispatch, assert every one of the 17 runs' `.headSha` equals the
  recorded value. The v1.17 precedent this rule cites as defective (`gha_authoritative_sha` ≠ Axis-1
  clone SHA yet `cross_os_exact_match: true`) is precisely a missing read-back.

- **D-21: Evidence is job-level JSON matched on the DISPLAY-name field, with four rules the draft lacked.**
  (a) **Run-ID acquisition is explicit:** `gh workflow run` returns no run ID, and `gh run list`
  blends dispatch and schedule runs under identical workflow names (v1.5 appears as both, one day
  apart). Filter on `event == "workflow_dispatch"` AND `headSha == <recorded>`.
  (b) **The skip anchor is ~14–15, not 2.** `[MEASURED]` `rotting-external-quarterly` is guarded by
  `if: github.event_name == 'schedule' && …` and ALWAYS skips under dispatch; it lives in 14 of 16
  workflows (absent from base and v1.5), and v1.6:173 / v1.7:162 use `always() && …` so a
  literal-string grep undercounts to 12. The 2026-08-10 cron run shows exactly 14 skips.
  (c) **`needs: harness-run` cascade skips are GAPS, never legitimate.**
  (d) **A `continue-on-error: true` job is NON-EVIDENCE, not "success".**
  The `139-06-SUMMARY.md` trap stands: `.jobs[].name` is the display name, not the YAML job key, so
  a literal `test("<job-key>")` filter returns EMPTY even when the job succeeded.

- **D-22: Exactly ONE remediation round. If a job is still red after it, HARN-19 is recorded UNMET and the milestone does not ship this phase. OWNER-RATIFIED 2026-08-12.** Never "satisfied by
  fallback" (138 D-07). The adversarial review upheld that no fallback exists: `REQUIREMENTS.md:6`
  and `ROADMAP:282` are unconditional, and none of the carried items
  (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`,
  `DEFER-119-A`) carries a CI-red-absorption clause — root-cause attribution does not turn a red job
  green. Under D-20's single-SHA rule a re-run at a new SHA forces Axis-1 and Axis-3 re-runs, which
  is the round's real cost.
  **Struck from the draft:** the rhetorical claim "there is no fallback disposition available this
  milestone" (over-broad) and the fabricated "v1.5/v1.6/v1.7 are historically the three reddest"
  (`[MEASURED]` `grep -ri 'reddest' .planning/` → zero hits repo-wide; the red set of record is
  base + v1.5..v1.13, and 7 of those 10 were outside Phase 141's sample).

- **D-23: `origin/phase-139-atom-5` — audit and report; the delete/keep call goes to the OWNER at the same checkpoint as the push. REVERSED from "delete at close". OWNER-RATIFIED 2026-08-12.**
  `139-06-SUMMARY.md:119` says "**KEEP** … **Not deleted**" and `:142` says its disposition "should
  be **re-confirmed**" — not deleted. It is a REMOTE ref (`remotes/origin/phase-139-atom-5` at
  `c2450efa`), so D-18's own boundary applies and there is no reflog to recover from. `c2450efa` is
  also the headSha of the 16 recorded 2026-08-06 runs on which SWEEP-01/SWEEP-02's completion
  evidence rests. Phase 144 records reachability (`git rev-list --count master..phase-139-atom-5` =
  **0**) and the evidence coupling, then halts for the owner.
  The three older remote atom branches (`origin/phase-119-atom-2`, `-125-atom-2`, `-128-atom-2`) are
  the same class but carry no standing instruction — deferred, not batched in (see `<deferred>`).
  — **Reversibility:** one-way for the remote ref — a deleted remote branch has no reflog.

### Area D — Close-gate, dispositions, terminal ordering

- **D-24: A SINGLE close-gate commit flips all 28 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS.** D-24 rules the FLIP atomic, not the phase — a later
  non-gate commit recording the post-gate confirmatory apex result is permitted and expected (v1.19
  needed one). The `.planning/` artifacts sit outside the CARVE gate's scope
  (`IN_SCOPE_PREFIXES = ['scripts/', '.github/', 'docs/']`), so there is no conflict with D-07.

- **D-25: SWEEP-05 flips on its own amended text; SWEEP-06 needs a MEASUREMENT first, and both traceability cells get corrected.** `[MEASURED]` SWEEP-06 (`REQUIREMENTS.md:21`) carries NO
  amendment marker and NO Phase-144 mention, and its row `:132` reads "Phase 140" alone — the
  authority is `140-05-SUMMARY.md:38/:110`, not an inline amendment, so the draft's "both span…
  by their own amended text" was false for SWEEP-06. Before flipping it, measure the newly-converted
  **v1.19** harness against `check-phase-60.mjs`'s 60-second subprocess budget: Phase 140 measured
  sixteen harnesses (slowest 4,177 ms) and never the seventeenth, and `140-05-PLAN.md:38` records,
  owner-acknowledged, that SWEEP-06's edge coverage "is unclassified and stays unresolved".
  Correct `:132` → `Phase 140, Phase 144` and `:154` → `Phase 141, Phase 144`.

- **D-26: `ACCEPTED-STANDALONE-CI-RED` is discharged by all 17 green at the shared SHA (job-level JSON, every skip classified); `ACCEPTED-SCOPED-RED` by re-running all ten members standalone at the close SHA.** `[MEASURED]` the premise holds at HEAD — all ten exit 0 (see `<specifics>`) —
  but those runs must be repeated at the close SHA rather than inherited from Phase 141/142 evidence,
  because 96 commits including Phase 143's 145 corpus repairs have landed since. Note the arithmetic:
  the disposition spans 15 workflows (v1.4–v1.18) and the bar is 17, so all-17-green entails
  discharge. Consume routed item 7 explicitly — the 13-workflow `pull_request.paths` cascade fires on
  the close PR, which is the disposition's own named trigger surface.

- **D-27: The v1.20 deferred-cleanup close artifact is ABSORB-AND-APPEND at the existing path, not a wholesale rewrite.** `[MEASURED]` `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` already exists
  (13,566 bytes, authored 2026-08-10 by Phase 142 Plan 01, **extended 2026-08-11 by Phase 143 Plan 08
  Task 2 with rows 13-15**, now 15 routed rows). Its own header offers both the same-path and the
  successor-named option and says the close artifact supersedes "where the two overlap" — only 4 of
  15 rows overlap. Preserve all 15 rows verbatim and append Part A (new) / Part B (carried) / Part C
  (dropped-and-Closed). A wholesale rewrite would destroy evidence pinned as VERIFIED in
  `142-VERIFICATION.md:56`, `143-VERIFICATION.md:50` and `142-01-SUMMARY.md:91`, in the same phase
  that authors the validators derived from those measured actuals. Note `142-01-SUMMARY.md:91`'s
  `grep -c '^| ' == 14` is already stale at 17 — a passed-at-the-time assertion, not a re-runnable
  gate.

- **D-28: The NEW / CARRIED / DROPPED lists — six corrections to the draft, all evidence-backed.**
  - **`DEFER-119-A` moves to DROPPED-and-Closed, not CARRIED.** `[MEASURED]`
    `v1.19-DEFERRED-CLEANUP.md:270-278` is that entry's ENTIRE content and it is the one defect it
    solely owns; `regenerate-supervision-pins.mjs --self-test` now exits **0** (`Diff: identical` /
    `Self-test: PASS`) and RED-02 is Complete. Carrying the owner while dropping the entry it owns is
    incoherent.
  - **DO NOT drop `V-132-HUBSNOTWIRED-REGEX-BROKEN`.** `[MEASURED]`
    `git log a7bda73e..HEAD -- scripts/validation/check-phase-132.mjs` → **empty**; the regex
    `/docs\/recipes|01-shared-windows-avd|02-shared-ipad/` sits verbatim at `:97`. And `V-132` is a
    NEGATIVE assertion (hubs must NOT link to recipes) — no link-**resolution** checker can discharge
    an **absence** assertion.
  - **DO NOT drop `RECIPE-OUTBOUND-LINK-COVERAGE`.** Its complaint is durability, and `[MEASURED]`
    `check-nav-hub-links.mjs` has **zero execution sites** across `scripts/`, `.github/` and
    `package.json` — only `check-phase-123.mjs:14,40`'s existence pin. The wiring is routed item 13,
    from which the close is explicitly decoupled.
  - **`CARVE-1` — carry it re-scoped OR drop it and name the residue as NEW, not both.** Its stated
    root cause (the un-pinned `ref:`) IS discharged by SWEEP-01/05, but the C17 leg is genuine
    surviving residue (D-02). The draft dropped it as closed while opening the same limitation on its
    NEW list.
  - **ADD the eight omitted still-open v1.19 entries** — `HUB-WIRING-NON-BARRED-SURFACE` (`:119`),
    `HYG-05` (`:155`), the Part-A `CI-3 Scope Correction` (`:171`, distinct from Part-C CI-3 at
    `:326`), `SHARED-TAXONOMY-DOC` (`:188`), `ANCHOR-REVIEW-BY-PAST-DUE` (`:198`),
    `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` (`:208`), `AOSP-Wired 802.1X` (`:330`), and both
    Correction-of-Record sections (`:220`, `:224`) — **plus `FENCE-AXIS-02`** (v1.20 rows 14/15,
    including `check-phase-66.mjs:274`, a live fence tracker inside a frozen chain validator that
    runs in every apex). `[MEASURED]` the predecessor has **30** `^## ` entries.
  - **REMOVE `RCPFUT-*`** — `[MEASURED]` `grep -c RCPFUT v1.19-DEFERRED-CLEANUP.md` = **0**; the
    identifier is not in that document. And correct "12 unowned tooling items" to **10** (rows 1-6,
    9, 10, 14, 15; item 12 is RECORDED-not-routed; 7/8/11/13 are routed here).
  **Keep the root-cause-level double-booking guard** (138 D-27) — it is what makes the DEFER-119-A
  correction findable.
  Also NEW: `V120-PIN-DEFERRAL`.

- **D-29: Terminal ordering — the publish bundle moves BEFORE the close-gate. OWNER-RATIFIED 2026-08-12.**
  `harness/validator/workflow atoms → owner push → 17-workflow dispatch → Axis-1 fresh clone +
  Axis-3 zero-context reproduction at the SAME SHA → milestone-audit + deferred-cleanup authoring →
  publish bundle --version=v1.20 → SINGLE close-gate commit → post-close-gate confirmatory apex run.`
  ROADMAP SC#4 fuses the bundle and the flip into ONE criterion with "and", and
  `build-publish-bundle.mjs:23-25` exits 1 on any conversion/guard/parity/naming/divergence failure
  across 225 pandoc conversions — under the v1.19 ordering that failure lands after an irreversible
  28-requirement flip. **Pass `--version=v1.20` explicitly:** `:40` defaults to the literal `'v1.17'`
  and `deriveZipName` accepts it silently, producing a valid, silently wrong
  `dist/docs-library-v1.17.zip` at exit 0 as the last act of the close.
  The post-gate confirmatory run still asserts `V-144-AUDIT` is PASS not SKIP — but that proves only
  that the close-gate did not break the AUDIT read; it proves NOTHING about the archival token
  (D-15).
  — **Reversibility:** one-way at the close-gate commit — it flips 28 requirements and rewrites the
  two documents `check-phase-54.mjs` live-reads.

- **D-30: The archival-drift scan is TWO classes at TWO times, with a stated method and baseline.**
  **Class 1** (hardcoded `.planning/phases/NNN/` reads that break when `/gsd-complete-milestone`
  moves 139..144 into `v1.20-phases`) — a pre-push STATIC census: enumerate `scripts/validation/**`
  files referencing `.planning/phases/`, subtract those whose reads go through a frozen reader
  (`check-phase-70.mjs:398,414` at `V17_CLOSEGATE`; `check-phase-124.mjs:46,97` at `V116`), and fail
  on any survivor reading `139..144`. `[MEASURED]` baseline at HEAD: **zero survivors** (51 files
  reference `.planning/phases/` at all, but that population is not what Class 1 acts on).
  **Class 2** (`check-phase-54.mjs`'s live REQUIREMENTS/ROADMAP reads) can ONLY manifest after the
  close-gate rewrites those files — it is covered by D-29's post-gate run, not by a pre-push scan.
  `.planning/REQUIREMENTS.md` must never be `git rm`'d at close.

### Cross-cutting guardrails

- **D-31: `_lib/frozen-at-close.mjs` is APPEND-ONLY, with ONE carved exception. OWNER-RATIFIED 2026-08-12.** Append the V119 entry + `readAtV119Close` + whatever convenience exports the v1.19
  harness conversion needs — plus the routed comment correction at `:10-13`, whose description of
  `check-phase-61` as "a deliberate exception: it keeps a genuinely inline reader" is stale after
  Phase 141 Task 1's delegation (`141-03-SUMMARY.md:223-231`, "Recorded here for Phase 144's
  close-review pass"). It is comment-only and can land nowhere else; an unqualified "nothing else"
  would forbid work explicitly routed to this phase.

- **D-32: Never write "0 FAIL across the non-nested chain."** The apex sets `CHECK_PHASE_NESTED=1` on
  every child, so it structurally cannot produce a non-nested chain result (138 D-24).

- **D-33: Commit messages must not literally quote CARVE paths or amended file paths in prose.**
  `git show --name-only HEAD` prints the message body followed by the file list, and the CARVE
  exclusion check greps that combined output (142-01 / 142-02 decisions).

- **D-34: Never touch either glossary's `last_verified` / `review_by` — and the stated mechanism is CORRECTED.** `[MEASURED]` `v1.19-milestone-audit.mjs:408-412`:
  `diffDays = Math.round((review_by - last_verified)/86400000); if (diffDays > 90)` — **static
  frontmatter arithmetic with no wall-clock term**. The margin therefore cannot decay through the
  passage of time; the reason to hold the line is that any edit to either field flips the difference.
  And it is not two files: C5/C10 walk the full `androidDocPaths()` (`:154-179`) and
  `linuxDocPaths()` (`:205-225`) sets, and **145 documents sit at exactly 90 days**.
  `REQUIREMENTS.md:114`'s "flips six currently-green workflows red" was measured BEFORE Phase 140's
  conversion — after SWEEP-05 the v1.4–v1.18 harnesses read frozen corpora and no longer see a
  live-HEAD glossary edit. Re-derive that count or drop it; do not weaken the prohibition.

- **D-35: Run the apex chain SEPARATELY from the verifier** — a link/anchor change is a prose change
  and has tripped banned-phrase guards after a passed verifier.

### Claude's Discretion

- Internal structure of the five new leaves and the apex within the invariants above; the specific
  needle set for `check-phase-139..142.mjs` (derived from each phase's VERIFICATION/SUMMARY measured
  actuals at plan time — `check-phase-143.mjs`'s is fully specified by `143-NEEDLE-SPEC.md`).
- Exact `v1.20-audit-allowlist.json` header values and BASELINE_24 comment wording.
- Plan decomposition and commit-message subjects (`docs(144-NN):` / `feat(144-NN):`).
- Section ordering within `v1.20-MILESTONE-AUDIT.md`, inheriting the v1.19 shape.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` — HARN-17 (`:82`), HARN-18 (`:83`), HARN-19 (`:84`); the milestone bar
  (`:6`); SWEEP-05 (`:20`) and SWEEP-06 (`:21`); the traceability table (`:131`, `:132`, `:151-154`);
  the glossary Out-of-Scope bar (`:114`).
- `.planning/ROADMAP.md` §"Phase 144" — SC1–SC4. **SC#3 mandates dispatch explicitly; SC#4 fuses the
  publish bundle and the close-gate into one criterion (D-29).**
- `.planning/STATE.md` — `:28-32` (the V119 subject-line recovery method); `:236` (HARNESS-PHASE, the
  named decision scoping this phase); `:398` (the Phase-144 plan-time research flag on dispatch and
  job-level JSON); `:404-415` (durable watch items).

### Governance — read BEFORE any edit
- `.planning/milestones/v1.20-CARVE.md` — gate scope and `.planning/` exclusion (`:46-60`); the D-09
  amendment procedure (`:64-78`); GOV-02's grep procedure (`:93-112`); the allowlist block
  (`:226`+), **Category 5's check-phase-67 note at `:272-274` naming the 7+3 obligation**.
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — the append-before-edit ledger every frozen-surface
  edit needs a row in.
- `scripts/validation/carve-gate.mjs` — `:8-12` **the live-HEAD-assertion doctrine that governs D-05
  and D-14**; `:36-37` in-scope prefixes; `:113-128` / `:146-163` the diff and status collectors;
  `:175-187` the genesis exemption (`carveExistedAt`, NOT an A-status test). **NUL-classified binary —
  grep with `-a`.**

### The exact analogue — read before planning
- `.planning/milestones/v1.19-phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-CONTEXT.md`
  — D-01..D-32. **`:29-44`** (Axis-2 mechanics, governs D-18/D-20/D-22), **`:40`** (the PASS/FAIL/SKIP
  triple rule, governs D-10), **`:71-79`** (the four-part HARN-15 gate incl. the post-close-gate run,
  governs D-29), **`:100-104`** (the archival-drift pre-scan, superseded in part by D-15),
  **`:106-111`** (the `--report` prohibition, governs D-17), **`:139-140`** (root-cause-level
  double-booking, governs D-28), **`:146-148`** (the apex numbers and the three hazard fixes).
- `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` — the predecessor close artifact, **30 `^## `
  entries**. `:60-89` ACCEPTED-SCOPED-RED (ten members, four classes); `:119` `HUB-WIRING-NON-BARRED-SURFACE`;
  `:155` HYG-05; `:171` the Part-A CI-3 scope correction; `:188` SHARED-TAXONOMY-DOC; `:198`
  ANCHOR-REVIEW-BY-PAST-DUE; `:208` ROLLBACK-RECOVERY-DIVERGENCE-COUNT; `:220`/`:224` the two
  Correction-of-Record sections; `:234-246` CARVE-1; `:250` WINDOWS-CLONE-DEEPNEST-TIMEOUT-01;
  `:254` ACCEPTED-STANDALONE-CI-RED (discharged-then-extended, and **`:258` records that a DISPATCH
  is its own discharge instrument**); `:266` LATENT-NON-FROZEN-AWARE-…-01; `:270-278` DEFER-119-A
  (its entire content, governs D-28); `:330` AOSP; `:354` the DROPPED-and-Closed precedent.
- `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` — 15 routed rows. `:23-29` the header instructing
  absorb-or-successor (governs D-27); item 7 (the `pull_request.paths` cascade, D-26); item 8 (the
  D-25 span correction, D-08); item 11 (the `~102s` figure, D-06); item 13 (the needle-spec
  hand-off, D-05); items 14/15 (`FENCE-AXIS-02` incl. `check-phase-66.mjs:274`, D-28).

### Upstream handoffs that BIND this phase
- `.planning/phases/143-link-coverage-fence-mask-unification/143-NEEDLE-SPEC.md` — §1–§5 implemented
  verbatim; §6's no-C18-fold honoured; the "corpus-level invariant" § DECLINED per D-05.
- `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-03-SUMMARY.md` —
  `:223-231` the `frozen-at-close.mjs:10-13` comment correction routed here (D-31); `:313-360` the
  OWNER-RATIFIED addendum that **already closed** the check-phase-70 V-70-18..22 repoint (commit
  `671b9d49`) — do not re-route it.
- `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-CONTEXT.md` — `:137`
  D-12 (the single owner ruling behind all three check-phase-67 citations); `:480-481` the measured
  664,979 ms replacement figure (D-06).
- `.planning/phases/139-governance-carve-fetch-depth-retrofit-shallow-job-repair/139-06-SUMMARY.md` —
  `:119`/`:142` the branch retention instruction (D-23); `:35,81,94,104` "dispatch all 16"; the jq
  display-name trap at `:37,100,120,133,144` (D-21).

### Harness surfaces this phase edits or extends
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (`:69`+, V118 at the tail,
  V119 slot next); `readAtClose()`; the six-pattern `frozenCause` classifier; `lsTreeAtClose`.
  APPEND-ONLY plus D-31's one exception.
- `scripts/validation/_lib/archive-path.mjs` — `:23-24` **live-path-first resolution, the reason
  D-15's original guardrail does not work**; `:29` returns null without throwing.
- `scripts/validation/check-phase-138.mjs` — the apex copy-forward template. `:104-125` span
  constants + the three module-load guards; `:135` AUDIT; `:144` the resolver SKIP-pass; `:165-172`
  `CHAIN_EXTRA` and the concatenated loop; `:181-186` HAZARD FIX 3; `:187-194` timeouts + maxBuffer;
  `:207` HAZARD FIX 2; `:216-236` AUDIT-HARNESS (`existsSync` FAIL precedes the NESTED guard);
  `:245-256` V-138-SELF. **Stale runtime strings at `:41`, `:70`, `:185`, `:256` (D-12).**
- `scripts/validation/check-phase-135.mjs` / `-136.mjs` / `-137.mjs` — the true LIGHTWEIGHT leaf
  template (D-14): header line 4, `CHAIN_PHASES = []` at `:44` / `:40` / `:36`.
- `scripts/validation/check-phase-67.mjs` — the 7 chicken-and-egg sites (`:73, :88, :117, :132, :165,
  :199, :227`) and the 3 partial-null silent-pass sites (V-67-01/03/06) (D-03).
- `scripts/validation/check-phase-73.mjs` `:266-302` — `V-73-CONVERT-67-05`/`-06`, the four frozen
  literals pinning check-phase-67's source (D-03).
- `scripts/validation/check-phase-54.mjs` `:30-31`, `:347` — the live REQUIREMENTS/ROADMAP negative
  assertion (D-15, D-30).
- `scripts/validation/check-phase-63.mjs` `:208-250` — the frozen-to-frozen blob-comparison pattern
  `check-phase-139.mjs` must follow (D-14).
- `scripts/validation/check-phase-123.mjs` `:14,40` — the `check-nav-hub-links.mjs` path pin; the
  file must NOT be renamed.
- `scripts/validation/v1.19-milestone-audit.mjs` — the Path-A source AND the conversion target.
  `:34`/`:817-832` the C17 fold; `:384-413` C5 and `:519-550` C10 (the 90-day arithmetic, D-34).
- `scripts/validation/v1.19-audit-allowlist.json` — sidecar template; 59 line-pins across 5 arrays;
  **`c13_rotting_external` is an object of nested arrays — a naive top-level walk finds 16 `docs/`
  files instead of the true 33** (D-17).
- `scripts/validation/regenerate-supervision-pins.mjs` — `:290`/`:336`/`:563` the v1.7 hardcode;
  `:531-532` BASELINE_24 already named.
- `.github/workflows/audit-harness-v1.19-integrity.yml` — template for the 17th workflow. `:11-14`
  DUAL-APEX; `:23-30` the six `paths:` entries; `:37` and `:57-70` the hardcoded v1.19 strings;
  `:98-102` the stale span notice; `:147` the standalone check-phase-138 job (do NOT duplicate);
  `:161` rotting-external-quarterly; `:196-213` pin-helper-advisory (structurally always green);
  `:214` frozen-read-probe (the only job without `needs:`).
- `.github/workflows/audit-harness-v1.7-integrity.yml` `:14-22`, `:96` and
  `.github/workflows/audit-harness-v1.8-integrity.yml` `:95` — the two `~102s` sites (D-06).

### Publish bundle (HARN-19)
- `scripts/pipeline/build-publish-bundle.mjs` — `:23-25` the exit-1 conditions; `:40` the `'v1.17'`
  default; `:520-523` the Approved-row canary (225).
- `scripts/pipeline/build-filename-map.mjs` `:282-283` — the SECOND canary (225).
- `.claude/hooks/publish-bundle-gate.cjs` — the Stop-hook the regeneration runs under.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`check-phase-138.mjs`** — apex copy-forward template carrying all three HAZARD FIXes, the
  `CHAIN_EXTRA` sidecar, and the dual-invariant SELF check. Inherit the mechanism; re-derive every
  count and span string (D-12).
- **`check-phase-135/136/137.mjs`** — the real leaf template: `CHAIN_PHASES = []`, needles + SELF,
  no chain, no AUDIT, no NESTED guard (D-14).
- **`v1.19-milestone-audit.mjs` + `v1.19-audit-allowlist.json`** — Path-A source for the 18th
  harness (C1–C17 inherited); the harness is simultaneously this phase's conversion target (D-01).
- **`audit-harness-v1.19-integrity.yml`** — template for the 17th workflow, with four hardcoded
  v1.19 strings to re-derive (D-16).
- **`_lib/frozen-at-close.mjs`** — mature `readAtClose(tag, path)` + `lsTreeAtClose` + `frozenCause`;
  the V119 append is one entry plus one export line.
- **`check-phase-63.mjs:208-250`** — the frozen-to-frozen blob-comparison idiom for `check-phase-139`.
- **`check-phase-119.mjs:140-159`** — the spawn/try-catch idiom `check-phase-143` copies verbatim.

### Established Patterns
- **Back-anchor invariant:** at the close of milestone N, pin the PREVIOUS milestone's close SHA;
  the current milestone's pin is the successor's job.
- **`[48..N-1]` chain-apex invariant:** apex = close phase; the array spans every integer
  48..(N-1) generated by arithmetic; apex asserts self NOT in chain AND `CHAIN_SKIP` empty. The
  `CHAIN_EXTRA` sidecar is the one authorized exception and sits outside all three guards.
- **Validator-atom deferral:** content phases hand off a needle-spec; the close phase authors the
  whole validator block as one indivisible atom.
- **Amendment-first governance:** every v1.20 phase opened with a governance/amendment plan landing
  alone (140-01, 141-01, 142-01+02, 143-01). Phase 144's Plan 01 is the CARVE amendment (D-07).
- **NESTED guard:** `CHECK_PHASE_NESTED=1` short-circuits both the recursive chain-guard and the
  audit-harness re-run — which is why it can never be the drift-detection gate.

### Integration Points
- The 5 new leaves chain into apex-144; the 18th harness reads the new sidecar; the 17th CI workflow
  coexists with the 16 prior ones; the close-gate flips 28 requirements across 4 planning docs.
- `check-phase-67.mjs` is a chain member AND is pinned by `check-phase-73.mjs` — the D-03 edit is
  inside every apex chain twice over.
- Every workflow job except `frozen-read-probe` is `needs: harness-run`; a harness failure produces
  six silent skips in the new workflow, which D-21(c) classifies as gaps.

</code_context>

<specifics>
## Specific Ideas

**Live measurements taken 2026-08-11/12 at HEAD `1c474898` (Windows 10 Pro 19045) — use these, do
not re-derive:**

- **V119 SHA = `a7bda73e23efc5e3f9607c3fef37abf8ec4030aa`**, subject `docs(138-06): v1.19 MILESTONE
  CLOSE — …`, an ancestor of `master`. Recovered by the STATE-mandated subject-line method,
  **count = 1**.
- **Git state:** `master` = `1c474898`, `origin/master` = `f89a68d7`, **96 ahead / 0 behind**;
  `.git/FETCH_HEAD` dated 2026-08-09 (stale — re-fetch before the push, D-18). Remote is real and
  **public**. `phase-139-atom-5` fully merged (`git rev-list --count master..phase-139-atom-5` = 0),
  tip `c2450efa`; `origin/phase-139-atom-5` exists.
- **CI history — the decisive fact, absent from every prior Phase-144 artifact:** on **2026-08-10**
  the weekly `schedule` run executed **all 16 workflows at `f89a68d7` (= `origin/master`) and every
  one concluded `success`** — 198 jobs, 184 success, **14 event-gated skips, 0 failures** — including
  the base workflow and v1.5/v1.6/v1.7. Three 16-wide `workflow_dispatch` fan-outs have also been
  executed (2026-08-04 ×2 at `0fd5589c`/`731d9f09`, 2026-08-06 at `c2450efa`). A 17-workflow dispatch
  is one workflow more than routine, not unprecedented. **Caveat:** `f89a68d7` is 96 commits behind
  local master, so it does not prove the post-push state.
- **All ten standalone-RED members exit 0 at HEAD (non-nested):** 30 → 12/0/1 · 31 → 29/0/1 ·
  48 → 7/0/0 · 60 → 25/0/0 · 61 → 34/0/0 · 62 → 34/0/0 · 63 → 32/0/0 · 64 → 29/0/0 · 65 → 33/0/0 ·
  66 → 28/0/0. `regenerate-supervision-pins.mjs --self-test` → PASS, `Diff: identical`, exit 0.
  The two SKIPs (`V-30-13`, `V-31-30`) are deterministic environment skips on absent
  `markdown-link-check` / `mermaid-cli` (neither in `package.json`; `check-phase-31.mjs:176` uses
  `npx --yes --no-install`, so they skip on Linux too) — classify them, do not read them as gaps.
- **Apex-138 at HEAD: `95 PASS, 0 FAIL, 0 SKIPPED` in ~17 s** = 1 AUDIT + 92 CHAIN (90 + 2
  `CHAIN_EXTRA`) + 1 AUDIT-HARNESS + 1 SELF. (A 54.3 s reading from one Finder did not reproduce —
  load contamination; the ~17 s figure of record stands.)
- **Pin-drift against the V119 SHA: real drift is ZERO.** `git diff --name-only a7bda73e..HEAD --
  docs scripts .github` = **106** files; the v1.19 sidecar names **33** distinct `docs/` files (not
  16 — `c13_rotting_external` is an object of nested arrays and a naive top-level walk silently
  misses 17); intersection = **5** files, 3 of them line-pinned; all **21** hunks are 1:1
  line-neutral under `git diff -U0` (identical before/after line numbers, added == deleted) — the
  anchor-id insertions and `{#id}` removals from Phase 143. **Adjudication rule:** file-granular
  intersection is only the candidate set; the verdict is line-granular.
- **Publish-bundle canaries are GREEN:** `build-publish-bundle.mjs:520-523` expects 225,
  `build-filename-map.mjs:282-283` expects 225, the live registry has exactly 225 Approved rows, and
  both self-tests pass (15/15 and 8/8, exit 0). Phase 143's 145 link repairs and 87 `{#id}`
  conversions moved zero registry rows.
- **Workflow triggers:** 0 of 16 carry `push:`; 16 of 16 carry `workflow_dispatch:` AND `schedule:`;
  `gh workflow list --all` → 16/16 **active**. `ls .github/workflows/*.yaml` = 0.
- **`carve-gate.mjs` at HEAD:** `in-scope=106 on-list=106 off-list=0`, exit 0. A new
  `check-phase-139.mjs` matches **zero** of the 82 allowlist patterns.
- **Corpus:** `grep -rc '{#' docs/ --include=*.md` sums to **0** (D-38's all-87 conversion complete).
  **145 documents** sit at exactly 90 days against C5/C10's `> 90` static test.
- **Working tree:** 104 porcelain entries (`-uall`), 8 worktrees, 7 unmerged `worktree-agent-*`
  branches. None inside the CARVE gate's scope.

**Corrections of record to carry into `v1.20-MILESTONE-AUDIT.md`:**

1. There is **no "three reddest workflows" ranking** anywhere in this repo (`grep -ri 'reddest'
   .planning/` → 0 hits). The red set of record is base + v1.5..v1.13 (ten), with no severity order;
   7 of the 10 were outside Phase 141's 3-workflow sample.
2. The `~102s` stale figure is a **two-site** class (v1.7:96 + v1.8:95), and five routing documents
   cite `:95` for v1.7 — which is the v1.8 line.
3. `check-phase-138.mjs:41` describes the v1.19 harness as "17-check"; it registers **16** (C8
   absent).
4. `142-01-SUMMARY.md:91`'s `grep -c '^| ' == 14` pin on `v1.20-DEFERRED-CLEANUP.md` is already
   stale at **17** — a passed-at-the-time assertion, not a re-runnable gate.
5. The post-close-gate "`V-144-AUDIT` is PASS not SKIP" check **cannot** detect a wrong archival
   token — `archive-path.mjs:23-24` resolves the live path first. Demonstrated by
   `check-phase-125.mjs:86`, which carries the wrong token `['v1.15-phases']` and has been
   permanently green with a false detail string ever since.

</specifics>

<deferred>
## Deferred Ideas

- **The three older remote atom branches** (`origin/phase-119-atom-2`, `origin/phase-125-atom-2`,
  `origin/phase-128-atom-2`) — same "close-phase atom branch never cleaned up" class as
  `phase-139-atom-5`, all fully merged, but carrying no standing instruction routing them to this
  phase. Batching three unrelated remote deletions into the terminal close is exactly what
  HARNESS-PHASE bars. A successor should close the class in one deliberate sweep.
- **The C17 frozen-aware conversion** — after this phase all 5 C17-bearing harnesses (v1.15–v1.19)
  still read live HEAD on that leg. Registered as a NEW deferred item (D-02/D-28); it is CARVE-1's
  genuine surviving residue.
- **The 10 unowned tooling items in `v1.20-DEFERRED-CLEANUP.md`** (rows 1-6, 9, 10, 14, 15) —
  including `FENCE-AXIS-02` and `check-phase-66.mjs:274`'s live fence tracker inside a frozen chain
  validator. None has an owning requirement; they carry forward.
- **`V-132-HUBSNOTWIRED-REGEX-BROKEN` and `RECIPE-OUTBOUND-LINK-COVERAGE`** — both stay OPEN
  (D-28). The first needs a milestone that legitimately re-opens `scripts/validation/` predecessors;
  the second needs `check-nav-hub-links.mjs` given a real execution site in CI or `package.json`,
  which `check-phase-143.mjs` only partially supplies (via the apex chain, not as a standalone job).
- **The seven stale `worktree-agent-*` branches and 104 untracked working-tree entries** — outside
  the CARVE gate's scope and outside this phase's mandate, but they are what Axis-1 and Axis-3 run
  against. A cleanup sweep belongs to a tooling phase.
- **`REQUIREMENTS.md:114`'s "flips six currently-green workflows red" count** — measured before
  Phase 140's frozen-aware conversion and now stale. Re-derive or drop it in a successor; do not
  weaken the glossary prohibition itself (D-34).
- **The `parseAllowlist` v1.7 lineage freeze** — `regenerate-supervision-pins.mjs` has read the v1.7
  sidecar for 13 milestones; `:415`'s promised one-line repoint was never honoured.

### Reviewed Todos (not folded)
None — `todo.match-phase 144` returned 0 matches.

</deferred>

---

*Phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close*
*Context gathered: 2026-08-12*
