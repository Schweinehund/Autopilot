# Phase 71: Archive-Automation Root-Cause Fix (Pillar A) - Context

**Gathered:** 2026-06-03
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar A entry phase** of v1.8 — fixes the root cause of milestone-archival placeholder-label garbage emission and sweeps historical residue. Independent of Pillars B (Phase 72 chain-wrapper) and C (Phase 73 retrospective forward-port); MUST land before Pillar D (Phase 74 milestone close) so v1.8 archival doesn't re-trigger the defect documented as RECURRENCE-CONFIRMED at v1.7 close (2026-05-29).

**Root cause empirically located (Phase 71 discussion):** Regex `^#[^\n]*\n+\*\*([^*]+)\*\*` at `C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle-policy.ts:54-58` captures the bolded LABEL (`"One-liner:"`) instead of the VALUE that follows it. The caller at `phase-lifecycle.ts:1693` prefers frontmatter `one-liner:` over body-extraction, but ALL 97 archived SUMMARY.md files in this repo use inline `**One-liner:** value` body pattern — the frontmatter-wins branch is effectively dead for this corpus. Fixed regex: `^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)`.

**Deliverables (exactly):**

- **ARCHIVE-01 root-cause fix** — Vendored `extractOneLinerFromBody` (corrected regex) at NEW `scripts/archive/extract-summary-oneliners.mjs` + frontmatter pre-write CLI that scans v1.8 SUMMARY.md files, extracts the inline `**One-liner:** value` content via the corrected regex, and pre-writes `one-liner:` into each SUMMARY.md frontmatter BEFORE Phase 74 invokes `gsd-sdk query milestone.complete`. Per D-01 LOCKED Option B: caller's frontmatter-first preference (`phase-lifecycle.ts:1693`) routes around the still-broken upstream fallback. Upstream PR tracked as `ARCHIVE-UPSTREAM-01` follow-up in `v1.8-DEFERRED-CLEANUP.md` (not gated on for v1.8 close).

- **ARCHIVE-01 regression-test fixture (D-02 Option C)** — Static MILESTONES.md sanity assertions folded into NEW `scripts/validation/check-phase-71.mjs` (validator-as-deliverable; Path-A from `check-phase-67.mjs` structure). Assertions:
  - **V-71-FIX-01** — `scripts/archive/extract-summary-oneliners.mjs` exists; contains corrected regex (anchored `\*\*One-liner:\*\*\s+`)
  - **V-71-FIX-02** — Test fixture co-located (e.g., `scripts/archive/test-extract-oneliner.mjs`) exercises 3 cases: (a) label-not-captured (value extracted from `**One-liner:** X`); (b) frontmatter-pre-write idempotency; (c) placeholder-allowlist scan (the 10 tokens)
  - **V-71-MILESTONES-01** — `.planning/MILESTONES.md` HEAD scan for ALL 10 placeholder-label tokens at **bullet-line-start anchored** (`^- (?:One-liner:|SUBSUMED BY PLAN|Hash:|Pre-edit:|Total file size:|File:|Insertion position:|Single deliverable:|Plan goal:|Found during:)`) — NOT raw substring match (avoids false-positives on legitimate prose like "the one-liner field in frontmatter"). 0 matches required.
  - **V-71-ARCHIVE02-01** — Specific assertions that v1.1 line 164 (`Edit 1 --`) and v1.2 lines 145-148 known-residue sites are cleared post-sweep.
  - **V-71-CHAIN + V-71-AUDIT + V-71-SELF** — standard chain-apex topology per `check-phase-67.mjs:43,66,304` template; CHAIN_PHASES = {48..70}; CHAIN_SKIP = new Set([]) (inherits Phase 68 7b635ca empty-Set invariant).

- **ARCHIVE-02 historical residue sweep (D-03 Option D — REPLACEMENT not deletion)** — Re-author the v1.1 + v1.2 H2 entries in `.planning/MILESTONES.md` from canonical source-of-truth `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` (audit docs DO exist for v1.0..v1.5 — empirically verified by D-03 advisor against directory listing). **Empirical residue inventory (5 lines / 2 H2 sections):**
  - v1.2 lines 145-148: 3× `- One-liner:` + 1× `- Commit:` (known site per v1.7-DEFERRED-CLEANUP.md:38-48)
  - **v1.1 line 164: `- Edit 1 -- docs/error-codes/00-index.md:` — NEW DISCOVERY by D-03 advisor** during pre-sweep grep enumeration; NOT in original known-sites list; NOT tracked in Plan 68-04 Garbage Debris Elimination Confirmation
  - v1.0 / v1.3 / v1.4 / v1.4.1: clean (zero residue)
  Symmetric with v1.6+v1.7 retroactive-authoring at v1.7 close 2026-05-29; honors "DO NOT mask via deletion — investigate the script" doctrine via REPLACEMENT FROM CANONICAL SOURCE (not raw deletion). REQUIREMENTS.md SC#3 "post-sweep validator or diff confirms zero placeholder tokens remain" satisfied by V-71-MILESTONES-01.

