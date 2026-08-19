# Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair - Context

**Gathered:** 2026-08-04
**Status:** Ready for planning

<domain>
## Phase Boundary

The milestone's enabling layer. This phase delivers (a) one named milestone-scoped
governance contract that authorizes and bounds every frozen-surface edit in v1.20,
(b) the `fetch-depth: 0` retrofit that makes frozen reads execute in CI at all,
(c) fail-loud repair of the silent-swallow frozen-read sites, and (d) the
`lsTreeAtClose()` frozen enumeration API that Phase 140's harness conversion consumes.

**No assertion changes behaviour. No corpus content is authored or edited.**
Requirements in scope: GOV-01, GOV-02, SWEEP-01, SWEEP-02, SWEEP-03, SWEEP-04.

</domain>

<decisions>
## Implementation Decisions

Every decision below was produced by `/grill-me` codebase interrogation followed by a
scored `/adversarial-review` (3 parallel Finders → Adversary → Referee). 72 issues found,
12 disproved, **61 confirmed** (17 CRITICAL / 26 MEDIUM / 18 LOW). The review **reversed
ten** of the pre-review recommendations, including two load-bearing ones (A3, C1). Every
`[MEASURED]` figure was executed against live code at HEAD `347c20a8`.

### Governance — the CARVE contract (GOV-01)

- **D-01:** The CARVE is a single artifact at `.planning/milestones/v1.20-CARVE.md` — narrative
  rationale plus a fenced, machine-parseable allowlist block in the same file. NOT a phase-dir
  document and NOT a separate sidecar JSON. Phase-dir placement would create a
  `resolveArchivedPhasePath(..., ['v1.20-phases'])` call site replayed on every future apex, with
  the silent-null failure mode. A separate JSON under `scripts/` would sit inside the gate's own
  scope, bound to nothing, and any blocked plan could clear a gate failure by appending one line
  to it — self-authorizing. One file under `.planning/` makes `allowlist ⊆ narrative` true by
  construction. — **Reversibility:** costly — relocating it later moves a path that the Phase 144
  close-gate validator and every 140–143 plan's verification step reference.

- **D-02:** The artifact is named **`v1.20-CARVE`**, never `CARVE-1`. `CARVE-1` and `CARVE-2` are
  live v1.18 Phase 133 tokens that v1.20's own REQUIREMENTS Out-of-Scope table cites
  ("CARVE-1's routing bars it from folding into a content milestone") and that v1.20 is the
  milestone which *discharges*. Two `CARVE-1`s in one planning corpus breaks greps and makes the
  Phase 144 close audit ambiguous. Owner-ratified.

- **D-03:** The allowlist is authored by **CATEGORY, not by file enumeration**, and spans Phases
  **139–144**. Enumeration is structurally impossible — Phase 141's file set
  (`regenerate-supervision-pins.mjs:204-238`), Phase 142's (`check-phase-30/31.mjs` plus the
  `check-phase-68.mjs` regression surface) and Phase 143's are only discoverable in those phases.
  Categories are knowable today. The eight categories: all 16 `audit-harness-*.yml` plus the 17th
  born in Phase 144; all `scripts/validation/v*.*-milestone-audit.mjs`; the **nine Pillar-C files**
  (`c17-eee-contract.mjs`, `convert.ps1`, `check-nav-hub-links.mjs`, 6× `retrofit-*.mjs`);
  `_lib/frozen-at-close.mjs` and `_lib/archive-path.mjs`;
  `check-phase-{30,31,48,49,51,60,61,62,63,64,65,66,68,69,70}.mjs`;
  `regenerate-supervision-pins.mjs`; the gate's own artifacts, self-listed; and
  `docs/_glossary-macos.md` plus `docs/admin-setup-ios/**` for LINK-03's 13 fixes.
  — **Reversibility:** one-way — the allowlist is the authorization of record for five phases of
  frozen-surface edits; narrowing it retroactively invalidates edits already landed under it.

- **D-04:** The span extends to Phase **144**, not 143 as the ROADMAP hard constraint currently
  reads. Phase 144 makes the milestone's largest frozen-surface edits (V119 pin, new harness,
  apex regeneration, 17th workflow) and is otherwise ungoverned. This edits a ROADMAP Hard
  constraint. Owner-ratified.

