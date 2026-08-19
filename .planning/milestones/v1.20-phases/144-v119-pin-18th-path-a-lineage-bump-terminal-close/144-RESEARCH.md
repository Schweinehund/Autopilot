# Phase 144: V119 Pin + 18th Path-A Lineage Bump + Terminal Close - Research

**Researched:** 2026-08-12
**Domain:** CI/validator-chain tooling (Node.js validator scripts, GitHub Actions workflows, git frozen-read introspection) — no application code, no new runtime dependency
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

### Area A — What ships inside the close cluster

- **D-01: The v1.19 harness's frozen-aware conversion lands HERE, in the same plan as the V119 pin.**
  Mandatory, not batching: SWEEP-05's own amended text says so ("the v1.19 harness converts in Phase
  144, in the same plan as HARN-17's `V119` pin, because `MILESTONE_CLOSE_SHAS` carries no `V119`
  entry today"), and the dependency is mechanical. `[MEASURED]` `v1.19-milestone-audit.mjs` is the
  SOLE unconverted harness — 16 of 17 already import `_lib/frozen-at-close.mjs`. This is therefore
  the **seventeenth** application of the pattern, not the sixteenth.

- **D-02: The v1.19 C17 leg stays on live HEAD — and that extension is recorded as a
  `[SUCCESS-CRITERION AMENDMENT, D-NN]` on SWEEP-05, not as a sentence in the harness header.**
  SWEEP-05's named limitation is textually scoped "in v1.15 through v1.18"; v1.19 is not in it, so
  extending it is a change to ratified requirement text and needs this repo's own instrument (inline
  marker, superseded text preserved). `[MEASURED CORRECTION]` the residue is **5 of the 5
  C17-bearing harnesses**, not 5 of 17 — only v1.15–v1.19 carry a C17 check at all. Register that
  residue as a NEW deferred item (see D-27).

- **D-03: `check-phase-67.mjs`'s remaining fail-loud sites land here — TEN sites in TWO classes, not
  seven. OWNER-RATIFIED 2026-08-12.** `v1.20-CARVE.md:272-274` states the obligation as "7
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

- **D-04: The SWEEP-09 provenance remedy is the traceability CELL plus an inline amendment marker —
  never a footer annotation.** `[MEASURED]` `REQUIREMENTS.md:154` reads
  `| SWEEP-09 | Phase 141 | Complete |`; the repo's own two-phase form is one row away at `:131`
  (`| SWEEP-05 | Phase 140, Phase 144 | Pending |`). Correct `:154` to `Phase 141, Phase 144`.
  **Correction of record:** the real provenance defect is `REQUIREMENTS.md:165`, which justified the
  Complete flip by the CI fan-out ("three runs, one shared SHA `275bbad1`, 41 jobs"), not by the site
  census — so SWEEP-09's own amended text already names Phase 144 and the "silently extending a
  Complete requirement" framing is withdrawn.

- **D-05: `check-phase-143.mjs` implements `143-NEEDLE-SPEC.md` §1–§5 verbatim, HONOURS §6 (no C18
  harness fold), and DECLINES the §"corpus-level invariant worth pinning too" recommendation.
  OWNER-RATIFIED 2026-08-12.** The decline is a REVERSAL of the draft ruling: a live-HEAD,
  `docs/`-wide "zero `{#`" assertion inside a permanent apex member is the exact class
  `carve-gate.mjs:8-12` names in its own words — *"A live-HEAD diff assertion frozen into a permanent
  apex member would go RED at the first v1.21 content commit and stay red forever — manufacturing
  exactly the accepted-red class this milestone's bar requires deleting."* The spec itself bounds the
  omission cost as trivial (a stray override renders as visible junk text, caught in ordinary content
  review). D-26's decoupling stands: if the wiring turns red, HARN-19's sub-second spot-check of
  `check-nav-hub-links.mjs` protects the bar.
  Correction to the draft's reasoning: the apex's termini assert is **numeric-only** — a missing leaf
  is caught by HAZARD FIX 3 (`check-phase-138.mjs:182-186`), not by the module-load guard.

- **D-06: FIX the stale `~102s` figure — in BOTH files. REVERSED from "carry it". OWNER-RATIFIED
  2026-08-12.** Both cost legs of the draft's carry ruling are falsified:
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

- **D-07: Plan 01 is a CARVE amendment, alone, first. This is a hard blocker on every other edit in
  the phase.** `[MEASURED]` the v1.20 allowlist contains no entry for `check-phase-139.mjs` …
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

- **D-08: `CHAIN_START = 48`, `CHAIN_END = 143`, `CHAIN_PHASES` generated by `Array.from`, length
  assert `!== 96`, termini assert `48..143`, `CHAIN_SKIP = new Set([])`.** This is the D-25
  owner-ratified correction of the `[48..138]` drafting error surviving at two ratified sites.
  Never transcribe the array.

- **D-09: `CHAIN_EXTRA = [30, 31]` carries forward verbatim, including its exclusion from all three
  module-load guards and from the SELF dual-invariant.** `[MEASURED]` apex-138 keeps it out of the
  dedup guard (`:114`), the length guard (`:120`), the termini guard (`:123`) and `V-138-SELF`
  (`:249-255`) — replicate exactly; D-11 forbids collapsing it into the span. Add one line the
  predecessor lacks: `assert CHAIN_EXTRA.every(n => !CHAIN_PHASES.includes(n))` — `CHAIN_EXTRA` is
  declared at `:165`, AFTER all three guards, and is structurally uncoverable by them.

- **D-10: Expected apex-144 result — 98 executed children, 101 total checks; `101/0/0` once
  `144-VERIFICATION.md` exists, `100/0/1` before it, and `99/1/1` if run before
  `v1.20-milestone-audit.mjs` lands.** The third case is the one the draft missed: `[MEASURED]` the
  AUDIT-HARNESS `existsSync`→FAIL branch sits at `:220-224`, BEFORE the NESTED guard at `:225`.
  Under 138 D-05's exact-match PASS/FAIL/SKIP table an ordering slip becomes a recorded FAIL.
  Arithmetic verified by execution: `check-phase-138.mjs` → `95 PASS, 0 FAIL, 0 SKIPPED` = 1 AUDIT +
  92 CHAIN + 1 AUDIT-HARNESS + 1 SELF, so 96 + 2 + 3 = 101 is sound.

- **D-11: Author leaves `139..143` BEFORE the apex.** HAZARD FIX 3 makes each absent chain child a
  hard FAIL, so apex-first yields exactly 5 FAILs indistinguishable from a real regression. This
  ordering constraint appears in no prior artifact.

- **D-12: Inherit apex-138's three HAZARD FIXes as MECHANISM, and re-derive every count and span
  string.** Not "verbatim with header comments" — `[MEASURED]` `check-phase-138.mjs:185` emits
  `"the fixed 90-entry CHAIN_PHASES span"` at RUNTIME, `:70` carries `[48..137]`, `:256` prints
  `CHAIN_PHASES = [48..137] (90 entries)`, and `:41` says "17-check v1.19 harness" when the harness
  registers **16** (C8 absent). Copied literally, the new apex prints stale numbers into close-audit
  evidence. Keep: `maxBuffer: 20 * 1024 * 1024`; `isMissing = err.code === 'ENOENT' || err.status ===
  127`; absent child ⇒ FAIL; `isPeer` at `phaseNum >= 67`; 600 s peer / 300 s per-subprocess /
  300 s AUDIT-HARNESS.

- **D-13: `V-144-AUDIT-HARNESS` points at `scripts/validation/v1.20-milestone-audit.mjs` — absent ⇒
  FAIL (regression, not skip), NESTED ⇒ skip the re-run.** Copy apex-138's shape exactly.

- **D-14: The five leaves are LIGHTWEIGHT — `CHAIN_PHASES = []`, no AUDIT check, no AUDIT-HARNESS
  check, no NESTED guard, deliverable/content needles + a SELF dual-invariant. REVERSED from the
  apex template.** `[MEASURED]` `check-phase-135.mjs:44`, `-136.mjs:40`, `-137.mjs:36` all set
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

- **D-15: Zero `.planning/phases/` reads in the five new leaves — and the archival-token guardrail is
  REPLACED, because the drafted one does not work.** The sidestep is the only option available:
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

- **D-16: The 17th workflow is a Path-A copy of `audit-harness-v1.19-integrity.yml` with every
  hardcoded v1.19 string re-derived, all SIX `paths:` entries mirrored, and NO standalone
  `check-phase-138` job.** `[MEASURED]` the v1.19 workflow is the only carrier of a standalone
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

- **D-17: Sidecar = header-fields-only copy (`generated`, `phase`); append BASELINE_24 following
  BASELINE_23's shape; repoint the v1.20 harness's sidecar `readFile(...)`. NEVER cite
  `regenerate-supervision-pins.mjs --report` as pin-drift proof** — it hardcodes the **v1.7** sidecar
  (`:290`, `:336`, `:563`) and walks only 26 of 59 line-pins. `regenerate-supervision-pins.mjs:531-532`
  already names BASELINE_24 as next in the Path-A chain.
  **The pin-drift result is MEASURED, not speculative — real drift is ZERO.** See `<specifics>` for
  the numbers and the adjudication rule.

### Area C — Push, dispatch, evidence, the red path

- **D-18: The OWNER executes `git push origin master` at a named blocking checkpoint, after the
  harness/validator/workflow atoms land and before the close-gate is authored.** `v1.18-MILESTONE-AUDIT.md:254`
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

