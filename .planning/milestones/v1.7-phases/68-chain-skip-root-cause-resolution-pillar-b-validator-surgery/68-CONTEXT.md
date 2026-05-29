# Phase 68: CHAIN_SKIP Root-Cause Resolution (Pillar B — Validator Surgery) - Context

**Gathered:** 2026-05-26
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar B validator surgery** phase of v1.7. Resolves the 5-entry CHAIN_SKIP {48, 51, 58, 60, 61} suppression documented at `scripts/validation/check-phase-64.mjs:65-73` and carried in `check-phase-{62,63,64,65,66}.mjs` CHAIN_SKIP Set arrays. Full chain `check-phase-{48..66}.mjs` exits 0 on the Windows host with **NO** CHAIN_SKIP entries reported — for the first time since v1.5 close.

**Deliverables (exactly):**

- **CHAIN-01** — Hardening fix for `check-phase-51.mjs` + `check-phase-58.mjs` via centralized CRLF normalization in the `readFile()` helper (Option B per D-01). Both validators already PASS today (51 → 25/25, 58 → 26/26) because Phase 67 corpus sweeps left target docs in LF form, but the regex literal `\n` was never hardened. Single 2-line edit per validator copies the verbatim `readFile().replace(/\r\n/g, '\n')` idiom already proven in `check-phase-48.mjs:25`, `check-phase-60.mjs:24`, and `regenerate-supervision-pins.mjs:77` (Phase 31 `ca40eb9` lineage). The narrow ROADMAP SC#1 literal "regex updated to `\r?\n`" wording is satisfied via INTENT-equivalence (not literal-letter-grep) per D-01 dossier finding that the user-prompted Option A regex inventory would have injected ~9 semantic-bug edits to `[^\n]*` NEGATED character classes that are NOT line-ends.

- **CHAIN-02** — Three surgical fixes landing in a single validator-surgery commit:
  1. **Archive-path helper** `scripts/validation/_lib/archive-path.mjs` exports `resolveArchivedPhasePath(phaseSuffix)` (Option B per D-02). Affects 6 currently-impacted validators (check-phase-{31, 48, 60-×2, 62, 63}) AND every future milestone-close validator via HARNESS-03 Path-A copy at Phase 70. Resolves `.planning/phases/...` → `.planning/milestones/v1.5-phases/...` archived state for `48-VERIFICATION-broken-links.md` + `60-CALIBRATION.md`. **Bonus fix:** silent-swallow data-integrity bug at `check-phase-31.mjs:32`.
  2. **`regenerate-supervision-pins.mjs --self-test` lineage repoint** (Option A-prime per D-03). 2 surgical edits to one file: refresh BASELINE_9 `_glossary-android.md` coord entries `{79, 81, 181, 198}` → `{80, 82, 182, 199}` AND repoint `parseAllowlist()` from `v1.5-audit-allowlist.json` → `v1.6-audit-allowlist.json` (line 422). The v1.6 sidecar **already carries** the +1-rebased coordinate set from Phase 66-02 atomic harness commit `3a9a671`. The line-80 `### Supervision` Tier-2 hit is absorbed via v1.6 sidecar's pinned-Tier-2 `~` marker (documented known-legitimate exception in the helper itself at lines 472-476). Honors the helper author's anti-tolerance directive "do NOT relax the helper to silence the diff" (helper line 499) — we **tighten via lineage repoint**, not relax via tolerance window.
  3. **`v1.5-audit-allowlist.json` `supervision_exemptions[]` coord rebase for V-60-23** (advisor D-04 expansion of D-03 scope). The v1.5 sidecar still references `_glossary-android.md:16/49/122/202` but corpus tokens are now at `:17/50/123/203` after post-v1.5 commits `fc38b8a` + `62f345b`. Rebase the affected entries so `v1.5-milestone-audit.mjs` exits 0 fully-blocking (V-60-23 PASS) and `check-phase-{60, 61}` cascade resolution chains through. This is distinct from D-03 (D-03 fixes the helper-level dogfood test; this fixes the harness-level supervision-pin assertion).

- **CHAIN-03** — **ATOMIC** commit removing entries `{48, 51, 58, 60, 61}` from `CHAIN_SKIP` Set across `check-phase-62.mjs:66`, `check-phase-63.mjs:73`, `check-phase-64.mjs:73`, `check-phase-65.mjs:69`, `check-phase-66.mjs:??` in a single indivisible commit (Phase 66-02 commit `3a9a671` atomic-harness precedent applied here). Preserves chain-validator indivisibility — partial removal would create an inconsistent CHAIN_SKIP topology where 62 still suppresses while 65 doesn't.

- **MILESTONES.md corpus-defect remediation** (separately-classified Plan 68-04) — V-61-19 + V-61-20 are NOT content gaps but a **corpus defect** introduced by commit `cdcce23` (2026-05-07 archive automation), which inserted a **second, garbage v1.5 H2 entry** at MILESTONES.md lines 3-70 above the correct entry at lines 73-92. The validator's `indexOf('## v1.5 ')` returns the garbage entry → FAIL. Plan 68-04 fix = **DELETE MILESTONES.md lines 3-71** (correct entry already exists; zero content authoring needed). Separated from CHAIN-03 atomic commit to keep ROADMAP SC#5 "no out-of-band corpus edits" letter pristine for the atomic commit (advisor D-04 ground-truthed via REQUIREMENTS.md:4 + :48 + ROADMAP.md:283 + STATE.md:145 that "corpus" = `docs/*`; `.planning/MILESTONES.md` is planning doc, not corpus — so SC#5 does NOT block this edit, but the topological separation preserves auditor clarity).