- **D-05:** The CARVE must **NOT** record that v1.20 "reverses" Phase 133's D-04. D-04 barred a
  close-SHA `ref:` checkout because it makes a frozen harness validate the frozen tree against
  itself — CI-layer masking. Adding `fetch-depth: 0` changes no `ref:`. The CARVE records the
  opposite: **D-04 remains in force; no workflow may set `ref:` to a close SHA; `fetch-depth: 0`
  is orthogonal.** A written "reversal" would put authorization for close-SHA checkout into the
  governance artifact. Owner-ratified.

### Governance — the gates (GOV-01, GOV-02)

- **D-06:** The byte-unchanged gate is **diff-based**, corrected on three mechanics that the
  review empirically falsified. It uses `git diff --name-status` (not `--name-only` — after a
  `git mv`, `--name-only` emits only the destination path, so an off-list file renamed onto an
  on-list path passes silently). It diffs against the base **without** `..HEAD` (with `..HEAD` a
  dirty working tree is invisible, and D-08 invokes the gate in verification steps where trees
  routinely carry uncommitted work). It adds `git status --porcelain --untracked-files=all`,
  because a new off-list `scripts/*.mjs` is invisible to every `git diff` form. Scope is
  `scripts/ .github/ docs/ .gitattributes package.json`, with `.planning/` deliberately excluded
  and the exclusion stated in the artifact.

- **D-07:** The gate is a **milestone-lifetime script only** — `scripts/validation/carve-gate.mjs`
  — and is explicitly **NOT** adopted as a `check-phase-139.mjs` assertion. A live-HEAD diff
  assertion frozen into a permanent apex chain member goes RED at the first v1.21 content commit
  and stays red forever, manufacturing exactly the accepted-red class this milestone's bar
  requires deleting. Phase 144's `check-phase-139.mjs` instead asserts frozen-to-frozen facts
  using the `check-phase-63.mjs:208-250` pattern: the CARVE exists at the v1.20 close SHA, its
  allowlist block parses, and its row set matches a recorded count. — **Reversibility:** one-way —
  once a validator joins `CHAIN_PHASES` it is replayed by every future apex and cannot be removed
  without a chain-array edit that later validators pin.

- **D-08:** Enforcement is the gate script **plus a `.claude/hooks/` Stop-hook** modelled on
  v1.17 HOOK-01's `publish-bundle-gate.cjs` (read-only, nudge-then-warn). "Invoked in every plan's
  verification step" alone is discipline, not enforcement — it runs only if the plan author
  remembered, and Phase-144 detection is post-hoc, after all 139–143 edits have landed. The hook
  gives real enforcement from Phase 139 onward with zero CI topology change.

- **D-09:** **Allowlist amendment procedure.** An amendment is a commit touching **only** the
  CARVE, carrying a one-line rationale, landed **before** the edit it authorizes — never in the
  same commit. This is what makes the allowlist non-self-authorizing. The gate enforces it: a
  commit that changes both the CARVE and an off-list file fails.

- **D-10:** **Gate failure disposition.** Hard-block on non-zero exit in a plan's verification
  step; the Stop-hook nudges on first fire and warns on second. The only resolution path for an
  off-list hit is a D-09 amendment commit — no warn-and-continue. Gate failure is the *expected*
  steady state for Phases 140–143, and an undefined disposition degrades to a warning on first
  contact.

- **D-11:** GOV-02 evidence goes to a single append-only ledger at
  `.planning/milestones/v1.20-GOV-02-LEDGER.md` — one row per frozen-surface edit (file, grep
  command, hit count, regression gate run, result), one commit per plan. Milestone-level
  placement (not phase-dir) dissolves both the archival-drift call site and the hazard of Phases
  140–143 mutating a completed Phase 139's artifact. Phase 144 asserts **row-per-edit** (every
  frozen-surface path in the diff-vs-v1.19-close has a matching row), never a bare row count — a
  count proves rows exist, not that each edit has one.

- **D-12:** The GOV-02 grep must be **target-scoped, not symbol-scoped**. The pre-review grep
  searched `PRED_BLOBS` / `V-69-08` / `V-70-17` — symbol names — and missed
  `check-phase-66.mjs:42`, which holds `CI_WORKFLOW = '.github/workflows/audit-harness-v1.6-integrity.yml'`
  asserted by `V-66-05` against a required-substring list. It survives an additive insert by luck,
  not method. Every GOV-02 grep enumerates references to the **file path** as well as the symbol.

