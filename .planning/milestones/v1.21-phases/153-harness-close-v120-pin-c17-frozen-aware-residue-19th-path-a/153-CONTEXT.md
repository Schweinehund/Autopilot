# Phase 153: Harness Close — V120 Pin, C17 Frozen-Aware Residue & 19th Path-A Lineage Bump - Context

**Gathered:** 2026-08-29
**Status:** Ready for planning

<domain>
## Phase Boundary

The terminal harness cluster of v1.21. This phase touches **no `docs/` content** — zero authored,
zero edited. It ships six things: the `V120` pin, the frozen-aware conversion of the last six
harnesses, the 19th Path-A lineage (harness + allowlist sidecar + `BASELINE_25` + eight content leaves
+ the apex), the 18th CI workflow, the regenerated publish bundle, and a 3-axis terminal re-audit
captured at one shared SHA — then the close-gate that flips 58 requirements to Validated.

Discharges HARN-01 through HARN-06. `docs/` is out of scope in both directions: no content lands, and
no content defect found during this phase is fixed here.

This CONTEXT was produced by `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review` (4 parallel
Finders → Adversary → Referee). 80 raw findings → 67 adjudicated real → 44 distinct defects after
netting. Every `[MEASURED]` row below was independently re-verified by a second agent; the Area-A
Finder additionally executed the C17 conversion end to end before it was ratified.

</domain>

<decisions>
## Implementation Decisions

### Area A0 — The V120 pin (HARN-01, HARN-02)

*This area exists because the four-area draft had no bin for the pin, and HARN-01/HARN-02 came out of
the draft with **zero** decisions — this repo's signature failure mode. The pin is the phase's first
atom and the mechanical precondition for every part of Area A.*

- **D-01:** `MILESTONE_CLOSE_SHAS.V120 = '246fa3dd'` is **INSERTED BEFORE the `V14` entry**, never
  appended. `[MEASURED]` the close SHA is `246fa3ddc88a73792744285468a0265dfbab68e8`, recovered by the
  subject-line pair discriminator with **count = 1**. `V-140-V14PIN` (`check-phase-140.mjs:118-143`)
  fails if any V-tag key appears after `V14`, and it sits inside the apex chain. `V14` currently lives
  at `_lib/frozen-at-close.mjs:147` and is genuinely last.
  — **Reversibility:** costly — a wrong placement takes every apex red until corrected, and the pin is
  read by six harnesses once Area A lands.

- **D-02:** `.planning/PROJECT.md` Pillar G's **"Append"** instruction is CORRECTED in the same commit
  as the pin. `[MEASURED]` `PROJECT.md:25` reads "**Append** `MILESTONE_CLOSE_SHAS.V120` +
  `readAtV120Close` + `lsTreeAtV120Close`", which `REQUIREMENTS.md:105` explicitly falsifies. With
  D-01 previously undecided this was the highest-authority surviving instruction an executor would
  find, and it is wrong. Correcting the requirement while leaving PROJECT.md is not a fix.

- **D-03:** `readAtV120Close` and `lsTreeAtV120Close` follow the V18..V119 single-entry pattern —
  one-line thin wrappers delegating to `readAtClose('V120', …)` and `lsTreeAtClose('V120', …)`, added
  to the existing export blocks.

- **D-04:** The pin is proven **end to end by a real frozen read** before anything consumes it — a
  live `readAtV120Close` call against a known path at `246fa3dd`, with the returned bytes asserted
  non-empty. SC#1 names this explicitly and it is a separate obligation from the placement.

- **D-05:** The subject-line discriminator is **regression-checked against V117, V118 and V119**
  before the V120 result is trusted, per `.planning/STATE.md`'s Plan-Time Research Flags. The naive
  dual-token grep returns count=1 for v1.20 so the V118/V119 false-positive trap does not manifest
  here — but the check is run and recorded, not assumed. **Correction of record** carried from
  HARN-02: no v1.20 false positive occurred, and none is claimed.

- **D-06:** D-31's APPEND-ONLY ruling on `_lib/frozen-at-close.mjs` is **explicitly amended, once,
  for this phase**. `144-CONTEXT.md:375-381` ratified append-only with ONE carved exception, and Phase
  144 spent that exception on its own `:10-13` comment correction. This phase needs two mid-file
  edits — D-01's insert-before-`V14` and D-13's helper — so the amendment is named rather than
  silently taken. Phase 144 escaped the tension only because `V119` at `:135` already sat before `V14`.

- **D-07:** Both live guards on that file stay green and are checked before and after the edit.
  `V-120-HYG01` (`check-phase-120.mjs:102-113`) asserts the literal `REMAIN INLINE` is **absent** and
  `Phase 111` is **present**; `V-73-LIB-EXISTS` (`check-phase-73.mjs:94`) asserts the module exists.
  Any new JSDoc added by D-13 is constrained by the first.

### Area A — The six-harness frozen-aware conversion (HARN-03)

