# Phase 125: V115 Pin + 14th Path-A Lineage Bump + Terminal Close - Context

**Gathered:** 2026-07-09
**Status:** Ready for planning

<domain>
## Phase Boundary

The **v1.16 milestone-close** phase — the SOLE deliverable. Three requirements, mirroring v1.15 Phase 119 /
v1.14 Phase 112 exactly (never batches with content or retrofit):

- **HARN-05** — add the **V115 back-anchor pin** (`V115: '29a3599'` + `readAtV115Close` export) to
  `scripts/validation/_lib/frozen-at-close.mjs`, freezing the v1.15 corpus. This is the pin the v1.15 close
  deliberately deferred (`V115-PIN-DEFERRAL`). Back-anchor invariant: pins reference only PAST close SHAs.
- **HARN-06** — the **14th Path-A audit-harness lineage bump**: `v1.16-milestone-audit.mjs` (C1–C17 inherited
  from v1.15) + `v1.16-audit-allowlist.json` + BASELINE_20 + `check-phase-120..125.mjs` validators + the v1.16
  parallel CI coexistence workflow. Predecessor v1.4–v1.15 frozen surfaces stay **byte-unchanged**; predecessor
  content-assertion validators reading a now-retrofitted structural doc are converted **frozen-aware**
  (`readAtV115Close`) as in-scope close-gate remediation. NO value-masking, NO frozen-surface edit,
  `CHAIN_SKIP` empty.
- **HARN-07** — the milestone closes via a **3-axis terminal re-audit** (fresh `git clone --no-hardlinks` +
  cross-OS Linux GHA authoritative for BOTH chain validators per the D-03 OS split + fresh zero-context
  sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH) **plus a PIPE-02 grounding confirmation** on the retrofitted
  structural corpus, in a single close-gate commit flipping all **14** v1.16 requirements to Validated.

**Key delta from Phase 119:** Phase 119 (HARN-02) was a DELIBERATE re-baseline of Phase-1 frozen surfaces.
Phase 125 is the OPPOSITE — predecessor surfaces stay byte-unchanged; drift from the Phase-121/122/123
structural retrofit is absorbed by **frozen-aware validator conversion**, not re-pinning.

**NOT this phase:** any content retrofit (Phases 120–124 — all DONE); any C17 edit (immutable); a V116 pin
(that back-anchors from the NEXT milestone); the `FROZEN-AWARE-ADOPTION-SWEEP-01` broad sweep (deferred v1.17+);
the O(n²) Windows-runner rewrite (out of scope).

**Adjudication method:** All four gray areas (C/A/D/B) were resolved via a three-agent adversarial review
(Finder → Adversary → Referee, all Opus), each independently re-verifying every deciding fact against the repo.
The review **converged** (all four picks High confidence) and **corrected three v1.16-specific grounding gaps**
the naive "copy Phase 119" would miss (the ABAUDIT/#12 dominant-risk shape, the predecessor-workflow cascade,
the PIPE-02 rider retargeting) plus one load-bearing SC transcription error (the apex CHAIN_PHASES range). User
delegated all four picks to the adversarial review on 2026-07-09.

</domain>

<decisions>
## Implementation Decisions

### D-125-1 — Predecessor-validator remediation: C1 emergent slot (3 shapes) + flag-#6 plan-time scoping (Area C → C1 refined) [resolves HARN-06 — the DOMINANT RISK]
- **Pre-authorize an EMERGENT remediation slot** that fires ONLY if the authoritative Axis-2 GHA apex comes
  back RED (exact v1.14 112-06 / 119-C1 discipline). The slot admits **THREE** remediation shapes:
  1. **`readAtV115Close` frozen-aware conversion** of a predecessor content-assertion validator (the shape the
     brief emphasized; real but NOT the dominant one — already live in `check-phase-50/52/65.mjs`).
  2. **`<!-- ABAUDIT-NN -->` C15 FP-exemption** on the tripping line — **the ACTUAL dominant v1.15 shape**
     (verified: v1.15's emergent RED was commit `ad583fd`, GHA run `28823233887`, a C15 anti-pattern trip
     caused by an EEE `#12` blockquote split isolating a sentence outside its exempting-context window;
     remediated by exemption comments, explicitly "NO predecessor validator edited").
  3. **In-class NESTED/guard fix** on a predecessor `check-phase-NN` validator (the AUDIT-HARNESS self-test
     re-run class; already inoculated in 113–119, but the slot must still admit it).