- **D-19: Dispatch all 17, enumerated BY NAME from a live `ls .github/workflows/*.yml` + `*.yaml` at
  dispatch time — never from a carried count.** Dispatch is not a stricter standard chosen for
  comfort: ROADMAP SC#3 requires it explicitly ("`gh workflow run --ref master`, since a push fires
  nothing"), and the weekly cron cannot supply SHA-controlled evidence at the close SHA.

- **D-20: ONE shared SHA across all three axes — `origin/master` HEAD at dispatch time — AND a
  read-back assertion.** After dispatch, assert every one of the 17 runs' `.headSha` equals the
  recorded value. The v1.17 precedent this rule cites as defective (`gha_authoritative_sha` ≠ Axis-1
  clone SHA yet `cross_os_exact_match: true`) is precisely a missing read-back.

- **D-21: Evidence is job-level JSON matched on the DISPLAY-name field, with four rules the draft
  lacked.**
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

- **D-22: Exactly ONE remediation round. If a job is still red after it, HARN-19 is recorded UNMET
  and the milestone does not ship this phase. OWNER-RATIFIED 2026-08-12.** Never "satisfied by
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

- **D-23: `origin/phase-139-atom-5` — audit and report; the delete/keep call goes to the OWNER at the
  same checkpoint as the push. REVERSED from "delete at close". OWNER-RATIFIED 2026-08-12.**
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

- **D-24: A SINGLE close-gate commit flips all 28 requirements to Validated across
  PROJECT / ROADMAP / STATE / REQUIREMENTS.** D-24 rules the FLIP atomic, not the phase — a later
  non-gate commit recording the post-gate confirmatory apex result is permitted and expected (v1.19
  needed one). The `.planning/` artifacts sit outside the CARVE gate's scope
  (`IN_SCOPE_PREFIXES = ['scripts/', '.github/', 'docs/']`), so there is no conflict with D-07.

- **D-25: SWEEP-05 flips on its own amended text; SWEEP-06 needs a MEASUREMENT first, and both
  traceability cells get corrected.** `[MEASURED]` SWEEP-06 (`REQUIREMENTS.md:21`) carries NO
  amendment marker and NO Phase-144 mention, and its row `:132` reads "Phase 140" alone — the
  authority is `140-05-SUMMARY.md:38/:110`, not an inline amendment, so the draft's "both span…
  by their own amended text" was false for SWEEP-06. Before flipping it, measure the newly-converted
  **v1.19** harness against `check-phase-60.mjs`'s 60-second subprocess budget: Phase 140 measured
  sixteen harnesses (slowest 4,177 ms) and never the seventeenth, and `140-05-PLAN.md:38` records,
  owner-acknowledged, that SWEEP-06's edge coverage "is unclassified and stays unresolved".
  Correct `:132` → `Phase 140, Phase 144` and `:154` → `Phase 141, Phase 144`.

- **D-26: `ACCEPTED-STANDALONE-CI-RED` is discharged by all 17 green at the shared SHA (job-level
  JSON, every skip classified); `ACCEPTED-SCOPED-RED` by re-running all ten members standalone at
  the close SHA.** `[MEASURED]` the premise holds at HEAD — all ten exit 0 (see `<specifics>`) —
  but those runs must be repeated at the close SHA rather than inherited from Phase 141/142 evidence,
  because 96 commits including Phase 143's 145 corpus repairs have landed since. Note the arithmetic:
  the disposition spans 15 workflows (v1.4–v1.18) and the bar is 17, so all-17-green entails
  discharge. Consume routed item 7 explicitly — the 13-workflow `pull_request.paths` cascade fires on
  the close PR, which is the disposition's own named trigger surface.

- **D-27: The v1.20 deferred-cleanup close artifact is ABSORB-AND-APPEND at the existing path, not a
  wholesale rewrite.** `[MEASURED]` `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` already exists
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

- **D-29: Terminal ordering — the publish bundle moves BEFORE the close-gate. OWNER-RATIFIED
  2026-08-12.**
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

- **D-31: `_lib/frozen-at-close.mjs` is APPEND-ONLY, with ONE carved exception. OWNER-RATIFIED
  2026-08-12.** Append the V119 entry + `readAtV119Close` + whatever convenience exports the v1.19
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

- **D-34: Never touch either glossary's `last_verified` / `review_by` — and the stated mechanism is
  CORRECTED.** `[MEASURED]` `v1.19-milestone-audit.mjs:408-412`:
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

### Deferred Ideas (OUT OF SCOPE)

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

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-17 | `_lib/frozen-at-close.mjs` gains the V119 entry (`a7bda73e...`) + `readAtV119Close` export | Pattern 6 gives the exact insertion point (after V118, before V14), the abbreviated-SHA-format constraint (VERIFIED against every existing entry), and the convenience-export shape; Pattern 3 gives the v1.19 harness's second-half conversion, side-by-side against the already-converted v1.18 exemplar |
| HARN-18 | 18th Path-A lineage bump — `v1.20-milestone-audit.mjs` + `v1.20-audit-allowlist.json` + BASELINE_24 + `check-phase-139..143.mjs` (5 leaves) + `check-phase-144.mjs` (apex, `[48..143]`) + 17th CI coexistence workflow | Pattern 1 (leaf template) + Pattern 4 (apex re-derivation) + Pattern 5 (18th-workflow diff) + Common Pitfalls 1-3 (the self-referential needle traps unique to this phase) give concrete, code-verified guidance; Code Examples reproduces check-phase-67.mjs's exact 10-site shape for the routed item |
| HARN-19 | 3-axis terminal re-audit + all 17 workflows dispatched green from job-level JSON + publish bundle `--version=v1.20` + SINGLE close-gate commit | "v1.20-MILESTONE-AUDIT.md shape" gives the target document's section list, read directly off the v1.19 exemplar; Pitfall 4 (job-key vs display-name) documents the concrete evidence-gathering trap; Environment Availability confirms every dispatch/evidence tool this step needs is already available and already exercised successfully this milestone |

</phase_requirements>

## Summary

This phase has almost no open technical unknowns — `144-CONTEXT.md` is an unusually complete,
codebase-grounded artifact (29 candidate rulings + 82 adversarially-reviewed findings, 35 ratified
`D-NN` decisions). This research does not re-litigate any of that. Its job, per the orchestrator's
brief, is to answer the six questions CONTEXT.md explicitly left open: (1) concrete needle
candidates for `check-phase-139..142.mjs`, derived from each phase's own `VERIFICATION.md`/
`SUMMARY.md` measured actuals; (2) the exact mechanics of the v1.19 harness's frozen-aware
conversion, read directly from the v1.18-converted exemplar; (3) the precise shape of
`check-phase-67.mjs`'s 10 fail-loud sites, code-verified against the live file; (4) the 17th-vs-18th
workflow diff, read directly from `audit-harness-v1.19-integrity.yml`; (5) the shape
`v1.20-MILESTONE-AUDIT.md` must take, read directly from `v1.19-MILESTONE-AUDIT.md`; and (6) how
`check-phase-139.mjs`'s frozen-to-frozen CARVE assertion should follow the `check-phase-63.mjs`
pattern — including a live-measured, ready-to-use example.

Two non-obvious traps surfaced during this research that CONTEXT.md does not call out explicitly and
that a planner following the `135/136/137.mjs` lightweight-leaf template naively could walk into:
**check-phase-140's needle must never assert `v1.19-milestone-audit.mjs` stays unconverted**, and
**check-phase-141's needle must never pin `check-phase-67.mjs`'s current chicken-and-egg count**
— both facts are true only until this same phase's own later plans land, and since
`check-phase-140`/`-141` become permanent chain members of `check-phase-144`'s own apex, a
negative/exact-count assertion of either kind would self-detonate the apex the moment this phase's
own commits complete. See Common Pitfalls.

**Primary recommendation:** build the five new leaves strictly on the `check-phase-135/136/137.mjs`
lightweight template (needles + `V-1NN-SELF`, zero chain, zero AUDIT/AUDIT-HARNESS/NESTED
references), derive every needle from the concrete VERIFICATION.md-measured facts below (never from
CONTEXT.md prose, and never from `.planning/phases/**` reads per D-15), build `check-phase-144.mjs`
as a literal re-derivation of `check-phase-138.mjs`'s structure with `[48..143]` (96 entries) and one
new module-load guard `CHAIN_EXTRA.every(n => !CHAIN_PHASES.includes(n))`, convert
`v1.19-milestone-audit.mjs` using `v1.18-milestone-audit.mjs`'s already-converted source as the
literal template (`createFrozenCorpusReader('V119', ...)`, C17 leg excepted per D-02), and copy
`audit-harness-v1.19-integrity.yml` forward with every hardcoded `v1.19`/`v1.18` string re-derived
and the DUAL-APEX-but-no-check-phase-138-job discipline preserved.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Back-anchor SHA pin (`V119`) | Validation/CI tooling (`_lib/frozen-at-close.mjs`) | — | Pure data — a git SHA constant + convenience export; no runtime service involved |
| v1.19 harness frozen-aware conversion | Validation/CI tooling (`v1.19-milestone-audit.mjs`) | — | Corpus-audit logic run as a Node CLI subprocess, not a served application |
| 18th Path-A harness + sidecar + BASELINE_24 | Validation/CI tooling | — | Same tier as the harness it copies from |
| 5 new leaf validators + apex `check-phase-144.mjs` | Validation/CI tooling | — | Node CLI scripts spawned by CI and by each other, never by an HTTP boundary |
| 17th CI workflow | CI/CD (GitHub Actions) | Validation/CI tooling | Orchestrates the Node validators above; the workflow YAML itself has no application logic |
| 3-axis terminal re-audit + dispatch | CI/CD (GitHub Actions) + local git tooling | — | Cross-references a local clone, a Linux GHA run, and a dispatched agent — no browser/API tier involved anywhere in this phase |
| Close-gate commit (28 reqs → Validated) | Documentation/planning artifacts (`.planning/`) | — | Plain-text markdown/YAML frontmatter edits; `check-phase-54.mjs` is the sole live reader |
| Publish bundle regeneration | Build/pipeline tooling (`scripts/pipeline/`) | — | Existing pandoc-based `.docx` build, invoked with `--version=v1.20`, not modified structurally |

