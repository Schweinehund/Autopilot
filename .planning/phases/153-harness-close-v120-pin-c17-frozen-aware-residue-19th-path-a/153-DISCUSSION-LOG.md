# Phase 153: Harness Close — V120 Pin, C17 Frozen-Aware Residue & 19th Path-A Lineage Bump - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-29
**Phase:** 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
**Areas discussed:** Conversion scope & C17 mechanics; The 8 leaves + apex shape; 19th lineage + 18th
workflow; Terminal close & evidence — all four selected, with `/grill-me` to widen the question set and
`/adversarial-review` to adjudicate each recommendation.

---

## Method

The user selected all four proposed gray areas and directed: *"Use /grill-me to thoroughly raise
additional questions in each of the areas and use /adversarial review to evaluate each of the questions
in each of those areas to recommend the best one and provide your reasoning."*

| Stage | Agents | Result |
|---|---|---|
| Scout + grill | orchestrator | 16 `[MEASURED]` baseline rows; 43 questions with recommended answers across A/B/C/D |
| Finders | 4 parallel (3 chunk + 1 cross-cutting) | 80 raw findings / 363 pts — 15 CRITICAL, 37 MEDIUM, 28 LOW |
| Adversary | 1 | 68 CONFIRMED, 7 DISPROVED (score +15); 2 over-claimed headlines flagged |
| Referee | 1 | **67 REAL / 8 FALSE POSITIVE**; overturned the Adversary once; 5 severity changes |
| Netting | Referee | 67 − 23 collapsed = **44 distinct defects**; 2 duplicate clusters the merge had missed |
| "What everyone missed" | Referee | **7 new items**, 3 CRITICAL |

All 16 `[MEASURED]` rows were independently re-verified TRUE by a second agent — the first phase in
several with no fabricated measurement. The Area-A Finder additionally **executed** the proposed C17
conversion end to end across all five frozen corpora before it was ratified.

---

## Area A — Conversion scope & C17 mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Convert five (ratified text) | Honour HARN-03 literally | |
| Convert six + amend one surface | Widen the set, amend HARN-03 only | |
| **Convert six + amend all enumerated surfaces** | Widen, and amend SC#2 plus the five other stale surfaces | ✓ |

**User's choice:** Ratify six + amend all enumerated surfaces.
**Notes:** The measured trigger was that `v1.20-milestone-audit.mjs` carries a C17 spawn at `id: 17`,
making `C17-FROZEN-AWARE-RESIDUE-V15-V19`'s "carries no C17 check of its own to convert" false as
written. The decisive argument for amending *all* surfaces rather than the requirement alone:
`ROADMAP.md:323` SC#2 is what `/gsd-verify-work` and the milestone audit actually score, so a phase
converting six against an unamended SC#2 either records a false 5/5 or fails its own criterion. Phase
144 D-25 set the precedent by amending both requirement text and traceability cells.

**Alternatives considered and rejected within the area:**
- *Path-returning materialize helper* — rejected (D-13). Pushes `try`/`finally` into all six call
  sites, re-creating the six-way divergence the shared helper exists to remove.
- *`git worktree add`* — rejected (D-14). Mutates `.git/worktrees/` in the shared repo and applies
  `core.autocrlf` (measured `true`, no `* text=auto`).
- *`git archive | tar -x`* — rejected (D-14). Adds a binary dependency to a suite whose stated
  convention is Node built-ins only.
- *File-count anti-vacuous-green guard* — **rejected after measurement** (D-16). V116 = V117 = 229 and
  V119 = V120 = 234 while the trees differ, so a count cannot see a neighbour mis-pin — the realistic
  defect of a simultaneous six-file conversion. Replaced with a milestone-unique known-member path.
- *"One pass, six harnesses" as a work description* — rejected (D-09). The work is 5:1 asymmetric;
  v1.20's harness needs the full SWEEP-05 conversion, not a `cwd` swap.

---

## Area B — The 8 leaves + apex shape