- **MANDATORY RIDER — flag-#6 plan-time SCOPING run** (REQUIREMENTS.md L56): run the FULL predecessor chain at
  PLAN time to *scope* which validators actually drift — SCOPE, not pre-commit. Convert/exempt **only what
  actually trips**. A broad proactive sweep of all readers is the out-of-scope `FROZEN-AWARE-ADOPTION-SWEEP-01`
  (deferred v1.17+); triggered-only remediation is in-scope (L44/L78).
- **MANDATORY RIDER — remediation constraints** (D-119-3 + ad583fd): NO value-masking (no expected value bumped
  to the evolved state — T1 masking), NO predecessor **frozen**-surface edit, `CHAIN_SKIP` stays EMPTY (V-SELF
  hard-asserts size 0), honest RED-then-green record. (An ABAUDIT comment on a v1.16 structural doc from Phases
  121–123 IS allowed — those are this-milestone surfaces, not predecessor frozen docs.)
- **DEPENDENCY:** the V115 pin (HARN-05) must land in Atom 2 **before** any `readAtV115Close` conversion (the
  helper must exist first).
- *Rejected C2 (pre-plan a conversion atom, no slot):* pre-commits conversions before drift is proven, converts
  non-tripping readers (out-of-scope sweep), and CANNOT preempt the un-pre-convertible ABAUDIT/C15 shape which
  only surfaces on the assembled-corpus scan. *Rejected C3 (hybrid pre-convert "~16 known readers"):* same
  over-conversion / mis-prioritization; the reader-count premise is itself off (~20 reference the paths, not all
  drift) and the pre-conversion targets the wrong (non-dominant) surface.

### D-125-2 — PIPE-02 grounding-confirmation: A1 full owner-run, blocking, riders RETARGETED to v1.16 deltas (Area A → A1) [resolves HARN-07]
- Run a **fresh full owner-run grounding pass** on a statistically representative set of the NEW structural
  corpus (glossaries / lifecycle / decision-trees / nav-hubs — what v1.16 changed), **owner-run in Copilot
  Studio** (agent has NO live Copilot access — confirmed since Phase 113). Agent **prepares** the `.docx` set +
  `PIPE-02-CLOSE-RUNBOOK.md`; owner **executes** + records `PIPE-02-CLOSE-FINDINGS.md` (raw transcript) in-repo.
  **The close-gate BLOCKS** until owner attests PASS; PIPE-02 Validated in the SAME close-gate commit.
