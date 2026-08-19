# Phase 140: Frozen-Aware Harness Conversion - Context

**Gathered:** 2026-08-06
**Status:** Ready for planning

<domain>
## Phase Boundary

The milestone's conversion layer. Each frozen milestone-audit harness reads its own corpus
at its own close SHA instead of live HEAD, resolving the frozen-vs-evolved mismatch class at
its root and within the `check-phase-60` subprocess budget. This phase also lands the `V14`
pin and the `TEMPLATE-SENTINEL` remedy.

**No corpus content is authored or edited.** Zero corpus edits are required — the measured
evidence below shows every in-scope assertion is satisfiable by choosing the right frozen SHA
and by two harness-source changes.
Requirements in scope: SWEEP-05, SWEEP-06, SWEEP-07, SWEEP-08.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` codebase interrogation followed by a scored `/adversarial-review`
(5 parallel Finders → Adversary → Referee). 70 findings raised (491 Finder points), 9 disproved,
61 confirmed. The review **reversed the V14 SHA choice outright**, corrected two of the draft's
own performance measurements, and converted one open fork into a locked decision. Every
`[MEASURED]` figure was executed against live code at HEAD on 2026-08-06; the load-bearing
result (D-19) was re-executed a fifth time by the orchestrator directly.

### Ground truth established by interrogation

**Failure ledger — 11 of 17 harnesses are RED.** v1.4 (C4 + C5×2), v1.4.1 (C4 + C5),
v1.5–v1.13 ×9 (C5 + C10). v1.14–v1.19 are green at live HEAD. `[MEASURED]` by real exit codes.

**The conversion premise HOLDS.** At every close SHA v1.5→v1.13 both freshness-scoped glossaries
read `2026-05-05` / `2026-07-04` = exactly 60 days against a `> 60` test → PASS; live reads
`2026-06-29` / `2026-09-27` = 90 → FAIL. Verified across the full 32-file C5 scope and 17-file
C10 scope at all 12 pinned SHAs, not a 2-file sample. Faithful conversion prototypes go
**v1.5 12/12, v1.14 15/15, v1.16 16/16, v1.18 16/16**.

### The read mechanism (SWEEP-05, SWEEP-06)

- **D-01:** Convert **all three** read chokepoints per harness, not two — `readFile(relPath)`,
  `walkMd(dir)`, and the bare `existsSync(join(process.cwd(), p))` guards that gate path-set
  membership. A converted `readFile` behind a live-HEAD membership guard is a hybrid that is
  neither frozen nor live and fails silently toward under-auditing. — **Reversibility:** costly —
  the guards decide which assertions run at all.

- **D-02:** The chokepoint census is **per-harness, not v1.13-shaped**. `[MEASURED]` guard counts
  are 1 (v1.4, v1.4.1), 2 (v1.5), 4 (v1.6–v1.14), 5 (v1.15–v1.19); `readFile` sits at `:29 / :43 /
  :50 / :53` and `walkMd` at `:36 / :50 / :57 / :60` across those four families. A plan keyed to
  the v1.13 coordinates `:100/:113/:161/:212` mis-targets 7 of 17 files. The fifth guard in
  v1.15–v1.19 is the C17 contract-presence guard at `:827` and is in scope.

- **D-03:** The loader is a **batched prefetch** — one `git cat-file --batch` over the enumerated
  scope, memoized per `(sha, repo-relative path)`. Chosen on **margin and determinism only**. The
  draft's disqualifier for per-file `readAtClose` was **fabricated and is withdrawn**: `[MEASURED]`
  per-file `git show` is ~40 ms/spawn (37 ms warm, 112 ms cold — the draft's 213 ms was a single
  contended outlier, and Phase 139 D-40's ~75 ms was closer), and a whole converted harness under
  the per-file option runs in **1.7–11.8 s against a 60 s budget**. Batch is ~157 ms for 218 blobs.
  Both options fit; batch is picked for headroom, not necessity.

- **D-04:** Parse `cat-file --batch` output on **Buffer offsets, never decoded-string offsets**.
  This is a ruling, not an implementation detail. `[MEASURED]` the frame is
  `<sha> <type> <size>\n<content>\n` where `size` is **bytes**; this corpus is saturated with
  em-dashes, so `docs/_glossary-android.md` is 29528 bytes vs 29438 JS string length. Naive
  string slicing desynchronizes at the first multibyte character and corrupts **every** subsequent
  file — measured 0 of 6 files parsed correctly. Byte-fidelity vs `git show` is 10/10 when parsed
  on Buffer offsets.

- **D-05:** Enumeration runs **before** any batch read, via `lsTreeAtClose`. This ordering is what
  makes the whole design safe, and it is why three CRITICAL findings against it were disproved.
  `[MEASURED]` on a real `file://` shallow clone, `lsTreeAtV15Close('docs')` throws
  `frozenCause=unreachable-sha` before a single blob is requested. `cat-file --batch` cannot
  discriminate — it exits 0 and emits the identical token `missing` for both absent-path and
  unreachable-SHA — but it never gets the chance to.

