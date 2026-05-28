# Phase 70: v1.7 Audit Harness Lineage Bump + Milestone Close (Pillar D — Close-Gate) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 70-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-28
**Phase:** 70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo
**Areas discussed:** Per-phase validator scope (HARNESS-03), Atomic-commit composition, Terminal re-audit + ARCHIVE-01, Plan structure + audit doc scope
**Mode:** /gsd-discuss-phase 70 --chain + parallel /adversarial-review per gray area (matching Phase 69 69-CONTEXT.md precedent + user memory `feedback_adversarial_review_preference`)
**Methodology:** 4 parallel `gsd-advisor-researcher` agents dispatched in adversarial-review mode (Finder/Adversary/Referee per option; lower score = better)

---

## D-01: Per-phase validator scope (HARNESS-03 — check-phase-67..70.mjs assertion design)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A) HEAD-coupled (default Path-A literal copy) | V-NN-NN reads current corpus via `fs.readFileSync`; risks SCOPE-GAP-61-class recurrence | 13 | |
| B) Uniform `[v1.7-frozen @ Phase70CloseSHA]`-aware | All V-NN-NN read via `git show` at v1.7-close SHA; over-applies freezing | 13 | |
| **C) Phase-specific freshness rules per assertion class** | SWEEP corpus = v1.7-frozen; CHAIN_SKIP empty-Set = HEAD; workflow YAML = HEAD; milestone audit doc = v1.7-frozen — mirrors check-phase-61.mjs dual-mode router post-`2d61981` | **9** | **✓** |
| D) Planning-doc-only frozen-aware + bundled retrospective audit of check-phase-{48..66}.mjs | Captures full HEAD-coupled assertion class corpus-wide; rejected for scope-creep into v1.8+ work | 16 | |

**Referee winner:** Option C (lowest score 9)
**User's choice:** Approve (single "Approve all 4" selection)
**Notes:** Option C is the sharpest reading because the Path-A source itself (check-phase-61.mjs post-`d7d7d5f` + post-`2d61981`) IS a per-assertion-class router. Plan 70-01 Wave-1 deliverable: `70-CONVENTIONS.md` per-V-NN-NN freshness routing matrix (~16-40 rows). v1.8+ retrospective audit of check-phase-{48..66}.mjs REMAINS deferred per HARNESS-FORWARD-01 + SCOPE-GAP-61 explicit v1.8+ scope boundary.

---

## D-02: Atomic-commit composition for HARNESS-01+02+03+04

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A) Single mega-atomic (8+ files in ONE SHA) | All HARNESS-01..04 in one commit; max indivisibility but bisect-impossibility | 18 | |
| B) Phase 66-02 core-atomic + per-validator splits + workflow separate | Faithful 3-file core but 4-way validator split breaks chain-topology indivisibility | 13 | |
| **C) Two-atomic split (harness-core / validator+CI surface)** | Atom 1 = HARNESS-01+02+BASELINE_11 (literal Phase 66-02 scope) + Atom 2 = HARNESS-03 4 validators + HARNESS-04 workflow EXTEND (CI-execution-graph atom) — honors precedent at both natural cleavage planes | **10** | **✓** |
| D) Per-requirement plans with atomic-within-plan (Phase 67-02 precedent) | Corpus-sweep precedent ≠ harness-lineage-bump precedent; V-70-NN chicken-and-egg | 14 | |

**Referee winner:** Option C (lowest score 10)
**User's choice:** Approve
**Notes:** Sharpest reading of dual-precedent stack — Phase 66-02 `3a9a671` 3-file harness-core atomic + Phase 68 `7b635ca` 5-validator chain-topology atomic are TWO distinct atomic precedents. Atom 1 (Wave 2 Plan 70-02 commit) = literal Phase 66-02 3-file scope; Atom 2 (Wave 3 Plan 70-03 commit) = validator+CI surface indivisibility. Pre-commit dry-run protocol: stage Atom 1 + harness self-test green → commit → stage Atom 2 + full chain green → commit.

---

## D-03: Terminal re-audit mechanics (HARNESS-05) + ARCHIVE-01 timing

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A) Local fresh-clone primary + GHA optional + ARCHIVE-01 deferred | Honors D-03 LOCKED literally but under-uses Phase 69's CI-Linux investment | 11 | |
| **B) Local fresh-clone MANDATORY + GHA workflow_dispatch MANDATORY + ARCHIVE-01 deferred to `/gsd-complete-milestone`** | Operationally stacks all 3 independence axes (fresh-clone D-03 + fresh sub-agent D-22 + cross-OS Linux GHA CILINUX-01); ARCHIVE-01 stays at archival skill boundary | **10** | **✓** |
| C) Option B + ARCHIVE-01 in-scope at Phase 70 | Over-scopes HARNESS-06 (REQUIREMENTS.md:40 does NOT include archival); risks Phase 70 fork to v1.8+ surgery | 12 | |
| D) Option A + ARCHIVE-01 as standalone Plan 70-NN | Over-engineered (1-line diff-check ≠ Plan-worthy deliverable); compounds CI-Linux under-use | 14 | |

**Referee winner:** Option B (lowest score 10)
**User's choice:** Approve
**Notes:** STATE.md:111 explicitly elevates CI-Linux to "new auditor-independence axis"; Option B is the only option that operationally stacks all 3 at the close-gate moment. GHA workflow_dispatch cost empirically negligible (~56s Linux runtime per Phase 69 TIMEOUT-01 closure with 32× headroom). ARCHIVE-01 entry's own wording (`v1.7-DEFERRED-CLEANUP.md:21`) locates the diff-check at the archival invocation site, NOT inside HARNESS-06 — preserves skill-boundary discipline. Phase 70 hand-off to `/gsd-complete-milestone` documented in v1.7-MILESTONE-AUDIT.md Sign-off section.

