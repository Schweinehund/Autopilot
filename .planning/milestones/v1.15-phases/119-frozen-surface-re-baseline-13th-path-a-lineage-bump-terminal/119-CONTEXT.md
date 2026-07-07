# Phase 119: Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close - Context

**Gathered:** 2026-07-06
**Status:** Ready for planning

<domain>
## Phase Boundary

The **v1.15 milestone-close** phase. Atomically re-pin all Phase-1 frozen surfaces, author the 13th Path-A
audit-harness lineage bump, and close via a 3-axis terminal re-audit + PIPE-02 grounding-confirmation. This is
the **first deliberate re-pin of all Phase-1 frozen surfaces** — it INTENTIONALLY inverts the byte-unchanged
invariant every prior milestone protected (non-Phase-1 predecessor frozen surfaces remain byte-unchanged).
Requirements **HARN-02 / HARN-03 / HARN-04**. Deliverables fixed by ROADMAP Phase-119 SC1–SC5.

**Locked by SCs / HARN reqs / v1.14 precedent (NOT re-litigated in discussion):**
- **Atom 1** (SC1, one indivisible commit): `v1.15-milestone-audit.mjs` (C1–C17, Path-A from v1.14) +
  `v1.15-audit-allowlist.json` sidecar repointed + BASELINE_19 freshness comment in `regenerate-supervision-pins.mjs`.
- **Atom 2** (SC2, one indivisible commit): `check-phase-113.mjs`…`check-phase-119.mjs` per-phase validators
  (chain-apex `CHAIN_PHASES=[48..118]`, `CHAIN_SKIP=new Set([])`) + `_lib/frozen-at-close.mjs` **V114 pin =
  v1.14 close-gate SHA `7d922a7`** + `audit-harness-v1.15-integrity.yml` as the **12th** parallel CI
  coexistence workflow (predecessors v1.4–v1.14 byte-unchanged).
- **3-axis re-audit definition** (SC4): Axis 1 fresh `git clone --no-hardlinks`; Axis 2 cross-OS Linux GHA
  authoritative (BOTH chain validators per corrected D-03 OS split); Axis 3 fresh zero-context sub-agent;
  cross-OS EXACT MATCH.
- **Single close-gate commit** (SC5) flips all **16** v1.15 requirements to Validated across
  PROJECT / ROADMAP / STATE / REQUIREMENTS.
- Sequential-on-main (`use_worktrees:false`); full chain ~5–9 min; background runs die at turn boundaries →
  delegate byte-equiv proof to a sub-agent.