- **D-06:** Frozen `readFile` returns **`null` for absent-at-a-reachable-SHA and throws for
  unreachable-SHA**. `[MEASURED]` this produces **zero** null returns across five faithfully
  converted harnesses, because under D-01 the scope is tree-derived and every enumerated path
  exists at the SHA. The feared vacuous-PASS cascade has no instance. Note the honest correction:
  the `frozenCause` classifier earns its keep at the **enumeration** boundary (D-05), not per-file —
  the draft's original justification for this decision was hollow even though the decision is right.

- **D-07:** The **sidecar read must fail loud** when its blob is absent at the pinned SHA. This is
  the one frozen read not derived from the enumerated tree, and `parseAllowlist()` currently
  degrades to `{safetynet_exemptions: [], supervision_exemptions: []}` with no diagnostic.
  `[MEASURED]` the consequence is real and actively misleading: at `3c3a140` / `13d2c883` /
  `5355b3b9` the v1.4 sidecar path does not exist, and the harness reports `C2 FAIL -- 45` that
  reads as content drift when it is entirely "the allowlist was never loaded." Degradation is
  toward more violations, so it cannot manufacture a vacuous pass — but it can and did send a SHA
  search down a false trail.

- **D-08:** `check-phase-60`'s subprocess budget **stays 60 000**; it is not raised to the peers'
  300 000. Raising a ceiling to make a requirement pass is the masking class this milestone
  deletes, and D-03 leaves ~5× headroom. Recorded corrections: there are **three** timeouts in
  that file — `:193` (30 000, pin-helper self-test), `:239` (60 000, the V-60-12..22 loop spawning
  other check-phases), `:261` (60 000, the harness spawn) — and **only `:261` is SWEEP-06's
  subject**. `V-68-11` covers 62–66 only, so 60 000 is unpinned and editable; we decline to edit it.

- **D-09:** Record that **the apex cannot evidence SWEEP-06**. `[MEASURED]` both `check-phase-60`
  spawn sites and all seven `V-NN-AUDIT-HARNESS` blocks are `NESTED`-guarded
  (`if (NESTED) return { pass: true, skipped: true }`), so no converted harness ever executes under
  the apex — the apex can neither validate nor detect a broken conversion. The 60 s contract binds
  only a standalone `check-phase-60` run, and standalone `check-phase-60` is RED until Phase 141
  RED-03. SC#2 therefore cannot be evidenced end-to-end inside Phase 140; the plan must state its
  evidence path explicitly rather than leaning on "apex 93/0/0."

### The sidecar — closed, not an open fork (SWEEP-05)

- **D-10:** The audit-allowlist sidecar reads **frozen, with the corpus, at the same SHA**. This is
  **LOCKED, not a fork** — presenting it as open was itself the defect. `[MEASURED]` under the
  live-sidecar hybrid, v1.14 goes 12/3, v1.16 goes 13/3, and — the row nobody predicted — **v1.5
  goes 9/3**, destroying the v1.5–v1.13 conversion premise that is Phase 141 RED-01's load-bearing
  input. Under the frozen sidecar all four are green.
  — **Reversibility:** one-way in practice — reversing it re-reds the milestone's own premise.