---

## D-04: Plan structure + v1.7-MILESTONE-AUDIT.md depth (HARNESS-06)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A) 5-plan v1.6-Phase-66-mirror + full v1.6 audit-doc depth | Same plan count but loses explicit `wave: N` frontmatter | 10 | |
| B) 6-plan 1-per-HARNESS-NN + 1/3-scaled audit doc | Breaks D-02 ATOMIC boundary (HARNESS-01+02 atomic split); breaks v1.4.1/v1.5/v1.6 audit-doc symmetry | 22 | |
| C) 4-plan compact + maintained v1.6 depth | Merges HARNESS-03 + HARNESS-04 surfaces Phase 66 deliberately separated; loses Wave-1 scaffold dedicated surface | 16 | |
| **D) Wave-based 5-plan with explicit Wave 1..5 frontmatter + full v1.6 depth** | Phase 66 plan frontmatter empirically wave-tagged (`wave: N` + `depends_on: [66-(N-1)]`); D-02 ATOMIC boundary protected as Wave 2 + Wave 3; Wave 1 dedicated scaffold absorbs HARNESS-FORWARD-01 carry-forward | **6** | **✓** |

**Referee winner:** Option D (lowest score 6)
**User's choice:** Approve
**Notes:** Phase 66 frontmatter empirically uses `wave: 1..5` + `depends_on: [66-(N-1)]` (verified in 66-01..66-05). Plan layout: Wave 1 (70-01 scaffold + 70-CONVENTIONS.md per-V-NN-NN freshness matrix) → Wave 2 (70-02 ATOMIC Atom 1 per D-02) → Wave 3 (70-03 ATOMIC Atom 2 per D-02) → Wave 4 (70-04 terminal re-audit 3-axis per D-03) → Wave 5 (70-05 HARNESS-06 milestone close — two-commit chicken-and-egg resolution per Plan 68-05 / 69-02 precedent). v1.7-MILESTONE-AUDIT.md adds NEW "Discoveries Surfaced During Execution" section (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 + ARCHIVE-01 root-cause) as v1.7-specific innovation; v1.8+ MAY adopt as template feature.

---

## Claude's Discretion

- **D-01:** Per-V-NN-NN freshness matrix specific V-NN numbering (V-67-01..V-70-NN) — plan-author's tactical choice within per-assertion-class framework
- **D-02:** Pre-commit dry-run protocol — 3-step (stage → self-test → commit) per Phase 66-02 D-01 5-step pattern; plan-author may add tactical guard rails
- **D-03:** `$env:TEMP\v1.7-audit-<rand>` random-suffix mechanism (`[System.IO.Path]::GetRandomFileName()` or `New-Guid`)
- **D-03:** `gh workflow run` invocation timing — recommend Wave-4 start (immediate after Atom 2 lands)
- **D-04:** Plan 70-05 chicken-and-egg resolution Option (b) two-commit pattern preferred over Plan 69-02 Option (a) literal-placeholder; plan-author may revisit
- **D-04:** v1.7-MILESTONE-AUDIT.md "Discoveries Surfaced During Execution" section structure — plan-author shapes content based on actual Phase 67-70 discoveries
- **D-04:** `70-ANCHOR-INVENTORY.md` — only if Wave 1 author identifies any anchor surfaces touched (likely empty for Pillar D since no corpus edits)
- **All:** BASELINE_11 freshness comment exact wording (`// BASELINE_11: v1.7 close 2026-MM-DD (closes BASELINE_10 from v1.6 close 2026-05-25)`) per `regenerate-supervision-pins.mjs` BASELINE_N convention

## Deferred Ideas

(Captured in 70-CONTEXT.md `<deferred>` section verbatim — summarized here:)

- ARCHIVE-01 cdcce23 archive-script root-cause investigation → v1.8+
- CHAIN-WRAPPER-01 chain-apex wrapper stderr-only capture fix → v1.8+
- Retrospective audit of HEAD-coupled assertions across check-phase-{48..66}.mjs → v1.8+ (HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective)
- CI-3 Managed Apple ID corpus rename (45 occurrences / 16 files) → v1.8+ pending Intune portal rebrand adoption
- 3 additional VPP-location-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` lines 115/149/155 → v1.8+ Pillar A-equivalent sweep
- Multi-tenant Apple Business surfaces → v1.8+ unless multi-org-account scenarios surface
- Apple Business Device API documentation → v1.8+ when Apple publishes developer.apple.com landing
- Per-OU Conference Room Display deep-dive → v1.8+ if customer demand surfaces
- Account Holder lockout dedicated recovery runbook → v1.8+ if customer support escalations surface
- Apple School Manager (ASM) education-specific surfaces → v1.8+ if education-tenant scope opens
- BASELINE_12 freshness refresh → v1.8+ next milestone close
- v1.7-MILESTONE-AUDIT.md "Discoveries Surfaced During Execution" section as v1.8+ template feature → optional inheritance

---

*Discussion mode: gsd-discuss-phase --chain*
*Adversarial-review: 4 parallel gsd-advisor-researcher agents (Finder/Adversary/Referee per option)*
*All 4 decisions user-approved without revision via single "Approve all 4" selection (matching Phase 69 precedent)*