- **68-VERIFICATION.md** (Plan 68-05) — Full chain `check-phase-{48..66}.mjs` exit codes + SKIPPED counts + SC#1-5 satisfaction checklist + atomic-commit SHA record + traceability flip checklist for PROJECT.md/REQUIREMENTS.md.

- **Traceability** — PROJECT.md CHAIN-01/02/03 Active→Validated flips with closing commit SHAs at Phase 68 close.

**Out of scope (Phase 68 owns nothing else):**
- CI-Linux `ubuntu-latest` runner job (Phase 69 Pillar C — CILINUX-01)
- v1.7 audit-harness lineage bump (Phase 70 Pillar D — HARNESS-01..06)
- Any corpus (`docs/*`) edits — Phase 67 already cleaned the surgical surface; the only non-validator file touched in Phase 68 is `.planning/MILESTONES.md` (deletion of cdcce23 garbage entry), which is a planning doc
- Any worktree-based execution (`use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`)
- Modification to older workflow files (`audit-harness-integrity.yml` v1.4 / `audit-harness-v1.5-integrity.yml` / `audit-harness-v1.6-integrity.yml`) per REQUIREMENTS.md:64
- Investigation/fix of the `cdcce23` archive-script root cause itself — flagged for v1.8+ in `v1.7-DEFERRED-CLEANUP.md` at Phase 70 close
- Any new validator C-checks beyond inheritance — v1.7 inherits C1-C16 from v1.6 per REQUIREMENTS.md Out-of-Scope table

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via parallel `/adversarial-review`-style scoring (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner) dispatched as 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (per user memory `feedback_adversarial_review_preference`). Each agent read the relevant ROADMAP/REQUIREMENTS/STATE sections + Phase 67 CONTEXT/VERIFICATION + the validator source files directly. Scores in parentheses (lower = better, matching the v1.6/v1.7 convention). All four recommendations user-approved without revision via single `Approve all 4 + 5-plan layout` selection.

### D-01: CHAIN-01 regex strategy — Option B (CRLF-normalize in `readFile()`) (score **B=8** / D=14 / C=15 / A=16)

**Decision:** Add `.replace(/\r\n/g, '\n')` to the `readFile()` helper at `check-phase-51.mjs:14-18` and `check-phase-58.mjs:18-22`. Zero regex changes. Verbatim idiom copied from `check-phase-48.mjs:25` + `check-phase-60.mjs:24` + `regenerate-supervision-pins.mjs:77`.

**Concrete 2 edits (download-and-execute by planner/executor; do NOT renegotiate text in plan-phase):**

| # | File:Line | BEFORE | AFTER |
|---|---|---|---|
| 1 | `check-phase-51.mjs:14-18` `readFile()` body | `return readFileSync(abs, 'utf8');` | `return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');` |
| 2 | `check-phase-58.mjs:18-22` `readFile()` body | `return readFileSync(abs, 'utf8');` | `return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');` |

**Rationale:**
- **Decisive adversarial wedge:** ROADMAP SC#1's narrow "regex updated" wording does NOT cover `check-phase-58.mjs:188`'s literal-string `c.indexOf("---\n", 4)` — under a CRLF re-injection simulation (autocrlf flip, contributor on a different Windows host), Option A leaves V-58-09 failing while Option B keeps everything PASS.
- **My proposed Option A inventory was wrong:** the `\n` tokens at `check-phase-51.mjs:190-192/205-208/221-223` are inside `[^\n]*` **negated character classes**, not line-ends. Option A as drafted would inject ~9 semantic-bug edits.
- **Option B reproduces a proven idiom byte-identically.** 3 existing validators in this same directory already use it. Phase 31 `ca40eb9` is the historical precedent.
- **SC#1 INTENT compliance:** The literal "regex updated to `\r?\n`" wording is satisfied via INTENT-equivalence (read-time normalization renders the regex's `\n` equivalent to `\r?\n` semantically). Phase 67 D-04 established the precedent that "no active validator constrains the boundary" (CONTEXT 67 line 106) — deviation from ROADMAP letter is documentable when validator-surface is inert.

**Caveat (planner must coordinate):** `check-phase-68.mjs` self-verifier (HARNESS-03 will Path-A copy from `check-phase-66.mjs`) must verify CHAIN-01 via INTENT (e.g., "exit 0 on Windows + 0 CHAIN_SKIP") and NOT via literal-letter grep of `\r?\n` in 51/58 source. Plan 68-01 author + Plan 68-05 close-gate author must align on the assertion shape.

**Validator surface check (verified by advisor):** Both target docs are currently LF on this Windows host (`docs/decision-trees/09-linux-triage.md` = 6204 bytes, LF; `docs/reference/4-platform-capability-comparison.md` = 21785 bytes, LF). Option B is hardening for the contributor-PR-on-CRLF-Windows-host scenario — defense-in-depth without observable behavior change today.

### D-02: CHAIN-02 archive-path mechanism — Option B (helper function `resolveArchivedPhasePath()`) (score **B=9** / A=21 / C=25 / D=29)