- **D-11:** The rationale is **"correct-by-maintenance, verified per-harness"**, never
  "self-consistent by construction." That phrasing was empirically false. `[MEASURED]` census of
  pin-vs-frozen-content alignment: v1.4 stale=17 of 22; v1.4.1 and v1.5–v1.15 stale=0; v1.16/v1.17/
  v1.18 stale=4 of 30. The frozen sidecars are themselves drift-compensated pins — their own
  `reason` strings read "Phase 62 carry-over: line 185 shifted +1" — so alignment is a maintained
  property, not a structural one, and must be verified per harness at plan time.

- **D-12:** Record that TOOL-04's live re-pin becomes **inert for converted harnesses**, and that
  this is a **two-sources-of-truth split with Phase 141 RED-02** — `regenerate-supervision-pins.mjs`
  reads and writes the LIVE sidecar, which after D-10 no harness consumes. Also record the
  supporting precedent the draft missed: `check-phase-67.mjs:38` already reads the v1.7 sidecar
  frozen. And the inversion: `check-phase-62`, `-65` (V-65-13) and `-66` (V-66-02) assert on the
  LIVE sidecar while the harness reads frozen. `[MEASURED]` "coordinate-only" is false — v1.4's
  sidecar went 18 → 26 supervision entries, v1.5's 20 → 26; freezing reverts semantic content,
  not just coordinates.

### Conversion scope (SWEEP-05)

- **D-13:** Convert **v1.4 through v1.18 (16 harnesses)** in Phase 140. The v1.19 harness converts
  in Phase 144 in the same plan that lands its `V119` pin, because `MILESTONE_CLOSE_SHAS` has no
  `V119` and that pin is HARN-17. Reachability was never the blocker — `a7bda73e…` is reachable
  today (the CARVE gate resolves it as its own base).

- **D-14:** D-13 requires **three** recorded amendments, not one, and the draft named only the
  first. (a) SWEEP-05's "v1.4–v1.19" wording; (b) **ROADMAP.md Phase 140 SC#1**, a ratified
  per-phase criterion carrying the same range, which the draft never cited; (c) the
  `REQUIREMENTS.md` traceability row `| SWEEP-05 | Phase 140 | Pending |`, which must change so
  SWEEP-05 cannot be marked Validated at Phase 140 with v1.19 unconverted.

- **D-15:** Drop the asymmetric use of the no-batching rule. The convention itself **is** cited —
  `ROADMAP.md:178` and `:191` name the seven predecessors (100/112/119/125/128/134/138) verbatim,
  so "seven consecutive milestones" is correct and the challenge to it fails. But the draft applied
  it as a veto against landing `V119` early while option D-13 pushes Phase-140 work **into** Phase
  144 — which is the batching the rule prohibits. Phase 144's plan must own that, and must also
  resolve HARN-18's undecided **fork-vs-convert ordering** (fork-before-convert and
  fork-after-convert produce different v1.20 harnesses; `REQUIREMENTS.md` Out of Scope bars a
  frozen-aware v1.20 harness on V120 circularity).

- **D-16:** Convert the already-green v1.14–v1.18 too, but with the **cause stated correctly**.
  They are not green "because no later milestone has drifted their assertions" — `[MEASURED]` the
  corpus has drifted heavily; they are green because Phase 133 TOOL-04 re-pinned their sidecars to
  live coordinates. Conversion removes live-HEAD coupling; it does not repair today's red.
  Conversion of this group is conditional on D-10 — under a live sidecar three of them go red.

- **D-17:** v1.4.1 is **in scope** (`V141` = `5c976ec` already pinned; "v1.4–v1.19" reads inclusive).

