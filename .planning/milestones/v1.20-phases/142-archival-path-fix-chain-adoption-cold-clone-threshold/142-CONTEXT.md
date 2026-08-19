# Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold - Context

**Gathered:** 2026-08-10
**Status:** Ready for planning

<domain>
## Phase Boundary

The milestone's **pre-chain** layer. `check-phase-30` and `check-phase-31` — the only two
validators below 48, and the last two members of the ten-member standalone-RED set — exit 0
standalone and become real, executing members of the apex chain, with `check-phase-68`'s
regression guard intact. The chain-apex's cold-clone cost acquires a measured, falsifiable
threshold and an executable response rule.

**No corpus content is authored or edited. Zero doc edits.** All five (now six) failures resolve
by correcting the *validators*, because in every case a **later ratified decision** changed the
corpus deliberately: Phase 40-01 (v1.4) extended the l1-template platform enum with Android;
Phase 114 D-07 replaced the pipe-list `platform:` placeholder with `platform: all`; Phase 116-07
grew runbook 14 by +20 lines under the EEE retrofit; Phase 122 converted `07-ios-triage.md` from
Mermaid to a text decision table under STD-04.

Requirements in scope: RED-04, RED-05, RED-06, RED-07, NEST-01.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` codebase interrogation followed by a scored `/adversarial-review`
(**5 parallel Finders → Adversary → Referee**). **83 findings raised (518 Finder points), 6
disproved, 77 confirmed.** The review **reversed six of the draft's recommendations**, including
its headline claim, and **invalidated six of its `[MEASURED]` rows**. Every figure below was
re-executed by at least three independent agents on a quiesced machine at HEAD `f89a68d7`; the
load-bearing apex figure was reproduced **four** times.

### Ground truth established by interrogation

**Failure ledger — `[MEASURED]`, main worktree, Windows, warm, n≥3 per agent.**

| Validator | Wall clock | Result | Failing assertions |
|---|---|---|---|
| `check-phase-30` | 178–348 ms | 10 PASS / **2 FAIL** / 1 SKIP | V-30-01, V-30-10 |
| `check-phase-31` | 187–270 ms | 26 PASS / **3 FAIL** / 1 SKIP | V-31-23, V-31-25, V-31-29 |

**The draft's own timing ledger was wrong by 12–20× and is struck.** Do not carry forward
2 664 ms, 4 450 ms, 7.114 s, 23 236 ms, 22 996 ms, or the "npx exit 0, 13 313 ms, 20 links" row.
The PASS/FAIL/SKIP tallies reproduced exactly while the timings did not — a **self-consistent but
false** ledger, the fifth recurrence of the D-31 class.

### The three superseded assertions (RED-04/RED-05)

- **D-01:** **All five failures are superseded assertions, not wrong documents.** Each names a
  corpus shape a *later ratified decision* deliberately removed. The standing project rule holds
  again: a corpus edit requires proof the document is wrong. **Zero doc edits.**

- **D-02:** **The instrument is: re-assert the ratified successor shape at HEAD.** A v1.3 frozen
  pin is *mechanically feasible* — `[MEASURED]` at tag `v1.3` all three assertions pass, and
  `MILESTONE_CLOSE_SHAS` is an unordered literal so adding `V13` is a pure key insertion with no
  HARN-17 collision — and is rejected **solely on vacuity**: a pin against an immutable corpus is
  permanently true by construction, the class this milestone exists to delete.
  — **Reversibility:** costly — the successor assertions become the phase's RED-04/05 evidence
  and are re-read by the apex from Phase 142 onward.

- **D-03:** **The draft's "barred three times over" argument is WITHDRAWN — two of its three legs
  are false.** `[MEASURED]` (a) C17 assertion #1 is fence-maskable: wrapping a ```` ```mermaid ````
  block in `~~~text` gives C17 exit 0 with `V-30-01` passing, and `c17-eee-contract.mjs:202-209`
  documents that masking as *intentional design*. (b) `check-phase-30.mjs:191` is
  `content.includes(...)` — a raw substring **anywhere in the file** — while C17 #10 reads only
  **frontmatter**, so the literal can be satisfied from the HTML author-guidance comment with C17
  still green. Only the CARVE-allowlist leg holds, and that leg contradicts D-10 below. State the
  honest argument (vacuity), not the false one.

- **D-04:** **V-30-01's successor asserts the Routing-Verification TABLE, not prose tokens.**
  The draft's proposal — distinct `IOS\d+` count ∈ [1,5] — `[MEASURED]` **passes with the entire
  decision table deleted**: all four `IOS\d+` occurrences sit on two prose lines (`:33`, `:37`)
  and `grep -cE '^\s*IOS[0-9]+\{'` = **0**. `EEE-SOP-standard.md:452-458` (STD-04 D-04) warns in
  exactly these terms. Assert instead: the Routing-Verification table has ≥3 rows, each of
  `IOS1`/`IOS2`/`IOS3` appears as table content, **and** the literal
  `**LOCKED — 23 (nodes + labeled edges)**` is present.

- **D-05:** **Do not write `LOCKED — N leaves`.** `EEE-SOP-standard.md:436` mandates that pattern,
  but `[MEASURED]` the corpus carries **six incompatible LOCKED shapes across 36 files** and the
  D-03 literal appears in exactly **one** file (`docs/l2-runbooks/26-apple-business-permission-denied.md:29`).
  `07-ios-triage.md:33` reads `**LOCKED — 23 (nodes + labeled edges)**`. Assert what the file
  actually says; the draft silently truncated the standard to make its claim land.

- **D-06:** **V-30-10's root cause is `600eabd6` (Phase 40-01, v1.4), NOT Phase 114 D-07.**
  `[MEASURED]` by `git show`: literal count **1** at `b3f38e9a` (30-01) → **0** at `600eabd6`
  ("extend l1-template.md platform enum with Android") → 0 at `b90775dd`. **V-30-10 was already
  failing when Phase 114 ran, by one whole milestone.** `b90775dd` (Phase 114 D-07) is the correct
  cause for **V-31-25 only**. Recording the draft's attribution would enshrine a 74-phase error in
  the file this phase exists to correct.

