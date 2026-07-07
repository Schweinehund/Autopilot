# Phase 120: EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix — Verification

**Purpose:** Needle-check-friendly hand-off spec for a **future** `scripts/validation/check-phase-120.mjs`
(Phase 125 / HARN-06 deliverable). This document is the ONLY verification artifact Phase 120
authors — it is deliberately NOT a validator. It mirrors the precedent of `115-VERIFICATION.md`
feeding `check-phase-115.mjs` (authored in Phase 119, four phases after the content phase).

**Status:** Phase 120 is complete (both 120-01 and 120-02 executed and committed). This spec
describes the state of the repo AFTER both plans landed, as a set of exact, greppable needles.

---

## Observable Truths

One bullet per ROADMAP Phase 120 success criterion. Each truth is directly checkable against
committed file content (no interpretation required).

- **SC1 — Mermaid policy stated:** `docs/_standards/EEE-SOP-standard.md` contains a top-level
  section titled exactly `## Mermaid-in-Enrolled-Classes Policy (STD-04)` (landed 120-01,
  commit `4763020`), stating D-01 (text-equivalent conversion, not a C17 carve-out), D-02 (C17
  assertion #1 stays unchanged), D-03 (conversion shapes: decision table/list, sequence
  numbered-step list), and D-04 (the honesty caveat that a green C17 run does not attest
  leaf-completeness).
- **SC2 — C17 assertion #1 updated-to-match, `--self-test` exit 0:** `c17-eee-contract.mjs`'s
  `hasMermaid` assertion line (`const hasMermaid = bodyLines.some((l, i) => !inCodeFence[i] &&
  /^```mermaid/.test(l));`) is byte-unchanged from pre-Phase-120 baseline; only a 3-line
  comment-only pointer was added immediately above it (commit `f452856`), cross-referencing the
  new standard section. `node scripts/validation/c17-eee-contract.mjs --self-test` exits 0
  (4/4 sub-tests pass); full corpus run reports `0` violations across `174` files (unchanged
  count from pre-Phase-120 baseline).
- **SC3 — Doc Type taxonomy extended, 4 values retained:** `docs/_standards/EEE-SOP-standard.md`
  `### D-02 Edge-case rulings` (under `## Doc Type Taxonomy`) carries 4 new bullets: glossary →
  `Reference`, decision-tree → `Reference`, nav-hub → `Reference`, lifecycle → `Guide`, plus a
  new `#### Non-MECE precedence rule (D-08)` subsection with its 3-step tie-breaker. The
  controlled-vocabulary `## Doc Type Taxonomy` table itself still lists **exactly 4 values**
  (`Runbook | Guide | RCA | Reference`) — unchanged row count and unchanged values.
- **SC4 — frozen-at-close.mjs comment corrected (HYG-01):** `scripts/validation/_lib/frozen-at-close.mjs`
  lines 5-13 header comment no longer claims helpers "REMAIN INLINE" for
  `check-phase-{61,67,68,70}.mjs`; it now states these four files consume centralized readers
  from this module (v1.14 Phase 111 centralization) (commit `4e2cb18`). Runtime behavior
  (`MILESTONE_CLOSE_SHAS`, `readAtClose()`, all convenience exports) is byte-unchanged — `git
  diff` for this commit touches only comment lines.

## Required Artifacts

Concrete grep needles a future `check-phase-120.mjs` would assert, one row per PRESENT/ABSENT
check, grouped by file.

### `docs/_standards/EEE-SOP-standard.md`

| Needle | Type | Notes |
|--------|------|-------|
| `## Mermaid-in-Enrolled-Classes Policy (STD-04)` | PRESENT | Exact section header string, literal match |
| `**Glossary documents** (\`docs/_glossary*.md\`) → \`Reference\` (v1.16 D-07)` | PRESENT | D-07 glossary ruling keyword; assert `Reference` classification present |
| `**Decision-tree documents** (\`docs/decision-trees/*\`) → \`Reference\` (v1.16 D-07)` | PRESENT | D-07 decision-tree ruling keyword |
| `**Navigation / index hubs**` ... `→ \`Reference\` (v1.16 D-07)` | PRESENT | D-07 nav-hub ruling keyword |
| `**Lifecycle documents** (\`*-lifecycle/*\`) → \`Guide\` (v1.16 D-07)` | PRESENT | D-07 lifecycle ruling keyword |
| `#### Non-MECE precedence rule (D-08)` | PRESENT | Exact subsection header string, literal match |
| Doc Type Taxonomy table row count == 4 (`Runbook`, `Guide`, `RCA`, `Reference`) | PRESENT (count check) | Assert the 4-value table is unchanged — count table data rows under `## Doc Type Taxonomy`, must equal 4, not 5+ |
| `| 1 | No Mermaid code fences in Phase-1 corpus files | Mermaid-in-Enrolled-Classes Policy (STD-04) section above |` | PRESENT | C17 Enforcement Reference row 1 cross-reference to the new policy section |
| `v1.16 STD-04 — added Mermaid-in-Enrolled-Classes Policy` | PRESENT | Version History row added by 120-01 |

