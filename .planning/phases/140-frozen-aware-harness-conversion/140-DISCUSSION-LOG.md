# Phase 140: Frozen-Aware Harness Conversion - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-06
**Phase:** 140-frozen-aware-harness-conversion
**Areas discussed:** Read mechanism + 60s budget, Conversion scope, SWEEP-07 sentinel remedy, V14 SHA choice

**Method:** The owner selected all four areas and directed `/grill-me` to raise additional
questions inside each, then `/adversarial-review` to score each question and recommend with
reasoning. Codebase interrogation produced a 24-question draft; a 5-Finder / Adversary / Referee
review then scored it. 70 findings raised (491 Finder points), 9 disproved, 61 confirmed.

---

## Area 1 — Read mechanism + SWEEP-06 60s budget

| Option | Description | Selected |
|--------|-------------|----------|
| Per-file `readAtClose` + memoize | One `git show` per file, cached | |
| Batched `git cat-file --batch` prefetch | One spawn over the enumerated scope, memoized | ✓ |
| Materialize tree to temp dir via `git archive` | Frozen tree on disk, rewrite `cwd` | |

**Outcome:** batched prefetch (D-03) — but on **corrected grounds**. The draft disqualified the
per-file option with a fabricated figure ("38–60 s on the first pass alone, fails outright").
Re-measured: per-file `git show` is ~40 ms/spawn, and a whole converted harness under that option
runs in 1.7–11.8 s against a 60 s budget. Both options fit. Batch wins on headroom only.

**Sub-decisions and reversals:**
- Three chokepoints, not two — the bare `existsSync` guards gate path-set membership (D-01).
- The chokepoint census is per-harness: guard counts 1/1/2/4/5, and a **fifth** guard exists at
  `v1.15:827`. A plan keyed to v1.13's coordinates mis-targets 7 of 17 files (D-02).
- **Buffer-offset parsing is now a ruling, not "Claude's discretion"** — `cat-file --batch` frames
  in bytes, and naive string slicing corrupted 6 of 6 test files at the first em-dash (D-04).
- Three CRITICAL findings against this mechanism were **disproved**: the enumeration-first ordering
  (`lsTreeAtClose` throws before any blob is requested) structurally prevents the null cascade,
  measured zero nulls across five converted harnesses (D-05, D-06).
- One **new** issue surfaced by the Referee: the sidecar is the only frozen read not derived from
  the enumerated tree, and `parseAllowlist()` degrades silently — must fail loud (D-07).
- 60 000 budget held, not raised — raising is masking (D-08). Recorded that the apex is
  NESTED-guarded and therefore cannot evidence SWEEP-06 at all (D-09).

## Area 1b — The sidecar (promoted from open fork to locked decision)

| Option | Description | Selected |
|--------|-------------|----------|
| Sidecar reads frozen with the corpus | Same SHA for pins and content | ✓ LOCKED |
| Sidecar stays live (special-cased) | Live coordinates against frozen content | |

**Outcome:** LOCKED to frozen (D-10). Presenting this as an open fork was itself the defect — the
Referee ruled it a real issue with the document. Under the live-sidecar hybrid, v1.14 goes 12/3,
v1.16 goes 13/3, and **v1.5 goes 9/3**, which would destroy the v1.5–v1.13 conversion premise that
Phase 141 RED-01 depends on. The rationale "self-consistent by construction" was empirically false
and is replaced with "correct-by-maintenance, verified per-harness" (D-11).

## Area 2 — Conversion scope

| Option | Description | Selected |
|--------|-------------|----------|
| Convert all 17, land V119 early | Steals Phase 144's HARN-17 | |
| Convert v1.4–v1.18; v1.19 in Phase 144 | Pairs the conversion with its own pin | ✓ |
| Convert only the 11 red harnesses | Leaves v1.14–v1.18 live-HEAD-coupled | |

**Outcome:** v1.4–v1.18 here, v1.19 in Phase 144 (D-13). **Corrected:** the draft named one
amendment; three are required — SWEEP-05's wording, ROADMAP SC#1 (never cited), and the
REQUIREMENTS traceability row (D-14). The draft also applied the no-batching rule asymmetrically;
the convention itself is correctly cited at `ROADMAP.md:178`/`:191` (a Finder challenge to it
failed), but option (b) pushes work *into* Phase 144, which is what the rule prohibits (D-15).

**Notes:** The stated reason for converting the green harnesses was false — they are green because
TOOL-04 re-pinned their sidecars to live coordinates, not because the corpus hasn't drifted (D-16).
The "103 files exit coverage" figure was fabricated: v1.4's scope is 33/33 identical. v1.5 genuinely
drops 64 (D-18).

## Area 3 — SWEEP-07 TEMPLATE-SENTINEL remedy