- **D-07:** **V-30-10 and V-31-25 are NOT the same assertion — stop bulleting them together.**
  Mechanism differs (`content.includes()` anywhere vs `/^platform: Windows \| macOS \| iOS \| all$/m`
  line-anchored), bypass surface differs, break commit differs (D-06). Make **both** successors
  line-anchored on the author-guidance comment line so the two validators stop diverging.

- **D-08:** **One leg, not two: assert iOS in the template's author-guidance enum. DROP the
  "resolves in C17's D1 map" leg.** `[MEASURED]` C17's enrolment set is **234 files** including
  both templates, and `c17-eee-contract.mjs:334-342` runs assertion #10 on every one
  unconditionally. That leg **can never fail while C17 is green** — a new permanently-true
  assertion, i.e. the RED-04/05 defect class recreated by the fix for RED-04/05. Record explicitly
  that asserting on a Pandoc-stripped comment is **weaker** than the pre-D-07 live frontmatter
  affordance; do not present it as equivalent coverage.

- **D-09:** **Record the supersession cause in the successor validators** (a comment cannot
  mechanically drift-fail, so this is not the index-drift class Area 3 removes; and both files are
  CARVE Category 5, so the scope is authorized). Cite `600eabd6` for V-30-10, `b90775dd` +
  `07-ios-triage.md:81` for V-31-25/V-30-01.

### RED-06 — chain adoption (OWNER-RATIFIED 2026-08-10)

- **D-10:** **`scripts/validation/check-phase-138.mjs` is OFF the CARVE allowlist — land a CARVE
  amendment for it, alone and first.** `[MEASURED]` by replaying `globToRegExp`/`parseAllowlist`
  over all 34 patterns, and reproduced live: appending one line to the apex gives
  `in-scope=45 on-list=44 off-list=1`, `carve-gate FAIL`, exit 1 (`--base HEAD` does not bypass —
  the working-tree arm still catches it). This is a **verbatim repeat of Phase 141 D-12**
  (`check-phase-67` absent from the allowlist). CARVE **D-10 is the governing vocabulary**:
  "**Hard-block** on a non-zero `carve-gate.mjs` exit inside a plan's verification step. There is
  no warn-and-continue path." (The gate has no CI caller; do not overclaim CI enforcement.)

- **D-11:** **Mechanism is `CHAIN_EXTRA = [30, 31]` in the apex, concatenated into the check loop
  and excluded from the three span invariants. Adopt NO other leg.**
  - *Extending the span to 30 is not "impossible" — it is wrong in a specific way.* `[MEASURED]`
    with `CHAIN_START=30, CHAIN_END=137`: 108 unique of 108 → the **dedup guard passes**; only
    `:120` (`length !== 90`) throws; the termini guard is never reached. If an author also rebased
    the constants, all guards pass and the failure becomes **16 deterministic FAILs** for the
    absent 32..47. Say that, not "impossible".
  - *Adopting into a non-apex chain member is genuinely inert* — the adversarial review **upheld**
    this against a Finder challenge. Every `CHAIN_PHASES`-generated check carries the NESTED
    short-circuit inside its own `run()`, and the apex sets `CHECK_PHASE_NESTED=1` on every child
    unconditionally. (The Finder's refutation injected a *plain* check, which would not satisfy
    RED-06's "members of the apex `CHAIN_PHASES` array" anyway.)
  - **Leg (d) "CI jobs of their own" is DROPPED.** Unauthorized by RED-06, lands in a Category-1
    frozen workflow needing its own ledger row, moves the 17-workflow bar, and per D-13 **reds on
    day one**.
  - **Rule explicitly that a literal `CHAIN_EXTRA` sidecar satisfies HARN-18's "generated by
    arithmetic, never transcribed"**, because the *span* array remains arithmetic. `[MEASURED]`
    non-contiguous hand-authored arrays are established precedent (`check-phase-60` =
    `[48,49,51..59]`, skipping 50; same in `check-phase-62`). Nobody has ruled on this; rule now.
  — **Reversibility:** costly — Phase 144's apex must carry it forward or adoption evaporates.

- **D-12:** **Adoption lands STRICTLY AFTER RED-04/05 and V-31-23/29 are green.** `[MEASURED]`
  splicing `CHAIN_EXTRA` at HEAD gives **93 PASS / 2 FAIL / 0 SKIPPED (95 total), rc=1**, three
  identical runs. Adopting first reds the apex — the milestone's own green bar.

- **D-13:** **The npx external checks FAIL, not SKIP, on `ubuntu-latest` — repair the `isMissing`
  classifier, then adopt. (OWNER-RATIFIED)** `[MEASURED]`:
  `npx --yes --no-install markdown-link-check` → exit 1,
  `npm error npx canceled due to missing packages and no YES option`. **No arm** of either
  validator's classifier (`ENOENT` / `status===127` / `'not found'` / `'Could not resolve'` /
  `'npm error could not determine executable'`) matches → `pass:false`. `markdown-link-check` is
  absent from `package.json`, **no apex job runs `npm ci`** (the only global installs live in the
  cron-gated `rotting-external-quarterly` jobs on a separate runner filesystem), and
  `@mermaid-js/mermaid-cli` has **zero** hits anywhere in `.github/` — two independent
  deterministic FAILs. Proximate cause: both files pass `--yes` **and** `--no-install`;
  `--no-install` wins, which is why the text reads "no YES option". **Fix = add a classifier arm
  matching npm's actual text.** This is the only option that makes RED-04/05's "exits 0 standalone"
  true on the runner class D-03 makes sole-authoritative.

