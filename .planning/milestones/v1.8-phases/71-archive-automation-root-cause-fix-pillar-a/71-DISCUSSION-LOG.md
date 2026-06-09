# Phase 71: Archive-Automation Root-Cause Fix (Pillar A) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-03
**Phase:** 71-archive-automation-root-cause-fix-pillar-a
**Areas discussed:** D-01 (fix location), D-02 (regression fixture), D-03 (sweep scope), D-04 (atomic-commit composition)
**Mode:** /gsd-discuss-phase 71 --chain
**Method:** 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder/Adversary/Referee scoring; lower = better) per user memory `feedback_adversarial_review_preference`. All 4 picks user-approved via single "Approve all 4" selection.

---

## D-01: Fix Location & Vendoring Strategy

| Option | Description | Score | Selected |
|--------|-------------|------:|----------|
| A | PR upstream + pin to fixed version (wait for `get-shit-done-cc` release) | 9 (misleading — Axis 2 hard-gate violated) | |
| **B** | **Vendor extractor locally + frontmatter pre-write (corrected regex in `scripts/archive/extract-summary-oneliners.mjs`; pre-write `one-liner:` into SUMMARY.md frontmatter before milestone.complete invocation)** | **10** | **✓** |
| C | Frontmatter pre-injection alone (no vendored function) | 12 | |
| D | Post-process MILESTONES.md output (treats symptom, not cause) | 14 | |

**User's choice:** Option B (advisor recommendation, user-approved).

**Adversarial wedge:** Option A's nominal score-9 misleads because v1.8-close-not-blocked is a HARD GATE per REQUIREMENTS.md priority. Fixing the bug in another repo cannot satisfy Phase 71 SC#4 ("closing commit SHA confirming the fix lands atomically with the regression fixture") because there IS no fix-landing in THIS repo under Option A. Option D structurally repeats Plan 68-04's anti-pattern that `v1.7-DEFERRED-CLEANUP.md:20-22` explicitly identifies as the WRONG approach.

**Critical repo-state finding (D-01 advisor):** Grep confirms ZERO of the 97 archived SUMMARY.md files have frontmatter `one-liner:` field. ALL use inline `**One-liner:** value` body pattern. The frontmatter-wins caller branch at `phase-lifecycle.ts:1693` is effectively dead code for this repo's existing tree. Option C alone (frontmatter pre-injection without vendoring) is future-fragile under hypothetical SDK caller-order reversal — Option B provides two-axis defense.

**Notes:** Upstream PR path NOT abandoned — tracked as `ARCHIVE-UPSTREAM-01` follow-up in `v1.8-DEFERRED-CLEANUP.md` (Plan 71-03 drafts stub; Phase 74 HARNESS-12 finalizes).

---

## D-02: Regression-Fixture Mechanism

| Option | Description | Score | Selected |
|--------|-------------|------:|----------|
| A | Node test invoking real SDK (`tests/archive/test-milestone-extraction.test.mjs`) | 14 | |
| B | Unit test of extractor function (no MILESTONES.md scan) | 9 (tiebreak lost) | |
| **C** | **Static MILESTONES.md sanity validator folded into `check-phase-71.mjs` (V-71-MILESTONES-01 anchored-bullet-line-start regex matching 10 placeholder tokens)** | **9** | **✓** |
| D | Combination C + A (two-axis coverage with SDK install in CI) | 13 | |

**User's choice:** Option C (advisor recommendation, user-approved).

**Adversarial wedge (B-vs-C tiebreak):** ROADMAP.md:325 SC#2 says "diff-checks the MILESTONES.md output for placeholder-label patterns." Option B does NOT touch MILESTONES.md; Option C does. Option C wins the SC#2 literal-compliance tiebreak. Beyond the tiebreak: Options A and D introduce `npm install -g get-shit-done-cc` to CI — a network-dependent step that re-introduces the exact class of flakiness Phases 67-70 invested in eliminating (FETCH-DEPTH-01, SCOPE-GAP-61, CHAIN-WRAPPER-01, CRLF normalization, empty CHAIN_SKIP). Option C uses only deterministic, in-repo primitives.

**Notes:** Anchored bullet-line-start regex `^- (?:tok1|tok2|...)` deliberately chosen over raw substring match to avoid false-positives on legitimate prose like "the one-liner field." V-71-MILESTONES-01 is D-01-mechanism-agnostic — validates END STATE that matters regardless of D-01 fix mechanism.

---