- **D-18:** Bound and state the **coverage each conversion drops**, per harness. `[MEASURED]`
  v1.4's scope is 33 files live and 33 frozen — **identical sets, zero files exit coverage** (the
  draft-era claim of "282 → 179, 103 files exit" was fabricated and is withdrawn). v1.5 genuinely
  drops 64 live-only `.md`, and the gap widens with pin age. D-01's own under-auditing argument
  must be reconciled with this rather than left to imply the phase increases fidelity.

### V14 pin (SWEEP-08) — REVERSED from the draft

- **D-19:** Pin **`V14 = 0b3be9ab`**, not `b5cf529`. This is the phase's load-bearing decision and
  it reverses the draft outright. `[MEASURED]`, orchestrator-verified by full conversion against
  the frozen tree:

  | SHA | converted v1.4 result |
  |---|---|
  | `b5cf529` (roadmap candidate) | 3 passed, 2 failed — **C2 FAIL 33**, C5 FAIL 1 |
  | `671f72a` (roadmap candidate) | 3 passed, 2 failed — **C2 FAIL 33**, C5 FAIL 1 |
  | `3c3a140` / `13d2c883` / `5355b3b9` | C2 FAIL 45 — sidecar absent, see D-07 |
  | **`0b3be9ab`** | **4 passed, 1 failed** (sole failure = TEMPLATE-SENTINEL) |
  | **`0b3be9ab` + SWEEP-07** | **5 passed, 0 failed, 0 skipped** |

  Root cause of the candidates' failure: the v1.4 sidecar's supervision pins were generated at
  `4f41431a` (2026-04-24 15:43) and the v1.4-scope corpus then drifted through Phases 44–47 — all
  v1.4.1 work — without a re-pin. Both roadmap candidates sit ~30 h downstream of the last SHA
  where pins matched corpus. The viable window is `2574c794`…`ba9ecd87`; `0b3be9ab` is its terminal
  Phase-43 commit ("validation audit — 4 predicate fixes, 27/27 green"), making it the defensible
  **v1.4 audit-close state**. Runner-up `8a1d41aa`.
  — **Reversibility:** one-way — the pin is a frozen surface consumed by every later phase.

- **D-20:** Record the rationale **honestly and in these terms**: no `MILESTONE CLOSE`-token
  discriminator exists for v1.4 — `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.4/ && $2 ~
  /MILESTONE CLOSE/'` returns **empty** — so the V117/V118 subject-line method does not apply and
  must not be implied. The pin is chosen as the state the v1.4 sidecar's line-pins were generated
  against, and both roadmap candidates were **tested and rejected on measured evidence**. Do not
  repeat the draft's "closest analog to the V114–V118 close-gate semantic" claim: those subjects all
  read `docs(NN-NN): … MILESTONE-AUDIT … MILESTONE CLOSE`, and no v1.4-era candidate resembles them.

- **D-21:** `V14` is an **audit-close pin, and `.planning/*` reads at V14 are barred**. No single
  SHA satisfies both axes: v1.4's own `.planning/REQUIREMENTS.md` was deleted at `5355b3b9`, so at
  any harness-green SHA it reads `# Requirements: v1.4.1 …`. If a future validator ever needs v1.4's
  planning docs, add a second entry `V14_ARCHIVE = 13d2c883` — that is the V17/V17_CLOSEGATE
  precedent **correctly** applied, since that split was over `.planning/PROJECT.md`, which is
  exactly the axis the V14 candidates differ on. The draft's single-entry argument rested on
  reading that precedent backwards.

- **D-22:** The `frozen-at-close.mjs` **`--self-test` assertion 3 must be re-authored in the same
  plan as the pin**. `[MEASURED]` `:294-300` hard-asserts that `lsTreeAtClose('V14','docs')`
  **throws**; landing any `V14` flips it to FAIL → 5/6 → `process.exitCode = 1`. That `6/6 PASS` is
  Phase 139's recorded SWEEP-04 evidence, cited in `139-VERIFICATION.md:87,145,172`,
  `STATE.md:305`, and `139-03-PLAN.md:92`. Retarget the assertion to a genuinely unpinned tag and
  record that Phase 139's evidence is **preserved by substitution, not invalidated**. Landing the
  pin without this pairing is a self-inflicted red authored in the previous phase of the same
  milestone.