- **D-14:** **The draft's `CHECK_PHASE_NESTED=1` skip proposal is WITHDRAWN.** `[MEASURED]` both
  files contain **zero** `CHECK_PHASE_NESTED` tokens, so it introduces standalone/nested divergence
  rather than matching an idiom; the external checks **already** return `{pass:true,skipped:true}`
  on Windows ENOENT, so the hazard it removes does not exist there; and with **zero CI jobs** for
  30/31 the only CI execution is nested under the apex — so under the skip the `required: true`
  check would execute **nowhere**. It manufactures a vacuous assertion in the milestone whose bar
  is deleting them, and contradicts `141-EVIDENCE.md:255-263` Mandatory statement 1.

- **D-15:** **DO NOT amend SC#3's "+0.35 s on a ~17 s apex" — the figure is CORRECT.**
  `[MEASURED]` four independent sessions: **15 865 / 16 781 / 16 853 / 16 914 / 17 023 / 17 367 /
  17 500 / 16 438 / 16 750 / 18 695 ms**, all 93/0/0. The draft's "warm 23.0 s" was a **clone-tree
  artifact** (clone trees measure 23.6–27.9 s at the same SHA; a *copied* tree measures 16.8–18.7 s,
  isolating **clone** as the variable, not coldness). Marginal adoption cost measured by splicing:
  **+220 ms and +283 ms** — the roadmap's +0.35 s is correct within noise. And
  `141-EVIDENCE.md:276-281` (Mandatory statement 2) **explicitly grandfathers** it. The draft
  proposed overturning a Phase-141 mandatory statement, on seven document surfaces, without citing
  it.

- **D-16:** **Record the cold first-run figure as a SEPARATE row — that column is legitimate.**
  `[MEASURED]` first-invocation-of-session apex: **33 278 / 50 419 / 63 176 ms** across three
  agents. High variance; never quote a single value. **Declare tree identity as a variable**, not
  just cache state — it is worth more than cold-vs-warm here.

- **D-17:** **RED-07 baseline is already recorded: `check-phase-68` = 33 PASS / 0 FAIL / 0 SKIPPED,
  7.13–7.34 s standalone, 12/0/21 nested.** `[MEASURED]` `V-68-04` is a **floor** over 5 named
  call-sites, not a cap — adding `archive-path` to `check-phase-30` cannot break it; `V-68-08` is a
  bare whole-file `c.includes('_missing')` already satisfied at four sites `check-phase-31.mjs:34,
  36,107,116` that no V-31-23 rewrite touches. Both guards are cheap; **the GOV-02 grep is still
  mandatory** (D-18), not optional.

- **D-18:** **GOV-02 ledger row per edited frozen path — THREE paths, not one.** CARVE D-12
  (`v1.20-CARVE.md:93-113`) requires a target-scoped **path-string** grep *and* a row in
  `.planning/milestones/v1.20-GOV-02-LEDGER.md` (schema `File | Grep command | Hit count |
  Regression gate run | Result | Plan`) before editing any frozen validator. Phase 142 edits
  `check-phase-30.mjs`, `check-phase-31.mjs`, and `check-phase-138.mjs`. `[MEASURED]` the D-12
  grep on `check-phase-30.mjs` returns **19** provenance comments (`// Runner (pattern from
  check-phase-30.mjs lines 303-337 …)` across `v1.4`–`v1.19-milestone-audit.mjs`, plus
  `v1.19-milestone-audit.mjs:59`'s `lines 21-38` citation and `check-phase-31.mjs:137`'s own) —
  that is exactly what the Hit-count column is for. **None is a `String.includes()` assertion**, so
  structural fact "no validator *pins* check-phase-30's line ranges" **stands** under the project's
  ratified definition of "pin" (`v1.20-CARVE.md:100-104`); the adversarial review upheld this
  against a Finder challenge.

- **D-19:** **Commit sequence is fixed:** (1) SC-amendment commit → (2) CARVE amendment commit
  touching **only** `v1.20-CARVE.md` → (3) the edits. D-09 rule 1 forbids the amendment commit
  touching any other path, in-scope **or** out-of-scope, and `carve-gate` **cannot detect a fold**
  because `.planning/` is outside `IN_SCOPE_PREFIXES`. The draft had two commits both claiming
  "alone and first" and never ordered them.

### V-31-23 and the line-index class (RED-05)

- **D-20:** **SC#2's prescribed mechanism is INSUFFICIENT — additive amendment required.**
  `[MEASURED]` and confirmed in a fresh `--no-hardlinks file://` clone:
  `resolveArchivedPhasePath('31-ios-l2-investigation/expected-d23.txt', ['v1.3-phases'])` resolves
  correctly, **but the D-23 line moved 182 → 259**, so the path-only fix merely changes the failure
  message from `"file or fixture missing"` to
  `MISMATCH — actual[0:80]='When a device is found non-compliant…'`. `pass` stays `false`.
  Amend SC#2 additively: the resolver for the **fixture**, a content anchor for the **target**.

- **D-21:** **Content anchor on PRESENCE, not uniqueness.** `[MEASURED]` the fixture matches
  exactly one trimmed line (259) and occurs once as a substring, today. But
  `06-compliance-policy.md` is **EEE-enrolled** (`doc_type: Guide`, `## Summary`,
  `## Version History`) and commit `dfba7a4b` is literally "hand-author Summary prose" — an
  "exactly once" clause re-breaks the moment a future retrofit summarises or quotes the bullet.
  The anchor is **index-drift-immune, not retrofit-immune**; the draft's "strictly stronger" claim
  is wrong on that axis. Drop the uniqueness clause: it adds a failure mode without adding coverage.

- **D-22:** **Rule on the section move, and update the check name.** `[MEASURED]` line 182 sat under
  `### Step 3: Configure Actions for Noncompliance` (`:180`); the sole match at 259 sits under
  `### iOS-Specific Timing Considerations` (`:256`). `31-CONTEXT.md:149,265` both name line 182 in
  the Step-3 mapping row. **Whether the current location satisfies D-23 is a question nobody has
  asked** — answer it in-plan. Also: the check `name` string embeds `"line 182"`, so any fix
  changes the apex's printed output line.