## D-03: ARCHIVE-02 Sweep Scope

| Option | Description | Score | Selected |
|--------|-------------|------:|----------|
| A | Surgical deletion of known v1.2 site only (3× `One-liner:` + 1× `Commit:`) | 17 (fatal — misses v1.1 line 164) | |
| B | Comprehensive grep-sweep of v1.0..v1.4.1 (deletion-only) | 12 | |
| C | Validate-then-sweep via D-02 fixture token-coverage | 14 (token-coverage gap) | |
| **D** | **Re-author v1.1 + v1.2 entries from `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` source-of-truth (REPLACEMENT not deletion; symmetric with v1.6+v1.7 retroactive authoring at v1.7 close)** | **8** | **✓** |

**User's choice:** Option D (advisor recommendation, user-approved).

**Adversarial wedge (fatal for A + C):** D-03 advisor's pre-sweep grep enumeration discovered a 5th residue line at **MILESTONES.md:164 (v1.1 H2): `- Edit 1 -- docs/error-codes/00-index.md:`** — a different token-class (`Edit N --`) NOT in the original known-sites list documented at `v1.7-DEFERRED-CLEANUP.md:38-48` and NOT tracked in Plan 68-04's Garbage Debris Elimination Confirmation. Option A (v1.2-only) misses it. Option C depends on D-02 fixture's token-coverage design, which initially only covered 10 documented tokens.

**Empirical residue inventory (5 lines / 2 H2 sections):**
- v1.2 lines 145-148: 3× `- One-liner:` + 1× `- Commit:` (known site)
- v1.1 line 164: `- Edit 1 -- docs/error-codes/00-index.md:` (**NEW DISCOVERY**)
- v1.0 / v1.3 / v1.4 / v1.4.1: clean

**Audit-doc source-of-truth confirmation:** D-03 advisor verified `.planning/milestones/v1.0..v1.5-MILESTONE-AUDIT.md` files all exist (contradicting initial prompt claim that only v1.5+ had audit docs). Specifically: v1.0=146 lines, v1.1=165 lines, v1.2=345 lines, v1.3=264 lines, v1.4=470 lines. v1.4.1 has no explicit audit doc but H2 entry is debris-free.

**Notes:** "DO NOT mask via deletion" doctrine honored via REPLACEMENT FROM CANONICAL SOURCE (per `v1.7-DEFERRED-CLEANUP.md:30,32` retroactive-authoring precedent). Symmetric with v1.6+v1.7 retroactive authoring at v1.7 close (2026-05-29).

---

## D-04: Atomic-Commit Composition + Plan Layout