| Option | Description | Selected |
|--------|-------------|----------|
| Template on Phase 144's leaves (`check-phase-141..143`) | The immediate structural predecessor | |
| **Template on the content-leaf family (`check-phase-126..132`)** | The v1.17/v1.18 precedent for phases with `docs/` deliverables | ✓ |

**User's choice:** Claude's discretion, exercised on the Referee's M-2.
**Notes:** This was the review's largest reframe and no Finder raised it — the Referee did. Phase 144's
leaves and its ratified needle-target clause (*"`scripts/`, `.github/` or `.planning/milestones/`
paths only"*) come from a **tooling** milestone whose phases had no `docs/` deliverables. Phases
145-152 shipped eleven registry documents, the firmware/BIOS corpus and nav-last wiring. Applied
literally, the 144 rule produces eight leaves that assert nothing about their own phases' work. One
wrong premise had generated four separate complaints about needles.

**Alternatives considered and rejected:**
- *Blanket ban on corpus-wide negatives* — rejected (D-25). The real test is temporal durability
  ("would it go red at the first v1.22 content commit?"), which is what 144 D-05 actually decided. The
  blanket ban would have deleted Phase 145's archival-drift Observable Truth, which exists in no other
  form.
- *Apex templated on the lightweight leaves* — rejected (D-31). Those carry the **loose** missing-child
  classifier, which converts the apex's own module-load guard throws into green SKIPs. A structural
  copy of `check-phase-144.mjs` closes five defects at once.
- *Leaves-before-apex ordering alone* — insufficient (D-34). Harness must precede the apex too, or the
  AUDIT-HARNESS hard-FAIL branch produces the `108/1/1` state.

---

## Area C — 19th lineage + 18th workflow

| Option | Description | Selected |
|--------|-------------|----------|
| **Retire the hook, keep the validator green** | De-register `v1.20-carve-gate.cjs` for v1.21; leave `V-139-GOVARTIFACTS` untouched | ✓ |
| Land a v1.20-CARVE amendment | Add the ~89 off-list paths so the gate goes green | |
| Re-adopt CARVE for v1.21 | Author `v1.21-CARVE.md` + a GOV-02 ledger | |
| Leave it firing | Work through the block/nudge then block/warn on every Stop | |

**User's choice:** Retire the hook, keep the validator green.
**Notes:** The draft had recommended "no CARVE amendment needed" on the strength of a grep that never
looked in `.claude/`. The conclusion survived; the reasoning did not. A **live Stop hook** runs
`carve-gate.mjs --json` every turn, the gate exits 1 with 89 off-list paths, and the hook's fail-open
guard therefore does not engage — so an executor would be told on every Stop that a gate is
hard-blocking when it is not. The second correction: the obligation the draft named ("carve-gate stays
byte-unchanged") is enforced by **nothing**, because `check-phase-139.mjs:68` pins the blob at a fixed
*past* commit. The live obligation is `V-139-GOVARTIFACTS`'s structural read of `v1.20-CARVE.md`.

**Alternatives considered and rejected:**
- *Prose instruction for the 18th workflow's re-derived literals* — rejected (D-50). The draft's prose
  list was missing seven literals including `harness-run`'s `run:` line, the only job that executes the
  new harness. Replaced with a mechanical per-job diff against an explicit inventory.
- *Staggering the crons to avoid an 18-way 08:00 collision* — rejected (D-51). The quarterly job's
  guard is a string equality against the cron literal; a stagger makes it permanently unreachable, a
  green-looking skip no anchor count can detect.
- *"Fix" `pin-helper-advisory`* — rejected (D-54). Fixing it means making an instrument blocking that
  D-48 simultaneously distrusts. Carried and labelled non-evidence instead.

---

## Area D — Terminal close & evidence

### D.1 — The Google-style documentation pass

| Option | Description | Selected |
|--------|-------------|----------|
| **Ships with v1.21 — record it as scope** | Accept it; `v1.21-MILESTONE-AUDIT.md` owns it explicitly | ✓ |
| Ships, flagged as out-of-scope | Push as-is, defer the disposition | |
| Hold the push until resolved | Block the terminal gate | |
| Split the history | Rewrite so the style commits land separately | |

**User's choice:** Ships with v1.21 — record it as scope.
**Notes:** The draft had listed `scripts/docs-style/**` as *untracked residue* to be ruled on at the
checkpoint. Measured, it is **tracked** — 50 files, 6 commits, already inside the 208 unpushed — so it
ships either way and cannot be "ruled on and not pushed". The real question was a scope call, not a
hygiene one. Splitting the history would mean rewriting 208 commits at a close with 18 workflows keyed
to a shared SHA.

### D.2 — Untracked-file disposition

| Option | Description | Selected |
|--------|-------------|----------|
| **Commit the 4 orphan planning artifacts** | 145/146/147-PATTERNS.md + PER-OEM-BIOS-GAP.md | ✓ |
| Rule on ~92 fireworks-tech-graph files | `.claude/` is not gitignored beyond two entries | |
| Rule on `.planning/config.json` | The one modified tracked file | |
| Delete e1 / e2 / ee | Stray git stderr captures | |

**User's choice:** Commit the 4 orphan planning artifacts only.
**Notes:** Those four are untracked **inside directories `/gsd-complete-milestone` will `git mv`** —
untracked files do not travel with a `git mv` and are in no commit, so they would silently detach from
their archived phases. The three unselected populations are recorded in CONTEXT's `<deferred>` as
reviewed-and-not-ruled, not dropped.

**Alternatives considered and rejected within the area:**
- *The apex triple as SC#2 evidence* — rejected (D-56). All six predecessor `AUDIT-HARNESS` checks skip
  under `CHECK_PHASE_NESTED=1`, so `110/0/0` is compatible with all six conversions being broken. A
  standalone six-harness evidence step became a first-class deliverable.
- *`git status --porcelain` as the hygiene measurement* — rejected (D-63). Bare form reports 13;
  `--untracked-files=all` reports 107.
- *"Class 2 archival drift is covered by the post-gate run"* — rejected (D-71). The post-gate run
  happens **before** archival; v1.20 measured the apex after the phase-dir move.
- *A static census satisfying `ROADMAP.md:329`* — rejected (D-72). The mandate is a **dynamic**
  nested-fail child scan, which a grep structurally cannot perform.

---

## Claude's Discretion

- Internal structure of the eight leaves and the apex within the locked invariants; the needle sets for
  `check-phase-145..151` (derived from measured actuals at plan time).
- `v1.21-audit-allowlist.json` header values and `BASELINE_25` comment wording.
- Plan decomposition and commit-message subjects, within the ordering constraints of D-09, D-34, D-49
  and D-55.
- `v1.21-MILESTONE-AUDIT.md` section ordering.
- The `withDocsAtClose` signature and JSDoc, within `V-120-HYG01`'s constraint.

## Deferred Ideas

- ~92 `fireworks-tech-graph` files under `.claude/skills/` and `.agents/skills/` — reviewed, not ruled.
- `.planning/config.json`'s modified `_auto_chain_active` flag — reviewed, not ruled.
- `e1`, `e2`, `ee` — stray git stderr captures, reviewed, not ruled.
- `V-140-C17CARVEOUT`'s stale name and detail string — the additive successor is authored here, but the
  underlying class (frozen validators whose prose outlives their truth) belongs to a future tooling
  pass alongside `check-phase-125.mjs:86`.
- `REQUIREMENTS.md` INT-03's stale 225 figure versus the live 236 canaries.
- The NESTED-guard asymmetry — once harnesses are frozen-aware the "skip against evolved corpus"
  rationale no longer holds, but the five predecessor apexes are frozen and cannot be edited.
- `.planning/seeds/SEED-001` — still stale-but-open.