- **D-23:** **Keep the `_missing`-style discriminator, DELETE the stated reason.** V-68-08 is not
  at risk under **any** V-31-23 rewrite (D-17), so "so V-68-08 stays satisfied" is a non-reason.
  And "fail loud" is **SWEEP-09 language** — SWEEP-09 is Phase 141, **Complete**, census
  61/68/70 with 67 deferred; `check-phase-31` is not in it. Keep the change minimal: distinguish
  resolver-null from read-failure in the detail string of the check being rewritten. Note
  `check-phase-31.mjs:33`'s call is *inside* `parseInventory()` — V-31-23 needs its own call site,
  not a reuse.

- **D-24:** **V-31-29 gets the SAME instrument as the Area-1 supersessions. (OWNER-RATIFIED)**
  Two required changes. **(a) Fix the metric.**
  `.planning/milestones/v1.3-phases/31-ios-l2-investigation/31-VALIDATION.md:69` mandates
  "**`wc -l`** returns within ±15% of targets"; `check-phase-31.mjs:131` implements
  `c.split('\n').length` = `wc -l` **+1**. `[MEASURED]` `wc -l` = 215/211/195/200 vs `split` =
  216/212/196/201. **(b) Re-derive runbook 14's target BAND.** The spec gives *bands*, not points —
  `14:~160-180; 15:~220-280; 16:~190-210; 17:~220-250` — and all four reconcile **exactly** at
  ±15% per endpoint (`0.85×160=136`, `1.15×180=207`, …; the code's 170 for runbook 17 is the
  documented IN-06 widening). Record the cause: `114973ba` then `956818a0`, **Phase 116-07's EEE
  retrofit, +20 lines in one commit** — the same ratified-corpus-retrofit class as V-30-01/V-30-10.
  The draft's "widen the upper bound" is **withdrawn**: admitting 216 forces the documented target
  ceiling from 180 to ≥188, amending the content-size *contract* rather than the tolerance, with
  nothing counter-ratcheting. `[MEASURED]` headroom asymmetry: 14 = **−9**, 15 = +110, 16 = +45,
  17 = +86 — runbook 14 has the narrowest band and the lowest ceiling while being the longest file.

### NEST-01 — cold-clone threshold

- **D-25:** **Subject is `[48..137]` (the apex of record) measured in-phase; `[48..138]` is a
  DRAFTING ERROR at three ratified sites and is corrected here. (OWNER-RATIFIED)** `[MEASURED]`
  one validator per phase, unbroken `30 31 48…138`; apex spans are `check-phase-100`=[48..99],
  `-112`=[48..111], `-119`=[48..118], `-125`=[48..124], `-128`=[48..127], `-134`=[48..133],
  `-138`=[48..137] — the `[48..N-1]` invariant is explicit in source. v1.20 spans phases **139–144**
  and HARN-18 mandates `check-phase-139..NN.mjs`, so **Phase 144's apex is `check-phase-144` =
  `[48..143]`, 96 entries**. Correct `REQUIREMENTS.md:67` (NEST-01), `REQUIREMENTS.md:83`
  (HARN-18), and `PROJECT.md:25` — annotate-not-overwrite. A wrong `CHAIN_END` yields a
  five-phase-short chain that still passes its own self-guards: a silent close-blocker, and Phase
  142 is the last cheap place to catch it. — **Reversibility:** one-way for Phase 144 — the apex
  array is generated from these constants and a short chain validates nothing it omits.

- **D-26:** **DELETE the draft's "honest limitation" — the cold-clone contradiction is
  MANUFACTURED.** The draft argued the recorded 19 s Axis-1 figure "cannot be cache-cold" because
  it beat a 23.0 s warm baseline. `138-04-SUMMARY.md:113,287-289` records **that session's own
  warm apex at 14 s** → 19/14 = **1.36× slower**, exactly consistent with a cold clone. Re-executed:
  `git clone --no-hardlinks` = 11 787 ms, apex inside it **24 523 / 25 686 ms** vs same-session warm
  16 438–18 695 ms = **1.46–1.56×**; the *second* clone run was slower than the first, so
  cache-coldness is not even the dominant term (new-tree/Defender scanning is).

- **D-27:** **Restore all FOUR method elements NEST-01 names — clone depth, cache state, Defender
  state, RUNNER — and state that depth has exactly ONE admissible value.** The draft dropped
  "runner" and softened "clone depth" to "clone method". A depth-1 clone fatals `readAtClose()`
  per SWEEP-01, so **full / `fetch-depth: 0` is the only measurable subject**. Add **tree identity**
  as a declared variable (D-15/D-16). Declare `--verbose` or not: the recorded 19 s was a
  `--verbose` run and the draft declared neither.

- **D-28:** **Threshold is a ratio at ≥8×, and the absolute ceiling is DROPPED.** The draft's 4× is
  **refuted by the project's own only cold-vs-warm data** — `141-CONTEXT.md:210-212`:
  `check-phase-60` 63 001 ms cold vs 9 336–12 435 warm = **6.8×**, `check-phase-48` 1 951/340 =
  **5.74×**, both above the proposed cap — and was derived from a **warm-vs-warm** spread
  (machine idleness, not coldness) in the contaminated session. Set it at **≥8× a declared
  same-tree, same-session warm median (n≥3)**. Drop "≤50 % of the 30-minute CI cap": it binds a
  **Windows** measurement to a **Linux** job cap on a runner class that does not exist
  (`[MEASURED]` **198/198 `runs-on: ubuntu-latest`**, zero Windows; and the caps are 15 ×66,
  30 ×31, 60 ×1 — not one object), and at ~55× warm it is inert anyway.
  **The bound must specify the denominator's quiescence attestation, n, and tie-break** — without
  them the ratio is load-invariant by construction, and the demonstrated lever is 1.4× with no code
  change.