- **D-23:** Supersede the RETRO-01 comment, and fix its coordinate. `[MEASURED]` the comment is at
  `:135-137`, **not `:94-96`**, and the pin gate is at `:151` / `:212`, **not `:109-110`** — both
  draft citations were inherited from `REQUIREMENTS.md:23` / `ROADMAP.md:111` and re-asserted
  without re-measuring, in a phase whose subject is stale coordinates. Note `:137` already records
  "Candidates if needed: b5cf529 or 671f72a (D-02 advisor pre-scan)" — a prior decision record that
  D-19 overrides on evidence, and which must be explicitly overridden rather than silently deleted.
  There is no real precondition conflict to resolve: `REQUIREMENTS.md:23` and `ROADMAP.md:111`
  already word SWEEP-08 as *satisfying* the gate.

### TEMPLATE-SENTINEL remedy (SWEEP-07)

- **D-24:** The remedy is the **v1.4.1 sentinel parse backport** — relax the `last_verified` and
  `review_by` regexes to `/^…\s*(#.*)?$/m` and add `if (lvMatch[1] === '1970-01-01') continue;`.
  `[MEASURED]` orchestrator-verified: this takes the converted v1.4 harness from 4/1 to **5/0** at
  `0b3be9ab`.

- **D-25:** Every rejection reason in the draft was wrong and is **replaced**. `[MEASURED]`:
  (a) "exclude `docs/_templates/`" is not an alternative to the backport — it **is** what v1.4.1's
  D-24 actually did, via `hasUnderscoreDirSegment()` at `v1.4.1:114-121` inside the **shared**
  `androidDocPaths()` scope function, which makes the `:268` sentinel `continue` dead code for that
  file. The draft cited D-24 as authority while omitting its operative half. (b) The "widens the
  blind spot to four other templates" claim is fabricated — exactly **one** `_`-directory file sits
  in v1.4's 33-path scope. (c) A sidecar exemption is not merely bad, it is **impossible**: C5 never
  reads the allowlist (`ALLOWLIST` appears only at `:138` and `:172`) and the schema has no
  freshness key. (d) "3-line diff" understates a faithful D-24 backport ~4× (~12 lines, touching the
  shared scope function). We adopt the **minimal regex+continue form**, which is genuinely 3 lines
  and is what the measurement above validates — not the full D-24 scope-filter.

- **D-26:** Record that the `continue` **suppresses a genuinely malformed `review_by`**. At the pin
  the template carries `review_by: YYYY-MM-DD`, and with regex-relaxation alone the file fails
  `review_by missing or malformed`; the `continue` is load-bearing specifically for suppressing
  that. Also record that `ROADMAP.md:110` SC#3 says "proven by the assertion **passing**" while the
  remedy makes it **skip** — skip-counts-as-pass is the masking class D-08 refuses elsewhere. Either
  amend SC#3 to say "the check passes with the sentinel skipped" or state the reconciliation
  explicitly. This must not be papered over.

- **D-27:** Ordering — SWEEP-07 lands in the **same plan** as the v1.4 conversion, applied after it.
  Under D-19 the arithmetic the draft claimed finally holds: **2 failures → 1 (conversion) → 0
  (sentinel)**. Cite the sentinel at its **frozen** coordinate (line 29 at the pin), not the live
  `:39`. Note the sentinel only exists from `2574c794` onward, which lower-bounds the viable pin
  window.

### Governance and blast radius (GOV-01, GOV-02 carried from Phase 139)