- **MANDATORY RIDER — RETARGET probes to v1.16 deltas** (do NOT re-run the v1.15 riders — the wide
  capability-matrix chunk-survival probe (RETRO-03) and Linux admin-setup doc (RETRO-02) test surfaces v1.16
  never touched; re-running them is testing last milestone's homework). Target instead:
  (a) a **decision-tree Mermaid→text-equiv table** with EVERY decision leaf citable (STD-04 / RETRO-05/08);
  (b) a **glossary definition-list anchor-slug** citation (plain-GitHub slug — see `reference_glossary_anchor_slugs`);
  (c) a **nav-hub link-table** retrieval; (d) **descriptive-filename citation-label** quality (PIPE-04 / OQ1).
- **RIDER — real shipped `RE-NNN` `Status: Approved` docs** (not synthetic `RE-T*` fixtures). PASS = grounded
  answer + clickable document-level citation + no hallucination, across N queries spanning all 5 platforms.
- *Rejected A2 (lean on Phase-124 PIPE-04/05):* factually hollow — PIPE-05 was a single synthetic Draft fixture
  (`RE-T05`), PIPE-04 was filename normalization; NEITHER grounds the retrofitted structural corpus HARN-07
  names. *Rejected A3 (non-blocking / attestation-deferred):* dishonest `Validated` flip or breaks the
  single-close-gate atomicity (119 precedent).

### D-125-3 — Close skeleton + V115-pin placement: D1 pin rides Atom 2, 3-atom FLOOR + Wave-0 anchor (Area D → D1) [resolves HARN-05/06/07 structure]
- **V115 pin (HARN-05) rides Atom 2** with `check-phase-120..125` validators + the v1.16 CI workflow +
  BASELINE_20 — mirrors v1.15 (V114 rode Atom 2, verified commit `5ec0f87`) and v1.14 (V113 rode Atom 2).
  `frozen-at-close` Vxx placement is per-milestone; the HARN-05/HARN-06 split is requirement granularity, not
  commit granularity.
- **3-commit skeleton as a FLOOR, not a ceiling:** (Wave-0 pre-anchor) → **Atom 1** (harness + allowlist +
  BASELINE_20 back-anchored to the Wave-0 SHA) → **Atom 2** (validators + V115 pin + CI workflow) → PUSH →
  [emergent remediation slot, 1+ commits only if GHA RED] → **close-gate** (single commit flipping all 14 reqs).
  v1.14's honest history was ~7 commits — do NOT read "3" as a ceiling.
- **Wave-0 pre-anchor commit BEFORE Atom 1** (the BASELINE_20 back-anchor target + the predecessor-byte-unchanged
  gate base). V115 = PAST v1.15 close SHA `29a3599`, never the close-gate SHA → no ordering circularity.
- *Rejected D2 (pin rides Atom 1):* mis-places the pin away from its consuming validators; contradicts the
  v1.12–v1.15 Atom-2 pattern; the flag-#6 scoping run needs no pin (it runs the existing chain at HEAD).
  *Rejected D3 (standalone 4th commit for the pin):* 119 rejected the analogous non-problem.

### D-125-4 — Cross-OS Axis-2: B1 GHA authoritative, scope WIDENED to the predecessor-workflow cascade (Area B → B1) [resolves HARN-07]
- Push the close branch → the **new `audit-harness-v1.16-integrity.yml`** runs BOTH chain validators (apex +
  continuity) on `ubuntu-latest`; **that GHA run's green is the authoritative Axis-2 result**; the Windows-local
  run corroborates only (deep-nest timeout at the apex range).
- **MANDATORY RIDER — repoint the Path-A `paths:` filter** to `v1.16-*` / `v1.16-MILESTONE-AUDIT.md` (else the
  workflow never fires on the close PR); preserve the `linux-chain-ubuntu-latest` job (autocrlf-false +
  fetch-depth:0 + continue-on-error:false).
- **MANDATORY RIDER — "authoritative green" spans the WHOLE predecessor-workflow cascade**, not the v1.16
  workflow alone. Verified: all 11 versioned predecessor integrity workflows (v1.5–v1.15) carry
  `paths: - 'scripts/validation/check-phase-*.mjs'`, so authoring `check-phase-120..125` fires the entire
  cascade simultaneously against retrofitted HEAD. Those docs-drifts were dormant (predecessor workflows don't
  filter `docs/**`) — the close PR is the FIRST time predecessor apexes see the retrofitted corpus, so drift
  surfaces across all workflows at once. Scan the entire cascade for RED before the close-gate; a shared
  frozen-aware conversion greens every apex at once.
- **RIDER — B↔C↔D interlock:** Atom-2 push FIRST (the `paths:` trigger); the close-gate necessarily post-dates
  the push and consumes the run ID.
- *Rejected B2 (local WSL2/Docker):* not the SC-named GHA surface; local-env / LF-fidelity variance.
  *Rejected B3 (sub-agent runs chain, GHA skipped):* Windows deep-nest timeout at the apex range; collapses
  Axis 2 into Axis 3, destroying 3-axis independence.

### ⚠ LOAD-BEARING GROUNDING CORRECTION — apex CHAIN_PHASES range (the Phase-119 "self-reference"-analog)
- **The ROADMAP SC2 and REQUIREMENTS HARN-06 both literally say `CHAIN_PHASES=[48..119]`. This is a
  transcription error.** Verified: v1.15's close-phase apex `check-phase-119.mjs` hard-enforces
  `CHAIN_PHASES=[48..118]` (71 entries) with a `throw` on length≠71 / terminus≠118; per-phase validators
  113–118 carry `CHAIN_PHASES=[]`. The invariant is therefore **`[48..(closephase−1)]`** — the apex = the
  CLOSE-phase validator.
- **CORRECT v1.16 value (locked by the invariant, NOT a gray area):** the v1.16 apex is `check-phase-125`, so
  its `CHAIN_PHASES = [48..124]` (**77 entries**). The literal `[48..119]` would exclude v1.16's own chained
  phases 120–124 and/or fail `check-phase-125`'s hard length/terminus throw.
- **PLANNER ACTION:** author `[48..124]`, and reconcile / correct the SC + REQUIREMENTS text at plan time. Do
  NOT copy the literal `[48..119]`. (Flagged here rather than silently rewriting the SC in discuss-phase.)

### Claude's Discretion (resolve at plan time)
- Exact plan count / plan-to-commit mapping within the D1 skeleton (Wave-0 anchor + Atom 1 + Atom 2 +
  remediation slot + close-gate).
- Exact composition of the representative `.docx` set (which specific `RE-NNN` Approved docs per platform/class),
  subject to the D-125-2 retargeted riders.
- Exact `PIPE-02-CLOSE-RUNBOOK.md` query list (N queries), inheriting the Phase-113/119 runbook shape.
- Whether to run an optional local corroborating Linux (WSL/Docker) chain pass before the authoritative GHA push.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (read FIRST)
- `.planning/ROADMAP.md` §"Phase 125" — SC1–SC4 (V115 pin, the 14th lineage-bump artifact list, the 3-axis
  re-audit, the single-close-gate/14-req flip). **NOTE the CHAIN_PHASES transcription error — see D-125 correction.**
- `.planning/REQUIREMENTS.md` — **HARN-05** (V115 pin), **HARN-06** (14th lineage bump; L44 frozen-aware
  remediation discipline; L56 flag-#6 plan-time chain-run; L78 triggered-only vs sweep), **HARN-07** (3-axis
  re-audit + PIPE-02 confirmation + single close-gate flipping all 14). L76 = Copilot-access out-of-scope note.
- `.planning/STATE.md` — v1.16 milestone state; the Linux-GHA-authoritative / D-03 OS-split lock;
  WINDOWS-CLONE-DEEPNEST-TIMEOUT-01.

### The direct precedents (the close TEMPLATES — read before planning)
- `.planning/milestones/v1.15-phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-CONTEXT.md`
  — the direct A/B/C/D adjudication template; the 3-commit-skeleton + Wave-0 anchor + emergent-slot pattern.
- `.planning/milestones/v1.14-phases/112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl/112-CONTEXT.md`
  — the Phase-112 close; the first Axis-2 apex RED → 112-06 remediation → GREEN; predecessor-byte-unchanged gate.
- **Emergent-slot precedent commits (READ — these define the THREE remediation shapes):**
  - v1.15 `ad583fd` (`fix(119-05)`) — the ABAUDIT/C15 FP-exemption shape (GHA run `28823233887` RED → green);
    the DOMINANT v1.16 recurrence vector via the Phase-121/122/123 `#12` splits.
  - v1.14 `e9a06bb` / `53db9fa` / `2de780c` (Plan 112-06) — NESTED-guard + `readAtClose` conversion shapes.

### The harness surfaces being authored / re-pinned
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` ends at `V114:'7d922a7'` (line 56);
  Atom 2 ADDS `V115: '29a3599'` + `readAtV115Close` (single-entry pattern). SHA recovered via
  `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format=%H`.
- `scripts/validation/v1.15-milestone-audit.mjs` + `v1.15-audit-allowlist.json` — the Path-A copy-source →
  `v1.16-milestone-audit.mjs` + `v1.16-audit-allowlist.json` (repoint sidecar reference).
- `scripts/validation/check-phase-119.mjs` — the newest chain validator + the apex-range convention source
  (`CHAIN_PHASES=[48..118]` + hard throw). Model for `check-phase-120..125` (apex = `check-phase-125`,
  `CHAIN_PHASES=[48..124]`). Predecessor validators are the ONLY files the D-125-1 remediation slot may edit.
- `.github/workflows/audit-harness-v1.15-integrity.yml` — the CI copy-source → `audit-harness-v1.16-integrity.yml`;
  preserve `linux-chain-ubuntu-latest`; repoint `paths:` from `v1.15-*` to `v1.16-*`.
- `scripts/validation/regenerate-supervision-pins.mjs` — Atom 1 adds the BASELINE_20 freshness comment
  (back-anchored to the Wave-0 / pre-Atom-1 HEAD; mirrors BASELINE_19).

### PIPE-02 grounding (the confirmation basis)
- `.planning/phases/113-*/PIPE-02-FINDINGS.md` + `PIPE-02-RUNBOOK.md` — the first-pass method + PASS acceptance
  criteria; the runbook shape to fork into `PIPE-02-CLOSE-RUNBOOK.md`.
- Phase 124 `PIPE-04` (descriptive-filename pass) + `PIPE-05` (Draft-label probe) artifacts — the citation-label
  and Draft-label legs already validated; the retrofitted-corpus grounding leg is what remains for HARN-07.
- `docs/_registry/RE-index.md` — the `RE-NNN → path + status` map; source for the representative `.docx` set
  (Approved rows only, structural classes).

### Retrofit inputs (the drift surfaces)
- Phases 121/122/123 CONTEXT/VERIFICATION — what was retrofitted (glossaries, lifecycle, decision-trees,
  nav-hubs) and the `#12` blockquote splits applied (the ABAUDIT-recurrence vector).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **The entire v1.15 close scaffold is the copy-source** — `v1.15-milestone-audit.mjs`,
  `v1.15-audit-allowlist.json`, `audit-harness-v1.15-integrity.yml`, `check-phase-119.mjs`. Copy → repoint
  `v1.15`→`v1.16` + advance the check-phase range + set apex `[48..124]`.
- `_lib/frozen-at-close.mjs` — extend `MILESTONE_CLOSE_SHAS` + `readAtVxxClose` family (single-line addition:
  `V115: '29a3599'` + `readAtV115Close`). `readAtV115Close` is the frozen-aware-conversion mechanism (pattern
  already live in `check-phase-50/52/65.mjs`).

### Established Patterns
- **Two-atom-then-close-gate + Wave-0 anchor + emergent slot** (v1.12–v1.15). Atom 1 and Atom 2 each ship as ONE
  indivisible commit; a separate single close-gate commit flips all requirements.
- **Back-anchor invariant** — pins reference only PAST close SHAs (successor pins predecessor). V115 = v1.15's
  `29a3599`. No V116 pin here.
- **Linux-GHA-sole-authoritative for both chain validators** (Windows deep-nests at the apex range); Windows
  corroborates. **Predecessor-workflow cascade** — all 11 versioned integrity workflows fire on
  `check-phase-*.mjs` edits.
- **Honest-accounting on remediation** — RED-then-green intermediate states recorded, not hidden.

### Integration Points
- **Atom 2 push is the Axis-2 trigger** — the CI `paths:` filter fires the authoritative GHA re-audit; the
  close-gate consumes its run ID (push-before-close-gate is load-bearing).
- **The close-gate is the sole point** where all 14 reqs flip to Validated AND where PIPE-02 owner-attestation
  is consumed — it lands last, gated on (authoritative cascade green) AND (owner PIPE-02 PASS).
- **Sequential-on-main** (`use_worktrees:false`) — plans run one at a time; the byte-equiv chain proof + the
  full-chain scoping run are delegated to a sub-agent (full chain ~5–9 min; background runs die at turn
  boundaries — see `reference_chain_baseline_run_kill`).

</code_context>

<specifics>
## Specific Ideas

- The load-bearing surprises this phase (all from the adversarial review):
  **(1)** the DOMINANT v1.16 RED risk is the **ABAUDIT/C15 exemption shape**, not the `readAtV115Close` reader
  conversion the naive read emphasizes — verified against v1.15's actual emergent RED (`ad583fd`), recurring via
  the Phase-121/122/123 `#12` blockquote splits (structural docs carry ZERO ABAUDIT exemptions today). It is
  **un-pre-convertible** — it only surfaces on the assembled-corpus harness scan → the emergent slot (C1) is the
  risk-correct posture, and the slot must admit THREE shapes.
  **(2)** the **predecessor-workflow cascade** — the close PR fires all 11 versioned integrity workflows against
  retrofitted HEAD simultaneously; "authoritative green" is the whole cascade, not one workflow.
  **(3)** the PIPE-02 riders must **retarget** to v1.16 deltas (decision-tree text-equiv tables, glossary
  anchor-slugs, nav-hub link tables) — the v1.15 riders test untouched surfaces.
  **(4)** the SC's `CHAIN_PHASES=[48..119]` is a transcription error; the correct apex range is `[48..124]`
  (77 entries) per the `[48..(closephase−1)]` invariant enforced in `check-phase-119.mjs`.
- The PIPE-02 leg is the ONE close-gate leg no re-audit axis can reproduce (no Copilot access) → an *asserted*,
  not *verified*, gate leg; capture the owner transcript in-repo (`PIPE-02-CLOSE-FINDINGS.md`) for auditability.

</specifics>

<deferred>
## Deferred Ideas

- **V116 pin (freezing the v1.16 corpus) → v1.17** — pins back-anchor; the successor milestone pins v1.16's
  close SHA. Explicitly NOT authored this phase.
- **`FROZEN-AWARE-ADOPTION-SWEEP-01`** — a proactive whole-repo sweep converting ALL predecessor readers to
  frozen-aware reads (vs. this phase's triggered-only remediation) — deferred v1.17+ (REQUIREMENTS L78).
- **O(n²) Windows-runner rewrite** — the WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 fix (would let Windows run the apex);
  out of scope (REQUIREMENTS L78). Windows stays corroborating-only.
- **Programmatic Copilot Studio access** — remains out of scope (REQUIREMENTS L76); PIPE-02 stays owner-run.

None of the above are scope creep into Phase 125 — they are downstream and preserved here so they are not lost.

</deferred>

---

*Phase: 125-v115-pin-14th-path-a-lineage-bump-terminal-close*
*Context gathered: 2026-07-09*
