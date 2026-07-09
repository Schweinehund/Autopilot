# Phase 125 — 3-Axis Terminal Re-Audit Results (Axis-2 GHA)

**Date:** 2026-07-09
**PR:** #3 (`phase-125-atom-2` → `master`), commit tip `4ab30e8`
**Verdict:** **CASCADE RED — remediation required; NOT a simple pre-scoped Shape-1 fix.**

## Axis-2 GHA cascade — all 13 firing workflows RED

The close PR fired **13** workflows (not the 9 the RESEARCH predicted): base `Audit Harness Integrity` +
`v1.5`…`v1.16`. Reason: `origin/master` is frozen at the **v1.15 ship state** (`3780c6f`; `_glossary-android.md`
still at pre-v1.16 `eae49f7`), so the PR diff contains the **entire v1.16 milestone** (187 commits incl. all
Phase 121–123 doc retrofits) → every predecessor workflow's doc-glob `paths:` filter matched.

| Run | Workflow | Conclusion |
|-----|----------|------------|
| 29055800813 | Audit Harness Integrity (base) | failure |
| 29055800808 / …795 | v1.5 / v1.6 | failure |
| 29055800807 / …853 / …802 | v1.7 / v1.8 / v1.9 | failure |
| 29055800786 / …787 / …823 | v1.10 / v1.11 / v1.12 | failure |
| 29055800834 / …817 / …835 | v1.13 / v1.14 / v1.15 | failure |
| **29055800797** | **v1.16 (authoritative)** | **failure** |

## Root cause — TWO classes

### Class A — chain-apex drift (pre-scoped, tractable)
`check-phase-125` apex (authoritative) = **76 PASS / 3 FAIL / 1 SKIP**. The 3 FAILs:
- `check-phase-51` (V-51-06…): `docs/decision-trees/09-linux-triage.md` "No Mermaid block found"
- `check-phase-92` (V-92-CROSSLINK-E8): `docs/decision-trees/06-macos-triage.md` cross-link needle
- `check-phase-99` (V-99-CONTENT-N12/N13): `docs/decision-trees/06-macos-triage.md` click-directive needles

All three are Phase-122 Mermaid→text-equiv conversion drift — the exact Shape-1 `readAtV115Close` set that
125-01 pre-scoped. **My Atom 1/2 work is clean:** `V-125-AUDIT-HARNESS` (v1.16 harness exits 0) PASS,
`V-125-SELF` (CHAIN_PHASES excl. 125, CHAIN_SKIP empty) PASS, leaves 120–124 PASS. `check-phase-30` is
below the [48..124] chain floor → not an apex/CI contributor.

### Class B — frozen predecessor MILESTONE-AUDIT harnesses vs retrofitted docs (DOMINANT, un-anticipated)
Every `Run vX.Y milestone audit harness` job (v1.4…v1.15) FAILS C2/C7/C9 (and v1.4 C4/C5) against the
retrofitted android/nav docs:
- C2 (supervision): `docs/_glossary-android.md`, `docs/android-lifecycle/00-enrollment-overview.md`
- C7 (bare Knox): `docs/_glossary-android.md`
- C9 (COPE): `docs/_glossary-android.md:338`, `docs/android-lifecycle/03-android-version-matrix.md:58`
- v1.4 also C4 (`docs/common-issues.md` android links) + C5 (freshness)

These are the SAME line-shifts the Atom-1 sidecar repoint fixed for the **v1.16** harness (16/0/0 green) — but
each predecessor harness has its **own frozen sidecar** (`v1.4…v1.15-audit-allowlist.json`) with the OLD pins,
and HARN-06 forbids editing predecessor frozen surfaces. This cascades: every `check-phase-NN` with an
`AUDIT-HARNESS` sub-check that spawns a predecessor milestone-audit → fails; every apex → fails.

**Why new to v1.16:** at v1.15 close, `_glossary-android.md`/`common-issues.md`/lifecycle were NOT yet
retrofitted (that's v1.16 Phases 121–123). No precedent for this collision exists in the v1.15/v1.14 closes.

## Non-scope / advisory failures (not chain-gate)
- `Supervision-pin drift advisory (CI)` — the pre-existing `regenerate-supervision-pins.mjs --self-test` RED
  (flagged in 125-02; `continue-on-error` advisory class).
- `Quarterly c13_rotting_external link-check` — external URL rot (transient, external).

## Byte-unchanged gate (vs Wave-0 anchor `42b31c5`)
`git diff 42b31c5 HEAD` over frozen surfaces shows ONLY new v1.16 files (`v1.16-*`, `check-phase-120..125`,
`audit-harness-v1.16-integrity.yml`) — **no predecessor v1.4–v1.15 frozen surface modified.** Gate holds.

## Axis 1 (fresh clone) / Axis 3 (sub-agent) / cross-OS EXACT MATCH
**DEFERRED** — a meaningful 3-axis EXACT-MATCH + byte-gate runs against the *final green* close SHA, not a RED
tree (v1.15 precedent). Pending the Class-B resolution.

## CORRECTION (2026-07-09, post-investigation) — Class B is NOT a blocker
The initial "Class B is the blocker / owner decision required" framing above was a **mis-classification**.
Investigation (git forensics + primary sources) established that Class B is the repo's already-named,
already-sanctioned **`ACCEPTED-STANDALONE-CI-RED-01`** condition governed by decision **D-00a**:

- `v1.14-MILESTONE-AUDIT.md:81-84`: *"ACCEPTED PREDECESSOR STANDALONE-CI RED … Editing those frozen
  workflows/harnesses is barred by D-00a. A frozen milestone-audit validates its OWN close-SHA corpus, not
  future evolved corpus."* Carried verbatim into `v1.15-MILESTONE-AUDIT.md:350`.
- **Empirical proof:** `v1.14-milestone-audit.mjs` run against the v1.15-ship tree `3780c6f` = **EXIT 1
  (12 passed / 3 failed)**. v1.15 SHIPPED with predecessor harnesses already red — the current milestone's own
  harness (v1.16 = 16/0/0) + the chain apex are the authoritative gate, NOT the predecessor standalone jobs.

**Correct resolution (in-doctrine, no owner architectural decision needed):**
- **Class A** — remediate `check-phase-51/92/99` via Shape-1 `readAtV115Close` frozen-aware conversion (exact
  mirror of v1.15's `652f48e` for 50/52/65). In-class `check-phase-NN` maintenance (D-00a-permitted); no
  value-mask; `CHAIN_SKIP` empty. Greens the authoritative apex `check-phase-125` [48..124].
- **Class B** — RECORD as `ACCEPTED-STANDALONE-CI-RED-01` in `v1.16-MILESTONE-AUDIT.md` honest-accounting +
  `v1.16-DEFERRED-CLEANUP.md` (cite v1.14/v1.15 precedent). Do NOT fix. No frozen surface touched.
- **Authoritative green** = v1.16-milestone-audit (already 16/0/0) + chain apex green after Class A.

**Separate, genuinely owner-facing item (process, not architecture):** the canonical close shape is
content-phases→master → a harness-only Atom-2 PR → a planning-only close-gate. Phases 120–124 being built
local-only inflated PR #3 to the whole milestone. Advancing master with the content first restores the
canonical shape but does NOT change the Class-B acceptance (predecessor harnesses stay red regardless).