- **71-VERIFICATION.md (Plan 71-03 close-gate)** — SC#1-4 satisfaction checklist + atomic Plan-71-01 commit SHA recorded (SC#4 byte-exact compliance) + per-validator exit codes + traceability flip checklist + Phase 72 entry-state readiness signal.

- **Traceability** — PROJECT.md ARCHIVE-01 + ARCHIVE-02 Active→Validated flips with closing commit SHAs; REQUIREMENTS.md Traceability table rows Pending→Complete; STATE.md progress block + Performance Metrics + Pending Todos updates; ROADMAP.md Phase 71 row Complete with closing SHAs.

**Out of scope (Phase 71 owns nothing else):**

- CHAIN-WRAPPER-01 (`check-phase-66.mjs:313` stderr-only chain-apex wrapper) — Phase 72 Pillar B scope
- HARNESS-FORWARD-01 retrospective + SCOPE-GAP-RETRO-01 v1.5/v1.6/v1.7-frozen-aware conversion — Phase 73 Pillar C scope
- v1.8 audit harness lineage bump (HARNESS-07..12 + VPP-01) — Phase 74 Pillar D scope
- Any `docs/*` corpus edits — v1.8 is tooling-only milestone (REQUIREMENTS.md Out of Scope row)
- Upstream PR to `get-shit-done-cc` — tracked as `ARCHIVE-UPSTREAM-01` follow-up in `v1.8-DEFERRED-CLEANUP.md`; not gated on for v1.8 close (anti-blocking-on-external-cadence per D-01 Adversary)
- Any worktree-based execution (`use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`)
- Modification to v1.4/v1.5/v1.6/v1.7 workflow YAML files — predecessor-byte-unchanged invariant
- New C-checks beyond v1.7 inheritance — v1.8 harness lineage bump (HARNESS-07) lands at Phase 74, NOT Phase 71
- Sweep of v1.0/v1.3/v1.4/v1.4.1 MILESTONES.md entries — empirically clean per pre-sweep grep enumeration (D-03 advisor)
- v1.5/v1.6/v1.7 MILESTONES.md entries — v1.5 was Plan 68-04 surgical-deletion scope; v1.6+v1.7 were retroactively-authored 2026-05-29 (already canonical)

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via parallel `/adversarial-review`-style scoring (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner) dispatched as 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode per user memory `feedback_adversarial_review_preference`. Each agent read REQUIREMENTS/ROADMAP/STATE sections + prior CONTEXT.md files + the actual SDK source files at `C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\*.ts`. Scores in parentheses (lower = better, matching v1.6/v1.7 convention). All four recommendations user-approved without revision via single `Approve all 4 — proceed to CONTEXT.md + plan-phase` selection. **One D-03/D-04 tension resolved via synthesis** (D-04 layout + D-03 content; the axes are orthogonal — atomicity vs deletion-vs-reauthor — and combine cleanly).

### D-01: Fix location & vendoring strategy — Option B (Vendor extractor locally + frontmatter pre-write) (score **B=10** / A=9-but-blocks / C=12 / D=14)

**Decision:** Vendor a corrected `extractOneLinerFromBody` at NEW `scripts/archive/extract-summary-oneliners.mjs` with this regex change:

| # | Site | BEFORE (buggy) | AFTER (vendored, corrected) |
|---|---|---|---|
| 1 | regex literal | `/^#[^\n]*\n+\*\*([^*]+)\*\*/m` | `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` |

The vendored CLI accepts `--milestone v1.8` and: (a) enumerates all SUMMARY.md files in `.planning/phases/`; (b) extracts inline `**One-liner:** value` body content via corrected regex; (c) pre-writes `one-liner:` into each SUMMARY.md frontmatter if absent (idempotent — skips if present); (d) reports zero-edit dry-run when all SUMMARY.md files already have frontmatter `one-liner:`. Phase 74 plan MUST invoke this CLI immediately before `/gsd:complete-milestone v1.8` per HARNESS-12's "ARCHIVE-01 recurrence-check PRE-VERIFIED by v1.8 Pillar A" contract (REQUIREMENTS.md:41).

**Rationale (per advisor dossier `.claude/tmp/phase71-D01-advisor.md`):**

- **Adversarial wedge:** Option A's nominal score-9 misleads — Axis 2 (v1.8-close-not-blocked) is a HARD GATE per REQUIREMENTS.md priority, not a soft penalty. Fixing the bug in another repo entirely cannot satisfy Phase 71 SC#4 ("closing commit SHA confirming the fix lands atomically with the regression fixture") because there IS no fix-landing in THIS repo under Option A.
- **Critical repo-state finding:** Grep confirms ZERO of the 97 archived SUMMARY.md files have frontmatter `one-liner:` field. ALL use inline `**One-liner:** value` body pattern. Option C (frontmatter pre-injection alone) without vendoring is future-fragile under hypothetical SDK caller-order reversal — Option B includes the pre-write AND vendors the fix, providing two-axis defense.
- **Option D (post-process MILESTONES.md output) structurally repeats** the Plan 68-04 anti-pattern that `v1.7-DEFERRED-CLEANUP.md:20-22` explicitly identifies as the WRONG approach ("DO NOT mask via deletion").
- **"Investigate the script" doctrine honored:** Option B reproduces and fixes the SDK function's defective regex inside THIS repo (vendoring is not bypassing — it's localizing the fix while upstream-PR catches up via `ARCHIVE-UPSTREAM-01` deferral).