| Option | Description | Selected |
|--------|-------------|----------|
| Backport v1.4.1's sentinel parse | Regex relax + `1970-01-01` continue | ✓ |
| Exclude `docs/_templates/` from C5 walk | Directory scope filter | |
| Sidecar accepted violation | Allowlist entry | ✗ impossible |
| Edit the template | Barred — sentinel is deliberate | |

**Outcome:** the backport, in its **minimal 3-line form** (D-24) — verified to take the converted
v1.4 harness from 4/1 to 5/0. Every rejection reason in the draft was wrong and was rewritten
(D-25): option (b) *is* what v1.4.1's D-24 actually did (via `hasUnderscoreDirSegment()` in the
shared scope function, which the draft omitted while citing D-24 as its authority); "four other
templates" was fabricated (exactly one `_`-dir file is in scope); and the sidecar option is
**impossible**, not merely bad, because C5 never reads the allowlist.

**Notes:** Recorded that the `continue` suppresses a genuinely malformed `review_by: YYYY-MM-DD`,
and that ROADMAP SC#3 says "the assertion **passing**" while the remedy makes it **skip** — which
must be amended or reconciled explicitly rather than papered over (D-26).

## Area 4 — V14 SHA choice

| Option | Description | Selected |
|--------|-------------|----------|
| `b5cf529` (roadmap candidate) | Later archive commit, ROADMAP+REQUIREMENTS | ✗ REVERSED |
| `671f72a` (roadmap candidate) | Phase-directory archive, 34s earlier | |
| `0b3be9ab` (found during review) | Terminal Phase-43 validation-audit commit | ✓ |

**Outcome: REVERSED from the draft.** Both roadmap candidates leave the converted v1.4 harness at
**C2 FAIL 33**. The draft picked `b5cf529` by testing `docs/` — a surface **no consumer of
`MILESTONE_CLOSE_SHAS` reads**; every frozen reader targets `.planning/`, the sole axis on which the
candidates differ. Measured results drove the reversal (D-19):

| SHA | converted v1.4 |
|---|---|
| `b5cf529` / `671f72a` | 3 passed, 2 failed (C2 33) |
| `3c3a140` / `13d2c883` / `5355b3b9` | C2 45 — sidecar absent, silent degradation |
| **`0b3be9ab`** | 4 passed, 1 failed (sentinel only) |
| **`0b3be9ab` + SWEEP-07** | **5 passed, 0 failed** |

Root cause: the v1.4 sidecar's pins were generated at `4f41431a` and the corpus drifted through
Phases 44–47 without a re-pin; both candidates sit ~30 h downstream of the last aligned SHA.

**Notes:** No `MILESTONE CLOSE` discriminator exists for v1.4 — the project's canonical recovery
awk returns empty — so the rationale must say so rather than implying the V117/V118 method applied
(D-20). V14 is recorded as an audit-close pin with `.planning/*` reads barred, since v1.4's own
REQUIREMENTS.md was deleted before any harness-green SHA (D-21). And critically: adding **any**
`V14` flips `frozen-at-close.mjs:294-300`'s self-test assertion, which is Phase 139's recorded
SWEEP-04 evidence — it must be re-authored in the same plan (D-22).

---

## Claude's Discretion

- Loader module layout, cache-key shape, and whether the batch reader is a separate export.
- Atom granularity for the 16 harness conversions, subject to amendment-first ordering.
- Exact wording of the three D-14 amendments and the D-22 self-test substitution.
- Naming of the replacement tag in the re-authored self-test assertion.

## Deferred Ideas

- v1.19 harness conversion → Phase 144, paired with its `V119` pin.
- The C17 live-HEAD leg in v1.15–v1.19 → Phase 143 owns `c17-eee-contract.mjs`; must be recorded
  via the amendment instrument, not a prose note.
- `V14_ARCHIVE = 13d2c883` → only if a future validator needs v1.4's `.planning` close state.
- Re-pinning the v1.4 sidecar to live coordinates → unnecessary under D-19.
- De-informationalizing v1.4's C3 or v1.4.1's C6/C7/C9 → not this phase.
- `if: always()` on fanned-out validator jobs → still Phase 141, carried from Phase 139.

## Review outcome summary

| Verdict | Count |
|---|---|
| Findings raised by 5 Finders | ~70 (491 points) |
| Disproved by Adversary (+41, zero wrongly-disproved) | 6 |
| Additional false positives ruled by Referee | 3 partial |
| Confirmed real | 61 |
| Draft recommendations KEPT | 4 |
| KEPT with corrected rationale | 6 |
| MODIFIED | 7 |
| **REVERSED** | **1 (V14 SHA)** |
| New issues originated by the Referee | 1 (sidecar silent degradation) |