This project has no browser/frontend/API-server tiers in scope for this phase — it is entirely
internal tooling (Node.js CLI validators + GitHub Actions YAML + git plumbing), consistent with every
prior harness-close phase (100/112/119/125/128/134/138).

## Standard Stack

No new external package is introduced by this phase. Everything below is already installed, already
pinned, or is Node.js/git built-ins.

### Core (already in place, reused verbatim)
| Tool | Version | Purpose | Why Standard (for this repo) |
|------|---------|---------|-------------------------------|
| Node.js | 20 (CI) / v24.17.0 (measured local, per `143-EVIDENCE.md`) | Runs every `check-phase-*.mjs` / `vX.Y-milestone-audit.mjs` validator | Zero-dependency validator scripts (`node:fs`, `node:child_process`, `node:path`, `node:process` only) — this project's own established pattern across 90+ prior validators |
| git (CLI, via `execFileSync`) | whatever ships on `ubuntu-latest` / the local machine | Frozen-read introspection (`git show`, `git rev-parse`, `git ls-tree`, `git cat-file --batch`) | The entire `_lib/frozen-at-close.mjs` module is a thin wrapper over these four git subcommands — never a git library dependency |
| `gh` CLI | pre-installed on the dispatch machine (used successfully in Phases 139/141) | `gh workflow run --ref master` + `gh run list`/`gh run view --json jobs` for HARN-19's dispatch-and-evidence step | Already the project's established Axis-2 evidence mechanism (D-21/D-23 in `138-CONTEXT.md`; `139-06-SUMMARY.md`) |
| `markdown-link-check@3.14.2` | pinned (existing) | Quarterly `rotting-external-quarterly` CI job in every `audit-harness-*.yml`, including the 17th | Version pinned since Phase 66; not touched by this phase — the 18th workflow copies the same pinned version string forward |

### Supporting
None — this phase adds no supporting library. `scripts/pipeline/build-publish-bundle.mjs` (pandoc-based) is invoked, not modified.

### Alternatives Considered
Not applicable — there is no library-selection decision in this phase. The entire "stack" is this
repository's own established validator/harness/workflow pattern, extended by one more generation.

**Installation:** none required — no `npm install` in this phase's scope.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero new external packages (npm, pip, or otherwise). The
only external tool referenced (`markdown-link-check@3.14.2`) is an existing pin, copied forward
byte-identical from `audit-harness-v1.19-integrity.yml` into the 17th workflow — not a new
installation this phase authors. No `package-legitimacy check` run is required.

## Architecture Patterns

### System Architecture Diagram

```
                         ┌─────────────────────────────────────────────┐
                         │  Phase 144 Plan 01 (MUST run alone, first)   │
                         │  CARVE amendment: 6 new validator paths +    │
                         │  v1.20-audit-allowlist.json literally listed │
                         └───────────────────┬───────────────────────────┘
                                              │ unblocks all further edits
                                              ▼
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  HARN-17: _lib/frozen-at-close.mjs                                       │
   │    MILESTONE_CLOSE_SHAS.V119 = 'a7bda73e...'  (append, after V118)       │
   │    readAtV119Close / lsTreeAtV119Close  (convenience exports)            │
   └───────────────────────────────┬────────────────────────────────────────┘
                                    │ consumed by
                                    ▼
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  v1.19-milestone-audit.mjs  (converted IN PLACE, same file)              │
   │    createFrozenCorpusReader('V119', {extraPaths:[sidecar]})              │
   │    C1-C16 frozen-aware ; C17 (c17-eee-contract.mjs spawn) stays live-HEAD │
   └───────────────────────────────┬────────────────────────────────────────┘
                                    │ spawned by (AUDIT-HARNESS check)
                                    ▼
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  check-phase-144.mjs  (NEW apex, [48..143], 96 arithmetic entries        │
   │    + CHAIN_EXTRA=[30,31] sidecar, 3 HAZARD FIXES inherited as mechanism) │
   │      ├─ V-144-AUDIT     → resolveArchivedPhasePath(['v1.20-phases'])    │
   │      ├─ V-144-CHAIN-48..143  → 96 subprocess spawns (NESTED-aware)      │
   │      ├─ V-144-AUDIT-HARNESS  → spawns v1.20-milestone-audit.mjs          │
   │      └─ V-144-SELF       → dual-invariant guard                         │
   └───────┬───────────────────────────┬───────────────────────┬────────────┘
           │ (5 of the 96 are NEW)     │                       │
           ▼                           ▼                       ▼
  check-phase-139..143.mjs   v1.20-milestone-audit.mjs   17th CI workflow
  (lightweight leaves,       (Path-A from v1.19,          (audit-harness-v1.20-
   CHAIN_PHASES=[])          C1-C17 inherited)             integrity.yml, born
                                                            fetch-depth:0)
                                    │
                                    ▼
                      HARN-19: push → dispatch all 17 by name →
                      3-axis re-audit (EXACT MATCH) → publish bundle
                      --version=v1.20 → SINGLE close-gate commit
                      (28 reqs → Validated, backlog dispositions deleted)
```

The primary use case (a future CI run or a future planner reading this apex) traces top-to-bottom:
CARVE authorization → back-anchor pin → harness conversion → new apex → new leaves + new harness +
new workflow, all converging on the terminal 3-axis/close-gate step.

### Recommended Project Structure
No new directories. All artifacts land in the existing flat layout:
```
scripts/validation/
├── _lib/frozen-at-close.mjs        # + V119 entry, readAtV119Close, lsTreeAtV119Close
├── v1.19-milestone-audit.mjs       # converted in place (createFrozenCorpusReader)
├── v1.20-milestone-audit.mjs       # NEW — Path-A copy of the converted v1.19 harness
├── v1.20-audit-allowlist.json      # NEW — header-fields-only copy of v1.19's sidecar
├── check-phase-139.mjs .. -143.mjs # NEW — 5 lightweight leaves
├── check-phase-144.mjs             # NEW — apex, [48..143]
├── check-phase-67.mjs              # edited in place — 10 fail-loud sites
└── regenerate-supervision-pins.mjs # + BASELINE_24 (header-only, no coordinate change)
.github/workflows/
├── audit-harness-v1.19-integrity.yml  # frozen (read as the 18th's template only)
├── audit-harness-v1.20-integrity.yml  # NEW — 17th... wait, 17th CI *coexistence* workflow (18th harness generation, 17th parallel CI file)
├── audit-harness-v1.7-integrity.yml   # edited — the ~102s stale figure (line 96)
└── audit-harness-v1.8-integrity.yml   # edited — the ~102s stale figure (line 95)
.planning/milestones/
├── v1.20-CARVE.md                  # amended (Plan 01, alone, first)
├── v1.20-audit-allowlist.json glob # added to CARVE allowlist
├── v1.20-DEFERRED-CLEANUP.md       # absorb-and-append (D-27)
└── v1.20-MILESTONE-AUDIT.md        # NEW — shape below
```