- **D-29:** **Mechanism X is two-tier, and the timeout raise is WITHDRAWN.** The draft's citation
  inverted its source: `138-04-PLAN.md:157` says the per-subprocess budgets "**must not be
  edited**; **only the workflow-level timeout in the new workflow** was ever a free authoring
  choice", and `check-phase-138.mjs:68-73` calls them "copied forward unchanged" and "the sole
  coupling point" with this very item. Independently, **a timeout raise moves zero wall-clock cost**
  and can never satisfy a *cost* threshold — the three inherited options were authored for
  `WINDOWS-CLONE-DEEPNEST-**TIMEOUT**-01`, a stall item, and NEST-01 reframed it as cost.
  Corrected X: **(i) in-phase and executable** — publish the per-child marginal-cost table, name
  the children exceeding their share, record the disposition as ADVISORY-RECORDED; **(ii)
  structural, named with its owner** — the frozen-aware `harness-run` checkout, explicitly
  attributed to **CARVE-1/SWEEP-01 (Phases 139–144)** and **not** double-booked into Phase 142.
  Never `CHAIN_SKIP` (correct — though `V-138-SELF` constrains only 138's own).

- **D-30:** **Advisory, and that does NOT breach the milestone bar.** `REQUIREMENTS.md:6` /
  `ROADMAP.md:212` name exactly `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED` as the two
  dispositions to delete — **`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` is not one of them**. Cite **D-10**
  (`138-04-PLAN.md:155`, `138-04-SUMMARY.md:113`), **not** the `T-138-23` threat row. State
  explicitly that no Windows runner exists, so a planner does not try to wire a Windows gate into CI.

- **D-31:** **DO NOT re-measure `check-phase-64` — the answer is already recorded and it is "no".**
  `141-EVIDENCE.md:288` carries the post-Plan-04 series 60→66:
  5 755 / 12 547 / 24 576 / 46 129 / **94 794** / 194 372 / **386 235 ms**, re-confirmed within 3 %
  (`cp-63` 43 353, `cp-64` **91 710**, `cp-65` 168 489 ms, all exit 0). `check-phase-64` is
  **30.6 % of the 300 000 ms cap** — not a crossing candidate. The real crossing member is
  **`check-phase-66` at 386 235 ms**, already over cap as a non-peer child of `check-phase-67`.
  The draft carried D-17's *pre-fix* framing forward and proposed re-spending 92 s to re-derive a
  known answer. Record `check-phase-66` instead, for free.

- **D-32:** **Name the CI cold clone that already gates.** Every CI job runs `actions/checkout@v4`
  at `fetch-depth: 0` onto a fresh runner — a genuine cold clone, on the enforcing runner class, on
  the OS D-03 makes sole-authoritative. Phase 141's fan-out already produced 41 green jobs whose
  per-job wall-clocks are retrievable from `gh run view --json jobs` (`startedAt`/`completedAt`).
  D-22 says it outright: "CI is always a cold clone, so the cold column is operative there."

### Document amendments (OWNER-RATIFIED 2026-08-10)

- **D-33:** **Use BOTH Phase-141 marker shapes, on THREE surfaces, and back-fill the CARVE list.**
  `**[DISCHARGED, D-NN]**` where a criterion is met as written; `**[SUCCESS-CRITERION AMENDMENT,
  D-NN]**` where the mechanism is withdrawn. The `~17 s`/`+0.35 s` figures live on **seven**
  surfaces — ROADMAP Phase 142 SC#3 and SC#5, `REQUIREMENTS.md:46`, `:69`, `STATE.md:129-131`,
  `:305`, `PROJECT.md:954` — and `STATE.md:126-136` is a **third verbatim copy** of the criteria;
  the draft's instrument named only two documents. **Additionally: add a bullet per amendment to
  `v1.20-CARVE.md`'s "Recorded scope amendments" and back-fill Phase 141's missing D-27/D-28 in the
  same commit** — `[MEASURED]` `grep -c "D-28" v1.20-CARVE.md` = **0**, so the "these four
  amendments … Phase 144's close-gate must read each as authorized scope, not as drift" list is
  **already stale**. Phase 144's close-gate reads that list, not the in-line markers.

- **D-34:** **`STATE.md`'s Phase-142 row is CLEAN** (`:217` = `| 142 | RED-04, RED-05, RED-06,
  RED-07, NEST-01 | 5 |`; `:122-143` all five present) — Phase 141's D-28 silent-drop defect does
  **not** recur. Verified, not assumed.

- **D-35:** **V-30-02 gets a SUCCESS-CRITERION AMENDMENT extending RED-04. (OWNER-RATIFIED)**
  `[MEASURED]` `check-phase-30.mjs:70` is
  `new RegExp("```mermaid\n([\s\S]*?)\n```", "g")` — in a **double-quoted** JS string `\s`/`\S`
  are not escapes and collapse to literal `s`/`S`, compiling the class as `[sS]`. Replayed against
  `git show v1.3:docs/decision-trees/00-initial-triage.md` (the Mermaid-era file it was written
  for): buggy regex **0** blocks, correct regex **1**. `blockText` has always been `''`, so
  **V-30-02 has never inspected a single Mermaid block since Phase 30** — and its target file has
  carried no Mermaid fence since Phase 122, so it is doubly vacuous. It sits in the "10 PASS"
  column and is invisible to any run-and-count method. RED-04 as worded ("exits 0 standalone") is
  already satisfied *vacuously*, so an amendment — not a bug fix — is the instrument. **A milestone
  whose stated purpose is deleting vacuous passes cannot knowingly ship one in its own edit target.**

### Recorded method failures — carry these, do not repeat them

- **D-36:** **This phase's own draft produced SIX bad `[MEASURED]` rows, after Phase 141's D-31
  warned about exactly this class — the fifth consecutive recurrence.** The root cause was new:
  **undeclared tree identity**. The draft measured the apex in a clone tree and the standalone
  validators cold, then compared them against warm main-tree figures without declaring either.
  `[MEASURED]` the same code at the same SHA yields **16.8 s** (main) and **27.9 s** (clone) on one
  machine. **Declare tree, cache, load, Defender, node version, and n — every time.** A ledger
  whose arithmetic is internally consistent (`2.664 + 4.450 = 7.114`) is not thereby correct.

- **D-37:** **Adversarial review reversed six recommendations and disproved six of its own Finders'
  findings.** Two Finder claims that looked decisive were **strawmen and were correctly rejected**:
  the "non-apex adoption is not inert" refutation (it injected a plain check, not a `CHAIN_PHASES`
  entry) and the "19 line-range pins" refutation (all 19 are comments; the project's ratified
  definition of "pin" is a `String.includes()` assertion). The Referee also **overruled the
  Adversary once**, on a CRLF measurement. Findings are not true because they are confident.

### Claude's Discretion

- Plan/atom decomposition, subject to D-19's commit sequence, D-12's adoption-last rule, and
  D-18's ledger-row-before-edit rule.
- Exact wording of the successor assertions in D-04/D-07/D-08, and of the new classifier arm in
  D-13, subject to `V-68-04`/`V-68-08` substring presence surviving.
- The re-derived band arithmetic in D-24(b), subject to the ±15%-per-endpoint rule reconciling.
- Whether the 8 pass-worded `detail` strings (`check-phase-31.mjs:47,53,56,59,74,83,95,119`) are
  fixed opportunistically where the check is already being rewritten (V-31-25 is one of them) or
  recorded wholesale.
- Evidence-artifact format for the NEST-01 measurement and the per-child marginal-cost table.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements, roadmap, governance
- `.planning/REQUIREMENTS.md` — RED-04/05/06/07 at `:35-38`; the RED-06 rationale at `:46`; the
  RED-07 guardrail at `:48`; **NEST-01 at `:67`** and its "Scoped cold-clone-only" note at `:69`;
  **HARN-18 at `:83`**; the milestone bar at `:6` (the two dispositions are
  `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED` — NEST-01's item is **not** one of them);
  the `V14`-does-not-serve-30/31 paragraph at `:78`; existing
  `[SUCCESS-CRITERION AMENDMENT]` markers at `:16,17,18,20,24`
- `.planning/ROADMAP.md` §"Phase 142" — SC#1–SC#5 and the "Discuss-phase flags" fork; §"Phase 144"
  SC#2 (which **already** carries the RED-06 hand-off: "accounting for RED-06's addition of
  `check-phase-30`/`check-phase-31` to the chain") and SC#3 (the fresh `--no-hardlinks` 3-axis
  re-audit), plus `:208`'s no-batching rule and `:212`'s disposition list
- `.planning/PROJECT.md` `:25` and `:954` — the `[48..138]` drafting error and the `~17s` figure
- `.planning/STATE.md` `:217` (Phase-142 row, verified clean), `:122-143`, and **`:126-136`** (the
  third verbatim copy of the criteria), `:129-131`, `:305`
- `.planning/milestones/v1.20-CARVE.md` — **Category 5 `:178-197`** (lists `check-phase-30.mjs` and
  `check-phase-31.mjs`; **`check-phase-138.mjs` is ABSENT**), D-09 amendment procedure `:64-77`
  (rule 1: the commit touches only this file), **D-10 `:79-81`** (hard-block, no warn-and-continue),
  **D-12 `:93-113`** (target-scoped path-string grep + ledger row), `:100-104` (the ratified
  definition of "pin"), `:114-117` (**"Recorded scope amendments" — already stale, 0 D-28 hits**),
  and `:36`/`:46-51` (`IN_SCOPE_PREFIXES`, `.planning/` excluded)
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` `:22-24` (row schema), `:47` (live row showing
  `carve-gate.mjs` in the gate column, 42/42 at Phase 141 Plan 03)
- `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-CONTEXT.md` — **D-22
  `:210-215`** (the project's only cold-vs-warm ratios, 6.8× and 5.74×), D-19 (no new wall-clock
  bound), D-31 (the bad-figure class), D-32 (the exponential law), and the `<deferred>` block
  `:464-486` assigning class (d), `check-phase-64`, and the standalone-cost gap to this phase
- `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-EVIDENCE.md` —
  **`:255-263` Mandatory statement 1** (a nested/apex run is evidence for no part of SC#2/SC#3),
  **`:276-281` Mandatory statement 2** (the `+0.35 s / ~17 s` grandfather clause), **`:288`** (the
  60→66 series that already answers the `check-phase-64` question)

### The RED-04/RED-05 subjects
- `scripts/validation/check-phase-30.mjs` — `:45` (unescaped-dot regex bug), **`:52-61` V-30-01**,
  **`:63-78` V-30-02 (the `[sS]` vacuous pass)**, `:70` (the defective regex), `:123` (the zero-file
  guard `check-phase-31` lacks), **`:186-193` V-30-10** (`content.includes`, substring anywhere),
  `:252-253` (`type:"external", required: true`), `:269-282` (the npx spawns and the `isMissing`
  classifier), `:303-337` (the runner, and the target of 19 provenance comments), `:328-334` (the
  `--quick` skip block `check-phase-31` drops)
- `scripts/validation/check-phase-31.mjs` — `:10` (the `archive-path` import V-68-04 requires),
  `:27` (the correct escaped regex), **`:32-42` `parseInventory()` + the `_missing` discriminator
  V-68-08 requires**, `:33` (the `resolveArchivedPhasePath` call — *inside* the function, not
  reusable), `:110` (V-31-22, no zero-file guard), **`:112-113` V-31-23** (the `lines[181]` index
  and the "line 182" name string), **`:118-119` V-31-25** (anchored regex + the hardcoded
  `detail: "enum present"`), **`:129-131` V-31-29** (the `split('\n')` metric and the bounds),
  `:133-134` (V-31-30, `required:false` + the npx spawn), `:137` (**the FALSE "inherited verbatim
  from Phase 30, lines 303-337" comment**), `:141` (the `--quick` filter with no skip accounting),
  and the 8 pass-worded details at `:47,53,56,59,74,83,95,119`
- `scripts/validation/_lib/archive-path.mjs` `:19` — `resolveArchivedPhasePath(phaseSuffix,
  milestoneRoots = ['v1.5-phases'])`; `['v1.3-phases']` is required for both Phase-31 fixtures

### The corpus the assertions read (READ ONLY — zero edits)
- `docs/decision-trees/07-ios-triage.md` — `:33` (`**LOCKED — 23 (nodes + labeled edges)**` and the
  "All 3 diamonds (IOS1, IOS2, IOS3)" sentence), `:37`, the Routing Verification table, `:81` (the
  Phase-122 Version History row recording the conversion)
- `docs/_templates/l1-template.md` `:12-13` (the author-guidance enum
  `Valid values: Windows | macOS | iOS | Android | Linux | all`) and `:27` (`platform: all`);
  `docs/_templates/l2-template.md` `:12-13`, `:28` — **both OFF the CARVE allowlist**
- `docs/admin-setup-ios/06-compliance-policy.md` — **`:259`** (the D-23 prose, under
  `### iOS-Specific Timing Considerations` at `:256`) and `:180` (`### Step 3: Configure Actions
  for Noncompliance`, where line 182 used to sit)
- `docs/l2-runbooks/14-ios-log-collection.md` — 215 lines by `wc -l`, 216 by `split('\n')`
- `.planning/milestones/v1.3-phases/31-ios-l2-investigation/expected-d23.txt` — the fixture;
  **`31-VALIDATION.md:69`** — the `wc -l` mandate and the four target BANDS;
  `31-CONTEXT.md:149,151,265` — the D-23 decision and its line-182 mapping row
- `docs/_standards/EEE-SOP-standard.md` — **STD-04 at `:402`**, D-02 `:424-429` (C17 #1 stays a
  hard-fail), **D-03 `:431-440`** (conversion shapes; the `LOCKED — N leaves` pattern),
  D-04 `:452-458` (a green C17 cannot verify the table preserved every node/edge)

### The apex, the guard, and CI
- `scripts/validation/check-phase-138.mjs` — `:68-73` (**the per-subprocess budgets: "copied
  forward unchanged", "the sole coupling point" with the cold-clone item**), `:104-106`
  (`CHAIN_START`/`CHAIN_END`/the arithmetic `Array.from`), `:112-126` (the three module-load
  guards — only `:120` throws for a widened span), `:156` (`NESTED`), `:157-197` (the chain loop;
  `:167-171` HAZARD FIX 3, absent-child = FAIL; `:174` the unconditional
  `CHECK_PHASE_NESTED: '1'`), `:226-241` (`V-138-SELF`, `CHAIN_SKIP` empty)
- `scripts/validation/check-phase-68.mjs` `:97-115` (**V-68-04, a floor over 5 call-sites**) and
  `:166-180` (**V-68-08, whole-file `_missing`**)
- `scripts/validation/check-phase-60.mjs:43` and `check-phase-62.mjs:52` — the **non-contiguous
  hand-authored `CHAIN_PHASES` precedent** (both skip 50)
- `scripts/validation/carve-gate.mjs` `:36` (`IN_SCOPE_PREFIXES`), `:43`/`:55` (the exported
  helpers), `:445` (`main()` at module scope — importing the helpers exits the process)
- `scripts/validation/c17-eee-contract.mjs` `:202-209` (**the intentional fence-masking that makes
  assertion #1 bypassable**), `:334-342` (assertion #10, unconditional on all 234 enrolled files)
- `.github/workflows/audit-harness-v1.19-integrity.yml` `:11` (the DUAL-APEX note), `:85-104`
  (`linux-chain-ubuntu-latest`, `fetch-depth: 0`, `timeout-minutes: 30`), `:147-159` (the standalone
  `check-phase-138` job), `:173` (the `npm install -g markdown-link-check` that lives **only** in
  the cron-gated quarterly job), and `:26` + 12 sibling files (**the `check-phase-*.mjs`
  `pull_request.paths` filters — a 13-workflow cascade on the close PR**)
- `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` — the `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` section
  (the three remediation options and the "distinct, must not be re-collapsed" rule at `:252`)
- `.planning/milestones/v1.19-phases/138-.../138-04-PLAN.md` **`:155`** (the D-10 advisory ruling),
  **`:157`** (**budgets must not be edited; only the workflow-level timeout was free**), `:228`
  (`T-138-23`, the threat row — *not* the governing ruling); `138-04-SUMMARY.md` `:113` and
  `:287-289` (**the 14 s same-session warm apex that dissolves the cold-clone "contradiction"**),
  `:276` (the 19 s figure was a `--verbose` run)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `resolveArchivedPhasePath(suffix, ['v1.3-phases'])` — already proven in-file at
  `check-phase-31.mjs:33` for `placeholder-inventory.json` (V-31-21/V-31-24 pass on it). V-31-23
  needs its own call site, not a reuse of that one.
- `check-phase-30.mjs:123`'s zero-file guard (`if (files.length === 0) return { pass: false … }`)
  — the shape `check-phase-31.mjs:110`'s V-31-22 is missing.
- `check-phase-30.mjs:328-334`'s `--quick` skip-accounting block — the shape `check-phase-31.mjs:141`
  is missing, which is why `-31 --quick` reports 29 of 30 checks.
- The Phase-141 `[SUCCESS-CRITERION AMENDMENT, D-NN]` / `[DISCHARGED, D-NN]` marker pair, in use
  four times at `REQUIREMENTS.md:16,17,18,20,24` and three-plus-one times on the ROADMAP side.
- `v1.20-GOV-02-LEDGER.md:47` — the live row showing the exact grep + regression-gate column format.

### Established Patterns
- Apex `CHAIN_PHASES` is arithmetic-generated over a contiguous `[48..N-1]` span behind three
  module-load throws; **non-apex** chain validators carry hand-authored, sometimes non-contiguous
  literals. The arithmetic doctrine (D-29 of Phase 138) is apex-specific.
- Every `CHAIN_PHASES`-generated check carries its NESTED short-circuit **inside its own `run()`** —
  so the guard is per-check, not per-process. A non-chain-guard check added to a chain member does
  execute under NESTED; a `CHAIN_PHASES` entry does not.
- Audit-trail and provenance comments are asserted for existence only, never accuracy — and
  `check-phase-31.mjs:137` proves at least one is outright false while
  `v1.19-milestone-audit.mjs:59`'s equivalent is genuinely verbatim. There is no way to tell
  without diffing.
- `execFileSync('npx', …)` cannot run a `.cmd` shim on Windows without `shell: true`, so every npx
  spawn in this tree is ENOENT-dead on Windows and live on Linux — a silent platform divergence in
  the only two validators that spawn one.

### Integration Points
- The apex is the RED-06 target and is **off the CARVE allowlist** — governance precedes code.
- `check-phase-68` is the RED-07 guard; its baseline (33/0/0) is recorded and both predicates are
  satisfied by margin.
- 13 of 16 workflows carry `check-phase-*.mjs` `pull_request.paths` filters, so every edit here
  fans out to a 13-run cascade on Phase 144's close PR.
- `check-phase-30`/`-31` have **zero** CI jobs today; adoption into the apex is what makes them
  execute in CI at all — on `ubuntu-latest`, where D-13's classifier defect fires.

</code_context>

<specifics>
## Specific Ideas

- The owner directed that gray areas be resolved by `/grill-me` followed by `/adversarial-review`,
  with each question's options scored and a best option recommended with reasoning. That process
  produced this document — and **reversed six of the draft's recommendations**, including its
  headline attack on a ratified success criterion that turned out to be correct.
- Owner ratifications, 2026-08-10: (1) V-30-02 gets a SUCCESS-CRITERION AMENDMENT extending RED-04,
  the other six uncovered defects get routed deferral rows; (2) repair the `isMissing` classifier,
  then adopt; (3) correct `[48..138]` → `[48..143]` at all three ratified sites now; (4) V-31-29
  gets the Area-1 superseded-assertion instrument (metric fix + band re-derivation), not a bound
  widening.
- Standing project rule, and it held a third milestone running: *a corpus edit requires proof the
  document is wrong, not merely that a frozen assertion disagrees with it.* **Zero corpus edits.**
  Every failure resolves in the validators.
- Method warning for the planner, now earned five milestones running (D-36): **declare tree
  identity**, not just cache state. The same code at the same SHA measured 16.8 s in the main tree
  and 27.9 s in a clone. Six of this draft's `[MEASURED]` rows died on that one undeclared variable,
  and their arithmetic was internally consistent throughout.
- Counter-warning, equally earned (D-37): two confident adversarial findings were **strawmen** and
  the Referee overruled the Adversary once on a measurement. Verify refutations as hard as claims.

</specifics>

<deferred>
## Deferred Ideas

**Routing rule (owner-ratified):** every item below gets a row in one named destination file, cited
by the plan. Phase 141's discipline stands — an unrouted deferral is itself the defect.

- **`check-phase-31 --quick` silently loses a check** — `activeChecks` filters `type!=='external'`
  with no skip-accounting, so `-31 --quick` reports 29 of 30. Inside a file this phase edits, and
  its `:137` "inherited verbatim from Phase 30" comment is provably false (968 B/15 lines vs
  1 307 B/35 lines). No requirement covers it.
- **Eight `check-phase-31` checks print a positive `detail` on FAIL** (`:47,53,56,59,74,83,95,119`)
  — live output reads `V-31-25: … FAIL` / `-> enum present`. Fix opportunistically only where the
  check is already being rewritten; record the rest.
- **`V-31-22` has no zero-file guard** (`bad = []` → PASS if all six L1 files vanish).
- **`check-phase-30.mjs:45`'s unescaped-dot regex** (`'-ios-.*\.md$'` compiles to `.md$`);
  `check-phase-31.mjs:27` has the correct `'\\.md$'`.
- **`carve-gate.mjs:445` calls `main()` at module scope with no import guard**, and `main()` calls
  `process.exit` — importing the exported helpers kills the importing process. Relevant because
  this phase's verification will want to replay the allowlist.
- **The dead `required:` metadata** — never read by either runner; `check-phase-30` has **0**
  occurrences (the draft's "same in check-phase-30" was false), `check-phase-31` has 2 (V-31-29 and
  **V-31-30**, the latter being the check the withdrawn NESTED-skip proposal would have made
  permanently inert).
- **The 13-workflow `pull_request.paths` cascade** — every edit here fans out on Phase 144's close
  PR. No Phase-142 requirement covers it; it lands on HARN-19's bar. Record as a named Phase-144
  verification input, with Phase 141's 41/41 fan-out as the precedent for reading it.
- **`HARN-18` and `PROJECT.md:25`'s `[48..138]`** — corrected here per D-25, but the *consequence*
  (Phase 144 must author `check-phase-144` with `CHAIN_END = 143`, 96 entries) belongs in Phase
  144's CONTEXT as a named input.
- **`check-phase-66` at 386 235 ms is over the 300 000 ms cap as a non-peer child of
  `check-phase-67`** (D-31) — the real crossing candidate, replacing the `check-phase-64` item
  Phase 141 handed here. Not owned by any requirement.
- **The unowned non-nested standalone-chain cost** — NEST-01 covers only the *apex* cold-clone
  curve, and `v1.19-DEFERRED-CLEANUP.md` forbids re-collapsing the two. Still unowned after this
  phase; needs its own requirement.
- **`audit-harness-v1.7-integrity.yml:95`'s stale `~102s` Windows reference** — carried from Phase
  141, still unfixed. Hygiene; fold into Phase 144's workflow work.
- **Seven stale `.claude/worktrees/agent-*/` copies of `check-phase-31.mjs`** carrying the pre-fix
  path — a working-tree hazard that will make any post-edit verification grep report the defect
  still present. Not a repo defect (untracked).

</deferred>

---

*Phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold*
*Context gathered: 2026-08-10*