- **D-28:** The GOV-02 grep must cover the **right hazard class**. Harness **pass counts** are not
  pinned, but harness **source text** is, and the draft checked only the former. In scope for the
  pre-edit grep: all 15 `audit-harness-*.yml` `path-match` jobs (each greps its harness for the
  sidecar path literal; `harness-run` is `needs: path-match`), `check-phase-58.mjs:425-441`
  (an **800-character forward window** from a literal C12 name, asserting `informational: true` is
  absent — restructuring the harness can slide another check's flag into it), `check-phase-48.mjs:107`,
  `check-phase-70.mjs:126`, `check-phase-66.mjs:76` and `:139`, plus `check-phase-73.mjs:96-107` and
  `check-phase-120.mjs:107-111` for `_lib/frozen-at-close.mjs`.

- **D-29:** Anticipate a **CARVE Category-5 extension**. The 17 harnesses are on-list — the glob
  `scripts/validation/v*.*-milestone-audit.mjs` **does** match `v1.4.1-milestone-audit.mjs` (the
  gate escapes `.` then expands `*` to `[^/]*`; verified live, `carve-gate PASS: 23 in-scope, all
  on-list`). But the JSON sidecars and `check-phase-{58,73,100,112,119,120,125,128,134,138}` are
  **off-list**, and several hold live pins on files this phase rewrites. Any repair to them trips
  D-10's hard block. The CARVE already anticipates this ("gate failure is the expected steady state
  for Phases 140-143"); the plan must land the amendment **before** the edit it authorizes.

- **D-30:** The CARVE amendment lands as its **own commit, alone, first**. D-09 rule 1 is stricter
  than the gate enforces — it bars touching any other path "in-scope **or** out-of-scope", while
  `carve-gate.mjs:255` filters in-scope only and `.planning/ROADMAP.md` is out of scope, so a
  combined commit would **pass the gate while violating the written rule**. The dirty-tree arm at
  `:262-272` will also fire mid-execution if the amendment edit coexists with harness edits.
  `_lib/frozen-at-close.mjs` is edited twice this phase (loader + V14) and needs its own GOV-02
  ledger rows.

- **D-31:** Fix the Stop-hook's false alarm. `[MEASURED]` `.claude/hooks/v1.20-carve-gate.cjs`
  emitted "0 off-list path(s) … This is HARD-BLOCKING … land a D-09 amendment commit" three times
  against a clean tree where `carve-gate.mjs` exits **0** with `in-scope=23 on-list=23 off-list=0`.
  It prints its resolution boilerplate unconditionally and escalates wording on repeat fires
  regardless of the count. A gate that cries hard-block on a passing tree trains the operator to
  ignore it — the exact failure D-08 was built to prevent. Small additive fix; the hook is advisory
  per D-10, so this changes no enforcement semantics.

### Recorded hazards

- **D-32:** The zero-margin freshness hazard is **at least four instances covering 11 harnesses and
  live HEAD**, not one instance across 9. `[MEASURED]` v1.5–v1.13 android+linux at 60 vs `> 60`;
  v1.4-family android at `2026-04-25`/`2026-06-24` = 60; `_glossary-apple-business.md` at
  V16/V17/V113 = 60; and v1.14–v1.19 use `> 90` with the glossary at **exactly 90 at live HEAD**.
  All six "green at HEAD" harnesses sit at zero margin too — which is the real answer to whether
  "green" means anything for D-16.

- **D-33:** Two masking behaviours to carry, not discover. v1.4.1's C6/C7/C9 hardcode `pass: true`
  (`:330`, `:350`), masking 103 bare-Knox and 4 COPE occurrences on the exact axes that go blocking
  in v1.5. And harness detail strings truncate (`.slice(0,5)` at `v1.4:234`, `.slice(0,3)` at
  `v1.5:357`) — that truncation is what produced the draft's false "39 Android links in
  common-issues.md" attribution when C4 actually scans **three** files (18 + 9 + 12 = 39).

### Claude's Discretion

- Loader module layout inside `_lib/frozen-at-close.mjs`, cache-key shape, and whether the batch
  reader is a separate export or folded into the existing readers.
- Whether the 16 harness conversions land as one atom or a small number of atoms, subject to D-30's
  amendment-first ordering.
- Exact wording of the three D-14 amendments and the D-22 self-test substitution.
- Naming of the re-authored self-test assertion's replacement tag.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements, roadmap, governance
- `.planning/REQUIREMENTS.md` — SWEEP-05..08 text; SWEEP-09's Phase-141 scoping; the Out of Scope
  table (bars a frozen-aware v1.20 harness on V120 circularity, and bars new content docs)
- `.planning/ROADMAP.md` §"Phase 140" — goal, SC#1–SC#4 (note SC#2's "282 .md files" and SC#3's
  "the assertion passing"); §"Phase 141" for RED-01's dependency on this phase; §"Phase 144"
  `:178` and `:191` for the no-batching rule and HARN-18