**Decision:** Introduce new file `scripts/validation/_lib/archive-path.mjs` exporting `resolveArchivedPhasePath(phaseSuffix)`. The helper takes a relative phase-path-fragment (e.g., `48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md`) and returns whichever variant exists on disk (live `.planning/phases/` first, then archived `.planning/milestones/v1.5-phases/` as fallback, then `null` for caller-decides FAIL semantics).

**Concrete helper signature (download-and-execute):**

```javascript
// scripts/validation/_lib/archive-path.mjs
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix) {
  const live = '.planning/phases/' + phaseSuffix;
  const archived = '.planning/milestones/v1.5-phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  if (existsSync(join(process.cwd(), archived))) return archived;
  return null;
}
```

**Affected validator call sites (6 today + future Path-A inheritors):**

| # | Validator | Line | Hardcoded path | Replace with |
|---|---|---|---|---|
| 1 | `check-phase-48.mjs:83` | check 5 body | `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` | `resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md')` |
| 2 | `check-phase-60.mjs:30` | `BROKEN_LINKS_INVENTORY` const | `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` | `resolveArchivedPhasePath(...)` same suffix |
| 3 | `check-phase-60.mjs:32` | `CALIBRATION_DOC` const | `.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md` | `resolveArchivedPhasePath('60-audit-harness-v1-5-finalization/60-CALIBRATION.md')` |
| 4 | `check-phase-31.mjs:32` | (advisor-discovered silent-swallow bug) | hardcoded `.planning/phases/...` | helper call + non-silent FAIL semantics |
| 5-6 | check-phase-{62, 63} | any `.planning/phases/...` literal | scan via grep before Plan 68-02 wave 1 | helper call |

**Rationale:**
- **REQUIREMENTS.md:20 literal compliance:** "handles BOTH pre-archival path AND post-archival path" — Option C (hardcode post-archival one-way) hard-violates this. Option B is the only mechanism that natively satisfies both.
- **Forward-compatibility for Phase 70 archival:** When v1.7 phases 67-70 archive at Phase 70 milestone-close, `check-phase-{67..70}.mjs` will Path-A copy from `check-phase-66.mjs` via HARNESS-03. If those validators already use the helper, they automatically resolve v1.6/v1.7 archive paths at v1.8+ archival. Option C would require re-editing each validator at every milestone-close — drift-amplifying.
- **DRY discipline:** 6 currently-affected validators today, plus all future milestone-close inheritors. Option A (try-both probe in-line per validator) would scatter the same 3-line logic across 6+ sites. Option B is the single point of intent.
- **Auditor-independence at Phase 70 fresh-clone:** Option D (read STATE.md/MILESTONES.md to detect archive state) breaks under `git clone --no-hardlinks` if STATE.md is mid-edit or if the milestone-archive detection state is ambiguous at the moment of execution. Option B is purely filesystem-driven — works transparently in any clone state.
- **Bonus discovery:** Advisor identified a pre-existing silent-swallow data-integrity bug at `check-phase-31.mjs:32` that the helper trivially fixes (caller decides FAIL semantics instead of validator silently passing on missing file).

**Note on `_lib/` subdirectory:** New directory introduced under `scripts/validation/` to host shared helpers. Phase 70 HARNESS-03 Path-A copy will inherit `_lib/` reference by suffix-match. Auditor-independence preserved (helper is filesystem-pure; no network, no shell).

### D-03: CHAIN-02 self-test line-drift fix — Option A-prime (BASELINE_9 coord rebase + sidecar lineage repoint v1.5→v1.6) (score **A-prime=8** / D=15 / A=17 / B=18 / C=24)

**Decision:** 2 surgical edits to one file (`scripts/validation/regenerate-supervision-pins.mjs`):

1. **Refresh BASELINE_9 `_glossary-android.md` coord entries** from `{79, 81, 181, 198}` → `{80, 82, 182, 199}` (entries in the helper's hand-authored Phase 43 reference set located at approximately lines 407-417 of the helper — exact lines confirmed by planner at Plan 68-02 wave 1).
2. **Repoint `parseAllowlist()`** from `v1.5-audit-allowlist.json` → `v1.6-audit-allowlist.json` at helper line 422.

The v1.6 sidecar **already carries** the +1-rebased coordinate set from Phase 66-02 atomic harness commit `3a9a671` (Apple Business banner additions to `_glossary-android.md`).

**Tier-2 line-80 (`### Supervision`) resolution:** Absorbed via v1.6 sidecar's pinned-Tier-2 `~` marker (helper's own anti-tolerance exception doctrine at lines 472-476 — quoting that block: pinned-Tier-2 entries are the explicit human-promotion mechanism). No new pinning; the v1.6 sidecar already has the pin. This means the `Un-pinned Tier-2 count MUST be 0` postcondition is satisfied by lineage repoint without any sidecar surgery on v1.5.