### `scripts/validation/c17-eee-contract.mjs`

| Needle | Type | Notes |
|--------|------|-------|
| `const hasMermaid = bodyLines.some((l, i) => !inCodeFence[i] && /^```mermaid/.test(l));` | PRESENT | Assertion #1 regex line — must be byte-identical to pre-Phase-120 baseline |
| `--self-test` | PRESENT | Self-test harness flag must still exist (needle also asserted by `check-phase-115.mjs`'s `V-115-SELFTEST-MODE`) |
| `[v1.16 Phase-120 addition, comment-only]` | PRESENT | The comment-only pointer marker added in 120-01 |
| `CHAIN_PHASES` | **ABSENT** | Standalone validator, not chain-registered itself (same invariant `check-phase-115.mjs`'s `V-115-STANDALONE` already asserts — must still hold true after Phase 120's comment edit) |

### `scripts/validation/_lib/frozen-at-close.mjs`

| Needle | Type | Notes |
|--------|------|-------|
| `REMAIN INLINE` | **ABSENT** | The stale HYG-01 claim; must be fully removed |
| `Phase 111` | PRESENT | The corrected centralization attribution |
| `export const MILESTONE_CLOSE_SHAS` | PRESENT | Runtime export unchanged — sanity needle proving the comment-only edit didn't touch code |
| `export function readAtClose` | PRESENT | Runtime export unchanged — sanity needle |

## Verification Commands

Exact baseline command set with expected output substrings. All four ran clean before AND after
both 120-01 and 120-02 edits (zero regression across the full plan).

```bash
# 1. C17 self-test — expect 4/4 PASS, exit 0
node scripts/validation/c17-eee-contract.mjs --self-test
# Expected substring: "Self-test: 4 passed, 0 failed"

# 2. C17 full corpus run — expect 174 files, 0 violations, exit 0
node scripts/validation/c17-eee-contract.mjs --verbose
# Expected substring: "C17 summary: 174 files checked, 0 with violations, 0 total violations"

# 3. check-phase-115 needle checks — expect 7/7 PASS, exit 0
node scripts/validation/check-phase-115.mjs
# Expected substring: "Result: 7 PASS, 0 FAIL, 0 SKIPPED"

# 4. Full v1.15 harness (includes C17 as check id 17) — expect 16/16 PASS, exit 0
node scripts/validation/v1.15-milestone-audit.mjs
# Expected substring: "Summary: 16 passed, 0 failed, 0 skipped"

# 5. node --check on the HYG-01-edited file — expect exit 0 (still valid ES module)
node --check scripts/validation/_lib/frozen-at-close.mjs
```

All five commands were executed live during 120-01 and 120-02 execution and returned the exact
expected substrings above with exit code 0.

## Deferred to Phase 125

`scripts/validation/check-phase-120.mjs` is a **Phase 125 / HARN-06 deliverable**, authored
MECHANICALLY from this needle-spec — exactly as `check-phase-115.mjs` was derived from
`115-VERIFICATION.md` four phases after the C17-authoring phase. Phase 125's chain apex
(`check-phase-125.mjs` or equivalent) will register `check-phase-120.mjs` as a leaf with
`CHAIN_PHASES=[48..119]` (per the `[48..N-1]` invariant, N=125), consuming the Observable Truths
and Required Artifacts tables above as its assertion source.

Phase 120 deliberately does **NOT** author `check-phase-120.mjs` — this is the validator-atom
deferral convention (`project_v113_validator_atom_deferral.md`): content/standard-authoring
phases hand off a needle-spec only; the per-phase chain validator is authored later, in the
harness-lineage-bump phase, as an indivisible atom alongside its siblings for the same
milestone.

## Residual Risks Handed Forward (NOT actioned in Phase 120)

These five items from `120-CONTEXT.md`'s Specific Ideas section are explicitly out of scope for
Phase 120 and route to Phases 121-122:

| ID | Risk | Routes to |
|----|------|-----------|
| R1 | Mandatory per-file leaf-parity checklist + second-reviewer sign-off (standardize the RE-068 "LOCKED — N leaves" annotation pattern) | Phase 122 (RETRO-05/08) |
| R2 | Scrub stale mermaid-referencing prose in already-converted files (RE-068 itself still has "click the leaf" / "Mermaid decision tree" text needing a fix) | Phase 122 (RETRO-05/08) |
| R3 | Confirm `## Summary` stays within 5 lines of any newly->25-row converted table (assertion #11 belt-and-suspenders) | Phase 122 (RETRO-05/08) |
| R4 | Template-ize table-first authoring to stop the recurrence tax on future conversions | Phase 121/122 (structural retrofits) |
| R5 | Convert every former Mermaid `click` target into a real relative Markdown link (recovers citable nav the `.docx` pipeline never rendered) | Phase 122 (RETRO-05/08, carved-mermaid files) |

None of R1-R5 are actioned by this plan or this verification spec — they are recorded here so
Phase 125's future `check-phase-120.mjs` does not mistakenly assert on work that belongs to
Phases 121-122.

---

*Phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix*
*Verification spec authored: 2026-07-07*