- `.planning/milestones/v1.20-CARVE.md` — Category 2 covers the harnesses; D-09 amendment
  procedure; D-10 gate-failure disposition; D-12 target-scoped grep
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — row-per-edit schema
- `.planning/phases/139-governance-carve-fetch-depth-retrofit-shallow-job-repair/139-CONTEXT.md` —
  D-27/D-28 typed `frozenCause`, D-34/D-35 `lsTreeAtClose` signature and the "not a drop-in for
  walkMd" warning, D-36 throw-don't-return-`[]`, D-39/D-40 the self-test assertions

### The frozen-read library
- `scripts/validation/_lib/frozen-at-close.mjs` — `frozenCause` at `:51-67`; `readAtClose` and its
  pin gate at `:151`; `lsTreeAtClose` and its gate at `:212`; the V14 omission comment at
  `:135-137`; **the `--self-test` V14 assertion at `:294-300`** and the pass tally at `:355-356`

### The harnesses and their sidecars
- `scripts/validation/v1.4-milestone-audit.mjs` — `readFile` `:29`, `walkMd` `:36`, sidecar read
  `:58`, `parseAllowlist` degradation `:58-61`, `ALLOWLIST` consumers `:138` and `:172`, C4 targets
  `:214-218` and its link predicate `:220`, C5 regexes `:257`
- `scripts/validation/v1.4.1-milestone-audit.mjs` — `hasUnderscoreDirSegment` `:114-121` inside
  `androidDocPaths()` `:74`; the sentinel `continue` `:268`; hardcoded `pass: true` at `:330`/`:350`
- `scripts/validation/v1.5-milestone-audit.mjs` — `readFile` `:43`, `walkMd` `:50-66`, sidecar `:72`
- `scripts/validation/v1.15-milestone-audit.mjs` — the C17 spawn `:831` and the fifth
  `existsSync` guard `:827` (identical in v1.16–v1.19)
- `scripts/validation/v1.4-audit-allowlist.json` … `v1.19-audit-allowlist.json` — 14 of these were
  coordinate-**and-entry** re-pinned by Phase 133 TOOL-04 (`aaf0d2ff`)

### Validators and CI that pin these files
- `scripts/validation/check-phase-60.mjs` — `:33` HARNESS, `:193`/`:239`/`:261` the three timeouts,
  `:230-232` and `:255-257` the NESTED guards, `:247` the 500-char truncation
- `scripts/validation/check-phase-58.mjs` `:425-441` — the 800-char forward window (V-58-25)
- `scripts/validation/check-phase-48.mjs` `:107`, `check-phase-70.mjs` `:126`,
  `check-phase-66.mjs` `:76` and `:139` — harness source-text pins
- `scripts/validation/check-phase-67.mjs` `:38` — the existing frozen-sidecar precedent supporting D-10
- `scripts/validation/check-phase-62.mjs` `:293-295`, `check-phase-65.mjs` `:244-255`,
  `check-phase-66.mjs` `:92-102` — live-sidecar assertions (the D-12 inversion)
- `scripts/validation/check-phase-73.mjs` `:96-107`, `check-phase-120.mjs` `:107-111` — pins on
  `_lib/frozen-at-close.mjs`