**Coordination flag for Phase 74:** HARNESS-12 plan-phase MUST add a Wave-1 pre-step: `node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter`. Without that pre-write, the still-broken upstream fallback at `phase-lifecycle.ts:57` fires and re-emits placeholder-label garbage into v1.8 H2 entry.

### D-02: Regression-fixture mechanism — Option C (Static MILESTONES.md validator folded into check-phase-71.mjs) (score **C=9** / B=9-tiebreak-lost / D=13 / A=14)

**Decision:** Fold the regression-fixture assertions DIRECTLY into NEW `scripts/validation/check-phase-71.mjs` (NOT a new `tests/` tree, NOT a separate `check-milestones-extraction.mjs`). The validator-as-deliverable pattern from v1.3+ inherits cleanly; no new test-infra paradigm introduced (deliberate scope-discipline for a tooling-debt milestone).

**Concrete assertion design:**

```javascript
// scripts/validation/check-phase-71.mjs
const PLACEHOLDER_TOKENS = [
  'One-liner:',
  'SUBSUMED BY PLAN',
  'Hash:',
  'Pre-edit:',
  'Total file size:',
  'File:',
  'Insertion position:',
  'Single deliverable:',
  'Plan goal:',
  'Found during:',
];
// V-71-MILESTONES-01: anchored bullet-line-start match (NOT raw substring)
const re = new RegExp(`^- (?:${PLACEHOLDER_TOKENS.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gm');
const matches = milestonesContent.match(re) || [];
assert(matches.length === 0, `V-71-MILESTONES-01 FAIL: ${matches.length} placeholder bullets remain`);
```

Phase 74's HARNESS-10 deliverable (`audit-harness-v1.8-integrity.yml`) gets a `check-phase-71` job mirroring `audit-harness-v1.7-integrity.yml:94-106`. Phase 71 itself does NOT modify the v1.7 workflow (frozen per predecessor-byte-unchanged invariant).

**Rationale (per advisor dossier `.claude/tmp/phase71-D02-advisor.md`):**

- **Adversarial wedge that decided B-vs-C tiebreak:** ROADMAP.md:325 says "diff-checks the MILESTONES.md output for placeholder-label patterns." Option B (unit test of extractor function) does NOT touch MILESTONES.md; Option C does. Option C wins the SC#2 literal-compliance tiebreak.
- **v1.7 chain-determinism investment preserved:** Options A and D introduce `npm install -g get-shit-done-cc` to CI — a network-dependent step that re-introduces the exact class of flakiness Phases 67-70 invested in eliminating (FETCH-DEPTH-01, SCOPE-GAP-61, CHAIN-WRAPPER-01, CRLF normalization, empty CHAIN_SKIP). Option C uses only the deterministic, in-repo primitives the chain already uses.
- **D-01-mechanism-agnostic:** Option C validates the END STATE that matters regardless of whether D-01 picks SDK patch / vendor / pre-processor. Only V-71-FIX-01/02 specifics vary per D-01 branch (Option B locked in vendoring → V-71-FIX-01 asserts `scripts/archive/extract-summary-oneliners.mjs` exists with corrected regex).
- **Tripwire role:** The defect is already CONFIRMED in production per `v1.7-DEFERRED-CLEANUP.md:28-34`. The fixture's operational job is to detect FUTURE recurrence on every PR — exactly what a chain-validator-on-HEAD-state does.

### D-03: ARCHIVE-02 sweep scope — Option D (Re-author from MILESTONE-AUDIT source) (score **D=8** / B=12 / C=14 / A=17-fatal-wedge)

**Decision:** Re-author the v1.1 + v1.2 H2 entries in `.planning/MILESTONES.md` from canonical source-of-truth audit docs (`v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md`). Symmetric with v1.6+v1.7 retroactive-authoring precedent from v1.7 close 2026-05-29. **Critical empirical discovery during pre-sweep grep enumeration: 5th residue line at MILESTONES.md:164 (v1.1 `- Edit 1 --` token-class) NOT in original known-sites list and NOT tracked in Plan 68-04 Garbage Debris Elimination Confirmation.** This eliminates Options A and C (which would miss it).

**Pre-sweep empirical residue inventory (per D-03 advisor enumeration):**

| Milestone H2 | Line(s) | Residue | Token class |
|---|---|---|---|
| v1.2 | 145 | `- One-liner:` | placeholder-label |
| v1.2 | 146 | `- One-liner:` | placeholder-label |
| v1.2 | 147 | `- Commit:` | placeholder-label |
| v1.2 | 148 | `- One-liner:` | placeholder-label |
| **v1.1** | **164** | **`- Edit 1 -- docs/error-codes/00-index.md:`** | **NEW DISCOVERY (different token-class)** |
| v1.0, v1.3, v1.4, v1.4.1 | — | (clean) | — |

**Re-authoring source-of-truth (advisor-verified file existence):**

- `.planning/milestones/v1.1-MILESTONE-AUDIT.md` (165 lines) → drives v1.1 H2 re-authoring
- `.planning/milestones/v1.2-MILESTONE-AUDIT.md` (345 lines) → drives v1.2 H2 re-authoring
- v1.0/v1.3/v1.4/v1.4.1 audit docs also exist but no re-authoring needed (entries clean)

**Rationale (per advisor dossier `.claude/tmp/phase71-D03-advisor.md`):**

- **Adversarial Wedge (fatal for A + C):** The newly-discovered v1.1 line 164 token-class is NOT in `v1.7-DEFERRED-CLEANUP.md:38-48` known-sites list. Option A (v1.2-only deletion) misses it. Option C (validate-then-sweep via D-02 fixture) depends on D-02 fixture's token-coverage design — and `Edit N --` isn't in the 10-token list.
- **"DO NOT mask via deletion" doctrine honored via REPLACEMENT:** Per `v1.7-DEFERRED-CLEANUP.md:30,32` retroactive-authoring precedent — "authoring correct content from `v1.6-MILESTONE-AUDIT.md` source-of-truth is REPLACEMENT, not DELETION." D-03 Option D applies the same standard to v1.1 + v1.2.
- **Symmetry with v1.7 close (2026-05-29):** v1.6 was entirely authored from `v1.6-MILESTONE-AUDIT.md`; v1.7 was authored from `v1.7-MILESTONE-AUDIT.md` Executive Summary + 4-Pillar Closure Narrative + Methodology Highlights. v1.1 + v1.2 get the same treatment from their respective audit docs.
- **Phase 68 Plan 68-04 inheritance:** Plan 68-04 deleted v1.5 garbage as a symptom-fix; Phase 71 takes the precedented next step — REPLACEMENT FROM CANONICAL SOURCE — which the v1.7 close operationalized.

### D-04: Atomic-commit composition + plan layout — Option B (Three-plan split: fix+fixture / sweep / close-gate) (score **B=7** / D=9 / A=14 / C=20)

**Decision:** Three-plan layout with one atomic-within-plan commit and one independent commit, plus close-gate:

```
Plan 71-01 (ATOMIC commit — root-cause fix + regression fixture)
  Wave 1: Author scripts/archive/extract-summary-oneliners.mjs (D-01 vendored CLI)
  Wave 2: Author scripts/archive/test-extract-oneliner.mjs (D-02 unit-test companion)
  Wave 3: Author scripts/validation/check-phase-71.mjs (D-02 static MILESTONES.md scan + V-71-FIX-01/02)
  Wave 4: Pre-commit dry-run:
    - node scripts/archive/extract-summary-oneliners.mjs --self-test
    - node scripts/archive/test-extract-oneliner.mjs
    - node scripts/validation/check-phase-71.mjs (expect FAIL on V-71-MILESTONES-01 until Plan 71-02 lands — discovery deferred to plan-phase via per-plan red-state acceptance)
  ATOMIC commit (3 files in ONE SHA per Phase 67 Plan 67-02 atomic-within-plan precedent `55260b3`):
    fix(archive): ARCHIVE-01 root-cause fix for gsd-complete-milestone extraction + regression fixture (atomic SC#4)

Plan 71-02 (separate commit — ARCHIVE-02 v1.1 + v1.2 re-authoring)
  Wave 1: Read v1.1-MILESTONE-AUDIT.md + v1.2-MILESTONE-AUDIT.md (source-of-truth)
  Wave 2: Author replacement bullets for v1.1 H2 (line 164 area) — drop `- Edit 1 --` debris, add canonical bullets from audit doc
  Wave 3: Author replacement bullets for v1.2 H2 (lines 145-148) — drop 4 placeholder lines, add canonical bullets from audit doc
  Wave 4: Pre-commit dry-run:
    - node scripts/validation/check-phase-71.mjs (expect V-71-MILESTONES-01 + V-71-ARCHIVE02-01 PASS)
    - Predecessor-byte-unchanged check (git diff Plan-71-01-SHA HEAD -- v1.4/v1.5/v1.6/v1.7 surfaces returns EMPTY)
  Commit:
    docs(archive): ARCHIVE-02 re-author v1.1+v1.2 MILESTONES.md entries from MILESTONE-AUDIT source (replacement-not-deletion per ARCHIVE-01 doctrine)

Plan 71-03 (close-gate — VERIFICATION.md + traceability flips)
  Wave 1: Full chain re-run check-phase-{48..71}.mjs → ALL PASS, 0 SKIPPED, 0 FAIL
  Wave 2: v1.7-milestone-audit.mjs → expect 15/15 PASS unchanged (predecessor-byte-unchanged invariant)
  Wave 3: Author 71-VERIFICATION.md:
    - SC#1 satisfaction (root-cause fix lands in scripts/archive/extract-summary-oneliners.mjs corrected regex)
    - SC#2 satisfaction (regression fixture in check-phase-71.mjs V-71-MILESTONES-01)
    - SC#3 satisfaction (v1.0..v1.4.1 entries clean — V-71-MILESTONES-01 + V-71-ARCHIVE02-01 PASS)
    - SC#4 closing commit SHA = Plan 71-01 atomic SHA (recorded byte-exact)
    - Atomic-Commit SHA Record
    - Discoveries (v1.1 line 164 token-class; upstream-PR routed to v1.8-DEFERRED-CLEANUP.md as ARCHIVE-UPSTREAM-01)
    - Phase 72 entry-state readiness signal
  Wave 4: Traceability — PROJECT.md ARCHIVE-01+02 Active→Validated; REQUIREMENTS.md Traceability Pending→Complete; STATE.md frontmatter progress + Performance Metrics + Pending Todos; ROADMAP.md Phase 71 row Complete
  Commit:
    docs(71-03): Phase 71 close-gate — chain validators green + 71-VERIFICATION.md + traceability flips
```

**Total commits:** 3. Atomic ONLY for Plan 71-01 (per ROADMAP SC#4 "fix lands atomically with the regression fixture"). Plan 71-02 separately revertable (Phase 68 Plan 68-04 MILESTONES.md-separation precedent for same defect class). Per-plan boundaries elsewhere preserve clean bisect surface.

**Rationale (per advisor dossier `.claude/tmp/phase71-D04-advisor.md`):**

- **SC#4 byte-exact compliance:** "A closing commit SHA is recorded in the plan VERIFICATION.md artifact confirming the fix lands atomically with the regression fixture" → Plan 71-01's atomic SHA satisfies this verbatim.
- **REQUIREMENTS.md:17 conditional satisfied:** ARCHIVE-02 "coordinated with ARCHIVE-01 atomic-commit IF committed together" — the conditional permits separation. Plan 71-02 is the IF-not-together branch.
- **Phase 68 Plan 68-04 in-repo precedent for SAME defect class:** Plan 68-04 separated MILESTONES.md surgical-deletion (`d142c7a`) from chain-validator/script edits. Option B inherits this directly. Option A bundles these into one SHA, defeating the precedent.
- **STATE.md:136 plan-estimate compliance:** "Phase 71 | A | ARCHIVE-01, ARCHIVE-02 | 2-3 plans" → 3 lands at the informative upper bound.
- **Rollback semantics:** `git revert <Plan 71-02 SHA>` cleanly restores v1.1+v1.2 entries to pre-sweep state WITHOUT touching the script fix. `git revert <Plan 71-01 SHA>` restores buggy state for both extractor AND fixture (they're co-validating — coupled by design).

**Tension synthesis with D-03:** D-03 advisor recommended bundling re-authoring INTO Plan 71-01's atomic commit. D-04 advisor explicitly scored that as Option A=14. **Resolved via orthogonality observation:** atomicity (D-04) and deletion-vs-reauthor (D-03) are orthogonal axes. Plan 71-02 uses D-03's re-authoring CONTENT inside D-04's separated PLAN LAYOUT — best of both.

### Claude's Discretion

- Exact regex anchor variants in `extract-summary-oneliners.mjs` if the corrected regex misses edge cases (e.g., SUMMARY.md files with markdown-link in label `**[One-liner:](anchor)**`) — planner verifies with grep-pass across all 97 SUMMARY.md files at Plan 71-01 Wave 1
- Whether Plan 71-01 Wave-3 `check-phase-71.mjs` red-state on V-71-MILESTONES-01 is committed-as-known-FAIL (chicken-and-egg per Phase 70 Plan 70-05 Commit A precedent) OR Plan 71-01 is staged-but-uncommitted until Plan 71-02 is ready (atomicity tradeoff; planner decides at plan-phase)
- Exact line ranges for v1.1 H2 + v1.2 H2 in the re-authored MILESTONES.md — depends on canonical bullet count from each audit doc; planner reads source-of-truth at Plan 71-02 Wave 1
- Whether `scripts/archive/extract-summary-oneliners.mjs --self-test` is run as a separate pre-commit assertion OR folded into `check-phase-71.mjs` V-71-FIX-02 (low-risk either way)
- Whether `ARCHIVE-UPSTREAM-01` follow-up appears in `v1.8-DEFERRED-CLEANUP.md` (Plan 71-03 author drafts the entry stub; Phase 74 HARNESS-12 finalizes the artifact)
- Whether to also enumerate v1.0/v1.3/v1.4/v1.4.1 H2 ranges in V-71-MILESTONES-01 as defense-in-depth (no current residue, but anchors the contract) — Plan 71-01 Wave 3 decision

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 71 contract docs
- `.planning/REQUIREMENTS.md` §Pillar A (lines 11-17) — ARCHIVE-01 + ARCHIVE-02 contracts + 10-placeholder-token list + RECURRENCE CONFIRMED 2026-05-29 wording
- `.planning/ROADMAP.md` lines 318-329 — Phase 71 Goal + Success Criteria #1-4 (SC#4 atomicity contract)
- `.planning/STATE.md` lines 77-141 — v1.8 phase dependency summary + Wave designation map + requirement coverage table (Phase 71 plan estimate 2-3)
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` lines 14-50 — ARCHIVE-01 RECURRENCE CONFIRMED 2026-05-29 + ARCHIVE-02 known-sites + "DO NOT mask via deletion — investigate the script" doctrine + retroactive-authoring precedent

### Source-of-truth root cause (READ BEFORE EDITING)
- `C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle-policy.ts` lines 54-58 — the buggy regex `extractOneLinerFromBody` (label-not-value capture)
- `C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle.ts` lines 1670-1745 — caller code; especially line 1693 `(fm['one-liner'] as string | undefined) || extractOneLinerFromBody(content)` (frontmatter-wins) and lines 1733-1748 (MILESTONES.md entry assembly)

### Re-authoring source-of-truth (for Plan 71-02)
- `.planning/milestones/v1.1-MILESTONE-AUDIT.md` (165 lines) — canonical content for v1.1 H2 re-authoring
- `.planning/milestones/v1.2-MILESTONE-AUDIT.md` (345 lines) — canonical content for v1.2 H2 re-authoring
- `.planning/MILESTONES.md` — sweep target; pre-sweep state: 5 debris lines at v1.2:145-148 + v1.1:164

### Exemplar pattern files
- `.planning/milestones/v1.7-phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-01-SUMMARY.md` line 48 — exemplar inline `**One-liner:** value` body pattern (ALL 97 SUMMARY.md files use this — none have frontmatter `one-liner:`)
- `scripts/validation/check-phase-67.mjs` lines 1-100 — validator-as-deliverable template (Path-A source for `check-phase-71.mjs`)
- `scripts/validation/check-phase-66.mjs` lines 43, 66, 304 — chain-apex topology (CHAIN_PHASES + V-NN-SELF guard + readFile() idiom)

### Phase 71 plan-layout precedents
- `.planning/milestones/v1.7-phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-CONTEXT.md` D-04 score E=7 — per-plan-per-requirement commit topology (Phase 71 inherits)
- `.planning/milestones/v1.7-phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md` — close-gate format Plan 71-03 inherits

### Atomic-commit precedents
- v1.6 Phase 66-02 commit `3a9a671` — 3-file atomic harness commit
- v1.7 Phase 67 Plan 67-02 commit `55260b3` — 5-file atomic-within-plan commit (Phase 71 Plan 71-01 most-direct precedent — 3 files atomic)
- v1.7 Phase 68 Plan 68-03 commit `7b635ca` — 5-file CHAIN_SKIP atomic removal
- v1.7 Phase 68 Plan 68-04 commit `d142c7a` — MILESTONES.md surgical-deletion as SEPARATE plan from validator surgery (Phase 71 Plan 71-02 most-direct precedent)
- v1.7 Phase 70 Plan 70-02 Atom 1 `26a1ae9` + Plan 70-03 Atom 2 `aa6de68` — two-atomic split (validator-CI-surface)

### Anti-regression precedents (read for context)
- `.planning/milestones/v1.7-phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-CONTEXT.md` D-04 — "corpus" definition = `docs/*`; `.planning/MILESTONES.md` is planning doc, NOT corpus; SC#5 does NOT block MILESTONES.md edits

### Advisor dossiers (for planner deep-dive)
- `.claude/tmp/phase71-D01-advisor.md` (212 lines) — D-01 full dossier (Option B vendor + frontmatter pre-write; Option A score-9-misleading wedge; ZERO frontmatter `one-liner:` empirical finding)
- `.claude/tmp/phase71-D02-advisor.md` (340 lines) — D-02 full dossier (Option C static scan; SC#2 literal-compliance B-vs-C tiebreak; CI-determinism preservation wedge)
- `.claude/tmp/phase71-D03-advisor.md` (305 lines) — D-03 full dossier (Option D re-author from audit docs; v1.1 line 164 NEW DISCOVERY adversarial wedge; v1.6/v1.7 retroactive-authoring symmetry)
- `.claude/tmp/phase71-D04-advisor.md` (432 lines) — D-04 full dossier (Option B 3-plan split; SC#4 byte-exact compliance; Phase 68 Plan 68-04 MILESTONES.md-separation inheritance)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **Validator-as-deliverable template** — `scripts/validation/check-phase-67.mjs` (Path-A source for `check-phase-71.mjs`). Lines 1-100 establish: imports, CHAIN_PHASES Set, CHAIN_SKIP Set (empty per Phase 68 `7b635ca`), `readFile()` helper with CRLF normalization (Phase 31 `ca40eb9` lineage), V-NN-SELF guard, V-NN-CHAIN-NN execFileSync chain wrapper.
- **`readFile()` CRLF-normalization idiom** — `check-phase-48.mjs:25` + `check-phase-60.mjs:24` + `regenerate-supervision-pins.mjs:77`. `check-phase-71.mjs` inherits verbatim.
- **Atomic-within-plan pattern** — Phase 67 Plan 67-02 `55260b3` (5 files in ONE SHA: 2 corpus + 1 glossary + 1 sidecar + 1 NEW anchor inventory). Plan 71-01 inherits scope-down (3 files: 1 vendored script + 1 test fixture + 1 validator).
- **MILESTONES.md surgical-edit pattern** — Phase 68 Plan 68-04 `d142c7a` (DELETE lines 3-71). Plan 71-02 inherits structure but REPLACES (not deletes) per D-03 Option D.
- **Re-authoring from MILESTONE-AUDIT source-of-truth** — v1.7 close 2026-05-29 manually authored v1.6+v1.7 H2 entries from respective audit docs. Plan 71-02 inherits for v1.1+v1.2.
- **Per-plan close-gate pattern** — Plan 67-03 / Plan 68-05 / Plan 69-02 / Plan 70-05 Commit B all follow same close-gate shape (chain re-run + VERIFICATION.md + traceability flips across PROJECT/REQUIREMENTS/STATE/ROADMAP).

### Established Patterns

- **CHAIN_SKIP empty-Set invariant** — Permanent post-Phase 68 `7b635ca`. `check-phase-71.mjs` MUST declare `CHAIN_SKIP = new Set([])` (V-71-SELF assertion enforces).
- **CHAIN_PHASES exclusion of validator's own phase** — `check-phase-71.mjs` CHAIN_PHASES = {48..70} (does NOT include 71).
- **Token-class anchored regex (NOT raw substring)** — V-71-MILESTONES-01 uses `^- (?:tok1|tok2|...)` bullet-line-start anchor to avoid false-positives on legitimate prose like "the one-liner field." Adversarial wedge from D-02 advisor.
- **REPLACEMENT FROM CANONICAL SOURCE > DELETION** — Project doctrine since v1.7 close 2026-05-29. "DO NOT mask via deletion" is satisfied by replacement-from-MILESTONE-AUDIT.md.
- **Predecessor-byte-unchanged anti-regression invariant** — v1.4/v1.5/v1.6/v1.7 workflow YAMLs + harness MJS files + sidecar JSONs MUST be byte-identical pre/post-Plan-71-NN. `git diff Plan-71-01-SHA HEAD -- <predecessor surfaces>` returns EMPTY.

### Integration Points

- **`scripts/archive/extract-summary-oneliners.mjs`** — NEW directory `scripts/archive/`. First inhabitant of an archive-tooling subtree (parallel to `scripts/validation/_lib/` introduced in Phase 68). Phase 74 plan-phase MUST add the pre-write invocation as a Wave-1 step before `/gsd:complete-milestone v1.8`.
- **`scripts/validation/check-phase-71.mjs`** — NEW validator. Becomes the 19th in the chain (post-Phase-71). Inherited by Phase 74 HARNESS-09 Path-A copy for `check-phase-72/73/74.mjs`.
- **`.planning/MILESTONES.md`** — REPLACEMENT edit (not deletion) at v1.1 H2 (line 164 area) + v1.2 H2 (lines 145-148 area). Plan 71-02 commits the replacement; V-71-MILESTONES-01 PASS post-commit.
- **`.github/workflows/audit-harness-v1.7-integrity.yml`** — UNCHANGED in Phase 71 (predecessor-byte-unchanged invariant). Phase 74 HARNESS-10 ships NEW `audit-harness-v1.8-integrity.yml` that includes `check-phase-71` job.
- **`v1.8-DEFERRED-CLEANUP.md`** — Plan 71-03 author drafts `ARCHIVE-UPSTREAM-01` stub (upstream PR to `get-shit-done-cc`); Phase 74 HARNESS-12 finalizes the artifact.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (per user memory `feedback_adversarial_review_preference`). Phase 71 honored verbatim — 4 parallel `gsd-advisor-researcher` agents dispatched in adversarial-review mode (Finder/Adversary/Referee scoring); all 4 picks user-approved via single "Approve all 4" selection. The D-03 advisor's pre-sweep grep enumeration surfaced v1.1 line 164 as NEW DISCOVERY (not in known-sites list) — directly attributable to the adversarial-review pattern's empirical-grounding requirement.
- **User maximum-effort preference** (per user memory `feedback_effort_level`) — every gray-area dossier produced concrete operational steps + acceptance criteria + anti-regression risk analysis + adversarial-wedge identification. Phase 71 dossiers averaged ~300 lines each.
- **Sequential-on-main-tree execution durable** (per user memory `project_execphase_sequential.md` + `.planning/config.json:7` `use_worktrees:false`). Plans 71-01..03 execute sequentially on the main tree. NO worktree experiments.
- **Phase 71 = Pillar A "Archive-Automation Root-Cause Fix"** (per ROADMAP:318 + REQUIREMENTS:11). All decisions tilt toward minimum-blast-radius + maximum-revertibility WITHIN the SC#4 atomic-with-fixture constraint. Wave A "independent, ship early" position lets it land before Pillars B/C/D.
- **Today's date is 2026-06-03.** Phase 71 discussion authoring date. Frontmatter `last_verified:` bumps NOT needed (no `docs/*` corpus edits in v1.8; Plan 71-02 re-authoring of MILESTONES.md is planning-doc edit, not corpus).
- **"DO NOT mask via deletion — investigate the script" doctrine** is the load-bearing constraint. D-01 honors via VENDOR-THE-FIX. D-03 honors via REPLACEMENT-FROM-CANONICAL-SOURCE. Both are validated by D-02's V-71-MILESTONES-01 tripwire-on-HEAD-state assertion.
- **Upstream-PR path NOT abandoned, just deferred** — `ARCHIVE-UPSTREAM-01` tracked in `v1.8-DEFERRED-CLEANUP.md` (drafted by Plan 71-03; finalized by Phase 74 HARNESS-12). When upstream releases corrected version, Phase 75+ can deprecate the vendored script.

</specifics>

<deferred>
## Deferred Ideas

### Already locked elsewhere (not new deferrals — recorded for downstream awareness)

- **CHAIN-WRAPPER-01** (`check-phase-66.mjs:313` stderr-only chain-apex wrapper) — Phase 72 Pillar B (WRAPPER-01)
- **HARNESS-FORWARD-01 + SCOPE-GAP-RETRO-01** (retrospective scan + v1.5/v1.6/v1.7-frozen-aware conversion of check-phase-{48..66}.mjs) — Phase 73 Pillar C (RETRO-01 + RETRO-02)
- **v1.8 audit harness lineage bump** (HARNESS-07/08/09/10/11/12 + VPP-01) — Phase 74 Pillar D
- **CI-3 Managed Apple ID corpus rename** (45 occurrences / 16 files) — DEFERRED to v1.9+ per Microsoft Intune portal rebrand-adoption trigger gate
- **Multi-tenant Apple Business / ABDevice API / per-OU CRD / Account Holder runbook / ASM** — all carried forward in `v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes)

### Discovered during Phase 71 discussion (new for v1.8-DEFERRED-CLEANUP.md or v1.9+)

- **ARCHIVE-UPSTREAM-01** — Submit corrected `extractOneLinerFromBody` regex as upstream PR to `get-shit-done-cc` repo at `phase-lifecycle-policy.ts:54-58`. Phase 71 Plan 71-03 drafts the stub in `v1.8-DEFERRED-CLEANUP.md`; Phase 74 HARNESS-12 finalizes. When upstream releases corrected version + Autopilot project pins to it, the vendored `scripts/archive/extract-summary-oneliners.mjs` can be deprecated in v1.9+. NOT gated on for v1.8 close.
- **v1.1 line 164 `Edit N --` token-class** — Different placeholder-label class from the 10-token list in `v1.7-DEFERRED-CLEANUP.md:38-48`. V-71-MILESTONES-01 anchored-regex covers it via the 10-token list expansion if needed; D-02 Option C deliberately keeps the token list to the originally-documented 10 + adds `Edit N --` as ARCHIVE-02-discovered. Future archive-defect classes may surface additional tokens — Plan 71-01 author should add `Edit N --` to PLACEHOLDER_TOKENS list.
- **Possible additional `extract*` functions in `phase-lifecycle-policy.ts`** — D-01 advisor scope was the single `extractOneLinerFromBody` function. There may be other extractors in the same module that emit garbage under similar conditions (e.g., task-count extraction, plan-summary extraction). NOT in v1.8 scope — flag for v1.9+ if symptoms surface.
- **Vendoring as v1.7+ architectural pattern** — `scripts/archive/` (this phase) joins `scripts/validation/_lib/` (Phase 68) as a localizing-pattern repo subtree. v1.9+ may formalize a vendor-style-guide. v1.8 introduces `scripts/archive/`; no special handling required.

### Discussed but explicitly out of v1.8 scope

- **Worktree-based execution** — `use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`
- **Modifications to v1.4/v1.5/v1.6/v1.7 workflow YAMLs / harness MJS / sidecar JSONs** — predecessor-byte-unchanged invariant
- **Sweep of v1.0/v1.3/v1.4/v1.4.1 MILESTONES.md entries** — empirically clean per D-03 advisor pre-sweep grep enumeration
- **`docs/*` corpus edits** — v1.8 is tooling-only milestone

</deferred>

---

*Phase: 71-archive-automation-root-cause-fix-pillar-a*
*Context gathered: 2026-06-03*