### fetch-depth retrofit (SWEEP-01)

- **D-13:** The retrofit covers **all 97 shallow checkouts across all 16 workflows** — not the 32
  in the three named files, and not the 45 of an intermediate scope. `[MEASURED]` 182 checkouts
  repo-wide, 85 already deep, 97 shallow: 32 in the three all-shallow files plus exactly 5 per
  file in the other 13 (`parse`, `path-match`, `harness-run`, `rotting-external-quarterly`,
  `pin-helper-advisory`). Every one of the 16 workflows carries a shallow `harness-run`, and
  Phase 140's SWEEP-05 converts harnesses v1.4–v1.19 to frozen reads — so the 13 unnamed
  `harness-run` jobs would hard-crash. An intermediate 45 pays the same amendment price while
  leaving 52 shallow checkouts and an uncheckable invariant. Owner-ratified.

- **D-14:** This is recorded as an explicit **success-criterion amendment**, not a "clarification".
  `[MEASURED]` `REQUIREMENTS.md:16` and ROADMAP Phase 139 SC#2 enumerate **identically** — same
  three files, same 4/18/10 counts. The pre-review claim that the requirement text covered the
  extension while the roadmap under-enumerated was **fabricated**; both documents are structurally
  the same. Phase 144's close-gate must read the extension as authorized, not as drift.

- **D-15:** The falsifiable invariant is **repo-wide**, not per-file: *every `actions/checkout@v4`
  step in `.github/workflows/` is followed by `fetch-depth: 0`*. The per-file form
  (`count(fetch-depth: 0) == count(actions/checkout)`) is false for 13 of 16 files under any
  partial scope. The grep pattern `fetch-depth: 0` (with the space) is safe against the 13 header
  comments, which are written `fetch-depth:0` without a space — verified, 85 real matches, zero
  comment matches.

- **D-16:** Uniform coverage over selective is correct because `fetch-depth: 0` is **monotonic** —
  it strictly widens the available object graph and can change no job's semantics, only runtime
  and disk. Independently confirmed for the over-covered jobs: `regenerate-supervision-pins.mjs`
  has zero `execSync`/`execFileSync`/`spawnSync` calls (its git mentions are comments), and
  `rotting-external-quarterly` is pure `npm install` + `markdown-link-check` over a sidecar JSON.
  Cost is bounded by a 22.97 MiB pack over 2994 commits.

- **D-17:** While in the workflow files, add `.github/workflows/**` to
  `audit-harness-integrity.yml`'s `paths` filter — it does not currently watch its own file, which
  is the exact selectively-retrofitted defect class this phase repairs.

### The frozen-surface blocker — V-69-08 / V-70-17 (SWEEP-01, GOV-02)

- **D-18:** `check-phase-69.mjs:37-41` and `check-phase-70.mjs:73-77` each carry an identical
  `PRED_BLOBS` map pinning the git blob hashes of exactly the three workflows SWEEP-01 must edit;
  `V-69-08` and `V-70-17` compare them via `git hash-object`. `[MEASURED]` the live hashes match
  the pins exactly, and both validators are apex chain members. Editing any of the three workflows
  takes the apex chain RED. This is not flagged in ROADMAP.md or REQUIREMENTS.md — it is the
  GOV-02 failure class, surfaced by the grep-before-edit discipline the phase itself mandates.

- **D-19:** The remedy is to make the pins **frozen-to-frozen**, not to re-baseline them. Replace
  `git hash-object <worktree path>` with `git rev-parse <V17>:<path>` compared against the recorded
  baseline blob, following the live precedent at `check-phase-63.mjs:208-250` whose own comment
  reads *"frozen-aware: compare the blob AT v1.13-close … (frozen-to-frozen, always equal)"*. Both
  sides of the comparison are immutable and the live file never enters it. The pre-review rejection
  of this option — "the frozen blob is the pre-edit content, so it would fail permanently after the
  edit" — is **exactly backwards**, and it rested on a `[MEASURED]` claim that `git hash-object` was
  the only byte-unchanged-gate precedent. The literal string is only in 69/70; the **gate class**
  has a third, better instance. — **Reversibility:** costly — undoing means re-editing two apex
  chain validators plus whatever later validator pins their new call-site strings.