- `scripts/validation/check-phase-133.mjs` `:45-61` — V-133-REPIN14, presence + valid JSON **only**
- `.github/workflows/audit-harness-integrity.yml` `:47-50` (sidecar-literal grep) and `:66-67`
  (v1.4 harness run, **no `continue-on-error`**); the equivalent `path-match` job exists in all 15
- `scripts/validation/carve-gate.mjs` `:255` (in-scope filter), `:262-272` (dirty-tree arm), `:436`
- `.claude/hooks/v1.20-carve-gate.cjs` — the D-31 false-alarm defect

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `readAtClose` / `lsTreeAtClose` / `frozenCause` — the loader extends this module rather than
  adding a file; it is already CARVE Category 4 and owns the pin gate.
- `check-phase-67.mjs:38`'s frozen-sidecar read — the working precedent for D-10.
- v1.4.1's C5 block — the literal source of the D-24 sentinel backport.
- Phase 139's `file://` shallow-clone negative harness — the pattern for proving D-05's
  throw-before-read ordering.

### Established Patterns
- Every harness funnels reads through `readFile` + `walkMd` + bare `existsSync` guards; converting
  those three per family covers all ~250 call sites without touching them individually.
- `parseAllowlist()` degrades to empty arrays on a null read, silently, in all 17 harnesses.
- Chain validators exit via `process.exit(failed > 0 ? 1 : 0)` and the runner catches throws.
- `CHECK_PHASE_NESTED=1` short-circuits every harness re-run, so the apex is blind to this phase's
  work (D-09).

### Integration Points
- 23 import statements consume `_lib/frozen-at-close.mjs` across 43 referencing files.
- All 15 `audit-harness-*.yml` gate their `harness-run` on a `path-match` job that greps harness
  source for the sidecar path literal.
- Phase 141 RED-01 consumes the v1.5–v1.13 conversion directly; Phase 144 consumes V14's shape,
  the v1.19 conversion, and the HARN-18 fork ordering.

</code_context>

<specifics>
## Specific Ideas

- The owner directed that gray areas be resolved by `/grill-me` followed by `/adversarial-review`,
  with each question's options scored and a best option recommended with reasoning. That process
  produced this document.
- Standing project rule, and it held: *a corpus edit requires proof the document is wrong, not
  merely that a frozen assertion disagrees with it.* Zero corpus edits are needed — every failure
  resolves via SHA choice plus two harness-source changes.
- Zero-margin hazard restated per D-32: do not touch any glossary's `last_verified` / `review_by`
  anywhere in this milestone.
- Method note for the plan: the draft that seeded this review carried four fabricated or
  unreproducible `[MEASURED]` figures (213 ms/spawn, 1.44 s batch, "38–60 s fails outright",
  "103 files exit coverage"). Re-execute any number before relying on it, and prefer a full
  converted-harness run over a hand-built simulator — three of the review's sharpest findings came
  from running the real harness against a `git archive`d frozen tree.

</specifics>

<deferred>
## Deferred Ideas

- **v1.19 harness conversion** — Phase 144, in the same plan as the `V119` pin (D-13/D-14).
- **The C17 live-HEAD leg in v1.15–v1.19** — `c17-eee-contract.mjs` is CARVE Category 3, owned by
  Phase 143. Converting it here collides two phases' scopes. Must be recorded as a named
  SWEEP-05 limitation via the amendment instrument, not a prose note (this is the D-26 masking
  question in a second guise). Note Phase 143's LINK-03 edits the live corpus those legs read.
- **`V14_ARCHIVE = 13d2c883`** — only if a future validator needs v1.4's `.planning` close state
  (D-21).
- **Re-pinning the v1.4 sidecar to live coordinates** — out of scope; D-19 makes it unnecessary.
- **De-informationalizing v1.4's C3 or v1.4.1's C6/C7/C9** — not this phase (D-33).
- **`if: always()` on the fanned-out validator jobs** — still Phase 141, carried from Phase 139.

</deferred>

---

*Phase: 140-frozen-aware-harness-conversion*
*Context gathered: 2026-08-06*