**NOT this phase:** any content retrofit (Phases 116/117/118 — all DONE); any C17 edit (immutable, Phase-115
D-04); the v1.16 mermaid / orphan / structural classes; a **V115 pin** (freezing the v1.15 corpus is the
NEXT milestone's Path-A job — pins back-anchor to the predecessor, never self-reference).

**Adjudication method:** All four gray areas were resolved via a three-agent adversarial review
(Finder → Adversary → Referee, all Opus), each independently re-verifying every deciding fact against the repo.
The review **converged unanimously** — all four winners CONFIRMED at High confidence — and **corrected one
grounding error in the discuss brief** (the "SHA-includes-its-own-pin / self-reference" framing is
architecturally false; all pins back-anchor to PAST SHAs). User locked **A1 / B1 / C1 / D1** + all riders on
2026-07-06.

</domain>

<decisions>
## Implementation Decisions

### D-119-1 — PIPE-02 second grounding-confirmation pass: representative set, owner-run, close-gate BLOCKS (Area A → A1) [resolves SC5 / HARN-04 / the Phase-113-flagged discuss-gray]
- Run the SECOND grounding-confirmation pass on a **statistically representative `.docx` set** (SC5 explicitly
  permits "the retrofitted corpus **or a statistically representative set**"), **owner-run live in Copilot
  Studio** (the agent has **no** live Copilot Studio / SharePoint access — confirmed reality since Phase 113;
  REQUIREMENTS L77 out-of-scope). Agent **prepares** the representative set + an executable
  `PIPE-02-CLOSE-RUNBOOK.md` (mirrors the Phase-113 method); owner **executes** and records
  `PIPE-02-CLOSE-FINDINGS.md`. **The close-gate BLOCKS until the owner attests PASS** — PIPE-02 must be
  Validated *in the same close-gate commit* (SC5 / HARN-04: "included in the close-gate" / "single close-gate
  commit flipping all 16").
- **MANDATORY RIDER — define "PASS"** (carry Phase-113 acceptance, `113-*/PIPE-02-FINDINGS.md` SC4/OQ2/OQ3):
  grounded answer + **clickable document-level citation** + no hallucination, across N queries spanning **all 5
  platforms** (Windows / macOS / iOS·iPadOS / Android / **Linux**) + a **Draft-label retrieval** probe + a
  **capability-matrix chunk-survival** probe.
- **MANDATORY RIDER — use the REAL retrofitted corpus, not the Phase-113 synthetic fixtures.** SC5 says "the
  retrofitted corpus"; the Phase-113 set was synthetic (`RE-T01…RE-T05`, "synthetic test fixture"). The
  representative set must be **actual shipped `RE-NNN` `Status: Approved`** docs.
- **MANDATORY RIDER — probe a POST-remediation WIDE matrix** (a RETRO-03 deliverable). Phase-113
  FINDINGS.md:131-137 cautioned OQ3 was tested only on a *mode-first* (inherently chunk-resilient) matrix and
  did NOT disprove P-02 for a wide/flat >25-row matrix — exactly what RETRO-03 table remediation (≤25-row cap
  + per-table prose) was built to fix. Test what v1.15 CHANGED.
- **RIDER — include a dedicated Linux doc** (RETRO-02 shipped Linux admin-setup); don't rely on the Phase-113
  compound-802.1X proxy for Linux again.
- **RIDER — capture the raw transcript in-repo** (`PIPE-02-CLOSE-FINDINGS.md`); Phase 113 left it owner-local.
  The PIPE-02 leg is the ONE close-gate leg **no re-audit axis can reproduce** (no Copilot access) — give the
  asserted leg an auditable evidence artifact.
- *Rejected A2 (full ~174-doc corpus):* SC5 blesses a representative set → exhaustive live upload + reindex of
  ~174 uniform-template docs is redundant owner burden for zero SC-required benefit. *Rejected A3
  (non-blocking / attestation-pending deferral):* contradicts "included in the close-gate" — forces either an
  unverified `Validated` flip (dishonest audit record) or leaves a req not-Validated (breaks "all 16 in one
  commit"). Owner-availability is a scheduling reality, handled as a note under A1, not a reason to weaken the gate.

### D-119-2 — Cross-OS Axis 2: push → new v1.15 CI workflow, GHA green is authoritative (Area B → B1) [resolves SC4 / HARN-04]
- Push the close branch → the **new `audit-harness-v1.15-integrity.yml`** (the 12th coexistence workflow shipped
  in Atom 2) runs **BOTH chain validators** on `ubuntu-latest` — **apex** (recursive `check-phase-NN --verbose`,
  spawns 48..118) via the `linux-chain-ubuntu-latest` job (`core.autocrlf false` + `fetch-depth:0` +
  `continue-on-error:false`) **+ continuity** (standalone per-phase `check-phase-NN` jobs). **That GHA run's
  green is the authoritative Axis-2 result**; the Windows-local run corroborates only. Matches the v1.14 close
  (Axis 2 = GHA run `28625158404` GREEN authoritative).
- **MANDATORY RIDER — repoint the Path-A `paths:` filter** from `v1.14-*` / `v1.14-MILESTONE-AUDIT.md` to
  `v1.15-*` / `v1.15-MILESTONE-AUDIT.md` (else the workflow never fires on the close PR).
- **RIDER — push-timing / D-03 ordering gate:** the workflow triggers `on: pull_request: paths:` matching
  changed files, so **Atom 2 must be pushed to a branch/PR FIRST** before Axis-2 can run at all. Consequence:
  the close-gate commit that records "Axis 2 = run ⟨ID⟩" **necessarily post-dates the Atom-2 push** — the run
  ID is unknowable until the run completes (this is the B↔C↔D interlock, below).
- *Rejected B2 (local WSL2/Docker Linux):* mechanically possible (WSL2 + Docker ARE present on the box — the
  Adversary's verified correction) but is **not the SC4-named GHA-authoritative surface**, reintroduces
  local-env variance, and forces hand-replication of the autocrlf-false + fetch-depth:0 LF-fidelity contracts.
  *Rejected B3 (sub-agent runs chain, GHA skipped):* the sub-agent runs on the same Windows host → hits
  WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..118]; also collapses Axis 2 into Axis 3 (Axis 3 IS the fresh
  zero-context sub-agent), destroying 3-axis independence; fails SC4's "Linux GHA" wording.

### D-119-3 — Re-baseline atomic-green: v1.14-exact + pre-authorized emergent remediation slot (Area C → C1) [resolves SC3 / HARN-02 — the DOMINANT RISK]
- **v1.14-exact discipline.** `BASELINE_19` freshness refresh in Atom 1, **back-anchored to a PAST HEAD** (the
  Wave-0 / pre-Atom-1 SHA — mirrors `BASELINE_18 → 1a0ee15`), **never** the close-gate SHA. Then
  **pre-authorize an EMERGENT chain-health remediation slot** (like v1.14 Plan 112-06) that fires **only if**
  the authoritative Axis-2 GHA apex comes back RED.
- **MANDATORY RIDER — remediation constraints** (exact v1.14 112-06 discipline): remediation edits **ONLY
  predecessor `check-phase-NN.mjs` validators** (in-class chain maintenance), **NEVER a frozen surface**,
  **NEVER value-masks** (no expected value bumped to the evolved state — that is T1 masking), and
  **`CHAIN_SKIP` stays EMPTY** (V-SELF hard-asserts size 0). Honest audit record is MANDATORY.
- **RIDER — predecessor-byte-unchanged HARD gate** asserted at close: `git diff ⟨pre-Atom-1 anchor⟩ HEAD` over
  the non-Phase-1 frozen surfaces = EMPTY (v1.14 audit line 330 pattern).
- *Why this is the risk-correct posture:* the EEE retrofit reformatted ~174 docs across 116/117/118, including
  shared surfaces (glossary / matrix files) that predecessor chain validators assert → the **same v1.14 failure
  mode is highly probable** (v1.14's first Axis-2 apex ran **RED 44 PASS / 22 FAIL / 1 SKIP**, needed 3
  remediation commits). C1 pre-authorizes (does not mandate) that remediation.
- **Honest-atomicity note:** "atomic-green" holds at the TERMINAL close-gate SHA, not continuously — the
  intermediate Atom-2 push commit is knowingly-RED-then-fixed whenever remediation fires. Record this honestly.
- *Rejected C2 ("green-before-commit", no separate remediation commit):* NOT "mechanically impossible" (WSL/
  Docker exist), but a **local/pre-push green cannot GUARANTEE the authoritative GHA apex is green** (v1.14
  proves leaf-validators-green while apex RED), and it would force predecessor edits **into Atom 2** (violates
  SC2's locked contents) + suppress the honest-accounting record. *Rejected C3 (standalone re-baseline commit):*
  built to solve the **non-existent self-reference problem** (grounding correction — pins back-anchor); also
  mis-models an emergent, count-unknown remediation as a fixed single planned commit.

### D-119-4 — Close commit/plan structure: D1 3-commit skeleton + Wave-0 anchor + remediation slot (Area D → D1) [resolves SC1/SC2/SC5]
- **3-commit skeleton:** (1) **Atom 1**, (2) **Atom 2** [check-phase validators + `frozen-at-close` V114 pin +
  `v1.15-integrity.yml` CI surface + re-baseline pins all ride here], (3) **close-gate** (flips all 16 v1.15
  reqs to Validated). Re-audit runs against the tree **before** the close-gate commit.
- **PLUS a Wave-0 pre-anchor commit** BEFORE Atom 1 (the BASELINE_19 back-anchor target + the
  predecessor-byte-unchanged gate base; cf. v1.14 Plan 112-01 anchor `0a7699f`).
- **PLUS an emergent remediation slot** between the Atom-2 push and the close-gate (only if GHA is RED; may be
  1-or-more commits — v1.14 took 3). The **close-gate remains the single commit** that flips all 16 reqs (SC5).
- **Read "3 commits" as a skeleton/FLOOR, not a ceiling** — the honest v1.14 history was ~7 commits (Wave-0 +
  Atom1 + Atom2 + re-audit + 3×remediation + close-gate). Do NOT read the "3" as a hard ceiling (that would
  silently mandate C2's forbidden folding).
- *Rejected D2 (standalone 4th re-baseline commit):* falls with C3 (non-problem); in v1.14 the V-pin rode Atom 2
  and remediation rode separate commits as needed. *Rejected D3 (fold Atom 1 into Atom 2):* violates SC1/SC2
  "indivisibly (one commit)" each.

### Execution ordering (the B↔C↔D interlock — bake into the plan)
`Wave-0 pre-anchor → Atom 1 (BASELINE_19 back-anchored to Wave-0 SHA) → Atom 2 (validators + V114=7d922a7 +
v1.15-integrity.yml + re-baseline pins) → PUSH` → triggers the authoritative GHA re-audit (BOTH chain
validators on ubuntu-latest). **If the GHA apex is RED** → execute the pre-authorized remediation slot
(predecessor `check-phase-NN` validators only, no value-masking, `CHAIN_SKIP` stays ∅, honest record) →
re-push → re-audit to green. **Only once the authoritative GHA is green AND the owner has attested PIPE-02
PASS** does the **close-gate** commit land, flipping all 16 reqs. The close-gate SHA is never referenced by any
pin (back-anchor invariant) → **no ordering circularity**.

### Claude's Discretion (resolve at plan time)
- Exact plan count / plan-to-commit mapping within the D1 skeleton (Wave-0 anchor + Atom 1 + Atom 2 +
  remediation slot + close-gate).
- Exact composition of the representative `.docx` set (which specific `RE-NNN` Approved docs per platform/class),
  subject to the D-119-1 riders (5 platforms + Draft + wide post-remediation matrix + Linux doc).
- Exact `PIPE-02-CLOSE-RUNBOOK.md` query list (N queries), inheriting the Phase-113 runbook shape.
- Whether to run a **local corroborating** Linux (WSL/Docker) chain pass before the authoritative GHA push
  (optional confidence step; NOT authoritative).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (read FIRST)
- `.planning/ROADMAP.md` §"Phase 119" — SC1–SC5 (the exact Atom-1 / Atom-2 contents, the 3-axis re-audit
  definition, the corrected D-03 OS split, the single-close-gate/16-req flip).
- `.planning/REQUIREMENTS.md` — **HARN-02** (atomic frozen-surface re-baseline; non-Phase-1 byte-unchanged),
  **HARN-03** (13th Path-A lineage bump — the exact artifact list incl. `V114 = 7d922a7`), **HARN-04**
  (3-axis terminal re-audit + PIPE-02 confirmation + single close-gate flipping all v1.15 reqs). L77 = the
  Copilot-access out-of-scope note grounding A1's owner-run.
- `.planning/STATE.md` — v1.15 milestone state; the "Linux GHA BOTH chain validators authoritative per corrected
  D-03 OS split, same as v1.12–v1.14" lock; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 note.

### The direct precedent (the close TEMPLATE — read before planning)
- `.planning/milestones/v1.14-MILESTONE-AUDIT.md` — the Phase-112 close: the first Axis-2 GHA apex RED
  (`28621185019`, 44/22/1) → HALT → Plan 112-06 remediation (`e9a06bb`/`53db9fa`/`2de780c`) → GREEN
  (`28625158404`); the back-anchor invariant ("no artifact forward-references the close SHA"; V113 anchors to
  PAST v1.13 close); the predecessor-byte-unchanged HARD gate; the honest-accounting section; the Wave-0
  pre-anchor (`0a7699f`, Plan 112-01). **This is the pattern D-119-3 / D-119-4 replicate.**

### The harness surfaces being authored / re-pinned
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (currently ends V113='ba24f1a');
  Atom 2 ADDS `V114: '7d922a7'` + `readAtV114Close` helper. Single-entry "atom == close-gate" pin pattern.
- `scripts/validation/regenerate-supervision-pins.mjs` — the supervision-pin baseline; Atom 1 adds the
  BASELINE_19 freshness comment (back-anchored to the Wave-0 / pre-Atom-1 HEAD).
- `scripts/validation/v1.14-milestone-audit.mjs` — the Path-A source to copy → `v1.15-milestone-audit.mjs`
  (C1–C17; node-builtins-only; repoint the sidecar reference to `v1.15-audit-allowlist.json`).
- `scripts/validation/v1.14-audit-allowlist.json` — the sidecar to copy → `v1.15-audit-allowlist.json` (repointed).
- `scripts/validation/check-phase-100.mjs` … `check-phase-112.mjs` — the existing continuity/apex chain
  validators; Atom 2 authors `check-phase-113.mjs`…`check-phase-119.mjs` (apex `CHAIN_PHASES=[48..118]`,
  `CHAIN_SKIP=∅`). Predecessor validators are the ONLY files the D-119-3 remediation slot may edit.
- `.github/workflows/audit-harness-v1.14-integrity.yml` — the Path-A CI workflow to copy →
  `audit-harness-v1.15-integrity.yml` (12th coexistence workflow). Preserve the `linux-chain-ubuntu-latest`
  job (autocrlf-false + fetch-depth:0 + continue-on-error:false) + per-phase check jobs; **repoint `paths:`
  from `v1.14-*` to `v1.15-*`**.

### PIPE-02 grounding (the second-pass basis)
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md` — the
  first-pass results + the PASS acceptance criteria (SC4 / OQ2 Draft-label / OQ3 chunk-survival) D-119-1
  inherits; the synthetic-fixture caveat (why v1.15 must use real docs) and the wide-matrix caveat (why it must
  probe a post-remediation matrix).
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-RUNBOOK.md` — the
  executable owner-run procedure to fork into `PIPE-02-CLOSE-RUNBOOK.md` (upload → reindex-wait → Q1–Q6 → record).

### Content-corpus completion inputs (the re-baseline targets)
- `.planning/phases/118-reference-doc-retrofit-table-remediation-26-docs/118-CONTEXT.md` — the last retrofit
  class; the "C17 green across full Phase-1 corpus (174 files)" close-gate input.
- `docs/_registry/RE-index.md` — the `RE-NNN → path + status` map; the source for selecting the D-119-1
  representative `.docx` set (Approved rows only).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **The entire v1.14 close scaffold is the copy-source** — `v1.14-milestone-audit.mjs`,
  `v1.14-audit-allowlist.json`, `audit-harness-v1.14-integrity.yml`, and the v1.14-MILESTONE-AUDIT.md structure
  are the Path-A templates. Copy → repoint `v1.14`→`v1.15` strings + advance the check-phase range.
- `_lib/frozen-at-close.mjs` — extend the existing `MILESTONE_CLOSE_SHAS` map + `readAtVxxxClose` helper family
  (single-line addition pattern: `V114: '7d922a7'` + `readAtV114Close`).
- `check-phase-112.mjs` — the newest chain validator; the shape `check-phase-113..119` mirror (apex recursion
  + continuity).

### Established Patterns
- **Two-atom-then-close-gate discipline** (v1.12–v1.14): Atom 1 (audit harness + sidecar + baseline) and Atom 2
  (chain validators + frozen-at-close pin + CI workflow) each ship as ONE indivisible commit; a separate
  single close-gate commit flips all requirements. v1.15 keeps this + the Wave-0 anchor + emergent remediation.
- **Back-anchor invariant:** pins reference only PAST close SHAs (successor pins predecessor). No V115 pin here.
- **Linux-GHA-sole-authoritative for the apex** (Windows deep-nest times out at [48..118]); Windows corroborates.
- **Honest-accounting on remediation:** RED-then-green intermediate states are recorded, not hidden.

### Integration Points
- **Atom 2 push is the Axis-2 trigger** — the CI `paths:` filter fires the authoritative GHA re-audit; the
  close-gate consumes its run ID. This ordering (push before close-gate) is load-bearing (D-03 gate).
- **The close-gate is the sole point** where all 16 reqs flip to Validated AND where PIPE-02 owner-attestation
  is consumed — it lands last, gated on (authoritative GHA green) AND (owner PIPE-02 PASS).
- **Sequential-on-main** (`use_worktrees:false`) — plans run one at a time; the byte-equiv chain proof is
  delegated to a sub-agent (full chain ~5–9 min; background runs die at turn boundaries).

</code_context>

<specifics>
## Specific Ideas

- The load-bearing surprises this phase (all from the adversarial review):
  **(1)** the discuss brief's "SHA-includes-its-own-pin / self-reference" framing is **architecturally false** —
  every pin back-anchors to a PAST SHA (`V113='ba24f1a'` was introduced by v1.14's Atom-2 `998eeae`;
  `BASELINE_18→1a0ee15`; v1.15 adds `V114='7d922a7'`, already past). This KILLS options C3 and D2.
  **(2)** the dominant risk is **empirically proven** — v1.14's first Axis-2 GHA apex ran RED (44/22/1) despite
  green leaf validators and needed 3 remediation commits → C1's pre-authorized remediation slot is the
  risk-correct posture, and D1 must be a skeleton-with-slot (~7 commits in practice), not a fixed 3.
  **(3)** WSL2 + Docker ARE present on the box, so a local Linux apex run is *possible* — but it is NOT
  authoritative (SC4 names GHA); use it only as an optional corroborating pre-push confidence check.
  **(4)** PIPE-02 must use **real retrofitted `Status: Approved` docs** (not Phase-113's synthetic `RE-T*`
  fixtures) and must probe a **post-RETRO-03 wide matrix** — testing what v1.15 actually changed.
- The PIPE-02 leg is the ONE close-gate leg no re-audit axis can reproduce (no Copilot access) → it is an
  *asserted*, not *verified*, gate leg; capture the owner transcript in-repo for auditability.

</specifics>

<deferred>
## Deferred Ideas

- **V115 pin (freezing the v1.15 corpus) → v1.16** — pins back-anchor; the successor milestone pins v1.15's
  close SHA. Explicitly NOT authored this phase.
- **v1.16 — orphan docs + structural classes** (glossaries, Mermaid decision-trees, orphan nav-hubs, lifecycle)
  + the parked Mermaid-vs-"no key info in code-fenced diagrams" collision + the 1 carved mermaid reference file
  (RE-147) + end-user Guides (RE-175/176) + the v1.16 descriptive-filename rename pass (PIPE-02 OQ1 citation-label quality).
- **Programmatic Copilot Studio access** — remains out of scope (REQUIREMENTS L77); PIPE-02 stays owner-run.

None of the above are scope creep into Phase 119 — they are downstream and preserved here so they are not lost.

</deferred>

---

*Phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal*
*Context gathered: 2026-07-06*