### Pattern 1: Lightweight leaf validator (the true template)
**What:** `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`, needle checks + `V-1NN-SELF`
dual-invariant, zero AUDIT/AUDIT-HARNESS/NESTED references, runner loop copied verbatim.
**When to use:** every one of `check-phase-139.mjs` through `check-phase-143.mjs` — never the apex
template (`check-phase-138.mjs`'s AUDIT+CHAIN+AUDIT-HARNESS+SELF shape).
**Example (full, live-verified source):**
```js
// Source: scripts/validation/check-phase-135.mjs (D-14's cited true template)
// Lightweight: NO chain (chain lives only in apex check-phase-138.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
// ... needle checks (readFile/existsSync only; zero execFileSync unless a spawn-based
//     needle like the check-phase-143 spec calls for one) ...
checks.push({
  id: 'SELF',
  name: 'V-135-SELF: CHAIN_PHASES does NOT include 135; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(135)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 135 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      return { pass: false, detail: 'CHAIN_SKIP non-empty -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (135 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```
Rename `135`→`139`/`140`/`141`/`142`/`143` throughout; the runner-loop tail (`LABEL_WIDTH`,
`padLabel`, the summary line) is copied byte-identical across all three existing examples
(`check-phase-135/136/137.mjs`) — treat it as fixed boilerplate, not a design choice.

### Pattern 2: Frozen-to-frozen blob-comparison assertion (check-phase-63.mjs:208-250)
**What:** compares a file's git blob hash **at a fixed, already-past commit SHA** against a
recorded baseline hash — never against live HEAD.
**When to use:** `check-phase-139.mjs`'s CARVE assertion (D-14 names this pattern explicitly).
**Example (live-verified source, `check-phase-63.mjs:208-230`):**
```js
// Source: scripts/validation/check-phase-63.mjs:208-230
{
  id: 8, name: 'V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 732588a5... [v1.13-frozen @ ba24f1a]',
  run() {
    const BASELINE = '732588a57fd762c294400a4f6fd9a065c974216c';
    const FROZEN_SHA = MILESTONE_CLOSE_SHAS.V113;  // ba24f1a
    try {
      const result = execFileSync('git', ['rev-parse', FROZEN_SHA + ':' + MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
      const actual = result.toString().trim();
      if (actual !== BASELINE) {
        return { pass: false, detail: 'blob hash CHANGED @v1.13-close: expected ' + BASELINE + ', got ' + actual };
      }
      return { pass: true, detail: 'blob @v1.13-close matches baseline ' + BASELINE };
    } catch (err) {
      return { pass: true, skipped: true, detail: 'git rev-parse not available -- skipped' };
    }
  }
}
```
**Ready-to-use target for `check-phase-139.mjs` (measured this session, VERIFIED, not assumed):**
`scripts/validation/carve-gate.mjs` has not been touched since Phase 139's own last edit commit.
```
$ git log -1 --format=%H -- scripts/validation/carve-gate.mjs
04e26106c859176d58b98079575a50faceeed7cd
$ git rev-parse 04e26106:scripts/validation/carve-gate.mjs
849f9639e1108090bc360e705aaa784b0144fe66
$ git rev-parse HEAD:scripts/validation/carve-gate.mjs
849f9639e1108090bc360e705aaa784b0144fe66   # identical — zero drift since Phase 139 closed
```
This gives `check-phase-139.mjs` a genuine frozen-to-frozen assertion, exactly mirroring
`check-phase-63.mjs`'s idiom, with no `MILESTONE_CLOSE_SHAS` entry required: the target commit is a
**raw literal SHA** (`'04e26106'`), the same shape the `V14` pin uses for an "AUDIT-CLOSE" (not a
milestone-close-gate) pin — see `_lib/frozen-at-close.mjs:135-158`'s comment on why `V14` skips
`MILESTONE_CLOSE_SHAS` registration entirely for exactly this kind of phase-scoped, non-milestone
pin. `git rev-parse <SHA>:<path>` needs no `MILESTONE_CLOSE_SHAS` lookup at all — it works with any
reachable commit, tagged or not.

### Pattern 3: `createFrozenCorpusReader` conversion (v1.18, already-converted exemplar)
**What:** the exact mechanical diff between an unconverted harness (`v1.19-milestone-audit.mjs`,
current state) and a converted one (`v1.18-milestone-audit.mjs`, current state) — this is the literal
template for HARN-17's second half (the v1.19 conversion).
**Example (both sides live-verified):**
```js
// UNCONVERTED (v1.19-milestone-audit.mjs, current):
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.19-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try { return JSON.parse(raw); } catch (err) { return { _parseError: err.message, ... }; }
}
const ALLOWLIST = parseAllowlist();

// CONVERTED (v1.18-milestone-audit.mjs, current — the literal template to copy):
import { createFrozenCorpusReader } from './_lib/frozen-at-close.mjs';
const MILESTONE_TAG = 'V118';
const SIDECAR_PATH = 'scripts/validation/v1.18-audit-allowlist.json'; // UNCHANGED literal -- GOV-02
const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] });

function readFile(relPath) {
  const c = FROZEN.get(relPath);
  return c === undefined ? null : c;   // undefined (never enumerated) and null (absent-at-SHA)
}                                        // both read as "missing" to every existing caller

function walkMd(dir) {
  const prefix = dir.endsWith('/') ? dir : dir + '/';
  return FROZEN.paths.filter((p) => p.startsWith(prefix)).map((p) => join(process.cwd(), p));
}

function parseAllowlist() {
  const raw = FROZEN.get(SIDECAR_PATH);
  if (raw === undefined || raw === null) {
    throw new Error(`Sidecar absent at frozen SHA (${MILESTONE_TAG}): ${SIDECAR_PATH} -- D-07 fail-loud`);
  }
  try { return JSON.parse(raw); } catch (err) { return { _parseError: err.message, ... }; }
}
```
Every `FROZEN.has(p)` call site (formerly `existsSync(join(process.cwd(), p))`) is a straight
substitution — grep `existsSync(join(process.cwd()` in `v1.18-milestone-audit.mjs`'s check bodies
returns exactly **1** hit, and that hit is the C17 exception below, not a missed conversion site.

**The C17 exception (D-02, byte-verified in `v1.18-milestone-audit.mjs:827-844`):**
```js
run() {
  const CONTRACT = 'scripts/validation/c17-eee-contract.mjs';
  // SWEEP-05 EXCEPTION (Phase 140, deferred per CONTEXT.md <deferred>): this guard and the C17
  // spawn below intentionally stay LIVE-HEAD. c17-eee-contract.mjs is CARVE Category 3, owned by
  // Phase 143 -- converting this leg here would collide two phases' scopes.
  if (!existsSync(join(process.cwd(), CONTRACT))) { ... }
  execFileSync('node', [CONTRACT], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
}
```
D-02 (in `144-CONTEXT.md`) extends this exact carve-out to v1.19 as well — the wording to reuse in
`v1.19-milestone-audit.mjs`'s converted C17 check is the v1.18 comment verbatim, with "Phase 143"
already correctly named (v1.19's C17 contract was folded by v1.15 Phase 119, and its
`c17-eee-contract.mjs` dependency is the SAME shared file the v1.15-v1.18 harnesses already except —
no new exception text is needed, just the same comment block copied forward once more).

### Pattern 4: The apex re-derivation, not copy-forward (check-phase-138.mjs → check-phase-144.mjs)
**What:** every span constant, entry count, and runtime-printed string must be **re-derived**, never
transcribed — `check-phase-138.mjs` itself demonstrates this discipline against its own predecessor
(`check-phase-134.mjs`) and documents three deliberately-NOT-inherited stale strings as a warning.
**Live-verified constants to re-derive for `check-phase-144.mjs`:**
```js
// Source: scripts/validation/check-phase-138.mjs:104-125 (current shape, to be mechanically re-derived)
const CHAIN_START = 48;
const CHAIN_END = 137;     // check-phase-144.mjs: becomes 143
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i);
// dedup guard, length!==90 guard (becomes !==96), termini guard (48/137 becomes 48/143) — all three
// preserved as MECHANISM, their embedded numbers re-derived.
const CHAIN_EXTRA = [30, 31];   // carried forward verbatim (D-09) -- literal, not arithmetic
// NEW at 144 (absent from 138): D-09 requires this additional guard, since 138 lacks it:
if (!CHAIN_EXTRA.every((n) => !CHAIN_PHASES.includes(n))) {
  throw new Error('check-phase-144 CHAIN_EXTRA overlaps CHAIN_PHASES -- must stay disjoint');
}
```
**Stale-string trap, demonstrated live in the current apex (do not repeat this pattern):**
`check-phase-138.mjs:41` says `"17-check v1.19-milestone-audit.mjs"` — the harness registers **16**
checks (C8 was never defined; ids run 1-7, 9-17). `check-phase-144.mjs`'s own header/comment strings
about `v1.20-milestone-audit.mjs`'s check count must be counted directly off the live `checks` array
length in `v1.20-milestone-audit.mjs` at authoring time, not copied from any predecessor's prose.

### Pattern 5: The 18th workflow's diff from the 17th (audit-harness-v1.19-integrity.yml, live-read)
**What:** every hardcoded `v1.19`/`v1.18` literal that must be re-derived, confirmed by direct read
of the current file (`.github/workflows/audit-harness-v1.19-integrity.yml`).
| Literal (v1.19 workflow, current) | Location | v1.20 workflow must read |
|---|---|---|
| `scripts/validation/v1.19-*` | `paths:` (line 25) | `scripts/validation/v1.20-*` |
| `.planning/milestones/v1.19-MILESTONE-AUDIT.md` + `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` (2 separate `paths:` entries) | lines 29-30 | **one glob** covering `v1.20-CARVE.md`, `v1.20-DEFERRED-CLEANUP.md`, `v1.20-GOV-02-LEDGER.md`, and the future `v1.20-MILESTONE-AUDIT.md` (D-16) — 4 files already exist except the last |
| `scripts/validation/v1.19-audit-allowlist.json` (grep target, `path-match` job) | line 66 | `scripts/validation/v1.20-audit-allowlist.json` — copying the grep string verbatim **exits 1** (wrong sidecar name) |
| `node scripts/validation/v1.19-milestone-audit.mjs --verbose` | `harness-run` job, line 83 | `v1.20-milestone-audit.mjs` |
| `check-phase-138.mjs` (recursively spawns 48..137) | `linux-chain-ubuntu-latest` job name string + notice text, lines 98-103 | `check-phase-144.mjs`, `[48..143]`, `600s` timeout unchanged |
| Standalone `check-phase-138` job (lines 147-159) | present ONLY in the v1.19 workflow — **this is the apex running TWICE in the same file** (DUAL-APEX: `linux-chain-ubuntu-latest` + this standalone job both run `check-phase-138.mjs`) | the v1.20 workflow needs its OWN dual-apex pair: `linux-chain-ubuntu-latest` running `check-phase-144.mjs` **plus** a standalone `check-phase-144` job also running it — **never** a job that re-runs `check-phase-138.mjs` (the OLD apex); D-16's "no standalone check-phase-138 job" warns against confusing predecessor-apex-forward-duplication with this milestone's own required dual-apex pair |
| `check-phase-135`/`-136`/`-137` jobs (3 leaf jobs) | lines 105-145 | 5 leaf jobs: `check-phase-139`..`-143` |
| `frozen-read-probe` job (no `needs:`, lines 214-241) | present, exercises `readAtV15Close` + `lsTreeAtV15Close` | **not required to change** — D-16 does not name this job as needing v1.20-specific content; copy forward unless the planner elects to add a V119-specific probe (Claude's discretion) |
| `pin-helper-advisory` (`continue-on-error: true` + `\|\| true` + `\|\| echo`, lines 196-213) | structurally always green | copy the SHAPE forward (advisory job, never a real gate) but do NOT treat its "success" as HARN-19 evidence — D-21(d) |

**Full `paths:` filter to author (D-16, all six entries):**
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.20-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.20-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.20-*'
  schedule:
    - cron: '0 8 * * 1'
    - cron: '0 8 1 1,4,7,10 *'
  workflow_dispatch:
```

### Pattern 6: `MILESTONE_CLOSE_SHAS` insertion point and convenience-export shape
**What:** the literal insertion point in `_lib/frozen-at-close.mjs` for the `V119` entry, confirmed
by direct read of the current file (lines 69-158, 190-207, 258-273).
```js
// Insert immediately after V118 (line 134), BEFORE V14 (V14 is deliberately last -- it's an
// AUDIT-CLOSE pin, not a milestone-close-gate, per its own comment; V119 IS a milestone-close-gate
// pin and belongs in ascending-chronological company with V15..V118):
  V118: '7af8a147',  // ... existing comment, unchanged ...
  V119: 'a7bda73e',  // Phase 138 close-gate (v1.19 MILESTONE CLOSE) -- recovered via the
                     // subject-line pair discriminator (count=1), full SHA
                     // a7bda73e23efc5e3f9607c3fef37abf8ec4030aa (see 144-CONTEXT.md <specifics>).
                     // Back-anchor invariant: V119 references a PAST close SHA; the V120 pin is
                     // deferred to v1.21 (V120-PIN-DEFERRAL).
  V14: '0b3be9ab',   // ... existing V14 block, unchanged, stays last ...

// Convenience exports -- append immediately after the V118 line (206), matching every predecessor's
// one-line-per-tag shape exactly:
export const readAtV118Close      = (p) => readAtClose('V118',         p);
export const readAtV119Close      = (p) => readAtClose('V119',         p);   // NEW

// Same insertion point for the lsTreeAtClose family (after line 273):
export const lsTreeAtV118Close      = (dir, opts) => lsTreeAtClose('V118',          dir, opts);
export const lsTreeAtV119Close      = (dir, opts) => lsTreeAtClose('V119',          dir, opts);  // NEW
```
Whether the milestone-close full SHA (`a7bda73e23efc5e3f9607c3fef37abf8ec4030aa`) or the abbreviated
form (`a7bda73e`) is stored: **every existing entry (V15..V118) stores the ABBREVIATED (7-8 char)
form** — `frozenCause()`'s comment at `frozen-at-close.mjs:38-40` explicitly notes the taxonomy
"works today only because every entry ... is a 7-8 character ABBREVIATED SHA" and warns that a full
40-char pin changes git's stderr wording for the unreachable-sha case. **Store `V119` abbreviated
(`'a7bda73e'`), matching every predecessor, not the full 40-char form** — this is a load-bearing
consistency requirement, not a style preference.

### Anti-Patterns to Avoid
- **Copying `CHAIN_PHASES` as a literal array instead of `Array.from` arithmetic:** every apex from
  `check-phase-70.mjs` onward hard-throws at module load if this drifts — HARN-18 requires arithmetic
  generation explicitly.
- **Reading anything under `.planning/phases/**` from the five new leaves:** D-15 bars this
  completely — no `MILESTONE_CLOSE_SHAS` entry exists for v1.20's own not-yet-closed phases, and the
  archive-root-token guardrail this project uses everywhere else (`resolveArchivedPhasePath`)
  structurally cannot detect a wrong token pre-close (see Pitfall 3 below).
- **Trusting `regenerate-supervision-pins.mjs --report`-mode output as pin-drift proof:** it
  hardcodes the v1.7 sidecar and walks only 26 of 59 pins — the correct instrument is a
  sidecar-derived pinned-file-set × `git diff --name-only <predecessor-close-SHA>..HEAD` intersection
  (D-17), exactly as v1.18's and v1.19's own harness headers already state.
- **Reading the checks-UI colour as HARN-19 evidence:** must be job-level JSON, matched on the
  **display name** (`.jobs[].name`), not the YAML job key — `139-06-SUMMARY.md`'s own trap, restated
  in D-21.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frozen-SHA file reads | A new inline `execFileSync('git', ['show', ...])` wrapper | `readAtClose`/`readAtV119Close` from `_lib/frozen-at-close.mjs` | Centralizing frozen reads is the entire point of SWEEP-04/HYG-01 — a new inline reader reintroduces the exact duplication Phase 111 eliminated |
| Batch reading many files at one SHA | A loop of N separate `readAtClose` calls | `createFrozenCorpusReader(tag, {extraPaths})` (uses `readManyAtClose`, one `git cat-file --batch` call) | Every v1.4-v1.18 conversion in Phase 140 uses this; N separate `git show` subprocess spawns is the anti-pattern it replaced |
| Enumerating a frozen `docs/` tree | A recursive `readdirSync` walk against a checked-out worktree at some SHA | `lsTreeAtClose`/`lsTreeAtV119Close` (`git ls-tree -r -z`) | Works without ever checking out the SHA; the batched-reader library depends on it running first (enumeration-before-fetch ordering, `createFrozenCorpusReader`'s own contract) |
| C17 corpus-contract checking | Re-inlining the 13 EEE assertions into `v1.20-milestone-audit.mjs` | Subprocess-spawn `c17-eee-contract.mjs`, exit-code-as-pass/fail (exactly as v1.18/v1.19 already do) | A second inline copy would diverge from the canonical contract the moment either drifts — explicitly rejected by every predecessor harness's own comment |
| Apex chain execution | A hand-written loop invoking each `check-phase-N.mjs` differently per phase | The single parametrized loop over `[...CHAIN_PHASES, ...CHAIN_EXTRA]` with the NESTED guard, maxBuffer, and narrowed missing-child classifier (`check-phase-138.mjs`'s exact shape) | Every apex since Phase 70 uses this identical loop shape; a bespoke loop for 144 would silently lose one of the three HAZARD FIXES |

**Key insight:** every "don't hand-roll" item in this phase already has exactly one canonical
implementation living in this same repository. The task is disciplined re-derivation (arithmetic
spans, re-counted strings) of an existing pattern, never invention of a new one.

## Common Pitfalls

### Pitfall 1: check-phase-140's needle must not assert v1.19 stays unconverted
**What goes wrong:** the natural, VERIFICATION.md-derived fact for Phase 140 is "16 of 17 harnesses
(v1.4-v1.18) are frozen-aware; `v1.19-milestone-audit.mjs` carries zero `createFrozenCorpusReader`
occurrences" (confirmed this session: `grep -c createFrozenCorpusReader v1.19-milestone-audit.mjs` =
**0**, live). If `check-phase-140.mjs`'s needle encodes that second half as a durable assertion
("v1.19 harness has zero `createFrozenCorpusReader` occurrences"), it is TRUE at Phase 140's own
close but becomes FALSE the moment this SAME phase (144) converts `v1.19-milestone-audit.mjs` in an
earlier plan (HARN-17's second half). Since `check-phase-140.mjs` becomes chain member `#93` of
`check-phase-144.mjs`'s own 96-entry `[48..143]` apex, this converts into a guaranteed apex
regression the instant Phase 144's own commits land — the leaf would need to be edited again in the
SAME phase that authored it, which is not the intended contract (a lightweight leaf is meant to be
write-once).
**Why it happens:** the "derive from measured actuals" instruction (D-14) is correct in spirit, but
a literal transcription of a *scoping boundary that this same phase later crosses* is a
self-invalidating needle — not every VERIFICATION.md truth is durable past this phase's own end.
**How to avoid:** scope `check-phase-140.mjs`'s needle to the POSITIVE, permanently-true half only:
"all 16 of v1.4-v1.18's harnesses carry `createFrozenCorpusReader`" (`grep -l createFrozenCorpusReader
scripts/validation/v1.*-milestone-audit.mjs | wc -l` = **16**, live-verified, and this count is
stable — Phase 144 adds a 17th CONVERTED harness, v1.19, but never un-converts any of the 16). Never
assert anything about v1.19's conversion state inside `check-phase-140.mjs` — that fact belongs, if
anywhere, to `check-phase-144.mjs`'s own AUDIT-HARNESS check (which already implicitly covers it by
spawning the converted `v1.20-milestone-audit.mjs`, not by re-testing v1.19 directly).
**Warning signs:** any leaf needle phrased as "X is NOT yet true" where X is a fact this very phase's
own later plan makes true.

### Pitfall 2: check-phase-141's needle must not pin check-phase-67.mjs's current chicken-and-egg count
**What goes wrong:** symmetric to Pitfall 1. `141-03-SUMMARY.md` states, and this session re-confirms
live (`grep -c chicken-and-egg check-phase-67.mjs` = **7**), that `check-phase-67.mjs`'s 7
chicken-and-egg sites are **explicitly untouched** by Phase 141 — deferred to Phase 144 (D-12/D-03).
If `check-phase-141.mjs`'s needle encodes "check-phase-67.mjs contains exactly 7 chicken-and-egg
sites" as a durable fact, it becomes false the moment HARN-17/routed-item work in THIS phase converts
those same 7 sites to fail-loud (dropping the string's occurrence count, likely to 0 if the literal
word "chicken-and-egg" is removed from the converted comments/returns, or to some other non-7 value).
**Why it happens:** same root cause as Pitfall 1 — a measured fact that is true only up to a boundary
this same phase later crosses.
**How to avoid:** scope `check-phase-141.mjs`'s needle to facts genuinely stable past this phase's
end — e.g., `regenerate-supervision-pins.mjs --self-test` exits 0 (spawn it as a subprocess, mirroring
the `check-phase-119.mjs:140-159` idiom already used for `check-phase-143.mjs`'s AUDIT-style needle),
or the specific rebased `BASELINE_9` coordinate literals in `regenerate-supervision-pins.mjs`
(`['docs/_glossary-android.md', 145]` etc.) — these are Phase 141's OWN deliverable, not something
Phase 144 subsequently edits. Do not reference `check-phase-67.mjs`'s content at all from
`check-phase-141.mjs`'s needle; that coupling belongs, if anywhere, to a routed-item acceptance check
inside the SAME plan that edits `check-phase-67.mjs` (not to a different phase's leaf).

### Pitfall 3: `.planning/phases/**` reads are structurally barred for the five new leaves (D-15)
**What goes wrong:** the natural instinct — mirroring `check-phase-135/136/137.mjs`'s own pattern of
asserting facts about a phase's *content deliverable* — is to read something under
`.planning/phases/139-.../` (e.g. `139-VERIFICATION.md`, `142-EVIDENCE.md`) directly. This is
explicitly barred: `MILESTONE_CLOSE_SHAS` tops out at `V118`, so there is no frozen SHA under which
`.planning/phases/139../139-VERIFICATION.md` can be read frozen-aware, and a LIVE read of that path
is not itself dangerous today but sets a precedent this phase's own apex-resolver replacement (D-15)
exists specifically to stop repeating (see `check-phase-125.mjs:86`'s permanently-wrong-token
precedent, cited in D-15).
**Why it happens:** `check-phase-135/136/137.mjs` legitimately read `docs/recipes/*.md` and
`docs/index.md` (corpus deliverables) — but v1.20's phases 139-143 have NO `docs/` content deliverable
at all (this milestone carries no content pillar, REQUIREMENTS.md "Out of Scope"). Their deliverables
live entirely in `scripts/validation/`, `.github/workflows/`, and `.planning/milestones/` — never
under `.planning/phases/`.
**How to avoid:** every needle for `check-phase-139..143.mjs` must target `scripts/`, `.github/`, or
`.planning/milestones/v1.20-*` paths only. Every needle candidate offered in this document (CARVE
presence, GOV-02 ledger row-count threshold, `fetch-depth: 0` counts, `V14`/`createFrozenCorpusReader`
literals, `regenerate-supervision-pins.mjs --self-test` spawn, `check-phase-30/31.mjs` bare spawn,
NEST-01's `CHAIN_EXTRA` literal) already honors this constraint.
**Warning signs:** any `readFile('.planning/phases/...')` call inside a new leaf's source.

### Pitfall 4: the workflow's job-key vs display-name trap (D-21, `139-06-SUMMARY.md`)
**What goes wrong:** `gh run view --json jobs` and `gh api .../jobs` both return `.jobs[].name` as
the **display name** (the `name:` field in the YAML), not the YAML job key (e.g. `check-phase-144`,
the key, vs `"check-phase-144 validator (apex; recursively spawns 48..143)"`, the name). A literal
`test("<job-key>")` filter against that field silently returns EMPTY even when the job succeeded.
**Why it happens:** GitHub Actions' API surfaces the human-readable `name:` string, and this
project's own job names deliberately carry parenthetical detail (see the current v1.19 workflow's
`check-phase-138` job, `name: check-phase-138 validator (apex; recursively spawns 48..137)`).
**How to avoid:** match on a stable SUBSTRING of the display name (e.g. `.startsWith('check-phase-144')`
or a regex), never an exact job-key equality; confirm this against a real dispatched run's JSON before
trusting any HARN-19 evidence script.
**Warning signs:** an evidence-gathering script that reports zero matches despite a visibly-green run
in the checks UI.

### Pitfall 5: the archival-drift guardrail replacement is NOT a `try/catch` fix (D-15)
**What goes wrong:** the intuitive "fix" for `resolveArchivedPhasePath` silently resolving the WRONG
archive-root token is to add error handling around the resolver call. This does not work:
`_lib/archive-path.mjs:23-24` checks the LIVE path FIRST and only falls through to the archived path
— so at the post-close-gate confirmatory run, `144-VERIFICATION.md` is live (not yet archived) and
the resolver succeeds regardless of whether the token is right or wrong. A wrong token is invisible
until a FUTURE `/gsd-complete-milestone` archives the phase directory — by which point the apex has
already been "PASS" for an entire milestone on a false premise (`check-phase-125.mjs:86`'s
`['v1.15-phases']` wrong-token precedent, permanently green with a false detail string, is the
live proof).
**Why it happens:** `resolveArchivedPhasePath`'s null-without-throw contract (`_lib/archive-path.mjs:7`,
"CALLER OWNS FAIL SEMANTICS") is correct design for its stated purpose (a legitimate pre-close SKIP),
but it structurally cannot distinguish "not yet archived" from "archived under the wrong root."
**How to avoid:** D-15's replacement is the correct one — assert the literal token string
`'v1.20-phases'` directly in the apex source (a string-presence check, not a resolver behavior check),
AND separately exercise the resolver against the archived path once it exists (the post-close-gate
confirmatory run). Do not attempt to make the resolver itself detect the wrong-token case; the
resolver's contract is unchanged, only the surrounding assertion strategy changes.

### Pitfall 6: `carve-gate.mjs` is a NUL-classified binary file for grep purposes
**What goes wrong:** `grep -n <pattern> scripts/validation/carve-gate.mjs` (without `-a`) returns
`Binary file ... matches` with no line numbers, because the file contains a literal NUL byte at
offset 2520 (`:44`'s `'\0DOUBLESTAR\0'` placeholder, per CONTEXT.md D-07). Confirmed this session:
a plain `Grep` on `IN_SCOPE_PREFIXES|carveExistedAt|genesis` against this file returned "No matches
found" even though those identifiers plausibly exist in the file — the NUL byte silences ordinary
text search tools.
**Why it happens:** the file deliberately embeds a NUL-delimited placeholder string as part of its
own glob-matching implementation.
**How to avoid:** any grep-based census against this file (GOV-02's target-scoped grep, or a future
needle) must pass `-a`/`--text` (or the tool's binary-override equivalent) or it will silently
undercount to zero.
**Warning signs:** a GOV-02 ledger row recording "0 hits" for a grep against `carve-gate.mjs` when a
hit was expected.

## Code Examples

Verified patterns from this repository's own source (all read live this session):

### The `readAtClose` frozen-read core (unchanged by this phase — read for context)
```js
// Source: scripts/validation/_lib/frozen-at-close.mjs:169-187 (live)
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  try {
    return execFileSync('git', ['show', sha + ':' + relPath], {
      encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'],
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
}
```

### The subprocess-spawn idiom for a leaf that shells out (check-phase-119.mjs:140-159, live)
```js
// Source: scripts/validation/check-phase-119.mjs:140-159
run() {
  if (!existsSync(join(process.cwd(), HARNESS))) {
    return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
  }
  if (NESTED) {
    return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
  }
  try {
    execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
    return { pass: true, detail: HARNESS + ' exits 0 (current-milestone harness)' };
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : '';
    const stdout = err.stdout ? err.stdout.toString() : '';
    const isMissing = err.code === 'ENOENT' || err.status === 127
      || stderr.includes('not found') || stderr.includes('Could not resolve');
    if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
    return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
  }
}
```
`check-phase-143.mjs` (per `143-NEEDLE-SPEC.md`) substitutes `TOOL = 'scripts/validation/
check-nav-hub-links.mjs'` for `HARNESS`. `check-phase-141.mjs` can use the identical shape,
substituting `TOOL = 'scripts/validation/regenerate-supervision-pins.mjs'` and passing `--self-test`
as an argv entry — this is a leaf needle that stays durably true past this phase's end (Pitfall 2).
`check-phase-142.mjs` can use the same shape for `check-phase-30.mjs`/`check-phase-31.mjs` bare
(standalone) exit-0 checks, mirroring the apex's own `V-138-CHAIN-30`/`-31` spawn but as this leaf's
OWN needle (not a chain-registration — `CHAIN_PHASES` stays `[]` per Pattern 1).

### check-phase-67.mjs's 10 fail-loud sites — exact shape, code-verified this session
The 7 chicken-and-egg return sites (all currently `{pass:true, skipped:true, detail:'chicken-and-egg:
...'}`, confirmed at these exact lines):
```
V-67-01  :72-74   nullCount === FILES.length (4 files)  -- VULNERABLE (see below)
V-67-02  :87-89   j === null (single sidecar read, not a loop) -- not an accumulator block
V-67-03  :116-118 nullCount === FILES.length (2 files)  -- VULNERABLE
V-67-04  :131-133 j === null (single sidecar read, not a loop) -- not an accumulator block
V-67-05  :164-166 nullCount === FILES.length (2 files)  -- hard-fails on partial null (see below)
V-67-06  :198-200 nullCount === FILES.length (3 files)  -- VULNERABLE
V-67-07  :226-228 nullCount === FILES.length (3 files)  -- hard-fails on partial null (see below)
```
**Why exactly 3 of the 5 `nullCount` accumulator blocks (01/03/06) are the vulnerable partial-null
silent-pass class, code-derived (VERIFIED against the live file, not assumed):**
- **V-67-01** (`missing.length > 0` fail-condition, 4 files): if 1 of 4 files is null (partial,
  `nullCount=1 !== 4`), the null file is simply skipped (`continue`) and never added to `missing[]`
  — if the 3 readable files all contain the target string, `missing.length === 0` → **PASS**, and the
  unreadable file's actual content was never checked. Vulnerable.
- **V-67-03** (`totalMentions < 6` fail-condition, 2 files): if 1 of 2 files is null (partial), the
  single readable file's regex match count alone can reach ≥6 (multiple matches per file are
  possible) → can PASS without ever reading the null file. Vulnerable.
- **V-67-06** (`withVH < 2` fail-condition, 3 files): if 1 of 3 files is null (partial, 2 readable),
  both readable files matching is suffient to reach the threshold (`2 >= 2`) → can PASS without
  reading the null file. Vulnerable.
- **V-67-05** (`total < 2` fail-condition, 2 files — threshold EQUALS file count): if 1 of 2 files is
  null (partial), the maximum achievable `total` from the single readable file is 1, and `1 < 2` is
  always true → **always FAILs** under partial null. Not vulnerable — CONTEXT.md's "already
  hard-FAIL" claim is code-confirmed.
- **V-67-07** (`withBump < 3` fail-condition, 3 files — threshold EQUALS file count): symmetric to
  V-67-05 — under any partial null, the maximum achievable count is `FILES.length - 1 < 3` → always
  FAILs. Not vulnerable, code-confirmed.

**The 4 literals `check-phase-73.mjs:266-302` pins against `check-phase-67.mjs`'s source (must
survive any edit, live-verified):**
```js
// Source: scripts/validation/check-phase-73.mjs:272-297 (V-73-CONVERT-67-05/-06)
content.includes('frozen-at-close')        // OR readCorpusFileAtV17Close — presence of a frozen read
content.match(/V-67-05.*v1\.7-frozen/)     // the [v1.7-frozen @ aa6de68] suffix on V-67-05's name
content.includes('Apple calls this artifact')  // V-67-05's correct callout text (one of two OR arms)
content.includes('SWEEP-02')               // V-67-06's date-row assertion text
```
The Phase 141 Plan 03 precedent for converting an equivalent site class (13 sites in
`check-phase-61/68/70.mjs`) is a **RETURN-FIELD-ONLY flip**: change only
`{pass:true, skipped:true, detail:'...'}` → `{pass:false, detail:'<file-specific text>'}` at the
call site; never touch the shared wrapper reader function's own `try/catch` (other call-sites in the
same wrapper may still legitimately rely on receiving `null`). For the 3 vulnerable `nullCount`
accumulator blocks (01/03/06), the equivalent fix is different in shape from a pure chicken-and-egg
flip: the accumulator logic itself must change so a partial-null read counts as a failure for the
UNREAD file specifically (not just tightening the aggregate threshold), or the check must require
`nullCount === 0` (full readability) before evaluating the aggregate at all — this is a genuinely
different fix shape than the 7 chicken-and-egg returns, which is why CONTEXT.md's "TWO classes" (7 +
3) framing is code-accurate, not just a counting convenience.

### v1.20-MILESTONE-AUDIT.md shape — section list read directly off v1.19-MILESTONE-AUDIT.md
1. YAML frontmatter: `milestone`, `milestone_name`, `audited`, `status`, `scores` (requirements/
   phases/integration/flows), `mechanical_checks` (harness/allowlist/last_run/wave0_anchor_sha/
   baseline_N_pre_atom1_sha/vNNN_pin_sha/close_commit/gha_authoritative_sha/gha_workflow_run/
   gha_run_id/cross_os_exact_match/predecessor_byte_unchanged/predecessor_frozen_surface_count/
   frozen_surface_inversion/apex_count_standalone_pre_close/apex_skip_resolved_at_close/
   raw_exit_code/self_test/c17_run/pipe_02_close/axis_2_disposition/notes),
   `performed_by`, `deferred_items`, `tags`
2. `# vX.Y Milestone Audit — <name>` H1 + Audited/Scope/Verdict/Shipped summary line
3. `## Executive Summary`
4. `## vX.Y Phase Closure Narrative` (per-phase subsections, one `###` per phase in the milestone)
5. `## Auditor-Independence Verification (3-axis stacking)` — Axis 1/2/3 subsections + a
   Layer/Mechanism/Verified table
6. `## Cross-OS PASS/FAIL/SKIP EXACT MATCH (all three axes, one shared SHA)` — a table row per
   validator class (leaf harness, leaf validators, apex)
7. `## Predecessor-Workflow Cascade Scan — Machine-Verified Over the Freshly Enumerated N`
8. `## Predecessor Byte-Unchanged HARD Gate`
9. `## Requirements Traceability — N/N Validated` (one row per requirement ID)
10. `## Mechanical Checks Detail` (a second, denser version of the cross-OS table)
11. `## HARN-1N Gate — N Parts, All Satisfied` (this milestone's 4-part terminal gate, mirroring
    HARN-15's shape: apex-green-idle, drift-band-named, exponential-non-attempt-stated,
    post-close-gate-confirmatory-run)
12. `## Audit Harness Lineage (phases ... lineage vX.Y->vX.Y+1 — Nth entry, Mth CI coexistence
    workflow)` — numbered list, one item per harness-lineage artifact (harness copy, sidecar copy,
    BASELINE_N refresh, new leaves+apex, frozen-at-close pin, CI workflow, archive-root-token
    confirmation)
The file continues past what this research session read in full (431 lines total; sections through
line 342 were read directly — the remaining ~90 lines, per the file's own table of contents pattern,
continue the Audit Harness Lineage numbered list and close with a final verdict paragraph; a planner
authoring `v1.20-MILESTONE-AUDIT.md` should read the full file once more at plan time rather than
relying solely on this summary, since Claude's Discretion covers exact section ordering).

## State of the Art

| Old Approach (v1.19 and earlier) | Current Approach (this phase) | When Changed | Impact |
|---|---|---|---|
| `v1.19-milestone-audit.mjs` reads corpus via live `fs.readFileSync`/`readdirSync` | Reads via `createFrozenCorpusReader('V119', ...)` (frozen at the v1.19 close SHA) | This phase (HARN-17 second half) | Resolves the frozen-vs-evolved mismatch class the SAME way Phase 140 already resolved it for v1.4-v1.18 — the v1.19 harness becomes structurally identical in shape to its 16 already-converted siblings |
| Apex `check-phase-138.mjs` lacks a `CHAIN_EXTRA`-vs-`CHAIN_PHASES` disjointness guard | `check-phase-144.mjs` adds `assert CHAIN_EXTRA.every(n => !CHAIN_PHASES.includes(n))` | This phase (D-09) | Closes a structurally-uncoverable gap in the predecessor's own 3 module-load guards, none of which can see `CHAIN_EXTRA` |
| `regenerate-supervision-pins.mjs --report` cited as pin-drift proof (v1.17 and earlier's own header claim) | Sidecar-derived pinned-file-set × `git diff --name-only <predecessor-SHA>..HEAD` intersection | v1.19's own harness header already corrected this (D-20 in `138-CONTEXT.md`) — this phase repeats the corrected instrument, never the disproven one | `--report` mode hardcodes the v1.7 sidecar and covers only 26/59 pins; the intersection method is exhaustive |
| `ACCEPTED-STANDALONE-CI-RED` / `ACCEPTED-SCOPED-RED` carried forward as accepted backlog dispositions across 6+ milestones | Both **deleted** from the backlog at this close (REQUIREMENTS.md milestone bar) | This phase (HARN-19) | The first milestone in this project's history where all 17 `audit-harness-*` workflows are required to be simultaneously green — no fallback disposition exists (D-22) |

**Deprecated/outdated:**
- The literal phrase "0 FAIL across the non-nested chain" — structurally impossible since every apex
  sets `CHECK_PHASE_NESTED=1` on every child (D-32; `v1.19-MILESTONE-AUDIT.md:198` already corrects
  this same defect of record from an earlier milestone's audit).
- Citing `regenerate-supervision-pins.mjs --report` as positive pin-drift proof — superseded at v1.19
  and must not be reintroduced.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `check-phase-139.mjs`'s frozen-to-frozen target should be `scripts/validation/carve-gate.mjs` at commit `04e26106` (rather than some other CARVE-related file/commit) | Pattern 2 (Architecture Patterns) | Low — this is offered as a ready-to-use, live-verified example within Claude's Discretion (D-14 leaves "internal structure of the five new leaves" to the planner); any equally-frozen CARVE-related file/commit works equally well under the same idiom. If the planner picks a different target, no rework of this research is needed — only the one example needs substitution. |
| A2 | The `frozen-read-probe` job in the 17th CI workflow does not need v1.20/V119-specific content and can be copied forward unchanged | Pattern 5 | Low — D-16 does not name this job as requiring a change; if the planner wants a V119-specific probe (mirroring the existing V15-specific one), that is an additive, non-blocking enhancement, not a correction of this research |
| A3 | `v1.20-MILESTONE-AUDIT.md`'s remaining ~90 unread lines (343-431) follow the same section-list pattern established in lines 1-342 | Code Examples, "v1.20-MILESTONE-AUDIT.md shape" | Low — flagged explicitly as unread; the research recommends a fresh full read at plan time rather than presenting the unread tail as settled |

**Risk summary:** all three assumptions are LOW-risk and fall inside territory CONTEXT.md itself
marks as Claude's Discretion — none contradicts a `D-NN` ratified decision, and none requires user
confirmation before planning proceeds.

## Open Questions

**Both questions were RESOLVED at plan time (2026-08-12) — see the resolution notes appended to each.
No open question remains for this phase.**

1. **(RESOLVED — spawn)** **Should `check-phase-141.mjs`'s needle spawn
   `regenerate-supervision-pins.mjs --self-test` as a
   subprocess, or instead pin the specific rebased `BASELINE_9` coordinate literals directly?**
   → **RESOLVED in `144-04-PLAN.md` Task 3: SPAWN.** The self-test spawn is a live-measured green
   fact at HEAD (`--self-test` → PASS, `Diff: identical`, exit 0) and needs no literal to be
   transcribed; the literal-pin alternative would require inventing or re-deriving coordinate strings
   this research did not measure, and a line-adjacent pin is fragile against the BASELINE_24 append
   `144-06-PLAN.md` Task 3 makes to the same file. The subprocess cost is one short spawn inside a
   leaf that has no chain. Plan 04 also adds a second, cheaper static needle (the measured
   deferred-guard occurrence counts in `check-phase-61/68/70.mjs`), so the leaf does not rest on the
   spawn alone.
   - What we know: both are durable (Pitfall 2's fix); the spawn approach exactly mirrors
     `check-phase-143.mjs`'s already-specified idiom (subprocess + exit-code), while the literal-pin
     approach avoids a subprocess spawn entirely (cheaper, and avoids any timeout-budget question).
   - What's unclear: which the planner prefers stylistically — both satisfy every hard constraint.
   - Recommendation: literal-pin (no subprocess) is marginally cheaper and matches the "no
     AUDIT/AUDIT-HARNESS/NESTED references" spirit of the lightweight-leaf template more literally
     (Pattern 1); the spawn approach is equally valid if the planner values idiom-consistency with
     `check-phase-143.mjs`'s already-fully-specified needle. Left as Claude's Discretion per D-14.

2. **(RESOLVED — scoped to Phase 140's own deliverable)** **Exact wording for the
   `check-phase-140.mjs` needle's detail string, given Pitfall 1's fix.**
   → **RESOLVED in `144-04-PLAN.md` Task 2:** the leaf asserts the POSITIVE half only — at least
   sixteen `v1.*-milestone-audit.mjs` files carry the frozen-corpus reader, each of v1.4 through
   v1.18 individually — as a LOWER BOUND, never an equality, so Plan 02's seventeenth conversion
   cannot invalidate it. No secondary assertion about `v1.20-milestone-audit.mjs`'s own conversion
   state is added: the apex's AUDIT-HARNESS check is the sole assertion covering that harness, which
   avoids duplicate coverage of one fact from two chain members. The plan additionally asserts a
   zero-count grep for the v1.19 harness filename inside the leaf, so the self-invalidating class is
   mechanically excluded rather than merely avoided by wording.
   - What we know: the assertion must be scoped to the positive, permanently-true half (16 of 16
     v1.4-v1.18 harnesses converted).
   - What's unclear: whether to additionally assert something about `v1.20-milestone-audit.mjs`'s own
     conversion state (a DIFFERENT harness this phase itself creates) as a secondary needle, which
     would be safe (v1.20's harness is created already-converted, never regresses) but arguably
     duplicates `check-phase-144.mjs`'s own AUDIT-HARNESS check.
   - Recommendation: keep `check-phase-140.mjs` scoped to its own phase's deliverable only (the 16
     v1.4-v1.18 conversions); let `check-phase-144.mjs`'s AUDIT-HARNESS check be the sole assertion
     covering `v1.20-milestone-audit.mjs`'s conversion state, avoiding duplicate coverage of the same
     fact from two different chain members.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | every `check-phase-*.mjs` / harness | ✓ | v24.17.0 (measured, `143-EVIDENCE.md`) / 20 pinned in CI | — |
| git CLI | `_lib/frozen-at-close.mjs`, all frozen reads | ✓ | whatever ships on the local machine / `ubuntu-latest` | — |
| `gh` CLI | HARN-19 dispatch + job-level JSON evidence | ✓ (used successfully in Phases 139/141 this milestone) | — | — |
| GitHub Actions runners (`ubuntu-latest`) | all 17 workflows | ✓ (existing, unchanged) | — | — |
| `markdown-link-check@3.14.2` | quarterly CI job (copied forward, not re-pinned) | ✓ (existing pin) | 3.14.2 | — |

No missing dependencies. This phase adds zero new environment requirements beyond what Phases
139-143 already established and exercised successfully (including a live 3-run, 41-job CI dispatch
in Phase 141 and further dispatches implied by Phase 139's `frozen-read-probe` verification).

## Validation Architecture

Skipped — `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (treated as enabled per the governing
instruction), so this section is included, scoped honestly to what actually applies.

### Applicable ASVS Categories
This phase has no user-facing application surface (no auth, no session, no HTTP input, no stored
user data) — it is internal CI/validator tooling. Most ASVS categories do not apply.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth surface in scope |
| V3 Session Management | No | No session surface in scope |
| V4 Access Control | No | No access-control surface in scope |
| V5 Input Validation | Partial | JSON sidecar parsing (`JSON.parse` with `try/catch` degrade, existing pattern) — no new input surface introduced |
| V6 Cryptography | No | No cryptographic operation in scope; git SHA pins are content-addressing identifiers, not a cryptographic control this phase implements |

### Known Threat Patterns for this stack
| Pattern | STRIDE | Standard Mitigation (already this project's practice) |
|---------|--------|---------------------------------------------------------|
| Shell-injection via unsanitized subprocess args | Tampering | `execFileSync` with an ARGUMENT ARRAY (never a concatenated shell string) — every existing spawn site in this codebase already follows this, and this phase's new spawns must too (explicitly called out in `v1.19-milestone-audit.mjs`'s own C17 comment: "argument-array `execFileSync` — never a concatenated shell string; the project's one process-level security control") |
| Frozen-surface drift (an unauthorized edit to a byte-unchanged predecessor file) | Tampering | GOV-01/GOV-02's CARVE allowlist + grep-before-edit + regression-gate discipline (this phase's Plan 01 amendment is itself the first line of defense) |
| A later validator's exact-string pin silently broken by an earlier file's edit | Tampering (of a control, not data) | GOV-02's target-scoped grep-before-edit procedure, specifically exercised for `check-phase-73.mjs`'s 4-literal pin on `check-phase-67.mjs` before any edit (see Code Examples above) |
| CI workflow trust boundary (a `pull_request`-triggered workflow reading repo secrets) | Elevation of Privilege | Not applicable — none of the 17 `audit-harness-*.yml` workflows reference `secrets.` anywhere (REQUIREMENTS.md "Out of Scope: Graph/SharePoint auto-upload... would introduce the first `secrets.` reference in any workflow") |

## Sources

### Primary (HIGH confidence — read directly this session)
- `144-CONTEXT.md` (full, 695 lines) — the phase's own ratified decision record
- `REQUIREMENTS.md`, `STATE.md`, `ROADMAP.md` §Phase 144 — project requirement/state/roadmap text
- `.planning/config.json` — `nyquist_validation: false`, no `security_enforcement` key
- `139-VERIFICATION.md`, `140-VERIFICATION.md`, `141-VERIFICATION.md`, `142-VERIFICATION.md` (full) —
  measured actuals for the four needle-derivation questions
- `141-03-SUMMARY.md` (full) — the exact SWEEP-09 conversion mechanics and shape
- `143-NEEDLE-SPEC.md` (full) — the already-specified `check-phase-143.mjs` contract, used as the
  template shape for the other four leaves
- `scripts/validation/check-phase-135.mjs`, `-136.mjs`, `-137.mjs` (full) — the true lightweight-leaf
  template
- `scripts/validation/check-phase-138.mjs` (full) — the apex re-derivation template
- `scripts/validation/check-phase-63.mjs:190-260`, `check-phase-67.mjs` (full),
  `check-phase-73.mjs:250-310`, `check-phase-119.mjs:135-160` — the four cited code patterns
- `scripts/validation/v1.19-milestone-audit.mjs` (full), `v1.18-milestone-audit.mjs:1-140,818-848`
  — the unconverted-vs-converted harness diff
- `scripts/validation/_lib/frozen-at-close.mjs` (full) — `MILESTONE_CLOSE_SHAS` structure, insertion
  point, `frozenCause` abbreviated-SHA constraint, `createFrozenCorpusReader`
- `.github/workflows/audit-harness-v1.19-integrity.yml` (full) — the 17th-vs-18th workflow diff
- `.planning/milestones/v1.19-MILESTONE-AUDIT.md:1-342` — the target document's shape (frontmatter
  through section 11; remainder flagged unread, see A3)
- `scripts/validation/regenerate-supervision-pins.mjs:505-548` — `BASELINE_23`/`BASELINE_24` naming
  precedent
- Live git commands this session: `git log`, `git rev-parse <SHA>:<path>`, `grep -c` counts against
  `.github/workflows/audit-harness-{v1.5,v1.6,integrity}.yml`, `scripts/validation/v1.*-milestone-audit.mjs`,
  `check-phase-67.mjs`, `.planning/milestones/v1.20-GOV-02-LEDGER.md` — all figures cited above with a
  specific count are live-measured this session, not transcribed from any prior document

### Secondary (MEDIUM confidence)
None — every claim in this document traces to a primary source read directly this session.

### Tertiary (LOW confidence)
None.

## Metadata

**Confidence breakdown:**
- Needle-set candidates (Q1): HIGH — every candidate is either a live-verified literal/count or an
  explicitly-flagged Claude's-Discretion recommendation with stated rationale
- Harness conversion mechanics (Q2): HIGH — read the actual converted (v1.18) and unconverted (v1.19)
  source side by side
- check-phase-67.mjs fail-loud sites (Q3): HIGH — every line number and the vulnerable/hard-fail
  classification is derived from reading the live code's control flow, not from re-stating CONTEXT.md
- 17th-vs-18th workflow diff (Q4): HIGH — read the actual current 17th workflow file in full
- v1.20-MILESTONE-AUDIT.md shape (Q5): HIGH for the read portion (lines 1-342); MEDIUM for the
  unread tail (lines 343-431), flagged explicitly (A3)
- check-phase-139's CARVE frozen-to-frozen pattern (Q6): HIGH — the check-phase-63.mjs pattern is
  read in full, and a genuine, live-measured, ready-to-use target/baseline pair is provided

**Research date:** 2026-08-12
**Valid until:** this phase's own completion — every fact here is tied to this milestone's specific,
in-progress state (git SHAs, line counts, grep counts) and has no validity beyond Phase 144 closing