**Rationale:**
- **Reframes the problem at its root.** The empirical FAIL is NOT a corpus drift bug — it's a **sidecar-target staleness bug**. The helper reads v1.5 (last touched 2026-05-06, pre-Phase-62-07 banner additions) but the v1.6 sidecar already encodes the post-banner truth. The +1 line shift is a Phase 62 effect, and Phase 66 already absorbed it.
- **Honors the helper author's anti-tolerance directive** (helper line 499): "do NOT relax the helper to silence the diff." Option B (±1 tolerance) was the heaviest-penalty option for violating this. Option A-prime tightens via lineage repoint — the OPPOSITE of relaxation.
- **ROADMAP SC#5 compliance** ("no out-of-band corpus edits; validator-only commit"): zero corpus edits, single validator-source-file edit. Sidecar JSON files are NOT corpus (they are validator data; STATE.md:145 corroborates).
- **Auditor-independence preserved:** v1.5 sidecar untouched. Phase 70 HARNESS-02 BASELINE_11 refresh inherits cleanly via 1-line repoint to v1.7 sidecar at that future commit.
- **Smaller blast radius than Option A literal** (which would edit 7+ sidecar entries in `v1.5-audit-allowlist.json`).

**Note on V-60-23 (separate but coordinated):** D-04 advisor identified a DISTINCT line-drift bug — `v1.5-milestone-audit.mjs` supervision-pin assertion fails because `v1.5-audit-allowlist.json` `supervision_exemptions[]` array references `_glossary-android.md:16/49/122/202` while corpus is at `:17/50/123/203` (post-v1.5 commits `fc38b8a` + `62f345b`). This is harness-level not helper-level. **Plan 68-02 wave 2 also rebases these entries** in the same atomic CHAIN-02 commit. The two rebases (helper's BASELINE_9 coords + harness's `supervision_exemptions[]` coords) are coordinated in one commit but operate on different surfaces.

### D-04: CHAIN-03 cascade scope — Option E (4-plan split with separate MILESTONES.md remediation) (score **E=10** / unspecified others)

**Decision:** 4 plans for the CHAIN-NN deliverables + 1 close-gate plan = 5-plan Phase 68:

- **Plan 68-01** — CHAIN-01 (D-01 Option B readFile centralization in check-phase-51 + check-phase-58). Single commit. Validator-surgery only.
- **Plan 68-02** — CHAIN-02 (D-02 Option B archive-path helper across 6 validators + D-03 Option A-prime helper repoint + V-60-23 v1.5 sidecar `supervision_exemptions[]` rebase). Single commit. Validator-surgery only.
- **Plan 68-03** — CHAIN-03 cascade verification + **ATOMIC** CHAIN_SKIP removal across `check-phase-62.mjs:66` / `check-phase-63.mjs:73` / `check-phase-64.mjs:73` / `check-phase-65.mjs:69` / `check-phase-66.mjs:??` (5 files in ONE indivisible commit per Phase 66-02 atomic-harness precedent `3a9a671`). Validator-surgery only.
- **Plan 68-04** — MILESTONES.md `cdcce23` corpus-defect remediation (DELETE lines 3-71 — the second-garbage v1.5 H2 entry inserted by archive automation). Single commit. Planning-doc edit only (NOT corpus per advisor's empirical grounding).
- **Plan 68-05** — Close-gate (full chain re-run + 68-VERIFICATION.md authoring + traceability flips). Single commit.

**Empirical groundings that drive this split:**

1. **"Corpus" definition resolved** — 4 independent sources (`.planning/REQUIREMENTS.md:4`, `:48`, `.planning/ROADMAP.md:283` Phase 67 SC#4, `.planning/STATE.md:145`) all use "corpus" = `docs/*`. `.planning/MILESTONES.md` is planning doc. SC#5 "no out-of-band corpus edits" does **NOT** block the MILESTONES.md edit. The 4-plan separation is **NOT** strictly required by SC#5 but is preserved for topological clarity at Phase 70 terminal re-audit (separate plans = separate revertibility per requirement).

2. **V-61-19 / V-61-20 are NOT content gaps** — Commit `cdcce23` (2026-05-07 archive automation) inserted a SECOND, GARBAGE v1.5 H2 entry at `.planning/MILESTONES.md` lines 3-70 ABOVE the correct entry at lines 73-92. The validator's `indexOf('## v1.5 ')` returns the garbage entry first → "Methodology highlights missing" + "DEFER-07 not cited" FAIL. The correct entry at lines 73-92 already has both subsections + DEFER-07 citation. **Fix = surgical deletion of lines 3-71. Zero content authoring.**

3. **V-60-23 root cause is distinct from CHAIN-01/02 literal scope** — Empirically, `v1.5-milestone-audit.mjs` exit 1 is caused by `supervision_exemptions[]` line-number drift in `v1.5-audit-allowlist.json` (NOT cascaded from check-phase-48 or self-test). This expands the D-03 fix scope (D-03 handles the helper-level self-test; V-60-23 fix handles the harness-level supervision-pin assertion). Both rebase operations land in Plan 68-02 commit.

4. **Atomic-commit topology preserved for CHAIN-03 specifically** — ROADMAP SC#4 hard-locks "single atomic commit" for the CHAIN_SKIP entries removal. Plan 68-03 honors this literally. Plans 68-01, 68-02, 68-04, 68-05 are per-requirement boundaries (Phase 67 D-04 score E=7 precedent inherited).

5. **`cdcce23` archive-script defect itself is OUT of scope** — Flagged for `v1.7-DEFERRED-CLEANUP.md` at Phase 70 HARNESS-06 close. Investigation of the archive automation root cause may surface as v1.8+ work. Phase 70 v1.7 archival may re-trigger the same garbage-insert defect — Plan 70 author must audit `.planning/MILESTONES.md` after archival.

**Recommended plan-and-commit layout:**

```
Plan 68-01 (CHAIN-01 — readFile CRLF centralization)
  Wave 1: Edit check-phase-51.mjs readFile() — append .replace(/\r\n/g, '\n')
  Wave 2: Edit check-phase-58.mjs readFile() — same edit
  Wave 3: Verify both still PASS (51 → 25/25; 58 → 26/26) — no regressions
  Pre-commit dry-run:
    - node scripts/validation/check-phase-51.mjs && echo OK
    - node scripts/validation/check-phase-58.mjs && echo OK
  Commit message:
    fix(validation): centralize CRLF normalization in check-phase-51 + 58 (CHAIN-01)

Plan 68-02 (CHAIN-02 — archive-path helper + self-test repoint + v1.5 sidecar rebase)
  Wave 1: Create scripts/validation/_lib/archive-path.mjs (helper export)
  Wave 2: Apply helper at check-phase-48.mjs:83 + check-phase-60.mjs:30+32 + check-phase-31.mjs:32 + check-phase-62/63 (grep first)
  Wave 3: Edit regenerate-supervision-pins.mjs BASELINE_9 coords ({79,81,181,198}→{80,82,182,199})
          + repoint parseAllowlist() from v1.5 → v1.6 sidecar (line 422)
  Wave 4: Rebase v1.5-audit-allowlist.json supervision_exemptions[] coords for V-60-23
          (entries pointing to _glossary-android.md:16/49/122/202 → :17/50/123/203;
          exact entries discoverable via diff post-helper run)
  Pre-commit dry-run:
    - node scripts/validation/regenerate-supervision-pins.mjs --self-test && echo OK
    - node scripts/validation/check-phase-48.mjs && echo OK    (expect: 7/7 PASS)
    - node scripts/validation/v1.5-milestone-audit.mjs && echo OK
    - node scripts/validation/check-phase-31.mjs && echo OK    (verify silent-swallow bug fix)
  Commit message:
    fix(validation): archive-path helper + self-test lineage repoint + v1.5 sidecar coord rebase (CHAIN-02)

Plan 68-03 (CHAIN-03 — cascade verify + ATOMIC CHAIN_SKIP removal)
  Wave 1: Verify check-phase-60 + check-phase-61 cascade-pass after Plans 68-01 + 68-02 land
          (re-run each; identify any residual failures — expected only V-61-19/20 if Plan 68-04 hasn't landed)
  Wave 2: Edit ALL FIVE files in single staging:
    - check-phase-62.mjs:66  CHAIN_SKIP = new Set([])  (was [48,51,58,60,61])
    - check-phase-63.mjs:73  CHAIN_SKIP = new Set([])
    - check-phase-64.mjs:73  CHAIN_SKIP = new Set([])
    - check-phase-65.mjs:69  CHAIN_SKIP = new Set([])
    - check-phase-66.mjs:??  CHAIN_SKIP = new Set([])
    (also update the comment block above each CHAIN_SKIP citing Phase 68 closure)
  Wave 3: Pre-commit dry-run (full chain):
    - for i in 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66; do
        node scripts/validation/check-phase-${i}.mjs || echo FAIL ${i}
      done
    - Expected: ALL PASS, 0 SKIPPED, 0 FAIL
  ATOMIC commit (5 files in ONE SHA):
    fix(validation): atomically remove CHAIN_SKIP {48,51,58,60,61} from check-phase-62..66 (CHAIN-03)

Plan 68-04 (MILESTONES.md cdcce23 corpus-defect deletion — separate plan)
  Wave 1: Verify .planning/MILESTONES.md lines 3-70 are the GARBAGE second-v1.5-entry
          (confirm by diff vs lines 73-92 = correct entry; commit cdcce23 attribution)
  Wave 2: Delete lines 3-71 (preserve blank line spacing)
  Wave 3: Pre-commit dry-run:
    - node scripts/validation/check-phase-61.mjs && echo OK   (expect V-61-19 + V-61-20 PASS)
  Commit message:
    fix(planning): remove duplicate v1.5 MILESTONES entry inserted by cdcce23 archive automation (Phase 68-04)

Plan 68-05 (close-gate — full chain green + 68-VERIFICATION.md + traceability)
  Wave 1: Full chain final run check-phase-{48..66}.mjs → ALL PASS, 0 SKIPPED
  Wave 2: v1.6-milestone-audit.mjs → expect 15/15 PASS unchanged
  Wave 3: Author 68-VERIFICATION.md:
    - SC#1 satisfaction (CHAIN-01 INTENT compliance via readFile centralization)
    - SC#2 satisfaction (archive-path helper + self-test repoint + v1.5 sidecar rebase)
    - SC#3 satisfaction (60 + 61 exit 0 without suppression)
    - SC#4 satisfaction (CHAIN_SKIP removed in single atomic commit; SHA recorded)
    - SC#5 satisfaction (self-test exits 0; validator-only-commit verified for CHAIN-03)
    - Atomic-Commit SHA Record
    - Discoveries (cdcce23 archive-script defect deferred to v1.8+; check-phase-31 silent-swallow bug closed)
    - Phase 69 Readiness Signal
  Wave 4: Traceability — PROJECT.md + REQUIREMENTS.md CHAIN-01/02/03 Active→Validated flips
  Commit message:
    docs(68-05): Phase 68 close-gate — chain green + 68-VERIFICATION.md + traceability flips
```

**Total commit count:** 5. Atomic ONLY for CHAIN-03 (per ROADMAP SC#4 contract). Per-requirement boundaries elsewhere preserve clean revertibility (Phase 67 D-04 score E=7 precedent inherited).

**Rollback semantics:** `git revert <Plan 68-03 SHA>` cleanly restores CHAIN_SKIP suppression across all 5 v1.6 validators (full atomicity). `git revert <Plan 68-04 SHA>` independently re-inserts the cdcce23 garbage entry if needed (separate concern). Each Plan 68-01 + 68-02 revert restores its validator surgery independently.

### Claude's Discretion

- Exact line numbers within `check-phase-31.mjs:32` silent-swallow bug fix (advisor flagged at line 32; planner verifies exact context at Plan 68-02 wave 2)
- Exact `_glossary-android.md` coord entries to rebase in v1.5-audit-allowlist.json `supervision_exemptions[]` for V-60-23 (advisor noted `:16/49/122/202 → :17/50/123/203` shifts from commits `fc38b8a` + `62f345b`; planner diff-discovers exact array indexes at Plan 68-02 wave 4)
- Whether to land Plan 68-01 as a single 2-file commit OR two single-file commits (low-risk diff either way; either choice satisfies the per-plan boundary)
- Whether `check-phase-66.mjs` CHAIN_SKIP line is `:73` (matching 62/63/64) or different (planner greps to confirm at Plan 68-03 wave 2)
- Whether to grep check-phase-62 + 63 for additional hardcoded `.planning/phases/...` paths (advisor flagged "6 currently-affected validators" — planner enumerates exhaustively at Plan 68-02 wave 2 before applying helper)
- Whether the cdcce23 root-cause investigation is filed as a single v1.7-DEFERRED-CLEANUP.md line item OR a more elaborate deferred-issue artifact (Plan 68-05 author decides)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 68 contract docs
- `.planning/ROADMAP.md` §Phase 68 (lines 289-299) — Goal + Success Criteria #1-5
- `.planning/REQUIREMENTS.md` §Pillar B (lines 17-27) — CHAIN-01 / CHAIN-02 / CHAIN-03 contracts + Traceability table (lines 79-82)
- `.planning/STATE.md` lines 121-148 — anti-regression invariants (lines 121-130); CHAIN_SKIP carry-over state (lines 142-143); v1.7 phase plan summary (lines 100-135)
- `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` §CHAIN_SKIP (lines 95-112) — root cause documentation + v1.7 CI-Linux trigger amendment

### Source-of-truth root cause docs
- `scripts/validation/check-phase-64.mjs:55-73` — original CHAIN_SKIP rationale block; documents both (a) archive drift + line-number shift in regenerate-supervision-pins.mjs and (b) Windows CRLF-LF mismatch root causes
- `.planning/milestones/v1.6-DEFERRED-CLEANUP.md:108` — Phase 66 D-03 advisor finding amending Section K aspirational language from "fresh Linux worktree" to "v1.7 CI-Linux job" (auditor-independence reconciliation)

### Validator surgery targets
- `scripts/validation/check-phase-48.mjs:22-26` — `readFile()` idiom Plan 68-01 copies; line 83 hardcoded archive path Plan 68-02 fixes
- `scripts/validation/check-phase-51.mjs:14-18` — `readFile()` body Plan 68-01 edits (Option B target #1)
- `scripts/validation/check-phase-58.mjs:18-22` — `readFile()` body Plan 68-01 edits (Option B target #2)
- `scripts/validation/check-phase-58.mjs:188` — `c.indexOf("---\n", 4)` literal-string adversarial wedge (D-01 dossier finding — only Option B covers this)
- `scripts/validation/check-phase-60.mjs:21-25` — `readFile()` idiom (Option B precedent #2); lines 30 + 32 `BROKEN_LINKS_INVENTORY` + `CALIBRATION_DOC` Plan 68-02 fixes
- `scripts/validation/check-phase-31.mjs:32` — silent-swallow data-integrity bug Plan 68-02 fixes (D-02 bonus discovery)
- `scripts/validation/check-phase-{62,63,64,65,66}.mjs` (CHAIN_SKIP at `:66/:73/:73/:69/??`) — Plan 68-03 ATOMIC removal targets
- `scripts/validation/regenerate-supervision-pins.mjs:73-78` — `readFile()` Phase 31 `ca40eb9` lineage comment; lines 407-417 BASELINE_9 array (Plan 68-02 wave 3 target); line 422 `parseAllowlist()` repoint (Plan 68-02 wave 3 target); lines 472-476 pinned-Tier-2 `~` doctrine; line 499 anti-tolerance directive
- `scripts/validation/v1.5-audit-allowlist.json` `supervision_exemptions[]` — Plan 68-02 wave 4 coord-rebase target (V-60-23 fix)
- `scripts/validation/v1.6-audit-allowlist.json` — Plan 68-02 wave 3 new lineage target (carries +1-rebased coords from Phase 66-02 `3a9a671`)

### Archived artifact sources (for the helper to resolve)
- `.planning/milestones/v1.5-phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` — verified exists 2026-05-26; `check-phase-48.mjs` check 5 + `check-phase-60.mjs` V-60-08/24/25 targets
- `.planning/milestones/v1.5-phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md` — `check-phase-60.mjs` V-60-24 target

### Corpus defect target
- `.planning/MILESTONES.md` lines 3-70 — garbage v1.5 H2 entry inserted by commit `cdcce23` (2026-05-07 archive automation); Plan 68-04 DELETES lines 3-71. Correct entry at lines 73-92 (Methodology highlights + DEFER-07/DEFER-08 citations).

### Atomic-commit precedents
- v1.6 Phase 66-02 commit `3a9a671` (atomic harness commit — 3 files indivisible: v1.6-milestone-audit.mjs C11+regex-7 / v1.6-audit-allowlist.json c13_rotting_external / regenerate-supervision-pins.mjs BASELINE_10) — Plan 68-03 atomic CHAIN_SKIP removal inherits this pattern
- v1.5 Plan 60-08 atomic-harness-commit `c2abdd4` — earlier precedent
- Phase 62-08 atomic-harness-commit — same lineage

### Anti-regression precedents (read for context, not re-doing)
- `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-CONTEXT.md` D-01..D-04 (lines 30-155) — adversarial-review scoring format Phase 68 inherits verbatim; D-04 score E=7 per-plan-per-requirement commit topology
- `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md` — Plan 67-03 close-gate format Plan 68-05 inherits
- `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-CONTEXT.md` D-01/D-03 — atomic-commit indivisibility doctrine + auditor-independence at fresh-clone re-audit

### Advisor dossiers (for planner deep-dive)
- `.claude/tmp/phase68-D01-advisor.md` (D-01 full dossier — CRLF strategy + Option A inventory bug discovery)
- `.claude/tmp/phase68-D02-advisor.md` (D-02 full dossier — 6-validator helper scope + check-phase-31 silent-swallow bug)
- `.claude/tmp/phase68-D03-advisor.md` (D-03 full dossier — sidecar lineage staleness reframe + pinned-Tier-2 doctrine)
- `.claude/tmp/phase68-D04-advisor.md` (D-04 full dossier — corpus definition empirical grounding + cdcce23 garbage-entry discovery + V-60-23 root cause)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`readFile()` CRLF-normalization idiom** — already proven in `check-phase-48.mjs:25` + `check-phase-60.mjs:24` + `regenerate-supervision-pins.mjs:77` (Phase 31 `ca40eb9` lineage). Plan 68-01 copies verbatim to check-phase-51 + 58.
- **Atomic-harness-commit pattern** — v1.6 Phase 66-02 commit `3a9a671` (3 files indivisible). Plan 68-03 inherits for 5-file CHAIN_SKIP removal.
- **Pinned-Tier-2 `~` marker doctrine** — `regenerate-supervision-pins.mjs:472-476` documents the explicit human-promotion mechanism for known-legitimate Tier-2 occurrences. The v1.6 sidecar already pins line 80 `### Supervision` via this mechanism, absorbing the empirical FAIL.
- **Per-plan-per-requirement commit boundary** — Phase 67 D-04 (CONTEXT 67 lines 101-155). Plan 68-{01,02,03,04,05} inherits.
- **Validator-as-deliverable pattern** — from v1.3+; check-phase-NN.mjs ships in the same commit as the phase deliverables it asserts. Phase 68 inverts: the validators ARE the deliverables.

### Established Patterns
- **CHAIN_SKIP suppression-with-justification** — `check-phase-64.mjs:55-73` is the canonical CHAIN_SKIP rationale block (replicated verbatim in check-phase-{62,63,65,66}). Plan 68-03 must update the comment to cite Phase 68 closure when stripping `CHAIN_SKIP = new Set([48, 51, 58, 60, 61])` → `CHAIN_SKIP = new Set([])`.
- **CHAIN_PHASES / V-NN-SELF guard** — every chain validator excludes its own phase number (V-NN-SELF assertion enforces this). Plan 68-03 does NOT touch CHAIN_PHASES — only the CHAIN_SKIP suppression Set.
- **Helper indirection via `_lib/`** — new in this phase. `scripts/validation/_lib/archive-path.mjs` is the first shared helper. Future v1.7+ helpers (CRLF-aware path resolution, etc.) may colocate.
- **ANNOTATE-not-rewrite sidecar mode** — Phase 67 D-04 established for `c13_rotting_external`. Plan 68-02 wave 4 INVERTS this for `supervision_exemptions[]` — those are coord-pinned and MUST be rebased (not annotated) when corpus tokens shift. Distinct semantics; advisor confirmed both modes coexist in the same JSON file under different array keys.

### Integration Points
- **`scripts/validation/_lib/archive-path.mjs`** — NEW shared helper. Phase 70 HARNESS-03 Path-A copy of `check-phase-66.mjs` → `check-phase-{67..70}.mjs` will inherit the helper reference by suffix-match.
- **`v1.6-audit-allowlist.json` `supervision_exemptions[]`** — Plan 68-02 wave 3 new lineage target for the helper. Phase 70 HARNESS-02 BASELINE_11 refresh will 1-line repoint to `v1.7-audit-allowlist.json` at that future commit.
- **`v1.5-audit-allowlist.json` `supervision_exemptions[]`** — Plan 68-02 wave 4 coord-rebase target (V-60-23 fix). This v1.5 sidecar remains the canonical reference for `v1.5-milestone-audit.mjs`; auditor-independence preserved by limiting edits to the array surface that drifted (not the array shape).
- **`.planning/MILESTONES.md` lines 3-71** — Plan 68-04 DELETE target. Phase 70 v1.7 milestone-archival may re-trigger the cdcce23 garbage-insert defect; flagged for `v1.7-DEFERRED-CLEANUP.md` and Plan 70 author audit.
- **Chain validators check-phase-{48..66}.mjs** — Plan 68-05 close-gate re-runs the full chain. Expected status: ALL PASS, 0 SKIPPED, 0 FAIL. This is the first time since v1.5 close.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (per user memory `feedback_adversarial_review_preference`). Phase 68 honored this — 4 parallel `gsd-advisor-researcher` agents dispatched in adversarial-review mode (Finder/Adversary/Referee scoring); all 4 picks user-approved without revision via single "Approve all 4 + 5-plan layout" selection.
- **User maximum-effort preference** (per user memory `feedback_effort_level`) — every gray-area dossier produced concrete operational steps + acceptance criteria + anti-regression risk analysis + adversarial-wedge identification. Phase 68 dossiers exceeded Phase 67 in depth — D-01 caught the user's own Option A regex-inventory error; D-02 found a silent-swallow bug at check-phase-31; D-03 reframed the entire FAIL from corpus drift to sidecar lineage staleness; D-04 identified the cdcce23 archive-script garbage-entry defect.
- **Sequential-on-main-tree execution durable** (per user memory `project_execphase_sequential.md` + `.planning/config.json:7` `use_worktrees:false`). Plans 68-01..05 execute sequentially on the main tree. NO worktree experiments.
- **Phase 68 = Pillar B "Validator Surgery"** (per ROADMAP:290). All decisions tilt toward minimum-blast-radius + maximum-revertibility WITHIN the atomic-commit-for-CHAIN-03 constraint. Phase 67's Pillar A pattern (per-plan revert clean per requirement) carries forward except where CHAIN-03's chain-validator-indivisibility forces atomicity.
- **Today's date is 2026-05-26.** Plan 68-05 close-gate authoring date. Frontmatter `last_verified:` bumps NOT needed (no corpus edits; Plan 68-04 is a deletion of garbage, not a content edit — preserves original v1.5 entry's `last_verified` semantics).

</specifics>

<deferred>
## Deferred Ideas

### Already locked elsewhere (not new deferrals — recorded for downstream awareness)
- **CI-Linux ubuntu-latest runner job** — Phase 69 Pillar C (CILINUX-01). Phase 68 makes no CI workflow modifications (REQUIREMENTS.md:64 prohibits older workflow edits).
- **v1.7 audit harness lineage bump** — Phase 70 Pillar D (HARNESS-01..06). Phase 68 helper `_lib/archive-path.mjs` + helper repoint to v1.6 sidecar carry forward into v1.7 sidecar at Phase 70 via HARNESS-02 + HARNESS-03 Path-A inheritance.
- **CI-3 Managed Apple ID corpus rename** (45 occurrences / 16 files) — DEFERRED to v1.8+ per REQUIREMENTS.md:65, contingent on Microsoft Intune adopting the rebrand portal-side.
- **Multi-tenant Apple Business surfaces** / **Apple Business Device API documentation** / **per-OU Conference Room Display deep-dive** / **Account Holder lockout standalone runbook** / **Apple School Manager (ASM)** — all carried forward in `v1.7-DEFERRED-CLEANUP.md` (authored at Phase 70 close per HARNESS-06).

### Discovered during Phase 68 discussion (new for v1.7-DEFERRED-CLEANUP.md or v1.8+)
- **`cdcce23` archive-script garbage-insert root cause** — Commit `cdcce23` (2026-05-07 archive automation) inserted a duplicate v1.5 H2 entry at `.planning/MILESTONES.md` lines 3-70. Plan 68-04 deletes the symptom but does NOT investigate the script. Phase 70 v1.7 milestone-archival may re-trigger the same defect — `gsd-complete-milestone` skill / archive-automation script may need a regression-guard. **Action:** Plan 68-05 author files this in `v1.7-DEFERRED-CLEANUP.md` line item with cdcce23 SHA citation; Plan 70 author audits `.planning/MILESTONES.md` post-archival.
- **`check-phase-31.mjs:32` silent-swallow data-integrity bug** — Pre-existing bug where the validator silently passes on missing file. Plan 68-02 wave 2 fixes by routing through the new helper (caller-decides FAIL semantics). Bug attribution + closure noted in 68-VERIFICATION.md. **No further v1.8+ work — closed in this phase.**
- **Helper indirection precedent under `scripts/validation/_lib/`** — Phase 68 introduces the first shared validator helper. Future v1.7+ phases may colocate additional helpers (CRLF-aware path resolution, sidecar coord rebase utilities). v1.8+ may formalize a helper-style guide. v1.7 Phase 70 HARNESS-03 Path-A copy will inherit `_lib/` reference by suffix-match; no special handling required.
- **Per-entry sidecar coord drift detection** — Phase 68 fixes V-60-23 via one-time rebase of `supervision_exemptions[]` coords. v1.8+ may introduce an automated diff job that flags coord drift before it lands in CHAIN_SKIP. No v1.7 scope.
- **`check-phase-58.mjs:188` `c.indexOf("---\n", 4)` literal-string CRLF risk** — Now defended by Plan 68-01 readFile centralization. v1.8+ may sweep all `indexOf("\n", ...)` literal-string usages across `scripts/validation/*.mjs` for defense-in-depth. No v1.7 scope.

</deferred>

---

*Phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery*
*Context gathered: 2026-05-26*