- **D-08: OWNER-RULED 2026-08-29** — the set is **SIX**, not five, and the widening is recorded as an
  inline `[SUCCESS-CRITERION AMENDMENT, D-NN]` across the **full enumerated list of stale surfaces**,
  not on the requirement alone. `[MEASURED]` six harnesses carry a C17 spawn — v1.15-v1.19 (8 hits
  each) and v1.20 (7 hits; the delta is exactly the `SWEEP-05 EXCEPTION` comment block). Surfaces to
  amend: `.planning/ROADMAP.md:323` (SC#2 — **the criterion the verifier scores**),
  `.planning/PROJECT.md:13`, `:26` (twice), `:811`, `:1003`,
  `.planning/milestones/v1.20-MILESTONE-AUDIT.md:42`, `144-CONTEXT.md:63-64`, and the **heading** at
  `.planning/milestones/v1.20-DEFERRED-CLEANUP.md:105`. Mirrors Phase 144 D-02/D-25, which amended
  requirement text AND traceability cells.
  — **Reversibility:** one-way — SC#2 is read by `/gsd-verify-work` and the milestone audit; a phase
  that converts six against an unamended SC#2 records a false 5/5 or fails its own criterion.

- **D-09:** The conversion splits into **two plans, not one**, because the work is 5:1 asymmetric.
  `[MEASURED]` `v1.20-milestone-audit.mjs` imports `frozen-at-close` **zero** times — every C1-C16
  corpus read is live-HEAD, not just the C17 leg. So: five harnesses (v1.15-v1.19) need **one** change
  each (the C17 spawn's `cwd`); the sixth needs the **entire SWEEP-05 conversion** of all C1-C16
  corpus reads to `readAtV120Close`/`lsTreeAtV120Close` **plus** the C17 leg. Phase 144 gave v1.19's
  equivalent job its own dedicated plan (`144-06-PLAN.md`) for exactly this reason. "One pass, six
  harnesses" as a work description is wrong; as a *simultaneity* requirement it stands — both plans
  land before any evidence is captured.

- **D-10:** Converting v1.20's harness is the **18th** application of the frozen-aware pattern, not
  the 19th. `[MEASURED]` 17 of 18 harnesses already import `_lib/frozen-at-close.mjs`; corroborated at
  `144-CONTEXT.md:57` ("the **seventeenth** application … not the sixteenth") and
  `v1.20-MILESTONE-AUDIT.md:42`. **"19th" is the Path-A *lineage* ordinal** for
  `v1.21-milestone-audit.mjs` (`ROADMAP.md:325` SC#3) — a different sequence. This repo writes both
  ordinals into harness headers and validator detail strings, so the distinction must survive into the
  prose.

- **D-11:** The mechanism is a **`cwd` swap, not a code change**. Materialise the frozen `docs/` tree
  into a temp directory and spawn the live contract with `cwd: tmpdir`. `c17-eee-contract.mjs` stays
  **byte-unchanged** (HARN-03 requires it) and the `existsSync` guard stays **live** against the real
  repo root — "does the validator exist" is correctly a live question.

- **D-12:** Materialise **`docs/**` only.** `[MEASURED]` in normal mode `c17-eee-contract.mjs` reads
  nothing else — `walkMd('docs')` at `:526`, `readFile` joining `process.cwd()` at `:62`, the D1 map
  inlined at authoring time, and the two `c17-fixtures/` reads at `:434`/`:447` gated behind
  `if (SELF_TEST)` at `:423`. The harness spawns without `--self-test`.

- **D-13:** The helper is **`withDocsAtClose(tag, fn)` — a callback, not a path-returning function** —
  exported from `_lib/frozen-at-close.mjs`, built on the existing `lsTreeAtClose` +
  `readManyAtClose` (`:244`/`:301`) `git cat-file --batch` path. A path-returning helper pushes
  `try`/`finally` cleanup into all six call sites, re-creating the six-way divergence the shared helper
  exists to eliminate. Creation and deletion live in one place.

- **D-14: NEVER `git worktree add`, NEVER `git archive | tar`.** `git worktree add` mutates
  `.git/worktrees/` in the shared repo — six concurrent adds inside one apex run — and applies
  `core.autocrlf` (`[MEASURED]` = `true`, with a one-line `.gitattributes` carrying no `* text=auto`).
  `git archive | tar -x` adds a `tar` binary dependency to a suite whose stated convention is Node
  built-ins only (`c17-eee-contract.mjs:15`). `readManyAtClose` is already CRLF-normalised at `:334`
  and carries SWEEP-04 fail-loud semantics at `:233-236`.

- **D-15:** `CONTRACT` is **absolutized before the spawn**. It is currently the relative string
  `'scripts/validation/c17-eee-contract.mjs'` passed with `cwd: process.cwd()`. Swapping cwd to the
  tmpdir makes `node` resolve it inside the tmpdir and die with module-not-found, which the catch
  converts into a **`C17 FAIL:`** — a red that reads as a corpus violation. This failure is at least
  loud; D-16's is not.

- **D-16:** The anti-vacuous-green guard is a **milestone-unique known-member path**, not a file
  count. `[MEASURED]` enrolled counts are V115 174, V116 **229**, V117 **229**, V118 232, V119
  **234**, V120 **234** — while the trees genuinely differ (`3dd2512^{tree}:docs !=
  b56bba5^{tree}:docs`; `a7bda73e:docs != 246fa3dd:docs`). A count therefore **cannot** distinguish a
  harness materialising its own corpus from one materialising its neighbour's — precisely the defect a
  six-file simultaneous conversion produces, and four of the six would carry a guard that is green
  under the mis-pin. Assert instead a path present in that milestone's corpus and absent from its
  neighbours'. A non-zero assertion is still carried (it catches the empty-materialize case), but it
  is not the primary guard.

- **D-17:** If any count assertion survives, the string it parses is **pinned**. The six C17 legs
  discard the child's stdout today (`v1.20-milestone-audit.mjs:830`, return value unused), so a count
  means parsing `c17-eee-contract.mjs:585-587`'s `C17 summary: N files checked` line — and nothing
  pins that wording. An unpinned parse re-opens the vacuous-green hole through the same door.

- **D-18:** `mkdtempSync` + `rmSync` with **`maxRetries`/`retryDelay`**, inside the helper, in a
  `finally`. `[MEASURED]` both cited precedents (`_lib/frozen-at-close.mjs:461`,
  `frozen-read-negative-test.mjs:290`) use a bare `rmSync(dir,{recursive:true,force:true})` with no
  retry — EPERM/EBUSY-flaky on Windows immediately after writing 282 files, and Windows is this
  repo's primary authoring platform. The real collision risk is **concurrent processes on one machine**
  (a local apex spawning six harnesses), not GitHub Actions jobs, which run on separate runners.

- **D-19:** `materializeDocsAtClose`/`withDocsAtClose` adds the module's **first write verbs**
  (`writeFileSync`/`mkdirSync` alongside the existing `{ mkdtempSync, rmSync, existsSync }` at `:27`),
  converting a documented read-only frozen-read module into one that writes to disk. Record the
  character change in the module header; do not let it arrive unannounced.

- **D-20:** `V-140-C17CARVEOUT` goes **false-but-permanently-green** and is fixed **additively in a
  successor validator, never by editing `check-phase-140.mjs`**. `[MEASURED]` its assertion *body* is a
  bare `.includes('c17-eee-contract')` and survives the conversion, but its name and detail string
  (`check-phase-140.mjs:19`, `:149-165`) assert "carve-out … scoped to v1.15-v1.18 only" and "each
  still reference the c17-eee-contract spawn **+ exception comment**" — and D-09 removes that
  exception comment (`v1.15-milestone-audit.mjs:829-832`). This is the identical defect class recorded
  at `check-phase-125.mjs:86`, which has been green with a false detail string for two milestones.

- **D-21:** The materialised **set** — not just the count — is a silent contract with a byte-frozen
  file. D-11 pins `c17-eee-contract.mjs` byte-unchanged, so if a future milestone's C17 reads
  `docs/_registry/` or `scripts/pipeline/filename-map.md` off cwd, **six** harnesses go vacuously
  green at once. Record the coupling in the helper's header and in the v1.21 deferred-cleanup artifact.

### Area B — The eight content leaves + apex `check-phase-153.mjs` (HARN-04)

- **D-22:** The eight leaves are **CONTENT leaves, templated on `check-phase-126..132`, not on
  `check-phase-141..143`.** Phases 145-152 shipped eleven registry documents (RE-226..RE-236), the
  firmware/BIOS corpus, the Linux delivery pillar and navigation-last wiring. Phase 144's leaves came
  from a **tooling** milestone whose phases had no `docs/` deliverables, which is why its ratified
  needle-target clause reads "`scripts/`, `.github/` or `.planning/milestones/v1.20-*` paths only"
  (`144-04-PLAN.md:24`). Applied literally here it produces eight leaves that assert **nothing about
  their own phases' work**. That clause does **not** carry to v1.21.

- **D-23:** Leaves stay **LIGHTWEIGHT in shape** — `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`, no
  AUDIT check, no AUDIT-HARNESS check, no NESTED guard, needles plus a SELF invariant. Only the
  *needle-target* rule changes (D-22), not the structure. Apex-shaping eight leaves would spawn eight
  extra harness runs and eight extra chain expansions inside the apex's 107-child sweep.

- **D-24:** HARN-04's "`CHAIN_PHASES` generated by arithmetic, never transcribed" is **reconciled in
  writing**: it binds the **apex**; an empty literal on a lightweight leaf is not a transcription
  because only the apex has a chain. Phase 144 hit the identical tension and labelled its D-14
  "REVERSED from the apex template" precisely so the reversal was on the record. Without this line a
  verifier scoring SC#3/HARN-04 can read eight `CHAIN_PHASES = []` leaves as non-compliance.

- **D-25:** The needle rule is a **durability test, not a scope test**. The question is "would this
  needle go red at the first v1.22 content commit and stay red forever?" — which is what 144 D-05
  actually decided (`144-CONTEXT.md:87-90`), not "is it corpus-wide". Corpus-wide **negatives** are
  therefore **permitted** where the invariant is ratified design. This unblocks Phase 145's primary
  Observable Truths — `grep -rn "\.planning/research/\|\.planning/phases/" docs/` → 0 (its
  archival-drift deliverable, which exists in no other form), the mutual-exclusivity scan, and the
  `Ubuntu 22.04` scan — and Phase 149's 11-row Prohibition Scan, all of which a blanket ban would
  have deleted with no replacement.

- **D-26:** The `recipes/05-` three-hub negative is justified by **INT-05's ratified hub-unwiring
  invariant**, not by "it is only three files". A three-file negative fails the durability test just
  as a corpus-wide one does if a later milestone legitimately wires a hub; the invariant is what makes
  it safe.

- **D-27:** Needles derive from each phase's `VERIFICATION.md` and `SUMMARY.md` **measured actuals at
  AUTHORING TIME**; the leaves make **zero `.planning/phases/` reads at RUNTIME**. These are not in
  tension and the distinction must be stated explicitly — 144 stated it as a derivation rule (D-14)
  and a runtime prohibition (D-15) separately. The rule's home is `144-CONTEXT.md:171`, **not**
  `check-phase-132.mjs:5`, which names only `132-VERIFICATION.md`.

- **D-28:** Phase 148's and 151's `git diff <SHA>..HEAD --stat` emptiness assertions are
  **NOT transcribable**. `[MEASURED]` `148-VERIFICATION.md:130-135` and `151-VERIFICATION.md:153-176`
  express most prohibitions against phase-local base SHAs (`a161a43c`, `037305f1`, `1a52ce54`,
  `285a65d5`) — un-pinnable in a permanent apex member, red the moment more commits land. Note also
  that `151-VERIFICATION.md:158` asserts "`check-phase-151.mjs` not created (Phase 153)", which **this
  phase inverts**. Derive positive deliverable needles for those two leaves instead.

- **D-29:** `check-phase-152.mjs` is **transcribed verbatim** from `152-04-SUMMARY.md:343-414` — every
  literal, re-derive nothing. `[MEASURED]` every literal in that spec was re-verified live and is
  **not stale**. The line-scoping requirement is real: whole-file `enterprise update plan` = 2,
  isolated anchor line = 1.

- **D-30:** **Correction of record on the 152 needle-spec.** It requires a self-reference guard
  asserting "its own file is present at its own path" plus the dual chain invariant, and claims that is
  "the same shape the twin uses." `[MEASURED]` it is not — `V-132-SELF`
  (`check-phase-132.mjs:106-120`) carries **only** the dual invariant. Implement the spec as written
  (file-presence **and** dual invariant) and record that its twin claim is false, so the next reader
  does not "correct" the leaf toward the twin.

- **D-31:** `check-phase-153.mjs` is a **structural copy of `check-phase-144.mjs`**, never of the
  lightweight leaves. This single decision closes five separate defects — templating off the leaves
  loses all of the following together:
  - **HAZARD FIX 2** — the narrowed classifier `err.code === 'ENOENT' || err.status === 127`
    (`check-phase-144.mjs:216-220`). `[MEASURED]` `check-phase-141.mjs:80`, `142.mjs:82` and
    `143.mjs:96/121/146` carry the **loose** `stderr.includes('not found') || stderr.includes('Could
    not resolve')` form, which converts the apex's own module-load guard throws into green SKIPs.
  - **`CHECK_PHASE_NESTED=1` propagation** — `const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' }`
    (`:201`). This is what makes a 105-child chain O(n); without it the chain is exponential and never
    terminates under `timeout-minutes: 30`.
  - **HAZARD FIX 1** — `SUBPROCESS_MAX_BUFFER = 20 * 1024 * 1024` (`:111`), applied at both `:205`
    (chain) and `:241` (AUDIT-HARNESS). Node's 1 MiB default overflows into a non-ENOENT throw → FAIL.
  - **All four module-load guards** — dedup (`:124-127`), length, termini, and the `CHAIN_EXTRA`
    disjointness guard 144 added. "The fourth guard" is only meaningful with the first three named.
  - **The `HARNESS` const and the timeout split** — repoint `:108` to
    `scripts/validation/v1.21-milestone-audit.mjs`, and carry `isPeer` at `phaseNum >= 67` with the
    600s peer / 300s per-subprocess / 300s AUDIT-HARNESS budgets (`:199-200`). An unrepointed
    `HARNESS` is the same defect as D-46 but *inside the apex*: `V-153-AUDIT-HARNESS` would run
    `v1.20-milestone-audit.mjs`, pass, and never execute the new harness.
  Every count and span string is **re-derived**, never copied — 144 D-12's rule, and
  `check-phase-138.mjs` shipped three stale runtime strings by ignoring it.

- **D-32:** Chain `[48..152]` — `CHAIN_START = 48`, `CHAIN_END = 152`, generated by `Array.from`,
  length assert `!== 105`, termini assert `48..152`, `CHAIN_SKIP = new Set([])`,
  `CHAIN_EXTRA = [30, 31]` verbatim and disjoint. `[MEASURED]` 105 entries; the only gaps in
  `[48..152]` on disk are exactly `145..152`, the eight leaves this phase authors, so the span is
  contiguous once they land. `[MEASURED]` `check-phase-30.mjs` and `check-phase-31.mjs` both exist and
  exit 0.

- **D-33:** Expected apex triples — **`110/0/0`** once `153-VERIFICATION.md` exists; `109/0/1` before
  it; `108/1/1` if run before `v1.21-milestone-audit.mjs` lands. Arithmetic: 1 AUDIT + 105 chain +
  2 `CHAIN_EXTRA` + 1 AUDIT-HARNESS + 1 SELF = 110, re-derived from `check-phase-144.mjs:69-75`'s
  101/100/99.

- **D-34:** Ordering is **harness → leaves → apex**, not merely leaves → apex. The AUDIT-HARNESS
  absent branch is a hard FAIL at `check-phase-144.mjs:232`, ahead of the NESTED guard at `:236` —
  which is exactly what produces D-33's `108/1/1`. Phase 144 sequenced `144-06` (harness) before
  `144-07` (apex) for this reason. Apex-before-leaves would emit eight FAILs indistinguishable from a
  real regression.

- **D-35:** The **NESTED invocation triple is recorded as a known vacuous green**. `[MEASURED]`
  `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-144.mjs` → **2 PASS, 0 FAIL, 99 SKIPPED,
  exit 0** — a result that reads as a pass. `145-VERIFICATION.md:20-34` records the verifier
  deliberately reproducing this trap before trusting 101/0/0. Close evidence must never be captured
  from a nested run.

- **D-36:** The apex asserts the literal archive-root token `'v1.21-phases'` in its source AND
  hard-codes the Phase-153 directory slug
  `153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a/153-VERIFICATION.md`
  (the `check-phase-144.mjs:154-156` shape). **Never copy a predecessor's token** —
  `check-phase-125.mjs:86` carries the wrong `['v1.15-phases']` and stays permanently green with a
  false detail string because `_lib/archive-path.mjs:23-24` checks the LIVE path first.

- **D-37:** The resolver's null-vs-success behaviour is **NOT usable as the wrong-token detector
  in-phase**. `.planning/milestones/v1.21-phases/` cannot exist while Phase 153 runs — archival is
  `/gsd-complete-milestone`'s act, after the phase. Every in-phase invocation hits the live branch.
  The token is verified by literal-string assertion in the apex source; the resolver is exercised
  against the archived path only in the post-archival re-run (D-58).

- **D-38:** Whether the eight leaves may re-spawn corpus gates (C17, the link checker) as
  `check-phase-141/142/143` do is **decided explicitly, not left implicit**. Measured cost is
  negligible (~0.31 s for C17), but eight unbounded gate re-spawns inside a 107-child sweep is a
  design choice that should appear in the leaf headers.

### Area C — 19th Path-A lineage + 18th CI workflow (HARN-04, HARN-05)

- **D-39: OWNER-RULED 2026-08-29** — the **v1.20 CARVE regime is retired for v1.21**. De-register
  `.claude/hooks/v1.20-carve-gate.cjs` from `.claude/settings.local.json` for the duration of this
  phase, and record why: `[MEASURED]` `carve-gate.mjs` has `CARVE_PATH = '.planning/milestones/v1.20-CARVE.md'`
  and `DEFAULT_BASE = a7bda73e` (the v1.19 close), exits **FAIL with 89 off-list paths at HEAD**, and
  all eight v1.21 content phases already shipped past it red. It was never re-adopted for v1.21.
  **No CARVE amendment plan gates this phase** — Phase 144's D-07 hard blocker does not carry.
  — **Reversibility:** reversible — the hook is machine-local and gitignored.

- **D-40:** **Correction of record on the draft's premise.** The claim "zero execution sites" was
  measured over `scripts/`, `.github/` and `package.json` and **missed `.claude/`**. The hook at
  `.claude/hooks/v1.20-carve-gate.cjs:86-91` runs `execFileSync('node', [gatePath, '--json'])` and is
  registered as the third Stop hook at `.claude/settings.local.json:26`. `[MEASURED]` the gate returns
  exit 1 with a non-empty `offList`, so the hook's fail-open guard at `:130` does **not** engage:
  `block/nudge` on the first Stop, `block/warn` on every subsequent one. D-39 is right; the reasoning
  that produced it was not, and the corrected reasoning is what goes in the record.

- **D-41:** The obligation that actually survives is **`V-139-GOVARTIFACTS`, not byte-equality on
  `carve-gate.mjs`.** `[MEASURED]` `check-phase-139.mjs:68` pins `FIXED_SHA = 04e26106…` — a fixed
  **past** commit — so HEAD bytes are structurally unconstrained. What *is* live:
  `check-phase-139.mjs:137-172` reads `.planning/milestones/v1.20-CARVE.md` asserting **exactly one**
  ` ```carve-allowlist ` fence, a `## Amendment procedure` H2 with **exactly three** numbered rules,
  and a `## GOV-02 grep procedure` H2 — plus a `>= 57` row floor on
  `.planning/milestones/v1.20-GOV-02-LEDGER.md` (currently 60). `check-phase-139` is a chain member of
  the new apex, so neither file may be edited or moved.

- **D-42:** A **complete census of chain members that live-read `.planning/`** is produced before the
  close. At minimum: `check-phase-139.mjs:40-41` (both `.planning/milestones/v1.20-*` governance
  files), `check-phase-54.mjs:30-31` (`REQUIREMENTS.md` + `ROADMAP.md`, with the negative assertion at
  `:347`), and `check-phase-54.mjs:437-479` (`V-54-27`, which recursively walks **the entire
  `.planning/` tree**). D-30's two named frozen-reader exemptions — `check-phase-70.mjs:398,414` at
  `V17_CLOSEGATE` and `check-phase-124.mjs:46,97` at `V116` — are carried, along with its measured
  baseline of **zero survivors**.

- **D-43:** `V-54-27` scans **this phase's own planning prose**. It walks `docs/` and all of
  `.planning/` live for a bare `> **Platform:**` blockquote, on a live-HEAD apex chain member, and
  Phase 153 authors ~10 new `.planning/phases/153-*/` artifacts under that scan.

- **D-44:** `v1.21-milestone-audit.mjs` **inherits C1-C17 verbatim** from v1.20; no C18, no new check.
  New corpus content is already gated by C17, the eight leaves and the link checker. Phase 144 D-05
  honoured the same "no harness fold" boundary.

- **D-45:** The Path-A copy source is the **UNCONVERTED `v1.20-milestone-audit.mjs`, retrieved from
  git history** — `git show <commit-before-D-09>:scripts/validation/v1.20-milestone-audit.mjs`. This
  is the single highest-value correction in the review. Phase 144 put it in a plan **task title**
  (`144-06-PLAN.md:119`, "Path-A copy from the **UNCONVERTED** v1.19 source") with the rationale at
  `:131-136`: copying the converted form forward makes the new harness audit its **predecessor's
  frozen corpus** instead of its own live one. Because D-09 converts *two* things in the source file
  (C1-C16 **and** the C17 leg), "unconverted" is strictly more load-bearing here than it was at v1.20.
  — **Reversibility:** costly — the resulting harness is green and structurally wrong; nothing in the
  gate set detects it.

- **D-46:** The new harness is **born live-HEAD** and carries a **live-HEAD C17 leg**, because there
  is no `V121` to freeze against. It becomes v1.22's sole-unconverted harness. State this in its
  header, and name the residue in the v1.21 deferred-cleanup artifact so the pattern does not silently
  repeat a third time.

- **D-47:** `v1.21-audit-allowlist.json` is a **header-fields-only copy** (`generated`, `phase`), and
  the new harness's sidecar `readFile(...)` is repointed. `BASELINE_25` is appended following
  `BASELINE_24`'s shape. `[MEASURED]` the forward-pointer naming `BASELINE_25` as next is at
  `regenerate-supervision-pins.mjs:563`; `:548` is BASELINE_24's opening line.

- **D-48:** **Never cite `regenerate-supervision-pins.mjs --report` as pin-drift proof.**
  `[MEASURED]` it hardcodes the **v1.7** sidecar at `:290`, `:336`, `:582` and `:584`, and walks only
  26 of 59 line-pins. Whether `--self-test` is **run** is decided explicitly: `DEFER-119-A` was
  dropped-and-closed at the v1.20 close precisely because that self-test now exits 0, and
  `BASELINE_25` edits the file that owns it.

- **D-49:** Harness + sidecar + `BASELINE_25` land as **one indivisible plan**, and the 18th workflow
  as a **separate** plan. Phase 144 kept them apart (`144-06` vs `144-08`); fusing them in the
  discussion is what let the workflow's literal inventory go under-specified.

- **D-50:** The 18th workflow is authored by a **mechanical per-job diff** of
  `audit-harness-v1.20-integrity.yml` against an **explicit literal inventory**, never by prose
  instruction. This single decision closes seven separate defects. The inventory:
  - `harness-run`'s `name:` (`:84`) and `run:` (`:93`) — **the only job that executes the harness**;
    copied verbatim the workflow reports green having never run `v1.21-milestone-audit.mjs`.
  - **All three** sidecar references: `:59` (parse), `:76` (path-match grep), `:216`
    (`rotting-external-quarterly`'s inline node script). The third sits in an always-skipping job, so
    a verbatim copy is **undetectable by the close evidence**.
  - **All five** display-name literals: `:31`, `:48`, `:68`, `:84`, `:186`. D-55 matches evidence on
    `.jobs[].name`, so uncorrected names both mislabel v1.21 evidence and collide with v1.20's in a
    `gh run list` blend.
  - The `linux-chain` apex `name:` (`:108`) **and** `run:` (`:111`), not just the `::notice` (`:114`).
    A notice-only fix leaves `linux-chain` running the v1.20 apex while the standalone job runs
    `check-phase-153` — silently voiding the DUAL-APEX contract the header asserts verbatim.
  - **All six** `paths:` entries, including the workflow's **self-reference** at `:38`.
  - The `path-match` grep literal — copied verbatim it **exits 1**.

- **D-51:** **Both crons are carried VERBATIM.** `rotting-external-quarterly`'s guard is a **string
  equality** against the cron literal (`github.event.schedule == '0 8 1 1,4,7,10 *'`). Any stagger to
  avoid an 18-way 08:00 collision makes that job permanently unreachable — a green-looking permanent
  skip that D-56's "skips are gaps" rule cannot see, because the anchor count would still be correct.
  This is the one literal on the workflow that must **not** be re-derived.

- **D-52:** Carried verbatim from D-16's **Keep** list (`144-CONTEXT.md:204-205`): the DUAL-APEX header
  contract restated in full, `fetch-depth: 0` on every checkout, `timeout-minutes: 30` on chain jobs
  and `15` on leaf jobs. These are ratified constants, not values to re-measure.

- **D-53:** Two `check-phase-139` assertions bind the new workflow and appear in no roadmap text.
  `V-139-PROBEJOB` requires a `frozen-read-probe` job **with no `needs:` key** in **every**
  `audit-harness-*.yml`. `V-139-FETCHDEPTH` is an **equality** between checkout-step count and
  `fetch-depth: 0` count (comment lines stripped) — not a presence test, so a checkout added without
  the `with:` block fails it.

- **D-54:** The workflow carries **its own apex job `check-phase-153` and eight standalone leaf jobs**,
  and **no `check-phase-144` job**. `[MEASURED]` the v1.20 workflow carries its own apex and not
  v1.19's — the Path-A rule is "carry your own apex, never the predecessor's". Eight separate leaf
  jobs cost parallel CI minutes, not wall-clock, and a grouped job hides which leaf failed.
  `pin-helper-advisory` is **carried and explicitly labelled NON-EVIDENCE**, never "fixed" into a
  gate — `[MEASURED]` `:200` `continue-on-error: true` + `:208` `|| true` + `:212` `|| echo` make its
  conclusion structurally always `success`, and the instrument it would gate on is the one D-48
  distrusts.

### Area D — Terminal close, evidence and dispositions (HARN-06)

- **D-55:** Terminal ordering, per 144 D-29 — `pin → conversion → harness/sidecar/BASELINE_25 →
  workflow → eight leaves → apex → six-harness evidence → owner push → 18-workflow dispatch →
  Axis-1 fresh clone + Axis-3 zero-context reproduction at the SAME SHA → v1.21-MILESTONE-AUDIT +
  v1.21-DEFERRED-CLEANUP → publish bundle --version=v1.21 → SINGLE close-gate commit → post-gate
  confirmatory apex run → /gsd-complete-milestone → post-archival apex re-run.` The bundle runs 236
  pandoc conversions and exits 1 on any failure; under the v1.19 ordering that failure lands after an
  irreversible 58-requirement flip.
  — **Reversibility:** one-way at the close-gate commit.

- **D-56:** **The apex triple is NOT evidence for SC#2**, and a standalone six-harness evidence step is
  a first-class deliverable. `[MEASURED]` `check-phase-119/125/128/134/138/144` all carry
  `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'`, and
  those six AUDIT-HARNESS checks point at exactly the six harnesses HARN-03 converts. The apex sets
  `CHECK_PHASE_NESTED=1` on every child, so **all six skip** — `110/0/0` is fully compatible with all
  six conversions being broken, and D-16's per-harness guard lives *inside* the six programs that never
  run. Capture six direct `node scripts/validation/v1.1{5,6,7,8,9}-milestone-audit.mjs` +
  `v1.20-milestone-audit.mjs` runs with per-harness known-member assertions. Record the second-order
  asymmetry too: the NESTED guard's stated rationale is "skip … against evolved corpus", which the
  conversion destroys — but 119/125/128/134/138 are frozen predecessor surfaces and cannot be edited,
  so the benefit is permanently invisible to the apex. Write it down or v1.22 re-litigates it.

- **D-57:** Dispatch **all 18, enumerated BY NAME from a live `ls .github/workflows/*.yml` and
  `*.yaml` at dispatch time** — never from a carried count. `[MEASURED]` 17 exist today, all 17 carry
  `workflow_dispatch:`, **zero** carry a `push:` trigger, so a push fires nothing. One shared SHA
  across all three axes, with a **read-back assertion** that every run's `.headSha` equals the recorded
  value — the v1.17 precedent is defective precisely because it lacked one.

- **D-58:** Evidence is **job-level JSON matched on the DISPLAY-name field**, filtering
  `event == "workflow_dispatch"` AND `headSha == <recorded>`. `gh workflow run` returns no run ID and
  `gh run list` blends dispatch and schedule runs under identical names. `.jobs[].name` is the display
  name, not the YAML job key. **Skips are gaps, not passes.** `[MEASURED]` the legitimate skip anchor
  is `rotting-external-quarterly` at **15 of 17 → 16 of 18**, not the "~14" carried from v1.20 (two
  workflows use `always() && …`, so a literal-string grep undercounts). Illegitimate: any
  `needs: harness-run` cascade skip. `continue-on-error: true` jobs are non-evidence.

- **D-59:** **Exactly one remediation round.** If a job is still red after it, HARN-06 is recorded
  UNMET and the milestone does not ship this phase. Under the single-SHA rule a re-run at a new SHA
  forces Axis-1 and Axis-3 re-runs, which is the round's real cost.

- **D-60:** The owner push is a **named blocking checkpoint with an explicit decline/defer/partial
  branch**. Pre-flights: `git fetch origin && test $(git rev-list --count master..origin/master) -eq 0`,
  and rule on working-tree hygiene first. `[MEASURED]` 208 ahead / 0 behind — re-measure at the
  checkpoint, never carry the number. v1.19's Phase 138 sat blocked for weeks on exactly this shape,
  and everything downstream waits on it, so the branch is specified rather than assumed away.
  — **Reversibility:** one-way — there is no un-push, and the push is the precondition for dispatch.

- **D-61: OWNER-RULED 2026-08-29** — the **Google-style documentation pass ships with v1.21 and is
  recorded as scope.** `[MEASURED]` `scripts/docs-style/` is **tracked** (50 files) with 6 unpushed
  commits inside the 208; it is not untracked residue and cannot be "ruled on and not pushed". It
  lands in `origin/master` and appears in the `v1.21` tag's history. `v1.21-MILESTONE-AUDIT.md` must
  own it explicitly rather than leaving a tag carrying unnarrated work. Splitting it out would mean
  rewriting 208 commits of history at a milestone close with 18 workflows keyed to a shared SHA.

- **D-62: OWNER-RULED 2026-08-29** — the **four orphan planning artifacts are committed before
  archival**: `145-PATTERNS.md`, `146-PATTERNS.md`, `147-PATTERNS.md` and
  `.planning/research/PER-OEM-BIOS-GAP.md`. All four are untracked **inside directories
  `/gsd-complete-milestone` will `git mv`**; untracked files do not travel with a `git mv` and are in
  no commit, so they would silently detach from their archived phases. The other untracked
  populations were reviewed and **not** ruled in this phase — see `<deferred>`.

- **D-63:** `git status --porcelain` **under-reports**. `[MEASURED]` bare = **13** lines;
  `--untracked-files=all` = **107**. The bare form collapses untracked directories. Every hygiene
  measurement in this phase uses the `--untracked-files=all` form.

- **D-64:** Only **Axis-3** runs against the dirty tree. `[MEASURED]` Axis-1 is a fresh
  `git clone --no-hardlinks` (`PROJECT.md:207`/`:265`) and by construction cannot carry untracked
  files. 144 D-18's "Axis-1 and Axis-3 both run against this state" was inherited without re-checking
  and is wrong.

- **D-65:** The four remote atom branches — `origin/phase-119-atom-2`, `-125-atom-2`, `-128-atom-2`,
  `-139-atom-5` — are **audited and reported**; the delete/keep call goes to the owner at the push
  checkpoint. `phase-139-atom-5`'s tip is the headSha on which SWEEP-01/02's completion evidence rests,
  and a deleted remote branch has no reflog.

- **D-66:** `v1.21-DEFERRED-CLEANUP.md` is **freshly authored** — `[MEASURED]` no `v1.21-*` file
  exists in `.planning/milestones/`. But the carry-forward inventory is **sourced from two named
  places, not invented**: `.planning/REQUIREMENTS.md`'s Future Requirements block (which carries
  v1.21-generated deferrals — the 217-of-271 past-due population, the open research questions — that
  exist in no v1.20 file) and `.planning/STATE.md`'s explicit "v1.21 does not pick up and still carries
  forward" list. Preserve every still-open v1.20 entry verbatim; never mask by deletion.

- **D-67:** `V120-PIN-DEFERRAL` and `C17-FROZEN-AWARE-RESIDUE-V15-V19` both **discharge** here. New at
  this close: `V121-PIN-DEFERRAL` (back-anchor invariant) and a successor naming the v1.21 harness's
  own live-HEAD C17 leg (D-46) plus D-21's materialised-set coupling. The **D-28 double-booking
  adjudication is RUN IN WRITING, not asserted** — the closed entry and its successor share an
  identical root cause and differ only in which harness carries it, which is the exact shape
  `144-CONTEXT.md:329-331` flagged. Carry re-scoped **or** drop-and-name-as-new, never both.

- **D-68:** Publish bundle runs with **`--version=v1.21` explicitly**, producing
  `dist/docs-library-v1.21.zip`. `[MEASURED]` `build-publish-bundle.mjs:40` defaults to the literal
  `'v1.17'` and `deriveZipName` accepts it silently. Verify both filenames after the run — `dist/` is
  gitignored, so the post-run check is the only proof that will ever exist. **Neither canary is
  bumped**: `[MEASURED]` both sit at **236** (`build-publish-bundle.mjs:522`, `:525`,
  `build-filename-map.mjs:284`) while `REQUIREMENTS.md` INT-03 still narrates 225; a version-only
  regeneration touches neither.

- **D-69:** The **three Stop hooks are sequenced against D-55's ordering as one decision**, not three
  scattered ones. `[MEASURED]` `.claude/settings.local.json` registers, in order:
  `jira-milestone-gate.cjs` (nudges at execution-complete, **pre-verification** — the known race, so
  hold the active Story In Progress until VERIFICATION passes), `publish-bundle-gate.cjs` (blocks on
  the milestone-complete transition demanding `docs-library-v1.21.zip`, and its idempotency probe will
  not see Phase 152's `v1.21.0.zip`), and `v1.20-carve-gate.cjs` (retired by D-39). Two of the three
  `block()`.

- **D-70:** The close-gate is a **SINGLE commit** flipping all **58** requirements to Validated across
  PROJECT / ROADMAP / STATE / REQUIREMENTS, and **every executor prompt touching it carries the
  commit-contract override** — the default per-task executor commit destroys exactly this shape, which
  this repo learned in Phase 150. A later non-gate commit recording the post-gate apex result is
  permitted and expected. `[MEASURED]` 58 = APP 6 + BIOS 12 + DRV 7 + FIX 12 + HARN 6 + INT 6 + LNX 4
  + RCP 5. `.planning/REQUIREMENTS.md` is **never** `git rm`'d.

- **D-71:** Archival drift is **two classes at two times, and the second is measured AFTER the
  phase-dir move**. Class 1 is the pre-push static census (D-42's scope, not merely
  `scripts/validation/**` reading `.planning/phases/`). Class 2 — `check-phase-54`'s live
  `REQUIREMENTS`/`ROADMAP` reads — can only manifest after the close-gate rewrites those files, and the
  v1.20 precedent proves the measurement is a **post-archival** apex re-run (`PROJECT.md:41`: measured
  101/0/0 both before and after the phase-dir move). D-14's "covered by the post-gate run" was wrong at
  that boundary; the post-gate run happens before archival.

- **D-72:** The `ROADMAP.md:329` mandate **"scan nested-fail children before the push"** is a
  **DYNAMIC** scan and is carried as its own step. A static grep structurally cannot find a child that
  fails only when run nested under the apex.

- **D-73:** The phase's own lifecycle is explicit: **code review of the ~10 new `.mjs` files, the
  `_lib` helper and the workflow; UAT; `/gsd-audit-milestone` producing `v1.21-MILESTONE-AUDIT.md`;
  then `/gsd-complete-milestone` (archive + tag) as the owner-run step AFTER the phase.** Phases 146
  and 150 each shipped Criticals that **only code review caught, with all 101 validators green** —
  this phase authors more new code than either.

- **D-74:** Glossary metadata is **re-measured at plan time and neither field is touched**. The test is
  static frontmatter arithmetic (`review_by − last_verified > 90`) with **no wall-clock term**, so the
  margin cannot decay with time — but v1.21 added terminology and any edit to either field flips the
  difference. Carry STATE.md's own narrowing: **only one workflow** reads glossary metadata live; the
  "six workflows" figure belongs to C17, which is triggered by content, not metadata.

### Cross-cutting guardrails

- **D-75:** **Never write "0 FAIL across the non-nested chain."** The apex sets
  `CHECK_PHASE_NESTED=1` on every child, so it structurally cannot produce a non-nested chain result.

- **D-76:** **Commit messages must not literally quote CARVE paths or amended file paths in prose.**
  `git show --name-only HEAD` prints the message body followed by the file list, and the exclusion
  check greps the combined output.

- **D-77:** **Run the apex chain SEPARATELY from the verifier.** A link or anchor change is a prose
  change and has tripped banned-phrase guards after a passed verifier.

- **D-78:** **No accepted-red disposition carries into v1.21.** Both were discharged and DELETED at the
  v1.20 close. A red job at this close has no absorption clause available.

- **D-79:** **Grep before editing any frozen validator line.** A later `check-phase` can pin an earlier
  one's exact call-site string verbatim. `[MEASURED]` no blob-hash pin and no harness line-pin targets
  the six harness files this phase edits — but the check is run, not assumed, and `V-140-C17CARVEOUT`
  (D-20) is the one adjacent exposure.

### Claude's Discretion

- Internal structure of the eight leaves and the apex within the invariants above; the specific needle
  set for `check-phase-145..151` (derived from each phase's VERIFICATION/SUMMARY measured actuals at
  plan time — `check-phase-152`'s is fully specified by D-29).
- Exact `v1.21-audit-allowlist.json` header values and `BASELINE_25` comment wording.
- Plan decomposition and commit-message subjects (`docs(153-NN):` / `feat(153-NN):`), within the
  ordering constraints of D-09, D-34, D-49 and D-55.
- Section ordering within `v1.21-MILESTONE-AUDIT.md`, inheriting the v1.20 shape.
- The `withDocsAtClose` signature details and its JSDoc, within D-07's constraint.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements and roadmap
- `.planning/REQUIREMENTS.md` §HARN-01..HARN-06 (lines 105-110) — the six requirements this phase
  discharges, including HARN-01's `[MEASURED]` both-branches proof of insert-before-`V14`
- `.planning/ROADMAP.md` lines 315-330 — Phase 153's goal, five Success Criteria, blast radius
- `.planning/PROJECT.md` Pillars G and H — **carries the falsified "Append" instruction at `:25`
  (D-02) and four of the six "five harnesses" surfaces (D-08)**
- `.planning/STATE.md` — Plan-Time Research Flags (the V117/V118/V119 regression-check obligation and
  the full `check-phase-152` needle-spec), Blockers/Concerns, Operator Next Steps, and the
  "does not pick up and still carries forward" list (D-66)

### The exact analogue — read before planning
- `.planning/milestones/v1.20-phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-CONTEXT.md`
  — D-01..D-35, the ratified precedent set. **D-05, D-12, D-14, D-15, D-16, D-29, D-30, D-31** are
  load-bearing here; D-31's append-only ruling is amended by D-06
- `.../144-06-PLAN.md` lines 119-136 — the UNCONVERTED-source rule (D-45), stated in a task title
- `.../144-07-PLAN.md` — the apex authored in its own plan
- `.../144-VERIFICATION.md` and `144-EVIDENCE.md` — the measured close evidence shape

### Upstream handoffs that BIND this phase
- `.planning/phases/152-integration-registry-navigation-last-close/152-04-SUMMARY.md` lines 343-414 —
  the **fully pre-specified `check-phase-152.mjs` needle-spec**. Transcribe; re-derive nothing (D-29).
  Its "same shape the twin uses" claim is false (D-30)
- `.planning/phases/145*/145-VERIFICATION.md` … `151*/151-VERIFICATION.md` — needle sources for the
  seven non-pre-specified leaves. **148 and 151 carry non-transcribable `git diff` assertions** (D-28)
- `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` — `V120-PIN-DEFERRAL` (`:138`) and
  `C17-FROZEN-AWARE-RESIDUE-V15-V19` (`:105`), both discharged here; the latter's heading and its
  `:108-110` sentence are both stale (D-08, D-40)

### Harness surfaces this phase edits or extends
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (`:69`), `V14` at `:147`,
  `readAtClose`, `lsTreeAtClose` (`:244`), `readManyAtClose` (`:301`), CRLF normalisation at `:334`
- `scripts/validation/v1.1{5,6,7,8,9}-milestone-audit.mjs` — the C17 leg at ~`:816-845`, including the
  `SWEEP-05 EXCEPTION` comment at `v1.15:829-832`
- `scripts/validation/v1.20-milestone-audit.mjs` — the sixth C17 leg **and** the sole harness needing a
  full SWEEP-05 conversion (D-09); also the Path-A source, **in its pre-conversion form** (D-45)
- `scripts/validation/c17-eee-contract.mjs` — byte-unchanged. `walkMd('docs')` `:526`, `readFile`
  `:62`, `--self-test` gate `:423`, **empty-corpus `exit(0)` at `:540-545`**, summary string `:585-587`
- `scripts/validation/check-phase-144.mjs` — the apex structural template (D-31)
- `scripts/validation/check-phase-126..132.mjs` — the **content-leaf** template family (D-22)
- `scripts/validation/check-phase-139.mjs` — `V-139-CARVEBLOB` (`:68`, fixed past SHA),
  `V-139-GOVARTIFACTS` (`:137-172`), `V-139-PROBEJOB`, `V-139-FETCHDEPTH` (D-41, D-53)
- `scripts/validation/check-phase-140.mjs` — `V-140-V14PIN` (`:118-143`), `V-140-C17CARVEOUT`
  (`:149-165`)
- `scripts/validation/check-phase-54.mjs` — live `.planning` reads `:30-31`, negative assertion `:347`,
  `V-54-27` whole-tree walk `:437-479`
- `scripts/validation/check-phase-120.mjs:102-113` — `V-120-HYG01`
- `scripts/validation/regenerate-supervision-pins.mjs` — `BASELINE_24` `:548`, `BASELINE_25`
  forward-pointer `:563`, v1.7 hardcodes `:290`/`:336`/`:582`/`:584`
- `scripts/validation/_lib/archive-path.mjs:23-24` — live-path-first resolution (D-37)
- `.github/workflows/audit-harness-v1.20-integrity.yml` — the Path-A workflow source and D-50's
  literal inventory
- `scripts/pipeline/build-publish-bundle.mjs` — `:40` version default, `deriveZipName`, canaries
  `:522`/`:525`

### Governance and hooks
- `.claude/settings.local.json` — three registered Stop hooks (D-69); machine-local and gitignored,
  which is why a source-tree grep misses them
- `.claude/hooks/v1.20-carve-gate.cjs` — retired for v1.21 by D-39
- `.claude/hooks/publish-bundle-gate.cjs`, `.claude/hooks/jira-milestone-gate.cjs`
- `scripts/validation/carve-gate.mjs` — `CARVE_PATH` `:34`, `DEFAULT_BASE` `:35`; NUL-classified
  binary, so a grep census needs `grep -a`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`lsTreeAtClose` + `readManyAtClose`** (`_lib/frozen-at-close.mjs:244`/`:301`) — a single
  `git cat-file --batch` with byte-exact slicing and CRLF normalisation. This is the materialize
  primitive; nothing new needs writing except the tmpdir wrapper.
- **`check-phase-144.mjs`** — the complete apex mechanism: four module-load guards, three HAZARD
  FIXes, `subEnv` propagation, the timeout split. A structural copy, not an inspiration.
- **`check-phase-126..132.mjs`** — the content-leaf family: registry-row, filename-map and nav-section
  needles against `docs/` deliverables.
- **`audit-harness-v1.20-integrity.yml`** — a 13-job Path-A workflow; the 18th is a per-job diff of it.
- **`execFailDetail`** (`_lib/exec-fail-detail.mjs`) — already wired into every C17 leg's catch.

### Established Patterns
- **Path-A lineage** — each milestone copies its predecessor's harness and re-derives every literal.
  The copy source must be the predecessor's **pre-conversion** form (D-45).
- **Back-anchor invariant** — every pin references a PAST close SHA; the successor milestone pins the
  predecessor. `V121` therefore defers to v1.22 (D-46, D-67).
- **Frozen-to-frozen assertions** — `check-phase-63.mjs:208-250`'s idiom; never a live diff inside a
  permanent apex member.
- **Additive succession** — a frozen validator with a false or narrow assertion is superseded by a new
  one, never edited (D-20, and INT-05's precedent from Phase 152).
- **NESTED-aware AUDIT-HARNESS** — every apex skips its harness re-run when nested, which is what
  makes D-56 necessary.

### Integration Points
- `MILESTONE_CLOSE_SHAS` gains `V120`; six harnesses then consume it.
- The new apex `check-phase-153.mjs` becomes chain-terminal; `[48..152]` is contiguous once the eight
  leaves land.
- The 18th workflow joins the dispatch set; `V-139-PROBEJOB` and `V-139-FETCHDEPTH` bind it on
  authoring.
- The close-gate rewrites the two files `check-phase-54.mjs` live-reads.

</code_context>

<specifics>
## Specific Ideas

- **The review that produced this document.** 4 parallel Finders → Adversary → Referee, over a written
  recommendation set. 80 raw findings, 67 adjudicated real, 8 false positives, 44 distinct defects
  after netting, plus 7 items no Finder raised. Five draft recommendations were **factually wrong about
  the repo** — the CARVE census scope, the "only surviving obligation", the conversion ordinal, the
  working-tree enumeration, and the count guard — and are corrected at D-40, D-41, D-10, D-63 and D-16
  respectively.

- **All 16 `[MEASURED]` rows in the draft were independently re-verified TRUE** by a second agent. This
  is the first phase in several where no fabricated measurement was found; the discipline that produced
  it (re-run the command, cite the line) is worth keeping.

- **The two largest findings were both invisible to every gate.** D-56 (the apex is structurally blind
  to HARN-03's entire deliverable) and D-45 (the Path-A copy source) each produce a **green, wrong**
  artifact. Neither would have failed a single validator.

- **D-22's reframe came from asking whether the precedent family was right at all**, not from checking
  the precedent's details. Phase 144 is the structural twin for the *close*, but v1.20 was a tooling
  milestone and v1.21 is a content one — four separate complaints about needles collapsed into one
  wrong premise.

</specifics>

<deferred>
## Deferred Ideas

- **~92 `fireworks-tech-graph` files** under `.claude/skills/` and `.agents/skills/` — genuinely
  untracked, and `.claude/` is **not** gitignored (only `settings.local.json` and `tmp/` are), so they
  are swept into any `git add -A`. Reviewed at the discussion and **not ruled in this phase**. Needs a
  gitignore/commit/delete decision in its own right.
- **`.planning/config.json`** — the one MODIFIED tracked file (`_auto_chain_active: true→false`), the
  only thing a `git commit -a` would carry. Reviewed and not ruled here.
- **`e1`, `e2`, `ee`** — stray git stderr captures at 0/59/96 bytes in the repo root. Reviewed and not
  ruled here; harmless, but present in the tree the owner pushes and Axis-3 reproduces against.
- **`V-140-C17CARVEOUT`'s stale name and detail string** (D-20) — the additive successor validator is
  authored here, but the underlying class (frozen validators whose prose outlives their truth) belongs
  to a future tooling pass alongside `check-phase-125.mjs:86`'s wrong archive token.
- **`REQUIREMENTS.md` INT-03's stale 225 figure** versus the live 236 canaries (D-68) — a
  documentation correction, not a v1.21 requirement.
- **The NESTED-guard asymmetry** (D-56, second order) — once harnesses are frozen-aware, the
  "skip … against evolved corpus" rationale no longer holds, but 119/125/128/134/138 are frozen and
  cannot be edited. Belongs to whatever milestone revisits apex evidence design.
- **`.planning/seeds/SEED-001`** — still stale-but-open; not folded into v1.21.

</deferred>

---

*Phase: 153-Harness Close — V120 Pin, C17 Frozen-Aware Residue & 19th Path-A Lineage Bump*
*Context gathered: 2026-08-29*