| Option | Description | Score | Selected |
|--------|-------------|------:|----------|
| A | Single atomic mega-commit (fix + fixture + sweep ALL in ONE SHA) + close-gate | 14 | |
| **B** | **Three-plan split: 71-01 ATOMIC (fix + fixture) / 71-02 (sweep separate) / 71-03 (close-gate)** | **7** | **✓** |
| C | Four-plan split: fix / fixture / sweep / close-gate (max revertibility but violates SC#4) | 20 (fatal SC#4 violation) | |
| D | Two-atomic rebrand of B (Phase 70 D-02 nomenclature; structurally same as B) | 9 | |

**User's choice:** Option B (advisor recommendation, user-approved).

**Adversarial wedge:** Option C violates ROADMAP.md SC#4 literal wording ("fix lands atomically with the regression fixture") by splitting fix and fixture into separate SHAs — hard-failure mode. Option A bundles two distinct epistemic classes (root-cause script fix + planning-doc surgical sweep) into one SHA, defeating the Phase 68 Plan 68-04 in-repo precedent for separating MILESTONES.md surgical-deletion (`d142c7a`) from validator/script edits in the SAME defect class.

**Tension resolved with D-03:** D-03 advisor recommended bundling re-authoring INTO Plan 71-01's atomic commit. D-04 explicitly scored that as Option A=14. **Resolution via orthogonality observation:** atomicity (D-04) and deletion-vs-reauthor (D-03) are orthogonal axes. Plan 71-02 uses D-03 Option D's re-authoring CONTENT inside D-04 Option B's separated PLAN LAYOUT — best of both. User approved the synthesis via single "Approve all 4" selection.

**Plan layout (3 plans, 3 commits):**

| Plan | Purpose | Atomicity | Commit message |
|------|---------|-----------|----------------|
| 71-01 | D-01 vendor + D-02 fixture + check-phase-71.mjs | ATOMIC (3 files in ONE SHA per Phase 67 Plan 67-02 `55260b3` precedent) | `fix(archive): ARCHIVE-01 root-cause fix for gsd-complete-milestone extraction + regression fixture (atomic SC#4)` |
| 71-02 | D-03 v1.1 + v1.2 re-authoring in MILESTONES.md | Separate (Phase 68 Plan 68-04 MILESTONES.md-separation precedent) | `docs(archive): ARCHIVE-02 re-author v1.1+v1.2 MILESTONES.md entries from MILESTONE-AUDIT source (replacement-not-deletion per ARCHIVE-01 doctrine)` |
| 71-03 | Close-gate: 71-VERIFICATION.md + traceability flips + chain re-run + STATE/REQUIREMENTS/ROADMAP/PROJECT updates | Single commit | `docs(71-03): Phase 71 close-gate — chain validators green + 71-VERIFICATION.md + traceability flips` |

**Rollback semantics:** `git revert <Plan 71-02 SHA>` cleanly restores v1.1+v1.2 entries to pre-sweep state WITHOUT touching the script fix. `git revert <Plan 71-01 SHA>` restores buggy state for both extractor AND fixture (they're co-validating — coupled by design).

---

## Claude's Discretion

Items where the user explicitly deferred to Claude (planner/executor) judgment:

- Exact regex anchor variants in `extract-summary-oneliners.mjs` if the corrected regex misses edge cases (markdown-link labels, multi-line bolded headers) — planner verifies with grep-pass across all 97 SUMMARY.md files at Plan 71-01 Wave 1
- Whether Plan 71-01 Wave-3 `check-phase-71.mjs` red-state on V-71-MILESTONES-01 is committed-as-known-FAIL (chicken-and-egg per Phase 70 Plan 70-05 Commit A precedent) OR staged-but-uncommitted until Plan 71-02 ready — planner decides
- Exact line ranges for v1.1 H2 + v1.2 H2 in re-authored MILESTONES.md — depends on canonical bullet count from each audit doc; planner reads source-of-truth at Plan 71-02 Wave 1
- Whether `scripts/archive/extract-summary-oneliners.mjs --self-test` runs as separate pre-commit assertion OR folded into V-71-FIX-02 (low-risk either way)
- Whether `ARCHIVE-UPSTREAM-01` stub appears in `v1.8-DEFERRED-CLEANUP.md` at Plan 71-03 OR awaits Phase 74 HARNESS-12 (Plan 71-03 author drafts; HARNESS-12 finalizes)
- Whether to enumerate v1.0/v1.3/v1.4/v1.4.1 H2 ranges in V-71-MILESTONES-01 as defense-in-depth (no current residue, but anchors the contract) — Plan 71-01 Wave 3 decision

---

## Deferred Ideas

Discovered during Phase 71 discussion — flagged for `v1.8-DEFERRED-CLEANUP.md` (Plan 71-03 stub; Phase 74 HARNESS-12 finalizes) or for v1.9+:

- **ARCHIVE-UPSTREAM-01** — Submit corrected regex as upstream PR to `get-shit-done-cc` at `phase-lifecycle-policy.ts:54-58`. When upstream releases corrected version + Autopilot pins to it, the vendored `scripts/archive/extract-summary-oneliners.mjs` can be deprecated in v1.9+. NOT gated on for v1.8 close.
- **`Edit N --` token-class** — Different placeholder-label class from the 10-token list. Plan 71-01 PLACEHOLDER_TOKENS should include it.
- **Possible additional `extract*` functions in `phase-lifecycle-policy.ts`** — D-01 advisor scope was only `extractOneLinerFromBody`. There may be other extractors emitting garbage under similar conditions. v1.9+ scope.
- **Vendoring as v1.7+ architectural pattern** — `scripts/archive/` joins `scripts/validation/_lib/` (Phase 68) as localizing-pattern repo subtree. v1.9+ may formalize a vendor-style-guide.

Already locked elsewhere (recorded for downstream awareness; not new deferrals):

- CHAIN-WRAPPER-01 — Phase 72 Pillar B (WRAPPER-01)
- HARNESS-FORWARD-01 + SCOPE-GAP-RETRO-01 — Phase 73 Pillar C (RETRO-01 + RETRO-02)
- v1.8 audit harness lineage bump (HARNESS-07..12 + VPP-01) — Phase 74 Pillar D
- CI-3 / Multi-tenant / ABDevice API / per-OU CRD / Account Holder / ASM — `v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12)