- **D-20:** This single move discharges four otherwise-confirmed hazards: the working-tree
  atomicity problem (`git hash-object` reads the worktree, so the apex goes red the instant a YAML
  is saved, before any commit — a single atomic commit does not close that window); the silent
  weakening of the invariant (a re-baseline shrinks the drift window from "unchanged since v1.7
  close" to "unchanged since v1.20 Phase 139", discarding ~15 months of protection while the
  check's own `name` and `detail` strings still read "BYTE-UNCHANGED"); the `core.autocrlf`
  environment dependence (`core.autocrlf = true` and `.gitattributes` carries exactly one line —
  no `* text=auto`, no `*.yml eol=lf` — so the pin's correctness depends on unversioned local git
  config); and the forced second re-baseline that the probe-step evidence design would otherwise
  require.

- **D-21:** No `.gitattributes` change. D-19 removes the `hash-object`/`core.autocrlf` dependence
  entirely; recording this prevents someone re-adding `*.yml text eol=lf` later on stale reasoning.

- **D-22:** The `check-phase-63` precedent is adopted with one amendment — its
  `catch → { pass: true, skipped: true }` is the same swallow class SWEEP-03 deletes. The new pins
  fail loud with the D-27 typed cause.

### CI evidence (SWEEP-01 SC#2, SWEEP-02)

- **D-23:** SWEEP-02's success criterion as written is **structurally unobtainable in Phase 139**.
  `[MEASURED]` all 14 `check-phase-48..61` jobs in the v1.5 workflow and all 7 in the v1.6 workflow
  are `needs: harness-run`; both harnesses exit 1 at HEAD (v1.5: C5+C10 fail on 90d>60; v1.6:
  likewise). The 11 SWEEP-02 validators therefore report `conclusion: skipped`, never `success`,
  and no dispatch on any ref changes that. The greening depends on Phase 141's RED-01. Phase 139
  cannot be marked Validated against the current wording.

- **D-24:** The re-scope is a dedicated **`frozen-read-probe` job with no `needs:`**, one per
  retrofitted workflow, running a `git show <old-sha>:<path>` frozen read plus one real
  `readAtClose` call. It is immune to the harness-run fan-out and produces SWEEP-01 SC#2's evidence
  in a single dispatch. SWEEP-02 and ROADMAP SC#3 are re-worded to accept it. Owner-ratified.

- **D-25:** The dispatch is from a **short-lived feature branch**, never master —
  `gh workflow run --ref <branch>`. The workflow files already exist on `origin/master`, which is
  all `workflow_dispatch` requires for API availability; the ref selects which content runs. A
  master push mid-milestone has no precedent (every recorded push is at close) and would fire the
  full 16-workflow cascade while Phases 140–143 debt is still red. Evidence is job-level JSON
  (`gh run view <id> --json jobs`), never the checks-UI colour — a green run is compatible with a
  cron-skipped quarterly job and a `continue-on-error: true` advisory job. Owner-ratified as G3.

- **D-26:** The "previously threw" half of the evidence comes from the **local `file://` shallow
  clone** (D-31), not from a pre-retrofit CI dispatch. A pre-retrofit dispatch buys nothing under
  D-23, costs a second owner authorization, and would require a probe step to exist pre-retrofit —
  i.e. a second workflow edit.

### Fail-loud frozen reads (SWEEP-03)

- **D-27:** "Fail loud" means **deleting the `try/catch`** and letting the throw propagate — not
  converting to an explicit `{ pass: false }` return. `[MEASURED]` the live runner in
  check-phase-49/51 already wraps `check.run()` in
  `try { } catch (e) { result = { pass:false, detail: "Unexpected error: " + e.message }; }` then
  `process.exit(failed > 0 ? 1 : 0)`. Every consequence the pre-review reasoning feared under this
  option — opaque exit, losing sibling assertions, 500-char truncation — is already handled. This
  is the smallest diff, needs no per-site message formatting, and carries the typed cause for free.
  **Constraint:** `check-phase-60.mjs:247` truncates at `n: 500`, so the cause must be emitted at
  the **front** of the message, never appended.

- **D-28:** The absent-path vs unreachable-SHA discrimination lives **once inside
  `_lib/frozen-at-close.mjs`** as a typed `err.frozenCause`, not three times at the call sites —
  but with a **six-pattern union**, not the two the pre-review reasoning assumed.
  `unreachable-sha` ← `invalid object name` | `Not a valid object name` | `not a tree object`.
  `absent-path` ← `does not exist in` | `exists on disk, but not in`. Everything else → `other`.
  `[MEASURED]` the most realistic production case — a file added *after* the frozen SHA — emits
  `exists on disk, but not in` and would have fallen to `other` under the two-pattern design.

- **D-29:** Two properties of the taxonomy must be recorded, not assumed away: classification is
  **worktree-dependent** (the same call classifies differently in a clean checkout versus one where
  the file was deleted), and it works today only because every pin is a 7–8 character abbreviation.
  The library must not assume abbreviation — a future full-length pin changes the message.

- **D-30:** Phase 139 fixes **four** sites, not three: the SWEEP-03-named `check-phase-49.mjs:264`,
  `check-phase-49.mjs:297`, `check-phase-51.mjs:31`, plus `check-phase-49.mjs:334` — a fourth site
  in the very file being edited, 37 lines from `:297`, same file and same grep, zero marginal cost.
  Two corrections of record on the pre-review framing: `[MEASURED]` `check-phase-51.mjs:31` is
  **not** a silent-null — `V-51-06..11` all carry `if (c === null) return { pass:false }`, and a
  real shallow-clone run produced `19 passed, 6 failed` with `V-51-06..11 FAIL -- File missing`,
  making it the *same* wrong-diagnosis defect as `:264`. And `check-phase-49.mjs:297` does not pass
  vacuously — `winContent`/`macosContent` are still read live, so a shallow run scans 66 of 88
  sibling terms: a ~25% silent coverage loss, latent, not vacuity. Owner-ratified.

- **D-31:** The negative test uses `git clone --depth 1 file:///D:/claude/Autopilot` — the
  `file://` form is **mandatory and goes verbatim into the success criterion** — plus a hard guard
  asserting `.git/shallow` exists before the test body runs. `[MEASURED]` the plain local form
  emits `warning: --depth is ignored in local clones; use file:// instead.`, produces no
  `.git/shallow`, retains all 2994 commits, and lets `git show ba2cbc0:…` succeed. As originally
  specified, SWEEP-03's own success-criterion test would have been a silent-green — the exact
  failure class this milestone exists to delete. Three cases, not two: unreachable SHA; a path
  absent from both disk and SHA (`does not exist in`); and a path present on disk but absent at
  the frozen SHA (`exists on disk, but not in`) — the realistic production case the two-case design
  never exercised.

- **D-32:** Fail-loud lands **before** the workflow retrofit — option unchanged from the
  pre-review recommendation, rationale replaced. The original justification (a pre-retrofit CI run
  shows which jobs were silently inert) is void under D-23. The honest reason: shipping the
  retrofit first would leave known silent-swallow sites in the tree at the end of the phase that
  names them.

- **D-33:** The remaining ~34 swallow sites are recorded as a **new requirement SWEEP-09, scoped
  to Phase 141**, where those validators are already open for RED-03. `[MEASURED]` the defect class
  is ~38 `catch → null/""` frozen-read sites across 20 validators, not the 3 SWEEP-03 names.
  Recorded explicitly: `check-phase-61.mjs:39-45` (`readAtV15CloseFor61`) **cannot** be fixed at
  the library root — it carries its own inline `execFileSync` reader, does not import
  `frozen-at-close.mjs` for these reads, is one of the 11 SWEEP-02 validators, and is pinned in
  place by `check-phase-68.mjs:202` `V-68-10`. Owner-ratified.

### lsTreeAtClose() API (SWEEP-04)

- **D-34:** Signature is `lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {})` plus per-milestone
  convenience exports (`lsTreeAtV15Close(dir)`), mirroring `readAtClose`. A raw-SHA form is
  rejected: it bypasses the pin gate at `frozen-at-close.mjs:109-110`, which is the module's entire
  governance value. Phase 140's V14 choice and Phase 142's possible v1.3 pin are new
  `MILESTONE_CLOSE_SHAS` entries, not API changes — and the V14 gap is not a hidden blocker, it is
  `REQUIREMENTS.md:19` SWEEP-08, a Phase 140 requirement with its own ROADMAP SC#4 and a named
  design fork. — **Reversibility:** costly — the signature is consumed by ~150 call sites across
  17 harnesses in Phase 140.

- **D-35:** The options bag exists because the pre-review "unfiltered, callers already filter"
  rationale was **factually false**. `[MEASURED]` all 17 harnesses have exactly one
  `endsWith('.md')` and it is *inside* `walkMd` (`v1.5-milestone-audit.mjs:62`); every call site is
  a bare `for (const abs of walkMd(d)) paths.add(relNormalize(abs))`. Unfiltered would impose ~150
  new filter edits on Phase 140 on top of stripping every `relNormalize(abs)` wrapper — `walkMd`
  returns **absolute** paths, `lsTreeAtClose` returns repo-relative. This is not a drop-in
  replacement and must not be planned as one.

- **D-36:** Error semantics: **throw on any git failure; return `[]` only for a valid-but-empty
  prefix.** `[MEASURED]` `git ls-tree -r --name-only <sha> -- <nonexistent-dir>` exits 0 with empty
  output while an unreachable SHA exits 128 — cleanly distinguishable, so this costs nothing.
  Returning `[]` on failure would make a shallow CI job enumerate zero files, pass every per-file
  assertion vacuously, and report **green while auditing nothing** — strictly worse than
  silent-null. — **Reversibility:** one-way — a consumer written against `[]`-on-failure cannot be
  retrofitted to throw without re-auditing every harness that swallowed it.

- **D-37:** Invocation is `git ls-tree -r -z --name-only <sha> -- <prefix>`, split on NUL, with
  **`.filter(Boolean)` mandatory** — this is part of the decision, not left to the implementer.
  `[MEASURED]` without `-z`, git quotes and octal-escapes non-ASCII paths (`d/café.md` →
  `"d/caf\303\251.md"`); with `-z`, git NUL-*terminates* the final entry, so a naive `split('\0')`
  yields a phantom empty element — 35 entries where the truth is 34. That off-by-one lands directly
  on the self-test's exact-count assertion.

- **D-38:** Specify the options surface explicitly, mirroring `readAtClose`: `timeout` (10000),
  `stdio: ['ignore','pipe','pipe']` — which is what makes `err.stderr` available to D-28's
  classifier at all — plus `cwd` and a `maxBuffer` sized above the 203 KB a full-tree `-r`
  already emits against Node's 1 MB default.

- **D-39:** The `--self-test` carries **six** assertions: (i) exact count **34** for
  `lsTreeAtV15Close('docs/l1-runbooks')` — `[MEASURED]` 34 at `ba2cbc0`, 42 at HEAD, so the exact
  count alone catches a HEAD-enumeration regression; (ii) a known member path present; (iii) an
  unpinned tag throws; (iv) a valid-but-empty prefix returns `[]`; (v) a `file://` shallow-clone
  arm asserting the typed `unreachable-sha` throw — the only environment where D-36 matters and
  the one the original design never tested; (vi) a printed wall-clock number for a full-corpus
  enumeration plus read.

- **D-40:** Assertion (vi) exists because Area B otherwise locked a frozen-surface API with no
  performance lever while SWEEP-06 (Phase 140 SC#2) hinges on that shape. `[MEASURED]` ~75 ms per
  git spawn; `check-phase-60.mjs:261` uses `timeout: 60000` while **every** peer (61, 62, 63, 64,
  65, 66, 67, 68, 69) uses `300000`, and `check-phase-68.mjs:218` `V-68-11` asserts `300000` across
  62..66 only — so 60 s is a single unguarded outlier that all of SWEEP-06 is pinned to. Phase 139
  produces the number instead of Phase 140 discovering it.

### Corrected atom ordering

- **D-41:** Five atoms, in this order. (1) The CARVE plus `carve-gate.mjs` plus the Stop-hook plus
  the ledger — **nothing may land before it**, since GOV-01 governs every edit across 139–144 and
  the categorical allowlist no longer waits on the D-13 scope ruling. (2) `_lib/frozen-at-close.mjs`
  — typed `frozenCause`, `lsTreeAtClose`, `--self-test`. (3) The four fail-loud call sites plus the
  `file://` negative harness. (4) `check-phase-69/70` `PRED_BLOBS` → frozen-to-frozen — **moved
  ahead of the workflow edit**, which is what makes atom 5 free. (5) The 97-checkout sweep plus the
  `frozen-read-probe` job plus the D-17 paths fix, one commit. Then the owner-gated feature-branch
  push and single dispatch.

- **D-42:** Two regression gates are required that the pre-review reasoning did not identify.
  First, `V-68-01` is **not usable as stated** — `[MEASURED]` `check-phase-51.mjs` contains two
  matches for its regex, at `:18` (in `readFile`) and `:93` (inside `V-51-05`), so deleting
  `readFile`'s normalization still passes; the gate must target `:18` specifically. Also re-read
  the regex from `check-phase-68.mjs:57` rather than transcribing it — the source is
  `['"]\\n['"]`, and a transcription to `['"]\n['"]` never matches. Second, atom 2 changes
  `readAtClose`'s throw shape with 21 other importers untouched — run all 24 importers before and
  after and assert `err.message` shape is unchanged.

### Claude's Discretion

- Exact wording of the CARVE narrative, ledger row schema, and gate CLI flags.
- Whether `carve-gate.mjs` and the Stop-hook share a module or duplicate a small helper.
- Naming of the `frozen-read-probe` job and its step layout.
- How the `--self-test` prints assertion (vi)'s wall-clock number.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements and roadmap
- `.planning/REQUIREMENTS.md` — SWEEP-01..04 and GOV-01/02 text; the Out of Scope table
  (note `:112` bars editing `v1.7-audit-allowlist.json` or relaxing the classifier, and `:116`
  bars new content documentation of any kind)
- `.planning/ROADMAP.md` §"Phase 139" — goal, 5 success criteria, hard constraints;
  §"Phase 140" and §"Phase 144" for the downstream contracts this phase enables
- `.planning/PROJECT.md` §"Current Milestone: v1.20" — the five pillars and three corrections
  of record

### The frozen-read library and its consumers
- `scripts/validation/_lib/frozen-at-close.mjs` — `readAtClose` at `:108-116`, the pin gate at
  `:109-110`, `MILESTONE_CLOSE_SHAS` at `:28-97`, V14 omission rationale at `:94-96`
- `scripts/validation/_lib/archive-path.mjs` — `resolveArchivedPhasePath` at `:19`; the
  "CALLER OWNS FAIL SEMANTICS — does not throw and does not swallow" contract at `:7`
- `scripts/validation/check-phase-49.mjs` — swallow sites at `:264`, `:297`, `:334`
- `scripts/validation/check-phase-51.mjs` — `readTreeFrozen` at `:31`; `readFile` CRLF
  normalization at `:18` (the D-42 gate target); second regex match at `:93`
- `scripts/validation/check-phase-61.mjs` `:39-45` — `readAtV15CloseFor61`, the inline reader
  that D-33 records as unfixable at the library root

### The byte-unchanged gate precedents
- `scripts/validation/check-phase-63.mjs` `:208-250` — `V-63-08`/`V-63-09`, the frozen-to-frozen
  blob gate D-19 adopts
- `scripts/validation/check-phase-69.mjs` `:37-41` and `:138-162` — `PRED_BLOBS` and `V-69-08`
- `scripts/validation/check-phase-70.mjs` `:73-77` and `:342-364` — `PRED_BLOBS` and `V-70-17`
- `scripts/validation/check-phase-66.mjs` `:42` and `:154-176` — `CI_WORKFLOW` and `V-66-05`,
  the D-12 target-scoped-grep example
- `scripts/validation/check-phase-68.mjs` `:51-61` (`V-68-01`), `:202` (`V-68-10`),
  `:218` (`V-68-11`) — the pins that constrain atoms 2, 3 and 4

### Chain and CI topology
- `scripts/validation/check-phase-138.mjs` `:104-124` — the live apex, 90 entries spanning
  `[48..137]` (not `[48..138]`; that is the future apex per HARN-18)
- `scripts/validation/check-phase-60.mjs` `:247` (500-char truncation), `:255-261`
  (`V-60-23` nested-skip), `:261` (the 60 s outlier)
- `.github/workflows/audit-harness-integrity.yml`, `audit-harness-v1.5-integrity.yml`,
  `audit-harness-v1.6-integrity.yml` — the three all-shallow files
- `.github/workflows/audit-harness-v1.7-integrity.yml` … `-v1.19-integrity.yml` — the 13 with
  5 shallow jobs each
- `scripts/validation/v1.5-milestone-audit.mjs` `:50-66` and `:105-168` — `walkMd` and its
  call sites, the D-35 evidence

### Governance precedents
- `.planning/milestones/v1.18-phases/133-chain-validator-tooling-debt-closure/133-CONTEXT.md`
  `:27` — Phase 133 D-04, which D-05 preserves rather than reverses; `:42` and `:109` — the
  original `CARVE-1` token D-02 avoids colliding with
- `.planning/milestones/v1.18-phases/133-chain-validator-tooling-debt-closure/133-ONE-N-ATTESTATION.md`
  — the attestation-artifact shape; note `check-phase-133.mjs:10` states the validator
  **cannot** needle-check it, so it is precedent for a human-only artifact, not a gated one
- `.claude/hooks/publish-bundle-gate.cjs` (v1.17 HOOK-01) — the Stop-hook pattern D-08 adopts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `readAtClose` + `MILESTONE_CLOSE_SHAS` — `lsTreeAtClose` mirrors the signature and reuses the
  pin gate; the typed `frozenCause` is added to both readers in one place.
- `check-phase-63.mjs:208-250` frozen-to-frozen blob gate — copied for the D-19 pin conversion.
- v1.17 HOOK-01's `publish-bundle-gate.cjs` — the read-only nudge-then-warn Stop-hook shape.
- The `V-69-08` / `V-70-17` drift-report loop — structure survives; only the comparison source
  moves from worktree to frozen tree.

### Established Patterns
- Chain validators report PASS/FAIL rows and exit non-zero via `process.exit(failed > 0 ? 1 : 0)`;
  the runner already catches throws from `run()`. This is what makes D-27 the smallest diff.
- Frozen-aware conversions keep expected patterns unchanged and move only the read *source*
  live → frozen, with honest-accounting comments citing the authorizing SUMMARY.
- `CHECK_PHASE_NESTED=1` short-circuits chain guards and harness re-runs; the apex is O(n),
  ~17 s, 93 PASS / 0 FAIL / 0 SKIPPED at HEAD.
- Frozen call-site pinning: a later validator may pin an earlier file's exact call-site string
  verbatim. Grep before editing any frozen validator line (D-12).

### Integration Points
- `_lib/frozen-at-close.mjs` is imported by 24 validators — 21 of which this phase does not
  edit, hence D-42's blast-radius gate.
- The 97 checkout steps across 16 workflow files.
- `check-phase-69/70` sit inside the apex chain, so atom 4 is chain-visible immediately.
- Phase 140 consumes `lsTreeAtClose` at ~150 `walkMd` call sites across 17 harnesses.

</code_context>

<specifics>
## Specific Ideas

- The owner directed that gray areas be resolved by `/grill-me` followed by
  `/adversarial-review`, with each question's options scored and a best option recommended with
  reasoning. That process produced this document; its four owner gates were ruled directly
  (D-13/D-14, D-24, D-30/D-33, and G3/G4 plus D-02/D-05).
- Standing project rule carried into this phase: *a corpus edit requires proof the document is
  wrong, not merely that a frozen assertion disagrees with it.*
- Zero-margin hazard, restated: both glossaries sit at exactly 90 days against a `>90` test.
  Do not touch either glossary's `last_verified` / `review_by` to satisfy any assertion anywhere
  in this milestone.

</specifics>

<deferred>
## Deferred Ideas

- **SWEEP-09 — the remaining ~34 silent-swallow frozen-read sites** across ~19 validators.
  New requirement, Phase 141, where those validators are already open for RED-03 (D-33).
- **`if: always()` on the fanned-out validator jobs.** The `needs: harness-run` skip fan-out is
  itself a masking mechanism — ~21 jobs report `skipped` rather than their own truth. Deleting it
  serves the milestone bar, but only *after* Phase 141 greens the harnesses; doing it in Phase 139
  converts ~21 masked jobs into ~21 red ones. Phase 141.
- **V14 pin SHA choice** (`b5cf529` vs `671f72a`, 34 seconds apart and not equivalent) — Phase 140,
  SWEEP-08, already a named roadmap design fork.
- **`walkMd` beyond the harnesses.** 30 definitions repo-wide including `check-phase-30/54/55/56.mjs`,
  `c17-eee-contract.mjs:67`, and `check-nav-hub-links.mjs`. Only the harness copies are in Phase
  140's conversion scope; the rest are untouched.
- **Moving `PRED_BLOBS` to a sidecar** so future re-baselines never require editing two frozen
  validators. Moot under D-19 (frozen-to-frozen needs no re-baseline), but revisit if Phase 144's
  17th workflow creates a similar twin-map problem.

</deferred>

---

*Phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair*
*Context gathered: 2026-08-04*
