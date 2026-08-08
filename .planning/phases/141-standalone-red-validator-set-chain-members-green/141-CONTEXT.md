# Phase 141: Standalone-RED Validator Set — Chain Members Green - Context

**Gathered:** 2026-08-07
**Status:** Ready for planning

<domain>
## Phase Boundary

The milestone's red-clearing layer for the eight already-in-chain members. `check-phase-48`,
`-60`, `-61`, and `-62` through `-66` exit 0 standalone; the stale-pin defect behind the
`--self-test` failure is repaired; the remaining silent-swallow frozen-read sites fail loud;
and the CI fan-out this phase unblocks is exercised and triaged in-phase.

**No corpus content is authored or edited. Zero glossary edits.** The RED-01 freshness leg was
already discharged by Phase 140's conversion — measured, not assumed.

Requirements in scope: RED-01, RED-02, RED-03, SWEEP-09.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` codebase interrogation followed by a scored `/adversarial-review`
(5 parallel Finders → Adversary → Referee). **70 findings raised (525 Finder points), 3
disproved, 67 confirmed.** The review **reversed this phase's headline recommendation
outright**: the draft's RED-02 fix, its SWEEP-09 re-scope, and its "no timeout root-cause
class" verdict were all wrong. Every `[MEASURED]` figure below was executed at HEAD
`5b8afca1` on a quiesced machine; the load-bearing result (D-01) was independently
reproduced **four times** — Finder, Adversary, Referee, and orchestrator.

### Ground truth established by interrogation

**Failure ledger — all eight members, clean, quiesced.** `[MEASURED]`

| Validator | Wall clock | Result | Failing assertions |
|---|---|---|---|
| `check-phase-48` | 340–539 ms | 6 / **1** | self-test |
| `check-phase-60` | 9 336–12 435 ms | 23 / **2** | V-60-10 (self-test), V-60-12 (→48) |
| `check-phase-61` | 19 531–21 651 ms | 31 / **3** | V-61-21 (→48), V-61-32 (→60), V-61-34 (self-test) |
| `check-phase-62` | 39 336–43 034 ms | 31 / **3** | CHAIN-48/60/61 |
| `check-phase-63` | 75 327–83 585 ms | 28 / **4** | CHAIN-48/60/61/62 |
| `check-phase-64` | 143 943–170 537 ms | 24 / **5** | CHAIN-48/60/61/62/63 |
| `check-phase-65` | 273 831–335 024 ms | 27 / **6** | CHAIN-48/60/61/62/63/64 |
| `check-phase-66` | **664 979 ms** | 21 / **7** | CHAIN-48/60/61/62/63/64/65 |

**Every failure in all eight traces to one defect** — the `--self-test`. Everything else is
`CHAIN-*` cascade. RED-03's "cleared as a consequence rather than patched individually" is
not merely permitted; it is the only available shape.

**RED-01 is already discharged.** `[MEASURED]` all nine harnesses v1.5–v1.13 exit 0 by direct
invocation with zero glossary edits: v1.5 = 12/0/0, v1.6–v1.13 = 15/0/0 each. `V-60-23` and
`V-61-33` both PASS. This is SC#1's stated evidence form.

### RED-02 — root cause and fix (OWNER-RATIFIED 2026-08-07)

- **D-01:** The defect is **stale data, not a defective classifier**. `[MEASURED]` all **9 of 9**
  `BASELINE_9` coordinates (`regenerate-supervision-pins.mjs:533-543`) are dead — none lands on
  a line containing `supervis`, and four point at blank lines. Commit `aaf0d2ff` ("TOOL-04
  coordinate-only re-pin of v1.4–v1.16 audit sidecars") moved the sidecar to 145/147/303/333
  and **did not touch the helper**; that desync is what pushed `:145` into `expectedNewKeys`.
  Corroborated by this project's own memory `reference_check_phase_61_red_at_head`, which
  already named "an un-rebased BASELINE_9 from Phase 133" as a root cause.

- **D-02:** **The fix is: rebase `BASELINE_9` to its live descendants, `classify()` byte-unchanged.**
  `[MEASURED]`, reproduced four times independently: with `BASELINE_9` rebased to
  `_glossary-android.md` 145/147/303/333, `00-enrollment-overview.md` 65/67/97,
  `03-fully-managed-cobo.md` 51, `20-android-app-install-investigation.md` 33 —
  `sidecar−baseline = 17`, `classifier−baseline = 17`, `Diff: identical`, `Self-test: PASS`,
  exit 0. Both RED-02 clauses hold trivially: the v1.7 **fixture is byte-unchanged**
  (`BASELINE_9` lives in the helper, not the sidecar) and the **classifier is not relaxed**
  because nothing is relaxed. — **Reversibility:** costly — the pin array is read by four live
  validator assertions (D-04).

- **D-03:** **No classifier window change. The draft's variant F is withdrawn.** Two independent
  reasons. (a) `:597-602` records that Phase 48 D-14 "retains the pin and **accepts the Tier-2
  classifier output for that line**" — a window change reverses a ratified verdict to silence a
  diff originating elsewhere. (b) `[MEASURED]` the classifier scans `androidDocPaths()` = **32
  files / 26 supervision occurrence lines, exactly 1 on a heading**, so the Tier-2 set has size
  1 and **all six tested variants (A/B/C/E/F) are behaviourally identical** at 26/0. The draft's
  "F is minimum widening on the minimum set — 16 of 369" compared two figures measured against
  all of `docs/`, a corpus the classifier never opens. The differentiator does not exist.

- **D-04:** **Four LIVE pins guard the file this fix edits — grep before touching, and append
  rather than edit.** `[MEASURED]` `check-phase-60.mjs:177` pins the literal comment
  `BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08)` (V-60-09, **inside a RED-03 member**);
  `check-phase-66.mjs:127` pins `BASELINE_10 refreshed` + `Phase 66` (V-66-03, **also a RED-03
  member**); `check-phase-68.mjs:138-143` (V-68-06); `check-phase-70.mjs:179` pins
  `BASELINE_11 refreshed` (V-70-06). All four are **live `readFile`, not frozen**. This refutes
  the draft's claim that "48/60/61 assert only on the `--self-test` exit code." **Append a new
  dated audit-trail line; never modify an existing one.**

- **D-05:** Record the audit-trail defect this exposes, do not fix it here. `[MEASURED]` **18**
  `BASELINE_N refreshed … line positions verified against HEAD <sha>` comments (Phases 60…138)
  sit above an array unchanged since Phase 60 with 9/9 dead coordinates — including one claiming
  positions "were re-verified at Phase 138 close and remain valid for the v1.19 corpus."
  V-60-09/V-66-03/V-70-06 assert only that the *comments exist*. This is a vacuous-pass of
  exactly SWEEP-09's class, in the file this phase has open.

- **D-06:** **`regenerate-supervision-pins.mjs` is CARVE Category 6, on-list — no D-09 amendment
  needed for the file itself.** State this explicitly; the draft never did.

- **D-07:** **The synthetic negative fixture is DROPPED — out of scope.** Under D-02 line 145
  stays Tier-2 and the arm keeps its member, so the premise evaporates. Independently,
  `[MEASURED]` the Tier-2 arm **already** had zero assertion coverage before any fix: the only
  Tier-2 assertion is `unpinnedTier2.length === 0` (`:603-610`), and `:145` *is* pinned, so it
  lands in the informational `pinnedTier2` branch (`:611-615`) asserting nothing. Also
  `extraFromClassifier` is vacuous today — the sidecar's 26 pins are set-identical to the 26
  live occurrence lines. Adding a fixture would be a new acceptance gate RED-02 never
  authorized — the exact objection the draft itself raised against a runtime bound.

### SWEEP-09 — scope (OWNER-RATIFIED 2026-08-07)

- **D-08:** **The requirement's own unit is reader *sites*, and the draft substituted a
  different one.** `REQUIREMENTS.md:24` reads "roughly 38 `catch`-to-null/empty frozen-read
  **sites** across 20 validators, of which Phase 139's SWEEP-03 fixes 4." The draft measured
  *vacuous-pass consumer guards* instead, then declared the requirement's count false.
  **"The intersection with RED-03 is empty" is FALSE** — `check-phase-61.mjs:39-43` is exactly
  that reader shape and `check-phase-61` is a RED-03 member.

- **D-09:** **"cannot be fixed at the library root" is an instruction to fix it IN PLACE**, not a
  discharge. SWEEP-03's remedy shape is *removing the swallow* (cf. `check-phase-49.mjs:264`),
  not hardening consumers. Route `readAtV15CloseFor61` through `_lib/frozen-at-close.mjs` so it
  inherits the six-pattern `frozenCause` taxonomy Phase 139 built rather than re-implementing a
  causeless swallow. Its 8 consumers already return `pass:false`; that is not the point.

- **D-10:** **Corrected census: 19 sites, not 15.** `[MEASURED]` `chicken-and-egg` guards:
  `check-phase-67.mjs` = **7** (returns at `:73, 88, 117, 132, 165, 199, 227`),
  `check-phase-68.mjs` = **2** (`:123, 185`), `check-phase-70.mjs` = **10** (`:389, 403, 420,
  435, 450, 466, 485, 501, 517, 532`; `:379` is a section comment). The draft's "5 fail-loud
  already" in `-67` are `nullCount === FILES.length` guards — vacuous, not fail-loud. **Cite the
  `return` line, not the `if` line**; every coordinate in the draft was off by one.

- **D-11:** **Land in 141: `check-phase-61` (the requirement's own named site), `check-phase-68`
  (2), `check-phase-70` (10).** All three are CARVE **Category 5, on-list** — no amendment.

- **D-12:** **`check-phase-67`: land the CARVE amendment in 141, defer its edits to Phase 144.**
  It is **absent from the CARVE allowlist entirely** (`grep "67" v1.20-CARVE.md` = zero hits) —
  the one path that hard-blocks the gate. It also carries a **worse, uncounted class** (D-13)
  and is pinned **live** by `check-phase-73.mjs:270,289` (an apex member) and
  `check-phase-74.mjs:59,84`, which names its exact line ranges 117-142 and 144-158 — two of the
  sites to be edited. Land the D-09 CARVE-only amendment commit now so 144 is unblocked.
  This is **not** the batching Phase 144's no-batching rule bars: that rule targets deferring
  unrelated work into the close; this is one file with a distinct blast radius and its own
  governance prerequisite.

- **D-13:** **Record the partial-null SILENT-pass class — strictly worse than the counted one.**
  `[MEASURED]` `check-phase-67.mjs:65-78` (V-67-01) does `if (c===null){nullCount++;continue;}`
  and then returns `{pass:true, detail:'all 4 ABM URL refs present at v1.7-close SHA'}` when as
  few as **one of four** files was readable — `pass:true`, **no `skipped` marker**, counted as
  PASS not SKIPPED, so it leaves no line in the log to notice. Same shape at `:109-122`
  (V-67-03, `totalMentions >= 6` satisfiable from one file) and `:189-204` (V-67-06).
  `frozen-at-close.mjs:221-223` names this prohibition verbatim.

- **D-14:** The "all sites are one identical `aa6de68` pattern, safe to batch" framing is
  **false and dangerous**. `[MEASURED]` three shapes: single-read `if (c === null)`; multi-file
  `if (nullCount === FILES.length)`; and `check-phase-70.mjs:485`, which guards on a **different
  SHA** — `'chicken-and-egg: 4df3a16 (Plan 70-05 Commit B) not resolvable'`, fed by
  `V17_CLOSEGATE`. Both SHAs resolve today, so the branches are dead on a deep clone — but
  `frozenCause` is a **six-pattern, two-class** taxonomy (`frozen-at-close.mjs:43-44`) and the
  branch also fires on `absent-path`, git missing from PATH, the 10 000 ms timeout, or a corrupt
  pack. "Fires only on a shallow clone" over-claims.

- **D-15:** **GOV-02 ledger row per edit, and `carve-gate.mjs` named as a hard-block in each
  plan's verification** (`v1.20-GOV-02-LEDGER.md:12-14`, CARVE D-10). The draft named neither.
  Record `check-phase-68`'s pre/post PASS tally so Phase 142's RED-07 comparison has a stated
  baseline (D-24).

### RED-03 — evidence path and the two timeout blockers (OWNER-RATIFIED 2026-08-07)

- **D-16:** **The draft's "there is no timeout root-cause class in this phase" is FALSE, twice.**
  It was built on a contaminated measurement (see D-30) and never checked CI.

- **D-17:** **Blocker 1 — `check-phase-66.mjs:318` spawns `check-phase-65` under `timeout: 300000`
  against a ~305 s child.** `[MEASURED]` `check-phase-66` total = 664 979 ms; subtracting
  children 48–64 leaves the 65 slot straddling the cap. On timeout the catch's `isMissing` test
  cannot match `ETIMEDOUT`, so it returns `pass:false` — indistinguishable from a real failure.
  **Raise `:318`. This is NOT barred:** `[MEASURED]` V-68-11 (`check-phase-68.mjs:216-231`)
  tests only `c.includes('timeout: 300000')` — substring *presence* — and `check-phase-66.mjs`
  carries that literal at **both `:318` and `:341`**. Raise `:318`, leave `:341`, V-68-11 still
  passes 5/5. Apply the same to `check-phase-67.mjs:261`. Check `check-phase-64` as the next
  crossing candidate.

- **D-18:** **Blocker 2 — PR-blocking CI job caps.** `[MEASURED]`
  `audit-harness-v1.7-integrity.yml:81-82` runs `check-phase-66.mjs --verbose` under
  `timeout-minutes: 30`, `continue-on-error: false`; the `check-phase-67/68/69/70` jobs each
  carry `timeout-minutes: 15`. `check-phase-67.mjs:46` has `CHAIN_PHASES=[48..66]` with
  `CHAIN_SKIP` empty and no `env` on the spawn, so it expands **through** 66 — floor ≈ **15.2 min
  against a 15-minute cap**. Raise them. `.github/workflows/audit-harness-*.yml` is CARVE
  **Category 1, on-list**.

- **D-19:** **No new acceptance bound is added.** The fork was mis-framed as invent-a-bound vs
  none; bounds already exist, one is near-violated and one is already breached. Fix those two;
  do not author a new wall-clock gate. A bound would convert a passing validator into a failing
  one on slower hardware — inventing a disposition in the milestone that exists to delete them.

- **D-20:** **Evidence path is BOTH forms, not one.** (a) Eight ascending quiesced standalone
  invocations 48→60→61→62→63→64→65→66 — SC#3's stated "8 independent direct invocations",
  ascending so a failure at 48 surfaces in ~0.5 s rather than 11 min deep. (b) **One
  `check-phase-66 --verbose`** — its `V-66-CHAIN-N` lines report all of 48…65's exit status
  individually *and* prove them green in composition, which eight isolated runs do not. Budget
  ≈ 22 min for (a) and ≈ 11 min for (b); ≈ 33 min total, once, at the end.

- **D-21:** **MANDATORY false-green guardrail.** `[MEASURED]` under `CHECK_PHASE_NESTED=1` every
  `CHAIN-*` guard **and all three `--self-test` call sites** (`check-phase-48.mjs:72`,
  `-60.mjs:188`, `-61.mjs:385`) return `{pass:true, skipped:true}`. **`check-phase-62`–`66` exit
  0 today, unfixed, under the apex.** A nested or apex run is evidence for **no part** of SC#2 or
  SC#3, and a Phase-144 apex showing 93/0/0 would look like proof. Write this into the plan.

- **D-22:** **Cold cache, not just quiesced.** `[MEASURED]` `check-phase-60` = **63 001 ms cold
  vs 9 336–12 435 ms warm (6.8×)**; `check-phase-48` = 1 951 cold vs 340 warm. Every ledger
  figure above is a warm number. **CI is always a cold clone, so the cold column is operative
  there.** Declare cache state and run 3×; singletons to six significant figures are not
  admissible in a phase whose margin is ±2 %. (Correction carried: 63 001 ms is a *total*, and
  `check-phase-60.mjs:239`'s 60 000 ms is a *per-subprocess* cap — not a violation.)

- **D-23:** **Scope the anti-contention rule to same-machine runs, and give it a mechanism.**
  The draft's blanket "parallelisation is barred" would declare the milestone's own acceptance
  evidence inadmissible — the eight members already run as **parallel one-per-job CI jobs**
  (v1.5 workflow for 48–61, v1.6 for 62–66) on isolated runners, which is the only form the
  "all 17 CI workflows green" bar can consume. And `Get-Process node = 0` is unsatisfiable
  (7 permanent residents on this machine) and unexecutable on `ubuntu-latest`. Assert the
  `check-phase*` process count **in the sweep script**, emit it into the evidence artifact, and
  **grandfather existing figures explicitly** — otherwise the rule retroactively inadmits
  RED-06's "+0.35 s on a ~17 s apex" that Phase 142 depends on. Per D-08/D-26/D-31, an
  acknowledgment is not a mechanism.

### CI fan-out and the carried-in deferred item (OWNER-RATIFIED 2026-08-07)

- **D-24:** **`if: always()` on the fanned-out validator jobs lands in 141, FIRST.** Twice
  deferred (139 → 140 → 141) and explicitly assigned in `140-CONTEXT.md:434`; the draft omitted
  it entirely. It is also a **prerequisite for D-25's evidence**: every fanned-out job is
  `needs: harness-run`, so while the harness exits 1 they report `skipped`, not failed, and a
  green fan-out is indistinguishable from an unrun one. Sequence it **before** the fan-out run —
  it will immediately surface the D-18 reds, which is the point. Category 1, on-list; one GOV-02
  ledger row per workflow.

- **D-25:** **Phase 141 owns the first CI fan-out run and triages it in-phase.** `[MEASURED]`
  `needs: harness-run` = 15 (v1.5) + 7 (v1.6) + 7 (v1.7) = **29 jobs**, of which **23** are
  `check-phase-NN`; the v1.5/v1.6 subset — **19 jobs** — has reported `skipped` on every ref all
  milestone (`REQUIREMENTS.md:17`, which is why SWEEP-02 needed the D-24 probe job). They run
  for the first time the moment RED-02 greens the harnesses. Sequence: land D-24, land the two
  D-17/D-18 timeout fixes, push, then `gh workflow run --ref master` per the Axis-2 precedent
  (no workflow has a `push:` trigger; dispatch needs the file on the default branch; **record
  all axes at one shared SHA**; never read CI while the remote is behind). Budget one full
  cycle — 19 never-executed jobs will not all be green first time, and discovering that inside
  Phase 144's close PR is the worst possible time.

- **D-26:** Nine local Windows exit-0s are SC#1's stated *form* but not the milestone's *bar*
  ("all 17 `audit-harness-*` workflows green"). RED-01's evidence is complete as SC#1 words it;
  the Axis-2 confirmation rides on D-25.

### Document amendments (OWNER-RATIFIED 2026-08-07)

- **D-27:** **D-09 is the WRONG instrument and the cited hazard cannot fire.** `[MEASURED]`
  `carve-gate.mjs:36` `IN_SCOPE_PREFIXES = ['scripts/','.github/','docs/']` — `.planning/` is
  outside the gate's diff scope entirely, so the draft's "a combined commit passes the gate
  while violating the written rule" **cannot occur**; and D-09 rule 1 (commit touches *only*
  `v1.20-CARVE.md`) **bars** the proposed shape. Use the established in-line
  **`[SUCCESS-CRITERION AMENDMENT, D-NN]`** marker (`REQUIREMENTS.md:16,17,18,20,24`), precedent
  **D-24** — SWEEP-02's "structurally unobtainable" re-scope, the closest analog in this
  milestone, which the draft never named. **Annotate and supersede; never overwrite** (D-23
  discipline). Land the amendment commit alone and first for process discipline — not because
  of the gate.

- **D-28:** **Six statements, three documents.**
  1. **`ROADMAP.md` Phase 141 SC#2** — hard-codes the mechanism "*via a corrected classifier
     context window (the backward-only scan at `:204-238` misses the iOS token at line 147…)*".
     Per D-01 that mechanism is unnecessary and the wording **forecloses the correct fix**.
     **Owner-ratified amendment; this is the phase's first gate.** Carry the four-way
     reproduction transcript as evidence. *(The draft missed this statement entirely.)*
  2. **`ROADMAP.md` Phase 141 SC#4** — "scoped to the ~19 validators already open for RED-03";
     amend to the corrected census on the requirement's own unit.
  3. **`REQUIREMENTS.md` SWEEP-09** — "roughly 38 … across 20 validators, of which SWEEP-03
     fixes 4"; correct on the reader-site unit, and **do not drop the SWEEP-03 clause** as the
     draft did.
  4. **`REQUIREMENTS.md` "Ordering, corrected"** (22/3, 30/4) — **annotate only.**
     `REQUIREMENTS.md:8` stamps every `[MEASURED]` figure to HEAD `347c20a8`; these are dated
     observations, not live claims. Overwriting destroys provenance.
  5. **`STATE.md`** — stale in ~6 places: `:216` (`| 141 | RED-01, RED-02, RED-03 | 3 |` —
     **SWEEP-09 absent**, the single most likely cause of a silently dropped requirement),
     `:210`/`:220` "27/27", `:195` "all 27", `:26` "Current focus: Phase 140", `:101` diagram.
     Routine hygiene, no instrument.
  6. **`ROADMAP.md` Phase 141 "Discuss-phase flags: None dominant"** — false in spirit; RED-02's
     root cause and SWEEP-09's scope were both live forks requiring owner ratification.

- **D-29:** **`ROADMAP.md` Phase 141 SC#1 is STRUCK from the amendment list.** It is **satisfied,
  not falsified**: `ROADMAP.md:143` (Phase 141 Depends-on) already predicted RED-01's discharge
  by Phase 140, and the self-test now greens all eight *because RED-01 cleared first, in the
  ratified order*. Amending it as "false" would delete the record that the ordering was correct
  — the opposite of the D-23 discipline. Annotate as discharged, at most.

- **D-30:** **RED-01 flips `Pending → Complete` at 141, `Validated` at Phase 144 — not Validated
  here.** `ROADMAP.md:206` (Phase 144 SC#4): "a **single close-gate commit** flips all **28**
  v1.20 requirements … to Validated." Eight prior milestones ran on that invariant. The
  traceability table carries Pending/Complete; "Validated" is the PROJECT.md close-gate state.

### Recorded method failures — carry these, do not repeat them

- **D-31:** **This phase's own draft generated four bad `[MEASURED]` figures**, after Phase 140's
  context warned about exactly this class. (a) "`check-phase-54` = 62 837 ms, blowing
  `check-phase-60`'s 60 000 ms budget" — contamination from orphaned subprocesses; clean it is
  **2 160–3 553 ms** and `check-phase-60` is **23/2** with V-60-17/18 **passing**. (b) "V-54-27
  costs 71 s" — an artifact of timestamping a *pipe*, which batches Node's stdout flushes;
  standalone it is **2.2 s**. (c) the "369 occurrences / 16 heading lines" blast radius —
  measured against the wrong corpus. (d) the SWEEP-09 census — measured on the wrong unit.
  The adversarial review then produced a fifth: a `check-phase-66` figure of 318 203 ms that
  was **below the arithmetic floor of its own series** (≈582 000 ms), refuted by direct
  measurement at 664 979 ms. **Re-execute every number on a quiesced, cache-declared machine
  before relying on it, and prefer a real run over a reconstruction.**

- **D-32:** The exponential standalone curve is **real and predictive**: `[MEASURED]` ratios
  2.09 / 2.01 / 1.91 / 1.91 / 1.90 / 1.985, holding at its first out-of-sample point
  (`check-phase-66` projected ~670 000 ms, measured 664 979 ms — **0.75 % error**). Nothing about
  it is fixed here; RED-06 and NEST-01 (Phase 142) own the apex and cold-clone curves. Hand the
  measured law to Phase 142 as a named input. Note the gap: NEST-01 is scoped to the **apex**
  cold-clone cost, so the non-nested standalone path and `check-phase-66`'s 30-minute CI cap are
  currently unowned by any requirement.

### Claude's Discretion

- Plan/atom decomposition and commit ordering, subject to D-27's amendment-first rule, D-24's
  before-fan-out rule, and D-12's CARVE-amendment-before-144 rule.
- The exact rebased `BASELINE_9` comment wording and the new dated audit-trail line (D-04).
- Whether `readAtV15CloseFor61`'s library routing (D-09) is a wrapper or a direct replacement,
  subject to `check-phase-68.mjs:202` V-68-10's tolerant-OR still passing.
- The precise `timeout` and `timeout-minutes` values in D-17/D-18, subject to V-68-11 substring
  presence surviving.
- Sweep-script shape and evidence-artifact format for D-23.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements, roadmap, governance
- `.planning/REQUIREMENTS.md` — RED-01/02/03 text; **SWEEP-09 at `:24`** (the reader-*site* unit
  and the named `check-phase-61.mjs:39-45` case); the "Ordering, corrected" paragraph at `:40`
  and the "RED-02 method" paragraph at `:42`; the HEAD-`347c20a8` stamp at `:8`; the milestone
  bar at `:6`; existing `[SUCCESS-CRITERION AMENDMENT]` markers at `:16,17,18,20,24` (the D-28
  instrument, D-24 precedent)
- `.planning/ROADMAP.md` §"Phase 141" — **SC#2 (`:148`, the mechanism this phase amends)**,
  SC#1 (`:147`, struck per D-29), SC#4 (`:150`), Depends-on (`:143`); §"Phase 142" for RED-06/07
  and NEST-01; §"Phase 144" `:206` SC#4 (single close-gate, 28 requirements) and the
  no-batching rule
- `.planning/STATE.md` — `:216` (SWEEP-09 absent from the Phase-141 block), `:101`, `:195`,
  `:210`, `:220`, `:26`; "Blockers/Concerns" for the zero-line-shift glossary bar
- `.planning/milestones/v1.20-CARVE.md` — **Category 1** (`audit-harness-*.yml`), **Category 5**
  (the 15 chain validators: 30, 31, 48, 49, 51, 60–66, 68, 69, 70 — note **67 is absent**),
  **Category 6** (`regenerate-supervision-pins.mjs`), Category 8 (glossary scope: `_glossary-macos.md`
  + `admin-setup-ios/**` only); D-09 amendment procedure `:64-77`; D-10 gate disposition;
  D-12 target-scoped path-string grep `:93-98`
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` `:12-14` — row-per-edit schema
- `.planning/phases/140-frozen-aware-harness-conversion/140-CONTEXT.md` — D-08 (the three
  timeouts; only `:261` is SWEEP-06's subject), D-09 (apex structurally blind), D-30 (amendment
  lands alone and first), D-23 (supersede explicitly, never delete), and the `<deferred>` entry
  at `:434` assigning `if: always()` to this phase

### The RED-02 subject
- `scripts/validation/regenerate-supervision-pins.mjs` — **`BASELINE_9` at `:533-543` (9/9 dead)**;
  `classify()` `:204-238`; the set-diff `:559-582`; the Phase-48-D-14 acceptance record
  `:597-602`; the `unpinnedTier2` assertion `:603-610` and the informational `pinnedTier2`
  branch `:611-615`; the two-branch FAIL string `:624-625`
- `scripts/validation/v1.7-audit-allowlist.json` — 13 `_glossary-android.md` entries in
  `supervision_exemptions[]` (not 4); pins 145/147/303/333 match live byte-for-byte
- `docs/_glossary-android.md` `:145` (`### Supervision`) and `:147` (the iOS token) — **READ ONLY.
  Zero line-shifting edits; 365 pin coordinates across 16 frozen sidecars depend on it**

### The eight RED-03 members and their guards
- `scripts/validation/check-phase-48.mjs` `:72` (NESTED skip; note no `V-48-` token exists)
- `scripts/validation/check-phase-60.mjs` — `:43` CHAIN_PHASES (11 members), `:177` **V-60-09
  live pin on the BASELINE_9 comment**, `:188` NESTED skip, the three timeouts `:193`/`:239`/`:261`
- `scripts/validation/check-phase-61.mjs` — **`:39-43` `readAtV15CloseFor61`, SWEEP-09's named
  site, `timeout: 10000` (the tightest in the tree)**; `:385` NESTED skip; consumers V-61-01..08;
  the unguarded `readAtV15Close` calls at `:271, 282, 297, 313`
- `scripts/validation/check-phase-66.mjs` — `:48` CHAIN_PHASES `[48..65]`, `:71` empty CHAIN_SKIP,
  **`:318` the 300 000 ms chain spawn (raise) and `:341` the harness spawn (leave)**, `:127`
  V-66-03 live pin
- `scripts/validation/check-phase-67.mjs` — `:46` CHAIN_PHASES `[48..66]`, `:261` spawn with no
  `env`, the 7 chicken-and-egg returns and the 3 partial-null silent passes at `:65-78`,
  `:109-122`, `:189-204`
- `scripts/validation/check-phase-68.mjs` — `:138-143` V-68-06, **`:202` V-68-10** (pins
  `readAtV15CloseFor61`, tolerant-OR), **`:216-231` V-68-11** (substring presence only),
  `:97-115` V-68-04 and `:166-178` V-68-08 (HEAD-coupled, no frozen read), edit sites `:123`/`:185`
- `scripts/validation/check-phase-70.mjs` — `:179` V-70-06 live pin; the 10 chicken-and-egg
  returns incl. **`:485`, which guards on `4df3a16`, not `aa6de68`**
- `scripts/validation/check-phase-73.mjs` `:270,289` and `check-phase-74.mjs` `:59,84` — **live
  pins on `check-phase-67.mjs`, naming its exact line ranges 117-142 and 144-158**

### Library and CI
- `scripts/validation/_lib/frozen-at-close.mjs` — `:43-44` the six-pattern two-class `frozenCause`
  taxonomy, `:221-223` the vacuous-pass prohibition, `:415-417` the `--depth 1 <local-path>`
  silent-ignore trap (any local shallow test without `file://` is a false green)
- `scripts/validation/carve-gate.mjs` `:36` `IN_SCOPE_PREFIXES` (`.planning/` excluded), `:255`
- `.github/workflows/audit-harness-v1.7-integrity.yml` `:81-82` (`timeout-minutes: 30`,
  `continue-on-error: false`, `check-phase-66 --verbose`), `:95` (the stale `~102s` reference),
  and the `timeout-minutes: 15` jobs for 67/68/69/70
- `.github/workflows/audit-harness-v1.5-integrity.yml` and `-v1.6-integrity.yml` — the per-validator
  `needs: harness-run` fan-out jobs (19 of them) that D-24/D-25 unblock

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `_lib/frozen-at-close.mjs`'s `readAtClose` + typed `frozenCause` — the target for D-09's
  re-routing of `readAtV15CloseFor61`; already CARVE Category 4.
- Phase 139's SWEEP-03 remedy shape (`check-phase-49.mjs:264`, `check-phase-51.mjs:31`) — the
  literal pattern for D-09/D-11: delete the inline catch so the throw reaches the runner's outer
  catch.
- Phase 139's `file://` shallow-clone negative harness — the only valid way to test D-14's
  frozen-read failure branches.
- The existing `[SUCCESS-CRITERION AMENDMENT, D-NN]` markers at `REQUIREMENTS.md:16,17,18,20,24`
  — the D-27 instrument, already in use four times this milestone.

### Established Patterns
- Every chain validator carries `CHAIN_PHASES` + a `CHECK_PHASE_NESTED` short-circuit; non-nested
  standalone expansion is exponential (D-32), nested is O(n) and blind (D-21).
- Chain validators exit via `process.exit(failed > 0 ? 1 : 0)`; the runner catches throws.
- Audit-trail comments above pinned arrays are asserted for *existence only*, never for accuracy
  (D-05) — appending a line is safe, editing one is not (D-04).
- `parseAllowlist()`-style degradation to empty/null is the milestone-wide defect class SWEEP-03
  and SWEEP-09 exist to delete.

### Integration Points
- `regenerate-supervision-pins.mjs` is read **live** by four validators (D-04), two of them
  RED-03 members — the fix's blast radius runs through the chain it is trying to green.
- `check-phase-68.mjs` is Phase 142's RED-07 regression guard; edits here move the baseline that
  phase compares against (D-15).
- The 19 fanned-out CI jobs are gated on `needs: harness-run`, so RED-02's fix is what makes them
  execute at all (D-25).
- `check-phase-67.mjs` is pinned live by `check-phase-73` (an apex member) and `check-phase-74`
  at explicit line ranges — the reason its edits defer to 144 (D-12).

</code_context>

<specifics>
## Specific Ideas

- The owner directed that gray areas be resolved by `/grill-me` followed by `/adversarial-review`,
  with each question's options scored and a best option recommended with reasoning. That process
  produced this document — and **reversed the draft's three headline recommendations**
  (the RED-02 fix, the SWEEP-09 re-scope, and "no timeout root-cause class").
- Standing project rule, and it held again: *a corpus edit requires proof the document is wrong,
  not merely that a frozen assertion disagrees with it.* **Zero corpus edits. Zero glossary
  edits.** Every failure resolves via a stale-pin rebase plus governance and CI work.
- Owner ratifications, 2026-08-07: rebase `BASELINE_9` + amend SC#2; SWEEP-09 lands 61/68/70 in
  141 with `check-phase-67` CARVE-amended now and edited in 144; all three of the timeout fixes,
  `if: always()`, and the first CI fan-out are in scope for 141; six statements amended with
  in-line markers, annotate-not-overwrite, SC#1 struck.
- Method warning for the planner, earned four times over in this phase alone (D-31): re-execute
  every number on a quiesced, cache-declared machine. A figure that is arithmetically impossible
  against its own series survived a Finder *and* was only caught by an 11-minute real run.
- The draft's "the phase is far smaller than the roadmap assumed" framing is **withdrawn**. Actual
  contents: a `BASELINE_9` rebase, an owner amendment gate, a 13-site SWEEP-09 landing plus a
  CARVE amendment, two timeout fixes, `if: always()`, a first-ever 19-job CI fan-out, six document
  amendments, and a ~33-minute sequential evidence sweep. Plan this as a multi-plan phase.

</specifics>

<deferred>
## Deferred Ideas

- **`check-phase-67.mjs`'s 7 chicken-and-egg guards + 3 partial-null silent passes** — Phase 144,
  as a scoped unit with its own regression run. Its CARVE amendment lands in 141 (D-12/D-13).
- **The 18 false audit-trail comments above `BASELINE_9`/`10`/`11`** (D-05) — recorded, not fixed.
  A vacuous-pass class of exactly SWEEP-09's shape; needs its own requirement, not a silent
  in-phase fix.
- **Synthetic negative fixture for the classifier's Tier-2 arm** (D-07) — backlog. Add only when
  someone actually proposes changing `classify()`. Note `extraFromClassifier` is vacuous today
  regardless.
- **The unowned standalone-chain cost** (D-32) — NEST-01 (Phase 142) covers only the *apex*
  cold-clone curve; the non-nested standalone path and `check-phase-66`'s 30-minute CI cap have
  no requirement. Raise at Phase 142 discuss.
- **`check-phase-64` as the next 300 000 ms crossing candidate** (D-17) — measure at Phase 142,
  which already owns the chain-shape change.
- **`audit-harness-v1.7-integrity.yml:95`'s stale `Windows reference: ~102s`** — ~6.5× wrong
  against the measured 664 979 ms. Hygiene; fold into Phase 144's workflow work.
- **Class (d), the pre-chain content drift in `check-phase-30`/`-31`** — Phase 142 (RED-04/05),
  explicitly not addressed here. A plan that "fixes" only this phase's scope will still find
  30 and 31 red.

</deferred>

---

*Phase: 141-standalone-red-validator-set-chain-members-green*
*Context gathered: 2026-08-07*
